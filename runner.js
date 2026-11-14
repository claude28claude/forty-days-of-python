// runner.js — the page's handle on Python.
//
// Starts py-worker.js, queues requests one at a time, and enforces a hard
// time limit: harness.py already stops runaway programs after 5 seconds, but
// if Python ever stops answering completely, the worker is thrown away and a
// fresh one is started.

//
// `status` holds a message while numpy, pandas or matplotlib downloads (null
// otherwise); listeners are told when it changes. The time limit pauses
// during a download, which has its own, longer limit.

(function () {
  const HARD_LIMIT_MS = { run: 15000, check: 30000, trace: 20000, traceQuiz: 20000, catch: 30000, shell: 15000 };
  const DOWNLOAD_LIMIT_MS = 180000;

  class PyRunner {
    constructor() {
      this.listeners = new Set();
      this.seq = 0;
      this.pending = new Map();
      this.queue = Promise.resolve();
      this.state = "loading";
      this.version = null;
      this.error = null;
      this.busy = false;
      this.status = null;
      this.start();
    }

    start() {
      this.state = "loading";
      this.error = null;
      this.status = null;
      this.emit();
      this.worker = new Worker("py-worker.js?v=5", { type: "module" });
      this.ready = new Promise((resolve, reject) => {
        this.resolveReady = resolve;
        this.rejectReady = reject;
      });
      // Avoid an "unhandled rejection" warning; callers await this.ready themselves.
      this.ready.catch(() => {});
      this.worker.onmessage = (event) => this.receive(event.data);
      this.worker.onerror = (event) => {
        this.fail(event.message || "The Python worker could not start.");
      };
    }

    fail(message) {
      this.state = "failed";
      this.error = message;
      this.rejectReady(new Error(message));
      this.emit();
    }

    receive(msg) {
      if (msg.type === "ready") {
        this.state = "ready";
        this.version = msg.version;
        this.resolveReady();
        this.emit();
      } else if (msg.type === "fatal") {
        this.fail(msg.message);
      } else if (msg.type === "status") {
        const job = this.pending.get(msg.id);
        if (job) job.downloading(msg.message != null);
        this.status = msg.message;
        this.emit();
      } else if (msg.type === "result") {
        const job = this.pending.get(msg.id);
        if (!job) return;
        this.pending.delete(msg.id);
        if (msg.failure) job.reject(new Error(msg.failure));
        else job.resolve(msg.result);
      }
    }

    // Throw the worker away (it may be stuck) and start a fresh one.
    restart(reason) {
      this.worker.terminate();
      for (const job of this.pending.values()) job.resolve({ status: reason, events: [] });
      this.pending.clear();
      this.start();
    }

    // Stop whatever is running right now.
    stop() {
      if (this.busy) this.restart("stopped");
    }

    retry() {
      this.worker.terminate();
      this.start();
    }

    onChange(fn) {
      this.listeners.add(fn);
      fn(this);
      return () => this.listeners.delete(fn);
    }

    emit() {
      for (const fn of this.listeners) fn(this);
    }

    call(kind, payload) {
      const job = this.queue.then(() => this.send(kind, payload));
      this.queue = job.catch(() => {});
      return job;
    }

    async send(kind, payload) {
      await this.ready;
      this.busy = true;
      this.emit();
      try {
        return await new Promise((resolve, reject) => {
          const id = ++this.seq;
          const limit = (ms) => setTimeout(() => this.restart("timeout"), ms);
          let timer = limit(HARD_LIMIT_MS[kind]);
          this.pending.set(id, {
            resolve: (value) => { clearTimeout(timer); resolve(value); },
            reject: (err) => { clearTimeout(timer); reject(err); },
            // A download is not the program running: give it its own limit,
            // then restart the normal one when it finishes.
            downloading: (on) => {
              clearTimeout(timer);
              timer = limit(on ? DOWNLOAD_LIMIT_MS : HARD_LIMIT_MS[kind]);
            },
          });
          this.worker.postMessage({ id, kind, payload });
        });
      } finally {
        this.busy = false;
        this.emit();
      }
    }

    // files: optional {name: text} put in the program's folder first; the
    // result's `files` holds the folder's text files afterwards.
    run(code, inputs = [], seed = null, files = null) {
      return this.call("run", files ? { code, inputs, seed, files } : { code, inputs, seed });
    }
    check(code, tests) {
      return this.call("check", { code, tests });
    }
    trace(code, inputs = [], seed = null, files = null) {
      return this.call("trace", files ? { code, inputs, seed, files } : { code, inputs, seed });
    }
    // ask: [{line, hit, name} | {output: true}] -> {status, answers: [{value, accepted} | {output} | {error}]}
    traceQuiz(code, inputs = [], ask = [], seed = null, files = null) {
      return this.call("traceQuiz", files ? { code, inputs, ask, seed, files } : { code, inputs, ask, seed });
    }
    // tests: the learner's asserts -> {passed, on_target, caught, total, survivors}
    catch(tests, target, broken) {
      return this.call("catch", { tests, target, broken });
    }
    shell(source, id = "main", reset = false) {
      return this.call("shell", { source, id, reset });
    }
  }

  window.PyRunner = PyRunner;
})();
