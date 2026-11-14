// Week 21 - Working Like a Professional (Days 136 to 140).
(function () {
  const { day, md, py, ex, code, tip, warn, ask, pause } = window.Course;

  // ---------------------------------------------------------------- Day 136
  day({
    slug: "enums-and-shared-methods",
    title: "Enums and One Job, Many Classes",
    goal: "Name fixed choices with Enum, and let different classes share one set of methods.",
    minutes: 45,
    needs: [97, 116],
    win: "Today you can now name fixed choices with Enum, and write code that works with many classes because they share the same methods.",
    learn: [
      md`
        ## Fixed choices with Enum

        Some values come from a short, fixed list: an exam is SSC, UPSC or Bank, and an order is new, paid or cancelled. Text like «"ssc"» is easy to mistype, and nobody notices. An **Enum** gives each choice a name. A typo is then an error at once. Guess the output.
      `,
      ex(py`
        from enum import Enum

        class Exam(Enum):
            SSC = "ssc"
            UPSC = "upsc"
            BANK = "bank"

        e = Exam.SSC
        print(e, e.name, e.value, Exam("upsc").name, e is Exam.SSC)
        print([x.name for x in Exam], len(Exam))
      `, { predict: ["Exam.SSC SSC ssc UPSC True\n['SSC', 'UPSC', 'BANK'] 3", "ssc SSC ssc UPSC True\n['SSC', 'UPSC', 'BANK'] 3", "Exam.SSC SSC ssc upsc True\n['ssc', 'upsc', 'bank'] 3"], answer: 0 }),
      md`
        - Each choice is a **member**, with a «.name» and a «.value».
        - «Exam("upsc")» finds the member from its value, which is handy for typed or saved text.
        - You can loop over an Enum, and «len» counts its members.
        - «Exam.SCC», a typo, is an AttributeError, not a silent wrong answer.
      `,
      md`
        ## Enums in match

        Members work well in «match» (Day 132). Careful: a member is not equal to its value. «Status.PAID == 2» is False. Compare members with members. Guess the output.
      `,
      ex(py`
        from enum import Enum

        class Status(Enum):
            NEW = 1
            PAID = 2
            CANCELLED = 3

        def label(s):
            match s:
                case Status.NEW:
                    return "waiting"
                case Status.PAID | Status.CANCELLED:
                    return "closed"

        print(label(Status.NEW), label(Status.PAID), Status.PAID == 2, Status(2).name)
      `, { predict: ["waiting closed False PAID", "waiting closed True PAID", "waiting waiting False PAID"], answer: 0 }),
      md`
        Inside «case», «Status.NEW» has a dot, so Python compares with it instead of catching into a name.
      `,
      pause(md`Good place for a break. Next: many classes, one job.`),
      md`
        ## One job, many classes

        If different classes have methods with the same name, one piece of code can work with all of them. It does not check the class; it only calls the method. This is called **duck typing**: if it walks like a duck and quacks like a duck, treat it as a duck. Guess the output.
      `,
      ex(py`
        class Square:
            def __init__(self, side):
                self.side = side
            def area(self):
                return self.side ** 2

        class Circle:
            def __init__(self, r):
                self.r = r
            def area(self):
                return round(3.14 * self.r ** 2, 1)

        class Plot:
            def __init__(self, w, h):
                self.w, self.h = w, h
            def area(self):
                return self.w * self.h

        shapes = [Square(3), Circle(2), Plot(4, 5)]
        print([s.area() for s in shapes], sum(s.area() for s in shapes))
      `, { predict: ["[9, 12.6, 20] 41.6", "[9, 12.56, 20] 41.56", "[6, 12.6, 9] 27.6"], answer: 0 }),
      md`
        ## A promise in writing: abstract base classes

        To make the shared methods a rule, write a parent class from «ABC», and mark the methods every child must have with «@abstractmethod». A child that forgets one cannot be made at all, and neither can the parent. Run it.
      `,
      ex(py`
        from abc import ABC, abstractmethod

        class Payment(ABC):
            def __init__(self, amount):
                self.amount = amount

            @abstractmethod
            def fee(self):
                ...

            def total(self):
                return self.amount + self.fee()

        class Card(Payment):
            def fee(self):
                return self.amount * 2 // 100

        class Upi(Payment):
            pass

        print(Card(500).total())
        Upi(500)
      `, { error: true }),
      md`
        «Card» kept its promise, so its «total» works: 500 + 10. «Upi» forgot «fee», so Python refuses to make it with a TypeError that names the missing method. The mistake shows up at once, not later in a report.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          from enum import Enum

          class Size(Enum):
              SMALL = 1
              MEDIUM = 2
              LARGE = 3

          s = Size(2)
          print(s.name, s.value + 1, Size.LARGE.name.lower())
        `, options: ["MEDIUM 3 large", "SMALL 3 large", "MEDIUM 2 LARGE"], answer: 0,
        explain: md`«Size(2)» finds the member whose value is 2. Its value plus 1 is 3.`,
        why: [null, md`«Size(2)» looks up by value, not by place.`, md`«.value + 1» adds 1, and «.lower()» makes the name small.`],
        skill: "trace" },
      { q: md`What does this function rely on?`, code: py`
          def total_area(things):
              return sum(t.area() for t in things)
        `, options: ["Every item having an «area()» method, whatever its class", "Every item being a Square", "The items being sorted"], answer: 0, verify: false, mono: false,
        explain: md`It never checks the class. Any object with «area()» works: that is duck typing.`,
        why: [null, md`It names no class at all.`, md`A sum does not care about order.`],
        skill: "read" },
      { q: md`«if order.status == "PAID":» never runs, though the order is paid. «status» holds «Status.PAID». What is the fix?`,
        options: ["Compare with the member: «order.status == Status.PAID»", "Use «is» instead of «==»", 'Change the value in the Enum to «\"PAID\"»'], answer: 0, verify: false, mono: false,
        explain: md`A member is never equal to plain text or numbers. Compare members with members.`,
        why: [null, md`«is» with text is still a different object, so it is still False.`, md`Even then, «Status.PAID == "PAID"» is False.`],
        skill: "debug" },
      { q: md`What happens when you try to make an object of a class that has an unfinished «@abstractmethod»?`,
        options: ["Python raises TypeError, naming the missing method", "The object is made, and the method gives back None", "Python prints a warning and goes on"], answer: 0, verify: false, mono: false,
        explain: md`Abstract methods are a promise. A class that does not keep it cannot be made.`,
        why: [null, md`That is what would happen without ABC. ABC stops it early.`, md`It is an error, not a warning.`],
        skill: "memory" },
      { q: md`A program stores a ticket's class: sleeper, AC 3-tier or AC 2-tier. What is the best way to hold it?`,
        options: ["An Enum with one member for each class", 'Plain text, like «\"sleeper\"»', "Numbers 1, 2 and 3"], answer: 0, verify: false, mono: false,
        explain: md`The choices are fixed. An Enum names them, and a typo fails at once.`,
        why: [null, md`«"Sleeper"» and «"sleeper"» would be different, and nobody would notice.`, md`Numbers say nothing to the reader: what does 2 mean?`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: meal choices",
        task: md`Answer each question without running the program.`,
        code: py`
          from enum import Enum

          class Meal(Enum):
              VEG = "veg"
              NONVEG = "nonveg"
              JAIN = "jain"

          orders = ["veg", "jain", "veg"]
          meals = [Meal(o) for o in orders]
          counts = {m.name: meals.count(m) for m in Meal}
          print(meals[1].name, counts)
        `,
        ask: [{ line: 10, name: "counts" }, { output: true }],
        hints: [
          md`«Meal("jain")» finds the member whose value is «"jain"».`,
          md`The dictionary loops over every member of Meal, in the order they are written.`,
          md`Nobody chose NONVEG, so its count is 0.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: everyone describes",
        task: md`Answer each question without running the program.`,
        code: py`
          class Book:
              def __init__(self, title):
                  self.title = title
              def describe(self):
                  return f"Book: {self.title}"

          class Video:
              def __init__(self, title, minutes):
                  self.title, self.minutes = title, minutes
              def describe(self):
                  return f"Video: {self.title} ({self.minutes} min)"

          items = [Book("Polity"), Video("Maths tricks", 12)]
          lines = [i.describe() for i in items]
          print(lines[1], len(lines))
        `,
        ask: [{ line: 14, name: "lines" }, { output: true }],
        hints: [
          md`Each object uses its own class's «describe».`,
          md`The Video adds its minutes in brackets.`,
          md`There are two items, so two lines.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: the traffic light",
        task: md`
          Put the lines in order. The program says what each light means. It prints:

          | RED: stop
          | GREEN: go
        `,
        solution: py`
          from enum import Enum
          class Light(Enum):
              RED = 1
              GREEN = 2
          def meaning(light):
              match light:
                  case Light.RED:
                      return "stop"
                  case Light.GREEN:
                      return "go"
          for light in Light:
              print(f"{light.name}: {meaning(light)}")
        `,
        distractors: ["        case RED:"],
        tests: [{ output: "RED: stop\nGREEN: go" }],
        hints: [
          md`If you see «name capture 'RED' makes remaining patterns unreachable», a bare name catches everything. Write «Light.RED», with the dot.`,
          md`If you see a NameError for Enum, the import must come first.`,
          md`If nothing is printed, the loop over «Light» must be outside the function.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the paid orders that never count",
        task: md`
          The program counts how many orders are paid. For the three orders below it should print «Paid: 2», but it prints «Paid: 0». Tap the line that causes it, then fix it.
        `,
        starter: py`
          from enum import Enum

          class Status(Enum):
              NEW = "new"
              PAID = "paid"

          orders = [Status.PAID, Status.NEW, Status.PAID]
          paid = 0
          for status in orders:
              if status == "paid":
                  paid += 1
          print("Paid:", paid)
        `,
        bugLines: [10],
        solution: py`
          from enum import Enum

          class Status(Enum):
              NEW = "new"
              PAID = "paid"

          orders = [Status.PAID, Status.NEW, Status.PAID]
          paid = 0
          for status in orders:
              if status == Status.PAID:
                  paid += 1
          print("Paid:", paid)
        `,
        tests: [{ output: "Paid: 2" }, { avoids: ["fstring"], msg: "Compare with the member itself." }],
        wrong: [py`
          from enum import Enum

          class Status(Enum):
              NEW = "new"
              PAID = "paid"

          orders = [Status.PAID, Status.NEW, Status.PAID]
          paid = 0
          for status in orders:
              if status.name == "paid":
                  paid += 1
          print("Paid:", paid)
        `],
        hints: [
          md`A member is never equal to plain text, so the test is always False.`,
          md`Compare with the member: «Status.PAID».`,
          md`If you compare names, the name is «"PAID"» in capitals. Comparing members is clearer.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: a third shape",
        task: md`
          Add a class «Triangle(base, height)» with an «area()» of half the base times the height. Add «Triangle(6, 4)» to the list, so the program prints:

          | [9, 20, 12.0]
          | 41.0
        `,
        starter: py`
          class Square:
              def __init__(self, side):
                  self.side = side
              def area(self):
                  return self.side ** 2

          class Plot:
              def __init__(self, w, h):
                  self.w, self.h = w, h
              def area(self):
                  return self.w * self.h

          shapes = [Square(3), Plot(4, 5)]
          print([s.area() for s in shapes])
          print(sum(s.area() for s in shapes))
        `,
        solution: py`
          class Square:
              def __init__(self, side):
                  self.side = side
              def area(self):
                  return self.side ** 2

          class Plot:
              def __init__(self, w, h):
                  self.w, self.h = w, h
              def area(self):
                  return self.w * self.h

          class Triangle:
              def __init__(self, base, height):
                  self.base, self.height = base, height
              def area(self):
                  return self.base * self.height / 2

          shapes = [Square(3), Plot(4, 5), Triangle(6, 4)]
          print([s.area() for s in shapes])
          print(sum(s.area() for s in shapes))
        `,
        tests: [{ output: "[9, 20, 12.0]\n41.0" }, { py: py`
          T = need("Triangle", "class")
          assert T(3, 3).area() == 4.5, "Triangle(3, 3) should have an area of 4.5."
        ` }],
        wrong: [py`
          class Square:
              def __init__(self, side):
                  self.side = side
              def area(self):
                  return self.side ** 2

          class Plot:
              def __init__(self, w, h):
                  self.w, self.h = w, h
              def area(self):
                  return self.w * self.h

          class Triangle:
              def __init__(self, base, height):
                  self.base, self.height = base, height
              def size(self):
                  return self.base * self.height / 2

          shapes = [Square(3), Plot(4, 5), Triangle(6, 4)]
          print([s.area() for s in shapes])
          print(sum(s.area() for s in shapes))
        `],
        hints: [
          md`If you see «'Triangle' object has no attribute 'area'», the method must be called «area», like the others.`,
          md`If the area is 24, divide by 2.`,
          md`Nothing else needs to change: the list and the sum work with any class that has «area()».`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: payment methods",
        task: md`
          From a blank page. Write:

          - An abstract class «Payment(ABC)» with «__init__(self, amount)», an abstract method «fee()», and «total()», which gives back the amount plus the fee.
          - «Cash», with a fee of 0. «Card», with a fee of 2% of the amount, as a whole number using «// 100». «Upi», with a fee of 0 up to 2000, and 5 above that.

          Then print the totals for «Cash(300)», «Card(500)» and «Upi(2500)», one per line, like «Card: 510»:

          | Cash: 300
          | Card: 510
          | Upi: 2505
        `,
        starter: py``,
        solution: py`
          from abc import ABC, abstractmethod


          class Payment(ABC):
              def __init__(self, amount):
                  self.amount = amount

              @abstractmethod
              def fee(self):
                  ...

              def total(self):
                  return self.amount + self.fee()


          class Cash(Payment):
              def fee(self):
                  return 0


          class Card(Payment):
              def fee(self):
                  return self.amount * 2 // 100


          class Upi(Payment):
              def fee(self):
                  return 5 if self.amount > 2000 else 0


          for p in [Cash(300), Card(500), Upi(2500)]:
              print(f"{type(p).__name__}: {p.total()}")
        `,
        tests: [
          { output: "Cash: 300\nCard: 510\nUpi: 2505" },
          { py: py`
            P = need("Payment", "class")
            for name in ("Cash", "Card", "Upi"):
                assert issubclass(need(name, "class"), P), f"«{name}» should be made from Payment: «class {name}(Payment):»."
            refused = False
            try:
                P(10)
            except TypeError:
                refused = True
            assert refused, "Payment itself should not be makeable: mark «fee» with «@abstractmethod» and use «Payment(ABC)»."
            assert need("Upi")(2000).total() == 2000, "A UPI payment of exactly 2000 has no fee."
            assert need("Card")(1050).total() == 1071, "A card payment of 1050 has a fee of 21, so 1071."
          ` },
        ],
        wrong: [py`
          class Payment:
              def __init__(self, amount):
                  self.amount = amount

              def fee(self):
                  return 0

              def total(self):
                  return self.amount + self.fee()


          class Cash(Payment):
              pass


          class Card(Payment):
              def fee(self):
                  return self.amount * 2 // 100


          class Upi(Payment):
              def fee(self):
                  return 5 if self.amount > 2000 else 0


          for p in [Cash(300), Card(500), Upi(2500)]:
              print(f"{type(p).__name__}: {p.total()}")
        `],
        hints: [
          md`If Payment itself can be made, it must inherit from «ABC», and «fee» needs «@abstractmethod» above it.`,
          md`If UPI of exactly 2000 has a fee, the fee is only for amounts above 2000: use «>».`,
          md`To print the class name, use «type(p).__name__».`,
        ],
      },
    ],
    keys: [
      md`«class Exam(Enum):» names fixed choices. Members have «.name» and «.value»; «Exam("ssc")» finds one by value.`,
      md`Compare members with members: «Status.PAID == "paid"» is always False. Use «Status.PAID» in «case» too.`,
      md`Duck typing: code that only calls «area()» works with any class that has it.`,
      md`«class Payment(ABC):» with «@abstractmethod» makes the shared methods a rule; a class that breaks it cannot be made.`,
    ],
  });

  // ---------------------------------------------------------------- Day 137
  day({
    slug: "logging-and-debugging",
    title: "Logging and the Debugger",
    goal: "Report what a program is doing with logging, and pause it with breakpoint().",
    minutes: 45,
    needs: [45, 48],
    win: "Today you can now use logging instead of print to report what a program is doing, keep a log file, and pause a program on your laptop with breakpoint().",
    learn: [
      md`
        ## Why not just print?

        On Day 48 you used «print» to look inside a program. Real programs use **logging** instead. Every message has a **level** that says how serious it is. You choose which levels to show, without deleting a line, and you can send them to a file:

        - «debug»: small details, for finding bugs.
        - «info»: normal progress, like "order saved".
        - «warning»: something odd, but the program carries on.
        - «error» and «critical»: something failed.

        Run this, and look at which lines appear. Log messages show in red, like errors, because they go to the same place.
      `,
      ex(py`
        import logging

        logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
        logging.debug("checking item 3")
        logging.info("order saved")
        logging.warning("stock is low: 2 left")
        logging.error("payment failed")
        print("The program goes on.")
      `),
      md`
        - «basicConfig» sets logging up once, at the start. «level=logging.INFO» shows info and above, so the debug line is hidden.
        - Without a level, only warning and above are shown.
        - «format» says how each line looks. «%(levelname)s» is the level, and «%(message)s» your text.
        - To see the debug lines while hunting a bug, change only the level to «logging.DEBUG».
      `,
      md`
        ## A log file

        Give «basicConfig» a «filename», and the messages go into that file instead. The program here prints the file at the end, so you can see it. Guess the output.
      `,
      ex(py`
        import logging

        logging.basicConfig(filename="shop.log", level=logging.WARNING, format="%(levelname)s %(message)s")
        for item, qty in [("tea", 5), ("salt", 0), ("dal", -2)]:
            if qty < 0:
                logging.error(f"{item}: quantity cannot be {qty}")
            elif qty == 0:
                logging.warning(f"{item}: out of stock")
            else:
                logging.info(f"{item}: {qty} left")
        print(open("shop.log").read())
      `, { predict: ["WARNING salt: out of stock\nERROR dal: quantity cannot be -2", "INFO tea: 5 left\nWARNING salt: out of stock\nERROR dal: quantity cannot be -2", "ERROR dal: quantity cannot be -2"], answer: 0 }),
      md`
        A log file is how you find out what went wrong last night, when nobody was watching.
      `,
      pause(md`Good place for a break. Next: named loggers, and pausing a program.`),
      md`
        ## Named loggers

        In a bigger program, each part gets its own logger with «logging.getLogger("name")». «%(name)s» in the format shows which part wrote each line. Guess the output.
      `,
      ex(py`
        import logging

        logging.basicConfig(filename="app.log", level=logging.INFO, format="%(name)s | %(levelname)s | %(message)s")
        orders = logging.getLogger("orders")
        stock = logging.getLogger("stock")
        orders.info("order 7 placed")
        stock.warning("rice below 5 kg")
        print(open("app.log").read())
      `, { predict: ["orders | INFO | order 7 placed\nstock | WARNING | rice below 5 kg", "root | INFO | order 7 placed\nroot | WARNING | rice below 5 kg", "stock | WARNING | rice below 5 kg"], answer: 0 }),
      md`
        ## Pausing a program: breakpoint()

        On your laptop, a line «breakpoint()» pauses the program right there, and opens the debugger, **pdb**. You type short commands at its «(Pdb)» prompt:

        - «p total» prints a value, and «pp» prints it neatly.
        - «n» runs the next line, and «s» steps into a function call.
        - «c» carries on until the next breakpoint, and «q» quits.

        It is Step-through for your laptop programs. On this page, «breakpoint()» only shows a note, because the page cannot type pdb's commands. The Laptop Mission below lets you try it.
      `,
      tip(md`A good habit: «print» is for what the user should see; «logging» is for what the programmer needs to know.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          import logging

          logging.basicConfig(filename="t.log", level=logging.INFO, format="%(levelname)s")
          logging.debug("a")
          logging.info("b")
          logging.critical("c")
          print(open("t.log").read().split())
        `, options: ["['INFO', 'CRITICAL']", "['DEBUG', 'INFO', 'CRITICAL']", "['CRITICAL']"], answer: 0,
        explain: md`The level is INFO, so debug is hidden. The format shows only the level name.`,
        why: [null, md`DEBUG is below INFO, so it is not written.`, md`INFO is the level set, so info messages are written too.`],
        skill: "trace" },
      { q: md`What does this line set up?`, code: py`
          logging.basicConfig(filename="bank.log", level=logging.WARNING, format="%(name)s %(levelname)s %(message)s")
        `, options: ["Warnings and worse go into bank.log, with the logger's name, the level and the message", "Every message is printed on the screen", "Only warnings, not errors, are kept"], answer: 0, verify: false, mono: false,
        explain: md`The level is the lowest shown: warning, error and critical. «filename» sends them to the file.`,
        why: [null, md`With a filename, they go to the file, not the screen. Info and debug are hidden.`, md`A level means "this and above", so errors are kept too.`],
        skill: "read" },
      { q: md`A program calls «logging.info("saved")», but nothing ever appears. What is the most likely cause?`,
        options: ["The level was never set, so only warning and above are shown", "«info» needs «print» around it", "Logging works only with a file"], answer: 0, verify: false, mono: false,
        explain: md`Set «level=logging.INFO» in «basicConfig» to see info messages.`,
        why: [null, md`Logging writes the message itself.`, md`Without a filename it writes to the screen.`],
        skill: "debug" },
      { q: md`In pdb, which command prints the value of «total»?`,
        options: ["«p total»", "«n total»", "«c total»"], answer: 0, verify: false, mono: false,
        explain: md`«p» prints. «n» runs the next line, and «c» carries on.`,
        why: [null, md`«n» runs the next line.`, md`«c» carries on to the next breakpoint.`],
        skill: "memory" },
      { q: md`A shop program runs all night. In the morning you need to know which orders failed and why. What should it use?`,
        options: ["«logging» with a «filename», and «logging.error» for each failure", "«print» for each failure", "A breakpoint at each failure"], answer: 0, verify: false, mono: false,
        explain: md`A log file keeps the messages after the program has finished, with their levels.`,
        why: [null, md`Printed lines are gone when the window closes.`, md`A breakpoint stops the program and waits for someone to type.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: what reaches the file",
        task: md`Answer each question without running the program.`,
        code: py`
          import logging

          logging.basicConfig(filename="fees.log", level=logging.WARNING, format="%(levelname)s: %(message)s")
          paid = 0
          for name, fee in [("Asha", 500), ("Ravi", 0), ("Om", 500)]:
              if fee == 0:
                  logging.warning(f"{name} has not paid")
              else:
                  paid += fee
                  logging.info(f"{name} paid {fee}")
          lines = open("fees.log").read().splitlines()
          print(paid, lines)
        `,
        ask: [{ line: 11, name: "lines" }, { output: true }],
        hints: [
          md`The level is WARNING, so the info lines are not written.`,
          md`Only Ravi has a fee of 0.`,
          md`«paid» adds Asha's and Om's fees.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: two loggers",
        task: md`Answer each question without running the program.`,
        code: py`
          import logging

          logging.basicConfig(filename="run.log", level=logging.DEBUG, format="%(name)s:%(levelname)s")
          db = logging.getLogger("db")
          web = logging.getLogger("web")
          db.debug("connect")
          web.info("page")
          db.error("lost")
          text = open("run.log").read()
          print(text.split())
        `,
        ask: [{ line: 9, name: "text" }, { output: true }],
        hints: [
          md`The level is DEBUG, the lowest, so every message is written.`,
          md`The format shows only the logger's name and the level, joined by «:».`,
          md`Each message is on its own line, in the order they were logged.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: a login log",
        task: md`
          Put the lines in order. The program logs one info and one warning to «login.log», then prints the file:

          | INFO - Asha logged in
          | WARNING - Wrong password for Ravi
        `,
        solution: py`
          import logging
          logging.basicConfig(filename="login.log", level=logging.INFO, format="%(levelname)s - %(message)s")
          logging.info("Asha logged in")
          logging.warning("Wrong password for Ravi")
          print(open("login.log").read())
        `,
        distractors: ['logging.basicConfig(filename="login.log", format="%(levelname)s - %(message)s")'],
        tests: [{ output: "INFO - Asha logged in\nWARNING - Wrong password for Ravi" }],
        hints: [
          md`If the info line is missing, the level must be set to INFO. Without it, only warnings and worse are kept.`,
          md`If you see «No such file», the file is read before anything is logged. Print it last.`,
          md`If the lines have a different look, «basicConfig» must come before the first message.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the missing progress lines",
        task: md`
          The program logs each step of a backup, then prints the log. It should print:

          | INFO: copying notes
          | INFO: copying marks
          | INFO: backup finished

          It prints nothing but a blank line. Tap the line that causes it, then fix it.
        `,
        starter: py`
          import logging

          logging.basicConfig(filename="backup.log", format="%(levelname)s: %(message)s")
          for part in ["notes", "marks"]:
              logging.info(f"copying {part}")
          logging.info("backup finished")
          print(open("backup.log").read())
        `,
        bugLines: [3],
        solution: py`
          import logging

          logging.basicConfig(filename="backup.log", level=logging.INFO, format="%(levelname)s: %(message)s")
          for part in ["notes", "marks"]:
              logging.info(f"copying {part}")
          logging.info("backup finished")
          print(open("backup.log").read())
        `,
        tests: [{ output: "INFO: copying notes\nINFO: copying marks\nINFO: backup finished" }],
        wrong: [py`
          import logging

          logging.basicConfig(filename="backup.log", level=logging.DEBUG, format="%(message)s")
          for part in ["notes", "marks"]:
              logging.info(f"copying {part}")
          logging.info("backup finished")
          print(open("backup.log").read())
        `],
        hints: [
          md`Without a level, only warning and worse are written, so the info lines are dropped.`,
          md`Add «level=logging.INFO» to «basicConfig».`,
          md`Keep the format as it was, so each line starts with «INFO: ».`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: from print to logging",
        task: md`
          The program prints debugging lines that users should not see. Change the two «print("DEBUG ...")» lines into «logging.debug» messages, set up logging with «level=logging.DEBUG», «filename="calc.log"» and «format="%(message)s"», and print the log after the answer. The output becomes:

          | Total: 35
          | adding 15
          | adding 20
        `,
        starter: py`
          total = 0
          for price in [15, 20]:
              print("DEBUG adding", price)
              total += price
          print("Total:", total)
        `,
        solution: py`
          import logging

          logging.basicConfig(filename="calc.log", level=logging.DEBUG, format="%(message)s")
          total = 0
          for price in [15, 20]:
              logging.debug(f"adding {price}")
              total += price
          print("Total:", total)
          print(open("calc.log").read())
        `,
        tests: [{ output: "Total: 35\nadding 15\nadding 20" }, { py: py`
          assert LINES[0] == "Total: 35", "The debug lines should go to the log, not be printed before the total."
          assert file_text("calc.log").split() == ["adding", "15", "adding", "20"], "calc.log should hold the two «adding» lines."
        ` }],
        wrong: [py`
          import logging

          logging.basicConfig(filename="calc.log", format="%(message)s")
          total = 0
          for price in [15, 20]:
              logging.debug(f"adding {price}")
              total += price
          print("Total:", total)
          print(open("calc.log").read())
        `],
        hints: [
          md`If the log is empty, set «level=logging.DEBUG»: debug is the lowest level, hidden by default.`,
          md`If you see «No such file», nothing was logged before you read the file.`,
          md`If «Total» is not first, print the log after the total.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: the order log",
        task: md`
          From a blank page. Set up logging to «orders.log», with level INFO and the format «%(levelname)s: %(message)s». The menu is «{"tea": 15, "vada": 20}». Ask for orders on one line, each as «item:qty». For each order:

          - an item not on the menu logs an error: «unknown item pizza»;
          - a quantity that is not a whole number above 0 logs a warning: «bad quantity for tea: x»;
          - otherwise log info, «tea x2 = 30», and add it to the total.

          Then print «Total: N», and the log file. For «tea:2 pizza:1 vada:x vada:1» it shows:

          | Total: 50
          | INFO: tea x2 = 30
          | ERROR: unknown item pizza
          | WARNING: bad quantity for vada: x
          | INFO: vada x1 = 20
        `,
        starter: py``,
        solution: py`
          import logging

          logging.basicConfig(filename="orders.log", level=logging.INFO, format="%(levelname)s: %(message)s")
          menu = {"tea": 15, "vada": 20}
          total = 0
          for part in input("Orders: ").split():
              item, qty = part.split(":")
              if item not in menu:
                  logging.error(f"unknown item {item}")
              elif not qty.isdigit() or int(qty) == 0:
                  logging.warning(f"bad quantity for {item}: {qty}")
              else:
                  cost = menu[item] * int(qty)
                  total += cost
                  logging.info(f"{item} x{qty} = {cost}")
          print("Total:", total)
          print(open("orders.log").read())
        `,
        tests: [
          { inputs: ["tea:2 pizza:1 vada:x vada:1"], output: "Total: 50\nINFO: tea x2 = 30\nERROR: unknown item pizza\nWARNING: bad quantity for vada: x\nINFO: vada x1 = 20" },
          { inputs: ["tea:0"], output: "Total: 0\nWARNING: bad quantity for tea: 0" },
          { inputs: ["vada:3"], py: py`
            assert OUTPUT.startswith("Total: 60"), "3 vadas cost 60."
            assert file_text("orders.log").strip() == "INFO: vada x3 = 60", "orders.log should hold «INFO: vada x3 = 60»."
          ` },
        ],
        wrong: [py`
          import logging

          logging.basicConfig(filename="orders.log", level=logging.INFO, format="%(levelname)s: %(message)s")
          menu = {"tea": 15, "vada": 20}
          total = 0
          for part in input("Orders: ").split():
              item, qty = part.split(":")
              if item not in menu:
                  logging.error(f"unknown item {item}")
              elif not qty.isdigit():
                  logging.warning(f"bad quantity for {item}: {qty}")
              else:
                  cost = menu[item] * int(qty)
                  total += cost
                  logging.info(f"{item} x{qty} = {cost}")
          print("Total:", total)
          print(open("orders.log").read())
        `],
        hints: [
          md`If «tea:0» is logged as an order, a quantity of 0 must be a warning too.`,
          md`If the info lines are missing, set «level=logging.INFO».`,
          md`If pizza crashes with KeyError, check «item not in menu» before you look up the price.`,
        ],
      },
      {
        id: "d1", kind: "drill", title: "Laptop Mission: pause with breakpoint()",
        task: md`
          This pretend Command Prompt is in your «python-days» folder. «bill.py» adds up prices, and has a «breakpoint()» line inside its loop. Type each command and press Enter.

          On a phone, you may skip this. Phone users are excused from the mission below.
        `,
        steps: [
          { say: md`Run the program. Type «python bill.py» and press Enter. It pauses at the breakpoint.`,
            expect: ["python bill.py", "py bill.py"],
            output: "> c:\\users\\you\\python-days\\bill.py(4)<module>()\n-> total += price\n(Pdb)" },
          { say: md`Print the price. Type «p price» and press Enter.`,
            expect: ["p price"],
            output: "15\n(Pdb)" },
          { say: md`Run the next line. Type «n» and press Enter.`,
            expect: ["n"],
            output: "> c:\\users\\you\\python-days\\bill.py(2)<module>()\n-> for price in [15, 20]:\n(Pdb)" },
          { say: md`Print the total so far. Type «p total» and press Enter.`,
            expect: ["p total"],
            output: "15\n(Pdb)" },
          { say: md`Let the program carry on. Type «c» and press Enter.`,
            expect: ["c"],
            output: "> c:\\users\\you\\python-days\\bill.py(4)<module>()\n-> total += price\n(Pdb)" },
        ],
        mission: md`
          Now do it for real.

          1. In IDLE, make «bill.py» with these lines, and save it in «python-days»:

          : total = 0
          : for price in [15, 20]:
          :     breakpoint()
          :     total += price
          : print("Total:", total)

          2. In the Command Prompt, run «python bill.py». At each «(Pdb)», try «p price», «p total», «n» and «c».
          3. When the program ends, the last line it prints is your receipt: write it in your notebook. Then delete the «breakpoint()» line: it is only for hunting bugs.
        `,
        hints: [
          md`Type the words in the grey box exactly, then press Enter.`,
          md`pdb commands are short: one letter, then a space and a name.`,
          md`If you get stuck in pdb, type «q» and press Enter to quit.`,
        ],
      },
    ],
    keys: [
      md`Logging levels, lowest to highest: debug, info, warning, error, critical. Only warning and above show unless you set «level».`,
      md`«logging.basicConfig(level=..., format=..., filename=...)» once, at the start; «%(levelname)s» and «%(message)s» shape each line.`,
      md`«logging.getLogger("name")» gives each part of a program its own logger; «%(name)s» shows it.`,
      md`On a laptop, «breakpoint()» pauses the program in pdb: «p» prints, «n» next line, «c» carry on, «q» quit.`,
    ],
  });

  // ---------------------------------------------------------------- Day 138
  day({
    slug: "web-data",
    title: "Data from the Internet",
    goal: "Read API answers in JSON, and fetch live data on your laptop.",
    minutes: 45,
    needs: [81, 120],
    win: "Today you can now read an API's JSON answer, dig into nested data safely, and fetch live data from the internet on your laptop.",
    learn: [
      md`
        ## What an API is

        Many websites have a second door, made for programs instead of people: an **API**. You visit a web address, and instead of a page, the answer is data, almost always **JSON** (Day 81). Weather, train times, exchange rates and cricket scores all come this way.

        On your laptop, Python can fetch an API's answer with «urllib.request», which comes with Python. It looks like this:
      `,
      code(py`
        import json
        import urllib.request

        url = "https://api.open-meteo.com/v1/forecast?latitude=18.52&longitude=73.86&current=temperature_2m"
        with urllib.request.urlopen(url, timeout=10) as response:
            data = json.load(response)
        print(data["current"]["temperature_2m"])
      `),
      md`
        This page cannot fetch from the internet, and it works offline. So today, the API answers are saved in files, exactly as an API sends them. Reading them is the same skill. The Laptop Mission fetches live data.
      `,
      md`
        ## Digging into nested JSON

        API answers are dictionaries and lists inside each other. Go in one step at a time: a key for a dictionary, a number or a loop for a list. Guess the output.
      `,
      ex(py`
        import json

        with open("weather.json") as f:
            data = json.load(f)
        print(data["city"], data["current"]["temp_c"])
        for day in data["daily"]:
            print(day["date"], day["max"] - day["min"])
      `, { files: { "weather.json": '{"city": "Pune", "current": {"temp_c": 31.5, "wind_kmh": 12}, "daily": [{"date": "2026-11-15", "max": 32, "min": 18}, {"date": "2026-11-16", "max": 30, "min": 17}]}' },
        predict: ["Pune 31.5\n2026-11-15 14\n2026-11-16 13", "Pune 31.5\n2026-11-15 32\n2026-11-16 30", "Pune {'temp_c': 31.5, 'wind_kmh': 12}\n2026-11-15 14\n2026-11-16 13"], answer: 0 }),
      md`
        Read a path like «data["current"]["temp_c"]» from left to right: the whole answer, then its «current» part, then the temperature inside it. When you meet a new API, print the whole answer first, and find the path by eye.
      `,
      pause(md`Good place for a break. Next: answers with parts missing.`),
      md`
        ## When parts are missing

        Real answers are messy. A field can be missing for one item, and a failed request often sends an error message instead of data. «.get(key, default)» gives a default instead of a KeyError. Check the answer's status before you use it. Guess the output.
      `,
      ex(py`
        import json

        reply = json.loads('{"status": "error", "message": "city not found"}')
        if reply.get("status") != "ok":
            print("API error:", reply.get("message", "unknown"))

        items = [{"name": "tea", "rating": 4.5}, {"name": "vada"}]
        for item in items:
            print(item["name"], item.get("rating", "no rating"))
      `, { predict: ["API error: city not found\ntea 4.5\nvada no rating", "API error: unknown\ntea 4.5\nvada no rating", "API error: city not found\ntea 4.5\nKeyError"], answer: 0 }),
      md`
        ## When the internet fails

        On a laptop, a fetch can fail: no internet, a wrong address, or a slow server. Always give «urlopen» a «timeout», in seconds, and catch the errors you expect:
      `,
      code(py`
        import urllib.error

        try:
            with urllib.request.urlopen(url, timeout=10) as response:
                data = json.load(response)
        except urllib.error.HTTPError as e:
            print("The site said no:", e.code)
        except urllib.error.URLError:
            print("Could not reach the site. Check your internet.")
      `),
      md`
        An **HTTPError** carries a status code: 404 means "not found", and 500 means the server broke. 200, which you never see as an error, means OK.
      `,
      tip(md`Many APIs need a free **key**, a password for programs. Never put a key in code you share. Keep it in a separate file that you do not upload.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          data = {"team": "India", "players": [{"name": "Rohit", "runs": [45, 12]}, {"name": "Virat", "runs": [88]}]}
          print(data["players"][1]["name"], sum(data["players"][0]["runs"]))
        `, options: ["Virat 57", "Rohit 57", "Virat 88"], answer: 0,
        explain: md`«players[1]» is the second player, Virat. «players[0]» is Rohit, whose runs add up to 57.`,
        why: [null, md`Lists count from 0, so «[1]» is the second player.`, md`The sum is of Rohit's runs, the player at «[0]».`],
        skill: "trace" },
      { q: md`What does this path pick out?`, code: py`
          answer["results"][0]["address"]["city"]
        `, options: ["The city in the address of the first result", "The first city in a list of cities", "Every result's city"], answer: 0, verify: false, mono: false,
        explain: md`Left to right: the results list, its first item, that item's address, and the city inside it.`,
        why: [null, md`«[0]» picks the first result, not the first city.`, md`It picks one result. A loop would be needed for every one.`],
        skill: "read" },
      { q: md`A program reads «day["daily"]["max"]» and stops with «TypeError: list indices must be integers or slices, not str». What is wrong?`,
        options: ["«daily» is a list, so pick an item first, like «[\"daily\"][0][\"max\"]», or loop over it", "The JSON file is broken", "«max» is a reserved word"], answer: 0, verify: false, mono: false,
        explain: md`A list is indexed by numbers. The «max» key is inside each item of the list.`,
        why: [null, md`The file loaded fine. The path is wrong.`, md`As a dictionary key in quotes, «"max"» is fine.`],
        skill: "debug" },
      { q: md`What does «item.get("rating", 0)» give back when the item has no rating?`,
        options: ["0", "None", "It raises KeyError"], answer: 0, verify: false, mono: false,
        explain: md`The second value is the default for a missing key.`,
        why: [null, md`That is what «.get("rating")» gives, with no default.`, md`«item["rating"]» would raise KeyError. «.get» does not.`],
        skill: "memory" },
      { q: md`Your laptop program fetches train times every minute. Sometimes the internet drops. What should it do?`,
        options: ["Use a «timeout», catch «URLError», report it and try again next minute", "Let it crash so you notice", "Remove the timeout so it waits for ever"], answer: 0, verify: false, mono: false,
        explain: md`Expected failures should be caught, reported and survived.`,
        why: [null, md`A crash stops every later fetch too.`, md`Without a timeout, one slow answer can freeze the program.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: the exchange rates",
        task: md`Answer each question without running the program.`,
        code: py`
          answer = {"base": "INR", "rates": {"USD": 0.012, "AED": 0.044}, "date": "2026-11-14"}
          rates = answer["rates"]
          dollars = round(5000 * rates["USD"], 2)
          missing = rates.get("JPY", "not given")
          print(dollars, missing, len(answer))
        `,
        ask: [{ line: 3, name: "dollars" }, { output: true }],
        hints: [
          md`«rates» is the inner dictionary.`,
          md`5000 × 0.012 is 60.0.`,
          md`JPY is not in rates, so «.get» gives the default. The answer has 3 top-level keys.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: the match scores",
        task: md`Answer each question without running the program.`,
        code: py`
          matches = [
              {"teams": ["IND", "AUS"], "winner": "IND"},
              {"teams": ["ENG", "SA"]},
              {"teams": ["IND", "NZ"], "winner": "NZ"},
          ]
          wins = {}
          for m in matches:
              w = m.get("winner")
              if w is not None:
                  wins[w] = wins.get(w, 0) + 1
          print(wins, matches[1]["teams"][1])
        `,
        ask: [{ line: 7, hit: 2, name: "w" }, { output: true }],
        hints: [
          md`The second match has no winner key yet, so «.get» gives None.`,
          md`Only matches with a winner are counted.`,
          md`«matches[1]["teams"][1]» is the second team of the second match.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: the top story",
        task: md`
          Put the lines in order. The program loads the saved news answer, and prints the title of the first story and how many there are:

          | Rain in Pune (3 stories)
        `,
        files: { "news.json": '{"status": "ok", "stories": [{"title": "Rain in Pune"}, {"title": "New metro line"}, {"title": "Exam dates out"}]}' },
        solution: py`
          import json
          with open("news.json") as f:
              data = json.load(f)
          stories = data["stories"]
          print(f"{stories[0]['title']} ({len(stories)} stories)")
        `,
        distractors: ["stories = data['stories']['title']"],
        tests: [{ output: "Rain in Pune (3 stories)" }],
        hints: [
          md`If you see «list indices must be integers», «stories» is a list. Pick a story with a number before asking for its title.`,
          md`If you see «I/O operation on closed file», the load must be inside the «with».`,
          md`If you see a NameError for data, the file must be loaded first.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the forecast that will not open",
        task: md`
          The program prints tomorrow's highest temperature from the saved forecast. It should print «Tomorrow: 30», but it stops with a TypeError. Tap the line that causes it, then fix it.
        `,
        files: { "forecast.json": '{"city": "Pune", "daily": [{"date": "2026-11-15", "max": 32}, {"date": "2026-11-16", "max": 30}]}' },
        starter: py`
          import json

          with open("forecast.json") as f:
              data = json.load(f)
          tomorrow = data["daily"]["max"]
          print("Tomorrow:", tomorrow)
        `,
        bugLines: [5],
        solution: py`
          import json

          with open("forecast.json") as f:
              data = json.load(f)
          tomorrow = data["daily"][1]["max"]
          print("Tomorrow:", tomorrow)
        `,
        tests: [
          { output: "Tomorrow: 30" },
          { files: { "forecast.json": '{"city": "Agra", "daily": [{"date": "2026-11-15", "max": 25}, {"date": "2026-11-16", "max": 27}, {"date": "2026-11-17", "max": 20}]}' }, output: "Tomorrow: 27" },
        ],
        wrong: [py`
          import json

          with open("forecast.json") as f:
              data = json.load(f)
          tomorrow = data["daily"][0]["max"]
          print("Tomorrow:", tomorrow)
        `],
        hints: [
          md`«daily» is a list of days, so it needs a number before the «max» key.`,
          md`The list starts with today, at «[0]». Tomorrow is the next one.`,
          md`If it prints 32, that is today. Use «[1]».`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: the week's average",
        task: md`
          The program prints each day's highest temperature. After the loop, also print the average of the highs, rounded to 1 place:

          | 2026-11-15 32
          | 2026-11-16 30
          | 2026-11-17 29
          | Average high: 30.3
        `,
        files: { "forecast.json": '{"city": "Pune", "daily": [{"date": "2026-11-15", "max": 32}, {"date": "2026-11-16", "max": 30}, {"date": "2026-11-17", "max": 29}]}' },
        starter: py`
          import json

          with open("forecast.json") as f:
              data = json.load(f)
          for day in data["daily"]:
              print(day["date"], day["max"])
        `,
        solution: py`
          import json

          with open("forecast.json") as f:
              data = json.load(f)
          for day in data["daily"]:
              print(day["date"], day["max"])
          highs = [day["max"] for day in data["daily"]]
          print("Average high:", round(sum(highs) / len(highs), 1))
        `,
        tests: [
          { output: "2026-11-15 32\n2026-11-16 30\n2026-11-17 29\nAverage high: 30.3" },
          { files: { "forecast.json": '{"city": "Goa", "daily": [{"date": "2026-11-15", "max": 31}]}' }, output: "2026-11-15 31\nAverage high: 31.0" },
        ],
        wrong: [py`
          import json

          with open("forecast.json") as f:
              data = json.load(f)
          for day in data["daily"]:
              print(day["date"], day["max"])
          print("Average high:", round(sum(day["max"] for day in data["daily"]) / 3, 1))
        `],
        hints: [
          md`Collect the highs in a list first, with a comprehension.`,
          md`If one day gives the wrong average, divide by how many days there are, not by 3.`,
          md`Round to 1 place with «round(..., 1)».`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: the train delay board",
        task: md`
          From a blank page. Load «trains.json», a saved train-status answer. If its «status» is not «"ok"», print «API error: » and its «message», or «unknown» if there is none, and stop. Otherwise, for each train print «number name: N min late», or «number name: on time» when its «delay_min» is 0 or missing. Last, print «Late: N of M». For the saved file it shows:

          | 12127 Intercity: 15 min late
          | 11007 Deccan: on time
          | 12123 Deccan Queen: on time
          | Late: 1 of 3
        `,
        files: { "trains.json": '{"status": "ok", "trains": [{"number": "12127", "name": "Intercity", "delay_min": 15}, {"number": "11007", "name": "Deccan", "delay_min": 0}, {"number": "12123", "name": "Deccan Queen"}]}' },
        starter: py``,
        solution: py`
          import json

          with open("trains.json") as f:
              data = json.load(f)
          if data.get("status") != "ok":
              print("API error:", data.get("message", "unknown"))
          else:
              late = 0
              for train in data["trains"]:
                  delay = train.get("delay_min", 0)
                  label = f"{train['number']} {train['name']}"
                  if delay > 0:
                      late += 1
                      print(f"{label}: {delay} min late")
                  else:
                      print(f"{label}: on time")
              print(f"Late: {late} of {len(data['trains'])}")
        `,
        tests: [
          { output: "12127 Intercity: 15 min late\n11007 Deccan: on time\n12123 Deccan Queen: on time\nLate: 1 of 3" },
          { files: { "trains.json": '{"status": "error", "message": "service down"}' }, output: "API error: service down" },
          { files: { "trains.json": '{"status": "error"}' }, output: "API error: unknown" },
          { files: { "trains.json": '{"status": "ok", "trains": [{"number": "1", "name": "A", "delay_min": 2}, {"number": "2", "name": "B", "delay_min": 40}]}' }, output: "1 A: 2 min late\n2 B: 40 min late\nLate: 2 of 2" },
        ],
        wrong: [py`
          import json

          with open("trains.json") as f:
              data = json.load(f)
          if data["status"] != "ok":
              print("API error:", data["message"])
          else:
              late = 0
              for train in data["trains"]:
                  delay = train.get("delay_min", 0)
                  label = f"{train['number']} {train['name']}"
                  if delay > 0:
                      late += 1
                      print(f"{label}: {delay} min late")
                  else:
                      print(f"{label}: on time")
              print(f"Late: {late} of {len(data['trains'])}")
        `],
        hints: [
          md`If an error answer with no message crashes with KeyError, use «data.get("message", "unknown")».`,
          md`If the Deccan Queen crashes with KeyError, its delay is missing: «train.get("delay_min", 0)».`,
          md`Check the status before you touch «data["trains"]»: an error answer has no trains.`,
        ],
      },
      {
        id: "d1", kind: "drill", title: "Laptop Mission: live weather",
        task: md`
          This pretend Command Prompt is in your «python-days» folder. Type the command and press Enter.

          On a phone, you may skip this. Phone users are excused from the mission below.
        `,
        steps: [
          { say: md`Fetch the weather. Type «python weather.py» and press Enter.`,
            expect: ["python weather.py", "py weather.py"],
            output: "Pune now: 24.3 °C" },
        ],
        mission: md`
          Now do it for real, with the internet on.

          1. In IDLE, make «weather.py» in «python-days» with these lines:

          : import json
          : import urllib.error
          : import urllib.request
          :
          : url = "https://api.open-meteo.com/v1/forecast?latitude=18.52&longitude=73.86&current=temperature_2m"
          : try:
          :     with urllib.request.urlopen(url, timeout=10) as response:
          :         data = json.load(response)
          :     print("Pune now:", data["current"]["temperature_2m"], "°C")
          : except urllib.error.URLError:
          :     print("Could not reach the weather service.")

          2. Run it. The temperature is your receipt: write it in your notebook.
          3. Open the address in your browser too, and read the JSON with your own eyes. Then change the latitude and longitude to your own town's, which a map site will show you.
        `,
        hints: [
          md`Type the words in the grey box exactly, then press Enter.`,
          md`There is one space between the word python and the file name.`,
          md`If python does not work on your laptop, py does the same job.`,
        ],
      },
    ],
    keys: [
      md`An API is a web address that answers with data, usually JSON, for programs to read.`,
      md`Dig into nested JSON one step at a time: keys for dictionaries, numbers or loops for lists. Print the whole answer first.`,
      md`Use «.get(key, default)» for parts that may be missing, and check the answer's status before using it.`,
      md`On a laptop: «urllib.request.urlopen(url, timeout=10)» and «json.load(response)»; catch HTTPError and URLError.`,
    ],
  });

  // ---------------------------------------------------------------- Day 139
  day({
    slug: "laptop-toolkit",
    title: "Your Laptop Toolkit: venv and git",
    goal: "Keep each project's packages apart, and save your work with git.",
    minutes: 50,
    needs: [43, 90],
    win: "Today you can now give each project its own packages with venv, list them in requirements.txt, and save your work step by step with git.",
    learn: [
      md`
        ## One project, one box of packages

        On Day 90 you installed a package with pip. Install everything into one Python, and projects start to fight: one needs pandas 2.1, another pandas 2.2. A **virtual environment**, or **venv**, is a private box of packages for one project. On Windows, inside a project folder:

        : python -m venv .venv
        : .venv\Scripts\activate
        : pip install requests

        - The first line makes the box, in a folder called «.venv».
        - The second line switches it on. The prompt then starts with «(.venv)».
        - Now «pip install» puts packages in this box only. «deactivate» switches it off.
        - On a Mac or Linux, the second line is «source .venv/bin/activate».
      `,
      md`
        ## requirements.txt: the shopping list

        «pip freeze > requirements.txt» writes every package in the box, with its exact version, into a file. Anyone, on any computer, makes their own box and runs «pip install -r requirements.txt» to get the same packages. Lines look like «requests==2.32.3». Lines starting with «#» are notes. A program can read that file too. Guess the output.
      `,
      ex(py`
        reqs = "requests==2.32.3\npandas==2.2.3\n# a comment\n\nrich==13.9.4"
        pins = {}
        for line in reqs.splitlines():
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            name, version = line.split("==")
            pins[name] = version
        print(len(pins), pins["pandas"])
      `, { predict: ["3 2.2.3", "5 2.2.3", "3 ==2.2.3"], answer: 0 }),
      md`
        ## Comparing versions

        Versions look like decimals, but they are not. 2.10 is newer than 2.9, yet as text «"2.10" < "2.9"», because «1» comes before «9». Compare them as tuples of whole numbers. Guess the output.
      `,
      ex(py`
        def version(text):
            return tuple(int(part) for part in text.split("."))

        print("2.10.0" > "2.9.1", version("2.10.0") > version("2.9.1"), version("3.12"))
      `, { predict: ["False True (3, 12)", "True True (3, 12)", "False False (3.12,)"], answer: 0 }),
      pause(md`Good place for a break. Next: git, save points for your code.`),
      md`
        ## git: save points for your code

        **git** keeps a history of your project. Each **commit** is a save point with a message, so you can see what changed and go back. You install git once from git-scm.com. Then, in a project folder:

        : git init
        : git add hello.py
        : git commit -m "First version"
        : git log --oneline

        - «git init» starts a history in this folder.
        - «git add» picks the changes to save, and «git commit» saves them with a message. «git add .» picks everything.
        - «git status» shows what changed since the last commit, and «git log» lists the commits.

        This course was built and published with git too.
      `,
      md`
        ## .gitignore: what git should not keep

        A file called «.gitignore» lists files that git should leave out: the «.venv» box, logs, and anything secret. It uses simple patterns: «*» matches any letters. Python's «fnmatch» understands the same kind of pattern. Guess the output.
      `,
      ex(py`
        from fnmatch import fnmatch

        patterns = ["*.log", "__pycache__", ".venv", "secret*"]
        for name in ["app.py", "app.log", ".venv", "secret_key.txt", "logs.txt"]:
            if any(fnmatch(name, p) for p in patterns):
                print("left out:", name)
      `, { predict: ["left out: app.log\nleft out: .venv\nleft out: secret_key.txt", "left out: app.log\nleft out: .venv\nleft out: secret_key.txt\nleft out: logs.txt", "left out: app.log"], answer: 0 }),
      md`
        «logs.txt» is kept: «*.log» needs the name to **end** in «.log».
      `,
      warn(md`Never commit passwords or API keys. Once they are in git's history, they stay there even if you delete the file later. List secret files in «.gitignore» before your first commit.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          from fnmatch import fnmatch

          names = ["data.csv", "data.csv.bak", "old.bak", "notes.txt"]
          print([n for n in names if fnmatch(n, "*.bak")])
        `, options: ["['data.csv.bak', 'old.bak']", "['old.bak']", "['data.csv', 'data.csv.bak', 'old.bak']"], answer: 0,
        explain: md`«*» matches any letters, dots too, so both names ending in «.bak» match.`,
        why: [null, md`«*» also matches «data.csv», so data.csv.bak ends in .bak too.`, md`data.csv does not end in .bak.`],
        skill: "trace" },
      { q: md`What do these lines in a «.gitignore» file do?`, code: py`
          .venv
          *.log
          config_secret.json
        `, options: ["git leaves out the venv box, every log file and the secret config", "git deletes those files", "git saves only those files"], answer: 0, verify: false, mono: false,
        explain: md`They stay on your laptop, but git never adds them to the history.`,
        why: [null, md`Nothing is deleted. git just ignores them.`, md`It is the opposite: these are left out.`],
        skill: "read" },
      { q: md`You ran «pip install requests», but «python app.py» says «ModuleNotFoundError: No module named 'requests'». What is the most likely cause?`,
        options: ["The package went into a different Python: switch the project's venv on before running", "requests is not a real package", "app.py needs to be renamed"], answer: 0, verify: false, mono: false,
        explain: md`pip and python must be the same box. Activate «.venv» and run both inside it.`,
        why: [null, md`It is a very common package.`, md`The file name is not the problem.`],
        skill: "debug" },
      { q: md`What is the difference between «git add» and «git commit»?`,
        options: ["«add» picks the changes to save; «commit» saves them as one save point with a message", "«add» saves, «commit» uploads", "They do the same thing"], answer: 0, verify: false, mono: false,
        explain: md`You can add several files, then commit them together with one message.`,
        why: [null, md`Neither uploads. Uploading is «git push», to a site like GitHub.`, md`«add» alone saves nothing to the history.`],
        skill: "memory" },
      { q: md`A friend should be able to run your project with the same packages you used. What do you give them?`,
        options: ["A «requirements.txt» from «pip freeze», with your code", "Your whole «.venv» folder", "A list of package names, without versions"], answer: 0, verify: false, mono: false,
        explain: md`They make their own venv and run «pip install -r requirements.txt».`,
        why: [null, md`A venv belongs to one computer, and is large. It goes in .gitignore.`, md`Without versions they may get newer ones that behave differently.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: reading the shopping list",
        task: md`Answer each question without running the program.`,
        code: py`
          text = "# for the bot\nrequests==2.32.3\n\npytz==2024.1\nrich==13.9.4"
          names = []
          for line in text.splitlines():
              if line and not line.startswith("#"):
                  names.append(line.split("==")[0])
          longest = max(names, key=len)
          print(len(names), longest, names[-1])
        `,
        ask: [{ line: 6, name: "longest" }, { output: true }],
        hints: [
          md`The comment line and the empty line are skipped.`,
          md`Only the part before «==» is kept: the package name.`,
          md`«requests» has 8 letters, the most.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: which version is newer",
        task: md`Answer each question without running the program.`,
        code: py`
          def version(text):
              return tuple(int(p) for p in text.split("."))

          have = "1.10.2"
          need = "1.9"
          as_text = have >= need
          as_numbers = version(have) >= version(need)
          print(as_text, as_numbers, version(need))
        `,
        ask: [{ line: 6, name: "as_text" }, { output: true }],
        hints: [
          md`As text, Python compares letter by letter: «1.1» against «1.9».`,
          md`«1» comes before «9», so the text comparison says False.`,
          md`As tuples, (1, 10, 2) is compared with (1, 9), and 10 is more than 9.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: what git leaves out",
        task: md`
          Put the lines in order. The program checks each file name against the «.gitignore» patterns, and prints the ones git keeps:

          | keep: main.py
          | keep: README.md
        `,
        solution: py`
          from fnmatch import fnmatch
          patterns = ["*.log", ".venv", "*.db"]
          for name in ["main.py", "debug.log", "README.md", "results.db"]:
              if not any(fnmatch(name, p) for p in patterns):
                  print("keep:", name)
        `,
        distractors: ["    if any(fnmatch(p, name) for p in patterns):"],
        tests: [{ output: "keep: main.py\nkeep: README.md" }],
        hints: [
          md`If the left-out files are printed, the test must be «not any(...)».`,
          md`«fnmatch(name, pattern)» takes the name first, then the pattern.`,
          md`If you see a NameError for fnmatch, the import must come first.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the Python that is too new",
        task: md`
          The program checks that your Python version is at least 3.9. «3.12» should print «OK», but it prints «Too old». Tap the line that causes it, then fix it.
        `,
        starter: py`
          need = "3.9"
          have = input("Your Python version: ")
          if have >= need:
              print("OK")
          else:
              print("Too old")
        `,
        bugLines: [3],
        solution: py`
          need = "3.9"
          have = input("Your Python version: ")
          if tuple(int(p) for p in have.split(".")) >= tuple(int(p) for p in need.split(".")):
              print("OK")
          else:
              print("Too old")
        `,
        tests: [
          { inputs: ["3.12"], output: "OK" },
          { inputs: ["3.8"], output: "Too old" },
          { inputs: ["3.9"], output: "OK" },
          { inputs: ["3.10.4"], output: "OK" },
          { inputs: ["2.7"], output: "Too old" },
        ],
        wrong: [py`
          need = "3.9"
          have = input("Your Python version: ")
          if float(have) >= float(need):
              print("OK")
          else:
              print("Too old")
        `],
        hints: [
          md`As text, «"3.12" >= "3.9"» is False: «1» comes before «9».`,
          md`Split each version on «.», and compare tuples of whole numbers.`,
          md`Do not use «float»: 3.12 as a decimal is less than 3.9, and «3.10.4» is not a number at all.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: leave out the database",
        task: md`
          Add a pattern so git also leaves out every «.db» file, and the «__pycache__» folder. The program then prints:

          | keep: app.py
          | keep: notes.md
        `,
        starter: py`
          from fnmatch import fnmatch

          patterns = ["*.log", ".venv"]
          for name in ["app.py", "app.log", "notes.md", "planner.db", "__pycache__"]:
              if not any(fnmatch(name, p) for p in patterns):
                  print("keep:", name)
        `,
        solution: py`
          from fnmatch import fnmatch

          patterns = ["*.log", ".venv", "*.db", "__pycache__"]
          for name in ["app.py", "app.log", "notes.md", "planner.db", "__pycache__"]:
              if not any(fnmatch(name, p) for p in patterns):
                  print("keep:", name)
        `,
        tests: [{ output: "keep: app.py\nkeep: notes.md" }],
        wrong: [py`
          from fnmatch import fnmatch

          patterns = ["*.log", ".venv", "db", "__pycache__"]
          for name in ["app.py", "app.log", "notes.md", "planner.db", "__pycache__"]:
              if not any(fnmatch(name, p) for p in patterns):
                  print("keep:", name)
        `],
        hints: [
          md`If planner.db is still kept, the pattern needs a «*» before «.db».`,
          md`If __pycache__ is still kept, add it to the list exactly as written.`,
          md`Only the list of patterns needs to change.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: the requirements checker",
        task: md`
          From a blank page. The packages installed are «{"requests": "2.32.3", "pandas": "2.1.0", "pytz": "2024.1"}». Read «requirements.txt», skipping empty lines and lines starting with «#». For each «name==version» line, print one of:

          - «requests: ok» when the installed version is the same;
          - «pandas: have 2.1.0, need 2.2.3» when it differs;
          - «rich: missing» when it is not installed.

          Last, print «Ready» if all were ok, or «Fix N package(s)». For the saved file it shows:

          | requests: ok
          | pandas: have 2.1.0, need 2.2.3
          | rich: missing
          | Fix 2 package(s)
        `,
        files: { "requirements.txt": "# packages for the bot\nrequests==2.32.3\n\npandas==2.2.3\nrich==13.9.4\n" },
        starter: py``,
        solution: py`
          installed = {"requests": "2.32.3", "pandas": "2.1.0", "pytz": "2024.1"}
          problems = 0
          with open("requirements.txt") as f:
              for line in f:
                  line = line.strip()
                  if not line or line.startswith("#"):
                      continue
                  name, need = line.split("==")
                  have = installed.get(name)
                  if have is None:
                      print(f"{name}: missing")
                      problems += 1
                  elif have != need:
                      print(f"{name}: have {have}, need {need}")
                      problems += 1
                  else:
                      print(f"{name}: ok")
          print("Ready" if problems == 0 else f"Fix {problems} package(s)")
        `,
        tests: [
          { output: "requests: ok\npandas: have 2.1.0, need 2.2.3\nrich: missing\nFix 2 package(s)" },
          { files: { "requirements.txt": "pytz==2024.1\n  \nrequests==2.32.3\n" }, output: "pytz: ok\nrequests: ok\nReady" },
          { files: { "requirements.txt": "# nothing yet\n" }, output: "Ready" },
        ],
        wrong: [py`
          installed = {"requests": "2.32.3", "pandas": "2.1.0", "pytz": "2024.1"}
          problems = 0
          with open("requirements.txt") as f:
              for line in f:
                  line = line.strip()
                  if line.startswith("#"):
                      continue
                  name, need = line.split("==")
                  have = installed.get(name)
                  if have is None:
                      print(f"{name}: missing")
                      problems += 1
                  elif have != need:
                      print(f"{name}: have {have}, need {need}")
                      problems += 1
                  else:
                      print(f"{name}: ok")
          print("Ready" if problems == 0 else f"Fix {problems} package(s)")
        `],
        hints: [
          md`If you see «not enough values to unpack», an empty line reached «split». Skip lines that are empty after «strip()».`,
          md`If a missing package crashes with KeyError, use «installed.get(name)», which gives None.`,
          md`If a line with spaces counts as a package, «strip()» it before checking.`,
        ],
      },
      {
        id: "d1", kind: "drill", title: "Laptop Mission: a venv of your own",
        task: md`
          This pretend Command Prompt is in a new folder, «my-bot». Type each command and press Enter.

          On a phone, you may skip this. Phone users are excused from the missions below.
        `,
        steps: [
          { say: md`Make the box. Type «python -m venv .venv» and press Enter. It prints nothing when it works.`,
            expect: ["python -m venv .venv", "py -m venv .venv"],
            output: "" },
          { say: md`Switch it on. Type «.venv\Scripts\activate» and press Enter.`,
            expect: [".venv\\Scripts\\activate", ".venv/Scripts/activate", ".venv\\Scripts\\activate.bat"],
            output: "(.venv) C:\\Users\\you\\my-bot>" },
          { say: md`Install a package into this box only. Type «pip install requests» and press Enter.`,
            expect: ["pip install requests", "python -m pip install requests"],
            output: "Collecting requests\n...\nSuccessfully installed certifi-2024.8.30 charset-normalizer-3.4.0 idna-3.10 requests-2.32.3 urllib3-2.2.3" },
          { say: md`Write the shopping list. Type «pip freeze > requirements.txt» and press Enter.`,
            expect: ["pip freeze > requirements.txt", "python -m pip freeze > requirements.txt"],
            output: "" },
        ],
        mission: md`
          Now do it for real.

          1. In File Explorer, make a folder «my-bot» inside «python-days». Open a Command Prompt there.
          2. Run the four commands above. Then open «requirements.txt» in Notepad. The number of lines in it is your receipt: write it in your notebook.
          3. Type «deactivate» to switch the box off.
        `,
        hints: [
          md`Type the words in the grey box exactly, then press Enter.`,
          md`The activate line uses backslashes, «\», on Windows.`,
          md`If python does not work on your laptop, py does the same job.`,
        ],
      },
      {
        id: "d2", kind: "drill", title: "Laptop Mission: your first commits",
        task: md`
          This pretend Command Prompt is in «my-bot», where «hello.py» is waiting. You installed git from git-scm.com. Type each command and press Enter.

          On a phone, you may skip this.
        `,
        steps: [
          { say: md`Start a history. Type «git init» and press Enter.`,
            expect: ["git init"],
            output: "Initialized empty Git repository in C:/Users/you/python-days/my-bot/.git/" },
          { say: md`Pick the file to save. Type «git add hello.py» and press Enter.`,
            expect: ["git add hello.py"],
            output: "" },
          { say: md`Save it with a message. Type «git commit -m "First version"» and press Enter.`,
            expect: ['git commit -m "First version"', "git commit -m 'First version'"],
            output: "[master (root-commit) 3f2a9c1] First version\n 1 file changed, 2 insertions(+)\n create mode 100644 hello.py" },
          { say: md`See the history. Type «git log --oneline» and press Enter.`,
            expect: ["git log --oneline"],
            output: "3f2a9c1 (HEAD -> master) First version" },
        ],
        mission: md`
          Now do it for real.

          1. Install git from git-scm.com, keeping the choices it suggests. The first time, tell git your name: «git config --global user.name "Your Name"», and the same with «user.email».
          2. Make «.gitignore» in «my-bot» with the line «.venv», so the box is never saved.
          3. Run the four commands above, then change «hello.py», and run «git add hello.py» and a second «git commit» with a new message.
          4. Run «git log --oneline». The first word on the top line, your newest commit's short code, is your receipt: write it in your notebook.
        `,
        hints: [
          md`Type the words in the grey box exactly, then press Enter.`,
          md`The commit message goes inside quotes, after «-m».`,
          md`If git asks who you are, run the two «git config» lines from the mission first.`,
        ],
      },
    ],
    keys: [
      md`«python -m venv .venv», then activate it: each project gets its own box of packages.`,
      md`«pip freeze > requirements.txt» saves the exact versions; «pip install -r requirements.txt» rebuilds them.`,
      md`Compare versions as tuples of whole numbers, never as text or decimals.`,
      md`git: «init» once, then «add» and «commit -m "message"» for each save point; «status» and «log» to look around.`,
      md`«.gitignore» keeps out the venv, logs and secrets. Never commit a password or key.`,
    ],
  });

  // ---------------------------------------------------------------- Day 140
  day({
    slug: "expense-command-centre",
    title: "Project: Expense Command Centre",
    goal: "Build a typed-command expense tool with match, enums, neat tables, logging and tests.",
    minutes: 60,
    kind: "project",
    needs: [131, 132, 136, 137],
    win: "Today you can now build a complete command tool: an Enum and a dataclass for the data, match for the commands, a neat report, a log file, and tests that catch broken copies. This completes Level 11 and the whole 140-day course.",
    learn: [
      md`
        ## The brief

        You spend money every day: food, travel, books. The **Expense Command Centre** takes typed commands, like «add 120 food thali», «total food», «undo» and «report», and keeps a log of what happened. It uses this level's tools together:

        - **Category**, an Enum (Day 136): food, travel, books or other. Nothing else is allowed.
        - **Expense**, a dataclass (Day 116): the amount, the category and a note.
        - **Tracker**, a class that adds, totals, undoes and reports.
        - **handle(tracker, line)**, which picks the command with «match» (Day 132).
        - A neat report table (Day 131), a log file (Day 137), and a unittest class (Day 123).

        Making a member from typed text checks it for you. Guess the output.
      `,
      ex(py`
        from enum import Enum

        class Category(Enum):
            FOOD = "food"
            TRAVEL = "travel"

        print(Category("food").name)
        try:
            Category("games")
        except ValueError as e:
            print("Refused:", e)
      `, { predict: ["FOOD\nRefused: 'games' is not a valid Category", "food\nRefused: 'games' is not a valid Category", "FOOD\nRefused: games"], answer: 0 }),
      md`
        So «Category(text)» turns typed words into a member, and refuses anything else with a ValueError, which you can catch and show.

        ## Five stages

        Stage 1 builds the data and the Tracker. Stage 2 adds the commands. Stage 3 adds the report table. Stage 4 adds the log file. In Stage 5 your tests must catch 3 broken trackers. All amounts are invented.
      `,
      pause(md`This project usually takes two sittings. Each stage saves when you pass it, so stop after any stage.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          words = "add 45.5 travel auto to station".split()
          match words:
              case ["add", amount, category, *note]:
                  print(float(amount) * 2, category, " ".join(note))
        `, options: ["91.0 travel auto to station", "91.0 travel ['auto', 'to', 'station']", "45.545.5 travel auto to station"], answer: 0,
        explain: md`«*note» catches the last three words as a list, and «" ".join» puts them back together.`,
        why: [null, md`The list was joined into text before printing.`, md`«float(amount)» makes it a number before doubling.`],
        skill: "trace" },
      { q: md`What does this line make?`, code: py`
          lines.append(f"{cat.value:<10}{spent:>10.2f}{spent / grand:>8.0%}")
        `, options: ["One table row: the category on the left, the money on the right with 2 decimals, and its share as a whole percentage", "Three separate lines", "A row with the category's name in capitals"], answer: 0, verify: false, mono: false,
        explain: md`Three columns with widths 10, 10 and 8. «.0%» shows the share with no decimals.`,
        why: [null, md`It is one f-string, so one line.`, md`«.value» is the small-letter text, like «food».`],
        skill: "read" },
      { q: md`«add 50 games» crashes the tool with ValueError. Where should the error be caught?`,
        options: ["In «handle», around «tracker.add», turning it into «Error: ...» text", "Inside the Enum", "Nowhere: crashing is fine"], answer: 0, verify: false, mono: false,
        explain: md`The Tracker refuses bad data; the command layer explains the refusal to the user.`,
        why: [null, md`The Enum is right to refuse. The problem is that nobody catches it.`, md`One typo should not end the whole program.`],
        skill: "debug" },
      { q: md`In «case ["add", amount, category, *note]:», what is «note» when the command is «add 20 food»?`,
        options: ["An empty list, «[]»", "None", "The case does not fit"], answer: 0, verify: false, mono: false,
        explain: md`«*note» can catch nothing at all, so the case still fits.`,
        why: [null, md`A starred name is always a list, possibly empty.`, md`It fits: «*note» allows zero words.`],
        skill: "memory" },
      { q: md`Where should the tool's messages for the programmer, like "added 120 food", go?`,
        options: ["To a log file, with «logging»", "Printed for the user with each command", "Into the report table"], answer: 0, verify: false, mono: false,
        explain: md`Print is for the user; logging is for the programmer (Day 137).`,
        why: [null, md`That would bury the answers the user wants.`, md`The report is a summary for the user.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "s1", stage: 1, title: "Stage 1: the data and the Tracker",
        task: md`
          «Category» and «Expense» are given. Finish two methods of «Tracker»:

          - «add(amount, category, note="")» takes typed text: it turns «amount» into a decimal number, and raises «ValueError("amount must be above 0")» if it is not above 0. It turns «category» into a member with «Category(category)», which raises ValueError for an unknown one. It stores and gives back the new Expense.
          - «total(category=None)» gives back the total of every expense, or of one Category only.

          The program should print:

          | Refused: 'games' is not a valid Category
          | Refused: amount must be above 0
          | 165.5 120.0 Expense(amount=45.5, category=<Category.TRAVEL: 'travel'>, note='')
        `,
        starter: py`
          from dataclasses import dataclass
          from enum import Enum


          class Category(Enum):
              FOOD = "food"
              TRAVEL = "travel"
              BOOKS = "books"
              OTHER = "other"


          @dataclass
          class Expense:
              amount: float
              category: Category
              note: str = ""


          class Tracker:
              def __init__(self):
                  self.expenses = []

              def add(self, amount, category, note=""):
                  # amount is text like "120" or "45.5"; category is text like "food"
                  # raises ValueError for an unknown category or an amount not above 0
                  pass

              def total(self, category=None):
                  # the total of all expenses, or of one Category only
                  pass


          t = Tracker()
          t.add("120", "food", "thali")
          t.add("45.5", "travel")
          for amount, category in [("30", "games"), ("0", "food")]:
              try:
                  t.add(amount, category)
              except ValueError as e:
                  print("Refused:", e)
          print(t.total(), t.total(Category.FOOD), t.expenses[1])
        `,
        solution: py`
          from dataclasses import dataclass
          from enum import Enum


          class Category(Enum):
              FOOD = "food"
              TRAVEL = "travel"
              BOOKS = "books"
              OTHER = "other"


          @dataclass
          class Expense:
              amount: float
              category: Category
              note: str = ""


          class Tracker:
              def __init__(self):
                  self.expenses = []

              def add(self, amount, category, note=""):
                  # amount is text like "120" or "45.5"; category is text like "food"
                  # raises ValueError for an unknown category or an amount not above 0
                  value = float(amount)
                  if value <= 0:
                      raise ValueError("amount must be above 0")
                  expense = Expense(value, Category(category), note)
                  self.expenses.append(expense)
                  return expense

              def total(self, category=None):
                  # the total of all expenses, or of one Category only
                  return sum(e.amount for e in self.expenses if category is None or e.category is category)


          t = Tracker()
          t.add("120", "food", "thali")
          t.add("45.5", "travel")
          for amount, category in [("30", "games"), ("0", "food")]:
              try:
                  t.add(amount, category)
              except ValueError as e:
                  print("Refused:", e)
          print(t.total(), t.total(Category.FOOD), t.expenses[1])
        `,
        tests: [
          { output: "Refused: 'games' is not a valid Category\nRefused: amount must be above 0\n165.5 120.0 Expense(amount=45.5, category=<Category.TRAVEL: 'travel'>, note='')" },
          { py: py`
              C = need("Category")
              t = new("Tracker")
              e = t.add("12.5", "books", "notes")
              assert e.amount == 12.5 and e.category is C.BOOKS and e.note == "notes", f"add('12.5', 'books', 'notes') should give back Expense(12.5, Category.BOOKS, 'notes'), but gave {e!r}."
              t.add("7", "other")
              assert t.total() == 19.5, f"The total of 12.5 and 7 is 19.5, but total() gave {t.total()}."
              assert t.total(C.OTHER) == 7, "total(Category.OTHER) should count only the other expense."
              assert t.total(C.FOOD) == 0, "A category with no expenses totals 0."
              for amount, category in (("-1", "food"), ("5", "pets")):
                  refused = False
                  try:
                      t.add(amount, category)
                  except ValueError:
                      refused = True
                  assert refused, f"add({amount!r}, {category!r}) should raise ValueError."
              assert len(t.expenses) == 2, "A refused expense must not be stored."
            ` },
        ],
        wrong: [py`
          from dataclasses import dataclass
          from enum import Enum


          class Category(Enum):
              FOOD = "food"
              TRAVEL = "travel"
              BOOKS = "books"
              OTHER = "other"


          @dataclass
          class Expense:
              amount: float
              category: Category
              note: str = ""


          class Tracker:
              def __init__(self):
                  self.expenses = []

              def add(self, amount, category, note=""):
                  # amount is text like "120" or "45.5"; category is text like "food"
                  # raises ValueError for an unknown category or an amount not above 0
                  value = float(amount)
                  expense = Expense(value, Category(category), note)
                  self.expenses.append(expense)
                  return expense

              def total(self, category=None):
                  # the total of all expenses, or of one Category only
                  return sum(e.amount for e in self.expenses if category is None or e.category is category)


          t = Tracker()
          t.add("120", "food", "thali")
          t.add("45.5", "travel")
          for amount, category in [("30", "games"), ("0", "food")]:
              try:
                  t.add(amount, category)
              except ValueError as e:
                  print("Refused:", e)
          print(t.total(), t.total(Category.FOOD), t.expenses[1])
        `],
        hints: [
          md`If an amount of 0 is stored, check «value <= 0» and raise before storing.`,
          md`If «total(Category.FOOD)» counts everything, keep only expenses whose «category is» the one asked for.`,
          md`If the amounts come out as text, turn them into numbers with «float» first.`,
        ],
      },
      {
        id: "s2", stage: 2, title: "Stage 2: the commands",
        task: md`
          This stage starts from a finished Tracker, now with «undo()». Write «handle(tracker, line)», which gives back the text to show, using «match line.split():»:

          - «add AMOUNT CATEGORY [note words]» gives «Added 120.00 for food», or «Error: » and the ValueError's message.
          - «total» gives «Total: 165.50». «total food» gives «food: 120.00», or «Error: no category pets» for an unknown one.
          - «undo» gives «Undid 45.50 for travel», or «Nothing to undo».
          - Anything else gives «Unknown command: » and the line.

          The program should print:

          | Added 120.00 for food
          | Added 45.50 for travel
          | Error: 'games' is not a valid Category
          | Error: amount must be above 0
          | Total: 165.50
          | food: 120.00
          | Error: no category pets
          | Undid 45.50 for travel
          | Undid 120.00 for food
          | Nothing to undo
          | Unknown command: fly
        `,
        starter: py`
          from dataclasses import dataclass
          from enum import Enum


          class Category(Enum):
              FOOD = "food"
              TRAVEL = "travel"
              BOOKS = "books"
              OTHER = "other"


          @dataclass
          class Expense:
              amount: float
              category: Category
              note: str = ""


          class Tracker:
              def __init__(self):
                  self.expenses = []

              def add(self, amount, category, note=""):
                  # amount is text like "120" or "45.5"; category is text like "food"
                  # raises ValueError for an unknown category or an amount not above 0
                  value = float(amount)
                  if value <= 0:
                      raise ValueError("amount must be above 0")
                  expense = Expense(value, Category(category), note)
                  self.expenses.append(expense)
                  return expense

              def total(self, category=None):
                  # the total of all expenses, or of one Category only
                  return sum(e.amount for e in self.expenses if category is None or e.category is category)

              def undo(self):
                  # removes and gives back the last expense, or None when there is none
                  if not self.expenses:
                      return None
                  return self.expenses.pop()


          def handle(tracker, line):
              # runs one typed command and gives back the text to show
              pass


          tracker = Tracker()
          for line in ["add 120 food thali", "add 45.5 travel auto to station", "add 30 games",
                       "add -5 food", "total", "total food", "total pets", "undo", "undo", "undo", "fly"]:
              print(handle(tracker, line))
        `,
        solution: py`
          from dataclasses import dataclass
          from enum import Enum


          class Category(Enum):
              FOOD = "food"
              TRAVEL = "travel"
              BOOKS = "books"
              OTHER = "other"


          @dataclass
          class Expense:
              amount: float
              category: Category
              note: str = ""


          class Tracker:
              def __init__(self):
                  self.expenses = []

              def add(self, amount, category, note=""):
                  # amount is text like "120" or "45.5"; category is text like "food"
                  # raises ValueError for an unknown category or an amount not above 0
                  value = float(amount)
                  if value <= 0:
                      raise ValueError("amount must be above 0")
                  expense = Expense(value, Category(category), note)
                  self.expenses.append(expense)
                  return expense

              def total(self, category=None):
                  # the total of all expenses, or of one Category only
                  return sum(e.amount for e in self.expenses if category is None or e.category is category)

              def undo(self):
                  # removes and gives back the last expense, or None when there is none
                  if not self.expenses:
                      return None
                  return self.expenses.pop()


          def handle(tracker, line):
              # runs one typed command and gives back the text to show
              match line.split():
                  case ["add", amount, category, *note]:
                      try:
                          expense = tracker.add(amount, category, " ".join(note))
                      except ValueError as e:
                          return f"Error: {e}"
                      return f"Added {expense.amount:.2f} for {expense.category.value}"
                  case ["total"]:
                      return f"Total: {tracker.total():.2f}"
                  case ["total", name]:
                      try:
                          category = Category(name)
                      except ValueError:
                          return f"Error: no category {name}"
                      return f"{name}: {tracker.total(category):.2f}"
                  case ["undo"]:
                      expense = tracker.undo()
                      if expense is None:
                          return "Nothing to undo"
                      return f"Undid {expense.amount:.2f} for {expense.category.value}"
                  case _:
                      return f"Unknown command: {line}"


          tracker = Tracker()
          for line in ["add 120 food thali", "add 45.5 travel auto to station", "add 30 games",
                       "add -5 food", "total", "total food", "total pets", "undo", "undo", "undo", "fly"]:
              print(handle(tracker, line))
        `,
        tests: [
          { output: "Added 120.00 for food\nAdded 45.50 for travel\nError: 'games' is not a valid Category\nError: amount must be above 0\nTotal: 165.50\nfood: 120.00\nError: no category pets\nUndid 45.50 for travel\nUndid 120.00 for food\nNothing to undo\nUnknown command: fly" },
          { py: py`
              t = new("Tracker")
              assert call("handle", t, "add 5 other pens and paper") == "Added 5.00 for other", "add with a note of several words should still be added."
              assert t.expenses[-1].note == "pens and paper", f"The note words should be joined with spaces, but the note is {t.expenses[-1].note!r}."
              assert call("handle", t, "total other") == "other: 5.00", "«total other» should give «other: 5.00»."
              assert call("handle", t, "add five food") == "Error: could not convert string to float: 'five'", "A word as the amount should give «Error: » and the ValueError's message."
              assert call("handle", t, "add 5") == "Unknown command: add 5", "«add 5» has no category, so it is not an add command."
            ` },
          { uses: ["kw:match", "kw:case"], msg: "Choose the command with «match» and «case»." },
        ],
        wrong: [py`
          from dataclasses import dataclass
          from enum import Enum


          class Category(Enum):
              FOOD = "food"
              TRAVEL = "travel"
              BOOKS = "books"
              OTHER = "other"


          @dataclass
          class Expense:
              amount: float
              category: Category
              note: str = ""


          class Tracker:
              def __init__(self):
                  self.expenses = []

              def add(self, amount, category, note=""):
                  # amount is text like "120" or "45.5"; category is text like "food"
                  # raises ValueError for an unknown category or an amount not above 0
                  value = float(amount)
                  if value <= 0:
                      raise ValueError("amount must be above 0")
                  expense = Expense(value, Category(category), note)
                  self.expenses.append(expense)
                  return expense

              def total(self, category=None):
                  # the total of all expenses, or of one Category only
                  return sum(e.amount for e in self.expenses if category is None or e.category is category)

              def undo(self):
                  # removes and gives back the last expense, or None when there is none
                  if not self.expenses:
                      return None
                  return self.expenses.pop()


          def handle(tracker, line):
              # runs one typed command and gives back the text to show
              match line.split():
                  case ["add", amount, category]:
                      try:
                          expense = tracker.add(amount, category, "")
                      except ValueError as e:
                          return f"Error: {e}"
                      return f"Added {expense.amount:.2f} for {expense.category.value}"
                  case ["total"]:
                      return f"Total: {tracker.total():.2f}"
                  case ["total", name]:
                      try:
                          category = Category(name)
                      except ValueError:
                          return f"Error: no category {name}"
                      return f"{name}: {tracker.total(category):.2f}"
                  case ["undo"]:
                      expense = tracker.undo()
                      if expense is None:
                          return "Nothing to undo"
                      return f"Undid {expense.amount:.2f} for {expense.category.value}"
                  case _:
                      return f"Unknown command: {line}"


          tracker = Tracker()
          for line in ["add 120 food thali", "add 45.5 travel auto to station", "add 30 games",
                       "add -5 food", "total", "total food", "total pets", "undo", "undo", "undo", "fly"]:
              print(handle(tracker, line))
        `],
        hints: [
          md`If «add 45.5 travel auto to station» is an unknown command, catch the note words with «*note», and join them with spaces.`,
          md`If «add 50 games» crashes, put «try» and «except ValueError» around «tracker.add».`,
          md`If «total pets» crashes, turn the name into a Category inside a «try» too.`,
        ],
      },
      {
        id: "s3", stage: 3, carry: "s2", title: "Stage 3: the report",
        task: md`
          Add «report()» to the Tracker. It gives back a list of lines. First a heading, then one row for each category with money spent, A to Z by its value. Last, a line of 28 dashes, and the total. Use widths 10, 10 and 8: «{'Category':<10}{'Amount':>10}{'Share':>8}» for the heading, «.2f» for money and «.0%» for the share. Then add «case ["report"]:» to «handle», giving back the lines joined with «"\n"».

          Change the main lines to:

          : tracker = Tracker()
          : for line in ["add 120 food thali", "add 60 travel", "add 300 books polity guide", "add 20 food tea", "report"]:
          :     print(handle(tracker, line))

          It prints:

          | Added 120.00 for food
          | Added 60.00 for travel
          | Added 300.00 for books
          | Added 20.00 for food
          | Category      Amount   Share
          | books         300.00     60%
          | food          140.00     28%
          | travel         60.00     12%
          | ----------------------------
          | Total         500.00
        `,
        starter: py`
          from dataclasses import dataclass
          from enum import Enum


          class Category(Enum):
              FOOD = "food"
              TRAVEL = "travel"
              BOOKS = "books"
              OTHER = "other"


          @dataclass
          class Expense:
              amount: float
              category: Category
              note: str = ""


          class Tracker:
              def __init__(self):
                  self.expenses = []

              def add(self, amount, category, note=""):
                  # amount is text like "120" or "45.5"; category is text like "food"
                  # raises ValueError for an unknown category or an amount not above 0
                  value = float(amount)
                  if value <= 0:
                      raise ValueError("amount must be above 0")
                  expense = Expense(value, Category(category), note)
                  self.expenses.append(expense)
                  return expense

              def total(self, category=None):
                  # the total of all expenses, or of one Category only
                  return sum(e.amount for e in self.expenses if category is None or e.category is category)

              def undo(self):
                  # removes and gives back the last expense, or None when there is none
                  if not self.expenses:
                      return None
                  return self.expenses.pop()


          def handle(tracker, line):
              # runs one typed command and gives back the text to show
              match line.split():
                  case ["add", amount, category, *note]:
                      try:
                          expense = tracker.add(amount, category, " ".join(note))
                      except ValueError as e:
                          return f"Error: {e}"
                      return f"Added {expense.amount:.2f} for {expense.category.value}"
                  case ["total"]:
                      return f"Total: {tracker.total():.2f}"
                  case ["total", name]:
                      try:
                          category = Category(name)
                      except ValueError:
                          return f"Error: no category {name}"
                      return f"{name}: {tracker.total(category):.2f}"
                  case ["undo"]:
                      expense = tracker.undo()
                      if expense is None:
                          return "Nothing to undo"
                      return f"Undid {expense.amount:.2f} for {expense.category.value}"
                  case _:
                      return f"Unknown command: {line}"


          tracker = Tracker()
          for line in ["add 120 food thali", "add 45.5 travel auto to station", "add 30 games",
                       "add -5 food", "total", "total food", "total pets", "undo", "undo", "undo", "fly"]:
              print(handle(tracker, line))
        `,
        solution: py`
          from dataclasses import dataclass
          from enum import Enum


          class Category(Enum):
              FOOD = "food"
              TRAVEL = "travel"
              BOOKS = "books"
              OTHER = "other"


          @dataclass
          class Expense:
              amount: float
              category: Category
              note: str = ""


          class Tracker:
              def __init__(self):
                  self.expenses = []

              def add(self, amount, category, note=""):
                  # amount is text like "120" or "45.5"; category is text like "food"
                  # raises ValueError for an unknown category or an amount not above 0
                  value = float(amount)
                  if value <= 0:
                      raise ValueError("amount must be above 0")
                  expense = Expense(value, Category(category), note)
                  self.expenses.append(expense)
                  return expense

              def total(self, category=None):
                  # the total of all expenses, or of one Category only
                  return sum(e.amount for e in self.expenses if category is None or e.category is category)

              def undo(self):
                  # removes and gives back the last expense, or None when there is none
                  if not self.expenses:
                      return None
                  return self.expenses.pop()

              def report(self):
                  # a neat table: each category with money spent, A to Z, then the total
                  lines = [f"{'Category':<10}{'Amount':>10}{'Share':>8}"]
                  grand = self.total()
                  for cat in sorted(Category, key=lambda c: c.value):
                      spent = self.total(cat)
                      if spent > 0:
                          lines.append(f"{cat.value:<10}{spent:>10.2f}{spent / grand:>8.0%}")
                  lines.append("-" * 28)
                  lines.append(f"{'Total':<10}{grand:>10.2f}")
                  return lines


          def handle(tracker, line):
              # runs one typed command and gives back the text to show
              match line.split():
                  case ["add", amount, category, *note]:
                      try:
                          expense = tracker.add(amount, category, " ".join(note))
                      except ValueError as e:
                          return f"Error: {e}"
                      return f"Added {expense.amount:.2f} for {expense.category.value}"
                  case ["total"]:
                      return f"Total: {tracker.total():.2f}"
                  case ["total", name]:
                      try:
                          category = Category(name)
                      except ValueError:
                          return f"Error: no category {name}"
                      return f"{name}: {tracker.total(category):.2f}"
                  case ["undo"]:
                      expense = tracker.undo()
                      if expense is None:
                          return "Nothing to undo"
                      return f"Undid {expense.amount:.2f} for {expense.category.value}"
                  case ["report"]:
                      return "\n".join(tracker.report())
                  case _:
                      return f"Unknown command: {line}"


          tracker = Tracker()
          for line in ["add 120 food thali", "add 60 travel", "add 300 books polity guide", "add 20 food tea", "report"]:
              print(handle(tracker, line))
        `,
        tests: [
          { output: "Added 120.00 for food\nAdded 60.00 for travel\nAdded 300.00 for books\nAdded 20.00 for food\nCategory      Amount   Share\nbooks         300.00     60%\nfood          140.00     28%\ntravel         60.00     12%\n----------------------------\nTotal         500.00" },
          { py: py`
              t = new("Tracker")
              t.add("10", "other")
              want = ["Category      Amount   Share", "other          10.00    100%", "-" * 28, "Total          10.00"]
              assert t.report() == want, f"With one expense of 10 in other, report() should be {want}, but it is {t.report()}."
              assert call("handle", t, "report") == chr(10).join(want),"«report» should give back the report lines joined with new lines."
            ` },
        ],
        wrong: [py`
          from dataclasses import dataclass
          from enum import Enum


          class Category(Enum):
              FOOD = "food"
              TRAVEL = "travel"
              BOOKS = "books"
              OTHER = "other"


          @dataclass
          class Expense:
              amount: float
              category: Category
              note: str = ""


          class Tracker:
              def __init__(self):
                  self.expenses = []

              def add(self, amount, category, note=""):
                  # amount is text like "120" or "45.5"; category is text like "food"
                  # raises ValueError for an unknown category or an amount not above 0
                  value = float(amount)
                  if value <= 0:
                      raise ValueError("amount must be above 0")
                  expense = Expense(value, Category(category), note)
                  self.expenses.append(expense)
                  return expense

              def total(self, category=None):
                  # the total of all expenses, or of one Category only
                  return sum(e.amount for e in self.expenses if category is None or e.category is category)

              def undo(self):
                  # removes and gives back the last expense, or None when there is none
                  if not self.expenses:
                      return None
                  return self.expenses.pop()

              def report(self):
                  # a neat table: each category with money spent, A to Z, then the total
                  lines = [f"{'Category':<10}{'Amount':>10}{'Share':>8}"]
                  grand = self.total()
                  for cat in sorted(Category, key=lambda c: c.value):
                      spent = self.total(cat)
                      if spent > 0:
                          lines.append(f"{cat.value:<10}{spent:>10}{spent / grand:>8.0%}")
                  lines.append("-" * 28)
                  lines.append(f"{'Total':<10}{grand:>10.2f}")
                  return lines


          def handle(tracker, line):
              # runs one typed command and gives back the text to show
              match line.split():
                  case ["add", amount, category, *note]:
                      try:
                          expense = tracker.add(amount, category, " ".join(note))
                      except ValueError as e:
                          return f"Error: {e}"
                      return f"Added {expense.amount:.2f} for {expense.category.value}"
                  case ["total"]:
                      return f"Total: {tracker.total():.2f}"
                  case ["total", name]:
                      try:
                          category = Category(name)
                      except ValueError:
                          return f"Error: no category {name}"
                      return f"{name}: {tracker.total(category):.2f}"
                  case ["undo"]:
                      expense = tracker.undo()
                      if expense is None:
                          return "Nothing to undo"
                      return f"Undid {expense.amount:.2f} for {expense.category.value}"
                  case ["report"]:
                      return "\n".join(tracker.report())
                  case _:
                      return f"Unknown command: {line}"


          tracker = Tracker()
          for line in ["add 120 food thali", "add 60 travel", "add 300 books polity guide", "add 20 food tea", "report"]:
              print(handle(tracker, line))
        `],
        hints: [
          md`If an amount shows as «300.0», give it 2 decimals: «:>10.2f».`,
          md`If a category with nothing spent shows a row, skip it when its total is 0.`,
          md`If the categories are in the order of the Enum, sort them by «c.value».`,
        ],
      },
      {
        id: "s4", stage: 4, carry: "s3", title: "Stage 4: the log file",
        task: md`
          Add «import logging» at the top. In «__init__», add «self.log = logging.getLogger("tracker")». Then log:

          - in «add», after storing: «self.log.info(f"added {value:.2f} {expense.category.value}")»;
          - in «undo», when there is nothing: «self.log.warning("nothing to undo")»;
          - in «handle», for an unknown command: «tracker.log.error(f"unknown command: {line}")».

          Before «tracker = Tracker()», set up logging to «expenses.log», level INFO, format «%(levelname)s %(name)s: %(message)s». At the end, add:

          : for line in ["undo", "undo", "undo", "undo", "undo", "dance"]:
          :     handle(tracker, line)
          : print(open("expenses.log").read())

          The last six lines printed are:

          | INFO tracker: added 120.00 food
          | INFO tracker: added 60.00 travel
          | INFO tracker: added 300.00 books
          | INFO tracker: added 20.00 food
          | WARNING tracker: nothing to undo
          | ERROR tracker: unknown command: dance
        `,
        starter: py`
          from dataclasses import dataclass
          from enum import Enum


          class Category(Enum):
              FOOD = "food"
              TRAVEL = "travel"
              BOOKS = "books"
              OTHER = "other"


          @dataclass
          class Expense:
              amount: float
              category: Category
              note: str = ""


          class Tracker:
              def __init__(self):
                  self.expenses = []

              def add(self, amount, category, note=""):
                  # amount is text like "120" or "45.5"; category is text like "food"
                  # raises ValueError for an unknown category or an amount not above 0
                  value = float(amount)
                  if value <= 0:
                      raise ValueError("amount must be above 0")
                  expense = Expense(value, Category(category), note)
                  self.expenses.append(expense)
                  return expense

              def total(self, category=None):
                  # the total of all expenses, or of one Category only
                  return sum(e.amount for e in self.expenses if category is None or e.category is category)

              def undo(self):
                  # removes and gives back the last expense, or None when there is none
                  if not self.expenses:
                      return None
                  return self.expenses.pop()

              def report(self):
                  # a neat table: each category with money spent, A to Z, then the total
                  lines = [f"{'Category':<10}{'Amount':>10}{'Share':>8}"]
                  grand = self.total()
                  for cat in sorted(Category, key=lambda c: c.value):
                      spent = self.total(cat)
                      if spent > 0:
                          lines.append(f"{cat.value:<10}{spent:>10.2f}{spent / grand:>8.0%}")
                  lines.append("-" * 28)
                  lines.append(f"{'Total':<10}{grand:>10.2f}")
                  return lines


          def handle(tracker, line):
              # runs one typed command and gives back the text to show
              match line.split():
                  case ["add", amount, category, *note]:
                      try:
                          expense = tracker.add(amount, category, " ".join(note))
                      except ValueError as e:
                          return f"Error: {e}"
                      return f"Added {expense.amount:.2f} for {expense.category.value}"
                  case ["total"]:
                      return f"Total: {tracker.total():.2f}"
                  case ["total", name]:
                      try:
                          category = Category(name)
                      except ValueError:
                          return f"Error: no category {name}"
                      return f"{name}: {tracker.total(category):.2f}"
                  case ["undo"]:
                      expense = tracker.undo()
                      if expense is None:
                          return "Nothing to undo"
                      return f"Undid {expense.amount:.2f} for {expense.category.value}"
                  case ["report"]:
                      return "\n".join(tracker.report())
                  case _:
                      return f"Unknown command: {line}"


          tracker = Tracker()
          for line in ["add 120 food thali", "add 60 travel", "add 300 books polity guide", "add 20 food tea", "report"]:
              print(handle(tracker, line))
        `,
        solution: py`
          import logging
          from dataclasses import dataclass
          from enum import Enum


          class Category(Enum):
              FOOD = "food"
              TRAVEL = "travel"
              BOOKS = "books"
              OTHER = "other"


          @dataclass
          class Expense:
              amount: float
              category: Category
              note: str = ""


          class Tracker:
              def __init__(self):
                  self.expenses = []
                  self.log = logging.getLogger("tracker")

              def add(self, amount, category, note=""):
                  # amount is text like "120" or "45.5"; category is text like "food"
                  # raises ValueError for an unknown category or an amount not above 0
                  value = float(amount)
                  if value <= 0:
                      raise ValueError("amount must be above 0")
                  expense = Expense(value, Category(category), note)
                  self.expenses.append(expense)
                  self.log.info(f"added {value:.2f} {expense.category.value}")
                  return expense

              def total(self, category=None):
                  # the total of all expenses, or of one Category only
                  return sum(e.amount for e in self.expenses if category is None or e.category is category)

              def undo(self):
                  # removes and gives back the last expense, or None when there is none
                  if not self.expenses:
                      self.log.warning("nothing to undo")
                      return None
                  return self.expenses.pop()

              def report(self):
                  # a neat table: each category with money spent, A to Z, then the total
                  lines = [f"{'Category':<10}{'Amount':>10}{'Share':>8}"]
                  grand = self.total()
                  for cat in sorted(Category, key=lambda c: c.value):
                      spent = self.total(cat)
                      if spent > 0:
                          lines.append(f"{cat.value:<10}{spent:>10.2f}{spent / grand:>8.0%}")
                  lines.append("-" * 28)
                  lines.append(f"{'Total':<10}{grand:>10.2f}")
                  return lines


          def handle(tracker, line):
              # runs one typed command and gives back the text to show
              match line.split():
                  case ["add", amount, category, *note]:
                      try:
                          expense = tracker.add(amount, category, " ".join(note))
                      except ValueError as e:
                          return f"Error: {e}"
                      return f"Added {expense.amount:.2f} for {expense.category.value}"
                  case ["total"]:
                      return f"Total: {tracker.total():.2f}"
                  case ["total", name]:
                      try:
                          category = Category(name)
                      except ValueError:
                          return f"Error: no category {name}"
                      return f"{name}: {tracker.total(category):.2f}"
                  case ["undo"]:
                      expense = tracker.undo()
                      if expense is None:
                          return "Nothing to undo"
                      return f"Undid {expense.amount:.2f} for {expense.category.value}"
                  case ["report"]:
                      return "\n".join(tracker.report())
                  case _:
                      tracker.log.error(f"unknown command: {line}")
                      return f"Unknown command: {line}"


          logging.basicConfig(filename="expenses.log", level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")
          tracker = Tracker()
          for line in ["add 120 food thali", "add 60 travel", "add 300 books polity guide", "add 20 food tea", "report"]:
              print(handle(tracker, line))
          for line in ["undo", "undo", "undo", "undo", "undo", "dance"]:
              handle(tracker, line)
          print(open("expenses.log").read())
        `,
        tests: [
          { contains: ["Total         500.00\nINFO tracker: added 120.00 food\nINFO tracker: added 60.00 travel\nINFO tracker: added 300.00 books\nINFO tracker: added 20.00 food\nWARNING tracker: nothing to undo\nERROR tracker: unknown command: dance"] },
          { py: py`
              log = file_text("expenses.log").splitlines()
              assert len(log) == 6, f"expenses.log should have 6 lines: 4 adds, 1 warning and 1 error, but it has {len(log)}."
              assert all(" tracker: " in line for line in log), "Every log line should come from the logger called «tracker»."
            ` },
        ],
        wrong: [py`
          import logging
          from dataclasses import dataclass
          from enum import Enum


          class Category(Enum):
              FOOD = "food"
              TRAVEL = "travel"
              BOOKS = "books"
              OTHER = "other"


          @dataclass
          class Expense:
              amount: float
              category: Category
              note: str = ""


          class Tracker:
              def __init__(self):
                  self.expenses = []
                  self.log = logging.getLogger("tracker")

              def add(self, amount, category, note=""):
                  # amount is text like "120" or "45.5"; category is text like "food"
                  # raises ValueError for an unknown category or an amount not above 0
                  value = float(amount)
                  if value <= 0:
                      raise ValueError("amount must be above 0")
                  expense = Expense(value, Category(category), note)
                  self.expenses.append(expense)
                  self.log.info(f"added {value:.2f} {expense.category.value}")
                  return expense

              def total(self, category=None):
                  # the total of all expenses, or of one Category only
                  return sum(e.amount for e in self.expenses if category is None or e.category is category)

              def undo(self):
                  # removes and gives back the last expense, or None when there is none
                  if not self.expenses:
                      self.log.warning("nothing to undo")
                      return None
                  return self.expenses.pop()

              def report(self):
                  # a neat table: each category with money spent, A to Z, then the total
                  lines = [f"{'Category':<10}{'Amount':>10}{'Share':>8}"]
                  grand = self.total()
                  for cat in sorted(Category, key=lambda c: c.value):
                      spent = self.total(cat)
                      if spent > 0:
                          lines.append(f"{cat.value:<10}{spent:>10.2f}{spent / grand:>8.0%}")
                  lines.append("-" * 28)
                  lines.append(f"{'Total':<10}{grand:>10.2f}")
                  return lines


          def handle(tracker, line):
              # runs one typed command and gives back the text to show
              match line.split():
                  case ["add", amount, category, *note]:
                      try:
                          expense = tracker.add(amount, category, " ".join(note))
                      except ValueError as e:
                          return f"Error: {e}"
                      return f"Added {expense.amount:.2f} for {expense.category.value}"
                  case ["total"]:
                      return f"Total: {tracker.total():.2f}"
                  case ["total", name]:
                      try:
                          category = Category(name)
                      except ValueError:
                          return f"Error: no category {name}"
                      return f"{name}: {tracker.total(category):.2f}"
                  case ["undo"]:
                      expense = tracker.undo()
                      if expense is None:
                          return "Nothing to undo"
                      return f"Undid {expense.amount:.2f} for {expense.category.value}"
                  case ["report"]:
                      return "\n".join(tracker.report())
                  case _:
                      tracker.log.error(f"unknown command: {line}")
                      return f"Unknown command: {line}"


          logging.basicConfig(filename="expenses.log", format="%(levelname)s %(name)s: %(message)s")
          tracker = Tracker()
          for line in ["add 120 food thali", "add 60 travel", "add 300 books polity guide", "add 20 food tea", "report"]:
              print(handle(tracker, line))
          for line in ["undo", "undo", "undo", "undo", "undo", "dance"]:
              handle(tracker, line)
          print(open("expenses.log").read())
        `],
        hints: [
          md`If the info lines are missing from the file, set «level=logging.INFO».`,
          md`If the lines say «root», log through «self.log», the logger called «tracker».`,
          md`If you see «No such file», set up logging before anything is logged.`,
        ],
      },
      {
        id: "s5", stage: 5, carry: "s4", title: "Stage 5: catch 3 broken trackers",
        task: md`
          Add «import unittest» at the top, and this test class at the very end:

          : class TestTracker(unittest.TestCase):
          :     def setUp(self):
          :         self.t = Tracker()
          :
          :     def test_add_and_total(self):
          :         self.t.add("100", "food")
          :         self.assertEqual(self.t.total(), 100)
          :
          : unittest.main()

          Add at least two more tests. I have **3 broken copies** of «Tracker». One lets an amount of 0 in. One's «total» ignores the category asked for. One's «undo» takes the first expense instead of the last. Your tests must pass on your Tracker and fail on every broken copy.
        `,
        starter: py`
          import logging
          from dataclasses import dataclass
          from enum import Enum


          class Category(Enum):
              FOOD = "food"
              TRAVEL = "travel"
              BOOKS = "books"
              OTHER = "other"


          @dataclass
          class Expense:
              amount: float
              category: Category
              note: str = ""


          class Tracker:
              def __init__(self):
                  self.expenses = []
                  self.log = logging.getLogger("tracker")

              def add(self, amount, category, note=""):
                  # amount is text like "120" or "45.5"; category is text like "food"
                  # raises ValueError for an unknown category or an amount not above 0
                  value = float(amount)
                  if value <= 0:
                      raise ValueError("amount must be above 0")
                  expense = Expense(value, Category(category), note)
                  self.expenses.append(expense)
                  self.log.info(f"added {value:.2f} {expense.category.value}")
                  return expense

              def total(self, category=None):
                  # the total of all expenses, or of one Category only
                  return sum(e.amount for e in self.expenses if category is None or e.category is category)

              def undo(self):
                  # removes and gives back the last expense, or None when there is none
                  if not self.expenses:
                      self.log.warning("nothing to undo")
                      return None
                  return self.expenses.pop()

              def report(self):
                  # a neat table: each category with money spent, A to Z, then the total
                  lines = [f"{'Category':<10}{'Amount':>10}{'Share':>8}"]
                  grand = self.total()
                  for cat in sorted(Category, key=lambda c: c.value):
                      spent = self.total(cat)
                      if spent > 0:
                          lines.append(f"{cat.value:<10}{spent:>10.2f}{spent / grand:>8.0%}")
                  lines.append("-" * 28)
                  lines.append(f"{'Total':<10}{grand:>10.2f}")
                  return lines


          def handle(tracker, line):
              # runs one typed command and gives back the text to show
              match line.split():
                  case ["add", amount, category, *note]:
                      try:
                          expense = tracker.add(amount, category, " ".join(note))
                      except ValueError as e:
                          return f"Error: {e}"
                      return f"Added {expense.amount:.2f} for {expense.category.value}"
                  case ["total"]:
                      return f"Total: {tracker.total():.2f}"
                  case ["total", name]:
                      try:
                          category = Category(name)
                      except ValueError:
                          return f"Error: no category {name}"
                      return f"{name}: {tracker.total(category):.2f}"
                  case ["undo"]:
                      expense = tracker.undo()
                      if expense is None:
                          return "Nothing to undo"
                      return f"Undid {expense.amount:.2f} for {expense.category.value}"
                  case ["report"]:
                      return "\n".join(tracker.report())
                  case _:
                      tracker.log.error(f"unknown command: {line}")
                      return f"Unknown command: {line}"


          logging.basicConfig(filename="expenses.log", level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")
          tracker = Tracker()
          for line in ["add 120 food thali", "add 60 travel", "add 300 books polity guide", "add 20 food tea", "report"]:
              print(handle(tracker, line))
          for line in ["undo", "undo", "undo", "undo", "undo", "dance"]:
              handle(tracker, line)
          print(open("expenses.log").read())
        `,
        solution: py`
          import logging
          import unittest
          from dataclasses import dataclass
          from enum import Enum


          class Category(Enum):
              FOOD = "food"
              TRAVEL = "travel"
              BOOKS = "books"
              OTHER = "other"


          @dataclass
          class Expense:
              amount: float
              category: Category
              note: str = ""


          class Tracker:
              def __init__(self):
                  self.expenses = []
                  self.log = logging.getLogger("tracker")

              def add(self, amount, category, note=""):
                  # amount is text like "120" or "45.5"; category is text like "food"
                  # raises ValueError for an unknown category or an amount not above 0
                  value = float(amount)
                  if value <= 0:
                      raise ValueError("amount must be above 0")
                  expense = Expense(value, Category(category), note)
                  self.expenses.append(expense)
                  self.log.info(f"added {value:.2f} {expense.category.value}")
                  return expense

              def total(self, category=None):
                  # the total of all expenses, or of one Category only
                  return sum(e.amount for e in self.expenses if category is None or e.category is category)

              def undo(self):
                  # removes and gives back the last expense, or None when there is none
                  if not self.expenses:
                      self.log.warning("nothing to undo")
                      return None
                  return self.expenses.pop()

              def report(self):
                  # a neat table: each category with money spent, A to Z, then the total
                  lines = [f"{'Category':<10}{'Amount':>10}{'Share':>8}"]
                  grand = self.total()
                  for cat in sorted(Category, key=lambda c: c.value):
                      spent = self.total(cat)
                      if spent > 0:
                          lines.append(f"{cat.value:<10}{spent:>10.2f}{spent / grand:>8.0%}")
                  lines.append("-" * 28)
                  lines.append(f"{'Total':<10}{grand:>10.2f}")
                  return lines


          def handle(tracker, line):
              # runs one typed command and gives back the text to show
              match line.split():
                  case ["add", amount, category, *note]:
                      try:
                          expense = tracker.add(amount, category, " ".join(note))
                      except ValueError as e:
                          return f"Error: {e}"
                      return f"Added {expense.amount:.2f} for {expense.category.value}"
                  case ["total"]:
                      return f"Total: {tracker.total():.2f}"
                  case ["total", name]:
                      try:
                          category = Category(name)
                      except ValueError:
                          return f"Error: no category {name}"
                      return f"{name}: {tracker.total(category):.2f}"
                  case ["undo"]:
                      expense = tracker.undo()
                      if expense is None:
                          return "Nothing to undo"
                      return f"Undid {expense.amount:.2f} for {expense.category.value}"
                  case ["report"]:
                      return "\n".join(tracker.report())
                  case _:
                      tracker.log.error(f"unknown command: {line}")
                      return f"Unknown command: {line}"


          logging.basicConfig(filename="expenses.log", level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")
          tracker = Tracker()
          for line in ["add 120 food thali", "add 60 travel", "add 300 books polity guide", "add 20 food tea", "report"]:
              print(handle(tracker, line))
          for line in ["undo", "undo", "undo", "undo", "undo", "dance"]:
              handle(tracker, line)
          print(open("expenses.log").read())


          class TestTracker(unittest.TestCase):
              def setUp(self):
                  self.t = Tracker()

              def test_add_and_total(self):
                  self.t.add("100", "food")
                  self.assertEqual(self.t.total(), 100)

              def test_refuses_zero(self):
                  with self.assertRaises(ValueError):
                      self.t.add("0", "food")
                  self.assertEqual(self.t.expenses, [])

              def test_total_of_one_category(self):
                  self.t.add("100", "food")
                  self.t.add("50", "travel")
                  self.assertEqual(self.t.total(Category.TRAVEL), 50)

              def test_undo_takes_the_last(self):
                  self.t.add("100", "food")
                  self.t.add("50", "travel")
                  self.assertEqual(self.t.undo().amount, 50)
                  self.assertIsNone(Tracker().undo())

              def test_handle_add(self):
                  self.assertEqual(handle(self.t, "add 12.5 books notes"), "Added 12.50 for books")
                  self.assertEqual(handle(self.t, "jump"), "Unknown command: jump")


          unittest.main()
        `,
        tests: [
          { contains: ["ERROR tracker: unknown command: dance"] },
          { py: py`
              r = unit("TestTracker")
              assert r.testsRun >= 3, f"TestTracker has {r.testsRun} test(s). Write at least 3, each named «test_...»."
              assert r.wasSuccessful(), "A test in TestTracker fails on your own Tracker. Check what each test expects."
              class TakesZero:
                  def __init__(self):
                      self.expenses = []
                      self.log = logging.getLogger("tracker")

                  def add(self, amount, category, note=""):
                      # amount is text like "120" or "45.5"; category is text like "food"
                      # raises ValueError for an unknown category or an amount not above 0
                      value = float(amount)
                      if value < 0:
                          raise ValueError("amount must be above 0")
                      expense = Expense(value, Category(category), note)
                      self.expenses.append(expense)
                      self.log.info(f"added {value:.2f} {expense.category.value}")
                      return expense

                  def total(self, category=None):
                      # the total of all expenses, or of one Category only
                      return sum(e.amount for e in self.expenses if category is None or e.category is category)

                  def undo(self):
                      # removes and gives back the last expense, or None when there is none
                      if not self.expenses:
                          self.log.warning("nothing to undo")
                          return None
                      return self.expenses.pop()

                  def report(self):
                      # a neat table: each category with money spent, A to Z, then the total
                      lines = [f"{'Category':<10}{'Amount':>10}{'Share':>8}"]
                      grand = self.total()
                      for cat in sorted(Category, key=lambda c: c.value):
                          spent = self.total(cat)
                          if spent > 0:
                              lines.append(f"{cat.value:<10}{spent:>10.2f}{spent / grand:>8.0%}")
                      lines.append("-" * 28)
                      lines.append(f"{'Total':<10}{grand:>10.2f}")
                      return lines
              assert not unit("TestTracker", Tracker=TakesZero).wasSuccessful(), "A Tracker that lets an amount of 0 in still passed. Test that «add('0', ...)» raises ValueError."
              class TotalIgnoresCategory:
                  def __init__(self):
                      self.expenses = []
                      self.log = logging.getLogger("tracker")

                  def add(self, amount, category, note=""):
                      # amount is text like "120" or "45.5"; category is text like "food"
                      # raises ValueError for an unknown category or an amount not above 0
                      value = float(amount)
                      if value <= 0:
                          raise ValueError("amount must be above 0")
                      expense = Expense(value, Category(category), note)
                      self.expenses.append(expense)
                      self.log.info(f"added {value:.2f} {expense.category.value}")
                      return expense

                  def total(self, category=None):
                      # the total of all expenses, or of one Category only
                      return sum(e.amount for e in self.expenses )

                  def undo(self):
                      # removes and gives back the last expense, or None when there is none
                      if not self.expenses:
                          self.log.warning("nothing to undo")
                          return None
                      return self.expenses.pop()

                  def report(self):
                      # a neat table: each category with money spent, A to Z, then the total
                      lines = [f"{'Category':<10}{'Amount':>10}{'Share':>8}"]
                      grand = self.total()
                      for cat in sorted(Category, key=lambda c: c.value):
                          spent = self.total(cat)
                          if spent > 0:
                              lines.append(f"{cat.value:<10}{spent:>10.2f}{spent / grand:>8.0%}")
                      lines.append("-" * 28)
                      lines.append(f"{'Total':<10}{grand:>10.2f}")
                      return lines
              assert not unit("TestTracker", Tracker=TotalIgnoresCategory).wasSuccessful(), "A total that ignores the category still passed. Add two categories, and check the total of one."
              class UndoTakesFirst:
                  def __init__(self):
                      self.expenses = []
                      self.log = logging.getLogger("tracker")

                  def add(self, amount, category, note=""):
                      # amount is text like "120" or "45.5"; category is text like "food"
                      # raises ValueError for an unknown category or an amount not above 0
                      value = float(amount)
                      if value <= 0:
                          raise ValueError("amount must be above 0")
                      expense = Expense(value, Category(category), note)
                      self.expenses.append(expense)
                      self.log.info(f"added {value:.2f} {expense.category.value}")
                      return expense

                  def total(self, category=None):
                      # the total of all expenses, or of one Category only
                      return sum(e.amount for e in self.expenses if category is None or e.category is category)

                  def undo(self):
                      # removes and gives back the last expense, or None when there is none
                      if not self.expenses:
                          self.log.warning("nothing to undo")
                          return None
                      return self.expenses.pop(0)

                  def report(self):
                      # a neat table: each category with money spent, A to Z, then the total
                      lines = [f"{'Category':<10}{'Amount':>10}{'Share':>8}"]
                      grand = self.total()
                      for cat in sorted(Category, key=lambda c: c.value):
                          spent = self.total(cat)
                          if spent > 0:
                              lines.append(f"{cat.value:<10}{spent:>10.2f}{spent / grand:>8.0%}")
                      lines.append("-" * 28)
                      lines.append(f"{'Total':<10}{grand:>10.2f}")
                      return lines
              assert not unit("TestTracker", Tracker=UndoTakesFirst).wasSuccessful(), "An undo that takes the first expense still passed. Add two, undo, and check which one came back."
            ` },
          { uses: ["method:main"], msg: "End the program with «unittest.main()», so the tests run." },
        ],
        wrong: [py`
          import logging
          import unittest
          from dataclasses import dataclass
          from enum import Enum


          class Category(Enum):
              FOOD = "food"
              TRAVEL = "travel"
              BOOKS = "books"
              OTHER = "other"


          @dataclass
          class Expense:
              amount: float
              category: Category
              note: str = ""


          class Tracker:
              def __init__(self):
                  self.expenses = []
                  self.log = logging.getLogger("tracker")

              def add(self, amount, category, note=""):
                  # amount is text like "120" or "45.5"; category is text like "food"
                  # raises ValueError for an unknown category or an amount not above 0
                  value = float(amount)
                  if value <= 0:
                      raise ValueError("amount must be above 0")
                  expense = Expense(value, Category(category), note)
                  self.expenses.append(expense)
                  self.log.info(f"added {value:.2f} {expense.category.value}")
                  return expense

              def total(self, category=None):
                  # the total of all expenses, or of one Category only
                  return sum(e.amount for e in self.expenses if category is None or e.category is category)

              def undo(self):
                  # removes and gives back the last expense, or None when there is none
                  if not self.expenses:
                      self.log.warning("nothing to undo")
                      return None
                  return self.expenses.pop()

              def report(self):
                  # a neat table: each category with money spent, A to Z, then the total
                  lines = [f"{'Category':<10}{'Amount':>10}{'Share':>8}"]
                  grand = self.total()
                  for cat in sorted(Category, key=lambda c: c.value):
                      spent = self.total(cat)
                      if spent > 0:
                          lines.append(f"{cat.value:<10}{spent:>10.2f}{spent / grand:>8.0%}")
                  lines.append("-" * 28)
                  lines.append(f"{'Total':<10}{grand:>10.2f}")
                  return lines


          def handle(tracker, line):
              # runs one typed command and gives back the text to show
              match line.split():
                  case ["add", amount, category, *note]:
                      try:
                          expense = tracker.add(amount, category, " ".join(note))
                      except ValueError as e:
                          return f"Error: {e}"
                      return f"Added {expense.amount:.2f} for {expense.category.value}"
                  case ["total"]:
                      return f"Total: {tracker.total():.2f}"
                  case ["total", name]:
                      try:
                          category = Category(name)
                      except ValueError:
                          return f"Error: no category {name}"
                      return f"{name}: {tracker.total(category):.2f}"
                  case ["undo"]:
                      expense = tracker.undo()
                      if expense is None:
                          return "Nothing to undo"
                      return f"Undid {expense.amount:.2f} for {expense.category.value}"
                  case ["report"]:
                      return "\n".join(tracker.report())
                  case _:
                      tracker.log.error(f"unknown command: {line}")
                      return f"Unknown command: {line}"


          logging.basicConfig(filename="expenses.log", level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")
          tracker = Tracker()
          for line in ["add 120 food thali", "add 60 travel", "add 300 books polity guide", "add 20 food tea", "report"]:
              print(handle(tracker, line))
          for line in ["undo", "undo", "undo", "undo", "undo", "dance"]:
              handle(tracker, line)
          print(open("expenses.log").read())


          class TestTracker(unittest.TestCase):
              def setUp(self):
                  self.t = Tracker()

              def test_add_and_total(self):
                  self.t.add("100", "food")
                  self.assertEqual(self.t.total(), 100)

              def test_report(self):
                  self.t.add("10", "food")
                  self.assertEqual(self.t.report()[-1], "Total          10.00")


          unittest.main()
        `],
        hints: [
          md`If the copy that takes 0 passes, add a test with «with self.assertRaises(ValueError):» around «self.t.add("0", "food")».`,
          md`If the copy whose total ignores the category passes, add food and travel, then check «self.t.total(Category.TRAVEL)».`,
          md`If the copy whose undo takes the first passes, add two different amounts, undo once, and check the amount that came back.`,
        ],
      },
      {
        id: "d1", kind: "drill", title: "Laptop Mission: your command centre",
        task: md`
          This pretend Command Prompt is in your «python-days» folder. Your program now has a loop that reads commands until «quit». Type each line and press Enter.

          On a phone, you may skip this. Phone users are excused from the mission below.
        `,
        steps: [
          { say: md`Start it. Type «python expenses.py» and press Enter.`,
            expect: ["python expenses.py", "py expenses.py"],
            output: "Commands: add AMOUNT CATEGORY [note], total, total CATEGORY, undo, report, quit\n>" },
          { say: md`Add an expense. Type «add 35 food samosa» and press Enter.`,
            expect: ["add 35 food samosa"],
            output: "Added 35.00 for food\n>" },
          { say: md`See the report. Type «report» and press Enter.`,
            expect: ["report"],
            output: "Category      Amount   Share\nfood           35.00    100%\n----------------------------\nTotal          35.00\n>" },
        ],
        mission: md`
          Now do it for real.

          1. In IDLE, save your Stage 5 program as «expenses.py» in «python-days». Remove the «unittest.main()» line, and replace the main lines with:

          : logging.basicConfig(filename="expenses.log", level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")
          : tracker = Tracker()
          : print("Commands: add AMOUNT CATEGORY [note], total, total CATEGORY, undo, report, quit")
          : while True:
          :     line = input("> ")
          :     if line == "quit":
          :         break
          :     print(handle(tracker, line))

          2. Run it in the Command Prompt, and type a day of your own spending. Type «quit» to stop.
          3. Open «expenses.log» in Notepad. The number of lines in it is your receipt: write it in your notebook.
        `,
        hints: [
          md`Type the words in the grey box exactly, then press Enter.`,
          md`Each command is words with single spaces between them.`,
          md`If python does not work on your laptop, py does the same job.`,
        ],
      },
    ],
    keys: [
      md`An Enum keeps choices fixed; «Category(text)» checks typed words for you.`,
      md`A dataclass holds each record; a class holds the rules; «handle» turns typed lines into actions with «match».`,
      md`Refuse bad data in the class, and explain the refusal in the command layer.`,
      md`Print is for the user; logging is for the programmer; tests prove it all works.`,
    ],
  });
})();
