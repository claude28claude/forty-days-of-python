// Week 17 - Better Classes (Days 113 to 119).
(function () {
  const { day, md, py, ex, code, tip, warn, ask, pause } = window.Course;

  // ---------------------------------------------------------------- Day 113
  day({
    slug: "objects-that-compare",
    title: "Objects That Compare",
    goal: "Give objects __eq__, __lt__ and __len__, so == and sorted work on them.",
    minutes: 45,
    needs: [95, 97],
    win: "Today you can now teach your objects to be equal, to sort themselves and to have a length.",
    learn: [
      md`
        ## When are two objects equal?

        Two tickets with the same PNR are the same booking. But Python does not know that. Guess the output.
      `,
      ex(py`
        class Ticket:
            def __init__(self, pnr, name):
                self.pnr = pnr
                self.name = name

        a = Ticket(1001, "Asha")
        b = Ticket(1001, "Asha")
        print(a == b, a is b)
      `, { predict: ["False False", "True False", "True True"], answer: 0 }),
      md`
        Without help, «==» on two objects asks the same question as «is»: is this the very same object? «a» and «b» are two objects, so the answer is False.

        ## __eq__: your own meaning of equal

        A method called «__eq__» tells Python what «==» means for your class. Here, two tickets are equal when their PNRs match. Guess the output.
      `,
      ex(py`
        class Ticket:
            def __init__(self, pnr, name):
                self.pnr = pnr
                self.name = name

            def __eq__(self, other):
                return self.pnr == other.pnr

        a = Ticket(1001, "Asha")
        b = Ticket(1001, "A. Rao")
        print(a == b, a == Ticket(1002, "Asha"))
      `, { predict: ["True False", "False False", "True True"], answer: 0 }),
      md`
        «a == b» calls «a.__eq__(b)». «in» and «.count()» on a list use «==» too, so now they find a ticket by its PNR.
      `,
      pause(md`Good place for a break. Next: objects that sort themselves, and objects with a length.`),
      md`
        ## __lt__: objects that sort themselves

        «sorted» compares items with «<». A method called «__lt__» (lt means less than) tells Python what «<» means. Then «sorted», «min» and «max» work with no key. «__repr__» is the text a list shows for each item (Day 95). Guess the output.
      `,
      ex(py`
        class Result:
            def __init__(self, name, marks):
                self.name = name
                self.marks = marks

            def __lt__(self, other):
                return self.marks < other.marks

            def __repr__(self):
                return f"Result('{self.name}', {self.marks})"

        scores = [Result("Asha", 72), Result("Ravi", 88), Result("Om", 65)]
        print(sorted(scores))
        print(max(scores).name)
      `, { predict: ["[Result('Om', 65), Result('Asha', 72), Result('Ravi', 88)]\nRavi", "[Result('Asha', 72), Result('Om', 65), Result('Ravi', 88)]\nRavi", "TypeError"], answer: 0 }),
      md`
        ## __len__: objects with a length

        A method called «__len__» gives «len()» its answer. It also decides True or False: an object whose length is 0 counts as False, like an empty list. Guess the output.
      `,
      ex(py`
        class Playlist:
            def __init__(self):
                self.songs = []

            def add(self, song):
                self.songs.append(song)

            def __len__(self):
                return len(self.songs)

        p = Playlist()
        p.add("Vande Mataram")
        p.add("Jana Gana Mana")
        print(len(p), bool(Playlist()))
      `, { predict: ["2 False", "2 True", "TypeError"], answer: 0 }),
      md`
        These methods with two underscores on each side are called **dunder methods** (double underscore). You never call them yourself: Python calls them when you use «==», «<» or «len».
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          class Name:
              def __init__(self, text):
                  self.text = text

              def __eq__(self, other):
                  return self.text.lower() == other.text.lower()

          print(Name("Asha") == Name("ASHA"), Name("Asha") in [Name("asha")])
        `, options: ["True True", "False False", "True False"], answer: 0,
        explain: md`«__eq__» compares the small-letter versions. «in» uses «==», so it finds the name too.`,
        why: [null, md`«__eq__» changes what «==» means, so the capitals no longer matter.`, md`«in» checks each item with «==», which now uses «__eq__».`],
        skill: "trace" },
      { q: md`What does this method let you do?`, code: py`
          def __lt__(self, other):
              return self.price < other.price
        `, options: ["Sort products by price with «sorted(products)», with no key", "Add two products together", "Check that two products have the same price"],
        answer: 0, verify: false, mono: false,
        explain: md`«sorted», «min» and «max» use «<», and «__lt__» tells them to compare prices.`,
        why: [null, md`Adding uses a different dunder method. «__lt__» is only «<».`, md`Being equal is «__eq__». «__lt__» is less than.`],
        skill: "read" },
      { q: md`«print(shelf)», a list of Book objects, shows «[<__main__.Book object at 0x...>]». The class has «__str__». What is missing?`,
        options: ["«__repr__», the text a list shows for each item", "«__len__»", "«__eq__»"], answer: 0, verify: false, mono: false,
        explain: md`A list shows its items with repr. «__str__» is only used when you print one object.`,
        why: [null, md`«__len__» gives a length. It does not change how the object is shown.`, md`«__eq__» is about «==», not about printing.`],
        skill: "debug" },
      { q: md`A class has no «__eq__». What does «==» compare for two of its objects?`,
        options: ["Whether they are the very same object, like «is»", "Every attribute, one by one", "Only the first attribute"], answer: 0, verify: false, mono: false,
        explain: md`Without «__eq__», two separate objects are never equal, even with the same values.`,
        why: [null, md`Python does not look inside the objects unless you write «__eq__».`, md`It does not look at attributes at all.`],
        skill: "memory" },
      { q: md`Every list of Result objects in your program should sort by marks, without writing a key each time. What do you do?`,
        options: ["Give Result a «__lt__» method that compares marks", "Give Result a «__len__» method", "Write «reverse=True» everywhere"], answer: 0, verify: false, mono: false,
        explain: md`With «__lt__», «sorted(results)» knows how to compare two Results.`,
        why: [null, md`«__len__» gives a length, not an order.`, md`Without a comparison, Python cannot sort the objects at all.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: a purse of coins",
        task: md`Answer each question without running the program.`,
        code: py`
          class Coin:
              def __init__(self, value):
                  self.value = value

              def __eq__(self, other):
                  return self.value == other.value

              def __lt__(self, other):
                  return self.value < other.value

          purse = [Coin(5), Coin(1), Coin(10), Coin(5)]
          smallest = min(purse).value
          fives = purse.count(Coin(5))
          print(smallest, fives, Coin(2) in purse)
        `,
        ask: [{ line: 12, name: "smallest" }, { line: 13, name: "fives" }, { output: true }],
        hints: [
          md`«min» uses «__lt__», so it finds the coin with the smallest value.`,
          md`«.count» uses «__eq__»: every coin worth 5 counts, even though they are different objects.`,
          md`No coin in the purse is worth 2.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: an empty queue",
        task: md`Answer each question without running the program.`,
        code: py`
          class Queue:
              def __init__(self):
                  self.people = []

              def __len__(self):
                  return len(self.people)

          q = Queue()
          empty = not q
          q.people.append("Asha")
          size = len(q)
          print(empty, size, bool(q))
        `,
        ask: [{ line: 9, name: "empty" }, { output: true }],
        hints: [
          md`An object with a length of 0 counts as False.`,
          md`«not q» is True while the queue is empty.`,
          md`After Asha joins, the length is 1, so the queue counts as True.`,
        ],
      },
      {
        id: "f1", kind: "fill", title: "Fill the gaps: cheapest first",
        task: md`
          Fill the gaps so «sorted(tickets)» puts the cheapest ticket first, with no key. The program prints:

          | ['Agra', 'Pune', 'Goa']
        `,
        template: py`
          class Ticket:
              def __init__(self, city, price):
                  self.city = city
                  self.price = price

              def ⟦__lt__⟧(self, other):
                  return self.price ⟦<⟧ other.price

          tickets = [Ticket("Pune", 820), Ticket("Agra", 450), Ticket("Goa", 1200)]
          print([t.city for t in sorted(tickets)])
        `,
        tests: [{ output: "['Agra', 'Pune', 'Goa']" }],
        hints: [
          md`If you see a TypeError about «<» not being supported, the method name is not the one «sorted» looks for.`,
          md`The method for «<» has «lt» in its name, with two underscores on each side.`,
          md`If the costliest comes first, the comparison sign points the wrong way.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the student who is never found",
        task: md`
          Two students are the same student when their roll numbers match. The program should print:

          | True 1

          It prints «False 0» instead. Tap the line that causes it, then fix it.
        `,
        starter: py`
          class Student:
              def __init__(self, roll, name):
                  self.roll = roll
                  self.name = name

              def __eq__(self, other):
                  return self is other

          register = [Student(101, "Asha"), Student(102, "Ravi")]
          late = Student(101, "Asha")
          print(late in register, register.count(Student(102, "Ravi")))
        `,
        bugLines: [7],
        solution: py`
          class Student:
              def __init__(self, roll, name):
                  self.roll = roll
                  self.name = name

              def __eq__(self, other):
                  return self.roll == other.roll

          register = [Student(101, "Asha"), Student(102, "Ravi")]
          late = Student(101, "Asha")
          print(late in register, register.count(Student(102, "Ravi")))
        `,
        tests: [
          { output: "True 1" },
          { py: py`
              a = new("Student", 5, "Asha")
              b = new("Student", 5, "A. Rao")
              assert a == b, "Two students with the same roll number should be equal, even if the names are written differently."
              assert not (a == new("Student", 6, "Asha")), "Students with different roll numbers should not be equal."
            ` },
        ],
        wrong: [py`
          class Student:
              def __init__(self, roll, name):
                  self.roll = roll
                  self.name = name

              def __eq__(self, other):
                  return self.name == other.name

          register = [Student(101, "Asha"), Student(102, "Ravi")]
          late = Student(101, "Asha")
          print(late in register, register.count(Student(102, "Ravi")))
        `],
        hints: [
          md`«in» and «.count» use «==». Ask what «__eq__» compares now.`,
          md`«is» is True only for the very same object, and «late» is a new object.`,
          md`If a test says the same roll with a different name should be equal, compare the roll numbers, not the names.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: a shelf that prints clearly",
        task: md`
          Printing the list shows memory addresses. Add a «__repr__» method to Book that gives back text like «Book('Polity', 420)». The program then prints:

          | [Book('Polity', 420), Book('Lucent GK', 350)]
        `,
        starter: py`
          class Book:
              def __init__(self, title, price):
                  self.title = title
                  self.price = price

              def __str__(self):
                  return f"{self.title}: Rs {self.price}"

          shelf = [Book("Polity", 420), Book("Lucent GK", 350)]
          print(shelf)
        `,
        solution: py`
          class Book:
              def __init__(self, title, price):
                  self.title = title
                  self.price = price

              def __str__(self):
                  return f"{self.title}: Rs {self.price}"

              def __repr__(self):
                  return f"Book('{self.title}', {self.price})"

          shelf = [Book("Polity", 420), Book("Lucent GK", 350)]
          print(shelf)
        `,
        tests: [{ output: "[Book('Polity', 420), Book('Lucent GK', 350)]" }],
        wrong: [py`
          class Book:
              def __init__(self, title, price):
                  self.title = title
                  self.price = price

              def __str__(self):
                  return f"Book('{self.title}', {self.price})"

          shelf = [Book("Polity", 420), Book("Lucent GK", 350)]
          print(shelf)
        `],
        hints: [
          md`If the list still shows addresses, the list does not use «__str__». It needs a different method.`,
          md`If the quotes around the title are missing, put them inside the text you give back.`,
          md`If you see TypeError about NoneType, the new method prints instead of giving the text back.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a merit list with no key",
        task: md`
          From a blank page, write a class «Candidate», built with a name, marks and an age. Give it a «__lt__» so that «sorted» puts candidates in merit order: **higher marks first**, and for equal marks the **younger** first. Then run these lines:

          : cands = [Candidate("Asha", 150, 24), Candidate("Ravi", 162, 26), Candidate("Meena", 150, 22)]
          : for c in sorted(cands):
          :     print(c.name, c.marks, c.age)

          It should print:

          | Ravi 162 26
          | Meena 150 22
          | Asha 150 24
        `,
        starter: py``,
        solution: py`
          class Candidate:
              def __init__(self, name, marks, age):
                  self.name = name
                  self.marks = marks
                  self.age = age

              def __lt__(self, other):
                  return (-self.marks, self.age) < (-other.marks, other.age)

          cands = [Candidate("Asha", 150, 24), Candidate("Ravi", 162, 26), Candidate("Meena", 150, 22)]
          for c in sorted(cands):
              print(c.name, c.marks, c.age)
        `,
        tests: [
          { output: "Ravi 162 26\nMeena 150 22\nAsha 150 24" },
          { py: py`
              a = new("Candidate", "A", 100, 20)
              b = new("Candidate", "B", 100, 25)
              c = new("Candidate", "C", 90, 18)
              assert a < b and not b < a, "With equal marks, the younger candidate should come first."
              assert b < c, "Higher marks should come first, whatever the age."
              assert sorted([c, b, a]) == [a, b, c], "sorted should give the candidates in merit order."
            ` },
        ],
        wrong: [py`
          class Candidate:
              def __init__(self, name, marks, age):
                  self.name = name
                  self.marks = marks
                  self.age = age

              def __lt__(self, other):
                  return self.marks > other.marks

          cands = [Candidate("Asha", 150, 24), Candidate("Ravi", 162, 26), Candidate("Meena", 150, 22)]
          for c in sorted(cands):
              print(c.name, c.marks, c.age)
        `, py`
          class Candidate:
              def __init__(self, name, marks, age):
                  self.name = name
                  self.marks = marks
                  self.age = age

              def __lt__(self, other):
                  return (self.marks, self.age) < (other.marks, other.age)

          cands = [Candidate("Asha", 150, 24), Candidate("Ravi", 162, 26), Candidate("Meena", 150, 22)]
          for c in sorted(cands):
              print(c.name, c.marks, c.age)
        `],
        hints: [
          md`If the lowest marks come first, «less than» must mean "comes first in merit": the one with more marks.`,
          md`If Asha comes before Meena, equal marks are not decided by age yet. Compare a tuple: marks first, then age.`,
          md`A minus sign in front of the marks puts the highest first. The age stays as it is, so the youngest wins a tie (Day 67).`,
        ],
      },
    ],
    keys: [
      md`«__eq__» decides what «==» means. «in» and «.count» use it too.`,
      md`«__lt__» decides what «<» means, so «sorted», «min» and «max» work with no key.`,
      md`«__len__» gives «len()» its answer; a length of 0 counts as False.`,
      md`«__repr__» is the text a list shows for each item. These are **dunder methods**: Python calls them for you.`,
    ],
  });

  // ---------------------------------------------------------------- Day 114
  day({
    slug: "properties",
    title: "Properties: Checking Values as They Are Set",
    goal: "Use @property so an object refuses a bad value the moment it is set.",
    minutes: 45,
    needs: [71, 94],
    win: "Today you can now make an object refuse a bad value the moment it is set, and give it values that are worked out on the fly.",
    learn: [
      md`
        ## Anyone can set a bad value

        On Day 94, «withdraw» refused to take the balance below zero. But nothing stops other code from setting the attribute straight. Guess the output.
      `,
      ex(py`
        class Account:
            def __init__(self, balance):
                self.balance = balance

        acc = Account(500)
        acc.balance = -900
        print(acc.balance)
      `, { predict: ["-900", "500", "ValueError"], answer: 0 }),
      md`
        ## A property with a setter

        A **property** looks like an attribute from outside, but a method runs every time it is read or set. «@property» marks the method that **reads** it. «@balance.setter» marks the method that runs when it is **set**, so it can check the value first. Guess what happens.
      `,
      ex(py`
        class Account:
            def __init__(self, balance):
                self.balance = balance

            @property
            def balance(self):
                return self._balance

            @balance.setter
            def balance(self, value):
                if value < 0:
                    raise ValueError("Balance cannot be below zero")
                self._balance = value

        acc = Account(500)
        acc.balance = 300
        print(acc.balance)
        acc.balance = -900
      `, { error: true, label: "A crash on purpose", predict: ["ValueError", "300\n-900", "-900"], answer: 0 }),
      md`
        It prints 300, then stops with ValueError at the last line. The real value is kept in «self._balance». Even «self.balance = balance» in «__init__» goes through the setter, so a new account is checked too. Press Step through to watch the setter run.
      `,
      pause(md`Good place for a break. Next: values worked out on the fly, and what the underscore means.`),
      md`
        ## A value worked out on the fly

        A property with no setter is a value that is **worked out** each time it is read. It is read with no brackets, like an attribute. Guess the output.
      `,
      ex(py`
        class Rectangle:
            def __init__(self, w, h):
                self.w = w
                self.h = h

            @property
            def area(self):
                return self.w * self.h

        r = Rectangle(3, 4)
        r.w = 10
        print(r.area)
      `, { predict: ["40", "12", "TypeError"], answer: 0 }),
      md`
        The area is never stored, so it can never be out of date. With no setter, «r.area = 5» stops with AttributeError.

        ## One leading underscore

        «_balance» starts with one underscore. To other programmers it says: "this is for inside the class only; use «balance»". Python does not stop anyone, so it is a polite rule, not a lock.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          class Score:
              def __init__(self, got, total):
                  self.got = got
                  self.total = total

              @property
              def percent(self):
                  return self.got * 100 // self.total

          s = Score(45, 60)
          s.got = 54
          print(s.percent)
        `, options: ["90", "75", "TypeError"], answer: 0,
        explain: md`The percent is worked out when it is read, from the new «got»: 54 × 100 // 60 is 90.`,
        why: [null, md`75 is the old score. A property is worked out again each time, so it uses 54.`, md`A property is read with no brackets, so this works.`],
        skill: "trace" },
      { q: md`What does this setter do?`, code: py`
          @name.setter
          def name(self, value):
              self._name = value.strip().title()
        `, options: ["It tidies the name every time it is set, before keeping it", "It refuses any name with spaces", "It prints the name"],
        answer: 0, verify: false, mono: false,
        explain: md`«p.name = "  asha rao "» keeps «"Asha Rao"».`,
        why: [null, md`Nothing is refused. The spaces at the ends are removed.`, md`There is no print. The tidy name is stored.`],
        skill: "read" },
      { q: md`«print(r.area())» stops with «TypeError: 'int' object is not callable». «area» is a property. What is the fix?`,
        options: ["Write «r.area» with no brackets", "Add a setter for area", "Rename area to _area"], answer: 0, verify: false, mono: false,
        explain: md`«r.area» already gives the number. The brackets then try to call that number.`,
        why: [null, md`A setter is for setting. This line only reads.`, md`The name is fine. The brackets are the problem.`],
        skill: "debug" },
      { q: md`What does the single underscore in «self._balance» tell other programmers?`,
        options: ["Use it only inside the class; Python does not stop you", "Python makes it impossible to read from outside", "It is a constant that never changes"], answer: 0, verify: false, mono: false,
        explain: md`It is a polite rule. Outside code should use the property «balance» instead.`,
        why: [null, md`Python does not lock it. You can still read it; you should not.`, md`Constants are written in CAPITALS.`],
        skill: "memory" },
      { q: md`A Student's marks must always be from 0 to 100, even when changed later with «s.marks = ...». What do you use?`,
        options: ["A property whose setter raises ValueError for a bad value", "A check in «__init__» only", "A comment that says 0 to 100"], answer: 0, verify: false, mono: false,
        explain: md`The setter runs on every change, including the one in «__init__».`,
        why: [null, md`A check in «__init__» misses every change made later.`, md`A comment does not stop anything.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: two temperatures",
        task: md`Answer each question without running the program.`,
        code: py`
          class Temperature:
              def __init__(self, celsius):
                  self.celsius = celsius

              @property
              def fahrenheit(self):
                  return self.celsius * 9 / 5 + 32

          t = Temperature(100)
          a = t.fahrenheit
          t.celsius = 0
          b = t.fahrenheit
          print(a, b)
        `,
        ask: [{ line: 10, name: "a" }, { line: 12, name: "b" }, { output: true }],
        hints: [
          md`The property is worked out each time it is read, from the celsius value at that moment.`,
          md`100 × 9 / 5 + 32 is 212.0. «/» always gives a decimal.`,
          md`After line 11, celsius is 0, so the second reading is 0 × 9 / 5 + 32.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: no debt allowed",
        task: md`Answer each question without running the program.`,
        code: py`
          class Wallet:
              def __init__(self, money):
                  self.money = money

              @property
              def money(self):
                  return self._money

              @money.setter
              def money(self, value):
                  if value < 0:
                      raise ValueError("No debt allowed")
                  self._money = value

          w = Wallet(100)
          try:
              w.money = w.money - 150
          except ValueError as e:
              print(e)
          print(w.money)
        `,
        ask: [{ line: 11, hit: 2, name: "value" }, { output: true }],
        hints: [
          md`The setter runs twice: once from «__init__», and once from line 17.`,
          md`The second time, the value is 100 − 150.`,
          md`The setter raises before it changes anything, so the wallet keeps its money.`,
        ],
      },
      {
        id: "f1", kind: "fill", title: "Fill the gaps: a full name",
        task: md`
          Fill the gaps so «full_name» is worked out each time it is read, with no brackets. The program prints:

          | Asha Iyer
        `,
        template: py`
          class Person:
              def __init__(self, first, last):
                  self.first = first
                  self.last = last

              ⟦@property⟧
              def full_name(self):
                  return f"{self.first} {self.last}"

          p = Person("Asha", "Rao")
          p.last = "Iyer"
          print(p.⟦full_name⟧)
        `,
        tests: [{ output: "Asha Iyer" }],
        hints: [
          md`If you see «<bound method ...>», the method is not marked as a property yet.`,
          md`The line above the def is an at sign and one word.`,
          md`The last gap is the name of the property, with no brackets.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: a mark that slips past the check",
        task: md`
          Marks must be from 0 to 100, so a new student with 150 marks should be refused. The program should print:

          | Refused: Marks must be from 0 to 100

          It prints «Asha 150» instead. Tap the line that causes it, then fix it.
        `,
        starter: py`
          class Student:
              def __init__(self, name, marks):
                  self.name = name
                  self._marks = marks

              @property
              def marks(self):
                  return self._marks

              @marks.setter
              def marks(self, value):
                  if not 0 <= value <= 100:
                      raise ValueError("Marks must be from 0 to 100")
                  self._marks = value

          try:
              s = Student("Asha", 150)
              print(s.name, s.marks)
          except ValueError as e:
              print("Refused:", e)
        `,
        bugLines: [4],
        solution: py`
          class Student:
              def __init__(self, name, marks):
                  self.name = name
                  self.marks = marks

              @property
              def marks(self):
                  return self._marks

              @marks.setter
              def marks(self, value):
                  if not 0 <= value <= 100:
                      raise ValueError("Marks must be from 0 to 100")
                  self._marks = value

          try:
              s = Student("Asha", 150)
              print(s.name, s.marks)
          except ValueError as e:
              print("Refused:", e)
        `,
        tests: [
          { output: "Refused: Marks must be from 0 to 100" },
          { py: py`
              S = need("Student", "class")
              assert S("B", 100).marks == 100 and S("C", 0).marks == 0, "0 and 100 are allowed marks."
              s = S("D", 50)
              refused = False
              try:
                  s.marks = 101
              except ValueError:
                  refused = True
              assert refused and s.marks == 50, "Setting 101 later should be refused too, and leave the marks at 50."
            ` },
        ],
        wrong: [py`
          class Student:
              def __init__(self, name, marks):
                  self.name = name
                  self.marks = marks

              @property
              def marks(self):
                  return self._marks

              @marks.setter
              def marks(self, value):
                  if not 0 < value < 100:
                      raise ValueError("Marks must be from 0 to 100")
                  self._marks = value

          try:
              s = Student("Asha", 150)
              print(s.name, s.marks)
          except ValueError as e:
              print("Refused:", e)
        `],
        hints: [
          md`The setter has the check, but does «__init__» go through the setter?`,
          md`Line 4 stores straight into «self._marks», so the check never runs for a new student.`,
          md`If a test says 0 or 100 is refused, the check leaves out the two ends. Both are allowed.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: a share with no brackets",
        task: md`
          Change «share» into a property, so it is read with no brackets. Change the last line to «print(b.share)». The output stays:

          | 312.5
        `,
        starter: py`
          class Bill:
              def __init__(self, amount, people):
                  self.amount = amount
                  self.people = people

              def share(self):
                  return round(self.amount / self.people, 2)

          b = Bill(1250, 4)
          print(b.share())
        `,
        solution: py`
          class Bill:
              def __init__(self, amount, people):
                  self.amount = amount
                  self.people = people

              @property
              def share(self):
                  return round(self.amount / self.people, 2)

          b = Bill(1250, 4)
          print(b.share)
        `,
        tests: [
          { output: "312.5" },
          { py: py`
              assert isinstance(need("Bill", "class").__dict__.get("share"), property), "share should be a property, marked with @property."
            ` },
        ],
        wrong: [py`
          class Bill:
              def __init__(self, amount, people):
                  self.amount = amount
                  self.people = people

              @property
              def share(self):
                  return round(self.amount / self.people, 2)

          b = Bill(1250, 4)
          print(b.share())
        `],
        hints: [
          md`If you see «<bound method ...>», share is not a property yet.`,
          md`If you see «TypeError: 'float' object is not callable», the last line still has brackets after share.`,
          md`If a test says share should be a property, the line above its def is missing.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a booking that checks its seats",
        task: md`
          From a blank page, write a class «Booking», built with a name and a number of seats.

          - «seats» is a property. Its setter raises «ValueError("Seats must be from 1 to 6")» for a number below 1 or above 6, and changes nothing.
          - «fare» is a property worked out on the fly: 450 rupees for each seat.

          Then run these lines:

          : b = Booking("Asha", 2)
          : print(b.name, b.seats, b.fare)
          : b.seats = 4
          : print(b.fare)
          : try:
          :     b.seats = 9
          : except ValueError as e:
          :     print("Refused:", e)
          : print(b.seats)

          It should print:

          | Asha 2 900
          | 1800
          | Refused: Seats must be from 1 to 6
          | 4
        `,
        starter: py``,
        solution: py`
          class Booking:
              def __init__(self, name, seats):
                  self.name = name
                  self.seats = seats

              @property
              def seats(self):
                  return self._seats

              @seats.setter
              def seats(self, value):
                  if not 1 <= value <= 6:
                      raise ValueError("Seats must be from 1 to 6")
                  self._seats = value

              @property
              def fare(self):
                  return self.seats * 450

          b = Booking("Asha", 2)
          print(b.name, b.seats, b.fare)
          b.seats = 4
          print(b.fare)
          try:
              b.seats = 9
          except ValueError as e:
              print("Refused:", e)
          print(b.seats)
        `,
        tests: [
          { output: "Asha 2 900\n1800\nRefused: Seats must be from 1 to 6\n4" },
          { py: py`
              Booking = need("Booking", "class")
              for bad in [0, 7, -1]:
                  refused = False
                  try:
                      Booking("X", bad)
                  except ValueError:
                      refused = True
                  assert refused, f"Booking('X', {bad}) should raise ValueError."
              b = new("Booking", "Y", 6)
              assert b.fare == 2700, f"6 seats should cost 2700, but fare is {b.fare}."
              b.seats = 1
              assert b.fare == 450, "After changing to 1 seat, the fare should be 450."
            ` },
        ],
        wrong: [py`
          class Booking:
              def __init__(self, name, seats):
                  self.name = name
                  self.seats = seats
                  self.fare = seats * 450

              @property
              def seats(self):
                  return self._seats

              @seats.setter
              def seats(self, value):
                  if not 1 <= value <= 6:
                      raise ValueError("Seats must be from 1 to 6")
                  self._seats = value

          b = Booking("Asha", 2)
          print(b.name, b.seats, b.fare)
          b.seats = 4
          print(b.fare)
          try:
              b.seats = 9
          except ValueError as e:
              print("Refused:", e)
          print(b.seats)
        `, py`
          class Booking:
              def __init__(self, name, seats):
                  self.name = name
                  self._seats = seats

              @property
              def seats(self):
                  return self._seats

              @seats.setter
              def seats(self, value):
                  if not 1 <= value <= 6:
                      raise ValueError("Seats must be from 1 to 6")
                  self._seats = value

              @property
              def fare(self):
                  return self.seats * 450

          b = Booking("Asha", 2)
          print(b.name, b.seats, b.fare)
          b.seats = 4
          print(b.fare)
          try:
              b.seats = 9
          except ValueError as e:
              print("Refused:", e)
          print(b.seats)
        `],
        hints: [
          md`If the fare stays 900 after the seats change, it was worked out once in «__init__». Make it a property, worked out when read.`,
          md`If «Booking("X", 0)» is accepted, «__init__» stores the seats without going through the setter. Set «self.seats» there.`,
          md`If you see RecursionError, the setter stores into «self.seats» instead of «self._seats».`,
        ],
      },
    ],
    keys: [
      md`«@property» makes a method that is read like an attribute, with no brackets.`,
      md`«@name.setter» runs on every «obj.name = value», so it can refuse a bad value with «raise».`,
      md`Keep the real value in «self._name». Storing into «self.name» inside the setter calls the setter forever.`,
      md`A property with no setter is worked out each time it is read, so it is never out of date.`,
      md`One leading underscore means "inside the class only". It is a polite rule, not a lock.`,
    ],
  });

  // ---------------------------------------------------------------- Day 115
  day({
    slug: "class-wide-values",
    title: "Class-Wide Values and Other Ways to Build Objects",
    goal: "Share a value across all objects, and build objects from saved data with @classmethod.",
    minutes: 45,
    needs: [96, 113],
    win: "Today you can now share one value across every object, count the objects made, and give a class extra ways to build objects.",
    learn: [
      md`
        ## One value for every object

        A **class attribute** is written inside the class, but outside every method. All the objects share that one value. Change it once, and every object sees the change. Guess the output.
      `,
      ex(py`
        class Ticket:
            gst = 5

            def __init__(self, fare):
                self.fare = fare

            def total(self):
                return self.fare + self.fare * Ticket.gst / 100

        a = Ticket(400)
        b = Ticket(1000)
        Ticket.gst = 12
        print(a.total(), b.total())
      `, { predict: ["448.0 1120.0", "420.0 1050.0", "448.0 1050.0"], answer: 0 }),
      md`
        «Ticket.gst» belongs to the class. The tax was changed once, and both tickets used the new rate.

        ## Counting the objects made

        A class attribute can count every object the class builds. Guess the output.
      `,
      ex(py`
        class Student:
            count = 0

            def __init__(self, name):
                self.name = name
                Student.count += 1

        Student("Asha")
        Student("Ravi")
        print(Student.count)
      `, { predict: ["2", "1", "0"], answer: 0 }),
      md`
        Write «Student.count += 1», with the class name. «self.count += 1» would make a separate «count» inside each object, and the class's count would stay 0.
      `,
      pause(md`Good place for a break. Next: other ways to build an object, and helpers that need no object.`),
      md`
        ## @classmethod: another way to build

        On Day 96 you built objects back from dictionaries. A **class method** can do that job inside the class. It is marked «@classmethod», and its first parameter, «cls», is the class itself. «cls(...)» builds a new object. Guess the output.
      `,
      ex(py`
        class Book:
            def __init__(self, title, price):
                self.title = title
                self.price = price

            @classmethod
            def from_dict(cls, d):
                return cls(d["title"], d["price"])

        b = Book.from_dict({"title": "Polity", "price": 420})
        print(b.title, b.price)
      `, { predict: ["Polity 420", "{'title': 'Polity', 'price': 420}", "TypeError"], answer: 0 }),
      md`
        It is called on the class, «Book.from_dict(...)», not on an object. A class can have several of these: «from_dict», «from_text», and so on.

        ## @staticmethod: a helper inside the class

        A **static method** needs neither the object nor the class. It is a plain function that lives in the class because it belongs with it. Guess the output.
      `,
      ex(py`
        class Marks:
            @staticmethod
            def is_valid(m):
                return 0 <= m <= 100

        print(Marks.is_valid(85), Marks.is_valid(120))
      `, { predict: ["True False", "False True", "TypeError"], answer: 0 }),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          class Counter:
              total = 0

              def __init__(self):
                  Counter.total += 1
                  self.number = Counter.total

          a = Counter()
          b = Counter()
          print(a.number, b.number, Counter.total)
        `, options: ["1 2 2", "1 1 2", "2 2 2"], answer: 0,
        explain: md`Each new object adds 1 to the shared total, then keeps the total at that moment as its own number.`,
        why: [null, md`The shared total is already 1 when «b» is built, so «b» gets 2.`, md`«a.number» was stored when «a» was built, when the total was 1.`],
        skill: "trace" },
      { q: md`What does this method do?`, code: py`
          @classmethod
          def from_text(cls, line):
              name, marks = line.split(",")
              return cls(name, int(marks))
        `, options: ["It builds a new object from a line of text like «Asha,82»", "It turns an object into text", "It checks that a line is valid"],
        answer: 0, verify: false, mono: false,
        explain: md`It splits the line, turns the marks into a number, and builds an object with «cls(...)».`,
        why: [null, md`It goes the other way: from text to an object.`, md`It refuses nothing. A bad line would crash in «split» or «int».`],
        skill: "read" },
      { q: md`After three students are made, «Student.count» is still 0. «__init__» has «self.count += 1». What is the fix?`,
        options: ["Write «Student.count += 1»", "Move «count = 0» into «__init__»", "Make count a property"], answer: 0, verify: false, mono: false,
        explain: md`«self.count += 1» makes each object its own count. The class's count must be changed through the class.`,
        why: [null, md`That starts the count again for every object, so it can never go above 1.`, md`A property does not change who owns the count.`],
        skill: "debug" },
      { q: md`What is the first parameter of a method marked «@classmethod»?`,
        options: ["The class itself, usually named «cls»", "The object, named «self»", "Nothing: it has no first parameter"], answer: 0, verify: false, mono: false,
        explain: md`Python passes the class in, so the method can build new objects with «cls(...)».`,
        why: [null, md`«self» is for normal methods, which work on one object.`, md`That describes a static method.`],
        skill: "memory" },
      { q: md`A method only checks that a roll number has 5 digits. It needs neither an object nor the class. Which kind is it?`,
        options: ["«@staticmethod»", "«@classmethod»", "«@property»"], answer: 0, verify: false,
        explain: md`A static method is a plain function kept inside the class.`,
        why: [null, md`A class method gets the class, which this check does not need.`, md`A property is read like an attribute of one object.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: whose discount?",
        task: md`Answer the question without running the program. Line 9 gives «b» an attribute of its own.`,
        code: py`
          class Shop:
              discount = 10

              def __init__(self, name):
                  self.name = name

          a = Shop("Chai Point")
          b = Shop("Vada Hub")
          b.discount = 25
          Shop.discount = 15
          print(a.discount, b.discount, Shop.discount)
        `,
        ask: [{ output: true }],
        hints: [
          md`«a» has no discount of its own, so it reads the class's discount.`,
          md`Line 9 gives «b» its own discount. Its own value is found first.`,
          md`Line 10 changes the class's value, which «a» and the class share.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: items from a list",
        task: md`Answer each question without running the program.`,
        code: py`
          class Item:
              made = 0

              def __init__(self, name, price):
                  self.name = name
                  self.price = price
                  Item.made += 1

              @classmethod
              def from_dict(cls, d):
                  return cls(d["name"], d["price"])

          rows = [{"name": "chai", "price": 15}, {"name": "vada", "price": 20}]
          items = [Item.from_dict(r) for r in rows]
          cheap = Item("bun", 10)
          print(Item.made, sum(i.price for i in items))
        `,
        ask: [{ line: 7, hit: 2, name: "price" }, { output: true }],
        hints: [
          md`«from_dict» calls «cls(...)», which runs «__init__». So line 7 runs for each row, and once more for the bun.`,
          md`The second time line 7 runs, it is building the vada.`,
          md`Three items were made in all, but only the two in «items» are added up.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: a PIN check inside the class",
        task: md`
          Put the lines in order. «Pin.valid» is a static method: it needs no object. The program prints:

          | True False
        `,
        solution: py`
          class Pin:
              @staticmethod
              def valid(code):
                  return len(code) == 6 and code.isdigit()
          print(Pin.valid("110001"), Pin.valid("11001"))
        `,
        distractors: ["    def valid(self, code):"],
        tests: [{ output: "True False" }],
        hints: [
          md`If you see a TypeError about a missing argument, the method takes «self», but it is called on the class with one value.`,
          md`The «@staticmethod» line goes straight above the def it marks.`,
          md`The print line is outside the class, with no indent.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: nobody visited today",
        task: md`
          The program counts the visitors typed. For «Asha Ravi Om» it should print:

          | Visitors today: 3

          It prints «Visitors today: 0» instead. Tap the line that causes it, then fix it.
        `,
        starter: py`
          class Visitor:
              count = 0

              def __init__(self, name):
                  self.name = name
                  self.count += 1

          for name in input("Visitors: ").split():
              Visitor(name)
          print("Visitors today:", Visitor.count)
        `,
        bugLines: [6],
        solution: py`
          class Visitor:
              count = 0

              def __init__(self, name):
                  self.name = name
                  Visitor.count += 1

          for name in input("Visitors: ").split():
              Visitor(name)
          print("Visitors today:", Visitor.count)
        `,
        tests: [
          { inputs: ["Asha Ravi Om"], output: "Visitors today: 3" },
          { inputs: ["Zoya"], output: "Visitors today: 1" },
          { inputs: [""], output: "Visitors today: 0" },
        ],
        wrong: [py`
          class Visitor:
              count = 0

              def __init__(self, name):
                  self.name = name
                  count = Visitor.count + 1

          for name in input("Visitors: ").split():
              Visitor(name)
          print("Visitors today:", Visitor.count)
        `],
        hints: [
          md`The class's count never changes. Which count does line 6 change?`,
          md`«self.count += 1» gives each visitor a count of its own, and leaves the class's count at 0.`,
          md`If the count is still 0, the new value is stored in a local name. It must be stored on the class.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: build from text",
        task: md`
          The main program splits each line itself. Move that work into the class: add a class method «from_text(cls, line)» that builds a Student from a line like «"Asha,82"». Then build each student with «Student.from_text(line)». The output stays:

          | Asha 82
          | Ravi 67
        `,
        starter: py`
          class Student:
              def __init__(self, name, marks):
                  self.name = name
                  self.marks = marks

          for line in ["Asha,82", "Ravi,67"]:
              name, marks = line.split(",")
              s = Student(name, int(marks))
              print(s.name, s.marks)
        `,
        solution: py`
          class Student:
              def __init__(self, name, marks):
                  self.name = name
                  self.marks = marks

              @classmethod
              def from_text(cls, line):
                  name, marks = line.split(",")
                  return cls(name, int(marks))

          for line in ["Asha,82", "Ravi,67"]:
              s = Student.from_text(line)
              print(s.name, s.marks)
        `,
        tests: [
          { output: "Asha 82\nRavi 67" },
          { py: py`
              s = need("Student", "class").from_text("Om,40")
              assert s.name == "Om" and s.marks == 40, "Student.from_text('Om,40') should build a student named Om with 40 marks, as a whole number."
            ` },
        ],
        wrong: [py`
          class Student:
              def __init__(self, name, marks):
                  self.name = name
                  self.marks = marks

              @classmethod
              def from_text(cls, line):
                  name, marks = line.split(",")
                  return cls(name, marks)

          for line in ["Asha,82", "Ravi,67"]:
              s = Student.from_text(line)
              print(s.name, s.marks)
        `],
        hints: [
          md`If a test says the marks should be a whole number, the class method keeps them as text.`,
          md`If you see AttributeError for from_text, the method is not inside the class, or not named exactly that.`,
          md`If you see a TypeError about a missing argument, the «@classmethod» line is missing, so «line» lands in «cls».`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: tickets with a shared rate",
        task: md`
          From a blank page, write a class «Ticket»:

          - a class attribute «rate_per_km = 2»
          - «Ticket(name, km)», and a method «fare()» that gives back «km» times the class's rate
          - a class method «from_text(line)» that builds a Ticket from text like «"Asha,150"»
          - a static method «valid_km(km)», True for 1 to 5000 km

          Ask for tickets on one line, separated by «;». For each one, build it with «from_text». If its km is not valid, print «Skipped:» and the name. Otherwise print the name and the fare. Then set the class's rate to 3 and print the total fare of the valid tickets. For «Asha,150;Ravi,0;Meena,300» it shows:

          | Asha 300
          | Skipped: Ravi
          | Meena 600
          | Total at new rate: 1350
        `,
        starter: py``,
        solution: py`
          class Ticket:
              rate_per_km = 2

              def __init__(self, name, km):
                  self.name = name
                  self.km = km

              def fare(self):
                  return self.km * Ticket.rate_per_km

              @classmethod
              def from_text(cls, line):
                  name, km = line.split(",")
                  return cls(name, int(km))

              @staticmethod
              def valid_km(km):
                  return 1 <= km <= 5000

          good = []
          for line in input("Tickets: ").split(";"):
              t = Ticket.from_text(line)
              if not Ticket.valid_km(t.km):
                  print("Skipped:", t.name)
                  continue
              print(t.name, t.fare())
              good.append(t)
          Ticket.rate_per_km = 3
          print("Total at new rate:", sum(t.fare() for t in good))
        `,
        tests: [
          { inputs: ["Asha,150;Ravi,0;Meena,300"], output: "Asha 300\nSkipped: Ravi\nMeena 600\nTotal at new rate: 1350" },
          { inputs: ["Om,5000;Dev,5001"], output: "Om 10000\nSkipped: Dev\nTotal at new rate: 15000" },
          { inputs: ["Zoya,1"], py: py`
              T = need("Ticket", "class")
              t = T.from_text("Tara,40")
              assert t.name == "Tara" and t.km == 40, "Ticket.from_text('Tara,40') should build Tara's ticket with 40 km, as a whole number."
              assert T.valid_km(1) and T.valid_km(5000) and not T.valid_km(0), "valid_km should be True for 1 to 5000 km, both ends included."
              T.rate_per_km = 10
              assert t.fare() == 400, "fare() should use the class's rate, so a new rate changes every ticket."
            ` },
        ],
        wrong: [py`
          class Ticket:
              rate_per_km = 2

              def __init__(self, name, km):
                  self.name = name
                  self.km = km
                  self.price = km * Ticket.rate_per_km

              def fare(self):
                  return self.price

              @classmethod
              def from_text(cls, line):
                  name, km = line.split(",")
                  return cls(name, int(km))

              @staticmethod
              def valid_km(km):
                  return 1 <= km <= 5000

          good = []
          for line in input("Tickets: ").split(";"):
              t = Ticket.from_text(line)
              if not Ticket.valid_km(t.km):
                  print("Skipped:", t.name)
                  continue
              print(t.name, t.fare())
              good.append(t)
          Ticket.rate_per_km = 3
          print("Total at new rate:", sum(t.fare() for t in good))
        `, py`
          class Ticket:
              rate_per_km = 2

              def __init__(self, name, km):
                  self.name = name
                  self.km = km

              def fare(self):
                  return self.km * Ticket.rate_per_km

              @classmethod
              def from_text(cls, line):
                  name, km = line.split(",")
                  return cls(name, int(km))

              @staticmethod
              def valid_km(km):
                  return 1 < km < 5000

          good = []
          for line in input("Tickets: ").split(";"):
              t = Ticket.from_text(line)
              if not Ticket.valid_km(t.km):
                  print("Skipped:", t.name)
                  continue
              print(t.name, t.fare())
              good.append(t)
          Ticket.rate_per_km = 3
          print("Total at new rate:", sum(t.fare() for t in good))
        `],
        hints: [
          md`If the total still uses the old rate, each fare was worked out once when the ticket was built. Work it out in «fare()», from the class's rate.`,
          md`If a 5000 km ticket is skipped, the check leaves out the edge. Both 1 and 5000 are valid.`,
          md`If you see a TypeError comparing text with a number, «from_text» keeps the km as text.`,
        ],
      },
    ],
    keys: [
      md`A **class attribute** is shared by every object. Change it through the class: «Ticket.gst = 12».`,
      md`To count objects, write «ClassName.count += 1» in «__init__», not «self.count».`,
      md`«@classmethod» gets the class as «cls», and builds objects with «cls(...)», like «Book.from_dict(d)».`,
      md`«@staticmethod» is a plain helper function kept inside the class.`,
    ],
  });

  // ---------------------------------------------------------------- Day 116
  day({
    slug: "dataclasses",
    title: "Dataclasses: Short Classes",
    goal: "Write data classes in a few lines with @dataclass.",
    minutes: 45,
    needs: [113, 115],
    win: "Today you can now write a class that holds data in a few lines, with defaults, a list of its own, and free comparisons.",
    learn: [
      md`
        ## A class in three lines

        Many classes only hold data: a name, some marks, a price. Writing «__init__», «__repr__» and «__eq__» for each one is long and boring. «@dataclass» writes them for you. You list the fields, each with a **type hint**: a note that says what kind of value it holds (more on Day 124). Guess the output.
      `,
      ex(py`
        from dataclasses import dataclass

        @dataclass
        class Student:
            name: str
            marks: int

        a = Student("Asha", 82)
        print(a)
        print(a == Student("Asha", 82))
      `, { predict: ["Student(name='Asha', marks=82)\nTrue", "<__main__.Student object at 0x...>\nFalse", "Student(name='Asha', marks=82)\nFalse"], answer: 0 }),
      md`
        The dataclass made an «__init__» that takes the fields in order, a «__repr__» that prints clearly, and an «__eq__» that compares every field.

        ## Default values, and a list of its own

        A field can have a default. A list needs care: Day 54 showed that a list default is shared by every call. A dataclass refuses «items: list = []». Use «field(default_factory=list)» instead: it makes a **new** list for each object. Guess the output.
      `,
      ex(py`
        from dataclasses import dataclass, field

        @dataclass
        class Order:
            table: int
            items: list = field(default_factory=list)
            paid: bool = False

        o = Order(4)
        o.items.append("chai")
        print(o)
        print(Order(5).items)
      `, { predict: ["Order(table=4, items=['chai'], paid=False)\n[]", "Order(table=4, items=['chai'], paid=False)\n['chai']", "ValueError"], answer: 0 }),
      md`
        Fields with defaults must come **after** the fields without them, as with function parameters (Day 33).
      `,
      pause(md`Good place for a break. Next: methods in a dataclass, and dataclasses that sort.`),
      md`
        ## Methods still work

        A dataclass is still a class. You can add your own methods. Guess the output.
      `,
      ex(py`
        from dataclasses import dataclass

        @dataclass
        class Item:
            name: str
            price: int
            qty: int = 1

            def cost(self):
                return self.price * self.qty

        cart = [Item("chai", 15, 2), Item("samosa", 20)]
        print(sum(i.cost() for i in cart))
      `, { predict: ["50", "35", "70"], answer: 0 }),
      md`
        ## order=True: dataclasses that sort

        «@dataclass(order=True)» also writes «__lt__» and the other comparisons. It compares the fields **in order**, like tuples (Day 67). Guess the output.
      `,
      ex(py`
        from dataclasses import dataclass

        @dataclass(order=True)
        class Result:
            marks: int
            name: str

        for r in sorted([Result(72, "Asha"), Result(88, "Ravi"), Result(72, "Om")]):
            print(r)
      `, { predict: ["Result(marks=72, name='Asha')\nResult(marks=72, name='Om')\nResult(marks=88, name='Ravi')", "Result(marks=88, name='Ravi')\nResult(marks=72, name='Asha')\nResult(marks=72, name='Om')", "TypeError"], answer: 0 }),
      md`
        The first field decides first. Asha and Om tie on 72, so the names decide.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          from dataclasses import dataclass

          @dataclass
          class P:
              x: int
              y: int

          print(P(1, 2) == P(1, 2), P(1, 2) is P(1, 2))
        `, options: ["True False", "False False", "True True"], answer: 0,
        explain: md`The free «__eq__» compares the fields, which match. They are still two separate objects.`,
        why: [null, md`A dataclass writes «__eq__» for you, so equal fields mean equal objects.`, md`«is» asks for the very same object, and these are two objects.`],
        skill: "trace" },
      { q: md`What does the «field(...)» line do here?`, code: py`
          @dataclass
          class Bag:
              owner: str
              things: list = field(default_factory=list)
        `, options: ["It gives each new Bag its own empty list", "It makes every Bag share one list", "It says the list can never change"],
        answer: 0, verify: false, mono: false,
        explain: md`«default_factory=list» calls «list()» for every new Bag, so no two bags share a list.`,
        why: [null, md`Sharing is the trap that «field» avoids.`, md`The list can change. Each Bag simply has its own.`],
        skill: "read" },
      { q: md`«items: list = []» in a dataclass stops with «ValueError: mutable default <class 'list'> for field items is not allowed». What is the fix?`,
        options: ["«items: list = field(default_factory=list)»", "«items: list = None» and nothing else", "Remove @dataclass"], answer: 0, verify: false,
        explain: md`A list default would be shared by every object, so the dataclass asks for a factory that makes a new list each time.`,
        why: [null, md`Then every object starts with None, and «.append» fails.`, md`That throws away everything the dataclass writes for you.`],
        skill: "debug" },
      { q: md`Which methods does a plain «@dataclass» write for you?`,
        options: ["«__init__», «__repr__» and «__eq__»", "Only «__init__»", "«__init__», «__lt__» and «__len__»"], answer: 0, verify: false,
        explain: md`«__lt__» needs «order=True». «__len__» is never written for you.`,
        why: [null, md`It writes more than that: a clear repr, and «==» by fields.`, md`«__lt__» only comes with «order=True», and «__len__» never does.`],
        skill: "memory" },
      { q: md`You need a simple record class with five fields and no special rules. What is the shortest good choice?`,
        options: ["A «@dataclass» with the five fields", "A class with a hand-written «__init__», «__repr__» and «__eq__»", "Five separate variables"], answer: 0, verify: false, mono: false,
        explain: md`The dataclass writes the boring methods, and the fields are easy to read at a glance.`,
        why: [null, md`It works, but it is long, and easy to get wrong.`, md`Five variables hold one record only, and nothing ties them together.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: two points",
        task: md`Answer the question without running the program.`,
        code: py`
          from dataclasses import dataclass

          @dataclass
          class Point:
              x: int
              y: int = 0

          a = Point(3)
          b = Point(3, 0)
          a.y = 4
          print(a == b, a, b)
        `,
        ask: [{ output: true }],
        hints: [
          md`«Point(3)» uses the default, so it starts as «Point(x=3, y=0)».`,
          md`Line 10 changes only «a».`,
          md`«==» compares every field. Their y values are now different.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: a hand of cards",
        task: md`Answer the question without running the program. «order=True» compares rank first, then suit.`,
        code: py`
          from dataclasses import dataclass

          @dataclass(order=True)
          class Card:
              rank: int
              suit: str

          hand = [Card(10, "hearts"), Card(2, "spades"), Card(10, "clubs")]
          low = min(hand)
          hand.sort()
          print(low.rank, [c.suit for c in hand])
        `,
        ask: [{ output: true }],
        hints: [
          md`The rank decides first, so the 2 is the smallest card.`,
          md`The two 10s tie on rank, so the suit decides, A to Z.`,
          md`«clubs» comes before «hearts» in A to Z order.`,
        ],
      },
      {
        id: "f1", kind: "fill", title: "Fill the gaps: a shelf of its own",
        task: md`
          Fill the gaps so Shelf is a dataclass, and each shelf has its own list of books. The program prints:

          | ['Lucent'] []
        `,
        template: py`
          from dataclasses import dataclass, field

          @⟦dataclass⟧
          class Shelf:
              name: str
              books: list = ⟦field⟧(default_factory=list)

          a = Shelf("GK")
          b = Shelf("Maths")
          a.books.append("Lucent")
          print(a.books, b.books)
        `,
        tests: [{ output: "['Lucent'] []" }],
        hints: [
          md`If you see a TypeError that Shelf takes no arguments, the class is not a dataclass yet.`,
          md`The line above the class is an at sign and the name of the tool you imported first.`,
          md`The second gap is the second tool you imported: it makes a new list for each shelf.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the student class will not build",
        task: md`
          A student with no marks yet should get 0 marks. The program should print:

          | Asha Pune 82

          It stops with a TypeError before anything runs. Tap the line that causes it, then fix it.
        `,
        starter: py`
          from dataclasses import dataclass

          @dataclass
          class Student:
              name: str
              city: str = "Delhi"
              marks: int

          s = Student("Asha", "Pune", 82)
          print(s.name, s.city, s.marks)
        `,
        bugLines: [7],
        solution: py`
          from dataclasses import dataclass

          @dataclass
          class Student:
              name: str
              city: str = "Delhi"
              marks: int = 0

          s = Student("Asha", "Pune", 82)
          print(s.name, s.city, s.marks)
        `,
        tests: [
          { output: "Asha Pune 82" },
          { py: py`
              s = new("Student", "Om")
              assert s.city == "Delhi" and s.marks == 0, "Student('Om') should live in Delhi and start with 0 marks."
            ` },
        ],
        wrong: [py`
          from dataclasses import dataclass

          @dataclass
          class Student:
              name: str
              city: str
              marks: int

          s = Student("Asha", "Pune", 82)
          print(s.name, s.city, s.marks)
        `],
        hints: [
          md`The error says a field with no default follows a field with a default. Which field is that?`,
          md`After «city» has a default, every field below it needs one too.`,
          md`If a test says Student('Om') fails, the defaults were removed. The task wants Delhi and 0 as defaults.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: a book in three lines",
        task: md`
          This Book class writes «__init__», «__repr__» and «__eq__» by hand. Make it a dataclass with the fields «title» and «price», and delete the three methods. The output stays:

          | Book(title='Polity', price=420) True
        `,
        starter: py`
          class Book:
              def __init__(self, title, price):
                  self.title = title
                  self.price = price

              def __repr__(self):
                  return f"Book(title='{self.title}', price={self.price})"

              def __eq__(self, other):
                  return self.title == other.title and self.price == other.price

          a = Book("Polity", 420)
          print(a, a == Book("Polity", 420))
        `,
        solution: py`
          from dataclasses import dataclass

          @dataclass
          class Book:
              title: str
              price: int

          a = Book("Polity", 420)
          print(a, a == Book("Polity", 420))
        `,
        tests: [
          { output: "Book(title='Polity', price=420) True" },
          { avoids: ["kw:def"] },
          { py: py`
              import dataclasses
              assert dataclasses.is_dataclass(need("Book", "class")), "Book should be a dataclass, marked with @dataclass."
            ` },
        ],
        wrong: [py`
          from dataclasses import dataclass

          @dataclass
          class Book:
              title: str
              price: int

              def __repr__(self):
                  return f"Book(title='{self.title}', price={self.price})"

          a = Book("Polity", 420)
          print(a, a == Book("Polity", 420))
        `],
        hints: [
          md`If a test says to do it without def, one of the hand-written methods is still there.`,
          md`If a test says Book should be a dataclass, the line above the class is missing, or the import is.`,
          md`If you see «price=420» missing, the fields must be listed with their type hints, one per line.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a mock test merit list",
        task: md`
          From a blank page, write a dataclass «Result» with the fields «name», «marks» and «age». Give it a method «passed(cutoff=120)» that gives back True when the marks are at least the cutoff.

          Ask for results on one line, each as «name,marks,age», separated by «;». Print a numbered merit list: **higher marks first**, and for equal marks the **younger** first. Then print how many passed. For «Asha,150,24;Ravi,162,26;Meena,150,22» it shows:

          | 1. Ravi 162
          | 2. Meena 150
          | 3. Asha 150
          | Passed: 3
        `,
        starter: py``,
        solution: py`
          from dataclasses import dataclass

          @dataclass
          class Result:
              name: str
              marks: int
              age: int

              def passed(self, cutoff=120):
                  return self.marks >= cutoff

          results = []
          for part in input("Results: ").split(";"):
              name, marks, age = part.split(",")
              results.append(Result(name, int(marks), int(age)))
          ranked = sorted(results, key=lambda r: (-r.marks, r.age))
          for i, r in enumerate(ranked, start=1):
              print(f"{i}. {r.name} {r.marks}")
          print("Passed:", sum(1 for r in results if r.passed()))
        `,
        tests: [
          { inputs: ["Asha,150,24;Ravi,162,26;Meena,150,22"], output: "1. Ravi 162\n2. Meena 150\n3. Asha 150\nPassed: 3" },
          { inputs: ["Om,119,20;Dev,120,30"], output: "1. Dev 120\n2. Om 119\nPassed: 1" },
          { inputs: ["Zoya,90,19"], py: py`
              import dataclasses
              R = need("Result", "class")
              assert dataclasses.is_dataclass(R), "Result should be a dataclass, marked with @dataclass."
              assert R("A", 1, 2) == R("A", 1, 2), "Two Results with the same fields should be equal."
              assert R("A", 100, 20).passed(100) and not R("A", 99, 20).passed(100), "passed(100) should be True for 100 marks and False for 99."
            ` },
        ],
        wrong: [py`
          from dataclasses import dataclass

          @dataclass
          class Result:
              name: str
              marks: int
              age: int

              def passed(self, cutoff=120):
                  return self.marks > cutoff

          results = []
          for part in input("Results: ").split(";"):
              name, marks, age = part.split(",")
              results.append(Result(name, int(marks), int(age)))
          ranked = sorted(results, key=lambda r: (-r.marks, r.age))
          for i, r in enumerate(ranked, start=1):
              print(f"{i}. {r.name} {r.marks}")
          print("Passed:", sum(1 for r in results if r.passed()))
        `, py`
          from dataclasses import dataclass

          @dataclass
          class Result:
              name: str
              marks: int
              age: int

              def passed(self, cutoff=120):
                  return self.marks >= cutoff

          results = []
          for part in input("Results: ").split(";"):
              name, marks, age = part.split(",")
              results.append(Result(name, int(marks), int(age)))
          ranked = sorted(results, key=lambda r: (r.marks, r.age), reverse=True)
          for i, r in enumerate(ranked, start=1):
              print(f"{i}. {r.name} {r.marks}")
          print("Passed:", sum(1 for r in results if r.passed()))
        `],
        hints: [
          md`If a candidate with exactly 120 does not pass, the check leaves out the cutoff itself.`,
          md`If Asha comes before Meena, «reverse=True» also put the older one first. Flip only the marks, with a minus sign.`,
          md`If you see a TypeError about «<» between text, the marks or age are still text. Change them into whole numbers when you read them.`,
        ],
      },
    ],
    keys: [
      md`«@dataclass» writes «__init__», «__repr__» and «__eq__» from the fields you list.`,
      md`Fields with defaults come after fields without them.`,
      md`For a list field, use «field(default_factory=list)», so each object gets its own list.`,
      md`«@dataclass(order=True)» also writes the comparisons, field by field, like tuples.`,
    ],
  });

  // ---------------------------------------------------------------- Day 117
  day({
    slug: "own-exceptions",
    title: "Your Own Error Types",
    goal: "Make your own error classes and catch them by name.",
    minutes: 45,
    needs: [71, 72, 97],
    win: "Today you can now make your own error types, group them in a family, and catch exactly the one you mean.",
    learn: [
      md`
        ## An error with your own name

        On Day 71 you raised ValueError. But a ValueError can come from anywhere, even a typing slip in «int()». Your own error type says exactly what went wrong. It is a tiny class that inherits from «Exception» (Day 97). Guess the output.
      `,
      ex(py`
        class OutOfStock(Exception):
            pass

        stock = {"chai": 2}

        def sell(item, qty):
            if stock.get(item, 0) < qty:
                raise OutOfStock(f"Only {stock.get(item, 0)} {item} left")
            stock[item] -= qty

        try:
            sell("chai", 5)
        except OutOfStock as e:
            print("Sorry:", e)
      `, { predict: ["Sorry: Only 2 chai left", "OutOfStock", "Sorry: chai"], answer: 0 }),
      md`
        «pass» is enough for the body: the class gets everything it needs from «Exception». The caller catches **only** OutOfStock. A real bug, like a misspelled name, still shows up instead of hiding.

        ## A family of errors

        A shop can say no in several ways. Give them one parent, and the caller can catch the whole family in one block. «type(e).__name__» gives the name of the error's class. Guess the output.
      `,
      ex(py`
        class ShopError(Exception):
            pass

        class OutOfStock(ShopError):
            pass

        class UnknownItem(ShopError):
            pass

        for err in [OutOfStock("no chai"), UnknownItem("no lassi")]:
            try:
                raise err
            except ShopError as e:
                print(type(e).__name__, "-", e)
      `, { predict: ["OutOfStock - no chai\nUnknownItem - no lassi", "ShopError - no chai\nShopError - no lassi", "OutOfStock - no chai"], answer: 0 }),
      md`
        «except ShopError» catches ShopError **and every child of it**, because an OutOfStock is a kind of ShopError.
      `,
      pause(md`Good place for a break. Next: errors that carry extra facts, and the order of except blocks.`),
      md`
        ## An error that carries facts

        An error class can have its own «__init__». It calls «super().__init__(message)» (Day 97) so the message still works, and keeps extra facts as attributes. Guess the output.
      `,
      ex(py`
        class OutOfStock(Exception):
            def __init__(self, item, left):
                super().__init__(f"Only {left} {item} left")
                self.item = item
                self.left = left

        try:
            raise OutOfStock("samosa", 3)
        except OutOfStock as e:
            print(e)
            print(e.left * 15)
      `, { predict: ["Only 3 samosa left\n45", "OutOfStock\n45", "Only 3 samosa left\n3"], answer: 0 }),
      md`
        The caller can now offer the 3 that are left, worth 45 rupees, without reading the message text.

        ## Child first, then parent

        Python checks the «except» blocks from the top and runs the **first** one that matches. If «except ShopError» comes first, it also matches every OutOfStock, so an «except OutOfStock» below it never runs. Put the children first and the parent last.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          class ShopError(Exception):
              pass

          class OutOfStock(ShopError):
              pass

          class UnknownItem(ShopError):
              pass

          try:
              raise UnknownItem("lassi")
          except OutOfStock:
              print("A")
          except ShopError:
              print("B")
        `, options: ["B", "A", "A then B"], answer: 0,
        explain: md`UnknownItem is not an OutOfStock, so the first block does not match. It is a ShopError, so the second one does.`,
        why: [null, md`OutOfStock and UnknownItem are brothers, not the same error.`, md`Only the first matching block runs.`],
        skill: "trace" },
      { q: md`What does this line make?`, code: py`
          class TooYoung(ValueError):
              pass
        `, options: ["A new kind of ValueError, so «except ValueError» catches it too", "A ValueError that can never be caught", "A function that checks ages"],
        answer: 0, verify: false, mono: false,
        explain: md`It inherits from ValueError, so it is a ValueError, with a clearer name.`,
        why: [null, md`Any error can be caught. This one is caught by its own name or by ValueError.`, md`It is a class with no methods of its own. It checks nothing.`],
        skill: "read" },
      { q: md`A program has «except ShopError:» and then «except OutOfStock:». The OutOfStock message never appears. Why?`,
        options: ["The parent block comes first and catches OutOfStock too; put OutOfStock first", "OutOfStock needs its own «__init__»", "Only one except block is allowed"], answer: 0, verify: false, mono: false,
        explain: md`The first matching block wins. A child matches its parent's block.`,
        why: [null, md`A child with only «pass» is a complete error class.`, md`A try can have many except blocks.`],
        skill: "debug" },
      { q: md`What must your own error class inherit from?`,
        options: ["«Exception», or another error class", "Nothing: «class MyError:» is enough", "«object» only"], answer: 0, verify: false, mono: false,
        explain: md`«raise» only accepts errors, so the class must come from «Exception» or one of its children.`,
        why: [null, md`«raise» on a plain class stops with TypeError: errors must come from BaseException.`, md`Every class comes from «object», but that does not make it an error.`],
        skill: "memory" },
      { q: md`A booking system refuses in three ways: no seats, a bad age, an unknown train. Callers sometimes want one of these, and sometimes all three. What do you make?`,
        options: ["A parent «BookingError» with three child error classes", "Three unrelated error classes", "One ValueError with three different messages"], answer: 0, verify: false, mono: false,
        explain: md`Catch one child alone, or «except BookingError» for all three.`,
        why: [null, md`Then catching all three needs three except blocks every time.`, md`Then the caller must read message text to tell them apart.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: short by",
        task: md`Answer each question without running the program.`,
        code: py`
          class LowBalance(Exception):
              pass

          def pay(balance, amount):
              if amount > balance:
                  raise LowBalance(f"Short by {amount - balance}")
              return balance - amount

          wallet = 100
          for amount in [30, 90, 50]:
              try:
                  wallet = pay(wallet, amount)
              except LowBalance as e:
                  print(e)
          print(wallet)
        `,
        ask: [{ line: 5, hit: 2, name: "balance" }, { output: true }],
        hints: [
          md`The first payment works: 100 − 30 leaves 70.`,
          md`90 is more than 70, so the second call raises, and «wallet» keeps 70.`,
          md`The third payment takes 50 from 70.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: which form error?",
        task: md`Answer the question without running the program.`,
        code: py`
          class FormError(Exception):
              pass

          class BadMobile(FormError):
              pass

          class BadPin(FormError):
              pass

          def check(mobile, pin):
              if len(mobile) != 10:
                  raise BadMobile(mobile)
              if len(pin) != 6:
                  raise BadPin(pin)
              return "ok"

          results = []
          for m, p in [("9876543210", "110001"), ("98765", "110001"), ("9876543210", "11")]:
              try:
                  results.append(check(m, p))
              except BadPin:
                  results.append("pin")
              except FormError:
                  results.append("form")
          print(results)
        `,
        ask: [{ output: true }],
        hints: [
          md`The first form is fine, so «check» gives back «ok».`,
          md`The second mobile is too short. BadMobile is not BadPin, but it is a FormError.`,
          md`The third form has a short PIN, which the first except block catches.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: the gate is closed",
        task: md`
          Put the lines in order. The program makes its own error, raises it for a late arrival, and catches it. It prints:

          | Gate closed
        `,
        solution: py`
          class TooLate(Exception):
              pass
          def enter(hour):
              if hour > 9:
                  raise TooLate("Gate closed")
              return "Welcome"
          try:
              print(enter(10))
          except TooLate as e:
              print(e)
        `,
        distractors: ["class TooLate:"],
        tests: [{ output: "Gate closed" }],
        hints: [
          md`If you see «exceptions must derive from BaseException», the error class does not inherit from Exception.`,
          md`If you see a NameError for TooLate, the class must be made before the function raises it.`,
          md`If «Welcome» is printed, the hour check is not inside the function.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the sorry that never shows",
        task: md`
          A shop sells from its stock. For the orders «chai vada lassi» it should print:

          | Sold chai
          | Sorry, vada is finished
          | Shop problem: We do not sell lassi

          It prints «Shop problem: vada is finished» instead. Tap the line that causes it, then fix it.
        `,
        starter: py`
          class ShopError(Exception):
              pass

          class OutOfStock(ShopError):
              pass

          stock = {"chai": 2, "vada": 0}
          for item in input("Orders: ").split():
              try:
                  if item not in stock:
                      raise ShopError(f"We do not sell {item}")
                  if stock[item] == 0:
                      raise OutOfStock(f"{item} is finished")
                  stock[item] -= 1
                  print("Sold", item)
              except ShopError as e:
                  print("Shop problem:", e)
              except OutOfStock as e:
                  print("Sorry,", e)
        `,
        bugLines: [16],
        solution: py`
          class ShopError(Exception):
              pass

          class OutOfStock(ShopError):
              pass

          stock = {"chai": 2, "vada": 0}
          for item in input("Orders: ").split():
              try:
                  if item not in stock:
                      raise ShopError(f"We do not sell {item}")
                  if stock[item] == 0:
                      raise OutOfStock(f"{item} is finished")
                  stock[item] -= 1
                  print("Sold", item)
              except OutOfStock as e:
                  print("Sorry,", e)
              except ShopError as e:
                  print("Shop problem:", e)
        `,
        tests: [
          { inputs: ["chai vada lassi"], output: "Sold chai\nSorry, vada is finished\nShop problem: We do not sell lassi" },
          { inputs: ["chai chai chai"], output: "Sold chai\nSold chai\nSorry, chai is finished" },
        ],
        wrong: [py`
          class ShopError(Exception):
              pass

          class OutOfStock(ShopError):
              pass

          stock = {"chai": 2, "vada": 0}
          for item in input("Orders: ").split():
              try:
                  if item not in stock:
                      raise ShopError(f"We do not sell {item}")
                  if stock[item] == 0:
                      raise OutOfStock(f"{item} is finished")
                  stock[item] -= 1
                  print("Sold", item)
              except OutOfStock as e:
                  print("Sorry,", e)
        `],
        hints: [
          md`An OutOfStock is also a ShopError. Which except block does Python try first?`,
          md`The first matching block wins, so the parent's block catches the child too.`,
          md`If «lassi» now crashes, the parent's block was removed. Keep both, with the child first.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: an error that knows the numbers",
        task: md`
          Give «NotEnoughSeats» its own «__init__(self, wanted, left)». It calls «super().__init__» with the message «Wanted W, only L left», and keeps «wanted» and «left» as attributes. Change the raise line to «raise NotEnoughSeats(seats, left)». The program then prints:

          | Wanted 5, only 2 left
          | Book 2 instead?
        `,
        starter: py`
          class NotEnoughSeats(Exception):
              pass

          def book(seats, left):
              if seats > left:
                  raise NotEnoughSeats(f"Wanted {seats}, only {left} left")
              return left - seats

          try:
              book(5, 2)
          except NotEnoughSeats as e:
              print(e)
              print(f"Book {e.left} instead?")
        `,
        solution: py`
          class NotEnoughSeats(Exception):
              def __init__(self, wanted, left):
                  super().__init__(f"Wanted {wanted}, only {left} left")
                  self.wanted = wanted
                  self.left = left

          def book(seats, left):
              if seats > left:
                  raise NotEnoughSeats(seats, left)
              return left - seats

          try:
              book(5, 2)
          except NotEnoughSeats as e:
              print(e)
              print(f"Book {e.left} instead?")
        `,
        tests: [{ output: "Wanted 5, only 2 left\nBook 2 instead?" }],
        wrong: [py`
          class NotEnoughSeats(Exception):
              def __init__(self, wanted, left):
                  self.wanted = wanted
                  self.left = left

          def book(seats, left):
              if seats > left:
                  raise NotEnoughSeats(seats, left)
              return left - seats

          try:
              book(5, 2)
          except NotEnoughSeats as e:
              print(e)
              print(f"Book {e.left} instead?")
        `],
        hints: [
          md`If you see AttributeError for «left», the error does not keep the numbers yet.`,
          md`If the first line is empty or shows «(5, 2)», the message was not passed to «super().__init__».`,
          md`If you see a TypeError about arguments, the raise line and the «__init__» line take a different number of values.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a bank with its own errors",
        task: md`
          From a blank page, make three error classes: «BankError», and two children of it, «LowBalance» and «BadAmount». «LowBalance» keeps how much money is short, as «short».

          Write «withdraw(balance, amount)». For an amount of 0 or less it raises «BadAmount("Amount must be more than 0")». For more than the balance it raises «LowBalance», with «short» set. Otherwise it gives back the new balance.

          Start with a balance of 500. Ask for amounts on one line, and try each one. Print «Paid» and the amount, or «Short by» and how much is short, or «Refused:» and the message for any other bank error. Last, print the balance. For «200 400 -5 100» it shows:

          | Paid 200
          | Short by 100
          | Refused: Amount must be more than 0
          | Paid 100
          | Balance: 200
        `,
        starter: py``,
        solution: py`
          class BankError(Exception):
              pass

          class LowBalance(BankError):
              def __init__(self, short):
                  super().__init__(f"Short by {short}")
                  self.short = short

          class BadAmount(BankError):
              pass

          def withdraw(balance, amount):
              if amount <= 0:
                  raise BadAmount("Amount must be more than 0")
              if amount > balance:
                  raise LowBalance(amount - balance)
              return balance - amount

          balance = 500
          for text in input("Amounts: ").split():
              amount = int(text)
              try:
                  balance = withdraw(balance, amount)
                  print("Paid", amount)
              except LowBalance as e:
                  print("Short by", e.short)
              except BankError as e:
                  print("Refused:", e)
          print("Balance:", balance)
        `,
        tests: [
          { inputs: ["200 400 -5 100"], output: "Paid 200\nShort by 100\nRefused: Amount must be more than 0\nPaid 100\nBalance: 200" },
          { inputs: ["500 1"], output: "Paid 500\nShort by 1\nBalance: 0" },
          { inputs: ["0"], py: py`
              assert issubclass(need("LowBalance", "class"), need("BankError", "class")), "LowBalance should be a child of BankError."
              assert issubclass(need("BadAmount", "class"), need("BankError", "class")), "BadAmount should be a child of BankError."
              withdraw = need("withdraw", "function")
              try:
                  withdraw(100, 150)
                  raised = None
              except Exception as e:
                  raised = e
              assert type(raised).__name__ == "LowBalance", f"withdraw(100, 150) should raise LowBalance, but it gave {raised!r}."
              assert raised.short == 50, f"Taking 150 from 100 is short by 50, but short is {raised.short}."
              assert withdraw(100, 100) == 0, "Taking all 100 from 100 should leave 0."
            ` },
        ],
        wrong: [py`
          class BankError(Exception):
              pass

          class LowBalance(BankError):
              def __init__(self, short):
                  super().__init__(f"Short by {short}")
                  self.short = short

          class BadAmount(BankError):
              pass

          def withdraw(balance, amount):
              if amount <= 0:
                  raise BadAmount("Amount must be more than 0")
              if amount >= balance:
                  raise LowBalance(amount - balance)
              return balance - amount

          balance = 500
          for text in input("Amounts: ").split():
              amount = int(text)
              try:
                  balance = withdraw(balance, amount)
                  print("Paid", amount)
              except LowBalance as e:
                  print("Short by", e.short)
              except BankError as e:
                  print("Refused:", e)
          print("Balance:", balance)
        `, py`
          class BankError(Exception):
              pass

          class LowBalance(BankError):
              def __init__(self, short):
                  super().__init__(f"Short by {short}")
                  self.short = short

          class BadAmount(BankError):
              pass

          def withdraw(balance, amount):
              if amount <= 0:
                  raise BadAmount("Amount must be more than 0")
              if amount > balance:
                  raise LowBalance(amount - balance)
              return balance - amount

          balance = 500
          for text in input("Amounts: ").split():
              amount = int(text)
              try:
                  balance = withdraw(balance, amount)
                  print("Paid", amount)
              except BankError as e:
                  print("Refused:", e)
              except LowBalance as e:
                  print("Short by", e.short)
          print("Balance:", balance)
        `],
        hints: [
          md`If paying the whole balance is refused, the check counts an amount equal to the balance as too much.`,
          md`If «Short by» never appears and «Refused: Short by 100» does, the parent's except block comes before the child's.`,
          md`If you see AttributeError for «short», LowBalance must keep it in its own «__init__».`,
        ],
      },
    ],
    keys: [
      md`Your own error is a class that inherits from «Exception»: «class OutOfStock(Exception): pass».`,
      md`A family shares a parent. «except ShopError» catches the parent and every child.`,
      md`An error can keep extra facts: its «__init__» calls «super().__init__(message)» and sets attributes.`,
      md`Put the child's except block before the parent's: the first match wins.`,
    ],
  });

  // ---------------------------------------------------------------- Day 118
  day({
    slug: "decorators",
    title: "Decorators: Wrapping a Function",
    goal: "Write a decorator that adds work before and after any function.",
    minutes: 45,
    needs: [108, 109],
    win: "Today you can now write a decorator that adds work around any function, and put it on a function with one @ line.",
    learn: [
      md`
        ## A function that wraps a function

        On Day 108 you wrote a function that makes and gives back a new function. A **decorator** is exactly that. It takes a function, and gives back a new **wrapper** function that does a little extra work around the old one. Guess the output.
      `,
      ex(py`
        def shout(func):
            def wrapper():
                return func().upper() + "!"
            return wrapper

        def greet():
            return "namaste"

        loud_greet = shout(greet)
        print(loud_greet())
      `, { predict: ["NAMASTE!", "namaste", "TypeError"], answer: 0 }),
      md`
        «shout(greet)» does not call «greet». It gives back «wrapper», which calls «greet» later and changes its answer.

        ## The @ line

        Writing «greet = shout(greet)» after every def is clumsy. Put «@shout» on the line above the def instead: it means exactly the same. Guess the output.
      `,
      ex(py`
        def shout(func):
            def wrapper():
                return func().upper() + "!"
            return wrapper

        @shout
        def greet():
            return "namaste"

        print(greet())
      `, { predict: ["NAMASTE!", "namaste", "shout"], answer: 0 }),
      md`
        After the «@shout» line, the name «greet» means the wrapper. On Day 87 you saw lines like «@lru_cache»: those are decorators other people wrote.
      `,
      pause(md`Good place for a break. Next: a decorator for any function, and keeping the function's name.`),
      md`
        ## A wrapper for any function

        A wrapper with no parameters only fits functions with no parameters. With «*args» and «**kwargs» (Day 109), a wrapper accepts anything and passes it all on. «func.__name__» is the function's name as text. Guess the output.
      `,
      ex(py`
        def log_calls(func):
            def wrapper(*args, **kwargs):
                print("Calling", func.__name__, args)
                result = func(*args, **kwargs)
                print("Gave back", result)
                return result
            return wrapper

        @log_calls
        def add(a, b):
            return a + b

        total = add(2, 3)
      `, { predict: ["Calling add (2, 3)\nGave back 5", "5", "Calling add\n5"], answer: 0 }),
      md`
        The wrapper must give back «result». If it forgets, every decorated function gives back None.

        ## Keeping the name: functools.wraps

        After decorating, «add.__name__» is «"wrapper"», which confuses error messages and «help». «@functools.wraps(func)» on the wrapper copies the old name across. Guess the output.
      `,
      ex(py`
        import functools

        def log_calls(func):
            @functools.wraps(func)
            def wrapper(*args, **kwargs):
                return func(*args, **kwargs)
            return wrapper

        @log_calls
        def add(a, b):
            return a + b

        print(add.__name__)
      `, { predict: ["add", "wrapper", "log_calls"], answer: 0 }),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          def twice(func):
              def wrapper(x):
                  return func(func(x))
              return wrapper

          @twice
          def add5(n):
              return n + 5

          print(add5(1))
        `, options: ["11", "6", "10"], answer: 0,
        explain: md`«add5» now means the wrapper, which adds 5 twice: 1, then 6, then 11.`,
        why: [null, md`6 is one call of the old «add5». The wrapper calls it twice.`, md`It adds 5 twice to 1. It does not double anything.`],
        skill: "trace" },
      { q: md`What does this decorator do?`, code: py`
          def around(func):
              def wrapper(*args, **kwargs):
                  print("Start")
                  result = func(*args, **kwargs)
                  print("End")
                  return result
              return wrapper
        `, options: ["It prints Start before and End after every call, and keeps the answer", "It runs the function twice", "It stops the function from running"],
        answer: 0, verify: false, mono: false,
        explain: md`The wrapper does its own work, calls the real function once, then gives back its answer.`,
        why: [null, md`«func» is called once, between the two prints.`, md`«func» is called, so it runs as normal.`],
        skill: "read" },
      { q: md`After adding a decorator, a function that gave back 45 now gives back None. What is the most likely cause?`,
        options: ["The wrapper calls the function but does not «return» its result", "The @ line is above the def", "The function needs a new name"], answer: 0, verify: false, mono: false,
        explain: md`A wrapper with no «return» gives back None, whatever the real function gave.`,
        why: [null, md`Above the def is the right place for it.`, md`The name is fine. The answer is lost inside the wrapper.`],
        skill: "debug" },
      { q: md`What does «@timer» on the line above «def report():» mean?`,
        options: ["«report = timer(report)»", "«timer = report(timer)»", "«report()» runs at once"], answer: 0, verify: false,
        explain: md`The decorator gets the function, and its answer, the wrapper, takes the function's name.`,
        why: [null, md`It is the other way round: timer wraps report.`, md`Nothing runs yet. The function is only wrapped.`],
        skill: "memory" },
      { q: md`You want many functions to print how long each call took, without changing the inside of any of them. What do you use?`,
        options: ["A timing decorator, with an @ line above each function", "Copy the timing lines into every function", "A class with a timer attribute"], answer: 0, verify: false, mono: false,
        explain: md`The timing code lives in one place, and each function gets it with one line.`,
        why: [null, md`Copies get out of step, and every fix must be made many times.`, md`A class does not wrap the functions by itself.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: double the answer",
        task: md`Answer each question without running the program.`,
        code: py`
          def double_result(func):
              def wrapper(*args):
                  return func(*args) * 2
              return wrapper

          @double_result
          def area(w, h):
              return w * h

          a = area(3, 4)
          print(a, area.__name__)
        `,
        ask: [{ line: 10, name: "a" }, { output: true }],
        hints: [
          md`«area» now means the wrapper. It calls the real «area» with 3 and 4.`,
          md`The real area is 12, and the wrapper doubles it.`,
          md`There is no «functools.wraps», so the name is the wrapper's name.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: before and after",
        task: md`Answer the question without running the program.`,
        code: py`
          def announce(func):
              def wrapper(name):
                  print("before")
                  result = func(name)
                  print("after")
                  return result
              return wrapper

          @announce
          def hello(name):
              print("hello", name)
              return len(name)

          n = hello("Om")
          print(n)
        `,
        ask: [{ output: true }],
        hints: [
          md`The wrapper prints first, then calls the real «hello».`,
          md`The real «hello» prints its own line, and gives back the length of «Om».`,
          md`The wrapper prints «after», then gives back that length, which is printed last.`,
        ],
      },
      {
        id: "f1", kind: "fill", title: "Fill the gaps: shout and keep the name",
        task: md`
          Fill the gaps so the decorator keeps the function's own name, and gives back the wrapper. The program prints:

          | HI ASHA greet
        `,
        template: py`
          import functools

          def shout(func):
              @functools.⟦wraps⟧(func)
              def wrapper(*args, **kwargs):
                  return func(*args, **kwargs).upper()
              return ⟦wrapper⟧

          @shout
          def greet(name):
              return f"hi {name}"

          print(greet("asha"), greet.__name__)
        `,
        tests: [{ output: "HI ASHA greet" }],
        hints: [
          md`If the name shows «wrapper», the tool that copies the name across is missing.`,
          md`If you see a TypeError that NoneType is not callable, the decorator does not give back its inner function.`,
          md`The first gap is the functools tool for wrappers. The second is the name of the inner function.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the bill that became None",
        task: md`
          The program should print:

          | Calling bill
          | Total: 45

          It prints «Total: None» instead. Tap the line that causes it, then fix it.
        `,
        starter: py`
          def log(func):
              def wrapper(*args):
                  print("Calling", func.__name__)
                  func(*args)
              return wrapper

          @log
          def bill(cups, price):
              return cups * price

          print("Total:", bill(3, 15))
        `,
        bugLines: [4],
        solution: py`
          def log(func):
              def wrapper(*args):
                  print("Calling", func.__name__)
                  return func(*args)
              return wrapper

          @log
          def bill(cups, price):
              return cups * price

          print("Total:", bill(3, 15))
        `,
        tests: [{ output: "Calling bill\nTotal: 45" }],
        wrong: [py`
          def log(func):
              def wrapper(*args):
                  print("Calling", func.__name__)
                  return func
              return wrapper

          @log
          def bill(cups, price):
              return cups * price

          print("Total:", bill(3, 15))
        `],
        hints: [
          md`«bill» is the wrapper now. What does the wrapper give back?`,
          md`The real «bill» works out 45, but the wrapper throws that answer away.`,
          md`If you see «<function bill ...>», the wrapper gives back the function itself instead of calling it.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: a wrapper for any function",
        task: md`
          The wrapper takes no values, so «share(600, 4)» stops with a TypeError. Change the wrapper so it accepts any values, by position or by name, and passes them all on. The program then prints:

          | Running share
          | 150.0
          | Running share
          | 30.0
        `,
        starter: py`
          def announce(func):
              def wrapper():
                  print("Running", func.__name__)
                  return func()
              return wrapper

          @announce
          def share(bill, people):
              return bill / people

          print(share(600, 4))
          print(share(bill=90, people=3))
        `,
        solution: py`
          def announce(func):
              def wrapper(*args, **kwargs):
                  print("Running", func.__name__)
                  return func(*args, **kwargs)
              return wrapper

          @announce
          def share(bill, people):
              return bill / people

          print(share(600, 4))
          print(share(bill=90, people=3))
        `,
        tests: [{ output: "Running share\n150.0\nRunning share\n30.0" }],
        wrong: [py`
          def announce(func):
              def wrapper(*args):
                  print("Running", func.__name__)
                  return func(*args)
              return wrapper

          @announce
          def share(bill, people):
              return bill / people

          print(share(600, 4))
          print(share(bill=90, people=3))
        `],
        hints: [
          md`If the first call still fails, the wrapper cannot take values given by position yet.`,
          md`If only the named call fails, the wrapper cannot take values given by name yet.`,
          md`If you see a TypeError about missing values, the wrapper takes them but does not pass them on to the real function.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a decorator that refuses negatives",
        task: md`
          From a blank page, write a decorator «no_negatives». Its wrapper looks at the values given by position. If any of them is a number below 0, it raises «ValueError("Negative value")»; otherwise it calls the function and gives back its answer. Use «functools.wraps», so the name is kept.

          Put it on «def fare(km, rate): return km * rate», then run these lines:

          : print(fare(10, 2))
          : try:
          :     fare(-5, 2)
          : except ValueError as e:
          :     print("Refused:", e)
          : print(fare.__name__)

          It should print:

          | 20
          | Refused: Negative value
          | fare
        `,
        starter: py``,
        solution: py`
          import functools

          def no_negatives(func):
              @functools.wraps(func)
              def wrapper(*args, **kwargs):
                  for value in args:
                      if isinstance(value, (int, float)) and value < 0:
                          raise ValueError("Negative value")
                  return func(*args, **kwargs)
              return wrapper

          @no_negatives
          def fare(km, rate):
              return km * rate

          print(fare(10, 2))
          try:
              fare(-5, 2)
          except ValueError as e:
              print("Refused:", e)
          print(fare.__name__)
        `,
        tests: [
          { output: "20\nRefused: Negative value\nfare" },
          { py: py`
              deco = need("no_negatives", "function")
              add = deco(lambda a, b: a + b)
              assert add(1, 2) == 3, "A decorated function should still give back its answer."
              assert add(0, 0) == 0, "0 is not negative, so it should be allowed."
              refused = False
              try:
                  add(1, -1)
              except ValueError:
                  refused = True
              assert refused, "A negative second value should be refused too."
            ` },
        ],
        wrong: [py`
          import functools

          def no_negatives(func):
              @functools.wraps(func)
              def wrapper(*args, **kwargs):
                  if args[0] < 0:
                      raise ValueError("Negative value")
                  return func(*args, **kwargs)
              return wrapper

          @no_negatives
          def fare(km, rate):
              return km * rate

          print(fare(10, 2))
          try:
              fare(-5, 2)
          except ValueError as e:
              print("Refused:", e)
          print(fare.__name__)
        `, py`
          def no_negatives(func):
              def wrapper(*args, **kwargs):
                  for value in args:
                      if isinstance(value, (int, float)) and value < 0:
                          raise ValueError("Negative value")
                  return func(*args, **kwargs)
              return wrapper

          @no_negatives
          def fare(km, rate):
              return km * rate

          print(fare(10, 2))
          try:
              fare(-5, 2)
          except ValueError as e:
              print("Refused:", e)
          print(fare.__name__)
        `],
        hints: [
          md`If the last line shows «wrapper», the name is not copied across. Put «@functools.wraps(func)» on the wrapper.`,
          md`If a negative second value is allowed, the wrapper checks only the first value. Check every value given by position.`,
          md`If the answer is None, the wrapper calls the function but does not give back its result.`,
        ],
      },
    ],
    keys: [
      md`A **decorator** takes a function and gives back a wrapper that does extra work around it.`,
      md`«@deco» above a def means «name = deco(name)».`,
      md`Give the wrapper «*args, **kwargs», pass them on, and «return» the result.`,
      md`«@functools.wraps(func)» on the wrapper keeps the original function's name.`,
    ],
  });

  // ---------------------------------------------------------------- Day 119
  day({
    slug: "library-system",
    title: "Project: Library Management System",
    goal: "Build a library with a dataclass and your own errors, saved as JSON.",
    minutes: 55,
    kind: "project",
    needs: [116, 117],
    win: "Today you can now build a library system from a dataclass and a class, refuse bad requests with your own errors, save it as JSON and prove it with tests. This completes Week 17.",
    learn: [
      md`
        ## The brief

        A coaching centre's library lends books to its students. Each book has an ISBN (the book's code number), a title, and a number of copies. The library lends a copy if one is left, takes it back from the student who borrowed it, and says no clearly when it cannot.

        You use a dataclass for a Book (Day 116), your own error family for the refusals (Day 117), and JSON to save everything (Day 81). One new tool helps with saving: «asdict» turns a dataclass object into a dictionary, and «Book(**row)» builds it back (Day 109). Guess the output.
      `,
      ex(py`
        from dataclasses import dataclass, asdict

        @dataclass
        class Book:
            isbn: str
            title: str
            copies: int = 1

        b = Book("111", "Indian Polity", 2)
        row = asdict(b)
        print(row)
        print(Book(**row) == b)
      `, { predict: ["{'isbn': '111', 'title': 'Indian Polity', 'copies': 2}\nTrue", "Book(isbn='111', title='Indian Polity', copies=2)\nTrue", "{'isbn': '111', 'title': 'Indian Polity', 'copies': 2}\nFalse"], answer: 0 }),
      md`
        «**row» spreads the dictionary into named values: «Book(isbn="111", title="Indian Polity", copies=2)». The rebuilt book has the same fields, so the free «__eq__» says True.

        ## Five stages

        Stage 1 adds and finds books. Stage 2 lends and takes back copies. Stage 3 reports what is left. Stage 4 saves and loads the library. In Stage 5 you write tests that must catch 4 broken libraries. All titles and ISBNs are invented.
      `,
      pause(md`This project usually takes two sittings. Each stage saves when you pass it, so stop after any stage.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          loans = {}
          loans.setdefault("Asha", []).append("111")
          loans.setdefault("Asha", []).append("222")
          print(loans)
        `, options: ["{'Asha': ['111', '222']}", "{'Asha': ['222']}", "{'Asha': []}"], answer: 0,
        explain: md`«setdefault» makes Asha's list the first time, and gives back her existing list the second time (Day 106).`,
        why: [null, md`«setdefault» does not replace a list that is already there.`, md`Both appends go into the list that «setdefault» gives back.`],
        skill: "trace" },
      { q: md`What does this method do?`, code: py`
          def give_back(self, member, isbn):
              if isbn not in self.loans.get(member, []):
                  raise LibraryError(f"{member} did not borrow {isbn}")
              self.loans[member].remove(isbn)
              self.find(isbn).copies += 1
        `, options: ["It takes a copy back only from the member who borrowed it", "It takes a copy back from anyone", "It lends a copy"],
        answer: 0, verify: false, mono: false,
        explain: md`It checks the member's loans first, and refuses before it changes anything.`,
        why: [null, md`Anyone else gets a LibraryError, and the copies do not change.`, md`It adds a copy back. Lending takes one away.`],
        skill: "read" },
      { q: md`A library lends a book with 0 copies left, and the copies become −1. What is the most likely mistake in «lend»?`,
        options: ["It takes the copy away before it checks how many are left", "It uses a dataclass", "It saves to JSON"], answer: 0, verify: false, mono: false,
        explain: md`Check first, then change (Day 94). Refuse with NoCopies before taking a copy away.`,
        why: [null, md`A dataclass holds the copies fine. The order of the lines is the problem.`, md`Saving happens later. The count went wrong when lending.`],
        skill: "debug" },
      { q: md`What does «asdict(book)» give back for a dataclass object?`,
        options: ["A dictionary of its fields, ready for JSON", "A JSON text", "A list of its methods"], answer: 0, verify: false, mono: false,
        explain: md`Each field name becomes a key. «json.dump» can then save it.`,
        why: [null, md`«json.dumps» makes the text. «asdict» gives a dictionary.`, md`It gives the field values, not the methods.`],
        skill: "memory" },
      { q: md`The caller wants to say "Sorry" for no copies, and "Refused" for every other library problem. Which except blocks?`,
        options: ["«except NoCopies» first, then «except LibraryError»", "«except LibraryError» first, then «except NoCopies»", "Only «except Exception»"], answer: 0, verify: false, mono: false,
        explain: md`The child first, then the parent, which catches the rest of the family (Day 117).`,
        why: [null, md`The parent would catch NoCopies too, so "Sorry" would never show.`, md`That also hides real bugs, like a misspelled name.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "s1", stage: 1, title: "Stage 1: add and find",
        task: md`
          Finish two methods of «Library»:

          - «add(book)» stores the book under its ISBN. If that ISBN is already there, it adds the new copies to the book already there.
          - «find(isbn)» gives back the Book, or raises «NotFound(f"No book {isbn}")».

          The program should print:

          | Book(isbn='111', title='Indian Polity', copies=3)
          | Refused: No book 999
        `,
        starter: py`
          import json
          from dataclasses import dataclass, asdict


          class LibraryError(Exception):
              pass


          class NotFound(LibraryError):
              pass


          class NoCopies(LibraryError):
              pass


          @dataclass
          class Book:
              isbn: str
              title: str
              copies: int = 1


          class Library:
              def __init__(self):
                  self.books = {}

              def add(self, book):
                  # adds the book, or adds its copies to the same book already there
                  pass

              def find(self, isbn):
                  # gives back the Book, or raises NotFound
                  pass


          lib = Library()
          lib.add(Book("111", "Indian Polity", 2))
          lib.add(Book("222", "Lucent GK"))
          lib.add(Book("111", "Indian Polity", 1))
          print(lib.find("111"))
          try:
              lib.find("999")
          except LibraryError as e:
              print("Refused:", e)
        `,
        solution: py`
          import json
          from dataclasses import dataclass, asdict


          class LibraryError(Exception):
              pass


          class NotFound(LibraryError):
              pass


          class NoCopies(LibraryError):
              pass


          @dataclass
          class Book:
              isbn: str
              title: str
              copies: int = 1


          class Library:
              def __init__(self):
                  self.books = {}

              def add(self, book):
                  # adds the book, or adds its copies to the same book already there
                  if book.isbn in self.books:
                      self.books[book.isbn].copies += book.copies
                  else:
                      self.books[book.isbn] = book

              def find(self, isbn):
                  # gives back the Book, or raises NotFound
                  if isbn not in self.books:
                      raise NotFound(f"No book {isbn}")
                  return self.books[isbn]


          lib = Library()
          lib.add(Book("111", "Indian Polity", 2))
          lib.add(Book("222", "Lucent GK"))
          lib.add(Book("111", "Indian Polity", 1))
          print(lib.find("111"))
          try:
              lib.find("999")
          except LibraryError as e:
              print("Refused:", e)
        `,
        tests: [
          { output: "Book(isbn='111', title='Indian Polity', copies=3)\nRefused: No book 999" },
          { py: py`
              B = need("Book")
              lib = new("Library")
              lib.add(B("1", "A", 2))
              lib.add(B("1", "A", 3))
              assert lib.find("1").copies == 5, "Adding 2 copies, then 3 more of the same ISBN, should leave 5 copies."
              raised = None
              try:
                  lib.find("x")
              except Exception as e:
                  raised = e
              assert type(raised).__name__ == "NotFound", f"find('x') should raise NotFound, but it gave {raised!r}."
            ` },
        ],
        wrong: [py`
          import json
          from dataclasses import dataclass, asdict


          class LibraryError(Exception):
              pass


          class NotFound(LibraryError):
              pass


          class NoCopies(LibraryError):
              pass


          @dataclass
          class Book:
              isbn: str
              title: str
              copies: int = 1


          class Library:
              def __init__(self):
                  self.books = {}

              def add(self, book):
                  # adds the book, or adds its copies to the same book already there
                  if book.isbn in self.books:
                      self.books[book.isbn] = book
                  else:
                      self.books[book.isbn] = book

              def find(self, isbn):
                  # gives back the Book, or raises NotFound
                  if isbn not in self.books:
                      raise NotFound(f"No book {isbn}")
                  return self.books[isbn]


          lib = Library()
          lib.add(Book("111", "Indian Polity", 2))
          lib.add(Book("222", "Lucent GK"))
          lib.add(Book("111", "Indian Polity", 1))
          print(lib.find("111"))
          try:
              lib.find("999")
          except LibraryError as e:
              print("Refused:", e)
        `],
        hints: [
          md`If the copies show 1 instead of 3, the second «add» replaces the book. Add the new copies to the book already there.`,
          md`If you see KeyError for 999, check whether the ISBN is a key before you look it up, and raise NotFound.`,
          md`If you see «None», «find» does not give back the book.`,
        ],
      },
      {
        id: "s2", stage: 2, carry: "s1", title: "Stage 2: lend and take back",
        task: md`
          Add «self.loans = {}» in «__init__»: each member's name, with a list of the ISBNs they hold. Then add two methods:

          - «lend(member, isbn)» finds the book, raises «NoCopies(f"No copies of {book.title} left")» if none are left, and otherwise takes one copy away and adds the ISBN to that member's list.
          - «give_back(member, isbn)» raises «LibraryError(f"{member} did not borrow {isbn}")» if the member does not hold it. Otherwise it removes the ISBN from their list and adds the copy back.

          Then add these lines at the end:

          : for member, isbn in [("Asha", "222"), ("Ravi", "222"), ("Ravi", "999")]:
          :     try:
          :         lib.lend(member, isbn)
          :         print("Lent", isbn, "to", member)
          :     except NoCopies as e:
          :         print("Sorry:", e)
          :     except LibraryError as e:
          :         print("Refused:", e)
          : lib.give_back("Asha", "222")
          : print(lib.find("222").copies, lib.loans)

          The last four lines printed are:

          | Lent 222 to Asha
          | Sorry: No copies of Lucent GK left
          | Refused: No book 999
          | 1 {'Asha': []}
        `,
        starter: py`
          import json
          from dataclasses import dataclass, asdict


          class LibraryError(Exception):
              pass


          class NotFound(LibraryError):
              pass


          class NoCopies(LibraryError):
              pass


          @dataclass
          class Book:
              isbn: str
              title: str
              copies: int = 1


          class Library:
              def __init__(self):
                  self.books = {}

              def add(self, book):
                  # adds the book, or adds its copies to the same book already there
                  if book.isbn in self.books:
                      self.books[book.isbn].copies += book.copies
                  else:
                      self.books[book.isbn] = book

              def find(self, isbn):
                  # gives back the Book, or raises NotFound
                  if isbn not in self.books:
                      raise NotFound(f"No book {isbn}")
                  return self.books[isbn]


          lib = Library()
          lib.add(Book("111", "Indian Polity", 2))
          lib.add(Book("222", "Lucent GK"))
          lib.add(Book("111", "Indian Polity", 1))
          print(lib.find("111"))
          try:
              lib.find("999")
          except LibraryError as e:
              print("Refused:", e)
        `,
        solution: py`
          import json
          from dataclasses import dataclass, asdict


          class LibraryError(Exception):
              pass


          class NotFound(LibraryError):
              pass


          class NoCopies(LibraryError):
              pass


          @dataclass
          class Book:
              isbn: str
              title: str
              copies: int = 1


          class Library:
              def __init__(self):
                  self.books = {}
                  self.loans = {}

              def add(self, book):
                  # adds the book, or adds its copies to the same book already there
                  if book.isbn in self.books:
                      self.books[book.isbn].copies += book.copies
                  else:
                      self.books[book.isbn] = book

              def find(self, isbn):
                  # gives back the Book, or raises NotFound
                  if isbn not in self.books:
                      raise NotFound(f"No book {isbn}")
                  return self.books[isbn]

              def lend(self, member, isbn):
                  # lends one copy, or raises NotFound or NoCopies
                  book = self.find(isbn)
                  if book.copies == 0:
                      raise NoCopies(f"No copies of {book.title} left")
                  book.copies -= 1
                  self.loans.setdefault(member, []).append(isbn)

              def give_back(self, member, isbn):
                  # takes one copy back, or raises LibraryError if the member did not borrow it
                  if isbn not in self.loans.get(member, []):
                      raise LibraryError(f"{member} did not borrow {isbn}")
                  self.loans[member].remove(isbn)
                  self.find(isbn).copies += 1


          lib = Library()
          lib.add(Book("111", "Indian Polity", 2))
          lib.add(Book("222", "Lucent GK"))
          lib.add(Book("111", "Indian Polity", 1))
          print(lib.find("111"))
          try:
              lib.find("999")
          except LibraryError as e:
              print("Refused:", e)

          for member, isbn in [("Asha", "222"), ("Ravi", "222"), ("Ravi", "999")]:
              try:
                  lib.lend(member, isbn)
                  print("Lent", isbn, "to", member)
              except NoCopies as e:
                  print("Sorry:", e)
              except LibraryError as e:
                  print("Refused:", e)
          lib.give_back("Asha", "222")
          print(lib.find("222").copies, lib.loans)
        `,
        tests: [
          { output: "Book(isbn='111', title='Indian Polity', copies=3)\nRefused: No book 999\nLent 222 to Asha\nSorry: No copies of Lucent GK left\nRefused: No book 999\n1 {'Asha': []}" },
          { py: py`
              B = need("Book")
              lib = new("Library")
              lib.add(B("5", "Maths", 1))
              lib.lend("Om", "5")
              raised = None
              try:
                  lib.lend("Dev", "5")
              except Exception as e:
                  raised = e
              assert type(raised).__name__ == "NoCopies", f"Lending the last copy twice should raise NoCopies, but it gave {raised!r}."
              assert lib.find("5").copies == 0, "A refused loan must not change the copies."
              raised = None
              try:
                  lib.give_back("Dev", "5")
              except Exception as e:
                  raised = e
              assert type(raised).__name__ == "LibraryError", "Dev never borrowed it, so give_back should raise LibraryError."
              assert lib.find("5").copies == 0, "A refused return must not change the copies."
              lib.give_back("Om", "5")
              assert lib.find("5").copies == 1, "After Om gives it back, 1 copy should be left."
            ` },
        ],
        wrong: [py`
          import json
          from dataclasses import dataclass, asdict


          class LibraryError(Exception):
              pass


          class NotFound(LibraryError):
              pass


          class NoCopies(LibraryError):
              pass


          @dataclass
          class Book:
              isbn: str
              title: str
              copies: int = 1


          class Library:
              def __init__(self):
                  self.books = {}
                  self.loans = {}

              def add(self, book):
                  # adds the book, or adds its copies to the same book already there
                  if book.isbn in self.books:
                      self.books[book.isbn].copies += book.copies
                  else:
                      self.books[book.isbn] = book

              def find(self, isbn):
                  # gives back the Book, or raises NotFound
                  if isbn not in self.books:
                      raise NotFound(f"No book {isbn}")
                  return self.books[isbn]

              def lend(self, member, isbn):
                  # lends one copy, or raises NotFound or NoCopies
                  book = self.find(isbn)
                  book.copies -= 1
                  if book.copies < 0:
                      raise NoCopies(f"No copies of {book.title} left")
                  self.loans.setdefault(member, []).append(isbn)

              def give_back(self, member, isbn):
                  # takes one copy back, or raises LibraryError if the member did not borrow it
                  if isbn not in self.loans.get(member, []):
                      raise LibraryError(f"{member} did not borrow {isbn}")
                  self.loans[member].remove(isbn)
                  self.find(isbn).copies += 1


          lib = Library()
          lib.add(Book("111", "Indian Polity", 2))
          lib.add(Book("222", "Lucent GK"))
          lib.add(Book("111", "Indian Polity", 1))
          print(lib.find("111"))
          try:
              lib.find("999")
          except LibraryError as e:
              print("Refused:", e)

          for member, isbn in [("Asha", "222"), ("Ravi", "222"), ("Ravi", "999")]:
              try:
                  lib.lend(member, isbn)
                  print("Lent", isbn, "to", member)
              except NoCopies as e:
                  print("Sorry:", e)
              except LibraryError as e:
                  print("Refused:", e)
          lib.give_back("Asha", "222")
          print(lib.find("222").copies, lib.loans)
        `],
        hints: [
          md`If the last line shows 0, a refused loan still took a copy away. Check the copies before you change them.`,
          md`If you see KeyError for a member, use «setdefault» to make their list the first time they borrow.`,
          md`If a test says a refused return changed the copies, check the member's list before you add the copy back.`,
        ],
      },
      {
        id: "s3", stage: 3, carry: "s2", title: "Stage 3: what is left",
        task: md`
          Add two methods:

          - «report()» gives back a list of lines like «"Lucent GK: 1 left"», one for each book, A to Z by title.
          - «on_loan()» gives back how many copies are lent out, for all members together.

          Then add these lines at the end:

          : lib.lend("Ravi", "111")
          : for line in lib.report():
          :     print(line)
          : print("On loan:", lib.on_loan())

          The last three lines printed are:

          | Indian Polity: 2 left
          | Lucent GK: 1 left
          | On loan: 1
        `,
        starter: py`
          import json
          from dataclasses import dataclass, asdict


          class LibraryError(Exception):
              pass


          class NotFound(LibraryError):
              pass


          class NoCopies(LibraryError):
              pass


          @dataclass
          class Book:
              isbn: str
              title: str
              copies: int = 1


          class Library:
              def __init__(self):
                  self.books = {}
                  self.loans = {}

              def add(self, book):
                  # adds the book, or adds its copies to the same book already there
                  if book.isbn in self.books:
                      self.books[book.isbn].copies += book.copies
                  else:
                      self.books[book.isbn] = book

              def find(self, isbn):
                  # gives back the Book, or raises NotFound
                  if isbn not in self.books:
                      raise NotFound(f"No book {isbn}")
                  return self.books[isbn]

              def lend(self, member, isbn):
                  # lends one copy, or raises NotFound or NoCopies
                  book = self.find(isbn)
                  if book.copies == 0:
                      raise NoCopies(f"No copies of {book.title} left")
                  book.copies -= 1
                  self.loans.setdefault(member, []).append(isbn)

              def give_back(self, member, isbn):
                  # takes one copy back, or raises LibraryError if the member did not borrow it
                  if isbn not in self.loans.get(member, []):
                      raise LibraryError(f"{member} did not borrow {isbn}")
                  self.loans[member].remove(isbn)
                  self.find(isbn).copies += 1


          lib = Library()
          lib.add(Book("111", "Indian Polity", 2))
          lib.add(Book("222", "Lucent GK"))
          lib.add(Book("111", "Indian Polity", 1))
          print(lib.find("111"))
          try:
              lib.find("999")
          except LibraryError as e:
              print("Refused:", e)

          for member, isbn in [("Asha", "222"), ("Ravi", "222"), ("Ravi", "999")]:
              try:
                  lib.lend(member, isbn)
                  print("Lent", isbn, "to", member)
              except NoCopies as e:
                  print("Sorry:", e)
              except LibraryError as e:
                  print("Refused:", e)
          lib.give_back("Asha", "222")
          print(lib.find("222").copies, lib.loans)
        `,
        solution: py`
          import json
          from dataclasses import dataclass, asdict


          class LibraryError(Exception):
              pass


          class NotFound(LibraryError):
              pass


          class NoCopies(LibraryError):
              pass


          @dataclass
          class Book:
              isbn: str
              title: str
              copies: int = 1


          class Library:
              def __init__(self):
                  self.books = {}
                  self.loans = {}

              def add(self, book):
                  # adds the book, or adds its copies to the same book already there
                  if book.isbn in self.books:
                      self.books[book.isbn].copies += book.copies
                  else:
                      self.books[book.isbn] = book

              def find(self, isbn):
                  # gives back the Book, or raises NotFound
                  if isbn not in self.books:
                      raise NotFound(f"No book {isbn}")
                  return self.books[isbn]

              def lend(self, member, isbn):
                  # lends one copy, or raises NotFound or NoCopies
                  book = self.find(isbn)
                  if book.copies == 0:
                      raise NoCopies(f"No copies of {book.title} left")
                  book.copies -= 1
                  self.loans.setdefault(member, []).append(isbn)

              def give_back(self, member, isbn):
                  # takes one copy back, or raises LibraryError if the member did not borrow it
                  if isbn not in self.loans.get(member, []):
                      raise LibraryError(f"{member} did not borrow {isbn}")
                  self.loans[member].remove(isbn)
                  self.find(isbn).copies += 1

              def report(self):
                  # gives back one line for each book, A to Z by title
                  lines = []
                  for book in sorted(self.books.values(), key=lambda b: b.title):
                      lines.append(f"{book.title}: {book.copies} left")
                  return lines

              def on_loan(self):
                  # gives back how many copies are lent out, for all members together
                  return sum(len(isbns) for isbns in self.loans.values())


          lib = Library()
          lib.add(Book("111", "Indian Polity", 2))
          lib.add(Book("222", "Lucent GK"))
          lib.add(Book("111", "Indian Polity", 1))
          print(lib.find("111"))
          try:
              lib.find("999")
          except LibraryError as e:
              print("Refused:", e)

          for member, isbn in [("Asha", "222"), ("Ravi", "222"), ("Ravi", "999")]:
              try:
                  lib.lend(member, isbn)
                  print("Lent", isbn, "to", member)
              except NoCopies as e:
                  print("Sorry:", e)
              except LibraryError as e:
                  print("Refused:", e)
          lib.give_back("Asha", "222")
          print(lib.find("222").copies, lib.loans)

          lib.lend("Ravi", "111")
          for line in lib.report():
              print(line)
          print("On loan:", lib.on_loan())
        `,
        tests: [
          { contains: ["Indian Polity: 2 left\nLucent GK: 1 left\nOn loan: 1"] },
          { py: py`
              B = need("Book")
              lib = new("Library")
              lib.add(B("2", "Zoology", 2))
              lib.add(B("1", "Algebra", 3))
              assert lib.report() == ["Algebra: 3 left", "Zoology: 2 left"], f"The report should be A to Z by title, but it is {lib.report()}."
              lib.lend("Om", "1")
              lib.lend("Om", "2")
              lib.lend("Dev", "1")
              assert lib.on_loan() == 3, f"Om holds 2 copies and Dev holds 1, so 3 are on loan, but on_loan gave {lib.on_loan()}."
            ` },
        ],
        wrong: [py`
          import json
          from dataclasses import dataclass, asdict


          class LibraryError(Exception):
              pass


          class NotFound(LibraryError):
              pass


          class NoCopies(LibraryError):
              pass


          @dataclass
          class Book:
              isbn: str
              title: str
              copies: int = 1


          class Library:
              def __init__(self):
                  self.books = {}
                  self.loans = {}

              def add(self, book):
                  # adds the book, or adds its copies to the same book already there
                  if book.isbn in self.books:
                      self.books[book.isbn].copies += book.copies
                  else:
                      self.books[book.isbn] = book

              def find(self, isbn):
                  # gives back the Book, or raises NotFound
                  if isbn not in self.books:
                      raise NotFound(f"No book {isbn}")
                  return self.books[isbn]

              def lend(self, member, isbn):
                  # lends one copy, or raises NotFound or NoCopies
                  book = self.find(isbn)
                  if book.copies == 0:
                      raise NoCopies(f"No copies of {book.title} left")
                  book.copies -= 1
                  self.loans.setdefault(member, []).append(isbn)

              def give_back(self, member, isbn):
                  # takes one copy back, or raises LibraryError if the member did not borrow it
                  if isbn not in self.loans.get(member, []):
                      raise LibraryError(f"{member} did not borrow {isbn}")
                  self.loans[member].remove(isbn)
                  self.find(isbn).copies += 1

              def report(self):
                  # gives back one line for each book, A to Z by title
                  lines = []
                  for book in sorted(self.books.values(), key=lambda b: b.title):
                      lines.append(f"{book.title}: {book.copies} left")
                  return lines

              def on_loan(self):
                  # gives back how many copies are lent out, for all members together
                  return len(self.loans)


          lib = Library()
          lib.add(Book("111", "Indian Polity", 2))
          lib.add(Book("222", "Lucent GK"))
          lib.add(Book("111", "Indian Polity", 1))
          print(lib.find("111"))
          try:
              lib.find("999")
          except LibraryError as e:
              print("Refused:", e)

          for member, isbn in [("Asha", "222"), ("Ravi", "222"), ("Ravi", "999")]:
              try:
                  lib.lend(member, isbn)
                  print("Lent", isbn, "to", member)
              except NoCopies as e:
                  print("Sorry:", e)
              except LibraryError as e:
                  print("Refused:", e)
          lib.give_back("Asha", "222")
          print(lib.find("222").copies, lib.loans)

          lib.lend("Ravi", "111")
          for line in lib.report():
              print(line)
          print("On loan:", lib.on_loan())
        `],
        hints: [
          md`If «On loan» counts members instead of copies, add up the length of every member's list.`,
          md`If the report follows the order the books were added, sort the books by title first.`,
          md`If you see «Book(...)» in the report, build the line text from the title and the copies.`,
        ],
      },
      {
        id: "s4", stage: 4, carry: "s3", title: "Stage 4: save and load",
        task: md`
          Add two methods:

          - «save(path)» writes «{"books": [...], "loans": ...}» to a JSON file. Each book goes in as «asdict(book)».
          - «load(path)», a class method, gives back a new Library built from the file: each book rebuilt with «Book(**row)», and the loans as saved. If there is no file, it gives back an empty Library.

          Then add these lines at the end:

          : lib.save("library.json")
          : again = Library.load("library.json")
          : print(again.report(), again.on_loan())
          : print(Library.load("missing.json").report())

          The last two lines printed are:

          | ['Indian Polity: 2 left', 'Lucent GK: 1 left'] 1
          | []
        `,
        starter: py`
          import json
          from dataclasses import dataclass, asdict


          class LibraryError(Exception):
              pass


          class NotFound(LibraryError):
              pass


          class NoCopies(LibraryError):
              pass


          @dataclass
          class Book:
              isbn: str
              title: str
              copies: int = 1


          class Library:
              def __init__(self):
                  self.books = {}
                  self.loans = {}

              def add(self, book):
                  # adds the book, or adds its copies to the same book already there
                  if book.isbn in self.books:
                      self.books[book.isbn].copies += book.copies
                  else:
                      self.books[book.isbn] = book

              def find(self, isbn):
                  # gives back the Book, or raises NotFound
                  if isbn not in self.books:
                      raise NotFound(f"No book {isbn}")
                  return self.books[isbn]

              def lend(self, member, isbn):
                  # lends one copy, or raises NotFound or NoCopies
                  book = self.find(isbn)
                  if book.copies == 0:
                      raise NoCopies(f"No copies of {book.title} left")
                  book.copies -= 1
                  self.loans.setdefault(member, []).append(isbn)

              def give_back(self, member, isbn):
                  # takes one copy back, or raises LibraryError if the member did not borrow it
                  if isbn not in self.loans.get(member, []):
                      raise LibraryError(f"{member} did not borrow {isbn}")
                  self.loans[member].remove(isbn)
                  self.find(isbn).copies += 1

              def report(self):
                  # gives back one line for each book, A to Z by title
                  lines = []
                  for book in sorted(self.books.values(), key=lambda b: b.title):
                      lines.append(f"{book.title}: {book.copies} left")
                  return lines

              def on_loan(self):
                  # gives back how many copies are lent out, for all members together
                  return sum(len(isbns) for isbns in self.loans.values())


          lib = Library()
          lib.add(Book("111", "Indian Polity", 2))
          lib.add(Book("222", "Lucent GK"))
          lib.add(Book("111", "Indian Polity", 1))
          print(lib.find("111"))
          try:
              lib.find("999")
          except LibraryError as e:
              print("Refused:", e)

          for member, isbn in [("Asha", "222"), ("Ravi", "222"), ("Ravi", "999")]:
              try:
                  lib.lend(member, isbn)
                  print("Lent", isbn, "to", member)
              except NoCopies as e:
                  print("Sorry:", e)
              except LibraryError as e:
                  print("Refused:", e)
          lib.give_back("Asha", "222")
          print(lib.find("222").copies, lib.loans)

          lib.lend("Ravi", "111")
          for line in lib.report():
              print(line)
          print("On loan:", lib.on_loan())
        `,
        solution: py`
          import json
          from dataclasses import dataclass, asdict


          class LibraryError(Exception):
              pass


          class NotFound(LibraryError):
              pass


          class NoCopies(LibraryError):
              pass


          @dataclass
          class Book:
              isbn: str
              title: str
              copies: int = 1


          class Library:
              def __init__(self):
                  self.books = {}
                  self.loans = {}

              def add(self, book):
                  # adds the book, or adds its copies to the same book already there
                  if book.isbn in self.books:
                      self.books[book.isbn].copies += book.copies
                  else:
                      self.books[book.isbn] = book

              def find(self, isbn):
                  # gives back the Book, or raises NotFound
                  if isbn not in self.books:
                      raise NotFound(f"No book {isbn}")
                  return self.books[isbn]

              def lend(self, member, isbn):
                  # lends one copy, or raises NotFound or NoCopies
                  book = self.find(isbn)
                  if book.copies == 0:
                      raise NoCopies(f"No copies of {book.title} left")
                  book.copies -= 1
                  self.loans.setdefault(member, []).append(isbn)

              def give_back(self, member, isbn):
                  # takes one copy back, or raises LibraryError if the member did not borrow it
                  if isbn not in self.loans.get(member, []):
                      raise LibraryError(f"{member} did not borrow {isbn}")
                  self.loans[member].remove(isbn)
                  self.find(isbn).copies += 1

              def report(self):
                  # gives back one line for each book, A to Z by title
                  lines = []
                  for book in sorted(self.books.values(), key=lambda b: b.title):
                      lines.append(f"{book.title}: {book.copies} left")
                  return lines

              def on_loan(self):
                  # gives back how many copies are lent out, for all members together
                  return sum(len(isbns) for isbns in self.loans.values())

              def save(self, path):
                  # writes the books and the loans to a JSON file
                  data = {"books": [asdict(b) for b in self.books.values()], "loans": self.loans}
                  with open(path, "w", encoding="utf-8") as f:
                      json.dump(data, f)

              @classmethod
              def load(cls, path):
                  # gives back a Library from the file, or an empty Library if there is no file
                  lib = cls()
                  try:
                      with open(path, encoding="utf-8") as f:
                          data = json.load(f)
                  except FileNotFoundError:
                      return lib
                  for row in data["books"]:
                      lib.add(Book(**row))
                  lib.loans = data["loans"]
                  return lib


          lib = Library()
          lib.add(Book("111", "Indian Polity", 2))
          lib.add(Book("222", "Lucent GK"))
          lib.add(Book("111", "Indian Polity", 1))
          print(lib.find("111"))
          try:
              lib.find("999")
          except LibraryError as e:
              print("Refused:", e)

          for member, isbn in [("Asha", "222"), ("Ravi", "222"), ("Ravi", "999")]:
              try:
                  lib.lend(member, isbn)
                  print("Lent", isbn, "to", member)
              except NoCopies as e:
                  print("Sorry:", e)
              except LibraryError as e:
                  print("Refused:", e)
          lib.give_back("Asha", "222")
          print(lib.find("222").copies, lib.loans)

          lib.lend("Ravi", "111")
          for line in lib.report():
              print(line)
          print("On loan:", lib.on_loan())

          lib.save("library.json")
          again = Library.load("library.json")
          print(again.report(), again.on_loan())
          print(Library.load("missing.json").report())
        `,
        tests: [
          { contains: ["['Indian Polity: 2 left', 'Lucent GK: 1 left'] 1\n[]"] },
          { py: py`
              import json
              L = need("Library", "class")
              B = need("Book")
              lib = L()
              lib.add(B("7", "History", 4))
              lib.lend("Asha", "7")
              lib.save("test_library.json")
              data = json.loads(file_text("test_library.json"))
              assert data["books"] == [{"isbn": "7", "title": "History", "copies": 3}], f"The saved books should be a list of dictionaries, but they are {data['books']}."
              back = L.load("test_library.json")
              assert back.find("7").copies == 3 and back.loans == {"Asha": ["7"]}, "Loading should give back the same books and loans that were saved."
              assert L.load("no_such_file.json").report() == [], "Loading a missing file should give an empty library."
            ` },
        ],
        wrong: [py`
          import json
          from dataclasses import dataclass, asdict


          class LibraryError(Exception):
              pass


          class NotFound(LibraryError):
              pass


          class NoCopies(LibraryError):
              pass


          @dataclass
          class Book:
              isbn: str
              title: str
              copies: int = 1


          class Library:
              def __init__(self):
                  self.books = {}
                  self.loans = {}

              def add(self, book):
                  # adds the book, or adds its copies to the same book already there
                  if book.isbn in self.books:
                      self.books[book.isbn].copies += book.copies
                  else:
                      self.books[book.isbn] = book

              def find(self, isbn):
                  # gives back the Book, or raises NotFound
                  if isbn not in self.books:
                      raise NotFound(f"No book {isbn}")
                  return self.books[isbn]

              def lend(self, member, isbn):
                  # lends one copy, or raises NotFound or NoCopies
                  book = self.find(isbn)
                  if book.copies == 0:
                      raise NoCopies(f"No copies of {book.title} left")
                  book.copies -= 1
                  self.loans.setdefault(member, []).append(isbn)

              def give_back(self, member, isbn):
                  # takes one copy back, or raises LibraryError if the member did not borrow it
                  if isbn not in self.loans.get(member, []):
                      raise LibraryError(f"{member} did not borrow {isbn}")
                  self.loans[member].remove(isbn)
                  self.find(isbn).copies += 1

              def report(self):
                  # gives back one line for each book, A to Z by title
                  lines = []
                  for book in sorted(self.books.values(), key=lambda b: b.title):
                      lines.append(f"{book.title}: {book.copies} left")
                  return lines

              def on_loan(self):
                  # gives back how many copies are lent out, for all members together
                  return sum(len(isbns) for isbns in self.loans.values())

              def save(self, path):
                  # writes the books and the loans to a JSON file
                  data = {"books": [asdict(b) for b in self.books.values()], "loans": self.loans}
                  with open(path, "w", encoding="utf-8") as f:
                      json.dump(data, f)

              @classmethod
              def load(cls, path):
                  # gives back a Library from the file, or an empty Library if there is no file
                  lib = cls()
                  with open(path, encoding="utf-8") as f:
                      data = json.load(f)
                  for row in data["books"]:
                      lib.add(Book(**row))
                  lib.loans = data["loans"]
                  return lib


          lib = Library()
          lib.add(Book("111", "Indian Polity", 2))
          lib.add(Book("222", "Lucent GK"))
          lib.add(Book("111", "Indian Polity", 1))
          print(lib.find("111"))
          try:
              lib.find("999")
          except LibraryError as e:
              print("Refused:", e)

          for member, isbn in [("Asha", "222"), ("Ravi", "222"), ("Ravi", "999")]:
              try:
                  lib.lend(member, isbn)
                  print("Lent", isbn, "to", member)
              except NoCopies as e:
                  print("Sorry:", e)
              except LibraryError as e:
                  print("Refused:", e)
          lib.give_back("Asha", "222")
          print(lib.find("222").copies, lib.loans)

          lib.lend("Ravi", "111")
          for line in lib.report():
              print(line)
          print("On loan:", lib.on_loan())

          lib.save("library.json")
          again = Library.load("library.json")
          print(again.report(), again.on_loan())
          print(Library.load("missing.json").report())
        `],
        hints: [
          md`If «missing.json» stops the program with FileNotFoundError, catch that one error and give back an empty Library.`,
          md`If you see «Object of type Book is not JSON serializable», save each book as «asdict(book)».`,
          md`If the loaded copies are wrong, rebuild each book with «Book(**row)» and add it with «add».`,
        ],
      },
      {
        id: "c1", stage: 5, kind: "catch", title: "Stage 5: catch 4 broken libraries",
        task: md`
          The correct library is shown, without saving and loading. There are **4 secretly broken versions** of it. Each gets adding, lending, taking back or the report a little wrong. Write asserts that pass on the correct library and fail on every broken one.

          Build a small library in your asserts, and work out each answer by hand first. To check that something is refused, use «try» and a True or False name, then assert it (Day 73).
        `,
        target: py`
          import json
          from dataclasses import dataclass, asdict


          class LibraryError(Exception):
              pass


          class NotFound(LibraryError):
              pass


          class NoCopies(LibraryError):
              pass


          @dataclass
          class Book:
              isbn: str
              title: str
              copies: int = 1


          class Library:
              def __init__(self):
                  self.books = {}
                  self.loans = {}

              def add(self, book):
                  # adds the book, or adds its copies to the same book already there
                  if book.isbn in self.books:
                      self.books[book.isbn].copies += book.copies
                  else:
                      self.books[book.isbn] = book

              def find(self, isbn):
                  # gives back the Book, or raises NotFound
                  if isbn not in self.books:
                      raise NotFound(f"No book {isbn}")
                  return self.books[isbn]

              def lend(self, member, isbn):
                  # lends one copy, or raises NotFound or NoCopies
                  book = self.find(isbn)
                  if book.copies == 0:
                      raise NoCopies(f"No copies of {book.title} left")
                  book.copies -= 1
                  self.loans.setdefault(member, []).append(isbn)

              def give_back(self, member, isbn):
                  # takes one copy back, or raises LibraryError if the member did not borrow it
                  if isbn not in self.loans.get(member, []):
                      raise LibraryError(f"{member} did not borrow {isbn}")
                  self.loans[member].remove(isbn)
                  self.find(isbn).copies += 1

              def report(self):
                  # gives back one line for each book, A to Z by title
                  lines = []
                  for book in sorted(self.books.values(), key=lambda b: b.title):
                      lines.append(f"{book.title}: {book.copies} left")
                  return lines

              def on_loan(self):
                  # gives back how many copies are lent out, for all members together
                  return sum(len(isbns) for isbns in self.loans.values())
        `,
        broken: [
          // 1: adding a book again replaces its copies.
          py`
            import json
            from dataclasses import dataclass, asdict


            class LibraryError(Exception):
                pass


            class NotFound(LibraryError):
                pass


            class NoCopies(LibraryError):
                pass


            @dataclass
            class Book:
                isbn: str
                title: str
                copies: int = 1


            class Library:
                def __init__(self):
                    self.books = {}
                    self.loans = {}

                def add(self, book):
                    # adds the book, or adds its copies to the same book already there
                    if book.isbn in self.books:
                        self.books[book.isbn] = book
                    else:
                        self.books[book.isbn] = book

                def find(self, isbn):
                    # gives back the Book, or raises NotFound
                    if isbn not in self.books:
                        raise NotFound(f"No book {isbn}")
                    return self.books[isbn]

                def lend(self, member, isbn):
                    # lends one copy, or raises NotFound or NoCopies
                    book = self.find(isbn)
                    if book.copies == 0:
                        raise NoCopies(f"No copies of {book.title} left")
                    book.copies -= 1
                    self.loans.setdefault(member, []).append(isbn)

                def give_back(self, member, isbn):
                    # takes one copy back, or raises LibraryError if the member did not borrow it
                    if isbn not in self.loans.get(member, []):
                        raise LibraryError(f"{member} did not borrow {isbn}")
                    self.loans[member].remove(isbn)
                    self.find(isbn).copies += 1

                def report(self):
                    # gives back one line for each book, A to Z by title
                    lines = []
                    for book in sorted(self.books.values(), key=lambda b: b.title):
                        lines.append(f"{book.title}: {book.copies} left")
                    return lines

                def on_loan(self):
                    # gives back how many copies are lent out, for all members together
                    return sum(len(isbns) for isbns in self.loans.values())
          `,
          // 2: lends even when no copies are left.
          py`
            import json
            from dataclasses import dataclass, asdict


            class LibraryError(Exception):
                pass


            class NotFound(LibraryError):
                pass


            class NoCopies(LibraryError):
                pass


            @dataclass
            class Book:
                isbn: str
                title: str
                copies: int = 1


            class Library:
                def __init__(self):
                    self.books = {}
                    self.loans = {}

                def add(self, book):
                    # adds the book, or adds its copies to the same book already there
                    if book.isbn in self.books:
                        self.books[book.isbn].copies += book.copies
                    else:
                        self.books[book.isbn] = book

                def find(self, isbn):
                    # gives back the Book, or raises NotFound
                    if isbn not in self.books:
                        raise NotFound(f"No book {isbn}")
                    return self.books[isbn]

                def lend(self, member, isbn):
                    # lends one copy, or raises NotFound or NoCopies
                    book = self.find(isbn)
                    book.copies -= 1
                    self.loans.setdefault(member, []).append(isbn)

                def give_back(self, member, isbn):
                    # takes one copy back, or raises LibraryError if the member did not borrow it
                    if isbn not in self.loans.get(member, []):
                        raise LibraryError(f"{member} did not borrow {isbn}")
                    self.loans[member].remove(isbn)
                    self.find(isbn).copies += 1

                def report(self):
                    # gives back one line for each book, A to Z by title
                    lines = []
                    for book in sorted(self.books.values(), key=lambda b: b.title):
                        lines.append(f"{book.title}: {book.copies} left")
                    return lines

                def on_loan(self):
                    # gives back how many copies are lent out, for all members together
                    return sum(len(isbns) for isbns in self.loans.values())
          `,
          // 3: takes a book back from anyone, even someone who never borrowed it.
          py`
            import json
            from dataclasses import dataclass, asdict


            class LibraryError(Exception):
                pass


            class NotFound(LibraryError):
                pass


            class NoCopies(LibraryError):
                pass


            @dataclass
            class Book:
                isbn: str
                title: str
                copies: int = 1


            class Library:
                def __init__(self):
                    self.books = {}
                    self.loans = {}

                def add(self, book):
                    # adds the book, or adds its copies to the same book already there
                    if book.isbn in self.books:
                        self.books[book.isbn].copies += book.copies
                    else:
                        self.books[book.isbn] = book

                def find(self, isbn):
                    # gives back the Book, or raises NotFound
                    if isbn not in self.books:
                        raise NotFound(f"No book {isbn}")
                    return self.books[isbn]

                def lend(self, member, isbn):
                    # lends one copy, or raises NotFound or NoCopies
                    book = self.find(isbn)
                    if book.copies == 0:
                        raise NoCopies(f"No copies of {book.title} left")
                    book.copies -= 1
                    self.loans.setdefault(member, []).append(isbn)

                def give_back(self, member, isbn):
                    # takes one copy back, or raises LibraryError if the member did not borrow it
                    if isbn in self.loans.get(member, []):
                        self.loans[member].remove(isbn)
                    self.find(isbn).copies += 1

                def report(self):
                    # gives back one line for each book, A to Z by title
                    lines = []
                    for book in sorted(self.books.values(), key=lambda b: b.title):
                        lines.append(f"{book.title}: {book.copies} left")
                    return lines

                def on_loan(self):
                    # gives back how many copies are lent out, for all members together
                    return sum(len(isbns) for isbns in self.loans.values())
          `,
          // 4: the report is not in A to Z order.
          py`
            import json
            from dataclasses import dataclass, asdict


            class LibraryError(Exception):
                pass


            class NotFound(LibraryError):
                pass


            class NoCopies(LibraryError):
                pass


            @dataclass
            class Book:
                isbn: str
                title: str
                copies: int = 1


            class Library:
                def __init__(self):
                    self.books = {}
                    self.loans = {}

                def add(self, book):
                    # adds the book, or adds its copies to the same book already there
                    if book.isbn in self.books:
                        self.books[book.isbn].copies += book.copies
                    else:
                        self.books[book.isbn] = book

                def find(self, isbn):
                    # gives back the Book, or raises NotFound
                    if isbn not in self.books:
                        raise NotFound(f"No book {isbn}")
                    return self.books[isbn]

                def lend(self, member, isbn):
                    # lends one copy, or raises NotFound or NoCopies
                    book = self.find(isbn)
                    if book.copies == 0:
                        raise NoCopies(f"No copies of {book.title} left")
                    book.copies -= 1
                    self.loans.setdefault(member, []).append(isbn)

                def give_back(self, member, isbn):
                    # takes one copy back, or raises LibraryError if the member did not borrow it
                    if isbn not in self.loans.get(member, []):
                        raise LibraryError(f"{member} did not borrow {isbn}")
                    self.loans[member].remove(isbn)
                    self.find(isbn).copies += 1

                def report(self):
                    # gives back one line for each book, A to Z by title
                    lines = []
                    for book in self.books.values():
                        lines.append(f"{book.title}: {book.copies} left")
                    return lines

                def on_loan(self):
                    # gives back how many copies are lent out, for all members together
                    return sum(len(isbns) for isbns in self.loans.values())
          `,
        ],
        starter: py`
          # One fact per assert. Work out each answer by hand first.
          lib = Library()
          lib.add(Book("1", "Zoology", 1))
          assert lib.find("1").title == "Zoology"
        `,
        solution: py`
          lib = Library()
          lib.add(Book("1", "Zoology", 1))
          lib.add(Book("1", "Zoology", 1))
          assert lib.find("1").copies == 2
          lib.add(Book("2", "Algebra", 1))
          assert lib.report()[0] == "Algebra: 1 left"
          lib.lend("Asha", "2")
          try:
              lib.lend("Ravi", "2")
              lent_twice = True
          except NoCopies:
              lent_twice = False
          assert not lent_twice
          try:
              lib.give_back("Om", "1")
              taken_back = True
          except LibraryError:
              taken_back = False
          assert not taken_back
        `,
        hints: [
          md`Add the same ISBN twice, and check the copies. Add a book whose title comes first A to Z after one that comes last, and check the report.`,
          md`Lend the only copy of a book, then try to lend it again. A good library refuses.`,
          md`Try to give back a book as a member who never borrowed it. A good library refuses that too.`,
        ],
      },
      {
        id: "d1", kind: "drill", title: "Laptop Mission: a library that remembers",
        task: md`
          This pretend Command Prompt is in your «python-days» folder. Type the command and press Enter.

          On a phone, you may skip this. Phone users are excused from the mission below.
        `,
        steps: [
          { say: md`Run your library. Type «python library.py» and press Enter.`,
            expect: ["python library.py", "py library.py"],
            output: "Book(isbn='111', title='Indian Polity', copies=3)\nRefused: No book 999\nLent 222 to Asha\nSorry: No copies of Lucent GK left\nRefused: No book 999\n1 {'Asha': []}\nIndian Polity: 2 left\nLucent GK: 1 left\nOn loan: 1\n['Indian Polity: 2 left', 'Lucent GK: 1 left'] 1\n[]" },
        ],
        mission: md`
          Now do it for real.

          1. In IDLE, make a new file with your Stage 4 program. Save it as «library.py» in «python-days».
          2. Run it with F5, and check the lines.
          3. Open «library.json» in Notepad: your books are there as text. The number of characters in the first line of that file is your receipt: write it in your notebook.
        `,
        hints: [
          md`Type the words in the grey box exactly, then press Enter.`,
          md`There is one space between the word python and the file name.`,
          md`If python does not work on your laptop, py does the same job.`,
        ],
      },
      {
        id: "twist", kind: "modify", carry: "s4", optional: true, noStep: true, title: "Own Twist: my books",
        task: md`
          Students want to see what they hold. Add «member_books(member)», which gives back the titles a member has borrowed, A to Z, or an empty list for someone with no loans. Then add this line at the end:

          : print(lib.member_books("Ravi"), lib.member_books("Om"))

          The last line is:

          | ['Indian Polity'] []

          You may add your own idea too, such as the title with the fewest copies left. The tests check the library and «member_books», so your own idea is safe.
        `,
        starter: py`
          import json
          from dataclasses import dataclass, asdict


          class LibraryError(Exception):
              pass


          class NotFound(LibraryError):
              pass


          class NoCopies(LibraryError):
              pass


          @dataclass
          class Book:
              isbn: str
              title: str
              copies: int = 1


          class Library:
              def __init__(self):
                  self.books = {}
                  self.loans = {}

              def add(self, book):
                  # adds the book, or adds its copies to the same book already there
                  if book.isbn in self.books:
                      self.books[book.isbn].copies += book.copies
                  else:
                      self.books[book.isbn] = book

              def find(self, isbn):
                  # gives back the Book, or raises NotFound
                  if isbn not in self.books:
                      raise NotFound(f"No book {isbn}")
                  return self.books[isbn]

              def lend(self, member, isbn):
                  # lends one copy, or raises NotFound or NoCopies
                  book = self.find(isbn)
                  if book.copies == 0:
                      raise NoCopies(f"No copies of {book.title} left")
                  book.copies -= 1
                  self.loans.setdefault(member, []).append(isbn)

              def give_back(self, member, isbn):
                  # takes one copy back, or raises LibraryError if the member did not borrow it
                  if isbn not in self.loans.get(member, []):
                      raise LibraryError(f"{member} did not borrow {isbn}")
                  self.loans[member].remove(isbn)
                  self.find(isbn).copies += 1

              def report(self):
                  # gives back one line for each book, A to Z by title
                  lines = []
                  for book in sorted(self.books.values(), key=lambda b: b.title):
                      lines.append(f"{book.title}: {book.copies} left")
                  return lines

              def on_loan(self):
                  # gives back how many copies are lent out, for all members together
                  return sum(len(isbns) for isbns in self.loans.values())

              def save(self, path):
                  # writes the books and the loans to a JSON file
                  data = {"books": [asdict(b) for b in self.books.values()], "loans": self.loans}
                  with open(path, "w", encoding="utf-8") as f:
                      json.dump(data, f)

              @classmethod
              def load(cls, path):
                  # gives back a Library from the file, or an empty Library if there is no file
                  lib = cls()
                  try:
                      with open(path, encoding="utf-8") as f:
                          data = json.load(f)
                  except FileNotFoundError:
                      return lib
                  for row in data["books"]:
                      lib.add(Book(**row))
                  lib.loans = data["loans"]
                  return lib


          lib = Library()
          lib.add(Book("111", "Indian Polity", 2))
          lib.add(Book("222", "Lucent GK"))
          lib.add(Book("111", "Indian Polity", 1))
          print(lib.find("111"))
          try:
              lib.find("999")
          except LibraryError as e:
              print("Refused:", e)

          for member, isbn in [("Asha", "222"), ("Ravi", "222"), ("Ravi", "999")]:
              try:
                  lib.lend(member, isbn)
                  print("Lent", isbn, "to", member)
              except NoCopies as e:
                  print("Sorry:", e)
              except LibraryError as e:
                  print("Refused:", e)
          lib.give_back("Asha", "222")
          print(lib.find("222").copies, lib.loans)

          lib.lend("Ravi", "111")
          for line in lib.report():
              print(line)
          print("On loan:", lib.on_loan())

          lib.save("library.json")
          again = Library.load("library.json")
          print(again.report(), again.on_loan())
          print(Library.load("missing.json").report())
        `,
        solution: py`
          import json
          from dataclasses import dataclass, asdict


          class LibraryError(Exception):
              pass


          class NotFound(LibraryError):
              pass


          class NoCopies(LibraryError):
              pass


          @dataclass
          class Book:
              isbn: str
              title: str
              copies: int = 1


          class Library:
              def __init__(self):
                  self.books = {}
                  self.loans = {}

              def add(self, book):
                  # adds the book, or adds its copies to the same book already there
                  if book.isbn in self.books:
                      self.books[book.isbn].copies += book.copies
                  else:
                      self.books[book.isbn] = book

              def find(self, isbn):
                  # gives back the Book, or raises NotFound
                  if isbn not in self.books:
                      raise NotFound(f"No book {isbn}")
                  return self.books[isbn]

              def lend(self, member, isbn):
                  # lends one copy, or raises NotFound or NoCopies
                  book = self.find(isbn)
                  if book.copies == 0:
                      raise NoCopies(f"No copies of {book.title} left")
                  book.copies -= 1
                  self.loans.setdefault(member, []).append(isbn)

              def give_back(self, member, isbn):
                  # takes one copy back, or raises LibraryError if the member did not borrow it
                  if isbn not in self.loans.get(member, []):
                      raise LibraryError(f"{member} did not borrow {isbn}")
                  self.loans[member].remove(isbn)
                  self.find(isbn).copies += 1

              def report(self):
                  # gives back one line for each book, A to Z by title
                  lines = []
                  for book in sorted(self.books.values(), key=lambda b: b.title):
                      lines.append(f"{book.title}: {book.copies} left")
                  return lines

              def on_loan(self):
                  # gives back how many copies are lent out, for all members together
                  return sum(len(isbns) for isbns in self.loans.values())

              def save(self, path):
                  # writes the books and the loans to a JSON file
                  data = {"books": [asdict(b) for b in self.books.values()], "loans": self.loans}
                  with open(path, "w", encoding="utf-8") as f:
                      json.dump(data, f)

              @classmethod
              def load(cls, path):
                  # gives back a Library from the file, or an empty Library if there is no file
                  lib = cls()
                  try:
                      with open(path, encoding="utf-8") as f:
                          data = json.load(f)
                  except FileNotFoundError:
                      return lib
                  for row in data["books"]:
                      lib.add(Book(**row))
                  lib.loans = data["loans"]
                  return lib

              def member_books(self, member):
                  # gives back the titles a member has borrowed, A to Z
                  return sorted(self.find(isbn).title for isbn in self.loans.get(member, []))


          lib = Library()
          lib.add(Book("111", "Indian Polity", 2))
          lib.add(Book("222", "Lucent GK"))
          lib.add(Book("111", "Indian Polity", 1))
          print(lib.find("111"))
          try:
              lib.find("999")
          except LibraryError as e:
              print("Refused:", e)

          for member, isbn in [("Asha", "222"), ("Ravi", "222"), ("Ravi", "999")]:
              try:
                  lib.lend(member, isbn)
                  print("Lent", isbn, "to", member)
              except NoCopies as e:
                  print("Sorry:", e)
              except LibraryError as e:
                  print("Refused:", e)
          lib.give_back("Asha", "222")
          print(lib.find("222").copies, lib.loans)

          lib.lend("Ravi", "111")
          for line in lib.report():
              print(line)
          print("On loan:", lib.on_loan())

          lib.save("library.json")
          again = Library.load("library.json")
          print(again.report(), again.on_loan())
          print(Library.load("missing.json").report())

          print(lib.member_books("Ravi"), lib.member_books("Om"))
        `,
        tests: [
          { contains: ["['Indian Polity: 2 left', 'Lucent GK: 1 left'] 1", "['Indian Polity'] []"] },
          { py: py`
              B = need("Book")
              lib = new("Library")
              lib.add(B("1", "Zoology", 2))
              lib.add(B("2", "Algebra", 2))
              lib.lend("Asha", "1")
              lib.lend("Asha", "2")
              assert lib.member_books("Asha") == ["Algebra", "Zoology"], f"Asha's titles should be A to Z, but they are {lib.member_books('Asha')}."
              assert lib.member_books("Nobody") == [], "Someone with no loans should get an empty list."
              assert lib.on_loan() == 2, "The old on_loan method should still work."
            ` },
        ],
        wrong: [py`
          import json
          from dataclasses import dataclass, asdict


          class LibraryError(Exception):
              pass


          class NotFound(LibraryError):
              pass


          class NoCopies(LibraryError):
              pass


          @dataclass
          class Book:
              isbn: str
              title: str
              copies: int = 1


          class Library:
              def __init__(self):
                  self.books = {}
                  self.loans = {}

              def add(self, book):
                  # adds the book, or adds its copies to the same book already there
                  if book.isbn in self.books:
                      self.books[book.isbn].copies += book.copies
                  else:
                      self.books[book.isbn] = book

              def find(self, isbn):
                  # gives back the Book, or raises NotFound
                  if isbn not in self.books:
                      raise NotFound(f"No book {isbn}")
                  return self.books[isbn]

              def lend(self, member, isbn):
                  # lends one copy, or raises NotFound or NoCopies
                  book = self.find(isbn)
                  if book.copies == 0:
                      raise NoCopies(f"No copies of {book.title} left")
                  book.copies -= 1
                  self.loans.setdefault(member, []).append(isbn)

              def give_back(self, member, isbn):
                  # takes one copy back, or raises LibraryError if the member did not borrow it
                  if isbn not in self.loans.get(member, []):
                      raise LibraryError(f"{member} did not borrow {isbn}")
                  self.loans[member].remove(isbn)
                  self.find(isbn).copies += 1

              def report(self):
                  # gives back one line for each book, A to Z by title
                  lines = []
                  for book in sorted(self.books.values(), key=lambda b: b.title):
                      lines.append(f"{book.title}: {book.copies} left")
                  return lines

              def on_loan(self):
                  # gives back how many copies are lent out, for all members together
                  return sum(len(isbns) for isbns in self.loans.values())

              def save(self, path):
                  # writes the books and the loans to a JSON file
                  data = {"books": [asdict(b) for b in self.books.values()], "loans": self.loans}
                  with open(path, "w", encoding="utf-8") as f:
                      json.dump(data, f)

              @classmethod
              def load(cls, path):
                  # gives back a Library from the file, or an empty Library if there is no file
                  lib = cls()
                  try:
                      with open(path, encoding="utf-8") as f:
                          data = json.load(f)
                  except FileNotFoundError:
                      return lib
                  for row in data["books"]:
                      lib.add(Book(**row))
                  lib.loans = data["loans"]
                  return lib

              def member_books(self, member):
                  # gives back the titles a member has borrowed, A to Z
                  return sorted(self.find(isbn).title for isbn in self.loans[member])


          lib = Library()
          lib.add(Book("111", "Indian Polity", 2))
          lib.add(Book("222", "Lucent GK"))
          lib.add(Book("111", "Indian Polity", 1))
          print(lib.find("111"))
          try:
              lib.find("999")
          except LibraryError as e:
              print("Refused:", e)

          for member, isbn in [("Asha", "222"), ("Ravi", "222"), ("Ravi", "999")]:
              try:
                  lib.lend(member, isbn)
                  print("Lent", isbn, "to", member)
              except NoCopies as e:
                  print("Sorry:", e)
              except LibraryError as e:
                  print("Refused:", e)
          lib.give_back("Asha", "222")
          print(lib.find("222").copies, lib.loans)

          lib.lend("Ravi", "111")
          for line in lib.report():
              print(line)
          print("On loan:", lib.on_loan())

          lib.save("library.json")
          again = Library.load("library.json")
          print(again.report(), again.on_loan())
          print(Library.load("missing.json").report())

          print(lib.member_books("Ravi"), lib.member_books("Om"))
        `],
        hints: [
          md`If someone with no loans crashes with KeyError, use «.get(member, [])» for their list.`,
          md`If you see ISBNs instead of titles, find each book and take its title.`,
          md`If the titles are not A to Z, sort them before you give them back.`,
        ],
      },
    ],
    keys: [
      md`A dataclass holds each book; a class holds the books, the loans and the rules.`,
      md`Your own error family lets the caller say "Sorry" for one problem and "Refused" for the rest.`,
      md`«asdict(obj)» turns a dataclass into a dictionary for JSON; «Book(**row)» builds it back.`,
      md`Check first, then change: a refused request must leave the library exactly as it was.`,
    ],
  });
})();
