"""
harness.py - runs the learner's code, marks exercises, and records
step-by-step traces for the "Step through" simulation.

py-worker.js loads this file into Pyodide (real Python compiled to run
inside a web page). The page talks to it with JSON strings:

    api_run(request)         run code once, as if the learner pressed Run
    api_check(request)       run an exercise's tests against the learner's code
    api_trace(request)       run code and record every step for the simulation
    api_trace_quiz(request)  the real answers to a "Be the Computer" exercise
    api_catch(request)       mark a "Catch the Bug" exercise (the learner's asserts)
    api_shell(request)       run one entry typed at the >>> shell prompt
    api_packages(request)    which optional packages (numpy, pandas, matplotlib) code imports

Only the Python standard library is used. matplotlib is handled if the
learner's code imports it, but the harness never imports it itself.
"""

import ast
import base64
import builtins
import codeop
import contextlib
import io
import json
import linecache
import math
import os
import random
import re
import shutil
import sys
import tempfile
import time
import tokenize
import traceback
import types
import warnings

FILENAME = "<your code>"
TARGET_FILENAME = "<the code being tested>"   # the correct or broken program in "Catch the Bug"
LEARNER_FILES = (FILENAME, TARGET_FILENAME)   # code the time limit watches
TIME_LIMIT = 5.0          # seconds a program may run before it is stopped
OUTPUT_LIMIT = 100_000    # characters a program may print before it is stopped
IMAGE_LIMIT = 20          # charts a program may show before it is stopped
FILES_LIMIT = 200_000     # characters of text files sent back to the page after a run
STEP_LIMIT = 1000         # steps the simulation records before it stops
# One folder per process, so two copies of the harness (for example the
# parallel course checker) never empty each other's folder mid-run.
WORK_DIR = os.path.join(tempfile.gettempdir(), f"pytrainer-files-{os.getpid()}")
OPTIONAL_PACKAGES = ("numpy", "pandas", "matplotlib")

# Charts are drawn into memory, never into a window.
os.environ["MPLBACKEND"] = "AGG"


# ---------------------------------------------------------------------------
# Control-flow signals. Both inherit from BaseException, so a learner's
# ordinary `except Exception:` or `except ValueError:` cannot swallow them.
# A bare `except:` can; _keep_halting and _Session._input raise them again.
# ---------------------------------------------------------------------------

class _Halt(BaseException):
    """Stops the learner's program from outside (time limit, output limit)."""

    def __init__(self, kind, line=None):
        super().__init__(kind)
        self.kind = kind
        self.line = line


class _NeedInput(BaseException):
    """Raised by input() when the page has no more typed answers to give."""

    def __init__(self, prompt):
        super().__init__(prompt)
        self.prompt = prompt


class _TestCrash(Exception):
    """A test called the learner's function and the function crashed."""

    def __init__(self, call, error):
        super().__init__(call)
        self.call = call
        self.error = error


# ---------------------------------------------------------------------------
# Output capture
# ---------------------------------------------------------------------------

class _Recorder:
    """Everything the program shows, in order, as [kind, text] pairs.

    kinds: "out" (print), "err" (written to stderr), "prompt" (the question
    passed to input()), "input" (the answer the learner typed), "image" (a
    chart from plt.show(), as base64 PNG; never merged with its neighbour).
    """

    def __init__(self):
        self.events = []
        self.size = 0
        self.images = 0

    def add(self, kind, text):
        if not text:
            return
        if kind == "image":
            self.images += 1
            if self.images > IMAGE_LIMIT:
                raise _Halt("too_much_output")
            self.events.append([kind, text])
            return
        self.size += len(text)
        if self.size > OUTPUT_LIMIT:
            raise _Halt("too_much_output")
        if self.events and self.events[-1][0] == kind:
            self.events[-1][1] += text
        else:
            self.events.append([kind, text])

    def text(self):
        """Only what the program printed - prompts and typed answers excluded."""
        return "".join(t for k, t in self.events if k == "out")

    def mark(self):
        """A bookmark the simulation uses to replay output up to this moment."""
        if not self.events:
            return [0, 0]
        return [len(self.events), len(self.events[-1][1])]


class _Stream(io.TextIOBase):
    """Stands in for sys.stdout / sys.stderr and feeds the session's recorder."""

    def __init__(self, session, kind):
        self.session = session
        self.kind = kind

    def writable(self):
        return True

    def write(self, s):
        if not isinstance(s, str):
            raise TypeError(f"write() argument must be str, not {type(s).__name__}")
        self.session.recorder.add(self.kind, s)
        return len(s)

    def flush(self):
        pass


# ---------------------------------------------------------------------------
# The time limit. sys.settrace calls this for every line of the learner's
# code; every 2,000 lines it looks at the clock.
# ---------------------------------------------------------------------------

def _make_tracer(deadline, on_event=None):
    ticks = 0

    def local(frame, event, arg):
        nonlocal ticks
        ticks += 1
        if ticks >= 2000:
            ticks = 0
            if time.monotonic() > deadline:
                raise _keep_halting(_Halt("timeout", frame.f_lineno))
        if on_event is not None:
            on_event(frame, event, arg)
        return local

    def on_call(frame, event, arg):
        # Only the learner's own code is traced; the standard library runs at full speed.
        if frame.f_code.co_filename in LEARNER_FILES:
            return local(frame, event, arg)
        return None

    return on_call


# A _Halt raised from inside the sys.settrace function also switches tracing
# off: CPython does that whenever a trace function raises. Learner code that
# catches the _Halt with a bare `except:` or `except BaseException:` would
# then run on with no time limit at all. So once a _Halt has been raised that
# way, the same _Halt is raised again on every later line of the learner's
# code through sys.monitoring, which stays on when its callback raises.
# guarded() switches it off when the run ends.
_halting_tool = None


def _keep_halting(halt):
    global _halting_tool
    if _halting_tool is None:
        monitoring = sys.monitoring
        _halting_tool = next(i for i in range(6) if monitoring.get_tool(i) is None)
        monitoring.use_tool_id(_halting_tool, "pytrainer halt")

        def on_line(code, line):
            if code.co_filename in LEARNER_FILES:
                raise _Halt(halt.kind, halt.line)

        monitoring.register_callback(_halting_tool, monitoring.events.LINE, on_line)
        monitoring.set_events(_halting_tool, monitoring.events.LINE)
    return halt


def _stop_halting():
    global _halting_tool
    if _halting_tool is not None:
        sys.monitoring.set_events(_halting_tool, 0)
        sys.monitoring.free_tool_id(_halting_tool)
        _halting_tool = None


# Modules real Python has already loaded before a program starts, so a file in
# the program's folder with the same name does NOT replace them (plus every
# module built into Python itself). Any other module, like random, IS replaced
# by a file such as random.py next to the program: that is a classic mistake.
_STARTUP_MODULES = {
    "_collections_abc", "_frozen_importlib", "_frozen_importlib_external", "_sitebuiltins", "abc",
    "codecs", "encodings", "genericpath", "io", "linecache", "ntpath", "os", "posixpath", "site",
    "stat", "zipimport",
} | set(sys.builtin_module_names)


@contextlib.contextmanager
def _local_imports():
    """While the learner's code runs, «import helpers» finds helpers.py in the program's folder,
    as it does on a real computer. Afterwards the folder leaves the search path and every
    module loaded from it is forgotten, so the next run imports the files afresh."""
    global _shadowed_now
    folder = WORK_DIR
    local = {entry.name[:-3] for entry in os.scandir(folder) if entry.name.endswith(".py")} if os.path.isdir(folder) else set()
    shadowed = {name: sys.modules.pop(name) for name in local - _STARTUP_MODULES if name in sys.modules}
    _shadowed_now = shadowed            # _shadow_if_local adds files the program saves while it runs
    before = set(sys.modules)
    sys.path.insert(0, folder)
    saved_bytecode = sys.dont_write_bytecode
    sys.dont_write_bytecode = True      # no __pycache__ folder appears among the learner's files
    sys.path_importer_cache.pop(folder, None)   # a fresh look at the folder: its files change between runs
    try:
        yield
    finally:
        if folder in sys.path:
            sys.path.remove(folder)
        sys.dont_write_bytecode = saved_bytecode
        # Only modules that appeared during this run can have come from the folder.
        for name in set(sys.modules) - before:
            path = getattr(sys.modules[name], "__file__", None) or ""
            if path.startswith(folder):
                del sys.modules[name]
        sys.modules.update(shadowed)    # the real modules come back for everything else
        _shadowed_now = None


def _reset_logging():
    """Each run starts with logging as a new Python would have it.

    logging.basicConfig() only works when the root logger has no handlers, and
    its handlers remember the stream they were given. Python lives on between
    runs here, so without this a second run's log lines would go to the first
    run's output, and a log file would stay open while the folder is emptied.
    """
    logging = sys.modules.get("logging")
    if logging is None:
        return
    loggers = [logging.getLogger()] + [lg for lg in logging.Logger.manager.loggerDict.values()
                                       if isinstance(lg, logging.Logger)]
    for logger in loggers:
        for handler in logger.handlers[:]:
            logger.removeHandler(handler)
            handler.close()
        logger.setLevel(logging.NOTSET)
        logger.propagate = True
        logger.disabled = False
    logging.getLogger().setLevel(logging.WARNING)
    logging.disable(logging.NOTSET)


