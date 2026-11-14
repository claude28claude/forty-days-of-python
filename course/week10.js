// Week 10 — Sets and Sorting (Days 64 to 70).
// Days 64 and 65 are sets: no repeats, then comparing two groups. Days 66 and 67
// sort by a rule (key=, then lambda and tuple tie-breaks). Day 68 practises zip,
// any and all. Day 69 is the SSC mock scorer project, and Day 70 is the
// "Read Code Cold" checkpoint in exam mode.
(function () {
  const { day, md, py, ex, code, tip, warn, ask, pause } = window.Course;

  // ---------------------------------------------------------------- Day 64
  day({
    slug: "sets-no-repeats",
    title: "Sets: No Repeats",
    goal: "Remove repeats and check membership quickly with a set.",
    minutes: 40,
    kind: "lesson",
    needs: [22, 29],
    win: "Today you can now remove repeats from a list and check quickly if a value is in a group.",
    learn: [
      md`
        ## A set keeps one of each

        A **set** is a group of values with no repeats. «set(x)» makes a set from a list. Guess what this program prints.
      `,
      ex(py`
        cities = ["Pune", "Delhi", "Pune", "Agra", "Delhi"]
        unique = set(cities)
        print(len(cities))
        print(len(unique))
        print(sorted(unique))
      `, { predict: ["5\n3\n['Agra', 'Delhi', 'Pune']", "5\n5\n['Agra', 'Delhi', 'Pune']", "5\n3\n['Pune', 'Delhi', 'Agra']"], answer: 0 }),
      md`
        The list has 5 items. The set drops each repeat, so 3 cities stay. A set has **no fixed order**: Python may show its items in any order. So we print «sorted(unique)», which gives a list in A to Z order.
      `,
      ask({
        q: md`What is inside «set([4, 4, 4])»?`,
        options: ["One 4", "Three 4s", "Nothing"],
        answer: 0,
        explain: md`A set keeps one copy of each value. The three 4s become one 4.`,
        why: [null, md`That is what a list keeps. A set drops the repeats.`, md`The set is not empty. It keeps one copy of 4.`],
      }),
      md`
        ## Adding and checking

        «set()» with nothing inside makes an empty set. «.add(x)» puts one value into a set, and does nothing if the value is already there. «x in s» asks if «x» is in the set. Guess what this prints.
      `,
      ex(py`
        seen = set()
        for roll in [101, 205, 101, 330, 205]:
            if roll in seen:
                print("Repeat:", roll)
            else:
                seen.add(roll)
        print(len(seen))
      `, { predict: ["Repeat: 101\nRepeat: 205\n3", "Repeat: 101\n3", "Repeat: 101\nRepeat: 205\n5"], answer: 0 }),
      md`
        Each roll number goes into «seen» the first time. The second time, «in» finds it, so the program prints «Repeat». A list checks its items one by one. A set jumps straight to the right place, so «in» stays fast even with a lakh of items.
      `,
      warn(md`An empty «{}» is a **dictionary**, not a set. For an empty set, always write «set()».`),
      md`
        ## No order, so no index

        Curly brackets with single values, like «{72, 65, 80}», also make a set. A list has positions 0, 1, 2, but a set has no order and no positions. Guess what happens.
      `,
      ex(py`
        marks = {72, 65, 80}
        print(marks[0])
      `, { error: true, label: "A crash on purpose", predict: ["TypeError", "72", "65"], answer: 0 }),
      md`
        «marks[0]» fails with **TypeError**, because a set has no position 0. To go through a set, use «for x in sorted(s):», which gives the items in a fixed order.
      `,
      ask({
        q: md`You need the items of a set «s» in a fixed order. What do you write?`,
        options: ["«sorted(s)»", "«s[0]», «s[1]» and so on", "«s.sort()»"],
        answer: 0,
        explain: md`«sorted(s)» gives a new list in order. A list has positions, so you can use it as normal.`,
        why: [null, md`A set has no positions, so «s[0]» gives TypeError.`, md`«.sort()» belongs to lists. A set has no «.sort()» method, so it gives AttributeError.`],
      }),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          nums = [3, 1, 3, 2, 1]
          print(sorted(set(nums)))
        `, options: ["[1, 2, 3]", "[1, 1, 2, 3, 3]", "[3, 1, 2]"], answer: 0,
        explain: md`«set(nums)» keeps 1, 2 and 3 once each. «sorted» puts them in order.`,
        why: [null, md`That is «sorted(nums)». The set drops the repeats first.`, md`«sorted» puts the items in order, from small to big.`],
        skill: "trace" },
      { q: md`What does this show?`, code: py`print(type({}))`,
        options: ["<class 'dict'>", "<class 'set'>", "<class 'list'>"], answer: 0,
        explain: md`Empty curly brackets make an empty dictionary. An empty set is «set()».`,
        why: [null, md`This is the common trap. Python reads «{}» as a dictionary.`, md`A list uses square brackets.`],
        skill: "memory" },
      { q: md`What happens?`, code: py`
          s = {5, 6, 7}
          print(s[1])
        `, options: ["TypeError", "6", "IndexError"], answer: 0, error: true,
        explain: md`A set has no positions, so you cannot use an index on it.`,
        why: [null, md`6 is at position 1 only in a list. A set has no order.`, md`IndexError means a position past the end of a list. A set has no positions at all.`],
        skill: "debug" },
      { q: md`What does this program do?`, code: py`
          names = input("Names: ").split()
          print(len(set(names)))
        `, options: ["It prints how many different names were typed", "It prints how many names were typed, repeats included", "It prints each name once"],
        answer: 0, verify: false, mono: false,
        explain: md`The set drops the repeats. «len» counts what is left.`,
        why: [null, md`That would be «len(names)», without the set.`, md`The program prints one number, not the names.`],
        skill: "read" },
      { q: md`What does this show?`, code: py`
          s = set()
          s.add(5)
          s.add(5)
          s.add(9)
          print(len(s))
        `, options: ["2", "3", "1"], answer: 0,
        explain: md`The second «.add(5)» does nothing, because 5 is already in the set.`,
        why: [null, md`A set never keeps a repeat, so the second 5 is not added.`, md`9 is a new value, so it is added.`],
        skill: "trace" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: repeated roll numbers",
        task: md`Answer each question without running the program.`,
        code: py`
          rolls = [12, 15, 12, 18, 15, 12]
          seen = set()
          repeats = 0
          for r in rolls:
              if r in seen:
                  repeats += 1
              seen.add(r)
          print(repeats, len(seen))
        `,
        inputs: [],
        ask: [{ line: 6, name: "repeats" }, { line: 6, hit: 3, name: "repeats" }, { output: true }],
        hints: [
          md`Write «seen» on paper as an empty group. Go through the list one roll number at a time.`,
          md`Line 6 runs only when the roll number is already in «seen». The first time is the second 12.`,
          md`The repeats are the second 12, the second 15 and the third 12. «seen» ends with three different numbers.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: snacks sold",
        task: md`Answer each question without running the program.`,
        code: py`
          words = "chai samosa chai vada samosa chai".split()
          kinds = set(words)
          count = len(kinds)
          order = sorted(kinds)
          first = order[0]
          print(count, first)
        `,
        inputs: [],
        ask: [{ line: 3, name: "count" }, { line: 5, name: "first" }, { output: true }],
        hints: [
          md`First list the words. Then cross out every word you have seen before.`,
          md`«kinds» keeps one of each snack. «order» is those snacks in A to Z order.`,
          md`Three snacks are left. In A to Z order, the word that starts with «c» comes first.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: different cities",
        task: md`
          Put the lines in order so the program prints:

          | 3 places
          | ['Agra', 'Goa', 'Pune']
        `,
        solution: py`
          trips = ["Agra", "Pune", "Agra", "Goa"]
          places = set()
          for city in trips:
              places.add(city)
          print(len(places), "places")
          print(sorted(places))
        `,
        distractors: ["places = {}", "print(places[0])"],
        indent: "choose",
        tests: [{ output: "3 places\n['Agra', 'Goa', 'Pune']" }],
        hints: [
          md`The list of trips and the empty set come first. The loop fills the set. The prints come last.`,
          md`Only the adding line is inside the loop. Empty curly brackets make a dictionary, not a set.`,
          md`Start the set with the set function and nothing in its brackets. A set has no position 0.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the voters list",
        task: md`
          The program counts how many different names voted. For «Asha Ravi Asha» it should print «Different names: 2». Instead it stops with «AttributeError: 'dict' object has no attribute 'add'».

          Fix the one wrong line.
        `,
        starter: py`
          votes = input("Votes: ").split()
          voters = {}
          for v in votes:
              voters.add(v)
          print("Different names:", len(voters))
        `,
        bugLines: [2],
        solution: py`
          votes = input("Votes: ").split()
          voters = set()
          for v in votes:
              voters.add(v)
          print("Different names:", len(voters))
        `,
        tests: [
          { inputs: ["Asha Ravi Asha"], output: "Different names: 2" },
          { inputs: ["Meena"], output: "Different names: 1" },
          { inputs: ["Ravi Ravi Ravi Ravi"], output: "Different names: 1" },
          { inputs: ["Asha asha Imran"], output: "Different names: 3" },
        ],
        wrong: [py`
          votes = input("Votes: ").split()
          voters = []
          for v in votes:
              voters.append(v)
          print("Different names:", len(voters))
        `],
        hints: [
          md`The error says the value is a dictionary. Which line made «voters»?`,
          md`Line 2 uses empty curly brackets. Python reads that as an empty dictionary.`,
          md`Make an empty set on line 2 with the set function and nothing in its brackets.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: only the repeats", optional: true,
        task: md`
          This program prints each different roll number. Change it so it prints only the roll numbers that were typed **more than once**, in order. For «101 205 101 330 205 101» it shows:

          | Repeated: [101, 205]

          If nothing repeats, it shows «Repeated: []». Use a second set for the repeats.
        `,
        starter: py`
          rolls = [int(x) for x in input("Roll numbers: ").split()]
          seen = set()
          for r in rolls:
              seen.add(r)
          print("Different:", sorted(seen))
        `,
        solution: py`
          rolls = [int(x) for x in input("Roll numbers: ").split()]
          seen = set()
          twice = set()
          for r in rolls:
              if r in seen:
                  twice.add(r)
              seen.add(r)
          print("Repeated:", sorted(twice))
        `,
        tests: [
          { inputs: ["101 205 101 330 205 101"], output: "Repeated: [101, 205]" },
          { inputs: ["5 6 7"], output: "Repeated: []" },
          { inputs: ["9 9"], output: "Repeated: [9]" },
          { inputs: ["400 12 400 12 12"], output: "Repeated: [12, 400]" },
        ],
        wrong: [py`
          rolls = [int(x) for x in input("Roll numbers: ").split()]
          seen = set()
          twice = []
          for r in rolls:
              if r in seen:
                  twice.append(r)
              seen.add(r)
          print("Repeated:", sorted(twice))
        `],
        hints: [
          md`Keep «seen» as it is. Make a second empty set for roll numbers you meet again.`,
          md`Inside the loop, before you add to «seen», ask if the number is already in «seen».`,
          md`If it is already there, add it to the second set. At the end, print the second set sorted, with the new label.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: different visitors",
        task: md`
          Ask for names on one line, with spaces between them. Use a set. Print how many names were typed, how many were different, and the different names in A to Z order, joined with a comma and a space. For «Asha Ravi Asha Meena Ravi Asha» it shows:

          | Typed: 6
          | Different: 3
          | Asha, Meena, Ravi
        `,
        starter: py`

        `,
        solution: py`
          names = input("Names: ").split()
          different = set(names)
          print("Typed:", len(names))
          print("Different:", len(different))
          print(", ".join(sorted(different)))
        `,
        tests: [
          { inputs: ["Asha Ravi Asha Meena Ravi Asha"], output: "Typed: 6\nDifferent: 3\nAsha, Meena, Ravi" },
          { inputs: ["Kiran"], output: "Typed: 1\nDifferent: 1\nKiran" },
          { inputs: ["Zoya Zoya Zoya"], output: "Typed: 3\nDifferent: 1\nZoya" },
          { inputs: ["ravi Ravi Imran"], output: "Typed: 3\nDifferent: 3\nImran, Ravi, ravi" },
          { uses: ["call:set"], msg: md`Use a set to drop the repeats: the set function, with the list of names inside its brackets.` },
        ],
        wrong: [py`
          names = input("Names: ").split()
          print("Typed:", len(names))
          print("Different:", len(names))
          print(", ".join(sorted(names)))
        `, py`
          names = input("Names: ").split()
          different = set(names)
          print("Typed:", len(names))
          print("Different:", len(different))
          print(", ".join(names))
        `],
        hints: [
          md`Split the typed line into a list. Make a set from the list. Then print three lines.`,
          md`The first count comes from the list, the second from the set. The last line needs the set in order.`,
          md`Sort the set, then join the sorted names with a comma and a space between them.`,
        ],
      },
    ],
    keys: [
      md`A **set** keeps one copy of each value. «set(a_list)» drops the repeats.`,
      md`«set()» makes an empty set. «{}» makes an empty dictionary.`,
      md`«.add(x)» puts a value in a set. «x in s» checks a set quickly.`,
      md`A set has no order and no index. Use «sorted(s)» to print it or loop over it.`,
    ],
  });

  // ---------------------------------------------------------------- Day 65
  day({
    slug: "comparing-groups",
    title: "Comparing Two Groups",
    goal: "Find common, combined and missing items between two groups.",
    minutes: 40,
    kind: "lesson",
    needs: [64],
    win: "Today you can now find what two groups share, what they hold together, and what only one of them has.",
    learn: [
      md`
        ## Common items with &

        You know Venn diagrams from the SSC reasoning paper. Two circles overlap, and the middle part is in both. The «&» sign gives that middle part of two sets. Guess what this prints.
      `,
      ex(py`
        asha = {"chai", "samosa", "vada"}
        ravi = {"samosa", "jalebi", "chai"}
        both = asha & ravi
        print(sorted(both))
      `, { predict: ["['chai', 'samosa']", "['chai', 'jalebi', 'samosa', 'vada']", "['vada']"], answer: 0 }),
      md`
        Chai and samosa are in both sets, so «&» keeps them. «&» gives back a new set. The two old sets do not change.
      `,
      md`
        ## All items with |, and one side with -

        The «|» sign (the straight line key, above Enter) gives every item from both sets, each once. The «-» sign gives the items in the left set that are not in the right set. Guess the three lines.
      `,
      ex(py`
        hindi = {"Asha", "Ravi", "Meena"}
        english = {"Ravi", "Imran"}
        print(sorted(hindi | english))
        print(sorted(hindi - english))
        print(sorted(english - hindi))
      `, { predict: [
        "['Asha', 'Imran', 'Meena', 'Ravi']\n['Asha', 'Meena']\n['Imran']",
        "['Asha', 'Imran', 'Meena', 'Ravi']\n['Asha', 'Meena']\n['Asha', 'Meena']",
        "['Asha', 'Imran', 'Meena', 'Ravi', 'Ravi']\n['Asha', 'Meena']\n['Imran']",
      ], answer: 0 }),
      md`
        Ravi is in both sets, but «|» keeps him once. With «-», the order matters. «hindi - english» and «english - hindi» give different answers. Now see a common mistake: using these signs on two lists.
      `,
      ex(py`
        a = [101, 102, 103]
        b = [102, 103, 104]
        print(a & b)
      `, { error: true, label: "A crash on purpose", predict: ["TypeError", "[102, 103]", "[101, 102, 103, 104]"], answer: 0 }),
      md`
        «&», «|» and «-» work on sets, not on lists. Lists give a **TypeError** here. Change each list to a set first: «set(a) & set(b)».
      `,
      ask({
        q: md`«applied» holds everyone who applied. «paid» holds everyone who paid the fee. Who has not paid?`,
        options: ["«applied - paid»", "«paid - applied»", "«applied & paid»"],
        answer: 0,
        explain: md`Start with everyone who applied, then take away those who paid.`,
        why: [null, md`This gives people who paid but did not apply. The order of «-» matters.`, md`«&» gives the people who applied **and** paid.`],
      }),
      md`
        ## List, set or dictionary?

        Ask: what do I need to remember? Choose a **list** when order matters or repeats matter, like runs in each ball of an over. Choose a **set** when you need each value once, a fast «in», or common and missing items. Choose a **dictionary** when each key needs a value, like marks for each name.
      `,
      ask({
        q: md`You want to count how many cups of each drink a stall sold today. Which do you use?`,
        options: ["A dictionary", "A set", "A list"],
        answer: 0,
        explain: md`Each drink (the key) needs a number (the value), so a dictionary fits.`,
        why: [null, md`A set keeps each drink once, but it has no place for a count.`, md`A list can hold the drinks, but finding one drink's count is slow and messy.`],
      }),
    ],
    quiz: [
      { q: md`You have two sets of names, «a» and «b». You want **every** name from both sets, each name once. What do you write?`,
        options: ["«a | b»", "«a & b»", "«a + b»"], answer: 0,
        explain: md`«|» joins both circles of the Venn diagram. A name in both sets is kept once.`,
        why: [null, md`«&» keeps only the names that are in both sets: the middle part.`, md`«+» joins lists, not sets. On two sets it gives TypeError.`],
        skill: "choose" },
      { q: md`«centre_a» and «centre_b» are sets of roll numbers. You need the roll numbers that are **only** at Centre B. What do you write?`,
        options: ["«centre_b - centre_a»", "«centre_a - centre_b»", "«centre_a | centre_b»"], answer: 0,
        explain: md`Start from Centre B and take away everyone who is also at Centre A.`,
        why: [null, md`This is the common mistake. It gives the ones only at Centre A.`, md`«|» gives everyone at either centre.`],
        skill: "choose" },
      { q: md`You need to look up each student's marks by name. Which do you use?`,
        options: ["A dictionary", "A set", "A list"], answer: 0,
        explain: md`A dictionary keeps a value (the marks) for each key (the name).`,
        why: [null, md`A set has no place to keep marks next to a name.`, md`A list has no keys, so you must search the whole list for a name.`],
        skill: "choose" },
      { q: md`You need the runs from each ball of an over, in order, like 1, 4, 0, 4, 6, 1. Which do you use?`,
        options: ["A list", "A set", "A dictionary"], answer: 0,
        explain: md`A list keeps the order and keeps repeats, like the two 4s.`,
        why: [null, md`A set drops the second 4 and the second 1, and it has no order.`, md`There is no key here, only values in order.`],
        skill: "choose" },
      { q: md`What does this program do?`, code: py`
          first = set(input("Line 1: ").split())
          second = set(input("Line 2: ").split())
          print(sorted(first & second))
        `, options: ["It prints the words that are in both lines, in A to Z order", "It prints every word from both lines", "It prints the words that are only in the first line"],
        answer: 0, verify: false, mono: false,
        explain: md`Each line becomes a set of words. «&» keeps the words found in both.`,
        why: [null, md`That would need «|», not «&».`, md`That would need «-», not «&».`],
        skill: "read" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: two batches",
        task: md`Answer each question without running the program.`,
        code: py`
          morning = {"Asha", "Ravi", "Meena", "Imran"}
          evening = {"Ravi", "Imran", "Zoya"}
          both = len(morning & evening)
          only_morning = len(morning - evening)
          everyone = len(morning | evening)
          print(both, only_morning, everyone)
        `,
        inputs: [],
        ask: [{ line: 3, name: "both" }, { line: 4, name: "only_morning" }, { line: 5, name: "everyone" }, { output: true }],
        hints: [
          md`Draw two circles on paper. Put the names that are in both batches in the middle.`,
          md`The middle has the names in both batches. The left part has the morning names that are not in the evening.`,
          md`Two names are in the middle. Count each name only once for everyone: there are five different names.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: new on the menu",
        task: md`Answer each question without running the program.`,
        code: py`
          week1 = {"chai", "coffee", "lassi"}
          week2 = {"chai", "lassi", "juice", "soup"}
          new = week2 - week1
          count = 0
          for item in sorted(new):
              count += 1
              print(count, item)
        `,
        inputs: [],
        ask: [{ line: 6, hit: 2, name: "count" }, { output: true }],
        hints: [
          md`Find the drinks in week 2 that were not on the menu in week 1.`,
          md`The loop goes through those new drinks in A to Z order, and counts them.`,
          md`Two drinks are new. Juice comes before soup in A to Z order.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: two cricket teams",
        task: md`
          Put the lines in order so the program prints:

          | Both: ['Kiran', 'Rahul']
          | Only A: ['Arjun']
        `,
        solution: py`
          team_a = {"Arjun", "Kiran", "Rahul"}
          team_b = {"Kiran", "Sahil", "Rahul"}
          both = team_a & team_b
          only_a = team_a - team_b
          print("Both:", sorted(both))
          print("Only A:", sorted(only_a))
        `,
        distractors: ["only_a = team_b - team_a", "both = team_a | team_b"],
        indent: "given",
        tests: [{ output: "Both: ['Kiran', 'Rahul']\nOnly A: ['Arjun']" }],
        hints: [
          md`The two teams come first. Then work out the two answers. The prints come last.`,
          md`Players in both teams need the sign for common items. Players only in team A need team A first, then the minus sign.`,
          md`Do not use the straight line sign: it gives every player. Do not put team B first with the minus sign.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: who is absent?",
        task: md`
          The program reads the class list, then the names of students who are present. It should print the students who are absent. For «Asha Ravi Meena Imran» and «Ravi Imran» it should print «Absent: ['Asha', 'Meena']». It prints «Absent: []».

          Fix the one wrong line.
        `,
        starter: py`
          roll = set(input("Class list: ").split())
          present = set(input("Present today: ").split())
          absent = present - roll
          print("Absent:", sorted(absent))
        `,
        bugLines: [3],
        solution: py`
          roll = set(input("Class list: ").split())
          present = set(input("Present today: ").split())
          absent = roll - present
          print("Absent:", sorted(absent))
        `,
        tests: [
          { inputs: ["Asha Ravi Meena Imran", "Ravi Imran"], output: "Absent: ['Asha', 'Meena']" },
          { inputs: ["Asha Ravi", "Asha Ravi"], output: "Absent: []" },
          { inputs: ["Asha Ravi", "Ravi Zoya"], output: "Absent: ['Asha']" },
          { inputs: ["Kiran", "Meena"], output: "Absent: ['Kiran']" },
        ],
        wrong: [py`
          roll = set(input("Class list: ").split())
          present = set(input("Present today: ").split())
          absent = roll & present
          print("Absent:", sorted(absent))
        `, py`
          roll = set(input("Class list: ").split())
          present = set(input("Present today: ").split())
          absent = roll | present
          print("Absent:", sorted(absent))
        `],
        hints: [
          md`Absent students are on the class list but not in the present group. Which line works this out?`,
          md`Line 3 uses the minus sign. With minus, the order of the two sets matters.`,
          md`Start with the whole class list on the left, then take away the students who are present.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: a Sudoku checker", optional: true,
        task: md`
          A small Sudoku board has 4 rows and 4 columns. Each row **and** each column must hold 1, 2, 3 and 4 once each. «set(row) == FULL» is True when a row holds exactly those four numbers.

          The function «board_ok» checks only the rows. Change it so it also checks every column, and returns «False» if any column is wrong. The hidden tests try other boards. For this board it prints «True».
        `,
        starter: py`
          FULL = {1, 2, 3, 4}

          def board_ok(board):
              for row in board:
                  if set(row) != FULL:
                      return False
              return True

          board = [
              [1, 2, 3, 4],
              [3, 4, 1, 2],
              [2, 1, 4, 3],
              [4, 3, 2, 1],
          ]
          print(board_ok(board))
        `,
        solution: py`
          FULL = {1, 2, 3, 4}

          def board_ok(board):
              for row in board:
                  if set(row) != FULL:
                      return False
              for c in range(4):
                  column = [board[r][c] for r in range(4)]
                  if set(column) != FULL:
                      return False
              return True

          board = [
              [1, 2, 3, 4],
              [3, 4, 1, 2],
              [2, 1, 4, 3],
              [4, 3, 2, 1],
          ]
          print(board_ok(board))
        `,
        tests: [
          { output: "True" },
          { py: py`
              same_rows = [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]]
              assert call("board_ok", same_rows) is False, "Every row is fine, but each column holds one number four times. Check that you test the columns too."
            ` },
          { py: py`
              last_col = [[1, 2, 3, 4], [3, 4, 1, 2], [2, 1, 4, 3], [4, 3, 1, 2]]
              assert call("board_ok", last_col) is False, "Columns 2 and 3 repeat a number in the bottom row. Check that each column list takes the items at its own column number."
            ` },
          { py: py`
              good = [[2, 1, 4, 3], [4, 3, 2, 1], [1, 2, 3, 4], [3, 4, 1, 2]]
              assert call("board_ok", good) is True, "This board is correct, so «board_ok» should return True. Check that you return False only when a column is wrong."
            ` },
          { py: py`
              bad_row = [[1, 2, 3, 3], [3, 4, 1, 2], [2, 1, 4, 3], [4, 3, 2, 1]]
              assert call("board_ok", bad_row) is False, "The first row repeats 3. Keep the row check."
            ` },
        ],
        wrong: [py`
          FULL = {1, 2, 3, 4}

          def board_ok(board):
              for row in board:
                  if set(row) != FULL:
                      return False
              for c in range(4):
                  column = board[c]
                  if set(column) != FULL:
                      return False
              return True

          board = [
              [1, 2, 3, 4],
              [3, 4, 1, 2],
              [2, 1, 4, 3],
              [4, 3, 2, 1],
          ]
          print(board_ok(board))
        `, py`
          FULL = {1, 2, 3, 4}

          def board_ok(board):
              for row in board:
                  if set(row) != FULL:
                      return False
              for c in range(4):
                  column = [board[r][0] for r in range(4)]
                  if set(column) != FULL:
                      return False
              return True

          board = [
              [1, 2, 3, 4],
              [3, 4, 1, 2],
              [2, 1, 4, 3],
              [4, 3, 2, 1],
          ]
          print(board_ok(board))
        `],
        hints: [
          md`Keep the row loop. After it, add a second loop that goes through the column numbers 0 to 3.`,
          md`For each column number, build a list with the value at that column from every row. Then compare its set with FULL, the same way the row check does.`,
          md`A column is not one row of the board. Use a list comprehension over the row numbers, taking the item at that column from each row. Return False if its set is not FULL.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: two exam centres",
        task: md`
          Ask for the roll numbers at Centre A on one line, then the roll numbers at Centre B on a second line. Turn each roll number into a whole number. Use sets to print three lines: the roll numbers at **both** centres (a clash), how many different roll numbers there are in all, and the roll numbers **only** at Centre A. Print each group sorted.

          For «1001 1043 1500 2210» and «1043 2210 3007 3100» it shows:

          | Both centres: [1043, 2210]
          | All students: 6
          | Only at A: [1001, 1500]
        `,
        starter: py`

        `,
        solution: py`
          a = set([int(x) for x in input("Centre A: ").split()])
          b = set([int(x) for x in input("Centre B: ").split()])
          print("Both centres:", sorted(a & b))
          print("All students:", len(a | b))
          print("Only at A:", sorted(a - b))
        `,
        tests: [
          { inputs: ["1001 1043 1500 2210", "1043 2210 3007 3100"], output: "Both centres: [1043, 2210]\nAll students: 6\nOnly at A: [1001, 1500]" },
          { inputs: ["5 6 7", "8 9"], output: "Both centres: []\nAll students: 5\nOnly at A: [5, 6, 7]" },
          { inputs: ["410 120", "120 410"], output: "Both centres: [120, 410]\nAll students: 2\nOnly at A: []" },
          { inputs: ["99", "1000 99 250"], output: "Both centres: [99]\nAll students: 3\nOnly at A: []" },
          { inputs: ["700 85 700 12", "12 12 9"], output: "Both centres: [12]\nAll students: 4\nOnly at A: [85, 700]" },
          { uses: ["call:set"], msg: md`Make a set from each line of roll numbers, then use the set signs.` },
        ],
        wrong: [py`
          a = set(input("Centre A: ").split())
          b = set(input("Centre B: ").split())
          print("Both centres:", sorted(a & b))
          print("All students:", len(a | b))
          print("Only at A:", sorted(a - b))
        `, py`
          a = set([int(x) for x in input("Centre A: ").split()])
          b = set([int(x) for x in input("Centre B: ").split()])
          print("Both centres:", sorted(a & b))
          print("All students:", len(a) + len(b))
          print("Only at A:", sorted(b - a))
        `],
        hints: [
          md`Read each line, split it, turn each piece into a whole number, and make a set. Then print three lines.`,
          md`Both centres needs the sign for common items. All students needs the straight line sign, then a count. Only at A needs the minus sign.`,
          md`Put Centre A on the left of the minus sign. Count the joined set, not the two sets added together, so a clash is counted once.`,
        ],
      },
    ],
    keys: [
      md`«a & b» gives the items in both sets: the middle of the Venn diagram.`,
      md`«a | b» gives every item from both sets, each once.`,
      md`«a - b» gives the items in «a» that are not in «b». The order matters.`,
      md`These signs work on sets, not lists. Use «set(a_list)» first.`,
      md`List: order and repeats. Set: one of each, fast «in». Dictionary: a value for each key.`,
    ],
  });

  // ---------------------------------------------------------------- Day 66
  day({
    slug: "sorting-by-your-rule",
    title: "Sorting by Your Own Rule",
    goal: "Sort, and find min or max, using a rule you choose.",
    minutes: 45,
    kind: "lesson",
    needs: [26, 32, 58],
    win: "Today you can now sort a list, and find the smallest or biggest item, by any rule you write.",
    learn: [
      md`
        ## Sorting with a rule: key=

        «sorted» puts words in A to Z order. Sometimes you want another rule, like shortest name first. The **key** setting (written «key=») names a function that Python calls on each item. Python then sorts by those answers. Guess the two lines.
      `,
      ex(py`
        names = ["Ravi", "Asha", "Meenakshi", "Om"]
        print(sorted(names))
        print(sorted(names, key=len))
      `, { predict: [
        "['Asha', 'Meenakshi', 'Om', 'Ravi']\n['Om', 'Ravi', 'Asha', 'Meenakshi']",
        "['Asha', 'Meenakshi', 'Om', 'Ravi']\n['Om', 'Asha', 'Ravi', 'Meenakshi']",
        "['Asha', 'Meenakshi', 'Om', 'Ravi']\n['Meenakshi', 'Asha', 'Ravi', 'Om']",
      ], answer: 0 }),
      md`
        With «key=len», Python works out that «len("Ravi")» is 4, «len("Om")» is 2, and so on. It sorts by those numbers. Ravi and Asha both have 4 letters. When two keys are equal, the items **keep their first order**, so Ravi stays before Asha.
      `,
      md`
        ## Your own key function

        You can write the key function yourself with «def». It takes one item and returns the value to sort by. Write only its name after «key=», with **no brackets**. Guess the order.
      `,
      ex(py`
        def get_marks(student):
            return student[1]

        students = [("Asha", 72), ("Ravi", 65), ("Meena", 88), ("Imran", 65)]
        for name, marks in sorted(students, key=get_marks):
            print(name, marks)
      `, { predict: [
        "Ravi 65\nImran 65\nAsha 72\nMeena 88",
        "Imran 65\nRavi 65\nAsha 72\nMeena 88",
        "Asha 72\nImran 65\nMeena 88\nRavi 65",
      ], answer: 0 }),
      md`
        «sorted» calls «get_marks» once for each student and sorts by the marks. Ravi and Imran tie at 65, so Ravi stays first. Now see the most common mistake: brackets after the name.
      `,
      ex(py`
        def get_marks(student):
            return student[1]

        students = [("Asha", 72), ("Ravi", 65)]
        print(sorted(students, key=get_marks()))
      `, { error: true, label: "A crash on purpose", predict: ["TypeError", "[('Ravi', 65), ('Asha', 72)]", "[('Asha', 72), ('Ravi', 65)]"], answer: 0 }),
      md`
        «get_marks()» calls the function at once, with no student, so Python stops with **TypeError**. Without brackets, you hand over the function itself, and «sorted» calls it for each item.
      `,
      pause(md`A good place for a short break. Your progress is saved.`),
      md`
        ## min and max with key=

        «min» and «max» take «key=» too. They give back the whole item with the smallest or biggest key. Guess the two lines.
      `,
      ex(py`
        def get_marks(student):
            return student[1]

        students = [("Asha", 72), ("Ravi", 65), ("Meena", 88), ("Imran", 65)]
        print(max(students, key=get_marks))
        print(min(students, key=get_marks))
      `, { predict: [
        "('Meena', 88)\n('Ravi', 65)",
        "('Meena', 88)\n('Imran', 65)",
        "('Ravi', 65)\n('Asha', 72)",
      ], answer: 0 }),
      md`
        «max» gives Meena's whole tuple, not just 88. Ravi and Imran tie for the lowest, and «min» gives the first one, Ravi. Without «key=», Python compares the names first, which is not what you want.
      `,
      ask({
        q: md`What does «max(cities, key=len)» give?`,
        options: ["The longest city name", "The length of the longest name", "The last city in A to Z order"],
        answer: 0,
        explain: md`«max» gives back the item itself. «key=len» only decides how items are compared.`,
        why: [null, md`With «key=», you get the item back, not its length.`, md`That is «max(cities)» without a key.`],
      }),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`print(sorted(["pear", "fig", "kiwi", "banana"], key=len))`,
        options: ["['fig', 'pear', 'kiwi', 'banana']", "['fig', 'kiwi', 'pear', 'banana']", "['banana', 'fig', 'kiwi', 'pear']"], answer: 0,
        explain: md`The lengths are 4, 3, 4 and 6. Pear and kiwi tie at 4, so they keep their first order: pear, then kiwi.`,
        why: [null, md`Equal keys are not put in A to Z order. They keep the order they had.`, md`That is A to Z order, without the key.`],
        skill: "trace" },
      { q: md`What happens?`, code: py`
          words = ["chai", "samosa", "vada"]
          print(sorted(words, key=len()))
        `, options: ["TypeError", "['chai', 'vada', 'samosa']", "['samosa', 'chai', 'vada']"], answer: 0, error: true,
        explain: md`«len()» runs at once with nothing inside, so Python stops. Write «key=len» with no brackets.`,
        why: [null, md`This is what «key=len» gives. The brackets cause the crash.`, md`The program stops before it prints anything.`],
        skill: "debug" },
      { q: md`What does this show?`, code: py`print(max(["Asha", "Meenakshi", "Ravi"], key=len))`,
        options: ["Meenakshi", "Ravi", "9"], answer: 0,
        explain: md`«key=len» compares the lengths. Meenakshi is the longest, and «max» gives back the name itself.`,
        why: [null, md`Ravi is last in A to Z order. That is «max» without a key.`, md`«max» gives the item, not its key.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          def get_price(item):
              return item[1]

          menu = [("chai", 15), ("samosa", 20), ("vada", 12)]
          print(min(menu, key=get_price)[0])
        `, options: ["It prints the name of the cheapest snack", "It prints the lowest price", "It prints the first snack on the menu"],
        answer: 0, verify: false, mono: false,
        explain: md`«min» with the price as key finds the cheapest tuple. «[0]» takes its name.`,
        why: [null, md`«[0]» takes the name from the tuple, not the price.`, md`«min» looks at every snack, not only the first.`],
        skill: "read" },
      { q: md`In «sorted(items, key=f)», what is «f»?`,
        options: ["A function Python calls on each item, to get the value to sort by", "The position where sorting starts", "The number of items to sort"], answer: 0,
        explain: md`«key=» names a function. Python calls it on each item and sorts by the answers.`,
        why: [null, md`«key=» is not a position. It is a function.`, md`«sorted» always sorts every item.`],
        skill: "memory" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: city rules",
        task: md`Answer each question without running the program.`,
        code: py`
          def last_letter(word):
              return word[-1]
          cities = ["Pune", "Agra", "Delhi", "Surat"]
          ordered = sorted(cities, key=last_letter)
          first = ordered[0]
          longest = max(cities, key=len)
          print(first, longest)
        `,
        inputs: [],
        ask: [{ line: 5, name: "first" }, { line: 6, name: "longest" }, { output: true }],
        hints: [
          md`Write the last letter of each city on paper. The sort uses those letters, not the whole names.`,
          md`The letters are e, a, i and t. For the longest, count the letters. Two cities tie.`,
          md`Agra ends in a, so it comes first. Delhi and Surat both have 5 letters, and «max» gives the first one it meets.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: the snack menu",
        task: md`Answer each question without running the program.`,
        code: py`
          def get_price(item):
              return item["price"]
          menu = [{"name": "chai", "price": 15}, {"name": "samosa", "price": 20}, {"name": "vada", "price": 15}]
          cheap = min(menu, key=get_price)
          cheap_name = cheap["name"]
          names = [m["name"] for m in sorted(menu, key=get_price)]
          print(cheap_name, names)
        `,
        inputs: [],
        ask: [{ line: 5, name: "cheap_name" }, { line: 6, name: "names" }, { output: true }],
        hints: [
          md`Each item is a record with a name and a price. The key function gives back the price.`,
          md`Chai and vada both cost 15. Which one comes first in the menu?`,
          md`On a tie, «min» gives the first one, and «sorted» keeps the first order. So chai comes before vada, and samosa is last.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: top scorers first",
        task: md`
          Put the lines in order so the program prints the players with the most runs first:

          | Kabir 78
          | Rohan 45
          | Dev 12
        `,
        solution: py`
          def get_runs(player):
              return player[1]
          scores = [("Rohan", 45), ("Dev", 12), ("Kabir", 78)]
          ranked = sorted(scores, key=get_runs, reverse=True)
          for name, runs in ranked:
              print(name, runs)
        `,
        distractors: ["ranked = sorted(scores, key=get_runs(), reverse=True)", "return player[0]"],
        indent: "choose",
        tests: [{ output: "Kabir 78\nRohan 45\nDev 12" }],
        hints: [
          md`The key function comes first. Then the list, the sort, and the loop that prints.`,
          md`The key function gives back the runs, which are at position 1. The print line goes inside the loop.`,
          md`In the key setting, write only the function's name, with no brackets.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: youngest first",
        task: md`
          «youngest_first» should give back the people sorted by age, youngest first. People of the same age keep their order. Instead, the program stops with «TypeError: get_age() missing 1 required positional argument: 'person'».

          Fix the one wrong line. It should print:

          | Ravi 19
          | Asha 23
          | Meena 27
        `,
        starter: py`
          def get_age(person):
              return person[1]

          def youngest_first(people):
              return sorted(people, key=get_age())

          group = [("Asha", 23), ("Ravi", 19), ("Meena", 27)]
          for name, age in youngest_first(group):
              print(name, age)
        `,
        bugLines: [5],
        solution: py`
          def get_age(person):
              return person[1]

          def youngest_first(people):
              return sorted(people, key=get_age)

          group = [("Asha", 23), ("Ravi", 19), ("Meena", 27)]
          for name, age in youngest_first(group):
              print(name, age)
        `,
        tests: [
          { output: "Ravi 19\nAsha 23\nMeena 27" },
          { py: py`expect("youngest_first", ([("Om", 20), ("Zara", 18), ("Ali", 20)],), [("Zara", 18), ("Om", 20), ("Ali", 20)])` },
          { py: py`expect("youngest_first", ([("Kiran", 30)],), [("Kiran", 30)])` },
          { py: py`expect("youngest_first", ([],), [])` },
          { py: py`expect("youngest_first", ([("Tara", 41), ("Bina", 25), ("Anil", 25), ("Esha", 19)],), [("Esha", 19), ("Bina", 25), ("Anil", 25), ("Tara", 41)])` },
        ],
        wrong: [py`
          def get_age(person):
              return person[1]

          def youngest_first(people):
              return sorted(people)

          group = [("Asha", 23), ("Ravi", 19), ("Meena", 27)]
          for name, age in youngest_first(group):
              print(name, age)
        `, py`
          def get_age(person):
              return person[1]

          def youngest_first(people):
              return sorted(people, key=get_age, reverse=True)

          group = [("Asha", 23), ("Ravi", 19), ("Meena", 27)]
          for name, age in youngest_first(group):
              print(name, age)
        `],
        hints: [
          md`The error says «get_age» was called with no person. Find the line where its name is followed by brackets.`,
          md`Line 5 calls the function at once, before «sorted» has any item to give it.`,
          md`In the key setting, write only the function's name. Remove the brackets, and «sorted» calls it for each person.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: by the last digit", optional: true,
        task: md`
          This program sorts roll numbers from small to big. Change it so it sorts them by their **last digit**, smallest last digit first. Roll numbers with the same last digit keep the order they were typed. Write a key function with «def». For «31 12 41 20» it shows:

          | [20, 31, 41, 12]
        `,
        starter: py`
          rolls = [int(x) for x in input("Roll numbers: ").split()]
          print(sorted(rolls))
        `,
        solution: py`
          def last_digit(n):
              return n % 10

          rolls = [int(x) for x in input("Roll numbers: ").split()]
          print(sorted(rolls, key=last_digit))
        `,
        tests: [
          { inputs: ["31 12 41 20"], output: "[20, 31, 41, 12]" },
          { inputs: ["7"], output: "[7]" },
          { inputs: ["109 59 9 100"], output: "[100, 109, 59, 9]" },
          { inputs: ["45 35 25 15"], output: "[45, 35, 25, 15]" },
          { uses: ["def"], msg: md`Write the rule as your own function with «def», then give its name after «key=».` },
        ],
        wrong: [py`
          def last_digit(n):
              return n // 10

          rolls = [int(x) for x in input("Roll numbers: ").split()]
          print(sorted(rolls, key=last_digit))
        `, py`
          def last_digit(n):
              return n % 10

          rolls = [int(x) for x in input("Roll numbers: ").split()]
          print(sorted(rolls, key=last_digit, reverse=True))
        `],
        hints: [
          md`Write a small function that takes one roll number and gives back its last digit. Then use it as the key.`,
          md`The remainder after dividing by 10 is the last digit. Put the function above the line that reads the roll numbers.`,
          md`In the print line, add the key setting to «sorted» with your function's name and no brackets.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: city names by length",
        task: md`
          Ask for city names on one line, with spaces between them. Print three lines: the names sorted by length (shortest first, ties keep the typed order) joined with a comma and a space, then the shortest name, then the longest name. Use «key=» each time. When two names tie for shortest or longest, show the first one typed.

          For «Mumbai Goa Pune Agra Chennai» it shows:

          | By length: Goa, Pune, Agra, Mumbai, Chennai
          | Shortest: Goa
          | Longest: Chennai
        `,
        starter: py`

        `,
        solution: py`
          cities = input("Cities: ").split()
          print("By length:", ", ".join(sorted(cities, key=len)))
          print("Shortest:", min(cities, key=len))
          print("Longest:", max(cities, key=len))
        `,
        tests: [
          { inputs: ["Mumbai Goa Pune Agra Chennai"], output: "By length: Goa, Pune, Agra, Mumbai, Chennai\nShortest: Goa\nLongest: Chennai" },
          { inputs: ["Mumbai Delhi Chennai Kolkata"], output: "By length: Delhi, Mumbai, Chennai, Kolkata\nShortest: Delhi\nLongest: Chennai" },
          { inputs: ["Surat"], output: "By length: Surat\nShortest: Surat\nLongest: Surat" },
          { inputs: ["Pune Agra Goa Ooty"], output: "By length: Goa, Pune, Agra, Ooty\nShortest: Goa\nLongest: Pune" },
          { uses: ["kw:key"], msg: md`Use the «key=» setting with «len» to sort and to find the shortest and longest names.` },
        ],
        wrong: [py`
          cities = input("Cities: ").split()
          print("By length:", ", ".join(sorted(cities)))
          print("Shortest:", min(cities, key=len))
          print("Longest:", max(cities, key=len))
        `, py`
          cities = input("Cities: ").split()
          print("By length:", ", ".join(sorted(cities, key=len)))
          print("Shortest:", min(cities))
          print("Longest:", max(cities))
        `],
        hints: [
          md`Split the line into a list. Then print three lines, each using «len» as the key.`,
          md`Sort with the key, then join with a comma and a space. «min» and «max» take the same key setting.`,
          md`Write the key as «len» with no brackets. «min» and «max» give back the name itself, so print it after its label.`,
        ],
      },
    ],
    keys: [
      md`«key=» names a function. Python calls it on each item and sorts by the answers.`,
      md`Write the function's name with **no brackets**: «key=len», not «key=len()».`,
      md`A key function takes one item and returns the value to compare, like «return student[1]».`,
      md`«min» and «max» take «key=» too, and give back the whole item.`,
      md`Items with equal keys keep their first order. «min» and «max» give the first one they meet.`,
    ],
  });

  // ---------------------------------------------------------------- Day 67
  day({
    slug: "lambda-and-tie-breaks",
    title: "Lambda and Tie-Breaks",
    goal: "Write short lambda rules and break ties using tuple keys.",
    minutes: 45,
    kind: "lesson",
    needs: [26, 66],
    win: "Today you can now write a sorting rule in one line, and decide who comes first when two items tie.",
    learn: [
      md`
        ## A function in one line: lambda

        A **lambda** is a small function with no name, written in one line. It is handy for a «key=» rule that you need only once. Guess the two lines.
      `,
      ex(py`
        def get_marks(s):
            return s[1]

        students = [("Asha", 72), ("Ravi", 65), ("Meena", 88)]
        print(sorted(students, key=get_marks))
        print(sorted(students, key=lambda s: s[1]))
      `, { predict: [
        "[('Ravi', 65), ('Asha', 72), ('Meena', 88)]\n[('Ravi', 65), ('Asha', 72), ('Meena', 88)]",
        "[('Ravi', 65), ('Asha', 72), ('Meena', 88)]\n[('Asha', 72), ('Meena', 88), ('Ravi', 65)]",
        "[('Ravi', 65), ('Asha', 72), ('Meena', 88)]\nTypeError",
      ], answer: 0 }),
      md`
        «lambda s: s[1]» does the same job as «get_marks». Read it as: take «s», give back «s[1]». There is no «return» word: the part after the colon is the answer. Use «def» when the rule needs more than one line, an «if», or a name you use again.
      `,
      md`
        ## Tuples compare left to right

        Python compares two tuples item by item, from the left. It looks at the second item only when the first items are equal.

        For text, «<» means "comes first in A to Z order". Guess the three lines.
      `,
      ex(py`
        print((88, "Asha") < (88, "Ravi"))
        print((72, "Zoya") < (88, "Asha"))
        print(sorted([(65, "Ravi"), (88, "Meena"), (65, "Imran")]))
      `, { predict: [
        "True\nTrue\n[(65, 'Imran'), (65, 'Ravi'), (88, 'Meena')]",
        "True\nFalse\n[(65, 'Imran'), (65, 'Ravi'), (88, 'Meena')]",
        "True\nTrue\n[(65, 'Ravi'), (65, 'Imran'), (88, 'Meena')]",
      ], answer: 0 }),
      md`
        In line 2, 72 is less than 88, so Python never looks at the names. So a key that gives back a tuple, like «(marks, name)», sorts by marks and then breaks ties by name. This is called a **tie-break**: a second rule for equal items.
      `,
      pause(md`A good place for a short break. Your progress is saved.`),
      md`
        ## Minus for highest first

        Often we want the highest marks first, but names still A to Z. «reverse=True» flips everything, names too. A minus sign in front of a number flips only that number: «-88» is smaller than «-65». Guess the two lines.
      `,
      ex(py`
        students = [("Ravi", 65), ("Meena", 88), ("Asha", 65), ("Imran", 88)]
        print(sorted(students, key=lambda s: (s[1], s[0]), reverse=True))
        print(sorted(students, key=lambda s: (-s[1], s[0])))
      `, { predict: [
        "[('Meena', 88), ('Imran', 88), ('Ravi', 65), ('Asha', 65)]\n[('Imran', 88), ('Meena', 88), ('Asha', 65), ('Ravi', 65)]",
        "[('Imran', 88), ('Meena', 88), ('Asha', 65), ('Ravi', 65)]\n[('Imran', 88), ('Meena', 88), ('Asha', 65), ('Ravi', 65)]",
        "[('Meena', 88), ('Imran', 88), ('Ravi', 65), ('Asha', 65)]\n[('Asha', 65), ('Ravi', 65), ('Imran', 88), ('Meena', 88)]",
      ], answer: 0 }),
      md`
        The first line is the common mistake: Meena comes before Imran, because «reverse=True» also put the names Z to A. The second line flips only the marks. A minus sign works only on numbers, never on text.
      `,
    ],
    quiz: [
      { q: md`What does this program do?`, code: py`
          menu = [("chai", 15), ("samosa", 20), ("vada", 12)]
          print(max(menu, key=lambda m: m[1])[0])
        `, options: ["It prints the name of the costliest snack", "It prints the highest price", "It prints the snack that is last in A to Z order"],
        answer: 0, verify: false, mono: false,
        explain: md`The lambda gives back the price, so «max» finds the costliest tuple. «[0]» takes its name.`,
        why: [null, md`«[0]» takes the name from the tuple, not the price.`, md`That is «max» without a key. The lambda makes it compare prices.`],
        skill: "read" },
      { q: md`What does this program do?`, code: py`
          team = [("Om", 45), ("Dev", 60), ("Ali", 45)]
          for name, runs in sorted(team, key=lambda p: (-p[1], p[0])):
              print(name, runs)
        `, options: ["It lists players by runs, most runs first, and equal runs in A to Z order of name", "It lists players by runs, fewest runs first", "It lists players in A to Z order of name only"],
        answer: 0, verify: false, mono: false,
        explain: md`«-p[1]» puts the most runs first. «p[0]» breaks a tie by name, A to Z.`,
        why: [null, md`The minus sign flips the runs, so the most runs come first.`, md`The name is only the second rule. Runs decide first.`],
        skill: "read" },
      { q: md`What does this show?`, code: py`print(sorted([(3, "b"), (1, "z"), (3, "a")]))`,
        options: ["[(1, 'z'), (3, 'a'), (3, 'b')]", "[(1, 'z'), (3, 'b'), (3, 'a')]", "[(3, 'a'), (3, 'b'), (1, 'z')]"], answer: 0,
        explain: md`Python compares the first items. Only the two 3s are equal, so their letters decide: a before b.`,
        why: [null, md`When the first items are equal, Python compares the second items. It does not keep the old order.`, md`The first item decides first. 1 is smaller than 3.`],
        skill: "trace" },
      { q: md`Which «def» does the same job as «lambda w: len(w) * 2»?`,
        options: ["def f(w):\n    return len(w) * 2", "def f(w):\n    print(len(w) * 2)", "def f():\n    return len(w) * 2"], answer: 0,
        explain: md`The lambda takes «w» and gives back «len(w) * 2». A «def» needs the parameter and a «return».`,
        why: [null, md`«print» shows the value but gives back None. A key needs a «return».`, md`The lambda has one parameter, «w». This function has none.`],
        skill: "write" },
      { q: md`What happens?`, code: py`
          names = ["Ravi", "Asha"]
          print(sorted(names, key=lambda n: -n))
        `, options: ["TypeError", "['Ravi', 'Asha']", "['Asha', 'Ravi']"], answer: 0, error: true,
        explain: md`A minus sign works only on numbers. Python cannot make a name negative.`,
        why: [null, md`Python stops before it sorts. To get Z to A for text, use «reverse=True».`, md`The minus sign on text causes an error, so nothing is printed.`],
        skill: "debug" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: snack rules",
        task: md`Answer each question without running the program.`,
        code: py`
          words = ["chai", "jalebi", "vada", "idli"]
          by_last = sorted(words, key=lambda w: w[-1])
          first = by_last[0]
          longest = max(words, key=lambda w: len(w))
          print(first, longest)
        `,
        inputs: [],
        ask: [{ line: 3, name: "first" }, { line: 4, name: "longest" }, { output: true }],
        hints: [
          md`The first lambda gives back the last letter of each word. Write those letters on paper.`,
          md`The last letters are i, i, a and i. Only one word ends in a.`,
          md`Vada ends in a, so it comes first. The second lambda gives back the length, and jalebi is the longest word.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: runs and balls",
        task: md`Each tuple is a name, runs and balls faced. Answer each question without running the program.`,
        code: py`
          team = [("Dev", 45, 30), ("Om", 45, 25), ("Kabir", 60, 50)]
          ranked = sorted(team, key=lambda p: (-p[1], p[2]))
          top = ranked[0][0]
          second = ranked[1][0]
          print(top, second, ranked[2][0])
        `,
        inputs: [],
        ask: [{ line: 3, name: "top" }, { line: 4, name: "second" }, { output: true }],
        hints: [
          md`The key is a tuple: minus the runs, then the balls. Write the key for each player.`,
          md`The keys are (-45, 30), (-45, 25) and (-60, 50). The smallest key comes first.`,
          md`-60 is the smallest, so Kabir is first. Dev and Om tie on runs, and Om faced fewer balls.`,
        ],
      },
      {
        id: "f1", kind: "fill", title: "Fill the gaps: highest marks first",
        task: md`
          Fill the gaps so the list is sorted by marks, highest first, and equal marks in A to Z order of name. It prints:

          | Imran 88
          | Meena 88
          | Asha 65
          | Ravi 65
        `,
        template: py`
          students = [("Ravi", 65), ("Meena", 88), ("Asha", 65), ("Imran", 88)]
          ranked = sorted(students, key=⟦lambda⟧ s: (⟦-⟧s[1], s[⟦0⟧]))
          for name, marks in ranked:
              print(name, marks)
        `,
        tests: [{ output: "Imran 88\nMeena 88\nAsha 65\nRavi 65" }],
        hints: [
          md`The rule is a one-line function with no name. Its key is a tuple: marks first, then name.`,
          md`The first gap is the word that starts a one-line function. The second gap flips the marks so the highest comes first.`,
          md`The last gap is the position of the name in each tuple. Names are at the first position.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the batting table",
        task: md`
          «rank» should sort players by runs, most runs first. Players with equal runs go in A to Z order of name. For this team it should print:

          | Kabir 60
          | Ali 45
          | Om 45
          | Dev 12

          It prints Om before Ali. Fix the one wrong line.
        `,
        starter: py`
          def rank(players):
              return sorted(players, key=lambda p: (p[1], p[0]), reverse=True)

          team = [("Om", 45), ("Dev", 12), ("Kabir", 60), ("Ali", 45)]
          for name, runs in rank(team):
              print(name, runs)
        `,
        bugLines: [2],
        solution: py`
          def rank(players):
              return sorted(players, key=lambda p: (-p[1], p[0]))

          team = [("Om", 45), ("Dev", 12), ("Kabir", 60), ("Ali", 45)]
          for name, runs in rank(team):
              print(name, runs)
        `,
        tests: [
          { output: "Kabir 60\nAli 45\nOm 45\nDev 12" },
          { py: py`expect("rank", ([("Zoya", 30), ("Bina", 30), ("Mira", 30)],), [("Bina", 30), ("Mira", 30), ("Zoya", 30)])` },
          { py: py`expect("rank", ([("Raj", 5)],), [("Raj", 5)])` },
          { py: py`expect("rank", ([("Tara", 0), ("Anil", 99), ("Esha", 0)],), [("Anil", 99), ("Esha", 0), ("Tara", 0)])` },
        ],
        wrong: [py`
          def rank(players):
              return sorted(players, key=lambda p: -p[1])

          team = [("Om", 45), ("Dev", 12), ("Kabir", 60), ("Ali", 45)]
          for name, runs in rank(team):
              print(name, runs)
        `, py`
          def rank(players):
              return sorted(players, key=lambda p: (p[1], p[0]))

          team = [("Om", 45), ("Dev", 12), ("Kabir", 60), ("Ali", 45)]
          for name, runs in rank(team):
              print(name, runs)
        `],
        hints: [
          md`The runs are in the right order, but the tied names are Z to A. Which part of line 2 flips the names?`,
          md`The reverse setting flips the whole key, the names as well as the runs.`,
          md`Remove the reverse setting. Put a minus sign in front of the runs inside the tuple, so only the runs are flipped.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: cheapest first, as a def", optional: true,
        task: md`
          This program sorts the menu by price with a lambda. Change it in two ways. First, write the rule as a «def» function named «snack_key». Second, break ties by name, A to Z. It shows:

          | vada 12
          | chai 15
          | poha 15
          | samosa 20

          The hidden tests also sort other menus with your «snack_key».
        `,
        starter: py`
          menu = [("samosa", 20), ("poha", 15), ("vada", 12), ("chai", 15)]
          for name, price in sorted(menu, key=lambda m: m[1]):
              print(name, price)
        `,
        solution: py`
          def snack_key(item):
              return (item[1], item[0])

          menu = [("samosa", 20), ("poha", 15), ("vada", 12), ("chai", 15)]
          for name, price in sorted(menu, key=snack_key):
              print(name, price)
        `,
        tests: [
          { output: "vada 12\nchai 15\npoha 15\nsamosa 20" },
          { py: py`
              need("snack_key", "function")
              items = [("upma", 30), ("idli", 30), ("dosa", 40)]
              assert sorted(items, key=snack_key) == [("idli", 30), ("upma", 30), ("dosa", 40)], "When two snacks cost the same, the name should decide, A to Z. Check the second part of your key."
            ` },
          { py: py`
              items = [("lassi", 25)]
              assert sorted(items, key=snack_key) == [("lassi", 25)], "One snack should stay as it is."
            ` },
          { py: py`
              items = [("tea", 10), ("kulfi", 35), ("bun", 10), ("jalebi", 5)]
              assert sorted(items, key=snack_key) == [("jalebi", 5), ("bun", 10), ("tea", 10), ("kulfi", 35)], "The price should decide first, cheapest first. Check that the price is the first part of your key."
            ` },
        ],
        wrong: [py`
          def snack_key(item):
              return item[1]

          menu = [("samosa", 20), ("poha", 15), ("vada", 12), ("chai", 15)]
          for name, price in sorted(menu, key=snack_key):
              print(name, price)
        `, py`
          def snack_key(item):
              return (item[0], item[1])

          menu = [("samosa", 20), ("poha", 15), ("vada", 12), ("chai", 15)]
          for name, price in sorted(menu, key=snack_key):
              print(name, price)
        `],
        hints: [
          md`Write a «def» function above the menu. It takes one snack and gives back a tuple: the price, then the name.`,
          md`The price is at position 1 and the name is at position 0. The price must come first in the tuple.`,
          md`In the loop line, replace the lambda with the name of your new function, with no brackets.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: an SSC merit list",
        task: md`
          Ask how many candidates there are. Then ask for each candidate on one line: name, marks and age, with spaces between them. Print the merit list: **higher marks first**, and for equal marks the **younger** candidate first. If marks and age are both equal, keep the typed order. Number the lines from 1.

          For 3 candidates «Asha 150 24», «Ravi 162 26» and «Meena 150 22» it shows:

          | 1. Ravi 162 (age 26)
          | 2. Meena 150 (age 22)
          | 3. Asha 150 (age 24)
        `,
        starter: py`

        `,
        solution: py`
          n = int(input("How many candidates? "))
          people = []
          for i in range(n):
              name, marks, age = input("Name marks age: ").split()
              people.append((name, int(marks), int(age)))
          ranked = sorted(people, key=lambda p: (-p[1], p[2]))
          for pos, p in enumerate(ranked, start=1):
              print(f"{pos}. {p[0]} {p[1]} (age {p[2]})")
        `,
        tests: [
          { inputs: ["3", "Asha 150 24", "Ravi 162 26", "Meena 150 22"], output: "1. Ravi 162 (age 26)\n2. Meena 150 (age 22)\n3. Asha 150 (age 24)" },
          { inputs: ["1", "Kiran 98 30"], output: "1. Kiran 98 (age 30)" },
          { inputs: ["3", "Zoya 120 25", "Bina 120 25", "Om 120 21"], output: "1. Om 120 (age 21)\n2. Zoya 120 (age 25)\n3. Bina 120 (age 25)" },
          { inputs: ["4", "Imran 99 19", "Tara 140 33", "Dev 9 20", "Esha 140 27"], output: "1. Esha 140 (age 27)\n2. Tara 140 (age 33)\n3. Imran 99 (age 19)\n4. Dev 9 (age 20)" },
        ],
        wrong: [py`
          n = int(input("How many candidates? "))
          people = []
          for i in range(n):
              name, marks, age = input("Name marks age: ").split()
              people.append((name, int(marks), int(age)))
          ranked = sorted(people, key=lambda p: -p[1])
          for pos, p in enumerate(ranked, start=1):
              print(f"{pos}. {p[0]} {p[1]} (age {p[2]})")
        `, py`
          n = int(input("How many candidates? "))
          people = []
          for i in range(n):
              name, marks, age = input("Name marks age: ").split()
              people.append((name, int(marks), int(age)))
          ranked = sorted(people, key=lambda p: (-p[1], -p[2]))
          for pos, p in enumerate(ranked, start=1):
              print(f"{pos}. {p[0]} {p[1]} (age {p[2]})")
        `, py`
          n = int(input("How many candidates? "))
          people = []
          for i in range(n):
              name, marks, age = input("Name marks age: ").split()
              people.append((name, int(marks), int(age)))
          ranked = sorted(people, key=lambda p: (p[1], p[2]), reverse=True)
          for pos, p in enumerate(ranked, start=1):
              print(f"{pos}. {p[0]} {p[1]} (age {p[2]})")
        `],
        hints: [
          md`Build a list of tuples: name, marks as a whole number, age as a whole number. Then sort it with a lambda, and print with numbers.`,
          md`The key is a tuple with two parts. The marks need a minus sign so the highest comes first. The age needs no minus sign, so the youngest comes first.`,
          md`Do not use the reverse setting: it would put the oldest first. Number the lines with «enumerate» starting at 1, and print with an f-string.`,
        ],
      },
    ],
    keys: [
      md`«lambda s: s[1]» is a one-line function: take «s», give back «s[1]». No «return» word.`,
      md`Use «def» instead when the rule needs several lines, an «if», or a name you use again.`,
      md`Tuples compare left to right. The second item decides only when the first items are equal.`,
      md`A tuple key breaks ties: «key=lambda s: (s[1], s[0])» sorts by marks, then by name.`,
      md`A minus sign flips one number: «(-marks, name)» gives highest marks first, names A to Z. It never works on text.`,
    ],
  });

  // ---------------------------------------------------------------- Day 68
  day({
    slug: "zip-any-all",
    title: "Zip, Any and All",
    goal: "Join two lists with zip and test a whole list in one line.",
    minutes: 45,
    kind: "lesson",
    needs: [24, 26, 27],
    win: "Today you can now walk through two lists together, and check a whole list in one line.",
    learn: [
      md`
        ## zip: two lists side by side

        You met «zip» on Day 26. It takes two lists and makes pairs: first with first, second with second. «dict(zip(a, b))» turns those pairs into a dictionary. Guess the four lines.
      `,
      ex(py`
        names = ["Asha", "Ravi", "Meena"]
        marks = [72, 65, 88]
        for name, m in zip(names, marks):
            print(name, m)
        book = dict(zip(names, marks))
        print(book["Ravi"])
      `, { predict: [
        "Asha 72\nRavi 65\nMeena 88\n65",
        "Asha 72\nRavi 65\nMeena 88\n1",
        "Asha Ravi Meena\n72 65 88\n65",
      ], answer: 0 }),
      md`
        Each trip of the loop gets one pair, which we unpack into «name» and «m». In the dictionary, items from the first list become keys, and items from the second list become values. If one list is shorter, «zip» stops at the end of the shorter list.
      `,
      md`
        ## Counting in one line

        A **generator expression** is a list comprehension without the square brackets. It hands items to a function like «sum» one at a time. Guess the two lines.
      `,
      ex(py`
        marks = [72, 65, 88]
        print(sum(m for m in marks if m >= 70))
        key = ["A", "C", "B", "D"]
        sheet = ["A", "B", "B", "D"]
        print(sum(1 for k, s in zip(key, sheet) if k == s))
      `, { predict: ["160\n3", "2\n3", "160\n4"], answer: 0 }),
      md`
        The first line adds the marks of 70 or more: 72 + 88. The second line adds 1 for each question where the sheet matches the key. So «sum(1 for ... if ...)» **counts** the items that pass the test.
      `,
      pause(md`A good place for a short break. Your progress is saved.`),
      md`
        ## any and all

        «any(...)» gives True if **at least one** item passes the test. «all(...)» gives True only if **every** item passes. Guess the three lines.
      `,
      ex(py`
        marks = [72, 65, 28, 88]
        print(any(m < 33 for m in marks))
        print(all(m >= 33 for m in marks))
        print(all(m > 20 for m in marks))
      `, { predict: ["True\nFalse\nTrue", "False\nFalse\nTrue", "True\nTrue\nTrue"], answer: 0 }),
      md`
        28 is below 33, so «any» finds one, and «all» fails. Every mark is above 20, so the last line is True. A common mistake is to leave out the «for» part:
      `,
      ex(py`
        marks = [72, 65, 28, 88]
        print(any(marks < 33))
      `, { error: true, label: "A crash on purpose", predict: ["TypeError", "True", "False"], answer: 0 }),
      md`
        «marks < 33» compares the whole list with a number, so Python stops with **TypeError**. Test each item: «any(m < 33 for m in marks)».
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          book = dict(zip(["Asha", "Ravi", "Meena"], [72, 65]))
          print(len(book))
        `, options: ["2", "3", "5"], answer: 0,
        explain: md`«zip» stops at the end of the shorter list, so only two pairs are made.`,
        why: [null, md`Meena has no mark to pair with, so she is left out.`, md`«zip» makes pairs. It does not join the lists end to end.`],
        skill: "trace" },
      { q: md`What does this show?`, code: py`
          runs = [1, 9, 3]
          print(any(r > 5 for r in runs), all(r > 5 for r in runs))
        `, options: ["True False", "False False", "True True"], answer: 0,
        explain: md`9 is more than 5, so «any» is True. 1 and 3 are not, so «all» is False.`,
        why: [null, md`«any» needs only one item to pass, and 9 passes.`, md`«all» needs every item to pass. 1 does not.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          codes = input("PIN codes: ").split()
          print(all(len(c) == 6 for c in codes))
        `, options: ["It prints True only if every PIN code typed has 6 characters", "It prints True if at least one PIN code has 6 characters", "It prints how many PIN codes have 6 characters"],
        answer: 0, verify: false, mono: false,
        explain: md`«all» is True only when the test passes for every code.`,
        why: [null, md`That would be «any».`, md`That would be «sum(1 for c in codes if len(c) == 6)».`],
        skill: "read" },
      { q: md`What happens?`, code: py`
          marks = [40, 20, 75]
          print(all(marks >= 33))
        `, options: ["TypeError", "False", "True"], answer: 0, error: true,
        explain: md`«marks >= 33» compares the whole list with a number. Write «all(m >= 33 for m in marks)».`,
        why: [null, md`That is the answer you wanted, but the program stops first. The «for» part is missing.`, md`The program stops before it prints anything.`],
        skill: "debug" },
      { q: md`You want to know if **at least one** student scored zero. Which do you use?`,
        options: ["«any(m == 0 for m in marks)»", "«all(m == 0 for m in marks)»", "«sum(m for m in marks)»"], answer: 0,
        explain: md`«any» is True as soon as one item passes.`,
        why: [null, md`«all» is True only if every student scored zero.`, md`«sum» adds the marks. It does not answer a yes or no question.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: hot cities",
        task: md`Answer each question without running the program.`,
        code: py`
          cities = ["Pune", "Agra", "Goa"]
          temps = [31, 38, 29]
          hot = 0
          for c, t in zip(cities, temps):
              if t > 30:
                  hot += 1
          weather = dict(zip(cities, temps))
          print(hot, weather["Goa"])
        `,
        inputs: [],
        ask: [{ line: 6, hit: 2, name: "hot" }, { output: true }],
        hints: [
          md`Write the pairs on paper: each city with the number in the same place.`,
          md`Line 6 runs only for cities above 30. Count them as you go.`,
          md`Pune and Agra are above 30. In the dictionary, Goa's value is the third number.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: an innings",
        task: md`Answer each question without running the program.`,
        code: py`
          runs = [12, 0, 45, 7]
          total = sum(r for r in runs if r > 5)
          duck = any(r == 0 for r in runs)
          fifty = all(r < 50 for r in runs)
          print(total, duck, fifty)
        `,
        inputs: [],
        ask: [{ line: 2, name: "total" }, { line: 3, name: "duck" }, { output: true }],
        hints: [
          md`Line 2 adds only the scores above 5. Lines 3 and 4 each give True or False.`,
          md`Three scores are above 5. One score is exactly 0.`,
          md`12 + 45 + 7 is the total. Every score is below 50, so «all» is True.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: a report card",
        task: md`
          Put the lines in order so the program prints GK marks, then whether every subject is 40 or more:

          | 38
          | Passed all: False
        `,
        solution: py`
          subjects = ["Maths", "GK", "English"]
          scores = [41, 38, 45]
          report = dict(zip(subjects, scores))
          passed = all(s >= 40 for s in scores)
          print(report["GK"])
          print("Passed all:", passed)
        `,
        distractors: ["passed = any(s >= 40 for s in scores)", "report = zip(subjects, scores)"],
        indent: "given",
        tests: [{ output: "38\nPassed all: False" }],
        hints: [
          md`The two lists come first. Then build the dictionary and the yes or no answer. The prints come last.`,
          md`The dictionary needs «dict» around the pairs, or you cannot look up GK.`,
          md`«Every subject» means the tool that needs each item to pass, not the one that needs only one.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: pass in every subject",
        task: md`
          A candidate passes only if **every** mark is 33 or more. For «45 20 60» the program should print «Fail». It prints «Pass».

          Fix the one wrong line.
        `,
        starter: py`
          marks = [int(x) for x in input("Marks: ").split()]
          if any(m >= 33 for m in marks):
              print("Pass")
          else:
              print("Fail")
        `,
        bugLines: [2],
        solution: py`
          marks = [int(x) for x in input("Marks: ").split()]
          if all(m >= 33 for m in marks):
              print("Pass")
          else:
              print("Fail")
        `,
        tests: [
          { inputs: ["45 20 60"], output: "Fail" },
          { inputs: ["33 33"], output: "Pass" },
          { inputs: ["10"], output: "Fail" },
          { inputs: ["90 80 75"], output: "Pass" },
          { inputs: ["32 99"], output: "Fail" },
        ],
        wrong: [py`
          marks = [int(x) for x in input("Marks: ").split()]
          if all(m > 33 for m in marks):
              print("Pass")
          else:
              print("Fail")
        `],
        hints: [
          md`One mark is below 33, but the program still says Pass. Which line decides?`,
          md`Line 2 uses the tool that is happy when only one mark passes.`,
          md`Use the tool that needs every mark to pass. Keep 33 itself as a pass.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: find a roll number", optional: true,
        task: md`
          This program prints each name with its roll number. Change it so it builds a dictionary with «dict» and «zip», asks for a name, and prints that roll number. If the name is not there, it prints «Not found». For «Ravi» it shows:

          | Roll: 2210
        `,
        starter: py`
          names = ["Asha", "Ravi", "Meena", "Imran"]
          rolls = [1043, 2210, 1500, 3007]
          for n, r in zip(names, rolls):
              print(n, r)
        `,
        solution: py`
          names = ["Asha", "Ravi", "Meena", "Imran"]
          rolls = [1043, 2210, 1500, 3007]
          book = dict(zip(names, rolls))
          who = input("Name: ")
          if who in book:
              print("Roll:", book[who])
          else:
              print("Not found")
        `,
        tests: [
          { inputs: ["Ravi"], output: "Roll: 2210" },
          { inputs: ["Asha"], output: "Roll: 1043" },
          { inputs: ["Imran"], output: "Roll: 3007" },
          { inputs: ["Zoya"], output: "Not found" },
          { uses: ["call:dict", "call:zip"], msg: md`Build the dictionary with «dict» around «zip» of the two lists.` },
        ],
        wrong: [py`
          names = ["Asha", "Ravi", "Meena", "Imran"]
          rolls = [1043, 2210, 1500, 3007]
          book = dict(zip(rolls, names))
          who = input("Name: ")
          if who in book:
              print("Roll:", book[who])
          else:
              print("Not found")
        `],
        hints: [
          md`Replace the loop with one line that builds a dictionary. Then ask for a name and look it up.`,
          md`Names must be the keys, so the names list goes first inside «zip». Check the name with «in» before you look it up.`,
          md`If the name is in the dictionary, print the label and its value. Otherwise print the not found message.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: mark an answer sheet",
        task: md`
          Ask for the answer key on one line, then a student's answer sheet on a second line. Letters are separated by spaces. Use «zip» to compare them question by question. Print the number right, the number wrong, and «True» or «False» for full marks.

          For «A C B D A» and «A B B D C» it shows:

          | Right: 3
          | Wrong: 2
          | Full marks: False

          You use this again tomorrow.
        `,
        starter: py`

        `,
        solution: py`
          key = input("Answer key: ").split()
          sheet = input("Answer sheet: ").split()
          right = sum(1 for k, s in zip(key, sheet) if k == s)
          print("Right:", right)
          print("Wrong:", len(key) - right)
          print("Full marks:", all(k == s for k, s in zip(key, sheet)))
        `,
        tests: [
          { inputs: ["A C B D A", "A B B D C"], output: "Right: 3\nWrong: 2\nFull marks: False" },
          { inputs: ["B D", "B D"], output: "Right: 2\nWrong: 0\nFull marks: True" },
          { inputs: ["C", "A"], output: "Right: 0\nWrong: 1\nFull marks: False" },
          { inputs: ["A B C D", "D C B A"], output: "Right: 0\nWrong: 4\nFull marks: False" },
          { inputs: ["D D A B C C", "D D A B C B"], output: "Right: 5\nWrong: 1\nFull marks: False" },
          { uses: ["call:zip"], msg: md`Use «zip» to walk through the key and the sheet together.` },
        ],
        wrong: [py`
          key = input("Answer key: ").split()
          sheet = input("Answer sheet: ").split()
          right = sum(1 for k, s in zip(key, sheet) if k == s)
          print("Right:", right)
          print("Wrong:", len(key) - right)
          print("Full marks:", any(k == s for k, s in zip(key, sheet)))
        `, py`
          key = input("Answer key: ")
          sheet = input("Answer sheet: ")
          right = sum(1 for k, s in zip(key, sheet) if k == s)
          print("Right:", right)
          print("Wrong:", len(key) - right)
          print("Full marks:", all(k == s for k, s in zip(key, sheet)))
        `],
        hints: [
          md`Split both lines into lists. Walk through them together in pairs, and count the pairs that match.`,
          md`Count with «sum» and a generator expression that adds 1 for each matching pair. Wrong is the number of questions minus right.`,
          md`For full marks, use the tool that needs every pair to match, over the same pairs.`,
        ],
      },
    ],
    keys: [
      md`«zip(a, b)» pairs items: first with first, second with second. It stops at the shorter list.`,
      md`«dict(zip(keys, values))» builds a dictionary from two lists.`,
      md`A generator expression is a comprehension with no square brackets: «sum(m for m in marks)».`,
      md`«sum(1 for x in items if test)» counts the items that pass the test.`,
      md`«any(...)» is True if at least one item passes. «all(...)» is True only if every item passes.`,
    ],
  });

  // ---------------------------------------------------------------- Day 69
  day({
    slug: "ssc-merit-list",
    title: "Project: SSC Mock Scorer and Merit List",
    goal: "Score answer sheets at +2 and -0.5, then sort a merit list with tie-breaks.",
    minutes: 45,
    kind: "project",
    needs: [59, 67, 68],
    win: "Today you can now mark a whole room of mock answer sheets and print a fair merit list.",
    learn: [
      md`
        ## The marking rule

        In this mock test, a right answer gives **+2** marks. A wrong answer takes away **0.5** marks. A blank, written as «-», gives 0. Each answer sheet is a list of letters, like the answer key.
      `,
      code(py`
        key = "A C B D A".split()
        sheet = "A B - D C".split()
        # Q1 right +2, Q2 wrong -0.5, Q3 blank 0, Q4 right +2, Q5 wrong -0.5
        # Score: 3.0
      `),
      md`
        ## Four stages

        Stage 1 scores one sheet. Stage 2 splits the score into sections. Stage 3 reads many students. Stage 4 starts from a blank page and prints the merit list. Today teaches nothing new: you use «zip» (Day 68), tuple keys (Day 67) and records (Day 59).

        Each stage saves when you pass it. All names and sheets are invented.
      `,
      pause(md`If you stop for a break, stop after a stage. Your passed stages are saved.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          key = ["A", "B", "C"]
          sheet = ["A", "-", "D"]
          total = 0.0
          for k, s in zip(key, sheet):
              if s == "-":
                  continue
              if s == k:
                  total += 2
              else:
                  total -= 0.5
          print(total)
        `, options: ["1.5", "1.0", "2.0"], answer: 0,
        explain: md`Q1 is right (+2). Q2 is blank and skipped. Q3 is wrong (−0.5). 2 − 0.5 is 1.5.`,
        why: [null, md`That treats the blank as wrong too. «continue» skips the blank.`, md`That forgets the −0.5 for the wrong answer on Q3.`],
        skill: "trace" },
      { q: md`«score» is your function from Stage 1. What does this program do?`, code: py`
          for i in range(0, len(key), 5):
              part = score(key[i:i + 5], sheet[i:i + 5])
              print(i // 5 + 1, part)
        `, options: ["It prints the score of each block of 5 questions, numbered from 1", "It prints the score of every 5th question only", "It prints the whole score 5 times"],
        answer: 0, verify: false, mono: false,
        explain: md`«i» goes 0, 5, 10 and so on. Each slice takes the next 5 questions from the key and the sheet.`,
        why: [null, md`The slice takes 5 questions at a time, not one.`, md`Each slice is a different block, so each score is different.`],
        skill: "read" },
      { q: md`What does this show?`, code: py`
          rows = [("Om", 6.0, 2), ("Ali", 6.0, 0), ("Bina", 8.0, 3)]
          ranked = sorted(rows, key=lambda r: (-r[1], r[2], r[0]))
          print([r[0] for r in ranked])
        `, options: ["['Bina', 'Ali', 'Om']", "['Bina', 'Om', 'Ali']", "['Ali', 'Om', 'Bina']"], answer: 0,
        explain: md`Bina has the highest score. Ali and Om tie at 6.0, and Ali has fewer wrong answers.`,
        why: [null, md`The second rule is the number wrong. Ali has 0 wrong, Om has 2.`, md`The minus sign puts the highest score first.`],
        skill: "trace" },
      { q: md`A student leaves 4 blanks, but loses 2 marks for them. Which line is missing at the top of the loop?`,
        options: ['if s == "-":\n    continue', "if s == k:\n    continue", "if s != k:\n    break"], answer: 0,
        verify: false,
        explain: md`A blank must add nothing, so the loop skips it before the right or wrong check.`,
        why: [null, md`This skips the right answers, so they get no marks.`, md`«break» stops the whole loop at the first wrong answer.`],
        skill: "debug" },
      { q: md`Which tool pairs each answer on the sheet with the answer in the key?`,
        options: ["«zip(key, sheet)»", "«set(key) & set(sheet)»", "«enumerate(key)»"], answer: 0,
        explain: md`«zip» gives pairs: question 1 with question 1, question 2 with question 2.`,
        why: [null, md`A set forgets the order, so you cannot tell which question each letter was for.`, md`«enumerate» numbers the key, but it does not bring the sheet in.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "s1", stage: 1, title: "Stage 1: score one sheet",
        task: md`
          Finish «score(key, sheet)». For each question, a right answer adds 2, a wrong answer takes away 0.5, and a blank «-» adds nothing. Use «zip» to walk through the key and the sheet together. The program should print:

          | Score: 3.0

          The hidden tests try other sheets, including all blanks and all wrong.
        `,
        starter: py`
          def score(key, sheet):
              total = 0.0
              # Right adds 2, wrong takes away 0.5, a blank "-" adds 0.
              return total

          key = "A C B D A".split()
          sheet = "A B - D C".split()
          print(f"Score: {score(key, sheet):.1f}")
        `,
        solution: py`
          def score(key, sheet):
              total = 0.0
              for k, s in zip(key, sheet):
                  if s == "-":
                      continue
                  if s == k:
                      total += 2
                  else:
                      total -= 0.5
              return total

          key = "A C B D A".split()
          sheet = "A B - D C".split()
          print(f"Score: {score(key, sheet):.1f}")
        `,
        tests: [
          { output: "Score: 3.0" },
          { py: py`expect("score", (["A", "B"], ["A", "B"]), 4.0)` },
          { py: py`
              got = call("score", ["A", "B", "C"], ["-", "-", "-"])
              assert got == 0, f"A sheet of blanks should score 0, but your function gave {got}. A blank adds nothing: check it before the right or wrong test."
            ` },
          { py: py`
              got = call("score", ["A", "A", "A", "A"], ["B", "C", "D", "B"])
              assert got == -2.0, f"Four wrong answers should score -2.0, but your function gave {got}. Each wrong answer takes away 0.5."
            ` },
          { py: py`expect("score", (["D", "C", "B"], ["D", "-", "A"]), 1.5)` },
        ],
        wrong: [py`
          def score(key, sheet):
              total = 0.0
              for k, s in zip(key, sheet):
                  if s == k:
                      total += 2
                  else:
                      total -= 0.5
              return total

          key = "A C B D A".split()
          sheet = "A B - D C".split()
          print(f"Score: {score(key, sheet):.1f}")
        `, py`
          def score(key, sheet):
              total = 0.0
              for k, s in zip(key, sheet):
                  if s == "-":
                      continue
                  if s == k:
                      total += 2
              return total

          key = "A C B D A".split()
          sheet = "A B - D C".split()
          print(f"Score: {score(key, sheet):.1f}")
        `],
        hints: [
          md`Walk through the key and the sheet together in pairs. For each pair, decide: blank, right or wrong.`,
          md`Check for the blank first and skip it. Then compare the two letters in the pair.`,
          md`If the letters match, add 2 to the total. Otherwise take away 0.5. Keep the return line after the loop.`,
        ],
      },
      {
        id: "s2", stage: 2, carry: "s1", title: "Stage 2: section scores",
        task: md`
          The paper has sections, each with the same number of questions. Add a function «section_scores(key, sheet, names)» that gives back a dictionary: each section name with its score. Use slices of the key and the sheet, and your «score» function. Then replace the last three lines with these:

          : key = "A C B D A B".split()
          : sheet = "A B - D C B".split()
          : names = ["Reasoning", "GK", "Maths"]
          : parts = section_scores(key, sheet, names)
          : for name, value in parts.items():
          :     print(f"{name}: {value:.1f}")
          : print(f"Total: {score(key, sheet):.1f}")

          It should print:

          | Reasoning: 1.5
          | GK: 2.0
          | Maths: 1.5
          | Total: 5.0
        `,
        starter: py`
          def score(key, sheet):
              total = 0.0
              for k, s in zip(key, sheet):
                  if s == "-":
                      continue
                  if s == k:
                      total += 2
                  else:
                      total -= 0.5
              return total

          key = "A C B D A".split()
          sheet = "A B - D C".split()
          print(f"Score: {score(key, sheet):.1f}")
        `,
        solution: py`
          def score(key, sheet):
              total = 0.0
              for k, s in zip(key, sheet):
                  if s == "-":
                      continue
                  if s == k:
                      total += 2
                  else:
                      total -= 0.5
              return total

          def section_scores(key, sheet, names):
              size = len(key) // len(names)
              result = {}
              for i in range(len(names)):
                  start = i * size
                  result[names[i]] = score(key[start:start + size], sheet[start:start + size])
              return result

          key = "A C B D A B".split()
          sheet = "A B - D C B".split()
          names = ["Reasoning", "GK", "Maths"]
          parts = section_scores(key, sheet, names)
          for name, value in parts.items():
              print(f"{name}: {value:.1f}")
          print(f"Total: {score(key, sheet):.1f}")
        `,
        tests: [
          { output: "Reasoning: 1.5\nGK: 2.0\nMaths: 1.5\nTotal: 5.0" },
          { py: py`
              got = call("section_scores", ["A", "B", "C", "D"], ["A", "B", "-", "A"], ["Part 1", "Part 2"])
              assert got == {"Part 1": 4.0, "Part 2": -0.5}, f"For 2 sections of 2 questions, expected {{'Part 1': 4.0, 'Part 2': -0.5}} but got {got}. Check where each slice starts and ends."
            ` },
          { py: py`
              got = call("section_scores", ["A", "B", "C"], ["A", "B", "C"], ["All"])
              assert got == {"All": 6.0}, f"With one section, it holds every question, so expected {{'All': 6.0}} but got {got}."
            ` },
          { py: py`
              got = call("section_scores", ["A", "B", "C", "D"], ["-", "-", "-", "D"], ["W", "X", "Y", "Z"])
              assert got == {"W": 0.0, "X": 0.0, "Y": 0.0, "Z": 2.0}, f"With 4 sections of 1 question, expected {{'W': 0.0, 'X': 0.0, 'Y': 0.0, 'Z': 2.0}} but got {got}. Check the size of each section."
            ` },
        ],
        wrong: [py`
          def score(key, sheet):
              total = 0.0
              for k, s in zip(key, sheet):
                  if s == "-":
                      continue
                  if s == k:
                      total += 2
                  else:
                      total -= 0.5
              return total

          def section_scores(key, sheet, names):
              size = len(key) // len(names)
              result = {}
              for i in range(len(names)):
                  start = i * size
                  result[names[i]] = score(key[start:size], sheet[start:size])
              return result

          key = "A C B D A B".split()
          sheet = "A B - D C B".split()
          names = ["Reasoning", "GK", "Maths"]
          parts = section_scores(key, sheet, names)
          for name, value in parts.items():
              print(f"{name}: {value:.1f}")
          print(f"Total: {score(key, sheet):.1f}")
        `],
        hints: [
          md`Work out how many questions are in one section. Then, for each section, take a slice of the key and the same slice of the sheet.`,
          md`Section number i starts at i times the size. The slice ends at the start plus the size.`,
          md`Give each slice pair to «score», and store the answer in the dictionary under that section's name. Return the dictionary after the loop.`,
        ],
      },
      {
        id: "s3", stage: 3, carry: "s2", title: "Stage 3: a room of students",
        task: md`
          Now read the sheets from the user. Keep both functions. Replace the lines below them with a program that asks for the answer key on one line, then how many students, then each student on one line: the name, then the answers. Print each student's total in the typed order.

          For the key «A C B D A B», 2 students, «Asha A B - D C B» and «Ravi A C B D A B», it shows:

          | Asha: 5.0
          | Ravi: 12.0
        `,
        starter: py`
          def score(key, sheet):
              total = 0.0
              for k, s in zip(key, sheet):
                  if s == "-":
                      continue
                  if s == k:
                      total += 2
                  else:
                      total -= 0.5
              return total

          def section_scores(key, sheet, names):
              size = len(key) // len(names)
              result = {}
              for i in range(len(names)):
                  start = i * size
                  result[names[i]] = score(key[start:start + size], sheet[start:start + size])
              return result

          key = "A C B D A B".split()
          sheet = "A B - D C B".split()
          names = ["Reasoning", "GK", "Maths"]
          parts = section_scores(key, sheet, names)
          for name, value in parts.items():
              print(f"{name}: {value:.1f}")
          print(f"Total: {score(key, sheet):.1f}")
        `,
        solution: py`
          def score(key, sheet):
              total = 0.0
              for k, s in zip(key, sheet):
                  if s == "-":
                      continue
                  if s == k:
                      total += 2
                  else:
                      total -= 0.5
              return total

          def section_scores(key, sheet, names):
              size = len(key) // len(names)
              result = {}
              for i in range(len(names)):
                  start = i * size
                  result[names[i]] = score(key[start:start + size], sheet[start:start + size])
              return result

          key = input("Answer key: ").split()
          n = int(input("How many students? "))
          for i in range(n):
              parts = input("Name and answers: ").split()
              name = parts[0]
              sheet = parts[1:]
              print(f"{name}: {score(key, sheet):.1f}")
        `,
        tests: [
          { inputs: ["A C B D A B", "2", "Asha A B - D C B", "Ravi A C B D A B"], output: "Asha: 5.0\nRavi: 12.0" },
          { inputs: ["D", "1", "Kiran -"], output: "Kiran: 0.0" },
          { inputs: ["A B C D", "3", "Om B A D C", "Zoya A B C D", "Imran A - - D"], output: "Om: -2.0\nZoya: 8.0\nImran: 4.0" },
          { inputs: ["C C C", "2", "Tara C C C", "Anil C C C"], output: "Tara: 6.0\nAnil: 6.0" },
        ],
        wrong: [py`
          def score(key, sheet):
              total = 0.0
              for k, s in zip(key, sheet):
                  if s == "-":
                      continue
                  if s == k:
                      total += 2
                  else:
                      total -= 0.5
              return total

          key = input("Answer key: ").split()
          n = int(input("How many students? "))
          for i in range(n):
              parts = input("Name and answers: ").split()
              name = parts[0]
              print(f"{name}: {score(key, parts):.1f}")
        `],
        hints: [
          md`Read the key and the number of students first. Then loop once for each student, reading one line each time.`,
          md`Split each student's line. The first piece is the name. The rest of the pieces, from position 1 to the end, are the answers.`,
          md`Give the key and only the answers to «score». If you give the whole line, the name is compared with the first answer.`,
        ],
      },
      {
        id: "s4", stage: 4, kind: "make", title: "Stage 4: the merit list, from a blank page",
        task: md`
          From a blank page, write the whole scorer again and print a **merit list**. Read the input as in Stage 3 (you do not need sections). The order is:

          1. Higher score first.
          2. Equal scores: fewer wrong answers first. Blanks are not wrong.
          3. Equal score and equal wrong answers: names in A to Z order.

          Number the lines from 1. For the key «A C B D A B» and the students «Asha A B - D C B», «Ravi A C B D A B» and «Meena A C B D C A», it shows:

          | 1. Ravi 12.0 (wrong 0)
          | 2. Meena 7.0 (wrong 2)
          | 3. Asha 5.0 (wrong 2)
        `,
        starter: py`

        `,
        solution: py`
          def score(key, sheet):
              total = 0.0
              for k, s in zip(key, sheet):
                  if s == "-":
                      continue
                  if s == k:
                      total += 2
                  else:
                      total -= 0.5
              return total

          def wrong_count(key, sheet):
              return sum(1 for k, s in zip(key, sheet) if s != "-" and s != k)

          key = input("Answer key: ").split()
          n = int(input("How many students? "))
          rows = []
          for i in range(n):
              parts = input("Name and answers: ").split()
              name = parts[0]
              sheet = parts[1:]
              rows.append((name, score(key, sheet), wrong_count(key, sheet)))
          ranked = sorted(rows, key=lambda r: (-r[1], r[2], r[0]))
          for pos, r in enumerate(ranked, start=1):
              print(f"{pos}. {r[0]} {r[1]:.1f} (wrong {r[2]})")
        `,
        tests: [
          { inputs: ["A C B D A B", "3", "Asha A B - D C B", "Ravi A C B D A B", "Meena A C B D C A"],
            output: "1. Ravi 12.0 (wrong 0)\n2. Meena 7.0 (wrong 2)\n3. Asha 5.0 (wrong 2)" },
          { inputs: ["A C B D A B", "3", "Bina A C D A C C", "Om - - - - - -", "Zoya A - - - - -"],
            output: "1. Zoya 2.0 (wrong 0)\n2. Bina 2.0 (wrong 4)\n3. Om 0.0 (wrong 0)" },
          { inputs: ["A C B D A B", "3", "Tara A C B D - -", "Esha B B B B B B", "Anil A C B D - -"],
            output: "1. Anil 8.0 (wrong 0)\n2. Tara 8.0 (wrong 0)\n3. Esha 2.0 (wrong 4)" },
          { inputs: ["A C B D A B", "1", "Dev B A A A B A"], output: "1. Dev -3.0 (wrong 6)" },
          { inputs: ["D", "2", "Lata -", "Kiran D"], output: "1. Kiran 2.0 (wrong 0)\n2. Lata 0.0 (wrong 0)" },
        ],
        wrong: [py`
          def score(key, sheet):
              total = 0.0
              for k, s in zip(key, sheet):
                  if s == "-":
                      continue
                  if s == k:
                      total += 2
                  else:
                      total -= 0.5
              return total

          def wrong_count(key, sheet):
              return sum(1 for k, s in zip(key, sheet) if s != "-" and s != k)

          key = input("Answer key: ").split()
          n = int(input("How many students? "))
          rows = []
          for i in range(n):
              parts = input("Name and answers: ").split()
              name = parts[0]
              sheet = parts[1:]
              rows.append((name, score(key, sheet), wrong_count(key, sheet)))
          ranked = sorted(rows, key=lambda r: (r[1], -r[2]), reverse=True)
          for pos, r in enumerate(ranked, start=1):
              print(f"{pos}. {r[0]} {r[1]:.1f} (wrong {r[2]})")
        `, py`
          def score(key, sheet):
              total = 0.0
              for k, s in zip(key, sheet):
                  if s == "-":
                      continue
                  if s == k:
                      total += 2
                  else:
                      total -= 0.5
              return total

          def wrong_count(key, sheet):
              return sum(1 for k, s in zip(key, sheet) if s != k)

          key = input("Answer key: ").split()
          n = int(input("How many students? "))
          rows = []
          for i in range(n):
              parts = input("Name and answers: ").split()
              name = parts[0]
              sheet = parts[1:]
              rows.append((name, score(key, sheet), wrong_count(key, sheet)))
          ranked = sorted(rows, key=lambda r: (-r[1], r[2], r[0]))
          for pos, r in enumerate(ranked, start=1):
              print(f"{pos}. {r[0]} {r[1]:.1f} (wrong {r[2]})")
        `, py`
          def score(key, sheet):
              total = 0.0
              for k, s in zip(key, sheet):
                  if s == "-":
                      continue
                  if s == k:
                      total += 2
                  else:
                      total -= 0.5
              return total

          def wrong_count(key, sheet):
              return sum(1 for k, s in zip(key, sheet) if s != "-" and s != k)

          key = input("Answer key: ").split()
          n = int(input("How many students? "))
          rows = []
          for i in range(n):
              parts = input("Name and answers: ").split()
              name = parts[0]
              sheet = parts[1:]
              rows.append((name, score(key, sheet), wrong_count(key, sheet)))
          ranked = sorted(rows, key=lambda r: -r[1])
          for pos, r in enumerate(ranked, start=1):
              print(f"{pos}. {r[0]} {r[1]:.1f} (wrong {r[2]})")
        `],
        hints: [
          md`Plan three parts: the score function, a function that counts wrong answers, and the main program that builds a list of tuples and sorts it.`,
          md`A wrong answer is one that is not a blank and does not match the key. Store each student as a tuple: name, score, number wrong.`,
          md`Sort with a lambda that gives back a tuple of three parts: the score with a minus sign, the number wrong, then the name. Do not use the reverse setting.`,
        ],
      },
      {
        id: "twist", kind: "modify", carry: "s4", optional: true, noStep: true, title: "Own Twist: your own marking scheme",
        task: md`
          Mock tests use different marking schemes. Change your program so it first asks for the marks for a right answer and the marks taken away for a wrong answer, on one line, like «1 0.25». Use these numbers instead of 2 and 0.5. Print scores with 2 decimal places, using «:.2f».

          For «1 0.25», then the key «A C B D A B» and the three students of Stage 4, it shows:

          | 1. Ravi 6.00 (wrong 0)
          | 2. Meena 3.50 (wrong 2)
          | 3. Asha 2.50 (wrong 2)

          You may add your own ideas too, such as a section list. The tests check only these lines.
        `,
        starter: py`
          def score(key, sheet):
              total = 0.0
              for k, s in zip(key, sheet):
                  if s == "-":
                      continue
                  if s == k:
                      total += 2
                  else:
                      total -= 0.5
              return total

          def wrong_count(key, sheet):
              return sum(1 for k, s in zip(key, sheet) if s != "-" and s != k)

          key = input("Answer key: ").split()
          n = int(input("How many students? "))
          rows = []
          for i in range(n):
              parts = input("Name and answers: ").split()
              name = parts[0]
              sheet = parts[1:]
              rows.append((name, score(key, sheet), wrong_count(key, sheet)))
          ranked = sorted(rows, key=lambda r: (-r[1], r[2], r[0]))
          for pos, r in enumerate(ranked, start=1):
              print(f"{pos}. {r[0]} {r[1]:.1f} (wrong {r[2]})")
        `,
        solution: py`
          def score(key, sheet, plus, minus):
              total = 0.0
              for k, s in zip(key, sheet):
                  if s == "-":
                      continue
                  if s == k:
                      total += plus
                  else:
                      total -= minus
              return total

          def wrong_count(key, sheet):
              return sum(1 for k, s in zip(key, sheet) if s != "-" and s != k)

          plus, minus = [float(x) for x in input("Right and wrong marks: ").split()]
          key = input("Answer key: ").split()
          n = int(input("How many students? "))
          rows = []
          for i in range(n):
              parts = input("Name and answers: ").split()
              name = parts[0]
              sheet = parts[1:]
              rows.append((name, score(key, sheet, plus, minus), wrong_count(key, sheet)))
          ranked = sorted(rows, key=lambda r: (-r[1], r[2], r[0]))
          for pos, r in enumerate(ranked, start=1):
              print(f"{pos}. {r[0]} {r[1]:.2f} (wrong {r[2]})")
        `,
        tests: [
          { inputs: ["1 0.25", "A C B D A B", "3", "Asha A B - D C B", "Ravi A C B D A B", "Meena A C B D C A"],
            output: "1. Ravi 6.00 (wrong 0)\n2. Meena 3.50 (wrong 2)\n3. Asha 2.50 (wrong 2)" },
          { inputs: ["3 1", "A B", "2", "Ali B A", "Om A -"], output: "1. Om 3.00 (wrong 0)\n2. Ali -2.00 (wrong 2)" },
          { inputs: ["2 0", "C C", "2", "Zoya C D", "Bina C -"], output: "1. Bina 2.00 (wrong 0)\n2. Zoya 2.00 (wrong 1)" },
        ],
        wrong: [py`
          def score(key, sheet):
              total = 0.0
              for k, s in zip(key, sheet):
                  if s == "-":
                      continue
                  if s == k:
                      total += 2
                  else:
                      total -= 0.5
              return total

          def wrong_count(key, sheet):
              return sum(1 for k, s in zip(key, sheet) if s != "-" and s != k)

          plus, minus = [float(x) for x in input("Right and wrong marks: ").split()]
          key = input("Answer key: ").split()
          n = int(input("How many students? "))
          rows = []
          for i in range(n):
              parts = input("Name and answers: ").split()
              name = parts[0]
              sheet = parts[1:]
              rows.append((name, score(key, sheet), wrong_count(key, sheet)))
          ranked = sorted(rows, key=lambda r: (-r[1], r[2], r[0]))
          for pos, r in enumerate(ranked, start=1):
              print(f"{pos}. {r[0]} {r[1]:.2f} (wrong {r[2]})")
        `],
        hints: [
          md`Read the two numbers first, before the key. Turn each one into a number with a decimal point.`,
          md`Give the two numbers to «score» as two new parameters, and use them in place of 2 and 0.5.`,
          md`Change the number format in the last print from one decimal place to two.`,
        ],
      },
    ],
    keys: [
      md`«zip(key, sheet)» pairs each answer with the right answer for that question.`,
      md`Check for a blank first, so it adds nothing and is not counted as wrong.`,
      md`A slice of the key and the same slice of the sheet give the score for one section.`,
      md`A merit list is a sort with tie-breaks: «key=lambda r: (-score, wrong, name)».`,
    ],
  });

  // ---------------------------------------------------------------- Day 70
  day({
    slug: "read-code-cold",
    title: "Checkpoint: Read Code Cold",
    goal: "Read unseen programs and fix bugs with no hints.",
    minutes: 45,
    kind: "checkpoint",
    exam: true,
    needs: [51, 63, 69],
    win: "Today you can now read programs you have never seen, fix bugs alone, and you have a repair map for the weak spots.",
    learn: [
      md`
        ## How this check works

        Today you check four skills: reading code, fixing bugs, writing code, and remembering. There are no hints and no Step-through. Nothing is locked, and Day 71 opens whatever your score is.

        There are two **Cold Reads** (programs you have never seen) with 5 questions each, 2 Bug Clinics, 1 Make, and 8 short question cards. Every item shows the day it comes from, like «(Day 64)».
      `,
      md`
        ## How to read cold

        Read the whole program once, slowly, before you look at the questions. Find the functions first, then the data, then the main loop. For each question, follow the values on paper, one line at a time.
      `,
      md`
        ## Your repair map

        At the end you see a score for each skill. It shows what to practise next. It is not a judgement of you.

        1. Write down the day number of each item you missed.
        2. Choose at most 3 of those days, smallest numbers first.
        3. Open each day and do its Make exercise again, from a blank page.
      `,
      tip(md`Many missed items in one skill? Use these days. Reading: [Day 58](#/day/58). Fixing bugs: [Day 50](#/day/50). Writing: [Day 55](#/day/55). Remembering and choosing a tool: [Day 65](#/day/65).`),
      pause(md`This check takes about 45 minutes. Take a short break after the two Cold Reads. Your answers are saved.`),
    ],
    quiz: [
      { q: md`(Day 64) You need to drop repeated roll numbers and then check quickly if a roll number is there. Which do you use?`,
        options: ["A set", "A list", "A tuple"], answer: 0,
        explain: md`A set keeps one copy of each value, and «in» on a set is fast.`,
        why: [null, md`A list keeps the repeats, and «in» checks items one by one.`, md`A tuple keeps repeats and cannot be changed.`],
        skill: "choose" },
      { q: md`(Day 29) You need the price of each snack, found by the snack's name. Which do you use?`,
        options: ["A dictionary", "A set", "A list"], answer: 0,
        explain: md`The name is the key and the price is the value.`,
        why: [null, md`A set has no place to keep a price next to a name.`, md`A list has no keys, so you must search it for each name.`],
        skill: "choose" },
      { q: md`(Day 68) You need to check that **every** candidate is 18 or older. Which do you use?`,
        options: ["«all(age >= 18 for age in ages)»", "«any(age >= 18 for age in ages)»", "«max(ages) >= 18»"], answer: 0,
        explain: md`«all» is True only when the test passes for every age.`,
        why: [null, md`«any» is True when only one candidate is 18 or older.`, md`This checks only the oldest candidate.`],
        skill: "choose" },
      { q: md`(Day 36) The user may type a word instead of a number. You want to ask again until the answer is a number. Which do you use?`,
        options: ["«while True» with «try» and «except ValueError»", "«assert» on the answer", "«if» with «int()» inside the condition"], answer: 0,
        explain: md`«int()» on a word raises ValueError. «except» catches it, and the loop asks again.`,
        why: [null, md`«assert» stops the program. It does not ask again.`, md`«int()» on a word crashes inside the «if» too.`],
        skill: "choose" },
      { q: md`(Day 64) What does «{}» make?`,
        options: ["An empty dictionary", "An empty set", "An empty list"], answer: 0,
        explain: md`Empty curly brackets make a dictionary. An empty set is «set()».`,
        why: [null, md`This is the common trap. Write «set()» for an empty set.`, md`A list uses square brackets.`],
        skill: "memory" },
      { q: md`(Day 66) Which line sorts the words by length?`,
        options: ["«sorted(words, key=len)»", "«sorted(words, key=len())»", "«sorted(len(words))»"], answer: 0,
        explain: md`Write the function's name with no brackets. «sorted» calls it for each word.`,
        why: [null, md`«len()» runs at once with nothing inside, so Python stops with TypeError.`, md`«len(words)» is one number, and a number cannot be sorted.`],
        skill: "memory" },
      { q: md`(Day 45) In a traceback, which part names the error?`,
        options: ["The last line", "The first line", "The line with the word File"], answer: 0,
        explain: md`The last line gives the error's name and a short message.`,
        why: [null, md`The first line only says that a traceback follows.`, md`The File lines say where the error happened, not what it is.`],
        skill: "memory" },
      { q: md`(Day 67) What does this show?`, code: py`print(sorted([(2, "b"), (1, "c"), (2, "a")]))`,
        options: ["[(1, 'c'), (2, 'a'), (2, 'b')]", "[(1, 'c'), (2, 'b'), (2, 'a')]", "[(2, 'a'), (2, 'b'), (1, 'c')]"], answer: 0,
        explain: md`Tuples compare left to right. The two tuples that start with 2 are decided by their letters.`,
        why: [null, md`When the first items are equal, the second items decide. They do not keep their old order.`, md`The first item decides first, and 1 is smaller than 2.`],
        skill: "trace" },
    ],
    practice: [
      {
        id: "read1", kind: "read", title: "Cold Read 1: the chai stall's week (Days 30, 58, 64, 67)",
        task: md`Read the program slowly. Do not run it. Then answer the 5 questions.`,
        code: py`
          def bill(order, prices):
              total = 0
              for item, qty in order.items():
                  total += prices.get(item, 0) * qty
              return total

          prices = {"chai": 15, "samosa": 20, "vada": 12}
          orders = [
              ("Asha", {"chai": 2, "samosa": 1}),
              ("Ravi", {"vada": 3}),
              ("Meena", {"chai": 1, "jalebi": 2}),
              ("Asha", {"vada": 1}),
          ]

          spent = {}
          unknown = set()
          for name, order in orders:
              spent[name] = spent.get(name, 0) + bill(order, prices)
              for item in order:
                  if item not in prices:
                      unknown.add(item)

          for name in sorted(spent, key=lambda n: -spent[n]):
              print(name, spent[name])
          print("Not on menu:", sorted(unknown))
        `,
        questions: [
          { q: md`(Day 30) What is «spent["Asha"]» at the end?`, options: ["62", "50", "12"], answer: 0,
            explain: md`Asha has two orders. The first is 2 × 15 + 20 = 50. The second is one vada, 12. «spent.get» adds them: 62.`,
            skill: "read" },
          { q: md`(Day 64) What does the last line print?`, options: ["Not on menu: ['jalebi']", "Not on menu: []", "Not on menu: ['jalebi', 'jalebi']"], answer: 0,
            explain: md`Only jalebi is not a key in «prices». A set keeps it once, even though Meena ordered 2.`,
            skill: "read" },
          { q: md`(Day 67) In what order are the names printed?`, options: ["Asha, Ravi, Meena", "Asha, Meena, Ravi", "Meena, Ravi, Asha"], answer: 0,
            explain: md`The key is minus the money spent, so the biggest spender comes first: Asha 62, Ravi 36, Meena 15.`,
            skill: "read" },
          { q: md`(Day 58) What does the whole program do?`,
            options: [
              "It adds up what each customer spent, prints the customers from biggest spender down, and lists items that are not on the menu",
              "It prints every order with its bill, in the order the orders came",
              "It finds the most popular snack",
            ],
            answer: 0,
            explain: md`«spent» totals the money for each name. The sort puts the biggest spender first, and «unknown» collects items with no price.`,
            skill: "read" },
          { q: md`(Day 46) Which change makes the program stop with a KeyError?`,
            options: [
              "Change «prices.get(item, 0)» to «prices[item]»",
              "Change «spent.get(name, 0)» to «spent.get(name)»",
              "Change «sorted(unknown)» to «unknown»",
            ],
            answer: 0,
            explain: md`Meena orders jalebi, which is not in «prices». «prices["jalebi"]» raises KeyError. «.get» with 0 avoids it.`,
            skill: "read" },
        ],
      },
      {
        id: "read2", kind: "read", title: "Cold Read 2: the attendance register (Days 49, 57, 67, 68)",
        task: md`Read the program slowly. Do not run it. Then answer the 5 questions. «P» means present and «A» means absent.`,
        code: py`
          register = {
              "Asha": "P P A P P",
              "Ravi": "P P P P P",
              "Meena": "A A P A P",
              "Imran": "P A P P A",
          }

          def present_days(marks):
              return sum(1 for m in marks.split() if m == "P")

          def full_week(marks):
              return all(m == "P" for m in marks.split())

          low = []
          for name, marks in register.items():
              count = present_days(marks)
              if count < 4:
                  low.append((count, name))
              if full_week(marks):
                  print("Full week:", name)

          low.sort()
          for count, name in low:
              print(name, count)

          wed = 2
          absent_wed = [name for name, marks in register.items() if marks.split()[wed] == "A"]
          print("Absent on Wednesday:", absent_wed)
        `,
        questions: [
          { q: md`(Day 68) What does «present_days("A A P A P")» give back?`, options: ["2", "3", "5"], answer: 0,
            explain: md`The generator adds 1 for each «P». There are two.`,
            skill: "read" },
          { q: md`(Day 58) What is the first line the program prints?`, options: ["Full week: Ravi", "Meena 2", "Full week: Asha"], answer: 0,
            explain: md`The first loop prints during the loop. Only Ravi has «P» on all five days. The «low» list is printed later.`,
            skill: "read" },
          { q: md`(Day 67) Why is Meena printed before Imran?`,
            options: [
              "«low.sort()» compares the tuples, and Meena's count, 2, is smaller than Imran's, 3",
              "Meena comes before Imran in the register",
              "M comes before I in A to Z order",
            ],
            answer: 0,
            explain: md`Each tuple starts with the count, so the count decides first. M comes after I, so the names did not decide.`,
            skill: "read" },
          { q: md`(Day 49) The school wants students present on **4 days or fewer** in «low». Which one change does that?`,
            options: ["Change «count < 4» to «count <= 4»", "Change «count < 4» to «count < 3»", "Change «wed = 2» to «wed = 4»"], answer: 0,
            explain: md`«<=» includes 4 itself, so Asha, with 4 days, joins the list.`,
            skill: "read" },
          { q: md`(Day 57) What does the last line print?`, options: ["Absent on Wednesday: ['Asha']", "Absent on Wednesday: ['Meena', 'Imran']", "Absent on Wednesday: []"], answer: 0,
            explain: md`Position 2 is the third day, Wednesday. Only Asha has «A» there.`,
            skill: "read" },
        ],
      },
      {
        id: "bug1", kind: "bug", title: "Bug Clinic: the top three (Days 49, 67)",
        task: md`
          The user types scores like «Om:45 Dev:12 Kabir:78 Ali:45». The program should print the **3 highest** scorers, highest first. Equal scores keep the typed order. For that line it should show:

          | Kabir 78
          | Om 45
          | Ali 45

          It shows the lowest scores instead. Tap the faulty line, then fix it.
        `,
        starter: py`
          rows = []
          for part in input("Scores: ").split():
              name, runs = part.split(":")
              rows.append((name, int(runs)))
          top = sorted(rows, key=lambda r: r[1])[:3]
          for name, runs in top:
              print(name, runs)
        `,
        bugLines: [5],
        solution: py`
          rows = []
          for part in input("Scores: ").split():
              name, runs = part.split(":")
              rows.append((name, int(runs)))
          top = sorted(rows, key=lambda r: -r[1])[:3]
          for name, runs in top:
              print(name, runs)
        `,
        tests: [
          { inputs: ["Om:45 Dev:12 Kabir:78 Ali:45"], output: "Kabir 78\nOm 45\nAli 45" },
          { inputs: ["Raj:5"], output: "Raj 5" },
          { inputs: ["A:1 B:2 C:3 D:4 E:5"], output: "E 5\nD 4\nC 3" },
          { inputs: ["Tara:30 Bina:30 Esha:30 Mira:30"], output: "Tara 30\nBina 30\nEsha 30" },
        ],
        wrong: [py`
          rows = []
          for part in input("Scores: ").split():
              name, runs = part.split(":")
              rows.append((name, int(runs)))
          top = sorted(rows, key=lambda r: -r[1])[:2]
          for name, runs in top:
              print(name, runs)
        `, py`
          rows = []
          for part in input("Scores: ").split():
              name, runs = part.split(":")
              rows.append((name, int(runs)))
          top = sorted(rows, key=lambda r: (-r[1], r[0]))[:3]
          for name, runs in top:
              print(name, runs)
        `],
      },
      {
        id: "bug2", kind: "bug", title: "Bug Clinic: the average without absences (Days 47, 49)",
        task: md`
          The user types marks on one line. «AB» means absent and does not count. The program should print the average of the real marks. For «40 AB 60» it should show «Average: 50.0». It shows «Average: 33.3». Tap the faulty line, then fix it.
        `,
        starter: py`
          def average(marks):
              real = [int(m) for m in marks if m != "AB"]
              if len(real) == 0:
                  return 0
              return sum(real) / len(marks)

          parts = input("Marks: ").split()
          print(f"Average: {average(parts):.1f}")
        `,
        bugLines: [5],
        solution: py`
          def average(marks):
              real = [int(m) for m in marks if m != "AB"]
              if len(real) == 0:
                  return 0
              return sum(real) / len(real)

          parts = input("Marks: ").split()
          print(f"Average: {average(parts):.1f}")
        `,
        tests: [
          { inputs: ["40 AB 60"], output: "Average: 50.0" },
          { inputs: ["AB AB"], output: "Average: 0.0" },
          { inputs: ["75"], output: "Average: 75.0" },
          { inputs: ["33 34"], output: "Average: 33.5" },
          { inputs: ["10 20 AB 30 AB"], output: "Average: 20.0" },
        ],
        wrong: [py`
          def average(marks):
              real = [int(m) for m in marks if m != "AB"]
              if len(real) == 0:
                  return 0
              return sum(real) // len(real)

          parts = input("Marks: ").split()
          print(f"Average: {average(parts):.1f}")
        `, py`
          def average(marks):
              real = [int(m) for m in marks if m != "AB"]
              if len(real) == 0:
                  return 0
              return sum(real) / (len(marks) - 1)

          parts = input("Marks: ").split()
          print(f"Average: {average(parts):.1f}")
        `],
      },
      {
        id: "make", kind: "make", title: "Make: cups of chai (Days 30, 67)",
        task: md`
          From a blank page. The user types, on one line, the name of each person who bought a cup of chai today. A name repeats when the person bought more cups. Print each different name with the number of cups: **most cups first**, and equal cups in A to Z order of name. For «Ravi Asha Meena Ravi Imran Asha Ravi Meena» it shows:

          | Ravi 3
          | Asha 2
          | Meena 2
          | Imran 1
        `,
        starter: py`

        `,
        solution: py`
          names = input("Cups bought by: ").split()
          counts = {}
          for n in names:
              counts[n] = counts.get(n, 0) + 1
          for name in sorted(counts, key=lambda n: (-counts[n], n)):
              print(name, counts[name])
        `,
        tests: [
          { inputs: ["Ravi Asha Meena Ravi Imran Asha Ravi Meena"], output: "Ravi 3\nAsha 2\nMeena 2\nImran 1" },
          { inputs: ["Kiran"], output: "Kiran 1" },
          { inputs: ["Zoya Om Bina"], output: "Bina 1\nOm 1\nZoya 1" },
          { inputs: ["Tara Tara Anil Tara Anil Anil Dev"], output: "Anil 3\nTara 3\nDev 1" },
        ],
        wrong: [py`
          names = input("Cups bought by: ").split()
          counts = {}
          for n in names:
              counts[n] = counts.get(n, 0) + 1
          for name in sorted(counts, key=lambda n: (counts[n], n), reverse=True):
              print(name, counts[name])
        `, py`
          names = input("Cups bought by: ").split()
          counts = {}
          for n in names:
              counts[n] = counts.get(n, 0) + 1
          for name in sorted(counts, key=lambda n: -counts[n]):
              print(name, counts[name])
        `, py`
          names = input("Cups bought by: ").split()
          for name in sorted(set(names)):
              print(name, names.count(name))
        `],
      },
    ],
    keys: [
      md`Read a cold program in order: functions, then data, then the main loop. Follow the values on paper.`,
      md`Your scores show what to practise next. They are a map, not a judgement.`,
      md`Repair at most 3 days at a time, smallest day numbers first, and redo each day's Make from a blank page.`,
    ],
  });
})();
