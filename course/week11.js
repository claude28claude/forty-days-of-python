// Week 11 — Refuse Bad Data, Prove It Works (Days 71 to 77).
// Day 71 raises errors on bad data, and Day 72 reads them with «as e» and
// cleans up with finally. Days 73 to 75 are about tests: edge cases, Catch the
// Bug, and writing tests first. Day 76 searches by halving a sorted list, and
// Day 77 is the cricket scorecard project with the Level 6 certificate.
(function () {
  const { day, md, py, ex, code, tip, warn, ask, pause } = window.Course;

  // ---------------------------------------------------------------- Day 71
  day({
    slug: "raise-your-own-errors",
    title: "Say No to Bad Data",
    goal: "Make your function refuse bad data with a clear error.",
    minutes: 40,
    kind: "lesson",
    needs: [32, 36],
    win: "Today you can now make a function refuse bad data with a clear error, and catch that error outside.",
    learn: [
      md`
        ## raise: stop with your own error

        Marks can never be below zero. A function should **refuse** such data, not give a strange answer. The word «raise» stops the function at once with an error that you choose. The first call prints «75.0». Guess what the **second** call does.
      `,
      ex(py`
        def percent(marks, total):
            if marks < 0:
                raise ValueError("marks cannot be below zero")
            return marks * 100 / total

        print(percent(150, 200))
        print(percent(-5, 200))
      `, { error: true, label: "A crash on purpose",
           predict: ["ValueError: marks cannot be below zero", "-2.5", "None"], answer: 0 }),
      md`
        The second call meets «raise», so the function stops. It returns nothing. Python shows **ValueError** with your own message, so the reader knows exactly what was wrong.
      `,
      ask({
        q: md`Why is this better than returning «-2.5»?`,
        options: ["The mistake shows at once, with a clear message", "The program runs faster", "Python fixes the marks for you"],
        answer: 0,
        explain: md`A strange number can travel far before anyone sees it. An error stops the program at the place where the bad data came in.`,
        why: [null, md`Speed is not the reason. The reason is a clear, early message.`, md`Python changes nothing. It only stops and shows your message.`],
      }),
      md`
        ## Check the kind first, with isinstance

        «isinstance(value, int)» asks: is this value a whole number? It gives True or False. Check data at the **top** of the function, before any work. A wrong kind of value is a **TypeError**. A wrong size of value is a **ValueError**.

        This program prints «True False» and then «50». Guess what the **last** line, «ticket("8")», does.
      `,
      ex(py`
        def ticket(age):
            if not isinstance(age, int):
                raise TypeError("age must be a whole number")
            if age < 0:
                raise ValueError("age cannot be below zero")
            if age < 12:
                return 50
            return 100

        print(isinstance(8, int), isinstance("8", int))
        print(ticket(8))
        print(ticket("8"))
      `, { error: true, label: "A crash on purpose",
           predict: ["TypeError: age must be a whole number", "ValueError: age cannot be below zero", "50"], answer: 0 }),
      md`
        «"8"» has quotes, so it is text, not a whole number. The first check refuses it. Without that check, «"8" < 0» would crash with a message about «<» that confuses the reader.
      `,
      md`
        ## The caller catches it

        The **caller** is the code that calls the function. It can catch the error with «try» and «except», as on Day 36. Guess what this prints.
      `,
      ex(py`
        def percent(marks, total):
            if marks < 0:
                raise ValueError("marks cannot be below zero")
            return marks * 100 / total

        for m in [80, -4, 50]:
            try:
                print(percent(m, 100))
            except ValueError:
                print("Skipped a bad mark")
        print("Done")
      `, { predict: ["80.0\nSkipped a bad mark\n50.0\nDone", "80.0\nDone", "80.0\n-4.0\n50.0\nDone"], answer: 0 }),
      md`
        The function only says no. The caller decides what to do next: skip, ask again, or stop. So one function works for many programs.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          def cups(n):
              if n < 0:
                  raise ValueError("no")
              return n * 10

          try:
              print(cups(3))
              print(cups(-1))
              print(cups(2))
          except ValueError:
              print("Bad")
        `, options: ["30\nBad", "30\nBad\n20", "Bad"], answer: 0,
        explain: md`«cups(-1)» raises the error. Python jumps to «except» at once, so «cups(2)» never runs.`,
        why: [null, md`After the error, the rest of the «try» block is skipped. The third «print» never runs.`, md`«cups(3)» runs first and prints 30 before the error.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          def set_age(age):
              if not isinstance(age, int):
                  raise TypeError("whole number only")
              if age < 0:
                  raise ValueError("age below zero")
              return age
        `, options: ["It gives back the age, but refuses text and ages below zero", "It changes a bad age into 0", "It prints an error message and gives back None"],
        answer: 0, verify: false, mono: false,
        explain: md`Both checks come first. A good age passes both and is returned.`,
        why: [null, md`Nothing is changed. Bad data stops the function with an error.`, md`«raise» does not print and return. It stops the function with an error.`],
        skill: "read" },
      { q: md`What happens?`, code: py`
          def percent(marks):
              if marks < 0:
                  return "bad marks"
              return marks

          total = percent(80) + percent(-4)
          print(total)
        `, options: ["TypeError", "76", "ValueError"], answer: 0, error: true,
        explain: md`The function returns text for a bad mark. Adding 80 and text fails far from the real problem. «raise» would stop at the right place.`,
        why: [null, md`«percent(-4)» gives back the text «bad marks», not -4.`, md`Nothing raises a ValueError here. The text causes a TypeError at the «+».`],
        skill: "debug" },
      { q: md`Which word stops a function with an error that you choose?`, options: ["«raise»", "«return»", "«except»"], answer: 0,
        explain: md`«raise ValueError("message")» stops the function with your own error.`,
        why: [null, md`«return» gives back a value. It does not report a problem.`, md`«except» catches an error. It does not make one.`],
        skill: "memory" },
      { q: md`What does this show?`, code: py`print(isinstance(4.5, int), isinstance(45, int))`,
        options: ["False True", "True True", "True False"], answer: 0,
        explain: md`4.5 is a decimal number, so it is not a whole number. 45 is a whole number.`,
        why: [null, md`«int» means a whole number. 4.5 has a decimal part.`, md`45 is a whole number, so the second answer is True.`],
        skill: "trace" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: good and bad marks",
        task: md`Answer each question without running the program.`,
        code: py`
          def safe_marks(m):
              if m < 0:
                  raise ValueError("below zero")
              return m

          good = 0
          bad = 0
          for m in [45, -3, 60, -1, 0]:
              try:
                  safe_marks(m)
                  good += 1
              except ValueError:
                  bad += 1
          print(good, bad)
        `,
        inputs: [],
        ask: [{ line: 13, name: "bad" }, { line: 11, hit: 3, name: "good" }, { output: true }],
        hints: [
          md`Go through the list one mark at a time. Ask: is this mark below zero?`,
          md`A mark below zero jumps to the except block, so only the bad counter goes up. Zero is not below zero.`,
          md`Three marks are fine: 45, 60 and 0. Two marks are below zero.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: which age failed?",
        task: md`Answer each question without running the program.`,
        code: py`
          def check_age(age):
              if not isinstance(age, int):
                  raise TypeError("whole number only")
              if age < 0:
                  raise ValueError("below zero")
              return age

          ok = []
          for a in [21, "19", -2, 30]:
              try:
                  ok.append(check_age(a))
              except TypeError:
                  print("Not a number:", a)
              except ValueError:
                  print("Below zero:", a)
          print(ok)
        `,
        inputs: [],
        ask: [{ line: 13, name: "a" }, { line: 15, name: "a" }, { output: true }],
        hints: [
          md`For each age, check the kind first, then the size.`,
          md`An age in quotes is text, so the first check refuses it. A minus age passes the first check and fails the second.`,
          md`Only 21 and 30 reach the list. The text age and the minus age are printed with their labels.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: a chai order that says no",
        task: md`
          Put the lines in order and set each indent. The function refuses a number of cups below zero. The program prints:

          | 60
          | Bad order
        `,
        solution: py`
          def chai_bill(cups):
              if cups < 0:
                  raise ValueError("cups cannot be below zero")
              return cups * 15

          try:
              print(chai_bill(4))
              print(chai_bill(-2))
          except ValueError:
              print("Bad order")
        `,
        distractors: ["return \"cups cannot be below zero\"", "except TypeError:"],
        indent: "choose",
        tests: [{ output: "60\nBad order" }],
        hints: [
          md`The function comes first. The check is the first thing inside it, before the bill is worked out.`,
          md`The two calls go inside the try block. The except line names the same error that the function raises.`,
          md`Use raise, not return, for the bad order. The function raises a ValueError, so catch a ValueError.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: zero marks refused",
        task: md`
          A mark of 0 is a real mark, so it must be allowed. Only marks below zero are refused. For «0» the program should print «Percent: 0». Instead it prints «Refused: marks cannot be below zero».

          Fix the one wrong line.
        `,
        starter: py`
          def percent(marks):
              if marks <= 0:
                  raise ValueError("marks cannot be below zero")
              return marks * 100 // 200

          m = int(input("Marks out of 200: "))
          try:
              print("Percent:", percent(m))
          except ValueError:
              print("Refused: marks cannot be below zero")
        `,
        bugLines: [2],
        solution: py`
          def percent(marks):
              if marks < 0:
                  raise ValueError("marks cannot be below zero")
              return marks * 100 // 200

          m = int(input("Marks out of 200: "))
          try:
              print("Percent:", percent(m))
          except ValueError:
              print("Refused: marks cannot be below zero")
        `,
        tests: [
          { inputs: ["0"], output: "Percent: 0" },
          { inputs: ["150"], output: "Percent: 75" },
          { inputs: ["-1"], output: "Refused: marks cannot be below zero" },
          { inputs: ["200"], output: "Percent: 100" },
          { inputs: ["10"], py: py`
              f = need("percent", "function")
              got = "no error"
              try:
                  f(-5)
              except ValueError:
                  got = "ValueError"
              assert got == "ValueError", "percent(-5) should still raise ValueError. Keep the raise line."
            ` },
        ],
        wrong: [py`
          def percent(marks):
              if marks < 0:
                  return 0
              return marks * 100 // 200

          m = int(input("Marks out of 200: "))
          try:
              print("Percent:", percent(m))
          except ValueError:
              print("Refused: marks cannot be below zero")
        `, py`
          def percent(marks):
              if marks < -1:
                  raise ValueError("marks cannot be below zero")
              return marks * 100 // 200

          m = int(input("Marks out of 200: "))
          try:
              print("Percent:", percent(m))
          except ValueError:
              print("Refused: marks cannot be below zero")
        `],
        hints: [
          md`Try the edge value 0 in your head. Which line decides that 0 is bad?`,
          md`Line 2 refuses marks that are below zero or equal to zero. Zero should pass.`,
          md`Change the comparison on line 2 so that it is true only for marks below zero.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: a ticket that checks the age", optional: true,
        task: md`
          This function trusts any age. Add two checks at the top of «ticket»:

          - if the age is not a whole number, raise «TypeError("age must be a whole number")»
          - if the age is below zero, raise «ValueError("age cannot be below zero")»

          Good ages must still give 50 rupees (below 12) or 100 rupees.
        `,
        starter: py`
          def ticket(age):
              if age < 12:
                  return 50
              return 100

          print(ticket(8))
          print(ticket(30))
        `,
        solution: py`
          def ticket(age):
              if not isinstance(age, int):
                  raise TypeError("age must be a whole number")
              if age < 0:
                  raise ValueError("age cannot be below zero")
              if age < 12:
                  return 50
              return 100

          print(ticket(8))
          print(ticket(30))
        `,
        tests: [
          { output: "50\n100" },
          { py: py`
              expect("ticket", (0,), 50)
              expect("ticket", (11,), 50)
              expect("ticket", (12,), 100)
            ` },
          { py: py`
              f = need("ticket", "function")
              for bad in [-1, -30]:
                  got = "no error"
                  try:
                      f(bad)
                  except ValueError:
                      got = "ValueError"
                  except TypeError:
                      got = "TypeError"
                  assert got == "ValueError", f"ticket({bad}) should raise ValueError, but I got: {got}. Check the below-zero test."
            ` },
          { py: py`
              f = need("ticket", "function")
              for bad in ["8", 7.5]:
                  got = "no error"
                  try:
                      f(bad)
                  except ValueError:
                      got = "ValueError"
                  except TypeError:
                      got = "TypeError"
                  assert got == "TypeError", f"ticket({bad!r}) should raise TypeError, but I got: {got}. Check the whole-number test with isinstance."
            ` },
        ],
        wrong: [py`
          def ticket(age):
              if age < 0:
                  raise ValueError("age cannot be below zero")
              if age < 12:
                  return 50
              return 100

          print(ticket(8))
          print(ticket(30))
        `, py`
          def ticket(age):
              if not isinstance(age, int):
                  raise ValueError("age must be a whole number")
              if age < 0:
                  raise ValueError("age cannot be below zero")
              if age < 12:
                  return 50
              return 100

          print(ticket(8))
          print(ticket(30))
        `],
        hints: [
          md`Add two new checks as the first lines inside the function, before the age is compared with 12.`,
          md`The first check asks if the age is a whole number. Put not in front of that question.`,
          md`The kind check raises a TypeError. The below-zero check raises a ValueError. Each has its message in brackets.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a grade that refuses bad marks",
        task: md`
          Write a function «grade(marks)» for a test out of 100.

          - If «marks» is not a whole number, raise «TypeError»
          - If «marks» is below 0 or above 100, raise «ValueError»
          - Otherwise return «"Pass"» for 33 or more, and «"Fail"» below 33

          Then test it. This main program:

          : print(grade(72))
          : try:
          :     grade(105)
          : except ValueError:
          :     print("Refused")

          shows:

          | Pass
          | Refused
        `,
        starter: py`

        `,
        solution: py`
          def grade(marks):
              if not isinstance(marks, int):
                  raise TypeError("marks must be a whole number")
              if marks < 0 or marks > 100:
                  raise ValueError("marks must be from 0 to 100")
              if marks >= 33:
                  return "Pass"
              return "Fail"

          print(grade(72))
          try:
              grade(105)
          except ValueError:
              print("Refused")
        `,
        tests: [
          { py: py`
              expect("grade", (33,), "Pass")
              expect("grade", (32,), "Fail")
              expect("grade", (0,), "Fail")
              expect("grade", (100,), "Pass")
            ` },
          { py: py`
              f = need("grade", "function")
              for bad in [-1, 101, 250]:
                  got = "no error"
                  try:
                      f(bad)
                  except ValueError:
                      got = "ValueError"
                  except TypeError:
                      got = "TypeError"
                  assert got == "ValueError", f"grade({bad}) should raise ValueError, but I got: {got}. Check the test for marks below 0 or above 100."
            ` },
          { py: py`
              f = need("grade", "function")
              for bad in ["50", 45.5]:
                  got = "no error"
                  try:
                      f(bad)
                  except ValueError:
                      got = "ValueError"
                  except TypeError:
                      got = "TypeError"
                  assert got == "TypeError", f"grade({bad!r}) should raise TypeError, but I got: {got}. Check the whole-number test with isinstance at the top."
            ` },
        ],
        wrong: [py`
          def grade(marks):
              if not isinstance(marks, int):
                  raise TypeError("marks must be a whole number")
              if marks < 0:
                  raise ValueError("marks must be from 0 to 100")
              if marks >= 33:
                  return "Pass"
              return "Fail"
        `, py`
          def grade(marks):
              if not isinstance(marks, int):
                  raise ValueError("marks must be a whole number")
              if marks < 0 or marks > 100:
                  raise ValueError("marks must be from 0 to 100")
              if marks >= 33:
                  return "Pass"
              return "Fail"
        `, py`
          def grade(marks):
              if marks < 0 or marks > 100:
                  return "Refused"
              if marks >= 33:
                  return "Pass"
              return "Fail"
        `],
        hints: [
          md`Plan three parts: check the kind, check the range, then decide Pass or Fail.`,
          md`Both checks go at the top of the function. The range check joins two comparisons with or.`,
          md`Use raise with TypeError for the kind and ValueError for the range. A mark of exactly 33 is a Pass.`,
        ],
      },
    ],
    keys: [
      md`«raise ValueError("message")» stops a function at once with your own error.`,
      md`Check data at the **top** of a function, before any work.`,
      md`«isinstance(x, int)» gives True when «x» is a whole number.`,
      md`Wrong kind of value: **TypeError**. Wrong size of value: **ValueError**.`,
      md`The function says no. The caller catches the error with «try» and «except» and decides what to do.`,
    ],
  });

  // ---------------------------------------------------------------- Day 72
  day({
    slug: "except-as-and-finally",
    title: "Reading the Error, Cleaning Up",
    goal: "Read an error's own message and run clean-up code with finally.",
    minutes: 45,
    kind: "lesson",
    needs: [36, 71],
    win: "Today you can now show an error's own message, and run clean-up code that always runs.",
    learn: [
      md`
        ## as e: keep the error to read it

        «except ValueError as e:» catches the error and keeps it in the name «e». Printing «e» shows the error's own **message**: the words after the colon in the red line. Guess what this prints.
      `,
      ex(py`
        for text in ["45", "forty"]:
            try:
                print(int(text) + 5)
            except ValueError as e:
                print("Problem:", e)
      `, { predict: ["50\nProblem: invalid literal for int() with base 10: 'forty'", "50\nProblem: ValueError", "50\nProblem: forty"], answer: 0 }),
      md`
        Python wrote that message, not us. It names the bad text, «'forty'». With «as e», your program can show the real reason without crashing. It works for your own «raise» messages too.
      `,
      ask({
        q: md`A function runs «raise ValueError("marks above 100")». The caller has «except ValueError as e: print(e)». What is printed?`,
        options: ["marks above 100", "ValueError", "e"],
        answer: 0,
        explain: md`«e» holds the error. Printing it shows the message you wrote inside the brackets.`,
        why: [null, md`Printing «e» shows the message, not the name of the error.`, md`«e» is a name for the error, not text. Python prints what it holds.`],
      }),
      md`
        ## else and finally

        A «try» can have two more blocks. «else:» runs only when the «try» block had **no** error. «finally:» runs **always**, error or not. The order is fixed: try, except, else, finally.
      `,
      ex(py`
        def order(cups):
            try:
                n = int(cups)
            except ValueError:
                print("Not a number")
            else:
                print("Bill:", n * 15)
            finally:
                print("Thank you")

        order("2")
        order("two")
      `, { predict: ["Bill: 30\nThank you\nNot a number\nThank you", "Bill: 30\nNot a number\nThank you", "Bill: 30\nThank you\nNot a number"], answer: 0 }),
      md`
        For «"2"», there is no error, so «else» runs. For «"two"», «except» runs and «else» is skipped. «Thank you» prints both times. Keep only the risky line in «try», and put the rest in «else».
      `,
      pause(md`A good place for a short break. Your progress is saved.`),
      md`
        ## finally runs even after return

        «finally» is for **clean-up**: work that must happen at the end, such as a closing message. It runs even when the block leaves early with «return». Guess the order.
      `,
      ex(py`
        def check(marks):
            try:
                return int(marks)
            except ValueError:
                return 0
            finally:
                print("Checked", marks)

        print(check("40"))
        print(check("x"))
      `, { predict: ["Checked 40\n40\nChecked x\n0", "40\nChecked 40\n0\nChecked x", "40\n0"], answer: 0 }),
      md`
        «return» gets its value ready, then «finally» prints, then the value goes back to the caller. So «Checked 40» appears before «40».
      `,
      warn(md`Never write «except Exception:» to catch every error. It also hides your own typing mistakes, and an «except» below it never runs. Catch only the error you expect.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          try:
              n = int("7")
          except ValueError:
              print("A")
          else:
              print("B")
          finally:
              print("C")
        `, options: ["B\nC", "A\nC", "B"], answer: 0,
        explain: md`«int("7")» works, so «except» is skipped. «else» runs, then «finally».`,
        why: [null, md`«except» runs only when there is an error. «"7"» becomes 7 with no error.`, md`«finally» always runs, so «C» is printed too.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          text = input("Age: ")
          try:
              age = int(text)
          except ValueError as e:
              print("Sorry:", e)
          else:
              print("Next year you are", age + 1)
        `, options: ["It shows the age next year, or Python's reason why the answer is not a number", "It asks again until a number is typed", "It always prints Sorry"],
        answer: 0, verify: false, mono: false,
        explain: md`A good number goes to «else». A bad one goes to «except», which prints Python's message.`,
        why: [null, md`There is no loop, so it asks only once.`, md`«Sorry» prints only when «int()» fails.`],
        skill: "read" },
      { q: md`What happens?`, code: py`
          try:
              n = int("5")
          else:
              print(n)
          except ValueError:
              print("bad")
        `, options: ["SyntaxError", "5", "bad"], answer: 0, error: true,
        explain: md`The blocks must come in the order try, except, else, finally. «else» before «except» is not allowed.`,
        why: [null, md`Python does not run anything. The wrong order stops it before the first line.`, md`Python cannot even start, because the blocks are in the wrong order.`],
        skill: "debug" },
      { q: md`Which block runs every time, error or not?`, options: ["«finally»", "«else»", "«except»"], answer: 0,
        explain: md`«finally» always runs. Use it for clean-up.`,
        why: [null, md`«else» runs only when there was no error.`, md`«except» runs only when there was an error.`],
        skill: "memory" },
      { q: md`What does this show?`, code: py`
          try:
              print(int("12.5"))
          except ValueError as e:
              print(e)
        `, options: ["invalid literal for int() with base 10: '12.5'", "12", "ValueError"], answer: 0,
        explain: md`«int()» cannot read a decimal point in text. Printing «e» shows Python's own message.`,
        why: [null, md`«int()» on text does not cut off the decimal part. It raises an error.`, md`Printing «e» shows the message, not the name of the error.`],
        skill: "trace" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: which block ran?",
        task: md`Answer each question without running the program.`,
        code: py`
          good = 0
          bad = 0
          done = 0
          for t in ["12", "x", "30", ""]:
              try:
                  n = int(t)
              except ValueError:
                  bad += 1
              else:
                  good += 1
              finally:
                  done += 1
          print(good, bad, done)
        `,
        inputs: [],
        ask: [{ line: 10, hit: 2, name: "good" }, { line: 12, hit: 3, name: "done" }, { output: true }],
        hints: [
          md`For each text, ask: can it become a whole number? Empty text cannot.`,
          md`Only one of the except block and the else block runs each time. The finally block runs every time.`,
          md`Two texts are numbers and two are not. The finally counter goes up once for each of the four texts.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: return and finally",
        task: md`Answer each question without running the program.`,
        code: py`
          def fee(text):
              try:
                  amount = int(text)
              except ValueError:
                  return 0
              else:
                  return amount * 2
              finally:
                  print("Checked", text)

          a = fee("50")
          b = fee("abc")
          print(a + b)
        `,
        inputs: [],
        ask: [{ line: 11, name: "a" }, { line: 12, name: "b" }, { output: true }],
        hints: [
          md`Follow each call. Decide which block gives back the value, then remember that finally prints before the value goes back.`,
          md`The first text is a number, so the else block gives back double it. The second text is not a number.`,
          md`Each call prints one Checked line. The last line prints the sum of the two values.`,
        ],
      },
      {
        id: "t3", kind: "trace", title: "Be the Computer: the last message",
        task: md`Answer each question without running the program.`,
        code: py`
          def check(marks):
              if marks < 0:
                  raise ValueError("below zero")
              if marks > 100:
                  raise ValueError("above 100")
              return marks

          msg = ""
          for m in [50, 120, -5]:
              try:
                  check(m)
              except ValueError as e:
                  msg = str(e)
          print(msg)
        `,
        inputs: [],
        ask: [{ line: 13, name: "msg" }, { line: 13, hit: 2, name: "msg" }, { output: true }],
        hints: [
          md`Check each mark in turn. A good mark raises nothing, so the except block does not run for it.`,
          md`The error keeps the message that was written in its brackets. The text of that message goes into msg.`,
          md`120 is above 100, and -5 is below zero. The last message to go into msg is the one that is printed.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: try, except, else, finally",
        task: md`
          Put the lines in order and set each indent. When the user types «4», it shows:

          | Bill: 60
          | Thank you

          When the user types «four», it shows:

          | Problem: invalid literal for int() with base 10: 'four'
          | Thank you
        `,
        solution: py`
          text = input("Cups: ")
          try:
              cups = int(text)
          except ValueError as e:
              print("Problem:", e)
          else:
              print("Bill:", cups * 15)
          finally:
              print("Thank you")
        `,
        distractors: ["except Exception:", "print(\"Problem:\", text)"],
        indent: "choose",
        tests: [
          { inputs: ["4"], output: "Bill: 60\nThank you" },
          { inputs: ["four"], output: "Problem: invalid literal for int() with base 10: 'four'\nThank you" },
          { inputs: ["0"], output: "Bill: 0\nThank you" },
        ],
        hints: [
          md`The question comes first. Then the four blocks, each with one line inside.`,
          md`The blocks always go in this order: try, except, else, finally.`,
          md`The except line keeps the error as e, and the line under it prints e. The bill goes under else.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the except that catches too much",
        task: md`
          For an item that is not on the menu, the program should print «Not on the menu». For «vada» and «2» it prints «Please type a number» instead.

          Fix the one wrong line, so each problem gets its own message.
        `,
        starter: py`
          prices = {"chai": 15, "samosa": 20}
          item = input("Item: ")
          qty = input("How many: ")
          try:
              cost = prices[item] * int(qty)
              print("Bill:", cost)
          except Exception:
              print("Please type a number")
          except KeyError:
              print("Not on the menu")
        `,
        bugLines: [7],
        solution: py`
          prices = {"chai": 15, "samosa": 20}
          item = input("Item: ")
          qty = input("How many: ")
          try:
              cost = prices[item] * int(qty)
              print("Bill:", cost)
          except ValueError:
              print("Please type a number")
          except KeyError:
              print("Not on the menu")
        `,
        tests: [
          { inputs: ["vada", "2"], output: "Not on the menu" },
          { inputs: ["chai", "2"], output: "Bill: 30" },
          { inputs: ["samosa", "two"], output: "Please type a number" },
          { inputs: ["samosa", "0"], output: "Bill: 0" },
        ],
        wrong: [py`
          prices = {"chai": 15, "samosa": 20}
          item = input("Item: ")
          qty = input("How many: ")
          try:
              cost = prices[item] * int(qty)
              print("Bill:", cost)
          except TypeError:
              print("Please type a number")
          except KeyError:
              print("Not on the menu")
        `],
        hints: [
          md`A missing dictionary key gives a KeyError. Why does the KeyError block never run?`,
          md`Line 7 catches every kind of error, so Python never reaches the block below it.`,
          md`Line 7 should catch only the error that the whole-number change gives for bad text.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: show the real reason", optional: true,
        task: md`
          This program adds up marks typed with commas. Change the «except» part so it shows Python's own message after «Skipped:». For «40,abc,30» it shows:

          | Skipped: invalid literal for int() with base 10: 'abc'
          | Total: 70
        `,
        starter: py`
          entries = input("Marks: ").split(",")
          total = 0
          for item in entries:
              try:
                  total += int(item)
              except ValueError:
                  print("Bad entry")
          print("Total:", total)
        `,
        solution: py`
          entries = input("Marks: ").split(",")
          total = 0
          for item in entries:
              try:
                  total += int(item)
              except ValueError as e:
                  print("Skipped:", e)
          print("Total:", total)
        `,
        tests: [
          { inputs: ["40,abc,30"], output: "Skipped: invalid literal for int() with base 10: 'abc'\nTotal: 70" },
          { inputs: ["10,20"], output: "Total: 30" },
          { inputs: ["x"], output: "Skipped: invalid literal for int() with base 10: 'x'\nTotal: 0" },
          { inputs: ["5,,7"], output: "Skipped: invalid literal for int() with base 10: ''\nTotal: 12" },
        ],
        wrong: [py`
          entries = input("Marks: ").split(",")
          total = 0
          for item in entries:
              try:
                  total += int(item)
              except ValueError as e:
                  print("Skipped:", item)
          print("Total:", total)
        `],
        hints: [
          md`You need to keep the error in a name, then print it.`,
          md`Change the except line and the print line under it.`,
          md`Add as e at the end of the except line, before the colon. Print the label and e.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a samosa order with clean-up",
        task: md`
          Samosas cost 12 rupees each. Ask «How many samosas: » and use «try», «except ValueError as e», «else» and «finally»:

          - Turn the answer into a whole number. If it is below zero, «raise ValueError("samosas cannot be below zero")»
          - On an error, print «Problem:» and the error's message
          - With no error, print the bill
          - Always print «Order closed» at the end

          For «3»:

          | Bill: 36 rupees
          | Order closed

          For «three»:

          | Problem: invalid literal for int() with base 10: 'three'
          | Order closed
        `,
        starter: py`

        `,
        solution: py`
          text = input("How many samosas: ")
          try:
              n = int(text)
              if n < 0:
                  raise ValueError("samosas cannot be below zero")
          except ValueError as e:
              print("Problem:", e)
          else:
              print(f"Bill: {n * 12} rupees")
          finally:
              print("Order closed")
        `,
        tests: [
          { inputs: ["3"], output: "Bill: 36 rupees\nOrder closed" },
          { inputs: ["three"], output: "Problem: invalid literal for int() with base 10: 'three'\nOrder closed" },
          { inputs: ["-2"], output: "Problem: samosas cannot be below zero\nOrder closed" },
          { inputs: ["0"], output: "Bill: 0 rupees\nOrder closed" },
          { inputs: ["5"], py: py`
              assert "finally" in CODE, "Print «Order closed» from a finally block, so it runs every time."
              assert "else" in CODE, "Print the bill from an else block, after the except block."
            ` },
        ],
        wrong: [py`
          text = input("How many samosas: ")
          try:
              n = int(text)
              if n < 0:
                  raise ValueError("samosas cannot be below zero")
          except ValueError as e:
              print("Problem: not a number")
          else:
              print(f"Bill: {n * 12} rupees")
          finally:
              print("Order closed")
        `, py`
          text = input("How many samosas: ")
          try:
              n = int(text)
          except ValueError as e:
              print("Problem:", e)
          else:
              print(f"Bill: {n * 12} rupees")
          finally:
              print("Order closed")
        `, py`
          text = input("How many samosas: ")
          try:
              n = int(text)
              if n < 0:
                  raise ValueError("samosas cannot be below zero")
          except ValueError as e:
              print("Problem:", e)
          else:
              print(f"Bill: {n * 12} rupees")
              print("Order closed")
        `],
        hints: [
          md`Plan four blocks in the fixed order: try, except, else, finally.`,
          md`The change to a whole number and the below-zero check both go inside try. The bill goes in else.`,
          md`Keep the error as e and print it after the label. The closing words go in finally, so they print even after an error.`,
        ],
      },
    ],
    keys: [
      md`«except ValueError as e:» keeps the error in «e». «print(e)» shows its message.`,
      md`«else:» runs only when the «try» block had no error.`,
      md`«finally:» always runs, even after «return». Use it for clean-up.`,
      md`The order is fixed: «try», «except», «else», «finally».`,
      md`Catch only the error you expect. «except Exception:» hides other mistakes.`,
    ],
  });

  // ---------------------------------------------------------------- Day 73
  // The tariff is invented: units 1 to 100 cost 3.40 rupees each, units 101 to
  // 200 cost 5.70 each, and every unit above 200 costs 7.30.
  day({
    slug: "edge-cases-electricity",
    title: "Tests and Edge Cases: The Electricity Bill",
    goal: "Write assert tests that prove a function works, even on its trickiest values.",
    minutes: 45,
    kind: "lesson",
    needs: [10, 34, 45, 71],
    win: "Today you can now write tests that prove a function works, even at its edges.",
    learn: [
      md`
        ## A test: an answer worked out by hand

        A **test** is a line that checks one answer. First you work out the right answer by hand, on paper. Then «assert» checks that the function gives the same answer. Guess what this prints.
      `,
      ex(py`
        def chai_bill(cups):
            return cups * 12

        def test_chai_bill():
            assert chai_bill(0) == 0
            assert chai_bill(1) == 12
            assert chai_bill(5) == 60

        test_chai_bill()
        print("All tests passed")
      `, { predict: ["All tests passed", "0\n12\n60\nAll tests passed", "True\nTrue\nTrue\nAll tests passed"], answer: 0 }),
      md`
        An «assert» that is true prints nothing. We keep the tests in a function whose name starts with «test_». Each «assert» checks **one fact**, so a failure shows exactly which value is wrong.
      `,
      md`
        ## Reading an AssertionError, and rounding

        When an «assert» is false, Python stops with **AssertionError**. The red message gives the line number of the failed «assert». Add a comma and a message to show what the function really gave.
      `,
      ex(py`
        def with_charge(price):
            return price * 1.1

        def test_with_charge():
            got = with_charge(3)
            assert got == 3.3, f"with_charge(3) gave {got}"

        test_with_charge()
        print("All tests passed")
      `, { error: true, label: "A crash on purpose",
           predict: ["AssertionError: with_charge(3) gave 3.3000000000000003", "All tests passed", "ZeroDivisionError"], answer: 0 }),
      md`
        The function is right, but decimals carry tiny errors, as on Day 5. So **round before you compare** decimals: «assert round(got, 2) == 3.3». Now the test passes.
      `,
      pause(md`A good place for a short break. Your progress is saved.`),
      md`
        ## Edge cases, and testing an error

        An **edge case** is a value where the answer changes rule. It can also be a value at the very end: 0, an empty list, or the last unit of a slab. Bugs hide there. To test that bad data is refused, catch the error and set a flag.
      `,
      ex(py`
        def bill(units):
            if units < 0:
                raise ValueError("units cannot be below zero")
            if units <= 100:
                return units * 3.4
            return 340 + (units - 100) * 5.7

        def test_edges():
            assert bill(0) == 0
            assert bill(100) == 340
            assert round(bill(101), 2) == 345.7

        def test_refuses_minus():
            raised = False
            try:
                bill(-1)
            except ValueError:
                raised = True
            assert raised, "bill(-1) should raise ValueError"

        test_edges()
        test_refuses_minus()
        print("All tests passed")
      `, { predict: ["All tests passed", "AssertionError", "ValueError: units cannot be below zero"], answer: 0 }),
      md`
        100 is the last unit of the first slab, and 101 is the first unit of the next. «raised» becomes True only if «bill(-1)» raises the error. If the function forgets to refuse, the last «assert» fails.
      `,
      ask({
        q: md`A slab ends at 200 units. Which pair of values tests that edge best?`,
        options: ["200 and 201", "150 and 250", "1 and 1000"],
        answer: 0,
        explain: md`200 is the last unit of the slab, and 201 is the first unit after it. A mistake at the edge shows on these two values.`,
        why: [null, md`These are safe middle values. A mistake at the edge can pass them both.`, md`These test the two far ends, not the edge at 200.`],
      }),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          got = 0.1 + 0.2
          print(got == 0.3, round(got, 2) == 0.3)
        `, options: ["False True", "True True", "False False"], answer: 0,
        explain: md`«0.1 + 0.2» is a tiny bit more than 0.3. Rounding to 2 places removes the tiny error.`,
        why: [null, md`Decimals carry tiny errors, so «==» on the raw value is False.`, md`After «round(got, 2)», the value is exactly 0.3, so the second is True.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          def double(n):
              return n * 2

          def test_double():
              assert double(0) == 0
              assert double(4) == 8
              assert double(-3) == -6

          test_double()
          print("OK")
        `, options: ["It checks three answers of double, and prints OK only if all three are right", "It prints 0, 8 and -6", "It doubles every number the user types"],
        answer: 0, verify: false, mono: false,
        explain: md`Each «assert» checks one answer. A false one stops the program before «OK».`,
        why: [null, md`«assert» prints nothing when it is true.`, md`There is no «input()». The values are written in the tests.`],
        skill: "read" },
      { q: md`What happens?`, code: py`
          total = 50
          assert total == 60, "total is wrong"
          print("Done")
        `, options: ["AssertionError", "Done", "total is wrong"], answer: 0, error: true,
        explain: md`50 is not 60, so the «assert» stops the program with AssertionError and the message «total is wrong».`,
        why: [null, md`A false «assert» stops the program, so «Done» never prints.`, md`The message is shown inside the red error, after the word AssertionError. It is not a normal print.`],
        skill: "debug" },
      { q: md`Rent is 500 rupees for 1 to 30 days, then 20 rupees for each extra day. Which values are the best tests?`,
        options: ["0, 30 and 31", "10, 15 and 20", "100, 200 and 300"], answer: 0,
        explain: md`0 is the very end, and 30 and 31 sit on each side of the edge where the rule changes.`,
        why: [null, md`These all use the same rule. An edge mistake passes all of them.`, md`These all use the second rule only.`],
        skill: "choose" },
      { q: md`Why write one «assert» for each value, not one long «and» line?`,
        options: ["A failed assert then shows exactly which value is wrong", "One assert per line runs faster", "Python allows only one comparison in an assert"], answer: 0,
        explain: md`The red message names the line. With one fact per line, the line tells you which value failed.`,
        why: [null, md`Speed is not the reason. Clear failure messages are.`, md`An assert can hold any True or False question. One fact per line is a habit for clear messages.`],
        skill: "memory" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: checking by hand",
        task: md`This program checks a slab bill against answers worked out by hand. One hand answer is wrong. Answer each question without running the program.`,
        code: py`
          def bill(units):
              if units <= 100:
                  return units * 3
              return 300 + (units - 100) * 5

          checked = 0
          for u, want in [(0, 0), (100, 300), (101, 305), (150, 500)]:
              got = bill(u)
              if got == want:
                  checked += 1
              else:
                  print("Wrong for", u, "got", got)
          print(checked, "passed")
        `,
        inputs: [],
        ask: [{ line: 8, hit: 3, name: "got" }, { line: 10, hit: 3, name: "checked" }, { output: true }],
        hints: [
          md`Work out each bill by hand. Up to 100 units, each unit costs 3. After that, each extra unit costs 5.`,
          md`For 101 units, the first 100 cost 300 and one more unit costs 5. For 150 units, 50 extra units cost 250.`,
          md`Three hand answers match. For 150 the real bill is 550, but the hand answer says 500.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: rounding before comparing",
        task: md`Answer each question without running the program.`,
        code: py`
          rate = 1.1
          cost = 3 * rate
          same = cost == 3.3
          fixed = round(cost, 2) == 3.3
          print(same, fixed, round(cost, 2))
        `,
        inputs: [],
        ask: [{ line: 3, name: "same" }, { line: 4, name: "fixed" }, { output: true }],
        hints: [
          md`Decimals carry tiny errors. Three times 1.1 is a tiny bit more than 3.3.`,
          md`Comparing the raw value with 3.3 is false. Rounding to 2 places first removes the tiny error.`,
          md`The first comparison is False and the second is True. The rounded cost shows as 3.3.`,
        ],
      },
      {
        id: "r1", kind: "read", title: "Tap the values worth testing",
        task: md`Before you write tests, choose the values. Read this invented electricity tariff, then answer.`,
        code: py`
          def bill(units):
              if units < 0:
                  raise ValueError("units cannot be below zero")
              if units <= 100:
                  return units * 3.4
              if units <= 200:
                  return 340 + (units - 100) * 5.7
              return 910 + (units - 200) * 7.3
        `,
        questions: [
          { q: md`Which pair tests the edge between the first and the second slab?`, options: ["100 and 101", "50 and 150", "99 and 199"], answer: 0,
            explain: md`100 is the last unit at 3.40. 101 is the first unit at 5.70.`, skill: "read" },
          { q: md`Which pair tests the edge between the second and the third slab?`, options: ["200 and 201", "150 and 250", "100 and 300"], answer: 0,
            explain: md`200 is the last unit at 5.70. 201 is the first unit at 7.30.`, skill: "read" },
          { q: md`Which value checks that bad data is refused?`, options: ["-1", "0", "1000"], answer: 0,
            explain: md`-1 is below zero, so the function should raise ValueError. 0 units is a real bill of 0 rupees.`, skill: "read" },
          { q: md`What should «bill(201)» give, worked out by hand?`, options: ["917.3", "1467.3", "910"], answer: 0,
            explain: md`The first 200 units cost 910. One more unit at 7.30 makes 917.30.`, skill: "read" },
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: a test that bad data is refused",
        task: md`
          Put the lines in order and set each indent. The test checks one good value, then checks that «samosa_bill(-1)» raises «ValueError». The program prints «All tests passed».
        `,
        solution: py`
          def samosa_bill(n):
              if n < 0:
                  raise ValueError("n below zero")
              return n * 12

          def test_samosa_bill():
              assert samosa_bill(3) == 36
              raised = False
              try:
                  samosa_bill(-1)
              except ValueError:
                  raised = True
              assert raised

          test_samosa_bill()
          print("All tests passed")
        `,
        distractors: ["assert not raised", "assert samosa_bill(3) == 15"],
        indent: "choose",
        tests: [{ output: "All tests passed" }],
        hints: [
          md`The function comes first, then the test function, then the call and the print.`,
          md`Inside the test, the flag starts as False before the try. The bad call goes inside the try block.`,
          md`The flag becomes True inside the except block. The final assert checks that the flag is true, after the except block.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: a test that fails on a correct bill",
        task: md`
          The «bill» function is correct. But the tests stop with:

          | AssertionError: bill(99) gave 336.59999999999997

          Fix the test line, not the function, so the program prints «All tests passed».
        `,
        starter: py`
          def bill(units):
              if units <= 100:
                  return units * 3.4
              return 340 + (units - 100) * 5.7

          def test_bill():
              assert bill(0) == 0
              assert bill(100) == 340
              got = bill(99)
              assert got == 336.6, f"bill(99) gave {got}"

          test_bill()
          print("All tests passed")
        `,
        bugLines: [10],
        solution: py`
          def bill(units):
              if units <= 100:
                  return units * 3.4
              return 340 + (units - 100) * 5.7

          def test_bill():
              assert bill(0) == 0
              assert bill(100) == 340
              got = bill(99)
              assert round(got, 2) == 336.6, f"bill(99) gave {got}"

          test_bill()
          print("All tests passed")
        `,
        tests: [
          { output: "All tests passed" },
          { py: py`
              assert "round(" in CODE, "Keep the test for 99 units, and round the value before comparing it."
              assert CODE.count("assert ") >= 3, "Keep all three asserts. Do not delete a test to make it pass."
            ` },
          { py: py`
              expect("bill", (99,), 336.6, approx=True)
              expect("bill", (150,), 625.0, approx=True)
              expect("bill", (100,), 340.0, approx=True)
            ` },
        ],
        wrong: [py`
          def bill(units):
              if units <= 100:
                  return units * 3.4
              return 340 + (units - 100) * 5.7

          def test_bill():
              assert bill(0) == 0
              assert bill(100) == 340
              got = bill(99)
              assert round(got) == 336.6, f"bill(99) gave {got}"

          test_bill()
          print("All tests passed")
        `, py`
          def bill(units):
              if units <= 100:
                  return units * 3.4
              return 340 + (units - 100) * 5.7

          def test_bill():
              assert bill(0) == 0
              assert bill(100) == 340
              got = bill(99)

          test_bill()
          print("All tests passed")
        `],
        hints: [
          md`Read the red message. The function gave the right bill with a tiny decimal error.`,
          md`Line 10 compares a raw decimal with 336.6. Decimals must be rounded before you compare them.`,
          md`On line 10, round the value to 2 places before the double equals sign.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: write the slab bill", optional: true,
        task: md`
          The tests are ready, but «bill» knows only the first slab. Change «bill» so every test passes:

          - below zero: raise «ValueError»
          - units 1 to 100: 3.40 rupees each
          - units 101 to 200: 5.70 rupees each
          - every unit above 200: 7.30 rupees each

          It then prints «All tests passed».
        `,
        starter: py`
          def bill(units):
              return units * 3.4

          def test_bill():
              assert bill(0) == 0
              assert bill(100) == 340
              assert round(bill(101), 2) == 345.7
              assert bill(200) == 910
              assert round(bill(201), 2) == 917.3

          def test_refuses_minus():
              raised = False
              try:
                  bill(-1)
              except ValueError:
                  raised = True
              assert raised, "bill(-1) should raise ValueError"

          test_bill()
          test_refuses_minus()
          print("All tests passed")
        `,
        solution: py`
          def bill(units):
              if units < 0:
                  raise ValueError("units cannot be below zero")
              if units <= 100:
                  return units * 3.4
              if units <= 200:
                  return 340 + (units - 100) * 5.7
              return 910 + (units - 200) * 7.3

          def test_bill():
              assert bill(0) == 0
              assert bill(100) == 340
              assert round(bill(101), 2) == 345.7
              assert bill(200) == 910
              assert round(bill(201), 2) == 917.3

          def test_refuses_minus():
              raised = False
              try:
                  bill(-1)
              except ValueError:
                  raised = True
              assert raised, "bill(-1) should raise ValueError"

          test_bill()
          test_refuses_minus()
          print("All tests passed")
        `,
        tests: [
          { output: "All tests passed" },
          { py: py`
              expect("bill", (50,), 170.0, approx=True)
              expect("bill", (150,), 625.0, approx=True)
              expect("bill", (250,), 1275.0, approx=True)
              expect("bill", (300,), 1640.0, approx=True)
            ` },
        ],
        wrong: [py`
          def bill(units):
              if units < 0:
                  raise ValueError("units cannot be below zero")
              if units <= 100:
                  return units * 3.4
              if units <= 200:
                  return units * 5.7
              return units * 7.3

          def test_bill():
              assert bill(0) == 0
              assert bill(100) == 340
              assert round(bill(101), 2) == 345.7
              assert bill(200) == 910
              assert round(bill(201), 2) == 917.3

          def test_refuses_minus():
              raised = False
              try:
                  bill(-1)
              except ValueError:
                  raised = True
              assert raised, "bill(-1) should raise ValueError"

          test_bill()
          test_refuses_minus()
          print("All tests passed")
        `],
        hints: [
          md`Work out by hand what 101 units and 201 units cost. The first 100 units always cost 340 rupees in all.`,
          md`Add the below-zero check first, then one if for each slab. Only the units after the slab edge use the higher rate.`,
          md`For the second slab, add 340 to the extra units times 5.7. For the third, add 910 to the units above 200 times 7.3.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: the tests for the electricity bill",
        task: md`
          The «bill» function in the editor is correct. Do not change it. Your job is to **write its tests**:

          - Write at least one function whose name starts with «test_». Put at least 4 asserts inside your test functions.
          - Test every slab edge: 100 and 101, and 200 and 201. Also test 0.
          - Test that a value below zero raises «ValueError».
          - Round decimals before you compare them.

          Call your test functions, then print «All tests passed». The program shows:

          | All tests passed
        `,
        starter: py`
          def bill(units):
              if units < 0:
                  raise ValueError("units cannot be below zero")
              if units <= 100:
                  return units * 3.4
              if units <= 200:
                  return 340 + (units - 100) * 5.7
              return 910 + (units - 200) * 7.3

          # Write your test functions below.
        `,
        solution: py`
          def bill(units):
              if units < 0:
                  raise ValueError("units cannot be below zero")
              if units <= 100:
                  return units * 3.4
              if units <= 200:
                  return 340 + (units - 100) * 5.7
              return 910 + (units - 200) * 7.3

          def test_edges():
              assert bill(0) == 0
              assert bill(100) == 340
              assert round(bill(101), 2) == 345.7
              assert bill(200) == 910
              assert round(bill(201), 2) == 917.3

          def test_refuses_minus():
              raised = False
              try:
                  bill(-1)
              except ValueError:
                  raised = True
              assert raised, "bill(-1) should raise ValueError"

          test_edges()
          test_refuses_minus()
          print("All tests passed")
        `,
        tests: [
          { output: "All tests passed" },
          { py: py`
              import ast
              count = sum(1 for node in ast.walk(ast.parse(CODE)) if isinstance(node, ast.Assert))
              assert count >= 4, f"I found {count} asserts. Write at least 4, one fact in each."
            ` },
          { py: py`
              expect("bill", (150,), 625.0, approx=True)
              expect("bill", (250,), 1275.0, approx=True)
              expect("bill", (99,), 336.6, approx=True)
            ` },
          { py: py`
              tests = [v for k, v in list(globals().items()) if k.startswith("test_") and callable(v)]
              assert tests, "Put your asserts inside a function whose name starts with test_, like test_edges."
              real = tests[0].__globals__["bill"]
              tried = []
              def spy(units):
                  tried.append(units)
                  return real(units)
              for t in tests:
                  t.__globals__["bill"] = spy
                  try:
                      t()
                  finally:
                      t.__globals__["bill"] = real
              for edge in [0, 100, 101, 200, 201]:
                  assert edge in tried, f"Your tests never try bill({edge}). Test both sides of every slab edge, and 0."
              assert any(u < 0 for u in tried), "Your tests never try a value below zero. Check that it raises ValueError."
            ` },
        ],
        wrong: [py`
          def bill(units):
              if units < 0:
                  raise ValueError("units cannot be below zero")
              if units <= 100:
                  return units * 3.4
              if units <= 200:
                  return 340 + (units - 100) * 5.7
              return 910 + (units - 200) * 7.3

          def test_bill():
              assert bill(50) == 170
              assert bill(150) == 625
              assert bill(250) == 1275
              assert bill(300) == 1640

          test_bill()
          print("All tests passed")
        `, py`
          def bill(units):
              if units < 0:
                  raise ValueError("units cannot be below zero")
              if units <= 100:
                  return units * 3.4
              if units <= 200:
                  return 340 + (units - 100) * 5.7
              return 910 + (units - 200) * 7.3

          def test_edges():
              assert bill(0) == 0
              assert bill(100) == 340
              assert bill(101) == 345.7
              assert bill(199) == 904.3
              assert bill(200) == 910
              assert bill(201) == 917.3

          test_edges()
          print("All tests passed")
        `, py`
          def bill(units):
              if units < 0:
                  raise ValueError("units cannot be below zero")
              if units <= 100:
                  return units * 3.4
              if units <= 200:
                  return 340 + (units - 100) * 5.7
              return 910 + (units - 200) * 7.3

          def test_edges():
              assert bill(0) == 0
              assert bill(100) == 340
              assert round(bill(101), 2) == 345.7
              assert bill(200) == 910
              assert round(bill(201), 2) == 917.3

          test_edges()
          print("All tests passed")
        `],
        hints: [
          md`First work out by hand the bill for 0, 100, 101, 200 and 201 units. Write the answers on paper.`,
          md`Put one assert for each value in a test function. In a second test function, call the bill with a minus value inside a try block and set a flag in the except block.`,
          md`Round the values for 101 and 201 to 2 places before comparing. After the function definitions, call each test function, then print the message.`,
        ],
      },
    ],
    keys: [
      md`Work out the right answer by hand first. Then write «assert function(value) == answer».`,
      md`Keep tests in a function whose name starts with «test_». One fact in each «assert».`,
      md`Test the **edge cases**: 0, empty, and both sides of every point where the rule changes.`,
      md`To test an error: set a flag to False, call inside «try», set it to True in «except», then «assert» the flag.`,
      md`Round decimals before comparing: «assert round(got, 2) == 3.3».`,
      md`AssertionError means a test failed. The red message names the line of the failed «assert».`,
    ],
  });

  // ---------------------------------------------------------------- Day 74
  // The first Catch the Bug round. It replaces the Modify and Make rungs.
  day({
    slug: "catch-the-bug-gst",
    title: "Catch the Bug: GST",
    goal: "Write tests that catch every secretly broken GST function.",
    minutes: 40,
    kind: "lesson",
    needs: [73],
    win: "Today you can now write tests strong enough to catch broken versions of a function.",
    learn: [
      md`
        ## A weak test lets a bug pass

        A **broken version** is a copy of a function with one small mistake. Here, GST should add 18 percent, but this version adds 18 rupees. Guess what the test does.
      `,
      ex(py`
        def with_gst(price):
            return price + 18

        assert with_gst(100) == 118
        print("Test passed")
      `, { predict: ["Test passed", "AssertionError", "118"], answer: 0 }),
      md`
        The test passes, but the function is wrong. For 100 rupees, 18 percent and 18 rupees are the same. A bug that passes all your tests is a **surviving bug**. A good test **passes on the correct version and fails on the broken one**.
      `,
      md`
        ## Choose inputs where the versions differ

        To catch a bug, find an input where the right answer and the wrong answer are different. Put the two versions side by side. Guess what this prints.
      `,
      ex(py`
        def right(price):
            return price * 118 / 100

        def broken(price):
            return price + 18

        for p in [100, 200, 0]:
            print(p, right(p), broken(p))
      `, { predict: ["100 118.0 118\n200 236.0 218\n0 0.0 18", "100 118.0 118\n200 236.0 236\n0 0.0 0", "100 118 118\n200 236 218\n0 0 18"], answer: 0 }),
      md`
        At 100 the answers match, so 100 is a weak test for this bug. At 200 and at 0 they differ. **Strengthening a test** means adding asserts with such inputs.
      `,
      ask({
        q: md`Which assert catches the «price + 18» bug?`,
        options: ["«assert with_gst(200) == 236»", "«assert with_gst(100) == 118»", "«assert with_gst(200) > 200»"],
        answer: 0,
        explain: md`The broken version gives 218 for 200 rupees, so this assert fails on it. The correct version gives 236, so it passes there.`,
        why: [null, md`Both versions give 118 for 100 rupees. The bug survives.`, md`218 is also more than 200, so the bug survives. Check the exact answer.`],
      }),
      md`
        ## Change every input, one at a time

        A GST function has two inputs: the price and the rate. A bug can hide in either one. So vary the rate too, not only the price.
      `,
      ex(py`
        def broken(price, rate):
            return round(price * 1.18, 2)

        assert broken(100, 18) == 118
        assert broken(100, 5) == 105, "rate 5 should give 105"
        print("Survived")
      `, { error: true, label: "A crash on purpose",
           predict: ["AssertionError: rate 5 should give 105", "Survived", "TypeError"], answer: 0 }),
      md`
        This version always uses 18 percent. It passes the first test and fails the second, so the second test **catches** it. In a Catch the Bug round, you write asserts. The page runs them on the correct function, then on hidden broken versions, and tells you how many you caught.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          def broken(n):
              return n + 2

          tests = [(2, 4), (5, 10)]
          caught = 0
          for n, want in tests:
              if broken(n) != want:
                  caught += 1
          print(caught)
        `, options: ["1", "2", "0"], answer: 0,
        explain: md`The right answer is double. For 2, the broken version gives 4, which matches. For 5 it gives 7, not 10.`,
        why: [null, md`For 2, «2 + 2» and «2 * 2» are both 4. That test does not catch it.`, md`For 5, the broken version gives 7, not 10. That test catches it.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          def right(p):
              return p * 105 / 100

          def broken(p):
              return p + 5

          for p in range(0, 301, 50):
              if right(p) != broken(p):
                  print(p)
        `, options: ["It prints the prices where the two versions give different answers", "It prints the GST on each price", "It prints the prices where both versions agree"],
        answer: 0, verify: false, mono: false,
        explain: md`«!=» is True when the answers differ. Those prices make good tests.`,
        why: [null, md`It prints prices, not GST amounts.`, md`«!=» means not equal, so it prints where they disagree.`],
        skill: "read" },
      { q: md`Your asserts **fail on the correct function**. What does that mean?`,
        options: ["One of your hand-worked answers is wrong", "You caught a bug", "The correct function is broken"], answer: 0,
        explain: md`The correct function is right by rule. If an assert fails on it, your expected answer is wrong. Work it out again by hand.`,
        why: [null, md`A test must pass on the correct version first. Catching counts only on broken versions.`, md`In Catch the Bug, the target function is correct. Check your own answers.`],
        skill: "debug" },
      { q: md`What is a **surviving bug**?`,
        options: ["A broken version that passes all your tests", "A bug that crashes the program", "A test that fails on the correct function"], answer: 0,
        explain: md`It survives because no test fails on it. Add a test with an input where it gives a different answer.`,
        why: [null, md`A crash is easy to see. A surviving bug passes your tests quietly.`, md`That is a wrong test, not a surviving bug.`],
        skill: "memory" },
      { q: md`A broken version forgets to round to 2 places. Which assert catches it?`,
        options: ["«assert with_gst(19.99, 18) == 23.59»", "«assert with_gst(100, 18) == 118»", "«assert with_gst(0, 18) == 0»"], answer: 0,
        explain: md`19.99 plus 18 percent is 23.5882, which has more than 2 places. Without rounding, Python gives 23.588199999999997, not 23.59, so the assert fails on the broken version.`,
        why: [null, md`100 plus 18 percent is exactly 118, with no long decimal. Both versions agree.`, md`0 gives exactly 0 in both versions.`],
        skill: "write" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: where do they differ?",
        task: md`Answer each question without running the program.`,
        code: py`
          def right(n):
              return n * 2

          def broken(n):
              return n + 2

          caught = 0
          for n in [2, 0, 5]:
              if right(n) != broken(n):
                  caught += 1
          print(caught)
        `,
        inputs: [],
        ask: [{ line: 10, name: "n" }, { line: 10, hit: 2, name: "caught" }, { output: true }],
        hints: [
          md`For each number, work out both answers: double it, and add two.`,
          md`For 2, both answers are 4, so the counter does not go up. The counter line runs only when the answers differ.`,
          md`The answers differ for 0 and for 5. The first number that makes them differ is 0.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: which versions survive?",
        task: md`Each version should add 18 percent GST. Answer each question without running the program.`,
        code: py`
          def v1(p):
              return p * 118 // 100

          def v2(p):
              return p + 18

          def v3(p):
              return p * 18 // 100

          survivors = []
          for name, f in [("v1", v1), ("v2", v2), ("v3", v3)]:
              try:
                  assert f(100) == 118
                  survivors.append(name)
              except AssertionError:
                  pass
          print(survivors)
        `,
        inputs: [],
        ask: [{ line: 14, name: "survivors" }, { line: 16, name: "name" }, { output: true }],
        hints: [
          md`Work out each version for 100 rupees. A version survives when its answer is 118.`,
          md`When the assert fails, Python jumps to the except block and skips the line that adds the name.`,
          md`The first two versions give 118 for 100 rupees. The third gives only the tax.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: same or caught?",
        task: md`
          Put the lines in order and set each indent. The program compares a right and a broken 5 percent GST at two prices. It prints:

          | 100 same
          | 200 caught
        `,
        solution: py`
          def right(p):
              return p * 105 / 100

          def broken(p):
              return p + 5

          for p in [100, 200]:
              if right(p) == broken(p):
                  print(p, "same")
              else:
                  print(p, "caught")
        `,
        distractors: ["for p in [100]:", "return p * 5 / 100"],
        indent: "choose",
        tests: [{ output: "100 same\n200 caught" }],
        hints: [
          md`Both functions come first. Then the loop over the two prices.`,
          md`Inside the loop, compare the two answers. Each print goes inside its own branch.`,
          md`The broken version adds five rupees. The right version multiplies by 105 and divides by 100.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: a test that can never fail",
        task: md`
          The test should catch a broken «with_gst», such as one that adds 18 rupees instead of 18 percent. But line 6 compares the function with itself, so it passes on any version.

          Fix line 6 so it compares with the right answer for 200 rupees, worked out by hand. The program prints «All tests passed».
        `,
        starter: py`
          def with_gst(price):
              return price * 118 / 100

          def test_gst():
              assert with_gst(100) == 118
              assert with_gst(200) == with_gst(200)

          test_gst()
          print("All tests passed")
        `,
        bugLines: [6],
        solution: py`
          def with_gst(price):
              return price * 118 / 100

          def test_gst():
              assert with_gst(100) == 118
              assert with_gst(200) == 236

          test_gst()
          print("All tests passed")
        `,
        tests: [
          { output: "All tests passed" },
          { py: py`
              t = need("test_gst", "function")
              real = t.__globals__["with_gst"]
              def plus_rupees(price):
                  return price + 18
              def hundred_plus(price):
                  return 100 + price * 18 / 100
              def no_tax(price):
                  return price
              for broken in [plus_rupees, hundred_plus, no_tax]:
                  t.__globals__["with_gst"] = broken
                  caught = False
                  try:
                      t()
                  except AssertionError:
                      caught = True
                  finally:
                      t.__globals__["with_gst"] = real
                  assert caught, "Your test still passes on a broken with_gst. Compare with a number you worked out by hand."
            ` },
        ],
        wrong: [py`
          def with_gst(price):
              return price * 118 / 100

          def test_gst():
              assert with_gst(100) == 118
              assert with_gst(200) == 218

          test_gst()
          print("All tests passed")
        `, py`
          def with_gst(price):
              return price * 118 / 100

          def test_gst():
              assert with_gst(100) == 118
              assert with_gst(200) > 200

          test_gst()
          print("All tests passed")
        `],
        hints: [
          md`A test must compare the function's answer with a fixed number that you worked out by hand.`,
          md`Line 6 has the same call on both sides of the double equals sign, so it is always true.`,
          md`Work out 200 rupees plus 18 percent on paper. Put that number on the right side of line 6.`,
        ],
      },
      {
        id: "c1", kind: "catch", title: "Catch the Bug: five broken GST functions",
        task: md`
          «with_gst(price, rate)» adds GST to a price. The rate is a percent, like 5, 12 or 18. The answer is rounded to 2 places. A price below zero raises «ValueError». A price of 0 is allowed.

          : def with_gst(price, rate):
          :     if price < 0:
          :         raise ValueError("price cannot be below zero")
          :     return round(price + price * rate / 100, 2)

          There are **5 secretly broken versions**. Write asserts that pass on this correct function and fail on every broken one. The page tells you how many you caught, like «3 of 5», but not what each bug is.
        `,
        target: py`
          def with_gst(price, rate):
              if price < 0:
                  raise ValueError("price cannot be below zero")
              return round(price + price * rate / 100, 2)
        `,
        broken: [
          // 1: gives only the tax. Differs at with_gst(100, 18): 18.0, not 118.0.
          py`
            def with_gst(price, rate):
                if price < 0:
                    raise ValueError("price cannot be below zero")
                return round(price * rate / 100, 2)
          `,
          // 2: adds the rate as rupees. Differs at with_gst(200, 18): 218, not 236.0.
          py`
            def with_gst(price, rate):
                if price < 0:
                    raise ValueError("price cannot be below zero")
                return round(price + rate, 2)
          `,
          // 3: refuses a price of 0. Differs at with_gst(0, 18): ValueError, not 0.0.
          py`
            def with_gst(price, rate):
                if price <= 0:
                    raise ValueError("price cannot be below zero")
                return round(price + price * rate / 100, 2)
          `,
          // 4: always uses 18 percent. Differs at with_gst(100, 5): 118.0, not 105.0.
          py`
            def with_gst(price, rate):
                if price < 0:
                    raise ValueError("price cannot be below zero")
                return round(price * 1.18, 2)
          `,
          // 5: drops the paise. Differs at with_gst(99, 18): 116, not 116.82.
          py`
            def with_gst(price, rate):
                if price < 0:
                    raise ValueError("price cannot be below zero")
                return int(price + price * rate / 100)
          `,
        ],
        starter: py`
          # Work out each answer by hand, then write one assert for it.
          assert with_gst(100, 18) == 118
        `,
        solution: py`
          assert with_gst(100, 18) == 118
          assert with_gst(200, 18) == 236
          assert with_gst(100, 5) == 105
          assert with_gst(0, 18) == 0
          assert with_gst(99, 18) == 116.82
        `,
        hints: [
          md`Each assert should use an input where a right answer and a likely wrong answer are different. Vary the price and the rate, one at a time.`,
          md`Think of the edges and odd values. Try a price of 0, a rate that is not 18, a price other than 100, and a price whose GST has paise.`,
          md`Try 200 rupees at 18 percent, 100 rupees at 5 percent, 0 rupees, and 99 rupees at 18 percent. Work out each answer by hand first.`,
        ],
      },
    ],
    keys: [
      md`A **broken version** is a copy of a function with one small mistake.`,
      md`A good test **passes on the correct version and fails on the broken one**.`,
      md`A **surviving bug** passes all your tests. Add an input where it gives a different answer.`,
      md`Strengthen tests by changing each input in turn: other prices, other rates, 0, and values with paise.`,
      md`If your assert fails on the correct function, your hand-worked answer is wrong.`,
    ],
  });

  // ---------------------------------------------------------------- Day 75
  // Tests first on an easy function (round a bill up to the next 5 rupees),
  // then the Make: the lakh-crore formatter. No Catch the Bug round today.
  day({
    slug: "tests-first-lakh-crore",
    title: "Tests First: Lakh and Crore",
    goal: "Write the tests first on an easy function, then write 1234567 as 12,34,567.",
    minutes: 45,
    kind: "lesson",
    needs: [13, 25, 32, 74],
    win: "Today you can now write the tests first, then build a function one small step at a time.",
    learn: [
      md`
        ## Write a failing test first

        A shop rounds every bill **up** to the next 5 rupees: 11 becomes 15, and 10 stays 10. In the **tests-first** method, you write the tests before the real code. The function is only a stub with «pass», as on Day 55. Guess what happens.
      `,
      ex(py`
        def round_up_5(bill):
            pass

        def test_round_up_5():
            assert round_up_5(10) == 10
            assert round_up_5(11) == 15

        test_round_up_5()
        print("All tests passed")
      `, { error: true, label: "A crash on purpose",
           predict: ["AssertionError", "All tests passed", "NameError"], answer: 0 }),
      md`
        The stub gives back «None», so the first «assert» fails. That is good. A **failing test first** proves that the test can fail. Now the tests are your **plan**: they say exactly what the code must do.
      `,
      md`
        ## One test, one small step

        Make one test pass with the smallest change. Then run **all** the tests. Then add the next test, such as 14 and 0. Guess what this finished version prints.
      `,
      ex(py`
        def round_up_5(bill):
            if bill % 5 == 0:
                return bill
            return bill + (5 - bill % 5)

        def test_round_up_5():
            assert round_up_5(10) == 10
            assert round_up_5(11) == 15
            assert round_up_5(14) == 15
            assert round_up_5(0) == 0

        test_round_up_5()
        print("All tests passed")
      `, { predict: ["All tests passed", "AssertionError", "10\n15\n15\n0\nAll tests passed"], answer: 0 }),
      md`
        «bill % 5» is how far the bill is past the last multiple of 5. For 11, that is 1, so we add 4. Each small step ends with every test passing, so you always know which change broke something.
      `,
      pause(md`A good place for a short break. Your progress is saved.`),
      md`
        ## Cleaning up safely

        When all tests pass, you may rewrite the code to make it shorter or clearer. This is **cleaning up**. Then run the same tests again. Guess the result.
      `,
      ex(py`
        def round_up_5(bill):
            return (bill + 4) // 5 * 5

        def test_round_up_5():
            assert round_up_5(10) == 10
            assert round_up_5(11) == 15
            assert round_up_5(14) == 15
            assert round_up_5(0) == 0

        test_round_up_5()
        print("All tests passed")
      `, { predict: ["All tests passed", "AssertionError", "SyntaxError"], answer: 0 }),
      md`
        The code is new, but the tests are the same, and they still pass. So the clean-up broke nothing. Without tests, every clean-up is a risk.
      `,
      ask({
        q: md`You will write «indian(n)», which shows 1234567 as «12,34,567». Which test do you write **first**?`,
        options: ['«assert indian(0) == "0"»', '«assert indian(1234567) == "12,34,567"»', '«assert indian(100000) == "1,00,000"»'],
        answer: 0,
        explain: md`Start with the easiest case. A number with 3 digits or fewer needs no commas at all.`,
        why: [null, md`This is the hardest case. Build up to it one small step at a time.`, md`This needs two commas. Start with a case that needs none.`],
      }),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          s = str(1234567)
          print(s[:-3], s[-3:])
        `, options: ["1234 567", "123 4567", "567 1234"], answer: 0,
        explain: md`«s[-3:]» is the last 3 characters. «s[:-3]» is everything before them.`,
        why: [null, md`A minus in a slice counts from the end. «s[:-3]» stops 3 characters before the end.`, md`The first value printed is «s[:-3]», the front part.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          def round_up_10(bill):
              if bill % 10 == 0:
                  return bill
              return bill + (10 - bill % 10)

          assert round_up_10(40) == 40
          assert round_up_10(41) == 50
          print("OK")
        `, options: ["It rounds a bill up to the next 10 rupees, checks two cases, and prints OK", "It rounds every bill down to 10 rupees", "It prints each bill after rounding"],
        answer: 0, verify: false, mono: false,
        explain: md`41 goes up to 50, and 40 stays 40. The asserts check this, then «OK» is printed.`,
        why: [null, md`41 becomes 50, so it rounds up, not down.`, md`Only «OK» is printed. The asserts print nothing.`],
        skill: "read" },
      { q: md`You write a new test, and it **passes at once**, before you change any code. What should you think?`,
        options: ["The test may be too weak, or the code already does this. Check the test.", "Good, the step is finished", "Python skipped the test"], answer: 0,
        explain: md`In tests-first, a new test should fail first. If it passes, make sure it really checks something new.`,
        why: [null, md`A test that never failed has not yet proved that it can catch a mistake.`, md`Python runs every assert. It passed because the code already gives that answer.`],
        skill: "debug" },
      { q: md`In the tests-first method, what do you do right after writing a new test?`,
        options: ["Run it and see it fail", "Clean up the code", "Write the whole function"], answer: 0,
        explain: md`The order is: failing test, small change to pass, clean up, next test.`,
        why: [null, md`Clean up comes only after all tests pass.`, md`You write only enough code to pass this one test.`],
        skill: "memory" },
      { q: md`What does this show?`, code: py`print(",".join(["1", "00"]) + "," + "000")`,
        options: ["1,00,000", "100000", "1,00000"], answer: 0,
        explain: md`«join» puts a comma between «1» and «00». Then «,000» is added at the end.`,
        why: [null, md`«join» adds a comma between the pieces.`, md`The second «+» adds a comma before «000».`],
        skill: "trace" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: a test catches an edge",
        task: md`This first try forgets the bills that are already a multiple of 5. Answer each question without running the program.`,
        code: py`
          def round_up_5(bill):
              return bill + (5 - bill % 5)

          passed = 0
          for bill, want in [(11, 15), (14, 15), (10, 10)]:
              got = round_up_5(bill)
              if got == want:
                  passed += 1
              else:
                  print("Fails for", bill, "gave", got)
          print(passed, "of 3")
        `,
        inputs: [],
        ask: [{ line: 6, hit: 3, name: "got" }, { line: 8, hit: 2, name: "passed" }, { output: true }],
        hints: [
          md`For each bill, work out the remainder after dividing by 5, then add five minus that remainder.`,
          md`For 11 and 14 the answer is 15. For 10 the remainder is 0, so the function adds a full 5.`,
          md`Two tests pass. The test for 10 fails and prints its line with the wrong answer 15.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: lakh and crore groups",
        task: md`Answer each question without running the program.`,
        code: py`
          s = str(1234567)
          last3 = s[-3:]
          rest = s[:-3]
          groups = []
          while len(rest) > 2:
              groups.insert(0, rest[-2:])
              rest = rest[:-2]
          groups.insert(0, rest)
          print(",".join(groups) + "," + last3)
        `,
        inputs: [],
        ask: [{ line: 3, name: "rest" }, { line: 6, name: "groups" }, { output: true }],
        hints: [
          md`First split the text into the last 3 digits and the front part.`,
          md`While the front part is longer than 2 digits, its last 2 digits go to the front of the groups list.`,
          md`The front part 1234 gives the group 34, then 12 is left. Join the groups with commas, then add the last three digits.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: the tests-first plan",
        task: md`Put the steps of the tests-first method in the right order, for one round.`,
        solution: py`
          Write one test for the easiest case you have not done yet
          Run it and see it fail
          Write just enough code to make it pass
          Run every test and see them all pass
          Clean up the code, then run every test again
        `,
        distractors: ["Write the whole function before any test"],
        order: "fixed",
        hints: [
          md`The method starts with a test, not with code.`,
          md`A new test should fail before you change the code. Then a small change makes it pass.`,
          md`Clean up is the last step, and the tests run again after it.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: a clean-up that broke an edge",
        task: md`
          This «indian» function passed all its tests. Then someone cleaned it up, and now the tests stop with:

          | AssertionError: indian(999) gave ',999'

          Fix the one wrong line so the program prints «All tests passed».
        `,
        starter: py`
          def indian(n):
              s = str(n)
              if len(s) < 3:
                  return s
              rest = s[:-3]
              groups = []
              while len(rest) > 2:
                  groups.insert(0, rest[-2:])
                  rest = rest[:-2]
              groups.insert(0, rest)
              return ",".join(groups) + "," + s[-3:]

          def test_indian():
              for n, want in [(0, "0"), (999, "999"), (1000, "1,000"), (100000, "1,00,000")]:
                  got = indian(n)
                  assert got == want, f"indian({n}) gave {repr(got)}"

          test_indian()
          print("All tests passed")
        `,
        bugLines: [3],
        solution: py`
          def indian(n):
              s = str(n)
              if len(s) <= 3:
                  return s
              rest = s[:-3]
              groups = []
              while len(rest) > 2:
                  groups.insert(0, rest[-2:])
                  rest = rest[:-2]
              groups.insert(0, rest)
              return ",".join(groups) + "," + s[-3:]

          def test_indian():
              for n, want in [(0, "0"), (999, "999"), (1000, "1,000"), (100000, "1,00,000")]:
                  got = indian(n)
                  assert got == want, f"indian({n}) gave {repr(got)}"

          test_indian()
          print("All tests passed")
        `,
        tests: [
          { output: "All tests passed" },
          { py: py`
              expect("indian", (100,), "100")
              expect("indian", (12345,), "12,345")
              expect("indian", (1234567,), "12,34,567")
            ` },
        ],
        wrong: [py`
          def indian(n):
              s = str(n)
              if len(s) == 3:
                  return s
              rest = s[:-3]
              groups = []
              while len(rest) > 2:
                  groups.insert(0, rest[-2:])
                  rest = rest[:-2]
              groups.insert(0, rest)
              return ",".join(groups) + "," + s[-3:]

          def test_indian():
              for n, want in [(0, "0"), (999, "999")]:
                  got = indian(n)
                  assert got == want, f"indian({n}) gave {repr(got)}"

          test_indian()
          print("All tests passed")
        `, py`
          def indian(n):
              s = str(n)
              if len(s) < 3:
                  return s
              rest = s[:-3]
              groups = []
              while len(rest) > 2:
                  groups.insert(0, rest[-2:])
                  rest = rest[:-2]
              groups.insert(0, rest)
              return ",".join(groups) + "," + s[-3:]

          print("All tests passed")
        `],
        hints: [
          md`Read the red message. A number with exactly 3 digits went past the first check.`,
          md`Line 3 lets through only numbers with fewer than 3 digits. A 3-digit number also needs no comma.`,
          md`Change the comparison on line 3 so a text of length 3 is also returned at once.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: round up to the next 10", optional: true,
        task: md`
          Change this program to round a bill **up to the next 10 rupees**. Rename the function to «round_up_10». Change the tests first: 40 stays 40, 41 becomes 50, 49 becomes 50, and 0 stays 0. Then change the code until it prints «All tests passed».
        `,
        starter: py`
          def round_up_5(bill):
              if bill % 5 == 0:
                  return bill
              return bill + (5 - bill % 5)

          def test_round_up_5():
              assert round_up_5(10) == 10
              assert round_up_5(11) == 15
              assert round_up_5(0) == 0

          test_round_up_5()
          print("All tests passed")
        `,
        solution: py`
          def round_up_10(bill):
              if bill % 10 == 0:
                  return bill
              return bill + (10 - bill % 10)

          def test_round_up_10():
              assert round_up_10(40) == 40
              assert round_up_10(41) == 50
              assert round_up_10(49) == 50
              assert round_up_10(0) == 0

          test_round_up_10()
          print("All tests passed")
        `,
        tests: [
          { output: "All tests passed" },
          { py: py`
              expect("round_up_10", (40,), 40)
              expect("round_up_10", (41,), 50)
              expect("round_up_10", (49,), 50)
              expect("round_up_10", (0,), 0)
              expect("round_up_10", (125,), 130)
            ` },
        ],
        wrong: [py`
          def round_up_10(bill):
              return bill + (10 - bill % 10)

          def test_round_up_10():
              assert round_up_10(41) == 50
              assert round_up_10(49) == 50

          test_round_up_10()
          print("All tests passed")
        `],
        hints: [
          md`Change the tests first, with the new name and the new answers. Run them and see them fail.`,
          md`Every 5 in the function becomes 10. The test that 40 stays 40 needs the first check in the function.`,
          md`Rename both the function and every call to it, then change the remainder and the amount added to use 10.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: lakh and crore, tests first",
        task: md`
          Indian numbers put a comma after the last 3 digits, then after every 2 digits: 1234567 is «12,34,567». Write «indian(n)» for whole numbers 0 or more. It **returns** text.

          Work tests first:

          - Write a function whose name starts with «test_», with an assert for each edge: «0», «999», «1000» and «100000».
          - Then write «indian» one small step at a time, until every test passes.

          Call your test function, then print «All tests passed». The program shows:

          | All tests passed
        `,
        starter: py`

        `,
        solution: py`
          def indian(n):
              s = str(n)
              if len(s) <= 3:
                  return s
              rest = s[:-3]
              groups = []
              while len(rest) > 2:
                  groups.insert(0, rest[-2:])
                  rest = rest[:-2]
              groups.insert(0, rest)
              return ",".join(groups) + "," + s[-3:]

          def test_indian():
              assert indian(0) == "0"
              assert indian(999) == "999"
              assert indian(1000) == "1,000"
              assert indian(100000) == "1,00,000"
              assert indian(1234567) == "12,34,567"

          test_indian()
          print("All tests passed")
        `,
        tests: [
          { output: "All tests passed" },
          { py: py`
              expect("indian", (0,), "0")
              expect("indian", (7,), "7")
              expect("indian", (999,), "999")
              expect("indian", (1000,), "1,000")
              expect("indian", (99999,), "99,999")
            ` },
          { py: py`
              expect("indian", (100000,), "1,00,000")
              expect("indian", (1234567,), "12,34,567")
              expect("indian", (10000000,), "1,00,00,000")
              expect("indian", (123456789,), "12,34,56,789")
            ` },
          { py: py`
              tests = [v for k, v in list(globals().items()) if k.startswith("test_") and callable(v)]
              assert tests, "Put your asserts inside a function whose name starts with test_, like test_indian."
              real = tests[0].__globals__["indian"]
              tried = []
              def spy(n):
                  tried.append(n)
                  return real(n)
              for t in tests:
                  t.__globals__["indian"] = spy
                  try:
                      t()
                  finally:
                      t.__globals__["indian"] = real
              for edge in [0, 999, 1000, 100000]:
                  assert edge in tried, f"Your tests never try indian({edge}). Write an assert for each edge: 0, 999, 1000 and 100000."
            ` },
        ],
        wrong: [py`
          def indian(n):
              s = str(n)
              if len(s) <= 3:
                  return s
              rest = s[:-3]
              groups = []
              while len(rest) > 3:
                  groups.insert(0, rest[-3:])
                  rest = rest[:-3]
              groups.insert(0, rest)
              return ",".join(groups) + "," + s[-3:]

          def test_indian():
              assert indian(0) == "0"
              assert indian(999) == "999"
              assert indian(1000) == "1,000"

          test_indian()
          print("All tests passed")
        `, py`
          def indian(n):
              return f"{n:,}"

          def test_indian():
              assert indian(0) == "0"
              assert indian(999) == "999"
              assert indian(1000) == "1,000"

          test_indian()
          print("All tests passed")
        `, py`
          def indian(n):
              s = str(n)
              if len(s) <= 3:
                  return s
              rest = s[:-3]
              groups = []
              while len(rest) > 2:
                  groups.insert(0, rest[-2:])
                  rest = rest[:-2]
              groups.insert(0, rest)
              return ",".join(groups) + "," + s[-3:]

          def test_indian():
              assert indian(1234567) == "12,34,567"

          test_indian()
          print("All tests passed")
        `],
        hints: [
          md`Start with the test for 0 and a function that just turns the number into text. Then add the test for 1000, then 100000.`,
          md`Split the text into the last three digits and the front part. While the front part is longer than two digits, take two digits at a time from its end.`,
          md`Collect the two-digit groups at the front of a list, and put what is left at the very front. Then join them with commas, and add a comma and the last three digits.`,
        ],
      },
    ],
    keys: [
      md`Tests first: write a test, run it, and see it **fail** before you write the code.`,
      md`One test, one small step. After each step, run **every** test.`,
      md`Clean up only when all tests pass, then run them again. They prove nothing broke.`,
      md`A list of tests is a **plan**: start with the easiest case, end with the hardest.`,
      md`Indian numbers: the last 3 digits, then groups of 2, like «12,34,567».`,
    ],
  });

  // ---------------------------------------------------------------- Day 76
  // Placed after the testing days: first, last, missing and one-item are edge
  // cases. Hidden tests count reads through a list that counts its own use.
  day({
    slug: "find-fast-by-halving",
    title: "Find Fast by Halving",
    goal: "Compare checking every item with halving a sorted list.",
    minutes: 45,
    kind: "lesson",
    needs: [19, 22, 49, 73],
    win: "Today you can now find an item in a sorted list by halving, with far fewer checks.",
    learn: [
      md`
        ## One by one: count the checks

        A **one-by-one search** looks at each item in turn, as on Day 19. Each time we compare an item with the target, that is one **check**. Guess how many checks this needs.
      `,
      ex(py`
        rolls = [101, 105, 110, 118, 123, 131, 140, 152]
        target = 140
        checks = 0
        for r in rolls:
            checks += 1
            if r == target:
                break
        print("Checks:", checks)
      `, { predict: ["Checks: 7", "Checks: 8", "Checks: 1"], answer: 0 }),
      md`
        140 is the 7th item, so we need 7 checks. Among 1,00,000 roll numbers, a missing number needs 1,00,000 checks. When the list is **sorted** (in order, small to big), there is a much faster way.
      `,
      md`
        ## Halving: low, high and mid

        Keep two positions, «low» and «high», around the part still to search. Look at the middle item, «mid». If it is too small, the target must be to the right, so throw away the left half. Guess the result.
      `,
      ex(py`
        rolls = [101, 105, 110, 118, 123, 131, 140, 152]
        target = 140
        low = 0
        high = len(rolls) - 1
        checks = 0
        while low <= high:
            mid = (low + high) // 2
            checks += 1
            if rolls[mid] == target:
                print("Found at", mid, "after", checks, "checks")
                break
            if rolls[mid] < target:
                low = mid + 1
            else:
                high = mid - 1
      `, { predict: ["Found at 6 after 3 checks", "Found at 6 after 7 checks", "Found at 7 after 3 checks"], answer: 0 }),
      md`
        Each check throws away half of what is left. For 1,00,000 sorted roll numbers, halving needs **at most 17** checks. If «low» passes «high», nothing is left, so the target is missing.
      `,
      pause(md`A good place for a short break. Your progress is saved.`),
      md`
        ## The list must be sorted

        Halving trusts the order. If the list is not sorted, it throws away the wrong half. Guess what this prints. 20 is in the list.
      `,
      ex(py`
        def find(items, target):
            low = 0
            high = len(items) - 1
            while low <= high:
                mid = (low + high) // 2
                if items[mid] == target:
                    return mid
                if items[mid] < target:
                    low = mid + 1
                else:
                    high = mid - 1
            return -1

        print(find([40, 10, 30, 20, 50], 20))
        print(find(sorted([40, 10, 30, 20, 50]), 20))
      `, { predict: ["-1\n1", "3\n1", "1\n1"], answer: 0 }),
      md`
        The middle item is 30, and 20 is smaller, so the search throws away the right half, where 20 is. After «sorted», it works. Test the edge cases from Day 73 too: the first item, the last item, a missing item and a one-item list.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          low = 0
          high = 9
          mid = (low + high) // 2
          print(mid)
        `, options: ["4", "4.5", "5"], answer: 0,
        explain: md`«(0 + 9) // 2» is 4. «//» drops the part after the point, so «mid» is always a whole number.`,
        why: [null, md`«//» gives a whole number. 4.5 could not be a position.`, md`«//» rounds down, not up.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          def count_checks(items, target):
              checks = 0
              for x in items:
                  checks += 1
                  if x == target:
                      return checks
              return checks
        `, options: ["It counts how many items a one-by-one search looks at before it finds the target", "It counts how many times the target appears", "It finds the target by halving"],
        answer: 0, verify: false, mono: false,
        explain: md`It stops at the first match and gives back the number of checks. If the target is missing, it checks every item.`,
        why: [null, md`It stops at the first match, so it does not count repeats.`, md`There is no «low», «high» or «mid». It looks at each item in turn.`],
        skill: "read" },
      { q: md`Halving gives -1 for a number that **is** in the list. What is the most likely cause?`,
        options: ["The list is not sorted", "The list is too long", "«mid» uses «//»"], answer: 0,
        explain: md`Halving throws away half the list each time. That is safe only when the items are in order.`,
        why: [null, md`Halving works on lists of any length. Long lists are where it helps most.`, md`«//» is right. It keeps «mid» a whole number.`],
        skill: "debug" },
      { q: md`About how many checks does halving need, at most, for 1,00,000 sorted roll numbers?`,
        options: ["17", "50,000", "1,00,000"], answer: 0,
        explain: md`Each check halves what is left. 1,00,000 halved 17 times leaves less than one item.`,
        why: [null, md`That is about the average for a one-by-one search.`, md`That is the worst case for a one-by-one search.`],
        skill: "memory" },
      { q: md`Which list can you search by halving, as written today?`,
        options: ["[3, 8, 15, 22, 30]", "[8, 3, 22, 15, 30]", "[30, 3, 22, 8, 15]"], answer: 0,
        explain: md`Halving needs the items in order, from small to big.`,
        why: [null, md`8 comes before 3, so this list is not sorted.`, md`This list is in no order at all.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: one by one, target missing",
        task: md`Answer each question without running the program.`,
        code: py`
          marks = [35, 42, 58, 61, 77]
          target = 50
          checks = 0
          found = False
          for m in marks:
              checks += 1
              if m == target:
                  found = True
                  break
          print(found, checks)
        `,
        inputs: [],
        ask: [{ line: 6, hit: 2, name: "m" }, { line: 6, hit: 5, name: "checks" }, { output: true }],
        hints: [
          md`The loop looks at each mark in turn and counts one check each time.`,
          md`50 is not in the list, so the loop never breaks. It checks every mark.`,
          md`The second mark is 42. There are five marks, so there are five checks, and the flag stays False.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: halving to the last item",
        task: md`Answer each question without running the program.`,
        code: py`
          rolls = [101, 105, 110, 118, 123, 131, 140, 152]
          target = 152
          low = 0
          high = len(rolls) - 1
          while low <= high:
              mid = (low + high) // 2
              if rolls[mid] == target:
                  print("Found at", mid)
                  break
              if rolls[mid] < target:
                  low = mid + 1
              else:
                  high = mid - 1
        `,
        inputs: [],
        ask: [{ line: 6, name: "mid" }, { line: 6, hit: 3, name: "mid" }, { output: true }],
        hints: [
          md`Write low, high and mid on paper. At the start, low is 0 and high is the last position, 7.`,
          md`Each time the middle item is too small, low moves to one after mid. Work out mid again from the new low.`,
          md`The middle positions are 3, then 5, then 6, then 7. The target is the last item.`,
        ],
      },
      {
        id: "t3", kind: "trace", title: "Be the Computer: a missing roll number",
        task: md`Answer each question without running the program.`,
        code: py`
          rolls = [101, 105, 110, 118, 123]
          target = 100
          low = 0
          high = len(rolls) - 1
          checks = 0
          while low <= high:
              mid = (low + high) // 2
              checks += 1
              if rolls[mid] == target:
                  break
              if rolls[mid] < target:
                  low = mid + 1
              else:
                  high = mid - 1
          print(low, high, checks)
        `,
        inputs: [],
        ask: [{ line: 14, name: "high" }, { line: 14, hit: 2, name: "high" }, { output: true }],
        hints: [
          md`100 is smaller than every roll number, so the middle item is always too big.`,
          md`When the middle item is too big, high moves to one before mid. The loop stops when low is bigger than high.`,
          md`The middle positions are 2, then 0. High becomes 1, then minus 1. There are two checks.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: the halving search",
        task: md`
          Put the lines in order and set each indent. «find» gives back the position of «target», or -1 if it is missing. The program prints:

          | 2 -1 0
        `,
        solution: py`
          def find(items, target):
              low = 0
              high = len(items) - 1
              while low <= high:
                  mid = (low + high) // 2
                  if items[mid] == target:
                      return mid
                  if items[mid] < target:
                      low = mid + 1
                  else:
                      high = mid - 1
              return -1

          print(find([12, 25, 37, 48], 37), find([12, 25, 37, 48], 5), find([7], 7))
        `,
        distractors: ["mid = (low + high) / 2", "while low < high:"],
        indent: "choose",
        tests: [
          { output: "2 -1 0" },
          { py: py`
              expect("find", ([5, 9, 14], 5), 0)
              expect("find", ([5, 9, 14], 14), 2)
              expect("find", ([5, 9, 14], 10), -1)
              expect("find", ([], 3), -1)
            ` },
        ],
        hints: [
          md`low and high are set before the loop. The middle position is worked out at the top of the loop.`,
          md`Found means give back mid at once. Too small moves low up; otherwise high moves down. Minus one goes after the loop.`,
          md`Use the double slash for mid, so it is a whole number. The loop runs while low is less than or equal to high, so a one-item list works.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the last item is never found",
        task: md`
          «find» should give back the position of «target», or -1. It works for some items, but «find([1, 3, 5, 7], 7)» gives -1, and «find([7], 7)» gives -1 too. The program should print:

          | 3 0 -1

          Fix the one wrong line.
        `,
        starter: py`
          def find(items, target):
              low = 0
              high = len(items) - 1
              while low < high:
                  mid = (low + high) // 2
                  if items[mid] == target:
                      return mid
                  if items[mid] < target:
                      low = mid + 1
                  else:
                      high = mid - 1
              return -1

          print(find([1, 3, 5, 7], 7), find([7], 7), find([1, 3, 5, 7], 9))
        `,
        bugLines: [4],
        solution: py`
          def find(items, target):
              low = 0
              high = len(items) - 1
              while low <= high:
                  mid = (low + high) // 2
                  if items[mid] == target:
                      return mid
                  if items[mid] < target:
                      low = mid + 1
                  else:
                      high = mid - 1
              return -1

          print(find([1, 3, 5, 7], 7), find([7], 7), find([1, 3, 5, 7], 9))
        `,
        tests: [
          { output: "3 0 -1" },
          { py: py`
              expect("find", ([10, 20, 30, 40, 50], 10), 0)
              expect("find", ([10, 20, 30, 40, 50], 50), 4)
              expect("find", ([10, 20, 30, 40, 50], 35), -1)
              expect("find", ([10, 20, 30, 40, 50], 60), -1)
              expect("find", ([], 5), -1)
            ` },
        ],
        wrong: [py`
          def find(items, target):
              low = 0
              high = len(items)
              while low <= high:
                  mid = (low + high) // 2
                  if items[mid] == target:
                      return mid
                  if items[mid] < target:
                      low = mid + 1
                  else:
                      high = mid - 1
              return -1

          print(find([1, 3, 5, 7], 7), find([7], 7), find([1, 3, 5, 7], 9))
        `],
        hints: [
          md`Try the one-item list by hand. At the start, low and high are both 0. Does the loop run at all?`,
          md`Line 4 stops the loop when low equals high, but one item is still left to check then.`,
          md`Change the comparison on line 4 so the loop also runs when low and high are equal.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: stop early in a sorted list", optional: true,
        task: md`
          This one-by-one search always walks to the end when the target is missing. The list is sorted, so once an item is **bigger** than the target, the target cannot come later. Change the loop so it gives back -1 at once in that case.

          A hidden test counts how many items your function reads. To find 5 in «[0, 2, 4, 6, 8, ...]», it may read at most 10 items.
        `,
        starter: py`
          def find_one_by_one(items, target):
              for i in range(len(items)):
                  if items[i] == target:
                      return i
              return -1

          print(find_one_by_one([10, 20, 30, 40], 30), find_one_by_one([10, 20, 30, 40], 25))
        `,
        solution: py`
          def find_one_by_one(items, target):
              for i in range(len(items)):
                  if items[i] == target:
                      return i
                  if items[i] > target:
                      return -1
              return -1

          print(find_one_by_one([10, 20, 30, 40], 30), find_one_by_one([10, 20, 30, 40], 25))
        `,
        tests: [
          { output: "2 -1" },
          { py: py`
              expect("find_one_by_one", ([10, 20, 30, 40], 10), 0)
              expect("find_one_by_one", ([10, 20, 30, 40], 40), 3)
              expect("find_one_by_one", ([10, 20, 30, 40], 45), -1)
              expect("find_one_by_one", ([10, 20, 30, 40], 5), -1)
              expect("find_one_by_one", ([], 5), -1)
            ` },
          { py: py`
              class Counted(list):
                  reads = 0
                  def __getitem__(self, i):
                      Counted.reads += 1
                      return list.__getitem__(self, i)
                  def __iter__(self):
                      Counted.reads += len(self)
                      return list.__iter__(self)
              f = need("find_one_by_one", "function")
              items = Counted(range(0, 2000, 2))
              got = f(items, 5)
              assert got == -1, f"find_one_by_one(..., 5) should give back -1, but it gave back {got}."
              assert Counted.reads <= 10, f"To learn that 5 is missing, your function read {Counted.reads} items. Stop as soon as an item is bigger than the target."
            ` },
        ],
        wrong: [py`
          def find_one_by_one(items, target):
              for i in range(len(items)):
                  if items[i] == target:
                      return i
                  if items[i] < target:
                      return -1
              return -1

          print(find_one_by_one([10, 20, 30, 40], 30), find_one_by_one([10, 20, 30, 40], 25))
        `],
        hints: [
          md`The list goes from small to big. Once you pass the place where the target would be, stop.`,
          md`Add a second check inside the loop, after the check for a match.`,
          md`If the current item is bigger than the target, give back minus one at once.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: find a roll number among 1,00,000",
        task: md`
          Write «find(rolls, target)». «rolls» is a sorted list of roll numbers. It gives back the position of «target», or -1 if it is missing. Use **halving**, with «low», «high» and «mid».

          A hidden test counts how many items your function reads. Among 1,00,000 roll numbers, it may read **at most 40**. One by one is too slow.

          This main program:

          : print(find([101, 105, 110, 118], 110))
          : print(find([101, 105, 110, 118], 120))

          shows:

          | 2
          | -1
        `,
        starter: py`

        `,
        solution: py`
          def find(rolls, target):
              low = 0
              high = len(rolls) - 1
              while low <= high:
                  mid = (low + high) // 2
                  if rolls[mid] == target:
                      return mid
                  if rolls[mid] < target:
                      low = mid + 1
                  else:
                      high = mid - 1
              return -1

          print(find([101, 105, 110, 118], 110))
          print(find([101, 105, 110, 118], 120))
        `,
        tests: [
          { py: py`
              expect("find", ([101, 105, 110, 118], 110), 2)
              expect("find", ([101, 105, 110, 118], 101), 0)
              expect("find", ([101, 105, 110, 118], 118), 3)
              expect("find", ([101, 105, 110, 118], 120), -1)
              expect("find", ([101, 105, 110, 118], 100), -1)
              expect("find", ([101, 105, 110, 118], 107), -1)
            ` },
          { py: py`
              expect("find", ([555], 555), 0)
              expect("find", ([555], 554), -1)
              expect("find", ([], 555), -1)
            ` },
          { py: py`
              class Counted(list):
                  reads = 0
                  def __getitem__(self, i):
                      Counted.reads += 1
                      return list.__getitem__(self, i)
                  def __iter__(self):
                      Counted.reads += len(self)
                      return list.__iter__(self)
                  def __contains__(self, x):
                      Counted.reads += len(self)
                      return list.__contains__(self, x)
                  def index(self, *args):
                      Counted.reads += len(self)
                      return list.index(self, *args)
              f = need("find", "function")
              rolls = Counted(range(100001, 200001))
              for target in [100001, 200000, 150000, 123457, 99999, 250000]:
                  Counted.reads = 0
                  got = f(rolls, target)
                  want = target - 100001 if 100001 <= target <= 200000 else -1
                  assert got == want, f"Among 1,00,000 roll numbers, find(rolls, {target}) should give back {want}, but it gave back {got}."
                  assert Counted.reads <= 40, f"To look for {target} among 1,00,000 roll numbers, your function read {Counted.reads} items. Halving needs at most about 34. Use low, high and mid."
            ` },
        ],
        wrong: [py`
          def find(rolls, target):
              for i in range(len(rolls)):
                  if rolls[i] == target:
                      return i
              return -1
        `, py`
          def find(rolls, target):
              low = 0
              high = len(rolls) - 1
              while low < high:
                  mid = (low + high) // 2
                  if rolls[mid] == target:
                      return mid
                  if rolls[mid] < target:
                      low = mid + 1
                  else:
                      high = mid - 1
              return -1
        `, py`
          def find(rolls, target):
              if target in rolls:
                  return rolls.index(target)
              return -1
        `],
        hints: [
          md`Keep two positions around the part still to search: low starts at the first position and high at the last.`,
          md`Use a loop that runs while low is not past high. Inside it, work out the middle position with the double slash, and compare the middle item with the target.`,
          md`If they match, give back mid. If the middle item is too small, move low to one after mid; if too big, move high to one before mid. After the loop, give back minus one.`,
        ],
      },
    ],
    keys: [
      md`A **one-by-one search** may check every item: 1,00,000 checks for 1,00,000 items.`,
      md`Halving needs a **sorted** list. On an unsorted list it throws away the wrong half.`,
      md`Keep «low» and «high». Look at «mid = (low + high) // 2», then throw away half.`,
      md`When «low» passes «high», nothing is left: the target is missing, so give back -1.`,
      md`Count the checks: halving needs at most 17 for 1,00,000 items.`,
      md`Test the edges: first item, last item, missing item, one item and an empty list.`,
    ],
  });

  // ---------------------------------------------------------------- Day 77
  day({
    slug: "cricket-scorecard",
    title: "Project: Cricket Scorecard",
    goal: "Turn a list of balls into runs, wickets, overs and run rate, with tests.",
    minutes: 50,
    kind: "project",
    needs: [24, 30, 32, 75],
    win: "Today you can now turn a list of balls into a full cricket scorecard, and prove it right with your own tests. This completes Level 6.",
    learn: [
      md`
        ## The ball list

        A scorer writes down every ball. In this project each ball is a piece of text in a list. «"0"» to «"6"» are runs. «"W"» is a **wicket**: the batter is out and no run is scored.

        «"wd"» is a **wide**: the bowler bowled too far from the batter. The team gets 1 extra run. The ball is bowled again, so a wide is **not** one of the 6 balls of an over.
      `,
      ex(py`
        balls = ["1", "4", "wd", "W", "6"]
        legal = 0
        for ball in balls:
            if ball != "wd":
                legal += 1
        print(legal)
      `, { predict: ["4", "5", "3"], answer: 0 }),
      md`
        Five balls were written down, but only 4 count, because the wide does not.

        ## How overs are written

        An over is 6 legal balls. Scorers write «4.3» for 4 full overs and 3 more balls. It does **not** mean 4.3 of an over. So 27 legal balls are written «4.3»:
      `,
      code(py`
        n = 27
        print(n // 6)    # 4 full overs
        print(n % 6)     # 3 balls left over
        # Written as "4.3"
      `),
      md`
        ## Five stages

        Stage 1 adds up the runs. Stage 2 counts wickets and writes the overs. Stage 3 adds wides and the run rate. Stage 4 starts from a blank page and gives each batter's runs. In Stage 5 you write tests that must catch 4 broken scorers.

        Today teaches nothing new. You use loops over lists (Day 24) and a dictionary for totals (Day 30). You also use functions that give back answers (Day 32) and tests (Days 73 to 75). All players and scores are invented.
      `,
      pause(md`This project usually takes two sittings. Each stage saves when you pass it, so stop after any stage.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          balls = ["1"] * 14
          n = len(balls)
          print(f"{n // 6}.{n % 6}")
        `, options: ["2.2", "2.3", "2.33"], answer: 0,
        explain: md`14 balls are 2 full overs (12 balls) and 2 balls more, so the scorer writes 2.2.`,
        why: [null, md`Count again: 2 overs use 12 balls, and 14 − 12 leaves 2, not 3.`, md`2.33 is 14 divided by 6. Overs are written as full overs, a dot, then the balls left over.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          count = 0
          for ball in balls:
              if ball == "4" or ball == "6":
                  count += 1
          print(count)
        `, options: ["It prints how many fours and sixes were hit", "It prints the runs scored from fours and sixes", "It prints how many balls were bowled"],
        answer: 0, verify: false, mono: false,
        explain: md`It adds 1 for each ball that is a four or a six. It counts the hits, not the runs.`,
        why: [null, md`It adds 1 each time, not 4 or 6. To add the runs it would need the number on the ball.`, md`Balls that are not 4 or 6 are skipped, so it does not count every ball.`],
        skill: "read" },
      { q: md`This function crashes with «ZeroDivisionError» before the first ball is bowled. What is the best fix?`, code: py`
          def run_rate(runs, legal):
              return round(runs / (legal / 6), 2)
        `, options: ["Before the division, if legal is 0, give back 0.0", "Put the return line inside try and catch every error", "Change / to // so the division is whole"],
        answer: 0, verify: false, mono: false,
        explain: md`Zero balls is a real case, so the function should handle it on purpose and give back 0.0.`,
        why: [null, md`Catching every error also hides real bugs, as Day 36 warned. Handle the zero case on purpose instead.`, md`«//» still divides by zero, so it still crashes.`],
        skill: "debug" },
      { q: md`On a scorecard, what does «4.3» overs mean?`,
        options: ["4 full overs and 3 more balls: 27 balls", "4.3 times 6 balls: about 26 balls", "4 overs and 30 percent of an over"],
        answer: 0, verify: false, mono: false,
        explain: md`The number after the dot counts balls, from 0 to 5. 4 × 6 + 3 is 27.`,
        why: [null, md`The dot is not a decimal point here. The number after it counts balls.`, md`The dot is not a decimal point here. The number after it counts balls.`],
        skill: "memory" },
      { q: md`Which tool keeps a running total of runs for each batter?`,
        options: ["«a dictionary, adding with .get(name, 0)»", "«a set of batter names»", "«one list of all the runs»"], answer: 0,
        verify: false,
        explain: md`A dictionary keeps one total under each name. «.get(name, 0)» starts a new batter at 0.`,
        why: [null, md`A set keeps each name once, but it cannot hold a number for each name.`, md`One list mixes every batter's runs together, so you cannot tell whose runs they are.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "s1", stage: 1, title: "Stage 1: add up the runs",
        task: md`
          Finish «total_runs(balls)». A number adds its runs. A wicket «"W"» adds nothing. There are no wides yet. The program should print:

          | Runs: 15

          The hidden tests try other innings, including all wickets and an empty list.
        `,
        starter: py`
          def total_runs(balls):
              total = 0
              # A number adds its runs. "W" (a wicket) adds nothing.
              return total

          balls = "1 4 0 W 6 2 2".split()
          print("Runs:", total_runs(balls))
        `,
        solution: py`
          def total_runs(balls):
              total = 0
              for ball in balls:
                  if ball != "W":
                      total += int(ball)
              return total

          balls = "1 4 0 W 6 2 2".split()
          print("Runs:", total_runs(balls))
        `,
        tests: [
          { output: "Runs: 15" },
          { py: py`expect("total_runs", (["6", "6", "4"],), 16)` },
          { py: py`
              got = call("total_runs", ["W", "W", "W"])
              assert got == 0, f"Three wickets score no runs, so expected 0, but your function gave {got}."
            ` },
          { py: py`
              got = call("total_runs", [])
              assert got == 0, f"Before any ball is bowled the score is 0, but your function gave {got}."
            ` },
          { py: py`expect("total_runs", (["0", "1", "W", "3"],), 4)` },
        ],
        wrong: [py`
          def total_runs(balls):
              total = 0
              for ball in balls:
                  if ball != "W":
                      total += 1
              return total

          balls = "1 4 0 W 6 2 2".split()
          print("Runs:", total_runs(balls))
        `, py`
          def total_runs(balls):
              total = 0
              for ball in balls:
                  if ball != "W":
                      total += int(ball)
                  return total

          balls = "1 4 0 W 6 2 2".split()
          print("Runs:", total_runs(balls))
        `],
        hints: [
          md`Go through the balls one at a time. A wicket adds nothing, and every other ball adds its number.`,
          md`Inside the loop, skip the wicket. For any other ball, change the text into a whole number and add it to the total.`,
          md`Keep the return line after the loop, not inside it. Otherwise the function stops after the first ball.`,
        ],
      },
      {
        id: "s2", stage: 2, carry: "s1", title: "Stage 2: wickets and overs",
        task: md`
          Keep «total_runs». Add three functions:

          - «wickets(balls)» gives back how many «"W"» there are.
          - «overs(balls)» gives back the overs as text, like «"1.1"». Every ball counts for now.
          - «score_text(balls)» gives back the score as text: «"15/1"» for 15 runs and 1 wicket. When 10 wickets have fallen the team is **all out**, so it gives back «"45 all out"» instead.

          Then replace the print line with these two lines:

          : print("Score:", score_text(balls))
          : print("Overs:", overs(balls))

          It should print:

          | Score: 15/1
          | Overs: 1.1
        `,
        starter: py`
          def total_runs(balls):
              total = 0
              for ball in balls:
                  if ball != "W":
                      total += int(ball)
              return total

          balls = "1 4 0 W 6 2 2".split()
          print("Runs:", total_runs(balls))
        `,
        solution: py`
          def total_runs(balls):
              total = 0
              for ball in balls:
                  if ball != "W":
                      total += int(ball)
              return total

          def wickets(balls):
              count = 0
              for ball in balls:
                  if ball == "W":
                      count += 1
              return count

          def overs(balls):
              n = len(balls)
              return f"{n // 6}.{n % 6}"

          def score_text(balls):
              if wickets(balls) == 10:
                  return f"{total_runs(balls)} all out"
              return f"{total_runs(balls)}/{wickets(balls)}"

          balls = "1 4 0 W 6 2 2".split()
          print("Score:", score_text(balls))
          print("Overs:", overs(balls))
        `,
        tests: [
          { output: "Score: 15/1\nOvers: 1.1" },
          { py: py`expect("wickets", (["W", "1", "W"],), 2)` },
          { py: py`
              got = call("overs", ["0"] * 6)
              assert got == "1.0", f"6 balls make 1 full over, written 1.0, but your function gave {got!r}."
            ` },
          { py: py`
              got = call("overs", [])
              assert got == "0.0", f"Before any ball, the overs are 0.0, but your function gave {got!r}."
            ` },
          { py: py`expect("overs", (["1"] * 13,), "2.1")` },
          { py: py`expect("score_text", (["4", "W", "6"],), "10/1")` },
          { py: py`
              innings = ["1"] * 5 + ["W"] * 10
              got = call("score_text", innings)
              assert got == "5 all out", f"With 10 wickets the team is all out, so expected '5 all out', but your function gave {got!r}."
            ` },
        ],
        wrong: [py`
          def total_runs(balls):
              total = 0
              for ball in balls:
                  if ball != "W":
                      total += int(ball)
              return total

          def wickets(balls):
              count = 0
              for ball in balls:
                  if ball == "W":
                      count += 1
              return count

          def overs(balls):
              return str(round(len(balls) / 6, 1))

          def score_text(balls):
              if wickets(balls) == 10:
                  return f"{total_runs(balls)} all out"
              return f"{total_runs(balls)}/{wickets(balls)}"

          balls = "1 4 0 W 6 2 2".split()
          print("Score:", score_text(balls))
          print("Overs:", overs(balls))
        `, py`
          def total_runs(balls):
              total = 0
              for ball in balls:
                  if ball != "W":
                      total += int(ball)
              return total

          def wickets(balls):
              count = 0
              for ball in balls:
                  if ball == "W":
                      count += 1
              return count

          def overs(balls):
              n = len(balls)
              return f"{n // 6}.{n % 6}"

          def score_text(balls):
              return f"{total_runs(balls)}/{wickets(balls)}"

          balls = "1 4 0 W 6 2 2".split()
          print("Score:", score_text(balls))
          print("Overs:", overs(balls))
        `],
        hints: [
          md`Counting wickets is like counting one letter in a word: a counter that goes up for each wicket. For the overs, think of the full overs and the balls left over.`,
          md`The full overs come from whole-number division by 6, and the balls left over from the remainder. Put a dot between them in an f-string.`,
          md`In the score function, first check whether the wickets have reached 10. If so, give back the runs with the words all out; otherwise the runs, a slash and the wickets.`,
        ],
      },
      {
        id: "s3", stage: 3, carry: "s2", title: "Stage 3: wides and the run rate",
        task: md`
          Now add wides. A wide «"wd"» adds **1 run** but is **not a legal ball**.

          1. Add «legal_balls(balls)»: how many balls are not wides.
          2. Change «overs» so it counts only legal balls.
          3. Change «total_runs» so a wide adds 1.
          4. Add «run_rate(balls)»: the runs for each over. That is the runs divided by (legal balls divided by 6), rounded to 2 places. With no legal balls, give back «0.0».

          Use this new innings and these print lines:

          : balls = "1 4 wd 0 W 6 2 2".split()
          : print("Score:", score_text(balls))
          : print("Overs:", overs(balls))
          : print(f"Run rate: {run_rate(balls):.2f}")

          It should print:

          | Score: 16/1
          | Overs: 1.1
          | Run rate: 13.71
        `,
        starter: py`
          def total_runs(balls):
              total = 0
              for ball in balls:
                  if ball != "W":
                      total += int(ball)
              return total

          def wickets(balls):
              count = 0
              for ball in balls:
                  if ball == "W":
                      count += 1
              return count

          def overs(balls):
              n = len(balls)
              return f"{n // 6}.{n % 6}"

          def score_text(balls):
              if wickets(balls) == 10:
                  return f"{total_runs(balls)} all out"
              return f"{total_runs(balls)}/{wickets(balls)}"

          balls = "1 4 0 W 6 2 2".split()
          print("Score:", score_text(balls))
          print("Overs:", overs(balls))
        `,
        solution: py`
          def total_runs(balls):
              total = 0
              for ball in balls:
                  if ball == "wd":
                      total += 1
                  elif ball != "W":
                      total += int(ball)
              return total

          def wickets(balls):
              count = 0
              for ball in balls:
                  if ball == "W":
                      count += 1
              return count

          def legal_balls(balls):
              count = 0
              for ball in balls:
                  if ball != "wd":
                      count += 1
              return count

          def overs(balls):
              n = legal_balls(balls)
              return f"{n // 6}.{n % 6}"

          def run_rate(balls):
              legal = legal_balls(balls)
              if legal == 0:
                  return 0.0
              return round(total_runs(balls) / (legal / 6), 2)

          def score_text(balls):
              if wickets(balls) == 10:
                  return f"{total_runs(balls)} all out"
              return f"{total_runs(balls)}/{wickets(balls)}"

          balls = "1 4 wd 0 W 6 2 2".split()
          print("Score:", score_text(balls))
          print("Overs:", overs(balls))
          print(f"Run rate: {run_rate(balls):.2f}")
        `,
        tests: [
          { output: "Score: 16/1\nOvers: 1.1\nRun rate: 13.71" },
          { py: py`
              got = call("total_runs", ["wd", "wd", "4"])
              assert got == 6, f"Two wides add 2 runs, and the four adds 4, so expected 6, but your function gave {got}."
            ` },
          { py: py`expect("legal_balls", (["wd", "W", "1"],), 2)` },
          { py: py`
              got = call("overs", ["wd"] * 3 + ["1"] * 6)
              assert got == "1.0", f"3 wides and 6 legal balls make 1 over, written 1.0, but your function gave {got!r}. Wides do not count as balls."
            ` },
          { py: py`expect("run_rate", (["4"] * 6,), 24.0, approx=True)` },
          { py: py`expect("run_rate", (["1"] * 7,), 6.0, approx=True)` },
          { py: py`
              got = call("run_rate", [])
              assert got == 0.0, f"With no legal balls the run rate is 0.0, but your function gave {got}."
              got = call("run_rate", ["wd"])
              assert got == 0.0, f"A wide alone is not a legal ball, so the run rate is still 0.0, but your function gave {got}."
            ` },
          { py: py`expect("score_text", (["wd"] + ["W"] * 10,), "1 all out")` },
        ],
        wrong: [py`
          def total_runs(balls):
              total = 0
              for ball in balls:
                  if ball == "wd":
                      total += 1
                  elif ball != "W":
                      total += int(ball)
              return total

          def wickets(balls):
              count = 0
              for ball in balls:
                  if ball == "W":
                      count += 1
              return count

          def legal_balls(balls):
              count = 0
              for ball in balls:
                  if ball != "wd":
                      count += 1
              return count

          def overs(balls):
              n = len(balls)
              return f"{n // 6}.{n % 6}"

          def run_rate(balls):
              legal = legal_balls(balls)
              if legal == 0:
                  return 0.0
              return round(total_runs(balls) / (legal / 6), 2)

          def score_text(balls):
              if wickets(balls) == 10:
                  return f"{total_runs(balls)} all out"
              return f"{total_runs(balls)}/{wickets(balls)}"

          balls = "1 4 wd 0 W 6 2 2".split()
          print("Score:", score_text(balls))
          print("Overs:", overs(balls))
          print(f"Run rate: {run_rate(balls):.2f}")
        `, py`
          def total_runs(balls):
              total = 0
              for ball in balls:
                  if ball == "wd":
                      total += 1
                  elif ball != "W":
                      total += int(ball)
              return total

          def wickets(balls):
              count = 0
              for ball in balls:
                  if ball == "W":
                      count += 1
              return count

          def legal_balls(balls):
              count = 0
              for ball in balls:
                  if ball != "wd":
                      count += 1
              return count

          def overs(balls):
              n = legal_balls(balls)
              return f"{n // 6}.{n % 6}"

          def run_rate(balls):
              legal = legal_balls(balls)
              if legal == 0:
                  return 0.0
              return round(total_runs(balls) / legal, 2)

          def score_text(balls):
              if wickets(balls) == 10:
                  return f"{total_runs(balls)} all out"
              return f"{total_runs(balls)}/{wickets(balls)}"

          balls = "1 4 wd 0 W 6 2 2".split()
          print("Score:", score_text(balls))
          print("Overs:", overs(balls))
          print(f"Run rate: {run_rate(balls):.2f}")
        `, py`
          def total_runs(balls):
              total = 0
              for ball in balls:
                  if ball != "W" and ball != "wd":
                      total += int(ball)
              return total

          def wickets(balls):
              count = 0
              for ball in balls:
                  if ball == "W":
                      count += 1
              return count

          def legal_balls(balls):
              count = 0
              for ball in balls:
                  if ball != "wd":
                      count += 1
              return count

          def overs(balls):
              n = legal_balls(balls)
              return f"{n // 6}.{n % 6}"

          def run_rate(balls):
              legal = legal_balls(balls)
              if legal == 0:
                  return 0.0
              return round(total_runs(balls) / (legal / 6), 2)

          def score_text(balls):
              if wickets(balls) == 10:
                  return f"{total_runs(balls)} all out"
              return f"{total_runs(balls)}/{wickets(balls)}"

          balls = "1 4 wd 0 W 6 2 2".split()
          print("Score:", score_text(balls))
          print("Overs:", overs(balls))
          print(f"Run rate: {run_rate(balls):.2f}")
        `],
        hints: [
          md`A wide changes two things: it adds a run, and it does not count as a ball. So the runs function and the overs function both need a small change, and a new counting function helps the overs.`,
          md`In the runs loop, check for a wide first and add one for it; the other balls work as before. The new counting function is like the wickets counter, but it counts every ball that is not a wide.`,
          md`For the run rate, first count the legal balls. If there are none, give back zero point zero. Otherwise divide the runs by the legal balls divided by six, and round to two places.`,
        ],
      },
      {
        id: "s4", stage: 4, kind: "make", title: "Stage 4: each batter's runs (blank page)",
        task: md`
          Now each ball also says who faced it. The list holds pairs: the batter's name, then the ball.

          : balls = [("Rohit", "1"), ("Gill", "4"), ("Gill", "W"), ("Kohli", "wd"), ("Kohli", "6"), ("Rohit", "2")]

          From a blank page, write «batter_runs(balls)». It gives back a dictionary: each batter's name with their runs, in the order the batters first appear.

          - A number adds its runs to that batter.
          - A wicket «"W"» adds 0, but the batter still appears.
          - A wide «"wd"» is not the batter's run, so skip it completely.

          Then print each batter on a line. For the list above:

          | Rohit: 3
          | Gill: 4
          | Kohli: 6
        `,
        starter: py`
          # Stage 4: from a blank page.

        `,
        solution: py`
          def batter_runs(balls):
              runs = {}
              for name, ball in balls:
                  if ball == "wd":
                      continue
                  if ball == "W":
                      runs[name] = runs.get(name, 0)
                  else:
                      runs[name] = runs.get(name, 0) + int(ball)
              return runs

          balls = [("Rohit", "1"), ("Gill", "4"), ("Gill", "W"), ("Kohli", "wd"), ("Kohli", "6"), ("Rohit", "2")]
          for name, total in batter_runs(balls).items():
              print(f"{name}: {total}")
        `,
        tests: [
          { output: "Rohit: 3\nGill: 4\nKohli: 6" },
          { py: py`expect("batter_runs", ([("A", "6"), ("B", "1"), ("A", "4")],), {"A": 10, "B": 1})` },
          { py: py`
              got = call("batter_runs", [("Asha", "W")])
              assert got == {"Asha": 0}, f"A batter who is out first ball still appears with 0, so expected {{'Asha': 0}}, but your function gave {got}."
            ` },
          { py: py`
              got = call("batter_runs", [("Pant", "wd"), ("Pant", "wd")])
              assert got == {}, f"Wides are not the batter's runs and are skipped completely, so expected an empty dictionary, but your function gave {got}."
            ` },
          { py: py`expect("batter_runs", ([],), {})` },
          { py: py`
              got = call("batter_runs", [("Bina", "1"), ("Ali", "2"), ("Bina", "3")])
              assert list(got) == ["Bina", "Ali"], f"Batters must come in the order they first appear: Bina, then Ali. Your dictionary has them as {list(got)}."
            ` },
        ],
        wrong: [py`
          def batter_runs(balls):
              runs = {}
              for name, ball in balls:
                  if ball != "W" and ball != "wd":
                      runs[name] = runs.get(name, 0) + int(ball)
              return runs

          balls = [("Rohit", "1"), ("Gill", "4"), ("Gill", "W"), ("Kohli", "wd"), ("Kohli", "6"), ("Rohit", "2")]
          for name, total in batter_runs(balls).items():
              print(f"{name}: {total}")
        `, py`
          def batter_runs(balls):
              runs = {}
              for name, ball in balls:
                  if ball == "W":
                      runs[name] = runs.get(name, 0)
                  elif ball == "wd":
                      runs[name] = runs.get(name, 0) + 1
                  else:
                      runs[name] = runs.get(name, 0) + int(ball)
              return runs

          balls = [("Rohit", "1"), ("Gill", "4"), ("Gill", "W"), ("Kohli", "wd"), ("Kohli", "6"), ("Rohit", "2")]
          for name, total in batter_runs(balls).items():
              print(f"{name}: {total}")
        `],
        hints: [
          md`Start with an empty dictionary. Go through the pairs, taking the name and the ball apart in the loop line, as on Day 26.`,
          md`Skip a wide at once. For a wicket, make sure the name is in the dictionary without adding runs. For a number, add it to that name's total, starting from zero for a new name, as on Day 30.`,
          md`After the function, loop over the dictionary's names and totals together and print each one with a colon between them.`,
        ],
      },
      {
        id: "c1", stage: 5, kind: "catch", title: "Stage 5: catch 4 broken scorers",
        task: md`
          A scorer app uses these functions from Stage 3:

          : def total_runs(balls):
          :     total = 0
          :     for ball in balls:
          :         if ball == "wd":
          :             total += 1
          :         elif ball != "W":
          :             total += int(ball)
          :     return total
          :
          : def legal_balls(balls):
          :     count = 0
          :     for ball in balls:
          :         if ball != "wd":
          :             count += 1
          :     return count
          :
          : def overs(balls):
          :     n = legal_balls(balls)
          :     return f"{n // 6}.{n % 6}"

          There are **4 secretly broken versions**. Write asserts that pass on these correct functions and fail on every broken one. Work out each answer by hand first. The page tells you how many you caught, but not what each bug is.
        `,
        target: py`
          def total_runs(balls):
              total = 0
              for ball in balls:
                  if ball == "wd":
                      total += 1
                  elif ball != "W":
                      total += int(ball)
              return total

          def legal_balls(balls):
              count = 0
              for ball in balls:
                  if ball != "wd":
                      count += 1
              return count

          def overs(balls):
              n = legal_balls(balls)
              return f"{n // 6}.{n % 6}"
        `,
        broken: [
          // 1: counts wides as balls. Differs at overs(["1", "wd"]): "0.2", not "0.1".
          py`
            def total_runs(balls):
                total = 0
                for ball in balls:
                    if ball == "wd":
                        total += 1
                    elif ball != "W":
                        total += int(ball)
                return total

            def legal_balls(balls):
                count = 0
                for ball in balls:
                    if ball != "wd":
                        count += 1
                return count

            def overs(balls):
                n = len(balls)
                return f"{n // 6}.{n % 6}"
          `,
          // 2: writes overs as a decimal. Differs at 7 balls: "1.2", not "1.1".
          py`
            def total_runs(balls):
                total = 0
                for ball in balls:
                    if ball == "wd":
                        total += 1
                    elif ball != "W":
                        total += int(ball)
                return total

            def legal_balls(balls):
                count = 0
                for ball in balls:
                    if ball != "wd":
                        count += 1
                return count

            def overs(balls):
                return str(round(legal_balls(balls) / 6, 1))
          `,
          // 3: forgets the run for a wide. Differs at total_runs(["wd"]): 0, not 1.
          py`
            def total_runs(balls):
                total = 0
                for ball in balls:
                    if ball != "W" and ball != "wd":
                        total += int(ball)
                return total

            def legal_balls(balls):
                count = 0
                for ball in balls:
                    if ball != "wd":
                        count += 1
                return count

            def overs(balls):
                n = legal_balls(balls)
                return f"{n // 6}.{n % 6}"
          `,
          // 4: thinks the 6th ball is "0.6". Differs at exactly 6 balls: "0.6", not "1.0".
          py`
            def total_runs(balls):
                total = 0
                for ball in balls:
                    if ball == "wd":
                        total += 1
                    elif ball != "W":
                        total += int(ball)
                return total

            def legal_balls(balls):
                count = 0
                for ball in balls:
                    if ball != "wd":
                        count += 1
                return count

            def overs(balls):
                n = legal_balls(balls)
                return f"{(n - 1) // 6}.{(n - 1) % 6 + 1}"
          `,
        ],
        starter: py`
          # Work out each answer by hand, then write one assert for it.
          assert total_runs(["4", "W", "6"]) == 10
        `,
        solution: py`
          assert total_runs(["4", "W", "6"]) == 10
          assert total_runs(["wd"]) == 1
          assert overs(["1", "wd"]) == "0.1"
          assert overs(["0"] * 7) == "1.1"
          assert overs(["0"] * 6) == "1.0"
        `,
        hints: [
          md`Each assert needs an innings where a correct scorer and a careless one disagree. Think about what a careless scorer might get wrong with wides and with overs.`,
          md`Try a wide on its own, and a wide with one legal ball. Also try exactly six balls, and seven balls. Work out each answer by hand.`,
          md`A wide alone scores one run. One legal ball and one wide is zero point one overs. Six balls is one point zero, and seven balls is one point one.`,
        ],
      },
      {
        id: "d1", kind: "drill", title: "Laptop Mission: the scorecard on your laptop",
        task: md`
          This pretend Command Prompt runs your Stage 3 scorecard on a laptop. Type each command and press Enter.

          On a phone, you may skip this. Phone users are excused from the mission below.
        `,
        steps: [
          { say: md`Go into your project folder. Type «cd python-days» and press Enter.`,
            expect: ["cd python-days", "cd Documents\\python-days"], output: "" },
          { say: md`Run the scorecard. Type «python scorecard.py» and press Enter.`,
            expect: ["python scorecard.py", "py scorecard.py"],
            output: "Score: 16/1\nOvers: 1.1\nRun rate: 13.71" },
        ],
        mission: md`
          Now do it for real. In IDLE, make a new file and type your Stage 3 program. Save it as «scorecard.py» in your «python-days» folder.

          1. Run it with F5 or with «python scorecard.py». Check the three lines.
          2. Change the balls to an over you invent, with at least one wide, and run it again.
          3. The run rate it prints is your receipt code: write it in your notebook.
        `,
        hints: [
          md`Type the words in the grey box exactly, then press Enter.`,
          md`There is one space between the word python and the file name.`,
          md`If python does not work on your laptop, py does the same job.`,
        ],
      },
      {
        id: "twist", kind: "modify", carry: "s3", optional: true, noStep: true, title: "Own Twist: count the boundaries",
        task: md`
          A **boundary** is a four or a six. Add «boundaries(balls)», which gives back how many fours and sixes were hit (not the runs from them). Print it as the last line:

          | Score: 16/1
          | Overs: 1.1
          | Run rate: 13.71
          | Boundaries: 2

          You may add your own idea too, such as counting the dot balls («"0"»). The tests check the scorecard and the boundaries, so your own idea is safe.
        `,
        starter: py`
          def total_runs(balls):
              total = 0
              for ball in balls:
                  if ball == "wd":
                      total += 1
                  elif ball != "W":
                      total += int(ball)
              return total

          def wickets(balls):
              count = 0
              for ball in balls:
                  if ball == "W":
                      count += 1
              return count

          def legal_balls(balls):
              count = 0
              for ball in balls:
                  if ball != "wd":
                      count += 1
              return count

          def overs(balls):
              n = legal_balls(balls)
              return f"{n // 6}.{n % 6}"

          def run_rate(balls):
              legal = legal_balls(balls)
              if legal == 0:
                  return 0.0
              return round(total_runs(balls) / (legal / 6), 2)

          def score_text(balls):
              if wickets(balls) == 10:
                  return f"{total_runs(balls)} all out"
              return f"{total_runs(balls)}/{wickets(balls)}"

          balls = "1 4 wd 0 W 6 2 2".split()
          print("Score:", score_text(balls))
          print("Overs:", overs(balls))
          print(f"Run rate: {run_rate(balls):.2f}")
        `,
        solution: py`
          def total_runs(balls):
              total = 0
              for ball in balls:
                  if ball == "wd":
                      total += 1
                  elif ball != "W":
                      total += int(ball)
              return total

          def wickets(balls):
              count = 0
              for ball in balls:
                  if ball == "W":
                      count += 1
              return count

          def legal_balls(balls):
              count = 0
              for ball in balls:
                  if ball != "wd":
                      count += 1
              return count

          def overs(balls):
              n = legal_balls(balls)
              return f"{n // 6}.{n % 6}"

          def run_rate(balls):
              legal = legal_balls(balls)
              if legal == 0:
                  return 0.0
              return round(total_runs(balls) / (legal / 6), 2)

          def score_text(balls):
              if wickets(balls) == 10:
                  return f"{total_runs(balls)} all out"
              return f"{total_runs(balls)}/{wickets(balls)}"

          def boundaries(balls):
              count = 0
              for ball in balls:
                  if ball == "4" or ball == "6":
                      count += 1
              return count

          balls = "1 4 wd 0 W 6 2 2".split()
          print("Score:", score_text(balls))
          print("Overs:", overs(balls))
          print(f"Run rate: {run_rate(balls):.2f}")
          print("Boundaries:", boundaries(balls))
        `,
        tests: [
          { contains: ["Score: 16/1", "Overs: 1.1", "Run rate: 13.71", "Boundaries: 2"] },
          { py: py`expect("boundaries", (["4", "6", "wd", "1", "4"],), 3)` },
          { py: py`expect("boundaries", ([],), 0)` },
          { py: py`
              got = call("overs", ["wd", "1"])
              assert got == "0.1", f"Your scorecard should still skip wides in the overs: expected '0.1', but got {got!r}."
              got = call("total_runs", ["wd"])
              assert got == 1, f"Your scorecard should still add 1 run for a wide, but total_runs gave {got}."
            ` },
        ],
        wrong: [py`
          def total_runs(balls):
              total = 0
              for ball in balls:
                  if ball == "wd":
                      total += 1
                  elif ball != "W":
                      total += int(ball)
              return total

          def wickets(balls):
              count = 0
              for ball in balls:
                  if ball == "W":
                      count += 1
              return count

          def legal_balls(balls):
              count = 0
              for ball in balls:
                  if ball != "wd":
                      count += 1
              return count

          def overs(balls):
              n = legal_balls(balls)
              return f"{n // 6}.{n % 6}"

          def run_rate(balls):
              legal = legal_balls(balls)
              if legal == 0:
                  return 0.0
              return round(total_runs(balls) / (legal / 6), 2)

          def score_text(balls):
              if wickets(balls) == 10:
                  return f"{total_runs(balls)} all out"
              return f"{total_runs(balls)}/{wickets(balls)}"

          def boundaries(balls):
              total = 0
              for ball in balls:
                  if ball == "4" or ball == "6":
                      total += int(ball)
              return total

          balls = "1 4 wd 0 W 6 2 2".split()
          print("Score:", score_text(balls))
          print("Overs:", overs(balls))
          print(f"Run rate: {run_rate(balls):.2f}")
          print("Boundaries:", boundaries(balls))
        `],
        hints: [
          md`This is a counter, like the wickets counter, but it counts two kinds of ball.`,
          md`Inside the loop, add one when the ball is a four or a six. Use the word or between the two checks.`,
          md`Give back the count after the loop, and add one more print line at the end of the program.`,
        ],
      },
    ],
    keys: [
      md`An over is 6 legal balls. «4.3» means 4 overs and 3 balls: use «n // 6» and «n % 6».`,
      md`A wide adds 1 run but is not a legal ball, so it does not count towards the over.`,
      md`A dictionary with «runs.get(name, 0)» keeps a separate total for each batter.`,
      md`Good tests use innings where a broken scorer gives a different answer: a wide, exactly 6 balls, and 7 balls.`,
    ],
  });
})();