def _breakpoint_here(*args, **kwargs):
    # pdb waits for typed commands, which this page cannot give it.
    print("breakpoint() pauses the program only on a laptop. Here, use Step-through to watch each line.",
          file=sys.stderr)


def _fresh_folder(files=None):
    """Each run starts in an empty folder, so file exercises behave the same every time.

    `files` (name -> text) are written in first: the learner's own files on
    the page. Hidden tests never pass any, so they always start empty.
    """
    os.makedirs(WORK_DIR, exist_ok=True)
    os.chdir(WORK_DIR)
    for entry in os.scandir(WORK_DIR):
        if entry.is_dir(follow_symlinks=False):
            shutil.rmtree(entry.path)
        else:
            os.remove(entry.path)
    for name, text in (files or {}).items():
        path = _path_in_folder(name)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8", newline="") as handle:
            handle.write(text)


def _path_in_folder(name):
    """The full path for a file the page sends. A name that would leave the folder is a page bug.

    Names use "/" between folders, as _folder_files writes them. A backslash
    is part of the name, not a separator: in the browser (Pyodide) it is an
    ordinary letter, so open('.\\\\marks.txt', 'w') makes a file with exactly
    that name and it must come back with exactly that name. Only where the
    system itself treats a backslash as a separator (Windows, when the course
    checker runs) is such a name impossible, so it is refused there.
    """
    name = str(name)
    parts = name.split("/")
    backslash_splits = "\\" in (os.sep, os.altsep)
    if (not name or os.path.isabs(name) or any(p in ("", ".", "..") for p in parts)
            or (backslash_splits and "\\" in name)):
        raise ValueError(f"File name {name!r} must be a plain name inside the program's folder.")
    return os.path.join(WORK_DIR, *parts)


def _folder_files():
    """The text files in the folder after a run, for the page's file panel.

    Returns (files, left_out): files maps "name" or "sub/name" to its text;
    left_out lists files that are not text or would pass FILES_LIMIT.
    """
    files, left_out, size = {}, [], 0
    if not os.path.isdir(WORK_DIR):
        return files, left_out
    for root, dirs, names in os.walk(WORK_DIR):
        dirs.sort()
        for name in sorted(names):
            path = os.path.join(root, name)
            rel = os.path.relpath(path, WORK_DIR).replace(os.sep, "/")
            with open(path, "rb") as handle:
                data = handle.read(FILES_LIMIT + 1)
            try:
                text = data.decode("utf-8")
            except UnicodeDecodeError:      # a picture or other non-text file
                left_out.append(rel)
                continue
            if size + len(text) > FILES_LIMIT:
                left_out.append(rel)
                continue
            size += len(text)
            files[rel] = text
    return files, left_out


# ---------------------------------------------------------------------------
# Charts. MPLBACKEND=AGG draws into memory; when the learner's code imports
# matplotlib, plt.show() is replaced so each open figure becomes an
# ["image", base64 PNG] event in the output, and the figures are cleared.
# ---------------------------------------------------------------------------

_real_import = builtins.__import__
_active_session = None
_shadowed_now = None    # while learner code runs: real modules hidden by the learner's own files


def _shadow_if_local(top, importer_globals):
    """A program that saves its own random.py and then runs «import random» gets its own file,
    as on a real computer. Only imports written in the learner's code (or in the learner's own
    files) are affected; everything else keeps the real modules."""
    learner = importer_globals is _active_session.namespace or \
        str(importer_globals.get("__file__") or "").startswith(WORK_DIR)
    if not learner or top in _STARTUP_MODULES or top not in sys.modules:
        return
    cached = getattr(sys.modules[top], "__file__", None) or ""
    if not cached.startswith(WORK_DIR) and os.path.exists(os.path.join(WORK_DIR, top + ".py")):
        _shadowed_now[top] = sys.modules.pop(top)
        sys.path_importer_cache.pop(WORK_DIR, None)


def _watching_import(name, globals=None, locals=None, fromlist=(), level=0):
    if level == 0 and globals is not None and _active_session is not None and _shadowed_now is not None:
        _shadow_if_local(name.partition(".")[0], globals)
    module = _real_import(name, globals, locals, fromlist, level)
    if name.startswith("matplotlib") and "matplotlib.pyplot" in sys.modules:
        _patch_pyplot(sys.modules["matplotlib.pyplot"])
    return module


def _patch_pyplot(plt):
    # pyplot imports other matplotlib parts while it loads; wait until it is
    # complete (has its own show) - the learner's import statement comes back here then.
    if not hasattr(plt, "show") or getattr(plt.show, "_pytrainer", False):
        return

    def show(*args, **kwargs):
        for number in plt.get_fignums():
            buffer = io.BytesIO()
            # matplotlib 3.10 in Pyodide warns about its own text drawing while saving
            # ("The x parameter as float was deprecated"). That is not about the learner's
            # code, so only that one message is silenced, and only while the trainer saves.
            with warnings.catch_warnings():
                warnings.filterwarnings("ignore", message=r"The [xy] parameter as float was deprecated", category=DeprecationWarning)
                plt.figure(number).savefig(buffer, format="png", dpi=90, bbox_inches="tight")
            if _active_session is not None:
                _active_session.recorder.add("image", base64.b64encode(buffer.getvalue()).decode("ascii"))
        plt.close("all")

    show._pytrainer = True
    plt.show = show


PROGRAM_NAME = "main.py"   # what sys.argv[0] says while the learner's program runs


class _MainModule(types.ModuleType):
    """The learner's variables seen as the "__main__" module (for unittest.main)."""

    def __init__(self, namespace):
        super().__init__("__main__")
        self._namespace = namespace

    def __getattr__(self, name):
        try:
            return self._namespace[name]
        except KeyError:
            raise AttributeError(name) from None

    def __dir__(self):
        return list(self._namespace)


class _Session:
    """One execution of learner code: its output, its typed answers, its variables."""

    def __init__(self, inputs=(), seed=None, namespace=None):
        self.recorder = _Recorder()
        self.inputs = [str(v) for v in inputs]
        self.used = 0
        self.seed = seed
        self.pending = None   # (prompt, events-so-far) once input() ran out of answers
        if namespace is None:
            namespace = {"__name__": "__main__", "__builtins__": builtins}
        self.namespace = namespace

    def _input(self, prompt=""):
        prompt = str(prompt)
        if self.pending is not None:
            # Already waiting. The learner's code caught _NeedInput with a bare
            # `except:` and kept going - keep refusing until the run ends.
            raise _NeedInput(prompt)
        self.recorder.add("prompt", prompt)
        if self.used >= len(self.inputs):
            self.pending = (prompt, [list(e) for e in self.recorder.events])
            raise _NeedInput(prompt)
        value = self.inputs[self.used]
        self.used += 1
        self.recorder.add("input", value + "\n")
        return value

    @contextlib.contextmanager
    def guarded(self, on_event=None):
        global _active_session
        saved = sys.stdout, sys.stderr, builtins.input, builtins.__import__, _active_session
        saved_main, saved_argv, saved_hook = sys.modules.get("__main__"), sys.argv, sys.breakpointhook
        sys.breakpointhook = _breakpoint_here
        sys.stdout = _Stream(self, "out")
        sys.stderr = _Stream(self, "err")
        builtins.input = self._input
        builtins.__import__ = _watching_import
        _active_session = self
        # unittest.main() looks for tests in the "__main__" module and reads its
        # options from sys.argv: point both at the learner's program, as a laptop would.
        sys.modules["__main__"] = _MainModule(self.namespace)
        sys.argv = [PROGRAM_NAME]
        local_imports = _local_imports()
        local_imports.__enter__()
        sys.settrace(_make_tracer(time.monotonic() + TIME_LIMIT, on_event))
        try:
            yield
        finally:
            sys.settrace(None)
            _stop_halting()
            local_imports.__exit__(None, None, None)
            sys.stdout, sys.stderr, builtins.input, builtins.__import__, _active_session = saved
            sys.argv = saved_argv
            sys.breakpointhook = saved_hook
            if saved_main is None:
                sys.modules.pop("__main__", None)
            else:
                sys.modules["__main__"] = saved_main

    def execute(self, code, mode="exec", on_event=None, compiled=None, fresh=True,
                files=None, filename=FILENAME):
        """Run the learner's code. Returns a status dict.

        Learner mistakes never escape this method: they are the whole point,
        so each one is caught, described, and handed back to the page.
        """
        if fresh:
            # Close the last run's log files before the folder is emptied.
            _reset_logging()
            # Before compiling: a typing mistake must still leave this program's
            # own files in the folder, because the page saves whatever is there.
            _fresh_folder(files)
            random.seed(self.seed)
        if compiled is None:
            try:
                compiled = compile(code, filename, mode)
            except SyntaxError as exc:      # also IndentationError and TabError
                return {"status": "error", "error": _syntax_error_info(exc)}
        _remember_source(code, filename)
        result = {"status": "ok"}
        try:
            with self.guarded(on_event):
                exec(compiled, self.namespace)
        except _NeedInput:
            pass                            # self.pending already holds the details
        except _Halt as exc:
            result = {"status": exc.kind, "line": exc.line or _last_learner_line(exc)}
        except SystemExit:
            result = {"status": "ok", "exited": True}
        except BaseException as exc:        # the learner's own runtime error - reported, not hidden
            result = {"status": "error", "error": _runtime_error_info(exc)}
        if self.pending is not None:
            prompt, events = self.pending
            self.recorder.events = events
            return {"status": "need_input", "prompt": prompt}
        return result


