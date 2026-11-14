// Week 6 — Real-world tools: errors, modules, files, classes, final project.
(function () {
  const { day, md, py, ex, tip, warn, ask, pause } = window.Course;

  // ---------------------------------------------------------------- Day 36
  day({
    slug: "try-except",
    title: "Handling errors: try and except",
    goal: "Your program will not stop when a known error happens. You tell Python what to do instead.",
    minutes: 45,
    needs: [19, 32],
    win: "Today you can now catch an error by its name, and ask again until the answer can be used.",
    learn: [
      md`
        ## When a program stops with an error

        Until now, your programs stop with an error if the user types something wrong. This sudden stop is called a **crash**. Guess what happens when the user types «twenty»:
      `,
      ex(py`
        age = int(input("Age? "))
        print(f"Next year you will be {age + 1}.")
      `, { error: true, inputs: ["twenty"], predict: ["ValueError", "Next year you will be 21.", "Next year you will be twenty1."], answer: 0 }),
      md`
        Look at the last line of the error message. The first word is the **name** of the error: «ValueError». It means the text cannot become a number.

        Dividing by zero gives a different error. Guess its name:
      `,
      ex(py`
        cups = 0
        print(100 / cups)
      `, { error: true, predict: ["ZeroDivisionError", "0", "ValueError"], answer: 0 }),
      md`
        Python has a name for each kind of error. Here are four you will meet:

        - «ValueError»: the text cannot become a number, like «int("twenty")».
        - «ZeroDivisionError»: you divided by 0.
        - «KeyError»: the dictionary has no such key.
        - «IndexError»: the list has no item at that position.

        ## try and except

        Put the code that may fail inside a «try» block. If an error happens there, Python goes to the «except» block for that error. The program does not stop. Guess what it prints when the user types «twenty»:
      `,
      ex(py`
        try:
            age = int(input("Age? "))
            print(f"Next year you will be {age + 1}.")
        except ValueError:
            print("That is not a whole number!")
        print("Goodbye.")
      `, { inputs: ["twenty"], predict: ["That is not a whole number!\nGoodbye.", "Next year you will be 21.\nGoodbye.", "ValueError"], answer: 0 }),
      md`
        To **catch** an error means: Python sees the error, does not stop, and runs your «except» code instead. After the «except» block, the program carries on. That is why «Goodbye.» is printed.

        Press **Step through** and type a word. Python leaves the «try» block as soon as «int()» fails. The «print» inside «try» never runs.
      `,
      ask({
        q: md`In the program above, the user types «30». What runs?`,
        options: [
          "Both lines inside «try», then «Goodbye.»",
          "Only the «except» block, then «Goodbye.»",
          "Every line, including the «except» block",
        ],
        answer: 0,
        explain: md`«int("30")» works, so no error happens. Python skips the «except» block.`,
        why: [null, md`«except» runs only when an error happens. «int("30")» works.`, md`The «except» block is skipped when there is no error.`],
      }),
      pause(md`Good place for a break. The second part is about asking again, and catching different errors.`),
      md`
        ## Asking again, and different errors

        To ask until the answer can be used, put «try» inside «while True». The «break» runs only if «int()» worked. Guess what it prints when the user types «twenty», then «25»:
      `,
      ex(py`
        while True:
            try:
                age = int(input("Age? "))
                break
            except ValueError:
                print("Please type a whole number, like 25.")
        print(f"Thanks! You are {age}.")
      `, { inputs: ["twenty", "25"], predict: ["Please type a whole number, like 25.\nThanks! You are 25.", "Thanks! You are 25.", "Please type a whole number, like 25.\nPlease type a whole number, like 25.\nThanks! You are 25."], answer: 0 }),
      md`
        Only functions make local variables (Day 33). «while» and «try» do not, so «age» still exists after the loop.

        A missing dictionary key gives «KeyError». Catch it in the same way:
      `,
      ex(py`
        prices = {"chai": 10, "samosa": 15}
        item = input("Item: ")
        try:
            print("Price:", prices[item])
        except KeyError:
            print("Sorry, no", item, "today.")
      `, { inputs: ["dosa"], predict: ["Sorry, no dosa today.", "Price: 0", "KeyError"], answer: 0 }),
      md`One «try» can have several «except» blocks. Each error gets its own message. Python runs only the block whose name matches the error. Guess what it prints when the user types «0»:`,
      ex(py`
        text = input("Share 100 rupees among how many people? ")
        try:
            print(100 / int(text))
        except ValueError:
            print("That is not a whole number.")
        except ZeroDivisionError:
            print("You cannot divide by zero.")
      `, { inputs: ["0"], predict: ["You cannot divide by zero.", "That is not a whole number.", "That is not a whole number.\nYou cannot divide by zero."], answer: 0 }),
      md`«int("0")» works, so there is no «ValueError». Then «100 / 0» gives «ZeroDivisionError». Run it again and type «4», then «four».`,
      tip(md`If two errors need the same message, put both names in brackets: «except (ValueError, ZeroDivisionError):».`),
      warn(md`
        **Always write the name of the error.** An «except:» with no error name hides almost every error. It also hides real mistakes in your code. The program seems to work, but the answers can be wrong, and you will not know why.

        Keep the «try» block short: the line that can fail, and the lines that need its result.
      `),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          try:
              x = int("abc")
              print("A")
          except ValueError:
              print("B")
        `,
        options: ["B", "A\nB", "A"],
        answer: 0,
        explain: md`«int("abc")» fails, so Python goes straight to «except». «print("A")» never runs.`,
        why: [null, md`«print("A")» comes after the line that fails. Python skips it.`, md`The error happens, so the «except» block runs and prints «B».`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          try:
              x = int("5")
              print("A")
          except ValueError:
              print("B")
        `,
        options: ["A", "B", "A\nB"],
        answer: 0,
        explain: md`No error happens, so the «except» block is skipped.`,
        why: [null, md`«int("5")» works. «except» runs only when an error happens.`, md`With no error, the «except» block does not run.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          try:
              print(10 / 0)
          except ZeroDivisionError:
              print("oops")
          print("done")
        `,
        options: ["oops\ndone", "done", "oops"],
        answer: 0,
        explain: md`The error is caught, and the program carries on after the «try» and «except».`,
        why: [null, md`The division fails, so the «except» block prints «oops» first.`, md`After «except», the program carries on, so «done» is printed too.`],
        skill: "trace",
      },
      {
        q: md`What does this program do?`,
        code: py`
          marks = {"Asha": 82, "Ravi": 67}
          name = input("Name: ")
          try:
              print(marks[name])
          except KeyError:
              print("No marks for", name)
        `,
        options: [
          "It prints a student's marks, or a message if the name is not in the dictionary",
          "It adds a new student to the dictionary",
          "It prints the marks of every student",
        ],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`«marks[name]» looks up one name. A missing name gives «KeyError», which prints the message.`,
        why: [null, md`Nothing is stored. «marks[name]» only reads a value.`, md`There is no loop. It looks up only the name the user types.`],
        skill: "read",
      },
      {
        q: md`This program stops with an error. Which name goes after «except» to catch it?`,
        code: py`
          cities = ["Delhi", "Pune"]
          print(cities[2])
        `,
        options: ["IndexError", "KeyError", "ValueError"],
        answer: 0,
        error: true,
        verify: true,
        mono: true,
        explain: md`The list has positions 0 and 1 only. A missing position in a list gives «IndexError».`,
        why: [null, md`«KeyError» is for a missing key in a dictionary. This is a list.`, md`«ValueError» is for text that cannot become a number.`],
        skill: "debug",
      },
    ],
    practice: [
      {
        id: "trace-try",
        kind: "trace",
        title: "Be the Computer: good and bad answers",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          good = 0
          bad = 0
          for text in ["12", "abc", "7", "4.5"]:
              try:
                  number = int(text)
                  good += 1
              except ValueError:
                  bad += 1
          print(good, bad)
        `,
        inputs: [],
        ask: [{ line: 6, hit: 2, name: "good" }, { line: 8, hit: 1, name: "bad" }, { output: true }],
        hints: [
          md`Go through the list one item at a time. For each one, ask: can «int()» turn it into a whole number?`,
          md`If «int()» fails, line 6 is skipped and Python goes to line 8.`,
          md`«int("4.5")» fails too, because 4.5 is not a whole number.`,
        ],
      },
      {
        id: "arrange-try",
        kind: "parsons",
        title: "Arrange: next year's age",
        task: md`
          Put the lines in order and set each indent. When the user types «25», the program prints:

          | Next year: 26

          When the user types «abc», it prints:

          | Not a whole number
        `,
        solution: py`
          text = input("Age: ")
          try:
              age = int(text)
              print("Next year:", age + 1)
          except ValueError:
              print("Not a whole number")
        `,
        distractors: ["except ValueError", "age = text"],
        indent: "choose",
        tests: [
          { inputs: ["25"], output: "Next year: 26" },
          { inputs: ["abc"], output: "Not a whole number" },
          { inputs: ["0"], output: "Next year: 1" },
        ],
        hints: [
          md`Ask first. Then the «try» block, then the «except» block.`,
          md`The two lines that may fail, or need the age, go inside «try», 4 spaces in.`,
          md`«except ValueError:» needs its colon. The message under it is 4 spaces in.`,
        ],
      },
      {
        id: "safe-number",
        title: "A safe doubler",
        task: md`
          Ask for a whole number. If it is a whole number, print that number multiplied by 2. If it is not, print «That's not a whole number!». The program must not stop with an error. For «5»:

          | Double: 10

          For «abc»:

          | That's not a whole number!
        `,
        starter: py`

        `,
        hints: [
          md`Try to turn the answer into a number. If that fails, show the message instead.`,
          md`Put the «int(input(...))» line and the «print» inside «try:». Add «except ValueError:» under it.`,
          md`Inside «try»: «number = int(input("A whole number: "))» and «print("Double:", number * 2)». Under «except ValueError:», print the message.`,
        ],
        solution: py`
          try:
              number = int(input("A whole number: "))
              print("Double:", number * 2)
          except ValueError:
              print("That's not a whole number!")
        `,
        tests: [
          { inputs: ["5"], output: "Double: 10" },
          { inputs: ["abc"], output: "That's not a whole number!" },
          { inputs: ["-4"], output: "Double: -8" },
          { inputs: ["3.5"], output: "That's not a whole number!" },
          { inputs: ["0"], output: "Double: 0" },
          { uses: ["try"], msg: md`Use «try» and «except ValueError» for this one.` },
        ],
        wrong: [
          py`
            number = int(input("A whole number: "))
            print("Double:", number * 2)
          `,
          py`
            try:
                number = int(input("A whole number: "))
                print("Double:", number * 2)
            except ValueError:
                print("That's not a number!")
          `,
        ],
      },
      {
        id: "keep-asking",
        title: "Keep asking",
        task: md`
          Keep asking for a whole number until the user types one. After each answer that is not a whole number, print «Please enter a whole number.». Then print «Thanks! You entered N». For «x», «3.5», «7»:

          | Please enter a whole number.
          | Please enter a whole number.
          | Thanks! You entered 7
        `,
        starter: py`

        `,
        hints: [
          md`Repeat with «while True:». Leave the loop only when «int()» works.`,
          md`Inside the loop: a «try» with «int(input(...))» and then «break». In «except ValueError:», print the message. After the loop, print the thanks.`,
          md`The thanks line is «print(f"Thanks! You entered {number}")», with no indent, under the loop.`,
        ],
        solution: py`
          while True:
              try:
                  number = int(input("Whole number: "))
                  break
              except ValueError:
                  print("Please enter a whole number.")
          print(f"Thanks! You entered {number}")
        `,
        tests: [
          { inputs: ["x", "3.5", "7"], output: "Please enter a whole number.\nPlease enter a whole number.\nThanks! You entered 7" },
          { inputs: ["42"], output: "Thanks! You entered 42" },
          { inputs: ["", "-1"], output: "Please enter a whole number.\nThanks! You entered -1" },
          { uses: ["try"], msg: md`Use «try» and «except ValueError» inside the loop.` },
        ],
        wrong: [
          py`
            try:
                number = int(input("Whole number: "))
            except ValueError:
                print("Please enter a whole number.")
            print(f"Thanks! You entered {number}")
          `,
        ],
      },
      {
        id: "safe-divide",
        title: "Safe division",
        task: md`
          Define «safe_divide(a, b)». It returns «a / b», or «None» if «b» is zero. Use «try» and «except ZeroDivisionError». Catch only that error. For example, «safe_divide(10, 2)» gives back «5.0», and «safe_divide(7, 0)» gives back «None».
        `,
        starter: py`
          def safe_divide(a, b):

        `,
        hints: [
          md`A «return» can go inside «try». If the division fails, Python goes to «except» instead.`,
          md`Inside «try:», write «return a / b». Under it, «except ZeroDivisionError:».`,
          md`Under «except ZeroDivisionError:», write «return None», 4 spaces in.`,
        ],
        solution: py`
          def safe_divide(a, b):
              try:
                  return a / b
              except ZeroDivisionError:
                  return None
        `,
        tests: [
          {
            py: py`
              expect("safe_divide", (10, 2), 5.0)
              expect("safe_divide", (7, 0), None)
              expect("safe_divide", (0, 5), 0.0)
              expect("safe_divide", (-9, 3), -3.0)
              import ast
              handlers = [n for n in ast.walk(ast.parse(CODE)) if isinstance(n, ast.ExceptHandler)]
              assert handlers, "Use «try» and «except» for this one."
              assert all(isinstance(hd.type, ast.Name) and hd.type.id == "ZeroDivisionError" for hd in handlers), "Catch only «ZeroDivisionError», not every error."
            `,
          },
        ],
        wrong: [
          py`
            def safe_divide(a, b):
                try:
                    return a / b
                except:
                    return None
          `,
          py`
            def safe_divide(a, b):
                try:
                    return a / b
                except ZeroDivisionError:
                    return 0
          `,
        ],
      },
      {
        id: "city-position",
        kind: "modify",
        optional: true,
        title: "Change it: a city at a position",
        task: md`
          This program asks for a position in the list and prints the city there. It already catches «ValueError». But a position like «7» still stops it with «IndexError».

          Add a second «except» block. For «7», it prints:

          | No city at that position.

          For «2»:

          | City: Pune
        `,
        starter: py`
          cities = ["Delhi", "Mumbai", "Pune", "Jaipur"]
          text = input("Position (0 to 3): ")
          try:
              print("City:", cities[int(text)])
          except ValueError:
              print("Type a whole number.")
        `,
        solution: py`
          cities = ["Delhi", "Mumbai", "Pune", "Jaipur"]
          text = input("Position (0 to 3): ")
          try:
              print("City:", cities[int(text)])
          except ValueError:
              print("Type a whole number.")
          except IndexError:
              print("No city at that position.")
        `,
        tests: [
          { inputs: ["7"], output: "No city at that position." },
          { inputs: ["2"], output: "City: Pune" },
          { inputs: ["4"], output: "No city at that position." },
          { inputs: ["3"], output: "City: Jaipur" },
          { inputs: ["two"], output: "Type a whole number." },
        ],
        wrong: [
          py`
            cities = ["Delhi", "Mumbai", "Pune", "Jaipur"]
            text = input("Position (0 to 3): ")
            try:
                print("City:", cities[int(text)])
            except (ValueError, IndexError):
                print("Type a whole number.")
          `,
        ],
        hints: [
          md`Run it and type «7». Read the name of the error on the last line.`,
          md`Add the new block under the «except ValueError» block, with no indent for «except».`,
          md`«except IndexError:», then «print("No city at that position.")» 4 spaces in.`,
        ],
      },
    ],
    keys: [
      md`A **crash** is a sudden stop with an error. The first word of the last line of the message is the error's name.`,
      md`«try:» holds code that may fail. «except ValueError:» runs only if that error happens. Then the program carries on.`,
      md`«while True» with «try» and «break» keeps asking until the answer can be used.`,
      md`Common errors: «ValueError» (not a number), «ZeroDivisionError» (divided by 0), «KeyError» (no such key), «IndexError» (no such position).`,
      md`Always write the error's name after «except». An «except:» with no name hides real mistakes.`,
    ],
  });

  // ---------------------------------------------------------------- Day 37
  day({
    slug: "modules",
    title: "Modules: math and random",
    goal: "Use ready-made tools with import, and make programs that pick at random.",
    minutes: 45,
    needs: [24, 31],
    win: "Today you can now import a module, use math tools, and make programs that pick at random.",
    learn: [
      md`
        ## Modules: tools other people wrote

        A **module** is a file of Python code that other people already wrote. «import math» brings the «math» module into your program. Then write the module name, a dot, and the tool. Guess first:
      `,
      ex(py`
        import math
        print(math.sqrt(144))
        print(math.pi)
      `, { predict: ["12.0\n3.141592653589793", "12\n3.14", "144\n3.141592653589793"], answer: 0 }),
      md`
        - «math.sqrt()» gives the square root. It always gives back a float, like «12.0».
        - «math.pi» is the number π.

        Brackets mean "do an action". No brackets means "read a stored value". So «sqrt» has brackets, and «pi» does not.

        «math.ceil()» rounds up to a whole number. «math.floor()» rounds down. A number that is already whole stays the same. Guess:
      `,
      ex(py`
        import math
        print(math.ceil(4.2))
        print(math.floor(4.8))
        print(math.ceil(5.0))
      `, { predict: ["5\n4\n5", "4\n5\n5", "5\n4\n6"], answer: 0 }),
      md`
        «ceil» helps with boxes and buses. 13 samosas need 3 boxes of 6, not 2.17 boxes: «math.ceil(13 / 6)» is 3.

        With «from math import sqrt, pi» you can write «sqrt(81)». You do not need to write «math.» first:
      `,
      ex(py`
        from math import sqrt, pi
        print(sqrt(81))
        print(round(pi, 3))
      `),
      tip(md`Python comes with hundreds of modules. Together they are called the **standard library**.`),
      pause(md`Good place for a break. The second part is about the «random» module.`),
      md`
        ## Picking at random

        The «random» module gives numbers that nobody can guess. This is very good for games. «random.randint(1, 6)» gives a whole number from 1 to 6. Both 1 and 6 are included, unlike «range()».
      `,
      ex(py`
        import random
        print(random.randint(1, 6))
        print(random.choice(["chai", "coffee", "lassi"]))
        print(random.choice("SSC"))
      `),
      md`
        Run it a few times. You get different results. «random.choice()» picks one item from a list. On text, it picks one character.

        «random.shuffle(cards)» changes the order of the same list. «random.sample(names, 2)» makes a new list with 2 items picked from the old one. No item is picked twice.
      `,
      ex(py`
        import random
        cards = ["A", "K", "Q", "J", "10"]
        random.shuffle(cards)
        print(cards)
        names = ["Asha", "Ravi", "Meera", "Kabir", "Zoya"]
        print(random.sample(names, 2))
        print(random.sample(range(1, 50), 6))
      `),
      md`«range(1, 50)» can be used as a group of numbers here. The 6 means: pick 6 numbers. Now a common mistake. Guess what it prints:`,
      ex(py`
        import random
        cards = ["A", "K", "Q"]
        cards = random.shuffle(cards)
        print(cards)
      `, { predict: ["None", "['A', 'K', 'Q']", "An error"], answer: 0, label: "A common mistake" }),
      md`
        «shuffle» gives back «None», like «.sort()» on Day 23. So write «random.shuffle(cards)» on its own line.

        Computer randomness comes from a formula. The starting point of the formula is called the **seed**. The same seed gives the same numbers again. This helps when you check your program. Guess:
      `,
      ex(py`
        import random
        random.seed(42)
        print(random.randint(1, 100))
        random.seed(42)
        print(random.randint(1, 100))
      `, { predict: ["82\n82", "82\n15", "Two different numbers each time"], answer: 0 }),
      pause(md`Good place for a break. The last part shows two more modules: «statistics» and «string».`),
      md`
        ## Two more modules: statistics and string

        «statistics.mean()» gives the average you met on Day 17. «statistics.median()» gives the middle value after sorting. Guess:
      `,
      ex(py`
        import statistics
        marks = [78, 92, 65, 88, 70]
        print(statistics.mean(marks))
        print(statistics.median(marks))
      `, { predict: ["78.6\n78", "78.6\n65", "393\n78"], answer: 0 }),
      md`
        The sorted marks are 65, 70, 78, 88, 92. The middle one is 78.

        The module named «string» holds useful text. It is different from a string value. «string.digits» holds all ten digits:
      `,
      ex(py`
        import string
        print(string.digits)
        print(string.ascii_letters)
      `),
      md`«string.ascii_letters» holds the 26 small letters, then the 26 capital letters. They have no brackets, because they are stored values.`,
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          import math
          print(math.sqrt(49))
        `,
        options: ["7.0", "7", "49"],
        answer: 0,
        explain: md`«math.sqrt()» always gives back a float, so you see «7.0».`,
        why: [null, md`«sqrt» gives back a float, even when the answer is whole.`, md`«sqrt» gives the square root, not the same number.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          import math
          print(math.ceil(2.1))
        `,
        options: ["3", "2", "2.1"],
        answer: 0,
        explain: md`«ceil» rounds up to a whole number. A number that is already whole stays the same.`,
        why: [null, md`That is «math.floor()», which rounds down.`, md`«ceil» always gives a whole number.`],
        skill: "trace",
      },
      {
        q: md`What can «random.randint(1, 6)» give?`,
        options: ["Any whole number from 1 to 6, including 1 and 6", "1 to 5 only", "Any decimal between 1 and 6"],
        answer: 0,
        explain: md`Unlike «range()», «randint()» includes both ends.`,
        why: [null, md`That is how «range(1, 6)» works. «randint» includes the 6.`, md`«randint» gives whole numbers only. The «int» part means integer.`],
        skill: "memory",
      },
      {
        q: md`What does this program do?`,
        code: py`
          import random
          snacks = ["samosa", "vada pav", "poha"]
          print(random.choice(snacks))
        `,
        options: [
          "It prints one snack, picked at random",
          "It prints all three snacks in a random order",
          "It always prints samosa",
        ],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`«random.choice()» picks one item from the list.`,
        why: [null, md`That is «random.shuffle()». «choice» picks only one item.`, md`«choice» picks at random, so the snack can change each time.`],
        skill: "read",
      },
      {
        q: md`What does this show?`,
        code: py`
          import math
          print(math.floor(7.9), math.ceil(7.0))
        `,
        options: ["7 7", "8 7", "7 8"],
        answer: 0,
        explain: md`«floor» rounds 7.9 down to 7. 7.0 is already whole, so «ceil» keeps it as 7.`,
        why: [null, md`«floor» rounds down, never up.`, md`A number that is already whole stays the same with «ceil».`],
        skill: "trace",
      },
    ],
    practice: [
      {
        id: "trace-boxes",
        kind: "trace",
        title: "Be the Computer: samosa boxes",
        task: md`A box holds 6 samosas. Read the program. Answer each question without running it.`,
        code: py`
          import math
          boxes = 0
          for samosas in [10, 12, 25]:
              boxes += math.ceil(samosas / 6)
          print(boxes)
        `,
        inputs: [],
        ask: [{ line: 4, hit: 1, name: "boxes" }, { line: 4, hit: 2, name: "boxes" }, { output: true }],
        hints: [
          md`10 / 6 is about 1.67. Round it up.`,
          md`12 / 6 is 2.0. It is already whole, so «ceil» keeps 2.`,
          md`25 / 6 is about 4.17, so it needs 5 boxes. Add the three answers.`,
        ],
      },
      {
        id: "arrange-draw",
        kind: "parsons",
        title: "Arrange: a lucky draw",
        task: md`
          Put the lines in order and set each indent. The seed makes the draw the same every time. The program prints:

          | ['Ravi', 'Meera']
        `,
        solution: py`
          import random
          names = ["Asha", "Ravi", "Meera", "Kabir"]
          random.seed(3)
          winners = random.sample(names, 2)
          print(winners)
        `,
        distractors: ["winners = random.shuffle(names)", "import Random"],
        indent: "choose",
        tests: [{ output: "['Ravi', 'Meera']" }],
        hints: [
          md`The «import» line comes first. The seed comes before the draw.`,
          md`None of these lines is inside a block, so none has an indent.`,
          md`«shuffle» gives back «None». Use «sample» to pick 2 names.`,
        ],
      },
      {
        id: "circle",
        title: "Area of a circle",
        task: md`
          Ask for a circle's radius (it may have decimals). Print its area, «π × radius²», to 2 decimal places, using «math.pi». For «5»:

          | Area: 78.54
        `,
        starter: py`
          import math

        `,
        hints: [md`Three steps: ask for the radius as a decimal number, work out the area with the formula, then print it with 2 decimal places.`, md`«area = math.pi * radius ** 2»`, md`«print(f"Area: {area:.2f}")»`],
        solution: py`
          import math
          radius = float(input("Radius: "))
          area = math.pi * radius ** 2
          print(f"Area: {area:.2f}")
        `,
        tests: [
          { inputs: ["5"], output: "Area: 78.54" },
          { inputs: ["1"], output: "Area: 3.14" },
          { inputs: ["2.5"], output: "Area: 19.63" },
          { inputs: ["0"], output: "Area: 0.00" },
          { uses: ["kw:pi"], msg: md`Use «math.pi» for π. Do not type the number yourself.` },
        ],
        wrong: [
          py`
            import math
            radius = float(input("Radius: "))
            area = 3.14159 * radius ** 2
            print(f"Area: {area:.2f}")
          `,
          py`
            import math
            radius = int(input("Radius: "))
            area = math.pi * radius ** 2
            print(f"Area: {area:.2f}")
          `,
        ],
      },
      {
        id: "samosa-boxes",
        kind: "make",
        title: "Make: boxes needed",
        task: md`
          A box holds 6 samosas. Ask how many samosas there are. Print how many boxes are needed. Use «math.ceil()». For «13»:

          | Boxes: 3

          For «12»:

          | Boxes: 2
        `,
        starter: py`

        `,
        solution: py`
          import math
          samosas = int(input("Samosas: "))
          print("Boxes:", math.ceil(samosas / 6))
        `,
        tests: [
          { inputs: ["13"], output: "Boxes: 3" },
          { inputs: ["12"], output: "Boxes: 2" },
          { inputs: ["1"], output: "Boxes: 1" },
          { inputs: ["0"], output: "Boxes: 0" },
          { uses: ["call:ceil"], msg: md`Use «math.ceil()» to round up.` },
        ],
        wrong: [
          py`
            import math
            samosas = int(input("Samosas: "))
            print("Boxes:", samosas // 6)
          `,
          py`
            import math
            samosas = int(input("Samosas: "))
            print("Boxes:", round(samosas / 6))
          `,
        ],
        hints: [
          md`Import «math». Ask for the number with «int(input(...))».`,
          md`Divide by 6, then round up. 13 / 6 is about 2.17, which becomes 3.`,
          md`«print("Boxes:", math.ceil(samosas / 6))»`,
        ],
      },
      {
        id: "dice",
        title: "Roll the dice",
        task: md`
          Roll a dice 5 times in Python. Use «random.randint(1, 6)» for each roll. Print each result on its own line.
        `,
        starter: py`
          import random

        `,
        hints: [md`Roll five times: use a loop that repeats 5 times, and print one random whole number from 1 to 6 each time.`, md`«for i in range(5):»`, md`«print(random.randint(1, 6))»`],
        solution: py`
          import random
          for i in range(5):
              print(random.randint(1, 6))
        `,
        tests: [
          {
            seed: 1,
            py: py`
              assert len(LINES) == 5, f"Print exactly 5 rolls, one per line (you printed {len(LINES)} lines)."
              assert all(line.strip() in {"1", "2", "3", "4", "5", "6"} for line in LINES), "Each roll should be a whole number from 1 to 6."
            `,
          },
          {
            seed: 7,
            py: py`
              assert len(LINES) == 5 and all(line.strip() in {"1", "2", "3", "4", "5", "6"} for line in LINES), "Each roll should be a whole number from 1 to 6."
            `,
          },
          { uses: ["call:randint"] },
        ],
        wrong: [
          py`
            import random
            for i in range(4):
                print(random.randint(1, 6))
          `,
          py`
            print(1)
            print(2)
            print(3)
            print(4)
            print(5)
          `,
        ],
      },
      {
        id: "lucky-draw",
        title: "Lucky draw",
        task: md`
          Six friends enter a lucky draw for cricket tickets. Ask how many tickets there are. Use «random.sample()» to pick that many different winners. Print each winner on its own line.

          The starter sets the seed, so the draw is the same every time. For «3»:

          | Zoya
          | Meera
          | Arjun
        `,
        starter: py`
          import random
          random.seed(5)
          names = ["Asha", "Ravi", "Meera", "Kabir", "Zoya", "Arjun"]

        `,
        solution: py`
          import random
          random.seed(5)
          names = ["Asha", "Ravi", "Meera", "Kabir", "Zoya", "Arjun"]
          tickets = int(input("Tickets: "))
          for name in random.sample(names, tickets):
              print(name)
        `,
        tests: [
          { inputs: ["3"], output: "Zoya\nMeera\nArjun" },
          { inputs: ["1"], output: "Zoya" },
          { inputs: ["6"], output: "Zoya\nMeera\nArjun\nKabir\nAsha\nRavi" },
          { uses: ["call:sample"], msg: md`Use «random.sample()» so that nobody wins twice.` },
        ],
        wrong: [
          py`
            import random
            random.seed(5)
            names = ["Asha", "Ravi", "Meera", "Kabir", "Zoya", "Arjun"]
            tickets = int(input("Tickets: "))
            for i in range(tickets):
                print(random.choice(names))
          `,
          py`
            import random
            random.seed(5)
            names = ["Asha", "Ravi", "Meera", "Kabir", "Zoya", "Arjun"]
            tickets = int(input("Tickets: "))
            print(random.sample(names, tickets))
          `,
        ],
        hints: [
          md`Ask for the number with «int(input(...))». Then pick the winners.`,
          md`«random.sample(names, tickets)» gives a list. Loop over it with «for».`,
          md`«for name in random.sample(names, tickets):», then «print(name)» 4 spaces in.`,
        ],
      },
      {
        id: "password-maker",
        title: "Password maker",
        task: md`
          Define «make_password(length)». It returns a random password with that many characters. Pick each character with «random.choice()» from «string.ascii_letters + string.digits» (all letters and digits).
        `,
        starter: py`
          import random
          import string

          def make_password(length):

        `,
        hints: [md`Make one string of every letter and digit you may use. Then pick one character from it at random, as many times as the length.`, 
          md`«chars = string.ascii_letters + string.digits»`,
          md`Start with «password = ""». Loop «length» times, and each time add «random.choice(chars)». Then return «password».`,
        ],
        solution: py`
          import random
          import string

          def make_password(length):
              chars = string.ascii_letters + string.digits
              password = ""
              for i in range(length):
                  password += random.choice(chars)
              return password
        `,
        tests: [
          {
            py: py`
              import string
              allowed = set(string.ascii_letters + string.digits)
              for size in (8, 12, 1):
                  p = call("make_password", size)
                  assert isinstance(p, str), "«make_password» should return text (a string)."
                  assert len(p) == size, f"«make_password({size})» should give a password {size} characters long, but it was {len(p)}."
                  assert set(p) <= allowed, "Use only letters and digits."
              assert call("make_password", 16) != call("make_password", 16), "Two passwords should (almost always) be different. Pick the characters at random."
              assert call("make_password", 0) == "", "«make_password(0)» should give an empty string."
            `,
          },
        ],
        wrong: [
          py`
            import random
            import string

            def make_password(length):
                chars = string.ascii_letters + string.digits
                password = ""
                for i in range(length - 1):
                    password += random.choice(chars)
                return password
          `,
        ],
      },
      {
        id: "marks-summary",
        kind: "make",
        optional: true,
        title: "Make: mean and median marks",
        task: md`
          Ask for marks on one line, like «78 92 65 88 70». Use the «statistics» module. Print the mean and the median, each with 1 decimal place. For «78 92 65 88 70»:

          | Mean: 78.6
          | Median: 78.0
        `,
        starter: py`

        `,
        solution: py`
          import statistics
          marks = [int(x) for x in input("Marks: ").split()]
          print(f"Mean: {statistics.mean(marks):.1f}")
          print(f"Median: {statistics.median(marks):.1f}")
        `,
        tests: [
          { inputs: ["78 92 65 88 70"], output: "Mean: 78.6\nMedian: 78.0" },
          { inputs: ["60 70 80 90"], output: "Mean: 75.0\nMedian: 75.0" },
          { inputs: ["50"], output: "Mean: 50.0\nMedian: 50.0" },
          { inputs: ["90 10 20"], output: "Mean: 40.0\nMedian: 20.0" },
        ],
        wrong: [
          py`
            import statistics
            marks = [int(x) for x in input("Marks: ").split()]
            print(f"Mean: {statistics.mean(marks):.1f}")
            print(f"Median: {marks[len(marks) // 2]:.1f}")
          `,
        ],
        hints: [
          md`Turn the line into a list of numbers, as on Day 27.`,
          md`«[int(x) for x in input("Marks: ").split()]» gives the list.`,
          md`«f"Mean: {statistics.mean(marks):.1f}"», and the same for «median».`,
        ],
      },
    ],
    keys: [
      md`A **module** is ready-made code. «import math», then «math.sqrt(x)». Or «from math import sqrt», then «sqrt(x)».`,
      md`Brackets mean an action, like «math.sqrt(9)». No brackets means a stored value, like «math.pi».`,
      md`«math.ceil()» rounds up and «math.floor()» rounds down. A whole number stays the same.`,
      md`«random.randint(a, b)» includes both «a» and «b». «random.choice()» picks one item. «random.sample(items, k)» picks «k» different items.`,
      md`«random.shuffle(list)» mixes the same list and gives back «None». «random.seed(n)» gives the same numbers every time.`,
      md`«statistics.mean()» is the average. «statistics.median()» is the middle value after sorting.`,
    ],
  });

  // ---------------------------------------------------------------- Day 38
  day({
    slug: "files",
    title: "Files: reading and writing",
    goal: "Save data in a file and read it again. The data stays safe after your program ends.",
    minutes: 45,
    needs: [25, 36],
    win: "Today you can now write a file, read it back line by line, add to it, and read a CSV file.",
    learn: [
      md`
        ## Writing a file

        Variables disappear when a program ends. A **file** keeps data after the program ends: notes, marks, anything. «open()» opens a file. The second value in «open()» is the **mode**. It says what you want to do with the file. Mode «"w"» means write.
      `,
      tip(md`On this page, files are kept in a practice folder. When you press Run again, your files are still there. The hidden tests start with a clean folder.`),
      ex(py`
        with open("notes.txt", "w") as file:
            file.write("Buy milk\n")
            file.write("Call Ravi\n")
        print("Saved!")
      `),
      md`
        - «open("notes.txt", "w")» opens the file for writing. It makes the file. If the file already exists, it empties it first.
        - «with ... as file:» gives the open file the name «file». When the block ends, Python **closes** the file for you. Closing tells the computer you have finished with the file. Your text may not be saved until the file is closed.
        - «.write()» does not add a new line. Add «\n» yourself.

        ## Reading a file

        With no mode, «open()» opens the file for reading. «file.read()» gives the whole file as one string. Guess:
      `,
      ex(py`
        with open("notes.txt", "w") as file:
            file.write("Buy milk")
            file.write("Call Ravi")
        with open("notes.txt") as file:
            text = file.read()
        print(text)
      `, { predict: ["Buy milkCall Ravi", "Buy milk\nCall Ravi", "Call Ravi"], answer: 0 }),
      md`There is no «\n», so the two pieces join. A file holds only text. Guess what happens when you write a number:`,
      ex(py`
        with open("marks.txt", "w") as file:
            file.write(82)
      `, { error: true, predict: ["TypeError", "82", "ValueError"], answer: 0, label: "A common mistake" }),
      md`To write a number, turn it into text first, for example with an f-string: «file.write(f"{marks}\n")». When you read the file back, «82» comes back as the text «"82"». Use «int()» to make it a number again.`,
      warn(md`On your own Windows laptop, text with «₹» or Hindi letters may fail to save. There, write «open("notes.txt", "w", encoding="utf-8")». «encoding="utf-8"» tells Python how to store every letter.`),
      pause(md`Good place for a break. The second part is about reading line by line, adding to a file, and CSV files.`),
      md`
        ## Line by line, and adding to the end

        A «for» loop over a file gives one line at a time. Most lines end with «\n». Guess what this prints:
      `,
      ex(py`
        with open("notes.txt", "w") as file:
            file.write("Buy milk\nCall Ravi\n")
        with open("notes.txt") as file:
            for line in file:
                print(line)
      `, { predict: ["Buy milk\n\nCall Ravi", "Buy milk\nCall Ravi", "Buy milkCall Ravi"], answer: 0 }),
      md`
        Each line keeps its «\n», and «print» adds one more. So there is an empty line between the items. Write «print(line.strip())» to remove it.

        Mode «"a"» (append) adds new text at the end. The old text stays:
      `,
      ex(py`
        with open("log.txt", "w") as file:
            file.write("Day 1: 30 minutes\n")
        with open("log.txt", "a") as file:
            file.write("Day 2: 40 minutes\n")
        with open("log.txt") as file:
            print(file.read())
      `),
      md`Reading a file that does not exist gives «FileNotFoundError». Catch it with «try», as on Day 36. Guess:`,
      ex(py`
        try:
            with open("missing.txt") as file:
                print(file.read())
        except FileNotFoundError:
            print("No file yet. Save something first.")
      `, { predict: ["No file yet. Save something first.", "FileNotFoundError", "Nothing is printed"], answer: 0 }),
      md`
        ## CSV files

        **CSV** stands for comma-separated values. A CSV file stores a table as text: one row on each line, with commas between the values. Excel can open it. Guess:
      `,
      ex(py`
        rows = [("Asha", 82), ("Ravi", 67)]
        with open("scores.csv", "w") as file:
            for name, score in rows:
                file.write(f"{name},{score}\n")

        with open("scores.csv") as file:
            for line in file:
                name, score = line.strip().split(",")
                print(name, "needs", 100 - int(score), "more")
      `, { predict: ["Asha needs 18 more\nRavi needs 33 more", "TypeError", "Asha needs 82 more\nRavi needs 67 more"], answer: 0 }),
      md`
        Read «line.strip().split(",")» from left to right:

        1. «line» is «"Asha,82\n"».
        2. «.strip()» gives «"Asha,82"».
        3. «.split(",")» gives the list «["Asha", "82"]».

        Unpacking works on lists too, when the number of names matches. So «name» gets «"Asha"», and «score» gets the text «"82"». Use «int(score)» before any maths.
      `,
    ],
    quiz: [
      {
        q: md`What does «open("data.txt", "w")» do if data.txt already exists?`,
        options: ["Empties it and starts fresh", "Adds to the end of it", "Gives an error"],
        answer: 0,
        explain: md`«"w"» always starts with an empty file. Use «"a"» to add to the end.`,
        why: [null, md`That is mode «"a"» (append).`, md`«"w"» makes the file, or empties it. It gives no error.`],
        skill: "memory",
      },
      {
        q: md`What does this show?`,
        code: py`
          with open("t.txt", "w") as f:
              f.write("a")
              f.write("b")
          with open("t.txt") as f:
              print(f.read())
        `,
        options: ["ab", "a\nb", "b"],
        answer: 0,
        explain: md`«.write()» adds no new lines, so the file contains «ab».`,
        why: [null, md`«.write()» does not add «\n». You must add it yourself.`, md`Both writes happen inside one «with» block, so the file keeps both.`],
        skill: "trace",
      },
      {
        q: md`Why use «with open(...) as file:»?`,
        options: ["It closes the file for you", "It makes the file bigger", "It is the only way to read files"],
        answer: 0,
        explain: md`When the «with» block ends, Python closes the file, even if an error happened. Your text may not be saved until the file is closed.`,
        why: [null, md`«with» does not change the size of the file.`, md`There are other ways, but «with» is the safe way, because it closes the file.`],
        skill: "memory",
      },
      {
        q: md`What does this program do?`,
        code: py`
          count = 0
          with open("names.txt") as file:
              for line in file:
                  count += 1
          print(count)
        `,
        options: [
          "It counts the lines in names.txt",
          "It prints every name in names.txt",
          "It adds a new line to names.txt",
        ],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`The loop adds 1 for each line. Only the count is printed, at the end.`,
        why: [null, md`The names are never printed. Only «count» is.`, md`There is no mode, so the file is only read.`],
        skill: "read",
      },
      {
        q: md`What does this show?`,
        code: py`
          with open("t.txt", "w") as f:
              f.write("1")
          with open("t.txt", "a") as f:
              f.write("2")
          with open("t.txt", "w") as f:
              f.write("3")
          with open("t.txt") as f:
              print(f.read())
        `,
        options: ["3", "123", "13"],
        answer: 0,
        explain: md`The last «"w"» empties the file before writing «3».`,
        why: [null, md`Mode «"w"» empties the file first. The «1» and «2» are lost.`, md`The «"w"» on the third block empties everything, not only the «2».`],
        skill: "trace",
      },
    ],
    practice: [
      {
        id: "trace-file",
        kind: "trace",
        title: "Be the Computer: cups from a file",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          with open("cups.txt", "w") as file:
              file.write("3\n")
              file.write("5\n")
          total = 0
          with open("cups.txt") as file:
              for line in file:
                  total += int(line.strip())
          print(total)
        `,
        inputs: [],
        ask: [{ line: 7, hit: 1, name: "total" }, { line: 7, hit: 2, name: "total" }, { output: true }],
        hints: [
          md`The file has two lines: «3» and «5».`,
          md`Line 7 runs once for each line of the file.`,
          md`The first time, «total» becomes 0 + 3.`,
        ],
      },
      {
        id: "arrange-file",
        kind: "parsons",
        title: "Arrange: save and read names",
        task: md`
          Put the lines in order and set each indent. The program saves two names, then reads them back. It prints:

          | Asha
          | Ravi
        `,
        solution: py`
          with open("names.txt", "w") as file:
              file.write("Asha\n")
              file.write("Ravi\n")
          with open("names.txt") as file:
              for line in file:
                  print(line.strip())
        `,
        distractors: ["print(line)", "file.write(Asha)"],
        indent: "choose",
        tests: [{ output: "Asha\nRavi" }],
        hints: [
          md`Write the file first. Then open it again to read it.`,
          md`The two «write» lines are inside the first «with», 4 spaces in. «print» is inside the «for», 8 spaces in.`,
          md`Use «print(line.strip())», so there is no empty line between the names.`,
        ],
      },
      {
        id: "diary",
        title: "Write a diary",
        task: md`
          Write these three lines to a file called «diary.txt». Then open the file again, read it, and print what is in it:

          | Woke up early
          | Learned about files
          | Felt great
        `,
        starter: py`

        `,
        hints: [md`Two steps: first open the file for writing and write the three lines. Then open it again for reading, and print what is inside.`, 
          md`Write with «with open("diary.txt", "w") as file:» and three «file.write("...\n")» lines.`,
          md`Then a second «with open("diary.txt") as file:» block, and «print(file.read())».`,
        ],
        solution: py`
          with open("diary.txt", "w") as file:
              file.write("Woke up early\n")
              file.write("Learned about files\n")
              file.write("Felt great\n")

          with open("diary.txt") as file:
              print(file.read())
        `,
        tests: [
          {
            output: "Woke up early\nLearned about files\nFelt great",
            py: py`
              import ast
              text = file_text("diary.txt")
              assert text.split() == "Woke up early Learned about files Felt great".split() and text.count("\n") >= 2, "diary.txt should contain the three lines, each on its own line."
              opens = [n for n in ast.walk(ast.parse(CODE)) if isinstance(n, ast.Call) and getattr(n.func, "id", "") == "open"]
              assert len(opens) >= 2, "Read the file back with a second «open()». Do not print the text directly."
            `,
          },
          { uses: ["with"] },
        ],
        wrong: [
          py`
            with open("diary.txt", "w") as file:
                file.write("Woke up early\n")
                file.write("Learned about files\n")
                file.write("Felt great\n")
            print("Woke up early")
            print("Learned about files")
            print("Felt great")
            # open("diary.txt")
          `,
        ],
      },
      {
        id: "shopping-file",
        title: "Read a shopping list",
        task: md`
          The starter code creates «shopping.txt». Read it line by line. Print each item with its number, then the number of items:

          | 1. rice
          | 2. dal
          | 3. ghee
          | 4. salt
          | Items: 4
        `,
        starter: py`
          with open("shopping.txt", "w") as file:
              file.write("rice\ndal\nghee\nsalt\n")

          # Now read shopping.txt and print the numbered list

        `,
        hints: [md`The starter already made the file. Open it for reading, number each line as you print it, and count the lines as you go.`, 
          md`Open it for reading and loop over the lines, keeping a counter: «count += 1».`,
          md`Print «f"{count}. {line.strip()}"» for each line, then «print("Items:", count)».`,
        ],
        solution: py`
          with open("shopping.txt", "w") as file:
              file.write("rice\ndal\nghee\nsalt\n")

          count = 0
          with open("shopping.txt") as file:
              for line in file:
                  count += 1
                  print(f"{count}. {line.strip()}")
          print("Items:", count)
        `,
        tests: [
          { output: "1. rice\n2. dal\n3. ghee\n4. salt\nItems: 4" },
          {
            py: py`
              import ast
              opens = [n for n in ast.walk(ast.parse(CODE)) if isinstance(n, ast.Call) and getattr(n.func, "id", "") == "open"]
              assert len(opens) >= 2, "Open «shopping.txt» again with «open()» to read it."
            `,
          },
        ],
        wrong: [
          py`
            print("1. rice")
            print("2. dal")
            print("3. ghee")
            print("4. salt")
            print("Items: 4")
            # open(
          `,
          py`
            with open("shopping.txt", "w") as file:
                file.write("rice\ndal\nghee\nsalt\n")

            count = 0
            with open("shopping.txt") as file:
                for line in file:
                    count += 1
                    print(f"{count}. {line}")
            print("Items:", count)
          `,
        ],
      },
      {
        id: "save-scores",
        title: "Save and find the top score",
        task: md`
          Write each name and score from the dictionary to «scores.csv», one per line, like «Asha,82». Then read the file back, find the highest score, and print:

          | Top: Meera (91)
        `,
        starter: py`
          scores = {"Asha": 82, "Ravi": 67, "Meera": 91}

        `,
        hints: [
          md`Writing: loop over «scores.items()» and «file.write(f"{name},{score}\n")».`,
          md`Reading: split each line with «line.strip().split(",")» and convert the score with «int()».`,
          md`Keep track of the best name and score as you go (start with «best_score = -1»).`,
        ],
        solution: py`
          scores = {"Asha": 82, "Ravi": 67, "Meera": 91}
          with open("scores.csv", "w") as file:
              for name, score in scores.items():
                  file.write(f"{name},{score}\n")

          best_name = ""
          best_score = -1
          with open("scores.csv") as file:
              for line in file:
                  name, score = line.strip().split(",")
                  if int(score) > best_score:
                      best_name = name
                      best_score = int(score)
          print(f"Top: {best_name} ({best_score})")
        `,
        tests: [
          {
            output: "Top: Meera (91)",
            py: py`
              import ast
              lines = file_text("scores.csv").split()
              assert lines == ["Asha,82", "Ravi,67", "Meera,91"], "scores.csv should have one «name,score» line per person, like «Asha,82»."
              opens = [n for n in ast.walk(ast.parse(CODE)) if isinstance(n, ast.Call) and getattr(n.func, "id", "") == "open"]
              assert len(opens) >= 2, "Read the scores back from the file with a second «open()»."
            `,
          },
        ],
        wrong: [
          py`
            scores = {"Asha": 82, "Ravi": 67, "Meera": 91}
            with open("scores.csv", "w") as file:
                for name, score in scores.items():
                    file.write(f"{name},{score}")

            best_name = ""
            best_score = -1
            with open("scores.csv") as file:
                for line in file:
                    name, score = line.strip().split(",")
                    if int(score) > best_score:
                        best_name = name
                        best_score = int(score)
            print(f"Top: {best_name} ({best_score})")
          `,
        ],
      },
      {
        id: "study-log",
        title: "A study log",
        task: md`
          The starter writes the first line of a study log. Ask how many minutes you studied today. Add the line «Day 2: N minutes» to «log.txt» with mode «"a"». Then read the whole file and print it. When the user types «45»:

          | Day 1: 30 minutes
          | Day 2: 45 minutes
        `,
        starter: py`
          with open("log.txt", "w") as file:
              file.write("Day 1: 30 minutes\n")

          minutes = input("Minutes today: ")
          # Add "Day 2: ... minutes" to log.txt with mode "a"
          # Then read log.txt and print it

        `,
        solution: py`
          with open("log.txt", "w") as file:
              file.write("Day 1: 30 minutes\n")

          minutes = input("Minutes today: ")
          with open("log.txt", "a") as file:
              file.write(f"Day 2: {minutes} minutes\n")
          with open("log.txt") as file:
              print(file.read())
        `,
        tests: [
          {
            inputs: ["45"],
            output: "Day 1: 30 minutes\nDay 2: 45 minutes",
            py: py`assert file_text("log.txt").strip() == "Day 1: 30 minutes\nDay 2: 45 minutes", "log.txt should have both lines: Day 1, then Day 2."`,
          },
          { inputs: ["20"], output: "Day 1: 30 minutes\nDay 2: 20 minutes" },
          { inputs: ["0"], output: "Day 1: 30 minutes\nDay 2: 0 minutes" },
        ],
        wrong: [
          py`
            with open("log.txt", "w") as file:
                file.write("Day 1: 30 minutes\n")

            minutes = input("Minutes today: ")
            with open("log.txt", "w") as file:
                file.write(f"Day 2: {minutes} minutes\n")
            with open("log.txt") as file:
                print(file.read())
          `,
        ],
        hints: [
          md`Open the file a second time with mode «"a"». Then open it a third time to read it.`,
          md`An f-string makes the line: «f"Day 2: {minutes} minutes\n"».`,
          md`«with open("log.txt", "a") as file:», then «file.write(...)» 4 spaces in.`,
        ],
      },
      {
        id: "missing-file",
        kind: "make",
        optional: true,
        title: "Make: marks from a file, if there is one",
        task: md`
          Read numbers from «marks.txt», one number on each line, and print their total. If the file does not exist, print «No marks saved yet.». Use «try» and «except FileNotFoundError».

          When you press Run, there is no «marks.txt», so you see:

          | No marks saved yet.

          The hidden tests also try a file with «40», «55» and «70». Then it prints:

          | Total: 165
        `,
        starter: py`

        `,
        solution: py`
          try:
              total = 0
              with open("marks.txt") as file:
                  for line in file:
                      total += int(line.strip())
              print("Total:", total)
          except FileNotFoundError:
              print("No marks saved yet.")
        `,
        tests: [
          { output: "No marks saved yet." },
          { files: { "marks.txt": "40\n55\n70\n" }, output: "Total: 165" },
          { files: { "marks.txt": "90\n" }, output: "Total: 90" },
          { uses: ["try"], msg: md`Use «try» and «except FileNotFoundError».` },
        ],
        wrong: [
          py`
            total = 0
            with open("marks.txt") as file:
                for line in file:
                    total += int(line.strip())
            print("Total:", total)
          `,
          py`
            try:
                total = 0
                with open("marks.txt") as file:
                    for line in file:
                        total += 1
                print("Total:", total)
            except FileNotFoundError:
                print("No marks saved yet.")
          `,
        ],
        hints: [
          md`Put the reading part inside «try». Put the message in «except FileNotFoundError:».`,
          md`Inside «try»: start «total» at 0, open the file, and add «int(line.strip())» for each line.`,
          md`Print «"Total:"» after the «with» block, still inside «try».`,
        ],
      },
    ],
    keys: [
      md`«with open("f.txt", "w") as file:» writes. «"w"» empties the file first. «"a"» adds to the end. No mode reads.`,
      md`«file.write(text)» writes text only and adds no new line. Add «\n» yourself.`,
      md`«file.read()» reads everything. «for line in file:» reads one line at a time. Use «.strip()» on each line.`,
      md`A missing file gives «FileNotFoundError». Catch it with «try».`,
      md`CSV means comma-separated values: «name,score» on each line. Read it back with «.split(",")» and turn numbers back with «int()».`,
    ],
  });

  // ---------------------------------------------------------------- Day 39
  day({
    slug: "classes",
    title: "Classes and objects: a first look",
    goal: "Create your own kinds of objects that keep data and actions together.",
    minutes: 45,
    needs: [31, 32],
    win: "Today you can now write a class, build objects from it, and give them methods.",
    learn: [
      md`
        ## Why classes?

        Say you keep data about two cricketers. Without a class, you need «player1_name», «player1_runs», «player2_name», «player2_runs», and so on. This is hard to keep in order.

        A **class** keeps each player's data together. «class Cricketer:» is a plan for making cricketers, like the naksha of a house. One plan can make many houses. The plan alone is not a house. Guess:
      `,
      ex(py`
        class Cricketer:
            def __init__(self, name, runs):
                self.name = name
                self.runs = runs

        virat = Cricketer("Virat", 50)
        rohit = Cricketer("Rohit", 12)
        print(virat.name, virat.runs)
        print(rohit.name, rohit.runs)
      `, { predict: ["Virat 50\nRohit 12", "name runs\nname runs", "Virat 12\nRohit 50"], answer: 0 }),
      md`
        Take it slowly:

        - «Cricketer("Virat", 50)» builds one **object** from the plan. An object is one thing made from a class.
        - «__init__» (two underscores on each side) runs by itself when an object is built. It sets up the object's data.
        - Python fills «self» by itself. «"Virat"» goes to «name». «50» goes to «runs».
        - «self» means "this object". Values saved inside an object are called **attributes**.

        In «self.name = name», the «name» on the right is the parameter. It disappears when «__init__» ends (Day 33). On the left, «self.name» is saved inside the object, and it stays. Read it with a dot: «virat.name».
      `,
      md`Press **Step through** on the example above. Watch the two objects appear in the Variables panel. Now see what happens when you print the object itself:`,
      ex(py`
        class Cricketer:
            def __init__(self, name, runs):
                self.name = name
                self.runs = runs

        virat = Cricketer("Virat", 50)
        print(virat)
      `, { label: "Printing the object itself" }),
      md`It shows the class and a place in memory, like «<__main__.Cricketer object at 0x...>». This is not an error. Print the attributes instead, like «virat.name».`,
      pause(md`Good place for a break. The second part is about methods: actions that belong to a class.`),
      md`
        ## Methods: actions inside a class

        A **method** is a function written inside a class. Its first parameter is always «self». Call it with a dot, like «r.area()». Python passes «r» in as «self». Guess:
      `,
      ex(py`
        class Rectangle:
            def __init__(self, width, height):
                self.width = width
                self.height = height

            def area(self):
                return self.width * self.height

        r = Rectangle(4, 5)
        print(r.area())
        print(r.width)
      `, { predict: ["20\n4", "20\n5", "9\n4"], answer: 0 }),
      md`
        «area()» has brackets because it is an action. «width» has no brackets because it is a stored value, like «math.pi» on Day 37.

        The most common mistake is to forget «self» in the «def» line. Guess what happens:
      `,
      ex(py`
        class Cat:
            def meow():
                print("Meow")

        c = Cat()
        c.meow()
      `, { error: true, predict: ["TypeError", "Meow", "NameError"], answer: 0, label: "A common mistake" }),
      md`Python passes «c» in as «self», but «meow()» has no parameter to receive it. Write «def meow(self):». A class does not need «__init__» if it has no data to set up.`,
      pause(md`Good place for a break. The last part is about objects that change, and lists of objects.`),
      md`
        ## Objects that change

        A method can change an attribute. The object remembers the new value between calls. Guess:
      `,
      ex(py`
        class ChaiStall:
            def __init__(self, cups):
                self.cups = cups

            def sell(self, n):
                self.cups -= n

        stall = ChaiStall(50)
        stall.sell(10)
        stall.sell(5)
        print(stall.cups)
      `, { predict: ["35", "50", "45"], answer: 0 }),
      md`
        Each «sell» changes «self.cups». Press **Step through** and watch «cups» go down.

        Many objects can go in a list. A loop then reads each one:
      `,
      ex(py`
        class Student:
            def __init__(self, name, marks):
                self.name = name
                self.marks = marks

        students = [Student("Asha", 82), Student("Ravi", 67), Student("Meera", 91)]
        for s in students:
            print(s.name, s.marks)
      `),
      tip(md`Classes are a big topic. Today is a first look. It is enough to read code that uses classes, and to build simple ones of your own.`),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          class A:
              def __init__(self, x):
                  self.x = x

          a = A(5)
          print(a.x)
        `,
        options: ["5", "x", "A"],
        answer: 0,
        explain: md`«__init__» saved 5 in the object's «x» attribute.`,
        why: [null, md`«a.x» gives the value saved in the attribute, not its name.`, md`«a.x» reads one attribute. It does not print the class name.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          class C:
              def __init__(self):
                  self.n = 0

              def add(self):
                  self.n += 2

          c = C()
          c.add()
          c.add()
          print(c.n)
        `,
        options: ["4", "2", "0"],
        answer: 0,
        explain: md`Each call to «add» increases «n» by 2.`,
        why: [null, md`«add» runs twice. The object remembers the 2 from the first call.`, md`«self.n += 2» changes the attribute, and the change stays.`],
        skill: "trace",
      },
      {
        q: md`What is «self»?`,
        options: ["The object the method is working on", "The name of the class", "Something you must type when calling a method"],
        answer: 0,
        explain: md`Python fills in «self» by itself with the object you called the method on.`,
        why: [null, md`The class is the plan. «self» is one object made from it.`, md`You write «r.area()», not «r.area(self)». Python fills «self» for you.`],
        skill: "memory",
      },
      {
        q: md`What does this program do?`,
        code: py`
          class Student:
              def __init__(self, name, marks):
                  self.name = name
                  self.marks = marks

          students = [Student("Asha", 82), Student("Ravi", 20)]
          for s in students:
              if s.marks >= 33:
                  print(s.name)
        `,
        options: [
          "It prints the names of the students who pass",
          "It prints every student's marks",
          "It adds 33 marks to each student",
        ],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`The loop checks each student's marks and prints only the names with 33 or more. Here it prints «Asha».`,
        why: [null, md`Only «s.name» is printed, and only for some students.`, md`«>=» compares. It does not change the marks.`],
        skill: "read",
      },
      {
        q: md`What does this show?`,
        code: py`
          class Counter:
              def __init__(self):
                  self.count = 0

              def click(self):
                  self.count += 1

          a = Counter()
          b = Counter()
          a.click()
          a.click()
          print(a.count, b.count)
        `,
        options: ["2 0", "2 2", "1 1"],
        answer: 0,
        explain: md`«a» and «b» are two different objects. Each has its own «count». Only «a» was clicked.`,
        why: [null, md`Each object keeps its own attributes. Clicking «a» does not change «b».`, md`«a.click()» runs twice, so «a.count» is 2. «b» was never clicked.`],
        skill: "trace",
      },
    ],
    practice: [
      {
        id: "fill-cricketer",
        kind: "fill",
        title: "Fill the gaps: a Cricketer class",
        task: md`
          Fill the gaps so «__init__» saves both values inside the object. The program prints:

          | Virat 50
        `,
        template: py`
          class Cricketer:
              def __init__(self, name, runs):
                  self.name = ⟦name⟧
                  ⟦self⟧.runs = runs

          player = Cricketer("Virat", 50)
          print(player.name, player.runs)
        `,
        tests: [
          { output: "Virat 50" },
          {
            py: py`
              p = new("Cricketer", "Rohit", 12)
              assert getattr(p, "name", None) == "Rohit" and getattr(p, "runs", None) == 12, '«Cricketer("Rohit", 12)» should save the name «Rohit» and the runs 12. Use the parameters, not fixed values.'
            `,
          },
        ],
        hints: [
          md`Each attribute gets the value of the parameter with the same name.`,
          md`The first gap is the parameter that holds the name.`,
          md`The second line starts with «self», like the first one.`,
        ],
      },
      {
        id: "trace-stall",
        kind: "trace",
        title: "Be the Computer: a chai stall",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          class Stall:
              def __init__(self, cups):
                  self.cups = cups

              def sell(self, n):
                  self.cups -= n

          shop = Stall(20)
          shop.sell(5)
          left = shop.cups
          shop.sell(3)
          print(left, shop.cups)
        `,
        inputs: [],
        ask: [{ line: 10, name: "left" }, { output: true }],
        hints: [
          md`«Stall(20)» saves 20 in «self.cups».`,
          md`Each call to «sell» runs line 6, which changes «self.cups».`,
          md`«left» saves the number of cups after the first sale. It does not change later. The second sale takes away 3 more from «shop.cups».`,
        ],
      },
      {
        id: "student-class",
        title: "A Student class",
        task: md`
          Create a class «Student»:

          - «__init__(self, name, marks)» saves them as «self.name» and «self.marks».
          - «is_passing(self)» returns «True» if marks are 33 or more, otherwise «False».

          So «Student("Asha", 82).is_passing()» gives back «True».
        `,
        starter: py`
          class Student:
              def __init__(self, name, marks):

        `,
        hints: [md`The class needs two parts: «__init__», which saves the name and the marks inside the object, and a method that compares the marks with 33.`, 
          md`In «__init__»: «self.name = name» and «self.marks = marks».`,
          md`«def is_passing(self):» then «return self.marks >= 33».`,
        ],
        solution: py`
          class Student:
              def __init__(self, name, marks):
                  self.name = name
                  self.marks = marks

              def is_passing(self):
                  return self.marks >= 33
        `,
        tests: [
          {
            py: py`
              s = new("Student", "Asha", 82)
              assert getattr(s, "name", None) == "Asha", "Save the name with «self.name = name»."
              assert getattr(s, "marks", None) == 82, "Save the marks with «self.marks = marks»."
              assert method(s, "is_passing") is True, "A student with 82 marks should be passing."
              assert method(new("Student", "Ravi", 20), "is_passing") is False, "A student with 20 marks should not be passing."
              assert method(new("Student", "Zoya", 33), "is_passing") is True, "Exactly 33 marks counts as passing."
              assert method(new("Student", "Kabir", 32), "is_passing") is False, "32 marks is not passing."
            `,
          },
        ],
        wrong: [
          py`
            class Student:
                def __init__(self, name, marks):
                    self.name = name
                    self.marks = marks

                def is_passing(self):
                    return self.marks > 33
          `,
        ],
      },
      {
        id: "bank-account",
        title: "A bank account",
        task: md`
          Create a class «BankAccount»:

          - «__init__(self, owner, balance=0)» saves them as «self.owner» and «self.balance».
          - «deposit(self, amount)» adds the amount to the balance.
          - «withdraw(self, amount)»: if there is enough money, take it out and return «True». If there is not enough money, do not change the balance. Return «False».

          For example: an account opened with 100, then «deposit(50)», then «withdraw(500)» returns «False» and the balance stays 150.
        `,
        starter: py`
          class BankAccount:
              def __init__(self, owner, balance=0):

        `,
        hints: [
          md`Save both: «self.owner = owner» and «self.balance = balance».`,
          md`«deposit»: «self.balance += amount».`,
          md`«withdraw»: «if amount > self.balance: return False», otherwise subtract and «return True».`,
        ],
        solution: py`
          class BankAccount:
              def __init__(self, owner, balance=0):
                  self.owner = owner
                  self.balance = balance

              def deposit(self, amount):
                  self.balance += amount

              def withdraw(self, amount):
                  if amount > self.balance:
                      return False
                  self.balance -= amount
                  return True
        `,
        tests: [
          {
            py: py`
              acc = new("BankAccount", "Asha", 100)
              assert getattr(acc, "owner", None) == "Asha", "Save the owner with «self.owner = owner»."
              assert getattr(acc, "balance", None) == 100, "Save the starting balance with «self.balance = balance»."
              method(acc, "deposit", 50)
              assert acc.balance == 150, f"After depositing 50 into 100, the balance should be 150, not {acc.balance}."
              assert method(acc, "withdraw", 500) is False, "Withdrawing more than the balance should return False."
              assert acc.balance == 150, "A refused withdrawal must not change the balance."
              assert method(acc, "withdraw", 30) is True, "A withdrawal that fits should return True."
              assert acc.balance == 120, f"After withdrawing 30 from 150, the balance should be 120, not {acc.balance}."
              assert method(acc, "withdraw", 120) is True and acc.balance == 0, "Withdrawing exactly the whole balance is allowed."
              empty = new("BankAccount", "Ravi")
              assert empty.balance == 0, "If no balance is given, it should start at 0."
            `,
          },
        ],
        wrong: [
          py`
            class BankAccount:
                def __init__(self, owner, balance=0):
                    self.owner = owner
                    self.balance = balance

                def deposit(self, amount):
                    self.balance += amount

                def withdraw(self, amount):
                    self.balance -= amount
                    return True
          `,
          py`
            class BankAccount:
                def __init__(self, owner, balance=0):
                    self.owner = owner
                    self.balance = balance

                def deposit(self, amount):
                    self.balance += amount

                def withdraw(self, amount):
                    if amount >= self.balance:
                        return False
                    self.balance -= amount
                    return True
          `,
        ],
      },
      {
        id: "rectangle-class",
        title: "A Rectangle class",
        task: md`
          Create a class «Rectangle». Its «__init__(self, width, height)» saves both. Add these three methods:

          - «area()» returns width × height.
          - «perimeter()» returns 2 × (width + height).
          - «is_square()» returns «True» if width and height are equal, otherwise «False».
        `,
        starter: py`

        `,
        hints: [md`Save the width and the height in «__init__». Then write three short methods. Each one gives back an answer worked out from the saved values.`, 
          md`Start with «class Rectangle:» and an «__init__(self, width, height)» that saves both.`,
          md`Each method takes only «self» and uses «self.width» and «self.height».`,
        ],
        solution: py`
          class Rectangle:
              def __init__(self, width, height):
                  self.width = width
                  self.height = height

              def area(self):
                  return self.width * self.height

              def perimeter(self):
                  return 2 * (self.width + self.height)

              def is_square(self):
                  return self.width == self.height
        `,
        tests: [
          {
            py: py`
              r = new("Rectangle", 4, 5)
              assert method(r, "area") == 20, "A 4 × 5 rectangle has an area of 20."
              assert method(r, "perimeter") == 18, "A 4 × 5 rectangle has a perimeter of 18."
              assert method(r, "is_square") is False, "A 4 × 5 rectangle is not a square, so «is_square()» should return False."
              sq = new("Rectangle", 3, 3)
              assert method(sq, "area") == 9 and method(sq, "perimeter") == 12, "Check your maths with a 3 × 3 square."
              assert method(sq, "is_square") is True, "A 3 × 3 rectangle is a square."
              one = new("Rectangle", 1, 1)
              assert method(one, "area") == 1 and method(one, "perimeter") == 4, "A 1 × 1 square has area 1 and perimeter 4."
            `,
          },
        ],
        wrong: [
          py`
            class Rectangle:
                def __init__(self, width, height):
                    self.width = width
                    self.height = height

                def area(self):
                    return self.width * self.height

                def perimeter(self):
                    return 2 * (self.width + self.height)

                def is_square(self):
                    if self.width == self.height:
                        return True
          `,
          py`
            class Rectangle:
                def __init__(self, width, height):
                    self.width = width
                    self.height = height

                def area(self):
                    return self.width * self.height

                def perimeter(self):
                    return 2 * self.width + self.height

                def is_square(self):
                    return self.width == self.height
          `,
        ],
      },
      {
        id: "bug-self",
        kind: "bug",
        optional: true,
        title: "Bug Clinic: the missing self",
        task: md`
          This program should sell 5 cups and print «15». It stops with a «TypeError». Tap the faulty line, then fix it.
        `,
        starter: py`
          class Stall:
              def __init__(self, cups):
                  self.cups = cups

              def sell(n):
                  self.cups -= n

          stall = Stall(20)
          stall.sell(5)
          print(stall.cups)
        `,
        bugLines: [5],
        solution: py`
          class Stall:
              def __init__(self, cups):
                  self.cups = cups

              def sell(self, n):
                  self.cups -= n

          stall = Stall(20)
          stall.sell(5)
          print(stall.cups)
        `,
        tests: [
          { output: "15" },
          {
            py: py`
              s = new("Stall", 10)
              method(s, "sell", 4)
              assert s.cups == 6, f"A stall with 10 cups that sells 4 should have 6 left, not {s.cups}."
              method(s, "sell", 6)
              assert s.cups == 0, "Selling the last 6 cups should leave 0."
            `,
          },
        ],
        wrong: [
          py`
            class Stall:
                def __init__(self, cups):
                    self.cups = cups

                def sell(self, n):
                    self.cups = n

            stall = Stall(20)
            stall.sell(5)
            print(stall.cups)
          `,
        ],
        hints: [
          md`Run it and read the error. It says «sell()» gets 2 values, but takes only 1.`,
          md`Python passes the object in as the first value. The «def sell» line has no name for it.`,
          md`Write «def sell(self, n):».`,
        ],
      },
    ],
    keys: [
      md`A «class» is a plan. «Cricketer("Virat", 50)» builds one object from it.`,
      md`«__init__(self, ...)» runs when an object is built. It saves attributes: «self.name = name».`,
      md`Methods are functions inside a class. Their first parameter is always «self».`,
      md`Call a method with «obj.method()». Python fills in «self» for you. Brackets mean an action; no brackets means a stored value.`,
      md`A method can change an attribute, like «self.cups -= n». Each object keeps its own attributes.`,
    ],
  });

  // ---------------------------------------------------------------- Day 40
  day({
    slug: "final-project",
    title: "Final project, and what comes next",
    goal: "Build an expense tracker in stages. Then learn how to run Python on your own laptop.",
    minutes: 45,
    needs: [35, 38],
    win: "Today you can now build a complete program in stages, and run Python on your own laptop.",
    learn: [
      md`
        ## Today's plan

        Forty days ago, «print("Hello, world!")» was new. Now you can store values, make decisions, repeat work with loops, and keep data in lists and dictionaries. You can write functions, catch errors, use modules, save files and make classes. These are the basic parts of programming. Big programs use these same parts.

        Today you build an **expense tracker**. It keeps a total for each kind of spending. You build it in 4 stages in the practice below. The Quiz app and Hangman are bonus programs, marked "finish later".

        The tracker uses the same kind of loop you wrote for the Day 35 contact book. Guess what this short version prints:
      `,
      ex(py`
        totals = {}
        for line in ["add food 120", "add travel 300", "add food 80"]:
            parts = line.split()
            category = parts[1]
            amount = float(parts[2])
            totals[category] = totals.get(category, 0) + amount
        print(totals)
      `, { predict: ["{'food': 200.0, 'travel': 300.0}", "{'food': 80.0, 'travel': 300.0}", "{'food': 200, 'travel': 300}"], answer: 0 }),
      md`
        «totals.get(category, 0)» gives 0 the first time a category appears (Day 30). So «food» adds up to 200.0.

        The tracker shows rupees with 2 decimal places. Copy the «₹» sign from this page. On the Windows English (India) keyboard, you can also press Ctrl+Alt+4. Guess:
      `,
      ex(py`
        amount = 5000.5
        print(f"Added ₹{amount:.2f} to rent")
      `, { predict: ["Added ₹5000.50 to rent", "Added ₹5000.5 to rent", "Added ₹5001 to rent"], answer: 0 }),
      pause(md`Good place for a break. Build the expense tracker stages in the practice first. Then come back for part 2: Python on your own laptop.`),
      md`
        ## Python on your own laptop

        Everything you learned works on your own laptop too. You need a laptop for this part, not a phone.

        1. Get Python free from [python.org](https://www.python.org/downloads/). During setup, tick the box "Add python.exe to PATH".
        2. Python comes with a simple program for writing code, called **IDLE**. Press the Windows key, type IDLE, then press Enter.
        3. In IDLE, choose File, then New File. Type your code.
        4. Save it with a name that ends in «.py», like «game.py».
        5. Press F5 (the same as Run, then Run Module). The output appears in the IDLE window.

        On Windows, write «open("notes.txt", "w", encoding="utf-8")» when your text has «₹» or Hindi letters. Your files stay in the folder until you delete them.
      `,
      tip(md`A **terminal** is a window where you type commands. On Windows, press the Windows key, type cmd, then press Enter. Type «python --version» to check that Python is installed. **VS Code** is another free program for writing code. You can try it later.`),
      pause(md`Good place for a break. The last part is about what to learn next, and your certificate.`),
      md`
        ## What to learn next

        - **Build things.** Small projects teach the most: a budget tracker, a quiz for SSC practice, a program that puts your files into the right folders.
        - **Go deeper.** Learn more about classes, dates (the «datetime» module), and other modules in the standard library.
        - **Choose one area that you like.** Data and charts, websites, **automation** (making the computer do boring work), games, or artificial intelligence. Each area has free extra modules, like pandas for data. To add one, type «python -m pip install pandas» in the terminal.
        - **Read the official tutorial:** [docs.python.org/3/tutorial](https://docs.python.org/3/tutorial/).

        The last exercise below prints your certificate. It uses one more string method. «.center(n)» adds spaces on the left and right until the text is «n» characters wide. Guess:
      `,
      ex(py`
        print("[" + "chai".center(8) + "]")
      `, { predict: ["[  chai  ]", "[chai    ]", "[    chai]"], answer: 0 }),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          data = {"a": [1, 2], "b": [3]}
          total = 0
          for key, values in data.items():
              total += len(values)
          print(total)
        `,
        options: ["3", "2", "6"],
        answer: 0,
        explain: md`The lists have 2 and 1 items: 3 altogether.`,
        why: [null, md`«len(values)» counts the items in each list, not the keys.`, md`«len()» counts the items. It does not add the numbers 1 + 2 + 3.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          def f(words):
              return [w for w in words if len(w) > 3]

          print(f(["tea", "chai", "coffee"]))
        `,
        options: ["['chai', 'coffee']", "['coffee']", "['tea']"],
        answer: 0,
        explain: md`Only words longer than 3 characters are kept.`,
        why: [null, md`«chai» has 4 characters, and 4 is more than 3.`, md`The filter keeps the long words, not the short one.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          try:
              n = int("4.5")
          except ValueError:
              n = 0
          print(n + 1)
        `,
        options: ["1", "5.5", "5"],
        answer: 0,
        explain: md`«int("4.5")» fails, because 4.5 is not a whole number. So «n» becomes 0.`,
        why: [null, md`«int()» cannot turn the text «"4.5"» into a number. It fails.`, md`«int("4.5")» does not round. It fails with «ValueError».`],
        skill: "trace",
      },
      {
        q: md`What does this program do?`,
        code: py`
          names = []
          while True:
              text = input("> ").strip()
              if text == "stop":
                  break
              names.append(text)
          print(len(names))
        `,
        options: [
          "It collects names until the user types stop, then prints how many there are",
          "It prints every name the user types",
          "It stops after one name",
        ],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`The loop adds each answer to the list. «stop» ends the loop, and «len(names)» is printed.`,
        why: [null, md`Only the count is printed, at the end.`, md`The loop repeats until the user types «stop».`],
        skill: "read",
      },
      {
        q: md`In IDLE, which key runs the program in the open file?`,
        options: ["F5", "Enter", "Ctrl+S"],
        answer: 0,
        mono: false,
        explain: md`F5 is the same as Run, then Run Module.`,
        why: [null, md`Enter starts a new line in the file.`, md`Ctrl+S only saves the file.`],
        skill: "memory",
      },
    ],
    practice: [
      {
        id: "trace-commands",
        kind: "trace",
        title: "Be the Computer: reading commands",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          spent = 0
          count = 0
          for line in ["add chai 10", "summary", "add samosa 15"]:
              parts = line.split()
              if parts[0] == "add":
                  spent += int(parts[2])
                  count += 1
          print(count, spent)
        `,
        inputs: [],
        ask: [{ line: 6, hit: 1, name: "spent" }, { line: 6, hit: 2, name: "spent" }, { output: true }],
        hints: [
          md`Line 6 runs only when the first word is «add».`,
          md`«"summary"» is not «add», so it is skipped.`,
          md`The first time, «spent» becomes 0 + 10. The second time, add 15.`,
        ],
      },
      {
        id: "arrange-loop",
        kind: "parsons",
        title: "Arrange: a command loop",
        task: md`
          Put the lines in order and set each indent. The program repeats what you type until you type «quit». For «hello», then «quit», it prints:

          | You typed hello
          | Bye!
        `,
        solution: py`
          while True:
              command = input("> ").strip()
              if command == "quit":
                  print("Bye!")
                  break
              print("You typed", command)
        `,
        distractors: ['if command = "quit":', "continue"],
        indent: "choose",
        tests: [
          { inputs: ["hello", "quit"], output: "You typed hello\nBye!" },
          { inputs: ["quit"], output: "Bye!" },
          { inputs: ["add food 120", "summary", "quit"], output: "You typed add food 120\nYou typed summary\nBye!" },
        ],
        hints: [
          md`«while True:» comes first. Ask for the command inside the loop.`,
          md`«print("Bye!")» and «break» are inside the «if», 8 spaces in.`,
          md`«print("You typed", command)» is inside the loop but not inside the «if», 4 spaces in.`,
        ],
      },
      {
        id: "expense-add",
        stage: 1,
        title: "Stage 1: adding expenses",
        task: md`
          The program keeps asking for a command:

          - «add CATEGORY AMOUNT» adds the amount (it may have decimals) to that category's total in «totals». It prints «Added ₹AMOUNT to CATEGORY», with 2 decimal places.
          - «quit» prints «Bye!» and stops.

          For «add food 120», «add travel 300», «add food 80», «quit»:

          | Added ₹120.00 to food
          | Added ₹300.00 to travel
          | Added ₹80.00 to food
          | Bye!

          The «quit» part is written for you. «len(parts) == 1» is checked first, so an empty line does not stop the program with an error.
        `,
        starter: py`
          totals = {}
          while True:
              parts = input("> ").split()
              if len(parts) == 1 and parts[0] == "quit":
                  print("Bye!")
                  break
              # Add an elif for "add" here

        `,
        solution: py`
          totals = {}
          while True:
              parts = input("> ").split()
              if len(parts) == 1 and parts[0] == "quit":
                  print("Bye!")
                  break
              elif len(parts) == 3 and parts[0] == "add":
                  category = parts[1]
                  amount = float(parts[2])
                  totals[category] = totals.get(category, 0) + amount
                  print(f"Added ₹{amount:.2f} to {category}")
        `,
        tests: [
          {
            inputs: ["add food 120", "add travel 300", "add food 80", "quit"],
            output: "Added ₹120.00 to food\nAdded ₹300.00 to travel\nAdded ₹80.00 to food\nBye!",
            py: py`assert totals == {"food": 200.0, "travel": 300.0}, "After the three adds, «totals» should be food 200.0 and travel 300.0. Add to the old total. Do not replace it."`,
          },
          { inputs: ["add rent 5000.5", "quit"], output: "Added ₹5000.50 to rent\nBye!" },
          { inputs: ["quit"], output: "Bye!" },
        ],
        wrong: [
          py`
            totals = {}
            while True:
                parts = input("> ").split()
                if len(parts) == 1 and parts[0] == "quit":
                    print("Bye!")
                    break
                elif len(parts) == 3 and parts[0] == "add":
                    category = parts[1]
                    amount = float(parts[2])
                    totals[category] = amount
                    print(f"Added ₹{amount:.2f} to {category}")
          `,
        ],
        hints: [
          md`Check that there are 3 parts and the first is «add». Then «parts[1]» is the category and «parts[2]» is the amount.`,
          md`«amount = float(parts[2])», then «totals[category] = totals.get(category, 0) + amount».`,
          md`«print(f"Added ₹{amount:.2f} to {category}")»`,
        ],
      },
      {
        id: "expense-summary",
        stage: 2,
        carry: "expense-add",
        title: "Stage 2: the summary",
        task: md`
          Add two more commands:

          - «summary» prints each category's total (in the order first added), then the grand total.
          - anything else prints «Unknown command».

          For «add food 120», «add travel 300», «add food 80», «summary», «quit»:

          | Added ₹120.00 to food
          | Added ₹300.00 to travel
          | Added ₹80.00 to food
          | food: ₹200.00
          | travel: ₹300.00
          | Total: ₹500.00
          | Bye!
        `,
        starter: py`
          totals = {}
          while True:
              parts = input("> ").split()
              if len(parts) == 1 and parts[0] == "quit":
                  print("Bye!")
                  break
              elif len(parts) == 3 and parts[0] == "add":
                  category = parts[1]
                  amount = float(parts[2])
                  totals[category] = totals.get(category, 0) + amount
                  print(f"Added ₹{amount:.2f} to {category}")
        `,
        solution: py`
          totals = {}
          while True:
              parts = input("> ").split()
              if len(parts) == 1 and parts[0] == "quit":
                  print("Bye!")
                  break
              elif len(parts) == 3 and parts[0] == "add":
                  category = parts[1]
                  amount = float(parts[2])
                  totals[category] = totals.get(category, 0) + amount
                  print(f"Added ₹{amount:.2f} to {category}")
              elif len(parts) == 1 and parts[0] == "summary":
                  for category, amount in totals.items():
                      print(f"{category}: ₹{amount:.2f}")
                  print(f"Total: ₹{sum(totals.values()):.2f}")
              else:
                  print("Unknown command")
        `,
        tests: [
          {
            inputs: ["add food 120", "add travel 300", "add food 80", "summary", "quit"],
            output: "Added ₹120.00 to food\nAdded ₹300.00 to travel\nAdded ₹80.00 to food\nfood: ₹200.00\ntravel: ₹300.00\nTotal: ₹500.00\nBye!",
          },
          { inputs: ["summary", "quit"], output: "Total: ₹0.00\nBye!" },
          { inputs: ["dance", "", "add food", "quit"], output: "Unknown command\nUnknown command\nUnknown command\nBye!" },
        ],
        wrong: [
          py`
            totals = {}
            while True:
                parts = input("> ").split()
                if len(parts) == 1 and parts[0] == "quit":
                    print("Bye!")
                    break
                elif len(parts) == 3 and parts[0] == "add":
                    category = parts[1]
                    amount = float(parts[2])
                    totals[category] = totals.get(category, 0) + amount
                    print(f"Added ₹{amount:.2f} to {category}")
                elif len(parts) == 1 and parts[0] == "summary":
                    for category, amount in totals.items():
                        print(f"{category}: ₹{amount:.2f}")
                    print(f"Total: ₹{sum(totals.values()):.2f}")
          `,
        ],
        hints: [
          md`Add an «elif» for «summary», then an «else» at the end for everything else.`,
          md`For «summary», loop with «for category, amount in totals.items():». After the loop, print the grand total.`,
          md`The grand total is «sum(totals.values())». Print it with «:.2f».`,
        ],
      },
      {
        id: "expense-safe",
        stage: 3,
        carry: "expense-summary",
        title: "Stage 3: amounts that are not numbers",
        task: md`
          Now «add food abc» stops the program with a «ValueError». Use «try» and «except ValueError». If the amount is not a number, print «Amount must be a number» and add nothing. For «add food abc», «add rent 5000.5», «summary», «quit»:

          | Amount must be a number
          | Added ₹5000.50 to rent
          | rent: ₹5000.50
          | Total: ₹5000.50
          | Bye!
        `,
        starter: py`
          totals = {}
          while True:
              parts = input("> ").split()
              if len(parts) == 1 and parts[0] == "quit":
                  print("Bye!")
                  break
              elif len(parts) == 3 and parts[0] == "add":
                  category = parts[1]
                  amount = float(parts[2])
                  totals[category] = totals.get(category, 0) + amount
                  print(f"Added ₹{amount:.2f} to {category}")
              elif len(parts) == 1 and parts[0] == "summary":
                  for category, amount in totals.items():
                      print(f"{category}: ₹{amount:.2f}")
                  print(f"Total: ₹{sum(totals.values()):.2f}")
              else:
                  print("Unknown command")
        `,
        solution: py`
          totals = {}
          while True:
              parts = input("> ").split()
              if len(parts) == 1 and parts[0] == "quit":
                  print("Bye!")
                  break
              elif len(parts) == 3 and parts[0] == "add":
                  category = parts[1]
                  try:
                      amount = float(parts[2])
                      totals[category] = totals.get(category, 0) + amount
                      print(f"Added ₹{amount:.2f} to {category}")
                  except ValueError:
                      print("Amount must be a number")
              elif len(parts) == 1 and parts[0] == "summary":
                  for category, amount in totals.items():
                      print(f"{category}: ₹{amount:.2f}")
                  print(f"Total: ₹{sum(totals.values()):.2f}")
              else:
                  print("Unknown command")
        `,
        tests: [
          {
            inputs: ["add food abc", "add rent 5000.5", "summary", "quit"],
            output: "Amount must be a number\nAdded ₹5000.50 to rent\nrent: ₹5000.50\nTotal: ₹5000.50\nBye!",
          },
          { inputs: ["add tea ten", "summary", "quit"], output: "Amount must be a number\nTotal: ₹0.00\nBye!" },
          {
            inputs: ["add food 120", "add travel 300", "add food 80", "summary", "quit"],
            output: "Added ₹120.00 to food\nAdded ₹300.00 to travel\nAdded ₹80.00 to food\nfood: ₹200.00\ntravel: ₹300.00\nTotal: ₹500.00\nBye!",
          },
          { uses: ["try"], msg: md`Use «try» and «except ValueError» around the amount.` },
        ],
        wrong: [
          py`
            totals = {}
            while True:
                parts = input("> ").split()
                if len(parts) == 1 and parts[0] == "quit":
                    print("Bye!")
                    break
                elif len(parts) == 3 and parts[0] == "add":
                    category = parts[1]
                    try:
                        amount = float(parts[2])
                    except ValueError:
                        print("Amount must be a number")
                    totals[category] = totals.get(category, 0) + amount
                    print(f"Added ₹{amount:.2f} to {category}")
                elif len(parts) == 1 and parts[0] == "summary":
                    for category, amount in totals.items():
                        print(f"{category}: ₹{amount:.2f}")
                    print(f"Total: ₹{sum(totals.values()):.2f}")
                else:
                    print("Unknown command")
          `,
        ],
        hints: [
          md`Only the «add» part changes. The line that can fail is «amount = float(parts[2])».`,
          md`Put that line, and the two lines that need «amount», inside «try».`,
          md`Under the «try» block, add «except ValueError:» and «print("Amount must be a number")».`,
        ],
      },
      {
        id: "expense-tracker",
        stage: 4,
        kind: "write",
        title: "Stage 4: the whole tracker, from a blank page",
        task: md`
          Write the whole expense tracker again from a blank page. It keeps asking for commands:

          - «add CATEGORY AMOUNT» adds the amount and prints «Added ₹AMOUNT to CATEGORY» with 2 decimal places. If the amount is not a number, print «Amount must be a number».
          - «summary» prints each category's total, then the grand total.
          - «quit» saves each category to «expenses.csv», then prints «Bye!» and stops. Each line of the file looks like «food,200.00».
          - anything else prints «Unknown command».

          For «add food 120», «add travel 300», «add food 80», «summary», «quit»:

          | Added ₹120.00 to food
          | Added ₹300.00 to travel
          | Added ₹80.00 to food
          | food: ₹200.00
          | travel: ₹300.00
          | Total: ₹500.00
          | Bye!
        `,
        starter: py`

        `,
        hints: [
          md`Use the same kind of loop you wrote in stages 1 to 3: «parts = input("> ").split()».`,
          md`For «add», convert with «float(parts[2])» inside «try» and «except ValueError». Then «totals[category] = totals.get(category, 0) + amount».`,
          md`For «quit», open «expenses.csv» with «"w"» and write «f"{category},{amount:.2f}\n"» for each item in «totals.items()». Then print «Bye!».`,
        ],
        solution: py`
          totals = {}
          while True:
              parts = input("> ").split()
              if len(parts) == 1 and parts[0] == "quit":
                  with open("expenses.csv", "w") as file:
                      for category, amount in totals.items():
                          file.write(f"{category},{amount:.2f}\n")
                  print("Bye!")
                  break
              elif len(parts) == 3 and parts[0] == "add":
                  category = parts[1]
                  try:
                      amount = float(parts[2])
                      totals[category] = totals.get(category, 0) + amount
                      print(f"Added ₹{amount:.2f} to {category}")
                  except ValueError:
                      print("Amount must be a number")
              elif len(parts) == 1 and parts[0] == "summary":
                  for category, amount in totals.items():
                      print(f"{category}: ₹{amount:.2f}")
                  print(f"Total: ₹{sum(totals.values()):.2f}")
              else:
                  print("Unknown command")
        `,
        tests: [
          {
            inputs: ["add food 120", "add travel 300", "add food 80", "summary", "quit"],
            output: "Added ₹120.00 to food\nAdded ₹300.00 to travel\nAdded ₹80.00 to food\nfood: ₹200.00\ntravel: ₹300.00\nTotal: ₹500.00\nBye!",
            py: py`assert file_text("expenses.csv").split() == ["food,200.00", "travel,300.00"], "On «quit», expenses.csv should have one line for each category, like «food,200.00»."`,
          },
          {
            inputs: ["add food abc", "add rent 5000.5", "summary", "quit"],
            output: "Amount must be a number\nAdded ₹5000.50 to rent\nrent: ₹5000.50\nTotal: ₹5000.50\nBye!",
          },
          { inputs: ["summary", "quit"], output: "Total: ₹0.00\nBye!" },
          { inputs: ["dance", "quit"], output: "Unknown command\nBye!" },
          { inputs: ["add food", "", "quit"], output: "Unknown command\nUnknown command\nBye!" },
        ],
        wrong: [
          py`
            totals = {}
            while True:
                parts = input("> ").split()
                if len(parts) == 1 and parts[0] == "quit":
                    print("Bye!")
                    break
                elif len(parts) == 3 and parts[0] == "add":
                    category = parts[1]
                    try:
                        amount = float(parts[2])
                        totals[category] = totals.get(category, 0) + amount
                        print(f"Added ₹{amount:.2f} to {category}")
                    except ValueError:
                        print("Amount must be a number")
                elif len(parts) == 1 and parts[0] == "summary":
                    for category, amount in totals.items():
                        print(f"{category}: ₹{amount:.2f}")
                    print(f"Total: ₹{sum(totals.values()):.2f}")
                else:
                    print("Unknown command")
          `,
          py`
            totals = {}
            while True:
                parts = input("> ").split()
                if parts[0] == "quit":
                    with open("expenses.csv", "w") as file:
                        for category, amount in totals.items():
                            file.write(f"{category},{amount:.2f}\n")
                    print("Bye!")
                    break
                elif parts[0] == "add":
                    category = parts[1]
                    try:
                        amount = float(parts[2])
                        totals[category] = totals.get(category, 0) + amount
                        print(f"Added ₹{amount:.2f} to {category}")
                    except ValueError:
                        print("Amount must be a number")
                elif parts[0] == "summary":
                    for category, amount in totals.items():
                        print(f"{category}: ₹{amount:.2f}")
                    print(f"Total: ₹{sum(totals.values()):.2f}")
                else:
                    print("Unknown command")
          `,
        ],
      },
      {
        id: "quiz-app",
        optional: true,
        title: "Bonus: a quiz app",
        task: md`
          Ask every question in the list, in order. When you compare answers, capital letters must not matter. Extra spaces at the start or end must not matter. After each one, print «Correct!» or «Wrong! The answer was ...». At the end, print the score and the percentage, rounded to a whole number. For «56», «Tokyo», «atlantic»:

          | Correct!
          | Correct!
          | Wrong! The answer was pacific
          | Score: 2/3 (67%)

          Use «len(questions)» instead of writing 3, so the quiz still works if questions are added.
        `,
        starter: py`
          questions = [
              ("What is 7 x 8?", "56"),
              ("Capital of Japan?", "tokyo"),
              ("Largest ocean?", "pacific"),
          ]
          score = 0

        `,
        hints: [md`Go through the questions one at a time. Ask each one, clean up the reply, compare it with the answer and keep a score. Work out the percentage at the end.`, 
          md`«for question, answer in questions:» then «reply = input(question + " ").strip().lower()».`,
          md`The percentage is «round(score / len(questions) * 100)». «round(x)» with no second number gives the nearest whole number.`,
        ],
        solution: py`
          questions = [
              ("What is 7 x 8?", "56"),
              ("Capital of Japan?", "tokyo"),
              ("Largest ocean?", "pacific"),
          ]
          score = 0
          for question, answer in questions:
              reply = input(question + " ").strip().lower()
              if reply == answer:
                  print("Correct!")
                  score += 1
              else:
                  print(f"Wrong! The answer was {answer}")
          percent = round(score / len(questions) * 100)
          print(f"Score: {score}/{len(questions)} ({percent}%)")
        `,
        tests: [
          { inputs: ["56", "Tokyo", "atlantic"], output: "Correct!\nCorrect!\nWrong! The answer was pacific\nScore: 2/3 (67%)" },
          { inputs: ["56", " TOKYO ", "Pacific"], output: "Correct!\nCorrect!\nCorrect!\nScore: 3/3 (100%)" },
          { inputs: ["1", "2", "3"], output: "Wrong! The answer was 56\nWrong! The answer was tokyo\nWrong! The answer was pacific\nScore: 0/3 (0%)" },
          {
            inputs: ["56", "tokyo", "pacific"],
            py: py`
              import ast
              calls = [n for n in ast.walk(ast.parse(CODE)) if isinstance(n, ast.Call) and getattr(n.func, "id", "") == "len"
                       and n.args and isinstance(n.args[0], ast.Name) and n.args[0].id == "questions"]
              assert calls, "Use «len(questions)» instead of writing the number 3."
            `,
          },
        ],
        wrong: [
          py`
            questions = [
                ("What is 7 x 8?", "56"),
                ("Capital of Japan?", "tokyo"),
                ("Largest ocean?", "pacific"),
            ]
            score = 0
            for question, answer in questions:
                reply = input(question + " ").strip().lower()
                if reply == answer:
                    print("Correct!")
                    score += 1
                else:
                    print(f"Wrong! The answer was {answer}")
            percent = round(score / 3 * 100)
            print(f"Score: {score}/3 ({percent}%)")
          `,
          py`
            questions = [
                ("What is 7 x 8?", "56"),
                ("Capital of Japan?", "tokyo"),
                ("Largest ocean?", "pacific"),
            ]
            score = 0
            for question, answer in questions:
                reply = input(question + " ")
                if reply == answer:
                    print("Correct!")
                    score += 1
                else:
                    print(f"Wrong! The answer was {answer}")
            percent = round(score / len(questions) * 100)
            print(f"Score: {score}/{len(questions)} ({percent}%)")
          `,
        ],
      },
      {
        id: "hangman",
        optional: true,
        title: "Bonus: Hangman",
        task: md`
          Build a word-guessing game. The secret word is «python». The function «show()» is written for you. It gives the word with each unguessed letter as «_», like «p _ _ h _ _».

          Each round:

          1. Print «show(secret, guessed)».
          2. If no «_» is left, print «You win!» and stop. «"_" not in display» is True when there is no «_». «not in» is the opposite of «in».
          3. If there have been 6 wrong guesses, print «You lose! The word was python» and stop.
          4. Ask for a letter, and clean it with «.strip().lower()». If it is not exactly one letter, print «Type one letter.». If it is in the word, add it to «guessed». If not, add 1 to «wrong» and print «Wrong guesses left: N» (N is 6 minus the wrong guesses so far).

          Guessing p, y, t, h, o, n prints:

          | _ _ _ _ _ _
          | p _ _ _ _ _
          | p y _ _ _ _
          | p y t _ _ _
          | p y t h _ _
          | p y t h o _
          | p y t h o n
          | You win!
        `,
        starter: py`
          def show(secret, guessed):
              letters = []
              for ch in secret:
                  if ch in guessed:
                      letters.append(ch)
                  else:
                      letters.append("_")
              return " ".join(letters)

          secret = "python"
          guessed = []
          wrong = 0

        `,
        hints: [
          md`Use «while True:». First «display = show(secret, guessed)», then print it.`,
          md`Check for the win («"_" not in display») and the loss («wrong == 6») straight after printing. Each one ends with «break».`,
          md`Then ask. Use «if len(guess) != 1:», then «elif guess in secret:», then «else:».`,
        ],
        solution: py`
          def show(secret, guessed):
              letters = []
              for ch in secret:
                  if ch in guessed:
                      letters.append(ch)
                  else:
                      letters.append("_")
              return " ".join(letters)

          secret = "python"
          guessed = []
          wrong = 0
          while True:
              display = show(secret, guessed)
              print(display)
              if "_" not in display:
                  print("You win!")
                  break
              if wrong == 6:
                  print(f"You lose! The word was {secret}")
                  break
              guess = input("Guess a letter: ").strip().lower()
              if len(guess) != 1:
                  print("Type one letter.")
              elif guess in secret:
                  guessed.append(guess)
              else:
                  wrong += 1
                  print(f"Wrong guesses left: {6 - wrong}")
        `,
        tests: [
          {
            inputs: ["p", "y", "t", "h", "o", "n"],
            output: "_ _ _ _ _ _\np _ _ _ _ _\np y _ _ _ _\np y t _ _ _\np y t h _ _\np y t h o _\np y t h o n\nYou win!",
          },
          {
            inputs: ["a", "b", "c", "d", "e", "f"],
            output: "_ _ _ _ _ _\nWrong guesses left: 5\n_ _ _ _ _ _\nWrong guesses left: 4\n_ _ _ _ _ _\nWrong guesses left: 3\n_ _ _ _ _ _\nWrong guesses left: 2\n_ _ _ _ _ _\nWrong guesses left: 1\n_ _ _ _ _ _\nWrong guesses left: 0\n_ _ _ _ _ _\nYou lose! The word was python",
          },
          {
            inputs: ["P", "z", "n", "y", "t", "h", "o"],
            output: "_ _ _ _ _ _\np _ _ _ _ _\nWrong guesses left: 5\np _ _ _ _ _\np _ _ _ _ n\np y _ _ _ n\np y t _ _ n\np y t h _ n\np y t h o n\nYou win!",
          },
          {
            inputs: ["", "py", "p", "y", "t", "h", "o", "n"],
            output: "_ _ _ _ _ _\nType one letter.\n_ _ _ _ _ _\nType one letter.\n_ _ _ _ _ _\np _ _ _ _ _\np y _ _ _ _\np y t _ _ _\np y t h _ _\np y t h o _\np y t h o n\nYou win!",
          },
        ],
        wrong: [
          py`
            def show(secret, guessed):
                letters = []
                for ch in secret:
                    if ch in guessed:
                        letters.append(ch)
                    else:
                        letters.append("_")
                return " ".join(letters)

            secret = "python"
            guessed = []
            wrong = 0
            while True:
                display = show(secret, guessed)
                print(display)
                if "_" not in display:
                    print("You win!")
                    break
                if wrong == 6:
                    print(f"You lose! The word was {secret}")
                    break
                guess = input("Guess a letter: ").strip().lower()
                if guess in secret:
                    guessed.append(guess)
                else:
                    wrong += 1
                    print(f"Wrong guesses left: {6 - wrong}")
          `,
        ],
      },
      {
        id: "certificate",
        kind: "make",
        title: "Make: your certificate",
        task: md`
          Ask for a name. Print a certificate 44 characters wide. Use «.center(42)» for each line of text, with a «*» on each side. When the user types «Asha Rao», it shows:

          | ********************************************
          | *               CERTIFICATE                *
          | *                                          *
          | *                 Asha Rao                 *
          | *      completed Forty Days of Python      *
          | ********************************************

          The empty middle line is «"".center(42)» with a «*» on each side.
        `,
        starter: py`

        `,
        solution: py`
          name = input("Your name, for the certificate: ")
          line = "*" * 44
          print(line)
          print("*" + "CERTIFICATE".center(42) + "*")
          print("*" + "".center(42) + "*")
          print("*" + name.center(42) + "*")
          print("*" + "completed Forty Days of Python".center(42) + "*")
          print(line)
        `,
        tests: [
          {
            inputs: ["Asha Rao"],
            output: "********************************************\n*               CERTIFICATE                *\n*                                          *\n*                 Asha Rao                 *\n*      completed Forty Days of Python      *\n********************************************",
          },
          {
            inputs: ["Ravi"],
            output: "********************************************\n*               CERTIFICATE                *\n*                                          *\n*                   Ravi                   *\n*      completed Forty Days of Python      *\n********************************************",
          },
          {
            inputs: ["Meenakshi Sundaram Iyer"],
            output: "********************************************\n*               CERTIFICATE                *\n*                                          *\n*         Meenakshi Sundaram Iyer          *\n*      completed Forty Days of Python      *\n********************************************",
          },
          { uses: ["method:center"], msg: md`Use «.center(42)» to put each line of text in the middle.` },
        ],
        wrong: [
          py`
            name = input("Your name, for the certificate: ")
            line = "*" * 44
            print(line)
            print("*" + "CERTIFICATE".center(42) + "*")
            print("*" + "".center(42) + "*")
            print("*" + name.center(44) + "*")
            print("*" + "completed Forty Days of Python".center(42) + "*")
            print(line)
          `,
        ],
        hints: [
          md`A line of 44 stars is «"*" * 44». Print it first and last.`,
          md`Each middle line is a «*», the text centred in 42 characters, and another «*».`,
          md`«print("*" + name.center(42) + "*")»`,
        ],
      },
    ],
    keys: [
      md`A big program is built in stages. Make each stage work before you start the next one.`,
      md`On your laptop: write code in IDLE, save it as a «.py» file, and press F5 to run it.`,
      md`On Windows, add «encoding="utf-8"» to «open()» when the text has «₹» or Hindi letters.`,
      md`The best next step is to build small projects that interest you.`,
      md`«text.center(n)» adds spaces on both sides until the text is «n» characters wide.`,
    ],
  });
})();
