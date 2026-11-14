// Week 14 — Objects, Properly (Days 92 to 98).
// Day 92 re-teaches a class that only holds data. Day 93 adds methods that
// answer questions, and Day 94 methods that change an object and refuse bad
// changes. Day 95 controls what print shows and sorts objects. Day 96 puts
// objects inside an object and turns them into dictionaries for JSON. Day 97
// makes a new class from an old one. Day 98 is the Train Booking project with
// the Level 8 certificate.
(function () {
  const { day, md, py, ex, code, tip, warn, ask, pause } = window.Course;

  // ---------------------------------------------------------------- Day 92
  day({
    slug: "class-holds-data",
    title: "A Class That Holds Data",
    goal: "Make a class that only stores details, like a filled-in form.",
    minutes: 45,
    kind: "lesson",
    needs: [39, 58],
    win: "Today you can now make a class that holds details, and build many separate objects from it.",
    learn: [
      md`
        ## A class is a blank form

        Day 39 gave you a first look at classes. Today we go slowly. A **class** is like a blank admission form: it says which details to fill in. An **object** is one filled-in copy of that form. Guess the output.
      `,
      ex(py`
        class Student:
            def __init__(self, name, marks):
                self.name = name
                self.marks = marks

        asha = Student("Asha", 82)
        print(asha.name)
        print(asha.marks)
      `, { predict: ["Asha\n82", "name\nmarks", "Student\n82"], answer: 0 }),
      md`
        «Student("Asha", 82)» builds one object. Python then runs «__init__» by itself, the method that fills in the new form. **self** is the name for the new object being filled. «self.name = name» stores an **attribute**: a value kept inside the object. Later, «asha.name» reads it back.
      `,
      ask({
        q: md`In «self.marks = marks», what does «self.marks» mean?`,
        options: ["The marks kept inside this one object", "A normal variable called marks", "The class Student itself"],
        answer: 0,
        explain: md`The dot means "inside". «self.marks» is the marks attribute of the object being built.`,
        why: [null, md`The plain name «marks» is the value that came in. «self.marks» is where it is kept.`, md`«self» is one object, not the whole class.`],
      }),
      md`
        ## Two forms, two objects

        Each call to the class makes a **new**, separate object. Changing one object does not change another. Guess the output.
      `,
      ex(py`
        class Ticket:
            def __init__(self, city, seats):
                self.city = city
                self.seats = seats

        t1 = Ticket("Pune", 2)
        t2 = Ticket("Agra", 5)
        t1.seats = 3
        print(t1.city, t1.seats)
        print(t2.city, t2.seats)
      `, { predict: ["Pune 3\nAgra 5", "Pune 3\nAgra 3", "Pune 2\nAgra 5"], answer: 0 }),
      tip(md`
        Press **Step through** on this example. In the Variables panel, «t1» and «t2» each show their own «city» and «seats». Watch only «t1» change on line 8.
      `),
      pause(md`A good place for a break. Next comes the most common mistake with classes.`),
      md`
        ## A common mistake: forgetting self

        Inside «__init__», the word «self.» decides where a value is kept. Without it, the value goes into a normal variable that disappears when «__init__» ends. Guess what happens.
      `,
      ex(py`
        class Student:
            def __init__(self, name, marks):
                name = name
                self.marks = marks

        ravi = Student("Ravi", 74)
        print(ravi.marks)
        print(ravi.name)
      `, { error: true, label: "A mistake on purpose", predict: ["AttributeError", "NameError", "SyntaxError"], answer: 0 }),
      md`
        Python prints «74», then stops with an **AttributeError**: the object has no attribute called «name». Line 3 never stored it in the object. The fix is «self.name = name».
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          class Stall:
              def __init__(self, owner, cups):
                  self.owner = owner
                  self.cups = cups

          a = Stall("Gopal", 40)
          b = Stall("Rani", 25)
          b.cups = b.cups + 5
          print(a.cups, b.cups)
        `, options: ["40 30", "45 30", "40 25"], answer: 0,
        explain: md`«a» and «b» are separate objects. Only «b.cups» changes, from 25 to 30.`,
        why: [null, md`Line 8 changes «b» only. «a» keeps its own 40.`, md`Line 8 adds 5 to «b.cups» and stores it back, so it is 30.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          class Player:
              def __init__(self, name, runs):
                  self.name = name
                  self.runs = runs

          team = [Player("Rohit", 45), Player("Virat", 82)]
          for p in team:
              if p.runs >= 50:
                  print(p.name)
        `, options: [
          "It prints the name of each player with 50 runs or more",
          "It prints the runs of every player",
          "It adds up the runs of the team",
        ], answer: 0, verify: false, mono: false,
        explain: md`The loop looks at each object and prints the name only when «runs» is 50 or more.`,
        why: [null, md`It prints «p.name», not «p.runs», and only for some players.`, md`There is no total. Nothing is added up.`],
        skill: "read" },
      { q: md`Inside «__init__», what is «self»?`,
        options: ["The new object being filled in", "The name of the class", "A copy of every object made so far"], answer: 0,
        explain: md`Python passes the new object in as «self», so «self.x = ...» stores a value inside it.`,
        why: [null, md`The class is the blank form. «self» is one filled-in copy.`, md`«self» is always just one object.`],
        skill: "memory" },
      { q: md`What happens?`, code: py`
          class Book:
              def __init__(self, title, price):
                  self.title = title
                  price = price

          b = Book("SSC GK", 250)
          print(b.price)
        `, options: ["AttributeError", "250", "None"], answer: 0, error: true,
        explain: md`Line 4 has no «self.», so the price is never stored in the object.`,
        why: [null, md`The 250 went into a normal variable that disappeared when «__init__» ended.`, md`Python does not give back None for a missing attribute. It stops with an error.`],
        skill: "debug" },
      { q: md`You need to keep a name, a city and marks for 200 students, and read them as «s.name». Which tool fits?`,
        options: ["A class with «__init__», and a list of objects", "Three separate variables", "One long string"], answer: 0,
        explain: md`A class is one form for every student. A list holds all 200 filled-in forms.`,
        why: [null, md`Three variables hold one student only, not 200.`, md`A string has no parts that you can read with «.name».`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: one form",
        task: md`Answer each question without running the program. Then press **Step through** and watch the Variables panel.`,
        code: py`
          class Student:
              def __init__(self, name, marks):
                  self.name = name
                  self.marks = marks

          s = Student("Meena", 64)
          m = s.marks
          s.marks = m + 10
          total = s.marks
          print(s.name, total)
        `,
        inputs: [],
        ask: [{ line: 3, name: "name" }, { line: 7, name: "m" }, { line: 9, name: "total" }, { output: true }],
        hints: [
          md`If your first answer is wrong, look at what was passed in on line 6. The first value goes to «name».`,
          md`If your answer for «m» is not 64, remember that «m» is read before line 8 changes the marks.`,
          md`If «total» shows 64, you missed line 8, which stores a new value in «s.marks».`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: two tickets",
        task: md`Answer each question without running the program.`,
        code: py`
          class Ticket:
              def __init__(self, city, seats):
                  self.city = city
                  self.seats = seats

          a = Ticket("Pune", 2)
          b = Ticket("Agra", 4)
          a.seats = a.seats + b.seats
          left = b.seats
          print(a.seats, left)
        `,
        inputs: [],
        ask: [{ line: 4, hit: 2, name: "seats" }, { line: 9, name: "left" }, { output: true }],
        hints: [
          md`If your first answer is 2, notice that line 4 runs once for each object. The second time it is building «b».`,
          md`If «left» is 6, remember that line 8 changes «a» only. «b» keeps its own seats.`,
          md`If the output is wrong, work out «a.seats» on paper: 2 plus the seats of «b».`,
        ],
      },
      {
        id: "t3", kind: "trace", title: "Be the Computer: a list of orders",
        task: md`Answer each question without running the program.`,
        code: py`
          class Order:
              def __init__(self, item, price):
                  self.item = item
                  self.price = price

          orders = [Order("chai", 15), Order("samosa", 20), Order("chai", 15)]
          total = 0
          for o in orders:
              total += o.price
          print(total)
        `,
        inputs: [],
        ask: [{ line: 3, hit: 2, name: "item" }, { line: 9, hit: 2, name: "total" }, { output: true }],
        hints: [
          md`If your first answer is «chai», count again: the second object built on line 6 is the samosa.`,
          md`If «total» after the second run is 20, you forgot the 15 from the first order.`,
          md`If the output is 35, you stopped one order early. The list has three orders.`,
        ],
      },
      {
        id: "f1", kind: "fill", title: "Fill the gaps: store the city",
        task: md`
          Fill the gaps on line 4 so each object keeps its own city. The program prints:

          | Kiran lives in Jaipur
        `,
        template: py`
          class Student:
              def __init__(self, name, city):
                  self.name = name
                  ⟦self⟧.⟦city⟧ = ⟦city⟧

          s = Student("Kiran", "Jaipur")
          print(s.name, "lives in", s.city)
        `,
        tests: [
          { output: "Kiran lives in Jaipur" },
          { py: py`
              for name, city in [("Ravi", "Patna"), ("Lata", "Kochi"), ("Aman", "")]:
                  st = new("Student", name, city)
                  assert getattr(st, "city", None) == city, f"Student('{name}', '{city}') should keep the city '{city}'. Check the right side of line 4."
                  assert st.name == name, f"Student('{name}', '{city}') should keep the name '{name}'."
            ` },
        ],
        wrong: [py`
          class Student:
              def __init__(self, name, city):
                  self.name = name
                  self.city = "Jaipur"

          s = Student("Kiran", "Jaipur")
          print(s.name, "lives in", s.city)
        `],
        hints: [
          md`If you see an AttributeError, the object has no «city» yet. The left side of line 4 must start with the object's own name.`,
          md`If every student lives in Jaipur, the right side of line 4 is fixed text. It should be the value that came in.`,
          md`If you see a NameError, check the spelling of the name that came in: it is in the «def» line.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the marks went missing",
        task: md`
          This program should print «Farah scored 71». It stops with an AttributeError instead. Find the wrong line and fix it.
        `,
        starter: py`
          class Student:
              def __init__(self, name, marks):
                  self.name = name
                  marks = marks

          s = Student("Farah", 71)
          print(s.name, "scored", s.marks)
        `,
        bugLines: [4],
        solution: py`
          class Student:
              def __init__(self, name, marks):
                  self.name = name
                  self.marks = marks

          s = Student("Farah", 71)
          print(s.name, "scored", s.marks)
        `,
        tests: [
          { output: "Farah scored 71" },
          { py: py`
              for name, marks in [("Dev", 0), ("Isha", 100), ("Om", 55)]:
                  st = new("Student", name, marks)
                  assert getattr(st, "marks", None) == marks, f"Student('{name}', {marks}) should keep marks {marks}. Check that line 4 stores the marks inside the object."
            ` },
        ],
        wrong: [py`
          class Student:
              def __init__(self, name, marks):
                  self.name = name
                  self.mark = marks

          s = Student("Farah", 71)
          print(s.name, "scored", s.marks)
        `, py`
          class Student:
              def __init__(self, name, marks):
                  self.name = name
                  self.marks = 71

          s = Student("Farah", 71)
          print(s.name, "scored", s.marks)
        `],
        hints: [
          md`If the error says there is no attribute «marks», line 4 is not storing the value inside the object.`,
          md`If the error stays after your change, compare the spelling on line 4 with the spelling on line 7, letter by letter.`,
          md`If Farah works but other students all get 71, line 4 stores a fixed number instead of the value that came in.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: add the fare", optional: true,
        task: md`
          Give every ticket a third detail, «fare», in rupees. «__init__» takes it as a third value and keeps it as «self.fare». Build Arjun's ticket with a fare of 450. The program then prints:

          | Arjun to Chennai, fare 450
        `,
        starter: py`
          class Ticket:
              def __init__(self, name, city):
                  self.name = name
                  self.city = city

          t = Ticket("Arjun", "Chennai")
          print(t.name, "to", t.city)
        `,
        solution: py`
          class Ticket:
              def __init__(self, name, city, fare):
                  self.name = name
                  self.city = city
                  self.fare = fare

          t = Ticket("Arjun", "Chennai", 450)
          print(f"{t.name} to {t.city}, fare {t.fare}")
        `,
        tests: [
          { output: "Arjun to Chennai, fare 450" },
          { py: py`
              for args in [("Lata", "Kochi", 900), ("Sam", "Goa", 0), ("Noor", "Delhi", 1250)]:
                  t = new("Ticket", *args)
                  assert getattr(t, "fare", None) == args[2], f"Ticket{args} should keep the fare {args[2]}. Check that «__init__» stores the third value."
                  assert t.city == args[1], f"Ticket{args} should keep the city {args[1]}."
            ` },
        ],
        wrong: [py`
          class Ticket:
              def __init__(self, name, city):
                  self.name = name
                  self.city = city
                  self.fare = 450

          t = Ticket("Arjun", "Chennai")
          print(f"{t.name} to {t.city}, fare {t.fare}")
        `],
        hints: [
          md`If you see a TypeError about arguments, the «def __init__» line and the call to «Ticket» have a different number of values.`,
          md`If Arjun works but other tickets all cost 450, the fare is a fixed number. It should come in through «__init__».`,
          md`If the output has an extra space before the comma, print it with one f-string.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a student form",
        task: md`
          Make a class «Student». Its «__init__» takes «name», «city» and «marks», in that order, and keeps each one as an attribute with the same name. Then build two students and print one line for each, in this shape:

          | Asha (Delhi): 82
          | Ravi (Lucknow): 67

          The hidden tests also build students of their own.
        `,
        starter: py`

        `,
        solution: py`
          class Student:
              def __init__(self, name, city, marks):
                  self.name = name
                  self.city = city
                  self.marks = marks

          a = Student("Asha", "Delhi", 82)
          b = Student("Ravi", "Lucknow", 67)
          for s in [a, b]:
              print(f"{s.name} ({s.city}): {s.marks}")
        `,
        tests: [
          { output: "Asha (Delhi): 82\nRavi (Lucknow): 67" },
          { uses: ["class"], msg: md`Today's tool is a class. Make one called «Student».` },
          { py: py`
              for args in [("Neha", "Bhopal", 0), ("Karan", "Surat", 100), ("Zoya", "Shimla", 49)]:
                  st = new("Student", *args)
                  got = (getattr(st, "name", None), getattr(st, "city", None), getattr(st, "marks", None))
                  assert got == args, f"Student{args} should keep name, city and marks as {args}, but it keeps {got}. Check the order of the values in «def __init__»."
              x = new("Student", "P", "Agra", 10)
              y = new("Student", "Q", "Ooty", 20)
              assert x.marks == 10 and y.marks == 20, "Two students should keep their own marks. Check that each value is stored with «self.»."
            ` },
        ],
        wrong: [py`
          class Student:
              def __init__(self, name, marks, city):
                  self.name = name
                  self.city = city
                  self.marks = marks

          a = Student("Asha", 82, "Delhi")
          b = Student("Ravi", 67, "Lucknow")
          for s in [a, b]:
              print(f"{s.name} ({s.city}): {s.marks}")
        `, py`
          print("Asha (Delhi): 82")
          print("Ravi (Lucknow): 67")
        `],
        hints: [
          md`If a hidden test says the city and the marks are swapped, check the order of the values in your «def __init__» line.`,
          md`If a hidden test cannot find the class, check that it is called «Student», with a capital S.`,
          md`If the output is right but a test says two students share marks, check that every value is stored with «self.».`,
        ],
      },
    ],
    keys: [
      md`A **class** is a blank form. Each call, like «Student("Asha", 82)», makes one filled-in **object**.`,
      md`«__init__» runs by itself when an object is built. **self** is the new object being filled in.`,
      md`«self.marks = marks» stores an **attribute** inside the object. «asha.marks» reads it back.`,
      md`Every object keeps its own attributes. Changing one object does not change another.`,
      md`Forget «self.» in «__init__» and the value is lost. Reading it later gives an AttributeError.`,
    ],
  });

  // ---------------------------------------------------------------- Day 93
  day({
    slug: "methods-answer-questions",
    title: "Methods That Answer Questions",
    goal: "Add methods that use an object's own data to return answers.",
    minutes: 40,
    kind: "lesson",
    needs: [92],
    win: "Today you can now give a class its own methods that work out answers from the object's data.",
    learn: [
      md`
        ## A method asks the object a question

        A **method** is a function written inside a class. Its first parameter is always «self». When you call «s.percentage()», Python passes the object «s» in as «self». So «self.marks» means "the marks of this object". Guess the output.
      `,
      ex(py`
        class Student:
            def __init__(self, name, marks, out_of):
                self.name = name
                self.marks = marks
                self.out_of = out_of

            def percentage(self):
                return self.marks * 100 / self.out_of

        s = Student("Asha", 150, 200)
        print(s.percentage())
      `, { predict: ["75.0", "75", "150"], answer: 0 }),
      md`
        The method uses the object's own data, so you pass nothing in the brackets. It uses «return», so the answer comes back to the line that called it. «/» always gives a decimal, so the answer is «75.0».
      `,
      md`
        ## One method, many objects

        Every object built from the class gets the same method. Each object gives its own answer, from its own data. Guess the output.
      `,
      ex(py`
        class Ticket:
            def __init__(self, city, km):
                self.city = city
                self.km = km

            def price(self):
                if self.km > 500:
                    return 600
                return 50 + self.km

        t1 = Ticket("Agra", 200)
        t2 = Ticket("Patna", 900)
        total = t1.price() + t2.price()
        print(t1.price(), t2.price(), total)
      `, { predict: ["250 600 850", "250 950 1200", "600 600 1200"], answer: 0 }),
      ask({
        q: md`When the program calls «t2.price()», what is «self» inside «price»?`,
        options: ["The object t2", "The object t1", "The number 900"],
        answer: 0,
        explain: md`The object before the dot becomes «self». So «self.km» is 900 for «t2».`,
        why: [null, md`«t1» is a different object. Only the object before the dot is passed in.`, md`900 is one attribute of «t2». «self» is the whole object.`],
      }),
      md`
        ## A common mistake: no self in the def line

        Python always passes the object in as the first value. If the «def» line has no «self», there is no place to put it. Guess what happens.
      `,
      ex(py`
        class Chai:
            def __init__(self, cups):
                self.cups = cups

            def bill():
                return self.cups * 15

        order = Chai(4)
        print(order.bill())
      `, { error: true, label: "A mistake on purpose", predict: ["TypeError", "60", "NameError"], answer: 0 }),
      md`
        The **TypeError** says «bill()» takes 0 values, but 1 was given. That 1 is the object. Write «def bill(self):». A spelling slip, such as «self.cup» for «self.cups», gives a different error: an AttributeError.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          class Box:
              def __init__(self, samosas):
                  self.samosas = samosas

              def cost(self):
                  return self.samosas * 12

          a = Box(5)
          b = Box(2)
          print(a.cost() - b.cost())
        `, options: ["36", "60", "3"], answer: 0,
        explain: md`«a.cost()» is 60 and «b.cost()» is 24. 60 minus 24 is 36.`,
        why: [null, md`That is «a.cost()» alone. The program takes away «b.cost()».`, md`That is 5 minus 2. Each method call multiplies by 12 first.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          class Student:
              def __init__(self, name, marks):
                  self.name = name
                  self.marks = marks

              def passed(self):
                  return self.marks >= 33

          for s in [Student("Om", 30), Student("Ira", 70)]:
              if s.passed():
                  print(s.name)
        `, options: [
          "It prints the names of the students with 33 marks or more",
          "It prints True or False for each student",
          "It prints the marks of every student",
        ], answer: 0, verify: false, mono: false,
        explain: md`«passed()» gives back True or False. The «if» prints the name only when it is True.`,
        why: [null, md`True and False go to the «if». They are never printed.`, md`The program prints «s.name», not the marks.`],
        skill: "read" },
      { q: md`What happens?`, code: py`
          class Stall:
              def __init__(self, cups):
                  self.cups = cups

              def left():
                  return 50 - self.cups

          print(Stall(20).left())
        `, options: ["TypeError", "30", "AttributeError"], answer: 0, error: true,
        explain: md`«def left():» has no «self». Python passes the object in, and there is no place for it.`,
        why: [null, md`The method never runs. Python stops when it tries to pass the object in.`, md`An AttributeError comes from a misspelt attribute. Here the «def» line is wrong.`],
        skill: "debug" },
      { q: md`What does this show?`, code: py`
          class Bill:
              def __init__(self, total):
                  self.total = total

              def show(self):
                  print(self.total)

          b = Bill(80)
          print(b.show())
        `, options: ["80\nNone", "80", "None"], answer: 0,
        explain: md`«show()» prints 80, then gives back None because it has no «return». The outer «print» shows that None.`,
        why: [null, md`The outer «print» also shows something: the None that came back.`, md`«show()» runs first, and it prints 80.`],
        skill: "trace" },
      { q: md`Why do most methods use «self.marks» instead of taking marks in the brackets?`,
        options: ["The object already keeps its marks, so the method reads them from self", "Methods cannot take any values in the brackets", "«self.marks» runs faster than a parameter"], answer: 0,
        explain: md`The data lives inside the object. A method reads it through «self», so the caller passes nothing.`,
        why: [null, md`Methods can take extra values after «self». They just do not need to for data the object keeps.`, md`Speed is not the reason. It is about where the data lives.`],
        skill: "memory" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: two percentages",
        task: md`Answer each question without running the program.`,
        code: py`
          class Student:
              def __init__(self, name, marks, out_of):
                  self.name = name
                  self.marks = marks
                  self.out_of = out_of

              def percentage(self):
                  p = self.marks * 100 / self.out_of
                  return p

          a = Student("Ravi", 45, 60)
          b = Student("Sita", 36, 40)
          x = a.percentage()
          y = b.percentage()
          print(x, y)
        `,
        inputs: [],
        ask: [{ line: 8, name: "p" }, { line: 8, hit: 2, name: "p" }, { output: true }],
        hints: [
          md`If your first answer is not 75.0, work out 45 times 100, divided by 60, using the marks of «a».`,
          md`If your second answer equals the first, remember the second run of line 8 is for «b», with Sita's marks.`,
          md`If your output has no «.0», remember that «/» always gives a decimal.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: fast scorers",
        task: md`Answer each question without running the program.`,
        code: py`
          class Player:
              def __init__(self, name, runs, balls):
                  self.name = name
                  self.runs = runs
                  self.balls = balls

              def strike_rate(self):
                  return self.runs * 100 // self.balls

          team = [Player("Rohit", 30, 20), Player("Gill", 12, 24), Player("Rinku", 40, 16)]
          fast = 0
          for p in team:
              sr = p.strike_rate()
              if sr >= 150:
                  fast += 1
          print(fast)
        `,
        inputs: [],
        ask: [{ line: 13, hit: 2, name: "sr" }, { line: 15, hit: 2, name: "fast" }, { output: true }],
        hints: [
          md`If your first answer is 150, that is Rohit. The second run of line 13 is for Gill: 12 runs from 24 balls.`,
          md`If you think line 15 runs only once, check Rohit again: 150 is «>=» 150.`,
          md`If your output is 1, count again which strike rates are 150 or more.`,
        ],
      },
      {
        id: "f1", kind: "fill", title: "Fill the gaps: a percentage method",
        task: md`
          Fill the gaps so «percentage» gives back the student's percentage. The program prints:

          | 75.0
        `,
        template: py`
          class Student:
              def __init__(self, name, marks, out_of):
                  self.name = name
                  self.marks = marks
                  self.out_of = out_of

              def ⟦percentage⟧(⟦self⟧):
                  return ⟦self⟧.marks * 100 / ⟦self⟧.out_of

          s = Student("Asha", 150, 200)
          print(s.percentage())
        `,
        tests: [
          { output: "75.0" },
          { py: py`
              for marks, out_of, want in [(0, 50, 0.0), (200, 200, 100.0), (27, 30, 90.0)]:
                  st = new("Student", "X", marks, out_of)
                  got = method(st, "percentage")
                  assert got == want, f"A student with {marks} out of {out_of} should give back {want}, but got {got}. Check that the method reads this object's own marks."
            ` },
        ],
        wrong: [py`
          class Student:
              def __init__(self, name, marks, out_of):
                  self.name = name
                  self.marks = marks
                  self.out_of = out_of

              def percentage(self):
                  return 150 * 100 / 200

          s = Student("Asha", 150, 200)
          print(s.percentage())
        `],
        hints: [
          md`If you see a TypeError about 0 values and 1 given, the «def» line has nothing in its brackets.`,
          md`If you see a NameError for «marks», the method must read the marks through the object.`,
          md`If you see an AttributeError, the method name in the «def» line does not match the name on the last line.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the ticket price crashes",
        task: md`
          A ticket costs 50 rupees plus 2 rupees for each km. For Agra, 200 km, the program should print «Agra 450». It stops with an AttributeError instead. Find the wrong line and fix it.
        `,
        starter: py`
          class Ticket:
              def __init__(self, city, km):
                  self.city = city
                  self.km = km

              def price(self):
                  return 50 + self.kms * 2

          t = Ticket("Agra", 200)
          print(t.city, t.price())
        `,
        bugLines: [7],
        solution: py`
          class Ticket:
              def __init__(self, city, km):
                  self.city = city
                  self.km = km

              def price(self):
                  return 50 + self.km * 2

          t = Ticket("Agra", 200)
          print(t.city, t.price())
        `,
        tests: [
          { output: "Agra 450" },
          { py: py`
              for km, want in [(0, 50), (1, 52), (1000, 2050)]:
                  t = new("Ticket", "Goa", km)
                  got = method(t, "price")
                  assert got == want, f"A ticket for {km} km should cost {want}, but price() gave back {got}. Check the sum on line 7."
            ` },
        ],
        wrong: [py`
          class Ticket:
              def __init__(self, city, km):
                  self.city = city
                  self.km = km

              def price(self):
                  return 50 + km * 2

          t = Ticket("Agra", 200)
          print(t.city, t.price())
        `, py`
          class Ticket:
              def __init__(self, city, km):
                  self.city = city
                  self.km = km

              def price(self):
                  return 450

          t = Ticket("Agra", 200)
          print(t.city, t.price())
        `],
        hints: [
          md`If the error names «kms», compare that spelling with the one stored in «__init__».`,
          md`If you now see a NameError for «km», the method must read it through the object.`,
          md`If Agra works but a hidden test with 0 km fails, the price is a fixed number instead of a sum.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Look It Up: a roll number with zeros", optional: true,
        task: md`
          This is a Look It Up task: the tool you need was never taught. Add a method «roll_text()» that gives back the roll number as text with exactly 5 digits, with zeros in front. Roll number 42 gives «00042». The program then prints:

          | Asha 00042

          Python's text has a method that fills with zeros on the left. Find it with «print(dir(""))», then read about it with «help»: for example «help("".upper)» shows the help for «upper».
        `,
        starter: py`
          class Student:
              def __init__(self, name, roll):
                  self.name = name
                  self.roll = roll

          s = Student("Asha", 42)
          print(s.name, s.roll)
        `,
        solution: py`
          class Student:
              def __init__(self, name, roll):
                  self.name = name
                  self.roll = roll

              def roll_text(self):
                  return str(self.roll).zfill(5)

          s = Student("Asha", 42)
          print(s.name, s.roll_text())
        `,
        tests: [
          { output: "Asha 00042" },
          { py: py`
              for roll, want in [(7, "00007"), (12345, "12345"), (0, "00000"), (980, "00980")]:
                  st = new("Student", "X", roll)
                  got = method(st, "roll_text")
                  assert got == want, f"Roll number {roll} should give back '{want}', but got {got!r}. Check how many zeros go in front for this size of number."
            ` },
        ],
        wrong: [py`
          class Student:
              def __init__(self, name, roll):
                  self.name = name
                  self.roll = roll

              def roll_text(self):
                  return "000" + str(self.roll)

          s = Student("Asha", 42)
          print(s.name, s.roll_text())
        `],
        hints: [
          md`If 42 works but 7 or 12345 fails, you add a fixed number of zeros. The tool must fill up to 5 digits for any number.`,
          md`If you see an AttributeError on an int, the roll number is a number. Turn it into text first.`,
          md`If you cannot find the tool, look in «dir("")» for a name that starts with «z».`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a train ticket with a senior fare",
        task: md`
          Make a class «Ticket». Its «__init__» takes «name», «km» and «age». Add a method «price()» that gives back the fare in rupees: 2 rupees for each km. A passenger aged 60 or more pays half, using «//». Build two tickets and print:

          | Rahul: 300
          | Kamla: 200

          Rahul travels 150 km and is 30. Kamla travels 200 km and is 60. The hidden tests build other tickets.
        `,
        starter: py`

        `,
        solution: py`
          class Ticket:
              def __init__(self, name, km, age):
                  self.name = name
                  self.km = km
                  self.age = age

              def price(self):
                  fare = self.km * 2
                  if self.age >= 60:
                      return fare // 2
                  return fare

          for t in [Ticket("Rahul", 150, 30), Ticket("Kamla", 200, 60)]:
              print(f"{t.name}: {t.price()}")
        `,
        tests: [
          { output: "Rahul: 300\nKamla: 200" },
          { py: py`
              for km, age, want in [(100, 59, 200), (100, 60, 100), (0, 75, 0), (333, 61, 333), (1, 5, 2)]:
                  t = new("Ticket", "X", km, age)
                  got = method(t, "price")
                  assert got == want, f"A ticket for {km} km at age {age} should cost {want}, but price() gave back {got}. Check the age rule and the «//»."
            ` },
        ],
        wrong: [py`
          class Ticket:
              def __init__(self, name, km, age):
                  self.name = name
                  self.km = km
                  self.age = age

              def price(self):
                  fare = self.km * 2
                  if self.age > 60:
                      return fare // 2
                  return fare

          for t in [Ticket("Rahul", 150, 30), Ticket("Kamla", 200, 61)]:
              print(f"{t.name}: {t.price()}")
        `, py`
          class Ticket:
              def __init__(self, name, km, age):
                  self.name = name
                  self.km = km
                  self.age = age

              def price(self):
                  fare = self.km * 2
                  if self.age >= 60:
                      print(fare // 2)
                  print(fare)

          print("Rahul: 300")
          print("Kamla: 200")
        `],
        hints: [
          md`If a passenger aged exactly 60 pays the full fare, check the comparison in your age rule.`,
          md`If price() gives back None, the method prints its answer instead of giving it back.`,
          md`If a 333 km senior ticket gives 333.0, you used «/» where the task asks for «//».`,
        ],
      },
    ],
    keys: [
      md`A **method** is a function inside a class. Its first parameter is «self», the object before the dot.`,
      md`Inside a method, «self.marks» reads this object's own data. The caller passes nothing for it.`,
      md`Use «return» so the answer comes back to the line that called the method.`,
      md`Forget «self» in the «def» line and the call gives a TypeError. Misspell «self.km» and you get an AttributeError.`,
    ],
  });

  // ---------------------------------------------------------------- Day 94
  day({
    slug: "methods-change-objects",
    title: "Methods That Change Objects",
    goal: "Write methods that change an object and refuse bad changes.",
    minutes: 45,
    kind: "lesson",
    needs: [53, 71, 93],
    win: "Today you can now write a bank account whose methods change its balance and refuse a bad withdrawal.",
    learn: [
      md`
        ## A method that changes the object

        A method can take extra values after «self». Here «deposit» takes an **amount** and adds it to the balance with «+=». The change stays inside the object after the method ends. Guess the output.
      `,
      ex(py`
        class BankAccount:
            def __init__(self, owner, balance):
                self.owner = owner
                self.balance = balance

            def deposit(self, amount):
                self.balance += amount

        acc = BankAccount("Priya", 500)
        acc.deposit(200)
        acc.deposit(50)
        print(acc.balance)
      `, { predict: ["750", "500", "550"], answer: 0 }),
      md`
        Each call adds to the same «self.balance». So the **state** of the object, the values it holds right now, changes after every call. To follow a program like this, keep the object's attributes on paper and update them line by line.
      `,
      md`
        ## Refuse a bad change

        A bank does not let you take out more money than you have. The method checks first, and uses «raise» (Day 71) to refuse. Guess the output.
      `,
      ex(py`
        class BankAccount:
            def __init__(self, owner, balance):
                self.owner = owner
                self.balance = balance

            def withdraw(self, amount):
                if amount > self.balance:
                    raise ValueError("Not enough money")
                self.balance -= amount

        acc = BankAccount("Priya", 300)
        try:
            acc.withdraw(500)
        except ValueError as e:
            print("Refused:", e)
        print(acc.balance)
      `, { predict: ["Refused: Not enough money\n300", "Refused: Not enough money\n-200", "-200"], answer: 0 }),
      md`
        «raise» stops the method at once, so line 9 never runs and the balance stays 300. The rule is: **check first, then change**. If you change first and check later, a refused withdrawal still takes the money.
      `,
      pause(md`A good place for a break. Next: two names for one object.`),
      md`
        ## Two names, one object

        On Day 53, «b = a» gave a second name to the same list. Objects work the same way: «b = a» does not make a new account. Guess the output.
      `,
      ex(py`
        class BankAccount:
            def __init__(self, owner, balance):
                self.owner = owner
                self.balance = balance

            def deposit(self, amount):
                self.balance += amount

        a = BankAccount("Ravi", 100)
        b = a
        b.deposit(50)
        print(a.balance, a is b)
      `, { predict: ["150 True", "100 False", "100 True"], answer: 0 }),
      ask({
        q: md`In the last example, how many account objects exist?`,
        options: ["One, with two names", "Two, one for each name", "None, until deposit runs"],
        answer: 0,
        explain: md`Only «BankAccount(...)» builds an object. «b = a» adds a second name for it.`,
        why: [null, md`«b = a» copies nothing. Only a call to the class builds a new object.`, md`The object is built on the line «a = BankAccount("Ravi", 100)».`],
      }),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          class Card:
              def __init__(self, balance):
                  self.balance = balance

              def travel(self, fare):
                  self.balance -= fare

          c = Card(100)
          c.travel(30)
          c.travel(25)
          print(c.balance)
        `, options: ["45", "70", "100"], answer: 0,
        explain: md`100 minus 30 is 70. 70 minus 25 is 45. Each call changes the same object.`,
        why: [null, md`That is after the first trip only. The second call takes 25 more.`, md`The method changes «self.balance», so the object does not stay at 100.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          class Stock:
              def __init__(self, cups):
                  self.cups = cups

              def sell(self, n):
                  if n > self.cups:
                      raise ValueError("Not enough chai")
                  self.cups -= n
        `, options: [
          "It keeps a count of cups and refuses to sell more cups than it has",
          "It sells every order and lets the count go below zero",
          "It prints how many cups are left after each sale",
        ], answer: 0, verify: false, mono: false,
        explain: md`«sell» checks first. If the order is too big, «raise» stops it before the count changes.`,
        why: [null, md`The check with «raise» stops any sale bigger than the stock.`, md`There is no «print» in the class at all.`],
        skill: "read" },
      { q: md`What does this show?`, code: py`
          class Account:
              def __init__(self, balance):
                  self.balance = balance

              def deposit(self, amount):
                  self.balance += amount

          a = Account(100)
          b = a
          c = Account(100)
          b.deposit(20)
          print(a.balance, c.balance)
        `, options: ["120 100", "100 100", "120 120"], answer: 0,
        explain: md`«a» and «b» are two names for one object, so «a» shows 120. «c» is a separate object.`,
        why: [null, md`«b = a» does not copy. The deposit through «b» changes the object «a» names.`, md`«c» was built by its own call to «Account», so it is separate.`],
        skill: "trace" },
      { q: md`This method should refuse a withdrawal that is too big. What does the program show?`, code: py`
          class Account:
              def __init__(self, balance):
                  self.balance = balance

              def withdraw(self, amount):
                  self.balance -= amount
                  if self.balance < 0:
                      raise ValueError("No")

          a = Account(100)
          try:
              a.withdraw(150)
          except ValueError:
              print("Refused")
          print(a.balance)
        `, options: ["Refused\n-50", "Refused\n100", "-50"], answer: 0,
        explain: md`The method changes the balance first, then refuses. The money is already gone. Check first, then change.`,
        why: [null, md`That is what the program should do. But line 6 has already taken the 150 before the check.`, md`The «raise» still runs, so «Refused» is printed first.`],
        skill: "debug" },
      { q: md`What does «self.balance += amount» do inside a method?`,
        options: ["It adds amount to the balance kept in this object", "It makes a new local variable called balance", "It gives back the new balance"], answer: 0,
        explain: md`«self.» means the change goes into the object, so it stays after the method ends.`,
        why: [null, md`With «self.», the value is stored in the object, not in a local name.`, md`Only «return» gives a value back. This line just changes the object.`],
        skill: "memory" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: a wallet",
        task: md`Answer each question without running the program. Keep the wallet's money on paper.`,
        code: py`
          class Wallet:
              def __init__(self, money):
                  self.money = money

              def spend(self, amount):
                  self.money -= amount

              def add(self, amount):
                  self.money += amount

          w = Wallet(100)
          w.spend(30)
          w.add(50)
          w.spend(15)
          left = w.money
          print(left)
        `,
        inputs: [],
        ask: [{ line: 6, hit: 2, name: "amount" }, { line: 9, name: "amount" }, { line: 15, name: "left" }, { output: true }],
        hints: [
          md`If your first answer is 30, that is the first run of line 6. The second run comes from line 14.`,
          md`If your second answer is not 50, line 9 runs only once, from line 13.`,
          md`If «left» is wrong, follow the money on paper: 100, then minus 30, plus 50, minus 15.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: a refused sale",
        task: md`Answer each question without running the program.`,
        code: py`
          class Stall:
              def __init__(self, samosas):
                  self.samosas = samosas

              def sell(self, n):
                  if n > self.samosas:
                      raise ValueError("Only " + str(self.samosas) + " left")
                  self.samosas -= n

          s = Stall(10)
          sold = 0
          for n in [4, 8, 6]:
              try:
                  s.sell(n)
                  sold += n
              except ValueError as e:
                  print(e)
          print(sold, s.samosas)
        `,
        inputs: [],
        ask: [{ line: 15, name: "sold" }, { line: 15, hit: 2, name: "sold" }, { output: true }],
        hints: [
          md`If your second answer is 12, remember the order of 8 is refused. Line 15 is skipped for it.`,
          md`If you think the stall has 2 samosas at the end, the refused order did not change the stock.`,
          md`If your output has only one line, the refused order printed its message first.`,
        ],
      },
      {
        id: "t3", kind: "trace", title: "Be the Computer: whose account?",
        task: md`Answer each question without running the program.`,
        code: py`
          class Account:
              def __init__(self, balance):
                  self.balance = balance

              def deposit(self, amount):
                  self.balance += amount

          mine = Account(200)
          yours = Account(200)
          same = mine
          same.deposit(100)
          yours.deposit(10)
          x = mine.balance
          y = yours.balance
          print(x, y)
        `,
        inputs: [],
        ask: [{ line: 13, name: "x" }, { line: 14, name: "y" }, { output: true }],
        hints: [
          md`If «x» is 200, remember that «same» and «mine» name one object. The deposit through «same» changes it.`,
          md`If «y» is 310, check that «yours» was built by its own call. It is a separate object.`,
          md`If the output is wrong, count the objects: only two calls to «Account».`,
        ],
      },
      {
        id: "f1", kind: "fill", title: "Fill the gaps: a safe withdrawal",
        task: md`
          Fill the gaps so «withdraw» refuses an amount bigger than the balance, and otherwise takes it away. The program prints:

          | Refused: Not enough money
          | 200
        `,
        template: py`
          class BankAccount:
              def __init__(self, owner, balance):
                  self.owner = owner
                  self.balance = balance

              def withdraw(self, amount):
                  if amount > self.balance:
                      ⟦raise⟧ ValueError("Not enough money")
                  ⟦self⟧.balance ⟦-=⟧ amount

          acc = BankAccount("Priya", 500)
          acc.withdraw(300)
          try:
              acc.withdraw(250)
          except ValueError as e:
              print("Refused:", e)
          print(acc.balance)
        `,
        tests: [
          { output: "Refused: Not enough money\n200" },
          { py: py`
              acc = new("BankAccount", "Om", 100)
              method(acc, "withdraw", 100)
              assert acc.balance == 0, f"Taking out all 100 should leave 0, but the balance is {acc.balance}. Taking the whole balance is allowed."
              acc2 = new("BankAccount", "Ira", 50)
              try:
                  acc2.withdraw(51)
                  refused = False
              except ValueError:
                  refused = True
              assert refused, "Taking out 51 from 50 should raise a ValueError."
              assert acc2.balance == 50, f"After a refused withdrawal the balance should stay 50, but it is {acc2.balance}."
              acc3 = new("BankAccount", "Sam", 1000)
              method(acc3, "withdraw", 1)
              method(acc3, "withdraw", 499)
              assert acc3.balance == 500, f"1000 minus 1 minus 499 should leave 500, but the balance is {acc3.balance}."
            ` },
        ],
        wrong: [py`
          class BankAccount:
              def __init__(self, owner, balance):
                  self.owner = owner
                  self.balance = balance

              def withdraw(self, amount):
                  if amount > self.balance:
                      print("Not enough money")
                  self.balance -= amount

          acc = BankAccount("Priya", 500)
          acc.withdraw(300)
          try:
              acc.withdraw(250)
          except ValueError as e:
              print("Refused:", e)
          print(acc.balance)
        `],
        hints: [
          md`If the refused withdrawal still lowers the balance, the first gap must stop the method, not just show a message.`,
          md`If the balance never changes, the last line must change the object's own balance.`,
          md`If the balance goes up instead of down, check the operator in the last gap.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the deposit that does nothing",
        task: md`
          Priya has 500 rupees. She deposits 200, then withdraws 100. The program should print «600». It prints «400». Find the wrong line and fix it.
        `,
        starter: py`
          class BankAccount:
              def __init__(self, owner, balance):
                  self.owner = owner
                  self.balance = balance

              def deposit(self, amount):
                  self.balance + amount

              def withdraw(self, amount):
                  if amount > self.balance:
                      raise ValueError("Not enough money")
                  self.balance -= amount

          acc = BankAccount("Priya", 500)
          acc.deposit(200)
          acc.withdraw(100)
          print(acc.balance)
        `,
        bugLines: [7],
        solution: py`
          class BankAccount:
              def __init__(self, owner, balance):
                  self.owner = owner
                  self.balance = balance

              def deposit(self, amount):
                  self.balance += amount

              def withdraw(self, amount):
                  if amount > self.balance:
                      raise ValueError("Not enough money")
                  self.balance -= amount

          acc = BankAccount("Priya", 500)
          acc.deposit(200)
          acc.withdraw(100)
          print(acc.balance)
        `,
        tests: [
          { output: "600" },
          { py: py`
              a = new("BankAccount", "Om", 0)
              method(a, "deposit", 70)
              method(a, "deposit", 30)
              assert a.balance == 100, f"0, then deposits of 70 and 30, should give 100, but the balance is {a.balance}."
              b = new("BankAccount", "Ira", 10)
              try:
                  b.withdraw(50)
              except ValueError:
                  pass
              method(b, "deposit", 40)
              method(b, "withdraw", 50)
              assert b.balance == 0, f"10, a refused 50, a deposit of 40, then taking out 50 should leave 0, but the balance is {b.balance}."
            ` },
        ],
        wrong: [py`
          class BankAccount:
              def __init__(self, owner, balance):
                  self.owner = owner
                  self.balance = balance

              def deposit(self, amount):
                  self.balance = amount

              def withdraw(self, amount):
                  if amount > self.balance:
                      raise ValueError("Not enough money")
                  self.balance -= amount

          acc = BankAccount("Priya", 500)
          acc.deposit(200)
          acc.withdraw(100)
          print(acc.balance)
        `, py`
          class BankAccount:
              def __init__(self, owner, balance):
                  self.owner = owner
                  self.balance = balance

              def deposit(self, amount):
                  return self.balance + amount

              def withdraw(self, amount):
                  if amount > self.balance:
                      raise ValueError("Not enough money")
                  self.balance -= amount

          acc = BankAccount("Priya", 500)
          acc.deposit(200)
          acc.withdraw(100)
          print(acc.balance)
        `],
        hints: [
          md`If the output is still 400, the deposit works out a sum but never stores it in the object.`,
          md`If the output is now 100, your deposit replaces the balance instead of adding to it.`,
          md`If a hidden test with two deposits fails, check that each deposit adds to what is already there.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: refuse a zero deposit", optional: true,
        task: md`
          A deposit of 0 rupees, or less, makes no sense. Change «deposit» so it raises «ValueError("Amount must be more than 0")» for such an amount, and does not change the balance. The program then prints:

          | Refused: Amount must be more than 0
          | 500
        `,
        starter: py`
          class BankAccount:
              def __init__(self, owner, balance):
                  self.owner = owner
                  self.balance = balance

              def deposit(self, amount):
                  self.balance += amount

          acc = BankAccount("Priya", 500)
          try:
              acc.deposit(0)
          except ValueError as e:
              print("Refused:", e)
          print(acc.balance)
        `,
        solution: py`
          class BankAccount:
              def __init__(self, owner, balance):
                  self.owner = owner
                  self.balance = balance

              def deposit(self, amount):
                  if amount <= 0:
                      raise ValueError("Amount must be more than 0")
                  self.balance += amount

          acc = BankAccount("Priya", 500)
          try:
              acc.deposit(0)
          except ValueError as e:
              print("Refused:", e)
          print(acc.balance)
        `,
        tests: [
          { output: "Refused: Amount must be more than 0\n500" },
          { py: py`
              a = new("BankAccount", "Om", 100)
              for bad in [0, -5]:
                  try:
                      a.deposit(bad)
                      refused = False
                  except ValueError:
                      refused = True
                  assert refused, f"A deposit of {bad} should raise a ValueError."
              assert a.balance == 100, f"Refused deposits should not change the balance, but it is {a.balance}."
              method(a, "deposit", 1)
              assert a.balance == 101, f"A deposit of 1 is allowed. 100 plus 1 should be 101, but the balance is {a.balance}."
            ` },
        ],
        wrong: [py`
          class BankAccount:
              def __init__(self, owner, balance):
                  self.owner = owner
                  self.balance = balance

              def deposit(self, amount):
                  if amount < 0:
                      raise ValueError("Amount must be more than 0")
                  self.balance += amount

          acc = BankAccount("Priya", 500)
          try:
              acc.deposit(0)
          except ValueError as e:
              print("Refused:", e)
          print(acc.balance)
        `],
        hints: [
          md`If a deposit of 0 is still accepted, check the comparison: 0 itself must be refused.`,
          md`If a refused deposit still changes the balance, the check must come before the change.`,
          md`If a deposit of 1 is refused, your comparison refuses too much.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a metro card",
        task: md`
          Make a class «MetroCard». Its «__init__» takes «balance» and also sets «self.trips = 0». Add two methods:

          - «recharge(amount)» adds the amount to the balance.
          - «travel(fare)» raises «ValueError("Recharge first")» if the fare is more than the balance. Otherwise it takes the fare away and adds 1 to «trips».

          Then run this, so it prints the lines below:

          : card = MetroCard(50)
          : card.travel(30)
          : card.recharge(100)
          : card.travel(40)
          : print(card.balance, card.trips)

          | 80 2
        `,
        starter: py`

        `,
        solution: py`
          class MetroCard:
              def __init__(self, balance):
                  self.balance = balance
                  self.trips = 0

              def recharge(self, amount):
                  self.balance += amount

              def travel(self, fare):
                  if fare > self.balance:
                      raise ValueError("Recharge first")
                  self.balance -= fare
                  self.trips += 1

          card = MetroCard(50)
          card.travel(30)
          card.recharge(100)
          card.travel(40)
          print(card.balance, card.trips)
        `,
        tests: [
          { output: "80 2" },
          { py: py`
              c = new("MetroCard", 20)
              assert c.trips == 0, "A new card should start with 0 trips."
              try:
                  c.travel(21)
                  refused = False
              except ValueError:
                  refused = True
              assert refused, "A fare of 21 on a card with 20 should raise a ValueError."
              assert c.balance == 20 and c.trips == 0, f"A refused trip should change nothing, but the card shows balance {c.balance} and trips {c.trips}."
              method(c, "travel", 20)
              assert c.balance == 0 and c.trips == 1, f"A fare of exactly 20 is allowed. The card should show 0 and 1 trip, but shows {c.balance} and {c.trips}."
              method(c, "recharge", 15)
              method(c, "travel", 5)
              method(c, "travel", 10)
              assert c.balance == 0 and c.trips == 3, f"After a recharge of 15 and trips of 5 and 10, the card should show 0 and 3 trips, but shows {c.balance} and {c.trips}."
            ` },
        ],
        wrong: [py`
          class MetroCard:
              def __init__(self, balance):
                  self.balance = balance
                  self.trips = 0

              def recharge(self, amount):
                  self.balance += amount

              def travel(self, fare):
                  self.trips += 1
                  if fare > self.balance:
                      raise ValueError("Recharge first")
                  self.balance -= fare

          card = MetroCard(50)
          card.travel(30)
          card.recharge(100)
          card.travel(40)
          print(card.balance, card.trips)
        `, py`
          class MetroCard:
              def __init__(self, balance):
                  self.balance = balance
                  self.trips = 0

              def recharge(self, amount):
                  self.balance += amount

              def travel(self, fare):
                  if fare >= self.balance:
                      raise ValueError("Recharge first")
                  self.balance -= fare
                  self.trips += 1

          card = MetroCard(50)
          card.travel(30)
          card.recharge(100)
          card.travel(40)
          print(card.balance, card.trips)
        `],
        hints: [
          md`If a refused trip still counts as a trip, the count goes up before the check.`,
          md`If a fare equal to the whole balance is refused, check the comparison in «travel».`,
          md`If a hidden test says the trips are wrong for a new card, check that «__init__» sets them to 0.`,
        ],
      },
    ],
    keys: [
      md`A method can take values after «self», like «deposit(self, amount)».`,
      md`«self.balance += amount» changes the object. The change stays after the method ends.`,
      md`Refuse a bad change with «raise» inside the method. **Check first, then change.**`,
      md`«b = a» gives one object a second name. Only a call to the class builds a new object.`,
      md`To trace objects, keep each object's attributes on paper and update them after every call.`,
    ],
  });

  // ---------------------------------------------------------------- Day 95
  day({
    slug: "objects-print-clearly",
    title: "Objects That Print Clearly",
    goal: "Make print show a clear line for your objects, and sort a list of objects.",
    minutes: 40,
    needs: [67, 94],
    win: "Today you can now make your objects print clearly, and sort a list of objects by any attribute.",
    learn: [
      md`
        ## Printing an object

        When you print an object, Python does not know what to show. It shows the class name and a **memory address**: a long number that changes every run. Run this:
      `,
      ex(py`
        class Student:
            def __init__(self, name, marks):
                self.name = name
                self.marks = marks

        asha = Student("Asha", 82)
        print(asha)
      `),
      md`
        That is not useful. A special method called «__str__», with two underscores on each side, tells Python what text to show. It must **return** the text. Guess the output.
      `,
      ex(py`
        class Student:
            def __init__(self, name, marks):
                self.name = name
                self.marks = marks

            def __str__(self):
                return f"{self.name} ({self.marks} marks)"

        asha = Student("Asha", 82)
        print(asha)
        print("Topper: " + str(asha))
      `, { predict: ["Asha (82 marks)\nTopper: Asha (82 marks)", "Asha (82 marks)\nTopper: asha", "Student\nTopper: Asha (82 marks)"], answer: 0 }),
      md`
        «print(asha)» and «str(asha)» both call «__str__» for you. You never need to write «asha.__str__()» yourself.

        ## Return the text, do not print it

        A common mistake is to print inside «__str__». Guess how this program ends.
      `,
      ex(py`
        class Ticket:
            def __init__(self, city, fare):
                self.city = city
                self.fare = fare

            def __str__(self):
                print(f"{self.city}: Rs {self.fare}")

        t = Ticket("Agra", 450)
        print(t)
      `, { error: true, label: "A crash on purpose", predict: ["TypeError", "Agra: Rs 450", "None"], answer: 0 }),
      md`
        «__str__» printed the line, then gave back nothing: «None». Python needs text back, so it stops with TypeError. Inside «__str__», use «return», never «print».

        ## A list of objects

        A list does not use «__str__» for its items. It shows each item the way «repr» does (Day 48), so you see memory addresses again. To show a list of objects, loop and print each one. Sort them with «key», as on Day 67. Guess the output.
      `,
      ex(py`
        class Student:
            def __init__(self, name, marks):
                self.name = name
                self.marks = marks

            def __str__(self):
                return f"{self.name}: {self.marks}"

        group = [Student("Ravi", 67), Student("Meera", 91), Student("Asha", 82)]
        for s in sorted(group, key=lambda s: s.marks, reverse=True):
            print(s)
      `, { predict: ["Meera: 91\nAsha: 82\nRavi: 67", "Ravi: 67\nMeera: 91\nAsha: 82", "Ravi: 67\nAsha: 82\nMeera: 91"], answer: 0 }),
      tip(md`You may meet a method called «__repr__» in other people's code. It is the text a list shows for each item. For now, «__str__» and a loop are enough.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          class Greeting:
              def __str__(self):
                  return "Namaste"

          print(Greeting())
        `, options: ["Namaste", "Greeting", "None"], answer: 0,
        explain: md`«print» calls «__str__», which gives back «"Namaste"».`,
        why: [null, md`With a «__str__» method, Python shows its text, not the class name.`, md`«__str__» returns text, so there is no «None» here.`],
        skill: "trace" },
      { q: md`What does this method do?`, code: py`
          def __str__(self):
              return f"{self.name} owes Rs {self.amount}"
        `, options: ["It gives the text that print shows for one customer object", "It prints the customer's details as soon as the object is built", "It changes the customer's name"],
        answer: 0, verify: false, mono: false,
        explain: md`«__str__» builds the text that «print» and «str()» show for this object.`,
        why: [null, md`It runs only when the object is printed or turned into text, and it returns the text instead of printing it.`, md`It only reads the attributes. It changes nothing.`],
        skill: "read" },
      { q: md`«print(team)» stops with «TypeError: __str__ returned non-string (type NoneType)». What is wrong?`,
        options: ["«__str__» prints the text instead of returning it", "The class has no «__init__»", "print cannot show objects"],
        answer: 0, verify: false, mono: false,
        explain: md`A «__str__» without «return» gives back «None». Python needs text.`,
        why: [null, md`A missing «__init__» gives other errors. This one is about what «__str__» gave back.`, md`print can show objects. It needs «__str__» to return text.`],
        skill: "debug" },
      { q: md`Why does «print(group)», a list of Student objects, still show memory addresses?`,
        options: ["A list shows each item with repr, not with __str__", "__str__ works only inside a for loop", "The Student objects were never built"],
        answer: 0, verify: false, mono: false,
        explain: md`A list shows its items with «repr». Loop and print each item to use «__str__».`,
        why: [null, md`«__str__» works anywhere «print» or «str()» is used on the object itself.`, md`The objects exist: their addresses are shown.`],
        skill: "memory" },
      { q: md`You want Student objects in order of marks, highest first. Which line?`,
        options: ["«sorted(group, key=lambda s: s.marks, reverse=True)»", "«sorted(group)»", "«group.sort(reverse=True)»"], answer: 0, verify: false,
        explain: md`«key» tells «sorted» which attribute to compare.`,
        why: [null, md`Python cannot compare two Student objects by itself, so this stops with TypeError.`, md`This also tries to compare whole objects, and stops with TypeError.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: text made earlier",
        task: md`Answer each question without running the program.`,
        code: py`
          class Chai:
              def __init__(self, size, price):
                  self.size = size
                  self.price = price

              def __str__(self):
                  return f"{self.size} chai Rs {self.price}"

          c = Chai("Large", 20)
          text = str(c)
          c.price = 25
          print(text)
          print(c)
        `,
        ask: [{ line: 10, name: "text" }, { output: true }],
        hints: [
          md`«str(c)» runs «__str__» once and gives back text, using the price at that moment.`,
          md`Changing the price later does not change text that was already made.`,
          md`The first print shows the old text. The second print runs «__str__» again, with the new price.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: the points table",
        task: md`Answer the question without running the program.`,
        code: py`
          class Team:
              def __init__(self, name, points):
                  self.name = name
                  self.points = points

              def __str__(self):
                  return f"{self.name} {self.points}"

          teams = [Team("Delhi", 8), Team("Mumbai", 12), Team("Chennai", 8)]
          ranked = sorted(teams, key=lambda t: (-t.points, t.name))
          print(ranked[0])
          print(ranked[-1])
        `,
        ask: [{ output: true }],
        hints: [
          md`The key is a tuple: first the points with a minus sign, then the name. Tuples compare left to right (Day 67).`,
          md`The minus sign puts the most points first. Two teams with 8 points are then put A to Z.`,
          md`Mumbai comes first. Of Chennai and Delhi, Chennai comes first, so Delhi is last.`,
        ],
      },
      {
        id: "f1", kind: "fill", title: "Fill the gaps: a book that prints clearly",
        task: md`
          Fill the gaps so a Book prints its title and price. The program prints:

          | Lucent GK: Rs 350
        `,
        template: py`
          class Book:
              def __init__(self, title, price):
                  self.title = title
                  self.price = price

              def ⟦__str__⟧(self):
                  ⟦return⟧ f"{self.title}: Rs {self.price}"

          print(Book("Lucent GK", 350))
        `,
        tests: [
          { output: "Lucent GK: Rs 350" },
          { py: py`
              for title, price in [("Polity", 420), ("Maths", 199)]:
                  got = str(new("Book", title, price))
                  assert got == f"{title}: Rs {price}", f"str(Book('{title}', {price})) should be '{title}: Rs {price}', but it is {got!r}."
            ` },
        ],
        hints: [
          md`The special method that print uses has two underscores on each side of its name.`,
          md`Its name is str, with two underscores before and two after.`,
          md`The second gap is the word that gives the text back to Python, not print.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the ticket that will not print",
        task: md`
          The program should print:

          | Agra: Rs 450
          | Pune: Rs 820

          It prints the first line, then stops with TypeError. Tap the line that causes it, then fix it.
        `,
        starter: py`
          class Ticket:
              def __init__(self, city, fare):
                  self.city = city
                  self.fare = fare

              def __str__(self):
                  print(f"{self.city}: Rs {self.fare}")

          print(Ticket("Agra", 450))
          print(Ticket("Pune", 820))
        `,
        bugLines: [7],
        solution: py`
          class Ticket:
              def __init__(self, city, fare):
                  self.city = city
                  self.fare = fare

              def __str__(self):
                  return f"{self.city}: Rs {self.fare}"

          print(Ticket("Agra", 450))
          print(Ticket("Pune", 820))
        `,
        tests: [
          { output: "Agra: Rs 450\nPune: Rs 820" },
          { py: py`
              got = str(new("Ticket", "Goa", 999))
              assert got == "Goa: Rs 999", f"str(Ticket('Goa', 999)) should be 'Goa: Rs 999', but it is {got!r}."
            ` },
        ],
        wrong: [py`
          class Ticket:
              def __init__(self, city, fare):
                  self.city = city
                  self.fare = fare

              def __str__(self):
                  return "{self.city}: Rs {self.fare}"

          print(Ticket("Agra", 450))
          print(Ticket("Pune", 820))
        `],
        hints: [
          md`The error says «__str__» gave back «None». A method gives back «None» when it has no return line.`,
          md`Look at the only line inside «__str__». It shows the text, but does it give it back?`,
          md`If the text appears with curly brackets in it, the f before the quote is missing.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: cheapest first",
        task: md`
          This program prints the menu in the order it was written. Change the loop so the items come **cheapest first**. Keep «__str__» as it is. It should print:

          | Chai: Rs 12
          | Samosa: Rs 15
          | Vada pav: Rs 20
          | Bun maska: Rs 25
        `,
        starter: py`
          class Item:
              def __init__(self, name, price):
                  self.name = name
                  self.price = price

              def __str__(self):
                  return f"{self.name}: Rs {self.price}"

          menu = [Item("Vada pav", 20), Item("Bun maska", 25), Item("Chai", 12), Item("Samosa", 15)]
          for item in menu:
              print(item)
        `,
        solution: py`
          class Item:
              def __init__(self, name, price):
                  self.name = name
                  self.price = price

              def __str__(self):
                  return f"{self.name}: Rs {self.price}"

          menu = [Item("Vada pav", 20), Item("Bun maska", 25), Item("Chai", 12), Item("Samosa", 15)]
          for item in sorted(menu, key=lambda i: i.price):
              print(item)
        `,
        tests: [{ output: "Chai: Rs 12\nSamosa: Rs 15\nVada pav: Rs 20\nBun maska: Rs 25" }],
        wrong: [py`
          class Item:
              def __init__(self, name, price):
                  self.name = name
                  self.price = price

              def __str__(self):
                  return f"{self.name}: Rs {self.price}"

          menu = [Item("Vada pav", 20), Item("Bun maska", 25), Item("Chai", 12), Item("Samosa", 15)]
          for item in sorted(menu, key=lambda i: i.name):
              print(item)
        `],
        hints: [
          md`If the order does not change, the loop still goes through the menu as written.`,
          md`If the items come A to Z, the sort compares the names, not the prices.`,
          md`If it stops with TypeError, the sort is comparing whole objects. Give it a key that picks the price.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a results board",
        task: md`
          From a blank page, write a class «Student» built with a name and marks. Its «__str__» gives back text like «Asha: 82 (Pass)»: «Pass» for 33 marks or more, otherwise «Fail».

          Then print these students, highest marks first:

          : group = [Student("Ravi", 20), Student("Asha", 82), Student("Meera", 33)]

          It should print:

          | Asha: 82 (Pass)
          | Meera: 33 (Pass)
          | Ravi: 20 (Fail)
        `,
        starter: py``,
        solution: py`
          class Student:
              def __init__(self, name, marks):
                  self.name = name
                  self.marks = marks

              def __str__(self):
                  result = "Pass" if self.marks >= 33 else "Fail"
                  return f"{self.name}: {self.marks} ({result})"

          group = [Student("Ravi", 20), Student("Asha", 82), Student("Meera", 33)]
          for s in sorted(group, key=lambda s: s.marks, reverse=True):
              print(s)
        `,
        tests: [
          { output: "Asha: 82 (Pass)\nMeera: 33 (Pass)\nRavi: 20 (Fail)" },
          { py: py`
              for name, marks, result in [("Lata", 32, "Fail"), ("Om", 100, "Pass"), ("Zoya", 0, "Fail")]:
                  got = str(new("Student", name, marks))
                  assert got == f"{name}: {marks} ({result})", f"str(Student('{name}', {marks})) should be '{name}: {marks} ({result})', but it is {got!r}."
            ` },
        ],
        wrong: [py`
          class Student:
              def __init__(self, name, marks):
                  self.name = name
                  self.marks = marks

              def __str__(self):
                  result = "Pass" if self.marks > 33 else "Fail"
                  return f"{self.name}: {self.marks} ({result})"

          group = [Student("Ravi", 20), Student("Asha", 82), Student("Meera", 33)]
          for s in sorted(group, key=lambda s: s.marks, reverse=True):
              print(s)
        `],
        hints: [
          md`If Meera shows Fail, check the edge: exactly 33 marks is a Pass.`,
          md`If you see memory addresses, you printed the whole list, or «__str__» is missing or misspelt.`,
          md`If the order is wrong, sort with a key that picks the marks, and ask for the highest first.`,
        ],
      },
    ],
    keys: [
      md`«__str__(self)» gives back the text that «print» and «str()» show for an object.`,
      md`Inside «__str__», use «return», never «print». Without «return», print stops with TypeError.`,
      md`A list shows its items with «repr», not «__str__». Loop and print each object instead.`,
      md`Sort objects with a key: «sorted(group, key=lambda s: s.marks)».`,
    ],
  });

  // ---------------------------------------------------------------- Day 96
  day({
    slug: "objects-inside-objects",
    title: "Objects Inside Objects",
    goal: "Keep a list of objects inside another object, total them, and save them as JSON.",
    minutes: 45,
    needs: [81, 95],
    win: "Today you can now build an object that holds other objects, and save them all as JSON.",
    learn: [
      md`
        ## An object that holds other objects

        An attribute can hold a list, and the list can hold objects. A restaurant **Order** holds several **Item** objects. Guess the output.
      `,
      ex(py`
        class Item:
            def __init__(self, name, price, qty):
                self.name = name
                self.price = price
                self.qty = qty

            def cost(self):
                return self.price * self.qty

        class Order:
            def __init__(self, table):
                self.table = table
                self.items = []

            def add(self, item):
                self.items.append(item)

            def total(self):
                total = 0
                for item in self.items:
                    total += item.cost()
                return total

        order = Order(4)
        order.add(Item("Chai", 12, 2))
        order.add(Item("Samosa", 15, 3))
        print(len(order.items), order.total())
      `, { predict: ["2 69", "2 27", "5 69"], answer: 0 }),
      md`
        «self.items = []» in «__init__» gives each Order its own empty list. «add» puts an Item into it. «total» asks each Item for its cost and adds them up: 24 + 45 = 69. Press Step through and watch the list grow.
      `,
      pause(md`Good place for a break. Next: saving objects in a file.`),
      md`
        ## Objects cannot go into JSON directly

        «json.dumps» can save lists, dictionaries, text and numbers (Day 81). It cannot save your own objects. Guess what happens.
      `,
      ex(py`
        import json

        class Item:
            def __init__(self, name, price):
                self.name = name
                self.price = price

        print(json.dumps(Item("Chai", 12)))
      `, { error: true, label: "A crash on purpose", predict: ["TypeError", '{"name": "Chai", "price": 12}', "Item"], answer: 0 }),
      md`
        ## to_dict, and building objects back

        The fix: give the class a method «to_dict» that gives back a dictionary of its attributes. Save the dictionaries. To load, read each dictionary and build the object again. Guess the output.
      `,
      ex(py`
        import json

        class Item:
            def __init__(self, name, price):
                self.name = name
                self.price = price

            def to_dict(self):
                return {"name": self.name, "price": self.price}

        items = [Item("Chai", 12), Item("Samosa", 15)]
        text = json.dumps([i.to_dict() for i in items])
        print(text)

        back = [Item(d["name"], d["price"]) for d in json.loads(text)]
        print(back[1].name, back[1].price)
      `, { predict: ['[{"name": "Chai", "price": 12}, {"name": "Samosa", "price": 15}]\nSamosa 15', '[Item, Item]\nSamosa 15', '[{"name": "Chai", "price": 12}, {"name": "Samosa", "price": 15}]\nChai 12'], answer: 0 }),
      md`The objects went out as dictionaries and came back as objects. You will use this on Day 98 and in the capstone.`,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          class Bag:
              def __init__(self):
                  self.things = []

              def add(self, x):
                  self.things.append(x)

          a = Bag()
          b = Bag()
          a.add("pen")
          print(len(a.things), len(b.things))
        `, options: ["1 0", "1 1", "0 0"], answer: 0,
        explain: md`Each Bag gets its own list in «__init__». Only bag «a» got the pen.`,
        why: [null, md`«self.things = []» runs once for each new Bag, so the two lists are separate.`, md`«a.add("pen")» put one thing into «a».`],
        skill: "trace" },
      { q: md`What does this method do?`, code: py`
          def total(self):
              t = 0
              for item in self.items:
                  t += item.price * item.qty
              return t
        `, options: ["It gives back the cost of every item in the order, added together", "It gives back the number of items", "It prints each item's price"],
        answer: 0, verify: false, mono: false,
        explain: md`For each Item it adds price times quantity, then gives back the sum.`,
        why: [null, md`It adds money, not a count of items.`, md`It returns one total. It prints nothing.`],
        skill: "read" },
      { q: md`«json.dump(order, f)» stops with «TypeError: Object of type Order is not JSON serializable». What is the usual fix?`,
        options: ["Save «order.to_dict()», a dictionary built from its attributes", "Use «json.dumps» instead of «json.dump»", "Save the file with mode «a»"],
        answer: 0, verify: false, mono: false,
        explain: md`JSON knows dictionaries and lists, not your own objects. Turn the object into a dictionary first.`,
        why: [null, md`«dumps» has the same rule: it cannot take your own objects either.`, md`The mode does not matter. The object itself cannot be written as JSON.`],
        skill: "debug" },
      { q: md`Where should «self.items = []» go, so each order gets its own list?`,
        options: ["In «__init__»", "In every method that uses it", "Outside the class"], answer: 0, verify: false, mono: false,
        explain: md`«__init__» runs once for each new object, so each object gets its own new list.`,
        why: [null, md`That would empty the list every time a method runs.`, md`Outside the class, the list would not belong to any order.`],
        skill: "memory" },
      { q: md`A class must keep many Student objects. Which attribute fits?`,
        options: ["«self.students = []»", "«self.student = None»", "«self.students = 0»"], answer: 0, verify: false,
        explain: md`A list can hold any number of Student objects.`,
        why: [null, md`One name can hold only one student.`, md`A number can count students, but it cannot hold them.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: the classroom",
        task: md`Answer the question without running the program.`,
        code: py`
          class Student:
              def __init__(self, name, marks):
                  self.name = name
                  self.marks = marks

          class Classroom:
              def __init__(self):
                  self.students = []

              def add(self, student):
                  self.students.append(student)

              def top(self):
                  best = self.students[0]
                  for s in self.students:
                      if s.marks > best.marks:
                          best = s
                  return best.name

          room = Classroom()
          room.add(Student("Asha", 82))
          room.add(Student("Ravi", 91))
          room.add(Student("Meera", 76))
          print(len(room.students), room.top())
        `,
        ask: [{ output: true }],
        hints: [
          md`Count the calls to «add»: each one puts one Student into the list.`,
          md`«top» starts with the first student, then swaps in any student with more marks.`,
          md`Three students were added, and Ravi has the most marks.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: two wallets",
        task: md`Answer each question without running the program.`,
        code: py`
          class Wallet:
              def __init__(self):
                  self.notes = []

              def add(self, note):
                  self.notes.append(note)

              def total(self):
                  return sum(self.notes)

          w = Wallet()
          w.add(500)
          w.add(100)
          w2 = Wallet()
          w2.add(200)
          mine = w.total()
          print(mine, w2.total(), len(w.notes))
        `,
        ask: [{ line: 16, name: "mine" }, { output: true }],
        hints: [
          md`Each Wallet has its own list of notes.`,
          md`Wallet «w» got 500 and 100. Wallet «w2» got only 200.`,
          md`«mine» is the total of «w»: 600. «w» holds 2 notes.`,
        ],
      },
      {
        id: "f1", kind: "fill", title: "Fill the gaps: an order of dishes",
        task: md`
          Fill the gaps so each Order keeps its own list of dishes. The program prints:

          | 3 ['Chai', 'Vada pav']
        `,
        template: py`
          class Order:
              def __init__(self, table):
                  self.table = table
                  self.dishes = ⟦[]⟧

              def add(self, name):
                  self.⟦dishes⟧.⟦append⟧(name)

          o = Order(3)
          o.add("Chai")
          o.add("Vada pav")
          print(o.table, o.dishes)
        `,
        tests: [
          { output: "3 ['Chai', 'Vada pav']" },
          { py: py`
              a = new("Order", 1)
              b = new("Order", 2)
              method(a, "add", "Tea")
              assert b.dishes == [], f"Adding to one order changed another: the second order holds {b.dishes}. Each order needs its own list."
              assert a.dishes == ["Tea"], f"The first order should hold ['Tea'], but it holds {a.dishes}."
            ` },
        ],
        hints: [
          md`A new order starts with no dishes: an empty list.`,
          md`«add» puts the name onto the end of this order's own list.`,
          md`The list method that adds one item at the end is the same one you used on Day 23.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the bill that stops too soon",
        task: md`
          The program should print:

          | Total: 69

          It prints «Total: 24» instead. Tap the line that causes it, then fix it.
        `,
        starter: py`
          class Item:
              def __init__(self, name, price, qty):
                  self.name = name
                  self.price = price
                  self.qty = qty

              def cost(self):
                  return self.price * self.qty

          class Order:
              def __init__(self):
                  self.items = []

              def add(self, item):
                  self.items.append(item)

              def total(self):
                  total = 0
                  for item in self.items:
                      total += item.cost()
                      return total

          order = Order()
          order.add(Item("Chai", 12, 2))
          order.add(Item("Samosa", 15, 3))
          print("Total:", order.total())
        `,
        bugLines: [21],
        solution: py`
          class Item:
              def __init__(self, name, price, qty):
                  self.name = name
                  self.price = price
                  self.qty = qty

              def cost(self):
                  return self.price * self.qty

          class Order:
              def __init__(self):
                  self.items = []

              def add(self, item):
                  self.items.append(item)

              def total(self):
                  total = 0
                  for item in self.items:
                      total += item.cost()
                  return total

          order = Order()
          order.add(Item("Chai", 12, 2))
          order.add(Item("Samosa", 15, 3))
          print("Total:", order.total())
        `,
        tests: [
          { output: "Total: 69" },
          { py: py`
              o = new("Order")
              got = method(o, "total")
              assert got == 0, f"An empty order should total 0, but total() gave back {got}."
              for item in [new("Item", "A", 10, 1), new("Item", "B", 5, 2), new("Item", "C", 1, 3)]:
                  method(o, "add", item)
              got = method(o, "total")
              assert got == 23, f"Three items costing 10, 10 and 3 should total 23, but total() gave back {got}."
            ` },
        ],
        wrong: [py`
          class Item:
              def __init__(self, name, price, qty):
                  self.name = name
                  self.price = price
                  self.qty = qty

              def cost(self):
                  return self.price * self.qty

          class Order:
              def __init__(self):
                  self.items = []

              def add(self, item):
                  self.items.append(item)

              def total(self):
                  total = 0
                  for item in self.items:
                      total = item.cost()
                  return total

          order = Order()
          order.add(Item("Chai", 12, 2))
          order.add(Item("Samosa", 15, 3))
          print("Total:", order.total())
        `],
        hints: [
          md`24 is the cost of the first item only. The method stops after the first round of the loop.`,
          md`A return line inside the loop ends the whole method on its first round.`,
          md`The total should be given back after every item has been added.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: send a dish back",
        task: md`
          Add a method «remove(name)» to Order. It removes the **first** item with that name. If no item has that name, it does nothing. Then the program prints:

          | Total: 45
          | Total: 45
        `,
        starter: py`
          class Item:
              def __init__(self, name, price, qty):
                  self.name = name
                  self.price = price
                  self.qty = qty

              def cost(self):
                  return self.price * self.qty

          class Order:
              def __init__(self):
                  self.items = []

              def add(self, item):
                  self.items.append(item)

              def total(self):
                  return sum(item.cost() for item in self.items)

          order = Order()
          order.add(Item("Chai", 12, 2))
          order.add(Item("Samosa", 15, 3))
          print("Total:", order.total())
        `,
        solution: py`
          class Item:
              def __init__(self, name, price, qty):
                  self.name = name
                  self.price = price
                  self.qty = qty

              def cost(self):
                  return self.price * self.qty

          class Order:
              def __init__(self):
                  self.items = []

              def add(self, item):
                  self.items.append(item)

              def total(self):
                  return sum(item.cost() for item in self.items)

              def remove(self, name):
                  for item in self.items:
                      if item.name == name:
                          self.items.remove(item)
                          return

          order = Order()
          order.add(Item("Chai", 12, 2))
          order.add(Item("Samosa", 15, 3))
          order.remove("Chai")
          print("Total:", order.total())
          order.remove("Lassi")
          print("Total:", order.total())
        `,
        tests: [
          { output: "Total: 45\nTotal: 45" },
          { py: py`
              o = new("Order")
              for n in ["Tea", "Tea", "Bun"]:
                  method(o, "add", new("Item", n, 10, 1))
              method(o, "remove", "Tea")
              names = [i.name for i in o.items]
              assert names == ["Tea", "Bun"], f"remove('Tea') should take away only the first Tea, leaving ['Tea', 'Bun'], but the order holds {names}."
            ` },
        ],
        wrong: [py`
          class Item:
              def __init__(self, name, price, qty):
                  self.name = name
                  self.price = price
                  self.qty = qty

              def cost(self):
                  return self.price * self.qty

          class Order:
              def __init__(self):
                  self.items = []

              def add(self, item):
                  self.items.append(item)

              def total(self):
                  return sum(item.cost() for item in self.items)

              def remove(self, name):
                  self.items = [item for item in self.items if item.name != name]

          order = Order()
          order.add(Item("Chai", 12, 2))
          order.add(Item("Samosa", 15, 3))
          order.remove("Chai")
          print("Total:", order.total())
          order.remove("Lassi")
          print("Total:", order.total())
        `],
        hints: [
          md`If every item with that name disappears, the method keeps going after the first one.`,
          md`If a missing name crashes, the method removes something without checking the name first.`,
          md`Stop the method as soon as one item has been removed.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a bookshelf saved as JSON",
        task: md`
          From a blank page, write two classes:

          - «Book», built with a title and a price, with a method «to_dict()» that gives back «{"title": ..., "price": ...}».
          - «Shelf», which starts with an empty list of books. It has «add(book)» and «total()», the sum of the prices (0 for an empty shelf). It also has «to_json()», which gives back JSON text of the list of book dictionaries.

          Then run:

          : shelf = Shelf()
          : shelf.add(Book("Lucent GK", 350))
          : shelf.add(Book("Polity", 420))
          : print(shelf.total())
          : print(shelf.to_json())

          It should print:

          | 770
          | [{"title": "Lucent GK", "price": 350}, {"title": "Polity", "price": 420}]
        `,
        starter: py``,
        solution: py`
          import json

          class Book:
              def __init__(self, title, price):
                  self.title = title
                  self.price = price

              def to_dict(self):
                  return {"title": self.title, "price": self.price}

          class Shelf:
              def __init__(self):
                  self.books = []

              def add(self, book):
                  self.books.append(book)

              def total(self):
                  return sum(book.price for book in self.books)

              def to_json(self):
                  return json.dumps([book.to_dict() for book in self.books])

          shelf = Shelf()
          shelf.add(Book("Lucent GK", 350))
          shelf.add(Book("Polity", 420))
          print(shelf.total())
          print(shelf.to_json())
        `,
        tests: [
          { output: '770\n[{"title": "Lucent GK", "price": 350}, {"title": "Polity", "price": 420}]' },
          { py: py`
              import json
              s = new("Shelf")
              assert method(s, "total") == 0, "An empty shelf should total 0."
              assert json.loads(method(s, "to_json")) == [], "An empty shelf should give back the JSON text []."
              method(s, "add", new("Book", "Maths", 199))
              assert method(s, "total") == 199, "One book of 199 should total 199."
              back = json.loads(method(s, "to_json"))
              assert back == [{"title": "Maths", "price": 199}], f"to_json() should give back a list with one book dictionary, but it gave {back}."
              assert new("Book", "A", 5).to_dict() == {"title": "A", "price": 5}, "Book('A', 5).to_dict() should be {'title': 'A', 'price': 5}."
            ` },
        ],
        wrong: [py`
          import json

          class Book:
              def __init__(self, title, price):
                  self.title = title
                  self.price = price

              def to_dict(self):
                  return {"title": self.title, "price": self.price}

          class Shelf:
              books = []

              def add(self, book):
                  self.books.append(book)

              def total(self):
                  return sum(book.price for book in self.books)

              def to_json(self):
                  return json.dumps([book.to_dict() for book in self.books])

          shelf = Shelf()
          shelf.add(Book("Lucent GK", 350))
          shelf.add(Book("Polity", 420))
          print(shelf.total())
          print(shelf.to_json())
        `],
        hints: [
          md`If a new shelf already holds books, the list is not made fresh for each shelf. Make it in «__init__».`,
          md`If you get TypeError about JSON, you are saving Book objects. Save their dictionaries.`,
          md`If the JSON text looks different, check the key names: «title» and «price», in that order.`,
        ],
      },
    ],
    keys: [
      md`An attribute can hold a list of objects: «self.items = []» in «__init__», filled by a method like «add».`,
      md`To total across objects, loop over the list and ask each object, like «item.cost()».`,
      md`JSON cannot save your own objects. Give the class «to_dict()», and build objects back from the dictionaries.`,
      md`Make the list in «__init__», so each object gets its own list.`,
    ],
  });

  // ---------------------------------------------------------------- Day 97
  day({
    slug: "new-class-from-old",
    title: "A New Class from an Old One",
    goal: "Build a new class from an old one, keep its methods, and change only what is different.",
    minutes: 40,
    needs: [96],
    win: "Today you can now build a child class that inherits from a parent, and override just the part that is different.",
    learn: [
      md`
        ## A class built from another

        Sometimes a new class is an old class plus a little more. Write «class SeniorTicket(Ticket):». The new class is the **child**, and the old class is the **parent**. The child gets every method of the parent. This is called **inheritance**. Guess the output.
      `,
      ex(py`
        class Ticket:
            def __init__(self, name, fare):
                self.name = name
                self.fare = fare

            def price(self):
                return self.fare

            def show(self):
                return f"{self.name}: Rs {self.price()}"

        class SeniorTicket(Ticket):
            def price(self):
                return self.fare * 60 // 100

        print(Ticket("Ravi", 500).show())
        print(SeniorTicket("Kamla", 500).show())
      `, { predict: ["Ravi: Rs 500\nKamla: Rs 300", "Ravi: Rs 500\nKamla: Rs 500", "Ravi: Rs 500\nAttributeError"], answer: 0 }),
      md`
        «SeniorTicket» wrote no «__init__» and no «show». It **inherits** them from «Ticket». It writes its own «price», so its own «price» is used instead. This is called **overriding**. Notice that «show» calls «self.price()», so each ticket uses its own price.

        ## More data with super()

        A child may need more data than its parent. Its «__init__» first calls «super().__init__(...)». That runs the parent's «__init__», which stores the old data. Then the child stores the new data. Guess the output.
      `,
      ex(py`
        class Ticket:
            def __init__(self, name, fare):
                self.name = name
                self.fare = fare

            def price(self):
                return self.fare

        class ACTicket(Ticket):
            def __init__(self, name, fare, coach):
                super().__init__(name, fare)
                self.coach = coach

            def price(self):
                return self.fare + 200

        t = ACTicket("Meera", 900, "B2")
        print(t.name, t.coach, t.price())
      `, { predict: ["Meera B2 1100", "Meera B2 900", "B2 Meera 1100"], answer: 0 }),
      md`Without the «super()» line, the parent's «__init__» never runs. Guess what happens.`,
      ex(py`
        class Ticket:
            def __init__(self, name, fare):
                self.name = name
                self.fare = fare

        class ACTicket(Ticket):
            def __init__(self, name, fare, coach):
                self.coach = coach

        t = ACTicket("Meera", 900, "B2")
        print(t.name)
      `, { error: true, label: "A crash on purpose", predict: ["AttributeError", "Meera", "None"], answer: 0 }),
      md`
        ## When not to use inheritance

        Use inheritance only when the child **is a kind of** the parent: a senior ticket is a ticket. When one thing only **has** another, keep it as an attribute, as on Day 96. An order has items, but an item is not a kind of order.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          class A:
              def hello(self):
                  return "A"

          class B(A):
              pass

          print(B().hello())
        `, options: ["A", "B", "AttributeError"], answer: 0,
        explain: md`«B» has no «hello» of its own, so it uses the one it inherits from «A».`,
        why: [null, md`«hello» gives back the text «"A"», wherever it is called from.`, md`«B» inherits «hello», so the call works.`],
        skill: "trace" },
      { q: md`What does this class do?`, code: py`
          class HalfTicket(Ticket):
              def price(self):
                  return self.fare // 2
        `, options: ["It is a ticket whose price is half the fare, and everything else comes from Ticket", "It makes every Ticket half price", "It deletes the price method from Ticket"],
        answer: 0, verify: false, mono: false,
        explain: md`It overrides only «price». The parent «Ticket» is not changed.`,
        why: [null, md`Overriding changes the child only. A plain Ticket keeps its own price.`, md`Nothing is deleted. The child adds its own version.`],
        skill: "read" },
      { q: md`An ACTicket stops with «AttributeError: 'ACTicket' object has no attribute 'name'». Its «__init__» sets only «self.coach». What is missing?`,
        options: ["«super().__init__(name, fare)» at the start of its «__init__»", "A «__str__» method", "«class ACTicket(Ticket, Ticket):»"],
        answer: 0, verify: false, mono: false,
        explain: md`The child's «__init__» replaces the parent's. «super().__init__» runs the parent's, which stores «name» and «fare».`,
        why: [null, md`«__str__» only decides how the object prints.`, md`One parent is enough. The parent's «__init__» must be called.`],
        skill: "debug" },
      { q: md`What does **overriding** mean?`,
        options: ["The child writes its own method with the same name, and it is used instead of the parent's", "The child deletes a method from the parent", "The parent copies a method from the child"],
        answer: 0, verify: false, mono: false,
        explain: md`Same name in the child wins. The parent's version stays for the parent.`,
        why: [null, md`Nothing is deleted. The child's version is simply found first.`, md`It is the other way: the child gets the parent's methods.`],
        skill: "memory" },
      { q: md`An Order holds many Item objects. How should Order use Item?`,
        options: ["Order keeps a list of Item objects as an attribute", "«class Order(Item):»", "«class Item(Order):»"],
        answer: 0, verify: false, mono: false,
        explain: md`An order **has** items. It is not a kind of item, so this is not inheritance.`,
        why: [null, md`An order is not a kind of item. Use inheritance only for "is a kind of".`, md`An item is not a kind of order either.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: which sound?",
        task: md`Answer the question without running the program.`,
        code: py`
          class Animal:
              def sound(self):
                  return "..."

              def speak(self):
                  return "It says " + self.sound()

          class Cow(Animal):
              def sound(self):
                  return "moo"

          class Fish(Animal):
              pass

          print(Cow().speak())
          print(Fish().speak())
        `,
        ask: [{ output: true }],
        hints: [
          md`Both classes inherit «speak» from Animal. «speak» calls «self.sound()».`,
          md`Cow overrides «sound». Fish does not, so it uses Animal's.`,
          md`So the cow's line ends in moo, and the fish's line ends in three dots.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: a savings account",
        task: md`Answer each question without running the program.`,
        code: py`
          class Account:
              def __init__(self, owner, balance):
                  self.owner = owner
                  self.balance = balance

          class Savings(Account):
              def __init__(self, owner, balance, rate):
                  super().__init__(owner, balance)
                  self.rate = rate

              def interest(self):
                  return self.balance * self.rate // 100

          s = Savings("Asha", 5000, 4)
          gain = s.interest()
          print(s.owner, gain)
        `,
        ask: [{ line: 15, name: "gain" }, { output: true }],
        hints: [
          md`«super().__init__» stores the owner and the balance. Then the rate is stored.`,
          md`«interest» works out 4 percent of 5000 with whole-number division.`,
          md`5000 times 4 is 20000, and 20000 // 100 is 200.`,
        ],
      },
      {
        id: "f1", kind: "fill", title: "Fill the gaps: an e-book",
        task: md`
          Fill the gaps so «EBook» is a kind of «Book» with one extra attribute, its size in MB. The program prints:

          | Polity Notes 99 5
        `,
        template: py`
          class Book:
              def __init__(self, title, price):
                  self.title = title
                  self.price = price

          class EBook(⟦Book⟧):
              def __init__(self, title, price, size):
                  ⟦super⟧().__init__(title, price)
                  self.size = size

          e = EBook("Polity Notes", 99, 5)
          print(e.title, e.price, e.size)
        `,
        tests: [
          { output: "Polity Notes 99 5" },
          { py: py`
              EBook = need("EBook", "class")
              Book = need("Book", "class")
              assert issubclass(EBook, Book), "EBook should be built from Book: write the parent's name in the brackets."
              e = new("EBook", "Maths", 49, 2)
              assert (e.title, e.price, e.size) == ("Maths", 49, 2), "An EBook should keep its title, price and size."
            ` },
        ],
        hints: [
          md`The brackets after the child's name hold the parent's name.`,
          md`The child's «__init__» must first run the parent's «__init__».`,
          md`The word that reaches the parent is super, followed by round brackets.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the student fare that is not half",
        task: md`
          A student ticket costs half the fare. The program should print:

          | Ravi: Rs 200

          It prints «Ravi: Rs 400» instead. Tap the line that causes it, then fix it.
        `,
        starter: py`
          class Ticket:
              def __init__(self, name, fare):
                  self.name = name
                  self.fare = fare

              def price(self):
                  return self.fare

              def show(self):
                  return f"{self.name}: Rs {self.price()}"

          class StudentTicket(Ticket):
              def prices(self):
                  return self.fare // 2

          print(StudentTicket("Ravi", 400).show())
        `,
        bugLines: [13],
        solution: py`
          class Ticket:
              def __init__(self, name, fare):
                  self.name = name
                  self.fare = fare

              def price(self):
                  return self.fare

              def show(self):
                  return f"{self.name}: Rs {self.price()}"

          class StudentTicket(Ticket):
              def price(self):
                  return self.fare // 2

          print(StudentTicket("Ravi", 400).show())
        `,
        tests: [
          { output: "Ravi: Rs 200" },
          { py: py`
              t = new("StudentTicket", "Lata", 90)
              assert method(t, "price") == 45, "A student ticket for 90 should cost 45."
              plain = new("Ticket", "Om", 90)
              assert method(plain, "price") == 90, "A plain Ticket must keep its full fare."
            ` },
        ],
        wrong: [py`
          class Ticket:
              def __init__(self, name, fare):
                  self.name = name
                  self.fare = fare

              def price(self):
                  return self.fare // 2

              def show(self):
                  return f"{self.name}: Rs {self.price()}"

          class StudentTicket(Ticket):
              def prices(self):
                  return self.fare // 2

          print(StudentTicket("Ravi", 400).show())
        `],
        hints: [
          md`The child's method never runs. «show» asks for a method with a slightly different name.`,
          md`To override, the child's method must have exactly the same name as the parent's.`,
          md`Do not change the parent: a plain ticket must still cost the full fare.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: count the senior tickets",
        task: md`
          «isinstance(value, kind)» (Day 71) also works with your own classes: it is True for an object of that class, or of a child of it. Change the program so it also prints how many tickets are senior tickets:

          | Total: 1100
          | Senior tickets: 2
        `,
        starter: py`
          class Ticket:
              def __init__(self, name, fare):
                  self.name = name
                  self.fare = fare

              def price(self):
                  return self.fare

          class SeniorTicket(Ticket):
              def price(self):
                  return self.fare * 60 // 100

          tickets = [Ticket("Ravi", 500), SeniorTicket("Kamla", 500), SeniorTicket("Gopal", 500)]
          print("Total:", sum(t.price() for t in tickets))
        `,
        solution: py`
          class Ticket:
              def __init__(self, name, fare):
                  self.name = name
                  self.fare = fare

              def price(self):
                  return self.fare

          class SeniorTicket(Ticket):
              def price(self):
                  return self.fare * 60 // 100

          tickets = [Ticket("Ravi", 500), SeniorTicket("Kamla", 500), SeniorTicket("Gopal", 500)]
          print("Total:", sum(t.price() for t in tickets))
          seniors = 0
          for t in tickets:
              if isinstance(t, SeniorTicket):
                  seniors += 1
          print("Senior tickets:", seniors)
        `,
        tests: [{ output: "Total: 1100\nSenior tickets: 2" }, { uses: ["call:isinstance"] }],
        wrong: [py`
          class Ticket:
              def __init__(self, name, fare):
                  self.name = name
                  self.fare = fare

              def price(self):
                  return self.fare

          class SeniorTicket(Ticket):
              def price(self):
                  return self.fare * 60 // 100

          tickets = [Ticket("Ravi", 500), SeniorTicket("Kamla", 500), SeniorTicket("Gopal", 500)]
          print("Total:", sum(t.price() for t in tickets))
          seniors = 0
          for t in tickets:
              if isinstance(t, Ticket):
                  seniors += 1
          print("Senior tickets:", seniors)
        `],
        hints: [
          md`If every ticket counts, you are checking for the parent class. Every senior ticket is also a ticket.`,
          md`Check each ticket against the child class, and count the ones that match.`,
          md`Print the count after the loop, with the words Senior tickets and a colon.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a savings account",
        task: md`
          From a blank page, write:

          - «Account», built with an owner and a balance, with «deposit(amount)» and a «__str__» that gives back text like «Asha: Rs 500».
          - «Savings», a child of Account, built with an owner, a balance and a rate. Use «super().__init__». Add «add_interest()», which adds «balance * rate // 100» to the balance.

          Do not write «deposit» or «__str__» again in Savings: it inherits them. Then run:

          : s = Savings("Asha", 1000, 5)
          : s.deposit(1000)
          : s.add_interest()
          : print(s)

          It should print:

          | Asha: Rs 2100
        `,
        starter: py``,
        solution: py`
          class Account:
              def __init__(self, owner, balance):
                  self.owner = owner
                  self.balance = balance

              def deposit(self, amount):
                  self.balance += amount

              def __str__(self):
                  return f"{self.owner}: Rs {self.balance}"

          class Savings(Account):
              def __init__(self, owner, balance, rate):
                  super().__init__(owner, balance)
                  self.rate = rate

              def add_interest(self):
                  self.balance += self.balance * self.rate // 100

          s = Savings("Asha", 1000, 5)
          s.deposit(1000)
          s.add_interest()
          print(s)
        `,
        tests: [
          { output: "Asha: Rs 2100" },
          { py: py`
              Savings = need("Savings", "class")
              Account = need("Account", "class")
              assert issubclass(Savings, Account), "Savings should be built from Account."
              assert "deposit" not in vars(Savings) and "__str__" not in vars(Savings), "Savings should inherit deposit and __str__, not write them again."
              a = new("Account", "Ravi", 100)
              method(a, "deposit", 50)
              assert str(a) == "Ravi: Rs 150", f"An Account of 100 after a deposit of 50 should print 'Ravi: Rs 150', not {str(a)!r}."
              s = new("Savings", "Lata", 2000, 10)
              method(s, "add_interest")
              assert s.balance == 2200, f"10 percent interest on 2000 should make 2200, not {s.balance}."
              assert s.owner == "Lata", "A Savings account should keep its owner: call super().__init__."
            ` },
        ],
        wrong: [py`
          class Account:
              def __init__(self, owner, balance):
                  self.owner = owner
                  self.balance = balance

              def deposit(self, amount):
                  self.balance += amount

              def __str__(self):
                  return f"{self.owner}: Rs {self.balance}"

          class Savings(Account):
              def __init__(self, owner, balance, rate):
                  super().__init__(owner, balance)
                  self.rate = rate

              def add_interest(self):
                  self.balance = self.balance * self.rate // 100

          s = Savings("Asha", 1000, 5)
          s.deposit(1000)
          s.add_interest()
          print(s)
        `],
        hints: [
          md`If the owner is missing, the child's «__init__» does not run the parent's first.`,
          md`If the balance becomes tiny, the interest replaces the balance instead of being added to it.`,
          md`If a test says Savings writes deposit again, delete that copy: the child already has it.`,
        ],
      },
    ],
    keys: [
      md`«class Child(Parent):» builds a new class that inherits every method of the parent.`,
      md`**Overriding**: a method with the same name in the child is used instead of the parent's.`,
      md`A child with more data calls «super().__init__(...)» first, so the parent stores its part.`,
      md`Use inheritance only for "is a kind of". For "has", keep an attribute instead.`,
    ],
  });

  // ---------------------------------------------------------------- Day 98
  day({
    slug: "train-booking",
    title: "Project: Train Booking",
    goal: "Build a train with seats, a waiting list, cancelling and PNR lookup, then prove it with tests.",
    minutes: 50,
    kind: "project",
    needs: [73, 96],
    win: "Today you can now build a booking system from classes, with a waiting list that moves up fairly, and prove it with tests. This completes Level 8.",
    learn: [
      md`
        ## The booking counter

        A train has a fixed number of seats. When they are full, new passengers join a **waiting list**. When someone cancels, the **first** person on the waiting list gets the seat. Every booking gets a **PNR**, a number used to check its status later.

        You build this with two classes: «Passenger» and «Train». A Train keeps a list of booked passengers and a list of waiting ones, as on Day 96. Guess the output.
      `,
      ex(py`
        waiting = ["Meera", "Om", "Lata"]
        first = waiting.pop(0)
        print(first)
        print(waiting)
      `, { predict: ["Meera\n['Om', 'Lata']", "Lata\n['Meera', 'Om']", "Meera\n['Meera', 'Om', 'Lata']"], answer: 0 }),
      md`
        «pop(0)» takes the **first** item out of a list and gives it back. That is the fair way to serve a waiting list: first come, first served. Plain «pop()» would take the last person instead.

        ## Five stages

        Stage 1 books seats and refuses bad requests. Stage 2 adds the waiting list. Stage 3 cancels a booking and moves the next person up. Stage 4 adds PNR numbers and a status check. In Stage 5 you write tests that must catch 4 broken booking systems.

        Today teaches nothing new: you use classes (Days 92 to 97), «raise» (Day 71) and tests (Days 73 to 75). All names and train numbers are invented.
      `,
      pause(md`This project usually takes two sittings. Each stage saves when you pass it, so stop after any stage.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          booked = ["Asha", "Ravi"]
          waiting = ["Meera", "Om"]
          booked.remove("Ravi")
          booked.append(waiting.pop(0))
          print(booked, waiting)
        `, options: ["['Asha', 'Meera'] ['Om']", "['Asha', 'Om'] ['Meera']", "['Meera', 'Asha'] ['Om']"], answer: 0,
        explain: md`Ravi leaves. «pop(0)» takes Meera, the first in the waiting list, and «append» adds her at the end of «booked».`,
        why: [null, md`«pop(0)» takes the first item, Meera, not the last.`, md`«append» adds at the end, so Meera comes after Asha.`],
        skill: "trace" },
      { q: md`What does this method do?`, code: py`
          def cancel(self, name):
              for p in self.booked:
                  if p.name == name:
                      self.booked.remove(p)
                      if self.waiting:
                          self.booked.append(self.waiting.pop(0))
                      return
              raise ValueError(f"No booking for {name}")
        `, options: ["It removes a confirmed passenger and gives the seat to the first person waiting", "It removes every passenger with that name, and empties the waiting list", "It moves the last waiting passenger up, even when nobody cancels"],
        answer: 0, verify: false, mono: false,
        explain: md`It finds the passenger, removes them, and if anyone is waiting, the first one takes the seat. A name that is not booked raises ValueError.`,
        why: [null, md`«return» stops after the first match, and only one person leaves the waiting list.`, md`Nothing moves unless a booked passenger was found and removed.`],
        skill: "read" },
      { q: md`After a cancellation, the **last** person on the waiting list gets the seat, not the first. What is the most likely mistake?`,
        options: ["«pop()» was used where «pop(0)» was needed", "The waiting list should be a dictionary", "«append» should be «insert»"],
        answer: 0, verify: false, mono: false,
        explain: md`«pop()» takes the last item. «pop(0)» takes the first one, who has waited longest.`,
        why: [null, md`A list is right for a queue. The problem is which end it takes from.`, md`The seat goes into «booked» either way. The mistake is in who leaves the waiting list.`],
        skill: "debug" },
      { q: md`Why does «book» check the name and the age before it changes anything?`,
        options: ["So a refused booking leaves the train exactly as it was", "Because Python checks the newest data first", "So that refused passengers still get a PNR"],
        answer: 0, verify: false, mono: false,
        explain: md`Check first, then change (Day 94). Otherwise a bad request could take a seat or a PNR before it is refused.`,
        why: [null, md`The order is our choice, and checking first is the safe one.`, md`A refused booking should use no PNR at all.`],
        skill: "memory" },
      { q: md`Which keeps the waiting list in the order people booked?`,
        options: ["«a list: add with append, serve with pop(0)»", "«a set of names»", "«a single variable holding the last name»"], answer: 0, verify: false,
        explain: md`A list keeps order. Adding at the end and serving from the front gives first come, first served.`,
        why: [null, md`A set has no order, so you cannot tell who came first.`, md`One variable can hold only one person.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "s1", stage: 1, title: "Stage 1: book a seat, or refuse",
        task: md`
          Finish «book(name, age)» in the Train class:

          - If the name is empty or the age is 0 or less, «raise ValueError("Bad booking")» before changing anything.
          - If a seat is free, add a «Passenger» to «self.booked» and give back «"Confirmed"».
          - Otherwise, give back «"Full"».

          The program should print:

          | Confirmed
          | Confirmed
          | Full
          | Refused: Bad booking
        `,
        starter: py`
          class Passenger:
              def __init__(self, name, age):
                  self.name = name
                  self.age = age

          class Train:
              def __init__(self, number, seats):
                  self.number = number
                  self.seats = seats
                  self.booked = []

              def book(self, name, age):
                  # Refuse an empty name or an age of 0 or less: raise ValueError("Bad booking").
                  # If a seat is free, add a Passenger and give back "Confirmed". Otherwise "Full".
                  pass

          t = Train(12951, 2)
          print(t.book("Asha", 30))
          print(t.book("Ravi", 45))
          print(t.book("Meera", 28))
          try:
              t.book("", 20)
          except ValueError as e:
              print("Refused:", e)
        `,
        solution: py`
          class Passenger:
              def __init__(self, name, age):
                  self.name = name
                  self.age = age

          class Train:
              def __init__(self, number, seats):
                  self.number = number
                  self.seats = seats
                  self.booked = []

              def book(self, name, age):
                  if name == "" or age <= 0:
                      raise ValueError("Bad booking")
                  if len(self.booked) < self.seats:
                      self.booked.append(Passenger(name, age))
                      return "Confirmed"
                  return "Full"

          t = Train(12951, 2)
          print(t.book("Asha", 30))
          print(t.book("Ravi", 45))
          print(t.book("Meera", 28))
          try:
              t.book("", 20)
          except ValueError as e:
              print("Refused:", e)
        `,
        tests: [
          { output: "Confirmed\nConfirmed\nFull\nRefused: Bad booking" },
          { py: py`
              tr = new("Train", 101, 1)
              assert tr.book("A", 20) == "Confirmed", "The first booking on a 1-seat train should be Confirmed."
              assert tr.book("B", 20) == "Full", "The second booking on a 1-seat train should be Full."
              assert [p.name for p in tr.booked] == ["A"], "Only the confirmed passenger should be in booked."
              for name, age in [("C", 0), ("D", -3), ("", 30)]:
                  refused = False
                  try:
                      tr.book(name, age)
                  except ValueError:
                      refused = True
                  assert refused, f"book({name!r}, {age}) should raise ValueError."
              assert len(tr.booked) == 1, "A refused booking must not change the train."
            ` },
        ],
        wrong: [py`
          class Passenger:
              def __init__(self, name, age):
                  self.name = name
                  self.age = age

          class Train:
              def __init__(self, number, seats):
                  self.number = number
                  self.seats = seats
                  self.booked = []

              def book(self, name, age):
                  self.booked.append(Passenger(name, age))
                  if name == "" or age <= 0:
                      raise ValueError("Bad booking")
                  if len(self.booked) <= self.seats:
                      return "Confirmed"
                  return "Full"

          t = Train(12951, 2)
          print(t.book("Asha", 30))
          print(t.book("Ravi", 45))
          print(t.book("Meera", 28))
          try:
              t.book("", 20)
          except ValueError as e:
              print("Refused:", e)
        `],
        hints: [
          md`If a refused booking still changes the train, the check comes too late. Check first, then change.`,
          md`If the third booking is Confirmed, compare the number of booked passengers with the number of seats before adding.`,
          md`If nothing is printed for a booking, the method has no return line on that path.`,
        ],
      },
      {
        id: "s2", stage: 2, carry: "s1", title: "Stage 2: the waiting list",
        task: md`
          Add «self.waiting = []» in «__init__». When the train is full, add the passenger to the waiting list and give back their place, like «"Waiting 1"», instead of «"Full"». Add one more booking line, for Om, so the program prints:

          | Confirmed
          | Confirmed
          | Waiting 1
          | Waiting 2
          | Refused: Bad booking
        `,
        starter: py`
          class Passenger:
              def __init__(self, name, age):
                  self.name = name
                  self.age = age

          class Train:
              def __init__(self, number, seats):
                  self.number = number
                  self.seats = seats
                  self.booked = []

              def book(self, name, age):
                  if name == "" or age <= 0:
                      raise ValueError("Bad booking")
                  if len(self.booked) < self.seats:
                      self.booked.append(Passenger(name, age))
                      return "Confirmed"
                  return "Full"

          t = Train(12951, 2)
          print(t.book("Asha", 30))
          print(t.book("Ravi", 45))
          print(t.book("Meera", 28))
          try:
              t.book("", 20)
          except ValueError as e:
              print("Refused:", e)
        `,
        solution: py`
          class Passenger:
              def __init__(self, name, age):
                  self.name = name
                  self.age = age

          class Train:
              def __init__(self, number, seats):
                  self.number = number
                  self.seats = seats
                  self.booked = []
                  self.waiting = []

              def book(self, name, age):
                  if name == "" or age <= 0:
                      raise ValueError("Bad booking")
                  passenger = Passenger(name, age)
                  if len(self.booked) < self.seats:
                      self.booked.append(passenger)
                      return "Confirmed"
                  self.waiting.append(passenger)
                  return f"Waiting {len(self.waiting)}"

          t = Train(12951, 2)
          print(t.book("Asha", 30))
          print(t.book("Ravi", 45))
          print(t.book("Meera", 28))
          print(t.book("Om", 60))
          try:
              t.book("", 20)
          except ValueError as e:
              print("Refused:", e)
        `,
        tests: [
          { output: "Confirmed\nConfirmed\nWaiting 1\nWaiting 2\nRefused: Bad booking" },
          { py: py`
              tr = new("Train", 102, 1)
              got = [tr.book(n, 30) for n in ["A", "B", "C"]]
              assert got == ["Confirmed", "Waiting 1", "Waiting 2"], f"On a 1-seat train, three bookings should give Confirmed, Waiting 1, Waiting 2, but gave {got}."
              assert [p.name for p in tr.booked] == ["A"], "Only the first passenger should be booked."
              assert [p.name for p in tr.waiting] == ["B", "C"], "The waiting list should hold B, then C, in the order they booked."
            ` },
        ],
        wrong: [py`
          class Passenger:
              def __init__(self, name, age):
                  self.name = name
                  self.age = age

          class Train:
              def __init__(self, number, seats):
                  self.number = number
                  self.seats = seats
                  self.booked = []
                  self.waiting = []

              def book(self, name, age):
                  if name == "" or age <= 0:
                      raise ValueError("Bad booking")
                  passenger = Passenger(name, age)
                  if len(self.booked) < self.seats:
                      self.booked.append(passenger)
                      return "Confirmed"
                  self.waiting.insert(0, passenger)
                  return f"Waiting {len(self.waiting)}"

          t = Train(12951, 2)
          print(t.book("Asha", 30))
          print(t.book("Ravi", 45))
          print(t.book("Meera", 28))
          print(t.book("Om", 60))
          try:
              t.book("", 20)
          except ValueError as e:
              print("Refused:", e)
        `],
        hints: [
          md`If the waiting list is in the wrong order, new passengers are not added at the end.`,
          md`If the place is wrong, count the waiting list after adding the new passenger.`,
          md`If you see an AttributeError about waiting, the empty list is not made in «__init__».`,
        ],
      },
      {
        id: "s3", stage: 3, carry: "s2", title: "Stage 3: cancel, and move the next one up",
        task: md`
          Add «cancel(name)». It finds the confirmed passenger with that name and removes them. If anyone is waiting, the **first** person on the waiting list moves into «booked», and «cancel» gives back their name. If nobody is waiting, it gives back «None». If no confirmed passenger has that name, «raise ValueError(f"No booking for {name}")».

          Replace the lines under the classes with these:

          : t = Train(12951, 2)
          : for name, age in [("Asha", 30), ("Ravi", 45), ("Meera", 28), ("Om", 60)]:
          :     print(t.book(name, age))
          : print("Moved up:", t.cancel("Ravi"))
          : print([p.name for p in t.booked], [p.name for p in t.waiting])
          : try:
          :     t.cancel("Zoya")
          : except ValueError as e:
          :     print("Refused:", e)

          It should print:

          | Confirmed
          | Confirmed
          | Waiting 1
          | Waiting 2
          | Moved up: Meera
          | ['Asha', 'Meera'] ['Om']
          | Refused: No booking for Zoya
        `,
        starter: py`
          class Passenger:
              def __init__(self, name, age):
                  self.name = name
                  self.age = age

          class Train:
              def __init__(self, number, seats):
                  self.number = number
                  self.seats = seats
                  self.booked = []
                  self.waiting = []

              def book(self, name, age):
                  if name == "" or age <= 0:
                      raise ValueError("Bad booking")
                  passenger = Passenger(name, age)
                  if len(self.booked) < self.seats:
                      self.booked.append(passenger)
                      return "Confirmed"
                  self.waiting.append(passenger)
                  return f"Waiting {len(self.waiting)}"

          t = Train(12951, 2)
          print(t.book("Asha", 30))
          print(t.book("Ravi", 45))
          print(t.book("Meera", 28))
          print(t.book("Om", 60))
          try:
              t.book("", 20)
          except ValueError as e:
              print("Refused:", e)
        `,
        solution: py`
          class Passenger:
              def __init__(self, name, age):
                  self.name = name
                  self.age = age

          class Train:
              def __init__(self, number, seats):
                  self.number = number
                  self.seats = seats
                  self.booked = []
                  self.waiting = []

              def book(self, name, age):
                  if name == "" or age <= 0:
                      raise ValueError("Bad booking")
                  passenger = Passenger(name, age)
                  if len(self.booked) < self.seats:
                      self.booked.append(passenger)
                      return "Confirmed"
                  self.waiting.append(passenger)
                  return f"Waiting {len(self.waiting)}"

              def cancel(self, name):
                  for p in self.booked:
                      if p.name == name:
                          self.booked.remove(p)
                          if self.waiting:
                              moved = self.waiting.pop(0)
                              self.booked.append(moved)
                              return moved.name
                          return None
                  raise ValueError(f"No booking for {name}")

          t = Train(12951, 2)
          for name, age in [("Asha", 30), ("Ravi", 45), ("Meera", 28), ("Om", 60)]:
              print(t.book(name, age))
          print("Moved up:", t.cancel("Ravi"))
          print([p.name for p in t.booked], [p.name for p in t.waiting])
          try:
              t.cancel("Zoya")
          except ValueError as e:
              print("Refused:", e)
        `,
        tests: [
          { output: "Confirmed\nConfirmed\nWaiting 1\nWaiting 2\nMoved up: Meera\n['Asha', 'Meera'] ['Om']\nRefused: No booking for Zoya" },
          { py: py`
              tr = new("Train", 103, 1)
              for n in ["A", "B", "C"]:
                  tr.book(n, 30)
              assert tr.cancel("A") == "B", "Cancelling A should move B, the first waiting passenger, up."
              assert [p.name for p in tr.booked] == ["B"] and [p.name for p in tr.waiting] == ["C"], "After cancelling A, B should be booked and C still waiting."
              assert tr.cancel("B") == "C", "Cancelling B should move C up."
              assert tr.cancel("C") is None, "With nobody waiting, cancel should give back None."
              assert tr.booked == [] and tr.waiting == [], "After three cancellations the train should be empty."
              refused = False
              try:
                  tr.cancel("A")
              except ValueError:
                  refused = True
              assert refused, "Cancelling a name with no booking should raise ValueError."
            ` },
        ],
        wrong: [py`
          class Passenger:
              def __init__(self, name, age):
                  self.name = name
                  self.age = age

          class Train:
              def __init__(self, number, seats):
                  self.number = number
                  self.seats = seats
                  self.booked = []
                  self.waiting = []

              def book(self, name, age):
                  if name == "" or age <= 0:
                      raise ValueError("Bad booking")
                  passenger = Passenger(name, age)
                  if len(self.booked) < self.seats:
                      self.booked.append(passenger)
                      return "Confirmed"
                  self.waiting.append(passenger)
                  return f"Waiting {len(self.waiting)}"

              def cancel(self, name):
                  for p in self.booked:
                      if p.name == name:
                          self.booked.remove(p)
                          if self.waiting:
                              moved = self.waiting.pop()
                              self.booked.append(moved)
                              return moved.name
                          return None
                  raise ValueError(f"No booking for {name}")

          t = Train(12951, 2)
          for name, age in [("Asha", 30), ("Ravi", 45), ("Meera", 28), ("Om", 60)]:
              print(t.book(name, age))
          print("Moved up:", t.cancel("Ravi"))
          print([p.name for p in t.booked], [p.name for p in t.waiting])
          try:
              t.cancel("Zoya")
          except ValueError as e:
              print("Refused:", e)
        `],
        hints: [
          md`If Om moves up instead of Meera, the waiting list is served from the wrong end.`,
          md`If an unknown name gives no error, the raise line must come after the loop has checked everyone.`,
          md`If you see None when someone was waiting, give back the name of the passenger who moved up.`,
        ],
      },
      {
        id: "s4", stage: 4, carry: "s3", title: "Stage 4: PNR numbers",
        task: md`
          Every booking now gets a PNR, starting at 1001 and going up by 1. A refused booking gets none.

          - Give Passenger a third value, «pnr». The Train keeps «self.next_pnr = 1001».
          - «book» gives back text like «"PNR 1001: Confirmed"» or «"PNR 1003: Waiting 1"».
          - Add «status(pnr)»: «"Confirmed"», «"Waiting 2"» (the place in the waiting list), or «"Not found"».

          Replace the lines under the classes with these:

          : t = Train(12951, 2)
          : for name, age in [("Asha", 30), ("Ravi", 45), ("Meera", 28), ("Om", 60)]:
          :     print(t.book(name, age))
          : t.cancel("Ravi")
          : for pnr in [1001, 1002, 1003, 1004, 1999]:
          :     print(pnr, t.status(pnr))

          It should print:

          | PNR 1001: Confirmed
          | PNR 1002: Confirmed
          | PNR 1003: Waiting 1
          | PNR 1004: Waiting 2
          | 1001 Confirmed
          | 1002 Not found
          | 1003 Confirmed
          | 1004 Waiting 1
          | 1999 Not found
        `,
        starter: py`
          class Passenger:
              def __init__(self, name, age):
                  self.name = name
                  self.age = age

          class Train:
              def __init__(self, number, seats):
                  self.number = number
                  self.seats = seats
                  self.booked = []
                  self.waiting = []

              def book(self, name, age):
                  if name == "" or age <= 0:
                      raise ValueError("Bad booking")
                  passenger = Passenger(name, age)
                  if len(self.booked) < self.seats:
                      self.booked.append(passenger)
                      return "Confirmed"
                  self.waiting.append(passenger)
                  return f"Waiting {len(self.waiting)}"

              def cancel(self, name):
                  for p in self.booked:
                      if p.name == name:
                          self.booked.remove(p)
                          if self.waiting:
                              moved = self.waiting.pop(0)
                              self.booked.append(moved)
                              return moved.name
                          return None
                  raise ValueError(f"No booking for {name}")

          t = Train(12951, 2)
          for name, age in [("Asha", 30), ("Ravi", 45), ("Meera", 28), ("Om", 60)]:
              print(t.book(name, age))
          print("Moved up:", t.cancel("Ravi"))
          print([p.name for p in t.booked], [p.name for p in t.waiting])
          try:
              t.cancel("Zoya")
          except ValueError as e:
              print("Refused:", e)
        `,
        solution: py`
          class Passenger:
              def __init__(self, name, age, pnr):
                  self.name = name
                  self.age = age
                  self.pnr = pnr

          class Train:
              def __init__(self, number, seats):
                  self.number = number
                  self.seats = seats
                  self.booked = []
                  self.waiting = []
                  self.next_pnr = 1001

              def book(self, name, age):
                  if name == "" or age <= 0:
                      raise ValueError("Bad booking")
                  passenger = Passenger(name, age, self.next_pnr)
                  self.next_pnr += 1
                  if len(self.booked) < self.seats:
                      self.booked.append(passenger)
                      return f"PNR {passenger.pnr}: Confirmed"
                  self.waiting.append(passenger)
                  return f"PNR {passenger.pnr}: Waiting {len(self.waiting)}"

              def cancel(self, name):
                  for p in self.booked:
                      if p.name == name:
                          self.booked.remove(p)
                          if self.waiting:
                              moved = self.waiting.pop(0)
                              self.booked.append(moved)
                              return moved.name
                          return None
                  raise ValueError(f"No booking for {name}")

              def status(self, pnr):
                  for p in self.booked:
                      if p.pnr == pnr:
                          return "Confirmed"
                  for i, p in enumerate(self.waiting):
                      if p.pnr == pnr:
                          return f"Waiting {i + 1}"
                  return "Not found"

          t = Train(12951, 2)
          for name, age in [("Asha", 30), ("Ravi", 45), ("Meera", 28), ("Om", 60)]:
              print(t.book(name, age))
          t.cancel("Ravi")
          for pnr in [1001, 1002, 1003, 1004, 1999]:
              print(pnr, t.status(pnr))
        `,
        tests: [
          { output: "PNR 1001: Confirmed\nPNR 1002: Confirmed\nPNR 1003: Waiting 1\nPNR 1004: Waiting 2\n1001 Confirmed\n1002 Not found\n1003 Confirmed\n1004 Waiting 1\n1999 Not found" },
          { py: py`
              tr = new("Train", 104, 1)
              assert tr.book("A", 30) == "PNR 1001: Confirmed", "The first booking should be 'PNR 1001: Confirmed'."
              refused = False
              try:
                  tr.book("", 30)
              except ValueError:
                  refused = True
              assert refused, "An empty name should still raise ValueError."
              got = tr.book("B", 30)
              assert got == "PNR 1002: Waiting 1", f"A refused booking must not use up a PNR, so the next booking should be 'PNR 1002: Waiting 1', not {got!r}."
              tr.book("C", 30)
              assert tr.status(1003) == "Waiting 2", "C should be second on the waiting list."
              tr.cancel("A")
              assert tr.status(1002) == "Confirmed", "After A cancels, B should be Confirmed."
              assert tr.status(1003) == "Waiting 1", "After B moves up, C should be first on the waiting list."
              assert tr.status(1001) == "Not found", "A cancelled booking should be Not found."
            ` },
        ],
        wrong: [py`
          class Passenger:
              def __init__(self, name, age, pnr):
                  self.name = name
                  self.age = age
                  self.pnr = pnr

          class Train:
              def __init__(self, number, seats):
                  self.number = number
                  self.seats = seats
                  self.booked = []
                  self.waiting = []
                  self.next_pnr = 1001

              def book(self, name, age):
                  passenger = Passenger(name, age, self.next_pnr)
                  self.next_pnr += 1
                  if name == "" or age <= 0:
                      raise ValueError("Bad booking")
                  if len(self.booked) < self.seats:
                      self.booked.append(passenger)
                      return f"PNR {passenger.pnr}: Confirmed"
                  self.waiting.append(passenger)
                  return f"PNR {passenger.pnr}: Waiting {len(self.waiting)}"

              def cancel(self, name):
                  for p in self.booked:
                      if p.name == name:
                          self.booked.remove(p)
                          if self.waiting:
                              moved = self.waiting.pop(0)
                              self.booked.append(moved)
                              return moved.name
                          return None
                  raise ValueError(f"No booking for {name}")

              def status(self, pnr):
                  for p in self.booked:
                      if p.pnr == pnr:
                          return "Confirmed"
                  for i, p in enumerate(self.waiting):
                      if p.pnr == pnr:
                          return f"Waiting {i + 1}"
                  return "Not found"

          t = Train(12951, 2)
          for name, age in [("Asha", 30), ("Ravi", 45), ("Meera", 28), ("Om", 60)]:
              print(t.book(name, age))
          t.cancel("Ravi")
          for pnr in [1001, 1002, 1003, 1004, 1999]:
              print(pnr, t.status(pnr))
        `],
        hints: [
          md`If a refused booking uses up a PNR, the number is given out before the check. Check first, then give a number.`,
          md`If a waiting place is one too small, the first place in the list is position 0. People count from 1.`,
          md`If a cancelled PNR still shows Confirmed, status must look only at the passengers still in the two lists.`,
        ],
      },
      {
        id: "c1", stage: 5, kind: "catch", title: "Stage 5: catch 4 broken booking systems",
        task: md`
          The correct system is your Stage 4 Train. There are **4 secretly broken versions** of it. Each one gets the seats, the waiting list or the status a little wrong. Write asserts that pass on the correct Train and fail on every broken one.

          Build a small train in your asserts, book a few passengers, cancel one, and check «status» before and after. Work out each answer by hand first.
        `,
        target: py`
          class Passenger:
              def __init__(self, name, age, pnr):
                  self.name = name
                  self.age = age
                  self.pnr = pnr

          class Train:
              def __init__(self, number, seats):
                  self.number = number
                  self.seats = seats
                  self.booked = []
                  self.waiting = []
                  self.next_pnr = 1001

              def book(self, name, age):
                  if name == "" or age <= 0:
                      raise ValueError("Bad booking")
                  passenger = Passenger(name, age, self.next_pnr)
                  self.next_pnr += 1
                  if len(self.booked) < self.seats:
                      self.booked.append(passenger)
                      return f"PNR {passenger.pnr}: Confirmed"
                  self.waiting.append(passenger)
                  return f"PNR {passenger.pnr}: Waiting {len(self.waiting)}"

              def cancel(self, name):
                  for p in self.booked:
                      if p.name == name:
                          self.booked.remove(p)
                          if self.waiting:
                              moved = self.waiting.pop(0)
                              self.booked.append(moved)
                              return moved.name
                          return None
                  raise ValueError(f"No booking for {name}")

              def status(self, pnr):
                  for p in self.booked:
                      if p.pnr == pnr:
                          return "Confirmed"
                  for i, p in enumerate(self.waiting):
                      if p.pnr == pnr:
                          return f"Waiting {i + 1}"
                  return "Not found"
        `,
        broken: [
          // 1: serves the waiting list from the back. After A cancels (B, C waiting), C moves up, not B.
          py`
            class Passenger:
                def __init__(self, name, age, pnr):
                    self.name = name
                    self.age = age
                    self.pnr = pnr

            class Train:
                def __init__(self, number, seats):
                    self.number = number
                    self.seats = seats
                    self.booked = []
                    self.waiting = []
                    self.next_pnr = 1001

                def book(self, name, age):
                    if name == "" or age <= 0:
                        raise ValueError("Bad booking")
                    passenger = Passenger(name, age, self.next_pnr)
                    self.next_pnr += 1
                    if len(self.booked) < self.seats:
                        self.booked.append(passenger)
                        return f"PNR {passenger.pnr}: Confirmed"
                    self.waiting.append(passenger)
                    return f"PNR {passenger.pnr}: Waiting {len(self.waiting)}"

                def cancel(self, name):
                    for p in self.booked:
                        if p.name == name:
                            self.booked.remove(p)
                            if self.waiting:
                                moved = self.waiting.pop()
                                self.booked.append(moved)
                                return moved.name
                            return None
                    raise ValueError(f"No booking for {name}")

                def status(self, pnr):
                    for p in self.booked:
                        if p.pnr == pnr:
                            return "Confirmed"
                    for i, p in enumerate(self.waiting):
                        if p.pnr == pnr:
                            return f"Waiting {i + 1}"
                    return "Not found"
          `,
          // 2: books one seat too many. On a 1-seat train, the second booking is Confirmed.
          py`
            class Passenger:
                def __init__(self, name, age, pnr):
                    self.name = name
                    self.age = age
                    self.pnr = pnr

            class Train:
                def __init__(self, number, seats):
                    self.number = number
                    self.seats = seats
                    self.booked = []
                    self.waiting = []
                    self.next_pnr = 1001

                def book(self, name, age):
                    if name == "" or age <= 0:
                        raise ValueError("Bad booking")
                    passenger = Passenger(name, age, self.next_pnr)
                    self.next_pnr += 1
                    if len(self.booked) <= self.seats:
                        self.booked.append(passenger)
                        return f"PNR {passenger.pnr}: Confirmed"
                    self.waiting.append(passenger)
                    return f"PNR {passenger.pnr}: Waiting {len(self.waiting)}"

                def cancel(self, name):
                    for p in self.booked:
                        if p.name == name:
                            self.booked.remove(p)
                            if self.waiting:
                                moved = self.waiting.pop(0)
                                self.booked.append(moved)
                                return moved.name
                            return None
                    raise ValueError(f"No booking for {name}")

                def status(self, pnr):
                    for p in self.booked:
                        if p.pnr == pnr:
                            return "Confirmed"
                    for i, p in enumerate(self.waiting):
                        if p.pnr == pnr:
                            return f"Waiting {i + 1}"
                    return "Not found"
          `,
          // 3: counts waiting places from 0. The first person waiting shows "Waiting 0".
          py`
            class Passenger:
                def __init__(self, name, age, pnr):
                    self.name = name
                    self.age = age
                    self.pnr = pnr

            class Train:
                def __init__(self, number, seats):
                    self.number = number
                    self.seats = seats
                    self.booked = []
                    self.waiting = []
                    self.next_pnr = 1001

                def book(self, name, age):
                    if name == "" or age <= 0:
                        raise ValueError("Bad booking")
                    passenger = Passenger(name, age, self.next_pnr)
                    self.next_pnr += 1
                    if len(self.booked) < self.seats:
                        self.booked.append(passenger)
                        return f"PNR {passenger.pnr}: Confirmed"
                    self.waiting.append(passenger)
                    return f"PNR {passenger.pnr}: Waiting {len(self.waiting)}"

                def cancel(self, name):
                    for p in self.booked:
                        if p.name == name:
                            self.booked.remove(p)
                            if self.waiting:
                                moved = self.waiting.pop(0)
                                self.booked.append(moved)
                                return moved.name
                            return None
                    raise ValueError(f"No booking for {name}")

                def status(self, pnr):
                    for p in self.booked:
                        if p.pnr == pnr:
                            return "Confirmed"
                    for i, p in enumerate(self.waiting):
                        if p.pnr == pnr:
                            return f"Waiting {i}"
                    return "Not found"
          `,
          // 4: never moves anyone up. After A cancels, B is still waiting.
          py`
            class Passenger:
                def __init__(self, name, age, pnr):
                    self.name = name
                    self.age = age
                    self.pnr = pnr

            class Train:
                def __init__(self, number, seats):
                    self.number = number
                    self.seats = seats
                    self.booked = []
                    self.waiting = []
                    self.next_pnr = 1001

                def book(self, name, age):
                    if name == "" or age <= 0:
                        raise ValueError("Bad booking")
                    passenger = Passenger(name, age, self.next_pnr)
                    self.next_pnr += 1
                    if len(self.booked) < self.seats:
                        self.booked.append(passenger)
                        return f"PNR {passenger.pnr}: Confirmed"
                    self.waiting.append(passenger)
                    return f"PNR {passenger.pnr}: Waiting {len(self.waiting)}"

                def cancel(self, name):
                    for p in self.booked:
                        if p.name == name:
                            self.booked.remove(p)
                            return None
                    raise ValueError(f"No booking for {name}")

                def status(self, pnr):
                    for p in self.booked:
                        if p.pnr == pnr:
                            return "Confirmed"
                    for i, p in enumerate(self.waiting):
                        if p.pnr == pnr:
                            return f"Waiting {i + 1}"
                    return "Not found"
          `,
        ],
        starter: py`
          # Build a small train, book, cancel, and check status before and after.
          t = Train(101, 1)
          t.book("A", 30)
          assert t.status(1001) == "Confirmed"
        `,
        solution: py`
          t = Train(101, 1)
          t.book("A", 30)
          t.book("B", 30)
          t.book("C", 30)
          assert t.status(1002) == "Waiting 1"
          t.cancel("A")
          assert t.status(1002) == "Confirmed"
          assert t.status(1003) == "Waiting 1"
        `,
        hints: [
          md`A train with only 1 seat makes the waiting list appear quickly. Book three passengers on it.`,
          md`Check the status of the first waiting passenger before any cancellation. Then cancel the confirmed passenger and check again.`,
          md`After the cancellation, check both waiting passengers: who is confirmed now, and who is first in the queue?`,
        ],
      },
      {
        id: "d1", kind: "drill", title: "Laptop Mission: the booking counter on your laptop",
        task: md`
          This pretend Command Prompt is in your «python-days» folder. Type each command and press Enter.

          On a phone, you may skip this. Phone users are excused from the mission below.
        `,
        steps: [
          { say: md`Run your booking program. Type «python train.py» and press Enter.`,
            expect: ["python train.py", "py train.py"],
            output: "PNR 1001: Confirmed\nPNR 1002: Confirmed\nPNR 1003: Waiting 1\nPNR 1004: Waiting 2\n1001 Confirmed\n1002 Not found\n1003 Confirmed\n1004 Waiting 1\n1999 Not found" },
        ],
        mission: md`
          Now do it for real.

          1. In IDLE, make a new file with your Stage 4 program. Save it as «train.py» in «python-days».
          2. Run it with F5, and check the nine lines.
          3. Change the train to 3 seats, and run it again. The status of PNR 1004 is your receipt: write it in your notebook.
        `,
        hints: [
          md`Type the words in the grey box exactly, then press Enter.`,
          md`There is one space between the word python and the file name.`,
          md`If python does not work on your laptop, py does the same job.`,
        ],
      },
      {
        id: "twist", kind: "modify", carry: "s4", optional: true, noStep: true, title: "Own Twist: the reservation chart",
        task: md`
          Before a train leaves, the railway prints a **chart** of the confirmed passengers. Add «chart()», which gives back a list of lines like «"Seat 1: Asha (PNR 1001)"», one for each booked passenger, in the order they are in «booked». Then add these lines at the end of the program:

          : for line in t.chart():
          :     print(line)

          After Ravi cancels, the last two lines are:

          | Seat 1: Asha (PNR 1001)
          | Seat 2: Meera (PNR 1003)

          You may add your own idea too, such as a «seats_left()» method. The tests check the booking system and the chart, so your own idea is safe.
        `,
        starter: py`
          class Passenger:
              def __init__(self, name, age, pnr):
                  self.name = name
                  self.age = age
                  self.pnr = pnr

          class Train:
              def __init__(self, number, seats):
                  self.number = number
                  self.seats = seats
                  self.booked = []
                  self.waiting = []
                  self.next_pnr = 1001

              def book(self, name, age):
                  if name == "" or age <= 0:
                      raise ValueError("Bad booking")
                  passenger = Passenger(name, age, self.next_pnr)
                  self.next_pnr += 1
                  if len(self.booked) < self.seats:
                      self.booked.append(passenger)
                      return f"PNR {passenger.pnr}: Confirmed"
                  self.waiting.append(passenger)
                  return f"PNR {passenger.pnr}: Waiting {len(self.waiting)}"

              def cancel(self, name):
                  for p in self.booked:
                      if p.name == name:
                          self.booked.remove(p)
                          if self.waiting:
                              moved = self.waiting.pop(0)
                              self.booked.append(moved)
                              return moved.name
                          return None
                  raise ValueError(f"No booking for {name}")

              def status(self, pnr):
                  for p in self.booked:
                      if p.pnr == pnr:
                          return "Confirmed"
                  for i, p in enumerate(self.waiting):
                      if p.pnr == pnr:
                          return f"Waiting {i + 1}"
                  return "Not found"

          t = Train(12951, 2)
          for name, age in [("Asha", 30), ("Ravi", 45), ("Meera", 28), ("Om", 60)]:
              print(t.book(name, age))
          t.cancel("Ravi")
          for pnr in [1001, 1002, 1003, 1004, 1999]:
              print(pnr, t.status(pnr))
        `,
        solution: py`
          class Passenger:
              def __init__(self, name, age, pnr):
                  self.name = name
                  self.age = age
                  self.pnr = pnr

          class Train:
              def __init__(self, number, seats):
                  self.number = number
                  self.seats = seats
                  self.booked = []
                  self.waiting = []
                  self.next_pnr = 1001

              def book(self, name, age):
                  if name == "" or age <= 0:
                      raise ValueError("Bad booking")
                  passenger = Passenger(name, age, self.next_pnr)
                  self.next_pnr += 1
                  if len(self.booked) < self.seats:
                      self.booked.append(passenger)
                      return f"PNR {passenger.pnr}: Confirmed"
                  self.waiting.append(passenger)
                  return f"PNR {passenger.pnr}: Waiting {len(self.waiting)}"

              def cancel(self, name):
                  for p in self.booked:
                      if p.name == name:
                          self.booked.remove(p)
                          if self.waiting:
                              moved = self.waiting.pop(0)
                              self.booked.append(moved)
                              return moved.name
                          return None
                  raise ValueError(f"No booking for {name}")

              def status(self, pnr):
                  for p in self.booked:
                      if p.pnr == pnr:
                          return "Confirmed"
                  for i, p in enumerate(self.waiting):
                      if p.pnr == pnr:
                          return f"Waiting {i + 1}"
                  return "Not found"

              def chart(self):
                  lines = []
                  for seat, p in enumerate(self.booked, start=1):
                      lines.append(f"Seat {seat}: {p.name} (PNR {p.pnr})")
                  return lines

          t = Train(12951, 2)
          for name, age in [("Asha", 30), ("Ravi", 45), ("Meera", 28), ("Om", 60)]:
              print(t.book(name, age))
          t.cancel("Ravi")
          for pnr in [1001, 1002, 1003, 1004, 1999]:
              print(pnr, t.status(pnr))
          for line in t.chart():
              print(line)
        `,
        tests: [
          { py: py`
              assert LINES[-2:] == ["Seat 1: Asha (PNR 1001)", "Seat 2: Meera (PNR 1003)"], f"The last two lines should be the chart, but they are {LINES[-2:]}."
            ` },
          { py: py`
              tr = new("Train", 105, 2)
              assert method(tr, "chart") == [], "An empty train should give an empty chart."
              for n in ["Lata", "Om", "Zoya"]:
                  tr.book(n, 40)
              tr.cancel("Lata")
              got = method(tr, "chart")
              assert got == ["Seat 1: Om (PNR 1002)", "Seat 2: Zoya (PNR 1003)"], f"After Lata cancels, the chart should be Om then Zoya, but it is {got}."
              assert tr.status(1003) == "Confirmed", "The booking system should still work."
            ` },
        ],
        wrong: [py`
          class Passenger:
              def __init__(self, name, age, pnr):
                  self.name = name
                  self.age = age
                  self.pnr = pnr

          class Train:
              def __init__(self, number, seats):
                  self.number = number
                  self.seats = seats
                  self.booked = []
                  self.waiting = []
                  self.next_pnr = 1001

              def book(self, name, age):
                  if name == "" or age <= 0:
                      raise ValueError("Bad booking")
                  passenger = Passenger(name, age, self.next_pnr)
                  self.next_pnr += 1
                  if len(self.booked) < self.seats:
                      self.booked.append(passenger)
                      return f"PNR {passenger.pnr}: Confirmed"
                  self.waiting.append(passenger)
                  return f"PNR {passenger.pnr}: Waiting {len(self.waiting)}"

              def cancel(self, name):
                  for p in self.booked:
                      if p.name == name:
                          self.booked.remove(p)
                          if self.waiting:
                              moved = self.waiting.pop(0)
                              self.booked.append(moved)
                              return moved.name
                          return None
                  raise ValueError(f"No booking for {name}")

              def status(self, pnr):
                  for p in self.booked:
                      if p.pnr == pnr:
                          return "Confirmed"
                  for i, p in enumerate(self.waiting):
                      if p.pnr == pnr:
                          return f"Waiting {i + 1}"
                  return "Not found"

              def chart(self):
                  lines = []
                  for seat, p in enumerate(self.booked):
                      lines.append(f"Seat {seat}: {p.name} (PNR {p.pnr})")
                  return lines

          t = Train(12951, 2)
          for name, age in [("Asha", 30), ("Ravi", 45), ("Meera", 28), ("Om", 60)]:
              print(t.book(name, age))
          t.cancel("Ravi")
          for pnr in [1001, 1002, 1003, 1004, 1999]:
              print(pnr, t.status(pnr))
          for line in t.chart():
              print(line)
        `],
        hints: [
          md`If the first seat is Seat 0, the counting starts from 0. Seats are counted from 1.`,
          md`If the chart is empty, check that you go through the booked passengers, not the waiting ones.`,
          md`If the program stops with an AttributeError, check the spelling of the attribute names inside the line.`,
        ],
      },
    ],
    keys: [
      md`A waiting list is a list: add with «append», serve the first person with «pop(0)».`,
      md`Check first, then change: a refused booking must leave the train, and its PNR count, unchanged.`,
      md`A status check looks through the lists. A place in a list starts at 0; people count from 1.`,
      md`Tests for a system book, cancel and check the status before and after each change.`,
    ],
  });
})();