def _remember_source(code, filename=FILENAME):
    # Lets tracebacks quote the learner's lines even though no file exists on disk.
    linecache.cache[filename] = (len(code), None, code.splitlines(True), filename)


# ---------------------------------------------------------------------------
# Error descriptions. The page turns these into plain-English explanations.
# ---------------------------------------------------------------------------

def _last_learner_line(exc):
    line = None
    for frame in traceback.extract_tb(exc.__traceback__):
        if frame.filename == FILENAME:
            line = frame.lineno
    return line


def _syntax_error_info(exc):
    text = "".join(traceback.format_exception_only(type(exc), exc)).rstrip()
    return {
        "type": type(exc).__name__,
        "message": exc.msg,
        "line": exc.lineno,
        "offset": exc.offset,
        "traceback": text,
    }


def _keep_learner_frames(tb_exc):
    """Remove the harness's own frames from a traceback, all the way down the chain."""
    seen = set()
    while tb_exc is not None and id(tb_exc) not in seen:
        seen.add(id(tb_exc))
        tb_exc.stack = traceback.StackSummary.from_list(
            [f for f in tb_exc.stack if f.filename == FILENAME]
        )
        tb_exc = tb_exc.__cause__ or tb_exc.__context__


def _runtime_error_info(exc):
    tb_exc = traceback.TracebackException.from_exception(exc)
    _keep_learner_frames(tb_exc)
    only = "".join(tb_exc.format_exception_only()).strip().splitlines()
    last = only[-1] if only else type(exc).__name__
    name = type(exc).__name__
    message = last[len(name) + 2:] if last.startswith(name + ": ") else ""
    frames = list(tb_exc.stack)
    info = {
        "type": name,
        "message": message,
        "line": frames[-1].lineno if frames else None,
        "traceback": "".join(tb_exc.format()).rstrip(),
    }
    if isinstance(exc, (NameError, AttributeError)) and getattr(exc, "name", None):
        info["name"] = exc.name
    if isinstance(exc, KeyError) and exc.args:
        info["key"] = repr(exc.args[0])
    return info


# ---------------------------------------------------------------------------
# Comparing output
# ---------------------------------------------------------------------------

def _normalise(text):
    """Ignore spaces at line ends and blank lines at the very start and end."""
    lines = [line.rstrip() for line in str(text).replace("\r\n", "\n").split("\n")]
    while lines and not lines[-1]:
        lines.pop()
    while lines and not lines[0]:
        lines.pop(0)
    return "\n".join(lines)


def _output_hint(expected, got):
    if not got:
        return "Your program didn't print anything. Did you forget «print()»?"
    if got.lower() == expected.lower():
        return "So close! Only the capital letters are different."
    squash = lambda s: re.sub(r"\s+", "", s)
    if squash(got) == squash(expected):
        return "So close! Only the spaces or line breaks are different."
    loose = lambda s: re.sub(r"[\W_]+", "", s.lower())
    if loose(got) == loose(expected):
        return "Very close! Check the punctuation and capital letters."
    want, have = expected.count("\n") + 1, got.count("\n") + 1
    if want != have:
        lines = lambda n: "1 line" if n == 1 else f"{n} lines"
        return f"The answer should be {lines(want)} long, but your program printed {lines(have)}."
    return "The output isn't quite right yet. Compare it with the expected output below."


# ---------------------------------------------------------------------------
# Checks that read the code itself rather than running it
# ---------------------------------------------------------------------------

_NODE_FEATURES = {
    "for": ((ast.For,), "a «for» loop"),
    "while": ((ast.While,), "a «while» loop"),
    "if": ((ast.If, ast.IfExp), "an «if» statement"),
    "def": ((ast.FunctionDef,), "a function made with «def»"),
    "return": ((ast.Return,), "«return»"),
    "fstring": ((ast.JoinedStr,), "an f-string like «f\"Hi {name}\"»"),
    "listcomp": ((ast.ListComp,), "a list comprehension like «[x * 2 for x in nums]»"),
    "try": ((ast.Try,), "«try» and «except»"),
    "class": ((ast.ClassDef,), "a «class»"),
    "with": ((ast.With,), "«with open(...)»"),
    "import": ((ast.Import, ast.ImportFrom), "«import»"),
    "break": ((ast.Break,), "«break»"),
    "continue": ((ast.Continue,), "«continue»"),
    "augassign": ((ast.AugAssign,), "a shortcut like «+=» or «-=»"),
    "compare": ((ast.Compare,), "a comparison like «>» or «==»"),
    "dict": ((ast.Dict, ast.DictComp), "a dictionary «{ }»"),
    "list": ((ast.List, ast.ListComp), "a list «[ ]»"),
    "boolop": ((ast.BoolOp,), "«and» or «or»"),
    "not": ((ast.UnaryOp,), "«not»"),
}

_OPERATORS = {
    "+": ast.Add, "-": ast.Sub, "*": ast.Mult, "/": ast.Div,
    "//": ast.FloorDiv, "%": ast.Mod, "**": ast.Pow,
}


def _call_name(node):
    if isinstance(node.func, ast.Name):
        return node.func.id
    if isinstance(node.func, ast.Attribute):
        return node.func.attr
    return None


def _has_feature(tree, code, feature):
    """Returns (found, plain-English description) for one feature name."""
    nodes = list(ast.walk(tree))
    if feature.startswith("call:"):
        name = feature[5:]
        return any(isinstance(n, ast.Call) and _call_name(n) == name for n in nodes), f"«{name}()»"
    if feature.startswith("method:"):
        name = feature[7:]
        found = any(isinstance(n, ast.Call) and isinstance(n.func, ast.Attribute)
                    and n.func.attr == name for n in nodes)
        return found, f"«.{name}()»"
    if feature.startswith("op:"):
        symbol = feature[3:]
        op = _OPERATORS[symbol]
        found = any(isinstance(n, (ast.BinOp, ast.AugAssign)) and isinstance(n.op, op) for n in nodes)
        return found, f"the «{symbol}» operator"
    if feature.startswith("kw:"):
        word = feature[3:]
        found = False
        for tok in tokenize.generate_tokens(io.StringIO(code).readline):
            if tok.type == tokenize.NAME and tok.string == word:
                found = True
                break
        return found, f"«{word}»"
    if feature == "not":
        return any(isinstance(n, ast.UnaryOp) and isinstance(n.op, ast.Not) for n in nodes), "«not»"
    if feature == "index_assign":
        found = any(isinstance(n, (ast.Assign, ast.AugAssign)) and any(
            isinstance(t, ast.Subscript) for t in (n.targets if isinstance(n, ast.Assign) else [n.target])
        ) for n in nodes)
        return found, "a change to one item, like «scores[2] = 70»"
    if feature == "unpack":
        found = any(isinstance(n, (ast.Assign, ast.For)) and any(
            isinstance(t, ast.Tuple) for t in (n.targets if isinstance(n, ast.Assign) else [n.target])
        ) for n in nodes)
        return found, "unpacking, like «a, b = b, a»"
    if feature == "nested_loop":
        loops = (ast.For, ast.While)
        found = any(isinstance(n, loops) and any(
            isinstance(inner, loops) for child in n.body for inner in ast.walk(child)
        ) for n in nodes)
        return found, "a loop inside another loop"
    types_, words = _NODE_FEATURES[feature]
    return any(isinstance(n, types_) for n in nodes), words


def _static_test(code, test):
    tree = ast.parse(code)
    for feature in test.get("uses", []):
        found, words = _has_feature(tree, code, feature)
        if not found:
            return {"passed": False, "kind": "uses",
                    "message": test.get("msg") or f"For this exercise, please use {words}."}
    for feature in test.get("avoids", []):
        found, words = _has_feature(tree, code, feature)
        if found:
            return {"passed": False, "kind": "avoids",
                    "message": test.get("msg") or f"For this exercise, try it without {words} - write that part yourself."}
    return {"passed": True}


# ---------------------------------------------------------------------------
# Tools the hidden tests use (written as `py:` in the course files)
# ---------------------------------------------------------------------------

def _show(value):
    text = repr(value)
    return text if len(text) <= 80 else text[:77] + "..."


