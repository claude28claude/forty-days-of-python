// course/sample.js — sample lessons: one of every exercise kind and lesson block.
//
// Loaded by index.html only when the address has ?sample, and shown at #/sample.
// These days go into Course.sampleDays, never Course.days, so they are not part
// of the course, its progress or its counts. #/selftest checks them too (when
// loaded), with the rules for new days (exactly 3 hints, a wrong answer).

(function () {
  const C = window.Course;
  const { md, py, ex, code, tip, warn, ask, pause } = C;
  C.sampleDays = C.sampleDays || [];

  function day(spec) {
    spec.n = C.sampleDays.length + 1;
    spec.week = 0;
    spec.sample = true;
    C.sampleDays.push(spec);
  }

  // ---------------------------------------------------------------------------
  // Sample day 1: every lesson block and every exercise kind
  // ---------------------------------------------------------------------------
  day({
    slug: "sample-every-kind",
    title: "Every kind of exercise",
    goal: "See each lesson block and each exercise kind once.",
    minutes: 45,
    win: "Today you can now try every kind of exercise in this course.",
    learn: [
      md`
        ## Adding up with a loop

        A loop repeats lines. Here the loop adds each number to «total». Guess first, then press Run.
      `,
      ex(py`
        total = 0
        for n in [10, 20, 30]:
            total += n
        print(total)
      `, { predict: ["60", "30", "0"], answer: 0 }),
      ask({
        q: md`What does «total += n» do?`,
        options: ["It adds n to total", "It makes total equal to n", "It prints n"],
        answer: 0,
        explain: md`«total += n» is a short way to write «total = total + n».`,
        why: [null, md`That would be «total = n».`, md`Nothing is printed on that line.`],
      }),
      code(py`
        print("chai")
      `),
      tip(md`Press **Step through** to watch the loop run one line at a time.`),
      warn(md`Dividing by zero stops a program with an error.`),
      pause(md`Stand up, drink some water, then carry on.`),
      ex(py`
        print(10 / 0)
      `, { error: true, label: "A crash on purpose", predict: ["ZeroDivisionError", "0", "10"], answer: 0 }),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`print(7 // 2)`, options: ["3.5", "3", "4"], answer: 1,
        explain: md`«//» divides and drops the part after the point.`, skill: "trace" },
      { q: md`What does this program do?`, code: py`
          marks = [40, 55, 70]
          print(max(marks))
        `, options: ["It prints the highest mark", "It prints every mark", "It prints how many marks there are"],
        answer: 0, verify: false, mono: false, explain: md`«max» gives the biggest item.`, skill: "read" },
      { q: md`Which word starts a loop that repeats for each item?`, options: ["for", "if", "def"], answer: 0,
        explain: md`«for» repeats its block once for each item.`, skill: "memory" },
      { q: md`What happens?`, code: py`
          price = "50"
          print(price + 5)
        `, options: ["TypeError", "55", "505"], answer: 0, error: true, verify: true, mono: true,
        explain: md`Text and a number cannot be joined with «+».`, skill: "debug" },
      { q: md`Which tool counts the items in a list?`, options: ["«len()»", "«sum()»", "«max()»"], answer: 0,
        explain: md`«len()» counts items.`, skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: a running total",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          total = 0
          for n in [5, 10, 15]:
              total += n
          print(total)
        `,
        inputs: [],
        ask: [{ line: 3, name: "total" }, { line: 3, hit: 3, name: "total" }, { output: true }],
        hints: [
          md`Write «total» on paper. Start it at 0.`,
          md`Each time line 3 runs, add the next number in the list.`,
          md`The first time, «n» is 5.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: a chai bill",
        task: md`Put the lines in order so the program prints «Bill: 60».`,
        solution: py`
          price = 20
          count = 3
          bill = price * count
          print("Bill:", bill)
        `,
        distractors: ["bill = price + count"],
        indent: "given",
        tests: [{ output: "Bill: 60" }],
        hints: [
          md`A name needs a value before you use it.`,
          md`The two numbers come first. The sum comes next.`,
          md`«print» is the last line.`,
        ],
      },
      {
        id: "p2", kind: "parsons", title: "Arrange: cities, with indents",
        task: md`Put the lines in order and set each indent. The program prints «Delhi», «Pune», then «Done».`,
        solution: py`
          for city in ["Delhi", "Pune"]:
              print(city)
          print("Done")
        `,
        distractors: ["print(Delhi)"],
        indent: "choose",
        tests: [{ output: "Delhi\nPune\nDone" }],
        hints: [
          md`The loop line comes first.`,
          md`The line inside the loop moves 4 spaces to the right.`,
          md`«print("Done")» is not inside the loop, so it has no indent.`,
        ],
      },
      {
        id: "p3", kind: "parsons", title: "Arrange: the plan",
        task: md`Put the steps of a chai-bill program in the right order.`,
        solution: py`
          Ask for the price of one cup
          Ask for the number of cups
          Multiply the two numbers
          Print the bill
        `,
        distractors: ["Print the bill before asking anything"],
        order: "fixed",
        hints: [
          md`A program asks before it works things out.`,
          md`You need both numbers before you multiply.`,
          md`Printing is the last step.`,
        ],
      },
      {
        id: "f1", kind: "fill", title: "Fill the gaps: count to 2",
        task: md`Fill the gaps so the program prints 0, 1 and 2 on separate lines.`,
        template: py`
          for i in ⟦range⟧(3):
              print(⟦i⟧)
        `,
        tests: [{ output: "0\n1\n2" }],
        hints: [
          md`One tool gives the numbers 0, 1, 2.`,
          md`The first gap is that tool's name.`,
          md`The second gap is the loop's name, «i».`,
        ],
      },
      {
        id: "b1", kind: "bug", title: "Bug Clinic: the total is wrong",
        task: md`This program should print the total of the marks, «165». It prints «70».`,
        starter: py`
          marks = [40, 55, 70]
          total = 0
          for m in marks:
              total = m
          print(total)
        `,
        bugLines: [4],
        solution: py`
          marks = [40, 55, 70]
          total = 0
          for m in marks:
              total += m
          print(total)
        `,
        tests: [{ output: "165" }, { py: py`assert total == 165, "«total» should be 165."` }],
        wrong: [py`
          marks = [40, 55, 70]
          total = 0
          for m in marks:
              total += 1
          print(total)
        `],
        hints: [
          md`Watch «total» change in Step through.`,
          md`Line 4 replaces «total» each time.`,
          md`Use «+=» to add instead of replace.`,
        ],
      },
      {
        id: "c1", kind: "catch", title: "Catch the Bug: GST",
        task: md`«with_gst» adds 18% GST to a price in rupees. Write asserts that pass on the correct program and fail on both broken versions.`,
        target: py`
          def with_gst(price):
              return price * 118 // 100
        `,
        broken: [
          py`
            def with_gst(price):
                return price * 18 // 100
          `,
          py`
            def with_gst(price):
                return price + 18
          `,
        ],
        starter: py`
          # Write your asserts below, like this one:
          # assert with_gst(50) == 59
        `,
        solution: py`
          assert with_gst(100) == 118
          assert with_gst(200) == 236
        `,
        hints: [
          md`Work out the right answer for one price on paper.`,
          md`For 100 rupees, both a right and a wrong program can give 118.`,
          md`Try a second price, like 200.`,
        ],
      },
      {
        id: "r1", kind: "read", title: "Cold Read: top student",
        task: md`Read the program. Then answer the questions.`,
        code: py`
          scores = {"Asha": 72, "Ravi": 64}
          best = ""
          for name in scores:
              if scores[name] > 70:
                  best = name
          print(best)
        `,
        questions: [
          { q: md`What does this program print?`, options: ["Asha", "Ravi", "72"], answer: 0,
            explain: md`Only Asha scored more than 70.`, skill: "read" },
          { q: md`What is «best» for?`, options: ["The name of a student who scored above 70", "How many students there are", "The highest mark"],
            answer: 0, explain: md`«best» gets a name when the mark is above 70.`, skill: "read" },
        ],
      },
      {
        id: "d1", kind: "drill", title: "Command Drill: run Python",
        task: md`Practise two commands in this pretend terminal.`,
        steps: [
          { say: md`Type «python --version» and press Enter.`, expect: ["python --version", "py --version"], output: "Python 3.14.0" },
          { say: md`Now run a file. Type «python hello.py» and press Enter.`, expect: ["python hello.py", "py hello.py"], output: "Hello from your laptop!" },
        ],
        mission: md`Open the Command Prompt on your laptop. Type the same two commands there.`,
        hints: [
          md`Type the words inside the grey box exactly.`,
          md`There is one space between the two words.`,
          md`«py» works instead of «python» on Windows.`,
        ],
      },
      {
        id: "w1", title: "Write: the total of the marks", noStep: true,
        task: md`Print «Total: 165», using «sum» on the list. (Step through is off for this one.)`,
        starter: py`
          marks = [40, 55, 70]
        `,
        solution: py`
          marks = [40, 55, 70]
          print("Total:", sum(marks))
        `,
        tests: [{ output: "Total: 165" }],
        wrong: [py`
          marks = [40, 55, 70]
          print("Total:", len(marks))
        `],
        hints: [
          md`«sum(marks)» adds every item.`,
          md`Print a label and the sum with a comma between them.`,
          md`«print("Total:", ...)»`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: a discount", optional: true,
        task: md`The bill is 30 rupees. Change the program so it takes 10 rupees off and prints «Bill: 20».`,
        starter: py`
          price = 15
          cups = 2
          print("Bill:", price * cups)
        `,
        solution: py`
          price = 15
          cups = 2
          print("Bill:", price * cups - 10)
        `,
        tests: [{ output: "Bill: 20" }],
        wrong: [py`
          price = 15
          cups = 2
          print("Bill:", price - 10 * cups)
        `],
        hints: [
          md`Take 10 away from the whole bill.`,
          md`Change only the last line.`,
          md`«price * cups - 10»`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a greeting",
        task: md`
          Ask for a name, then greet the person. When the user types «Asha», it shows:

          | Namaste, Asha!
        `,
        starter: py`

        `,
        solution: py`
          name = input("Your name: ")
          print(f"Namaste, {name}!")
        `,
        tests: [
          { inputs: ["Asha"], output: "Namaste, Asha!" },
          { inputs: ["Ravi"], output: "Namaste, Ravi!" },
          { inputs: ["Meena Kumari"], output: "Namaste, Meena Kumari!" },
        ],
        wrong: [py`
          name = input("Your name: ")
          print("Namaste, name!")
        `],
        hints: [
          md`First «input», then «print».`,
          md`Keep the answer in a name, like «name».`,
          md`An f-string puts it in the text: «f"Namaste, {name}!"».`,
        ],
      },
    ],
    keys: [
      md`Guess what a program does before you run it.`,
      md`«total += n» adds «n» to «total».`,
    ],
  });

  // ---------------------------------------------------------------------------
  // Sample day 2: a project in stages, each carrying on from the last
  // ---------------------------------------------------------------------------
  day({
    slug: "sample-project-stages",
    title: "A project in stages",
    goal: "Build one small program in three stages.",
    minutes: 40,
    kind: "project",
    win: "Today you can now build a program step by step.",
    learn: [
      md`
        ## Three stages

        Each stage starts with your own code from the stage before. The last stage starts from a blank page.
      `,
    ],
    quiz: [
      { q: md`Which tool adds every number in a list?`, options: ["«sum()»", "«len()»", "«max()»"], answer: 0,
        explain: md`«sum()» adds them all.`, skill: "memory" },
    ],
    practice: [
      {
        id: "s1", stage: 1, title: "Stage 1: the price list",
        task: md`Put the prices 10, 20 and 15 in the list, so it prints «Items: 3».`,
        starter: py`
          prices = []
          print("Items:", len(prices))
        `,
        solution: py`
          prices = [10, 20, 15]
          print("Items:", len(prices))
        `,
        tests: [{ output: "Items: 3" }, { py: py`assert prices == [10, 20, 15], "«prices» should be [10, 20, 15]."` }],
        wrong: [py`
          prices = [10, 20]
          print("Items:", len(prices))
        `],
        hints: [md`Put numbers inside the square brackets.`, md`Use commas between them.`, md`«[10, 20, 15]»`],
      },
      {
        id: "s2", stage: 2, carry: "s1", title: "Stage 2: the total",
        task: md`Add one line at the end that prints «Total: 45».`,
        starter: py`
          prices = [10, 20, 15]
          print("Items:", len(prices))
        `,
        solution: py`
          prices = [10, 20, 15]
          print("Items:", len(prices))
          print("Total:", sum(prices))
        `,
        tests: [{ output: "Items: 3\nTotal: 45" }],
        wrong: [py`
          prices = [10, 20, 15]
          print("Items:", len(prices))
          print("Total:", len(prices))
        `],
        hints: [md`Keep the lines you have.`, md`Add a new «print» at the end.`, md`«sum(prices)»`],
      },
      {
        id: "s3", stage: 3, kind: "make", title: "Stage 3: from a blank page",
        task: md`
          Write the whole program again from a blank page, and add the average. It prints:

          | Items: 3
          | Total: 45
          | Average: 15.0
        `,
        starter: py`

        `,
        solution: py`
          prices = [10, 20, 15]
          print("Items:", len(prices))
          print("Total:", sum(prices))
          print("Average:", sum(prices) / len(prices))
        `,
        tests: [{ output: "Items: 3\nTotal: 45\nAverage: 15.0" }],
        wrong: [py`
          prices = [10, 20, 15]
          print("Items:", len(prices))
          print("Total:", sum(prices))
          print("Average:", sum(prices) // len(prices))
        `],
        hints: [md`Start with the list.`, md`The average is the total divided by the count.`, md`Use «/», which gives «15.0».`],
      },
    ],
    keys: [md`A big program is many small stages.`],
  });

  // ---------------------------------------------------------------------------
  // Sample day 3: a checkpoint in exam mode
  // ---------------------------------------------------------------------------
  day({
    slug: "sample-checkpoint",
    title: "A checkpoint",
    goal: "Check what you know, with no hints and no Step-through.",
    minutes: 30,
    kind: "checkpoint",
    exam: true,
    needs: [12, 25],
    win: "Today you can now see which skills are strong, and which need practice.",
    learn: [
      md`
        ## How this works

        There are no hints today. At the end you see a score for each skill.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          x = 4
          x = x * 2
          print(x)
        `, options: ["8", "4", "42"], answer: 0, explain: md`«x» becomes 8.`, skill: "trace" },
      { q: md`What does this program do?`, code: py`
          n = int(input())
          print(n * n)
        `, options: ["It prints the square of a number the user types", "It prints the number twice", "It asks two questions"],
        answer: 0, verify: false, mono: false, explain: md`«n * n» is the square.`, skill: "read" },
      { q: md`Which symbol gives the remainder?`, options: ["«%»", "«//»", "«/»"], answer: 0,
        explain: md`«%» gives the remainder.`, skill: "memory" },
    ],
    practice: [
      {
        id: "e1", kind: "trace", title: "Be the Computer: counting letters",
        task: md`Answer without running the program.`,
        code: py`
          count = 0
          for ch in "chai":
              count += 1
          print(count)
        `,
        ask: [{ line: 3, hit: 2, name: "count" }, { output: true }],
      },
      {
        id: "e2", kind: "bug", title: "Bug Clinic: the bill",
        task: md`Three cups at 12 rupees should print «Bill: 36».`,
        starter: py`
          price = 12
          cups = 3
          print("Bill:", price + cups)
        `,
        bugLines: [3],
        solution: py`
          price = 12
          cups = 3
          print("Bill:", price * cups)
        `,
        tests: [{ output: "Bill: 36" }],
        wrong: [py`
          price = 12
          cups = 3
          print("Bill:", price - cups)
        `],
      },
      {
        id: "e3", kind: "make", title: "Make: double it",
        task: md`
          Ask for a whole number and print double it. When the user types «7», it shows:

          | Double: 14
        `,
        starter: py`

        `,
        solution: py`
          n = int(input("A number: "))
          print("Double:", n * 2)
        `,
        tests: [
          { inputs: ["7"], output: "Double: 14" },
          { inputs: ["0"], output: "Double: 0" },
          { inputs: ["-3"], output: "Double: -6" },
        ],
        wrong: [py`
          n = input("A number: ")
          print("Double:", n * 2)
        `],
      },
    ],
    keys: [md`A checkpoint shows what to practise next. It is not a pass or a fail.`],
  });
})();
