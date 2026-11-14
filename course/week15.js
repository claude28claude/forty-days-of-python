// Week 15 — Speed, then your own program: recursion, counting steps, an optional chart taster,
// the three-day SSC Study Buddy capstone, and the final exam.
(function () {
  const { day, md, py, ex, code, tip, warn, ask, pause } = window.Course;

  // ---------------------------------------------------------------- Day 99
  day({
    slug: "function-calls-itself",
    title: "A Function That Calls Itself",
    goal: "Write a function that solves a problem by calling itself on a smaller one, and stop it safely.",
    minutes: 45,
    needs: [32, 45],
    win: "Today you can now write a recursive function with a base case, and trace its calls as stacked boxes.",
    learn: [
      md`
        ## A function that calls itself

        A function can call **itself**. This is called **recursion**. Each call works on a smaller problem, until the problem is so small that the answer is known at once. That smallest case is the **base case**. Guess the output.
      `,
      ex(py`
        def countdown(n):
            if n == 0:
                print("Liftoff!")
                return
            print(n)
            countdown(n - 1)

        countdown(3)
      `, { predict: ["3\n2\n1\nLiftoff!", "3\nLiftoff!", "Liftoff!\n1\n2\n3"], answer: 0 }),
      md`
        «countdown(3)» prints 3, then calls «countdown(2)», and so on. «n == 0» is the base case: it stops the calls. Press Step through: each call gets its own box with its own «n», stacked on top of the call that started it.

        ## Giving back an answer

        A recursive function can build its answer from a smaller answer. The total of 1 to 4 is 4 plus the total of 1 to 3. Guess the output.
      `,
      ex(py`
        def total(n):
            if n == 1:
                return 1
            return n + total(n - 1)

        print(total(4))
      `, { predict: ["10", "4", "24"], answer: 0 }),
      md`
        «total(4)» waits for «total(3)», which waits for «total(2)», which waits for «total(1)». The base case gives back 1. Then each waiting call adds its own «n»: 1, then 3, then 6, then 10. The calls that are waiting form the **call stack**.
      `,
      pause(md`Good place for a break. Next: what happens without a base case.`),
      md`
        ## No base case

        Without a base case, the calls never stop. Python allows only about 1000 calls inside each other, then stops with **RecursionError**. Guess what happens.
      `,
      ex(py`
        def total(n):
            return n + total(n - 1)

        print(total(4))
      `, { error: true, label: "A crash on purpose", predict: ["RecursionError", "10", "0"], answer: 0 }),
      md`
        Every recursive function needs a base case, and every call must move closer to it. A loop often does the same job more simply: «sum(range(1, n + 1))». Use recursion when a problem has smaller problems of the same shape inside it, like folders inside folders.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          def f(n):
              if n == 0:
                  return 0
              return 2 + f(n - 1)

          print(f(3))
        `, options: ["6", "3", "0"], answer: 0,
        explain: md`«f(3)» is 2 + «f(2)», which is 2 + «f(1)», which is 2 + «f(0)», which is 0. So 2 + 2 + 2 + 0 is 6.`,
        why: [null, md`Each call adds 2, not 1.`, md`The base case gives back 0, but each waiting call adds 2 to it.`],
        skill: "trace" },
      { q: md`What does this function do?`, code: py`
          def count(items):
              if items == []:
                  return 0
              return 1 + count(items[1:])
        `, options: ["It gives back how many items the list has", "It gives back the first item", "It removes every item from the list"],
        answer: 0, verify: false, mono: false,
        explain: md`Each call counts one item and passes the rest of the list on. An empty list counts as 0.`,
        why: [null, md`It adds 1 for each item. It never gives back an item itself.`, md`«items[1:]» makes a new, shorter list. The original list is not changed.`],
        skill: "read" },
      { q: md`A recursive function stops with «RecursionError». What is the most likely cause?`,
        options: ["It has no base case, or its calls never reach the base case", "The list it was given is empty", "It uses return"],
        answer: 0, verify: false, mono: false,
        explain: md`The calls go on until Python's limit of about 1000. Check the base case, and check that each call moves towards it.`,
        why: [null, md`An empty list is usually the base case itself.`, md`Recursive functions need return to give their answer back.`],
        skill: "debug" },
      { q: md`What is a **base case**?`,
        options: ["The smallest case, answered without calling the function again", "The first line of every function", "The biggest number the function can take"],
        answer: 0, verify: false, mono: false,
        explain: md`The base case stops the chain of calls, so the waiting calls can finish.`,
        why: [null, md`It is a case, usually an «if», not a fixed line.`, md`It is the smallest case, not the biggest.`],
        skill: "memory" },
      { q: md`You need the total of 1 to 1000. What is the simplest and safest way?`,
        options: ["«sum(range(1, 1001))»", "A recursive function that calls itself 1000 times", "A while True loop with no break"],
        answer: 0, verify: false, mono: false,
        explain: md`A built-in function does it in one line. 1000 recursive calls would reach Python's limit.`,
        why: [null, md`About 1000 calls inside each other is Python's limit, so this can stop with RecursionError.`, md`Without a break, a while True loop never ends.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: the deepest box",
        task: md`Answer each question without running the program. Each call has its own «n».`,
        code: py`
          def total(n):
              if n == 1:
                  return 1
              return n + total(n - 1)

          answer = total(3)
          print(answer)
        `,
        ask: [{ line: 2, hit: 3, name: "n" }, { line: 6, name: "answer" }],
        hints: [
          md`Line 2 runs once in each call: first for «total(3)», then «total(2)», then «total(1)».`,
          md`The third time line 2 runs, you are inside the deepest call.`,
          md`The deepest call has n = 1. The answer is 3 + 2 + 1.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: print after the call",
        task: md`Answer the question without running the program. Look closely at where the print line is.`,
        code: py`
          def show(n):
              if n == 0:
                  return
              show(n - 1)
              print(n)

          show(3)
        `,
        ask: [{ output: true }],
        hints: [
          md`Each call makes its smaller call **before** it prints.`,
          md`So the deepest call that prints, with n = 1, prints first.`,
          md`The waiting calls print as they finish: 1, then 2, then 3.`,
        ],
      },
      {
        id: "t3", kind: "trace", title: "Be the Computer: counting digits",
        task: md`Answer each question without running the program. «//» drops the last digit: 4096 // 10 is 409.`,
        code: py`
          def digits(n):
              if n < 10:
                  return 1
              return 1 + digits(n // 10)

          d = digits(4096)
          print(d)
        `,
        ask: [{ line: 2, hit: 4, name: "n" }, { line: 6, name: "d" }],
        hints: [
          md`The calls get 4096, then 409, then 40, then 4.`,
          md`The fourth call has a one-digit number, so it is the base case.`,
          md`Each call adds 1, so the answer is the number of digits.`,
        ],
      },
      {
        id: "p1", kind: "parsons", indent: "choose", title: "Arrange: a power function",
        task: md`
          Put the lines in order and set each indent. «power(base, exp)» multiplies «base» by itself «exp» times, using recursion. Anything to the power 0 is 1. The program prints:

          | 32
        `,
        solution: py`
          def power(base, exp):
              if exp == 0:
                  return 1
              return base * power(base, exp - 1)
          print(power(2, 5))
        `,
        distractors: ["    return base * power(base, exp)"],
        tests: [
          { output: "32" },
          { py: py`
              expect("power", (3, 0), 1)
              expect("power", (3, 4), 81)
              expect("power", (10, 2), 100)
            ` },
        ],
        hints: [
          md`The base case comes first, inside the function: the power 0.`,
          md`The last line of the function calls power again with a smaller exp.`,
          md`One of the two return lines never makes exp smaller, so it would never reach the base case.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the total that never ends",
        task: md`
          The program should print the total of 1 to 4:

          | 10

          It stops with RecursionError instead. Tap the line that causes it, then fix it.
        `,
        starter: py`
          def total(n):
              if n == 0:
                  return 0
              return n + total(n + 1)

          print(total(4))
        `,
        bugLines: [4],
        solution: py`
          def total(n):
              if n == 0:
                  return 0
              return n + total(n - 1)

          print(total(4))
        `,
        tests: [
          { output: "10" },
          { py: py`
              expect("total", (0,), 0)
              expect("total", (1,), 1)
              expect("total", (10,), 55)
            ` },
        ],
        wrong: [py`
          def total(n):
              if n == 0:
                  return 0
              return total(n - 1)

          print(total(4))
        `],
        hints: [
          md`The base case is n = 0. Do the calls get closer to 0, or further away?`,
          md`Each call should work on a smaller number than the one before.`,
          md`If the answer becomes 0, the call is right but the line no longer adds its own n.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: multiply instead",
        task: md`
          The **factorial** of a number multiplies every whole number from 1 up to it: the factorial of 5 is 1 × 2 × 3 × 4 × 5. Change «total» into «factorial(n)», with the base case «n == 1» giving back 1. The program should print:

          | 120
        `,
        starter: py`
          def total(n):
              if n == 1:
                  return 1
              return n + total(n - 1)

          print(total(5))
        `,
        solution: py`
          def factorial(n):
              if n == 1:
                  return 1
              return n * factorial(n - 1)

          print(factorial(5))
        `,
        tests: [
          { output: "120" },
          { py: py`
              expect("factorial", (1,), 1)
              expect("factorial", (3,), 6)
              expect("factorial", (6,), 720)
            ` },
        ],
        wrong: [py`
          def factorial(n):
              if n == 1:
                  return 1
              return n * factorial(n - 1) + 1

          print(factorial(5))
        `],
        hints: [
          md`If you see a NameError, the function was renamed in one place but not in the line that calls itself.`,
          md`If the answer is 15, the function still adds instead of multiplying.`,
          md`If the answer is a little too big, an extra number is being added after the multiplication.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: the sum of the digits",
        task: md`
          From a blank page, write «digit_sum(n)» for a whole number «n» of 0 or more. It gives back the sum of its digits, using **recursion**: the last digit is «n % 10», and the rest of the number is «n // 10». Then print:

          : print(digit_sum(4096))

          It should print:

          | 19
        `,
        starter: py``,
        solution: py`
          def digit_sum(n):
              if n < 10:
                  return n
              return n % 10 + digit_sum(n // 10)

          print(digit_sum(4096))
        `,
        tests: [
          { output: "19" },
          { py: py`
              for n, want in [(0, 0), (7, 7), (10, 1), (99, 18), (123456, 21)]:
                  expect("digit_sum", (n,), want)
            ` },
          { py: py`
              import ast
              calls_itself = False
              for node in ast.walk(ast.parse(CODE)):
                  if isinstance(node, ast.FunctionDef) and node.name == "digit_sum":
                      calls_itself = any(isinstance(c, ast.Call) and getattr(c.func, "id", None) == "digit_sum" for c in ast.walk(node))
              assert calls_itself, "digit_sum should call itself: today's skill is recursion."
            ` },
        ],
        wrong: [py`
          def digit_sum(n):
              if n < 10:
                  return 0
              return n % 10 + digit_sum(n // 10)

          print(digit_sum(4096))
        `],
        hints: [
          md`If the answer misses the first digit, the base case gives back 0. A one-digit number is its own digit sum.`,
          md`If you see RecursionError, the number does not get smaller in each call.`,
          md`If a test says the function must call itself, the answer was worked out with a loop. Today, use a call to digit_sum inside digit_sum.`,
        ],
      },
    ],
    keys: [
      md`**Recursion**: a function that calls itself on a smaller problem.`,
      md`The **base case** is answered without another call. It stops the chain.`,
      md`Waiting calls form the **call stack**. Each call has its own variables.`,
      md`No base case, or calls that never reach it, ends in RecursionError after about 1000 calls.`,
      md`A loop is often simpler. Use recursion for problems with smaller copies inside them.`,
    ],
  });

  // ---------------------------------------------------------------- Day 100
  day({
    slug: "why-programs-get-slow",
    title: "Why Programs Get Slow",
    goal: "Count the steps a program takes, and see why a loop inside a loop gets slow quickly.",
    minutes: 40,
    needs: [26, 64, 76],
    win: "Today you can now count a program's steps and tell a straight-line program from one that slows down fast.",
    learn: [
      md`
        ## Counting steps, not seconds

        How fast is a program? Seconds change from laptop to laptop, so we count **steps**: how many times the main work line runs. Guess how many checks a one-by-one search needs to find the last item.
      `,
      ex(py`
        def find(items, target):
            steps = 0
            for x in items:
                steps += 1
                if x == target:
                    return steps
            return steps

        print(find(list(range(10)), 9))
        print(find(list(range(20)), 19))
      `, { predict: ["10\n20", "10\n10", "9\n19"], answer: 0 }),
      md`
        Double the list, and the steps double too. The steps grow in a **straight line** with the size of the list.

        ## A loop inside a loop

        **Selection sort** puts a list in order: find the smallest item, swap it to the front, then repeat for the rest. Read it, then guess the steps.
      `,
      ex(py`
        def selection_sort(items):
            items = items[:]
            steps = 0
            for i in range(len(items)):
                smallest = i
                for j in range(i + 1, len(items)):
                    steps += 1
                    if items[j] < items[smallest]:
                        smallest = j
                items[i], items[smallest] = items[smallest], items[i]
            return items, steps

        print(selection_sort([5, 2, 9, 1]))
        print(selection_sort(list(range(8, 0, -1)))[1])
      `, { predict: ["([1, 2, 5, 9], 6)\n28", "([1, 2, 5, 9], 4)\n8", "([1, 2, 5, 9], 6)\n12"], answer: 0 }),
      md`
        For 4 items the inner loop runs 3 + 2 + 1 = 6 times. Double to 8 items, and it runs 28 times: more than four times as many. For n items it is about n × n ÷ 2 steps. People write this as O(n²), which is called **Big O**. You only need to recognise the name.

        A loop inside a loop over the same list is the usual sign of this. Python's own «sorted» is far faster, so in real work you use it.

        ## in: a list or a set?

        «x in a_list» checks the items one by one, like the search above. «x in a_set» goes straight to the answer, like looking up a dictionary key (Day 64). Both give the same answer.
      `,
      ex(py`
        roll_numbers = list(range(100000))
        present = set(roll_numbers)
        print(99999 in roll_numbers, 99999 in present)
      `, { predict: ["True True", "True False", "False True"], answer: 0 }),
      md`
        The list check looked at 1,00,000 items. The set check looked at about one. When a program asks «in» many times, a set keeps it fast.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          steps = 0
          for i in range(5):
              for j in range(5):
                  steps += 1
          print(steps)
        `, options: ["25", "10", "5"], answer: 0,
        explain: md`The inner loop runs 5 times for each of the 5 outer rounds: 5 × 5.`,
        why: [null, md`That would be one loop after another. Here one loop is inside the other.`, md`5 is only the outer loop's rounds.`],
        skill: "trace" },
      { q: md`What does this program measure?`, code: py`
          steps = 0
          for x in names:
              steps += 1
              if x == "Zoya":
                  break
          print(steps)
        `, options: ["How many names a one-by-one search reads before it finds Zoya", "How many times Zoya appears", "How long the search takes in seconds"],
        answer: 0, verify: false, mono: false,
        explain: md`It adds 1 for each name read, and stops at the first Zoya.`,
        why: [null, md`«break» stops at the first Zoya, so it does not count them all.`, md`It counts steps, not seconds.`],
        skill: "read" },
      { q: md`A program checks «if roll in present_list:» 50,000 times and is very slow. What is the best change?`,
        options: ["Make «present» a set once, then check «if roll in present»", "Sort the list before every check", "Add «print» lines to see the progress"],
        answer: 0, verify: false, mono: false,
        explain: md`A set answers «in» almost at once. Build it once, then use it every time.`,
        why: [null, md`Sorting every time adds even more work.`, md`print lines make it slower still.`],
        skill: "debug" },
      { q: md`A program takes about n × n steps. If the list gets twice as long, about how many times more steps does it take?`,
        options: ["4 times", "2 times", "The same"],
        answer: 0, verify: false, mono: false,
        explain: md`(2n) × (2n) is 4 × n × n.`,
        why: [null, md`2 times is a straight-line program, like a one-by-one search.`, md`More items always means more steps here.`],
        skill: "memory" },
      { q: md`You will ask "Has this student already been counted?" thousands of times. Which do you keep the counted students in?`,
        options: ["«a set»", "«a list»", "«a string of names»"], answer: 0, verify: false,
        explain: md`A set answers «in» fast, however many items it holds.`,
        why: [null, md`A list checks one by one, so each question gets slower as the list grows.`, md`Searching inside one long string is slow and can match parts of names.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: a grid of steps",
        task: md`Answer each question without running the program.`,
        code: py`
          steps = 0
          for i in range(3):
              for j in range(4):
                  steps += 1
          print(steps)
        `,
        ask: [{ line: 4, hit: 5, name: "steps" }, { output: true }],
        hints: [
          md`«steps» goes up by 1 each time line 4 runs.`,
          md`After line 4 has run 5 times, steps is 5.`,
          md`The inner loop runs 4 times for each of 3 outer rounds.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: sorting three items",
        task: md`Answer the question without running the program.`,
        code: py`
          def selection_sort(items):
              items = items[:]
              steps = 0
              for i in range(len(items)):
                  smallest = i
                  for j in range(i + 1, len(items)):
                      steps += 1
                      if items[j] < items[smallest]:
                          smallest = j
                  items[i], items[smallest] = items[smallest], items[i]
              return items, steps

          print(selection_sort([3, 1, 2]))
        `,
        ask: [{ output: true }],
        hints: [
          md`For 3 items, the inner loop runs 2 times, then 1 time, then 0 times.`,
          md`So steps is 2 + 1 + 0.`,
          md`The function gives back a tuple: the sorted list, then the steps.`,
        ],
      },
      {
        id: "p1", kind: "parsons", indent: "choose", title: "Arrange: count every pair",
        task: md`
          Put the lines in order and set each indent. «count_pairs(n)» counts the steps of a loop inside a loop, both over «range(n)». The program prints:

          | 9 36
        `,
        solution: py`
          def count_pairs(n):
              steps = 0
              for i in range(n):
                  for j in range(n):
                      steps += 1
              return steps
          print(count_pairs(3), count_pairs(6))
        `,
        distractors: ["        for j in range(i):"],
        tests: [
          { output: "9 36" },
          { py: py`
              expect("count_pairs", (0,), 0)
              expect("count_pairs", (10,), 100)
            ` },
        ],
        hints: [
          md`The counter starts at 0 once, before both loops.`,
          md`The add line belongs inside the inner loop.`,
          md`Only one of the two inner loop lines is right: both loops go over the same range.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the step count that is too small",
        task: md`
          The program should count the comparisons of selection sort, for 4 items and for 8 items:

          | 6 28

          It prints «4 8» instead. Tap the line that causes it, then fix it.
        `,
        starter: py`
          def count_steps(items):
              items = items[:]
              steps = 0
              for i in range(len(items)):
                  smallest = i
                  steps += 1
                  for j in range(i + 1, len(items)):
                      if items[j] < items[smallest]:
                          smallest = j
                  items[i], items[smallest] = items[smallest], items[i]
              return steps

          print(count_steps([5, 2, 9, 1]), count_steps(list(range(8, 0, -1))))
        `,
        bugLines: [6],
        solution: py`
          def count_steps(items):
              items = items[:]
              steps = 0
              for i in range(len(items)):
                  smallest = i
                  for j in range(i + 1, len(items)):
                      steps += 1
                      if items[j] < items[smallest]:
                          smallest = j
                  items[i], items[smallest] = items[smallest], items[i]
              return steps

          print(count_steps([5, 2, 9, 1]), count_steps(list(range(8, 0, -1))))
        `,
        tests: [
          { output: "6 28" },
          { py: py`
              expect("count_steps", ([1],), 0)
              expect("count_steps", ([2, 1],), 1)
              expect("count_steps", (list(range(10)),), 45)
            ` },
        ],
        wrong: [py`
          def count_steps(items):
              items = items[:]
              steps = 0
              for i in range(len(items)):
                  smallest = i
                  for j in range(i + 1, len(items)):
                      if items[j] < items[smallest]:
                          smallest = j
                          steps += 1
                  items[i], items[smallest] = items[smallest], items[i]
              return steps

          print(count_steps([5, 2, 9, 1]), count_steps(list(range(8, 0, -1))))
        `],
        hints: [
          md`4 and 8 are the lengths of the lists. The counter counts rounds of the outer loop only.`,
          md`A comparison happens once in each round of the inner loop.`,
          md`Count every comparison, not only the ones where a smaller item is found.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: a fast attendance check",
        task: md`
          This program checks which roll numbers were present. It uses «in» on a list, which reads one by one. Change it so it builds a **set** of the present roll numbers once, and checks «in» on the set. The output must stay the same:

          | Present: 3
          | Absent: 2
        `,
        starter: py`
          present = [101, 105, 110, 118]
          class_list = [101, 102, 105, 110, 111]
          here = 0
          away = 0
          for roll in class_list:
              if roll in present:
                  here += 1
              else:
                  away += 1
          print("Present:", here)
          print("Absent:", away)
        `,
        solution: py`
          present = set([101, 105, 110, 118])
          class_list = [101, 102, 105, 110, 111]
          here = 0
          away = 0
          for roll in class_list:
              if roll in present:
                  here += 1
              else:
                  away += 1
          print("Present:", here)
          print("Absent:", away)
        `,
        tests: [
          { output: "Present: 3\nAbsent: 2" },
          { py: py`
              assert isinstance(need("present"), set), "Keep the present roll numbers in a set."
            ` },
        ],
        wrong: [py`
          present = set([101, 105, 110, 118])
          class_list = [101, 102, 105, 110, 111]
          here = 0
          away = 0
          for roll in class_list:
              if roll in class_list:
                  here += 1
              else:
                  away += 1
          print("Present:", here)
          print("Absent:", away)
        `],
        hints: [
          md`If a test says present is not a set, it is still a list. «set(...)» turns a list into a set.`,
          md`Build the set once, before the loop, not inside it.`,
          md`If everyone is present, the check looks in the wrong collection.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: how much slower?",
        task: md`
          The folder has «sorting.py», with the function «selection_sort(items)» from the lesson. It gives back the sorted list and the number of steps.

          From a blank page, import it. Count the steps for the numbers 50 down to 1, then for 100 down to 1. Then print how many times more steps the bigger list took, to 1 decimal place:

          | 50 items: 1225 steps
          | 100 items: 4950 steps
          | Times more: 4.0
        `,
        files: { "sorting.py": py`
          def selection_sort(items):
              items = items[:]
              steps = 0
              for i in range(len(items)):
                  smallest = i
                  for j in range(i + 1, len(items)):
                      steps += 1
                      if items[j] < items[smallest]:
                          smallest = j
                  items[i], items[smallest] = items[smallest], items[i]
              return items, steps
        ` },
        starter: py``,
        solution: py`
          import sorting

          _, small = sorting.selection_sort(list(range(50, 0, -1)))
          _, big = sorting.selection_sort(list(range(100, 0, -1)))
          print(f"50 items: {small} steps")
          print(f"100 items: {big} steps")
          print(f"Times more: {big / small:.1f}")
        `,
        tests: [
          { output: "50 items: 1225 steps\n100 items: 4950 steps\nTimes more: 4.0" },
          { uses: ["import"] },
        ],
        wrong: [py`
          import sorting

          small = len(sorting.selection_sort(list(range(50, 0, -1)))[0])
          big = len(sorting.selection_sort(list(range(100, 0, -1)))[0])
          print(f"50 items: {small} steps")
          print(f"100 items: {big} steps")
          print(f"Times more: {big / small:.1f}")
        `],
        hints: [
          md`If the steps equal the list lengths, you used the sorted list instead of the steps. The function gives back two values.`,
          md`If the last line shows 2.0, you divided the list sizes, not the step counts.`,
          md`If you see ModuleNotFoundError, check the module name: «sorting», without «.py».`,
        ],
      },
    ],
    keys: [
      md`Measure speed in **steps**, not seconds: count how often the main work line runs.`,
      md`One loop over n items: about n steps. Double the list, double the steps.`,
      md`A loop inside a loop over the same list: about n × n steps (O(n²), "Big O"). Double the list, four times the steps.`,
      md`«in» on a list checks one by one; «in» on a set answers almost at once.`,
    ],
  });

  // ---------------------------------------------------------------- Day 101
  day({
    slug: "first-chart-marks",
    title: "Optional Taster: Your Marks as a Chart",
    goal: "Draw your mock test marks as a bar chart with a package other people wrote.",
    minutes: 25,
    optional: true,
    needs: [37, 58],
    win: "Today you can now draw a bar chart of your own data with matplotlib.",
    learn: [
      md`
        ## An optional taster

        This whole day is **optional**: skipping it costs nothing, and the next day opens either way. It shows what Python packages (Day 90) can do.

        **matplotlib** is a package other people wrote for drawing charts. The first time you run chart code on this page, it downloads matplotlib and the parts it needs: about **13 MB**. Use Wi-Fi if you can. After that it is saved, like the rest of the course.
      `,
      ex(py`
        import matplotlib.pyplot as plt

        subjects = ["Maths", "GK", "English"]
        marks = [72, 85, 64]
        plt.bar(subjects, marks)
        plt.title("My mock test marks")
        plt.show()
        print("Best:", subjects[marks.index(max(marks))])
      `, { predict: ["Best: GK", "Best: 85", "Best: Maths"], answer: 0 }),
      md`
        «import matplotlib.pyplot as plt» uses the short name «plt», as on Day 83. «plt.bar(names, numbers)» draws one bar for each name. «plt.title» adds a heading, «plt.xlabel» and «plt.ylabel» name the two sides, and «plt.show()» shows the picture.
      `,
      tip(md`On your laptop, install it first with «python -m pip install matplotlib» (Day 90). There, «plt.show()» opens the chart in its own window.`),
    ],
    quiz: [
      { q: md`What does «plt.bar(subjects, marks)» draw?`,
        options: ["One bar for each subject, as tall as its marks", "One line joining all the marks", "A table of subjects and marks"],
        answer: 0, verify: false, mono: false,
        explain: md`The first list gives the names under the bars. The second gives their heights.`,
        why: [null, md`A line chart is drawn by «plt.plot», not «plt.bar».`, md`It draws a picture, not a table.`],
        skill: "memory" },
      { q: md`What does this program show?`, code: py`
          import matplotlib.pyplot as plt

          plt.bar(["Mon", "Tue"], [30, 45])
          plt.ylabel("Minutes")
          plt.show()
        `, options: ["A bar chart of study minutes on Monday and Tuesday", "The text Mon Tue 30 45", "Nothing, because there is no print"],
        answer: 0, verify: false, mono: false,
        explain: md`«plt.show()» shows the chart picture. «print» is only for text.`,
        why: [null, md`The values become bars in a picture, not text.`, md`«plt.show()» shows the picture without any print.`],
        skill: "read" },
      { q: md`Your chart appears, but it has no heading at the top. Which line is missing?`,
        options: ["«plt.title(\"...\")»", "«plt.bar(...)»", "«import matplotlib.pyplot as plt»"], answer: 0, verify: false,
        explain: md`«plt.title» writes the heading above the chart.`,
        why: [null, md`Without «plt.bar» there would be no bars at all.`, md`Without the import, the program would stop with a NameError.`],
        skill: "debug" },
    ],
    practice: [
      {
        id: "f1", kind: "fill", title: "Fill the gaps: study minutes",
        task: md`
          Fill the gaps so the program draws one bar for each day, with the heading «Study minutes». Press Run to see your chart.
        `,
        template: py`
          import matplotlib.pyplot as plt

          days = ["Mon", "Tue", "Wed", "Thu"]
          minutes = [30, 45, 20, 60]
          plt.⟦bar⟧(days, minutes)
          plt.⟦title⟧("Study minutes")
          plt.xlabel("Day")
          plt.ylabel("Minutes")
          plt.show()
        `,
        tests: [
          { py: py`
              import matplotlib.pyplot as plt
              seen = {}
              real_bar, real_show = plt.bar, plt.show
              def spy_bar(x, height, *args, **kwargs):
                  seen["x"] = [str(v) for v in x]
                  seen["heights"] = list(height)
                  return real_bar(x, height, *args, **kwargs)
              def spy_show(*args, **kwargs):
                  seen["title"] = plt.gca().get_title()
                  return real_show(*args, **kwargs)
              spy_show._pytrainer = True
              plt.bar, plt.show = spy_bar, spy_show
              try:
                  exec(compile(CODE, "<chart>", "exec"), {"__name__": "__main__"})
              finally:
                  plt.bar, plt.show = real_bar, real_show
                  plt.close("all")
              assert seen.get("x") == ["Mon", "Tue", "Wed", "Thu"], f"The bars should be Mon, Tue, Wed and Thu, but the chart has {seen.get('x')}."
              assert seen.get("heights") == [30, 45, 20, 60], f"The bar heights should be 30, 45, 20 and 60, but they are {seen.get('heights')}."
              assert seen.get("title") == "Study minutes", f"The heading should be 'Study minutes', but it is {seen.get('title')!r}."
            ` },
        ],
        hints: [
          md`The first gap is the kind of chart: one bar for each day.`,
          md`The second gap writes the heading at the top of the chart.`,
          md`Both gaps are short words: bar, and the word for a heading.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: your mock test chart",
        task: md`
          From a blank page, draw your mock test marks as a bar chart, **highest marks first**. Use these marks:

          : marks = {"Reasoning": 78, "GK": 64, "English": 81, "Maths": 70}

          The chart needs the heading «Mock test 1» and the label «Marks» on the side with the numbers (the y side). Under the chart, print the average:

          | Average: 73.25

          The hidden test reads the bars, heading and label from your chart.
        `,
        starter: py``,
        solution: py`
          import matplotlib.pyplot as plt

          marks = {"Reasoning": 78, "GK": 64, "English": 81, "Maths": 70}
          ordered = sorted(marks, key=lambda s: marks[s], reverse=True)
          plt.bar(ordered, [marks[s] for s in ordered])
          plt.title("Mock test 1")
          plt.ylabel("Marks")
          plt.show()
          print("Average:", sum(marks.values()) / len(marks))
        `,
        tests: [
          { output: "Average: 73.25" },
          { py: py`
              import matplotlib.pyplot as plt
              seen = {}
              real_bar, real_show = plt.bar, plt.show
              def spy_bar(x, height, *args, **kwargs):
                  seen["x"] = [str(v) for v in x]
                  seen["heights"] = list(height)
                  return real_bar(x, height, *args, **kwargs)
              def spy_show(*args, **kwargs):
                  ax = plt.gca()
                  seen["title"] = ax.get_title()
                  seen["ylabel"] = ax.get_ylabel()
                  return real_show(*args, **kwargs)
              spy_show._pytrainer = True
              plt.bar, plt.show = spy_bar, spy_show
              try:
                  exec(compile(CODE, "<chart>", "exec"), {"__name__": "__main__"})
              finally:
                  plt.bar, plt.show = real_bar, real_show
                  plt.close("all")
              assert seen.get("x") == ["English", "Reasoning", "Maths", "GK"], f"The bars should go from the highest marks to the lowest: English, Reasoning, Maths, GK. The chart has {seen.get('x')}."
              assert seen.get("heights") == [81, 78, 70, 64], f"The bar heights should be 81, 78, 70 and 64, but they are {seen.get('heights')}."
              assert seen.get("title") == "Mock test 1", f"The heading should be 'Mock test 1', but it is {seen.get('title')!r}."
              assert seen.get("ylabel") == "Marks", f"The y side should be labelled 'Marks', but it is {seen.get('ylabel')!r}."
            ` },
        ],
        wrong: [py`
          import matplotlib.pyplot as plt

          marks = {"Reasoning": 78, "GK": 64, "English": 81, "Maths": 70}
          plt.bar(list(marks), list(marks.values()))
          plt.title("Mock test 1")
          plt.ylabel("Marks")
          plt.show()
          print("Average:", sum(marks.values()) / len(marks))
        `],
        hints: [
          md`If the bars are in the order of the dictionary, sort the subjects by their marks first, highest first.`,
          md`If the heading or label is missing, add the title and the y label before showing the chart.`,
          md`If the average is wrong, divide the total of the marks by the number of subjects.`,
        ],
      },
    ],
    keys: [
      md`**matplotlib** is a package for charts. «import matplotlib.pyplot as plt».`,
      md`«plt.bar(names, numbers)» draws bars. «plt.title», «plt.xlabel» and «plt.ylabel» add words. «plt.show()» shows it.`,
      md`On a laptop, install it with «python -m pip install matplotlib».`,
    ],
  });

  // ---------------------------------------------------------------- Day 102
  day({
    slug: "capstone-plan",
    title: "Capstone 1: Plan Your Study Buddy",
    goal: "Turn the Study Buddy brief into an ordered plan, stubs with contracts, and example tests.",
    minutes: 45,
    kind: "project",
    needs: [55, 75, 81],
    win: "Today you can now turn a brief into a plan: the steps in order, stubs with contracts, and tests written before the code.",
    learn: [
      md`
        ## The brief

        For three days you build one program of your own: the **SSC Study Buddy**. It asks you questions from a question bank and marks them the SSC way: +2 for right, -0.5 for wrong, 0 for skipped. It remembers which questions you find hard, and asks those more often.

        Be honest with yourself: Days 102 to 104 usually take about a week of sittings. Every stage saves when you pass it, and your code moves with you from day to day.

        ## Leitner boxes, on paper

        Picture 5 boxes of question cards. Every card starts in box 1. A card answered right moves up one box, and box 5 is the top. A card answered wrong goes back to box 1. A skipped card stays where it is.

        Each session, you take cards from the **lowest** boxes first. So the hard cards come back most often. The warm-up cards on your home page work the same way. Guess the boxes one card visits.
      `,
      ex(py`
        box = 1
        for result in ["right", "right", "wrong", "right"]:
            if result == "right":
                box = min(box + 1, 5)
            else:
                box = 1
            print(box)
      `, { predict: ["2\n3\n1\n2", "2\n3\n2\n3", "1\n2\n3\n4"], answer: 0 }),
      md`
        ## The question bank

        The questions live in a JSON file, «questions.json», as a list of dictionaries (Day 81). Each one has a number «qid», the «text», 4 «options», the right letter as «answer», and a «topic». The bank in the folder has 6 questions. Guess the output.
      `,
      ex(py`
        import json

        with open("questions.json", encoding="utf-8") as f:
            rows = json.load(f)
        print(len(rows), rows[0]["answer"], rows[0]["topic"])
      `, { files: { "questions.json": py`
          [
            {"qid": 1, "text": "Which Article of the Constitution abolishes untouchability?", "options": ["Article 14", "Article 17", "Article 21", "Article 32"], "answer": "B", "topic": "Polity"},
            {"qid": 2, "text": "In which year was the Battle of Plassey fought?", "options": ["1757", "1764", "1857", "1761"], "answer": "A", "topic": "History"},
            {"qid": 3, "text": "Which is the longest river in India?", "options": ["Godavari", "Yamuna", "Ganga", "Narmada"], "answer": "C", "topic": "Geography"},
            {"qid": 4, "text": "What is the chemical formula of common salt?", "options": ["KCl", "NaCl", "NaOH", "HCl"], "answer": "B", "topic": "Science"},
            {"qid": 5, "text": "Who was the first President of India?", "options": ["Jawaharlal Nehru", "B. R. Ambedkar", "S. Radhakrishnan", "Rajendra Prasad"], "answer": "D", "topic": "Polity"},
            {"qid": 6, "text": "Who founded the Maurya Empire?", "options": ["Ashoka", "Chandragupta Maurya", "Bindusara", "Harsha"], "answer": "B", "topic": "History"}
          ]
        ` }, predict: ["6 B Polity", "1 B Polity", "6 A History"], answer: 0 }),
      md`
        The boxes go in a second file, «boxes.json», as a dictionary from qid to box. Remember Day 81: number keys come back from JSON as **text**. So the program always uses «str(q.qid)» as the key, like «"1"».

        ## Seven fixed names

        On Day 55 you planned with **stubs**: functions with a contract (what goes in, what comes out) and «pass» as the body. The hidden tests call these seven, so their names and brackets are fixed:

        - «Question(qid, text, options, answer, topic)»: a class
        - «load_questions(path)»: gives back a list of Question objects
        - «mark(chosen, correct)»: gives back 2, -0.5 or 0
        - «move(box, points)»: gives back the new box
        - «pick(questions, boxes, n)»: gives back n questions, lowest boxes first
        - «load_boxes(path)»: gives back the saved boxes, or «{}»
        - «save_boxes(boxes, path)»: writes the boxes to the file

        Everything else is your own plan: how you show a question, what you print, and any helper functions you add.
      `,
      pause(md`Good place for a break. Next: three stages that turn the brief into a plan.`),
      md`
        ## Three stages today

        Stage 1 puts the program's steps in order. Stage 2 writes the stubs. Stage 3 writes examples first, as tests, before any function works (Day 75). Tomorrow you make the stubs work.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          box = 4
          for result in ["right", "right", "right"]:
              if result == "right":
                  box = min(box + 1, 5)
          print(box)
        `, options: ["5", "7", "4"], answer: 0,
        explain: md`The first right answer moves the card to box 5. «min» keeps it at 5 after that, because 5 is the top box.`,
        why: [null, md`«min(box + 1, 5)» never goes past 5.`, md`Each right answer moves the card up, until box 5.`],
        skill: "trace" },
      { q: md`What does this function give back?`, code: py`
          def pick(questions, boxes, n):
              return sorted(questions, key=lambda q: boxes.get(str(q.qid), 1))[:n]
        `, options: ["The n questions in the lowest boxes, with new questions counted as box 1", "n questions chosen at random", "Every question except those in box 1"],
        answer: 0, verify: false, mono: false,
        explain: md`The key is each question's box, so low boxes come first. «.get(..., 1)» puts a question with no box yet in box 1. «[:n]» keeps the first n.`,
        why: [null, md`«sorted» always gives the same order. Nothing here is random.`, md`Box 1 questions come first. Nothing is removed.`],
        skill: "read" },
      { q: md`A program saves the boxes «{1: 3}» with «json.dump». After loading them back, «boxes[1]» stops with KeyError. Why?`,
        options: ["JSON turned the number key 1 into the text \"1\"", "The file was not saved", "Box 3 does not exist"],
        answer: 0, verify: false, mono: false,
        explain: md`JSON keys are always text (Day 81). Use «str(q.qid)» as the key everywhere, so saving and loading give the same keys.`,
        why: [null, md`The file was saved: the key just came back as text.`, md`The box number is a value. The problem is the key.`],
        skill: "debug" },
      { q: md`In an SSC paper with +2 for right and -0.5 for wrong, you answer 10 right, 4 wrong, and skip 6. What is your score?`,
        options: ["18", "20", "14"], answer: 0, verify: false, mono: false,
        explain: md`10 × 2 is 20. 4 × 0.5 is 2. Skipped questions score 0. 20 - 2 is 18.`,
        why: [null, md`20 forgets the 4 wrong answers.`, md`14 takes off 1.5 for each wrong answer. It is 0.5 each.`],
        skill: "memory" },
      { q: md`Which holds each question's box, so the program finds it from the qid at once?`,
        options: ["«a dictionary: {qid as text: box}»", "«a list of boxes in bank order»", "«a set of qids»"], answer: 0, verify: false,
        explain: md`A dictionary looks up a key directly, and it saves to JSON as it is.`,
        why: [null, md`A list breaks when questions are added or removed, because the positions move.`, md`A set can say a qid was seen, but it cannot hold a box number.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "s1", stage: 1, kind: "parsons", title: "Stage 1: the steps in order",
        task: md`
          Before writing code, put the program's steps in order. Each line prints one step. A step can only use what earlier steps made.

          The program prints the plan, from the first step to the last.
        `,
        solution: py`
          print("Load the questions and the saved boxes")
          print("Pick the questions in the lowest boxes")
          print("Ask each one and mark it: +2, -0.5 or 0")
          print("Move each question to its new box")
          print("Save the boxes and show the score")
        `,
        distractors: ['print("Save the boxes before asking anything")'],
        tests: [
          { output: "Load the questions and the saved boxes\nPick the questions in the lowest boxes\nAsk each one and mark it: +2, -0.5 or 0\nMove each question to its new box\nSave the boxes and show the score" },
        ],
        hints: [
          md`If picking comes first, there is nothing to pick from yet. Something must be loaded before it.`,
          md`If moving comes before asking, the program does not know the answer yet.`,
          md`If saving comes before asking, nothing has changed yet, so the boxes from this session are lost.`,
        ],
      },
      {
        id: "s2", stage: 2, title: "Stage 2: the stubs",
        task: md`
          The brief and the first two stubs are written for you. Each has its contract as comments: what goes in, what comes out.

          Write a stub for each of the other five fixed names, with its contract and «pass»: «mark(chosen, correct)», «move(box, points)», «pick(questions, boxes, n)», «load_boxes(path)» and «save_boxes(boxes, path)». Then, at the bottom, see what a stub gives back:

          : print(mark("B", "B"))

          It should print:

          | None
        `,
        starter: py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  pass


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              pass


          # Write the stubs for mark, move, pick, load_boxes and save_boxes here.
        `,
        solution: py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  pass


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              pass


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              pass


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              pass


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              pass


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              pass


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              pass


          print(mark("B", "B"))
        `,
        tests: [
          { output: "None" },
          { py: py`
              import inspect
              want = {"load_questions": 1, "mark": 2, "move": 2, "pick": 3, "load_boxes": 1, "save_boxes": 2}
              for name, count in want.items():
                  fn = need(name, "function")
                  got = len(inspect.signature(fn).parameters)
                  assert got == count, f"«{name}» should take {count} value{'s' if count > 1 else ''} in its brackets, but it takes {got}."
              cls = need("Question", "class")
              got = len(inspect.signature(cls.__init__).parameters)
              assert got == 6, f"Question's __init__ should take self and 5 more values (qid, text, options, answer, topic), but it takes {got} in all."
            ` },
        ],
        wrong: [py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  pass


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              pass


          def mark(chosen):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              pass


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              pass


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              pass


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              pass


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              pass


          print(mark("B", "B"))
        `],
        hints: [
          md`If a test says a name could not be found, check its spelling against the seven fixed names in the lesson.`,
          md`If a test says a function takes the wrong number of values, compare its brackets with the contract: for example, «pick» takes three.`,
          md`If nothing is printed, the bottom line is missing. A stub with «pass» gives back None.`,
        ],
      },
      {
        id: "s3", stage: 3, carry: "s2", title: "Stage 3: examples first",
        task: md`
          Write the examples before the code, as tests (Day 75). Add two test functions:

          - «test_mark()», with an assert for a right answer, a wrong answer, and a skipped one.
          - «test_move()», with asserts for a right answer, a right answer in box 5, a wrong answer from a high box, and a skip.

          Work out each answer by hand from the contracts. **Do not call the tests yet**: the stubs would fail them. Tomorrow, when the functions work, you call them. The hidden test runs your tests on a finished engine, and on broken ones.
        `,
        starter: py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  pass


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              pass


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              pass


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              pass


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              pass


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              pass


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              pass


          print(mark("B", "B"))
        `,
        solution: py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  pass


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              pass


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              pass


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              pass


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              pass


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              pass


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              pass


          def test_mark():
              assert mark("B", "B") == 2
              assert mark("A", "B") == -0.5
              assert mark("", "B") == 0


          def test_move():
              assert move(1, 2) == 2
              assert move(5, 2) == 5
              assert move(4, -0.5) == 1
              assert move(3, 0) == 3


          print(mark("B", "B"))
        `,
        tests: [
          { output: "None" },
          { py: py`
              tm = need("test_mark", "function")
              tv = need("test_move", "function")

              def good_mark(chosen, correct):
                  if chosen == "":
                      return 0
                  return 2 if chosen == correct else -0.5

              def good_move(box, points):
                  if points > 0:
                      return min(box + 1, 5)
                  if points < 0:
                      return 1
                  return box

              def outcome(test, name, version):
                  space = test.__globals__
                  saved = space.get(name)
                  space[name] = version
                  try:
                      test()
                      return "pass"
                  except AssertionError:
                      return "fail"
                  finally:
                      space[name] = saved

              assert outcome(tm, "mark", good_mark) == "pass", "test_mark() fails on a correct mark(). Work out each answer by hand: right is 2, wrong is -0.5, skipped is 0."
              assert outcome(tv, "move", good_move) == "pass", "test_move() fails on a correct move(). Work out each new box by hand from the contract."
              broken_marks = {
                  "a skipped question scores 0": lambda chosen, correct: 2 if chosen == correct else -0.5,
                  "a wrong answer scores -0.5": lambda chosen, correct: 0 if chosen == "" else (2 if chosen == correct else 0),
                  "a right answer scores 2": lambda chosen, correct: 0 if chosen == "" else (1 if chosen == correct else -0.5),
              }
              for fact, version in broken_marks.items():
                  assert outcome(tm, "mark", version) == "fail", f"test_mark() does not check that {fact}. Add an assert for that case."
              broken_moves = {
                  "a right answer moves up one box": lambda box, points: box if points > 0 else (1 if points < 0 else box),
                  "a right answer in box 5 stays in box 5": lambda box, points: box + 1 if points > 0 else (1 if points < 0 else box),
                  "a wrong answer goes back to box 1 from any box, even box 4": lambda box, points: min(box + 1, 5) if points > 0 else (max(box - 1, 1) if points < 0 else box),
                  "a skipped question stays in its box": lambda box, points: min(box + 1, 5) if points > 0 else 1,
              }
              for fact, version in broken_moves.items():
                  assert outcome(tv, "move", version) == "fail", f"test_move() does not check that {fact}. Add an assert for that case."
            ` },
        ],
        wrong: [py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  pass


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              pass


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              pass


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              pass


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              pass


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              pass


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              pass


          def test_mark():
              assert mark("B", "B") == 2
              assert mark("A", "B") == -0.5


          def test_move():
              assert move(1, 2) == 2
              assert move(4, -0.5) == 1
              assert move(3, 0) == 3


          print(mark("B", "B"))
        `],
        hints: [
          md`If your program stops with AssertionError, a test is called at the bottom. Remove that call: the stubs cannot pass yet.`,
          md`If a test says a case is not checked, add one assert for exactly that case, with the answer worked out by hand.`,
          md`If a test fails on a correct engine, one of your hand answers is wrong. A wrong answer always sends a card back to box 1.`,
        ],
      },
    ],
    keys: [
      md`Plan before code: the steps in order, then **stubs** with contracts, then examples as tests.`,
      md`Fixed names are the ones the tests call. Everything else is your own plan.`,
      md`Leitner boxes: right moves a card up a box (5 at most), wrong sends it to box 1, skipped stays.`,
      md`JSON keys are text, so the boxes use «str(q.qid)» as the key.`,
      md`A test written first should fail on a stub and pass on a finished function.`,
    ],
  });

  // ---------------------------------------------------------------- Day 103
  day({
    slug: "capstone-build",
    title: "Capstone 2: Build the Engine",
    goal: "Fill in your own stubs until the quiz engine loads, marks, moves boxes and remembers them.",
    minutes: 60,
    kind: "project",
    needs: [71, 81, 95, 96, 102],
    win: "Today you can now build a program from your own stubs, one tested stage at a time, with data that survives between runs.",
    learn: [
      md`
        ## From stubs to an engine

        Your stubs and tests from Day 102 are where today starts. Each stage fills in some of the stubs, until that stage's hidden tests pass. Your own tests join in as soon as their functions work.

        Inside the program, each question is a «Question» object. In the JSON file, it is a plain dictionary. As on Day 96, «to_dict()» turns an object into a dictionary, and loading builds the objects back. Guess the output.
      `,
      ex(py`
        class Question:
            def __init__(self, qid, text, options, answer, topic):
                self.qid = qid
                self.text = text
                self.options = options
                self.answer = answer
                self.topic = topic

        row = {"qid": 7, "text": "Capital of Assam?", "options": ["Dispur", "Shillong", "Imphal", "Agartala"], "answer": "A", "topic": "Geography"}
        q = Question(row["qid"], row["text"], row["options"], row["answer"], row["topic"])
        print(q.options[0], q.topic)
      `, { predict: ["Dispur Geography", "A Geography", "Dispur 7"], answer: 0 }),
      md`
        ## Boxes that survive

        On Run, the page keeps the files your program saves. So «boxes.json» is still there next time, as on a laptop. Check answer always starts with only «questions.json», so the tests are fair.

        The first time, «boxes.json» does not exist yet. As on Day 81, catch FileNotFoundError and start with an empty dictionary.
      `,
      tip(md`If a stage fails, read the message: it describes the case that failed. Work out the right answer for that case by hand, then find the line that gives a different one.`),
      pause(md`This day usually takes several sittings. Each stage saves when it passes, so stop after any stage.`),
      md`
        ## Four stages

        Stage 1 loads the question bank into objects and saves it back. Stage 2 marks answers. Stage 3 moves boxes and picks questions. Stage 4 asks real questions with «input()», and keeps the boxes between runs.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          def mark(chosen, correct):
              if chosen == "":
                  return 0
              if chosen == correct:
                  return 2
              return -0.5

          total = 0
          for chosen in ["A", "", "B", "B"]:
              total += mark(chosen, "B")
          print(total)
        `, options: ["3.5", "4", "3.0"], answer: 0,
        explain: md`A is wrong: -0.5. The skip scores 0. Two right answers score 2 each. -0.5 + 0 + 2 + 2 is 3.5.`,
        why: [null, md`4 forgets the -0.5 for the wrong answer.`, md`3.0 takes off 1 for the wrong answer. It is 0.5.`],
        skill: "trace" },
      { q: md`What happens to the old «boxes.json» when this runs?`, code: py`
          def save_boxes(boxes, path):
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(boxes, f)
        `, options: ["It is replaced by the new boxes", "The new boxes are added after the old ones", "Nothing: json.dump only reads"],
        answer: 0, verify: false, mono: false,
        explain: md`Mode «"w"» empties the file first. The new boxes hold every question's box, so nothing is lost.`,
        why: [null, md`Adding at the end is mode «"a"», and it would break the JSON.`, md`«json.dump» writes. «json.load» reads.`],
        skill: "read" },
      { q: md`On the very first Run, «load_boxes» stops with FileNotFoundError. What is the right fix?`,
        options: ["Catch FileNotFoundError and give back «{}»", "Open the file with mode «w» to read it", "Catch every error with a bare «except:»"],
        answer: 0, verify: false, mono: false,
        explain: md`The first time, no boxes are saved yet, so an empty dictionary is right. Catch only that one error, so other mistakes still show.`,
        why: [null, md`Mode «w» empties the file, so the saved boxes would be lost every time.`, md`A bare except hides real bugs too, like a typing mistake in a name.`],
        skill: "debug" },
      { q: md`Why does «json.dump(questions, f)» fail when «questions» is a list of Question objects?`,
        options: ["JSON can only save plain data, such as dictionaries, lists, text and numbers", "The list is too long for one file", "«json.dump» can only save one item"],
        answer: 0, verify: false, mono: false,
        explain: md`Your own objects are not JSON. Save «[q.to_dict() for q in questions]» instead (Day 96).`,
        why: [null, md`Length is not the problem. The type of each item is.`, md`«json.dump» saves a whole list at once.`],
        skill: "memory" },
      { q: md`Two questions are both in box 1. Which keeps them in bank order?`,
        options: ["«sorted» with a key: equal keys keep their first order", "«a set of the questions»", "«random.shuffle»"], answer: 0, verify: false,
        explain: md`Day 66: when two keys are equal, «sorted» keeps the items in the order they came.`,
        why: [null, md`A set has no order at all.`, md`A shuffle mixes them, so the order changes every run.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "s1", stage: 1, carry: "capstone-plan/s3", title: "Stage 1: load the question bank",
        task: md`
          Your Day 102 code is below. Now make the first part work:

          - «Question.__init__» keeps all five values as attributes, with the same names.
          - Add a method «to_dict()» that gives back a dictionary with the keys «"qid"», «"text"», «"options"», «"answer"» and «"topic"».
          - «load_questions(path)» reads the JSON file and gives back a list of Question objects.
          - Add «save_questions(questions, path)», which writes the questions back to a JSON file as a list of dictionaries.

          Replace the last line of the program with these three:

          : questions = load_questions("questions.json")
          : print("Loaded", len(questions), "questions")
          : print("First:", questions[0].text)

          It should print:

          | Loaded 6 questions
          | First: Which Article of the Constitution abolishes untouchability?
        `,
        files: { "questions.json": py`
          [
            {"qid": 1, "text": "Which Article of the Constitution abolishes untouchability?", "options": ["Article 14", "Article 17", "Article 21", "Article 32"], "answer": "B", "topic": "Polity"},
            {"qid": 2, "text": "In which year was the Battle of Plassey fought?", "options": ["1757", "1764", "1857", "1761"], "answer": "A", "topic": "History"},
            {"qid": 3, "text": "Which is the longest river in India?", "options": ["Godavari", "Yamuna", "Ganga", "Narmada"], "answer": "C", "topic": "Geography"},
            {"qid": 4, "text": "What is the chemical formula of common salt?", "options": ["KCl", "NaCl", "NaOH", "HCl"], "answer": "B", "topic": "Science"},
            {"qid": 5, "text": "Who was the first President of India?", "options": ["Jawaharlal Nehru", "B. R. Ambedkar", "S. Radhakrishnan", "Rajendra Prasad"], "answer": "D", "topic": "Polity"},
            {"qid": 6, "text": "Who founded the Maurya Empire?", "options": ["Ashoka", "Chandragupta Maurya", "Bindusara", "Harsha"], "answer": "B", "topic": "History"}
          ]
        ` },
        starter: py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  pass


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              pass


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              pass


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              pass


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              pass


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              pass


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              pass


          def test_mark():
              assert mark("B", "B") == 2
              assert mark("A", "B") == -0.5
              assert mark("", "B") == 0


          def test_move():
              assert move(1, 2) == 2
              assert move(5, 2) == 5
              assert move(4, -0.5) == 1
              assert move(3, 0) == 3


          print(mark("B", "B"))
        `,
        solution: py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  self.qid = qid
                  self.text = text
                  self.options = options
                  self.answer = answer
                  self.topic = topic

              def to_dict(self):
                  # out: a dictionary of the five values, ready for JSON
                  return {"qid": self.qid, "text": self.text, "options": self.options,
                          "answer": self.answer, "topic": self.topic}


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              with open(path, encoding="utf-8") as f:
                  rows = json.load(f)
              return [Question(r["qid"], r["text"], r["options"], r["answer"], r["topic"]) for r in rows]


          def save_questions(questions, path):
              # in: a list of Question objects and the name of a JSON file
              # out: nothing; the questions are written as dictionaries
              with open(path, "w", encoding="utf-8") as f:
                  json.dump([q.to_dict() for q in questions], f, indent=2)


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              pass


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              pass


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              pass


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              pass


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              pass


          def test_mark():
              assert mark("B", "B") == 2
              assert mark("A", "B") == -0.5
              assert mark("", "B") == 0


          def test_move():
              assert move(1, 2) == 2
              assert move(5, 2) == 5
              assert move(4, -0.5) == 1
              assert move(3, 0) == 3


          questions = load_questions("questions.json")
          print("Loaded", len(questions), "questions")
          print("First:", questions[0].text)
        `,
        tests: [
          { output: "Loaded 6 questions\nFirst: Which Article of the Constitution abolishes untouchability?" },
          { py: py`
              import json
              rows = [
                  {"qid": 11, "text": "Q one?", "options": ["a", "b", "c", "d"], "answer": "C", "topic": "Polity"},
                  {"qid": 12, "text": "Q two?", "options": ["e", "f", "g", "h"], "answer": "A", "topic": "Science"},
              ]
              with open("test_bank.json", "w", encoding="utf-8") as f:
                  json.dump(rows, f)
              got = call("load_questions", "test_bank.json")
              assert isinstance(got, list) and len(got) == 2, f"For a file with 2 questions, load_questions should give back a list of 2, but it gave back {got!r}."
              assert isinstance(got[1], need("Question", "class")), "load_questions should give back Question objects, not dictionaries."
              q = got[1]
              for name, value in rows[1].items():
                  assert getattr(q, name, None) == value, f"The second question's «{name}» should be {value!r}, but it is {getattr(q, name, None)!r}."
              assert method(q, "to_dict") == rows[1], f"to_dict() should give back {rows[1]!r}."
              call("save_questions", got, "copy.json")
              with open("copy.json", encoding="utf-8") as f:
                  back = json.load(f)
              assert back == rows, "save_questions should write the questions as a list of dictionaries, the same as the file they came from."
            ` },
        ],
        wrong: [py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  self.qid = qid
                  self.text = text
                  self.options = options
                  self.answer = answer
                  self.topic = topic

              def to_dict(self):
                  # out: a dictionary of the five values, ready for JSON
                  return {"qid": self.qid, "text": self.text, "options": self.options,
                          "answer": self.answer, "topic": self.topic}


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              with open(path, encoding="utf-8") as f:
                  rows = json.load(f)
              return rows


          def save_questions(questions, path):
              # in: a list of Question objects and the name of a JSON file
              # out: nothing; the questions are written as dictionaries
              with open(path, "w", encoding="utf-8") as f:
                  json.dump([q.to_dict() for q in questions], f, indent=2)


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              pass


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              pass


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              pass


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              pass


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              pass


          def test_mark():
              assert mark("B", "B") == 2
              assert mark("A", "B") == -0.5
              assert mark("", "B") == 0


          def test_move():
              assert move(1, 2) == 2
              assert move(5, 2) == 5
              assert move(4, -0.5) == 1
              assert move(3, 0) == 3


          questions = load_questions("questions.json")
          print("Loaded", len(questions), "questions")
          print("First:", questions[0].text)
        `],
        hints: [
          md`If you see AttributeError for «text», the objects have no attributes yet: «__init__» must keep each value on «self».`,
          md`If a test says load_questions gave back dictionaries, each dictionary from the file must become a Question first.`,
          md`If save_questions writes something different, it saves the objects themselves. Each one needs to become a dictionary first.`,
        ],
      },
      {
        id: "s2", stage: 2, carry: "s1", title: "Stage 2: marking at +2 and -0.5",
        task: md`
          Fill in «mark(chosen, correct)»: 2 when the letters match, 0 when «chosen» is «""», and -0.5 otherwise. Then add these lines at the end. The first runs **your own** Day 102 tests:

          : test_mark()
          : answers = ["B", "", "C", "A", "D", "B"]
          : total = 0
          : for q, chosen in zip(questions, answers):
          :     total += mark(chosen, q.answer)
          : print("Score:", total)

          It should print:

          | Loaded 6 questions
          | First: Which Article of the Constitution abolishes untouchability?
          | Score: 7.5
        `,
        files: { "questions.json": py`
          [
            {"qid": 1, "text": "Which Article of the Constitution abolishes untouchability?", "options": ["Article 14", "Article 17", "Article 21", "Article 32"], "answer": "B", "topic": "Polity"},
            {"qid": 2, "text": "In which year was the Battle of Plassey fought?", "options": ["1757", "1764", "1857", "1761"], "answer": "A", "topic": "History"},
            {"qid": 3, "text": "Which is the longest river in India?", "options": ["Godavari", "Yamuna", "Ganga", "Narmada"], "answer": "C", "topic": "Geography"},
            {"qid": 4, "text": "What is the chemical formula of common salt?", "options": ["KCl", "NaCl", "NaOH", "HCl"], "answer": "B", "topic": "Science"},
            {"qid": 5, "text": "Who was the first President of India?", "options": ["Jawaharlal Nehru", "B. R. Ambedkar", "S. Radhakrishnan", "Rajendra Prasad"], "answer": "D", "topic": "Polity"},
            {"qid": 6, "text": "Who founded the Maurya Empire?", "options": ["Ashoka", "Chandragupta Maurya", "Bindusara", "Harsha"], "answer": "B", "topic": "History"}
          ]
        ` },
        starter: py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  self.qid = qid
                  self.text = text
                  self.options = options
                  self.answer = answer
                  self.topic = topic

              def to_dict(self):
                  # out: a dictionary of the five values, ready for JSON
                  return {"qid": self.qid, "text": self.text, "options": self.options,
                          "answer": self.answer, "topic": self.topic}


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              with open(path, encoding="utf-8") as f:
                  rows = json.load(f)
              return [Question(r["qid"], r["text"], r["options"], r["answer"], r["topic"]) for r in rows]


          def save_questions(questions, path):
              # in: a list of Question objects and the name of a JSON file
              # out: nothing; the questions are written as dictionaries
              with open(path, "w", encoding="utf-8") as f:
                  json.dump([q.to_dict() for q in questions], f, indent=2)


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              pass


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              pass


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              pass


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              pass


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              pass


          def test_mark():
              assert mark("B", "B") == 2
              assert mark("A", "B") == -0.5
              assert mark("", "B") == 0


          def test_move():
              assert move(1, 2) == 2
              assert move(5, 2) == 5
              assert move(4, -0.5) == 1
              assert move(3, 0) == 3


          questions = load_questions("questions.json")
          print("Loaded", len(questions), "questions")
          print("First:", questions[0].text)
        `,
        solution: py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  self.qid = qid
                  self.text = text
                  self.options = options
                  self.answer = answer
                  self.topic = topic

              def to_dict(self):
                  # out: a dictionary of the five values, ready for JSON
                  return {"qid": self.qid, "text": self.text, "options": self.options,
                          "answer": self.answer, "topic": self.topic}


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              with open(path, encoding="utf-8") as f:
                  rows = json.load(f)
              return [Question(r["qid"], r["text"], r["options"], r["answer"], r["topic"]) for r in rows]


          def save_questions(questions, path):
              # in: a list of Question objects and the name of a JSON file
              # out: nothing; the questions are written as dictionaries
              with open(path, "w", encoding="utf-8") as f:
                  json.dump([q.to_dict() for q in questions], f, indent=2)


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              if chosen == "":
                  return 0
              if chosen == correct:
                  return 2
              return -0.5


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              pass


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              pass


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              pass


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              pass


          def test_mark():
              assert mark("B", "B") == 2
              assert mark("A", "B") == -0.5
              assert mark("", "B") == 0


          def test_move():
              assert move(1, 2) == 2
              assert move(5, 2) == 5
              assert move(4, -0.5) == 1
              assert move(3, 0) == 3


          questions = load_questions("questions.json")
          print("Loaded", len(questions), "questions")
          print("First:", questions[0].text)

          test_mark()
          answers = ["B", "", "C", "A", "D", "B"]
          total = 0
          for q, chosen in zip(questions, answers):
              total += mark(chosen, q.answer)
          print("Score:", total)
        `,
        tests: [
          { output: "Loaded 6 questions\nFirst: Which Article of the Constitution abolishes untouchability?\nScore: 7.5" },
          { py: py`
              expect("mark", ("B", "B"), 2)
              expect("mark", ("D", "D"), 2)
              expect("mark", ("A", "B"), -0.5)
              expect("mark", ("", "B"), 0)
              expect("mark", ("", "A"), 0)
            ` },
        ],
        wrong: [py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  self.qid = qid
                  self.text = text
                  self.options = options
                  self.answer = answer
                  self.topic = topic

              def to_dict(self):
                  # out: a dictionary of the five values, ready for JSON
                  return {"qid": self.qid, "text": self.text, "options": self.options,
                          "answer": self.answer, "topic": self.topic}


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              with open(path, encoding="utf-8") as f:
                  rows = json.load(f)
              return [Question(r["qid"], r["text"], r["options"], r["answer"], r["topic"]) for r in rows]


          def save_questions(questions, path):
              # in: a list of Question objects and the name of a JSON file
              # out: nothing; the questions are written as dictionaries
              with open(path, "w", encoding="utf-8") as f:
                  json.dump([q.to_dict() for q in questions], f, indent=2)


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              if chosen == correct:
                  return 2
              return -0.5


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              pass


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              pass


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              pass


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              pass


          def test_mark():
              assert mark("B", "B") == 2
              assert mark("A", "B") == -0.5
              assert mark("", "B") == 0


          def test_move():
              assert move(1, 2) == 2
              assert move(5, 2) == 5
              assert move(4, -0.5) == 1
              assert move(3, 0) == 3


          questions = load_questions("questions.json")
          print("Loaded", len(questions), "questions")
          print("First:", questions[0].text)

          test_mark()
          answers = ["B", "", "C", "A", "D", "B"]
          total = 0
          for q, chosen in zip(questions, answers):
              total += mark(chosen, q.answer)
          print("Score:", total)
        `],
        hints: [
          md`If the score is 7.0, the skipped answer lost half a mark. A skip scores 0.`,
          md`If the program stops inside test_mark, compare what mark gave back with the answer your test expects.`,
          md`If the score is too high, a wrong answer is not taking off its half mark.`,
        ],
      },
      {
        id: "s3", stage: 3, carry: "s2", title: "Stage 3: Leitner boxes",
        task: md`
          Fill in «move(box, points)» and «pick(questions, boxes, n)», following their contracts. In «pick», equal boxes keep bank order, and a question with no box yet counts as box 1. Then add these lines at the end. The first runs your own «test_move»:

          : test_move()
          : boxes = {"1": 3, "2": 1, "3": 2, "4": 2, "5": 4, "6": 1}
          : for q in pick(questions, boxes, 4):
          :     print(q.qid, boxes.get(str(q.qid), 1))

          The last four lines it prints are:

          | 2 1
          | 6 1
          | 3 2
          | 4 2
        `,
        files: { "questions.json": py`
          [
            {"qid": 1, "text": "Which Article of the Constitution abolishes untouchability?", "options": ["Article 14", "Article 17", "Article 21", "Article 32"], "answer": "B", "topic": "Polity"},
            {"qid": 2, "text": "In which year was the Battle of Plassey fought?", "options": ["1757", "1764", "1857", "1761"], "answer": "A", "topic": "History"},
            {"qid": 3, "text": "Which is the longest river in India?", "options": ["Godavari", "Yamuna", "Ganga", "Narmada"], "answer": "C", "topic": "Geography"},
            {"qid": 4, "text": "What is the chemical formula of common salt?", "options": ["KCl", "NaCl", "NaOH", "HCl"], "answer": "B", "topic": "Science"},
            {"qid": 5, "text": "Who was the first President of India?", "options": ["Jawaharlal Nehru", "B. R. Ambedkar", "S. Radhakrishnan", "Rajendra Prasad"], "answer": "D", "topic": "Polity"},
            {"qid": 6, "text": "Who founded the Maurya Empire?", "options": ["Ashoka", "Chandragupta Maurya", "Bindusara", "Harsha"], "answer": "B", "topic": "History"}
          ]
        ` },
        starter: py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  self.qid = qid
                  self.text = text
                  self.options = options
                  self.answer = answer
                  self.topic = topic

              def to_dict(self):
                  # out: a dictionary of the five values, ready for JSON
                  return {"qid": self.qid, "text": self.text, "options": self.options,
                          "answer": self.answer, "topic": self.topic}


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              with open(path, encoding="utf-8") as f:
                  rows = json.load(f)
              return [Question(r["qid"], r["text"], r["options"], r["answer"], r["topic"]) for r in rows]


          def save_questions(questions, path):
              # in: a list of Question objects and the name of a JSON file
              # out: nothing; the questions are written as dictionaries
              with open(path, "w", encoding="utf-8") as f:
                  json.dump([q.to_dict() for q in questions], f, indent=2)


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              if chosen == "":
                  return 0
              if chosen == correct:
                  return 2
              return -0.5


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              pass


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              pass


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              pass


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              pass


          def test_mark():
              assert mark("B", "B") == 2
              assert mark("A", "B") == -0.5
              assert mark("", "B") == 0


          def test_move():
              assert move(1, 2) == 2
              assert move(5, 2) == 5
              assert move(4, -0.5) == 1
              assert move(3, 0) == 3


          questions = load_questions("questions.json")
          print("Loaded", len(questions), "questions")
          print("First:", questions[0].text)

          test_mark()
          answers = ["B", "", "C", "A", "D", "B"]
          total = 0
          for q, chosen in zip(questions, answers):
              total += mark(chosen, q.answer)
          print("Score:", total)
        `,
        solution: py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  self.qid = qid
                  self.text = text
                  self.options = options
                  self.answer = answer
                  self.topic = topic

              def to_dict(self):
                  # out: a dictionary of the five values, ready for JSON
                  return {"qid": self.qid, "text": self.text, "options": self.options,
                          "answer": self.answer, "topic": self.topic}


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              with open(path, encoding="utf-8") as f:
                  rows = json.load(f)
              return [Question(r["qid"], r["text"], r["options"], r["answer"], r["topic"]) for r in rows]


          def save_questions(questions, path):
              # in: a list of Question objects and the name of a JSON file
              # out: nothing; the questions are written as dictionaries
              with open(path, "w", encoding="utf-8") as f:
                  json.dump([q.to_dict() for q in questions], f, indent=2)


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              if chosen == "":
                  return 0
              if chosen == correct:
                  return 2
              return -0.5


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              if points > 0:
                  return min(box + 1, 5)
              if points < 0:
                  return 1
              return box


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              return sorted(questions, key=lambda q: boxes.get(str(q.qid), 1))[:n]


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              pass


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              pass


          def test_mark():
              assert mark("B", "B") == 2
              assert mark("A", "B") == -0.5
              assert mark("", "B") == 0


          def test_move():
              assert move(1, 2) == 2
              assert move(5, 2) == 5
              assert move(4, -0.5) == 1
              assert move(3, 0) == 3


          questions = load_questions("questions.json")
          print("Loaded", len(questions), "questions")
          print("First:", questions[0].text)

          test_mark()
          answers = ["B", "", "C", "A", "D", "B"]
          total = 0
          for q, chosen in zip(questions, answers):
              total += mark(chosen, q.answer)
          print("Score:", total)

          test_move()
          boxes = {"1": 3, "2": 1, "3": 2, "4": 2, "5": 4, "6": 1}
          for q in pick(questions, boxes, 4):
              print(q.qid, boxes.get(str(q.qid), 1))
        `,
        tests: [
          { output: "Loaded 6 questions\nFirst: Which Article of the Constitution abolishes untouchability?\nScore: 7.5\n2 1\n6 1\n3 2\n4 2" },
          { py: py`
              for box, points, want in [(1, 2, 2), (4, 2, 5), (5, 2, 5), (5, -0.5, 1), (2, -0.5, 1), (3, 0, 3), (1, 0, 1)]:
                  expect("move", (box, points), want)
              qs = [new("Question", i, f"Q{i}", ["a", "b", "c", "d"], "A", "T") for i in range(1, 6)]
              got = call("pick", qs, {"1": 2, "3": 1, "5": 3}, 3)
              assert [q.qid for q in got] == [2, 3, 4], f"pick with boxes 1: 2, 3: 1, 5: 3 (the rest have none yet) should give questions 2, 3 and 4, but it gave {[q.qid for q in got]}."
              got = call("pick", qs, {}, 10)
              assert [q.qid for q in got] == [1, 2, 3, 4, 5], "With no boxes yet and n bigger than the bank, pick should give every question, in bank order."
              assert [q.qid for q in qs] == [1, 2, 3, 4, 5], "pick should not change the order of the list it was given."
            ` },
        ],
        wrong: [py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  self.qid = qid
                  self.text = text
                  self.options = options
                  self.answer = answer
                  self.topic = topic

              def to_dict(self):
                  # out: a dictionary of the five values, ready for JSON
                  return {"qid": self.qid, "text": self.text, "options": self.options,
                          "answer": self.answer, "topic": self.topic}


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              with open(path, encoding="utf-8") as f:
                  rows = json.load(f)
              return [Question(r["qid"], r["text"], r["options"], r["answer"], r["topic"]) for r in rows]


          def save_questions(questions, path):
              # in: a list of Question objects and the name of a JSON file
              # out: nothing; the questions are written as dictionaries
              with open(path, "w", encoding="utf-8") as f:
                  json.dump([q.to_dict() for q in questions], f, indent=2)


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              if chosen == "":
                  return 0
              if chosen == correct:
                  return 2
              return -0.5


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              if points > 0:
                  return min(box + 1, 5)
              if points < 0:
                  return 1
              return box


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              return sorted(questions, key=lambda q: boxes.get(str(q.qid), 1), reverse=True)[:n]


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              pass


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              pass


          def test_mark():
              assert mark("B", "B") == 2
              assert mark("A", "B") == -0.5
              assert mark("", "B") == 0


          def test_move():
              assert move(1, 2) == 2
              assert move(5, 2) == 5
              assert move(4, -0.5) == 1
              assert move(3, 0) == 3


          questions = load_questions("questions.json")
          print("Loaded", len(questions), "questions")
          print("First:", questions[0].text)

          test_mark()
          answers = ["B", "", "C", "A", "D", "B"]
          total = 0
          for q, chosen in zip(questions, answers):
              total += mark(chosen, q.answer)
          print("Score:", total)

          test_move()
          boxes = {"1": 3, "2": 1, "3": 2, "4": 2, "5": 4, "6": 1}
          for q in pick(questions, boxes, 4):
              print(q.qid, boxes.get(str(q.qid), 1))
        `],
        hints: [
          md`If the highest boxes come out first, the order is the wrong way round. The hardest questions sit in the lowest boxes.`,
          md`If a KeyError names a qid, a question with no box yet must count as box 1, not crash.`,
          md`If a right answer in box 5 gives box 6, the top box is 5.`,
        ],
      },
      {
        id: "s4", stage: 4, carry: "s3", title: "Stage 4: a real session that remembers",
        task: md`
          Fill in «load_boxes» and «save_boxes» (a missing file means «{}»). Then replace everything after your tests with a real session:

          1. Keep the calls «test_mark()» and «test_move()».
          2. Load the questions and the boxes.
          3. For each of the 3 questions «pick» gives, show it with its options, and ask **once** with «input()». Mark the answer, add it to the score, and move the question's box, using «str(q.qid)» as the key.
          4. Save the boxes, then print «Score:» and the score as the last line.

          How you show each question is up to you. Run it twice: the second time, different questions come first. Answering B, then skipping, then A gives «Score: 1.5».
        `,
        files: { "questions.json": py`
          [
            {"qid": 1, "text": "Which Article of the Constitution abolishes untouchability?", "options": ["Article 14", "Article 17", "Article 21", "Article 32"], "answer": "B", "topic": "Polity"},
            {"qid": 2, "text": "In which year was the Battle of Plassey fought?", "options": ["1757", "1764", "1857", "1761"], "answer": "A", "topic": "History"},
            {"qid": 3, "text": "Which is the longest river in India?", "options": ["Godavari", "Yamuna", "Ganga", "Narmada"], "answer": "C", "topic": "Geography"},
            {"qid": 4, "text": "What is the chemical formula of common salt?", "options": ["KCl", "NaCl", "NaOH", "HCl"], "answer": "B", "topic": "Science"},
            {"qid": 5, "text": "Who was the first President of India?", "options": ["Jawaharlal Nehru", "B. R. Ambedkar", "S. Radhakrishnan", "Rajendra Prasad"], "answer": "D", "topic": "Polity"},
            {"qid": 6, "text": "Who founded the Maurya Empire?", "options": ["Ashoka", "Chandragupta Maurya", "Bindusara", "Harsha"], "answer": "B", "topic": "History"}
          ]
        ` },
        starter: py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  self.qid = qid
                  self.text = text
                  self.options = options
                  self.answer = answer
                  self.topic = topic

              def to_dict(self):
                  # out: a dictionary of the five values, ready for JSON
                  return {"qid": self.qid, "text": self.text, "options": self.options,
                          "answer": self.answer, "topic": self.topic}


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              with open(path, encoding="utf-8") as f:
                  rows = json.load(f)
              return [Question(r["qid"], r["text"], r["options"], r["answer"], r["topic"]) for r in rows]


          def save_questions(questions, path):
              # in: a list of Question objects and the name of a JSON file
              # out: nothing; the questions are written as dictionaries
              with open(path, "w", encoding="utf-8") as f:
                  json.dump([q.to_dict() for q in questions], f, indent=2)


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              if chosen == "":
                  return 0
              if chosen == correct:
                  return 2
              return -0.5


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              if points > 0:
                  return min(box + 1, 5)
              if points < 0:
                  return 1
              return box


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              return sorted(questions, key=lambda q: boxes.get(str(q.qid), 1))[:n]


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              pass


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              pass


          def test_mark():
              assert mark("B", "B") == 2
              assert mark("A", "B") == -0.5
              assert mark("", "B") == 0


          def test_move():
              assert move(1, 2) == 2
              assert move(5, 2) == 5
              assert move(4, -0.5) == 1
              assert move(3, 0) == 3


          questions = load_questions("questions.json")
          print("Loaded", len(questions), "questions")
          print("First:", questions[0].text)

          test_mark()
          answers = ["B", "", "C", "A", "D", "B"]
          total = 0
          for q, chosen in zip(questions, answers):
              total += mark(chosen, q.answer)
          print("Score:", total)

          test_move()
          boxes = {"1": 3, "2": 1, "3": 2, "4": 2, "5": 4, "6": 1}
          for q in pick(questions, boxes, 4):
              print(q.qid, boxes.get(str(q.qid), 1))
        `,
        solution: py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  self.qid = qid
                  self.text = text
                  self.options = options
                  self.answer = answer
                  self.topic = topic

              def to_dict(self):
                  # out: a dictionary of the five values, ready for JSON
                  return {"qid": self.qid, "text": self.text, "options": self.options,
                          "answer": self.answer, "topic": self.topic}


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              with open(path, encoding="utf-8") as f:
                  rows = json.load(f)
              return [Question(r["qid"], r["text"], r["options"], r["answer"], r["topic"]) for r in rows]


          def save_questions(questions, path):
              # in: a list of Question objects and the name of a JSON file
              # out: nothing; the questions are written as dictionaries
              with open(path, "w", encoding="utf-8") as f:
                  json.dump([q.to_dict() for q in questions], f, indent=2)


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              if chosen == "":
                  return 0
              if chosen == correct:
                  return 2
              return -0.5


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              if points > 0:
                  return min(box + 1, 5)
              if points < 0:
                  return 1
              return box


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              return sorted(questions, key=lambda q: boxes.get(str(q.qid), 1))[:n]


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              try:
                  with open(path, encoding="utf-8") as f:
                      return json.load(f)
              except FileNotFoundError:
                  return {}


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(boxes, f)


          def test_mark():
              assert mark("B", "B") == 2
              assert mark("A", "B") == -0.5
              assert mark("", "B") == 0


          def test_move():
              assert move(1, 2) == 2
              assert move(5, 2) == 5
              assert move(4, -0.5) == 1
              assert move(3, 0) == 3


          test_mark()
          test_move()

          questions = load_questions("questions.json")
          boxes = load_boxes("boxes.json")
          score = 0
          for q in pick(questions, boxes, 3):
              print()
              print(q.text)
              for letter, option in zip("ABCD", q.options):
                  print(" ", letter + ".", option)
              chosen = input("Answer A to D, or press Enter to skip: ").strip().upper()
              points = mark(chosen, q.answer)
              score += points
              key = str(q.qid)
              boxes[key] = move(boxes.get(key, 1), points)
              print("Points:", points, "- now in box", boxes[key])
          save_boxes(boxes, "boxes.json")
          print("Score:", score)
        `,
        tests: [
          { inputs: ["B", "", "A"], contains: ["Score: 1.5"], py: py`
              import json
              saved = json.loads(file_text("boxes.json"))
              boxes = {k: saved.get(k, 1) for k in ["1", "2", "3", "4", "5", "6"]}
              want = {"1": 2, "2": 1, "3": 1, "4": 1, "5": 1, "6": 1}
              assert boxes == want, f"After answering B, skipping, then A on an empty start, the boxes should be {want}, but they are {boxes}."
            ` },
          { inputs: ["A", "C", "B"], files: { "boxes.json": '{"1": 2, "2": 1, "3": 1}' }, contains: ["Score: 6"], py: py`
              import json
              saved = json.loads(file_text("boxes.json"))
              boxes = {k: saved.get(k, 1) for k in ["1", "2", "3", "4", "5", "6"]}
              want = {"1": 2, "2": 2, "3": 2, "4": 2, "5": 1, "6": 1}
              assert boxes == want, f"Starting from saved boxes 1: 2, 2: 1, 3: 1, the session should ask questions 2, 3 and 4. After three right answers the boxes should be {want}, but they are {boxes}."
            ` },
          { inputs: ["", "", ""], contains: ["Score: 0"], py: py`
              expect("load_boxes", ("no_such_file.json",), {})
              call("save_boxes", {"4": 3, "9": 5}, "test_boxes.json")
              expect("load_boxes", ("test_boxes.json",), {"4": 3, "9": 5})
            ` },
        ],
        wrong: [py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  self.qid = qid
                  self.text = text
                  self.options = options
                  self.answer = answer
                  self.topic = topic

              def to_dict(self):
                  # out: a dictionary of the five values, ready for JSON
                  return {"qid": self.qid, "text": self.text, "options": self.options,
                          "answer": self.answer, "topic": self.topic}


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              with open(path, encoding="utf-8") as f:
                  rows = json.load(f)
              return [Question(r["qid"], r["text"], r["options"], r["answer"], r["topic"]) for r in rows]


          def save_questions(questions, path):
              # in: a list of Question objects and the name of a JSON file
              # out: nothing; the questions are written as dictionaries
              with open(path, "w", encoding="utf-8") as f:
                  json.dump([q.to_dict() for q in questions], f, indent=2)


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              if chosen == "":
                  return 0
              if chosen == correct:
                  return 2
              return -0.5


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              if points > 0:
                  return min(box + 1, 5)
              if points < 0:
                  return 1
              return box


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              return sorted(questions, key=lambda q: boxes.get(str(q.qid), 1))[:n]


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              try:
                  with open(path, encoding="utf-8") as f:
                      return json.load(f)
              except FileNotFoundError:
                  return {}


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(boxes, f)


          def test_mark():
              assert mark("B", "B") == 2
              assert mark("A", "B") == -0.5
              assert mark("", "B") == 0


          def test_move():
              assert move(1, 2) == 2
              assert move(5, 2) == 5
              assert move(4, -0.5) == 1
              assert move(3, 0) == 3


          test_mark()
          test_move()

          questions = load_questions("questions.json")
          boxes = load_boxes("boxes.json")
          score = 0
          for q in pick(questions, boxes, 3):
              print()
              print(q.text)
              for letter, option in zip("ABCD", q.options):
                  print(" ", letter + ".", option)
              chosen = input("Answer A to D, or press Enter to skip: ").strip().upper()
              points = mark(chosen, q.answer)
              score += points
              key = str(q.qid)
              boxes[key] = move(boxes.get(key, 1), points)
              print("Points:", points, "- now in box", boxes[key])
          print("Score:", score)
        `],
        hints: [
          md`If a test says it could not find boxes.json, the boxes are never saved after the session.`,
          md`If the second test asks the wrong questions, the saved boxes were not loaded first. Or the key is a number, not text.`,
          md`If a test says your program asked for input more or fewer times, ask exactly once for each of the 3 questions.`,
        ],
      },
    ],
    keys: [
      md`Build from your own stubs, one stage at a time. Each stage's tests say when it works.`,
      md`Objects inside the program, dictionaries in the file: «to_dict()» out, «Question(...)» back in.`,
      md`A missing file the first time is normal: catch FileNotFoundError and start empty.`,
      md`Run keeps your program's saved files. Check answer starts fresh, so tests are fair.`,
    ],
  });

  // ---------------------------------------------------------------- Day 104
  day({
    slug: "capstone-finish",
    title: "Capstone 3: Finish and Make It Yours",
    goal: "Add history, weak topics and a countdown, prove the engine with tests, and add a feature of your own.",
    minutes: 60,
    kind: "project",
    needs: [74, 82, 83, 100, 103],
    win: "Today you can now finish a program, prove it against broken versions, and grow it with a feature and tests of your own. This completes the capstone.",
    learn: [
      md`
        ## Finish the engine, then make it yours

        Today adds what a real study app needs: a **history** of your scores, your **weak topics**, and the **days left** to your exam. Then you prove the engine with tests, and add a feature of your own.

        Stage 1 starts from your Day 103 engine. If yours is not finished, press **Start from the reference engine** in Stage 1. It is a finished Day 103 engine, so you lose nothing.

        ## Weak topics with Counter (Day 83)

        Each wrong or skipped question adds its topic to a list. «Counter» counts them, and «most_common()» puts the most missed first. Guess the output.
      `,
      ex(py`
        from collections import Counter

        missed = ["History", "Polity", "History", "Science"]
        print(Counter(missed).most_common())
      `, { predict: ["[('History', 2), ('Polity', 1), ('Science', 1)]", "[('History', 2)]", "{'History': 2, 'Polity': 1, 'Science': 1}"], answer: 0 }),
      md`
        Topics with equal counts stay in the order they were first missed.

        ## Seen questions in a set

        Every question that has a box has been asked at least once. So «set(boxes)» is the set of qids already seen. Checking «in» on a set stays fast however many questions you add, as you counted on Day 100.

        ## Days left, with the date as a parameter

        «days_left(today, exam_day)» takes today's date as a **parameter**, instead of calling «date.today()» inside. Then a test can pass any date it likes, and know the answer. Guess the output.
      `,
      ex(py`
        from datetime import date

        def days_left(today, exam_day):
            return max((exam_day - today).days, 0)

        print(days_left(date(2026, 11, 14), date(2026, 12, 1)))
        print(days_left(date(2026, 12, 5), date(2026, 12, 1)))
      `, { predict: ["17\n0", "17\n-4", "16\n0"], answer: 0 }),
      pause(md`This day usually takes several sittings. Each stage saves when it passes.`),
      md`
        ## Four stages

        Stage 1 saves a history. Stage 2 adds weak topics, new questions left, and the countdown. In Stage 3 your tests must catch 4 broken engines. Stage 4 is your own feature, with your own tests.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          from collections import Counter

          c = Counter(["GK", "Maths", "GK", "GK"])
          print(c["GK"], c["English"])
        `, options: ["3 0", "3 None", "1 0"], answer: 0,
        explain: md`GK appears 3 times. A Counter gives 0 for anything it has not seen, instead of a KeyError.`,
        why: [null, md`A Counter gives 0, not None, for a missing item.`, md`«c["GK"]» is how many times GK appears: 3.`],
        skill: "trace" },
      { q: md`What does this function give back?`, code: py`
          def count_new(questions, seen):
              return sum(1 for q in questions if str(q.qid) not in seen)
        `, options: ["How many questions have never been asked", "The questions that were asked", "How many times each question was asked"],
        answer: 0, verify: false, mono: false,
        explain: md`It adds 1 for each question whose qid is not in «seen».`,
        why: [null, md`It gives back a number, not questions.`, md`It never counts how often a question was asked.`],
        skill: "read" },
      { q: md`A test of a countdown function passes today and fails tomorrow. What is the most likely cause?`,
        options: ["The function calls «date.today()» inside, instead of taking today as a parameter", "Dates cannot be subtracted", "The test has too many asserts"],
        answer: 0, verify: false, mono: false,
        explain: md`With today inside the function, the right answer changes every day. Pass the date in, and the test can fix it.`,
        why: [null, md`Subtracting two dates works, and «.days» gives the number.`, md`More asserts never make a correct test fail.`],
        skill: "debug" },
      { q: md`What does «json.dump» do with a set, like «{"1", "2"}»?`,
        options: ["It stops with TypeError: save «sorted(seen)», a list, instead", "It saves it as a list", "It saves it as a dictionary"],
        answer: 0, verify: false, mono: false,
        explain: md`JSON has lists but no sets. Save a list, and turn it back into a set with «set(...)» after loading.`,
        why: [null, md`json.dump does not change a set into a list by itself.`, md`A set has no keys, so it cannot become a dictionary.`],
        skill: "memory" },
      { q: md`You want each topic with its count of missed questions, most missed first. Which do you use?`,
        options: ["«Counter(missed).most_common()»", "«set(missed)»", "«sorted(missed)»"], answer: 0, verify: false,
        explain: md`Counter counts each topic, and «most_common()» sorts them, most first.`,
        why: [null, md`A set keeps each topic once but loses the counts.`, md`«sorted» puts the topics in A to Z order, without counting.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "s1", stage: 1, carry: "capstone-build/s4", offerStarter: "Start from the reference engine", title: "Stage 1: score history",
        task: md`
          Add «from datetime import date» at the top, and two functions:

          - «load_history(path)» gives back the list of past sessions, or «[]» when there is no file yet.
          - «save_history(history, path)» writes the list to the file.

          At the end of the program, load the history from «history.json». Add this session as «{"date": ..., "score": score}», with today's date as text like «14-11-2026» (Day 82), and save it. Then print «Sessions:» with the number of sessions, and «Best:» with the best score ever. Answering B, skip, A on a fresh start ends with:

          | Score: 1.5
          | Sessions: 1
          | Best: 1.5
        `,
        files: { "questions.json": py`
          [
            {"qid": 1, "text": "Which Article of the Constitution abolishes untouchability?", "options": ["Article 14", "Article 17", "Article 21", "Article 32"], "answer": "B", "topic": "Polity"},
            {"qid": 2, "text": "In which year was the Battle of Plassey fought?", "options": ["1757", "1764", "1857", "1761"], "answer": "A", "topic": "History"},
            {"qid": 3, "text": "Which is the longest river in India?", "options": ["Godavari", "Yamuna", "Ganga", "Narmada"], "answer": "C", "topic": "Geography"},
            {"qid": 4, "text": "What is the chemical formula of common salt?", "options": ["KCl", "NaCl", "NaOH", "HCl"], "answer": "B", "topic": "Science"},
            {"qid": 5, "text": "Who was the first President of India?", "options": ["Jawaharlal Nehru", "B. R. Ambedkar", "S. Radhakrishnan", "Rajendra Prasad"], "answer": "D", "topic": "Polity"},
            {"qid": 6, "text": "Who founded the Maurya Empire?", "options": ["Ashoka", "Chandragupta Maurya", "Bindusara", "Harsha"], "answer": "B", "topic": "History"}
          ]
        ` },
        starter: py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  self.qid = qid
                  self.text = text
                  self.options = options
                  self.answer = answer
                  self.topic = topic

              def to_dict(self):
                  # out: a dictionary of the five values, ready for JSON
                  return {"qid": self.qid, "text": self.text, "options": self.options,
                          "answer": self.answer, "topic": self.topic}


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              with open(path, encoding="utf-8") as f:
                  rows = json.load(f)
              return [Question(r["qid"], r["text"], r["options"], r["answer"], r["topic"]) for r in rows]


          def save_questions(questions, path):
              # in: a list of Question objects and the name of a JSON file
              # out: nothing; the questions are written as dictionaries
              with open(path, "w", encoding="utf-8") as f:
                  json.dump([q.to_dict() for q in questions], f, indent=2)


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              if chosen == "":
                  return 0
              if chosen == correct:
                  return 2
              return -0.5


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              if points > 0:
                  return min(box + 1, 5)
              if points < 0:
                  return 1
              return box


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              return sorted(questions, key=lambda q: boxes.get(str(q.qid), 1))[:n]


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              try:
                  with open(path, encoding="utf-8") as f:
                      return json.load(f)
              except FileNotFoundError:
                  return {}


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(boxes, f)


          def test_mark():
              assert mark("B", "B") == 2
              assert mark("A", "B") == -0.5
              assert mark("", "B") == 0


          def test_move():
              assert move(1, 2) == 2
              assert move(5, 2) == 5
              assert move(4, -0.5) == 1
              assert move(3, 0) == 3


          test_mark()
          test_move()

          questions = load_questions("questions.json")
          boxes = load_boxes("boxes.json")
          score = 0
          for q in pick(questions, boxes, 3):
              print()
              print(q.text)
              for letter, option in zip("ABCD", q.options):
                  print(" ", letter + ".", option)
              chosen = input("Answer A to D, or press Enter to skip: ").strip().upper()
              points = mark(chosen, q.answer)
              score += points
              key = str(q.qid)
              boxes[key] = move(boxes.get(key, 1), points)
              print("Points:", points, "- now in box", boxes[key])
          save_boxes(boxes, "boxes.json")
          print("Score:", score)
        `,
        solution: py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json
          from datetime import date


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  self.qid = qid
                  self.text = text
                  self.options = options
                  self.answer = answer
                  self.topic = topic

              def to_dict(self):
                  # out: a dictionary of the five values, ready for JSON
                  return {"qid": self.qid, "text": self.text, "options": self.options,
                          "answer": self.answer, "topic": self.topic}


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              with open(path, encoding="utf-8") as f:
                  rows = json.load(f)
              return [Question(r["qid"], r["text"], r["options"], r["answer"], r["topic"]) for r in rows]


          def save_questions(questions, path):
              # in: a list of Question objects and the name of a JSON file
              # out: nothing; the questions are written as dictionaries
              with open(path, "w", encoding="utf-8") as f:
                  json.dump([q.to_dict() for q in questions], f, indent=2)


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              if chosen == "":
                  return 0
              if chosen == correct:
                  return 2
              return -0.5


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              if points > 0:
                  return min(box + 1, 5)
              if points < 0:
                  return 1
              return box


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              return sorted(questions, key=lambda q: boxes.get(str(q.qid), 1))[:n]


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              try:
                  with open(path, encoding="utf-8") as f:
                      return json.load(f)
              except FileNotFoundError:
                  return {}


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(boxes, f)


          def load_history(path):
              # in: the name of a JSON file
              # out: the list of past sessions, or [] when there is no file yet
              try:
                  with open(path, encoding="utf-8") as f:
                      return json.load(f)
              except FileNotFoundError:
                  return []


          def save_history(history, path):
              # in: the list of past sessions and the name of a JSON file
              # out: nothing; the history is written to the file
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(history, f)


          def test_mark():
              assert mark("B", "B") == 2
              assert mark("A", "B") == -0.5
              assert mark("", "B") == 0


          def test_move():
              assert move(1, 2) == 2
              assert move(5, 2) == 5
              assert move(4, -0.5) == 1
              assert move(3, 0) == 3


          test_mark()
          test_move()

          questions = load_questions("questions.json")
          boxes = load_boxes("boxes.json")
          score = 0
          for q in pick(questions, boxes, 3):
              print()
              print(q.text)
              for letter, option in zip("ABCD", q.options):
                  print(" ", letter + ".", option)
              chosen = input("Answer A to D, or press Enter to skip: ").strip().upper()
              points = mark(chosen, q.answer)
              score += points
              key = str(q.qid)
              boxes[key] = move(boxes.get(key, 1), points)
              print("Points:", points, "- now in box", boxes[key])
          save_boxes(boxes, "boxes.json")
          print("Score:", score)

          history = load_history("history.json")
          history.append({"date": date.today().strftime("%d-%m-%Y"), "score": score})
          save_history(history, "history.json")
          print("Sessions:", len(history))
          print("Best:", max(h["score"] for h in history))
        `,
        tests: [
          { inputs: ["B", "", "A"], contains: ["Score: 1.5", "Sessions: 1", "Best: 1.5"], py: py`
              import json
              history = json.loads(file_text("history.json"))
              assert isinstance(history, list) and len(history) == 1, f"After one session, history.json should hold a list of 1 session, but it holds {history!r}."
              assert history[0].get("score") == 1.5 and "date" in history[0], f"The session should be saved as a dictionary with a date and the score 1.5, but it is {history[0]!r}."
            ` },
          { inputs: ["B", "", "A"], files: { "history.json": '[{"date": "01-11-2026", "score": 4}]' }, contains: ["Sessions: 2", "Best: 4"] },
          { inputs: ["", "", ""], py: py`
              expect("load_history", ("no_such_file.json",), [])
              call("save_history", [{"date": "02-11-2026", "score": 2}], "test_history.json")
              expect("load_history", ("test_history.json",), [{"date": "02-11-2026", "score": 2}])
            ` },
        ],
        wrong: [py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json
          from datetime import date


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  self.qid = qid
                  self.text = text
                  self.options = options
                  self.answer = answer
                  self.topic = topic

              def to_dict(self):
                  # out: a dictionary of the five values, ready for JSON
                  return {"qid": self.qid, "text": self.text, "options": self.options,
                          "answer": self.answer, "topic": self.topic}


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              with open(path, encoding="utf-8") as f:
                  rows = json.load(f)
              return [Question(r["qid"], r["text"], r["options"], r["answer"], r["topic"]) for r in rows]


          def save_questions(questions, path):
              # in: a list of Question objects and the name of a JSON file
              # out: nothing; the questions are written as dictionaries
              with open(path, "w", encoding="utf-8") as f:
                  json.dump([q.to_dict() for q in questions], f, indent=2)


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              if chosen == "":
                  return 0
              if chosen == correct:
                  return 2
              return -0.5


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              if points > 0:
                  return min(box + 1, 5)
              if points < 0:
                  return 1
              return box


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              return sorted(questions, key=lambda q: boxes.get(str(q.qid), 1))[:n]


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              try:
                  with open(path, encoding="utf-8") as f:
                      return json.load(f)
              except FileNotFoundError:
                  return {}


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(boxes, f)


          def load_history(path):
              # in: the name of a JSON file
              # out: the list of past sessions, or [] when there is no file yet
              try:
                  with open(path, encoding="utf-8") as f:
                      return json.load(f)
              except FileNotFoundError:
                  return []


          def save_history(history, path):
              # in: the list of past sessions and the name of a JSON file
              # out: nothing; the history is written to the file
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(history, f)


          def test_mark():
              assert mark("B", "B") == 2
              assert mark("A", "B") == -0.5
              assert mark("", "B") == 0


          def test_move():
              assert move(1, 2) == 2
              assert move(5, 2) == 5
              assert move(4, -0.5) == 1
              assert move(3, 0) == 3


          test_mark()
          test_move()

          questions = load_questions("questions.json")
          boxes = load_boxes("boxes.json")
          score = 0
          for q in pick(questions, boxes, 3):
              print()
              print(q.text)
              for letter, option in zip("ABCD", q.options):
                  print(" ", letter + ".", option)
              chosen = input("Answer A to D, or press Enter to skip: ").strip().upper()
              points = mark(chosen, q.answer)
              score += points
              key = str(q.qid)
              boxes[key] = move(boxes.get(key, 1), points)
              print("Points:", points, "- now in box", boxes[key])
          save_boxes(boxes, "boxes.json")
          print("Score:", score)

          history = []
          history.append({"date": date.today().strftime("%d-%m-%Y"), "score": score})
          save_history(history, "history.json")
          print("Sessions:", len(history))
          print("Best:", max(h["score"] for h in history))
        `],
        hints: [
          md`If Sessions is always 1, the old history is not loaded before this session is added.`,
          md`If a test cannot find history.json, the history is never saved.`,
          md`If Best is wrong, it must look at the score of every session in the history, not only this one.`,
        ],
      },
      {
        id: "s2", stage: 2, carry: "s1", title: "Stage 2: weak topics, new questions and the countdown",
        task: md`
          Add «from collections import Counter» at the top, and «EXAM_DAY = date(2027, 3, 1)», or your own exam date. Then add three functions:

          - «weak_topics(missed)»: «missed» is a list of topics. Give back «(topic, count)» pairs, most missed first.
          - «count_new(questions, seen)»: «seen» is a set of qids as text. Give back how many questions are not in it.
          - «days_left(today, exam_day)»: the whole days from today to the exam, or 0 once it has passed.

          In the session, add the topic of each wrong or skipped question to a list «missed». At the end, print each weak topic like «Practise: History 1», then «New questions left:» with «count_new(questions, set(boxes))», then «Days to the exam:» with «days_left(date.today(), EXAM_DAY)». After B, skip, A on a fresh start you see:

          | Practise: History 1
          | Practise: Geography 1
          | New questions left: 3
        `,
        files: { "questions.json": py`
          [
            {"qid": 1, "text": "Which Article of the Constitution abolishes untouchability?", "options": ["Article 14", "Article 17", "Article 21", "Article 32"], "answer": "B", "topic": "Polity"},
            {"qid": 2, "text": "In which year was the Battle of Plassey fought?", "options": ["1757", "1764", "1857", "1761"], "answer": "A", "topic": "History"},
            {"qid": 3, "text": "Which is the longest river in India?", "options": ["Godavari", "Yamuna", "Ganga", "Narmada"], "answer": "C", "topic": "Geography"},
            {"qid": 4, "text": "What is the chemical formula of common salt?", "options": ["KCl", "NaCl", "NaOH", "HCl"], "answer": "B", "topic": "Science"},
            {"qid": 5, "text": "Who was the first President of India?", "options": ["Jawaharlal Nehru", "B. R. Ambedkar", "S. Radhakrishnan", "Rajendra Prasad"], "answer": "D", "topic": "Polity"},
            {"qid": 6, "text": "Who founded the Maurya Empire?", "options": ["Ashoka", "Chandragupta Maurya", "Bindusara", "Harsha"], "answer": "B", "topic": "History"}
          ]
        ` },
        starter: py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json
          from datetime import date


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  self.qid = qid
                  self.text = text
                  self.options = options
                  self.answer = answer
                  self.topic = topic

              def to_dict(self):
                  # out: a dictionary of the five values, ready for JSON
                  return {"qid": self.qid, "text": self.text, "options": self.options,
                          "answer": self.answer, "topic": self.topic}


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              with open(path, encoding="utf-8") as f:
                  rows = json.load(f)
              return [Question(r["qid"], r["text"], r["options"], r["answer"], r["topic"]) for r in rows]


          def save_questions(questions, path):
              # in: a list of Question objects and the name of a JSON file
              # out: nothing; the questions are written as dictionaries
              with open(path, "w", encoding="utf-8") as f:
                  json.dump([q.to_dict() for q in questions], f, indent=2)


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              if chosen == "":
                  return 0
              if chosen == correct:
                  return 2
              return -0.5


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              if points > 0:
                  return min(box + 1, 5)
              if points < 0:
                  return 1
              return box


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              return sorted(questions, key=lambda q: boxes.get(str(q.qid), 1))[:n]


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              try:
                  with open(path, encoding="utf-8") as f:
                      return json.load(f)
              except FileNotFoundError:
                  return {}


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(boxes, f)


          def load_history(path):
              # in: the name of a JSON file
              # out: the list of past sessions, or [] when there is no file yet
              try:
                  with open(path, encoding="utf-8") as f:
                      return json.load(f)
              except FileNotFoundError:
                  return []


          def save_history(history, path):
              # in: the list of past sessions and the name of a JSON file
              # out: nothing; the history is written to the file
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(history, f)


          def test_mark():
              assert mark("B", "B") == 2
              assert mark("A", "B") == -0.5
              assert mark("", "B") == 0


          def test_move():
              assert move(1, 2) == 2
              assert move(5, 2) == 5
              assert move(4, -0.5) == 1
              assert move(3, 0) == 3


          test_mark()
          test_move()

          questions = load_questions("questions.json")
          boxes = load_boxes("boxes.json")
          score = 0
          for q in pick(questions, boxes, 3):
              print()
              print(q.text)
              for letter, option in zip("ABCD", q.options):
                  print(" ", letter + ".", option)
              chosen = input("Answer A to D, or press Enter to skip: ").strip().upper()
              points = mark(chosen, q.answer)
              score += points
              key = str(q.qid)
              boxes[key] = move(boxes.get(key, 1), points)
              print("Points:", points, "- now in box", boxes[key])
          save_boxes(boxes, "boxes.json")
          print("Score:", score)

          history = load_history("history.json")
          history.append({"date": date.today().strftime("%d-%m-%Y"), "score": score})
          save_history(history, "history.json")
          print("Sessions:", len(history))
          print("Best:", max(h["score"] for h in history))
        `,
        solution: py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json
          from collections import Counter
          from datetime import date

          EXAM_DAY = date(2027, 3, 1)  # change this to your own exam date


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  self.qid = qid
                  self.text = text
                  self.options = options
                  self.answer = answer
                  self.topic = topic

              def to_dict(self):
                  # out: a dictionary of the five values, ready for JSON
                  return {"qid": self.qid, "text": self.text, "options": self.options,
                          "answer": self.answer, "topic": self.topic}


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              with open(path, encoding="utf-8") as f:
                  rows = json.load(f)
              return [Question(r["qid"], r["text"], r["options"], r["answer"], r["topic"]) for r in rows]


          def save_questions(questions, path):
              # in: a list of Question objects and the name of a JSON file
              # out: nothing; the questions are written as dictionaries
              with open(path, "w", encoding="utf-8") as f:
                  json.dump([q.to_dict() for q in questions], f, indent=2)


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              if chosen == "":
                  return 0
              if chosen == correct:
                  return 2
              return -0.5


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              if points > 0:
                  return min(box + 1, 5)
              if points < 0:
                  return 1
              return box


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              return sorted(questions, key=lambda q: boxes.get(str(q.qid), 1))[:n]


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              try:
                  with open(path, encoding="utf-8") as f:
                      return json.load(f)
              except FileNotFoundError:
                  return {}


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(boxes, f)


          def load_history(path):
              # in: the name of a JSON file
              # out: the list of past sessions, or [] when there is no file yet
              try:
                  with open(path, encoding="utf-8") as f:
                      return json.load(f)
              except FileNotFoundError:
                  return []


          def save_history(history, path):
              # in: the list of past sessions and the name of a JSON file
              # out: nothing; the history is written to the file
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(history, f)


          def weak_topics(missed):
              # in: the topics of the questions missed (wrong or skipped)
              # out: (topic, count) pairs, most missed first
              return Counter(missed).most_common()


          def count_new(questions, seen):
              # in: the questions, and a set of the qids (as text) already asked
              # out: how many questions have never been asked
              return sum(1 for q in questions if str(q.qid) not in seen)


          def days_left(today, exam_day):
              # in: two dates
              # out: whole days until the exam, or 0 once it has passed
              return max((exam_day - today).days, 0)


          def test_mark():
              assert mark("B", "B") == 2
              assert mark("A", "B") == -0.5
              assert mark("", "B") == 0


          def test_move():
              assert move(1, 2) == 2
              assert move(5, 2) == 5
              assert move(4, -0.5) == 1
              assert move(3, 0) == 3


          test_mark()
          test_move()

          questions = load_questions("questions.json")
          boxes = load_boxes("boxes.json")
          score = 0
          missed = []
          for q in pick(questions, boxes, 3):
              print()
              print(q.text)
              for letter, option in zip("ABCD", q.options):
                  print(" ", letter + ".", option)
              chosen = input("Answer A to D, or press Enter to skip: ").strip().upper()
              points = mark(chosen, q.answer)
              score += points
              if points <= 0:
                  missed.append(q.topic)
              key = str(q.qid)
              boxes[key] = move(boxes.get(key, 1), points)
              print("Points:", points, "- now in box", boxes[key])
          save_boxes(boxes, "boxes.json")
          print("Score:", score)

          history = load_history("history.json")
          history.append({"date": date.today().strftime("%d-%m-%Y"), "score": score})
          save_history(history, "history.json")
          print("Sessions:", len(history))
          print("Best:", max(h["score"] for h in history))

          for topic, count in weak_topics(missed):
              print("Practise:", topic, count)
          print("New questions left:", count_new(questions, set(boxes)))
          print("Days to the exam:", days_left(date.today(), EXAM_DAY))
        `,
        tests: [
          { inputs: ["B", "", "A"], contains: ["Score: 1.5", "Practise: History 1", "Practise: Geography 1", "New questions left: 3", "Days to the exam:"] },
          { uses: ["call:Counter"] },
          { inputs: ["", "", ""], py: py`
              from datetime import date
              expect("weak_topics", (["Polity", "History", "Polity"],), [("Polity", 2), ("History", 1)])
              expect("weak_topics", ([],), [])
              qs = [new("Question", i, f"Q{i}", ["a", "b", "c", "d"], "A", "T") for i in range(1, 5)]
              expect("count_new", (qs, {"1", "3"}), 2)
              expect("count_new", (qs, set()), 4)
              expect("days_left", (date(2026, 11, 14), date(2026, 11, 20)), 6)
              expect("days_left", (date(2026, 11, 20), date(2026, 11, 20)), 0)
              expect("days_left", (date(2026, 12, 5), date(2026, 12, 1)), 0)
            ` },
        ],
        wrong: [py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json
          from collections import Counter
          from datetime import date

          EXAM_DAY = date(2027, 3, 1)  # change this to your own exam date


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  self.qid = qid
                  self.text = text
                  self.options = options
                  self.answer = answer
                  self.topic = topic

              def to_dict(self):
                  # out: a dictionary of the five values, ready for JSON
                  return {"qid": self.qid, "text": self.text, "options": self.options,
                          "answer": self.answer, "topic": self.topic}


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              with open(path, encoding="utf-8") as f:
                  rows = json.load(f)
              return [Question(r["qid"], r["text"], r["options"], r["answer"], r["topic"]) for r in rows]


          def save_questions(questions, path):
              # in: a list of Question objects and the name of a JSON file
              # out: nothing; the questions are written as dictionaries
              with open(path, "w", encoding="utf-8") as f:
                  json.dump([q.to_dict() for q in questions], f, indent=2)


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              if chosen == "":
                  return 0
              if chosen == correct:
                  return 2
              return -0.5


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              if points > 0:
                  return min(box + 1, 5)
              if points < 0:
                  return 1
              return box


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              return sorted(questions, key=lambda q: boxes.get(str(q.qid), 1))[:n]


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              try:
                  with open(path, encoding="utf-8") as f:
                      return json.load(f)
              except FileNotFoundError:
                  return {}


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(boxes, f)


          def load_history(path):
              # in: the name of a JSON file
              # out: the list of past sessions, or [] when there is no file yet
              try:
                  with open(path, encoding="utf-8") as f:
                      return json.load(f)
              except FileNotFoundError:
                  return []


          def save_history(history, path):
              # in: the list of past sessions and the name of a JSON file
              # out: nothing; the history is written to the file
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(history, f)


          def weak_topics(missed):
              # in: the topics of the questions missed (wrong or skipped)
              # out: (topic, count) pairs, most missed first
              return Counter(missed).most_common()


          def count_new(questions, seen):
              # in: the questions, and a set of the qids (as text) already asked
              # out: how many questions have never been asked
              return sum(1 for q in questions if str(q.qid) not in seen)


          def days_left(today, exam_day):
              # in: two dates
              # out: whole days until the exam, or 0 once it has passed
              return (exam_day - today).days


          def test_mark():
              assert mark("B", "B") == 2
              assert mark("A", "B") == -0.5
              assert mark("", "B") == 0


          def test_move():
              assert move(1, 2) == 2
              assert move(5, 2) == 5
              assert move(4, -0.5) == 1
              assert move(3, 0) == 3


          test_mark()
          test_move()

          questions = load_questions("questions.json")
          boxes = load_boxes("boxes.json")
          score = 0
          missed = []
          for q in pick(questions, boxes, 3):
              print()
              print(q.text)
              for letter, option in zip("ABCD", q.options):
                  print(" ", letter + ".", option)
              chosen = input("Answer A to D, or press Enter to skip: ").strip().upper()
              points = mark(chosen, q.answer)
              score += points
              if points <= 0:
                  missed.append(q.topic)
              key = str(q.qid)
              boxes[key] = move(boxes.get(key, 1), points)
              print("Points:", points, "- now in box", boxes[key])
          save_boxes(boxes, "boxes.json")
          print("Score:", score)

          history = load_history("history.json")
          history.append({"date": date.today().strftime("%d-%m-%Y"), "score": score})
          save_history(history, "history.json")
          print("Sessions:", len(history))
          print("Best:", max(h["score"] for h in history))

          for topic, count in weak_topics(missed):
              print("Practise:", topic, count)
          print("New questions left:", count_new(questions, set(boxes)))
          print("Days to the exam:", days_left(date.today(), EXAM_DAY))
        `],
        hints: [
          md`If days_left gives a negative number for a date after the exam, it must give 0 once the exam has passed.`,
          md`If a weak topic is missing, skipped questions count as missed too, not only wrong ones.`,
          md`If New questions left is 6 after a session, the seen set must come from the saved boxes after the session.`,
        ],
      },
      {
        id: "c1", stage: 3, kind: "catch", title: "Stage 3: catch 4 broken engines",
        task: md`
          The correct engine is shown: the reference versions of today's functions. There are **4 secretly broken versions** of it. Each gets the marking, the boxes, the picking or the countdown a little wrong. Write asserts that pass on the correct engine and fail on every broken one.

          Work out each answer by hand first. To test «pick», make two or three small Question objects, as the hidden tests do.
        `,
        target: py`
          from collections import Counter
          from datetime import date


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  self.qid = qid
                  self.text = text
                  self.options = options
                  self.answer = answer
                  self.topic = topic

              def to_dict(self):
                  # out: a dictionary of the five values, ready for JSON
                  return {"qid": self.qid, "text": self.text, "options": self.options,
                          "answer": self.answer, "topic": self.topic}


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              if chosen == "":
                  return 0
              if chosen == correct:
                  return 2
              return -0.5


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              if points > 0:
                  return min(box + 1, 5)
              if points < 0:
                  return 1
              return box


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              return sorted(questions, key=lambda q: boxes.get(str(q.qid), 1))[:n]


          def weak_topics(missed):
              # in: the topics of the questions missed (wrong or skipped)
              # out: (topic, count) pairs, most missed first
              return Counter(missed).most_common()


          def count_new(questions, seen):
              # in: the questions, and a set of the qids (as text) already asked
              # out: how many questions have never been asked
              return sum(1 for q in questions if str(q.qid) not in seen)


          def days_left(today, exam_day):
              # in: two dates
              # out: whole days until the exam, or 0 once it has passed
              return max((exam_day - today).days, 0)
        `,
        broken: [
          // 1: a skipped question loses half a mark.
          py`
            from collections import Counter
            from datetime import date


            class Question:
                # in: a number qid, the question text, a list of 4 options,
                #     the right letter ("A" to "D") and a topic
                def __init__(self, qid, text, options, answer, topic):
                    self.qid = qid
                    self.text = text
                    self.options = options
                    self.answer = answer
                    self.topic = topic

                def to_dict(self):
                    # out: a dictionary of the five values, ready for JSON
                    return {"qid": self.qid, "text": self.text, "options": self.options,
                            "answer": self.answer, "topic": self.topic}


            def mark(chosen, correct):
                # in: the letter typed ("" when skipped) and the right letter
                # out: 2 when right, -0.5 when wrong, 0 when skipped
                if chosen == correct:
                    return 2
                return -0.5


            def move(box, points):
                # in: a box from 1 to 5, and the points just scored
                # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
                if points > 0:
                    return min(box + 1, 5)
                if points < 0:
                    return 1
                return box


            def pick(questions, boxes, n):
                # in: the questions, the boxes {qid as text: box}, how many to ask
                # out: n questions, lowest boxes first; a question with no box yet is in box 1
                return sorted(questions, key=lambda q: boxes.get(str(q.qid), 1))[:n]


            def weak_topics(missed):
                # in: the topics of the questions missed (wrong or skipped)
                # out: (topic, count) pairs, most missed first
                return Counter(missed).most_common()


            def count_new(questions, seen):
                # in: the questions, and a set of the qids (as text) already asked
                # out: how many questions have never been asked
                return sum(1 for q in questions if str(q.qid) not in seen)


            def days_left(today, exam_day):
                # in: two dates
                # out: whole days until the exam, or 0 once it has passed
                return max((exam_day - today).days, 0)
          `,
          // 2: a wrong answer moves a card down one box, instead of back to box 1.
          py`
            from collections import Counter
            from datetime import date


            class Question:
                # in: a number qid, the question text, a list of 4 options,
                #     the right letter ("A" to "D") and a topic
                def __init__(self, qid, text, options, answer, topic):
                    self.qid = qid
                    self.text = text
                    self.options = options
                    self.answer = answer
                    self.topic = topic

                def to_dict(self):
                    # out: a dictionary of the five values, ready for JSON
                    return {"qid": self.qid, "text": self.text, "options": self.options,
                            "answer": self.answer, "topic": self.topic}


            def mark(chosen, correct):
                # in: the letter typed ("" when skipped) and the right letter
                # out: 2 when right, -0.5 when wrong, 0 when skipped
                if chosen == "":
                    return 0
                if chosen == correct:
                    return 2
                return -0.5


            def move(box, points):
                # in: a box from 1 to 5, and the points just scored
                # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
                if points > 0:
                    return min(box + 1, 5)
                if points < 0:
                    return max(box - 1, 1)
                return box


            def pick(questions, boxes, n):
                # in: the questions, the boxes {qid as text: box}, how many to ask
                # out: n questions, lowest boxes first; a question with no box yet is in box 1
                return sorted(questions, key=lambda q: boxes.get(str(q.qid), 1))[:n]


            def weak_topics(missed):
                # in: the topics of the questions missed (wrong or skipped)
                # out: (topic, count) pairs, most missed first
                return Counter(missed).most_common()


            def count_new(questions, seen):
                # in: the questions, and a set of the qids (as text) already asked
                # out: how many questions have never been asked
                return sum(1 for q in questions if str(q.qid) not in seen)


            def days_left(today, exam_day):
                # in: two dates
                # out: whole days until the exam, or 0 once it has passed
                return max((exam_day - today).days, 0)
          `,
          // 3: picks the highest boxes first.
          py`
            from collections import Counter
            from datetime import date


            class Question:
                # in: a number qid, the question text, a list of 4 options,
                #     the right letter ("A" to "D") and a topic
                def __init__(self, qid, text, options, answer, topic):
                    self.qid = qid
                    self.text = text
                    self.options = options
                    self.answer = answer
                    self.topic = topic

                def to_dict(self):
                    # out: a dictionary of the five values, ready for JSON
                    return {"qid": self.qid, "text": self.text, "options": self.options,
                            "answer": self.answer, "topic": self.topic}


            def mark(chosen, correct):
                # in: the letter typed ("" when skipped) and the right letter
                # out: 2 when right, -0.5 when wrong, 0 when skipped
                if chosen == "":
                    return 0
                if chosen == correct:
                    return 2
                return -0.5


            def move(box, points):
                # in: a box from 1 to 5, and the points just scored
                # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
                if points > 0:
                    return min(box + 1, 5)
                if points < 0:
                    return 1
                return box


            def pick(questions, boxes, n):
                # in: the questions, the boxes {qid as text: box}, how many to ask
                # out: n questions, lowest boxes first; a question with no box yet is in box 1
                return sorted(questions, key=lambda q: boxes.get(str(q.qid), 1), reverse=True)[:n]


            def weak_topics(missed):
                # in: the topics of the questions missed (wrong or skipped)
                # out: (topic, count) pairs, most missed first
                return Counter(missed).most_common()


            def count_new(questions, seen):
                # in: the questions, and a set of the qids (as text) already asked
                # out: how many questions have never been asked
                return sum(1 for q in questions if str(q.qid) not in seen)


            def days_left(today, exam_day):
                # in: two dates
                # out: whole days until the exam, or 0 once it has passed
                return max((exam_day - today).days, 0)
          `,
          // 4: counts one day too many.
          py`
            from collections import Counter
            from datetime import date


            class Question:
                # in: a number qid, the question text, a list of 4 options,
                #     the right letter ("A" to "D") and a topic
                def __init__(self, qid, text, options, answer, topic):
                    self.qid = qid
                    self.text = text
                    self.options = options
                    self.answer = answer
                    self.topic = topic

                def to_dict(self):
                    # out: a dictionary of the five values, ready for JSON
                    return {"qid": self.qid, "text": self.text, "options": self.options,
                            "answer": self.answer, "topic": self.topic}


            def mark(chosen, correct):
                # in: the letter typed ("" when skipped) and the right letter
                # out: 2 when right, -0.5 when wrong, 0 when skipped
                if chosen == "":
                    return 0
                if chosen == correct:
                    return 2
                return -0.5


            def move(box, points):
                # in: a box from 1 to 5, and the points just scored
                # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
                if points > 0:
                    return min(box + 1, 5)
                if points < 0:
                    return 1
                return box


            def pick(questions, boxes, n):
                # in: the questions, the boxes {qid as text: box}, how many to ask
                # out: n questions, lowest boxes first; a question with no box yet is in box 1
                return sorted(questions, key=lambda q: boxes.get(str(q.qid), 1))[:n]


            def weak_topics(missed):
                # in: the topics of the questions missed (wrong or skipped)
                # out: (topic, count) pairs, most missed first
                return Counter(missed).most_common()


            def count_new(questions, seen):
                # in: the questions, and a set of the qids (as text) already asked
                # out: how many questions have never been asked
                return sum(1 for q in questions if str(q.qid) not in seen)


            def days_left(today, exam_day):
                # in: two dates
                # out: whole days until the exam, or 0 once it has passed
                return max((exam_day - today).days + 1, 0)
          `,
        ],
        starter: py`
          # One fact per assert. Work out each answer by hand first.
          assert mark("B", "B") == 2
        `,
        solution: py`
          assert mark("B", "B") == 2
          assert mark("", "B") == 0
          assert move(4, -0.5) == 1
          qs = [Question(1, "a", [], "A", "X"), Question(2, "b", [], "A", "Y")]
          assert [q.qid for q in pick(qs, {"1": 3, "2": 1}, 1)] == [2]
          assert days_left(date(2026, 11, 14), date(2026, 11, 20)) == 6
        `,
        hints: [
          md`One broken engine gets a skipped question wrong. What should «mark("", "B")» give back?`,
          md`One moves a wrong answer to the wrong box. Test a wrong answer from a high box, like box 4.`,
          md`One picks from the wrong end, and one counts days wrongly. Give pick two questions in different boxes, and check one countdown by hand.`,
        ],
      },
      {
        id: "twist", stage: 4, carry: "s2", noStep: true, title: "Stage 4: Own Twist",
        task: md`
          Make the Study Buddy yours. Add one feature of your own, with a function «test_twist()» that holds **at least 3 asserts** about it, and call «test_twist()» in the program.

          Some ideas:

          - how many questions are in each box
          - your own questions, saved into the bank with «save_questions»
          - a percentage score, or your best topic
          - a chart of your history, as on Day 101

          Keep the session as it is: 3 questions, one «input()» each. The hidden tests check that everything from Stage 2 still works, and run your «test_twist()».
        `,
        files: { "questions.json": py`
          [
            {"qid": 1, "text": "Which Article of the Constitution abolishes untouchability?", "options": ["Article 14", "Article 17", "Article 21", "Article 32"], "answer": "B", "topic": "Polity"},
            {"qid": 2, "text": "In which year was the Battle of Plassey fought?", "options": ["1757", "1764", "1857", "1761"], "answer": "A", "topic": "History"},
            {"qid": 3, "text": "Which is the longest river in India?", "options": ["Godavari", "Yamuna", "Ganga", "Narmada"], "answer": "C", "topic": "Geography"},
            {"qid": 4, "text": "What is the chemical formula of common salt?", "options": ["KCl", "NaCl", "NaOH", "HCl"], "answer": "B", "topic": "Science"},
            {"qid": 5, "text": "Who was the first President of India?", "options": ["Jawaharlal Nehru", "B. R. Ambedkar", "S. Radhakrishnan", "Rajendra Prasad"], "answer": "D", "topic": "Polity"},
            {"qid": 6, "text": "Who founded the Maurya Empire?", "options": ["Ashoka", "Chandragupta Maurya", "Bindusara", "Harsha"], "answer": "B", "topic": "History"}
          ]
        ` },
        starter: py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json
          from collections import Counter
          from datetime import date

          EXAM_DAY = date(2027, 3, 1)  # change this to your own exam date


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  self.qid = qid
                  self.text = text
                  self.options = options
                  self.answer = answer
                  self.topic = topic

              def to_dict(self):
                  # out: a dictionary of the five values, ready for JSON
                  return {"qid": self.qid, "text": self.text, "options": self.options,
                          "answer": self.answer, "topic": self.topic}


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              with open(path, encoding="utf-8") as f:
                  rows = json.load(f)
              return [Question(r["qid"], r["text"], r["options"], r["answer"], r["topic"]) for r in rows]


          def save_questions(questions, path):
              # in: a list of Question objects and the name of a JSON file
              # out: nothing; the questions are written as dictionaries
              with open(path, "w", encoding="utf-8") as f:
                  json.dump([q.to_dict() for q in questions], f, indent=2)


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              if chosen == "":
                  return 0
              if chosen == correct:
                  return 2
              return -0.5


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              if points > 0:
                  return min(box + 1, 5)
              if points < 0:
                  return 1
              return box


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              return sorted(questions, key=lambda q: boxes.get(str(q.qid), 1))[:n]


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              try:
                  with open(path, encoding="utf-8") as f:
                      return json.load(f)
              except FileNotFoundError:
                  return {}


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(boxes, f)


          def load_history(path):
              # in: the name of a JSON file
              # out: the list of past sessions, or [] when there is no file yet
              try:
                  with open(path, encoding="utf-8") as f:
                      return json.load(f)
              except FileNotFoundError:
                  return []


          def save_history(history, path):
              # in: the list of past sessions and the name of a JSON file
              # out: nothing; the history is written to the file
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(history, f)


          def weak_topics(missed):
              # in: the topics of the questions missed (wrong or skipped)
              # out: (topic, count) pairs, most missed first
              return Counter(missed).most_common()


          def count_new(questions, seen):
              # in: the questions, and a set of the qids (as text) already asked
              # out: how many questions have never been asked
              return sum(1 for q in questions if str(q.qid) not in seen)


          def days_left(today, exam_day):
              # in: two dates
              # out: whole days until the exam, or 0 once it has passed
              return max((exam_day - today).days, 0)


          def test_mark():
              assert mark("B", "B") == 2
              assert mark("A", "B") == -0.5
              assert mark("", "B") == 0


          def test_move():
              assert move(1, 2) == 2
              assert move(5, 2) == 5
              assert move(4, -0.5) == 1
              assert move(3, 0) == 3


          test_mark()
          test_move()

          questions = load_questions("questions.json")
          boxes = load_boxes("boxes.json")
          score = 0
          missed = []
          for q in pick(questions, boxes, 3):
              print()
              print(q.text)
              for letter, option in zip("ABCD", q.options):
                  print(" ", letter + ".", option)
              chosen = input("Answer A to D, or press Enter to skip: ").strip().upper()
              points = mark(chosen, q.answer)
              score += points
              if points <= 0:
                  missed.append(q.topic)
              key = str(q.qid)
              boxes[key] = move(boxes.get(key, 1), points)
              print("Points:", points, "- now in box", boxes[key])
          save_boxes(boxes, "boxes.json")
          print("Score:", score)

          history = load_history("history.json")
          history.append({"date": date.today().strftime("%d-%m-%Y"), "score": score})
          save_history(history, "history.json")
          print("Sessions:", len(history))
          print("Best:", max(h["score"] for h in history))

          for topic, count in weak_topics(missed):
              print("Practise:", topic, count)
          print("New questions left:", count_new(questions, set(boxes)))
          print("Days to the exam:", days_left(date.today(), EXAM_DAY))
        `,
        solution: py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json
          from collections import Counter
          from datetime import date

          EXAM_DAY = date(2027, 3, 1)  # change this to your own exam date


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  self.qid = qid
                  self.text = text
                  self.options = options
                  self.answer = answer
                  self.topic = topic

              def to_dict(self):
                  # out: a dictionary of the five values, ready for JSON
                  return {"qid": self.qid, "text": self.text, "options": self.options,
                          "answer": self.answer, "topic": self.topic}


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              with open(path, encoding="utf-8") as f:
                  rows = json.load(f)
              return [Question(r["qid"], r["text"], r["options"], r["answer"], r["topic"]) for r in rows]


          def save_questions(questions, path):
              # in: a list of Question objects and the name of a JSON file
              # out: nothing; the questions are written as dictionaries
              with open(path, "w", encoding="utf-8") as f:
                  json.dump([q.to_dict() for q in questions], f, indent=2)


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              if chosen == "":
                  return 0
              if chosen == correct:
                  return 2
              return -0.5


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              if points > 0:
                  return min(box + 1, 5)
              if points < 0:
                  return 1
              return box


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              return sorted(questions, key=lambda q: boxes.get(str(q.qid), 1))[:n]


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              try:
                  with open(path, encoding="utf-8") as f:
                      return json.load(f)
              except FileNotFoundError:
                  return {}


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(boxes, f)


          def load_history(path):
              # in: the name of a JSON file
              # out: the list of past sessions, or [] when there is no file yet
              try:
                  with open(path, encoding="utf-8") as f:
                      return json.load(f)
              except FileNotFoundError:
                  return []


          def save_history(history, path):
              # in: the list of past sessions and the name of a JSON file
              # out: nothing; the history is written to the file
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(history, f)


          def weak_topics(missed):
              # in: the topics of the questions missed (wrong or skipped)
              # out: (topic, count) pairs, most missed first
              return Counter(missed).most_common()


          def count_new(questions, seen):
              # in: the questions, and a set of the qids (as text) already asked
              # out: how many questions have never been asked
              return sum(1 for q in questions if str(q.qid) not in seen)


          def days_left(today, exam_day):
              # in: two dates
              # out: whole days until the exam, or 0 once it has passed
              return max((exam_day - today).days, 0)


          def box_counts(boxes):
              # in: the boxes
              # out: how many questions are in each box, as {box: count}
              counts = {}
              for box in boxes.values():
                  counts[box] = counts.get(box, 0) + 1
              return counts


          def test_twist():
              assert box_counts({}) == {}
              assert box_counts({"1": 2, "2": 2}) == {2: 2}
              assert box_counts({"1": 1, "2": 5, "3": 1}) == {1: 2, 5: 1}


          def test_mark():
              assert mark("B", "B") == 2
              assert mark("A", "B") == -0.5
              assert mark("", "B") == 0


          def test_move():
              assert move(1, 2) == 2
              assert move(5, 2) == 5
              assert move(4, -0.5) == 1
              assert move(3, 0) == 3


          test_mark()
          test_move()

          questions = load_questions("questions.json")
          boxes = load_boxes("boxes.json")
          score = 0
          missed = []
          for q in pick(questions, boxes, 3):
              print()
              print(q.text)
              for letter, option in zip("ABCD", q.options):
                  print(" ", letter + ".", option)
              chosen = input("Answer A to D, or press Enter to skip: ").strip().upper()
              points = mark(chosen, q.answer)
              score += points
              if points <= 0:
                  missed.append(q.topic)
              key = str(q.qid)
              boxes[key] = move(boxes.get(key, 1), points)
              print("Points:", points, "- now in box", boxes[key])
          save_boxes(boxes, "boxes.json")
          print("Score:", score)

          history = load_history("history.json")
          history.append({"date": date.today().strftime("%d-%m-%Y"), "score": score})
          save_history(history, "history.json")
          print("Sessions:", len(history))
          print("Best:", max(h["score"] for h in history))

          for topic, count in weak_topics(missed):
              print("Practise:", topic, count)
          print("New questions left:", count_new(questions, set(boxes)))
          print("Days to the exam:", days_left(date.today(), EXAM_DAY))

          test_twist()
          print("Boxes:", box_counts(boxes))
        `,
        tests: [
          { inputs: ["B", "", "A"], contains: ["Score: 1.5", "Practise: History 1", "Practise: Geography 1", "New questions left: 3", "Days to the exam:"] },
          { inputs: ["", "", ""], py: py`
              from datetime import date
              expect("weak_topics", (["Polity", "History", "Polity"],), [("Polity", 2), ("History", 1)])
              qs = [new("Question", i, f"Q{i}", ["a", "b", "c", "d"], "A", "T") for i in range(1, 5)]
              expect("count_new", (qs, {"1", "3"}), 2)
              expect("days_left", (date(2026, 12, 5), date(2026, 12, 1)), 0)
              expect("mark", ("", "B"), 0)
              expect("move", (4, -0.5), 1)
            ` },
          { inputs: ["", "", ""], py: py`
              import ast
              twist = need("test_twist", "function")
              found = [n for n in ast.walk(ast.parse(CODE)) if isinstance(n, ast.FunctionDef) and n.name == "test_twist"]
              count = sum(isinstance(n, ast.Assert) for n in ast.walk(found[0])) if found else 0
              assert count >= 3, f"test_twist() has {count} assert{'' if count == 1 else 's'}. Write at least 3, one fact each, about your new feature."
              try:
                  twist()
              except AssertionError:
                  raise AssertionError("One of your own asserts in test_twist() fails. Work out its answer by hand again, then fix the feature or the assert.") from None
            ` },
        ],
        wrong: [py`
          # SSC Study Buddy
          # It asks SSC questions from my question bank, marks them +2, -0.5 or 0,
          # and asks the questions I find hard more often, using Leitner boxes.

          import json
          from collections import Counter
          from datetime import date

          EXAM_DAY = date(2027, 3, 1)  # change this to your own exam date


          class Question:
              # in: a number qid, the question text, a list of 4 options,
              #     the right letter ("A" to "D") and a topic
              def __init__(self, qid, text, options, answer, topic):
                  self.qid = qid
                  self.text = text
                  self.options = options
                  self.answer = answer
                  self.topic = topic

              def to_dict(self):
                  # out: a dictionary of the five values, ready for JSON
                  return {"qid": self.qid, "text": self.text, "options": self.options,
                          "answer": self.answer, "topic": self.topic}


          def load_questions(path):
              # in: the name of a JSON file holding a list of question dictionaries
              # out: a list of Question objects
              with open(path, encoding="utf-8") as f:
                  rows = json.load(f)
              return [Question(r["qid"], r["text"], r["options"], r["answer"], r["topic"]) for r in rows]


          def save_questions(questions, path):
              # in: a list of Question objects and the name of a JSON file
              # out: nothing; the questions are written as dictionaries
              with open(path, "w", encoding="utf-8") as f:
                  json.dump([q.to_dict() for q in questions], f, indent=2)


          def mark(chosen, correct):
              # in: the letter typed ("" when skipped) and the right letter
              # out: 2 when right, -0.5 when wrong, 0 when skipped
              if chosen == "":
                  return 0
              if chosen == correct:
                  return 2
              return -0.5


          def move(box, points):
              # in: a box from 1 to 5, and the points just scored
              # out: the new box: one up when right (5 at most), 1 when wrong, the same when skipped
              if points > 0:
                  return min(box + 1, 5)
              if points < 0:
                  return 1
              return box


          def pick(questions, boxes, n):
              # in: the questions, the boxes {qid as text: box}, how many to ask
              # out: n questions, lowest boxes first; a question with no box yet is in box 1
              return sorted(questions, key=lambda q: boxes.get(str(q.qid), 1))[:n]


          def load_boxes(path):
              # in: the name of a JSON file
              # out: the saved boxes, or {} when there is no file yet
              try:
                  with open(path, encoding="utf-8") as f:
                      return json.load(f)
              except FileNotFoundError:
                  return {}


          def save_boxes(boxes, path):
              # in: the boxes and the name of a JSON file
              # out: nothing; the boxes are written to the file
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(boxes, f)


          def load_history(path):
              # in: the name of a JSON file
              # out: the list of past sessions, or [] when there is no file yet
              try:
                  with open(path, encoding="utf-8") as f:
                      return json.load(f)
              except FileNotFoundError:
                  return []


          def save_history(history, path):
              # in: the list of past sessions and the name of a JSON file
              # out: nothing; the history is written to the file
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(history, f)


          def weak_topics(missed):
              # in: the topics of the questions missed (wrong or skipped)
              # out: (topic, count) pairs, most missed first
              return Counter(missed).most_common()


          def count_new(questions, seen):
              # in: the questions, and a set of the qids (as text) already asked
              # out: how many questions have never been asked
              return sum(1 for q in questions if str(q.qid) not in seen)


          def days_left(today, exam_day):
              # in: two dates
              # out: whole days until the exam, or 0 once it has passed
              return max((exam_day - today).days, 0)


          def box_counts(boxes):
              # in: the boxes
              # out: how many questions are in each box, as {box: count}
              counts = {}
              for box in boxes.values():
                  counts[box] = counts.get(box, 0) + 1
              return counts


          def test_twist():
              assert box_counts({}) == {}
              assert box_counts({"1": 2, "2": 2}) == {2: 2}


          def test_mark():
              assert mark("B", "B") == 2
              assert mark("A", "B") == -0.5
              assert mark("", "B") == 0


          def test_move():
              assert move(1, 2) == 2
              assert move(5, 2) == 5
              assert move(4, -0.5) == 1
              assert move(3, 0) == 3


          test_mark()
          test_move()

          questions = load_questions("questions.json")
          boxes = load_boxes("boxes.json")
          score = 0
          missed = []
          for q in pick(questions, boxes, 3):
              print()
              print(q.text)
              for letter, option in zip("ABCD", q.options):
                  print(" ", letter + ".", option)
              chosen = input("Answer A to D, or press Enter to skip: ").strip().upper()
              points = mark(chosen, q.answer)
              score += points
              if points <= 0:
                  missed.append(q.topic)
              key = str(q.qid)
              boxes[key] = move(boxes.get(key, 1), points)
              print("Points:", points, "- now in box", boxes[key])
          save_boxes(boxes, "boxes.json")
          print("Score:", score)

          history = load_history("history.json")
          history.append({"date": date.today().strftime("%d-%m-%Y"), "score": score})
          save_history(history, "history.json")
          print("Sessions:", len(history))
          print("Best:", max(h["score"] for h in history))

          for topic, count in weak_topics(missed):
              print("Practise:", topic, count)
          print("New questions left:", count_new(questions, set(boxes)))
          print("Days to the exam:", days_left(date.today(), EXAM_DAY))

          test_twist()
          print("Boxes:", box_counts(boxes))
        `],
        hints: [
          md`If a test says test_twist has too few asserts, add more facts about your feature, one assert each.`,
          md`If an earlier check fails now, your feature changed the session. Keep 3 questions and one input each.`,
          md`If your own assert fails, work out that case by hand: either the feature or the expected answer is wrong.`,
        ],
      },
      {
        id: "d1", kind: "drill", title: "Laptop Mission: your Study Buddy on your laptop",
        task: md`
          This pretend Command Prompt is in your «python-days» folder. Type the command and press Enter.

          On a phone, you may skip this. Phone users are excused from the mission below.
        `,
        steps: [
          { say: md`Run your Study Buddy. Type «python buddy.py» and press Enter.`,
            expect: ["python buddy.py", "py buddy.py"],
            output: "Which Article of the Constitution abolishes untouchability?\n  A. Article 14\n  B. Article 17\n  C. Article 21\n  D. Article 32\nAnswer A to D, or press Enter to skip: B\nPoints: 2 - now in box 2\n...\nScore: 1.5\nSessions: 1\nBest: 1.5" },
        ],
        mission: md`
          Now do it for real.

          1. Finish one Run in Stage 1. A Files panel then appears under it, with «questions.json» inside. Copy that text into a new file in IDLE, and save it as «questions.json» in «python-days».
          2. Make another new file with your Stage 4 program. Save it as «buddy.py» in the same folder.
          3. Run it three times with F5. Watch «boxes.json» and «history.json» appear in the folder. Your receipt: write the last Sessions and Best lines in your notebook.
        `,
        hints: [
          md`Type the words in the grey box exactly, then press Enter.`,
          md`There is one space between the word python and the file name.`,
          md`If python does not work on your laptop, py does the same job.`,
        ],
      },
      {
        id: "bonus", kind: "write", optional: true, noStep: true, title: "Bonus: the brief for a program of your own",
        task: md`
          Your next program starts like this one did. Write a **brief** for a program you would use yourself: what it does, who it is for, and what goes in and comes out. Then list 3 functions it needs, with their contracts, and build the **smallest** part of it.

          Mark it with your own asserts: at least 2, and they must pass. The hidden test only checks that the brief has at least 25 words, that there are 3 functions, and that your asserts run.
        `,
        starter: py`
          BRIEF = """
          Write one paragraph here: what your program does, who it is for,
          and what goes in and comes out.
          """

          # The 3 functions it needs, with what goes in and what comes out:
          # 1.
          # 2.
          # 3.

          # Build the smallest part, then check it with your own asserts.
        `,
        solution: py`
          BRIEF = """
          My Water Tracker counts the glasses of water I drink each day. I type a
          number after each glass, and it tells me how many glasses are left to
          reach 8, and which day this week was my best. It is for me, while I study.
          """

          # 1. add_glass(counts, day): adds one glass to that day's count
          # 2. left_today(count): how many glasses are left to reach 8
          # 3. best_day(counts): the day with the most glasses


          def add_glass(counts, day):
              pass


          def left_today(count):
              return max(8 - count, 0)


          def best_day(counts):
              pass


          assert left_today(0) == 8
          assert left_today(3) == 5
          assert left_today(10) == 0
          print("The smallest part works")
        `,
        tests: [
          { py: py`
              import ast
              brief = need("BRIEF", "str")
              assert "Write one paragraph here" not in brief, "Replace the words in BRIEF with your own paragraph."
              words = len(brief.split())
              assert words >= 25, f"The brief has {words} words. Write at least 25: what it does, who it is for, and what goes in and comes out."
              tree = ast.parse(CODE)
              functions = sum(isinstance(n, ast.FunctionDef) for n in ast.walk(tree))
              assert functions >= 3, f"Your program has {functions} function{'' if functions == 1 else 's'}. Write all 3 from your list, even as stubs with pass."
              asserts = sum(isinstance(n, ast.Assert) for n in ast.walk(tree))
              assert asserts >= 2, f"Your program has {asserts} assert{'' if asserts == 1 else 's'}. Check your smallest part with at least 2."
            ` },
        ],
        wrong: [py`
          BRIEF = """
          My Water Tracker counts the glasses of water I drink each day. I type a
          number after each glass, and it tells me how many glasses are left to
          reach 8, and which day this week was my best. It is for me, while I study.
          """


          def left_today(count):
              return max(8 - count, 0)


          assert left_today(0) == 8
          assert left_today(3) == 5
        `],
        hints: [
          md`If a test says to replace the words in BRIEF, write your own paragraph between the triple quotes.`,
          md`If a test counts too few functions, write the other functions from your list as stubs with pass.`,
          md`If the program stops with AssertionError, one of your asserts expects a different answer. Work it out by hand again.`,
        ],
      },
    ],
    keys: [
      md`A history is a list of dictionaries in a JSON file: load it, add one, save it.`,
      md`«Counter(...).most_common()» counts and sorts in one step.`,
      md`Pass dates in as parameters, so tests can choose the date.`,
      md`Prove a program by catching broken versions, then grow it with a feature and its own tests.`,
      md`Every new program starts the same way: a brief, a function list with contracts, and the smallest part first.`,
    ],
  });

  // ---------------------------------------------------------------- Day 105
  day({
    slug: "final-exam-graduation",
    title: "Final Exam and Graduation",
    goal: "Prove reading, fixing and writing on unseen work, then plan your next step.",
    minutes: 45,
    kind: "checkpoint",
    exam: true,
    needs: [70, 98, 104],
    win: "Today you can now read, fix and write programs you have never seen, and you have a plan for what comes next. This completes the main course.",
    learn: [
      md`
        ## How the final exam works

        Today you prove four skills on work you have never seen: reading code, fixing bugs, writing code, and remembering. There are no hints and no Step-through. Nothing is locked: your certificate needs every day done, not a score.

        There is one long **Cold Read** of a program with classes, with 5 questions. Then 2 Bug Clinics, 1 Make, and 5 question cards. Every item shows the day it comes from, like «(Day 95)».

        ## How to read a program with classes

        Read each class first. Its «__init__» tells you the attributes, and each method is one thing it can do. Then read the main program at the bottom, and follow the values on paper, one call at a time.
      `,
      pause(md`This exam takes about 45 minutes. Take a short break after the Cold Read. Your answers are saved.`),
      md`
        ## Your scores and your certificate

        At the end you see a score for each skill. They show what to practise next, not a pass or a fail. The certificate for all 105 days shows these scores, and how many Laptop Missions you did.

        ## What comes next

        You can read, fix and write real programs now. The next step is right here: **Level 10, Days 106 to 130**. It adds the tools working programmers use every day: smarter data tools, better classes, databases and proper test files. It ends with a final project. Alongside it, or after it:

        1. **One project of your own.** Use the brief you wrote on Day 104, or start a new one. Plan stubs, write tests first, and build in stages.
        2. **The official Python tutorial**, free from the people who make Python: [docs.python.org/3/tutorial](https://docs.python.org/3/tutorial/). Most of chapters 1 to 9 will feel familiar now.
        3. **CS50P**, Harvard's free course on programming with Python: [cs50.harvard.edu/python](https://cs50.harvard.edu/python/). Its problem sets are good practice on your laptop.

        Code a little on most days. Ten minutes on your laptop keeps what you have learned.
      `,
    ],
    quiz: [
      { q: md`(Day 99) What must every function that calls itself have?`,
        options: ["A base case that stops the calls", "A while loop inside it", "A global variable"], answer: 0, verify: false, mono: false,
        explain: md`Without a base case, or with calls that never reach it, the calls go on until RecursionError.`,
        why: [null, md`Recursion repeats by calling itself. It needs no loop.`, md`Each call has its own variables. No global is needed.`],
        skill: "memory" },
      { q: md`(Day 100) A program asks thousands of times whether a roll number is in the class. Which do you keep the roll numbers in?`,
        options: ["A set", "A list", "One long string"], answer: 0, verify: false, mono: false,
        explain: md`«in» on a set answers almost at once, however many items it holds.`,
        why: [null, md`«in» on a list checks one by one, so it gets slower as the class grows.`, md`Searching a string is slow, and 12 would also match inside 112.`],
        skill: "memory" },
      { q: md`(Day 95) What should «__str__» do?`,
        options: ["Give back the object's text with return", "Print the object with print", "Change the object's attributes"], answer: 0, verify: false, mono: false,
        explain: md`«print(obj)» and «str(obj)» use the text that «__str__» gives back.`,
        why: [null, md`«__str__» must return text. A print inside it shows the text but gives back None, which is an error.`, md`«__str__» only describes the object. It should not change it.`],
        skill: "memory" },
      { q: md`(Day 81) What does this show?`, code: py`
          import json

          data = json.loads(json.dumps({5: "five"}))
          print(list(data))
        `, options: ["['5']", "[5]", "['five']"], answer: 0,
        explain: md`JSON keys are always text, so the number key 5 comes back as «"5"».`,
        why: [null, md`The key came back as text, «'5'», not the number 5.`, md`«list» of a dictionary gives its keys, not its values.`],
        skill: "memory" },
      { q: md`(Day 97) What does this show?`, code: py`
          class Card:
              def __init__(self, name):
                  self.name = name

              def label(self):
                  return "Card: " + self.name

          class GoldCard(Card):
              def label(self):
                  return "Gold card: " + self.name

          for c in [Card("Asha"), GoldCard("Ravi")]:
              print(c.label())
        `, options: ["Card: Asha\nGold card: Ravi", "Card: Asha\nCard: Ravi", "Gold card: Asha\nGold card: Ravi"], answer: 0,
        explain: md`GoldCard keeps Card's «__init__», and its own «label» replaces Card's. Each object uses its own class's method.`,
        why: [null, md`GoldCard overrides «label», so Ravi's card uses the gold version.`, md`Asha's card is a plain Card, so it uses Card's label.`],
        skill: "memory" },
    ],
    practice: [
      {
        id: "read1", kind: "read", title: "Cold Read: the library (Days 94, 95, 96, 98)",
        task: md`Read the program slowly. Do not run it. Then answer the 5 questions.`,
        code: py`
          class Book:
              def __init__(self, title, copies):
                  self.title = title
                  self.copies = copies
                  self.waiting = []

              def __str__(self):
                  return f"{self.title} ({self.copies} left)"


          class Library:
              def __init__(self):
                  self.books = {}

              def add(self, title, copies):
                  self.books[title] = Book(title, copies)

              def lend(self, title, name):
                  book = self.books[title]
                  if book.copies > 0:
                      book.copies -= 1
                      return "Lent"
                  book.waiting.append(name)
                  return f"Waiting {len(book.waiting)}"

              def give_back(self, title):
                  book = self.books[title]
                  if book.waiting:
                      return book.waiting.pop(0)
                  book.copies += 1
                  return None


          lib = Library()
          lib.add("Polity", 1)
          lib.add("History", 2)
          print(lib.lend("Polity", "Asha"))
          print(lib.lend("Polity", "Ravi"))
          print(lib.lend("Polity", "Meera"))
          print(lib.give_back("Polity"))
          print(lib.lend("History", "Om"))
          for book in lib.books.values():
              print(book)
        `,
        questions: [
          { q: md`(Day 98) What does the fourth print line show?`, options: ["Ravi", "Meera", "None"], answer: 0,
            explain: md`Asha took the only copy. Ravi, then Meera, joined the waiting list. «pop(0)» gives the returned copy to the first one waiting: Ravi.`,
            skill: "read" },
          { q: md`(Day 95) What does the loop at the end print first?`, options: ["Polity (0 left)", "Polity (1 left)", "<__main__.Book object at 0x...>"], answer: 0,
            explain: md`The returned copy went straight to Ravi, so «copies» stayed 0. «print(book)» uses «__str__».`,
            skill: "read" },
          { q: md`(Day 96) At the end, what is «len(lib.books["Polity"].waiting)»?`, options: ["1", "2", "0"], answer: 0,
            explain: md`Ravi and Meera were waiting. Ravi left the list when the copy came back, so only Meera is left.`,
            skill: "read" },
          { q: md`(Day 98) What does the whole program do?`,
            options: [
              "It lends books, keeps a waiting list for each title, and gives a returned copy to the first person waiting",
              "It counts how many books each person borrowed",
              "It sorts the books by how many copies are left",
            ],
            answer: 0,
            explain: md`Each Book has copies and a waiting list. «lend» gives a copy or adds a name to the list, and «give_back» serves the list first.`,
            skill: "read" },
          { q: md`(Day 46) Which new line at the end stops the program with a KeyError?`,
            options: ["«lib.lend(\"Maths\", \"Zoya\")»", "«lib.give_back(\"History\")»", "«lib.add(\"Maths\", 0)»"],
            answer: 0,
            explain: md`No book called Maths was added, so «self.books["Maths"]» raises KeyError. Adding Maths, even with 0 copies, works.`,
            skill: "read" },
        ],
      },
      {
        id: "bug1", kind: "bug", title: "Bug Clinic: the wallet that never pays (Days 93, 94)",
        task: md`
          A wallet starts with ₹500. After spending ₹120 and then ₹80, it should show «300». It shows «500». Tap the faulty line, then fix it.
        `,
        starter: py`
          class Wallet:
              def __init__(self, balance):
                  self.balance = balance

              def spend(self, amount):
                  if amount > self.balance:
                      raise ValueError("Not enough money")
                  balance = self.balance - amount

          w = Wallet(500)
          w.spend(120)
          w.spend(80)
          print(w.balance)
        `,
        bugLines: [8],
        solution: py`
          class Wallet:
              def __init__(self, balance):
                  self.balance = balance

              def spend(self, amount):
                  if amount > self.balance:
                      raise ValueError("Not enough money")
                  self.balance = self.balance - amount

          w = Wallet(500)
          w.spend(120)
          w.spend(80)
          print(w.balance)
        `,
        tests: [
          { output: "300" },
          { py: py`
              w = new("Wallet", 100)
              method(w, "spend", 100)
              assert w.balance == 0, f"Wallet(100) after spending 100 should have 0, but it has {w.balance}."
              w = new("Wallet", 50)
              refused = False
              try:
                  w.spend(60)
              except ValueError:
                  refused = True
              assert refused, "Spending 60 from a wallet of 50 should raise ValueError."
              assert w.balance == 50, "A refused spend must not change the balance."
            ` },
        ],
        wrong: [py`
          class Wallet:
              def __init__(self, balance):
                  self.balance = balance

              def spend(self, amount):
                  if amount > self.balance:
                      raise ValueError("Not enough money")
                  self.balance = amount

          w = Wallet(500)
          w.spend(120)
          w.spend(80)
          print(w.balance)
        `],
      },
      {
        id: "bug2", kind: "bug", title: "Bug Clinic: the vowels that go missing (Days 87, 99)",
        task: md`
          «count_vowels» counts the vowels in a word, using recursion. «education» has 5 vowels: e, u, a, i and o. The program shows «4». Tap the faulty line, then fix it.
        `,
        starter: py`
          def count_vowels(text):
              if text == "":
                  return 0
              first = 1 if text[0] in "aeiou" else 0
              return first + count_vowels(text[2:])

          print(count_vowels("education"))
        `,
        bugLines: [5],
        solution: py`
          def count_vowels(text):
              if text == "":
                  return 0
              first = 1 if text[0] in "aeiou" else 0
              return first + count_vowels(text[1:])

          print(count_vowels("education"))
        `,
        tests: [
          { output: "5" },
          { py: py`
              for word, want in [("", 0), ("sky", 0), ("aeiou", 5), ("banana", 3), ("a", 1)]:
                  expect("count_vowels", (word,), want)
            ` },
        ],
        wrong: [py`
          def count_vowels(text):
              if text == "":
                  return 0
              first = 1 if text[0] in "aeiou" else 0
              return count_vowels(text[1:])

          print(count_vowels("education"))
        `],
      },
      {
        id: "make", kind: "make", title: "Make: a marks register (Days 92 to 95)",
        task: md`
          From a blank page, write a class «Student»:

          - «Student(name)» starts with no marks.
          - «add(mark)» adds one mark. A mark below 0 or above 100 raises «ValueError», and is not added.
          - «average()» gives back the average of the marks, rounded to 1 decimal place, or 0 when there are none.
          - Printing a Student shows the name and the average, like «Asha: 72.5».

          Then run these lines:

          : s = Student("Asha")
          : for m in [70, 75]:
          :     s.add(m)
          : print(s)

          It should print:

          | Asha: 72.5
        `,
        starter: py``,
        solution: py`
          class Student:
              def __init__(self, name):
                  self.name = name
                  self.marks = []

              def add(self, mark):
                  if mark < 0 or mark > 100:
                      raise ValueError("A mark must be from 0 to 100")
                  self.marks.append(mark)

              def average(self):
                  if not self.marks:
                      return 0
                  return round(sum(self.marks) / len(self.marks), 1)

              def __str__(self):
                  return f"{self.name}: {self.average()}"

          s = Student("Asha")
          for m in [70, 75]:
              s.add(m)
          print(s)
        `,
        tests: [
          { output: "Asha: 72.5" },
          { py: py`
              s = new("Student", "Ravi")
              assert method(s, "average") == 0, "A Student with no marks should have an average of 0."
              for m in [33, 34, 34]:
                  method(s, "add", m)
              assert method(s, "average") == 33.7, f"The average of 33, 34 and 34 is 33.666..., which rounds to 33.7, but average() gave {s.average()!r}."
              assert str(s) == "Ravi: 33.7", f"Printing the Student should show 'Ravi: 33.7', but it shows {str(s)!r}."
              for bad in [-1, 101]:
                  refused = False
                  try:
                      s.add(bad)
                  except ValueError:
                      refused = True
                  assert refused, f"add({bad}) should raise ValueError."
              assert method(s, "average") == 33.7, "A refused mark must not be added."
              t = new("Student", "Om")
              method(t, "add", 0)
              method(t, "add", 100)
              assert method(t, "average") == 50, "0 and 100 are allowed marks: their average is 50."
            ` },
        ],
        wrong: [py`
          class Student:
              def __init__(self, name):
                  self.name = name
                  self.marks = []

              def add(self, mark):
                  self.marks.append(mark)
                  if mark < 0 or mark > 100:
                      raise ValueError("A mark must be from 0 to 100")

              def average(self):
                  if not self.marks:
                      return 0
                  return round(sum(self.marks) / len(self.marks), 1)

              def __str__(self):
                  return f"{self.name}: {self.average()}"

          s = Student("Asha")
          for m in [70, 75]:
              s.add(m)
          print(s)
        `, py`
          class Student:
              def __init__(self, name):
                  self.name = name
                  self.marks = []

              def add(self, mark):
                  if mark < 0 or mark > 100:
                      raise ValueError("A mark must be from 0 to 100")
                  self.marks.append(mark)

              def average(self):
                  if not self.marks:
                      return 0
                  return sum(self.marks) // len(self.marks)

              def __str__(self):
                  return f"{self.name}: {self.average()}"

          s = Student("Asha")
          for m in [70, 75]:
              s.add(m)
          print(s)
        `, py`
          class Student:
              def __init__(self, name):
                  self.name = name
                  self.marks = []

              def add(self, mark):
                  if mark <= 0 or mark >= 100:
                      raise ValueError("A mark must be from 0 to 100")
                  self.marks.append(mark)

              def average(self):
                  if not self.marks:
                      return 0
                  return round(sum(self.marks) / len(self.marks), 1)

              def __str__(self):
                  return f"{self.name}: {self.average()}"

          s = Student("Asha")
          for m in [70, 75]:
              s.add(m)
          print(s)
        `],
      },
    ],
    keys: [
      md`Read a program with classes in order: each class's «__init__», then its methods, then the main program.`,
      md`Your scores show what to practise next. They are a map, not a judgement.`,
      md`Next: one project of your own, the official tutorial, and CS50P.`,
      md`Code a little on most days, on your laptop.`,
    ],
  });
})();