class _TestTools:
    def __init__(self, session, code):
        self.session = session
        self.code = code

    def need(self, name, kind=None):
        ns = self.session.namespace
        if name not in ns:
            raise AssertionError(f"I couldn't find «{name}». Make sure you create it, spelled exactly like that.")
        value = ns[name]
        checks = {
            "function": (lambda v: isinstance(v, types.FunctionType), "a function (made with «def»)"),
            "class": (lambda v: isinstance(v, type), "a class (made with «class»)"),
            "list": (lambda v: isinstance(v, list), "a list"),
            "dict": (lambda v: isinstance(v, dict), "a dictionary"),
            "str": (lambda v: isinstance(v, str), "text (a string)"),
            "int": (lambda v: isinstance(v, int) and not isinstance(v, bool), "a whole number"),
            "number": (lambda v: isinstance(v, (int, float)) and not isinstance(v, bool), "a number"),
            "tuple": (lambda v: isinstance(v, tuple), "a tuple"),
        }
        if kind is not None:
            test, words = checks[kind]
            if not test(value):
                raise AssertionError(f"«{name}» should be {words}, but it is {_show(value)}.")
        return value

    def _call(self, target, args, kwargs, describe):
        try:
            return target(*args, **kwargs)
        except (_Halt, _NeedInput):
            raise
        except BaseException as exc:        # the learner's function crashed - report which call
            raise _TestCrash(describe, exc) from None

    def call(self, name, *args, **kwargs):
        fn = self.need(name, "function")
        return self._call(fn, args, kwargs, _call_text(name, args, kwargs))

    def new(self, name, *args, **kwargs):
        """Create an object from the learner's class, reporting crashes clearly."""
        cls = self.need(name, "class")
        return self._call(cls, args, kwargs, _call_text(name, args, kwargs))

    def method(self, obj, name, *args, **kwargs):
        """Call obj.name(*args), reporting a missing method or a crash clearly."""
        if not hasattr(obj, name):
            raise AssertionError(f"Your «{type(obj).__name__}» class needs a method called «{name}».")
        return self._call(getattr(obj, name), args, kwargs,
                          f"{type(obj).__name__.lower()}.{_call_text(name, args, kwargs)}")

    def printed(self, name, *args, **kwargs):
        """Call a learner function and return what it printed."""
        fn = self.need(name, "function")
        saved = self.session.recorder
        self.session.recorder = _Recorder()
        try:
            self._call(fn, args, kwargs, _call_text(name, args, kwargs))
            return _normalise(self.session.recorder.text())
        finally:
            self.session.recorder = saved

    def expect(self, name, args, result, approx=False):
        """Assert that name(*args) gives back `result`, with a friendly message."""
        args = tuple(args)
        call = _call_text(name, args, {})
        got = self.call(name, *args)
        if approx and isinstance(got, (int, float)) and not isinstance(got, bool):
            same = math.isclose(got, result, rel_tol=1e-6, abs_tol=1e-6)
        else:
            same = (got == result and type(got) is type(result)) if isinstance(result, bool) else got == result
        if not same:
            message = f"«{call}» should give back «{_show(result)}», but it gave back «{_show(got)}»."
            if got is None:
                message += " Did you use «print» where you needed «return»?"
            raise AssertionError(message)

    def assigned(self, name):
        """How many times the code stores something in a variable called `name`."""
        count = 0
        for node in ast.walk(ast.parse(self.code)):
            targets = []
            if isinstance(node, ast.Assign):
                targets = node.targets
            elif isinstance(node, (ast.AugAssign, ast.AnnAssign)):
                targets = [node.target]
            count += sum(1 for t in targets if isinstance(t, ast.Name) and t.id == name)
        return count

    def file_text(self, path):
        if not os.path.exists(path):
            raise AssertionError(f"I couldn't find a file called «{path}». Did your program create it?")
        with open(path, encoding="utf-8") as handle:
            return handle.read()

    def unit(self, name, **swap):
        """Run the learner's unittest class `name` quietly and return its TestResult.

        Each keyword swaps a name in the learner's program for the length of the run
        (for example a broken copy of their function), to see whether their tests notice.
        """
        import unittest
        cls = self.need(name, "class")
        if not issubclass(cls, unittest.TestCase):
            raise AssertionError(f"«{name}» should be a test class, made with «class {name}(unittest.TestCase):».")
        namespace = self.session.namespace
        missing = object()
        saved = {key: namespace.get(key, missing) for key in swap}
        namespace.update(swap)
        try:
            result = unittest.TestResult()
            unittest.TestLoader().loadTestsFromTestCase(cls).run(result)
        finally:
            for key, value in saved.items():
                if value is missing:
                    namespace.pop(key, None)
                else:
                    namespace[key] = value
        return result

    def env(self, out):
        tools = {
            "unit": self.unit,
            "OUTPUT": out,
            "LINES": out.split("\n") if out else [],
            "CODE": self.code,
            "need": self.need,
            "call": self.call,
            "new": self.new,
            "method": self.method,
            "printed": self.printed,
            "expect": self.expect,
            "assigned": self.assigned,
            "file_text": self.file_text,
        }
        env = dict(self.session.namespace)
        env.update(tools)
        return env


def _call_text(name, args, kwargs):
    parts = [repr(a) for a in args] + [f"{k}={v!r}" for k, v in kwargs.items()]
    return f"{name}({', '.join(parts)})"


def _assertion_test(session, test_code, code, out):
    tools = _TestTools(session, code)
    env = tools.env(out)
    try:
        compiled = compile(test_code, "<test>", "exec")
        with session.guarded():
            exec(compiled, env)
    except AssertionError as exc:
        return {"kind": "assert", "message": str(exc) or "One of the hidden checks did not pass."}
    except _TestCrash as exc:
        if isinstance(exc.error, _NeedInput):
            return {"kind": "more_input", "message": "Your function asked for input, but this exercise doesn't need any."}
        return {"kind": "crash", "call": exc.call, "error": _runtime_error_info(exc.error)}
    except _Halt as exc:
        return {"kind": exc.kind, "line": exc.line}
    except _NeedInput:
        return {"kind": "more_input", "message": "Your program asked for more input than this test gives it."}
    except NameError as exc:
        if exc.__traceback__ is not None and _last_learner_line(exc) is None:
            return {"kind": "assert", "message": f"I couldn't find «{exc.name}». Make sure you create it, spelled exactly like that."}
        return {"kind": "crash", "call": None, "error": _runtime_error_info(exc)}
    except Exception as exc:
        # The test used the learner's code in a way it couldn't handle (for
        # example a class whose __init__ takes the wrong values). Report the
        # learner's error rather than failing the whole check.
        return {"kind": "crash", "call": None, "error": _runtime_error_info(exc)}
    return None


# ---------------------------------------------------------------------------
# Marking an exercise
# ---------------------------------------------------------------------------

def check(code, tests):
    try:
        compile(code, FILENAME, "exec")
    except SyntaxError as exc:
        return {"passed": False, "kind": "error", "error": _syntax_error_info(exc),
                "index": 0, "total": len(tests), "events": []}
    last_events = []
    for index, test in enumerate(tests):
        outcome = _run_test(code, test, index)
        if not outcome["passed"]:
            outcome.update(index=index, total=len(tests), label=test.get("label"))
            return outcome
        last_events = outcome.get("events", last_events)
    return {"passed": True, "total": len(tests), "events": last_events}


def _run_test(code, test, index):
    if "uses" in test or "avoids" in test:
        return _static_test(code, test)
    inputs = [str(v) for v in test.get("inputs", [])]
    session = _Session(inputs, seed=test.get("seed", index + 1))
    # A test may give starting files (an exercise's `files` are merged into
    # each of its tests by course/core.js); otherwise the folder starts empty.
    status = session.execute(code, files=test.get("files"))
    base = {"events": session.recorder.events, "inputs": inputs}
    if status["status"] == "error":
        return {**base, "passed": False, "kind": "error", "error": status["error"]}
    if status["status"] == "need_input":
        given = len(inputs)
        answers = "1 answer" if given == 1 else f"{given} answers"
        return {**base, "passed": False, "kind": "more_input",
                "message": f"Your program asked for input more times than expected. This test types {answers}, then your program asked again."}
    if status["status"] in ("timeout", "too_much_output"):
        return {**base, "passed": False, "kind": status["status"], "line": status.get("line")}
    out = _normalise(session.recorder.text())
    if inputs and session.used < len(inputs) and not test.get("spare_inputs"):
        answers = "1 answer" if len(inputs) == 1 else f"{len(inputs)} answers"
        if session.used == 0:
            asked = "your program never asked for input"
        elif session.used == 1:
            asked = "your program only asked for input once"
        else:
            asked = f"your program only asked for input {session.used} times"
        return {**base, "passed": False, "kind": "fewer_input",
                "message": f"This test types {answers}, but {asked}. Did you forget an «input()»?"}
    if "output" in test:
        expected = _normalise(test["output"])
        if out != expected:
            return {**base, "passed": False, "kind": "output", "expected": expected, "got": out,
                    "message": test.get("msg") or _output_hint(expected, out)}
    for piece in test.get("contains", []):
        if piece not in out:
            return {**base, "passed": False, "kind": "contains", "got": out,
                    "message": test.get("msg") or f"I expected to see «{piece}» in the output."}
    if "py" in test:
        problem = _assertion_test(session, test["py"], code, out)
        if problem is not None:
            if test.get("msg") and problem["kind"] == "assert":
                problem["message"] = test["msg"]
            return {**base, "passed": False, **problem}
    return {**base, "passed": True}


# ---------------------------------------------------------------------------
# The "Step through" simulation
# ---------------------------------------------------------------------------

