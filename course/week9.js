// Week 9 — Tables and Grids (Days 57 to 63).
// Day 57 reads values stored inside values. Days 58 to 60 build tables of
// records: lists of dictionaries, grouping them, and functions that take them.
// Days 61 and 62 are grids (lists inside a list), and Day 63 uses all of it
// in a Tic-Tac-Toe referee.
(function () {
  const { day, md, py, ex, code, tip, warn, ask, pause } = window.Course;

  // ---------------------------------------------------------------- Day 57
  day({
    slug: "two-lookups-in-a-row",
    title: "Two Lookups in a Row",
    goal: "Read values stored inside values, one bracket at a time.",
    minutes: 40,
    kind: "lesson",
    needs: [22, 29],
    win: "Today you can now read and change a value inside a value, one bracket at a time.",
    learn: [
      md`
        ## A list inside a dictionary

        A dictionary value can be any value, even a whole list. Here each student's name is a key, and the value is a list of test marks. Guess what the two lines print.
      `,
      ex(py`
        marks = {"Asha": [72, 65, 80], "Ravi": [55, 90, 61]}
        print(marks["Ravi"])
        print(marks["Ravi"][1])
      `, { predict: ["[55, 90, 61]\n90", "[55, 90, 61]\n55", "[72, 65, 80]\n65"], answer: 0 }),
      md`
        Python reads «marks["Ravi"][1]» from **left to right**, one bracket at a time. The first bracket «["Ravi"]» finds Ravi's list. The second bracket «[1]» then picks position 1 from that list.
      `,
      ask({
        q: md`In «marks["Asha"][2]», what does the first bracket give?`,
        options: ["Asha's whole list of marks", "The mark at position 2", "The name Asha"],
        answer: 0,
        explain: md`«marks["Asha"]» gives the list «[72, 65, 80]». Then «[2]» picks 80 from it.`,
        why: [null, md`That is what the second bracket picks, after the first bracket has run.`, md`«"Asha"» is the key you look up. The lookup gives the value, not the key.`],
      }),
      md`
        ## A dictionary inside a dictionary

        A value can also be another dictionary. The outer dictionary has one key for each city. Each inner dictionary has one price for each snack. Guess what this prints.
      `,
      ex(py`
        prices = {
            "Pune": {"chai": 15, "samosa": 20},
            "Delhi": {"chai": 12, "samosa": 18},
        }
        print(prices["Delhi"]["samosa"])
        prices["Pune"]["chai"] = 17
        print(prices["Pune"])
      `, { predict: ["18\n{'chai': 17, 'samosa': 20}", "20\n{'chai': 17, 'samosa': 20}", "18\n{'chai': 15, 'samosa': 20}"], answer: 0 }),
      md`
        «prices["Delhi"]» finds Delhi's inner dictionary, and «["samosa"]» finds 18 inside it. To **change an inner value**, use both brackets on the left of «=». The first bracket finds the inner dictionary, and «=» changes one value inside it.
      `,
      md`
        ## Which bracket went wrong?

        With two brackets, an error can come from either one. Read the error name to know which. Guess what happens here.
      `,
      ex(py`
        marks = {"Asha": [72, 65, 80]}
        print(marks["Asha"][3])
      `, { error: true, label: "A crash on purpose", predict: ["IndexError", "KeyError", "80"], answer: 0 }),
      md`
        The key «"Asha"» is there, so the first bracket works. The list has positions 0, 1 and 2 only, so «[3]» fails with **IndexError**. A **KeyError** means a key is missing: check the key in each bracket, and the order of the brackets.
      `,
      ask({
        q: md`«print(marks["asha"][0])» stops with «KeyError: 'asha'». Which bracket failed?`,
        options: ['The first one: the key «"asha"» is not in the dictionary', "The second one: position 0 does not exist", "Neither: print failed"],
        answer: 0,
        explain: md`The key is «"Asha"» with a capital A. Capital letters matter in keys, so the first lookup fails.`,
        why: [null, md`A missing position gives IndexError. The error here names a key.`, md`The error names the key «'asha'», so the dictionary lookup failed.`],
      }),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          d = {"Pune": [15, 20], "Agra": [10, 12]}
          print(d["Agra"][0] + d["Pune"][1])
        `, options: ["30", "27", "25"], answer: 0,
        explain: md`«d["Agra"][0]» is 10 and «d["Pune"][1]» is 20. Together they make 30.`,
        why: [null, md`That adds 15 and 12: the cities are swapped. Read the key in the first bracket.`, md`That adds 10 and 15. The second bracket of Pune is 1, so it picks 20.`],
        skill: "trace" },
      { q: md`What happens?`, code: py`
          m = {"Asha": [72, 65]}
          print(m["asha"][0])
        `, options: ["KeyError", "IndexError", "72"], answer: 0, error: true,
        explain: md`The key is «"Asha"» with a capital A. The first bracket asks for «"asha"», which is not a key.`,
        why: [null, md`IndexError comes from a position. Here Python never reaches the second bracket.`, md`Capital letters matter, so «"asha"» does not find Asha.`],
        skill: "debug" },
      { q: md`How does Python work out «d[a][b]»?`,
        options: ["It finds «d[a]» first, then looks up «[b]» in that result", "It looks up «[b]» first, then «[a]»", "It looks up «a» and «b» in «d» at the same time"], answer: 0,
        explain: md`Python reads from left to right, one bracket at a time.`,
        why: [null, md`The order is left to right. The second bracket works on what the first one gave.`, md`Only the first key is looked up in «d». The second is looked up in the inner value.`],
        skill: "memory" },
      { q: md`What does this program do?`, code: py`
          marks = {"Asha": [72, 65, 80], "Ravi": [55, 90]}
          for name in marks:
              print(name, marks[name][-1])
        `, options: ["It prints each student's name and last mark", "It prints each student's first mark", "It prints the highest mark of each student"],
        answer: 0, verify: false, mono: false,
        explain: md`The loop gives each key. «marks[name]» is that student's list, and «[-1]» is its last item.`,
        why: [null, md`The first mark would be «[0]». The index «-1» counts from the end.`, md`The program never compares marks. It only picks the last one in each list.`],
        skill: "read" },
      { q: md`«prices = {"Pune": {"samosa": 20}}». Which line changes the samosa price in Pune to 22?`,
        options: ['«prices["Pune"]["samosa"] = 22»', '«prices["samosa"]["Pune"] = 22»', '«prices["Pune"] = 22»'], answer: 0,
        explain: md`The outer key comes first, then the inner key. Then «=» changes the inner value.`,
        why: [null, md`«"samosa"» is not a key of the outer dictionary, so this gives KeyError.`, md`This replaces Pune's whole inner dictionary with the number 22.`],
        skill: "write" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: cricket scores",
        task: md`Each player has a list of runs. Answer each question without running the program.`,
        code: py`
          runs = {"Kohli": [45, 12, 88], "Rohit": [30, 101, 7]}
          best = runs["Rohit"][1]
          runs["Kohli"][0] = 50
          both = runs["Kohli"][0] + runs["Rohit"][2]
          print(best, both)
        `,
        inputs: [],
        ask: [{ line: 2, name: "best" }, { line: 4, name: "both" }, { output: true }],
        hints: [
          md`Find the player first, then count positions from 0 in that player's list.`,
          md`Line 3 changes Kohli's first score before line 4 reads it.`,
          md`On line 4, Kohli's first score is now 50, and Rohit's position 2 holds 7.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: chai cups by city",
        task: md`Each city has an inner dictionary of cups sold. Answer without running the program.`,
        code: py`
          sold = {"Pune": {"chai": 10, "vada": 4}, "Agra": {"chai": 6, "vada": 9}}
          total = 0
          for city in sold:
              total += sold[city]["chai"]
          sold["Agra"]["vada"] -= 2
          print(total, sold["Agra"])
        `,
        inputs: [],
        ask: [{ line: 4, name: "total" }, { line: 4, hit: 2, name: "total" }, { output: true }],
        hints: [
          md`The loop gives the city names in the order they were added: Pune first.`,
          md`Each time line 4 runs, it adds that city's chai number to the total.`,
          md`Line 5 takes 2 away from Agra's vada number. Then the whole inner dictionary of Agra is printed.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: correct one mark",
        task: md`
          Meena's second mark was entered wrongly as 48. It should be 58. Put the lines in order so the program prints:

          | Old: 48
          | New: 58
        `,
        solution: py`
          marks = {"Meena": [61, 48, 77]}
          old = marks["Meena"][1]
          marks["Meena"][1] = 58
          print("Old:", old)
          print("New:", marks["Meena"][1])
        `,
        distractors: ['marks[1]["Meena"] = 58', 'old = marks["Meena"]'],
        indent: "given",
        tests: [{ output: "Old: 48\nNew: 58" }],
        hints: [
          md`The dictionary must exist before any line uses it.`,
          md`Keep the old mark in a name before you change it.`,
          md`The name of the student goes in the first bracket, and the position in the second.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the fee lookup",
        task: md`
          The program asks for a class and a fee name, then prints that fee. For class «10» and fee «bus» it should print «350». Instead it stops with «KeyError: 'bus'».

          Read the error. Which bracket was given «"bus"»? Fix the one wrong line.
        `,
        starter: py`
          fees = {
              "9": {"tuition": 800, "bus": 300},
              "10": {"tuition": 900, "bus": 350},
          }
          grade = input("Class: ")
          part = input("Fee: ")
          print(fees[part][grade])
        `,
        bugLines: [7],
        solution: py`
          fees = {
              "9": {"tuition": 800, "bus": 300},
              "10": {"tuition": 900, "bus": 350},
          }
          grade = input("Class: ")
          part = input("Fee: ")
          print(fees[grade][part])
        `,
        tests: [
          { inputs: ["10", "bus"], output: "350" },
          { inputs: ["9", "tuition"], output: "800" },
          { inputs: ["9", "bus"], output: "300" },
          { inputs: ["10", "tuition"], output: "900" },
        ],
        wrong: [py`
          fees = {
              "9": {"tuition": 800, "bus": 300},
              "10": {"tuition": 900, "bus": 350},
          }
          grade = input("Class: ")
          part = input("Fee: ")
          print(fees[grade]["tuition"])
        `, py`
          fees = {
              "9": {"tuition": 800, "bus": 300},
              "10": {"tuition": 900, "bus": 350},
          }
          grade = input("Class: ")
          part = input("Fee: ")
          print(fees["10"][part])
        `],
        hints: [
          md`A KeyError names the key that was not found. The outer dictionary has the classes as keys, not the fee names.`,
          md`The last line looks up the two answers in the wrong order.`,
          md`The class goes in the first bracket, and the fee name goes in the second bracket.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: the latest mark", optional: true,
        task: md`
          This program prints a student's first test mark. Change it so it prints the **last** mark in that student's list, however long the list is. For «Asha» it shows:

          | Asha latest test: 80
        `,
        starter: py`
          marks = {"Asha": [72, 65, 80], "Ravi": [55, 90], "Kiran": [47]}
          name = input("Name: ")
          print(name, "first test:", marks[name][0])
        `,
        solution: py`
          marks = {"Asha": [72, 65, 80], "Ravi": [55, 90], "Kiran": [47]}
          name = input("Name: ")
          print(name, "latest test:", marks[name][-1])
        `,
        tests: [
          { inputs: ["Asha"], output: "Asha latest test: 80" },
          { inputs: ["Ravi"], output: "Ravi latest test: 90" },
          { inputs: ["Kiran"], output: "Kiran latest test: 47" },
        ],
        wrong: [py`
          marks = {"Asha": [72, 65, 80], "Ravi": [55, 90], "Kiran": [47]}
          name = input("Name: ")
          print(name, "latest test:", marks[name][2])
        `],
        hints: [
          md`The lists have different lengths, so one fixed position from the start will not work for all of them.`,
          md`Change the second bracket on the last line, and the words before it.`,
          md`A negative position counts from the end of the list. Minus one is the last item.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: update a test mark",
        task: md`
          Start with this dictionary:

          : marks = {"Asha": [72, 65, 80], "Ravi": [55, 90, 61], "Meena": [48]}

          Ask for a name, a test number and a new mark. Test number 1 is the first test. Change that mark inside the dictionary, then print the name and the student's whole list. For «Asha», «2» and «70» it shows:

          | Asha: [72, 70, 80]
        `,
        starter: py`

        `,
        solution: py`
          marks = {"Asha": [72, 65, 80], "Ravi": [55, 90, 61], "Meena": [48]}
          name = input("Name: ")
          test = int(input("Test number: "))
          new = int(input("New mark: "))
          marks[name][test - 1] = new
          print(f"{name}: {marks[name]}")
        `,
        tests: [
          { inputs: ["Asha", "2", "70"], output: "Asha: [72, 70, 80]" },
          { inputs: ["Ravi", "3", "66"], output: "Ravi: [55, 90, 66]" },
          { inputs: ["Meena", "1", "50"], output: "Meena: [50]" },
          { inputs: ["Ravi", "1", "0"], output: "Ravi: [0, 90, 61]" },
        ],
        wrong: [py`
          marks = {"Asha": [72, 65, 80], "Ravi": [55, 90, 61], "Meena": [48]}
          name = input("Name: ")
          test = int(input("Test number: "))
          new = int(input("New mark: "))
          marks[name][test] = new
          print(f"{name}: {marks[name]}")
        `, py`
          marks = {"Asha": [72, 65, 80], "Ravi": [55, 90, 61], "Meena": [48]}
          name = input("Name: ")
          test = int(input("Test number: "))
          new = int(input("New mark: "))
          marks[name] = [new]
          print(f"{name}: {marks[name]}")
        `, py`
          marks = {"Asha": [72, 65, 80], "Ravi": [55, 90, 61], "Meena": [48]}
          name = input("Name: ")
          test = int(input("Test number: "))
          new = int(input("New mark: "))
          marks[name].append(new)
          print(f"{name}: {marks[name]}")
        `, py`
          marks = {"Asha": [72, 65, 80], "Ravi": [55, 90, 61], "Meena": [48]}
          name = input("Name: ")
          test = int(input("Test number: "))
          new = input("New mark: ")
          marks[name][test - 1] = new
          print(f"{name}: {marks[name]}")
        `],
        hints: [
          md`Three questions, one change, one print. The test number and the mark must become whole numbers.`,
          md`The change uses two brackets: the name first, then the position.`,
          md`Test number 1 is position 0, so take one away from the test number for the position.`,
        ],
      },
    ],
    keys: [
      md`A dictionary value can be a list or another dictionary.`,
      md`Python reads «d[a][b]» from left to right: first «d[a]», then «[b]» inside that.`,
      md`Use both brackets on the left of «=» to change one inner value.`,
      md`KeyError means a key in one bracket is missing. IndexError means a position is past the end of a list.`,
    ],
  });

  // ---------------------------------------------------------------- Day 58
  day({
    slug: "table-of-records",
    title: "A Table of Records",
    goal: "Store a table of students as a list of dictionaries.",
    minutes: 40,
    kind: "lesson",
    needs: [24, 30, 57],
    win: "Today you can now keep a table of students as a list of records, and total one field for the rows you choose.",
    learn: [
      md`
        ## One record, many records

        A **record** is a dictionary that holds the facts about one thing, such as one student. Each key of a record is a **field**: «name», «city» or «marks». A list of records makes a **table**, like a register with one row for each student.
      `,
      ex(py`
        students = [
            {"name": "Asha", "city": "Pune", "marks": 72},
            {"name": "Ravi", "city": "Delhi", "marks": 55},
            {"name": "Meena", "city": "Pune", "marks": 81},
        ]
        print(len(students))
        print(students[1]["name"])
      `, { predict: ["3\nRavi", "3\nAsha", "9\nRavi"], answer: 0 }),
      md`
        «len» counts the records, not the fields, so it gives 3. «students[1]» is one whole record, the second row. Then «["name"]» picks one field from that record: two lookups in a row, as on Day 57.
      `,
      md`
        ## Looping over records

        A «for» loop over the table gives one whole record each time. Inside the loop, pick the fields you need. Here an «if» keeps only the students from Pune, and the loop adds up their marks.
      `,
      ex(py`
        students = [
            {"name": "Asha", "city": "Pune", "marks": 72},
            {"name": "Ravi", "city": "Delhi", "marks": 55},
            {"name": "Meena", "city": "Pune", "marks": 81},
        ]
        count = 0
        total = 0
        for s in students:
            if s["city"] == "Pune":
                count += 1
                total += s["marks"]
        print(count, total)
      `, { predict: ["2 153", "3 208", "2 72"], answer: 0 }),
      ask({
        q: md`In this loop, what is «s» the first time round?`,
        options: ["Asha's whole record, a dictionary", 'The name «"Asha"»', "The number 72"],
        answer: 0,
        explain: md`The table is a list of dictionaries, so each item is one whole record. «s["marks"]» then picks one field.`,
        why: [null, md`The name is only one field. You get it with «s["name"]».`, md`The mark is one field. You get it with «s["marks"]».`],
      }),
      md`
        ## A common mistake

        Beginners often ask the whole table for a field. Guess what happens.
      `,
      ex(py`
        students = [
            {"name": "Asha", "city": "Pune", "marks": 72},
            {"name": "Ravi", "city": "Delhi", "marks": 55},
        ]
        print(students["marks"])
      `, { error: true, label: "A crash on purpose", predict: ["TypeError", "KeyError", "[72, 55]"], answer: 0 }),
      md`
        The table is a list, and a list has positions, not keys. So «students["marks"]» gives a TypeError. Ask one record for a field: «students[0]["marks"]», or «s["marks"]» inside the loop.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          students = [
              {"name": "Asha", "city": "Pune"},
              {"name": "Ravi", "city": "Delhi"},
              {"name": "Sara", "city": "Agra"},
          ]
          print(students[2]["city"])
        `, options: ["Agra", "Delhi", "Sara"], answer: 0,
        explain: md`Position 2 is the third record, Sara's. Its «city» field is Agra.`,
        why: [null, md`Positions start at 0, so position 2 is the third record, not the second.`, md`«["city"]» picks the city field, not the name.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          n = 0
          for s in students:
              if s["city"] == "Agra":
                  n += 1
          print(n)
        `, options: ["It counts the students who live in Agra", "It adds up the marks of students from Agra", "It prints the names of students from Agra"],
        answer: 0, verify: false, mono: false,
        explain: md`«n» goes up by 1 for each record whose city is Agra. No marks or names are used.`,
        why: [null, md`It adds 1 each time, not a mark.`, md`It prints only one number at the end.`],
        skill: "read" },
      { q: md`What happens?`, code: py`
          students = [{"name": "Asha", "marks": 72}]
          print(students["name"])
        `, options: ["TypeError", "KeyError", "Asha"], answer: 0, error: true,
        explain: md`«students» is a list. A list needs a position number, such as «students[0]», before you ask for a field.`,
        why: [null, md`KeyError comes from a dictionary. Here the first bracket is used on a list.`, md`The table is a list, so Python cannot look up «"name"» in it.`],
        skill: "debug" },
      { q: md`What is a **record**?`,
        options: ["A dictionary that holds the facts about one thing", "A list of all the marks", 'One key, such as «"city"»'], answer: 0,
        explain: md`One record is one row of the table. A list of records is the whole table.`,
        why: [null, md`A list of numbers has no field names. A record keeps each fact under a key.`, md`One key is a field. A record holds several fields.`],
        skill: "memory" },
      { q: md`Inside «for s in students:», which line adds one student's marks to «total»?`,
        options: ['«total += s["marks"]»', '«total += students["marks"]»', "«total += s»"], answer: 0,
        explain: md`«s» is the record for this round, and «["marks"]» picks its marks.`,
        why: [null, md`This asks the whole list for a field, which gives TypeError.`, md`«s» is a whole dictionary. A number cannot be added to a dictionary.`],
        skill: "write" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: big scores",
        task: md`Each record is one batsman. Answer each question without running the program.`,
        code: py`
          team = [
              {"name": "Kohli", "runs": 45},
              {"name": "Rohit", "runs": 12},
              {"name": "Gill", "runs": 70},
          ]
          big = 0
          count = 0
          for p in team:
              if p["runs"] >= 40:
                  big += p["runs"]
                  count += 1
          print(big, count)
        `,
        inputs: [],
        ask: [{ line: 10, name: "big" }, { line: 10, hit: 2, name: "big" }, { output: true }],
        hints: [
          md`Go through the records in order. Only the ones with 40 runs or more reach line 10.`,
          md`Rohit has fewer than 40 runs, so line 10 does not run for him.`,
          md`The first time line 10 runs, it is for Kohli. The second time, it is for Gill.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: the chai stall bill",
        task: md`Each record is one item on the menu. Answer without running the program.`,
        code: py`
          menu = [{"item": "chai", "price": 15}, {"item": "samosa", "price": 20}]
          first = menu[0]["item"]
          menu[1]["price"] += 5
          bill = 0
          for row in menu:
              bill += row["price"] * 2
          print(first, bill)
        `,
        inputs: [],
        ask: [{ line: 2, name: "first" }, { line: 6, hit: 2, name: "bill" }, { output: true }],
        hints: [
          md`Position 0 is the first record. Pick its item field.`,
          md`Line 3 makes the samosa price bigger before the loop starts.`,
          md`The bill is two cups of chai plus two samosas at the new price.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: the Delhi total",
        task: md`
          Put the lines in order and set each indent. The program adds up the marks of the students from Delhi only, and prints:

          | Delhi total: 134
        `,
        solution: py`
          students = [{"name": "Asha", "city": "Delhi", "marks": 70}, {"name": "Ravi", "city": "Agra", "marks": 50}, {"name": "Sara", "city": "Delhi", "marks": 64}]
          total = 0
          for s in students:
              if s["city"] == "Delhi":
                  total += s["marks"]
          print("Delhi total:", total)
        `,
        distractors: ['total += students["marks"]', 'if city == "Delhi":'],
        indent: "choose",
        tests: [{ output: "Delhi total: 134" }],
        hints: [
          md`The table and the starting total come before the loop.`,
          md`The check of the city is inside the loop, and the adding is inside the check.`,
          md`Ask the loop's record for its fields, never the whole list. The print is not indented.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the Pune total",
        task: md`
          «total_marks(table, city)» should add up the marks of the students from one city. For the table below and «"Pune"» it should print «153», but it prints «81». Fix the one wrong line.
        `,
        starter: py`
          def total_marks(table, city):
              total = 0
              for s in table:
                  if s["city"] == city:
                      total = s["marks"]
              return total

          students = [
              {"name": "Asha", "city": "Pune", "marks": 72},
              {"name": "Ravi", "city": "Delhi", "marks": 55},
              {"name": "Meena", "city": "Pune", "marks": 81},
          ]
          print(total_marks(students, "Pune"))
        `,
        bugLines: [5],
        solution: py`
          def total_marks(table, city):
              total = 0
              for s in table:
                  if s["city"] == city:
                      total += s["marks"]
              return total

          students = [
              {"name": "Asha", "city": "Pune", "marks": 72},
              {"name": "Ravi", "city": "Delhi", "marks": 55},
              {"name": "Meena", "city": "Pune", "marks": 81},
          ]
          print(total_marks(students, "Pune"))
        `,
        tests: [
          { output: "153" },
          { py: py`expect("total_marks", ([], "Pune"), 0)` },
          { py: py`expect("total_marks", ([{"name": "Kiran", "city": "Agra", "marks": 40}], "Agra"), 40)` },
          { py: py`expect("total_marks", ([{"name": "A", "city": "Goa", "marks": 10}, {"name": "B", "city": "Goa", "marks": 20}, {"name": "C", "city": "Goa", "marks": 30}, {"name": "D", "city": "Pune", "marks": 99}], "Goa"), 60)` },
          { py: py`expect("total_marks", ([{"name": "A", "city": "Goa", "marks": 10}], "Pune"), 0)` },
        ],
        wrong: [py`
          def total_marks(table, city):
              total = 0
              for s in table:
                  if s["city"] == city:
                      total += 1
              return total

          students = [
              {"name": "Asha", "city": "Pune", "marks": 72},
              {"name": "Ravi", "city": "Delhi", "marks": 55},
              {"name": "Meena", "city": "Pune", "marks": 81},
          ]
          print(total_marks(students, "Pune"))
        `, py`
          def total_marks(table, city):
              total = 0
              for s in table:
                  if s["city"] == city:
                      total = total + 72
              return total

          students = [
              {"name": "Asha", "city": "Pune", "marks": 72},
              {"name": "Ravi", "city": "Delhi", "marks": 55},
              {"name": "Meena", "city": "Pune", "marks": 81},
          ]
          print(total_marks(students, "Pune"))
        `],
        hints: [
          md`81 is Meena's mark alone. The total forgets Asha's mark when it reaches Meena.`,
          md`The line inside the if replaces the total each time. It does not add to it.`,
          md`Use the add-to shortcut in place of the plain equals sign on that line.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: who passed?", optional: true,
        task: md`
          This program prints every name. Change it so it first asks for a pass mark. Then it prints only the names of the students with marks **at or above** that pass mark. Last, it prints a count. For «60» it shows:

          | Asha
          | Meena
          | Count: 2
        `,
        starter: py`
          students = [
              {"name": "Asha", "city": "Pune", "marks": 72},
              {"name": "Ravi", "city": "Delhi", "marks": 55},
              {"name": "Meena", "city": "Pune", "marks": 81},
              {"name": "Kiran", "city": "Agra", "marks": 33},
          ]
          for s in students:
              print(s["name"])
        `,
        solution: py`
          students = [
              {"name": "Asha", "city": "Pune", "marks": 72},
              {"name": "Ravi", "city": "Delhi", "marks": 55},
              {"name": "Meena", "city": "Pune", "marks": 81},
              {"name": "Kiran", "city": "Agra", "marks": 33},
          ]
          pass_mark = int(input("Pass mark: "))
          count = 0
          for s in students:
              if s["marks"] >= pass_mark:
                  print(s["name"])
                  count += 1
          print("Count:", count)
        `,
        tests: [
          { inputs: ["60"], output: "Asha\nMeena\nCount: 2" },
          { inputs: ["33"], output: "Asha\nRavi\nMeena\nKiran\nCount: 4" },
          { inputs: ["81"], output: "Meena\nCount: 1" },
          { inputs: ["90"], output: "Count: 0" },
        ],
        wrong: [py`
          students = [
              {"name": "Asha", "city": "Pune", "marks": 72},
              {"name": "Ravi", "city": "Delhi", "marks": 55},
              {"name": "Meena", "city": "Pune", "marks": 81},
              {"name": "Kiran", "city": "Agra", "marks": 33},
          ]
          pass_mark = int(input("Pass mark: "))
          count = 0
          for s in students:
              if s["marks"] > pass_mark:
                  print(s["name"])
                  count += 1
          print("Count:", count)
        `],
        hints: [
          md`Ask for the pass mark before the loop, and start a counter at zero.`,
          md`Inside the loop, check the marks field of the record. The print and the counter go inside that check.`,
          md`A mark equal to the pass mark also passes, so use the sign for greater than or equal to.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: one line for a city",
        task: md`
          Write a function «city_line(table, city)». The table is a list of student records, each with «name», «city» and «marks». The function **returns** one line of text. The line gives the number of students from that city and the total of their marks.

          Test it with this table:

          : students = [
          :     {"name": "Asha", "city": "Pune", "marks": 72},
          :     {"name": "Ravi", "city": "Delhi", "marks": 55},
          :     {"name": "Meena", "city": "Pune", "marks": 81},
          : ]

          Then print «city_line(students, "Pune")». It shows:

          | Pune: 2 students, 153 marks

          Keep the word «students» even when the count is 1. The checker also gives your function other tables, even an empty one. For an empty table and «"Pune"» it returns «Pune: 0 students, 0 marks».
        `,
        starter: py`

        `,
        solution: py`
          def city_line(table, city):
              count = 0
              total = 0
              for s in table:
                  if s["city"] == city:
                      count += 1
                      total += s["marks"]
              return f"{city}: {count} students, {total} marks"

          students = [
              {"name": "Asha", "city": "Pune", "marks": 72},
              {"name": "Ravi", "city": "Delhi", "marks": 55},
              {"name": "Meena", "city": "Pune", "marks": 81},
          ]
          print(city_line(students, "Pune"))
        `,
        tests: [
          { output: "Pune: 2 students, 153 marks" },
          { py: py`expect("city_line", ([], "Pune"), "Pune: 0 students, 0 marks")` },
          { py: py`expect("city_line", ([{"name": "Kiran", "city": "Agra", "marks": 40}], "Agra"), "Agra: 1 students, 40 marks")` },
          { py: py`expect("city_line", ([{"name": "A", "city": "Goa", "marks": 10}, {"name": "B", "city": "Pune", "marks": 20}, {"name": "C", "city": "Goa", "marks": 35}, {"name": "D", "city": "Goa", "marks": 0}], "Goa"), "Goa: 3 students, 45 marks")` },
          { py: py`expect("city_line", ([{"name": "A", "city": "Goa", "marks": 10}], "Delhi"), "Delhi: 0 students, 0 marks")` },
        ],
        wrong: [py`
          def city_line(table, city):
              count = 0
              total = 0
              for s in table:
                  count += 1
                  total += s["marks"]
              return f"{city}: {count} students, {total} marks"

          students = [
              {"name": "Asha", "city": "Pune", "marks": 72},
              {"name": "Ravi", "city": "Delhi", "marks": 55},
              {"name": "Meena", "city": "Pune", "marks": 81},
          ]
          print(city_line(students, "Pune"))
        `, py`
          def city_line(table, city):
              count = 0
              total = 0
              for s in table:
                  if s["city"] == city:
                      count += 1
                      total += s["marks"]
                  return f"{city}: {count} students, {total} marks"

          students = [
              {"name": "Asha", "city": "Pune", "marks": 72},
              {"name": "Ravi", "city": "Delhi", "marks": 55},
              {"name": "Meena", "city": "Pune", "marks": 81},
          ]
          print(city_line(students, "Pune"))
        `],
        hints: [
          md`You need two numbers that start at zero: a count and a total. A loop over the table changes them, and the function gives back one line of text.`,
          md`Inside the loop, an if checks the city field. Only inside that check do the count and the total go up.`,
          md`The return line is after the loop, not inside it. It uses an f-string with the city, the count and the total.`,
        ],
      },
    ],
    keys: [
      md`A **record** is a dictionary for one thing. Each key is a **field**.`,
      md`A **table** is a list of records: «students[1]["name"]» is one field of one row.`,
      md`«for s in table:» gives one whole record each time. Pick fields with «s["marks"]».`,
      md`To filter and total, put an «if» on one field inside the loop, and add up another field.`,
      md`«table["marks"]» is a TypeError: a list needs a position, not a key.`,
    ],
  });

  // ---------------------------------------------------------------- Day 59
  day({
    slug: "grouping-records",
    title: "Grouping Records",
    goal: "Group records by city using a dictionary of lists.",
    minutes: 45,
    kind: "lesson",
    needs: [30, 58],
    win: "Today you can now group a table by one field, and print a lined-up report of each group.",
    learn: [
      md`
        ## A dictionary of lists

        To **group** records means to put together the records that share one field, such as the same city. A good shape for groups is a **dictionary of lists**. It has one key for each city, and a list of names as its value. Guess what this prints.
      `,
      ex(py`
        students = [
            {"name": "Asha", "city": "Pune", "marks": 72},
            {"name": "Ravi", "city": "Delhi", "marks": 55},
            {"name": "Meena", "city": "Pune", "marks": 81},
        ]
        groups = {}
        for s in students:
            city = s["city"]
            if city not in groups:
                groups[city] = []
            groups[city].append(s["name"])
        print(groups)
      `, { predict: ["{'Pune': ['Asha', 'Meena'], 'Delhi': ['Ravi']}", "{'Pune': ['Meena'], 'Delhi': ['Ravi']}", "{'Asha': 'Pune', 'Ravi': 'Delhi', 'Meena': 'Pune'}"], answer: 0 }),
      md`
        «not in» is the opposite of «in»: «city not in groups» is True when the key is missing. So the **first time** a city appears, the program makes an empty list for it. Every time, «.append» adds the name to that city's list.
      `,
      md`
        ## Why the first time matters

        Now see what happens without the «if». Guess first.
      `,
      ex(py`
        students = [
            {"name": "Asha", "city": "Pune"},
            {"name": "Ravi", "city": "Delhi"},
        ]
        groups = {}
        for s in students:
            groups[s["city"]].append(s["name"])
        print(groups)
      `, { error: true, label: "A crash on purpose", predict: ["KeyError", "{'Pune': ['Asha'], 'Delhi': ['Ravi']}", "{}"], answer: 0 }),
      md`
        «groups["Pune"]» does not exist yet, so the lookup fails with KeyError. You cannot append to a list that is not there. Always make the empty list the first time.
      `,
      ask({
        q: md`What goes wrong if the line «groups[city] = []» runs every time, with no «if» before it?`,
        options: ["Each city keeps only its last name", "Python gives a KeyError", "Nothing goes wrong"],
        answer: 0,
        explain: md`An empty list replaces the old list each time, so the earlier names are lost.`,
        why: [null, md`The key exists after that line, so there is no KeyError. The problem is quieter.`, md`For Pune, Asha's name is lost when Meena's record arrives.`],
      }),
      pause(md`Good place for a short break. Next: counting, averages and a neat report.`),
      md`
        ## Count, average and a lined-up report

        Once the groups are made, loop over them with «.items()». «len» gives the count of each group, and «sum» divided by «len» gives its average. In an f-string, «{city:<10}» fills the text with spaces up to 10 characters. So the next column starts in the same place. The «<» means "keep the text on the left".
      `,
      ex(py`
        groups = {"Pune": [72, 81], "Delhi": [55], "Bengaluru": [40, 60, 50]}
        for city, marks in groups.items():
            avg = sum(marks) / len(marks)
            print(f"{city:<10}{len(marks)}  {avg:.1f}")
      `, { predict: ["Pune      2  76.5\nDelhi     1  55.0\nBengaluru 3  50.0", "Pune2  76.5\nDelhi1  55.0\nBengaluru3  50.0", "Pune      2  153.0\nDelhi     1  55.0\nBengaluru 3  150.0"], answer: 0 }),
      md`
        Each city name now takes 10 places, so the counts and averages form straight columns. «Bengaluru» has 9 letters, so it gets one space. Without «:<10», the numbers start right after each name, at a different place on each line.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          groups = {}
          for city in ["Goa", "Agra", "Goa"]:
              if city not in groups:
                  groups[city] = []
              groups[city].append(1)
          print(groups)
        `, options: ["{'Goa': [1, 1], 'Agra': [1]}", "{'Goa': [1], 'Agra': [1]}", "{'Goa': 2, 'Agra': 1}"], answer: 0,
        explain: md`Goa comes twice, so its list gets two items. The empty list is made only the first time.`,
        why: [null, md`The second Goa does not make a new list, because Goa is already a key. The 1 is added to the old list.`, md`The values are lists, made with «[]» and «.append». They are not counts.`],
        skill: "trace" },
      { q: md`What happens?`, code: py`
          groups = {}
          groups["Pune"].append("Asha")
        `, options: ["KeyError", "{'Pune': ['Asha']}", "AttributeError"], answer: 0, error: true,
        explain: md`«groups["Pune"]» is looked up first, and the key is not there yet.`,
        why: [null, md`Python does not make the list for you. You must make it the first time.`, md`Python never reaches «.append», because the lookup fails first.`],
        skill: "debug" },
      { q: md`What does this program do?`, code: py`
          for city, names in groups.items():
              print(f"{city:<10}{len(names)}")
        `, options: ["It prints each city and how many names are in its group, in two lined-up columns", "It prints every name in every group", "It prints the total number of names"],
        answer: 0, verify: false, mono: false,
        explain: md`«len(names)» is the size of one group. «:<10» lines up the second column.`,
        why: [null, md`It never loops over the names. It only counts them.`, md`It prints one line for each city, not one total.`],
        skill: "read" },
      { q: md`What does «{name:<8}» do inside an f-string?`,
        options: ["It fills the text with spaces up to 8 characters, keeping the text on the left", "It cuts the text to 8 characters", "It prints the text 8 times"], answer: 0,
        explain: md`Short text gets spaces after it. Longer text is not cut.`,
        why: [null, md`Longer text is printed in full. Only short text gets spaces.`, md`Repeating text uses «*», not a format inside curly brackets.`],
        skill: "memory" },
      { q: md`The groups are «{"Pune": [72, 81], "Goa": [40]}». Which line gives the average for each city?`,
        options: ["«avg = sum(marks) / len(marks)»", "«avg = sum(groups) / len(groups)»", "«avg = sum(marks) / 2»"], answer: 0,
        explain: md`Inside «for city, marks in groups.items():», «marks» is one city's list.`,
        why: [null, md`That uses the whole dictionary, not one city's list.`, md`Goa has only one mark. Divide by the length of each list.`],
        skill: "write" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: players by team",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          players = [
              {"name": "Arjun", "team": "Mumbai"},
              {"name": "Dev", "team": "Chennai"},
              {"name": "Imran", "team": "Mumbai"},
          ]
          teams = {}
          for p in players:
              t = p["team"]
              if t not in teams:
                  teams[t] = []
              teams[t].append(p["name"])
          print(teams)
        `,
        inputs: [],
        ask: [{ line: 11, name: "teams" }, { line: 11, hit: 3, name: "teams" }, { output: true }],
        hints: [
          md`Start with an empty dictionary. Go through the players in order.`,
          md`For Arjun, Mumbai is new, so an empty list is made, and then his name is added.`,
          md`For Imran, Mumbai is already a key, so no new list is made. His name joins Arjun's list.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: the average of each group",
        task: md`Read the program. Answer without running it.`,
        code: py`
          groups = {"Pune": [70, 80, 90], "Goa": [45]}
          report = {}
          for city, marks in groups.items():
              report[city] = sum(marks) // len(marks)
          print(report)
        `,
        inputs: [],
        ask: [{ line: 4, name: "report" }, { line: 3, hit: 2, name: "marks" }, { output: true }],
        hints: [
          md`The loop gives one city and its list each time, Pune first.`,
          md`Pune's marks add up to 240, and there are 3 of them. Whole-number division drops any part after the point.`,
          md`The second time round, the list is Goa's list, with one mark in it.`,
        ],
      },
      {
        id: "f1", kind: "fill", title: "Fill the gaps: orders by snack",
        task: md`
          Fill the gaps so the program groups the names by snack, and prints:

          | {'samosa': ['Asha', 'Meena'], 'chai': ['Ravi']}
        `,
        template: py`
          orders = [
              {"name": "Asha", "snack": "samosa"},
              {"name": "Ravi", "snack": "chai"},
              {"name": "Meena", "snack": "samosa"},
          ]
          by_snack = {}
          for o in orders:
              snack = o["snack"]
              if snack ⟦not in⟧ by_snack:
                  by_snack[snack] = ⟦[]⟧
              by_snack[snack].⟦append⟧(o["name"])
          print(by_snack)
        `,
        tests: [{ output: "{'samosa': ['Asha', 'Meena'], 'chai': ['Ravi']}" }],
        hints: [
          md`The first gap asks if the snack is still missing from the dictionary.`,
          md`The second gap is the starting value of a new group: a list with nothing in it.`,
          md`The third gap is the list method that adds one item to the end.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: grouping crashes at once",
        task: md`
          «group_names(table)» should give back a dictionary of lists: the names of the students from each city. For the table below it should print «{'Pune': ['Asha', 'Meena'], 'Delhi': ['Ravi']}». Instead it stops with «KeyError: 'Pune'». Fix the one wrong line.
        `,
        starter: py`
          def group_names(table):
              groups = {}
              for s in table:
                  city = s["city"]
                  if city in groups:
                      groups[city] = []
                  groups[city].append(s["name"])
              return groups

          students = [
              {"name": "Asha", "city": "Pune"},
              {"name": "Ravi", "city": "Delhi"},
              {"name": "Meena", "city": "Pune"},
          ]
          print(group_names(students))
        `,
        bugLines: [5],
        solution: py`
          def group_names(table):
              groups = {}
              for s in table:
                  city = s["city"]
                  if city not in groups:
                      groups[city] = []
                  groups[city].append(s["name"])
              return groups

          students = [
              {"name": "Asha", "city": "Pune"},
              {"name": "Ravi", "city": "Delhi"},
              {"name": "Meena", "city": "Pune"},
          ]
          print(group_names(students))
        `,
        tests: [
          { output: "{'Pune': ['Asha', 'Meena'], 'Delhi': ['Ravi']}" },
          { py: py`expect("group_names", ([],), {})` },
          { py: py`expect("group_names", ([{"name": "Kiran", "city": "Agra"}],), {"Agra": ["Kiran"]})` },
          { py: py`expect("group_names", ([{"name": "A", "city": "Goa"}, {"name": "B", "city": "Goa"}, {"name": "C", "city": "Goa"}],), {"Goa": ["A", "B", "C"]})` },
        ],
        wrong: [py`
          def group_names(table):
              groups = {}
              for s in table:
                  city = s["city"]
                  if True:
                      groups[city] = []
                  groups[city].append(s["name"])
              return groups

          students = [
              {"name": "Asha", "city": "Pune"},
              {"name": "Ravi", "city": "Delhi"},
              {"name": "Meena", "city": "Pune"},
          ]
          print(group_names(students))
        `, py`
          def group_names(table):
              groups = {}
              for s in table:
                  city = s["city"]
                  if city not in groups:
                      groups[city] = []
                  groups[city] = [s["name"]]
              return groups

          students = [
              {"name": "Asha", "city": "Pune"},
              {"name": "Ravi", "city": "Delhi"},
              {"name": "Meena", "city": "Pune"},
          ]
          print(group_names(students))
        `],
        hints: [
          md`The KeyError names Pune, the very first city. So the empty list for Pune was never made.`,
          md`Look at the question the if asks on line 5. It makes the list only when the city is already there.`,
          md`The empty list must be made when the city is not yet a key. Add one word to the if line.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: count each group", optional: true,
        task: md`
          This function gives back a dictionary of name lists. Change it into «count_by_city(table)»: it gives back a dictionary with the **number** of students in each city. For the table below it prints:

          | {'Pune': 2, 'Delhi': 1}
        `,
        starter: py`
          def group_names(table):
              groups = {}
              for s in table:
                  city = s["city"]
                  if city not in groups:
                      groups[city] = []
                  groups[city].append(s["name"])
              return groups

          students = [
              {"name": "Asha", "city": "Pune"},
              {"name": "Ravi", "city": "Delhi"},
              {"name": "Meena", "city": "Pune"},
          ]
          print(group_names(students))
        `,
        solution: py`
          def count_by_city(table):
              counts = {}
              for s in table:
                  city = s["city"]
                  if city not in counts:
                      counts[city] = 0
                  counts[city] += 1
              return counts

          students = [
              {"name": "Asha", "city": "Pune"},
              {"name": "Ravi", "city": "Delhi"},
              {"name": "Meena", "city": "Pune"},
          ]
          print(count_by_city(students))
        `,
        tests: [
          { output: "{'Pune': 2, 'Delhi': 1}" },
          { py: py`expect("count_by_city", ([],), {})` },
          { py: py`expect("count_by_city", ([{"name": "A", "city": "Goa"}, {"name": "B", "city": "Goa"}, {"name": "C", "city": "Goa"}],), {"Goa": 3})` },
          { py: py`expect("count_by_city", ([{"name": "A", "city": "Goa"}, {"name": "B", "city": "Agra"}],), {"Goa": 1, "Agra": 1})` },
        ],
        wrong: [py`
          def count_by_city(table):
              counts = {}
              for s in table:
                  city = s["city"]
                  counts[city] = 1
              return counts

          students = [
              {"name": "Asha", "city": "Pune"},
              {"name": "Ravi", "city": "Delhi"},
              {"name": "Meena", "city": "Pune"},
          ]
          print(count_by_city(students))
        `],
        hints: [
          md`Each group now holds a number, not a list. Rename the function and the call.`,
          md`The first time a city appears, its count starts at zero, not at an empty list.`,
          md`In place of adding a name to a list, add one to that city's count.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: average marks by city",
        task: md`
          Write a function «city_report(table)». The table is a list of student records with «name», «city» and «marks». The function **prints** one line for each city, in the order the cities first appear. Each line has the city filled to 10 characters, then the average marks with one decimal place.

          Test it with this table:

          : students = [
          :     {"name": "Asha", "city": "Pune", "marks": 72},
          :     {"name": "Ravi", "city": "Delhi", "marks": 55},
          :     {"name": "Meena", "city": "Pune", "marks": 81},
          : ]

          «city_report(students)» shows:

          | Pune      76.5
          | Delhi     55.0

          For an empty table it prints nothing. Group the marks in a dictionary of lists first.
        `,
        starter: py`

        `,
        solution: py`
          def city_report(table):
              groups = {}
              for s in table:
                  city = s["city"]
                  if city not in groups:
                      groups[city] = []
                  groups[city].append(s["marks"])
              for city, marks in groups.items():
                  avg = sum(marks) / len(marks)
                  print(f"{city:<10}{avg:.1f}")

          students = [
              {"name": "Asha", "city": "Pune", "marks": 72},
              {"name": "Ravi", "city": "Delhi", "marks": 55},
              {"name": "Meena", "city": "Pune", "marks": 81},
          ]
          city_report(students)
        `,
        tests: [
          { output: "Pune      76.5\nDelhi     55.0" },
          { py: py`
            got = printed("city_report", [])
            assert got == "", "For an empty table, «city_report» should print nothing."
          ` },
          { py: py`
            t = [{"name": "A", "city": "Goa", "marks": 40}]
            got = printed("city_report", t)
            assert got == "Goa       40.0", f"For one student from Goa with 40 marks, the line should be «Goa       40.0». Yours printed «{got}». Check the width 10 and the one decimal place."
          ` },
          { py: py`
            t = [
                {"name": "A", "city": "Agra", "marks": 50},
                {"name": "B", "city": "Bengaluru", "marks": 61},
                {"name": "C", "city": "Agra", "marks": 45},
                {"name": "D", "city": "Agra", "marks": 70},
            ]
            got = printed("city_report", t)
            want = "Agra      55.0\nBengaluru 61.0"
            assert got == want, f"Agra has three students (50, 45 and 70), so its average is 55.0. Your function printed: {got!r}. Check that each city's marks are grouped before you average them."
          ` },
        ],
        wrong: [py`
          def city_report(table):
              groups = {}
              for s in table:
                  city = s["city"]
                  groups[city] = [s["marks"]]
              for city, marks in groups.items():
                  avg = sum(marks) / len(marks)
                  print(f"{city:<10}{avg:.1f}")

          students = [
              {"name": "Asha", "city": "Pune", "marks": 72},
              {"name": "Ravi", "city": "Delhi", "marks": 55},
              {"name": "Meena", "city": "Pune", "marks": 81},
          ]
          city_report(students)
        `, py`
          def city_report(table):
              groups = {}
              for s in table:
                  city = s["city"]
                  if city not in groups:
                      groups[city] = []
                  groups[city].append(s["marks"])
              for city, marks in groups.items():
                  avg = sum(marks) / len(marks)
                  print(f"{city} {avg:.1f}")

          students = [
              {"name": "Asha", "city": "Pune", "marks": 72},
              {"name": "Ravi", "city": "Delhi", "marks": 55},
              {"name": "Meena", "city": "Pune", "marks": 81},
          ]
          city_report(students)
        `],
        hints: [
          md`Two loops: the first builds a dictionary of mark lists, one list per city. The second loop prints one line per city.`,
          md`In the first loop, make the empty list only the first time a city appears, then add the marks. In the second loop, use the items of the dictionary.`,
          md`The average is the sum of one city's list divided by its length. In the f-string, give the city a width of 10 kept on the left, and the average one decimal place.`,
        ],
      },
    ],
    keys: [
      md`A **dictionary of lists** holds groups: one key per group, one list per key.`,
      md`Make the empty list **the first time**: «if city not in groups: groups[city] = []».`,
      md`Appending to a key that is not there gives KeyError.`,
      md`Count a group with «len», and average it with «sum» divided by «len».`,
      md`«{city:<10}» fills text with spaces to 10 characters, so columns line up.`,
    ],
  });

  // ---------------------------------------------------------------- Day 60
  day({
    slug: "functions-on-tables",
    title: "Functions That Take Tables",
    goal: "Write functions that take a whole table of records and return an answer.",
    minutes: 45,
    kind: "lesson",
    needs: [32, 54, 58],
    win: "Today you can now write functions that take a whole table and give back the top record, a smaller table or a summary.",
    learn: [
      md`
        ## A table as a parameter: the top record

        A function can take a whole table as one parameter. Inside, it loops over the records like any loop. This one gives back the **top record**: the whole row with the highest marks. Guess what it prints.
      `,
      ex(py`
        def top_student(table):
            if not table:
                return None
            best = table[0]
            for s in table:
                if s["marks"] > best["marks"]:
                    best = s
            return best

        students = [
            {"name": "Asha", "city": "Pune", "marks": 72},
            {"name": "Ravi", "city": "Delhi", "marks": 55},
            {"name": "Meena", "city": "Pune", "marks": 81},
        ]
        top = top_student(students)
        print(top["name"], top["marks"])
        print(top_student([]))
      `, { predict: ["Meena 81\nNone", "81\nNone", "Meena 81\nIndexError"], answer: 0 }),
      md`
        The function gives back the whole record, so the caller can pick any field. An empty table has no top record, so the function gives back «None» first. Without that check, «table[0]» would give IndexError.
      `,
      md`
        ## Returning a new, smaller table

        To **filter** a table means to keep only some records. A safe filter builds a **new** list and gives it back. The table the caller passed in stays the same. Guess the output.
      `,
      ex(py`
        def passed(table, pass_mark):
            result = []
            for s in table:
                if s["marks"] >= pass_mark:
                    result.append(s)
            return result

        students = [
            {"name": "Asha", "marks": 72},
            {"name": "Ravi", "marks": 55},
            {"name": "Meena", "marks": 81},
        ]
        good = passed(students, 60)
        print(len(good), len(students))
        print(good[0]["name"])
      `, { predict: ["2 3\nAsha", "2 2\nAsha", "3 3\nRavi"], answer: 0 }),
      md`
        Now see a common mistake. This function removes records from the table it was given, while it loops over that same table. Guess how many records are left.
      `,
      ex(py`
        def drop_failed(table):
            for s in table:
                if s["marks"] < 60:
                    table.remove(s)

        students = [
            {"name": "Ravi", "marks": 55},
            {"name": "Kiran", "marks": 40},
            {"name": "Asha", "marks": 72},
        ]
        drop_failed(students)
        print(len(students))
        print(students[0]["name"])
      `, { predict: ["2\nKiran", "1\nAsha", "3\nRavi"], answer: 0, label: "A common mistake" }),
      md`
        Two things went wrong. The caller's own list changed, because the parameter is the same list (Day 54). And Kiran was skipped. After Ravi left, Kiran moved into his place, and the loop went on to the next position. Build a new list instead.
      `,
      pause(md`Good place for a short break. Next: a function that gives back a summary.`),
      md`
        ## Returning a summary dictionary

        A **summary** is a few numbers that describe a whole table. A dictionary keeps each number under a clear name. Guess what these two calls give back.
      `,
      ex(py`
        def summary(table):
            total = 0
            for s in table:
                total += s["marks"]
            count = len(table)
            if count == 0:
                return {"count": 0, "average": 0}
            return {"count": count, "average": total / count}

        students = [{"name": "Asha", "marks": 72}, {"name": "Ravi", "marks": 55}, {"name": "Meena", "marks": 80}]
        print(summary(students))
        print(summary([]))
      `, { predict: ["{'count': 3, 'average': 69.0}\n{'count': 0, 'average': 0}", "{'count': 3, 'average': 207}\n{'count': 0, 'average': 0}", "{'count': 3, 'average': 69.0}\nZeroDivisionError"], answer: 0 }),
      md`
        The caller reads each part by its key, such as «result["average"]». The check for an empty table comes before the division, so there is no ZeroDivisionError.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          def from_city(table, city):
              result = []
              for s in table:
                  if s["city"] == city:
                      result.append(s)
              return result

          t = [{"city": "Goa"}, {"city": "Agra"}, {"city": "Goa"}]
          print(len(from_city(t, "Goa")), len(t))
        `, options: ["2 3", "2 2", "3 3"], answer: 0,
        explain: md`The function builds a new list with the 2 Goa records. The table «t» still has all 3.`,
        why: [null, md`Nothing is removed from «t». The new list is a separate list.`, md`Only records whose city is Goa join the new list.`],
        skill: "trace" },
      { q: md`What does this function do?`, code: py`
          def cheapest(menu):
              if not menu:
                  return None
              best = menu[0]
              for item in menu:
                  if item["price"] < best["price"]:
                      best = item
              return best
        `, options: ["It gives back the whole record of the lowest-priced item, or None for an empty menu", "It gives back the lowest price as a number", "It removes the cheapest item from the menu"],
        answer: 0, verify: false, mono: false,
        explain: md`«best» holds a whole record, and the function gives back that record.`,
        why: [null, md`It compares prices but keeps the whole record, not just the price.`, md`Nothing is removed. The menu stays the same.`],
        skill: "read" },
      { q: md`This filter never gives back more than one record, even when three records pass. Why?`, code: py`
          def passed(table, pass_mark):
              result = []
              for s in table:
                  if s["marks"] >= pass_mark:
                      result.append(s)
                  return result
        `, options: ["«return» is inside the loop, so the function ends after the first record", "«result» should start as «{}»", "«>=» should be «>»"],
        answer: 0, verify: false, mono: false,
        explain: md`«return» ends a function at once. It must be outside the loop, after every record has been checked.`,
        why: [null, md`«result» is a list of records, so «[]» is right.`, md`That changes who passes, but there would still be only one record.`],
        skill: "debug" },
      { q: md`Why should a filter build a new list, instead of removing records from the table it was given?`,
        options: ["Removing changes the caller's table, and the loop can skip records", "Removing is slower to type", "Python does not allow «.remove» on a list of dictionaries"], answer: 0,
        explain: md`The parameter is the same list as the caller's. Removing while looping also moves the later records back, so one is skipped.`,
        why: [null, md`Typing is not the problem. The result is wrong.`, md`«.remove» works, but it gives the two problems in the first answer.`],
        skill: "memory" },
      { q: md`You need the number of students **and** their average from one function. What should it give back?`,
        options: ['A summary dictionary, such as «{"count": 3, "average": 69.0}»', "A new list of records", "Only the average, as a number"], answer: 0,
        explain: md`A dictionary keeps several answers together, each under a clear name.`,
        why: [null, md`A list of records is a table, not a summary of it.`, md`One number cannot hold both answers.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: the cheapest snack",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          def cheapest(menu):
              best = menu[0]
              for item in menu:
                  if item["price"] < best["price"]:
                      best = item
              return best

          menu = [{"item": "chai", "price": 15}, {"item": "vada", "price": 12}, {"item": "samosa", "price": 20}]
          c = cheapest(menu)
          print(c["item"], c["price"])
        `,
        inputs: [],
        ask: [{ line: 2, name: "best" }, { line: 5, name: "best" }, { output: true }],
        hints: [
          md`At the start, the best record is simply the first record of the menu.`,
          md`Line 5 runs only when an item is cheaper than the best so far. Chai is not cheaper than itself.`,
          md`Vada costs less than chai, and samosa costs more than vada.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: names from one city",
        task: md`Read the program. Answer without running it.`,
        code: py`
          def names_from(table, city):
              found = []
              for s in table:
                  if s["city"] == city:
                      found.append(s["name"])
              return found

          students = [{"name": "Asha", "city": "Pune"}, {"name": "Ravi", "city": "Delhi"}, {"name": "Meena", "city": "Pune"}]
          pune = names_from(students, "Pune")
          print(len(students), pune)
        `,
        inputs: [],
        ask: [{ line: 5, hit: 2, name: "found" }, { line: 9, name: "pune" }, { output: true }],
        hints: [
          md`Line 5 runs only for the records whose city is Pune.`,
          md`The second time line 5 runs, it is for Meena. Asha is already in the list.`,
          md`The function never removes anything, so the table keeps all its records.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: pass and fail summary",
        task: md`
          Put the lines in order and set each indent. «pass_fail(table)» gives back a summary dictionary. A mark of 33 or more passes. The program prints:

          | {'pass': 2, 'fail': 1}
        `,
        solution: py`
          def pass_fail(table):
              result = {"pass": 0, "fail": 0}
              for s in table:
                  if s["marks"] >= 33:
                      result["pass"] += 1
                  else:
                      result["fail"] += 1
              return result
          print(pass_fail([{"name": "Asha", "marks": 72}, {"name": "Ravi", "marks": 20}, {"name": "Meena", "marks": 33}]))
        `,
        distractors: ["result = {}", 'result["pass"] = 1'],
        indent: "choose",
        tests: [
          { output: "{'pass': 2, 'fail': 1}" },
          { py: py`expect("pass_fail", ([],), {"pass": 0, "fail": 0})` },
          { py: py`expect("pass_fail", ([{"name": "A", "marks": 32}, {"name": "B", "marks": 10}],), {"pass": 0, "fail": 2})` },
        ],
        hints: [
          md`The summary starts with both counts at zero, before the loop.`,
          md`The if and the else are inside the loop. Each adds one to its own count.`,
          md`The return is inside the function but after the loop, so its indent matches the for line.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the filter stops early",
        task: md`
          «passed(table, pass_mark)» should give back a new table with every record at or above the pass mark. For the table below and 60 it should print «['Asha', 'Meena']». It prints «['Asha']». For an empty table it gives back «None» instead of «[]». Fix the one wrong line.
        `,
        starter: py`
          def passed(table, pass_mark):
              result = []
              for s in table:
                  if s["marks"] >= pass_mark:
                      result.append(s)
                  return result

          students = [
              {"name": "Asha", "marks": 72},
              {"name": "Ravi", "marks": 55},
              {"name": "Meena", "marks": 81},
          ]
          print([s["name"] for s in passed(students, 60)])
        `,
        bugLines: [6],
        solution: py`
          def passed(table, pass_mark):
              result = []
              for s in table:
                  if s["marks"] >= pass_mark:
                      result.append(s)
              return result

          students = [
              {"name": "Asha", "marks": 72},
              {"name": "Ravi", "marks": 55},
              {"name": "Meena", "marks": 81},
          ]
          print([s["name"] for s in passed(students, 60)])
        `,
        tests: [
          { output: "['Asha', 'Meena']" },
          { py: py`expect("passed", ([], 60), [])` },
          { py: py`expect("passed", ([{"name": "A", "marks": 10}, {"name": "B", "marks": 60}, {"name": "C", "marks": 59}, {"name": "D", "marks": 99}], 60), [{"name": "B", "marks": 60}, {"name": "D", "marks": 99}])` },
          { py: py`
            t = [{"name": "A", "marks": 10}, {"name": "B", "marks": 70}]
            call("passed", t, 33)
            assert t == [{"name": "A", "marks": 10}, {"name": "B", "marks": 70}], "«passed» changed the table it was given. It should build a new list and leave the old table alone."
          ` },
        ],
        wrong: [py`
          def passed(table, pass_mark):
              result = []
              for s in table:
                  if s["marks"] > pass_mark:
                      result.append(s)
              return result

          students = [
              {"name": "Asha", "marks": 72},
              {"name": "Ravi", "marks": 55},
              {"name": "Meena", "marks": 81},
          ]
          print([s["name"] for s in passed(students, 60)])
        `, py`
          def passed(table, pass_mark):
              for s in table:
                  if s["marks"] < pass_mark:
                      table.remove(s)
              return table

          students = [
              {"name": "Asha", "marks": 72},
              {"name": "Ravi", "marks": 55},
              {"name": "Meena", "marks": 81},
          ]
          print([s["name"] for s in passed(students, 60)])
        `],
        hints: [
          md`The function gives back after looking at only one record. For an empty table, the loop never runs, so the function reaches its end with no return at all.`,
          md`Look at the indent of the return line. It is inside the loop.`,
          md`Move the return line to the left so it lines up with the for line. Then it runs once, after the loop ends.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: top in any subject", optional: true,
        task: md`
          Each record now has two subject fields, «maths» and «english». «top_in_maths» finds the top record for maths only. Change it into «top_by(table, field)», which finds the top record for **any** field it is given.

          Then change the last line to print «top_by(students, "english")["name"]». The program then shows:

          | Ravi
        `,
        starter: py`
          def top_in_maths(table):
              if not table:
                  return None
              best = table[0]
              for s in table:
                  if s["maths"] > best["maths"]:
                      best = s
              return best

          students = [
              {"name": "Asha", "maths": 90, "english": 61},
              {"name": "Ravi", "maths": 58, "english": 84},
              {"name": "Meena", "maths": 75, "english": 70},
          ]
          print(top_in_maths(students)["name"])
        `,
        solution: py`
          def top_by(table, field):
              if not table:
                  return None
              best = table[0]
              for s in table:
                  if s[field] > best[field]:
                      best = s
              return best

          students = [
              {"name": "Asha", "maths": 90, "english": 61},
              {"name": "Ravi", "maths": 58, "english": 84},
              {"name": "Meena", "maths": 75, "english": 70},
          ]
          print(top_by(students, "english")["name"])
        `,
        tests: [
          { output: "Ravi" },
          { py: py`expect("top_by", ([], "maths"), None)` },
          { py: py`expect("top_by", ([{"name": "A", "maths": 40, "english": 99}, {"name": "B", "maths": 41, "english": 10}], "maths"), {"name": "B", "maths": 41, "english": 10})` },
          { py: py`expect("top_by", ([{"name": "A", "maths": 40, "english": 99}, {"name": "B", "maths": 41, "english": 10}], "english"), {"name": "A", "maths": 40, "english": 99})` },
          { py: py`expect("top_by", ([{"name": "Solo", "maths": 5, "english": 5}], "english"), {"name": "Solo", "maths": 5, "english": 5})` },
        ],
        wrong: [py`
          def top_by(table, field):
              if not table:
                  return None
              best = table[0]
              for s in table:
                  if s["maths"] > best["maths"]:
                      best = s
              return best

          students = [
              {"name": "Asha", "maths": 90, "english": 61},
              {"name": "Ravi", "maths": 58, "english": 84},
              {"name": "Meena", "maths": 75, "english": 70},
          ]
          print(top_by(students, "english")["name"])
        `, py`
          def top_by(table, field):
              if not table:
                  return None
              best = table[0]
              for s in table:
                  if s["field"] > best["field"]:
                      best = s
              return best

          students = [
              {"name": "Asha", "maths": 90, "english": 61},
              {"name": "Ravi", "maths": 58, "english": 84},
              {"name": "Meena", "maths": 75, "english": 70},
          ]
          print(top_by(students, "english")["name"])
        `],
        hints: [
          md`The function needs a second parameter that holds the name of the field to compare.`,
          md`Rename the function and add the parameter on the def line. Then change the if line, and the call at the end.`,
          md`In the if line, use the parameter itself inside both brackets, with no quotes around it.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a class summary",
        task: md`
          Write a function «class_summary(table)». The table is a list of records with «name» and «marks». It gives back a summary dictionary with three keys:

          - «"count"»: how many students there are
          - «"average"»: the average marks, rounded to 1 decimal place
          - «"top"»: the name of the student with the highest marks

          For an empty table it gives back «{"count": 0, "average": 0, "top": None}». It must not change the table. Test it with this table:

          : students = [{"name": "Asha", "marks": 72}, {"name": "Ravi", "marks": 55}, {"name": "Meena", "marks": 81}]

          «print(class_summary(students))» shows:

          | {'count': 3, 'average': 69.3, 'top': 'Meena'}
        `,
        starter: py`

        `,
        solution: py`
          def class_summary(table):
              if not table:
                  return {"count": 0, "average": 0, "top": None}
              total = 0
              best = table[0]
              for s in table:
                  total += s["marks"]
                  if s["marks"] > best["marks"]:
                      best = s
              average = round(total / len(table), 1)
              return {"count": len(table), "average": average, "top": best["name"]}

          students = [{"name": "Asha", "marks": 72}, {"name": "Ravi", "marks": 55}, {"name": "Meena", "marks": 81}]
          print(class_summary(students))
        `,
        tests: [
          { output: "{'count': 3, 'average': 69.3, 'top': 'Meena'}" },
          { py: py`expect("class_summary", ([],), {"count": 0, "average": 0, "top": None})` },
          { py: py`expect("class_summary", ([{"name": "Solo", "marks": 40}],), {"count": 1, "average": 40.0, "top": "Solo"})` },
          { py: py`expect("class_summary", ([{"name": "A", "marks": 90}, {"name": "B", "marks": 35}, {"name": "C", "marks": 60}, {"name": "D", "marks": 50}],), {"count": 4, "average": 58.8, "top": "A"})` },
          { py: py`
            t = [{"name": "A", "marks": 30}, {"name": "B", "marks": 95}]
            call("class_summary", t)
            assert t == [{"name": "A", "marks": 30}, {"name": "B", "marks": 95}], "«class_summary» changed the table it was given. Read the records, but do not remove, add or change any."
          ` },
        ],
        wrong: [py`
          def class_summary(table):
              total = 0
              best = table[0]
              for s in table:
                  total += s["marks"]
                  if s["marks"] > best["marks"]:
                      best = s
              average = round(total / len(table), 1)
              return {"count": len(table), "average": average, "top": best["name"]}

          students = [{"name": "Asha", "marks": 72}, {"name": "Ravi", "marks": 55}, {"name": "Meena", "marks": 81}]
          print(class_summary(students))
        `, py`
          def class_summary(table):
              if not table:
                  return {"count": 0, "average": 0, "top": None}
              total = 0
              best = table[0]
              for s in table:
                  total += s["marks"]
                  if s["marks"] < best["marks"]:
                      best = s
              average = round(total / len(table), 1)
              return {"count": len(table), "average": average, "top": best["name"]}

          students = [{"name": "Asha", "marks": 72}, {"name": "Ravi", "marks": 55}, {"name": "Meena", "marks": 81}]
          print(class_summary(students))
        `],
        hints: [
          md`First handle the empty table and give back the empty summary. Then one loop can do two jobs: add up the marks, and keep the best record so far.`,
          md`Before the loop, start the total at zero and the best record at the first record. After the loop, work out the average from the total and the length.`,
          md`The last line gives back a dictionary with three keys. For the top, give the name field of the best record, not the whole record.`,
        ],
      },
    ],
    keys: [
      md`A function can take a whole table as one parameter and loop over its records.`,
      md`The **top record** is a best-so-far loop that keeps the whole record. Check for an empty table first.`,
      md`To filter, build and give back a **new** list. Never remove records from the table you are looping over.`,
      md`A **summary dictionary** gives back several answers, each under a clear key.`,
    ],
  });

  // ---------------------------------------------------------------- Day 61
  day({
    slug: "grids-lists-in-a-list",
    title: "Grids: Lists Inside a List",
    goal: "Read, change and print a grid using row and column positions.",
    minutes: 45,
    kind: "lesson",
    needs: [20, 27, 53, 57],
    win: "Today you can now read, change, print and safely copy a grid, such as a cinema seat map.",
    learn: [
      md`
        ## A grid is a list of rows

        A **grid** is a list of lists, where each inner list is one **row**. A cinema seat map is a grid: «"."» is a free seat and «"X"» is a taken seat. Guess what the three lines print.
      `,
      ex(py`
        seats = [
            [".", "X", "."],
            ["X", "X", "."],
            [".", ".", "."],
        ]
        print(seats[1])
        print(seats[0][1])
        print(len(seats), len(seats[0]))
      `, { predict: ["['X', 'X', '.']\nX\n3 3", "['.', 'X', '.']\nX\n3 3", "['X', 'X', '.']\n.\n9 3"], answer: 0 }),
      md`
        «seats[1]» is one whole row. In «seats[r][c]», the first bracket picks the row «r». The second picks the **column** «c» in that row: the place from the left. Both count from 0. «len(seats)» counts rows, and «len(seats[0])» counts the seats in one row.
      `,
      ask({
        q: md`Which seat is «seats[2][0]»?`,
        options: ["Row 2, the first seat from the left", "Column 2, the first row", "The third seat of the first row"],
        answer: 0,
        explain: md`The row comes first, then the column. Position 2 is the third row, and position 0 is the first seat in it.`,
        why: [null, md`The first bracket always picks the row.`, md`That would be «seats[0][2]»: the brackets are the other way round.`],
      }),
      md`
        ## Change one cell, then print the grid

        One place in a grid is a **cell**. To change a cell, use both brackets on the left of «=». To print a grid neatly, loop over the rows and join each row into one line of text. Guess the output.
      `,
      ex(py`
        seats = [
            [".", "X", "."],
            ["X", "X", "."],
            [".", ".", "."],
        ]
        seats[2][0] = "X"
        for row in seats:
            print(" ".join(row))
      `, { predict: [". X .\nX X .\nX . .", ". X .\nX X .\n. . X", "X X .\nX X .\n. . ."], answer: 0 }),
      md`
        Row 2 is the last row, and column 0 is its first seat. «" ".join(row)» joins the seats of one row with a space between them, so each row prints as one line.
      `,
      pause(md`Good place for a short break. Next: making a grid, and two traps.`),
      md`
        ## Making a grid, and two traps

        «[0] * 3» repeats the items of a list: «[0, 0, 0]». So «[[0] * 3] * 3» looks like a grid. But it repeats the **same** row three times: one list with three names, as on Day 53. Guess what changes.
      `,
      ex(py`
        row = [0] * 3
        print(row)
        grid = [[0] * 3] * 3
        grid[0][0] = 5
        print(grid)
        safe = [[0] * 3 for r in range(3)]
        safe[0][0] = 5
        print(safe)
      `, { predict: ["[0, 0, 0]\n[[5, 0, 0], [5, 0, 0], [5, 0, 0]]\n[[5, 0, 0], [0, 0, 0], [0, 0, 0]]", "[0, 0, 0]\n[[5, 0, 0], [0, 0, 0], [0, 0, 0]]\n[[5, 0, 0], [0, 0, 0], [0, 0, 0]]", "[0, 0, 0]\n[[5, 0, 0], [5, 0, 0], [5, 0, 0]]\n[[5, 0, 0], [5, 0, 0], [5, 0, 0]]"], answer: 0 }),
      md`
        The list comprehension runs «[0] * 3» once for each row, so it makes three separate rows. The second trap is copying. «grid.copy()» copies the outer list only, so both grids still share the same rows. Guess what this prints.
      `,
      ex(py`
        seats = [[".", "."], [".", "."]]
        backup = seats.copy()
        seats[0][0] = "X"
        print(backup[0][0])
        safe = [row[:] for row in seats]
        seats[1][1] = "X"
        print(safe[1][1])
      `, { predict: ["X\n.", ".\n.", "X\nX"], answer: 0 }),
      md`
        «backup» changed too, because its rows are the same lists. «[row[:] for row in seats]» copies each row, so «safe» is a real copy. Python also has «copy.deepcopy» in the «copy» module, which copies every level. Today, use the comprehension.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          grid = [[1, 2], [3, 4], [5, 6]]
          print(grid[2][0] + grid[0][1])
        `, options: ["7", "5", "8"], answer: 0,
        explain: md`«grid[2][0]» is 5, the first number of the last row. «grid[0][1]» is 2. Together they make 7.`,
        why: [null, md`That is 3 + 2: «grid[1][0]» is 3, but the first bracket here is 2, the third row.`, md`That uses 6, the second number of the last row. The second bracket is 0, so it picks 5.`],
        skill: "trace" },
      { q: md`What does this show?`, code: py`
          grid = [[0] * 2] * 3
          grid[1][1] = 9
          print(grid)
        `, options: ["[[0, 9], [0, 9], [0, 9]]", "[[0, 0], [0, 9], [0, 0]]", "[[0, 0], [9, 0], [0, 0]]"], answer: 0,
        explain: md`«* 3» repeats the same row three times. Changing it through one name shows in all three places.`,
        why: [null, md`That would be true for a grid made with a comprehension. Here the rows are one list.`, md`That puts 9 in column 0, but the column is 1, the second place. Also, all three rows are one shared list.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          for row in seats:
              print(" ".join(row))
        `, options: ["It prints the seat map, one row on each line", "It prints every seat on its own line", "It counts the seats in each row"],
        answer: 0, verify: false, mono: false,
        explain: md`Each row is joined into one line of text with spaces between the seats.`,
        why: [null, md`There is one print for each row, not for each seat.`, md`There is no counting. It prints the seats.`],
        skill: "read" },
      { q: md`Which line makes a copy of a grid that does **not** share its rows?`,
        options: ["«safe = [row[:] for row in grid]»", "«safe = grid.copy()»", "«safe = grid[:]»"], answer: 0,
        explain: md`The comprehension copies each row into a new list.`,
        why: [null, md`«.copy()» copies only the outer list. The rows are still shared.`, md`«[:]» on the grid also copies only the outer list.`],
        skill: "memory" },
      { q: md`What happens?`, code: py`
          seats = [[".", "."], [".", "."], [".", "."]]
          print(seats[3][0])
        `, options: ["IndexError", "KeyError", "."], answer: 0, error: true,
        explain: md`There are 3 rows, at positions 0, 1 and 2. Row position 3 does not exist.`,
        why: [null, md`KeyError comes from a dictionary. A grid is a list of lists.`, md`The first bracket fails before Python reaches the second.`],
        skill: "debug" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: rows and columns",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          board = [[1, 2, 3], [4, 5, 6]]
          a = board[1][0]
          board[0][2] = 9
          b = board[0][2] + board[1][2]
          print(a, b, len(board))
        `,
        inputs: [],
        ask: [{ line: 2, name: "a" }, { line: 4, name: "b" }, { output: true }],
        hints: [
          md`The first bracket picks the row, counting from 0. The second picks the place in that row.`,
          md`Line 3 changes the last number of the first row before line 4 reads it.`,
          md`The length of the board is the number of rows, not the number of cells.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: the repeated row",
        task: md`Read the program. Answer without running it.`,
        code: py`
          grid = [[0] * 2] * 2
          grid[1][0] = 7
          first = grid[0]
          print(grid)
        `,
        inputs: [],
        ask: [{ line: 1, name: "grid" }, { line: 3, name: "first" }, { output: true }],
        hints: [
          md`Line 1 makes one row of two zeros, then repeats that same row two times.`,
          md`Both rows are one list. A change through one row shows in the other.`,
          md`After line 2, the first place of the shared row holds 7.`,
        ],
      },
      {
        id: "t3", kind: "trace", title: "Be the Computer: a copy that still shares",
        task: md`Read the program. Answer without running it.`,
        code: py`
          seats = [["A", "B"], ["C", "D"]]
          backup = seats.copy()
          seats[0][1] = "X"
          safe = [row[:] for row in seats]
          seats[1][0] = "Y"
          print(backup)
          print(safe)
        `,
        inputs: [],
        ask: [{ line: 3, name: "backup" }, { line: 5, name: "safe" }, { output: true }],
        hints: [
          md`The copy on line 2 is a new outer list. But its rows are the same lists as the rows of the seat map.`,
          md`So the change on line 3 shows in the backup too. The safe copy on line 4 is made after that change.`,
          md`The change on line 5 shows in the backup, but not in the safe copy, which has its own rows.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: a small hall",
        task: md`
          Put the lines in order and set each indent. The program makes a hall of 3 rows with 4 free seats each. It books the seat at row 1, column 2, then prints:

          | . . . .
          | . . X .
          | . . . .
        `,
        solution: py`
          seats = [["."] * 4 for r in range(3)]
          seats[1][2] = "X"
          for row in seats:
              print(" ".join(row))
        `,
        distractors: ['seats = [["."] * 4] * 3', 'seats[2][1] = "X"'],
        indent: "choose",
        tests: [{ output: ". . . .\n. . X .\n. . . ." }],
        hints: [
          md`Make the hall first. Each row must be its own list, or one booking shows in every row.`,
          md`The booking names the row first and the column second. Both count from 0.`,
          md`The print is inside the loop over the rows, so it is indented.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: one booking fills a whole column",
        task: md`
          «empty_hall(rows, cols)» should give back a hall of free seats. After one booking at row 0, column 1, the program should print:

          | . X . .
          | . . . .
          | . . . .

          Instead, every row shows an X. Fix the one wrong line.
        `,
        starter: py`
          def empty_hall(rows, cols):
              return [["."] * cols] * rows

          hall = empty_hall(3, 4)
          hall[0][1] = "X"
          for row in hall:
              print(" ".join(row))
        `,
        bugLines: [2],
        solution: py`
          def empty_hall(rows, cols):
              return [["."] * cols for r in range(rows)]

          hall = empty_hall(3, 4)
          hall[0][1] = "X"
          for row in hall:
              print(" ".join(row))
        `,
        tests: [
          { output: ". X . .\n. . . .\n. . . ." },
          { py: py`expect("empty_hall", (1, 1), [["."]])` },
          { py: py`expect("empty_hall", (2, 3), [[".", ".", "."], [".", ".", "."]])` },
          { py: py`expect("empty_hall", (0, 4), [])` },
          { py: py`
            h = call("empty_hall", 2, 2)
            h[0][0] = "X"
            assert h[1][0] == ".", "Booking one seat in row 0 also changed row 1. Each row must be its own list."
          ` },
        ],
        wrong: [py`
          def empty_hall(rows, cols):
              return [["."] * rows for r in range(cols)]

          hall = empty_hall(3, 4)
          hall[0][1] = "X"
          for row in hall:
              print(" ".join(row))
        `, py`
          def empty_hall(rows, cols):
              hall = [["."] * cols] * rows
              return hall.copy()

          hall = empty_hall(3, 4)
          hall[0][1] = "X"
          for row in hall:
              print(" ".join(row))
        `],
        hints: [
          md`The hall has three names for one row. A booking in one row shows in all of them.`,
          md`The problem is how line 2 makes the rows. Repeating the outer list repeats the same row.`,
          md`Make the rows with a list comprehension over the number of rows, so a new row is made each time.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: keep the old hall", optional: true,
        task: md`
          «book(hall, r, c)» should give back a **new** hall with one more seat taken. The old hall must stay exactly as it was. Now the old hall changes too, so the program prints «X» where it should print «.». Change the copy line so the old hall never changes. It then prints:

          | .
          | X
        `,
        starter: py`
          def book(hall, r, c):
              new_hall = hall.copy()
              new_hall[r][c] = "X"
              return new_hall

          old = [[".", "."], [".", "."]]
          new = book(old, 0, 1)
          print(old[0][1])
          print(new[0][1])
        `,
        solution: py`
          def book(hall, r, c):
              new_hall = [row[:] for row in hall]
              new_hall[r][c] = "X"
              return new_hall

          old = [[".", "."], [".", "."]]
          new = book(old, 0, 1)
          print(old[0][1])
          print(new[0][1])
        `,
        tests: [
          { output: ".\nX" },
          { py: py`expect("book", ([["."]], 0, 0), [["X"]])` },
          { py: py`
            h = [[".", "X", "."], [".", ".", "."]]
            got = call("book", h, 1, 2)
            assert got == [[".", "X", "."], [".", ".", "X"]], "The new hall should have an X at row 1, column 2."
            assert h == [[".", "X", "."], [".", ".", "."]], "The old hall changed. Copy each row, not only the outer list."
          ` },
          { py: py`
            h = [["X", "."]]
            call("book", h, 0, 1)
            assert h == [["X", "."]], "The old hall changed. Copy each row, not only the outer list."
          ` },
        ],
        wrong: [py`
          def book(hall, r, c):
              new_hall = hall[:]
              new_hall[r][c] = "X"
              return new_hall

          old = [[".", "."], [".", "."]]
          new = book(old, 0, 1)
          print(old[0][1])
          print(new[0][1])
        `],
        hints: [
          md`The copy on line 2 makes a new outer list, but the rows inside are still the old rows.`,
          md`Only line 2 needs to change. Each row must be copied on its own.`,
          md`Use a list comprehension that takes a full slice of each row.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: book a cinema seat",
        task: md`
          Write a function «book_seat(seats, row, seat)». The ticket counts rows and seats **from 1**, so row 1, seat 1 is «seats[0][0]».

          - If that seat is free («"."»), change it to «"X"» and give back «"Booked"».
          - If it is already «"X"», change nothing and give back «"Taken"».

          Test it with this hall:

          : hall = [[".", "X", "."], [".", ".", "."]]

          Then print «book_seat(hall, 1, 2)» and «book_seat(hall, 2, 3)», and print the hall one row per line. It shows:

          | Taken
          | Booked
          | . X .
          | . . X
        `,
        starter: py`

        `,
        solution: py`
          def book_seat(seats, row, seat):
              if seats[row - 1][seat - 1] == "X":
                  return "Taken"
              seats[row - 1][seat - 1] = "X"
              return "Booked"

          hall = [[".", "X", "."], [".", ".", "."]]
          print(book_seat(hall, 1, 2))
          print(book_seat(hall, 2, 3))
          for r in hall:
              print(" ".join(r))
        `,
        tests: [
          { output: "Taken\nBooked\n. X .\n. . X" },
          { py: py`
            h = [["."]]
            assert call("book_seat", h, 1, 1) == "Booked", "Row 1, seat 1 is free, so «book_seat» should give back «Booked»."
            assert h == [["X"]], "After booking row 1, seat 1, that seat should be «X»."
            assert call("book_seat", h, 1, 1) == "Taken", "Booking the same seat again should give back «Taken»."
          ` },
          { py: py`
            h = [[".", ".", ".", "."], [".", ".", ".", "."], [".", ".", ".", "."]]
            call("book_seat", h, 3, 4)
            assert h[2][3] == "X", "Row 3, seat 4 is the last seat of the last row: position 2 and position 3."
            assert h[0] == [".", ".", ".", "."] and h[1] == [".", ".", ".", "."], "Only one seat should change. Check that you take 1 from both numbers."
          ` },
          { py: py`
            h = [["X", "X"], ["X", "."]]
            got = call("book_seat", h, 2, 1)
            assert got == "Taken", "Row 2, seat 1 is already X, so the answer should be «Taken»."
            assert h == [["X", "X"], ["X", "."]], "A taken seat must not change the hall."
          ` },
        ],
        wrong: [py`
          def book_seat(seats, row, seat):
              if seats[row][seat] == "X":
                  return "Taken"
              seats[row][seat] = "X"
              return "Booked"

          hall = [[".", "X", "."], [".", ".", "."]]
          print(book_seat(hall, 1, 2))
          print(book_seat(hall, 2, 3))
          for r in hall:
              print(" ".join(r))
        `, py`
          def book_seat(seats, row, seat):
              if seats[seat - 1][row - 1] == "X":
                  return "Taken"
              seats[seat - 1][row - 1] = "X"
              return "Booked"

          hall = [[".", "X", "."], [".", ".", "."]]
          print(book_seat(hall, 1, 2))
          print(book_seat(hall, 2, 3))
          for r in hall:
              print(" ".join(r))
        `],
        hints: [
          md`First check the seat. If it is taken, give back the answer at once. If not, change it and give back the other answer.`,
          md`The row goes in the first bracket and the seat in the second. Both numbers on the ticket start at 1, but positions start at 0.`,
          md`Take one away from the row number and from the seat number, in the check and in the change.`,
        ],
      },
    ],
    keys: [
      md`A **grid** is a list of rows. «grid[r][c]» is row «r», column «c», both from 0.`,
      md`Change a cell with «grid[r][c] = value». Print a grid row by row with «" ".join(row)».`,
      md`«[0] * 3» repeats items, but «[[0] * 3] * 3» repeats the **same** row. Use «[[0] * 3 for r in range(3)]».`,
      md`«grid.copy()» shares the rows. Copy a grid with «[row[:] for row in grid]» (or «copy.deepcopy»).`,
    ],
  });

  // ---------------------------------------------------------------- Day 62
  day({
    slug: "walking-a-grid",
    title: "Walking Through a Grid",
    goal: "Walk through a grid to add rows, columns and diagonals.",
    minutes: 45,
    kind: "lesson",
    needs: [61],
    win: "Today you can now walk through every cell of a grid, and add up its rows, its columns and its diagonals.",
    learn: [
      md`
        ## Two loops: rows, then columns

        To visit every cell, use two loops, one inside the other. The outer loop picks a row number. The inner loop walks every column in that row. Here a grid holds cups of chai sold: one row for each day, one column for each stall. Guess the output.
      `,
      ex(py`
        cups = [
            [3, 5, 2],
            [4, 1, 6],
        ]
        print(len(cups), len(cups[0]))
        for r in range(len(cups)):
            for c in range(len(cups[0])):
                print(r, c, cups[r][c])
      `, { predict: ["2 3\n0 0 3\n0 1 5\n0 2 2\n1 0 4\n1 1 1\n1 2 6", "2 3\n0 0 3\n1 0 4\n0 1 5\n1 1 1\n0 2 2\n1 2 6", "3 2\n0 0 3\n0 1 5\n0 2 2\n1 0 4\n1 1 1\n1 2 6"], answer: 0 }),
      md`
        «len(cups)» counts the rows: 2. «len(cups[0])» counts the columns, which is the length of one row: 3. The inner loop finishes a whole row before «r» moves on to the next row.
      `,
      ask({
        q: md`Why does the inner loop use «len(cups[0])» and not «len(cups)»?`,
        options: ["Because it walks the columns, and one row has as many items as there are columns", "Because the first row is the longest", "There is no reason: both give the same number"],
        answer: 0,
        explain: md`«cups[0]» is one row. Its length is the number of columns.`,
        why: [null, md`In a grid, every row has the same length. Row 0 is simply the one that always exists.`, md`Here «len(cups)» is 2 and «len(cups[0])» is 3. They are only the same in a square grid.`],
      }),
      md`
        ## Row totals and column totals

        A **row total** adds the numbers in one row. A **column total** adds the numbers in one column, going down through every row. Here are two students' marks in three subjects. Guess the output.
      `,
      ex(py`
        marks = [
            [70, 80, 90],
            [60, 75, 85],
        ]
        for row in marks:
            print(sum(row))
        for c in range(len(marks[0])):
            total = 0
            for r in range(len(marks)):
                total += marks[r][c]
            print(total)
      `, { predict: ["240\n220\n130\n155\n175", "130\n155\n175\n240\n220", "240\n220\n460"], answer: 0 }),
      md`
        A row is one list, so «sum(row)» adds it. A column is spread over all the rows. So the column loop is outside, and the row loop inside visits each row while «c» stays the same. Now watch a common mistake: «total = 0» is in the wrong place.
      `,
      ex(py`
        marks = [
            [70, 80, 90],
            [60, 75, 85],
        ]
        total = 0
        for c in range(len(marks[0])):
            for r in range(len(marks)):
                total += marks[r][c]
            print(total)
      `, { label: "A common mistake", predict: ["130\n285\n460", "130\n155\n175", "460"], answer: 0 }),
      md`
        «total» starts at 0 only once, so each column adds on top of the last one. Put «total = 0» inside the column loop, so every column starts again from 0.
      `,
      pause(md`Good place for a short break. Next: the two diagonals.`),
      md`
        ## The two diagonals

        A **square** grid has the same number of rows and columns. A **diagonal** is the line of cells from one corner to the opposite corner. A square grid has two of them. Guess what this prints.
      `,
      ex(py`
        g = [
            [1, 2, 0],
            [4, 5, 6],
            [7, 8, 9],
        ]
        n = len(g)
        down = 0
        up = 0
        for i in range(n):
            down += g[i][i]
            up += g[i][n - 1 - i]
        print(down, up)
      `, { predict: ["15 12", "15 15", "6 24"], answer: 0 }),
      md`
        On the first diagonal, the row and the column are the same number: «g[i][i]» gives 1, 5 and 9. On the other diagonal, the column starts at the right end and moves left: «g[i][n - 1 - i]» gives 0, 5 and 7. One loop is enough, because «i» moves down both diagonals together.
      `,
      ask({
        q: md`In a 3 by 3 grid, «n» is 3. Which column does «g[i][n - 1 - i]» use when «i» is 2?`,
        options: ["0", "2", "1"],
        answer: 0,
        explain: md`«3 - 1 - 2» is 0. The last row uses the first column.`,
        why: [null, md`That is the column for the first diagonal, «g[2][2]».`, md`Column 1 is used when «i» is 1, in the middle row.`],
      }),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          g = [[1, 2], [3, 4], [5, 6]]
          total = 0
          for r in range(len(g)):
              total += g[r][1]
          print(total)
        `, options: ["12", "9", "7"], answer: 0,
        explain: md`The column number stays 1, so the loop adds 2, 4 and 6.`,
        why: [null, md`9 is 1 + 3 + 5, the first column. The second bracket is 1, so it is the second column.`, md`7 is the total of one row, 3 + 4. The loop goes down the rows, not along one row.`],
        skill: "trace" },
      { q: md`What does this show?`, code: py`
          g = [[0, 0, 0, 0], [0, 0, 0, 0]]
          print(len(g), len(g[0]))
        `, options: ["2 4", "4 2", "8 4"], answer: 0,
        explain: md`There are 2 rows, and each row has 4 items.`,
        why: [null, md`The first number counts the rows of the grid, not the items in a row.`, md`«len» does not count every cell. It counts the items of the outer list: the rows.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          total = 0
          for i in range(len(g)):
              total += g[i][i]
          print(total)
        `, options: ["It adds the cells on the diagonal from the top left corner to the bottom right corner", "It adds every number in the first row", "It adds every number in the grid"],
        answer: 0, verify: false, mono: false,
        explain: md`The row and the column are both «i». So it visits row 0 column 0, then row 1 column 1, and so on.`,
        why: [null, md`The first row would be «g[0][i]». Here the row number changes too.`, md`Every number needs two loops. This one loop visits only one cell in each row.`],
        skill: "read" },
      { q: md`What happens?`, code: py`
          g = [[1, 2, 3], [4, 5, 6]]
          total = 0
          for c in range(len(g[0])):
              total += g[c][0]
          print(total)
        `, options: ["IndexError", "5", "KeyError"], answer: 0, error: true,
        explain: md`«c» goes up to 2, and it is used as the row number. There is no row at position 2, because the grid has only 2 rows.`,
        why: [null, md`5 is 1 + 4, the first column. That needs «g[r][0]» with «r» walking the rows.`, md`KeyError comes from a dictionary. A grid is a list of lists.`],
        skill: "debug" },
      { q: md`«g» is a 4 by 4 grid. Which cell of row 1 is on the diagonal from the top right to the bottom left?`,
        options: ["«g[1][2]»", "«g[1][1]»", "«g[1][3]»"], answer: 0,
        explain: md`The column is «n - 1 - i», and «4 - 1 - 1» is 2.`,
        why: [null, md`«g[1][1]» is on the other diagonal, from the top left corner.`, md`Column 3 is the right end. Only row 0 uses it on this diagonal.`],
        skill: "memory" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: every cell",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          seats = [[1, 0, 1], [0, 1, 1]]
          count = 0
          for r in range(len(seats)):
              for c in range(len(seats[0])):
                  if seats[r][c] == 1:
                      count += 1
          print(count)
        `,
        inputs: [],
        ask: [{ line: 6, hit: 3, name: "r" }, { line: 6, hit: 3, name: "c" }, { output: true }],
        hints: [
          md`Walk the first row from left to right, then the second row. Line 6 runs only for a cell that holds 1.`,
          md`The first two cells that hold 1 are both in the first row. Find the third one.`,
          md`The third 1 is in the second row. Count its place from 0.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: column totals",
        task: md`Read the program. Answer without running it. The grid holds runs scored by three batters in two matches.`,
        code: py`
          runs = [[10, 4], [6, 20], [0, 8]]
          cols = []
          for c in range(len(runs[0])):
              total = 0
              for r in range(len(runs)):
                  total += runs[r][c]
              cols.append(total)
          print(cols)
        `,
        inputs: [],
        ask: [{ line: 6, hit: 2, name: "total" }, { line: 7, hit: 1, name: "cols" }, { output: true }],
        hints: [
          md`The outer loop holds the column still. The inner loop goes down the three rows.`,
          md`For the first column, the numbers are the first item of each row.`,
          md`The total starts again from zero for the second column, so the list gets two separate totals.`,
        ],
      },
      {
        id: "t3", kind: "trace", title: "Be the Computer: both diagonals",
        task: md`Read the program. Answer without running it.`,
        code: py`
          g = [[5, 1, 2], [3, 6, 4], [7, 0, 9]]
          n = len(g)
          down = 0
          up = 0
          for i in range(n):
              down += g[i][i]
              up += g[i][n - 1 - i]
          print(down, up)
        `,
        inputs: [],
        ask: [{ line: 7, hit: 1, name: "up" }, { line: 6, hit: 3, name: "down" }, { output: true }],
        hints: [
          md`The size is 3, so the loop number goes 0, 1, 2.`,
          md`The first diagonal uses the same number for the row and the column. The other one starts at the last column.`,
          md`When the loop number is 0, the other diagonal uses row 0, column 2.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: a total for each day",
        task: md`
          Put the lines in order and set each indent. The grid holds cups of chai sold: one row for each day. The program adds each row with two loops by position, and prints:

          | Day 1: 10
          | Day 2: 11
        `,
        solution: py`
          sales = [[3, 5, 2], [4, 1, 6]]
          for r in range(len(sales)):
              total = 0
              for c in range(len(sales[r])):
                  total += sales[r][c]
              print(f"Day {r + 1}: {total}")
        `,
        distractors: ["for c in range(len(sales)):", "print(total)"],
        indent: "choose",
        tests: [{ output: "Day 1: 10\nDay 2: 11" }],
        hints: [
          md`The outer loop walks the days. Each day's total must start from zero, so that line is inside the outer loop.`,
          md`The inner loop walks the cells of one row, so its size is the length of that row.`,
          md`The print belongs to the outer loop only, after the inner loop has finished the row.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the column totals crash",
        task: md`
          «column_totals(grid)» should give back a list with the total of each column. The grid always has at least one row. For the marks below, the program should print:

          | [130, 155, 175]

          Instead it stops with an IndexError. Fix the one wrong line.
        `,
        starter: py`
          def column_totals(grid):
              totals = []
              for c in range(len(grid[0])):
                  total = 0
                  for r in range(len(grid[0])):
                      total += grid[r][c]
                  totals.append(total)
              return totals

          marks = [[70, 80, 90], [60, 75, 85]]
          print(column_totals(marks))
        `,
        bugLines: [5],
        solution: py`
          def column_totals(grid):
              totals = []
              for c in range(len(grid[0])):
                  total = 0
                  for r in range(len(grid)):
                      total += grid[r][c]
                  totals.append(total)
              return totals

          marks = [[70, 80, 90], [60, 75, 85]]
          print(column_totals(marks))
        `,
        tests: [
          { output: "[130, 155, 175]" },
          { py: py`expect("column_totals", ([[5]],), [5])` },
          { py: py`expect("column_totals", ([[1, 2], [3, 4], [5, 6]],), [9, 12])` },
          { py: py`expect("column_totals", ([[1, 2, 3, 4]],), [1, 2, 3, 4])` },
          { py: py`expect("column_totals", ([[2, 0], [0, 3]],), [2, 3])` },
        ],
        wrong: [py`
          def column_totals(grid):
              totals = []
              for c in range(len(grid[0])):
                  total = 0
                  for r in range(len(grid) - 1):
                      total += grid[r][c]
                  totals.append(total)
              return totals

          marks = [[70, 80, 90], [60, 75, 85]]
          print(column_totals(marks))
        `, py`
          def column_totals(grid):
              totals = []
              for c in range(len(grid)):
                  total = 0
                  for r in range(len(grid)):
                      total += grid[r][c]
                  totals.append(total)
              return totals

          marks = [[70, 80, 90], [60, 75, 85]]
          print(column_totals(marks))
        `],
        hints: [
          md`The grid has 2 rows and 3 columns. Ask which loop walks the rows, and how many times it runs.`,
          md`The inner loop goes down the rows, but its size is the length of one row. That is the number of columns.`,
          md`The inner loop should run once for each row, so its size is the length of the whole grid.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: a magic square check", optional: true,
        task: md`
          A **magic square** is a square grid with one special rule. Every row, every column and both diagonals add up to the same number. «is_magic(g)» checks only the rows, so the second square passes by mistake. Add checks for every column and for both diagonals. It must work for a square grid of any size. The program should then print:

          | True
          | False
        `,
        starter: py`
          def is_magic(g):
              target = sum(g[0])
              for row in g:
                  if sum(row) != target:
                      return False
              return True

          print(is_magic([[2, 7, 6], [9, 5, 1], [4, 3, 8]]))
          print(is_magic([[1, 2, 3], [3, 1, 2], [2, 3, 1]]))
        `,
        solution: py`
          def is_magic(g):
              n = len(g)
              target = sum(g[0])
              for row in g:
                  if sum(row) != target:
                      return False
              for c in range(n):
                  total = 0
                  for r in range(n):
                      total += g[r][c]
                  if total != target:
                      return False
              down = 0
              up = 0
              for i in range(n):
                  down += g[i][i]
                  up += g[i][n - 1 - i]
              if down != target or up != target:
                  return False
              return True

          print(is_magic([[2, 7, 6], [9, 5, 1], [4, 3, 8]]))
          print(is_magic([[1, 2, 3], [3, 1, 2], [2, 3, 1]]))
        `,
        tests: [
          { output: "True\nFalse" },
          { py: py`expect("is_magic", ([[7]],), True)` },
          { py: py`expect("is_magic", ([[16, 3, 2, 13], [5, 10, 11, 8], [9, 6, 7, 12], [4, 15, 14, 1]],), True)` },
          { py: py`expect("is_magic", ([[1, 1, 2], [1, 1, 2], [1, 1, 2]],), False)` },
          { py: py`expect("is_magic", ([[1, 2, 3], [2, 3, 1], [3, 1, 2]],), False)` },
          { py: py`expect("is_magic", ([[1, 2, 3], [3, 1, 2], [2, 3, 1]],), False)` },
        ],
        wrong: [py`
          def is_magic(g):
              n = len(g)
              target = sum(g[0])
              for row in g:
                  if sum(row) != target:
                      return False
              for c in range(n):
                  total = 0
                  for r in range(n):
                      total += g[r][c]
                  if total != target:
                      return False
              down = 0
              for i in range(n):
                  down += g[i][i]
              if down != target:
                  return False
              return True

          print(is_magic([[2, 7, 6], [9, 5, 1], [4, 3, 8]]))
          print(is_magic([[1, 2, 3], [3, 1, 2], [2, 3, 1]]))
        `],
        hints: [
          md`Keep the row check. After it, add one check for the columns and one for the two diagonals. Return False as soon as one total is different.`,
          md`The column check needs two loops: the column outside, the rows inside, with a new total for each column. The diagonals need one loop.`,
          md`Use the size of the grid for every loop. The second diagonal takes its column from the size minus one minus the loop number.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a marks table with totals",
        task: md`
          Write a function «report(names, marks)». «names» is a list of students. «marks» is a grid: one row for each student, one column for each subject. There is at least one student and one subject. The function prints one line for each student, then a «Total» line:

          - the name in 6 places on the left, like «{name:<6}»
          - each mark in 4 places, like «{m:4}»
          - then « = » and the total of that line.

          The «Total» line starts with «Total » and shows each column total. Then it shows the **grand total**: the total of all the marks. Test it with:

          : names = ["Asha", "Ravi", "Meena"]
          : marks = [[70, 80, 90], [60, 75, 85], [88, 92, 79]]
          : report(names, marks)

          It shows:

          | Asha    70  80  90 = 240
          | Ravi    60  75  85 = 220
          | Meena   88  92  79 = 259
          | Total  218 247 254 = 719
        `,
        starter: py`

        `,
        solution: py`
          def report(names, marks):
              col_totals = []
              for c in range(len(marks[0])):
                  total = 0
                  for r in range(len(marks)):
                      total += marks[r][c]
                  col_totals.append(total)
              for r in range(len(marks)):
                  line = f"{names[r]:<6}"
                  for m in marks[r]:
                      line += f"{m:4}"
                  print(line + f" = {sum(marks[r])}")
              line = "Total "
              for t in col_totals:
                  line += f"{t:4}"
              print(line + f" = {sum(col_totals)}")

          names = ["Asha", "Ravi", "Meena"]
          marks = [[70, 80, 90], [60, 75, 85], [88, 92, 79]]
          report(names, marks)
        `,
        tests: [
          { output: "Asha    70  80  90 = 240\nRavi    60  75  85 = 220\nMeena   88  92  79 = 259\nTotal  218 247 254 = 719" },
          { py: py`
            got = printed("report", ["Om"], [[5]])
            assert got.splitlines() == ["Om       5 = 5", "Total    5 = 5"], "With one student Om and one subject, «report» should print two lines: Om with 5 = 5, then Total with 5 = 5. Check the widths: 6 places for the name, 4 for each mark."
          ` },
          { py: py`
            got = printed("report", ["Asha", "Ravi"], [[10, 20, 30, 40], [1, 2, 3, 4]])
            assert got.splitlines() == ["Asha    10  20  30  40 = 100", "Ravi     1   2   3   4 = 10", "Total   11  22  33  44 = 110"], "With 2 students and 4 subjects, check the column totals: 11, 22, 33 and 44, and the grand total 110."
          ` },
          { py: py`
            got = printed("report", ["A", "B", "C", "D"], [[50], [60], [70], [80]])
            assert got.splitlines() == ["A       50 = 50", "B       60 = 60", "C       70 = 70", "D       80 = 80", "Total  260 = 260"], "With 4 students and one subject, the column total is 260. Check that every row is added into it."
          ` },
        ],
        wrong: [py`
          def report(names, marks):
              col_totals = []
              total = 0
              for c in range(len(marks[0])):
                  for r in range(len(marks)):
                      total += marks[r][c]
                  col_totals.append(total)
              for r in range(len(marks)):
                  line = f"{names[r]:<6}"
                  for m in marks[r]:
                      line += f"{m:4}"
                  print(line + f" = {sum(marks[r])}")
              line = "Total "
              for t in col_totals:
                  line += f"{t:4}"
              print(line + f" = {sum(col_totals)}")

          names = ["Asha", "Ravi", "Meena"]
          marks = [[70, 80, 90], [60, 75, 85], [88, 92, 79]]
          report(names, marks)
        `, py`
          def report(names, marks):
              for r in range(len(marks)):
                  line = f"{names[r]:<6}"
                  for m in marks[r]:
                      line += f"{m:4}"
                  print(line + f" = {sum(marks[r])}")
              line = "Total "
              for row in marks:
                  line += f"{sum(row):4}"
              print(line + f" = {sum(marks[-1])}")

          names = ["Asha", "Ravi", "Meena"]
          marks = [[70, 80, 90], [60, 75, 85], [88, 92, 79]]
          report(names, marks)
        `],
        hints: [
          md`Work in two parts. First make a list of column totals with two loops. Then print each student's line, and last the Total line.`,
          md`Build each line as text. Start with the name, and add each mark in 4 places in a loop. Then add the equals sign and the total of the row.`,
          md`For the column totals, the column loop is outside and the row loop is inside. Set the total to zero at the start of each column. The grand total is the total of the column totals.`,
        ],
      },
    ],
    keys: [
      md`Visit every cell with two loops: rows outside, columns inside. «len(grid)» counts rows; «len(grid[0])» counts columns.`,
      md`A row total is «sum(row)». A column total needs a loop down the rows, with «c» held still.`,
      md`Set a total to 0 **inside** the outer loop, so each row or column starts again.`,
      md`In a square grid of size «n», the diagonals are «g[i][i]» and «g[i][n - 1 - i]».`,
    ],
  });

  // ---------------------------------------------------------------- Day 63
  day({
    slug: "tic-tac-toe-referee",
    title: "Project: Tic-Tac-Toe Referee",
    goal: "Write functions that judge a board and choose a legal move.",
    minutes: 45,
    kind: "project",
    needs: [55, 60, 62],
    win: "Today you can now write a referee that judges any Tic-Tac-Toe board and a computer player that always makes a legal move. This completes Level 5.",
    learn: [
      md`
        ## The referee

        A **referee** is the person who judges a game. Today you write functions that judge a Tic-Tac-Toe board. The board is a grid of 3 rows and 3 columns. Each cell holds «"X"», «"O"» or «"."» for an empty cell.

        A player wins with three of their marks in one row, one column or one diagonal. A **legal move** is a move into an empty cell. If the board is full and nobody has won, the game is a **draw**.
      `,
      code(py`
        board = [
            ["X", "O", "."],
            ["X", "O", "."],
            [".", "O", "X"],
        ]
        for row in board:
            print(" ".join(row))
      `),
      md`
        ## Four stages

        Stage 1 checks the rows and the columns. Stage 2 adds the two diagonals. Stage 3 lists the legal moves and finds a draw. Stage 4 starts from a blank page and adds a computer player. Today teaches nothing new: you use grids (Days 61 and 62) and the planning steps of Day 55.

        Each stage saves when you pass it, so you may stop after any stage and come back later.
      `,
      tip(md`
        The hidden tests give your functions many different boards. Before you run, take one board on paper and say what the answer should be.
      `),
      pause(md`If you stop for a break, stop after a stage. Your passed stages are saved.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          board = [["O", "X", "."], ["O", "X", "."], ["O", ".", "X"]]
          for c in range(3):
              if board[0][c] != "." and board[0][c] == board[1][c] and board[1][c] == board[2][c]:
                  print(c, board[0][c])
        `, options: ["0 O", "1 X", "0 O\n1 X"], answer: 0,
        explain: md`Only column 0 holds the same mark three times. Column 1 has «X», «X» and an empty cell.`,
        why: [null, md`Column 1 is «X», «X», «"."». The bottom cell is empty, so it is not three in a line.`, md`Column 1 is not a full line: its bottom cell is empty.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          moves = []
          for r in range(3):
              for c in range(3):
                  if board[r][c] == ".":
                      moves.append((r, c))
        `, options: ["It makes a list of the row and column of every empty cell", "It counts the X marks on the board", "It fills every empty cell"],
        answer: 0, verify: false, mono: false,
        explain: md`The two loops visit every cell. Each empty cell adds a pair, its row and its column, to the list.`,
        why: [null, md`It looks for «"."», the empty cell, not for «X».`, md`Nothing on the board changes. Only the list «moves» grows.`],
        skill: "read" },
      { q: md`This referee has no check for empty cells. What does it show?`, code: py`
          def winner(board):
              for row in board:
                  if row[0] == row[1] and row[1] == row[2]:
                      return row[0]
              return None

          print(winner([[".", ".", "."], [".", ".", "."], [".", ".", "."]]))
        `, options: [".", "None", "X"], answer: 0,
        explain: md`Three empty cells are equal too, so the first row counts as a win for «"."». The check that the first cell is not «"."» stops this.`,
        why: [null, md`«None» comes only when no row matches. Here every row matches.`, md`There is no «X» anywhere on this board.`],
        skill: "debug" },
      { q: md`Which three cells make the diagonal from the top right corner to the bottom left corner?`,
        options: ["«board[0][2]», «board[1][1]», «board[2][0]»", "«board[0][0]», «board[1][1]», «board[2][2]»", "«board[2][0]», «board[2][1]», «board[2][2]»"], answer: 0,
        explain: md`The row goes 0, 1, 2 while the column goes 2, 1, 0.`,
        why: [null, md`That is the other diagonal, from the top left corner.`, md`That is the bottom row.`],
        skill: "memory" },
      { q: md`The computer wants to try a move without changing the real board. Which line makes a safe copy to try it on?`,
        options: ["«test = [row[:] for row in board]»", "«test = board.copy()»", "«test = board»"], answer: 0,
        explain: md`The comprehension copies every row, so a change to «test» never reaches «board».`,
        why: [null, md`«.copy()» copies only the outer list. The rows are still shared, as on Day 61.`, md`That is a second name for the same board, as on Day 53.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "s1", stage: 1, title: "Stage 1: rows and columns",
        task: md`
          «winner(board)» gives back «"X"» or «"O"» when that player has three in a line, and «None» when nobody has. It checks the rows already. Add a check for the three columns, before «return None». An empty column is not a win. For this board the program should print:

          | O
        `,
        starter: py`
          def winner(board):
              for row in board:
                  if row[0] != "." and row[0] == row[1] and row[1] == row[2]:
                      return row[0]
              # Add the column check here.
              return None

          board = [
              ["X", "O", "."],
              ["X", "O", "."],
              [".", "O", "X"],
          ]
          print(winner(board))
        `,
        solution: py`
          def winner(board):
              for row in board:
                  if row[0] != "." and row[0] == row[1] and row[1] == row[2]:
                      return row[0]
              for c in range(3):
                  if board[0][c] != "." and board[0][c] == board[1][c] and board[1][c] == board[2][c]:
                      return board[0][c]
              return None

          board = [
              ["X", "O", "."],
              ["X", "O", "."],
              [".", "O", "X"],
          ]
          print(winner(board))
        `,
        tests: [
          { output: "O" },
          { py: py`expect("winner", ([["X", "O", "."], ["X", "O", "."], ["X", ".", "."]],), "X")` },
          { py: py`expect("winner", ([["X", ".", "O"], [".", "X", "O"], ["X", ".", "O"]],), "O")` },
          { py: py`expect("winner", ([[".", ".", "."], ["O", "O", "O"], ["X", "X", "."]],), "O")` },
          { py: py`expect("winner", ([[".", ".", "."], [".", ".", "."], [".", ".", "."]],), None)` },
          { py: py`expect("winner", ([["X", "O", "."], ["O", "X", "."], ["X", "O", "."]],), None)` },
          { py: py`expect("winner", ([["X", "O", "X"], ["X", "O", "O"], ["O", "X", "X"]],), None)` },
        ],
        wrong: [py`
          def winner(board):
              for row in board:
                  if row[0] != "." and row[0] == row[1] and row[1] == row[2]:
                      return row[0]
              for c in range(3):
                  if board[0][c] == board[1][c] and board[1][c] == board[2][c]:
                      return board[0][c]
              return None

          board = [
              ["X", "O", "."],
              ["X", "O", "."],
              [".", "O", "X"],
          ]
          print(winner(board))
        `, py`
          def winner(board):
              for row in board:
                  if row[0] != "." and row[0] == row[1] and row[1] == row[2]:
                      return row[0]
              for c in range(3):
                  if board[c][0] != "." and board[c][0] == board[c][1] and board[c][1] == board[c][2]:
                      return board[c][0]
              return None

          board = [
              ["X", "O", "."],
              ["X", "O", "."],
              [".", "O", "X"],
          ]
          print(winner(board))
        `],
        hints: [
          md`Copy the idea of the row check: one loop and one test. The test asks if three cells hold the same mark, and that mark is not empty.`,
          md`Loop over the three column numbers. In a column, the column number stays the same while the row number goes 0, 1, 2.`,
          md`Compare the top cell of the column with the middle one, and the middle one with the bottom one. Also check that the top cell is not empty, then give back the top cell.`,
        ],
      },
      {
        id: "s2", stage: 2, carry: "s1", title: "Stage 2: the two diagonals",
        task: md`
          Add a check for the two diagonals, also before «return None». An empty diagonal is not a win. The program still prints:

          | O

          The hidden tests try boards with a diagonal win for «X» and for «O».
        `,
        starter: py`
          def winner(board):
              for row in board:
                  if row[0] != "." and row[0] == row[1] and row[1] == row[2]:
                      return row[0]
              for c in range(3):
                  if board[0][c] != "." and board[0][c] == board[1][c] and board[1][c] == board[2][c]:
                      return board[0][c]
              return None

          board = [
              ["X", "O", "."],
              ["X", "O", "."],
              [".", "O", "X"],
          ]
          print(winner(board))
        `,
        solution: py`
          def winner(board):
              for row in board:
                  if row[0] != "." and row[0] == row[1] and row[1] == row[2]:
                      return row[0]
              for c in range(3):
                  if board[0][c] != "." and board[0][c] == board[1][c] and board[1][c] == board[2][c]:
                      return board[0][c]
              if board[1][1] != "." and board[0][0] == board[1][1] and board[1][1] == board[2][2]:
                  return board[1][1]
              if board[1][1] != "." and board[0][2] == board[1][1] and board[1][1] == board[2][0]:
                  return board[1][1]
              return None

          board = [
              ["X", "O", "."],
              ["X", "O", "."],
              [".", "O", "X"],
          ]
          print(winner(board))
        `,
        tests: [
          { output: "O" },
          { py: py`expect("winner", ([["X", "O", "."], ["O", "X", "."], [".", "O", "X"]],), "X")` },
          { py: py`expect("winner", ([["X", ".", "O"], ["X", "O", "."], ["O", ".", "X"]],), "O")` },
          { py: py`expect("winner", ([[".", ".", "."], [".", ".", "."], [".", ".", "."]],), None)` },
          { py: py`expect("winner", ([["X", ".", "O"], [".", "X", "O"], ["X", ".", "O"]],), "O")` },
          { py: py`expect("winner", ([["X", "O", "X"], ["X", "O", "O"], ["O", "X", "X"]],), None)` },
        ],
        wrong: [py`
          def winner(board):
              for row in board:
                  if row[0] != "." and row[0] == row[1] and row[1] == row[2]:
                      return row[0]
              for c in range(3):
                  if board[0][c] != "." and board[0][c] == board[1][c] and board[1][c] == board[2][c]:
                      return board[0][c]
              if board[1][1] != "." and board[0][0] == board[1][1] and board[1][1] == board[2][2]:
                  return board[1][1]
              return None

          board = [
              ["X", "O", "."],
              ["X", "O", "."],
              [".", "O", "X"],
          ]
          print(winner(board))
        `, py`
          def winner(board):
              for row in board:
                  if row[0] != "." and row[0] == row[1] and row[1] == row[2]:
                      return row[0]
              for c in range(3):
                  if board[0][c] != "." and board[0][c] == board[1][c] and board[1][c] == board[2][c]:
                      return board[0][c]
              if board[0][0] == board[1][1] and board[1][1] == board[2][2]:
                  return board[1][1]
              if board[0][2] == board[1][1] and board[1][1] == board[2][0]:
                  return board[1][1]
              return None

          board = [
              ["X", "O", "."],
              ["X", "O", "."],
              [".", "O", "X"],
          ]
          print(winner(board))
        `],
        hints: [
          md`There are only two diagonals, so you need no loop: write two separate checks.`,
          md`Both diagonals pass through the centre cell, row 1 and column 1. One diagonal starts at the top left corner, the other at the top right corner.`,
          md`For each diagonal, check that the centre is not empty. Then check that the first corner equals the centre, and the centre equals the opposite corner. If so, give back the centre.`,
        ],
      },
      {
        id: "s3", stage: 3, carry: "s2", title: "Stage 3: legal moves and a draw",
        task: md`
          Add two functions after «winner»:

          - «legal_moves(board)» gives back a list of every empty cell as a pair «(row, column)». List them row by row, from the top left.
          - «is_draw(board)» gives back «True» when nobody has won **and** there are no legal moves left, and «False» otherwise.

          Then add two lines at the end that print «legal_moves(board)» and «is_draw(board)». The program shows:

          | O
          | [(0, 2), (1, 2), (2, 0)]
          | False
        `,
        starter: py`
          def winner(board):
              for row in board:
                  if row[0] != "." and row[0] == row[1] and row[1] == row[2]:
                      return row[0]
              for c in range(3):
                  if board[0][c] != "." and board[0][c] == board[1][c] and board[1][c] == board[2][c]:
                      return board[0][c]
              if board[1][1] != "." and board[0][0] == board[1][1] and board[1][1] == board[2][2]:
                  return board[1][1]
              if board[1][1] != "." and board[0][2] == board[1][1] and board[1][1] == board[2][0]:
                  return board[1][1]
              return None

          board = [
              ["X", "O", "."],
              ["X", "O", "."],
              [".", "O", "X"],
          ]
          print(winner(board))
        `,
        solution: py`
          def winner(board):
              for row in board:
                  if row[0] != "." and row[0] == row[1] and row[1] == row[2]:
                      return row[0]
              for c in range(3):
                  if board[0][c] != "." and board[0][c] == board[1][c] and board[1][c] == board[2][c]:
                      return board[0][c]
              if board[1][1] != "." and board[0][0] == board[1][1] and board[1][1] == board[2][2]:
                  return board[1][1]
              if board[1][1] != "." and board[0][2] == board[1][1] and board[1][1] == board[2][0]:
                  return board[1][1]
              return None

          def legal_moves(board):
              moves = []
              for r in range(3):
                  for c in range(3):
                      if board[r][c] == ".":
                          moves.append((r, c))
              return moves

          def is_draw(board):
              return winner(board) is None and len(legal_moves(board)) == 0

          board = [
              ["X", "O", "."],
              ["X", "O", "."],
              [".", "O", "X"],
          ]
          print(winner(board))
          print(legal_moves(board))
          print(is_draw(board))
        `,
        tests: [
          { output: "O\n[(0, 2), (1, 2), (2, 0)]\nFalse" },
          { py: py`expect("legal_moves", ([[".", ".", "."], [".", ".", "."], [".", ".", "."]],), [(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2), (2, 0), (2, 1), (2, 2)])` },
          { py: py`expect("legal_moves", ([["X", "O", "X"], ["X", "O", "O"], ["O", "X", "X"]],), [])` },
          { py: py`expect("legal_moves", ([["X", "O", "X"], ["O", "X", "O"], ["O", "X", "."]],), [(2, 2)])` },
          { py: py`expect("legal_moves", ([[".", "O", "X"], ["X", "O", "."], ["O", "X", "O"]],), [(0, 0), (1, 2)])` },
          { py: py`expect("is_draw", ([["X", "O", "X"], ["X", "O", "O"], ["O", "X", "X"]],), True)` },
          { py: py`expect("is_draw", ([["X", "X", "X"], ["O", "O", "X"], ["X", "O", "O"]],), False)` },
          { py: py`expect("is_draw", ([["X", "O", "X"], ["O", "X", "O"], ["O", "X", "."]],), False)` },
          { py: py`expect("is_draw", ([[".", ".", "."], [".", ".", "."], [".", ".", "."]],), False)` },
        ],
        wrong: [py`
          def winner(board):
              for row in board:
                  if row[0] != "." and row[0] == row[1] and row[1] == row[2]:
                      return row[0]
              for c in range(3):
                  if board[0][c] != "." and board[0][c] == board[1][c] and board[1][c] == board[2][c]:
                      return board[0][c]
              if board[1][1] != "." and board[0][0] == board[1][1] and board[1][1] == board[2][2]:
                  return board[1][1]
              if board[1][1] != "." and board[0][2] == board[1][1] and board[1][1] == board[2][0]:
                  return board[1][1]
              return None

          def legal_moves(board):
              moves = []
              for r in range(3):
                  for c in range(3):
                      if board[r][c] == ".":
                          moves.append((r, c))
              return moves

          def is_draw(board):
              return len(legal_moves(board)) == 0

          board = [
              ["X", "O", "."],
              ["X", "O", "."],
              [".", "O", "X"],
          ]
          print(winner(board))
          print(legal_moves(board))
          print(is_draw(board))
        `, py`
          def winner(board):
              for row in board:
                  if row[0] != "." and row[0] == row[1] and row[1] == row[2]:
                      return row[0]
              for c in range(3):
                  if board[0][c] != "." and board[0][c] == board[1][c] and board[1][c] == board[2][c]:
                      return board[0][c]
              if board[1][1] != "." and board[0][0] == board[1][1] and board[1][1] == board[2][2]:
                  return board[1][1]
              if board[1][1] != "." and board[0][2] == board[1][1] and board[1][1] == board[2][0]:
                  return board[1][1]
              return None

          def legal_moves(board):
              moves = []
              for c in range(3):
                  for r in range(3):
                      if board[r][c] == ".":
                          moves.append((r, c))
              return moves

          def is_draw(board):
              return winner(board) is None and len(legal_moves(board)) == 0

          board = [
              ["X", "O", "."],
              ["X", "O", "."],
              [".", "O", "X"],
          ]
          print(winner(board))
          print(legal_moves(board))
          print(is_draw(board))
        `],
        hints: [
          md`For the moves, start an empty list and visit every cell with two loops. Add the pair for each empty cell. For the draw, use the two functions you already have.`,
          md`The row loop is outside and the column loop inside, so the pairs come row by row. The pair is the row number and the column number in round brackets.`,
          md`A draw needs two things together: the winner is nothing, and the list of legal moves has length zero. A full board with three in a line is a win, not a draw.`,
        ],
      },
      {
        id: "s4", stage: 4, kind: "make", title: "Stage 4: the whole referee, from a blank page",
        task: md`
          Write the whole referee again from a blank page: «winner», «legal_moves» and «is_draw», exactly as before. Then add a computer player:

          - «computer_move(board)» gives back one legal move as a pair «(row, column)». It must not write on the board.
          - A simple rule: take the centre «(1, 1)» if it is empty, otherwise the first legal move.

          Test it with this board, and print the four answers:

          : board = [["X", "O", "X"], [".", "O", "."], [".", ".", "."]]

          The first three lines must be:

          | None
          | [(1, 0), (1, 2), (2, 0), (2, 1), (2, 2)]
          | False

          The fourth line is your computer's move. The tests accept any empty cell.
        `,
        starter: py`

        `,
        solution: py`
          def winner(board):
              for row in board:
                  if row[0] != "." and row[0] == row[1] and row[1] == row[2]:
                      return row[0]
              for c in range(3):
                  if board[0][c] != "." and board[0][c] == board[1][c] and board[1][c] == board[2][c]:
                      return board[0][c]
              if board[1][1] != "." and board[0][0] == board[1][1] and board[1][1] == board[2][2]:
                  return board[1][1]
              if board[1][1] != "." and board[0][2] == board[1][1] and board[1][1] == board[2][0]:
                  return board[1][1]
              return None

          def legal_moves(board):
              moves = []
              for r in range(3):
                  for c in range(3):
                      if board[r][c] == ".":
                          moves.append((r, c))
              return moves

          def is_draw(board):
              return winner(board) is None and len(legal_moves(board)) == 0

          def computer_move(board):
              if board[1][1] == ".":
                  return (1, 1)
              return legal_moves(board)[0]

          board = [["X", "O", "X"], [".", "O", "."], [".", ".", "."]]
          print(winner(board))
          print(legal_moves(board))
          print(is_draw(board))
          print(computer_move(board))
        `,
        tests: [
          { py: py`assert LINES[:3] == ["None", "[(1, 0), (1, 2), (2, 0), (2, 1), (2, 2)]", "False"], "The first three lines should be None, then the list of 5 empty cells, then False. Check the order: winner, legal moves, draw."` },
          { py: py`
            boards = [
                ([["X", "X", "X"], ["O", "O", "."], [".", ".", "."]], "X"),
                ([["O", "X", "."], ["O", "X", "."], ["O", ".", "X"]], "O"),
                ([["X", "O", "."], ["O", "X", "."], [".", "O", "X"]], "X"),
                ([["X", ".", "O"], ["X", "O", "."], ["O", ".", "X"]], "O"),
                ([[".", ".", "."], [".", ".", "."], [".", ".", "."]], None),
                ([["X", "O", "X"], ["X", "O", "O"], ["O", "X", "X"]], None),
            ]
            for b, w in boards:
                expect("winner", (b,), w)
          ` },
          { py: py`
            expect("legal_moves", ([["X", "O", "X"], ["O", "X", "O"], ["O", "X", "."]],), [(2, 2)])
            expect("legal_moves", ([[".", "O", "X"], ["X", "O", "."], ["O", "X", "O"]],), [(0, 0), (1, 2)])
            expect("legal_moves", ([["X", "O", "X"], ["X", "O", "O"], ["O", "X", "X"]],), [])
          ` },
          { py: py`
            expect("is_draw", ([["X", "O", "X"], ["X", "O", "O"], ["O", "X", "X"]],), True)
            expect("is_draw", ([["X", "X", "X"], ["O", "O", "X"], ["X", "O", "O"]],), False)
            expect("is_draw", ([["X", "O", "X"], ["O", "X", "O"], ["O", "X", "."]],), False)
          ` },
          { py: py`
            boards = [
                [[".", ".", "."], [".", ".", "."], [".", ".", "."]],
                [["X", ".", "."], [".", "O", "."], [".", ".", "."]],
                [["X", "O", "X"], ["O", "X", "O"], ["O", "X", "."]],
                [[".", "O", "X"], ["X", "O", "O"], ["O", "X", "X"]],
                [["X", "O", "X"], ["X", "O", "."], ["O", "X", "O"]],
            ]
            for b in boards:
                before = [row[:] for row in b]
                free = []
                for r in range(3):
                    for c in range(3):
                        if b[r][c] == ".":
                            free.append((r, c))
                move = call("computer_move", b)
                assert move in free, f"For the board {before}, the computer chose {move}. That is not an empty cell. Give back a pair (row, column) of an empty cell."
                assert b == before, "«computer_move» wrote on the board. It should only choose a cell, not change the board."
          ` },
        ],
        wrong: [py`
          def winner(board):
              for row in board:
                  if row[0] != "." and row[0] == row[1] and row[1] == row[2]:
                      return row[0]
              for c in range(3):
                  if board[0][c] != "." and board[0][c] == board[1][c] and board[1][c] == board[2][c]:
                      return board[0][c]
              if board[1][1] != "." and board[0][0] == board[1][1] and board[1][1] == board[2][2]:
                  return board[1][1]
              if board[1][1] != "." and board[0][2] == board[1][1] and board[1][1] == board[2][0]:
                  return board[1][1]
              return None

          def legal_moves(board):
              moves = []
              for r in range(3):
                  for c in range(3):
                      if board[r][c] == ".":
                          moves.append((r, c))
              return moves

          def is_draw(board):
              return winner(board) is None and len(legal_moves(board)) == 0

          def computer_move(board):
              return (1, 1)

          board = [["X", "O", "X"], [".", "O", "."], [".", ".", "."]]
          print(winner(board))
          print(legal_moves(board))
          print(is_draw(board))
          print(computer_move(board))
        `, py`
          def winner(board):
              for row in board:
                  if row[0] != "." and row[0] == row[1] and row[1] == row[2]:
                      return row[0]
              for c in range(3):
                  if board[0][c] != "." and board[0][c] == board[1][c] and board[1][c] == board[2][c]:
                      return board[0][c]
              return None

          def legal_moves(board):
              moves = []
              for r in range(3):
                  for c in range(3):
                      if board[r][c] == ".":
                          moves.append((r, c))
              return moves

          def is_draw(board):
              return winner(board) is None and len(legal_moves(board)) == 0

          def computer_move(board):
              move = legal_moves(board)[0]
              board[move[0]][move[1]] = "O"
              return move

          board = [["X", "O", "X"], [".", "O", "."], [".", ".", "."]]
          print(winner(board))
          print(legal_moves(board))
          print(is_draw(board))
          print(computer_move(board))
        `],
        hints: [
          md`Plan first, as on Day 55: write the four function names with what goes in and what comes out. Then build them in the order of the stages, and run after each one.`,
          md`The first three functions are your stages 1 to 3. For the computer, look at the centre cell first. If it is taken, use the list from the legal moves function.`,
          md`The computer gives back the centre pair when the centre is empty. Otherwise it gives back the first item of the legal moves list. It never writes a mark on the board itself.`,
        ],
      },
      {
        id: "d1", kind: "drill", title: "Laptop Mission: the referee on your laptop",
        task: md`
          This pretend Command Prompt runs the referee on a laptop. Type each command and press Enter.

          On a phone, you may skip this. Phone users are excused from the mission below.
        `,
        steps: [
          { say: md`Go into your project folder. Type «cd python-days» and press Enter.`,
            expect: ["cd python-days"], output: "" },
          { say: md`Run the referee. Type «python referee.py» and press Enter.`,
            expect: ["python referee.py", "py referee.py"],
            output: "None\n[(1, 0), (1, 2), (2, 0), (2, 1), (2, 2)]\nFalse\n(1, 0)" },
        ],
        mission: md`
          Now do it for real. In IDLE, make a new file and type your Stage 4 program. Save it as «referee.py» in your «python-days» folder.

          1. Run it with F5 or with «python referee.py». Check the four lines.
          2. Change the board so that «O» fills the middle column, and run it again. The first line now shows «O».
          3. Count the empty cells in your new board. That number is your receipt code: write it in your notebook.
        `,
        hints: [
          md`Type the words in the grey box exactly, then press Enter.`,
          md`There is one space between the word python and the file name.`,
          md`If python does not work on your laptop, py does the same job.`,
        ],
      },
      {
        id: "twist", kind: "modify", carry: "s4", optional: true, noStep: true, title: "Own Twist: a smarter computer",
        task: md`
          Make the computer smarter. Before the centre rule, try every legal move on a **copy** of the board. Try it first with «"X"» and then with «"O"». If a move makes three in a line for either player, take it. It wins, or it blocks the other player. For this board:

          : board = [["X", "O", "X"], [".", "O", "."], [".", ".", "."]]

          the computer should now choose «(2, 1)», because «O» has two in the middle column.

          You may add your own ideas too, such as a corner rule. The tests check the referee and that every move is legal. They also try two boards with one line to complete. So your own idea is safe.
        `,
        starter: py`
          def winner(board):
              for row in board:
                  if row[0] != "." and row[0] == row[1] and row[1] == row[2]:
                      return row[0]
              for c in range(3):
                  if board[0][c] != "." and board[0][c] == board[1][c] and board[1][c] == board[2][c]:
                      return board[0][c]
              if board[1][1] != "." and board[0][0] == board[1][1] and board[1][1] == board[2][2]:
                  return board[1][1]
              if board[1][1] != "." and board[0][2] == board[1][1] and board[1][1] == board[2][0]:
                  return board[1][1]
              return None

          def legal_moves(board):
              moves = []
              for r in range(3):
                  for c in range(3):
                      if board[r][c] == ".":
                          moves.append((r, c))
              return moves

          def is_draw(board):
              return winner(board) is None and len(legal_moves(board)) == 0

          def computer_move(board):
              if board[1][1] == ".":
                  return (1, 1)
              return legal_moves(board)[0]

          board = [["X", "O", "X"], [".", "O", "."], [".", ".", "."]]
          print(winner(board))
          print(legal_moves(board))
          print(is_draw(board))
          print(computer_move(board))
        `,
        solution: py`
          def winner(board):
              for row in board:
                  if row[0] != "." and row[0] == row[1] and row[1] == row[2]:
                      return row[0]
              for c in range(3):
                  if board[0][c] != "." and board[0][c] == board[1][c] and board[1][c] == board[2][c]:
                      return board[0][c]
              if board[1][1] != "." and board[0][0] == board[1][1] and board[1][1] == board[2][2]:
                  return board[1][1]
              if board[1][1] != "." and board[0][2] == board[1][1] and board[1][1] == board[2][0]:
                  return board[1][1]
              return None

          def legal_moves(board):
              moves = []
              for r in range(3):
                  for c in range(3):
                      if board[r][c] == ".":
                          moves.append((r, c))
              return moves

          def is_draw(board):
              return winner(board) is None and len(legal_moves(board)) == 0

          def computer_move(board):
              for r, c in legal_moves(board):
                  for mark in ["X", "O"]:
                      test = [row[:] for row in board]
                      test[r][c] = mark
                      if winner(test) == mark:
                          return (r, c)
              if board[1][1] == ".":
                  return (1, 1)
              return legal_moves(board)[0]

          board = [["X", "O", "X"], [".", "O", "."], [".", ".", "."]]
          print(winner(board))
          print(legal_moves(board))
          print(is_draw(board))
          print(computer_move(board))
        `,
        tests: [
          { py: py`assert LINES[:3] == ["None", "[(1, 0), (1, 2), (2, 0), (2, 1), (2, 2)]", "False"], "The first three lines should still be None, the list of 5 empty cells, and False."` },
          { py: py`
            expect("winner", ([["O", "X", "."], ["O", "X", "."], ["O", ".", "X"]],), "O")
            expect("winner", ([["X", ".", "O"], ["X", "O", "."], ["O", ".", "X"]],), "O")
            expect("is_draw", ([["X", "O", "X"], ["X", "O", "O"], ["O", "X", "X"]],), True)
            expect("legal_moves", ([[".", "O", "X"], ["X", "O", "."], ["O", "X", "O"]],), [(0, 0), (1, 2)])
          ` },
          { py: py`
            boards = [
                [[".", ".", "."], [".", ".", "."], [".", ".", "."]],
                [["X", "O", "X"], ["O", "X", "O"], ["O", "X", "."]],
                [["X", "O", "X"], ["X", "O", "."], ["O", "X", "O"]],
            ]
            for b in boards:
                before = [row[:] for row in b]
                move = call("computer_move", b)
                assert move in call("legal_moves", before), f"For the board {before}, the computer chose {move}, which is not an empty cell."
                assert b == before, "«computer_move» wrote on the real board. Try each move on a copy made row by row."
          ` },
          { py: py`
            b = [["X", "O", "X"], [".", "O", "."], [".", ".", "."]]
            got = call("computer_move", b)
            assert got == (2, 1), f"O has two marks in the middle column, so the computer should block at (2, 1), but it chose {got}. Try each move for O as well as for X."
          ` },
          { py: py`
            b = [[".", "X", "."], [".", "X", "O"], ["O", ".", "."]]
            got = call("computer_move", b)
            assert got == (2, 1), f"X has two marks in the middle column, so the computer should take (2, 1), but it chose {got}. Try each move on a copy and ask the winner function."
          ` },
        ],
        wrong: [py`
          def winner(board):
              for row in board:
                  if row[0] != "." and row[0] == row[1] and row[1] == row[2]:
                      return row[0]
              for c in range(3):
                  if board[0][c] != "." and board[0][c] == board[1][c] and board[1][c] == board[2][c]:
                      return board[0][c]
              if board[1][1] != "." and board[0][0] == board[1][1] and board[1][1] == board[2][2]:
                  return board[1][1]
              if board[1][1] != "." and board[0][2] == board[1][1] and board[1][1] == board[2][0]:
                  return board[1][1]
              return None

          def legal_moves(board):
              moves = []
              for r in range(3):
                  for c in range(3):
                      if board[r][c] == ".":
                          moves.append((r, c))
              return moves

          def is_draw(board):
              return winner(board) is None and len(legal_moves(board)) == 0

          def computer_move(board):
              for r, c in legal_moves(board):
                  test = [row[:] for row in board]
                  test[r][c] = "X"
                  if winner(test) == "X":
                      return (r, c)
              if board[1][1] == ".":
                  return (1, 1)
              return legal_moves(board)[0]

          board = [["X", "O", "X"], [".", "O", "."], [".", ".", "."]]
          print(winner(board))
          print(legal_moves(board))
          print(is_draw(board))
          print(computer_move(board))
        `, py`
          def winner(board):
              for row in board:
                  if row[0] != "." and row[0] == row[1] and row[1] == row[2]:
                      return row[0]
              for c in range(3):
                  if board[0][c] != "." and board[0][c] == board[1][c] and board[1][c] == board[2][c]:
                      return board[0][c]
              if board[1][1] != "." and board[0][0] == board[1][1] and board[1][1] == board[2][2]:
                  return board[1][1]
              if board[1][1] != "." and board[0][2] == board[1][1] and board[1][1] == board[2][0]:
                  return board[1][1]
              return None

          def legal_moves(board):
              moves = []
              for r in range(3):
                  for c in range(3):
                      if board[r][c] == ".":
                          moves.append((r, c))
              return moves

          def is_draw(board):
              return winner(board) is None and len(legal_moves(board)) == 0

          def computer_move(board):
              for r, c in legal_moves(board):
                  for mark in ["X", "O"]:
                      board[r][c] = mark
                      if winner(board) == mark:
                          return (r, c)
                      board[r][c] = "."
              if board[1][1] == ".":
                  return (1, 1)
              return legal_moves(board)[0]

          board = [["X", "O", "X"], [".", "O", "."], [".", ".", "."]]
          print(winner(board))
          print(legal_moves(board))
          print(is_draw(board))
          print(computer_move(board))
        `],
        hints: [
          md`Loop over the legal moves. For each one, try both marks on a fresh copy of the board. Then ask your winner function about the copy.`,
          md`The new loop goes at the top of the computer function, before the centre rule. Make the copy row by row, inside the loop, so each try starts from the real board.`,
          md`If the winner of the copy is the mark you just tried, give back that move at once. If no move completes a line, the old centre rule and first-move rule still run.`,
        ],
      },
    ],
    keys: [
      md`A referee checks every line: 3 rows, 3 columns and 2 diagonals. An empty line is never a win.`,
      md`Legal moves are the empty cells, listed row by row with two loops.`,
      md`A draw needs both: no winner, and no legal moves left.`,
      md`Try a move on a copy made row by row, so the real board never changes.`,
    ],
  });
})();
