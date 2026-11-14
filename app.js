// app.js — the whole page: lessons, editor, output, simulation, progress.
//
// Sections, in order:
//   1. small helpers (building HTML, lesson text, colouring code)
//   2. saved progress, saved files, warm-up cards (Leitner queue), Weekly Win
//   3. the code editor
//   4. the output console and running programs
//   5. plain-English error explanations
//   6. the step-through simulation
//   7. lesson pieces: examples, quiz questions, exercises
//   8. pages: home (Today card), day, playground, cheat sheet, progress (backup),
//      certificate, warm-up, My Programs, glossary (and tap-to-define), self-test
//   9. top bar, offline use and page switching

(function () {
  "use strict";

  const C = window.Course;
  const py = new window.PyRunner();
  const app = document.getElementById("app");

  // ===========================================================================
  // 1. Helpers
  // ===========================================================================

  function h(tag, props, ...kids) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(props || {})) {
      if (value == null || value === false) continue;
      if (key === "class") node.className = value;
      else if (key === "html") node.innerHTML = value;
      else if (key === "text") node.textContent = value;
      else if (key.startsWith("on") && typeof value === "function") node.addEventListener(key.slice(2), value);
      else if (value === true) node.setAttribute(key, "");
      else node.setAttribute(key, value);
    }
    add(node, kids);
    return node;
  }

  function add(node, kids) {
    for (const kid of kids.flat(Infinity)) {
      if (kid == null || kid === false) continue;
      node.append(kid instanceof Node ? kid : String(kid));
    }
    return node;
  }

  const esc = (s) =>
    String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  function button(label, onclick, cls = "btn", extra = {}) {
    return h("button", { type: "button", class: cls, onclick, ...extra }, label);
  }

  // A button that needs a second click within 4 seconds (instead of a pop-up "Are you sure?").
  function confirmButton(label, confirmLabel, action, cls = "btn ghost") {
    let armed = null;
    const btn = button(label, () => {
      if (armed) {
        clearTimeout(armed);
        armed = null;
        btn.textContent = label;
        btn.classList.remove("armed");
        action();
        return;
      }
      btn.textContent = confirmLabel;
      btn.classList.add("armed");
      armed = setTimeout(() => {
        armed = null;
        btn.textContent = label;
        btn.classList.remove("armed");
      }, 4000);
    }, cls);
    return btn;
  }

  // Dates are kept as "YYYY-MM-DD" in the learner's own time zone.
  const dateKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const today = () => dateKey(new Date());
  const toDate = (key) => {
    const [y, m, d] = key.split("-").map(Number);
    return new Date(y, m - 1, d);
  };
  function addDays(key, n) {
    const d = toDate(key);
    d.setDate(d.getDate() + n);
    return dateKey(d);
  }
  // Whole days from a to b (UTC, so a clock change never gives 0.96 of a day).
  const daysBetween = (a, b) => {
    const utc = (key) => Date.UTC(...key.split("-").map((x, i) => (i === 1 ? x - 1 : +x)));
    return Math.round((utc(b) - utc(a)) / 86400000);
  };
  // The Monday that starts the week holding this date.
  const mondayOf = (key) => addDays(key, -((toDate(key).getDay() + 6) % 7));
  const longDate = (key) => toDate(key).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  function normalise(text) {
    const lines = String(text).replace(/\r\n/g, "\n").split("\n").map((l) => l.replace(/\s+$/, ""));
    while (lines.length && !lines[lines.length - 1]) lines.pop();
    while (lines.length && !lines[0]) lines.shift();
    return lines.join("\n");
  }

  // ---- lesson text: «code», **bold**, [link](https://…) ----
  function inline(text) {
    const re = /«([^»]*)»|\*\*([^*]+)\*\*|\[([^\]]+)\]\((https?:[^)\s]+)\)/g;
    let out = "";
    let last = 0;
    let m;
    while ((m = re.exec(text))) {
      out += esc(text.slice(last, m.index));
      if (m[1] !== undefined) out += `<code>${esc(m[1])}</code>`;
      else if (m[2] !== undefined) out += `<strong>${inline(m[2])}</strong>`;
      else out += `<a href="${esc(m[4])}" target="_blank" rel="noopener">${esc(m[3])}</a>`;
      last = re.lastIndex;
    }
    return out + esc(text.slice(last));
  }

  function md(text) {
    return String(text)
      .split(/\n\s*\n/)
      .map((block) => {
        const lines = block.split("\n");
        // A heading is only its own line; anything under it is a separate block.
        if (/^##\s/.test(block)) {
          const heading = `<h3>${inline(lines[0].replace(/^##\s+/, ""))}</h3>`;
          const rest = lines.slice(1).join("\n");
          return rest.trim() ? heading + md(rest) : heading;
        }
        // Lines starting with "| " show output exactly as a program would print it.
        if (lines.every((l) => /^\|( |$)/.test(l)))
          return `<pre class="out-block">${esc(lines.map((l) => l.replace(/^\| ?/, "")).join("\n"))}</pre>`;
        // Lines starting with ": " show Python code (coloured, not runnable).
        if (lines.every((l) => /^:( |$)/.test(l)))
          return `<pre class="code-static">${highlight(lines.map((l) => l.replace(/^: ?/, "")).join("\n"))}</pre>`;
        const bullet = /^\s*-\s+/;
        const numbered = /^\s*\d+\.\s+/;
        if (bullet.test(lines[0]) || numbered.test(lines[0])) {
          const kind = bullet.test(lines[0]) ? "ul" : "ol";
          const marker = kind === "ul" ? bullet : numbered;
          const items = [];
          for (const line of lines) {
            if (marker.test(line)) items.push(line.replace(marker, ""));
            else if (items.length) items[items.length - 1] += " " + line.trim();
          }
          return `<${kind}>${items.map((i) => `<li>${inline(i)}</li>`).join("")}</${kind}>`;
        }
        return `<p>${inline(lines.map((l) => l.trim()).join(" "))}</p>`;
      })
      .join("");
  }

  // ---- colouring Python code ----
  const KEYWORDS = new Set(
    "False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield".split(" ")
  );
  const BUILTINS = new Set(
    "print input len range int str float bool list dict set tuple sum min max abs round sorted reversed enumerate zip open type isinstance map filter any all super self repr chr ord pow divmod help".split(" ")
  );
  const TOKEN =
    /(#[^\n]*)|((?:[rRbBuUfF]{1,2})?(?:"""[\s\S]*?(?:"""|(?![\s\S]))|'''[\s\S]*?(?:'''|(?![\s\S]))|"(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?))|(\b\d[\d_]*(?:\.\d*)?(?:[eE][+-]?\d+)?j?|\.\d+)|([A-Za-z_À-￿][\wÀ-￿]*)/g;

  function highlight(code) {
    let out = "";
    let last = 0;
    let prevWord = "";
    let m;
    TOKEN.lastIndex = 0;
    while ((m = TOKEN.exec(code))) {
      out += esc(code.slice(last, m.index));
      const t = m[0];
      if (m[1]) out += `<span class="t-c">${esc(t)}</span>`;
      else if (m[2]) out += `<span class="t-s">${esc(t)}</span>`;
      else if (m[3]) out += `<span class="t-n">${esc(t)}</span>`;
      else {
        let cls = "";
        if (prevWord === "def" || prevWord === "class") cls = "t-f";
        else if (KEYWORDS.has(t)) cls = "t-k";
        else if (BUILTINS.has(t)) cls = "t-b";
        out += cls ? `<span class="${cls}">${esc(t)}</span>` : esc(t);
        prevWord = t;
      }
      last = TOKEN.lastIndex;
    }
    return out + esc(code.slice(last));
  }

  function staticCode(code, cls = "") {
    return h("pre", { class: `code-static ${cls}`, html: highlight(code) });
  }

  // ===========================================================================
  // 2. Saved progress (kept in this browser's localStorage)
  // ===========================================================================

  // Progress maps keyed by "<day slug>/...". Sample-day entries never belong in the real ones.
  const PROGRESS_MAPS = ["solved", "quiz", "peeked", "code", "done", "wrongs", "tries", "review"];
  function isSampleKey(key) {
    const slug = String(key).split("/")[0];
    return slug.startsWith("sample-") || (C.sampleDays || []).some((d) => d.slug === slug);
  }

  const Store = {
    KEY: "fortydays.python.v1",
    ok: true,
    data: null,
    timer: null,

    load() {
      let raw = null;
      try {
        raw = localStorage.getItem(this.KEY);
      } catch (err) {
        // Storage is switched off (private mode or blocked site data).
        this.ok = false;
      }
      let data = {};
      if (raw) {
        try {
          data = JSON.parse(raw);
        } catch (err) {
          // Damaged save: keep a copy for inspection and start fresh, visibly.
          this.backup(raw);
          notice("Your saved progress was damaged and could not be read, so it has been reset. A copy was kept under the name fortydays.python.damaged.");
        }
      }
      this.data = Object.assign(this.defaults(), data);
      this.sampleMode = false;
      this.real = null;
      // Sample-day answers saved before sample progress was kept apart move to the sample store.
      if (this.moveSampleOut()) this.save();
      // The seed fixes the shuffled order of quiz options and Parsons lines for this learner.
      if (!this.data.seed) {
        this.data.seed = Math.floor(Math.random() * 2 ** 31) + 1;
        this.save();
      }
    },

    // review: warm-up cards {box, due}; plan: when the learner means to study next;
    // programs: playground saves for My Programs; warmDone: the date of the last finished warm-up.
    defaults() {
      return {
        solved: {}, quiz: {}, peeked: {}, code: {}, done: {}, active: {}, playground: null, wrongs: {}, tries: {}, seed: 0,
        review: {}, plan: null, name: "", programs: [], warmDone: "",
      };
    },

    backup(raw) {
      try {
        localStorage.setItem(this.KEY.replace(".v1", ".damaged"), raw);
      } catch (err) {
        this.ok = false;
      }
    },

    save() {
      clearTimeout(this.timer);
      if (!this.ok) return;
      // A sample-day answer that finished after the learner left the sample days still goes to the sample store.
      if (!this.sampleMode) this.moveSampleOut();
      try {
        localStorage.setItem(this.sampleMode ? this.SAMPLE_KEY : this.KEY, JSON.stringify(this.data));
      } catch (err) {
        this.ok = false;
        notice("Your browser refused to save progress (storage is full or blocked). Your work on this page still runs, but it won't be remembered.");
      }
    },

    saveSoon() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.save(), 400);
    },

    touch(key) {
      // A late answer from a sample day (after leaving it) never counts as a study day.
      if (!this.sampleMode && key && isSampleKey(key)) return;
      const d = today();
      this.data.active[d] = (this.data.active[d] || 0) + 1;
    },

    // ---- Sample days (#/sample) keep their own progress under a separate key, so nothing done ----
    // there counts towards days studied, Weekly Win, certificates, warm-up cards or the progress page.
    SAMPLE_KEY: "fortydays.python.sample.v1",
    sampleMode: false,
    real: null,

    useSample(on) {
      if (!!on === this.sampleMode) return;
      this.save();
      if (on) {
        this.real = this.data;
        this.data = this.readSample();
        this.data.seed = this.real.seed; // the same shuffles as the real course
        this.sampleMode = true;
      } else {
        this.data = this.real;
        this.real = null;
        this.sampleMode = false;
      }
    },

    readSample() {
      let data = {};
      try {
        const raw = localStorage.getItem(this.SAMPLE_KEY);
        if (raw) data = JSON.parse(raw);
      } catch (err) {
        console.warn("Sample-day progress could not be read, so the sample days start fresh:", err);
      }
      return Object.assign(this.defaults(), data && typeof data === "object" ? data : {});
    },

    // Moves sample-day entries out of the real progress into the sample store. True when any moved.
    moveSampleOut() {
      if (this.sampleMode || !this.data) return false;
      const found = {};
      let any = false;
      for (const map of PROGRESS_MAPS) {
        const src = this.data[map];
        if (!src || typeof src !== "object") continue;
        for (const key of Object.keys(src)) {
          if (!isSampleKey(key)) continue;
          (found[map] = found[map] || {})[key] = src[key];
          delete src[key];
          any = true;
        }
      }
      if (!any || !this.ok) return any;
      const sample = this.readSample();
      for (const map of Object.keys(found)) sample[map] = Object.assign({}, found[map], sample[map]);
      try {
        localStorage.setItem(this.SAMPLE_KEY, JSON.stringify(sample));
      } catch (err) {
        console.warn("Sample-day progress could not be saved:", err);
      }
      return any;
    },
  };

  function notice(text) {
    const box = document.getElementById("notice");
    box.textContent = text;
    box.hidden = false;
  }

  // Exercises marked optional ("finish later") never block a day from being complete.
  function dayStats(day) {
    const required = day.practice.filter((ex) => !ex.optional);
    const exDone = required.filter((ex) => Store.data.solved[`${day.slug}/${ex.id}`]).length;
    const quizDone = day.quiz.filter((_, i) => Store.data.quiz[`${day.slug}/q${i}`]).length;
    return {
      exDone,
      exTotal: required.length,
      quizDone,
      quizTotal: day.quiz.length,
      complete: exDone === required.length && quizDone === day.quiz.length,
    };
  }

  function nextDay() {
    return C.days.find((d) => !Store.data.done[d.slug]) || null;
  }

  // The furthest day the learner has reached: any finished day, or the next one to do.
  function reachedDay() {
    const next = nextDay();
    if (!next) return Infinity;
    return Math.max(next.n, ...C.days.filter((d) => Store.data.done[d.slug]).map((d) => d.n));
  }

  // ---- Saved files: what each program wrote, kept for its next Run ----
  // Kept apart from progress (a separate localStorage key), because files can be large.
  // Each entry: {files: {name: text}, at, leftOut: [names not kept], tooBig: a sentence, or absent}.
  const FileStore = {
    KEY: "fortydays.python.files",
    PER_PROGRAM: 100000, // characters for one program's files
    TOTAL: 600000, // characters for every program's files together
    data: {},

    load() {
      let raw = null;
      try {
        raw = localStorage.getItem(this.KEY);
      } catch (err) {
        return; // Store.load has already told the learner that storage is blocked.
      }
      if (!raw) return;
      try {
        this.data = JSON.parse(raw) || {};
      } catch (err) {
        this.data = {};
        notice("The saved files from your programs were damaged and could not be read, so they have been cleared. Your progress is not affected.");
      }
    },

    save() {
      if (!Store.ok) return;
      try {
        localStorage.setItem(this.KEY, JSON.stringify(this.data));
      } catch (err) {
        notice("Your browser refused to keep your programs' files (storage is full or blocked). Programs still run, but their files will not be kept.");
      }
    },

    size(files) {
      return Object.entries(files || {}).reduce((n, [name, text]) => n + name.length + text.length, 0);
    },

    entry(key) {
      return this.data[key] || null;
    },

    // The files a Run starts with. Always an object, so every replay sends the same thing.
    get(key) {
      const e = this.data[key];
      return e && e.files ? e.files : {};
    },

    // The folder after a run. Too much is not kept, and the panel says why.
    set(key, files, leftOut = []) {
      const size = this.size(files);
      const others = Object.entries(this.data).reduce((n, [k, e]) => n + (k === key ? 0 : this.size(e.files)), 0);
      let tooBig = "";
      if (size > this.PER_PROGRAM)
        tooBig = `Your program's files hold ${size.toLocaleString("en-IN")} characters. Only ${this.PER_PROGRAM.toLocaleString("en-IN")} can be kept, so they were not saved for the next Run.`;
      else if (others + size > this.TOTAL)
        tooBig = "All your programs' saved files together are too big, so these were not saved. Clear the files of a program you no longer need.";
      if (tooBig) this.data[key] = { files: {}, at: today(), leftOut: Object.keys(files), tooBig };
      else if (!Object.keys(files).length && !(leftOut || []).length) delete this.data[key];
      else this.data[key] = { files, at: today(), leftOut: leftOut || [] };
      this.save();
    },

    clear(key) {
      delete this.data[key];
      this.save();
    },

    copy(from, to) {
      const e = this.data[from];
      if (e && Object.keys(e.files || {}).length) this.data[to] = { files: { ...e.files }, at: today(), leftOut: [] };
      this.save();
    },
  };

  // ---- Warm-up cards: a Leitner queue over the end-of-day questions ----
  // A card answered right moves up a box; each box waits longer (1, 2, 4, 8, 16, 32 days).
  // A wrong answer sends it back to the first box.
  const GAPS = [1, 2, 4, 8, 16, 32];
  const WARM_CARDS = 5;
  const COMEBACK_CARDS = 8;
  const COMEBACK_AWAY = 4; // whole days with no study before today

  const Review = {
    // Every end-of-day question answered right joins the queue, due the day after it was answered.
    // Running this on each visit also brings in answers saved before the queue existed.
    sync() {
      const queue = Store.data.review;
      for (const day of C.days) {
        day.quiz.forEach((_, i) => {
          const key = `${day.slug}/q${i}`;
          const answered = Store.data.quiz[key];
          if (answered && !queue[key]) queue[key] = { box: 0, due: addDays(answered.at || today(), GAPS[0]) };
        });
      }
    },

    // The question behind a key, or null when a changed lesson no longer has it.
    find(key) {
      const m = key.match(/^(.+)\/q(\d+)$/);
      const day = m && C.days.find((d) => d.slug === m[1]);
      const q = day && day.quiz[+m[2]];
      return q ? { key, day, q } : null;
    },

    // Whole days with no study, between the last study day and today.
    daysAway() {
      const t = today();
      const past = Object.keys(Store.data.active).filter((d) => d < t).sort();
      return past.length ? daysBetween(past[past.length - 1], t) - 1 : 0;
    },

    // Today's cards: the most overdue first, at least one trace card when one is due.
    // Which Tool? cards ("choose") stay hidden until their day has been reached.
    // After a long time away there are 8 cards, topped up from the most recent days.
    pick() {
      const t = today();
      const comeback = this.daysAway() >= COMEBACK_AWAY;
      // Today's warm-up is finished: it stays finished (no top-up with cards that are not due).
      if (Store.data.warmDone === t) return { cards: [], comeback };
      const limit = comeback ? COMEBACK_CARDS : WARM_CARDS;
      const reached = reachedDay();
      const all = Object.entries(Store.data.review)
        .map(([key, card]) => Object.assign(this.find(key) || {}, { card }))
        .filter((c) => c.q && !(c.q.skill === "choose" && c.day.n > reached));
      const due = all.filter((c) => c.card.due <= t)
        .sort((a, b) => a.card.due.localeCompare(b.card.due) || a.card.box - b.card.box || a.day.n - b.day.n);
      const cards = due.slice(0, limit);
      const trace = due.slice(limit).find((c) => c.q.skill === "trace");
      if (trace && cards.length && !cards.some((c) => c.q.skill === "trace")) cards[cards.length - 1] = trace;
      if (comeback && cards.length < limit) {
        const extra = all.filter((c) => c.card.due > t).sort((a, b) => b.day.n - a.day.n);
        cards.push(...extra.slice(0, limit - cards.length));
      }
      return { cards, comeback };
    },

    // The first pick on a card decides its box. A card shown early (comeback top-up) only moves down.
    record(key, right) {
      const card = Store.data.review[key] || { box: 0, due: today() };
      if (!right) {
        card.box = 0;
        card.due = addDays(today(), GAPS[0]);
      } else if (card.due <= today()) {
        card.box = Math.min(card.box + 1, GAPS.length - 1);
        card.due = addDays(today(), GAPS[card.box]);
      }
      Store.data.review[key] = card;
      Store.touch(key);
      Store.save();
    },
  };

  // ---- Weekly Win: 4 study days in a Monday-to-Sunday week wins that week ----
  const WEEK_TARGET = 4;

  function studyStats() {
    const days = Object.keys(Store.data.active).filter((d) => Store.data.active[d] > 0);
    const weeks = new Map();
    for (const d of days) weeks.set(mondayOf(d), (weeks.get(mondayOf(d)) || 0) + 1);
    const monday = mondayOf(today());
    const week = Array.from({ length: 7 }, (_, i) => !!Store.data.active[addDays(monday, i)]);
    const thisWeek = week.filter(Boolean).length;
    return {
      total: days.length,
      won: [...weeks.values()].filter((n) => n >= WEEK_TARGET).length,
      week,
      thisWeek,
      wonThisWeek: thisWeek >= WEEK_TARGET,
    };
  }

  // ===========================================================================
  // 3. The code editor: a textarea laid exactly over coloured code
  // ===========================================================================

  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  let charWidthCache = 0;
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => (charWidthCache = 0));

  function createEditor({ value = "", onChange, onRun, minLines = 3, label = "Python code editor" }) {
    const gutter = h("div", { class: "ed-gutter", "aria-hidden": "true" });
    const pre = h("pre", { class: "ed-hl", "aria-hidden": "true" });
    const mark = h("div", { class: "ed-mark", hidden: true });
    const ta = h("textarea", {
      class: "ed-input",
      spellcheck: "false",
      autocapitalize: "off",
      autocomplete: "off",
      autocorrect: "off",
      wrap: "off",
      "aria-label": label,
    });
    const inner = h("div", { class: "ed-inner", style: `--min-lines:${minLines}` }, mark, pre, ta);
    const scroller = h("div", { class: "ed-scroll" }, inner);
    const root = h("div", { class: "editor" }, gutter, scroller);
    let lines = 0;
    let markedLine = 0;
    let escaped = false;

    function refresh() {
      pre.innerHTML = highlight(ta.value) + " ";
      const n = ta.value.split("\n").length;
      if (n !== lines) {
        lines = n;
        gutter.innerHTML = Array.from({ length: n }, (_, i) => `<span>${i + 1}</span>`).join("");
        if (markedLine) paintMark();
      }
      ta.scrollTop = 0;
      ta.scrollLeft = 0;
    }

    function charWidth() {
      if (!charWidthCache) {
        const probe = h("span", { class: "ed-probe" }, "x".repeat(40));
        inner.append(probe);
        charWidthCache = probe.getBoundingClientRect().width / 40 || 8.4;
        probe.remove();
      }
      return charWidthCache;
    }

    const lineStart = (pos) => ta.value.lastIndexOf("\n", pos - 1) + 1;

    function keepCaretVisible() {
      const pos = ta.selectionEnd;
      const x = 16 + (pos - lineStart(pos)) * charWidth();
      const view = scroller.clientWidth;
      if (x > scroller.scrollLeft + view - 24) scroller.scrollLeft = x - view + 56;
      else if (x < scroller.scrollLeft + 16) scroller.scrollLeft = Math.max(0, x - 40);
    }

    function insert(text) {
      ta.focus();
      // execCommand keeps Ctrl+Z (undo) working; setRangeText is the fallback.
      if (!document.execCommand("insertText", false, text)) {
        ta.setRangeText(text, ta.selectionStart, ta.selectionEnd, "end");
        ta.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }

    function indent(outdent) {
      const { selectionStart: s, selectionEnd: e, value: v } = ta;
      const multi = v.slice(s, e).includes("\n");
      if (!multi && !outdent) {
        const col = s - lineStart(s);
        insert(" ".repeat(4 - (col % 4)));
        return;
      }
      const a = lineStart(s);
      let end = e;
      if (multi && v[end - 1] === "\n") end -= 1;
      const z = v.indexOf("\n", end) === -1 ? v.length : v.indexOf("\n", end);
      const before = v.slice(a, z).split("\n");
      const after = before.map((l) => (outdent ? l.replace(/^ {1,4}/, "") : l.length ? "    " + l : l));
      const text = after.join("\n");
      if (text === v.slice(a, z)) return;
      ta.setSelectionRange(a, z);
      insert(text);
      if (multi) ta.setSelectionRange(a, a + text.length);
      else {
        const removed = before[0].length - after[0].length;
        const caret = Math.max(a, s - removed);
        ta.setSelectionRange(caret, caret);
      }
    }

    function newline() {
      const s = ta.selectionStart;
      const a = lineStart(s);
      const before = ta.value.slice(a, s);
      let pad = before.match(/^ */)[0];
      const trimmed = before.trim();
      if (/:\s*(#.*)?$/.test(trimmed)) pad += "    ";
      else if (/^(return|pass|break|continue|raise)\b/.test(trimmed)) pad = pad.slice(0, Math.max(0, pad.length - 4));
      insert("\n" + pad);
    }

    function backspace(event) {
      const s = ta.selectionStart;
      if (s !== ta.selectionEnd) return;
      const before = ta.value.slice(lineStart(s), s);
      if (!before.length || /[^ ]/.test(before)) return;
      event.preventDefault();
      const remove = before.length % 4 || 4;
      ta.setSelectionRange(s - remove, s);
      if (!document.execCommand("delete")) {
        ta.setRangeText("", s - remove, s, "end");
        ta.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }

    ta.addEventListener("keydown", (event) => {
      const mod = event.ctrlKey || event.metaKey;
      if (mod && event.key === "Enter") {
        event.preventDefault();
        if (onRun) onRun();
        return;
      }
      if (event.key === "Escape") {
        escaped = true; // the next Tab moves focus out instead of indenting
        return;
      }
      if (event.key === "Tab" && !mod && !event.altKey) {
        if (escaped) {
          escaped = false;
          return;
        }
        event.preventDefault();
        indent(event.shiftKey);
        return;
      }
      if (event.key !== "Shift") escaped = false;
      if (event.key === "Enter" && !event.shiftKey && !mod && !event.altKey && !event.isComposing) {
        event.preventDefault();
        newline();
      } else if (event.key === "Backspace" && !mod) {
        backspace(event);
      }
    });

    ta.addEventListener("input", () => {
      refresh();
      keepCaretVisible();
      clearMark();
      if (onChange) onChange(ta.value);
    });
    ta.addEventListener("click", keepCaretVisible);
    ta.addEventListener("keyup", (e) => {
      if (e.key.startsWith("Arrow") || e.key === "Home" || e.key === "End") keepCaretVisible();
    });

    function paintMark() {
      gutter.querySelectorAll(".err").forEach((n) => n.classList.remove("err"));
      if (!markedLine || markedLine > lines) {
        mark.hidden = true;
        return;
      }
      mark.hidden = false;
      mark.style.top = `calc(var(--ed-pad-y) + ${markedLine - 1} * var(--ed-lh))`;
      const num = gutter.children[markedLine - 1];
      if (num) num.classList.add("err");
    }

    function markLine(n) {
      markedLine = n || 0;
      paintMark();
    }

    function clearMark() {
      if (markedLine) markLine(0);
    }

    let toolbar = null;
    if (coarsePointer) {
      const key = (label, text, back = 0) =>
        h("button", {
          type: "button",
          class: "kbtn",
          onmousedown: (e) => e.preventDefault(),
          onclick: () => {
            if (text === "TAB") indent(false);
            else if (text === "UNTAB") indent(true);
            else {
              insert(text);
              if (back) ta.setSelectionRange(ta.selectionStart - back, ta.selectionStart - back);
            }
          },
        }, label);
      toolbar = h("div", { class: "ed-keys" },
        key("⇥ Indent", "TAB"), key("⇤", "UNTAB"), key(":", ":"), key("( )", "()", 1),
        key('" "', '""', 1), key("[ ]", "[]", 1), key("{ }", "{}", 1), key("=", " = "), key("#", "# "),
        key("₹", "₹"), key("\\", "\\"));
    }

    ta.value = value;
    refresh();

    return {
      root: toolbar ? h("div", { class: "editor-wrap" }, root, toolbar) : root,
      get value() {
        return ta.value;
      },
      set value(v) {
        ta.value = v;
        refresh();
        clearMark();
        if (onChange) onChange(v);
      },
      focus: () => ta.focus(),
      markLine,
      clearMark,
    };
  }

  // ===========================================================================
  // 4. Output console and running programs
  // ===========================================================================

  const liveViews = new Set(); // consoles on the current page, so leaving the page can cancel them

  class ConsoleView {
    constructor(title = "Output") {
      this.status = h("span", { class: "con-status" });
      this.stopBtn = button("Stop", () => py.stop(), "btn tiny ghost", { hidden: true });
      this.body = h("div", { class: "con-body", role: "log" });
      this.extra = h("div", { class: "con-extra" });
      this.titleEl = h("span", { class: "con-title" }, title);
      this.root = h("div", { class: "console", hidden: true },
        h("div", { class: "con-head" }, this.titleEl, this.status, this.stopBtn), this.body, this.extra);
      this.waiting = null;
      this.token = null;
      liveViews.add(this);
    }

    show() {
      this.root.hidden = false;
    }

    hide() {
      this.cancel();
      this.token = null;
      this.root.hidden = true;
    }

    setTitle(text) {
      this.titleEl.textContent = text;
    }

    setStatus(text, kind = "") {
      this.status.textContent = text;
      this.status.className = `con-status ${kind}`;
    }

    busy(on) {
      this.stopBtn.hidden = !on;
    }

    render(events, emptyNote = "") {
      this.body.textContent = "";
      this.extra.textContent = "";
      add(this.body, renderEvents(events));
      if (!events.length && emptyNote) this.body.append(h("span", { class: "con-empty" }, emptyNote));
    }

    note(node) {
      this.extra.append(node);
    }

    ask() {
      return new Promise((resolve) => {
        const input = h("input", {
          class: "con-input",
          type: "text",
          autocomplete: "off",
          spellcheck: "false",
          autocapitalize: "off",
          "aria-label": "Type your answer, then press Enter",
        });
        const finish = (value) => {
          this.waiting = null;
          resolve(value);
        };
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            input.disabled = true;
            finish(input.value);
          }
        });
        this.body.append(input, h("span", { class: "con-hint" }, "  ← type here, then press Enter"));
        this.waiting = { finish, input };
        input.focus();
      });
    }

    cancel() {
      if (this.waiting) {
        const { finish } = this.waiting;
        this.waiting = null;
        finish(null);
      }
    }
  }

  function renderEvents(events, mark) {
    const nodes = [];
    let list = events;
    if (mark) {
      const [count, len] = mark;
      list = events.slice(0, count).map((e, i) => (i === count - 1 ? [e[0], e[1].slice(0, len)] : e));
    }
    for (const [kind, text] of list) nodes.push(h("span", { class: `ev-${kind}` }, text));
    return nodes;
  }

  function pythonProblem(err) {
    return h("div", { class: "errcard" },
      h("div", { class: "errcard-title" }, "Python itself had a problem (not your code)"),
      h("div", { class: "errcard-body", html: md(
        py.state === "failed"
          ? `Python couldn't load: «${py.error}». Check your internet connection, then press **Retry** at the top of the page.`
          : `Something went wrong inside the trainer: «${err && err.message ? err.message : err}». Try running again.`) }));
  }

  // filesKey: keep this program's files between runs (FileStore). onFiles is told when they change.
  // startFiles: the lesson's starting files, used when nothing is saved yet.
  async function runProgram({ code, view, editor, filesKey = null, onFiles = null, startFiles = null }) {
    for (const v of liveViews) if (v !== view) v.cancel();
    // Every replay (one per typed answer) starts from these same files.
    const files = startingFiles(filesKey, startFiles);
    const token = {};
    view.cancel();
    view.token = token;
    view.show();
    view.setTitle("Output");
    if (editor) editor.clearMark();
    const seed = Math.floor(Math.random() * 2 ** 31);
    const inputs = [];
    view.render([]);
    view.setStatus(py.state === "ready" ? "Running…" : "Starting Python… (the first time takes a few seconds)", "busy");
    view.busy(true);
    for (;;) {
      let res;
      try {
        res = await py.run(code, inputs, seed, files);
      } catch (err) {
        if (view.token !== token) return null;
        view.busy(false);
        view.setStatus("Problem", "bad");
        view.note(pythonProblem(err));
        return null;
      }
      if (view.token !== token) return null; // a newer run replaced this one
      if (res.status === "need_input") {
        view.busy(false);
        view.render(res.events);
        view.setStatus("Waiting for you to type…", "wait");
        const value = await view.ask();
        if (value === null || view.token !== token) return null;
        inputs.push(value);
        view.setStatus("Running…", "busy");
        view.busy(true);
        continue;
      }
      view.busy(false);
      showResult(view, res, editor);
      // A run Python could not finish (stopped, restarted) sends no files, so the old ones stay.
      if (filesKey && res.files) {
        FileStore.set(filesKey, res.files, res.files_left_out);
        if (onFiles) onFiles();
      }
      return res;
    }
  }

  function showResult(view, res, editor) {
    view.render(res.events || [], res.status === "ok" ? "Your program finished without printing anything." : "");
    if (res.status === "ok") {
      view.setStatus("Finished", "good");
    } else if (res.status === "error") {
      view.setStatus(`${res.error.type}${res.error.line ? ` on line ${res.error.line}` : ""}`, "bad");
      view.note(errorCard(res.error));
      if (editor && res.error.line) editor.markLine(res.error.line);
    } else if (res.status === "timeout" || res.status === "too_much_output") {
      view.setStatus("Stopped", "bad");
      view.note(errorCard({ type: res.status, line: res.line }));
      if (editor && res.line) editor.markLine(res.line);
    } else if (res.status === "stopped") {
      view.setStatus("Stopped", "");
    }
  }

  // ===========================================================================
  // 5. Plain-English error explanations
  // ===========================================================================

  const TYPE_WORDS = {
    str: "text (str)",
    int: "a whole number (int)",
    float: "a decimal number (float)",
    bool: "True/False (bool)",
    list: "a list",
    dict: "a dictionary (dict)",
    tuple: "a tuple",
    set: "a set",
    NoneType: "None (nothing)",
    function: "a function",
    builtin_function_or_method: "a built-in function",
    method: "a method",
    module: "a module",
  };
  const typeWords = (t) => TYPE_WORDS[t] || `a ${t}`;

  const LABELS = {
    SyntaxError: "Python couldn't read this",
    IndentationError: "Indentation problem",
    TabError: "Indentation problem",
    NameError: "Unknown name",
    UnboundLocalError: "Variable used too early",
    TypeError: "Wrong type of value",
    ValueError: "Unusable value",
    ZeroDivisionError: "Division by zero",
    IndexError: "That position doesn't exist",
    KeyError: "Key not found",
    AttributeError: "No such method or attribute",
    ModuleNotFoundError: "Module not found",
    ImportError: "Import problem",
    RecursionError: "A function that never stops calling itself",
    FileNotFoundError: "File not found",
    AssertionError: "An assert failed",
    OverflowError: "Number too big",
    timeout: "Your program took too long",
    too_much_output: "Your program printed too much",
  };

  const SYNTAX_RULES = [
    [/'(.)' was never closed/, (m) => `A bracket «${m[1]}» was opened but never closed. Every «(» needs a matching «)», every «[» a «]», and every «{» a «}».`],
    [/unterminated (triple-quoted )?string literal/, () => `A piece of text was started with a quote mark but never finished. Text needs a quote at the start **and** at the end, like «"hello"».`],
    [/expected ':'/, () => `This line needs a colon «:» at the end. Lines that start with «if», «elif», «else», «for», «while», «def», «class», «try» and «except» always end with a colon.`],
    [/Missing parentheses in call to 'print'/, () => `In Python 3, «print» needs round brackets: «print("hello")».`],
    [/Perhaps you forgot a comma/, () => `Python thinks a comma is missing — for example between two values inside «print( )» or inside a list.`],
    [/Maybe you meant '==' or ':=' instead of '='/, () => `To **compare** two values, use «==» (two equals signs). A single «=» **stores** a value in a variable.`],
    [/cannot assign to (.+?)( here)?\b/, (m) => `The left side of «=» must be a variable name. You can't store a value into ${m[1]}. (If you meant to compare, use «==».)`],
    [/unmatched '(.)'/, (m) => `There's a closing «${m[1]}» with no opening bracket to match it.`],
    [/closing parenthesis '(.)' does not match opening parenthesis '(.)'/, (m) => `The brackets don't match: a «${m[2]}» was opened but closed with «${m[1]}».`],
    [/invalid decimal literal/, () => `A number has letters stuck to it, or a variable name starts with a digit (like «2nd_place»). Names must start with a letter or «_».`],
    [/invalid character '(.)'/, (m) => `There's a character Python doesn't understand: «${m[1]}». This often happens with curly quotes “ ” copied from a document — type straight quotes «"» instead.`],
    [/invalid non-printable character/, () => `There's an invisible character on this line (often from copy-pasting). Delete the line and type it again.`],
    [/expected an indented block/, () => `The line after a colon «:» must be indented — pushed to the right by 4 spaces. Press **Tab** at the start of the line.`],
    [/unexpected indent/, () => `This line is pushed to the right, but it shouldn't be. Remove the spaces at the start of the line so it lines up with the line above.`],
    [/unindent does not match any outer indentation level/, () => `The spaces at the start of this line don't line up with any line above. Use exactly 4 spaces for each level.`],
    [/inconsistent use of tabs and spaces/, () => `This line mixes tab characters and spaces. Delete the indentation and use spaces only.`],
    [/'return' outside function/, () => `«return» can only be used inside a function (a block that starts with «def»).`],
    [/'(break|continue)' (outside loop|not properly in loop)/, (m) => `«${m[1]}» only works inside a loop («for» or «while»).`],
    [/expected 'except' or 'finally' block/, () => `A «try:» block must be followed by an «except ...:» block.`],
    [/f-string/, () => `Something inside the curly brackets «{ }» of an f-string is broken. Check the brackets and quotes inside it.`],
    [/invalid syntax/, () => `Python couldn't understand this line. Look for a missing bracket, quote mark, colon or comma. The mistake is often just before the spot marked with «^» in Python's message — or at the end of the line above.`],
  ];

  function explainError(err) {
    const t = err.type;
    const m = err.message || "";
    let text;
    if (t === "SyntaxError" || t === "IndentationError" || t === "TabError") {
      const rule = SYNTAX_RULES.find(([re]) => re.test(m));
      text = rule ? rule[1](m.match(rule[0])) : `Python couldn't understand this line: ${m}.`;
    } else if (t === "NameError") {
      const name = err.name || (m.match(/name '(.+?)'/) || [])[1] || "?";
      text = `Python doesn't know anything called «${name}». Check the spelling — capital letters count, so «Name» and «name» are different. If «${name}» is meant to be text, it needs quotes: «"${name}"». If it's a variable, make sure you create it (with «=») **before** this line.`;
    } else if (t === "UnboundLocalError") {
      text = `Inside a function you used a variable before giving it a value in that function. Give it a value first, or pass it in as a parameter.`;
    } else if (t === "TypeError") {
      let r;
      if ((r = m.match(/can only concatenate str \(not "(\w+)"\) to str/)))
        text = `You tried to join text and ${typeWords(r[1])} with «+». Text can only be joined to text. Turn the number into text with «str(...)», or use an f-string like «f"Total: {total}"».`;
      else if ((r = m.match(/unsupported operand type\(s\) for (.+?): '(\w+)' and '(\w+)'/)))
        text = `You can't use «${r[1]}» between ${typeWords(r[2])} and ${typeWords(r[3])}.${r.slice(2).includes("str") ? " Often this means a value from «input()» is still text — convert it first with «int(...)» or «float(...)»." : ""}${r.slice(2).includes("NoneType") ? " A «None» often comes from a function that prints instead of using «return»." : ""}`;
      else if ((r = m.match(/can't multiply sequence by non-int of type '(\w+)'/)))
        text = `You tried to multiply by ${typeWords(r[1])}. If the number came from «input()», convert it first with «int(...)».`;
      else if ((r = m.match(/'(\w+)' object is not callable/)))
        text = `You put round brackets «( )» after ${typeWords(r[1])}, but only functions can be called like that. Did you give a variable the same name as a function — for example «print = ...», «input = ...», «sum = ...» or «list = ...»?`;
      else if ((r = m.match(/(\w+)\(\) missing (\d+) required positional arguments?: (.+)/)))
        text = `The function «${r[1]}» needs more values inside its brackets. It is missing: ${r[3]}.`;
      else if ((r = m.match(/(\w+)\(\) takes (\d+) positional arguments? but (\d+) (?:were|was) given/)))
        text = `«${r[1]}» expects ${r[2]} value(s) in its brackets, but got ${r[3]}.${+r[3] === +r[2] + 1 ? " Inside a class, did you forget «self» as the first parameter of a method?" : ""}`;
      else if ((r = m.match(/'(\w+)' object is not subscriptable/)))
        text = `You used square brackets «[ ]» on ${typeWords(r[1])}, which doesn't have positions or keys.`;
      else if ((r = m.match(/'(\w+)' object does not support item assignment/)))
        text = `You can't change part of ${typeWords(r[1])} — ${r[1] === "str" ? "text" : "it"} can't be changed once made. Build a new one instead.`;
      else if ((r = m.match(/'(.)' not supported between instances of '(\w+)' and '(\w+)'/)))
        text = `You can't compare ${typeWords(r[2])} with ${typeWords(r[3])} using «${r[1]}». If one came from «input()», convert it with «int(...)» first.`;
      else if ((r = m.match(/object of type '(\w+)' has no len\(\)/)))
        text = `«len()» can't measure ${typeWords(r[1])}. It works on text, lists, tuples and dictionaries.`;
      else if (/sequence item \d+: expected str instance/.test(m))
        text = `«.join()» only joins text. Turn numbers into text first, e.g. «[str(n) for n in numbers]».`;
      else if ((r = m.match(/'(\w+)' object is not iterable/)))
        text = `You tried to loop over ${typeWords(r[1])}, but you can only loop over things with several items — text, lists, ranges, dictionaries.${r[1] === "int" ? " To repeat a number of times, use «range(...)»." : ""}`;
      else text = `A value of the wrong type was used here: ${m}.`;
    } else if (t === "ValueError") {
      let r;
      if ((r = m.match(/invalid literal for int\(\) with base 10: (.+)/)))
        text = `«int()» can only turn text that looks like a whole number into a number. It was given ${r[1]}.${/\./.test(r[1]) ? " For decimals use «float()» instead." : ""}`;
      else if ((r = m.match(/could not convert string to float: (.+)/)))
        text = `«float()» can only turn text that looks like a number into a number. It was given ${r[1]}.`;
      else if (/x not in list/.test(m)) text = `You tried to remove something that isn't in the list. Check with «if item in my_list:» first.`;
      else if (/is not in list/.test(m)) text = `You asked for the position of something that isn't in the list.`;
      else if (/too many values to unpack|not enough values to unpack/.test(m))
        text = `The number of names on the left of «=» doesn't match the number of values on the right. (${m})`;
      else if (/math domain error/.test(m)) text = `That maths isn't possible — for example the square root of a negative number.`;
      else text = `The value has the right type but can't be used here: ${m}.`;
    } else if (t === "ZeroDivisionError") {
      text = `You divided by zero, which is impossible in maths. Check the number after «/», «//» or «%».`;
    } else if (t === "IndexError") {
      text = /pop from empty/.test(m)
        ? `You tried to take an item out of an empty list.`
        : `You asked for a position that doesn't exist. Positions start at 0, so a list with 3 items has positions 0, 1 and 2 — position 3 doesn't exist. «len(...)» tells you how many items there are.`;
    } else if (t === "KeyError") {
      text = `The dictionary has no key ${err.key || m}. Check spelling and capital letters, or use «.get(key)», which gives «None» instead of crashing.`;
    } else if (t === "AttributeError") {
      let r;
      if ((r = m.match(/'(\w+)' object has no attribute '(\w+)'/)))
        text = `${typeWords(r[1]).replace(/^./, (c) => c.toUpperCase())} doesn't have anything called «.${r[2]}». Check the spelling.${r[1] === "NoneType" ? " A «None» often comes from a function that prints instead of using «return», or from a method like «.sort()» that changes a list but gives back nothing." : ""}`;
      else if ((r = m.match(/module '(\w+)' has no attribute '(\w+)'/))) text = `The «${r[1]}» module has nothing called «${r[2]}». Check the spelling.`;
      else text = m;
    } else if (t === "ModuleNotFoundError") {
      text = `Python can't find that module. Check the spelling. (This page includes Python's standard modules, like «math», «random» and «datetime».)`;
    } else if (t === "RecursionError") {
      text = `A function kept calling itself and never stopped. Make sure there's a case where it returns without calling itself again.`;
    } else if (t === "FileNotFoundError") {
      text = `There's no file with that name. A file only exists after your program creates it. **Run** keeps the files your program wrote last time, but **Check answer** always starts with an empty folder.`;
    } else if (t === "AssertionError") {
      text = `An «assert» line found that something wasn't true.${m ? ` Message: ${m}` : ""}`;
    } else if (t === "timeout") {
      text = `Your program ran for more than 5 seconds, so it was stopped. This almost always means a loop that never ends. Check that your «while» condition becomes False at some point — for example, did you forget «count += 1»?`;
    } else if (t === "too_much_output") {
      text = `Your program printed so much text that it was stopped. You probably have a loop that never ends — check your «while» condition.`;
    } else {
      text = m || "Something went wrong.";
    }
    const guess = m.match(/Did you mean:? '([^']+)'\?/);
    if (guess) text += ` Python's guess: did you mean «${guess[1]}»?`;
    const label = LABELS[t] || t;
    const where = err.line ? `line ${err.line}` : "";
    return { label, where, type: t, html: md(text) };
  }

  function errorCard(err, lead = "") {
    const ex = explainError(err);
    const isPythonError = !(err.type === "timeout" || err.type === "too_much_output");
    return h("div", { class: "errcard" },
      h("div", { class: "errcard-title" },
        h("span", {}, ex.label),
        ex.where ? h("span", { class: "errcard-where" }, ex.where) : null,
        isPythonError ? h("span", { class: "errcard-type" }, ex.type) : null),
      lead ? h("div", { class: "errcard-lead", html: md(lead) }) : null,
      h("div", { class: "errcard-body", html: ex.html }),
      err.traceback ? h("details", { class: "errcard-raw" }, h("summary", {}, "Python's own message"), h("pre", {}, err.traceback)) : null);
  }

  // ===========================================================================
  // 6. Step-through simulation
  // ===========================================================================

  function valueNode(d) {
    if (d.items) {
      const cells = d.items.map((item, i) =>
        h("div", { class: "v-cell" }, h("div", { class: "v-cell-val" }, valueNode(item)), d.t === "set" ? null : h("div", { class: "v-cell-i" }, i)));
      if (d.more) cells.push(h("div", { class: "v-cell more" }, `+${d.more} more`));
      return h("div", { class: "v-seq" }, h("span", { class: "v-tag" }, d.t), cells.length ? h("div", { class: "v-cells" }, cells) : h("span", { class: "v-empty" }, "empty"));
    }
    if (d.pairs) {
      const rows = d.pairs.map(([k, v]) => h("div", { class: "v-pair" }, h("span", { class: "v-key t-s" }, k), h("span", { class: "v-arrow" }, "→"), valueNode(v)));
      if (d.more) rows.push(h("div", { class: "v-pair more" }, `+${d.more} more`));
      return h("div", { class: "v-seq" }, h("span", { class: "v-tag" }, "dict"), rows.length ? h("div", { class: "v-pairs" }, rows) : h("span", { class: "v-empty" }, "empty"));
    }
    if (d.attrs) {
      const rows = d.attrs.map(([k, v]) => h("div", { class: "v-pair" }, h("span", { class: "v-key" }, `.${k}`), h("span", { class: "v-arrow" }, "="), valueNode(v)));
      return h("div", { class: "v-seq" }, h("span", { class: "v-tag" }, `${d.t} object`), rows.length ? h("div", { class: "v-pairs" }, rows) : h("span", { class: "v-empty" }, "no attributes yet"));
    }
    const cls = { str: "t-s", int: "t-n", float: "t-n", complex: "t-n", bool: "t-k", NoneType: "t-k", function: "t-f", class: "t-f" }[d.t] || "";
    const prefix = d.t === "function" ? "function " : d.t === "class" ? "class " : "";
    return h("span", { class: `v-prim ${cls}`, title: d.t }, prefix + d.r);
  }

  class Stepper {
    constructor() {
      this.root = h("div", { class: "stepper", hidden: true, tabindex: "-1" });
      this.root.addEventListener("keydown", (e) => {
        if (e.target.tagName === "INPUT" && e.target.type === "text") return;
        if (e.key === "ArrowRight") {
          e.preventDefault();
          this.go(this.index + 1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          this.go(this.index - 1);
        }
      });
      this.token = null;
    }

    close() {
      this.token = null;
      this.root.hidden = true;
    }

    async open(code, inputs = []) {
      this.code = code;
      this.lines = code.split("\n");
      this.inputs = inputs.slice();
      this.seed = Math.floor(Math.random() * 2 ** 31);
      this.root.hidden = false;
      this.root.textContent = "";
      this.root.append(h("div", { class: "st-loading" }, py.state === "ready" ? "Recording each step…" : "Starting Python… (the first time takes a few seconds)"));
      await this.load(0);
      this.root.focus({ preventScroll: true });
    }

    async load(index) {
      const token = {};
      this.token = token;
      let res;
      try {
        res = await py.trace(this.code, this.inputs, this.seed, this.filesFor ? this.filesFor() : null);
      } catch (err) {
        if (this.token !== token) return;
        this.root.textContent = "";
        this.root.append(pythonProblem(err));
        return;
      }
      if (this.token !== token) return;
      if (!res.steps) {
        // Python was stopped or restarted before it could answer.
        this.root.textContent = "";
        this.root.append(h("div", { class: "st-loading" }, "The simulation was stopped."));
        return;
      }
      this.res = res;
      const steps = res.steps.slice();
      const last = steps[steps.length - 1];
      const allOut = res.events.length ? [res.events.length, res.events[res.events.length - 1][1].length] : [0, 0];
      if (res.status === "need_input") {
        steps.push({ kind: "input", prompt: res.prompt, line: last ? last.line : 1, frames: last ? last.frames : [], out: allOut });
      } else {
        steps.push({ kind: "end", status: res.status, error: res.error, line: res.error ? res.error.line : res.line, frames: res.final || (last ? last.frames : []), out: allOut });
      }
      this.steps = steps;
      this.build();
      this.go(Math.min(index, steps.length - 1));
    }

    build() {
      this.root.textContent = "";
      this.codeLines = this.lines.map((line, i) =>
        h("div", { class: "st-line" },
          h("span", { class: "st-arrow" }),
          h("span", { class: "st-num" }, i + 1),
          h("code", { html: highlight(line) || " " })));
      this.counter = h("span", { class: "st-count" });
      this.explain = h("div", { class: "st-explain", "aria-live": "polite" });
      this.vars = h("div", { class: "st-vars" });
      this.out = h("div", { class: "con-body st-out" });
      this.slider = h("input", { type: "range", min: "0", max: String(this.steps.length - 1), value: "0", class: "st-slider", "aria-label": "Step" });
      this.slider.addEventListener("input", () => this.go(+this.slider.value));
      this.btnFirst = button("⏮", () => this.go(0), "btn ghost icon", { "aria-label": "First step", title: "First step" });
      this.btnPrev = button("◀ Back", () => this.go(this.index - 1), "btn ghost");
      this.btnNext = button("Next ▶", () => this.go(this.index + 1), "btn primary");
      this.btnLast = button("⏭", () => this.go(this.steps.length - 1), "btn ghost icon", { "aria-label": "Last step", title: "Last step" });
      add(this.root, [
        h("div", { class: "st-head" },
          h("span", { class: "st-title" }, "Step-through simulation"),
          this.counter,
          button("Close", () => this.close(), "btn tiny ghost")),
        h("div", { class: "st-grid" },
          // The explanation sits under the code, so on a phone it is next to the line it talks about.
          h("div", { class: "st-left" }, h("div", { class: "st-code" }, this.codeLines), this.explain),
          h("div", { class: "st-side" },
            h("div", { class: "st-panel" }, h("div", { class: "st-panel-title" }, "Variables (Python's memory)"), this.vars),
            h("div", { class: "st-panel" }, h("div", { class: "st-panel-title" }, "Output so far"), this.out))),
        h("div", { class: "st-controls" }, this.btnFirst, this.btnPrev, this.btnNext, this.btnLast, this.slider),
        h("div", { class: "st-keys" }, "Tip: use the ← and → keys to move through the steps."),
      ]);
    }

    go(i) {
      if (!this.steps) return;
      i = Math.max(0, Math.min(this.steps.length - 1, i));
      this.index = i;
      const step = this.steps[i];
      const prev = i > 0 ? this.steps[i - 1] : null;
      this.counter.textContent = `Step ${i + 1} of ${this.steps.length}`;
      this.slider.value = String(i);
      this.btnFirst.disabled = this.btnPrev.disabled = i === 0;
      this.btnNext.disabled = this.btnLast.disabled = i === this.steps.length - 1;

      this.codeLines.forEach((node) => node.classList.remove("next", "done", "bad"));
      if (prev && prev.line && step.kind !== "end") this.codeLines[prev.line - 1]?.classList.add("done");
      if (step.kind === "end") {
        if (step.status !== "ok" && step.line) this.codeLines[step.line - 1]?.classList.add("bad");
        else if (prev && prev.line) this.codeLines[prev.line - 1]?.classList.add("done");
      } else if (step.line) {
        this.codeLines[step.line - 1]?.classList.add("next");
      }
      const focusLine = this.codeLines[(step.line || (prev && prev.line) || 1) - 1];
      if (focusLine) {
        const box = focusLine.parentElement;
        const top = focusLine.offsetTop - box.offsetTop;
        if (top < box.scrollTop || top > box.scrollTop + box.clientHeight - 30) box.scrollTop = top - 40;
      }

      this.explain.textContent = "";
      const lineText = (n) => (this.lines[n - 1] || "").trim();
      const note = (text) => this.explain.append(h("div", { html: md(text) }));
      // The narrator's sentence for the step that just ran (harness.py gives each step a "say").
      if (prev && prev.say) this.explain.append(h("div", { class: "st-did", html: md(`**Python just did this:** ${prev.say}`) }));
      if (step.kind === "line") {
        const intro = i === 0 ? "Python starts at the top. " : "";
        note(`${intro}**Next:** Python will run line ${step.line}: «${lineText(step.line)}». Press **Next** to run it.`);
      } else if (step.kind === "return") {
        note(`The function «${step.func}()» has finished and gives back: «${step.value.r ?? step.value.t}».`);
      } else if (step.kind === "input") {
        note(`Line ${step.line} is waiting for the user to type something${step.prompt ? ` (it asked «${step.prompt.trim()}»)` : ""}. Type an answer and press Enter to keep going.`);
        const input = h("input", { class: "con-input wide", type: "text", autocomplete: "off", spellcheck: "false", "aria-label": "Answer for input()" });
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            input.disabled = true;
            this.inputs.push(input.value);
            this.load(i);
          }
        });
        this.explain.append(input);
        setTimeout(() => input.focus(), 0);
      } else if (step.status === "ok") {
        note(`**The program has finished.** Every line has run. Use **Back** to replay any step.`);
      } else if (step.status === "error") {
        this.explain.append(errorCard(step.error, "The program stopped with an error here:"));
      } else if (step.status === "step_limit") {
        note(`The simulation stopped after 1,000 steps to stay quick. (Your program may still be fine — press **Run** to run it fully.)`);
      } else if (step.status === "timeout") {
        this.explain.append(errorCard({ type: "timeout", line: step.line }));
      } else {
        note(`The simulation was stopped.`);
      }

      this.paintVars(step, prev);
      this.out.textContent = "";
      add(this.out, renderEvents(this.res.events, step.out));
      if (!this.out.childNodes.length) this.out.append(h("span", { class: "con-empty" }, "Nothing printed yet."));
    }

    paintVars(step, prev) {
      this.vars.textContent = "";
      const before = new Map();
      if (prev) for (const f of prev.frames) for (const [k, v] of f.vars) before.set(`${f.name}:${k}`, JSON.stringify(v));
      const frames = step.frames || [];
      if (!frames.length || frames.every((f) => !f.vars.length)) {
        this.vars.append(h("div", { class: "con-empty" }, "No variables yet."));
        return;
      }
      // Names whose values have the same box id share one list, dict, set or object.
      const holders = new Map();
      frames.forEach((f, fi) => f.vars.forEach(([name, value]) => {
        if (!value || value.id == null) return;
        if (!holders.has(value.id)) holders.set(value.id, []);
        holders.get(value.id).push({ fi, name, frame: f.name });
      }));
      const where = (o) => (o.frame === "Global" ? "main program" : `in ${o.frame}()`);
      frames.forEach((f, fi) => {
        const rows = f.vars.map(([name, value]) => {
          const id = `${f.name}:${name}`;
          const old = before.get(id);
          const changed = prev && old !== JSON.stringify(value);
          const others = value && value.id != null ? holders.get(value.id).filter((o) => !(o.fi === fi && o.name === name)) : [];
          const same = others.length
            ? h("span", { class: "v-same" }, `same box as ${others.map((o) => (o.fi === fi ? o.name : `${o.name} (${where(o)})`)).join(", ")}`)
            : null;
          return h("div", { class: `v-row${changed ? (old === undefined ? " new" : " changed") : ""}` },
            h("span", { class: "v-name" }, name),
            h("span", { class: "v-val" }, valueNode(value), same),
            changed ? h("span", { class: "v-flag" }, old === undefined ? "new" : "changed") : null);
        });
        this.vars.append(h("div", { class: "v-frame" },
          h("div", { class: "v-frame-name" }, f.name === "Global" ? "Main program" : `Inside ${f.name}()`),
          rows.length ? rows : h("div", { class: "con-empty" }, "(nothing yet)")));
      });
    }
  }

  // ===========================================================================
  // 7. Lesson pieces
  // ===========================================================================

  // ---- stable shuffles: one learner always sees the same order, even after a reload ----
  function hashText(text) {
    let x = 2166136261;
    for (let i = 0; i < text.length; i++) {
      x ^= text.charCodeAt(i);
      x = Math.imul(x, 16777619);
    }
    return x >>> 0;
  }

  // The numbers 0 … count-1 in an order fixed by this learner's seed and `key`.
  function stableOrder(count, key) {
    let seed = hashText(`${Store.data.seed}|${key}`) || 1;
    const next = () => {
      seed = (seed ^ (seed << 13)) >>> 0;
      seed = (seed ^ (seed >>> 17)) >>> 0;
      seed = (seed ^ (seed << 5)) >>> 0;
      return seed / 4294967296;
    };
    const order = Array.from({ length: count }, (_, i) => i);
    for (let i = count - 1; i > 0; i--) {
      const j = Math.floor(next() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
  }

  // Text with the spaces outside quote marks removed, so [1,2] matches [1, 2] but 'a b' keeps its space.
  function squash(text) {
    let out = "";
    let quote = "";
    for (const ch of String(text).trim()) {
      if (quote) {
        out += ch;
        if (ch === quote) quote = "";
      } else if (ch === "'" || ch === '"') {
        quote = ch;
        out += ch;
      } else if (!/\s/.test(ch)) {
        out += ch;
      }
    }
    return out;
  }

  // An editor with Run and Step-through buttons and room for output.
  // `locked` keeps Run (and Ctrl + Enter) off until a Predict guess is made.
  // The files a run starts with: the program's saved files, or else the lesson's starting files.
  function startingFiles(filesKey, startFiles) {
    const saved = filesKey ? FileStore.get(filesKey) : null;
    if (saved && Object.keys(saved).length) return saved;
    return startFiles ? { ...startFiles } : saved;
  }

  // `filesKey` keeps the program's files between runs and adds a Files panel (r.files.root).
  // `startFiles` are the lesson's starting files (an exercise's or example's `files`).
  function codeRunner({ code, minLines = 1, onChange, runLabel = "Run", step = true, filesKey = null, startFiles = null }) {
    const view = new ConsoleView();
    const stepper = new Stepper();
    stepper.filesFor = () => startingFiles(filesKey, startFiles);
    const files = filesKey ? filesPanel(filesKey) : null;
    const r = { view, stepper, locked: false, files };
    const editor = createEditor({ value: code, minLines, onChange, onRun: () => run() });
    async function run() {
      if (r.locked) return null;
      stepper.close();
      return runProgram({ code: editor.value, view, editor, filesKey, onFiles: files && files.paint, startFiles });
    }
    function stepThrough() {
      if (r.locked) return;
      view.hide();
      stepper.open(editor.value);
    }
    return Object.assign(r, {
      editor,
      run,
      step: stepThrough,
      runBtn: button(`▶ ${runLabel}`, run, "btn primary"),
      stepBtn: step ? button("Step through", stepThrough, "btn", { title: "Watch Python run your code one line at a time" }) : null,
    });
  }

  // The files a program has saved, with a button to clear them. Hidden while there are none.
  function filesPanel(filesKey) {
    const root = h("details", { class: "files-panel", hidden: true });
    function paint() {
      const e = FileStore.entry(filesKey);
      const names = e ? Object.keys(e.files || {}) : [];
      root.hidden = !e;
      root.textContent = "";
      if (!e) return;
      add(root, [
        h("summary", {}, `Files your program saved (${names.length})`),
        h("p", { class: "muted small" }, "Run starts with these files, so your program can read what it wrote last time. Check answer always starts with an empty folder."),
        e.tooBig ? h("p", { class: "callout warn" }, e.tooBig) : null,
        names.map((name) => h("details", { class: "file-item" },
          h("summary", {}, h("code", {}, name), h("span", { class: "muted small" }, ` ${e.files[name].length.toLocaleString("en-IN")} characters`)),
          h("pre", { class: "out-block" }, e.files[name].length > 3000 ? `${e.files[name].slice(0, 3000)}\n… (only the start is shown)` : e.files[name] || "(empty file)"))),
        !e.tooBig && e.leftOut && e.leftOut.length
          ? h("p", { class: "muted small" }, `Not kept (not text, or too big): ${e.leftOut.join(", ")}`)
          : null,
        h("div", { class: "actions" }, confirmButton("Clear saved files", "Click again to delete them", () => {
          FileStore.clear(filesKey);
          paint();
        })),
      ]);
    }
    paint();
    return { root, paint };
  }

  function exampleBlock(day, item) {
    const r = codeRunner({ code: item.code, step: !day.exam, startFiles: item.files || null });
    const reset = button("Reset", () => {
      r.editor.value = item.code;
      reset.hidden = true;
    }, "btn ghost", { hidden: true });
    r.editor.root.addEventListener("input", () => (reset.hidden = false));
    return h("div", { class: "example" },
      h("div", { class: "example-label" }, item.label || "Try it"),
      r.editor.root,
      item.predict ? predictGate(item, r) : null,
      h("div", { class: "actions" }, r.runBtn, r.stepBtn, reset, h("span", { class: "kbd-hint" }, "Ctrl + Enter runs")),
      r.view.root,
      r.stepper.root);
  }

  // Predict then Run: Run and Step through stay locked until the learner taps a guess.
  function predictGate(item, r) {
    const lock = (on) => {
      r.locked = on;
      r.runBtn.disabled = on;
      if (r.stepBtn) r.stepBtn.disabled = on;
    };
    lock(true);
    const box = h("div", { class: "predict" });
    const feedback = h("div", { class: "quiz-fb", "aria-live": "polite" });
    const options = item.predict.map((text, j) => h("button", { type: "button", class: "opt mono", onclick: () => pick(j) }, text));
    function pick(j) {
      const right = j === item.answer;
      box.classList.add("answered");
      options.forEach((b, k) => {
        b.disabled = true;
        if (k === item.answer) b.classList.add("right");
      });
      if (!right) options[j].classList.add("wrong");
      feedback.className = `quiz-fb ${right ? "good" : "bad"}`;
      feedback.innerHTML = md(right
        ? "**Right!** Now press **Run** and watch it happen."
        : "**Not quite.** The green answer is what Python does. Press **Run** to see it happen.");
      lock(false);
    }
    add(box, [
      h("div", { class: "predict-q" }, "First, guess: what will happen when this runs?"),
      h("div", { class: "opts mono" }, options),
      feedback,
    ]);
    return box;
  }

  function lessonBlock(day, item, i) {
    if (typeof item === "string") return glossify(h("div", { class: "prose", html: md(item) }));
    if (item.t === "ex") return exampleBlock(day, item);
    if (item.t === "code") return staticCode(item.code);
    if (item.t === "tip") return glossify(h("aside", { class: "callout tip", html: md(item.text) }));
    if (item.t === "warn") return glossify(h("aside", { class: "callout warn", html: md(item.text) }));
    // A one-question check inside the lesson. It is remembered, but it does not count towards the day.
    if (item.t === "ask") return quizBlock(item, { key: `${day.slug}/ask${i}`, label: "Quick check", cls: "ask" });
    if (item.t === "pause")
      return h("div", { class: "pause", role: "separator" },
        h("span", { class: "pause-label" }, "A good place for a break"),
        item.text ? h("div", { class: "pause-text", html: md(item.text) }) : null);
    throw new Error(`Unknown lesson block: ${JSON.stringify(item).slice(0, 80)}`);
  }

  // One multiple-choice question. The options appear in a stable shuffled order,
  // but every index used here (answer, why, saved answers) is the option's place in the lesson file.
  // fresh: a warm-up card. It always starts unanswered and changes nothing in Store.data.quiz;
  // onFirst(right) is told whether the first pick was right.
  // order: the on-screen order of the option indexes, when the caller chooses it (the warm-up does).
  function quizBlock(q, { key, label, onAnswered = () => {}, cls = "", fresh = false, onFirst = null, id = null, order = null }) {
    const mono = q.mono ?? !!q.code;
    const feedback = h("div", { class: "quiz-fb", "aria-live": "polite" });
    const card = h("div", { class: `quiz ${cls}`, id });
    const saved = () => !fresh && Store.data.quiz[key];
    let picked = false;
    const options = q.options.map((opt, j) => {
      const btn = h("button", { type: "button", class: `opt${mono ? " mono" : ""}`, onclick: () => choose(j) });
      if (mono) btn.textContent = opt;
      else btn.innerHTML = inline(opt);
      return btn;
    });

    function showAnswered() {
      card.classList.add("answered");
      options.forEach((b, j) => {
        b.disabled = true;
        if (j === q.answer) b.classList.add("right");
      });
      feedback.className = "quiz-fb good";
      feedback.innerHTML = md(`**Right!** ${q.explain || ""}`);
    }

    function choose(j) {
      if (saved() || card.classList.contains("answered")) return;
      if (!picked && onFirst) onFirst(j === q.answer);
      picked = true;
      if (j === q.answer) {
        if (!fresh) {
          const wrongs = Store.data.wrongs[key] || 0;
          Store.data.quiz[key] = { at: today(), first: wrongs === 0 };
          Store.touch(key);
          Store.save();
        }
        showAnswered();
        onAnswered();
      } else {
        if (!fresh) {
          Store.data.wrongs[key] = (Store.data.wrongs[key] || 0) + 1;
          Store.saveSoon();
        }
        options[j].classList.add("wrong");
        options[j].disabled = true;
        feedback.className = "quiz-fb bad";
        feedback.innerHTML = md(`**Not quite.** ${(q.why && q.why[j]) || "Have another look and try again."}`);
      }
    }

    add(card, [
      h("div", { class: "quiz-q" }, h("span", { class: "quiz-n" }, label), h("div", { html: md(q.q) })),
      q.code ? staticCode(q.code) : null,
      // A warm-up card gets its own order, so the place of the right answer is not remembered.
      h("div", { class: `opts${mono ? " mono" : ""}` }, (order || stableOrder(options.length, fresh ? `${key}/warm` : key)).map((j) => options[j])),
      feedback,
    ]);
    if (saved()) showAnswered();
    return card;
  }

  // ---- exercises ----

  const KIND_TAGS = {
    make: "From a blank page",
    modify: "Change it",
    parsons: "Arrange the lines",
    fill: "Fill the gaps",
    bug: "Bug Clinic",
    trace: "Be the Computer",
    catch: "Catch the Bug",
    read: "Cold Read",
    drill: "Command Drill",
  };

  // Per-exercise memory: hints shown, failed checks, and each kind's own progress.
  function triesFor(key) {
    if (!Store.data.tries[key]) Store.data.tries[key] = { hints: 0, fails: 0 };
    return Store.data.tries[key];
  }

  // The starting code: the learner's own code from the exercise this one carries on from, if any.
  // An earlier stage the learner has not typed in yet shows code carried from the one before it,
  // so the chain is followed back until a stage with the learner's own code.
  function starterFor(day, ex) {
    for (let from = ex, n = 0; from && from.carry && n < 20; n++) {
      const earlier = Store.data.code[`${day.slug}/${from.carry}`];
      if (earlier != null && earlier.trim()) return earlier;
      if (earlier != null) break;
      from = (day.practice || []).find((e) => e.id === from.carry);
    }
    return ex.starter || "";
  }

  // Editors of stages with `carry`, by exercise key. Every code change calls each one, so a stage
  // the learner has not typed in yet keeps showing the earlier stage's code as it changes.
  const carryFollowers = new Map();
  const tellCarryFollowers = () => carryFollowers.forEach((follow) => follow());

  function exerciseBlock(day, ex, i, onSolved) {
    const key = `${day.slug}/${ex.id}`;
    const kind = ex.kind || "write";
    const pill = h("span", { class: "pill" });
    const paintPill = () => {
      const s = Store.data.solved[key];
      pill.className = `pill ${s ? (s.help ? "help" : "good") : "todo"}`;
      pill.textContent = s ? (s.help ? "✓ Solved with help" : "✓ Solved") : ex.optional ? "Finish later" : "To do";
    };
    const ctx = {
      day,
      ex,
      key,
      exam: !!day.exam,
      canStep: !day.exam && !ex.noStep,
      get state() {
        return triesFor(key);
      },
      isSolved: () => !!Store.data.solved[key],
      // code: the program that passed, kept so My Programs can show the solved version.
      solved(help = false, code = null) {
        const s = Store.data.solved[key];
        if (!s) {
          Store.data.solved[key] = { at: today(), help: help || !!Store.data.peeked[key] };
          if (typeof code === "string") Store.data.solved[key].code = code;
          Store.touch(key);
          Store.save();
        } else if (typeof code === "string" && typeof s.code !== "string") {
          // Solved before solved versions were kept: keep this passing version now.
          s.code = code;
          Store.saveSoon();
        }
        paintPill();
        onSolved();
      },
    };
    const stages = Math.max(0, ...day.practice.map((e) => e.stage || 0));
    const build = EXERCISE_KINDS[kind];
    paintPill();
    return h("article", { class: `card exercise${ex.optional ? " optional" : ""}`, id: `ex-${ex.id}` },
      h("header", { class: "ex-head" },
        h("span", { class: "eyebrow" }, `Exercise ${i + 1} of ${day.practice.length}`),
        pill),
      h("div", { class: "ex-tags" },
        KIND_TAGS[kind] ? h("span", { class: "tag" }, KIND_TAGS[kind]) : null,
        ex.stage ? h("span", { class: "tag stage" }, `Stage ${ex.stage} of ${stages}`) : null,
        ex.optional ? h("span", { class: "tag later" }, "Finish later: not needed to finish the day") : null),
      h("h3", { class: "ex-title" }, ex.title),
      h("div", { class: "prose task", html: md(ex.task || "") }),
      build
        ? build(ctx)
        : h("div", { class: "callout warn" }, `This exercise has an unknown kind "${kind}", so it cannot be shown. This is a mistake in the course, not yours.`));
  }

  // Hints, then (only after every hint and a few failed checks) the solution.
  // With 3 or more hints the solution needs 3 failed checks; with fewer hints, 2.
  function helpTools(ctx, { solution = null, copy = null } = {}) {
    const { ex, key } = ctx;
    const hints = ctx.exam ? [] : ex.hints || [];
    const need = hints.length >= 3 ? 3 : 2;
    const list = h("ol", { class: "hint-list", hidden: true });
    const hintBtn = button("", () => showHint(), "btn ghost", { hidden: !hints.length });
    const box = h("div", { class: "solution", hidden: true });
    const solBtn = confirmButton("Show solution", "Sure? Click again", () => {
      Store.data.peeked[key] = true;
      Store.save();
      solBtn.hidden = true;
      box.hidden = false;
      box.textContent = "";
      add(box, [
        h("div", { class: "solution-head" }, h("strong", {}, "One possible solution"),
          h("span", { class: "muted" }, " — there's often more than one right answer.")),
        staticCode(solution),
        copy ? h("div", { class: "actions" }, button("Copy into my answer", () => copy(solution), "btn")) : null,
      ]);
    });

    const shown = () => Math.min(ctx.state.hints, hints.length);
    const unlocked = () =>
      !ctx.exam && !!solution &&
      (ctx.isSolved() || !!Store.data.peeked[key] || (shown() >= hints.length && ctx.state.fails >= need));

    function addHint(k) {
      list.append(h("li", { html: md(hints[k]) }));
      list.hidden = false;
    }
    function showHint() {
      if (shown() >= hints.length) return;
      addHint(shown());
      ctx.state.hints = shown() + 1;
      Store.saveSoon();
      paint();
    }
    function paint() {
      hintBtn.textContent = shown() < hints.length ? `Hint (${shown() + 1} of ${hints.length})` : "No more hints";
      hintBtn.disabled = shown() >= hints.length;
      solBtn.hidden = !box.hidden || !unlocked();
    }
    for (let k = 0; k < shown(); k++) addHint(k);
    paint();

    return {
      hintBtn,
      solBtn,
      list,
      box,
      paint,
      failed() {
        ctx.state.fails += 1;
        Store.saveSoon();
        paint();
      },
      nudge() {
        if (ctx.state.fails >= 2 && shown() < hints.length)
          return h("div", { class: "fb-nudge", html: md("Stuck? Press **Hint** for a clue.") });
        if (unlocked() && !Store.data.peeked[key] && !ctx.isSolved())
          return h("div", { class: "fb-nudge", html: md("Still stuck? **Show solution** is open now. Try once more first, then look.") });
        return null;
      },
    };
  }

  // A short message in a feedback box.
  function say(box, kind, text) {
    box.hidden = false;
    box.className = `feedback ${kind}`;
    box.textContent = "";
    box.append(h("div", { html: md(text) }));
  }

  // Runs `job` while `btn` says "Checking…". A failure inside the trainer is shown in `feedback`.
  async function busyCheck(btn, feedback, job) {
    if (btn.disabled) return null;
    const label = btn.textContent;
    btn.disabled = true;
    btn.textContent = py.state === "ready" ? "Checking…" : "Starting Python…";
    try {
      return await job();
    } catch (err) {
      feedback.hidden = false;
      feedback.className = "feedback bad";
      feedback.textContent = "";
      feedback.append(pythonProblem(err));
      return null;
    } finally {
      btn.disabled = false;
      btn.textContent = label;
    }
  }

  // Shows the result of py.check. Returns true when every test passed.
  function showCheck(feedback, res, { view = null, editor = null, help }) {
    feedback.hidden = false;
    feedback.textContent = "";
    if (res.passed === undefined) {
      feedback.className = "feedback bad";
      feedback.append(h("div", { html: md(res.status === "timeout"
        ? "Python stopped answering (probably a loop that never ends), so it was restarted. Check your loops and try again."
        : "The check was stopped.") }));
      return false;
    }
    const showEvents = (title) => {
      if (!view) return;
      if (res.events && res.events.length) {
        view.show();
        view.render(res.events);
        view.setTitle(title);
        view.setStatus("", "");
      } else {
        view.hide();
      }
    };
    if (res.passed) {
      feedback.className = "feedback good";
      add(feedback, [
        h("div", { class: "fb-title" }, "✓ Correct!"),
        h("div", { html: md(res.total > 1 ? `Your code passed all ${res.total} checks.` : "Your code passed the check.") }),
      ]);
      showEvents("Output from the last check");
      return true;
    }
    help.failed();
    feedback.className = "feedback bad";
    const titles = {
      output: "Not quite yet",
      contains: "Not quite yet",
      assert: "Not quite yet",
      error: "Your code hit an error",
      crash: "Your code hit an error",
      timeout: "Your program didn't finish",
      too_much_output: "Your program didn't finish",
      uses: "Almost — one more thing",
      avoids: "Almost — one more thing",
      more_input: "Input doesn't match",
      fewer_input: "Input doesn't match",
    };
    const which = res.total > 1 ? `Check ${res.index + 1} of ${res.total}` : "";
    const typed = res.inputs && res.inputs.length ? `When the user types: ${res.inputs.map((v) => `«${v}»`).join(", ")}` : "";
    add(feedback, [
      h("div", { class: "fb-title" }, titles[res.kind] || "Not quite yet"),
      which || typed || res.label ? h("div", { class: "fb-context" }, [which, res.label, typed].filter(Boolean).map((t) => h("span", { html: inline(t) }))) : null,
    ]);
    const mark = (line) => {
      if (editor && line) editor.markLine(line);
    };
    if (res.message) feedback.append(h("div", { class: "fb-msg", html: md(res.message) }));
    if (res.kind === "output") feedback.append(outputDiff(res.expected, res.got));
    if (res.kind === "error") {
      feedback.append(errorCard(res.error));
      mark(res.error.line);
    }
    if (res.kind === "crash") {
      feedback.append(errorCard(res.error, res.call ? `When I tested it by running «${res.call}»:` : ""));
      mark(res.error.line);
    }
    if (res.kind === "timeout" || res.kind === "too_much_output") {
      feedback.append(errorCard({ type: res.kind, line: res.line }));
      mark(res.line);
    }
    const nudge = help.nudge();
    if (nudge) feedback.append(nudge);
    if (res.kind !== "output") showEvents("What your program showed during this check");
    else if (view) view.hide();
    return false;
  }

  // The result of py.catch: how many broken versions the learner's asserts caught.
  function showCatch(feedback, res, editor, help) {
    feedback.hidden = false;
    feedback.textContent = "";
    if (res.passed === undefined) {
      say(feedback, "bad", res.status === "timeout"
        ? "Python stopped answering (probably a loop that never ends), so it was restarted. Try again."
        : "The check was stopped.");
      return false;
    }
    const caught = h("div", { class: "fb-msg", html: md(`You caught **${res.caught} of ${res.total}** broken version${res.total === 1 ? "" : "s"}.`) });
    if (res.passed) {
      feedback.className = "feedback good";
      add(feedback, [
        h("div", { class: "fb-title" }, "✓ Correct!"),
        caught,
        h("div", { html: md("Your asserts pass on the correct program and fail on every broken one.") }),
      ]);
      return true;
    }
    help.failed();
    feedback.className = "feedback bad";
    add(feedback, [h("div", { class: "fb-title" }, "Not quite yet"), caught]);
    const t = res.on_target;
    const msg = (text) => feedback.append(h("div", { class: "fb-msg", html: md(text) }));
    if (t.kind === "target_broken") {
      msg("The correct program itself does not run. This is a mistake in the course, not in your asserts.");
      if (t.error) feedback.append(errorCard(t.error));
    } else if (!t.ok) {
      if (t.error && t.error.line) editor.markLine(t.error.line);
      if (t.kind === "assert") msg(`One of your asserts fails on the **correct** program too, so it checks the wrong thing. ${t.message || ""}`);
      else if (t.kind === "error") feedback.append(errorCard(t.error, "Your asserts hit an error on the correct program:"));
      else if (t.kind === "more_input") msg(t.message);
      else feedback.append(errorCard({ type: t.kind, line: t.line }));
    } else {
      msg("Your asserts pass on the correct program. Good. But some broken versions pass them too. Think of an input where a broken program gives a different answer, and assert the right answer for that input.");
    }
    for (const p of res.broken_errors || []) msg(`Broken version ${p.index + 1} does not run on its own. This is a mistake in the course.`);
    const nudge = help.nudge();
    if (nudge) feedback.append(nudge);
    return false;
  }

  // write, make, modify (and the second half of bug, and catch): an editor with Run and Check.
  function codeExercise(ctx, { catchMode = false, markLine = 0 } = {}) {
    const { ex, key } = ctx;
    let carrying = false; // true while the editor is being given carried code, which is not the learner's typing
    const r = codeRunner({
      code: Store.data.code[key] ?? starterFor(ctx.day, ex),
      minLines: 4,
      step: ctx.canStep && !catchMode,
      filesKey: catchMode ? null : `ex:${key}`,
      startFiles: catchMode ? null : ex.files || null,
      onChange: (v) => {
        if (!carrying) {
          Store.data.code[key] = v;
          Store.saveSoon();
        }
        tellCarryFollowers();
      },
    });
    if (ex.carry) {
      carryFollowers.set(key, () => {
        if (Store.data.code[key] != null) return; // the learner has typed here: this code is theirs now
        const code = starterFor(ctx.day, ex);
        if (r.editor.value === code) return;
        carrying = true;
        r.editor.value = code;
        carrying = false;
      });
    }
    const feedback = h("div", { class: "feedback", hidden: true, "aria-live": "polite" });
    const help = helpTools(ctx, {
      solution: ex.solution,
      copy: (text) => {
        r.editor.value = text;
        r.editor.focus();
      },
    });
    const resetBtn = confirmButton("Reset", "Click again to reset", () => {
      r.editor.value = starterFor(ctx.day, ex);
      feedback.hidden = true;
      r.view.hide();
      r.stepper.close();
    });
    const checkBtn = button("✓ Check answer", () => check(), "btn check");

    async function check() {
      r.stepper.close();
      r.view.cancel();
      r.editor.clearMark();
      const code = r.editor.value;
      const res = await busyCheck(checkBtn, feedback, () => (catchMode ? py.catch(code, ex.target, ex.broken) : py.check(code, ex.tests)));
      if (!res) return;
      const passed = catchMode
        ? showCatch(feedback, res, r.editor, help)
        : showCheck(feedback, res, { view: r.view, editor: r.editor, help });
      if (passed) ctx.solved(false, code);
      help.paint();
    }

    if (markLine) r.editor.markLine(markLine);
    return [
      catchMode ? [h("div", { class: "block-label" }, "The correct program"), staticCode(ex.target), h("div", { class: "block-label" }, "Your asserts")] : null,
      r.editor.root,
      h("div", { class: "actions" }, catchMode ? null : r.runBtn, checkBtn, r.stepBtn, help.hintBtn, help.solBtn, resetBtn),
      feedback,
      help.list,
      r.view.root,
      r.files ? r.files.root : null,
      r.stepper.root,
      help.box,
    ];
  }

  // catch: asserts that pass on the correct program and fail on every broken version.
  const catchExercise = (ctx) => codeExercise(ctx, { catchMode: true });

  // parsons: tap shuffled lines into order. Nothing needs dragging.
  function parsonsExercise(ctx) {
    const { ex, key } = ctx;
    const st = ctx.state;
    const choose = ex.indent === "choose";
    const fixed = ex.order === "fixed";
    const levelOf = (line) => Math.floor(line.match(/^ */)[0].length / 4);
    const solLines = ex.solution.split("\n").filter((l) => l.trim());
    const expected = solLines.map((l) => "    ".repeat(levelOf(l)) + l.trim());
    const items = solLines.map((line) => ({ text: line.trim(), level: levelOf(line), fake: false }));
    for (const line of ex.distractors || []) items.push({ text: line.trim(), level: levelOf(line), fake: true });
    const fakes = items.map((it, id) => (it.fake ? id : -1)).filter((id) => id >= 0);
    let order = stableOrder(items.length, key);
    // A shuffle that happens to give the lines in the right order is turned by one place.
    if (items.length > 1 && order.every((id, k) => id === k)) order = order.slice(1).concat(order[0]);
    // The saved arrangement is [line id, indent level] pairs. Ids that a changed lesson no longer has are dropped.
    st.answer = (Array.isArray(st.answer) ? st.answer : []).filter(([id]) => items[id]);
    const gone = () => new Set(fakes.slice(0, st.gone || 0));

    const pool = h("div", { class: "pz-pool" });
    const answer = h("div", { class: "pz-answer" });
    const feedback = h("div", { class: "feedback", hidden: true, "aria-live": "polite" });
    const view = new ConsoleView();
    const help = helpTools(ctx, { solution: ex.solution });
    const lineCode = (id, level) => h("code", { class: "pz-code", style: `--lvl:${level}`, html: highlight(items[id].text) || " " });
    const tool = (label, name, fn, off) =>
      h("button", { type: "button", class: "pz-tool", onclick: fn, "aria-label": name, title: name, disabled: off }, label);

    function changed() {
      Store.saveSoon();
      paint();
    }
    function take(id) {
      const prev = st.answer[st.answer.length - 1];
      st.answer.push([id, choose ? (prev ? prev[1] : 0) : items[id].level]);
      changed();
    }
    function giveBack(pos) {
      st.answer.splice(pos, 1);
      changed();
    }
    function move(pos, by) {
      const a = st.answer;
      [a[pos], a[pos + by]] = [a[pos + by], a[pos]];
      changed();
    }
    function shift(pos, by) {
      st.answer[pos][1] = Math.max(0, st.answer[pos][1] + by);
      changed();
    }

    function paint() {
      const hidden = gone();
      const used = new Set(st.answer.map(([id]) => id));
      pool.textContent = "";
      answer.textContent = "";
      const left = order.filter((id) => !used.has(id) && !hidden.has(id));
      for (const id of left)
        pool.append(h("button", { type: "button", class: "pz-line", onclick: () => take(id), "aria-label": `Add the line: ${items[id].text}` },
          lineCode(id, choose ? 0 : items[id].level)));
      if (!left.length) pool.append(h("div", { class: "con-empty" }, "Every line is in your program."));
      st.answer.forEach(([id, level], pos) => {
        answer.append(h("div", { class: "pz-row" },
          h("button", { type: "button", class: "pz-line", onclick: () => giveBack(pos), "aria-label": `Send back the line: ${items[id].text}`, title: "Tap to send this line back" },
            lineCode(id, level)),
          h("div", { class: "pz-tools" },
            choose ? tool("⇤", "Indent less", () => shift(pos, -1), level === 0) : null,
            choose ? tool("⇥", "Indent more", () => shift(pos, 1), level >= 8) : null,
            tool("▲", "Move up", () => move(pos, -1), pos === 0),
            tool("▼", "Move down", () => move(pos, 1), pos === st.answer.length - 1))));
      });
      if (!st.answer.length) answer.append(h("div", { class: "con-empty" }, "Tap a line above to put it here."));
    }

    const joined = () => st.answer.map(([id, level]) => "    ".repeat(level) + items[id].text).join("\n");

    // order: "fixed" — the lines must match the solution exactly.
    function showOrder(code) {
      const lines = code.split("\n");
      let same = 0;
      while (same < lines.length && same < expected.length && lines[same] === expected[same]) same += 1;
      if (same === expected.length && lines.length === expected.length) {
        feedback.hidden = false;
        feedback.className = "feedback good";
        feedback.textContent = "";
        add(feedback, [h("div", { class: "fb-title" }, "✓ Correct!"), h("div", { html: md("Every line is in the right place.") })]);
        return true;
      }
      help.failed();
      say(feedback, "bad", same
        ? `The first ${same === 1 ? "line is" : `${same} lines are`} in the right place. Look again at line ${same + 1}.`
        : "The first line is not right yet. Which step comes first?");
      feedback.prepend(h("div", { class: "fb-title" }, "Not quite yet"));
      const nudge = help.nudge();
      if (nudge) feedback.append(nudge);
      return false;
    }

    // After every 2 failed checks one wrong line disappears, and the learner is told which.
    function dropDistractor() {
      const want = Math.min(fakes.length, Math.floor(st.fails / 2));
      if (want <= (st.gone || 0)) return;
      const id = fakes[want - 1];
      st.gone = want;
      st.answer = st.answer.filter(([a]) => a !== id);
      Store.saveSoon();
      paint();
      feedback.append(h("div", { class: "fb-nudge", html: md(`To help you, one wrong line is gone now: «${items[id].text}». It does not belong in this program.`) }));
    }

    const checkBtn = button("✓ Check answer", () => check(), "btn check");
    async function check() {
      view.hide();
      if (!st.answer.length) {
        say(feedback, "bad", "Tap the lines into your program first.");
        return;
      }
      const code = joined();
      Store.data.code[key] = code;
      Store.saveSoon();
      let passed;
      if (fixed) {
        passed = showOrder(code);
      } else {
        const res = await busyCheck(checkBtn, feedback, () => py.check(code, ex.tests));
        if (!res) return;
        passed = showCheck(feedback, res, { view, help });
      }
      if (passed) {
        ctx.solved(false, code);
      } else {
        const missing = solLines.length - st.answer.filter(([id]) => !items[id].fake).length;
        if (missing > 0)
          feedback.append(h("div", { class: "fb-nudge", html: md(`${missing} line${missing === 1 ? " is" : "s are"} still waiting in the box above.`) }));
        dropDistractor();
      }
      help.paint();
    }

    const runBtn = button("▶ Run", () => {
      if (st.answer.length) runProgram({ code: joined(), view });
    }, "btn primary", { hidden: fixed && !(ex.tests && ex.tests.length) });
    const resetBtn = confirmButton("Reset", "Click again to reset", () => {
      st.answer = [];
      feedback.hidden = true;
      view.hide();
      changed();
    });

    paint();
    return [
      h("div", { class: "block-label" }, choose
        ? "Tap a line to add it. Set its indent with ⇤ ⇥ and move it with ▲ ▼."
        : "Tap a line to add it to your program. Move it with ▲ ▼."),
      pool,
      h("div", { class: "block-label" }, "Your program (tap a line to send it back)"),
      answer,
      h("div", { class: "actions" }, runBtn, checkBtn, help.hintBtn, help.solBtn, resetBtn),
      feedback,
      help.list,
      view.root,
      help.box,
    ];
  }

  // fill: code with typed gaps. Each box is as wide as its answer.
  function fillExercise(ctx) {
    const { ex, key } = ctx;
    const st = ctx.state;
    const parts = ex.template.split(/⟦([\s\S]*?)⟧/); // even places: code; odd places: the answers
    const answers = parts.filter((_, k) => k % 2);
    const gaps = answers.map((answer, g) => {
      const input = h("input", {
        class: "gap",
        type: "text",
        autocomplete: "off",
        autocapitalize: "off",
        autocorrect: "off",
        spellcheck: "false",
        "aria-label": `Gap ${g + 1} of ${answers.length}`,
        style: `width:${Math.max(answer.length, 1) + 2}ch`,
      });
      input.value = (st.gaps && st.gaps[g]) || "";
      input.addEventListener("input", () => {
        st.gaps = gaps.map((x) => x.value);
        Store.saveSoon();
      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          check();
        }
      });
      return input;
    });
    const code = h("pre", { class: "code-static fill-code" },
      parts.map((part, k) => (k % 2 ? gaps[(k - 1) / 2] : h("span", { html: highlight(part) }))));
    const filled = () => parts.map((part, k) => (k % 2 ? gaps[(k - 1) / 2].value : part)).join("");
    const feedback = h("div", { class: "feedback", hidden: true, "aria-live": "polite" });
    const view = new ConsoleView();
    const help = helpTools(ctx, {
      solution: parts.join(""),
      copy: () => {
        gaps.forEach((g, k) => (g.value = answers[k]));
        st.gaps = answers.slice();
        Store.saveSoon();
      },
    });
    const checkBtn = button("✓ Check answer", () => check(), "btn check");
    const runBtn = button("▶ Run", () => runProgram({ code: filled(), view }), "btn primary");

    async function check() {
      view.hide();
      if (gaps.some((g) => !g.value.trim())) {
        say(feedback, "bad", "Fill every gap first. Each box needs something in it.");
        return;
      }
      const text = filled();
      Store.data.code[key] = text;
      Store.saveSoon();
      const res = await busyCheck(checkBtn, feedback, () => py.check(text, ex.tests));
      if (!res) return;
      if (showCheck(feedback, res, { view, help })) ctx.solved(false, text);
      help.paint();
    }

    return [code, h("div", { class: "actions" }, runBtn, checkBtn, help.hintBtn, help.solBtn), feedback, help.list, view.root, help.box];
  }

  // bug (Bug Clinic): first tap the faulty line, then repair it in the editor.
  function bugExercise(ctx) {
    const { ex } = ctx;
    const st = ctx.state;
    const box = h("div", { class: "bug" });
    const feedback = h("div", { class: "quiz-fb", "aria-live": "polite" });
    const buttons = ex.starter.split("\n").map((line, k) => {
      const btn = h("button", { type: "button", class: "bug-line", "aria-label": `Line ${k + 1}: ${line.trim() || "(empty)"}` },
        h("span", { class: "bug-num" }, k + 1),
        h("code", { html: highlight(line) || " " }));
      btn.addEventListener("click", () => pick(k + 1));
      return btn;
    });

    function pick(n) {
      if (st.found) return;
      if (ex.bugLines.includes(n)) {
        st.found = n;
        feedback.className = "quiz-fb good";
        feedback.innerHTML = md(`**Yes, line ${n}.** Now fix it in the editor below, then press **Check answer**.`);
      } else {
        st.picks = (st.picks || 0) + 1;
        if (!Array.isArray(st.wrongLines)) st.wrongLines = [];
        st.wrongLines.push(n);
        buttons[n - 1].classList.add("wrong");
        buttons[n - 1].disabled = true;
        feedback.className = "quiz-fb bad";
        if (st.picks < 2) {
          feedback.innerHTML = md(`**Not line ${n}.** That line does what it should. Read the task again, then find the line that does something different.`);
          Store.saveSoon();
          return;
        }
        st.found = ex.bugLines[0];
        feedback.innerHTML = md(`**Not line ${n} either.** The mistake is on line ${st.found}. Now fix it in the editor below.`);
      }
      Store.saveSoon();
      open();
    }

    function open() {
      buttons.forEach((b) => (b.disabled = true));
      buttons[st.found - 1].classList.add("right");
      add(box, [h("div", { class: "block-label" }, "Step 2: Fix the program"), codeExercise(ctx, { markLine: st.found })]);
    }

    // Lines already picked wrongly stay marked and switched off after a reload.
    for (const n of Array.isArray(st.wrongLines) ? st.wrongLines : []) {
      if (!buttons[n - 1]) continue;
      buttons[n - 1].classList.add("wrong");
      buttons[n - 1].disabled = true;
    }
    add(box, [h("div", { class: "block-label" }, "Step 1: Tap the line you think is wrong"), h("div", { class: "bug-lines" }, buttons), feedback]);
    if (st.found) {
      feedback.className = "quiz-fb good";
      feedback.innerHTML = md(`The mistake is on line ${st.found}.`);
      open();
    }
    return box;
  }

  // trace (Be the Computer): type what a name holds after a line runs.
  // The real answers come from one recorded run (py.traceQuiz), never from the lesson file.
  function traceExercise(ctx) {
    const { ex } = ctx;
    const st = ctx.state;
    if (!Array.isArray(st.done)) st.done = [];
    if (!st.said) st.said = {};
    if (!st.wrong) st.wrong = {};
    const lines = ex.code.split("\n").map((line, k) =>
      h("div", { class: "st-line" }, h("span", { class: "st-arrow" }), h("span", { class: "st-num" }, k + 1), h("code", { html: highlight(line) || " " })));
    const stepper = new Stepper();
    const doneList = h("ol", { class: "trace-done" });
    const area = h("div", { class: "trace-ask" });
    const help = helpTools(ctx);
    let answers = null; // loaded the first time an answer is checked

    const ordinal = (n) =>
      `${n}${n % 10 === 1 && n % 100 !== 11 ? "st" : n % 10 === 2 && n % 100 !== 12 ? "nd" : n % 10 === 3 && n % 100 !== 13 ? "rd" : "th"}`;
    const question = (a) => a.output
      ? "What does the whole program print?"
      : `After line ${a.line} runs${a.hit > 1 ? ` for the ${ordinal(a.hit)} time` : ""}, what is in «${a.name}»?`;

    function paint() {
      lines.forEach((node) => node.classList.remove("next"));
      doneList.textContent = "";
      for (const k of st.done)
        doneList.append(h("li", {}, h("span", { html: inline(question(ex.ask[k])) }), " ", h("code", {}, st.said[k]), " ✓"));
      doneList.hidden = !st.done.length;
      area.textContent = "";
      const k = ex.ask.findIndex((_, j) => !st.done.includes(j));
      if (k === -1) {
        area.append(h("div", { class: "quiz-fb good", html: md(`**All ${ex.ask.length} answered.** You ran the program in your head, like the computer does.`) }));
        return;
      }
      const a = ex.ask[k];
      if (a.line && lines[a.line - 1]) lines[a.line - 1].classList.add("next");
      const attrs = { class: "trace-input", autocomplete: "off", autocapitalize: "off", autocorrect: "off", spellcheck: "false", "aria-label": "Your answer" };
      const input = a.output ? h("textarea", { ...attrs, rows: "3" }) : h("input", { ...attrs, type: "text" });
      const fb = h("div", { class: "quiz-fb", "aria-live": "polite" });
      const showBtn = button("Show me", () => showMe(k, fb), "btn ghost", { hidden: (st.wrong[k] || 0) < 2 });
      const checkBtn = button("Check", () => answer(k, input, fb, checkBtn, showBtn), "btn check");
      if (!a.output)
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            answer(k, input, fb, checkBtn, showBtn);
          }
        });
      add(area, [
        h("div", { class: "eyebrow" }, `Question ${k + 1} of ${ex.ask.length}`),
        h("div", { class: "trace-q", html: md(question(a)) }),
        input,
        h("div", { class: "actions" }, checkBtn, showBtn),
        fb,
      ]);
    }

    // What kind of value a Python repr shows, in plain words, or null when it is not clear.
    function valueKind(v) {
      if (/^[-+]?(\d[\d_]*\.?\d*|\.\d+)([eE][-+]?\d+)?j?$/.test(v) || /^-?(inf|nan)$/.test(v) || /^\(.*j\)$/.test(v)) return "a number";
      if (v === "True" || v === "False") return `${v}, a yes-or-no value (True or False)`;
      if (v === "None") return "None, which means no value at all";
      if (v.startsWith("[")) return "a list";
      if (v.startsWith("(")) return "a tuple";
      if (v === "{}" || (v.startsWith("{") && v.includes(":"))) return "a dictionary";
      if (v.startsWith("{") || v === "set()") return "a set";
      return null;
    }

    function nudgeFor(a, real, text, tries) {
      const more = tries >= 2 ? " Or press **Show me**." : "";
      if (real.output !== undefined)
        return `**Not quite.** Go through the lines from the top. Write down each value as it changes, and each thing that is printed.${more}`;
      const typed = text.trim();
      const unquoted = typed.replace(/^(['"])(.*)\1$/, "$2");
      if (unquoted !== typed && real.accepted.some((x) => squash(x) === squash(unquoted))) {
        const what = valueKind(String(real.value ?? real.accepted[0] ?? ""));
        return what
          ? `**Close.** «${a.name}» holds ${what}, not text, so it is written without quote marks around it.${more}`
          : `**Close.** «${a.name}» does not hold text, so it is written without quote marks around it.${more}`;
      }
      return `**Not quite.** Go through the lines from the top, and write down the value of «${a.name}» each time it changes.${more}`;
    }

    async function answer(k, input, fb, btn, showBtn) {
      const text = input.value;
      if (!text.trim()) {
        fb.className = "quiz-fb bad";
        fb.innerHTML = md("Type an answer first.");
        return;
      }
      if (!answers) {
        if (btn.disabled) return;
        btn.disabled = true;
        btn.textContent = py.state === "ready" ? "Checking…" : "Starting Python…";
        let res;
        try {
          res = await py.traceQuiz(ex.code, ex.inputs || [], ex.ask, 1, ex.files || null);
        } catch (err) {
          fb.className = "quiz-fb";
          fb.textContent = "";
          fb.append(pythonProblem(err));
          return;
        } finally {
          btn.disabled = false;
          btn.textContent = "Check";
        }
        if (!res.answers) {
          fb.className = "quiz-fb bad";
          fb.innerHTML = md("Python was stopped before it could answer. Press **Check** again.");
          return;
        }
        answers = res.answers;
      }
      const real = answers[k];
      if (real.error) {
        fb.className = "quiz-fb bad";
        fb.innerHTML = md(`This question has a mistake in the course, not in your answer: ${real.error}`);
        return;
      }
      const right = real.output !== undefined
        ? normalise(text) === real.output
        : real.accepted.some((x) => squash(x) === squash(text));
      if (right) {
        st.done.push(k);
        st.said[k] = real.output !== undefined ? normalise(text) : text.trim();
        Store.saveSoon();
        if (st.done.length === ex.ask.length) ctx.solved(!!st.helped);
        paint();
        return;
      }
      st.wrong[k] = (st.wrong[k] || 0) + 1;
      Store.saveSoon();
      fb.className = "quiz-fb bad";
      fb.innerHTML = md(nudgeFor(ex.ask[k], real, text, st.wrong[k]));
      showBtn.hidden = st.wrong[k] < 2;
    }

    // "Show me" opens the Step-through. Where Step-through is off, it shows the answer instead.
    function showMe(k, fb) {
      const a = ex.ask[k];
      st.helped = true;
      Store.saveSoon();
      fb.className = "quiz-fb";
      fb.textContent = "";
      if (ctx.canStep) {
        fb.append(h("div", { html: md(a.output
          ? "Press **Next** until the program ends, and watch the output grow."
          : `Press **Next** until line ${a.line} has run${a.hit > 1 ? ` ${a.hit} times` : ""}. Then read «${a.name}» in Python's memory.`) }));
        stepper.open(ex.code, ex.inputs || []);
        return;
      }
      const real = answers && answers[k];
      if (!real || real.error) return;
      add(fb, [
        h("div", { html: md("The answer is:") }),
        h("pre", { class: "out-block" }, real.output !== undefined ? real.output : real.accepted[0]),
        h("div", { html: md("Type it in, then press **Check**.") }),
      ]);
    }

    paint();
    return [
      h("div", { class: "st-code trace-code" }, lines),
      doneList,
      area,
      ex.hints && ex.hints.length && !ctx.exam ? h("div", { class: "actions" }, help.hintBtn) : null,
      help.list,
      stepper.root,
    ];
  }

  // read (Cold Read): one program, then its questions like quiz items.
  function readExercise(ctx) {
    const { ex, key } = ctx;
    const done = () => {
      if (ex.questions.every((_, k) => Store.data.quiz[`${key}/q${k}`])) ctx.solved();
    };
    return [
      staticCode(ex.code),
      ex.questions.map((q, k) => quizBlock(q, { key: `${key}/q${k}`, label: `Q${k + 1}`, onAnswered: done })),
    ];
  }

  // drill (Command Drill): a practice terminal. Each step accepts any of its `expect`
  // strings, ignoring capitals and extra spaces.
  function drillExercise(ctx) {
    const { ex } = ctx;
    const st = ctx.state;
    const steps = ex.steps;
    st.step = st.step || 0;
    const clean = (s) => String(s).trim().replace(/\s+/g, " ").toLowerCase();
    const ps = () => h("span", { class: "shell-ps" }, "> ");
    const log = h("div", { class: "shell-log" });
    const input = h("input", {
      class: "shell-input",
      type: "text",
      autocomplete: "off",
      autocapitalize: "off",
      autocorrect: "off",
      spellcheck: "false",
      enterkeyhint: "enter",
      "aria-label": "Type the command, then press Enter",
    });
    const line = h("div", { class: "shell-line" }, ps(), input);
    const screen = h("div", { class: "shell-screen drill-screen", onclick: () => { if (!window.getSelection().toString()) input.focus(); } }, log, line);
    const sayBox = h("div", { class: "drill-say", "aria-live": "polite" });
    const nudge = h("div", { class: "drill-nudge", "aria-live": "polite" });
    const enterBtn = button("Enter ↵", () => submit(), "btn");
    const mission = h("div", { class: "drill-mission", hidden: true });
    const help = helpTools(ctx);
    const echo = (text) => h("div", { class: "shell-echo" }, ps(), text);

    for (let k = 0; k < Math.min(st.step, steps.length); k++) {
      log.append(echo(steps[k].expect[0]));
      if (steps[k].output) log.append(h("div", { class: "shell-out" }, steps[k].output));
    }

    function paint() {
      const finished = st.step >= steps.length;
      line.hidden = finished;
      enterBtn.hidden = finished;
      sayBox.innerHTML = finished
        ? md(`**All ${steps.length} steps done.**`)
        : md(`**Step ${st.step + 1} of ${steps.length}.** ${steps[st.step].say}`);
      mission.hidden = !finished || !ex.mission;
      screen.scrollTop = screen.scrollHeight;
    }

    function submit() {
      if (st.step >= steps.length) return;
      const typed = input.value;
      if (!clean(typed)) return;
      const s = steps[st.step];
      log.append(echo(typed));
      input.value = "";
      if (s.expect.some((e) => clean(e) === clean(typed))) {
        if (s.output) log.append(h("div", { class: "shell-out" }, s.output));
        st.step += 1;
        nudge.textContent = "";
        Store.saveSoon();
        if (st.step === steps.length) ctx.solved();
      } else {
        log.append(h("div", { class: "shell-err" }, "That is not the command for this step. Nothing happened."));
        nudge.innerHTML = md(`Not quite. Type exactly «${s.expect[0]}», then press Enter.`);
      }
      paint();
    }

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submit();
      }
    });

    if (ex.mission) {
      const tick = h("input", { type: "checkbox" });
      tick.checked = !!st.laptop;
      tick.addEventListener("change", () => {
        st.laptop = tick.checked;
        Store.saveSoon();
      });
      add(mission, [
        h("div", { class: "block-label" }, "Now on your own laptop"),
        h("div", { class: "prose", html: md(ex.mission) }),
        h("label", { class: "tick" }, tick, "I did this on my laptop", h("span", { class: "muted small" }, "(not required)")),
      ]);
    }

    paint();
    return [sayBox, screen, h("div", { class: "actions" }, enterBtn, help.hintBtn), nudge, help.list, mission];
  }

  const EXERCISE_KINDS = {
    write: codeExercise,
    make: codeExercise,
    modify: codeExercise,
    bug: bugExercise,
    catch: catchExercise,
    parsons: parsonsExercise,
    fill: fillExercise,
    trace: traceExercise,
    read: readExercise,
    drill: drillExercise,
  };

  function outputDiff(expected, got) {
    const e = expected.split("\n");
    const g = got ? got.split("\n") : [];
    const first = (() => {
      for (let i = 0; i < Math.max(e.length, g.length); i++) if (e[i] !== g[i]) return i;
      return -1;
    })();
    const col = (title, lines, emptyText) =>
      h("div", { class: "diff-col" },
        h("div", { class: "diff-title" }, title),
        h("pre", { class: "diff-body" }, lines.length
          ? lines.map((l, i) => h("span", { class: i === first ? "diff-line hit" : "diff-line" }, l + "\n"))
          : h("span", { class: "con-empty" }, emptyText)));
    return h("div", { class: "diff" },
      col("Expected", e, "(nothing)"),
      col("Your program printed", g, "(nothing)"));
  }

  // ===========================================================================
  // 8. Pages
  // ===========================================================================

  function page(cls, ...kids) {
    app.textContent = "";
    app.className = cls;
    add(app, kids);
  }

  // ---- Home ----
  // Day 40 is the graduation day of the core course (docs/SPEC.md); later days go further.
  const CORE_DAYS = 40;
  const coreDays = () => C.days.filter((d) => d.n <= CORE_DAYS);
  const solvedIn = (days) => days.reduce((n, d) => n + d.practice.filter((ex) => Store.data.solved[`${d.slug}/${ex.id}`]).length, 0);

  function renderHome() {
    const next = nextDay();
    const total = C.days.length;
    const core = coreDays().length;
    const doneCount = C.days.filter((d) => Store.data.done[d.slug]).length;
    const solvedCount = solvedIn(C.days);
    const exTotal = C.days.reduce((n, d) => n + d.practice.length, 0);
    const study = studyStats();
    const started = doneCount > 0 || solvedCount > 0 || Object.keys(Store.data.quiz).length > 0;

    const cta = next
      ? h("a", { class: "btn primary big", href: `#/day/${next.n}` }, started ? `Continue: Day ${next.n} — ${next.title}` : "Start Day 1")
      : h("a", { class: "btn primary big", href: "#/progress" }, `You finished all ${total} days! See your progress`);

    page("page-home",
      todayCard(),
      h("section", { class: "hero" },
        h("div", { class: "hero-text" },
          h("div", { class: "eyebrow" }, `A ${core}-day course for complete beginners${total > core ? `, then ${total - core} more days going further` : ""}`),
          h("h1", {}, `Learn Python in ${core} days`),
          h("p", { class: "lede" }, "One short lesson a day. Read, press Run, answer a few questions, then solve small exercises that are marked automatically. Real Python runs right here in your browser, and the step-through simulation shows exactly what Python does with every line."),
          h("p", { class: "sittings" }, `To be honest with you: ${core} days can take up to 60 sittings. Some days have a good place for a break in the middle. That is normal, not falling behind.`),
          h("div", { class: "hero-cta" }, cta, h("a", { class: "btn ghost big", href: "#/playground" }, "Open the playground"))),
        h("div", { class: "hero-stats" },
          stat(`${doneCount}`, `of ${total} days done`, total ? doneCount / total : 0),
          stat(`${solvedCount}`, `of ${exTotal} exercises solved`, exTotal ? solvedCount / exTotal : 0),
          stat(`${study.total}`, `total days studied · ${study.won} week${study.won === 1 ? "" : "s"} won`, null))),
      started ? null : howItWorks(),
      courseMap(next),
      started ? howItWorks() : null);
  }

  const PLAN_WORDS = { morning: "in the morning", afternoon: "in the afternoon", night: "at night" };

  // The top of the home page: warm-up, the next day, the study plan and this week.
  function todayCard() {
    Review.sync();
    const { cards, comeback } = Review.pick();
    const next = nextDay();
    const warmDone = Store.data.warmDone === today();
    const plan = Store.data.plan;
    const warm = warmDone
      ? h("div", { class: "today-step done" }, h("span", { class: "today-n" }, "✓"), h("div", {}, h("strong", {}, "Warm-up done"), h("div", { class: "muted small" }, "Well done. Your cards come back when it is time.")))
      : cards.length
        ? h("a", { class: "today-step", href: "#/review" }, h("span", { class: "today-n" }, "1"),
          h("div", {}, h("strong", {}, `Warm-up (${cards.length} card${cards.length === 1 ? "" : "s"})`), h("div", { class: "muted small" }, "Questions from earlier days, about 4 minutes.")))
        : h("div", { class: "today-step quiet" }, h("span", { class: "today-n" }, "1"),
          Object.keys(Store.data.review).length
            ? h("div", {}, h("strong", {}, "No warm-up today"), h("div", { class: "muted small" }, "None of your cards is due yet. They come back on their own."))
            : h("div", {}, h("strong", {}, "Warm-up starts tomorrow"), h("div", { class: "muted small" }, "Each question you answer becomes a warm-up card for later days.")));
    const go = next
      ? h("a", { class: "today-step", href: `#/day/${next.n}` }, h("span", { class: "today-n" }, "2"),
        h("div", {}, h("strong", {}, next.n === 1 && !Object.keys(Store.data.active).length ? "Start Day 1" : `Continue Day ${next.n}`),
          h("div", { class: "muted small" }, next.title)))
      : h("a", { class: "today-step", href: "#/programs" }, h("span", { class: "today-n" }, "2"),
        h("div", {}, h("strong", {}, "Every day is done"), h("div", { class: "muted small" }, "Run your programs again in My Programs.")));
    return h("section", { class: "today" },
      h("div", { class: "eyebrow" }, "Today"),
      comeback
        ? h("p", { class: "welcome" }, cards.length && !warmDone
          ? "Welcome back. It is good to see you. Today's warm-up has a few more cards than usual, to wake up what you know. Then you carry on from where you were."
          : "Welcome back. It is good to see you. Carry on from where you were, at your own pace.")
        : null,
      h("div", { class: "today-steps" }, warm, go),
      cards.length && !warmDone
        ? h("p", { class: "small" }, "Short on time? ", h("a", { href: "#/review" }, "Just do the warm-up"), ". It counts as a study day.")
        : null,
      plan && PLAN_WORDS[plan.when] ? h("p", { class: "muted small" }, `You planned to study next ${PLAN_WORDS[plan.when]}.`) : null,
      weeklyWin());
  }

  // This week as 7 dots, Monday to Sunday. Only what was done is counted; nothing is "missed".
  function weeklyWin() {
    const s = studyStats();
    const names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const t = mondayOf(today());
    return h("div", { class: "weekly" },
      h("div", { class: "week-dots", "aria-label": `${s.thisWeek} study days this week` },
        names.map((name, i) => h("span", { class: `wd${s.week[i] ? " on" : ""}${addDays(t, i) === today() ? " now" : ""}`, title: name }, name[0]))),
      h("div", { class: "weekly-text" },
        h("strong", {}, s.wonThisWeek ? "This week is won!" : `${s.thisWeek} of ${WEEK_TARGET} study days this week`),
        h("span", { class: "muted small" }, ` Weekly Win: ${WEEK_TARGET} study days in a week wins it. Weeks won: ${s.won}. Total days studied: ${s.total}.`)));
  }

  function weekSection(w, next) {
    const list = C.days.filter((d) => d.week === w.n);
    const done = list.filter((d) => Store.data.done[d.slug]).length;
    return h("section", { class: "week" },
      h("div", { class: "week-head" },
        h("div", {},
          h("div", { class: "eyebrow" }, `Week ${w.n}`),
          h("h2", {}, w.title),
          h("p", { class: "muted" }, w.blurb)),
        h("div", { class: "week-count" }, `${done} / ${list.length}`)),
      h("div", { class: "tiles" }, list.map((d) => {
        const st = dayStats(d);
        const isDone = !!Store.data.done[d.slug];
        const isNext = next && next.n === d.n;
        const partial = !isDone && (st.exDone || st.quizDone);
        return h("a", { class: `tile${isDone ? " done" : ""}${isNext ? " current" : ""}`, href: `#/day/${d.n}` },
          h("span", { class: "tile-n" }, `Day ${d.n}`, d.kind === "project" ? " · Project" : d.kind === "checkpoint" ? " · Checkpoint" : ""),
          h("span", { class: "tile-title" }, d.title),
          h("span", { class: "tile-state" }, isDone ? "✓ Done" : isNext ? "Up next" : partial ? `${st.exDone}/${st.exTotal} exercises` : ""));
      })));
  }

  // The weeks, grouped under Course.levels when there are any: the core first, then "going further".
  function courseMap(next) {
    const weeks = C.weeks.filter((w) => C.days.some((d) => d.week === w.n));
    const levels = (C.levels || []).filter((l) => C.days.some((d) => d.n >= l.from && d.n <= l.to));
    if (!levels.length) return weeks.map((w) => weekSection(w, next));
    const firstDay = (w) => Math.min(...C.days.filter((d) => d.week === w.n).map((d) => d.n));
    const lastDay = C.days[C.days.length - 1].n;
    const placed = new Set();
    const levelBlock = (l) => {
      const inside = weeks.filter((w) => !placed.has(w.n) && firstDay(w) >= l.from && firstDay(w) <= l.to);
      inside.forEach((w) => placed.add(w.n));
      return h("section", { class: "level" },
        h("div", { class: "level-head" },
          h("div", { class: "eyebrow" }, `Level ${l.n} · Days ${l.from} to ${Math.min(l.to, lastDay)}`),
          h("h2", { class: "level-title" }, l.title),
          l.outcome ? h("p", {}, h("strong", {}, "Goal: "), l.outcome) : null),
        inside.map((w) => weekSection(w, next)));
    };
    const core = coreDays().length;
    const further = C.days.length - core;
    const coreBlocks = levels.filter((l) => l.to <= CORE_DAYS).map(levelBlock);
    const furtherBlocks = levels.filter((l) => l.to > CORE_DAYS).map(levelBlock);
    // A week that no level covers is still shown, at the end, so no day goes missing.
    const rest = weeks.filter((w) => !placed.has(w.n)).map((w) => weekSection(w, next));
    return [
      h("div", { class: "part-head" },
        h("div", { class: "eyebrow" }, "Part one"),
        h("h2", { class: "part-title" }, `The ${core}-day core`),
        h("p", { class: "muted" }, "Everything a beginner needs, from the first print() to a working menu program.")),
      coreBlocks,
      furtherBlocks.length
        ? [h("div", { class: "part-head further" },
            h("div", { class: "eyebrow" }, "Part two"),
            h("h2", { class: "part-title" }, "Going further"),
            h("p", { class: "muted" }, `${further} more days after the core. Start them when the first ${core} days feel solid.`)),
          furtherBlocks]
        : null,
      rest,
    ];
  }

  function stat(big, small, fraction) {
    return h("div", { class: "stat" },
      h("div", { class: "stat-big" }, big),
      h("div", { class: "stat-small" }, small),
      fraction == null ? null : h("div", { class: "bar" }, h("span", { style: `width:${Math.round(fraction * 100)}%` })));
  }

  function howItWorks() {
    const step = (n, title, text) => h("li", {}, h("span", { class: "how-n" }, n), h("div", {}, h("strong", {}, title), h("p", { html: md(text) })));
    return h("section", { class: "how" },
      h("h2", {}, "How each day works"),
      h("ol", { class: "how-list" },
        step(1, "Learn", "Read a short explanation. Every example has a **Run** button — press it, then change the code and run it again. Breaking things is how you learn."),
        step(2, "Watch it run", "Press **Step through** to see a simulation of Python running your code one line at a time, with every variable shown as it changes."),
        step(3, "Check yourself", "Answer a few quick questions. Wrong answers are fine — try again."),
        step(4, "Practise", "Solve small exercises and press **Check answer**. If you're stuck, take a hint. After every hint and a few tries, the solution opens too."),
      ),
      h("p", { class: "muted small" }, "Your progress is saved in this browser. The first time you run code, the page downloads Python (about 12 MB), so it may take a few seconds."));
  }

  // ---- Day (also used for the sample days, with list = Course.sampleDays) ----
  const DAY_KINDS = { project: "Project", checkpoint: "Checkpoint" };
  const SKILL_NAMES = {
    read: "Reading code",
    trace: "Tracing code in your head",
    debug: "Fixing bugs",
    write: "Writing code",
    memory: "Remembering",
    choose: "Choosing the right tool",
  };
  const KIND_SKILL = { trace: "trace", bug: "debug", catch: "debug", read: "read", parsons: "write", fill: "write", write: "write", make: "write", modify: "write" };

  // Exam days: questions count when right the first time, exercises when solved without help.
  function skillScores(day) {
    const scores = {};
    const count = (skill, got) => {
      if (!scores[skill]) scores[skill] = { got: 0, of: 0 };
      scores[skill].of += 1;
      if (got) scores[skill].got += 1;
    };
    day.quiz.forEach((q, i) => {
      const a = Store.data.quiz[`${day.slug}/q${i}`];
      count(q.skill || "memory", a && a.first);
    });
    for (const ex of day.practice) {
      const key = `${day.slug}/${ex.id}`;
      if (ex.optional || ex.kind === "drill") continue;
      if (ex.kind === "read") {
        ex.questions.forEach((q, k) => {
          const a = Store.data.quiz[`${key}/q${k}`];
          count(q.skill || "read", a && a.first);
        });
      } else {
        const s = Store.data.solved[key];
        count(ex.skill || KIND_SKILL[ex.kind || "write"], s && !s.help);
      }
    }
    return scores;
  }

  function skillPanel(day) {
    return h("div", { class: "skills" },
      h("h3", {}, "Your score by skill"),
      Object.entries(skillScores(day)).map(([skill, s]) =>
        h("div", { class: "skill-row" },
          h("span", { class: "skill-name" }, SKILL_NAMES[skill] || skill),
          h("span", { class: "bar" }, h("span", { style: `width:${Math.round((s.got / s.of) * 100)}%` })),
          h("span", { class: "skill-score" }, `${s.got} of ${s.of}`))),
      h("p", { class: "muted small" }, "Questions count when they were right the first time. Exercises count when you solved them without help. This shows what to practise next. It is not a pass or a fail."));
  }

  // One optional tap at the end of a day. The answer shows on the home page's Today card.
  function planTap() {
    const box = h("div", { class: "plan" });
    function paint() {
      const plan = Store.data.plan;
      const chosen = plan && plan.at === today() ? plan.when : "";
      box.textContent = "";
      add(box, [
        h("div", { class: "plan-q" }, "When will you study next? ", h("span", { class: "muted small" }, "(optional)")),
        h("div", { class: "plan-opts" }, Object.keys(PLAN_WORDS).map((when) =>
          button(when[0].toUpperCase() + when.slice(1), () => {
            Store.data.plan = { when, at: today() };
            Store.save();
            paint();
          }, `btn${chosen === when ? " primary" : ""}`, { "aria-pressed": chosen === when ? "true" : "false" }))),
        chosen ? h("div", { class: "muted small" }, `Saved. The home page will remind you: next study ${PLAN_WORDS[chosen]}.`) : null,
      ]);
    }
    paint();
    return box;
  }

  function renderDay(n, list = C.days, base = "#/day/") {
    const day = list[n - 1];
    if (!day) return renderMissing();
    const sample = list !== C.days;
    const name = sample ? "Sample day" : "Day";
    const tracker = h("div", { class: "tracker" });
    const doneBanner = h("div", { class: "day-done", hidden: true });
    const later = day.practice.filter((ex) => ex.optional).length;

    // The first question or required exercise not yet done, in page order.
    function firstUnfinished() {
      const k = day.quiz.findIndex((_, i) => !Store.data.quiz[`${day.slug}/q${i}`]);
      if (k >= 0) return document.getElementById(`quiz-${k}`);
      const ex = day.practice.find((e) => !e.optional && !Store.data.solved[`${day.slug}/${e.id}`]);
      return ex ? document.getElementById(`ex-${ex.id}`) : null;
    }
    const resume = button("Continue where you stopped ↓", () => {
      const target = firstUnfinished();
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      target.classList.remove("flash");
      void target.offsetWidth; // restart the highlight
      target.classList.add("flash");
    }, "btn primary resume", { hidden: true });

    function refresh() {
      const st = dayStats(day);
      tracker.textContent = "";
      add(tracker, [
        st.quizTotal ? h("span", { class: `chip${st.quizDone === st.quizTotal ? " ok" : ""}` }, `Questions ${st.quizDone}/${st.quizTotal}`) : null,
        h("span", { class: `chip${st.exDone === st.exTotal ? " ok" : ""}` }, `Exercises ${st.exDone}/${st.exTotal}`),
        st.complete ? h("span", { class: "chip ok strong" }, "✓ Day complete") : null,
      ]);
      // Only once the day is started: before that, the place to start is the top.
      resume.hidden = st.complete || !(st.quizDone || st.exDone);
      if (st.complete) {
        if (!Store.data.done[day.slug]) {
          Store.data.done[day.slug] = today();
          Store.save();
        }
        const nxt = list[n];
        doneBanner.hidden = false;
        doneBanner.textContent = "";
        add(doneBanner, [
          h("div", { class: "done-big" }, `${name} ${n} complete!`),
          day.win ? h("p", { class: "win", html: inline(day.win) }) : null,
          day.exam ? skillPanel(day) : null,
          !sample && CERTS[n]
            ? certEarned(n)
              ? h("div", { class: "cert-call" }, h("strong", {}, `You have earned a certificate: ${CERTS[n].title}.`), " ",
                h("a", { class: "btn", href: `#/certificate/${n}` }, "Make your certificate"))
              : h("div", { class: "cert-call" }, h("strong", {}, "A certificate waits here."), " ",
                `It opens when every day from Day 1 to Day ${n} is complete. ${certMissing(n).length} day${certMissing(n).length === 1 ? " is" : "s are"} still to finish, starting with `,
                h("a", { href: `#/day/${certMissing(n)[0].n}` }, `Day ${certMissing(n)[0].n}`), ".")
            : null,
          sample ? null : planTap(),
          h("p", {}, nxt
            ? `Well done. Come back tomorrow for ${name} ${nxt.n}: ${nxt.title} — or carry on now if you have energy left.`
            : sample ? "That was the last sample day." : "That was the final day. You've learned the basics of Python — congratulations!"),
          nxt
            ? h("a", { class: "btn primary", href: `${base}${nxt.n}` }, `Go to ${name} ${nxt.n} →`)
            : h("a", { class: "btn primary", href: "#/progress" }, "See your progress"),
        ]);
      }
    }

    const week = C.weeks.find((w) => w.n === day.week);
    const prevDay = list[n - 2];
    const nextD = list[n];
    const needs = day.needs || [];
    page("page-day",
      h("header", { class: "day-head" },
        h("div", { class: "eyebrow" },
          sample ? h("a", { href: "#/sample" }, "Sample lessons") : h("a", { href: "#/" }, week ? `Week ${week.n}: ${week.title}` : "All days"),
          ` · ${name} ${n} of ${list.length}`),
        h("h1", {}, day.title),
        h("p", { class: "lede" }, day.goal),
        needs.length
          ? h("p", { class: "needs" }, "You need: ", needs.map((d, k) => [k ? ", " : "", h("a", { href: `#/day/${d}` }, `Day ${d}`)]))
          : null,
        h("div", { class: "day-meta" },
          DAY_KINDS[day.kind] ? h("span", { class: `chip kind-${day.kind}` }, DAY_KINDS[day.kind]) : null,
          day.exam ? h("span", { class: "chip exam" }, "Exam: no hints, no Step-through") : null,
          `About ${day.minutes} minutes · ${day.quiz.length} questions · ${day.practice.length} exercises${later ? ` (${later} to finish later)` : ""}`),
        tracker,
        resume),
      h("section", { class: "day-section" },
        h("h2", { class: "section-title" }, h("span", { class: "section-n" }, "1"), "Learn"),
        day.learn.map((item, k) => lessonBlock(day, item, k))),
      day.quiz.length
        ? h("section", { class: "day-section" },
          h("h2", { class: "section-title" }, h("span", { class: "section-n" }, "2"), "Check your understanding"),
          h("p", { class: "muted" }, "Pick an answer. You can try as many times as you like."),
          day.quiz.map((q, k) => quizBlock(q, { key: `${day.slug}/q${k}`, label: `Q${k + 1}`, onAnswered: refresh, id: `quiz-${k}` })))
        : null,
      h("section", { class: "day-section" },
        h("h2", { class: "section-title" }, h("span", { class: "section-n" }, "3"), "Practice"),
        h("p", { class: "muted" }, day.exam
          ? "This is a check, so there are no hints and no Step-through. Do your best. At the end you see a score for each skill."
          : "Each exercise says what to do. Run tries your code; Check answer marks it."),
        day.practice.map((ex, k) => exerciseBlock(day, ex, k, refresh))),
      h("section", { class: "day-section keys" },
        h("h2", { class: "section-title" }, h("span", { class: "section-n" }, "★"), "Key points to remember"),
        h("ul", { class: "key-list" }, day.keys.map((k) => h("li", { html: inline(k) })))),
      doneBanner,
      h("nav", { class: "day-nav" },
        prevDay ? h("a", { class: "btn ghost", href: `${base}${prevDay.n}` }, `← ${name} ${prevDay.n}`) : h("span"),
        h("a", { class: "btn ghost", href: sample ? "#/sample" : "#/" }, sample ? "First sample day" : "All days"),
        nextD ? h("a", { class: "btn ghost", href: `${base}${nextD.n}` }, `${name} ${nextD.n} →`) : h("span")));
    refresh();
  }

  // ---- Sample days: one of every exercise kind and lesson block (course/sample.js, loaded by ?sample) ----
  function renderSample(n) {
    if (!C.sampleDays || !C.sampleDays.length) {
      page("page-narrow",
        h("h1", {}, "Sample lessons"),
        h("p", { class: "lede" }, "The sample lessons load only when the page address has ?sample in it."),
        h("p", {}, h("a", { class: "btn primary", href: "?sample#/sample" }, "Open the sample lessons")));
      return;
    }
    renderDay(n, C.sampleDays, "#/sample/");
  }

  function renderMissing() {
    page("page-narrow", h("h1", {}, "Page not found"), h("p", {}, h("a", { href: "#/" }, "Back to the course")));
  }

  // ---- Playground ----
  const PLAYGROUND_START = `# The playground: write any Python you like here.
# Press Run (or Ctrl + Enter), or Step through to watch it run.

name = input("What's your name? ")
print(f"Hello, {name}! Welcome to Python.")

for number in range(1, 4):
    print(number, "squared is", number * number)
`;

  function renderPlayground() {
    const r = codeRunner({
      code: Store.data.playground ?? PLAYGROUND_START,
      minLines: 12,
      filesKey: "playground",
      onChange: (v) => {
        Store.data.playground = v;
        Store.saveSoon();
      },
    });
    // Save a copy (with its files) to My Programs, under a name the learner types.
    const nameBox = h("input", { class: "name-input", type: "text", maxlength: "60", "aria-label": "Name for this program", placeholder: "Name, e.g. Chai bill" });
    const saveNote = h("span", { class: "muted small", "aria-live": "polite" });
    const saveBtn = button("Save to My Programs", () => {
      if (!r.editor.value.trim()) {
        saveNote.textContent = "There is no code to save yet.";
        return;
      }
      const name = nameBox.value.trim() || `My program ${Store.data.programs.length + 1}`;
      const id = Date.now().toString(36);
      Store.data.programs.push({ id, name, code: r.editor.value, at: today() });
      Store.save();
      FileStore.copy("playground", `prog:${id}`);
      nameBox.value = "";
      saveNote.textContent = "";
      add(saveNote, ["Saved as ", h("strong", {}, name), ". ", h("a", { href: "#/programs" }, "Open My Programs")]);
    });
    const clear = confirmButton("Clear", "Click again to clear", () => {
      r.editor.value = "";
      r.view.hide();
      r.stepper.close();
      r.editor.focus();
    });
    const example = confirmButton("Load the example", "Replaces your code — click again", () => {
      r.editor.value = PLAYGROUND_START;
    });
    const script = h("div", { class: "pg-pane" },
      h("p", { class: "muted" }, "Your code here is saved automatically in this browser."),
      r.editor.root,
      h("div", { class: "actions" }, r.runBtn, r.stepBtn, clear, example, h("span", { class: "kbd-hint" }, "Ctrl + Enter runs")),
      r.view.root,
      r.files.root,
      r.stepper.root,
      h("div", { class: "save-prog" }, nameBox, saveBtn, saveNote));
    const shell = shellView();
    const tabs = h("div", { class: "tabs", role: "tablist" });
    const panes = { script, shell: shell.root };
    function show(which) {
      tabs.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset.tab === which));
      script.hidden = which !== "script";
      shell.root.hidden = which !== "shell";
      if (which === "shell") shell.focus();
    }
    add(tabs, [
      h("button", { type: "button", class: "tab", "data-tab": "script", onclick: () => show("script") }, "Script editor"),
      h("button", { type: "button", class: "tab", "data-tab": "shell", onclick: () => show("shell") }, "Python shell  >>>"),
    ]);
    page("page-playground",
      h("header", { class: "day-head" },
        h("div", { class: "eyebrow" }, "Playground"),
        h("h1", {}, "Try anything"),
        h("p", { class: "lede" }, "Two ways to use Python: write a whole program in the script editor, or type one line at a time into the shell — just like the real Python shell on a computer.")),
      tabs, panes.script, panes.shell);
    show("script");
  }

  function shellView() {
    const log = h("div", { class: "shell-log" });
    const ps = h("span", { class: "shell-ps" }, ">>> ");
    const input = h("input", { class: "shell-input", type: "text", autocomplete: "off", spellcheck: "false", autocapitalize: "off", "aria-label": "Python shell input" });
    const line = h("div", { class: "shell-line" }, ps, input);
    const screen = h("div", { class: "shell-screen", onclick: (e) => { if (!window.getSelection().toString()) input.focus(); } },
      h("div", { class: "shell-intro" }, `Python shell — type a line and press Enter. Try: 2 + 2`),
      log, line);
    const resetBtn = button("Restart shell", async () => {
      await py.shell("", "playground", true);
      log.textContent = "";
      buffer = [];
      ps.textContent = ">>> ";
      log.append(h("div", { class: "shell-note" }, "=== Restarted: all variables forgotten ==="));
      input.focus();
    }, "btn ghost");
    const root = h("div", { class: "pg-pane" },
      h("p", { class: "muted" }, "The shell remembers your variables until you restart it. Press ↑ and ↓ to reuse earlier lines."),
      screen,
      h("div", { class: "actions" }, resetBtn));
    let buffer = [];
    const history = [];
    let hIndex = 0;

    input.addEventListener("keydown", async (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        await submit(input.value);
      } else if (e.key === "ArrowUp" && history.length) {
        e.preventDefault();
        hIndex = Math.max(0, hIndex - 1);
        input.value = history[hIndex];
      } else if (e.key === "ArrowDown" && history.length) {
        e.preventDefault();
        hIndex = Math.min(history.length, hIndex + 1);
        input.value = history[hIndex] || "";
      } else if (e.key === "Tab" && !e.shiftKey) {
        e.preventDefault();
        const s = input.selectionStart;
        input.setRangeText("    ", s, input.selectionEnd, "end");
      }
    });

    async function submit(text) {
      if (!text.trim()) text = "";
      log.append(h("div", { class: "shell-echo" }, h("span", { class: "shell-ps" }, ps.textContent), h("span", { html: highlight(text) })));
      if (text.trim()) {
        history.push(text);
      }
      hIndex = history.length;
      if (!buffer.length && !text.trim()) {
        screen.scrollTop = screen.scrollHeight;
        return;
      }
      buffer.push(text);
      input.value = "";
      input.disabled = true;
      let res;
      try {
        res = await py.shell(buffer.join("\n"), "playground");
      } catch (err) {
        log.append(pythonProblem(err));
        buffer = [];
        ps.textContent = ">>> ";
        input.disabled = false;
        input.focus();
        return;
      }
      input.disabled = false;
      input.focus();
      if (res.status === "incomplete") {
        ps.textContent = "... ";
        const lastLine = buffer[buffer.length - 1];
        const pad = lastLine.match(/^ */)[0] + (/:\s*$/.test(lastLine) ? "    " : "");
        input.value = pad;
        screen.scrollTop = screen.scrollHeight;
        return;
      }
      buffer = [];
      ps.textContent = ">>> ";
      if (res.events && res.events.length) log.append(h("div", { class: "shell-out" }, renderEvents(res.events)));
      if (res.status === "error") {
        log.append(h("div", { class: "shell-err" }, `${res.error.type}: ${res.error.message}`));
        log.append(h("div", { class: "shell-explain", html: explainError(res.error).html }));
      } else if (res.status === "need_input") {
        log.append(h("div", { class: "shell-err" }, "input() can't wait for typing in this shell — use the Script editor tab for programs that ask questions."));
      } else if (res.status === "timeout" || res.status === "too_much_output") {
        log.append(h("div", { class: "shell-err" }, explainError({ type: res.status }).label + " — stopped."));
      } else if (res.status === "stopped") {
        log.append(h("div", { class: "shell-err" }, "Stopped."));
      }
      screen.scrollTop = screen.scrollHeight;
    }

    return { root, focus: () => input.focus() };
  }

  // ---- Cheat sheet ----
  function renderCheatsheet() {
    const next = nextDay();
    const reached = C.days.filter((d) => Store.data.done[d.slug] || (next && d.n === next.n));
    const locked = C.days.length - reached.length;
    page("page-narrow",
      h("header", { class: "day-head" },
        h("div", { class: "eyebrow" }, "Cheat sheet"),
        h("h1", {}, "Everything you've learned"),
        h("p", { class: "lede" }, "The key points from every day you've reached, in one place. Come back here whenever you forget something.")),
      reached.map((d) =>
        h("section", { class: "cheat" },
          h("h2", {}, h("a", { href: `#/day/${d.n}` }, `Day ${d.n}: ${d.title}`), Store.data.done[d.slug] ? h("span", { class: "chip ok" }, "✓") : h("span", { class: "chip" }, "in progress")),
          h("ul", { class: "key-list" }, d.keys.map((k) => h("li", { html: inline(k) }))))),
      locked ? h("p", { class: "muted center" }, `${locked} more day${locked === 1 ? "" : "s"} will appear here as you finish them.`) : null);
  }

  // ---- Progress ----
  function renderProgress() {
    const total = C.days.length;
    const doneCount = C.days.filter((d) => Store.data.done[d.slug]).length;
    const solved = C.days.flatMap((d) => d.practice.map((ex) => Store.data.solved[`${d.slug}/${ex.id}`]).filter(Boolean));
    const exTotal = C.days.reduce((n, d) => n + d.practice.length, 0);
    const quizTotal = C.days.reduce((n, d) => n + d.quiz.length, 0);
    // Only the end-of-day questions count here (not quick checks or Cold Read questions).
    const answered = C.days.flatMap((d) => d.quiz.map((_, i) => Store.data.quiz[`${d.slug}/q${i}`]).filter(Boolean));
    const firstTry = answered.filter((a) => a.first).length;
    const pct = total ? Math.round((doneCount / total) * 100) : 0;
    const ring = h("div", { class: "ring", style: `--p:${pct}` }, h("div", { class: "ring-in" }, h("strong", {}, `${pct}%`), h("span", {}, "complete")));
    page("page-narrow",
      h("header", { class: "day-head" },
        h("div", { class: "eyebrow" }, "Progress"),
        h("h1", {}, "How you're doing")),
      h("div", { class: "progress-top" },
        ring,
        h("div", { class: "progress-stats" },
          stat(`${doneCount}/${total}`, "days complete", total ? doneCount / total : 0),
          stat(`${solved.length}/${exTotal}`, `exercises solved (${solved.filter((s) => !s.help).length} without looking at the solution)`, exTotal ? solved.length / exTotal : 0),
          stat(`${answered.length}/${quizTotal}`, `questions answered (${firstTry} right first time)`, quizTotal ? answered.length / quizTotal : 0),
          stat(`${studyStats().total}`, "total days studied", null))),
      h("section", { class: "prog-weekly" }, h("h2", {}, "Weekly Win"), weeklyWin()),
      CERT_DAYS.filter(certEarned).length
        ? h("section", { class: "prog-certs" }, h("h2", {}, "Certificates"),
          CERT_DAYS.filter(certEarned).map((n) =>
            h("a", { class: "btn", href: `#/certificate/${n}` }, `Certificate: ${CERTS[n].title}`)))
        : null,
      C.weeks.filter((w) => C.days.some((d) => d.week === w.n)).map((w) => {
        const list = C.days.filter((d) => d.week === w.n);
        return h("section", { class: "prog-week" },
          h("h2", {}, `Week ${w.n}: ${w.title}`),
          list.map((d) => {
            const st = dayStats(d);
            const of = st.exTotal + st.quizTotal;
            const frac = of ? (st.exDone + st.quizDone) / of : 0;
            return h("a", { class: "prog-row", href: `#/day/${d.n}` },
              h("span", { class: "prog-name" }, `Day ${d.n}. ${d.title}`),
              h("span", { class: "bar" }, h("span", { style: `width:${Math.round(frac * 100)}%` })),
              h("span", { class: "prog-state" }, Store.data.done[d.slug] ? `✓ ${Store.data.done[d.slug]}` : `${st.exDone}/${st.exTotal} ex · ${st.quizDone}/${st.quizTotal} Q`));
          }));
      }),
      backupSection(),
      h("section", { class: "backup" },
        h("h2", {}, "Use without internet"),
        h("p", { class: "muted offline-note" }, offline.note)),
      h("section", { class: "danger" },
        h("h2", {}, "Start over"),
        h("p", { class: "muted" }, "This erases every answer, all saved code and files, and your study days, in this browser only."),
        confirmButton("Reset all progress", "Click again to erase everything", () => {
          Store.data = null;
          if (Store.ok) {
            localStorage.removeItem(Store.KEY);
            localStorage.removeItem(Store.SAMPLE_KEY);
          }
          Store.load();
          Store.save();
          FileStore.data = {};
          FileStore.save();
          renderProgress();
        }, "btn danger")),
      Store.ok ? null : h("p", { class: "callout warn" }, "This browser is blocking storage, so progress is not being saved."));
  }

  // ---- Backup and restore: all progress and saved files in one JSON file ----
  const BACKUP_APP = "fortydays.python";

  function backupSection() {
    const msg = h("div", { "aria-live": "polite" });
    const tell = (kind, text) => {
      msg.className = `callout ${kind}`;
      msg.textContent = "";
      msg.append(h("div", { html: md(text) }));
    };
    const saveBtn = button("Save a backup file", () => {
      const name = `python-progress-${today()}.json`;
      const data = { app: BACKUP_APP, version: 1, saved: today(), progress: Store.data, files: FileStore.data };
      const url = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: "application/json" }));
      const link = h("a", { href: url, download: name });
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      tell("tip", `Your backup is saved as «${name}», usually in your **Downloads** folder. Keep it somewhere safe, for example in your email or on a pen drive.`);
    });
    const picker = h("input", { type: "file", accept: ".json,application/json", hidden: true });
    const restoreBtn = button("Restore from a backup file", () => picker.click(), "btn ghost");
    picker.addEventListener("change", async () => {
      const file = picker.files[0];
      picker.value = "";
      if (!file) return;
      let data;
      try {
        data = JSON.parse(await file.text());
      } catch (err) {
        tell("warn", `«${file.name}» could not be read as a backup file (${err.message}). Nothing was changed.`);
        return;
      }
      const progress = data && data.progress;
      if (!data || data.app !== BACKUP_APP || !progress || typeof progress !== "object" || typeof progress.solved !== "object" || typeof progress.quiz !== "object") {
        tell("warn", `«${file.name}» is not a backup from this course. Nothing was changed.`);
        return;
      }
      const daysDone = Object.keys(progress.done || {}).length;
      const solved = Object.keys(progress.solved || {}).length;
      tell("warn", `This backup is from **${data.saved ? longDate(data.saved) : "an unknown date"}**: ${daysDone} day${daysDone === 1 ? "" : "s"} complete, ${solved} exercise${solved === 1 ? "" : "s"} solved. Restoring replaces all progress in this browser with the backup.`);
      msg.append(h("div", { class: "actions" }, confirmButton("Restore this backup", "Click again to replace your progress", () => {
        Store.data = Object.assign(Store.defaults(), progress);
        Store.save();
        FileStore.data = data.files && typeof data.files === "object" ? data.files : {};
        FileStore.save();
        renderProgress();
        window.scrollTo(0, 0);
        notice(`Your progress was restored from the backup of ${data.saved ? longDate(data.saved) : "an unknown date"}.`);
      }, "btn danger")));
    });
    return h("section", { class: "backup" },
      h("h2", {}, "Backup"),
      h("p", { class: "muted" }, "Your progress lives only in this browser. Save a backup file now and then. With it you can move to another computer or browser, or get your work back after clearing the browser."),
      h("div", { class: "actions" }, saveBtn, restoreBtn, picker),
      msg);
  }

  // ---- Certificates: a printable card at the end of every level from Level 3 on (Course.levels) ----
  // Only levels whose last day exists in Course.days get one. Each needs every day up to it complete.
  const CERT_WORDS = {
    40: { title: "The 40-day core", line: "has completed all 40 days of the core course in Python programming" },
    105: { title: "The full 105-day course", line: "has completed all 105 days of the Python programming course, from the first print() to a capstone program" },
  };
  const CERTS = {};
  for (const l of C.levels && C.levels.length ? C.levels : [{ n: 3, to: 40 }, { n: 9, to: 105 }]) {
    if (!(l.n >= 3) || !C.days[l.to - 1]) continue;
    CERTS[l.to] = CERT_WORDS[l.to] || {
      title: `Level ${l.n}: ${l.title}`,
      line: `has completed Level ${l.n}, ${l.title}, and every day before it: Days 1 to ${l.to} of the Python programming course`,
    };
  }
  const CERT_DAYS = Object.keys(CERTS).map(Number).sort((a, b) => a - b);

  // The days from Day 1 to Day n that are not complete yet.
  const certMissing = (n) => C.days.slice(0, n).filter((d) => !Store.data.done[d.slug]);
  const certEarned = (n) => !!CERTS[n] && C.days.length >= n && certMissing(n).length === 0;
  // The date the last of those days was finished.
  const certDate = (n) => C.days.slice(0, n).map((d) => Store.data.done[d.slug]).sort().pop();

  function renderCertificate(n) {
    const cert = CERTS[n];
    const day = C.days[n - 1];
    if (!cert || !day) return renderMissing();
    if (!certEarned(n)) {
      const missing = certMissing(n);
      page("page-narrow",
        h("header", { class: "day-head" }, h("div", { class: "eyebrow" }, "Certificate"), h("h1", {}, cert.title)),
        h("p", { class: "lede" }, `This certificate opens when every day from Day 1 to Day ${n} is complete. ${missing.length} day${missing.length === 1 ? " is" : "s are"} still to finish. Every day you study brings it closer.`),
        h("p", {}, h("a", { class: "btn primary", href: `#/day/${(missing[0] || day).n}` }, `Go to Day ${(missing[0] || day).n}`)));
      return;
    }
    const finished = certDate(n);
    const nameOut = h("div", { class: "cert-name" });
    const nameBox = h("input", { class: "name-input", type: "text", maxlength: "60", value: Store.data.name || "", "aria-label": "Your name for the certificate", placeholder: "Type your name" });
    const paintName = () => {
      nameOut.textContent = nameBox.value.trim() || "Your name";
      nameOut.classList.toggle("empty", !nameBox.value.trim());
    };
    nameBox.addEventListener("input", () => {
      Store.data.name = nameBox.value;
      Store.saveSoon();
      paintName();
    });
    paintName();
    page("page-narrow",
      h("header", { class: "day-head no-print" },
        h("div", { class: "eyebrow" }, "Certificate"),
        h("h1", {}, "Your certificate"),
        h("p", { class: "lede" }, "Type your name as you want it printed. Then press Print. To keep it as a file, choose \"Save as PDF\" in the print window.")),
      h("div", { class: "cert-form no-print" }, h("label", {}, "Your name ", nameBox), button("Print", () => window.print(), "btn primary")),
      h("div", { class: "cert" },
        h("div", { class: "cert-logo" }, "Py"),
        h("div", { class: "cert-kicker" }, "Certificate of completion"),
        h("div", { class: "cert-small" }, "This is to certify that"),
        nameOut,
        h("div", { class: "cert-line" }, cert.line),
        h("div", { class: "cert-course" }, "Forty Days of Python"),
        h("div", { class: "cert-date" }, `Finished on ${longDate(finished)}`)));
  }

  // ---- Warm-up: today's cards, one at a time ----
  function renderReview() {
    Review.sync();
    const { cards, comeback } = Review.pick();
    const next = nextDay();
    const box = h("div", { class: "warm" });
    const onward = () => h("div", { class: "actions" },
      next ? h("a", { class: "btn primary", href: `#/day/${next.n}` }, `Continue Day ${next.n}`) : null,
      h("a", { class: "btn ghost", href: "#/" }, "Home"));
    let at = 0;

    // A card's options come in a new order each day it returns (never the same order as last time),
    // and keep that order if the page is reloaded the same day. The right answer is tracked by index.
    function warmOrder(c) {
      const count = c.q.options.length;
      const t = today();
      const prev = c.card.shown;
      const valid = (o) => Array.isArray(o) && o.length === count && o.slice().sort((x, y) => x - y).every((v, i) => v === i);
      if (prev && prev.on === t && valid(prev.order)) return prev.order;
      let order = stableOrder(count, `${c.key}/warm/${t}`);
      if (prev && valid(prev.order) && count > 1 && order.every((v, i) => v === prev.order[i])) order = order.slice(1).concat(order[0]);
      c.card.shown = { on: t, order };
      Store.saveSoon();
      return order;
    }

    function show() {
      box.textContent = "";
      if (at >= cards.length) {
        Store.data.warmDone = today();
        Store.save();
        add(box, [
          h("div", { class: "day-done" },
            h("div", { class: "done-big" }, "Warm-up done"),
            h("p", {}, "Well done. That counts as a study day. Your cards come back when it is time to see them again."),
            onward()),
        ]);
        return;
      }
      const c = cards[at];
      const nextBtn = button(at + 1 < cards.length ? "Next card →" : "Finish the warm-up", () => {
        at += 1;
        show();
        window.scrollTo(0, 0);
      }, "btn primary", { hidden: true });
      add(box, [
        h("div", { class: "eyebrow" }, h("a", { href: `#/day/${c.day.n}` }, `From Day ${c.day.n}: ${c.day.title}`)),
        quizBlock(c.q, {
          key: c.key,
          label: `Card ${at + 1} of ${cards.length}`,
          fresh: true,
          order: warmOrder(c),
          onFirst: (right) => Review.record(c.key, right),
          onAnswered: () => {
            nextBtn.hidden = false;
            nextBtn.focus();
          },
        }),
        h("div", { class: "actions" }, nextBtn),
      ]);
    }

    page("page-narrow",
      h("header", { class: "day-head" },
        h("div", { class: "eyebrow" }, "Warm-up"),
        h("h1", {}, "Warm-up cards"),
        comeback
          ? h("p", { class: "lede" }, "Welcome back. It is good to see you. These cards wake up what you learned before. Take your time.")
          : h("p", { class: "lede" }, "A few questions from earlier days. Remembering is how learning stays. Wrong answers are fine: the card simply comes back sooner.")),
      cards.length
        ? box
        : h("div", { class: "day-done" },
          h("div", { class: "done-big" }, Store.data.warmDone === today() ? "You have done today's warm-up" : "Nothing to warm up today"),
          h("p", {}, Object.keys(Store.data.review).length
            ? "None of your cards is due yet. They come back on their own when it is time. Enjoy the next lesson."
            : "Your warm-up cards start once you have answered some end-of-day questions."),
          onward()));
    if (cards.length) show();
  }

  // ---- My Programs: every solved project stage and every playground save, runnable with its files ----
  function renderPrograms() {
    const stages = [];
    for (const day of C.days) {
      const stageCount = Math.max(0, ...day.practice.map((e) => e.stage || 0));
      for (const ex of day.practice) {
        const key = `${day.slug}/${ex.id}`;
        const s = Store.data.solved[key];
        if (!(ex.stage || day.kind === "project") || !s) continue;
        // The version that passed, saved when it was solved. Older saves only have the latest code, and say so.
        const kept = typeof s.code === "string" && s.code.trim() ? s.code : null;
        if (!kept && !(Store.data.code[key] || "").trim()) continue;
        stages.push({
          title: ex.title,
          meta: `Day ${day.n}: ${day.title}${ex.stage ? ` · Stage ${ex.stage} of ${stageCount}` : ""} · solved ${longDate(s.at)}${kept ? "" : " · this shows your latest code for this stage, which may have changed since it was solved"}`,
          code: kept || Store.data.code[key],
          filesKey: `ex:${key}`,
          link: `#/day/${day.n}`,
        });
      }
    }
    const saves = Store.data.programs.slice().reverse();

    // The editor is built only when opened, so a long shelf stays quick.
    function shelfItem(item, { onChange = null, remove = null } = {}) {
      const body = h("div", { class: "shelf-body", hidden: true });
      const openBtn = button("Open", () => {
        if (!body.childNodes.length) {
          const r = codeRunner({ code: item.code, minLines: 4, filesKey: item.filesKey, onChange });
          add(body, [
            onChange ? null : h("p", { class: "muted small" }, "Changes here are for trying things. They are not saved here."),
            r.editor.root,
            h("div", { class: "actions" }, r.runBtn, r.stepBtn),
            r.view.root,
            r.files.root,
            r.stepper.root,
          ]);
        }
        body.hidden = !body.hidden;
        openBtn.textContent = body.hidden ? "Open" : "Close";
      }, "btn");
      return h("article", { class: "card shelf-item" },
        h("div", { class: "shelf-head" },
          h("div", {}, h("h3", { class: "ex-title" }, item.title), h("div", { class: "muted small" }, item.meta,
            item.link ? [" · ", h("a", { href: item.link }, "Go to the day")] : null)),
          h("div", { class: "actions" }, openBtn, remove)),
        body);
    }

    page("page-narrow",
      h("header", { class: "day-head" },
        h("div", { class: "eyebrow" }, "My Programs"),
        h("h1", {}, "Programs you made"),
        h("p", { class: "lede" }, "Every project stage you have solved (as it was when it passed), and every program you saved from the playground. Open one to run it again. Each keeps its own files.")),
      h("section", { class: "shelf" },
        h("h2", {}, "Saved from the playground"),
        saves.length
          ? saves.map((p) => shelfItem(
            { title: p.name, meta: `Saved ${longDate(p.at)}`, code: p.code, filesKey: `prog:${p.id}` },
            {
              onChange: (v) => {
                p.code = v;
                Store.saveSoon();
              },
              remove: confirmButton("Delete", "Click again to delete", () => {
                Store.data.programs = Store.data.programs.filter((x) => x.id !== p.id);
                Store.save();
                FileStore.clear(`prog:${p.id}`);
                renderPrograms();
              }),
            }))
          : h("p", { class: "muted" }, "Nothing yet. In the ", h("a", { href: "#/playground" }, "playground"), ", press Save to My Programs to keep a program here.")),
      h("section", { class: "shelf" },
        h("h2", {}, "Project stages you solved"),
        stages.length
          ? stages.map((s) => shelfItem(s))
          : h("p", { class: "muted" }, "Project days build one program in stages. Each stage you solve appears here.")));
  }

  // ---- Glossary: plain-English meanings, with tap-to-define in lessons ----
  const Gloss = {
    entries: (C.glossary || []).slice().sort((a, b) => a.term.localeCompare(b.term)),
    byWord: new Map(),
    re: null,
    pop: null,
    owner: null,
  };
  (function buildGlossary() {
    for (const e of Gloss.entries) {
      // `match` lists the exact words to tap in lessons; without it, the term and its other forms.
      for (const w of e.match || [e.term, ...(e.words || [])]) Gloss.byWord.set(w.toLowerCase(), e);
    }
    if (!Gloss.byWord.size) return;
    const words = [...Gloss.byWord.keys()].sort((a, b) => b.length - a.length).map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    Gloss.re = new RegExp(`(^|[^A-Za-z0-9_\\-])(${words.join("|")})(?![A-Za-z0-9_\\-])`, "gi");
  })();

  // The first use of each glossary word in this block becomes a tappable word. Code is never touched.
  function glossify(root) {
    if (!Gloss.re) return root;
    const used = new Set();
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => (node.parentElement.closest("code, pre, a, button") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const text = node.nodeValue;
      const parts = [];
      let last = 0;
      let m;
      Gloss.re.lastIndex = 0;
      while ((m = Gloss.re.exec(text))) {
        const entry = Gloss.byWord.get(m[2].toLowerCase());
        if (used.has(entry)) continue;
        used.add(entry);
        const start = m.index + m[1].length;
        parts.push(text.slice(last, start), glossWord(m[2], entry));
        last = start + m[2].length;
      }
      if (!last) continue;
      parts.push(text.slice(last));
      node.replaceWith(...parts);
    }
    return root;
  }

  function glossWord(word, entry) {
    const btn = h("button", { type: "button", class: "gloss", "aria-expanded": "false", title: "What does this mean?" }, word);
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (Gloss.owner === btn) closeGloss();
      else openGloss(btn, entry);
    });
    return btn;
  }

  function glossCard(e) {
    return [
      h("div", { class: "gl-def", html: inline(e.def) }),
      e.eg ? h("div", { class: "gl-eg", html: `<span class="gl-eg-label">Example:</span> ${inline(e.eg)}` }) : null,
    ];
  }

  function openGloss(btn, entry) {
    closeGloss();
    const pop = h("div", { class: "gloss-pop", role: "dialog", "aria-label": `Meaning of ${entry.term}` },
      h("div", { class: "gl-term" }, entry.term),
      glossCard(entry),
      h("a", { class: "small", href: "#/glossary" }, "All words in the glossary"));
    document.body.append(pop);
    const r = btn.getBoundingClientRect();
    const width = pop.offsetWidth;
    pop.style.left = `${Math.max(16, Math.min(r.left, document.documentElement.clientWidth - width - 16)) + window.scrollX}px`;
    pop.style.top = `${r.bottom + 6 + window.scrollY}px`;
    btn.setAttribute("aria-expanded", "true");
    Gloss.pop = pop;
    Gloss.owner = btn;
  }

  function closeGloss() {
    if (Gloss.pop) Gloss.pop.remove();
    if (Gloss.owner) Gloss.owner.setAttribute("aria-expanded", "false");
    Gloss.pop = null;
    Gloss.owner = null;
  }

  document.addEventListener("click", (e) => {
    if (Gloss.pop && !Gloss.pop.contains(e.target)) closeGloss();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && Gloss.pop) {
      const owner = Gloss.owner;
      closeGloss();
      owner.focus();
    }
  });

  function renderGlossary() {
    const search = h("input", { class: "gl-search", type: "search", placeholder: "Search, e.g. loop", "aria-label": "Search the glossary", autocomplete: "off", spellcheck: "false" });
    const list = h("div", { class: "gl-list" });
    function paint() {
      const q = search.value.trim().toLowerCase();
      const hits = Gloss.entries.filter((e) => !q || [e.term, ...(e.words || []), e.def, e.eg || ""].some((t) => t.toLowerCase().includes(q)));
      list.textContent = "";
      if (!Gloss.entries.length) list.append(h("p", { class: "callout warn" }, "The glossary file (course/glossary.js) did not load, so there are no words to show."));
      else if (!hits.length) list.append(h("p", { class: "muted" }, `No word matches “${search.value.trim()}”. Try a shorter word.`));
      else for (const e of hits) list.append(h("div", { class: "gl-item" }, h("h3", {}, e.term), glossCard(e)));
    }
    search.addEventListener("input", paint);
    page("page-narrow",
      h("header", { class: "day-head" },
        h("div", { class: "eyebrow" }, "Glossary"),
        h("h1", {}, "Words and their meanings"),
        h("p", { class: "lede" }, `${Gloss.entries.length} words from the course, in plain English. In a lesson, tap a word with a dotted line under it to see its meaning.`)),
      search,
      list);
    paint();
  }

  // ---- Self-test: the same checks as tools/check_course.py, run in the page's own Python ----
  // Every example, quiz answer, solution, starter, wrong answer, Parsons answer, gap, bug line,
  // trace question and broken version, for every day (and the sample days when ?sample loaded them).

  // Feature names a uses/avoids test may name: harness.py's _NODE_FEATURES and _OPERATORS, plus its extras.
  const TEST_FEATURES = new Set(
    "for while if def return fstring listcomp try class with import break continue augassign compare dict list boolop not index_assign unpack nested_loop".split(" ")
  );
  const TEST_OPERATORS = new Set(["+", "-", "*", "/", "//", "%", "**"]);
  const ALL_KINDS = ["write", "make", "modify", "parsons", "fill", "bug", "trace", "catch", "read", "drill"];
  const GAP = /⟦([\s\S]*?)⟧/g;

  // Which lines (1-based) of `a` differ from `b`, exactly as tools/check_course.py works it
  // out: a copy of Python's difflib.SequenceMatcher(None, a, b, autojunk=False) matching
  // blocks and opcodes. Replaced or deleted lines count; a pure insertion counts the lines
  // on both sides of it.
  function changedLines(a, b) {
    const where = new Map(); // line text -> its places in b, in order
    b.forEach((line, j) => {
      if (!where.has(line)) where.set(line, []);
      where.get(line).push(j);
    });
    // The longest run of equal lines in a[alo:ahi] and b[blo:bhi]; the earliest one wins a tie.
    function longest(alo, ahi, blo, bhi) {
      let best = [alo, blo, 0];
      let runs = new Map();
      for (let i = alo; i < ahi; i++) {
        const next = new Map();
        for (const j of where.get(a[i]) || []) {
          if (j < blo) continue;
          if (j >= bhi) break;
          const k = (runs.get(j - 1) || 0) + 1;
          next.set(j, k);
          if (k > best[2]) best = [i - k + 1, j - k + 1, k];
        }
        runs = next;
      }
      return best;
    }
    const blocks = [];
    const queue = [[0, a.length, 0, b.length]];
    while (queue.length) {
      const [alo, ahi, blo, bhi] = queue.pop();
      const [i, j, k] = longest(alo, ahi, blo, bhi);
      if (!k) continue;
      blocks.push([i, j, k]);
      if (alo < i && blo < j) queue.push([alo, i, blo, j]);
      if (i + k < ahi && j + k < bhi) queue.push([i + k, ahi, j + k, bhi]);
    }
    blocks.sort((x, y) => x[0] - y[0] || x[1] - y[1] || x[2] - y[2]);
    const merged = [];
    let [i1, j1, k1] = [0, 0, 0];
    for (const [i2, j2, k2] of blocks) {
      if (i1 + k1 === i2 && j1 + k1 === j2) k1 += k2;
      else {
        if (k1) merged.push([i1, j1, k1]);
        [i1, j1, k1] = [i2, j2, k2];
      }
    }
    if (k1) merged.push([i1, j1, k1]);
    merged.push([a.length, b.length, 0]);
    const changed = new Set();
    let i = 0;
    let j = 0;
    for (const [ai, bj, size] of merged) {
      if (i < ai) for (let n = i + 1; n <= ai; n++) changed.add(n); // replaced or deleted
      else if (j < bj) {
        changed.add(i); // inserted between lines i and i + 1
        changed.add(i + 1);
      }
      i = ai + size;
      j = bj + size;
    }
    return changed;
  }

  async function renderSelftest() {
    const log = h("pre", { class: "selftest-log" });
    const summary = h("p", { class: "lede" }, "Running…");
    const days = C.days.concat(C.sampleDays || []);
    page("page-narrow", h("h1", {}, "Course self-test"),
      h("p", { class: "muted" }, `The same checks as tools/check_course.py, in this page's own Python. ${C.sampleDays ? `Includes ${C.sampleDays.length} sample days.` : "Add ?sample to the address to check the sample days too."}`),
      summary, log);
    const failures = [];
    let checks = 0;
    const fail = (where, what) => {
      failures.push(`${where}: ${what}`);
      log.append(`✗ ${where}: ${what}\n`);
    };
    window.__selftest = { done: false, failures, checks: 0 };

    // Every request to Python goes through here, so a failure inside the trainer becomes a ✗ line.
    async function call(where, name, ...args) {
      checks += 1;
      try {
        return await py[name](...args);
      } catch (err) {
        fail(where, `the trainer itself failed during ${name}: ${err && err.message ? err.message : err}`);
        return null;
      }
    }
    const why = (res) => [
      res.kind || res.status || "",
      res.message || "",
      res.error ? `${res.error.type}: ${res.error.message} (line ${res.error.line})` : "",
      "expected" in res ? `expected ${JSON.stringify(res.expected)} got ${JSON.stringify(res.got)}` : "",
    ].filter(Boolean).join(" - ");
    const passes = async (where, code, tests) => {
      const res = await call(where, "check", code, tests);
      return res && res.passed === true;
    };

    // -- lesson examples and questions --
    function checkPredict(where, item, res) {
      const options = item.predict;
      const answer = item.answer;
      if (!Number.isInteger(answer) || answer < 0 || answer >= options.length) return fail(where, "predict answer index out of range");
      let real;
      let same;
      if (res.status === "ok") {
        real = res.output;
        same = (o) => normalise(o) === real;
      } else if (res.status === "error") {
        real = res.error.type; // "what happens?" options name the error
        same = (o) => normalise(o) === real || normalise(o).startsWith(real + ":");
      } else {
        return fail(where, `predict needs a program that finishes, but it ends with ${res.status}`);
      }
      if (!same(options[answer])) fail(where, `predict answer is ${JSON.stringify(options[answer])} but Python gives ${JSON.stringify(real)}`);
      options.forEach((o, j) => {
        if (j !== answer && same(o)) fail(where, `predict option ${j} (${JSON.stringify(o)}) is also correct`);
      });
    }

    async function checkExample(where, item) {
      const inputs = item.inputs || [];
      const res = await call(where, "run", item.code, inputs, 1, item.files || null);
      if (res) {
        if (item.error && res.status !== "error") fail(where, `expected an error, got ${res.status}`);
        if (item.stops && res.status !== "timeout" && res.status !== "too_much_output") fail(where, `expected an endless loop to be stopped, got ${res.status}`);
        if (!item.error && !item.stops && res.status !== "ok" && res.status !== "need_input") fail(where, `does not run: ${why(res)}`);
        if ("predict" in item) checkPredict(where, item, res);
      }
      // Step-through must work on every example; call() reports it if it crashes.
      await call(where, "trace", item.code, inputs, 1, item.files || null);
    }

    async function checkQuestion(where, q) {
      const options = q.options || [];
      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= options.length) return fail(where, "answer index out of range");
      if (!q.code || q.verify === false) return;
      const res = await call(where, "run", q.code, q.inputs || [], 1);
      if (!res) return;
      if (q.error) {
        if (res.status !== "error") fail(where, "expected the code to raise an error");
        return;
      }
      if (res.status !== "ok") return fail(where, `code did not run: ${why(res)}`);
      if (normalise(options[q.answer]) !== res.output) fail(where, `marked answer ${JSON.stringify(options[q.answer])} but Python prints ${JSON.stringify(res.output)}`);
      options.forEach((o, j) => {
        if (j !== q.answer && normalise(o) === res.output) fail(where, `option ${j} (${JSON.stringify(o)}) is also correct`);
      });
    }

    // -- exercises --
    function staticTests(where, tests) {
      let allKnown = true;
      tests.forEach((test, k) => {
        if (!("uses" in test) && !("avoids" in test)) return;
        const extra = Object.keys(test).filter((x) => !["uses", "avoids", "msg", "label"].includes(x)).sort();
        if (extra.length) fail(where, `test ${k + 1} mixes uses/avoids with ${JSON.stringify(extra)}; a uses/avoids test must contain nothing else`);
        for (const feature of [...(test.uses || []), ...(test.avoids || [])]) {
          const cut = feature.indexOf(":");
          const prefix = cut < 0 ? feature : feature.slice(0, cut);
          const rest = cut < 0 ? "" : feature.slice(cut + 1);
          const known = TEST_FEATURES.has(feature) || (["call", "method", "kw"].includes(prefix) && rest) || (prefix === "op" && TEST_OPERATORS.has(rest));
          if (!known) {
            fail(where, `test ${k + 1} has an unknown feature ${JSON.stringify(feature)}`);
            allKnown = false;
          }
        }
      });
      return allKnown;
    }
    const needTests = (where, ex) => {
      if (ex.tests && ex.tests.length) return true;
      fail(where, "no tests");
      return false;
    };
    async function solutionPasses(where, code, tests, label = "solution") {
      const res = await call(where, "check", code, tests);
      if (res && !res.passed) fail(where, `${label} fails: ${why(res)}`);
    }
    async function mustFail(where, code, tests, label) {
      if (await passes(where, code, tests)) fail(where, `${label} already passes the tests`);
    }
    async function wrongsFail(where, ex) {
      for (const [k, wrong] of (ex.wrong || []).entries())
        if (await passes(where, wrong, ex.tests)) fail(where, `wrong answer #${k + 1} passes the tests`);
    }

    async function kindWrite(where, ex, strict) {
      if (!needTests(where, ex)) return;
      await solutionPasses(where, ex.solution || "", ex.tests);
      await mustFail(where, ex.starter || "", ex.tests, "starter");
      await wrongsFail(where, ex);
      if (strict && !(ex.wrong || []).length) fail(where, "no wrong answers; new days need at least one realistic wrong program");
    }

    const KIND_CHECKS = {
      write: kindWrite,
      make: kindWrite,
      modify: kindWrite,
      async parsons(where, ex) {
        const solution = ex.solution || "";
        if (!solution.trim()) return fail(where, "no solution");
        if (!["tests", "fixed"].includes(ex.order || "tests")) fail(where, `order must be "tests" or "fixed", not ${JSON.stringify(ex.order)}`);
        if (!["given", "choose"].includes(ex.indent || "given")) fail(where, `indent must be "given" or "choose", not ${JSON.stringify(ex.indent)}`);
        if (ex.order === "fixed") {
          if (ex.tests && ex.tests.length) await solutionPasses(where, solution, ex.tests);
        } else if (needTests(where, ex)) {
          await solutionPasses(where, solution, ex.tests);
        }
        const lines = new Set(solution.split("\n").map((l) => l.trim()).filter(Boolean));
        const distractors = ex.distractors || [];
        if (distractors.length > 2) fail(where, `has ${distractors.length} distractors; at most 2`);
        distractors.forEach((line, k) => {
          if (lines.has(line.trim())) fail(where, `distractor #${k + 1} ${JSON.stringify(line)} is also a line of the solution`);
        });
      },
      async fill(where, ex) {
        const template = ex.template || "";
        if (!template.match(GAP)) return fail(where, "template has no gaps (mark each one like ⟦answer⟧)");
        if (!needTests(where, ex)) return;
        await solutionPasses(where, template.replace(GAP, (_, answer) => answer), ex.tests, "filled-in template");
        if (await passes(where, template.replace(GAP, ""), ex.tests)) fail(where, "the template passes with the gaps empty");
        await wrongsFail(where, ex);
      },
      async bug(where, ex) {
        const starter = ex.starter || "";
        const solution = ex.solution || "";
        const bugLines = ex.bugLines || [];
        if (!needTests(where, ex)) return;
        const count = starter.split("\n").length;
        if (!bugLines.length || !bugLines.every((n) => Number.isInteger(n) && n >= 1 && n <= count))
          return fail(where, `bugLines ${JSON.stringify(bugLines)} must list line numbers from 1 to ${count}`);
        await mustFail(where, starter, ex.tests, "starter (the broken program)");
        await solutionPasses(where, solution, ex.tests);
        await wrongsFail(where, ex);
        const changed = changedLines(starter.split("\n"), solution.split("\n"));
        if (!bugLines.some((n) => changed.has(n)))
          fail(where, `the solution changes lines ${JSON.stringify([...changed].sort((x, y) => x - y))}, none of them in bugLines ${JSON.stringify(bugLines)}`);
      },
      async trace(where, ex) {
        if (!ex.code || !(ex.ask || []).length) return fail(where, "needs code and at least one ask");
        const res = await call(where, "traceQuiz", ex.code, ex.inputs || [], ex.ask, 1, ex.files || null);
        if (!res) return;
        if (!res.answers) return fail(where, `Python stopped before it answered (${res.status})`);
        ex.ask.forEach((ask, k) => {
          const answer = res.answers[k];
          if (answer && answer.error) fail(where, `ask ${JSON.stringify(ask)}: ${answer.error}`);
        });
      },
      async catch(where, ex) {
        const target = ex.target || "";
        const broken = ex.broken || [];
        if (!target || !broken.length) return fail(where, "needs a target and at least one broken version");
        const sol = await call(where, "catch", ex.solution || "", target, broken);
        if (!sol) return;
        if (!sol.on_target) return fail(where, `Python stopped before it answered (${sol.status})`);
        if (sol.on_target.kind === "target_broken") return fail(where, `the target program does not run: ${why(sol.on_target)}`);
        const crashed = new Set((sol.broken_errors || []).map((p) => p.index));
        for (const p of sol.broken_errors || []) fail(where, `broken version #${p.index + 1} does not run on its own: ${why(p)}`);
        if (!sol.on_target.ok) {
          fail(where, `the solution fails on the correct program: ${why(sol.on_target)}`);
        } else {
          const missed = sol.survivors.filter((k) => !crashed.has(k));
          if (missed.length) fail(where, `the solution does not catch broken version(s) ${missed.map((k) => `#${k + 1}`).join(", ")}`);
        }
        const st = await call(where, "catch", ex.starter || "", target, broken);
        if (st && st.passed) fail(where, "starter already passes (it catches every broken version)");
      },
      async read(where, ex) {
        const questions = ex.questions || [];
        if (!ex.code || !questions.length) fail(where, "needs code and at least one question");
        questions.forEach((q, k) => {
          if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= (q.options || []).length) fail(where, `question ${k + 1}: answer index out of range`);
        });
      },
      async drill(where, ex) {
        const steps = ex.steps || [];
        if (!steps.length) fail(where, "no steps");
        steps.forEach((step, k) => {
          if (!step.say || !(step.expect || []).length) fail(where, `step ${k + 1} needs say and expect`);
        });
      },
    };

    async function checkExercise(where, ex, day, strict) {
      const kind = ex.kind || "write";
      if (!ALL_KINDS.includes(kind)) return fail(where, `unknown kind ${JSON.stringify(kind)}`);
      if (kind !== "read" && !day.exam) {
        const hints = ex.hints || [];
        if (!hints.length) fail(where, "no hints");
        else if (strict && hints.length !== 3) fail(where, `has ${hints.length} hints; days after Day ${CORE_DAYS} need exactly 3`);
      }
      if (!staticTests(where, ex.tests || [])) return; // an unknown feature name would crash the harness
      await KIND_CHECKS[kind](where, ex, strict);
    }

    // -- every day --
    const seen = new Map();
    for (const day of days) {
      const at = `${day.sample ? "Sample day" : "Day"} ${day.n} (${day.slug})`;
      const strict = !!day.sample || day.n > CORE_DAYS; // sample days follow the rules for new days
      if (seen.has(day.slug)) fail(at, `duplicate slug (also ${seen.get(day.slug)})`);
      seen.set(day.slug, at);
      for (const field of ["slug", "title", "goal", "minutes", "learn", "quiz", "practice", "keys"]) if (day[field] == null) fail(at, `missing ${field}`);
      for (const [i, item] of (day.learn || []).entries()) {
        if (typeof item === "string") continue;
        if (item.t === "ex") await checkExample(`${at} example ${i}`, item);
        else if (item.t === "ask") await checkQuestion(`${at} ask ${i}`, item);
      }
      for (const [i, q] of (day.quiz || []).entries()) await checkQuestion(`${at} Q${i + 1}`, q);
      const ids = new Set();
      for (const [k, ex] of (day.practice || []).entries()) {
        const where = `${at} exercise "${ex.id}"`;
        if (!ex.id) fail(`${at} exercise #${k + 1}`, "no id");
        else if (ids.has(ex.id)) fail(where, "duplicate id");
        ids.add(ex.id);
        await checkExercise(where, ex, day, strict);
      }
      summary.textContent = `Checked up to ${at}… (${checks} checks, ${failures.length} problems)`;
      window.__selftest.checks = checks;
    }
    summary.textContent = failures.length
      ? `${failures.length} problem(s) found in ${checks} checks across ${days.length} days.`
      : `All ${checks} checks passed across ${days.length} days.`;
    if (!failures.length) log.append("✓ Every example runs, every answer matches real Python, every solution passes, and every starter, wrong answer and broken version is caught.\n");
    window.__selftest = { done: true, failures, checks };
  }

  // ===========================================================================
  // 9. Top bar, theme and page switching
  // ===========================================================================

  function paintStatus() {
    const box = document.getElementById("py-status");
    box.textContent = "";
    box.className = `py-status ${py.state}`;
    if (py.state === "loading") add(box, [h("span", { class: "dot" }), "Loading Python…"]);
    else if (py.state === "ready") add(box, [h("span", { class: "dot" }), py.busy ? "Running…" : `Python ${py.version} ready`]);
    else add(box, [h("span", { class: "dot" }), "Python didn't load ", button("Retry", () => py.retry(), "btn tiny")]);
    box.title = py.state === "failed" ? py.error : "";
  }

  function setupTheme() {
    const btn = document.getElementById("theme-btn");
    const current = () =>
      document.documentElement.dataset.theme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const paint = () => {
      btn.textContent = current() === "dark" ? "☀" : "☾";
      btn.setAttribute("aria-label", current() === "dark" ? "Switch to light mode" : "Switch to dark mode");
    };
    btn.addEventListener("click", () => {
      const next = current() === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("fortydays.theme", next);
      } catch (err) {
        // Theme choice just won't be remembered; nothing else depends on it.
      }
      paint();
    });
    paint();
  }

  // Offline use: sw.js keeps the site and Python's files. Without it the page works the same, online.
  const offline = {
    note: "Checking…",
    // Also updates the note on the Progress page if it is showing.
    set(text) {
      this.note = text;
      document.querySelectorAll(".offline-note").forEach((node) => (node.textContent = text));
    },
  };
  function setupOffline() {
    if (!("serviceWorker" in navigator)) {
      offline.set("This browser cannot keep the course for use without internet. Everything still works while you are online.");
      return;
    }
    if (!/^https?:$/.test(location.protocol)) {
      offline.set("Use without internet needs the course opened from a web address (http or https), not from a file. Everything still works while you are online.");
      return;
    }
    navigator.serviceWorker.register("sw.js").then(
      () => {
        offline.set("Ready. This browser keeps a copy of the course. Python is kept too, after it has loaded once with internet. Then the course works without internet.");
      },
      (err) => {
        offline.set(`This browser refused to keep the course for use without internet: ${err && err.message ? err.message : err}. Everything still works while you are online.`);
        console.warn("Service worker registration failed:", err);
      });
  }

  function route() {
    for (const v of liveViews) v.cancel();
    liveViews.clear();
    closeGloss();
    const hash = location.hash || "#/";
    const m = hash.match(/^#\/day\/(\d+)$/);
    const s = hash.match(/^#\/sample(?:\/(\d+))?$/);
    Store.useSample(!!s);
    const cert = hash.match(/^#\/certificate\/(\d+)$/);
    let nav = "home";
    if (cert) {
      nav = "progress";
      renderCertificate(+cert[1]);
    } else if (hash === "#/review") {
      nav = "home";
      renderReview();
    } else if (hash === "#/programs") {
      nav = "programs";
      renderPrograms();
    } else if (hash === "#/glossary") {
      nav = "glossary";
      renderGlossary();
    } else if (m) {
      renderDay(+m[1]);
    } else if (s) {
      nav = "";
      renderSample(s[1] ? +s[1] : 1);
    } else if (hash === "#/playground") {
      nav = "playground";
      renderPlayground();
    } else if (hash === "#/cheatsheet") {
      nav = "cheatsheet";
      renderCheatsheet();
    } else if (hash === "#/progress") {
      nav = "progress";
      renderProgress();
    } else if (hash === "#/selftest") {
      nav = "";
      renderSelftest();
    } else {
      renderHome();
    }
    document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("on", a.dataset.nav === nav));
    const day = m ? C.days[+m[1] - 1] : null;
    const sampleDay = s && C.sampleDays ? C.sampleDays[(s[1] ? +s[1] : 1) - 1] : null;
    document.title = day
      ? `Day ${day.n}: ${day.title} · Forty Days of Python`
      : sampleDay ? `Sample day ${sampleDay.n}: ${sampleDay.title} · Forty Days of Python` : "Forty Days of Python";
    window.scrollTo(0, 0);
  }

  Store.load();
  if (!Store.ok) notice("This browser is blocking storage, so your progress won't be saved between visits.");
  FileStore.load();
  Review.sync();
  setupOffline();
  setupTheme();
  py.onChange(paintStatus);
  window.addEventListener("hashchange", route);
  route();
})();