def _short(text, limit=60):
    return text if len(text) <= limit else text[:limit - 3] + "..."


def _safe_repr(value):
    try:
        return repr(value)
    except Exception as exc:                # a learner's broken __repr__ must not break the display
        return f"<can't display: {type(exc).__name__}>"


# While a trace is being recorded: id(value) -> (small number, value) for every
# list, dict, set and object seen, numbered in first-seen order. Holding the
# value stops Python reusing its id() for a different object mid-trace.
_box_ids = None


def _is_object(value):
    return (hasattr(value, "__dict__") and not isinstance(value, (
        types.ModuleType, types.FunctionType, types.BuiltinFunctionType, types.MethodType, type)))


def _box_id(value):
    """The small "id" that lets the page say two names share one box."""
    if _box_ids is None or not (isinstance(value, (list, dict, set)) or _is_object(value)):
        return None
    key = id(value)
    if key not in _box_ids:
        _box_ids[key] = (len(_box_ids) + 1, value)
    return _box_ids[key][0]


def _describe(value, depth=0):
    desc = _describe_value(value, depth)
    box = _box_id(value)
    if box is not None:
        desc["id"] = box
    return desc


def _describe_value(value, depth):
    kind = type(value).__name__
    if isinstance(value, (bool, int, float, complex, type(None))):
        return {"t": kind, "r": _short(_safe_repr(value))}
    if isinstance(value, str):
        return {"t": "str", "r": _short(_safe_repr(value), 80)}
    if isinstance(value, types.FunctionType):
        try:
            params = ", ".join(value.__code__.co_varnames[:value.__code__.co_argcount])
        except AttributeError:
            params = "..."
        return {"t": "function", "r": f"{value.__name__}({params})"}
    if isinstance(value, type):
        return {"t": "class", "r": value.__name__}
    if isinstance(value, (types.BuiltinFunctionType, types.MethodType)):
        return {"t": "function", "r": f"{getattr(value, '__name__', '?')}(...)"}
    if depth == 0 and isinstance(value, (list, tuple, set, frozenset)):
        items = list(value)
        return {"t": kind, "items": [_describe(v, 1) for v in items[:40]], "more": max(0, len(items) - 40)}
    if depth == 0 and isinstance(value, dict):
        pairs = list(value.items())
        return {"t": "dict", "pairs": [[_short(_safe_repr(k), 30), _describe(v, 1)] for k, v in pairs[:40]],
                "more": max(0, len(pairs) - 40)}
    if depth == 0 and hasattr(value, "__dict__") and not isinstance(value, types.ModuleType):
        attrs = [[k, _describe(v, 1)] for k, v in vars(value).items() if not k.startswith("__")]
        return {"t": kind, "attrs": attrs[:40], "object": True}
    return {"t": kind, "r": _short(_safe_repr(value))}


def _visible(name, value):
    if name.startswith("__"):
        return False
    if isinstance(value, types.ModuleType):
        return False
    return True


def _frames(frame):
    stack = []
    while frame is not None and frame.f_code.co_filename == FILENAME:
        stack.append(frame)
        frame = frame.f_back
    stack.reverse()
    out = []
    for f in stack:
        is_module = f.f_code.co_name == "<module>"
        names = f.f_globals if is_module else f.f_locals
        out.append({
            "name": "Global" if is_module else f.f_code.co_name,
            "vars": [[k, _describe(v)] for k, v in list(names.items()) if _visible(k, v)],
        })
    return out


def _learner_stack(frame):
    """The learner's frames, outermost first (the same frames _frames shows)."""
    stack = []
    while frame is not None and frame.f_code.co_filename == FILENAME:
        stack.append(frame)
        frame = frame.f_back
    stack.reverse()
    return stack


def _quiz_value(value):
    """[repr, the text itself or None] - kept only for "Be the Computer" answers."""
    return [_safe_repr(value), value if isinstance(value, str) else None]


def _watch_values(frame, names):
    out = []
    for f in _learner_stack(frame):
        found = f.f_globals if f.f_code.co_name == "<module>" else f.f_locals
        out.append({n: _quiz_value(found[n]) for n in names if n in found})
    return out


def _continuation_lines(code):
    """{line: first line of its statement} for the second and later lines of
    a statement written over several lines, such as a call whose arguments
    go on the next line. For if, for, while and the like only the header
    counts; the lines of its body are statements of their own."""
    try:
        tree = ast.parse(code)
    except SyntaxError:                     # execute() reports it; there are no steps
        return {}
    starts = {}
    for node in ast.walk(tree):
        if not isinstance(node, (ast.stmt, ast.ExceptHandler)):
            continue
        last = node.end_lineno
        body = getattr(node, "body", None)
        if isinstance(node, _COMPOUND) or isinstance(node, ast.Match):
            # A match statement's cases have no line number of their own: it is on their pattern.
            first_inside = [n.pattern.lineno if isinstance(n, ast.match_case) else n.lineno
                            for f in ("body", "cases", "handlers") for n in getattr(node, f, None) or []]
            last = min(first_inside) - 1 if first_inside else node.lineno
        elif isinstance(body, list):
            last = node.lineno
        for line in range(node.lineno + 1, last + 1):
            starts[line] = node.lineno
    return starts


def trace(code, inputs, seed, watch=None, files=None):
    """Record every step. With `watch` (a set of names), each step also keeps
    the exact repr of those names under "_watch", for trace_quiz.
    `files` (name -> text) are put in the folder first, as for a normal run."""
    global _box_ids
    session = _Session(inputs, seed=seed)
    steps = []
    raised = []         # (frame depth, line, steps recorded so far, error name)
    # Python reports a statement over several lines as: its first line, each
    # later line as it reaches it, then often the first line again as the
    # statement finishes. That is one run of one statement, so the later
    # lines are not recorded, and neither is the first line coming back.
    continuation = _continuation_lines(code)
    last_line = {}      # frame -> the line its last recorded step was on
    inside = {}         # frame -> first line of the statement it is part-way through

    def on_event(frame, event, arg):
        if session.pending is not None:
            return                          # out of typed answers: the run is winding down
        if event == "exception":
            if arg[0].__name__ not in ("StopIteration", "GeneratorExit"):
                raised.append((len(_learner_stack(frame)), frame.f_lineno, len(steps), arg[0].__name__))
            return
        line = frame.f_lineno
        if event == "line" and frame.f_code.co_filename == FILENAME:
            start = continuation.get(line)
            if start is not None:           # a later line of a statement
                inside[frame] = line = start
                if last_line.get(frame) == start:
                    return                  # its first line is already recorded
            elif inside.pop(frame, None) == line:
                return                      # the statement's first line coming back as it finishes
            last_line[frame] = line
        if event == "return":
            last_line.pop(frame, None)
            inside.pop(frame, None)
        if event == "line":
            steps.append({"kind": "line", "line": line, "frames": _frames(frame),
                          "out": session.recorder.mark()})
        elif event == "return" and frame.f_code.co_name != "<module>":
            steps.append({"kind": "return", "line": frame.f_lineno, "func": frame.f_code.co_name,
                          "value": _describe(arg, 1), "frames": _frames(frame),
                          "out": session.recorder.mark()})
        else:
            return
        if watch:
            steps[-1]["_watch"] = _watch_values(frame, watch)
        if len(steps) >= STEP_LIMIT:
            raise _keep_halting(_Halt("step_limit", frame.f_lineno))

    _box_ids = {}
    try:
        status = session.execute(code, on_event=on_event, files=files)
        status["steps"] = steps
        status["events"] = session.recorder.events
        if status["status"] != "need_input":
            status["final"] = _final_frames(session.namespace)
        if watch:
            status["_final_watch"] = {n: _quiz_value(session.namespace[n]) for n in watch if n in session.namespace}
    finally:
        _box_ids = None
    if steps:
        _Narrator(code, status, raised).narrate()
    return status


def _final_frames(namespace):
    return [{"name": "Global",
             "vars": [[k, _describe(v)] for k, v in list(namespace.items()) if _visible(k, v)]}]


# ---------------------------------------------------------------------------
# The narrator: one plain-English sentence ("say") for each step, worked out
# after the run from the code's syntax tree and the step that follows, so no
# learner code ever runs twice. When it is unsure it says nothing (None).
# ---------------------------------------------------------------------------

_COMPOUND = (ast.If, ast.For, ast.While, ast.With, ast.Try, ast.FunctionDef, ast.ClassDef,
             ast.AsyncFunctionDef, ast.AsyncFor, ast.AsyncWith, ast.Match, ast.TryStar,
             ast.ExceptHandler)
_LOOPS = (ast.For, ast.While)
_OP_WORDS = {ast.Add: "adds", ast.Sub: "takes away", ast.Mult: "multiplies it by",
             ast.Div: "divides it by", ast.FloorDiv: "divides it by"}


