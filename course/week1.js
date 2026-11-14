// Week 1 — First steps: print, maths, variables, text, f-strings, input.
(function () {
  const { day, md, py, ex, tip, warn, ask, pause } = window.Course;

  // ---------------------------------------------------------------- Day 1
  day({
    slug: "first-program",
    title: "Your first program",
    goal: "Make Python show things on the screen with print(), and learn what a program is.",
    minutes: 40,
    win: "Today you can now write a program that shows text and numbers on the screen.",
    learn: [
      md`
        ## Guess first
        Today you meet your first Python code. Before each example runs, you guess what it shows. You are not expected to know yet. Guessing first helps you remember.

        Tap your guess. Then press the blue **Run** button to check.
      `,
      ex(py`print("Namaste")`, { predict: ["Namaste", '"Namaste"', 'print("Namaste")'], answer: 0 }),
      md`
        The words inside the quote marks appeared on the screen. The quote marks did not. Now guess this one.
      `,
      ex(py`print(2 + 3)`, { predict: ["5", "2 + 3", "23"], answer: 0 }),
      md`
        Python did the sum. One more guess. This program has two lines.
      `,
      ex(py`
        print("Chai")
        print("Samosa")
      `, { predict: ["Chai\nSamosa", "Chai Samosa", "Samosa\nChai"], answer: 0 }),
      md`
        ## What is programming?
        A computer is very fast, but it cannot think for itself. It does only what you tell it. **Programming** means writing these instructions in a language the computer understands.

        **Python** is one of these languages. It is popular because it reads almost like English. A set of instructions in Python is called a **program**, or **code**.

        ## Your first instruction: print
        The «print» instruction tells Python to show something on the screen. What Python shows is called **output**. It appears in the box under the code.
      `,
      ex(py`print("Hello, world!")`),
      md`
        Click inside the code above. Change the words between the quote marks to your own name. Then press **Run** again. Nothing bad can happen here. Change things and try again.

        ## The rules of print
        Look closely at that line:

        - «print» is written in small letters. Python is **case-sensitive**. This means small letters and capital letters are different to it. So «Print» or «PRINT» does not work.
        - The round brackets «( )» hold the thing you want to show.
        - Text goes inside quote marks «" "». A piece of text in Python is called a **string**.
        - A **character** is one letter, digit, space or symbol. «Hi!» has 3 characters.
      `,
      tip(md`You can use double quotes «"hello"» or single quotes «'hello'». Both work. Start and end with the same kind.`),
      md`
        ## One line at a time
        Python runs your program **from top to bottom**, one line at a time. Each «print» starts on a new line.
      `,
      ex(py`
        print("Good morning!")
        print("I am learning Python.")
        print("Day 1 of 40.")
      `),
      md`
        Now press **Step through** on the example above. It shows Python running your program slowly. The red arrow ➜ points at the line Python will run **next**. Press **Next** to run that line. You will use this a lot.

        ## Numbers
        Numbers do not need quotes. Python can do maths inside «print». Guess all three lines.
      `,
      ex(py`
        print(7)
        print(2 + 3)
        print("2 + 3")
      `, { predict: ["7\n5\n2 + 3", "7\n5\n5", "7\n2 + 3\n2 + 3"], answer: 0 }),
      md`
        «2 + 3» without quotes is maths, so Python shows «5». «"2 + 3"» with quotes is text, so Python shows it exactly as written.

        ## Mistakes are normal
        Everyone makes mistakes when they write code, even experts. When Python cannot understand a line, it stops and shows an **error**. Run this program. It has a mistake in it.
      `,
      ex(py`print("Hello)`, { error: true }),
      md`
        The text starts with a quote mark, but it never ends with one. This page explains every error in plain English. It also marks the problem line in red. Add the missing «"» just before the closing bracket. Then run it again.

        ## Comments
        A line that starts with «#» is a **comment**. Python skips it. Comments are notes for people. You can also put «#» in front of a line to stop it from running for some time. Guess the output.
      `,
      ex(py`
        # This line is a comment. Python skips it.
        print("This line runs.")
        # print("This line does not run.")
      `, { predict: ["This line runs.", "This line runs.\nThis line does not run.", "# This line is a comment. Python skips it.\nThis line runs."], answer: 0 }),
      md`
        ## Empty lines
        «print()» with nothing inside shows an empty line. It is useful for putting a gap between lines.
      `,
      ex(py`
        print("Line one")
        print()
        print("Line three")
      `),
      md`
        ## How your exercises are checked
        Each exercise has a check button. When you press it, the page runs your code. Then it compares what your code prints with the correct answer. Spaces, capital letters and full stops all matter.
      `,
      tip(md`**A special key.** To type «|», hold **Shift** and press the «\» key. On most laptops this key is just above **Enter**. On a phone, look on the symbols page of the keyboard.`),
    ],
    quiz: [
      {
        q: md`What does this program show?`,
        code: py`print("Good night")`,
        options: ["Good night", '"Good night"', 'print("Good night")'],
        answer: 0,
        explain: md`The quote marks tell Python where the text starts and ends. They are not shown.`,
        why: [null, md`The quote marks are not shown. They only mark the start and end of the text.`, md`Python runs the «print» instruction. It does not show the instruction itself.`],
        skill: "trace",
      },
      {
        q: md`Which line is written correctly?`,
        options: ['«print(Hello)»', '«Print("Hello")»', '«print("Hello")»', '«print "Hello"»'],
        answer: 2,
        why: [
          md`Text needs quote marks. Without them, Python does not know that Hello is text.`,
          md`Python is case-sensitive: «Print» with a capital P does not exist.`,
          null,
          md`«print» always needs round brackets.`,
        ],
        explain: md`Small «print», round brackets, and quote marks around the text.`,
        skill: "debug",
      },
      {
        q: md`What does this program show?`,
        code: py`
          # print("A")
          print("B")
          print("C")
        `,
        options: ["A\nB\nC", "B\nC", "A"],
        answer: 1,
        explain: md`The first line starts with «#», so it is a comment and Python skips it.`,
        why: [md`The first line starts with «#». Python skips it, so «A» is never shown.`, null, md`Only the comment line has «A», and Python skips comments.`],
        skill: "trace",
      },
      {
        q: md`What does this program show?`,
        code: py`
          print("Tea")
          print()
          print("Toast")
        `,
        options: ["Tea\n\nToast", "Tea\nToast", "Tea\n()\nToast"],
        answer: 0,
        explain: md`«print()» with nothing inside shows an empty line between the two words.`,
        why: [null, md`The middle line is not skipped. «print()» shows an empty line.`, md`The brackets are not shown. «print()» shows an empty line.`],
        skill: "trace",
      },
      {
        q: md`What does this program do?`,
        code: py`
          print("Chai: 10 rupees")
          print("Samosa: 15 rupees")
        `,
        options: ["It shows a small price list on two lines", "It adds the two prices together", "It shows both prices on one line"],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`Each «print» shows one line of text. Nothing is added, because the numbers are inside quote marks.`,
        why: [null, md`The numbers are inside quote marks, so they are text. Python does no maths here.`, md`Each «print» starts a new line, so there are two lines.`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "two-lines",
        kind: "parsons",
        title: "Arrange: two lines",
        task: md`
          Tap the lines into the right order. The program must show:

          | Namaste
          | Day 1 of 40
        `,
        solution: py`
          print("Namaste")
          print("Day 1 of 40")
        `,
        indent: "given",
        tests: [{ output: "Namaste\nDay 1 of 40" }],
        hints: [
          md`Python runs the lines from top to bottom.`,
          md`The line that shows «Namaste» must run first.`,
          md`Put «print("Namaste")» at the top.`,
        ],
      },
      {
        id: "hello",
        title: "Say hello to the world",
        task: md`
          Write a program that shows exactly this:

          | Hello, world!

          Check the details: a capital H, a comma, a space, and an exclamation mark at the end.
        `,
        starter: py`
          # Write your code below this line

        `,
        hints: [
          md`You need one «print» instruction.`,
          md`Text goes inside quote marks, inside the brackets: «print("...")».`,
          md`Start with «print("Hello, ...")». Finish the text inside the quotes. Check the comma, the space and the «!».`,
        ],
        solution: py`print("Hello, world!")`,
        tests: [{ output: "Hello, world!" }],
        wrong: ['print("hello world!")'],
      },
      {
        id: "three-lines",
        title: "Three lines",
        task: md`
          Make Python show these three lines, exactly:

          | I am learning Python.
          | Day 1 of 40.
          | Let's go!

          Be careful with the last line. It has an apostrophe «'».
        `,
        starter: py`
          # Three lines means three print instructions

        `,
        hints: [
          md`Use one «print» for each line. Three lines need three «print» instructions.`,
          md`For «Let's go!», put **double** quotes around the text: «"Let's go!"». With single quotes, Python thinks the apostrophe ends the text.`,
          md`The last line is «print("Let's go!")». Write the first two lines the same way, with their full stops.`,
        ],
        solution: py`
          print("I am learning Python.")
          print("Day 1 of 40.")
          print("Let's go!")
        `,
        tests: [{ output: "I am learning Python.\nDay 1 of 40.\nLet's go!" }],
        wrong: [py`
          print("I am learning Python.")
          print("Day 1 of 40.")
          print("Lets go!")
        `],
      },
      {
        id: "tree",
        title: "Draw a tree",
        task: md`
          Programs can draw pictures with characters. Make Python draw this little tree:

          |    *
          |   ***
          |  *****
          | *******
          |    |

          Type the spaces at the start of each line too. The spaces move the stars to the middle. For the trunk, hold **Shift** and press the «\» key, just above **Enter**.
        `,
        starter: py`
          print("   *")

        `,
        hints: [
          md`Each line of the picture is its own «print». The first one is done for you.`,
          md`Count the spaces: the lines start with 3, 2, 1, 0 and 3 spaces. Put the spaces **inside** the quotes: «print("  ***")».`,
          md`The last line is the trunk: «print("   |")», with 3 spaces before the «|».`,
        ],
        solution: py`
          print("   *")
          print("  ***")
          print(" *****")
          print("*******")
          print("   |")
        `,
        tests: [{ output: "   *\n  ***\n *****\n*******\n   |" }],
        wrong: [py`
          print("*")
          print("***")
          print("*****")
          print("*******")
          print("|")
        `],
      },
    ],
    keys: [
      md`«print("text")» shows text on the screen. Text goes inside quote marks.`,
      md`A piece of text is called a **string**. A character is one letter, digit, space or symbol.`,
      md`Python runs your code from top to bottom, one line at a time.`,
      md`Python is case-sensitive: «print» works, «Print» does not.`,
      md`Numbers do not need quotes: «print(2 + 3)» shows «5».`,
      md`Lines starting with «#» are comments. Python skips them.`,
    ],
  });

  // ---------------------------------------------------------------- Day 2
  day({
    slug: "numbers-and-maths",
    title: "Numbers and maths",
    goal: "Use Python as a calculator, and learn the two kinds of numbers.",
    minutes: 40,
    win: "Today you can now make Python do sums, share things out and find what is left over.",
    learn: [
      md`
        ## Python as a calculator
        Python can do maths for you. Symbols like «+» and «*» are called **operators**. Guess what this shows, then run it.
      `,
      ex(py`
        print(10 + 5)
        print(10 - 5)
        print(10 * 5)
        print(10 / 5)
      `, { predict: ["15\n5\n50\n2.0", "15\n5\n50\n2", "15\n5\n105\n2.0"], answer: 0 }),
      md`
        - «+» adds and «-» subtracts.
        - «*» (the star) multiplies. Python does not use «x» or «×».
        - «/» divides.

        «10 / 5» gave «2.0», not «2». Dividing with «/» **always** gives a decimal number.

        ## Two kinds of numbers
        Python has two main kinds of numbers:

        - **Integers** («int»): whole numbers like «7», «-3» or «2026».
        - **Floats** («float»): numbers with a decimal point, like «2.0», «3.14» or «-0.5».

        Most of the time Python handles both for you.

        ## Sharing and what is left over
        17 laddoos are shared equally between 5 friends. Each friend gets 3, and 2 are left over. Python can work out both parts. Guess first.
      `,
      ex(py`
        print(17 / 5)
        print(17 // 5)
        print(17 % 5)
      `, { predict: ["3.4\n3\n2", "3.4\n3.4\n2", "3\n3\n2"], answer: 0 }),
      md`
        - «//» is **floor division**. Floor means "round down". It divides, then rounds down to a whole number. Each friend gets «3».
        - «%» gives the **remainder**: what is left over («2»). It is also called modulo.

        The remainder is more useful than you may think. «8 % 2» is «0», so 8 is even. «7 % 2» is «1», so 7 is odd.
      `,
      tip(md`«//» always rounds **down**. With negative numbers this surprises people: «-7 // 2» is «-4», not «-3».`),
      md`
        ## Which part is worked out first?
        Python follows the same order as school maths (BODMAS). Brackets come first. Then «*», «/», «//» and «%». Then «+» and «-».

        When two operators are at the same level, Python goes from **left to right**. Guess this one carefully.
      `,
      ex(py`
        print(2 + 3 * 4)
        print((2 + 3) * 4)
        print(20 - 5 + 3)
      `, { predict: ["14\n20\n18", "20\n20\n18", "14\n20\n12"], answer: 0 }),
      md`
        «20 - 5 + 3» is «18». Python does «20 - 5» first, because it is on the left. Some students learn "addition before subtraction" from BODMAS. Python does not work that way. «+» and «-» are at the same level.

        ## Showing words and numbers together
        «print» can show several things at once. Put a comma between them. Python puts a space between each one.
      `,
      ex(py`
        print("Minutes in a day:", 24 * 60)
        print("Half of 9 is", 9 / 2)
      `, { predict: ["Minutes in a day: 1440\nHalf of 9 is 4.5", "Minutes in a day:1440\nHalf of 9 is4.5", "Minutes in a day: 24 * 60\nHalf of 9 is 9 / 2"], answer: 0 }),
      tip(md`Spaces around «+» and «*» do not matter to Python: «2+3» and «2 + 3» are the same. The spaces make code easier for people to read.`),
      md`
        ## Extra: powers (you can skip this)
        «**» means "to the power of". «2 ** 3» means 2 × 2 × 2. You do not need it this week. Powers are worked out before «*» and «/».
      `,
      ex(py`
        print(2 ** 3)
        print(10 ** 6)
        print(5 ** 2)
      `, { predict: ["8\n1000000\n25", "6\n60\n10", "8\n60\n25"], answer: 0 }),
      md`«2 ** 3» is not 2 × 3. It is 2 × 2 × 2, which is 8. «10 ** 6» is 1 with 6 zeros.`,
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`print(7 // 2)`,
        options: ["3.5", "3", "1"],
        answer: 1,
        explain: md`«//» divides and rounds down: 7 ÷ 2 is 3.5, so you get «3».`,
        why: [md`That is «7 / 2». «//» rounds down to a whole number.`, null, md`That is the remainder, «7 % 2».`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`print(7 % 2)`,
        options: ["3", "1", "0"],
        answer: 1,
        explain: md`7 divided by 2 is 3, with «1» left over. «%» gives the leftover.`,
        why: [md`That is «7 // 2». «%» gives what is left over.`, null, md`7 is odd, so 1 is left over, not 0.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`print(2 + 3 * 2)`,
        options: ["10", "8", "12"],
        answer: 1,
        explain: md`Multiplication happens first: 3 × 2 = 6, then 2 + 6 = «8».`,
        why: [md`That adds first. Python multiplies before it adds.`, null, md`Check the sum again: 3 × 2 is 6, and 2 + 6 is 8.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`print(8 / 2)`,
        options: ["4", "4.0", "8/2"],
        answer: 1,
        explain: md`Division with «/» always gives a float (a decimal number), even when the answer is whole.`,
        why: [md`«/» always gives a decimal number, so you see «4.0».`, null, md`There are no quote marks, so Python does the maths.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`print(30 - 10 + 5)`,
        options: ["25", "15", "35"],
        answer: 0,
        explain: md`«-» and «+» are at the same level, so Python goes left to right: 30 - 10 is 20, then 20 + 5 is «25».`,
        why: [null, md`That does the adding first (10 + 5). Python goes from left to right instead.`, md`Check the signs: 10 is taken away, not added.`],
        skill: "trace",
      },
      {
        q: md`What does this program do?`,
        code: py`
          print("Each gets:", 50 // 8)
          print("Left over:", 50 % 8)
        `,
        options: [
          "It shares 50 things between 8 people, and shows each share and what is left",
          "It divides 50 by 8 and shows the decimal answer",
          "It multiplies 50 by 8",
        ],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`«//» gives the whole share (6). «%» gives what is left over (2).`,
        why: [null, md`«//» rounds down to a whole number. A decimal answer needs «/».`, md`«//» and «%» divide. «*» multiplies.`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "arrange-receipt",
        kind: "parsons",
        title: "Arrange: a snack bill",
        task: md`
          Tap the lines into order. The program must show:

          | Samosas: 60
          | Chai: 30
          | Total: 90
        `,
        solution: py`
          print("Samosas:", 4 * 15)
          print("Chai:", 3 * 10)
          print("Total:", 4 * 15 + 3 * 10)
        `,
        indent: "given",
        tests: [{ output: "Samosas: 60\nChai: 30\nTotal: 90" }],
        hints: [
          md`Each «print» shows one line, in order from top to bottom.`,
          md`Look at the first word of each line in the output.`,
          md`The «Samosas» line goes first and the «Total» line goes last.`,
        ],
      },
      {
        id: "minutes-in-week",
        title: "Minutes in a week",
        task: md`
          How many minutes are there in a week? Do not work it out yourself. Make Python calculate «7 * 24 * 60» and print the answer.
        `,
        starter: py`
          # 7 days, 24 hours in each day, 60 minutes in each hour

        `,
        hints: [
          md`Python can do the sum for you. You do not need to know the answer.`,
          md`Put the calculation inside «print( )». Use «*» to multiply.`,
          md`«print(7 * 24 * 60)»`,
        ],
        solution: py`print(7 * 24 * 60)`,
        tests: [{ output: "10080" }, { uses: ["op:*"], msg: md`Let Python do the maths: use «*» to multiply.` }],
        wrong: ["print(10080)"],
      },
      {
        id: "share-sweets",
        title: "Sharing sweets",
        task: md`
          47 sweets are shared equally between 6 children. Print how many each child gets and how many are left over, like this:

          | Each child gets: 7
          | Left over: 5

          Use «//» and «%» so Python does the maths.
        `,
        starter: py`
          # 47 sweets, 6 children

        `,
        hints: [
          md`«47 // 6» gives the whole number each child gets. «47 % 6» gives what is left over.`,
          md`Show text and a number together with a comma: «print("Left over:", 47 % 6)».`,
          md`The first line is «print("Each child gets:", 47 // 6)». The second line is in hint 2.`,
        ],
        solution: py`
          print("Each child gets:", 47 // 6)
          print("Left over:", 47 % 6)
        `,
        tests: [
          { output: "Each child gets: 7\nLeft over: 5" },
          { uses: ["op://"], msg: md`Use «//» to work out how many each child gets.` },
          { uses: ["op:%"], msg: md`Use «%» to work out how many are left over.` },
        ],
        wrong: [py`
          print("Each child gets:", 47 / 6)
          print("Left over:", 47 % 6)
        `],
      },
      {
        id: "room",
        title: "Measuring a room",
        task: md`
          A room is 12 metres long and 8 metres wide. Print its **area** (length × width) and its **perimeter** (the distance all the way round: 2 × (length + width)):

          | Area: 96
          | Perimeter: 40
        `,
        starter: py`
          # length 12, width 8

        `,
        hints: [
          md`Area is length × width. Perimeter is 2 × (length + width). Use «*» for ×.`,
          md`Perimeter needs brackets so the adding happens first: «2 * (12 + 8)». Without them, Python multiplies first.`,
          md`«print("Area:", 12 * 8)», then «print("Perimeter:", 2 * (12 + 8))».`,
        ],
        solution: py`
          print("Area:", 12 * 8)
          print("Perimeter:", 2 * (12 + 8))
        `,
        tests: [
          { output: "Area: 96\nPerimeter: 40" },
          { uses: ["op:*"], msg: md`Let Python calculate the answers with «*».` },
          { uses: ["op:+"], msg: md`For the perimeter, add the length and the width with «+», inside brackets.` },
        ],
        wrong: [
          'print("Area: 96")\nprint("Perimeter: 40")',
          'print("Area:", 12 * 8)\nprint("Perimeter:", 2 * 20)',
          'print("Area:", 12 * 8)\nprint("Perimeter:", 2 * 12 + 8)',
        ],
      },
    ],
    keys: [
      md`«+ - * /» add, subtract, multiply and divide. «/» always gives a decimal: «10 / 5» is «2.0».`,
      md`«//» divides and rounds down; «%» gives only the remainder.`,
      md`Brackets first, then «* / // %», then «+ -». Operators at the same level go from left to right.`,
      md`Whole numbers are «int»; decimal numbers are «float».`,
      md`«print("Total:", 5 * 20)» shows several things with a space between them.`,
      md`«**» is "to the power of": «2 ** 3» is «8».`,
    ],
  });

  // ---------------------------------------------------------------- Day 3
  day({
    slug: "variables",
    title: "Variables: giving names to values",
    goal: "Store values under names so your program can remember and reuse them.",
    minutes: 45,
    win: "Today you can now store values in variables and update them step by step.",
    learn: [
      md`
        ## A name for a value
        A **value** is one piece of information, like the number 25 or the text "Jaipur". A **variable** is a name that holds a value. Picture a label with a name on it, tied to a value. Guess what this shows.
      `,
      ex(py`
        age = 25
        print(age)
        print(age + 1)
      `, { predict: ["25\n26", "age\nage + 1", "25\n25"], answer: 0 }),
      md`
        The «=» sign means **"store the value on the right in the name on the left"**. It does not mean "equals" like in maths. Read «age = 25» as "age **becomes** 25".

        After that, you use the name (without quotes) to get the value back. Compare these two lines:
      `,
      ex(py`
        city = "Jaipur"
        print(city)
        print("city")
      `, { predict: ["Jaipur\ncity", "city\nJaipur", "Jaipur\nJaipur"], answer: 0 }),
      md`
        Without quotes, «city» is the variable, so Python shows what is inside it. With quotes, «"city"» is just the word city.

        ## Variables can change
        A variable keeps only its **latest** value. Press **Step through** and watch the **Variables** panel as each line runs:
      `,
      ex(py`
        score = 10
        print(score)
        score = 50
        print(score)
      `, { predict: ["10\n50", "50\n50", "10\n10"], answer: 0 }),
      md`Line 2 shows 10, because «score» is 10 at that moment. Line 3 puts 50 in «score», and the 10 is gone.`,
      md`
        ## Variables make calculations clear
        Names make code easier to read and easier to change. If the price goes up, you change one line.
      `,
      ex(py`
        price = 40
        quantity = 3
        total = price * quantity
        print("Total:", total)
      `, { predict: ["Total: 120", "Total: price * quantity", "Total: 43"], answer: 0 }),
      pause(md`You have learned what a variable is. Take a short break here if you need one.`),
      md`
        ## Updating a variable using its own value
        Look at «coins = coins + 20». In school maths this line makes no sense. In Python it does. Python always works out the **right side first**. Then it stores the answer in the name on the left. Guess first.
      `,
      ex(py`
        coins = 100
        coins = coins + 20
        print(coins)
      `, { predict: ["120", "100", "20"], answer: 0 }),
      md`
        Line 2 reads the old value, 100. It adds 20 and gets 120. Then «coins» becomes 120. In the next example this happens twice. Press **Step through** and watch «runs» change in the **Variables** panel.
      `,
      ex(py`
        runs = 0
        runs = runs + 4
        runs = runs + 6
        print("Runs:", runs)
      `, { predict: ["Runs: 10", "Runs: 6", "Runs: 0"], answer: 0 }),
      md`
        ## A shortcut: += and -=
        This kind of update is very common, so Python has a shortcut. «coins += 20» means «coins = coins + 20». «lives -= 1» means «lives = lives - 1».
      `,
      ex(py`
        lives = 3
        lives -= 1
        print("Lives left:", lives)
      `, { predict: ["Lives left: 2", "Lives left: 3", "Lives left: -1"], answer: 0 }),
      ask({
        q: md`What does «total += 5» do?`,
        options: ["It adds 5 to the value in total", "It makes total equal to 5", "It prints total and 5"],
        answer: 0,
        explain: md`«total += 5» is a short way to write «total = total + 5».`,
        why: [null, md`That would be «total = 5». The «+» means the old value is kept and 5 is added.`, md`Nothing is printed on that line.`],
      }),
      md`
        ## Naming rules
        - Names can use letters, digits and the underscore «_». They cannot have spaces.
        - A name cannot start with a digit: «player2» is fine, «2player» is not.
        - Capital letters matter: «age», «Age» and «AGE» are three different variables.
        - Choose clear names: «total_price» is much better than «tp». Python programmers usually write small letters, with «_» between words.
        - Do not use Python's special words, like «if» and «for», as names. You will learn them later. Python shows an error if you use them as names.
        - Do not use Python's ready-made names, like «print», either. If you write «print = 5», the real «print» stops working in that program.

        ## Using a name that does not exist
        If you use a name Python has not seen yet, or spell one wrong, you get a **NameError**. Guess what happens.
      `,
      ex(py`
        price = 10
        print(prise)
      `, { error: true, predict: ["NameError", "10", "prise"], answer: 0 }),
      md`Python even guesses what you meant. Fix the spelling and run it again.`,
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          x = 5
          x = x + 2
          print(x)
        `,
        options: ["5", "7", "x + 2"],
        answer: 1,
        explain: md`The right side is worked out first (5 + 2 = 7), then stored back in «x».`,
        why: [md`Line 2 changes «x». A variable keeps only its latest value.`, null, md`Without quotes, «x + 2» is maths, not text.`],
        skill: "trace",
      },
      {
        q: md`Be careful. What does this show?`,
        code: py`
          a = 3
          b = a
          a = 10
          print(b)
        `,
        options: ["3", "10", "a"],
        answer: 0,
        explain: md`When line 2 ran, «b» was given the value 3. Changing «a» later does not change «b». To check, copy the code into the **Playground** page and press **Step through**. Open the Playground from the menu at the top.`,
        why: [null, md`«b» got the value 3 on line 2. Line 3 changes only «a».`, md`«b = a» copies the value of «a», not the letter a.`],
        skill: "trace",
      },
      {
        q: md`Which of these is a correct variable name?`,
        options: ["«2nd_place»", "«my score»", "«total_price»", "«price-tag»"],
        answer: 2,
        why: [
          md`Names cannot start with a digit.`,
          md`Names cannot contain spaces.`,
          null,
          md`The «-» would be read as a minus sign.`,
        ],
        explain: md`Letters, digits (not at the start) and underscores are all fine.`,
        skill: "memory",
      },
      {
        q: md`What does this show?`,
        code: py`
          city = "Pune"
          print("city")
        `,
        options: ["Pune", "city"],
        answer: 1,
        explain: md`The quotes make «"city"» plain text, so Python shows the word itself, not the variable.`,
        why: [md`The quote marks make it text. Without quotes, Python would show the value.`, null],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          marks = 40
          marks += 5
          marks -= 10
          print(marks)
        `,
        options: ["35", "45", "40"],
        answer: 0,
        explain: md`40 + 5 is 45. Then 45 - 10 is «35».`,
        why: [null, md`That stops after line 2. Line 3 takes away 10.`, md`«+=» and «-=» change the value. They do not leave it as it was.`],
        skill: "trace",
      },
      {
        q: md`What does this program do?`,
        code: py`
          price = 20
          plates = 3
          bill = price * plates
          print("Bill:", bill)
        `,
        options: [
          "It works out the cost of 3 plates at 20 rupees each, and shows it",
          "It adds 20 and 3",
          "It prints the word bill three times",
        ],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`«bill» becomes 20 × 3, which is 60. The program shows «Bill: 60».`,
        why: [null, md`«*» multiplies. It does not add.`, md`«bill» is a variable without quotes, so its value (60) is shown.`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-wallet",
        kind: "trace",
        title: "Be the Computer: a wallet",
        task: md`Read the program. Do not run it. Type what «wallet» holds after each marked line, then what the program prints.`,
        code: py`
          wallet = 50
          wallet = wallet + 20
          wallet -= 15
          print("Wallet:", wallet)
        `,
        inputs: [],
        ask: [{ line: 2, name: "wallet" }, { line: 3, name: "wallet" }, { output: true }],
        hints: [
          md`Write «wallet» on paper. Start it at 50.`,
          md`Line 2 works out the right side first, then stores the answer in «wallet».`,
          md`After line 2, «wallet» is 70. Line 3 takes away 15.`,
        ],
      },
      {
        id: "arrange-bill",
        kind: "parsons",
        title: "Arrange: a chai bill",
        task: md`
          Tap the lines into order so the program prints:

          | Total: 36
        `,
        solution: py`
          price = 12
          cups = 3
          total = price * cups
          print("Total:", total)
        `,
        indent: "given",
        tests: [{ output: "Total: 36" }],
        hints: [
          md`A name needs a value before you use it.`,
          md`«price» and «cups» come first. «total» uses both of them.`,
          md`«print» is the last line.`,
        ],
      },
      {
        id: "chai-bill",
        title: "The chai bill",
        task: md`
          A cup of chai costs ₹15 and you buy 4 cups. Create three variables:

          - «price» holding 15
          - «cups» holding 4
          - «total» holding the price times the number of cups (let Python calculate it)

          Then print:

          | Total: 60
        `,
        starter: py`
          price = 15

        `,
        hints: [
          md`You need two more variables, «cups» and «total», then one «print» line.`,
          md`Create «cups» the same way as «price», on the next line: «cups = 4».`,
          md`«total = price * cups». Then «print("Total:", total)».`,
        ],
        solution: py`
          price = 15
          cups = 4
          total = price * cups
          print("Total:", total)
        `,
        tests: [
          {
            output: "Total: 60",
            py: py`
              need("price"); need("cups"); need("total")
              assert price == 15, "«price» should be 15."
              assert cups == 4, "«cups» should be 4."
              assert total == 60, "«total» should be 60."
            `,
          },
          { uses: ["op:*"], msg: md`Let Python calculate the total with «price * cups».` },
        ],
        wrong: [py`
          price = 15
          cups = 4
          total = 60
          print("Total:", total)
        `],
      },
      {
        id: "piggy-bank",
        title: "The piggy bank",
        task: md`
          Your piggy bank starts with ₹500. Then:

          1. You add ₹250.
          2. You spend ₹120.

          Create «savings = 500». Then update it **step by step**, one line for each change. Use «+» (or «+=») to add and «-» (or «-=») to take away. Finally print:

          | Savings: 630
        `,
        starter: py`
          savings = 500

        `,
        hints: [
          md`Change «savings» two times: once to add ₹250, once to take away ₹120. Then print it.`,
          md`Adding: «savings = savings + 250» (or the shortcut «savings += 250»).`,
          md`Spending is taking away: «savings -= 120». Then print with «print("Savings:", savings)».`,
        ],
        solution: py`
          savings = 500
          savings += 250
          savings -= 120
          print("Savings:", savings)
        `,
        tests: [
          {
            output: "Savings: 630",
            py: py`
              assert savings == 630, "«savings» should end up as 630."
              assert assigned("savings") >= 3, "Update «savings» step by step: start at 500, then add 250, then take away 120. Use three separate lines."
            `,
          },
          { uses: ["op:+", "op:-"], msg: md`Let Python do the maths. Add 250 with «+=» (or «+») and take away 120 with «-=» (or «-»).` },
        ],
        wrong: [
          'savings = 630\nprint("Savings:", savings)',
          py`
            savings = 500
            savings = 750
            savings = 630
            print("Savings:", savings)
          `,
        ],
      },
      {
        id: "fix-names",
        title: "Fix the broken names",
        task: md`
          This program is broken. Its variable names break Python's naming rules. Press **Run** to see the error. Then fix the **names** (keep the values) so the program prints:

          | Ravi lives in Pune

          Python shows only one error at a time. Fix the first one, run again, and then fix the next one. A space inside a name gives the error "invalid syntax". A digit at the start of a name gives the error "invalid decimal literal".
        `,
        starter: py`
          first name = "Ravi"
          1st_city = "Pune"
          print(first name, "lives in", 1st_city)
        `,
        hints: [
          md`Names cannot contain spaces. Join the words with an underscore: «first_name».`,
          md`Names cannot start with a digit. Change «1st_city» to «city».`,
          md`Use the same new names in the «print» line too.`,
        ],
        solution: py`
          first_name = "Ravi"
          city = "Pune"
          print(first_name, "lives in", city)
        `,
        tests: [
          {
            output: "Ravi lives in Pune",
            py: py`
              texts = [v for k, v in dict(globals()).items() if isinstance(v, str) and not k.isupper()]
              assert "Ravi" in texts and "Pune" in texts, "Keep the two variables. Fix only their names."
              assert CODE.count("Ravi") == 1 and CODE.count("Pune") == 1, "In the «print» line, use the two variable names. Do not type Ravi or Pune again."
            `,
          },
        ],
        wrong: [
          'print("Ravi lives in Pune")',
          'first_name = "Ravi"\ncity = "Pune"\nprint("Ravi lives in Pune")',
        ],
      },
    ],
    keys: [
      md`«name = value» stores a value in a variable. Read «=» as "becomes".`,
      md`Use the name without quotes to get the value: «print(age)».`,
      md`A variable keeps only its latest value.`,
      md`«x = x + 1» works out the right side first. The shortcut is «x += 1». «x -= 1» takes 1 away.`,
      md`Names: letters, digits and «_», no spaces, cannot start with a digit. Capitals matter.`,
      md`Using a name before creating it gives a «NameError».`,
    ],
  });

  // ---------------------------------------------------------------- Day 4
  day({
    slug: "strings",
    title: "Working with text",
    goal: "Join, repeat and measure strings, and learn why text and numbers do not mix.",
    minutes: 45,
    win: "Today you can now join, repeat and measure text, and change numbers into text.",
    learn: [
      md`
        ## Strings
        You already know that text in Python is called a **string**. Quote marks show where it starts and ends. Today you learn what you can do with strings.

        ## Joining text with +
        Using «+» on two strings joins them. This is called **concatenation**. Guess what this shows.
      `,
      ex(py`
        first = "Good"
        second = "morning"
        print(first + second)
        print(first + " " + second)
      `, { predict: ["Goodmorning\nGood morning", "Good morning\nGood morning", "Goodmorning\nGoodmorning"], answer: 0 }),
      md`
        «+» joins strings exactly as they are. It does not add a space for you. If you want a space, add one: «" "».

        ## Repeating text with *
        «*» repeats a string. Guess first.
      `,
      ex(py`
        print("ha" * 3)
        print("-" * 10)
      `, { predict: ["hahaha\n----------", "ha3\n-10", "ha ha ha\n----------"], answer: 0 }),
      md`
        ## How long is a string?
        «len()» counts the characters in a string. A character is one letter, digit, space or symbol, so spaces and full stops count too.
      `,
      ex(py`
        print(len("Python"))
        print(len("Hi there!"))
      `, { predict: ["6\n9", "6\n8", "1\n2"], answer: 0 }),
      md`
        Look at «print(len("Python"))». One instruction sits inside another. Python works on the inside first. «len» gives 6, then «print» shows 6.

        «len» and «print» are **functions**. A function is a ready-made command with round brackets after its name. Some functions give you back an answer, like «len». Others do a job, like «print», which shows something on the screen. On Day 31 you will write your own.
      `,
      pause(md`That is the first half of today. Take a break here, or continue.`),
      md`
        ## Text and numbers are different things
        «"5"» (with quotes) is text. «5» (without quotes) is a number. They behave differently. Guess first.
      `,
      ex(py`
        print("5" + "5")
        print(5 + 5)
      `, { predict: ["55\n10", "10\n10", "55\n55"], answer: 0 }),
      md`
        Joined as text, you get «55». Added as numbers, you get «10». What happens if you use «+» between text and a number? Guess, then run it.
      `,
      ex(py`
        age = 20
        print("I am " + age + " years old")
      `, { error: true, predict: ["TypeError", "I am 20 years old", "I am age years old"], answer: 0 }),
      md`
        Python stops and shows an error. This kind of error is called a **TypeError**. It means the kinds of values do not fit together.

        The fix is to **convert** one of them, which means change it into the other kind:

        - «str(20)» turns the number 20 into the text «"20"».
        - «int("20")» turns the text «"20"» into the number 20.
      `,
      ex(py`
        age = 20
        print("I am " + str(age) + " years old")
        print(int("5") + 5)
      `, { predict: ["I am 20 years old\n10", "I am 20 years old\n55", "I am age years old\n10"], answer: 0 }),
      md`
        ## Quotes inside text
        If your text has an apostrophe ('), put double quotes at the start and end of the text. If your text has double quotes, put single quotes around it.
      `,
      ex(py`
        print("It's sunny today")
        print('She said "hello"')
      `, { predict: ["It's sunny today\nShe said \"hello\"", "Its sunny today\nShe said hello", "\"It's sunny today\"\n'She said \"hello\"'"], answer: 0 }),
      md`
        ## A new line inside text
        «\n» inside a string means "start a new line here". You type two characters: a backslash and the letter n. Python treats them as one new-line character.
      `,
      warn(md`Use the backslash «\», not the normal slash «/». On most laptops the backslash key is just above **Enter**. «/n» does not make a new line.`),
      ex(py`print("Line one\nLine two\nLine three")`, { predict: ["Line one\nLine two\nLine three", "Line one\\nLine two\\nLine three", "Line one Line two Line three"], answer: 0 }),
      tip(md`Tomorrow you will learn a much neater way to mix text and numbers, called f-strings.`),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`print("ab" * 3)`,
        options: ["ab3", "ababab", "ab ab ab"],
        answer: 1,
        explain: md`«*» repeats the text 3 times, with nothing in between.`,
        why: [md`«*» repeats the text. It does not join the number to it.`, null, md`«*» adds no spaces between the copies.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`print("5" + "5")`,
        options: ["10", "55", "5 5"],
        answer: 1,
        explain: md`They are strings (they have quotes), so «+» joins them.`,
        why: [md`The quote marks make them text, so «+» joins instead of adding.`, null, md`«+» does not add a space.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`print(len("Hi there"))`,
        options: ["7", "8", "2"],
        answer: 1,
        explain: md`H-i-space-t-h-e-r-e: the space counts, so it is 8 characters.`,
        why: [md`The space is a character too, so count it.`, null, md`«len» counts characters, not words.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          name = "Asha"
          print("Hi" + name)
        `,
        options: ["Hi Asha", "HiAsha", "Hi name"],
        answer: 1,
        explain: md`«+» does not add a space. You need «"Hi " + name» (with a space after Hi).`,
        why: [md`«+» adds no space. There is no space inside «"Hi"».`, null, md`«name» has no quotes, so its value, Asha, is used.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          age = 18
          print("Age: " + str(age))
        `,
        options: ["Age: 18", "Age: age", "Age:18"],
        answer: 0,
        explain: md`«str(age)» turns 18 into the text «"18"», so «+» can join it. The space is inside «"Age: "».`,
        why: [null, md`«age» has no quotes, so its value is used.`, md`Look inside «"Age: "». There is a space after the colon.`],
        skill: "trace",
      },
      {
        q: md`What does this program do?`,
        code: py`
          name = "Ravi"
          print("-" * len(name))
          print(name)
        `,
        options: [
          "It draws a line of dashes as long as the name, then shows the name",
          "It shows the name four times",
          "It counts the dashes",
        ],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`«len(name)» is 4, so «"-" * 4» draws 4 dashes. Then the name is shown under them.`,
        why: [null, md`The dash is repeated, not the name.`, md`«len» counts the letters of the name, and the dashes are drawn from that.`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-dashes",
        kind: "trace",
        title: "Be the Computer: a chai sign",
        task: md`Read the program. Do not run it. Type what each variable holds after the marked line, then what the program prints.`,
        code: py`
          word = "chai"
          size = len(word)
          bar = "=" * size
          print(bar + word + bar)
        `,
        inputs: [],
        ask: [{ line: 2, name: "size" }, { line: 3, name: "bar" }, { output: true }],
        hints: [
          md`«len» counts the characters in «"chai"».`,
          md`«"=" * size» repeats «=» as many times as «size» says.`,
          md`«size» is 4, so «bar» is «====». The last line joins three strings with no spaces.`,
        ],
      },
      {
        id: "arrange-name",
        kind: "parsons",
        title: "Arrange: a full name",
        task: md`
          Tap the lines into order so the program prints the full name and its length:

          | Ravi Kumar 10
        `,
        solution: py`
          first = "Ravi"
          last = "Kumar"
          full = first + " " + last
          print(full, len(full))
        `,
        indent: "given",
        tests: [{ output: "Ravi Kumar 10" }],
        hints: [
          md`A name needs a value before you use it.`,
          md`«full» is made from «first» and «last», so they come before it.`,
          md`The «print» line uses «full», so it is last.`,
        ],
      },
      {
        id: "full-name",
        title: "Full name",
        task: md`
          The first and last names are already stored. Create a variable called «full_name» by joining them with «+», with a space in between. Then print it:

          | Meera Iyer
        `,
        starter: py`
          first = "Meera"
          last = "Iyer"
          # Make full_name below, then print it

        `,
        hints: [
          md`You need a space between the two names. «+» does not add one for you.`,
          md`Join three strings with «+»: the first name, a space «" "», and the last name.`,
          md`«full_name = first + " " + last». Then «print(full_name)».`,
        ],
        solution: py`
          first = "Meera"
          last = "Iyer"
          full_name = first + " " + last
          print(full_name)
        `,
        tests: [
          {
            output: "Meera Iyer",
            py: py`
              need("full_name")
              assert full_name == "Meera Iyer", "«full_name» should be «Meera Iyer», with one space in the middle."
            `,
          },
          { uses: ["op:+"], msg: md`Join the strings with «+».` },
        ],
        wrong: [
          'print("Meera Iyer")',
          py`
            first = "Meera"
            last = "Iyer"
            full_name = first + last
            print(full_name)
          `,
        ],
      },
      {
        id: "banner",
        title: "Make a banner",
        task: md`
          Print a banner around the word stored in «word». Use «*» to make the lines of ten «=» signs:

          | ==========
          | PYTHON
          | ==========
        `,
        starter: py`
          word = "PYTHON"

        `,
        hints: [
          md`Three prints: the line, then the word, then the line again.`,
          md`Inside quotes, «=» is just a character. «"=" * 10» makes ten equals signs.`,
          md`«print("=" * 10)», then «print(word)», then «print("=" * 10)» again.`,
        ],
        solution: py`
          word = "PYTHON"
          print("=" * 10)
          print(word)
          print("=" * 10)
        `,
        tests: [
          { output: "==========\nPYTHON\n==========" },
          { uses: ["op:*"], msg: md`Make the lines with «"=" * 10» instead of typing every «=».` },
        ],
        wrong: [py`
          word = "PYTHON"
          print("==========")
          print(word)
          print("==========")
        `],
      },
      {
        id: "count-letters",
        title: "Count the characters",
        task: md`
          Print how many characters (including spaces) are in the sentence stored in «sentence». Use «len()». Do not count them yourself!
        `,
        starter: py`
          sentence = "Practice makes progress"

        `,
        hints: [
          md`«len()» counts the characters for you, spaces too.`,
          md`Put «sentence» inside «len( )». Then put all of that inside «print( )».`,
          md`«print(len(sentence))»`,
        ],
        solution: py`
          sentence = "Practice makes progress"
          print(len(sentence))
        `,
        tests: [{ output: "23" }, { uses: ["call:len"], msg: md`Use «len()» to count the characters.` }],
        wrong: ["print(23)"],
      },
      {
        id: "age-sentence",
        title: "Mix text and a number",
        task: md`
          The age is stored as a number in «age». Print this sentence by joining strings with «+»:

          | I am 20 years old

          Use «str()» to turn the number into text. Do not type 20 yourself.
        `,
        starter: py`
          age = 20

        `,
        hints: [
          md`Join three pieces with «+»: the start of the sentence, the age, and the end.`,
          md`The age is a number. Put it inside «str( )» to make it text. Keep the spaces inside the quotes.`,
          md`«"I am " + str(age) + ...»`,
        ],
        solution: py`
          age = 20
          print("I am " + str(age) + " years old")
        `,
        tests: [
          {
            output: "I am 20 years old",
            py: py`assert "str(age)" in CODE.replace(" ", ""), "Turn the number into text with «str(age)». Do not type 20 yourself."`,
          },
          { uses: ["op:+"], msg: md`Join the pieces with «+».` },
        ],
        wrong: [
          py`
            age = 20
            print("I am " + age + " years old")
          `,
          py`
            age = 20
            print("I am", age, "years old")
          `,
          py`
            age = 20
            print("I am" + str(age) + "years old")
          `,
        ],
      },
    ],
    keys: [
      md`«+» joins strings: «"Good" + "bye"» gives «Goodbye». «*» repeats: «"-" * 5» gives «-----».`,
      md`«len(text)» counts the characters, including spaces. In «print(len(text))», Python works on the inside first.`,
      md`Use «"It's"» for an apostrophe inside text, and «'Say "hi"'» for double quotes inside.`,
      md`«\n» inside a string starts a new line. Use the backslash, not «/».`,
      md`«str(20)» turns a number into text; «int("20")» turns text into a number.`,
      md`«+» between text and a number gives a «TypeError». Convert one of them first.`,
    ],
  });

  // ---------------------------------------------------------------- Day 5
  day({
    slug: "f-strings",
    title: "f-strings: mixing text and values",
    goal: "Build sentences with values inside them the easy way, and show decimals neatly.",
    minutes: 45,
    win: "Today you can now build neat sentences with values inside them, and show money with 2 decimal places.",
    learn: [
      md`
        ## The long way
        Yesterday you joined text and numbers with «+» and «str()». It works, but it is easy to make mistakes:
      `,
      ex(py`
        name = "Asha"
        age = 25
        print("My name is " + name + " and I am " + str(age) + " years old.")
      `),
      md`
        ## The short way: f-strings
        Put the letter «f» just before the opening quote. Then, inside the text, put a name in **curly brackets** «{ }». Python puts its value there. Guess the output.
      `,
      ex(py`
        name = "Asha"
        age = 25
        print(f"My name is {name} and I am {age} years old.")
      `, { predict: ["My name is Asha and I am 25 years old.", "My name is {name} and I am {age} years old.", "f My name is Asha and I am 25 years old."], answer: 0 }),
      md`
        No «+», no «str()», and the spaces are exactly where you see them. The «f» stands for **formatted**, which means arranged in a neat way. Each «{ }» is a **placeholder**: a place where a value goes.
      `,
      tip(md`**Typing curly brackets.** Hold **Shift** and press the «[» key to type «{». Hold **Shift** and press «]» to type «}».`),
      md`
        ## Maths inside the brackets
        You can put a whole calculation inside the curly brackets. Guess first.
      `,
      ex(py`
        price = 45
        quantity = 3
        print(f"{quantity} notebooks cost ₹{price * quantity}")
        print(f"Half of that is ₹{price * quantity / 2}")
      `, { predict: ["3 notebooks cost ₹135\nHalf of that is ₹67.5", "3 notebooks cost ₹{price * quantity}\nHalf of that is ₹{price * quantity / 2}", "3 notebooks cost ₹135\nHalf of that is ₹67"], answer: 0 }),
      tip(md`**Typing ₹.** On Windows with the English (India) keyboard, press **Ctrl + Alt + 4**. If that does not work, copy it from here: ₹. On a phone, look on the symbols page.`),
      md`
        ## Do not forget the f
        Without the «f», Python shows the curly brackets as ordinary characters. Guess the two lines.
      `,
      ex(py`
        name = "Asha"
        print("Hello {name}")
        print(f"Hello {name}")
      `, { predict: ["Hello {name}\nHello Asha", "Hello Asha\nHello Asha", "Hello {name}\nHello {name}"], answer: 0 }),
      pause(md`That is the first half of today. Take a break here, or continue.`),
      md`
        ## A decimal surprise
        Guess what this shows. The answer surprises almost everyone.
      `,
      ex(py`print(0.1 + 0.2)`, { predict: ["0.30000000000000004", "0.3", "0.30"], answer: 0 }),
      md`
        Computers store decimals in a special way. So a decimal answer is sometimes wrong by a very, very small amount. This is not a mistake in your code. Almost every programming language does it. The cure is to show fewer decimal places.

        ## Showing 2 decimal places
        Add «:.2f» after the value, inside the curly brackets. It shows exactly 2 digits after the decimal point. Guess first.
      `,
      ex(py`
        share = 100 / 3
        print(share)
        print(f"{share:.2f}")
        print(f"{share:.1f}")
      `, { predict: ["33.333333333333336\n33.33\n33.3", "33.33\n33.33\n33.3", "33.333333333333336\n33.3\n33.33"], answer: 0 }),
      md`
        Read «:.2f» as "show this with 2 decimal places". It rounds the last digit, so «2 / 3» shows «0.67». Change the 2 to choose a different number of places. This «f» is a different f. It means **fixed** decimal places. You still need the «f» before the quote too.

        You can put a calculation and a format in the same brackets. First the calculation, then the colon and the format:
      `,
      ex(py`print(f"Third: {100 / 3:.2f}")`, { predict: ["Third: 33.33", "Third: 33.333333333333336", "Third: {100 / 3:.2f}"], answer: 0 }),
      md`
        ## round() is not the same
        «round()» is a function that makes a new, rounded number. It takes two values, with a comma between them: the number, and how many decimal places you want. But «round()» does not add extra zeros. Guess the two lines.
      `,
      ex(py`
        print(round(312.5, 2))
        print(f"{312.5:.2f}")
      `, { predict: ["312.5\n312.50", "312.50\n312.50", "312.5\n312.5"], answer: 0 }),
      md`
        For money, use «:.2f». It always shows 2 digits after the point.

        ## Big numbers with commas
        Add «:,» to put commas in big numbers:
      `,
      ex(py`
        budget = 4500000
        print(f"School budget: ₹{budget:,}")
      `, { predict: ["School budget: ₹4,500,000", "School budget: ₹45,00,000", "School budget: ₹4500000"], answer: 0 }),
      tip(md`Python puts a comma after every 3 digits, the international way: «4,500,000». It does not use the Indian lakh and crore style, «45,00,000».`),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          name = "Sam"
          print(f"Hi {name}!")
        `,
        options: ["Hi {name}!", "Hi Sam!", "Hi name!"],
        answer: 1,
        explain: md`The «f» makes Python replace «{name}» with the value of «name».`,
        why: [md`There is an «f» before the quote, so «{name}» is replaced.`, null, md`Python uses the value of «name», not the word name.`],
        skill: "trace",
      },
      {
        q: md`What does this show? Look carefully.`,
        code: py`
          name = "Sam"
          print("Hi {name}!")
        `,
        options: ["Hi {name}!", "Hi Sam!"],
        answer: 0,
        explain: md`There is no «f» before the quote, so the curly brackets are just ordinary characters.`,
        why: [null, md`Look before the quote mark. Without the «f», nothing is replaced.`],
        skill: "debug",
      },
      {
        q: md`What does this show?`,
        code: py`
          x = 3.14159
          print(f"{x:.2f}")
        `,
        options: ["3.14159", "3.14", "3.1"],
        answer: 1,
        explain: md`«:.2f» shows exactly 2 digits after the decimal point.`,
        why: [md`«:.2f» rounds the number to 2 decimal places.`, null, md`That is «:.1f». The 2 means 2 digits.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          a = 4
          print(f"{a} x {a} = {a * a}")
        `,
        options: ["4 x 4 = 16", "a x a = a * a", "4 x 4 = 4 * 4"],
        answer: 0,
        explain: md`Each pair of curly brackets is worked out separately. The «x» outside the brackets is just text.`,
        why: [null, md`The «f» makes Python put values in every pair of curly brackets.`, md`Python does the maths inside «{a * a}».`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          print(round(2.5000, 2))
          print(f"{2.5:.2f}")
        `,
        options: ["2.5\n2.50", "2.50\n2.50", "2.5\n2.5"],
        answer: 0,
        explain: md`«round()» gives the number 2.5 and adds no extra zeros. «:.2f» always shows 2 digits: «2.50».`,
        why: [null, md`«round()» does not add zeros. Only «:.2f» always shows 2 digits.`, md`«:.2f» always shows 2 digits after the point.`],
        skill: "trace",
      },
      {
        q: md`What does this program do?`,
        code: py`
          bill = 750
          people = 4
          print(f"Each pays ₹{bill / people:.2f}")
        `,
        options: [
          "It shares a bill equally and shows each share with 2 decimal places",
          "It adds the bill and the number of people",
          "It shows the bill 4 times",
        ],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`«bill / people» is 187.5. «:.2f» shows it as «187.50».`,
        why: [null, md`«/» divides. It does not add.`, md`Nothing is repeated. «/» divides the bill.`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-fbill",
        kind: "trace",
        title: "Be the Computer: an f-string bill",
        task: md`Read the program. Do not run it. Type what each variable holds after the marked line, then what the program prints.`,
        code: py`
          price = 12
          cups = 3
          bill = price * cups
          text = f"Bill: ₹{bill}"
          print(text)
        `,
        inputs: [],
        ask: [{ line: 3, name: "bill" }, { line: 4, name: "text" }, { output: true }],
        hints: [
          md`«bill» is the price times the number of cups.`,
          md`On line 4, the f-string puts the value of «bill» where «{bill}» is.`,
          md`«bill» is 36, so «text» is «Bill: ₹36».`,
        ],
      },
      {
        id: "arrange-marks",
        kind: "parsons",
        title: "Arrange: a marks line",
        task: md`
          Tap the lines into order so the program prints:

          | Priya scored 172 out of 200
        `,
        solution: py`
          name = "Priya"
          marks = 172
          print(f"{name} scored {marks} out of 200")
        `,
        indent: "given",
        tests: [{ output: "Priya scored 172 out of 200" }],
        hints: [
          md`The f-string uses two names. They need values first.`,
          md`«name» and «marks» go before the «print» line.`,
          md`The «print» line is last.`,
        ],
      },
      {
        id: "intro",
        title: "Introduce yourself",
        task: md`
          Using the variables «name» and «age», print this sentence with an **f-string**. Put «{name}» and «{age}» inside it:

          | My name is Kabir and I am 14 years old.
        `,
        starter: py`
          name = "Kabir"
          age = 14

        `,
        hints: [
          md`Put «f» just before the opening quote. Then copy the sentence.`,
          md`Where the name goes, write «{name}». Where the age goes, write «{age}».`,
          md`«print(f"My name is {name} and I am {age} ...")». Finish the sentence, with the full stop.`,
        ],
        solution: py`
          name = "Kabir"
          age = 14
          print(f"My name is {name} and I am {age} years old.")
        `,
        tests: [
          { output: "My name is Kabir and I am 14 years old." },
          { uses: ["fstring"], msg: md`Use an f-string: put «f» just before the opening quote.` },
          {
            py: py`
              code = CODE.replace(" ", "")
              assert "{name}" in code and "{age}" in code, "Put «{name}» and «{age}» inside the f-string. Do not type Kabir and 14 yourself."
            `,
          },
        ],
        wrong: [
          'print("My name is Kabir and I am 14 years old.")',
          'print(f"My name is Kabir and I am 14 years old.")',
        ],
      },
      {
        id: "bill-split",
        title: "Split the bill",
        task: md`
          A dinner bill of ₹1250 is split between 4 people. Let Python divide «bill» by «people». Print how much each person pays, with exactly 2 decimal places:

          | Each person pays ₹312.50
        `,
        starter: py`
          bill = 1250
          people = 4
          # Type ₹ with Ctrl + Alt + 4, or copy it from here: ₹

        `,
        hints: [
          md`Use an f-string. The share is «bill / people».`,
          md`Put that calculation inside the curly brackets. Add «:.2f» after it: «{bill / people:.2f}».`,
          md`«print(f"Each person pays ₹{bill / people:.2f}")»`,
        ],
        solution: py`
          bill = 1250
          people = 4
          print(f"Each person pays ₹{bill / people:.2f}")
        `,
        tests: [
          { output: "Each person pays ₹312.50" },
          { uses: ["fstring"], msg: md`Use an f-string: put «f» just before the opening quote.` },
          { uses: ["op:/"], msg: md`Let Python work out the share with «bill / people».` },
        ],
        wrong: [
          'print(f"Each person pays ₹312.50")',
          'bill = 1250\npeople = 4\nprint(f"Each person pays ₹{round(bill / people, 2)}")',
          'bill = 1250\npeople = 4\nprint(f"Each person pays ₹{bill / people}")',
        ],
      },
      {
        id: "receipt",
        title: "A receipt line",
        task: md`
          Use the three variables to print a receipt line with an f-string. Let Python calculate the total inside the curly brackets:

          | 6 x Notebook = ₹270
        `,
        starter: py`
          item = "Notebook"
          price = 45
          quantity = 6

        `,
        hints: [
          md`Use one f-string. Look at the sample: the quantity, « x », the item, « = ₹», then the total.`,
          md`You need three sets of curly brackets: the quantity, the item, and the total. The total is «{price * quantity}».`,
          md`«print(f"{quantity} x {item} = ₹{...}")», with «price * quantity» in the last curly brackets.`,
        ],
        solution: py`
          item = "Notebook"
          price = 45
          quantity = 6
          print(f"{quantity} x {item} = ₹{price * quantity}")
        `,
        tests: [
          { output: "6 x Notebook = ₹270" },
          { uses: ["fstring"], msg: md`Use an f-string: put «f» just before the opening quote.` },
          { uses: ["op:*"], msg: md`Let Python calculate the total with «price * quantity».` },
        ],
        wrong: [
          'item = "Notebook"\nprice = 45\nquantity = 6\nprint(f"{quantity} x {item} = ₹270")',
          'item = "Notebook"\nprice = 45\nquantity = 6\nprint(f"{quantity} x item = ₹{price * quantity}")',
        ],
      },
      {
        id: "big-number",
        title: "Commas in a big number",
        task: md`
          A city plans to spend money on new roads. The amount is stored in «budget». Print it with commas, using «:,» inside an f-string:

          | Road budget: ₹12,500,000
        `,
        starter: py`
          budget = 12500000

        `,
        hints: [
          md`Use an f-string with «budget» inside curly brackets.`,
          md`Put «:,» after the name, inside the curly brackets.`,
          md`«{budget:,}»`,
        ],
        solution: py`
          budget = 12500000
          print(f"Road budget: ₹{budget:,}")
        `,
        tests: [
          { output: "Road budget: ₹12,500,000" },
          {
            py: py`assert "{budget:,}" in CODE.replace(" ", ""), "Put «{budget:,}» inside the f-string. Do not type the commas yourself."`,
          },
        ],
        wrong: [
          'budget = 12500000\nprint(f"Road budget: ₹{budget}")',
          'budget = 12500000\nprint("Road budget: ₹12,500,000")',
        ],
      },
    ],
    keys: [
      md`Put «f» before the quotes and use «{ }» to insert values: «f"Hi {name}"».`,
      md`You can put maths inside the brackets: «f"Total: {price * quantity}"».`,
      md`Without the «f», the curly brackets are shown as they are.`,
      md`«f"{x:.2f}"» always shows 2 decimal places. Use it for money. «round(x, 2)» makes a new number and adds no extra zeros.`,
      md`A decimal answer can be wrong by a tiny amount: «0.1 + 0.2» shows «0.30000000000000004».`,
      md`«f"{n:,}"» adds commas to big numbers.`,
    ],
  });

  // ---------------------------------------------------------------- Day 6
  day({
    slug: "input",
    title: "Asking the user: input()",
    goal: "Make your programs ask questions and use the answers.",
    minutes: 45,
    win: "Today you can now write programs that ask a question and work with the answer.",
    learn: [
      md`
        ## Asking a question
        So far your programs always do the same thing. «input()» lets a program ask a question. The **user** is the person who runs your program. Run this and type your name.
      `,
      ex(py`
        name = input("What is your name? ")
        print(f"Nice to meet you, {name}!")
      `),
      md`
        When Python reaches «input()», it shows the question and **waits**. On this page a box appears in the output. Type your answer there and press **Enter**. Python stores what you typed in the variable on the left.
      `,
      tip(md`End your question with a space, like «"What is your name? "». Then there is a gap between the question and the answer.`),
      md`
        ## input() always gives you text
        This is the most important thing today. Even if the user types «25», Python gets the **text** «"25"», not the number 25. Guess what happens when the user types 25.
      `,
      ex(py`
        age = input("How old are you? ")
        print(age + 1)
      `, { error: true, inputs: ["25"], predict: ["TypeError", "26", "251"], answer: 0 }),
      md`
        Python cannot add 1 to a piece of text, so it stops with a **TypeError**. You met this error on Day 4.

        ## Converting with int()
        Put «input()» inside «int()». This changes the answer into a whole number:
      `,
      ex(py`
        age = int(input("How old are you? "))
        print(f"Next year you will be {age + 1}.")
      `, { inputs: ["25"], predict: ["Next year you will be 26.", "Next year you will be 251.", "TypeError"], answer: 0 }),
      md`
        Read it from the inside out, as you did with «print(len(...))» on Day 4. First «input()» asks the question and gets text. Then «int()» changes that text into a number. Then the number is stored in «age».
      `,
      pause(md`That is the first half of today. Take a break here, or continue.`),
      md`
        ## Decimals: float()
        For decimal numbers, use «float()». Here «:.0f» shows the answer with 0 decimal places.
      `,
      ex(py`
        height = float(input("Your height in metres? "))
        print(f"That is {height * 100:.0f} cm.")
      `, { inputs: ["1.65"], predict: ["That is 165 cm.", "That is 165.0 cm.", "That is 1.65 cm.", "ValueError"], answer: 0 }),
      md`
        ## When converting fails
        «int()» only works on text that is a whole number. If the user types «hello» or «25.5», «int()» fails with a **ValueError**. A ValueError means the kind is right (text), but this text cannot be changed into a number. Guess what happens here.
      `,
      ex(py`print(int("25.5"))`, { error: true, predict: ["ValueError", "25", "25.5"], answer: 0 }),
      md`
        Use «float()» when the answer may have decimals. On Day 36 you will learn how to stop this error and show a helpful message.

        ## The pattern you will use again and again
        1. **Ask** with «input()».
        2. **Convert** with «int()» or «float()» if you need a number.
        3. **Calculate**.
        4. **Print** the answer.
      `,
      ex(py`
        length = float(input("Length of the room in metres? "))
        width = float(input("Width of the room in metres? "))
        area = length * width
        print(f"The area is {area:.1f} square metres.")
      `),
      tip(md`When your exercise is checked, the page types the answers for you. Only what you «print()» is compared. The question inside «input()» is not. So you can write your questions in your own words.`),
    ],
    quiz: [
      {
        q: md`What kind of value does «input()» give back?`,
        options: ["Always text (a string)", "A number, if the user types a number", "Nothing. It only waits."],
        answer: 0,
        explain: md`«input()» always gives text. Convert it with «int()» or «float()» when you need a number.`,
        why: [null, md`Even «25» arrives as the text «"25"». You must convert it.`, md`It waits, and then it gives back what the user typed.`],
        skill: "memory",
      },
      {
        q: md`What does this show?`,
        code: py`
          x = "4"
          print(x * 2)
        `,
        options: ["8", "44", "x2"],
        answer: 1,
        explain: md`«x» is the text «"4"», so «*» repeats it. An answer from «input()» is also text, so it does the same.`,
        why: [md`«x» has quote marks, so it is text. «*» repeats text.`, null, md`«x» has no quotes in the «print» line, so its value is used.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          x = int("4")
          print(x * 2)
        `,
        options: ["8", "44"],
        answer: 0,
        explain: md`«int()» turned the text into the number 4, so «*» multiplies.`,
        why: [null, md`«int()» changed the text into a number, so «*» multiplies.`],
        skill: "trace",
      },
      {
        q: md`What happens when this runs?`,
        code: py`print(int("12.5"))`,
        options: ["ValueError", "12", "12.5"],
        answer: 0,
        error: true,
        explain: md`«int()» only accepts text that is a whole number. «"12.5"» has a decimal point, so it gives a «ValueError». Use «float()» for decimals.`,
        why: [null, md`«int()» does not cut off the decimal part of text. It stops with an error.`, md`«int()» never gives a decimal. Here it cannot convert the text at all.`],
        skill: "debug",
      },
      {
        q: md`What does this program do?`,
        code: py`
          cm = float(input("Length in cm? "))
          print(f"{cm / 100:.2f} metres")
        `,
        options: [
          "It changes a length the user types from centimetres into metres",
          "It changes metres into centimetres",
          "It asks for a length and prints it 100 times",
        ],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`It divides the centimetres by 100. For 250 it shows «2.50 metres».`,
        why: [null, md`It divides by 100, so the answer gets smaller: centimetres into metres.`, md`«/» divides. Nothing is repeated.`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-age",
        kind: "trace",
        title: "Be the Computer: text, then a number",
        task: md`
          The user types «17». «input()» with empty brackets asks without showing a question. Do not run the program. Type what «age» holds after each marked line.
        `,
        code: py`
          age = input()
          age = int(age)
          age = age + 1
          print(age)
        `,
        inputs: ["17"],
        ask: [{ line: 1, name: "age" }, { line: 2, name: "age" }, { line: 3, name: "age" }],
        hints: [
          md`«input()» gives back exactly what the user typed, as text.`,
          md`After line 1, «age» is the text «"17"». Line 2 changes it into a number.`,
          md`After line 2, «age» is the number 17. Line 3 adds 1.`,
        ],
      },
      {
        id: "arrange-chai",
        kind: "parsons",
        title: "Arrange: ask, convert, calculate, print",
        task: md`
          Tap the lines into order. The program asks how many cups of chai, at ₹12 a cup. If the user types «3», it prints:

          | Bill: ₹36
        `,
        solution: py`
          cups = int(input("Cups of chai? "))
          bill = cups * 12
          print(f"Bill: ₹{bill}")
        `,
        indent: "given",
        tests: [
          { inputs: ["3"], output: "Bill: ₹36" },
          { inputs: ["0"], output: "Bill: ₹0" },
          { inputs: ["10"], output: "Bill: ₹120" },
        ],
        hints: [
          md`Follow the pattern: ask, convert, calculate, print.`,
          md`«bill» needs «cups», so the «input» line comes first.`,
          md`The «print» line is last.`,
        ],
      },
      {
        id: "greet",
        title: "A friendly greeting",
        task: md`
          Ask the user for their name, then greet them. If they type «Asha», your program should print:

          | Hello, Asha!
        `,
        starter: py`
          # Ask for the name, then print the greeting

        `,
        hints: [
          md`Two lines: one asks for the name, one prints the greeting.`,
          md`«name = input("What is your name? ")»`,
          md`Then «print(f"Hello, {name}!")».`,
        ],
        solution: py`
          name = input("What is your name? ")
          print(f"Hello, {name}!")
        `,
        tests: [
          { inputs: ["Asha"], output: "Hello, Asha!" },
          { inputs: ["Ravi Kumar"], output: "Hello, Ravi Kumar!" },
          { inputs: ["A"], output: "Hello, A!" },
        ],
        wrong: [py`
          name = input("What is your name? ")
          print("Hello, name!")
        `],
      },
      {
        id: "double",
        title: "Double it",
        task: md`
          Ask the user for a whole number and print double that number. If they type «7», print:

          | Double: 14
        `,
        starter: py`
          # Remember: input() gives text. Convert it with int()

        `,
        hints: [
          md`Ask, convert with «int()», then print. Without «int()», «* 2» repeats the text.`,
          md`«number = int(input("Pick a number: "))»`,
          md`Then «print("Double:", number * 2)».`,
        ],
        solution: py`
          number = int(input("Pick a number: "))
          print("Double:", number * 2)
        `,
        tests: [
          { inputs: ["7"], output: "Double: 14" },
          { inputs: ["120"], output: "Double: 240" },
          { inputs: ["-3"], output: "Double: -6" },
        ],
        wrong: [py`
          number = input("Pick a number: ")
          print("Double:", number * 2)
        `],
      },
      {
        id: "age-in-days",
        title: "Your age in days",
        task: md`
          Ask the user how old they are, in years, as a whole number. Then print about how many days that is (years × 365). For an age of «10»:

          | That is about 3650 days.
        `,
        starter: py`
          # Ask for the age, convert it to a whole number, then print

        `,
        hints: [
          md`Ask, convert with «int()», calculate, then print.`,
          md`Ask and convert in one line: «age = int(input("How old are you? "))».`,
          md`«print(f"That is about {age * 365} days.")»`,
        ],
        solution: py`
          age = int(input("How old are you? "))
          print(f"That is about {age * 365} days.")
        `,
        tests: [
          { inputs: ["10"], output: "That is about 3650 days." },
          { inputs: ["25"], output: "That is about 9125 days." },
          { inputs: ["1"], output: "That is about 365 days." },
          { inputs: ["0"], output: "That is about 0 days." },
        ],
        wrong: [
          py`
            age = float(input("How old are you? "))
            print(f"That is about {age * 365} days.")
          `,
          py`
            age = input("How old are you? ")
            print(f"That is about {age * 365} days.")
          `,
        ],
      },
      {
        id: "height-cm",
        title: "Metres to centimetres",
        task: md`
          Ask the user for their height in metres. It may have decimals, so use «float()». Print the height in centimetres (metres × 100) with 1 decimal place. If the user types «1.65»:

          | That is 165.0 cm.
        `,
        starter: py`
          # Ask for the height, convert it with float(), then print

        `,
        hints: [
          md`Ask, convert with «float()», calculate, then print.`,
          md`«height = float(input("Height in metres? "))». Then multiply «height» by 100 inside the curly brackets.`,
          md`«print(f"That is {height * 100:.1f} cm.")»`,
        ],
        solution: py`
          height = float(input("Height in metres? "))
          print(f"That is {height * 100:.1f} cm.")
        `,
        tests: [
          { inputs: ["1.65"], output: "That is 165.0 cm.", msg: md`Check that you use «float()» and show 1 decimal place with «:.1f».` },
          { inputs: ["1.15"], output: "That is 115.0 cm.", msg: md`Check that you use «:.1f». Without it, 1.15 × 100 shows a long decimal.` },
          { inputs: ["2"], output: "That is 200.0 cm." },
          { inputs: ["0.5"], output: "That is 50.0 cm." },
        ],
        wrong: [
          py`
            height = int(input("Height in metres? "))
            print(f"That is {height * 100:.1f} cm.")
          `,
          py`
            height = float(input("Height in metres? "))
            print(f"That is {height * 100} cm.")
          `,
        ],
      },
    ],
    keys: [
      md`«input("Question? ")» shows a question and waits for the user to type.`,
      md`«input()» always gives back text, even when the user types a number.`,
      md`Convert with «int(...)» for whole numbers or «float(...)» for decimals: «age = int(input("Age? "))».`,
      md`«int("25.5")» gives a «ValueError». Use «float()» when the answer may have decimals.`,
      md`The pattern: ask, convert, calculate, print.`,
    ],
  });

  // ---------------------------------------------------------------- Day 7
  day({
    slug: "week-1-project",
    title: "Project day: putting Week 1 together",
    goal: "Combine everything from this week to build three small but complete programs.",
    minutes: 45,
    needs: [2, 5, 6],
    win: "Today you can now plan a program, build it step by step, and find a bug in it.",
    learn: [
      md`
        ## What you have learned
        In six days you have learned to:

        - show output with «print()»
        - do maths with «+ - * / // %»
        - store values in variables
        - join and measure strings
        - build sentences with f-strings
        - ask questions with «input()» and convert answers with «int()» and «float()»

        That is enough to write real, useful programs. Today has no new ideas, only practice.

        ## Two tools you will need
        «//» and «%» together split a total into units. Guess what this shows.
      `,
      ex(py`
        minutes = 135
        print(minutes // 60, minutes % 60)
      `, { predict: ["2 15", "2.25 15", "15 2"], answer: 0 }),
      md`
        135 minutes is 2 whole hours, with 15 minutes left over. To find a **percentage** of an amount, work out amount × percent ÷ 100. Guess this one.
      `,
      ex(py`
        bill = 500
        print(bill * 10 / 100)
      `, { predict: ["50.0", "50", "5000"], answer: 0 }),
      md`
        10 percent of 500 is 50. It shows «50.0» because «/» always gives a decimal number.

        ## How to start a project
        Even expert programmers do not write a full program all at once. They:

        1. **Read** the task carefully. What will the user type? What should the program print?
        2. **Plan** the steps as comments first.
        3. **Fill in** one comment at a time. Press **Run** after each step to check it works.

        Here is a small example built that way:
      `,
      ex(py`
        # 1. Ask for the price of one item
        price = float(input("Price of one item? "))
        # 2. Ask how many
        quantity = int(input("How many? "))
        # 3. Work out the total
        total = price * quantity
        # 4. Show it with 2 decimal places
        print(f"Total: ₹{total:.2f}")
      `),
      tip(md`If something goes wrong, use **Step through** to watch your program run line by line. You will usually see the problem quickly.`),
      pause(md`Today has three projects and a Bug Clinic, plus one more Bug Clinic to finish later. You may finish them in two sittings. Each exercise is saved on its own.`),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          a = 10
          b = 3
          print(a // b, a % b)
        `,
        options: ["3 1", "3.33 1", "1 3"],
        answer: 0,
        explain: md`10 ÷ 3 is 3 whole times («//»), with 1 left over («%»).`,
        why: [null, md`«//» rounds down to a whole number.`, md`The «//» part is printed first, then the «%» part.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          word = "ha"
          print(f"{word * 2}!")
        `,
        options: ["haha!", "ha2!", "{word * 2}!"],
        answer: 0,
        explain: md`Inside the curly brackets, «word * 2» repeats the text.`,
        why: [null, md`«*» repeats text. It does not join the number.`, md`There is an «f» before the quote, so the brackets are worked out.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          n = int("7") + 3
          print(n)
        `,
        options: ["73", "10", "7 + 3"],
        answer: 1,
        explain: md`«int("7")» is the number 7, so «+» adds.`,
        why: [md`«int()» changed the text into a number first, so «+» adds.`, null, md`There are no quote marks around the sum, so Python works it out.`],
        skill: "trace",
      },
      {
        q: md`This program should print double the price. For «15» it prints «1515». Which line must change?`,
        code: py`
          price = input("Price? ")
          count = 2
          print(price * count)
        `,
        options: ['«price = input("Price? ")»', "«count = 2»", "«print(price * count)»"],
        answer: 0,
        verify: false,
        explain: md`«input()» gives text, and «*» repeats text. Change line 1 to «price = int(input("Price? "))».`,
        why: [null, md`«count» is already a number. The problem is that «price» is text.`, md`The «*» is right. It repeats because «price» is still text.`],
        skill: "debug",
      },
      {
        q: md`What does this program do?`,
        code: py`
          total = int(input("Total marks? "))
          got = int(input("Your marks? "))
          print(f"{got * 100 / total:.1f} percent")
        `,
        options: [
          "It works out your marks as a percentage",
          "It adds your marks to the total marks",
          "It shows how many marks you lost",
        ],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`It multiplies your marks by 100 and divides by the total. For 150 out of 200 it shows «75.0 percent».`,
        why: [null, md`There is no «+» here. The program multiplies and divides.`, md`Marks lost would be «total - got». This program works out a percentage.`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-time",
        kind: "trace",
        title: "Be the Computer: hours and minutes",
        task: md`Read the program. Do not run it. Type what each variable holds after the marked line, then what the program prints.`,
        code: py`
          minutes = 200
          hours = minutes // 60
          left = minutes % 60
          print(f"{hours} h {left} min")
        `,
        inputs: [],
        ask: [{ line: 2, name: "hours" }, { line: 3, name: "left" }, { output: true }],
        hints: [
          md`«//» gives how many whole 60s fit into 200.`,
          md`Three 60s make 180. «%» gives what is left after that.`,
          md`«hours» is 3 and «left» is 20. The f-string puts them into the text.`,
        ],
      },
      {
        id: "plan-steps",
        kind: "parsons",
        title: "Arrange: plan before you code",
        task: md`Before you write the minutes-to-hours program, plan it. Put the steps in the right order.`,
        solution: py`
          Ask the user for a number of minutes
          Change the answer into a whole number
          Work out the whole hours with //
          Work out the minutes left over with %
          Print the hours and the minutes
        `,
        order: "fixed",
        indent: "given",
        hints: [
          md`A program asks before it works things out.`,
          md`You can only do maths after the answer is a number.`,
          md`Printing is the last step.`,
        ],
      },
      {
        id: "story",
        title: "A silly story",
        task: md`
          Ask for a name, an animal and a food (in that order). Then print a one-line story. If the answers are «Asha», «elephant» and «samosas», print:

          | Asha has a pet elephant that loves eating samosas.
        `,
        starter: py`
          # 1. Ask for a name, an animal and a food
          # 2. Print the story with an f-string

        `,
        hints: [
          md`Three «input()» lines, each stored in its own variable: «name», «animal» and «food».`,
          md`The first one is «name = input("A name: ")». The other two have the same shape.`,
          md`«print(f"{name} has a pet {animal} that loves eating {food}.")»`,
        ],
        solution: py`
          name = input("A name: ")
          animal = input("An animal: ")
          food = input("A food: ")
          print(f"{name} has a pet {animal} that loves eating {food}.")
        `,
        tests: [
          { inputs: ["Asha", "elephant", "samosas"], output: "Asha has a pet elephant that loves eating samosas." },
          { inputs: ["Leo", "dragon", "pizza"], output: "Leo has a pet dragon that loves eating pizza." },
          { inputs: ["Meena", "parrot", "jalebis"], output: "Meena has a pet parrot that loves eating jalebis." },
        ],
        wrong: [py`
          name = input("A name: ")
          animal = input("An animal: ")
          food = input("A food: ")
          print(f"{name} has a pet {food} that loves eating {animal}.")
        `],
      },
      {
        id: "time-converter",
        title: "Minutes to hours",
        task: md`
          Ask for a whole number of minutes. Then print it as hours and minutes. Use «//» and «%». For «135»:

          | 2 hours and 15 minutes

          Do not worry if it says «1 hours». You will learn to fix that in Week 2.
        `,
        starter: py`
          # 1. Ask for the minutes and convert them with int()
          # 2. Work out the hours and the minutes left over
          # 3. Print them

        `,
        hints: [
          md`There are 60 minutes in an hour. Which symbol gives the whole hours? Which gives what is left over?`,
          md`«minutes = int(input("How many minutes? "))». Then «hours = minutes // 60» and «left = minutes % 60».`,
          md`«print(f"{hours} hours and {left} minutes")»`,
        ],
        solution: py`
          minutes = int(input("How many minutes? "))
          hours = minutes // 60
          left = minutes % 60
          print(f"{hours} hours and {left} minutes")
        `,
        tests: [
          { inputs: ["135"], output: "2 hours and 15 minutes" },
          { inputs: ["59"], output: "0 hours and 59 minutes" },
          { inputs: ["600"], output: "10 hours and 0 minutes" },
          { inputs: ["61"], output: "1 hours and 1 minutes" },
          { inputs: ["0"], output: "0 hours and 0 minutes" },
        ],
        wrong: [
          py`
            minutes = float(input("How many minutes? "))
            hours = minutes // 60
            left = minutes % 60
            print(f"{hours} hours and {left} minutes")
          `,
          py`
            minutes = int(input("How many minutes? "))
            hours = minutes / 60
            left = minutes % 60
            print(f"{hours} hours and {left} minutes")
          `,
        ],
      },
      {
        id: "bill-calculator",
        title: "Restaurant bill calculator",
        task: md`
          Write a program that asks for three things, in this order:

          1. the bill amount (it may have decimals)
          2. the tip percentage (a whole number)
          3. how many people are sharing (a whole number)

          The tip is «bill × tip percentage ÷ 100». Show every amount with 2 decimal places. For a bill of 300, a 15% tip and 3 people, print:

          | Tip: ₹45.00
          | Total: ₹345.00
          | Each person pays: ₹115.00
        `,
        starter: py`
          # 1. Ask for the bill, the tip percentage and the number of people
          # 2. Work out the tip and the total
          # 3. Print the three lines with 2 decimal places

        `,
        hints: [
          md`Use «float(input(...))» for the bill and «int(input(...))» for the other two.`,
          md`«tip = bill * tip_percent / 100» and «total = bill + tip».`,
          md`Show 2 decimals with «:.2f», for example «print(f"Tip: ₹{tip:.2f}")». Each person pays «total / people».`,
        ],
        solution: py`
          bill = float(input("Bill amount? "))
          tip_percent = int(input("Tip percentage? "))
          people = int(input("How many people? "))
          tip = bill * tip_percent / 100
          total = bill + tip
          print(f"Tip: ₹{tip:.2f}")
          print(f"Total: ₹{total:.2f}")
          print(f"Each person pays: ₹{total / people:.2f}")
        `,
        tests: [
          { inputs: ["300", "15", "3"], output: "Tip: ₹45.00\nTotal: ₹345.00\nEach person pays: ₹115.00" },
          { inputs: ["999", "12", "5"], output: "Tip: ₹119.88\nTotal: ₹1118.88\nEach person pays: ₹223.78" },
          { inputs: ["80", "0", "1"], output: "Tip: ₹0.00\nTotal: ₹80.00\nEach person pays: ₹80.00" },
          { inputs: ["1234.5", "18", "4"], output: "Tip: ₹222.21\nTotal: ₹1456.71\nEach person pays: ₹364.18", msg: md`The bill may have decimals, like 1234.5. Check that you change it with «float()», not «int()».` },
        ],
        wrong: [py`
          bill = int(input("Bill amount? "))
          tip_percent = int(input("Tip percentage? "))
          people = int(input("How many people? "))
          tip = bill * tip_percent / 100
          total = bill + tip
          print(f"Tip: ₹{tip:.2f}")
          print(f"Total: ₹{total:.2f}")
          print(f"Each person pays: ₹{total / people:.2f}")
        `, py`
          bill = float(input("Bill amount? "))
          tip_percent = int(input("Tip percentage? "))
          people = int(input("How many people? "))
          tip = bill * tip_percent / 100
          total = bill + tip
          print(f"Tip: ₹{tip}")
          print(f"Total: ₹{total}")
          print(f"Each person pays: ₹{total / people}")
        `],
      },
      {
        id: "bug-cups",
        kind: "bug",
        title: "Bug Clinic: a very big bill",
        task: md`
          This program asks how many cups of chai, at ₹12 a cup. For «3» it should print «Bill: ₹36». Instead it prints «Bill: ₹333333333333». Tap the line with the bug, then fix it.
        `,
        starter: py`
          cups = input("How many cups? ")
          bill = cups * 12
          print(f"Bill: ₹{bill}")
        `,
        bugLines: [1, 2],
        solution: py`
          cups = int(input("How many cups? "))
          bill = cups * 12
          print(f"Bill: ₹{bill}")
        `,
        tests: [
          { inputs: ["3"], output: "Bill: ₹36", msg: md`Check that the answer from «input()» is changed into a whole number before you multiply.` },
          { inputs: ["1"], output: "Bill: ₹12" },
          { inputs: ["0"], output: "Bill: ₹0" },
          { inputs: ["10"], output: "Bill: ₹120" },
        ],
        wrong: [
          py`
            cups = float(input("How many cups? "))
            bill = cups * 12
            print(f"Bill: ₹{bill}")
          `,
          py`
            cups = input("How many cups? ")
            bill = cups + 12
            print(f"Bill: ₹{bill}")
          `,
        ],
        hints: [
          md`What kind of value does «input()» give back? What does «*» do to that kind?`,
          md`Line 1 keeps the answer as text, so line 2 repeats it 12 times.`,
          md`Put «input(...)» inside «int( )» on line 1.`,
        ],
      },
      {
        id: "bug-share",
        kind: "bug",
        optional: true,
        title: "Bug Clinic: the wrong share",
        task: md`
          A food bill and a ₹60 delivery charge are shared equally. For a bill of «600» and «4» people, each person should pay «₹165.00». The program prints «₹615.00». Tap the line with the bug, then fix it.
        `,
        starter: py`
          bill = int(input("Bill in rupees? "))
          people = int(input("How many people? "))
          each = bill + 60 / people
          print(f"Each person pays ₹{each:.2f}")
        `,
        bugLines: [3],
        solution: py`
          bill = int(input("Bill in rupees? "))
          people = int(input("How many people? "))
          each = (bill + 60) / people
          print(f"Each person pays ₹{each:.2f}")
        `,
        tests: [
          { inputs: ["600", "4"], output: "Each person pays ₹165.00", msg: md`Check the order: the bill and the delivery charge must be added before you divide.` },
          { inputs: ["999", "5"], output: "Each person pays ₹211.80" },
          { inputs: ["0", "3"], output: "Each person pays ₹20.00" },
          { inputs: ["100", "1"], output: "Each person pays ₹160.00" },
        ],
        wrong: [
          py`
            bill = int(input("Bill in rupees? "))
            people = int(input("How many people? "))
            each = (bill + 60) // people
            print(f"Each person pays ₹{each:.2f}")
          `,
          py`
            bill = int(input("Bill in rupees? "))
            people = int(input("How many people? "))
            each = bill / people + 60
            print(f"Each person pays ₹{each:.2f}")
          `,
        ],
        hints: [
          md`Python divides before it adds. Which part is divided here?`,
          md`On line 3, only the 60 is divided by «people».`,
          md`Put brackets around «bill + 60».`,
        ],
      },
    ],
    keys: [
      md`Plan with comments first, then turn each comment into code.`,
      md`Run your program after every small step. Do not write everything at once.`,
      md`«//» and «%» together split a total into units: «135 // 60» is 2 hours, «135 % 60» is 15 minutes.`,
      md`A percentage of an amount is amount × percent ÷ 100.`,
      md`**Step through** shows exactly what your program does, line by line.`,
    ],
  });
})();
