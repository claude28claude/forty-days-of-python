// py-worker.js — runs Python in the background, away from the page.
//
// The page sends {id, kind, payload}; kind is "run", "check", "trace",
// "traceQuiz", "catch" or "shell". This worker hands the payload (as JSON) to
// harness.py and sends back {type: "result", id, result}. Because it runs in a
// separate thread, a slow program never freezes the page, and the page can
// stop it at any moment.
//
// numpy, pandas and matplotlib are large, so they are downloaded only when
// the code imports them. While one downloads, the worker sends
// {type: "status", id, message}; message is null again when it is done.

import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v314.0.7/full/pyodide.mjs";

const HARNESS_VERSION = "7";
let pyodide = null;
let api = null;
const downloaded = new Set();

const ready = (async () => {
  pyodide = await loadPyodide();
  const response = await fetch(new URL(`./harness.py?v=${HARNESS_VERSION}`, import.meta.url));
  if (!response.ok) throw new Error(`Could not load harness.py (HTTP ${response.status})`);
  pyodide.runPython(await response.text());
  api = {
    run: pyodide.globals.get("api_run"),
    check: pyodide.globals.get("api_check"),
    trace: pyodide.globals.get("api_trace"),
    traceQuiz: pyodide.globals.get("api_trace_quiz"),
    catch: pyodide.globals.get("api_catch"),
    shell: pyodide.globals.get("api_shell"),
    packages: pyodide.globals.get("api_packages"),
  };
  const version = pyodide.runPython("import sys; sys.version.split()[0]");
  postMessage({ type: "ready", version });
})();

ready.catch((err) => {
  postMessage({ type: "fatal", message: String((err && err.message) || err) });
});

// Every piece of Python in a request, so imports in hidden tests count too.
function codeIn(kind, payload) {
  if (kind === "shell") return [payload.source || ""];
  if (kind === "check") return [payload.code, ...(payload.tests || []).map((t) => t.py || "")];
  if (kind === "catch") return [payload.tests || "", payload.target || "", ...(payload.broken || [])];
  return [payload.code || ""];
}

async function downloadNeeded(id, kind, payload) {
  const wanted = JSON.parse(api.packages(JSON.stringify({ code: codeIn(kind, payload) })))
    .packages.filter((name) => !downloaded.has(name));
  if (!wanted.length) return;
  const names = wanted.join(" and ");
  postMessage({ type: "status", id, message: `Downloading ${names} (only the first time)…` });
  try {
    await pyodide.loadPackage(wanted);
  } catch (err) {
    throw new Error(`Could not download ${names}. Check the internet connection and try again. (${(err && err.message) || err})`);
  } finally {
    postMessage({ type: "status", id, message: null });
  }
  for (const name of wanted) downloaded.add(name);
}

onmessage = async (event) => {
  const { id, kind, payload } = event.data;
  try {
    await ready;
    await downloadNeeded(id, kind, payload);
    const text = api[kind](JSON.stringify(payload));
    postMessage({ type: "result", id, result: JSON.parse(text) });
  } catch (err) {
    // A failure here is a bug in the trainer itself (not the learner's code,
    // which harness.py always reports as a normal result), or a failed
    // download. Send it up so the page shows it instead of waiting forever.
    postMessage({ type: "result", id, failure: String((err && err.message) || err) });
  }
};
