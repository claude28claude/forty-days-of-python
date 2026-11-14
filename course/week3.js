// Week 3 — Repeating things: while, for, range, accumulators, strings, break/continue, nesting.
(function () {
  const { day, md, py, ex, tip, warn, ask, pause } = window.Course;

  // Expected output of a times grid with r rows and c columns, each number 4 wide.
  const grid = (r, c) => Array.from({ length: r }, (_, a) =>
    Array.from({ length: c }, (_, b) => String((a + 1) * (b + 1)).padStart(4)).join("")).join("\n");

  // Expected FizzBuzz output from 1 to n, where multiples of 7 that are not caught earlier print Boom.
  const boom = (n) => Array.from({ length: n }, (_, k) => {
    const i = k + 1;
    if (i % 15 === 0) return "FizzBuzz";
    if (i % 3 === 0) return "Fizz";
    if (i % 5 === 0) return "Buzz";
    if (i % 7 === 0) return "Boom";
    return String(i);
  }).join("\n");

  // ---------------------------------------------------------------- Day 15
  day({
    slug: "while-loops",
    title: "while loops",
    goal: "Make Python repeat code for as long as a condition stays true.",
    minutes: 40,
    needs: [3, 9],
    win: "Today you can now make Python repeat lines with a while loop, and stop it at the right time.",
    learn: [
      md`
        ## Doing things again and again

        To print the numbers 1 to 5, you could write five «print» lines. But what about 1 to 1,000? Computers are very good at repeating work. A **loop** tells Python to repeat some lines of code.

        Guess what this program prints. Then press Run.
      `,
      ex(py`
        count = 1
        while count <= 3:
            print(count)
            count += 1
        print("Done!")
      `, { predict: ["1\n2\n3\nDone!", "1\n2\n3\n4\nDone!", "1\nDone!"], answer: 0 }),
      md`
        How a «while» loop works:

        1. Python checks the condition («count <= 3»).
        2. If it is «True», Python runs the indented lines.
        3. Then it jumps **back up** to the «while» line and checks again.
        4. When the condition is «False», Python skips the indented lines and goes on after the loop.

        One full run of the indented lines is called a **round** of the loop. Another name for a round is an **iteration**. Press **Step through** above and watch the arrow jump back to the «while» line.

        Every counting loop has three parts:

        1. **Start**: a variable set before the loop, «count = 1».
        2. **Condition**: when to keep going, «count <= 3».
        3. **Change**: a line inside the loop that moves towards the end, «count += 1».
      `,
      ask({
        q: md`In the example, which line makes the loop stop in the end?`,
        options: ["«count += 1»", "«print(count)»", "«print(\"Done!\")»"],
        answer: 0,
        explain: md`«count += 1» makes «count» bigger each round. When it reaches 4, «count <= 3» is False.`,
        why: [null, md`Printing does not change «count», so it cannot stop the loop.`, md`This line runs after the loop has already stopped.`],
      }),
      md`
        ## Endless loops and counting down

        If the condition never becomes «False», the loop never ends. This is called an **endless loop**.
      `,
      warn(md`
        An endless loop usually happens when you forget the "change" line. This page stops any program that runs for more than 5 seconds or prints too much. Then it tells you what happened. Try it:
      `),
      ex(py`
        count = 1
        while count <= 5:
            print(count)
      `, { stops: true, label: "An endless loop on purpose" }),
      md`
        «count» stays 1 forever, so «1 <= 5» is always True. Add «count += 1» inside the loop to fix it.

        A loop can also count down. This one takes 1 away in each round. «Liftoff!» is the word for the moment a rocket leaves the ground.
      `,
      ex(py`
        n = 3
        while n > 0:
            print(n)
            n -= 1
        print("Liftoff!")
      `, { predict: ["3\n2\n1\nLiftoff!", "3\n2\n1\n0\nLiftoff!", "2\n1\n0\nLiftoff!"], answer: 0 }),
      md`
        When «n» becomes 0, «0 > 0» is False. So 0 is never printed.

        ## Repeating until the user says stop

        A «while» loop is the right tool when you do not know how many rounds you need. This one runs until the user types «quit».
      `,
      ex(py`
        answer = ""
        while answer != "quit":
            answer = input("Type something (or quit): ")
            print(f"You typed: {answer}")
        print("Goodbye!")
      `, { inputs: ["hi", "quit"] }),
      md`
        «""» is an **empty string**: text with nothing in it. «answer» must exist before the «while» line checks it.

        Notice that it printed «You typed: quit». Python checks the condition only when it comes back to the «while» line. It does not stop in the middle of the indented lines.

        Loops can also add numbers up. «total» starts at 0. In each round we add «n» to it, then make «n» bigger by 1. Day 17 teaches this fully.
      `,
      ex(py`
        total = 0
        n = 1
        while n <= 10:
            total += n
            n += 1
        print("1 + 2 + ... + 10 =", total)
      `),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          n = 1
          while n <= 3:
              print(n)
              n += 1
        `,
        options: ["1\n2\n3", "1\n2", "1\n2\n3\n4"],
        answer: 0,
        explain: md`When «n» becomes 4, «4 <= 3» is False and the loop stops.`,
        why: [null, md`«<=» means "less than or equal to", so 3 is printed too.`, md`4 is never printed. The check «4 <= 3» is False, so the loop stops first.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          n = 10
          while n > 10:
              print(n)
          print("end")
        `,
        options: ["10\nend", "end", "10 forever"],
        answer: 1,
        explain: md`«10 > 10» is False the first time Python checks it. So the indented lines never run.`,
        why: [md`10 is not bigger than 10, so «print(n)» never runs.`, null, md`The indented lines never run even once, so nothing repeats.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          n = 0
          while n < 10:
              n += 3
          print(n)
        `,
        options: ["9", "10", "12"],
        answer: 2,
        explain: md`«n» goes 0, 3, 6, 9, 12. At 9 the condition is still True, so it adds 3 once more.`,
        why: [md`At 9, «9 < 10» is still True, so one more round runs.`, md`«n» only goes up in steps of 3, so it never equals 10.`, null],
        skill: "trace",
      },
      {
        q: md`This loop never stops. What is missing?`,
        code: py`
          n = 1
          while n <= 5:
              print(n)
        `,
        options: ["A change line such as «n += 1» inside the loop", "A colon after «while»", "A «print» after the loop"],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`«n» stays 1, so «n <= 5» is always True. A change line makes «n» grow.`,
        why: [null, md`The colon is already there, after «n <= 5».`, md`A line after the loop cannot run until the loop ends.`],
        skill: "debug",
      },
      {
        q: md`What does this program do?`,
        code: py`
          total = 0
          n = 2
          while n <= 10:
              total += n
              n += 2
          print(total)
        `,
        options: ["It adds the even numbers from 2 to 10 and prints the total", "It prints every even number from 2 to 10", "It adds the numbers from 1 to 10"],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`«n» goes 2, 4, 6, 8, 10, and each one is added to «total». Only the total is printed.`,
        why: [null, md`«print» is after the loop, so it runs once, with the total.`, md`«n» starts at 2 and grows by 2, so odd numbers are skipped.`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-while",
        kind: "trace",
        title: "Be the Computer: adding up",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          n = 1
          total = 0
          while n <= 4:
              total += n
              n += 1
          print(total)
        `,
        inputs: [],
        ask: [{ line: 4, name: "total" }, { line: 4, hit: 3, name: "total" }, { line: 5, hit: 4, name: "n" }, { output: true }],
        hints: [
          md`Write «n» and «total» on paper. Change them each time a line runs.`,
          md`Line 4 adds «n» to «total». Line 5 adds 1 to «n».`,
          md`The first round: «total» becomes 0 + 1. The second round: 1 + 2.`,
        ],
      },
      {
        id: "trace-countdown",
        kind: "trace",
        title: "Be the Computer: steps of 3",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          n = 10
          while n > 0:
              n -= 3
          print(n)
        `,
        inputs: [],
        ask: [{ line: 3, name: "n" }, { line: 3, hit: 2, name: "n" }, { output: true }],
        hints: [
          md`Each round takes 3 away from «n».`,
          md`After each round, check «n > 0» again. Stop when it is False.`,
          md`«n» goes 10, 7, 4, 1, and then one more round.`,
        ],
      },
      {
        id: "arrange-countdown",
        kind: "parsons",
        title: "Arrange: a countdown",
        task: md`
          Put the lines in order so the program prints:

          | 3
          | 2
          | 1
          | Go!
        `,
        solution: py`
          n = 3
          while n > 0:
              print(n)
              n -= 1
          print("Go!")
        `,
        indent: "given",
        tests: [{ output: "3\n2\n1\nGo!" }],
        hints: [
          md`The start, «n = 3», comes before the loop.`,
          md`Inside the loop, print «n» first, then make it smaller.`,
          md`«print("Go!")» has no indent, so it is last.`,
        ],
      },
      {
        id: "count-to-ten",
        title: "Count to ten",
        task: md`Use a «while» loop to print the numbers 1 to 10, each on its own line.`,
        starter: py`
          number = 1

        `,
        hints: [
          md`The start is already there: «number = 1». You need a condition and a change.`,
          md`The condition is «number <= 10». Inside the loop, print «number», then add 1 to it.`,
          md`«while number <= 10:» — then print it and add 1, both indented.`,
        ],
        solution: py`
          number = 1
          while number <= 10:
              print(number)
              number += 1
        `,
        tests: [
          { output: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10" },
          { uses: ["while"], msg: md`Use a «while» loop for this one.` },
        ],
        wrong: [py`
          number = 1
          while number < 10:
              print(number)
              number += 1
        `],
      },
      {
        id: "countdown",
        title: "Countdown",
        task: md`
          Ask for a starting number, count down to 1, then print «Liftoff!». Use a «while» loop. For «3»:

          | 3
          | 2
          | 1
          | Liftoff!
        `,
        starter: py`

        `,
        hints: [
          md`Start with «n = int(input("Start from: "))».`,
          md`«while n > 0:» then print «n» and take 1 away.`,
          md`«print("Liftoff!")» goes after the loop — not indented.`,
        ],
        solution: py`
          n = int(input("Start from: "))
          while n > 0:
              print(n)
              n -= 1
          print("Liftoff!")
        `,
        tests: [
          { inputs: ["3"], output: "3\n2\n1\nLiftoff!" },
          { inputs: ["1"], output: "1\nLiftoff!" },
          { inputs: ["5"], output: "5\n4\n3\n2\n1\nLiftoff!" },
          { uses: ["while"], msg: md`Use a «while» loop for this one.` },
        ],
        wrong: [py`
          n = int(input("Start from: "))
          while n >= 0:
              print(n)
              n -= 1
          print("Liftoff!")
        `],
      },
      {
        id: "password-loop",
        title: "Keep trying",
        task: md`
          Keep asking for the password until the user types «python123». Then print «Welcome!» and how many attempts they needed. If they got it on the second try:

          | Welcome!
          | Attempts: 2
        `,
        starter: py`
          attempts = 1
          password = input("Password: ")

        `,
        hints: [
          md`Loop while the password is wrong: «while password != "python123":».`,
          md`Inside the loop: add 1 to «attempts» and ask again with «password = input("Password: ")».`,
          md`After the loop, not indented: «print("Welcome!")» and «print("Attempts:", attempts)».`,
        ],
        solution: py`
          attempts = 1
          password = input("Password: ")
          while password != "python123":
              attempts += 1
              password = input("Password: ")
          print("Welcome!")
          print("Attempts:", attempts)
        `,
        tests: [
          { inputs: ["python123"], output: "Welcome!\nAttempts: 1" },
          { inputs: ["abc", "python123"], output: "Welcome!\nAttempts: 2" },
          { inputs: ["a", "b", "Python123", "python123"], output: "Welcome!\nAttempts: 4" },
        ],
        wrong: [py`
          attempts = 1
          password = input("Password: ")
          while password != "python123":
              password = input("Password: ")
          print("Welcome!")
          print("Attempts:", attempts)
        `],
      },
    ],
    keys: [
      md`«while condition:» repeats its indented lines for as long as the condition is «True».`,
      md`A counting loop needs a start, a condition and a change: «n = 1», «while n <= 5:», «n += 1».`,
      md`If the condition never becomes «False», the loop never ends.`,
      md`Python checks the condition only at the «while» line, once per round.`,
      md`«while» is the right tool when you do not know how many rounds you need.`,
    ],
  });

  // ---------------------------------------------------------------- Day 16
  day({
    slug: "for-range",
    title: "for loops and range()",
    goal: "Repeat something an exact number of times with for and range().",
    minutes: 40,
    needs: [15],
    win: "Today you can now repeat code an exact number of times with for and range().",
    learn: [
      md`
        ## Repeat a set number of times

        When you know how many times to repeat, a «for» loop is simpler than «while». Guess how many times this says hello.
      `,
      ex(py`
        for i in range(5):
            print("Hello!")
      `, { predict: ["Hello!\nHello!\nHello!\nHello!\nHello!", "Hello!\nHello!\nHello!\nHello!", "Hello!"], answer: 0 }),
      md`
        Now print the variable «i» itself. Guess the output first.
      `,
      ex(py`
        for i in range(5):
            print(i)
      `, { predict: ["0\n1\n2\n3\n4", "1\n2\n3\n4\n5", "0\n1\n2\n3\n4\n5"], answer: 0 }),
      md`
        How «for i in range(5):» works:

        1. «range(5)» gives five numbers: 0, 1, 2, 3, 4. It starts at 0 and stops **before** 5, like slicing.
        2. Python puts the first number in «i» and runs the indented lines once. That is one round.
        3. It goes back, puts the next number in «i», and runs the lines again.
        4. When no numbers are left, the loop ends.

        Here «in» means "take each one from". «i» is the **loop variable**. The colon starts the block, as with «if». Press **Step through** and watch «i».
      `,
      ask({
        q: md`How many rounds does «for i in range(5):» run?`,
        options: ["5", "4", "6"],
        answer: 0,
        explain: md`«range(5)» gives five numbers, 0 to 4, so there are five rounds.`,
        why: [null, md`The last number is 4, but counting from 0 gives five numbers.`, md`5 itself is not included, so there is no sixth round.`],
      }),
      md`
        ## Start, stop and step

        «range(start, stop)» starts at «start» and stops before «stop». Guess first.
      `,
      ex(py`
        for n in range(1, 6):
            print(n)
      `, { predict: ["1\n2\n3\n4\n5", "1\n2\n3\n4\n5\n6", "0\n1\n2\n3\n4\n5"], answer: 0 }),
      md`
        A third number is the **step**: how much to jump each time. Guess again.
      `,
      ex(py`
        for n in range(0, 21, 5):
            print(n)
      `, { predict: ["0\n5\n10\n15\n20", "0\n5\n10\n15", "5\n10\n15\n20"], answer: 0 }),
      md`
        The stop number is 21, so 20 is still inside the range and is printed.
      `,
      md`
        A negative step counts down. Guess first.
      `,
      ex(py`
        for n in range(10, 0, -2):
            print(n)
      `, { predict: ["10\n8\n6\n4\n2", "10\n8\n6\n4\n2\n0", "8\n6\n4\n2\n0"], answer: 0 }),
      md`
        When counting down, Python also stops **before** the stop number. So 0 is not printed. To count down to 1, stop at 0: «range(5, 0, -1)».

        The loop variable is a normal variable. You can do maths with it inside the block:
      `,
      ex(py`
        for n in range(1, 6):
            print(f"{n} squared is {n * n}")
      `),
      md`
        ## for or while?

        Both can do the same job. These two programs print the same thing.
      `,
      ex(py`
        # Program 1: for
        for n in range(1, 4):
            print(n)
      `),
      ex(py`
        # Program 2: while
        n = 1
        while n <= 3:
            print(n)
            n += 1
      `),
      md`
        - Use «for» when you know how many times to repeat. Also use it when you go through a group of items one by one, like the letters of a word.
        - Use «while» when you repeat **until something happens**, like the user typing «quit».
      `,
      tip(md`Programmers often name the loop variable «i» (for "index") or «n». But a clear name like «day» or «page» makes code easier to read.`),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          for i in range(3):
              print(i)
        `,
        options: ["0\n1\n2", "1\n2\n3", "0\n1\n2\n3"],
        answer: 0,
        explain: md`«range(3)» is 0, 1, 2 — it starts at 0 and stops before 3.`,
        why: [null, md`«range(3)» starts at 0, not 1.`, md`The stop number, 3, is never included.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          for i in range(2, 8, 2):
              print(i)
        `,
        options: ["2\n4\n6", "2\n4\n6\n8", "2\n8"],
        answer: 0,
        explain: md`Start at 2, jump by 2, stop before 8.`,
        why: [null, md`8 is the stop number, so it is not included.`, md`The third number is the step, so every second number is printed.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          total = 0
          for i in range(1, 4):
              total += i
          print(total)
        `,
        options: ["6", "3", "10"],
        answer: 0,
        explain: md`1 + 2 + 3 = 6.`,
        why: [null, md`3 is the last value of «i», but «total» adds all of them.`, md`«range(1, 4)» stops at 3, so 4 is not added.`],
        skill: "trace",
      },
      {
        q: md`How many times does this print «hi»?`,
        code: py`
          for i in range(10):
              print("hi")
        `,
        options: ["9", "10", "11"],
        answer: 1,
        verify: false,
        mono: false,
        explain: md`«range(10)» has ten numbers (0 to 9), so the loop runs ten times.`,
        why: [md`The last number is 9, but counting from 0 gives ten numbers.`, null, md`10 itself is not included.`],
        skill: "trace",
      },
      {
        q: md`What does this program do?`,
        code: py`
          for n in range(5, 0, -1):
              print(n)
          print("Go!")
        `,
        options: ["It counts down from 5 to 1, then prints Go!", "It counts down from 5 to 0, then prints Go!", "It counts up from 1 to 5, then prints Go!"],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`The step is -1, so it counts down. It stops before 0, so the last number is 1.`,
        why: [null, md`The stop number, 0, is not included.`, md`A negative step counts down, not up.`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-range",
        kind: "trace",
        title: "Be the Computer: a step of 3",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          total = 0
          for n in range(2, 9, 3):
              total += n
          print(total)
        `,
        inputs: [],
        ask: [{ line: 3, name: "total" }, { line: 3, hit: 2, name: "n" }, { line: 3, hit: 3, name: "total" }, { output: true }],
        hints: [
          md`First write the numbers «range(2, 9, 3)» gives.`,
          md`Start at 2 and add 3 each time. Stop before 9.`,
          md`«n» is 2, then 5, then 8. Add each one to «total».`,
        ],
      },
      {
        id: "trace-down",
        kind: "trace",
        title: "Be the Computer: counting down",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          count = 0
          for n in range(10, 0, -3):
              count += 1
          print(n, count)
        `,
        inputs: [],
        ask: [{ line: 3, hit: 2, name: "n" }, { line: 3, hit: 4, name: "count" }, { output: true }],
        hints: [
          md`The step is -3, so «n» gets smaller each round.`,
          md`Python stops before 0. Which numbers above 0 do you reach from 10 in steps of 3?`,
          md`«n» is 10, 7, 4, 1. After the loop, «n» keeps its last value.`,
        ],
      },
      {
        id: "arrange-for-countdown",
        kind: "parsons",
        title: "Arrange: countdown with for",
        task: md`
          On Day 15 you wrote a countdown with «while». Now put these lines in order to do it with «for» and a negative step. For «3» it prints:

          | 3
          | 2
          | 1
          | Liftoff!
        `,
        solution: py`
          start = int(input("Start from: "))
          for n in range(start, 0, -1):
              print(n)
          print("Liftoff!")
        `,
        indent: "given",
        tests: [
          { inputs: ["3"], output: "3\n2\n1\nLiftoff!" },
          { inputs: ["1"], output: "1\nLiftoff!" },
          { inputs: ["5"], output: "5\n4\n3\n2\n1\nLiftoff!" },
        ],
        hints: [
          md`You need the starting number before the loop can use it.`,
          md`«print(n)» is inside the loop, so it has an indent.`,
          md`«print("Liftoff!")» has no indent, so it runs once, at the end.`,
        ],
      },
      {
        id: "times-table",
        title: "Times table",
        task: md`
          Ask for a number and print its times table from 1 to 10. Use a «for» loop with «range()». For «7» the first lines are:

          | 7 x 1 = 7
          | 7 x 2 = 14
          | 7 x 3 = 21

          …all the way to «7 x 10 = 70».
        `,
        starter: py`
          number = int(input("Which times table? "))

        `,
        hints: [
          md`How many rows do you need? Which number changes in each row?`,
          md`«for i in range(1, 11):» gives 1 to 10. Each row shows «number», «i» and «number * i».`,
          md`«print(f"{number} x {i} = {number * i}")»`,
        ],
        solution: py`
          number = int(input("Which times table? "))
          for i in range(1, 11):
              print(f"{number} x {i} = {number * i}")
        `,
        tests: [
          { inputs: ["7"], output: Array.from({ length: 10 }, (_, i) => `7 x ${i + 1} = ${7 * (i + 1)}`).join("\n") },
          { inputs: ["12"], output: Array.from({ length: 10 }, (_, i) => `12 x ${i + 1} = ${12 * (i + 1)}`).join("\n") },
          { inputs: ["1"], output: Array.from({ length: 10 }, (_, i) => `1 x ${i + 1} = ${i + 1}`).join("\n") },
          { uses: ["for"], msg: md`Use a «for» loop with «range()» for this one.` },
        ],
        wrong: [py`
          number = int(input("Which times table? "))
          for i in range(1, 10):
              print(f"{number} x {i} = {number * i}")
        `],
      },
      {
        id: "evens",
        title: "Even numbers",
        task: md`Print the even numbers from 2 to 20 (including 20), one per line. Use «range()» with a step, so you don't need an «if».`,
        starter: py`

        `,
        hints: [
          md`Start at 2 and jump by 2 each time.`,
          md`Start at 2, step by 2. The stop number is not included, so it must be bigger than 20.`,
          md`«for n in range(2, 21, 2):»`,
        ],
        solution: py`
          for n in range(2, 21, 2):
              print(n)
        `,
        tests: [
          { output: "2\n4\n6\n8\n10\n12\n14\n16\n18\n20" },
          { uses: ["for", "call:range"], msg: md`Use a «for» loop with «range()» and a step.` },
        ],
        wrong: [py`
          for n in range(2, 20, 2):
              print(n)
        `],
      },
      {
        id: "stars",
        title: "Star triangle",
        task: md`
          Ask for a number of rows and print a triangle where row 1 has one star, row 2 has two, and so on. Use a «for» loop with «range()». For «3»:

          | *
          | **
          | ***
        `,
        starter: py`

        `,
        hints: [
          md`First ask for the rows: «rows = int(input("Rows: "))».`,
          md`Loop from 1 to the number of rows (remember the stop isn't included).`,
          md`Repeat a string with «*»: «print("*" * row)».`,
        ],
        solution: py`
          rows = int(input("Rows: "))
          for row in range(1, rows + 1):
              print("*" * row)
        `,
        tests: [
          { inputs: ["3"], output: "*\n**\n***" },
          { inputs: ["1"], output: "*" },
          { inputs: ["5"], output: "*\n**\n***\n****\n*****" },
          { uses: ["for"], msg: md`Use a «for» loop with «range()» for this one.` },
        ],
        wrong: [py`
          rows = int(input("Rows: "))
          for row in range(1, rows):
              print("*" * row)
        `],
      },
    ],
    keys: [
      md`«for i in range(5):» repeats 5 times, with «i» going 0, 1, 2, 3, 4.`,
      md`«range(start, stop)» stops **before** «stop»: «range(1, 6)» is 1 to 5.`,
      md`«range(start, stop, step)» jumps by «step». A negative step counts down, and still stops before «stop».`,
      md`Use «for» when you know how many repeats. Use «while» to repeat until something happens.`,
    ],
  });

  // ---------------------------------------------------------------- Day 17
  day({
    slug: "totals-counters",
    title: "Totals and counters",
    goal: "Use loops to add things up, count things, and find averages and the biggest value.",
    minutes: 45,
    needs: [16],
    win: "Today you can now add up, count, average and find the biggest value with a loop.",
    learn: [
      md`
        ## Collecting an answer in a loop

        An **accumulator** is a variable that collects an answer little by little as the loop runs. It is like a money tin: each round, you drop in one more coin. A way of writing code that programmers use again and again is called a **pattern**. The accumulator pattern has three steps:

        1. **Before** the loop, create the variable: «total = 0».
        2. **Inside** the loop, add to it: «total += value».
        3. **After** the loop, use it.
      `,
      ex(py`
        total = 0
        for n in range(1, 101):
            total += n
        print("1 + 2 + ... + 100 =", total)
      `, { predict: ["1 + 2 + ... + 100 = 5050", "1 + 2 + ... + 100 = 4950", "1 + 2 + ... + 100 = 100"], answer: 0 }),
      tip(md`There is a famous story about a schoolboy named Carl Gauss. He found this answer in a few seconds. He made 50 pairs: 1 + 100, 2 + 99, and so on. Each pair adds up to 101. Python just adds the numbers one by one, very fast.`),
      md`
        ## Counting, averages and multiplying

        A **counter** is an accumulator that goes up by 1 each time something happens.
      `,
      ex(py`
        count = 0
        for n in range(1, 51):
            if n % 7 == 0:
                count += 1
        print(count, "numbers from 1 to 50 divide by 7")
      `, { predict: ["7 numbers from 1 to 50 divide by 7", "8 numbers from 1 to 50 divide by 7", "50 numbers from 1 to 50 divide by 7"], answer: 0 }),
      md`
        You can ask a question inside the loop. «i» goes 0, 1, 2. People count from 1, so the question shows «i + 1».
      `,
      ex(py`
        total = 0
        for i in range(3):
            price = float(input(f"Price of item {i + 1}: "))
            total += price
        print(f"Total: ₹{total:.2f}")
      `, { inputs: ["12.5", "20", "7.5"] }),
      md`
        An **average** is the total divided by how many there are. Here a counter and a total work together:
      `,
      ex(py`
        total = 0
        count = 0
        for i in range(3):
            marks = int(input(f"Marks in test {i + 1}: "))
            total += marks
            count += 1
        print("Average:", total / count)
      `, { inputs: ["70", "80", "60"] }),
      md`
        To multiply in a loop, the answer must start at **1**, not 0. Watch the mistake first:
      `,
      ex(py`
        result = 0
        for n in range(1, 6):
            result *= n
        print(result)
      `, { label: "A mistake: starting at 0", predict: ["0", "120", "15"], answer: 0 }),
      md`
        Anything times 0 is 0, so «result» stays 0. Start at 1, because 1 does not change what it multiplies:
      `,
      ex(py`
        result = 1
        for n in range(1, 6):
            result *= n
        print("1 x 2 x 3 x 4 x 5 =", result)
      `),
      pause(md`Good place for a break. The second part is about finding the biggest number.`),
      md`
        ## Finding the biggest

        Keep the biggest value seen so far. Start with the **first** number the user types. Then compare each new number with it, and keep the bigger one.
      `,
      ex(py`
        biggest = int(input("Number: "))
        for i in range(3):
            n = int(input("Number: "))
            if n > biggest:
                biggest = n
        print("Biggest:", biggest)
      `, { inputs: ["12", "45", "7", "30"] }),
      md`
        Sometimes there is no first number yet. Then start with «None». «None» is a special value that means "no value". Use «is None» to test for it.
      `,
      ex(py`
        biggest = None
        for i in range(4):
            n = int(input("Number: "))
            if biggest is None or n > biggest:
                biggest = n
        print("Biggest:", biggest)
      `, { inputs: ["-5", "-2", "-9", "-3"] }),
      md`
        Why not start with «0»? If the user types only negative numbers, like -5 and -2, then «0» stays the biggest. But the user never typed 0.

        Keep «biggest is None» on the **left** of «or». If it is True, Python does not look at the right side. Comparing a number with «None» crashes:
      `,
      ex(py`
        print(5 > None)
      `, { error: true, label: "A crash on purpose", predict: ["TypeError", "True", "False"], answer: 0 }),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          total = 0
          for n in range(4):
              total += n
          print(total)
        `,
        options: ["6", "10", "4"],
        answer: 0,
        explain: md`«range(4)» is 0, 1, 2, 3, and 0 + 1 + 2 + 3 = 6.`,
        why: [null, md`That would be 1 + 2 + 3 + 4. «range(4)» starts at 0 and stops at 3.`, md`4 is how many rounds there are, not the total.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          count = 0
          for n in range(10):
              if n % 2 == 0:
                  count += 1
          print(count)
        `,
        options: ["5", "4", "10"],
        answer: 0,
        explain: md`0, 2, 4, 6 and 8 are even — five numbers.`,
        why: [null, md`0 is even too: «0 % 2» is 0.`, md`«count» only grows when the «if» is True, not every round.`],
        skill: "trace",
      },
      {
        q: md`When you multiply in a loop, why does the answer variable start at 1 and not 0?`,
        options: ["Because anything multiplied by 0 is 0", "Because range() starts at 1", "No reason — either works"],
        answer: 0,
        explain: md`Starting at 0 would make every answer 0. 1 doesn't change what it's multiplied by.`,
        why: [null, md`«range()» starts at 0 unless you give a start. The reason is the multiplying.`, md`Run the lesson's mistake: starting at 0 always gives 0.`],
        skill: "memory",
      },
      {
        q: md`What happens when this runs?`,
        code: py`
          biggest = None
          n = 8
          if n > biggest or biggest is None:
              biggest = n
          print(biggest)
        `,
        options: ["TypeError", "8", "None"],
        answer: 0,
        error: true,
        explain: md`Python checks the left side first: «8 > None». A number cannot be compared with «None», so it crashes. Put «biggest is None» on the left.`,
        why: [null, md`It would print 8 if «biggest is None» came first. Here the comparison with «None» runs first.`, md`The program crashes before it reaches «print».`],
        skill: "debug",
      },
      {
        q: md`What does this program do?`,
        code: py`
          count = 0
          for i in range(5):
              marks = int(input("Marks: "))
              if marks >= 33:
                  count += 1
          print(count)
        `,
        options: ["It counts how many of 5 students scored 33 or more", "It adds up the marks of 5 students", "It prints the highest of 5 marks"],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`«count» goes up by 1 only when a mark is 33 or more. It is a counter, not a total.`,
        why: [null, md`The marks are never added. Only «count += 1» runs.`, md`Nothing keeps the biggest mark. «count» only counts.`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-total",
        kind: "trace",
        title: "Be the Computer: total and count",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          total = 0
          count = 0
          for price in range(10, 31, 10):
              total += price
              count += 1
          print(total / count)
        `,
        inputs: [],
        ask: [{ line: 4, hit: 2, name: "total" }, { line: 5, hit: 3, name: "count" }, { output: true }],
        hints: [
          md`First write the prices «range(10, 31, 10)» gives.`,
          md`«price» is 10, then 20, then 30. Add each to «total» and 1 to «count».`,
          md`At the end, divide the total by the count. «/» always gives a number with a point.`,
        ],
      },
      {
        id: "trace-biggest",
        kind: "trace",
        title: "Be the Computer: the biggest",
        task: md`The user types 5, then 9, then 2. Answer each question without running it.`,
        code: py`
          biggest = int(input("Number: "))
          for i in range(2):
              n = int(input("Number: "))
              if n > biggest:
                  biggest = n
          print(biggest)
        `,
        inputs: ["5", "9", "2"],
        ask: [{ line: 1, name: "biggest" }, { line: 5, name: "biggest" }, { output: true }],
        hints: [
          md`The first number goes straight into «biggest».`,
          md`Line 5 runs only when the new number is bigger than «biggest».`,
          md`9 is bigger than 5. Is 2 bigger than 9?`,
        ],
      },
      {
        id: "arrange-average",
        kind: "parsons",
        title: "Arrange: average of three tests",
        task: md`
          Put the lines in order. The program asks for 3 marks and prints their average. For 60, 70 and 80:

          | Average: 70.0
        `,
        solution: py`
          total = 0
          for i in range(3):
              marks = int(input("Marks: "))
              total += marks
          print("Average:", total / 3)
        `,
        indent: "given",
        tests: [
          { inputs: ["60", "70", "80"], output: "Average: 70.0" },
          { inputs: ["0", "0", "0"], output: "Average: 0.0" },
          { inputs: ["33", "34", "35"], output: "Average: 34.0" },
        ],
        hints: [
          md`An accumulator is created before the loop.`,
          md`Inside the loop: first ask for the marks, then add them.`,
          md`The average is printed once, after the loop.`,
        ],
      },
      {
        id: "sum-to-n",
        title: "Add up to n",
        task: md`
          Ask for a number «n» and print the total of all the whole numbers from 1 to «n». Use a loop and a total variable. For «10»:

          | 55
        `,
        starter: py`
          n = int(input("Add up to: "))
          total = 0

        `,
        hints: [
          md`The start is done: «total = 0». Now loop from 1 to «n» and add each number.`,
          md`«for i in range(1, n + 1):» then «total += i».`,
          md`Print the total after the loop (not indented).`,
        ],
        solution: py`
          n = int(input("Add up to: "))
          total = 0
          for i in range(1, n + 1):
              total += i
          print(total)
        `,
        tests: [
          { inputs: ["10"], output: "55" },
          { inputs: ["100"], output: "5050" },
          { inputs: ["1"], output: "1" },
          {
            py: py`
              import ast
              assert any(isinstance(node, (ast.For, ast.While)) for node in ast.walk(ast.parse(CODE))), "Use a loop to add the numbers up."
            `,
            inputs: ["3"],
          },
          { avoids: ["call:sum"], msg: md`Please add the numbers yourself, with a loop and a total variable.` },
        ],
        wrong: [py`
          n = int(input("Add up to: "))
          total = 0
          for i in range(1, n):
              total += i
          print(total)
        `],
      },
      {
        id: "average-marks",
        title: "Average marks",
        task: md`
          First ask how many subjects there are. Then ask for each subject's marks (whole numbers). Print the total and the average with 2 decimal places. For 3 subjects with marks 80, 90 and 70:

          | Total: 240
          | Average: 80.00
        `,
        starter: py`
          subjects = int(input("How many subjects? "))
          total = 0

        `,
        hints: [
          md`You need a loop that runs «subjects» times. Each round asks for one mark and adds it.`,
          md`Loop «subjects» times: «for i in range(subjects):», asking for a mark each time and adding it to «total».`,
          md`After the loop: «print("Total:", total)» and «print(f"Average: {total / subjects:.2f}")».`,
        ],
        solution: py`
          subjects = int(input("How many subjects? "))
          total = 0
          for i in range(subjects):
              marks = int(input(f"Marks for subject {i + 1}: "))
              total += marks
          print("Total:", total)
          print(f"Average: {total / subjects:.2f}")
        `,
        tests: [
          { inputs: ["3", "80", "90", "70"], output: "Total: 240\nAverage: 80.00" },
          { inputs: ["4", "55", "65", "75", "86"], output: "Total: 281\nAverage: 70.25" },
          { inputs: ["1", "33"], output: "Total: 33\nAverage: 33.00" },
        ],
        wrong: [py`
          subjects = int(input("How many subjects? "))
          total = 0
          for i in range(subjects):
              marks = int(input(f"Marks for subject {i + 1}: "))
              total += marks
          print("Total:", total)
          print("Average:", total / subjects)
        `],
      },
      {
        id: "count-multiples",
        title: "Multiples of 3 or 5",
        task: md`
          Ask for a number «n». Use a «for» loop to count how many numbers from 1 to «n» divide exactly by 3 **or** by 5, and print the count. For «15» the numbers are 3, 5, 6, 9, 10, 12 and 15, so:

          | 7
        `,
        starter: py`

        `,
        hints: [
          md`Plan: ask for «n», start a counter at 0, loop from 1 to «n», and add 1 to the counter when the number divides by 3 or by 5.`,
          md`Before the loop: «n = int(input("Up to: "))» and «count = 0». The loop line is «for i in range(1, n + 1):».`,
          md`Inside the loop: «if i % 3 == 0 or i % 5 == 0:» then «count += 1». Print «count» after the loop.`,
        ],
        solution: py`
          n = int(input("Up to: "))
          count = 0
          for i in range(1, n + 1):
              if i % 3 == 0 or i % 5 == 0:
                  count += 1
          print(count)
        `,
        tests: [
          { inputs: ["15"], output: "7" },
          { inputs: ["10"], output: "5" },
          { inputs: ["1"], output: "0" },
          { inputs: ["100"], output: "47" },
        ],
        wrong: [py`
          n = int(input("Up to: "))
          count = 0
          for i in range(1, n + 1):
              if i % 3 == 0 and i % 5 == 0:
                  count += 1
          print(count)
        `, py`
          n = int(input("Up to: "))
          count = 0
          for i in range(1, n):
              if i % 3 == 0 or i % 5 == 0:
                  count += 1
          print(count)
        `],
      },
      {
        id: "line-ways",
        title: "Ways to stand in a line",
        optional: true,
        task: md`
          The number of ways «n» friends can stand in a line is 1 × 2 × 3 × ... × «n». Ask for «n» and print the number of ways. Use a loop that multiplies. For «4»:

          | Ways: 24
        `,
        starter: py`
          n = int(input("Friends: "))

        `,
        solution: py`
          n = int(input("Friends: "))
          ways = 1
          for i in range(1, n + 1):
              ways *= i
          print("Ways:", ways)
        `,
        tests: [
          { inputs: ["4"], output: "Ways: 24" },
          { inputs: ["1"], output: "Ways: 1" },
          { inputs: ["6"], output: "Ways: 720" },
          { inputs: ["10"], output: "Ways: 3628800" },
        ],
        wrong: [py`
          n = int(input("Friends: "))
          ways = 0
          for i in range(1, n + 1):
              ways *= i
          print("Ways:", ways)
        `],
        hints: [
          md`Create «ways» before the loop. Multiplying needs a start of 1, not 0.`,
          md`Loop from 1 to «n» with «range(1, n + 1)». Inside, multiply «ways» by the loop variable.`,
          md`«ways *= i» inside the loop, then «print("Ways:", ways)» after it.`,
        ],
      },
      {
        id: "highest-marks",
        title: "Highest marks",
        task: md`
          Ask how many students there are. Then ask for each student's marks and print the highest. Start with «None». If there are no students, it shows «Highest: None». For 3 students with 45, 82 and 67:

          | Highest: 82
        `,
        starter: py`
          students = int(input("How many students? "))

        `,
        solution: py`
          students = int(input("How many students? "))
          highest = None
          for i in range(students):
              marks = int(input("Marks: "))
              if highest is None or marks > highest:
                  highest = marks
          print("Highest:", highest)
        `,
        tests: [
          { inputs: ["3", "45", "82", "67"], output: "Highest: 82" },
          { inputs: ["1", "33"], output: "Highest: 33" },
          { inputs: ["0"], output: "Highest: None" },
          { inputs: ["4", "90", "10", "9", "90"], output: "Highest: 90" },
        ],
        wrong: [
          py`
            students = int(input("How many students? "))
            highest = 0
            for i in range(students):
                marks = int(input("Marks: "))
                if marks > highest:
                    highest = marks
            print("Highest:", highest)
          `,
          py`
            students = int(input("How many students? "))
            highest = None
            for i in range(students):
                marks = int(input("Marks: "))
                if marks > highest or highest is None:
                    highest = marks
            print("Highest:", highest)
          `,
        ],
        hints: [
          md`Create «highest = None» before the loop. Loop «students» times and ask for marks each round.`,
          md`Inside the loop, replace «highest» when it is still «None», or when the new marks are bigger.`,
          md`«if highest is None or marks > highest:» then «highest = marks». Print after the loop.`,
        ],
      },
    ],
    keys: [
      md`Accumulator: create «total = 0» before the loop, «total += x» inside, use it after.`,
      md`A counter goes up by one when something happens: «count += 1».`,
      md`Average = total ÷ how many.`,
      md`To find the biggest, keep the best so far and replace it when you find a bigger one. Start from the first value, or from «None».`,
      md`Put «biggest is None» on the left of «or», so Python never compares a number with «None».`,
      md`When you multiply in a loop, start the answer at 1, not 0.`,
    ],
  });

  // ---------------------------------------------------------------- Day 18
  day({
    slug: "looping-text",
    title: "Looping through text",
    goal: "Walk through a string one character at a time to count, search and build new text.",
    minutes: 45,
    needs: [12, 13, 16],
    win: "Today you can now go through text one character at a time, and build new text.",
    learn: [
      md`
        ## A for loop can walk through a string

        «for» also works with a string. Each round, the variable gets the next character of the string. A **character** is one letter, digit, space or sign. Guess first.
      `,
      ex(py`
        for letter in "chai":
            print(letter)
      `, { predict: ["c\nh\na\ni", "chai", "c h a i"], answer: 0 }),
      md`
        ## Counting and building

        Put an «if» and a counter inside the loop. «ch» is just a short name for "character". You can choose any name. Guess how many vowels it finds.
      `,
      ex(py`
        sentence = "Python is fun"
        vowels = 0
        for ch in sentence.lower():
            if ch in "aeiou":
                vowels += 1
        print("Vowels:", vowels)
      `, { predict: ["Vowels: 3", "Vowels: 4", "Vowels: 13"], answer: 0 }),
      md`
        The word «in» has two jobs here. In «for ch in sentence», it means "take each one from". In «if ch in "aeiou"», it asks "is this inside?" and gives True or False.

        To build new text, start with an empty string «""» (from Day 15). Then add characters to it as you go.
      `,
      ex(py`
        word = "banana"
        result = ""
        for ch in word:
            if ch == "a":
                result += "*"
            else:
                result += ch
        print(result)
      `, { predict: ["b*n*n*", "******", "bnn"], answer: 0 }),
      pause(md`Good place for a break. The second part is about reversing text and positions.`),
      md`
        ## Reversing, and positions

        Adding each new character to the **front** reverses the word. Guess first, then use **Step through** to watch «backwards» grow.
      `,
      ex(py`
        word = "stressed"
        backwards = ""
        for ch in word:
            backwards = ch + backwards
        print(backwards)
      `, { predict: ["desserts", "stressed", "s"], answer: 0 }),
      md`
        Python also has a ready-made function for this. «reversed()» gives the characters from last to first. Use it in a «for» loop. Guess first.
      `,
      ex(py`
        for ch in reversed("chai"):
            print(ch)
      `, { predict: ["i\na\nh\nc", "c\nh\na\ni", "iahc"], answer: 0 }),
      md`
        If you need each character's position, loop over «range(len(word))». Then «word[i]» is the character at position «i». Guess first.
      `,
      ex(py`
        word = "code"
        for i in range(len(word)):
            print(i, word[i])
      `, { predict: ["0 c\n1 o\n2 d\n3 e", "1 c\n2 o\n3 d\n4 e", "0\n1\n2\n3"], answer: 0 }),
      tip(md`On Day 24 you will learn «enumerate()», a shorter way to get positions and items together.`),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          count = 0
          for ch in "hello":
              if ch == "l":
                  count += 1
          print(count)
        `,
        options: ["1", "2", "5"],
        answer: 1,
        explain: md`There are two «l»s in «hello».`,
        why: [md`The loop checks every character, so both «l»s are counted.`, null, md`«count» grows only when the character is «l».`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          out = ""
          for ch in "abc":
              out = ch + out
          print(out)
        `,
        options: ["abc", "cba", "a"],
        answer: 1,
        explain: md`Each new character goes on the front, so the string comes out reversed.`,
        why: [md`«ch + out» puts the new character in front, not at the end.`, null, md`«out» keeps growing; it is not replaced.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          for ch in "hi":
              print(ch * 2)
        `,
        options: ["hh\nii", "hihi", "h\ni"],
        answer: 0,
        explain: md`Each character is repeated twice and printed on its own line.`,
        why: [null, md`The loop takes one character at a time, so «ch» is «h», then «i».`, md`«ch * 2» repeats the character two times.`],
        skill: "trace",
      },
      {
        q: md`Asha wants this to print «abc». What does it print?`,
        code: py`
          result = ""
          for ch in "abc":
              result = ch
          print(result)
        `,
        options: ["c", "abc", "cba"],
        answer: 0,
        explain: md`«result = ch» replaces «result» each round, so only the last character stays. Use «result += ch» to add.`,
        why: [null, md`That needs «result += ch». Here «=» throws the old text away.`, md`Nothing is added to the front; each round replaces «result».`],
        skill: "debug",
      },
      {
        q: md`What does this program do?`,
        code: py`
          text = input("Text: ")
          count = 0
          for ch in text:
              if ch == " ":
                  count += 1
          print(count)
        `,
        options: ["It counts the spaces in the text", "It removes the spaces from the text", "It counts all the characters in the text"],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`«count» goes up only when the character is a space.`,
        why: [null, md`No new text is built. The program only counts.`, md`The «if» lets only spaces through to «count += 1».`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-build",
        kind: "trace",
        title: "Be the Computer: building a word",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          word = "dosa"
          result = ""
          for ch in word:
              result = result + ch.upper()
          print(result)
        `,
        inputs: [],
        ask: [{ line: 4, hit: 2, name: "result" }, { line: 4, hit: 3, name: "ch" }, { output: true }],
        hints: [
          md`«ch» takes the letters of «dosa» one by one.`,
          md`Each round adds the capital letter to the end of «result».`,
          md`After the first round, «result» is «D». After the second, «DO».`,
        ],
      },
      {
        id: "trace-count",
        kind: "trace",
        title: "Be the Computer: counting s",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          count = 0
          for ch in "samosa":
              if ch == "s":
                  count += 1
          print(count)
        `,
        inputs: [],
        ask: [{ line: 3, hit: 4, name: "ch" }, { line: 4, hit: 2, name: "count" }, { output: true }],
        hints: [
          md`Line 3 runs once for every letter of «samosa».`,
          md`The 4th letter of «samosa» is the 4th time line 3 runs.`,
          md`Line 4 runs only for an «s». There are two of them.`,
        ],
      },
      {
        id: "arrange-reverse",
        kind: "parsons",
        title: "Arrange: a word backwards",
        task: md`
          Put the lines in order. The program asks for a word and prints it backwards. For «chai»:

          | iahc
        `,
        solution: py`
          word = input("Word: ")
          backwards = ""
          for ch in word:
              backwards = ch + backwards
          print(backwards)
        `,
        indent: "given",
        tests: [
          { inputs: ["chai"], output: "iahc" },
          { inputs: ["a"], output: "a" },
          { inputs: ["Pune"], output: "enuP" },
          { inputs: ["madam"], output: "madam" },
        ],
        hints: [
          md`You need the word and an empty string before the loop.`,
          md`The line inside the loop adds each character to the front.`,
          md`Print once, after the loop.`,
        ],
      },
      {
        id: "spell-out",
        title: "Spell it out",
        task: md`
          Ask for a word and print each letter on its own line, in capitals. Use a «for» loop. For «cat»:

          | C
          | A
          | T
        `,
        starter: py`

        `,
        hints: [
          md`Plan: ask for the word, loop over it, and print each letter in capitals.`,
          md`Start with «word = input("Word: ")». The loop line is «for letter in word:».`,
          md`Inside the loop: «print(letter.upper())».`,
        ],
        solution: py`
          word = input("Word: ")
          for letter in word:
              print(letter.upper())
        `,
        tests: [
          { inputs: ["cat"], output: "C\nA\nT" },
          { inputs: ["Python"], output: "P\nY\nT\nH\nO\nN" },
          { inputs: ["a"], output: "A" },
          { uses: ["for"], msg: md`Use a «for» loop for this one.` },
        ],
        wrong: [py`
          word = input("Word: ")
          for letter in word:
              print(letter)
        `],
      },
      {
        id: "vowel-count",
        title: "Vowels and other letters",
        task: md`
          Ask for a sentence (letters and spaces only). Count its vowels (a, e, i, o, u — capitals count too) and its other letters. Spaces count as neither. For «Hello World»:

          | Vowels: 3
          | Others: 7
        `,
        starter: py`

        `,
        hints: [
          md`Start with «sentence = input("Sentence: ")», then two counters at 0.`,
          md`Loop over «sentence.lower()» so capitals are handled. «if ch in "aeiou":» adds 1 to the vowel counter.`,
          md`Use «elif ch != " ":» for the other letters, so spaces are skipped.`,
        ],
        solution: py`
          sentence = input("Sentence: ")
          vowels = 0
          others = 0
          for ch in sentence.lower():
              if ch in "aeiou":
                  vowels += 1
              elif ch != " ":
                  others += 1
          print("Vowels:", vowels)
          print("Others:", others)
        `,
        tests: [
          { inputs: ["Hello World"], output: "Vowels: 3\nOthers: 7" },
          { inputs: ["PYTHON is fun"], output: "Vowels: 3\nOthers: 8" },
          { inputs: ["rhythm"], output: "Vowels: 0\nOthers: 6" },
          { inputs: ["AEIOU aeiou"], output: "Vowels: 10\nOthers: 0" },
        ],
        wrong: [py`
          sentence = input("Sentence: ")
          vowels = 0
          others = 0
          for ch in sentence.lower():
              if ch in "aeiou":
                  vowels += 1
              else:
                  others += 1
          print("Vowels:", vowels)
          print("Others:", others)
        `],
      },
      {
        id: "remove-spaces",
        title: "Squash the spaces",
        task: md`
          Ask for a sentence and print it with all the spaces removed. Build the new string with a «for» loop (don't use «.replace()»). For «I love chai»:

          | Ilovechai
        `,
        starter: py`
          sentence = input("Sentence: ")
          result = ""

        `,
        hints: [
          md`Plan: go through the sentence one character at a time. Add a character to «result» only if it is not a space. Print «result» after the loop.`,
          md`The start is done: «result = ""». The loop line is «for ch in sentence:». The check goes inside it.`,
          md`Inside the loop: «if ch != " ":» then «result += ch».`,
        ],
        solution: py`
          sentence = input("Sentence: ")
          result = ""
          for ch in sentence:
              if ch != " ":
                  result += ch
          print(result)
        `,
        tests: [
          { inputs: ["I love chai"], output: "Ilovechai" },
          { inputs: ["  a b  c "], output: "abc" },
          { inputs: ["nospaces"], output: "nospaces" },
          { uses: ["for"], msg: md`Build the new text with a «for» loop.` },
          { avoids: ["method:replace"], msg: md`Please build the text with a loop, without «.replace()».` },
        ],
        wrong: [py`
          sentence = input("Sentence: ")
          result = ""
          for ch in sentence:
              if ch == " ":
                  result += ch
          print(result)
        `],
      },
      {
        id: "reverse-ready",
        title: "Backwards with reversed()",
        task: md`
          Ask for a word. Print its letters from last to first, one per line. Use the ready-made function «reversed()» in a «for» loop. («print(reversed(word))» does not show the letters.) For «chai»:

          | i
          | a
          | h
          | c
        `,
        starter: py`
          word = input("Word: ")

        `,
        solution: py`
          word = input("Word: ")
          for ch in reversed(word):
              print(ch)
        `,
        tests: [
          { inputs: ["chai"], output: "i\na\nh\nc" },
          { inputs: ["a"], output: "a" },
          { inputs: ["Delhi"], output: "i\nh\nl\ne\nD" },
          { uses: ["call:reversed"], msg: md`Use the ready-made function «reversed()» for this one.` },
        ],
        wrong: [py`
          word = input("Word: ")
          for ch in reversed(word):
              print(word)
        `, py`
          word = input("Word: ")
          print(reversed(word))
        `],
        hints: [
          md`A «for» loop can go through «reversed(word)» just like it goes through «word».`,
          md`The loop line is «for ch in reversed(word):».`,
          md`Inside the loop, «print(ch)».`,
        ],
      },
    ],
    keys: [
      md`«for ch in text:» goes through a string one character at a time.`,
      md`«ch in "aeiou"» checks whether a character is one of several.`,
      md`Build new text by starting with «""» and adding to it with «+=».`,
      md`«reversed(text)» gives the characters from last to first.`,
      md`«for i in range(len(text)):» gives you each position; «text[i]» is the character there.`,
    ],
  });

  // ---------------------------------------------------------------- Day 19
  day({
    slug: "break-continue",
    title: "break and continue",
    goal: "Leave a loop early with break, and skip a round with continue.",
    minutes: 45,
    needs: [15, 18],
    win: "Today you can now leave a loop early, skip a round, and search text.",
    learn: [
      md`
        ## Leaving a loop early: break

        «break» stops the loop at once. Python jumps to the first line after the loop. Guess first.
      `,
      ex(py`
        for n in range(1, 100):
            if n * n > 50:
                print("The first square over 50 is", n * n)
                break
        print("Loop finished")
      `, { predict: ["The first square over 50 is 64\nLoop finished", "The first square over 50 is 64", "The first square over 50 is 49\nLoop finished"], answer: 0 }),
      md`
        «while True:» loops forever, on purpose. You end it with «break» when you are ready. This is very common when a program shows choices, like 1 for tea, 2 for coffee, 3 to exit. It is also common for asking until you get a good answer.
      `,
      ex(py`
        while True:
            answer = input("Type 'stop' to finish: ")
            if answer == "stop":
                break
            print("You said:", answer)
        print("Bye!")
      `, { inputs: ["hello", "stop"] }),
      md`
        ## Skipping a round: continue

        «continue» skips the rest of this round. Python jumps straight to the next round.
      `,
      ex(py`
        for n in range(1, 7):
            if n % 3 == 0:
                continue
            print(n)
      `, { predict: ["1\n2\n4\n5", "1\n2", "3\n6"], answer: 0 }),
      warn(md`In a «while» loop, put the change line **before** «continue». If «continue» comes first, «n += 1» is skipped, and the loop never ends. See it happen:`),
      ex(py`
        n = 0
        while n < 5:
            if n == 2:
                continue
            print(n)
            n += 1
      `, { stops: true, label: "An endless loop on purpose" }),
      md`
        When «n» is 2, «continue» jumps back to the «while» line before «n += 1» runs. So «n» stays 2 forever.
      `,
      pause(md`Good place for a break. The second part is about searching.`),
      md`
        ## Searching with a flag

        «break» is useful for stopping as soon as you find what you want. Guess what this prints.
      `,
      ex(py`
        word = "banana"
        found = False
        for ch in word:
            if ch == "n":
                found = True
                break
        print("Found an n:", found)
      `, { predict: ["Found an n: True", "Found an n: False", "Found an n: 2"], answer: 0 }),
      md`
        A variable like «found» is called a **flag**. Like a flag on a pole, it is up or down: True or False. It remembers what happened inside the loop. Check it **after** the loop.

        Python also has a ready-made method for searching. «text.find(x)» gives the position of the first «x». Positions start at 0. If «x» is not there, it gives -1. Guess first.
      `,
      ex(py`
        print("banana".find("n"))
        print("banana".find("z"))
      `, { predict: ["2\n-1", "3\n-1", "2\n0"], answer: 0 }),
      tip(md`«break» and «continue» are useful. But too many of them make a loop hard to read. Use them only when they make your code simpler.`),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          for n in range(10):
              if n == 3:
                  break
              print(n)
        `,
        options: ["0\n1\n2", "0\n1\n2\n3", "3"],
        answer: 0,
        explain: md`When «n» is 3, the loop stops before printing.`,
        why: [null, md`«break» comes before «print», so 3 is never printed.`, md`The numbers before 3 are printed first.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          for n in range(5):
              if n == 2:
                  continue
              print(n)
        `,
        options: ["0\n1\n3\n4", "0\n1", "2"],
        answer: 0,
        explain: md`«continue» skips the print only when «n» is 2. The loop carries on afterwards.`,
        why: [null, md`That is what «break» would do. «continue» goes on with the next round.`, md`2 is the one number that is skipped.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          n = 0
          while True:
              n += 1
              if n == 4:
                  break
          print(n)
        `,
        options: ["3", "4", "5"],
        answer: 1,
        explain: md`The loop breaks right after «n» becomes 4.`,
        why: [md`«n» becomes 4 first, then the «if» sees 4 and breaks.`, null, md`«break» stops the loop before «n» can reach 5.`],
        skill: "trace",
      },
      {
        q: md`Ravi wants «Not found» to show only when there is no «a». What does his program print?`,
        code: py`
          word = "cat"
          for ch in word:
              if ch == "a":
                  print("Found")
                  break
              else:
                  print("Not found")
        `,
        options: ["Not found\nFound", "Found", "Not found"],
        answer: 0,
        explain: md`The «else» is inside the loop, so it runs for «c», before «a» is found. Use a flag and check it after the loop.`,
        why: [null, md`The first round looks at «c», which is not «a», so «Not found» prints first.`, md`The loop reaches «a» in the second round and prints «Found».`],
        skill: "debug",
      },
      {
        q: md`What does this program do?`,
        code: py`
          while True:
              pin = input("PIN: ")
              if pin == "4321":
                  break
              print("Wrong PIN")
          print("Welcome")
        `,
        options: ["It keeps asking for the PIN until 4321 is typed, then says Welcome", "It asks for the PIN once, then says Welcome or Wrong PIN", "It asks for the PIN 4321 times"],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`«while True» repeats until «break». «break» runs only when the PIN is right.`,
        why: [null, md`«while True» repeats; it does not stop after one question.`, md`4321 is the PIN, not a count of rounds.`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-break",
        kind: "trace",
        title: "Be the Computer: stop at 10",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          total = 0
          for n in range(1, 10):
              if total > 10:
                  break
              total += n
          print(n, total)
        `,
        inputs: [],
        ask: [{ line: 5, hit: 4, name: "total" }, { line: 5, hit: 5, name: "n" }, { output: true }],
        hints: [
          md`Each round first checks «total > 10», then adds «n».`,
          md`«total» goes 1, 3, 6, 10, ... Is 10 bigger than 10?`,
          md`The loop stops at the check after «total» passes 10. «n» keeps its value from that round.`,
        ],
      },
      {
        id: "trace-continue",
        kind: "trace",
        title: "Be the Computer: skip the p",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          count = 0
          for ch in "pani puri":
              if ch == "p":
                  continue
              count += 1
          print(count)
        `,
        inputs: [],
        ask: [{ line: 5, name: "ch" }, { line: 5, hit: 4, name: "count" }, { output: true }],
        hints: [
          md`For each «p», «continue» skips line 5.`,
          md`The space counts as a character too.`,
          md`«pani puri» has 9 characters, and 2 of them are «p».`,
        ],
      },
      {
        id: "arrange-flag",
        kind: "parsons",
        title: "Arrange: is there a z?",
        task: md`
          Put the lines in order. The program asks for a word and says whether it has a «z». For «pizza»:

          | Has z: True
        `,
        solution: py`
          word = input("Word: ")
          found = False
          for ch in word:
              if ch == "z":
                  found = True
                  break
          print("Has z:", found)
        `,
        indent: "given",
        tests: [
          { inputs: ["pizza"], output: "Has z: True" },
          { inputs: ["chai"], output: "Has z: False" },
          { inputs: ["z"], output: "Has z: True" },
          { inputs: ["lassi"], output: "Has z: False" },
        ],
        hints: [
          md`The flag starts as False, before the loop.`,
          md`When the «if» finds a «z», set the flag, then «break».`,
          md`Print the flag once, after the loop.`,
        ],
      },
      {
        id: "sum-until-zero",
        title: "Add until zero",
        task: md`
          Keep asking for whole numbers. When the user types «0», stop asking and print the total of everything they typed. For 5, 10, 3, then 0:

          | Total: 18
        `,
        starter: py`
          total = 0

        `,
        hints: [
          md`Use «while True:», ask for a number, and «break» if it's 0.`,
          md`Otherwise add it to the total. Print the total after the loop.`,
          md`Inside the loop: «n = int(input("Number: "))», then «if n == 0:» and «break», then «total += n».`,
        ],
        solution: py`
          total = 0
          while True:
              n = int(input("Number (0 to stop): "))
              if n == 0:
                  break
              total += n
          print("Total:", total)
        `,
        tests: [
          { inputs: ["5", "10", "3", "0"], output: "Total: 18" },
          { inputs: ["0"], output: "Total: 0" },
          { inputs: ["-2", "7", "0"], output: "Total: 5" },
        ],
        wrong: [py`
          total = 0
          while True:
              n = int(input("Number (0 to stop): "))
              if n == 0:
                  break
              total += n
              print("Total:", total)
        `],
      },
      {
        id: "skip-threes",
        title: "Skip the threes",
        task: md`Print the numbers from 1 to 20, one per line, but skip every multiple of 3 (3, 6, 9…). Use «continue».`,
        starter: py`

        `,
        hints: [
          md`Loop from 1 to 20 with «for» and «range()». Skip a number when it divides exactly by 3.`,
          md`«for n in range(1, 21):»`,
          md`«if n % 3 == 0:» then «continue». The «print» goes after the «if», still inside the loop.`,
        ],
        solution: py`
          for n in range(1, 21):
              if n % 3 == 0:
                  continue
              print(n)
        `,
        tests: [
          { output: [1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 20].join("\n") },
          { uses: ["continue"], msg: md`Use «continue» to skip the multiples of 3.` },
        ],
        wrong: [py`
          for n in range(1, 21):
              if n % 3 == 0:
                  break
              print(n)
        `],
      },
      {
        id: "find-letter",
        title: "Find a letter",
        task: md`
          Ask for a word, then a letter. Use a loop to find the **first** position of that letter, and print it. If it isn't there, print «Not found». For «banana» and «n»:

          | Found at position 2

          Positions start at 0. Write the search yourself with a loop. Python has a ready-made tool for this; you use it in the next exercise.
        `,
        starter: py`
          word = input("Word: ")
          letter = input("Letter: ")

        `,
        hints: [
          md`Loop over positions: «for i in range(len(word)):», and compare «word[i]» with «letter».`,
          md`When you find it, print the message and «break». To know afterwards whether you found it, use a variable like «found = False» before the loop.`,
          md`After the loop (not indented), write «if not found:» and print «Not found». Do not put an «else» inside the loop, or it prints once for every wrong letter.`,
        ],
        solution: py`
          word = input("Word: ")
          letter = input("Letter: ")
          found = False
          for i in range(len(word)):
              if word[i] == letter:
                  print(f"Found at position {i}")
                  found = True
                  break
          if not found:
              print("Not found")
        `,
        tests: [
          { inputs: ["banana", "n"], output: "Found at position 2" },
          { inputs: ["python", "z"], output: "Not found" },
          { inputs: ["hello", "h"], output: "Found at position 0" },
          { inputs: ["hello", "l"], output: "Found at position 2" },
          { avoids: ["method:find", "method:index"], msg: md`Please write the search yourself with a loop this time.` },
        ],
        wrong: [py`
          word = input("Word: ")
          letter = input("Letter: ")
          for i in range(len(word)):
              if word[i] == letter:
                  print(f"Found at position {i}")
                  break
              else:
                  print("Not found")
        `],
      },
      {
        id: "find-ready",
        title: "Search with .find()",
        task: md`
          Ask for a sentence, then a word. Use the ready-made method «.find()» to print where the word starts. If it is not there, print «Not found». For «I like masala chai» and «chai»:

          | Found at position 14
        `,
        starter: py`
          sentence = input("Sentence: ")
          word = input("Word: ")

        `,
        solution: py`
          sentence = input("Sentence: ")
          word = input("Word: ")
          place = sentence.find(word)
          if place == -1:
              print("Not found")
          else:
              print(f"Found at position {place}")
        `,
        tests: [
          { inputs: ["I like masala chai", "chai"], output: "Found at position 14" },
          { inputs: ["chai", "chai"], output: "Found at position 0" },
          { inputs: ["samosa", "dosa"], output: "Not found" },
          { inputs: ["Delhi to Pune", "Pune"], output: "Found at position 9" },
          { uses: ["method:find"], msg: md`Use the ready-made method «.find()» for this one.` },
        ],
        wrong: [py`
          sentence = input("Sentence: ")
          word = input("Word: ")
          place = sentence.find(word)
          print(f"Found at position {place}")
        `],
        hints: [
          md`Keep the answer of «.find()» in a variable. It is -1 when the word is missing.`,
          md`«place = sentence.find(word)». Then use «if» to check for -1.`,
          md`«if place == -1:» prints «Not found». The «else» prints «f"Found at position {place}"».`,
        ],
      },
    ],
    keys: [
      md`«break» leaves the loop at once.`,
      md`«continue» skips the rest of this round and starts the next one. In a «while» loop, change the variable before «continue».`,
      md`«while True:» with a «break» inside is a common way to loop until something happens.`,
      md`A **flag** like «found = False» remembers whether a search found something. Check it after the loop.`,
      md`«text.find(x)» gives the first position of «x», or -1 if it is not there.`,
    ],
  });

  // ---------------------------------------------------------------- Day 20
  day({
    slug: "nested-loops",
    title: "Loops inside loops",
    goal: "Put one loop inside another to build grids, tables and patterns.",
    minutes: 45,
    needs: [5, 16, 19],
    win: "Today you can now put a loop inside a loop to draw rows, grids and patterns.",
    learn: [
      md`
        ## Printing without a new line

        After printing, «print» normally moves to the next line. With «end=""», it stays on the same line. Whatever you put inside the quotes is printed at the end, in place of the move to the next line. «end» is a **setting**: a named value you give a function inside its brackets.
      `,
      ex(py`
        print("a", end="")
        print("b", end="")
        print("c")
        print("one", end=" ")
        print("two")
      `, { predict: ["abc\none two", "a\nb\nc\none\ntwo", "abcone two"], answer: 0 }),
      md`
        ## A loop inside a loop

        A loop can sit inside another loop. The inside one is the **inner** loop. The outside one is the **outer** loop. Guess first.
      `,
      ex(py`
        for row in range(3):
            for col in range(4):
                print("*", end="")
            print()
      `, { predict: ["****\n****\n****", "***\n***\n***\n***", "************"], answer: 0 }),
      md`
        The **inner** loop runs completely, all 4 rounds, for **each** round of the outer loop. So you get 3 rows of 4 stars.

        Look at the spaces before «print()». It lines up with the inner «for». So it is inside the outer loop, but outside the inner loop. It runs once per row and starts a new line. Press **Step through** and watch «col» go 0, 1, 2, 3, then start again.

        Here is the common mistake: «print()» one step too far right. Guess what it prints.
      `,
      ex(py`
        for row in range(2):
            for col in range(3):
                print("*", end="")
                print()
      `, { label: "A mistake: print() too far right", predict: ["*\n*\n*\n*\n*\n*", "***\n***", "******"], answer: 0 }),
      md`
        Now «print()» is inside the inner loop. So a new line starts after every star.

        «break» leaves only the loop it is in. The outer loop carries on. Guess first.
      `,
      ex(py`
        for row in range(3):
            for col in range(5):
                if col == 2:
                    break
                print("*", end="")
            print()
      `, { predict: ["**\n**\n**", "**", "***\n***\n***"], answer: 0 }),
      md`
        The inner loop can use both loop variables:
      `,
      ex(py`
        for row in range(1, 4):
            for col in range(1, 4):
                print(f"({row},{col})", end=" ")
            print()
      `),
      pause(md`Good place for a break. The second part is about rows that grow, and numbers in straight columns.`),
      md`
        ## Rows that grow, and straight columns

        The inner loop can use the outer loop's variable. Guess the shape.
      `,
      ex(py`
        for row in range(1, 5):
            for i in range(row):
                print("#", end="")
            print()
      `, { predict: ["#\n##\n###\n####", "####\n####\n####\n####", "#\n#\n#\n#"], answer: 0 }),
      md`
        In row 1, «range(row)» is «range(1)», so the inner loop runs once. Row 2 runs it twice, and so on.
      `,
      md`
        «{7:4}» inside an f-string makes the value take up 4 spaces on the screen. The part before the colon is the value. The 4 after the colon is the **width**. If the number is shorter, Python adds blank spaces on its left. The square brackets below show the blanks. Guess first.
      `,
      ex(py`
        print(f"[{7:4}]")
        print(f"[{12:4}]")
      `, { predict: ["[   7]\n[  12]", "[7   ]\n[12  ]", "[7]\n[12]"], answer: 0 }),
      md`
        So the numbers of a times grid stand in straight columns:
      `,
      ex(py`
        for a in range(1, 6):
            for b in range(1, 6):
                print(f"{a * b:4}", end="")
            print()
      `),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          for i in range(2):
              for j in range(3):
                  print("x", end="")
              print()
        `,
        options: ["xxx\nxxx", "xx\nxx\nxx", "xxxxxx"],
        answer: 0,
        explain: md`2 rows (outer loop), each with 3 x's (inner loop).`,
        why: [null, md`The outer loop makes the rows, so there are 2 rows, not 3.`, md`«print()» after the inner loop starts a new line for each row.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          count = 0
          for i in range(4):
              for j in range(5):
                  count += 1
          print(count)
        `,
        options: ["9", "20", "45"],
        answer: 1,
        explain: md`The inner line runs 5 times for each of the 4 outer rounds: 4 × 5 = 20.`,
        why: [md`The rounds multiply, not add: 5 for each of 4 rounds.`, null, md`«count» goes up by 1, not by «j».`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          print("Hi", end="!")
          print("Bye")
        `,
        options: ["Hi!Bye", "Hi!\nBye", "Hi\nBye!"],
        answer: 0,
        explain: md`The first print ends with «!» and does not move to a new line. So «Bye» comes right after it on the same line.`,
        why: [null, md`«end="!"» replaces the move to the next line, so there is no new line.`, md`The «!» belongs to the first print, not the second.`],
        skill: "trace",
      },
      {
        q: md`Meena wants two rows of «xx». What does her program print?`,
        code: py`
          for i in range(2):
              for j in range(2):
                  print("x", end="")
                  print()
        `,
        options: ["x\nx\nx\nx", "xx\nxx", "xxxx"],
        answer: 0,
        explain: md`«print()» is inside the inner loop, so a new line starts after every «x». Move it 4 spaces left.`,
        why: [null, md`That needs «print()» to line up with the inner «for».`, md`«print()» runs too, so the x's are not all on one line.`],
        skill: "debug",
      },
      {
        q: md`What does this program do?`,
        code: py`
          n = int(input("Size: "))
          for row in range(n):
              for col in range(n):
                  print("#", end="")
              print()
        `,
        options: ["It draws a square of # with n rows and n columns", "It draws one row of n # signs", "It draws a triangle of # signs"],
        answer: 0,
        explain: md`The outer loop makes «n» rows. The inner loop puts «n» signs in each row.`,
        why: [null, md`The outer loop repeats the row «n» times.`, md`The inner loop always runs «n» times, so every row is the same length.`],
        verify: false,
        mono: false,
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-nested",
        kind: "trace",
        title: "Be the Computer: rows and columns",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          count = 0
          for row in range(3):
              for col in range(2):
                  count += 1
          print(count)
        `,
        inputs: [],
        ask: [{ line: 4, hit: 3, name: "row" }, { line: 4, hit: 3, name: "col" }, { output: true }],
        hints: [
          md`For each «row», «col» goes 0, then 1.`,
          md`Line 4 runs for row 0 col 0, row 0 col 1, then row 1 col 0, ...`,
          md`3 rows times 2 columns.`,
        ],
      },
      {
        id: "trace-triangle",
        kind: "trace",
        title: "Be the Computer: a growing inner loop",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          total = 0
          for row in range(1, 4):
              for i in range(row):
                  total += row
          print(total)
        `,
        inputs: [],
        ask: [{ line: 4, hit: 3, name: "total" }, { line: 4, hit: 4, name: "i" }, { output: true }],
        hints: [
          md`Row 1 runs the inner line once. Row 2 runs it twice. Row 3 runs it three times.`,
          md`Each time, «row» is added to «total».`,
          md`«total» goes 1, then 1 + 2 + 2, then adds 3 three times.`,
        ],
      },
      {
        id: "arrange-chai-days",
        kind: "parsons",
        title: "Arrange: cups of chai",
        task: md`
          Put the lines in order. On day 1 Ravi drinks 1 cup, on day 2 two cups, on day 3 three cups. The program prints:

          | Day 1: C
          | Day 2: CC
          | Day 3: CCC
        `,
        solution: py`
          for day in range(1, 4):
              print("Day", day, end=": ")
              for cup in range(day):
                  print("C", end="")
              print()
        `,
        indent: "given",
        tests: [{ output: "Day 1: C\nDay 2: CC\nDay 3: CCC" }],
        hints: [
          md`The outer loop over days is the first line.`,
          md`Each row starts with the day label, then the cups.`,
          md`«print()» ends the row, after the inner loop.`,
        ],
      },
      {
        id: "rectangle",
        title: "Draw a rectangle",
        task: md`
          Ask for a number of rows, then a number of columns. Use **two loops, one inside the other,** to draw a rectangle of «#». For 3 rows and 5 columns:

          | #####
          | #####
          | #####
        `,
        starter: py`
          rows = int(input("Rows: "))
          cols = int(input("Columns: "))

        `,
        hints: [
          md`The two questions are already there. You need two «for» loops.`,
          md`Outer loop for rows, inner loop for columns.`,
          md`Inside the inner loop: «print("#", end="")». After the inner loop (but still in the outer one): «print()».`,
        ],
        solution: py`
          rows = int(input("Rows: "))
          cols = int(input("Columns: "))
          for r in range(rows):
              for c in range(cols):
                  print("#", end="")
              print()
        `,
        tests: [
          { inputs: ["3", "5"], output: "#####\n#####\n#####" },
          { inputs: ["1", "1"], output: "#" },
          { inputs: ["2", "4"], output: "####\n####" },
          { uses: ["nested_loop"], msg: md`Use two loops, one inside the other.` },
        ],
        wrong: [py`
          rows = int(input("Rows: "))
          cols = int(input("Columns: "))
          for r in range(rows):
              for c in range(cols):
                  print("#", end="")
                  print()
        `],
      },
      {
        id: "number-triangle",
        title: "Number triangle",
        task: md`
          Ask for a number «n» and print this pattern. For «4»:

          | 1
          | 1 2
          | 1 2 3
          | 1 2 3 4

          (A space at the end of a line doesn't matter.)
        `,
        starter: py`

        `,
        hints: [
          md`Start with «n = int(input("Rows: "))».`,
          md`The outer loop picks the row (1 to n). The inner loop prints 1 up to the row number.`,
          md`Inner: «print(i, end=" ")». After the inner loop: «print()».`,
        ],
        solution: py`
          n = int(input("Rows: "))
          for row in range(1, n + 1):
              for i in range(1, row + 1):
                  print(i, end=" ")
              print()
        `,
        tests: [
          { inputs: ["4"], output: "1\n1 2\n1 2 3\n1 2 3 4" },
          { inputs: ["1"], output: "1" },
          { inputs: ["6"], output: "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6" },
        ],
        wrong: [py`
          n = int(input("Rows: "))
          for row in range(1, n + 1):
              for i in range(1, row):
                  print(i, end=" ")
              print()
        `],
      },
      {
        id: "times-grid",
        title: "Times grid",
        task: md`
          Ask for a number of rows, then a number of columns. Print a multiplication grid. Each number takes a width of 4, as in the lesson. For 3 rows and 4 columns:

          |    1   2   3   4
          |    2   4   6   8
          |    3   6   9  12
        `,
        starter: py`
          rows = int(input("Rows: "))
          cols = int(input("Columns: "))

        `,
        hints: [
          md`The outer loop goes over the rows, from 1. The inner loop goes over the columns, from 1.`,
          md`«for a in range(1, rows + 1):» and inside it «for b in range(1, cols + 1):».`,
          md`Inner: «print(f"{a * b:4}", end="")». After it: «print()».`,
        ],
        solution: py`
          rows = int(input("Rows: "))
          cols = int(input("Columns: "))
          for a in range(1, rows + 1):
              for b in range(1, cols + 1):
                  print(f"{a * b:4}", end="")
              print()
        `,
        tests: [
          { inputs: ["3", "4"], output: grid(3, 4) },
          { inputs: ["1", "1"], output: grid(1, 1) },
          { inputs: ["5", "5"], output: grid(5, 5) },
          { inputs: ["2", "6"], output: grid(2, 6) },
          { uses: ["nested_loop"], msg: md`Use two loops, one inside the other.` },
        ],
        wrong: [py`
          rows = int(input("Rows: "))
          cols = int(input("Columns: "))
          for a in range(1, 6):
              for b in range(1, 6):
                  print(f"{a * b:4}", end="")
              print()
        `, py`
          rows = int(input("Rows: "))
          cols = int(input("Columns: "))
          for a in range(1, rows + 1):
              for b in range(1, cols + 1):
                  print(f"{a * b:3}", end="")
              print()
        `],
      },
    ],
    keys: [
      md`«print(x, end="")» prints without starting a new line.`,
      md`An inner loop runs completely for every single round of the outer loop.`,
      md`Rows × columns: the outer loop picks the row, the inner loop fills it, then «print()» ends the line. Its indent decides which loop it belongs to.`,
      md`«break» leaves only the loop it is in.`,
      md`«f"{a * b:4}"» makes the value take up 4 spaces, so the columns stand straight.`,
    ],
  });

  // ---------------------------------------------------------------- Day 21
  day({
    slug: "week-3-project",
    title: "Project day: loops",
    goal: "Use loops and decisions together to build three classic programs.",
    minutes: 45,
    kind: "project",
    needs: [15, 16, 17, 18, 19],
    win: "Today you can now build FizzBuzz, a guessing game and a prime test, and fix broken loops.",
    learn: [
      md`
        ## Week 3 in short

        - «while» repeats as long as a condition is True.
        - «for» with «range()» repeats a set number of times. «for» can also walk through a string.
        - Accumulators and counters collect answers as a loop runs.
        - «break» leaves a loop. «continue» skips a round.
        - Loops can go inside loops.

        ## Debugging loops

        A **bug** is a mistake in a program. **Debugging** means finding and fixing that mistake. Most bugs happen in loops. An **off-by-one bug** means the loop runs one time too many or one time too few. This program should add 1 to 10. Guess what it prints.
      `,
      ex(py`
        total = 0
        for n in range(1, 10):
            total += n
        print(total)
      `, { predict: ["45", "55", "10"], answer: 0 }),
      md`
        We wanted 55. «range(1, 10)» stops at 9, so 10 is never added. The fix is «range(1, 11)». When your loop does the wrong thing:

        1. Use **Step through** and watch the loop variable in the Variables panel.
        2. Check the **first** round and the **last** round carefully.
        3. Ask: does the condition become False in the end?

        **FizzBuzz** is a famous puzzle. Multiples of 3 print «Fizz», multiples of 5 print «Buzz», and multiples of both print «FizzBuzz». The number 15 passes two conditions. So check the rule with the most conditions first. Here the order is wrong:
      `,
      ex(py`
        for i in range(14, 16):
            if i % 3 == 0:
                print("Fizz")
            elif i % 3 == 0 and i % 5 == 0:
                print("FizzBuzz")
            else:
                print(i)
      `, { predict: ["14\nFizz", "14\nFizzBuzz", "14\n15"], answer: 0 }),
      md`
        15 passes the first test, so Python never reaches the «FizzBuzz» line.

        Here is a small game. Play it, then use **Step through** to watch «guess» change.
      `,
      ex(py`
        secret = 4
        guess = 0
        while guess != secret:
            guess = int(input("Guess my number (1-10): "))
            if guess != secret:
                print("No, try again!")
        print("You got it!")
      `, { inputs: ["2", "4"] }),
      pause(md`The practice today is long. Do FizzBuzz first. Take a break, then do the rest.`),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          for n in range(1, 4):
              if n == 2:
                  continue
              print(n * 10)
        `,
        options: ["10\n30", "10\n20\n30", "10"],
        answer: 0,
        explain: md`The round where «n» is 2 is skipped.`,
        why: [null, md`«continue» skips the print when «n» is 2.`, md`«continue» does not stop the loop; that would be «break».`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          text = ""
          for i in range(3):
              text += str(i)
          print(text)
        `,
        options: ["012", "3", "0 1 2"],
        answer: 0,
        explain: md`Each number is turned into text and joined on: «"0"», «"01"», «"012"».`,
        why: [null, md`«str(i)» makes text, and text is joined, not added as numbers.`, md`Joining text with «+=» adds no spaces.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          n = 5
          steps = 0
          while n != 1:
              n = n // 2
              steps += 1
          print(steps)
        `,
        options: ["2", "3", "5"],
        answer: 0,
        explain: md`5 → 2 → 1: two steps.`,
        why: [null, md`«5 // 2» is 2 and «2 // 2» is 1. Then the loop stops.`, md`«steps» counts rounds, not the starting number.`],
        skill: "trace",
      },
      {
        q: md`What is an **off-by-one bug**?`,
        options: ["A loop that runs one time too many or one time too few", "A loop that never ends", "A number that is one bigger than 100"],
        answer: 0,
        mono: false,
        explain: md`For example, «range(1, 10)» when you wanted 1 to 10 stops at 9.`,
        why: [null, md`That is an endless loop, a different bug.`, md`The bug is about the number of rounds, not the size of a number.`],
        skill: "memory",
      },
      {
        q: md`What does this program do?`,
        code: py`
          n = int(input("Number: "))
          count = 0
          for d in range(1, n + 1):
              if n % d == 0:
                  count += 1
          print(count)
        `,
        options: ["It counts how many numbers divide n exactly", "It counts from 1 to n", "It checks whether n is even"],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`«n % d == 0» is True when «d» divides «n» exactly. «count» counts those numbers.`,
        why: [null, md`«count» only grows when the «if» is True.`, md`It tries every number from 1 to «n», not only 2.`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-fizz",
        kind: "trace",
        title: "Be the Computer: Fizz and Buzz",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          for i in range(9, 13):
              if i % 3 == 0:
                  word = "Fizz"
              elif i % 5 == 0:
                  word = "Buzz"
              else:
                  word = str(i)
              print(word)
        `,
        inputs: [],
        ask: [{ line: 5, name: "word" }, { line: 3, hit: 2, name: "i" }, { output: true }],
        hints: [
          md`«i» goes 9, 10, 11, 12.`,
          md`Line 3 runs for multiples of 3. Line 5 runs for multiples of 5 that are not multiples of 3.`,
          md`9 and 12 give Fizz. 10 gives Buzz. 11 gives «11».`,
        ],
      },
      {
        id: "trace-prime",
        kind: "trace",
        title: "Be the Computer: is 15 prime?",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          n = 15
          is_prime = True
          for d in range(2, n):
              if n % d == 0:
                  is_prime = False
                  break
          print(d, is_prime)
        `,
        inputs: [],
        ask: [{ line: 3, hit: 2, name: "d" }, { line: 5, name: "is_prime" }, { output: true }],
        hints: [
          md`«d» starts at 2. Does 2 divide 15 exactly?`,
          md`The loop stops at the first «d» that divides 15.`,
          md`15 % 3 is 0, so «is_prime» becomes False and the loop breaks with «d» at 3.`,
        ],
      },
      {
        id: "arrange-divisors",
        kind: "parsons",
        title: "Arrange: find the divisors",
        task: md`
          A **divisor** of «n» is a number that divides «n» exactly. Put the lines in order. The program prints every divisor of «n» from 2 to «n - 1». For «12»:

          | 2 divides 12
          | 3 divides 12
          | 4 divides 12
          | 6 divides 12
        `,
        solution: py`
          n = int(input("Number: "))
          for d in range(2, n):
              if n % d == 0:
                  print(d, "divides", n)
        `,
        indent: "given",
        tests: [
          { inputs: ["12"], output: "2 divides 12\n3 divides 12\n4 divides 12\n6 divides 12" },
          { inputs: ["9"], output: "3 divides 9" },
          { inputs: ["15"], output: "3 divides 15\n5 divides 15" },
        ],
        hints: [
          md`You need «n» before the loop can use it.`,
          md`The «if» goes inside the loop. The «print» goes inside the «if».`,
          md`Each line has one more indent than the line above it.`,
        ],
      },
      {
        id: "fizz-stage1",
        stage: 1,
        title: "FizzBuzz stage 1: the Fizz rule",
        task: md`
          Print the numbers from 1 to «n», one per line. But for multiples of 3, print «Fizz» in place of the number. Use a «for» loop. For «5»:

          | 1
          | 2
          | Fizz
          | 4
          | 5
        `,
        starter: py`
          n = int(input("Up to: "))

        `,
        solution: py`
          n = int(input("Up to: "))
          for i in range(1, n + 1):
              if i % 3 == 0:
                  print("Fizz")
              else:
                  print(i)
        `,
        tests: [
          { inputs: ["5"], output: "1\n2\nFizz\n4\n5" },
          { inputs: ["1"], output: "1" },
          { inputs: ["7"], output: "1\n2\nFizz\n4\n5\nFizz\n7" },
        ],
        wrong: [py`
          n = int(input("Up to: "))
          for i in range(1, n):
              if i % 3 == 0:
                  print("Fizz")
              else:
                  print(i)
        `],
        hints: [
          md`Loop from 1 to «n». In each round, choose what to print.`,
          md`«for i in range(1, n + 1):», then an «if» and an «else» inside it.`,
          md`«if i % 3 == 0:» prints «Fizz». «else:» prints «i».`,
        ],
      },
      {
        id: "fizzbuzz",
        stage: 2,
        carry: "fizz-stage1",
        title: "FizzBuzz stage 2: all the rules",
        task: md`
          A famous programming puzzle. Start from your stage 1 code. Print the numbers from 1 to «n», except:

          - multiples of 3 print «Fizz»
          - multiples of 5 print «Buzz»
          - multiples of both 3 and 5 print «FizzBuzz»
          - any other number prints the number itself

          For «5»:

          | 1
          | 2
          | Fizz
          | 4
          | Buzz

          For «15», the last line is «FizzBuzz».
        `,
        starter: py`
          n = int(input("Up to: "))
          for i in range(1, n + 1):
              if i % 3 == 0:
                  print("Fizz")
              else:
                  print(i)
        `,
        hints: [
          md`Check the "both" case **first** — otherwise 15 would be caught by the "multiple of 3" check.`,
          md`Keep the loop line «for i in range(1, n + 1):». Change only the «if» part inside it.`,
          md`«if i % 15 == 0:» (or «i % 3 == 0 and i % 5 == 0»), then «elif i % 3 == 0:», «elif i % 5 == 0:», «else: print(i)».`,
        ],
        solution: py`
          n = int(input("Up to: "))
          for i in range(1, n + 1):
              if i % 3 == 0 and i % 5 == 0:
                  print("FizzBuzz")
              elif i % 3 == 0:
                  print("Fizz")
              elif i % 5 == 0:
                  print("Buzz")
              else:
                  print(i)
        `,
        tests: [
          { inputs: ["15"], output: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz" },
          { inputs: ["5"], output: "1\n2\nFizz\n4\nBuzz" },
          { inputs: ["1"], output: "1" },
        ],
        wrong: [py`
          n = int(input("Up to: "))
          for i in range(1, n + 1):
              if i % 3 == 0:
                  print("Fizz")
              elif i % 5 == 0:
                  print("Buzz")
              elif i % 3 == 0 and i % 5 == 0:
                  print("FizzBuzz")
              else:
                  print(i)
        `],
      },
      {
        id: "guessing-game",
        optional: true,
        title: "Guess the number",
        task: md`
          The secret number is 7. Keep asking «Guess: » until the user gets it. After each wrong guess, print «Too low» or «Too high». When they get it, print «Correct!» and then how many guesses they took. For guesses 5, 9, 7:

          | Too low
          | Too high
          | Correct!
          | Guesses: 3
        `,
        starter: py`
          secret = 7
          guesses = 0

        `,
        hints: [
          md`A «while True:» loop works well. Ask, add 1 to «guesses», then compare.`,
          md`Compare with «if guess < secret:» and «elif guess > secret:». The «else» part is the correct guess.`,
          md`If the guess equals the secret: print «Correct!», then «print("Guesses:", guesses)», then «break».`,
        ],
        solution: py`
          secret = 7
          guesses = 0
          while True:
              guess = int(input("Guess: "))
              guesses += 1
              if guess < secret:
                  print("Too low")
              elif guess > secret:
                  print("Too high")
              else:
                  print("Correct!")
                  print("Guesses:", guesses)
                  break
        `,
        tests: [
          { inputs: ["5", "9", "7"], output: "Too low\nToo high\nCorrect!\nGuesses: 3" },
          { inputs: ["7"], output: "Correct!\nGuesses: 1" },
          { inputs: ["1", "2", "3", "10", "7"], output: "Too low\nToo low\nToo low\nToo high\nCorrect!\nGuesses: 5" },
        ],
        wrong: [py`
          secret = 7
          guesses = 0
          while True:
              guess = int(input("Guess: "))
              if guess < secret:
                  print("Too low")
                  guesses += 1
              elif guess > secret:
                  print("Too high")
                  guesses += 1
              else:
                  print("Correct!")
                  print("Guesses:", guesses)
                  break
        `],
      },
      {
        id: "prime-check",
        title: "Prime or not?",
        task: md`
          A **prime number** is a whole number greater than 1 that divides exactly only by 1 and itself (2, 3, 5, 7, 11, …). Ask for a number and print «Prime» or «Not prime». For example:

          - For «7»: «Prime»
          - For «8»: «Not prime»
          - For «1»: «Not prime» (numbers below 2 are never prime)
        `,
        starter: py`
          n = int(input("Number: "))

        `,
        hints: [
          md`Numbers below 2 are not prime.`,
          md`Try dividing «n» by every number from 2 up to «n - 1», as in the divisors exercise. If any of them divides exactly («n % d == 0»), it's not prime.`,
          md`Use a variable like «is_prime = True» and set it to «False» (and «break») when you find a divisor. For 2, «range(2, 2)» is empty, so the loop does not run and 2 stays prime.`,
        ],
        solution: py`
          n = int(input("Number: "))
          is_prime = True
          if n < 2:
              is_prime = False
          for d in range(2, n):
              if n % d == 0:
                  is_prime = False
                  break
          if is_prime:
              print("Prime")
          else:
              print("Not prime")
        `,
        tests: [
          { inputs: ["2"], output: "Prime" },
          { inputs: ["3"], output: "Prime" },
          { inputs: ["4"], output: "Not prime" },
          { inputs: ["17"], output: "Prime" },
          { inputs: ["21"], output: "Not prime" },
          { inputs: ["1"], output: "Not prime" },
          { inputs: ["97"], output: "Prime" },
          { inputs: ["9"], output: "Not prime" },
        ],
        wrong: [py`
          n = int(input("Number: "))
          is_prime = True
          for d in range(2, n):
              if n % d == 0:
                  is_prime = False
                  break
          if is_prime:
              print("Prime")
          else:
              print("Not prime")
        `, py`
          n = int(input("Number: "))
          if n < 2:
              print("Not prime")
          for d in range(2, n):
              if n % d == 0:
                  print("Not prime")
                  break
              else:
                  print("Prime")
        `],
      },
      {
        id: "bug-sum-range",
        kind: "bug",
        title: "Bug Clinic: one round short",
        task: md`
          This program should add the whole numbers from 1 to «n». For «10» it should print «55», but it prints «45». Tap the faulty line, then fix it.
        `,
        starter: py`
          n = int(input("Add up to: "))
          total = 0
          for i in range(1, n):
              total += i
          print(total)
        `,
        bugLines: [3],
        solution: py`
          n = int(input("Add up to: "))
          total = 0
          for i in range(1, n + 1):
              total += i
          print(total)
        `,
        tests: [
          { inputs: ["10"], output: "55" },
          { inputs: ["1"], output: "1" },
          { inputs: ["100"], output: "5050" },
        ],
        wrong: [py`
          n = int(input("Add up to: "))
          total = 0
          for i in range(0, n):
              total += i
          print(total)
        `],
        hints: [
          md`This is an off-by-one bug. Check the last round: which number is added last?`,
          md`«range(1, n)» stops before «n», so «n» itself is never added.`,
          md`Make the stop number one bigger: «range(1, n + 1)».`,
        ],
      },
      {
        id: "bug-endless",
        kind: "bug",
        title: "Bug Clinic: the loop never ends",
        task: md`
          This program should ask for the password until the user types «chai», then print «Welcome!». With a wrong password, it prints «Wrong, try again» forever. Tap the faulty line, then fix it. For «tea», then «chai»:

          | Wrong, try again
          | Welcome!
        `,
        starter: py`
          secret = "chai"
          guess = input("Password: ")
          while guess != secret:
              print("Wrong, try again")
          guess = input("Password: ")
          print("Welcome!")
        `,
        bugLines: [5],
        solution: py`
          secret = "chai"
          guess = input("Password: ")
          while guess != secret:
              print("Wrong, try again")
              guess = input("Password: ")
          print("Welcome!")
        `,
        tests: [
          { inputs: ["chai"], output: "Welcome!" },
          { inputs: ["tea", "chai"], output: "Wrong, try again\nWelcome!" },
          { inputs: ["a", "b", "chai"], output: "Wrong, try again\nWrong, try again\nWelcome!" },
        ],
        wrong: [py`
          secret = "chai"
          guess = input("Password: ")
          while guess == secret:
              print("Wrong, try again")
          guess = input("Password: ")
          print("Welcome!")
        `, py`
          secret = "chai"
          guess = input("Password: ")
          if guess != secret:
              print("Wrong, try again")
              guess = input("Password: ")
          print("Welcome!")
        `],
        hints: [
          md`Ask: can the condition ever become False? What changes «guess» inside the loop?`,
          md`Line 5 asks again, but it has no indent, so it is outside the loop.`,
          md`Move line 5 four spaces to the right, so it lines up with the «print» above it.`,
        ],
      },
      {
        id: "twist",
        kind: "modify",
        carry: "fizzbuzz",
        optional: true,
        title: "Own Twist: a Boom rule",
        task: md`
          Make FizzBuzz your own. Start from your stage 2 code and add one more rule: multiples of 7 print «Boom». Put this rule **after** the Buzz rule, so 21 still prints «Fizz». For «7»:

          | 1
          | 2
          | Fizz
          | 4
          | Buzz
          | Fizz
          | Boom

          When the tests pass, you can try a rule of your own and press Run to see it.
        `,
        starter: py`
          n = int(input("Up to: "))
          for i in range(1, n + 1):
              if i % 3 == 0 and i % 5 == 0:
                  print("FizzBuzz")
              elif i % 3 == 0:
                  print("Fizz")
              elif i % 5 == 0:
                  print("Buzz")
              else:
                  print(i)
        `,
        solution: py`
          n = int(input("Up to: "))
          for i in range(1, n + 1):
              if i % 3 == 0 and i % 5 == 0:
                  print("FizzBuzz")
              elif i % 3 == 0:
                  print("Fizz")
              elif i % 5 == 0:
                  print("Buzz")
              elif i % 7 == 0:
                  print("Boom")
              else:
                  print(i)
        `,
        tests: [
          { inputs: ["7"], output: boom(7) },
          { inputs: ["1"], output: "1" },
          { inputs: ["14"], output: boom(14) },
          { inputs: ["21"], output: boom(21) },
        ],
        wrong: [py`
          n = int(input("Up to: "))
          for i in range(1, n + 1):
              if i % 7 == 0:
                  print("Boom")
              elif i % 3 == 0 and i % 5 == 0:
                  print("FizzBuzz")
              elif i % 3 == 0:
                  print("Fizz")
              elif i % 5 == 0:
                  print("Buzz")
              else:
                  print(i)
        `, py`
          n = int(input("Up to: "))
          for i in range(1, n + 1):
              if i % 3 == 0 and i % 5 == 0:
                  print("FizzBuzz")
              elif i % 3 == 0:
                  print("Fizz")
              elif i % 5 == 0:
                  print("Buzz")
              else:
                  print(i)
              if i % 7 == 0:
                  print("Boom")
        `],
        hints: [
          md`Plan: one more check in the same «if» chain, for numbers that divide exactly by 7.`,
          md`The new check goes after the «Buzz» check and before «else».`,
          md`Add «elif i % 7 == 0:» with «print("Boom")» indented under it.`,
        ],
      },
    ],
    keys: [
      md`Sometimes one number passes two conditions, like 15 in FizzBuzz. Check the rule with the most conditions first.`,
      md`A **flag** variable such as «is_prime = True» remembers what a loop found.`,
      md`An **off-by-one bug** runs a loop one time too many or too few. Check the first and last rounds carefully.`,
      md`When a loop gives a wrong answer, use **Step through** to see what it does.`,
    ],
  });
})();
