// Week 12 — Files and Real Data (Days 78 to 84).
// Day 78 finds files in folders. Days 79 and 80 read and write CSV with the csv
// module, including messy rows. Day 81 saves nested data with JSON. Day 82
// counts days between dates. Day 83 counts and summarises with Counter and
// statistics. Day 84 is the Kirana Khata project, which uses all of them.
(function () {
  const { day, md, py, ex, code, tip, warn, ask, pause } = window.Course;

  // ---------------------------------------------------------------- Day 78
  day({
    slug: "where-python-finds-files",
    title: "Where Python Looks for Files",
    goal: "Open a file in another folder, and work through every file in a folder.",
    minutes: 45,
    kind: "lesson",
    needs: [36, 38, 44],
    win: "Today you can now open a file inside a folder, write a Windows path safely, and work through every file in a folder.",
    learn: [
      md`
        ## The working folder

        When you give «open()» only a file name, Python looks in one folder. This is the **working folder**: the folder the program runs in. Here, one «marks.txt» sits beside the program and one sits inside a folder called «data». Guess what prints.
      `,
      ex(py`
        with open("marks.txt", encoding="utf-8") as f:
            print(f.read().strip())
        with open("data/marks.txt", encoding="utf-8") as f:
            print(f.read().strip())
      `, { files: { "marks.txt": "Asha 72\n", "data/marks.txt": "Ravi 65\n" },
           predict: ["Asha 72\nRavi 65", "Asha 72\nAsha 72", "Ravi 65\nRavi 65"], answer: 0 }),
      md`
        A name alone means the working folder. «data/marks.txt» means: go into the folder «data», then open «marks.txt». The «/» joins a folder name and a file name. Now see what happens when we forget the folder.
      `,
      ex(py`
        with open("ravi.txt", encoding="utf-8") as f:
            print(f.read())
      `, { files: { "data/ravi.txt": "Ravi 65\n" }, error: true, label: "A crash on purpose",
           predict: ["FileNotFoundError", "Ravi 65", "NameError"], answer: 0 }),
      md`
        «ravi.txt» is inside «data», not in the working folder, so Python cannot find it. The **os** module (a set of tools for folders and files) can tell you where you are. «os.getcwd()» gives the full path of the working folder. On this page it shows a pretend folder. On your laptop it shows something like «C:\Users\Asha\python-days».
      `,
      ex(py`
        import os
        print(os.getcwd())
      `, { label: "Where am I?" }),
      tip(md`
        An **encoding** is the rule that turns letters into the numbers a file stores. «encoding="utf-8"» picks the rule that knows «₹» and Hindi letters. This page always uses UTF-8, so a «₹» never breaks here. Older Python on Windows used another rule, and «₹» came out wrong. Write «encoding="utf-8"» every time. You try it on your laptop in today's mission.
      `),
      md`
        ## Backslashes in Windows paths

        A **path** is the full address of a file. Windows writes paths with a backslash, like «C:\new\table.csv». Inside quotes, Python reads a backslash and the next letter as one **backslash code**. «\n» is a new line, and «\t» is a tab (a wide space). Guess what prints.
      `,
      ex(py`
        print("C:\new\table.csv")
      `, { predict: ["C:\n" + "ew\table.csv", "C:\\new\\table.csv", "C:/new/table.csv"], answer: 0 }),
      md`
        «\n» became a new line and «\t» became a tab. So «open()» would look for the wrong file. There are three safe ways. Write forward slashes, «C:/new/table.csv»: Windows accepts them. Put an «r» before the quote: a **raw string** keeps every backslash as it is. Or write «\\»: two backslashes make one.
      `,
      ex(py`
        a = "C:/new/table.csv"
        b = r"C:\new\table.csv"
        c = "C:\\new\\table.csv"
        print(b)
        print(b == c)
      `, { predict: ["C:\\new\\table.csv\nTrue", "C:\\\\new\\\\table.csv\nFalse", "C:/new/table.csv\nTrue"], answer: 0 }),
      pause(md`A good place for a short break. Stand up and drink some water.`),
      md`
        ## Every file in a folder

        «os.listdir(folder)» gives a list of the names in a folder. With no folder, it lists the working folder. The order is not fixed, so always sort it. Guess what prints.
      `,
      ex(py`
        import os
        names = sorted(os.listdir("notes"))
        print(names)
        for name in names:
            if name.endswith(".txt"):
                with open("notes/" + name, encoding="utf-8") as f:
                    print(name, len(f.read().split()))
      `, { files: { "notes/polity.txt": "Article 21 protects life\n", "notes/history.txt": "Plassey 1757\n", "notes/marks.csv": "name,marks\n" },
           predict: ["['history.txt', 'marks.csv', 'polity.txt']\nhistory.txt 2\npolity.txt 4",
                     "['polity.txt', 'history.txt', 'marks.csv']\npolity.txt 4\nhistory.txt 2",
                     "['history.txt', 'marks.csv', 'polity.txt']\nhistory.txt 2\nmarks.csv 1\npolity.txt 4"], answer: 0 }),
      ask({
        q: md`Why does the program open «"notes/" + name» and not just «name»?`,
        options: ["«os.listdir» gives only the names, and the files are inside «notes»", "«name» is a number", "«open» needs two pieces of text"],
        answer: 0,
        explain: md`«os.listdir» gives names like «polity.txt», without the folder. The program adds the folder in front.`,
        why: [null, md`«name» is text, such as «polity.txt».`, md`«open» takes one path. We join two pieces into one path with «+».`],
      }),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`print(len("C:\\new"), len("C:\new"))`,
        options: ["6 5", "6 6", "7 6"], answer: 0,
        explain: md`«\\» is one backslash, so the first text has 6 letters. «\n» is one new line, so the second has 5.`,
        why: [null, md`In the second text, the backslash and the «n» join into one new line.`, md`Two backslashes make one backslash, not two.`],
        skill: "trace" },
      { q: md`Asha's laptop has «C:\new\table.csv», but «open("C:\new\table.csv")» says FileNotFoundError. Why?`,
        options: ["«\\n» and «\\t» became a new line and a tab, so the path is wrong", "Windows paths must use capital letters", "«open» cannot read CSV files"],
        answer: 0, verify: false, mono: false,
        explain: md`Inside normal quotes, a backslash starts a backslash code. Use «r"C:\new\table.csv"» or forward slashes.`,
        why: [null, md`Capital letters do not matter in Windows folder names.`, md`«open» reads any text file, CSV too.`],
        skill: "debug" },
      { q: md`What does this program do?`, code: py`
          import os
          for name in sorted(os.listdir("photos")):
              if name.endswith(".jpg"):
                  print(name)
        `, options: ["It prints the names of the .jpg files in the photos folder, A to Z", "It prints every file in the working folder", "It opens each photo and prints it"],
        answer: 0, verify: false, mono: false,
        explain: md`«os.listdir("photos")» lists the folder. The «if» keeps names that end with «.jpg».`,
        why: [null, md`The folder name «photos» is given, so it lists that folder.`, md`Nothing is opened. Only the names are printed.`],
        skill: "read" },
      { q: md`Why do we write «sorted(os.listdir())» and not just «os.listdir()»?`,
        options: ["The order of the names is not fixed", "«os.listdir» gives a set", "Without «sorted» it crashes"],
        answer: 0, verify: false, mono: false,
        explain: md`Different computers may give the names in different orders. Sorting gives the same order every time.`,
        why: [null, md`It gives a list, but the order of that list can change.`, md`It works without «sorted». The order is the problem.`],
        skill: "memory" },
      { q: md`Which setting makes a file with «₹» read the same way on every laptop?`,
        options: ['«encoding="utf-8"»', '«"a"»', "«r» before the quote"],
        answer: 0, verify: false, mono: false,
        explain: md`UTF-8 is the encoding that knows «₹». Write it every time you open a text file.`,
        why: [null, md`«"a"» is the mode that adds to the end of a file.`, md`«r» before a quote makes a raw string. It is for backslashes in paths.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: three paths",
        task: md`Answer each question without running the program.`,
        code: py`
          a = "C:\new"
          b = r"C:\new"
          c = "C:\\new"
          size_a = len(a)
          size_b = len(b)
          size_c = len(c)
          print(size_a, size_b, size_c)
        `,
        inputs: [],
        ask: [{ line: 4, name: "size_a" }, { line: 6, name: "size_c" }, { output: true }],
        hints: [
          md`If you count 6 for «size_a», you counted the backslash and the «n» as two letters.`,
          md`In «a», the backslash and «n» join into one new line. In «b», the «r» keeps both letters.`,
          md`In «c», two backslashes make one backslash. So «c» and «b» hold the same text.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: a folder of marks",
        task: md`The folder «marks» holds three files. Answer each question without running the program.`,
        files: { "marks/ravi.txt": "65\n", "marks/asha.txt": "72\n", "marks/list.csv": "name\n" },
        code: py`
          import os
          names = sorted(os.listdir("marks"))
          total = 0
          for name in names:
              if name.endswith(".txt"):
                  with open("marks/" + name, encoding="utf-8") as f:
                      total += int(f.read().strip())
          print(len(names), total)
        `,
        inputs: [],
        ask: [{ line: 2, name: "names" }, { line: 7, name: "total" }, { output: true }],
        hints: [
          md`If your list is not in A to Z order, look again at «sorted».`,
          md`The first file the loop opens is the first «.txt» name in A to Z order.`,
          md`«list.csv» is counted by «len(names)», but it is never opened, because it does not end with «.txt».`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: words in each note",
        task: md`
          The folder «notes» holds some «.txt» notes and other files. Put the lines in order so the program prints each «.txt» file and its number of words, A to Z:

          | history.txt 4
          | polity.txt 6
        `,
        files: { "notes/polity.txt": "Article 21 protects life and liberty\n", "notes/history.txt": "Plassey 1757\nBuxar 1764\n", "notes/list.csv": "a,b\n" },
        solution: py`
          import os
          for name in sorted(os.listdir("notes")):
              if name.endswith(".txt"):
                  with open("notes/" + name, encoding="utf-8") as f:
                      words = f.read().split()
                  print(name, len(words))
        `,
        distractors: ["with open(name, encoding=\"utf-8\") as f:", "for name in os.listdir():"],
        indent: "choose",
        tests: [
          { output: "history.txt 4\npolity.txt 6" },
          { files: { "notes/polity.txt": "Lok Sabha\n", "notes/economy.txt": "GDP GST RBI\n" }, output: "economy.txt 3\nhistory.txt 4\npolity.txt 2" },
          { files: { "notes/art.txt": "\n", "notes/table.csv": "x\n" }, output: "art.txt 0\nhistory.txt 4\npolity.txt 6" },
        ],
        hints: [
          md`If a file is not found, the open line has only the file name, without the folder.`,
          md`If «list.csv» is printed, the line that checks the end of the name is missing or in the wrong place.`,
          md`If the files come out of order, the loop line is not using the sorted list of the «notes» folder.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the missing folder",
        task: md`
          Each «.txt» file in the folder «marks» holds one mark. The program should print «Total marks: 137». Instead it stops with:

          | FileNotFoundError: [Errno 2] No such file or directory: 'asha.txt'

          Fix the one wrong line.
        `,
        files: { "marks/asha.txt": "72\n", "marks/ravi.txt": "65\n" },
        starter: py`
          import os
          total = 0
          for name in sorted(os.listdir("marks")):
              if name.endswith(".txt"):
                  with open(name, encoding="utf-8") as f:
                      total += int(f.read().strip())
          print("Total marks:", total)
        `,
        bugLines: [5],
        solution: py`
          import os
          total = 0
          for name in sorted(os.listdir("marks")):
              if name.endswith(".txt"):
                  with open("marks/" + name, encoding="utf-8") as f:
                      total += int(f.read().strip())
          print("Total marks:", total)
        `,
        tests: [
          { output: "Total marks: 137" },
          { files: { "marks/meena.txt": "90\n" }, output: "Total marks: 227" },
          { files: { "marks/asha.txt": "0\n", "marks/ravi.txt": "0\n", "marks/notes.csv": "x\n" }, output: "Total marks: 0" },
        ],
        wrong: [py`
          import os
          total = 0
          for name in sorted(os.listdir("marks")):
              if name.endswith(".txt"):
                  with open("marks" + name, encoding="utf-8") as f:
                      total += int(f.read().strip())
          print("Total marks:", total)
        `, py`
          import os
          total = 0
          for name in sorted(os.listdir("marks")):
              if name.endswith(".txt"):
                  with open("marks/" + name, encoding="utf-8") as f:
                      total = int(f.read().strip())
          print("Total marks:", total)
        `],
        hints: [
          md`The red message names «asha.txt». Python looked for it in the working folder and did not find it there.`,
          md`«asha.txt» is inside the folder «marks». The open line gives only the file name.`,
          md`If the message now says «marksasha.txt», the slash between the folder and the name is missing.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: the total of words",
        task: md`
          This program prints each «.txt» note and its number of words. Change it so it also prints the total at the end:

          | history.txt 4
          | polity.txt 6
          | Total: 10 words
        `,
        files: { "notes/polity.txt": "Article 21 protects life and liberty\n", "notes/history.txt": "Plassey 1757\nBuxar 1764\n", "notes/list.csv": "a,b\n" },
        starter: py`
          import os
          for name in sorted(os.listdir("notes")):
              if name.endswith(".txt"):
                  with open("notes/" + name, encoding="utf-8") as f:
                      words = f.read().split()
                  print(name, len(words))
        `,
        solution: py`
          import os
          total = 0
          for name in sorted(os.listdir("notes")):
              if name.endswith(".txt"):
                  with open("notes/" + name, encoding="utf-8") as f:
                      words = f.read().split()
                  print(name, len(words))
                  total += len(words)
          print("Total:", total, "words")
        `,
        tests: [
          { output: "history.txt 4\npolity.txt 6\nTotal: 10 words" },
          { files: { "notes/economy.txt": "GDP GST\n" }, output: "economy.txt 2\nhistory.txt 4\npolity.txt 6\nTotal: 12 words" },
          { files: { "notes/polity.txt": "\n", "notes/history.txt": "\n" }, output: "history.txt 0\npolity.txt 0\nTotal: 0 words" },
        ],
        wrong: [py`
          import os
          total = 0
          for name in sorted(os.listdir("notes")):
              if name.endswith(".txt"):
                  with open("notes/" + name, encoding="utf-8") as f:
                      words = f.read().split()
                  print(name, len(words))
                  total += 1
          print("Total:", total, "words")
        `],
        hints: [
          md`If your total equals the number of files, you are adding 1 each time, not the number of words.`,
          md`If the total prints after every file, the last print is inside the loop.`,
          md`If the total is always 0, the adding line is missing, or the total starts again inside the loop.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: lines in every note",
        task: md`
          Ask for a folder name. For each «.txt» file in that folder, in A to Z order, print its name and its number of lines. Then print how many «.txt» files there were. Open each file with «encoding="utf-8"», and sort the names. For the folder «notes» it shows:

          | history.txt: 2 lines
          | polity.txt: 1 lines
          | Files: 2
        `,
        files: { "notes/polity.txt": "Article 21 protects life\n", "notes/history.txt": "Plassey 1757\nBuxar 1764\n", "notes/marks.csv": "name,marks\nAsha,72\n" },
        starter: py`

        `,
        solution: py`
          import os
          folder = input("Folder: ")
          files = 0
          for name in sorted(os.listdir(folder)):
              if name.endswith(".txt"):
                  count = 0
                  with open(folder + "/" + name, encoding="utf-8") as f:
                      for line in f:
                          count += 1
                  print(name + ":", count, "lines")
                  files += 1
          print("Files:", files)
        `,
        tests: [
          { inputs: ["notes"], output: "history.txt: 2 lines\npolity.txt: 1 lines\nFiles: 2" },
          { inputs: ["ssc"], files: { "ssc/maths.txt": "Ratio\nPercent\nAverage\n", "ssc/gk.txt": "Rivers\n", "ssc/english.txt": "Idioms\nVoice\n" },
            output: "english.txt: 2 lines\ngk.txt: 1 lines\nmaths.txt: 3 lines\nFiles: 3" },
          { inputs: ["sheets"], files: { "sheets/marks.csv": "a\n", "sheets/rank.csv": "b\n" }, output: "Files: 0" },
          { inputs: ["one"], files: { "one/chai.txt": "Masala ₹12\n" }, output: "chai.txt: 1 lines\nFiles: 1" },
          { uses: ["call:sorted"], msg: md`Sort the names from «os.listdir», because their order is not fixed.` },
          { uses: ["kw:encoding"], msg: md`Open each file with «encoding="utf-8"», so «₹» reads the same on every laptop.` },
        ],
        wrong: [py`
          import os
          folder = input("Folder: ")
          files = 0
          for name in sorted(os.listdir(folder)):
              count = 0
              with open(folder + "/" + name, encoding="utf-8") as f:
                  for line in f:
                      count += 1
              print(name + ":", count, "lines")
              files += 1
          print("Files:", files)
        `, py`
          import os
          folder = input("Folder: ")
          files = 0
          for name in sorted(os.listdir(folder)):
              if name.endswith(".txt"):
                  count = 0
                  with open(name, encoding="utf-8") as f:
                      for line in f:
                          count += 1
                  print(name + ":", count, "lines")
                  files += 1
          print("Files:", files)
        `],
        hints: [
          md`If a «.csv» file appears in your output, your program does not check the end of each name.`,
          md`If you see FileNotFoundError, the path you open has the file name but not the folder name the user typed.`,
          md`If the line counts grow from one file to the next, the count does not start again at 0 for each file.`,
        ],
      },
      {
        id: "d1", kind: "drill", title: "Laptop Mission: where is my program?",
        task: md`
          This pretend Command Prompt shows a program that finds its own folder. Type each command and press Enter.

          On a phone, you may skip this. Phone users are excused from the mission below.
        `,
        steps: [
          { say: md`Go into your project folder. Type «cd python-days» and press Enter.`,
            expect: ["cd python-days"], output: "" },
          { say: md`Run the program. Type «python where.py» and press Enter.`,
            expect: ["python where.py", "py where.py"],
            output: "C:\\Users\\Asha\\python-days\n['chai_bill.py', 'rupee.txt', 'where.py']\nChai: ₹12 9009" },
        ],
        mission: md`
          Now do it for real. In IDLE, make a new file in your «python-days» folder and save it as «where.py»:

          : import os
          : print(os.getcwd())
          : with open("rupee.txt", "w", encoding="utf-8") as f:
          :     f.write("Chai: ₹12")
          : with open("rupee.txt", encoding="utf-8") as f:
          :     text = f.read()
          : print(sorted(os.listdir()))
          : print(text, len(text) * 1001)

          1. Run it. The first line shows your working folder. The list shows the files in it.
          2. Check that «₹12» comes out correctly. Python 3.15 and later use UTF-8 on Windows anyway, so you may see no difference without the setting. Keep writing it: many laptops still have an older Python.
          3. The last number is your receipt code. Write it in your notebook.
        `,
        hints: [
          md`Type the words in the grey box exactly, then press Enter.`,
          md`There is one space between «python» and the file name.`,
          md`If «python» does not work on your laptop, «py» does the same job.`,
        ],
      },
    ],
    keys: [
      md`A file name alone means the **working folder**. «os.getcwd()» shows where that is.`,
      md`«folder/name.txt» opens a file inside a folder. The «/» works on Windows too.`,
      md`In normal quotes, «\n» is a new line and «\t» is a tab. For Windows paths, use forward slashes, a raw string «r"..."», or «\\».`,
      md`«sorted(os.listdir(folder))» gives the names in a folder in a fixed order. Add the folder name in front before you open each one.`,
      md`Write «encoding="utf-8"» every time you open a text file.`,
    ],
  });

  // ---------------------------------------------------------------- Day 79
  day({
    slug: "csv-module",
    title: "The csv Module",
    goal: "Read rows safely, even with commas inside a field.",
    minutes: 40,
    kind: "lesson",
    needs: [25, 78],
    win: "Today you can now read a CSV file row by row with the csv module, even when a field has a comma inside it.",
    learn: [
      md`
        ## Why split breaks

        A **field** is one value in a row, like a city. When a field has a comma inside it, a CSV file puts quotes around that field. Guess how many pieces «split» makes from each line.
      `,
      ex(py`
        with open("people.csv", encoding="utf-8") as f:
            for line in f:
                parts = line.strip().split(",")
                print(len(parts), parts[1])
      `, { files: { "people.csv": 'name,city,marks\nAsha,"Delhi, India",72\nRavi,Pune,65\n' },
           predict: ['3 city\n4 "Delhi\n3 Pune', '3 city\n3 Delhi, India\n3 Pune', '3 city\n4 Delhi\n3 Pune'], answer: 0 }),
      md`
        «split» cuts at every comma. It does not know that the quotes keep «Delhi, India» together. So Asha's row has 4 pieces, and her marks move to the wrong place.
      `,
      md`
        ## The csv module reads rows

        The **csv** module knows the CSV rules. «csv.reader(f)» gives each row as a list of fields, and it keeps quoted fields together. Guess what prints.
      `,
      ex(py`
        import csv
        with open("people.csv", encoding="utf-8") as f:
            reader = csv.reader(f)
            for row in reader:
                print(row)
      `, { files: { "people.csv": 'name,city,marks\nAsha,"Delhi, India",72\nRavi,Pune,65\n' },
           predict: ["['name', 'city', 'marks']\n['Asha', 'Delhi, India', '72']\n['Ravi', 'Pune', '65']",
                     "['Asha', 'Delhi, India', '72']\n['Ravi', 'Pune', '65']",
                     "['name', 'city', 'marks']\n['Asha', 'Delhi, India', 72]\n['Ravi', 'Pune', 65]"], answer: 0 }),
      md`
        The first row is the **header**: the names of the columns. «next(reader)» takes one row from the reader. Call it once before the loop, and the loop starts at the first real row.
      `,
      ex(py`
        import csv
        with open("people.csv", encoding="utf-8") as f:
            reader = csv.reader(f)
            header = next(reader)
            for row in reader:
                print(row[0], "lives in", row[1])
        print(header[2])
      `, { files: { "people.csv": 'name,city,marks\nAsha,"Delhi, India",72\nRavi,Pune,65\n' },
           predict: ["Asha lives in Delhi, India\nRavi lives in Pune\nmarks", "name lives in city\nAsha lives in Delhi, India\nRavi lives in Pune\nmarks", "Asha lives in Delhi, India\nRavi lives in Pune\n72"], answer: 0 }),
      md`
        ## Every field is still text

        The reader gives every field as text, even the marks. Guess what happens when we add them up.
      `,
      ex(py`
        import csv
        total = 0
        with open("people.csv", encoding="utf-8") as f:
            reader = csv.reader(f)
            next(reader)
            for row in reader:
                total += row[2]
        print(total)
      `, { files: { "people.csv": 'name,city,marks\nAsha,"Delhi, India",72\nRavi,Pune,65\n' }, error: true, label: "A crash on purpose",
           predict: ["TypeError", "137", "7265"], answer: 0 }),
      md`
        «row[2]» is the text «"72"». A number and text cannot be added, so Python stops with TypeError. Convert first: «total += int(row[2])».
      `,
      ask({
        q: md`In this lesson, what is «row[2]» for Asha's row?`,
        options: ['The text «"72"»', "The number «72»", "The text «India»"],
        answer: 0,
        explain: md`The csv module never converts. Every field comes out as text.`,
        why: [null, md`You get a number only after «int(row[2])».`, md`That is what «split» gives. The reader keeps «Delhi, India» as one field, so «row[2]» is the marks.`],
      }),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          line = 'Ravi,"Pune, MH",65'
          print(len(line.split(",")))
        `, options: ["4", "3", "2"], answer: 0,
        explain: md`«split» cuts at all three commas, so it makes 4 pieces. It does not know about the quotes.`,
        why: [null, md`3 is what «csv.reader» gives. «split» also cuts inside the quotes.`, md`There are three commas, so there are more than 2 pieces.`],
        skill: "trace" },
      { q: md`Why do we call «next(reader)» once before the loop?`,
        options: ["To skip the header row", "To skip the last row", "To turn the fields into numbers"],
        answer: 0, verify: false, mono: false,
        explain: md`«next» takes the first row, the header, so the loop starts at the first real row.`,
        why: [null, md`«next» takes the row that comes next. Before the loop, that is the first row.`, md`«next» does not convert anything. Use «int()» for that.`],
        skill: "memory" },
      { q: md`What does this show?`, code: py`
          row = ["chai", "12"]
          print(row[1] * 2)
        `, options: ["1212", "24", "TypeError"], answer: 0,
        explain: md`«row[1]» is the text «"12"». Text times 2 repeats it.`,
        why: [null, md`24 needs «int(row[1]) * 2». The field is still text.`, md`Text times a whole number works: it repeats the text.`],
        skill: "debug" },
      { q: md`What does this program do?`, code: py`
          import csv
          count = 0
          with open("students.csv", encoding="utf-8") as f:
              reader = csv.reader(f)
              next(reader)
              for row in reader:
                  if row[1] == "Delhi":
                      count += 1
          print(count)
        `, options: ["It prints how many students live in Delhi", "It prints the names of the Delhi students", "It prints how many rows the file has"],
        answer: 0, verify: false, mono: false,
        explain: md`The loop adds 1 for each row whose city field is «Delhi».`,
        why: [null, md`Only one number is printed, not names.`, md`Only rows with the city «Delhi» are counted, and the header is skipped.`],
        skill: "read" },
      { q: md`A file has the field «"Delhi, India"». Which tool reads its rows correctly?`,
        options: ["«csv.reader»", '«.split(",")»', "«.strip()»"],
        answer: 0, verify: false, mono: false,
        explain: md`«csv.reader» follows the CSV rules, so it keeps a quoted field together.`,
        why: [null, md`«split» cuts inside the quotes too.`, md`«strip» only removes spaces at the two ends.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: the team list",
        task: md`Answer each question without running the program.`,
        files: { "team.csv": 'name,city\nRohit,"Mumbai, MH"\nVirat,Delhi\n' },
        code: py`
          import csv
          with open("team.csv", encoding="utf-8") as f:
              reader = csv.reader(f)
              header = next(reader)
              count = 0
              for row in reader:
                  count += 1
                  last = row[1]
          print(header[1], count, last)
        `,
        inputs: [],
        ask: [{ line: 4, name: "header" }, { line: 8, name: "last" }, { output: true }],
        hints: [
          md`If your «header» has player names in it, look again: the header is the first line of the file.`,
          md`If you wrote «"Mumbai» for «last», you split at the comma. The reader keeps quoted fields together.`,
          md`If your count is 3, you counted the header too. «next» took it before the loop.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: text or number",
        task: md`Answer each question without running the program.`,
        files: { "sales.csv": "item,cups\nchai,12\nsamosa,30\n" },
        code: py`
          import csv
          with open("sales.csv", encoding="utf-8") as f:
              reader = csv.reader(f)
              next(reader)
              total = 0
              joined = ""
              for row in reader:
                  total += int(row[1])
                  joined += row[1]
          print(total, joined)
        `,
        inputs: [],
        ask: [{ line: 8, hit: 2, name: "total" }, { line: 9, hit: 2, name: "joined" }, { output: true }],
        hints: [
          md`If your «total» is 30, you forgot the 12 from the first row.`,
          md`If «joined» is a number like 42, look again: «row[1]» is text, so «+=» puts the pieces side by side.`,
          md`The first row adds 12 and the text «12». The second row adds 30 and the text «30».`,
        ],
      },
      {
        id: "f1", kind: "fill", title: "Fill the gaps: total marks",
        task: md`
          Fill the gaps so the program reads «marks.csv», skips the header and adds up the marks. For the file given it shows:

          | Total: 137
        `,
        files: { "marks.csv": 'name,city,marks\nAsha,"Delhi, India",72\nRavi,Pune,65\n' },
        template: py`
          import ⟦csv⟧
          total = 0
          with open("marks.csv", encoding="utf-8") as f:
              reader = csv.⟦reader⟧(f)
              ⟦next⟧(reader)
              for row in reader:
                  total += ⟦int⟧(row[2])
          print("Total:", total)
        `,
        tests: [
          { output: "Total: 137" },
          { files: { "marks.csv": 'name,city,marks\nMeena,"Agra, UP",90\n' }, output: "Total: 90" },
          { files: { "marks.csv": "name,city,marks\n" }, output: "Total: 0" },
          { files: { "marks.csv": "name,city,marks\nImran,Goa,0\nZoya,Pune,100\nKiran,Surat,45\n" }, output: "Total: 145" },
        ],
        hints: [
          md`If you see «invalid literal for int()» with the word «marks», the header row reached the loop.`,
          md`If you see TypeError about «str», the marks field is still text when it is added.`,
          md`If «csv» is not defined, the module is not imported on the first line.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: Delhi, India",
        task: md`
          The program should print each student's city, then the total:

          | Asha from Delhi, India
          | Ravi from Pune
          | Total: 137

          Instead it prints «Asha from "Delhi» and stops with «ValueError: invalid literal for int() with base 10: ' India"'». Fix the loop so it uses the reader.
        `,
        files: { "students.csv": 'name,city,marks\nAsha,"Delhi, India",72\nRavi,Pune,65\n' },
        starter: py`
          import csv
          total = 0
          with open("students.csv", encoding="utf-8") as f:
              reader = csv.reader(f)
              next(reader)
              for line in f:
                  row = line.strip().split(",")
                  print(row[0], "from", row[1])
                  total += int(row[2])
          print("Total:", total)
        `,
        bugLines: [6, 7],
        solution: py`
          import csv
          total = 0
          with open("students.csv", encoding="utf-8") as f:
              reader = csv.reader(f)
              next(reader)
              for row in reader:
                  print(row[0], "from", row[1])
                  total += int(row[2])
          print("Total:", total)
        `,
        tests: [
          { output: "Asha from Delhi, India\nRavi from Pune\nTotal: 137" },
          { files: { "students.csv": "name,city,marks\nMeena,Agra,80\n" }, output: "Meena from Agra\nTotal: 80" },
          { files: { "students.csv": 'name,city,marks\nImran,"Mumbai, MH",55\nZoya,"Pune, MH",60\nKiran,Goa,0\n' },
            output: "Imran from Mumbai, MH\nZoya from Pune, MH\nKiran from Goa\nTotal: 115" },
        ],
        wrong: [py`
          import csv
          total = 0
          with open("students.csv", encoding="utf-8") as f:
              reader = csv.reader(f)
              next(reader)
              for line in f:
                  row = line.strip().split(",")
                  print(row[0], "from", row[1])
                  total += int(row[-1])
          print("Total:", total)
        `, py`
          import csv
          total = 0
          with open("students.csv", encoding="utf-8") as f:
              reader = csv.reader(f)
              next(reader)
              for row in reader:
                  row = line.strip().split(",")
                  print(row[0], "from", row[1])
                  total += int(row[2])
          print("Total:", total)
        `],
        hints: [
          md`The crash comes on Asha's row, the only row with a comma inside a field. The other rows work.`,
          md`On that row, the loop cuts the line at every comma, so « India"» lands where the marks should be. The reader is made but never used in the loop.`,
          md`If you now see NameError for «line», the old splitting line is still there after you changed the loop.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: only the passes",
        task: md`
          This program prints every student. Change it so it prints only students with 60 marks or more, then how many passed:

          | Asha 72
          | Ravi 65
          | Passed: 2
        `,
        files: { "students.csv": 'name,city,marks\nAsha,"Delhi, India",72\nRavi,Pune,65\nMeena,Agra,40\n' },
        starter: py`
          import csv
          with open("students.csv", encoding="utf-8") as f:
              reader = csv.reader(f)
              next(reader)
              for row in reader:
                  print(row[0], row[2])
        `,
        solution: py`
          import csv
          passed = 0
          with open("students.csv", encoding="utf-8") as f:
              reader = csv.reader(f)
              next(reader)
              for row in reader:
                  if int(row[2]) >= 60:
                      print(row[0], row[2])
                      passed += 1
          print("Passed:", passed)
        `,
        tests: [
          { output: "Asha 72\nRavi 65\nPassed: 2" },
          { files: { "students.csv": "name,city,marks\nImran,Goa,59\nZoya,Pune,60\n" }, output: "Zoya 60\nPassed: 1" },
          { files: { "students.csv": "name,city,marks\nKiran,Surat,12\n" }, output: "Passed: 0" },
        ],
        wrong: [py`
          import csv
          passed = 0
          with open("students.csv", encoding="utf-8") as f:
              reader = csv.reader(f)
              next(reader)
              for row in reader:
                  if int(row[2]) > 60:
                      print(row[0], row[2])
                      passed += 1
          print("Passed:", passed)
        `],
        hints: [
          md`If a student with exactly 60 is missing, the check leaves out 60.`,
          md`If you see TypeError with «>=», the marks field is still text when you compare it.`,
          md`If «Passed» shows the number of all students, the counting line is outside the «if».`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: the chai stall bill",
        task: md`
          The file «orders.csv» has a header and the columns item, price and cups. Some items have a comma inside. Use the csv module. Print each item and its cost (price times cups), then the number of items and the bill. For the file given it shows:

          | Masala chai, large: 40
          | Samosa: 30
          | Items: 2
          | Bill: 70 rupees
        `,
        files: { "orders.csv": 'item,price,cups\n"Masala chai, large",20,2\nSamosa,15,2\n' },
        starter: py`

        `,
        solution: py`
          import csv
          bill = 0
          items = 0
          with open("orders.csv", encoding="utf-8") as f:
              reader = csv.reader(f)
              next(reader)
              for row in reader:
                  cost = int(row[1]) * int(row[2])
                  print(row[0] + ":", cost)
                  bill += cost
                  items += 1
          print("Items:", items)
          print("Bill:", bill, "rupees")
        `,
        tests: [
          { output: "Masala chai, large: 40\nSamosa: 30\nItems: 2\nBill: 70 rupees" },
          { files: { "orders.csv": 'item,price,cups\nVada pav,25,4\n"Chai, cutting",10,3\n"Poha, small",30,1\n' },
            output: "Vada pav: 100\nChai, cutting: 30\nPoha, small: 30\nItems: 3\nBill: 160 rupees" },
          { files: { "orders.csv": "item,price,cups\n" }, output: "Items: 0\nBill: 0 rupees" },
          { files: { "orders.csv": "item,price,cups\nLassi,40,0\n" }, output: "Lassi: 0\nItems: 1\nBill: 0 rupees" },
        ],
        wrong: [py`
          bill = 0
          items = 0
          with open("orders.csv", encoding="utf-8") as f:
              lines = f.read().strip().split("\n")
          for line in lines[1:]:
              row = line.split(",")
              cost = int(row[-2]) * int(row[-1])
              print(row[0] + ":", cost)
              bill += cost
              items += 1
          print("Items:", items)
          print("Bill:", bill, "rupees")
        `, py`
          import csv
          bill = 0
          items = 0
          with open("orders.csv", encoding="utf-8") as f:
              reader = csv.reader(f)
              for row in reader:
                  cost = int(row[1]) * int(row[2])
                  print(row[0] + ":", cost)
                  bill += cost
                  items += 1
          print("Items:", items)
          print("Bill:", bill, "rupees")
        `],
        hints: [
          md`If the first item prints as «"Masala chai», your program cuts the line at every comma instead of using the reader.`,
          md`If you see «invalid literal for int()» with the word «price», the header row reached the loop.`,
          md`If the file has only a header, the program must still print «Items: 0» and «Bill: 0 rupees». Start both counts at 0 before the loop.`,
        ],
      },
    ],
    keys: [
      md`«split(",")» cuts at every comma, even inside quotes. A field like «"Delhi, India"» breaks it.`,
      md`«csv.reader(f)» gives each row as a list of fields, with quoted fields kept together.`,
      md`«next(reader)» once before the loop skips the header row.`,
      md`Every field is text. Use «int()» or «float()» before you do maths.`,
    ],
  });

  // ---------------------------------------------------------------- Day 80
  day({
    slug: "csv-by-column-name",
    title: "CSV by Column Name",
    goal: "Read rows by column name and write new CSV files.",
    minutes: 45,
    kind: "lesson",
    needs: [36, 58, 79],
    win: "Today you can now read CSV rows by column name, skip and count bad rows, and write a clean CSV file.",
    learn: [
      md`
        ## Rows by column name

        «csv.DictReader(f)» reads the header for you. Each row comes out as a dictionary, and the column names are its keys. You do not need «next». Guess what prints.
      `,
      ex(py`
        import csv
        with open("students.csv", encoding="utf-8") as f:
            for row in csv.DictReader(f):
                print(row["name"], row["marks"])
      `, { files: { "students.csv": 'name,city,marks\nAsha,"Delhi, India",72\nRavi,Pune,65\n' },
           predict: ["Asha 72\nRavi 65", "name marks\nAsha 72\nRavi 65", "Asha Delhi, India\nRavi Pune"], answer: 0 }),
      md`
        «row["marks"]» is easier to read than «row[2]». It still works if someone moves the columns around. The values are still text.
      `,
      md`
        ## Writing a CSV file

        «csv.DictWriter(f, fieldnames=[...])» writes dictionaries as rows. «fieldnames» is the list of column names, in order. «writeheader()» writes the header row, and «writerows(rows)» writes every dictionary in a list. Guess what the new file holds.
      `,
      ex(py`
        import csv
        rows = [{"name": "Asha", "city": "Delhi, India"}, {"name": "Ravi", "city": "Pune"}]
        with open("out.csv", "w", encoding="utf-8", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=["name", "city"])
            writer.writeheader()
            writer.writerows(rows)
        with open("out.csv", encoding="utf-8") as f:
            print(f.read())
      `, { predict: ['name,city\nAsha,"Delhi, India"\nRavi,Pune', "Asha,Delhi, India\nRavi,Pune", "name,city\nAsha,Delhi, India\nRavi,Pune"], answer: 0 }),
      md`
        The writer put quotes around «Delhi, India» by itself. «newline=""» stops Windows from adding an empty line after each row. This page cannot show that problem, so write «newline=""» every time you open a CSV file for writing.
      `,
      pause(md`A good place for a break. The last part is about messy files.`),
      md`
        ## Skipping and counting bad rows

        Real files are messy. A **bad row** is a row with a value you cannot use, like a blank mark. Guess what happens.
      `,
      ex(py`
        import csv
        with open("marks.csv", encoding="utf-8") as f:
            for row in csv.DictReader(f):
                print(row["name"], int(row["marks"]) + 5)
      `, { files: { "marks.csv": "name,marks\nAsha,72\nRavi,\nMeena,80\n" }, error: true, label: "A crash on purpose",
           predict: ["ValueError", "TypeError", "KeyError"], answer: 0 }),
      md`
        Ravi's mark is blank, and «int("")» gives ValueError. Catch that error, count the row, and use «continue» to go to the next row. Never drop rows in silence: always say how many you skipped.
      `,
      ex(py`
        import csv
        good = []
        skipped = 0
        with open("marks.csv", encoding="utf-8") as f:
            for row in csv.DictReader(f):
                try:
                    row["marks"] = int(row["marks"])
                except ValueError:
                    skipped += 1
                    continue
                good.append(row)
        print(len(good), "kept,", skipped, "skipped")
      `, { files: { "marks.csv": "name,marks\nAsha,72\nRavi,\nMeena,eighty\nImran,80\n" },
           predict: ["2 kept, 2 skipped", "2 kept, 1 skipped", "4 kept, 2 skipped"], answer: 0 }),
      ask({
        q: md`Why is «good.append(row)» after the «try» block, not before it?`,
        options: ["So only rows whose marks became a number are kept", "Because «append» must always be the last line", "So the header row is skipped"],
        answer: 0,
        explain: md`A bad row reaches «continue» first, so it never gets to «append».`,
        why: [null, md`There is no such rule. The place matters here because of «continue».`, md`«DictReader» already uses the header. It never comes into the loop.`],
      }),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          row = {"name": "Asha", "marks": "72"}
          print(row["marks"] + "5")
        `, options: ["725", "77", "TypeError"], answer: 0,
        explain: md`Values from a CSV row are text, so «+» joins the two pieces of text.`,
        why: [null, md`77 needs «int(row["marks"]) + 5».`, md`Text plus text works. It joins them.`],
        skill: "trace" },
      { q: md`In «for row in csv.DictReader(f):», what is «row»?`,
        options: ["A dictionary with the column names as keys", "A list of fields", "One line of text"],
        answer: 0, verify: false, mono: false,
        explain: md`«DictReader» uses the header row as the keys of each dictionary.`,
        why: [null, md`That is what «csv.reader» gives.`, md`That is what «for line in f» gives.`],
        skill: "memory" },
      { q: md`Ravi writes a CSV file on Windows. When he opens it, there is an empty line after every row. What did he forget?`,
        options: ['«newline=""» in «open»', "«writer.writeheader()»", '«encoding="utf-8"»'],
        answer: 0, verify: false, mono: false,
        explain: md`Without «newline=""», Windows adds an extra line ending after each row.`,
        why: [null, md`Without «writeheader» the column names are missing, but no empty lines appear.`, md`The encoding changes how letters like «₹» are stored, not the line endings.`],
        skill: "debug" },
      { q: md`What does this program do?`, code: py`
          import csv
          bad = 0
          with open("fees.csv", encoding="utf-8") as f:
              for row in csv.DictReader(f):
                  try:
                      int(row["fee"])
                  except ValueError:
                      bad += 1
          print(bad)
        `, options: ["It counts the rows whose fee is not a whole number", "It adds up all the fees", "It deletes the bad rows from the file"],
        answer: 0, verify: false, mono: false,
        explain: md`Each fee that «int» cannot convert adds 1 to «bad».`,
        why: [null, md`The converted fee is never stored or added.`, md`The file is only read. Nothing is written or deleted.`],
        skill: "read" },
      { q: md`Which line writes the column names at the top of a new CSV file?`,
        options: ["«writer.writeheader()»", "«writer.writerows(rows)»", "«csv.DictReader(f)»"],
        answer: 0, verify: false, mono: false,
        explain: md`«writeheader» writes the names from «fieldnames» as the first row.`,
        why: [null, md`«writerows» writes the data rows, not the header.`, md`«DictReader» reads a file. It does not write.`],
        skill: "memory" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: the snack sales",
        task: md`Answer each question without running the program.`,
        files: { "sales.csv": "item,price,cups\nchai,12,3\nsamosa,15,2\n" },
        code: py`
          import csv
          total = 0
          with open("sales.csv", encoding="utf-8") as f:
              for row in csv.DictReader(f):
                  item = row["item"]
                  total += int(row["price"]) * int(row["cups"])
          print(item, total)
        `,
        inputs: [],
        ask: [{ line: 5, name: "item" }, { line: 6, hit: 2, name: "total" }, { output: true }],
        hints: [
          md`If you wrote «item» for the first answer, you read the header. «DictReader» starts at the first real row.`,
          md`If your total is 30, you forgot the first row. The first row adds 12 times 3.`,
          md`After the loop, «item» keeps the value from the last row.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: kept and skipped",
        task: md`Answer each question without running the program.`,
        files: { "marks.csv": "name,marks\nAsha,72\nRavi,\nMeena,abc\nImran,55\nZoya,90\n" },
        code: py`
          import csv
          kept = 0
          skipped = 0
          with open("marks.csv", encoding="utf-8") as f:
              for row in csv.DictReader(f):
                  try:
                      mark = int(row["marks"])
                      kept += 1
                  except ValueError:
                      skipped += 1
          print(kept, skipped)
        `,
        inputs: [],
        ask: [{ line: 8, name: "kept" }, { line: 10, hit: 2, name: "skipped" }, { output: true }],
        hints: [
          md`If you counted Ravi as kept, look again: his mark is blank, and «int» cannot convert a blank.`,
          md`When «int» fails, Python jumps to «except» and does not run the «kept» line.`,
          md`The bad rows are Ravi and Meena. The other three are kept.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: save the toppers",
        task: md`
          Put the lines in order so the program saves the toppers in «toppers.csv», with a header, and prints «Saved 2 rows». The file must hold:

          | name,marks
          | Asha,92
          | Ravi,88
        `,
        solution: py`
          import csv
          toppers = [{"name": "Asha", "marks": 92}, {"name": "Ravi", "marks": 88}]
          with open("toppers.csv", "w", encoding="utf-8", newline="") as f:
              writer = csv.DictWriter(f, fieldnames=["name", "marks"])
              writer.writeheader()
              writer.writerows(toppers)
          print("Saved", len(toppers), "rows")
        `,
        distractors: ["writer.writerow(toppers)", "with open(\"toppers.csv\", encoding=\"utf-8\") as f:"],
        indent: "choose",
        tests: [
          { output: "Saved 2 rows" },
          { py: py`assert file_text("toppers.csv") == "name,marks\nAsha,92\nRavi,88\n", "«toppers.csv» should have the header line first, then one line for each topper."` },
        ],
        hints: [
          md`If you see an error about «writer», the line that makes the writer comes after a line that uses it.`,
          md`If the file has no «name,marks» line, the header is not written before the rows.`,
          md`If you see «not writable», the file is opened without the «"w"» mode.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the blank mark",
        task: md`
          The program copies the good rows of «marks.csv» into «clean.csv» and counts the bad ones. It should print «Kept: 2 Skipped: 1». Instead it stops with:

          | ValueError: invalid literal for int() with base 10: ''

          Fix the one wrong line.
        `,
        files: { "marks.csv": "name,marks\nAsha,72\nRavi,\nMeena,80\n" },
        starter: py`
          import csv
          good = []
          skipped = 0
          with open("marks.csv", encoding="utf-8") as f:
              for row in csv.DictReader(f):
                  try:
                      row["marks"] = int(row["marks"])
                      good.append(row)
                  except TypeError:
                      skipped += 1
          with open("clean.csv", "w", encoding="utf-8", newline="") as f:
              writer = csv.DictWriter(f, fieldnames=["name", "marks"])
              writer.writeheader()
              writer.writerows(good)
          print("Kept:", len(good), "Skipped:", skipped)
        `,
        bugLines: [9],
        solution: py`
          import csv
          good = []
          skipped = 0
          with open("marks.csv", encoding="utf-8") as f:
              for row in csv.DictReader(f):
                  try:
                      row["marks"] = int(row["marks"])
                      good.append(row)
                  except ValueError:
                      skipped += 1
          with open("clean.csv", "w", encoding="utf-8", newline="") as f:
              writer = csv.DictWriter(f, fieldnames=["name", "marks"])
              writer.writeheader()
              writer.writerows(good)
          print("Kept:", len(good), "Skipped:", skipped)
        `,
        tests: [
          { output: "Kept: 2 Skipped: 1" },
          { py: py`assert file_text("clean.csv") == "name,marks\nAsha,72\nMeena,80\n", "«clean.csv» should hold the header and only the rows with a whole-number mark."` },
          { files: { "marks.csv": "name,marks\nImran,0\nZoya,100\n" }, output: "Kept: 2 Skipped: 0" },
          { files: { "marks.csv": "name,marks\nKiran,\nDev,absent\n" }, output: "Kept: 0 Skipped: 2" },
          { files: { "marks.csv": "name,marks\nKiran,\nDev,absent\n" }, py: py`assert file_text("clean.csv") == "name,marks\n", "When every row is bad, «clean.csv» should hold only the header line."` },
        ],
        wrong: [py`
          import csv
          good = []
          skipped = 0
          with open("marks.csv", encoding="utf-8") as f:
              for row in csv.DictReader(f):
                  good.append(row)
                  try:
                      row["marks"] = int(row["marks"])
                  except ValueError:
                      skipped += 1
          with open("clean.csv", "w", encoding="utf-8", newline="") as f:
              writer = csv.DictWriter(f, fieldnames=["name", "marks"])
              writer.writeheader()
              writer.writerows(good)
          print("Kept:", len(good), "Skipped:", skipped)
        `],
        hints: [
          md`The crash comes on Ravi's row, where the mark is blank. Python names the error in the last line: ValueError.`,
          md`The program does have a «try» block, but its «except» waits for a different error.`,
          md`If the program now runs but «Kept» counts Ravi, the bad row is added to the list before the conversion.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: topper and city averages",
        task: md`
          This program reads a clean file and prints every row. Change it so it prints the topper, then the average mark of each city, A to Z, to 1 decimal place:

          | Topper: Meena 91
          | Agra: 85.5
          | Delhi: 72.0
        `,
        files: { "clean.csv": "name,city,marks\nAsha,Delhi,72\nMeena,Agra,91\nRavi,Agra,80\n" },
        starter: py`
          import csv
          rows = []
          with open("clean.csv", encoding="utf-8") as f:
              for row in csv.DictReader(f):
                  row["marks"] = int(row["marks"])
                  rows.append(row)
          for row in rows:
              print(row["name"], row["city"], row["marks"])
        `,
        solution: py`
          import csv
          rows = []
          with open("clean.csv", encoding="utf-8") as f:
              for row in csv.DictReader(f):
                  row["marks"] = int(row["marks"])
                  rows.append(row)
          best = max(rows, key=lambda r: r["marks"])
          print("Topper:", best["name"], best["marks"])
          groups = {}
          for row in rows:
              if row["city"] not in groups:
                  groups[row["city"]] = []
              groups[row["city"]].append(row["marks"])
          for city in sorted(groups):
              marks = groups[city]
              print(f"{city}: {sum(marks) / len(marks):.1f}")
        `,
        tests: [
          { output: "Topper: Meena 91\nAgra: 85.5\nDelhi: 72.0" },
          { files: { "clean.csv": "name,city,marks\nZoya,Pune,60\n" }, output: "Topper: Zoya 60\nPune: 60.0" },
          { files: { "clean.csv": "name,city,marks\nDev,Goa,9\nImran,Goa,100\nKiran,Bhopal,8\nAsha,Goa,10\n" }, output: "Topper: Imran 100\nBhopal: 8.0\nGoa: 39.7" },
        ],
        wrong: [py`
          import csv
          rows = []
          with open("clean.csv", encoding="utf-8") as f:
              for row in csv.DictReader(f):
                  row["marks"] = int(row["marks"])
                  rows.append(row)
          best = max(rows, key=lambda r: r["name"])
          print("Topper:", best["name"], best["marks"])
          groups = {}
          for row in rows:
              if row["city"] not in groups:
                  groups[row["city"]] = []
              groups[row["city"]].append(row["marks"])
          for city in sorted(groups):
              marks = groups[city]
              print(f"{city}: {sum(marks) / len(marks):.1f}")
        `],
        hints: [
          md`If the topper is the student whose name comes last in A to Z, your rule compares names, not marks.`,
          md`If a city appears more than once, you print inside the loop over rows. Group the marks first, then print once per city.`,
          md`If a city with one student fails, check that its list is made the first time the city is seen.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: clean the messy file",
        task: md`
          «students.csv» has the columns name, city and marks. Some marks are blank or not a whole number. Use «DictReader» and «DictWriter». Write the good rows, with the marks as numbers, to «clean.csv» with a header and the same three columns. Open it with «newline=""». Then print how many rows were kept and skipped. For the file given it shows:

          | Kept: 3
          | Skipped: 2
        `,
        files: { "students.csv": 'name,city,marks\nAsha,"Delhi, India",72\nRavi,Pune,\nMeena,Agra,80\nImran,Goa,abc\nZoya,Surat,0\n' },
        starter: py`

        `,
        solution: py`
          import csv
          good = []
          skipped = 0
          with open("students.csv", encoding="utf-8") as f:
              for row in csv.DictReader(f):
                  try:
                      row["marks"] = int(row["marks"])
                  except ValueError:
                      skipped += 1
                      continue
                  good.append(row)
          with open("clean.csv", "w", encoding="utf-8", newline="") as f:
              writer = csv.DictWriter(f, fieldnames=["name", "city", "marks"])
              writer.writeheader()
              writer.writerows(good)
          print("Kept:", len(good))
          print("Skipped:", skipped)
        `,
        tests: [
          { output: "Kept: 3\nSkipped: 2" },
          { py: py`assert file_text("clean.csv") == 'name,city,marks\nAsha,"Delhi, India",72\nMeena,Agra,80\nZoya,Surat,0\n', "«clean.csv» should hold the header, then Asha, Meena and Zoya. Check the bad rows are left out."` },
          { files: { "students.csv": "name,city,marks\nDev,Goa,55\nKiran,Bhopal,61\n" }, output: "Kept: 2\nSkipped: 0" },
          { files: { "students.csv": "name,city,marks\nDev,Goa,55\nKiran,Bhopal,61\n" }, py: py`assert file_text("clean.csv") == "name,city,marks\nDev,Goa,55\nKiran,Bhopal,61\n", "When every row is good, «clean.csv» should hold every row."` },
          { files: { "students.csv": "name,city,marks\nDev,Goa,72.5\nKiran,Bhopal,\n" }, output: "Kept: 0\nSkipped: 2" },
          { files: { "students.csv": "name,city,marks\nDev,Goa,72.5\nKiran,Bhopal,\n" }, py: py`assert file_text("clean.csv") == "name,city,marks\n", "When every row is bad, «clean.csv» should hold only the header line."` },
          { uses: ["kw:newline"], msg: md`Open «clean.csv» for writing with «newline=""», so Windows adds no empty lines.` },
        ],
        wrong: [py`
          import csv
          good = []
          skipped = 0
          with open("students.csv", encoding="utf-8") as f:
              for row in csv.DictReader(f):
                  good.append(row)
                  try:
                      row["marks"] = int(row["marks"])
                  except ValueError:
                      skipped += 1
          with open("clean.csv", "w", encoding="utf-8", newline="") as f:
              writer = csv.DictWriter(f, fieldnames=["name", "city", "marks"])
              writer.writeheader()
              writer.writerows(good)
          print("Kept:", len(good))
          print("Skipped:", skipped)
        `, py`
          import csv
          good = []
          skipped = 0
          with open("students.csv", encoding="utf-8") as f:
              for row in csv.DictReader(f):
                  try:
                      row["marks"] = int(row["marks"])
                  except ValueError:
                      skipped += 1
                      continue
                  good.append(row)
          with open("clean.csv", "w", encoding="utf-8", newline="") as f:
              writer = csv.DictWriter(f, fieldnames=["name", "city", "marks"])
              writer.writerows(good)
          print("Kept:", len(good))
          print("Skipped:", skipped)
        `],
        hints: [
          md`If «Kept» counts every row, bad rows reach the list. A bad row must go to the next row before it is added.`,
          md`If «clean.csv» starts with Asha's row, the header line is missing from the new file.`,
          md`A mark like 72.5 may be kept, or may crash. Then check that only a whole number passes the conversion, and that you catch ValueError.`,
        ],
      },
    ],
    keys: [
      md`«csv.DictReader(f)» gives each row as a dictionary, so you write «row["marks"]», not «row[2]».`,
      md`«csv.DictWriter(f, fieldnames=[...])» writes dictionaries. Call «writeheader()», then «writerows(rows)».`,
      md`Open a CSV file for writing with «newline=""», or Windows adds empty lines.`,
      md`For a bad row: catch ValueError, add 1 to a count, and «continue». Always print how many rows you skipped.`,
    ],
  });

  // ---------------------------------------------------------------- Day 81
  day({
    slug: "json-save-and-load",
    title: "Saving Data with JSON",
    goal: "Save nested data to a file and load it back unchanged.",
    minutes: 40,
    kind: "lesson",
    needs: [36, 57, 58, 78],
    win: "Today you can now save a dictionary of lists to a file with JSON, and load it back on the next run.",
    learn: [
      md`
        ## JSON: data written as text

        **JSON** is a way to write lists and dictionaries as text, so a file can keep them. The «json» module has «json.dumps(data)», which turns data into JSON text, and «json.loads(text)», which turns the text back into data. Guess what prints.
      `,
      ex(py`
        import json
        data = {"chai": 12, "open": True, "note": None}
        text = json.dumps(data)
        print(text)
        print(type(text))
      `, { predict: ['{"chai": 12, "open": true, "note": null}\n<class \'str\'>',
                     "{'chai': 12, 'open': True, 'note': None}\n<class 'dict'>",
                     '{"chai": 12, "open": True, "note": None}\n<class \'str\'>'], answer: 0 }),
      md`
        JSON looks almost like Python. It always uses double quotes, «True» becomes «true», and «None» becomes «null». «json.loads» turns all of it back into Python values.
      `,
      md`
        ## Save to a file, load it back

        «json.dump(data, f)» writes data into an open file. «json.load(f)» reads it back. The first time, the file does not exist yet, so catch FileNotFoundError and start empty. Guess what the first run prints.
      `,
      ex(py`
        import json
        try:
            with open("log.json", encoding="utf-8") as f:
                log = json.load(f)
        except FileNotFoundError:
            log = {}
        if "Polity" not in log:
            log["Polity"] = []
        log["Polity"].append(30)
        with open("log.json", "w", encoding="utf-8") as f:
            json.dump(log, f)
        print(log)
      `, { predict: ["{'Polity': [30]}", "FileNotFoundError", "{'Polity': 30}"], answer: 0 }),
      md`
        On the first run there is no file, so «log» starts empty. On the next run the file is there, so «log» starts with «[30]» and becomes «[30, 30]». The list inside the dictionary comes back exactly as it was saved.
      `,
      ask({
        q: md`What is the difference between «json.dump» and «json.dumps»?`,
        options: ["«dump» writes into a file, «dumps» gives back text", "«dumps» writes into a file, «dump» gives back text", "They do the same thing"],
        answer: 0,
        explain: md`The «s» at the end means string. «dumps» and «loads» work with text; «dump» and «load» work with files.`,
        why: [null, md`It is the other way round. The «s» stands for string.`, md`One needs an open file; the other only gives back text.`],
      }),
      md`
        ## Number keys come back as text

        In JSON, every key of a dictionary is text. Guess what happens when the keys are numbers.
      `,
      ex(py`
        import json
        marks = {1: 72, 2: 65}
        back = json.loads(json.dumps(marks))
        print(back)
        print(back[1])
      `, { error: true, label: "A crash on purpose", predict: ["KeyError", "72", "TypeError"], answer: 0 }),
      md`
        «back» has the keys «'1'» and «'2'», as text. «back[1]» looks for the number 1, so Python gives KeyError. Use text keys from the start, or look up «back[str(day)]».
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          import json
          print(json.dumps([True, None, "chai"]))
        `, options: ['[true, null, "chai"]', "[True, None, 'chai']", '[True, None, "chai"]'], answer: 0,
        explain: md`JSON writes «true», «null» and double quotes.`,
        why: [null, md`That is how Python prints the list. «dumps» gives JSON text.`, md`JSON has no capital «True» and no «None».`],
        skill: "trace" },
      { q: md`What does this show?`, code: py`
          import json
          back = json.loads(json.dumps({5: 10}))
          print(back)
        `, options: ["{'5': 10}", "{5: 10}", "{'5': '10'}"], answer: 0,
        explain: md`JSON keys are always text, so the key 5 comes back as «'5'». Values keep their kind.`,
        why: [null, md`The key changed on the way through JSON.`, md`Only keys turn into text. The value 10 stays a number.`],
        skill: "trace" },
      { q: md`Which line writes «log» into the open file «f»?`,
        options: ["«json.dump(log, f)»", "«json.dumps(log)»", "«json.load(f)»"],
        answer: 0, verify: false, mono: false,
        explain: md`«dump» takes the data first, then the open file.`,
        why: [null, md`«dumps» only gives back text. Nothing goes into the file.`, md`«load» reads from a file. It does not write.`],
        skill: "memory" },
      { q: md`What does this program do?`, code: py`
          import json
          try:
              with open("visits.json", encoding="utf-8") as f:
                  visits = json.load(f)
          except FileNotFoundError:
              visits = 0
          visits += 1
          with open("visits.json", "w", encoding="utf-8") as f:
              json.dump(visits, f)
          print(visits)
        `, options: ["It counts how many times the program has been run", "It always prints 1", "It deletes visits.json"],
        answer: 0, verify: false, mono: false,
        explain: md`Each run loads the last count, adds 1 and saves it again.`,
        why: [null, md`Only the first run prints 1. Later runs load the saved number.`, md`The file is written again, not deleted.`],
        skill: "read" },
      { q: md`This program stops with an error the very first time it runs. Why?`, code: py`
          import json
          with open("log.json", encoding="utf-8") as f:
              log = json.load(f)
        `, options: ["«log.json» does not exist yet, so Python gives FileNotFoundError", '«json.load» needs the «"w"» mode', "A dictionary cannot be saved as JSON"],
        answer: 0, verify: false, mono: false,
        explain: md`Wrap the loading in «try» and start empty in «except FileNotFoundError».`,
        why: [null, md`Loading reads the file. «"w"» would empty it.`, md`Dictionaries and lists save well as JSON.`],
        skill: "debug" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: there and back",
        task: md`Answer each question without running the program.`,
        code: py`
          import json
          data = {"name": "Asha", "tests": [72, 80]}
          text = json.dumps(data)
          back = json.loads(text)
          same = back == data
          print(back["tests"][1], same)
        `,
        inputs: [],
        ask: [{ line: 3, name: "text" }, { line: 5, name: "same" }, { output: true }],
        hints: [
          md`If you wrote single quotes in «text», look again: JSON always uses double quotes.`,
          md`If you think «same» is False, check the keys: they were already text, so nothing changes.`,
          md`«back["tests"]» is the list «[72, 80]». Position 1 is the second item.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: the day plan",
        task: md`Answer each question without running the program.`,
        code: py`
          import json
          days = {1: "Polity", 2: "History"}
          text = json.dumps(days)
          back = json.loads(text)
          keys = sorted(back)
          first = back["1"]
          print(keys, first)
        `,
        inputs: [],
        ask: [{ line: 5, name: "keys" }, { line: 6, name: "first" }, { output: true }],
        hints: [
          md`If you wrote «[1, 2]» for «keys», you forgot what JSON does to number keys.`,
          md`After «loads», each key is text, so «keys» holds two pieces of text.`,
          md`«back["1"]» works because the key is now the text «"1"».`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: save the study log",
        task: md`
          Put the lines in order so the program saves «log» in «study.json», loads it back into «back», and prints:

          | [30, 45] True
        `,
        solution: py`
          import json
          log = {"Polity": [30, 45], "Maths": [60]}
          with open("study.json", "w", encoding="utf-8") as f:
              json.dump(log, f)
          with open("study.json", encoding="utf-8") as f:
              back = json.load(f)
          print(back["Polity"], back == log)
        `,
        distractors: ["json.dump(f, log)", "back = json.loads(f)"],
        indent: "choose",
        tests: [
          { output: "[30, 45] True" },
          { py: py`assert json.loads(file_text("study.json")) == {"Polity": [30, 45], "Maths": [60]}, "«study.json» should hold the whole log."` },
        ],
        hints: [
          md`If you see FileNotFoundError, the program loads the file before it saves it.`,
          md`If you see an error about the file being «not readable» or about «write», the open lines have their modes swapped.`,
          md`If you see an error inside «dump», the data and the file are given in the wrong order.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the number keys",
        task: md`
          The program saves a study plan, loads it back, and shows the subject for a day. For day 1 it should print «Study: Polity». Instead it stops with «KeyError: 1».

          Fix the one wrong line.
        `,
        starter: py`
          import json
          plan = {1: "Polity", 2: "History", 3: "Maths"}
          with open("plan.json", "w", encoding="utf-8") as f:
              json.dump(plan, f)
          with open("plan.json", encoding="utf-8") as f:
              plan = json.load(f)
          day = int(input("Day number: "))
          print("Study:", plan[day])
        `,
        bugLines: [7, 8],
        solution: py`
          import json
          plan = {1: "Polity", 2: "History", 3: "Maths"}
          with open("plan.json", "w", encoding="utf-8") as f:
              json.dump(plan, f)
          with open("plan.json", encoding="utf-8") as f:
              plan = json.load(f)
          day = int(input("Day number: "))
          print("Study:", plan[str(day)])
        `,
        tests: [
          { inputs: ["1"], output: "Study: Polity" },
          { inputs: ["3"], output: "Study: Maths" },
          { inputs: ["2"], output: "Study: History" },
        ],
        wrong: [py`
          import json
          plan = {1: "Polity", 2: "History", 3: "Maths"}
          with open("plan.json", "w", encoding="utf-8") as f:
              json.dump(plan, f)
          with open("plan.json", encoding="utf-8") as f:
              plan = json.load(f)
          day = int(input("Day number: "))
          print("Study:", plan.get(day))
        `],
        hints: [
          md`The plan works before it is saved. It fails only after it comes back from «plan.json».`,
          md`After loading, the keys are «"1"», «"2"» and «"3"», as text. The program looks one up with the number 1.`,
          md`If you now see «Study: None», the lookup still uses a number, so nothing is found.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: minutes per subject",
        task: md`
          «study.json» holds a list of minutes for each subject. This program prints the loaded log. Change it so it prints each subject, A to Z, with its total minutes and its number of sessions:

          | Maths: 60 minutes, 1 sessions
          | Polity: 75 minutes, 2 sessions
        `,
        files: { "study.json": '{"Polity": [30, 45], "Maths": [60]}' },
        starter: py`
          import json
          with open("study.json", encoding="utf-8") as f:
              log = json.load(f)
          print(log)
        `,
        solution: py`
          import json
          with open("study.json", encoding="utf-8") as f:
              log = json.load(f)
          for subject in sorted(log):
              sessions = log[subject]
              print(f"{subject}: {sum(sessions)} minutes, {len(sessions)} sessions")
        `,
        tests: [
          { output: "Maths: 60 minutes, 1 sessions\nPolity: 75 minutes, 2 sessions" },
          { files: { "study.json": '{"English": [20, 20, 20]}' }, output: "English: 60 minutes, 3 sessions" },
          { files: { "study.json": '{"Reasoning": [], "GK": [15]}' }, output: "GK: 15 minutes, 1 sessions\nReasoning: 0 minutes, 0 sessions" },
        ],
        wrong: [py`
          import json
          with open("study.json", encoding="utf-8") as f:
              log = json.load(f)
          for subject in log:
              sessions = log[subject]
              print(f"{subject}: {sum(sessions)} minutes, {len(sessions)} sessions")
        `],
        hints: [
          md`If «Polity» comes before «Maths», the subjects are in the order they were saved, not A to Z.`,
          md`If the minutes show as a list, you print the list instead of adding it up.`,
          md`If a subject with an empty list crashes, check that you add up the list and count it, not take its first item.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: the SSC study log",
        task: md`
          Ask for a subject, then the minutes studied. Load «study.json» if it exists; if not, start with an empty dictionary. Each subject keeps a list of minutes: add the new minutes to that subject's list. Save the log with «json.dump». Then load the file again, and print every subject A to Z with its total. The first run, with «Polity» and «30», shows:

          | Polity: 30 minutes

          Press Run a second time with «Maths» and «20». Your saved file is still there, so it shows both subjects.
        `,
        starter: py`

        `,
        solution: py`
          import json
          subject = input("Subject: ")
          minutes = int(input("Minutes: "))
          try:
              with open("study.json", encoding="utf-8") as f:
                  log = json.load(f)
          except FileNotFoundError:
              log = {}
          if subject not in log:
              log[subject] = []
          log[subject].append(minutes)
          with open("study.json", "w", encoding="utf-8") as f:
              json.dump(log, f)
          with open("study.json", encoding="utf-8") as f:
              saved = json.load(f)
          for name in sorted(saved):
              print(name + ":", sum(saved[name]), "minutes")
        `,
        tests: [
          { inputs: ["Polity", "30"], output: "Polity: 30 minutes" },
          { inputs: ["Polity", "30"], py: py`assert json.loads(file_text("study.json")) == {"Polity": [30]}, "«study.json» should hold {'Polity': [30]}: each subject keeps a list of minutes."` },
          { inputs: ["Maths", "25"], files: { "study.json": '{"Maths": [20]}' }, output: "Maths: 45 minutes" },
          { inputs: ["Maths", "25"], files: { "study.json": '{"Maths": [20]}' }, py: py`assert json.loads(file_text("study.json")) == {"Maths": [20, 25]}, "The new minutes should join the old list for Maths, not replace it."` },
          { inputs: ["English", "40"], files: { "study.json": '{"Polity": [30], "Maths": [60, 15]}' }, output: "English: 40 minutes\nMaths: 75 minutes\nPolity: 30 minutes" },
          { inputs: ["GK", "0"], output: "GK: 0 minutes" },
        ],
        wrong: [py`
          import json
          subject = input("Subject: ")
          minutes = int(input("Minutes: "))
          with open("study.json", encoding="utf-8") as f:
              log = json.load(f)
          if subject not in log:
              log[subject] = []
          log[subject].append(minutes)
          with open("study.json", "w", encoding="utf-8") as f:
              json.dump(log, f)
          for name in sorted(log):
              print(name + ":", sum(log[name]), "minutes")
        `, py`
          import json
          subject = input("Subject: ")
          minutes = int(input("Minutes: "))
          try:
              with open("study.json", encoding="utf-8") as f:
                  log = json.load(f)
          except FileNotFoundError:
              log = {}
          log[subject] = [minutes]
          with open("study.json", "w", encoding="utf-8") as f:
              json.dump(log, f)
          for name in sorted(log):
              print(name + ":", sum(log[name]), "minutes")
        `, py`
          import json
          subject = input("Subject: ")
          minutes = int(input("Minutes: "))
          try:
              with open("study.json", encoding="utf-8") as f:
                  log = json.load(f)
          except FileNotFoundError:
              log = {}
          if subject not in log:
              log[subject] = []
          log[subject].append(minutes)
          for name in sorted(log):
              print(name + ":", sum(log[name]), "minutes")
        `],
        hints: [
          md`If the first run stops with FileNotFoundError, there is no saved file yet. Loading must be inside «try», with an empty log in «except».`,
          md`If Maths shows 25 instead of 45, the new minutes replace the old list instead of joining it.`,
          md`If the output is right but the file check fails, the log is never saved with «json.dump».`,
        ],
      },
    ],
    keys: [
      md`**JSON** writes lists and dictionaries as text. «true», «null» and double quotes are JSON's way.`,
      md`«json.dumps(data)» and «json.loads(text)» work with text. «json.dump(data, f)» and «json.load(f)» work with files.`,
      md`On the first run there is no file: load inside «try» and start empty in «except FileNotFoundError».`,
      md`JSON keys are always text. After loading, look up «d[str(n)]», or use text keys from the start.`,
    ],
  });

  // ---------------------------------------------------------------- Day 82
  day({
    slug: "dates-and-days",
    title: "Dates and the Exam Countdown",
    goal: "Count days between dates and print dates the Indian way.",
    minutes: 45,
    kind: "lesson",
    needs: [36, 37, 67],
    win: "Today you can now count the days to an exam, read and print dates as 14-03-2027, and work out an age on a cut-off date.",
    learn: [
      md`
        ## A date, and the days between dates

        The «datetime» module has a **date** type. «date(2027, 3, 14)» makes the date 14 March 2027: year first, then month, then day. Guess what prints.
      `,
      ex(py`
        from datetime import date
        exam = date(2027, 3, 14)
        start = date(2027, 1, 1)
        gap = exam - start
        print(exam)
        print(gap.days)
      `, { predict: ["2027-03-14\n72", "14-03-2027\n72", "2027-03-14\n73"], answer: 0 }),
      md`
        Python prints a date as year-month-day. Subtracting two dates gives a **timedelta**: a length of time. Its «.days» part is the number of days. January has 31 days, February 28, then 13 more: 72.
      `,
      ask({
        q: md`What is «(date(2027, 1, 1) - date(2027, 3, 14)).days»?`,
        options: ["-72", "72", "An error"],
        answer: 0,
        explain: md`The earlier date comes first, so the gap is negative.`,
        why: [null, md`The order matters. Later minus earlier is positive; this is earlier minus later.`, md`Any two dates can be subtracted.`],
      }),
      md`
        ## Reading and writing dates the Indian way

        In India we write «14-03-2027». «datetime.strptime(text, "%d-%m-%Y")» reads such text: «%d» is the day, «%m» the month and «%Y» the four-digit year. It gives a **datetime**, a date with a time. Guess what happens next.
      `,
      ex(py`
        from datetime import date, datetime
        exam = datetime.strptime("14-03-2027", "%d-%m-%Y")
        start = date(2027, 1, 1)
        print((exam - start).days)
      `, { error: true, label: "A crash on purpose", predict: ["TypeError", "72", "ValueError"], answer: 0 }),
      md`
        A datetime and a date cannot be subtracted, so Python gives TypeError. Add «.date()» on the end, and both are dates. «.strftime("%d-%m-%Y")» goes the other way: it turns a date into text.
      `,
      ex(py`
        from datetime import date, datetime
        exam = datetime.strptime("14-03-2027", "%d-%m-%Y").date()
        start = date(2027, 1, 1)
        print((exam - start).days, "days to go")
        print("Exam on", exam.strftime("%d-%m-%Y"))
      `, { predict: ["72 days to go\nExam on 14-03-2027", "72 days to go\nExam on 2027-03-14", "72 days, 0:00:00 days to go\nExam on 14-03-2027"], answer: 0 }),
      pause(md`A good place for a break. One more idea is left: age on a cut-off date.`),
      md`
        ## Age on a cut-off date

        SSC checks your age on a fixed cut-off date. Take away the years, then take away 1 more if the birthday has not come yet that year. Tuples compare left to right, so «(month, day)» pairs put two days of a year in order. Guess what prints.
      `,
      ex(py`
        from datetime import date

        def age_on(born, cutoff):
            age = cutoff.year - born.year
            if (cutoff.month, cutoff.day) < (born.month, born.day):
                age -= 1
            return age

        print(age_on(date(2002, 8, 15), date(2027, 8, 1)))
        print(age_on(date(2002, 8, 15), date(2027, 8, 14)))
        print(age_on(date(2002, 8, 15), date(2027, 8, 15)))
      `, { predict: ["24\n24\n25", "25\n25\n25", "24\n25\n25"], answer: 0 }),
      tip(md`Our functions always take the dates as parameters. They never ask the computer for today's date, so the answers stay the same every day.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          from datetime import date
          print((date(2027, 1, 10) - date(2027, 1, 1)).days)
        `, options: ["9", "10", "9 days, 0:00:00"], answer: 0,
        explain: md`From the 1st to the 10th is 9 days.`,
        why: [null, md`Count the steps, not the dates: 1 to 10 is 9 steps.`, md`That is what the timedelta itself looks like. «.days» gives only the number.`],
        skill: "trace" },
      { q: md`What does this show?`, code: py`
          from datetime import date
          print(date(2027, 3, 5).strftime("%d-%m-%Y"))
        `, options: ["05-03-2027", "5-3-2027", "2027-03-05"], answer: 0,
        explain: md`«%d» and «%m» always give two digits, with a 0 in front when needed.`,
        why: [null, md`«%d» and «%m» add a 0 in front of a single digit.`, md`That is how «print(d)» shows a date. The format puts the day first.`],
        skill: "trace" },
      { q: md`A program stops with «TypeError: unsupported operand type(s) for -: 'datetime.datetime' and 'datetime.date'». What is missing?`,
        options: ["«.date()» after «strptime(...)»", "«.days» after the subtraction", "«int()» around the date"],
        answer: 0, verify: false, mono: false,
        explain: md`«strptime» gives a datetime. «.date()» turns it into a date, so the two can be subtracted.`,
        why: [null, md`The subtraction fails before «.days» is reached.`, md`A date cannot be turned into a whole number with «int()».`],
        skill: "debug" },
      { q: md`What does this program do?`, code: py`
          from datetime import datetime

          def weeks_left(start_text, exam_text):
              start = datetime.strptime(start_text, "%d-%m-%Y").date()
              exam = datetime.strptime(exam_text, "%d-%m-%Y").date()
              return (exam - start).days // 7
        `, options: ["It gives the number of full weeks between two dates written like 14-03-2027", "It gives the number of days between two dates", "It prints today's date"],
        answer: 0, verify: false, mono: false,
        explain: md`It reads both dates, counts the days between them and divides by 7, dropping the part after the point.`,
        why: [null, md`The «// 7» turns days into full weeks.`, md`It never asks for today's date and prints nothing.`],
        skill: "read" },
      { q: md`In «date(2027, 3, 14)», which number is the month?`,
        options: ["3", "14", "2027"], answer: 0, verify: false,
        explain: md`«date» takes the year, then the month, then the day.`,
        why: [null, md`14 is the day. It comes last.`, md`2027 is the year. It comes first.`],
        skill: "memory" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: across February",
        task: md`Answer each question without running the program. 2027 is not a leap year.`,
        code: py`
          from datetime import date
          a = date(2027, 2, 20)
          b = date(2027, 3, 2)
          gap = b - a
          n = gap.days
          back = (a - b).days
          print(n, back)
        `,
        inputs: [],
        ask: [{ line: 5, name: "n" }, { line: 6, name: "back" }, { output: true }],
        hints: [
          md`If you counted 12, you gave February 30 days. In 2027, February has 28.`,
          md`From 20 February to 28 February is 8 days. Then count to 2 March.`,
          md`«back» subtracts the other way round, so it is the same number with a minus sign.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: reading a date",
        task: md`Answer each question without running the program.`,
        code: py`
          from datetime import datetime
          text = "05-09-2027"
          d = datetime.strptime(text, "%d-%m-%Y").date()
          month = d.month
          year_text = d.strftime("%Y")
          nice = d.strftime("%d/%m/%Y")
          print(month, year_text, nice)
        `,
        inputs: [],
        ask: [{ line: 4, name: "month" }, { line: 5, name: "year_text" }, { output: true }],
        hints: [
          md`If you wrote 5 for «month», you read the day. The format says the day comes first.`,
          md`«strftime» always gives text, so «year_text» is text, not a number.`,
          md`The last format uses «/» between the parts, and keeps the 0 in front of 5 and 9.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: days to the exam",
        task: md`
          Put the lines in order. «days_left» takes two dates written like «14-03-2027» and gives back the number of days from the first to the second. The program prints:

          | 72 days to go
        `,
        solution: py`
          from datetime import datetime
          def days_left(start_text, exam_text):
              start = datetime.strptime(start_text, "%d-%m-%Y").date()
              exam = datetime.strptime(exam_text, "%d-%m-%Y").date()
              return (exam - start).days
          print(days_left("01-01-2027", "14-03-2027"), "days to go")
        `,
        distractors: ["return exam - start", "start = datetime.strptime(start_text, \"%Y-%m-%d\").date()"],
        indent: "choose",
        tests: [
          { output: "72 days to go" },
          { py: py`expect("days_left", ("14-03-2027", "14-03-2027"), 0)` },
          { py: py`expect("days_left", ("28-02-2028", "01-03-2028"), 2)` },
          { py: py`expect("days_left", ("31-12-2026", "01-01-2027"), 1)` },
        ],
        hints: [
          md`If you see «72 days, 0:00:00», the function gives back the timedelta, not its number of days.`,
          md`If you see «time data '01-01-2027' does not match format», the format has the year first.`,
          md`If 28-02-2028 to 01-03-2028 gives the wrong number, check that the later date comes first in the subtraction. 2028 is a leap year, so the answer is 2.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: datetime minus date",
        task: md`
          «days_to_exam» should give back the days from a start date to the exam. The program should print «72». Instead it stops with:

          | TypeError: unsupported operand type(s) for -: 'datetime.datetime' and 'datetime.date'

          Fix the one wrong line.
        `,
        starter: py`
          from datetime import date, datetime

          def days_to_exam(start, exam_text):
              exam = datetime.strptime(exam_text, "%d-%m-%Y")
              return (exam - start).days

          print(days_to_exam(date(2027, 1, 1), "14-03-2027"))
        `,
        bugLines: [4],
        solution: py`
          from datetime import date, datetime

          def days_to_exam(start, exam_text):
              exam = datetime.strptime(exam_text, "%d-%m-%Y").date()
              return (exam - start).days

          print(days_to_exam(date(2027, 1, 1), "14-03-2027"))
        `,
        tests: [
          { output: "72" },
          { py: py`expect("days_to_exam", (date(2027, 6, 1), "01-06-2027"), 0)` },
          { py: py`expect("days_to_exam", (date(2026, 12, 25), "05-01-2027"), 11)` },
          { py: py`expect("days_to_exam", (date(2027, 9, 10), "09-09-2027"), -1)` },
        ],
        wrong: [py`
          from datetime import date, datetime

          def days_to_exam(start, exam_text):
              exam = datetime.strptime(exam_text, "%m-%d-%Y").date()
              return (exam - start).days

          print(days_to_exam(date(2027, 1, 1), "14-03-2027"))
        `, py`
          from datetime import date, datetime

          def days_to_exam(start, exam_text):
              exam = datetime.strptime(exam_text, "%d-%m-%Y").date()
              return (exam - start).days + 1

          print(days_to_exam(date(2027, 1, 1), "14-03-2027"))
        `],
        hints: [
          md`The error names two kinds: a datetime and a date. «start» is a date. Which line makes the other one?`,
          md`Line 4 reads the text into a datetime, a date with a time, and keeps it that way.`,
          md`If you now see «time data '14-03-2027' does not match format», the day and month codes are swapped.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: weeks as well",
        task: md`
          This program prints the days to the exam. Change the last line so it also shows the exam date the Indian way, and the full weeks:

          | Exam on 14-03-2027: 72 days (10 weeks)
        `,
        starter: py`
          from datetime import datetime
          start = datetime.strptime(input("Start: "), "%d-%m-%Y").date()
          exam = datetime.strptime(input("Exam: "), "%d-%m-%Y").date()
          days = (exam - start).days
          print(days)
        `,
        solution: py`
          from datetime import datetime
          start = datetime.strptime(input("Start: "), "%d-%m-%Y").date()
          exam = datetime.strptime(input("Exam: "), "%d-%m-%Y").date()
          days = (exam - start).days
          print(f"Exam on {exam.strftime('%d-%m-%Y')}: {days} days ({days // 7} weeks)")
        `,
        tests: [
          { inputs: ["01-01-2027", "14-03-2027"], output: "Exam on 14-03-2027: 72 days (10 weeks)" },
          { inputs: ["05-05-2027", "05-05-2027"], output: "Exam on 05-05-2027: 0 days (0 weeks)" },
          { inputs: ["01-02-2028", "01-03-2028"], output: "Exam on 01-03-2028: 29 days (4 weeks)" },
          { inputs: ["10-06-2027", "17-06-2027"], output: "Exam on 17-06-2027: 7 days (1 weeks)" },
        ],
        wrong: [py`
          from datetime import datetime
          start = datetime.strptime(input("Start: "), "%d-%m-%Y").date()
          exam = datetime.strptime(input("Exam: "), "%d-%m-%Y").date()
          days = (exam - start).days
          print(f"Exam on {exam}: {days} days ({days // 7} weeks)")
        `],
        hints: [
          md`If the date shows as «2027-03-14», you printed the date itself. It needs the day-month-year format.`,
          md`If the weeks show a point, like 10.28, you used «/» instead of the division that drops the rest.`,
          md`If the 7-day test shows 0 weeks, check the division: 7 days is 1 full week.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: age on the cut-off date",
        task: md`
          Write a function «age_on(born_text, cutoff_text)». Both dates are text like «15-08-2002». It gives back the age in whole years on the cut-off date. Use a tuple comparison of month and day. Then the program prints one example:

          | Age on 01-08-2027: 24

          for someone born on «15-08-2002». A person whose birthday falls on the cut-off date has already had it.
        `,
        starter: py`

        `,
        solution: py`
          from datetime import datetime

          def age_on(born_text, cutoff_text):
              born = datetime.strptime(born_text, "%d-%m-%Y").date()
              cutoff = datetime.strptime(cutoff_text, "%d-%m-%Y").date()
              age = cutoff.year - born.year
              if (cutoff.month, cutoff.day) < (born.month, born.day):
                  age -= 1
              return age

          print("Age on 01-08-2027:", age_on("15-08-2002", "01-08-2027"))
        `,
        tests: [
          { output: "Age on 01-08-2027: 24" },
          { py: py`expect("age_on", ("15-08-2002", "15-08-2027"), 25)` },
          { py: py`expect("age_on", ("15-08-2002", "14-08-2027"), 24)` },
          { py: py`expect("age_on", ("20-01-2000", "05-12-2027"), 27)` },
          { py: py`expect("age_on", ("29-02-2004", "28-02-2027"), 22)` },
          { py: py`expect("age_on", ("29-02-2004", "01-03-2027"), 23)` },
          { py: py`expect("age_on", ("01-01-2027", "01-01-2027"), 0)` },
        ],
        wrong: [py`
          from datetime import datetime

          def age_on(born_text, cutoff_text):
              born = datetime.strptime(born_text, "%d-%m-%Y").date()
              cutoff = datetime.strptime(cutoff_text, "%d-%m-%Y").date()
              return (cutoff - born).days // 365

          print("Age on 01-08-2027:", age_on("15-08-2002", "01-08-2027"))
        `, py`
          from datetime import datetime

          def age_on(born_text, cutoff_text):
              born = datetime.strptime(born_text, "%d-%m-%Y").date()
              cutoff = datetime.strptime(cutoff_text, "%d-%m-%Y").date()
              age = cutoff.year - born.year
              if cutoff.month < born.month:
                  age -= 1
              return age

          print("Age on 01-08-2027:", age_on("15-08-2002", "01-08-2027"))
        `, py`
          from datetime import datetime

          def age_on(born_text, cutoff_text):
              born = datetime.strptime(born_text, "%d-%m-%Y").date()
              cutoff = datetime.strptime(cutoff_text, "%d-%m-%Y").date()
              age = cutoff.year - born.year
              if (cutoff.month, cutoff.day) <= (born.month, born.day):
                  age -= 1
              return age

          print("Age on 01-08-2027:", age_on("15-08-2002", "01-08-2027"))
        `],
        hints: [
          md`If the example prints 25, your program does not take away 1 when the birthday is still to come.`,
          md`If 15-08-2002 on 15-08-2027 gives 24, a birthday on the cut-off day is being treated as not yet come.`,
          md`An answer may be one year off near a birthday. Then compare the month and the day together, not only the month. Do not divide days by 365.`,
        ],
      },
    ],
    keys: [
      md`«date(2027, 3, 14)» makes a date: year, month, day.`,
      md`Subtracting two dates gives a timedelta. Use «.days» for the number of days.`,
      md`«datetime.strptime(text, "%d-%m-%Y").date()» reads «14-03-2027». Without «.date()», subtracting a date gives TypeError.`,
      md`«d.strftime("%d-%m-%Y")» turns a date into Indian-style text.`,
      md`Age on a cut-off: years apart, minus 1 if «(month, day)» of the cut-off is before the birthday.`,
    ],
  });

  // ---------------------------------------------------------------- Day 83
  day({
    slug: "count-like-an-analyst",
    title: "Counter and statistics",
    goal: "Count and summarise data with Counter and the statistics module.",
    minutes: 40,
    kind: "lesson",
    needs: [30, 37],
    win: "Today you can now count items with Counter, find the most common ones, and work out a mean and a median.",
    learn: [
      md`
        ## Counter does the counting loop for you

        You already count with a dictionary and a loop. **Counter**, from the «collections» module, does the same in one step: give it a list, and it counts each item. Guess what prints.
      `,
      ex(py`
        from collections import Counter
        topics = ["Polity", "History", "Polity", "Maths", "Polity", "Maths"]
        counts = {}
        for t in topics:
            counts[t] = counts.get(t, 0) + 1
        print(counts["Polity"])
        c = Counter(topics)
        print(c["Polity"], c["Science"])
      `, { predict: ["3\n3 0", "3\n3 None", "3\n1 0"], answer: 0 }),
      md`
        A Counter works like a dictionary of counts. An item it never saw gives 0, not KeyError. «c.most_common(n)» gives the n biggest counts as (item, count) tuples, biggest first.
      `,
      ex(py`
        from collections import Counter
        topics = "Polity History Polity Maths Polity Maths Science".split()
        c = Counter(topics)
        print(c.most_common(2))
        top, times = c.most_common(1)[0]
        print(top, times)
      `, { predict: ["[('Polity', 3), ('Maths', 2)]\nPolity 3", "['Polity', 'Maths']\nPolity 3", "[('Polity', 3), ('Maths', 2)]\n('Polity', 3)"], answer: 0 }),
      md`
        «most_common(1)» is a list with one tuple in it. «[0]» takes that tuple, and the line unpacks it into «top» and «times». When two counts are equal, the item seen first comes first.
      `,
      md`
        ## Mean and median

        «import statistics as st» imports the module under a short name, «st». Most real code uses this form. «st.mean(x)» is the average, like «sum(x) / len(x)». «st.median(x)» is the middle value after sorting. Guess what prints.
      `,
      ex(py`
        import statistics as st
        marks = [35, 40, 45, 50, 100]
        print(sum(marks) / len(marks), st.mean(marks))
        print(st.median(marks))
      `, { predict: ["54.0 54\n45", "54.0 54\n50", "54.0 54\n54"], answer: 0 }),
      md`
        The one big mark, 100, pulls the mean up to 54. The median stays at 45, the middle of the sorted list. With an even number of items, the median is halfway between the two middle ones.
      `,
      md`
        ## When your own loop is clearer

        A tool is best when it fits the job exactly. «st.mean» of an empty list has no answer. Guess what happens.
      `,
      ex(py`
        import statistics as st
        print(st.mean([]))
      `, { error: true, label: "A crash on purpose", predict: ["StatisticsError", "0", "ZeroDivisionError"], answer: 0 }),
      md`
        Check that a list is not empty before you call «st.mean». And when a rule decides what to count, such as «pass or fail», a plain loop with «if» often says it more clearly than Counter.
      `,
      ask({
        q: md`You want to count students with 50 or more marks, and students with less, in one go. What is clearest?`,
        options: ["One loop with «if» and two counters", "«Counter(marks)»", "«st.median(marks)»"],
        answer: 0,
        explain: md`The rule «50 or more» is easy to read inside an «if». Counter counts equal items, not a rule.`,
        why: [null, md`«Counter(marks)» counts each different mark, not passes and fails.`, md`The median is the middle mark. It does not count anything.`],
      }),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          from collections import Counter
          c = Counter("chai chai samosa".split())
          print(c["chai"], c["vada"])
        `, options: ["2 0", "2 KeyError", "1 0"], answer: 0,
        explain: md`«chai» appears twice. «vada» never appears, and a Counter gives 0 for it.`,
        why: [null, md`A normal dictionary would give KeyError. A Counter gives 0.`, md`The list holds «chai» twice.`],
        skill: "trace" },
      { q: md`What does this show?`, code: py`
          import statistics as st
          print(st.median([5, 1, 9]))
        `, options: ["5", "1", "9"], answer: 0,
        explain: md`Sorted, the list is 1, 5, 9. The middle one is 5.`,
        why: [null, md`1 is the middle item before sorting. The median sorts first.`, md`9 is the biggest, not the middle.`],
        skill: "trace" },
      { q: md`What happens?`, code: py`
          import statistics as st
          scores = []
          print(st.mean(scores))
        `, options: ["StatisticsError", "0", "None"], answer: 0, error: true,
        explain: md`An empty list has no mean, so Python stops with StatisticsError. Check «if scores:» first.`,
        why: [null, md`There is no number to give back, so Python does not give 0.`, md`«st.mean» stops with an error. It does not give back None.`],
        skill: "debug" },
      { q: md`What does this program do?`, code: py`
          from collections import Counter
          cities = input("Cities: ").split()
          city, times = Counter(cities).most_common(1)[0]
          print(city, times)
        `, options: ["It prints the city typed most often, and how many times", "It prints every city and its count", "It prints how many different cities were typed"],
        answer: 0, verify: false, mono: false,
        explain: md`«most_common(1)[0]» is the one (city, count) tuple with the biggest count.`,
        why: [null, md`Only the first tuple is used, so only one city is printed.`, md`That would be «len(Counter(cities))».`],
        skill: "read" },
      { q: md`You need to know how many times each word appears in a long answer. Which tool fits best?`,
        options: ["«Counter»", "«st.median»", "«set»"], answer: 0, verify: false, mono: false,
        explain: md`Counter counts each different item in one step.`,
        why: [null, md`The median is a middle number, not a count of words.`, md`A set drops the repeats, so the counts are lost.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: question topics",
        task: md`Answer each question without running the program.`,
        code: py`
          from collections import Counter
          topics = "GK Maths GK English GK Maths".split()
          c = Counter(topics)
          gk = c["GK"]
          missing = c["Hindi"]
          top = c.most_common(1)[0][0]
          print(gk, missing, top)
        `,
        inputs: [],
        ask: [{ line: 4, name: "gk" }, { line: 5, name: "missing" }, { output: true }],
        hints: [
          md`If you wrote KeyError for «missing», remember that a Counter gives 0 for an item it never saw.`,
          md`Count «GK» in the list: it appears at the start, in the middle and near the end.`,
          md`«most_common(1)[0]» is a tuple, and the second «[0]» takes its first part, the topic.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: a batter's runs",
        task: md`Answer each question without running the program.`,
        code: py`
          import statistics as st
          runs = [12, 0, 45, 7, 101]
          avg = st.mean(runs)
          mid = st.median(runs)
          gap = avg - mid
          print(avg, mid, gap)
        `,
        inputs: [],
        ask: [{ line: 3, name: "avg" }, { line: 4, name: "mid" }, { output: true }],
        hints: [
          md`If your mean is not a whole number, add the runs again: they make 165.`,
          md`If you wrote 45 for the median, you took the middle of the list as written. Sort it first.`,
          md`Sorted, the runs are 0, 7, 12, 45, 101. The middle one is the third.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: mean and median",
        task: md`
          Put the lines in order. The program reads marks on one line and prints their mean and median, using «st» as the short name. For «35 40 45 50 100» it shows:

          | Mean: 54
          | Median: 45
        `,
        solution: py`
          import statistics as st
          marks = [int(x) for x in input("Marks: ").split()]
          print("Mean:", st.mean(marks))
          print("Median:", st.median(marks))
        `,
        distractors: ["import statistics", "print(\"Median:\", marks.median())"],
        indent: "given",
        tests: [
          { inputs: ["35 40 45 50 100"], output: "Mean: 54\nMedian: 45" },
          { inputs: ["60 70 80"], output: "Mean: 70\nMedian: 70" },
          { inputs: ["10 20"], output: "Mean: 15\nMedian: 15.0" },
          { inputs: ["88"], output: "Mean: 88\nMedian: 88" },
        ],
        hints: [
          md`If you see «name 'st' is not defined», the import line does not give the short name.`,
          md`If you see «'list' object has no attribute 'median'», the median line calls it on the list instead of on the module.`,
          md`If you see «name 'marks' is not defined», the line that reads the marks comes too late.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: counting letters",
        task: md`
          The program should print the topic typed most often. For «Polity Maths Polity» it should print «Most asked: Polity 2». Instead it prints «Most asked: t 3».

          Fix the one wrong line.
        `,
        starter: py`
          from collections import Counter
          line = input("Topics: ")
          counts = Counter(line)
          top, times = counts.most_common(1)[0]
          print("Most asked:", top, times)
        `,
        bugLines: [3],
        solution: py`
          from collections import Counter
          line = input("Topics: ")
          counts = Counter(line.split())
          top, times = counts.most_common(1)[0]
          print("Most asked:", top, times)
        `,
        tests: [
          { inputs: ["Polity Maths Polity"], output: "Most asked: Polity 2" },
          { inputs: ["GK"], output: "Most asked: GK 1" },
          { inputs: ["Maths English English Maths English"], output: "Most asked: English 3" },
          { inputs: ["History Geography"], output: "Most asked: History 1" },
        ],
        wrong: [py`
          from collections import Counter
          line = input("Topics: ")
          counts = Counter(line.split(","))
          top, times = counts.most_common(1)[0]
          print("Most asked:", top, times)
        `],
        hints: [
          md`The output names the letter «t», not a topic. So the program counts single letters.`,
          md`A Counter counts the items of what you give it. Given one piece of text, its items are letters.`,
          md`If you now see the whole line as one topic, the text is cut at commas, but the topics are separated by spaces.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: repeated topics only",
        task: md`
          This program prints every topic and its count. Change it so it prints only the topics asked 2 or more times, most common first, then how many topics were asked once. For «Polity GK Polity Maths GK Polity Science» it shows:

          | Polity 3
          | GK 2
          | Asked once: 2
        `,
        starter: py`
          from collections import Counter
          topics = input("Topics: ").split()
          counts = Counter(topics)
          for topic, times in counts.most_common():
              print(topic, times)
        `,
        solution: py`
          from collections import Counter
          topics = input("Topics: ").split()
          counts = Counter(topics)
          once = 0
          for topic, times in counts.most_common():
              if times >= 2:
                  print(topic, times)
              else:
                  once += 1
          print("Asked once:", once)
        `,
        tests: [
          { inputs: ["Polity GK Polity Maths GK Polity Science"], output: "Polity 3\nGK 2\nAsked once: 2" },
          { inputs: ["Maths English"], output: "Asked once: 2" },
          { inputs: ["GK GK"], output: "GK 2\nAsked once: 0" },
          { inputs: ["Hindi Hindi Hindi Art"], output: "Hindi 3\nAsked once: 1" },
        ],
        wrong: [py`
          from collections import Counter
          topics = input("Topics: ").split()
          counts = Counter(topics)
          once = 0
          for topic, times in counts.most_common():
              if times > 2:
                  print(topic, times)
              else:
                  once += 1
          print("Asked once:", once)
        `],
        hints: [
          md`If «GK 2» is missing, your check leaves out topics asked exactly twice.`,
          md`If «Asked once» is always 0, the count of single topics never grows: it belongs in the «else» part.`,
          md`If «Asked once» prints many times, that print is inside the loop.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: the top three topics",
        task: md`
          Ask for question topics on one line, with spaces between them. Use «Counter» and «most_common». Print the three most common topics with a rank, then how many different topics there were. For «Polity Maths Polity GK Maths Polity History» it shows:

          | 1. Polity: 3
          | 2. Maths: 2
          | 3. GK: 1
          | Different topics: 4

          With fewer than three topics, print only those.
        `,
        starter: py`

        `,
        solution: py`
          from collections import Counter
          topics = input("Topics: ").split()
          counts = Counter(topics)
          rank = 1
          for topic, times in counts.most_common(3):
              print(f"{rank}. {topic}: {times}")
              rank += 1
          print("Different topics:", len(counts))
        `,
        tests: [
          { inputs: ["Polity Maths Polity GK Maths Polity History"], output: "1. Polity: 3\n2. Maths: 2\n3. GK: 1\nDifferent topics: 4" },
          { inputs: ["Reasoning"], output: "1. Reasoning: 1\nDifferent topics: 1" },
          { inputs: ["GK English GK English"], output: "1. GK: 2\n2. English: 2\nDifferent topics: 2" },
          { inputs: ["A B C D E A"], output: "1. A: 2\n2. B: 1\n3. C: 1\nDifferent topics: 5" },
          { uses: ["call:Counter"], msg: md`Count the topics with «Counter», the tool from today's lesson.` },
        ],
        wrong: [py`
          from collections import Counter
          topics = input("Topics: ").split()
          counts = Counter(topics)
          rank = 1
          for topic, times in counts.most_common():
              print(f"{rank}. {topic}: {times}")
              rank += 1
          print("Different topics:", len(counts))
        `, py`
          from collections import Counter
          topics = input("Topics: ").split()
          counts = Counter(topics)
          rank = 1
          for topic, times in counts.most_common(3):
              print(f"{rank}. {topic}: {times}")
              rank += 1
          print("Different topics:", len(topics))
        `],
        hints: [
          md`If more than three topics are printed, «most_common» is not told how many to give.`,
          md`If «Different topics» is 7 for the example, you counted every word typed, repeats included.`,
          md`If every rank shows 1, the rank does not go up inside the loop.`,
        ],
      },
    ],
    keys: [
      md`«Counter(items)» from «collections» counts each item. A missing item counts as 0.`,
      md`«c.most_common(n)» gives the n biggest counts as (item, count) tuples, biggest first.`,
      md`«import statistics as st» gives the module a short name. «st.mean(x)» is the average; «st.median(x)» is the middle value.`,
      md`An empty list has no mean: check it first. When a rule decides what to count, a plain loop is often clearer.`,
    ],
  });

  // ---------------------------------------------------------------- Day 84
  day({
    slug: "kirana-khata",
    title: "Project: Kirana Khata",
    goal: "Build a shop credit book that cleans its input, saves and reloads.",
    minutes: 45,
    kind: "project",
    needs: [60, 71, 80, 81, 82],
    win: "Today you can now build a credit book that refuses bad amounts, imports a messy file, saves itself and finds overdue customers.",
    learn: [
      md`
        ## The shop's credit book

        A kirana shop gives **udhaar**: goods now, money later. The owner writes each customer's balance in a **khata**, a credit book. Today you build that khata in Python, in five stages. Nothing is new: you use dictionaries, «raise», CSV, JSON and dates.
      `,
      md`
        ## How the stages work

        Each stage starts with your own code from the stage before. The book is a dictionary of names and rupees owed, like «{"Ramesh": 150}». From Stage 4, the book is saved in «khata.json». When you press Run again, your saved file is still there, so the book remembers.
      `,
      pause(md`Stages save one at a time, so you may stop after any stage and come back later.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          book = {"Ramesh": 150, "Sita": 300, "Gopal": 150}
          print(sorted(book, key=lambda n: (-book[n], n)))
        `, options: ["['Sita', 'Gopal', 'Ramesh']", "['Sita', 'Ramesh', 'Gopal']", "['Gopal', 'Ramesh', 'Sita']"], answer: 0,
        explain: md`The minus sign puts the biggest balance first. Equal balances then go A to Z by name.`,
        why: [null, md`Ramesh and Gopal both owe 150, so the name decides: Gopal comes first.`, md`That is A to Z by name only. The balance comes first in the tuple.`],
        skill: "trace" },
      { q: md`Why does «add_credit» raise ValueError for an amount of 0, and not just print a message?`,
        options: ["So the caller decides what to do, and the book is never changed by a bad amount", "Because «print» cannot show numbers", "Because 0 crashes the dictionary"],
        answer: 0, verify: false, mono: false,
        explain: md`«raise» stops the function before the book changes. The code that called it catches the error and chooses the message.`,
        why: [null, md`«print» shows numbers well. The point is to stop the change.`, md`A dictionary can hold 0. The rule against 0 is the shop's rule.`],
        skill: "memory" },
      { q: md`What does this program do?`, code: py`
          import json
          try:
              with open("khata.json", encoding="utf-8") as f:
                  book = json.load(f)
          except FileNotFoundError:
              book = {}
          print(len(book))
        `, options: ["It prints how many customers are in the saved book, or 0 if there is no file yet", "It always prints 0", "It creates an empty khata.json"],
        answer: 0, verify: false, mono: false,
        explain: md`It loads the saved book if there is one, and counts its customers.`,
        why: [null, md`A saved file with customers gives more than 0.`, md`Nothing is written. Only «"w"» mode creates a file.`],
        skill: "read" },
      { q: md`Gopal last paid on 01-10-2027. Which line gives the days until 31-10-2027?`,
        options: ['«(datetime.strptime("31-10-2027", "%d-%m-%Y").date() - paid).days»', '«"31-10-2027" - "01-10-2027"»', "«31 - 1»"],
        answer: 0, verify: false, mono: false,
        explain: md`Read the text into a date, subtract the dates, then take «.days». Here «paid» is the date of 01-10-2027.`,
        why: [null, md`Text cannot be subtracted. Turn it into dates first.`, md`That works only inside one month. Dates handle any two days.`],
        skill: "choose" },
      { q: md`A shop keeps its book by customer number, like «{101: 150}». After loading «khata.json» again, «book[101]» stops with KeyError, though 101 was saved. Why?`,
        options: ["JSON keys always come back as text, so the key is now «\"101\"»", "The file was never saved", "A dictionary cannot hold numbers"],
        answer: 0, verify: false, mono: false,
        explain: md`JSON keeps every key as text (Day 81). Use «book["101"]», or turn the keys back into numbers after loading.`,
        why: [null, md`The file was saved: the key is there, but now as text.`, md`Dictionaries hold numbers as keys and values. JSON is what changes the key.`],
        skill: "debug" },
    ],
    practice: [
      {
        id: "s1", stage: 1, title: "Stage 1: credit and payment",
        task: md`
          Fill in two functions. «add_credit(book, name, amount)» adds the amount to the customer's balance; a new customer starts at 0. «add_payment(book, name, amount)» takes the amount off. If the amount is 0 or less, both must «raise ValueError("Amount must be more than 0")» before they change anything. The program then shows:

          | Refused: Amount must be more than 0
          | {'Ramesh': 150, 'Sita': 120}
        `,
        starter: py`
          def add_credit(book, name, amount):
              pass

          def add_payment(book, name, amount):
              pass

          book = {}
          add_credit(book, "Ramesh", 250)
          add_credit(book, "Sita", 120)
          add_payment(book, "Ramesh", 100)
          try:
              add_credit(book, "Sita", -50)
          except ValueError as e:
              print("Refused:", e)
          print(book)
        `,
        solution: py`
          def add_credit(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) + amount

          def add_payment(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) - amount

          book = {}
          add_credit(book, "Ramesh", 250)
          add_credit(book, "Sita", 120)
          add_payment(book, "Ramesh", 100)
          try:
              add_credit(book, "Sita", -50)
          except ValueError as e:
              print("Refused:", e)
          print(book)
        `,
        tests: [
          { output: "Refused: Amount must be more than 0\n{'Ramesh': 150, 'Sita': 120}" },
          { py: py`
              b = {}
              add_credit(b, "Asha", 50)
              add_credit(b, "Asha", 30)
              add_payment(b, "Asha", 80)
              assert b == {"Asha": 0}, "After credits of 50 and 30 and a payment of 80, Asha's balance should be 0. Check that credits add to the old balance."
            ` },
          { py: py`
              b = {"Gopal": 40}
              try:
                  add_payment(b, "Gopal", 0)
                  raised = False
              except ValueError:
                  raised = True
              assert raised, "«add_payment(book, 'Gopal', 0)» should raise ValueError: 0 is not more than 0."
              assert b == {"Gopal": 40}, "A refused payment should leave the book unchanged."
            ` },
          { py: py`
              b = {}
              add_credit(b, "Imran", 1)
              assert b == {"Imran": 1}, "A credit of 1 rupee is allowed. Imran's balance should be 1."
            ` },
        ],
        wrong: [py`
          def add_credit(book, name, amount):
              if amount < 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) + amount

          def add_payment(book, name, amount):
              if amount < 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) - amount

          book = {}
          add_credit(book, "Ramesh", 250)
          add_credit(book, "Sita", 120)
          add_payment(book, "Ramesh", 100)
          try:
              add_credit(book, "Sita", -50)
          except ValueError as e:
              print("Refused:", e)
          print(book)
        `, py`
          def add_credit(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = amount

          def add_payment(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) - amount

          book = {}
          add_credit(book, "Ramesh", 250)
          add_credit(book, "Sita", 120)
          add_payment(book, "Ramesh", 100)
          try:
              add_credit(book, "Sita", -50)
          except ValueError as e:
              print("Refused:", e)
          print(book)
        `],
        hints: [
          md`If the book prints as «{}», the functions still only say «pass».`,
          md`If a payment of 0 is accepted, your check lets 0 through. The rule is «0 or less».`,
          md`Two credits to Asha may give only the last one. Then the function replaces the balance. It should add to the old one, which starts at 0 for a new customer.`,
        ],
      },
      {
        id: "s2", stage: 2, carry: "s1", title: "Stage 2: import the messy notebook",
        task: md`
          The old paper notebook was typed into «udhaar.csv», with the columns name and amount. Some rows are bad: a blank name, a blank amount, a word, or an amount of 0 or less. Add «import csv» at the top. Write «import_csv(book, path)»: it adds each good row with «add_credit», skips each bad row, and gives back how many it skipped. Then change the lines at the bottom to:

          : book = {}
          : skipped = import_csv(book, "udhaar.csv")
          : print(book)
          : print("Skipped:", skipped)

          For the file given it shows:

          | {'Ramesh': 250, 'Sita': 120}
          | Skipped: 4
        `,
        files: { "udhaar.csv": "name,amount\nRamesh,250\nSita,\n,90\nRamesh,abc\nGopal,-40\nSita,120\n" },
        starter: py`
          def add_credit(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) + amount

          def add_payment(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) - amount

          book = {}
          add_credit(book, "Ramesh", 250)
          add_credit(book, "Sita", 120)
          add_payment(book, "Ramesh", 100)
          try:
              add_credit(book, "Sita", -50)
          except ValueError as e:
              print("Refused:", e)
          print(book)
        `,
        solution: py`
          import csv

          def add_credit(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) + amount

          def add_payment(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) - amount

          def import_csv(book, path):
              skipped = 0
              with open(path, encoding="utf-8") as f:
                  for row in csv.DictReader(f):
                      name = row["name"].strip()
                      if name == "":
                          skipped += 1
                          continue
                      try:
                          add_credit(book, name, int(row["amount"]))
                      except ValueError:
                          skipped += 1
              return skipped

          book = {}
          skipped = import_csv(book, "udhaar.csv")
          print(book)
          print("Skipped:", skipped)
        `,
        tests: [
          { output: "{'Ramesh': 250, 'Sita': 120}\nSkipped: 4" },
          { files: { "udhaar.csv": "name,amount\nAsha,10\nAsha,15\n" }, output: "{'Asha': 25}\nSkipped: 0" },
          { files: { "udhaar.csv": "name,amount\n" }, output: "{}\nSkipped: 0" },
          { files: { "udhaar.csv": "name,amount\n ,5\nKiran,0\nDev,7.5\n" }, output: "{}\nSkipped: 3" },
          { files: { "other.csv": "name,amount\nRavi,20\nRavi,0\n" }, py: py`
              b = {"Ravi": 5}
              n = import_csv(b, "other.csv")
              assert b == {"Ravi": 25}, "«import_csv» should add Ravi's good row to his old balance of 5."
              assert n == 1, "«import_csv» should give back 1: one row was skipped."
            ` },
        ],
        wrong: [py`
          import csv

          def add_credit(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) + amount

          def add_payment(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) - amount

          def import_csv(book, path):
              skipped = 0
              with open(path, encoding="utf-8") as f:
                  for row in csv.DictReader(f):
                      name = row["name"].strip()
                      try:
                          add_credit(book, name, int(row["amount"]))
                      except ValueError:
                          skipped += 1
              return skipped

          book = {}
          skipped = import_csv(book, "udhaar.csv")
          print(book)
          print("Skipped:", skipped)
        `, py`
          import csv

          def add_credit(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) + amount

          def add_payment(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) - amount

          def import_csv(book, path):
              skipped = 0
              with open(path, encoding="utf-8") as f:
                  for row in csv.DictReader(f):
                      name = row["name"].strip()
                      if name == "":
                          skipped += 1
                          continue
                      try:
                          amount = int(row["amount"])
                      except ValueError:
                          skipped += 1
                          continue
                      book[name] = book.get(name, 0) + amount
              return skipped

          book = {}
          skipped = import_csv(book, "udhaar.csv")
          print(book)
          print("Skipped:", skipped)
        `],
        hints: [
          md`If the book has a customer called «''», the row with a blank name got in. Check the name after removing spaces.`,
          md`If Gopal appears with -40, the amount check from Stage 1 is not used for imported rows.`,
          md`If the program stops on «abc» or a blank amount, the conversion to a whole number is outside the «try».`,
        ],
      },
      {
        id: "s3", stage: 3, carry: "s2", title: "Stage 3: who owes most",
        task: md`
          Write «report(book)». It prints each customer and balance, the biggest balance first; equal balances go A to Z by name. Line each one up with «{name:<8}{amount:6}». Last, it prints the total. Then change the bottom so it calls «report(book)» in place of «print(book)». For the file given it shows:

          | Ramesh     250
          | Sita       120
          | Total due: 370
          | Skipped: 4
        `,
        files: { "udhaar.csv": "name,amount\nRamesh,250\nSita,\n,90\nRamesh,abc\nGopal,-40\nSita,120\n" },
        starter: py`
          import csv

          def add_credit(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) + amount

          def add_payment(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) - amount

          def import_csv(book, path):
              skipped = 0
              with open(path, encoding="utf-8") as f:
                  for row in csv.DictReader(f):
                      name = row["name"].strip()
                      if name == "":
                          skipped += 1
                          continue
                      try:
                          add_credit(book, name, int(row["amount"]))
                      except ValueError:
                          skipped += 1
              return skipped

          book = {}
          skipped = import_csv(book, "udhaar.csv")
          print(book)
          print("Skipped:", skipped)
        `,
        solution: py`
          import csv

          def add_credit(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) + amount

          def add_payment(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) - amount

          def import_csv(book, path):
              skipped = 0
              with open(path, encoding="utf-8") as f:
                  for row in csv.DictReader(f):
                      name = row["name"].strip()
                      if name == "":
                          skipped += 1
                          continue
                      try:
                          add_credit(book, name, int(row["amount"]))
                      except ValueError:
                          skipped += 1
              return skipped

          def report(book):
              rows = sorted(book.items(), key=lambda r: (-r[1], r[0]))
              for name, amount in rows:
                  print(f"{name:<8}{amount:6}")
              print("Total due:", sum(book.values()))

          book = {}
          skipped = import_csv(book, "udhaar.csv")
          report(book)
          print("Skipped:", skipped)
        `,
        tests: [
          { output: "Ramesh     250\nSita       120\nTotal due: 370\nSkipped: 4" },
          { files: { "udhaar.csv": "name,amount\nAsha,10\nZoya,15\n" }, output: "Zoya        15\nAsha        10\nTotal due: 25\nSkipped: 0" },
          { py: py`
              out = printed("report", {"Gopal": 40, "Zoya": 90, "Asha": 40})
              assert out == "Zoya        90\nAsha        40\nGopal       40\nTotal due: 170", "Zoya owes most, so she comes first. Asha and Gopal owe the same, so they go A to Z. Check the order and the line-up."
            ` },
          { py: py`
              out = printed("report", {})
              assert out == "Total due: 0", "An empty book should print only «Total due: 0»."
            ` },
        ],
        wrong: [py`
          import csv

          def add_credit(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) + amount

          def add_payment(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) - amount

          def import_csv(book, path):
              skipped = 0
              with open(path, encoding="utf-8") as f:
                  for row in csv.DictReader(f):
                      name = row["name"].strip()
                      if name == "":
                          skipped += 1
                          continue
                      try:
                          add_credit(book, name, int(row["amount"]))
                      except ValueError:
                          skipped += 1
              return skipped

          def report(book):
              rows = sorted(book.items(), key=lambda r: (r[1], r[0]), reverse=True)
              for name, amount in rows:
                  print(f"{name:<8}{amount:6}")
              print("Total due:", sum(book.values()))

          book = {}
          skipped = import_csv(book, "udhaar.csv")
          report(book)
          print("Skipped:", skipped)
        `],
        hints: [
          md`If Asha comes first in the second test, your order is A to Z by name, not by the balance.`,
          md`If Gopal comes before Asha when both owe 40, the names are in Z to A order. Turning the whole order round also turns the names round.`,
          md`If the numbers do not line up under each other, check the widths: 8 places for the name and 6 for the amount.`,
        ],
      },
      {
        id: "s4", stage: 4, carry: "s3", title: "Stage 4: save and load",
        task: md`
          Add «import json» at the top. Write «save_book(book, path)», which saves the book with «json.dump», and «load_book(path)», which gives back the saved book, or «{}» if the file does not exist yet. Then change the bottom to:

          : book = load_book("khata.json")
          : name = input("Name: ")
          : amount = int(input("Credit: "))
          : try:
          :     add_credit(book, name, amount)
          : except ValueError as e:
          :     print("Refused:", e)
          : save_book(book, "khata.json")
          : report(load_book("khata.json"))

          The first run, with «Ramesh» and «250», shows the lines below. Run again with «Sita» and «120»: the book remembers Ramesh.

          | Ramesh     250
          | Total due: 250
        `,
        starter: py`
          import csv

          def add_credit(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) + amount

          def add_payment(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) - amount

          def import_csv(book, path):
              skipped = 0
              with open(path, encoding="utf-8") as f:
                  for row in csv.DictReader(f):
                      name = row["name"].strip()
                      if name == "":
                          skipped += 1
                          continue
                      try:
                          add_credit(book, name, int(row["amount"]))
                      except ValueError:
                          skipped += 1
              return skipped

          def report(book):
              rows = sorted(book.items(), key=lambda r: (-r[1], r[0]))
              for name, amount in rows:
                  print(f"{name:<8}{amount:6}")
              print("Total due:", sum(book.values()))

          book = {}
          skipped = import_csv(book, "udhaar.csv")
          report(book)
          print("Skipped:", skipped)
        `,
        solution: py`
          import csv
          import json

          def add_credit(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) + amount

          def add_payment(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) - amount

          def import_csv(book, path):
              skipped = 0
              with open(path, encoding="utf-8") as f:
                  for row in csv.DictReader(f):
                      name = row["name"].strip()
                      if name == "":
                          skipped += 1
                          continue
                      try:
                          add_credit(book, name, int(row["amount"]))
                      except ValueError:
                          skipped += 1
              return skipped

          def report(book):
              rows = sorted(book.items(), key=lambda r: (-r[1], r[0]))
              for name, amount in rows:
                  print(f"{name:<8}{amount:6}")
              print("Total due:", sum(book.values()))

          def save_book(book, path):
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(book, f)

          def load_book(path):
              try:
                  with open(path, encoding="utf-8") as f:
                      return json.load(f)
              except FileNotFoundError:
                  return {}

          book = load_book("khata.json")
          name = input("Name: ")
          amount = int(input("Credit: "))
          try:
              add_credit(book, name, amount)
          except ValueError as e:
              print("Refused:", e)
          save_book(book, "khata.json")
          report(load_book("khata.json"))
        `,
        tests: [
          { inputs: ["Ramesh", "250"], output: "Ramesh     250\nTotal due: 250" },
          { inputs: ["Ramesh", "250"], py: py`assert json.loads(file_text("khata.json")) == {"Ramesh": 250}, "«khata.json» should hold the book: {'Ramesh': 250}."` },
          { inputs: ["Sita", "50"], files: { "khata.json": '{"Sita": 120, "Gopal": 40}' }, output: "Sita       170\nGopal       40\nTotal due: 210" },
          { inputs: ["Gopal", "0"], files: { "khata.json": '{"Gopal": 40}' }, output: "Refused: Amount must be more than 0\nGopal       40\nTotal due: 40" },
          { inputs: ["Asha", "5"], py: py`
              save_book({"A": 1, "B": 2}, "test.json")
              assert load_book("test.json") == {"A": 1, "B": 2}, "«load_book» should give back exactly what «save_book» saved."
              assert load_book("missing.json") == {}, "«load_book» should give back an empty dictionary when the file does not exist."
            ` },
        ],
        wrong: [py`
          import csv
          import json

          def add_credit(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) + amount

          def add_payment(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) - amount

          def import_csv(book, path):
              return 0

          def report(book):
              rows = sorted(book.items(), key=lambda r: (-r[1], r[0]))
              for name, amount in rows:
                  print(f"{name:<8}{amount:6}")
              print("Total due:", sum(book.values()))

          def save_book(book, path):
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(book, f)

          def load_book(path):
              with open(path, encoding="utf-8") as f:
                  return json.load(f)

          book = load_book("khata.json")
          name = input("Name: ")
          amount = int(input("Credit: "))
          try:
              add_credit(book, name, amount)
          except ValueError as e:
              print("Refused:", e)
          save_book(book, "khata.json")
          report(load_book("khata.json"))
        `, py`
          import csv
          import json

          def add_credit(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) + amount

          def add_payment(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) - amount

          def import_csv(book, path):
              return 0

          def report(book):
              rows = sorted(book.items(), key=lambda r: (-r[1], r[0]))
              for name, amount in rows:
                  print(f"{name:<8}{amount:6}")
              print("Total due:", sum(book.values()))

          def save_book(book, path):
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(book, f)

          def load_book(path):
              try:
                  with open(path, encoding="utf-8") as f:
                      return json.load(f)
              except FileNotFoundError:
                  return {}

          book = load_book("khata.json")
          name = input("Name: ")
          amount = int(input("Credit: "))
          try:
              add_credit(book, name, amount)
          except ValueError as e:
              print("Refused:", e)
          report(book)
        `],
        hints: [
          md`If the first run stops with FileNotFoundError, there is no «khata.json» yet. «load_book» must give back an empty dictionary in that case.`,
          md`If the output is right but the file check fails, the book is never saved before the report.`,
          md`If Sita shows only 50 when the saved book already had 120, the program starts from an empty book instead of the loaded one.`,
        ],
      },
      {
        id: "s5", stage: 5, kind: "make", title: "Stage 5: days overdue, from a blank page",
        task: md`
          On a blank page, write «overdue(last_paid, today_text, limit)». «last_paid» is a dictionary of names and the date each customer last paid, as text like «01-10-2027». «today_text» is the date to count to, as text. It gives back a list of (name, days) tuples, for the customers who last paid **more than** «limit» days before. Put the most days first; equal days go A to Z. Then use it on this data:

          : last_paid = {"Ramesh": "01-10-2027", "Sita": "10-11-2027", "Gopal": "20-09-2027"}

          With «"15-11-2027"» and a limit of 30, print each one like this:

          | Gopal: 56 days
          | Ramesh: 45 days
        `,
        starter: py`

        `,
        solution: py`
          from datetime import datetime

          def overdue(last_paid, today_text, limit):
              today = datetime.strptime(today_text, "%d-%m-%Y").date()
              late = []
              for name, paid_text in last_paid.items():
                  paid = datetime.strptime(paid_text, "%d-%m-%Y").date()
                  days = (today - paid).days
                  if days > limit:
                      late.append((name, days))
              return sorted(late, key=lambda r: (-r[1], r[0]))

          last_paid = {"Ramesh": "01-10-2027", "Sita": "10-11-2027", "Gopal": "20-09-2027"}
          for name, days in overdue(last_paid, "15-11-2027", 30):
              print(f"{name}: {days} days")
        `,
        tests: [
          { output: "Gopal: 56 days\nRamesh: 45 days" },
          { py: py`expect("overdue", ({"Asha": "16-10-2027"}, "15-11-2027", 30), [])` },
          { py: py`expect("overdue", ({"Asha": "15-10-2027"}, "15-11-2027", 30), [("Asha", 31)])` },
          { py: py`expect("overdue", ({"Zoya": "01-01-2028", "Dev": "01-01-2028", "Kiran": "31-12-2027"}, "01-03-2028", 7), [("Kiran", 61), ("Dev", 60), ("Zoya", 60)])` },
          { py: py`expect("overdue", ({}, "01-01-2028", 30), [])` },
        ],
        wrong: [py`
          from datetime import datetime

          def overdue(last_paid, today_text, limit):
              today = datetime.strptime(today_text, "%d-%m-%Y").date()
              late = []
              for name, paid_text in last_paid.items():
                  paid = datetime.strptime(paid_text, "%d-%m-%Y").date()
                  days = (today - paid).days
                  if days >= limit:
                      late.append((name, days))
              return sorted(late, key=lambda r: (-r[1], r[0]))

          last_paid = {"Ramesh": "01-10-2027", "Sita": "10-11-2027", "Gopal": "20-09-2027"}
          for name, days in overdue(last_paid, "15-11-2027", 30):
              print(f"{name}: {days} days")
        `, py`
          from datetime import datetime

          def overdue(last_paid, today_text, limit):
              today = datetime.strptime(today_text, "%d-%m-%Y").date()
              late = []
              for name, paid_text in last_paid.items():
                  paid = datetime.strptime(paid_text, "%d-%m-%Y").date()
                  days = (today - paid).days
                  if days > limit:
                      late.append((name, days))
              return late

          last_paid = {"Ramesh": "01-10-2027", "Sita": "10-11-2027", "Gopal": "20-09-2027"}
          for name, days in overdue(last_paid, "15-11-2027", 30):
              print(f"{name}: {days} days")
        `],
        hints: [
          md`If Ramesh is printed before Gopal, the list is in the order of the dictionary, not the most days first.`,
          md`If a customer who paid exactly 30 days before is in the list, your check counts 30 as overdue. Only more than the limit counts.`,
          md`If Dev and Zoya, both 60 days late, come out Z to A, the names need to break the tie in A to Z order.`,
        ],
      },
      {
        id: "twist", kind: "modify", carry: "s4", optional: true, noStep: true, title: "Own Twist: the biggest debt",
        task: md`
          Make the khata your own. Add «biggest_debt(book)»: it gives back a (name, amount) tuple for the customer who owes most, or «None» if the book is empty. Then add anything you like to the bottom: a payment question, a welcome line, a second customer. The tests check only your functions, so your own idea is safe.
        `,
        starter: py`
          import csv
          import json

          def add_credit(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) + amount

          def add_payment(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) - amount

          def import_csv(book, path):
              skipped = 0
              with open(path, encoding="utf-8") as f:
                  for row in csv.DictReader(f):
                      name = row["name"].strip()
                      if name == "":
                          skipped += 1
                          continue
                      try:
                          add_credit(book, name, int(row["amount"]))
                      except ValueError:
                          skipped += 1
              return skipped

          def report(book):
              rows = sorted(book.items(), key=lambda r: (-r[1], r[0]))
              for name, amount in rows:
                  print(f"{name:<8}{amount:6}")
              print("Total due:", sum(book.values()))

          def save_book(book, path):
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(book, f)

          def load_book(path):
              try:
                  with open(path, encoding="utf-8") as f:
                      return json.load(f)
              except FileNotFoundError:
                  return {}

          book = load_book("khata.json")
          name = input("Name: ")
          amount = int(input("Credit: "))
          try:
              add_credit(book, name, amount)
          except ValueError as e:
              print("Refused:", e)
          save_book(book, "khata.json")
          report(load_book("khata.json"))
        `,
        solution: py`
          import csv
          import json

          def add_credit(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) + amount

          def add_payment(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) - amount

          def import_csv(book, path):
              skipped = 0
              with open(path, encoding="utf-8") as f:
                  for row in csv.DictReader(f):
                      name = row["name"].strip()
                      if name == "":
                          skipped += 1
                          continue
                      try:
                          add_credit(book, name, int(row["amount"]))
                      except ValueError:
                          skipped += 1
              return skipped

          def report(book):
              rows = sorted(book.items(), key=lambda r: (-r[1], r[0]))
              for name, amount in rows:
                  print(f"{name:<8}{amount:6}")
              print("Total due:", sum(book.values()))

          def save_book(book, path):
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(book, f)

          def load_book(path):
              try:
                  with open(path, encoding="utf-8") as f:
                      return json.load(f)
              except FileNotFoundError:
                  return {}

          def biggest_debt(book):
              if not book:
                  return None
              return max(book.items(), key=lambda r: r[1])

          print("Namaste! Kirana Khata")
          book = load_book("khata.json")
          name = input("Name: ")
          amount = int(input("Credit: "))
          try:
              add_credit(book, name, amount)
          except ValueError as e:
              print("Refused:", e)
          save_book(book, "khata.json")
          report(load_book("khata.json"))
          print("Owes most:", biggest_debt(book))
        `,
        tests: [
          { inputs: ["Ramesh", "250"], spare_inputs: true, py: py`
              expect("biggest_debt", ({"Ramesh": 150, "Sita": 300},), ("Sita", 300))
              expect("biggest_debt", ({"Gopal": 40},), ("Gopal", 40))
              expect("biggest_debt", ({},), None)
            ` },
          { inputs: ["Ramesh", "250"], spare_inputs: true, py: py`
              b = {}
              add_credit(b, "Asha", 50)
              add_payment(b, "Asha", 20)
              assert b == {"Asha": 30}, "Your old «add_credit» and «add_payment» should still work."
              save_book(b, "t.json")
              assert load_book("t.json") == {"Asha": 30}, "Your old «save_book» and «load_book» should still work."
            ` },
        ],
        wrong: [py`
          import json

          def add_credit(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) + amount

          def add_payment(book, name, amount):
              if amount <= 0:
                  raise ValueError("Amount must be more than 0")
              book[name] = book.get(name, 0) - amount

          def save_book(book, path):
              with open(path, "w", encoding="utf-8") as f:
                  json.dump(book, f)

          def load_book(path):
              try:
                  with open(path, encoding="utf-8") as f:
                      return json.load(f)
              except FileNotFoundError:
                  return {}

          def biggest_debt(book):
              return max(book.items(), key=lambda r: r[1])

          book = load_book("khata.json")
          name = input("Name: ")
          amount = int(input("Credit: "))
          add_credit(book, name, amount)
          save_book(book, "khata.json")
        `],
        hints: [
          md`If an empty book crashes with ValueError from «max», the function needs to give back None before it looks for the biggest.`,
          md`If you get a name but not the amount, give back the whole (name, amount) pair, not only the key.`,
          md`If an old test fails, your change touched one of the Stage 1 to 4 functions. Keep them as they were.`,
        ],
      },
      {
        id: "d1", kind: "drill", title: "Laptop Mission: a khata that remembers",
        task: md`
          This pretend Command Prompt runs the khata twice. Type each command and press Enter.

          On a phone, you may skip this. Phone users are excused from the mission below.
        `,
        steps: [
          { say: md`Run the khata. Type «python khata.py» and press Enter. (The answers Ramesh and 250 are typed for you.)`,
            expect: ["python khata.py", "py khata.py"], output: "Name: Ramesh\nCredit: 250\nRamesh     250\nTotal due: 250" },
          { say: md`Run it again. This time the answers are Sita and 120. Type «python khata.py».`,
            expect: ["python khata.py", "py khata.py"], output: "Name: Sita\nCredit: 120\nRamesh     250\nSita       120\nTotal due: 370" },
        ],
        mission: md`
          Now do it for real. Copy your Stage 4 program into IDLE and save it as «khata.py» in your «python-days» folder.

          1. Run it with Ramesh and 250. Then run it again with Sita and 120.
          2. Open the folder in Explorer. You see «khata.json» beside your program: that is the saved book.
          3. The last «Total due» number is your receipt code. Write it in your notebook.
        `,
        hints: [
          md`Type the words in the grey box exactly, then press Enter.`,
          md`There is one space between «python» and the file name.`,
          md`If «python» does not work on your laptop, «py» does the same job.`,
        ],
      },
    ],
    keys: [
      md`Small functions with one job each: credit, payment, import, report, save, load.`,
      md`A function can «raise ValueError» to refuse bad data. The caller catches it and decides what to say.`,
      md`Messy files: skip each bad row and count it, then say how many were skipped.`,
      md`Load with «try»/«except FileNotFoundError» and save with «json.dump», and the program remembers between runs.`,
    ],
  });
})();
