// Week 18 - Real Data and Real Tests (Days 120 to 125).
(function () {
  const { day, md, py, ex, code, tip, warn, ask, pause } = window.Course;

  // ---------------------------------------------------------------- Day 120
  day({
    slug: "pathlib-files",
    title: "Folders and Files with pathlib",
    goal: "Build paths, find files and read them with pathlib.",
    minutes: 45,
    needs: [78, 89],
    win: "Today you can now build a path that works on any computer, find every file of one kind in a folder, and read or write a file in one line.",
    learn: [
      md`
        ## A path is an object

        On Day 78 you joined folder and file names as text, like «"notes/" + name». The «pathlib» module gives you **Path** objects instead. The «/» sign joins parts of a path, and a Path knows its own parts. Guess the output.
      `,
      ex(py`
        from pathlib import Path

        p = Path("notes") / "polity.txt"
        print(p.name, p.stem, p.suffix)
        print(p.parent.name)
      `, { predict: ["polity.txt polity .txt\nnotes", "polity.txt polity txt\nnotes", "polity polity.txt .txt\nnotes"], answer: 0 }),
      md`
        «name» is the whole file name, «stem» is the name without its ending, and «suffix» is the ending, with its dot. «parent» is the folder that holds the file. «print(p)» shows «notes/polity.txt» here, and «notes\polity.txt» on Windows. The «/» in your code works on every computer, so you never type a backslash in a path again.

        ## Read and write in one line

        A Path can write and read a whole text file by itself, with no «with open». «.exists()» tells you if the file is there. Guess the output.
      `,
      ex(py`
        from pathlib import Path

        p = Path("today.txt")
        print(p.exists())
        p.write_text("Read Article 21\n", encoding="utf-8")
        print(p.exists(), p.read_text(encoding="utf-8").strip())
      `, { predict: ["False\nTrue Read Article 21", "True\nTrue Read Article 21", "False\nFalse"], answer: 0 }),
      md`
        «write_text» makes the file, or replaces what was in it, like mode «"w"» on Day 38. Use «with open» when you need to read line by line or add to the end.
      `,
      pause(md`Good place for a break. Next: finding every file of one kind, and making folders.`),
      md`
        ## glob: find files by a pattern

        «folder.glob("*.txt")» gives every path in the folder whose name ends in «.txt». The «*» means "any name". The folder «notes» here has two notes and a CSV file. Guess the output.
      `,
      ex(py`
        from pathlib import Path

        for p in sorted(Path("notes").glob("*.txt")):
            print(p.name, len(p.read_text(encoding="utf-8").split()))
      `, { files: { "notes/polity.txt": "Article 21 protects life\n", "notes/history.txt": "Plassey 1757\nBuxar 1764\n", "notes/marks.csv": "name,marks\n" },
        predict: ["history.txt 4\npolity.txt 4", "history.txt 2\npolity.txt 1", "history.txt 4\nmarks.csv 1\npolity.txt 4"], answer: 0 }),
      md`
        The order glob finds files in is not fixed, so sort them, as on Day 78. «.rglob("*.txt")» also looks inside every folder within the folder.

        ## Making a folder

        «.mkdir(exist_ok=True)» makes a folder, and does nothing if it is already there. «.iterdir()» gives everything inside a folder. Guess the output.
      `,
      ex(py`
        from pathlib import Path

        folder = Path("reports")
        folder.mkdir(exist_ok=True)
        (folder / "day1.txt").write_text("done", encoding="utf-8")
        print([p.name for p in folder.iterdir()])
      `, { predict: ["['day1.txt']", "['reports/day1.txt']", "[]"], answer: 0 }),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          from pathlib import Path

          p = Path("data") / "2026" / "marks.csv"
          print(p.name, p.suffix, p.parent.name)
        `, options: ["marks.csv .csv 2026", "marks .csv data", "marks.csv csv 2026"], answer: 0,
        explain: md`The parent of the file is the folder «data/2026», and that folder's own name is «2026».`,
        why: [null, md`«name» keeps the ending, and the nearest folder is 2026, not data.`, md`«suffix» keeps its dot.`],
        skill: "trace" },
      { q: md`What does this function give back?`, code: py`
          from pathlib import Path

          def word_count(folder):
              return sum(len(p.read_text(encoding="utf-8").split()) for p in Path(folder).glob("*.txt"))
        `, options: ["The total number of words in all the .txt files in the folder", "The number of .txt files", "The longest word in the folder"],
        answer: 0, verify: false, mono: false,
        explain: md`It reads each .txt file, counts its words, and adds the counts up.`,
        why: [null, md`It counts the words inside the files, not the files.`, md`It counts words. It never compares them.`],
        skill: "read" },
      { q: md`«Path("notes").glob("*.txt")» finds nothing. The .txt files are inside «notes/old». What is the fix?`,
        options: ['Use «rglob("*.txt")», which also looks inside folders within notes', 'Write «glob("txt")»', 'Add «encoding="utf-8"»'], answer: 0, verify: false, mono: false,
        explain: md`«glob» looks only in the folder itself. «rglob» goes down into every folder inside it.`,
        why: [null, md`Without «*», the pattern only matches a file named exactly «txt».`, md`Encoding is about reading text, not finding files.`],
        skill: "debug" },
      { q: md`What is «Path("report.final.pdf").stem»?`,
        options: ["«report.final»", "«report»", "«.pdf»"], answer: 0, verify: false,
        explain: md`«stem» drops only the last ending. «.pdf» is the «suffix».`,
        why: [null, md`Only the last dot starts the ending.`, md`That is the «suffix».`],
        skill: "memory" },
      { q: md`You need a path from a folder name and a file name that works on Windows and on a phone. What do you write?`,
        options: ['«Path(folder) / name»', '«folder + "\\\\" + name»', '«folder + name»'], answer: 0, verify: false,
        explain: md`«/» on Path objects uses the right separator for each computer.`,
        why: [null, md`A backslash works on Windows only, and is easy to get wrong in text (Day 78).`, md`With no separator, the names run together into one wrong name.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: parts of a path",
        task: md`Answer each question without running the program.`,
        code: py`
          from pathlib import Path

          p = Path("exams") / "ssc" / "cgl_2026.pdf"
          name = p.name
          stem = p.stem
          print(stem.upper(), p.suffix, p.parent.name)
        `,
        ask: [{ line: 4, name: "name" }, { line: 5, name: "stem" }, { output: true }],
        hints: [
          md`«name» is the last part of the path, with its ending.`,
          md`«stem» is the name without its ending.`,
          md`The parent is the folder holding the file. Its name is the last folder.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: marks in a folder",
        task: md`The folder «marks» holds «asha.txt» (72), «ravi.txt» (65) and «list.csv». Answer each question without running the program.`,
        code: py`
          from pathlib import Path

          total = 0
          count = 0
          for p in sorted(Path("marks").glob("*.txt")):
              total += int(p.read_text(encoding="utf-8"))
              count += 1
          print(count, total)
        `,
        files: { "marks/asha.txt": "72\n", "marks/ravi.txt": "65\n", "marks/list.csv": "name\n" },
        ask: [{ line: 6, hit: 1, name: "total" }, { output: true }],
        hints: [
          md`Only the .txt files are found. Sorted, asha.txt comes first.`,
          md`After the first round, the total holds Asha's mark.`,
          md`Two files are added: 72 and 65.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: write a note, read it back",
        task: md`
          Put the lines in order. The program writes a note with a Path, then reads it back. It prints:

          | True Plassey 1757
        `,
        solution: py`
          from pathlib import Path
          note = Path("note.txt")
          note.write_text("Plassey 1757", encoding="utf-8")
          text = note.read_text(encoding="utf-8")
          print(note.exists(), text)
        `,
        distractors: ['note = "note.txt"'],
        tests: [{ output: "True Plassey 1757" }],
        hints: [
          md`If you see AttributeError on a str, «note» is plain text. It must be a Path.`,
          md`If you see FileNotFoundError, the file is read before it is written.`,
          md`If you see a NameError for Path, the import line must come first.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the notes that are never found",
        task: md`
          The program lists the .txt files in a folder. For the folder «notes» it should print:

          | 2 ['history.txt', 'polity.txt']

          It prints «0 []» instead. Tap the line that causes it, then fix it.
        `,
        files: { "notes/polity.txt": "Article 21 protects life\n", "notes/history.txt": "Plassey 1757\nBuxar 1764\n", "notes/marks.csv": "name,marks\n" },
        starter: py`
          from pathlib import Path

          folder = Path(input("Folder: "))
          names = sorted(p.name for p in folder.glob("txt"))
          print(len(names), names)
        `,
        bugLines: [4],
        solution: py`
          from pathlib import Path

          folder = Path(input("Folder: "))
          names = sorted(p.name for p in folder.glob("*.txt"))
          print(len(names), names)
        `,
        tests: [
          { inputs: ["notes"], output: "2 ['history.txt', 'polity.txt']" },
          { inputs: ["empty"], files: { "empty/a.csv": "x\n" }, output: "0 []" },
        ],
        wrong: [py`
          from pathlib import Path

          folder = Path(input("Folder: "))
          names = sorted(p.name for p in folder.glob("*"))
          print(len(names), names)
        `],
        hints: [
          md`The pattern decides which names match. What does «txt» on its own match?`,
          md`Without «*», the pattern matches only a file named exactly «txt».`,
          md`If the CSV file appears too, the pattern matches every name. Keep the ending in it.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: the pathlib way",
        task: md`
          This program counts the words in the folder's notes with «os» and «open». Change it to use «Path», «glob» and «read_text», with no «os». The output stays:

          | Words: 8
        `,
        files: { "notes/polity.txt": "Article 21 protects life\n", "notes/history.txt": "Plassey 1757\nBuxar 1764\n", "notes/marks.csv": "name,marks\n" },
        starter: py`
          import os

          total = 0
          for name in sorted(os.listdir("notes")):
              if name.endswith(".txt"):
                  with open("notes/" + name, encoding="utf-8") as f:
                      total += len(f.read().split())
          print("Words:", total)
        `,
        solution: py`
          from pathlib import Path

          total = 0
          for p in sorted(Path("notes").glob("*.txt")):
              total += len(p.read_text(encoding="utf-8").split())
          print("Words:", total)
        `,
        tests: [
          { output: "Words: 8" },
          { avoids: ["kw:os"], uses: ["method:glob"] },
        ],
        wrong: [py`
          from pathlib import Path

          total = 0
          for p in sorted(Path("notes").glob("*")):
              total += len(p.read_text(encoding="utf-8").split())
          print("Words:", total)
        `],
        hints: [
          md`If a test says to do it without «os», the import or a call to it is still there.`,
          md`If the total is 9, the CSV file is counted too. Keep the «.txt» ending in the pattern.`,
          md`If you see a NameError for Path, import it from pathlib.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a folder report",
        task: md`
          From a blank page. Ask for a folder name. For each .txt file in it, in A to Z order, print its name and its number of lines. Then write a file «summary.txt» in that folder holding «Files: N», where N is how many .txt files there were, and print «Saved summary.txt». Use Path. For the folder «notes» it shows:

          | history.txt: 2 lines
          | polity.txt: 1 lines
          | Saved summary.txt
        `,
        files: { "notes/polity.txt": "Article 21 protects life\n", "notes/history.txt": "Plassey 1757\nBuxar 1764\n", "notes/marks.csv": "name,marks\n" },
        starter: py``,
        solution: py`
          from pathlib import Path

          folder = Path(input("Folder: "))
          notes = sorted(folder.glob("*.txt"))
          for p in notes:
              lines = p.read_text(encoding="utf-8").splitlines()
              print(f"{p.name}: {len(lines)} lines")
          (folder / "summary.txt").write_text(f"Files: {len(notes)}\n", encoding="utf-8")
          print("Saved summary.txt")
        `,
        tests: [
          { inputs: ["notes"], output: "history.txt: 2 lines\npolity.txt: 1 lines\nSaved summary.txt", py: py`
              text = file_text("notes/summary.txt").strip()
              assert text == "Files: 2", f"summary.txt should hold 'Files: 2', but it holds {text!r}."
            ` },
          { inputs: ["box"], files: { "box/a.txt": "1\n2\n3\n" }, output: "a.txt: 3 lines\nSaved summary.txt", py: py`
              assert file_text("box/summary.txt").strip() == "Files: 1", "summary.txt in box should hold 'Files: 1'."
            ` },
        ],
        wrong: [py`
          from pathlib import Path

          folder = Path(input("Folder: "))
          (folder / "summary.txt").write_text("Files: 0\n", encoding="utf-8")
          notes = sorted(folder.glob("*.txt"))
          for p in notes:
              lines = p.read_text(encoding="utf-8").splitlines()
              print(f"{p.name}: {len(lines)} lines")
          print("Saved summary.txt")
        `],
        hints: [
          md`If summary.txt appears in the list of files, it was written before the folder was searched. Search first, write last.`,
          md`If summary.txt is in the wrong place, join it to the folder with «/».`,
          md`If the line counts are too big by one, check that you split the text into lines, not words.`,
        ],
      },
    ],
    keys: [
      md`«Path("notes") / "polity.txt"» joins path parts on any computer.`,
      md`A Path knows its «name», «stem», «suffix» and «parent».`,
      md`«p.read_text()» and «p.write_text(text)» read or write a whole file. «p.exists()» checks it is there.`,
      md`«folder.glob("*.txt")» finds matching files; «rglob» also looks in folders inside. Sort the results.`,
      md`«folder.mkdir(exist_ok=True)» makes a folder if it is not there yet.`,
    ],
  });

  // ---------------------------------------------------------------- Day 121
  day({
    slug: "sqlite-tables",
    title: "Databases 1: Tables and Rows",
    goal: "Make a SQLite table, add rows and read them back.",
    minutes: 45,
    needs: [58, 81],
    win: "Today you can now make a database table, add rows to it safely, and read the rows back.",
    learn: [
      md`
        ## A database in one file

        A **database** keeps data in **tables**: each table has named **columns**, and each record is a **row**, like a register. Python comes with **SQLite**, a small database that keeps everything in one file. You talk to it in **SQL**, a short language for tables. By habit, SQL words are written in CAPITALS. Guess the output.
      `,
      ex(py`
        import sqlite3

        con = sqlite3.connect("school.db")
        con.execute("CREATE TABLE students (name TEXT, city TEXT, marks INTEGER)")
        con.execute("INSERT INTO students VALUES ('Asha', 'Pune', 72)")
        con.commit()
        rows = con.execute("SELECT * FROM students").fetchall()
        print(rows)
        con.close()
      `, { predict: ["[('Asha', 'Pune', 72)]", "['Asha', 'Pune', 72]", "Asha Pune 72"], answer: 0 }),
      md`
        - «sqlite3.connect("school.db")» opens the database file, and makes it if it is not there.
        - «CREATE TABLE» makes a table. Each column has a type: «TEXT» or «INTEGER».
        - «INSERT INTO ... VALUES (...)» adds a row. «commit()» saves the changes into the file.
        - «SELECT * FROM students» asks for every column of every row. «fetchall()» gives the rows as a list of tuples.
      `,
      tip(md`On your laptop, «school.db» stays after the program ends, so the rows are there next time. On this page a database file is not kept between Runs. Write «CREATE TABLE IF NOT EXISTS» in programs you run again and again: it makes the table only the first time.`),
      md`
        ## Values go in with ?

        Never paste values into the SQL text yourself. Put a «?» where each value goes, and give the values separately, as a tuple. SQLite fills them in safely. «executemany» adds many rows at once. «":memory:"» is a database that lives only while the program runs. Guess the output.
      `,
      ex(py`
        import sqlite3

        con = sqlite3.connect(":memory:")
        con.execute("CREATE TABLE students (name TEXT, city TEXT, marks INTEGER)")
        new = [("Ravi", "Delhi", 65), ("Meena", "Pune", 81)]
        con.executemany("INSERT INTO students VALUES (?, ?, ?)", new)
        con.execute("INSERT INTO students VALUES (?, ?, ?)", ("Om", "Agra", 40))
        print(len(con.execute("SELECT * FROM students").fetchall()))
      `, { predict: ["3", "2", "1"], answer: 0 }),
      md`
        A single value still goes in a tuple, with a comma: «("Pune",)». Without the comma, «("Pune")» is just the text, and SQLite would read it letter by letter.
      `,
      pause(md`Good place for a break. Next: reading the rows back.`),
      md`
        ## Reading rows back

        You can name the columns you want after «SELECT». A «for» loop can go straight over the answer, one row at a time. «fetchone()» gives only the first row. Guess the output.
      `,
      ex(py`
        import sqlite3

        con = sqlite3.connect(":memory:")
        con.execute("CREATE TABLE students (name TEXT, city TEXT, marks INTEGER)")
        con.executemany("INSERT INTO students VALUES (?, ?, ?)", [("Asha", "Pune", 72), ("Ravi", "Delhi", 65)])
        for name, marks in con.execute("SELECT name, marks FROM students"):
            print(name, marks)
        print(con.execute("SELECT city FROM students").fetchone())
      `, { predict: ["Asha 72\nRavi 65\n('Pune',)", "Asha 72\nRavi 65\nPune", "Asha Pune 72\nRavi Delhi 65\n('Pune',)"], answer: 0 }),
      md`
        Every row is a tuple, even with one column: «('Pune',)». Take the value out with «[0]».
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          import sqlite3

          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE t (name TEXT, n INTEGER)")
          con.executemany("INSERT INTO t VALUES (?, ?)", [("a", 1), ("b", 2)])
          rows = con.execute("SELECT * FROM t").fetchall()
          print(len(rows), rows[1][0])
        `, options: ["2 b", "2 2", "1 a"], answer: 0,
        explain: md`Two rows went in. «rows[1]» is the second row, «('b', 2)», and «[0]» is its first column.`,
        why: [null, md`«[0]» picks the first column, the name, not the number.`, md`«executemany» added both rows.`],
        skill: "trace" },
      { q: md`What does this line give back?`, code: py`
          con.execute("SELECT name FROM students").fetchall()
        `, options: ["A list of one-item tuples, one for each student's name", "A list of the names as plain text", "Only the first name"],
        answer: 0, verify: false, mono: false,
        explain: md`Every row is a tuple, even with one column: «[('Asha',), ('Ravi',)]».`,
        why: [null, md`The rows are tuples. Take each name out with «[0]».`, md`That would be «fetchone()».`],
        skill: "read" },
      { q: md`On a laptop, a program adds rows, but the next time it runs, they are gone. What was most likely forgotten?`,
        options: ["«con.commit()» after adding the rows", "«fetchall()»", "A «?» in the INSERT"], answer: 0, verify: false, mono: false,
        explain: md`Without «commit», the changes are never saved into the file.`,
        why: [null, md`«fetchall» reads rows. It does not save them.`, md`The rows went in fine. They were simply not saved.`],
        skill: "debug" },
      { q: md`What does each «?» do in «INSERT INTO t VALUES (?, ?)»?`,
        options: ["It marks a place for a value, which SQLite fills in safely from the tuple you give", "It means the value is optional", "It asks the user to type a value"], answer: 0, verify: false, mono: false,
        explain: md`The values travel separately from the SQL text, so nothing in them can change the SQL.`,
        why: [null, md`Every «?» needs a value. A missing one is an error.`, md`Nothing is typed by the user. The values come from your tuple.`],
        skill: "memory" },
      { q: md`You need to keep ten lakh mock test results, and often ask for the results of one city. What fits best?`,
        options: ["A SQLite database table", "A plain text file", "A list in the program, typed in each time"], answer: 0, verify: false, mono: false,
        explain: md`A database keeps the data in a file and answers questions about it quickly (Day 122).`,
        why: [null, md`A text file must be read and split in full for every question.`, md`The list is gone when the program ends.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: the snack table",
        task: md`Answer each question without running the program.`,
        code: py`
          import sqlite3

          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE snacks (name TEXT, price INTEGER)")
          con.executemany("INSERT INTO snacks VALUES (?, ?)", [("chai", 15), ("vada", 20), ("samosa", 18)])
          rows = con.execute("SELECT * FROM snacks").fetchall()
          first = rows[0]
          print(len(rows), first[1], rows[-1][0])
        `,
        ask: [{ line: 7, name: "first" }, { output: true }],
        hints: [
          md`The rows come back as tuples, in the order they went in.`,
          md`The first row is chai's row: its name, then its price.`,
          md`«rows[-1]» is the last row, and «[0]» is its name.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: one row, then all",
        task: md`Answer each question without running the program.`,
        code: py`
          import sqlite3

          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE marks (name TEXT, score INTEGER)")
          con.execute("INSERT INTO marks VALUES (?, ?)", ("Asha", 72))
          con.execute("INSERT INTO marks VALUES (?, ?)", ("Ravi", 65))
          row = con.execute("SELECT score FROM marks").fetchone()
          total = 0
          for r in con.execute("SELECT score FROM marks"):
              total += r[0]
          print(row, total)
        `,
        ask: [{ line: 7, name: "row" }, { output: true }],
        hints: [
          md`«fetchone» gives only the first row, as a tuple.`,
          md`A row with one column still has a comma: «(72,)».`,
          md`The loop adds the first item of each row: 72 and 65.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: one city in a table",
        task: md`
          Put the lines in order. The program makes a table, adds one city and reads it back. It prints:

          | [('Pune',)]
        `,
        solution: py`
          import sqlite3
          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE cities (name TEXT)")
          con.execute("INSERT INTO cities VALUES (?)", ("Pune",))
          print(con.execute("SELECT name FROM cities").fetchall())
        `,
        distractors: ['con.execute("INSERT INTO cities VALUES (?)", "Pune")'],
        tests: [{ output: "[('Pune',)]" }],
        hints: [
          md`If you see «Incorrect number of bindings supplied», the value is plain text, so SQLite counts its letters. Use a tuple with a comma.`,
          md`If you see «no such table», a row is added or read before the table is made.`,
          md`If you see a NameError for con, the line that connects must come before the others.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the row that will not go in",
        task: md`
          The program adds the students typed, then lists each name and marks. For «Asha,Pune,72;Ravi,Delhi,65» it should print:

          | Asha 72
          | Ravi 65

          It stops with an OperationalError instead. Tap the line that causes it, then fix it.
        `,
        starter: py`
          import sqlite3

          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE students (name TEXT, city TEXT, marks INTEGER)")
          for part in input("Students: ").split(";"):
              name, city, marks = part.split(",")
              con.execute("INSERT INTO students VALUES (?, ?)", (name, city, int(marks)))
          for name, marks in con.execute("SELECT name, marks FROM students"):
              print(name, marks)
        `,
        bugLines: [7],
        solution: py`
          import sqlite3

          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE students (name TEXT, city TEXT, marks INTEGER)")
          for part in input("Students: ").split(";"):
              name, city, marks = part.split(",")
              con.execute("INSERT INTO students VALUES (?, ?, ?)", (name, city, int(marks)))
          for name, marks in con.execute("SELECT name, marks FROM students"):
              print(name, marks)
        `,
        tests: [
          { inputs: ["Asha,Pune,72;Ravi,Delhi,65"], output: "Asha 72\nRavi 65" },
          { inputs: ["Om,Agra,0"], output: "Om 0" },
        ],
        wrong: [py`
          import sqlite3

          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE students (name TEXT, city TEXT, marks INTEGER)")
          for part in input("Students: ").split(";"):
              name, city, marks = part.split(",")
              con.execute("INSERT INTO students VALUES (?, ?, ?)", (name, int(marks), city))
          for name, marks in con.execute("SELECT name, marks FROM students"):
              print(name, marks)
        `],
        hints: [
          md`The error says the table has 3 columns, but a different number of values was given. Count the «?» marks.`,
          md`Each value in the tuple needs its own «?».`,
          md`If the city appears where the marks should be, the values are not in the same order as the columns.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: add an age column",
        task: md`
          Give the table a third column, «age INTEGER». Asha is 24 and Ravi is 26. Read the age back too, so the program prints:

          | Asha 72 24
          | Ravi 65 26
        `,
        starter: py`
          import sqlite3

          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE students (name TEXT, marks INTEGER)")
          con.executemany("INSERT INTO students VALUES (?, ?)", [("Asha", 72), ("Ravi", 65)])
          for name, marks in con.execute("SELECT name, marks FROM students"):
              print(name, marks)
        `,
        solution: py`
          import sqlite3

          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE students (name TEXT, marks INTEGER, age INTEGER)")
          con.executemany("INSERT INTO students VALUES (?, ?, ?)", [("Asha", 72, 24), ("Ravi", 65, 26)])
          for name, marks, age in con.execute("SELECT name, marks, age FROM students"):
              print(name, marks, age)
        `,
        tests: [{ output: "Asha 72 24\nRavi 65 26" }],
        wrong: [py`
          import sqlite3

          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE students (name TEXT, marks INTEGER, age INTEGER)")
          con.executemany("INSERT INTO students VALUES (?, ?, ?)", [("Asha", 72, 24), ("Ravi", 65, 26)])
          for name, marks in con.execute("SELECT name, marks FROM students"):
              print(name, marks)
        `],
        hints: [
          md`If you see «3 columns but 2 values», the rows need an age each, with a third «?».`,
          md`If the age is missing from the output, the SELECT and the loop must name it too.`,
          md`If you see «too many values to unpack», the loop names fewer columns than the SELECT asks for.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a snack menu database",
        task: md`
          From a blank page. Ask for snacks on one line, each as «name:price». Make a table «menu» with a name and a price, and add every snack with «executemany». Then read all the rows back from the table, and print each one like «chai: Rs 15». Then print how many items there are, and the name of the costliest one. For «chai:15 vada:20 samosa:18» it shows:

          | chai: Rs 15
          | vada: Rs 20
          | samosa: Rs 18
          | Items: 3
          | Costliest: vada
        `,
        starter: py``,
        solution: py`
          import sqlite3

          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE menu (name TEXT, price INTEGER)")
          snacks = []
          for part in input("Snacks: ").split():
              name, price = part.split(":")
              snacks.append((name, int(price)))
          con.executemany("INSERT INTO menu VALUES (?, ?)", snacks)
          rows = con.execute("SELECT name, price FROM menu").fetchall()
          for name, price in rows:
              print(f"{name}: Rs {price}")
          print("Items:", len(rows))
          print("Costliest:", max(rows, key=lambda r: r[1])[0])
        `,
        tests: [
          { inputs: ["chai:15 vada:20 samosa:18"], output: "chai: Rs 15\nvada: Rs 20\nsamosa: Rs 18\nItems: 3\nCostliest: vada" },
          { inputs: ["lassi:40"], output: "lassi: Rs 40\nItems: 1\nCostliest: lassi" },
          { inputs: ["a:9 b:10 c:2"], output: "a: Rs 9\nb: Rs 10\nc: Rs 2\nItems: 3\nCostliest: b" },
          { uses: ["method:executemany"] },
        ],
        wrong: [py`
          import sqlite3

          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE menu (name TEXT, price TEXT)")
          snacks = []
          for part in input("Snacks: ").split():
              name, price = part.split(":")
              snacks.append((name, price))
          con.executemany("INSERT INTO menu VALUES (?, ?)", snacks)
          rows = con.execute("SELECT name, price FROM menu").fetchall()
          for name, price in rows:
              print(f"{name}: Rs {price}")
          print("Items:", len(rows))
          print("Costliest:", max(rows, key=lambda r: r[1])[0])
        `],
        hints: [
          md`If «a:9 b:10» says a is the costliest, the prices are compared as text, where «9» comes after «1». Store them as whole numbers.`,
          md`If a test says to use executemany, the rows are added one at a time. Collect them in a list, then add them all at once.`,
          md`If the costliest shows a tuple, take the name out of the row with «[0]».`,
        ],
      },
    ],
    keys: [
      md`«sqlite3.connect("file.db")» opens a database; «":memory:"» makes one that lives only while the program runs.`,
      md`«CREATE TABLE name (col TYPE, ...)» makes a table. «INSERT INTO name VALUES (?, ?)» adds a row.`,
      md`Give values with «?» and a tuple, never inside the SQL text. «executemany» adds many rows.`,
      md`«SELECT cols FROM name» reads rows as tuples; «fetchall()» gives them all, «fetchone()» the first.`,
      md`«commit()» saves the changes into the file.`,
    ],
  });

  // ---------------------------------------------------------------- Day 122
  day({
    slug: "sqlite-queries",
    title: "Databases 2: Asking Questions",
    goal: "Filter, sort and total with SQL, safely.",
    minutes: 45,
    needs: [121],
    win: "Today you can now ask a database questions: pick rows, sort them, count and average them, all safely.",
    learn: [
      md`
        ## Picking rows with WHERE

        A database is most useful when you ask it questions. «WHERE» keeps only the rows that match. «ORDER BY» sorts them, and «DESC» sorts from biggest to smallest. «LIMIT 2» keeps only the first two. Guess the output.
      `,
      ex(py`
        import sqlite3

        con = sqlite3.connect(":memory:")
        con.execute("CREATE TABLE results (name TEXT, city TEXT, marks INTEGER)")
        con.executemany("INSERT INTO results VALUES (?, ?, ?)", [
            ("Asha", "Pune", 72), ("Ravi", "Delhi", 65),
            ("Meena", "Pune", 81), ("Om", "Agra", 40),
        ])
        for row in con.execute("SELECT name, marks FROM results WHERE marks >= 60 ORDER BY marks DESC LIMIT 2"):
            print(row)
      `, { predict: ["('Meena', 81)\n('Asha', 72)", "('Asha', 72)\n('Meena', 81)", "('Meena', 81)\n('Asha', 72)\n('Ravi', 65)"], answer: 0 }),
      md`
        - «WHERE marks >= 60» keeps Asha, Ravi and Meena. Om's 40 is left out.
        - «ORDER BY marks DESC» puts the biggest marks first. Without «DESC», the smallest come first.
        - «LIMIT 2» keeps the top two.
        - In SQL, equal is one «=», as in «WHERE city = 'Pune'». Join tests with «AND» and «OR».
      `,
      md`
        ## Never build SQL with an f-string

        A value from the user must go in with «?», even in a «WHERE». If you paste it into the SQL with an f-string, a name like «D'Souza» breaks the SQL: its «'» ends the text early. Worse, a cunning user can type SQL of their own, and it runs. This attack is called **SQL injection**. Guess the output.
      `,
      ex(py`
        import sqlite3

        con = sqlite3.connect(":memory:")
        con.execute("CREATE TABLE results (name TEXT, marks INTEGER)")
        con.executemany("INSERT INTO results VALUES (?, ?)", [("D'Souza", 77), ("Ravi", 65)])
        name = "D'Souza"
        print(con.execute("SELECT marks FROM results WHERE name = ?", (name,)).fetchall())
        print(con.execute(f"SELECT marks FROM results WHERE name = '{name}'").fetchall())
      `, { predict: ["OperationalError", "[(77,)]\n[(77,)]", "[]"], answer: 0, error: true }),
      md`
        The first query is safe and finds D'Souza. The f-string query becomes «WHERE name = 'D'Souza'», which SQLite cannot read. Keep the SQL text fixed, and give every value with «?».
      `,
      pause(md`Good place for a break. Next: counting and averaging.`),
      md`
        ## Counting and averaging

        SQL can total for you. «COUNT(*)» counts rows, «AVG(marks)» averages, and «MAX» and «MIN» find the biggest and smallest. «GROUP BY city» does the sums once for each city. Guess the output.
      `,
      ex(py`
        import sqlite3

        con = sqlite3.connect(":memory:")
        con.execute("CREATE TABLE results (name TEXT, city TEXT, marks INTEGER)")
        con.executemany("INSERT INTO results VALUES (?, ?, ?)", [
            ("Asha", "Pune", 72), ("Ravi", "Delhi", 65), ("Meena", "Pune", 81),
        ])
        print(con.execute("SELECT COUNT(*), MAX(marks) FROM results").fetchone())
        for city, n, avg in con.execute("SELECT city, COUNT(*), AVG(marks) FROM results GROUP BY city ORDER BY city"):
            print(city, n, avg)
      `, { predict: ["(3, 81)\nDelhi 1 65.0\nPune 2 76.5", "(3, 81)\nPune 2 76.5\nDelhi 1 65.0", "3 81\nDelhi 1 65\nPune 2 76.5"], answer: 0 }),
      md`
        «AVG» always gives a decimal number, so 65 becomes «65.0». With «GROUP BY», each group comes back as one row.
      `,
      tip(md`Change rows with «UPDATE results SET marks = ? WHERE name = ?», and remove them with «DELETE FROM results WHERE name = ?». Forget the «WHERE», and every row is changed or removed.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          import sqlite3

          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE t (name TEXT, n INTEGER)")
          con.executemany("INSERT INTO t VALUES (?, ?)", [("a", 5), ("b", 9), ("c", 2)])
          print(con.execute("SELECT name FROM t WHERE n > 3 ORDER BY n").fetchall())
        `, options: ["[('a',), ('b',)]", "[('b',), ('a',)]", "[('c',), ('a',), ('b',)]"], answer: 0,
        explain: md`«WHERE n > 3» keeps a and b. «ORDER BY n» sorts from smallest, so 5 comes before 9.`,
        why: [null, md`That would need «DESC».`, md`«WHERE» left c out: 2 is not more than 3.`],
        skill: "trace" },
      { q: md`What does this query ask for?`, code: py`
          "SELECT city, COUNT(*) FROM results GROUP BY city"
        `, options: ["Each city once, with how many rows it has", "Every row, with its city", "The number of cities"],
        answer: 0, verify: false, mono: false,
        explain: md`«GROUP BY city» makes one group for each city, and «COUNT(*)» counts the rows in each group.`,
        why: [null, md`«GROUP BY» joins the rows of a city into one.`, md`That would be one number. Here each city gets its own count.`],
        skill: "read" },
      { q: md`A search works for most names, but crashes with an OperationalError for «D'Souza». What is the cause?`,
        options: ["The name was pasted into the SQL with an f-string, so its «'» breaks the SQL", "SQLite cannot store an apostrophe", "The table needs a TEXT column for names"], answer: 0, verify: false, mono: false,
        explain: md`Give the name with «?» instead. SQLite then handles any character safely.`,
        why: [null, md`It stores one fine when the value goes in with «?».`, md`The column type is not the problem. The SQL text is.`],
        skill: "debug" },
      { q: md`What does «DESC» do in «ORDER BY marks DESC»?`,
        options: ["It sorts from biggest to smallest", "It removes rows with the same marks", "It keeps only the first row"], answer: 0, verify: false, mono: false,
        explain: md`Without it, «ORDER BY» sorts from smallest to biggest.`,
        why: [null, md`«ORDER BY» never removes rows.`, md`That is what «LIMIT 1» does.`],
        skill: "memory" },
      { q: md`You need the average marks for each city from a big results table. What is the best way?`,
        options: ["Ask SQLite with «AVG(marks)» and «GROUP BY city»", "Read every row into Python and total each city in a loop", "Make a separate table for each city"], answer: 0, verify: false, mono: false,
        explain: md`The database does the work and hands back one short row for each city.`,
        why: [null, md`That works, but it is longer and slower than one query.`, md`One table with a city column is easier to ask questions of.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: the top scorers",
        task: md`Answer each question without running the program.`,
        code: py`
          import sqlite3

          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE results (name TEXT, marks INTEGER)")
          con.executemany("INSERT INTO results VALUES (?, ?)", [("Asha", 72), ("Ravi", 65), ("Meena", 81), ("Om", 40)])
          top = con.execute("SELECT name FROM results WHERE marks > 60 ORDER BY marks DESC").fetchall()
          low = con.execute("SELECT MIN(marks) FROM results").fetchone()[0]
          print(top[0][0], len(top), low)
        `,
        ask: [{ line: 6, name: "top" }, { output: true }],
        hints: [
          md`«WHERE marks > 60» keeps three people. Om's 40 is left out.`,
          md`«DESC» puts the biggest marks first: Meena, then Asha, then Ravi.`,
          md`«MIN» looks at every row, because that query has no «WHERE».`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: city groups",
        task: md`Answer each question without running the program.`,
        code: py`
          import sqlite3

          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE results (city TEXT, marks INTEGER)")
          con.executemany("INSERT INTO results VALUES (?, ?)", [("Pune", 70), ("Agra", 50), ("Pune", 90), ("Agra", 60)])
          groups = con.execute("SELECT city, AVG(marks) FROM results GROUP BY city ORDER BY city").fetchall()
          print(groups[1])
          print(con.execute("SELECT COUNT(*) FROM results WHERE city = ?", ("Agra",)).fetchone())
        `,
        ask: [{ line: 6, name: "groups" }, { output: true }],
        hints: [
          md`There are two cities, so there are two groups, sorted by name: Agra first.`,
          md`Agra's average is (50 + 60) / 2, and «AVG» gives a decimal: «55.0».`,
          md`«COUNT(*)» comes back in a one-item tuple.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: one city's students",
        task: md`
          Put the lines in order. The program asks for a city and prints the names from that city, highest marks first. For «Pune» it prints:

          | Meena
          | Asha
        `,
        solution: py`
          import sqlite3
          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE results (name TEXT, city TEXT, marks INTEGER)")
          con.executemany("INSERT INTO results VALUES (?, ?, ?)", [("Asha", "Pune", 72), ("Ravi", "Delhi", 65), ("Meena", "Pune", 81)])
          city = input("City: ")
          for (name,) in con.execute("SELECT name FROM results WHERE city = ? ORDER BY marks DESC", (city,)):
              print(name)
        `,
        distractors: ['for (name,) in con.execute(f"SELECT name FROM results WHERE city = {city} ORDER BY marks DESC"):'],
        tests: [{ inputs: ["Pune"], output: "Meena\nAsha" }, { inputs: ["Delhi"], output: "Ravi" }],
        hints: [
          md`If you see «no such column: Pune», the city was pasted into the SQL. Give it with «?» and a tuple.`,
          md`If you see a NameError for city, the input line must come before the query.`,
          md`If Asha comes first, the query that sorts with «DESC» is not the one in your loop.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the name that breaks the search",
        task: md`
          The program asks for a name and prints that person's marks. It works for «Ravi», but for «D'Souza» it should print «D'Souza: 77», and it stops with an OperationalError instead. Tap the line that causes it, then fix it.
        `,
        starter: py`
          import sqlite3

          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE results (name TEXT, marks INTEGER)")
          con.executemany("INSERT INTO results VALUES (?, ?)", [("D'Souza", 77), ("Ravi", 65)])
          name = input("Name: ")
          row = con.execute(f"SELECT marks FROM results WHERE name = '{name}'").fetchone()
          if row is None:
              print("Not found")
          else:
              print(name + ":", row[0])
        `,
        bugLines: [7],
        solution: py`
          import sqlite3

          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE results (name TEXT, marks INTEGER)")
          con.executemany("INSERT INTO results VALUES (?, ?)", [("D'Souza", 77), ("Ravi", 65)])
          name = input("Name: ")
          row = con.execute("SELECT marks FROM results WHERE name = ?", (name,)).fetchone()
          if row is None:
              print("Not found")
          else:
              print(name + ":", row[0])
        `,
        tests: [
          { inputs: ["D'Souza"], output: "D'Souza: 77" },
          { inputs: ["Ravi"], output: "Ravi: 65" },
          { inputs: ["Om"], output: "Not found" },
          { avoids: ["fstring"] },
        ],
        wrong: [py`
          import sqlite3

          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE results (name TEXT, marks INTEGER)")
          con.executemany("INSERT INTO results VALUES (?, ?)", [("D'Souza", 77), ("Ravi", 65)])
          name = input("Name: ")
          row = con.execute("SELECT marks FROM results WHERE name = ?", (name)).fetchone()
          if row is None:
              print("Not found")
          else:
              print(name + ":", row[0])
        `],
        hints: [
          md`The «'» inside D'Souza ends the SQL text early. Values must never be pasted into the SQL.`,
          md`Put a «?» where the name goes, and give «(name,)» after the SQL.`,
          md`If you see «Incorrect number of bindings», the comma is missing: «(name)» is plain text, not a tuple.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: the top three",
        task: md`
          The program lists everyone in the order they were added. Change the query so it lists only the top three, highest marks first:

          | Meena 81
          | Kiran 77
          | Asha 72
        `,
        starter: py`
          import sqlite3

          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE results (name TEXT, marks INTEGER)")
          con.executemany("INSERT INTO results VALUES (?, ?)", [("Asha", 72), ("Ravi", 65), ("Meena", 81), ("Om", 40), ("Kiran", 77)])
          for name, marks in con.execute("SELECT name, marks FROM results"):
              print(name, marks)
        `,
        solution: py`
          import sqlite3

          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE results (name TEXT, marks INTEGER)")
          con.executemany("INSERT INTO results VALUES (?, ?)", [("Asha", 72), ("Ravi", 65), ("Meena", 81), ("Om", 40), ("Kiran", 77)])
          for name, marks in con.execute("SELECT name, marks FROM results ORDER BY marks DESC LIMIT 3"):
              print(name, marks)
        `,
        tests: [{ output: "Meena 81\nKiran 77\nAsha 72" }],
        wrong: [py`
          import sqlite3

          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE results (name TEXT, marks INTEGER)")
          con.executemany("INSERT INTO results VALUES (?, ?)", [("Asha", 72), ("Ravi", 65), ("Meena", 81), ("Om", 40), ("Kiran", 77)])
          for name, marks in con.execute("SELECT name, marks FROM results ORDER BY marks LIMIT 3"):
              print(name, marks)
        `],
        hints: [
          md`If Om comes first, the sort goes from smallest. Add «DESC».`,
          md`If all five are listed, add «LIMIT 3» at the end of the query.`,
          md`If you see a syntax error, the order must be «ORDER BY», then «LIMIT».`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: the city report",
        task: md`
          From a blank page. Ask for results on one line, each as «name,city,marks», split by «;». Store them in a table. Then let SQLite group them by city, sorted by city name. For each city print its count and its average marks, rounded to 1 place. Last, print how many people scored 60 or more, counted by a «WHERE» query. For «Asha,Pune,72;Ravi,Delhi,65;Meena,Pune,81;Om,Agra,40» it shows:

          | Agra: 1 student(s), average 40.0
          | Delhi: 1 student(s), average 65.0
          | Pune: 2 student(s), average 76.5
          | Passed: 3
        `,
        starter: py``,
        solution: py`
          import sqlite3

          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE results (name TEXT, city TEXT, marks INTEGER)")
          rows = []
          for part in input("Results: ").split(";"):
              name, city, marks = part.split(",")
              rows.append((name, city, int(marks)))
          con.executemany("INSERT INTO results VALUES (?, ?, ?)", rows)
          query = "SELECT city, COUNT(*), AVG(marks) FROM results GROUP BY city ORDER BY city"
          for city, n, avg in con.execute(query):
              print(f"{city}: {n} student(s), average {round(avg, 1)}")
          passed = con.execute("SELECT COUNT(*) FROM results WHERE marks >= ?", (60,)).fetchone()[0]
          print("Passed:", passed)
        `,
        tests: [
          { inputs: ["Asha,Pune,72;Ravi,Delhi,65;Meena,Pune,81;Om,Agra,40"], output: "Agra: 1 student(s), average 40.0\nDelhi: 1 student(s), average 65.0\nPune: 2 student(s), average 76.5\nPassed: 3" },
          { inputs: ["A,X,50;B,X,61;C,X,66"], output: "X: 3 student(s), average 59.0\nPassed: 2" },
          { inputs: ["Ira,Goa,30;Jo,Goa,100"], output: "Goa: 2 student(s), average 65.0\nPassed: 1" },
        ],
        wrong: [py`
          import sqlite3

          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE results (name TEXT, city TEXT, marks TEXT)")
          rows = []
          for part in input("Results: ").split(";"):
              name, city, marks = part.split(",")
              rows.append((name, city, marks))
          con.executemany("INSERT INTO results VALUES (?, ?, ?)", rows)
          query = "SELECT city, COUNT(*), AVG(marks) FROM results GROUP BY city ORDER BY city"
          for city, n, avg in con.execute(query):
              print(f"{city}: {n} student(s), average {round(avg, 1)}")
          passed = con.execute("SELECT COUNT(*) FROM results WHERE marks >= ?", ("60",)).fetchone()[0]
          print("Passed:", passed)
        `],
        hints: [
          md`If Jo's 100 is not counted as passed, the marks are stored as text, where «100» comes before «60». Turn them into whole numbers before they go in.`,
          md`If the cities come out in the order they were typed, add «ORDER BY city» after «GROUP BY city».`,
          md`If the average shows many decimal places, use «round(avg, 1)».`,
        ],
      },
    ],
    keys: [
      md`«WHERE» keeps matching rows; join tests with «AND» and «OR». In SQL, equal is one «=».`,
      md`«ORDER BY col» sorts, «DESC» from biggest, and «LIMIT n» keeps the first n.`,
      md`«COUNT(*)», «AVG», «MAX» and «MIN» total for you; «GROUP BY col» does it once for each group.`,
      md`Never build SQL with an f-string. Give every value with «?», or a «'» breaks the SQL and SQL injection becomes possible.`,
    ],
  });

  // ---------------------------------------------------------------- Day 123
  day({
    slug: "unittest-files",
    title: "Proper Tests with unittest",
    goal: "Write test classes with unittest and read the report.",
    minutes: 45,
    needs: [73, 117],
    win: "Today you can now write proper tests with unittest, run them all at once and read the report.",
    learn: [
      md`
        ## A test class

        On Day 73 you checked functions with «assert». Real projects keep their checks in **test classes**, using **unittest**, which comes with Python. Make a class that inherits from «unittest.TestCase». Each method whose name starts with «test_» is one test. «unittest.main()» finds every test and runs it. Run this one.
      `,
      ex(py`
        import unittest

        def price_after(price, off):
            return price - price * off / 100

        class TestPrice(unittest.TestCase):
            def test_ten_off(self):
                self.assertEqual(price_after(500, 10), 450)

            def test_no_off(self):
                self.assertEqual(price_after(500, 0), 500)

        unittest.main()
      `),
      md`
        - «self.assertEqual(a, b)» checks that a equals b. Put what the function gave first, and what you expect second.
        - The report starts with one mark for each test: «.» means it passed.
        - «Ran 2 tests» counts them, and «OK» means every one passed. The time it took can differ.
        - The tests run in A to Z order of their names, not the order you wrote them.
      `,
      md`
        ## When a test fails

        Now the function has a mistake: it divides by 10, not 100. Run it and read the report.
      `,
      ex(py`
        import unittest

        def price_after(price, off):
            return price - price * off / 10

        class TestPrice(unittest.TestCase):
            def test_ten_off(self):
                self.assertEqual(price_after(500, 10), 450)

            def test_no_off(self):
                self.assertEqual(price_after(500, 0), 500)

        unittest.main()
      `),
      md`
        Read the report from the top:

        - «.F» says the first test passed and the second failed. test_no_off comes first, because N comes before T.
        - «FAIL: test_ten_off» names the failing test, and the line shows the check that failed.
        - «AssertionError: 0.0 != 450» means the function gave 0.0, but the test expected 450.
        - «FAILED (failures=1)» is the total. One clear test name tells you where to look.
      `,
      pause(md`Good place for a break. Next: more kinds of checks.`),
      md`
        ## More kinds of checks

        - «assertTrue(x)» and «assertFalse(x)» check a True or False answer.
        - «assertIn(item, box)» checks that something is in a list, text or dictionary.
        - «with self.assertRaises(ValueError):» checks that the lines inside it raise that error. The test fails if they do not.

        Run this one.
      `,
      ex(py`
        import unittest

        def passed(marks):
            if not 0 <= marks <= 100:
                raise ValueError("marks must be 0 to 100")
            return marks >= 40

        class TestPassed(unittest.TestCase):
            def test_pass(self):
                self.assertTrue(passed(72))

            def test_edge(self):
                self.assertTrue(passed(40))
                self.assertFalse(passed(39))

            def test_too_big(self):
                with self.assertRaises(ValueError):
                    passed(120)

        unittest.main()
      `),
      md`
        Test the edges, like 39 and 40, where mistakes hide. A test with two checks stops at the first one that fails.
      `,
      tip(md`On a laptop, end a program with «if __name__ == "__main__":» and «unittest.main()» under it. Keep tests in files named like «test_prices.py», and «python -m unittest» runs them all.`),
    ],
    quiz: [
      { q: md`In what order does unittest run these tests?`, code: py`
          class TestCart(unittest.TestCase):
              def test_total(self): ...
              def test_empty(self): ...
              def test_add(self): ...
        `, options: ["test_add, test_empty, test_total", "test_total, test_empty, test_add", "All three at the same time"],
        answer: 0, verify: false, mono: false,
        explain: md`unittest sorts the tests A to Z by name: add, empty, total.`,
        why: [null, md`That is the order they were written. unittest sorts them by name.`, md`They run one after another.`],
        skill: "trace" },
      { q: md`A report says «FAIL: test_ten_off» and «AssertionError: 0.0 != 450». The test was «self.assertEqual(price_after(500, 10), 450)». What does it mean?`,
        options: ["«price_after(500, 10)» gave 0.0, but the test expected 450", "The test expected 0.0, but got 450", "The test has a typing mistake"], answer: 0, verify: false, mono: false,
        explain: md`The first value is what the function gave, the second is what the test expected.`,
        why: [null, md`The order is the other way round: the function's answer comes first.`, md`A typing mistake would stop the program with a SyntaxError.`],
        skill: "read" },
      { q: md`Your test class has a method «check_total», but the report says «Ran 0 tests». Why?`,
        options: ["unittest only runs methods whose names start with «test_»", "«check_total» needs a «return»", "The class needs «__init__»"], answer: 0, verify: false, mono: false,
        explain: md`Rename it «test_total», and unittest finds it.`,
        why: [null, md`Tests do not return anything. They check with «self.assert...».`, md`A TestCase class does not need «__init__».`],
        skill: "debug" },
      { q: md`What does «with self.assertRaises(ValueError):» do?`,
        options: ["The test passes only if the lines inside it raise a ValueError", "It hides any ValueError so the test always passes", "It raises a ValueError"], answer: 0, verify: false, mono: false,
        explain: md`It proves that a bad value is refused. If no ValueError comes, the test fails.`,
        why: [null, md`It does the opposite of hiding: no error means a failed test.`, md`It waits for one. Your function raises it.`],
        skill: "memory" },
      { q: md`You want to prove that «passed(-5)» refuses the value with a ValueError. Which test is right?`,
        options: ["«with self.assertRaises(ValueError):», then «passed(-5)» inside it", "«self.assertEqual(passed(-5), ValueError)»", "«self.assertFalse(passed(-5))»"], answer: 0, verify: false, mono: false,
        explain: md`The error is raised, not returned, so it must be caught by «assertRaises».`,
        why: [null, md`The error stops «passed(-5)» before anything is returned, so the test errors out.`, md`The same: the error comes before any answer.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: the pass mark",
        task: md`
          Answer each question without running the program. Then run it: one test fails. Is the mistake in «grade», or in the test?
        `,
        code: py`
          import unittest

          def grade(marks):
              if marks >= 40:
                  return "Pass"
              return "Fail"

          class TestGrade(unittest.TestCase):
              def test_pass(self):
                  got = grade(72)
                  self.assertEqual(got, "Pass")

              def test_edge(self):
                  got = grade(40)
                  self.assertEqual(got, "Fail")

          unittest.main()
        `,
        ask: [{ line: 10, name: "got" }, { line: 14, name: "got" }],
        hints: [
          md`72 is at least 40, so the first «got» is «'Pass'».`,
          md`40 is also at least 40, because «>=» lets the edge in.`,
          md`The test expects «'Fail'» for 40, so the test is the one that is wrong, if 40 passes.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: which test goes first?",
        task: md`Answer each question without running the program. The function runs once for each test.`,
        code: py`
          import unittest

          def half(n):
              result = n // 2
              return result

          class TestHalf(unittest.TestCase):
              def test_odd(self):
                  self.assertEqual(half(7), 3)

              def test_even(self):
                  self.assertEqual(half(8), 4)

          unittest.main()
        `,
        ask: [{ line: 4, hit: 1, name: "result" }, { line: 4, hit: 2, name: "result" }],
        hints: [
          md`unittest runs the tests A to Z by name, not in the order they are written.`,
          md`E comes before O, so test_even runs first, with 8.`,
          md`Then test_odd runs with 7, and «7 // 2» drops the half.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: two tests for square",
        task: md`
          Put the lines in order: a function, a test class with two tests, and the line that runs them. Both tests should pass.
        `,
        solution: py`
          import unittest
          def square(n):
              return n * n
          class TestSquare(unittest.TestCase):
              def test_three(self):
                  self.assertEqual(square(3), 9)
              def test_negative(self):
                  self.assertEqual(square(-4), 16)
          unittest.main()
        `,
        distractors: ["    def check_negative(self):"],
        tests: [{ py: py`
          r = unit("TestSquare")
          assert r.testsRun == 2, f"unittest found {r.testsRun} test(s) in TestSquare, but there should be 2. Test names must start with «test_»."
          assert r.wasSuccessful(), "A test in TestSquare fails. Check that each check sits under its own test."
        ` }],
        hints: [
          md`If unittest finds only 1 test, a method name does not start with «test_».`,
          md`If you see «no tests» or a NameError for unittest, the import must come first.`,
          md`If you see an IndentationError, each «self.assertEqual» goes one step in from its «def».`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the test that never runs",
        task: md`
          The class has two tests, but the report says «Ran 1 test». The big-order test never runs, so nobody would notice if the big-order fee broke. Tap the line that causes it, then fix it. Both tests should run and pass.
        `,
        starter: py`
          import unittest

          def delivery_fee(total):
              if total >= 500:
                  return 0
              return 40

          class TestFee(unittest.TestCase):
              def test_small_order(self):
                  self.assertEqual(delivery_fee(200), 40)

              def check_big_order(self):
                  self.assertEqual(delivery_fee(500), 0)

          unittest.main()
        `,
        bugLines: [12],
        solution: py`
          import unittest

          def delivery_fee(total):
              if total >= 500:
                  return 0
              return 40

          class TestFee(unittest.TestCase):
              def test_small_order(self):
                  self.assertEqual(delivery_fee(200), 40)

              def test_big_order(self):
                  self.assertEqual(delivery_fee(500), 0)

          unittest.main()
        `,
        tests: [{ py: py`
          r = unit("TestFee")
          assert r.testsRun == 2, f"unittest ran {r.testsRun} test(s) in TestFee, but there are 2. Its names must start with «test_», in small letters."
          assert r.wasSuccessful(), "A test in TestFee fails. The fee rules are right, so change only the test's name."
          expect("delivery_fee", [499], 40)
          expect("delivery_fee", [500], 0)
        ` }],
        wrong: [py`
          import unittest

          def delivery_fee(total):
              if total >= 500:
                  return 0
              return 40

          class TestFee(unittest.TestCase):
              def test_small_order(self):
                  self.assertEqual(delivery_fee(200), 40)

              def Test_big_order(self):
                  self.assertEqual(delivery_fee(500), 0)

          unittest.main()
        `],
        hints: [
          md`unittest only runs methods whose names start with «test_».`,
          md`Rename the big-order method. Nothing else needs to change.`,
          md`If it still says «Ran 1 test», check the capital letter: «Test_» is not «test_».`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: test the refusal",
        task: md`
          «passed» refuses marks below 0 with a ValueError, but no test checks that. Add a third test, «test_negative», that proves «passed(-5)» raises a ValueError. All three tests should pass.
        `,
        starter: py`
          import unittest

          def passed(marks):
              if marks < 0:
                  raise ValueError("marks cannot be below 0")
              return marks >= 40

          class TestPassed(unittest.TestCase):
              def test_pass(self):
                  self.assertTrue(passed(40))

              def test_fail(self):
                  self.assertFalse(passed(39))

          unittest.main()
        `,
        solution: py`
          import unittest

          def passed(marks):
              if marks < 0:
                  raise ValueError("marks cannot be below 0")
              return marks >= 40

          class TestPassed(unittest.TestCase):
              def test_pass(self):
                  self.assertTrue(passed(40))

              def test_fail(self):
                  self.assertFalse(passed(39))

              def test_negative(self):
                  with self.assertRaises(ValueError):
                      passed(-5)

          unittest.main()
        `,
        tests: [{ py: py`
          r = unit("TestPassed")
          assert r.testsRun == 3, f"unittest ran {r.testsRun} test(s), but there should be 3. Add a method called «test_negative»."
          assert r.wasSuccessful(), "A test fails or errors. A ValueError must happen inside «with self.assertRaises(ValueError):»."
          def lenient(marks):
              return marks >= 40
          r = unit("TestPassed", passed=lenient)
          assert not r.wasSuccessful(), "I tried a «passed» that never raises a ValueError, and your tests still passed. Your new test must fail when no error comes."
        ` }],
        wrong: [py`
          import unittest

          def passed(marks):
              if marks < 0:
                  raise ValueError("marks cannot be below 0")
              return marks >= 40

          class TestPassed(unittest.TestCase):
              def test_pass(self):
                  self.assertTrue(passed(40))

              def test_fail(self):
                  self.assertFalse(passed(39))

              def test_negative(self):
                  self.assertRaises(ValueError)

          unittest.main()
        `],
        hints: [
          md`If the test errors with a ValueError, the call is not inside «with self.assertRaises(ValueError):».`,
          md`If a «passed» that never raises still passes your tests, your new test never calls «passed(-5)». Put the call inside the «with».`,
          md`If unittest ran only 2 tests, the new method's name must start with «test_».`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: ticket prices, with tests",
        task: md`
          From a blank page. Write «ticket(age)»: under 12 pays 50, 12 to 59 pays 100, and 60 or more pays 70. An age below 0 raises a ValueError. Then write a test class «TestTicket» with at least three tests, and end with «unittest.main()». Test the edges, 11 and 12, and 59 and 60, and the ValueError.

          I will also try broken copies of «ticket» against your tests. Good tests fail for every broken copy.
        `,
        starter: py``,
        solution: py`
          import unittest

          def ticket(age):
              if age < 0:
                  raise ValueError("age cannot be below 0")
              if age < 12:
                  return 50
              if age < 60:
                  return 100
              return 70

          class TestTicket(unittest.TestCase):
              def test_child(self):
                  self.assertEqual(ticket(11), 50)
                  self.assertEqual(ticket(0), 50)

              def test_adult(self):
                  self.assertEqual(ticket(12), 100)
                  self.assertEqual(ticket(59), 100)

              def test_senior(self):
                  self.assertEqual(ticket(60), 70)

              def test_bad_age(self):
                  with self.assertRaises(ValueError):
                      ticket(-1)

          unittest.main()
        `,
        tests: [
          { py: py`
          expect("ticket", [0], 50)
          expect("ticket", [11], 50)
          expect("ticket", [12], 100)
          expect("ticket", [59], 100)
          expect("ticket", [60], 70)
          try:
              ticket(-1)
          except ValueError:
              pass
          else:
              raise AssertionError("«ticket(-1)» should raise a ValueError, but it did not.")
          r = unit("TestTicket")
          assert r.testsRun >= 3, f"TestTicket has {r.testsRun} test(s). Write at least 3, each named «test_...»."
          assert r.wasSuccessful(), "A test in TestTicket fails on your own ticket. Check what each test expects."
          ` },
          { py: py`
          def late_adult(age):
              if age < 0:
                  raise ValueError("age cannot be below 0")
              if age <= 12:
                  return 50
              if age < 60:
                  return 100
              return 70
          assert not unit("TestTicket", ticket=late_adult).wasSuccessful(), "I tried a ticket that charges a 12-year-old 50, and your tests still passed. Test age 12."
          def late_senior(age):
              if age < 0:
                  raise ValueError("age cannot be below 0")
              if age < 12:
                  return 50
              if age <= 60:
                  return 100
              return 70
          assert not unit("TestTicket", ticket=late_senior).wasSuccessful(), "I tried a ticket that charges a 60-year-old 100, and your tests still passed. Test age 60."
          def no_check(age):
              if age < 12:
                  return 50
              if age < 60:
                  return 100
              return 70
          assert not unit("TestTicket", ticket=no_check).wasSuccessful(), "I tried a ticket that never raises a ValueError, and your tests still passed. Test a negative age with «assertRaises»."
          ` },
          { uses: ["method:main"], msg: "End the program with «unittest.main()», so the tests run." },
        ],
        wrong: [py`
          import unittest

          def ticket(age):
              if age < 0:
                  raise ValueError("age cannot be below 0")
              if age < 12:
                  return 50
              if age < 60:
                  return 100
              return 70

          class TestTicket(unittest.TestCase):
              def test_child(self):
                  self.assertEqual(ticket(5), 50)

              def test_adult(self):
                  self.assertEqual(ticket(30), 100)

              def test_senior(self):
                  self.assertEqual(ticket(75), 70)

          unittest.main()
        `],
        hints: [
          md`If a ticket that charges a 12-year-old 50 passes your tests, test the edge: «ticket(12)» should be 100.`,
          md`If a ticket that charges a 60-year-old 100 passes, add a check that «ticket(60)» is 70.`,
          md`If a ticket that never refuses passes, add a test with «with self.assertRaises(ValueError):» and a negative age inside.`,
        ],
      },
    ],
    keys: [
      md`A test class inherits from «unittest.TestCase». Each method named «test_...» is one test.`,
      md`«assertEqual(got, expected)», «assertTrue», «assertFalse» and «assertIn» check answers.`,
      md`«with self.assertRaises(ValueError):» passes only if the lines inside raise that error.`,
      md`«unittest.main()» runs every test in A to Z order. «.» is a pass, «F» a fail, and «OK» means all passed.`,
      md`Read a failure from its test name and its «AssertionError» line: what the function gave, then what was expected.`,
    ],
  });

  // ---------------------------------------------------------------- Day 124
  day({
    slug: "type-hints",
    title: "Type Hints: Saying What Kind",
    goal: "Add type hints to functions, and read them in other people's code.",
    minutes: 40,
    needs: [88, 116],
    win: "Today you can now add type hints to your functions, and read them in other people's code.",
    learn: [
      md`
        ## Saying what kind

        A **type hint** says what kind of value a function takes and gives back. Write «: int» after a parameter, and «-> int» before the colon of the «def». You met hints on Day 116: a dataclass needs them for its fields. Hints are notes for people and tools. **Python does not check them.** Guess the output.
      `,
      ex(py`
        def add(a: int, b: int) -> int:
            return a + b

        print(add(2, 3))
        print(add("2", "3"))
      `, { predict: ["5\n23", "5\nTypeError", "5\n5"], answer: 0 }),
      md`
        - «a: int» says a should be a whole number. «-> int» says the function gives back a whole number.
        - Python still runs «add("2", "3")», and joins the text: «23». The hint did not stop it.
        - Editors read hints, and warn you about mistakes like this as you type. Laptop tools such as **mypy** check a whole program.
        - A function that gives nothing back is marked «-> None».
      `,
      md`
        ## What is inside

        Hints can say what a list or dictionary holds. «list[int]» is a list of whole numbers. «dict[str, int]» has text keys and whole-number values. Guess the output.
      `,
      ex(py`
        def totals(marks: dict[str, list[int]]) -> dict[str, int]:
            return {name: sum(nums) for name, nums in marks.items()}

        result = totals({"Asha": [30, 42], "Ravi": [25, 40]})
        print(result)
        print(totals.__annotations__["return"])
      `, { predict: ["{'Asha': 72, 'Ravi': 65}\ndict[str, int]", "{'Asha': [30, 42], 'Ravi': [25, 40]}\ndict[str, int]", "{'Asha': 72, 'Ravi': 65}\nint"], answer: 0 }),
      md`
        The hint is a short description of the data: a dictionary from names to lists of marks goes in, and names with totals come out. Python keeps the hints in «__annotations__», but you rarely need to look there.
      `,
      pause(md`Good place for a break. Next: answers that might be missing.`),
      md`
        ## Maybe nothing: | None

        Some functions give back an answer only when they find one. «int | None» means: a whole number, or None. When you read that hint, check for None before you use the answer. Guess the output.
      `,
      ex(py`
        def find_marks(results: dict[str, int], name: str) -> int | None:
            if name in results:
                return results[name]
            return None

        results = {"Asha": 72, "Ravi": 65}
        for name in ["Ravi", "Om"]:
            marks = find_marks(results, name)
            if marks is None:
                print(name, "not found")
            else:
                print(name, marks + 5)
      `, { predict: ["Ravi 70\nOm not found", "Ravi 70\nTypeError", "Ravi 65\nOm not found"], answer: 0 }),
      md`
        Without the «is None» check, «None + 5» would stop the program with a TypeError. The hint warned you.
      `,
      tip(md`Hints matter most at the edges of your code: function parameters and returns, and dataclass fields. Inside a function, Python can usually tell, and so can you.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          def double(n: int) -> int:
              return n * 2

          print(double("ab"))
        `, options: ["abab", "TypeError", "None"], answer: 0,
        explain: md`Python does not check hints, and text times 2 repeats the text.`,
        why: [null, md`Hints never raise errors. An editor or mypy would warn, but Python just runs it.`, md`The function returns «n * 2», which is «'abab'».`],
        skill: "trace" },
      { q: md`What does this function take, and what does it give back?`, code: py`
          def toppers(marks: dict[str, int], pass_mark: int) -> list[str]:
              ...
        `, options: ["A dictionary of names to marks and a whole number; it gives back a list of text", "A list of names and a number; it gives back a dictionary", "Two whole numbers; it gives back text"],
        answer: 0, verify: false, mono: false,
        explain: md`«dict[str, int]» has text keys and number values. «-> list[str]» is a list of text, probably names.`,
        why: [null, md`The first parameter is a dictionary, and the answer is a list.`, md`Only «pass_mark» is a whole number.`],
        skill: "read" },
      { q: md`«def best(scores: list[int]) -> int | None:» is used as «best(s) + 1», and stops with «TypeError: unsupported operand type(s) for +: 'NoneType' and 'int'». What is the fix?`,
        options: ["Check «if answer is None» before adding, because the hint says it can give back None", "Change the hint to «-> int»", "Change «+ 1» to «+ 1.0»"], answer: 0, verify: false, mono: false,
        explain: md`For an empty list there is no best score, so «best» gives back None. Handle that case.`,
        why: [null, md`Changing the hint changes nothing: Python does not check hints.`, md`None cannot be added to any number.`],
        skill: "debug" },
      { q: md`What does Python do when a function hinted «(n: int)» is called with text?`,
        options: ["It runs the function anyway", "It raises a TypeError at once", "It turns the text into a number"], answer: 0, verify: false, mono: false,
        explain: md`Hints are notes for people and tools. Python itself ignores them when it runs.`,
        why: [null, md`Only an error inside the function, if any, would stop it.`, md`Python never changes your values to match a hint.`],
        skill: "memory" },
      { q: md`A function looks up a phone number by name, and may not find one. Which hint fits its answer?`,
        options: ["«-> str | None»", "«-> str»", "«-> None»"], answer: 0, verify: false, mono: false,
        explain: md`«str | None» tells everyone who calls it to check for None.`,
        why: [null, md`That promises a number every time, which is not true.`, md`That means it never gives back anything.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: hints do not check",
        task: md`Answer each question without running the program.`,
        code: py`
          def join_all(words: list[str], sep: str) -> str:
              text = sep.join(words)
              return text

          a = join_all(["chai", "vada"], "+")
          b = join_all("abc", "-")
          print(a, b)
        `,
        ask: [{ line: 2, hit: 1, name: "text" }, { output: true }],
        hints: [
          md`The first call joins two words with «+».`,
          md`Python does not check the hint, so the second call gets the text «abc».`,
          md`«join» goes over text one letter at a time: a, b and c.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: maybe a position",
        task: md`Answer each question without running the program.`,
        code: py`
          def position(names: list[str], target: str) -> int | None:
              for i, name in enumerate(names):
                  if name == target:
                      return i
              return None

          names = ["Asha", "Ravi", "Meena"]
          p = position(names, "Meena")
          q = position(names, "Om")
          print(p, q)
        `,
        ask: [{ line: 8, name: "p" }, { output: true }],
        hints: [
          md`«enumerate» counts from 0, so Meena is at position 2.`,
          md`Om is not in the list, so the loop ends and the function gives back None.`,
          md`«print» shows None as «None».`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: a hinted average",
        task: md`
          Put the lines in order. «average» takes a list of whole numbers and gives back a decimal. The program prints:

          | 68.5
        `,
        solution: py`
          def average(marks: list[int]) -> float:
              total = sum(marks)
              return total / len(marks)
          print(average([72, 65]))
        `,
        distractors: ["def average(marks: list[int]) -> float"],
        tests: [{ output: "68.5" }, { py: py`
          ann = need("average", "function").__annotations__
          assert ann.get("marks") == list[int] and ann.get("return") == float, "«average» should keep its hints: «marks: list[int]» and «-> float»."
        ` }],
        hints: [
          md`If you see a SyntaxError on the «def», the line needs its colon at the end.`,
          md`If you see a NameError for total, the line that makes it must come before the return.`,
          md`If nothing is printed, the «print» line must be outside the function, not indented.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the missing student",
        task: md`
          The program asks for a name and prints that student's marks plus 5 grace marks. For «Ravi» it prints «Ravi: 70». For «Om», who is not in the list, it should print «Om: not found», but it stops with a TypeError. The hint on «find_marks» warned about this. Tap the line that causes it, then fix it.
        `,
        starter: py`
          def find_marks(results: dict[str, int], name: str) -> int | None:
              if name in results:
                  return results[name]
              return None

          results = {"Asha": 72, "Ravi": 65, "Kiran": 0}
          name = input("Name: ")
          marks = find_marks(results, name)
          print(f"{name}: {marks + 5}")
        `,
        bugLines: [9],
        solution: py`
          def find_marks(results: dict[str, int], name: str) -> int | None:
              if name in results:
                  return results[name]
              return None

          results = {"Asha": 72, "Ravi": 65, "Kiran": 0}
          name = input("Name: ")
          marks = find_marks(results, name)
          if marks is None:
              print(f"{name}: not found")
          else:
              print(f"{name}: {marks + 5}")
        `,
        tests: [
          { inputs: ["Ravi"], output: "Ravi: 70" },
          { inputs: ["Om"], output: "Om: not found" },
          { inputs: ["Asha"], output: "Asha: 77" },
          { inputs: ["Kiran"], output: "Kiran: 5" },
        ],
        wrong: [py`
          def find_marks(results: dict[str, int], name: str) -> int | None:
              if name in results:
                  return results[name]
              return None

          results = {"Asha": 72, "Ravi": 65, "Kiran": 0}
          name = input("Name: ")
          marks = find_marks(results, name)
          if marks:
              print(f"{name}: {marks + 5}")
          else:
              print(f"{name}: not found")
        `],
        hints: [
          md`«int | None» means «find_marks» can give back None, and «None + 5» is a TypeError.`,
          md`Check «if marks is None» first, and print «not found» in that case.`,
          md`Use «is None», not just «if marks»: a student with 0 marks would count as missing.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: add the hints",
        task: md`
          The function works, but has no hints. Add them: «prices» is a list of whole numbers, «off» is a whole number, and the answer is a decimal number. The output stays the same:

          | 405.0
        `,
        starter: py`
          def bill(prices, off):
              total = sum(prices)
              return total - total * off / 100

          print(bill([150, 300], 10))
        `,
        solution: py`
          def bill(prices: list[int], off: int) -> float:
              total = sum(prices)
              return total - total * off / 100

          print(bill([150, 300], 10))
        `,
        tests: [{ output: "405.0" }, { py: py`
          ann = need("bill", "function").__annotations__
          assert ann.get("prices") == list[int], "«prices» should be hinted «list[int]»: a list of whole numbers."
          assert ann.get("off") == int, "«off» should be hinted «int»."
          assert ann.get("return") == float, "The answer should be hinted «-> float», before the colon."
        ` }],
        wrong: [py`
          def bill(prices: list, off: int) -> float:
              total = sum(prices)
              return total - total * off / 100

          print(bill([150, 300], 10))
        `],
        hints: [
          md`If «prices» is not accepted, say what the list holds: «list[int]».`,
          md`If the answer's hint is missing, put «-> float» between the «)» and the «:».`,
          md`If you see a SyntaxError, each hint goes after its parameter's name, with a colon: «off: int».`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: two hinted helpers",
        task: md`
          From a blank page. Write two functions, with hints.

          - «word_counts(text: str) -> dict[str, int]» counts each word in the text, in small letters.
          - «longest(words: list[str]) -> str | None» gives back the longest word, the first one if two tie, or None for an empty list.

          Then ask for a line of text, and print the counts and the longest word. For «Tea and more tea» it shows:

          | {'tea': 2, 'and': 1, 'more': 1}
          | Longest: more
        `,
        starter: py``,
        solution: py`
          def word_counts(text: str) -> dict[str, int]:
              counts = {}
              for word in text.lower().split():
                  counts[word] = counts.get(word, 0) + 1
              return counts

          def longest(words: list[str]) -> str | None:
              best = None
              for word in words:
                  if best is None or len(word) > len(best):
                      best = word
              return best

          line = input("Text: ")
          print(word_counts(line))
          print("Longest:", longest(line.lower().split()))
        `,
        tests: [
          { inputs: ["Tea and more tea"], output: "{'tea': 2, 'and': 1, 'more': 1}\nLongest: more" },
          { inputs: ["go"], output: "{'go': 1}\nLongest: go" },
          { inputs: ["x"], py: py`
          expect("word_counts", ["A a B"], {"a": 2, "b": 1})
          expect("longest", [["ab", "cd", "e"]], "ab")
          expect("longest", [[]], None)
          a = need("word_counts", "function").__annotations__
          assert a.get("text") == str and a.get("return") == dict[str, int], "«word_counts» needs the hints «text: str» and «-> dict[str, int]»."
          b = need("longest", "function").__annotations__
          assert b.get("words") == list[str] and b.get("return") == (str | None), "«longest» needs the hints «words: list[str]» and «-> str | None»."
          ` },
        ],
        wrong: [py`
          def word_counts(text: str) -> dict[str, int]:
              counts = {}
              for word in text.lower().split():
                  counts[word] = counts.get(word, 0) + 1
              return counts

          def longest(words: list[str]) -> str | None:
              return max(words, key=len)

          line = input("Text: ")
          print(word_counts(line))
          print("Longest:", longest(line.lower().split()))
        `],
        hints: [
          md`If «longest([])» stops with a ValueError, «max» cannot work on an empty list. Give back None in that case, as the hint promises.`,
          md`If «A a B» counts «A» and «a» apart, turn the text into small letters before you count.`,
          md`If a hint is not accepted, copy it exactly from the task, including «| None».`,
        ],
      },
    ],
    keys: [
      md`«def f(n: int) -> str:» hints that n is a whole number and the answer is text. «-> None» means nothing comes back.`,
      md`«list[int]» is a list of whole numbers; «dict[str, int]» has text keys and number values.`,
      md`«int | None» means the answer may be missing: check «is None» before using it.`,
      md`Python does not check hints. Editors and tools like mypy do.`,
    ],
  });

  // ---------------------------------------------------------------- Day 125
  day({
    slug: "results-database",
    title: "Project: Mock Test Results Database",
    goal: "Store mock test results in SQLite and prove the queries with unittest.",
    minutes: 55,
    kind: "project",
    needs: [69, 122, 123],
    win: "Today you can now build a results database with SQLite, ask it safe questions, and prove it works with a unittest class that catches broken copies. This completes Week 18.",
    learn: [
      md`
        ## The brief

        A coaching centre keeps every mock test result: the student's name, the subject and the marks. Staff want to see one student's marks, the top scorer in a subject, and each subject's average. Bad marks, like 120, must be refused.

        You keep the results in a SQLite table (Days 121 and 122), inside a class that hides the SQL (Day 69). Then you prove it with a unittest class (Day 123). One new tool helps: «setUp» runs before **every** test, so each test starts fresh. Guess what this prints.
      `,
      ex(py`
        import unittest

        class TestBasket(unittest.TestCase):
            def setUp(self):
                print("fresh basket")
                self.basket = []

            def test_add(self):
                self.basket.append("tea")
                self.assertEqual(len(self.basket), 1)

            def test_empty(self):
                self.assertIsNone(None)
                self.assertEqual(self.basket, [])

        unittest.main()
      `, { predict: ["fresh basket\nfresh basket", "fresh basket", "fresh basket\nfresh basket\nfresh basket"], answer: 0 }),
      md`
        «setUp» ran once for each of the two tests, so test_empty got a new, empty basket. The report's dots are mixed in with the printed lines. «assertIsNone(x)» checks that x is None.

        ## Four stages

        Stage 1 adds results and refuses bad marks. Stage 2 asks questions. Stage 3 reports the averages. In Stage 4 you write a unittest class that must catch 4 broken copies of your database. All names and marks are invented.
      `,
      tip(md`Here the database lives in memory, «":memory:"», because this page does not keep files between Runs. In the Laptop Mission you give it a real file, and the results are still there the next day.`),
      pause(md`This project usually takes two sittings. Each stage saves when you pass it, so stop after any stage.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          import sqlite3

          con = sqlite3.connect(":memory:")
          con.execute("CREATE TABLE r (subject TEXT, marks INTEGER)")
          con.executemany("INSERT INTO r VALUES (?, ?)", [("GK", 64), ("GK", 58), ("Maths", 90)])
          print(con.execute("SELECT COUNT(*) FROM r WHERE subject = ? AND marks >= ?", ("GK", 60)).fetchone()[0])
        `, options: ["1", "2", "3"], answer: 0,
        explain: md`Both tests must be true: GK, and at least 60. Only the 64 fits.`,
        why: [null, md`58 is GK, but not 60 or more. «AND» needs both.`, md`Maths 90 is not GK.`],
        skill: "trace" },
      { q: md`What does this query give back?`, code: py`
          "SELECT name, marks FROM results WHERE subject = ? ORDER BY marks DESC, name LIMIT 1"
        `, options: ["The top scorer in the subject, and on a tie, the name that comes first A to Z", "Every student in the subject, A to Z", "The lowest marks in the subject"],
        answer: 0, verify: false, mono: false,
        explain: md`Biggest marks first; equal marks are sorted by name; «LIMIT 1» keeps only the first row.`,
        why: [null, md`«LIMIT 1» keeps one row only.`, md`«DESC» puts the biggest marks first.`],
        skill: "read" },
      { q: md`Each test passes when it runs alone, but together they fail: the counts are too high. The database is made once, outside the tests. What is the fix?`,
        options: ["Make a fresh database in «setUp», so each test starts empty", "Run fewer tests", "Rename the tests so they run in another order"], answer: 0, verify: false, mono: false,
        explain: md`Tests that share data change each other's answers. «setUp» gives every test its own.`,
        why: [null, md`Fewer tests prove less. Fresh data fixes the real cause.`, md`Then they would depend on the order, which is the same problem in hiding.`],
        skill: "debug" },
      { q: md`When does «setUp» run?`,
        options: ["Before every test in the class", "Once, before all the tests", "Only when a test fails"], answer: 0, verify: false, mono: false,
        explain: md`Two tests, two runs of «setUp». That is what keeps them apart.`,
        why: [null, md`It runs again before each test.`, md`It runs before the test, every time.`],
        skill: "memory" },
      { q: md`Where should the check that marks are 0 to 100 go?`,
        options: ["In «add», before the INSERT", "In «add», after the INSERT", "In the averages report"], answer: 0, verify: false, mono: false,
        explain: md`Check first, then change (Day 94). A refused result must never reach the table.`,
        why: [null, md`Then the bad row is already stored when the error comes.`, md`By then the bad marks are already in the averages.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "s1", stage: 1, title: "Stage 1: add and count",
        task: md`
          The table is made for you in «__init__». Finish two methods of «ResultsDB»:

          - «add(name, subject, marks)» raises «ValueError(f"marks must be 0 to 100, not {marks}")» if the marks are not 0 to 100. Otherwise it stores the row with «?» marks, then commits.
          - «count()» gives back how many results are stored, using «COUNT(*)».

          The program should print:

          | Refused: marks must be 0 to 100, not 120
          | Stored: 5
        `,
        starter: py`
          import sqlite3


          class ResultsDB:
              def __init__(self, path=":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS results (name TEXT, subject TEXT, marks INTEGER)")

              def add(self, name, subject, marks):
                  # stores one result, or raises ValueError if the marks are not 0 to 100
                  pass

              def count(self):
                  # gives back how many results are stored
                  pass


          db = ResultsDB()
          for name, subject, marks in [("Asha", "Maths", 72), ("Ravi", "Maths", 81), ("Asha", "GK", 64),
                                       ("Ravi", "GK", 58), ("Meena", "English", 90)]:
              db.add(name, subject, marks)
          try:
              db.add("Om", "Maths", 120)
          except ValueError as e:
              print("Refused:", e)
          print("Stored:", db.count())
        `,
        solution: py`
          import sqlite3


          class ResultsDB:
              def __init__(self, path=":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS results (name TEXT, subject TEXT, marks INTEGER)")

              def add(self, name, subject, marks):
                  # stores one result, or raises ValueError if the marks are not 0 to 100
                  if not 0 <= marks <= 100:
                      raise ValueError(f"marks must be 0 to 100, not {marks}")
                  self.con.execute("INSERT INTO results VALUES (?, ?, ?)", (name, subject, marks))
                  self.con.commit()

              def count(self):
                  # gives back how many results are stored
                  return self.con.execute("SELECT COUNT(*) FROM results").fetchone()[0]


          db = ResultsDB()
          for name, subject, marks in [("Asha", "Maths", 72), ("Ravi", "Maths", 81), ("Asha", "GK", 64),
                                       ("Ravi", "GK", 58), ("Meena", "English", 90)]:
              db.add(name, subject, marks)
          try:
              db.add("Om", "Maths", 120)
          except ValueError as e:
              print("Refused:", e)
          print("Stored:", db.count())
        `,
        tests: [
          { output: "Refused: marks must be 0 to 100, not 120\nStored: 5" },
          { py: py`
              db = new("ResultsDB")
              db.add("A", "GK", 0)
              db.add("B", "GK", 100)
              assert db.count() == 2, f"0 and 100 are both allowed, so 2 results should be stored, but count gave {db.count()}."
              for bad in (-1, 101):
                  refused = False
                  try:
                      db.add("C", "GK", bad)
                  except ValueError:
                      refused = True
                  assert refused, f"«add» should raise a ValueError for marks {bad}."
                  assert db.count() == 2, f"A refused result must not be stored, but after refusing {bad} the count is {db.count()}."
            ` },
        ],
        wrong: [py`
          import sqlite3


          class ResultsDB:
              def __init__(self, path=":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS results (name TEXT, subject TEXT, marks INTEGER)")

              def add(self, name, subject, marks):
                  # stores one result, or raises ValueError if the marks are not 0 to 100
                  self.con.execute("INSERT INTO results VALUES (?, ?, ?)", (name, subject, marks))
                  if not 0 <= marks <= 100:
                      raise ValueError(f"marks must be 0 to 100, not {marks}")
                  self.con.commit()

              def count(self):
                  # gives back how many results are stored
                  return self.con.execute("SELECT COUNT(*) FROM results").fetchone()[0]


          db = ResultsDB()
          for name, subject, marks in [("Asha", "Maths", 72), ("Ravi", "Maths", 81), ("Asha", "GK", 64),
                                       ("Ravi", "GK", 58), ("Meena", "English", 90)]:
              db.add(name, subject, marks)
          try:
              db.add("Om", "Maths", 120)
          except ValueError as e:
              print("Refused:", e)
          print("Stored:", db.count())
        `],
        hints: [
          md`If «Stored» shows 6, the refused row went in anyway. Check the marks before the INSERT.`,
          md`If you see «Stored: None», «count» must give back the number: «fetchone()[0]».`,
          md`If 0 or 100 is refused, the edges are allowed: use «0 <= marks <= 100».`,
        ],
      },
      {
        id: "s2", stage: 2, carry: "s1", title: "Stage 2: ask questions",
        task: md`
          Add two methods. Give every value with «?», never with an f-string.

          - «marks_of(name)» gives back that student's «(subject, marks)» rows, A to Z by subject.
          - «best(subject)» gives back «(name, marks)» of the top scorer in that subject, with ties going to the name first A to Z. For a subject with no results, it gives back None.

          Then add these lines at the end:

          : print(db.marks_of("Asha"))
          : print(db.best("Maths"), db.best("Science"))

          The last two lines printed are:

          | [('GK', 64), ('Maths', 72)]
          | ('Ravi', 81) None
        `,
        starter: py`
          import sqlite3


          class ResultsDB:
              def __init__(self, path=":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS results (name TEXT, subject TEXT, marks INTEGER)")

              def add(self, name, subject, marks):
                  # stores one result, or raises ValueError if the marks are not 0 to 100
                  if not 0 <= marks <= 100:
                      raise ValueError(f"marks must be 0 to 100, not {marks}")
                  self.con.execute("INSERT INTO results VALUES (?, ?, ?)", (name, subject, marks))
                  self.con.commit()

              def count(self):
                  # gives back how many results are stored
                  return self.con.execute("SELECT COUNT(*) FROM results").fetchone()[0]


          db = ResultsDB()
          for name, subject, marks in [("Asha", "Maths", 72), ("Ravi", "Maths", 81), ("Asha", "GK", 64),
                                       ("Ravi", "GK", 58), ("Meena", "English", 90)]:
              db.add(name, subject, marks)
          try:
              db.add("Om", "Maths", 120)
          except ValueError as e:
              print("Refused:", e)
          print("Stored:", db.count())
        `,
        solution: py`
          import sqlite3


          class ResultsDB:
              def __init__(self, path=":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS results (name TEXT, subject TEXT, marks INTEGER)")

              def add(self, name, subject, marks):
                  # stores one result, or raises ValueError if the marks are not 0 to 100
                  if not 0 <= marks <= 100:
                      raise ValueError(f"marks must be 0 to 100, not {marks}")
                  self.con.execute("INSERT INTO results VALUES (?, ?, ?)", (name, subject, marks))
                  self.con.commit()

              def count(self):
                  # gives back how many results are stored
                  return self.con.execute("SELECT COUNT(*) FROM results").fetchone()[0]

              def marks_of(self, name):
                  # gives back (subject, marks) pairs for one student, A to Z by subject
                  query = "SELECT subject, marks FROM results WHERE name = ? ORDER BY subject"
                  return self.con.execute(query, (name,)).fetchall()

              def best(self, subject):
                  # gives back (name, marks) of the top scorer in a subject, or None
                  query = "SELECT name, marks FROM results WHERE subject = ? ORDER BY marks DESC, name LIMIT 1"
                  return self.con.execute(query, (subject,)).fetchone()


          db = ResultsDB()
          for name, subject, marks in [("Asha", "Maths", 72), ("Ravi", "Maths", 81), ("Asha", "GK", 64),
                                       ("Ravi", "GK", 58), ("Meena", "English", 90)]:
              db.add(name, subject, marks)
          try:
              db.add("Om", "Maths", 120)
          except ValueError as e:
              print("Refused:", e)
          print("Stored:", db.count())

          print(db.marks_of("Asha"))
          print(db.best("Maths"), db.best("Science"))
        `,
        tests: [
          { output: "Refused: marks must be 0 to 100, not 120\nStored: 5\n[('GK', 64), ('Maths', 72)]\n('Ravi', 81) None" },
          { py: py`
              db = new("ResultsDB")
              db.add("Zoya", "GK", 80)
              db.add("Amit", "GK", 80)
              db.add("D'Souza", "Maths", 55)
              db.add("D'Souza", "English", 61)
              assert db.best("GK") == ("Amit", 80), f"Zoya and Amit tie on 80, so best should give ('Amit', 80), but it gave {db.best('GK')}."
              assert db.marks_of("D'Souza") == [("English", 61), ("Maths", 55)], "marks_of(\"D'Souza\") should give her rows A to Z by subject. A name with «'» must go in with «?»."
              assert db.marks_of("Nobody") == [], "A student with no results should get an empty list."
              assert db.best("History") is None, "A subject with no results should give None."
            ` },
        ],
        wrong: [py`
          import sqlite3


          class ResultsDB:
              def __init__(self, path=":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS results (name TEXT, subject TEXT, marks INTEGER)")

              def add(self, name, subject, marks):
                  # stores one result, or raises ValueError if the marks are not 0 to 100
                  if not 0 <= marks <= 100:
                      raise ValueError(f"marks must be 0 to 100, not {marks}")
                  self.con.execute("INSERT INTO results VALUES (?, ?, ?)", (name, subject, marks))
                  self.con.commit()

              def count(self):
                  # gives back how many results are stored
                  return self.con.execute("SELECT COUNT(*) FROM results").fetchone()[0]

              def marks_of(self, name):
                  # gives back (subject, marks) pairs for one student, A to Z by subject
                  query = "SELECT subject, marks FROM results WHERE name = ? ORDER BY subject"
                  return self.con.execute(query, (name,)).fetchall()

              def best(self, subject):
                  # gives back (name, marks) of the top scorer in a subject, or None
                  query = "SELECT name, marks FROM results WHERE subject = ? ORDER BY marks, name LIMIT 1"
                  return self.con.execute(query, (subject,)).fetchone()


          db = ResultsDB()
          for name, subject, marks in [("Asha", "Maths", 72), ("Ravi", "Maths", 81), ("Asha", "GK", 64),
                                       ("Ravi", "GK", 58), ("Meena", "English", 90)]:
              db.add(name, subject, marks)
          try:
              db.add("Om", "Maths", 120)
          except ValueError as e:
              print("Refused:", e)
          print("Stored:", db.count())

          print(db.marks_of("Asha"))
          print(db.best("Maths"), db.best("Science"))
        `],
        hints: [
          md`If «best» gives Ravi's lowest marks, sort the biggest first with «DESC».`,
          md`If a name like «D'Souza» causes an OperationalError, it was pasted into the SQL. Use «?».`,
          md`If a tie goes to Zoya, sort by name too: «ORDER BY marks DESC, name».`,
        ],
      },
      {
        id: "s3", stage: 3, carry: "s2", title: "Stage 3: the averages",
        task: md`
          Add «averages()». It gives back one line for each subject, A to Z, like «"Maths: 76.5 from 2"»: the average, rounded to 1 place, and how many results. Let SQLite do the work with «AVG», «COUNT(*)» and «GROUP BY».

          Then add these lines at the end:

          : for line in db.averages():
          :     print(line)

          The last three lines printed are:

          | English: 90.0 from 1
          | GK: 61.0 from 2
          | Maths: 76.5 from 2
        `,
        starter: py`
          import sqlite3


          class ResultsDB:
              def __init__(self, path=":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS results (name TEXT, subject TEXT, marks INTEGER)")

              def add(self, name, subject, marks):
                  # stores one result, or raises ValueError if the marks are not 0 to 100
                  if not 0 <= marks <= 100:
                      raise ValueError(f"marks must be 0 to 100, not {marks}")
                  self.con.execute("INSERT INTO results VALUES (?, ?, ?)", (name, subject, marks))
                  self.con.commit()

              def count(self):
                  # gives back how many results are stored
                  return self.con.execute("SELECT COUNT(*) FROM results").fetchone()[0]

              def marks_of(self, name):
                  # gives back (subject, marks) pairs for one student, A to Z by subject
                  query = "SELECT subject, marks FROM results WHERE name = ? ORDER BY subject"
                  return self.con.execute(query, (name,)).fetchall()

              def best(self, subject):
                  # gives back (name, marks) of the top scorer in a subject, or None
                  query = "SELECT name, marks FROM results WHERE subject = ? ORDER BY marks DESC, name LIMIT 1"
                  return self.con.execute(query, (subject,)).fetchone()


          db = ResultsDB()
          for name, subject, marks in [("Asha", "Maths", 72), ("Ravi", "Maths", 81), ("Asha", "GK", 64),
                                       ("Ravi", "GK", 58), ("Meena", "English", 90)]:
              db.add(name, subject, marks)
          try:
              db.add("Om", "Maths", 120)
          except ValueError as e:
              print("Refused:", e)
          print("Stored:", db.count())

          print(db.marks_of("Asha"))
          print(db.best("Maths"), db.best("Science"))
        `,
        solution: py`
          import sqlite3


          class ResultsDB:
              def __init__(self, path=":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS results (name TEXT, subject TEXT, marks INTEGER)")

              def add(self, name, subject, marks):
                  # stores one result, or raises ValueError if the marks are not 0 to 100
                  if not 0 <= marks <= 100:
                      raise ValueError(f"marks must be 0 to 100, not {marks}")
                  self.con.execute("INSERT INTO results VALUES (?, ?, ?)", (name, subject, marks))
                  self.con.commit()

              def count(self):
                  # gives back how many results are stored
                  return self.con.execute("SELECT COUNT(*) FROM results").fetchone()[0]

              def marks_of(self, name):
                  # gives back (subject, marks) pairs for one student, A to Z by subject
                  query = "SELECT subject, marks FROM results WHERE name = ? ORDER BY subject"
                  return self.con.execute(query, (name,)).fetchall()

              def best(self, subject):
                  # gives back (name, marks) of the top scorer in a subject, or None
                  query = "SELECT name, marks FROM results WHERE subject = ? ORDER BY marks DESC, name LIMIT 1"
                  return self.con.execute(query, (subject,)).fetchone()

              def averages(self):
                  # gives back one line for each subject, A to Z, like "Maths: 76.5 from 2"
                  query = "SELECT subject, AVG(marks), COUNT(*) FROM results GROUP BY subject ORDER BY subject"
                  return [f"{subject}: {round(avg, 1)} from {n}" for subject, avg, n in self.con.execute(query)]


          db = ResultsDB()
          for name, subject, marks in [("Asha", "Maths", 72), ("Ravi", "Maths", 81), ("Asha", "GK", 64),
                                       ("Ravi", "GK", 58), ("Meena", "English", 90)]:
              db.add(name, subject, marks)
          try:
              db.add("Om", "Maths", 120)
          except ValueError as e:
              print("Refused:", e)
          print("Stored:", db.count())

          print(db.marks_of("Asha"))
          print(db.best("Maths"), db.best("Science"))

          for line in db.averages():
              print(line)
        `,
        tests: [
          { contains: ["English: 90.0 from 1\nGK: 61.0 from 2\nMaths: 76.5 from 2"] },
          { py: py`
              db = new("ResultsDB")
              for name, marks in [("A", 10), ("B", 20), ("C", 20)]:
                  db.add(name, "Science", marks)
              db.add("D", "Art", 75)
              assert db.averages() == ["Art: 75.0 from 1", "Science: 16.7 from 3"], f"The averages should be ['Art: 75.0 from 1', 'Science: 16.7 from 3'], but they are {db.averages()}."
            ` },
        ],
        wrong: [py`
          import sqlite3


          class ResultsDB:
              def __init__(self, path=":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS results (name TEXT, subject TEXT, marks INTEGER)")

              def add(self, name, subject, marks):
                  # stores one result, or raises ValueError if the marks are not 0 to 100
                  if not 0 <= marks <= 100:
                      raise ValueError(f"marks must be 0 to 100, not {marks}")
                  self.con.execute("INSERT INTO results VALUES (?, ?, ?)", (name, subject, marks))
                  self.con.commit()

              def count(self):
                  # gives back how many results are stored
                  return self.con.execute("SELECT COUNT(*) FROM results").fetchone()[0]

              def marks_of(self, name):
                  # gives back (subject, marks) pairs for one student, A to Z by subject
                  query = "SELECT subject, marks FROM results WHERE name = ? ORDER BY subject"
                  return self.con.execute(query, (name,)).fetchall()

              def best(self, subject):
                  # gives back (name, marks) of the top scorer in a subject, or None
                  query = "SELECT name, marks FROM results WHERE subject = ? ORDER BY marks DESC, name LIMIT 1"
                  return self.con.execute(query, (subject,)).fetchone()

              def averages(self):
                  # gives back one line for each subject, A to Z, like "Maths: 76.5 from 2"
                  query = "SELECT subject, AVG(marks), COUNT(*) FROM results GROUP BY subject ORDER BY subject"
                  return [f"{subject}: {round(avg)} from {n}" for subject, avg, n in self.con.execute(query)]


          db = ResultsDB()
          for name, subject, marks in [("Asha", "Maths", 72), ("Ravi", "Maths", 81), ("Asha", "GK", 64),
                                       ("Ravi", "GK", 58), ("Meena", "English", 90)]:
              db.add(name, subject, marks)
          try:
              db.add("Om", "Maths", 120)
          except ValueError as e:
              print("Refused:", e)
          print("Stored:", db.count())

          print(db.marks_of("Asha"))
          print(db.best("Maths"), db.best("Science"))

          for line in db.averages():
              print(line)
        `],
        hints: [
          md`If Maths shows «76» or «76.0», round to 1 place: «round(avg, 1)».`,
          md`If each result gets its own line, group the rows with «GROUP BY subject».`,
          md`If the subjects are not A to Z, add «ORDER BY subject» after the «GROUP BY».`,
        ],
      },
      {
        id: "s4", stage: 4, carry: "s3", title: "Stage 4: prove it with unittest",
        task: md`
          Add «import unittest» at the top. Then add this test class at the very end, after all the other lines:

          : class TestResultsDB(unittest.TestCase):
          :     def setUp(self):
          :         self.db = ResultsDB()
          :
          :     def test_count(self):
          :         self.db.add("Asha", "Maths", 72)
          :         self.assertEqual(self.db.count(), 1)
          :
          : unittest.main()

          Now add at least three more tests. I have **4 broken copies** of «ResultsDB», and I will run your tests on each one. One lets marks above 100 in. One gives «marks_of» in the wrong order. One gives the lowest marks as «best». One crashes on «best» for a subject with no results. Your tests must pass on your database and fail on every broken copy.
        `,
        starter: py`
          import sqlite3


          class ResultsDB:
              def __init__(self, path=":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS results (name TEXT, subject TEXT, marks INTEGER)")

              def add(self, name, subject, marks):
                  # stores one result, or raises ValueError if the marks are not 0 to 100
                  if not 0 <= marks <= 100:
                      raise ValueError(f"marks must be 0 to 100, not {marks}")
                  self.con.execute("INSERT INTO results VALUES (?, ?, ?)", (name, subject, marks))
                  self.con.commit()

              def count(self):
                  # gives back how many results are stored
                  return self.con.execute("SELECT COUNT(*) FROM results").fetchone()[0]

              def marks_of(self, name):
                  # gives back (subject, marks) pairs for one student, A to Z by subject
                  query = "SELECT subject, marks FROM results WHERE name = ? ORDER BY subject"
                  return self.con.execute(query, (name,)).fetchall()

              def best(self, subject):
                  # gives back (name, marks) of the top scorer in a subject, or None
                  query = "SELECT name, marks FROM results WHERE subject = ? ORDER BY marks DESC, name LIMIT 1"
                  return self.con.execute(query, (subject,)).fetchone()

              def averages(self):
                  # gives back one line for each subject, A to Z, like "Maths: 76.5 from 2"
                  query = "SELECT subject, AVG(marks), COUNT(*) FROM results GROUP BY subject ORDER BY subject"
                  return [f"{subject}: {round(avg, 1)} from {n}" for subject, avg, n in self.con.execute(query)]


          db = ResultsDB()
          for name, subject, marks in [("Asha", "Maths", 72), ("Ravi", "Maths", 81), ("Asha", "GK", 64),
                                       ("Ravi", "GK", 58), ("Meena", "English", 90)]:
              db.add(name, subject, marks)
          try:
              db.add("Om", "Maths", 120)
          except ValueError as e:
              print("Refused:", e)
          print("Stored:", db.count())

          print(db.marks_of("Asha"))
          print(db.best("Maths"), db.best("Science"))

          for line in db.averages():
              print(line)
        `,
        solution: py`
          import sqlite3
          import unittest


          class ResultsDB:
              def __init__(self, path=":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS results (name TEXT, subject TEXT, marks INTEGER)")

              def add(self, name, subject, marks):
                  # stores one result, or raises ValueError if the marks are not 0 to 100
                  if not 0 <= marks <= 100:
                      raise ValueError(f"marks must be 0 to 100, not {marks}")
                  self.con.execute("INSERT INTO results VALUES (?, ?, ?)", (name, subject, marks))
                  self.con.commit()

              def count(self):
                  # gives back how many results are stored
                  return self.con.execute("SELECT COUNT(*) FROM results").fetchone()[0]

              def marks_of(self, name):
                  # gives back (subject, marks) pairs for one student, A to Z by subject
                  query = "SELECT subject, marks FROM results WHERE name = ? ORDER BY subject"
                  return self.con.execute(query, (name,)).fetchall()

              def best(self, subject):
                  # gives back (name, marks) of the top scorer in a subject, or None
                  query = "SELECT name, marks FROM results WHERE subject = ? ORDER BY marks DESC, name LIMIT 1"
                  return self.con.execute(query, (subject,)).fetchone()

              def averages(self):
                  # gives back one line for each subject, A to Z, like "Maths: 76.5 from 2"
                  query = "SELECT subject, AVG(marks), COUNT(*) FROM results GROUP BY subject ORDER BY subject"
                  return [f"{subject}: {round(avg, 1)} from {n}" for subject, avg, n in self.con.execute(query)]


          db = ResultsDB()
          for name, subject, marks in [("Asha", "Maths", 72), ("Ravi", "Maths", 81), ("Asha", "GK", 64),
                                       ("Ravi", "GK", 58), ("Meena", "English", 90)]:
              db.add(name, subject, marks)
          try:
              db.add("Om", "Maths", 120)
          except ValueError as e:
              print("Refused:", e)
          print("Stored:", db.count())

          print(db.marks_of("Asha"))
          print(db.best("Maths"), db.best("Science"))

          for line in db.averages():
              print(line)


          class TestResultsDB(unittest.TestCase):
              def setUp(self):
                  self.db = ResultsDB()

              def test_count(self):
                  self.db.add("Asha", "Maths", 72)
                  self.assertEqual(self.db.count(), 1)

              def test_refuses_big_marks(self):
                  with self.assertRaises(ValueError):
                      self.db.add("Om", "Maths", 101)
                  self.assertEqual(self.db.count(), 0)

              def test_marks_of_a_to_z(self):
                  self.db.add("Asha", "Maths", 72)
                  self.db.add("Asha", "GK", 64)
                  self.assertEqual(self.db.marks_of("Asha"), [("GK", 64), ("Maths", 72)])

              def test_best(self):
                  self.db.add("Asha", "Maths", 72)
                  self.db.add("Ravi", "Maths", 81)
                  self.assertEqual(self.db.best("Maths"), ("Ravi", 81))

              def test_best_of_nothing(self):
                  self.assertIsNone(self.db.best("Science"))


          unittest.main()
        `,
        tests: [
          { contains: ["English: 90.0 from 1\nGK: 61.0 from 2\nMaths: 76.5 from 2"] },
          { py: py`
              r = unit("TestResultsDB")
              assert r.testsRun >= 4, f"TestResultsDB has {r.testsRun} test(s). Write at least 4, each named «test_...»."
              assert r.wasSuccessful(), "A test in TestResultsDB fails on your own database. Check what each test expects."
              class LetsBigMarksIn:
                  def __init__(self, path=":memory:"):
                      self.con = sqlite3.connect(path)
                      self.con.execute("CREATE TABLE IF NOT EXISTS results (name TEXT, subject TEXT, marks INTEGER)")

                  def add(self, name, subject, marks):
                      # stores one result, or raises ValueError if the marks are not 0 to 100
                      if marks < 0:
                          raise ValueError(f"marks must be 0 to 100, not {marks}")
                      self.con.execute("INSERT INTO results VALUES (?, ?, ?)", (name, subject, marks))
                      self.con.commit()

                  def count(self):
                      # gives back how many results are stored
                      return self.con.execute("SELECT COUNT(*) FROM results").fetchone()[0]

                  def marks_of(self, name):
                      # gives back (subject, marks) pairs for one student, A to Z by subject
                      query = "SELECT subject, marks FROM results WHERE name = ? ORDER BY subject"
                      return self.con.execute(query, (name,)).fetchall()

                  def best(self, subject):
                      # gives back (name, marks) of the top scorer in a subject, or None
                      query = "SELECT name, marks FROM results WHERE subject = ? ORDER BY marks DESC, name LIMIT 1"
                      return self.con.execute(query, (subject,)).fetchone()

                  def averages(self):
                      # gives back one line for each subject, A to Z, like "Maths: 76.5 from 2"
                      query = "SELECT subject, AVG(marks), COUNT(*) FROM results GROUP BY subject ORDER BY subject"
                      return [f"{subject}: {round(avg, 1)} from {n}" for subject, avg, n in self.con.execute(query)]
              assert not unit("TestResultsDB", ResultsDB=LetsBigMarksIn).wasSuccessful(), "A database that lets marks of 101 in still passed your tests. Test that «add» refuses marks above 100."
              class MarksOfUnsorted:
                  def __init__(self, path=":memory:"):
                      self.con = sqlite3.connect(path)
                      self.con.execute("CREATE TABLE IF NOT EXISTS results (name TEXT, subject TEXT, marks INTEGER)")

                  def add(self, name, subject, marks):
                      # stores one result, or raises ValueError if the marks are not 0 to 100
                      if not 0 <= marks <= 100:
                          raise ValueError(f"marks must be 0 to 100, not {marks}")
                      self.con.execute("INSERT INTO results VALUES (?, ?, ?)", (name, subject, marks))
                      self.con.commit()

                  def count(self):
                      # gives back how many results are stored
                      return self.con.execute("SELECT COUNT(*) FROM results").fetchone()[0]

                  def marks_of(self, name):
                      # gives back (subject, marks) pairs for one student, A to Z by subject
                      query = "SELECT subject, marks FROM results WHERE name = ?"
                      return self.con.execute(query, (name,)).fetchall()

                  def best(self, subject):
                      # gives back (name, marks) of the top scorer in a subject, or None
                      query = "SELECT name, marks FROM results WHERE subject = ? ORDER BY marks DESC, name LIMIT 1"
                      return self.con.execute(query, (subject,)).fetchone()

                  def averages(self):
                      # gives back one line for each subject, A to Z, like "Maths: 76.5 from 2"
                      query = "SELECT subject, AVG(marks), COUNT(*) FROM results GROUP BY subject ORDER BY subject"
                      return [f"{subject}: {round(avg, 1)} from {n}" for subject, avg, n in self.con.execute(query)]
              assert not unit("TestResultsDB", ResultsDB=MarksOfUnsorted).wasSuccessful(), "A «marks_of» that is not A to Z still passed. Add a student's subjects out of order, then check the list."
              class BestIsLowest:
                  def __init__(self, path=":memory:"):
                      self.con = sqlite3.connect(path)
                      self.con.execute("CREATE TABLE IF NOT EXISTS results (name TEXT, subject TEXT, marks INTEGER)")

                  def add(self, name, subject, marks):
                      # stores one result, or raises ValueError if the marks are not 0 to 100
                      if not 0 <= marks <= 100:
                          raise ValueError(f"marks must be 0 to 100, not {marks}")
                      self.con.execute("INSERT INTO results VALUES (?, ?, ?)", (name, subject, marks))
                      self.con.commit()

                  def count(self):
                      # gives back how many results are stored
                      return self.con.execute("SELECT COUNT(*) FROM results").fetchone()[0]

                  def marks_of(self, name):
                      # gives back (subject, marks) pairs for one student, A to Z by subject
                      query = "SELECT subject, marks FROM results WHERE name = ? ORDER BY subject"
                      return self.con.execute(query, (name,)).fetchall()

                  def best(self, subject):
                      # gives back (name, marks) of the top scorer in a subject, or None
                      query = "SELECT name, marks FROM results WHERE subject = ? ORDER BY marks, name LIMIT 1"
                      return self.con.execute(query, (subject,)).fetchone()

                  def averages(self):
                      # gives back one line for each subject, A to Z, like "Maths: 76.5 from 2"
                      query = "SELECT subject, AVG(marks), COUNT(*) FROM results GROUP BY subject ORDER BY subject"
                      return [f"{subject}: {round(avg, 1)} from {n}" for subject, avg, n in self.con.execute(query)]
              assert not unit("TestResultsDB", ResultsDB=BestIsLowest).wasSuccessful(), "A «best» that gives the lowest marks still passed. Add two results to a subject and check «best»."
              class BestCrashes:
                  def __init__(self, path=":memory:"):
                      self.con = sqlite3.connect(path)
                      self.con.execute("CREATE TABLE IF NOT EXISTS results (name TEXT, subject TEXT, marks INTEGER)")

                  def add(self, name, subject, marks):
                      # stores one result, or raises ValueError if the marks are not 0 to 100
                      if not 0 <= marks <= 100:
                          raise ValueError(f"marks must be 0 to 100, not {marks}")
                      self.con.execute("INSERT INTO results VALUES (?, ?, ?)", (name, subject, marks))
                      self.con.commit()

                  def count(self):
                      # gives back how many results are stored
                      return self.con.execute("SELECT COUNT(*) FROM results").fetchone()[0]

                  def marks_of(self, name):
                      # gives back (subject, marks) pairs for one student, A to Z by subject
                      query = "SELECT subject, marks FROM results WHERE name = ? ORDER BY subject"
                      return self.con.execute(query, (name,)).fetchall()

                  def best(self, subject):
                      # gives back (name, marks) of the top scorer in a subject, or None
                      query = "SELECT name, marks FROM results WHERE subject = ? ORDER BY marks DESC, name LIMIT 1"
                      row = self.con.execute(query, (subject,)).fetchone()
                      return (row[0], row[1])

                  def averages(self):
                      # gives back one line for each subject, A to Z, like "Maths: 76.5 from 2"
                      query = "SELECT subject, AVG(marks), COUNT(*) FROM results GROUP BY subject ORDER BY subject"
                      return [f"{subject}: {round(avg, 1)} from {n}" for subject, avg, n in self.con.execute(query)]
              assert not unit("TestResultsDB", ResultsDB=BestCrashes).wasSuccessful(), "A «best» that crashes for a subject with no results still passed. Check that «best» of an empty subject is None."
            ` },
          { uses: ["method:main"], msg: "End the program with «unittest.main()», so the tests run." },
        ],
        wrong: [py`
          import sqlite3
          import unittest


          class ResultsDB:
              def __init__(self, path=":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS results (name TEXT, subject TEXT, marks INTEGER)")

              def add(self, name, subject, marks):
                  # stores one result, or raises ValueError if the marks are not 0 to 100
                  if not 0 <= marks <= 100:
                      raise ValueError(f"marks must be 0 to 100, not {marks}")
                  self.con.execute("INSERT INTO results VALUES (?, ?, ?)", (name, subject, marks))
                  self.con.commit()

              def count(self):
                  # gives back how many results are stored
                  return self.con.execute("SELECT COUNT(*) FROM results").fetchone()[0]

              def marks_of(self, name):
                  # gives back (subject, marks) pairs for one student, A to Z by subject
                  query = "SELECT subject, marks FROM results WHERE name = ? ORDER BY subject"
                  return self.con.execute(query, (name,)).fetchall()

              def best(self, subject):
                  # gives back (name, marks) of the top scorer in a subject, or None
                  query = "SELECT name, marks FROM results WHERE subject = ? ORDER BY marks DESC, name LIMIT 1"
                  return self.con.execute(query, (subject,)).fetchone()

              def averages(self):
                  # gives back one line for each subject, A to Z, like "Maths: 76.5 from 2"
                  query = "SELECT subject, AVG(marks), COUNT(*) FROM results GROUP BY subject ORDER BY subject"
                  return [f"{subject}: {round(avg, 1)} from {n}" for subject, avg, n in self.con.execute(query)]


          db = ResultsDB()
          for name, subject, marks in [("Asha", "Maths", 72), ("Ravi", "Maths", 81), ("Asha", "GK", 64),
                                       ("Ravi", "GK", 58), ("Meena", "English", 90)]:
              db.add(name, subject, marks)
          try:
              db.add("Om", "Maths", 120)
          except ValueError as e:
              print("Refused:", e)
          print("Stored:", db.count())

          print(db.marks_of("Asha"))
          print(db.best("Maths"), db.best("Science"))

          for line in db.averages():
              print(line)


          class TestResultsDB(unittest.TestCase):
              def setUp(self):
                  self.db = ResultsDB()

              def test_count(self):
                  self.db.add("Asha", "Maths", 72)
                  self.assertEqual(self.db.count(), 1)

              def test_best(self):
                  self.db.add("Asha", "Maths", 72)
                  self.db.add("Ravi", "Maths", 81)
                  self.assertEqual(self.db.best("Maths"), ("Ravi", 81))


          unittest.main()
        `],
        hints: [
          md`If marks of 101 get past your tests, add a test with «with self.assertRaises(ValueError):».`,
          md`If an unsorted «marks_of» passes, add the subjects in Z to A order, then check that they come back A to Z.`,
          md`If a crashing «best» passes, test a subject with no results: «self.assertIsNone(self.db.best("Science"))».`,
        ],
      },
      {
        id: "d1", kind: "drill", title: "Laptop Mission: a database that remembers",
        task: md`
          This pretend Command Prompt is in your «python-days» folder. Type the command and press Enter.

          On a phone, you may skip this. Phone users are excused from the mission below.
        `,
        steps: [
          { say: md`Run your results database. Type «python results.py» and press Enter.`,
            expect: ["python results.py", "py results.py"],
            output: "Refused: marks must be 0 to 100, not 120\nStored: 5\n[('GK', 64), ('Maths', 72)]\n('Ravi', 81) None\nEnglish: 90.0 from 1\nGK: 61.0 from 2\nMaths: 76.5 from 2\n.....\n----------------------------------------------------------------------\nRan 5 tests in 0.004s\n\nOK" },
        ],
        mission: md`
          Now do it for real.

          1. In IDLE, make a new file with your Stage 4 program. Save it as «results.py» in «python-days».
          2. Change «db = ResultsDB()» to «db = ResultsDB("results.db")», so the results go into a real file.
          3. Run it with F5 three times. The tests still use memory, but your results are kept: each run adds 5 more.
          4. The number after «Stored:» on the third run is your receipt: write it in your notebook.
        `,
        hints: [
          md`Type the words in the grey box exactly, then press Enter.`,
          md`There is one space between the word python and the file name.`,
          md`If python does not work on your laptop, py does the same job.`,
        ],
      },
      {
        id: "twist", kind: "modify", carry: "s4", optional: true, noStep: true, title: "Own Twist: how many passed",
        task: md`
          Staff want to know how many passed. Add «pass_count(subject, pass_mark)», which gives back how many results in that subject reach the pass mark, using «WHERE» with «AND». Add this line before the test class:

          : print(db.pass_count("Maths", 70), db.pass_count("GK", 60))

          It prints:

          | 2 1

          Then add a test for it in «TestResultsDB». I will try a broken «pass_count» that uses «OR» instead of «AND», and your new test must catch it. You may add your own idea too, such as the lowest marks in a subject.
        `,
        starter: py`
          import sqlite3
          import unittest


          class ResultsDB:
              def __init__(self, path=":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS results (name TEXT, subject TEXT, marks INTEGER)")

              def add(self, name, subject, marks):
                  # stores one result, or raises ValueError if the marks are not 0 to 100
                  if not 0 <= marks <= 100:
                      raise ValueError(f"marks must be 0 to 100, not {marks}")
                  self.con.execute("INSERT INTO results VALUES (?, ?, ?)", (name, subject, marks))
                  self.con.commit()

              def count(self):
                  # gives back how many results are stored
                  return self.con.execute("SELECT COUNT(*) FROM results").fetchone()[0]

              def marks_of(self, name):
                  # gives back (subject, marks) pairs for one student, A to Z by subject
                  query = "SELECT subject, marks FROM results WHERE name = ? ORDER BY subject"
                  return self.con.execute(query, (name,)).fetchall()

              def best(self, subject):
                  # gives back (name, marks) of the top scorer in a subject, or None
                  query = "SELECT name, marks FROM results WHERE subject = ? ORDER BY marks DESC, name LIMIT 1"
                  return self.con.execute(query, (subject,)).fetchone()

              def averages(self):
                  # gives back one line for each subject, A to Z, like "Maths: 76.5 from 2"
                  query = "SELECT subject, AVG(marks), COUNT(*) FROM results GROUP BY subject ORDER BY subject"
                  return [f"{subject}: {round(avg, 1)} from {n}" for subject, avg, n in self.con.execute(query)]


          db = ResultsDB()
          for name, subject, marks in [("Asha", "Maths", 72), ("Ravi", "Maths", 81), ("Asha", "GK", 64),
                                       ("Ravi", "GK", 58), ("Meena", "English", 90)]:
              db.add(name, subject, marks)
          try:
              db.add("Om", "Maths", 120)
          except ValueError as e:
              print("Refused:", e)
          print("Stored:", db.count())

          print(db.marks_of("Asha"))
          print(db.best("Maths"), db.best("Science"))

          for line in db.averages():
              print(line)


          class TestResultsDB(unittest.TestCase):
              def setUp(self):
                  self.db = ResultsDB()

              def test_count(self):
                  self.db.add("Asha", "Maths", 72)
                  self.assertEqual(self.db.count(), 1)

              def test_refuses_big_marks(self):
                  with self.assertRaises(ValueError):
                      self.db.add("Om", "Maths", 101)
                  self.assertEqual(self.db.count(), 0)

              def test_marks_of_a_to_z(self):
                  self.db.add("Asha", "Maths", 72)
                  self.db.add("Asha", "GK", 64)
                  self.assertEqual(self.db.marks_of("Asha"), [("GK", 64), ("Maths", 72)])

              def test_best(self):
                  self.db.add("Asha", "Maths", 72)
                  self.db.add("Ravi", "Maths", 81)
                  self.assertEqual(self.db.best("Maths"), ("Ravi", 81))

              def test_best_of_nothing(self):
                  self.assertIsNone(self.db.best("Science"))


          unittest.main()
        `,
        solution: py`
          import sqlite3
          import unittest


          class ResultsDB:
              def __init__(self, path=":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS results (name TEXT, subject TEXT, marks INTEGER)")

              def add(self, name, subject, marks):
                  # stores one result, or raises ValueError if the marks are not 0 to 100
                  if not 0 <= marks <= 100:
                      raise ValueError(f"marks must be 0 to 100, not {marks}")
                  self.con.execute("INSERT INTO results VALUES (?, ?, ?)", (name, subject, marks))
                  self.con.commit()

              def count(self):
                  # gives back how many results are stored
                  return self.con.execute("SELECT COUNT(*) FROM results").fetchone()[0]

              def marks_of(self, name):
                  # gives back (subject, marks) pairs for one student, A to Z by subject
                  query = "SELECT subject, marks FROM results WHERE name = ? ORDER BY subject"
                  return self.con.execute(query, (name,)).fetchall()

              def best(self, subject):
                  # gives back (name, marks) of the top scorer in a subject, or None
                  query = "SELECT name, marks FROM results WHERE subject = ? ORDER BY marks DESC, name LIMIT 1"
                  return self.con.execute(query, (subject,)).fetchone()

              def averages(self):
                  # gives back one line for each subject, A to Z, like "Maths: 76.5 from 2"
                  query = "SELECT subject, AVG(marks), COUNT(*) FROM results GROUP BY subject ORDER BY subject"
                  return [f"{subject}: {round(avg, 1)} from {n}" for subject, avg, n in self.con.execute(query)]

              def pass_count(self, subject, pass_mark):
                  # gives back how many results in a subject reach the pass mark
                  query = "SELECT COUNT(*) FROM results WHERE subject = ? AND marks >= ?"
                  return self.con.execute(query, (subject, pass_mark)).fetchone()[0]


          db = ResultsDB()
          for name, subject, marks in [("Asha", "Maths", 72), ("Ravi", "Maths", 81), ("Asha", "GK", 64),
                                       ("Ravi", "GK", 58), ("Meena", "English", 90)]:
              db.add(name, subject, marks)
          try:
              db.add("Om", "Maths", 120)
          except ValueError as e:
              print("Refused:", e)
          print("Stored:", db.count())

          print(db.marks_of("Asha"))
          print(db.best("Maths"), db.best("Science"))

          for line in db.averages():
              print(line)

          print(db.pass_count("Maths", 70), db.pass_count("GK", 60))


          class TestResultsDB(unittest.TestCase):
              def setUp(self):
                  self.db = ResultsDB()

              def test_count(self):
                  self.db.add("Asha", "Maths", 72)
                  self.assertEqual(self.db.count(), 1)

              def test_refuses_big_marks(self):
                  with self.assertRaises(ValueError):
                      self.db.add("Om", "Maths", 101)
                  self.assertEqual(self.db.count(), 0)

              def test_marks_of_a_to_z(self):
                  self.db.add("Asha", "Maths", 72)
                  self.db.add("Asha", "GK", 64)
                  self.assertEqual(self.db.marks_of("Asha"), [("GK", 64), ("Maths", 72)])

              def test_best(self):
                  self.db.add("Asha", "Maths", 72)
                  self.db.add("Ravi", "Maths", 81)
                  self.assertEqual(self.db.best("Maths"), ("Ravi", 81))

              def test_best_of_nothing(self):
                  self.assertIsNone(self.db.best("Science"))

              def test_pass_count(self):
                  self.db.add("Asha", "Maths", 72)
                  self.db.add("Ravi", "GK", 90)
                  self.db.add("Om", "Maths", 50)
                  self.assertEqual(self.db.pass_count("Maths", 60), 1)


          unittest.main()
        `,
        tests: [
          { contains: ["Maths: 76.5 from 2\n2 1"] },
          { py: py`
              db = new("ResultsDB")
              db.add("A", "GK", 59)
              db.add("B", "GK", 60)
              db.add("C", "Maths", 95)
              assert db.pass_count("GK", 60) == 1, f"Only B reaches 60 in GK, but pass_count gave {db.pass_count('GK', 60)}."
              assert db.pass_count("Art", 10) == 0, "A subject with no results should give 0."
              r = unit("TestResultsDB")
              assert r.wasSuccessful(), "A test in TestResultsDB fails on your own database."
              class PassCountUsesOr:
                  def __init__(self, path=":memory:"):
                      self.con = sqlite3.connect(path)
                      self.con.execute("CREATE TABLE IF NOT EXISTS results (name TEXT, subject TEXT, marks INTEGER)")

                  def add(self, name, subject, marks):
                      # stores one result, or raises ValueError if the marks are not 0 to 100
                      if not 0 <= marks <= 100:
                          raise ValueError(f"marks must be 0 to 100, not {marks}")
                      self.con.execute("INSERT INTO results VALUES (?, ?, ?)", (name, subject, marks))
                      self.con.commit()

                  def count(self):
                      # gives back how many results are stored
                      return self.con.execute("SELECT COUNT(*) FROM results").fetchone()[0]

                  def marks_of(self, name):
                      # gives back (subject, marks) pairs for one student, A to Z by subject
                      query = "SELECT subject, marks FROM results WHERE name = ? ORDER BY subject"
                      return self.con.execute(query, (name,)).fetchall()

                  def best(self, subject):
                      # gives back (name, marks) of the top scorer in a subject, or None
                      query = "SELECT name, marks FROM results WHERE subject = ? ORDER BY marks DESC, name LIMIT 1"
                      return self.con.execute(query, (subject,)).fetchone()

                  def averages(self):
                      # gives back one line for each subject, A to Z, like "Maths: 76.5 from 2"
                      query = "SELECT subject, AVG(marks), COUNT(*) FROM results GROUP BY subject ORDER BY subject"
                      return [f"{subject}: {round(avg, 1)} from {n}" for subject, avg, n in self.con.execute(query)]

                  def pass_count(self, subject, pass_mark):
                      # gives back how many results in a subject reach the pass mark
                      query = "SELECT COUNT(*) FROM results WHERE subject = ? OR marks >= ?"
                      return self.con.execute(query, (subject, pass_mark)).fetchone()[0]
              assert not unit("TestResultsDB", ResultsDB=PassCountUsesOr).wasSuccessful(), "A «pass_count» that uses OR still passed your tests. Add a test with a high mark in another subject, and a low mark in this one."
            ` },
        ],
        wrong: [py`
          import sqlite3
          import unittest


          class ResultsDB:
              def __init__(self, path=":memory:"):
                  self.con = sqlite3.connect(path)
                  self.con.execute("CREATE TABLE IF NOT EXISTS results (name TEXT, subject TEXT, marks INTEGER)")

              def add(self, name, subject, marks):
                  # stores one result, or raises ValueError if the marks are not 0 to 100
                  if not 0 <= marks <= 100:
                      raise ValueError(f"marks must be 0 to 100, not {marks}")
                  self.con.execute("INSERT INTO results VALUES (?, ?, ?)", (name, subject, marks))
                  self.con.commit()

              def count(self):
                  # gives back how many results are stored
                  return self.con.execute("SELECT COUNT(*) FROM results").fetchone()[0]

              def marks_of(self, name):
                  # gives back (subject, marks) pairs for one student, A to Z by subject
                  query = "SELECT subject, marks FROM results WHERE name = ? ORDER BY subject"
                  return self.con.execute(query, (name,)).fetchall()

              def best(self, subject):
                  # gives back (name, marks) of the top scorer in a subject, or None
                  query = "SELECT name, marks FROM results WHERE subject = ? ORDER BY marks DESC, name LIMIT 1"
                  return self.con.execute(query, (subject,)).fetchone()

              def averages(self):
                  # gives back one line for each subject, A to Z, like "Maths: 76.5 from 2"
                  query = "SELECT subject, AVG(marks), COUNT(*) FROM results GROUP BY subject ORDER BY subject"
                  return [f"{subject}: {round(avg, 1)} from {n}" for subject, avg, n in self.con.execute(query)]

              def pass_count(self, subject, pass_mark):
                  # gives back how many results in a subject reach the pass mark
                  query = "SELECT COUNT(*) FROM results WHERE subject = ? OR marks >= ?"
                  return self.con.execute(query, (subject, pass_mark)).fetchone()[0]


          db = ResultsDB()
          for name, subject, marks in [("Asha", "Maths", 72), ("Ravi", "Maths", 81), ("Asha", "GK", 64),
                                       ("Ravi", "GK", 58), ("Meena", "English", 90)]:
              db.add(name, subject, marks)
          try:
              db.add("Om", "Maths", 120)
          except ValueError as e:
              print("Refused:", e)
          print("Stored:", db.count())

          print(db.marks_of("Asha"))
          print(db.best("Maths"), db.best("Science"))

          for line in db.averages():
              print(line)

          print(db.pass_count("Maths", 70), db.pass_count("GK", 60))


          class TestResultsDB(unittest.TestCase):
              def setUp(self):
                  self.db = ResultsDB()

              def test_count(self):
                  self.db.add("Asha", "Maths", 72)
                  self.assertEqual(self.db.count(), 1)

              def test_refuses_big_marks(self):
                  with self.assertRaises(ValueError):
                      self.db.add("Om", "Maths", 101)
                  self.assertEqual(self.db.count(), 0)

              def test_marks_of_a_to_z(self):
                  self.db.add("Asha", "Maths", 72)
                  self.db.add("Asha", "GK", 64)
                  self.assertEqual(self.db.marks_of("Asha"), [("GK", 64), ("Maths", 72)])

              def test_best(self):
                  self.db.add("Asha", "Maths", 72)
                  self.db.add("Ravi", "Maths", 81)
                  self.assertEqual(self.db.best("Maths"), ("Ravi", 81))

              def test_best_of_nothing(self):
                  self.assertIsNone(self.db.best("Science"))

              def test_pass_count(self):
                  self.db.add("Asha", "Maths", 72)
                  self.db.add("Ravi", "GK", 90)
                  self.db.add("Om", "Maths", 50)
                  self.assertEqual(self.db.pass_count("Maths", 60), 1)


          unittest.main()
        `],
        hints: [
          md`If GK counts results from other subjects, join the two tests with «AND», not «OR».`,
          md`If you see «Stored» but not «2 1», the new line must come before the test class and «unittest.main()».`,
          md`If the broken «OR» copy passes your tests, give your test a high mark in another subject: «OR» counts it, «AND» does not.`,
        ],
      },
    ],
    keys: [
      md`A class can hide the SQL: callers say «db.best("Maths")», not «SELECT ...».`,
      md`Check first, then change: refuse bad marks before the INSERT.`,
      md`Give every value with «?»; let SQLite sort, group and average.`,
      md`«setUp» runs before every test, so each test gets a fresh database.`,
      md`Good tests fail on broken copies. Test the edges, the empty cases and the order.`,
    ],
  });
})();
