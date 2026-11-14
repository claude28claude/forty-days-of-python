// Week 4 — Lists: creating, changing, looping, split/join, tuples, comprehensions.
(function () {
  const { day, md, py, ex, tip, warn, ask, pause } = window.Course;

  // ---------------------------------------------------------------- Day 22
  day({
    slug: "lists",
    title: "Lists",
    goal: "Keep many values together, in order, under one name.",
    minutes: 40,
    needs: [13, 18],
    win: "Today you can now keep many values in one list, read them by position and change them.",
    learn: [
      md`
        ## Many values under one name

        So far, each variable has held one value. A **list** holds many values, in order, under one name. Each value inside a list is called an **item**. Guess what this prints, then press Run.
      `,
      ex(py`
        cities = ["Delhi", "Pune", "Kochi"]
        print(cities)
        print(len(cities))
      `, { predict: ["['Delhi', 'Pune', 'Kochi']\n3", "Delhi Pune Kochi\n3", "['Delhi', 'Pune', 'Kochi']\n14"], answer: 0 }),
      md`
        A list starts and ends with **square brackets** «[ ]». Commas go between the items. Python shows text items with single quotes. «len()» counts the items, not the letters.

        Positions work like they do on text (Day 13). The first item is at position 0. Position «-1» is the last item.
      `,
      ex(py`
        cities = ["Delhi", "Pune", "Kochi"]
        print(cities[0])
        print(cities[-1])
      `, { predict: ["Delhi\nKochi", "Pune\nKochi", "Delhi\nPune"], answer: 0 }),
      md`
        A list with 3 items has positions 0, 1 and 2. Here is a common mistake: asking for position 3. Python stops with an **IndexError**, which means "this position does not exist".
      `,
      ex(py`
        cities = ["Delhi", "Pune", "Kochi"]
        print(cities[3])
      `, { error: true, label: "A mistake: a position that does not exist", predict: ["IndexError", "Kochi", "Delhi"], answer: 0 }),
      md`
        ## Changing a list

        Text cannot be changed (Day 13). A list can. Put a new value at a position with «=». The old item at that position is replaced.
      `,
      ex(py`
        snacks = ["samosa", "vada", "jalebi"]
        snacks[1] = "dhokla"
        print(snacks)
      `),
      md`
        A list can hold numbers, text or a mix. «[]» is an **empty list**: it has no items yet, so its «len» is 0. We often start with «[]» and add items later (Day 23).

        Press **Step through**. The simulation draws a list as a row of boxes, with each position number underneath.
      `,
      ex(py`
        marks = [78, 92, 65]
        mixed = ["Asha", 25, True, 3.5]
        empty = []
        print(marks)
        print(mixed)
        print(empty, len(empty))
      `),
      md`
        ## Slices and in

        A **slice** takes a part of a list, as it does on text. «nums[1:3]» starts at position 1 and stops before position 3. «nums[:2]» takes the first two items. «[::-1]» goes backwards.
      `,
      ex(py`
        nums = [10, 20, 30, 40, 50]
        print(nums[1:3])
        print(nums[:2])
        print(nums[::-1])
        print(nums)
      `),
      md`
        A slice makes a **new** list. The last line shows that «nums» itself does not change.

        «in» asks: is this item in the list? The answer is «True» or «False». Capital letters matter. Guess first.
      `,
      ex(py`
        cities = ["Delhi", "Pune", "Kochi"]
        print("Pune" in cities)
        print("pune" in cities)
      `, { predict: ["True\nFalse", "True\nTrue", "False\nFalse"], answer: 0 }),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          colours = ["red", "green", "blue"]
          print(colours[1])
        `,
        options: ["red", "green", "blue"],
        answer: 1,
        explain: md`Position 1 is the **second** item, because counting starts at 0.`,
        why: [md`«red» is at position 0. Counting starts at 0, not 1.`, null, md`«blue» is at position 2, or «-1».`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          nums = [5, 10, 15]
          print(len(nums))
        `,
        options: ["3", "2", "30"],
        answer: 0,
        explain: md`«len()» counts the items: there are 3.`,
        why: [null, md`2 is the last position. «len()» counts the items, and there are 3.`, md`30 is the sum. «len()» counts the items; it does not add them.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          nums = [5, 10, 15]
          nums[0] = 99
          print(nums)
        `,
        options: ["[99, 10, 15]", "[5, 10, 15]", "[5, 99, 15]"],
        answer: 0,
        explain: md`Position 0 (the first item) is replaced with 99.`,
        why: [null, md`A list can be changed. Line 2 replaces the first item.`, md`Position 0 is the first item, not the second.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          nums = [1, 2, 3]
          print(nums[-1])
        `,
        options: ["1", "3", "-1"],
        answer: 1,
        explain: md`«-1» is the last item.`,
        why: [md`1 is at position 0. Position «-1» counts from the end.`, null, md`«-1» is a position, not a value. Python shows the item there.`],
        skill: "trace",
      },
      {
        q: md`What does this program do?`,
        code: py`
          marks = [45, 82, 67]
          marks[0] = marks[0] + 5
          print(marks)
        `,
        options: ["It adds 5 to the first mark, then prints the list", "It adds 5 to every mark", "It puts 5 at the front of the list"],
        answer: 0,
        explain: md`«marks[0]» is the first mark. Line 2 replaces it with itself plus 5, so the list becomes «[50, 82, 67]».`,
        why: [null, md`Only position 0 is changed. The other marks stay the same.`, md`No new item is added. The first item is replaced by a bigger number.`],
        verify: false,
        mono: false,
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-list-positions",
        kind: "trace",
        title: "Be the Computer: positions in a list",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          marks = [40, 55, 70]
          marks[1] = 60
          total = marks[0] + marks[1]
          last = marks[-1]
          print(total, last)
        `,
        inputs: [],
        ask: [{ line: 3, name: "total" }, { line: 4, name: "last" }, { output: true }],
        hints: [
          md`Write the list on paper as three boxes: 40, 55, 70.`,
          md`Line 2 puts 60 in position 1, in place of 55.`,
          md`«total» is 40 + 60. «marks[-1]» is the last box.`,
        ],
      },
      {
        id: "arrange-snacks",
        kind: "parsons",
        title: "Arrange: the snack counter",
        task: md`
          Put the lines in order and set each indent. The program changes the second snack to «dhokla», then prints each position and snack:

          | 0 samosa
          | 1 dhokla
          | 2 jalebi
        `,
        solution: py`
          snacks = ["samosa", "vada", "jalebi"]
          snacks[1] = "dhokla"
          for i in range(len(snacks)):
              print(i, snacks[i])
        `,
        distractors: ["for i in range(snacks):", "snacks[2] = \"dhokla\""],
        indent: "choose",
        tests: [{ output: "0 samosa\n1 dhokla\n2 jalebi" }],
        hints: [
          md`The list must exist before you change it.`,
          md`«range()» needs a number, so give it «len(snacks)». The second snack is at position 1.`,
          md`The «print» line goes inside the loop, 4 spaces to the right.`,
        ],
      },
      {
        id: "favourites",
        title: "Favourite colours",
        task: md`
          Create a list called «colours» holding **exactly three** colours of your choice (as text). Then print the first item and the last item, each on its own line. Take both from the list with positions. For «["red", "teal", "gold"]»:

          | red
          | gold
        `,
        starter: py`

        `,
        hints: [
          md`Make the list first: «colours = ["red", "teal", "gold"]».`,
          md`The first item is at position 0. The last item is at position «-1».`,
          md`«print(colours[0])» and «print(colours[-1])».`,
        ],
        solution: py`
          colours = ["red", "teal", "gold"]
          print(colours[0])
          print(colours[-1])
        `,
        tests: [
          {
            py: py`
              need("colours", "list")
              assert len(colours) == 3, f"«colours» should have exactly 3 items, but it has {len(colours)}."
              assert all(isinstance(c, str) for c in colours), "Each colour should be text, in quotes."
              assert LINES == [colours[0], colours[-1]], "Print the first item, then the last item, each on its own line."
              assert CODE.count("colours[") >= 2, "Take each colour from the list with a position, like «colours[0]». Do not type the colour inside «print»."
            `,
          },
        ],
        wrong: [
          'colours = ["red", "teal", "gold"]\nprint("red")\nprint("gold")',
          'colours = ["red", "teal", "gold"]\nprint(colours[1])\nprint(colours[2])',
        ],
      },
      {
        id: "update-scores",
        title: "Fix a score",
        task: md`
          The third score was marked wrongly: it should be 70, not 67. Change it **by its position** (do not rewrite the whole list), then print the list:

          | [45, 82, 70, 90]
        `,
        starter: py`
          scores = [45, 82, 67, 90]

        `,
        hints: [
          md`Put a new value at one position with «=».`,
          md`The third item is at position 2.`,
          md`«scores[2] = 70», then «print(scores)».`,
        ],
        solution: py`
          scores = [45, 82, 67, 90]
          scores[2] = 70
          print(scores)
        `,
        tests: [
          { output: "[45, 82, 70, 90]", py: py`assert scores == [45, 82, 70, 90], "«scores» should end up as [45, 82, 70, 90]."` },
          { uses: ["index_assign"], msg: md`Change the score with a position, like «scores[2] = 70».` },
        ],
        wrong: ["scores = [45, 82, 70, 90]\nprint(scores)", "scores = [45, 82, 67, 90]\nscores[3] = 70\nprint(scores)"],
      },
      {
        id: "city-facts",
        title: "City facts",
        task: md`
          Using the «cities» list, print:

          | First: Delhi
          | Last: Kochi
          | Count: 5

          Get each value **from the list** (with positions and «len()»), so it would still work if the list changed. So do not use position 4 for the last city.
        `,
        starter: py`
          cities = ["Delhi", "Mumbai", "Chennai", "Kolkata", "Kochi"]

        `,
        hints: [
          md`You need three things: the first city, the last city, and the number of cities.`,
          md`«cities[0]», «cities[-1]» and «len(cities)».`,
          md`«print("First:", cities[0])», and the same for the other two lines.`,
        ],
        solution: py`
          cities = ["Delhi", "Mumbai", "Chennai", "Kolkata", "Kochi"]
          print("First:", cities[0])
          print("Last:", cities[-1])
          print("Count:", len(cities))
        `,
        tests: [
          { output: "First: Delhi\nLast: Kochi\nCount: 5" },
          { uses: ["call:len"], msg: md`Count the cities with «len(cities)».` },
          {
            py: py`
              import re
              assert re.search(r"cities\[\s*0\s*\]", CODE), "Get the first city with «cities[0]»."
              assert re.search(r"cities\[\s*(-\s*1|len\(\s*cities\s*\)\s*-\s*1)\s*\]", CODE), "Get the last city with «cities[-1]»."
              assert not re.search(r"cities\[\s*4\s*\]", CODE), "Position 4 only works for this list. Use «cities[-1]», which works for a list of any length."
            `,
          },
        ],
        wrong: [
          'cities = ["Delhi", "Mumbai", "Chennai", "Kolkata", "Kochi"]\nprint("First: Delhi")\nprint("Last: Kochi")\nprint("Count:", len(cities))',
          'cities = ["Delhi", "Mumbai", "Chennai", "Kolkata", "Kochi"]\nprint("First:", cities[0])\nprint("Last:", cities[4])\nprint("Count:", len(cities))',
        ],
      },
      {
        id: "batting-order",
        title: "The first batsmen",
        task: md`
          The list holds a team's batting order. Ask how many batsmen to show. Print that many from the start of the list, using a **slice**. For «3»:

          | ['Arjun', 'Kabir', 'Vikram']

          For «0» it prints «[]». If the number is bigger than the team, print the whole list.
        `,
        starter: py`
          order = ["Arjun", "Kabir", "Vikram", "Rahul", "Sanju", "Dev"]
          n = int(input("How many? "))
        `,
        solution: py`
          order = ["Arjun", "Kabir", "Vikram", "Rahul", "Sanju", "Dev"]
          n = int(input("How many? "))
          print(order[:n])
        `,
        tests: [
          { inputs: ["3"], output: "['Arjun', 'Kabir', 'Vikram']" },
          { inputs: ["1"], output: "['Arjun']" },
          { inputs: ["0"], output: "[]" },
          { inputs: ["6"], output: "['Arjun', 'Kabir', 'Vikram', 'Rahul', 'Sanju', 'Dev']" },
          { inputs: ["10"], output: "['Arjun', 'Kabir', 'Vikram', 'Rahul', 'Sanju', 'Dev']" },
        ],
        wrong: [
          'order = ["Arjun", "Kabir", "Vikram", "Rahul", "Sanju", "Dev"]\nn = int(input("How many? "))\nprint(order[1:n])',
          'order = ["Arjun", "Kabir", "Vikram", "Rahul", "Sanju", "Dev"]\nn = int(input("How many? "))\nprint(order[:3])',
        ],
        hints: [
          md`A slice with no start number begins at position 0.`,
          md`The stop number is «n», the number the user typed. A slice that goes past the end just stops at the end.`,
          md`«print(order[:n])»`,
        ],
      },
      {
        id: "deliver-check",
        title: "Do we deliver there?",
        task: md`
          A shop delivers only to the cities in the list. Ask for a city. Use «in» to check the list. Capital letters matter, so «delhi» is not found. For «Patna»:

          | Yes, we deliver to Patna

          For «Mumbai»:

          | Sorry, not Mumbai
        `,
        starter: py`
          cities = ["Delhi", "Jaipur", "Lucknow", "Patna"]
          city = input("Your city: ")
        `,
        solution: py`
          cities = ["Delhi", "Jaipur", "Lucknow", "Patna"]
          city = input("Your city: ")
          if city in cities:
              print("Yes, we deliver to", city)
          else:
              print("Sorry, not", city)
        `,
        tests: [
          { inputs: ["Patna"], output: "Yes, we deliver to Patna" },
          { inputs: ["Delhi"], output: "Yes, we deliver to Delhi" },
          { inputs: ["Mumbai"], output: "Sorry, not Mumbai" },
          { inputs: ["delhi"], output: "Sorry, not delhi" },
          { inputs: ["Patna"], py: py`
            import re
            assert re.search(r"\bin\s+cities", CODE), "Check the list with «city in cities»."
          ` },
        ],
        wrong: [
          'cities = ["Delhi", "Jaipur", "Lucknow", "Patna"]\ncity = input("Your city: ")\nif city == cities[0]:\n    print("Yes, we deliver to", city)\nelse:\n    print("Sorry, not", city)',
        ],
        hints: [
          md`«city in cities» gives «True» or «False». Use it after «if».`,
          md`Write «if city in cities:», then an «else:» for the other case.`,
          md`«print("Yes, we deliver to", city)» goes inside the «if». «print("Sorry, not", city)» goes inside the «else».`,
        ],
      },
    ],
    keys: [
      md`A list holds many values in order: «snacks = ["samosa", "vada"]». Each value is an **item**.`,
      md`Positions start at 0; «snacks[-1]» is the last item. «len(snacks)» counts the items. A position that does not exist gives an IndexError.`,
      md`Lists can be changed: «snacks[1] = "dhokla"». «[]» is an empty list.`,
      md`A slice makes a new list: «nums[1:3]», «nums[:2]», «nums[::-1]».`,
      md`«"Pune" in cities» gives «True» or «False».`,
    ],
  });

  // ---------------------------------------------------------------- Day 23
  day({
    slug: "list-methods",
    title: "Changing lists",
    goal: "Add, remove and sort items with list methods.",
    minutes: 45,
    needs: [12, 17, 22],
    win: "Today you can now add items to a list, take them out, and put the list in order.",
    learn: [
      md`
        ## Adding items: append and insert

        A **method** is a tool attached to a value (Day 12). Lists have their own methods. «.append(item)» adds an item to the end. «.insert(position, item)» puts an item at a position. Guess first.
      `,
      ex(py`
        shopping = ["milk", "bread"]
        shopping.append("eggs")
        shopping.insert(0, "tea")
        print(shopping)
      `, { predict: ["['tea', 'milk', 'bread', 'eggs']", "['milk', 'bread', 'eggs', 'tea']", "['tea', 'bread', 'eggs']"], answer: 0 }),
      md`
        With «.insert()», the items already there move one place to the right. Nothing is replaced.

        To build a list from input, start with an empty list. Add one item each time the loop runs:
      `,
      ex(py`
        names = []
        for i in range(3):
            names.append(input("A name: "))
        print(names)
      `, { inputs: ["Asha", "Ravi", "Meera"] }),
      md`
        ## Removing items: remove and pop

        - «.remove(item)» deletes the first item equal to «item».
        - «.pop()» takes out the last item and **gives it back**. "Gives back" means you can keep the answer in a variable, as with «len()».
        - «.pop(0)» takes out the item at position 0.
      `,
      ex(py`
        shopping = ["tea", "milk", "bread"]
        last = shopping.pop()
        print(last, shopping)
      `, { predict: ["bread ['tea', 'milk']", "tea ['milk', 'bread']", "bread ['tea', 'milk', 'bread']"], answer: 0 }),
      md`
        Here is a common mistake. Removing an item that is not in the list is an error. Check with «in» first.
      `,
      ex(py`
        shopping = ["tea", "milk"]
        shopping.remove("coffee")
      `, { error: true, label: "A mistake: removing a missing item" }),
      ask({
        q: md`«queue» is «["Asha", "Ravi", "Meera"]». What does «first = queue.pop(0)» put in «first»?`,
        options: ["Asha", "Meera", "0"],
        answer: 0,
        explain: md`«.pop(0)» takes out the item at position 0 and gives it back. «queue» is now «["Ravi", "Meera"]».`,
        why: [null, md`That is «.pop()» with nothing in the brackets, which takes the last item.`, md`0 is the position. «.pop()» gives back the item, not the position.`],
      }),
      pause(md`Good place for a break. The second part is about putting a list in order.`),
      md`
        ## Putting a list in order

        To **sort** means to put in order. For numbers, smallest first. For text, A to Z. «.sort()» sorts the list itself. Guess first.
      `,
      ex(py`
        nums = [42, 7, 19, 3]
        nums.sort()
        print(nums)
      `, { predict: ["[3, 7, 19, 42]", "[42, 19, 7, 3]", "[42, 7, 19, 3]"], answer: 0 }),
      md`
        «reverse=True» is a **setting**, like «end=""» in «print» (Day 20). It tells «.sort()» to put the biggest first. «True» needs a capital T. Capital letters sort before small letters, so «"asha"» comes last below.
      `,
      ex(py`
        nums = [42, 7, 19, 3]
        nums.sort(reverse=True)
        print(nums)
        names = ["Ravi", "asha", "Meera"]
        names.sort()
        print(names)
      `),
      md`
        «sorted(my_list)» leaves the old list alone. It gives back a **new** sorted list:
      `,
      ex(py`
        nums = [3, 1, 2]
        in_order = sorted(nums)
        print(in_order)
        print(nums)
      `),
      md`
        Here is a common mistake. Guess what it prints.
      `,
      ex(py`
        nums = [3, 1, 2]
        nums = nums.sort()
        print(nums)
      `, { label: "A mistake: nums = nums.sort()", predict: ["None", "[1, 2, 3]", "[3, 1, 2]"], answer: 0 }),
      md`
        «.sort()» changes the list, but it gives back «None». So after «nums = nums.sort()», «nums» holds «None». Your list is lost. Write «nums.sort()» on its own line.

        Three more useful methods:

        - «.count(x)» says how many times «x» appears.
        - «.index(x)» gives the position of the first «x». It is an error if «x» is not there.
        - «.reverse()» turns the list back to front. It does not sort.
      `,
      ex(py`
        nums = [4, 8, 4, 2]
        print(nums.count(4))
        print(nums.index(8))
        nums.reverse()
        print(nums)
      `),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          a = [1, 2]
          a.append(3)
          print(a)
        `,
        options: ["[1, 2, 3]", "[3, 1, 2]", "[1, 2]"],
        answer: 0,
        explain: md`«.append()» adds to the end.`,
        why: [null, md`That is «a.insert(0, 3)». «.append()» adds at the end.`, md`«.append()» changes the list itself. You do not need «a = ...».`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          a = [3, 1, 2]
          a.sort()
          print(a)
        `,
        options: ["[1, 2, 3]", "[3, 2, 1]", "[3, 1, 2]"],
        answer: 0,
        explain: md`«.sort()» puts the list in order, smallest first.`,
        why: [null, md`Biggest first needs «reverse=True».`, md`«.sort()» changes the list itself, so the order is new.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          a = [5, 6, 7]
          x = a.pop()
          print(x, a)
        `,
        options: ["7 [5, 6]", "5 [6, 7]", "7 [5, 6, 7]"],
        answer: 0,
        explain: md`«.pop()» removes the last item and gives it back.`,
        why: [null, md`That is «a.pop(0)». With empty brackets, «.pop()» takes the last item.`, md`«.pop()» takes the item **out** of the list.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          a = [3, 1, 2]
          b = a.sort()
          print(b)
        `,
        options: ["[1, 2, 3]", "None", "[3, 1, 2]"],
        answer: 1,
        explain: md`«.sort()» sorts «a» but gives back «None», so «b» is «None».`,
        why: [md`«a» is now «[1, 2, 3]», but «b» gets what «.sort()» gives back, which is «None».`, null, md`«b» does not get a copy of the list. It gets «None».`],
        skill: "debug",
      },
      {
        q: md`What does this program do?`,
        code: py`
          prices = [30, 12, 25]
          prices.sort(reverse=True)
          print(prices[0])
        `,
        options: ["It prints the highest price", "It prints the lowest price", "It prints the first price in the original list"],
        answer: 0,
        explain: md`With «reverse=True» the biggest comes first, so «prices[0]» is the highest price, 30.`,
        why: [null, md`Without «reverse=True», position 0 would hold the lowest price.`, md`The list is sorted before line 3 runs, so the order has changed.`],
        verify: false,
        mono: false,
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-list-tools",
        kind: "trace",
        title: "Be the Computer: count, index and reverse",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          nums = [4, 8, 4, 2]
          nums.append(4)
          c = nums.count(4)
          p = nums.index(8)
          nums.reverse()
          first = nums[0]
          print(c, p, first)
        `,
        inputs: [],
        ask: [{ line: 3, name: "c" }, { line: 4, name: "p" }, { line: 6, name: "first" }, { output: true }],
        hints: [
          md`After line 2 the list is «[4, 8, 4, 2, 4]».`,
          md`Count the 4s. Then find the position of 8, counting from 0.`,
          md`After «.reverse()» the list is «[4, 2, 4, 8, 4]».`,
        ],
      },
      {
        id: "arrange-names",
        kind: "parsons",
        title: "Arrange: names in order",
        task: md`
          Put the lines in order and set each indent. The program asks for 3 names, then prints them from A to Z. For «Ravi», «Asha» and «Meera»:

          | ['Asha', 'Meera', 'Ravi']
        `,
        solution: py`
          names = []
          for i in range(3):
              names.append(input("Name: "))
          names.sort()
          print(names)
        `,
        distractors: ["names = names.sort()"],
        indent: "choose",
        tests: [
          { inputs: ["Ravi", "Asha", "Meera"], output: "['Asha', 'Meera', 'Ravi']" },
          { inputs: ["Zoya", "Kabir", "Dev"], output: "['Dev', 'Kabir', 'Zoya']" },
          { inputs: ["Asha", "Asha", "Arjun"], output: "['Arjun', 'Asha', 'Asha']" },
        ],
        hints: [
          md`The empty list comes first. The loop fills it.`,
          md`Only the «.append()» line is inside the loop. Sort once, after the loop.`,
          md`«names.sort()» stands on its own line. «names = names.sort()» would lose the list.`,
        ],
      },
      {
        id: "shopping-list",
        title: "Shopping list",
        task: md`
          Start with an empty list. Ask for 3 items, adding each one to the list with «.append()». Then print the list. For «milk», «bread» and «eggs»:

          | ['milk', 'bread', 'eggs']
        `,
        starter: py`
          items = []

        `,
        hints: [
          md`Loop 3 times with «for i in range(3):».`,
          md`Inside the loop, ask for an item and add it with «.append()». Print after the loop.`,
          md`«items.append(input("Item: "))», then «print(items)» after the loop.`,
        ],
        solution: py`
          items = []
          for i in range(3):
              items.append(input("Item: "))
          print(items)
        `,
        tests: [
          { inputs: ["milk", "bread", "eggs"], output: "['milk', 'bread', 'eggs']" },
          { inputs: ["rice", "dal", "ghee"], output: "['rice', 'dal', 'ghee']" },
          { inputs: ["chai", "chai", "sugar"], output: "['chai', 'chai', 'sugar']" },
          { uses: ["method:append"], msg: md`Add each item with «items.append(...)».` },
        ],
        wrong: [py`
          items = []
          for i in range(3):
              items = [input("Item: ")]
          print(items)
        `],
      },
      {
        id: "guest-list",
        title: "Guest list",
        task: md`
          Ask for a name to remove from the guest list. If the name is on the list, remove it and print the updated list. If not, print the name, then the words «is not on the list». For «Ravi»:

          | ['Asha', 'Meera', 'John']

          For «Zoya»:

          | Zoya is not on the list
        `,
        starter: py`
          guests = ["Asha", "Ravi", "Meera", "John"]

        `,
        hints: [
          md`Removing a missing name is an error, so check first: «if name in guests:».`,
          md`Inside the «if»: «guests.remove(name)» then «print(guests)». In the «else», use an f-string.`,
          md`«print(f"{name} is not on the list")»`,
        ],
        solution: py`
          guests = ["Asha", "Ravi", "Meera", "John"]
          name = input("Remove who? ")
          if name in guests:
              guests.remove(name)
              print(guests)
          else:
              print(f"{name} is not on the list")
        `,
        tests: [
          { inputs: ["Ravi"], output: "['Asha', 'Meera', 'John']" },
          { inputs: ["Zoya"], output: "Zoya is not on the list" },
          { inputs: ["John"], output: "['Asha', 'Ravi', 'Meera']" },
          { inputs: ["Asha"], output: "['Ravi', 'Meera', 'John']" },
        ],
        wrong: [py`
          guests = ["Asha", "Ravi", "Meera", "John"]
          name = input("Remove who? ")
          guests.remove(name)
          print(guests)
        `],
      },
      {
        id: "chai-queue",
        title: "The chai stall line",
        task: md`
          People wait in a line at a chai stall. Ask who joins the line, and add them **at the end** with «.append()». Then ask for a VIP (a very important person, who does not wait), and put them **at the front** with «.insert()». Then serve the first person with «.pop(0)». For «Meera» and «Kabir»:

          | Served: Kabir
          | Waiting: ['Asha', 'Ravi', 'Meera']
        `,
        starter: py`
          queue = ["Asha", "Ravi"]
          new = input("Who joins the line? ")
          vip = input("Who is the VIP? ")
        `,
        solution: py`
          queue = ["Asha", "Ravi"]
          new = input("Who joins the line? ")
          vip = input("Who is the VIP? ")
          queue.append(new)
          queue.insert(0, vip)
          served = queue.pop(0)
          print("Served:", served)
          print("Waiting:", queue)
        `,
        tests: [
          { inputs: ["Meera", "Kabir"], output: "Served: Kabir\nWaiting: ['Asha', 'Ravi', 'Meera']" },
          { inputs: ["Dev", "Zoya"], output: "Served: Zoya\nWaiting: ['Asha', 'Ravi', 'Dev']" },
          { inputs: ["Ravi", "Asha"], output: "Served: Asha\nWaiting: ['Asha', 'Ravi', 'Ravi']" },
          { uses: ["method:append", "method:insert", "method:pop"], msg: md`Use «.append()», «.insert()» and «.pop(0)», one each.` },
        ],
        wrong: [py`
          queue = ["Asha", "Ravi"]
          new = input("Who joins the line? ")
          vip = input("Who is the VIP? ")
          queue.append(new)
          queue.append(vip)
          served = queue.pop(0)
          print("Served:", served)
          print("Waiting:", queue)
        `, py`
          queue = ["Asha", "Ravi"]
          new = input("Who joins the line? ")
          vip = input("Who is the VIP? ")
          queue.append(new)
          queue.insert(0, vip)
          served = queue.pop()
          print("Served:", served)
          print("Waiting:", queue)
        `],
        hints: [
          md`Three steps: add at the end, add at the front, take from the front.`,
          md`«queue.append(new)», then «queue.insert(0, vip)».`,
          md`«served = queue.pop(0)» keeps the person who was taken out. Then print «served» and «queue».`,
        ],
      },
      {
        id: "sort-numbers",
        title: "Sort some numbers",
        optional: true,
        task: md`
          First ask how many numbers there will be. Then ask for each number (whole numbers) and collect them in a list. Print the sorted list, the smallest and the largest. For the numbers 42, 7, 19, 3:

          | Sorted: [3, 7, 19, 42]
          | Smallest: 3
          | Largest: 42
        `,
        starter: py`
          count = int(input("How many numbers? "))
          numbers = []

        `,
        hints: [
          md`Loop «count» times, appending «int(input("Number: "))» each time.`,
          md`Sort once, after the loop, with «numbers.sort()».`,
          md`After «numbers.sort()», the smallest is «numbers[0]» and the largest is «numbers[-1]».`,
        ],
        solution: py`
          count = int(input("How many numbers? "))
          numbers = []
          for i in range(count):
              numbers.append(int(input("Number: ")))
          numbers.sort()
          print("Sorted:", numbers)
          print("Smallest:", numbers[0])
          print("Largest:", numbers[-1])
        `,
        tests: [
          { inputs: ["4", "42", "7", "19", "3"], output: "Sorted: [3, 7, 19, 42]\nSmallest: 3\nLargest: 42" },
          { inputs: ["3", "-5", "0", "5"], output: "Sorted: [-5, 0, 5]\nSmallest: -5\nLargest: 5" },
          { inputs: ["1", "8"], output: "Sorted: [8]\nSmallest: 8\nLargest: 8" },
        ],
        wrong: [py`
          count = int(input("How many numbers? "))
          numbers = []
          for i in range(count):
              numbers.append(input("Number: "))
          numbers.sort()
          print("Sorted:", numbers)
          print("Smallest:", numbers[0])
          print("Largest:", numbers[-1])
        `],
      },
      {
        id: "as-typed",
        title: "Sorted, and as typed",
        task: md`
          Ask for 4 marks (whole numbers) and collect them in a list. Print them in order **and** in the order they were typed. Use «sorted()», so the old list does not change. For 70, 45, 90, 62:

          | Sorted: [45, 62, 70, 90]
          | As typed: [70, 45, 90, 62]
        `,
        starter: py`
          marks = []
        `,
        solution: py`
          marks = []
          for i in range(4):
              marks.append(int(input("Mark: ")))
          print("Sorted:", sorted(marks))
          print("As typed:", marks)
        `,
        tests: [
          { inputs: ["70", "45", "90", "62"], output: "Sorted: [45, 62, 70, 90]\nAs typed: [70, 45, 90, 62]" },
          { inputs: ["10", "20", "30", "40"], output: "Sorted: [10, 20, 30, 40]\nAs typed: [10, 20, 30, 40]" },
          { inputs: ["5", "5", "1", "100"], output: "Sorted: [1, 5, 5, 100]\nAs typed: [5, 5, 1, 100]" },
          { uses: ["call:sorted"], msg: md`Use «sorted(marks)» so the old list keeps its order.` },
        ],
        wrong: [py`
          marks = []
          for i in range(4):
              marks.append(int(input("Mark: ")))
          marks.sort()
          print("Sorted:", sorted(marks))
          print("As typed:", marks)
        `],
        hints: [
          md`Fill the list first, with a loop that runs 4 times.`,
          md`«sorted(marks)» gives a new list. «marks» itself keeps the typed order.`,
          md`«print("Sorted:", sorted(marks))», then «print("As typed:", marks)».`,
        ],
      },
    ],
    keys: [
      md`«.append(x)» adds to the end; «.insert(i, x)» adds at position «i» and moves the rest right.`,
      md`«.remove(x)» deletes the first «x» (an error if «x» is missing); «.pop()» removes and gives back the last item, «.pop(0)» the first.`,
      md`«.sort()» sorts the list itself and gives back «None»; «sorted(my_list)» gives a new sorted list.`,
      md`«.sort(reverse=True)» sorts biggest first. «.count(x)», «.index(x)» and «.reverse()» are also list methods.`,
      md`Build a list by starting with «[]» and appending in a loop.`,
    ],
  });

  // ---------------------------------------------------------------- Day 24
  day({
    slug: "looping-lists",
    title: "Looping over lists",
    goal: "Go through every item in a list, and use sum(), min() and max().",
    minutes: 40,
    needs: [17, 22],
    win: "Today you can now visit every item in a list, and add up, count and pick out items.",
    learn: [
      md`
        ## One item at a time

        A «for» loop can go through a list. It takes one item from the list each time it runs. You do not need positions. Guess first.
      `,
      ex(py`
        snacks = ["samosa", "vada", "jalebi"]
        for s in snacks:
            print("I like", s)
      `, { predict: ["I like samosa\nI like vada\nI like jalebi", "I like ['samosa', 'vada', 'jalebi']", "I like samosa"], answer: 0 }),
      md`
        Read the loop line as "for each «s» in «snacks»". The name «s» holds a new item each round. Press **Step through** to watch it change.

        To number the items, keep a counter. It starts at 1 and goes up by 1 each round. (Day 26 shows a shorter way.)
      `,
      ex(py`
        number = 1
        for task in ["Wake up", "Study"]:
            print(f"{number}. {task}")
            number += 1
      `),
      md`
        ## Ready-made helpers: sum, min and max

        Python has ready-made functions for lists of numbers. «sum()» adds all the items. «min()» gives the smallest. «max()» gives the biggest. The average is the sum divided by the count.
      `,
      ex(py`
        marks = [78, 92, 65, 88]
        print(sum(marks))
        print(min(marks))
        print(max(marks))
        print(sum(marks) / len(marks))
      `, { predict: ["323\n65\n92\n80.75", "323\n92\n65\n80.75", "4\n65\n92\n80.75"], answer: 0 }),
      md`
        Here is a common mistake. Do not name a variable «sum», «min», «max» or «list». The name hides Python's own tool:
      `,
      ex(py`
        sum = 0
        marks = [10, 20]
        print(sum(marks))
      `, { error: true, label: "A mistake: a variable called sum" }),
      md`
        After «sum = 0», the name «sum» means the number 0. A number cannot be used with brackets like a function, so Python stops with a TypeError. Use a name like «total» instead.

        ## Picking out and counting

        Put an «if» inside the loop to pick out some items. Here only marks below 33 are printed:
      `,
      ex(py`
        marks = [78, 32, 65, 20, 88]
        for m in marks:
            if m < 33:
                print("Needs help:", m)
      `),
      md`
        To count matches, add 1 to a counter inside the «if»:
      `,
      ex(py`
        words = ["samosa", "chai", "sambar", "sabzi"]
        count = 0
        for w in words:
            if w.startswith("s"):
                count += 1
        print(count, "words start with s")
      `),
      tip(md`Do not add or remove items from a list while a loop goes through that same list. Python can skip items. Build a new list instead (Day 25).`),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          total = 0
          for n in [2, 4, 6]:
              total += n
          print(total)
        `,
        options: ["12", "246", "3"],
        answer: 0,
        explain: md`2 + 4 + 6 = 12.`,
        why: [null, md`The items are numbers, so «+=» adds them. It does not join them like text.`, md`3 is how many items there are. «total» adds the items themselves.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          nums = [3, 9, 4]
          print(max(nums))
        `,
        options: ["3", "9", "4"],
        answer: 1,
        explain: md`«max()» gives the biggest item.`,
        why: [md`3 is the smallest. That is «min()».`, null, md`4 is the last item. «max()» looks at every item.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          n = 0
          for x in ["a", "b"]:
              print(n, x)
              n += 1
        `,
        options: ["0 a\n1 b", "1 a\n2 b", "a 0\nb 1"],
        answer: 0,
        explain: md`The counter starts at 0, so the first line shows 0. It goes up by 1 after each print.`,
        why: [null, md`The counter starts at 0, and «n += 1» comes after the print.`, md`«print(n, x)» shows «n» first, then «x».`],
        skill: "trace",
      },
      {
        q: md`What happens?`,
        code: py`
          sum = 0
          prices = [20, 30]
          print(sum(prices))
        `,
        options: ["TypeError", "50", "0"],
        answer: 0,
        error: true,
        explain: md`After «sum = 0», «sum» is a number, not Python's tool. A number cannot be called with brackets.`,
        why: [null, md`That would be right with a name like «total». Here «sum» no longer means the tool.`, md`Python does not print «sum». It tries to call it and stops.`],
        skill: "debug",
      },
      {
        q: md`What does this program do?`,
        code: py`
          marks = [78, 32, 65, 20]
          count = 0
          for m in marks:
              if m < 33:
                  count += 1
          print(count)
        `,
        options: ["It counts how many marks are below 33", "It adds up the marks below 33", "It prints every mark below 33"],
        answer: 0,
        explain: md`«count» goes up by 1 for each mark below 33. Here it prints 2.`,
        why: [null, md`That would be «count += m». Here 1 is added, not the mark.`, md`The only «print» is after the loop, so one number is printed.`],
        verify: false,
        mono: false,
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-loop-list",
        kind: "trace",
        title: "Be the Computer: a loop over prices",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          prices = [10, 25, 15]
          total = 0
          for p in prices:
              total += p
          biggest = max(prices)
          print(total, biggest)
        `,
        inputs: [],
        ask: [{ line: 4, hit: 2, name: "total" }, { line: 5, name: "biggest" }, { output: true }],
        hints: [
          md`«p» is 10, then 25, then 15.`,
          md`After the second round, «total» is 10 + 25.`,
          md`«max(prices)» is the biggest of the three prices.`,
        ],
      },
      {
        id: "arrange-runs",
        kind: "parsons",
        title: "Arrange: total runs",
        task: md`
          Put the lines in order and set each indent. The program adds up a batsman's runs and prints the total once:

          | Total runs: 87
        `,
        solution: py`
          runs = [12, 45, 0, 30]
          total = 0
          for r in runs:
              total += r
          print("Total runs:", total)
        `,
        distractors: ["total = r"],
        indent: "choose",
        tests: [{ output: "Total runs: 87" }],
        hints: [
          md`The list and «total = 0» come before the loop.`,
          md`Only the adding line is inside the loop.`,
          md`The «print» line has no indent, so it runs once, after the loop.`,
        ],
      },
      {
        id: "total-expenses",
        title: "Monthly expenses",
        task: md`
          Print each expense with a ₹ sign, then the total. Use a loop and a total variable (not «sum()»):

          | ₹120
          | ₹450
          | ₹80
          | ₹1200
          | ₹300
          | Total: ₹2150

          Many keyboards have no ₹ key. Copy ₹ from this page and paste it into your code.
        `,
        starter: py`
          expenses = [120, 450, 80, 1200, 300]

        `,
        hints: [
          md`«total = 0» before the loop. Inside, print the expense and add it.`,
          md`«print(f"₹{amount}")» and «total += amount» go inside «for amount in expenses:».`,
          md`After the loop: «print(f"Total: ₹{total}")».`,
        ],
        solution: py`
          expenses = [120, 450, 80, 1200, 300]
          total = 0
          for amount in expenses:
              print(f"₹{amount}")
              total += amount
          print(f"Total: ₹{total}")
        `,
        tests: [
          { output: "₹120\n₹450\n₹80\n₹1200\n₹300\nTotal: ₹2150" },
          { uses: ["for"], msg: md`Go through the list with a «for» loop.` },
          { avoids: ["call:sum"], msg: md`Add the expenses up yourself in the loop, without «sum()».` },
          { py: py`
            assert "2150" not in CODE, "Do not type the total. Let the loop work it out with «total += amount»."
            assert expenses == [120, 450, 80, 1200, 300], "Keep the «expenses» list as it is."
          ` },
        ],
        wrong: [py`
          expenses = [120, 450, 80, 1200, 300]
          for amount in expenses:
              print(f"₹{amount}")
          print("Total: ₹2150")
        `, py`
          expenses = [120, 450, 80, 1200, 300]
          total = 0
          for amount in expenses:
              print(f"₹{amount}")
              total = amount
          print(f"Total: ₹{total}")
        `],
      },
      {
        id: "numbered-list",
        title: "Numbered to-do list",
        task: md`
          Print the tasks as a numbered list, starting from 1. Use a «for» loop over the list, and a counter called «number» that starts at 1:

          | 1. Wake up
          | 2. Exercise
          | 3. Study Python
          | 4. Sleep
        `,
        starter: py`
          tasks = ["Wake up", "Exercise", "Study Python", "Sleep"]

        `,
        hints: [
          md`Before the loop: «number = 1». The loop line is «for ___ in tasks:».`,
          md`Inside the loop, print the number and the task, then add 1 to «number».`,
          md`«print(f"{number}. {task}")», then «number += 1».`,
        ],
        solution: py`
          tasks = ["Wake up", "Exercise", "Study Python", "Sleep"]
          number = 1
          for task in tasks:
              print(f"{number}. {task}")
              number += 1
        `,
        tests: [
          { output: "1. Wake up\n2. Exercise\n3. Study Python\n4. Sleep" },
          { uses: ["for"], msg: md`Go through the list with a «for» loop.` },
          { py: py`
            assert "1. Wake up" not in CODE and "2. Exercise" not in CODE, "Do not type the lines yourself. Print them from the list inside the loop."
          ` },
        ],
        wrong: [py`
          tasks = ["Wake up", "Exercise", "Study Python", "Sleep"]
          number = 1
          for task in tasks:
              print(f"{number}. {task}")
        `, py`
          tasks = ["Wake up", "Exercise", "Study Python", "Sleep"]
          number = 0
          for task in tasks:
              print(f"{number}. {task}")
              number += 1
        `],
      },
      {
        id: "above-average",
        title: "Above average",
        task: md`
          Work out the average of the marks and print it. Then print every mark that is **above** the average, one per line. A mark equal to the average is not above it:

          | Average: 70.0
          | 78
          | 91
          | 88
        `,
        starter: py`
          marks = [56, 78, 91, 45, 70, 88, 62]

        `,
        hints: [
          md`First the average, then a loop with an «if».`,
          md`«average = sum(marks) / len(marks)»`,
          md`Then «for m in marks:» and print «m» when «m > average».`,
        ],
        solution: py`
          marks = [56, 78, 91, 45, 70, 88, 62]
          average = sum(marks) / len(marks)
          print("Average:", average)
          for m in marks:
              if m > average:
                  print(m)
        `,
        tests: [
          { output: "Average: 70.0\n78\n91\n88" },
          { uses: ["for"], msg: md`Go through the marks with a «for» loop.` },
          { py: py`
            assert "70.0" not in CODE and "70" not in CODE.split("]", 1)[-1], "Do not type the average. Work it out with «sum(marks) / len(marks)»."
            assert marks == [56, 78, 91, 45, 70, 88, 62], "Keep the «marks» list as it is."
          ` },
        ],
        wrong: [py`
          marks = [56, 78, 91, 45, 70, 88, 62]
          average = sum(marks) / len(marks)
          print("Average:", average)
          for m in marks:
              if m >= 62:
                  print(m)
        `, py`
          marks = [56, 78, 91, 45, 70, 88, 62]
          print("Average: 70.0")
          for m in marks:
              if m > 70:
                  print(m)
        `, py`
          marks = [56, 78, 91, 45, 70, 88, 62]
          average = sum(marks) / len(marks)
          print("Average:", average)
          for m in marks:
              if m >= average:
                  print(m)
        `],
      },
      {
        id: "chai-cups-min",
        title: "Use a ready-made function: min(a, b)",
        task: md`
          «min()» also works on two numbers: «min(a, b)» gives the smaller one. «min(4, 9)» is «4».

          A customer wants some cups of chai, but the stall has only a few cups left. Ask for both numbers. Print how many cups are served, using «min()». For «5» wanted and «8» left:

          | Served: 5 cups
        `,
        starter: py`
          wanted = int(input("Cups wanted: "))
          left = int(input("Cups left: "))
        `,
        solution: py`
          wanted = int(input("Cups wanted: "))
          left = int(input("Cups left: "))
          print("Served:", min(wanted, left), "cups")
        `,
        tests: [
          { inputs: ["5", "8"], output: "Served: 5 cups" },
          { inputs: ["10", "3"], output: "Served: 3 cups" },
          { inputs: ["6", "6"], output: "Served: 6 cups" },
          { inputs: ["4", "0"], output: "Served: 0 cups" },
          { uses: ["call:min"], msg: md`Use the ready-made function «min()» for this one.` },
        ],
        wrong: [py`
          wanted = int(input("Cups wanted: "))
          left = int(input("Cups left: "))
          print("Served:", wanted, "cups")
        `, py`
          wanted = int(input("Cups wanted: "))
          left = int(input("Cups left: "))
          print("Served:", max(wanted, left), "cups")
        `],
        hints: [
          md`The stall cannot serve more cups than it has left, or more than the customer wants.`,
          md`So the answer is the smaller of «wanted» and «left».`,
          md`«print("Served:", min(wanted, left), "cups")»`,
        ],
      },
    ],
    keys: [
      md`«for item in my_list:» visits every item in order.`,
      md`«sum()», «min()», «max()» and «len()» do the common jobs; the average is «sum(x) / len(x)».`,
      md`Never name a variable «sum», «min», «max» or «list»: it hides Python's own tool.`,
      md`An «if» inside the loop picks out or counts some items.`,
      md`Do not add or remove items from a list while looping over it.`,
    ],
  });

  // ---------------------------------------------------------------- Day 25
  day({
    slug: "split-join",
    title: "Splitting, joining and building lists",
    goal: "Turn text into lists and back, and build new lists from old ones.",
    minutes: 45,
    needs: [12, 23, 24],
    win: "Today you can now cut text into a list, join a list into text, and build a new list from an old one.",
    learn: [
      md`
        ## Splitting text into a list

        «.split()» cuts text into a list of words. With nothing in the brackets, it cuts at spaces. Any number of spaces counts as one gap. Spaces at the start and the end are ignored. Guess first.
      `,
      ex(py`
        sentence = "  I love masala chai "
        words = sentence.split()
        print(words)
        print(len(words))
      `, { predict: ["['I', 'love', 'masala', 'chai']\n4", "['  I love masala chai ']\n1", "['', '', 'I', 'love', 'masala', 'chai', '']\n7"], answer: 0 }),
      md`
        Put text in the brackets to cut at that text instead. This text is called the **separator**: it marks each cut.
      `,
      ex(py`
        data = "Delhi,Mumbai,Pune"
        cities = data.split(",")
        print(cities)
      `),
      md`
        ## Joining a list into text

        «.join()» does the opposite. The text before the dot is the "glue". It goes between the items, not at the two ends. Guess first.
      `,
      ex(py`
        words = ["masala", "chai", "time"]
        print(" ".join(words))
        print("-".join(words))
        print("".join(words))
      `, { predict: ["masala chai time\nmasala-chai-time\nmasalachaitime", "masala chai time\n-masala-chai-time-\nmasalachaitime", "['masala', 'chai', 'time']\nmasala-chai-time\nmasalachaitime"], answer: 0 }),
      md`
        Here is a common mistake. «.join()» works only when every item is text. Numbers cause a TypeError:
      `,
      ex(py`
        nums = [10, 20, 30]
        print("-".join(nums))
      `, { error: true, label: "A mistake: joining numbers" }),
      md`
        The fix is to turn each number into text with «str()» first. The second part of today shows how.
      `,
      pause(md`Good place for a break. The second part is about building new lists from old ones.`),
      md`
        ## Building a new list from an old one

        Start with an empty list. Loop over the old list. Append what you want in the new list. Here each new item is a word's length. Guess first.
      `,
      ex(py`
        words = ["chai", "samosa", "dosa"]
        lengths = []
        for w in words:
            lengths.append(len(w))
        print(lengths)
      `, { predict: ["[4, 6, 4]", "[4, 10, 14]", "3"], answer: 0 }),
      md`
        To **filter** means to keep only the items you want. A chai strainer lets the tea through and stops the leaves. An «if» inside the loop is the strainer:
      `,
      ex(py`
        prices = [40, 65, 20, 90]
        cheap = []
        for p in prices:
            if p < 50:
                cheap.append(p)
        print(cheap)
      `),
      md`
        The same idea fixes the «.join()» mistake. Make a new list of «str(n)», then join it:
      `,
      ex(py`
        nums = [10, 20, 30]
        texts = []
        for n in nums:
            texts.append(str(n))
        print("-".join(texts))
      `),
      md`
        To read several numbers from one line of input, split the line. Then turn each piece into a number with «int()»:
      `,
      ex(py`
        line = input("Type some numbers with spaces between them: ")
        numbers = []
        for part in line.split():
            numbers.append(int(part))
        print(numbers)
        print("Total:", sum(numbers))
      `, { inputs: ["4 8 15"] }),
      md`
        You can also put «.split()» straight after «input()». Python runs «input()» first. Then it cuts what was typed:

        : words = input("Words: ").split()
      `,
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          words = "a b c".split()
          print(words)
        `,
        options: ["['a', 'b', 'c']", "abc", "['a b c']"],
        answer: 0,
        explain: md`«.split()» cuts the text at each space and gives a list.`,
        why: [null, md`«.split()» gives a list, not one piece of text.`, md`The text is cut at the spaces, so there are 3 items, not 1.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          letters = ["x", "y", "z"]
          print("-".join(letters))
        `,
        options: ["x-y-z", "-x-y-z", "xyz"],
        answer: 0,
        explain: md`The glue goes **between** the items only.`,
        why: [null, md`The glue never goes before the first item.`, md`The glue here is «"-"», so it appears between the letters.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          words = "one two   three".split()
          print(len(words))
        `,
        options: ["3", "5", "15"],
        answer: 0,
        explain: md`«.split()» treats any number of spaces as one gap, so there are 3 words.`,
        why: [null, md`Extra spaces do not make extra words with «.split()».`, md`15 is the number of characters. «len()» here counts the words in the list.`],
        skill: "trace",
      },
      {
        q: md`What happens?`,
        code: py`
          nums = [1, 2]
          print("+".join(nums))
        `,
        options: ["TypeError", "1+2", "3"],
        answer: 0,
        error: true,
        explain: md`«.join()» needs text items. Turn each number into text with «str()» first.`,
        why: [null, md`That is what you would get with «["1", "2"]». The items here are numbers.`, md`«.join()» never adds numbers. It only glues text together.`],
        skill: "debug",
      },
      {
        q: md`What does this program do?`,
        code: py`
          prices = [40, 65, 20, 90]
          cheap = []
          for p in prices:
              if p < 50:
                  cheap.append(p)
          print(cheap)
        `,
        options: ["It makes a new list of the prices under 50", "It removes the prices under 50 from the list", "It counts the prices under 50"],
        answer: 0,
        explain: md`Each price under 50 is appended to «cheap». It prints «[40, 20]».`,
        why: [null, md`«prices» does not change. The cheap prices are copied into a new list.`, md`It appends the prices themselves, so it prints a list, not a number.`],
        verify: false,
        mono: false,
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-split-total",
        kind: "trace",
        title: "Be the Computer: numbers from text",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          line = "12 5 30"
          parts = line.split()
          total = 0
          for p in parts:
              total += int(p)
          print(len(parts), total)
        `,
        inputs: [],
        ask: [{ line: 5, hit: 2, name: "total" }, { line: 5, hit: 3, name: "total" }, { output: true }],
        hints: [
          md`«parts» is «['12', '5', '30']». Each piece is text.`,
          md`«int(p)» turns each piece into a number before it is added.`,
          md`After two rounds «total» is 12 + 5.`,
        ],
      },
      {
        id: "arrange-lengths",
        kind: "parsons",
        title: "Arrange: word lengths",
        task: md`
          Put the lines in order and set each indent. The program asks for some words on one line, then prints a list of their lengths. For «chai samosa»:

          | [4, 6]
        `,
        solution: py`
          words = input("Words: ").split()
          lengths = []
          for w in words:
              lengths.append(len(w))
          print(lengths)
        `,
        distractors: ["lengths = len(w)"],
        indent: "choose",
        tests: [
          { inputs: ["chai samosa"], output: "[4, 6]" },
          { inputs: ["idli"], output: "[4]" },
          { inputs: ["a bb ccc"], output: "[1, 2, 3]" },
        ],
        hints: [
          md`First get the words, then make the empty list.`,
          md`Only the «.append()» line is inside the loop.`,
          md`Print once, after the loop.`,
        ],
      },
      {
        id: "word-count",
        title: "Word counter",
        task: md`
          Ask for a sentence and print how many words it has. For «I love chai»:

          | Words: 3
        `,
        starter: py`

        `,
        hints: [
          md`«.split()» gives a list of the words.`,
          md`«len()» counts the items in that list.`,
          md`«print("Words:", len(sentence.split()))»`,
        ],
        solution: py`
          sentence = input("Sentence: ")
          print("Words:", len(sentence.split()))
        `,
        tests: [
          { inputs: ["I love chai"], output: "Words: 3" },
          { inputs: ["  lots   of   spaces  "], output: "Words: 3" },
          { inputs: ["one"], output: "Words: 1" },
        ],
        wrong: [py`
          sentence = input("Sentence: ")
          print("Words:", len(sentence.split(" ")))
        `, py`
          sentence = input("Sentence: ")
          print("Words:", len(sentence))
        `],
      },
      {
        id: "hyphen-join",
        title: "Join with hyphens",
        task: md`
          Ask for a sentence. Print its words joined with «-» between them. Use «.split()», then «.join()». For «I love chai»:

          | I-love-chai

          Extra spaces must not make extra hyphens. For «  two   words »:

          | two-words
        `,
        starter: py`
          sentence = input("Sentence: ")
        `,
        solution: py`
          sentence = input("Sentence: ")
          print("-".join(sentence.split()))
        `,
        tests: [
          { inputs: ["I love chai"], output: "I-love-chai" },
          { inputs: ["  two   words "], output: "two-words" },
          { inputs: ["chai"], output: "chai" },
          { inputs: ["SSC CGL mock test"], output: "SSC-CGL-mock-test" },
          { uses: ["method:join"], msg: md`Glue the words together with «"-".join(...)».` },
        ],
        wrong: [py`
          sentence = input("Sentence: ")
          print(sentence.replace(" ", "-"))
        `, py`
          sentence = input("Sentence: ")
          print("-".join(sentence))
        `],
        hints: [
          md`Two steps: cut the sentence into words, then glue them with «"-"».`,
          md`«sentence.split()» gives the words. The glue goes before «.join».`,
          md`«print("-".join(sentence.split()))»`,
        ],
      },
      {
        id: "sum-of-numbers",
        title: "Add up a line of numbers",
        task: md`
          Ask the user to type several whole numbers on one line, separated by spaces. Print their total. For «4 8 15 16 23 42»:

          | 108
        `,
        starter: py`

        `,
        hints: [
          md`Split the line, then convert each piece with «int()».`,
          md`Start with «total = 0». Loop: «for part in line.split():».`,
          md`Inside the loop: «total += int(part)». Print «total» after the loop.`,
        ],
        solution: py`
          line = input("Numbers: ")
          total = 0
          for part in line.split():
              total += int(part)
          print(total)
        `,
        tests: [
          { inputs: ["4 8 15 16 23 42"], output: "108" },
          { inputs: ["10"], output: "10" },
          { inputs: ["-5 5 10"], output: "10" },
          { uses: ["method:split"], msg: md`Cut the line into pieces with «.split()».` },
        ],
        wrong: [py`
          line = input("Numbers: ")
          total = 0
          for part in line.split():
              total += 1
          print(total)
        `, py`
          line = input("Numbers: ")
          total = 0
          for part in line.split():
              total = int(part)
          print(total)
        `],
      },
      {
        id: "cheap-snacks",
        title: "Snacks under ₹50",
        task: md`
          Ask for some snack prices on one line. Build a **new list** that keeps only the prices **under** 50, using a loop, an «if» and «.append()». For «40 65 20 90»:

          | Under 50: [40, 20]

          A price of exactly 50 is not under 50.
        `,
        starter: py`
          line = input("Prices: ")
          cheap = []
        `,
        solution: py`
          line = input("Prices: ")
          cheap = []
          for part in line.split():
              price = int(part)
              if price < 50:
                  cheap.append(price)
          print("Under 50:", cheap)
        `,
        tests: [
          { inputs: ["40 65 20 90"], output: "Under 50: [40, 20]" },
          { inputs: ["50 49 51"], output: "Under 50: [49]" },
          { inputs: ["100 200"], output: "Under 50: []" },
          { inputs: ["5"], output: "Under 50: [5]" },
          { uses: ["method:append"], msg: md`Add each cheap price to «cheap» with «.append()».` },
        ],
        wrong: [py`
          line = input("Prices: ")
          cheap = []
          for part in line.split():
              price = int(part)
              if price <= 50:
                  cheap.append(price)
          print("Under 50:", cheap)
        `, py`
          line = input("Prices: ")
          cheap = []
          for part in line.split():
              if part < "50":
                  cheap.append(part)
          print("Under 50:", cheap)
        `],
        hints: [
          md`Loop over «line.split()». Turn each piece into a number with «int()» before you compare it.`,
          md`Inside the loop: «if price < 50:», then append.`,
          md`«cheap.append(price)» goes inside the «if». Print once, after the loop.`,
        ],
      },
      {
        id: "acronym",
        title: "Make a short form (acronym)",
        optional: true,
        task: md`
          An **acronym** is a short form made from the first letter of each word. Ask for a phrase and print its acronym, in capitals. For «staff selection commission»:

          | SSC
        `,
        starter: py`

        `,
        hints: [
          md`Split the phrase into words, and collect each word's first letter («word[0]»).`,
          md`Start with «letters = ""». Inside the loop: «letters += word[0]».`,
          md`After the loop, print it in capitals: «print(letters.upper())».`,
        ],
        solution: py`
          phrase = input("Phrase: ")
          letters = ""
          for word in phrase.split():
              letters += word[0]
          print(letters.upper())
        `,
        tests: [
          { inputs: ["staff selection commission"], output: "SSC" },
          { inputs: ["portable network graphics"], output: "PNG" },
          { inputs: ["as soon as possible"], output: "ASAP" },
          { inputs: ["Indian Space Research Organisation"], output: "ISRO" },
        ],
        wrong: [py`
          phrase = input("Phrase: ")
          letters = ""
          for word in phrase.split():
              letters += word[0]
          print(letters)
        `],
      },
    ],
    keys: [
      md`«text.split()» cuts text at spaces and ignores extra spaces; «text.split(",")» cuts at commas.`,
      md`«"-".join(words)» joins a list of text into one string, with the glue between the items. Every item must be text.`,
      md`Build a new list: start with «[]», loop over the old list, and append.`,
      md`To filter means to keep only the items you want: put an «if» before the «.append()».`,
      md`Read several numbers at once: split the line, then «int()» each piece.`,
    ],
  });

  // ---------------------------------------------------------------- Day 26
  day({
    slug: "tuples",
    title: "Tuples, unpacking and sorted()",
    goal: "Group values that belong together, and unpack them into separate names.",
    minutes: 45,
    needs: [23, 24, 25],
    win: "Today you can now keep a name and a mark together in a tuple, unpack it, and loop over a table.",
    learn: [
      md`
        ## Tuples: groups that cannot change

        A **tuple** (say "too-pull") is like a list, but it cannot change. It is written with round brackets. Use a tuple for a few values that belong together, like a name and marks. Guess first.
      `,
      ex(py`
        student = ("Asha", 82)
        print(student[0])
        print(len(student))
      `, { predict: ["Asha\n2", "Asha\n82", "('Asha', 82)\n2"], answer: 0 }),
      md`
        Here is a common mistake: trying to change a tuple. Python stops with a TypeError. Tuples also have no «.append()» or «.sort()».
      `,
      ex(py`
        student = ("Asha", 82)
        student[1] = 90
      `, { error: true, label: "A mistake: changing a tuple" }),
      md`
        **List or tuple?** A list can change. Use it for many things of the same kind, such as all the marks in a class. A tuple is fixed. Use it for a few things that belong together, such as «("Asha", 82)».

        ## Unpacking and swapping

        **Unpacking** puts each value of a tuple into its own name, in one line. You need one name for each value. Python treats «4, 7» as a tuple, even without brackets. So «a, b = 4, 7» is unpacking too.
      `,
      ex(py`
        student = ("Asha", 82)
        name, marks = student
        print(name)
        print(marks)
        a, b = 4, 7
        print(b)
      `, { predict: ["Asha\n82\n7", "('Asha', 82)\n82\n7", "Asha\n82\n(4, 7)"], answer: 0 }),
      ex(py`
        x, y = (1, 2, 3)
      `, { error: true, label: "A mistake: 2 names for 3 values" }),
      md`
        Python stops with a ValueError: there are 3 values but only 2 names.

        To **swap** means to exchange: «a» gets the value of «b», and «b» gets the value of «a». First, the common mistake. Guess what it prints.
      `,
      ex(py`
        a = 1
        b = 2
        a = b
        b = a
        print(a, b)
      `, { label: "A mistake: swapping in two lines", predict: ["2 2", "2 1", "1 1"], answer: 0 }),
      md`
        After «a = b», the 1 is lost. Unpacking fixes this. Python first reads the whole right side, «2, 1». Only then does it put the values into «a» and «b». Both values change at the same time.
      `,
      ex(py`
        a = 1
        b = 2
        a, b = b, a
        print(a, b)
      `),
      pause(md`Good place for a break. The second part is about tables: lists of tuples.`),
      md`
        ## Tables: lists of tuples

        A list of tuples is a simple table. Each tuple is one row. You can unpack each tuple in the «for» line itself:
      `,
      ex(py`
        students = [("Asha", 82), ("Ravi", 67), ("Meera", 91)]
        for name, score in students:
            print(f"{name} scored {score}")
      `),
      md`
        «enumerate()» gives one tuple each round: the position and the item. So two names go after «for». «start=1» makes the counting begin at 1, because people usually count from 1. Guess first.
      `,
      ex(py`
        tasks = ["Study", "Chai"]
        for n, task in enumerate(tasks, start=1):
            print(f"{n}. {task}")
      `, { predict: ["1. Study\n2. Chai", "0. Study\n1. Chai", "Study 1\nChai 2"], answer: 0 }),
      md`
        «zip()» joins two lists side by side. Each round it gives one tuple: first item with first item, second with second. If one list is shorter, «zip()» stops at the end of the shorter list. Guess first.
      `,
      ex(py`
        names = ["Asha", "Ravi", "Meera"]
        runs = [45, 12]
        for name, r in zip(names, runs):
            print(name, r)
      `, { predict: ["Asha 45\nRavi 12", "Asha 45\nRavi 12\nMeera 0", "('Asha', 45)\n('Ravi', 12)"], answer: 0 }),
      md`
        «sorted(scores, reverse=True)» gives a new list, biggest first. A slice then takes the first few. You can join the two steps into one line. Python does «sorted» first, then the slice. Guess first.
      `,
      ex(py`
        scores = [67, 91, 82, 45]
        ordered = sorted(scores, reverse=True)
        print(ordered[:2])
        print(sorted(scores, reverse=True)[:2])
      `, { predict: ["[91, 82]\n[91, 82]", "[67, 91]\n[67, 91]", "[91, 82]\n[45, 67]"], answer: 0 }),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          a, b = 4, 7
          print(b)
        `,
        options: ["4", "7", "(4, 7)"],
        answer: 1,
        explain: md`«a» gets 4 and «b» gets 7.`,
        why: [md`4 goes into the first name, «a».`, null, md`The tuple is unpacked, so «b» holds one value, not the whole tuple.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          a = 1
          b = 2
          a, b = b, a
          print(a, b)
        `,
        options: ["2 1", "1 2", "2 2"],
        answer: 0,
        explain: md`Python reads the right side first, «2, 1». Then both values change at the same time.`,
        why: [null, md`Line 3 does change the values. It swaps them.`, md`«2 2» happens with two separate lines, «a = b» then «b = a». Unpacking avoids that.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          nums = [3, 1, 2]
          print(sorted(nums, reverse=True))
        `,
        options: ["[3, 2, 1]", "[1, 2, 3]", "[2, 1, 3]"],
        answer: 0,
        explain: md`«reverse=True» sorts biggest first.`,
        why: [null, md`That is «sorted(nums)» without «reverse=True».`, md`That is the list back to front. «reverse=True» sorts first, biggest first.`],
        skill: "trace",
      },
      {
        q: md`What happens?`,
        code: py`
          point = (3, 5)
          point[0] = 10
          print(point)
        `,
        options: ["TypeError", "(10, 5)", "(3, 5)"],
        answer: 0,
        error: true,
        explain: md`A tuple cannot change, so line 2 is an error.`,
        why: [null, md`That would work for a list. A tuple cannot be changed.`, md`Python does not skip the bad line. It stops with an error.`],
        skill: "debug",
      },
      {
        q: md`What does this program do?`,
        code: py`
          names = input("Names: ").split()
          for n, name in enumerate(names, start=1):
              print(n, name)
        `,
        options: ["It prints each typed name with a number, starting from 1", "It prints how many names were typed", "It prints each name twice"],
        answer: 0,
        explain: md`«enumerate(..., start=1)» gives 1 and the first name, then 2 and the second name, and so on.`,
        why: [null, md`It prints a line for every name, not one count.`, md`«n» is the number and «name» is the name, so each line has one number and one name.`],
        verify: false,
        mono: false,
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-unpack",
        kind: "trace",
        title: "Be the Computer: swap and unpack",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          a = 5
          b = 9
          a, b = b, a
          point = (a, b)
          x, y = point
          total = x - y
          print(total)
        `,
        inputs: [],
        ask: [{ line: 3, name: "a" }, { line: 5, name: "y" }, { output: true }],
        hints: [
          md`Line 3 swaps the values, so «a» gets 9 and «b» gets 5.`,
          md`«point» is «(9, 5)». Unpacking gives the first value to «x» and the second to «y».`,
          md`«total» is «x - y».`,
        ],
      },
      {
        id: "arrange-enumerate",
        kind: "parsons",
        title: "Arrange: a numbered city list",
        task: md`
          Put the lines in order and set each indent. The program prints the cities with numbers starting from 1:

          | 1. Agra
          | 2. Pune
          | 3. Surat
        `,
        solution: py`
          cities = ["Agra", "Pune", "Surat"]
          for n, city in enumerate(cities, start=1):
              print(f"{n}. {city}")
        `,
        distractors: ["for n, city in enumerate(cities):"],
        indent: "choose",
        tests: [{ output: "1. Agra\n2. Pune\n3. Surat" }],
        hints: [
          md`The list comes first, then the loop.`,
          md`The numbers must start at 1, so the loop needs «start=1».`,
          md`The «print» line is inside the loop, 4 spaces to the right.`,
        ],
      },
      {
        id: "swap",
        title: "Swap two values",
        task: md`
          Swap the values of «a» and «b» using unpacking (one line, no extra variable, and no numbers typed). Then print:

          | a = 9
          | b = 5
        `,
        starter: py`
          a = 5
          b = 9

        `,
        hints: [
          md`One line can swap them: «___, ___ = ___, ___».`,
          md`The left side is «a, b». The right side gives the values in the new order, using the names.`,
          md`«a, b = b, a», then «print("a =", a)» and «print("b =", b)».`,
        ],
        solution: py`
          a = 5
          b = 9
          a, b = b, a
          print("a =", a)
          print("b =", b)
        `,
        tests: [
          { output: "a = 9\nb = 5", py: py`assert a == 9 and b == 5, "After swapping, «a» should be 9 and «b» should be 5."` },
          { uses: ["unpack"], msg: md`Swap with unpacking: «a, b = b, a».` },
          { py: py`
            import re
            assert re.search(r"\(?\s*\ba\s*,\s*b\s*\)?\s*=\s*\(?\s*b\s*,\s*a\b|\(?\s*\bb\s*,\s*a\s*\)?\s*=\s*\(?\s*a\s*,\s*b\b", CODE), "Swap using the names, «a, b = b, a». Do not type the numbers 9 and 5."
          ` },
        ],
        wrong: ['a = 5\nb = 9\nprint("a =", 9)\nprint("b =", 5)', 'a = 5\nb = 9\na, b = 9, 5\nprint("a =", a)\nprint("b =", b)', 'a = 5\nb = 9\na = b\nb = a\nprint("a =", a)\nprint("b =", b)'],
      },
      {
        id: "report-card",
        title: "Report card",
        task: md`
          Loop over the list of (name, score) tuples, unpacking each one in the «for» line, and print:

          | Asha scored 82
          | Ravi scored 67
          | Meera scored 91
        `,
        starter: py`
          students = [("Asha", 82), ("Ravi", 67), ("Meera", 91)]

        `,
        hints: [
          md`Each tuple has two values, so put two names after «for»: «for ___, ___ in students:».`,
          md`Call them «name» and «score». Inside the loop, print them with an f-string.`,
          md`«for name, score in students:» then «print(f"{name} scored {score}")».`,
        ],
        solution: py`
          students = [("Asha", 82), ("Ravi", 67), ("Meera", 91)]
          for name, score in students:
              print(f"{name} scored {score}")
        `,
        tests: [
          { output: "Asha scored 82\nRavi scored 67\nMeera scored 91" },
          { uses: ["unpack"], msg: md`Unpack each tuple in the «for» line: «for name, score in students:».` },
          { py: py`assert "Asha scored" not in CODE, "Do not type the lines yourself. Print them from the list inside the loop."` },
        ],
        wrong: [py`
          students = [("Asha", 82), ("Ravi", 67), ("Meera", 91)]
          for s in students:
              print(s[0], "scored", s[1])
        `, py`
          students = [("Asha", 82), ("Ravi", 67), ("Meera", 91)]
          for name, score in students:
              print(f"{score} scored {name}")
        `],
      },
      {
        id: "top-three",
        title: "Top three",
        task: md`
          Print the three highest scores, biggest first, using «sorted()» on «scores» and a slice:

          | Top 3: [91, 88, 82]
        `,
        starter: py`
          scores = [67, 91, 82, 45, 88, 73]

        `,
        hints: [
          md`Two steps: sort biggest first, then take the first three.`,
          md`«sorted(scores, reverse=True)» puts the biggest first.`,
          md`Take the first three with «[:3]»: «top = sorted(scores, reverse=True)[:3]».`,
        ],
        solution: py`
          scores = [67, 91, 82, 45, 88, 73]
          top = sorted(scores, reverse=True)[:3]
          print("Top 3:", top)
        `,
        tests: [
          { output: "Top 3: [91, 88, 82]" },
          { uses: ["call:sorted"], msg: md`Use «sorted()» to put the scores in order.` },
          { py: py`
            import re
            assert re.search(r"sorted\(\s*scores", CODE), "Sort the «scores» list itself: «sorted(scores, reverse=True)»."
            assert re.search(r"\[\s*0?\s*:\s*3\s*\]", CODE), "Take the first three with a slice, «[:3]»."
          ` },
        ],
        wrong: ['print("Top 3: [91, 88, 82]")', 'scores = [67, 91, 82, 45, 88, 73]\nprint("Top 3:", sorted([82, 88, 91], reverse=True))', 'scores = [67, 91, 82, 45, 88, 73]\nprint("Top 3:", sorted(scores)[-3:])'],
      },
      {
        id: "zip-runs",
        title: "Players and runs",
        task: md`
          Ask for player names on one line, then their runs on a second line. Print each player with their runs, using «zip()». For «Arjun Kabir Dev» and «45 12 80»:

          | Arjun: 45
          | Kabir: 12
          | Dev: 80

          If one line has fewer items, stop at the end of the shorter one.
        `,
        starter: py`
          names = input("Players: ").split()
          runs = input("Runs: ").split()
        `,
        solution: py`
          names = input("Players: ").split()
          runs = input("Runs: ").split()
          for name, r in zip(names, runs):
              print(f"{name}: {r}")
        `,
        tests: [
          { inputs: ["Arjun Kabir Dev", "45 12 80"], output: "Arjun: 45\nKabir: 12\nDev: 80" },
          { inputs: ["Sanju", "100"], output: "Sanju: 100" },
          { inputs: ["Asha Ravi Meera", "7 0"], output: "Asha: 7\nRavi: 0" },
          { inputs: ["Asha", "5 9"], output: "Asha: 5" },
          { uses: ["call:zip"], msg: md`Pair the two lists with «zip(names, runs)».` },
        ],
        wrong: [py`
          names = input("Players: ").split()
          runs = input("Runs: ").split()
          for i in range(len(names)):
              print(f"{names[i]}: {runs[i]}")
        `, py`
          names = input("Players: ").split()
          runs = input("Runs: ").split()
          for name, r in zip(names, runs):
              print(f"{r}: {name}")
        `],
        hints: [
          md`«zip(names, runs)» gives one tuple each round: a name and its runs.`,
          md`Unpack it in the loop line: «for name, r in zip(names, runs):».`,
          md`Inside the loop: «print(f"{name}: {r}")».`,
        ],
      },
    ],
    keys: [
      md`A tuple is like a list, but it cannot change: «student = ("Asha", 82)». Use it for a few values that belong together.`,
      md`Unpacking: «name, marks = student», one name for each value. Swapping: «a, b = b, a».`,
      md`«for name, score in pairs:» unpacks one tuple each time the loop runs.`,
      md`«enumerate(my_list, start=1)» gives a number and an item each round. «zip(a, b)» pairs two lists and stops at the shorter one.`,
      md`«sorted(x, reverse=True)[:3]» gives the top three. Python sorts first, then slices.`,
    ],
  });

  // ---------------------------------------------------------------- Day 27
  day({
    slug: "list-comprehensions",
    title: "List comprehensions",
    goal: "Build a new list in a single, readable line.",
    minutes: 40,
    needs: [16, 25],
    win: "Today you can now build a new list in one line, and keep only the items you want.",
    learn: [
      md`
        ## A one-line list builder

        On Day 25 you built new lists with a loop and «.append()». Guess what this prints.
      `,
      ex(py`
        nums = [1, 2, 3]
        doubled = []
        for n in nums:
            doubled.append(n * 2)
        print(doubled)
      `, { predict: ["[2, 4, 6]", "[1, 2, 3, 1, 2, 3]", "12"], answer: 0 }),
      md`
        Python has a shorter way, called a **list comprehension**. Here "comprehension" is only a name. It does not mean understanding a passage. Think of it as a one-line list builder. Guess what it prints.
      `,
      ex(py`
        nums = [1, 2, 3]
        doubled = [n * 2 for n in nums]
        print(doubled)
      `, { predict: ["[2, 4, 6]", "[1, 2, 3, 1, 2, 3]", "12"], answer: 0 }),
      md`
        It builds the same list in one line. Read it out loud: "n times 2, for each n in nums". The part at the very front is what goes into the new list. The square brackets show that the result is a list. It works with «range()» too:
      `,
      ex(py`
        squares = [n ** 2 for n in range(1, 6)]
        print(squares)
      `),
      md`
        Here is a common mistake: forgetting the square brackets. Python stops with a SyntaxError, which means "Python cannot read this line".
      `,
      ex(py`
        nums = [1, 2, 3]
        doubled = n * 2 for n in nums
      `, { error: true, label: "A mistake: no square brackets" }),
      md`
        ## Keeping only some items

        To **filter** means to keep only the items you want. Add an «if» at the end. Read it as: "keep n, for each n in nums, if n is more than 10". Guess first.
      `,
      ex(py`
        nums = [5, 12, 7, 20, 3, 18]
        big = [n for n in nums if n > 10]
        print(big)
      `, { predict: ["[12, 20, 18]", "[5, 7, 3]", "[True, False, True]"], answer: 0 }),
      md`
        ## Methods, functions and input

        The front part can call a method or a function on each item. Guess first.
      `,
      ex(py`
        names = ["asha", "ravi", "meera"]
        print([name.title() for name in names])
        print([len(name) for name in names])
      `, { predict: ["['Asha', 'Ravi', 'Meera']\n[4, 4, 5]", "['asha', 'ravi', 'meera']\n[4, 4, 5]", "['Asha', 'Ravi', 'Meera']\n3"], answer: 0 }),
      md`
        This also turns a line of numbers into a list of numbers. And «str(n)» at the front fixes the «.join()» mistake from Day 25:
      `,
      ex(py`
        line = "4 8 15 16"
        numbers = [int(x) for x in line.split()]
        print(numbers, sum(numbers))
        print("-".join([str(n) for n in numbers]))
      `),
      tip(md`Comprehensions are good for short, simple jobs. If one gets long or confusing, use an ordinary loop. That is completely fine.`),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`print([x * 10 for x in [1, 2, 3]])`,
        options: ["[10, 20, 30]", "[1, 2, 3, 10]", "60"],
        answer: 0,
        explain: md`Each item is multiplied by 10.`,
        why: [null, md`Nothing is appended at the end. Each item is changed by «x * 10».`, md`A comprehension builds a list. It does not add the items up.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`print([x for x in range(6) if x % 2 == 0])`,
        options: ["[0, 2, 4]", "[2, 4, 6]", "[1, 3, 5]"],
        answer: 0,
        explain: md`«range(6)» is 0 to 5; only the even ones are kept.`,
        why: [null, md`«range(6)» stops before 6, and it starts at 0.`, md`These are the odd numbers. The «if» keeps the numbers where «x % 2 == 0».`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`print([w[0] for w in ["chai", "dosa"]])`,
        options: ["['c', 'd']", "['chai', 'dosa']", "cd"],
        answer: 0,
        explain: md`«w[0]» is the first letter of each word, collected into a list.`,
        why: [null, md`The front part is «w[0]», the first letter, not the whole word.`, md`The result of a comprehension is always a list, so it has brackets.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          prices = [12.4, 99.9, 5.75]
          print([round(p) for p in prices])
        `,
        options: ["[12, 100, 6]", "[12, 99, 5]", "[12.4, 99.9, 5.75]"],
        answer: 0,
        explain: md`«round(p)» gives the nearest whole number for each price.`,
        why: [null, md`That is what «int(p)» gives: it cuts off the decimal part. «round()» goes to the nearest whole number.`, md`The front part «round(p)» changes each item before it goes into the new list.`],
        skill: "trace",
      },
      {
        q: md`What does this program do?`,
        code: py`
          marks = [45, 82, 30, 67]
          passed = [m for m in marks if m >= 33]
          print(len(passed))
        `,
        options: ["It counts how many marks are 33 or more", "It prints the marks that are 33 or more", "It adds up the marks that are 33 or more"],
        answer: 0,
        explain: md`«passed» keeps the marks of 33 or more. «len()» counts them, so it prints 3.`,
        why: [null, md`The last line prints «len(passed)», a count, not the list.`, md`Nothing is added up. «len()» counts the items.`],
        verify: false,
        mono: false,
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-comprehension",
        kind: "trace",
        title: "Be the Computer: two list builders",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          nums = [3, 8, 5, 12]
          big = [n for n in nums if n > 4]
          doubled = [n * 2 for n in big]
          count = len(doubled)
          print(doubled[0], count)
        `,
        inputs: [],
        ask: [{ line: 4, name: "count" }, { output: true }],
        hints: [
          md`Line 2 keeps the numbers more than 4: 8, 5 and 12.`,
          md`Line 3 doubles each of those.`,
          md`«doubled» is «[16, 10, 24]». Its first item is at position 0.`,
        ],
      },
      {
        id: "arrange-high-marks",
        kind: "parsons",
        title: "Arrange: high marks",
        task: md`
          Put the lines in order and set each indent. The program reads marks from one line and prints the marks of 60 or more. For «45 72 60 38»:

          | [72, 60]
        `,
        solution: py`
          line = input("Marks: ")
          marks = [int(x) for x in line.split()]
          high = [m for m in marks if m >= 60]
          print(high)
        `,
        distractors: ["marks = [x for x in line.split()]"],
        indent: "choose",
        tests: [
          { inputs: ["45 72 60 38"], output: "[72, 60]" },
          { inputs: ["90"], output: "[90]" },
          { inputs: ["10 59"], output: "[]" },
        ],
        hints: [
          md`You need the line before you can split it.`,
          md`The marks must be numbers before you compare them, so use the line with «int(x)».`,
          md`No line here needs an indent.`,
        ],
      },
      {
        id: "squares",
        title: "Squares",
        task: md`
          The **square** of a number is the number times itself, so the square of 3 is 9. Use a list comprehension to make a list called «squares» holding the squares of 1 to 10, then print it:

          | [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
        `,
        starter: py`

        `,
        hints: [
          md`The shape is «[front for n in range(...)]».`,
          md`The front part is «n ** 2» (or «n * n»). «range(1, 11)» gives 1 to 10.`,
          md`«squares = [n ** 2 for n in range(1, 11)]», then «print(squares)».`,
        ],
        solution: py`
          squares = [n ** 2 for n in range(1, 11)]
          print(squares)
        `,
        tests: [
          { output: "[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]", py: py`need("squares", "list")` },
          { uses: ["listcomp"], msg: md`Build «squares» with a list comprehension: «[... for n in ...]».` },
        ],
        wrong: [py`
          squares = [n ** 2 for n in range(10)]
          print(squares)
        `, py`
          squares = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
          print(squares)
        `, py`
          squares = [n * 2 for n in range(1, 11)]
          print(squares)
        `],
      },
      {
        id: "evens-only",
        title: "Evens only",
        task: md`
          Use a list comprehension with an «if» to make a list called «evens» holding only the even numbers from «nums». Print it:

          | [8, 22, 10, 6]
        `,
        starter: py`
          nums = [3, 8, 15, 22, 7, 10, 41, 6]

        `,
        hints: [
          md`The shape is «[n for n in nums if ...]».`,
          md`A number is even when the remainder after dividing by 2 is 0.`,
          md`The condition is «n % 2 == 0».`,
        ],
        solution: py`
          nums = [3, 8, 15, 22, 7, 10, 41, 6]
          evens = [n for n in nums if n % 2 == 0]
          print(evens)
        `,
        tests: [
          { output: "[8, 22, 10, 6]", py: py`assert need("evens", "list") == [8, 22, 10, 6], "«evens» should be [8, 22, 10, 6]."` },
          { uses: ["listcomp"], msg: md`Build «evens» with a list comprehension that ends with an «if».` },
        ],
        wrong: [py`
          nums = [3, 8, 15, 22, 7, 10, 41, 6]
          evens = [n for n in nums if n % 2 == 1]
          print(evens)
        `, py`
          nums = [3, 8, 15, 22, 7, 10, 41, 6]
          evens = [n % 2 == 0 for n in nums]
          print(evens)
        `],
      },
      {
        id: "loud-words",
        title: "Loud words",
        task: md`
          Use a list comprehension to make a list called «loud» where every word is in capitals with «!» added. Print it:

          | ['PYTHON!', 'IS!', 'REALLY!', 'FUN!']
        `,
        starter: py`
          words = ["python", "is", "really", "fun"]

        `,
        hints: [
          md`The shape is «[front for word in words]».`,
          md`For each word, the new item is «word.upper() + "!"».`,
          md`«loud = [word.upper() + "!" for word in words]», then «print(loud)».`,
        ],
        solution: py`
          words = ["python", "is", "really", "fun"]
          loud = [word.upper() + "!" for word in words]
          print(loud)
        `,
        tests: [
          { output: "['PYTHON!', 'IS!', 'REALLY!', 'FUN!']", py: py`need("loud", "list")` },
          { uses: ["listcomp"], msg: md`Build «loud» with a list comprehension.` },
        ],
        wrong: [py`
          words = ["python", "is", "really", "fun"]
          loud = [word.upper() for word in words]
          print(loud)
        `],
      },
      {
        id: "round-prices",
        title: "Use a ready-made function: round(x)",
        task: md`
          «round(x)» with one number gives the nearest whole number. «round(12.4)» is «12» and «round(99.9)» is «100». (A number ending in exactly .5 goes to the nearest even number, so «round(2.5)» is «2». The prices here never end in .5.)

          Ask for prices on one line. Use one list comprehension to read them with «float()», and another to round each one. For «12.4 99.9 5.75»:

          | [12, 100, 6]
        `,
        starter: py`
          line = input("Prices: ")
        `,
        solution: py`
          line = input("Prices: ")
          prices = [float(x) for x in line.split()]
          rounded = [round(p) for p in prices]
          print(rounded)
        `,
        tests: [
          { inputs: ["12.4 99.9 5.75"], output: "[12, 100, 6]" },
          { inputs: ["0.2"], output: "[0]" },
          { inputs: ["10 20.6 7.49"], output: "[10, 21, 7]" },
          { uses: ["call:round"], msg: md`Use the ready-made function «round()» for this one.` },
          { uses: ["listcomp"], msg: md`Build the rounded list with a list comprehension.` },
        ],
        wrong: [py`
          line = input("Prices: ")
          prices = [float(x) for x in line.split()]
          rounded = [int(p) for p in prices]
          print(rounded)
        `, py`
          line = input("Prices: ")
          prices = [float(x) for x in line.split()]
          rounded = [round(p, 1) for p in prices]
          print(rounded)
        `],
        hints: [
          md`First make a list of numbers, then a second list of rounded numbers.`,
          md`«prices = [float(x) for x in line.split()]»`,
          md`«rounded = [round(p) for p in prices]», then «print(rounded)».`,
        ],
      },
    ],
    keys: [
      md`«[front for item in items]» builds a new list in one line. The front part is what goes into the list.`,
      md`Add a filter at the end: «[n for n in nums if n > 10]» keeps only the items you want.`,
      md`«[int(x) for x in line.split()]» turns a line of numbers into a list of numbers.`,
      md`«round(x)» gives the nearest whole number.`,
      md`If a comprehension gets hard to read, use an ordinary loop.`,
    ],
  });

  // ---------------------------------------------------------------- Day 28
  day({
    slug: "week-4-project",
    title: "Project day: lists",
    goal: "Use lists to build a marks analyser, a to-do list and a harder problem.",
    minutes: 45,
    needs: [23, 25, 26, 27],
    win: "Today you can now build whole programs that keep their data in lists.",
    learn: [
      md`
        ## Week 4 summary

        - Lists hold many values in order, and you can change them.
        - «.append()», «.remove()», «.pop()», «.sort()» and similar methods change a list.
        - «for item in my_list:» visits each item. «sum()», «min()» and «max()» do common jobs.
        - «.split()» turns text into a list. «.join()» turns a list into text.
        - Tuples are fixed groups. Unpacking puts their values into separate names.
        - List comprehensions build lists in one line.

        A comprehension turns a line of text into a list of numbers. Guess first.
      `,
      ex(py`
        line = "4 9 2"
        numbers = [int(x) for x in line.split()]
        print(max(numbers) - min(numbers))
      `, { predict: ["7", "2", "Error"], answer: 0 }),
      md`
        To read the numbers from the user, put «input()» where «line» was. Now one line does everything:

        : numbers = [int(x) for x in input("Numbers: ").split()]

        Read it from the inside out: «input()» gets the text, «.split()» cuts it, and «int(x)» turns each piece into a number.

        ## Choosing how to store things

        Before you write a program, ask: **what do I need to remember?** Use a list when you have many things of the same kind (marks, names, tasks). Use a tuple for a small fixed group that belongs together, such as a name and a mark. A list of tuples is a simple table. Guess first.
      `,
      ex(py`
        student = ("Asha", 82)
        name, marks = student
        print(name, marks >= 33)
      `, { predict: ["Asha True", "Asha 82", "('Asha', 82) True"], answer: 0 }),
      md`
        Here is a small example. It keeps a list of temperatures and reports on them:
      `,
      ex(py`
        temps = [31, 29, 35, 38, 33, 30, 27]
        print("Hottest:", max(temps))
        print("Coolest:", min(temps))
        print(f"Average: {sum(temps) / len(temps):.1f}")
        hot_days = [t for t in temps if t >= 35]
        print("Days at 35 or above:", len(hot_days))
      `),
      pause(md`The practice today is long. Do the marks analyser and the to-do list first. Take a break, then do the rest. "Second largest" is a harder extra: it waits under "finish later".`),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          a = [1, 2, 3]
          b = [x * x for x in a if x > 1]
          print(b)
        `,
        options: ["[4, 9]", "[1, 4, 9]", "[2, 3]"],
        answer: 0,
        explain: md`Only 2 and 3 pass the filter, and they are squared.`,
        why: [null, md`1 is not more than 1, so the filter drops it.`, md`The front part «x * x» squares each kept item.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          words = "I love chai".split()
          print(words[-1].upper())
        `,
        options: ["CHAI", "I", "C"],
        answer: 0,
        explain: md`The last word is «"chai"», shown in capitals.`,
        why: [null, md`«I» is at position 0. Position «-1» is the last word.`, md`«words[-1]» is a whole word, not one letter.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          nums = [4, 1, 3]
          nums.append(2)
          nums.sort()
          print(nums[1:3])
        `,
        options: ["[2, 3]", "[1, 2]", "[3, 4]"],
        answer: 0,
        explain: md`After sorting, «nums» is «[1, 2, 3, 4]», and positions 1 and 2 hold 2 and 3.`,
        why: [null, md`Position 0 holds 1. The slice starts at position 1.`, md`The slice stops before position 3, so 4 is not included.`],
        skill: "trace",
      },
      {
        q: md`You need to keep one student's name and marks together. They will not change. Which is the best choice?`,
        options: ['A tuple, like ("Asha", 82)', "Two separate lists", "One long piece of text"],
        answer: 0,
        explain: md`A tuple is for a small fixed group of values that belong together.`,
        why: [null, md`Lists are for many things of the same kind. One name and one mark are a small group.`, md`Text would have to be split again before you could use the mark as a number.`],
        verify: false,
        mono: false,
        skill: "choose",
      },
      {
        q: md`What does this program do?`,
        code: py`
          nums = [int(x) for x in input("Numbers: ").split()]
          print(sum(nums) / len(nums))
        `,
        options: ["It prints the average of the numbers typed on one line", "It prints how many numbers were typed", "It prints the total of the numbers typed"],
        answer: 0,
        explain: md`The total divided by the count is the average.`,
        why: [null, md`That would be «len(nums)» alone.`, md`That would be «sum(nums)» alone. Here it is divided by the count.`],
        verify: false,
        mono: false,
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-pass-total",
        kind: "trace",
        title: "Be the Computer: adding the passes",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          marks = [int(x) for x in "70 45 90".split()]
          total = 0
          for m in marks:
              if m >= 50:
                  total += m
          print(total, len(marks))
        `,
        inputs: [],
        ask: [{ line: 5, hit: 1, name: "total" }, { line: 5, hit: 2, name: "total" }, { output: true }],
        hints: [
          md`«marks» is «[70, 45, 90]».`,
          md`Line 5 runs only for marks of 50 or more, so 45 is skipped.`,
          md`The first time line 5 runs, «m» is 70. The second time, «m» is 90.`,
        ],
      },
      {
        id: "arrange-task-loop",
        kind: "parsons",
        title: "Arrange: collect tasks until done",
        task: md`
          Put the lines in order and set each indent. The program collects tasks until the user types «done», then prints how many there are. For «Buy milk», «Call Ravi», «done»:

          | 2 tasks
        `,
        solution: py`
          tasks = []
          while True:
              task = input("Task: ")
              if task == "done":
                  break
              tasks.append(task)
          print(len(tasks), "tasks")
        `,
        distractors: ["if task == done:"],
        indent: "choose",
        tests: [
          { inputs: ["Buy milk", "Call Ravi", "done"], output: "2 tasks" },
          { inputs: ["done"], output: "0 tasks" },
          { inputs: ["A", "B", "C", "done"], output: "3 tasks" },
        ],
        hints: [
          md`The empty list comes first. «while True:» repeats until «break».`,
          md`Inside the loop: ask, check for «"done"», then append. «break» goes inside the «if».`,
          md`«.append()» is inside the loop but not inside the «if». The last «print» has no indent.`,
        ],
      },
      {
        id: "marks-stats",
        title: "Marks analyser",
        task: md`
          Ask the user to type some marks on one line, separated by spaces. Print the highest, the lowest, the average (1 decimal place) and how many passed (40 or more). For «78 92 45 30 88»:

          | Highest: 92
          | Lowest: 30
          | Average: 66.6
          | Passed: 4
        `,
        starter: py`
          line = input("Marks: ")

        `,
        hints: [
          md`Make a list of numbers: «marks = [int(x) for x in line.split()]».`,
          md`«max()», «min()», and «sum(marks) / len(marks)» do most of the work. For 1 decimal place, use «{value:.1f}» inside an f-string.`,
          md`Count passes with a comprehension and «len()», or with a loop and a counter.`,
        ],
        solution: py`
          line = input("Marks: ")
          marks = [int(x) for x in line.split()]
          print("Highest:", max(marks))
          print("Lowest:", min(marks))
          print(f"Average: {sum(marks) / len(marks):.1f}")
          passed = [m for m in marks if m >= 40]
          print("Passed:", len(passed))
        `,
        tests: [
          { inputs: ["78 92 45 30 88"], output: "Highest: 92\nLowest: 30\nAverage: 66.6\nPassed: 4" },
          { inputs: ["100 39 40"], output: "Highest: 100\nLowest: 39\nAverage: 59.7\nPassed: 2" },
          { inputs: ["12"], output: "Highest: 12\nLowest: 12\nAverage: 12.0\nPassed: 0" },
        ],
        wrong: [py`
          line = input("Marks: ")
          marks = [int(x) for x in line.split()]
          print("Highest:", max(marks))
          print("Lowest:", min(marks))
          print(f"Average: {sum(marks) / len(marks):.1f}")
          passed = [m for m in marks if m > 40]
          print("Passed:", len(passed))
        `, py`
          line = input("Marks: ")
          marks = [int(x) for x in line.split()]
          print("Highest:", max(marks))
          print("Lowest:", min(marks))
          print(f"Average: {sum(marks) // len(marks):.1f}")
          passed = [m for m in marks if m >= 40]
          print("Passed:", len(passed))
        `],
      },
      {
        id: "todo",
        title: "To-do list",
        task: md`
          Keep asking for tasks until the user types «done». Then print how many tasks there are, followed by a numbered list. For «Buy milk», «Call Ravi», «done»:

          | You have 2 tasks:
          | 1. Buy milk
          | 2. Call Ravi

          For exactly one task, write «task», not «tasks»:

          | You have 1 task:
          | 1. Buy milk

          If the very first thing typed is «done», print «Nothing to do!» instead.
        `,
        starter: py`
          tasks = []

        `,
        hints: [
          md`«while True:» — ask, «break» if the answer is «done», otherwise append it.`,
          md`After the loop, use «if», «elif» and «else» on «len(tasks)»: 0, then 1, then more.`,
          md`For the numbered list: «for number, task in enumerate(tasks, start=1):».`,
        ],
        solution: py`
          tasks = []
          while True:
              task = input("Task (or done): ")
              if task == "done":
                  break
              tasks.append(task)
          if len(tasks) == 0:
              print("Nothing to do!")
          else:
              if len(tasks) == 1:
                  print("You have 1 task:")
              else:
                  print(f"You have {len(tasks)} tasks:")
              for number, task in enumerate(tasks, start=1):
                  print(f"{number}. {task}")
        `,
        tests: [
          { inputs: ["Buy milk", "Call Ravi", "done"], output: "You have 2 tasks:\n1. Buy milk\n2. Call Ravi" },
          { inputs: ["done"], output: "Nothing to do!" },
          { inputs: ["Buy milk", "done"], output: "You have 1 task:\n1. Buy milk" },
          { inputs: ["A", "B", "C", "done"], output: "You have 3 tasks:\n1. A\n2. B\n3. C" },
        ],
        wrong: [py`
          tasks = []
          while True:
              task = input("Task (or done): ")
              if task == "done":
                  break
              tasks.append(task)
          if len(tasks) == 0:
              print("Nothing to do!")
          else:
              print(f"You have {len(tasks)} tasks:")
              for number, task in enumerate(tasks, start=1):
                  print(f"{number}. {task}")
        `, py`
          tasks = []
          while True:
              task = input("Task (or done): ")
              tasks.append(task)
              if task == "done":
                  break
          if len(tasks) == 0:
              print("Nothing to do!")
          elif len(tasks) == 1:
              print("You have 1 task:")
          else:
              print(f"You have {len(tasks)} tasks:")
          for number, task in enumerate(tasks, start=1):
              print(f"{number}. {task}")
        `],
      },
      {
        id: "second-largest",
        title: "Second largest",
        optional: true,
        task: md`
          Ask for numbers on one line (there will always be at least two **different** numbers). Print the second-largest **different** number. For «4 9 2 9 7» the largest is 9, so the second largest is:

          | 7
        `,
        starter: py`
          line = input("Numbers: ")
          numbers = [int(x) for x in line.split()]

        `,
        hints: [
          md`The biggest number might appear more than once, so remove **every** copy of it, then take the biggest of what is left.`,
          md`«biggest = max(numbers)», then filter it out with a comprehension.`,
          md`«rest = [n for n in numbers if n != biggest]», then «print(max(rest))».`,
        ],
        solution: py`
          line = input("Numbers: ")
          numbers = [int(x) for x in line.split()]
          biggest = max(numbers)
          rest = [n for n in numbers if n != biggest]
          print(max(rest))
        `,
        tests: [
          { inputs: ["4 9 2 9 7"], output: "7" },
          { inputs: ["1 2"], output: "1" },
          { inputs: ["5 5 3"], output: "3" },
          { inputs: ["-1 -8 -3"], output: "-3" },
        ],
        wrong: [py`
          line = input("Numbers: ")
          numbers = [int(x) for x in line.split()]
          numbers.sort()
          print(numbers[-2])
        `, py`
          line = input("Numbers: ")
          numbers = [int(x) for x in line.split()]
          numbers.remove(max(numbers))
          print(max(numbers))
        `],
      },
      {
        id: "bug-sort-none",
        kind: "bug",
        title: "Bug Clinic: the list became None",
        task: md`
          This program should print the lowest mark. It crashes with a TypeError instead. Tap the faulty line, then fix it. For «70 45 90»:

          | Lowest: 45
        `,
        starter: py`
          line = input("Marks: ")
          marks = [int(x) for x in line.split()]
          marks = marks.sort()
          print("Lowest:", marks[0])
        `,
        bugLines: [3],
        solution: py`
          line = input("Marks: ")
          marks = [int(x) for x in line.split()]
          marks.sort()
          print("Lowest:", marks[0])
        `,
        tests: [
          { inputs: ["70 45 90"], output: "Lowest: 45" },
          { inputs: ["5"], output: "Lowest: 5" },
          { inputs: ["30 30 10"], output: "Lowest: 10" },
          { inputs: ["-2 8"], output: "Lowest: -2" },
        ],
        wrong: [py`
          line = input("Marks: ")
          marks = [int(x) for x in line.split()]
          print("Lowest:", marks[0])
        `, py`
          line = input("Marks: ")
          marks = [int(x) for x in line.split()]
          marks.sort(reverse=True)
          print("Lowest:", marks[0])
        `],
        hints: [
          md`Use Step through. Watch what «marks» holds after line 3.`,
          md`«.sort()» sorts the list itself and gives back «None». Line 3 stores that «None» in «marks».`,
          md`Write «marks.sort()» on its own, with no «marks =» in front.`,
        ],
      },
      {
        id: "bug-top-two",
        kind: "bug",
        title: "Bug Clinic: the top two are wrong",
        task: md`
          This program should print the two highest scores, biggest first. For «67 91 82» it prints «[82, 67]», but it should print:

          | Top two: [91, 82]

          Tap the faulty line, then fix it.
        `,
        starter: py`
          line = input("Scores: ")
          scores = [int(x) for x in line.split()]
          ordered = sorted(scores, reverse=True)
          top = ordered[1:3]
          print("Top two:", top)
        `,
        bugLines: [4],
        solution: py`
          line = input("Scores: ")
          scores = [int(x) for x in line.split()]
          ordered = sorted(scores, reverse=True)
          top = ordered[:2]
          print("Top two:", top)
        `,
        tests: [
          { inputs: ["67 91 82"], output: "Top two: [91, 82]" },
          { inputs: ["5 9"], output: "Top two: [9, 5]" },
          { inputs: ["10 10 3"], output: "Top two: [10, 10]" },
          { inputs: ["8"], output: "Top two: [8]" },
        ],
        wrong: [py`
          line = input("Scores: ")
          scores = [int(x) for x in line.split()]
          ordered = sorted(scores, reverse=True)
          top = ordered[:3]
          print("Top two:", top)
        `, py`
          line = input("Scores: ")
          scores = [int(x) for x in line.split()]
          ordered = sorted(scores)
          top = ordered[:2]
          print("Top two:", top)
        `],
        hints: [
          md`This is an off-by-one bug: a number is one place away from the right one. Which position holds the biggest score?`,
          md`Positions start at 0. «[1:3]» skips position 0, the biggest score.`,
          md`Start the slice at the beginning: «ordered[:2]».`,
        ],
      },
    ],
    keys: [
      md`Ask "what do I need to remember?" before you write a program. Use a list when you have many things of the same kind, and a tuple for a small fixed group.`,
      md`«[int(x) for x in input().split()]» reads a whole line of numbers. Read it from the inside out.`,
      md`To ignore every copy of a value, filter it out: «[n for n in nums if n != x]».`,
      md`Never write «nums = nums.sort()». Write «nums.sort()» on its own line.`,
    ],
  });
})();