def _desc_text(desc, limit=60):
    """A description from _describe turned back into short readable text."""
    if "r" in desc:
        text = desc["r"]
    elif "items" in desc:
        parts = [_desc_text(x, 30) for x in desc["items"]] + (["..."] if desc.get("more") else [])
        inner = ", ".join(parts)
        if desc["t"] == "tuple":
            text = f"({inner},)" if len(parts) == 1 else f"({inner})"
        elif desc["t"] in ("set", "frozenset"):
            text = "{" + inner + "}" if parts else f"{desc['t']}()"
        else:
            text = f"[{inner}]"
    elif "pairs" in desc:
        parts = [f"{k}: {_desc_text(v, 30)}" for k, v in desc["pairs"]] + (["..."] if desc.get("more") else [])
        text = "{" + ", ".join(parts) + "}"
    elif desc.get("object"):
        text = f"a {desc['t']} object"
    else:
        text = desc["t"]
    return _short(text, limit)


def _and(words):
    words = list(words)
    return words[0] if len(words) == 1 else ", ".join(words[:-1]) + " and " + words[-1]


def _in_block(block, line):
    return line is not None and any(n.lineno <= line <= n.end_lineno for n in block)


def _has_input(node):
    return any(isinstance(n, ast.Call) and isinstance(n.func, ast.Name) and n.func.id == "input"
               for n in ast.walk(node))


def _code(node, limit=50):
    return "«" + _short(ast.unparse(node), limit) + "»"


