// Week 5 — Dictionaries & functions.
(function () {
  const { day, md, py, ex, tip, warn, ask, pause } = window.Course;

  // ---------------------------------------------------------------- Day 29
  day({
    slug: "dictionaries",
    title: "Dictionaries",
    goal: "Store values under names (keys) and look them up quickly.",
    minutes: 45,
    needs: [22],
    win: "Today you can now store values under names in a dictionary, and look them up safely.",
    learn: [
      md`
        ## Looking things up by name

        A list finds an item by its **position**. A **dictionary** finds a value by a **key**. A key is the name you look up, like a word in a word book or a name in a phone book.

        Guess what this prints, then press Run.
      `,
      ex(py`
        marks = {"Asha": 82, "Ravi": 67}
        print(marks["Ravi"])
      `, { predict: ["67", "82", "Ravi"], answer: 0 }),
      md`
        A dictionary is written with **curly brackets** «{ }». Inside are «key: value» pairs, with commas between them. Here «"Ravi"» is a key, and 67 is its value.

        To look up a value, put the key in square brackets: «marks["Ravi"]».

        Use = with a key to store a value. If the key is new, Python adds it. If the key is already there, Python changes its value.
      `,
      ex(py`
        prices = {"tea": 15, "coffee": 25}
        prices["samosa"] = 12
        prices["tea"] = 18
        print(prices)
      `, {
        predict: [
          "{'tea': 18, 'coffee': 25, 'samosa': 12}",
          "{'tea': 15, 'coffee': 25, 'samosa': 12, 'tea': 18}",
          "{'tea': 15, 'coffee': 25, 'samosa': 12}",
        ],
        answer: 0,
      }),
      md`
        A dictionary cannot have the same key two times. The new value for «"tea"» replaces the old one. Two different keys can have the same value.

        Python shows the text in a dictionary with single quotes. It is the same text, so you do not need to change your code.
      `,
      ask({
        q: md`What does the line «prices["tea"] = 18» do here?`,
        options: ["It changes the price of tea to 18", "It adds a second tea", "It stops with an error"],
        answer: 0,
        explain: md`«"tea"» is already a key, so its value changes from 15 to 18.`,
        why: [null, md`A key can be in a dictionary only once. The old value is replaced.`, md`Storing a value under a key never gives an error.`],
      }),
      md`
        ## Safe ways to look up

        Looking up a key that is not there stops the program with a **KeyError**:
      `,
      ex(py`
        prices = {"tea": 15}
        print(prices["juice"])
      `, { error: true }),
      md`
        There are two safe ways. You can check first with «in». «in» looks only at the keys, not the values.

        Or you can use «.get()». If the key is missing, «.get()» gives back «None» and the program keeps running.
      `,
      ex(py`
        prices = {"tea": 15, "coffee": 25}
        print("juice" in prices)
        print(15 in prices)
        print(prices.get("juice"))
      `, { predict: ["False\nFalse\nNone", "False\nTrue\nNone", "False\nTrue\n0"], answer: 0 }),
      md`
        «15 in prices» is False, because 15 is a value, not a key.

        You can also give «.get()» a **default**. A default is the value Python uses when you do not give one. Here, «.get("juice", 0)» gives 0 because there is no juice.
      `,
      ex(py`
        prices = {"tea": 15, "coffee": 25}
        print(prices.get("juice", 0))
        print(prices.get("tea", 0))
      `),
      pause(md`Good place for a break. The second part is about removing pairs, and lists inside a dictionary.`),
      md`
        ## Removing, counting, and lists inside

        «del» removes a key and its value. «del» is a Python word, not a function, so it has no round brackets. The list method «.remove()» does not work on a dictionary.
      `,
      ex(py`
        prices = {"tea": 15, "coffee": 25, "samosa": 12}
        del prices["coffee"]
        print(prices)
        print(len(prices))
      `),
      md`
        «len()» counts the pairs. Two pairs are left.

        A value can also be a list. Read «student["subjects"][0]» from left to right. «student["subjects"]» gives the list. Then «[0]» gives the first item of that list.
      `,
      ex(py`
        student = {"name": "Meera", "age": 16, "subjects": ["Maths", "Physics"]}
        print(student["name"])
        print(student["subjects"][0])
      `),
      ask({
        q: md`In the example above, what does «student["subjects"][1]» give?`,
        options: ["Physics", "Maths", "age"],
        answer: 0,
        explain: md`«student["subjects"]» gives the list «["Maths", "Physics"]». Position 1 of that list is «"Physics"».`,
        why: [null, md`«"Maths"» is at position 0. Positions start at 0.`, md`The first brackets pick the key «"subjects"». The second brackets look inside that list, not at the other keys.`],
      }),
      tip(md`Press **Step through** on any example to see the dictionary drawn as key → value pairs.`),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          d = {"a": 1, "b": 2}
          print(d["b"])
        `,
        options: ["1", "2", "b"],
        answer: 1,
        explain: md`The value stored under the key «"b"» is 2.`,
        why: [md`1 is the value of «"a"». Look at the key in the square brackets.`, null, md`«d["b"]» gives the value stored under «"b"», not the key itself.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          d = {"x": 5}
          d["x"] = 9
          print(d)
        `,
        options: ["{'x': 9}", "{'x': 5, 'x': 9}", "{'x': 5}"],
        answer: 0,
        explain: md`A key can be there only once. Storing a new value under «"x"» replaces the old value.`,
        why: [null, md`A dictionary never holds the same key twice. The new value replaces the old one.`, md`Line 2 changes the value, so 5 is gone.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          d = {"x": 5}
          print(d.get("y", 0))
        `,
        options: ["0", "None", "5"],
        answer: 0,
        explain: md`«"y"» is not a key, so «.get()» gives back the default you gave: 0.`,
        why: [null, md`«.get()» gives «None» only when you give no default. Here the default is 0.`, md`5 is stored under «"x"», not «"y"».`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          d = {"a": 1, "b": 2}
          print(len(d))
        `,
        options: ["2", "4", "1"],
        answer: 0,
        explain: md`«len()» counts the key: value pairs. There are 2 pairs.`,
        why: [null, md`«len()» counts pairs, not keys and values separately.`, md`Count the pairs between the curly brackets.`],
        skill: "trace",
      },
      {
        q: md`What does this program do?`,
        code: py`
          stock = {"tea": 40, "sugar": 10}
          item = input("Item: ")
          print(stock.get(item, 0))
        `,
        options: [
          "It shows how much of the typed item is in stock, or 0 if the item is not there",
          "It adds the typed item to the stock",
          "It shows 0 for every item",
        ],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`«stock.get(item, 0)» looks up the typed item. When the item is not a key, it gives the default, 0.`,
        why: [null, md`Nothing is stored. «.get()» only looks up.`, md`For «tea» it shows 40. Only a missing item gives 0.`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-marks",
        kind: "trace",
        title: "Be the Computer: marks in a dictionary",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          marks = {"Asha": 70}
          marks["Ravi"] = 64
          marks["Asha"] = 75
          total = marks["Asha"] + marks["Ravi"]
          print(len(marks), total)
        `,
        inputs: [],
        ask: [{ line: 4, name: "total" }, { output: true }],
        hints: [
          md`Write the dictionary on paper. Change it after each line.`,
          md`Line 3 changes Asha's mark. It does not add a new pair.`,
          md`On line 4, Asha has 75 and Ravi has 64.`,
        ],
      },
      {
        id: "arrange-menu",
        kind: "parsons",
        title: "Arrange: is it on the menu?",
        task: md`
          Put the lines in order and set each indent. The program asks for an item. It prints the price, or «Not on the menu». For «tea»:

          | 15
        `,
        solution: py`
          prices = {"tea": 15, "coffee": 25}
          item = input("Item: ")
          if item in prices:
              print(prices[item])
          else:
              print("Not on the menu")
        `,
        distractors: ['print(prices["item"])'],
        indent: "choose",
        tests: [
          { inputs: ["tea"], output: "15" },
          { inputs: ["coffee"], output: "25" },
          { inputs: ["juice"], output: "Not on the menu" },
        ],
        hints: [
          md`Make the dictionary first, then ask for the item.`,
          md`The «if» checks «item in prices». Each «print» goes one indent inside.`,
          md`«prices[item]» has no quotes, because «item» is a variable.`,
        ],
      },
      {
        id: "capitals",
        title: "Capital cities",
        task: md`
          Ask for a country. If it is in the dictionary, print its capital. Otherwise print «I don't know that one». Use «in» to check first. For «India»:

          | The capital of India is New Delhi

          For «Mars»:

          | I don't know that one
        `,
        starter: py`
          capitals = {"India": "New Delhi", "Japan": "Tokyo", "France": "Paris", "Kenya": "Nairobi"}

        `,
        hints: [
          md`Ask for the country with «input()» and keep it in «country». Then check it with «in».`,
          md`«if country in capitals:»`,
          md`«print(f"The capital of {country} is {capitals[country]}")»`,
        ],
        solution: py`
          capitals = {"India": "New Delhi", "Japan": "Tokyo", "France": "Paris", "Kenya": "Nairobi"}
          country = input("Country: ")
          if country in capitals:
              print(f"The capital of {country} is {capitals[country]}")
          else:
              print("I don't know that one")
        `,
        tests: [
          { inputs: ["India"], output: "The capital of India is New Delhi" },
          { inputs: ["Kenya"], output: "The capital of Kenya is Nairobi" },
          { inputs: ["Mars"], output: "I don't know that one" },
        ],
        wrong: [py`
          capitals = {"India": "New Delhi", "Japan": "Tokyo", "France": "Paris", "Kenya": "Nairobi"}
          country = input("Country: ")
          print(f"The capital of {country} is {capitals[country]}")
        `],
      },
      {
        id: "price-list",
        title: "Update the menu",
        task: md`
          Make three changes to the menu dictionary, one line each:

          1. Add «"vada pav"» at 20.
          2. Change the price of «"tea"» to 18.
          3. Remove «"samosa"».

          Then print the menu:

          | {'tea': 18, 'coffee': 25, 'vada pav': 20}
        `,
        starter: py`
          menu = {"tea": 15, "coffee": 25, "samosa": 12}

        `,
        hints: [
          md`Each change is one line that starts with «menu» or «del».`,
          md`Adding and changing look the same: «menu["vada pav"] = 20».`,
          md`Removing: «del menu["samosa"]».`,
        ],
        solution: py`
          menu = {"tea": 15, "coffee": 25, "samosa": 12}
          menu["vada pav"] = 20
          menu["tea"] = 18
          del menu["samosa"]
          print(menu)
        `,
        tests: [
          {
            output: "{'tea': 18, 'coffee': 25, 'vada pav': 20}",
            py: py`assert menu == {"tea": 18, "coffee": 25, "vada pav": 20}, "«menu» should end up with tea at 18, coffee at 25 and vada pav at 20."`,
          },
          { uses: ["index_assign"] },
        ],
        wrong: [
          'menu = {"tea": 18, "coffee": 25, "vada pav": 20}\nprint(menu)',
          py`
            menu = {"tea": 15, "coffee": 25, "samosa": 12}
            menu["vada pav"] = 20
            menu["tea"] = 18
            print(menu)
          `,
        ],
      },
      {
        id: "student-card",
        title: "Student card",
        task: md`
          Make a dictionary called «student» with the keys «"name"», «"age"» and «"city"». Use your own values. The age is a whole number, with no quotes.

          Then print one sentence. Look up each value with square brackets, like «student['name']». For Meera, 16, Pune it shows:

          | Meera is 16 and lives in Pune.
        `,
        starter: py`

        `,
        hints: [
          md`First make the dictionary. Then print one f-string.`,
          md`«student = {"name": "Meera", "age": 16, "city": "Pune"}»`,
          md`The f-string uses double quotes, so use single quotes for the key inside it: «{student['name']}».`,
        ],
        solution: py`
          student = {"name": "Meera", "age": 16, "city": "Pune"}
          print(f"{student['name']} is {student['age']} and lives in {student['city']}.")
        `,
        tests: [
          {
            py: py`
              need("student", "dict")
              for key in ("name", "age", "city"):
                  assert key in student, f"«student» needs a key called «{key}»."
              assert isinstance(student["age"], int), "The age should be a whole number, without quotes."
              expected = f"{student['name']} is {student['age']} and lives in {student['city']}."
              assert LINES == [expected], f"Your program should print exactly: «{expected}»"
              import re
              assert re.search(r"student\[\s*['\"]name['\"]\s*\]", CODE), "Look the name up from the dictionary with «student['name']»."
            `,
          },
        ],
        wrong: [py`
          student = {"name": "Meera", "age": 16, "city": "Pune"}
          print("Meera is 16 and lives in Pune.")
        `],
      },
    ],
    keys: [
      md`A dictionary stores «key: value» pairs: «prices = {"tea": 15}».`,
      md`Look up with «prices["tea"]». Add or change with «prices["tea"] = 18».`,
      md`A missing key gives a «KeyError». Check with «"tea" in prices», or use «prices.get("tea", 0)».`,
      md`«in» looks only at the keys, not the values.`,
      md`«del prices["tea"]» removes a pair. «len(prices)» counts the pairs.`,
    ],
  });

  // ---------------------------------------------------------------- Day 30
  day({
    slug: "dict-loops",
    title: "Looping and counting with dictionaries",
    goal: "Go through a dictionary, and use one to count things.",
    minutes: 45,
    needs: [17, 26, 29],
    win: "Today you can now loop through a dictionary, count things with it, and find the winner.",
    learn: [
      md`
        ## Looping over a dictionary

        A «for» loop over a dictionary gives you its keys, one at a time. Guess first, then press Run.
      `,
      ex(py`
        prices = {"tea": 15, "coffee": 25, "samosa": 12}
        for item in prices:
            print(item)
      `, { predict: ["tea\ncoffee\nsamosa", "15\n25\n12", "tea 15\ncoffee 25\nsamosa 12"], answer: 0 }),
      md`
        «.items()» gives each key and its value together, as a pair (a tuple). «for item, price in prices.items():» unpacks each pair, as you did on Day 26. The first name gets the key, and the second name gets the value.
      `,
      ex(py`
        prices = {"tea": 15, "coffee": 25, "samosa": 12}
        for item, price in prices.items():
            print(f"{item}: ₹{price}")
      `),
      md`
        «.keys()» gives just the keys. «.values()» gives just the values. Run this and look at the first line.
      `,
      ex(py`
        prices = {"tea": 15, "coffee": 25, "samosa": 12}
        print(prices.keys())
        print(list(prices.keys()))
        print(list(prices.values()))
        print("Total:", sum(prices.values()))
      `),
      md`
        «prices.keys()» is not a normal list, so Python prints «dict_keys» around it. «list(...)» turns it into a normal list, so it prints neatly. «sum()» does not need «list()», because it can add the values directly.
      `,
      pause(md`Good place for a break. The second part is about counting, and finding the winner.`),
      md`
        ## The counting pattern

        «{}» with nothing inside makes an empty dictionary. It has no keys yet. A dictionary is good for counting: each key is a thing you have seen, and its value is how many times.
      `,
      ex(py`
        word = "banana"
        counts = {}
        for letter in word:
            if letter in counts:
                counts[letter] += 1
            else:
                counts[letter] = 1
        print(counts)
      `, { predict: ["{'b': 1, 'a': 3, 'n': 2}", "{'b': 1, 'a': 1, 'n': 1}", "{'banana': 1}"], answer: 0 }),
      md`
        Step through it and watch the dictionary grow. The first time Python sees a letter, it stores 1. After that, it adds 1 to the old count.

        There is a shorter way with «.get()». The first time we see a drink, «vote_count.get(v, 0)» gives 0, so we store 0 + 1. Next time it gives the old count, so we store the old count + 1.
      `,
      ex(py`
        votes = ["tea", "coffee", "tea", "juice", "tea", "coffee"]
        vote_count = {}
        for v in votes:
            vote_count[v] = vote_count.get(v, 0) + 1
        print(vote_count)
      `),
      md`
        ## Finding the winner

        «winner» holds the best drink so far. It starts as «None», which means no drink yet. «vote_count[winner]» is the count of that best drink. If this drink has a bigger count, it becomes the new winner.
      `,
      ex(py`
        vote_count = {"tea": 3, "coffee": 2, "juice": 1}
        winner = None
        for drink, count in vote_count.items():
            if winner is None or count > vote_count[winner]:
                winner = drink
        print("Winner:", winner)
      `),
      md`
        Python checks the left side of «or» first. If the left side is True, Python does not check the right side at all. In the first round «winner is None» is True, so Python skips «vote_count[winner]». That is good, because «vote_count[None]» would be a KeyError.
      `,
      tip(md`Dictionaries remember the order in which keys were added, so loops go through them in that order.`),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          d = {"a": 1, "b": 2}
          for k in d:
              print(k)
        `,
        options: ["a\nb", "1\n2", "a 1\nb 2"],
        answer: 0,
        explain: md`A loop over a dictionary gives the keys.`,
        why: [null, md`Those are the values. A plain loop over a dictionary gives the keys. Use «.values()» for the values.`, md`To get both, you need «.items()» and two names in the «for» line.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          d = {"a": 1, "b": 2}
          print(sum(d.values()))
        `,
        options: ["3", "ab", "2"],
        answer: 0,
        explain: md`«.values()» gives 1 and 2, which add up to 3.`,
        why: [null, md`«.values()» gives the values, not the keys.`, md`2 is the number of pairs. «sum()» adds the values.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          c = {}
          for ch in "aab":
              c[ch] = c.get(ch, 0) + 1
          print(c)
        `,
        options: ["{'a': 2, 'b': 1}", "{'a': 1, 'b': 1}", "{'aab': 1}"],
        answer: 0,
        explain: md`«a» is counted twice and «b» once.`,
        why: [null, md`The second time «a» comes, «.get()» gives 1, so the count becomes 2.`, md`A loop over text gives one letter at a time.`],
        skill: "trace",
      },
      {
        q: md`What happens?`,
        code: py`
          counts = {}
          counts["tea"] += 1
          print(counts)
        `,
        options: ["KeyError", "{'tea': 1}", "{'tea': 0}"],
        answer: 0,
        error: true,
        verify: true,
        mono: true,
        explain: md`«+= 1» must first read the old value. «"tea"» is not a key yet, so Python stops with a KeyError. Use «counts.get("tea", 0) + 1», or check with «in» first.`,
        why: [null, md`Python does not start a missing key at 0. It stops with an error.`, md`There is no old value to read, so Python stops.`],
        skill: "debug",
      },
      {
        q: md`What does this program do?`,
        code: py`
          marks = {"Asha": 82, "Ravi": 30, "Meera": 45}
          for name, m in marks.items():
              if m < 33:
                  print(name)
        `,
        options: [
          "It shows the names of students who scored below 33",
          "It shows every student's marks",
          "It counts how many students scored below 33",
        ],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`The loop looks at each name and mark. It prints a name only when the mark is below 33.`,
        why: [null, md`The «print» is inside the «if», so only some names are shown.`, md`There is no counter here. It prints names.`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-winner",
        kind: "trace",
        title: "Be the Computer: who won?",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          vote_count = {"tea": 2, "coffee": 5, "juice": 3}
          winner = None
          for drink, count in vote_count.items():
              if winner is None or count > vote_count[winner]:
                  winner = drink
          print(winner)
        `,
        inputs: [],
        ask: [{ line: 5, name: "winner" }, { line: 5, hit: 2, name: "winner" }, { output: true }],
        hints: [
          md`Write «winner» on paper. It starts as «None».`,
          md`Line 5 runs only when the «if» is True. In round 1, «winner is None» is True.`,
          md`Juice has 3 votes. Is 3 bigger than the winner's count at that time?`,
        ],
      },
      {
        id: "arrange-count",
        kind: "parsons",
        title: "Arrange: count the orders",
        task: md`
          Put the lines in order and set each indent. The program counts each order with «.get()» and prints:

          | {'tea': 2, 'chai': 1}
        `,
        solution: py`
          orders = ["tea", "chai", "tea"]
          counts = {}
          for w in orders:
              counts[w] = counts.get(w, 0) + 1
          print(counts)
        `,
        distractors: ["counts[w] = 1"],
        indent: "choose",
        tests: [{ output: "{'tea': 2, 'chai': 1}" }],
        hints: [
          md`The list and the empty dictionary come before the loop.`,
          md`Only the counting line is inside the loop.`,
          md`«print(counts)» has no indent, so it runs once, after the loop.`,
        ],
      },
      {
        id: "print-menu",
        title: "Print the menu",
        task: md`
          Use «.items()» to print every item and its price. You can copy ₹ from this task. It shows:

          | tea: ₹15
          | coffee: ₹25
          | samosa: ₹12
          | vada pav: ₹20
        `,
        starter: py`
          menu = {"tea": 15, "coffee": 25, "samosa": 12, "vada pav": 20}

        `,
        hints: [
          md`One «for» loop with two names: one for the item, one for the price.`,
          md`«for item, price in menu.items():»`,
          md`«print(f"{item}: ₹{price}")»`,
        ],
        solution: py`
          menu = {"tea": 15, "coffee": 25, "samosa": 12, "vada pav": 20}
          for item, price in menu.items():
              print(f"{item}: ₹{price}")
        `,
        tests: [
          { output: "tea: ₹15\ncoffee: ₹25\nsamosa: ₹12\nvada pav: ₹20" },
          { uses: ["method:items"] },
        ],
        wrong: [py`
          menu = {"tea": 15, "coffee": 25, "samosa": 12, "vada pav": 20}
          for item in menu:
              print(f"{item}: ₹{menu}")
        `],
      },
      {
        id: "letter-count",
        title: "Letter counter",
        task: md`
          Ask for a word. Print a dictionary that shows how many times each letter appears. For «banana»:

          | {'b': 1, 'a': 3, 'n': 2}
        `,
        starter: py`
          word = input("Word: ")
          counts = {}

        `,
        hints: [
          md`Use the counting pattern from today: a loop, and one counting line inside it.`,
          md`Loop over the word's letters: «for letter in word:».`,
          md`«counts[letter] = counts.get(letter, 0) + 1»`,
        ],
        solution: py`
          word = input("Word: ")
          counts = {}
          for letter in word:
              counts[letter] = counts.get(letter, 0) + 1
          print(counts)
        `,
        tests: [
          { inputs: ["banana"], output: "{'b': 1, 'a': 3, 'n': 2}" },
          { inputs: ["hello"], output: "{'h': 1, 'e': 1, 'l': 2, 'o': 1}" },
          { inputs: ["a"], output: "{'a': 1}" },
        ],
        wrong: [py`
          word = input("Word: ")
          counts = {}
          for letter in word:
              counts[letter] = 1
          print(counts)
        `],
      },
      {
        id: "word-frequency",
        title: "Word frequency",
        task: md`
          Ask for a sentence. Count how often each word appears, ignoring capital letters. Print every word in small letters with its count, in the order the words first appear. For «the cat and the hat»:

          | the: 2
          | cat: 1
          | and: 1
          | hat: 1

          For «Tea tea TEA coffee»:

          | tea: 3
          | coffee: 1
        `,
        starter: py`

        `,
        hints: [
          md`Two loops: one counts, and one prints.`,
          md`Use «sentence.lower().split()» to get the words in small letters.`,
          md`Count with «counts[word] = counts.get(word, 0) + 1», then loop over «counts.items()» to print.`,
        ],
        solution: py`
          sentence = input("Sentence: ")
          counts = {}
          for word in sentence.lower().split():
              counts[word] = counts.get(word, 0) + 1
          for word, count in counts.items():
              print(f"{word}: {count}")
        `,
        tests: [
          { inputs: ["the cat and the hat"], output: "the: 2\ncat: 1\nand: 1\nhat: 1" },
          { inputs: ["Tea tea TEA coffee"], output: "tea: 3\ncoffee: 1" },
          { inputs: ["one"], output: "one: 1" },
        ],
        wrong: [py`
          sentence = input("Sentence: ")
          counts = {}
          for word in sentence.split():
              counts[word] = counts.get(word, 0) + 1
          for word, count in counts.items():
              print(f"{word}: {count}")
        `],
      },
    ],
    keys: [
      md`«for key in d:» loops over the keys. «for key, value in d.items():» gives both.`,
      md`«d.keys()» and «d.values()» give just the keys or just the values. «list(...)» makes them a normal list.`,
      md`«{}» is an empty dictionary. Counting pattern: «counts[x] = counts.get(x, 0) + 1».`,
      md`«or» checks the left side first. If it is True, the right side is skipped.`,
      md`Dictionaries keep keys in the order they were added.`,
    ],
  });

  // ---------------------------------------------------------------- Day 31
  day({
    slug: "functions",
    title: "Functions: making your own commands",
    goal: "Use def to put your code into a function with a name, so you can use it many times.",
    minutes: 40,
    needs: [4, 9],
    win: "Today you can now make your own commands with def, and give them information.",
    learn: [
      md`
        ## Your own commands

        You have used many functions, like «print()», «len()» and «input()». A **function** is a set of lines with a name. It does one job. Now you will make your own with «def». Guess first:
      `,
      ex(py`
        def greet():
            print("Hello!")
            print("Welcome to Python.")

        greet()
        greet()
      `, {
        predict: [
          "Hello!\nWelcome to Python.\nHello!\nWelcome to Python.",
          "Hello!\nWelcome to Python.",
          "Hello!\nHello!\nWelcome to Python.\nWelcome to Python.",
        ],
        answer: 0,
      }),
      md`
        - «def» (short for "define") starts a function. Then come its name, round brackets and a colon.
        - The indented lines are the function's **body**.
        - **Defining a function does not run it.** It runs only when you **call** it: its name, then brackets, like «greet()».

        Press **Step through**. Python skips the body at first. Then it jumps into the body at each call, and comes back.
      `,
      md`
        ## Parameters: giving a function information

        A **parameter** is a name inside the brackets of «def». It gets its value when the function is called. The value you give in the call, like «"Asha"», is the **argument**.
      `,
      ex(py`
        def greet(name):
            print(f"Hello, {name}!")

        greet("Asha")
        greet("Ravi")
      `),
      md`
        With several parameters, put commas between them. Python matches the arguments in order: the first argument goes to the first parameter. Guess what the second call prints:
      `,
      ex(py`
        def introduce(name, city):
            print(f"{name} lives in {city}.")

        introduce("Asha", "Pune")
        introduce("Delhi", "Ravi")
      `, {
        predict: [
          "Asha lives in Pune.\nDelhi lives in Ravi.",
          "Asha lives in Pune.\nRavi lives in Delhi.",
          "Asha lives in Pune.",
        ],
        answer: 0,
      }),
      md`
        Python does not know which word is a name. It only uses the order.

        Why use functions? You do not write the same code again and again. Each function gives a name to one piece of work. If there is a mistake, you fix it in one place.
      `,
      ex(py`
        def line():
            print("-" * 20)

        line()
        print("MENU")
        line()
        print("1. Tea")
        print("2. Coffee")
        line()
      `),
      md`
        ## Common mistakes

        Python reads from top to bottom. A function must be defined before the call runs:
      `,
      ex(py`
        hello()

        def hello():
            print("hi")
      `, { error: true }),
      md`
        Move the «def» lines above the call, and it works.

        If you forget the round brackets, Python does not call the function. Nothing happens, and there is no error:
      `,
      ex(py`
        def line():
            print("-" * 10)

        line
        print("Done")
      `),
      md`If you give the wrong number of arguments, Python stops with a **TypeError**:`,
      ex(py`
        def greet(name):
            print(f"Hello, {name}!")

        greet()
      `, { error: true }),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          def hi():
              print("hi")

          print("start")
        `,
        options: ["start", "hi\nstart", "start\nhi"],
        answer: 0,
        explain: md`The function is defined but never called, so its body never runs.`,
        why: [null, md`The body runs only when «hi()» is called. This program never calls it.`, md`There is no call to «hi()» after «print("start")» either.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          def hi():
              print("hi")

          hi()
          hi()
        `,
        options: ["hi\nhi", "hi", "nothing"],
        answer: 0,
        explain: md`It is called twice, so it runs twice.`,
        why: [null, md`Count the calls. «hi()» appears two times.`, md`The function is called, so its body runs.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          def show(x):
              print(x * 2)

          show(5)
        `,
        options: ["10", "55", "x * 2"],
        answer: 0,
        explain: md`«x» gets the value 5, and 5 × 2 is 10.`,
        why: [null, md`5 is a number, not text, so «* 2» multiplies it.`, md`Python works out «x * 2». It does not print the words.`],
        skill: "trace",
      },
      {
        q: md`In «def greet(name):», what is «name» called?`,
        options: ["A parameter", "An argument", "A function name"],
        answer: 0,
        explain: md`It is a parameter. The value given when calling, like «"Asha"», is the argument.`,
        why: [null, md`The argument is the value in the call, like «greet("Asha")».`, md`The function name is «greet».`],
        skill: "memory",
      },
      {
        q: md`What does this program do?`,
        code: py`
          def bill(cups):
              print("Pay", cups * 12, "rupees")

          bill(3)
          bill(5)
        `,
        options: [
          "It shows the price of 3 cups, then 5 cups, at 12 rupees a cup",
          "It shows 3 bills",
          "It asks how many cups to buy",
        ],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`«bill» works out «cups * 12». It is called with 3 and then 5.`,
        why: [null, md`There are two calls, so it shows two prices.`, md`There is no «input()» here. The numbers are in the calls.`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-double",
        kind: "trace",
        title: "Be the Computer: a function called twice",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          def double(n):
              print(n * 2)
          double(4)
          double(10)
        `,
        inputs: [],
        ask: [{ line: 2, name: "n" }, { line: 2, hit: 2, name: "n" }, { output: true }],
        hints: [
          md`The body runs once for each call.`,
          md`At the first call, «n» gets 4. At the second call, «n» gets 10.`,
          md`Line 2 prints «n * 2» each time.`,
        ],
      },
      {
        id: "arrange-chai-bill",
        kind: "parsons",
        title: "Arrange: a chai bill function",
        task: md`
          Put the lines in order and set each indent. A chai costs 15 rupees. The program prints:

          | Bill: 30
          | Bill: 60
        `,
        solution: py`
          def chai_bill(cups):
              print("Bill:", cups * 15)
          chai_bill(2)
          chai_bill(4)
        `,
        distractors: ["def chai_bill():"],
        indent: "choose",
        tests: [{ output: "Bill: 30\nBill: 60" }],
        hints: [
          md`The «def» line comes first. The calls come after it.`,
          md`The «print» line is the body, so it has one indent.`,
          md`The function needs a parameter, «cups», to get the number.`,
        ],
      },
      {
        id: "say-hello",
        title: "Your first function",
        task: md`
          Define a function «greet(name)» that prints «Hello, <name>!». Here «<name>» means the name given in the call. Then call it twice, for «Asha» and «Ravi»:

          | Hello, Asha!
          | Hello, Ravi!
        `,
        starter: py`
          def greet(name):

        `,
        hints: [
          md`First write the body. Then write two calls under it.`,
          md`The body (indented): «print(f"Hello, {name}!")».`,
          md`Then, not indented: «greet("Asha")» and «greet("Ravi")».`,
        ],
        solution: py`
          def greet(name):
              print(f"Hello, {name}!")

          greet("Asha")
          greet("Ravi")
        `,
        tests: [
          { output: "Hello, Asha!\nHello, Ravi!" },
          { py: py`assert printed("greet", "Zoya") == "Hello, Zoya!", "«greet(\"Zoya\")» should print «Hello, Zoya!»."` },
          { py: py`assert printed("greet", "Mohammed Irfan") == "Hello, Mohammed Irfan!", "«greet(\"Mohammed Irfan\")» should print «Hello, Mohammed Irfan!». Use the parameter «name» inside the f-string."` },
        ],
        wrong: [
          'print("Hello, Asha!")\nprint("Hello, Ravi!")',
          py`
            def greet(name):
                print("Hello, {name}!")

            greet("Asha")
            greet("Ravi")
          `,
        ],
      },
      {
        id: "draw-line",
        title: "Draw a line",
        task: md`
          Define a function «line(n)» that prints a line of «n» dashes. Call it with 5, then with 10:

          | -----
          | ----------
        `,
        starter: py`

        `,
        hints: [
          md`One function with one parameter, «n». Then two calls.`,
          md`«def line(n):» and, inside it, one «print».`,
          md`Inside the function: «print("-" * n)».`,
        ],
        solution: py`
          def line(n):
              print("-" * n)

          line(5)
          line(10)
        `,
        tests: [
          { output: "-----\n----------" },
          {
            py: py`
              assert printed("line", 3) == "---", "«line(3)» should print three dashes."
              assert printed("line", 1) == "-", "«line(1)» should print one dash."
            `,
          },
        ],
        wrong: [py`
          def line(n):
              print("-----")

          line(5)
          line(10)
        `],
      },
      {
        id: "describe-pet",
        title: "Describe a pet",
        task: md`
          Define «describe(name, animal)» which prints «<name> is a <animal>.». Call it once with «"Bruno"» and «"dog"»:

          | Bruno is a dog.
        `,
        starter: py`

        `,
        hints: [
          md`The order of the parameters matters: name first, then animal.`,
          md`Two parameters, with a comma between them: «def describe(name, animal):».`,
          md`The body: «print(f"{name} is a {animal}.")». Then call «describe("Bruno", "dog")».`,
        ],
        solution: py`
          def describe(name, animal):
              print(f"{name} is a {animal}.")

          describe("Bruno", "dog")
        `,
        tests: [
          { output: "Bruno is a dog." },
          { py: py`assert printed("describe", "Tom", "cat") == "Tom is a cat.", "«describe(\"Tom\", \"cat\")» should print «Tom is a cat.»."` },
          { py: py`assert printed("describe", "Moti", "parrot") == "Moti is a parrot.", "«describe(\"Moti\", \"parrot\")» should print «Moti is a parrot.». Check that the name comes first and the animal second."` },
        ],
        wrong: [
          py`
            def describe(name, animal):
                print("Bruno is a dog.")

            describe("Bruno", "dog")
          `,
          py`
            def describe(animal, name):
                print(f"{name} is a {animal}.")

            describe("dog", "Bruno")
          `,
        ],
      },
    ],
    keys: [
      md`«def name(parameters):» defines a function. The indented lines are its body.`,
      md`Defining does not run it. Calling does: «name(arguments)». Do not forget the brackets.`,
      md`Parameters are the names in the «def» line. Arguments are the values you give in the call, matched in order.`,
      md`A function must be defined before the call runs.`,
      md`With functions, you do not write the same code again and again.`,
    ],
  });

  // ---------------------------------------------------------------- Day 32
  day({
    slug: "return",
    title: "Return values",
    goal: "Make a function give back an answer with return, and learn why return is better than print for this.",
    minutes: 40,
    needs: [17, 31],
    win: "Today you can now write functions that give back an answer you can store and use.",
    learn: [
      md`
        ## Getting an answer back

        «print()» only **shows** something on the screen. «return» gives a value **back** to the code that called the function. That code can then store it and use it. Guess first:
      `,
      ex(py`
        def square(n):
            return n * n

        result = square(4)
        print(result)
        print(square(3) + square(4))
      `, { predict: ["16\n25", "16\n7", "4\n7"], answer: 0 }),
      md`
        «square(3) + square(4)» is 9 + 16. In the same way, «area(4, 5)» below gives back 20, and we store it in «room1». Then we can add the two rooms together.
      `,
      ex(py`
        def area(width, height):
            return width * height

        room1 = area(4, 5)
        room2 = area(3, 3)
        print("Total floor area:", room1 + room2)
      `),
      md`
        ## print versus return

        This is the most important idea today. Compare these two functions:
      `,
      ex(py`
        def add_print(a, b):
            print(a + b)

        def add_return(a, b):
            return a + b

        x = add_print(2, 3)
        y = add_return(2, 3)
        print("x is", x)
        print("y is", y)
      `, { predict: ["5\nx is None\ny is 5", "5\nx is 5\ny is 5", "x is 5\ny is 5"], answer: 0 }),
      md`
        «add_print» shows 5 on the screen, but gives nothing back, so «x» is «None». A function without «return» always gives back «None». «add_return» gives back 5, which is stored in «y».
      `,
      warn(md`The most common mistake with functions is **printing instead of returning**. If the answer will be used later (stored, added up or compared), the function must «return» it.`),
      tip(md`When a program only defines a function, Run shows nothing. That is normal. **Check answer** calls your function for you. To try it yourself, add a line like «print(square(4))» at the bottom.`),
      md`
        ## return ends the function

        As soon as Python reaches «return», the function stops. The lines after it do not run:
      `,
      ex(py`
        def check_age(age):
            if age >= 18:
                return "adult"
            return "minor"

        print(check_age(20))
        print(check_age(12))
      `),
      md`
        When age is 20, the first «return» runs and the function stops. Python never reaches the second «return». That is why we do not need «else».

        A function can also give back True or False. Python first works out «marks >= 33». The answer is True or False. Then «return» gives back that answer.
      `,
      ex(py`
        def is_pass(marks):
            return marks >= 33

        print(is_pass(45))
        print(is_pass(20))
        if is_pass(70):
            print("70 is a pass")
      `),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          def f(x):
              return x + 1

          print(f(4))
        `,
        options: ["5", "4", "x + 1"],
        answer: 0,
        explain: md`«f(4)» gives back 5, which is printed.`,
        why: [null, md`The function adds 1 before it gives the answer back.`, md`Python works out «x + 1». It does not show the words.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          def f(x):
              print(x)

          y = f(3)
          print(y)
        `,
        options: ["3\nNone", "3\n3", "None"],
        answer: 0,
        explain: md`«f» prints 3 but gives nothing back, so «y» is «None».`,
        why: [null, md`«f» prints 3, but it has no «return». So «y» gets «None», not 3.`, md`The call «f(3)» still runs the «print» inside, so 3 is shown first.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          def f():
              return 1
              return 2

          print(f())
        `,
        options: ["1", "2", "1\n2"],
        answer: 0,
        explain: md`The first «return» ends the function. The second is never reached.`,
        why: [null, md`Python stops at the first «return». It never reaches the second.`, md`A function gives back one answer and stops. It cannot return twice.`],
        skill: "trace",
      },
      {
        q: md`This function should give back the total. What does the program show?`,
        code: py`
          def total(a, b):
              a + b

          print(total(2, 3))
        `,
        options: ["None", "5", "An error"],
        answer: 0,
        explain: md`The function works out «a + b» but never gives it back. A function with no «return» gives back «None». The fix is «return a + b».`,
        why: [null, md`The answer is worked out, but it is not returned. Look for the word «return».`, md`The program runs. It just gives back «None».`],
        skill: "debug",
      },
      {
        q: md`What does this program do?`,
        code: py`
          def is_adult(age):
              return age >= 18

          age = int(input("Age: "))
          print(is_adult(age))
        `,
        options: [
          "It shows True if the typed age is 18 or more, and False if it is less",
          "It shows the typed age",
          "It shows adult or minor",
        ],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`«is_adult» gives back True or False, and that answer is printed.`,
        why: [null, md`The age goes into the function. What comes back is True or False.`, md`The function gives back the result of «age >= 18», which is True or False, not words.`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-bill",
        kind: "trace",
        title: "Be the Computer: answers coming back",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          def bill(cups, price):
              total = cups * price
              return total
          a = bill(2, 15)
          b = bill(3, 10)
          print(a + b)
        `,
        inputs: [],
        ask: [{ line: 4, name: "a" }, { line: 2, hit: 2, name: "total" }, { output: true }],
        hints: [
          md`Each call jumps into the function and comes back with an answer.`,
          md`The first call: «cups» is 2 and «price» is 15.`,
          md`The second call: «cups» is 3 and «price» is 10.`,
        ],
      },
      {
        id: "arrange-cube",
        kind: "parsons",
        title: "Arrange: return a cube",
        task: md`
          Put the lines in order and set each indent. «cube(n)» gives back «n * n * n». The program prints:

          | 27
        `,
        solution: py`
          def cube(n):
              return n * n * n
          print(cube(3))
        `,
        distractors: ["print(n * n * n)"],
        indent: "choose",
        tests: [{ output: "27" }],
        hints: [
          md`The «def» line comes first.`,
          md`The function must give back the answer, so use «return», with one indent.`,
          md`The call goes inside «print(...)», with no indent.`,
        ],
      },
      {
        id: "square",
        title: "Square a number",
        task: md`
          Define «square(n)» which **returns** «n» multiplied by itself. Do not print inside the function. For example, «square(4)» gives back «16».

          Run will show nothing, because nothing calls the function yet. That is normal. To try it, add «print(square(4))» at the bottom. **Check answer** calls your function for you.
        `,
        starter: py`
          def square(n):

        `,
        hints: [
          md`Multiply «n» by itself, and give the answer back.`,
          md`Write one line inside the function, under «def», with one indent.`,
          md`«return n * n»`,
        ],
        solution: py`
          def square(n):
              return n * n
        `,
        tests: [
          {
            py: py`
              expect("square", (4,), 16)
              expect("square", (-3,), 9)
              expect("square", (0,), 0)
              expect("square", (2.5,), 6.25)
            `,
          },
        ],
        wrong: ["def square(n):\n    print(n * n)"],
      },
      {
        id: "is-even",
        title: "Is it even?",
        task: md`
          Define «is_even(n)» which returns «True» if «n» is even and «False» if it is odd. For example, «is_even(4)» gives back «True» and «is_even(7)» gives back «False».
        `,
        starter: py`

        `,
        hints: [
          md`A number is even when the remainder after dividing by 2 is 0.`,
          md`That test is «n % 2 == 0». It is already True or False.`,
          md`«return n % 2 == 0»`,
        ],
        solution: py`
          def is_even(n):
              return n % 2 == 0
        `,
        tests: [
          {
            py: py`
              expect("is_even", (4,), True)
              expect("is_even", (7,), False)
              expect("is_even", (0,), True)
              expect("is_even", (-2,), True)
              expect("is_even", (-3,), False)
            `,
          },
        ],
        wrong: [py`
          def is_even(n):
              print(n % 2 == 0)
        `],
      },
      {
        id: "biggest",
        title: "Biggest of three",
        task: md`
          Define «biggest(a, b, c)» which returns the largest of the three numbers. Use «if», not «max()» or sorting. For example, «biggest(2, 8, 5)» gives back «8».
        `,
        starter: py`
          def biggest(a, b, c):

        `,
        hints: [
          md`Keep the best number so far in «best». Start with «best = a».`,
          md`Write «if b > best:» and then, on the next line, indented, «best = b». Do the same for «c».`,
          md`Finally «return best».`,
        ],
        solution: py`
          def biggest(a, b, c):
              best = a
              if b > best:
                  best = b
              if c > best:
                  best = c
              return best
        `,
        tests: [
          {
            py: py`
              expect("biggest", (1, 2, 3), 3)
              expect("biggest", (9, 2, 3), 9)
              expect("biggest", (2, 8, 5), 8)
              expect("biggest", (3, 1, 5), 5)
              expect("biggest", (4, 4, 1), 4)
              expect("biggest", (-1, -5, -3), -1)
            `,
          },
          { avoids: ["call:max", "call:sorted", "method:sort"], msg: md`Work it out with «if» statements, not «max()» or sorting.` },
        ],
        wrong: [py`
          def biggest(a, b, c):
              if a > b:
                  return a
              elif b > c:
                  return b
              return c
        `],
      },
    ],
    keys: [
      md`«return value» gives a value back to the code that called the function, and ends the function.`,
      md`«print» only shows. «return» gives back a value you can store and use.`,
      md`A function with no «return» gives back «None».`,
      md`Yes-or-no functions can return a comparison: «return marks >= 33».`,
    ],
  });

  // ---------------------------------------------------------------- Day 33
  day({
    slug: "parameters-scope",
    title: "More about parameters, and where variables can be used",
    goal: "Use default values and arguments by name, return two values, and learn where a variable can be used.",
    minutes: 45,
    needs: [26, 32],
    win: "Today you can now give parameters defaults, return two values, and keep variables inside functions.",
    learn: [
      md`
        ## Default values and arguments by name

        A parameter can have a **default**. A default is the value Python uses when you do not give one. In the «def» line, write the parameter, then «=» and the default. Guess first:
      `,
      ex(py`
        def greet(name, greeting="Hello"):
            print(f"{greeting}, {name}!")

        greet("Asha")
        greet("Ravi", "Namaste")
      `, { predict: ["Hello, Asha!\nNamaste, Ravi!", "Hello, Asha!\nHello, Ravi!", "Hello, Asha!\nRavi, Namaste!"], answer: 0 }),
      md`
        Parameters with a default must come after parameters without one.

        You can also give an argument by its name, like «size="large"». Python calls these **keyword arguments**, because you use the name of the parameter. Named arguments can come in any order, but they must come after the arguments without names.
      `,
      ex(py`
        def make_order(item, qty=1, size="medium"):
            print(f"{qty} x {size} {item}")

        make_order("chai")
        make_order("coffee", size="large")
        make_order(qty=3, item="samosa")
      `),
      md`
        ## Two values back

        A function can give back more than one value. Put commas between the values. Python puts them together in one tuple, and you can unpack it:
      `,
      ex(py`
        def split_bill(total, people):
            return total // people, total % people

        result = split_bill(100, 3)
        print(result)
        share, left = split_bill(100, 3)
        print(share, left)
      `, { predict: ["(33, 1)\n33 1", "(33, 1)\n(33, 1)", "33 1\n33 1"], answer: 0 }),
      md`Each person pays 33 rupees, and 1 rupee is left over.`,
      pause(md`Good place for a break. The second part is about where a variable can be used.`),
      md`
        ## Scope: a variable made inside a function stays inside it

        **Scope** means the part of a program where a variable can be used. A variable made inside a function is **local**. It exists only while the function runs:
      `,
      ex(py`
        def make_total():
            total = 10 + 20

        make_total()
        print(total)
      `, { error: true }),
      md`
        Press **Step through** on this example. Watch the box for «make_total()» appear, then disappear. That is why «print(total)» fails. To get a value out, «return» it.

        A function can read a variable from the main program. A **constant** is a value that should not change. We write it in CAPITALS.
      `,
      ex(py`
        TAX_RATE = 18

        def with_tax(price):
            return price + price * TAX_RATE / 100

        print(with_tax(100))
      `),
      warn(md`When a function uses «=» on a name, Python makes a new local name. So «score = score + 1» inside a function fails, even when there is a «score» outside. Run the next example to see it.`),
      ex(py`
        score = 0

        def add_point():
            score = score + 1

        add_point()
      `, { error: true }),
      md`To change an outside value, give it to the function and return the new value: «score = add_point(score)».`,
      ex(py`
        def add_point(score):
            return score + 1

        score = 0
        score = add_point(score)
        score = add_point(score)
        print(score)
      `),
      tip(md`The best functions get what they need from their parameters. They give back the answer with «return». These functions are easy to test and easy to use again.`),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          def f(a, b=10):
              return a + b

          print(f(5))
        `,
        options: ["15", "5", "An error"],
        answer: 0,
        explain: md`«b» uses its default of 10.`,
        why: [null, md`«b» is not missing. It uses its default, 10.`, md`A parameter with a default can be left out.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          def f(a, b=10):
              return a + b

          print(f(5, 1))
        `,
        options: ["6", "15", "16"],
        answer: 0,
        explain: md`An argument was given for «b», so the default is not used: 5 + 1.`,
        why: [null, md`The default is used only when you give no value. Here «b» gets 1.`, md`«b» gets 1. The default 10 is not added as well.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          def f():
              return 3, 4

          x, y = f()
          print(y)
        `,
        options: ["4", "3", "(3, 4)"],
        answer: 0,
        explain: md`The tuple «(3, 4)» is unpacked into «x» and «y».`,
        why: [null, md`«x» gets 3. «y» gets the second value.`, md`The tuple is unpacked, so «y» holds one value only.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          x = 1

          def change():
              x = 2

          change()
          print(x)
        `,
        options: ["1", "2", "An error"],
        answer: 0,
        explain: md`«x = 2» inside the function makes a new local «x». The «x» outside stays 1.`,
        why: [null, md`The «=» inside the function makes a new local name. It does not change the outside «x».`, md`The function only stores a value. It does not read «x», so there is no error.`],
        skill: "trace",
      },
      {
        q: md`What does this program do?`,
        code: py`
          def ticket(name, seat="General"):
              return f"{name}: {seat}"

          print(ticket("Asha"))
          print(ticket("Ravi", seat="Sleeper"))
        `,
        options: [
          "It makes ticket labels. The seat is General unless another seat is given",
          "It books two seats for Asha",
          "It shows only the seat names",
        ],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`It prints «Asha: General» and «Ravi: Sleeper». The default «"General"» is used when no seat is given.`,
        why: [null, md`There are two calls with two different names.`, md`Each label has the name, then the seat.`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-defaults",
        kind: "trace",
        title: "Be the Computer: a default value",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          def add_marks(total, marks=5):
              total = total + marks
              return total
          score = add_marks(10)
          score = add_marks(score, 20)
          print(score)
        `,
        inputs: [],
        ask: [{ line: 4, name: "score" }, { line: 2, hit: 2, name: "total" }, { output: true }],
        hints: [
          md`The first call gives only one argument, so «marks» uses its default.`,
          md`After line 4, «score» is 10 + 5.`,
          md`The second call gives «marks» the value 20.`,
        ],
      },
      {
        id: "arrange-two-values",
        kind: "parsons",
        title: "Arrange: area and edge",
        task: md`
          Put the lines in order and set each indent. «size()» gives back two values: the area and the length round the edge. The program prints:

          | 12 14
        `,
        solution: py`
          def size(width, height):
              area = width * height
              edge = 2 * (width + height)
              return area, edge
          a, e = size(4, 3)
          print(a, e)
        `,
        distractors: ["return area"],
        indent: "choose",
        tests: [{ output: "12 14" }],
        hints: [
          md`Work out both values before the «return».`,
          md`The three lines after «def» are inside the function.`,
          md`«return area, edge» gives back both. Then unpack them with «a, e = size(4, 3)».`,
        ],
      },
      {
        id: "power",
        title: "Power with a default",
        task: md`
          Define «power(base, exp=2)» which returns «base» to the power of «exp». If no power is given, it squares the number. «power(3)» gives «9», and «power(2, 10)» gives «1024».
        `,
        starter: py`

        `,
        hints: [
          md`The default goes in the «def» line, not inside the body.`,
          md`«def power(base, exp=2):»`,
          md`«return base ** exp»`,
        ],
        solution: py`
          def power(base, exp=2):
              return base ** exp
        `,
        tests: [
          {
            py: py`
              expect("power", (3,), 9)
              expect("power", (2, 10), 1024)
              expect("power", (5, 0), 1)
              expect("power", (10, 3), 1000)
            `,
          },
        ],
        wrong: [
          py`
            def power(base, exp):
                return base ** exp
          `,
          py`
            def power(base, exp=2):
                return base * exp
          `,
        ],
      },
      {
        id: "min-max",
        title: "Smallest and largest",
        task: md`
          Define «min_max(numbers)» which returns **two** values: the smallest and then the largest number in the list. «min_max([4, 9, 1, 7])» gives back «(1, 9)».
        `,
        starter: py`

        `,
        hints: [
          md`«min()» and «max()» from Day 24 find the smallest and the largest.`,
          md`Put a comma between the two values after «return». The smallest comes first.`,
          md`«return min(numbers), max(numbers)»`,
        ],
        solution: py`
          def min_max(numbers):
              return min(numbers), max(numbers)
        `,
        tests: [
          {
            py: py`
              expect("min_max", ([4, 9, 1, 7],), (1, 9))
              expect("min_max", ([5],), (5, 5))
              expect("min_max", ([-3, 0, 3],), (-3, 3))
            `,
          },
        ],
        wrong: [py`
          def min_max(numbers):
              return max(numbers), min(numbers)
        `],
      },
      {
        id: "final-price",
        title: "Final price",
        task: md`
          Define «final_price(price, discount=0, tax=18)». It should:

          1. take «discount» percent off the price, then
          2. add «tax» percent to what is left, and
          3. return the answer rounded to 2 decimal places.

          So «final_price(100)» is «118.0», and «final_price(100, 10)» is «106.2» (100 becomes 90 after the discount, then 106.2 with tax). A call by name must also work: «final_price(100, tax=5)» is «105.0».
        `,
        starter: py`
          def final_price(price, discount=0, tax=18):

        `,
        hints: [
          md`Work in two steps: first the discount, then the tax.`,
          md`After the discount: «after_discount = price - price * discount / 100».`,
          md`Then add tax to «after_discount» the same way, and «return round(answer, 2)».`,
        ],
        solution: py`
          def final_price(price, discount=0, tax=18):
              after_discount = price - price * discount / 100
              with_tax = after_discount + after_discount * tax / 100
              return round(with_tax, 2)
        `,
        tests: [
          {
            py: py`
              expect("final_price", (100,), 118.0, approx=True)
              expect("final_price", (100, 10), 106.2, approx=True)
              expect("final_price", (250, 20, 5), 210.0, approx=True)
              expect("final_price", (99.99, 0, 0), 99.99, approx=True)
              expect("final_price", (59.5, 15), 59.68, approx=True)
            `,
          },
          {
            py: py`
              need("final_price", "function")
              got = final_price(100, tax=5)
              assert abs(got - 105.0) < 0.001, f"«final_price(100, tax=5)» should give 105.0, not {got}. Check that «tax» is a parameter with that name."
            `,
          },
        ],
        wrong: [py`
          def final_price(price, discount=0, tax=18):
              after_discount = price - price * discount / 100
              with_tax = price + price * tax / 100
              return round(with_tax, 2)
        `],
      },
      {
        id: "score-keeper",
        kind: "modify",
        optional: true,
        title: "Change it: keep the score",
        task: md`
          This program stops with an error, because «=» inside the function makes a new local «score». Change it so «add_point» takes the score as a parameter and returns the new score. The main program stores the answer each time. It then prints:

          | 2
        `,
        starter: py`
          def add_point():
              score = score + 1

          score = 0
          add_point()
          add_point()
          print(score)
        `,
        hints: [
          md`Give the score to the function, and give the new score back.`,
          md`Change the «def» line to «def add_point(score):», and use «return score + 1».`,
          md`Each call becomes «score = add_point(score)».`,
        ],
        solution: py`
          def add_point(score):
              return score + 1

          score = 0
          score = add_point(score)
          score = add_point(score)
          print(score)
        `,
        tests: [
          { output: "2" },
          { py: py`expect("add_point", (5,), 6)` },
          { py: py`expect("add_point", (0,), 1)` },
        ],
        wrong: [py`
          def add_point(score):
              return score + 1

          score = 0
          add_point(score)
          add_point(score)
          print(score)
        `],
      },
    ],
    keys: [
      md`Default values: «def greet(name, greeting="Hello"):». Parameters with defaults come last.`,
      md`Arguments by name (keyword arguments): «make_order("tea", size="large")». Named arguments can be in any order, but they come after the others.`,
      md`Return two values with «return a, b», and unpack them: «low, high = min_max(x)».`,
      md`Scope: a variable made inside a function is local. It is gone when the function finishes. Return what you need.`,
      md`«=» inside a function makes a new local name. To change an outside value, give it to the function as an argument and return the new value.`,
    ],
  });

  // ---------------------------------------------------------------- Day 34
  day({
    slug: "building-with-functions",
    title: "Building programs with functions",
    goal: "Split a problem into small functions, explain them with docstrings, and test them with assert.",
    minutes: 45,
    needs: [12, 18, 32],
    win: "Today you can now build a program from small functions, and test them with assert.",
    learn: [
      md`
        ## Small functions working together

        Big programs are built from small functions. Each function does **one job**. A function can call another function. Guess first:
      `,
      ex(py`
        def cups_cost(cups):
            return cups * 12

        def bill_line(name, cups):
            return f"{name} pays {cups_cost(cups)} rupees"

        print(bill_line("Asha", 2))
        print(bill_line("Ravi", 5))
      `, {
        predict: [
          "Asha pays 24 rupees\nRavi pays 60 rupees",
          "Asha pays cups_cost(2) rupees\nRavi pays cups_cost(5) rupees",
          "Asha pays 2 rupees\nRavi pays 5 rupees",
        ],
        answer: 0,
      }),
      md`
        «bill_line» calls «cups_cost» and puts its answer into one sentence. Press **Step through** and watch Python jump into each function and come back. Both functions are defined before the last two lines run, so every call works.

        Here is one more small function. «.isalpha()» is True when the text has only letters. It works like «.isdigit()» from Day 12.
      `,
      ex(py`
        def count_letters(text):
            count = 0
            for ch in text:
                if ch.isalpha():
                    count += 1
            return count

        print("a".isalpha(), "5".isalpha(), "!".isalpha())
        print(count_letters("Hi, Ravi!"))
      `),
      md`
        ## Docstrings

        A **docstring** is a note on the first line inside a function. It says what the function does. A docstring starts and ends with three double quote marks. This is how Python programmers always write it.
      `,
      ex(py`
        def area(width, height):
            """Return the area of a rectangle."""
            return width * height

        print(area(3, 4))
      `),
      md`Python does not act on a docstring. It is a note for people. Write one when the job of a function is not clear from its name.`,
      pause(md`Good place for a break. The second part is about testing your functions.`),
      md`
        ## Testing with assert

        A **test** is a small check that a function gives the right answer. «assert» checks that something is True. If it is True, nothing happens. If it is False, the program stops with an «AssertionError». Guess first:
      `,
      ex(py`
        def double(n):
            return n * 2

        assert double(2) == 4
        assert double(0) == 0
        assert double(-3) == -6
        print("All tests passed!")
      `, { predict: ["All tests passed!", "True\nTrue\nTrue\nAll tests passed!", "4\n0\n-6\nAll tests passed!"], answer: 0 }),
      md`This version has a mistake (a **bug**). The tests find it at once:`,
      ex(py`
        def double(n):
            return n + 2

        assert double(2) == 4
        assert double(3) == 6, "double(3) should be 6"
        print("All tests passed!")
      `, { error: true }),
      md`
        After a comma you can add a message. Python shows that message when the assert fails.

        «double(2)» gave the right answer only by luck, because 2 + 2 is the same as 2 × 2. «double(3)» showed the mistake. So test several values, including unusual ones like 0, negative numbers and empty text.
      `,
      tip(md`This is how the exercises on this site are checked: hidden tests, like «assert», call your functions with different values.`),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          def a(x):
              return x + 1

          def b(x):
              return a(x) * 2

          print(b(3))
        `,
        options: ["8", "7", "4"],
        answer: 0,
        explain: md`«a(3)» is 4, and «b» doubles it: 8.`,
        why: [null, md`That is 3 × 2 + 1. But «a» adds 1 first, and then «b» doubles the answer.`, md`4 is the answer of «a(3)». «b» still doubles it.`],
        skill: "trace",
      },
      {
        q: md`What happens when an «assert» condition is True?`,
        options: ["Nothing. The program continues.", "It prints True", "The program stops"],
        answer: 0,
        explain: md`«assert» is silent when everything is fine. It stops the program only when the condition is False.`,
        why: [null, md`«assert» never prints when the check passes.`, md`It stops only when the condition is False.`],
        skill: "memory",
      },
      {
        q: md`What does this show?`,
        code: py`
          def shout(t):
              return t.upper() + "!"

          print(shout("hi") + shout("yo"))
        `,
        options: ["HI!YO!", "HI! YO!", "hi!yo!"],
        answer: 0,
        explain: md`Each call returns a string, and «+» joins them with no space.`,
        why: [null, md`«+» joins text with no space between.`, md`«.upper()» makes the letters capitals.`],
        skill: "trace",
      },
      {
        q: md`What does a docstring do when the program runs?`,
        options: ["Nothing. It is a note for people.", "It prints the note", "It tests the function"],
        answer: 0,
        explain: md`Python does not act on a docstring. It explains the function to people who read the code.`,
        why: [null, md`A docstring is never printed by itself.`, md`Tests use «assert». A docstring only explains.`],
        skill: "memory",
      },
      {
        q: md`What does this program do?`,
        code: py`
          def is_vowel(ch):
              return ch.lower() in "aeiou"

          assert is_vowel("A")
          assert not is_vowel("b")
          print("ok")
        `,
        options: [
          "It tests that is_vowel works for a capital vowel and for a consonant",
          "It shows every vowel",
          "It changes A to a",
        ],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`The two «assert» lines check «is_vowel» with «"A"» and «"b"». If both pass, it prints «ok».`,
        why: [null, md`Nothing loops over vowels. The «assert» lines check answers.`, md`«.lower()» is used inside the check. The program does not show the changed letter.`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-two-functions",
        kind: "trace",
        title: "Be the Computer: one function calls another",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          def cups_cost(cups):
              return cups * 12
          def bill(cups):
              cost = cups_cost(cups)
              if cups >= 5:
                  cost = cost - 10
              return cost
          print(bill(2))
          print(bill(5))
        `,
        inputs: [],
        ask: [{ line: 4, name: "cost" }, { line: 4, hit: 2, name: "cost" }, { output: true }],
        hints: [
          md`Line 4 jumps into «cups_cost» and comes back with an answer.`,
          md`For 5 cups, «cost» is 60 after line 4. Then line 6 runs too.`,
          md`For 2 cups, the «if» is False, so 10 is not taken off.`,
        ],
      },
      {
        id: "arrange-squares",
        kind: "parsons",
        title: "Arrange: a function that uses another",
        task: md`
          Put the lines in order and set each indent. «sum_of_squares» uses «square». The program prints:

          | 25
        `,
        solution: py`
          def square(n):
              return n * n
          def sum_of_squares(a, b):
              return square(a) + square(b)
          print(sum_of_squares(3, 4))
        `,
        distractors: ["return a + b"],
        indent: "choose",
        tests: [{ output: "25" }],
        hints: [
          md`Each «def» line is followed by its own body.`,
          md`Both «return» lines have one indent.`,
          md`The «print» line has no indent and comes last.`,
        ],
      },
      {
        id: "temperatures",
        title: "Temperature converter",
        task: md`
          Define two functions:

          - «c_to_f(c)» returns Celsius changed to Fahrenheit: multiply by 9, divide by 5, then add 32.
          - «f_to_c(f)» returns Fahrenheit changed to Celsius: take away 32, then multiply by 5 and divide by 9.

          Give «c_to_f» a docstring. So «c_to_f(100)» gives «212.0» and «f_to_c(32)» gives «0.0».
        `,
        starter: py`

        `,
        hints: [
          md`Two «def» blocks, each with one «return». Put the docstring on the first line inside «c_to_f».`,
          md`«return c * 9 / 5 + 32»`,
          md`Brackets matter in the second one: «return (f - 32) * 5 / 9».`,
        ],
        solution: py`
          def c_to_f(c):
              """Change Celsius to Fahrenheit."""
              return c * 9 / 5 + 32

          def f_to_c(f):
              return (f - 32) * 5 / 9
        `,
        tests: [
          {
            py: py`
              expect("c_to_f", (100,), 212, approx=True)
              expect("c_to_f", (0,), 32, approx=True)
              expect("c_to_f", (-40,), -40, approx=True)
              expect("f_to_c", (212,), 100, approx=True)
              expect("f_to_c", (32,), 0, approx=True)
              expect("f_to_c", (98.6,), 37, approx=True)
            `,
          },
          {
            py: py`
              need("c_to_f", "function")
              assert c_to_f.__doc__, "Give «c_to_f» a docstring: a line in three double quote marks, just under the «def» line."
            `,
          },
        ],
        wrong: [py`
          def c_to_f(c):
              """Change Celsius to Fahrenheit."""
              return c * 9 / 5 + 32

          def f_to_c(f):
              return f - 32 * 5 / 9
        `],
      },
      {
        id: "count-vowels",
        optional: true,
        title: "Vowel-counting function",
        task: md`
          Define «count_vowels(text)» which **returns** how many vowels (a, e, i, o, u) are in the text, ignoring capitals. «count_vowels("Hello")» gives back «2», and «count_vowels("Education")» gives back «5».
        `,
        starter: py`

        `,
        hints: [
          md`Use a counter, as on Day 18, and «return» it at the end.`,
          md`Loop over «text.lower()», so capital vowels count too.`,
          md`Inside the loop: «if ch in "aeiou":» then «count += 1». After the loop: «return count».`,
        ],
        solution: py`
          def count_vowels(text):
              count = 0
              for ch in text.lower():
                  if ch in "aeiou":
                      count += 1
              return count
        `,
        tests: [
          {
            py: py`
              expect("count_vowels", ("Hello",), 2)
              expect("count_vowels", ("PYTHON",), 1)
              expect("count_vowels", ("rhythm",), 0)
              expect("count_vowels", ("Education",), 5)
              expect("count_vowels", ("",), 0)
            `,
          },
        ],
        wrong: [py`
          def count_vowels(text):
              count = 0
              for ch in text:
                  if ch in "aeiou":
                      count += 1
              return count
        `],
      },
      {
        id: "grade-report",
        title: "Grade report",
        task: md`
          Define two functions:

          - «grade(marks)» returns «"A"» (90 or more), «"B"» (75 or more), «"C"» (60 or more), «"D"» (33 or more) or «"F"».
          - «report(marks_list)» returns a **list** of grades, one for each mark. It must use «grade()» to work each one out.

          So «report([95, 80, 20])» gives back «["A", "B", "F"]».
        `,
        starter: py`
          def grade(marks):


          def report(marks_list):

        `,
        hints: [
          md`Write «grade» first. Then «report» uses it for each mark.`,
          md`«grade» is an «if/elif» chain that returns a letter. Check the biggest cut-off first.`,
          md`«report» can be one line: «return [grade(m) for m in marks_list]».`,
        ],
        solution: py`
          def grade(marks):
              if marks >= 90:
                  return "A"
              elif marks >= 75:
                  return "B"
              elif marks >= 60:
                  return "C"
              elif marks >= 33:
                  return "D"
              return "F"


          def report(marks_list):
              return [grade(m) for m in marks_list]
        `,
        tests: [
          {
            py: py`
              expect("grade", (95,), "A")
              expect("grade", (90,), "A")
              expect("grade", (89,), "B")
              expect("grade", (75,), "B")
              expect("grade", (74,), "C")
              expect("grade", (60,), "C")
              expect("grade", (59,), "D")
              expect("grade", (33,), "D")
              expect("grade", (32,), "F")
              expect("grade", (10,), "F")
              expect("report", ([95, 80, 20],), ["A", "B", "F"])
              expect("report", ([],), [])
              import ast
              tree = ast.parse(CODE)
              rep = [n for n in ast.walk(tree) if isinstance(n, ast.FunctionDef) and n.name == "report"]
              assert rep and any(isinstance(n, ast.Call) and getattr(n.func, "id", None) == "grade" for n in ast.walk(rep[0])), "«report» should call «grade()» for each mark."
            `,
          },
        ],
        wrong: [py`
          def grade(marks):
              if marks > 90:
                  return "A"
              elif marks > 75:
                  return "B"
              elif marks > 60:
                  return "C"
              elif marks > 33:
                  return "D"
              return "F"


          def report(marks_list):
              return [grade(m) for m in marks_list]
        `],
      },
      {
        id: "write-asserts",
        title: "Write your own tests",
        task: md`
          «to_paise(rupees)» changes rupees to paise. One rupee is 100 paise. It works correctly.

          Write **three** «assert» lines that test it. Each one compares an answer with «==». Use three different values, and make one of them 0. Every assert must pass, so the program ends by printing:

          | All tests passed!
        `,
        starter: py`
          def to_paise(rupees):
              return rupees * 100

          # Write three assert lines here

          print("All tests passed!")
        `,
        hints: [
          md`Work out each right answer on paper first. For 2 rupees, the answer is 200.`,
          md`Each line looks like «assert to_paise(...) == ...».`,
          md`«assert to_paise(2) == 200», «assert to_paise(0) == 0», and one more value.`,
        ],
        solution: py`
          def to_paise(rupees):
              return rupees * 100

          assert to_paise(2) == 200
          assert to_paise(0) == 0
          assert to_paise(15) == 1500

          print("All tests passed!")
        `,
        tests: [
          { output: "All tests passed!" },
          {
            py: py`
              import ast
              tree = ast.parse(CODE)
              checks = [n for n in ast.walk(tree) if isinstance(n, ast.Assert)]
              assert len(checks) >= 3, f"Write at least three «assert» lines. I found {len(checks)}."
              for a in checks:
                  ok = isinstance(a.test, ast.Compare) and isinstance(a.test.ops[0], ast.Eq)
                  assert ok, "Each «assert» should compare an answer with «==», like «assert to_paise(2) == 200»."
              text = CODE.replace(" ", "")
              assert "to_paise(0)" in text, "One of your asserts should test «to_paise(0)»."
            `,
          },
        ],
        wrong: [
          py`
            def to_paise(rupees):
                return rupees * 100

            assert to_paise(2) == 20
            assert to_paise(0) == 0
            assert to_paise(15) == 1500

            print("All tests passed!")
          `,
          py`
            def to_paise(rupees):
                return rupees * 100

            assert to_paise(2) == 200

            print("All tests passed!")
          `,
          py`
            def to_paise(rupees):
                return rupees * 100

            assert to_paise(2)
            assert to_paise(0) == 0
            assert to_paise(15)

            print("All tests passed!")
          `,
        ],
      },
    ],
    keys: [
      md`Build programs from small functions that each do one job. A function can call another function.`,
      md`A docstring, «"""Explain the function."""», on the first line inside a function explains what it does.`,
      md`«assert condition, "message"» stops the program if the condition is False.`,
      md`Test functions with several different values, including unusual ones like 0 and empty lists.`,
      md`«.isalpha()» is True when the text has only letters.`,
    ],
  });

  // ---------------------------------------------------------------- Day 35
  day({
    slug: "week-5-project",
    title: "Project day: dictionaries and functions",
    goal: "Build a PIN checker, a text analyser and a contact book from small functions.",
    minutes: 45,
    kind: "project",
    needs: [19, 25, 29, 32, 34],
    win: "Today you can now build a contact book from functions, a dictionary and a command loop, and fix broken functions.",
    learn: [
      md`
        ## Week 5: a short summary

        - Dictionaries store «key: value» pairs and look things up quickly.
        - «.items()», «.keys()», «.values()» and «.get()» help you work with them.
        - Functions are defined with «def», take parameters, and «return» results.
        - Small functions that you have tested make big programs easier to build.

        ## A function can change a dictionary

        When you give a dictionary to a function, the function gets the same dictionary, not a copy. Guess first:
      `,
      ex(py`
        def add_item(menu, item, price):
            menu[item] = price

        menu = {"tea": 15}
        add_item(menu, "samosa", 12)
        print(menu)
      `, { predict: ["{'tea': 15, 'samosa': 12}", "{'tea': 15}", "{'samosa': 12}"], answer: 0 }),
      md`
        The change made inside the function stays after the function ends. The function never writes «menu = ...», so it does not make a new local name. It only stores a new key with «menu[item] = price».

        ## A command loop

        Many programs read a **command**, do it, and ask again. «.split()» breaks the line into words. «parts[0]» is the command, and «parts[1]» is the next word.
      `,
      ex(py`
        print("add Asha 98765".split())
      `),
      md`Run the loop below. It types «add tea», «add milk», «list» and «quit» for you.`,
      ex(py`
        items = []
        while True:
            parts = input("> ").split()
            if not parts:
                continue
            command = parts[0]
            if command == "add" and len(parts) > 1:
                items.append(parts[1])
                print("Added", parts[1])
            elif command == "list":
                print(items)
            elif command == "quit":
                print("Bye!")
                break
            else:
                print("Unknown command")
      `, { inputs: ["add tea", "add milk", "list", "quit"] }),
      md`
        We check «len(parts) > 1» to make sure there is a second word. If the user types only «add», «parts[1]» does not exist. Python would stop with an IndexError.

        An «if» can test a list, a text or a number directly. An empty list, an empty text and 0 are treated as False. Anything else is treated as True. So «not parts» is True when the list is empty, which happens when the user just presses Enter.
      `,
      ex(py`
        if []:
            print("A")
        else:
            print("B")
        if "chai":
            print("C")
      `, { predict: ["B\nC", "A\nC", "B"], answer: 0 }),
      pause(md`The practice today is long. Do the PIN checker first. Take a break, then build the contact book in two stages. The text statistics and the winner Bug Clinic are marked "finish later".`),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          def total(d):
              return sum(d.values())

          print(total({"a": 2, "b": 5}))
        `,
        options: ["7", "ab", "{'a': 2, 'b': 5}"],
        answer: 0,
        explain: md`The values 2 and 5 add up to 7.`,
        why: [null, md`«.values()» gives the values, not the keys.`, md`«sum()» adds the values. It does not give back the dictionary.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          parts = "add Asha 123".split()
          print(parts[1])
        `,
        options: ["Asha", "add", "123"],
        answer: 0,
        explain: md`«.split()» makes «["add", "Asha", "123"]», and position 1 is «"Asha"».`,
        why: [null, md`«"add"» is at position 0. Positions start at 0.`, md`«"123"» is at position 2.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          if not []:
              print("empty")
          else:
              print("full")
        `,
        options: ["empty", "full"],
        answer: 0,
        explain: md`An empty list is treated as False, so «not []» is True.`,
        why: [null, md`An empty list is treated as False. «not» turns that into True.`],
        skill: "trace",
      },
      {
        q: md`What happens when the user types only «find»?`,
        code: py`
          parts = "find".split()
          print(parts[1])
        `,
        options: ["IndexError", "find", "None"],
        answer: 0,
        error: true,
        verify: true,
        mono: true,
        explain: md`«parts» is «["find"]», which has only position 0. Check «len(parts)» before you use «parts[1]».`,
        why: [null, md`«"find"» is at position 0, not 1.`, md`A list gives an error for a missing position. It does not give «None».`],
        skill: "debug",
      },
      {
        q: md`What does this program do?`,
        code: py`
          def add_contact(book, name, number):
              book[name] = number
              return f"Saved {name}"

          book = {}
          print(add_contact(book, "Asha", "11111"))
          print(len(book))
        `,
        options: [
          "It saves Asha's number in the dictionary, then shows Saved Asha and 1",
          "It shows Asha's number",
          "It shows Saved Asha, but the dictionary stays empty",
        ],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`The function stores the number under the name, so the dictionary now has 1 pair. Then it gives back «"Saved Asha"».`,
        why: [null, md`The number is stored, not printed.`, md`The function changes the same dictionary, so the change stays.`],
        skill: "read",
      },
    ],
    practice: [
      {
        id: "trace-commands",
        kind: "trace",
        title: "Be the Computer: reading commands",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          book = {}
          for line in ["add Asha 111", "add Ravi 222", "add Asha 333"]:
              parts = line.split()
              name = parts[1]
              book[name] = parts[2]
          print(len(book), book["Asha"])
        `,
        inputs: [],
        ask: [{ line: 4, hit: 2, name: "name" }, { output: true }],
        hints: [
          md`Each line is split into three words. «parts[1]» is the second word.`,
          md`The second line of the list is «"add Ravi 222"».`,
          md`Asha is stored two times. The second value replaces the first.`,
        ],
      },
      {
        id: "arrange-longest",
        kind: "parsons",
        title: "Arrange: the longest word",
        task: md`
          Put the lines in order and set each indent. «longest(words)» gives back the longest word. If two words have the same length, it keeps the first one. For «chai samosa tea»:

          | samosa
        `,
        solution: py`
          def longest(words):
              best = ""
              for w in words:
                  if len(w) > len(best):
                      best = w
              return best
          print(longest(input("Words: ").split()))
        `,
        distractors: ["if len(w) >= len(best):"],
        indent: "choose",
        tests: [
          { inputs: ["chai samosa tea"], output: "samosa" },
          { inputs: ["tea pav"], output: "tea" },
          { inputs: ["dosa"], output: "dosa" },
        ],
        hints: [
          md`«best» starts as empty text, before the loop.`,
          md`The «if» is inside the loop, and «best = w» is inside the «if».`,
          md`«return best» comes after the loop, with one indent. Use «>», so a word of the same length does not replace the first one.`,
        ],
      },
      {
        id: "pin-check",
        title: "PIN checker",
        task: md`
          A valid PIN is exactly **4 or 6** characters long, and every character is a digit. Define «valid_pin(pin)» which returns «True» or «False».

          «valid_pin("1234")» gives «True». «valid_pin("12a4")» gives «False». «valid_pin("12345")» gives «False».
        `,
        starter: py`
          def valid_pin(pin):

        `,
        hints: [
          md`Two things must both be true. What are they?`,
          md`«pin.isdigit()» is True when every character is a digit (and the text is not empty). Join the two checks with «and».`,
          md`«return (len(pin) == 4 or len(pin) == 6) and pin.isdigit()»`,
        ],
        solution: py`
          def valid_pin(pin):
              return (len(pin) == 4 or len(pin) == 6) and pin.isdigit()
        `,
        tests: [
          {
            py: py`
              expect("valid_pin", ("1234",), True)
              expect("valid_pin", ("12a4",), False)
              expect("valid_pin", ("123456",), True)
              expect("valid_pin", ("12345",), False)
              expect("valid_pin", ("",), False)
              expect("valid_pin", ("0000",), True)
              expect("valid_pin", ("12 34",), False)
              expect("valid_pin", ("12 3",), False)
              expect("valid_pin", ("12a456",), False)
            `,
          },
        ],
        wrong: [
          py`
            def valid_pin(pin):
                return len(pin) == 4 and pin.isdigit()
          `,
          py`
            def valid_pin(pin):
                return len(pin) == 4 or len(pin) == 6 and pin.isdigit()
          `,
        ],
      },
      {
        id: "text-stats",
        optional: true,
        title: "Text statistics",
        task: md`
          Define «stats(text)» which returns a **dictionary** with three keys:

          - «"words"»: how many words there are
          - «"letters"»: how many letters there are (count only characters where «ch.isalpha()» is True, so no spaces or punctuation)
          - «"longest"»: the longest word (if two words have the same length, the first one)

          A word is whatever «.split()» gives you, so punctuation stays with it. In «Hi, there!» the longest word is «there!».

          So «stats("I love Python")» gives back «{"words": 3, "letters": 11, "longest": "Python"}».
        `,
        starter: py`
          def stats(text):

        `,
        hints: [
          md`«words = text.split()» gives the word count with «len(words)».`,
          md`Count letters with a loop over «text» and «if ch.isalpha():».`,
          md`For the longest word, loop over «words», keeping the best so far. Replace it only when a word is longer, not when it is the same length.`,
        ],
        solution: py`
          def stats(text):
              words = text.split()
              letters = 0
              for ch in text:
                  if ch.isalpha():
                      letters += 1
              longest = ""
              for word in words:
                  if len(word) > len(longest):
                      longest = word
              return {"words": len(words), "letters": letters, "longest": longest}
        `,
        tests: [
          {
            py: py`
              expect("stats", ("I love Python",), {"words": 3, "letters": 11, "longest": "Python"})
              expect("stats", ("a bb cc",), {"words": 3, "letters": 5, "longest": "bb"})
              expect("stats", ("Hi, there!",), {"words": 2, "letters": 7, "longest": "there!"})
              expect("stats", ("",), {"words": 0, "letters": 0, "longest": ""})
            `,
          },
        ],
        wrong: [py`
          def stats(text):
              words = text.split()
              letters = len(text.replace(" ", ""))
              longest = ""
              for word in words:
                  if len(word) > len(longest):
                      longest = word
              return {"words": len(words), "letters": letters, "longest": longest}
        `],
      },
      {
        id: "contact-funcs",
        stage: 1,
        title: "Contact book stage 1: two functions",
        task: md`
          Write two functions. Here «<name>» and «<number>» mean the name and number given to the function.

          - «add_contact(contacts, name, number)» stores the number under the name in the «contacts» dictionary, and returns «Saved <name>».
          - «find_contact(contacts, name)» returns «<name>: <number>», or «<name> not found».

          So after «add_contact(book, "Asha", "98765")», «find_contact(book, "Asha")» gives «"Asha: 98765"» and «find_contact(book, "John")» gives «"John not found"».
        `,
        starter: py`
          # Write add_contact and find_contact here

        `,
        hints: [
          md`«add_contact» needs two lines: one stores, one returns. «find_contact» needs an «if» and an «else».`,
          md`Store with «contacts[name] = number». Check with «if name in contacts:».`,
          md`«return f"{name}: {contacts[name]}"», and in the «else»: «return f"{name} not found"».`,
        ],
        solution: py`
          def add_contact(contacts, name, number):
              contacts[name] = number
              return f"Saved {name}"

          def find_contact(contacts, name):
              if name in contacts:
                  return f"{name}: {contacts[name]}"
              else:
                  return f"{name} not found"
        `,
        tests: [
          {
            py: py`
              need("add_contact", "function")
              need("find_contact", "function")
              book = {}
              got = add_contact(book, "Asha", "98765")
              assert got == "Saved Asha", f"«add_contact» should return «Saved Asha», not «{got}»."
              assert book == {"Asha": "98765"}, "«add_contact» should store the number in the dictionary under the name."
              expect("find_contact", (book, "Asha"), "Asha: 98765")
              expect("find_contact", (book, "John"), "John not found")
              expect("find_contact", ({}, "Ravi"), "Ravi not found")
            `,
          },
          {
            py: py`
              book = {}
              add_contact(book, "Ravi", "222")
              add_contact(book, "Ravi", "333")
              got = find_contact(book, "Ravi")
              assert got == "Ravi: 333", f"After saving Ravi twice, the new number should replace the old one. Got «{got}»."
            `,
          },
        ],
        wrong: [py`
          def add_contact(contacts, name, number):
              contacts[name] = number
              return f"Saved {name}"

          def find_contact(contacts, name):
              return f"{name}: {contacts[name]}"
        `, py`
          def add_contact(contacts, name, number):
              contacts[name] = number
              print(f"Saved {name}")

          def find_contact(contacts, name):
              if name in contacts:
                  return f"{name}: {contacts[name]}"
              else:
                  return f"{name} not found"
        `],
      },
      {
        id: "contact-book",
        stage: 2,
        carry: "contact-funcs",
        title: "Contact book stage 2: the command loop",
        task: md`
          Start from your stage 1 functions. Add a contact book that keeps asking for commands, and uses your two functions:

          - «add <name> <number>» saves the number and prints «Saved <name>»
          - «find <name>» prints «<name>: <number>», or «<name> not found»
          - «quit» prints «Bye!» and stops
          - anything else prints «Unknown command». This includes «add Asha» with no number, «find» with no name, and an empty line.

          For the commands «add Asha 98765», «find Asha», «find John», «quit»:

          | Saved Asha
          | Asha: 98765
          | John not found
          | Bye!
        `,
        starter: py`
          def add_contact(contacts, name, number):
              contacts[name] = number
              return f"Saved {name}"

          def find_contact(contacts, name):
              if name in contacts:
                  return f"{name}: {contacts[name]}"
              else:
                  return f"{name} not found"

          contacts = {}
        `,
        hints: [
          md`Loop with «while True:» and split each command: «parts = input("> ").split()».`,
          md`Check the number of words with «len(parts)» and the command with «parts[0]». For example: «if len(parts) == 3 and parts[0] == "add":».`,
          md`For «add»: «print(add_contact(contacts, parts[1], parts[2]))». For «find»: «print(find_contact(contacts, parts[1]))». After «quit», use «break».`,
        ],
        solution: py`
          def add_contact(contacts, name, number):
              contacts[name] = number
              return f"Saved {name}"

          def find_contact(contacts, name):
              if name in contacts:
                  return f"{name}: {contacts[name]}"
              else:
                  return f"{name} not found"

          contacts = {}
          while True:
              parts = input("> ").split()
              if len(parts) == 3 and parts[0] == "add":
                  print(add_contact(contacts, parts[1], parts[2]))
              elif len(parts) == 2 and parts[0] == "find":
                  print(find_contact(contacts, parts[1]))
              elif len(parts) == 1 and parts[0] == "quit":
                  print("Bye!")
                  break
              else:
                  print("Unknown command")
        `,
        tests: [
          { inputs: ["add Asha 98765", "find Asha", "find John", "quit"], output: "Saved Asha\nAsha: 98765\nJohn not found\nBye!" },
          { inputs: ["add Asha 111", "add Ravi 222", "add Asha 333", "find Asha", "find Ravi", "quit"], output: "Saved Asha\nSaved Ravi\nSaved Asha\nAsha: 333\nRavi: 222\nBye!" },
          { inputs: ["hello", "quit"], output: "Unknown command\nBye!" },
          { inputs: ["quit"], output: "Bye!" },
          { inputs: ["add Asha", "find", "", "quit"], output: "Unknown command\nUnknown command\nUnknown command\nBye!" },
          {
            inputs: ["quit"],
            py: py`
              text = CODE.replace(" ", "")
              assert text.count("add_contact(") >= 2 and text.count("find_contact(") >= 2, "Call «add_contact» and «find_contact» inside your loop, so the functions do the work."
            `,
          },
        ],
        wrong: [py`
          def add_contact(contacts, name, number):
              contacts[name] = number
              return f"Saved {name}"

          def find_contact(contacts, name):
              if name in contacts:
                  return f"{name}: {contacts[name]}"
              else:
                  return f"{name} not found"

          contacts = {}
          while True:
              parts = input("> ").split()
              if parts[0] == "add":
                  print(add_contact(contacts, parts[1], parts[2]))
              elif parts[0] == "find":
                  print(find_contact(contacts, parts[1]))
              elif parts[0] == "quit":
                  print("Bye!")
                  break
              else:
                  print("Unknown command")
        `, py`
          def add_contact(contacts, name, number):
              contacts[name] = number
              return f"Saved {name}"

          def find_contact(contacts, name):
              if name in contacts:
                  return f"{name}: {contacts[name]}"
              else:
                  return f"{name} not found"

          contacts = {}
          while True:
              parts = input("> ").split()
              if len(parts) == 3 and parts[0] == "add":
                  add_contact(contacts, parts[1], parts[2])
              elif len(parts) == 2 and parts[0] == "find":
                  find_contact(contacts, parts[1])
              elif len(parts) == 1 and parts[0] == "quit":
                  print("Bye!")
                  break
              else:
                  print("Unknown command")
        `],
      },
      {
        id: "bug-winner",
        kind: "bug",
        optional: true,
        title: "Bug Clinic: the winner stops with an error",
        task: md`
          «winner(votes)» should give back the drink with the most votes. If two drinks have the same count, it keeps the first one. Run it: it stops with a KeyError. Tap the faulty line, then fix it. The program should print:

          | coffee
        `,
        starter: py`
          def winner(votes):
              best = None
              for drink, count in votes.items():
                  if count > votes[best] or best is None:
                      best = drink
              return best

          print(winner({"tea": 3, "coffee": 5}))
        `,
        bugLines: [4],
        solution: py`
          def winner(votes):
              best = None
              for drink, count in votes.items():
                  if best is None or count > votes[best]:
                      best = drink
              return best

          print(winner({"tea": 3, "coffee": 5}))
        `,
        tests: [
          { output: "coffee" },
          {
            py: py`
              expect("winner", ({"chai": 1},), "chai")
              expect("winner", ({"tea": 2, "coffee": 2, "juice": 1},), "tea")
              expect("winner", ({"tea": 1, "coffee": 2, "juice": 4},), "juice")
            `,
          },
        ],
        wrong: [py`
          def winner(votes):
              best = None
              for drink, count in votes.items():
                  if best is None or count >= votes[best]:
                      best = drink
              return best

          print(winner({"tea": 3, "coffee": 5}))
        `],
        hints: [
          md`Read the error. In the first round, «best» is «None». What is «votes[None]»?`,
          md`Python checks the left side of «or» first. On line 4 the left side is «count > votes[best]», and «best» is still «None».`,
          md`Swap the two sides: «if best is None or count > votes[best]:».`,
        ],
      },
      {
        id: "bug-bill",
        kind: "bug",
        title: "Bug Clinic: the bill is None",
        task: md`
          «bill_total(menu, order)» should give back the total price of the order. The program should print:

          | Pay: 42

          It prints «42» and then «Pay: None». Tap the faulty line, then fix it.
        `,
        starter: py`
          def bill_total(menu, order):
              total = 0
              for item in order:
                  total += menu[item]
              print(total)

          menu = {"tea": 15, "samosa": 12}
          print("Pay:", bill_total(menu, ["tea", "samosa", "tea"]))
        `,
        bugLines: [5],
        solution: py`
          def bill_total(menu, order):
              total = 0
              for item in order:
                  total += menu[item]
              return total

          menu = {"tea": 15, "samosa": 12}
          print("Pay:", bill_total(menu, ["tea", "samosa", "tea"]))
        `,
        tests: [
          { output: "Pay: 42" },
          {
            py: py`
              expect("bill_total", ({"tea": 15}, []), 0)
              expect("bill_total", ({"tea": 15, "vada pav": 20}, ["vada pav", "vada pav"]), 40)
              expect("bill_total", ({"chai": 10}, ["chai"]), 10)
            `,
          },
        ],
        wrong: [py`
          def bill_total(menu, order):
              total = 0
              for item in order:
                  total = menu[item]
              return total

          menu = {"tea": 15, "samosa": 12}
          print("Pay:", bill_total(menu, ["tea", "samosa", "tea"]))
        `],
        hints: [
          md`A function with no «return» gives back «None».`,
          md`Line 5 shows the total, but does not give it back.`,
          md`Change «print(total)» to «return total».`,
        ],
      },
    ],
    keys: [
      md`A command loop: read a line, «.split()» it, check the number of words and the first word, repeat.`,
      md`Check «len(parts)» before you use «parts[1]», or Python stops with an IndexError.`,
      md`An empty list, an empty text and 0 are treated as False: «if not parts:».`,
      md`A function can change a dictionary you give it, and can return dictionaries, lists and tuples.`,
    ],
  });
})();
