// Week 20 - Sharper Everyday Python (Days 131 to 135).
(function () {
  const { day, md, py, ex, code, tip, warn, ask, pause } = window.Course;

  // ---------------------------------------------------------------- Day 131
  day({
    slug: "neat-output",
    title: "Neat Output: Tables and Numbers",
    goal: "Print tidy tables with widths, alignment, decimals, commas and percentages.",
    minutes: 40,
    needs: [5, 66],
    win: "Today you can now print tidy tables: columns that line up, money with 2 decimals, commas, percentages and padding.",
    learn: [
      md`
        ## Widths and alignment

        On Day 5 you put values inside f-strings. After a colon, you can also say **how** to show them. «{name:<8}» gives the name 8 places, lined up on the left. «>» lines up on the right, and «^» in the centre. The «|» marks here only show where each value starts and ends. Guess the output.
      `,
      ex(py`
        for name, marks in [("Asha", 72), ("Ravindra", 8)]:
            print(f"|{name:<8}|{marks:>4}|{name:^10}|")
        print(f"{'Report':-^20}")
      `, { predict: ["|Asha    |  72|   Asha   |\n|Ravindra|   8| Ravindra |\n-------Report-------", "|Asha|72|Asha|\n|Ravindra|8|Ravindra|\n-------Report-------", "|    Asha|72  |   Asha   |\n|Ravindra|8   | Ravindra |\n-------Report-------"], answer: 0 }),
      md`
        - Spaces fill the rest of the width, so every row lines up.
        - Text lines up on the left by itself, and numbers on the right. Write «<» or «>» anyway, so the reader knows.
        - A character before the «<», «>» or «^» is used to fill: «-^20» centres the word in dashes.
        - A value longer than its width is never cut. It just pushes the line out.
      `,
      md`
        ## Numbers that look right

        - «:.2f» shows 2 decimal places, which is right for money.
        - «:,» puts in commas. «:,.2f» does both.
        - «:.1%» turns 0.756 into a percentage, with 1 decimal place.
        - «:03d» pads a whole number with zeros to 3 places, and «:+d» always shows the sign.

        Guess the output.
      `,
      ex(py`
        price = 1234567.891
        print(f"{price:.2f} {price:,.2f} {7:03d} {0.756:.1%} {5:+d}")
      `, { predict: ["1234567.89 1,234,567.89 007 75.6% +5", "1234567.891 1,234,567.891 7 0.756% 5", "1234567.89 12,34,567.89 007 75.6% +5"], answer: 0 }),
      md`
        «:,» uses the international style, 1,234,567. For Indian lakh and crore commas, use your own function from Day 75.
      `,
      warn(md`Do not forget the «f». «{x:.2}» means 2 **significant digits**, not 2 decimals, so 123.456 shows as «1.2e+02». Write «{x:.2f}».`),
      pause(md`Good place for a break. Next: a whole table.`),
      md`
        ## A neat table

        Pick a width for each column, and use the same widths in the heading, every row and the total. Guess the output.
      `,
      ex(py`
        rows = [("Chai", 2, 15.0), ("Samosa", 3, 18.5), ("Lassi", 1, 40.0)]
        print(f"{'Item':<8}{'Qty':>4}{'Amount':>9}")
        total = 0
        for item, qty, price in rows:
            amount = qty * price
            total += amount
            print(f"{item:<8}{qty:>4}{amount:>9.2f}")
        print("-" * 21)
        print(f"{'Total':<12}{total:>9.2f}")
      `, { predict: ["Item     Qty   Amount\nChai       2    30.00\nSamosa     3    55.50\nLassi      1    40.00\n---------------------\nTotal          125.50", "Item Qty Amount\nChai 2 30.00\nSamosa 3 55.50\nLassi 1 40.00\n---------------------\nTotal 125.50", "Item     Qty   Amount\nChai       2     30.0\nSamosa     3     55.5\nLassi      1     40.0\n---------------------\nTotal          125.5"], answer: 0 }),
      md`
        The widths add up: 8 + 4 + 9 is 21, the length of the dashed line. «Total» takes 12 places, the item and quantity columns together, so its amount lines up under the others.
      `,
      tip(md`Widths can come from a name too: «{item:<{w}}» uses the value of «w». This helps when the widest name decides the width.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          print(f"[{'ab':>5}][{3.14159:.3f}][{42:05d}]")
        `, options: ["[   ab][3.142][00042]", "[ab   ][3.141][42000]", "[   ab][3.14159][00042]"], answer: 0,
        explain: md`«>5» puts «ab» on the right of 5 places. «.3f» rounds to 3 decimals. «05d» pads with zeros on the left.`,
        why: [null, md`«>» lines up on the right, and «.3f» rounds 3.14159 up to 3.142.`, md`«.3f» shows only 3 decimal places.`],
        skill: "trace" },
      { q: md`What does this line do?`, code: py`
          print(f"{name:<10}{fee:>10,.2f}")
        `, options: ["Shows the name on the left of 10 places, and the fee on the right of 10, with commas and 2 decimals", "Shows the name and fee with 10 spaces between", "Rounds the fee to 10 places"], answer: 0, verify: false, mono: false,
        explain: md`Each part after a colon describes one value: width, alignment, commas and decimals.`,
        why: [null, md`The 10s are widths. How many spaces appear depends on the values.`, md`«.2f» is the decimals. 10 is the width.`],
        skill: "read" },
      { q: md`A bill should show «123.46», but shows «1.2e+02». What was written?`,
        options: ["«{total:.2}» without the «f»", "«{total:,}»", "«{total:>2}»"], answer: 0, verify: false, mono: false,
        explain: md`Without the «f», «.2» means 2 significant digits. Write «.2f» for 2 decimal places.`,
        why: [null, md`That would show «123.456» with commas, which it does not need.`, md`That is a width of 2. The number would be shown in full.`],
        skill: "debug" },
      { q: md`What does «:.1%» do to 0.4?`,
        options: ["It shows «40.0%»", "It shows «0.4%»", "It shows «4.0%»"], answer: 0, verify: false, mono: false,
        explain: md`«%» multiplies by 100 and adds the sign. «.1» keeps 1 decimal place.`,
        why: [null, md`It multiplies by 100 first.`, md`0.4 × 100 is 40, not 4.`],
        skill: "memory" },
      { q: md`You print a fee table, and the amounts do not line up. What fixes it?`,
        options: ["Give the amount column a width and right alignment, like «{fee:>10.2f}»", "Put a tab between the columns", "Add more spaces after each name"], answer: 0, verify: false, mono: false,
        explain: md`A fixed width and «>» put the last digit of every amount in the same place.`,
        why: [null, md`Tabs jump to fixed stops, so long names can still push the columns out.`, md`Names have different lengths, so a fixed number of spaces cannot line them up.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: one line of a bill",
        task: md`Answer each question without running the program.`,
        code: py`
          item = "Vada"
          qty = 3
          price = 12.5
          line = f"{item:<6}x{qty:>2} = {qty * price:.2f}"
          print(line)
          print(f"{'Done':*^10}")
        `,
        ask: [{ line: 4, name: "line" }, { output: true }],
        hints: [
          md`«<6» gives «Vada» 6 places, with 2 spaces after it.`,
          md`«>2» puts the 3 on the right of 2 places: a space, then 3.`,
          md`3 × 12.5 is 37.5, and «.2f» shows 2 decimals. The last line centres Done in stars.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: results in numbers",
        task: md`Answer each question without running the program.`,
        code: py`
          passed = 45
          total = 60
          rate = passed / total
          fee = 125000
          text = f"{rate:.1%} passed, fees Rs {fee:,}"
          print(text)
          print(f"Roll {9:04d}")
        `,
        ask: [{ line: 3, name: "rate" }, { output: true }],
        hints: [
          md`45 ÷ 60 is 0.75.`,
          md`«.1%» shows 0.75 as 75.0%. «:,» puts in commas the international way: 125,000.`,
          md`«04d» pads 9 with zeros to 4 places.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: a marks table",
        task: md`
          Put the lines in order to print a heading, then one row for each student. Names go on the left of 6 places, and marks on the right of 4:

          | Name  Mark
          | Asha    72
          | Om       9
        `,
        solution: py`
          marks = {"Asha": 72, "Om": 9}
          print(f"{'Name':<6}{'Mark':>4}")
          for name, mark in marks.items():
              print(f"{name:<6}{mark:>4}")
        `,
        distractors: ['    print(f"{name:>6}{mark:<4}")'],
        tests: [{ output: "Name  Mark\nAsha    72\nOm       9" }],
        hints: [
          md`If the names are pushed to the right, they need «<», and the marks «>».`,
          md`If the heading comes after a row, it must be printed before the loop.`,
          md`If you see a NameError for name, the row line must be inside the loop, indented.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the bill in strange numbers",
        task: md`
          The program adds up the prices typed and prints the total with 2 decimal places. For «99.5 24» it should print «Total: Rs 123.50», but it prints «Total: Rs 1.2e+02». Tap the line that causes it, then fix it.
        `,
        starter: py`
          prices = [float(p) for p in input("Prices: ").split()]
          total = sum(prices)
          print(f"Total: Rs {total:.2}")
        `,
        bugLines: [3],
        solution: py`
          prices = [float(p) for p in input("Prices: ").split()]
          total = sum(prices)
          print(f"Total: Rs {total:.2f}")
        `,
        tests: [
          { inputs: ["99.5 24"], output: "Total: Rs 123.50" },
          { inputs: ["5"], output: "Total: Rs 5.00" },
          { inputs: ["1000 2000.456"], output: "Total: Rs 3000.46" },
        ],
        wrong: [py`
          prices = [float(p) for p in input("Prices: ").split()]
          total = sum(prices)
          print(f"Total: Rs {round(total, 2)}")
        `],
        hints: [
          md`Without an «f», «.2» means 2 significant digits, which is why the e+02 appears.`,
          md`Add the «f» after the 2: «.2f» means 2 decimal places.`,
          md`If 5 shows as «5.0», «round» keeps only the decimals it needs. The format spec always shows 2.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: fees with commas",
        task: md`
          Change the fee line so the fee has commas and 2 decimal places, on the right of 12 places. The output becomes:

          | Asha      125,000.00
          | Ravi       98,500.00
        `,
        starter: py`
          fees = [("Asha", 125000), ("Ravi", 98500)]
          for name, fee in fees:
              print(f"{name:<8}{fee}")
        `,
        solution: py`
          fees = [("Asha", 125000), ("Ravi", 98500)]
          for name, fee in fees:
              print(f"{name:<8}{fee:>12,.2f}")
        `,
        tests: [{ output: "Asha      125,000.00\nRavi       98,500.00" }],
        wrong: [py`
          fees = [("Asha", 125000), ("Ravi", 98500)]
          for name, fee in fees:
              print(f"{name:<8}{fee:<12,.2f}")
        `],
        hints: [
          md`If the amounts do not line up at the right, use «>12», not «<12».`,
          md`If there are no commas, put «,» before the «.2f»: «>12,.2f».`,
          md`If you see «ValueError: Invalid format specifier», the order is: alignment, width, comma, then «.2f».`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: the canteen receipt",
        task: md`
          From a blank page. Ask for items on one line, each as «name:qty:price», split by «;». Print a receipt: a heading, one row per item, a dashed line of 21 dashes, and the total. Use these widths: item on the left of 8, quantity on the right of 4, amount on the right of 9 with 2 decimals. The total line is «Total» on the left of 12, then the total on the right of 9. For «Chai:2:15;Samosa:3:18.5» it shows:

          | Item     Qty   Amount
          | Chai       2    30.00
          | Samosa     3    55.50
          | ---------------------
          | Total           85.50
        `,
        starter: py``,
        solution: py`
          print(f"{'Item':<8}{'Qty':>4}{'Amount':>9}")
          total = 0
          for part in input("Items: ").split(";"):
              name, qty, price = part.split(":")
              amount = int(qty) * float(price)
              total += amount
              print(f"{name:<8}{int(qty):>4}{amount:>9.2f}")
          print("-" * 21)
          print(f"{'Total':<12}{total:>9.2f}")
        `,
        tests: [
          { inputs: ["Chai:2:15;Samosa:3:18.5"], output: "Item     Qty   Amount\nChai       2    30.00\nSamosa     3    55.50\n---------------------\nTotal           85.50" },
          { inputs: ["Dosa:10:120"], output: "Item     Qty   Amount\nDosa      10  1200.00\n---------------------\nTotal         1200.00" },
          { inputs: ["Tea:1:9.999"], output: "Item     Qty   Amount\nTea        1    10.00\n---------------------\nTotal           10.00" },
        ],
        wrong: [py`
          print(f"{'Item':<8}{'Qty':>4}{'Amount':>9}")
          total = 0
          for part in input("Items: ").split(";"):
              name, qty, price = part.split(":")
              amount = int(qty) * float(price)
              total += amount
              print(f"{name:<8}{qty:>4}{amount:>9}")
          print("-" * 21)
          print(f"{'Total':<12}{total:>9.2f}")
        `],
        hints: [
          md`If an amount shows as «30.0» or «9.999», give it 2 decimals: «{amount:>9.2f}».`,
          md`If the total does not line up under the amounts, «Total» needs 12 places: the item and quantity widths together.`,
          md`If the heading is not first, print it before the rows.`,
        ],
      },
    ],
    keys: [
      md`After a colon in an f-string: «<», «>» or «^» and a width line values up, like «{name:<8}».`,
      md`«.2f» gives 2 decimals; «,» adds commas; «.1%» shows a percentage; «03d» pads with zeros.`,
      md`Without the «f», «.2» means significant digits: always write «.2f» for money.`,
      md`For a table, use the same widths in the heading, every row and the total.`,
    ],
  });

  // ---------------------------------------------------------------- Day 132
  day({
    slug: "match-case",
    title: "match and case: Choosing by Shape",
    goal: "Choose what to do by the shape of the data with match and case.",
    minutes: 45,
    needs: [10, 25],
    win: "Today you can now choose what to do with match and case: by value, by the shape of a list, with names caught from it, and with extra if checks.",
    learn: [
      md`
        ## match on a value

        A long «if» and «elif» chain that compares one value again and again can be written with «match». Python tries each «case» from the top, and runs the first one that fits. «|» means "or". «case _:» fits anything, so it goes last, like «else». Guess the output.
      `,
      ex(py`
        def reply(word):
            match word:
                case "hello" | "hi":
                    return "Namaste!"
                case "bye":
                    return "See you"
                case _:
                    return "Sorry?"

        print(reply("hi"), reply("bye"), reply("what"))
      `, { predict: ["Namaste! See you Sorry?", "Namaste! See you None", "Sorry? See you Sorry?"], answer: 0 }),
      md`
        Only one case runs. There is no falling through to the next case, and no «break» is needed. «match» and «case» came in Python 3.10, so older books do not have them.
      `,
      md`
        ## Choosing by shape

        The real power is matching the **shape** of a list. «case ["add", amount]:» fits a list of exactly two items whose first is «"add"», and puts the second into the name «amount». «*names» catches all the rest as a list. Guess the output.
      `,
      ex(py`
        def run(line):
            match line.split():
                case ["add", amount]:
                    return f"Adding {amount}"
                case ["add", amount, category]:
                    return f"Adding {amount} to {category}"
                case ["show", *names]:
                    return f"Showing {len(names)}: {names}"
                case []:
                    return "Nothing typed"
                case _:
                    return "Unknown command"

        for line in ["add 50", "add 50 food", "show a b", "show", "", "pay 5"]:
            print(run(line))
      `, { predict: ["Adding 50\nAdding 50 to food\nShowing 2: ['a', 'b']\nShowing 0: []\nNothing typed\nUnknown command", "Adding 50\nAdding 50\nShowing 2: ['a', 'b']\nShowing 0: []\nNothing typed\nUnknown command", "Adding 50\nAdding 50 to food\nShowing 2: ['a', 'b']\nUnknown command\nNothing typed\nUnknown command"], answer: 0 }),
      md`
        - Text in quotes must match exactly. A bare name, like «amount», catches whatever is in that place.
        - The number of items must fit too: «add 50 food» has three, so it skips the two-item case.
        - «*names» can catch nothing at all, so plain «show» still fits.
      `,
      pause(md`Good place for a break. Next: extra checks, and dictionaries.`),
      md`
        ## Extra checks with if

        A case can carry an «if», called a **guard**. The case fits only when the shape fits **and** the «if» is true. Dictionaries can be matched too: the keys you name must be there, and other keys are ignored. Guess the output.
      `,
      ex(py`
        def check(line):
            match line.split():
                case ["add", amount] if amount.isdigit():
                    return int(amount) * 2
                case ["add", _]:
                    return "Not a number"
                case _:
                    return "?"

        print(check("add 21"), check("add ten"), check("sub 3"))
        match {"type": "error", "msg": "disk full", "code": 7}:
            case {"type": "error", "msg": msg}:
                print("Error:", msg)
            case {"type": "ok"}:
                print("Fine")
      `, { predict: ["42 Not a number ?\nError: disk full", "2121 Not a number ?\nError: disk full", "42 ? ?\nError: disk full"], answer: 0 }),
      md`
        «_» inside a list fits any one item without keeping it. The dictionary case ignored the extra «code» key.
      `,
      warn(md`A bare name in a case always catches. «case quit:» does not compare with a variable called quit: it fits everything, and Python stops with a SyntaxError if any case comes after it. Compare text with quotes: «case "quit":».`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          def size(parts):
              match parts:
                  case []:
                      return "empty"
                  case [x]:
                      return f"one: {x}"
                  case [x, *rest]:
                      return f"{x} and {len(rest)} more"

          print(size([]), size([7]), size([1, 2, 3]))
        `, options: ["empty one: 7 1 and 2 more", "empty one: 7 1 and 3 more", "empty empty 1 and 2 more"], answer: 0,
        explain: md`«[x]» fits only one item. «[x, *rest]» puts the first in x, and the other two in rest.`,
        why: [null, md`rest holds what is left after x: 2 items.`, md`«[]» fits only an empty list.`],
        skill: "trace" },
      { q: md`Which commands does this case fit?`, code: py`
          case ["move", ("up" | "down") as way, steps] if steps.isdigit():
        `, options: ["«move up 3» and «move down 10», but not «move left 3» or «move up far»", "Any command that starts with move", "Only «move up»"], answer: 0, verify: false, mono: false,
        explain: md`Three items: «move», then up or down, kept as «way», then a number. The guard checks the number.`,
        why: [null, md`The second word must be up or down, and there must be exactly three words.`, md`«move up» has only two words, but the case needs three.`],
        skill: "read" },
      { q: md`A program uses «case stop:» to catch the word stop, and stops with «SyntaxError: name capture 'stop' makes remaining patterns unreachable». What is the fix?`,
        options: ['Write «case "stop":», with quotes',"Move «case stop:» to the top", "Add «break» after it"], answer: 0, verify: false, mono: false,
        explain: md`A bare name catches anything. In quotes, it is the text to compare with.`,
        why: [null, md`At the top it would catch every value, so nothing else would ever run.`, md`«match» needs no break: only one case runs.`],
        skill: "debug" },
      { q: md`What does «case _:» do?`,
        options: ["It fits anything, so it goes last, like «else»", "It fits only an empty value", "It fits only None"], answer: 0, verify: false, mono: false,
        explain: md`«_» catches any value and does not keep it.`,
        why: [null, md`That is «case []:» for an empty list, or «case "":» for empty text.`, md`That is «case None:».`],
        skill: "memory" },
      { q: md`A program reads typed commands like «add 50 food», «show» and «undo 2». What is the clearest way to choose?`,
        options: ["«match line.split():» with a case for each command shape", "Many «if» tests on «line[0:3]»", "A dictionary of every possible line"], answer: 0, verify: false, mono: false,
        explain: md`Each case shows the command's shape and names its parts in one line.`,
        why: [null, md`Slicing by letters breaks on longer words, and does not pick out the parts.`, md`Amounts and names change, so the lines cannot all be listed.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: the traffic light",
        task: md`Answer each question without running the program.`,
        code: py`
          def action(colour):
              match colour:
                  case "red":
                      result = "Stop"
                  case "yellow" | "amber":
                      result = "Slow"
                  case "green":
                      result = "Go"
                  case _:
                      result = "Broken?"
              return result

          print(action("amber"), action("blue"), action("green"))
        `,
        ask: [{ line: 11, hit: 1, name: "result" }, { output: true }],
        hints: [
          md`«|» means or: amber fits the second case.`,
          md`Blue fits none of the named colours, so «case _» catches it.`,
          md`Each call runs exactly one case.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: the order taker",
        task: md`Answer each question without running the program.`,
        code: py`
          def take(line):
              match line.split():
                  case ["order", item]:
                      return f"1 {item}"
                  case ["order", qty, item] if qty.isdigit():
                      return f"{qty} {item}"
                  case ["order", *rest]:
                      return f"Unclear: {rest}"
                  case _:
                      return "Not an order"

          answers = [take("order dosa"), take("order 3 idli"), take("order two vada"), take("menu")]
          print(answers)
        `,
        ask: [{ line: 12, name: "answers" }],
        hints: [
          md`«order dosa» has two words, so the first case fits.`,
          md`«order two vada» has three words, but «two» is not digits, so the guard fails and the next case is tried.`,
          md`«*rest» keeps the words after «order» as a list.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: yes or no",
        task: md`
          Put the lines in order. «answer» turns a typed reply into True, False or None. The program prints:

          | True False None
        `,
        solution: py`
          def answer(text):
              match text.lower():
                  case "y" | "yes":
                      return True
                  case "n" | "no":
                      return False
                  case _:
                      return None
          print(answer("YES"), answer("n"), answer("maybe"))
        `,
        distractors: ["        case maybe:"],
        tests: [{ output: "True False None" }],
        hints: [
          md`If you see «name capture 'maybe' makes remaining patterns unreachable», a bare name catches everything. Use «case _:» last.`,
          md`If «YES» gives None, the text must be made small with «.lower()» before matching.`,
          md`If you see an IndentationError, each «return» sits one step in from its «case».`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the amount that is not a number",
        task: md`
          The program reads one command. «add 20» should print «Total: 120». A wrong amount, like «add twenty», should print «Amount must be a number», but the program stops with a ValueError. Tap the line that causes it, then fix it.
        `,
        starter: py`
          total = 100
          match input("Command: ").split():
              case ["add", amount] if amount.isdigit:
                  total += int(amount)
                  print("Total:", total)
              case ["add", _]:
                  print("Amount must be a number")
              case _:
                  print("Unknown command")
        `,
        bugLines: [3],
        solution: py`
          total = 100
          match input("Command: ").split():
              case ["add", amount] if amount.isdigit():
                  total += int(amount)
                  print("Total:", total)
              case ["add", _]:
                  print("Amount must be a number")
              case _:
                  print("Unknown command")
        `,
        tests: [
          { inputs: ["add 20"], output: "Total: 120" },
          { inputs: ["add twenty"], output: "Amount must be a number" },
          { inputs: ["take 5"], output: "Unknown command" },
          { inputs: ["add 5 6"], output: "Unknown command" },
        ],
        wrong: [py`
          total = 100
          match input("Command: ").split():
              case ["add", amount]:
                  total += int(amount)
                  print("Total:", total)
              case ["add", _]:
                  print("Amount must be a number")
              case _:
                  print("Unknown command")
        `],
        hints: [
          md`Without brackets, «amount.isdigit» is the method itself, which always counts as true. The guard never says no.`,
          md`Call it: «amount.isdigit()», so the guard checks the text.`,
          md`Keep the guard: without it, every «add» goes into the first case.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: more ways to say goodbye",
        task: md`
          Make «quit», «exit» and «bye» all print «Goodbye», and add a «help» case that prints «Commands: hi, help, quit». For the replies typed, the program prints:

          | Hello!
          | Commands: hi, help, quit
          | Goodbye
          | Goodbye
        `,
        starter: py`
          def respond(word):
              match word:
                  case "hi":
                      print("Hello!")
                  case "quit":
                      print("Goodbye")
                  case _:
                      print("Unknown")

          for word in ["hi", "help", "exit", "bye"]:
              respond(word)
        `,
        solution: py`
          def respond(word):
              match word:
                  case "hi":
                      print("Hello!")
                  case "help":
                      print("Commands: hi, help, quit")
                  case "quit" | "exit" | "bye":
                      print("Goodbye")
                  case _:
                      print("Unknown")

          for word in ["hi", "help", "exit", "bye"]:
              respond(word)
        `,
        tests: [
          { output: "Hello!\nCommands: hi, help, quit\nGoodbye\nGoodbye" },
          { py: py`
            assert printed("respond", "quit") == "Goodbye", "quit should still print Goodbye."
            assert printed("respond", "xyz") == "Unknown", "Anything else should still print Unknown."
          ` },
        ],
        wrong: [py`
          def respond(word):
              match word:
                  case "hi":
                      print("Hello!")
                  case "help":
                      print("Commands: hi, help, quit")
                  case "exit" | "bye":
                      print("Goodbye")
                  case _:
                      print("Unknown")

          for word in ["hi", "help", "exit", "bye"]:
              respond(word)
        `],
        hints: [
          md`If exit or bye prints Unknown, join the words in one case with «|».`,
          md`If quit stopped working, keep it in the goodbye case too.`,
          md`If help prints Unknown, its case must come before «case _:».`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: the score keeper",
        task: md`
          From a blank page. A score starts at 0. Read commands with «input()» until «quit», and use «match» on the split words:

          - «add N» adds N, and «sub N» takes N away, only when N is digits. Otherwise print «Not a number: N».
          - «show» prints «Score: S».
          - «reset» sets the score to 0, and prints «Score reset».
          - «quit» prints «Final: S» and stops.
          - Anything else prints «Unknown: » and the line typed.

          For «add 10», «sub 3», «add x», «jump», «show», «quit» it shows:

          | Not a number: x
          | Unknown: jump
          | Score: 7
          | Final: 7
        `,
        starter: py``,
        solution: py`
          score = 0
          while True:
              line = input("> ")
              match line.split():
                  case ["add", n] if n.isdigit():
                      score += int(n)
                  case ["sub", n] if n.isdigit():
                      score -= int(n)
                  case ["add" | "sub", n]:
                      print("Not a number:", n)
                  case ["show"]:
                      print("Score:", score)
                  case ["reset"]:
                      score = 0
                      print("Score reset")
                  case ["quit"]:
                      print("Final:", score)
                      break
                  case _:
                      print("Unknown:", line)
        `,
        tests: [
          { inputs: ["add 10", "sub 3", "add x", "jump", "show", "quit"], output: "Not a number: x\nUnknown: jump\nScore: 7\nFinal: 7" },
          { inputs: ["add 5", "reset", "sub 2", "quit"], output: "Score reset\nFinal: -2" },
          { inputs: ["sub ten", "add 1 2", "quit"], output: "Not a number: ten\nUnknown: add 1 2\nFinal: 0" },
          { uses: ["kw:match", "kw:case"], msg: "Choose the command with «match» and «case»." },
        ],
        wrong: [py`
          score = 0
          while True:
              line = input("> ")
              match line.split():
                  case ["add", n] if n.isdigit():
                      score += int(n)
                  case ["sub", n] if n.isdigit():
                      score -= int(n)
                  case ["add" | "sub", n]:
                      print("Not a number:", n)
                  case ["show"]:
                      print("Score:", score)
                  case ["reset"]:
                      score = 0
                  case ["quit"]:
                      print("Final:", score)
                      break
                  case _:
                      print("Unknown:", line)
        `],
        hints: [
          md`If «add 1 2» says Not a number, the number case has two parts after the word. Three words must fall through to Unknown.`,
          md`If you see «Score reset» missing, the reset case must print it after setting the score to 0.`,
          md`If the program never stops, the quit case needs «break».`,
        ],
      },
    ],
    keys: [
      md`«match value:» tries each «case» from the top and runs the first that fits. «case _:» fits anything, so it goes last.`,
      md`«|» means or. Text in quotes must match; a bare name catches whatever is in that place.`,
      md`«case ["add", amount]:» matches the shape of a list; «*rest» catches the rest.`,
      md`«case ... if test:» fits only when the test is true too. Dictionaries match by the keys you name.`,
    ],
  });

  // ---------------------------------------------------------------- Day 133
  day({
    slug: "comprehensions-2",
    title: "Comprehensions 2: Dictionaries and Sets",
    goal: "Build dictionaries and sets in one line, and know when a loop is clearer.",
    minutes: 40,
    needs: [27, 64],
    win: "Today you can now build dictionaries and sets in one line, choose a value with «x if test else y», and tell when a plain loop is clearer.",
    learn: [
      md`
        ## Dictionary comprehensions

        On Day 27 you built lists in one line. Dictionaries work the same way: write «key: value» before the «for», inside curly brackets. An «if» at the end keeps only some items. Guess the output.
      `,
      ex(py`
        marks = {"Asha": 72, "Ravi": 35, "Meena": 81, "Om": 39}
        passed = {name: m for name, m in marks.items() if m >= 40}
        grace = {name: m + 5 for name, m in marks.items()}
        print(passed)
        print(grace["Om"], len(grace))
      `, { predict: ["{'Asha': 72, 'Meena': 81}\n44 4", "{'Asha': 72, 'Meena': 81}\n39 4", "['Asha', 'Meena']\n44 4"], answer: 0 }),
      md`
        «grace» kept every student and changed each value. «passed» kept every value, but only some students.
      `,
      md`
        ## Set comprehensions

        Curly brackets with just a value, and no colon, build a **set** (Day 64): repeats are dropped. Careful: «{}» on its own is an empty **dictionary**. An empty set is «set()». Sets have no fixed order, so we sort them before printing. Guess the output.
      `,
      ex(py`
        words = "Tea tea TEA chai Chai".split()
        kinds = {w.lower() for w in words}
        lengths = {len(w) for w in words}
        print(sorted(kinds), sorted(lengths))
        print(type({}).__name__, type(set()).__name__)
      `, { predict: ["['chai', 'tea'] [3, 4]\ndict set", "['Tea', 'chai', 'tea', 'TEA', 'Chai'] [3, 4]\ndict set", "['chai', 'tea'] [3, 4]\nset set"], answer: 0 }),
      pause(md`Good place for a break. Next: choosing a value inside a comprehension.`),
      md`
        ## Choosing a value: x if test else y

        «"Pass" if m >= 40 else "Fail"» is one value: the first if the test is true, the second if not. It goes **before** the «for», and changes each item. An «if» **after** the «for» is different: it drops items. Guess the output.
      `,
      ex(py`
        scores = [72, 35, 81, 39]
        print(["Pass" if m >= 40 else "Fail" for m in scores])
        print([m for m in scores if m >= 40])
      `, { predict: ["['Pass', 'Fail', 'Pass', 'Fail']\n[72, 81]", "['Pass', 'Pass']\n[72, 81]", "['Pass', 'Fail', 'Pass', 'Fail']\n[True, False, True, False]"], answer: 0 }),
      md`
        ## Two fors, and when to stop

        Two «for» parts read left to right, like loops inside loops (Day 20): «[x for row in grid for x in row]» flattens a grid. Guess the output.
      `,
      ex(py`
        grid = [[1, 2], [3, 4], [5, 6]]
        print([x for row in grid for x in row])
        print([[x * 10 for x in row] for row in grid])
      `, { predict: ["[1, 2, 3, 4, 5, 6]\n[[10, 20], [30, 40], [50, 60]]", "[[1, 2], [3, 4], [5, 6]]\n[10, 20, 30, 40, 50, 60]", "[1, 3, 5, 2, 4, 6]\n[[10, 20], [30, 40], [50, 60]]"], answer: 0 }),
      tip(md`A comprehension should read like one sentence. If it needs two «if»s, a «try», or a print inside, write a plain «for» loop. Clear code beats short code.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          prices = {"chai": 15, "vada": 20, "dosa": 50}
          cheap = {item: p * 2 for item, p in prices.items() if p < 30}
          print(cheap)
        `, options: ["{'chai': 30, 'vada': 40}", "{'chai': 15, 'vada': 20}", "{'chai': 30, 'vada': 40, 'dosa': 100}"], answer: 0,
        explain: md`The «if» keeps chai and vada, and «p * 2» doubles their prices.`,
        why: [null, md`The value part, «p * 2», doubles each price.`, md`The «if» at the end drops dosa, because 50 is not below 30.`],
        skill: "trace" },
      { q: md`What does this line build?`, code: py`
          index = {name[0]: name for name in ["Asha", "Ravi", "Anil"]}
        `, options: ["«{'A': 'Anil', 'R': 'Ravi'}»: a later name replaces an earlier one with the same key", "«{'A': 'Asha', 'R': 'Ravi', 'A': 'Anil'}»", "«{'A': ['Asha', 'Anil'], 'R': ['Ravi']}»"], answer: 0, verify: false, mono: false,
        explain: md`Keys are unique. Anil's «A» comes later, so it replaces Asha.`,
        why: [null, md`A dictionary cannot hold the same key twice.`, md`Grouping into lists needs a loop with setdefault or defaultdict (Day 106).`],
        skill: "read" },
      { q: md`«seen = {}», then «seen.add("tea")» stops with «AttributeError: 'dict' object has no attribute 'add'». What is the fix?`,
        options: ["Start with «seen = set()»: «{}» is an empty dictionary", 'Use «seen.append("tea")»', "Write «seen = {,}»"], answer: 0, verify: false, mono: false,
        explain: md`Curly brackets with nothing inside make a dictionary. An empty set must be made with «set()».`,
        why: [null, md`Sets have «add», not «append».`, md`That is a SyntaxError.`],
        skill: "debug" },
      { q: md`Where does «x if test else y» go in a comprehension?`,
        options: ["Before the «for», because it chooses each item's value", "After the «for», because it drops items", "Only in dictionary comprehensions"], answer: 0, verify: false, mono: false,
        explain: md`Before the «for» it changes values; an «if» on its own after the «for» drops items.`,
        why: [null, md`That is the plain «if» filter, which has no «else».`, md`It works in every kind of comprehension.`],
        skill: "memory" },
      { q: md`You need each student's grade, and to print a warning for any mark that is not a number. Which is best?`,
        options: ["A plain «for» loop with «try» and «print» inside", "One long comprehension", "A set comprehension"], answer: 0, verify: false, mono: false,
        explain: md`Comprehensions are for building one thing in one clear sentence. Errors and prints belong in a loop.`,
        why: [null, md`A comprehension cannot hold a «try», and prints inside it are hard to read.`, md`A set would drop repeated grades and lose the order.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: stock check",
        task: md`Answer each question without running the program.`,
        code: py`
          stock = {"rice": 0, "dal": 12, "salt": 3, "oil": 0}
          to_buy = sorted({item for item, qty in stock.items() if qty == 0})
          labels = {item: "low" if qty < 5 else "ok" for item, qty in stock.items()}
          print(to_buy, labels["salt"], labels["dal"])
        `,
        ask: [{ line: 2, name: "to_buy" }, { output: true }],
        hints: [
          md`The set keeps only the items with 0 left, and «sorted» makes it a list in A to Z order.`,
          md`Salt has 3, which is below 5.`,
          md`Dal has 12, so the «else» value is chosen.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: a seating grid",
        task: md`Answer each question without running the program.`,
        code: py`
          rows = [["A1", "A2"], ["B1", "B2", "B3"]]
          seats = [s for row in rows for s in row]
          sizes = {r[0][0]: len(r) for r in rows}
          print(len(seats), seats[2], sizes)
        `,
        ask: [{ line: 2, name: "seats" }, { output: true }],
        hints: [
          md`Two «for»s flatten the grid: all of row A, then all of row B.`,
          md`«r[0][0]» is the first letter of the first seat in each row.`,
          md`Row A has 2 seats and row B has 3.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: word lengths",
        task: md`
          Put the lines in order. The program builds a dictionary of each different word, in small letters, and its length, for words longer than 2 letters. It prints:

          | {'the': 3, 'tea': 3, 'very': 4, 'hot': 3}
        `,
        solution: py`
          text = "The tea is very hot THE"
          words = text.lower().split()
          lengths = {w: len(w) for w in words if len(w) > 2}
          print(lengths)
        `,
        distractors: ["lengths = {w, len(w) for w in words if len(w) > 2}"],
        tests: [{ output: "{'the': 3, 'tea': 3, 'very': 4, 'hot': 3}" }],
        hints: [
          md`If you see a SyntaxError on the comprehension, a dictionary needs «key: value», with a colon.`,
          md`If «The» and «THE» both appear, the text must be made small before splitting.`,
          md`If you see a NameError for words, the split line must come before the comprehension.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the pass list that lost students",
        task: md`
          The program should show every student with «Pass» or «Fail». For «Asha:72 Ravi:35 Om:40» it should print «{'Asha': 'Pass', 'Ravi': 'Fail', 'Om': 'Pass'}», but Ravi is missing. Tap the line that causes it, then fix it.
        `,
        starter: py`
          marks = {}
          for part in input("Marks: ").split():
              name, m = part.split(":")
              marks[name] = int(m)
          result = {name: "Pass" for name, m in marks.items() if m >= 40}
          print(result)
        `,
        bugLines: [5],
        solution: py`
          marks = {}
          for part in input("Marks: ").split():
              name, m = part.split(":")
              marks[name] = int(m)
          result = {name: "Pass" if m >= 40 else "Fail" for name, m in marks.items()}
          print(result)
        `,
        tests: [
          { inputs: ["Asha:72 Ravi:35 Om:40"], output: "{'Asha': 'Pass', 'Ravi': 'Fail', 'Om': 'Pass'}" },
          { inputs: ["Zoya:0"], output: "{'Zoya': 'Fail'}" },
        ],
        wrong: [py`
          marks = {}
          for part in input("Marks: ").split():
              name, m = part.split(":")
              marks[name] = int(m)
          result = {name: "Pass" if m > 40 else "Fail" for name, m in marks.items()}
          print(result)
        `],
        hints: [
          md`An «if» after the «for» drops the items that fail the test, so Ravi is left out.`,
          md`To keep every student and choose the word, put «"Pass" if m >= 40 else "Fail"» before the «for».`,
          md`If Om shows Fail, 40 is a pass: use «>=».`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: the subjects taken",
        task: md`
          The loop builds a set of every subject taken. Replace the loop with one set comprehension, so the program still prints:

          | ['GK', 'Maths', 'Polity']
        `,
        starter: py`
          entries = [("Asha", "Maths"), ("Ravi", "GK"), ("Om", "Maths"), ("Asha", "Polity")]
          subjects = set()
          for name, subject in entries:
              subjects.add(subject)
          print(sorted(subjects))
        `,
        solution: py`
          entries = [("Asha", "Maths"), ("Ravi", "GK"), ("Om", "Maths"), ("Asha", "Polity")]
          subjects = {subject for name, subject in entries}
          print(sorted(subjects))
        `,
        tests: [{ output: "['GK', 'Maths', 'Polity']" }, { avoids: ["method:add", "for"], msg: "Build the set in one set comprehension, without a loop or «.add»." }],
        wrong: [py`
          entries = [("Asha", "Maths"), ("Ravi", "GK"), ("Om", "Maths"), ("Asha", "Polity")]
          subjects = [subject for name, subject in entries]
          print(sorted(subjects))
        `],
        hints: [
          md`If Maths appears twice, square brackets made a list. Use curly brackets for a set.`,
          md`If you see «unhashable type», the value part should be just «subject», not the whole pair.`,
          md`A set comprehension has no colon: «{subject for ...}».`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: the class summary",
        task: md`
          From a blank page. Ask for results on one line, each as «name:marks». Using comprehensions, build:

          - «marks», a dictionary of each name and its marks as a whole number;
          - «grades», a dictionary of each name and «A» for 75 or more, «B» for 40 or more, and «C» otherwise;
          - «toppers», a sorted list of the names with 75 or more.

          Then print the three. For «Asha:72 Ravi:91 Om:30» it shows:

          | {'Asha': 72, 'Ravi': 91, 'Om': 30}
          | {'Asha': 'B', 'Ravi': 'A', 'Om': 'C'}
          | ['Ravi']
        `,
        starter: py``,
        solution: py`
          pairs = [part.split(":") for part in input("Results: ").split()]
          marks = {name: int(m) for name, m in pairs}
          grades = {name: "A" if m >= 75 else "B" if m >= 40 else "C" for name, m in marks.items()}
          toppers = sorted(name for name, m in marks.items() if m >= 75)
          print(marks)
          print(grades)
          print(toppers)
        `,
        tests: [
          { inputs: ["Asha:72 Ravi:91 Om:30"], output: "{'Asha': 72, 'Ravi': 91, 'Om': 30}\n{'Asha': 'B', 'Ravi': 'A', 'Om': 'C'}\n['Ravi']" },
          { inputs: ["Zoya:75 Amit:40 Dev:39 Bina:100"], output: "{'Zoya': 75, 'Amit': 40, 'Dev': 39, 'Bina': 100}\n{'Zoya': 'A', 'Amit': 'B', 'Dev': 'C', 'Bina': 'A'}\n['Bina', 'Zoya']" },
          { inputs: ["X:5"], output: "{'X': 5}\n{'X': 'C'}\n[]" },
        ],
        wrong: [py`
          pairs = [part.split(":") for part in input("Results: ").split()]
          marks = {name: m for name, m in pairs}
          grades = {name: "A" if int(m) >= 75 else "B" if int(m) >= 40 else "C" for name, m in marks.items()}
          toppers = sorted(name for name, m in marks.items() if int(m) >= 75)
          print(marks)
          print(grades)
          print(toppers)
        `],
        hints: [
          md`If the marks show in quotes, like «'72'», turn them into whole numbers with «int» as you build «marks».`,
          md`If 75 gets a B, the A test must be «>= 75».`,
          md`If the toppers are not A to Z, wrap them in «sorted(...)».`,
        ],
      },
    ],
    keys: [
      md`«{k: v for ...}» builds a dictionary; «{v for ...}» builds a set. «{}» alone is an empty dictionary; use «set()».`,
      md`«a if test else b» before the «for» chooses each value; «if test» after the «for» drops items.`,
      md`Two «for»s read left to right, like loops inside loops.`,
      md`If a comprehension stops reading like one sentence, write a loop.`,
    ],
  });

  // ---------------------------------------------------------------- Day 134
  day({
    slug: "names-and-copies",
    title: "Names, Closures and Copies",
    goal: "Know where names live, make functions that remember, and copy safely.",
    minutes: 45,
    needs: [52, 53],
    win: "Today you can now change outside names on purpose, make functions that remember, dodge the default-list trap, and copy nested data safely.",
    learn: [
      md`
        ## Changing a name outside the function

        On Day 52 you saw that names made inside a function stay inside it. So what if a function adds 1 to a name from outside? Guess what happens.
      `,
      ex(py`
        count = 0

        def visit():
            count += 1

        visit()
        print(count)
      `, { predict: ["UnboundLocalError", "1", "0"], answer: 0, error: true }),
      md`
        Because the function **assigns** to «count», Python treats «count» as a name inside the function, and it has no value there yet. Writing «global count» at the top of the function says "use the outside one". It works, but it makes programs hard to follow. Usually it is better to pass the value in and «return» the new one.
      `,
      md`
        ## Functions that remember: closures

        A function made inside another function keeps the names around it, even after the outer function has finished. This is called a **closure**. To change such a name, write «nonlocal». Each call of the outer function makes a fresh memory. Guess the output.
      `,
      ex(py`
        def make_counter():
            count = 0
            def step():
                nonlocal count
                count += 1
                return count
            return step

        a = make_counter()
        b = make_counter()
        print(a(), a(), b(), a())

        def times(n):
            def multiply(x):
                return x * n
            return multiply

        double, triple = times(2), times(3)
        print(double(5), triple(5))
      `, { predict: ["1 2 1 3\n10 15", "1 2 3 4\n10 15", "1 1 1 1\n10 15"], answer: 0 }),
      md`
        «a» and «b» each have their own «count». «multiply» only reads «n», so it needs no «nonlocal». Decorators (Day 118) are closures too: the wrapper remembers the function it wraps.
      `,
      pause(md`Good place for a break. Next: two traps with lists.`),
      md`
        ## The default list trap

        A default value is made **once**, when the «def» runs, not on every call. A list as a default is then shared by every call. Guess the output.
      `,
      ex(py`
        def add_item(item, basket=[]):
            basket.append(item)
            return basket

        print(add_item("tea"))
        print(add_item("vada"))

        def add_item_safe(item, basket=None):
            if basket is None:
                basket = []
            basket.append(item)
            return basket

        print(add_item_safe("tea"), add_item_safe("vada"))
      `, { predict: ["['tea']\n['tea', 'vada']\n['tea'] ['vada']", "['tea']\n['vada']\n['tea'] ['vada']", "['tea']\n['tea', 'vada']\n['tea'] ['tea', 'vada']"], answer: 0 }),
      md`
        The fix is the habit: use «None» as the default, and make a new list inside the function.
      `,
      md`
        ## Shallow and deep copies

        «.copy()» makes a new outer list, but the lists **inside** are still shared (Day 53). «copy.deepcopy» copies every level. Guess the output.
      `,
      ex(py`
        import copy

        week = [["Maths", "GK"], ["Polity"]]
        shallow = week.copy()
        deep = copy.deepcopy(week)
        week[0].append("English")
        week.append(["History"])
        print(len(shallow), shallow[0])
        print(len(deep), deep[0])
      `, { predict: ["2 ['Maths', 'GK', 'English']\n2 ['Maths', 'GK']", "3 ['Maths', 'GK', 'English']\n2 ['Maths', 'GK']", "2 ['Maths', 'GK']\n2 ['Maths', 'GK']"], answer: 0 }),
      md`
        The new day was added only to «week», so both copies still have 2. But the shallow copy shares the inner Monday list, so it sees «English» too.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          def make_adder(start):
              total = start
              def add(x):
                  nonlocal total
                  total += x
                  return total
              return add

          f = make_adder(10)
          f(5)
          print(f(1), make_adder(0)(1))
        `, options: ["16 1", "11 1", "16 17"], answer: 0,
        explain: md`f remembers its total: 10, then 15, then 16. A new call of make_adder gets its own total, starting at 0.`,
        why: [null, md`The first «f(5)» was not printed, but it still added 5.`, md`Each call of make_adder makes a separate total.`],
        skill: "trace" },
      { q: md`What does «nonlocal total» do?`, code: py`
          def outer():
              total = 0
              def inner():
                  nonlocal total
                  total += 1
        `, options: ["Lets «inner» change the «total» of the function around it", "Makes «total» a global name", "Makes a new «total» inside «inner»"], answer: 0, verify: false, mono: false,
        explain: md`Without it, «total += 1» would make «total» a name of «inner», with no value yet.`,
        why: [null, md`«global» is for names outside every function. «nonlocal» is for the function around.`, md`It does the opposite: it uses the outer one.`],
        skill: "read" },
      { q: md`A function «def register(name, names=[])» is called for two classes, and the second class's list has the first class's names. What is the fix?`,
        options: ["Use «names=None», and make a new list inside when it is None", "Call «names.clear()» at the end", "Use a tuple as the default"], answer: 0, verify: false, mono: false,
        explain: md`The default list is made once and shared. «None» and a new list each call keeps them apart.`,
        why: [null, md`Clearing would also empty the list the first caller still holds.`, md`A tuple cannot be appended to.`],
        skill: "debug" },
      { q: md`What does «copy.deepcopy(data)» do that «data.copy()» does not?`,
        options: ["It also copies the lists and dictionaries inside, so nothing is shared", "It is faster", "It sorts the copy"], answer: 0, verify: false, mono: false,
        explain: md`«.copy()» copies only the outer level. Inner lists are still shared.`,
        why: [null, md`It is slower, because it copies more.`, md`Copies never change the order.`],
        skill: "memory" },
      { q: md`A program needs a running total that several functions update. What is the clearest way?`,
        options: ["Keep it in an object, or pass it in and return the new total", "Write «global total» in every function", "Use a default list as storage"], answer: 0, verify: false, mono: false,
        explain: md`Values that go in and come out, or live in an object, are easy to follow and test.`,
        why: [null, md`It works, but any function can change it, which makes bugs hard to find.`, md`That is the trap from today's lesson.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: two ticket counters",
        task: md`Answer each question without running the program.`,
        code: py`
          def counter(prefix):
              n = 0
              def next_ticket():
                  nonlocal n
                  n += 1
                  return f"{prefix}{n}"
              return next_ticket

          gen = counter("G")
          vip = counter("V")
          first = gen()
          gen()
          print(first, vip(), gen())
        `,
        ask: [{ line: 11, name: "first" }, { output: true }],
        hints: [
          md`Each counter has its own n, starting at 0.`,
          md`gen is called twice before the print, then once more inside it.`,
          md`vip is called only once.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: the copied timetable",
        task: md`Answer each question without running the program.`,
        code: py`
          import copy

          plan = {"Mon": ["Maths"], "Tue": ["GK"]}
          mine = plan.copy()
          safe = copy.deepcopy(plan)
          mine["Mon"].append("Polity")
          mine["Wed"] = ["English"]
          print(plan["Mon"], len(plan), safe["Mon"])
        `,
        ask: [{ line: 8, name: "plan" }, { output: true }],
        hints: [
          md`«mine» is a new dictionary, but its lists are the same lists as in «plan».`,
          md`Adding a new key to «mine» does not add it to «plan».`,
          md`«safe» has its own copies of every list.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: a greeting maker",
        task: md`
          Put the lines in order. «greeter» makes a function that remembers its greeting. The program prints:

          | Namaste, Asha
          | Hello, Ravi
        `,
        solution: py`
          def greeter(word):
              def greet(name):
                  return f"{word}, {name}"
              return greet
          hindi = greeter("Namaste")
          english = greeter("Hello")
          print(hindi("Asha"))
          print(english("Ravi"))
        `,
        distractors: ["    return greet()"],
        tests: [{ output: "Namaste, Asha\nHello, Ravi" }],
        hints: [
          md`If you see «missing 1 required positional argument: 'name'», the function is called too early. Give back «greet» itself, without brackets.`,
          md`If you see a NameError for word, «greet» must be inside «greeter», indented.`,
          md`If you see «'str' object is not callable», «greeter» gave back text, not a function.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the marks that leak",
        task: md`
          «add_mark» adds a mark to a student's list, or to a new list when none is given. Asha should get «[72]» and Ravi «[65]», but Ravi gets Asha's mark too. Tap the line that causes it, then fix it.
        `,
        starter: py`
          def add_mark(mark, marks=[]):
              marks.append(mark)
              return marks

          asha = add_mark(72)
          ravi = add_mark(65)
          print(asha, ravi)
        `,
        bugLines: [1],
        solution: py`
          def add_mark(mark, marks=None):
              if marks is None:
                  marks = []
              marks.append(mark)
              return marks

          asha = add_mark(72)
          ravi = add_mark(65)
          print(asha, ravi)
        `,
        tests: [
          { output: "[72] [65]" },
          { py: py`
            box = [1]
            assert call("add_mark", 2, box) == [1, 2] and box == [1, 2], "Given a list, add_mark should add to that list."
            assert call("add_mark", 9) == [9], "Without a list, add_mark should start a new one each time."
          ` },
        ],
        wrong: [py`
          def add_mark(mark, marks=[]):
              marks = marks.copy()
              marks.append(mark)
              return marks

          asha = add_mark(72)
          ravi = add_mark(65)
          print(asha, ravi)
        `],
        hints: [
          md`The default list is made once, when the «def» runs, so every call shares it.`,
          md`Use «marks=None» as the default, and make a new list inside when it is None.`,
          md`If a list given by the caller is no longer changed, do not copy it: only make a new list when none was given.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: a safe copy of the template",
        task: md`
          Each student gets a copy of the study template and adds their own topic. Ravi's topic should not appear in Asha's plan. Change the copy line so the program prints:

          | {'Mon': ['Maths'], 'Tue': ['GK']}
          | {'Mon': ['Maths', 'Polity'], 'Tue': ['GK']}
        `,
        starter: py`
          template = {"Mon": ["Maths"], "Tue": ["GK"]}

          def plan_for(extra):
              plan = template.copy()
              if extra:
                  plan["Mon"].append(extra)
              return plan

          ravi = plan_for("Polity")
          asha = plan_for("")
          print(asha)
          print(ravi)
        `,
        solution: py`
          import copy

          template = {"Mon": ["Maths"], "Tue": ["GK"]}

          def plan_for(extra):
              plan = copy.deepcopy(template)
              if extra:
                  plan["Mon"].append(extra)
              return plan

          ravi = plan_for("Polity")
          asha = plan_for("")
          print(asha)
          print(ravi)
        `,
        tests: [{ output: "{'Mon': ['Maths'], 'Tue': ['GK']}\n{'Mon': ['Maths', 'Polity'], 'Tue': ['GK']}" }],
        wrong: [py`
          template = {"Mon": ["Maths"], "Tue": ["GK"]}

          def plan_for(extra):
              plan = dict(template)
              if extra:
                  plan["Mon"].append(extra)
              return plan

          ravi = plan_for("Polity")
          asha = plan_for("")
          print(asha)
          print(ravi)
        `],
        hints: [
          md`If Asha still has Polity, the inner lists are shared. «dict(...)» and «.copy()» copy only the outer level.`,
          md`Use «copy.deepcopy(template)», and add «import copy» at the top.`,
          md`If you see a NameError for copy, the import is missing.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a wallet with memory",
        task: md`
          From a blank page. Write «make_wallet(balance)», which gives back two functions, «add» and «spend», that share the balance:

          - «add(amount)» adds the amount and gives back the new balance.
          - «spend(amount)» raises «ValueError("Not enough money")» if the amount is more than the balance. Otherwise it takes it away and gives back the new balance.

          Do not use «global». Then run:

          : add, spend = make_wallet(100)
          : add(50)
          : print(spend(30))
          : try:
          :     spend(500)
          : except ValueError as e:
          :     print(e)

          It prints:

          | 120
          | Not enough money
        `,
        starter: py``,
        solution: py`
          def make_wallet(balance):
              def add(amount):
                  nonlocal balance
                  balance += amount
                  return balance

              def spend(amount):
                  nonlocal balance
                  if amount > balance:
                      raise ValueError("Not enough money")
                  balance -= amount
                  return balance

              return add, spend

          add, spend = make_wallet(100)
          add(50)
          print(spend(30))
          try:
              spend(500)
          except ValueError as e:
              print(e)
        `,
        tests: [
          { output: "120\nNot enough money" },
          { py: py`
            a1, s1 = call("make_wallet", 10)
            a2, s2 = call("make_wallet", 0)
            assert a1(5) == 15, "A wallet of 10 after adding 5 should hold 15."
            assert a2(1) == 1, "Two wallets must not share a balance."
            assert s1(15) == 0, "Spending all 15 should leave 0."
            refused = False
            try:
                s2(2)
            except ValueError:
                refused = True
            assert refused, "Spending 2 from a wallet of 1 should raise ValueError."
            assert a2(0) == 1, "A refused spend must not change the balance."
          ` },
          { avoids: ["kw:global"], msg: "Keep the balance in the closure with «nonlocal», not with «global»." },
        ],
        wrong: [py`
          def make_wallet(balance):
              def add(amount):
                  nonlocal balance
                  balance += amount
                  return balance

              def spend(amount):
                  nonlocal balance
                  balance -= amount
                  if balance < 0:
                      raise ValueError("Not enough money")
                  return balance

              return add, spend

          add, spend = make_wallet(100)
          add(50)
          print(spend(30))
          try:
              spend(500)
          except ValueError as e:
              print(e)
        `],
        hints: [
          md`If a refused spend still changes the balance, check the amount before you take it away.`,
          md`If you see UnboundLocalError, each inner function that changes the balance needs «nonlocal balance».`,
          md`If you see «cannot unpack», «make_wallet» must give back both functions: «return add, spend».`,
        ],
      },
    ],
    keys: [
      md`Assigning to a name inside a function makes it that function's name; «global» or «nonlocal» says otherwise.`,
      md`A closure is an inner function that remembers the names around it; each outer call makes a fresh memory.`,
      md`Never use a list or dictionary as a default value: use «None» and make it inside.`,
      md`«.copy()» copies one level; «copy.deepcopy» copies everything inside too.`,
    ],
  });

  // ---------------------------------------------------------------- Day 135
  day({
    slug: "iterators-and-with",
    title: "Iterators and Your Own with",
    goal: "See how for really works, and write tools that tidy up after themselves.",
    minutes: 45,
    needs: [110, 118],
    win: "Today you can now explain how «for» really works, make your own objects that «for» can loop over, and write your own «with» tools that always tidy up.",
    learn: [
      md`
        ## How for really works

        A «for» loop asks the list for an **iterator**: a thing that hands out one item each time you call «next()». When nothing is left, «next()» raises **StopIteration**, and the loop ends quietly. You can do the same by hand. Guess what happens.
      `,
      ex(py`
        it = iter(["chai", "vada"])
        print(next(it), next(it))
        print(next(it))
      `, { predict: ["StopIteration", "chai vada\nNone", "chai vada\nchai"], answer: 0, error: true }),
      md`
        The first line prints «chai vada», then the third «next» has nothing left. A «for» loop catches StopIteration for you. That is how it knows when to stop.
      `,
      md`
        ## Your own iterator

        A class becomes something «for» can loop over with two methods. «__iter__» gives back the iterator, here the object itself. «__next__» gives back the next value, or raises StopIteration. Guess the output.
      `,
      ex(py`
        class Countdown:
            def __init__(self, start):
                self.n = start

            def __iter__(self):
                return self

            def __next__(self):
                if self.n == 0:
                    raise StopIteration
                self.n -= 1
                return self.n + 1

        c = Countdown(3)
        print(list(c), list(c))
        for x in Countdown(2):
            print("Go", x)
      `, { predict: ["[3, 2, 1] []\nGo 2\nGo 1", "[3, 2, 1] [3, 2, 1]\nGo 2\nGo 1", "[2, 1, 0] []\nGo 1\nGo 0"], answer: 0 }),
      md`
        The second «list(c)» is empty: this iterator is used up, like a generator (Day 110). A generator function is the short way to write most iterators. Classes help when the object holds more, like a list of pages.
      `,
      pause(md`Good place for a break. Next: your own «with».`),
      md`
        ## Your own with

        «with open(...)» closes the file even if an error happens (Day 72). You can write tools like that. With «@contextmanager», write a generator: the code before «yield» runs at the start of the «with», and the code after, at the end. Put it in «finally», so it runs even after an error. The value yielded goes into the name after «as». Guess the output.
      `,
      ex(py`
        from contextlib import contextmanager

        @contextmanager
        def section(title):
            print(f"== {title} ==")
            try:
                yield len(title)
            finally:
                print("== end ==")

        with section("Marks") as width:
            print("Asha 72", width)

        try:
            with section("Oops"):
                print("before")
                int("x")
                print("after")
        except ValueError:
            print("caught")
      `, { predict: ["== Marks ==\nAsha 72 5\n== end ==\n== Oops ==\nbefore\n== end ==\ncaught", "== Marks ==\nAsha 72 5\n== end ==\n== Oops ==\nbefore\ncaught", "== Marks ==\nAsha 72 5\n== end ==\n== Oops ==\nbefore\nafter\n== end ==\ncaught"], answer: 0 }),
      md`
        «after» never ran: the error left the block at once. But «== end ==» still printed, because of «finally». Then the error went on to the «except» outside.
      `,
      md`
        ## The class way: __enter__ and __exit__

        A class can do the same job. «__enter__» runs at the start, and its answer goes after «as». «__exit__» runs at the end, and is told about any error: «kind» is None when there was none. Giving back False lets an error carry on. Run it.
      `,
      ex(py`
        class Stage:
            def __init__(self, name):
                self.name = name

            def __enter__(self):
                print("start", self.name)
                return self

            def __exit__(self, kind, error, tb):
                print("stop", self.name, kind is None)
                return False

        with Stage("build") as s:
            print("working on", s.name)
      `),
      tip(md`Use your own «with» for anything that must be undone: closing a database, putting a setting back, or printing an end line. Then you cannot forget the tidy-up.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          it = iter([10, 20, 30])
          next(it)
          rest = [x * 2 for x in it]
          print(rest, list(it))
        `, options: ["[40, 60] []", "[20, 40, 60] []", "[40, 60] [10, 20, 30]"], answer: 0,
        explain: md`The first «next» took 10. The comprehension used up the rest, so the last list is empty.`,
        why: [null, md`10 was already handed out by «next».`, md`An iterator does not start again. It is used up.`],
        skill: "trace" },
      { q: md`What does this class let you do?`, code: py`
          class Pages:
              def __init__(self, items, size):
                  self.items, self.size, self.at = items, size, 0
              def __iter__(self):
                  return self
              def __next__(self):
                  if self.at >= len(self.items):
                      raise StopIteration
                  page = self.items[self.at:self.at + self.size]
                  self.at += self.size
                  return page
        `, options: ["Loop with «for page in Pages(items, 10)», getting 10 items at a time", "Print the items with page numbers", "Sort the items into pages"], answer: 0, verify: false, mono: false,
        explain: md`Each «__next__» slices the next «size» items, until the list runs out.`,
        why: [null, md`It hands out slices. It prints nothing.`, md`It keeps the order. It never sorts.`],
        skill: "read" },
      { q: md`A «@contextmanager» tool prints a closing line after «yield», but the line is missing when the block has an error. What is the fix?`,
        options: ["Put «yield» inside «try», and the closing line in «finally»", "Add a second «yield»", "Catch the error with «except: pass»"], answer: 0, verify: false, mono: false,
        explain: md`The error comes out at the «yield». «finally» runs whatever happens.`,
        why: [null, md`A context manager must yield exactly once.`, md`That hides real errors. «finally» tidies up and lets the error carry on.`],
        skill: "debug" },
      { q: md`What must «__next__» do when there are no more items?`,
        options: ["Raise StopIteration", "Give back None", "Give back an empty list"], answer: 0, verify: false, mono: false,
        explain: md`StopIteration is the signal «for» and «list()» wait for.`,
        why: [null, md`None is a value, so the loop would go on for ever.`, md`An empty list is also a value, not a signal to stop.`],
        skill: "memory" },
      { q: md`Every report your program prints must start with a heading and end with a line of dashes, even when something fails. What fits best?`,
        options: ["A «@contextmanager» tool used as «with report(title):»", "Copy the heading and dashes into every function", "A global flag that says a report is open"], answer: 0, verify: false, mono: false,
        explain: md`The start and the tidy-up live in one place, and «finally» makes the end line certain.`,
        why: [null, md`Copies get forgotten, and an error skips the end line.`, md`A flag does not print anything, and errors skip resetting it.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: next by hand",
        task: md`Answer each question without running the program.`,
        code: py`
          class Evens:
              def __init__(self, limit):
                  self.n, self.limit = 0, limit
              def __iter__(self):
                  return self
              def __next__(self):
                  if self.n > self.limit:
                      raise StopIteration
                  self.n += 2
                  return self.n - 2

          e = Evens(4)
          first = next(e)
          print(first, list(e))
        `,
        ask: [{ line: 13, name: "first" }, { output: true }],
        hints: [
          md`The first «next» gives back the n from before adding 2: 0.`,
          md`Then 2, then 4. After that n is 6, which is more than 4.`,
          md`«list(e)» collects what is left after the first «next».`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: the order of a with",
        task: md`Answer each question without running the program.`,
        code: py`
          from contextlib import contextmanager

          @contextmanager
          def box(name):
              print("open", name)
              try:
                  yield name.upper()
              finally:
                  print("close", name)

          with box("tea") as label:
              shown = label + "!"
              print(shown)
          print("done")
        `,
        ask: [{ line: 12, name: "shown" }, { output: true }],
        hints: [
          md`The code before «yield» runs first: «open tea».`,
          md`The yielded value, «TEA», goes into «label».`,
          md`The «finally» part runs when the block ends, before «done».`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: a repeat iterator",
        task: md`
          Put the lines in order. «Repeat» hands out the same word a set number of times. The program prints:

          | ['ha', 'ha', 'ha']
        `,
        solution: py`
          class Repeat:
              def __init__(self, word, times):
                  self.word, self.left = word, times
              def __iter__(self):
                  return self
              def __next__(self):
                  if self.left == 0:
                      raise StopIteration
                  self.left -= 1
                  return self.word
          print(list(Repeat("ha", 3)))
        `,
        distractors: ["            return None"],
        tests: [{ output: "['ha', 'ha', 'ha']" }],
        hints: [
          md`If the program never ends, the stop must be «raise StopIteration», not a «return».`,
          md`If you see «'Repeat' object is not iterable», «__iter__» must give back «self».`,
          md`If the list is empty or too long, count down «self.left» before giving back the word.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the missing end line",
        task: md`
          «report» prints a heading and an end line around a report. The second report fails on a bad mark, but its end line must still print. The output should be:

          | -- Marks --
          | Asha 72
          | -- end --
          | -- Marks --
          | -- end --
          | Bad mark: x

          The second «-- end --» is missing. Tap the line that causes it, then fix it.
        `,
        starter: py`
          from contextlib import contextmanager

          @contextmanager
          def report(title):
              print(f"-- {title} --")
              yield
              print("-- end --")

          for line in ["Asha 72", "Ravi x"]:
              try:
                  with report("Marks"):
                      name, mark = line.split()
                      print(name, int(mark))
              except ValueError:
                  print("Bad mark:", mark)
        `,
        bugLines: [6],
        solution: py`
          from contextlib import contextmanager

          @contextmanager
          def report(title):
              print(f"-- {title} --")
              try:
                  yield
              finally:
                  print("-- end --")

          for line in ["Asha 72", "Ravi x"]:
              try:
                  with report("Marks"):
                      name, mark = line.split()
                      print(name, int(mark))
              except ValueError:
                  print("Bad mark:", mark)
        `,
        tests: [{ output: "-- Marks --\nAsha 72\n-- end --\n-- Marks --\n-- end --\nBad mark: x" }],
        wrong: [py`
          from contextlib import contextmanager

          @contextmanager
          def report(title):
              print(f"-- {title} --")
              try:
                  yield
              except ValueError:
                  pass
              print("-- end --")

          for line in ["Asha 72", "Ravi x"]:
              try:
                  with report("Marks"):
                      name, mark = line.split()
                      print(name, int(mark))
              except ValueError:
                  print("Bad mark:", mark)
        `],
        hints: [
          md`An error inside the «with» comes out at the «yield», so the line after it never runs.`,
          md`Put «yield» inside «try», and the end line inside «finally».`,
          md`If «Bad mark: x» is missing, the error was swallowed. Use «finally», not «except», so the error still reaches the caller.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: count down in steps",
        task: md`
          Give «Countdown» a second value, «step», so it counts down by that much. «Countdown(10, 3)» should give 10, 7, 4 and 1. The program prints:

          | [10, 7, 4, 1]
          | [5, 4, 3, 2, 1]
        `,
        starter: py`
          class Countdown:
              def __init__(self, start):
                  self.n = start

              def __iter__(self):
                  return self

              def __next__(self):
                  if self.n <= 0:
                      raise StopIteration
                  value = self.n
                  self.n -= 1
                  return value

          print(list(Countdown(10)))
          print(list(Countdown(5)))
        `,
        solution: py`
          class Countdown:
              def __init__(self, start, step=1):
                  self.n = start
                  self.step = step

              def __iter__(self):
                  return self

              def __next__(self):
                  if self.n <= 0:
                      raise StopIteration
                  value = self.n
                  self.n -= self.step
                  return value

          print(list(Countdown(10, 3)))
          print(list(Countdown(5)))
        `,
        tests: [
          { output: "[10, 7, 4, 1]\n[5, 4, 3, 2, 1]" },
          { py: py`
            C = need("Countdown", "class")
            assert list(C(6, 2)) == [6, 4, 2], "Countdown(6, 2) should give [6, 4, 2]."
            assert list(C(3)) == [3, 2, 1], "Without a step, Countdown should still count down by 1."
          ` },
        ],
        wrong: [py`
          class Countdown:
              def __init__(self, start, step):
                  self.n = start
                  self.step = step

              def __iter__(self):
                  return self

              def __next__(self):
                  if self.n <= 0:
                      raise StopIteration
                  value = self.n
                  self.n -= self.step
                  return value

          print(list(Countdown(10, 3)))
          print(list(Countdown(5, 1)))
        `],
        hints: [
          md`If you see «missing 1 required positional argument: 'step'», give step a default: «step=1».`,
          md`If it still counts by 1, take away «self.step», not 1.`,
          md`Keep the test «self.n <= 0», so a step that jumps past 0 still stops.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: pages of results",
        task: md`
          From a blank page. Write a class «Pages» with «__iter__» and «__next__». «Pages(items, size)» hands out the items «size» at a time, as lists, and the last page may be shorter. Then ask for names on one line and a page size, and print each page as «Page N: » followed by the names joined by «, ». For «Asha Ravi Om Meena Dev» and «2» it shows:

          | Page 1: Asha, Ravi
          | Page 2: Om, Meena
          | Page 3: Dev
        `,
        starter: py``,
        solution: py`
          class Pages:
              def __init__(self, items, size):
                  self.items = items
                  self.size = size
                  self.at = 0

              def __iter__(self):
                  return self

              def __next__(self):
                  if self.at >= len(self.items):
                      raise StopIteration
                  page = self.items[self.at:self.at + self.size]
                  self.at += self.size
                  return page

          names = input("Names: ").split()
          size = int(input("Page size: "))
          for number, page in enumerate(Pages(names, size), start=1):
              print(f"Page {number}: " + ", ".join(page))
        `,
        tests: [
          { inputs: ["Asha Ravi Om Meena Dev", "2"], output: "Page 1: Asha, Ravi\nPage 2: Om, Meena\nPage 3: Dev" },
          { inputs: ["A B C", "3"], output: "Page 1: A, B, C" },
          { inputs: ["A B C D", "1"], output: "Page 1: A\nPage 2: B\nPage 3: C\nPage 4: D" },
          { inputs: ["x", "5"], py: py`
            P = need("Pages", "class")
            assert "__next__" in vars(P) and "__iter__" in vars(P), "Pages needs its own «__iter__» and «__next__» methods."
            assert list(P([1, 2, 3, 4, 5], 2)) == [[1, 2], [3, 4], [5]], "Pages([1, 2, 3, 4, 5], 2) should give [[1, 2], [3, 4], [5]]."
            assert list(P([], 3)) == [], "An empty list has no pages."
          ` },
        ],
        wrong: [py`
          class Pages:
              def __init__(self, items, size):
                  self.items = items
                  self.size = size
                  self.at = 0

              def __iter__(self):
                  return self

              def __next__(self):
                  if self.at + self.size > len(self.items):
                      raise StopIteration
                  page = self.items[self.at:self.at + self.size]
                  self.at += self.size
                  return page

          names = input("Names: ").split()
          size = int(input("Page size: "))
          for number, page in enumerate(Pages(names, size), start=1):
              print(f"Page {number}: " + ", ".join(page))
        `],
        hints: [
          md`If the last, shorter page is missing, stop only when nothing at all is left: «self.at >= len(self.items)».`,
          md`If the program never ends, «__next__» must raise StopIteration when the items run out.`,
          md`If the pages start at 0, use «enumerate(..., start=1)».`,
        ],
      },
    ],
    keys: [
      md`«iter()» gives an iterator; «next()» takes one item; StopIteration means none are left. «for» does all this for you.`,
      md`A class with «__iter__» (give back self) and «__next__» (next value or StopIteration) works in «for» and «list()».`,
      md`«@contextmanager»: code before «yield» runs at the start of the «with», and code in «finally» at the end, even after an error.`,
      md`The class way is «__enter__» and «__exit__». Use your own «with» for anything that must be tidied up.`,
    ],
  });
})();