class _Narrator:
    def __init__(self, code, status, raised):
        self.status = status
        self.steps = status["steps"]
        self.raised = raised
        self.final = status.get("final") if status["status"] == "ok" else None
        self.source = code.splitlines()
        self.by_line = {}
        self.cases = {}                     # line of a case's pattern -> (match statement, that case)
        self.classes, self.functions, self.generators = set(), set(), set()
        for node in ast.walk(ast.parse(code)):
            if isinstance(node, (ast.stmt, ast.ExceptHandler)):
                self.by_line.setdefault(node.lineno, []).append(node)
            if isinstance(node, ast.Match):
                for case in node.cases:
                    self.cases.setdefault(case.pattern.lineno, (node, case))
            if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
                self.functions.add(node.name)
                if any(isinstance(n, (ast.Yield, ast.YieldFrom)) for n in ast.walk(node)):
                    self.generators.add(node.name)
            elif isinstance(node, ast.ClassDef):
                self.classes.add(node.name)
        # Running total of printed characters before each event, to read what a step printed.
        self.out_before = [0]
        for kind, text in status["events"]:
            self.out_before.append(self.out_before[-1] + (len(text) if kind == "out" else 0))
        self.out_text = "".join(t for k, t in status["events"] if k == "out")
        self._link()

    # -- how the steps connect -------------------------------------------------

    def outer(self, line):
        """The statements that start on this line and are not inside another one there."""
        nodes = self.by_line.get(line, [])

        def inside(n, o):
            return (o is not n and o.col_offset <= n.col_offset
                    and (o.end_lineno, o.end_col_offset) >= (n.end_lineno, n.end_col_offset))

        return sorted((n for n in nodes if not any(inside(n, o) for o in nodes)), key=lambda n: n.col_offset)

    def _link(self):
        """depth, refire, after, caller for every step.

        refire: the same simple line again at once (a comprehension looping
        inside one line); those steps get no sentence and do not count as a
        new run of the line. after: the first later step in the same frame or
        an outer one - the moment this step's line has finished. caller: the
        last step in the frame one level out (the line that made the call).
        """
        steps = self.steps
        n = len(steps)
        self.depth = depth = [len(s["frames"]) for s in steps]
        self.refire = [False] * n
        self.caller = [None] * n
        same_or_out, out_only = [], []
        for k, s in enumerate(steps):
            while same_or_out and depth[same_or_out[-1]] > depth[k]:
                same_or_out.pop()
            while out_only and depth[out_only[-1]] >= depth[k]:
                out_only.pop()
            prev = steps[same_or_out[-1]] if same_or_out else None
            if (s["kind"] == "line" and prev is not None and prev["kind"] == "line"
                    and depth[same_or_out[-1]] == depth[k] and prev["line"] == s["line"]
                    and not any(isinstance(x, _LOOPS) for x in self.outer(s["line"]))):
                self.refire[k] = True
            self.caller[k] = out_only[-1] if out_only else None
            same_or_out.append(k)
            out_only.append(k)
        self.after = [None] * n
        stack = []
        for k in range(n - 1, -1, -1):
            if self.refire[k]:
                continue
            while stack and depth[stack[-1]] > depth[k]:
                stack.pop()
            self.after[k] = stack[-1] if stack else None
            stack.append(k)

    def frame_after(self, i):
        j, d = self.after[i], self.depth[i]
        if j is not None:
            frames = self.steps[j]["frames"]
            return frames[d - 1] if len(frames) >= d else None
        if d == 1 and self.final:
            return self.final[0]
        return None

    def next_line(self, i):
        j = self.after[i]
        if j is not None and self.steps[j]["kind"] == "line" and self.depth[j] == self.depth[i]:
            return self.steps[j]["line"]
        return None

    def where_next(self, i):
        line, j = self.next_line(i), self.after[i]
        if line is not None:
            return f"Python goes to line {line}."
        if j is None and self.depth[i] == 1 and self.final:
            return "The program ends."
        if j is not None and self.steps[j]["kind"] == "return":
            return "The function ends here."
        return ""

    def error_on(self, i):
        """The name of the error this step's line caused, or None."""
        d, line, j = self.depth[i], self.steps[i]["line"], self.after[i]
        for depth, at, count, name in self.raised:
            if depth == d and at == line and count > i and (j is None or count <= j):
                return name
        return None

    def printed(self, i):
        def offset(mark):
            count, length = mark
            if count == 0:
                return 0
            kind = self.status["events"][count - 1][0]
            return self.out_before[count - 1] + (length if kind == "out" else 0)
        j = self.after[i]
        end = offset(self.steps[j]["out"]) if j is not None else len(self.out_text)
        return self.out_text[offset(self.steps[i]["out"]):end]

    @staticmethod
    def lookup(frame, name):
        if frame is None:
            return None
        for key, desc in frame["vars"]:
            if key == name:
                return desc
        return None

    def value_of(self, frame, node):
        """The description of a name or attribute (like self.total) in a frame."""
        if isinstance(node, ast.Name):
            return self.lookup(frame, node.id)
        if isinstance(node, ast.Attribute):
            base = self.value_of(frame, node.value)
            for key, desc in (base or {}).get("attrs", []):
                if key == node.attr:
                    return desc
        return None

    # -- sentences ---------------------------------------------------------------

    def narrate(self):
        for i, step in enumerate(self.steps):
            step["say"] = self.say_line(i) if step["kind"] == "line" else self.say_return(i)

    def say_line(self, i):
        if self.refire[i]:
            return None
        line, d = self.steps[i]["line"], self.depth[i]
        if line in self.cases and not self.by_line.get(line):
            return self.say_case(i, *self.cases[line])
        nodes = self.outer(line)
        if not nodes or (len(nodes) > 1 and any(isinstance(n, _COMPOUND) for n in nodes)):
            return None
        first = nodes[0]
        body = getattr(first, "body", None)   # a match statement has cases, not a body
        if isinstance(first, _COMPOUND) and body and body[0].lineno == line:
            return None                     # "if x: y = 1" on one line - too tangled to explain
        following = self.steps[i + 1] if i + 1 < len(self.steps) else None
        if (following is not None and following["kind"] == "line" and self.depth[i + 1] == d + 1
                and not isinstance(first, ast.ClassDef)):
            name = following["frames"][-1]["name"]
            if name == "__init__":
                return "Python makes a new object and jumps into «__init__» to set it up."
            if not name.startswith("<"):
                return f"Python calls «{name}», so it jumps into that function."
        error = self.error_on(i)
        if error and not isinstance(first, ast.Assert):
            return self.say_error(i, error)
        if self.after[i] is None and self.status["status"] == "need_input":
            if any(_has_input(n) for n in nodes):
                return "Python asks a question and waits for you to type an answer."
            return None
        parts = [self.say_node(n, i, error) for n in nodes]
        if any(p is None for p in parts):
            return None
        return " ".join(p.strip() for p in parts)

    def say_error(self, i, error):
        j, line = self.after[i], self.next_line(i)
        text = f"This line causes a {error}."
        if line is not None and any(isinstance(n, ast.ExceptHandler) for n in self.by_line.get(line, [])):
            return text + f" Python jumps to the «except» part on line {line}."
        if line is not None:
            return text + f" Python jumps to line {line}."
        if j is not None and self.steps[j]["kind"] == "return":
            return text + " The function stops here."
        if j is None:
            return text + " The program stops here."
        return text

    def say_return(self, r):
        step, d = self.steps[r], self.depth[r]
        func = step["func"]
        if func.startswith("<") or func in self.generators:
            return None
        caller = self.caller[r]
        back = f" Python goes back to line {self.steps[caller]['line']}." if caller is not None else ""
        for depth, _, count, name in self.raised:
            if depth == d and count == r:
                return f"«{func}» stops because of a {name}. The error goes back to the line that called it."
        if func in self.classes and func not in self.functions:
            return f"Python finishes building the class «{func}»."
        if func == "__init__":
            return "«__init__» is finished, so the new object is ready." + back
        return f"«{func}» is finished and gives back {_desc_text(step['value'])}." + back

    def say_node(self, node, i, error):
        handler = getattr(self, "say_" + type(node).__name__, None)
        return handler(node, i, error) if handler is not None else None

    def say_Assign(self, node, i, error, targets=None):
        after = self.frame_after(i)
        targets = targets or node.targets
        if after is None:
            return None
        if len(targets) == 1 and isinstance(targets[0], ast.Subscript):
            base = targets[0].value
            desc = self.value_of(after, base)
            if desc is None:
                return None
            return f"Python changes one item of {ast.unparse(base)}. Now {ast.unparse(base)} is {_desc_text(desc)}."
        pairs = []

        def collect(target):
            if isinstance(target, (ast.Tuple, ast.List)):
                for element in target.elts:
                    collect(element)
            else:
                if isinstance(target, ast.Starred):
                    target = target.value
                pairs.append((ast.unparse(target), self.value_of(after, target)))

        for target in targets:
            collect(target)
        if not pairs or any(desc is None for _, desc in pairs):
            return None
        if len(pairs) == 1:
            name, desc = pairs[0]
            source = self.value_of(after, node.value) if isinstance(node.value, ast.Name) else None
            if source is not None and "id" in desc and source.get("id") == desc["id"]:
                what = "object" if desc.get("object") else desc["t"]
                return (f"Python does not copy the {what}. Now {node.value.id} and {name} "
                        f"are two names for the same {what}.")
            value = _desc_text(desc)
            if _has_input(node.value):
                return f"Python asks for an answer, works out the right side, gets {value}, and stores it in {name}."
            if isinstance(node.value, ast.Constant):
                return f"Python stores {value} in {name}."
            return f"Python works out the right side, gets {value}, and stores it in {name}."
        return "Python stores " + _and(f"{_desc_text(desc, 30)} in {name}" for name, desc in pairs) + "."

    def say_AnnAssign(self, node, i, error):
        if node.value is None:
            return None
        return self.say_Assign(node, i, error, targets=[node.target])

    def say_AugAssign(self, node, i, error):
        if isinstance(node.target, ast.Subscript):          # counts[letter] += 1
            return self.say_Assign(node, i, error, targets=[node.target])
        before = self.steps[i]["frames"][self.depth[i] - 1]
        old, new = self.value_of(before, node.target), self.value_of(self.frame_after(i), node.target)
        if old is None or new is None:
            return None
        name = ast.unparse(node.target)
        verb = _OP_WORDS.get(type(node.op))
        amount = None
        if isinstance(node.value, ast.Constant):
            amount = repr(node.value.value)
        elif isinstance(node.value, ast.Name) and self.lookup(before, node.value.id) is not None:
            amount = _desc_text(self.lookup(before, node.value.id), 30)
        if verb and amount is not None:
            return f"{name} was {_desc_text(old)}. Python {verb} {amount}, so {name} is now {_desc_text(new)}."
        return f"{name} was {_desc_text(old)}. After this line it is {_desc_text(new)}."

    def say_If(self, node, i, error):
        word = "elif" if self.source[node.lineno - 1].lstrip().startswith("elif") else "if"
        test, line = _code(node.test), self.next_line(i)
        if _in_block(node.body, line):
            return f"Python checks {test}. It is True, so Python runs the lines inside the «{word}»."
        if node.orelse and _in_block(node.orelse, line):
            if len(node.orelse) == 1 and isinstance(node.orelse[0], ast.If) and node.orelse[0].lineno == line:
                return f"Python checks {test}. It is False, so Python moves on to the «elif» on line {line}."
            return f"Python checks {test}. It is False, so Python goes to the «else» part, line {line}."
        return f"Python checks {test}. It is False, so Python skips the lines inside. " + self.where_next(i)

    def say_Match(self, node, i, error):
        subject, line = _code(node.subject), self.next_line(i)
        if line == node.cases[0].pattern.lineno:
            return f"Python takes {subject} and tries each «case» in turn, from the top."
        for case in node.cases:
            if _in_block(case.body, line):
                return f"Python takes {subject}. The «case» on line {case.pattern.lineno} fits, so Python runs the lines inside it."
        return f"Python takes {subject}, but no «case» fits, so Python skips them all. " + self.where_next(i)

    def say_case(self, i, match, case):
        """A step on a case's own line: Python is testing whether this case fits."""
        line = self.next_line(i)
        pattern = _code(case.pattern, 40)
        if case.guard is not None:
            pattern += f" with the test {_code(case.guard, 30)}"
        if _in_block(case.body, line):
            return f"Does it fit {pattern}? Yes, so Python runs the lines inside this «case»."
        later = [c for c in match.cases if c.pattern.lineno > case.pattern.lineno]
        if later and line == later[0].pattern.lineno:
            return f"Does it fit {pattern}? No, so Python tries the next «case»."
        return f"Does it fit {pattern}? No, and no other «case» fits, so Python skips them all."

    def say_While(self, node, i, error):
        test = _code(node.test)
        if _in_block(node.body, self.next_line(i)):
            return f"Python checks {test}. It is True, so Python runs the lines inside the loop."
        return f"Python checks {test}. It is False, so the loop is finished. " + self.where_next(i)

    def say_For(self, node, i, error):
        source = _code(node.iter, 30)
        if _in_block(node.body, self.next_line(i)):
            after = self.frame_after(i)
            names = [n for n in ast.walk(node.target) if isinstance(n, ast.Name)]
            values = [(n.id, self.lookup(after, n.id)) for n in names]
            if not values or any(v is None for _, v in values):
                return None
            now = _and(f"{name} is now {_desc_text(v, 30)}" for name, v in values)
            return f"Python takes the next value from {source}: {now}."
        return f"There are no more values in {source}, so the loop is finished. " + self.where_next(i)

    def say_FunctionDef(self, node, i, error):
        return (f"Python remembers the function «{node.name}» for later. "
                "Its lines run only when something calls it.")

    def say_ClassDef(self, node, i, error):
        if self.depth[i] > 1 and self.steps[i]["frames"][-1]["name"] == node.name:
            return f"Python reads the lines inside the class «{node.name}»."   # the class body starting
        return f"Python builds the class «{node.name}». Then you can make objects from it."

    def say_Return(self, node, i, error):
        j = self.after[i]
        if j is None or self.steps[j]["kind"] != "return":
            return None
        func, value = self.steps[j]["func"], _desc_text(self.steps[j]["value"])
        if node.value is None:
            return f"The function «{func}» ends here and gives back None."
        return f"The function «{func}» gives back {value}."

    def say_Expr(self, node, i, error):
        call = node.value
        text = self.printed(i)
        if text.endswith("\n"):
            text = text[:-1]
        shown = ""
        if text:
            lines = text.split("\n")
            shown = (f"«{_short(text)}»" if len(lines) == 1
                     else f"{len(lines)} lines. The first is «{_short(lines[0])}»")
        if isinstance(call, ast.Call) and isinstance(call.func, ast.Name) and call.func.id == "print":
            return f"Python prints {shown}." if shown else "Python prints an empty line."
        if isinstance(call, ast.Call) and isinstance(call.func, ast.Name) and call.func.id == "input":
            return "Python asks a question and waits for an answer."
        if isinstance(call, ast.Constant):
            return "This is a note (a docstring). Python skips it."
        if not isinstance(call, ast.Call):
            return f"Python works out {_code(call)}, but the answer is not stored or shown."
        sentence = f"Python runs {_code(call)}."
        if isinstance(call.func, ast.Attribute) and isinstance(call.func.value, ast.Name):
            base = call.func.value.id
            old = self.lookup(self.steps[i]["frames"][self.depth[i] - 1], base)
            new = self.lookup(self.frame_after(i), base)
            if old is not None and new is not None and _desc_text(old) != _desc_text(new):
                sentence += f" Now {base} is {_desc_text(new)}."
        if shown:
            sentence += f" It prints {shown}."
        return sentence

    def say_Import(self, node, i, error):
        names = [a.name for a in node.names]
        word = "module" if len(names) == 1 else "modules"
        return f"Python loads the {word} " + _and(f"«{n}»" for n in names) + ", so the program can use it."

    def say_ImportFrom(self, node, i, error):
        names = _and(f"«{a.name}»" for a in node.names)
        return f"Python loads {names} from the module «{node.module}»."

    def say_Break(self, node, i, error):
        return "«break» stops the loop at once. " + self.where_next(i)

    def say_Continue(self, node, i, error):
        line = self.next_line(i)
        back = f" Python goes back to the loop on line {line}." if line is not None else ""
        return "«continue» skips the rest of this turn of the loop." + back

    def say_Pass(self, node, i, error):
        return "«pass» does nothing. Python moves on."

    def say_Try(self, node, i, error):
        if node.handlers:
            return "Python starts the «try» part. If a line inside causes an error, Python jumps to «except»."
        return "Python starts the «try» part."

    def say_ExceptHandler(self, node, i, error):
        kind = f"«except {ast.unparse(node.type)}»" if node.type is not None else "«except»"
        if _in_block(node.body, self.next_line(i)):
            stored = f" The error is stored in {node.name}." if node.name else ""
            return f"The error matches {kind}, so Python runs the lines inside it." + stored
        return f"The error does not match {kind}, so Python looks further."

    def say_With(self, node, i, error):
        item = node.items[0]
        if _in_block(node.body, self.next_line(i)):
            if isinstance(item.optional_vars, ast.Name):
                return f"Python starts the «with» block. {item.optional_vars.id} is now ready to use."
            return "Python starts the «with» block."
        opened = (isinstance(item.context_expr, ast.Call) and isinstance(item.context_expr.func, ast.Name)
                  and item.context_expr.func.id == "open")
        if opened:
            return "The «with» block is finished, so Python closes the file."
        return "The «with» block is finished."

    def say_Assert(self, node, i, error):
        if error:
            return f"Python checks {_code(node.test)}. It is False, so Python stops with an AssertionError."
        return f"Python checks {_code(node.test)}. It is True, so the program carries on."

    def say_Delete(self, node, i, error):
        return "Python deletes " + _and(_code(t) for t in node.targets) + "."


