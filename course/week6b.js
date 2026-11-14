// Week 6, part 2 — Day 41 (project: the expense tracker remembers) and Day 42 (checkpoint).
(function () {
  const { day, md, py, ex, tip, warn, pause } = window.Course;

  // ---------------------------------------------------------------- Day 41
  day({
    slug: "expense-tracker-remembers",
    title: "Project: An Expense Tracker That Remembers",
    goal: "Make your expense tracker save to a file, so your spending is still there next time.",
    minutes: 45,
    kind: "project",
    needs: [36, 38, 40],
    win: "Today you can now build a program that remembers its data after it stops.",
    learn: [
      md`
        ## A tracker that forgets

        There is no new lesson today. You use the tools from Days 36, 38 and 40 together. The Day 40 expense tracker has one problem: when it stops, every rupee you typed is lost.

        A **file** keeps data after a program ends. Today the tracker saves its totals to a file called «expenses.csv», and reads them back the next time it starts.
      `,
      ex(py`
        with open("spend.csv", "w") as file:
            file.write("chai,20.0\n")
            file.write("samosa,30.0\n")

        with open("spend.csv") as file:
            for line in file:
                item, amount = line.strip().split(",")
                print(item, float(amount) * 2)
      `, { label: "Write, then read back", predict: ["chai 40.0\nsamosa 60.0", "chai 20.020.0\nsamosa 30.030.0", "chai,20.0\nsamosa,30.0"], answer: 0 }),
      md`
        This is the whole plan in small. The first block saves one line for each item. The second block reads each line, splits it at the comma, and turns the amount back into a number with «float()».

        Without «float()», «amount» stays text, like «"20.0"». Text cannot be used for sums.
      `,
      pause(md`Stand up and stretch. The four stages come next.`),
      md`
        ## The first run has no file

        The very first time the tracker starts, «expenses.csv» does not exist yet. Watch what happens when a program reads a missing file.
      `,
      ex(py`
        with open("nothing.csv") as file:
            print(file.read())
      `, { error: true, label: "A crash on purpose", predict: ["FileNotFoundError", "An empty line", "None"], answer: 0 }),
      ex(py`
        try:
            with open("nothing.csv") as file:
                print(file.read())
        except FileNotFoundError:
            print("No file yet. Starting fresh.")
      `, { label: "The same, with try", predict: ["No file yet. Starting fresh.", "FileNotFoundError", "Nothing at all"], answer: 0 }),
      md`
        «try» and «except FileNotFoundError» from Day 36 catch that one error. Then the program carries on with an empty tracker.

        You build the tracker in 4 stages. Each stage starts with your own code from the stage before. Stage 1 starts with a complete Day 40 tracker, so you lose nothing if you skipped Day 40. You may paste in your own Day 40 tracker instead.
      `,
      tip(md`When you press **Run**, the files your program saves are kept. So run your tracker, add some spending, type «quit», then press **Run** again and type «summary». Your spending comes back.`),
    ],
    quiz: [
      {
        q: md`What does this show?`,
        code: py`
          with open("note.txt", "w") as file:
              file.write("chai")
              file.write("samosa")
          with open("note.txt") as file:
              print(file.read())
        `,
        options: ["chaisamosa", "chai samosa", "samosa"],
        answer: 0,
        explain: md`«.write()» adds no new line and no space. The two words sit side by side.`,
        why: [null, md`«.write()» never adds a space. Only «print» puts a space between values.`, md`Both writes happen inside the same «with» block, so the file keeps both. Opening with «"w"» empties the file only once, at the start.`],
        skill: "trace",
      },
      {
        q: md`What does this show?`,
        code: py`
          with open("note.txt", "w") as file:
              file.write("chai")
          with open("note.txt", "w") as file:
              file.write("tea")
          with open("note.txt") as file:
              print(file.read())
        `,
        options: ["tea", "chaitea", "chai"],
        answer: 0,
        explain: md`Mode «"w"» empties the file each time it opens. Only «tea» is left.`,
        why: [null, md`That would need mode «"a"», which adds to the end. Mode «"w"» starts the file again.`, md`The second «open» with «"w"» wipes «chai» away.`],
        skill: "trace",
      },
      {
        q: md`What happens?`,
        code: py`
          line = "chai,20.0\n"
          item, amount = line.strip().split(",")
          print(amount + 5)
        `,
        options: ["TypeError", "25.0", "20.05"],
        answer: 0,
        error: true,
        explain: md`Everything read from a file is text. «amount» is «"20.0"», and text plus a number is a TypeError. Use «float(amount)» first.`,
        why: [null, md`That needs «float(amount) + 5». The file gives text, not a number.`, md`Text can join only other text. «"20.0" + 5» crashes before anything is shown.`],
        skill: "debug",
      },
      {
        q: md`What does this program do?`,
        code: py`
          def load_totals():
              loaded = {}
              try:
                  with open("expenses.csv") as file:
                      for line in file:
                          category, amount = line.strip().split(",")
                          loaded[category] = float(amount)
              except FileNotFoundError:
                  return {}
              return loaded
        `,
        options: [
          "It reads the saved totals into a dictionary, or gives an empty dictionary when there is no file yet",
          "It saves the totals to a file",
          "It deletes the file when it is empty",
        ],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`It opens the file to read, fills «loaded», and returns it. If the file is missing, it returns «{}».`,
        why: [null, md`There is no «"w"» and no «.write()», so nothing is saved.`, md`Nothing here deletes a file. «except» only catches the missing-file error.`],
        skill: "read",
      },
      {
        q: md`When should the tracker call «save_totals(totals)»?`,
        options: [
          "When the user types quit, just before the loop stops",
          "On the first line of the program, before anything is added",
          "Inside «load_totals()», before the file is read",
        ],
        answer: 0,
        explain: md`Save at the end, when every «add» is finished. Then the file holds the newest totals.`,
        why: [null, md`At the start the totals are empty or old. Saving then loses the new spending.`, md`Saving before reading would replace the old file with nothing useful.`],
        skill: "choose",
      },
    ],
    practice: [
      {
        id: "s1", stage: 1, title: "Stage 1: save when you quit",
        task: md`
          This is a complete Day 40 tracker. Add a function «save_totals(totals)» above «totals = {}». It opens «expenses.csv» with mode «"w"» and writes one line for each category, like «food,200.0». Write the amount just as Python keeps it, with no «:.2f». Call it in the «quit» part, just before «print("Bye!")».

          The screen output does not change. After «add food 120», «add travel 300», «add food 80», «quit», the file «expenses.csv» holds:

          | food,200.0
          | travel,300.0
        `,
        starter: py`
          totals = {}
          while True:
              parts = input("> ").split()
              if len(parts) == 3 and parts[0] == "add":
                  category = parts[1]
                  try:
                      amount = float(parts[2])
                  except ValueError:
                      print("Amount must be a number")
                      continue
                  totals[category] = totals.get(category, 0) + amount
                  print(f"Added ₹{amount:.2f} to {category}")
              elif parts == ["summary"]:
                  for category, amount in totals.items():
                      print(f"{category}: ₹{amount:.2f}")
                  print(f"Total: ₹{sum(totals.values()):.2f}")
              elif parts == ["quit"]:
                  print("Bye!")
                  break
              else:
                  print("Unknown command")
        `,
        solution: py`
          def save_totals(totals):
              with open("expenses.csv", "w") as file:
                  for category, amount in totals.items():
                      file.write(f"{category},{amount}\n")

          totals = {}
          while True:
              parts = input("> ").split()
              if len(parts) == 3 and parts[0] == "add":
                  category = parts[1]
                  try:
                      amount = float(parts[2])
                  except ValueError:
                      print("Amount must be a number")
                      continue
                  totals[category] = totals.get(category, 0) + amount
                  print(f"Added ₹{amount:.2f} to {category}")
              elif parts == ["summary"]:
                  for category, amount in totals.items():
                      print(f"{category}: ₹{amount:.2f}")
                  print(f"Total: ₹{sum(totals.values()):.2f}")
              elif parts == ["quit"]:
                  save_totals(totals)
                  print("Bye!")
                  break
              else:
                  print("Unknown command")
        `,
        tests: [
          {
            inputs: ["add food 120", "add travel 300", "add food 80", "quit"],
            output: "Added ₹120.00 to food\nAdded ₹300.00 to travel\nAdded ₹80.00 to food\nBye!",
          },
          {
            inputs: ["add food 120", "add travel 300", "add food 80", "quit"],
            py: py`assert file_text("expenses.csv") == "food,200.0\ntravel,300.0\n", "After food 120, travel 300 and food 80, «expenses.csv» should hold two lines: food,200.0 and travel,300.0. Check the comma, the new line at the end of each line, and that the amount has no «:.2f»."`,
          },
          {
            files: { "expenses.csv": "old,1.0\n" },
            inputs: ["add food 50", "quit"],
            py: py`assert file_text("expenses.csv") == "food,50.0\n", "The file already held an old line. After «add food 50» and «quit», it should hold only food,50.0. Open the file with mode «\"w\"», which empties it first. Mode «\"a\"» keeps the old lines, so every run repeats them."`,
          },
          {
            inputs: ["add rent 5000.5", "quit"],
            py: py`assert file_text("expenses.csv") == "rent,5000.5\n", "After «add rent 5000.5» and «quit», the file should hold one line: rent,5000.5"`,
          },
          {
            inputs: ["quit"],
            py: py`assert file_text("expenses.csv") == "", "When nothing was added, «quit» should still save an empty «expenses.csv». Check that «save_totals(totals)» runs in the quit part."`,
          },
        ],
        wrong: [
          py`
            def save_totals(totals):
                with open("expenses.csv", "w") as file:
                    for category, amount in totals.items():
                        file.write(f"{category},{amount}\n")

            totals = {}
            while True:
                parts = input("> ").split()
                if len(parts) == 3 and parts[0] == "add":
                    category = parts[1]
                    try:
                        amount = float(parts[2])
                    except ValueError:
                        print("Amount must be a number")
                        continue
                    totals[category] = totals.get(category, 0) + amount
                    print(f"Added ₹{amount:.2f} to {category}")
                elif parts == ["summary"]:
                    for category, amount in totals.items():
                        print(f"{category}: ₹{amount:.2f}")
                    print(f"Total: ₹{sum(totals.values()):.2f}")
                elif parts == ["quit"]:
                    print("Bye!")
                    break
                else:
                    print("Unknown command")
          `,
          py`
            def save_totals(totals):
                with open("expenses.csv", "w") as file:
                    for category, amount in totals.items():
                        file.write(f"{category},{amount}")

            totals = {}
            while True:
                parts = input("> ").split()
                if len(parts) == 3 and parts[0] == "add":
                    category = parts[1]
                    try:
                        amount = float(parts[2])
                    except ValueError:
                        print("Amount must be a number")
                        continue
                    totals[category] = totals.get(category, 0) + amount
                    print(f"Added ₹{amount:.2f} to {category}")
                elif parts == ["summary"]:
                    for category, amount in totals.items():
                        print(f"{category}: ₹{amount:.2f}")
                    print(f"Total: ₹{sum(totals.values()):.2f}")
                elif parts == ["quit"]:
                    save_totals(totals)
                    print("Bye!")
                    break
                else:
                    print("Unknown command")
          `,
          py`
            def save_totals(totals):
                with open("expenses.csv", "a") as file:
                    for category, amount in totals.items():
                        file.write(f"{category},{amount}\n")

            totals = {}
            while True:
                parts = input("> ").split()
                if len(parts) == 3 and parts[0] == "add":
                    category = parts[1]
                    try:
                        amount = float(parts[2])
                    except ValueError:
                        print("Amount must be a number")
                        continue
                    totals[category] = totals.get(category, 0) + amount
                    print(f"Added ₹{amount:.2f} to {category}")
                elif parts == ["summary"]:
                    for category, amount in totals.items():
                        print(f"{category}: ₹{amount:.2f}")
                    print(f"Total: ₹{sum(totals.values()):.2f}")
                elif parts == ["quit"]:
                    save_totals(totals)
                    print("Bye!")
                    break
                else:
                    print("Unknown command")
          `,
          py`
            def save_totals(totals):
                with open("expenses.csv", "w") as file:
                    for category, amount in totals.items():
                        file.write(f"{category},{amount:.2f}\n")

            totals = {}
            while True:
                parts = input("> ").split()
                if len(parts) == 3 and parts[0] == "add":
                    category = parts[1]
                    try:
                        amount = float(parts[2])
                    except ValueError:
                        print("Amount must be a number")
                        continue
                    totals[category] = totals.get(category, 0) + amount
                    print(f"Added ₹{amount:.2f} to {category}")
                elif parts == ["summary"]:
                    for category, amount in totals.items():
                        print(f"{category}: ₹{amount:.2f}")
                    print(f"Total: ₹{sum(totals.values()):.2f}")
                elif parts == ["quit"]:
                    save_totals(totals)
                    print("Bye!")
                    break
                else:
                    print("Unknown command")
          `,
        ],
        hints: [
          md`Plan: open the file with «"w"», loop over «totals.items()», and write one line for each pair. Then call the function when the user quits.`,
          md`The function goes above «totals = {}». The call «save_totals(totals)» goes inside «elif parts == ["quit"]:», before «print("Bye!")».`,
          md`Inside the function: «with open("expenses.csv", "w") as file:», then «for category, amount in totals.items():», then «file.write(f"{category},{amount}\n")».`,
        ],
      },
      {
        id: "s2", stage: 2, carry: "s1", title: "Stage 2: load when you start",
        task: md`
          Now read the saved totals back. Add a function «load_totals()» under «save_totals». It opens «expenses.csv», reads each line, splits it at the comma, and stores «float(amount)» in a new dictionary. It returns that dictionary. Then change «totals = {}» to «totals = load_totals()».

          A starting «expenses.csv» is ready for you. It holds «food,200.0» and «travel,300.0». So «summary», then «quit» shows:

          | food: ₹200.00
          | travel: ₹300.00
          | Total: ₹500.00
          | Bye!
        `,
        files: { "expenses.csv": "food,200.0\ntravel,300.0\n" },
        starter: py`
          def save_totals(totals):
              with open("expenses.csv", "w") as file:
                  for category, amount in totals.items():
                      file.write(f"{category},{amount}\n")

          totals = {}
          while True:
              parts = input("> ").split()
              if len(parts) == 3 and parts[0] == "add":
                  category = parts[1]
                  try:
                      amount = float(parts[2])
                  except ValueError:
                      print("Amount must be a number")
                      continue
                  totals[category] = totals.get(category, 0) + amount
                  print(f"Added ₹{amount:.2f} to {category}")
              elif parts == ["summary"]:
                  for category, amount in totals.items():
                      print(f"{category}: ₹{amount:.2f}")
                  print(f"Total: ₹{sum(totals.values()):.2f}")
              elif parts == ["quit"]:
                  save_totals(totals)
                  print("Bye!")
                  break
              else:
                  print("Unknown command")
        `,
        solution: py`
          def save_totals(totals):
              with open("expenses.csv", "w") as file:
                  for category, amount in totals.items():
                      file.write(f"{category},{amount}\n")

          def load_totals():
              loaded = {}
              with open("expenses.csv") as file:
                  for line in file:
                      category, amount = line.strip().split(",")
                      loaded[category] = float(amount)
              return loaded

          totals = load_totals()
          while True:
              parts = input("> ").split()
              if len(parts) == 3 and parts[0] == "add":
                  category = parts[1]
                  try:
                      amount = float(parts[2])
                  except ValueError:
                      print("Amount must be a number")
                      continue
                  totals[category] = totals.get(category, 0) + amount
                  print(f"Added ₹{amount:.2f} to {category}")
              elif parts == ["summary"]:
                  for category, amount in totals.items():
                      print(f"{category}: ₹{amount:.2f}")
                  print(f"Total: ₹{sum(totals.values()):.2f}")
              elif parts == ["quit"]:
                  save_totals(totals)
                  print("Bye!")
                  break
              else:
                  print("Unknown command")
        `,
        tests: [
          {
            inputs: ["summary", "quit"],
            output: "food: ₹200.00\ntravel: ₹300.00\nTotal: ₹500.00\nBye!",
          },
          {
            files: { "expenses.csv": "chai,45.5\n" },
            inputs: ["add chai 10", "summary", "quit"],
            output: "Added ₹10.00 to chai\nchai: ₹55.50\nTotal: ₹55.50\nBye!",
          },
          {
            files: { "expenses.csv": "chai,45.5\n" },
            inputs: ["add chai 10", "quit"],
            py: py`assert file_text("expenses.csv") == "chai,55.5\n", "The file started with chai,45.5. After «add chai 10» and «quit», it should hold chai,55.5. Check that the loaded totals are numbers, made with «float()»."`,
          },
          {
            files: { "expenses.csv": "rent,5000.0\nbooks,250.0\nfood,99.5\n" },
            inputs: ["summary", "quit"],
            output: "rent: ₹5000.00\nbooks: ₹250.00\nfood: ₹99.50\nTotal: ₹5349.50\nBye!",
          },
          {
            files: { "expenses.csv": "" },
            inputs: ["summary", "quit"],
            output: "Total: ₹0.00\nBye!",
          },
        ],
        wrong: [
          py`
            def save_totals(totals):
                with open("expenses.csv", "w") as file:
                    for category, amount in totals.items():
                        file.write(f"{category},{amount}\n")

            def load_totals():
                loaded = {}
                with open("expenses.csv") as file:
                    for line in file:
                        category, amount = line.strip().split(",")
                        loaded[category] = float(amount)
                        return loaded

            totals = load_totals()
            while True:
                parts = input("> ").split()
                if len(parts) == 3 and parts[0] == "add":
                    category = parts[1]
                    try:
                        amount = float(parts[2])
                    except ValueError:
                        print("Amount must be a number")
                        continue
                    totals[category] = totals.get(category, 0) + amount
                    print(f"Added ₹{amount:.2f} to {category}")
                elif parts == ["summary"]:
                    for category, amount in totals.items():
                        print(f"{category}: ₹{amount:.2f}")
                    print(f"Total: ₹{sum(totals.values()):.2f}")
                elif parts == ["quit"]:
                    save_totals(totals)
                    print("Bye!")
                    break
                else:
                    print("Unknown command")
          `,
          py`
            def save_totals(totals):
                with open("expenses.csv", "w") as file:
                    for category, amount in totals.items():
                        file.write(f"{category},{amount}\n")

            def load_totals():
                loaded = {}
                with open("expenses.csv") as file:
                    for line in file:
                        category, amount = line.strip().split(",")
                        loaded[category] = amount
                return loaded

            totals = load_totals()
            while True:
                parts = input("> ").split()
                if len(parts) == 3 and parts[0] == "add":
                    category = parts[1]
                    try:
                        amount = float(parts[2])
                    except ValueError:
                        print("Amount must be a number")
                        continue
                    totals[category] = totals.get(category, 0) + amount
                    print(f"Added ₹{amount:.2f} to {category}")
                elif parts == ["summary"]:
                    for category, amount in totals.items():
                        print(f"{category}: ₹{amount:.2f}")
                    print(f"Total: ₹{sum(totals.values()):.2f}")
                elif parts == ["quit"]:
                    save_totals(totals)
                    print("Bye!")
                    break
                else:
                    print("Unknown command")
          `,
          py`
            def save_totals(totals):
                with open("expenses.csv", "w") as file:
                    for category, amount in totals.items():
                        file.write(f"{category},{amount}\n")

            def load_totals():
                loaded = {}
                with open("expenses.csv") as file:
                    for line in file:
                        category, amount = line.strip().split(",")
                        loaded[category] = float(amount)
                return loaded

            totals = {}
            while True:
                parts = input("> ").split()
                if len(parts) == 3 and parts[0] == "add":
                    category = parts[1]
                    try:
                        amount = float(parts[2])
                    except ValueError:
                        print("Amount must be a number")
                        continue
                    totals[category] = totals.get(category, 0) + amount
                    print(f"Added ₹{amount:.2f} to {category}")
                elif parts == ["summary"]:
                    for category, amount in totals.items():
                        print(f"{category}: ₹{amount:.2f}")
                    print(f"Total: ₹{sum(totals.values()):.2f}")
                elif parts == ["quit"]:
                    save_totals(totals)
                    print("Bye!")
                    break
                else:
                    print("Unknown command")
          `,
        ],
        hints: [
          md`Plan: start an empty dictionary, read the file one line at a time, store each pair, return the dictionary. Then use it at the start.`,
          md`Put «def load_totals():» under «save_totals». Change the line «totals = {}» to «totals = load_totals()».`,
          md`Inside the loop: «category, amount = line.strip().split(",")» and then «loaded[category] = float(amount)». After the «with» block: «return loaded».`,
        ],
      },
      {
        id: "s3", stage: 3, carry: "s2", title: "Stage 3: the very first run",
        task: md`
          On the very first run there is no «expenses.csv», so «load_totals()» crashes with FileNotFoundError. Put «try» around the «with» block in «load_totals()». Add «except FileNotFoundError:» that returns an empty dictionary, «{}».

          With no file, «summary», then «quit» shows:

          | Total: ₹0.00
          | Bye!

          Then press **Run** twice. The first time, add some spending and type «quit». The second time, type «summary». Your spending comes back.
        `,
        starter: py`
          def save_totals(totals):
              with open("expenses.csv", "w") as file:
                  for category, amount in totals.items():
                      file.write(f"{category},{amount}\n")

          def load_totals():
              loaded = {}
              with open("expenses.csv") as file:
                  for line in file:
                      category, amount = line.strip().split(",")
                      loaded[category] = float(amount)
              return loaded

          totals = load_totals()
          while True:
              parts = input("> ").split()
              if len(parts) == 3 and parts[0] == "add":
                  category = parts[1]
                  try:
                      amount = float(parts[2])
                  except ValueError:
                      print("Amount must be a number")
                      continue
                  totals[category] = totals.get(category, 0) + amount
                  print(f"Added ₹{amount:.2f} to {category}")
              elif parts == ["summary"]:
                  for category, amount in totals.items():
                      print(f"{category}: ₹{amount:.2f}")
                  print(f"Total: ₹{sum(totals.values()):.2f}")
              elif parts == ["quit"]:
                  save_totals(totals)
                  print("Bye!")
                  break
              else:
                  print("Unknown command")
        `,
        solution: py`
          def save_totals(totals):
              with open("expenses.csv", "w") as file:
                  for category, amount in totals.items():
                      file.write(f"{category},{amount}\n")

          def load_totals():
              loaded = {}
              try:
                  with open("expenses.csv") as file:
                      for line in file:
                          category, amount = line.strip().split(",")
                          loaded[category] = float(amount)
              except FileNotFoundError:
                  return {}
              return loaded

          totals = load_totals()
          while True:
              parts = input("> ").split()
              if len(parts) == 3 and parts[0] == "add":
                  category = parts[1]
                  try:
                      amount = float(parts[2])
                  except ValueError:
                      print("Amount must be a number")
                      continue
                  totals[category] = totals.get(category, 0) + amount
                  print(f"Added ₹{amount:.2f} to {category}")
              elif parts == ["summary"]:
                  for category, amount in totals.items():
                      print(f"{category}: ₹{amount:.2f}")
                  print(f"Total: ₹{sum(totals.values()):.2f}")
              elif parts == ["quit"]:
                  save_totals(totals)
                  print("Bye!")
                  break
              else:
                  print("Unknown command")
        `,
        tests: [
          { inputs: ["summary", "quit"], output: "Total: ₹0.00\nBye!" },
          {
            inputs: ["add samosa 30", "add chai 15", "quit"],
            output: "Added ₹30.00 to samosa\nAdded ₹15.00 to chai\nBye!",
          },
          {
            inputs: ["add samosa 30", "add chai 15", "quit"],
            py: py`assert load_totals() == {"samosa": 30.0, "chai": 15.0}, "After saving samosa 30 and chai 15, «load_totals()» should give them back as a dictionary of numbers."`,
          },
          {
            files: { "expenses.csv": "travel,120.0\n" },
            inputs: ["add travel 80", "summary", "quit"],
            output: "Added ₹80.00 to travel\ntravel: ₹200.00\nTotal: ₹200.00\nBye!",
          },
        ],
        wrong: [
          py`
            def save_totals(totals):
                with open("expenses.csv", "w") as file:
                    for category, amount in totals.items():
                        file.write(f"{category},{amount}\n")

            def load_totals():
                loaded = {}
                try:
                    with open("expenses.csv") as file:
                        for line in file:
                            category, amount = line.strip().split(",")
                            loaded[category] = float(amount)
                except ValueError:
                    return {}
                return loaded

            totals = load_totals()
            while True:
                parts = input("> ").split()
                if len(parts) == 3 and parts[0] == "add":
                    category = parts[1]
                    try:
                        amount = float(parts[2])
                    except ValueError:
                        print("Amount must be a number")
                        continue
                    totals[category] = totals.get(category, 0) + amount
                    print(f"Added ₹{amount:.2f} to {category}")
                elif parts == ["summary"]:
                    for category, amount in totals.items():
                        print(f"{category}: ₹{amount:.2f}")
                    print(f"Total: ₹{sum(totals.values()):.2f}")
                elif parts == ["quit"]:
                    save_totals(totals)
                    print("Bye!")
                    break
                else:
                    print("Unknown command")
          `,
          py`
            def save_totals(totals):
                with open("expenses.csv", "w") as file:
                    for category, amount in totals.items():
                        file.write(f"{category},{amount}\n")

            def load_totals():
                loaded = {}
                try:
                    with open("expenses.csv") as file:
                        for line in file:
                            category, amount = line.strip().split(",")
                            loaded[category] = float(amount)
                except FileNotFoundError:
                    print("No file yet")
                    return
                return loaded

            totals = load_totals()
            while True:
                parts = input("> ").split()
                if len(parts) == 3 and parts[0] == "add":
                    category = parts[1]
                    try:
                        amount = float(parts[2])
                    except ValueError:
                        print("Amount must be a number")
                        continue
                    totals[category] = totals.get(category, 0) + amount
                    print(f"Added ₹{amount:.2f} to {category}")
                elif parts == ["summary"]:
                    for category, amount in totals.items():
                        print(f"{category}: ₹{amount:.2f}")
                    print(f"Total: ₹{sum(totals.values()):.2f}")
                elif parts == ["quit"]:
                    save_totals(totals)
                    print("Bye!")
                    break
                else:
                    print("Unknown command")
          `,
        ],
        hints: [
          md`Plan: try to open the file. If Python says FileNotFoundError, give back an empty dictionary instead.`,
          md`The change is only inside «load_totals()». Put «try:» above the «with» line. Then add 4 spaces at the start of every line of the «with» block, so the block sits inside «try:».`,
          md`Under the «with» block, at the same indent as «try:», write «except FileNotFoundError:» and under it «return {}».`,
        ],
      },
      {
        id: "s4", stage: 4, kind: "make", title: "Stage 4: from a blank page",
        task: md`
          Write one small function from a blank page: «load_totals(filename)». It works like your «load_totals()», but it reads the file whose name it is given. It returns a dictionary of numbers. When the file does not exist, it returns «{}».

          If «may.csv» holds «chai,45.5» and «samosa,30.0», then:

          : load_totals("may.csv")      # gives {'chai': 45.5, 'samosa': 30.0}
          : load_totals("missing.csv")  # gives {}

          Write only the function. You do not need to call it.
        `,
        starter: py`

        `,
        solution: py`
          def load_totals(filename):
              loaded = {}
              try:
                  with open(filename) as file:
                      for line in file:
                          category, amount = line.strip().split(",")
                          loaded[category] = float(amount)
              except FileNotFoundError:
                  return {}
              return loaded
        `,
        tests: [
          { py: py`assert load_totals("expenses.csv") == {}, "When the file does not exist, «load_totals» should return an empty dictionary, «{}». Check your «except FileNotFoundError:»."` },
          {
            files: { "may.csv": "chai,45.5\nsamosa,30.0\n" },
            py: py`assert load_totals("may.csv") == {"chai": 45.5, "samosa": 30.0}, "«load_totals(\"may.csv\")» should give {'chai': 45.5, 'samosa': 30.0}. Check that you open the file name you are given, and use «float()» on each amount."`,
          },
          {
            files: { "june.csv": "rent,5000.0\n" },
            py: py`assert load_totals("june.csv") == {"rent": 5000.0}, "A file with one line, rent,5000.0, should give {'rent': 5000.0}."`,
          },
          {
            files: { "june.csv": "rent,5000.0\n" },
            py: py`assert load_totals("july.csv") == {}, "«june.csv» exists, but «july.csv» does not. «load_totals(\"july.csv\")» should give {}."`,
          },
        ],
        wrong: [
          py`
            def load_totals(filename):
                loaded = {}
                try:
                    with open("expenses.csv") as file:
                        for line in file:
                            category, amount = line.strip().split(",")
                            loaded[category] = float(amount)
                except FileNotFoundError:
                    return {}
                return loaded
          `,
          py`
            def load_totals(filename):
                loaded = {}
                with open(filename) as file:
                    for line in file:
                        category, amount = line.strip().split(",")
                        loaded[category] = float(amount)
                return loaded
          `,
          py`
            def load_totals(filename):
                loaded = {}
                try:
                    with open(filename) as file:
                        for line in file:
                            category, amount = line.strip().split(",")
                            loaded[category] = amount
                except FileNotFoundError:
                    return {}
                return loaded
          `,
        ],
        hints: [
          md`Plan: an empty dictionary, then try to read the file line by line, then return the dictionary. A missing file gives «{}».`,
          md`Use the parameter in «open(filename)», not the words «"expenses.csv"».`,
          md`«def load_totals(filename):», «loaded = {}», «try:», «with open(filename) as file:», «for line in file:», split, «float()», then «except FileNotFoundError: return {}» and «return loaded».`,
        ],
      },
      {
        id: "twist", kind: "modify", carry: "s3", optional: true, title: "Own Twist: a new command",
        task: md`
          Make the tracker your own. First add a «biggest» command. It prints the category with the largest total, like «Biggest: rent ₹5000.00». When there is nothing yet, it prints «Nothing yet». Use a best-so-far loop over «totals.items()» (Day 17).

          For «add food 120», «add rent 5000», «add chai 40», «biggest», «quit»:

          | Added ₹120.00 to food
          | Added ₹5000.00 to rent
          | Added ₹40.00 to chai
          | Biggest: rent ₹5000.00
          | Bye!

          Then add any command you like, such as «count». The tests check only «biggest» and the old commands, so your own idea is safe.
        `,
        starter: py`
          def save_totals(totals):
              with open("expenses.csv", "w") as file:
                  for category, amount in totals.items():
                      file.write(f"{category},{amount}\n")

          def load_totals():
              loaded = {}
              try:
                  with open("expenses.csv") as file:
                      for line in file:
                          category, amount = line.strip().split(",")
                          loaded[category] = float(amount)
              except FileNotFoundError:
                  return {}
              return loaded

          totals = load_totals()
          while True:
              parts = input("> ").split()
              if len(parts) == 3 and parts[0] == "add":
                  category = parts[1]
                  try:
                      amount = float(parts[2])
                  except ValueError:
                      print("Amount must be a number")
                      continue
                  totals[category] = totals.get(category, 0) + amount
                  print(f"Added ₹{amount:.2f} to {category}")
              elif parts == ["summary"]:
                  for category, amount in totals.items():
                      print(f"{category}: ₹{amount:.2f}")
                  print(f"Total: ₹{sum(totals.values()):.2f}")
              elif parts == ["quit"]:
                  save_totals(totals)
                  print("Bye!")
                  break
              else:
                  print("Unknown command")
        `,
        solution: py`
          def save_totals(totals):
              with open("expenses.csv", "w") as file:
                  for category, amount in totals.items():
                      file.write(f"{category},{amount}\n")

          def load_totals():
              loaded = {}
              try:
                  with open("expenses.csv") as file:
                      for line in file:
                          category, amount = line.strip().split(",")
                          loaded[category] = float(amount)
              except FileNotFoundError:
                  return {}
              return loaded

          totals = load_totals()
          while True:
              parts = input("> ").split()
              if len(parts) == 3 and parts[0] == "add":
                  category = parts[1]
                  try:
                      amount = float(parts[2])
                  except ValueError:
                      print("Amount must be a number")
                      continue
                  totals[category] = totals.get(category, 0) + amount
                  print(f"Added ₹{amount:.2f} to {category}")
              elif parts == ["summary"]:
                  for category, amount in totals.items():
                      print(f"{category}: ₹{amount:.2f}")
                  print(f"Total: ₹{sum(totals.values()):.2f}")
              elif parts == ["biggest"]:
                  best = ""
                  best_amount = 0
                  for category, amount in totals.items():
                      if amount > best_amount:
                          best = category
                          best_amount = amount
                  if best == "":
                      print("Nothing yet")
                  else:
                      print(f"Biggest: {best} ₹{totals[best]:.2f}")
              elif parts == ["quit"]:
                  save_totals(totals)
                  print("Bye!")
                  break
              else:
                  print("Unknown command")
        `,
        tests: [
          {
            inputs: ["add food 120", "add rent 5000", "add chai 40", "biggest", "quit"],
            output: "Added ₹120.00 to food\nAdded ₹5000.00 to rent\nAdded ₹40.00 to chai\nBiggest: rent ₹5000.00\nBye!",
          },
          { inputs: ["biggest", "quit"], output: "Nothing yet\nBye!" },
          {
            files: { "expenses.csv": "books,250.0\ntravel,250.5\n" },
            inputs: ["biggest", "summary", "quit"],
            output: "Biggest: travel ₹250.50\nbooks: ₹250.00\ntravel: ₹250.50\nTotal: ₹500.50\nBye!",
          },
          {
            inputs: ["add samosa 30", "quit"],
            py: py`assert load_totals() == {"samosa": 30.0}, "The old commands must still work: «quit» should still save, and «load_totals()» should still read it back."`,
          },
        ],
        wrong: [
          py`
            def save_totals(totals):
                with open("expenses.csv", "w") as file:
                    for category, amount in totals.items():
                        file.write(f"{category},{amount}\n")

            def load_totals():
                loaded = {}
                try:
                    with open("expenses.csv") as file:
                        for line in file:
                            category, amount = line.strip().split(",")
                            loaded[category] = float(amount)
                except FileNotFoundError:
                    return {}
                return loaded

            totals = load_totals()
            while True:
                parts = input("> ").split()
                if len(parts) == 3 and parts[0] == "add":
                    category = parts[1]
                    try:
                        amount = float(parts[2])
                    except ValueError:
                        print("Amount must be a number")
                        continue
                    totals[category] = totals.get(category, 0) + amount
                    print(f"Added ₹{amount:.2f} to {category}")
                elif parts == ["summary"]:
                    for category, amount in totals.items():
                        print(f"{category}: ₹{amount:.2f}")
                    print(f"Total: ₹{sum(totals.values()):.2f}")
                elif parts == ["biggest"]:
                    best = ""
                    best_amount = 0
                    for category, amount in totals.items():
                        if amount < best_amount:
                            best = category
                            best_amount = amount
                    if best == "":
                        print("Nothing yet")
                    else:
                        print(f"Biggest: {best} ₹{totals[best]:.2f}")
                elif parts == ["quit"]:
                    save_totals(totals)
                    print("Bye!")
                    break
                else:
                    print("Unknown command")
          `,
        ],
        hints: [
          md`Plan: a new «elif» for «biggest». Keep the best category so far, starting at «""», and its amount, starting at 0. Then print it, or «Nothing yet».`,
          md`Put «elif parts == ["biggest"]:» above the «quit» part. Inside, loop with «for category, amount in totals.items():».`,
          md`In the loop: «if amount > best_amount:» then «best = category» and «best_amount = amount». After the loop, check «if best == "":».`,
        ],
      },
    ],
    keys: [
      md`Save with mode «"w"» when the program ends, and load when it starts. Then the data stays between runs.`,
      md`Everything read from a file is text. Use «float()» or «int()» before you do sums.`,
      md`The first run has no file. Catch «FileNotFoundError» and start with an empty dictionary.`,
      md`A big program grows in small stages. Run it after every stage.`,
    ],
  });

  // ---------------------------------------------------------------- Day 42
  day({
    slug: "core-check-up",
    title: "Checkpoint: The Core Check-up",
    goal: "Find which of the first 40 days you remember, then repair the weak ones.",
    minutes: 45,
    kind: "checkpoint",
    exam: true,
    needs: [40, 41],
    win: "Today you can now see which skills are strong, and you have a short repair map for the rest.",
    learn: [
      md`
        ## How this check works

        Today you check four skills: reading code, fixing bugs, writing code, and remembering. There are no hints and no Step-through. Nothing is locked, and Day 43 opens whatever your score is.

        There are four parts: one Cold Read with 5 questions, 3 Bug Clinics, 1 Make, and 8 recall cards. A **Cold Read** is a program you have never seen, with questions under it. Every item shows the day it comes from, like «(Day 24)».
      `,
      md`
        ## Your repair map

        At the end you see a score for each skill. It shows what to practise next. It is not a judgement of you.

        1. Write down the day number of each item you missed.
        2. Choose at most 3 of those days. Start with the smallest numbers, because later days build on them.
        3. Open each day and do its Make exercise again, from a blank page.
      `,
      tip(md`Many missed items in one skill? Use these days. Reading: [Day 32](#/day/32). Fixing bugs: [Day 21](#/day/21). Writing: [Day 28](#/day/28). Remembering: [Day 30](#/day/30).`),
      pause(md`This check takes about 45 minutes. Take a short break after the Bug Clinics.`),
    ],
    quiz: [
      {
        q: md`(Day 13) What does this show?`,
        code: py`print("samosa"[1:4])`,
        options: ["amo", "sam", "amos"],
        answer: 0,
        explain: md`Counting starts at 0. Positions 1, 2 and 3 are «a», «m», «o». The end, 4, is not included.`,
        why: [null, md`«sam» is «[0:3]». Counting starts at 0, so position 1 is «a».`, md`The end number is not included, so position 4, «s», is left out.`],
        skill: "trace",
      },
      {
        q: md`(Day 23) What does this show?`,
        code: py`
          nums = [3, 1, 2]
          nums = nums.sort()
          print(nums)
        `,
        options: ["None", "[1, 2, 3]", "[3, 1, 2]"],
        answer: 0,
        explain: md`«.sort()» sorts the list in place and gives back «None». The second line stores that «None» in «nums».`,
        why: [null, md`That needs «nums.sort()» on its own line, without «nums =».`, md`The list was sorted, but then «nums» was replaced with «None».`],
        skill: "trace",
      },
      {
        q: md`(Day 11) What does this show?`,
        code: py`print(5 > 3 and 2 > 4)`,
        options: ["False", "True", "True False"],
        answer: 0,
        explain: md`«and» is True only when both sides are True. «2 > 4» is False.`,
        why: [null, md`«5 > 3» is True, but «and» needs both sides to be True.`, md`«and» joins the two questions into one answer, so print shows only one value.`],
        skill: "trace",
      },
      {
        q: md`(Day 6) What happens?`,
        code: py`
          age = "20"
          print(age + 1)
        `,
        options: ["TypeError", "21", "201"],
        answer: 0,
        error: true,
        explain: md`«age» is text. Text and a number cannot be added. Use «int(age) + 1».`,
        why: [null, md`That needs «int(age)» first. «"20"» is text, not a number.`, md`Joining needs two pieces of text. «"20" + "1"» gives «201», but «1» here is a number.`],
        skill: "debug",
      },
      {
        q: md`(Day 19) What does this program do?`,
        code: py`
          while True:
              word = input("Password: ")
              if word == "chai123":
                  print("Welcome")
                  break
              print("Try again")
        `,
        options: [
          "It keeps asking until the user types chai123, then says Welcome",
          "It asks for the password only once",
          "It says Welcome for any password",
        ],
        answer: 0,
        verify: false,
        mono: false,
        explain: md`«while True» repeats for ever. «break» stops the loop only when the password is right.`,
        why: [null, md`«while True» repeats the question until «break» runs.`, md`«Welcome» is inside the «if», so only «chai123» reaches it.`],
        skill: "read",
      },
      {
        q: md`(Day 29) You want each student's marks stored under the student's name. Which tool fits best?`,
        options: ["A dictionary", "A list", "A string"],
        answer: 0,
        explain: md`A dictionary stores values under keys. The name is the key and the marks are the value.`,
        why: [null, md`A list finds items by position, like 0 or 1, not by name.`, md`A string is one piece of text. It cannot store a value under a name.`],
        skill: "choose",
      },
      {
        q: md`(Day 36) Which error does «int("abc")» raise?`,
        options: ["ValueError", "TypeError", "NameError"],
        answer: 0,
        explain: md`The value is text, which is the right kind for «int()», but it holds no number. That is a ValueError.`,
        why: [null, md`TypeError means the wrong kind of value, like text plus a number.`, md`NameError means a name that was never given a value.`],
        skill: "memory",
      },
      {
        q: md`(Day 38) Which mode adds new lines to the end of a file and keeps the old lines?`,
        options: ['"a"', '"w"', "No mode at all"],
        answer: 0,
        explain: md`Mode «"a"» adds to the end. Mode «"w"» empties the file first.`,
        why: [null, md`«"w"» empties the file first, so the old lines are lost.`, md`With no mode, «open» only reads. It cannot write.`],
        skill: "memory",
      },
    ],
    practice: [
      {
        id: "read", kind: "read", title: "Cold Read: grades for a class (Days 10, 30, 32)",
        task: md`Read the program slowly. Do not run it. Then answer the 5 questions.`,
        code: py`
          def grade(mark):
              if mark >= 60:
                  return "A"
              elif mark >= 33:
                  return "B"
              return "C"

          marks = {"Asha": 72, "Ravi": 33, "Meena": 29, "Kiran": 65}
          counts = {}
          for name, mark in marks.items():
              g = grade(mark)
              counts[g] = counts.get(g, 0) + 1
              print(f"{name}: {g}")
          print(counts)
        `,
        questions: [
          {
            q: md`(Day 10) What does «grade(33)» give back?`,
            options: ['"B"', '"C"', '"A"'],
            answer: 0,
            explain: md`33 is not 60 or more, but it is 33 or more. «>=» includes 33 itself.`,
            skill: "read",
          },
          {
            q: md`(Day 30) What is the last line the program prints?`,
            options: ["{'A': 2, 'B': 1, 'C': 1}", "{'A': 1, 'B': 1, 'C': 1}", "{'Asha': 'A', 'Ravi': 'B', 'Meena': 'C', 'Kiran': 'A'}"],
            answer: 0,
            explain: md`Asha and Kiran get A, Ravi gets B, Meena gets C. «counts» counts each grade.`,
            skill: "read",
          },
          {
            q: md`(Day 31) How many times does the body of «grade» run?`,
            options: ["4 times", "Once", "0 times, because def does not run it"],
            answer: 0,
            explain: md`«def» only defines it. The loop calls «grade(mark)» once for each of the 4 students.`,
            skill: "read",
          },
          {
            q: md`(Day 32) What does the whole program do?`,
            options: [
              "It gives each student a grade, prints it, and counts how many students got each grade",
              "It finds the student with the highest mark",
              "It prints only the students who got A",
            ],
            answer: 0,
            explain: md`Each student gets a grade from «grade()». The program prints it and adds one to that grade's count.`,
            skill: "read",
          },
          {
            q: md`(Day 14) Which one change makes Ravi, with 33, get «C»?`,
            options: [
              "Change «mark >= 33» to «mark > 33»",
              "Change «mark >= 60» to «mark > 60»",
              'Change «return "C"» to «return "B"»',
            ],
            answer: 0,
            explain: md`With «> 33», the mark 33 is no longer included, so Ravi reaches «return "C"». 33 is the edge value.`,
            skill: "read",
          },
        ],
      },
      {
        id: "bug1", kind: "bug", title: "Bug Clinic: the table stops early (Days 16, 21)",
        task: md`
          This program should print the table of a number from 1 to 10. For «7» it should show 10 lines:

          | 7 x 1 = 7
          | 7 x 2 = 14
          | ...
          | 7 x 10 = 70

          It stops at «7 x 9 = 63». Tap the faulty line, then fix it.
        `,
        starter: py`
          n = int(input("Number: "))
          for i in range(1, 10):
              print(f"{n} x {i} = {n * i}")
        `,
        bugLines: [2],
        solution: py`
          n = int(input("Number: "))
          for i in range(1, 11):
              print(f"{n} x {i} = {n * i}")
        `,
        tests: [
          { inputs: ["7"], contains: ["7 x 1 = 7", "7 x 10 = 70"] },
          { inputs: ["12"], contains: ["12 x 10 = 120"] },
          { inputs: ["1"], py: py`assert LINES == [f"1 x {i} = {i}" for i in range(1, 11)], "For 1, the program should print exactly 10 lines, from «1 x 1 = 1» to «1 x 10 = 10». Check the start and the end of the range."` },
        ],
        wrong: [
          py`
            n = int(input("Number: "))
            for i in range(0, 10):
                print(f"{n} x {i} = {n * i}")
          `,
          py`
            n = int(input("Number: "))
            for i in range(1, 12):
                print(f"{n} x {i} = {n * i}")
          `,
        ],
      },
      {
        id: "bug2", kind: "bug", title: "Bug Clinic: counting votes (Days 29, 30)",
        task: md`
          The user types votes on one line. The program should count each vote and print the counts. For «chai chai coffee» it should show:

          | chai 2
          | coffee 1

          It crashes with a KeyError. Tap the faulty line, then fix it.
        `,
        starter: py`
          votes = input("Votes: ").split()
          counts = {}
          for v in votes:
              counts[v] += 1
          for name, n in counts.items():
              print(name, n)
        `,
        bugLines: [4],
        solution: py`
          votes = input("Votes: ").split()
          counts = {}
          for v in votes:
              counts[v] = counts.get(v, 0) + 1
          for name, n in counts.items():
              print(name, n)
        `,
        tests: [
          { inputs: ["chai chai coffee"], output: "chai 2\ncoffee 1" },
          { inputs: ["lassi"], output: "lassi 1" },
          { inputs: ["tea coffee tea tea"], output: "tea 3\ncoffee 1" },
          { inputs: [""], output: "" },
        ],
        wrong: [
          py`
            votes = input("Votes: ").split()
            counts = {}
            for v in votes:
                counts[v] = 1
            for name, n in counts.items():
                print(name, n)
          `,
          py`
            votes = input("Votes: ").split()
            counts = {}
            for v in votes:
                counts[v] = counts.get(v) + 1
            for name, n in counts.items():
                print(name, n)
          `,
        ],
      },
      {
        id: "bug3", kind: "bug", title: "Bug Clinic: the bill is None (Day 32)",
        task: md`
          The program adds 18% GST to a price in rupees. For «100» it should show only:

          | Bill: ₹118.00

          Instead it shows «118.0» and then crashes. Tap the faulty line, then fix it.
        `,
        starter: py`
          def with_gst(price):
              print(price * 118 / 100)

          price = float(input("Price: "))
          bill = with_gst(price)
          print(f"Bill: ₹{bill:.2f}")
        `,
        bugLines: [2],
        solution: py`
          def with_gst(price):
              return price * 118 / 100

          price = float(input("Price: "))
          bill = with_gst(price)
          print(f"Bill: ₹{bill:.2f}")
        `,
        tests: [
          { inputs: ["100"], output: "Bill: ₹118.00" },
          { inputs: ["0"], output: "Bill: ₹0.00" },
          { inputs: ["12.5"], output: "Bill: ₹14.75" },
        ],
        wrong: [
          py`
            def with_gst(price):
                return price * 18 / 100

            price = float(input("Price: "))
            bill = with_gst(price)
            print(f"Bill: ₹{bill:.2f}")
          `,
          py`
            def with_gst(price):
                print(price * 118 / 100)
                return price * 118 / 100

            price = float(input("Price: "))
            bill = with_gst(price)
            print(f"Bill: ₹{bill:.2f}")
          `,
        ],
      },
      {
        id: "make", kind: "make", title: "Make: marks on one line (Days 24, 25, 27)",
        task: md`
          From a blank page. The user types marks on one line, with spaces between them. Print how many marks are 33 or more, then the highest mark. For «45 20 78 33» it shows:

          | 33 or more: 3
          | Highest: 78

          There is always at least one mark.
        `,
        starter: py`

        `,
        solution: py`
          marks = [int(x) for x in input("Marks: ").split()]
          count = 0
          for m in marks:
              if m >= 33:
                  count += 1
          print("33 or more:", count)
          print("Highest:", max(marks))
        `,
        tests: [
          { inputs: ["45 20 78 33"], output: "33 or more: 3\nHighest: 78" },
          { inputs: ["10"], output: "33 or more: 0\nHighest: 10" },
          { inputs: ["33 33"], output: "33 or more: 2\nHighest: 33" },
          { inputs: ["100 32 99"], output: "33 or more: 2\nHighest: 100" },
        ],
        wrong: [
          py`
            marks = [int(x) for x in input("Marks: ").split()]
            count = 0
            for m in marks:
                if m > 33:
                    count += 1
            print("33 or more:", count)
            print("Highest:", max(marks))
          `,
          py`
            marks = input("Marks: ").split()
            count = 0
            for m in marks:
                if int(m) >= 33:
                    count += 1
            print("33 or more:", count)
            print("Highest:", max(marks))
          `,
        ],
      },
    ],
    keys: [
      md`Your scores show what to practise next. They are a map, not a judgement.`,
      md`Repair at most 3 days at a time, smallest day numbers first.`,
      md`Do the Make exercise of each repair day again from a blank page.`,
    ],
  });
})();
