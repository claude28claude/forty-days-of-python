// Week 2 — Making decisions: booleans, if/elif/else, and/or/not, string tools, slicing.
(function () {
  const { day, md, py, ex, tip, warn, ask, pause } = window.Course;

  // ---------------------------------------------------------------- Day 8
  day({
    slug: "true-false",
    title: "True, False and comparisons",
    goal: "Ask Python yes-or-no questions and understand its answers: True and False.",
    minutes: 40,
    win: "Today you can now ask Python yes-or-no questions and read its True or False answers.",
    learn: [
      md`
        ## Yes-or-no questions
        Programs ask yes-or-no questions all the time. Is the user old enough? Is the password right? Python answers with two special values: «True» and «False». Guess what this prints, then press Run.
      `,
      ex(py`
        print(5 > 3)
        print(5 < 3)
      `, { predict: ["True\nFalse", "False\nTrue", "5 > 3\n5 < 3"], answer: 0 }),
      md`
        «True» and «False» start with a capital letter. They have **no quotes**, because they are not text. Python calls this kind of value a **boolean**, or «bool» for short.

        An **operator** is a symbol that does a job, like «+» or «>». These six operators compare two values. Each one gives True or False:

        - «==» equal to (two equals signs)
        - «!=» not equal to
        - «>» greater than, «<» less than
        - «>=» greater than or equal to, «<=» less than or equal to

        The equals sign always comes second: «>=», never «=>».
      `,
      ex(py`
        age = 18
        print(age == 18)
        print(age != 18)
        print(age >= 18)
        print(age > 18)
      `, { predict: ["True\nFalse\nTrue\nFalse", "True\nFalse\nTrue\nTrue", "False\nTrue\nTrue\nFalse"], answer: 0 }),
      warn(md`
        **«=» and «==» are very different.**

        «x = 5» **stores** 5 in «x» ("x becomes 5"). «x == 5» **asks a question** ("is x equal to 5?"). Beginners often use one in place of the other. Be careful.
      `),
      md`
        ## Comparing text, and storing the answer
        Text comparisons are exact. Even capital letters must match:
      `,
      ex(py`
        print("chai" == "chai")
        print("Chai" == "chai")
        print("Delhi" != "Mumbai")
      `, { predict: ["True\nFalse\nTrue", "True\nTrue\nTrue", "True\nFalse\nFalse"], answer: 0 }),
      md`
        The answer to a comparison is a value, so you can store it. In «passed = marks >= 33», Python works out the right side first: «marks >= 33» is True. Then it stores True in «passed».
      `,
      ex(py`
        marks = 72
        passed = marks >= 33
        print(passed)
        print(f"Passed: {passed}")
      `, { predict: ["True\nPassed: True", "72 >= 33\nPassed: 72 >= 33", "True\nPassed: {passed}"], answer: 0 }),
      md`
        ## Text is never equal to a number
        A **bug** is a mistake in a program. Here is a common bug with «input()», which always gives text. Text is never equal to a number, even when it looks the same. «type()» tells you what kind of value something is:
      `,
      ex(py`
        answer = "10"
        print(type(answer))
        print(answer == 10)
        print(int(answer) == 10)
      `, { predict: ["<class 'str'>\nFalse\nTrue", "<class 'int'>\nTrue\nTrue", "<class 'str'>\nTrue\nTrue"], answer: 0 }),
      md`
        In the answer of «type()», «class» means kind. «str» means string (text), «int» means whole number, «float» means decimal number, and «bool» means True or False.

        With «>», «<», «>=» or «<=», text and a number cause an error. Guess what happens:
      `,
      ex(py`
        age = "20"
        print(age >= 18)
      `, { error: true, label: "A crash on purpose", predict: ["TypeError", "True", "False"], answer: 0 }),
      md`
        Python stops with a «TypeError». Change the text to a number first with «int()».
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`print(5 > 3)`, options: ["True", "False", "5 > 3"], answer: 0,
        explain: md`5 is greater than 3, so the comparison is «True».`,
        why: [null, md`5 is bigger than 3, so the answer is yes: True.`, md`Without quotes, Python works out the comparison. It does not show the words.`],
        skill: "trace" },
      { q: md`What does this show?`, code: py`print("cat" == "Cat")`, options: ["True", "False"], answer: 1,
        explain: md`Capital letters matter: «c» and «C» are different characters.`,
        why: [md`Text comparison is exact. A small «c» is not the same as a capital «C».`, null],
        skill: "trace" },
      { q: md`What does this show?`, code: py`print(10 != 10)`, options: ["True", "False"], answer: 1,
        explain: md`«!=» asks "are they different?" They are the same, so the answer is «False».`,
        why: [md`«!=» means "not equal". 10 is equal to 10, so "not equal" is False.`, null],
        skill: "trace" },
      { q: md`What does this show?`, code: py`print(7 >= 7)`, options: ["True", "False"], answer: 0,
        explain: md`«>=» means greater than **or equal to**, and 7 is equal to 7.`,
        why: [null, md`You are thinking of «>». The «=» in «>=» lets equal numbers count too.`],
        skill: "trace" },
      { q: md`What does this show?`, code: py`print("10" == 10)`, options: ["False", "True", "TypeError"], answer: 0,
        explain: md`«"10"» is text and «10» is a number. Text is never equal to a number.`,
        why: [null, md`They look the same, but the quotes make «"10"» text. Text never equals a number.`, md`Only «>», «<», «>=» and «<=» crash with text and a number. «==» just says False.`],
        skill: "trace" },
      {
        q: md`What does this program do?`,
        code: py`
          marks = int(input("Marks: "))
          print("Passed:", marks >= 33)
        `,
        options: [
          "It shows True when the marks are 33 or more, and False otherwise",
          "It changes the marks to 33",
          "It shows True only when the marks are exactly 33",
        ],
        answer: 0, verify: false, mono: false,
        explain: md`«marks >= 33» asks a question. Python prints the answer, True or False, after «Passed:».`,
        why: [null, md`«>=» only compares. It does not store anything in «marks».`, md`«>=» means "greater than or equal to", so 50 also gives True.`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-pass", kind: "trace", title: "Be the Computer: pass or not",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          marks = 45
          passed = marks >= 33
          top = marks >= 90
          print(passed, top)
        `,
        inputs: [],
        ask: [{ line: 2, name: "passed" }, { line: 3, name: "top" }, { output: true }],
        hints: [
          md`Each comparison line works out the right side first, then stores True or False.`,
          md`Is 45 at least 33? Is 45 at least 90?`,
          md`«passed» is True. Now check «top» the same way.`,
        ],
      },
      {
        id: "arrange-hot", kind: "parsons", title: "Arrange: is the chai hot?",
        task: md`Put the lines in order so the program prints «Hot: True».`,
        solution: py`
          temp = 70
          hot = temp > 60
          print("Hot:", hot)
        `,
        distractors: ["hot = temp => 60"],
        indent: "given",
        tests: [{ output: "Hot: True" }],
        hints: [
          md`A name needs a value before you use it.`,
          md`First store the temperature, then the comparison.`,
          md`«print» is the last line. «=>» is not a Python operator.`,
        ],
      },
      {
        id: "compare",
        title: "Compare two numbers",
        task: md`
          The program asks for two whole numbers, «a» and «b». Print three comparisons on three lines:

          1. Is «a» greater than «b»?
          2. Are «a» and «b» equal?
          3. Are «a» and «b» different?

          For 12 and 7 the output is:

          | True
          | False
          | True

          For 3 and 3 the output is:

          | False
          | True
          | False
        `,
        starter: py`
          a = int(input("First number: "))
          b = int(input("Second number: "))

        `,
        hints: [
          md`You need three «print» lines. Put one comparison inside each, and Python prints True or False.`,
          md`The first line is «print(a > b)». The other two use «==» and «!=».`,
          md`«print(a > b)», then «print(a == b)», then «print(a != b)».`,
        ],
        solution: py`
          a = int(input("First number: "))
          b = int(input("Second number: "))
          print(a > b)
          print(a == b)
          print(a != b)
        `,
        tests: [
          { inputs: ["12", "7"], output: "True\nFalse\nTrue" },
          { inputs: ["3", "3"], output: "False\nTrue\nFalse" },
          { inputs: ["2", "9"], output: "False\nFalse\nTrue" },
          { uses: ["compare"], msg: md`Let Python compare: print «a > b» rather than typing True yourself.` },
        ],
        wrong: [
          py`
            a = int(input("First number: "))
            b = int(input("Second number: "))
            print(True)
            print(False)
            print(True)
          `,
          py`
            a = int(input("First number: "))
            b = int(input("Second number: "))
            print(a > b)
            print(a = b)
            print(a != b)
          `,
        ],
      },
      {
        id: "can-vote",
        title: "Old enough to vote?",
        task: md`
          Ask the user's age (a whole number). Print «True» if they are 18 or older, otherwise «False», after the words «Can vote:». Put the comparison inside «print()». For an age of 20:

          | Can vote: True

          For an age of 17:

          | Can vote: False
        `,
        starter: py`

        `,
        hints: [
          md`Ask for the age as a number, then print the words and the comparison together.`,
          md`Convert the answer with «age = int(input("Age: "))». "18 or older" is «age >= 18».`,
          md`«print("Can vote:", age >= 18)»`,
        ],
        solution: py`
          age = int(input("How old are you? "))
          print("Can vote:", age >= 18)
        `,
        tests: [
          { inputs: ["20"], output: "Can vote: True" },
          { inputs: ["17"], output: "Can vote: False" },
          { inputs: ["18"], output: "Can vote: True" },
        ],
        wrong: [py`
          age = int(input("How old are you? "))
          print("Can vote:", age > 18)
        `],
      },
      {
        id: "even-check",
        title: "Is it even?",
        task: md`
          Ask for a whole number. A number is even when the remainder after dividing by 2 is 0. Print whether it is even. For «10»:

          | Even: True

          For «7»:

          | Even: False
        `,
        starter: py`

        `,
        hints: [
          md`Ask for the number with «int(input(...))», then print the words and a comparison.`,
          md`The remainder after dividing by 2 is «number % 2». Even means it is «0».`,
          md`«print("Even:", number % 2 == 0)»`,
        ],
        solution: py`
          number = int(input("A whole number: "))
          print("Even:", number % 2 == 0)
        `,
        tests: [
          { inputs: ["10"], output: "Even: True" },
          { inputs: ["7"], output: "Even: False" },
          { inputs: ["0"], output: "Even: True" },
          { inputs: ["-4"], output: "Even: True" },
          { uses: ["op:%"], msg: md`Use «%» to find the remainder after dividing by 2.` },
        ],
        wrong: [py`
          number = int(input("A whole number: "))
          print("Even:", number % 2 == 1)
        `],
      },
      {
        id: "pass-distance",
        title: "Use a ready-made function: abs()",
        task: md`
          «abs()» is a ready-made function. It gives a number without its minus sign: «abs(-8)» is «8», and «abs(8)» is «8».

          The program asks for marks. Print whether the student passed (33 or more). Then print how far the marks are from 33, using «abs()». For 40:

          | Passed: True
          | Distance: 7

          For 25:

          | Passed: False
          | Distance: 8
        `,
        starter: py`
          marks = int(input("Marks: "))

        `,
        solution: py`
          marks = int(input("Marks: "))
          print("Passed:", marks >= 33)
          print("Distance:", abs(marks - 33))
        `,
        tests: [
          { inputs: ["40"], output: "Passed: True\nDistance: 7" },
          { inputs: ["25"], output: "Passed: False\nDistance: 8" },
          { inputs: ["33"], output: "Passed: True\nDistance: 0" },
          { inputs: ["0"], output: "Passed: False\nDistance: 33" },
          { uses: ["call:abs"], msg: md`Use «abs()» so the distance never has a minus sign.` },
        ],
        wrong: [
          py`
            marks = int(input("Marks: "))
            print("Passed:", marks >= 33)
            print("Distance:", marks - 33)
          `,
          py`
            marks = int(input("Marks: "))
            print("Passed:", marks > 33)
            print("Distance:", abs(marks - 33))
          `,
        ],
        hints: [
          md`Two «print» lines: first the comparison, then the distance.`,
          md`The distance is «marks - 33», but it can be below zero.`,
          md`«print("Distance:", abs(marks - 33))»`,
        ],
      },
    ],
    keys: [
      md`Comparisons give «True» or «False». These values are called **booleans**.`,
      md`«==» equal, «!=» not equal, «>», «<», «>=», «<=». The equals sign always comes second.`,
      md`«=» stores a value. «==» compares two values.`,
      md`Text comparison is exact: «"Chai" == "chai"» is «False».`,
      md`«type(x)» tells you what kind of value «x» is.`,
      md`«"10" == 10» is «False». Text is never equal to a number. Use «int()» first.`,
    ],
  });

  // ---------------------------------------------------------------- Day 9
  day({
    slug: "if-else",
    title: "if and else",
    goal: "Make your program choose what to do, using if, else and indentation.",
    minutes: 40,
    win: "Today you can now make a program choose between two paths with if and else.",
    learn: [
      md`
        ## Making a choice
        Until now, every line of your programs ran every time. With «if», a program runs some lines only when a condition is True. A **condition** is a question with a True or False answer. Guess first:
      `,
      ex(py`
        temperature = 35
        if temperature > 30:
            print("It's hot! Drink some water.")
        print("Have a nice day.")
      `, { predict: ["It's hot! Drink some water.\nHave a nice day.", "Have a nice day.", "It's hot! Drink some water."], answer: 0 }),
      md`
        Now change «35» to «20» and run it again. The first message goes away. "Have a nice day." still shows.

        - «if» is followed by a condition and a **colon** «:».
        - The lines under it are **indented**: they start with 4 empty spaces, so they sit further to the right. They run only when the condition is True.
        - A normal line after the block has no spaces at the start. It is not part of the «if». Python runs it every time.

        ## Blocks and indentation
        In most other programming languages these spaces do not matter. In Python they are part of the code. Indented lines that belong together are called a **block**. Always use 4 spaces.
      `,
      ex(py`
        marks = 20
        if marks >= 33:
            print("You passed!")
            print("Well done.")
        print("Results finished.")
      `, { predict: ["Results finished.", "You passed!\nWell done.\nResults finished.", "Well done.\nResults finished."], answer: 0 }),
      md`
        Both indented lines are skipped, because both are in the block. Press **Step through** to watch Python skip them.
      `,
      tip(md`
        **Typing a block.** The editor adds 4 spaces for you when you press Enter after a colon. To end a block, press **Backspace** once. It removes all 4 spaces. On a phone, press the **⇤** button. «else:» must start at the left edge, exactly under «if».
      `),
      md`
        ## else: the other path
        «else» means "otherwise". It has no condition. Its block runs when the «if» condition is False. Exactly one of the two blocks runs, never both.
      `,
      ex(py`
        age = 15
        if age >= 18:
            print("You can vote.")
        else:
            print("Too young to vote.")
            print(f"Wait {18 - age} more years.")
      `, { predict: ["Too young to vote.\nWait 3 more years.", "You can vote.", "Too young to vote."], answer: 0 }),
      md`Here the condition uses an answer from the user:`,
      ex(py`
        password = input("Password: ")
        if password == "chai123":
            print("Welcome back!")
        else:
            print("Wrong password.")
      `, { inputs: ["chai123"] }),
      md`
        **Three common mistakes.** Each one stops the program with an error. First, a missing colon:
      `,
      ex(py`
        x = 5
        if x > 3
            print("big")
      `, { error: true }),
      md`Second, a missing indent:`,
      ex(py`
        x = 5
        if x > 3:
        print("big")
      `, { error: true }),
      md`Third, «=» in place of «==»:`,
      ex(py`
        x = 5
        if x = 5:
            print("five")
      `, { error: true }),
      tip(md`Do not worry when you see an error. Read the line number and the simple explanation. They usually show you the mistake.`),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          x = 5
          if x > 10:
              print("big")
          print("done")
        `,
        options: ["big\ndone", "done", "big"],
        answer: 1,
        explain: md`5 is not more than 10, so the indented line is skipped. «print("done")» is not indented, so it always runs.`,
        why: [md`The condition «5 > 10» is False, so «print("big")» is skipped.`, null, md`«print("big")» is skipped, and «print("done")» is outside the block, so it runs.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          x = 12
          if x > 10:
              print("big")
          else:
              print("small")
        `,
        options: ["big", "small", "big\nsmall"],
        answer: 0,
        explain: md`The condition is True, so only the «if» block runs.`,
        why: [null, md`12 is more than 10, so the condition is True. The «else» block runs only when it is False.`, md`Exactly one of the two blocks runs, never both.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          n = 4
          if n % 2 == 0:
              print("even")
          print("checked")
        `,
        options: ["even\nchecked", "checked", "even"],
        answer: 0,
        explain: md`4 % 2 is 0, so «"even"» is printed. Then the line with no indent runs, as always.`,
        why: [null, md`4 % 2 is 0, so the condition is True and «even» is printed.`, md`«print("checked")» has no indent, so it runs every time.`],
        skill: "trace",
      },
      {
        q: md`Which of these lines must end with a colon?`,
        options: ["«if age > 18»", '«print("hi")»', "«age = 18»"],
        answer: 0,
        explain: md`Lines that start a block, like «if» and «else», end with a colon. You will meet more of these lines later.`,
        why: [null, md`«print» does not start a block, so it has no colon.`, md`Storing a value does not start a block, so it has no colon.`],
        skill: "memory",
      },
      {
        q: md`What does this program do?`,
        code: py`
          cups = int(input("Cups of chai today: "))
          if cups > 3:
              print("That is a lot of chai!")
          else:
              print("Enjoy your chai.")
        `,
        options: [
          "It warns the user when they drink more than 3 cups of chai",
          "It counts the cups of chai the user drinks",
          "It prints both messages when the user types 5",
        ],
        answer: 0, verify: false, mono: false,
        explain: md`The «if» block runs for more than 3 cups. Otherwise the «else» block runs.`,
        why: [null, md`Nothing is counted. The program only compares the number with 3.`, md`Only one of the two blocks ever runs.`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-discount", kind: "trace", title: "Be the Computer: a discount",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          price = 120
          if price > 100:
              price = price - 20
          print(price)
        `,
        inputs: [],
        ask: [{ line: 3, name: "price" }, { output: true }],
        hints: [
          md`First decide: is the condition on line 2 True or False?`,
          md`120 is more than 100, so line 3 runs.`,
          md`Line 3 takes 20 away from 120.`,
        ],
      },
      {
        id: "trace-result", kind: "trace", title: "Be the Computer: pass or fail",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          marks = 28
          if marks >= 33:
              result = "Pass"
          else:
              result = "Fail"
          print(marks, result)
        `,
        inputs: [],
        ask: [{ line: 5, name: "result" }, { output: true }],
        hints: [
          md`Is 28 at least 33?`,
          md`The condition is False, so Python skips line 3 and runs the «else» block.`,
          md`Line 5 stores «Fail». The print shows the marks, then the result.`,
        ],
      },
      {
        id: "arrange-chai", kind: "parsons", title: "Arrange: too much chai?",
        task: md`Put the lines in order so the program prints «Too much chai!».`,
        solution: py`
          cups = 5
          if cups > 3:
              print("Too much chai!")
          else:
              print("Enjoy your chai.")
        `,
        distractors: ["if cups > 3"],
        indent: "given",
        tests: [{ output: "Too much chai!" }],
        hints: [
          md`The number of cups comes first.`,
          md`An «if» line ends with a colon. The «else» line comes after the «if» block.`,
          md`Each «print» goes under the line that controls it.`,
        ],
      },
      {
        id: "pass-fail",
        title: "Pass or fail",
        task: md`
          Ask for a student's marks (a whole number). Print «Pass» if the marks are 33 or more, otherwise print «Fail». For 50:

          | Pass
        `,
        starter: py`
          marks = int(input("Marks: "))

        `,
        hints: [
          md`Use «if» for Pass and «else» for Fail. "33 or more" includes 33.`,
          md`Start with «if marks >= 33:» and indent the next line.`,
          md`Press Backspace to end the block. Then add «else:» at the left edge, and an indented «print("Fail")».`,
        ],
        solution: py`
          marks = int(input("Marks: "))
          if marks >= 33:
              print("Pass")
          else:
              print("Fail")
        `,
        tests: [
          { inputs: ["50"], output: "Pass" },
          { inputs: ["33"], output: "Pass" },
          { inputs: ["32"], output: "Fail" },
          { inputs: ["0"], output: "Fail" },
          { uses: ["if"], msg: md`Use «if» and «else» to choose what to print.` },
        ],
        wrong: [py`
          marks = int(input("Marks: "))
          if marks > 33:
              print("Pass")
          else:
              print("Fail")
        `],
      },
      {
        id: "odd-even",
        title: "Odd or even",
        task: md`
          Ask for a whole number and say whether it is even or odd. For «4»:

          | 4 is even

          and for «7»:

          | 7 is odd
        `,
        starter: py`

        `,
        hints: [
          md`Ask for the number with «int(input(...))». Then use «if» and «else».`,
          md`A number is even when «number % 2 == 0».`,
          md`Use f-strings: «print(f"{number} is even")» in the «if» block, and «print(f"{number} is odd")» in the «else» block.`,
        ],
        solution: py`
          number = int(input("A whole number: "))
          if number % 2 == 0:
              print(f"{number} is even")
          else:
              print(f"{number} is odd")
        `,
        tests: [
          { inputs: ["4"], output: "4 is even" },
          { inputs: ["7"], output: "7 is odd" },
          { inputs: ["0"], output: "0 is even" },
          { inputs: ["-3"], output: "-3 is odd" },
        ],
        wrong: [py`
          number = int(input("A whole number: "))
          if number % 2 == 1:
              print(f"{number} is even")
          else:
              print(f"{number} is odd")
        `],
      },
      {
        id: "password",
        title: "Secret password",
        task: md`
          The secret password is «open sesame». Ask for the password. If it is exactly right, print «Access granted», otherwise print «Access denied». For «open sesame»:

          | Access granted

          For «Open Sesame» (capital letters):

          | Access denied
        `,
        starter: py`

        `,
        hints: [
          md`Store the answer as text, then use «if» and «else». Text comparison is exact.`,
          md`Store the answer: «attempt = input("Password: ")».`,
          md`Compare with «==»: «if attempt == "open sesame":». Put «print("Access denied")» in the «else» block.`,
        ],
        solution: py`
          attempt = input("Password: ")
          if attempt == "open sesame":
              print("Access granted")
          else:
              print("Access denied")
        `,
        tests: [
          { inputs: ["open sesame"], output: "Access granted" },
          { inputs: ["Open Sesame"], output: "Access denied" },
          { inputs: ["hello"], output: "Access denied" },
        ],
        wrong: [py`
          attempt = input("Password: ")
          if attempt != "open sesame":
              print("Access granted")
          else:
              print("Access denied")
        `],
      },
    ],
    keys: [
      md`«if condition:» runs the indented block only when the condition is «True».`,
      md`«else:» runs its block when the condition is «False».`,
      md`Lines that start a block (like «if» and «else») end with a colon «:».`,
      md`Indent blocks with 4 spaces. Press Backspace (or ⇤ on a phone) to end a block.`,
      md`Use «==» (not «=») to compare inside an «if».`,
    ],
  });

  // ---------------------------------------------------------------- Day 10
  day({
    slug: "elif",
    title: "elif: many choices",
    goal: "Choose between three or more options with if, elif and else.",
    minutes: 35,
    win: "Today you can now choose between many options with if, elif and else.",
    learn: [
      md`
        ## More than two choices
        Many real decisions have more than two possible results. «elif» means "else if". It adds more choices between «if» and «else». Guess first:
      `,
      ex(py`
        marks = 82
        if marks >= 90:
            print("Grade A")
        elif marks >= 75:
            print("Grade B")
        elif marks >= 60:
            print("Grade C")
        else:
            print("Keep practising!")
      `, { predict: ["Grade B", "Grade A", "Grade B\nGrade C"], answer: 0 }),
      md`
        Python checks the conditions from top to bottom. It runs the block of the **first** condition that is True. Then it skips all the rest. If no condition is True, the «else» block runs.

        One «if», its «elif»s and its «else» work together as one group. We call this a **chain**. Try different marks. Use **Step through** to watch Python check the conditions one by one.

        ## Order matters
        Python runs only the first condition that is True. So the order of your conditions is important. What goes wrong here?
      `,
      ex(py`
        marks = 95
        if marks >= 60:
            print("Grade C")
        elif marks >= 90:
            print("Grade A")
      `, { predict: ["Grade C", "Grade A", "Grade C\nGrade A"], answer: 0 }),
      md`
        95 is more than 60, so the first condition is already True. Python prints "Grade C" and never reaches the second check. Put the condition that is hardest to reach first. With «>=», start with the biggest number.

        ## A chain or separate ifs?
        Separate «if» blocks are **all** checked:
      `,
      ex(py`
        n = 15
        if n > 10:
            print("more than 10")
        if n > 5:
            print("more than 5")
      `, { predict: ["more than 10\nmore than 5", "more than 10", "more than 5"], answer: 0 }),
      md`A chain stops at the first True condition:`,
      ex(py`
        n = 15
        if n > 10:
            print("more than 10")
        elif n > 5:
            print("more than 5")
      `, { predict: ["more than 10", "more than 10\nmore than 5", "more than 5"], answer: 0 }),
      md`If a chain has no «else» and no condition is True, the chain does nothing:`,
      ex(py`
        colour = "purple"
        if colour == "red":
            print("Stop")
        elif colour == "green":
            print("Go")
        print("End of program")
      `, { predict: ["End of program", "Stop\nEnd of program", "Go\nEnd of program"], answer: 0 }),
      tip(md`
        **Typing ₹.** On a Windows laptop with the English (India) keyboard, hold Ctrl + Alt and press 4. If that does not work, copy ₹ from this page and paste it.
      `),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          x = 7
          if x > 10:
              print("A")
          elif x > 5:
              print("B")
          else:
              print("C")
        `,
        options: ["A", "B", "C", "B\nC"],
        answer: 1,
        explain: md`7 is not more than 10, but it is more than 5. So Python prints «B», and the chain stops.`,
        why: [md`7 is not more than 10, so the first block is skipped.`, null, md`«x > 5» is True, so the «else» block never runs.`, md`A chain runs only one block.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          x = 50
          if x > 10:
              print("A")
          elif x > 20:
              print("B")
        `,
        options: ["A", "B", "A\nB"],
        answer: 0,
        explain: md`The first condition is True, so the «elif» is never checked.`,
        why: [null, md`50 is also more than 20, but Python stops at the first True condition.`, md`An «elif» is part of the chain, so only one block runs.`],
        skill: "trace",
      },
      {
        q: md`And this one?`,
        code: py`
          x = 50
          if x > 10:
              print("A")
          if x > 20:
              print("B")
        `,
        options: ["A", "B", "A\nB"],
        answer: 2,
        explain: md`These are two separate «if» blocks, so both are checked. Both are True.`,
        why: [md`The second line is «if», not «elif», so it is checked too.`, md`«x > 10» is also True, so «A» is printed first.`, null],
        skill: "trace",
      },
      {
        q: md`What does this program do?`,
        code: py`
          runs = int(input("Runs scored: "))
          if runs >= 100:
              print("Century!")
          elif runs >= 50:
              print("Half-century!")
          else:
              print("Keep batting.")
        `,
        options: [
          "It names the batter's score level from the runs typed",
          "It adds up the runs of the whole team",
          "It prints Century! and Half-century! for 120 runs",
        ],
        answer: 0, verify: false, mono: false,
        explain: md`It checks the runs from the highest level down and prints one message.`,
        why: [null, md`There is only one number, and nothing is added.`, md`A chain stops at the first True condition, so 120 prints only «Century!».`],
        skill: "read",
      },
      {
        q: md`What does this show?`,
        code: py`
          age = 70
          if age >= 18:
              print("Adult")
          elif age >= 60:
              print("Senior")
        `,
        options: ["Adult", "Senior", "Adult\nSenior"],
        answer: 0,
        explain: md`70 is at least 18, so the first block runs and the chain stops. The «>= 60» check should come first.`,
        why: [null, md`Python never reaches the «elif», because «age >= 18» is already True.`, md`A chain runs only one block.`],
        skill: "debug",
      },
    ],
    practice: [
      {
        id: "trace-grade", kind: "trace", title: "Be the Computer: which grade?",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          marks = 68
          if marks >= 90:
              grade = "A"
          elif marks >= 60:
              grade = "C"
          else:
              grade = "F"
          print(grade)
        `,
        inputs: [],
        ask: [{ line: 5, name: "grade" }, { output: true }],
        hints: [
          md`Check the conditions from the top, one by one.`,
          md`68 is not 90 or more. Is it 60 or more?`,
          md`The first True condition is on line 4, so line 5 runs.`,
        ],
      },
      {
        id: "arrange-weather", kind: "parsons", title: "Arrange: what weather?",
        task: md`Put the lines in order so the program prints «Warm».`,
        solution: py`
          temp = 28
          if temp >= 35:
              print("Very hot")
          elif temp >= 25:
              print("Warm")
          else:
              print("Cool")
        `,
        distractors: ["elif temp >= 25"],
        indent: "given",
        tests: [{ output: "Warm" }],
        hints: [
          md`The chain starts with «if», then «elif», then «else».`,
          md`Every line that starts a block ends with a colon.`,
          md`Each «print» goes under the condition it belongs to.`,
        ],
      },
      {
        id: "grade",
        title: "Grade calculator",
        task: md`
          Ask for marks (a whole number) and print the grade:

          - 90 or more: «Grade: A»
          - 75 to 89: «Grade: B»
          - 60 to 74: «Grade: C»
          - 33 to 59: «Grade: D»
          - below 33: «Grade: F»

          For 82 the output is:

          | Grade: B
        `,
        starter: py`
          marks = int(input("Marks: "))
          if marks >= 90:
              print("Grade: A")

        `,
        hints: [
          md`Use one chain. Check the grades from the highest to the lowest.`,
          md`Add an «elif» for each grade under the «if»: «elif marks >= 75:», then «print("Grade: B")».`,
          md`Then «elif marks >= 60:» and «elif marks >= 33:». The last one, F, is a plain «else:».`,
        ],
        solution: py`
          marks = int(input("Marks: "))
          if marks >= 90:
              print("Grade: A")
          elif marks >= 75:
              print("Grade: B")
          elif marks >= 60:
              print("Grade: C")
          elif marks >= 33:
              print("Grade: D")
          else:
              print("Grade: F")
        `,
        tests: [
          { inputs: ["95"], output: "Grade: A" },
          { inputs: ["90"], output: "Grade: A" },
          { inputs: ["89"], output: "Grade: B" },
          { inputs: ["75"], output: "Grade: B" },
          { inputs: ["74"], output: "Grade: C" },
          { inputs: ["60"], output: "Grade: C" },
          { inputs: ["59"], output: "Grade: D" },
          { inputs: ["33"], output: "Grade: D" },
          { inputs: ["32"], output: "Grade: F" },
          { inputs: ["0"], output: "Grade: F" },
          { uses: ["kw:elif"], msg: md`Use «elif» for the grades between the first and the last.` },
        ],
        wrong: [py`
          marks = int(input("Marks: "))
          if marks > 90:
              print("Grade: A")
          elif marks > 75:
              print("Grade: B")
          elif marks > 60:
              print("Grade: C")
          elif marks > 33:
              print("Grade: D")
          else:
              print("Grade: F")
        `],
      },
      {
        id: "traffic-light",
        title: "Traffic light",
        task: md`
          Ask for a traffic-light colour (typed in small letters). Print:

          - «red» → «Stop»
          - «yellow» → «Slow down»
          - «green» → «Go»
          - anything else → «Unknown colour»

          For «yellow» the output is:

          | Slow down
        `,
        starter: py`

        `,
        hints: [
          md`Store the colour, then use one chain: «if», two «elif»s and an «else».`,
          md`Compare text with «==»: «if colour == "red":».`,
          md`Next comes «elif colour == "yellow":», then «elif colour == "green":», then «else:» for «Unknown colour».`,
        ],
        solution: py`
          colour = input("Colour: ")
          if colour == "red":
              print("Stop")
          elif colour == "yellow":
              print("Slow down")
          elif colour == "green":
              print("Go")
          else:
              print("Unknown colour")
        `,
        tests: [
          { inputs: ["red"], output: "Stop" },
          { inputs: ["yellow"], output: "Slow down" },
          { inputs: ["green"], output: "Go" },
          { inputs: ["blue"], output: "Unknown colour" },
        ],
        wrong: [py`
          colour = input("Colour: ")
          if colour == "red":
              print("Stop")
          if colour == "yellow":
              print("Slow down")
          if colour == "green":
              print("Go")
          else:
              print("Unknown colour")
        `],
      },
      {
        id: "ticket-price",
        title: "Museum tickets",
        task: md`
          Ask for a visitor's age (a whole number) and print the ticket price:

          - under 5: «Ticket: Free»
          - 5 to 17: «Ticket: ₹50»
          - 18 to 59: «Ticket: ₹100»
          - 60 and over: «Ticket: ₹60»

          For 30 the output is:

          | Ticket: ₹100
        `,
        starter: py`

        `,
        hints: [
          md`Use one chain with four blocks. Store the age with «int(input(...))».`,
          md`You can work upwards: «if age < 5:», then «elif age < 18:», then «elif age < 60:», then «else:».`,
          md`Check the ages where the price changes: what should 5, 17, 18, 59 and 60 print?`,
        ],
        solution: py`
          age = int(input("Age: "))
          if age < 5:
              print("Ticket: Free")
          elif age < 18:
              print("Ticket: ₹50")
          elif age < 60:
              print("Ticket: ₹100")
          else:
              print("Ticket: ₹60")
        `,
        tests: [
          { inputs: ["0"], output: "Ticket: Free" },
          { inputs: ["4"], output: "Ticket: Free" },
          { inputs: ["5"], output: "Ticket: ₹50" },
          { inputs: ["17"], output: "Ticket: ₹50" },
          { inputs: ["18"], output: "Ticket: ₹100" },
          { inputs: ["59"], output: "Ticket: ₹100" },
          { inputs: ["60"], output: "Ticket: ₹60" },
          { inputs: ["85"], output: "Ticket: ₹60" },
        ],
        wrong: [py`
          age = int(input("Age: "))
          if age <= 5:
              print("Ticket: Free")
          elif age <= 18:
              print("Ticket: ₹50")
          elif age <= 60:
              print("Ticket: ₹100")
          else:
              print("Ticket: ₹60")
        `],
      },
    ],
    keys: [
      md`«elif» adds more choices between «if» and «else».`,
      md`Python runs the block of the first condition that is «True», then skips the rest.`,
      md`Order matters: put the condition that is hardest to reach first.`,
      md`Separate «if»s are all checked. A chain stops at the first True condition.`,
    ],
  });

  // ---------------------------------------------------------------- Day 11
  day({
    slug: "and-or-not",
    title: "and, or, not",
    goal: "Combine several conditions into one decision.",
    minutes: 45,
    win: "Today you can now join conditions with and, or and not, and put one if inside another.",
    learn: [
      md`
        ## Combining conditions
        Sometimes one condition is not enough. To enter the stadium for an IPL match, you must be at least 18 **and** have a ticket. Guess first:
      `,
      ex(py`
        age = 25
        has_ticket = True
        if age >= 18 and has_ticket:
            print("You can enter.")
        else:
            print("Sorry, you cannot enter.")
      `, { predict: ["You can enter.", "Sorry, you cannot enter."], answer: 0 }),
      md`
        «has_ticket» already holds True or False, so it can be a condition by itself. You do not need to write «has_ticket == True».

        - «and»: **both** conditions must be True.
        - «or»: **at least one** condition must be True.
        - «not»: changes True to False, and False to True.
      `,
      ex(py`
        day = "sunday"
        if day == "saturday" or day == "sunday":
            print("Weekend!")
        else:
            print("Weekday.")
      `, { predict: ["Weekend!", "Weekday."], answer: 0 }),
      ex(py`
        raining = False
        if not raining:
            print("No umbrella needed.")
        else:
            print("Take an umbrella.")
      `, { predict: ["No umbrella needed.", "Take an umbrella."], answer: 0 }),
      md`
        ## The rules in plain words
        - «and» is True only if everything is True. One False makes it False.
        - «or» is False only if everything is False. One True makes it True.
      `,
      ex(py`
        print(True and False)
        print(True or False)
        print(not True)
      `, { predict: ["False\nTrue\nFalse", "True\nTrue\nFalse", "False\nFalse\nTrue"], answer: 0 }),
      md`
        ## Is a number between two numbers?
        Is someone a teenager (13 to 19)? Check both ends with «and»:
      `,
      ex(py`
        age = 15
        if age >= 13 and age <= 19:
            print("Teenager")
      `),
      md`Python has a short way to check if a number is between two numbers. You write it like in maths:`,
      ex(py`
        age = 15
        if 13 <= age <= 19:
            print("Teenager")
      `),
      warn(md`
        **A very common mistake.** «if day == "saturday" or "sunday":» is **always** True! Python reads it as «(day == "saturday") or ("sunday")». Any text that is not empty counts as True, so the «if» block always runs. Always write the whole comparison twice: «day == "saturday" or day == "sunday"».
      `),
      ex(py`
        day = "monday"
        if day == "saturday" or "sunday":
            print("Weekend! (This is wrong. It is Monday!)")
      `, { label: "See the mistake run" }),
      pause(md`This is the end of the first sitting. The second sitting shows how to mix «and» with «or», and how to put one «if» inside another.`),
      md`
        ## Mixing and with or
        You can use «and» and «or» together in one condition. Python does «not» first, then «and», then «or». Use brackets to show what you mean, as in maths.

        A shop gives a free samosa if you buy 2 or more chai, **and** the day is Monday or Tuesday. Asha buys 0 chai on Tuesday. Guess both lines:
      `,
      ex(py`
        chai = 0
        day = "tuesday"
        print(chai >= 2 and day == "monday" or day == "tuesday")
        print(chai >= 2 and (day == "monday" or day == "tuesday"))
      `, { predict: ["True\nFalse", "False\nFalse", "True\nTrue"], answer: 0 }),
      md`
        The first line is wrong. Python does «and» first, so it reads «(chai >= 2 and day == "monday") or day == "tuesday"». Tuesday alone makes it True. The brackets in the second line make Python check the day part first.
      `,
      ask({
        q: md`Python does «and» before «or». How does it read «a and b or c»?`,
        options: ["«(a and b) or c»", "«a and (b or c)»"],
        answer: 0,
        explain: md`«and» comes first, so «a and b» is joined first. Add brackets when you want something else.`,
        why: [null, md`That needs brackets. Without them, «and» is worked out first.`],
      }),
      md`
        ## An if inside an if
        A block can hold another «if». The inner «if» is indented 4 more spaces, so 8 in all. Python checks it only when the outer condition is True. Guess first:
      `,
      ex(py`
        has_ticket = True
        age = 15
        if has_ticket:
            if age >= 18:
                print("Welcome to the match.")
            else:
                print("Please come with an adult.")
        else:
            print("Please buy a ticket first.")
      `, { predict: ["Please come with an adult.", "Welcome to the match.", "Please buy a ticket first."], answer: 0 }),
      md`
        Press **Step through** and watch which lines run. Then change «has_ticket» to «False» and run it again. Now Python never checks the age.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`print(True and False)`, options: ["True", "False"], answer: 1,
        explain: md`«and» needs both sides to be True.`,
        why: [md`One side is False, and «and» needs both to be True.`, null],
        skill: "trace" },
      { q: md`What does this show?`, code: py`print(5 > 3 or 2 > 9)`, options: ["True", "False"], answer: 0,
        explain: md`«5 > 3» is True, and «or» needs only one True side.`,
        why: [null, md`«2 > 9» is False, but «or» needs only one side to be True.`],
        skill: "trace" },
      {
        q: md`What does this show?`,
        code: py`
          x = 7
          print(x > 5 and x < 10)
        `,
        options: ["True", "False"],
        answer: 0,
        explain: md`7 is more than 5 **and** less than 10.`,
        why: [null, md`Check each side: «7 > 5» is True and «7 < 10» is True.`],
        skill: "trace",
      },
      { q: md`What does this show?`, code: py`print(not 3 > 1)`, options: ["True", "False"], answer: 1,
        explain: md`«3 > 1» is True, and «not» changes it to False.`,
        why: [md`«3 > 1» is True, then «not» changes True to False.`, null],
        skill: "trace" },
      {
        q: md`What does this program do?`,
        code: py`
          day = input("Day: ")
          if day == "saturday" or "sunday":
              print("Weekend!")
        `,
        options: [
          "It prints Weekend! for any day the user types",
          "It prints Weekend! only for saturday or sunday",
          "It prints nothing when the user types monday",
        ],
        answer: 0, verify: false, mono: false,
        explain: md`«or "sunday"» is not a comparison. Text that is not empty counts as True, so the condition is always True.`,
        why: [null, md`That needs «day == "sunday"» after «or». Here «"sunday"» stands alone.`, md`For monday the left side is False, but «"sunday"» alone counts as True.`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-samosa", kind: "trace", title: "Be the Computer: an if inside an if",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          cups = 3
          day = "monday"
          if day == "monday":
              if cups >= 2:
                  gift = "samosa"
              else:
                  gift = "none"
          print(gift)
        `,
        inputs: [],
        ask: [{ line: 5, name: "gift" }, { output: true }],
        hints: [
          md`Check the outer «if» on line 3 first.`,
          md`It is Monday, so Python checks the inner «if» on line 4.`,
          md`3 is at least 2, so line 5 runs.`,
        ],
      },
      {
        id: "arrange-discount", kind: "parsons", title: "Arrange: half price",
        task: md`A bus gives half price to people aged 60 or more, or to students. Put the lines in order so the program prints «Half price».`,
        solution: py`
          age = 65
          student = False
          if age >= 60 or student:
              print("Half price")
          else:
              print("Full price")
        `,
        distractors: ["if age >= 60 and student:"],
        indent: "given",
        tests: [{ output: "Half price" }],
        hints: [
          md`The two values come first.`,
          md`Only one of the two things needs to be True. Which word means that?`,
          md`Use «or». «and» would need both, and this person is not a student.`,
        ],
      },
      {
        id: "teenager",
        title: "Teenager check",
        task: md`
          Ask for an age (a whole number). Print «Teenager» if the age is from 13 to 19 (including both), otherwise «Not a teenager». For 16:

          | Teenager
        `,
        starter: py`

        `,
        hints: [
          md`Ask for the age with «int(input(...))». Then use «if» and «else».`,
          md`Both ends count, so use «>=» and «<=», not «>» and «<».`,
          md`«if age >= 13 and age <= 19:», or the short way «if 13 <= age <= 19:».`,
        ],
        solution: py`
          age = int(input("Age: "))
          if 13 <= age <= 19:
              print("Teenager")
          else:
              print("Not a teenager")
        `,
        tests: [
          { inputs: ["12"], output: "Not a teenager" },
          { inputs: ["13"], output: "Teenager" },
          { inputs: ["16"], output: "Teenager" },
          { inputs: ["19"], output: "Teenager" },
          { inputs: ["20"], output: "Not a teenager" },
        ],
        wrong: [py`
          age = int(input("Age: "))
          if age > 13 and age < 19:
              print("Teenager")
          else:
              print("Not a teenager")
        `],
      },
      {
        id: "weekend",
        title: "Weekend or weekday",
        task: md`
          Ask for a day of the week (in small letters). Print «Weekend!» if it is «saturday» or «sunday», otherwise «Weekday». Use «or». For «sunday»:

          | Weekend!

          For «monday»:

          | Weekday
        `,
        starter: py`

        `,
        hints: [
          md`Store the day with «input()». Then use «if» and «else».`,
          md`Use «or», and write the full comparison on both sides of it.`,
          md`«if day == "saturday" or day == "sunday":»`,
        ],
        solution: py`
          day = input("Day: ")
          if day == "saturday" or day == "sunday":
              print("Weekend!")
          else:
              print("Weekday")
        `,
        tests: [
          { inputs: ["saturday"], output: "Weekend!" },
          { inputs: ["sunday"], output: "Weekend!" },
          { inputs: ["monday"], output: "Weekday" },
          { inputs: ["friday"], output: "Weekday" },
          { uses: ["kw:or"], msg: md`Use «or» to check both weekend days.` },
        ],
        wrong: ['day = input("Day: ")\nif day == "saturday" or "sunday":\n    print("Weekend!")\nelse:\n    print("Weekday")'],
      },
      {
        id: "umbrella",
        title: "Umbrella or not",
        task: md`
          The program asks «Is it raining? (yes/no)» and stores True or False in «raining». Finish it with «if not raining:». Print «No umbrella needed» when it is not raining, otherwise «Take an umbrella». For «yes»:

          | Take an umbrella

          For «no»:

          | No umbrella needed
        `,
        starter: py`
          answer = input("Is it raining? (yes/no) ")
          raining = answer == "yes"

        `,
        solution: py`
          answer = input("Is it raining? (yes/no) ")
          raining = answer == "yes"
          if not raining:
              print("No umbrella needed")
          else:
              print("Take an umbrella")
        `,
        tests: [
          { inputs: ["yes"], output: "Take an umbrella" },
          { inputs: ["no"], output: "No umbrella needed" },
          { inputs: ["maybe"], output: "No umbrella needed" },
          { uses: ["not"], msg: md`Use «not» in the condition: «if not raining:».` },
        ],
        wrong: [py`
          answer = input("Is it raining? (yes/no) ")
          raining = answer == "yes"
          if not raining:
              print("Take an umbrella")
          else:
              print("No umbrella needed")
        `],
        hints: [
          md`«raining» already holds True or False, so it can be the condition.`,
          md`Add «if not raining:» under the two lines, then an «else:».`,
          md`«not raining» is True when it is dry, so print «No umbrella needed» first.`,
        ],
      },
      {
        id: "free-samosa",
        title: "Free samosa",
        task: md`
          A shop gives a free samosa if you buy 2 or more chai **and** the day is «monday» or «tuesday». Ask for the number of chai (a whole number), then the day (in small letters). Print «Free samosa!» or «No free samosa». Use «and», «or» and brackets. For 3 and «tuesday»:

          | Free samosa!

          For 0 and «tuesday»:

          | No free samosa
        `,
        starter: py`

        `,
        solution: py`
          chai = int(input("Cups of chai: "))
          day = input("Day: ")
          if chai >= 2 and (day == "monday" or day == "tuesday"):
              print("Free samosa!")
          else:
              print("No free samosa")
        `,
        tests: [
          { inputs: ["2", "monday"], output: "Free samosa!" },
          { inputs: ["3", "tuesday"], output: "Free samosa!" },
          { inputs: ["0", "tuesday"], output: "No free samosa" },
          { inputs: ["1", "monday"], output: "No free samosa" },
          { inputs: ["5", "friday"], output: "No free samosa" },
        ],
        wrong: [py`
          chai = int(input("Cups of chai: "))
          day = input("Day: ")
          if chai >= 2 and day == "monday" or day == "tuesday":
              print("Free samosa!")
          else:
              print("No free samosa")
        `],
        hints: [
          md`Ask two questions: the chai with «int(input(...))», the day with «input(...)».`,
          md`The day part is «day == "monday" or day == "tuesday"». Put it in brackets.`,
          md`«if chai >= 2 and (day == "monday" or day == "tuesday"):»`,
        ],
      },
      {
        id: "leap-year",
        title: "Bonus: leap year",
        optional: true,
        task: md`
          Ask for a year and print «Leap year» or «Not a leap year». Follow these steps in order:

          1. If the year divides exactly by 400, it is a leap year.
          2. If not, and it divides exactly by 100, it is not a leap year.
          3. If not, and it divides exactly by 4, it is a leap year.
          4. All other years are not leap years.

          So 2000 is a leap year, 1900 is not, and 2024 is. Step 1 is done for you.
        `,
        starter: py`
          year = int(input("Year: "))
          if year % 400 == 0:
              print("Leap year")

        `,
        hints: [
          md`"Divides exactly by 4" means «year % 4 == 0».`,
          md`Follow the four steps with «if», «elif», «elif» and «else». The next line is «elif year % 100 == 0:».`,
          md`«elif year % 100 == 0:» prints «Not a leap year». Then «elif year % 4 == 0:» prints «Leap year». The «else:» prints «Not a leap year».`,
        ],
        solution: py`
          year = int(input("Year: "))
          if year % 400 == 0:
              print("Leap year")
          elif year % 100 == 0:
              print("Not a leap year")
          elif year % 4 == 0:
              print("Leap year")
          else:
              print("Not a leap year")
        `,
        tests: [
          { inputs: ["2024"], output: "Leap year" },
          { inputs: ["2023"], output: "Not a leap year" },
          { inputs: ["1900"], output: "Not a leap year" },
          { inputs: ["2000"], output: "Leap year" },
          { inputs: ["2100"], output: "Not a leap year" },
          { inputs: ["2400"], output: "Leap year" },
        ],
        wrong: [py`
          year = int(input("Year: "))
          if year % 400 == 0:
              print("Leap year")
          elif year % 4 == 0:
              print("Leap year")
          else:
              print("Not a leap year")
        `, py`
          year = int(input("Year: "))
          if year % 400 == 0:
              print("Leap year")
          elif year % 4 == 0:
              print("Leap year")
          elif year % 100 == 0:
              print("Not a leap year")
          else:
              print("Not a leap year")
        `],
      },
    ],
    keys: [
      md`«and»: both conditions must be «True». «or»: at least one must be «True».`,
      md`«not» changes «True» to «False», and «False» to «True».`,
      md`«13 <= age <= 19» checks if a number is between two numbers.`,
      md`Write the whole comparison each time: «day == "sat" or day == "sun"», never «day == "sat" or "sun"».`,
      md`Python does «not», then «and», then «or». Use brackets to show what you mean.`,
      md`An «if» can sit inside another «if». Its block is indented 8 spaces.`,
    ],
  });

  // ---------------------------------------------------------------- Day 12
  day({
    slug: "string-methods",
    title: "String tools",
    goal: "Clean text and check text with methods like upper(), strip() and replace().",
    minutes: 45,
    win: "Today you can now clean, change and check text with string methods.",
    learn: [
      md`
        ## Methods
        Strings come with ready-made tools called **methods**. To use one, write a dot after the value, then the method's name and brackets. A function goes before the value: «len(word)». A method goes after the value, with a dot: «word.upper()». Guess first:
      `,
      ex(py`
        name = "asha rao"
        print(name.upper())
        print(name.lower())
        print(name.title())
        print("aSHA rAO".title())
      `, { predict: ["ASHA RAO\nasha rao\nAsha Rao\nAsha Rao", "ASHA RAO\nasha rao\nAsha Rao\nASHA RAO", "Asha rao\nasha rao\nAsha Rao\naSHA rAO"], answer: 0 }),
      md`
        - «.upper()»: ALL CAPITALS
        - «.lower()»: all small letters
        - «.title()»: Capital At The Start Of Each Word, and all other letters small

        ## Cleaning up what people type
        People often type extra spaces by mistake. «.strip()» removes spaces from the start and the end, but not from the middle. Inside the curly brackets of an f-string, you can also use a method.
      `,
      ex(py`
        messy = "   hello there   "
        print(f"[{messy}]")
        print(f"[{messy.strip()}]")
      `, { predict: ["[   hello there   ]\n[hello there]", "[hello there]\n[hello there]", "[   hello there   ]\n[hellothere]"], answer: 0 }),
      md`
        The [ and ] here are ordinary characters. They only show where the string starts and ends, so you can see the spaces.

        ## Methods do not change the string
        String methods never change the string. Methods like «.upper()» give back a new string. To keep it, store it. Guess first:
      `,
      ex(py`
        word = "python"
        word.upper()
        print(word)
        word = word.upper()
        print(word)
      `, { predict: ["python\nPYTHON", "PYTHON\nPYTHON", "python\npython"], answer: 0 }),
      md`
        Line 2 made "PYTHON" and threw it away, because nothing stored it. Line 4 is different. «word = word.upper()» makes a new string and puts it in the jar called «word». The old string is thrown away.

        **Chaining methods.** You can use several methods in a row. First «.strip()» gives a new string with no outer spaces. Then «.lower()» works on that new string. «input()» gives a string, so you can add the methods straight after it:
      `,
      ex(py`
        answer = input("Do you want tea? ").strip().lower()
        if answer == "yes":
            print("Your tea is coming!")
        else:
            print("Okay, no tea.")
      `, { inputs: ["  YES "], predict: ["Your tea is coming!", "Okay, no tea."], answer: 0 }),
      tip(md`Try typing «  YES  » with spaces and capitals. Because of «.strip().lower()», it still works.`),
      pause(md`This is the end of the first sitting. The second sitting shows tools that replace, count and check text.`),
      md`
        ## Replacing and counting
        «.replace("tea", "coffee")» makes a new string where every «tea» becomes «coffee». First say what to find, then what to put in its place. «.count("e")» tells you how many times «e» appears. Guess first:
      `,
      ex(py`
        sentence = "I like tea. Tea is good."
        print(sentence.replace("tea", "coffee"))
        print(sentence.count("e"))
      `, { predict: ["I like coffee. Tea is good.\n3", "I like coffee. coffee is good.\n3", "I like coffee. Coffee is good.\n2"], answer: 0 }),
      md`
        «Tea» did not change. Capital letters still matter.

        ## Asking questions about text
        These tools answer True or False:

        - «.startswith()» and «.endswith()» check the beginning and the end.
        - «.isdigit()» is True when the text has only digits (0 to 9).
        - «in» checks if one piece of text appears anywhere inside another. «in» is not a method. It has no dot and no brackets. Write the small text first, then «in», then the big text.
      `,
      ex(py`
        email = "asha@example.com"
        print(email.endswith(".com"))
        print(email.startswith("ravi"))
        print("@" in email)
        print("98a7".isdigit())
      `, { predict: ["True\nFalse\nTrue\nFalse", "True\nTrue\nTrue\nTrue", "True\nFalse\nFalse\nFalse"], answer: 0 }),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`print("hello".upper())`, options: ["HELLO", "Hello", "hello"], answer: 0,
        explain: md`«.upper()» makes every letter a capital.`,
        why: [null, md`That is «.title()». «.upper()» makes every letter a capital.`, md`«.upper()» gives back a new string in capitals.`],
        skill: "trace" },
      { q: md`What does this show?`, code: py`print(len("  hi  ".strip()))`, options: ["2", "6", "4"], answer: 0,
        explain: md`«.strip()» removes the spaces, leaving «"hi"», which has 2 characters.`,
        why: [null, md`6 is the length before «.strip()». «len» counts the new string.`, md`«.strip()» removes the spaces at both ends, not only one end.`],
        skill: "trace" },
      {
        q: md`What does this show?`,
        code: py`
          s = "banana"
          print(s.count("a"))
        `,
        options: ["1", "3", "6"],
        answer: 1,
        explain: md`b-**a**-n-**a**-n-**a**: three a's.`,
        why: [md`«.count()» counts every «a», not only the first one.`, null, md`6 is the length of the whole word. «.count("a")» counts only the a's.`],
        skill: "trace",
      },
      {
        q: md`Careful! What does this show?`,
        code: py`
          s = "Python"
          s.upper()
          print(s)
        `,
        options: ["PYTHON", "Python"],
        answer: 1,
        explain: md`«s.upper()» made a new string, but nothing stored it. So «s» is unchanged.`,
        why: [md`The new string was not stored. You need «s = s.upper()» to keep it.`, null],
        skill: "trace",
      },
      {
        q: md`What does this program do?`,
        code: py`
          upi = input("UPI ID: ").strip().lower()
          if "@" in upi:
              print("Looks fine")
          else:
              print("A UPI ID needs @")
        `,
        options: [
          "It checks that the UPI ID has an @ sign in it",
          "It adds an @ sign to the UPI ID",
          "It checks that the UPI ID is all small letters",
        ],
        answer: 0, verify: false, mono: false,
        explain: md`«"@" in upi» is True when an «@» appears anywhere in the ID.`,
        why: [null, md`Nothing is added. «in» only checks the text.`, md`«.lower()» makes it small letters. The «if» only checks for «@».`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-city", kind: "trace", title: "Be the Computer: clean a city",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          city = "  delhi "
          city = city.strip()
          big = city.upper()
          print(city, big)
        `,
        inputs: [],
        ask: [{ line: 2, name: "city" }, { line: 3, name: "big" }, { output: true }],
        hints: [
          md`Line 2 stores the cleaned string back in «city».`,
          md`«.strip()» removes the spaces at both ends.`,
          md`«.upper()» gives a new string. «city» itself stays in small letters.`,
        ],
      },
      {
        id: "arrange-tea", kind: "parsons", title: "Arrange: a polite yes",
        task: md`Put the lines in order so the program prints «Your tea is coming!».`,
        solution: py`
          answer = "  Yes "
          clean = answer.strip().lower()
          if clean == "yes":
              print("Your tea is coming!")
        `,
        distractors: ["clean = answer.strip().upper()"],
        indent: "given",
        tests: [{ output: "Your tea is coming!" }],
        hints: [
          md`The answer comes first, then the cleaning, then the check.`,
          md`The check compares with «yes» in small letters.`,
          md`So the cleaning line uses «.lower()», not «.upper()».`,
        ],
      },
      {
        id: "shout",
        title: "Shout it",
        task: md`
          Ask for a message, then print it in capital letters with an exclamation mark on the end. For «hello there»:

          | HELLO THERE!
        `,
        starter: py`

        `,
        hints: [
          md`Store the message, then print it in capitals with «!» on the end.`,
          md`«message.upper()» gives the capitals.`,
          md`Add the «!» with an f-string: «print(f"{message.upper()}!")».`,
        ],
        solution: py`
          message = input("Say something: ")
          print(f"{message.upper()}!")
        `,
        tests: [
          { inputs: ["hello there"], output: "HELLO THERE!" },
          { inputs: ["Python is fun"], output: "PYTHON IS FUN!" },
          { inputs: ["chai time"], output: "CHAI TIME!" },
          { uses: ["method:upper"], msg: md`Use «.upper()» to make the capitals.` },
        ],
        wrong: [py`
          message = input("Say something: ")
          print(message.upper())
        `],
      },
      {
        id: "clean-name",
        title: "Tidy a name",
        task: md`
          People often type names in a messy way. Ask for a full name. Then print it neatly: no spaces at the ends, and each word starting with a capital. If the user types «   aSHA rAo  », print:

          | Asha Rao
        `,
        starter: py`

        `,
        hints: [
          md`You need two methods: one removes the outside spaces, the other fixes the capitals.`,
          md`«.strip()» removes the outside spaces. «.title()» gives each word a capital.`,
          md`«print(name.strip().title())»`,
        ],
        solution: py`
          name = input("Full name: ")
          print(name.strip().title())
        `,
        tests: [
          { inputs: ["   aSHA rAo  "], output: "Asha Rao" },
          { inputs: ["meera iyer"], output: "Meera Iyer" },
          { inputs: ["  RAVI"], output: "Ravi" },
        ],
        wrong: [py`
          name = input("Full name: ")
          print(name.title())
        `],
      },
      {
        id: "yes-no",
        title: "Yes or no?",
        optional: true,
        task: md`
          Ask «Do you like Python?». Clean the answer (ignore spaces and capitals), then print:

          - «Great!» if the answer is yes
          - «You will soon!» if the answer is no
          - «Please answer yes or no.» for anything else

          For «  YES »:

          | Great!
        `,
        starter: py`

        `,
        hints: [
          md`Clean the answer first. Then use «if», «elif» and «else».`,
          md`Clean it straight away: «answer = input("Do you like Python? ").strip().lower()».`,
          md`«if answer == "yes":» prints «Great!». «elif answer == "no":» prints «You will soon!».`,
        ],
        solution: py`
          answer = input("Do you like Python? ").strip().lower()
          if answer == "yes":
              print("Great!")
          elif answer == "no":
              print("You will soon!")
          else:
              print("Please answer yes or no.")
        `,
        tests: [
          { inputs: ["yes"], output: "Great!" },
          { inputs: ["YES"], output: "Great!" },
          { inputs: ["  yes "], output: "Great!" },
          { inputs: ["No"], output: "You will soon!" },
          { inputs: ["maybe"], output: "Please answer yes or no." },
        ],
        wrong: [py`
          answer = input("Do you like Python? ").lower()
          if answer == "yes":
              print("Great!")
          elif answer == "no":
              print("You will soon!")
          else:
              print("Please answer yes or no.")
        `],
      },
      {
        id: "chai-coffee",
        title: "Chai to coffee",
        task: md`
          Ask for a sentence. Print it with every «chai» changed to «coffee». Use «.replace()». For «I want chai and more chai»:

          | I want coffee and more coffee
        `,
        starter: py`

        `,
        solution: py`
          sentence = input("Sentence: ")
          print(sentence.replace("chai", "coffee"))
        `,
        tests: [
          { inputs: ["I want chai and more chai"], output: "I want coffee and more coffee" },
          { inputs: ["chai"], output: "coffee" },
          { inputs: ["samosa please"], output: "samosa please" },
        ],
        wrong: [py`
          sentence = input("Sentence: ")
          print(sentence.replace("coffee", "chai"))
        `],
        hints: [
          md`Store the sentence, then print a new string made with «.replace()».`,
          md`Inside the brackets: first what to find, then what to put in its place.`,
          md`«sentence.replace("chai", "coffee")»`,
        ],
      },
      {
        id: "count-wickets",
        title: "Count the wickets",
        task: md`
          A cricket over is written as 6 characters, one for each ball. «W» means a wicket, and «.» means no run. Ask for an over and print the number of wickets. Use «.count()». For «1W4.W6»:

          | Wickets: 2
        `,
        starter: py`

        `,
        solution: py`
          over = input("Over: ")
          print("Wickets:", over.count("W"))
        `,
        tests: [
          { inputs: ["1W4.W6"], output: "Wickets: 2" },
          { inputs: ["...4.6"], output: "Wickets: 0" },
          { inputs: ["WWWWWW"], output: "Wickets: 6" },
          { inputs: ["W....."], output: "Wickets: 1" },
        ],
        wrong: [
          py`
            over = input("Over: ")
            print("Wickets:", over.count("w"))
          `,
          py`
            over = input("Over: ")
            print("Wickets:", len(over))
          `,
        ],
        hints: [
          md`Store the over, then count one character in it.`,
          md`The character is a capital «W». Capital letters matter.`,
          md`«print("Wickets:", over.count("W"))»`,
        ],
      },
      {
        id: "check-mobile",
        title: "Check a mobile number",
        task: md`
          A mobile number is valid when it has only digits **and** exactly 10 characters. Ask for a number. Print «Valid number» or «Not valid». Use «.isdigit()» and «len()». For «9876543210»:

          | Valid number

          For «98765» or «98765abcde»:

          | Not valid
        `,
        starter: py`

        `,
        solution: py`
          number = input("Mobile number: ")
          if number.isdigit() and len(number) == 10:
              print("Valid number")
          else:
              print("Not valid")
        `,
        tests: [
          { inputs: ["9876543210"], output: "Valid number" },
          { inputs: ["98765"], output: "Not valid" },
          { inputs: ["98765abcde"], output: "Not valid" },
          { inputs: ["98765432101"], output: "Not valid" },
        ],
        wrong: [
          py`
            number = input("Mobile number: ")
            if number.isdigit():
                print("Valid number")
            else:
                print("Not valid")
          `,
          py`
            number = input("Mobile number: ")
            if len(number) == 10:
                print("Valid number")
            else:
                print("Not valid")
          `,
        ],
        hints: [
          md`Keep the number as text. Do not use «int()».`,
          md`Two things must both be True, so join them with «and».`,
          md`«if number.isdigit() and len(number) == 10:»`,
        ],
      },
    ],
    keys: [
      md`Methods are tools attached to values: «text.upper()», «text.lower()», «text.title()».`,
      md`«.strip()» removes spaces from both ends. It is very useful for cleaning input.`,
      md`String methods never change the string. Store the new one: «name = name.strip()».`,
      md`«.replace(old, new)», «.count(x)», «.startswith(x)», «.endswith(x)», «.isdigit()».`,
      md`«"@" in email» checks if text appears inside other text.`,
      md`«input().strip().lower()» makes answers easy to compare.`,
    ],
  });

  // ---------------------------------------------------------------- Day 13
  day({
    slug: "indexing-slicing",
    title: "Indexing and slicing",
    goal: "Pick out single characters and pieces of text by their position.",
    minutes: 45,
    win: "Today you can now take out one character or a piece of a string by its position.",
    learn: [
      md`
        ## Every character has a position
        A **character** is one letter, digit, space or sign in a string. Each character has a numbered position, called its **index**. Python starts counting at **0**, not 1. Negative numbers count backwards from the end:

        |  P   Y   T   H   O   N
        |  0   1   2   3   4   5
        | -6  -5  -4  -3  -2  -1

        Use square brackets to get the character at a position. Guess first:
      `,
      ex(py`
        word = "PYTHON"
        print(word[0])
        print(word[1])
        print(word[-1])
      `, { predict: ["P\nY\nN", "Y\nP\nN", "P\nY\nO"], answer: 0 }),
      md`
        «word[-1]» is the last character. «word[-2]» is the one before it.

        You can also use an index straight on quoted text: «"Delhi"[0]» is «D». An index gives a string, so you can use a string method on it:
      `,
      ex(py`
        word = "PYTHON"
        print(word[0].lower())
        print("Delhi"[0])
      `, { predict: ["p\nD", "P\nD", "p\nd"], answer: 0 }),
      md`
        ## Going too far
        "PYTHON" has 6 characters, so the positions are 0 to 5. Position 6 does not exist. Guess what happens:
      `,
      ex(py`
        word = "PYTHON"
        print(word[6])
      `, { error: true, label: "A crash on purpose", predict: ["IndexError", "N", "P"], answer: 0 }),
      md`
        Python stops with an «IndexError». The last position is always one less than the length.
      `,
      pause(md`This is the end of the first sitting. The second sitting takes out longer pieces of a string.`),
      md`
        ## Slicing: taking a piece
        «word[start:end]» takes the characters from «start» up to, **but not including**, «end». Here «start» and «end» stand for numbers. You type the numbers. Guess first:
      `,
      ex(py`
        word = "PYTHON"
        print(word[0:2])
        print(word[2:5])
      `, { predict: ["PY\nTHO", "PYT\nTHON", "P\nTH"], answer: 0 }),
      md`You can leave out a number:`,
      ex(py`
        word = "PYTHON"
        print(word[:3])
        print(word[3:])
        print(word[-3:])
      `, { predict: ["PYT\nHON\nHON", "PY\nTHON\nHON", "PYT\nTHON\nNOH"], answer: 0 }),
      md`
        - Leave out the start, and the slice begins at the beginning: «word[:3]» is the first 3 characters.
        - Leave out the end, and it goes to the end: «word[3:]» is everything from position 3.
        - «word[-3:]» is the last 3 characters.

        It looks strange that the end position is not included. But it is useful: «word[:3] + word[3:]» gives the whole word back.

        ## Steps and reversing
        The full form is «word[start:end:step]». The step says how far to jump each time. Leave start and end empty to use the whole word. A step of «-1» goes backwards, so you get the string in reverse order. Guess first:
      `,
      ex(py`
        word = "PYTHON"
        print(word[0:6:2])
        print(word[::-1])
      `, { predict: ["PTO\nNOHTYP", "PYT\nNOHTYP", "PTO\nPYTHON"], answer: 0 }),
      md`
        ## You cannot change one letter inside a string
        Strings cannot be changed, so this gives an error:
      `,
      ex(py`
        word = "python"
        word[0] = "P"
      `, { error: true }),
      md`Instead, make a new string from the pieces you want:`,
      ex(py`
        word = "python"
        word = "P" + word[1:]
        print(word)
      `),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`print("Python"[0])`, options: ["P", "y", "Python"], answer: 0,
        explain: md`Counting starts at 0, so position 0 is the first character.`,
        why: [null, md`«y» is at position 1. Python starts counting at 0.`, md`An index gives one character, not the whole string.`],
        skill: "trace" },
      { q: md`What does this show?`, code: py`print("Python"[-1])`, options: ["P", "n", "o"], answer: 1,
        explain: md`«-1» is the last character.`,
        why: [md`«P» is at position 0. Negative positions count from the end.`, null, md`«o» is at «-2». «-1» is the very last character.`],
        skill: "trace" },
      { q: md`What does this show?`, code: py`print("Python"[1:4])`, options: ["Pyt", "yth", "ytho"], answer: 1,
        explain: md`Positions 1, 2 and 3. The end position 4 is not included.`,
        why: [md`The slice starts at position 1, which is «y».`, null, md`The end position 4 («o») is not included.`],
        skill: "trace" },
      { q: md`What does this show?`, code: py`print("Python"[::-1])`, options: ["nohtyP", "Python", "P"], answer: 0,
        explain: md`A step of -1 goes backwards, so the string comes out reversed.`,
        why: [null, md`A step of «-1» goes backwards, so the order changes.`, md`With no start and no end, the slice uses the whole string.`],
        skill: "trace" },
      {
        q: md`What does this program do?`,
        code: py`
          name = input("Name: ")
          print(name[:3].upper())
        `,
        options: [
          "It prints the first 3 letters of the name in capitals",
          "It prints the name 3 times in capitals",
          "It prints the last 3 letters of the name in capitals",
        ],
        answer: 0, verify: false, mono: false,
        explain: md`«name[:3]» is the first 3 characters. «.upper()» makes them capitals.`,
        why: [null, md`That would need «*». Square brackets take out a piece.`, md`The last 3 would be «name[-3:]».`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-mumbai", kind: "trace", title: "Be the Computer: pieces of a city",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          word = "MUMBAI"
          first = word[0]
          last = word[-1]
          middle = word[1:3]
          print(first, middle, last)
        `,
        inputs: [],
        ask: [{ line: 2, name: "first" }, { line: 4, name: "middle" }, { output: true }],
        hints: [
          md`Write the positions under the letters: M is 0, U is 1, and so on.`,
          md`«word[1:3]» takes positions 1 and 2, not 3.`,
          md`«word[-1]» is the last letter.`,
        ],
      },
      {
        id: "arrange-code", kind: "parsons", title: "Arrange: a city code",
        task: md`Put the lines in order so the program prints «Code: CHE».`,
        solution: py`
          city = "Chennai"
          code = city[:3].upper()
          print("Code:", code)
        `,
        distractors: ["code = city[3:].upper()"],
        indent: "given",
        tests: [{ output: "Code: CHE" }],
        hints: [
          md`The city comes first, then the code, then the print.`,
          md`The code is the first 3 letters in capitals.`,
          md`«city[:3]» is the first 3 letters. «city[3:]» is the rest.`,
        ],
      },
      {
        id: "initials",
        title: "Initials",
        task: md`
          Ask for a first name, then a last name. Print the initials as capital letters, each followed by a dot. For «asha» and «rao»:

          | A.R.
        `,
        starter: py`

        `,
        hints: [
          md`Store both names. Take the first letter of each, make it a capital, and add a dot.`,
          md`The first letter of a name is «first[0]». «first[0].upper()» makes it a capital.`,
          md`«print(f"{first[0].upper()}.{last[0].upper()}.")»`,
        ],
        solution: py`
          first = input("First name: ")
          last = input("Last name: ")
          print(f"{first[0].upper()}.{last[0].upper()}.")
        `,
        tests: [
          { inputs: ["asha", "rao"], output: "A.R." },
          { inputs: ["Meera", "Iyer"], output: "M.I." },
          { inputs: ["nitin", "patil"], output: "N.P." },
        ],
        wrong: [py`
          first = input("First name: ")
          last = input("Last name: ")
          print(f"{first[0]}.{last[0]}.")
        `],
      },
      {
        id: "palindrome",
        title: "Palindrome checker",
        task: md`
          A **palindrome** reads the same backwards as forwards, like «malayalam» or «Nitin». Ask for a word, and print «Palindrome» or «Not a palindrome». Ignore capital letters. For «Nitin»:

          | Palindrome

          For «python»:

          | Not a palindrome
        `,
        starter: py`

        `,
        hints: [
          md`Make the word all small letters. Then compare it with its reverse.`,
          md`Make it all small letters first: «word = input("Word: ").lower()».`,
          md`Compare the word with its reverse: «if word == word[::-1]:».`,
        ],
        solution: py`
          word = input("Word: ").lower()
          if word == word[::-1]:
              print("Palindrome")
          else:
              print("Not a palindrome")
        `,
        tests: [
          { inputs: ["malayalam"], output: "Palindrome" },
          { inputs: ["Nitin"], output: "Palindrome" },
          { inputs: ["level"], output: "Palindrome" },
          { inputs: ["Racecar"], output: "Palindrome" },
          { inputs: ["python"], output: "Not a palindrome" },
          { inputs: ["Noon"], output: "Palindrome" },
          { inputs: ["ab"], output: "Not a palindrome" },
        ],
        wrong: [py`
          word = input("Word: ")
          if word == word[::-1]:
              print("Palindrome")
          else:
              print("Not a palindrome")
        `],
      },
      {
        id: "vehicle-number",
        title: "Read a vehicle number",
        task: md`
          A vehicle number like «DL01AB1234» has parts. Ask for a vehicle number. Print the state (the first 2 characters), the district (positions 2 and 3) and the last 4 characters. Use slices. For «DL01AB1234»:

          | State: DL
          | District: 01
          | Number: 1234
        `,
        starter: py`

        `,
        solution: py`
          number = input("Vehicle number: ")
          print("State:", number[:2])
          print("District:", number[2:4])
          print("Number:", number[-4:])
        `,
        tests: [
          { inputs: ["DL01AB1234"], output: "State: DL\nDistrict: 01\nNumber: 1234" },
          { inputs: ["MH12XY0042"], output: "State: MH\nDistrict: 12\nNumber: 0042" },
          { inputs: ["KA05M7777"], output: "State: KA\nDistrict: 05\nNumber: 7777" },
        ],
        wrong: [
          py`
            number = input("Vehicle number: ")
            print("State:", number[:2])
            print("District:", number[2:3])
            print("Number:", number[-4:])
          `,
          py`
            number = input("Vehicle number: ")
            print("State:", number[:2])
            print("District:", number[2:4])
            print("Number:", number[6:])
          `,
        ],
        hints: [
          md`Three «print» lines, one slice in each.`,
          md`Positions 2 and 3 are «number[2:4]», because the end is not included.`,
          md`The last 4 characters are «number[-4:]».`,
        ],
      },
      {
        id: "email-name",
        title: "Bonus: use a ready-made method, find()",
        optional: true,
        task: md`
          «.find()» is a ready-made method. «email.find("@")» gives the index of the first «@». A slice can use a variable that holds a number, like «email[:at]». Ask for an email. Print the part before the «@», using «.find()» and a slice. For «asha.rao@example.com»:

          | Name: asha.rao
        `,
        starter: py`

        `,
        solution: py`
          email = input("Email: ")
          at = email.find("@")
          print("Name:", email[:at])
        `,
        tests: [
          { inputs: ["asha.rao@example.com"], output: "Name: asha.rao" },
          { inputs: ["ravi99@mail.in"], output: "Name: ravi99" },
          { inputs: ["a@b.in"], output: "Name: a" },
          { uses: ["method:find"], msg: md`Use «.find("@")» to get the position of the «@».` },
        ],
        wrong: [py`
          email = input("Email: ")
          at = email.find("@")
          print("Name:", email[:at + 1])
        `],
        hints: [
          md`First find the position of «@». Then slice up to it.`,
          md`«at = email.find("@")» stores the position.`,
          md`«email[:at]» stops just before the «@».`,
        ],
      },
      {
        id: "hide-number",
        title: "Hide a phone number",
        task: md`
          Apps often hide most of a phone number for privacy. Ask for a number and print it with every character except the **last 4** replaced by «*». Keep it as text. Do not use «int()». For «9876543210»:

          | ******3210
        `,
        starter: py`

        `,
        hints: [
          md`First print only the last 4 characters: «number[-4:]».`,
          md`How many stars? The length minus 4: «"*" * (len(number) - 4)».`,
          md`Join the stars and the last 4 characters with «+».`,
        ],
        solution: py`
          number = input("Phone number: ")
          print("*" * (len(number) - 4) + number[-4:])
        `,
        tests: [
          { inputs: ["9876543210"], output: "******3210" },
          { inputs: ["12345"], output: "*2345" },
          { inputs: ["5551234"], output: "***1234" },
          { inputs: ["1234"], output: "1234" },
        ],
        wrong: [py`
          number = input("Phone number: ")
          print("******" + number[-4:])
        `],
      },
    ],
    keys: [
      md`Positions start at 0: «word[0]» is the first character.`,
      md`«word[-1]» is the last character.`,
      md`«word[2:5]» takes positions 2, 3 and 4. The end position is not included.`,
      md`«word[:3]» starts at the beginning. «word[3:]» goes to the end. «word[::-1]» reverses.`,
      md`You cannot change a letter inside a string. Make a new string instead.`,
    ],
  });

  // ---------------------------------------------------------------- Day 14
  day({
    slug: "week-2-project",
    title: "Project day: decisions",
    goal: "Use everything from Week 2 to build a health calculator and a quiz game, then fix two broken programs.",
    minutes: 45,
    kind: "project",
    win: "Today you can now build and test programs that make decisions.",
    learn: [
      md`
        ## What you learned in Week 2
        - Comparisons («== != < > <= >=») give «True» or «False».
        - «if», «elif» and «else» choose which block runs.
        - «and», «or» and «not» join conditions.
        - String methods clean text and check text. Indexes and slices take out parts of a string.

        ## Testing a program that makes decisions
        A program with «if/elif/else» can run in different ways. To be sure it works, test every way. Also test the **edge values**. An edge value is the exact number where the answer changes. For the program below, good test temperatures are 40, 35, 34, 25, 24, 15, 14 and -5.
      `,
      ex(py`
        temp = int(input("Temperature in °C? "))
        if temp >= 35:
            print("Very hot. Stay inside.")
        elif temp >= 25:
            print("Warm. Wear light clothes.")
        elif temp >= 15:
            print("Pleasant weather.")
        else:
            print("Cold. Take a jacket.")
      `, { inputs: ["35"] }),
      md`
        35 is an edge: it is the lowest Very hot number. 34 is just below it. Run the program once for each number in the list.
      `,
      tip(md`The exercise checker does the same thing. It runs your program with many answers. It also tries the edge values.`),
      md`
        ## Today's plan
        First, Be the Computer. Then build a BMI calculator and a quiz game. Rock, paper, scissors is a bonus, marked "finish later". Last, two Bug Clinics: find the faulty line and fix it.
      `,
      pause(md`The project can take two sittings. A good place to stop is after the quiz game.`),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          s = "hello"
          print(s[1:3].upper())
        `,
        options: ["EL", "HE", "ELL"],
        answer: 0,
        explain: md`«s[1:3]» is «"el"» (positions 1 and 2). Then «.upper()» makes it «EL».`,
        why: [null, md`The slice starts at position 1, which is «e».`, md`The end position 3 is not included.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          age = 16
          print(age >= 13 and age <= 19)
        `,
        options: ["True", "False"],
        answer: 0,
        explain: md`16 is between 13 and 19, so both sides are True.`,
        why: [null, md`Check each side: «16 >= 13» is True and «16 <= 19» is True.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          word = "Level"
          print(word.lower() == word[::-1].lower())
        `,
        options: ["True", "False"],
        answer: 0,
        explain: md`Both sides become «"level"», so they are equal.`,
        why: [null, md`«.lower()» is used on both sides, so the capital L does not matter.`],
        skill: "trace",
      },
      {
        q: md`What does this program do?`,
        code: py`
          score = 0
          answer = input("2 + 2 = ").strip()
          if answer == "4":
              score += 1
          print("Score:", score)
        `,
        options: [
          "It asks one question and gives 1 point for the right answer",
          "It adds 2 and 2 and prints 4",
          "It always prints Score: 1",
        ],
        answer: 0, verify: false, mono: false,
        explain: md`«score» goes up by 1 only when the answer is «4».`,
        why: [null, md`«"2 + 2 = "» is only the question text. Python does not add it.`, md`For a wrong answer, «score += 1» is skipped, so it prints «Score: 0».`],
        skill: "read",
      },
      {
        q: md`Which pair of ages is the best test for this program?`,
        code: py`
          age = int(input("Age: "))
          if age < 18:
              print("Child ticket")
          else:
              print("Adult ticket")
        `,
        options: ["17 and 18", "5 and 50", "1 and 100"],
        answer: 0, verify: false, mono: false,
        explain: md`The answer changes between 17 and 18. These edge values catch a «<=» mistake.`,
        why: [null, md`5 and 50 test both ways, but they miss the edge where the answer changes.`, md`1 and 100 are far from 18, so a «<=» mistake would still pass.`],
        skill: "debug",
      },
    ],
    practice: [
      {
        id: "trace-score", kind: "trace", title: "Be the Computer: keeping score",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          score = 0
          answer = "Delhi"
          if answer == "Delhi":
              score += 1
          answer = "mars"
          if answer == "jupiter":
              score += 1
          print("Score:", score)
        `,
        inputs: [],
        ask: [{ line: 4, name: "score" }, { output: true }],
        hints: [
          md`Write «score» on paper. Start it at 0.`,
          md`The first «if» is True, so line 4 adds 1.`,
          md`The second «if» is False, so line 7 never runs.`,
        ],
      },
      {
        id: "bmi",
        title: "BMI calculator",
        task: md`
          Body Mass Index is «weight ÷ height²» (weight in kg, height in metres). Ask for the weight, then the height (both may have decimals). Print the BMI with 1 decimal place, then the category on the next line:

          - below 18.5: «Underweight»
          - below 25: «Normal»
          - below 30: «Overweight»
          - otherwise: «Obese»

          Choose the category with the full «bmi» number, not the rounded one you print. For a weight of 70 and a height of 1.75:

          | BMI: 22.9
          | Normal
        `,
        starter: py`

        `,
        hints: [
          md`Use «float(input(...))» for both. «height ** 2» squares the height.`,
          md`Print with «f"BMI: {bmi:.1f}"». Then use an «if/elif/else» chain on the full «bmi» number, not the 1-decimal version you printed.`,
          md`«bmi = weight / height ** 2», then «if bmi < 18.5:», «elif bmi < 25:», «elif bmi < 30:» and «else:».`,
        ],
        solution: py`
          weight = float(input("Weight in kg: "))
          height = float(input("Height in metres: "))
          bmi = weight / height ** 2
          print(f"BMI: {bmi:.1f}")
          if bmi < 18.5:
              print("Underweight")
          elif bmi < 25:
              print("Normal")
          elif bmi < 30:
              print("Overweight")
          else:
              print("Obese")
        `,
        tests: [
          { inputs: ["70", "1.75"], output: "BMI: 22.9\nNormal" },
          { inputs: ["50", "1.8"], output: "BMI: 15.4\nUnderweight" },
          { inputs: ["85", "1.7"], output: "BMI: 29.4\nOverweight" },
          { inputs: ["100", "1.7"], output: "BMI: 34.6\nObese" },
          { inputs: ["18.5", "1"], output: "BMI: 18.5\nNormal" },
          { inputs: ["25", "1"], output: "BMI: 25.0\nOverweight" },
          { inputs: ["30", "1"], output: "BMI: 30.0\nObese" },
          { inputs: ["72.13", "1.7"], output: "BMI: 25.0\nNormal" },
        ],
        wrong: [
          py`
            weight = float(input("Weight in kg: "))
            height = float(input("Height in metres: "))
            bmi = weight / height ** 2
            print(f"BMI: {bmi:.1f}")
            if bmi <= 18.5:
                print("Underweight")
            elif bmi <= 25:
                print("Normal")
            elif bmi <= 30:
                print("Overweight")
            else:
                print("Obese")
          `,
          py`
            weight = float(input("Weight in kg: "))
            height = float(input("Height in metres: "))
            bmi = round(weight / height ** 2, 1)
            print(f"BMI: {bmi:.1f}")
            if bmi < 18.5:
                print("Underweight")
            elif bmi < 25:
                print("Normal")
            elif bmi < 30:
                print("Overweight")
            else:
                print("Obese")
          `,
        ],
      },
      {
        id: "quiz-game",
        title: "Quiz game",
        task: md`
          Ask these three questions in order:

          1. «What is the capital of India?» Answer: new delhi
          2. «What is 5 x 6?» Answer: 30
          3. «Which planet is the largest?» Answer: jupiter

          Ignore capital letters and extra spaces in the answers. After each answer, print «Correct!» or «Wrong!». At the end, print the score, like:

          | You scored 2 out of 3

          The first question is done for you. Copy its pattern for questions 2 and 3.
        `,
        starter: py`
          score = 0

          answer = input("What is the capital of India? ").strip().lower()
          if answer == "new delhi":
              print("Correct!")
              score += 1
          else:
              print("Wrong!")

        `,
        hints: [
          md`Clean each answer with «.strip().lower()» before comparing.`,
          md`When an answer is right, print «Correct!» and add one to the score: «score += 1».`,
          md`Finish with «print(f"You scored {score} out of 3")».`,
        ],
        solution: py`
          score = 0

          answer = input("What is the capital of India? ").strip().lower()
          if answer == "new delhi":
              print("Correct!")
              score += 1
          else:
              print("Wrong!")

          answer = input("What is 5 x 6? ").strip()
          if answer == "30":
              print("Correct!")
              score += 1
          else:
              print("Wrong!")

          answer = input("Which planet is the largest? ").strip().lower()
          if answer == "jupiter":
              print("Correct!")
              score += 1
          else:
              print("Wrong!")

          print(f"You scored {score} out of 3")
        `,
        tests: [
          { inputs: ["New Delhi", "30", "Jupiter"], output: "Correct!\nCorrect!\nCorrect!\nYou scored 3 out of 3" },
          { inputs: ["delhi", " 30 ", "mars"], output: "Wrong!\nCorrect!\nWrong!\nYou scored 1 out of 3" },
          { inputs: ["  NEW DELHI", "31", "JUPITER "], output: "Correct!\nWrong!\nCorrect!\nYou scored 2 out of 3" },
        ],
        wrong: [py`
          score = 0

          answer = input("What is the capital of India? ").strip().lower()
          if answer == "new delhi":
              print("Correct!")
              score += 1
          else:
              print("Wrong!")

          answer = input("What is 5 x 6? ")
          if answer == "30":
              print("Correct!")
              score += 1
          else:
              print("Wrong!")

          answer = input("Which planet is the largest? ").strip().lower()
          if answer == "jupiter":
              print("Correct!")
              score += 1
          else:
              print("Wrong!")

          print(f"You scored {score} out of 3")
        `],
      },
      {
        id: "rock-paper-scissors",
        title: "Bonus: rock, paper, scissors",
        optional: true,
        task: md`
          Ask Player 1 for their choice, then Player 2 (each types «rock», «paper» or «scissors» in small letters). Print «Player 1 wins», «Player 2 wins» or «Draw».

          Rock beats scissors, scissors beats paper, and paper beats rock. For «rock» and «scissors»:

          | Player 1 wins
        `,
        starter: py`
          p1 = input("Player 1: ")
          p2 = input("Player 2: ")

        `,
        hints: [
          md`Check for a draw first: «if p1 == p2:».`,
          md`Write one «elif» for each way Player 1 can win, using «and»: «elif p1 == "rock" and p2 == "scissors":».`,
          md`If it is not a draw and Player 1 did not win, Player 2 must have won. That is your «else».`,
        ],
        solution: py`
          p1 = input("Player 1: ")
          p2 = input("Player 2: ")
          if p1 == p2:
              print("Draw")
          elif p1 == "rock" and p2 == "scissors":
              print("Player 1 wins")
          elif p1 == "scissors" and p2 == "paper":
              print("Player 1 wins")
          elif p1 == "paper" and p2 == "rock":
              print("Player 1 wins")
          else:
              print("Player 2 wins")
        `,
        tests: [
          { inputs: ["rock", "scissors"], output: "Player 1 wins" },
          { inputs: ["scissors", "rock"], output: "Player 2 wins" },
          { inputs: ["paper", "rock"], output: "Player 1 wins" },
          { inputs: ["rock", "paper"], output: "Player 2 wins" },
          { inputs: ["scissors", "paper"], output: "Player 1 wins" },
          { inputs: ["paper", "scissors"], output: "Player 2 wins" },
          { inputs: ["paper", "paper"], output: "Draw" },
          { inputs: ["rock", "rock"], output: "Draw" },
          { inputs: ["scissors", "scissors"], output: "Draw" },
        ],
        wrong: [py`
          p1 = input("Player 1: ")
          p2 = input("Player 2: ")
          if p1 == "rock" and p2 == "scissors":
              print("Player 1 wins")
          elif p1 == "scissors" and p2 == "paper":
              print("Player 1 wins")
          elif p1 == "paper" and p2 == "rock":
              print("Player 1 wins")
          else:
              print("Player 2 wins")
        `],
      },
      {
        id: "bug-pass-mark",
        kind: "bug",
        title: "Bug Clinic: 33 marks should pass",
        task: md`
          The pass mark is 33, so 33 marks should print «Pass». This program prints «Fail» for 33. Tap the faulty line, then fix it.
        `,
        starter: py`
          marks = int(input("Marks: "))
          if marks > 33:
              print("Pass")
          else:
              print("Fail")
        `,
        bugLines: [2],
        solution: py`
          marks = int(input("Marks: "))
          if marks >= 33:
              print("Pass")
          else:
              print("Fail")
        `,
        tests: [
          { inputs: ["33"], output: "Pass" },
          { inputs: ["32"], output: "Fail" },
          { inputs: ["80"], output: "Pass" },
          { inputs: ["0"], output: "Fail" },
        ],
        wrong: [py`
          marks = int(input("Marks: "))
          if marks >= 32:
              print("Pass")
          else:
              print("Fail")
        `],
        hints: [
          md`Run it with 33. The edge value shows the bug.`,
          md`Look at the comparison on line 2. Does it let 33 pass?`,
          md`«>» leaves out 33. Use «>=».`,
        ],
      },
      {
        id: "bug-ticket-age",
        kind: "bug",
        title: "Bug Clinic: the program crashes",
        task: md`
          This program should print «Adult ticket: ₹100» for ages 18 and over, and «Child ticket: ₹50» for the rest. It stops with an error. Read the error, tap the faulty line, then fix it.
        `,
        starter: py`
          age = input("Age: ")
          if age >= 18:
              print("Adult ticket: ₹100")
          else:
              print("Child ticket: ₹50")
        `,
        bugLines: [1, 2],
        solution: py`
          age = int(input("Age: "))
          if age >= 18:
              print("Adult ticket: ₹100")
          else:
              print("Child ticket: ₹50")
        `,
        tests: [
          { inputs: ["18"], output: "Adult ticket: ₹100" },
          { inputs: ["17"], output: "Child ticket: ₹50" },
          { inputs: ["60"], output: "Adult ticket: ₹100" },
          { inputs: ["5"], output: "Child ticket: ₹50" },
        ],
        wrong: [py`
          age = int(input("Age: "))
          if age > 18:
              print("Adult ticket: ₹100")
          else:
              print("Child ticket: ₹50")
        `],
        hints: [
          md`The error is a «TypeError». It means text is compared with a number.`,
          md`«input()» always gives text. Line 1 keeps it as text.`,
          md`Change line 1 to «age = int(input("Age: "))».`,
        ],
      },
    ],
    keys: [
      md`Test every path of an «if/elif/else», plus the edge values where the answer changes.`,
      md`Clean input with «.strip().lower()» before comparing it.`,
      md`Keep score with a variable that starts at 0 and goes up with «+= 1».`,
      md`Put brackets around each part of a long «and/or» condition to keep it clear.`,
    ],
  });
})();