# ---------------------------------------------------------------------------
# "Be the Computer": the real answers, read from one recorded run. The page
# and tools/check_course.py both use this, so there is one source of truth.
# ---------------------------------------------------------------------------

def _accepted(text, raw):
    """What the learner may type: the repr, and for text also without quotes."""
    options = [text]
    if raw is not None:
        options.append(raw)
        if '"' not in raw:
            options.append(f'"{raw}"')
    elif "'" in text and '"' not in text:
        options.append(text.replace("'", '"'))   # ['a', 'b'] typed as ["a", "b"]
    return list(dict.fromkeys(options))


def trace_quiz(code, inputs, asks, seed=None, files=None):
    watch = {a["name"] for a in asks if a.get("name")}
    result = trace(code, inputs, seed, watch=watch, files=files)
    steps = result["steps"]
    if not steps and result["status"] == "error":
        return {"status": "error", "error": result["error"], "answers": [
            {"error": "The program has a mistake before its first line runs."} for _ in asks]}
    links = _Narrator(code, result, []) if steps else None
    answers = []
    for ask in asks:
        if ask.get("output"):
            answers.append({"output": _normalise("".join(t for k, t in result["events"] if k == "out"))})
            continue
        line, hit, name = ask.get("line"), ask.get("hit", 1), ask.get("name")
        if not isinstance(line, int) or not name or not isinstance(hit, int) or hit < 1:
            answers.append({"error": "This question needs a line number, a name, and a hit of 1 or more."})
            continue
        runs = [i for i, s in enumerate(steps)
                if s["kind"] == "line" and s["line"] == line and not links.refire[i]]
        if not runs:
            answers.append({"error": f"Line {line} never runs."})
            continue
        if hit > len(runs):
            times = "once" if len(runs) == 1 else f"{len(runs)} times"
            answers.append({"error": f"Line {line} only runs {times}, so it has no run number {hit}."})
            continue
        i = runs[hit - 1]
        j = links.after[i]
        if j is not None:
            scopes = steps[j]["_watch"]
        elif links.depth[i] == 1 and result["status"] == "ok":
            scopes = [result["_final_watch"]]
        else:
            answers.append({"error": f"The program stops before line {line} finishes, so «{name}» has no value to read."})
            continue
        found = next((scope[name] for scope in reversed(scopes) if name in scope), None)
        if found is None:
            answers.append({"error": f"«{name}» does not exist right after line {line} runs (run number {hit})."})
            continue
        answers.append({"value": found[0], "accepted": _accepted(*found)})
    reply = {"status": result["status"], "answers": answers}
    if "error" in result:
        reply["error"] = result["error"]
    return reply


# ---------------------------------------------------------------------------
# "Catch the Bug": the learner's asserts must pass after the correct program
# and fail after every broken version.
# ---------------------------------------------------------------------------

def _asserts_after(program, tests):
    """Run `program`, then the learner's asserts in the same variables.

    Returns {"ok": True} or {"ok": False, "kind", ...}; "setup": True means
    the program itself would not run, which is a mistake in the course.
    """
    session = _Session([], seed=1)
    status = session.execute(program, filename=TARGET_FILENAME)
    if status["status"] != "ok":
        return {"ok": False, "setup": True, "kind": status["status"], "error": status.get("error")}
    status = session.execute(tests, fresh=False)
    if status["status"] == "ok":
        return {"ok": True, "error": None}
    if status["status"] == "error":
        error = status["error"]
        if error["type"] == "AssertionError":
            return {"ok": False, "kind": "assert", "error": error,
                    "message": error["message"] or f"The assert on line {error['line']} is not true."}
        return {"ok": False, "kind": "error", "error": error}
    if status["status"] == "need_input":
        return {"ok": False, "kind": "more_input", "error": None,
                "message": "Your asserts asked for input. They don't need any."}
    return {"ok": False, "kind": status["status"], "error": None, "line": status.get("line")}


def catch(tests, target, broken):
    try:
        compile(tests, FILENAME, "exec")
    except SyntaxError as exc:              # the learner's typing mistake - reported, not hidden
        problem = {"ok": False, "kind": "error", "error": _syntax_error_info(exc)}
        return {"passed": False, "on_target": problem, "caught": 0, "total": len(broken),
                "survivors": list(range(len(broken)))}
    on_target = _asserts_after(target, tests)
    if on_target.get("setup"):
        on_target["kind"] = "target_broken"
    caught, survivors, broken_errors = 0, [], []
    for index, version in enumerate(broken):
        outcome = _asserts_after(version, tests)
        if outcome.get("setup"):
            broken_errors.append({"index": index, "kind": outcome["kind"], "error": outcome["error"]})
            survivors.append(index)
        elif outcome["ok"]:
            survivors.append(index)
        else:
            caught += 1
    result = {"passed": on_target["ok"] and caught == len(broken), "on_target": on_target,
              "caught": caught, "total": len(broken), "survivors": survivors}
    if broken_errors:
        result["broken_errors"] = broken_errors
    return result


# ---------------------------------------------------------------------------
# Optional packages
# ---------------------------------------------------------------------------

def packages_needed(codes):
    """Which of numpy, pandas and matplotlib these pieces of code import."""
    found = set()
    for code in codes:
        try:
            tree = ast.parse(code or "")
        except SyntaxError:                 # code that cannot run imports nothing
            continue
        for node in ast.walk(tree):
            if isinstance(node, ast.Import):
                found.update(a.name.split(".")[0] for a in node.names)
            elif isinstance(node, ast.ImportFrom) and node.module and not node.level:
                found.add(node.module.split(".")[0])
    return sorted(found & set(OPTIONAL_PACKAGES))


# ---------------------------------------------------------------------------
# The >>> shell
# ---------------------------------------------------------------------------

_shells = {}


def shell(source, shell_id, reset=False):
    if reset or shell_id not in _shells:
        _shells[shell_id] = {"__name__": "__main__", "__builtins__": builtins}
        _reset_logging()
        _fresh_folder()
        if reset:
            return {"status": "reset"}
    try:
        compiled = codeop.compile_command(source, FILENAME, "single")
    except (SyntaxError, OverflowError, ValueError) as exc:
        if isinstance(exc, SyntaxError):
            return {"status": "error", "error": _syntax_error_info(exc), "events": []}
        return {"status": "error", "events": [],
                "error": {"type": type(exc).__name__, "message": str(exc), "line": None, "traceback": str(exc)}}
    if compiled is None:
        return {"status": "incomplete"}
    session = _Session([], namespace=_shells[shell_id])
    saved_hook = sys.displayhook
    sys.displayhook = sys.__displayhook__
    try:
        status = session.execute(source, compiled=compiled, fresh=False)
    finally:
        sys.displayhook = saved_hook
    status["events"] = session.recorder.events
    return status


# ---------------------------------------------------------------------------
# JSON entry points used by py-worker.js
# ---------------------------------------------------------------------------

def api_run(request):
    """`files` (optional, name -> text) are put in the folder before the run.
    The page sends the same files on every replay with more typed answers."""
    req = json.loads(request)
    session = _Session(req.get("inputs", []), seed=req.get("seed"))
    status = session.execute(req["code"], files=req.get("files"))
    status["events"] = session.recorder.events
    status["output"] = _normalise(session.recorder.text())
    status["files"], left_out = _folder_files()
    if left_out:
        status["files_left_out"] = left_out
    return json.dumps(status)


def api_check(request):
    req = json.loads(request)
    return json.dumps(check(req["code"], req["tests"]))


def api_trace(request):
    req = json.loads(request)
    return json.dumps(trace(req["code"], req.get("inputs", []), req.get("seed"), files=req.get("files")))


def api_trace_quiz(request):
    req = json.loads(request)
    return json.dumps(trace_quiz(req["code"], req.get("inputs", []), req.get("ask", []), req.get("seed"),
                                 files=req.get("files")))


def api_catch(request):
    req = json.loads(request)
    return json.dumps(catch(req.get("tests", ""), req["target"], req.get("broken", [])))


def api_packages(request):
    req = json.loads(request)
    codes = req.get("code", [])
    return json.dumps({"packages": packages_needed([codes] if isinstance(codes, str) else codes)})


def api_shell(request):
    req = json.loads(request)
    return json.dumps(shell(req.get("source", ""), req.get("id", "main"), req.get("reset", False)))
