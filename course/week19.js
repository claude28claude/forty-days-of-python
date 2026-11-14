// Week 19 - The Last Mile (Days 126 to 130).
(function () {
  const { day, md, py, ex, code, tip, warn, ask, pause } = window.Course;

  // ---------------------------------------------------------------- Day 126
  day({
    slug: "merge-sort",
    title: "Merge Sort: Fast Sorting",
    goal: "Sort by splitting and merging, and count its steps against selection sort.",
    minutes: 45,
    needs: [99, 100],
    win: "Today you can now sort a list with merge sort, and explain why it is so much faster than selection sort.",
    learn: [
      md`
        ## Merging two sorted lists

        On Day 100, selection sort took about n × n ÷ 2 steps. **Merge sort** is much faster, and it starts with a simple job: join two lists that are **already sorted** into one sorted list. Look at the front of each list, take the smaller item, and repeat. Guess the output.
      `,
      ex(py`
        def merge(a, b):
            result = []
            i = j = 0
            while i < len(a) and j < len(b):
                if a[i] <= b[j]:
                    result.append(a[i])
                    i += 1
                else:
                    result.append(b[j])
                    j += 1
            result += a[i:]
            result += b[j:]
            return result

        print(merge([1, 4, 9], [2, 3, 10]))
      `, { predict: ["[1, 2, 3, 4, 9, 10]", "[1, 4, 9, 2, 3, 10]", "[1, 2, 3, 4, 9]"], answer: 0 }),
      md`
        - «i» marks the front of «a», and «j» the front of «b».
        - Each round takes one item, so merging is quick: one step for each item.
        - When one list runs out, the loop stops. The last two lines add whatever is left of the other list. Here that is «[10]».
      `,
      md`
        ## Split, sort, merge

        Now the clever part. To sort a list: split it in half, sort each half, then merge the two halves. How do you sort each half? With merge sort itself (Day 99). A list of 0 or 1 items is already sorted, so that is where it stops. Guess the output.
      `,
      ex(py`
        def merge(a, b):
            result = []
            i = j = 0
            while i < len(a) and j < len(b):
                if a[i] <= b[j]:
                    result.append(a[i])
                    i += 1
                else:
                    result.append(b[j])
                    j += 1
            result += a[i:]
            result += b[j:]
            return result

        def merge_sort(items):
            if len(items) <= 1:
                return items
            mid = len(items) // 2
            left = merge_sort(items[:mid])
            right = merge_sort(items[mid:])
            return merge(left, right)

        nums = [5, 2, 9, 1]
        print(merge_sort(nums), nums)
      `, { predict: ["[1, 2, 5, 9] [5, 2, 9, 1]", "[1, 2, 5, 9] [1, 2, 5, 9]", "[2, 5, 1, 9] [5, 2, 9, 1]"], answer: 0 }),
      md`
        «[5, 2, 9, 1]» splits into «[5, 2]» and «[9, 1]», and those split into single items. Then the merges build back up: «[2, 5]» and «[1, 9]», then «[1, 2, 5, 9]». Slices make new lists, so «nums» is not changed.
      `,
      pause(md`Good place for a break. Next: counting the steps.`),
      md`
        ## Counting the steps

        Let us count how many times «merge» compares two items, and compare that with selection sort. Guess the output.
      `,
      ex(py`
        counter = {"steps": 0}

        def merge(a, b):
            result = []
            i = j = 0
            while i < len(a) and j < len(b):
                counter["steps"] += 1
                if a[i] <= b[j]:
                    result.append(a[i])
                    i += 1
                else:
                    result.append(b[j])
                    j += 1
            result += a[i:]
            result += b[j:]
            return result

        def merge_sort(items):
            if len(items) <= 1:
                return items
            mid = len(items) // 2
            return merge(merge_sort(items[:mid]), merge_sort(items[mid:]))

        for n in [8, 1000]:
            counter["steps"] = 0
            merge_sort(list(range(n, 0, -1)))
            print(n, "items:", counter["steps"], "steps; selection sort:", n * (n - 1) // 2)
      `, { predict: ["8 items: 12 steps; selection sort: 28\n1000 items: 5044 steps; selection sort: 499500", "8 items: 28 steps; selection sort: 28\n1000 items: 499500 steps; selection sort: 499500", "8 items: 8 steps; selection sort: 28\n1000 items: 1000 steps; selection sort: 499500"], answer: 0 }),
      md`
        For 1000 items, merge sort needs about 5 thousand steps, and selection sort about 5 lakh. Why? Halving 1000 down to single items takes only about 10 levels, and each level merges about 1000 items. That is about n × (the number of halvings) steps, written O(n log n). As lists grow, the gap gets huge.
      `,
      md`
        ## Why sorted is still best

        Python's own «sorted» and «.sort()» use **Timsort**, a cousin of merge sort, written in fast C code. Like your merge, it keeps items that tie in the order they came in. This is called a **stable** sort.
      `,
      tip(md`In real work, use «sorted(items, key=...)». You wrote merge sort to understand the idea of splitting a big job into halves. The same idea runs through many fast programs.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          def merge(a, b):
              result = []
              i = j = 0
              while i < len(a) and j < len(b):
                  if a[i] <= b[j]:
                      result.append(a[i])
                      i += 1
                  else:
                      result.append(b[j])
                      j += 1
              result += a[i:]
              result += b[j:]
              return result

          print(merge([3, 8], [1, 2, 5]))
        `, options: ["[1, 2, 3, 5, 8]", "[3, 8, 1, 2, 5]", "[1, 2, 3, 5]"], answer: 0,
        explain: md`It takes 1, 2, 3 and 5 in turn. Then «b» has run out, and «a[i:]» adds the 8.`,
        why: [null, md`That is just one list after the other. Merge takes the smaller front item each time.`, md`The last line adds what is left, so the 8 is not lost.`],
        skill: "trace" },
      { q: md`What does this line in merge sort do?`, code: py`
          if len(items) <= 1:
              return items
        `, options: ["It stops the splitting: a list of 0 or 1 items is already sorted", "It removes the last item", "It sorts a list of one item"], answer: 0, verify: false, mono: false,
        explain: md`Every function that calls itself needs a case where it stops (Day 99). This is it.`,
        why: [null, md`It gives the list back unchanged.`, md`A one-item list needs no sorting at all.`],
        skill: "read" },
      { q: md`A merge sometimes loses the biggest numbers: «[1, 9]» and «[2, 3]» give «[1, 2, 3]». What is the most likely mistake?`,
        options: ["The lines that add the leftovers, «a[i:]» and «b[j:]», are missing", "The list was split in the wrong place", "It uses «<=» instead of «<»"], answer: 0, verify: false, mono: false,
        explain: md`The loop stops when one list runs out. The 9 was still waiting in the other list.`,
        why: [null, md`This happens in a single merge, before any splitting.`, md`That only changes which equal item goes first.`],
        skill: "debug" },
      { q: md`About how many steps does merge sort take for n items?`,
        options: ["About n × log n: n steps for each of about log n levels of halving", "About n × n", "About n"], answer: 0, verify: false, mono: false,
        explain: md`For 1000 items, there are about 10 levels, and each level merges about 1000 items.`,
        why: [null, md`That is selection sort, with its loop inside a loop.`, md`It is a little more than n, because every level of halving needs its own merges.`],
        skill: "memory" },
      { q: md`You need to sort ten lakh exam results by marks for a real report. What should you use?`,
        options: ["«sorted(results, key=...)»", "Your own merge sort", "Selection sort"], answer: 0, verify: false, mono: false,
        explain: md`Python's Timsort is fast, stable and well tested. Write your own only to learn.`,
        why: [null, md`It works, but it is slower than Python's sort, which is written in C.`, md`For ten lakh items, n × n steps would take far too long.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: one merge",
        task: md`Answer each question without running the program.`,
        code: py`
          def merge(a, b):
              result = []
              i = j = 0
              while i < len(a) and j < len(b):
                  if a[i] <= b[j]:
                      result.append(a[i])
                      i += 1
                  else:
                      result.append(b[j])
                      j += 1
              result += a[i:]
              result += b[j:]
              return result

          print(merge([2, 7], [3, 5, 9]))
        `,
        ask: [{ line: 11, name: "result" }, { output: true }],
        hints: [
          md`Compare the fronts: 2 or 3, then 7 or 3, then 7 or 5, then 7 or 9.`,
          md`After 7 goes in, «a» has run out, so the loop stops. «a[i:]» adds nothing.`,
          md`«b[j:]» then adds the 9 that was still waiting.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: the merges build up",
        task: md`Answer each question without running the program. Each merge prints its result.`,
        code: py`
          def merge(a, b):
              result = []
              i = j = 0
              while i < len(a) and j < len(b):
                  if a[i] <= b[j]:
                      result.append(a[i])
                      i += 1
                  else:
                      result.append(b[j])
                      j += 1
              result += a[i:]
              result += b[j:]
              return result

          def merge_sort(items):
              if len(items) <= 1:
                  return items
              mid = len(items) // 2
              left = merge_sort(items[:mid])
              right = merge_sort(items[mid:])
              merged = merge(left, right)
              print(merged)
              return merged

          merge_sort([4, 1, 3, 2])
        `,
        ask: [{ line: 18, hit: 1, name: "mid" }, { output: true }],
        hints: [
          md`The first call has 4 items, so «mid» is «4 // 2».`,
          md`The left half, «[4, 1]», is sorted and printed first. Then the right half.`,
          md`The last print is the big merge of the two sorted halves.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: the merge",
        task: md`
          Put the lines in order to make «merge», which joins two sorted lists into one. The program prints:

          | [1, 2, 6, 7, 8]
        `,
        solution: py`
          def merge(a, b):
              result = []
              i = j = 0
              while i < len(a) and j < len(b):
                  if a[i] <= b[j]:
                      result.append(a[i])
                      i += 1
                  else:
                      result.append(b[j])
                      j += 1
              result += a[i:]
              result += b[j:]
              return result
          print(merge([2, 6, 8], [1, 7]))
        `,
        distractors: ["    while i < len(a) or j < len(b):"],
        tests: [{ output: "[1, 2, 6, 7, 8]" }, { py: py`
          expect("merge", [[1, 5], [2, 3, 4]], [1, 2, 3, 4, 5])
          expect("merge", [[], [3]], [3])
        ` }],
        hints: [
          md`If you see an IndexError, the loop goes on after one list runs out. Use «and»: keep going only while both lists have items.`,
          md`If numbers are missing from the end, the two leftover lines must come after the loop, not inside it.`,
          md`If the list comes out in the wrong order, «i += 1» belongs with «a[i]», and «j += 1» with «b[j]».`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the numbers that appear twice",
        task: md`
          The program sorts the numbers typed. For «5 2 9 1» it should print «[1, 2, 5, 9]», but some numbers appear twice. Tap the line that causes it, then fix it.
        `,
        starter: py`
          def merge(a, b):
              result = []
              i = j = 0
              while i < len(a) and j < len(b):
                  if a[i] <= b[j]:
                      result.append(a[i])
                      i += 1
                  else:
                      result.append(b[j])
                      j += 1
              result += a[i:]
              result += b[i:]
              return result

          def merge_sort(items):
              if len(items) <= 1:
                  return items
              mid = len(items) // 2
              return merge(merge_sort(items[:mid]), merge_sort(items[mid:]))

          nums = [int(x) for x in input("Numbers: ").split()]
          print(merge_sort(nums))
        `,
        bugLines: [12],
        solution: py`
          def merge(a, b):
              result = []
              i = j = 0
              while i < len(a) and j < len(b):
                  if a[i] <= b[j]:
                      result.append(a[i])
                      i += 1
                  else:
                      result.append(b[j])
                      j += 1
              result += a[i:]
              result += b[j:]
              return result

          def merge_sort(items):
              if len(items) <= 1:
                  return items
              mid = len(items) // 2
              return merge(merge_sort(items[:mid]), merge_sort(items[mid:]))

          nums = [int(x) for x in input("Numbers: ").split()]
          print(merge_sort(nums))
        `,
        tests: [
          { inputs: ["5 2 9 1"], output: "[1, 2, 5, 9]" },
          { inputs: ["3 3 1"], output: "[1, 3, 3]" },
          { inputs: ["7"], output: "[7]" },
          { inputs: ["10 9 8 7 6 5"], output: "[5, 6, 7, 8, 9, 10]" },
        ],
        wrong: [py`
          def merge(a, b):
              result = []
              i = j = 0
              while i < len(a) and j < len(b):
                  if a[i] <= b[j]:
                      result.append(a[i])
                      i += 1
                  else:
                      result.append(b[j])
                      j += 1
              result += a[i:]
              result += b
              return result

          def merge_sort(items):
              if len(items) <= 1:
                  return items
              mid = len(items) // 2
              return merge(merge_sort(items[:mid]), merge_sort(items[mid:]))

          nums = [int(x) for x in input("Numbers: ").split()]
          print(merge_sort(nums))
        `],
        hints: [
          md`The leftovers of «b» start at its own marker, not at «a»'s marker.`,
          md`«i» counts through «a», and «j» counts through «b».`,
          md`If numbers still repeat, take only what is left of «b», from «j» on, not the whole list.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: biggest first",
        task: md`
          Change one comparison so merge sort puts the biggest numbers first. The program should print:

          | [9, 5, 2, 1]
        `,
        starter: py`
          def merge(a, b):
              result = []
              i = j = 0
              while i < len(a) and j < len(b):
                  if a[i] <= b[j]:
                      result.append(a[i])
                      i += 1
                  else:
                      result.append(b[j])
                      j += 1
              result += a[i:]
              result += b[j:]
              return result

          def merge_sort(items):
              if len(items) <= 1:
                  return items
              mid = len(items) // 2
              return merge(merge_sort(items[:mid]), merge_sort(items[mid:]))

          print(merge_sort([5, 2, 9, 1]))
        `,
        solution: py`
          def merge(a, b):
              result = []
              i = j = 0
              while i < len(a) and j < len(b):
                  if a[i] >= b[j]:
                      result.append(a[i])
                      i += 1
                  else:
                      result.append(b[j])
                      j += 1
              result += a[i:]
              result += b[j:]
              return result

          def merge_sort(items):
              if len(items) <= 1:
                  return items
              mid = len(items) // 2
              return merge(merge_sort(items[:mid]), merge_sort(items[mid:]))

          print(merge_sort([5, 2, 9, 1]))
        `,
        tests: [{ output: "[9, 5, 2, 1]" }, { py: py`
          expect("merge_sort", [[3, 8, 1, 8, 2]], [8, 8, 3, 2, 1])
        ` }, { avoids: ["call:sorted", "method:sort", "method:reverse"] }],
        wrong: [py`
          def merge(a, b):
              result = []
              i = j = 0
              while i < len(a) and j < len(b):
                  if a[i] < b[j]:
                      result.append(a[i])
                      i += 1
                  else:
                      result.append(b[j])
                      j += 1
              result += a[i:]
              result += b[j:]
              return result

          def merge_sort(items):
              if len(items) <= 1:
                  return items
              mid = len(items) // 2
              return merge(merge_sort(items[:mid]), merge_sort(items[mid:]))

          print(merge_sort([5, 2, 9, 1]))
        `],
        hints: [
          md`If the smallest still comes first, the comparison still takes the smaller front item.`,
          md`Take the bigger front item instead: turn «<=» round to «>=».`,
          md`Only the comparison changes. The leftover lines stay as they are.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: words by length",
        task: md`
          From a blank page. Write «merge(a, b)» and «merge_sort(words)», which sort words by their length, shortest first. Words of the same length must stay in the order they were typed: a stable sort. Do not use «sorted» or «.sort()».

          Then ask for words on one line, and print them sorted, with spaces between. For «banana fig apple kiwi date» it shows:

          | fig kiwi date apple banana
        `,
        starter: py``,
        solution: py`
          def merge(a, b):
              result = []
              i = j = 0
              while i < len(a) and j < len(b):
                  if len(a[i]) <= len(b[j]):
                      result.append(a[i])
                      i += 1
                  else:
                      result.append(b[j])
                      j += 1
              result += a[i:]
              result += b[j:]
              return result

          def merge_sort(words):
              if len(words) <= 1:
                  return words
              mid = len(words) // 2
              return merge(merge_sort(words[:mid]), merge_sort(words[mid:]))

          words = input("Words: ").split()
          print(" ".join(merge_sort(words)))
        `,
        tests: [
          { inputs: ["banana fig apple kiwi date"], output: "fig kiwi date apple banana" },
          { inputs: ["dd cc bb aa"], output: "dd cc bb aa" },
          { inputs: ["tea"], output: "tea" },
          { inputs: ["x", ""], py: py`
          expect("merge_sort", [["ccc", "a", "bb", "z"]], ["a", "z", "bb", "ccc"])
          expect("merge_sort", [[]], [])
          `, spare_inputs: true },
          { avoids: ["call:sorted", "method:sort"] },
        ],
        wrong: [py`
          def merge(a, b):
              result = []
              i = j = 0
              while i < len(a) and j < len(b):
                  if len(a[i]) < len(b[j]):
                      result.append(a[i])
                      i += 1
                  else:
                      result.append(b[j])
                      j += 1
              result += a[i:]
              result += b[j:]
              return result

          def merge_sort(words):
              if len(words) <= 1:
                  return words
              mid = len(words) // 2
              return merge(merge_sort(words[:mid]), merge_sort(words[mid:]))

          words = input("Words: ").split()
          print(" ".join(merge_sort(words)))
        `],
        hints: [
          md`If «dd cc bb aa» comes out in a new order, equal lengths are not kept as typed. On a tie, take from the left list first: use «<=».`,
          md`If the words come out A to Z, you compare the words themselves. Compare their lengths with «len».`,
          md`If words go missing, add the leftovers of both lists after the loop.`,
        ],
      },
    ],
    keys: [
      md`Merging two sorted lists takes the smaller front item each time, then adds the leftovers.`,
      md`Merge sort splits the list in half, sorts each half with itself, and merges them. 0 or 1 items is already sorted.`,
      md`It takes about n × log n steps; selection sort takes about n × n.`,
      md`Taking from the left on a tie («<=») makes it stable: equal items keep their order.`,
      md`In real work, use «sorted»: Python's Timsort is fast and stable.`,
    ],
  });

  // ---------------------------------------------------------------- Day 127
  day({
    slug: "command-line-tools",
    title: "Command-Line Tools with argparse",
    goal: "Turn a program into a laptop tool that takes words after its name.",
    minutes: 45,
    needs: [90, 109],
    win: "Today you can now turn a program into a command-line tool, with arguments, options, defaults and a help page that writes itself.",
    learn: [
      md`
        ## Words after the name

        On a laptop you run a program with «python greet.py» (Day 90). Real tools take words after the name, like «python greet.py Asha --times 2». Then nobody needs to answer «input()» questions, and other programs can run your tool too. Python puts those words in a list, «sys.argv». The first item is always the program's own name. Guess the output.
      `,
      ex(py`
        import sys

        print(sys.argv)
        print(len(sys.argv), sys.argv[0])
      `, { predict: ["['main.py']\n1 main.py", "[]\n0", "['main.py', 'Asha']\n2 main.py"], answer: 0 }),
      md`
        This page runs your program as «main.py», with no extra words. On a laptop, «python greet.py Asha» would give «['greet.py', 'Asha']». The words always arrive as text, even «2».
      `,
      md`
        ## argparse does the work

        Reading «sys.argv» by hand gets messy fast. The «argparse» module, which comes with Python, does it for you. You say which words you expect, and it checks them. On a laptop, «parser.parse_args()» reads «sys.argv». Here we give it a list of words instead, as if they were typed. Guess the output.
      `,
      ex(py`
        import argparse

        parser = argparse.ArgumentParser(description="Greets someone.")
        parser.add_argument("name", help="who to greet")
        parser.add_argument("--times", type=int, default=1, help="how many times")

        args = parser.parse_args(["Asha", "--times", "2"])
        for _ in range(args.times):
            print("Hello,", args.name)
        print(parser.parse_args(["Ravi"]).times)
      `, { predict: ["Hello, Asha\nHello, Asha\n1", "Hello, Asha\n1", "Hello, Asha\nHello, Asha\n2"], answer: 0 }),
      md`
        - «add_argument("name")» is a **positional argument**: it must be given, and its place decides what it is.
        - «"--times"» is an **option**: it may be left out. «default=1» is used then.
        - «type=int» turns the text into a whole number, and refuses anything else.
        - «args.name» and «args.times» hold the answers. A dash inside a name becomes «_»: «--pass-mark» is read as «args.pass_mark».
      `,
      pause(md`Good place for a break. Next: switches, lists and help.`),
      md`
        ## Switches and lists

        «action="store_true"» makes an on/off switch: «args.shout» is True only if «--shout» is typed. «nargs="+"» takes one or more words into a list. Guess the output.
      `,
      ex(py`
        import argparse

        parser = argparse.ArgumentParser()
        parser.add_argument("marks", nargs="+", type=int)
        parser.add_argument("--shout", action="store_true")

        args = parser.parse_args(["72", "35", "90", "--shout"])
        text = f"total {sum(args.marks)}"
        print(text.upper() if args.shout else text)
        print(parser.parse_args(["5"]).shout)
      `, { predict: ["TOTAL 197\nFalse", "total 197\nFalse", "TOTAL 197\nTrue"], answer: 0 }),
      md`
        ## Help that writes itself

        Every argparse tool gets «--help» for free, built from your descriptions. Run this one.
      `,
      ex(py`
        import argparse

        parser = argparse.ArgumentParser(description="Greets someone.")
        parser.add_argument("name", help="who to greet")
        parser.add_argument("--times", type=int, default=1, help="how many times")
        parser.parse_args(["--help"])
        print("This line never runs.")
      `),
      md`
        After the help, argparse ends the program. Wrong words end it too, with a clear message. Run this one: «two» is not a whole number.
      `,
      ex(py`
        import argparse

        parser = argparse.ArgumentParser()
        parser.add_argument("--times", type=int, default=1)
        parser.parse_args(["--times", "two"])
        print("This line never runs.")
      `),
      tip(md`A good habit: put the tool in «def main(argv=None):» and call «parser.parse_args(argv)». On a laptop, «main()» reads the typed words. In a test, «main(["72", "35"])» gives the words yourself.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          import argparse

          parser = argparse.ArgumentParser()
          parser.add_argument("city")
          parser.add_argument("--days", type=int, default=3)
          args = parser.parse_args(["Pune"])
          print(args.city, args.days * 2)
        `, options: ["Pune 6", "Pune 33", "Pune None"], answer: 0,
        explain: md`«--days» was left out, so the default 3 is used. It is a whole number, so 3 × 2 is 6.`,
        why: [null, md`«type=int» and the whole-number default mean it is 3, not «"3"».`, md`The default fills it in when the option is left out.`],
        skill: "trace" },
      { q: md`On a laptop, what words does this tool expect?`, code: py`
          parser.add_argument("file")
          parser.add_argument("--lines", type=int, default=10)
          parser.add_argument("--quiet", action="store_true")
        `, options: ["A file name, and if wanted, «--lines» with a number and the «--quiet» switch", "Exactly three words", "Only «--lines» and «--quiet»"], answer: 0, verify: false, mono: false,
        explain: md`«file» must be given. The two options may be left out: «--lines» then means 10, and «--quiet» means False.`,
        why: [null, md`Options may be left out. Only the positional «file» is needed.`, md`«file» has no dashes, so it must always be given.`],
        skill: "read" },
      { q: md`A tool does «args.times * "Hi "», and «--times 3» stops with «can't multiply sequence by non-int of type 'str'». What was forgotten?`,
        options: ['«type=int» in «add_argument("--times", ...)»', "«default=1»", '«action="store_true"»'], answer: 0, verify: false, mono: false,
        explain: md`Typed words always arrive as text. «type=int» turns «"3"» into 3.`,
        why: [null, md`A default only helps when the option is left out.`, md`That makes an on/off switch, not a number.`],
        skill: "debug" },
      { q: md`What is in «sys.argv» when you run «python marks.py 72 35» on a laptop?`,
        options: ["«['marks.py', '72', '35']»", "«[72, 35]»", "«['72', '35']»"], answer: 0, verify: false, mono: false,
        explain: md`The program's name comes first, and every word is text.`,
        why: [null, md`They are text, not numbers, and the name comes first.`, md`The program's own name is always the first item.`],
        skill: "memory" },
      { q: md`A tool needs a city, and may be told «--metric». Which is the best way to read it?`,
        options: ['argparse, with «"city"» and «"--metric", action="store_true"»',"«sys.argv[1]» and «sys.argv[2]»", "Two «input()» questions"], answer: 0, verify: false, mono: false,
        explain: md`argparse checks the words, handles the left-out switch, and writes the help.`,
        why: [null, md`That crashes when «--metric» is left out, and has no help.`, md`A command-line tool takes its words after its name, so other programs can run it.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: defaults",
        task: md`Answer each question without running the program.`,
        code: py`
          import argparse

          parser = argparse.ArgumentParser()
          parser.add_argument("item")
          parser.add_argument("--qty", type=int, default=1)
          parser.add_argument("--price", type=int, default=10)
          args = parser.parse_args(["chai", "--price", "15"])
          total = args.qty * args.price
          print(args.item, total)
        `,
        ask: [{ line: 8, name: "total" }, { output: true }],
        hints: [
          md`«--qty» was left out, so its default is used.`,
          md`«--price 15» was given, and «type=int» makes it the number 15.`,
          md`The total is 1 × 15.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: the switch",
        task: md`Answer each question without running the program.`,
        code: py`
          import argparse

          parser = argparse.ArgumentParser()
          parser.add_argument("words", nargs="+")
          parser.add_argument("--count", action="store_true")
          first = parser.parse_args(["tea", "and", "toast"])
          second = parser.parse_args(["hi", "--count"])
          n = len(first.words)
          print(n, first.count, second.count)
        `,
        ask: [{ line: 8, name: "n" }, { output: true }],
        hints: [
          md`«nargs="+"» collects all the words into one list.`,
          md`The first call did not type «--count», so it is False.`,
          md`The second call typed «--count», so it is True.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: a repeat tool",
        task: md`
          Put the lines in order. The tool takes a word and an optional «--times». It prints:

          | ha ha ha
        `,
        solution: py`
          import argparse
          parser = argparse.ArgumentParser()
          parser.add_argument("word")
          parser.add_argument("--times", type=int, default=2)
          args = parser.parse_args(["ha", "--times", "3"])
          print(" ".join([args.word] * args.times))
        `,
        distractors: ['parser.add_argument("--times", default=2)'],
        tests: [{ output: "ha ha ha" }],
        hints: [
          md`If you see «can't multiply sequence by non-int», the times arrive as text. Use the line with «type=int».`,
          md`If you see «unrecognized arguments», the «--times» option must be added before «parse_args».`,
          md`If you see a NameError for parser, the line that makes it must come right after the import.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the times that are text",
        task: md`
          The tool prints a word several times. «main(["Hi", "--times", "3"])» should print «Hi» three times, but it stops with a TypeError. Tap the line that causes it, then fix it.
        `,
        starter: py`
          import argparse

          def main(argv=None):
              parser = argparse.ArgumentParser(description="Repeats a word.")
              parser.add_argument("word")
              parser.add_argument("--times", default=1)
              args = parser.parse_args(argv)
              for _ in range(args.times):
                  print(args.word)

          main(["Hi", "--times", "3"])
        `,
        bugLines: [6],
        solution: py`
          import argparse

          def main(argv=None):
              parser = argparse.ArgumentParser(description="Repeats a word.")
              parser.add_argument("word")
              parser.add_argument("--times", type=int, default=1)
              args = parser.parse_args(argv)
              for _ in range(args.times):
                  print(args.word)

          main(["Hi", "--times", "3"])
        `,
        tests: [
          { output: "Hi\nHi\nHi" },
          { py: py`
            assert printed("main", ["Yo"]) == "Yo", "With no «--times», the word should be printed once."
            assert printed("main", ["ok", "--times", "2"]) == "ok\nok", "«--times 2» should print the word twice."
          ` },
        ],
        wrong: [py`
          import argparse

          def main(argv=None):
              parser = argparse.ArgumentParser(description="Repeats a word.")
              parser.add_argument("word")
              parser.add_argument("--times", default=1)
              args = parser.parse_args(argv)
              for _ in range(len(args.times)):
                  print(args.word)

          main(["Hi", "--times", "3"])
        `],
        hints: [
          md`Typed words arrive as text, and «range("3")» is a TypeError.`,
          md`Tell argparse to turn the times into a whole number: «type=int».`,
          md`If «--times 3» prints the word only once, «len("3")» counts the letters of the text. Let argparse make it a number.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: a shout switch",
        task: md`
          Add a «--shout» switch. When it is typed, the greeting is in capitals. Change the last line to «main(["Asha", "--shout"])», so it prints:

          | HELLO, ASHA
        `,
        starter: py`
          import argparse

          def main(argv=None):
              parser = argparse.ArgumentParser(description="Greets someone.")
              parser.add_argument("name")
              args = parser.parse_args(argv)
              text = f"Hello, {args.name}"
              print(text)

          main(["Asha"])
        `,
        solution: py`
          import argparse

          def main(argv=None):
              parser = argparse.ArgumentParser(description="Greets someone.")
              parser.add_argument("name")
              parser.add_argument("--shout", action="store_true")
              args = parser.parse_args(argv)
              text = f"Hello, {args.name}"
              if args.shout:
                  text = text.upper()
              print(text)

          main(["Asha", "--shout"])
        `,
        tests: [
          { output: "HELLO, ASHA" },
          { py: py`
            assert printed("main", ["Ravi"]) == "Hello, Ravi", "Without «--shout», the greeting should stay as it was."
            assert printed("main", ["Om", "--shout"]) == "HELLO, OM", "With «--shout», the greeting should be in capitals."
          ` },
        ],
        wrong: [py`
          import argparse

          def main(argv=None):
              parser = argparse.ArgumentParser(description="Greets someone.")
              parser.add_argument("name")
              parser.add_argument("--shout", action="store_true")
              args = parser.parse_args(argv)
              text = f"Hello, {args.name}"
              print(text.upper())

          main(["Asha", "--shout"])
        `],
        hints: [
          md`If you see «unrecognized arguments: --shout», add the option with «action="store_true"».`,
          md`If the greeting is in capitals even without «--shout», check «args.shout» first.`,
          md`If you see «expected one argument», the switch needs «action="store_true"», so it takes no word after it.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a marks tool",
        task: md`
          From a blank page. Write «main(argv=None)», a tool that takes one or more marks, and an option «--pass-mark» with a default of 40. It prints the count, the average rounded to 1 place, and how many reached the pass mark. End with «main(["72", "35", "90"])». It shows:

          | Count: 3
          | Average: 65.7
          | Passed: 2
        `,
        starter: py``,
        solution: py`
          import argparse

          def main(argv=None):
              parser = argparse.ArgumentParser(description="Sums up mock test marks.")
              parser.add_argument("marks", nargs="+", type=int, help="the marks")
              parser.add_argument("--pass-mark", type=int, default=40, help="the lowest passing marks")
              args = parser.parse_args(argv)
              print("Count:", len(args.marks))
              print("Average:", round(sum(args.marks) / len(args.marks), 1))
              print("Passed:", len([m for m in args.marks if m >= args.pass_mark]))

          main(["72", "35", "90"])
        `,
        tests: [
          { output: "Count: 3\nAverage: 65.7\nPassed: 2" },
          { py: py`
            got = printed("main", ["50", "60", "--pass-mark", "60"])
            assert got == "Count: 2\nAverage: 55.0\nPassed: 1", f"«main(['50', '60', '--pass-mark', '60'])» should print Count 2, Average 55.0 and Passed 1, but it printed:\n{got}"
            got = printed("main", ["40"])
            assert got == "Count: 1\nAverage: 40.0\nPassed: 1", "A mark of exactly 40 reaches the default pass mark."
          ` },
          { uses: ["call:main"], msg: "End the program by calling «main» with the marks as a list of text." },
        ],
        wrong: [py`
          import argparse

          def main(argv=None):
              parser = argparse.ArgumentParser(description="Sums up mock test marks.")
              parser.add_argument("marks", nargs="+", type=int, help="the marks")
              parser.add_argument("--pass-mark", type=int, default=40, help="the lowest passing marks")
              args = parser.parse_args(argv)
              print("Count:", len(args.marks))
              print("Average:", round(sum(args.marks) / len(args.marks), 1))
              print("Passed:", len([m for m in args.marks if m > args.pass_mark]))

          main(["72", "35", "90"])
        `],
        hints: [
          md`If a mark of exactly 40 does not pass, «reached» means «>=», not «>».`,
          md`If you see an AttributeError for «pass-mark», argparse turns the dash into «_»: «args.pass_mark».`,
          md`If you see «unsupported operand type(s) for +: 'int' and 'str'», add «type=int», so the marks are numbers.`,
        ],
      },
      {
        id: "d1", kind: "drill", title: "Laptop Mission: your own tool",
        task: md`
          This pretend Command Prompt is in your «python-days» folder. Type each command and press Enter.

          On a phone, you may skip this. Phone users are excused from the mission below.
        `,
        steps: [
          { say: md`Ask the tool for its help page. Type «python marks.py --help» and press Enter.`,
            expect: ["python marks.py --help", "py marks.py --help", "python marks.py -h", "py marks.py -h"],
            output: "usage: marks.py [-h] [--pass-mark PASS_MARK] marks [marks ...]\n\nSums up mock test marks.\n\npositional arguments:\n  marks                 the marks\n\noptions:\n  -h, --help            show this help message and exit\n  --pass-mark PASS_MARK\n                        the lowest passing marks" },
          { say: md`Now give it marks and a pass mark. Type «python marks.py 72 35 90 --pass-mark 75» and press Enter.`,
            expect: ["python marks.py 72 35 90 --pass-mark 75", "py marks.py 72 35 90 --pass-mark 75"],
            output: "Count: 3\nAverage: 65.7\nPassed: 1" },
        ],
        mission: md`
          Now do it for real.

          1. In IDLE, make a new file with your marks tool. Change the last line to «main()», so it reads the words you type. Save it as «marks.py» in «python-days».
          2. In the Command Prompt, run «python marks.py --help», then «python marks.py 72 35 90 --pass-mark 75».
          3. Try «python marks.py» with no marks, and read the error. Then try it with five marks of your own. The average it prints is your receipt: write it in your notebook.
        `,
        hints: [
          md`Type the words in the grey box exactly, then press Enter.`,
          md`Put one space between each word, and two dashes before «help» and «pass-mark».`,
          md`If python does not work on your laptop, py does the same job.`,
        ],
      },
    ],
    keys: [
      md`«sys.argv» is the list of words typed after «python»: the program's name first, all as text.`,
      md`«argparse»: «add_argument("name")» must be given; «"--option"» may be left out and uses its «default».`,
      md`«type=int» turns words into numbers; «action="store_true"» makes a switch; «nargs="+"» takes a list.`,
      md`«--help» writes itself from your descriptions, and wrong words get a clear error.`,
      md`«def main(argv=None):» with «parse_args(argv)» works on a laptop and in tests.`,
    ],
  });

  // ---------------------------------------------------------------- Day 128
  day({
    slug: "final-project-build",
    title: "Final Project 1: Plan and Build the Study Planner",
    goal: "Plan a study planner and build its classes and database.",
    minutes: 60,
    kind: "project",
    needs: [116, 122],
    win: "Today you can now plan a real program and build it from a dataclass, your own error and a SQLite database, checked stage by stage.",
    learn: [
      md`
        ## The brief

        Your final project is a **study planner** for exam preparation. You list the topics you must study, each with the hours it needs. As you study, you log your hours. The planner tells you what to study next, and how far along each subject is. Tomorrow you add a revision plan and prove it all with unittest.

        ## Plan before you build

        Professionals plan the pieces first. Here is the plan:

        - **Topic**, a dataclass (Day 116): subject, name, hours needed, hours done. It can say how many hours are left, and whether it is finished.
        - **PlannerError**, your own error (Day 117), for every refusal.
        - **Planner**, a class that keeps the topics in SQLite (Days 121 and 122). It adds, finds and lists topics, logs hours, and plans.
        - Type hints on every method (Day 124), so the plan is written into the code.

        A row from SQLite is a tuple, and «Topic(*row)» spreads it into the fields, in order (Day 109). Guess the output.
      `,
      ex(py`
        from dataclasses import dataclass

        @dataclass
        class Topic:
            subject: str
            name: str
            hours_needed: int
            hours_done: int = 0

        row = ("GK", "Rivers", 3, 1)
        t = Topic(*row)
        print(t.name, t.hours_needed - t.hours_done)
        print(Topic("GK", "Dams", 2))
      `, { predict: ["Rivers 2\nTopic(subject='GK', name='Dams', hours_needed=2, hours_done=0)", "Rivers 2\nTopic(subject='GK', name='Dams', hours_needed=2)", "GK 2\nTopic(subject='GK', name='Dams', hours_needed=2, hours_done=0)"], answer: 0 }),
      md`
        ## Four stages

        Stage 1 builds the Topic. Stage 2 stores topics in SQLite. Stage 3 logs study hours. Stage 4 picks the next topic and shows each subject's progress. Each stage is checked before the next. All topics and hours are invented.
      `,
      tip(md`If your code from an earlier stage is not working, fix it before you go on. Each stage builds on the one before, just as real programs grow.`),
      pause(md`This project usually takes two sittings. Each stage saves when you pass it, so stop after any stage.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          import sqlite3

          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE topics (name TEXT, done INTEGER)")
          con.execute("INSERT INTO topics VALUES (?, ?)", ("Rivers", 1))
          con.execute("UPDATE topics SET done = done + ? WHERE name = ?", (2, "Rivers"))
          print(con.execute("SELECT done FROM topics").fetchone())
        `, options: ["(3,)", "(2,)", "(1,)"], answer: 0,
        explain: md`«done = done + ?» adds 2 to the 1 already there.`,
        why: [null, md`That would be «done = ?», which replaces the value.`, md`The UPDATE changed the row before it was read.`],
        skill: "trace" },
      { q: md`What does this method promise?`, code: py`
          def get(self, name: str) -> Topic | None:
              ...
        `, options: ["Give it a name as text, and it gives back a Topic, or None if there is none", "It changes a topic", "It always gives back a Topic"], answer: 0, verify: false, mono: false,
        explain: md`The hints say text goes in, and a Topic or None comes out. Callers must check for None.`,
        why: [null, md`Nothing in its name or hints says it changes anything.`, md`«| None» says it may find nothing.`],
        skill: "read" },
      { q: md`A planner logs 2 hours, then 3 more, but the topic shows only 3 hours done. What is the most likely mistake?`,
        options: ["The UPDATE says «done = ?» instead of «done = done + ?»", "The table has no «done» column", "The hours were logged with «?»"], answer: 0, verify: false, mono: false,
        explain: md`«done = ?» puts in the new hours, and the old 2 are lost.`,
        why: [null, md`Then the UPDATE would stop with an error.`, md`Giving values with «?» is right. The SQL itself is wrong.`],
        skill: "debug" },
      { q: md`Why is the plan made before the code?`,
        options: ["So each piece has one clear job, and you know what to build and test first", "Because Python needs it", "So the program runs faster"], answer: 0, verify: false, mono: false,
        explain: md`A short plan of classes and jobs keeps a big program from turning into a muddle (Day 103).`,
        why: [null, md`Python never sees your plan.`, md`A plan changes how clear the code is, not its speed.`],
        skill: "memory" },
      { q: md`The planner must refuse a topic name that is already planned. Where should that check go?`,
        options: ["In «add», before the INSERT, raising PlannerError", "In «topics()», hiding the second copy", "In the main lines, before each «add»"], answer: 0, verify: false, mono: false,
        explain: md`Then no caller can ever put a second copy in. Check first, then change.`,
        why: [null, md`The bad copy would still be stored, only hidden.`, md`Then every caller must remember the check, and one will forget.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "s1", stage: 1, title: "Stage 1: the Topic",
        task: md`
          The Topic's fields are given. Finish its two methods:

          - «hours_left()» gives back the hours still to study, never below 0.
          - «is_finished()» gives back True once the hours done reach the hours needed.

          The program should print:

          | Topic(subject='Polity', name='Fundamental Rights', hours_needed=6, hours_done=2)
          | 4 False
          | 0 True
        `,
        starter: py`
          from dataclasses import dataclass


          @dataclass
          class Topic:
              subject: str
              name: str
              hours_needed: int
              hours_done: int = 0

              def hours_left(self) -> int:
                  # gives back the hours still to study, never below 0
                  pass

              def is_finished(self) -> bool:
                  # gives back True once the hours done reach the hours needed
                  pass


          t = Topic("Polity", "Fundamental Rights", 6, 2)
          print(t)
          print(t.hours_left(), t.is_finished())
          extra = Topic("GK", "Rivers", 3, 4)
          print(extra.hours_left(), extra.is_finished())
        `,
        solution: py`
          from dataclasses import dataclass


          @dataclass
          class Topic:
              subject: str
              name: str
              hours_needed: int
              hours_done: int = 0

              def hours_left(self) -> int:
                  # gives back the hours still to study, never below 0
                  return max(self.hours_needed - self.hours_done, 0)

              def is_finished(self) -> bool:
                  # gives back True once the hours done reach the hours needed
                  return self.hours_done >= self.hours_needed


          t = Topic("Polity", "Fundamental Rights", 6, 2)
          print(t)
          print(t.hours_left(), t.is_finished())
          extra = Topic("GK", "Rivers", 3, 4)
          print(extra.hours_left(), extra.is_finished())
        `,
        tests: [
          { output: "Topic(subject='Polity', name='Fundamental Rights', hours_needed=6, hours_done=2)\n4 False\n0 True" },
          { py: py`
              T = need("Topic", "class")
              t = T("A", "B", 5, 1)
              assert t.hours_left() == 4, f"5 needed and 1 done leaves 4, but hours_left gave {t.hours_left()}."
              assert t.is_finished() is False, "1 hour of 5 is not finished."
              assert T("A", "C", 2, 2).is_finished() is True, "2 hours done of 2 needed is finished."
              assert T("A", "D", 2, 5).hours_left() == 0, "Extra hours must not make hours_left go below 0."
              assert T("A", "E", 3).hours_done == 0, "hours_done should start at 0 when it is left out."
            ` },
        ],
        wrong: [py`
          from dataclasses import dataclass


          @dataclass
          class Topic:
              subject: str
              name: str
              hours_needed: int
              hours_done: int = 0

              def hours_left(self) -> int:
                  # gives back the hours still to study, never below 0
                  return self.hours_needed - self.hours_done

              def is_finished(self) -> bool:
                  # gives back True once the hours done reach the hours needed
                  return self.hours_done >= self.hours_needed


          t = Topic("Polity", "Fundamental Rights", 6, 2)
          print(t)
          print(t.hours_left(), t.is_finished())
          extra = Topic("GK", "Rivers", 3, 4)
          print(extra.hours_left(), extra.is_finished())
        `],
        hints: [
          md`If the last line shows «-1 True», the extra hour made the answer go below 0. Use «max(..., 0)».`,
          md`If you see «None», each method must «return» its answer.`,
          md`If 2 hours of 2 is not finished, use «>=», so reaching the hours counts.`,
        ],
      },
      {
        id: "s2", stage: 2, title: "Stage 2: store the topics",
        task: md`
          Now the Planner. This stage starts from a finished Topic, with «PlannerError» and «__init__», which makes the table, given. Finish three methods:

          - «add(topic)» raises «PlannerError(f"{topic.name} needs at least 1 hour")» if «hours_needed» is below 1. It raises «PlannerError(f"{topic.name} is already planned")» if that name is already stored. Otherwise it stores the topic's four fields with «?» marks, and commits.
          - «get(name)» gives back that Topic, built with «Topic(*row)», or None.
          - «topics()» gives back every Topic, A to Z by subject, then by name.

          The program prints the Stage 1 lines, then:

          | Refused: Rivers is already planned
          | Refused: Dams needs at least 1 hour
          | ['Rivers', 'Mughals', 'Fundamental Rights', 'Preamble']
          | Topic(subject='Polity', name='Preamble', hours_needed=2, hours_done=0) None
        `,
        starter: py`
          import sqlite3
          from dataclasses import dataclass


          @dataclass
          class Topic:
              subject: str
              name: str
              hours_needed: int
              hours_done: int = 0

              def hours_left(self) -> int:
                  # gives back the hours still to study, never below 0
                  return max(self.hours_needed - self.hours_done, 0)

              def is_finished(self) -> bool:
                  # gives back True once the hours done reach the hours needed
                  return self.hours_done >= self.hours_needed


          class PlannerError(Exception):
              pass


          class Planner:
              def __init__(self, path: str = ":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS topics (subject TEXT, name TEXT, needed INTEGER, done INTEGER)")

              def add(self, topic: Topic) -> None:
                  # stores a new topic, or raises PlannerError for hours_needed below 1 or a name already planned
                  pass

              def get(self, name: str) -> Topic | None:
                  # gives back the Topic with that name, or None
                  pass

              def topics(self) -> list[Topic]:
                  # gives back every Topic, A to Z by subject, then by name
                  pass


          t = Topic("Polity", "Fundamental Rights", 6, 2)
          print(t)
          print(t.hours_left(), t.is_finished())
          extra = Topic("GK", "Rivers", 3, 4)
          print(extra.hours_left(), extra.is_finished())

          planner = Planner()
          for topic in [Topic("Polity", "Fundamental Rights", 6, 2), Topic("GK", "Rivers", 3),
                        Topic("Polity", "Preamble", 2), Topic("History", "Mughals", 5)]:
              planner.add(topic)
          for bad in [Topic("GK", "Rivers", 4), Topic("GK", "Dams", 0)]:
              try:
                  planner.add(bad)
              except PlannerError as e:
                  print("Refused:", e)
          print([t.name for t in planner.topics()])
          print(planner.get("Preamble"), planner.get("Maths"))
        `,
        solution: py`
          import sqlite3
          from dataclasses import dataclass


          @dataclass
          class Topic:
              subject: str
              name: str
              hours_needed: int
              hours_done: int = 0

              def hours_left(self) -> int:
                  # gives back the hours still to study, never below 0
                  return max(self.hours_needed - self.hours_done, 0)

              def is_finished(self) -> bool:
                  # gives back True once the hours done reach the hours needed
                  return self.hours_done >= self.hours_needed


          class PlannerError(Exception):
              pass


          class Planner:
              def __init__(self, path: str = ":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS topics (subject TEXT, name TEXT, needed INTEGER, done INTEGER)")

              def add(self, topic: Topic) -> None:
                  # stores a new topic, or raises PlannerError for hours_needed below 1 or a name already planned
                  if topic.hours_needed < 1:
                      raise PlannerError(f"{topic.name} needs at least 1 hour")
                  if self.get(topic.name) is not None:
                      raise PlannerError(f"{topic.name} is already planned")
                  row = (topic.subject, topic.name, topic.hours_needed, topic.hours_done)
                  self.con.execute("INSERT INTO topics VALUES (?, ?, ?, ?)", row)
                  self.con.commit()

              def get(self, name: str) -> Topic | None:
                  # gives back the Topic with that name, or None
                  query = "SELECT subject, name, needed, done FROM topics WHERE name = ?"
                  row = self.con.execute(query, (name,)).fetchone()
                  if row is None:
                      return None
                  return Topic(*row)

              def topics(self) -> list[Topic]:
                  # gives back every Topic, A to Z by subject, then by name
                  query = "SELECT subject, name, needed, done FROM topics ORDER BY subject, name"
                  return [Topic(*row) for row in self.con.execute(query)]


          t = Topic("Polity", "Fundamental Rights", 6, 2)
          print(t)
          print(t.hours_left(), t.is_finished())
          extra = Topic("GK", "Rivers", 3, 4)
          print(extra.hours_left(), extra.is_finished())

          planner = Planner()
          for topic in [Topic("Polity", "Fundamental Rights", 6, 2), Topic("GK", "Rivers", 3),
                        Topic("Polity", "Preamble", 2), Topic("History", "Mughals", 5)]:
              planner.add(topic)
          for bad in [Topic("GK", "Rivers", 4), Topic("GK", "Dams", 0)]:
              try:
                  planner.add(bad)
              except PlannerError as e:
                  print("Refused:", e)
          print([t.name for t in planner.topics()])
          print(planner.get("Preamble"), planner.get("Maths"))
        `,
        tests: [
          { contains: ["Refused: Rivers is already planned\nRefused: Dams needs at least 1 hour\n['Rivers', 'Mughals', 'Fundamental Rights', 'Preamble']\nTopic(subject='Polity', name='Preamble', hours_needed=2, hours_done=0) None"] },
          { py: py`
              T = need("Topic", "class")
              p = new("Planner")
              p.add(T("Zoo", "b", 2))
              p.add(T("Art", "c", 1))
              p.add(T("Art", "a", 3))
              names = [t.name for t in p.topics()]
              assert names == ["a", "c", "b"], f"topics() should be A to Z by subject, then name: ['a', 'c', 'b'], but it gave {names}."
              assert p.get("c") == T("Art", "c", 1, 0), f"get('c') should give back the Topic, but it gave {p.get('c')!r}."
              assert p.get("x") is None, "get() of a name not stored should give None."
              for bad in (T("Q", "a", 1), T("Q", "z", 0)):
                  refused = None
                  try:
                      p.add(bad)
                  except Exception as e:
                      refused = e
                  assert type(refused).__name__ == "PlannerError", f"add({bad!r}) should raise PlannerError, but it gave {refused!r}."
              assert len(p.topics()) == 3, "A refused topic must not be stored."
              p.add(T("GK", "Newton's laws", 1))
              assert p.get("Newton's laws") is not None, "A name with «'» must go in with «?» marks."
            ` },
        ],
        wrong: [py`
          import sqlite3
          from dataclasses import dataclass


          @dataclass
          class Topic:
              subject: str
              name: str
              hours_needed: int
              hours_done: int = 0

              def hours_left(self) -> int:
                  # gives back the hours still to study, never below 0
                  return max(self.hours_needed - self.hours_done, 0)

              def is_finished(self) -> bool:
                  # gives back True once the hours done reach the hours needed
                  return self.hours_done >= self.hours_needed


          class PlannerError(Exception):
              pass


          class Planner:
              def __init__(self, path: str = ":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS topics (subject TEXT, name TEXT, needed INTEGER, done INTEGER)")

              def add(self, topic: Topic) -> None:
                  # stores a new topic, or raises PlannerError for hours_needed below 1 or a name already planned
                  if topic.hours_needed < 1:
                      raise PlannerError(f"{topic.name} needs at least 1 hour")
                  row = (topic.subject, topic.name, topic.hours_needed, topic.hours_done)
                  self.con.execute("INSERT INTO topics VALUES (?, ?, ?, ?)", row)
                  self.con.commit()

              def get(self, name: str) -> Topic | None:
                  # gives back the Topic with that name, or None
                  query = "SELECT subject, name, needed, done FROM topics WHERE name = ?"
                  row = self.con.execute(query, (name,)).fetchone()
                  if row is None:
                      return None
                  return Topic(*row)

              def topics(self) -> list[Topic]:
                  # gives back every Topic, A to Z by subject, then by name
                  query = "SELECT subject, name, needed, done FROM topics ORDER BY subject, name"
                  return [Topic(*row) for row in self.con.execute(query)]


          t = Topic("Polity", "Fundamental Rights", 6, 2)
          print(t)
          print(t.hours_left(), t.is_finished())
          extra = Topic("GK", "Rivers", 3, 4)
          print(extra.hours_left(), extra.is_finished())

          planner = Planner()
          for topic in [Topic("Polity", "Fundamental Rights", 6, 2), Topic("GK", "Rivers", 3),
                        Topic("Polity", "Preamble", 2), Topic("History", "Mughals", 5)]:
              planner.add(topic)
          for bad in [Topic("GK", "Rivers", 4), Topic("GK", "Dams", 0)]:
              try:
                  planner.add(bad)
              except PlannerError as e:
                  print("Refused:", e)
          print([t.name for t in planner.topics()])
          print(planner.get("Preamble"), planner.get("Maths"))
        `],
        hints: [
          md`If Rivers is listed twice and not refused, check «self.get(topic.name)» before the INSERT.`,
          md`If you see «Topic(*row)» errors, select the columns in the same order as the fields: subject, name, needed, done.`,
          md`If the topics come out in the order they were added, sort with «ORDER BY subject, name».`,
        ],
      },
      {
        id: "s3", stage: 3, carry: "s2", title: "Stage 3: log study hours",
        task: md`
          Add a second table in «__init__»: «CREATE TABLE IF NOT EXISTS sessions (name TEXT, hours INTEGER)». Then add two methods:

          - «log(name, hours)» raises «PlannerError("hours must be at least 1")» if hours is below 1, and «PlannerError(f"No topic called {name}")» for an unknown topic. Otherwise it adds the hours to the topic with «UPDATE topics SET done = done + ? WHERE name = ?», stores the session, and commits.
          - «hours_studied()» gives back the total of all sessions. «SUM» gives None when there are no rows, so give back 0 then.

          Then add these lines at the end:

          : planner.log("Rivers", 2)
          : planner.log("Fundamental Rights", 5)
          : for name, hours in [("Maths", 1), ("Rivers", 0)]:
          :     try:
          :         planner.log(name, hours)
          :     except PlannerError as e:
          :         print("Refused:", e)
          : print(planner.get("Rivers").hours_left(), planner.get("Fundamental Rights").is_finished(), planner.hours_studied())

          The last three lines printed are:

          | Refused: No topic called Maths
          | Refused: hours must be at least 1
          | 1 True 7
        `,
        starter: py`
          import sqlite3
          from dataclasses import dataclass


          @dataclass
          class Topic:
              subject: str
              name: str
              hours_needed: int
              hours_done: int = 0

              def hours_left(self) -> int:
                  # gives back the hours still to study, never below 0
                  return max(self.hours_needed - self.hours_done, 0)

              def is_finished(self) -> bool:
                  # gives back True once the hours done reach the hours needed
                  return self.hours_done >= self.hours_needed


          class PlannerError(Exception):
              pass


          class Planner:
              def __init__(self, path: str = ":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS topics (subject TEXT, name TEXT, needed INTEGER, done INTEGER)")

              def add(self, topic: Topic) -> None:
                  # stores a new topic, or raises PlannerError for hours_needed below 1 or a name already planned
                  if topic.hours_needed < 1:
                      raise PlannerError(f"{topic.name} needs at least 1 hour")
                  if self.get(topic.name) is not None:
                      raise PlannerError(f"{topic.name} is already planned")
                  row = (topic.subject, topic.name, topic.hours_needed, topic.hours_done)
                  self.con.execute("INSERT INTO topics VALUES (?, ?, ?, ?)", row)
                  self.con.commit()

              def get(self, name: str) -> Topic | None:
                  # gives back the Topic with that name, or None
                  query = "SELECT subject, name, needed, done FROM topics WHERE name = ?"
                  row = self.con.execute(query, (name,)).fetchone()
                  if row is None:
                      return None
                  return Topic(*row)

              def topics(self) -> list[Topic]:
                  # gives back every Topic, A to Z by subject, then by name
                  query = "SELECT subject, name, needed, done FROM topics ORDER BY subject, name"
                  return [Topic(*row) for row in self.con.execute(query)]


          t = Topic("Polity", "Fundamental Rights", 6, 2)
          print(t)
          print(t.hours_left(), t.is_finished())
          extra = Topic("GK", "Rivers", 3, 4)
          print(extra.hours_left(), extra.is_finished())

          planner = Planner()
          for topic in [Topic("Polity", "Fundamental Rights", 6, 2), Topic("GK", "Rivers", 3),
                        Topic("Polity", "Preamble", 2), Topic("History", "Mughals", 5)]:
              planner.add(topic)
          for bad in [Topic("GK", "Rivers", 4), Topic("GK", "Dams", 0)]:
              try:
                  planner.add(bad)
              except PlannerError as e:
                  print("Refused:", e)
          print([t.name for t in planner.topics()])
          print(planner.get("Preamble"), planner.get("Maths"))
        `,
        solution: py`
          import sqlite3
          from dataclasses import dataclass


          @dataclass
          class Topic:
              subject: str
              name: str
              hours_needed: int
              hours_done: int = 0

              def hours_left(self) -> int:
                  # gives back the hours still to study, never below 0
                  return max(self.hours_needed - self.hours_done, 0)

              def is_finished(self) -> bool:
                  # gives back True once the hours done reach the hours needed
                  return self.hours_done >= self.hours_needed


          class PlannerError(Exception):
              pass


          class Planner:
              def __init__(self, path: str = ":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS topics (subject TEXT, name TEXT, needed INTEGER, done INTEGER)")
                  self.con.execute("CREATE TABLE IF NOT EXISTS sessions (name TEXT, hours INTEGER)")

              def add(self, topic: Topic) -> None:
                  # stores a new topic, or raises PlannerError for hours_needed below 1 or a name already planned
                  if topic.hours_needed < 1:
                      raise PlannerError(f"{topic.name} needs at least 1 hour")
                  if self.get(topic.name) is not None:
                      raise PlannerError(f"{topic.name} is already planned")
                  row = (topic.subject, topic.name, topic.hours_needed, topic.hours_done)
                  self.con.execute("INSERT INTO topics VALUES (?, ?, ?, ?)", row)
                  self.con.commit()

              def get(self, name: str) -> Topic | None:
                  # gives back the Topic with that name, or None
                  query = "SELECT subject, name, needed, done FROM topics WHERE name = ?"
                  row = self.con.execute(query, (name,)).fetchone()
                  if row is None:
                      return None
                  return Topic(*row)

              def topics(self) -> list[Topic]:
                  # gives back every Topic, A to Z by subject, then by name
                  query = "SELECT subject, name, needed, done FROM topics ORDER BY subject, name"
                  return [Topic(*row) for row in self.con.execute(query)]

              def log(self, name: str, hours: int) -> None:
                  # adds study hours to a topic, or raises PlannerError for hours below 1 or an unknown topic
                  if hours < 1:
                      raise PlannerError("hours must be at least 1")
                  if self.get(name) is None:
                      raise PlannerError(f"No topic called {name}")
                  self.con.execute("UPDATE topics SET done = done + ? WHERE name = ?", (hours, name))
                  self.con.execute("INSERT INTO sessions VALUES (?, ?)", (name, hours))
                  self.con.commit()

              def hours_studied(self) -> int:
                  # gives back the total hours of every logged session, or 0
                  total = self.con.execute("SELECT SUM(hours) FROM sessions").fetchone()[0]
                  return 0 if total is None else total


          t = Topic("Polity", "Fundamental Rights", 6, 2)
          print(t)
          print(t.hours_left(), t.is_finished())
          extra = Topic("GK", "Rivers", 3, 4)
          print(extra.hours_left(), extra.is_finished())

          planner = Planner()
          for topic in [Topic("Polity", "Fundamental Rights", 6, 2), Topic("GK", "Rivers", 3),
                        Topic("Polity", "Preamble", 2), Topic("History", "Mughals", 5)]:
              planner.add(topic)
          for bad in [Topic("GK", "Rivers", 4), Topic("GK", "Dams", 0)]:
              try:
                  planner.add(bad)
              except PlannerError as e:
                  print("Refused:", e)
          print([t.name for t in planner.topics()])
          print(planner.get("Preamble"), planner.get("Maths"))

          planner.log("Rivers", 2)
          planner.log("Fundamental Rights", 5)
          for name, hours in [("Maths", 1), ("Rivers", 0)]:
              try:
                  planner.log(name, hours)
              except PlannerError as e:
                  print("Refused:", e)
          print(planner.get("Rivers").hours_left(), planner.get("Fundamental Rights").is_finished(), planner.hours_studied())
        `,
        tests: [
          { contains: ["Refused: No topic called Maths\nRefused: hours must be at least 1\n1 True 7"] },
          { py: py`
              T = need("Topic", "class")
              p = new("Planner")
              assert p.hours_studied() == 0, f"A new planner has studied 0 hours, but hours_studied gave {p.hours_studied()!r}."
              p.add(T("A", "x", 4))
              p.log("x", 1)
              p.log("x", 2)
              assert p.get("x").hours_done == 3, f"Logging 1 hour, then 2, should leave 3 hours done, but it shows {p.get('x').hours_done}."
              for name, hours in (("nope", 1), ("x", 0)):
                  refused = None
                  try:
                      p.log(name, hours)
                  except Exception as e:
                      refused = e
                  assert type(refused).__name__ == "PlannerError", f"log({name!r}, {hours}) should raise PlannerError, but it gave {refused!r}."
              assert p.hours_studied() == 3, "A refused log must not count as study."
            ` },
        ],
        wrong: [py`
          import sqlite3
          from dataclasses import dataclass


          @dataclass
          class Topic:
              subject: str
              name: str
              hours_needed: int
              hours_done: int = 0

              def hours_left(self) -> int:
                  # gives back the hours still to study, never below 0
                  return max(self.hours_needed - self.hours_done, 0)

              def is_finished(self) -> bool:
                  # gives back True once the hours done reach the hours needed
                  return self.hours_done >= self.hours_needed


          class PlannerError(Exception):
              pass


          class Planner:
              def __init__(self, path: str = ":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS topics (subject TEXT, name TEXT, needed INTEGER, done INTEGER)")
                  self.con.execute("CREATE TABLE IF NOT EXISTS sessions (name TEXT, hours INTEGER)")

              def add(self, topic: Topic) -> None:
                  # stores a new topic, or raises PlannerError for hours_needed below 1 or a name already planned
                  if topic.hours_needed < 1:
                      raise PlannerError(f"{topic.name} needs at least 1 hour")
                  if self.get(topic.name) is not None:
                      raise PlannerError(f"{topic.name} is already planned")
                  row = (topic.subject, topic.name, topic.hours_needed, topic.hours_done)
                  self.con.execute("INSERT INTO topics VALUES (?, ?, ?, ?)", row)
                  self.con.commit()

              def get(self, name: str) -> Topic | None:
                  # gives back the Topic with that name, or None
                  query = "SELECT subject, name, needed, done FROM topics WHERE name = ?"
                  row = self.con.execute(query, (name,)).fetchone()
                  if row is None:
                      return None
                  return Topic(*row)

              def topics(self) -> list[Topic]:
                  # gives back every Topic, A to Z by subject, then by name
                  query = "SELECT subject, name, needed, done FROM topics ORDER BY subject, name"
                  return [Topic(*row) for row in self.con.execute(query)]

              def log(self, name: str, hours: int) -> None:
                  # adds study hours to a topic, or raises PlannerError for hours below 1 or an unknown topic
                  if hours < 1:
                      raise PlannerError("hours must be at least 1")
                  if self.get(name) is None:
                      raise PlannerError(f"No topic called {name}")
                  self.con.execute("UPDATE topics SET done = ? WHERE name = ?", (hours, name))
                  self.con.execute("INSERT INTO sessions VALUES (?, ?)", (name, hours))
                  self.con.commit()

              def hours_studied(self) -> int:
                  # gives back the total hours of every logged session, or 0
                  total = self.con.execute("SELECT SUM(hours) FROM sessions").fetchone()[0]
                  return 0 if total is None else total


          t = Topic("Polity", "Fundamental Rights", 6, 2)
          print(t)
          print(t.hours_left(), t.is_finished())
          extra = Topic("GK", "Rivers", 3, 4)
          print(extra.hours_left(), extra.is_finished())

          planner = Planner()
          for topic in [Topic("Polity", "Fundamental Rights", 6, 2), Topic("GK", "Rivers", 3),
                        Topic("Polity", "Preamble", 2), Topic("History", "Mughals", 5)]:
              planner.add(topic)
          for bad in [Topic("GK", "Rivers", 4), Topic("GK", "Dams", 0)]:
              try:
                  planner.add(bad)
              except PlannerError as e:
                  print("Refused:", e)
          print([t.name for t in planner.topics()])
          print(planner.get("Preamble"), planner.get("Maths"))

          planner.log("Rivers", 2)
          planner.log("Fundamental Rights", 5)
          for name, hours in [("Maths", 1), ("Rivers", 0)]:
              try:
                  planner.log(name, hours)
              except PlannerError as e:
                  print("Refused:", e)
          print(planner.get("Rivers").hours_left(), planner.get("Fundamental Rights").is_finished(), planner.hours_studied())
        `],
        hints: [
          md`If Fundamental Rights is not finished after 2 + 5 hours, the UPDATE replaces the hours. Write «done = done + ?».`,
          md`If you see «no such table: sessions», the second CREATE TABLE goes in «__init__».`,
          md`If a new planner gives None for hours studied, change None to 0 before you give it back.`,
        ],
      },
      {
        id: "s4", stage: 4, carry: "s3", title: "Stage 4: what next, and how far",
        task: md`
          Add two methods:

          - «next_up()» gives back the unfinished topic with the most hours left. On a tie, the first A to Z wins, as in «topics()». If every topic is finished, or there are none, it gives back None.
          - «progress()» gives back one line for each subject, A to Z, like «"Polity: 75% of 8 hours"». Extra hours must not count past a topic's needs. In SQL, «MIN(done, needed)» with two values picks the smaller one. Use «SUM(MIN(done, needed))» and «SUM(needed)» with «GROUP BY subject», and round the percent to a whole number.

          Then add these lines at the end:

          : print("Next:", planner.next_up().name)
          : for line in planner.progress():
          :     print(line)

          The last four lines printed are:

          | Next: Mughals
          | GK: 67% of 3 hours
          | History: 0% of 5 hours
          | Polity: 75% of 8 hours
        `,
        starter: py`
          import sqlite3
          from dataclasses import dataclass


          @dataclass
          class Topic:
              subject: str
              name: str
              hours_needed: int
              hours_done: int = 0

              def hours_left(self) -> int:
                  # gives back the hours still to study, never below 0
                  return max(self.hours_needed - self.hours_done, 0)

              def is_finished(self) -> bool:
                  # gives back True once the hours done reach the hours needed
                  return self.hours_done >= self.hours_needed


          class PlannerError(Exception):
              pass


          class Planner:
              def __init__(self, path: str = ":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS topics (subject TEXT, name TEXT, needed INTEGER, done INTEGER)")
                  self.con.execute("CREATE TABLE IF NOT EXISTS sessions (name TEXT, hours INTEGER)")

              def add(self, topic: Topic) -> None:
                  # stores a new topic, or raises PlannerError for hours_needed below 1 or a name already planned
                  if topic.hours_needed < 1:
                      raise PlannerError(f"{topic.name} needs at least 1 hour")
                  if self.get(topic.name) is not None:
                      raise PlannerError(f"{topic.name} is already planned")
                  row = (topic.subject, topic.name, topic.hours_needed, topic.hours_done)
                  self.con.execute("INSERT INTO topics VALUES (?, ?, ?, ?)", row)
                  self.con.commit()

              def get(self, name: str) -> Topic | None:
                  # gives back the Topic with that name, or None
                  query = "SELECT subject, name, needed, done FROM topics WHERE name = ?"
                  row = self.con.execute(query, (name,)).fetchone()
                  if row is None:
                      return None
                  return Topic(*row)

              def topics(self) -> list[Topic]:
                  # gives back every Topic, A to Z by subject, then by name
                  query = "SELECT subject, name, needed, done FROM topics ORDER BY subject, name"
                  return [Topic(*row) for row in self.con.execute(query)]

              def log(self, name: str, hours: int) -> None:
                  # adds study hours to a topic, or raises PlannerError for hours below 1 or an unknown topic
                  if hours < 1:
                      raise PlannerError("hours must be at least 1")
                  if self.get(name) is None:
                      raise PlannerError(f"No topic called {name}")
                  self.con.execute("UPDATE topics SET done = done + ? WHERE name = ?", (hours, name))
                  self.con.execute("INSERT INTO sessions VALUES (?, ?)", (name, hours))
                  self.con.commit()

              def hours_studied(self) -> int:
                  # gives back the total hours of every logged session, or 0
                  total = self.con.execute("SELECT SUM(hours) FROM sessions").fetchone()[0]
                  return 0 if total is None else total


          t = Topic("Polity", "Fundamental Rights", 6, 2)
          print(t)
          print(t.hours_left(), t.is_finished())
          extra = Topic("GK", "Rivers", 3, 4)
          print(extra.hours_left(), extra.is_finished())

          planner = Planner()
          for topic in [Topic("Polity", "Fundamental Rights", 6, 2), Topic("GK", "Rivers", 3),
                        Topic("Polity", "Preamble", 2), Topic("History", "Mughals", 5)]:
              planner.add(topic)
          for bad in [Topic("GK", "Rivers", 4), Topic("GK", "Dams", 0)]:
              try:
                  planner.add(bad)
              except PlannerError as e:
                  print("Refused:", e)
          print([t.name for t in planner.topics()])
          print(planner.get("Preamble"), planner.get("Maths"))

          planner.log("Rivers", 2)
          planner.log("Fundamental Rights", 5)
          for name, hours in [("Maths", 1), ("Rivers", 0)]:
              try:
                  planner.log(name, hours)
              except PlannerError as e:
                  print("Refused:", e)
          print(planner.get("Rivers").hours_left(), planner.get("Fundamental Rights").is_finished(), planner.hours_studied())
        `,
        solution: py`
          import sqlite3
          from dataclasses import dataclass


          @dataclass
          class Topic:
              subject: str
              name: str
              hours_needed: int
              hours_done: int = 0

              def hours_left(self) -> int:
                  # gives back the hours still to study, never below 0
                  return max(self.hours_needed - self.hours_done, 0)

              def is_finished(self) -> bool:
                  # gives back True once the hours done reach the hours needed
                  return self.hours_done >= self.hours_needed


          class PlannerError(Exception):
              pass


          class Planner:
              def __init__(self, path: str = ":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS topics (subject TEXT, name TEXT, needed INTEGER, done INTEGER)")
                  self.con.execute("CREATE TABLE IF NOT EXISTS sessions (name TEXT, hours INTEGER)")

              def add(self, topic: Topic) -> None:
                  # stores a new topic, or raises PlannerError for hours_needed below 1 or a name already planned
                  if topic.hours_needed < 1:
                      raise PlannerError(f"{topic.name} needs at least 1 hour")
                  if self.get(topic.name) is not None:
                      raise PlannerError(f"{topic.name} is already planned")
                  row = (topic.subject, topic.name, topic.hours_needed, topic.hours_done)
                  self.con.execute("INSERT INTO topics VALUES (?, ?, ?, ?)", row)
                  self.con.commit()

              def get(self, name: str) -> Topic | None:
                  # gives back the Topic with that name, or None
                  query = "SELECT subject, name, needed, done FROM topics WHERE name = ?"
                  row = self.con.execute(query, (name,)).fetchone()
                  if row is None:
                      return None
                  return Topic(*row)

              def topics(self) -> list[Topic]:
                  # gives back every Topic, A to Z by subject, then by name
                  query = "SELECT subject, name, needed, done FROM topics ORDER BY subject, name"
                  return [Topic(*row) for row in self.con.execute(query)]

              def log(self, name: str, hours: int) -> None:
                  # adds study hours to a topic, or raises PlannerError for hours below 1 or an unknown topic
                  if hours < 1:
                      raise PlannerError("hours must be at least 1")
                  if self.get(name) is None:
                      raise PlannerError(f"No topic called {name}")
                  self.con.execute("UPDATE topics SET done = done + ? WHERE name = ?", (hours, name))
                  self.con.execute("INSERT INTO sessions VALUES (?, ?)", (name, hours))
                  self.con.commit()

              def hours_studied(self) -> int:
                  # gives back the total hours of every logged session, or 0
                  total = self.con.execute("SELECT SUM(hours) FROM sessions").fetchone()[0]
                  return 0 if total is None else total

              def next_up(self) -> Topic | None:
                  # gives back the unfinished topic with the most hours left, ties A to Z, or None
                  left = [t for t in self.topics() if not t.is_finished()]
                  if not left:
                      return None
                  return max(left, key=lambda t: t.hours_left())

              def progress(self) -> list[str]:
                  # gives back one line for each subject, A to Z, like "Polity: 75% of 8 hours"
                  query = "SELECT subject, SUM(MIN(done, needed)), SUM(needed) FROM topics GROUP BY subject ORDER BY subject"
                  lines = []
                  for subject, done, needed in self.con.execute(query):
                      lines.append(f"{subject}: {round(100 * done / needed)}% of {needed} hours")
                  return lines


          t = Topic("Polity", "Fundamental Rights", 6, 2)
          print(t)
          print(t.hours_left(), t.is_finished())
          extra = Topic("GK", "Rivers", 3, 4)
          print(extra.hours_left(), extra.is_finished())

          planner = Planner()
          for topic in [Topic("Polity", "Fundamental Rights", 6, 2), Topic("GK", "Rivers", 3),
                        Topic("Polity", "Preamble", 2), Topic("History", "Mughals", 5)]:
              planner.add(topic)
          for bad in [Topic("GK", "Rivers", 4), Topic("GK", "Dams", 0)]:
              try:
                  planner.add(bad)
              except PlannerError as e:
                  print("Refused:", e)
          print([t.name for t in planner.topics()])
          print(planner.get("Preamble"), planner.get("Maths"))

          planner.log("Rivers", 2)
          planner.log("Fundamental Rights", 5)
          for name, hours in [("Maths", 1), ("Rivers", 0)]:
              try:
                  planner.log(name, hours)
              except PlannerError as e:
                  print("Refused:", e)
          print(planner.get("Rivers").hours_left(), planner.get("Fundamental Rights").is_finished(), planner.hours_studied())

          print("Next:", planner.next_up().name)
          for line in planner.progress():
              print(line)
        `,
        tests: [
          { contains: ["Next: Mughals\nGK: 67% of 3 hours\nHistory: 0% of 5 hours\nPolity: 75% of 8 hours"] },
          { py: py`
              T = need("Topic", "class")
              p = new("Planner")
              assert p.next_up() is None, "An empty planner has nothing next: give back None."
              p.add(T("B", "b", 3))
              p.add(T("A", "a", 3))
              p.add(T("C", "c", 1))
              assert p.next_up().name == "a", f"a and b both have 3 hours left, so the first A to Z, a, goes next, but next_up gave {p.next_up().name!r}."
              p.log("a", 3)
              assert p.next_up().name == "b", "Once a is finished, b has the most hours left."
              p.log("b", 3)
              p.log("c", 1)
              assert p.next_up() is None, "When every topic is finished, next_up should give None."
              q = new("Planner")
              q.add(T("M", "m", 2))
              q.add(T("M", "n", 2))
              q.log("m", 5)
              assert q.progress() == ["M: 50% of 4 hours"], f"5 hours on a 2-hour topic counts as 2, so M is 2 of 4 hours: 50%. progress gave {q.progress()}."
            ` },
        ],
        wrong: [py`
          import sqlite3
          from dataclasses import dataclass


          @dataclass
          class Topic:
              subject: str
              name: str
              hours_needed: int
              hours_done: int = 0

              def hours_left(self) -> int:
                  # gives back the hours still to study, never below 0
                  return max(self.hours_needed - self.hours_done, 0)

              def is_finished(self) -> bool:
                  # gives back True once the hours done reach the hours needed
                  return self.hours_done >= self.hours_needed


          class PlannerError(Exception):
              pass


          class Planner:
              def __init__(self, path: str = ":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS topics (subject TEXT, name TEXT, needed INTEGER, done INTEGER)")
                  self.con.execute("CREATE TABLE IF NOT EXISTS sessions (name TEXT, hours INTEGER)")

              def add(self, topic: Topic) -> None:
                  # stores a new topic, or raises PlannerError for hours_needed below 1 or a name already planned
                  if topic.hours_needed < 1:
                      raise PlannerError(f"{topic.name} needs at least 1 hour")
                  if self.get(topic.name) is not None:
                      raise PlannerError(f"{topic.name} is already planned")
                  row = (topic.subject, topic.name, topic.hours_needed, topic.hours_done)
                  self.con.execute("INSERT INTO topics VALUES (?, ?, ?, ?)", row)
                  self.con.commit()

              def get(self, name: str) -> Topic | None:
                  # gives back the Topic with that name, or None
                  query = "SELECT subject, name, needed, done FROM topics WHERE name = ?"
                  row = self.con.execute(query, (name,)).fetchone()
                  if row is None:
                      return None
                  return Topic(*row)

              def topics(self) -> list[Topic]:
                  # gives back every Topic, A to Z by subject, then by name
                  query = "SELECT subject, name, needed, done FROM topics ORDER BY subject, name"
                  return [Topic(*row) for row in self.con.execute(query)]

              def log(self, name: str, hours: int) -> None:
                  # adds study hours to a topic, or raises PlannerError for hours below 1 or an unknown topic
                  if hours < 1:
                      raise PlannerError("hours must be at least 1")
                  if self.get(name) is None:
                      raise PlannerError(f"No topic called {name}")
                  self.con.execute("UPDATE topics SET done = done + ? WHERE name = ?", (hours, name))
                  self.con.execute("INSERT INTO sessions VALUES (?, ?)", (name, hours))
                  self.con.commit()

              def hours_studied(self) -> int:
                  # gives back the total hours of every logged session, or 0
                  total = self.con.execute("SELECT SUM(hours) FROM sessions").fetchone()[0]
                  return 0 if total is None else total

              def next_up(self) -> Topic | None:
                  # gives back the unfinished topic with the most hours left, ties A to Z, or None
                  left = [t for t in self.topics() if not t.is_finished()]
                  if not left:
                      return None
                  return max(left, key=lambda t: t.hours_left())

              def progress(self) -> list[str]:
                  # gives back one line for each subject, A to Z, like "Polity: 75% of 8 hours"
                  query = "SELECT subject, SUM(done), SUM(needed) FROM topics GROUP BY subject ORDER BY subject"
                  lines = []
                  for subject, done, needed in self.con.execute(query):
                      lines.append(f"{subject}: {round(100 * done / needed)}% of {needed} hours")
                  return lines


          t = Topic("Polity", "Fundamental Rights", 6, 2)
          print(t)
          print(t.hours_left(), t.is_finished())
          extra = Topic("GK", "Rivers", 3, 4)
          print(extra.hours_left(), extra.is_finished())

          planner = Planner()
          for topic in [Topic("Polity", "Fundamental Rights", 6, 2), Topic("GK", "Rivers", 3),
                        Topic("Polity", "Preamble", 2), Topic("History", "Mughals", 5)]:
              planner.add(topic)
          for bad in [Topic("GK", "Rivers", 4), Topic("GK", "Dams", 0)]:
              try:
                  planner.add(bad)
              except PlannerError as e:
                  print("Refused:", e)
          print([t.name for t in planner.topics()])
          print(planner.get("Preamble"), planner.get("Maths"))

          planner.log("Rivers", 2)
          planner.log("Fundamental Rights", 5)
          for name, hours in [("Maths", 1), ("Rivers", 0)]:
              try:
                  planner.log(name, hours)
              except PlannerError as e:
                  print("Refused:", e)
          print(planner.get("Rivers").hours_left(), planner.get("Fundamental Rights").is_finished(), planner.hours_studied())

          print("Next:", planner.next_up().name)
          for line in planner.progress():
              print(line)
        `],
        hints: [
          md`If Polity shows 88%, the 7 hours on a 6-hour topic counted in full. Use «MIN(done, needed)» in the SUM.`,
          md`If you see «max() arg is an empty sequence», give back None before «max» when no topic is left.`,
          md`If Fundamental Rights comes next, leave out the finished topics first.`,
        ],
      },
    ],
    keys: [
      md`Plan the pieces first: a dataclass for the data, your own error for refusals, a class for the rules and storage.`,
      md`«Topic(*row)» turns a database row back into a dataclass object.`,
      md`«UPDATE ... SET done = done + ?» adds to a value; «done = ?» would replace it.`,
      md`Check first, then change: every refusal happens before the INSERT or UPDATE.`,
      md`SQL can total for you, and «MIN(a, b)» keeps extra hours from counting twice.`,
    ],
  });

  // ---------------------------------------------------------------- Day 129
  day({
    slug: "final-project-finish",
    title: "Final Project 2: Test, Finish and Make It Yours",
    goal: "Test the planner with unittest, add reports, and add a feature of your own.",
    minutes: 60,
    kind: "project",
    needs: [123, 128],
    win: "Today you can now finish a real program: a revision report, a unittest class that catches broken planners, and a feature of your own with its own test. This completes the final project.",
    learn: [
      md`
        ## Finish the planner, then make it yours

        Yesterday's planner stores topics, logs hours and picks what is next. Today it gets a **revision plan** for the days left before the exam. Then you prove the whole planner with unittest, and add a feature of your own.

        Stage 1 starts from your Day 128 planner. If yours is not finished, press **Start from the reference planner** in Stage 1. It is a finished Day 128 planner, so you lose nothing.

        ## Rounding up

        If 8 hours are left and 3 days remain, 2 hours a day is not enough: you need 3. «math.ceil» rounds **up** to the next whole number, and «//» rounds down. Guess the output.
      `,
      ex(py`
        import math

        print(math.ceil(8 / 3), 8 // 3, math.ceil(6 / 3))
      `, { predict: ["3 2 2", "2 2 2", "3 3 2"], answer: 0 }),
      md`
        «6 / 3» is exactly 2, so there is nothing to round up.

        ## The days left come in

        «report(days_left)» takes the number of days as a **parameter**, instead of working it out from today's date inside. A test can then give any number it likes and know the right answer, as on Day 105.

        ## Tests that catch broken planners

        As on Day 125, your test class must fail on broken copies. Pick numbers that show the mistake: 7 hours over 2 days needs 4 a day, but rounding down gives 3. With 6 hours, both would give 3, so that test would prove nothing.
      `,
      pause(md`This day usually takes several sittings. Each stage saves when it passes.`),
      md`
        ## Three stages

        Stage 1 adds the revision report. In Stage 2 your tests must catch 4 broken planners. Stage 3 is your own feature, with its own test.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          import math

          hours = [5, 0, 2]
          print(math.ceil(sum(hours) / 2))
        `, options: ["4", "3", "3.5"], answer: 0,
        explain: md`7 hours over 2 days is 3.5, and «ceil» rounds up to 4.`,
        why: [null, md`That is «7 // 2», rounding down.`, md`«ceil» gives a whole number.`],
        skill: "trace" },
      { q: md`What does this test check?`, code: py`
          def test_report_rounds_up(self):
              self.planner.add(Topic("GK", "Rivers", 5))
              self.assertIn("Per day: 4", self.planner.report(2))
        `, options: ["That 7 hours over 2 days asks for 4 hours a day, rounded up", "That the report has 4 lines", "That Rivers needs 4 hours"], answer: 0, verify: false, mono: false,
        explain: md`«setUp» already added Preamble, 2 hours. With Rivers, 7 hours are left, and 7 ÷ 2 rounds up to 4.`,
        why: [null, md`«assertIn» looks for that one line in the report's list.`, md`Rivers needs 5 hours. The 4 is per day.`],
        skill: "read" },
      { q: md`Your test of the report passes on a planner that rounds down, so it catches nothing. What is the most likely cause?`,
        options: ["The hours divide exactly by the days, so rounding up and down give the same answer", "assertIn cannot check lists", "The test needs its own Planner class"], answer: 0, verify: false, mono: false,
        explain: md`Choose numbers where the two answers differ, like 7 hours over 2 days.`,
        why: [null, md`«assertIn» works on a list of lines.`, md`It uses the real Planner, made in «setUp».`],
        skill: "debug" },
      { q: md`Why does «report» take «days_left» as a parameter, instead of using today's date inside?`,
        options: ["So a test can give a fixed number and know the right answer every day", "Because dates cannot be subtracted", "To make it run faster"], answer: 0, verify: false, mono: false,
        explain: md`With today's date inside, the right answer would change daily, and the test would break (Day 105).`,
        why: [null, md`Dates subtract fine. Testing is the reason.`, md`It changes how testable it is, not its speed.`],
        skill: "memory" },
      { q: md`You add a feature, «finished()». What else should you add?`,
        options: ["A test for it in TestPlanner, with a topic finished exactly on its hours", "Nothing: the other tests cover it", "A print in «finished()» to show it works"], answer: 0, verify: false, mono: false,
        explain: md`New code needs its own test. The edge, done exactly equal to needed, is where mistakes hide.`,
        why: [null, md`The old tests never call «finished()», so they cannot catch its mistakes.`, md`A print shows one run. A test checks it every time.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "s1", stage: 1, carry: "final-project-build/s4", offerStarter: "Start from the reference planner", title: "Stage 1: the revision report",
        task: md`
          Add «import math» at the top, and one method:

          - «report(days_left)» raises «PlannerError("days_left must be at least 1")» if days_left is below 1. Otherwise it gives back a list of lines: «Hours left: N» (all topics' hours left together), «Days left: N», and «Per day: N», rounded up. If there is a next topic, a last line says «Next: subject / name (N hours left)».

          Then add these lines at the end:

          : for line in planner.report(3):
          :     print(line)

          The last four lines printed are:

          | Hours left: 8
          | Days left: 3
          | Per day: 3
          | Next: History / Mughals (5 hours left)
        `,
        starter: py`
          import sqlite3
          from dataclasses import dataclass


          @dataclass
          class Topic:
              subject: str
              name: str
              hours_needed: int
              hours_done: int = 0

              def hours_left(self) -> int:
                  # gives back the hours still to study, never below 0
                  return max(self.hours_needed - self.hours_done, 0)

              def is_finished(self) -> bool:
                  # gives back True once the hours done reach the hours needed
                  return self.hours_done >= self.hours_needed


          class PlannerError(Exception):
              pass


          class Planner:
              def __init__(self, path: str = ":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS topics (subject TEXT, name TEXT, needed INTEGER, done INTEGER)")
                  self.con.execute("CREATE TABLE IF NOT EXISTS sessions (name TEXT, hours INTEGER)")

              def add(self, topic: Topic) -> None:
                  # stores a new topic, or raises PlannerError for hours_needed below 1 or a name already planned
                  if topic.hours_needed < 1:
                      raise PlannerError(f"{topic.name} needs at least 1 hour")
                  if self.get(topic.name) is not None:
                      raise PlannerError(f"{topic.name} is already planned")
                  row = (topic.subject, topic.name, topic.hours_needed, topic.hours_done)
                  self.con.execute("INSERT INTO topics VALUES (?, ?, ?, ?)", row)
                  self.con.commit()

              def get(self, name: str) -> Topic | None:
                  # gives back the Topic with that name, or None
                  query = "SELECT subject, name, needed, done FROM topics WHERE name = ?"
                  row = self.con.execute(query, (name,)).fetchone()
                  if row is None:
                      return None
                  return Topic(*row)

              def topics(self) -> list[Topic]:
                  # gives back every Topic, A to Z by subject, then by name
                  query = "SELECT subject, name, needed, done FROM topics ORDER BY subject, name"
                  return [Topic(*row) for row in self.con.execute(query)]

              def log(self, name: str, hours: int) -> None:
                  # adds study hours to a topic, or raises PlannerError for hours below 1 or an unknown topic
                  if hours < 1:
                      raise PlannerError("hours must be at least 1")
                  if self.get(name) is None:
                      raise PlannerError(f"No topic called {name}")
                  self.con.execute("UPDATE topics SET done = done + ? WHERE name = ?", (hours, name))
                  self.con.execute("INSERT INTO sessions VALUES (?, ?)", (name, hours))
                  self.con.commit()

              def hours_studied(self) -> int:
                  # gives back the total hours of every logged session, or 0
                  total = self.con.execute("SELECT SUM(hours) FROM sessions").fetchone()[0]
                  return 0 if total is None else total

              def next_up(self) -> Topic | None:
                  # gives back the unfinished topic with the most hours left, ties A to Z, or None
                  left = [t for t in self.topics() if not t.is_finished()]
                  if not left:
                      return None
                  return max(left, key=lambda t: t.hours_left())

              def progress(self) -> list[str]:
                  # gives back one line for each subject, A to Z, like "Polity: 75% of 8 hours"
                  query = "SELECT subject, SUM(MIN(done, needed)), SUM(needed) FROM topics GROUP BY subject ORDER BY subject"
                  lines = []
                  for subject, done, needed in self.con.execute(query):
                      lines.append(f"{subject}: {round(100 * done / needed)}% of {needed} hours")
                  return lines


          t = Topic("Polity", "Fundamental Rights", 6, 2)
          print(t)
          print(t.hours_left(), t.is_finished())
          extra = Topic("GK", "Rivers", 3, 4)
          print(extra.hours_left(), extra.is_finished())

          planner = Planner()
          for topic in [Topic("Polity", "Fundamental Rights", 6, 2), Topic("GK", "Rivers", 3),
                        Topic("Polity", "Preamble", 2), Topic("History", "Mughals", 5)]:
              planner.add(topic)
          for bad in [Topic("GK", "Rivers", 4), Topic("GK", "Dams", 0)]:
              try:
                  planner.add(bad)
              except PlannerError as e:
                  print("Refused:", e)
          print([t.name for t in planner.topics()])
          print(planner.get("Preamble"), planner.get("Maths"))

          planner.log("Rivers", 2)
          planner.log("Fundamental Rights", 5)
          for name, hours in [("Maths", 1), ("Rivers", 0)]:
              try:
                  planner.log(name, hours)
              except PlannerError as e:
                  print("Refused:", e)
          print(planner.get("Rivers").hours_left(), planner.get("Fundamental Rights").is_finished(), planner.hours_studied())

          print("Next:", planner.next_up().name)
          for line in planner.progress():
              print(line)
        `,
        solution: py`
          import math
          import sqlite3
          from dataclasses import dataclass


          @dataclass
          class Topic:
              subject: str
              name: str
              hours_needed: int
              hours_done: int = 0

              def hours_left(self) -> int:
                  # gives back the hours still to study, never below 0
                  return max(self.hours_needed - self.hours_done, 0)

              def is_finished(self) -> bool:
                  # gives back True once the hours done reach the hours needed
                  return self.hours_done >= self.hours_needed


          class PlannerError(Exception):
              pass


          class Planner:
              def __init__(self, path: str = ":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS topics (subject TEXT, name TEXT, needed INTEGER, done INTEGER)")
                  self.con.execute("CREATE TABLE IF NOT EXISTS sessions (name TEXT, hours INTEGER)")

              def add(self, topic: Topic) -> None:
                  # stores a new topic, or raises PlannerError for hours_needed below 1 or a name already planned
                  if topic.hours_needed < 1:
                      raise PlannerError(f"{topic.name} needs at least 1 hour")
                  if self.get(topic.name) is not None:
                      raise PlannerError(f"{topic.name} is already planned")
                  row = (topic.subject, topic.name, topic.hours_needed, topic.hours_done)
                  self.con.execute("INSERT INTO topics VALUES (?, ?, ?, ?)", row)
                  self.con.commit()

              def get(self, name: str) -> Topic | None:
                  # gives back the Topic with that name, or None
                  query = "SELECT subject, name, needed, done FROM topics WHERE name = ?"
                  row = self.con.execute(query, (name,)).fetchone()
                  if row is None:
                      return None
                  return Topic(*row)

              def topics(self) -> list[Topic]:
                  # gives back every Topic, A to Z by subject, then by name
                  query = "SELECT subject, name, needed, done FROM topics ORDER BY subject, name"
                  return [Topic(*row) for row in self.con.execute(query)]

              def log(self, name: str, hours: int) -> None:
                  # adds study hours to a topic, or raises PlannerError for hours below 1 or an unknown topic
                  if hours < 1:
                      raise PlannerError("hours must be at least 1")
                  if self.get(name) is None:
                      raise PlannerError(f"No topic called {name}")
                  self.con.execute("UPDATE topics SET done = done + ? WHERE name = ?", (hours, name))
                  self.con.execute("INSERT INTO sessions VALUES (?, ?)", (name, hours))
                  self.con.commit()

              def hours_studied(self) -> int:
                  # gives back the total hours of every logged session, or 0
                  total = self.con.execute("SELECT SUM(hours) FROM sessions").fetchone()[0]
                  return 0 if total is None else total

              def next_up(self) -> Topic | None:
                  # gives back the unfinished topic with the most hours left, ties A to Z, or None
                  left = [t for t in self.topics() if not t.is_finished()]
                  if not left:
                      return None
                  return max(left, key=lambda t: t.hours_left())

              def progress(self) -> list[str]:
                  # gives back one line for each subject, A to Z, like "Polity: 75% of 8 hours"
                  query = "SELECT subject, SUM(MIN(done, needed)), SUM(needed) FROM topics GROUP BY subject ORDER BY subject"
                  lines = []
                  for subject, done, needed in self.con.execute(query):
                      lines.append(f"{subject}: {round(100 * done / needed)}% of {needed} hours")
                  return lines

              def report(self, days_left: int) -> list[str]:
                  # gives back the revision plan, or raises PlannerError if days_left is below 1
                  if days_left < 1:
                      raise PlannerError("days_left must be at least 1")
                  hours = sum(t.hours_left() for t in self.topics())
                  lines = [f"Hours left: {hours}", f"Days left: {days_left}", f"Per day: {math.ceil(hours / days_left)}"]
                  topic = self.next_up()
                  if topic is not None:
                      lines.append(f"Next: {topic.subject} / {topic.name} ({topic.hours_left()} hours left)")
                  return lines


          t = Topic("Polity", "Fundamental Rights", 6, 2)
          print(t)
          print(t.hours_left(), t.is_finished())
          extra = Topic("GK", "Rivers", 3, 4)
          print(extra.hours_left(), extra.is_finished())

          planner = Planner()
          for topic in [Topic("Polity", "Fundamental Rights", 6, 2), Topic("GK", "Rivers", 3),
                        Topic("Polity", "Preamble", 2), Topic("History", "Mughals", 5)]:
              planner.add(topic)
          for bad in [Topic("GK", "Rivers", 4), Topic("GK", "Dams", 0)]:
              try:
                  planner.add(bad)
              except PlannerError as e:
                  print("Refused:", e)
          print([t.name for t in planner.topics()])
          print(planner.get("Preamble"), planner.get("Maths"))

          planner.log("Rivers", 2)
          planner.log("Fundamental Rights", 5)
          for name, hours in [("Maths", 1), ("Rivers", 0)]:
              try:
                  planner.log(name, hours)
              except PlannerError as e:
                  print("Refused:", e)
          print(planner.get("Rivers").hours_left(), planner.get("Fundamental Rights").is_finished(), planner.hours_studied())

          print("Next:", planner.next_up().name)
          for line in planner.progress():
              print(line)

          for line in planner.report(3):
              print(line)
        `,
        tests: [
          { contains: ["Polity: 75% of 8 hours\nHours left: 8\nDays left: 3\nPer day: 3\nNext: History / Mughals (5 hours left)"] },
          { py: py`
              T = need("Topic", "class")
              p = new("Planner")
              assert p.report(2) == ["Hours left: 0", "Days left: 2", "Per day: 0"], f"An empty planner's report should be 3 lines with no Next line, but it gave {p.report(2)}."
              p.add(T("A", "a", 5))
              p.add(T("B", "b", 2, 1))
              want = ["Hours left: 6", "Days left: 4", "Per day: 2", "Next: A / a (5 hours left)"]
              assert p.report(4) == want, f"With 6 hours left over 4 days, the report should be {want}, but it gave {p.report(4)}."
              refused = None
              try:
                  p.report(0)
              except Exception as e:
                  refused = e
              assert type(refused).__name__ == "PlannerError", f"report(0) should raise PlannerError, but it gave {refused!r}."
            ` },
        ],
        wrong: [py`
          import math
          import sqlite3
          from dataclasses import dataclass


          @dataclass
          class Topic:
              subject: str
              name: str
              hours_needed: int
              hours_done: int = 0

              def hours_left(self) -> int:
                  # gives back the hours still to study, never below 0
                  return max(self.hours_needed - self.hours_done, 0)

              def is_finished(self) -> bool:
                  # gives back True once the hours done reach the hours needed
                  return self.hours_done >= self.hours_needed


          class PlannerError(Exception):
              pass


          class Planner:
              def __init__(self, path: str = ":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS topics (subject TEXT, name TEXT, needed INTEGER, done INTEGER)")
                  self.con.execute("CREATE TABLE IF NOT EXISTS sessions (name TEXT, hours INTEGER)")

              def add(self, topic: Topic) -> None:
                  # stores a new topic, or raises PlannerError for hours_needed below 1 or a name already planned
                  if topic.hours_needed < 1:
                      raise PlannerError(f"{topic.name} needs at least 1 hour")
                  if self.get(topic.name) is not None:
                      raise PlannerError(f"{topic.name} is already planned")
                  row = (topic.subject, topic.name, topic.hours_needed, topic.hours_done)
                  self.con.execute("INSERT INTO topics VALUES (?, ?, ?, ?)", row)
                  self.con.commit()

              def get(self, name: str) -> Topic | None:
                  # gives back the Topic with that name, or None
                  query = "SELECT subject, name, needed, done FROM topics WHERE name = ?"
                  row = self.con.execute(query, (name,)).fetchone()
                  if row is None:
                      return None
                  return Topic(*row)

              def topics(self) -> list[Topic]:
                  # gives back every Topic, A to Z by subject, then by name
                  query = "SELECT subject, name, needed, done FROM topics ORDER BY subject, name"
                  return [Topic(*row) for row in self.con.execute(query)]

              def log(self, name: str, hours: int) -> None:
                  # adds study hours to a topic, or raises PlannerError for hours below 1 or an unknown topic
                  if hours < 1:
                      raise PlannerError("hours must be at least 1")
                  if self.get(name) is None:
                      raise PlannerError(f"No topic called {name}")
                  self.con.execute("UPDATE topics SET done = done + ? WHERE name = ?", (hours, name))
                  self.con.execute("INSERT INTO sessions VALUES (?, ?)", (name, hours))
                  self.con.commit()

              def hours_studied(self) -> int:
                  # gives back the total hours of every logged session, or 0
                  total = self.con.execute("SELECT SUM(hours) FROM sessions").fetchone()[0]
                  return 0 if total is None else total

              def next_up(self) -> Topic | None:
                  # gives back the unfinished topic with the most hours left, ties A to Z, or None
                  left = [t for t in self.topics() if not t.is_finished()]
                  if not left:
                      return None
                  return max(left, key=lambda t: t.hours_left())

              def progress(self) -> list[str]:
                  # gives back one line for each subject, A to Z, like "Polity: 75% of 8 hours"
                  query = "SELECT subject, SUM(MIN(done, needed)), SUM(needed) FROM topics GROUP BY subject ORDER BY subject"
                  lines = []
                  for subject, done, needed in self.con.execute(query):
                      lines.append(f"{subject}: {round(100 * done / needed)}% of {needed} hours")
                  return lines

              def report(self, days_left: int) -> list[str]:
                  # gives back the revision plan, or raises PlannerError if days_left is below 1
                  if days_left < 1:
                      raise PlannerError("days_left must be at least 1")
                  hours = sum(t.hours_left() for t in self.topics())
                  lines = [f"Hours left: {hours}", f"Days left: {days_left}", f"Per day: {hours // days_left}"]
                  topic = self.next_up()
                  if topic is not None:
                      lines.append(f"Next: {topic.subject} / {topic.name} ({topic.hours_left()} hours left)")
                  return lines


          t = Topic("Polity", "Fundamental Rights", 6, 2)
          print(t)
          print(t.hours_left(), t.is_finished())
          extra = Topic("GK", "Rivers", 3, 4)
          print(extra.hours_left(), extra.is_finished())

          planner = Planner()
          for topic in [Topic("Polity", "Fundamental Rights", 6, 2), Topic("GK", "Rivers", 3),
                        Topic("Polity", "Preamble", 2), Topic("History", "Mughals", 5)]:
              planner.add(topic)
          for bad in [Topic("GK", "Rivers", 4), Topic("GK", "Dams", 0)]:
              try:
                  planner.add(bad)
              except PlannerError as e:
                  print("Refused:", e)
          print([t.name for t in planner.topics()])
          print(planner.get("Preamble"), planner.get("Maths"))

          planner.log("Rivers", 2)
          planner.log("Fundamental Rights", 5)
          for name, hours in [("Maths", 1), ("Rivers", 0)]:
              try:
                  planner.log(name, hours)
              except PlannerError as e:
                  print("Refused:", e)
          print(planner.get("Rivers").hours_left(), planner.get("Fundamental Rights").is_finished(), planner.hours_studied())

          print("Next:", planner.next_up().name)
          for line in planner.progress():
              print(line)

          for line in planner.report(3):
              print(line)
        `],
        hints: [
          md`If «Per day» shows 2, 8 ÷ 3 was rounded down. Use «math.ceil(hours / days_left)».`,
          md`If an empty planner crashes on «Next», check that «next_up()» is not None first.`,
          md`If «Hours left» is too big, add up «hours_left()», not «hours_needed».`,
        ],
      },
      {
        id: "s2", stage: 2, carry: "s1", title: "Stage 2: catch 4 broken planners",
        task: md`
          Add «import unittest» at the top. Then add this test class at the very end:

          : class TestPlanner(unittest.TestCase):
          :     def setUp(self):
          :         self.planner = Planner()
          :         self.planner.add(Topic("Polity", "Preamble", 2))
          :
          :     def test_get(self):
          :         self.assertEqual(self.planner.get("Preamble").hours_needed, 2)
          :
          : unittest.main()

          Now add at least three more tests. I have **4 broken copies** of «Planner». One lets the same name in twice. One's «log» replaces the hours instead of adding them. One's «next_up» picks the fewest hours left. One's report rounds the hours per day down. Your tests must pass on your planner and fail on every broken copy.
        `,
        starter: py`
          import math
          import sqlite3
          from dataclasses import dataclass


          @dataclass
          class Topic:
              subject: str
              name: str
              hours_needed: int
              hours_done: int = 0

              def hours_left(self) -> int:
                  # gives back the hours still to study, never below 0
                  return max(self.hours_needed - self.hours_done, 0)

              def is_finished(self) -> bool:
                  # gives back True once the hours done reach the hours needed
                  return self.hours_done >= self.hours_needed


          class PlannerError(Exception):
              pass


          class Planner:
              def __init__(self, path: str = ":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS topics (subject TEXT, name TEXT, needed INTEGER, done INTEGER)")
                  self.con.execute("CREATE TABLE IF NOT EXISTS sessions (name TEXT, hours INTEGER)")

              def add(self, topic: Topic) -> None:
                  # stores a new topic, or raises PlannerError for hours_needed below 1 or a name already planned
                  if topic.hours_needed < 1:
                      raise PlannerError(f"{topic.name} needs at least 1 hour")
                  if self.get(topic.name) is not None:
                      raise PlannerError(f"{topic.name} is already planned")
                  row = (topic.subject, topic.name, topic.hours_needed, topic.hours_done)
                  self.con.execute("INSERT INTO topics VALUES (?, ?, ?, ?)", row)
                  self.con.commit()

              def get(self, name: str) -> Topic | None:
                  # gives back the Topic with that name, or None
                  query = "SELECT subject, name, needed, done FROM topics WHERE name = ?"
                  row = self.con.execute(query, (name,)).fetchone()
                  if row is None:
                      return None
                  return Topic(*row)

              def topics(self) -> list[Topic]:
                  # gives back every Topic, A to Z by subject, then by name
                  query = "SELECT subject, name, needed, done FROM topics ORDER BY subject, name"
                  return [Topic(*row) for row in self.con.execute(query)]

              def log(self, name: str, hours: int) -> None:
                  # adds study hours to a topic, or raises PlannerError for hours below 1 or an unknown topic
                  if hours < 1:
                      raise PlannerError("hours must be at least 1")
                  if self.get(name) is None:
                      raise PlannerError(f"No topic called {name}")
                  self.con.execute("UPDATE topics SET done = done + ? WHERE name = ?", (hours, name))
                  self.con.execute("INSERT INTO sessions VALUES (?, ?)", (name, hours))
                  self.con.commit()

              def hours_studied(self) -> int:
                  # gives back the total hours of every logged session, or 0
                  total = self.con.execute("SELECT SUM(hours) FROM sessions").fetchone()[0]
                  return 0 if total is None else total

              def next_up(self) -> Topic | None:
                  # gives back the unfinished topic with the most hours left, ties A to Z, or None
                  left = [t for t in self.topics() if not t.is_finished()]
                  if not left:
                      return None
                  return max(left, key=lambda t: t.hours_left())

              def progress(self) -> list[str]:
                  # gives back one line for each subject, A to Z, like "Polity: 75% of 8 hours"
                  query = "SELECT subject, SUM(MIN(done, needed)), SUM(needed) FROM topics GROUP BY subject ORDER BY subject"
                  lines = []
                  for subject, done, needed in self.con.execute(query):
                      lines.append(f"{subject}: {round(100 * done / needed)}% of {needed} hours")
                  return lines

              def report(self, days_left: int) -> list[str]:
                  # gives back the revision plan, or raises PlannerError if days_left is below 1
                  if days_left < 1:
                      raise PlannerError("days_left must be at least 1")
                  hours = sum(t.hours_left() for t in self.topics())
                  lines = [f"Hours left: {hours}", f"Days left: {days_left}", f"Per day: {math.ceil(hours / days_left)}"]
                  topic = self.next_up()
                  if topic is not None:
                      lines.append(f"Next: {topic.subject} / {topic.name} ({topic.hours_left()} hours left)")
                  return lines


          t = Topic("Polity", "Fundamental Rights", 6, 2)
          print(t)
          print(t.hours_left(), t.is_finished())
          extra = Topic("GK", "Rivers", 3, 4)
          print(extra.hours_left(), extra.is_finished())

          planner = Planner()
          for topic in [Topic("Polity", "Fundamental Rights", 6, 2), Topic("GK", "Rivers", 3),
                        Topic("Polity", "Preamble", 2), Topic("History", "Mughals", 5)]:
              planner.add(topic)
          for bad in [Topic("GK", "Rivers", 4), Topic("GK", "Dams", 0)]:
              try:
                  planner.add(bad)
              except PlannerError as e:
                  print("Refused:", e)
          print([t.name for t in planner.topics()])
          print(planner.get("Preamble"), planner.get("Maths"))

          planner.log("Rivers", 2)
          planner.log("Fundamental Rights", 5)
          for name, hours in [("Maths", 1), ("Rivers", 0)]:
              try:
                  planner.log(name, hours)
              except PlannerError as e:
                  print("Refused:", e)
          print(planner.get("Rivers").hours_left(), planner.get("Fundamental Rights").is_finished(), planner.hours_studied())

          print("Next:", planner.next_up().name)
          for line in planner.progress():
              print(line)

          for line in planner.report(3):
              print(line)
        `,
        solution: py`
          import math
          import sqlite3
          import unittest
          from dataclasses import dataclass


          @dataclass
          class Topic:
              subject: str
              name: str
              hours_needed: int
              hours_done: int = 0

              def hours_left(self) -> int:
                  # gives back the hours still to study, never below 0
                  return max(self.hours_needed - self.hours_done, 0)

              def is_finished(self) -> bool:
                  # gives back True once the hours done reach the hours needed
                  return self.hours_done >= self.hours_needed


          class PlannerError(Exception):
              pass


          class Planner:
              def __init__(self, path: str = ":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS topics (subject TEXT, name TEXT, needed INTEGER, done INTEGER)")
                  self.con.execute("CREATE TABLE IF NOT EXISTS sessions (name TEXT, hours INTEGER)")

              def add(self, topic: Topic) -> None:
                  # stores a new topic, or raises PlannerError for hours_needed below 1 or a name already planned
                  if topic.hours_needed < 1:
                      raise PlannerError(f"{topic.name} needs at least 1 hour")
                  if self.get(topic.name) is not None:
                      raise PlannerError(f"{topic.name} is already planned")
                  row = (topic.subject, topic.name, topic.hours_needed, topic.hours_done)
                  self.con.execute("INSERT INTO topics VALUES (?, ?, ?, ?)", row)
                  self.con.commit()

              def get(self, name: str) -> Topic | None:
                  # gives back the Topic with that name, or None
                  query = "SELECT subject, name, needed, done FROM topics WHERE name = ?"
                  row = self.con.execute(query, (name,)).fetchone()
                  if row is None:
                      return None
                  return Topic(*row)

              def topics(self) -> list[Topic]:
                  # gives back every Topic, A to Z by subject, then by name
                  query = "SELECT subject, name, needed, done FROM topics ORDER BY subject, name"
                  return [Topic(*row) for row in self.con.execute(query)]

              def log(self, name: str, hours: int) -> None:
                  # adds study hours to a topic, or raises PlannerError for hours below 1 or an unknown topic
                  if hours < 1:
                      raise PlannerError("hours must be at least 1")
                  if self.get(name) is None:
                      raise PlannerError(f"No topic called {name}")
                  self.con.execute("UPDATE topics SET done = done + ? WHERE name = ?", (hours, name))
                  self.con.execute("INSERT INTO sessions VALUES (?, ?)", (name, hours))
                  self.con.commit()

              def hours_studied(self) -> int:
                  # gives back the total hours of every logged session, or 0
                  total = self.con.execute("SELECT SUM(hours) FROM sessions").fetchone()[0]
                  return 0 if total is None else total

              def next_up(self) -> Topic | None:
                  # gives back the unfinished topic with the most hours left, ties A to Z, or None
                  left = [t for t in self.topics() if not t.is_finished()]
                  if not left:
                      return None
                  return max(left, key=lambda t: t.hours_left())

              def progress(self) -> list[str]:
                  # gives back one line for each subject, A to Z, like "Polity: 75% of 8 hours"
                  query = "SELECT subject, SUM(MIN(done, needed)), SUM(needed) FROM topics GROUP BY subject ORDER BY subject"
                  lines = []
                  for subject, done, needed in self.con.execute(query):
                      lines.append(f"{subject}: {round(100 * done / needed)}% of {needed} hours")
                  return lines

              def report(self, days_left: int) -> list[str]:
                  # gives back the revision plan, or raises PlannerError if days_left is below 1
                  if days_left < 1:
                      raise PlannerError("days_left must be at least 1")
                  hours = sum(t.hours_left() for t in self.topics())
                  lines = [f"Hours left: {hours}", f"Days left: {days_left}", f"Per day: {math.ceil(hours / days_left)}"]
                  topic = self.next_up()
                  if topic is not None:
                      lines.append(f"Next: {topic.subject} / {topic.name} ({topic.hours_left()} hours left)")
                  return lines


          t = Topic("Polity", "Fundamental Rights", 6, 2)
          print(t)
          print(t.hours_left(), t.is_finished())
          extra = Topic("GK", "Rivers", 3, 4)
          print(extra.hours_left(), extra.is_finished())

          planner = Planner()
          for topic in [Topic("Polity", "Fundamental Rights", 6, 2), Topic("GK", "Rivers", 3),
                        Topic("Polity", "Preamble", 2), Topic("History", "Mughals", 5)]:
              planner.add(topic)
          for bad in [Topic("GK", "Rivers", 4), Topic("GK", "Dams", 0)]:
              try:
                  planner.add(bad)
              except PlannerError as e:
                  print("Refused:", e)
          print([t.name for t in planner.topics()])
          print(planner.get("Preamble"), planner.get("Maths"))

          planner.log("Rivers", 2)
          planner.log("Fundamental Rights", 5)
          for name, hours in [("Maths", 1), ("Rivers", 0)]:
              try:
                  planner.log(name, hours)
              except PlannerError as e:
                  print("Refused:", e)
          print(planner.get("Rivers").hours_left(), planner.get("Fundamental Rights").is_finished(), planner.hours_studied())

          print("Next:", planner.next_up().name)
          for line in planner.progress():
              print(line)

          for line in planner.report(3):
              print(line)


          class TestPlanner(unittest.TestCase):
              def setUp(self):
                  self.planner = Planner()
                  self.planner.add(Topic("Polity", "Preamble", 2))

              def test_get(self):
                  self.assertEqual(self.planner.get("Preamble").hours_needed, 2)

              def test_refuses_same_name(self):
                  with self.assertRaises(PlannerError):
                      self.planner.add(Topic("GK", "Preamble", 3))

              def test_log_adds_hours(self):
                  self.planner.log("Preamble", 1)
                  self.planner.log("Preamble", 1)
                  self.assertTrue(self.planner.get("Preamble").is_finished())

              def test_next_up_most_left(self):
                  self.planner.add(Topic("GK", "Rivers", 5))
                  self.assertEqual(self.planner.next_up().name, "Rivers")

              def test_report_rounds_up(self):
                  self.planner.add(Topic("GK", "Rivers", 5))
                  self.assertIn("Per day: 4", self.planner.report(2))


          unittest.main()
        `,
        tests: [
          { contains: ["Per day: 3\nNext: History / Mughals (5 hours left)"] },
          { py: py`
              r = unit("TestPlanner")
              assert r.testsRun >= 4, f"TestPlanner has {r.testsRun} test(s). Write at least 4, each named «test_...»."
              assert r.wasSuccessful(), "A test in TestPlanner fails on your own planner. Check what each test expects."
              class AllowsSameName:
                  def __init__(self, path: str = ":memory:"):
                      self.con = sqlite3.connect(path)
                      self.con.execute("CREATE TABLE IF NOT EXISTS topics (subject TEXT, name TEXT, needed INTEGER, done INTEGER)")
                      self.con.execute("CREATE TABLE IF NOT EXISTS sessions (name TEXT, hours INTEGER)")

                  def add(self, topic: Topic) -> None:
                      # stores a new topic, or raises PlannerError for hours_needed below 1 or a name already planned
                      if topic.hours_needed < 1:
                          raise PlannerError(f"{topic.name} needs at least 1 hour")
                      row = (topic.subject, topic.name, topic.hours_needed, topic.hours_done)
                      self.con.execute("INSERT INTO topics VALUES (?, ?, ?, ?)", row)
                      self.con.commit()

                  def get(self, name: str) -> Topic | None:
                      # gives back the Topic with that name, or None
                      query = "SELECT subject, name, needed, done FROM topics WHERE name = ?"
                      row = self.con.execute(query, (name,)).fetchone()
                      if row is None:
                          return None
                      return Topic(*row)

                  def topics(self) -> list[Topic]:
                      # gives back every Topic, A to Z by subject, then by name
                      query = "SELECT subject, name, needed, done FROM topics ORDER BY subject, name"
                      return [Topic(*row) for row in self.con.execute(query)]

                  def log(self, name: str, hours: int) -> None:
                      # adds study hours to a topic, or raises PlannerError for hours below 1 or an unknown topic
                      if hours < 1:
                          raise PlannerError("hours must be at least 1")
                      if self.get(name) is None:
                          raise PlannerError(f"No topic called {name}")
                      self.con.execute("UPDATE topics SET done = done + ? WHERE name = ?", (hours, name))
                      self.con.execute("INSERT INTO sessions VALUES (?, ?)", (name, hours))
                      self.con.commit()

                  def hours_studied(self) -> int:
                      # gives back the total hours of every logged session, or 0
                      total = self.con.execute("SELECT SUM(hours) FROM sessions").fetchone()[0]
                      return 0 if total is None else total

                  def next_up(self) -> Topic | None:
                      # gives back the unfinished topic with the most hours left, ties A to Z, or None
                      left = [t for t in self.topics() if not t.is_finished()]
                      if not left:
                          return None
                      return max(left, key=lambda t: t.hours_left())

                  def progress(self) -> list[str]:
                      # gives back one line for each subject, A to Z, like "Polity: 75% of 8 hours"
                      query = "SELECT subject, SUM(MIN(done, needed)), SUM(needed) FROM topics GROUP BY subject ORDER BY subject"
                      lines = []
                      for subject, done, needed in self.con.execute(query):
                          lines.append(f"{subject}: {round(100 * done / needed)}% of {needed} hours")
                      return lines

                  def report(self, days_left: int) -> list[str]:
                      # gives back the revision plan, or raises PlannerError if days_left is below 1
                      if days_left < 1:
                          raise PlannerError("days_left must be at least 1")
                      hours = sum(t.hours_left() for t in self.topics())
                      lines = [f"Hours left: {hours}", f"Days left: {days_left}", f"Per day: {math.ceil(hours / days_left)}"]
                      topic = self.next_up()
                      if topic is not None:
                          lines.append(f"Next: {topic.subject} / {topic.name} ({topic.hours_left()} hours left)")
                      return lines
              assert not unit("TestPlanner", Planner=AllowsSameName).wasSuccessful(), "A planner that lets the same name in twice still passed. Test that adding a planned name raises PlannerError."
              class LogReplaces:
                  def __init__(self, path: str = ":memory:"):
                      self.con = sqlite3.connect(path)
                      self.con.execute("CREATE TABLE IF NOT EXISTS topics (subject TEXT, name TEXT, needed INTEGER, done INTEGER)")
                      self.con.execute("CREATE TABLE IF NOT EXISTS sessions (name TEXT, hours INTEGER)")

                  def add(self, topic: Topic) -> None:
                      # stores a new topic, or raises PlannerError for hours_needed below 1 or a name already planned
                      if topic.hours_needed < 1:
                          raise PlannerError(f"{topic.name} needs at least 1 hour")
                      if self.get(topic.name) is not None:
                          raise PlannerError(f"{topic.name} is already planned")
                      row = (topic.subject, topic.name, topic.hours_needed, topic.hours_done)
                      self.con.execute("INSERT INTO topics VALUES (?, ?, ?, ?)", row)
                      self.con.commit()

                  def get(self, name: str) -> Topic | None:
                      # gives back the Topic with that name, or None
                      query = "SELECT subject, name, needed, done FROM topics WHERE name = ?"
                      row = self.con.execute(query, (name,)).fetchone()
                      if row is None:
                          return None
                      return Topic(*row)

                  def topics(self) -> list[Topic]:
                      # gives back every Topic, A to Z by subject, then by name
                      query = "SELECT subject, name, needed, done FROM topics ORDER BY subject, name"
                      return [Topic(*row) for row in self.con.execute(query)]

                  def log(self, name: str, hours: int) -> None:
                      # adds study hours to a topic, or raises PlannerError for hours below 1 or an unknown topic
                      if hours < 1:
                          raise PlannerError("hours must be at least 1")
                      if self.get(name) is None:
                          raise PlannerError(f"No topic called {name}")
                      self.con.execute("UPDATE topics SET done = ? WHERE name = ?", (hours, name))
                      self.con.execute("INSERT INTO sessions VALUES (?, ?)", (name, hours))
                      self.con.commit()

                  def hours_studied(self) -> int:
                      # gives back the total hours of every logged session, or 0
                      total = self.con.execute("SELECT SUM(hours) FROM sessions").fetchone()[0]
                      return 0 if total is None else total

                  def next_up(self) -> Topic | None:
                      # gives back the unfinished topic with the most hours left, ties A to Z, or None
                      left = [t for t in self.topics() if not t.is_finished()]
                      if not left:
                          return None
                      return max(left, key=lambda t: t.hours_left())

                  def progress(self) -> list[str]:
                      # gives back one line for each subject, A to Z, like "Polity: 75% of 8 hours"
                      query = "SELECT subject, SUM(MIN(done, needed)), SUM(needed) FROM topics GROUP BY subject ORDER BY subject"
                      lines = []
                      for subject, done, needed in self.con.execute(query):
                          lines.append(f"{subject}: {round(100 * done / needed)}% of {needed} hours")
                      return lines

                  def report(self, days_left: int) -> list[str]:
                      # gives back the revision plan, or raises PlannerError if days_left is below 1
                      if days_left < 1:
                          raise PlannerError("days_left must be at least 1")
                      hours = sum(t.hours_left() for t in self.topics())
                      lines = [f"Hours left: {hours}", f"Days left: {days_left}", f"Per day: {math.ceil(hours / days_left)}"]
                      topic = self.next_up()
                      if topic is not None:
                          lines.append(f"Next: {topic.subject} / {topic.name} ({topic.hours_left()} hours left)")
                      return lines
              assert not unit("TestPlanner", Planner=LogReplaces).wasSuccessful(), "A log that replaces the hours still passed. Log the same topic twice, then check its hours done."
              class NextUpFewest:
                  def __init__(self, path: str = ":memory:"):
                      self.con = sqlite3.connect(path)
                      self.con.execute("CREATE TABLE IF NOT EXISTS topics (subject TEXT, name TEXT, needed INTEGER, done INTEGER)")
                      self.con.execute("CREATE TABLE IF NOT EXISTS sessions (name TEXT, hours INTEGER)")

                  def add(self, topic: Topic) -> None:
                      # stores a new topic, or raises PlannerError for hours_needed below 1 or a name already planned
                      if topic.hours_needed < 1:
                          raise PlannerError(f"{topic.name} needs at least 1 hour")
                      if self.get(topic.name) is not None:
                          raise PlannerError(f"{topic.name} is already planned")
                      row = (topic.subject, topic.name, topic.hours_needed, topic.hours_done)
                      self.con.execute("INSERT INTO topics VALUES (?, ?, ?, ?)", row)
                      self.con.commit()

                  def get(self, name: str) -> Topic | None:
                      # gives back the Topic with that name, or None
                      query = "SELECT subject, name, needed, done FROM topics WHERE name = ?"
                      row = self.con.execute(query, (name,)).fetchone()
                      if row is None:
                          return None
                      return Topic(*row)

                  def topics(self) -> list[Topic]:
                      # gives back every Topic, A to Z by subject, then by name
                      query = "SELECT subject, name, needed, done FROM topics ORDER BY subject, name"
                      return [Topic(*row) for row in self.con.execute(query)]

                  def log(self, name: str, hours: int) -> None:
                      # adds study hours to a topic, or raises PlannerError for hours below 1 or an unknown topic
                      if hours < 1:
                          raise PlannerError("hours must be at least 1")
                      if self.get(name) is None:
                          raise PlannerError(f"No topic called {name}")
                      self.con.execute("UPDATE topics SET done = done + ? WHERE name = ?", (hours, name))
                      self.con.execute("INSERT INTO sessions VALUES (?, ?)", (name, hours))
                      self.con.commit()

                  def hours_studied(self) -> int:
                      # gives back the total hours of every logged session, or 0
                      total = self.con.execute("SELECT SUM(hours) FROM sessions").fetchone()[0]
                      return 0 if total is None else total

                  def next_up(self) -> Topic | None:
                      # gives back the unfinished topic with the most hours left, ties A to Z, or None
                      left = [t for t in self.topics() if not t.is_finished()]
                      if not left:
                          return None
                      return min(left, key=lambda t: t.hours_left())

                  def progress(self) -> list[str]:
                      # gives back one line for each subject, A to Z, like "Polity: 75% of 8 hours"
                      query = "SELECT subject, SUM(MIN(done, needed)), SUM(needed) FROM topics GROUP BY subject ORDER BY subject"
                      lines = []
                      for subject, done, needed in self.con.execute(query):
                          lines.append(f"{subject}: {round(100 * done / needed)}% of {needed} hours")
                      return lines

                  def report(self, days_left: int) -> list[str]:
                      # gives back the revision plan, or raises PlannerError if days_left is below 1
                      if days_left < 1:
                          raise PlannerError("days_left must be at least 1")
                      hours = sum(t.hours_left() for t in self.topics())
                      lines = [f"Hours left: {hours}", f"Days left: {days_left}", f"Per day: {math.ceil(hours / days_left)}"]
                      topic = self.next_up()
                      if topic is not None:
                          lines.append(f"Next: {topic.subject} / {topic.name} ({topic.hours_left()} hours left)")
                      return lines
              assert not unit("TestPlanner", Planner=NextUpFewest).wasSuccessful(), "A next_up that picks the fewest hours left still passed. Add a topic with more hours than Preamble, then check next_up."
              class ReportRoundsDown:
                  def __init__(self, path: str = ":memory:"):
                      self.con = sqlite3.connect(path)
                      self.con.execute("CREATE TABLE IF NOT EXISTS topics (subject TEXT, name TEXT, needed INTEGER, done INTEGER)")
                      self.con.execute("CREATE TABLE IF NOT EXISTS sessions (name TEXT, hours INTEGER)")

                  def add(self, topic: Topic) -> None:
                      # stores a new topic, or raises PlannerError for hours_needed below 1 or a name already planned
                      if topic.hours_needed < 1:
                          raise PlannerError(f"{topic.name} needs at least 1 hour")
                      if self.get(topic.name) is not None:
                          raise PlannerError(f"{topic.name} is already planned")
                      row = (topic.subject, topic.name, topic.hours_needed, topic.hours_done)
                      self.con.execute("INSERT INTO topics VALUES (?, ?, ?, ?)", row)
                      self.con.commit()

                  def get(self, name: str) -> Topic | None:
                      # gives back the Topic with that name, or None
                      query = "SELECT subject, name, needed, done FROM topics WHERE name = ?"
                      row = self.con.execute(query, (name,)).fetchone()
                      if row is None:
                          return None
                      return Topic(*row)

                  def topics(self) -> list[Topic]:
                      # gives back every Topic, A to Z by subject, then by name
                      query = "SELECT subject, name, needed, done FROM topics ORDER BY subject, name"
                      return [Topic(*row) for row in self.con.execute(query)]

                  def log(self, name: str, hours: int) -> None:
                      # adds study hours to a topic, or raises PlannerError for hours below 1 or an unknown topic
                      if hours < 1:
                          raise PlannerError("hours must be at least 1")
                      if self.get(name) is None:
                          raise PlannerError(f"No topic called {name}")
                      self.con.execute("UPDATE topics SET done = done + ? WHERE name = ?", (hours, name))
                      self.con.execute("INSERT INTO sessions VALUES (?, ?)", (name, hours))
                      self.con.commit()

                  def hours_studied(self) -> int:
                      # gives back the total hours of every logged session, or 0
                      total = self.con.execute("SELECT SUM(hours) FROM sessions").fetchone()[0]
                      return 0 if total is None else total

                  def next_up(self) -> Topic | None:
                      # gives back the unfinished topic with the most hours left, ties A to Z, or None
                      left = [t for t in self.topics() if not t.is_finished()]
                      if not left:
                          return None
                      return max(left, key=lambda t: t.hours_left())

                  def progress(self) -> list[str]:
                      # gives back one line for each subject, A to Z, like "Polity: 75% of 8 hours"
                      query = "SELECT subject, SUM(MIN(done, needed)), SUM(needed) FROM topics GROUP BY subject ORDER BY subject"
                      lines = []
                      for subject, done, needed in self.con.execute(query):
                          lines.append(f"{subject}: {round(100 * done / needed)}% of {needed} hours")
                      return lines

                  def report(self, days_left: int) -> list[str]:
                      # gives back the revision plan, or raises PlannerError if days_left is below 1
                      if days_left < 1:
                          raise PlannerError("days_left must be at least 1")
                      hours = sum(t.hours_left() for t in self.topics())
                      lines = [f"Hours left: {hours}", f"Days left: {days_left}", f"Per day: {hours // days_left}"]
                      topic = self.next_up()
                      if topic is not None:
                          lines.append(f"Next: {topic.subject} / {topic.name} ({topic.hours_left()} hours left)")
                      return lines
              assert not unit("TestPlanner", Planner=ReportRoundsDown).wasSuccessful(), "A report that rounds down still passed. Pick hours that do not divide exactly by the days."
            ` },
          { uses: ["method:main"], msg: "End the program with «unittest.main()», so the tests run." },
        ],
        wrong: [py`
          import math
          import sqlite3
          import unittest
          from dataclasses import dataclass


          @dataclass
          class Topic:
              subject: str
              name: str
              hours_needed: int
              hours_done: int = 0

              def hours_left(self) -> int:
                  # gives back the hours still to study, never below 0
                  return max(self.hours_needed - self.hours_done, 0)

              def is_finished(self) -> bool:
                  # gives back True once the hours done reach the hours needed
                  return self.hours_done >= self.hours_needed


          class PlannerError(Exception):
              pass


          class Planner:
              def __init__(self, path: str = ":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS topics (subject TEXT, name TEXT, needed INTEGER, done INTEGER)")
                  self.con.execute("CREATE TABLE IF NOT EXISTS sessions (name TEXT, hours INTEGER)")

              def add(self, topic: Topic) -> None:
                  # stores a new topic, or raises PlannerError for hours_needed below 1 or a name already planned
                  if topic.hours_needed < 1:
                      raise PlannerError(f"{topic.name} needs at least 1 hour")
                  if self.get(topic.name) is not None:
                      raise PlannerError(f"{topic.name} is already planned")
                  row = (topic.subject, topic.name, topic.hours_needed, topic.hours_done)
                  self.con.execute("INSERT INTO topics VALUES (?, ?, ?, ?)", row)
                  self.con.commit()

              def get(self, name: str) -> Topic | None:
                  # gives back the Topic with that name, or None
                  query = "SELECT subject, name, needed, done FROM topics WHERE name = ?"
                  row = self.con.execute(query, (name,)).fetchone()
                  if row is None:
                      return None
                  return Topic(*row)

              def topics(self) -> list[Topic]:
                  # gives back every Topic, A to Z by subject, then by name
                  query = "SELECT subject, name, needed, done FROM topics ORDER BY subject, name"
                  return [Topic(*row) for row in self.con.execute(query)]

              def log(self, name: str, hours: int) -> None:
                  # adds study hours to a topic, or raises PlannerError for hours below 1 or an unknown topic
                  if hours < 1:
                      raise PlannerError("hours must be at least 1")
                  if self.get(name) is None:
                      raise PlannerError(f"No topic called {name}")
                  self.con.execute("UPDATE topics SET done = done + ? WHERE name = ?", (hours, name))
                  self.con.execute("INSERT INTO sessions VALUES (?, ?)", (name, hours))
                  self.con.commit()

              def hours_studied(self) -> int:
                  # gives back the total hours of every logged session, or 0
                  total = self.con.execute("SELECT SUM(hours) FROM sessions").fetchone()[0]
                  return 0 if total is None else total

              def next_up(self) -> Topic | None:
                  # gives back the unfinished topic with the most hours left, ties A to Z, or None
                  left = [t for t in self.topics() if not t.is_finished()]
                  if not left:
                      return None
                  return max(left, key=lambda t: t.hours_left())

              def progress(self) -> list[str]:
                  # gives back one line for each subject, A to Z, like "Polity: 75% of 8 hours"
                  query = "SELECT subject, SUM(MIN(done, needed)), SUM(needed) FROM topics GROUP BY subject ORDER BY subject"
                  lines = []
                  for subject, done, needed in self.con.execute(query):
                      lines.append(f"{subject}: {round(100 * done / needed)}% of {needed} hours")
                  return lines

              def report(self, days_left: int) -> list[str]:
                  # gives back the revision plan, or raises PlannerError if days_left is below 1
                  if days_left < 1:
                      raise PlannerError("days_left must be at least 1")
                  hours = sum(t.hours_left() for t in self.topics())
                  lines = [f"Hours left: {hours}", f"Days left: {days_left}", f"Per day: {math.ceil(hours / days_left)}"]
                  topic = self.next_up()
                  if topic is not None:
                      lines.append(f"Next: {topic.subject} / {topic.name} ({topic.hours_left()} hours left)")
                  return lines


          t = Topic("Polity", "Fundamental Rights", 6, 2)
          print(t)
          print(t.hours_left(), t.is_finished())
          extra = Topic("GK", "Rivers", 3, 4)
          print(extra.hours_left(), extra.is_finished())

          planner = Planner()
          for topic in [Topic("Polity", "Fundamental Rights", 6, 2), Topic("GK", "Rivers", 3),
                        Topic("Polity", "Preamble", 2), Topic("History", "Mughals", 5)]:
              planner.add(topic)
          for bad in [Topic("GK", "Rivers", 4), Topic("GK", "Dams", 0)]:
              try:
                  planner.add(bad)
              except PlannerError as e:
                  print("Refused:", e)
          print([t.name for t in planner.topics()])
          print(planner.get("Preamble"), planner.get("Maths"))

          planner.log("Rivers", 2)
          planner.log("Fundamental Rights", 5)
          for name, hours in [("Maths", 1), ("Rivers", 0)]:
              try:
                  planner.log(name, hours)
              except PlannerError as e:
                  print("Refused:", e)
          print(planner.get("Rivers").hours_left(), planner.get("Fundamental Rights").is_finished(), planner.hours_studied())

          print("Next:", planner.next_up().name)
          for line in planner.progress():
              print(line)

          for line in planner.report(3):
              print(line)


          class TestPlanner(unittest.TestCase):
              def setUp(self):
                  self.planner = Planner()
                  self.planner.add(Topic("Polity", "Preamble", 2))

              def test_get(self):
                  self.assertEqual(self.planner.get("Preamble").hours_needed, 2)

              def test_next_up(self):
                  self.assertEqual(self.planner.next_up().name, "Preamble")

              def test_report(self):
                  self.assertIn("Per day: 1", self.planner.report(2))


          unittest.main()
        `],
        hints: [
          md`If the copy that lets the same name in passes, add a test with «with self.assertRaises(PlannerError):» around a second «add» of Preamble.`,
          md`If the copy whose log replaces passes, log Preamble twice, 1 hour each time. A good planner then says it is finished.`,
          md`If the copies with the wrong next_up or report pass, add a topic with 5 hours. Then next_up must be it, and 7 hours over 2 days is 4 a day.`,
        ],
      },
      {
        id: "s3", stage: 3, carry: "s2", noStep: true, title: "Stage 3: Own Twist",
        task: md`
          Make it yours. Add «finished()», which gives back the names of the finished topics, A to Z. Add this line before the test class:

          : print(planner.finished())

          It prints:

          | ['Fundamental Rights']

          Then add a test for it in «TestPlanner». I will try a broken «finished()» that only counts topics with **more** hours than needed, and your test must catch it.

          Then add your own idea too, with a test of its own: a subject filter, a «remove(name)», or the topic studied most. The checks only look at «finished()», so your idea is safe.
        `,
        starter: py`
          import math
          import sqlite3
          import unittest
          from dataclasses import dataclass


          @dataclass
          class Topic:
              subject: str
              name: str
              hours_needed: int
              hours_done: int = 0

              def hours_left(self) -> int:
                  # gives back the hours still to study, never below 0
                  return max(self.hours_needed - self.hours_done, 0)

              def is_finished(self) -> bool:
                  # gives back True once the hours done reach the hours needed
                  return self.hours_done >= self.hours_needed


          class PlannerError(Exception):
              pass


          class Planner:
              def __init__(self, path: str = ":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS topics (subject TEXT, name TEXT, needed INTEGER, done INTEGER)")
                  self.con.execute("CREATE TABLE IF NOT EXISTS sessions (name TEXT, hours INTEGER)")

              def add(self, topic: Topic) -> None:
                  # stores a new topic, or raises PlannerError for hours_needed below 1 or a name already planned
                  if topic.hours_needed < 1:
                      raise PlannerError(f"{topic.name} needs at least 1 hour")
                  if self.get(topic.name) is not None:
                      raise PlannerError(f"{topic.name} is already planned")
                  row = (topic.subject, topic.name, topic.hours_needed, topic.hours_done)
                  self.con.execute("INSERT INTO topics VALUES (?, ?, ?, ?)", row)
                  self.con.commit()

              def get(self, name: str) -> Topic | None:
                  # gives back the Topic with that name, or None
                  query = "SELECT subject, name, needed, done FROM topics WHERE name = ?"
                  row = self.con.execute(query, (name,)).fetchone()
                  if row is None:
                      return None
                  return Topic(*row)

              def topics(self) -> list[Topic]:
                  # gives back every Topic, A to Z by subject, then by name
                  query = "SELECT subject, name, needed, done FROM topics ORDER BY subject, name"
                  return [Topic(*row) for row in self.con.execute(query)]

              def log(self, name: str, hours: int) -> None:
                  # adds study hours to a topic, or raises PlannerError for hours below 1 or an unknown topic
                  if hours < 1:
                      raise PlannerError("hours must be at least 1")
                  if self.get(name) is None:
                      raise PlannerError(f"No topic called {name}")
                  self.con.execute("UPDATE topics SET done = done + ? WHERE name = ?", (hours, name))
                  self.con.execute("INSERT INTO sessions VALUES (?, ?)", (name, hours))
                  self.con.commit()

              def hours_studied(self) -> int:
                  # gives back the total hours of every logged session, or 0
                  total = self.con.execute("SELECT SUM(hours) FROM sessions").fetchone()[0]
                  return 0 if total is None else total

              def next_up(self) -> Topic | None:
                  # gives back the unfinished topic with the most hours left, ties A to Z, or None
                  left = [t for t in self.topics() if not t.is_finished()]
                  if not left:
                      return None
                  return max(left, key=lambda t: t.hours_left())

              def progress(self) -> list[str]:
                  # gives back one line for each subject, A to Z, like "Polity: 75% of 8 hours"
                  query = "SELECT subject, SUM(MIN(done, needed)), SUM(needed) FROM topics GROUP BY subject ORDER BY subject"
                  lines = []
                  for subject, done, needed in self.con.execute(query):
                      lines.append(f"{subject}: {round(100 * done / needed)}% of {needed} hours")
                  return lines

              def report(self, days_left: int) -> list[str]:
                  # gives back the revision plan, or raises PlannerError if days_left is below 1
                  if days_left < 1:
                      raise PlannerError("days_left must be at least 1")
                  hours = sum(t.hours_left() for t in self.topics())
                  lines = [f"Hours left: {hours}", f"Days left: {days_left}", f"Per day: {math.ceil(hours / days_left)}"]
                  topic = self.next_up()
                  if topic is not None:
                      lines.append(f"Next: {topic.subject} / {topic.name} ({topic.hours_left()} hours left)")
                  return lines


          t = Topic("Polity", "Fundamental Rights", 6, 2)
          print(t)
          print(t.hours_left(), t.is_finished())
          extra = Topic("GK", "Rivers", 3, 4)
          print(extra.hours_left(), extra.is_finished())

          planner = Planner()
          for topic in [Topic("Polity", "Fundamental Rights", 6, 2), Topic("GK", "Rivers", 3),
                        Topic("Polity", "Preamble", 2), Topic("History", "Mughals", 5)]:
              planner.add(topic)
          for bad in [Topic("GK", "Rivers", 4), Topic("GK", "Dams", 0)]:
              try:
                  planner.add(bad)
              except PlannerError as e:
                  print("Refused:", e)
          print([t.name for t in planner.topics()])
          print(planner.get("Preamble"), planner.get("Maths"))

          planner.log("Rivers", 2)
          planner.log("Fundamental Rights", 5)
          for name, hours in [("Maths", 1), ("Rivers", 0)]:
              try:
                  planner.log(name, hours)
              except PlannerError as e:
                  print("Refused:", e)
          print(planner.get("Rivers").hours_left(), planner.get("Fundamental Rights").is_finished(), planner.hours_studied())

          print("Next:", planner.next_up().name)
          for line in planner.progress():
              print(line)

          for line in planner.report(3):
              print(line)


          class TestPlanner(unittest.TestCase):
              def setUp(self):
                  self.planner = Planner()
                  self.planner.add(Topic("Polity", "Preamble", 2))

              def test_get(self):
                  self.assertEqual(self.planner.get("Preamble").hours_needed, 2)

              def test_refuses_same_name(self):
                  with self.assertRaises(PlannerError):
                      self.planner.add(Topic("GK", "Preamble", 3))

              def test_log_adds_hours(self):
                  self.planner.log("Preamble", 1)
                  self.planner.log("Preamble", 1)
                  self.assertTrue(self.planner.get("Preamble").is_finished())

              def test_next_up_most_left(self):
                  self.planner.add(Topic("GK", "Rivers", 5))
                  self.assertEqual(self.planner.next_up().name, "Rivers")

              def test_report_rounds_up(self):
                  self.planner.add(Topic("GK", "Rivers", 5))
                  self.assertIn("Per day: 4", self.planner.report(2))


          unittest.main()
        `,
        solution: py`
          import math
          import sqlite3
          import unittest
          from dataclasses import dataclass


          @dataclass
          class Topic:
              subject: str
              name: str
              hours_needed: int
              hours_done: int = 0

              def hours_left(self) -> int:
                  # gives back the hours still to study, never below 0
                  return max(self.hours_needed - self.hours_done, 0)

              def is_finished(self) -> bool:
                  # gives back True once the hours done reach the hours needed
                  return self.hours_done >= self.hours_needed


          class PlannerError(Exception):
              pass


          class Planner:
              def __init__(self, path: str = ":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS topics (subject TEXT, name TEXT, needed INTEGER, done INTEGER)")
                  self.con.execute("CREATE TABLE IF NOT EXISTS sessions (name TEXT, hours INTEGER)")

              def add(self, topic: Topic) -> None:
                  # stores a new topic, or raises PlannerError for hours_needed below 1 or a name already planned
                  if topic.hours_needed < 1:
                      raise PlannerError(f"{topic.name} needs at least 1 hour")
                  if self.get(topic.name) is not None:
                      raise PlannerError(f"{topic.name} is already planned")
                  row = (topic.subject, topic.name, topic.hours_needed, topic.hours_done)
                  self.con.execute("INSERT INTO topics VALUES (?, ?, ?, ?)", row)
                  self.con.commit()

              def get(self, name: str) -> Topic | None:
                  # gives back the Topic with that name, or None
                  query = "SELECT subject, name, needed, done FROM topics WHERE name = ?"
                  row = self.con.execute(query, (name,)).fetchone()
                  if row is None:
                      return None
                  return Topic(*row)

              def topics(self) -> list[Topic]:
                  # gives back every Topic, A to Z by subject, then by name
                  query = "SELECT subject, name, needed, done FROM topics ORDER BY subject, name"
                  return [Topic(*row) for row in self.con.execute(query)]

              def log(self, name: str, hours: int) -> None:
                  # adds study hours to a topic, or raises PlannerError for hours below 1 or an unknown topic
                  if hours < 1:
                      raise PlannerError("hours must be at least 1")
                  if self.get(name) is None:
                      raise PlannerError(f"No topic called {name}")
                  self.con.execute("UPDATE topics SET done = done + ? WHERE name = ?", (hours, name))
                  self.con.execute("INSERT INTO sessions VALUES (?, ?)", (name, hours))
                  self.con.commit()

              def hours_studied(self) -> int:
                  # gives back the total hours of every logged session, or 0
                  total = self.con.execute("SELECT SUM(hours) FROM sessions").fetchone()[0]
                  return 0 if total is None else total

              def next_up(self) -> Topic | None:
                  # gives back the unfinished topic with the most hours left, ties A to Z, or None
                  left = [t for t in self.topics() if not t.is_finished()]
                  if not left:
                      return None
                  return max(left, key=lambda t: t.hours_left())

              def progress(self) -> list[str]:
                  # gives back one line for each subject, A to Z, like "Polity: 75% of 8 hours"
                  query = "SELECT subject, SUM(MIN(done, needed)), SUM(needed) FROM topics GROUP BY subject ORDER BY subject"
                  lines = []
                  for subject, done, needed in self.con.execute(query):
                      lines.append(f"{subject}: {round(100 * done / needed)}% of {needed} hours")
                  return lines

              def report(self, days_left: int) -> list[str]:
                  # gives back the revision plan, or raises PlannerError if days_left is below 1
                  if days_left < 1:
                      raise PlannerError("days_left must be at least 1")
                  hours = sum(t.hours_left() for t in self.topics())
                  lines = [f"Hours left: {hours}", f"Days left: {days_left}", f"Per day: {math.ceil(hours / days_left)}"]
                  topic = self.next_up()
                  if topic is not None:
                      lines.append(f"Next: {topic.subject} / {topic.name} ({topic.hours_left()} hours left)")
                  return lines

              def finished(self) -> list[str]:
                  # gives back the names of the finished topics, A to Z
                  return sorted(t.name for t in self.topics() if t.is_finished())


          t = Topic("Polity", "Fundamental Rights", 6, 2)
          print(t)
          print(t.hours_left(), t.is_finished())
          extra = Topic("GK", "Rivers", 3, 4)
          print(extra.hours_left(), extra.is_finished())

          planner = Planner()
          for topic in [Topic("Polity", "Fundamental Rights", 6, 2), Topic("GK", "Rivers", 3),
                        Topic("Polity", "Preamble", 2), Topic("History", "Mughals", 5)]:
              planner.add(topic)
          for bad in [Topic("GK", "Rivers", 4), Topic("GK", "Dams", 0)]:
              try:
                  planner.add(bad)
              except PlannerError as e:
                  print("Refused:", e)
          print([t.name for t in planner.topics()])
          print(planner.get("Preamble"), planner.get("Maths"))

          planner.log("Rivers", 2)
          planner.log("Fundamental Rights", 5)
          for name, hours in [("Maths", 1), ("Rivers", 0)]:
              try:
                  planner.log(name, hours)
              except PlannerError as e:
                  print("Refused:", e)
          print(planner.get("Rivers").hours_left(), planner.get("Fundamental Rights").is_finished(), planner.hours_studied())

          print("Next:", planner.next_up().name)
          for line in planner.progress():
              print(line)

          for line in planner.report(3):
              print(line)

          print(planner.finished())


          class TestPlanner(unittest.TestCase):
              def setUp(self):
                  self.planner = Planner()
                  self.planner.add(Topic("Polity", "Preamble", 2))

              def test_get(self):
                  self.assertEqual(self.planner.get("Preamble").hours_needed, 2)

              def test_refuses_same_name(self):
                  with self.assertRaises(PlannerError):
                      self.planner.add(Topic("GK", "Preamble", 3))

              def test_log_adds_hours(self):
                  self.planner.log("Preamble", 1)
                  self.planner.log("Preamble", 1)
                  self.assertTrue(self.planner.get("Preamble").is_finished())

              def test_next_up_most_left(self):
                  self.planner.add(Topic("GK", "Rivers", 5))
                  self.assertEqual(self.planner.next_up().name, "Rivers")

              def test_report_rounds_up(self):
                  self.planner.add(Topic("GK", "Rivers", 5))
                  self.assertIn("Per day: 4", self.planner.report(2))

              def test_finished(self):
                  self.planner.add(Topic("GK", "Rivers", 3))
                  self.planner.log("Rivers", 3)
                  self.assertEqual(self.planner.finished(), ["Rivers"])


          unittest.main()
        `,
        tests: [
          { contains: ["Next: History / Mughals (5 hours left)\n['Fundamental Rights']"] },
          { py: py`
              T = need("Topic", "class")
              p = new("Planner")
              p.add(T("A", "z", 2))
              p.add(T("A", "a", 1))
              p.add(T("B", "m", 3))
              p.log("z", 2)
              p.log("a", 3)
              assert p.finished() == ["a", "z"], f"a and z are finished, so finished() should give ['a', 'z'], but it gave {p.finished()}."
              r = unit("TestPlanner")
              assert r.wasSuccessful(), "A test in TestPlanner fails on your own planner."
              class FinishedTooLate:
                  def __init__(self, path: str = ":memory:"):
                      self.con = sqlite3.connect(path)
                      self.con.execute("CREATE TABLE IF NOT EXISTS topics (subject TEXT, name TEXT, needed INTEGER, done INTEGER)")
                      self.con.execute("CREATE TABLE IF NOT EXISTS sessions (name TEXT, hours INTEGER)")

                  def add(self, topic: Topic) -> None:
                      # stores a new topic, or raises PlannerError for hours_needed below 1 or a name already planned
                      if topic.hours_needed < 1:
                          raise PlannerError(f"{topic.name} needs at least 1 hour")
                      if self.get(topic.name) is not None:
                          raise PlannerError(f"{topic.name} is already planned")
                      row = (topic.subject, topic.name, topic.hours_needed, topic.hours_done)
                      self.con.execute("INSERT INTO topics VALUES (?, ?, ?, ?)", row)
                      self.con.commit()

                  def get(self, name: str) -> Topic | None:
                      # gives back the Topic with that name, or None
                      query = "SELECT subject, name, needed, done FROM topics WHERE name = ?"
                      row = self.con.execute(query, (name,)).fetchone()
                      if row is None:
                          return None
                      return Topic(*row)

                  def topics(self) -> list[Topic]:
                      # gives back every Topic, A to Z by subject, then by name
                      query = "SELECT subject, name, needed, done FROM topics ORDER BY subject, name"
                      return [Topic(*row) for row in self.con.execute(query)]

                  def log(self, name: str, hours: int) -> None:
                      # adds study hours to a topic, or raises PlannerError for hours below 1 or an unknown topic
                      if hours < 1:
                          raise PlannerError("hours must be at least 1")
                      if self.get(name) is None:
                          raise PlannerError(f"No topic called {name}")
                      self.con.execute("UPDATE topics SET done = done + ? WHERE name = ?", (hours, name))
                      self.con.execute("INSERT INTO sessions VALUES (?, ?)", (name, hours))
                      self.con.commit()

                  def hours_studied(self) -> int:
                      # gives back the total hours of every logged session, or 0
                      total = self.con.execute("SELECT SUM(hours) FROM sessions").fetchone()[0]
                      return 0 if total is None else total

                  def next_up(self) -> Topic | None:
                      # gives back the unfinished topic with the most hours left, ties A to Z, or None
                      left = [t for t in self.topics() if not t.is_finished()]
                      if not left:
                          return None
                      return max(left, key=lambda t: t.hours_left())

                  def progress(self) -> list[str]:
                      # gives back one line for each subject, A to Z, like "Polity: 75% of 8 hours"
                      query = "SELECT subject, SUM(MIN(done, needed)), SUM(needed) FROM topics GROUP BY subject ORDER BY subject"
                      lines = []
                      for subject, done, needed in self.con.execute(query):
                          lines.append(f"{subject}: {round(100 * done / needed)}% of {needed} hours")
                      return lines

                  def report(self, days_left: int) -> list[str]:
                      # gives back the revision plan, or raises PlannerError if days_left is below 1
                      if days_left < 1:
                          raise PlannerError("days_left must be at least 1")
                      hours = sum(t.hours_left() for t in self.topics())
                      lines = [f"Hours left: {hours}", f"Days left: {days_left}", f"Per day: {math.ceil(hours / days_left)}"]
                      topic = self.next_up()
                      if topic is not None:
                          lines.append(f"Next: {topic.subject} / {topic.name} ({topic.hours_left()} hours left)")
                      return lines

                  def finished(self) -> list[str]:
                      # gives back the names of the finished topics, A to Z
                      return sorted(t.name for t in self.topics() if t.hours_done > t.hours_needed)
              assert not unit("TestPlanner", Planner=FinishedTooLate).wasSuccessful(), "A finished() that misses topics done exactly on their hours still passed. Test a topic whose hours done equal its hours needed."
            ` },
        ],
        wrong: [py`
          import math
          import sqlite3
          import unittest
          from dataclasses import dataclass


          @dataclass
          class Topic:
              subject: str
              name: str
              hours_needed: int
              hours_done: int = 0

              def hours_left(self) -> int:
                  # gives back the hours still to study, never below 0
                  return max(self.hours_needed - self.hours_done, 0)

              def is_finished(self) -> bool:
                  # gives back True once the hours done reach the hours needed
                  return self.hours_done >= self.hours_needed


          class PlannerError(Exception):
              pass


          class Planner:
              def __init__(self, path: str = ":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS topics (subject TEXT, name TEXT, needed INTEGER, done INTEGER)")
                  self.con.execute("CREATE TABLE IF NOT EXISTS sessions (name TEXT, hours INTEGER)")

              def add(self, topic: Topic) -> None:
                  # stores a new topic, or raises PlannerError for hours_needed below 1 or a name already planned
                  if topic.hours_needed < 1:
                      raise PlannerError(f"{topic.name} needs at least 1 hour")
                  if self.get(topic.name) is not None:
                      raise PlannerError(f"{topic.name} is already planned")
                  row = (topic.subject, topic.name, topic.hours_needed, topic.hours_done)
                  self.con.execute("INSERT INTO topics VALUES (?, ?, ?, ?)", row)
                  self.con.commit()

              def get(self, name: str) -> Topic | None:
                  # gives back the Topic with that name, or None
                  query = "SELECT subject, name, needed, done FROM topics WHERE name = ?"
                  row = self.con.execute(query, (name,)).fetchone()
                  if row is None:
                      return None
                  return Topic(*row)

              def topics(self) -> list[Topic]:
                  # gives back every Topic, A to Z by subject, then by name
                  query = "SELECT subject, name, needed, done FROM topics ORDER BY subject, name"
                  return [Topic(*row) for row in self.con.execute(query)]

              def log(self, name: str, hours: int) -> None:
                  # adds study hours to a topic, or raises PlannerError for hours below 1 or an unknown topic
                  if hours < 1:
                      raise PlannerError("hours must be at least 1")
                  if self.get(name) is None:
                      raise PlannerError(f"No topic called {name}")
                  self.con.execute("UPDATE topics SET done = done + ? WHERE name = ?", (hours, name))
                  self.con.execute("INSERT INTO sessions VALUES (?, ?)", (name, hours))
                  self.con.commit()

              def hours_studied(self) -> int:
                  # gives back the total hours of every logged session, or 0
                  total = self.con.execute("SELECT SUM(hours) FROM sessions").fetchone()[0]
                  return 0 if total is None else total

              def next_up(self) -> Topic | None:
                  # gives back the unfinished topic with the most hours left, ties A to Z, or None
                  left = [t for t in self.topics() if not t.is_finished()]
                  if not left:
                      return None
                  return max(left, key=lambda t: t.hours_left())

              def progress(self) -> list[str]:
                  # gives back one line for each subject, A to Z, like "Polity: 75% of 8 hours"
                  query = "SELECT subject, SUM(MIN(done, needed)), SUM(needed) FROM topics GROUP BY subject ORDER BY subject"
                  lines = []
                  for subject, done, needed in self.con.execute(query):
                      lines.append(f"{subject}: {round(100 * done / needed)}% of {needed} hours")
                  return lines

              def report(self, days_left: int) -> list[str]:
                  # gives back the revision plan, or raises PlannerError if days_left is below 1
                  if days_left < 1:
                      raise PlannerError("days_left must be at least 1")
                  hours = sum(t.hours_left() for t in self.topics())
                  lines = [f"Hours left: {hours}", f"Days left: {days_left}", f"Per day: {math.ceil(hours / days_left)}"]
                  topic = self.next_up()
                  if topic is not None:
                      lines.append(f"Next: {topic.subject} / {topic.name} ({topic.hours_left()} hours left)")
                  return lines

              def finished(self) -> list[str]:
                  # gives back the names of the finished topics, A to Z
                  return sorted(t.name for t in self.topics() if t.hours_done > t.hours_needed)


          t = Topic("Polity", "Fundamental Rights", 6, 2)
          print(t)
          print(t.hours_left(), t.is_finished())
          extra = Topic("GK", "Rivers", 3, 4)
          print(extra.hours_left(), extra.is_finished())

          planner = Planner()
          for topic in [Topic("Polity", "Fundamental Rights", 6, 2), Topic("GK", "Rivers", 3),
                        Topic("Polity", "Preamble", 2), Topic("History", "Mughals", 5)]:
              planner.add(topic)
          for bad in [Topic("GK", "Rivers", 4), Topic("GK", "Dams", 0)]:
              try:
                  planner.add(bad)
              except PlannerError as e:
                  print("Refused:", e)
          print([t.name for t in planner.topics()])
          print(planner.get("Preamble"), planner.get("Maths"))

          planner.log("Rivers", 2)
          planner.log("Fundamental Rights", 5)
          for name, hours in [("Maths", 1), ("Rivers", 0)]:
              try:
                  planner.log(name, hours)
              except PlannerError as e:
                  print("Refused:", e)
          print(planner.get("Rivers").hours_left(), planner.get("Fundamental Rights").is_finished(), planner.hours_studied())

          print("Next:", planner.next_up().name)
          for line in planner.progress():
              print(line)

          for line in planner.report(3):
              print(line)

          print(planner.finished())


          class TestPlanner(unittest.TestCase):
              def setUp(self):
                  self.planner = Planner()
                  self.planner.add(Topic("Polity", "Preamble", 2))

              def test_get(self):
                  self.assertEqual(self.planner.get("Preamble").hours_needed, 2)

              def test_refuses_same_name(self):
                  with self.assertRaises(PlannerError):
                      self.planner.add(Topic("GK", "Preamble", 3))

              def test_log_adds_hours(self):
                  self.planner.log("Preamble", 1)
                  self.planner.log("Preamble", 1)
                  self.assertTrue(self.planner.get("Preamble").is_finished())

              def test_next_up_most_left(self):
                  self.planner.add(Topic("GK", "Rivers", 5))
                  self.assertEqual(self.planner.next_up().name, "Rivers")

              def test_report_rounds_up(self):
                  self.planner.add(Topic("GK", "Rivers", 5))
                  self.assertIn("Per day: 4", self.planner.report(2))

              def test_finished(self):
                  self.planner.add(Topic("GK", "Rivers", 3))
                  self.planner.log("Rivers", 3)
                  self.assertEqual(self.planner.finished(), ["Rivers"])


          unittest.main()
        `],
        hints: [
          md`If a topic done exactly on its hours is missing, use «is_finished()», which counts reaching the hours.`,
          md`If the broken copy passes your test, log exactly the hours a topic needs, then check «finished()».`,
          md`If you see «['Fundamental Rights']» missing, the print must come before the test class and «unittest.main()».`,
        ],
      },
      {
        id: "d1", kind: "drill", title: "Laptop Mission: your planner on your laptop",
        task: md`
          This pretend Command Prompt is in your «python-days» folder. Type the command and press Enter.

          On a phone, you may skip this. Phone users are excused from the mission below.
        `,
        steps: [
          { say: md`Run your planner. Type «python planner.py» and press Enter.`,
            expect: ["python planner.py", "py planner.py"],
            output: "Topic(subject='Polity', name='Fundamental Rights', hours_needed=6, hours_done=2)\n4 False\n0 True\nRefused: Rivers is already planned\nRefused: Dams needs at least 1 hour\n['Rivers', 'Mughals', 'Fundamental Rights', 'Preamble']\nTopic(subject='Polity', name='Preamble', hours_needed=2, hours_done=0) None\nRefused: No topic called Maths\nRefused: hours must be at least 1\n1 True 7\nNext: Mughals\nGK: 67% of 3 hours\nHistory: 0% of 5 hours\nPolity: 75% of 8 hours\nHours left: 8\nDays left: 3\nPer day: 3\nNext: History / Mughals (5 hours left)\n['Fundamental Rights']\n......\n----------------------------------------------------------------------\nRan 6 tests in 0.006s\n\nOK" },
        ],
        mission: md`
          Now do it for real.

          1. In IDLE, make a new file with your Stage 3 program. Save it as «planner.py» in «python-days».
          2. Change «planner = Planner()» to «planner = Planner("planner.db")», so the topics go into a real file. Run it with F5.
          3. Run it again. This time it stops with a PlannerError: the database remembered your topics, so adding them again is refused. The topic named in that error is your receipt: write it in your notebook.
          4. To start fresh, delete «planner.db». Better still, change the program to add the topics only when «planner.topics()» is empty.
        `,
        hints: [
          md`Type the words in the grey box exactly, then press Enter.`,
          md`There is one space between the word python and the file name.`,
          md`If python does not work on your laptop, py does the same job.`,
        ],
      },
    ],
    keys: [
      md`«math.ceil» rounds up: plans that must not fall short need it.`,
      md`Pass changing things, like the days left, in as parameters, so tests can fix them.`,
      md`A test class that fails on broken copies proves your tests check the right things.`,
      md`Pick test numbers where a mistake shows: 7 over 2, not 6 over 2.`,
      md`Every new feature gets its own test, at its edges.`,
    ],
  });

  // ---------------------------------------------------------------- Day 130
  day({
    slug: "grand-final-exam",
    title: "Grand Final Exam and Certificate",
    goal: "Prove reading, fixing and writing on unseen Level 10 work.",
    minutes: 50,
    kind: "checkpoint",
    exam: true,
    needs: [105, 125, 129],
    win: "Today you can now read, fix and write professional Python you have never seen. This completes the whole 130-day course.",
    learn: [
      md`
        ## How the grand final works

        Today you prove four skills on Level 10 work you have never seen: reading code, fixing bugs, writing code, and remembering. There are no hints and no Step-through. Nothing is locked: your certificate needs every day done, not a score.

        There is one long **Cold Read** of a program with a dataclass, your own error and a SQLite table, with 5 questions. Then 2 Bug Clinics, 1 Make with unittest, and 5 question cards. Every item shows the day it comes from, like «(Day 122)».

        ## How to read a program with a database

        Read the classes first, as on Day 105. Then read each SQL line as a question: which table, which rows («WHERE»), in what order («ORDER BY»), and how many («LIMIT»). Follow the main program on paper, and write down each row as it goes in.
      `,
      pause(md`This exam takes about 50 minutes. Take a short break after the Cold Read. Your answers are saved.`),
      md`
        ## Your scores and your certificate

        At the end you see a score for each skill. They show what to practise next, not a pass or a fail. The certificate for the complete 130-day course shows these scores, and how many Laptop Missions you did.

        ## What comes next

        You have finished the whole course. You can plan, build and test real programs with the tools professionals use. Keep going:

        1. **A project of your own.** Pick something you would use every day: a fee register, a vocabulary tester, a reading log. Plan it on paper, build it in stages, and test every stage, just like the study planner.
        2. **The Python library reference**, free from the people who make Python: [docs.python.org/3/library](https://docs.python.org/3/library/). When you need a tool, look there first: «csv», «datetime», «sqlite3» and many more.
        3. **CS50P**, Harvard's free course on programming with Python: [cs50.harvard.edu/python](https://cs50.harvard.edu/python/). Its problem sets are good practice on your laptop.
        4. **Automate the Boring Stuff with Python**, a free online book: [automatetheboringstuff.com](https://automatetheboringstuff.com/). It uses Python for everyday jobs, like renaming files and filling spreadsheets.

        Code a little on most days. Ten minutes on your laptop keeps what you have learned, and grows it.
      `,
    ],
    quiz: [
      { q: md`(Day 106) What does this show?`, code: py`
          from collections import defaultdict

          counts = defaultdict(int)
          for word in "tea and more tea".split():
              counts[word] += 1
          print(counts["tea"], counts["coffee"])
        `, options: ["2 0", "2 KeyError", "1 0"], answer: 0,
        explain: md`«defaultdict(int)» starts each new key at 0, so a missing word gives 0 instead of a KeyError.`,
        why: [null, md`A defaultdict makes the missing key instead of raising KeyError.`, md`«tea» appears twice, so its count is 2.`],
        skill: "memory" },
      { q: md`(Day 110) What does a generator function, made with «yield», do?`,
        options: ["It gives back its values one at a time, only when they are asked for", "It makes a list of all its values at once", "It runs again from the top for each value"], answer: 0, verify: false, mono: false,
        explain: md`Each «yield» hands out one value and pauses, so even a huge or endless series fits in memory.`,
        why: [null, md`That is a list comprehension. A generator makes each value only when it is needed.`, md`It carries on from where it paused, not from the top.`],
        skill: "memory" },
      { q: md`(Day 114) What does «@property» above «def area(self):» let you write?`,
        options: ["«shape.area», without brackets, while a method works it out", "«shape.area()» only", "«shape.area = 5» to change the method"], answer: 0, verify: false, mono: false,
        explain: md`A property looks like an attribute, but runs a method each time it is read.`,
        why: [null, md`With «@property», you leave the brackets off.`, md`Without a setter, assigning to a property is an AttributeError.`],
        skill: "memory" },
      { q: md`(Day 118) What does «@timer» written above «def load():» mean?`,
        options: ["«load = timer(load)»: the function is wrapped by the decorator", "«timer» runs once, and «load» is removed", "«load» is renamed «timer»"], answer: 0, verify: false, mono: false,
        explain: md`The decorator takes the function and gives back a wrapped version, under the same name.`,
        why: [null, md`«load» is kept, but wrapped: calling it runs the wrapper.`, md`The name stays «load». It now points at the wrapper.`],
        skill: "memory" },
      { q: md`(Day 127) What does this show?`, code: py`
          import argparse

          parser = argparse.ArgumentParser()
          parser.add_argument("--days", type=int, default=30)
          parser.add_argument("--quiet", action="store_true")
          args = parser.parse_args(["--days", "7"])
          print(args.days + 1, args.quiet)
        `, options: ["8 False", "71 False", "8 True"], answer: 0,
        explain: md`«type=int» makes «"7"» the number 7. «--quiet» was not typed, so it is False.`,
        why: [null, md`«type=int» turned the text into a number, so 7 + 1 is 8.`, md`A «store_true» switch is True only when it is typed.`],
        skill: "memory" },
    ],
    practice: [
      {
        id: "read1", kind: "read", title: "Cold Read: the canteen (Days 116, 117, 121, 122)",
        task: md`Read the program slowly. Do not run it. Then answer the 5 questions.`,
        code: py`
          import sqlite3
          from dataclasses import dataclass


          class OrderError(Exception):
              pass


          @dataclass
          class Item:
              name: str
              price: int


          class Canteen:
              def __init__(self):
                  self.con = sqlite3.connect(":memory:")
                  self.con.execute("CREATE TABLE orders (who TEXT, item TEXT, price INTEGER)")
                  self.menu = {}

              def add_item(self, item):
                  self.menu[item.name] = item

              def order(self, who, name):
                  if name not in self.menu:
                      raise OrderError(f"No {name} today")
                  item = self.menu[name]
                  self.con.execute("INSERT INTO orders VALUES (?, ?, ?)", (who, item.name, item.price))

              def bill(self, who):
                  total = self.con.execute("SELECT SUM(price) FROM orders WHERE who = ?", (who,)).fetchone()[0]
                  return 0 if total is None else total

              def popular(self):
                  query = "SELECT item, COUNT(*) FROM orders GROUP BY item ORDER BY COUNT(*) DESC, item LIMIT 1"
                  return self.con.execute(query).fetchone()


          canteen = Canteen()
          for item in [Item("chai", 15), Item("vada", 20), Item("dosa", 50)]:
              canteen.add_item(item)
          for who, name in [("Asha", "chai"), ("Ravi", "dosa"), ("Asha", "vada"), ("Om", "chai"), ("Ravi", "idli")]:
              try:
                  canteen.order(who, name)
              except OrderError as e:
                  print("Sorry:", e)
          print(canteen.bill("Asha"), canteen.bill("Ravi"), canteen.bill("Meena"))
          print(canteen.popular())
        `,
        questions: [
          { q: md`(Day 117) What does the first print line show?`, options: ["Sorry: No idli today", "Sorry: No vada today", "KeyError: 'idli'"], answer: 0,
            explain: md`Idli is not on the menu, so «order» raises OrderError before it looks the item up, and the «except» prints it.`,
            skill: "read" },
          { q: md`(Day 122) What does the second print line show?`, options: ["35 50 0", "35 50 None", "15 50 0"], answer: 0,
            explain: md`Asha ordered chai and vada: 15 + 20. Ravi's idli was refused, so only his dosa counts. Meena ordered nothing, so SUM gives None, and «bill» turns it into 0.`,
            skill: "read" },
          { q: md`(Day 122) What does the last print line show?`, options: ["('chai', 2)", "('dosa', 1)", "chai"], answer: 0,
            explain: md`Chai was ordered twice, more than any other item. «fetchone» gives the row as a tuple.`,
            skill: "read" },
          { q: md`(Day 116) What would «print(canteen.menu["vada"])» show?`, options: ["Item(name='vada', price=20)", "vada", "<__main__.Item object at 0x...>"], answer: 0,
            explain: md`A dataclass makes its own «__repr__», which shows each field.`,
            skill: "read" },
          { q: md`(Day 121) What does the whole program do?`,
            options: [
              "It takes canteen orders into a table, refuses items not on the menu, and works out bills and the most popular item",
              "It changes the menu prices after each order",
              "It saves the menu to a file and loads it again",
            ],
            answer: 0,
            explain: md`The menu is a dictionary of Items. Each order becomes a row, and SQL adds up the bills and counts the items.`,
            skill: "read" },
        ],
      },
      {
        id: "bug1", kind: "bug", title: "Bug Clinic: the city groups (Day 106)",
        task: md`
          The program groups students by city. It should print «{'Pune': ['Asha', 'Meena'], 'Delhi': ['Ravi']}», but it stops with an AttributeError. Tap the faulty line, then fix it.
        `,
        starter: py`
          from collections import defaultdict

          by_city = defaultdict(int)
          for name, city in [("Asha", "Pune"), ("Ravi", "Delhi"), ("Meena", "Pune")]:
              by_city[city].append(name)
          print(dict(by_city))
        `,
        bugLines: [3],
        solution: py`
          from collections import defaultdict

          by_city = defaultdict(list)
          for name, city in [("Asha", "Pune"), ("Ravi", "Delhi"), ("Meena", "Pune")]:
              by_city[city].append(name)
          print(dict(by_city))
        `,
        tests: [{ output: "{'Pune': ['Asha', 'Meena'], 'Delhi': ['Ravi']}" }],
        wrong: [py`
          from collections import defaultdict

          by_city = defaultdict(int)
          for name, city in [("Asha", "Pune"), ("Ravi", "Delhi"), ("Meena", "Pune")]:
              by_city[city] = [name]
          print(dict(by_city))
        `],
      },
      {
        id: "bug2", kind: "bug", title: "Bug Clinic: the greeting that vanishes (Days 109, 118)",
        task: md`
          The «shout» decorator should make a function's answer capitals. The program should print «HELLO, ASHA», but it prints «None». Tap the faulty line, then fix it.
        `,
        starter: py`
          def shout(func):
              def wrapper(*args, **kwargs):
                  result = func(*args, **kwargs)
                  result.upper()
              return wrapper

          @shout
          def greet(name):
              return f"Hello, {name}"

          print(greet("Asha"))
        `,
        bugLines: [4],
        solution: py`
          def shout(func):
              def wrapper(*args, **kwargs):
                  result = func(*args, **kwargs)
                  return result.upper()
              return wrapper

          @shout
          def greet(name):
              return f"Hello, {name}"

          print(greet("Asha"))
        `,
        tests: [
          { output: "HELLO, ASHA" },
          { py: py`
              expect("greet", ["Om"], "HELLO, OM")
            ` },
        ],
        wrong: [py`
          def shout(func):
              def wrapper(*args, **kwargs):
                  result = func(*args, **kwargs)
                  print(result.upper())
              return wrapper

          @shout
          def greet(name):
              return f"Hello, {name}"

          print(greet("Asha"))
        `],
      },
      {
        id: "make", kind: "make", title: "Make: the top scorers, with tests (Days 116, 123, 124)",
        task: md`
          From a blank page. Write:

          - A dataclass «Score» with «name: str» and «marks: int».
          - «top(scores: list[Score], n: int) -> list[str]», which gives back the names of the n highest scores. Equal marks go A to Z by name.
          - A test class «TestTop» with at least two tests, and «unittest.main()» at the end. I will try two broken copies of «top»: one that ignores ties, and one that ignores n. Your tests must catch both.

          Before the test class, print «top([Score("Ravi", 65), Score("Asha", 72), Score("Om", 90)], 2)». It shows:

          | ['Om', 'Asha']
        `,
        starter: py``,
        solution: py`
          import unittest
          from dataclasses import dataclass


          @dataclass
          class Score:
              name: str
              marks: int


          def top(scores: list[Score], n: int) -> list[str]:
              ranked = sorted(scores, key=lambda s: (-s.marks, s.name))
              return [s.name for s in ranked[:n]]


          print(top([Score("Ravi", 65), Score("Asha", 72), Score("Om", 90)], 2))


          class TestTop(unittest.TestCase):
              def test_highest_first(self):
                  scores = [Score("Ravi", 65), Score("Asha", 72), Score("Om", 90)]
                  self.assertEqual(top(scores, 2), ["Om", "Asha"])

              def test_tie_a_to_z(self):
                  scores = [Score("Zoya", 80), Score("Amit", 80)]
                  self.assertEqual(top(scores, 1), ["Amit"])


          unittest.main()
        `,
        tests: [
          { output: "['Om', 'Asha']" },
          { py: py`
              S = need("Score", "class")
              expect("top", [[S("a", 50), S("c", 70), S("b", 70)], 2], ["b", "c"])
              expect("top", [[S("x", 10)], 3], ["x"])
              expect("top", [[], 2], [])
              ann = need("top", "function").__annotations__
              assert ann.get("scores") == list[S] and ann.get("n") == int and ann.get("return") == list[str], "«top» needs the hints «scores: list[Score]», «n: int» and «-> list[str]»."
              r = unit("TestTop")
              assert r.testsRun >= 2 and r.wasSuccessful(), f"TestTop should have at least 2 tests that pass on your own «top». It ran {r.testsRun}, and {len(r.failures) + len(r.errors)} failed."
              def no_ties(scores, n):
                  ranked = sorted(scores, key=lambda s: -s.marks)
                  return [s.name for s in ranked[:n]]
              assert not unit("TestTop", top=no_ties).wasSuccessful(), "A «top» that leaves equal marks in the order given still passed your tests. Test a tie, with the A to Z name second."
              def all_names(scores, n):
                  ranked = sorted(scores, key=lambda s: (-s.marks, s.name))
                  return [s.name for s in ranked]
              assert not unit("TestTop", top=all_names).wasSuccessful(), "A «top» that ignores n still passed your tests. Ask for fewer names than there are scores."
            ` },
          { uses: ["method:main"], msg: "End the program with «unittest.main()», so the tests run." },
        ],
        wrong: [py`
          import unittest
          from dataclasses import dataclass


          @dataclass
          class Score:
              name: str
              marks: int


          def top(scores: list[Score], n: int) -> list[str]:
              ranked = sorted(scores, key=lambda s: (-s.marks, s.name))
              return [s.name for s in ranked[:n]]


          print(top([Score("Ravi", 65), Score("Asha", 72), Score("Om", 90)], 2))


          class TestTop(unittest.TestCase):
              def test_highest_first(self):
                  scores = [Score("Ravi", 65), Score("Asha", 72), Score("Om", 90)]
                  self.assertEqual(top(scores, 2), ["Om", "Asha"])

              def test_one(self):
                  self.assertEqual(top([Score("Om", 90)], 1), ["Om"])


          unittest.main()
        `],
      },
    ],
    keys: [
      md`You can read classes, dataclasses and SQL together, one question at a time.`,
      md`A bug's line is where the program first does the wrong thing, not where the error shows.`,
      md`Write the code, then tests that would catch it going wrong.`,
      md`Keep coding a little on most days, on a project of your own.`,
    ],
  });
})();
