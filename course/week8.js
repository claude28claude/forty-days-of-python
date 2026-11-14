// Week 8 — Bug Hospital, Your Names (Days 50 to 56).
// Day 50 names a four-step bug hunt, and Day 51 practises it on whole programs.
// Days 52 to 54 show where names live: inside functions, two names for one list,
// and lists given to functions. Day 55 teaches a routine for an empty page,
// and Day 56 uses it to build a chai stall.
(function () {
  const { day, md, py, ex, code, tip, warn, ask, pause } = window.Course;

  // ---------------------------------------------------------------- Day 50
  day({
    slug: "four-step-bug-hunt",
    title: "The Four-Step Bug Hunt",
    goal: "Find any bug by repeating it, shrinking it, guessing and checking.",
    minutes: 45,
    kind: "lesson",
    needs: [47, 48, 49],
    win: "Today you can now hunt a bug in four calm steps: repeat, shrink, guess and test, change one thing.",
    learn: [
      md`
        ## Step 1 and Step 2: repeat it, then shrink it

        A **bug hunt** is a fixed way to find a bug. It has four steps. Here is one hunt from start to end.

        The function below should count the marks of 33 or more. By hand, the long list has 6 such marks. Guess what the program prints.
      `,
      ex(py`
        def count_passed(marks):
            passed = 0
            for i in range(1, len(marks)):
                if marks[i] >= 33:
                    passed += 1
            return passed

        print(count_passed([56, 12, 45, 67, 30, 88, 33, 90]))
        print(count_passed([56, 12]))
        print(count_passed([56]))
      `, { predict: ["5\n0\n0", "6\n1\n1", "5\n1\n1"], answer: 0 }),
      md`
        **Step 1: Repeat.** Run the program again. A bug that shows every time is easy to study. Write down the input, the expected answer and the actual answer.

        **Step 2: Shrink.** Find the **smallest failing input**: the shortest input that still gives a wrong answer. Cut the list in half again and again. Here, the list «[56]» still fails: expected 1, actual 0. A small input is easy to follow by hand.
      `,
      ask({
        q: md`«count_passed([12])» gives 0, which is correct. What does that tell you?`,
        options: ["The bug shows only when the first mark passes", "The function has no bug", "The bug is in the print line"],
        answer: 0,
        explain: md`«[56]» fails but «[12]» does not. The difference is a passing mark in the first place.`,
        why: [null, md`«[56]» still fails, so the bug is real.`, md`The print line only shows the answer. The count itself is wrong.`],
      }),
      pause(md`Good place for a short break. Next: Step 3 and Step 4.`),
      md`
        ## Step 3 and Step 4: one guess, one change

        **Step 3: One guess, one test.** Make one guess, then do one test that proves it right or wrong. The guess here: "the loop never looks at the first mark". The test is a labelled print of «i». Guess what it shows.
      `,
      ex(py`
        def count_passed(marks):
            passed = 0
            for i in range(1, len(marks)):
                print(f"{i=}")
                if marks[i] >= 33:
                    passed += 1
            return passed

        print(count_passed([56, 12]))
      `, { predict: ["i=1\n0", "i=0\ni=1\n1", "i=1\n1"], answer: 0 }),
      md`
        «i» never becomes 0, so the guess is right. **Step 4: Change one thing at a time.** Change only the range to «range(len(marks))», then run all your inputs again. Now see what happens when someone changes two things at once.
      `,
      ex(py`
        def count_passed(marks):
            passed = 0
            for i in range(len(marks)):
                if marks[i] > 33:
                    passed += 1
            return passed

        print(count_passed([56, 12]))
        print(count_passed([33, 56]))
      `, { predict: ["1\n1", "1\n2", "2\n2"], answer: 0, label: "Two changes at once" }),
      md`
        The range is now right, but the second change, «>», breaks a mark of exactly 33. With two changes, you cannot tell which one helped and which one hurt. One change, then run every input again.
      `,
    ],
    quiz: [
      { q: md`What is the right order for the four steps?`,
        options: ["Repeat, shrink, guess and test, change one thing", "Change one thing, repeat, shrink, guess and test", "Guess and test, change one thing, repeat, shrink"], answer: 0,
        explain: md`First make the bug show again. Then make the input small. Then test one guess. Then change one thing.`,
        why: [null, md`If you change code before you understand the bug, each change is only a guess.`, md`A guess is easier to test on a small input, so shrink first.`],
        skill: "memory" },
      { q: md`A function gives a wrong answer for a list of 40 marks. What is the best next step?`,
        options: ["Cut the list in half and run it again", "Rewrite the whole function", "Add 1 to the answer"], answer: 0,
        explain: md`Shrinking finds the smallest failing input. A short list is easy to follow by hand.`,
        why: [null, md`A new function may have new bugs. Find the cause first.`, md`That hides the bug for one input and breaks others.`],
        skill: "debug" },
      { q: md`What does this show?`, code: py`
          def last_two(items):
              return items[len(items) - 2:len(items) - 1]

          print(last_two([4, 6, 1]))
        `, options: ["[6]", "[6, 1]", "[1]"], answer: 0,
        explain: md`The slice starts at 1 and stops before 2, so only «items[1]» is in it. The stop number is one too small.`,
        why: [null, md`That is what the function should give. The stop number cuts off the last item.`, md`Position 2 is not included: a slice stops before its end number.`],
        skill: "trace" },
      { q: md`Asha changes three lines at once, and now the answer is right for one input. What is the problem?`,
        options: ["She does not know which change fixed it, or if another broke something", "Three changes are always too many for Python", "Nothing: the answer is right now"], answer: 0,
        explain: md`Change one thing, then run every input again. Then you know what each change did.`,
        why: [null, md`Python accepts any number of changes. The problem is for Asha, not for Python.`, md`One right answer is not enough. Other inputs may now fail.`],
        skill: "debug" },
      { q: md`What does this program do?`, code: py`
          tests = [[56], [12], [56, 12]]
          for t in tests:
              print(t, count_passed(t))
        `, options: ["It runs one function on several small inputs and shows each answer", "It counts how many lists there are", "It adds up all the marks"],
        answer: 0, verify: false, mono: false,
        explain: md`The loop calls «count_passed» once for each small list, so you see every answer in one run.`,
        why: [null, md`It prints a line for each list, but it does not count the lists.`, md`There is no total. Each line shows one list and its answer.`],
        skill: "read" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: the skipped first mark",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          def count_passed(marks):
              passed = 0
              for i in range(1, len(marks)):
                  if marks[i] >= 33:
                      passed += 1
              return passed

          result = count_passed([70, 20, 40])
          print("Passed:", result)
        `,
        inputs: [],
        ask: [{ line: 3, name: "i" }, { line: 8, name: "result" }, { output: true }],
        hints: [
          md`Look at the range on line 3. Where does it start?`,
          md`The loop looks at position 1 and position 2 only. Position 0 holds 70.`,
          md`Of 20 and 40, only one is 33 or more.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: cutting a list in half",
        task: md`Shrinking often means cutting a list in half. Answer without running the program.`,
        code: py`
          marks = [56, 12, 45, 67, 30, 88]
          half = len(marks) // 2
          first = marks[:half]
          second = marks[half:]
          print(first)
          print(second)
        `,
        inputs: [],
        ask: [{ line: 2, name: "half" }, { line: 3, name: "first" }, { output: true }],
        hints: [
          md`Count the marks first. Then divide by 2 with whole-number division.`,
          md`A slice with no start begins at position 0 and stops before the number after the colon.`,
          md`The second slice starts where the first one stopped.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: the four-step hunt",
        task: md`Put the steps of a bug hunt in the right order.`,
        solution: py`
          Run it again and write down the input, expected and actual answer
          Cut the input down until it is as small as it can be and still fails
          Make one guess and test it with one labelled print
          Change one line, then run every input again
        `,
        distractors: ["Change several lines at once and hope one works"],
        order: "fixed",
        hints: [
          md`You cannot study a bug that you cannot see again.`,
          md`A small input comes before any guess, because it is easy to follow.`,
          md`The change to the code is always the last step.`,
        ],
      },
      {
        id: "b1", kind: "bug", title: "Fix: the chai bill misses an item",
        task: md`
          «bill_total» should add up all the prices in a list. For «[10, 15, 20]» it should print «Total: 45», but it prints «Total: 25». Shrink the input in your head first: what does it give for «[10]»? Then fix the one wrong line.
        `,
        starter: py`
          def bill_total(prices):
              total = 0
              for i in range(len(prices) - 1):
                  total += prices[i]
              return total

          print("Total:", bill_total([10, 15, 20]))
        `,
        bugLines: [3],
        solution: py`
          def bill_total(prices):
              total = 0
              for i in range(len(prices)):
                  total += prices[i]
              return total

          print("Total:", bill_total([10, 15, 20]))
        `,
        tests: [
          { output: "Total: 45" },
          { py: py`expect("bill_total", ([12],), 12)` },
          { py: py`expect("bill_total", ([],), 0)` },
          { py: py`expect("bill_total", ([5, 5, 5, 5],), 20)` },
        ],
        wrong: [py`
          def bill_total(prices):
              total = 0
              for i in range(len(prices) - 1):
                  total += prices[i]
              return total + 20

          print("Total:", bill_total([10, 15, 20]))
        `, py`
          def bill_total(prices):
              total = 0
              for i in range(1, len(prices)):
                  total += prices[i]
              return total

          print("Total:", bill_total([10, 15, 20]))
        `],
        hints: [
          md`Shrink first. With one price, the answer should be that price. What does the program give?`,
          md`The problem is how far the loop goes. Look at the stop number of the range on line 3.`,
          md`The range should stop at the length of the list, with nothing taken away.`,
        ],
      },
      {
        id: "b2", kind: "bug", title: "Fix: the last cups are refused",
        task: md`
          «can_serve(stock, cups)» says if the stall has enough chai for an order. With 5 cups left and an order for 5, it should print «True». It prints «False». Find the smallest failing case, then fix the one wrong line.
        `,
        starter: py`
          def can_serve(stock, cups):
              return stock > cups

          print(can_serve(5, 3))
          print(can_serve(5, 5))
          print(can_serve(2, 5))
        `,
        bugLines: [2],
        solution: py`
          def can_serve(stock, cups):
              return stock >= cups

          print(can_serve(5, 3))
          print(can_serve(5, 5))
          print(can_serve(2, 5))
        `,
        tests: [
          { output: "True\nTrue\nFalse" },
          { py: py`expect("can_serve", (0, 0), True)` },
          { py: py`expect("can_serve", (1, 2), False)` },
          { py: py`expect("can_serve", (10, 1), True)` },
        ],
        wrong: [py`
          def can_serve(stock, cups):
              return stock < cups

          print(can_serve(5, 3))
          print(can_serve(5, 5))
          print(can_serve(2, 5))
        `, py`
          def can_serve(stock, cups):
              return stock >= cups - 1

          print(can_serve(5, 3))
          print(can_serve(5, 5))
          print(can_serve(2, 5))
        `],
        hints: [
          md`Only one of the three calls is wrong. It is the one where the two numbers are equal.`,
          md`Line 2 compares the stock and the order. Which sign is true when the two are equal?`,
          md`Use the sign for "greater than or equal to".`,
        ],
      },
      {
        id: "b3", kind: "bug", title: "Fix: too many words",
        task: md`
          The program counts the words the user types. For «chai and samosa» it shows «Words: 3», which is right. But for «chai  and samosa», with two spaces after chai, it shows «Words: 4». Fix the one wrong line, so extra spaces never change the count.
        `,
        starter: py`
          def word_count(text):
              words = text.split(" ")
              return len(words)

          line = input("Type a sentence: ")
          print("Words:", word_count(line))
        `,
        bugLines: [2],
        solution: py`
          def word_count(text):
              words = text.split()
              return len(words)

          line = input("Type a sentence: ")
          print("Words:", word_count(line))
        `,
        tests: [
          { inputs: ["chai and samosa"], output: "Words: 3" },
          { inputs: ["chai  and samosa"], output: "Words: 3" },
          { inputs: ["  Pune  "], output: "Words: 1" },
          { inputs: ["Asha"], output: "Words: 1" },
        ],
        wrong: [py`
          def word_count(text):
              words = text.split(" ")
              return len(words) - 1

          line = input("Type a sentence: ")
          print("Words:", word_count(line))
        `, py`
          def word_count(text):
              words = text.strip().split(" ")
              return len(words)

          line = input("Type a sentence: ")
          print("Words:", word_count(line))
        `],
        hints: [
          md`Shrink it. Two words with two spaces between them is the smallest failing case. Print the list of words to see it.`,
          md`Splitting on one space makes an empty piece between two spaces. The fix is on line 2.`,
          md`Split with nothing inside the brackets. Then any run of spaces counts as one gap.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: any pass mark", optional: true,
        task: md`
          This fixed function always uses 33 as the pass mark. Change it so it takes a second parameter, «pass_mark», with 33 as its default value. Then «count_passed([40, 50, 60], 50)» gives 2, and «count_passed([40, 50, 60])» still gives 3.
        `,
        starter: py`
          def count_passed(marks):
              passed = 0
              for m in marks:
                  if m >= 33:
                      passed += 1
              return passed

          print(count_passed([40, 50, 60], 50))
        `,
        solution: py`
          def count_passed(marks, pass_mark=33):
              passed = 0
              for m in marks:
                  if m >= pass_mark:
                      passed += 1
              return passed

          print(count_passed([40, 50, 60], 50))
        `,
        tests: [
          { output: "2" },
          { py: py`expect("count_passed", ([40, 50, 60],), 3)` },
          { py: py`expect("count_passed", ([32, 33, 34],), 2)` },
          { py: py`expect("count_passed", ([], 50), 0)` },
          { py: py`expect("count_passed", ([49, 50], 50), 1)` },
        ],
        wrong: [py`
          def count_passed(marks, pass_mark=33):
              passed = 0
              for m in marks:
                  if m > pass_mark:
                      passed += 1
              return passed

          print(count_passed([40, 50, 60], 50))
        `, py`
          def count_passed(marks, pass_mark=33):
              passed = 0
              for m in marks:
                  if m >= 33:
                      passed += 1
              return passed

          print(count_passed([40, 50, 60], 50))
        `],
        hints: [
          md`The function needs a second parameter with a default value.`,
          md`Add the parameter on the def line. Then use it in the if line, in place of 33.`,
          md`A mark equal to the pass mark still passes, so keep the "greater than or equal to" sign.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: the smallest failing input",
        task: md`
          This function should count the marks of 33 or more, but it has a bug. For the long list below it gives 4, but the right answer is 6.

          : def count_passes(marks):
          :     count = 0
          :     for m in marks:
          :         if m > 33:
          :             count += 1
          :     return count
          :
          : print(count_passes([45, 33, 78, 90, 12, 33, 60]))

          Copy the function into the empty editor. Do not fix it. Under it, make a list named «small»: the **smallest** list of marks that still gives a wrong answer. Then print «count_passes(small)» as the last line. Run it and check by hand that the answer is wrong.
        `,
        starter: py`

        `,
        solution: py`
          def count_passes(marks):
              count = 0
              for m in marks:
                  if m > 33:
                      count += 1
              return count

          small = [33]
          print(count_passes(small))
        `,
        tests: [
          { py: py`
            small = need("small", "list")
            def _right(marks):
                return len([m for m in marks if m >= 33])
            def _buggy(marks):
                return len([m for m in marks if m > 33])
            assert _buggy(small) != _right(small), "This list does not show the bug: the function gives the right answer for it. Which mark does the function get wrong?"
          ` },
          { py: py`
            small = need("small", "list")
            assert len(small) == 1, f"Your list still fails, which is good. But it has {len(small)} marks. Can one mark be enough?"
          ` },
          { py: py`
            assert LINES and LINES[-1].strip() == "0", "The last line should show what the copied function gives for your list. Print «count_passes(small)» at the end, and do not fix the function: the bug must still show."
          ` },
        ],
        wrong: [py`
          def count_passes(marks):
              count = 0
              for m in marks:
                  if m > 33:
                      count += 1
              return count

          small = [45, 33, 78]
          print(count_passes(small))
        `, py`
          def count_passes(marks):
              count = 0
              for m in marks:
                  if m > 33:
                      count += 1
              return count

          small = [12]
          print(count_passes(small))
        `, py`
          def count_passes(marks):
              count = 0
              for m in marks:
                  if m >= 33:
                      count += 1
              return count

          small = [33]
          print(count_passes(small))
        `],
        hints: [
          md`Cut the long list in half again and again. Keep the half that still gives a wrong answer.`,
          md`Work out by hand which marks the function counts wrongly. Look at the sign in the if line.`,
          md`Only one kind of mark is counted wrongly: a mark exactly equal to the pass mark. A list with just that mark is enough.`,
        ],
      },
    ],
    keys: [
      md`**Repeat** the bug and write down the input, the expected answer and the actual answer.`,
      md`**Shrink** the input until it is as small as it can be and still fails.`,
      md`**One guess, one test:** a labelled print proves a guess right or wrong.`,
      md`**Change one thing at a time,** then run every input again.`,
    ],
  });

  // ---------------------------------------------------------------- Day 51
  day({
    slug: "bug-hospital",
    title: "Project: Bug Hospital",
    goal: "Repair broken programs alone using only messages and print.",
    minutes: 45,
    kind: "project",
    needs: [46, 48, 49, 50],
    win: "Today you can now repair a 40-line program alone, with only the error message and print. This completes Level 4.",
    learn: [
      md`
        ## Four patients

        Today has four broken programs, called **patients**. Each one is a chai, cricket or marks program. Your tools are the red message (Day 45), labelled prints (Day 48) and the four-step hunt (Day 50).

        Stage 1 has Step through. Stages 2, 3 and 4 do not, because on your own laptop there is none. This project may take two sittings. Each stage saves when you pass it, so you can stop after any stage.
      `,
      tip(md`
        For every patient: run it, read the message or compare expected and actual, shrink the input, test one guess, then change one line.
      `),
      pause(md`Good place for a short break. You can also stop after any stage and come back tomorrow.`),
      md`
        ## The last patient has three bugs

        Stage 4 is a 40-line chai stall. It has three bugs, and the tests type a set of orders into it. Fix one bug, run again, then look for the next. A program can have more than one bug, so a passing run for one order is not the end.
      `,
    ],
    quiz: [
      { q: md`A program stops with «TypeError» on line 10. Line 5 is «cups = input("Cups: ")». Where may the real mistake be?`,
        options: ["On line 5, where the text was never changed into a number", "Only on line 10, because the message says so", "In Python itself"], answer: 0,
        explain: md`The message names the line where Python stopped. The value that caused it may come from an earlier line.`,
        why: [null, md`The message shows where Python stopped, not always where the mistake is.`, md`Python is fine. The mistake is in the program.`],
        skill: "debug" },
      { q: md`What does this show?`, code: py`
          balls = [1, 4, 6]
          total = 0
          for i in range(len(balls) - 1):
              total += balls[i]
          print(total)
        `, options: ["5", "11", "10"], answer: 0,
        explain: md`The range stops one early, so the last ball, 6, is never added. «1 + 4» is 5.`,
        why: [null, md`11 is the right total, but the loop never reaches the last ball.`, md`10 would skip the first ball. This loop skips the last one.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          stock = {"chai": 5}
          order = 5
          if stock["chai"] >= order:
              stock["chai"] -= order
              print("Served")
          else:
              print("Sorry")
        `, options: ["It serves the order if there is enough chai, and takes it from the stock", "It always prints Sorry", "It adds 5 cups to the stock"],
        answer: 0, verify: false, mono: false,
        explain: md`It checks the stock first. With 5 left and 5 asked for, it serves them and the stock becomes 0.`,
        why: [null, md`5 is greater than or equal to 5, so the if part runs.`, md`«-=» takes cups away. It does not add them.`],
        skill: "read" },
      { q: md`You fixed one bug and one order now works. What next?`,
        options: ["Run every test order again, and look for the next bug", "Stop: the program is fixed", "Change three more lines just in case"], answer: 0,
        explain: md`A program can have several bugs. Run all your inputs after each change.`,
        why: [null, md`One working order does not prove the others work.`, md`Change only what a test shows is wrong, one thing at a time.`],
        skill: "debug" },
      { q: md`Which tool shows the value of «count» while the program runs, on your own laptop?`,
        options: ["A labelled print, such as an f-string with «count=»", "A comment with «#»", "A longer variable name"], answer: 0,
        explain: md`An f-string with «count=» prints the name and its value. Remove it when the bug is fixed.`,
        why: [null, md`Python skips comments. They never show values.`, md`A name does not change what is printed.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "s1", stage: 1, kind: "bug", title: "Stage 1: the chai bill crashes",
        task: md`
          This chai bill should work like this. When the user types «2» cups and «1» samosa, it shows:

          | Chai Corner
          | Bill: 39 rupees

          A bill of 100 rupees or more gets 10 rupees off. Instead, the program stops with «TypeError». Read the message, find the real mistake, and fix it. Step through is on for this stage.
        `,
        starter: py`
          PRICE_CHAI = 12
          PRICE_SAMOSA = 15

          print("Chai Corner")
          cups = input("Cups of chai: ")
          samosas = int(input("Samosas: "))

          chai_cost = cups * PRICE_CHAI
          samosa_cost = samosas * PRICE_SAMOSA
          bill = chai_cost + samosa_cost

          if bill >= 100:
              bill = bill - 10
              print("Discount: 10 rupees")
          print("Bill:", bill, "rupees")
        `,
        bugLines: [5],
        solution: py`
          PRICE_CHAI = 12
          PRICE_SAMOSA = 15

          print("Chai Corner")
          cups = int(input("Cups of chai: "))
          samosas = int(input("Samosas: "))

          chai_cost = cups * PRICE_CHAI
          samosa_cost = samosas * PRICE_SAMOSA
          bill = chai_cost + samosa_cost

          if bill >= 100:
              bill = bill - 10
              print("Discount: 10 rupees")
          print("Bill:", bill, "rupees")
        `,
        tests: [
          { inputs: ["2", "1"], output: "Chai Corner\nBill: 39 rupees" },
          { inputs: ["5", "3"], output: "Chai Corner\nDiscount: 10 rupees\nBill: 95 rupees" },
          { inputs: ["0", "0"], output: "Chai Corner\nBill: 0 rupees" },
          { inputs: ["0", "7"], output: "Chai Corner\nDiscount: 10 rupees\nBill: 95 rupees" },
        ],
        wrong: [py`
          PRICE_CHAI = 12
          PRICE_SAMOSA = 15

          print("Chai Corner")
          cups = float(input("Cups of chai: "))
          samosas = int(input("Samosas: "))

          chai_cost = cups * PRICE_CHAI
          samosa_cost = samosas * PRICE_SAMOSA
          bill = chai_cost + samosa_cost

          if bill >= 100:
              bill = bill - 10
              print("Discount: 10 rupees")
          print("Bill:", bill, "rupees")
        `, py`
          PRICE_CHAI = 12
          PRICE_SAMOSA = 15

          print("Chai Corner")
          cups = input("Cups of chai: ")
          samosas = int(input("Samosas: "))

          chai_cost = len(cups) * PRICE_CHAI
          samosa_cost = samosas * PRICE_SAMOSA
          bill = chai_cost + samosa_cost

          if bill >= 100:
              bill = bill - 10
              print("Discount: 10 rupees")
          print("Bill:", bill, "rupees")
        `],
        hints: [
          md`Read the last line of the message, then the line number above it. Step through and watch the value of «cups».`,
          md`Python stops on the line that adds the two costs. But the value that causes it comes from the line that asks for cups.`,
          md`«input» always gives text. Change the cups answer into a whole number, the same way the samosa line does.`,
        ],
      },
      {
        id: "s2", stage: 2, kind: "bug", noStep: true, title: "Stage 2: the cricket scoreboard",
        task: md`
          The user types the runs from each ball, with spaces between them. For «1 4 0 6 2 1» the scoreboard should show:

          | Balls: 6
          | Runs: 14
          | Fours and sixes: 2
          | Run rate per over: 14.0

          It shows «Runs: 13» instead, and other numbers are wrong too. Step through is off: use a labelled print if you need to look inside.
        `,
        starter: py`
          runs = input("Runs on each ball: ").split()
          balls = [int(r) for r in runs]

          total = 0
          boundaries = 0
          for i in range(len(balls) - 1):
              total += balls[i]
              if balls[i] == 4 or balls[i] == 6:
                  boundaries += 1

          print("Balls:", len(balls))
          print("Runs:", total)
          print("Fours and sixes:", boundaries)
          if len(balls) > 0:
              rate = total / len(balls) * 6
              print("Run rate per over:", round(rate, 2))
        `,
        bugLines: [6],
        solution: py`
          runs = input("Runs on each ball: ").split()
          balls = [int(r) for r in runs]

          total = 0
          boundaries = 0
          for i in range(len(balls)):
              total += balls[i]
              if balls[i] == 4 or balls[i] == 6:
                  boundaries += 1

          print("Balls:", len(balls))
          print("Runs:", total)
          print("Fours and sixes:", boundaries)
          if len(balls) > 0:
              rate = total / len(balls) * 6
              print("Run rate per over:", round(rate, 2))
        `,
        tests: [
          { inputs: ["1 4 0 6 2 1"], output: "Balls: 6\nRuns: 14\nFours and sixes: 2\nRun rate per over: 14.0" },
          { inputs: ["6"], output: "Balls: 1\nRuns: 6\nFours and sixes: 1\nRun rate per over: 36.0" },
          { inputs: [""], output: "Balls: 0\nRuns: 0\nFours and sixes: 0" },
          { inputs: ["4 0 0 1"], output: "Balls: 4\nRuns: 5\nFours and sixes: 1\nRun rate per over: 7.5" },
        ],
        wrong: [py`
          runs = input("Runs on each ball: ").split()
          balls = [int(r) for r in runs]

          total = 0
          boundaries = 0
          for i in range(1, len(balls)):
              total += balls[i]
              if balls[i] == 4 or balls[i] == 6:
                  boundaries += 1

          print("Balls:", len(balls))
          print("Runs:", total)
          print("Fours and sixes:", boundaries)
          if len(balls) > 0:
              rate = total / len(balls) * 6
              print("Run rate per over:", round(rate, 2))
        `, py`
          runs = input("Runs on each ball: ").split()
          balls = [int(r) for r in runs]

          total = 0
          boundaries = 0
          for i in range(len(balls) - 1):
              total += balls[i]
              if balls[i] == 4 or balls[i] == 6:
                  boundaries += 1

          print("Balls:", len(balls))
          print("Runs:", total + 1)
          print("Fours and sixes:", boundaries)
          if len(balls) > 0:
              rate = total / len(balls) * 6
              print("Run rate per over:", round(rate, 2))
        `],
        hints: [
          md`Shrink the input. Type one ball, such as «6». Are the runs right?`,
          md`One ball is missed. Check the first and the last round of the loop: which positions does the range give?`,
          md`The range stops one position too early. Make it stop at the number of balls.`,
        ],
      },
      {
        id: "s3", stage: 3, kind: "bug", noStep: true, title: "Stage 3: the wrong lowest mark",
        task: md`
          The user types each student's name and mark, with commas between students. For «Asha 72, Ravi 45, Meena 88» it should show:

          | Students: 3
          | Highest: Meena
          | Lowest: Ravi

          It shows the wrong lowest name. Repeat it, shrink it to the smallest failing input, test one guess, then change one line.
        `,
        starter: py`
          def read_marks(line):
              pairs = []
              for entry in line.split(","):
                  name, mark = entry.split()
                  pairs.append((name, int(mark)))
              return pairs

          def highest(pairs):
              best_name, best_mark = pairs[0]
              for name, mark in pairs:
                  if mark > best_mark:
                      best_name, best_mark = name, mark
              return best_name

          def lowest(pairs):
              low_name, low_mark = pairs[0]
              for name, mark in pairs:
                  if mark > low_mark:
                      low_name, low_mark = name, mark
              return low_name

          pairs = read_marks(input("Names and marks: "))
          print("Students:", len(pairs))
          print("Highest:", highest(pairs))
          print("Lowest:", lowest(pairs))
        `,
        bugLines: [18],
        solution: py`
          def read_marks(line):
              pairs = []
              for entry in line.split(","):
                  name, mark = entry.split()
                  pairs.append((name, int(mark)))
              return pairs

          def highest(pairs):
              best_name, best_mark = pairs[0]
              for name, mark in pairs:
                  if mark > best_mark:
                      best_name, best_mark = name, mark
              return best_name

          def lowest(pairs):
              low_name, low_mark = pairs[0]
              for name, mark in pairs:
                  if mark < low_mark:
                      low_name, low_mark = name, mark
              return low_name

          pairs = read_marks(input("Names and marks: "))
          print("Students:", len(pairs))
          print("Highest:", highest(pairs))
          print("Lowest:", lowest(pairs))
        `,
        tests: [
          { inputs: ["Asha 72, Ravi 45, Meena 88"], output: "Students: 3\nHighest: Meena\nLowest: Ravi" },
          { inputs: ["Kabir 50"], output: "Students: 1\nHighest: Kabir\nLowest: Kabir" },
          { inputs: ["Asha 30, Ravi 90"], output: "Students: 2\nHighest: Ravi\nLowest: Asha" },
          { inputs: ["Ravi 90, Asha 30, Neha 60"], output: "Students: 3\nHighest: Ravi\nLowest: Asha" },
        ],
        wrong: [py`
          def read_marks(line):
              pairs = []
              for entry in line.split(","):
                  name, mark = entry.split()
                  pairs.append((name, int(mark)))
              return pairs

          def highest(pairs):
              best_name, best_mark = pairs[0]
              for name, mark in pairs:
                  if mark > best_mark:
                      best_name, best_mark = name, mark
              return best_name

          def lowest(pairs):
              low_name, low_mark = pairs[0]
              for name, mark in pairs:
                  if mark > low_mark:
                      low_name, low_mark = name, mark
              return pairs[0][0]

          pairs = read_marks(input("Names and marks: "))
          print("Students:", len(pairs))
          print("Highest:", highest(pairs))
          print("Lowest:", lowest(pairs))
        `],
        hints: [
          md`Shrink it. With one student the answer is right. Try two students, the higher mark first, then the lower mark first.`,
          md`The «lowest» function copies the «highest» function. Look at the comparison sign inside its loop.`,
          md`A lower mark should replace the one kept so far. Turn the sign the other way.`,
        ],
      },
      {
        id: "s4", stage: 4, noStep: true, title: "Stage 4: the chai stall with three bugs",
        task: md`
          This chai stall reads commands until «close». «sell chai 2» sells two cups, «stock» shows what is left, and «close» prints the day's totals. It has **three** bugs. For the orders «sell chai 2», «sell samosa 1», «close», it should show:

          | Chai stall open
          | Sold 2 chai for 24 rupees
          | Sold 1 samosa for 15 rupees
          | Items sold: 3
          | Cash: 39 rupees

          Selling the very last items must also work. When there is not enough, it shows «Sorry, only 3 samosa left». The tests type several sets of orders, then read «stock» and «cash».
        `,
        starter: py`
          prices = {"chai": 12, "samosa": 15, "biscuit": 5}
          stock = {"chai": 20, "samosa": 10, "biscuit": 30}
          cash = 0
          sold = 0

          def cost(item, count):
              return prices[item] * count

          def show_stock():
              for item, left in stock.items():
                  print(f"{item}: {left} left")

          print("Chai stall open")
          while True:
              parts = input("> ").split()
              if not parts:
                  continue
              command = parts[0]
              if command == "close":
                  break
              elif command == "stock":
                  show_stock()
              elif command == "sell":
                  if len(parts) < 3:
                      print("Say: sell item count")
                      continue
                  item = parts[1]
                  count = parts[2]
                  if item in prices and stock[item] > count:
                      stock[item] -= count
                      cash += prices[item]
                      sold += count
                      print(f"Sold {count} {item} for {cost(item, count)} rupees")
                  elif item in prices:
                      print(f"Sorry, only {stock[item]} {item} left")
                  else:
                      print("We do not sell", item)
              else:
                  print("Commands: sell, stock, close")

          print("Items sold:", sold)
          print("Cash:", cash, "rupees")
        `,
        solution: py`
          prices = {"chai": 12, "samosa": 15, "biscuit": 5}
          stock = {"chai": 20, "samosa": 10, "biscuit": 30}
          cash = 0
          sold = 0

          def cost(item, count):
              return prices[item] * count

          def show_stock():
              for item, left in stock.items():
                  print(f"{item}: {left} left")

          print("Chai stall open")
          while True:
              parts = input("> ").split()
              if not parts:
                  continue
              command = parts[0]
              if command == "close":
                  break
              elif command == "stock":
                  show_stock()
              elif command == "sell":
                  if len(parts) < 3:
                      print("Say: sell item count")
                      continue
                  item = parts[1]
                  count = int(parts[2])
                  if item in prices and stock[item] >= count:
                      stock[item] -= count
                      cash += cost(item, count)
                      sold += count
                      print(f"Sold {count} {item} for {cost(item, count)} rupees")
                  elif item in prices:
                      print(f"Sorry, only {stock[item]} {item} left")
                  else:
                      print("We do not sell", item)
              else:
                  print("Commands: sell, stock, close")

          print("Items sold:", sold)
          print("Cash:", cash, "rupees")
        `,
        tests: [
          { inputs: ["sell chai 2", "sell samosa 1", "close"],
            output: "Chai stall open\nSold 2 chai for 24 rupees\nSold 1 samosa for 15 rupees\nItems sold: 3\nCash: 39 rupees" },
          { inputs: ["sell samosa 10", "sell samosa 1", "close"],
            output: "Chai stall open\nSold 10 samosa for 150 rupees\nSorry, only 0 samosa left\nItems sold: 10\nCash: 150 rupees",
            msg: md`Selling the last 10 samosas should work, then the next one is refused. Check the comparison between the stock and the order.` },
          { inputs: ["sell samosa 7", "sell samosa 4", "stock", "close"],
            output: "Chai stall open\nSold 7 samosa for 105 rupees\nSorry, only 3 samosa left\nchai: 20 left\nsamosa: 3 left\nbiscuit: 30 left\nItems sold: 7\nCash: 105 rupees" },
          { inputs: ["sell tea 1", "sell", "dance", "close"],
            output: "Chai stall open\nWe do not sell tea\nSay: sell item count\nCommands: sell, stock, close\nItems sold: 0\nCash: 0 rupees" },
          { inputs: ["sell biscuit 3", "sell chai 5", "close"],
            py: py`
              assert stock["biscuit"] == 27, f"After selling 3 biscuits, 27 should be left, but stock has {stock['biscuit']}."
              assert stock["chai"] == 15, f"After selling 5 chai, 15 should be left, but stock has {stock['chai']}."
              assert cash == 75, f"3 biscuits and 5 chai cost 15 + 60 = 75 rupees, but cash is {cash}. Check the line that adds to cash."
            ` },
        ],
        wrong: [py`
          prices = {"chai": 12, "samosa": 15, "biscuit": 5}
          stock = {"chai": 20, "samosa": 10, "biscuit": 30}
          cash = 0
          sold = 0

          def cost(item, count):
              return prices[item] * count

          def show_stock():
              for item, left in stock.items():
                  print(f"{item}: {left} left")

          print("Chai stall open")
          while True:
              parts = input("> ").split()
              if not parts:
                  continue
              command = parts[0]
              if command == "close":
                  break
              elif command == "stock":
                  show_stock()
              elif command == "sell":
                  if len(parts) < 3:
                      print("Say: sell item count")
                      continue
                  item = parts[1]
                  count = int(parts[2])
                  if item in prices and stock[item] > count:
                      stock[item] -= count
                      cash += cost(item, count)
                      sold += count
                      print(f"Sold {count} {item} for {cost(item, count)} rupees")
                  elif item in prices:
                      print(f"Sorry, only {stock[item]} {item} left")
                  else:
                      print("We do not sell", item)
              else:
                  print("Commands: sell, stock, close")

          print("Items sold:", sold)
          print("Cash:", cash, "rupees")
        `, py`
          prices = {"chai": 12, "samosa": 15, "biscuit": 5}
          stock = {"chai": 20, "samosa": 10, "biscuit": 30}
          cash = 0
          sold = 0

          def cost(item, count):
              return prices[item] * count

          def show_stock():
              for item, left in stock.items():
                  print(f"{item}: {left} left")

          print("Chai stall open")
          while True:
              parts = input("> ").split()
              if not parts:
                  continue
              command = parts[0]
              if command == "close":
                  break
              elif command == "stock":
                  show_stock()
              elif command == "sell":
                  if len(parts) < 3:
                      print("Say: sell item count")
                      continue
                  item = parts[1]
                  count = int(parts[2])
                  if item in prices and stock[item] >= count:
                      stock[item] -= count
                      cash += prices[item]
                      sold += count
                      print(f"Sold {count} {item} for {cost(item, count)} rupees")
                  elif item in prices:
                      print(f"Sorry, only {stock[item]} {item} left")
                  else:
                      print("We do not sell", item)
              else:
                  print("Commands: sell, stock, close")

          print("Items sold:", sold)
          print("Cash:", cash, "rupees")
        `],
        hints: [
          md`Run the first set of orders. Read the red message first: that is bug one. Then compare each line of output with the expected one.`,
          md`One bug is where the count comes from the typed words. One is in the check of the stock. One is in the line that adds money to the cash.`,
          md`The count must be a whole number. The last items in stock must be allowed. The cash must grow by the price times the count, which the cost function already gives.`,
        ],
      },
      {
        id: "d1", kind: "drill", title: "Laptop Mission: a patient on your laptop",
        task: md`
          This pretend Command Prompt shows a bug hunt on a laptop. Type each command and press Enter.

          On a phone, you may skip this. Phone users are excused from the mission below.
        `,
        steps: [
          { say: md`Go into your project folder. Type «cd python-days» and press Enter.`,
            expect: ["cd python-days"], output: "" },
          { say: md`Run the broken bill. Type «python chai_bill.py» and press Enter.`,
            expect: ["python chai_bill.py", "py chai_bill.py"],
            output: "Chai Corner\nCups of chai: 2\nSamosas: 1\nTraceback (most recent call last):\n  File \"C:\\Users\\Asha\\python-days\\chai_bill.py\", line 10, in <module>\n    bill = chai_cost + samosa_cost\nTypeError: can only concatenate str (not \"int\") to str" },
          { say: md`After you fix line 5 in IDLE and save, run it again. Type «python chai_bill.py».`,
            expect: ["python chai_bill.py", "py chai_bill.py"], output: "Chai Corner\nCups of chai: 2\nSamosas: 1\nBill: 39 rupees" },
        ],
        mission: md`
          Now do it for real. In IDLE, make a new file and type the Stage 1 program, with its bug. Save it as «chai_bill.py» in your «python-days» folder.

          1. Run it with F5 or with «python chai_bill.py». Type 2 and 1. Read the red message.
          2. Fix the bug and run it again. Type 4 and 4. It shows «Bill: 98 rupees».
          3. 98 is your receipt code. Write it in your notebook: it proves you repaired a program on your own laptop.
        `,
        hints: [
          md`Type the words in the grey box exactly, then press Enter.`,
          md`There is one space between «python» and the file name.`,
          md`If «python» does not work on your laptop, «py» does the same job.`,
        ],
      },
      {
        id: "twist", kind: "modify", carry: "s4", optional: true, noStep: true, title: "Own Twist: a menu command",
        task: md`
          Make the stall your own. Add a «menu» command that prints each item and its price, like this:

          | chai: 12 rupees
          | samosa: 15 rupees
          | biscuit: 5 rupees

          You may also add a new item, such as «lassi» at 25 rupees, with its own stock. The tests check «menu» for the first three items and all the old commands, so your own idea is safe.
        `,
        starter: py`
          prices = {"chai": 12, "samosa": 15, "biscuit": 5}
          stock = {"chai": 20, "samosa": 10, "biscuit": 30}
          cash = 0
          sold = 0

          def cost(item, count):
              return prices[item] * count

          def show_stock():
              for item, left in stock.items():
                  print(f"{item}: {left} left")

          print("Chai stall open")
          while True:
              parts = input("> ").split()
              if not parts:
                  continue
              command = parts[0]
              if command == "close":
                  break
              elif command == "stock":
                  show_stock()
              elif command == "sell":
                  if len(parts) < 3:
                      print("Say: sell item count")
                      continue
                  item = parts[1]
                  count = int(parts[2])
                  if item in prices and stock[item] >= count:
                      stock[item] -= count
                      cash += cost(item, count)
                      sold += count
                      print(f"Sold {count} {item} for {cost(item, count)} rupees")
                  elif item in prices:
                      print(f"Sorry, only {stock[item]} {item} left")
                  else:
                      print("We do not sell", item)
              else:
                  print("Commands: sell, stock, close")

          print("Items sold:", sold)
          print("Cash:", cash, "rupees")
        `,
        solution: py`
          prices = {"chai": 12, "samosa": 15, "biscuit": 5}
          stock = {"chai": 20, "samosa": 10, "biscuit": 30}
          cash = 0
          sold = 0

          def cost(item, count):
              return prices[item] * count

          def show_stock():
              for item, left in stock.items():
                  print(f"{item}: {left} left")

          def show_menu():
              for item, price in prices.items():
                  print(f"{item}: {price} rupees")

          print("Chai stall open")
          while True:
              parts = input("> ").split()
              if not parts:
                  continue
              command = parts[0]
              if command == "close":
                  break
              elif command == "stock":
                  show_stock()
              elif command == "menu":
                  show_menu()
              elif command == "sell":
                  if len(parts) < 3:
                      print("Say: sell item count")
                      continue
                  item = parts[1]
                  count = int(parts[2])
                  if item in prices and stock[item] >= count:
                      stock[item] -= count
                      cash += cost(item, count)
                      sold += count
                      print(f"Sold {count} {item} for {cost(item, count)} rupees")
                  elif item in prices:
                      print(f"Sorry, only {stock[item]} {item} left")
                  else:
                      print("We do not sell", item)
              else:
                  print("Commands: sell, stock, menu, close")

          print("Items sold:", sold)
          print("Cash:", cash, "rupees")
        `,
        tests: [
          { inputs: ["menu", "close"],
            contains: ["chai: 12 rupees", "samosa: 15 rupees", "biscuit: 5 rupees", "Items sold: 0"] },
          { inputs: ["sell chai 2", "sell samosa 1", "close"],
            contains: ["Sold 2 chai for 24 rupees", "Sold 1 samosa for 15 rupees", "Items sold: 3", "Cash: 39 rupees"] },
          { inputs: ["sell samosa 10", "sell samosa 1", "close"],
            contains: ["Sold 10 samosa for 150 rupees", "Sorry, only 0 samosa left", "Cash: 150 rupees"] },
          { inputs: ["sell tea 1", "close"], contains: ["We do not sell tea", "Cash: 0 rupees"] },
        ],
        wrong: [py`
          prices = {"chai": 12, "samosa": 15, "biscuit": 5}
          stock = {"chai": 20, "samosa": 10, "biscuit": 30}
          cash = 0
          sold = 0

          def cost(item, count):
              return prices[item] * count

          def show_stock():
              for item, left in stock.items():
                  print(f"{item}: {left} left")

          print("Chai stall open")
          while True:
              parts = input("> ").split()
              if not parts:
                  continue
              command = parts[0]
              if command == "close":
                  break
              elif command == "stock" or command == "menu":
                  show_stock()
              elif command == "sell":
                  if len(parts) < 3:
                      print("Say: sell item count")
                      continue
                  item = parts[1]
                  count = int(parts[2])
                  if item in prices and stock[item] >= count:
                      stock[item] -= count
                      cash += cost(item, count)
                      sold += count
                      print(f"Sold {count} {item} for {cost(item, count)} rupees")
                  elif item in prices:
                      print(f"Sorry, only {stock[item]} {item} left")
                  else:
                      print("We do not sell", item)
              else:
                  print("Commands: sell, stock, close")

          print("Items sold:", sold)
          print("Cash:", cash, "rupees")
        `],
        hints: [
          md`The «stock» command already prints one line for each item. The menu works the same way, but with the prices dictionary.`,
          md`Add a new function next to «show_stock», and a new elif branch for the word «menu» in the loop.`,
          md`Loop over the items of the prices dictionary and print each name with its price and the word rupees.`,
        ],
      },
    ],
    keys: [
      md`The red message names where Python stopped. The real mistake may be on an earlier line.`,
      md`Without Step through, a labelled print shows what a name holds.`,
      md`A program can have several bugs. Fix one, run every input again, then look for the next.`,
    ],
  });

  // ---------------------------------------------------------------- Day 52
  day({
    slug: "names-inside-functions",
    title: "Names Inside Functions",
    goal: "Predict which names a function can see, change and keep.",
    minutes: 45,
    kind: "lesson",
    needs: [32, 33, 45],
    win: "Today you can now say which names a function can see, and send a value in and back out safely.",
    learn: [
      md`
        ## Why did my score not change?

        Ravi writes a function that adds a four to his cricket score. He runs it, but his score stays the same. Guess what the program prints.
      `,
      ex(py`
        score = 10

        def hit_four():
            score = 14
            print("Inside:", score)

        hit_four()
        print("Outside:", score)
      `, { predict: ["Inside: 14\nOutside: 10", "Inside: 14\nOutside: 14", "Inside: 10\nOutside: 10"], answer: 0 }),
      md`
        Each call of a function gets its own box of names. A name made with «=» inside a function is a **local name**. It lives only in that box, and it is gone when the function ends. The **scope** of a name is the part of the program that can see it.

        So line 4 makes a new local «score». The main program's «score» is a different name in a different box. Press Step through and watch the two boxes.
      `,
      ask({
        q: md`In the program above, which line makes the local name «score»?`,
        options: ["Line 4, «score = 14»", "Line 1, «score = 10»", "Line 8, the last print"],
        answer: 0,
        explain: md`An «=» inside the function makes a name in the function's own box.`,
        why: [null, md`Line 1 is in the main program. That «score» belongs to the main program's box.`, md`Printing a name never makes it. It only reads it.`],
      }),
      pause(md`Good place for a short break. Next: a crash that surprises everyone once.`),
      md`
        ## A name used before it gets a value

        Now Ravi tries «+=» inside the function. Guess what happens.
      `,
      ex(py`
        score = 10

        def hit_four():
            score += 4
            return score

        print(hit_four())
      `, { error: true, predict: ["UnboundLocalError", "14", "10"], answer: 0 }),
      md`
        Python reads the whole function first. «score» is changed inside it, so «score» is local everywhere in the function. Line 4 then reads the local «score» before it has a value, and Python stops with **UnboundLocalError**.

        Only reading a main-program name is fine, as on Day 33. Python has a word, «global», that lets a function change a main-program name. Avoid it: it hides where values change, so bugs become hard to find.
      `,
      md`
        ## Pass it in, return it out

        The clean way: give the value to the function as a parameter, and send the new value back with «return». Then store it with «=». Guess the output.
      `,
      ex(py`
        def hit_four(score):
            score = score + 4
            return score

        score = 10
        score = hit_four(score)
        score = hit_four(score)
        print("Score:", score)
      `, { predict: ["Score: 18", "Score: 14", "Score: 10"], answer: 0 }),
      md`
        Line 6 sends 10 in. The function returns 14, and «=» stores it in the main «score». The next call starts from 14. A returned value that nobody stores is lost.
      `,
      ask({
        q: md`What does this print?`,
        code: py`
          def hit_four(score):
              score = score + 4
              return score

          score = 10
          hit_four(score)
          print("Score:", score)
        `,
        options: ["Score: 10", "Score: 14", "UnboundLocalError"],
        answer: 0,
        explain: md`The function returns 14, but line 6 does not store it. The main «score» is still 10.`,
        why: [null, md`14 is returned, then thrown away. Line 6 needs «score =» in front.`, md`Here «score» is a parameter, so it has a value from the start. No crash.`],
      }),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          x = 5

          def change():
              x = 50

          change()
          print(x)
        `, options: ["5", "50", "UnboundLocalError"], answer: 0,
        explain: md`«x = 50» makes a local «x» inside the function. The main program's «x» stays 5.`,
        why: [null, md`50 went into the function's own box, which is gone after the call.`, md`The function never reads «x» before giving it a value, so there is no crash.`],
        skill: "trace" },
      { q: md`What happens when this runs?`, code: py`
          count = 10

          def add_one():
              count += 1

          add_one()
          print(count)
        `, options: ["UnboundLocalError", "11", "10"], answer: 0, error: true, verify: true, mono: true,
        explain: md`«+=» changes «count», so «count» is local in the whole function. It is read before it has a value.`,
        why: [null, md`A function cannot change a main-program name with «+=». It crashes first.`, md`The program never reaches the print. It stops inside the function.`],
        skill: "debug" },
      { q: md`What does this program do?`, code: py`
          def add_tax(price):
              return price + price * 5 // 100

          bill = 200
          bill = add_tax(bill)
          print(bill)
        `, options: ["It adds 5 percent tax to the bill, keeps the new bill and shows it", "It shows the tax only", "It shows the old bill, because the function cannot change it"],
        answer: 0, verify: false, mono: false,
        explain: md`The bill goes in, the bill with tax comes back, and «bill =» keeps it. It shows 210.`,
        why: [null, md`The function returns the price plus the tax, not the tax alone.`, md`The function does not change it, but «bill =» stores the returned value.`],
        skill: "read" },
      { q: md`What is a local name?`,
        options: ["A name made inside a function, which lives only while that call runs", "A name made in the main program", "Any name with small letters"], answer: 0,
        explain: md`Each call has its own box. Names made there are local and disappear when the call ends.`,
        why: [null, md`Main-program names are not local. Every function can read them.`, md`Small letters are a naming habit. They have nothing to do with where a name lives.`],
        skill: "memory" },
      { q: md`Your function must change the main program's «score». Which way does this course use?`,
        options: ["Pass «score» in, return the new score, and store it with «score =»", "Write «score += runs» inside the function", "Give the function no parameters and print the score inside it"], answer: 0,
        explain: md`Pass in, return out. Every change to «score» is then easy to see in the main program.`,
        why: [null, md`That makes «score» local and crashes with UnboundLocalError.`, md`Printing inside shows a value, but the main «score» never changes.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: two boxes, one name",
        task: md`There are two names called «total». Answer each question without running the program.`,
        code: py`
          total = 100

          def add_tax(total):
              total = total + 18
              return total

          bill = add_tax(50)
          print(bill, total)
        `,
        inputs: [],
        ask: [{ line: 4, name: "total" }, { line: 7, name: "bill" }, { output: true }],
        hints: [
          md`Inside the function, «total» is the parameter. Which number was given in the call?`,
          md`Line 4 changes only the local «total». The main «total» is never changed.`,
          md`The last line shows the returned value, then the main program's own «total».`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: the counter that stays at zero",
        task: md`A shop counts its visitors. Answer without running the program.`,
        code: py`
          count = 0

          def visit(name):
              count = 1
              print("Welcome", name)

          visit("Asha")
          visit("Ravi")
          print("Visitors:", count)
        `,
        inputs: [],
        ask: [{ line: 4, hit: 2, name: "count" }, { output: true }],
        hints: [
          md`Each call makes a new box. Line 4 sets a local «count» in that box.`,
          md`The second call does not remember the first one. Its box starts empty again.`,
          md`The last line reads the main program's «count», which no line ever changes.`,
        ],
      },
      {
        id: "t3", kind: "trace", title: "Be the Computer: runs passed in and back out",
        task: md`Answer without running the program.`,
        code: py`
          def add_runs(score, runs):
              for r in runs:
                  score += r
              return score

          score = 0
          score = add_runs(score, [4, 6])
          score = add_runs(score, [1])
          print(score)
        `,
        inputs: [],
        ask: [{ line: 3, hit: 2, name: "score" }, { line: 7, name: "score" }, { output: true }],
        hints: [
          md`Here «score» is a parameter, so it has a value before line 3 runs. Add each run to it in turn.`,
          md`After line 7, the main «score» holds what the first call returned.`,
          md`The second call starts from that stored value, not from 0.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: a score kept the safe way",
        task: md`Arrange the lines so the program prints «Score: 10». The function gets the score passed in and returns the new score.`,
        solution: py`
          def add_runs(score, runs):
              score = score + runs
              return score

          score = 0
          score = add_runs(score, 4)
          score = add_runs(score, 6)
          print("Score:", score)
        `,
        distractors: ["add_runs(score, 6)"],
        indent: "choose",
        tests: [{ output: "Score: 10" }],
        hints: [
          md`The function comes first, then the main program that uses it.`,
          md`Inside the function: change the score, then send it back.`,
          md`Every call must be stored back into the score, or its answer is lost.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the pass counter crashes",
        task: md`
          The user types marks with spaces between them. For «40 20 90» the program should show «Passed: 2», counting marks of 33 or more. It stops with «UnboundLocalError» instead. Step through is off. Read the message, then fix it so the function keeps its own counter.
        `,
        starter: py`
          passed = 0

          def count_passed(marks):
              for m in marks:
                  if m >= 33:
                      passed += 1
              return passed

          marks = [int(x) for x in input("Marks: ").split()]
          print("Passed:", count_passed(marks))
        `,
        bugLines: [1, 6],
        solution: py`
          def count_passed(marks):
              passed = 0
              for m in marks:
                  if m >= 33:
                      passed += 1
              return passed

          marks = [int(x) for x in input("Marks: ").split()]
          print("Passed:", count_passed(marks))
        `,
        tests: [
          { inputs: ["40 20 90"], output: "Passed: 2" },
          { inputs: ["33"], output: "Passed: 1" },
          { inputs: ["10 32"], output: "Passed: 0" },
          { inputs: [""], output: "Passed: 0" },
          { inputs: ["1"], py: py`
            first = call("count_passed", [50, 60])
            second = call("count_passed", [50, 60])
            assert first == 2 and second == 2, f"Calling the function twice with [50, 60] gave {first} and then {second}. Each call should give 2. Check where the counter starts."
          ` },
        ],
        wrong: [py`
          passed = 0

          def count_passed(marks):
              for m in marks:
                  if m >= 33:
                      passed = passed + 1
              return passed

          marks = [int(x) for x in input("Marks: ").split()]
          print("Passed:", count_passed(marks))
        `, py`
          def count_passed(marks):
              for m in marks:
                  passed = 0
                  if m >= 33:
                      passed += 1
              return passed

          marks = [int(x) for x in input("Marks: ").split()]
          print("Passed:", count_passed(marks))
        `],
        hints: [
          md`The message names the line with «+=». The counter is changed inside the function, so it is a local name there.`,
          md`A local name needs a starting value inside its own function. Look at where the counter starts now.`,
          md`Move the line that sets the counter to 0 into the function, just before the loop.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: score and balls", optional: true,
        task: md`
          This program keeps a score with a function. Change it so the user types the runs on one line, with spaces between them, and it also counts the balls. Rename the function «add_ball(score, balls, runs)»: it returns the new score and the new ball count. For «4 1 6» it shows:

          | Score: 11, Balls: 3
        `,
        starter: py`
          def add_runs(score, runs):
              score = score + runs
              return score

          score = 0
          for r in [4, 1, 6]:
              score = add_runs(score, r)
          print("Score:", score)
        `,
        solution: py`
          def add_ball(score, balls, runs):
              score = score + runs
              balls = balls + 1
              return score, balls

          score = 0
          balls = 0
          for r in input("Runs: ").split():
              score, balls = add_ball(score, balls, int(r))
          print(f"Score: {score}, Balls: {balls}")
        `,
        tests: [
          { inputs: ["4 1 6"], output: "Score: 11, Balls: 3" },
          { inputs: ["0"], output: "Score: 0, Balls: 1" },
          { inputs: [""], output: "Score: 0, Balls: 0" },
          { inputs: ["5"], py: py`expect("add_ball", (10, 2, 4), (14, 3))` },
        ],
        wrong: [py`
          def add_ball(score, balls, runs):
              score = score + runs
              balls = balls + 1
              return score

          score = 0
          balls = 0
          for r in input("Runs: ").split():
              score = add_ball(score, balls, int(r))
          print(f"Score: {score}, Balls: {balls}")
        `],
        hints: [
          md`The function needs one more parameter and must send back two values.`,
          md`On the return line, give both values with a comma between them. In the loop, unpack both into the main names.`,
          md`Return the score and the balls, and store them with two names on the left of «=».`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a wallet that remembers",
        task: md`
          Write a function «spend(wallet, price)». If the price is not more than the wallet, it returns the money left. If the price is more, it prints «Not enough money» and returns the wallet unchanged.

          The main program starts with «wallet = 100». The user types prices with spaces between them. Pass the wallet in and store what comes back, for each price. At the end, print the money left. For «20 30» it shows:

          | Left: 50 rupees
        `,
        starter: py`

        `,
        solution: py`
          def spend(wallet, price):
              if price > wallet:
                  print("Not enough money")
                  return wallet
              return wallet - price

          wallet = 100
          for p in input("Prices: ").split():
              wallet = spend(wallet, int(p))
          print("Left:", wallet, "rupees")
        `,
        tests: [
          { inputs: ["20 30"], output: "Left: 50 rupees" },
          { inputs: ["120"], output: "Not enough money\nLeft: 100 rupees" },
          { inputs: ["100"], output: "Left: 0 rupees" },
          { inputs: ["60 50 40"], output: "Not enough money\nLeft: 0 rupees" },
          { inputs: [""], output: "Left: 100 rupees" },
          { inputs: ["5"], py: py`
            expect("spend", (50, 20), 30)
            expect("spend", (10, 10), 0)
          ` },
        ],
        wrong: [py`
          def spend(wallet, price):
              if price > wallet:
                  print("Not enough money")
              else:
                  wallet = wallet - price

          wallet = 100
          for p in input("Prices: ").split():
              spend(wallet, int(p))
          print("Left:", wallet, "rupees")
        `, py`
          def spend(wallet, price):
              if price >= wallet:
                  print("Not enough money")
                  return wallet
              return wallet - price

          wallet = 100
          for p in input("Prices: ").split():
              wallet = spend(wallet, int(p))
          print("Left:", wallet, "rupees")
        `],
        hints: [
          md`Plan: one function that decides and returns, then a loop in the main program that stores each answer.`,
          md`Inside the function, check if the price is more than the wallet first. In the loop, put «wallet =» in front of the call.`,
          md`The function returns the wallet unchanged when the price is too big, and the wallet minus the price otherwise.`,
        ],
      },
    ],
    keys: [
      md`Each function call has its own box of names. A name made with «=» inside it is **local**.`,
      md`The **scope** of a name is the part of the program that can see it.`,
      md`Changing a name inside a function makes it local everywhere in that function. Reading it first gives **UnboundLocalError**.`,
      md`Pass the value in, return the new value out, and store it with «=».`,
    ],
  });

  // ---------------------------------------------------------------- Day 53
  day({
    slug: "two-names-one-list",
    title: "Two Names, One List",
    goal: "See when two names share one list, and copy it safely.",
    minutes: 45,
    kind: "lesson",
    needs: [3, 22, 23],
    win: "Today you can now tell when two names share one list, and make a real copy when you need one.",
    learn: [
      md`
        ## Two names, one list

        Asha makes a shopping list. Her brother Ravi wants his own list, so he writes «ravi = asha». Guess the output.
      `,
      ex(py`
        asha = ["chai", "sugar"]
        ravi = asha
        ravi.append("milk")
        print(asha)
        print(ravi)
      `, { predict: [
        "['chai', 'sugar', 'milk']\n['chai', 'sugar', 'milk']",
        "['chai', 'sugar']\n['chai', 'sugar', 'milk']",
        "['chai', 'sugar', 'milk']\n['chai', 'sugar']",
      ], answer: 0 }),
      md`
        An **object** is one value that Python keeps in memory, such as a list, a number or a piece of text. A name does not hold an object. It **points to** it, like a label tied to a box.

        «ravi = asha» makes no new list. It ties a second name to the same list. Two names for one object is called **aliasing**. Press Step through: both names point to one list box.
      `,
      ask({
        q: md`In the program above, how many lists are there after line 2?`,
        options: ["One list with two names", "Two lists with the same items", "No list"],
        answer: 0,
        explain: md`«=» with a name on the right ties a new name to the same object. Nothing is copied.`,
        why: [null, md`That is what Ravi wanted. But «=» does not copy a list.`, md`Line 1 made a list, and it is still there.`],
      }),
      pause(md`Good place for a short break. Next: how to make a real copy.`),
      md`
        ## Making a real copy

        A list has a «.copy()» method. A slice from start to end, «[:]», also makes a new list. Guess the output.
      `,
      ex(py`
        asha = ["chai", "sugar"]
        ravi = asha.copy()
        meena = asha[:]
        ravi.append("milk")
        meena.append("rusk")
        print(asha)
        print(ravi)
        print(meena)
      `, { predict: [
        "['chai', 'sugar']\n['chai', 'sugar', 'milk']\n['chai', 'sugar', 'rusk']",
        "['chai', 'sugar', 'milk', 'rusk']\n['chai', 'sugar', 'milk', 'rusk']\n['chai', 'sugar', 'milk', 'rusk']",
        "['chai', 'sugar']\n['chai', 'sugar']\n['chai', 'sugar']",
      ], answer: 0 }),
      md`
        Now there are three lists. A change to a copy never touches the first list. To ask if two names share one object, use «is». To ask if two objects hold equal items, use «==». Guess again.
      `,
      ex(py`
        a = [1, 2]
        b = a
        c = a.copy()
        print(a == c)
        print(a is c)
        print(a is b)
      `, { predict: ["True\nFalse\nTrue", "True\nTrue\nTrue", "False\nFalse\nTrue"], answer: 0 }),
      md`
        «a» and «c» hold equal items, so «==» gives True. But they are two different lists, so «is» gives False.
      `,
      md`
        ## Why numbers and text seem different

        On Day 3, «b = a» seemed to copy a number. Numbers and text can never be changed. «a + 1» makes a new number, and «=» points «a» at it. «b» still points at the old one.

        A list can be changed. «.append()» changes the one list itself, so every name that points to it sees the change.
      `,
      ask({
        q: md`What does this print?`,
        code: py`
          a = 5
          b = a
          a = a + 1
          print(a, b)
        `,
        options: ["6 5", "6 6", "5 5"],
        answer: 0,
        explain: md`Line 3 points «a» at a new number, 6. «b» still points at 5.`,
        why: [null, md`A number cannot be changed, so nothing can change under «b». Only «a» moves to a new number.`, md`Line 3 does change what «a» points to.`],
      }),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          a = [1, 2]
          b = a
          b[0] = 9
          print(a)
        `, options: ["[9, 2]", "[1, 2]", "[9]"], answer: 0,
        explain: md`«a» and «b» point to one list. Changing it through «b» changes what «a» shows.`,
        why: [null, md`That would need «b = a.copy()». Here there is only one list.`, md`«b[0] = 9» changes one item. The list keeps both items.`],
        skill: "trace" },
      { q: md`What does this show?`, code: py`
          x = ["chai"]
          y = ["chai"]
          print(x == y, x is y)
        `, options: ["True False", "True True", "False False"], answer: 0,
        explain: md`Two separate lists with equal items: «==» is True, «is» is False.`,
        why: [null, md`Lines 1 and 2 each make their own list, so they are not the same object.`, md`The items are equal, so «==» is True.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          marks = [70, 80]
          old = marks[:]
          marks.append(90)
          print(old, marks)
        `, options: ["It keeps a copy of the marks, adds a new mark, and shows the old and new lists", "It shows the same list twice", "It removes the last mark"],
        answer: 0, verify: false, mono: false,
        explain: md`«[:]» makes a new list first, so «old» stays «[70, 80]» while «marks» grows.`,
        why: [null, md`«[:]» makes a real copy, so the two lists are different.`, md`«.append()» adds an item. Nothing is removed.`],
        skill: "read" },
      { q: md`Meena writes «new = old», then «new.append(5)». Now «old» has changed too. Why?`,
        options: ["Both names point to one list, so the change shows through both", "«.append()» always changes every list", "Python made a mistake"], answer: 0,
        explain: md`«new = old» is aliasing. Use «new = old.copy()» to get a separate list.`,
        why: [null, md`«.append()» changes only the list it is called on. Here, that list has two names.`, md`Python did what the code says. «=» never copies a list.`],
        skill: "debug" },
      { q: md`Which line makes a separate copy of the list «team»?`,
        options: ["«squad = team.copy()»", "«squad = team»", "«squad = team[0]»"], answer: 0,
        explain: md`«.copy()» makes a new list. «team[:]» would work too.`,
        why: [null, md`This ties a second name to the same list.`, md`This gives only the first item, not a list.`],
        skill: "memory" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: the squad grows",
        task: md`Answer each question without running the program.`,
        code: py`
          team = ["Rohit", "Virat"]
          squad = team
          squad.append("Bumrah")
          size = len(team)
          print(size, team is squad)
        `,
        inputs: [],
        ask: [{ line: 3, name: "team" }, { line: 4, name: "size" }, { output: true }],
        hints: [
          md`Line 2 copies nothing. Ask: how many lists are there?`,
          md`The name used on line 3 does not matter. The one shared list gets the new player.`,
          md`«is» asks if the two names point to the same list.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: a safe backup",
        task: md`Answer without running the program.`,
        code: py`
          marks = [40, 55]
          backup = marks.copy()
          marks[0] = 90
          print(backup[0], marks[0])
          print(backup == marks)
        `,
        inputs: [],
        ask: [{ line: 3, name: "backup" }, { line: 3, name: "marks" }, { output: true }],
        hints: [
          md`Line 2 makes a second, separate list.`,
          md`Line 3 changes only the list that «marks» points to.`,
          md`«==» compares the items. One item is now different.`,
        ],
      },
      {
        id: "t3", kind: "trace", title: "Be the Computer: a name moves",
        task: md`This one surprises many people. Answer without running the program.`,
        code: py`
          a = [1, 2]
          b = a
          a = [7, 8]
          b.append(3)
          same = a is b
          print(a, b, same)
        `,
        inputs: [],
        ask: [{ line: 3, name: "b" }, { line: 4, name: "b" }, { output: true }],
        hints: [
          md`After line 2, two names point to the first list.`,
          md`Line 3 makes a brand-new list and points only «a» at it. «b» still points to the first list.`,
          md`Line 4 changes the list that «b» points to, which is no longer «a»'s list.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: a new menu that keeps the old one",
        task: md`
          Arrange the lines so the program prints:

          | ['chai', 'samosa']
          | ['chai', 'samosa', 'vada']
        `,
        solution: py`
          menu = ["chai", "samosa"]
          new_menu = menu.copy()
          new_menu.append("vada")
          print(menu)
          print(new_menu)
        `,
        distractors: ["new_menu = menu"],
        indent: "choose",
        tests: [{ output: "['chai', 'samosa']\n['chai', 'samosa', 'vada']" }],
        hints: [
          md`The old menu must exist before you copy it.`,
          md`Make the copy before you add anything, and add only to the copy.`,
          md`One of the lines ties a second name to the old list. Leave it out.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: tomorrow's prices change today's",
        task: md`
          The user types today's chai prices, then one new price for tomorrow. Tomorrow's list should be today's list plus the new price. Today's list must not change. For «12 15 20» and «25» it should show:

          | Today: [12, 15, 20]
          | Tomorrow: [12, 15, 20, 25]

          But today's list changes too. Step through is off. Fix the one wrong line.
        `,
        starter: py`
          today = [int(x) for x in input("Today's prices: ").split()]
          extra = int(input("New price: "))
          tomorrow = today
          tomorrow.append(extra)
          print("Today:", today)
          print("Tomorrow:", tomorrow)
        `,
        bugLines: [3],
        solution: py`
          today = [int(x) for x in input("Today's prices: ").split()]
          extra = int(input("New price: "))
          tomorrow = today.copy()
          tomorrow.append(extra)
          print("Today:", today)
          print("Tomorrow:", tomorrow)
        `,
        tests: [
          { inputs: ["12 15 20", "25"], output: "Today: [12, 15, 20]\nTomorrow: [12, 15, 20, 25]" },
          { inputs: ["5", "6"], output: "Today: [5]\nTomorrow: [5, 6]" },
          { inputs: ["", "10"], output: "Today: []\nTomorrow: [10]" },
          { inputs: ["8 8", "8"], py: py`assert tomorrow is not today, "«tomorrow» and «today» still point to the same list. Make a real copy."` },
        ],
        wrong: [py`
          today = [int(x) for x in input("Today's prices: ").split()]
          extra = int(input("New price: "))
          tomorrow = today[1:]
          tomorrow.append(extra)
          print("Today:", today)
          print("Tomorrow:", tomorrow)
        `, py`
          today = [int(x) for x in input("Today's prices: ").split()]
          extra = int(input("New price: "))
          tomorrow = [today]
          tomorrow.append(extra)
          print("Today:", today)
          print("Tomorrow:", tomorrow)
        `],
        hints: [
          md`Both lines of output show the same list. Ask how many lists the program has.`,
          md`The line that makes «tomorrow» does not copy anything. It only gives the same list a second name.`,
          md`Make «tomorrow» a separate list with all of today's items, using the copy method or a full slice.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: same items, same list?", optional: true,
        task: md`
          This program saves a copy of the marks. Add two lines at the end. One uses «==» to show if the items are equal. One uses «is» to show if it is the same list. For «70 80» it shows:

          | Saved: [70, 80]
          | Same items: True
          | Same list: False
        `,
        starter: py`
          marks = [int(x) for x in input("Marks: ").split()]
          saved = marks.copy()
          print("Saved:", saved)
        `,
        solution: py`
          marks = [int(x) for x in input("Marks: ").split()]
          saved = marks.copy()
          print("Saved:", saved)
          print("Same items:", saved == marks)
          print("Same list:", saved is marks)
        `,
        tests: [
          { inputs: ["70 80"], output: "Saved: [70, 80]\nSame items: True\nSame list: False" },
          { inputs: ["33"], output: "Saved: [33]\nSame items: True\nSame list: False" },
          { inputs: [""], output: "Saved: []\nSame items: True\nSame list: False" },
          { inputs: ["1"], py: py`assert " is " in CODE and "==" in CODE, "Work out both answers with «==» and «is». Do not type True or False yourself."` },
        ],
        wrong: [py`
          marks = [int(x) for x in input("Marks: ").split()]
          saved = marks.copy()
          print("Saved:", saved)
          print("Same items:", saved is marks)
          print("Same list:", saved is marks)
        `, py`
          marks = [int(x) for x in input("Marks: ").split()]
          saved = marks.copy()
          print("Saved:", saved)
          print("Same items: True")
          print("Same list: False")
        `],
        hints: [
          md`One question is about the items. The other is about the one list in memory.`,
          md`Add both lines after the last print. Each shows a label, then a comparison.`,
          md`Equal items use the double equals sign. The same object uses the word «is».`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a sorted copy of the squad",
        task: md`
          The user types the names of a cricket squad, with spaces between them. Make a list named «squad». Make a separate copy named «order», then sort «order» with «.sort()». The squad must keep its first order. For «Rohit Virat Bumrah» it shows:

          | Squad: ['Rohit', 'Virat', 'Bumrah']
          | Sorted: ['Bumrah', 'Rohit', 'Virat']
        `,
        starter: py`

        `,
        solution: py`
          squad = input("Squad: ").split()
          order = squad.copy()
          order.sort()
          print("Squad:", squad)
          print("Sorted:", order)
        `,
        tests: [
          { inputs: ["Rohit Virat Bumrah"], output: "Squad: ['Rohit', 'Virat', 'Bumrah']\nSorted: ['Bumrah', 'Rohit', 'Virat']" },
          { inputs: ["Asha"], output: "Squad: ['Asha']\nSorted: ['Asha']" },
          { inputs: ["Zaid Amit"], output: "Squad: ['Zaid', 'Amit']\nSorted: ['Amit', 'Zaid']" },
          { inputs: [""], output: "Squad: []\nSorted: []" },
          { inputs: ["B A"], py: py`
            need("squad", "list")
            need("order", "list")
            assert order is not squad, "«order» and «squad» point to the same list. Make a real copy."
          ` },
        ],
        wrong: [py`
          squad = input("Squad: ").split()
          order = squad
          order.sort()
          print("Squad:", squad)
          print("Sorted:", order)
        `, py`
          squad = input("Squad: ").split()
          order = squad.copy()
          order = order.sort()
          print("Squad:", squad)
          print("Sorted:", order)
        `],
        hints: [
          md`Three steps: make the squad list, make a separate copy, sort only the copy.`,
          md`The copy must come from the copy method or a full slice. Sort on its own line, without «=».`,
          md`Remember: the sort method changes the list and gives back None, so never store its result.`,
        ],
      },
    ],
    keys: [
      md`A name **points to** an object. «b = a» ties a second name to the same object: this is **aliasing**.`,
      md`«.copy()» and «[:]» make a new, separate list.`,
      md`«==» asks: equal items? «is» asks: the very same object?`,
      md`Numbers and text can never be changed, so sharing them is safe. Lists can be changed, so sharing them can surprise you.`,
    ],
  });

  // ---------------------------------------------------------------- Day 54
  day({
    slug: "data-given-to-functions",
    title: "Lists and Dictionaries Given to Functions",
    goal: "Decide whether a function should change your data or return new data.",
    minutes: 45,
    kind: "lesson",
    needs: [32, 53],
    win: "Today you can now choose: a function that changes your list in place, or one that returns a new list and leaves yours alone.",
    learn: [
      md`
        ## The function gets the same list

        On Day 53, two names pointed to one list. A parameter is one more name. Guess the output.
      `,
      ex(py`
        def add_tip(bill):
            bill.append(10)

        order = [12, 15]
        add_tip(order)
        print(order)
      `, { predict: ["[12, 15, 10]", "[12, 15]", "None"], answer: 0 }),
      md`
        During the call, «bill» and «order» point to the same list. **Changing in place** means changing the object itself, with «.append()», «.sort()» or «bill[0] = 5». The caller sees every change made in place.

        Sometimes that is what you want. Sometimes it ruins data the caller wanted to keep.
      `,
      ask({
        q: md`«add_tip» has no «return». Why does «order» still change?`,
        options: ["«bill» points to the same list, and «.append()» changes that list", "Python returns the list by itself", "The function makes a copy and gives it back"],
        answer: 0,
        explain: md`No return is needed. The one shared list was changed in place.`,
        why: [null, md`A function with no return gives back None. The change came from the shared list.`, md`Nothing is copied. A parameter is just another name.`],
      }),
      pause(md`Good place for a short break. Next: the other choice, returning new data.`),
      md`
        ## Or return new data

        A function can copy first, change the copy, and return it. A dictionary has «.copy()» too. Guess the output.
      `,
      ex(py`
        def add_stock(stock, item, count):
            new_stock = stock.copy()
            new_stock[item] = new_stock.get(item, 0) + count
            return new_stock

        shop = {"chai": 5}
        after = add_stock(shop, "samosa", 10)
        print(shop)
        print(after)
      `, { predict: [
        "{'chai': 5}\n{'chai': 5, 'samosa': 10}",
        "{'chai': 5, 'samosa': 10}\n{'chai': 5, 'samosa': 10}",
        "{'chai': 5}\n{'samosa': 10}",
      ], answer: 0 }),
      md`
        Choose one way for each function: change in place and return nothing, or return new data and change nothing. Sorting has the same two choices: «.sort()» changes the list in place, and «sorted()» returns a new list.
      `,
      md`
        One more surprise. A default value (Day 33) can be a list. Guess the output.
      `,
      ex(py`
        def book(name, seats=[]):
            seats.append(name)
            return seats

        print(book("Asha"))
        print(book("Ravi"))
      `, { predict: ["['Asha']\n['Asha', 'Ravi']", "['Asha']\n['Ravi']", "['Asha', 'Ravi']\n['Asha', 'Ravi']"], answer: 0 }),
      warn(md`
        Ravi got Asha's seat too. A default is made once, when «def» runs, so every call shares that one list. Never use «[]» as a default value.
      `),
      md`
        ## The returned None trap

        «.sort()» changes the list and gives back None. Guess what happens here.
      `,
      ex(py`
        def ranked(marks):
            return marks.sort(reverse=True)

        top = ranked([72, 55, 90])
        top.append(100)
        print(top)
      `, { error: true, predict: ["AttributeError", "[90, 72, 55, 100]", "None"], answer: 0 }),
      md`
        «ranked» returns what «.sort()» gave back: None. None has no «.append()», so Python stops with «AttributeError: 'NoneType' object has no attribute 'append'». When a message names «NoneType», look for a call that returned None. Here, «return sorted(marks, reverse=True)» fixes it.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          def add_one(nums):
              nums.append(1)
              return len(nums)

          data = [5]
          n = add_one(data)
          print(n, data)
        `, options: ["2 [5, 1]", "2 [5]", "1 [5, 1]"], answer: 0,
        explain: md`«nums» and «data» are one list. It gets a 1 in place, then its length, 2, is returned.`,
        why: [null, md`The change was made in place, so «data» shows it too.`, md`The length is counted after the append, so it is 2.`],
        skill: "trace" },
      { q: md`What happens when this runs?`, code: py`
          names = ["Ravi", "Asha"]
          names = names.sort()
          names.append("Meena")
          print(names)
        `, options: ["AttributeError", "['Asha', 'Ravi', 'Meena']", "TypeError"], answer: 0, error: true, verify: true, mono: true,
        explain: md`«.sort()» gives back None, and line 2 stores it. None has no «.append()».`,
        why: [null, md`That needs «names.sort()» alone on line 2, with no «names =».`, md`The error is about a missing method, so it is AttributeError.`],
        skill: "debug" },
      { q: md`What does this program do?`, code: py`
          def without_zeros(marks):
              return [m for m in marks if m != 0]

          marks = [40, 0, 75, 0]
          print(without_zeros(marks))
          print(marks)
        `, options: ["It shows a new list with the zeros taken out, then the original list unchanged", "It removes the zeros from the original list", "It counts the zeros"],
        answer: 0, verify: false, mono: false,
        explain: md`The comprehension builds a new list. The original still has its zeros.`,
        why: [null, md`Nothing changes «marks» in place. A new list is returned.`, md`It builds a list. It does not count anything.`],
        skill: "read" },
      { q: md`You need the marks in order, and you must also keep their first order. What do you use?`,
        options: ["«ranked = sorted(marks)»", "«marks.sort()»", "«ranked = marks.sort()»"], answer: 0,
        explain: md`«sorted()» returns a new list and leaves «marks» as it was.`,
        why: [null, md`This changes «marks» in place, so the first order is lost.`, md`This stores None in «ranked», and it changes «marks» too.`],
        skill: "choose" },
      { q: md`What does this show?`, code: py`
          prices = {"chai": 12}
          new = prices.copy()
          new["chai"] = 15
          print(prices["chai"])
        `, options: ["12", "15", "None"], answer: 0,
        explain: md`«.copy()» made a separate dictionary. Only the copy has 15.`,
        why: [null, md`That would happen with «new = prices», which shares one dictionary.`, md`The key «chai» is still in «prices», with its old value.`],
        skill: "trace" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: grace marks in place",
        task: md`Answer each question without running the program.`,
        code: py`
          def give_grace(marks):
              for i in range(len(marks)):
                  marks[i] = marks[i] + 5

          scores = [30, 60]
          give_grace(scores)
          total = sum(scores)
          print(scores, total)
        `,
        inputs: [],
        ask: [{ line: 3, hit: 1, name: "marks" }, { line: 7, name: "total" }, { output: true }],
        hints: [
          md`«marks» and «scores» are two names for one list.`,
          md`Line 3 changes one item of that list each time it runs.`,
          md`After the call, both marks have grown by 5. Add them up.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: sorted() and .sort()",
        task: md`Answer without running the program.`,
        code: py`
          def top_two(marks):
              best = sorted(marks, reverse=True)
              return best[:2]

          marks = [45, 88, 67]
          first = top_two(marks)
          marks.sort()
          print(first, marks)
        `,
        inputs: [],
        ask: [{ line: 2, name: "best" }, { line: 7, name: "marks" }, { output: true }],
        hints: [
          md`«sorted» makes a new list, highest first. «marks» is not touched inside the function.`,
          md`The slice keeps the first two items of the new list.`,
          md`Line 7 sorts «marks» itself, lowest first.`,
        ],
      },
      {
        id: "t3", kind: "trace", title: "Be the Computer: the shared basket",
        task: md`This is the surprise from the warning box. Answer without running the program.`,
        code: py`
          def add_item(item, basket=[]):
              basket.append(item)
              return basket

          a = add_item("chai")
          b = add_item("samosa")
          print(a)
          print(a is b)
        `,
        inputs: [],
        ask: [{ line: 2, hit: 1, name: "basket" }, { line: 2, hit: 2, name: "basket" }, { output: true }],
        hints: [
          md`The default list is made once, when the def line runs. It is not made new for each call.`,
          md`The second call gets the same list as the first call, with chai still in it.`,
          md`«a» and «b» both point to that one default list.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: a merit list that keeps the original",
        task: md`
          Arrange the lines so the program prints:

          | [55, 90, 72]
          | [90, 72, 55]
        `,
        solution: py`
          def ranked(marks):
              return sorted(marks, reverse=True)

          marks = [55, 90, 72]
          top = ranked(marks)
          print(marks)
          print(top)
        `,
        distractors: ["return marks.sort(reverse=True)"],
        indent: "choose",
        tests: [{ output: "[55, 90, 72]\n[90, 72, 55]" }],
        hints: [
          md`The function comes first. It has one line inside it.`,
          md`The function must return a new list, not the None from the sort method.`,
          md`Make the marks, call the function and store its answer, then print both lists.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the merit list crashes",
        task: md`
          The user types marks, then one late mark. The program makes a merit list, highest first, then adds the late mark at the end. The original list must not change. For «55 90 72» and «60» it should show:

          | Merit list: [90, 72, 55, 60]
          | Original: [55, 90, 72]

          It stops with «AttributeError» instead. Step through is off. Read the message and fix the one wrong line.
        `,
        starter: py`
          def ranked(marks):
              new_list = marks.copy()
              return new_list.sort(reverse=True)

          marks = [int(x) for x in input("Marks: ").split()]
          merit = ranked(marks)
          merit.append(int(input("Late mark: ")))
          print("Merit list:", merit)
          print("Original:", marks)
        `,
        bugLines: [3],
        solution: py`
          def ranked(marks):
              new_list = marks.copy()
              return sorted(new_list, reverse=True)

          marks = [int(x) for x in input("Marks: ").split()]
          merit = ranked(marks)
          merit.append(int(input("Late mark: ")))
          print("Merit list:", merit)
          print("Original:", marks)
        `,
        tests: [
          { inputs: ["55 90 72", "60"], output: "Merit list: [90, 72, 55, 60]\nOriginal: [55, 90, 72]" },
          { inputs: ["40", "40"], output: "Merit list: [40, 40]\nOriginal: [40]" },
          { inputs: ["", "33"], output: "Merit list: [33]\nOriginal: []" },
          { inputs: ["10 30 20", "5"], py: py`
            assert marks == [10, 30, 20], f"The original marks changed to {marks}. The function must leave them as they were."
            assert merit == [30, 20, 10, 5], f"The merit list is {merit}. It should be highest first, then the late mark."
          ` },
        ],
        wrong: [py`
          def ranked(marks):
              new_list = marks.copy()
              return marks.sort(reverse=True)

          marks = [int(x) for x in input("Marks: ").split()]
          merit = ranked(marks)
          merit.append(int(input("Late mark: ")))
          print("Merit list:", merit)
          print("Original:", marks)
        `, py`
          def ranked(marks):
              new_list = marks
              new_list.sort(reverse=True)
              return new_list

          marks = [int(x) for x in input("Marks: ").split()]
          merit = ranked(marks)
          merit.append(int(input("Late mark: ")))
          print("Merit list:", merit)
          print("Original:", marks)
        `],
        hints: [
          md`The message says None has no append. Find the call whose answer was None.`,
          md`The function returns whatever the sort method gives back. Look at line 3.`,
          md`Return a new sorted list, highest first, made by the sorted function.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: grace marks without harm", optional: true,
        task: md`
          This function adds 2 grace marks by changing the list in place. Change it so it returns a **new** list and leaves the original alone. Then the program can show both. For «30 50» it shows:

          | Before: [30, 50]
          | With grace: [32, 52]
        `,
        starter: py`
          def add_grace(marks):
              for i in range(len(marks)):
                  marks[i] = marks[i] + 2

          marks = [int(x) for x in input("Marks: ").split()]
          add_grace(marks)
          print("With grace:", marks)
        `,
        solution: py`
          def add_grace(marks):
              return [m + 2 for m in marks]

          marks = [int(x) for x in input("Marks: ").split()]
          new_marks = add_grace(marks)
          print("Before:", marks)
          print("With grace:", new_marks)
        `,
        tests: [
          { inputs: ["30 50"], output: "Before: [30, 50]\nWith grace: [32, 52]" },
          { inputs: ["98"], output: "Before: [98]\nWith grace: [100]" },
          { inputs: [""], output: "Before: []\nWith grace: []" },
          { inputs: ["1"], py: py`
            original = [10, 20]
            result = call("add_grace", original)
            assert result == [12, 22], f"add_grace([10, 20]) gave {result}. It should give [12, 22]."
            assert original == [10, 20], f"After the call, the list given in became {original}. It should stay [10, 20]."
          ` },
        ],
        wrong: [py`
          def add_grace(marks):
              for i in range(len(marks)):
                  marks[i] = marks[i] + 2
              return marks

          marks = [int(x) for x in input("Marks: ").split()]
          new_marks = add_grace(marks)
          print("Before:", marks)
          print("With grace:", new_marks)
        `],
        hints: [
          md`The function must build a new list and give it back. The list it was given must not change.`,
          md`Replace the loop in the function with one return line. In the main program, store the answer under a new name.`,
          md`A list comprehension that adds 2 to each mark builds the new list in one line.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: restock without touching the old stock",
        task: md`
          Write a function «restock(stock, item, count)». It returns a **new** dictionary with «count» added to that item. An item that is not in the stock yet starts from 0. The dictionary given in must not change.

          The main program starts with «stock = {"chai": 10, "samosa": 4}». The user types an item, then a count. Print the old and new stock. For «chai» and «5» it shows:

          | Before: {'chai': 10, 'samosa': 4}
          | After: {'chai': 15, 'samosa': 4}
        `,
        starter: py`

        `,
        solution: py`
          def restock(stock, item, count):
              new_stock = stock.copy()
              new_stock[item] = new_stock.get(item, 0) + count
              return new_stock

          stock = {"chai": 10, "samosa": 4}
          item = input("Item: ")
          count = int(input("Count: "))
          after = restock(stock, item, count)
          print("Before:", stock)
          print("After:", after)
        `,
        tests: [
          { inputs: ["chai", "5"], output: "Before: {'chai': 10, 'samosa': 4}\nAfter: {'chai': 15, 'samosa': 4}" },
          { inputs: ["vada", "6"], output: "Before: {'chai': 10, 'samosa': 4}\nAfter: {'chai': 10, 'samosa': 4, 'vada': 6}" },
          { inputs: ["samosa", "0"], output: "Before: {'chai': 10, 'samosa': 4}\nAfter: {'chai': 10, 'samosa': 4}" },
          { inputs: ["chai", "1"], py: py`
            shop = {"tea": 2}
            result = call("restock", shop, "tea", 3)
            assert result == {"tea": 5}, f"restock({{'tea': 2}}, 'tea', 3) gave {result}. It should give {{'tea': 5}}."
            assert shop == {"tea": 2}, f"The dictionary given in changed to {shop}. Copy it first, then change the copy."
          ` },
        ],
        wrong: [py`
          def restock(stock, item, count):
              stock[item] = stock.get(item, 0) + count
              return stock

          stock = {"chai": 10, "samosa": 4}
          item = input("Item: ")
          count = int(input("Count: "))
          after = restock(stock, item, count)
          print("Before:", stock)
          print("After:", after)
        `, py`
          def restock(stock, item, count):
              new_stock = stock.copy()
              new_stock[item] = count
              return new_stock

          stock = {"chai": 10, "samosa": 4}
          item = input("Item: ")
          count = int(input("Count: "))
          after = restock(stock, item, count)
          print("Before:", stock)
          print("After:", after)
        `, py`
          def restock(stock, item, count):
              new_stock = stock.copy()
              new_stock[item] += count
              return new_stock

          stock = {"chai": 10, "samosa": 4}
          item = input("Item: ")
          count = int(input("Count: "))
          after = restock(stock, item, count)
          print("Before:", stock)
          print("After:", after)
        `],
        hints: [
          md`Plan: copy the dictionary, change only the copy, return the copy.`,
          md`For a missing item, use the get method with 0 as the default value, then add the count.`,
          md`In the main program, store what the function returns under a new name, then print both dictionaries.`,
        ],
      },
    ],
    keys: [
      md`A parameter is one more name for the same list or dictionary. A change **in place** shows in the caller.`,
      md`To keep the caller's data, copy it with «.copy()», change the copy, and return it.`,
      md`«.sort()» changes the list and gives back None. «sorted()» returns a new list.`,
      md`«AttributeError» with «NoneType» means you used the None that a call gave back.`,
      md`Never use «[]» as a default value: every call shares that one list.`,
    ],
  });

  // ---------------------------------------------------------------- Day 55
  day({
    slug: "start-from-empty-page",
    title: "Starting from an Empty Page",
    goal: "Use a fixed routine to turn a task into working code.",
    minutes: 45,
    kind: "lesson",
    needs: [7, 30, 34, 54],
    win: "Today you can now start any task from an empty page with a five-step plan, and build it one small, tested part at a time.",
    learn: [
      md`
        ## Steps 1 and 2: say it, then show it

        An empty editor is hard. A fixed **routine**, the same steps every time, makes it easy to start. Here is one plan from start to end. The task: a chai stall needs the bill for an order.

        **Step 1. Say the task in your words.** "The menu has prices. The order has items and counts. Add up price times count. An item not on the menu costs 0."

        **Step 2. Write example inputs and outputs.** Work them out by hand, before any code. With «menu = {"chai": 12, "samosa": 15}»:

        - order «{"chai": 2}» gives 24
        - order «{"chai": 2, "samosa": 1}» gives 39
        - order «{}» gives 0
        - order «{"lassi": 3}» gives 0, because lassi is not on the menu
      `,
      md`
        ## Steps 3 and 4: contracts and stubs

        **Step 3. Write each function's contract:** what goes in, and what comes out. **Step 4. List the functions as stubs.** A **stub** is a function with its name and parameters but no real body yet. Its body is the word «pass», which means "do nothing". Guess the output.
      `,
      ex(py`
        # price_of: in a menu and one item, out its price (0 if missing)
        def price_of(menu, item):
            pass

        # bill_total: in a menu and an order, out the bill in rupees
        def bill_total(menu, order):
            pass

        print(bill_total({"chai": 12}, {"chai": 2}))
      `, { predict: ["None", "24", "SyntaxError"], answer: 0 }),
      md`
        A stub returns None, but the program runs. Now the whole plan is on the page, and you fill one stub at a time.
      `,
      pause(md`Good place for a short break. Next: Step 5, building the smallest part first.`),
      md`
        ## Step 5: build the smallest part first

        Fill the smallest function first and test it with your Step 2 examples. Then build the next one on top of it. Guess the output.
      `,
      ex(py`
        # price_of: in a menu and one item, out its price (0 if missing)
        def price_of(menu, item):
            return menu.get(item, 0)

        # bill_total: in a menu and an order, out the bill in rupees
        def bill_total(menu, order):
            total = 0
            for item, count in order.items():
                total += price_of(menu, item) * count
            return total

        menu = {"chai": 12, "samosa": 15}
        assert price_of(menu, "chai") == 12
        assert price_of(menu, "lassi") == 0
        print(bill_total(menu, {"chai": 2, "samosa": 1}))
        print(bill_total(menu, {"lassi": 3}))
      `, { predict: ["39\n0", "39\nKeyError", "24\n0"], answer: 0 }),
      md`
        The asserts test «price_of» before «bill_total» uses it. «.get(item, 0)» gives 0 for lassi, so there is no KeyError. Each part is small, so a bug has few places to hide.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          def area(length, width):
              pass

          print(area(3, 4))
        `, options: ["None", "12", "SyntaxError"], answer: 0,
        explain: md`The stub does nothing and has no return, so it gives back None.`,
        why: [null, md`The body is only «pass». Nothing multiplies the numbers yet.`, md`«pass» is a full, correct body. The program runs.`],
        skill: "trace" },
      { q: md`You face an empty editor. What is the first step of the routine?`,
        options: ["Say the task in your own words", "Write the loop", "List the functions as stubs"], answer: 0,
        explain: md`If you cannot say the task simply, you cannot code it. Examples come next.`,
        why: [null, md`Code comes last, after the plan.`, md`Stubs are Step 4. You need contracts before you can write them.`],
        skill: "memory" },
      { q: md`What does this function do?`, code: py`
          def bill_total(menu, order):
              total = 0
              for item, count in order.items():
                  total += menu.get(item, 0) * count
              return total
        `, options: ["It returns price times count added up for each ordered item, with unknown items as 0", "It returns the number of items in the order", "It crashes for an item that is not on the menu"],
        answer: 0, verify: false, mono: false,
        explain: md`For each item and count, it adds price times count. «.get(item, 0)» gives 0 for a missing item.`,
        why: [null, md`It multiplies by prices, so the answer is in rupees, not a count of items.`, md`«.get()» with a default never gives KeyError.`],
        skill: "read" },
      { q: md`A contract says: in, a list of marks; out, how many marks are 33 or more. Which first line fits it?`,
        options: ["«def count_passed(marks):»", "«def count_passed():»", "«def count_passed(marks, count):»"], answer: 0,
        explain: md`One thing goes in, the list of marks. The count comes out with «return».`,
        why: [null, md`The marks must go in as a parameter.`, md`The count is what comes out. It is not given in.`],
        skill: "write" },
      { q: md`Ravi types a 60-line program and runs it once at the end. The bill is wrong. What would have helped most?`,
        options: ["Building and testing one small function at a time", "Typing the program faster", "Adding more comments at the end"], answer: 0,
        explain: md`Testing each small part as you build it finds a bug while it has few places to hide.`,
        why: [null, md`Speed does not find bugs.`, md`Comments help planning before the code. They do not test anything.`],
        skill: "debug" },
    ],
    practice: [
      {
        id: "p1", kind: "parsons", title: "Arrange: the five-step routine",
        task: md`Put the steps for starting from an empty page in the right order.`,
        solution: py`
          Say the task in your own words
          Write example inputs and the outputs you expect
          Write each function's contract: what goes in, what comes out
          List the functions as stubs with pass
          Build and test the smallest function first
        `,
        distractors: ["Type the whole program, then run it once at the end"],
        order: "fixed",
        hints: [
          md`Words come before any code, and examples come before contracts.`,
          md`You need to know what goes in and out before you can write the stubs.`,
          md`Filling in real code is always the last step.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: SSC score, with the full plan",
        task: md`
          The plan is done for you, in the editor as comments. Follow it step by step and write the code under it.

          In an SSC-style test, a right answer gives 2 marks and a wrong answer takes away 0.5. The user types the number right, the number wrong, then the cut-off. For «50», «10» and «90» it shows:

          | Score: 95.0
          | Qualified
        `,
        starter: py`
          # 1. In my words: score = 2 for each right, minus 0.5 for each wrong.
          #    Qualified if the score is at least the cut-off.
          # 2. Examples: 50 right, 10 wrong -> 95.0. With cut-off 90 -> Qualified.
          #    0 right, 0 wrong -> 0.0. 45 right, 0 wrong, cut-off 90 -> Qualified.
          # 3. Contracts:
          #    score(right, wrong): in two whole numbers, out the score
          #    verdict(points, cutoff): in the score and the cut-off,
          #    out "Qualified" or "Not qualified"
          # 4. Stubs: write both functions with pass.
          # 5. Fill score first and test it. Then verdict. Then the main program.
        `,
        solution: py`
          def score(right, wrong):
              return right * 2 - wrong * 0.5

          def verdict(points, cutoff):
              if points >= cutoff:
                  return "Qualified"
              return "Not qualified"

          right = int(input("Right: "))
          wrong = int(input("Wrong: "))
          cutoff = int(input("Cut-off: "))
          points = score(right, wrong)
          print("Score:", points)
          print(verdict(points, cutoff))
        `,
        tests: [
          { inputs: ["50", "10", "90"], output: "Score: 95.0\nQualified" },
          { inputs: ["0", "0", "0"], output: "Score: 0.0\nQualified" },
          { inputs: ["10", "4", "20"], output: "Score: 18.0\nNot qualified" },
          { inputs: ["45", "0", "90"], output: "Score: 90.0\nQualified" },
          { inputs: ["1", "1", "1"], py: py`
            expect("score", (50, 10), 95.0)
            expect("verdict", (90.0, 90), "Qualified")
            expect("verdict", (89.5, 90), "Not qualified")
          ` },
        ],
        wrong: [py`
          def score(right, wrong):
              return right * 2 - wrong * 0.5

          def verdict(points, cutoff):
              if points > cutoff:
                  return "Qualified"
              return "Not qualified"

          right = int(input("Right: "))
          wrong = int(input("Wrong: "))
          cutoff = int(input("Cut-off: "))
          points = score(right, wrong)
          print("Score:", points)
          print(verdict(points, cutoff))
        `, py`
          def score(right, wrong):
              return right * 2 - wrong * 0.25

          def verdict(points, cutoff):
              if points >= cutoff:
                  return "Qualified"
              return "Not qualified"

          right = int(input("Right: "))
          wrong = int(input("Wrong: "))
          cutoff = int(input("Cut-off: "))
          points = score(right, wrong)
          print("Score:", points)
          print(verdict(points, cutoff))
        `],
        hints: [
          md`Follow the comments in order. Write both stubs first and run: the program should run and show nothing wrong.`,
          md`Fill the score function with one return line. Check it against the Step 2 examples before you start the verdict.`,
          md`"At least the cut-off" means greater than or equal to. A score exactly on the cut-off qualifies.`,
        ],
      },
      {
        id: "k2", kind: "make", title: "Make: the most ordered item, headings only",
        task: md`
          Now only the plan headings are given. Fill in each step yourself, then write the code.

          The user types the orders of the day, one word each, with spaces between them. Count each item in a dictionary, then find the item ordered most. If two items tie, show the one that was ordered first. Use at least one function. For «chai samosa chai chai vada» it shows:

          | Orders: {'chai': 3, 'samosa': 1, 'vada': 1}
          | Most ordered: chai

          With no orders, it shows «Orders: {}» and «Most ordered: none».
        `,
        starter: py`
          # 1. In my words:
          # 2. Examples:
          # 3. Contracts:
          # 4. Stubs:
          # 5. Smallest part first:
        `,
        solution: py`
          # 1. In my words: count each word, then pick the biggest count.
          # 2. Examples: "chai vada chai" -> chai. "" -> none.
          # 3. Contracts:
          #    count_orders(words): in a list of words, out a dict of counts
          #    most_ordered(counts): in a dict of counts, out the top item or "none"
          def count_orders(words):
              counts = {}
              for w in words:
                  counts[w] = counts.get(w, 0) + 1
              return counts

          def most_ordered(counts):
              best = "none"
              best_count = 0
              for item, n in counts.items():
                  if n > best_count:
                      best = item
                      best_count = n
              return best

          counts = count_orders(input("Orders: ").split())
          print("Orders:", counts)
          print("Most ordered:", most_ordered(counts))
        `,
        tests: [
          { inputs: ["chai samosa chai chai vada"], output: "Orders: {'chai': 3, 'samosa': 1, 'vada': 1}\nMost ordered: chai" },
          { inputs: ["vada chai"], output: "Orders: {'vada': 1, 'chai': 1}\nMost ordered: vada" },
          { inputs: ["lassi"], output: "Orders: {'lassi': 1}\nMost ordered: lassi" },
          { inputs: [""], output: "Orders: {}\nMost ordered: none" },
          { inputs: ["chai samosa samosa"], output: "Orders: {'chai': 1, 'samosa': 2}\nMost ordered: samosa" },
          { uses: ["def"], msg: md`Put at least one part of the job in its own function, as your plan says.` },
        ],
        wrong: [py`
          def count_orders(words):
              counts = {}
              for w in words:
                  counts[w] = counts.get(w, 0) + 1
              return counts

          def most_ordered(counts):
              best = "none"
              best_count = 0
              for item, n in counts.items():
                  if n >= best_count:
                      best = item
                      best_count = n
              return best

          counts = count_orders(input("Orders: ").split())
          print("Orders:", counts)
          print("Most ordered:", most_ordered(counts))
        `, py`
          def count_orders(words):
              counts = {}
              for w in words:
                  counts[w] = counts.get(w, 0) + 1
              return counts

          def most_ordered(counts):
              best = None
              best_count = 0
              for item, n in counts.items():
                  if n > best_count:
                      best = item
                      best_count = n
              return best

          counts = count_orders(input("Orders: ").split())
          print("Orders:", counts)
          print("Most ordered:", most_ordered(counts))
        `],
        hints: [
          md`Fill the five headings first. Two jobs make two functions: one counts, one finds the biggest count.`,
          md`Build the counting function first and print its dictionary. Then build the best-so-far search over the dictionary's items.`,
          md`For a tie, keep the first item: only replace the best when a count is strictly bigger. Start the best as "none" with a count of 0.`,
        ],
      },
    ],
    keys: [
      md`**1.** Say the task in your words. **2.** Write example inputs and outputs by hand.`,
      md`**3.** Write each function's **contract**: what goes in, what comes out.`,
      md`**4.** List the functions as **stubs**. «pass» means "do nothing", so a stub runs and returns None.`,
      md`**5.** Build and test the smallest part first, then build on top of it.`,
    ],
  });

  // ---------------------------------------------------------------- Day 56
  day({
    slug: "chai-stall-machine",
    title: "Project: Chai Stall Machine",
    goal: "Build a chai stall that tracks stock and money and refuses impossible orders.",
    minutes: 45,
    kind: "project",
    needs: [30, 35, 54, 55],
    win: "Today you can now plan and build a whole program that changes its data, keeps its money right and refuses orders it cannot serve.",
    learn: [
      md`
        ## Two dictionaries and some functions

        There is no new lesson today. You build a chai stall machine with the tools of Days 30, 35, 54 and 55. The stall keeps two separate dictionaries: «prices» holds the rupees for each item, and «stock» holds how many are left.

        A function can change a dictionary that is given to it. The change is made **in place**, which means in the same dictionary the caller holds. Guess the output.
      `,
      ex(py`
        stock = {"chai": 3}

        def serve(stock, item, count):
            stock[item] -= count

        serve(stock, "chai", 2)
        print(stock)
      `, { predict: ["{'chai': 1}", "{'chai': 3}", "None"], answer: 0 }),
      md`
        «stock» inside the function and «stock» outside are two names for one dictionary (Day 54). So the cups taken inside the function are gone outside too.
      `,
      md`
        ## Money needs a return

        The cash is a number, not a dictionary. A number cannot be changed in place. Watch what happens when a function tries.
      `,
      ex(py`
        cash = 0

        def take_money(cash, amount):
            cash += amount

        take_money(cash, 24)
        print(cash)
      `, { predict: ["0", "24", "None"], answer: 0 }),
      md`
        The «cash» inside the function is a local name (Day 52). The «cash» outside stays 0. So today a function gives back the rupees with «return», and the main program adds them: «cash += bill(prices, item, count)».
      `,
      pause(md`Good place for a short break. The five stages come next.`),
      md`
        ## Five stages, less help each time

        Stage 1 gives you stubs to fill. Stages 2 to 4 give only a description. Stage 5 starts from an empty page, like Day 55. Each stage saves when you pass it, so you can stop after any stage.
      `,
      tip(md`Use the Day 55 routine in every stage: say the step in your words, work out one example by hand, then write and run the smallest part.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          stock = {"chai": 5}

          def serve(stock, item, count):
              new = stock.copy()
              new[item] -= count
              return new

          serve(stock, "chai", 2)
          print(stock)
        `, options: ["{'chai': 5}", "{'chai': 3}", "None"], answer: 0,
        explain: md`The function changes a copy and returns it, but the call never stores what comes back. The first dictionary still has 5.`,
        why: [null, md`Only the copy has 3. The copy is returned and then lost, because nothing keeps it.`, md`«print(stock)» shows the dictionary, which is still there. The returned copy is simply not used.`],
        skill: "trace" },
      { q: md`What does this function do?`, code: py`
          def can_serve(stock, item, count):
              if item in stock:
                  return stock[item] >= count
              return False
        `, options: ["It says True only if the stall sells the item and has at least that many left", "It takes the count away from the stock", "It crashes for an item the stall does not sell"],
        answer: 0, verify: false, mono: false,
        explain: md`It checks the key first. Then it compares what is left with the count. It changes nothing.`,
        why: [null, md`There is no «-=» or «=» on the dictionary, so nothing is taken away.`, md`The «in» check runs first. A missing item reaches «return False», with no KeyError.`],
        skill: "read" },
      { q: md`What does this show?`, code: py`
          stock = {"vada": 4}
          count = 4
          if stock["vada"] > count:
              print("Served")
          else:
              print("Sorry")
        `, options: ["Sorry", "Served", "KeyError"], answer: 0,
        explain: md`4 is not greater than 4, so the last 4 vadas are refused. The stall needs «>=» here.`,
        why: [null, md`«>» means strictly more. With exactly 4 left and 4 asked for, the condition is False.`, md`«"vada"» is a key in the dictionary, so there is no KeyError.`],
        skill: "trace" },
      { q: md`A customer types «sell lassi 1». The program stops with «KeyError: 'lassi'» on the line «if stock[item] >= count:». What is the best fix?`,
        options: ["Check «item in stock» before reading «stock[item]»", "Add lassi to the error message", "Change «>=» to «>»"], answer: 0,
        explain: md`«stock[item]» crashes for a missing key. Ask «item in stock» first, and refuse the order if it is False.`,
        why: [null, md`The message only reports the problem. The program still crashes.`, md`The crash comes from the missing key, not from the comparison.`],
        skill: "debug" },
      { q: md`Where should the stall keep its running total of cash?`,
        options: ["In a name in the main program, which adds the rupees each bill function returns", "In a local name inside the bill function", "In the stock dictionary"], answer: 0,
        explain: md`A number cannot be changed in place. The function returns the rupees and the main program adds them with «+=».`,
        why: [null, md`A local name is lost when the function ends, so the total would start at 0 every time.`, md`«stock» counts cups and plates. Mixing money into it makes every stock loop wrong.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "s1", stage: 1, title: "Stage 1: fill the stubs",
        task: md`
          The plan and two stubs are ready. Fill both stubs so they follow their contracts. Do not change the two dictionaries or the three test lines at the bottom. They show:

          | True
          | False
          | 45

          «can_serve» must not change the stock. For an item the stall does not sell, such as lassi, it gives False with no KeyError.
        `,
        starter: py`
          prices = {"chai": 12, "samosa": 15, "vada": 10}
          stock = {"chai": 20, "samosa": 10, "vada": 8}

          # can_serve: in the stock, an item and a count.
          # Out True if the stall sells the item and has at least count left.
          # It never changes the stock.
          def can_serve(stock, item, count):
              pass

          # bill: in the prices, an item and a count. Out the cost in rupees.
          def bill(prices, item, count):
              pass

          print(can_serve(stock, "chai", 2))
          print(can_serve(stock, "vada", 9))
          print(bill(prices, "samosa", 3))
        `,
        solution: py`
          prices = {"chai": 12, "samosa": 15, "vada": 10}
          stock = {"chai": 20, "samosa": 10, "vada": 8}

          # can_serve: in the stock, an item and a count.
          # Out True if the stall sells the item and has at least count left.
          # It never changes the stock.
          def can_serve(stock, item, count):
              if item in stock:
                  return stock[item] >= count
              return False

          # bill: in the prices, an item and a count. Out the cost in rupees.
          def bill(prices, item, count):
              return prices[item] * count

          print(can_serve(stock, "chai", 2))
          print(can_serve(stock, "vada", 9))
          print(bill(prices, "samosa", 3))
        `,
        tests: [
          { output: "True\nFalse\n45" },
          { py: py`expect("can_serve", ({"vada": 8}, "vada", 8), True)` },
          { py: py`expect("can_serve", ({"vada": 0}, "vada", 1), False)` },
          { py: py`expect("can_serve", ({"chai": 5}, "lassi", 1), False)` },
          { py: py`
            s = {"chai": 5, "vada": 2}
            call("can_serve", s, "chai", 3)
            assert s == {"chai": 5, "vada": 2}, "«can_serve» changed the stock. It should only look at the stock and answer True or False."
          ` },
          { py: py`
            expect("bill", ({"chai": 12}, "chai", 1), 12)
            expect("bill", ({"chai": 12, "vada": 10}, "vada", 5), 50)
            expect("bill", ({"chai": 12}, "chai", 0), 0)
          ` },
        ],
        wrong: [py`
          prices = {"chai": 12, "samosa": 15, "vada": 10}
          stock = {"chai": 20, "samosa": 10, "vada": 8}

          def can_serve(stock, item, count):
              if item in stock:
                  return stock[item] > count
              return False

          def bill(prices, item, count):
              return prices[item] * count

          print(can_serve(stock, "chai", 2))
          print(can_serve(stock, "vada", 9))
          print(bill(prices, "samosa", 3))
        `, py`
          prices = {"chai": 12, "samosa": 15, "vada": 10}
          stock = {"chai": 20, "samosa": 10, "vada": 8}

          def can_serve(stock, item, count):
              return stock[item] >= count

          def bill(prices, item, count):
              return prices[item] * count

          print(can_serve(stock, "chai", 2))
          print(can_serve(stock, "vada", 9))
          print(bill(prices, "samosa", 3))
        `, py`
          prices = {"chai": 12, "samosa": 15, "vada": 10}
          stock = {"chai": 20, "samosa": 10, "vada": 8}

          def can_serve(stock, item, count):
              if item in stock:
                  return stock[item] >= count
              return False

          def bill(prices, item, count):
              return prices[item] + count

          print(can_serve(stock, "chai", 2))
          print(can_serve(stock, "vada", 9))
          print(bill(prices, "samosa", 3))
        `],
        hints: [
          md`Fill one stub at a time, and run after each. «can_serve» answers a yes-or-no question. «bill» does one sum.`,
          md`In «can_serve», first ask whether the item is a key of the stock. Only then read how many are left. If it is not a key, give back False.`,
          md`"At least count left" means greater than or equal to. The bill is the item's price times the count.`,
        ],
      },
      {
        id: "s2", stage: 2, carry: "s1", title: "Stage 2: serve changes the stock",
        task: md`
          Add a third function under «bill». Its contract:

          - «serve(stock, item, count)»: in the stock, an item and a count. It takes count away from the stock **in place**. It gives nothing back.

          Then replace the three test lines at the bottom with these three lines, so the program shows the stock after two orders:

          : serve(stock, "chai", 2)
          : serve(stock, "vada", 8)
          : print(stock)

          | {'chai': 18, 'samosa': 10, 'vada': 0}
        `,
        starter: py`
          prices = {"chai": 12, "samosa": 15, "vada": 10}
          stock = {"chai": 20, "samosa": 10, "vada": 8}

          # can_serve: in the stock, an item and a count.
          # Out True if the stall sells the item and has at least count left.
          # It never changes the stock.
          def can_serve(stock, item, count):
              if item in stock:
                  return stock[item] >= count
              return False

          # bill: in the prices, an item and a count. Out the cost in rupees.
          def bill(prices, item, count):
              return prices[item] * count

          print(can_serve(stock, "chai", 2))
          print(can_serve(stock, "vada", 9))
          print(bill(prices, "samosa", 3))
        `,
        solution: py`
          prices = {"chai": 12, "samosa": 15, "vada": 10}
          stock = {"chai": 20, "samosa": 10, "vada": 8}

          # can_serve: in the stock, an item and a count.
          # Out True if the stall sells the item and has at least count left.
          # It never changes the stock.
          def can_serve(stock, item, count):
              if item in stock:
                  return stock[item] >= count
              return False

          # bill: in the prices, an item and a count. Out the cost in rupees.
          def bill(prices, item, count):
              return prices[item] * count

          # serve: in the stock, an item and a count.
          # Takes count away from the stock in place. Gives nothing back.
          def serve(stock, item, count):
              stock[item] -= count

          serve(stock, "chai", 2)
          serve(stock, "vada", 8)
          print(stock)
        `,
        tests: [
          { output: "{'chai': 18, 'samosa': 10, 'vada': 0}" },
          { py: py`
            s = {"chai": 5, "samosa": 2}
            call("serve", s, "chai", 5)
            assert s == {"chai": 0, "samosa": 2}, "After serving 5 chai from 5, the same stock dictionary should hold chai 0. Check that «serve» changes the dictionary it was given, not a copy."
          ` },
          { py: py`
            s = {"samosa": 10}
            call("serve", s, "samosa", 1)
            call("serve", s, "samosa", 3)
            assert s == {"samosa": 6}, "Serving 1 samosa and then 3 from 10 should leave 6. Check that «serve» takes away the count, and does not set the stock to the count."
          ` },
          { py: py`
            s = {"vada": 4}
            result = call("serve", s, "vada", 1)
            assert result is None, "«serve» should give nothing back. Its job is to change the stock in place."
          ` },
        ],
        wrong: [py`
          prices = {"chai": 12, "samosa": 15, "vada": 10}
          stock = {"chai": 20, "samosa": 10, "vada": 8}

          def can_serve(stock, item, count):
              if item in stock:
                  return stock[item] >= count
              return False

          def bill(prices, item, count):
              return prices[item] * count

          def serve(stock, item, count):
              new = stock.copy()
              new[item] -= count
              return new

          stock = serve(stock, "chai", 2)
          stock = serve(stock, "vada", 8)
          print(stock)
        `, py`
          prices = {"chai": 12, "samosa": 15, "vada": 10}
          stock = {"chai": 20, "samosa": 10, "vada": 8}

          def can_serve(stock, item, count):
              if item in stock:
                  return stock[item] >= count
              return False

          def bill(prices, item, count):
              return prices[item] * count

          def serve(stock, item, count):
              stock[item] = stock[item] - 1

          serve(stock, "chai", 2)
          serve(stock, "vada", 8)
          print(stock)
        `],
        hints: [
          md`The new function has one job: make the number under the item smaller by the count. The dictionary itself is changed, so nothing needs to come back.`,
          md`Put the new function under «bill», with its contract as a comment above it. The three old test lines at the bottom go, and the three new lines take their place.`,
          md`Inside the function, use the take-away-and-store operator on the stock value for that item. Do not make a copy, and do not return anything.`,
        ],
      },
      {
        id: "s3", stage: 3, carry: "s2", title: "Stage 3: the order loop",
        task: md`
          Now the stall takes orders. Replace the three lines at the bottom with a command loop (Day 35) and a cash total that starts at 0.

          - First show «Chai stall open».
          - «sell chai 2»: if «can_serve» says yes, call «serve», add the bill to the cash, and show «Sold 2 chai for 24 rupees».
          - Not enough left: show «Sorry, only 3 vada left». Not on the menu: show «We do not sell lassi». Nothing changes.
          - «close» stops the loop. Anything else shows «Commands: sell, close».
          - After the loop, show the cash.

          For «sell chai 2», «sell samosa 1», «close» it shows:

          | Chai stall open
          | Sold 2 chai for 24 rupees
          | Sold 1 samosa for 15 rupees
          | Cash: 39 rupees

          The tests type orders, then read your «stock» and «cash» names.
        `,
        starter: py`
          prices = {"chai": 12, "samosa": 15, "vada": 10}
          stock = {"chai": 20, "samosa": 10, "vada": 8}

          # can_serve: in the stock, an item and a count.
          # Out True if the stall sells the item and has at least count left.
          # It never changes the stock.
          def can_serve(stock, item, count):
              if item in stock:
                  return stock[item] >= count
              return False

          # bill: in the prices, an item and a count. Out the cost in rupees.
          def bill(prices, item, count):
              return prices[item] * count

          # serve: in the stock, an item and a count.
          # Takes count away from the stock in place. Gives nothing back.
          def serve(stock, item, count):
              stock[item] -= count

          serve(stock, "chai", 2)
          serve(stock, "vada", 8)
          print(stock)
        `,
        solution: py`
          prices = {"chai": 12, "samosa": 15, "vada": 10}
          stock = {"chai": 20, "samosa": 10, "vada": 8}

          # can_serve: in the stock, an item and a count.
          # Out True if the stall sells the item and has at least count left.
          # It never changes the stock.
          def can_serve(stock, item, count):
              if item in stock:
                  return stock[item] >= count
              return False

          # bill: in the prices, an item and a count. Out the cost in rupees.
          def bill(prices, item, count):
              return prices[item] * count

          # serve: in the stock, an item and a count.
          # Takes count away from the stock in place. Gives nothing back.
          def serve(stock, item, count):
              stock[item] -= count

          cash = 0
          print("Chai stall open")
          while True:
              parts = input("> ").split()
              if not parts:
                  continue
              if parts[0] == "close":
                  break
              elif parts[0] == "sell" and len(parts) == 3:
                  item = parts[1]
                  count = int(parts[2])
                  if can_serve(stock, item, count):
                      serve(stock, item, count)
                      cost = bill(prices, item, count)
                      cash += cost
                      print(f"Sold {count} {item} for {cost} rupees")
                  elif item in stock:
                      print(f"Sorry, only {stock[item]} {item} left")
                  else:
                      print("We do not sell", item)
              else:
                  print("Commands: sell, close")
          print(f"Cash: {cash} rupees")
        `,
        tests: [
          { inputs: ["sell chai 2", "sell samosa 1", "close"],
            output: "Chai stall open\nSold 2 chai for 24 rupees\nSold 1 samosa for 15 rupees\nCash: 39 rupees" },
          { inputs: ["sell chai 2", "sell samosa 1", "close"],
            py: py`
              assert cash == 39, f"After 2 chai and 1 samosa, «cash» should be 39, but it is {cash!r}. Check that you add the bill, which is price times count."
              assert stock == {"chai": 18, "samosa": 9, "vada": 8}, f"After 2 chai and 1 samosa, «stock» should be chai 18, samosa 9, vada 8, but it is {stock!r}."
            ` },
          { inputs: ["sell vada 8", "sell vada 1", "close"],
            output: "Chai stall open\nSold 8 vada for 80 rupees\nSorry, only 0 vada left\nCash: 80 rupees" },
          { inputs: ["sell samosa 11", "close"],
            py: py`
              assert "Sorry, only 10 samosa left" in OUTPUT, "Asking for 11 samosas when 10 are left should show: Sorry, only 10 samosa left"
              assert stock["samosa"] == 10, f"A refused order must not change the stock. Samosa should still be 10, but it is {stock['samosa']!r}. Call «serve» only when «can_serve» says yes."
              assert cash == 0, f"A refused order must not take money. «cash» should be 0, but it is {cash!r}."
            ` },
          { inputs: ["sell lassi 1", "hello", "close"],
            output: "Chai stall open\nWe do not sell lassi\nCommands: sell, close\nCash: 0 rupees" },
          { inputs: ["close"], output: "Chai stall open\nCash: 0 rupees" },
        ],
        wrong: [py`
          prices = {"chai": 12, "samosa": 15, "vada": 10}
          stock = {"chai": 20, "samosa": 10, "vada": 8}

          def can_serve(stock, item, count):
              if item in stock:
                  return stock[item] >= count
              return False

          def bill(prices, item, count):
              return prices[item] * count

          def serve(stock, item, count):
              stock[item] -= count

          cash = 0
          print("Chai stall open")
          while True:
              parts = input("> ").split()
              if not parts:
                  continue
              if parts[0] == "close":
                  break
              elif parts[0] == "sell" and len(parts) == 3:
                  item = parts[1]
                  count = int(parts[2])
                  if can_serve(stock, item, count):
                      serve(stock, item, count)
                      cash += prices[item]
                      print(f"Sold {count} {item} for {bill(prices, item, count)} rupees")
                  elif item in stock:
                      print(f"Sorry, only {stock[item]} {item} left")
                  else:
                      print("We do not sell", item)
              else:
                  print("Commands: sell, close")
          print(f"Cash: {cash} rupees")
        `, py`
          prices = {"chai": 12, "samosa": 15, "vada": 10}
          stock = {"chai": 20, "samosa": 10, "vada": 8}

          def can_serve(stock, item, count):
              if item in stock:
                  return stock[item] >= count
              return False

          def bill(prices, item, count):
              return prices[item] * count

          def serve(stock, item, count):
              stock[item] -= count

          cash = 0
          print("Chai stall open")
          while True:
              parts = input("> ").split()
              if not parts:
                  continue
              if parts[0] == "close":
                  break
              elif parts[0] == "sell" and len(parts) == 3:
                  item = parts[1]
                  count = int(parts[2])
                  if item in stock:
                      serve(stock, item, count)
                      cost = bill(prices, item, count)
                      cash += cost
                      print(f"Sold {count} {item} for {cost} rupees")
                  else:
                      print("We do not sell", item)
              else:
                  print("Commands: sell, close")
          print(f"Cash: {cash} rupees")
        `, py`
          prices = {"chai": 12, "samosa": 15, "vada": 10}
          stock = {"chai": 20, "samosa": 10, "vada": 8}

          def can_serve(stock, item, count):
              if item in stock:
                  return stock[item] >= count
              return False

          def bill(prices, item, count):
              return prices[item] * count

          def serve(stock, item, count):
              stock[item] -= count

          def take_money(cash, amount):
              cash += amount

          cash = 0
          print("Chai stall open")
          while True:
              parts = input("> ").split()
              if not parts:
                  continue
              if parts[0] == "close":
                  break
              elif parts[0] == "sell" and len(parts) == 3:
                  item = parts[1]
                  count = int(parts[2])
                  if can_serve(stock, item, count):
                      serve(stock, item, count)
                      cost = bill(prices, item, count)
                      take_money(cash, cost)
                      print(f"Sold {count} {item} for {cost} rupees")
                  elif item in stock:
                      print(f"Sorry, only {stock[item]} {item} left")
                  else:
                      print("We do not sell", item)
              else:
                  print("Commands: sell, close")
          print(f"Cash: {cash} rupees")
        `],
        hints: [
          md`Plan the loop first: read a line, split it, look at the first word. Then plan the three answers to a sell order: served, not enough, not on the menu.`,
          md`The cash name starts at 0 above the loop. The sell part asks «can_serve» first. Only on a yes does it call «serve» and add the bill. The cash line goes after the loop, with no indent.`,
          md`The count arrives as text, so change it into a whole number. Add the returned bill to the cash with the add-and-store operator in the main program, not inside a function.`,
        ],
      },
      {
        id: "s4", stage: 4, carry: "s3", noStep: true, title: "Stage 4: refuse a bad count",
        task: md`
          Right now «sell chai two» crashes the stall, and «sell chai 0» sells nothing for 0 rupees. Add a function under «serve»:

          - «read_count(text)»: in the text the customer typed. Out the whole number, or None if the text is not a whole number above 0.

          In the sell part, use «read_count» instead of «int()». If it gives None, show «Count must be a whole number above 0» and change nothing. Check the count before anything else. For «sell chai two», «sell chai 0», «sell chai 1», «close» it shows:

          | Chai stall open
          | Count must be a whole number above 0
          | Count must be a whole number above 0
          | Sold 1 chai for 12 rupees
          | Cash: 12 rupees
        `,
        starter: py`
          prices = {"chai": 12, "samosa": 15, "vada": 10}
          stock = {"chai": 20, "samosa": 10, "vada": 8}

          # can_serve: in the stock, an item and a count.
          # Out True if the stall sells the item and has at least count left.
          # It never changes the stock.
          def can_serve(stock, item, count):
              if item in stock:
                  return stock[item] >= count
              return False

          # bill: in the prices, an item and a count. Out the cost in rupees.
          def bill(prices, item, count):
              return prices[item] * count

          # serve: in the stock, an item and a count.
          # Takes count away from the stock in place. Gives nothing back.
          def serve(stock, item, count):
              stock[item] -= count

          cash = 0
          print("Chai stall open")
          while True:
              parts = input("> ").split()
              if not parts:
                  continue
              if parts[0] == "close":
                  break
              elif parts[0] == "sell" and len(parts) == 3:
                  item = parts[1]
                  count = int(parts[2])
                  if can_serve(stock, item, count):
                      serve(stock, item, count)
                      cost = bill(prices, item, count)
                      cash += cost
                      print(f"Sold {count} {item} for {cost} rupees")
                  elif item in stock:
                      print(f"Sorry, only {stock[item]} {item} left")
                  else:
                      print("We do not sell", item)
              else:
                  print("Commands: sell, close")
          print(f"Cash: {cash} rupees")
        `,
        solution: py`
          prices = {"chai": 12, "samosa": 15, "vada": 10}
          stock = {"chai": 20, "samosa": 10, "vada": 8}

          # can_serve: in the stock, an item and a count.
          # Out True if the stall sells the item and has at least count left.
          # It never changes the stock.
          def can_serve(stock, item, count):
              if item in stock:
                  return stock[item] >= count
              return False

          # bill: in the prices, an item and a count. Out the cost in rupees.
          def bill(prices, item, count):
              return prices[item] * count

          # serve: in the stock, an item and a count.
          # Takes count away from the stock in place. Gives nothing back.
          def serve(stock, item, count):
              stock[item] -= count

          # read_count: in the typed text. Out a whole number above 0, or None.
          def read_count(text):
              try:
                  count = int(text)
              except ValueError:
                  return None
              if count < 1:
                  return None
              return count

          cash = 0
          print("Chai stall open")
          while True:
              parts = input("> ").split()
              if not parts:
                  continue
              if parts[0] == "close":
                  break
              elif parts[0] == "sell" and len(parts) == 3:
                  item = parts[1]
                  count = read_count(parts[2])
                  if count is None:
                      print("Count must be a whole number above 0")
                  elif can_serve(stock, item, count):
                      serve(stock, item, count)
                      cost = bill(prices, item, count)
                      cash += cost
                      print(f"Sold {count} {item} for {cost} rupees")
                  elif item in stock:
                      print(f"Sorry, only {stock[item]} {item} left")
                  else:
                      print("We do not sell", item)
              else:
                  print("Commands: sell, close")
          print(f"Cash: {cash} rupees")
        `,
        tests: [
          { inputs: ["sell chai two", "sell chai 0", "sell chai 1", "close"],
            output: "Chai stall open\nCount must be a whole number above 0\nCount must be a whole number above 0\nSold 1 chai for 12 rupees\nCash: 12 rupees" },
          { inputs: ["sell samosa -3", "close"],
            py: py`
              assert "Count must be a whole number above 0" in OUTPUT, "«sell samosa -3» should show: Count must be a whole number above 0"
              assert stock["samosa"] == 10 and cash == 0, f"A minus count must change nothing. Samosa should stay 10 and cash 0, but they are {stock['samosa']!r} and {cash!r}. A minus sale would add samosas and take money away."
            ` },
          { inputs: ["sell vada 2.5", "sell vada 8", "sell vada 1", "close"],
            output: "Chai stall open\nCount must be a whole number above 0\nSold 8 vada for 80 rupees\nSorry, only 0 vada left\nCash: 80 rupees" },
          { inputs: ["sell lassi 1", "sell lassi x", "close"],
            output: "Chai stall open\nWe do not sell lassi\nCount must be a whole number above 0\nCash: 0 rupees" },
          { py: py`
            expect("read_count", ("5",), 5)
            expect("read_count", ("1",), 1)
            expect("read_count", ("0",), None)
            expect("read_count", ("five",), None)
          ` , inputs: ["close"] },
        ],
        wrong: [py`
          prices = {"chai": 12, "samosa": 15, "vada": 10}
          stock = {"chai": 20, "samosa": 10, "vada": 8}

          def can_serve(stock, item, count):
              if item in stock:
                  return stock[item] >= count
              return False

          def bill(prices, item, count):
              return prices[item] * count

          def serve(stock, item, count):
              stock[item] -= count

          def read_count(text):
              try:
                  count = int(text)
              except ValueError:
                  return None
              if count < 0:
                  return None
              return count

          cash = 0
          print("Chai stall open")
          while True:
              parts = input("> ").split()
              if not parts:
                  continue
              if parts[0] == "close":
                  break
              elif parts[0] == "sell" and len(parts) == 3:
                  item = parts[1]
                  count = read_count(parts[2])
                  if count is None:
                      print("Count must be a whole number above 0")
                  elif can_serve(stock, item, count):
                      serve(stock, item, count)
                      cost = bill(prices, item, count)
                      cash += cost
                      print(f"Sold {count} {item} for {cost} rupees")
                  elif item in stock:
                      print(f"Sorry, only {stock[item]} {item} left")
                  else:
                      print("We do not sell", item)
              else:
                  print("Commands: sell, close")
          print(f"Cash: {cash} rupees")
        `, py`
          prices = {"chai": 12, "samosa": 15, "vada": 10}
          stock = {"chai": 20, "samosa": 10, "vada": 8}

          def can_serve(stock, item, count):
              if item in stock:
                  return stock[item] >= count
              return False

          def bill(prices, item, count):
              return prices[item] * count

          def serve(stock, item, count):
              stock[item] -= count

          def read_count(text):
              count = int(text)
              if count < 1:
                  return None
              return count

          cash = 0
          print("Chai stall open")
          while True:
              parts = input("> ").split()
              if not parts:
                  continue
              if parts[0] == "close":
                  break
              elif parts[0] == "sell" and len(parts) == 3:
                  item = parts[1]
                  count = read_count(parts[2])
                  if count is None:
                      print("Count must be a whole number above 0")
                  elif can_serve(stock, item, count):
                      serve(stock, item, count)
                      cost = bill(prices, item, count)
                      cash += cost
                      print(f"Sold {count} {item} for {cost} rupees")
                  elif item in stock:
                      print(f"Sorry, only {stock[item]} {item} left")
                  else:
                      print("We do not sell", item)
              else:
                  print("Commands: sell, close")
          print(f"Cash: {cash} rupees")
        `],
        hints: [
          md`Two kinds of bad count need refusing: words that are not numbers, and numbers below 1. The new function catches both and gives back None for each.`,
          md`Inside the new function, try the change into a whole number and catch the ValueError (Day 36). In the sell part, the None check is the first branch, before «can_serve».`,
          md`"Above 0" means a count less than 1 gives None. Test the result with the «is None» check, then let the old branches run on the good count.`,
        ],
      },
      {
        id: "s5", stage: 5, kind: "make", noStep: true, title: "Stage 5: a juice stall from an empty page",
        task: md`
          Now build a smaller stall alone, from an empty page, with the Day 55 routine. Write the plan as comments first.

          The juice stall has two dictionaries: prices «{"mango": 40, "orange": 30}» and stock «{"mango": 5, "orange": 6}». Write the functions «can_serve», «bill» and «serve» with the same contracts as before. Keep the cash in a name called «cash». Commands come one per line. Every count the tests type is a whole number above 0.

          - «sell mango 2» shows «Sold 2 mango for 80 rupees».
          - Refuse with «Sorry, only 1 mango left» or «We do not sell tea».
          - «close» stops. Anything else shows «Commands: sell, close».
          - After the loop, show the cash, then the stock left.

          For «sell mango 2», «sell orange 7», «close» it shows:

          | Sold 2 mango for 80 rupees
          | Sorry, only 6 orange left
          | Cash: 80 rupees
          | Left: {'mango': 3, 'orange': 6}
        `,
        starter: py`

        `,
        solution: py`
          # 1. Read sell orders until close. Refuse what I cannot serve.
          # 2. sell mango 2 -> Sold 2 mango for 80 rupees. sell tea 1 -> refused.
          # 3. can_serve(stock, item, count) -> True or False
          #    bill(prices, item, count) -> rupees
          #    serve(stock, item, count) -> changes stock, gives nothing back
          prices = {"mango": 40, "orange": 30}
          stock = {"mango": 5, "orange": 6}

          def can_serve(stock, item, count):
              if item in stock:
                  return stock[item] >= count
              return False

          def bill(prices, item, count):
              return prices[item] * count

          def serve(stock, item, count):
              stock[item] -= count

          cash = 0
          while True:
              parts = input("> ").split()
              if not parts:
                  continue
              if parts[0] == "close":
                  break
              elif parts[0] == "sell" and len(parts) == 3:
                  item = parts[1]
                  count = int(parts[2])
                  if can_serve(stock, item, count):
                      serve(stock, item, count)
                      cost = bill(prices, item, count)
                      cash += cost
                      print(f"Sold {count} {item} for {cost} rupees")
                  elif item in stock:
                      print(f"Sorry, only {stock[item]} {item} left")
                  else:
                      print("We do not sell", item)
              else:
                  print("Commands: sell, close")
          print(f"Cash: {cash} rupees")
          print("Left:", stock)
        `,
        tests: [
          { inputs: ["sell mango 2", "sell orange 7", "close"],
            output: "Sold 2 mango for 80 rupees\nSorry, only 6 orange left\nCash: 80 rupees\nLeft: {'mango': 3, 'orange': 6}" },
          { inputs: ["sell mango 5", "sell mango 1", "sell orange 6", "close"],
            output: "Sold 5 mango for 200 rupees\nSorry, only 0 mango left\nSold 6 orange for 180 rupees\nCash: 380 rupees\nLeft: {'mango': 0, 'orange': 0}" },
          { inputs: ["sell tea 1", "buy mango 1", "close"],
            output: "We do not sell tea\nCommands: sell, close\nCash: 0 rupees\nLeft: {'mango': 5, 'orange': 6}" },
          { inputs: ["close"],
            py: py`
              assert cash == 0, f"With no orders, «cash» should be 0, but it is {cash!r}."
              expect("can_serve", ({"mango": 2}, "mango", 2), True)
              expect("can_serve", ({"mango": 2}, "tea", 1), False)
              expect("bill", ({"orange": 30}, "orange", 3), 90)
              s = {"orange": 6}
              call("serve", s, "orange", 4)
              assert s == {"orange": 2}, "«serve» should take the count away from the dictionary it was given. Serving 4 from 6 oranges should leave 2."
            ` },
          { inputs: ["sell orange 1", "sell orange 2", "close"],
            py: py`
              assert cash == 90, f"After 1 and then 2 oranges, «cash» should be 90, but it is {cash!r}."
              assert stock == {"mango": 5, "orange": 3}, f"After 3 oranges, «stock» should be mango 5, orange 3, but it is {stock!r}."
            ` },
        ],
        wrong: [py`
          prices = {"mango": 40, "orange": 30}
          stock = {"mango": 5, "orange": 6}

          def can_serve(stock, item, count):
              if item in stock:
                  return stock[item] > count
              return False

          def bill(prices, item, count):
              return prices[item] * count

          def serve(stock, item, count):
              stock[item] -= count

          cash = 0
          while True:
              parts = input("> ").split()
              if not parts:
                  continue
              if parts[0] == "close":
                  break
              elif parts[0] == "sell" and len(parts) == 3:
                  item = parts[1]
                  count = int(parts[2])
                  if can_serve(stock, item, count):
                      serve(stock, item, count)
                      cost = bill(prices, item, count)
                      cash += cost
                      print(f"Sold {count} {item} for {cost} rupees")
                  elif item in stock:
                      print(f"Sorry, only {stock[item]} {item} left")
                  else:
                      print("We do not sell", item)
              else:
                  print("Commands: sell, close")
          print(f"Cash: {cash} rupees")
          print("Left:", stock)
        `, py`
          prices = {"mango": 40, "orange": 30}
          stock = {"mango": 5, "orange": 6}

          def can_serve(stock, item, count):
              if item in stock:
                  return stock[item] >= count
              return False

          def bill(prices, item, count):
              return prices[item] * count

          def serve(stock, item, count):
              new = stock.copy()
              new[item] -= count
              return new

          cash = 0
          while True:
              parts = input("> ").split()
              if not parts:
                  continue
              if parts[0] == "close":
                  break
              elif parts[0] == "sell" and len(parts) == 3:
                  item = parts[1]
                  count = int(parts[2])
                  if can_serve(stock, item, count):
                      serve(stock, item, count)
                      cost = bill(prices, item, count)
                      cash += cost
                      print(f"Sold {count} {item} for {cost} rupees")
                  elif item in stock:
                      print(f"Sorry, only {stock[item]} {item} left")
                  else:
                      print("We do not sell", item)
              else:
                  print("Commands: sell, close")
          print(f"Cash: {cash} rupees")
          print("Left:", stock)
        `],
        hints: [
          md`Start with the five Day 55 steps as comments. The three functions are the same jobs as in Stages 1 and 2, only the dictionaries are new.`,
          md`Build and run the functions first, with one test line each. Then write the command loop under them, and the two closing lines after it with no indent.`,
          md`Check the boundaries by hand: selling exactly what is left must work, and one more must be refused with the number left. The stock line uses print with a label and the dictionary.`,
        ],
      },
      {
        id: "twist", kind: "modify", carry: "s4", optional: true, noStep: true, title: "Own Twist: a new drink",
        task: md`
          Make the chai stall your own. Add a new drink, «lassi», at 25 rupees, with 6 glasses in stock. Remember that prices and stock are two separate dictionaries, so it goes in both.

          After that, «sell lassi 2» shows «Sold 2 lassi for 50 rupees». You may add more of your own, such as a «stock» command. The tests check lassi and all the old orders, so your extra ideas are safe.
        `,
        starter: py`
          prices = {"chai": 12, "samosa": 15, "vada": 10}
          stock = {"chai": 20, "samosa": 10, "vada": 8}

          # can_serve: in the stock, an item and a count.
          # Out True if the stall sells the item and has at least count left.
          # It never changes the stock.
          def can_serve(stock, item, count):
              if item in stock:
                  return stock[item] >= count
              return False

          # bill: in the prices, an item and a count. Out the cost in rupees.
          def bill(prices, item, count):
              return prices[item] * count

          # serve: in the stock, an item and a count.
          # Takes count away from the stock in place. Gives nothing back.
          def serve(stock, item, count):
              stock[item] -= count

          # read_count: in the typed text. Out a whole number above 0, or None.
          def read_count(text):
              try:
                  count = int(text)
              except ValueError:
                  return None
              if count < 1:
                  return None
              return count

          cash = 0
          print("Chai stall open")
          while True:
              parts = input("> ").split()
              if not parts:
                  continue
              if parts[0] == "close":
                  break
              elif parts[0] == "sell" and len(parts) == 3:
                  item = parts[1]
                  count = read_count(parts[2])
                  if count is None:
                      print("Count must be a whole number above 0")
                  elif can_serve(stock, item, count):
                      serve(stock, item, count)
                      cost = bill(prices, item, count)
                      cash += cost
                      print(f"Sold {count} {item} for {cost} rupees")
                  elif item in stock:
                      print(f"Sorry, only {stock[item]} {item} left")
                  else:
                      print("We do not sell", item)
              else:
                  print("Commands: sell, close")
          print(f"Cash: {cash} rupees")
        `,
        solution: py`
          prices = {"chai": 12, "samosa": 15, "vada": 10, "lassi": 25}
          stock = {"chai": 20, "samosa": 10, "vada": 8, "lassi": 6}

          # can_serve: in the stock, an item and a count.
          # Out True if the stall sells the item and has at least count left.
          # It never changes the stock.
          def can_serve(stock, item, count):
              if item in stock:
                  return stock[item] >= count
              return False

          # bill: in the prices, an item and a count. Out the cost in rupees.
          def bill(prices, item, count):
              return prices[item] * count

          # serve: in the stock, an item and a count.
          # Takes count away from the stock in place. Gives nothing back.
          def serve(stock, item, count):
              stock[item] -= count

          # read_count: in the typed text. Out a whole number above 0, or None.
          def read_count(text):
              try:
                  count = int(text)
              except ValueError:
                  return None
              if count < 1:
                  return None
              return count

          cash = 0
          print("Chai stall open")
          while True:
              parts = input("> ").split()
              if not parts:
                  continue
              if parts[0] == "close":
                  break
              elif parts[0] == "sell" and len(parts) == 3:
                  item = parts[1]
                  count = read_count(parts[2])
                  if count is None:
                      print("Count must be a whole number above 0")
                  elif can_serve(stock, item, count):
                      serve(stock, item, count)
                      cost = bill(prices, item, count)
                      cash += cost
                      print(f"Sold {count} {item} for {cost} rupees")
                  elif item in stock:
                      print(f"Sorry, only {stock[item]} {item} left")
                  else:
                      print("We do not sell", item)
              else:
                  print("Commands: sell, close")
          print(f"Cash: {cash} rupees")
        `,
        tests: [
          { inputs: ["sell lassi 2", "close"],
            contains: ["Sold 2 lassi for 50 rupees", "Cash: 50 rupees"] },
          { inputs: ["sell lassi 6", "sell lassi 1", "close"],
            contains: ["Sold 6 lassi for 150 rupees", "Sorry, only 0 lassi left", "Cash: 150 rupees"] },
          { inputs: ["sell chai 2", "sell samosa 1", "close"],
            contains: ["Sold 2 chai for 24 rupees", "Sold 1 samosa for 15 rupees", "Cash: 39 rupees"] },
          { inputs: ["sell tea 1", "sell chai 0", "close"],
            contains: ["We do not sell tea", "Count must be a whole number above 0", "Cash: 0 rupees"] },
        ],
        wrong: [py`
          prices = {"chai": 12, "samosa": 15, "vada": 10, "lassi": 25}
          stock = {"chai": 20, "samosa": 10, "vada": 8}

          def can_serve(stock, item, count):
              if item in stock:
                  return stock[item] >= count
              return False

          def bill(prices, item, count):
              return prices[item] * count

          def serve(stock, item, count):
              stock[item] -= count

          def read_count(text):
              try:
                  count = int(text)
              except ValueError:
                  return None
              if count < 1:
                  return None
              return count

          cash = 0
          print("Chai stall open")
          while True:
              parts = input("> ").split()
              if not parts:
                  continue
              if parts[0] == "close":
                  break
              elif parts[0] == "sell" and len(parts) == 3:
                  item = parts[1]
                  count = read_count(parts[2])
                  if count is None:
                      print("Count must be a whole number above 0")
                  elif can_serve(stock, item, count):
                      serve(stock, item, count)
                      cost = bill(prices, item, count)
                      cash += cost
                      print(f"Sold {count} {item} for {cost} rupees")
                  elif item in stock:
                      print(f"Sorry, only {stock[item]} {item} left")
                  else:
                      print("We do not sell", item)
              else:
                  print("Commands: sell, close")
          print(f"Cash: {cash} rupees")
        `],
        hints: [
          md`A new drink needs a price and a stock. The functions and the loop already work for any item in the dictionaries.`,
          md`Change only the two dictionary lines at the top. Add one new key and value to each.`,
          md`If the stall says it does not sell lassi, the lassi is missing from the stock dictionary, which «can_serve» checks.`,
        ],
      },
    ],
    keys: [
      md`A function that is given a dictionary can change it **in place**. The caller sees the change.`,
      md`A number cannot be changed in place. Return it, and add it in the main program.`,
      md`Check before you change: ask «item in stock» and whether enough is left, then serve.`,
      md`Plan from an empty page with the Day 55 routine, and build the smallest function first.`,
    ],
  });
})();
