// course/core.js — the tools the lesson files (week1.js … week6.js) use.
//
//   md`…`   a piece of lesson text. Blank lines start new paragraphs,
//           "## " starts a heading, "- " starts a bullet,
//           «like this» shows code, **like this** is bold.
//   py`…`   a piece of Python code, kept exactly as written.
//   ex(code)    a runnable example with Run and Step-through buttons.
//   code(code)  example code shown without buttons.
//   tip(text) / warn(text)  a coloured side note.
//   ask({q, code, options, answer, explain, why})  a one-question check inside the lesson.
//   pause(text)  a "good place for a break" divider (text is optional).
//   day({...})  adds one day to the course. Its week is spec.week if given,
//               otherwise one week per 7 days.
//
// docs/AUTHORING.md is the full contract for these files.

(function () {
  const days = [];

  function dedent(text) {
    const lines = text.replace(/\r\n/g, "\n").split("\n");
    while (lines.length && !lines[0].trim()) lines.shift();
    while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
    const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length);
    const cut = indents.length ? Math.min(...indents) : 0;
    return lines.map((l) => l.slice(cut)).join("\n");
  }

  // String.raw keeps backslashes exactly as typed, so "\n" inside Python
  // code stays a backslash-n instead of becoming a real line break.
  const raw = (strings, ...values) => dedent(String.raw(strings, ...values));

  window.Course = {
    days,
    weeks: [
      { n: 1, title: "First steps", blurb: "Make Python print, calculate, remember things and ask questions." },
      { n: 2, title: "Making decisions", blurb: "Teach your programs to choose with if, elif and else." },
      { n: 3, title: "Repeating things", blurb: "Loops: let the computer do the boring, repetitive work." },
      { n: 4, title: "Lists", blurb: "Store many values together and work through them." },
      { n: 5, title: "Dictionaries & functions", blurb: "Look things up by name, and build your own commands." },
      { n: 6, title: "Real-world tools", blurb: "Handle errors, use modules, save files and meet classes." },
      { n: 7, title: "Your Laptop, First Bug Hunts", blurb: "Run Python files on your own laptop and start fixing broken programs." },
      { n: 8, title: "Bug Hospital, Your Names", blurb: "Repair programs you have never seen, and see what names really point to." },
      { n: 9, title: "Tables and Grids", blurb: "Work with tables of records and grids of rows and columns." },
      { n: 10, title: "Sets and Sorting", blurb: "Remove repeats with sets and sort data by any rule you choose." },
      { n: 11, title: "Refuse Bad Data, Prove It Works", blurb: "Stop bad input early and write tests that catch hidden bugs." },
      { n: 12, title: "Files and Real Data", blurb: "Read folders, CSV and JSON files, and work with dates." },
      { n: 13, title: "Patterns and Other People's Code", blurb: "Find patterns in text, read other people's code and make your own modules." },
      { n: 14, title: "Objects, Properly", blurb: "Design small classes that work together." },
      { n: 15, title: "Speed, Then Your Own Program", blurb: "Learn why some programs are slow, then build your own study program." },
    ],
    // docs/SPEC.md section 5: each level is a run of days with one outcome.
    levels: [
      { n: 1, title: "First Steps", from: 1, to: 14, outcome: "Follow a 10-line program with if and elif in your head, and write a small ask-calculate-print program from a blank page." },
      { n: 2, title: "Loops and Lists", from: 15, to: 28, outcome: "Predict what a loop inside a loop prints, and fix a loop that runs one time too many or too few." },
      { n: 3, title: "Core Programmer", from: 29, to: 40, outcome: "Build a working menu program in stages, and earn your first certificate." },
      { n: 4, title: "Laptop and Bug Hunter", from: 41, to: 51, outcome: "Run Python files on your own Windows laptop, and repair broken programs you have never seen, without Step-through." },
      { n: 5, title: "Names and Tables", from: 52, to: 63, outcome: "Tell when two names share one list, and work with tables of records and grids." },
      { n: 6, title: "Sorting and Proving", from: 64, to: 77, outcome: "Sort by any rule you choose, and write tests that catch hidden bugs." },
      { n: 7, title: "Real Data", from: 78, to: 91, outcome: "Work with folders, CSV and JSON files, dates and text patterns, read other people's code, and use your own modules and an installed package." },
      { n: 8, title: "Objects", from: 92, to: 98, outcome: "Design small classes that work together." },
      { n: 9, title: "On Your Own", from: 99, to: 105, outcome: "Explain why a program is slow, build your own capstone program from a blank page, and pass the final exam." },
    ],
    md: raw,
    py: raw,
    ex: (code, opts = {}) => ({ t: "ex", code, ...opts }),
    code: (code) => ({ t: "code", code }),
    tip: (text) => ({ t: "tip", text }),
    warn: (text) => ({ t: "warn", text }),
    ask: (spec) => ({ t: "ask", ...spec }),
    pause: (text) => ({ t: "pause", text }),
    day(spec) {
      spec.n = days.length + 1;
      spec.week = spec.week || Math.ceil(spec.n / 7);
      // An exercise's `files` (name -> text) are its starting files: Run starts
      // with them, and every hidden test gets them unless the test gives its own.
      for (const ex of spec.practice || []) {
        if (!ex.files) continue;
        ex.tests = (ex.tests || []).map((t) =>
          "uses" in t || "avoids" in t ? t : { ...t, files: { ...ex.files, ...(t.files || {}) } });
      }
      days.push(spec);
    },
  };
})();
