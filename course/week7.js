// Week 7 — Your Laptop, First Bug Hunts (Days 43 to 49).
// Day 43 and 44 move the learner from this page to Python on their own Windows laptop.
// Days 45 to 49 teach debugging by name: tracebacks, the common errors, logic bugs,
// looking inside with print, and off-by-one loops.
(function () {
  const { day, md, py, ex, code, tip, warn, ask, pause } = window.Course;

  // ---------------------------------------------------------------- Day 43
  day({
    slug: "install-python-windows",
    title: "Python on Your Own Laptop",
    goal: "Install Python on Windows and run one line in the Command Prompt.",
    minutes: 40,
    kind: "lesson",
    needs: [1, 40],
    win: "Today you can now run Python on your own laptop, with no web page.",
    learn: [
      md`
        ## Getting Python from python.org

        Until today, Python ran inside this page. Today you put Python on your own Windows laptop. It is free, and it comes from one safe place: **python.org**.

        1. Open **python.org/downloads** in your browser.
        2. Press the button for the **Python install manager**. An install manager is a small program that installs Python for you.
        3. Open the downloaded file and press **Install**.

        The first time you type a Python command, a black window may ask yes or no questions. Press Enter for each one. Enter takes the suggested answer, which is always safe. Python comes with **IDLE**, a simple window for writing Python. You use it tomorrow.
      `,
      tip(md`
        **If the install manager does not work:** go back to python.org/downloads/windows. Under Python 3.14, press **Windows installer (64-bit)**. On its first screen, tick **Add python.exe to PATH**. PATH is the list of folders where Windows looks for programs. Then press **Install Now**. Nothing in this course depends on today's install, so a failed install blocks nothing.
      `),
      md`
        ## The Command Prompt

        The **Command Prompt** is a window where you type commands, one line at a time. To open it, press the Windows key, type «cmd», and press Enter. Now type «python --version» and press Enter. It shows the version number, which is the name of this release of Python:

        | Python 3.14.2

        Your number may be different, such as 3.15.0. Any number that starts with 3 is good.
      `,
      warn(md`
        **"'python' is not recognized as an internal or external command."** This message means Windows cannot find Python yet. Try these, in order:

        1. Type «py --version» instead. «py» is a second name for Python on Windows.
        2. Close the Command Prompt and open a new one. A new window sees new programs.
        3. Restart the laptop, then try again.

        If «python» opens the Microsoft Store, close the Store and use «py». You never need to change a security setting for this course.
      `),
      md`
        ## The >>> prompt and exit()

        Type «python» alone and press Enter. You see «>>>», which is the Python **prompt**: Python waiting for one line. At this prompt, Python shows the answer to each calculation, even without «print». A program in a file does not. Guess what this program shows, then press Run.
      `,
      ex(py`
        12 * 15
        print(12 * 15)
      `, { predict: ["180\n180", "180", "Nothing"], answer: 1 }),
      md`
        The first line works out 180 and then forgets it. Only «print» shows a value in a program. To leave the «>>>» prompt, type «exit()» and press Enter.
      `,
      ask({
        q: md`You type «python --version» and see "'python' is not recognized". What do you try first?`,
        options: ["Type «py --version»", "Install Python three more times", "Change a security setting"],
        answer: 0,
        explain: md`«py» is a second name for Python on Windows. It often works when «python» does not.`,
        why: [null, md`Installing again rarely helps. First try «py», then a new Command Prompt.`, md`This course never asks you to change a security setting.`],
      }),
    ],
    quiz: [
      { q: md`Which command shows the version of Python on your laptop?`,
        options: ["«python --version»", "«print(version)»", "«python version»"], answer: 0,
        explain: md`Two dashes, then the word version: «python --version». «py --version» also works.`,
        why: [null, md`That is a line of Python, not a command for the Command Prompt.`, md`The two dashes are needed. Without them, Python looks for a file called version.`],
        skill: "memory" },
      { q: md`You are at the «>>>» prompt. How do you leave it?`,
        options: ["Type «exit()» and press Enter", "Type «stop» and press Enter", "Type «cmd»"], answer: 0,
        explain: md`«exit()» closes Python and gives you back the normal Command Prompt. In Python 3.14, «exit» with no brackets also works.`,
        why: [null, md`«stop» is not a Python word. Python shows a NameError and keeps waiting.`, md`«cmd» opens a Command Prompt. It does not leave Python.`],
        skill: "memory" },
      { q: md`What does this program show?`, code: py`
          7 * 20
          print(7 + 20)
        `, options: ["27", "140\n27", "140"], answer: 0,
        explain: md`In a program, only «print» shows a value. The first line works out 140 and shows nothing.`,
        why: [null, md`That is what the «>>>» prompt shows. A program in a file does not.`, md`Line 1 is never printed, and line 2 adds.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          print("Python works on my laptop!")
          print(2026 - 2000)
        `, options: ["It prints a message and the number 26", "It installs Python", "It shows the Python version"],
        answer: 0, verify: false, mono: false,
        explain: md`It prints one line of text, then the answer to 2026 minus 2000.`,
        why: [null, md`A program cannot install Python. You install it from python.org.`, md`«python --version» in the Command Prompt shows the version.`],
        skill: "read" },
      { q: md`«python» opens the Microsoft Store instead of Python. What is the safe next step?`,
        options: ["Close the Store and type «py»", "Buy an app from the Store", "Turn off the antivirus"], answer: 0,
        explain: md`«py» starts Python on Windows. You never need to buy anything or change a security setting.`,
        why: [null, md`Python is free. Never pay for it.`, md`Never turn off security software for this course.`],
        skill: "debug" },
    ],
    practice: [
      {
        id: "d1", kind: "drill", title: "Command Drill: your first commands",
        task: md`
          This is a pretend Command Prompt. Type each command and press Enter. It shows what your laptop shows.

          On a phone, you may skip this drill. The mission below stays open for later.
        `,
        steps: [
          { say: md`Check that Python is there. Type «python --version» and press Enter.`,
            expect: ["python --version", "python -V"], output: "Python 3.14.2" },
          { say: md`Now try the second name for Python. Type «py --version» and press Enter.`,
            expect: ["py --version", "py -V"], output: "Python 3.14.2" },
          { say: md`Start Python itself. Type «python» and press Enter. On a real laptop, you then see «>>>».`,
            expect: ["python", "py"], output: "Python 3.14.2 on win32\nType \"help\", \"copyright\", \"credits\" or \"license\" for more information." },
          { say: md`Python is waiting. Type «print("Namaste")» and press Enter.`,
            expect: ["print(\"Namaste\")", "print('Namaste')"], output: "Namaste" },
          { say: md`At the «>>>» prompt, Python shows a value without «print». Type «12 * 15» and press Enter.`,
            expect: ["12 * 15", "12*15"], output: "180" },
          { say: md`Leave Python. Type «exit()» and press Enter.`,
            expect: ["exit()", "quit()", "exit", "quit"], output: "" },
        ],
        mission: md`
          Now do it for real. Press the Windows key, type «cmd», and press Enter.

          1. Type «python --version». If it says "not recognized", use «py» in place of «python» for every step.
          2. Type «python» to see «>>>».
          3. Type «print("Receipt", 43 * 1001)» and press Enter. It shows «Receipt 43043». This is your receipt code. Write it in your notebook: it proves Python runs on your laptop.
          4. Type «exit()».

          If the install did not work today, that is fine. Every next day still opens, and this mission waits for you.
        `,
        hints: [
          md`Type the words in the grey box exactly, then press Enter.`,
          md`Count the dashes and spaces: one space after python, then two dashes.`,
          md`If you are stuck, copy the command from the step text letter by letter.`,
        ],
      },
    ],
    keys: [
      md`Python is free from python.org. Use the Python install manager, or the Windows installer with **Add python.exe to PATH** ticked.`,
      md`Open the Command Prompt: Windows key, type «cmd», press Enter.`,
      md`«python --version» shows the version. If «python» is not recognized, try «py», then a new Command Prompt.`,
      md`At the «>>>» prompt, Python shows each value. In a program, only «print» shows a value.`,
      md`«exit()» leaves the «>>>» prompt.`,
    ],
  });
  // ---------------------------------------------------------------- Day 44
  day({
    slug: "run-py-files",
    title: "Writing and Running .py Files",
    goal: "Save a program as a file in IDLE and run it yourself.",
    minutes: 40,
    kind: "lesson",
    needs: [6, 43],
    win: "Today you can now save a program as a .py file and run it on your laptop.",
    learn: [
      md`
        ## A folder, and the end of the file name

        A Python program is saved in a **.py file**, a file whose name ends in «.py», like «chai.py». First, make Windows show the end of every file name. In File Explorer, open **View**, then **Show**, and tick **File name extensions**. On Windows 10, open the **View** tab and tick **File name extensions**.

        Next, make a **project folder**: one folder for all your Python files. Open **Documents**, then make a new folder called «python-days».
      `,
      warn(md`
        **The chai.py.txt trap.** Notepad often adds «.txt» to the end. The file then looks like «chai.py», but its real name is «chai.py.txt», and Python cannot run it. With extensions on, you see the real name. Rename it to «chai.py».
      `),
      md`
        ## IDLE: New File, Save, F5

        IDLE comes with Python, so there is nothing more to install. Press the Windows key, type «IDLE», and open **IDLE**. Its name may also show the version, like «IDLE (Python 3.14)». If it is missing, type «py -m idlelib» in the Command Prompt.

        1. Open **File**, then **New File**. A blank window opens.
        2. Type the program below.
        3. Open **File**, then **Save As**. Choose «python-days» and name it «chai.py».
        4. Press **F5**. The output appears in the IDLE Shell window.

        Guess the output first.
      `,
      ex(py`
        cups = 3
        price = 12
        print("Chai bill:", cups * price)
      `, { predict: ["Chai bill: 36", "Chai bill: cups * price", "36"], answer: 0, label: "chai.py" }),
      tip(md`
        **The unsaved file trap.** IDLE runs the saved file, not the words on the screen. If you press F5 before saving, IDLE asks to save. Press **OK**. Always save, then run.
      `),
      md`
        ## Running a file from the Command Prompt

        You can also run a file in the Command Prompt. «cd» means change directory: it moves the Command Prompt into a folder. «dir» lists the files in that folder.

        : cd Documents\python-days
        : dir
        : python chai.py

        Type these in the Command Prompt, not at the «>>>» prompt. Watch what happens at «>>>».
      `,
      ex(py`
        python chai.py
      `, { error: true, label: "Typed at the >>> prompt", predict: ["SyntaxError", "Chai bill: 36", "NameError"], answer: 0 }),
      md`
        At «>>>», Python reads each line as Python, so «python chai.py» is a SyntaxError. Type «exit()» first.
      `,
      tip(md`
        **If cd says "The system cannot find the path specified":** open the «python-days» folder in File Explorer. Click the address bar at the top, type «cmd», and press Enter. A Command Prompt opens inside that folder. VS Code is a bigger editor you may try later. No day in this course needs it.
      `),
    ],
    quiz: [
      { q: md`In IDLE, which key runs the file you are editing?`,
        options: ["F5", "Enter", "Esc"], answer: 0,
        explain: md`F5 is the same as **Run**, then **Run Module**. IDLE asks you to save first.`,
        why: [null, md`Enter only starts a new line in the file.`, md`Esc does not run anything.`],
        skill: "memory" },
      { q: md`In File Explorer you see «marks.py.txt». Why does «python marks.py» fail?`,
        options: ["The real name ends in .txt, so marks.py does not exist", "Python cannot read marks", "The file is too small"], answer: 0,
        explain: md`Notepad added «.txt». Rename the file to «marks.py».`,
        why: [null, md`Python reads any .py file. The problem is the name.`, md`Size does not matter. The name is wrong.`],
        skill: "debug" },
      { q: md`You are in the Command Prompt, inside «python-days». Which command runs «samosa.py»?`,
        options: ["«python samosa.py»", "«run samosa»", "«print(samosa.py)»"], answer: 0,
        explain: md`«python» and then the file name. «py samosa.py» also works.`,
        why: [null, md`There is no run command. Use «python» and the full file name.`, md`That is a line of Python. It does not run a file.`],
        skill: "choose" },
      { q: md`This is «samosa.py». What does it print?`, code: py`
          samosas = 4
          price = 15
          print("Pay", samosas * price, "rupees")
        `, options: ["Pay 60 rupees", "Pay samosas * price rupees", "60"], answer: 0,
        explain: md`«print» shows the label, the product of 4 and 15, and the word rupees, with spaces between.`,
        why: [null, md`There are no quotes around «samosas * price», so Python works it out.`, md`«print» also shows the two pieces of text.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          name = input("Your name: ")
          print("Welcome to your laptop,", name)
        `, options: ["It asks for a name, then welcomes that person", "It saves a file called name", "It prints the word name"],
        answer: 0, verify: false, mono: false,
        explain: md`«input» waits for a name. «print» then shows the welcome with that name.`,
        why: [null, md`Nothing here saves a file.`, md`«name» has no quotes, so Python prints what the user typed.`],
        skill: "read" },
    ],
    practice: [
      {
        id: "d1", kind: "drill", title: "Command Drill: run a file",
        task: md`
          Your file «chai.py» is saved in «Documents\python-days». Practise running it in this pretend Command Prompt.

          On a phone, you may skip this drill. The mission below stays open for later.
        `,
        steps: [
          { say: md`Move into your project folder. Type «cd Documents\python-days» and press Enter.`,
            expect: ["cd Documents\\python-days", "cd documents\\python-days", "cd Documents/python-days", "cd documents/python-days"], output: "" },
          { say: md`List the files here. Type «dir» and press Enter.`,
            expect: ["dir"], output: " Directory of C:\\Users\\Asha\\Documents\\python-days\n\n10-11-2026  07:15 PM                57 chai.py\n               1 File(s)             57 bytes" },
          { say: md`Run the program. Type «python chai.py» and press Enter.`,
            expect: ["python chai.py"], output: "Chai bill: 36" },
          { say: md`Now try a file that is not in the folder. Type «python bill.py» and press Enter.`,
            expect: ["python bill.py"], output: "python: can't open file 'C:\\Users\\Asha\\Documents\\python-days\\bill.py': [Errno 2] No such file or directory" },
          { say: md`«dir» showed only «chai.py», so there is no «bill.py». Run «chai.py» with the second name: type «py chai.py».`,
            expect: ["py chai.py"], output: "Chai bill: 36" },
        ],
        mission: md`
          Now do it on your laptop.

          1. In IDLE, make a new file. Type «print("Receipt", 44 * 1001)» and save it as «receipt.py» in «python-days».
          2. Press F5. It shows «Receipt 44044». This is your receipt code. Write it in your notebook.
          3. Open the Command Prompt, «cd» into «python-days», and type «python receipt.py». You see the same line.

          If something does not work, read the tips in the lesson. Every next day still opens.
        `,
        hints: [
          md`Type the words in the grey box exactly, then press Enter.`,
          md`The line between Documents and python-days is a backslash, the key above Enter.`,
          md`If you are stuck, copy the command from the step text letter by letter.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a chai bill file",
        task: md`
          You may write this in IDLE as «bill.py», run it with F5, and then paste it here. Ask how many cups of chai. One cup costs 12 rupees. When the user types «3», it shows:

          | Cups: 3
          | Bill: 36 rupees
        `,
        starter: py`

        `,
        solution: py`
          cups = int(input("How many cups? "))
          print("Cups:", cups)
          print("Bill:", cups * 12, "rupees")
        `,
        tests: [
          { inputs: ["3"], output: "Cups: 3\nBill: 36 rupees" },
          { inputs: ["1"], output: "Cups: 1\nBill: 12 rupees" },
          { inputs: ["0"], output: "Cups: 0\nBill: 0 rupees" },
          { inputs: ["25"], output: "Cups: 25\nBill: 300 rupees" },
        ],
        wrong: [py`
          cups = input("How many cups? ")
          print("Cups:", cups)
          print("Bill:", cups * 12, "rupees")
        `, py`
          cups = int(input("How many cups? "))
          print("Cups:", cups)
          print("Bill:", cups + 12, "rupees")
        `],
        hints: [
          md`Ask, change the answer into a whole number, then print two lines.`,
          md`The answer from input is text. Change it into a number before you multiply.`,
          md`The bill is the number of cups times 12. Print the label, the bill, and the word rupees.`,
        ],
      },
      {
        id: "k2", kind: "make", title: "Make: a samosa order",
        task: md`
          Write this in IDLE as «samosa.py» if you can, then paste it here. Ask for a name, then for a number of samosas. One samosa costs 15 rupees. When the user types «Ravi» and «4», it shows:

          | Ravi pays 60 rupees for 4 samosas.
        `,
        starter: py`

        `,
        solution: py`
          name = input("Your name: ")
          count = int(input("How many samosas? "))
          print(f"{name} pays {count * 15} rupees for {count} samosas.")
        `,
        tests: [
          { inputs: ["Ravi", "4"], output: "Ravi pays 60 rupees for 4 samosas." },
          { inputs: ["Meena", "2"], output: "Meena pays 30 rupees for 2 samosas." },
          { inputs: ["Arjun Singh", "10"], output: "Arjun Singh pays 150 rupees for 10 samosas." },
        ],
        wrong: [py`
          name = input("Your name: ")
          count = int(input("How many samosas? "))
          print(f"{name} pays {count + 15} rupees for {count} samosas.")
        `, py`
          name = input("Your name: ")
          count = int(input("How many samosas? "))
          print("{name} pays {count * 15} rupees for {count} samosas.")
        `],
        hints: [
          md`Ask two questions, then print one line.`,
          md`The second answer must become a whole number before you multiply it.`,
          md`Use an f-string, and put the name, the price times the count, and the count inside curly brackets.`,
        ],
      },
    ],
    keys: [
      md`A Python program is saved in a file whose name ends in «.py».`,
      md`Turn on **File name extensions** in File Explorer, so you can see «chai.py.txt».`,
      md`In IDLE: **File**, **New File**, type, **Save As**, then F5. Always save before you run.`,
      md`In the Command Prompt: «cd» moves into a folder, «dir» lists its files, «python chai.py» runs one.`,
      md`Type «python chai.py» in the Command Prompt, never at the «>>>» prompt.`,
    ],
  });
  // ---------------------------------------------------------------- Day 45
  day({
    slug: "read-the-red-message",
    title: "Read the Red Message",
    goal: "Read an error message from the bottom up and find the line to fix.",
    minutes: 45,
    kind: "lesson",
    needs: [9, 31, 36],
    win: "Today you can now read a red error message and find the line to fix.",
    learn: [
      md`
        ## The last line names the error

        When Python stops with an error, it prints a **traceback**: a report of where the program was when it stopped. Always read it from the bottom up. The last line names the error and says what went wrong. Guess the name of this error, then press Run.
      `,
      ex(py`
        marks = [45, 67, 89]
        print(marks[3])
      `, { error: true, predict: ["IndexError", "NameError", "89"], answer: 0 }),
      md`
        Open **Python's own message** under the error card. You see this traceback:

        | Traceback (most recent call last):
        |   File "<your code>", line 2, in <module>
        |     print(marks[3])
        |           ~~~~~^^^
        | IndexError: list index out of range

        The last line has two parts: the error's name, «IndexError», and a short reason. The list has only positions 0, 1 and 2.
      `,
      md`
        ## File, line and in

        Above the last line, each pair of lines is one **level**: a place the program had reached. «File» names the file, «line» gives the line number, and «in» names the function. «<module>» means the main program, outside any function. The small «^» marks point at the exact part. Guess, then run.
      `,
      ex(py`
        def per_cup(total, cups):
            return total / cups

        def report(total, cups):
            print("Per cup:", per_cup(total, cups))

        report(60, 0)
      `, { error: true, predict: ["ZeroDivisionError", "TypeError", "Per cup: 0"], answer: 0 }),
      md`
        | Traceback (most recent call last):
        |   File "<your code>", line 7, in <module>
        |     report(60, 0)
        |   File "<your code>", line 5, in report
        |     print("Per cup:", per_cup(total, cups))
        |   File "<your code>", line 2, in per_cup
        |     return total / cups
        | ZeroDivisionError: division by zero

        This page leaves out the «^» lines here, to save space. Read upwards: Python stopped on line 2, inside «per_cup». Line 5 called «per_cup», and line 7 called «report».
      `,
      ask({
        q: md`In the traceback above, which line called «report»?`,
        options: ["Line 7", "Line 5", "Line 2"], answer: 0,
        explain: md`The top level is «in <module>», the main program. Its line 7 is «report(60, 0)».`,
        why: [null, md`Line 5 is inside «report». It called «per_cup».`, md`Line 2 is where Python stopped, inside «per_cup».`],
      }),
      pause(md`Good place for a short break. Next: when the line in the message is not the line to fix.`),
      md`
        ## The real mistake may be one line above

        The traceback names the line where Python stopped. Sometimes the real mistake is on an earlier line. Type «40» when the program asks.
      `,
      ex(py`
        marks = input("Marks: ")
        total = marks + 5
        print("With bonus:", total)
      `, { error: true, inputs: ["40"], predict: ["TypeError", "With bonus: 45", "With bonus: 405"], answer: 0 }),
      md`
        The message points at line 2. But line 2 is fine: line 1 kept the marks as text, because «input» always gives text. The fix is on line 1: «int(input("Marks: "))».
      `,
      tip(md`
        **Try it on your laptop.** In IDLE, save a file with «print(10 / 0)» and press F5. The red message looks the same. Only the «File» part is different: it shows your file's real name, like «C:\Users\Asha\Documents\python-days\test.py».
      `),
    ],
    quiz: [
      { q: md`Where do you start reading a traceback?`,
        options: ["At the last line, then upwards", "At the first line, then downwards", "Only at the line with the ^ marks"], answer: 0,
        explain: md`The last line names the error. The level just above it shows where Python stopped.`,
        why: [null, md`The first line only says "Traceback". The useful part is at the bottom.`, md`The ^ marks help, but the error's name is on the last line.`],
        skill: "memory" },
      { q: md`In a traceback, what does «in <module>» mean?`,
        options: ["The line is in the main program, outside any function", "The line is in a file called module", "Python could not find a module"], answer: 0,
        explain: md`«in» names the function. «<module>» is the name for the main program.`,
        why: [null, md`The file name comes after «File», not after «in».`, md`That would be a different error. «<module>» is just a place.`],
        skill: "memory" },
      { q: md`What happens?`, code: py`
          def half(n):
              return n / 0

          print("Start")
          print(half(10))
        `, options: ["ZeroDivisionError", "Start", "5.0"], answer: 0, error: true,
        explain: md`«Start» prints first. Then line 2, inside «half», divides by zero and stops the program.`,
        why: [null, md`«Start» does print, but the program then stops with an error.`, md`Line 2 divides by 0, not by 2.`],
        skill: "debug" },
      { q: md`A traceback ends with «TypeError» on «total = marks + 5». Line 1 is «marks = input("Marks: ")». Which line do you fix?`,
        options: ["Line 1: change the marks into a number", "Line 2: delete the 5", "Line 2: add quotes around 5"], answer: 0,
        explain: md`Line 2 is correct. The value from line 1 is text, so the real mistake is one line above.`,
        why: [null, md`The bonus is needed. The problem is that «marks» is text.`, md`Quotes would join "40" and "5" into "405", not add them.`],
        skill: "debug" },
      { q: md`What does this program do?`, code: py`
          def per_student(total, students):
              return total / students

          print(per_student(500, 4))
        `, options: ["It shares 500 equally among 4 students and prints each share", "It prints 500 four times", "It crashes with ZeroDivisionError"],
        answer: 0, verify: false, mono: false,
        explain: md`The function divides the total by the number of students, and the program prints 125.0.`,
        why: [null, md`There is no loop. It divides once.`, md`It divides by 4, not by 0, so it does not crash.`],
        skill: "read" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: one function calls another",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          def double(x):
              return x * 2

          def with_tip(bill):
              return double(bill) + 5

          total = with_tip(30)
          print("Total:", total)
        `,
        inputs: [],
        ask: [{ line: 7, name: "total" }, { output: true }],
        hints: [
          md`Start at line 7. It calls the second function with 30.`,
          md`Inside, the first function doubles the bill. Then 5 is added.`,
          md`Double 30 is 60. Add 5 to that.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: before the crash",
        task: md`This program stops with an error. Answer what you can see before it stops.`,
        code: py`
          runs = [4, 6, 2]
          total = 0
          for r in runs:
              total += r
              print("So far:", total)
          print(runs[3])
        `,
        inputs: [],
        ask: [{ line: 4, hit: 2, name: "total" }, { output: true }],
        hints: [
          md`Keep the total on paper. It starts at 0 and grows on each round.`,
          md`Each round prints one line. The last line of the program then fails, because the list has no position 3.`,
          md`The output is the three printed lines. The error message is not part of the output.`,
        ],
      },
      {
        id: "r1", kind: "read", title: "Traceback card: an empty class",
        task: md`
          The program below stops with this message:

          | Traceback (most recent call last):
          |   File "<your code>", line 6, in <module>
          |     print("Average:", average(class_a))
          |                       ~~~~~~~^^^^^^^^^
          |   File "<your code>", line 3, in average
          |     return total / len(marks)
          |            ~~~~~~^~~~~~~~~~~~
          | ZeroDivisionError: division by zero
        `,
        code: py`
          def average(marks):
              total = sum(marks)
              return total / len(marks)

          class_a = []
          print("Average:", average(class_a))
        `,
        questions: [
          { q: md`Tap the line where Python stopped.`, options: ["Line 3", "Line 6", "Line 5"], answer: 0,
            explain: md`The lowest level says «line 3, in average». Python stopped there.`,
            why: [null, md`Line 6 called the function. It is one level higher.`, md`Line 5 is not in the message at all.`], skill: "debug" },
          { q: md`Why did it stop?`, options: ["The list is empty, so len(marks) is 0", "sum does not work on lists", "average is not defined"], answer: 0,
            explain: md`«class_a» is «[]», so the program divides by 0. The real cause is the empty list from line 5.`,
            why: [null, md`«sum» works on lists. The problem is dividing by 0.`, md`The function is defined on line 1, so it exists.`], skill: "debug" },
        ],
      },
      {
        id: "r2", kind: "read", title: "Traceback card: the price list",
        task: md`
          The program below stops with this message:

          | Traceback (most recent call last):
          |   File "<your code>", line 3, in <module>
          |     print("Price:", prices[item])
          |                     ~~~~~~^^^^^^
          | KeyError: 'Chai'
        `,
        code: py`
          prices = {"chai": 12, "samosa": 15}
          item = "Chai"
          print("Price:", prices[item])
        `,
        questions: [
          { q: md`What is the name of the error?`, options: ["KeyError", "Chai", "IndexError"], answer: 0,
            explain: md`The name is the first word of the last line. «'Chai'» is the key that was missing.`,
            why: [null, md`«'Chai'» is the reason part, the key Python could not find.`, md`IndexError is for list positions. This is a dictionary.`], skill: "debug" },
          { q: md`Tap the line with the real mistake.`, options: ["Line 2", "Line 3", "Line 1"], answer: 0,
            explain: md`Python stopped on line 3, but line 2 has a capital C. The dictionary key is «"chai"».`,
            why: [null, md`Line 3 is correct. It looks up whatever «item» holds.`, md`Line 1 is a correct dictionary.`], skill: "debug" },
        ],
      },
      {
        id: "r3", kind: "read", title: "Traceback card: a typing slip",
        task: md`
          The program below stops with this message:

          | Traceback (most recent call last):
          |   File "<your code>", line 3, in <module>
          |     totl += m
          |     ^^^^
          | NameError: name 'totl' is not defined. Did you mean: 'total'?
        `,
        code: py`
          total = 0
          for m in [40, 50, 60]:
              totl += m
          print(total)
        `,
        questions: [
          { q: md`Tap the line to fix.`, options: ["Line 3", "Line 1", "Line 4"], answer: 0,
            explain: md`Line 3 spells the name «totl». It should be «total».`,
            why: [null, md`Line 1 is correct. It makes «total».`, md`Python never reached line 4.`], skill: "debug" },
          { q: md`What does «Did you mean: 'total'?» tell you?`, options: ["Python found a name that looks close", "Python changed the name for you", "The program printed total"], answer: 0,
            explain: md`Python suggests a similar name. You still make the change yourself.`,
            why: [null, md`Python never changes your code. It only suggests.`, md`Nothing was printed. The program stopped on line 3.`], skill: "read" },
        ],
      },
      {
        id: "r4", kind: "read", title: "Traceback card: the last ball",
        task: md`
          The program below stops with this message:

          | Traceback (most recent call last):
          |   File "<your code>", line 5, in <module>
          |     print("Last ball:", last_ball(over))
          |                         ~~~~~~~~~^^^^^^
          |   File "<your code>", line 2, in last_ball
          |     return balls[len(balls)]
          |            ~~~~~^^^^^^^^^^^^
          | IndexError: list index out of range
        `,
        code: py`
          def last_ball(balls):
              return balls[len(balls)]

          over = [1, 4, 0, 6, 2, 1]
          print("Last ball:", last_ball(over))
        `,
        questions: [
          { q: md`Tap the line where Python stopped.`, options: ["Line 2", "Line 5", "Line 4"], answer: 0,
            explain: md`The lowest level says «line 2, in last_ball».`,
            why: [null, md`Line 5 is the call, one level up.`, md`Line 4 only makes the list. It ran without a problem.`], skill: "debug" },
          { q: md`The list has 6 items. Which position is the last one?`, options: ["5", "6", "-6"], answer: 0,
            explain: md`Positions start at 0, so 6 items have positions 0 to 5. «len(balls)» is 6, one too far.`,
            why: [null, md`Position 6 would be a seventh item. That is why Python stopped.`, md`«-6» is the first item, not the last. The last is «-1» or 5.`], skill: "read" },
        ],
      },
      {
        id: "b1", kind: "bug", title: "Fix: the average of the marks",
        task: md`
          The user types marks with spaces between them. The program should print the average. When the user types «40 60», it should show «Average: 50.0». Instead it stops with «TypeError» on line 4. Read the message, find the real mistake, and fix it.
        `,
        starter: py`
          def average(marks):
              total = 0
              for m in marks:
                  total += m
              return total / len(marks)

          scores = input("Marks: ").split()
          print("Average:", average(scores))
        `,
        bugLines: [4, 7],
        solution: py`
          def average(marks):
              total = 0
              for m in marks:
                  total += m
              return total / len(marks)

          scores = [int(x) for x in input("Marks: ").split()]
          print("Average:", average(scores))
        `,
        tests: [
          { inputs: ["40 60"], output: "Average: 50.0" },
          { inputs: ["33"], output: "Average: 33.0" },
          { inputs: ["10 20 30 45"], output: "Average: 26.25" },
          { inputs: ["0 0"], output: "Average: 0.0" },
        ],
        wrong: [py`
          def average(marks):
              total = 0
              for m in marks:
                  total += m
              return total // len(marks)

          scores = [int(x) for x in input("Marks: ").split()]
          print("Average:", average(scores))
        `, py`
          def average(marks):
              total = 0
              for m in marks:
                  total += m
              return total / len(marks)

          scores = int(input("Marks: "))
          print("Average:", average(scores))
        `],
        hints: [
          md`Read the last line of the message. It says text and a number cannot be added.`,
          md`Line 4 adds each mark. Ask where the marks come from: line 7 splits the typed line into pieces of text.`,
          md`Change each piece into a whole number on line 7, with a list comprehension, before the function gets the list.`,
        ],
      },
      {
        id: "b2", kind: "bug", title: "Fix: runs in an over",
        task: md`
          The user types the runs from each ball, with spaces. The program should add them. When the user types «4 1 6 0 2 6», it should show «Runs: 19». Instead it stops with «IndexError» on line 4. Find the real mistake and fix it.
        `,
        starter: py`
          balls = [int(x) for x in input("Runs on each ball: ").split()]
          total = 0
          for i in range(1, len(balls) + 1):
              total += balls[i]
          print("Runs:", total)
        `,
        bugLines: [3],
        solution: py`
          balls = [int(x) for x in input("Runs on each ball: ").split()]
          total = 0
          for i in range(len(balls)):
              total += balls[i]
          print("Runs:", total)
        `,
        tests: [
          { inputs: ["4 1 6 0 2 6"], output: "Runs: 19" },
          { inputs: ["6"], output: "Runs: 6" },
          { inputs: ["1 2"], output: "Runs: 3" },
          { inputs: ["0 0 0"], output: "Runs: 0" },
        ],
        wrong: [py`
          balls = [int(x) for x in input("Runs on each ball: ").split()]
          total = 0
          for i in range(1, len(balls)):
              total += balls[i]
          print("Runs:", total)
        `, py`
          balls = [int(x) for x in input("Runs on each ball: ").split()]
          total = 0
          for i in range(len(balls) - 1):
              total += balls[i]
          print("Runs:", total)
        `],
        hints: [
          md`The message says a list position is out of range. Ask which positions the loop gives.`,
          md`Line 4 is where Python stopped, but line 3 makes the positions. Six balls have positions 0 to 5.`,
          md`Make the range start at 0 and stop at the length of the list.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a bill that does not crash",
        task: md`
          Ask how many cups of chai. One cup costs 12 rupees. Use «try» and «except ValueError», so a word never crashes the program. When the user types «3», it shows:

          | Bill: 36 rupees

          When the user types «three», it shows:

          | Please type a whole number.
        `,
        starter: py`

        `,
        solution: py`
          try:
              cups = int(input("How many cups? "))
              print("Bill:", cups * 12, "rupees")
          except ValueError:
              print("Please type a whole number.")
        `,
        tests: [
          { inputs: ["3"], output: "Bill: 36 rupees" },
          { inputs: ["three"], output: "Please type a whole number." },
          { inputs: ["0"], output: "Bill: 0 rupees" },
          { inputs: ["2.5"], output: "Please type a whole number." },
          { inputs: ["10"], output: "Bill: 120 rupees" },
        ],
        wrong: [py`
          cups = int(input("How many cups? "))
          print("Bill:", cups * 12, "rupees")
        `, py`
          try:
              cups = int(input("How many cups? "))
              print("Bill:", cups * 12, "rupees")
          except TypeError:
              print("Please type a whole number.")
        `],
        hints: [
          md`Put the risky lines in a try block, and the message in an except block.`,
          md`Changing a word into a whole number is the risky step. Find the name of that error in the lessons on errors.`,
          md`The except line names ValueError. Its block prints the message.`,
        ],
      },
    ],
    keys: [
      md`A **traceback** is Python's report of where the program was when it stopped.`,
      md`Read it from the bottom up. The last line names the error and gives a short reason.`,
      md`Each level shows «File», «line» and «in». The lowest level is where Python stopped.`,
      md`Levels higher up are the calls that led there. «<module>» means the main program.`,
      md`The real mistake may be on an earlier line, where the value was made.`,
    ],
  });
  // ---------------------------------------------------------------- Day 46
  day({
    slug: "error-field-guide",
    title: "The Error Field Guide",
    goal: "Match common errors to their usual causes and fix the ones you meet most.",
    minutes: 45,
    kind: "lesson",
    needs: [13, 22, 29, 45],
    win: "Today you can now name the common errors and go straight to their usual cause.",
    learn: [
      md`
        ## Errors in how the code is written

        A field guide is a small book that helps you name what you see. This is a field guide to errors. Some errors come from how the code is written. Python finds these before the program starts, so nothing runs at all. Guess, then run.
      `,
      ex(py`
        print("Start")
        marks = 45
        if marks >= 33
            print("Pass")
      `, { error: true, predict: ["SyntaxError", "Start", "Pass"], answer: 0 }),
      md`
        «Start» never prints. A **SyntaxError** usually means a missing colon, bracket or quote. An **IndentationError** means the spaces at the start of a line are wrong. A **NameError** means a name was never made, or is spelled differently. One error is new today. Guess its name.
      `,
      ex(py`
        city = "pune"
        print(city.uper())
      `, { error: true, predict: ["AttributeError", "NameError", "PUNE"], answer: 0 }),
      md`
        An **attribute** is a name after a dot, like «upper» in «city.upper()». An **AttributeError** means the value has no attribute with that name. Usually the method name is misspelled, or the value is a different kind than you think.
      `,
      pause(md`Good place for a short break. Next: errors about kinds and values, and errors about missing things.`),
      md`
        ## Wrong kind, wrong value

        A **TypeError** means the kind is wrong, like text plus a number. A **ValueError** means the kind is right, but the value is not usable. Guess this one.
      `,
      ex(py`
        price = "12.5"
        print(int(price))
      `, { error: true, predict: ["ValueError", "TypeError", "12"], answer: 0 }),
      md`
        «int» takes text, so the kind is right. But «"12.5"» is not a whole number, so the value is wrong.

        ## Missing things

        Four errors mean "it is not there":

        - **IndexError**: the list has no item at that position.
        - **KeyError**: the dictionary has no such key. Check capital letters and spaces.
        - **ZeroDivisionError**: you divided by 0, often by the length of an empty list.
        - **FileNotFoundError**: no file has that name in this folder.
      `,
      ex(py`
        with open("marks.txt") as f:
            print(f.read())
      `, { error: true, predict: ["FileNotFoundError", "KeyError", "Nothing"], answer: 0 }),
    ],
    quiz: [
      { q: md`What is the usual cause of an AttributeError?`,
        options: ["A method name is misspelled, or the value is a different kind", "A missing colon", "Dividing by zero"], answer: 0,
        explain: md`An AttributeError is about the name after a dot, like «.uper()» in place of «.upper()».`,
        why: [null, md`A missing colon is a SyntaxError.`, md`That is a ZeroDivisionError.`],
        skill: "memory" },
      { q: md`Which error does «int("abc")» give?`,
        options: ["ValueError", "TypeError", "NameError"], answer: 0,
        explain: md`«int» accepts text, so the kind is fine. The value «"abc"» is not a number.`,
        why: [null, md`TypeError is for the wrong kind. Text is the right kind for «int».`, md`Every name here exists. The problem is the value.`],
        skill: "choose" },
      { q: md`What happens?`, code: py`
          scores = {"Asha": 82}
          print(scores["asha"])
        `, options: ["KeyError", "82", "NameError"], answer: 0, error: true,
        explain: md`Keys must match exactly. «"asha"» with a small a is a different key.`,
        why: [null, md`Python does not ignore capital letters in keys.`, md`«scores» exists. Only the key is missing.`],
        skill: "debug" },
      { q: md`What does this program show?`, code: py`
          team = ["Rohit", "Virat"]
          team.append("Gill")
          print(len(team))
        `, options: ["3", "AttributeError", "2"], answer: 0,
        explain: md`«append» is a real list method, so it adds «Gill». The list now has 3 names.`,
        why: [null, md`Lists do have «append». An AttributeError comes only from a name the value does not have.`, md`«append» added a name before «len» counted.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          try:
              n = int(input("Cups: "))
              print("Bill:", n * 12)
          except ValueError:
              print("Numbers only, please.")
        `, options: ["It prints a chai bill, or a polite message if the user types a word", "It always prints both lines", "It crashes when the user types a word"],
        answer: 0, verify: false, mono: false,
        explain: md`A word makes «int» fail with ValueError, so the except block prints the message instead of crashing.`,
        why: [null, md`Only one of the two messages prints.`, md`The «except ValueError» block catches that error.`],
        skill: "read" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: skipping bad values",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          total = 0
          for t in ["12", "x", "15"]:
              try:
                  total += int(t)
              except ValueError:
                  print("Skip", t)
          print(total)
        `,
        inputs: [],
        ask: [{ line: 6, name: "total" }, { output: true }],
        hints: [
          md`Line 4 only adds when the text is a whole number. Line 6 runs only for the bad one.`,
          md`The letter x makes line 4 fail, so the except block runs for it. By then, only 12 was added.`,
          md`The program prints one Skip line, then the total of 12 and 15.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: get with a default",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          stock = {"chai": 5, "samosa": 0}
          left = stock.get("vada", 0) + stock["chai"]
          wanted = stock.get("samosa", 10)
          print(left, wanted)
        `,
        inputs: [],
        ask: [{ line: 2, name: "left" }, { line: 3, name: "wanted" }, { output: true }],
        hints: [
          md`The get method gives the default only when the key is missing.`,
          md`vada is missing, so it gives 0. samosa is present, so its own value is used.`,
          md`samosa holds 0, and 0 is used even though the default is 10.`,
        ],
      },
      {
        id: "c1", kind: "read", title: "Cause card: SyntaxError",
        task: md`This program stops with «SyntaxError: '(' was never closed».`,
        code: py`
          name = "Ravi"
          print("Hello", name
        `,
        questions: [
          { q: md`What is the most likely cause?`, options: ["A closing bracket is missing", "The name Ravi is not defined", "The file is missing"], answer: 0,
            explain: md`Every «(» needs a «)». Line 2 never closes its bracket.`,
            why: [null, md`«name» is made on line 1. A missing name would be a NameError.`, md`A missing file gives a FileNotFoundError.`], skill: "debug" },
        ],
      },
      {
        id: "c2", kind: "read", title: "Cause card: IndentationError",
        task: md`This program stops with «IndentationError: expected an indented block after 'for' statement on line 1».`,
        code: py`
          for city in ["Delhi", "Pune"]:
          print(city)
        `,
        questions: [
          { q: md`What is the most likely cause?`, options: ["Line 2 needs 4 spaces at the start", "The list needs round brackets", "city is spelled wrong"], answer: 0,
            explain: md`The lines inside a loop must move 4 spaces to the right.`,
            why: [null, md`Square brackets are right for a list.`, md`The spelling matches. The spaces are the problem.`], skill: "debug" },
        ],
      },
      {
        id: "c3", kind: "read", title: "Cause card: NameError",
        task: md`This program stops with «NameError: name 'Delhi' is not defined».`,
        code: py`
          city = Delhi
          print("I live in", city)
        `,
        questions: [
          { q: md`What is the most likely cause?`, options: ["The text Delhi needs quotes", "print is spelled wrong", "city needs a capital C"], answer: 0,
            explain: md`Without quotes, Python reads «Delhi» as a name. Write «"Delhi"».`,
            why: [null, md`«print» is correct.`, md`Names can be small letters. The problem is the missing quotes.`], skill: "debug" },
        ],
      },
      {
        id: "c4", kind: "read", title: "Cause card: another NameError",
        task: md`The user types «5». The program stops with «NameError: name 'cup' is not defined. Did you mean: 'cups'?».`,
        code: py`
          cups = int(input("Cups: "))
          print("Bill:", cup * 12)
        `,
        questions: [
          { q: md`What is the most likely cause?`, options: ["The name is spelled differently on line 2", "int cannot change 5 into a number", "12 needs quotes"], answer: 0,
            explain: md`Line 1 makes «cups». Line 2 uses «cup». Names must match exactly.`,
            why: [null, md`«int("5")» works. That would be a ValueError anyway.`, md`Quotes would make 12 text, which is wrong here.`], skill: "debug" },
        ],
      },
      {
        id: "c5", kind: "read", title: "Cause card: ValueError",
        task: md`The user types «forty». The program stops with «ValueError: invalid literal for int() with base 10: 'forty'».`,
        code: py`
          marks = int(input("Marks: "))
          print("Marks:", marks)
        `,
        questions: [
          { q: md`What is the most likely cause?`, options: ["The user typed a word where a number was needed", "input is spelled wrong", "marks is not defined"], answer: 0,
            explain: md`«int» can only change digits into a number. The usual fix is «try» and «except ValueError».`,
            why: [null, md`«input» is correct. The typed answer is the problem.`, md`A missing name gives a NameError, not a ValueError.`], skill: "debug" },
        ],
      },
      {
        id: "c6", kind: "read", title: "Cause card: IndexError",
        task: md`This program stops with «IndexError: list index out of range».`,
        code: py`
          toppers = ["Asha", "Ravi", "Meena"]
          print("Third place:", toppers[3])
        `,
        questions: [
          { q: md`What is the most likely cause?`, options: ["Positions start at 0, so the third item is at 2", "The list needs a fourth name", "print cannot show a list item"], answer: 0,
            explain: md`Three items have positions 0, 1 and 2. Position 3 does not exist.`,
            why: [null, md`The list is fine. The position is one too far.`, md`«print» can show any item.`], skill: "debug" },
        ],
      },
      {
        id: "c7", kind: "read", title: "Cause card: ZeroDivisionError",
        task: md`This program stops with «ZeroDivisionError: division by zero».`,
        code: py`
          sales = []
          print("Average sale:", sum(sales) / len(sales))
        `,
        questions: [
          { q: md`What is the most likely cause?`, options: ["The list is empty, so its length is 0", "sum cannot add a list", "The average must use //"], answer: 0,
            explain: md`«len([])» is 0. Check for an empty list before you divide.`,
            why: [null, md`«sum([])» is 0, with no error.`, md`«//» also fails when it divides by 0.`], skill: "debug" },
        ],
      },
      {
        id: "c8", kind: "read", title: "Cause card: FileNotFoundError",
        task: md`This program stops with «FileNotFoundError: [Errno 2] No such file or directory: 'marks.txt'».`,
        code: py`
          with open("marks.txt") as f:
              print(f.read())
        `,
        questions: [
          { q: md`What is the most likely cause?`, options: ["No file with that exact name is in this folder", "The file has too many marks", "with is spelled wrong"], answer: 0,
            explain: md`Check the name, including the end like «.txt», and check the folder. The file may be «marks.txt.txt».`,
            why: [null, md`The size of a file never gives this error.`, md`«with» is correct. Python never found the file.`], skill: "debug" },
        ],
      },
      {
        id: "b1", kind: "bug", title: "Fix: the team list",
        task: md`
          The user types names with commas between them. The program should print them neatly. When the user types «asha, ravi», it should show:

          | Team: Asha, Ravi

          Symptom: it stops with an AttributeError. Find the cause and fix it.
        `,
        starter: py`
          names = input("Names: ").split(",")
          team = []
          for n in names:
              team.add(n.strip().title())
          print("Team:", ", ".join(team))
        `,
        bugLines: [4],
        solution: py`
          names = input("Names: ").split(",")
          team = []
          for n in names:
              team.append(n.strip().title())
          print("Team:", ", ".join(team))
        `,
        tests: [
          { inputs: ["asha, ravi"], output: "Team: Asha, Ravi" },
          { inputs: ["meena"], output: "Team: Meena" },
          { inputs: ["arjun,  kavya ,dev"], output: "Team: Arjun, Kavya, Dev" },
        ],
        wrong: [py`
          names = input("Names: ").split(",")
          team = []
          for n in names:
              team.append(n)
          print("Team:", ", ".join(team))
        `, py`
          names = input("Names: ").split(",")
          team = []
          for n in names:
              team.insert(0, n.strip().title())
          print("Team:", ", ".join(team))
        `],
        hints: [
          md`An AttributeError is about the name after a dot. Look for a method that lists do not have.`,
          md`Line 4 uses a method to put a name at the end of the list. Lists have no method with that name.`,
          md`Use the list method that adds one item at the end. Keep the strip and title parts.`,
        ],
      },
      {
        id: "b2", kind: "bug", title: "Fix: the chai bill line",
        task: md`
          The program should print the bill for the cups the user types. When the user types «3», it should show:

          | Bill: 36 rupees

          Symptom: it stops with a TypeError. Find the cause and fix it.
        `,
        starter: py`
          cups = int(input("Cups: "))
          bill = cups * 12
          print("Bill: " + bill + " rupees")
        `,
        bugLines: [3],
        solution: py`
          cups = int(input("Cups: "))
          bill = cups * 12
          print(f"Bill: {bill} rupees")
        `,
        tests: [
          { inputs: ["3"], output: "Bill: 36 rupees" },
          { inputs: ["0"], output: "Bill: 0 rupees" },
          { inputs: ["15"], output: "Bill: 180 rupees" },
        ],
        wrong: [py`
          cups = int(input("Cups: "))
          bill = cups * 12
          print("Bill: " + "bill" + " rupees")
        `, py`
          cups = int(input("Cups: "))
          bill = cups + 12
          print(f"Bill: {bill} rupees")
        `],
        hints: [
          md`A TypeError means the kind is wrong. Look for text and a number joined together.`,
          md`Line 3 joins text and the number bill with plus signs.`,
          md`Show the bill inside an f-string, or change it into text first. Do not put the name in quotes.`,
        ],
      },
      {
        id: "b3", kind: "bug", title: "Fix: marks by name",
        task: md`
          The program looks up a student's marks. When the user types «asha», it should show:

          | Asha scored 82

          It must also work for «RAVI» or « Meena » with extra spaces. Symptom: it stops with a KeyError. Find the cause and fix it.
        `,
        starter: py`
          marks = {"Asha": 82, "Ravi": 64, "Meena": 91}
          name = input("Student: ")
          print(name, "scored", marks[name])
        `,
        bugLines: [2],
        solution: py`
          marks = {"Asha": 82, "Ravi": 64, "Meena": 91}
          name = input("Student: ").strip().title()
          print(name, "scored", marks[name])
        `,
        tests: [
          { inputs: ["asha"], output: "Asha scored 82" },
          { inputs: ["RAVI"], output: "Ravi scored 64" },
          { inputs: [" Meena "], output: "Meena scored 91" },
          { inputs: ["Asha"], output: "Asha scored 82" },
        ],
        wrong: [py`
          marks = {"Asha": 82, "Ravi": 64, "Meena": 91}
          name = input("Student: ").lower()
          print(name, "scored", marks[name])
        `, py`
          marks = {"Asha": 82, "Ravi": 64, "Meena": 91}
          name = input("Student: ").title()
          print(name, "scored", marks[name])
        `, py`
          marks = {"Asha": 82, "Ravi": 64, "Meena": 91}
          name = input("Student: ").strip()
          print(name, "scored", marks[name])
        `],
        hints: [
          md`A KeyError means the key is not in the dictionary exactly as typed. Compare the capital letters and spaces.`,
          md`The keys start with a capital letter and have no spaces. Clean the answer on line 2, where it is read.`,
          md`Remove the spaces at both ends first, then give it a capital first letter, with two string methods.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a snack counter with no KeyError",
        task: md`
          A snack counter has these prices in rupees: chai 12, samosa 15, vada 20. Ask for a snack. Never crash with a KeyError: use «in» or «.get» to check first. When the user types «samosa», it shows:

          | samosa costs 15 rupees.

          When the user types «dosa», it shows:

          | Sorry, no dosa today.
        `,
        starter: py`

        `,
        solution: py`
          prices = {"chai": 12, "samosa": 15, "vada": 20}
          snack = input("Snack: ")
          if snack in prices:
              print(f"{snack} costs {prices[snack]} rupees.")
          else:
              print(f"Sorry, no {snack} today.")
        `,
        tests: [
          { inputs: ["samosa"], output: "samosa costs 15 rupees." },
          { inputs: ["dosa"], output: "Sorry, no dosa today." },
          { inputs: ["chai"], output: "chai costs 12 rupees." },
          { inputs: ["vada"], output: "vada costs 20 rupees." },
          { inputs: ["idli"], output: "Sorry, no idli today." },
        ],
        wrong: [py`
          prices = {"chai": 12, "samosa": 15, "vada": 20}
          snack = input("Snack: ")
          print(f"{snack} costs {prices[snack]} rupees.")
        `, py`
          prices = {"chai": 12, "samosa": 15, "vada": 20}
          snack = input("Snack: ")
          print(f"{snack} costs {prices.get(snack)} rupees.")
        `],
        hints: [
          md`Make the dictionary, ask, then choose between two messages.`,
          md`Before you look up the price, ask whether the snack is a key in the dictionary.`,
          md`Use an if with in. The if block prints the price line. The else block prints the sorry line.`,
        ],
      },
    ],
    keys: [
      md`SyntaxError: a missing colon, bracket or quote. IndentationError: wrong spaces at the start of a line.`,
      md`NameError: a name never made, misspelled, or text without quotes. AttributeError: no such name after the dot.`,
      md`TypeError: the wrong kind, like text plus a number. ValueError: the right kind but an unusable value.`,
      md`IndexError, KeyError, ZeroDivisionError and FileNotFoundError all mean something is missing or empty.`,
      md`Name the error first. Then go straight to its usual cause.`,
    ],
  });
  // ---------------------------------------------------------------- Day 47
  day({
    slug: "wrong-answer-no-error",
    title: "Wrong Answer, No Error",
    goal: "Find a bug when the program runs but the answer is wrong.",
    minutes: 45,
    kind: "lesson",
    needs: [14, 17, 45],
    win: "Today you can now find a bug that gives a wrong answer with no red message.",
    learn: [
      md`
        ## Expected versus actual

        Some bugs give no red message at all. Four cups of chai at 12 rupees each should cost 48 rupees. Guess what this program prints.
      `,
      ex(py`
        cups = 4
        price = 12
        bill = cups + price
        print("Bill:", bill)
      `, { predict: ["Bill: 16", "Bill: 48", "TypeError"], answer: 0 }),
      md`
        This is a **logic bug**: the program runs to the end, but the answer is wrong. The **expected** answer is what the program should print: 48. The **actual** answer is what it really prints: 16. When expected and actual differ, there is a bug. Here line 3 adds where it should multiply.
      `,
      ask({
        q: md`A program should print 150 and prints 60. Which is the actual answer?`,
        options: ["60", "150", "90"], answer: 0,
        explain: md`Actual means what the program really printed. Expected is what it should print.`,
        why: [null, md`150 is the expected answer.`, md`90 is only the difference between them.`],
      }),
      md`
        ## Work it out by hand first

        You can only see a wrong answer if you know the right one. So before you run, work out the answer on paper, with small numbers. Three marks: 70, 80 and 95. By hand, the total is 245, and the average is 245 divided by 3, about 81.67. Now guess what the program prints.
      `,
      ex(py`
        marks = [70, 80, 95]
        total = 0
        for m in marks:
            total += m
        average = total / 2
        print(average)
      `, { predict: ["122.5", "81.66666666666667", "245"], answer: 0 }),
      md`
        The actual answer, 122.5, is bigger than every mark, so it must be wrong. Line 5 divides by 2, not by the number of marks. The fix is «total / len(marks)».
      `,
      pause(md`Good place for a short break. Next: catching the exact line with Step through.`),
      md`
        ## Predict before each step

        Step through shows one line at a time. Before each press of **Next**, say what will change. The first time your guess and the screen differ, you have found the bug. By hand, this total is 40 + 50 + 60 = 150. Guess, then Step through it.
      `,
      ex(py`
        for m in [40, 50, 60]:
            total = 0
            total += m
        print(total)
      `, { predict: ["60", "150", "0"], answer: 0 }),
      md`
        You expect «total» to grow: 40, then 90. Instead it goes back to 0 on every round, because line 2 is inside the loop. Move «total = 0» above the loop.
      `,
    ],
    quiz: [
      { q: md`What is a logic bug?`,
        options: ["The program runs, but the answer is wrong", "Python stops with a red message", "A misspelled name"], answer: 0,
        explain: md`A logic bug gives no error. Only the answer shows it.`,
        why: [null, md`A red message is an error, like a TypeError. A logic bug has none.`, md`A misspelled name gives a NameError, which is an error.`],
        skill: "memory" },
      { q: md`What does this show?`, code: py`
          total = 0
          for runs in [4, 6, 1]:
              total = runs
          print(total)
        `, options: ["1", "11", "4"], answer: 0,
        explain: md`«total = runs» replaces the value each round. Only the last one, 1, is left.`,
        why: [null, md`11 is the expected answer. The program needs «+=» to give it.`, md`4 was replaced by 6, then by 1.`],
        skill: "trace" },
      { q: md`Samosas cost 15 rupees. The program prints «Bill: 18» for 3 samosas. Which line is most likely wrong?`, code: py`
          count = 3
          price = 15
          bill = count + price
          print("Bill:", bill)
        `, options: ["Line 3", "Line 1", "Line 4"], answer: 0, verify: false, mono: false,
        explain: md`By hand, 3 times 15 is 45. 18 is 3 plus 15, so line 3 adds where it should multiply.`,
        why: [null, md`Line 1 is right: there are 3 samosas.`, md`Line 4 only prints what line 3 made.`],
        skill: "debug" },
      { q: md`Why work out the answer by hand before you run?`,
        options: ["So you know the expected answer and can see a wrong one", "Because Python is slow", "So you do not need to run the program"], answer: 0,
        explain: md`A logic bug gives no message. Only a known right answer shows that something is wrong.`,
        why: [null, md`Speed is not the reason. Small programs run at once.`, md`You still run it. The hand answer is what you compare with.`],
        skill: "choose" },
      { q: md`What does this program do?`, code: py`
          marks = [55, 32, 78, 40]
          count = 0
          for m in marks:
              if m >= 33:
                  count += 1
          print(count)
        `, options: ["It counts the marks of 33 or more", "It adds all the marks", "It prints the highest mark"],
        answer: 0, verify: false, mono: false,
        explain: md`«count» goes up by 1 only for a mark of 33 or more. It prints 3.`,
        why: [null, md`It adds 1 for each passing mark, not the mark itself.`, md`There is no best-so-far variable here.`],
        skill: "read" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: a bill with a discount",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          cups = 10
          price = 12
          bill = cups * price
          if cups >= 10:
              bill = bill - bill * 10 / 100
          print("Bill:", bill)
        `,
        inputs: [],
        ask: [{ line: 3, name: "bill" }, { line: 5, name: "bill" }, { output: true }],
        hints: [
          md`Work out line 3 first: cups times price.`,
          md`10 cups is 10 or more, so line 5 runs. It takes away one tenth of the bill.`,
          md`One tenth of 120 is 12.0. The answer has a decimal point, because of the division.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: a buggy count",
        task: md`This program has a logic bug. Trace what it really does, not what it should do.`,
        code: py`
          marks = [33, 50, 20, 33]
          passed = 0
          for m in marks:
              if m > 33:
                  passed += 1
          print("Passed:", passed)
        `,
        inputs: [],
        ask: [{ line: 5, name: "passed" }, { output: true }],
        hints: [
          md`Check each mark against the test on line 4, one at a time.`,
          md`33 is not more than 33, so the test is False for both 33s.`,
          md`Only one mark passes the test, so line 5 runs once.`,
        ],
      },
      {
        id: "b1", kind: "bug", title: "Fix: the bulk discount",
        task: md`
          The chai stall gives 10 percent off when someone buys 10 cups or more. «bill(10, 12)» should give back 108.0, but it gives back 119.9. There is no error message. Find the bug and fix it. Hidden tests try other cups and prices.
        `,
        starter: py`
          def bill(cups, price):
              total = cups * price
              if cups >= 10:
                  total = total - 10 / 100
              return total

          print(bill(10, 12))
        `,
        bugLines: [4],
        solution: py`
          def bill(cups, price):
              total = cups * price
              if cups >= 10:
                  total = total - total * 10 / 100
              return total

          print(bill(10, 12))
        `,
        tests: [
          { py: py`expect("bill", (10, 12), 108, approx=True)` },
          { py: py`expect("bill", (9, 12), 108, approx=True)` },
          { py: py`expect("bill", (20, 10), 180, approx=True)` },
          { py: py`expect("bill", (1, 15), 15, approx=True)` },
        ],
        wrong: [py`
          def bill(cups, price):
              total = cups * price
              if cups > 10:
                  total = total - total * 10 / 100
              return total

          print(bill(10, 12))
        `, py`
          def bill(cups, price):
              total = cups * price
              if cups >= 10:
                  total = total - 10
              return total

          print(bill(10, 12))
        `],
        hints: [
          md`By hand: 10 cups at 12 is 120. Ten percent of 120 is 12. So the expected answer is 108.`,
          md`Line 4 takes away ten divided by a hundred, which is only 0.1 rupees.`,
          md`Take away ten percent of the total: the total times ten, divided by a hundred.`,
        ],
      },
      {
        id: "b2", kind: "bug", title: "Fix: the marks total",
        task: md`
          The user types marks with spaces between them. The program should print their total. When the user types «40 50 60», it should show «Total: 150», but it shows «Total: 60». Find the bug and fix it.
        `,
        starter: py`
          marks = [int(x) for x in input("Marks: ").split()]
          for m in marks:
              total = 0
              total += m
          print("Total:", total)
        `,
        bugLines: [2, 3],
        solution: py`
          marks = [int(x) for x in input("Marks: ").split()]
          total = 0
          for m in marks:
              total += m
          print("Total:", total)
        `,
        tests: [
          { inputs: ["40 50 60"], output: "Total: 150" },
          { inputs: ["75"], output: "Total: 75" },
          { inputs: ["10 20 30 40"], output: "Total: 100" },
          { inputs: ["0 0"], output: "Total: 0" },
        ],
        wrong: [py`
          marks = [int(x) for x in input("Marks: ").split()]
          for m in marks:
              total = 0
              total = total + m
          print("Total:", total)
        `, py`
          marks = [int(x) for x in input("Marks: ").split()]
          total = 0
          for m in marks:
              total = m
          print("Total:", total)
        `],
        hints: [
          md`Step through with 40 50 60. Before each step, say what total should become.`,
          md`Total goes back to 0 at the start of every round. Look at where it is set to 0.`,
          md`Set total to 0 once, before the loop starts. Keep the adding line inside the loop.`,
        ],
      },
      {
        id: "b3", kind: "bug", title: "Fix: the percentage",
        task: md`
          The program asks for the marks scored and the marks the paper is out of. When the user types «45» and «50», it should show «Percent: 90.0», but it shows «Percent: 0.0». Find the bug and fix it.
        `,
        starter: py`
          scored = int(input("Marks scored: "))
          out_of = int(input("Out of: "))
          p = scored / (out_of * 100)
          print(f"Percent: {p:.1f}")
        `,
        bugLines: [3],
        solution: py`
          scored = int(input("Marks scored: "))
          out_of = int(input("Out of: "))
          p = scored / out_of * 100
          print(f"Percent: {p:.1f}")
        `,
        tests: [
          { inputs: ["45", "50"], output: "Percent: 90.0" },
          { inputs: ["33", "40"], output: "Percent: 82.5" },
          { inputs: ["150", "200"], output: "Percent: 75.0" },
          { inputs: ["0", "50"], output: "Percent: 0.0" },
          { inputs: ["100", "100"], output: "Percent: 100.0" },
        ],
        wrong: [py`
          scored = int(input("Marks scored: "))
          out_of = int(input("Out of: "))
          p = scored * 100 // out_of
          print(f"Percent: {p:.1f}")
        `, py`
          scored = int(input("Marks scored: "))
          out_of = int(input("Out of: "))
          p = out_of / scored * 100
          print(f"Percent: {p:.1f}")
        `, py`
          scored = int(input("Marks scored: "))
          out_of = int(input("Out of: "))
          p = scored / out_of
          print(f"Percent: {p:.1f}")
        `],
        hints: [
          md`By hand: 45 out of 50 is 45 divided by 50, which is 0.9. Times 100 gives 90.`,
          md`On line 3, the brackets make Python multiply 50 by 100 first, then divide.`,
          md`Divide the marks scored by the total marks first, then multiply by 100, with no brackets.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: the SSC mock result",
        task: md`
          Work out the answers by hand before you write any code. Ask for the marks in 4 papers, typed with spaces. Each paper is out of 50, so the full total is 200. A percent of 40 or more is a pass. When the user types «40 35 30 45», it shows:

          | Total: 150
          | Percent: 75.0
          | Result: Pass

          When the percent is below 40, the last line is «Result: Fail».
        `,
        starter: py`

        `,
        solution: py`
          marks = [int(x) for x in input("Marks: ").split()]
          total = sum(marks)
          percent = total / 200 * 100
          print("Total:", total)
          print("Percent:", percent)
          if percent >= 40:
              print("Result: Pass")
          else:
              print("Result: Fail")
        `,
        tests: [
          { inputs: ["40 35 30 45"], output: "Total: 150\nPercent: 75.0\nResult: Pass" },
          { inputs: ["20 20 20 20"], output: "Total: 80\nPercent: 40.0\nResult: Pass" },
          { inputs: ["10 20 19 30"], output: "Total: 79\nPercent: 39.5\nResult: Fail" },
          { inputs: ["0 0 0 0"], output: "Total: 0\nPercent: 0.0\nResult: Fail" },
          { inputs: ["50 50 50 50"], output: "Total: 200\nPercent: 100.0\nResult: Pass" },
        ],
        wrong: [py`
          marks = [int(x) for x in input("Marks: ").split()]
          total = sum(marks)
          percent = total / 200 * 100
          print("Total:", total)
          print("Percent:", percent)
          if percent > 40:
              print("Result: Pass")
          else:
              print("Result: Fail")
        `, py`
          marks = [int(x) for x in input("Marks: ").split()]
          total = sum(marks)
          percent = total / 4
          print("Total:", total)
          print("Percent:", percent)
          if percent >= 40:
              print("Result: Pass")
          else:
              print("Result: Fail")
        `],
        hints: [
          md`Read the marks into a list of numbers, add them, then work out the percent of 200.`,
          md`Test the boundary by hand: 20 in each paper is 80, which is exactly 40 percent, and that is a pass.`,
          md`The percent is the total divided by 200, times 100. Use 40 or more for a pass, not more than 40.`,
        ],
      },
    ],
    keys: [
      md`A **logic bug** gives no error message. The program runs, but the answer is wrong.`,
      md`**Expected** is what the program should print. **Actual** is what it really prints.`,
      md`Work out the expected answer by hand, with small numbers, before you run.`,
      md`In Step through, predict each line before you press Next. The first surprise shows the bug.`,
    ],
  });
  // ---------------------------------------------------------------- Day 48
  day({
    slug: "look-inside-with-print",
    title: "Looking Inside with print",
    goal: "Use labelled print lines to see values your program is hiding.",
    minutes: 45,
    kind: "lesson",
    needs: [5, 8, 47],
    win: "Today you can now add check lines that show the values hiding inside your program.",
    learn: [
      md`
        ## Labelled print lines

        Your own laptop has no Step through button. There, you look inside a program with a **check line**: a «print» you add only to see a value, and delete later. Give each check line a label, so you know which value is which. An f-string has a short form for this: put «=» after the name. Guess the output.
      `,
      ex(py`
        cups = 3
        price = 12
        print("cups:", cups)
        print(f"{price=}")
        print(f"{cups * price=}")
      `, { predict: ["cups: 3\nprice=12\ncups * price=36", "3\n12\n36", "cups: 3\n{price=}\n{cups * price=}"], answer: 0 }),
      md`
        «f"{price=}"» prints the name, an equals sign, and the value. It also works for a calculation, like «cups * price».
      `,
      md`
        ## repr shows hidden spaces

        A space at the end of text is invisible in normal output. **repr** is a function that shows a value the way you write it in code, with quotes around text. Then every space shows. The «=» form in an f-string uses repr too. Type «Asha » with a space at the end when asked.
      `,
      ex(py`
        name = input("Name: ")
        print(name)
        print(repr(name))
        print(name == "Asha")
      `, { inputs: ["Asha "], predict: ["Asha \n'Asha '\nFalse", "Asha\nAsha\nTrue", "Asha \n'Asha'\nTrue"], answer: 0 }),
      md`
        The plain print looks fine. repr shows the extra space inside the quotes, so «"Asha "» does not equal «"Asha"». The fix is «.strip()».
      `,
      pause(md`Good place for a short break. Next: checking the kind of a value.`),
      md`
        ## type as a check, then delete the check lines

        A number stored as text looks like a number when printed. «type» tells the truth. Type «45», then «30».
      `,
      ex(py`
        first = input("Runs in first innings: ")
        second = input("Runs in second innings: ")
        print(type(first))
        print("Total:", first + second)
      `, { inputs: ["45", "30"], predict: ["<class 'str'>\nTotal: 4530", "<class 'int'>\nTotal: 75", "<class 'str'>\nTotal: 75"], answer: 0 }),
      md`
        «<class 'str'>» means text, so «+» joins «"45"» and «"30"». Change each answer with «int()». When the bug is fixed, delete every check line. The hidden tests compare the exact output, so a forgotten check line fails them.
      `,
      tip(md`
        **On your laptop.** Copy one of today's Fix programs into IDLE. Add a check line, press F5, and read the value in the Shell window. This is how you debug without Step through.
      `),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          runs = 45
          print(f"{runs=}")
        `, options: ["runs=45", "45", "{runs=}"], answer: 0,
        explain: md`The «=» form prints the name, an equals sign, and the value.`,
        why: [null, md`That is what «f"{runs}"» shows, with no label.`, md`The «f» is there, so the curly brackets are worked out.`],
        skill: "trace" },
      { q: md`What does this show?`, code: py`
          city = " Pune"
          print(repr(city))
        `, options: ["' Pune'", "Pune", "' Pune"], answer: 0,
        explain: md`repr shows the quotes, so the space at the start is easy to see.`,
        why: [null, md`repr keeps the space and adds quotes.`, md`repr puts a quote at both ends.`],
        skill: "trace" },
      { q: md`A total prints as «4530» when it should be 75. Which check line helps most?`,
        options: ["«print(type(first))»", '«print("Total")»', "«print(75)»"], answer: 0,
        explain: md`If type shows «<class 'str'>», the numbers are text, and «+» joins them.`,
        why: [null, md`A label alone shows no value.`, md`Printing the expected answer shows nothing about the program.`],
        skill: "choose" },
      { q: md`You fixed the bug. What do you do with your check lines?`,
        options: ["Delete them, so only the real output is left", "Keep them, because more output is better", "Keep them, because the hidden tests ignore extra lines"], answer: 0,
        explain: md`Check lines are only for you. Extra output makes the program wrong, and the hidden tests fail. Putting # at the start of a check line also stops it.`,
        why: [null, md`The task asks for an exact output. Extra lines make it wrong.`, md`The hidden tests compare every line of the output. One extra line fails them.`],
        skill: "memory" },
      { q: md`What does this program do?`, code: py`
          answer = input("Capital of India? ").strip().lower()
          if answer == "new delhi":
              print("Correct")
          else:
              print("Try again")
        `, options: ["It accepts New Delhi typed with any capitals or extra spaces", "It only accepts new delhi in small letters with no spaces", "It always prints Correct"],
        answer: 0, verify: false, mono: false,
        explain: md`«.strip()» removes spaces at the ends. «.lower()» makes every letter small before the check.`,
        why: [null, md`The cleaning happens before the check, so capitals and spaces do not matter.`, md`Any other answer prints «Try again».`],
        skill: "read" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: a cleaned name",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          name = " Ravi "
          clean = name.strip()
          same = clean == "Ravi"
          print(f"{same=}")
        `,
        inputs: [],
        ask: [{ line: 2, name: "clean" }, { line: 3, name: "same" }, { output: true }],
        hints: [
          md`The strip method removes spaces at both ends only.`,
          md`After line 2, the name has no spaces, so the comparison on line 3 is True.`,
          md`The equals form prints the name same, an equals sign, and its value.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: text or number?",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          a = "12"
          b = 12
          c = a * 2
          d = b * 2
          print(c, d)
        `,
        inputs: [],
        ask: [{ line: 3, name: "c" }, { line: 4, name: "d" }, { output: true }],
        hints: [
          md`One value is text and one is a number. Look for the quotes.`,
          md`Text times 2 repeats the text. A number times 2 doubles it.`,
          md`Text 12 repeated twice is 1212. The number 12 doubled is 24.`,
        ],
      },
      {
        id: "b1", kind: "bug", title: "Fix: the hidden space", noStep: true,
        task: md`
          Step through is off, as on a laptop. Delivery to Delhi costs 40 rupees. Every other city costs 90. When the user types «Delhi » with a space at the end, it should show:

          | Delivery: 40 rupees

          It shows 90 instead. Add a check line with «repr» to see why, fix the bug, then delete the check line.
        `,
        starter: py`
          city = input("City: ")
          if city == "Delhi":
              print("Delivery: 40 rupees")
          else:
              print("Delivery: 90 rupees")
        `,
        bugLines: [1],
        solution: py`
          city = input("City: ").strip()
          if city == "Delhi":
              print("Delivery: 40 rupees")
          else:
              print("Delivery: 90 rupees")
        `,
        tests: [
          { inputs: ["Delhi "], output: "Delivery: 40 rupees" },
          { inputs: ["Delhi"], output: "Delivery: 40 rupees" },
          { inputs: ["  Delhi"], output: "Delivery: 40 rupees" },
          { inputs: ["Pune "], output: "Delivery: 90 rupees" },
        ],
        wrong: [py`
          city = input("City: ").lower()
          if city == "Delhi":
              print("Delivery: 40 rupees")
          else:
              print("Delivery: 90 rupees")
        `, py`
          city = input("City: ").strip()
          print(repr(city))
          if city == "Delhi":
              print("Delivery: 40 rupees")
          else:
              print("Delivery: 90 rupees")
        `],
        hints: [
          md`Add a check line after line 1 that shows the city with repr. Look inside the quotes.`,
          md`The space came from the typed answer on line 1. Clean it there, as soon as it is read.`,
          md`Use the string method that removes spaces at both ends. Then delete your check line.`,
        ],
      },
      {
        id: "b2", kind: "bug", title: "Fix: the match total", noStep: true,
        task: md`
          Step through is off. The program adds the runs from two innings. When the user types «45» and «30», it should show «Match total: 75», but it shows «Match total: 4530». Check the kind of each value with «type», fix the bug, then delete the check line.
        `,
        starter: py`
          first = input("Runs in first innings: ")
          second = input("Runs in second innings: ")
          total = first + second
          print("Match total:", total)
        `,
        bugLines: [1, 2, 3],
        solution: py`
          first = int(input("Runs in first innings: "))
          second = int(input("Runs in second innings: "))
          total = first + second
          print("Match total:", total)
        `,
        tests: [
          { inputs: ["45", "30"], output: "Match total: 75" },
          { inputs: ["100", "7"], output: "Match total: 107" },
          { inputs: ["0", "0"], output: "Match total: 0" },
          { inputs: ["250", "199"], output: "Match total: 449" },
        ],
        wrong: [py`
          first = input("Runs in first innings: ")
          second = input("Runs in second innings: ")
          total = int(first + second)
          print("Match total:", total)
        `, py`
          first = int(input("Runs in first innings: "))
          second = int(input("Runs in second innings: "))
          total = first + second
          print(type(first))
          print("Match total:", total)
        `],
        hints: [
          md`Add a check line that prints the type of first. It says str, which means text.`,
          md`Both answers come from input, and input always gives text. Change them before you add.`,
          md`Change each answer into a whole number, either where it is read or before adding. Then delete the check line.`,
        ],
      },
      {
        id: "b3", kind: "bug", title: "Fix: the costliest item", noStep: true,
        task: md`
          Step through is off. The user types prices in rupees, with spaces. The program should print the biggest price. When the user types «90 120 45», it should show «Costliest: 120», but it shows «Costliest: 90». There is no error. Add a check line with «type», fix the bug, then delete the check line.
        `,
        starter: py`
          prices = input("Prices: ").split()
          print("Costliest:", max(prices))
        `,
        bugLines: [1],
        solution: py`
          prices = [int(x) for x in input("Prices: ").split()]
          print("Costliest:", max(prices))
        `,
        tests: [
          { inputs: ["90 120 45"], output: "Costliest: 120" },
          { inputs: ["5 30"], output: "Costliest: 30" },
          { inputs: ["700"], output: "Costliest: 700" },
          { inputs: ["99 100 8"], output: "Costliest: 100" },
        ],
        wrong: [py`
          prices = input("Prices: ").strip().split()
          print("Costliest:", max(prices))
        `, py`
          prices = [int(x) for x in input("Prices: ").split()]
          print("Costliest:", min(prices))
        `],
        hints: [
          md`Add a check line that prints the type of the first price. It says str.`,
          md`Text is compared letter by letter, so 9 comes after 1, and 90 looks bigger than 120. The list is made on line 1.`,
          md`Build the list with a list comprehension that changes every piece into a whole number. Then delete the check line.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a clean scorecard line",
        task: md`
          Ask for a player's name, then the runs in each match, typed with commas. Users type messy names, with extra spaces and any capitals. Use check lines while you work, then delete them. When the user types «  rohit » and «45,30,12», it shows:

          | Rohit: 87 runs
        `,
        starter: py`

        `,
        solution: py`
          name = input("Player: ").strip().title()
          runs = [int(x) for x in input("Runs: ").split(",")]
          print(f"{name}: {sum(runs)} runs")
        `,
        tests: [
          { inputs: ["  rohit ", "45,30,12"], output: "Rohit: 87 runs" },
          { inputs: ["VIRAT", "100"], output: "Virat: 100 runs" },
          { inputs: ["smriti mandhana", "0,0,5"], output: "Smriti Mandhana: 5 runs" },
          { inputs: ["Gill", "0"], output: "Gill: 0 runs" },
        ],
        wrong: [py`
          name = input("Player: ").title()
          runs = [int(x) for x in input("Runs: ").split(",")]
          print(f"{name}: {sum(runs)} runs")
        `, py`
          name = input("Player: ").strip().title()
          runs = [int(x) for x in input("Runs: ").split(",")]
          print(f"{name=}")
          print(f"{name}: {sum(runs)} runs")
        `],
        hints: [
          md`Clean the name, turn the runs into a list of numbers, then print one line.`,
          md`For the name, remove the outside spaces and give each word a capital. For the runs, split on commas.`,
          md`Change each piece into a whole number, add them with sum, and print with an f-string. Delete any check lines.`,
        ],
      },
    ],
    keys: [
      md`A **check line** is a «print» you add only to look inside. Label it, so you know which value it shows.`,
      md`«f"{price=}"» prints the name, «=», and the value, like «price=12».`,
      md`«repr(text)» shows the quotes, so hidden spaces at the ends become visible.`,
      md`«type(x)» shows the kind of a value. «<class 'str'>» means a number is stored as text.`,
      md`Delete every check line when the bug is fixed. On a laptop, check lines replace Step through.`,
    ],
  });
  // ---------------------------------------------------------------- Day 49
  day({
    slug: "one-too-many-one-too-few",
    title: "One Too Many, One Too Few",
    goal: "Find and fix loops that run one time too many or too few.",
    minutes: 45,
    kind: "lesson",
    needs: [16, 22, 47],
    win: "Today you can now check the first and last rounds of a loop and fix an off-by-one bug.",
    learn: [
      md`
        ## The fence post problem

        A fence is 10 metres long. It needs a post at the start and one at every metre after it. How many posts? Count on paper before you guess what this program prints.
      `,
      ex(py`
        posts = 0
        for metre in range(10):
            posts += 1
        print("Posts:", posts)
      `, { predict: ["Posts: 10", "Posts: 11", "Posts: 9"], answer: 0 }),
      md`
        On paper, the posts stand at 0, 1, 2, and so on up to 10. That is 11 posts, but the loop ran only 10 times. An **off-by-one bug** is a loop that runs one time too many or one time too few. The fix here is «range(11)».
      `,
      md`
        ## The range stop number

        «range(1, 5)» gives 1, 2, 3 and 4. The stop number, 5, is never given. So to reach 10, the stop number must be 11. This program should end with 7 times 10. Guess the last value.
      `,
      ex(py`
        for i in range(1, 10):
            last = 7 * i
        print("Last line of the table:", last)
      `, { predict: ["Last line of the table: 63", "Last line of the table: 70", "Last line of the table: 56"], answer: 0 }),
      md`
        The last «i» is 9, so the table stops at 63. Write «range(1, 11)» to include 10.
      `,
      ask({
        q: md`Which «range» gives the numbers 1 to 10, both included?`,
        options: ["«range(1, 11)»", "«range(1, 10)»", "«range(10)»"], answer: 0,
        explain: md`The stop number is never given, so it must be one more than the last number you want.`,
        why: [null, md`This stops at 9.`, md`This gives 0 to 9.`],
      }),
      pause(md`Good place for a short break. Next: while loops, and checking the first and last rounds.`),
      md`
        ## Less than, or less than or equal?

        A while loop has the same trap. «<» stops before the number. «<=» includes it. This loop should print 5 overs. Guess the last line.
      `,
      ex(py`
        over = 1
        while over < 5:
            print("Over", over)
            over += 1
      `, { predict: ["Over 1\nOver 2\nOver 3\nOver 4", "Over 1\nOver 2\nOver 3\nOver 4\nOver 5", "Over 0\nOver 1\nOver 2\nOver 3\nOver 4"], answer: 0 }),
      md`
        Change «<» to «<=», and «Over 5» prints too. To catch these bugs, check only two rounds: the first and the last. Before you run, write what the first round and the last round should print. Then check those two.
      `,
    ],
    quiz: [
      { q: md`What is an off-by-one bug?`,
        options: ["A loop that runs one time too many or too few", "A program that adds 1 by mistake", "An error message on line 1"], answer: 0,
        explain: md`The loop is nearly right, but its first or last round is wrong.`,
        why: [null, md`It is about how many times a loop runs, not about adding 1.`, md`It gives no error message. It is a logic bug.`],
        skill: "memory" },
      { q: md`What does this show?`, code: py`
          count = 0
          for n in range(3, 8):
              count += 1
          print(count)
        `, options: ["5", "8", "6"], answer: 0,
        explain: md`«range(3, 8)» gives 3, 4, 5, 6 and 7: five numbers.`,
        why: [null, md`The loop starts at 3, not at 0.`, md`The stop number, 8, is not given.`],
        skill: "trace" },
      { q: md`«student» starts at 1. A while loop must print the marks for students 1 to 30. Which line is right?`,
        options: ["«while student <= 30:»", "«while student < 30:»", "«while student > 30:»"], answer: 0,
        explain: md`«<=» includes 30. «<» would stop at 29.`,
        why: [null, md`This misses student 30: one round too few.`, md`This is False at the start, so the loop never runs.`],
        skill: "choose" },
      { q: md`A wall is 6 metres long, with a light at each end and one at every metre. This program prints 6. What is the bug?`, code: py`
          lights = 0
          for m in range(6):
              lights += 1
          print(lights)
        `, options: ["The stop number should be 7, for 7 lights", "The stop number should be 5, for 5 lights", "Nothing: 6 metres need 6 lights"], answer: 0, verify: false, mono: false,
        explain: md`Lights stand at 0, 1, 2, 3, 4, 5 and 6 metres: 7 lights. Use «range(7)».`,
        why: [null, md`That makes the loop run fewer times, not more. Count the lights on paper: there are 7.`, md`Count on paper: both ends need a light.`],
        skill: "debug" },
      { q: md`What does this program do?`, code: py`
          names = ["Asha", "Ravi", "Dev"]
          for i in range(len(names)):
              print(i + 1, names[i])
        `, options: ["It numbers every name from 1 to 3", "It numbers the names from 0 to 2", "It misses the last name"],
        answer: 0, verify: false, mono: false,
        explain: md`«range(3)» gives 0, 1 and 2, which are all the positions. «i + 1» shows them as 1, 2 and 3.`,
        why: [null, md`The «+ 1» moves the numbers up by one.`, md`«range(len(names))» covers every position, including the last.`],
        skill: "read" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: where range starts and stops",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          total = 0
          for i in range(2, 6):
              total += i
          print(total)
        `,
        inputs: [],
        ask: [{ line: 3, name: "total" }, { line: 3, hit: 4, name: "total" }, { output: true }],
        hints: [
          md`Write down the numbers the range gives. The first one is 2.`,
          md`The stop number 6 is not given, so the last number is 5.`,
          md`Add 2, 3, 4 and 5, one at a time.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: less than or equal",
        task: md`Read the program. Answer each question without running it.`,
        code: py`
          n = 1
          while n <= 3:
              n += 1
          print(n)
        `,
        inputs: [],
        ask: [{ line: 3, hit: 3, name: "n" }, { output: true }],
        hints: [
          md`Check the condition before every round. 3 is still allowed, because of the equals sign.`,
          md`The loop runs for n equal to 1, 2 and 3. Each round adds 1.`,
          md`After the third round, n is 4, and 4 is not 3 or less, so the loop stops.`,
        ],
      },
      {
        id: "t3", kind: "trace", title: "Be the Computer: the missing student",
        task: md`This program has an off-by-one bug. Trace what it really prints.`,
        code: py`
          names = ["Asha", "Ravi", "Dev"]
          for i in range(len(names) - 1):
              print(names[i])
          print("Last i:", i)
        `,
        inputs: [],
        ask: [{ line: 3, hit: 2, name: "i" }, { output: true }],
        hints: [
          md`The list has 3 names, so the range stop number is 3 minus 1.`,
          md`The range gives only 0 and 1, so the loop runs twice.`,
          md`Dev is never printed. After the loop, i is still 1.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: count from 1 to 5",
        task: md`Put the lines in order and set each indent. The program prints 1, 2, 3, 4 and 5 on separate lines, then «Done». Watch for the wrong range lines.`,
        solution: py`
          for n in range(1, 6):
              print(n)
          print("Done")
        `,
        distractors: ["for n in range(1, 5):", "for n in range(5):"],
        indent: "choose",
        tests: [{ output: "1\n2\n3\n4\n5\nDone" }],
        hints: [
          md`Check the first round and the last round of each loop line on paper.`,
          md`You need a range that starts at 1 and still gives 5. The stop number is never given.`,
          md`Choose the range whose stop number is one more than 5. Only the print of n is inside the loop.`,
        ],
      },
      {
        id: "b1", kind: "bug", title: "Fix: the study plan",
        task: md`
          The program prints one line for each day of study. When the user types «3», it should show:

          | Day 1
          | Day 2
          | Day 3

          It stops one day early. Find the bug and fix it.
        `,
        starter: py`
          days = int(input("Days of study: "))
          for day in range(1, days):
              print("Day", day)
        `,
        bugLines: [2],
        solution: py`
          days = int(input("Days of study: "))
          for day in range(1, days + 1):
              print("Day", day)
        `,
        tests: [
          { inputs: ["3"], output: "Day 1\nDay 2\nDay 3" },
          { inputs: ["1"], output: "Day 1" },
          { inputs: ["5"], output: "Day 1\nDay 2\nDay 3\nDay 4\nDay 5" },
        ],
        wrong: [py`
          days = int(input("Days of study: "))
          for day in range(days):
              print("Day", day)
        `, py`
          days = int(input("Days of study: "))
          for day in range(1, days + 2):
              print("Day", day)
        `],
        hints: [
          md`Check the last round. For 3 days, the last line should be Day 3.`,
          md`The range on line 2 never gives its stop number, so it stops at 2.`,
          md`Make the stop number one more than the number of days. Keep the start at 1.`,
        ],
      },
      {
        id: "b2", kind: "bug", title: "Fix: pouring the cups",
        task: md`
          The program pours the number of cups the user types. When the user types «3», it should show:

          | Pouring cup 1
          | Pouring cup 2
          | Pouring cup 3
          | Done

          It pours one cup too few. Find the bug and fix it.
        `,
        starter: py`
          cups = int(input("Cups to pour: "))
          poured = 1
          while poured < cups:
              print("Pouring cup", poured)
              poured += 1
          print("Done")
        `,
        bugLines: [3],
        solution: py`
          cups = int(input("Cups to pour: "))
          poured = 1
          while poured <= cups:
              print("Pouring cup", poured)
              poured += 1
          print("Done")
        `,
        tests: [
          { inputs: ["3"], output: "Pouring cup 1\nPouring cup 2\nPouring cup 3\nDone" },
          { inputs: ["1"], output: "Pouring cup 1\nDone" },
          { inputs: ["0"], output: "Done" },
          { inputs: ["5"], output: "Pouring cup 1\nPouring cup 2\nPouring cup 3\nPouring cup 4\nPouring cup 5\nDone" },
        ],
        wrong: [py`
          cups = int(input("Cups to pour: "))
          poured = 0
          while poured < cups:
              print("Pouring cup", poured)
              poured += 1
          print("Done")
        `, py`
          cups = int(input("Cups to pour: "))
          poured = 1
          while poured < cups + 2:
              print("Pouring cup", poured)
              poured += 1
          print("Done")
        `],
        hints: [
          md`Check the last round. When poured equals the number of cups, should the loop still run?`,
          md`The condition on line 3 is False when poured equals cups, so the last cup is never poured.`,
          md`Use less than or equal, so the loop also runs when the two numbers are the same.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: a post every 2 metres", optional: true,
        task: md`
          This program counts the posts for a 10-metre fence with a post every metre. Change it so it asks for the length in metres, with a post at the start and every 2 metres after. When the user types «10», it shows:

          | Posts: 6
        `,
        starter: py`
          posts = 0
          for metre in range(0, 11):
              posts += 1
          print("Posts:", posts)
        `,
        solution: py`
          metres = int(input("Length in metres: "))
          posts = 0
          for metre in range(0, metres + 1, 2):
              posts += 1
          print("Posts:", posts)
        `,
        tests: [
          { inputs: ["10"], output: "Posts: 6" },
          { inputs: ["4"], output: "Posts: 3" },
          { inputs: ["0"], output: "Posts: 1" },
          { inputs: ["20"], output: "Posts: 11" },
        ],
        wrong: [py`
          metres = int(input("Length in metres: "))
          posts = 0
          for metre in range(0, metres, 2):
              posts += 1
          print("Posts:", posts)
        `],
        hints: [
          md`Ask for the length first. The range then needs a step of 2.`,
          md`For 10 metres, the posts stand at 0, 2, 4, 6, 8 and 10. The range must still give 10.`,
          md`Make the stop number one more than the length, and the step 2.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: canteen tokens",
        task: md`
          The canteen gives out token numbers. Ask for the first token and the last token. Print every token from the first to the last, both included, then how many there are. Use a «for» loop with «range». When the user types «5» and «8», it shows:

          | Token 5
          | Token 6
          | Token 7
          | Token 8
          | Tokens: 4
        `,
        starter: py`

        `,
        solution: py`
          first = int(input("First token: "))
          last = int(input("Last token: "))
          count = 0
          for t in range(first, last + 1):
              print("Token", t)
              count += 1
          print("Tokens:", count)
        `,
        tests: [
          { inputs: ["5", "8"], output: "Token 5\nToken 6\nToken 7\nToken 8\nTokens: 4" },
          { inputs: ["3", "3"], output: "Token 3\nTokens: 1" },
          { inputs: ["1", "2"], output: "Token 1\nToken 2\nTokens: 2" },
          { inputs: ["98", "101"], output: "Token 98\nToken 99\nToken 100\nToken 101\nTokens: 4" },
          { uses: ["for"], msg: md`Use a «for» loop with «range» to go through the tokens.` },
        ],
        wrong: [py`
          first = int(input("First token: "))
          last = int(input("Last token: "))
          count = 0
          for t in range(first, last):
              print("Token", t)
              count += 1
          print("Tokens:", count)
        `, py`
          first = int(input("First token: "))
          last = int(input("Last token: "))
          for t in range(first, last + 1):
              print("Token", t)
          print("Tokens:", last - first)
        `],
        hints: [
          md`Ask two questions, loop from the first token to the last, and count as you go.`,
          md`Check the first and last rounds on paper. The last token must be printed, and the range never gives its stop number.`,
          md`Use the last token plus one as the stop number. Add 1 to a counter inside the loop, and print it after the loop.`,
        ],
      },
    ],
    keys: [
      md`An **off-by-one bug** is a loop that runs one time too many or too few.`,
      md`«range» never gives its stop number. To reach 10, write «range(1, 11)».`,
      md`«<» stops before the number. «<=» includes it.`,
      md`Check the first and last rounds on paper, then check the same two rounds when you run.`,
      md`A 10-metre fence with a post every metre needs 11 posts: count both ends.`,
    ],
  });
})();
