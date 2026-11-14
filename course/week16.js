// Week 16 - Smarter Data Tools (Days 106 to 112).
(function () {
  const { day, md, py, ex, code, tip, warn, ask, pause } = window.Course;

  // ---------------------------------------------------------------- Day 106
  day({
    slug: "better-dictionaries",
    title: "Better Dictionaries",
    goal: "Group and count with defaultdict, and sort a dictionary by its values.",
    minutes: 45,
    needs: [30, 59, 67],
    win: "Today you can now group and count with defaultdict, sort a dictionary by its values, and build a dictionary in one line.",
    learn: [
      md`
        ## Groups without the first-time check

        On Day 59 you grouped records with a dictionary of lists. The first time a key appeared, you had to make its empty list yourself. The «collections» module has a dictionary that does that for you: **defaultdict**. Guess the output.
      `,
      ex(py`
        from collections import defaultdict

        students = [("Asha", "Pune"), ("Ravi", "Delhi"), ("Meena", "Pune")]
        groups = defaultdict(list)
        for name, city in students:
            groups[city].append(name)
        print(dict(groups))
      `, { predict: ["{'Pune': ['Asha', 'Meena'], 'Delhi': ['Ravi']}", "KeyError: 'Pune'", "{'Pune': ['Meena'], 'Delhi': ['Ravi']}"], answer: 0 }),
      md`
        «defaultdict(list)» works like a normal dictionary, with one difference. When you use a key that is not there yet, it first calls «list()» to make an empty list for it. So «groups[city].append(name)» never gives a KeyError. «dict(groups)» turns it back into a plain dictionary, so it prints neatly.

        ## Counting from zero

        «defaultdict(int)» does the same for counts: «int()» gives 0, so every new key starts at 0. Guess the output.
      `,
      ex(py`
        from collections import defaultdict

        votes = defaultdict(int)
        for drink in "chai coffee chai chai".split():
            votes[drink] += 1
        print(votes["chai"], votes["lassi"])
        print(len(votes))
      `, { predict: ["3 0\n3", "3 0\n2", "3 KeyError"], answer: 0 }),
      md`
        Nobody voted for lassi, so it gives 0. But look at the second line: just **reading** «votes["lassi"]» added lassi as a key, so there are now 3 keys. To ask without adding, use «"lassi" in votes» or «votes.get("lassi", 0)».

        A plain dictionary has a one-line way too: «groups.setdefault(city, []).append(name)». «setdefault» gives back the value for the key, and first stores «[]» if the key is missing.
      `,
      pause(md`Good place for a break. Next: sorting a dictionary by its values, and building one in a line.`),
      md`
        ## Sorting by the values

        «sorted(marks)» sorts the **keys**. To sort by the values, sort the pairs from «.items()» with a key (Day 67). A minus sign puts the biggest first. Guess the output.
      `,
      ex(py`
        marks = {"Asha": 72, "Ravi": 88, "Meena": 65}
        for name, m in sorted(marks.items(), key=lambda pair: -pair[1]):
            print(name, m)
      `, { predict: ["Ravi 88\nAsha 72\nMeena 65", "Asha 72\nMeena 65\nRavi 88", "Meena 65\nAsha 72\nRavi 88"], answer: 0 }),
      md`
        ## A dictionary in one line

        On Day 87 you read dictionary comprehensions. Now write one: «{key: value for ... in ... if ...}». Guess the output.
      `,
      ex(py`
        marks = {"Asha": 72, "Ravi": 28, "Meena": 65}
        passed = {name: m for name, m in marks.items() if m >= 33}
        print(passed)
      `, { predict: ["{'Asha': 72, 'Meena': 65}", "{'Ravi': 28}", "['Asha', 'Meena']"], answer: 0 }),
      md`
        The «if» at the end keeps only some pairs, as in a list comprehension. Curly brackets with «key: value» make a dictionary.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          from collections import defaultdict

          d = defaultdict(int)
          for ch in "banana":
              d[ch] += 1
          print(d["a"], len(d))
        `, options: ["3 3", "3 6", "1 3"], answer: 0,
        explain: md`«a» appears 3 times. There are 3 different letters: b, a and n.`,
        why: [null, md`«len» counts the different keys, not the letters of the word.`, md`Each «a» adds 1 to the same key, so the count grows to 3.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          from collections import defaultdict

          by_topic = defaultdict(list)
          for question, topic in bank:
              by_topic[topic].append(question)
        `, options: ["It groups the questions by topic", "It counts the questions in each topic", "It sorts the questions A to Z"],
        answer: 0, verify: false, mono: false,
        explain: md`Each topic gets a list, and every question is added to its topic's list.`,
        why: [null, md`It appends the questions themselves, not 1 for each.`, md`Nothing is sorted. The questions keep the order of the bank.`],
        skill: "read" },
      { q: md`«groups = {}» then «groups[city].append(name)» stops with KeyError. What is the simplest fix?`,
        options: ["«groups = defaultdict(list)»", "«groups = []»", "«groups = defaultdict(int)»"],
        answer: 0, verify: false, mono: false,
        explain: md`A defaultdict of lists makes the empty list the first time a city is used.`,
        why: [null, md`A list has no keys, so «groups[city]» would fail in a new way.`, md`«int()» gives 0, and a number has no «.append».`],
        skill: "debug" },
      { q: md`What does «defaultdict(int)» give back for a key it has never seen?`,
        options: ["0", "None", "It stops with KeyError"], answer: 0, verify: false, mono: false,
        explain: md`«int()» with nothing in the brackets is 0, so a new key starts at 0.`,
        why: [null, md`None comes from «.get(key)» on a plain dictionary.`, md`Avoiding KeyError is the whole point of a defaultdict.`],
        skill: "memory" },
      { q: md`You have «marks», a dictionary of subject to marks. You need the subjects from highest marks to lowest. Which do you use?`,
        options: ["«sorted(marks.items(), key=lambda pair: -pair[1])»", "«sorted(marks)»", "«marks.sort()»"], answer: 0, verify: false,
        explain: md`Sort the pairs, with the marks as the key, and a minus sign for highest first.`,
        why: [null, md`«sorted(marks)» sorts the subject names A to Z.`, md`A dictionary has no «.sort()» method.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: the busiest snack",
        task: md`Answer each question without running the program.`,
        code: py`
          from collections import defaultdict

          orders = ["chai", "vada", "chai", "samosa", "chai"]
          count = defaultdict(int)
          for item in orders:
              count[item] += 1
          top = max(count, key=lambda k: count[k])
          print(top, count[top], len(count))
        `,
        ask: [{ line: 6, hit: 3, name: "item" }, { line: 7, name: "top" }, { output: true }],
        hints: [
          md`Line 6 runs once for each order. The third time, it is the third order in the list.`,
          md`«max» with a key gives back the key whose count is biggest.`,
          md`«len(count)» is the number of different snacks, not the number of orders.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: ranked by marks",
        task: md`Answer each question without running the program. The key is a tuple: minus the marks, then the name.`,
        code: py`
          marks = {"Om": 70, "Asha": 85, "Dev": 70}
          ranked = sorted(marks.items(), key=lambda pair: (-pair[1], pair[0]))
          first = ranked[0][0]
          print(ranked)
        `,
        ask: [{ line: 3, name: "first" }, { output: true }],
        hints: [
          md`The minus sign puts the highest marks first.`,
          md`Om and Dev tie at 70, so the name decides between them, A to Z.`,
          md`«ranked» is a list of (name, marks) pairs. «ranked[0][0]» is the first name.`,
        ],
      },
      {
        id: "p1", kind: "parsons", indent: "choose", title: "Arrange: names by first letter",
        task: md`
          Put the lines in order and set each indent. The program groups the names by their first letter, and prints:

          | {'A': ['Asha', 'Anil'], 'R': ['Ravi', 'Rekha']}
        `,
        solution: py`
          from collections import defaultdict
          names = ["Asha", "Ravi", "Anil", "Rekha"]
          groups = defaultdict(list)
          for name in names:
              groups[name[0]].append(name)
          print(dict(groups))
        `,
        distractors: ["groups = defaultdict(int)"],
        tests: [{ output: "{'A': ['Asha', 'Anil'], 'R': ['Ravi', 'Rekha']}" }],
        hints: [
          md`If you see an error about appending to an int, the dictionary makes 0 for a new key, not an empty list.`,
          md`If only the last name of each letter is kept, the line that adds a name is not inside the loop.`,
          md`If the print shows «defaultdict(...)», the last line does not turn it into a plain dictionary first.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: counting words crashes",
        task: md`
          The program counts how often each word is typed. For «chai tea chai» it should print:

          | chai 2
          | tea 1

          It stops with a TypeError instead. Tap the line that causes it, then fix it.
        `,
        starter: py`
          from collections import defaultdict

          words = input("Words: ").split()
          count = defaultdict(list)
          for w in words:
              count[w] += 1
          for w, n in count.items():
              print(w, n)
        `,
        bugLines: [4],
        solution: py`
          from collections import defaultdict

          words = input("Words: ").split()
          count = defaultdict(int)
          for w in words:
              count[w] += 1
          for w, n in count.items():
              print(w, n)
        `,
        tests: [
          { inputs: ["chai tea chai"], output: "chai 2\ntea 1" },
          { inputs: ["a"], output: "a 1" },
          { inputs: ["x y x y x"], output: "x 3\ny 2" },
        ],
        wrong: [py`
          from collections import defaultdict

          words = input("Words: ").split()
          count = defaultdict(str)
          for w in words:
              count[w] += 1
          for w, n in count.items():
              print(w, n)
        `],
        hints: [
          md`The error says a number cannot be added to a list. Ask what a new key starts as.`,
          md`A count must start at 0, but this dictionary starts every new key with an empty list.`,
          md`If you now see a TypeError about text, the new key starts as empty text, not 0.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: groups with no if",
        task: md`
          This program groups students by city the Day 59 way, with an «if» for the first time. Change it to use «defaultdict(list)», so it needs no «if». The output stays the same:

          | Pune Asha, Meena
          | Delhi Ravi, Om
        `,
        starter: py`
          students = [("Asha", "Pune"), ("Ravi", "Delhi"), ("Meena", "Pune"), ("Om", "Delhi")]
          groups = {}
          for name, city in students:
              if city not in groups:
                  groups[city] = []
              groups[city].append(name)
          for city, names in groups.items():
              print(city, ", ".join(names))
        `,
        solution: py`
          from collections import defaultdict

          students = [("Asha", "Pune"), ("Ravi", "Delhi"), ("Meena", "Pune"), ("Om", "Delhi")]
          groups = defaultdict(list)
          for name, city in students:
              groups[city].append(name)
          for city, names in groups.items():
              print(city, ", ".join(names))
        `,
        tests: [
          { output: "Pune Asha, Meena\nDelhi Ravi, Om" },
          { uses: ["call:defaultdict"], avoids: ["kw:if"] },
        ],
        wrong: [py`
          from collections import defaultdict

          students = [("Asha", "Pune"), ("Ravi", "Delhi"), ("Meena", "Pune"), ("Om", "Delhi")]
          groups = defaultdict(list)
          for name, city in students:
              if city not in groups:
                  groups[city] = []
              groups[city].append(name)
          for city, names in groups.items():
              print(city, ", ".join(names))
        `],
        hints: [
          md`If a test says to use defaultdict, the dictionary is still made with empty curly brackets.`,
          md`If a test says to do it without «if», the first-time check is still there. A defaultdict does that job.`,
          md`If you see a NameError for defaultdict, the import line from collections is missing.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: who ordered what",
        task: md`
          From a blank page. The user types orders on one line, each as «name:item», like this:

          : Asha:chai Ravi:vada Asha:samosa Om:chai

          Print each person in A to Z order with their items, joined with a comma and a space, in the order they were typed. Then print who ordered the most items; if two people tie, the one first in A to Z order. For the line above it shows:

          | Asha: chai, samosa
          | Om: chai
          | Ravi: vada
          | Most items: Asha
        `,
        starter: py``,
        solution: py`
          from collections import defaultdict

          orders = defaultdict(list)
          for part in input("Orders: ").split():
              name, item = part.split(":")
              orders[name].append(item)
          for name in sorted(orders):
              print(f"{name}: {', '.join(orders[name])}")
          most = min(sorted(orders), key=lambda n: -len(orders[n]))
          print("Most items:", most)
        `,
        tests: [
          { inputs: ["Asha:chai Ravi:vada Asha:samosa Om:chai"], output: "Asha: chai, samosa\nOm: chai\nRavi: vada\nMost items: Asha" },
          { inputs: ["Zoya:tea"], output: "Zoya: tea\nMost items: Zoya" },
          { inputs: ["Ravi:a Dev:b Ravi:c Dev:d"], output: "Dev: b, d\nRavi: a, c\nMost items: Dev" },
          { inputs: ["Om:x Ali:y Om:z Om:w"], output: "Ali: y\nOm: x, z, w\nMost items: Om" },
        ],
        wrong: [py`
          from collections import defaultdict

          orders = defaultdict(list)
          for part in input("Orders: ").split():
              name, item = part.split(":")
              orders[name].append(item)
          for name in orders:
              print(f"{name}: {', '.join(orders[name])}")
          most = max(orders, key=lambda n: len(orders[n]))
          print("Most items:", most)
        `, py`
          from collections import defaultdict

          orders = defaultdict(list)
          for part in input("Orders: ").split():
              name, item = part.split(":")
              orders[name].append(item)
          for name in sorted(orders):
              print(f"{name}: {', '.join(sorted(orders[name]))}")
          most = min(sorted(orders), key=lambda n: -len(orders[n]))
          print("Most items:", most)
        `],
        hints: [
          md`If the people come out in the order they were typed, sort the names before the loop that prints.`,
          md`If two people tie and the wrong one is named, the tie must go to the name first in A to Z order.`,
          md`If one person's items are in A to Z order, keep them in the order they were typed: only the names are sorted.`,
        ],
      },
    ],
    keys: [
      md`«defaultdict(list)» makes an empty list the first time a key is used; «defaultdict(int)» starts every key at 0.`,
      md`Just reading a missing key of a defaultdict adds it. Use «in» or «.get» to ask without adding.`,
      md`«d.setdefault(key, [])» does the same first-time job for a plain dictionary.`,
      md`Sort by values with «sorted(d.items(), key=lambda pair: -pair[1])».`,
      md`«{k: v for k, v in d.items() if test}» builds a new dictionary in one line.`,
    ],
  });

  // ---------------------------------------------------------------- Day 107
  day({
    slug: "queues-and-records",
    title: "Queues and Named Records",
    goal: "Serve a queue fairly with deque, and name the parts of a record with namedtuple.",
    minutes: 45,
    needs: [26, 98],
    win: "Today you can now run a fair queue with deque, keep an undo history as a stack, and give the parts of a record their own names.",
    learn: [
      md`
        ## A queue that is fast at both ends

        On Day 98 the waiting list was a list, served with «pop(0)». That works, but every time the first item leaves, every other item moves up one place. With a lakh of people waiting, that is slow. The «collections» module has a **deque** (say "deck"): a list that is fast at both ends. Guess the output.
      `,
      ex(py`
        from collections import deque

        queue = deque(["Asha", "Ravi"])
        queue.append("Meera")
        first = queue.popleft()
        print(first, list(queue))
      `, { predict: ["Asha ['Ravi', 'Meera']", "Meera ['Asha', 'Ravi']", "Asha ['Asha', 'Ravi', 'Meera']"], answer: 0 }),
      md`
        «append» adds at the back, and «popleft» takes from the front: first come, first served. A deque also has «appendleft», which adds at the front, and «pop», which takes from the back.

        ## Keep only the last few

        «deque(maxlen=3)» holds at most 3 items. When a fourth arrives, the oldest falls off the other end. Guess the output.
      `,
      ex(py`
        from collections import deque

        recent = deque(maxlen=3)
        for score in [40, 55, 62, 70, 81]:
            recent.append(score)
        print(list(recent), sum(recent) / len(recent))
      `, { predict: ["[62, 70, 81] 71.0", "[40, 55, 62] 52.33", "[40, 55, 62, 70, 81] 61.6"], answer: 0 }),
      md`
        This is how an app shows "your last 3 mock tests": the window slides along by itself.
      `,
      pause(md`Good place for a break. Next: a stack for undo, and records with names.`),
      md`
        ## A stack: last in, first out

        A queue serves the oldest first. A **stack** serves the newest first, like a pile of plates. The Undo button is a stack: it undoes your last action first. A plain list is a good stack: «append» to add, «pop()» to take the newest. Guess the output.
      `,
      ex(py`
        history = []
        for action in ["type A", "type B", "bold"]:
            history.append(action)
        print(history.pop())
        print(history.pop())
        print(history)
      `, { predict: ["bold\ntype B\n['type A']", "type A\ntype B\n['bold']", "bold\nbold\n['type A', 'type B']"], answer: 0 }),
      md`
        A stack also checks brackets: each opening bracket waits on the stack until its closing bracket arrives, and the newest one must close first.

        ## namedtuple: a tuple with names

        A tuple like «("Asha", 82)» makes you remember that position 1 is the marks. A **namedtuple** gives each position a name. Guess the output.
      `,
      ex(py`
        from collections import namedtuple

        Student = namedtuple("Student", ["name", "marks"])
        s = Student("Asha", 82)
        print(s.name, s[1])
        print(s)
      `, { predict: ["Asha 82\nStudent(name='Asha', marks=82)", "Asha 82\n('Asha', 82)", "name marks\nStudent"], answer: 0 }),
      md`
        «namedtuple("Student", ["name", "marks"])» makes a new kind of tuple. You can read «s.marks» or «s[1]», and it prints clearly. Like any tuple, it cannot be changed: «s.marks = 90» stops with AttributeError.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          from collections import deque

          d = deque([1, 2, 3])
          d.append(4)
          d.popleft()
          d.appendleft(0)
          print(list(d))
        `, options: ["[0, 2, 3, 4]", "[0, 1, 2, 3]", "[2, 3, 4, 0]"], answer: 0,
        explain: md`4 joins the back, 1 leaves the front, then 0 joins the front.`,
        why: [null, md`«popleft» took 1 away, and «append» added 4 at the back.`, md`«appendleft» adds at the front, not the back.`],
        skill: "trace" },
      { q: md`What does this function do?`, code: py`
          def undo(history):
              if history:
                  return history.pop()
              return None
        `, options: ["It takes away the newest action and gives it back, or None if there is none", "It takes away the oldest action", "It empties the whole history"],
        answer: 0, verify: false, mono: false,
        explain: md`«pop()» takes the last item, the newest. An empty list gives None instead of a crash.`,
        why: [null, md`The oldest would be «pop(0)».`, md`Only one item leaves on each call.`],
        skill: "read" },
      { q: md`A ticket counter keeps people in a list and serves them with «line.pop()». The person who came last is served first. What is the best fix?`,
        options: ["Use a deque, add with «append» and serve with «popleft»", "Sort the list before serving", "Serve with «line.pop(-1)»"],
        answer: 0, verify: false, mono: false,
        explain: md`A queue serves from the front. «popleft» is fast and fair.`,
        why: [null, md`Sorting puts names A to Z, not in the order people came.`, md`«pop(-1)» is the same as «pop()»: the last person.`],
        skill: "debug" },
      { q: md`«recent = deque(maxlen=3)» already holds 3 items. What happens on «recent.append(9)»?`,
        options: ["The oldest item falls off the front, and 9 joins the back", "It stops with an error", "9 is not added"],
        answer: 0, verify: false, mono: false,
        explain: md`A deque with a «maxlen» keeps only the newest items, so it slides along.`,
        why: [null, md`A full deque never raises an error. It drops the oldest item.`, md`The new item always goes in. An old one comes out instead.`],
        skill: "memory" },
      { q: md`You want to keep a student's name and marks together, and read them as «s.name» and «s.marks». The record never changes. Which do you use?`,
        options: ["«a namedtuple»", "«a set»", "«two separate lists»"], answer: 0, verify: false,
        explain: md`A namedtuple is a fixed record whose parts have names.`,
        why: [null, md`A set has no order and no names for its parts.`, md`Two lists keep names and marks apart, so they can get out of step.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: the counter queue",
        task: md`Answer each question without running the program.`,
        code: py`
          from collections import deque

          line = deque(["Asha", "Ravi", "Meera"])
          served = []
          while line:
              person = line.popleft()
              served.append(person)
              if person == "Ravi":
                  line.append("Om")
          print(served)
        `,
        ask: [{ line: 6, hit: 2, name: "person" }, { output: true }],
        hints: [
          md`«popleft» always takes the person at the front of the line.`,
          md`When Ravi is served, Om joins the back, behind Meera.`,
          md`The loop goes on while anyone is left, so Om is served too.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: the last two words",
        task: md`Answer each question without running the program.`,
        code: py`
          from collections import deque

          last = deque(maxlen=2)
          for word in ["chai", "vada", "dosa", "idli"]:
              last.append(word)
              print(list(last))
        `,
        ask: [{ line: 5, hit: 3, name: "word" }, { output: true }],
        hints: [
          md`The third time line 5 runs, the loop is on the third word.`,
          md`The deque holds at most 2 words. A third pushes the oldest out.`,
          md`Each round prints the deque as it is after the new word joins.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: undo the last step",
        task: md`
          Put the lines in order. The program records three steps, then undoes the newest one. It prints:

          | save ['write', 'edit']
        `,
        solution: py`
          history = []
          for step in ["write", "edit", "save"]:
              history.append(step)
          last = history.pop()
          print(last, history)
        `,
        distractors: ["last = history.pop(0)"],
        tests: [{ output: "save ['write', 'edit']" }],
        hints: [
          md`If «write» is undone, the program takes the oldest step. Undo takes the newest.`,
          md`If the history is printed before anything is undone, the undo line comes too late.`,
          md`If the list is empty when you undo, the loop that records the steps must come first.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: served in the wrong order",
        task: md`
          People arrive at a counter in the order they are typed, and must be served first come, first served. For «Asha Ravi Om» it should print:

          | Serving Asha
          | Serving Ravi
          | Serving Om

          It serves Om first instead. Tap the line that causes it, then fix it.
        `,
        starter: py`
          from collections import deque

          queue = deque()
          for name in input("Arrivals: ").split():
              queue.append(name)
          while queue:
              print("Serving", queue.pop())
        `,
        bugLines: [7],
        solution: py`
          from collections import deque

          queue = deque()
          for name in input("Arrivals: ").split():
              queue.append(name)
          while queue:
              print("Serving", queue.popleft())
        `,
        tests: [
          { inputs: ["Asha Ravi Om"], output: "Serving Asha\nServing Ravi\nServing Om" },
          { inputs: ["Zoya"], output: "Serving Zoya" },
          { inputs: ["A B C D"], output: "Serving A\nServing B\nServing C\nServing D" },
        ],
        wrong: [py`
          from collections import deque

          queue = deque()
          for name in input("Arrivals: ").split():
              queue.appendleft(name)
          while queue:
              print("Serving", queue.popleft())
        `],
        hints: [
          md`The last person to arrive is served first. Which end does the serving line take from?`,
          md`New people join at the back. Serving must take from the front.`,
          md`If the order is still back to front, check that people join at the back, not the front.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: name the parts",
        task: md`
          This program keeps students as plain tuples and reads them with «s[0]» and «s[1]». Change it to use a namedtuple called «Student» with the fields «name» and «marks». Build the list with «Student(...)», and read «s.name» and «s.marks». The output stays the same:

          | Asha passed with 82
          | Meena passed with 65
        `,
        starter: py`
          students = [("Asha", 82), ("Ravi", 28), ("Meena", 65)]
          for s in students:
              if s[1] >= 33:
                  print(s[0], "passed with", s[1])
        `,
        solution: py`
          from collections import namedtuple

          Student = namedtuple("Student", ["name", "marks"])
          students = [Student("Asha", 82), Student("Ravi", 28), Student("Meena", 65)]
          for s in students:
              if s.marks >= 33:
                  print(s.name, "passed with", s.marks)
        `,
        tests: [
          { output: "Asha passed with 82\nMeena passed with 65" },
          { py: py`
              students = need("students", "list")
              assert all(hasattr(s, "name") and hasattr(s, "marks") for s in students), "Each student should be a Student namedtuple, with the fields name and marks."
            ` },
        ],
        wrong: [py`
          from collections import namedtuple

          Student = namedtuple("Student", ["name", "marks"])
          students = [("Asha", 82), ("Ravi", 28), ("Meena", 65)]
          for s in students:
              if s[1] >= 33:
                  print(s[0], "passed with", s[1])
        `],
        hints: [
          md`If a test says each student should have fields, the list still holds plain tuples. Build each one with «Student(...)».`,
          md`If you see AttributeError for «name», the field names in the namedtuple line are spelled differently.`,
          md`If Ravi is printed, the check uses the wrong field or the wrong sign.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: the bracket checker",
        task: md`
          From a blank page. Ask for one line of text. Print «Balanced» if every bracket «(», «[» and «{» is closed by its own kind, in the right order. Otherwise print «Not balanced». Letters and other characters do not matter.

          Use a stack: push each opening bracket. A closing bracket must match the newest opening bracket, which you pop. At the end, nothing may be left open. For «(a[b]{c})» it shows:

          | Balanced

          For «(]» it shows:

          | Not balanced
        `,
        starter: py``,
        solution: py`
          pairs = {")": "(", "]": "[", "}": "{"}
          stack = []
          ok = True
          for ch in input("Text: "):
              if ch in "([{":
                  stack.append(ch)
              elif ch in pairs:
                  if not stack or stack.pop() != pairs[ch]:
                      ok = False
                      break
          if ok and not stack:
              print("Balanced")
          else:
              print("Not balanced")
        `,
        tests: [
          { inputs: ["(a[b]{c})"], output: "Balanced" },
          { inputs: ["(]"], output: "Not balanced" },
          { inputs: ["(("], output: "Not balanced" },
          { inputs: [")"], output: "Not balanced" },
          { inputs: ["print(len([1, 2]))"], output: "Balanced" },
          { inputs: ["([)]"], output: "Not balanced" },
          { inputs: ["no brackets"], output: "Balanced" },
        ],
        wrong: [py`
          text = input("Text: ")
          if text.count("(") == text.count(")") and text.count("[") == text.count("]") and text.count("{") == text.count("}"):
              print("Balanced")
          else:
              print("Not balanced")
        `, py`
          pairs = {")": "(", "]": "[", "}": "{"}
          stack = []
          ok = True
          for ch in input("Text: "):
              if ch in "([{":
                  stack.append(ch)
              elif ch in pairs:
                  if not stack or stack.pop() != pairs[ch]:
                      ok = False
                      break
          if ok:
              print("Balanced")
          else:
              print("Not balanced")
        `],
        hints: [
          md`If «([)]» shows Balanced, you only count brackets. The order matters: the newest open bracket must close first.`,
          md`If «((» shows Balanced, the program forgets to check that nothing is left on the stack at the end.`,
          md`If «)» crashes with IndexError, check that the stack is not empty before you pop.`,
        ],
      },
    ],
    keys: [
      md`A **deque** is fast at both ends: «append» at the back, «popleft» from the front. Use it for queues.`,
      md`«deque(maxlen=3)» keeps only the newest 3 items.`,
      md`A **stack** serves the newest first. A list is a stack: «append» and «pop()». Undo and bracket checks use stacks.`,
      md`«namedtuple("Student", ["name", "marks"])» makes tuples whose parts have names: «s.marks».`,
    ],
  });

  // ---------------------------------------------------------------- Day 108
  day({
    slug: "functions-are-values",
    title: "Functions Are Values",
    goal: "Pass a function into another function, and keep functions in a list or dictionary.",
    minutes: 45,
    needs: [32, 66, 67],
    win: "Today you can now pass a function into another function, choose a function from a dictionary, and write a function that makes functions.",
    learn: [
      md`
        ## A function is a value

        A function is a value, like a number or a list. Its name **without brackets** is the function itself. With brackets, it is a call. So you can store a function under a second name. Guess the output.
      `,
      ex(py`
        def shout(text):
            return text.upper() + "!"

        speak = shout
        print(speak("chai"))
      `, { predict: ["CHAI!", "shout", "TypeError"], answer: 0 }),
      md`
        «speak = shout» calls nothing. It gives the same function a second name, as «b = a» did for a list on Day 53. You have done this before: in «sorted(names, key=len)», you handed the function «len» to «sorted» without calling it.

        ## A function as a parameter

        A parameter can hold a function. Then the function you write can call whatever function it is given. Guess the output.
      `,
      ex(py`
        def apply_to_all(func, items):
            return [func(x) for x in items]

        def double(n):
            return n * 2

        print(apply_to_all(double, [1, 2, 3]))
        print(apply_to_all(len, ["chai", "samosa"]))
      `, { predict: ["[2, 4, 6]\n[4, 6]", "[2, 4, 6]\n[8, 12]", "TypeError"], answer: 0 }),
      md`
        The same «apply_to_all» doubled numbers in one call and measured words in the next. The caller decides what work is done to each item.
      `,
      pause(md`Good place for a break. Next: functions in a dictionary, and functions that make functions.`),
      md`
        ## A dictionary of functions

        A dictionary can map a word to a function. Then one lookup chooses what to do, in place of a long «if» and «elif» chain. Guess the output.
      `,
      ex(py`
        def add(a, b):
            return a + b

        def sub(a, b):
            return a - b

        ops = {"+": add, "-": sub}
        print(ops["-"](10, 4))
      `, { predict: ["6", "14", "sub"], answer: 0 }),
      md`
        «ops["-"]» gives the function «sub». The brackets after it, «(10, 4)», call it. To add a new command later, you add one line to the dictionary.

        ## A function that makes functions

        A function can make a new function inside it and give it back. The new function remembers the values around it. Guess the output.
      `,
      ex(py`
        def make_tax(rate):
            def tax(price):
                return price + price * rate / 100
            return tax

        gst18 = make_tax(18)
        gst5 = make_tax(5)
        print(gst18(100), gst5(100))
      `, { predict: ["118.0 105.0", "118.0 118.0", "tax tax"], answer: 0 }),
      md`
        Each call to «make_tax» makes a separate «tax» function, and each one keeps its own «rate». «gst18» always adds 18 percent, and «gst5» always adds 5.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          def twice(f, x):
              return f(f(x))

          def add3(n):
              return n + 3

          print(twice(add3, 10))
        `, options: ["16", "13", "20"], answer: 0,
        explain: md`«add3(10)» is 13, and «add3(13)» is 16.`,
        why: [null, md`«twice» calls «add3» two times, not once.`, md`It adds 3 twice. It does not double 10.`],
        skill: "trace" },
      { q: md`What does this function do?`, code: py`
          def best(items, score):
              return max(items, key=score)
        `, options: ["It gives back the item with the highest score, where the caller chooses how to score", "It gives back the highest score", "It sorts the items by score"],
        answer: 0, verify: false, mono: false,
        explain: md`«score» is a function from the caller. «max» uses it as the key and gives back the item itself.`,
        why: [null, md`«max» with a key gives back the item, not the key's value.`, md`«max» finds one item. Nothing is sorted.`],
        skill: "read" },
      { q: md`«apply_to_all(double(), [1, 2])» stops with «TypeError: double() missing 1 required positional argument». What is wrong?`,
        options: ["The brackets after «double» call it at once. Pass «double» with no brackets", "«apply_to_all» needs a third value", "«double» must return a list"],
        answer: 0, verify: false, mono: false,
        explain: md`Without brackets you pass the function itself, and «apply_to_all» calls it for each item.`,
        why: [null, md`The error is about «double», not about «apply_to_all».`, md`«double» works on one number at a time. The brackets are the problem.`],
        skill: "debug" },
      { q: md`«ops = {"+": add}». What is «ops["+"]»?`,
        options: ["The function «add» itself", "The answer of «add»", "The text «add»"], answer: 0, verify: false, mono: false,
        explain: md`The dictionary holds the function. Brackets after it, like «ops["+"](2, 3)», call it.`,
        why: [null, md`Nothing is called until brackets come after it.`, md`«add» has no quotes in the dictionary, so it is the function, not text.`],
        skill: "memory" },
      { q: md`A menu has six commands, each done by its own function. Which keeps the code short and easy to grow?`,
        options: ["A dictionary from each command word to its function", "Six «if» and «elif» lines", "Six separate loops"], answer: 0, verify: false, mono: false,
        explain: md`One lookup chooses the function. A new command is one new line in the dictionary.`,
        why: [null, md`It works, but every new command makes the chain longer.`, md`Loops repeat work. They do not choose between commands.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: apply to all",
        task: md`Answer each question without running the program.`,
        code: py`
          def apply_to_all(func, items):
              result = []
              for x in items:
                  result.append(func(x))
              return result

          def square(n):
              return n * n

          nums = apply_to_all(square, [2, 3, 4])
          print(nums, sum(nums))
        `,
        ask: [{ line: 4, hit: 2, name: "x" }, { line: 10, name: "nums" }, { output: true }],
        hints: [
          md`Line 4 runs once for each item. The second time, the loop is on the second item.`,
          md`«func» is «square» here, so each item is multiplied by itself.`,
          md`The squares are 4, 9 and 16. Add them for the last number.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: two discounts",
        task: md`Answer each question without running the program. «//» drops the part after the point.`,
        code: py`
          def make_discount(percent):
              def apply(price):
                  return price - price * percent // 100
              return apply

          festival = make_discount(20)
          member = make_discount(10)
          a = festival(500)
          b = member(500)
          print(a, b, festival(member(500)))
        `,
        ask: [{ line: 8, name: "a" }, { line: 9, name: "b" }, { output: true }],
        hints: [
          md`«festival» remembers 20, and «member» remembers 10.`,
          md`20 percent of 500 is 100, and 10 percent of 500 is 50.`,
          md`The last call takes 10 percent off first, then 20 percent off 450.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: a calculator in a dictionary",
        task: md`
          Put the lines in order. The program keeps two functions in a dictionary and calls each one through it. It prints:

          | 42 13
        `,
        solution: py`
          def add(a, b):
              return a + b
          def mul(a, b):
              return a * b
          ops = {"+": add, "*": mul}
          print(ops["*"](6, 7), ops["+"](6, 7))
        `,
        distractors: ['ops = {"+": add(), "*": mul()}'],
        tests: [{ output: "42 13" }],
        hints: [
          md`If you see a TypeError about missing arguments, the dictionary calls the functions too early. Store them without brackets.`,
          md`If you see a NameError, the dictionary line comes before the functions are made.`,
          md`If the two numbers are swapped, look at which key each call uses.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the sort that crashes",
        task: md`
          The program should list the students from highest marks to lowest:

          | Ravi 88
          | Asha 72
          | Meena 65

          It stops with a TypeError instead. Tap the line that causes it, then fix it.
        `,
        starter: py`
          def by_marks(student):
              return student[1]

          students = [("Asha", 72), ("Ravi", 88), ("Meena", 65)]
          for name, m in sorted(students, key=by_marks(), reverse=True):
              print(name, m)
        `,
        bugLines: [5],
        solution: py`
          def by_marks(student):
              return student[1]

          students = [("Asha", 72), ("Ravi", 88), ("Meena", 65)]
          for name, m in sorted(students, key=by_marks, reverse=True):
              print(name, m)
        `,
        tests: [
          { output: "Ravi 88\nAsha 72\nMeena 65" },
          { py: py`
              expect("by_marks", (("Om", 40),), 40)
            ` },
        ],
        wrong: [py`
          def by_marks(student):
              return student[1]

          students = [("Asha", 72), ("Ravi", 88), ("Meena", 65)]
          for name, m in sorted(students, key=by_marks):
              print(name, m)
        `],
        hints: [
          md`The error says «by_marks» was called with no student. Find where it has brackets after it.`,
          md`«sorted» must get the function itself, so it can call it once for each student.`,
          md`If the order is now lowest first, the setting for highest first is missing.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: a dictionary instead of elif",
        task: md`
          This program chooses an area function with «if» and «elif». Change it to keep the two functions in a dictionary, «areas», with the keys «"square"» and «"circle"». Look the shape up in the dictionary, and print «Unknown shape» when it is not there. Do not use «elif».

          For «square» and «3» it shows:

          | 9.0
        `,
        starter: py`
          def area_square(side):
              return side * side

          def area_circle(r):
              return round(3.14 * r * r, 2)

          shape = input("Shape: ")
          size = float(input("Size: "))
          if shape == "square":
              print(area_square(size))
          elif shape == "circle":
              print(area_circle(size))
          else:
              print("Unknown shape")
        `,
        solution: py`
          def area_square(side):
              return side * side

          def area_circle(r):
              return round(3.14 * r * r, 2)

          areas = {"square": area_square, "circle": area_circle}
          shape = input("Shape: ")
          size = float(input("Size: "))
          if shape in areas:
              print(areas[shape](size))
          else:
              print("Unknown shape")
        `,
        tests: [
          { inputs: ["square", "3"], output: "9.0" },
          { inputs: ["circle", "2"], output: "12.56" },
          { inputs: ["triangle", "1"], output: "Unknown shape" },
          { avoids: ["kw:elif"] },
          { inputs: ["square", "1"], py: py`
              areas = need("areas", "dict")
              assert set(areas) == {"square", "circle"}, "areas should have the keys square and circle."
            ` },
        ],
        wrong: [py`
          def area_square(side):
              return side * side

          def area_circle(r):
              return round(3.14 * r * r, 2)

          areas = {"square": area_square, "circle": area_circle}
          shape = input("Shape: ")
          size = float(input("Size: "))
          print(areas[shape](size))
        `],
        hints: [
          md`If «triangle» crashes with KeyError, check that the shape is a key before you look it up.`,
          md`If a test says to do it without «elif», the old chain is still there. One lookup replaces it.`,
          md`If you see a TypeError about «float», the brackets that call the function are missing after the lookup.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a GST maker",
        task: md`
          From a blank page, write «make_gst(rate)». It gives back a **function** that takes a price and gives back the price with that percent of GST added, rounded to 2 places.

          Then make three of them, for 5, 12 and 18 percent. Ask for a price, and print one line for each. For «100» it shows:

          | 5%: 105.0
          | 12%: 112.0
          | 18%: 118.0
        `,
        starter: py``,
        solution: py`
          def make_gst(rate):
              def add_gst(price):
                  return round(price + price * rate / 100, 2)
              return add_gst

          price = float(input("Price: "))
          for rate in [5, 12, 18]:
              print(f"{rate}%: {make_gst(rate)(price)}")
        `,
        tests: [
          { inputs: ["100"], output: "5%: 105.0\n12%: 112.0\n18%: 118.0" },
          { inputs: ["250"], output: "5%: 262.5\n12%: 280.0\n18%: 295.0" },
          { inputs: ["1"], py: py`
              f = call("make_gst", 28)
              assert callable(f), "make_gst(28) should give back a function, not a number."
              assert f(100) == 128.0, f"make_gst(28) should give back a function that turns 100 into 128.0, but it gave {f(100)!r}."
              g = call("make_gst", 3)
              assert g(19.99) == 20.59, f"With 3 percent, 19.99 should become 20.59, but it became {g(19.99)!r}."
            ` },
        ],
        wrong: [py`
          def make_gst(rate, price):
              return round(price + price * rate / 100, 2)

          price = float(input("Price: "))
          for rate in [5, 12, 18]:
              print(f"{rate}%: {make_gst(rate, price)}")
        `],
        hints: [
          md`If a test says make_gst should give back a function, it is working out the price itself. Make an inner function and give that back.`,
          md`If a long decimal appears, the inner function does not round to 2 places.`,
          md`If every line shows the same number, each function must remember its own rate.`,
        ],
      },
    ],
    keys: [
      md`A function name without brackets is the function itself. With brackets, it is a call.`,
      md`A parameter can hold a function: «def apply_to_all(func, items):» then «func(x)».`,
      md`A dictionary of functions replaces a long «if»/«elif» chain: «ops[word](a, b)».`,
      md`A function can make and give back a new function, which remembers the values around it.`,
    ],
  });

  // ---------------------------------------------------------------- Day 109
  day({
    slug: "flexible-functions",
    title: "Functions That Take Any Number of Values",
    goal: "Write functions with *args and **kwargs, and call them with * and **.",
    minutes: 45,
    needs: [33, 87],
    win: "Today you can now write functions that take any number of values, by position or by name, and spread a list or dictionary into a call.",
    learn: [
      md`
        ## Any number of values: *args

        On Day 87 you read «def bill(*prices):». Now write one. A star before a parameter collects **all** the extra values into one tuple. Guess the output.
      `,
      ex(py`
        def total(*prices):
            print(prices)
            return sum(prices)

        print(total(10, 20, 30))
        print(total())
      `, { predict: ["(10, 20, 30)\n60\n()\n0", "[10, 20, 30]\n60\n[]\n0", "60\n0"], answer: 0 }),
      md`
        «prices» is a tuple: «(10, 20, 30)» in the first call and «()», an empty tuple, in the second. The name after the star is your choice. Many programmers write «*args», short for arguments.

        ## Any number of named values: **kwargs

        Two stars collect the extra **named** values into a dictionary. The names become the keys. Guess the output.
      `,
      ex(py`
        def order(item, **extras):
            print(item, extras)

        order("chai", sugar=2, size="large")
        order("vada")
      `, { predict: ["chai {'sugar': 2, 'size': 'large'}\nvada {}", "chai (2, 'large')\nvada ()", "TypeError"], answer: 0 }),
      md`
        Many programmers call this one «**kwargs», short for keyword arguments.
      `,
      pause(md`Good place for a break. Next: values that must be named, and spreading a list into a call.`),
      md`
        ## Values that must be named

        A lone «*» in the «def» line means: every parameter after it must be given **by name**. This stops a mix-up when two values could look alike. Guess what happens.
      `,
      ex(py`
        def ticket(name, *, seat="General"):
            return f"{name}: {seat}"

        print(ticket("Asha", seat="AC"))
        print(ticket("Ravi", "AC"))
      `, { error: true, label: "A crash on purpose", predict: ["TypeError", "Asha: AC\nRavi: AC", "Asha: AC\nRavi: General"], answer: 0 }),
      md`
        The first call names the seat, so it prints «Asha: AC». The second gives «"AC"» by position, and Python refuses: «seat» must be named.

        ## Spreading a list or dictionary into a call

        The stars work the other way in a **call**. «*values» spreads a list into separate values, and «**extra» spreads a dictionary into named values. Guess the output.
      `,
      ex(py`
        def bill(price, qty, discount=0):
            return price * qty - discount

        values = [15, 4]
        extra = {"discount": 5}
        print(bill(*values))
        print(bill(*values, **extra))
      `, { predict: ["60\n55", "TypeError", "[15, 4]\n55"], answer: 0 }),
      md`
        «bill(*values)» is the same as «bill(15, 4)». «bill(*values, **extra)» is the same as «bill(15, 4, discount=5)».
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          def count_args(*args, **kwargs):
              return len(args), len(kwargs)

          print(count_args(1, 2, 3, a=4))
        `, options: ["(3, 1)", "(4, 0)", "(1, 3)"], answer: 0,
        explain: md`Three values come by position, into «args». One comes by name, into «kwargs».`,
        why: [null, md`«a=4» is named, so it goes into «kwargs», not «args».`, md`The first number counts the values given by position.`],
        skill: "trace" },
      { q: md`What does this function do?`, code: py`
          def log(message, *values):
              print(message, ", ".join(str(v) for v in values))
        `, options: ["It prints a message, then any number of values joined with commas", "It prints only the first value", "It adds the values up"],
        answer: 0, verify: false, mono: false,
        explain: md`«*values» collects every extra value. The join puts a comma and a space between them.`,
        why: [null, md`The star collects all the extra values, not just one.`, md`Nothing is added. Each value is turned into text and joined.`],
        skill: "read" },
      { q: md`«def avg(*marks): return sum(marks) / len(marks)» crashes when called as «avg()». What is the best fix?`,
        options: ["Give back 0 first when «marks» is empty", "Write «avg(*marks)» in the def line twice", "Change «*marks» to «**marks»"],
        answer: 0, verify: false, mono: false,
        explain: md`With no values, «marks» is an empty tuple and «len» is 0. Check for that before dividing.`,
        why: [null, md`One star in the def line is right. The problem is dividing by zero.`, md`Two stars collect named values into a dictionary, which is not what is needed.`],
        skill: "debug" },
      { q: md`Inside «def f(**kwargs):», what is «kwargs»?`,
        options: ["A dictionary of the named values", "A tuple of all the values", "A list of the names only"], answer: 0, verify: false, mono: false,
        explain: md`Each name becomes a key, and its value becomes the value.`,
        why: [null, md`The tuple comes from one star, «*args».`, md`It keeps the values too, not just the names.`],
        skill: "memory" },
      { q: md`«nums = [3, 5]» and «def power(base, exp):». Which call gives «power» the 3 and the 5?`,
        options: ["«power(*nums)»", "«power(nums)»", "«power(**nums)»"], answer: 0, verify: false,
        explain: md`One star in a call spreads a list into separate values.`,
        why: [null, md`This passes the whole list as «base», and «exp» is missing.`, md`Two stars spread a dictionary, not a list.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: subjects and marks",
        task: md`Answer each question without running the program.`,
        code: py`
          def describe(name, *subjects, **marks):
              count = len(subjects)
              best = max(marks, key=marks.get) if marks else None
              return count, best

          c, b = describe("Asha", "GK", "Maths", GK=72, Maths=88)
          print(c, b)
        `,
        ask: [{ line: 6, name: "c" }, { line: 6, name: "b" }, { output: true }],
        hints: [
          md`«"Asha"» goes to «name». The other values given by position go into «subjects».`,
          md`The named values go into «marks»: GK is 72 and Maths is 88.`,
          md`«max» with «marks.get» as the key gives back the key with the biggest value.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: spread into a call",
        task: md`Answer each question without running the program.`,
        code: py`
          def bill(price, qty, discount=0):
              return price * qty - discount

          order = [12, 5]
          offer = {"discount": 10}
          a = bill(*order)
          b = bill(*order, **offer)
          print(a, b)
        `,
        ask: [{ line: 6, name: "a" }, { line: 7, name: "b" }, { output: true }],
        hints: [
          md`«bill(*order)» is the same as «bill(12, 5)».`,
          md`«**offer» adds «discount=10» to the call.`,
          md`12 times 5 is 60. Take 10 off for the second bill.`,
        ],
      },
      {
        id: "f1", kind: "fill", title: "Fill the gaps: a total of anything",
        task: md`
          Fill the gaps so «total» takes any number of prices, and the last call spreads the list «cart» into it. The program prints:

          | 60 0 80
        `,
        template: py`
          def total(⟦*⟧prices):
              return sum(prices)

          cart = [40, 25, 15]
          print(total(10, 20, 30), total(), total(⟦*⟧cart))
        `,
        tests: [{ output: "60 0 80" }],
        hints: [
          md`If you see a TypeError about too many values, the parameter cannot collect more than one value yet.`,
          md`If you see a TypeError about adding a list, the whole list went in as one value. Spread it in the call.`,
          md`Both gaps are the same single character.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the average of a list",
        task: md`
          The program should print the average of the scores:

          | 80.0

          It stops with a TypeError instead. Tap the line that causes it, then fix it.
        `,
        starter: py`
          def average(*marks):
              return round(sum(marks) / len(marks), 1)

          scores = [70, 80, 90]
          print(average(scores))
        `,
        bugLines: [5],
        solution: py`
          def average(*marks):
              return round(sum(marks) / len(marks), 1)

          scores = [70, 80, 90]
          print(average(*scores))
        `,
        tests: [
          { output: "80.0" },
          { py: py`
              expect("average", (1, 2), 1.5)
              expect("average", (33,), 33.0)
            ` },
        ],
        wrong: [py`
          def average(*marks):
              return round(sum(marks) / len(marks), 1)

          scores = [70, 80, 90]
          print(average(scores[0]))
        `],
        hints: [
          md`The error says a number and a list cannot be added. Inside the function, «marks» holds one item: the whole list.`,
          md`The function wants separate values. The call gives it one list.`,
          md`If the answer is 70.0, only the first score reaches the function. Spread the whole list in the call.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: orders with extras",
        task: md`
          Change «order» so it takes any extra named details, and shows them in brackets after the item, joined with a comma and a space. With no extras, there are no brackets. The program then prints:

          | 2 x chai
          | 3 x vada (chutney=green)
          | 1 x chai (sugar=1, size=large)
        `,
        starter: py`
          def order(item, qty):
              return f"{qty} x {item}"

          print(order("chai", 2))
          print(order("vada", 3, chutney="green"))
          print(order("chai", 1, sugar=1, size="large"))
        `,
        solution: py`
          def order(item, qty, **extras):
              line = f"{qty} x {item}"
              if extras:
                  details = ", ".join(f"{k}={v}" for k, v in extras.items())
                  line += f" ({details})"
              return line

          print(order("chai", 2))
          print(order("vada", 3, chutney="green"))
          print(order("chai", 1, sugar=1, size="large"))
        `,
        tests: [
          { output: "2 x chai\n3 x vada (chutney=green)\n1 x chai (sugar=1, size=large)" },
          { py: py`
              expect("order", ("dosa", 1), "1 x dosa")
            ` },
        ],
        wrong: [py`
          def order(item, qty, **extras):
              details = ", ".join(f"{k}={v}" for k, v in extras.items())
              return f"{qty} x {item} ({details})"

          print(order("chai", 2))
          print(order("vada", 3, chutney="green"))
          print(order("chai", 1, sugar=1, size="large"))
        `],
        hints: [
          md`If you see a TypeError about an unexpected keyword, the def line cannot collect named extras yet.`,
          md`If the first line shows «2 x chai ()», add the brackets only when there are extras.`,
          md`If the details show as a dictionary, build the text from each key and value with an equals sign.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a report for any number of marks",
        task: md`
          From a blank page, write «report(name, *marks, pass_mark=33)». «pass_mark» must be given by name. It gives back one line of text:

          - with no marks: «NAME: no marks»
          - otherwise: the total, the average rounded to 1 decimal place, and how many marks are below the pass mark.

          Then run these lines:

          : print(report("Asha", 72, 28, 90))
          : print(report("Ravi", 45, 50, pass_mark=50))
          : print(report("Om"))

          It should print:

          | Asha: total 190, average 63.3, failed 1
          | Ravi: total 95, average 47.5, failed 1
          | Om: no marks
        `,
        starter: py``,
        solution: py`
          def report(name, *marks, pass_mark=33):
              if not marks:
                  return f"{name}: no marks"
              total = sum(marks)
              average = round(total / len(marks), 1)
              failed = sum(1 for m in marks if m < pass_mark)
              return f"{name}: total {total}, average {average}, failed {failed}"

          print(report("Asha", 72, 28, 90))
          print(report("Ravi", 45, 50, pass_mark=50))
          print(report("Om"))
        `,
        tests: [
          { output: "Asha: total 190, average 63.3, failed 1\nRavi: total 95, average 47.5, failed 1\nOm: no marks" },
          { py: py`
              import inspect
              expect("report", ("Z", 33, 32), "Z: total 65, average 32.5, failed 1")
              got = call("report", "Z", 50, 60, pass_mark=60)
              assert got == "Z: total 110, average 55.0, failed 1", f"report('Z', 50, 60, pass_mark=60) should give 'Z: total 110, average 55.0, failed 1', but gave {got!r}."
              params = inspect.signature(need("report", "function")).parameters
              assert "pass_mark" in params and params["pass_mark"].kind == inspect.Parameter.KEYWORD_ONLY, "pass_mark should come after *marks, so it can only be given by name."
            ` },
        ],
        wrong: [py`
          def report(name, *marks, pass_mark=33):
              total = sum(marks)
              average = round(total / len(marks), 1)
              failed = sum(1 for m in marks if m < pass_mark)
              return f"{name}: total {total}, average {average}, failed {failed}"

          print(report("Asha", 72, 28, 90))
          print(report("Ravi", 45, 50, pass_mark=50))
          print(report("Om"))
        `, py`
          def report(name, *marks, pass_mark=33):
              if not marks:
                  return f"{name}: no marks"
              total = sum(marks)
              average = round(total / len(marks), 1)
              failed = sum(1 for m in marks if m <= pass_mark)
              return f"{name}: total {total}, average {average}, failed {failed}"

          print(report("Asha", 72, 28, 90))
          print(report("Ravi", 45, 50, pass_mark=50))
          print(report("Om"))
        `],
        hints: [
          md`If «report("Om")» crashes with ZeroDivisionError, give back the no-marks line before you divide.`,
          md`If a mark exactly equal to the pass mark counts as failed, the comparison includes the pass mark itself.`,
          md`If a test says pass_mark must be given by name, it has to come after «*marks» in the def line.`,
        ],
      },
    ],
    keys: [
      md`«def f(*args):» collects any number of values into a tuple.`,
      md`«def f(**kwargs):» collects any number of named values into a dictionary.`,
      md`Parameters after a lone «*», or after «*args», must be given by name.`,
      md`In a call, «*a_list» spreads a list into values, and «**a_dict» spreads a dictionary into named values.`,
    ],
  });

  // ---------------------------------------------------------------- Day 110
  day({
    slug: "generators",
    title: "Generators: One Value at a Time",
    goal: "Make values one at a time with yield, so big data never fills the memory.",
    minutes: 45,
    needs: [68, 79],
    win: "Today you can now write a generator with yield, step through it with next, and join generators into a pipeline.",
    learn: [
      md`
        ## yield: give one value, then wait

        A normal function gives back one answer with «return» and ends. A **generator** gives back many values, one at a time, with «yield». After each «yield» it pauses, and it carries on from the same place when the next value is asked for. Guess the output.
      `,
      ex(py`
        def countdown(n):
            while n > 0:
                yield n
                n -= 1

        for x in countdown(3):
            print(x)
        print(list(countdown(4)))
      `, { predict: ["3\n2\n1\n[4, 3, 2, 1]", "3\n[4]", "3\n2\n1\n0\n[4, 3, 2, 1, 0]"], answer: 0 }),
      md`
        A «for» loop asks the generator for one value each round, until it has no more. «list(...)» asks for all of them at once.

        ## A generator runs in steps

        «next(g)» asks for just the next value. Watch exactly when each line runs. Guess the output.
      `,
      ex(py`
        def steps():
            print("start")
            yield 1
            print("middle")
            yield 2

        g = steps()
        print(next(g))
        print(next(g))
      `, { predict: ["start\n1\nmiddle\n2", "1\n2", "start\nmiddle\n1\n2"], answer: 0 }),
      md`
        «g = steps()» runs **no** lines yet: it only makes the generator. Each «next» runs until the next «yield». A third «next(g)» would find no «yield» left and stop with **StopIteration**. Press Step through to watch the jumps.
      `,
      pause(md`Good place for a break. Next: why generators matter, and how they join up.`),
      md`
        ## Why: memory

        A list keeps every value at once. A generator keeps only where it is. A **generator expression** (Day 68) is the short form: round brackets instead of square ones. Guess the output.
      `,
      ex(py`
        import sys

        squares_list = [n * n for n in range(100000)]
        squares_gen = (n * n for n in range(100000))
        print(sys.getsizeof(squares_list) > 100000, sys.getsizeof(squares_gen) < 1000)
        print(sum(squares_gen) == sum(squares_list))
      `, { predict: ["True True\nTrue", "False False\nTrue", "True True\nFalse"], answer: 0 }),
      md`
        «sys.getsizeof» gives the size in memory, in bytes. The list takes hundreds of thousands of bytes; the generator takes a few hundred, however many values it will make. Both add up to the same total.

        ## A pipeline

        One generator can feed another, like pipes joined end to end. Each value flows through all the steps before the next one starts. Guess the output.
      `,
      ex(py`
        def read_marks(lines):
            for line in lines:
                name, mark = line.split(",")
                yield name, int(mark)

        def passed(rows):
            for name, mark in rows:
                if mark >= 33:
                    yield name

        lines = ["Asha,72", "Ravi,28", "Meena,65"]
        print(list(passed(read_marks(lines))))
      `, { predict: ["['Asha', 'Meena']", "['Ravi']", "[('Asha', 72), ('Meena', 65)]"], answer: 0 }),
      md`
        A file works the same way: «for line in f» reads one line at a time. So a pipeline can handle a file far bigger than the memory. One warning: a generator can be used **once**. When it has given all its values, it is empty.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          def evens(limit):
              n = 0
              while n < limit:
                  yield n
                  n += 2

          print(list(evens(7)))
        `, options: ["[0, 2, 4, 6]", "[0, 2, 4, 6, 8]", "[2, 4, 6]"], answer: 0,
        explain: md`It yields 0, 2, 4 and 6. At 8, «8 < 7» is False, so it stops.`,
        why: [null, md`8 is not less than 7, so it is never yielded.`, md`«n» starts at 0, and 0 is yielded first.`],
        skill: "trace" },
      { q: md`What does this function do?`, code: py`
          def numbered(items):
              for i, item in enumerate(items, start=1):
                  yield f"{i}. {item}"
        `, options: ["It gives back numbered lines, one at a time", "It prints a numbered list", "It gives back how many items there are"],
        answer: 0, verify: false, mono: false,
        explain: md`Each «yield» hands out one line like «1. chai». Nothing is printed.`,
        why: [null, md`There is no «print». The caller decides what to do with each line.`, md`It yields text for each item, not a count.`],
        skill: "read" },
      { q: md`«g = (x * 2 for x in [1, 2, 3])», then «print(sum(g))» twice. It shows 12, then 0. Why?`,
        options: ["A generator can be used only once, and the first sum used it up", "sum changes the list", "The second line divides by zero"],
        answer: 0, verify: false, mono: false,
        explain: md`After giving all its values, a generator is empty. Make a list if you need the values twice.`,
        why: [null, md`«sum» changes nothing. The generator is simply finished.`, md`Nothing is divided. An empty generator adds up to 0.`],
        skill: "debug" },
      { q: md`What happens when «next(g)» is called and the generator has no values left?`,
        options: ["It stops with StopIteration", "It gives back None", "It starts again from the top"], answer: 0, verify: false, mono: false,
        explain: md`A «for» loop catches StopIteration for you and simply ends. A bare «next» shows it.`,
        why: [null, md`It does not give back None. It signals that it is finished.`, md`A used-up generator never starts again. Make a new one by calling the function again.`],
        skill: "memory" },
      { q: md`You need the total of the squares of 1 to 1,00,00,000 (one crore), without keeping them all in memory. Which do you use?`,
        options: ["«sum(n * n for n in range(1, 10_000_001))»", "«sum([n * n for n in range(1, 10_000_001)])»", "«a loop that appends every square to a list, then sum»"], answer: 0, verify: false,
        explain: md`The generator expression makes one square at a time, and «sum» adds each one as it comes.`,
        why: [null, md`The square brackets build a list of one crore numbers first.`, md`Appending keeps all one crore numbers in memory.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: used up",
        task: md`Answer each question without running the program.`,
        code: py`
          def gen():
              yield "a"
              yield "b"
              yield "c"

          g = gen()
          first = next(g)
          rest = list(g)
          print(first, rest, list(g))
        `,
        ask: [{ line: 7, name: "first" }, { line: 8, name: "rest" }, { output: true }],
        hints: [
          md`«next» takes only the first value.`,
          md`«list(g)» takes every value that is left.`,
          md`After that the generator is empty, so a second «list(g)» is an empty list.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: a two-step pipeline",
        task: md`Answer each question without running the program.`,
        code: py`
          def read(lines):
              for line in lines:
                  yield int(line)

          def big(nums):
              for n in nums:
                  if n > 10:
                      yield n

          data = ["5", "12", "30", "8"]
          total = 0
          for n in big(read(data)):
              total += n
          print(total)
        `,
        ask: [{ line: 13, hit: 1, name: "n" }, { output: true }],
        hints: [
          md`«read» turns each line into a number. «big» lets only numbers above 10 through.`,
          md`5 is not above 10, so the first number to reach line 13 is 12.`,
          md`Only 12 and 30 get through. Add them.`,
        ],
      },
      {
        id: "p1", kind: "parsons", indent: "choose", title: "Arrange: a countdown generator",
        task: md`
          Put the lines in order and set each indent. The generator gives the numbers from «n» down to 1. The program prints:

          | [3, 2, 1]
        `,
        solution: py`
          def countdown(n):
              while n > 0:
                  yield n
                  n -= 1
          print(list(countdown(3)))
        `,
        distractors: ["        return n"],
        tests: [{ output: "[3, 2, 1]" }],
        hints: [
          md`If you see an error about an int, the function gives back one number with return instead of yielding many.`,
          md`If the program never ends, the line that makes «n» smaller is not inside the loop.`,
          md`If only one number appears, the yield line is outside the loop.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the highest of nothing",
        task: md`
          The program should print the total and the highest score:

          | Total: 221
          | Highest: 85

          It prints the total, then stops with ValueError. Tap the line that causes it, then fix it.
        `,
        starter: py`
          def scores():
              for s in [72, 85, 64]:
                  yield s

          marks = scores()
          print("Total:", sum(marks))
          print("Highest:", max(marks))
        `,
        bugLines: [5],
        solution: py`
          def scores():
              for s in [72, 85, 64]:
                  yield s

          marks = list(scores())
          print("Total:", sum(marks))
          print("Highest:", max(marks))
        `,
        tests: [{ output: "Total: 221\nHighest: 85" }],
        wrong: [py`
          def scores():
              for s in [72, 85, 64]:
                  yield s

          marks = scores
          print("Total:", sum(marks))
          print("Highest:", max(marks))
        `],
        hints: [
          md`The error says «max» got an empty sequence. The scores were all there for «sum». What happened to them?`,
          md`A generator can be used once. «sum» used it up, so «max» finds nothing left.`,
          md`Keep the values in a list, so both lines can read them.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: squares on demand",
        task: md`
          «squares» builds a whole list, then gives it back. Change it into a generator: no list inside, and «yield» each square. The program still prints:

          | 385
        `,
        starter: py`
          def squares(limit):
              result = []
              for n in range(1, limit + 1):
                  result.append(n * n)
              return result

          print(sum(squares(10)))
        `,
        solution: py`
          def squares(limit):
              for n in range(1, limit + 1):
                  yield n * n

          print(sum(squares(10)))
        `,
        tests: [
          { output: "385" },
          { py: py`
              import inspect
              assert inspect.isgeneratorfunction(need("squares", "function")), "squares should yield each square, so it becomes a generator."
              assert list(call("squares", 3)) == [1, 4, 9], "squares(3) should give 1, 4 and 9."
            ` },
        ],
        wrong: [py`
          def squares(limit):
              result = []
              for n in range(1, limit + 1):
                  result.append(n * n)
              yield result

          print(sum(squares(10)))
        `],
        hints: [
          md`If a test says squares should yield each square, there is no «yield» yet.`,
          md`If you see a TypeError about adding a list, the whole list is yielded once. Yield one square each round.`,
          md`If the total is only 100, the yield is outside the loop.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: only the good lines",
        task: md`
          From a blank page, write a generator «clean_marks(lines)». For each line like «"Asha,72"», it yields the pair «("Asha", 72)», with the mark as a whole number. It skips a bad line: one with no comma, or a mark that is not a whole number.

          Then ask for entries on one line, separated by «;». Print each good name and mark, then how many were good. For «Asha,72;Ravi,abc;Meena,65;bad» it shows:

          | Asha 72
          | Meena 65
          | Good: 2
        `,
        starter: py``,
        solution: py`
          def clean_marks(lines):
              for line in lines:
                  try:
                      name, mark = line.split(",")
                      mark = int(mark)
                  except ValueError:
                      continue
                  yield name, mark

          entries = input("Entries: ").split(";")
          count = 0
          for name, mark in clean_marks(entries):
              print(name, mark)
              count += 1
          print("Good:", count)
        `,
        tests: [
          { inputs: ["Asha,72;Ravi,abc;Meena,65;bad"], output: "Asha 72\nMeena 65\nGood: 2" },
          { inputs: ["x"], output: "Good: 0" },
          { inputs: ["Om,0;Dev,100"], output: "Om 0\nDev 100\nGood: 2" },
          { inputs: ["A,1"], py: py`
              import inspect
              assert inspect.isgeneratorfunction(need("clean_marks", "function")), "clean_marks should be a generator, with yield."
              got = list(call("clean_marks", ["A,1", "B,x", "C", "D,2,3", "E,5"]))
              assert got == [("A", 1), ("E", 5)], f"For A,1  B,x  C  D,2,3  E,5 it should yield ('A', 1) and ('E', 5), but it gave {got}."
            ` },
        ],
        wrong: [py`
          def clean_marks(lines):
              for line in lines:
                  name, mark = line.split(",")
                  yield name, int(mark)

          entries = input("Entries: ").split(";")
          count = 0
          for name, mark in clean_marks(entries):
              print(name, mark)
              count += 1
          print("Good:", count)
        `, py`
          def clean_marks(lines):
              good = []
              for line in lines:
                  try:
                      name, mark = line.split(",")
                      good.append((name, int(mark)))
                  except ValueError:
                      continue
              return good

          entries = input("Entries: ").split(";")
          count = 0
          for name, mark in clean_marks(entries):
              print(name, mark)
              count += 1
          print("Good:", count)
        `],
        hints: [
          md`If a bad line stops the program with ValueError, the splitting and the change to a number need «try» around them.`,
          md`If a test says clean_marks should be a generator, it builds and gives back a list. Yield each good pair instead.`,
          md`If «D,2,3» crashes, remember that a line with two commas cannot be unpacked into two names: that is a ValueError too.`,
        ],
      },
    ],
    keys: [
      md`A **generator** function uses «yield». It gives values one at a time and pauses in between.`,
      md`Calling it runs nothing yet. Each «next» runs to the next «yield»; at the end comes StopIteration.`,
      md`A generator keeps only where it is, so it needs almost no memory. Round brackets make a generator expression.`,
      md`Generators can feed each other in a pipeline. Each one can be used only once.`,
    ],
  });

  // ---------------------------------------------------------------- Day 111
  day({
    slug: "itertools-choices",
    title: "Counting Choices with itertools",
    goal: "Count and list every pair, choice and order with itertools.",
    minutes: 45,
    needs: [20, 76],
    win: "Today you can now list every pair, every order and every pairing with itertools, and keep a running total in one line.",
    learn: [
      md`
        ## combinations: choices where order does not matter

        The «itertools» module makes every possible choice for you. «combinations(items, 2)» gives every pair, each pair once, with no repeats. «(GK, Maths)» and «(Maths, GK)» count as the same pair. Guess the output.
      `,
      ex(py`
        from itertools import combinations

        subjects = ["GK", "Maths", "English", "Reasoning"]
        pairs = list(combinations(subjects, 2))
        print(len(pairs))
        print(pairs[0], pairs[-1])
      `, { predict: ["6\n('GK', 'Maths') ('English', 'Reasoning')", "12\n('GK', 'Maths') ('Reasoning', 'English')", "4\n('GK', 'GK') ('Reasoning', 'Reasoning')"], answer: 0 }),
      md`
        Each item is paired with every item **after** it, so the pairs keep the list order. You meet these counts in the SSC reasoning paper too: 4 things taken 2 at a time make 6.

        ## permutations: when order matters

        «permutations» gives every **order**. Now «AB» and «BA» are different. Guess the output.
      `,
      ex(py`
        from itertools import permutations

        for order in permutations(["A", "B", "C"]):
            print("".join(order))
      `, { predict: ["ABC\nACB\nBAC\nBCA\nCAB\nCBA", "ABC\nBCA\nCAB", "ABC"], answer: 0 }),
      md`
        3 things can be put in 3 × 2 × 1 = 6 orders. To count without listing, «math.comb(5, 2)» counts choices and «math.perm(5, 2)» counts orders.
      `,
      pause(md`Good place for a break. Next: every pairing, and running totals.`),
      md`
        ## product: every pairing

        «product(a, b)» pairs every item of «a» with every item of «b». It does the work of a loop inside a loop (Day 20). Guess the output.
      `,
      ex(py`
        from itertools import product

        for size, drink in product(["small", "large"], ["chai", "coffee"]):
            print(size, drink)
      `, { predict: ["small chai\nsmall coffee\nlarge chai\nlarge coffee", "small chai\nlarge coffee", "small large\nchai coffee"], answer: 0 }),
      md`
        ## accumulate and chain

        «accumulate» gives a **running total**: each number added to all the ones before it. «chain» walks through several lists as if they were one. Guess the output.
      `,
      ex(py`
        from itertools import accumulate, chain

        daily = [30, 45, 20, 60]
        print(list(accumulate(daily)))
        print(list(chain([1, 2], [3], [4, 5])))
      `, { predict: ["[30, 75, 95, 155]\n[1, 2, 3, 4, 5]", "155\n[[1, 2], [3], [4, 5]]", "[30, 45, 20, 60]\n[1, 2, 3, 4, 5]"], answer: 0 }),
      md`
        Like generators (Day 110), these tools give their values one at a time. That is why we wrap them in «list(...)» to see everything at once.
      `,
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          from itertools import combinations

          print(len(list(combinations(range(5), 3))))
        `, options: ["10", "60", "15"], answer: 0,
        explain: md`5 things taken 3 at a time, with no order: 10 choices.`,
        why: [null, md`60 counts every order. That is permutations, not combinations.`, md`Count again: there are 10 ways to choose 3 of 5.`],
        skill: "trace" },
      { q: md`What does this line make?`, code: py`
          from itertools import product

          codes = ["".join(p) for p in product("AB", "12")]
        `, options: ["Every code of one letter from A, B and one digit from 1, 2", "Only the codes A1 and B2", "The codes AB and 12"],
        answer: 0, verify: false, mono: false,
        explain: md`«product» pairs each letter with each digit: A1, A2, B1 and B2.`,
        why: [null, md`That is what «zip» would make. «product» makes every pairing.`, md`«product» pairs one item from each group, not the groups themselves.`],
        skill: "read" },
      { q: md`Ravi wants every way to choose 2 players out of 4 for a doubles pair. He gets 12, with each pair twice, like (Asha, Om) and (Om, Asha). What did he use?`,
        options: ["«permutations», where «combinations» was needed", "«product», where «zip» was needed", "«accumulate», where «chain» was needed"],
        answer: 0, verify: false, mono: false,
        explain: md`A pair has no order, so use combinations: 6 pairs.`,
        why: [null, md`«product» of two lists pairs every item with every item, including a player with themself.`, md`Neither of these makes pairs.`],
        skill: "debug" },
      { q: md`What does «list(accumulate([1, 2, 3]))» give?`,
        options: ["[1, 3, 6]", "[6]", "[1, 2, 3]"], answer: 0, verify: false,
        explain: md`It is a running total: 1, then 1 + 2, then 1 + 2 + 3.`,
        why: [null, md`That is «sum». «accumulate» gives every step on the way.`, md`It adds as it goes, so the numbers grow.`],
        skill: "memory" },
      { q: md`You want every possible order in which to sit 4 exam papers. Which do you use?`,
        options: ["«permutations(papers)»", "«combinations(papers, 2)»", "«product(papers, papers)»"], answer: 0, verify: false,
        explain: md`An order is a permutation: 4 × 3 × 2 × 1 = 24 orders.`,
        why: [null, md`This chooses pairs of papers, with no order.`, md`This pairs every paper with every paper, and can repeat one.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: a pair that makes 60",
        task: md`Answer each question without running the program.`,
        code: py`
          from itertools import combinations

          marks = [40, 25, 35, 10]
          best = None
          for a, b in combinations(marks, 2):
              if a + b == 60:
                  best = (a, b)
                  break
          print(best, len(list(combinations(marks, 2))))
        `,
        ask: [{ line: 6, hit: 4, name: "a" }, { output: true }],
        hints: [
          md`The pairs come in list order: 40 with each later mark, then 25 with each later mark, and so on.`,
          md`The fourth pair is the first one that starts with 25.`,
          md`25 + 35 is 60, so the loop stops there. 4 marks make 6 pairs in all.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: runs over by over",
        task: md`Answer each question without running the program.`,
        code: py`
          from itertools import accumulate

          runs = [4, 0, 6, 1]
          totals = list(accumulate(runs))
          over = max(totals)
          print(totals, over)
        `,
        ask: [{ line: 4, name: "totals" }, { output: true }],
        hints: [
          md`Each number in «totals» is the runs so far.`,
          md`4, then 4 + 0, then 4 + 6, then 10 + 1.`,
          md`A running total of runs never goes down, so the biggest is the last.`,
        ],
      },
      {
        id: "p1", kind: "parsons", indent: "choose", title: "Arrange: every size and flavour",
        task: md`
          Put the lines in order and set each indent. The program prints every size with every flavour of lassi:

          | S mango
          | S rose
          | L mango
          | L rose
        `,
        solution: py`
          from itertools import product
          sizes = ["S", "L"]
          flavours = ["mango", "rose"]
          for s, f in product(sizes, flavours):
              print(s, f)
        `,
        distractors: ["for s, f in zip(sizes, flavours):"],
        tests: [{ output: "S mango\nS rose\nL mango\nL rose" }],
        hints: [
          md`If only two lines appear, the loop pairs first with first and second with second. Every pairing needs product.`,
          md`If you see a NameError, a list is used before the line that makes it.`,
          md`If only the last line prints, the print is not inside the loop.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: pairs of players",
        task: md`
          The program lists every pair of players. For «Asha Ravi Om» it should print:

          | Pairs: 3
          | Asha + Ravi
          | Asha + Om
          | Ravi + Om

          It stops with ValueError instead. Tap the line that causes it, then fix it.
        `,
        starter: py`
          from itertools import combinations

          team = input("Players: ").split()
          pairs = list(combinations(team, 3))
          print("Pairs:", len(pairs))
          for a, b in pairs:
              print(a, "+", b)
        `,
        bugLines: [4],
        solution: py`
          from itertools import combinations

          team = input("Players: ").split()
          pairs = list(combinations(team, 2))
          print("Pairs:", len(pairs))
          for a, b in pairs:
              print(a, "+", b)
        `,
        tests: [
          { inputs: ["Asha Ravi Om"], output: "Pairs: 3\nAsha + Ravi\nAsha + Om\nRavi + Om" },
          { inputs: ["A B"], output: "Pairs: 1\nA + B" },
          { inputs: ["A B C D"], output: "Pairs: 6\nA + B\nA + C\nA + D\nB + C\nB + D\nC + D" },
        ],
        wrong: [py`
          from itertools import permutations

          team = input("Players: ").split()
          pairs = list(permutations(team, 2))
          print("Pairs:", len(pairs))
          for a, b in pairs:
              print(a, "+", b)
        `],
        hints: [
          md`The error says there are too many values to unpack. Each item in «pairs» has more than two names.`,
          md`The second value in the combinations call is the size of each group.`,
          md`If each pair now appears twice, the order is being counted. A pair has no order.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: a running total in one line",
        task: md`
          This program builds a running total of study minutes with a loop. Change it to use «accumulate» from «itertools» instead. The output stays the same:

          | [30, 75, 95, 155]
        `,
        starter: py`
          days = [30, 45, 20, 60]
          running = []
          total = 0
          for d in days:
              total += d
              running.append(total)
          print(running)
        `,
        solution: py`
          from itertools import accumulate

          days = [30, 45, 20, 60]
          running = list(accumulate(days))
          print(running)
        `,
        tests: [
          { output: "[30, 75, 95, 155]" },
          { uses: ["call:accumulate"] },
        ],
        wrong: [py`
          from itertools import accumulate

          days = [30, 45, 20, 60]
          running = accumulate(days)
          print(running)
        `],
        hints: [
          md`If a test says to use accumulate, the loop is still doing the adding.`,
          md`If you see «<itertools.accumulate object ...>», wrap it in «list(...)» to get every value.`,
          md`If you see a NameError for accumulate, it must be imported from itertools first.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: two snacks within budget",
        task: md`
          From a blank page. Ask for snacks on one line, each as «name:price», then for a budget. Print every **pair** of snacks whose prices add up to the budget or less, in the order «combinations» gives them, like «chai + samosa = 35». Then print how many pairs there were.

          For «chai:15 samosa:20 vada:25 lassi:40» and «45» it shows:

          | chai + samosa = 35
          | chai + vada = 40
          | samosa + vada = 45
          | Pairs: 3
        `,
        starter: py``,
        solution: py`
          from itertools import combinations

          snacks = []
          for part in input("Snacks: ").split():
              name, price = part.split(":")
              snacks.append((name, int(price)))
          budget = int(input("Budget: "))
          count = 0
          for (a, pa), (b, pb) in combinations(snacks, 2):
              if pa + pb <= budget:
                  print(f"{a} + {b} = {pa + pb}")
                  count += 1
          print("Pairs:", count)
        `,
        tests: [
          { inputs: ["chai:15 samosa:20 vada:25 lassi:40", "45"], output: "chai + samosa = 35\nchai + vada = 40\nsamosa + vada = 45\nPairs: 3" },
          { inputs: ["chai:15 lassi:40", "50"], output: "Pairs: 0" },
          { inputs: ["a:1 b:2 c:3", "100"], output: "a + b = 3\na + c = 4\nb + c = 5\nPairs: 3" },
          { inputs: ["x:10", "100"], output: "Pairs: 0" },
        ],
        wrong: [py`
          from itertools import combinations

          snacks = []
          for part in input("Snacks: ").split():
              name, price = part.split(":")
              snacks.append((name, int(price)))
          budget = int(input("Budget: "))
          count = 0
          for (a, pa), (b, pb) in combinations(snacks, 2):
              if pa + pb < budget:
                  print(f"{a} + {b} = {pa + pb}")
                  count += 1
          print("Pairs:", count)
        `, py`
          from itertools import permutations

          snacks = []
          for part in input("Snacks: ").split():
              name, price = part.split(":")
              snacks.append((name, int(price)))
          budget = int(input("Budget: "))
          count = 0
          for (a, pa), (b, pb) in permutations(snacks, 2):
              if pa + pb <= budget:
                  print(f"{a} + {b} = {pa + pb}")
                  count += 1
          print("Pairs:", count)
        `],
        hints: [
          md`If a pair that costs exactly the budget is missing, the check leaves out the budget itself.`,
          md`If each pair appears twice, once each way round, the order is being counted.`,
          md`If you see a TypeError about adding text, the prices are still text. Change each into a whole number when you read it.`,
        ],
      },
    ],
    keys: [
      md`«combinations(items, k)» gives every choice of k items, with no order.`,
      md`«permutations(items)» gives every order. «math.comb» and «math.perm» count them without listing.`,
      md`«product(a, b)» pairs every item of a with every item of b, like a loop inside a loop.`,
      md`«accumulate» gives a running total; «chain» walks several lists as one.`,
    ],
  });

  // ---------------------------------------------------------------- Day 112
  day({
    slug: "seating-planner",
    title: "Project: Exam Hall Seating Planner",
    goal: "Seat candidates in an exam hall fairly, with no two from one centre side by side.",
    minutes: 50,
    kind: "project",
    needs: [61, 106, 107],
    win: "Today you can now build a seating planner from namedtuples, a defaultdict and a deque, and prove it with your own tests.",
    learn: [
      md`
        ## The brief

        An exam hall has rows of seats. Candidates come from different coaching centres. Friends from one centre should **not** sit side by side. So the planner seats them one from each centre in turn: Pune, Delhi, Agra, then Pune again, and so on.

        Each candidate is a namedtuple with a roll number, a name and a centre (Day 107). The planner groups them by centre with a defaultdict (Day 106), and takes one from each group in turn with a deque. Guess the output of the turn-taking part.
      `,
      ex(py`
        from collections import deque

        queues = deque([deque(["P1", "P2", "P3"]), deque(["D1"]), deque(["A1", "A2"])])
        order = []
        while queues:
            q = queues.popleft()
            order.append(q.popleft())
            if q:
                queues.append(q)
        print(order)
      `, { predict: ["['P1', 'D1', 'A1', 'P2', 'A2', 'P3']", "['P1', 'P2', 'P3', 'D1', 'A1', 'A2']", "['P1', 'D1', 'A1']"], answer: 0 }),
      md`
        The outer deque holds one queue per centre. Each round takes the first centre's queue, seats its first person, and puts the queue back at the end if anyone is left in it. An empty queue is simply not put back.

        ## Five stages

        Stage 1 reads the candidates. Stage 2 groups them by centre. Stage 3 builds the seat order, taking turns. Stage 4 fills the rows and counts any clashes: two side by side from one centre. In Stage 5 you write tests that must catch 4 broken planners. All names, rolls and centres are invented.
      `,
      pause(md`This project usually takes two sittings. Each stage saves when you pass it, so stop after any stage.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          order = [1, 2, 3, 4, 5]
          print([order[i:i + 2] for i in range(0, len(order), 2)])
        `, options: ["[[1, 2], [3, 4], [5]]", "[[1, 2], [3, 4]]", "[[1, 2, 3], [4, 5]]"], answer: 0,
        explain: md`«i» goes 0, 2, 4. The last slice, «order[4:6]», holds only 5.`,
        why: [null, md`«range» reaches 4, so the last person gets a row of their own.`, md`Each slice is 2 long, because the step and the slice size are both 2.`],
        skill: "trace" },
      { q: md`What does this function do?`, code: py`
          def clashes(plan):
              count = 0
              for row in plan:
                  for left, right in zip(row, row[1:]):
                      if left.centre == right.centre:
                          count += 1
              return count
        `, options: ["It counts side-by-side pairs in a row that come from the same centre", "It counts the candidates from each centre", "It counts the rows that are full"],
        answer: 0, verify: false, mono: false,
        explain: md`«zip(row, row[1:])» pairs each seat with the seat on its right. Same centre means a clash.`,
        why: [null, md`It compares neighbours, not totals per centre.`, md`It never looks at how many seats a row has.`],
        skill: "read" },
      { q: md`With 5 candidates and 4 seats a row, the plan loses the fifth candidate. Which line is the most likely mistake?`,
        options: ["«range(0, len(order) - 1, per_row)»", "«order[i:i + per_row]»", "«return [ ... ]»"], answer: 0, verify: false,
        explain: md`With a stop of 4, «range» never reaches 4, so the second row is never made. The stop must be «len(order)».`,
        why: [null, md`That slice is right: it takes one row's worth.`, md`Giving back the list is right. A row is missing from it.`],
        skill: "debug" },
      { q: md`«c = Candidate(101, "Asha", "Pune")». Which two give «"Pune"»?`,
        options: ["«c.centre» and «c[2]»", "«c.centre» and «c[3]»", '«c["centre"]» and «c[2]»'], answer: 0, verify: false,
        explain: md`A namedtuple can be read by field name or by position, counting from 0.`,
        why: [null, md`There are three fields, at positions 0, 1 and 2.`, md`Square brackets with a name work on a dictionary, not on a namedtuple.`],
        skill: "memory" },
      { q: md`Which tool takes one candidate from each centre in turn, and puts a centre back at the end while it still has people?`,
        options: ["«a deque of queues»", "«a set of centres»", "«sorted(cands)»"], answer: 0, verify: false, mono: false,
        explain: md`«popleft» takes the next centre, and «append» puts it back at the end.`,
        why: [null, md`A set has no order, so there are no turns.`, md`Sorting puts all of one centre together, which is the opposite of what is needed.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "s1", stage: 1, title: "Stage 1: read the candidates",
        task: md`
          Finish «read_candidates(lines)». Each line looks like «"101,Asha,Pune"». Skip a blank line. For every other line, add a «Candidate» with the roll number as a **whole number**. The program should print:

          | 6 Candidate(roll=101, name='Asha', centre='Pune')
        `,
        starter: py`
          from collections import namedtuple, defaultdict, deque

          Candidate = namedtuple("Candidate", ["roll", "name", "centre"])


          def read_candidates(lines):
              # in: lines like "101,Asha,Pune"; blank lines are skipped
              # out: a list of Candidate records, with the roll number as a whole number
              pass


          lines = ["101,Asha,Pune", "102,Ravi,Pune", "103,Meena,Pune", "201,Om,Delhi", "202,Zoya,Delhi", "301,Dev,Agra"]
          cands = read_candidates(lines)
          print(len(cands), cands[0])
        `,
        solution: py`
          from collections import namedtuple, defaultdict, deque

          Candidate = namedtuple("Candidate", ["roll", "name", "centre"])


          def read_candidates(lines):
              # in: lines like "101,Asha,Pune"; blank lines are skipped
              # out: a list of Candidate records, with the roll number as a whole number
              cands = []
              for line in lines:
                  if not line.strip():
                      continue
                  roll, name, centre = line.strip().split(",")
                  cands.append(Candidate(int(roll), name, centre))
              return cands


          lines = ["101,Asha,Pune", "102,Ravi,Pune", "103,Meena,Pune", "201,Om,Delhi", "202,Zoya,Delhi", "301,Dev,Agra"]
          cands = read_candidates(lines)
          print(len(cands), cands[0])
        `,
        tests: [
          { output: "6 Candidate(roll=101, name='Asha', centre='Pune')" },
          { py: py`
              got = call("read_candidates", ["7,A,X", "", "   ", "8,B,Y"])
              assert [tuple(c) for c in got] == [(7, "A", "X"), (8, "B", "Y")], f"For the lines 7,A,X and 8,B,Y with blank lines between, it should give two candidates, but gave {got!r}."
              assert hasattr(got[0], "centre"), "Each item should be a Candidate, so it has a centre field."
            ` },
        ],
        wrong: [py`
          from collections import namedtuple, defaultdict, deque

          Candidate = namedtuple("Candidate", ["roll", "name", "centre"])


          def read_candidates(lines):
              # in: lines like "101,Asha,Pune"; blank lines are skipped
              # out: a list of Candidate records, with the roll number as a whole number
              cands = []
              for line in lines:
                  if not line.strip():
                      continue
                  roll, name, centre = line.strip().split(",")
                  cands.append(Candidate(roll, name, centre))
              return cands


          lines = ["101,Asha,Pune", "102,Ravi,Pune", "103,Meena,Pune", "201,Om,Delhi", "202,Zoya,Delhi", "301,Dev,Agra"]
          cands = read_candidates(lines)
          print(len(cands), cands[0])
        `],
        hints: [
          md`If the roll shows in quotes, like «roll='101'», it is still text. Change it into a whole number.`,
          md`If a blank line crashes with ValueError, skip any line that is empty after removing spaces.`,
          md`If you see a TypeError about NoneType, the function does not give back the list yet.`,
        ],
      },
      {
        id: "s2", stage: 2, carry: "s1", title: "Stage 2: group by centre",
        task: md`
          Add «group_by_centre(cands)». It gives back a dictionary from each centre to the list of its candidates, with the centres in the order they first appear. Use a defaultdict. Then add these lines at the end:

          : groups = group_by_centre(cands)
          : for centre, people in groups.items():
          :     print(centre, [c.roll for c in people])

          The program then prints:

          | 6 Candidate(roll=101, name='Asha', centre='Pune')
          | Pune [101, 102, 103]
          | Delhi [201, 202]
          | Agra [301]
        `,
        starter: py`
          from collections import namedtuple, defaultdict, deque

          Candidate = namedtuple("Candidate", ["roll", "name", "centre"])


          def read_candidates(lines):
              # in: lines like "101,Asha,Pune"; blank lines are skipped
              # out: a list of Candidate records, with the roll number as a whole number
              cands = []
              for line in lines:
                  if not line.strip():
                      continue
                  roll, name, centre = line.strip().split(",")
                  cands.append(Candidate(int(roll), name, centre))
              return cands


          lines = ["101,Asha,Pune", "102,Ravi,Pune", "103,Meena,Pune", "201,Om,Delhi", "202,Zoya,Delhi", "301,Dev,Agra"]
          cands = read_candidates(lines)
          print(len(cands), cands[0])
        `,
        solution: py`
          from collections import namedtuple, defaultdict, deque

          Candidate = namedtuple("Candidate", ["roll", "name", "centre"])


          def read_candidates(lines):
              # in: lines like "101,Asha,Pune"; blank lines are skipped
              # out: a list of Candidate records, with the roll number as a whole number
              cands = []
              for line in lines:
                  if not line.strip():
                      continue
                  roll, name, centre = line.strip().split(",")
                  cands.append(Candidate(int(roll), name, centre))
              return cands


          def group_by_centre(cands):
              # in: a list of candidates
              # out: centre -> list of its candidates, centres in the order first seen
              groups = defaultdict(list)
              for c in cands:
                  groups[c.centre].append(c)
              return groups


          lines = ["101,Asha,Pune", "102,Ravi,Pune", "103,Meena,Pune", "201,Om,Delhi", "202,Zoya,Delhi", "301,Dev,Agra"]
          cands = read_candidates(lines)
          print(len(cands), cands[0])

          groups = group_by_centre(cands)
          for centre, people in groups.items():
              print(centre, [c.roll for c in people])
        `,
        tests: [
          { output: "6 Candidate(roll=101, name='Asha', centre='Pune')\nPune [101, 102, 103]\nDelhi [201, 202]\nAgra [301]" },
          { py: py`
              C = need("Candidate")
              got = call("group_by_centre", [C(1, "a", "X"), C(2, "b", "Y"), C(3, "c", "X")])
              assert list(got) == ["X", "Y"], f"The centres should be X, then Y, in the order first seen, but they are {list(got)}."
              assert [c.roll for c in got["X"]] == [1, 3], "Centre X should hold the candidates with rolls 1 and 3."
            ` },
        ],
        wrong: [py`
          from collections import namedtuple, defaultdict, deque

          Candidate = namedtuple("Candidate", ["roll", "name", "centre"])


          def read_candidates(lines):
              # in: lines like "101,Asha,Pune"; blank lines are skipped
              # out: a list of Candidate records, with the roll number as a whole number
              cands = []
              for line in lines:
                  if not line.strip():
                      continue
                  roll, name, centre = line.strip().split(",")
                  cands.append(Candidate(int(roll), name, centre))
              return cands


          def group_by_centre(cands):
              # in: a list of candidates
              # out: centre -> list of its candidates, centres in the order first seen
              groups = defaultdict(list)
              for c in cands:
                  groups[c.centre].append(c)
              return dict(sorted(groups.items()))


          lines = ["101,Asha,Pune", "102,Ravi,Pune", "103,Meena,Pune", "201,Om,Delhi", "202,Zoya,Delhi", "301,Dev,Agra"]
          cands = read_candidates(lines)
          print(len(cands), cands[0])

          groups = group_by_centre(cands)
          for centre, people in groups.items():
              print(centre, [c.roll for c in people])
        `],
        hints: [
          md`If Agra comes first, the centres were put in A to Z order. Keep the order they first appear.`,
          md`If you see KeyError, the dictionary does not make an empty list for a new centre.`,
          md`If each centre shows only one roll, a new list is made every time instead of adding to the old one.`,
        ],
      },
      {
        id: "s3", stage: 3, carry: "s2", title: "Stage 3: one from each centre in turn",
        task: md`
          Add «seat_order(cands)». It gives back the candidates in seat order: one from each centre in turn. The centres take turns in the order first seen, and each centre keeps its own candidates in order. A centre with nobody left drops out. Use a deque of queues, as in the lesson. Then add this line at the end:

          : print([c.roll for c in seat_order(cands)])

          The last line printed is:

          | [101, 201, 301, 102, 202, 103]
        `,
        starter: py`
          from collections import namedtuple, defaultdict, deque

          Candidate = namedtuple("Candidate", ["roll", "name", "centre"])


          def read_candidates(lines):
              # in: lines like "101,Asha,Pune"; blank lines are skipped
              # out: a list of Candidate records, with the roll number as a whole number
              cands = []
              for line in lines:
                  if not line.strip():
                      continue
                  roll, name, centre = line.strip().split(",")
                  cands.append(Candidate(int(roll), name, centre))
              return cands


          def group_by_centre(cands):
              # in: a list of candidates
              # out: centre -> list of its candidates, centres in the order first seen
              groups = defaultdict(list)
              for c in cands:
                  groups[c.centre].append(c)
              return groups


          lines = ["101,Asha,Pune", "102,Ravi,Pune", "103,Meena,Pune", "201,Om,Delhi", "202,Zoya,Delhi", "301,Dev,Agra"]
          cands = read_candidates(lines)
          print(len(cands), cands[0])

          groups = group_by_centre(cands)
          for centre, people in groups.items():
              print(centre, [c.roll for c in people])
        `,
        solution: py`
          from collections import namedtuple, defaultdict, deque

          Candidate = namedtuple("Candidate", ["roll", "name", "centre"])


          def read_candidates(lines):
              # in: lines like "101,Asha,Pune"; blank lines are skipped
              # out: a list of Candidate records, with the roll number as a whole number
              cands = []
              for line in lines:
                  if not line.strip():
                      continue
                  roll, name, centre = line.strip().split(",")
                  cands.append(Candidate(int(roll), name, centre))
              return cands


          def group_by_centre(cands):
              # in: a list of candidates
              # out: centre -> list of its candidates, centres in the order first seen
              groups = defaultdict(list)
              for c in cands:
                  groups[c.centre].append(c)
              return groups


          def seat_order(cands):
              # in: a list of candidates
              # out: the same candidates, taking one from each centre in turn
              queues = deque(deque(group) for group in group_by_centre(cands).values())
              order = []
              while queues:
                  q = queues.popleft()
                  order.append(q.popleft())
                  if q:
                      queues.append(q)
              return order


          lines = ["101,Asha,Pune", "102,Ravi,Pune", "103,Meena,Pune", "201,Om,Delhi", "202,Zoya,Delhi", "301,Dev,Agra"]
          cands = read_candidates(lines)
          print(len(cands), cands[0])

          groups = group_by_centre(cands)
          for centre, people in groups.items():
              print(centre, [c.roll for c in people])

          print([c.roll for c in seat_order(cands)])
        `,
        tests: [
          { output: "6 Candidate(roll=101, name='Asha', centre='Pune')\nPune [101, 102, 103]\nDelhi [201, 202]\nAgra [301]\n[101, 201, 301, 102, 202, 103]" },
          { py: py`
              C = need("Candidate")
              people = [C(i, "x", "X") for i in range(1, 6)] + [C(6, "y", "Y"), C(7, "z", "Z")]
              got = [c.roll for c in call("seat_order", people)]
              assert got == [1, 6, 7, 2, 3, 4, 5], f"Five from X, one from Y and one from Z should sit as 1, 6, 7, 2, 3, 4, 5, but the order is {got}."
              assert call("seat_order", []) == [], "With no candidates, seat_order should give back an empty list."
            ` },
        ],
        wrong: [py`
          from collections import namedtuple, defaultdict, deque

          Candidate = namedtuple("Candidate", ["roll", "name", "centre"])


          def read_candidates(lines):
              # in: lines like "101,Asha,Pune"; blank lines are skipped
              # out: a list of Candidate records, with the roll number as a whole number
              cands = []
              for line in lines:
                  if not line.strip():
                      continue
                  roll, name, centre = line.strip().split(",")
                  cands.append(Candidate(int(roll), name, centre))
              return cands


          def group_by_centre(cands):
              # in: a list of candidates
              # out: centre -> list of its candidates, centres in the order first seen
              groups = defaultdict(list)
              for c in cands:
                  groups[c.centre].append(c)
              return groups


          def seat_order(cands):
              # in: a list of candidates
              # out: the same candidates, taking one from each centre in turn
              order = []
              for group in group_by_centre(cands).values():
                  order.extend(group)
              return order


          lines = ["101,Asha,Pune", "102,Ravi,Pune", "103,Meena,Pune", "201,Om,Delhi", "202,Zoya,Delhi", "301,Dev,Agra"]
          cands = read_candidates(lines)
          print(len(cands), cands[0])

          groups = group_by_centre(cands)
          for centre, people in groups.items():
              print(centre, [c.roll for c in people])

          print([c.roll for c in seat_order(cands)])
        `],
        hints: [
          md`If all of Pune sit together first, the order takes a whole centre at a time. Take one from each centre in turn.`,
          md`If you see IndexError from an empty deque, a centre with nobody left is still being put back.`,
          md`If the list stops before everyone is seated, the loop must go on while any centre still has people.`,
        ],
      },
      {
        id: "s4", stage: 4, carry: "s3", title: "Stage 4: rows and clashes",
        task: md`
          Add two functions:

          - «hall_plan(order, per_row)» gives back a list of rows. Each row holds the next «per_row» candidates; the last row may be shorter.
          - «clashes(plan)» gives back how many side-by-side pairs in a row come from the same centre.

          Then add these lines at the end:

          : plan = hall_plan(seat_order(cands), 4)
          : for i, row in enumerate(plan, start=1):
          :     print(f"Row {i}:", " ".join(str(c.roll) for c in row))
          : print("Clashes:", clashes(plan))

          The last three lines printed are:

          | Row 1: 101 201 301 102
          | Row 2: 202 103
          | Clashes: 0
        `,
        starter: py`
          from collections import namedtuple, defaultdict, deque

          Candidate = namedtuple("Candidate", ["roll", "name", "centre"])


          def read_candidates(lines):
              # in: lines like "101,Asha,Pune"; blank lines are skipped
              # out: a list of Candidate records, with the roll number as a whole number
              cands = []
              for line in lines:
                  if not line.strip():
                      continue
                  roll, name, centre = line.strip().split(",")
                  cands.append(Candidate(int(roll), name, centre))
              return cands


          def group_by_centre(cands):
              # in: a list of candidates
              # out: centre -> list of its candidates, centres in the order first seen
              groups = defaultdict(list)
              for c in cands:
                  groups[c.centre].append(c)
              return groups


          def seat_order(cands):
              # in: a list of candidates
              # out: the same candidates, taking one from each centre in turn
              queues = deque(deque(group) for group in group_by_centre(cands).values())
              order = []
              while queues:
                  q = queues.popleft()
                  order.append(q.popleft())
                  if q:
                      queues.append(q)
              return order


          lines = ["101,Asha,Pune", "102,Ravi,Pune", "103,Meena,Pune", "201,Om,Delhi", "202,Zoya,Delhi", "301,Dev,Agra"]
          cands = read_candidates(lines)
          print(len(cands), cands[0])

          groups = group_by_centre(cands)
          for centre, people in groups.items():
              print(centre, [c.roll for c in people])

          print([c.roll for c in seat_order(cands)])
        `,
        solution: py`
          from collections import namedtuple, defaultdict, deque

          Candidate = namedtuple("Candidate", ["roll", "name", "centre"])


          def read_candidates(lines):
              # in: lines like "101,Asha,Pune"; blank lines are skipped
              # out: a list of Candidate records, with the roll number as a whole number
              cands = []
              for line in lines:
                  if not line.strip():
                      continue
                  roll, name, centre = line.strip().split(",")
                  cands.append(Candidate(int(roll), name, centre))
              return cands


          def group_by_centre(cands):
              # in: a list of candidates
              # out: centre -> list of its candidates, centres in the order first seen
              groups = defaultdict(list)
              for c in cands:
                  groups[c.centre].append(c)
              return groups


          def seat_order(cands):
              # in: a list of candidates
              # out: the same candidates, taking one from each centre in turn
              queues = deque(deque(group) for group in group_by_centre(cands).values())
              order = []
              while queues:
                  q = queues.popleft()
                  order.append(q.popleft())
                  if q:
                      queues.append(q)
              return order


          def hall_plan(order, per_row):
              # in: candidates in seat order, and the number of seats in each row
              # out: a list of rows, each a list of candidates
              return [order[i:i + per_row] for i in range(0, len(order), per_row)]


          def clashes(plan):
              # in: a hall plan
              # out: how many side-by-side pairs in a row come from the same centre
              count = 0
              for row in plan:
                  for left, right in zip(row, row[1:]):
                      if left.centre == right.centre:
                          count += 1
              return count


          lines = ["101,Asha,Pune", "102,Ravi,Pune", "103,Meena,Pune", "201,Om,Delhi", "202,Zoya,Delhi", "301,Dev,Agra"]
          cands = read_candidates(lines)
          print(len(cands), cands[0])

          groups = group_by_centre(cands)
          for centre, people in groups.items():
              print(centre, [c.roll for c in people])

          print([c.roll for c in seat_order(cands)])

          plan = hall_plan(seat_order(cands), 4)
          for i, row in enumerate(plan, start=1):
              print(f"Row {i}:", " ".join(str(c.roll) for c in row))
          print("Clashes:", clashes(plan))
        `,
        tests: [
          { output: "6 Candidate(roll=101, name='Asha', centre='Pune')\nPune [101, 102, 103]\nDelhi [201, 202]\nAgra [301]\n[101, 201, 301, 102, 202, 103]\nRow 1: 101 201 301 102\nRow 2: 202 103\nClashes: 0" },
          { py: py`
              C = need("Candidate")
              order = [C(1, "a", "X"), C(2, "b", "X"), C(3, "c", "Y"), C(4, "d", "Y"), C(5, "e", "Y")]
              plan = call("hall_plan", order, 3)
              assert [[c.roll for c in row] for row in plan] == [[1, 2, 3], [4, 5]], "With 5 candidates and 3 seats a row, the rows should be 1 2 3 and 4 5."
              got = call("clashes", plan)
              assert got == 2, f"Rows X X Y and Y Y hold 2 side-by-side pairs from one centre, but clashes gave {got}."
              assert call("hall_plan", [], 4) == [], "With no candidates, hall_plan should give back no rows."
            ` },
        ],
        wrong: [py`
          from collections import namedtuple, defaultdict, deque

          Candidate = namedtuple("Candidate", ["roll", "name", "centre"])


          def read_candidates(lines):
              # in: lines like "101,Asha,Pune"; blank lines are skipped
              # out: a list of Candidate records, with the roll number as a whole number
              cands = []
              for line in lines:
                  if not line.strip():
                      continue
                  roll, name, centre = line.strip().split(",")
                  cands.append(Candidate(int(roll), name, centre))
              return cands


          def group_by_centre(cands):
              # in: a list of candidates
              # out: centre -> list of its candidates, centres in the order first seen
              groups = defaultdict(list)
              for c in cands:
                  groups[c.centre].append(c)
              return groups


          def seat_order(cands):
              # in: a list of candidates
              # out: the same candidates, taking one from each centre in turn
              queues = deque(deque(group) for group in group_by_centre(cands).values())
              order = []
              while queues:
                  q = queues.popleft()
                  order.append(q.popleft())
                  if q:
                      queues.append(q)
              return order


          def hall_plan(order, per_row):
              # in: candidates in seat order, and the number of seats in each row
              # out: a list of rows, each a list of candidates
              return [order[i:i + per_row] for i in range(0, len(order), per_row)]


          def clashes(plan):
              # in: a hall plan
              # out: how many side-by-side pairs in a row come from the same centre
              count = 0
              for row in plan[:-1]:
                  for left, right in zip(row, row[1:]):
                      if left.centre == right.centre:
                          count += 1
              return count


          lines = ["101,Asha,Pune", "102,Ravi,Pune", "103,Meena,Pune", "201,Om,Delhi", "202,Zoya,Delhi", "301,Dev,Agra"]
          cands = read_candidates(lines)
          print(len(cands), cands[0])

          groups = group_by_centre(cands)
          for centre, people in groups.items():
              print(centre, [c.roll for c in people])

          print([c.roll for c in seat_order(cands)])

          plan = hall_plan(seat_order(cands), 4)
          for i, row in enumerate(plan, start=1):
              print(f"Row {i}:", " ".join(str(c.roll) for c in row))
          print("Clashes:", clashes(plan))
        `],
        hints: [
          md`If the last candidate disappears when a row is not full, the loop over row starts stops too early.`,
          md`If a clash in the last row is not counted, the clash loop skips a row.`,
          md`If clashes counts pairs that are not side by side, compare each seat only with the seat on its right.`,
        ],
      },
      {
        id: "c1", stage: 5, kind: "catch", title: "Stage 5: catch 4 broken planners",
        task: md`
          The correct planner is shown: «group_by_centre», «seat_order», «hall_plan» and «clashes». There are **4 secretly broken versions** of it. Each gets the grouping, the turns, the rows or the clashes a little wrong. Write asserts that pass on the correct planner and fail on every broken one.

          Make two or three small candidates, like «Candidate(1, "A", "X")», and work out each answer by hand first.
        `,
        target: py`
          from collections import namedtuple, defaultdict, deque

          Candidate = namedtuple("Candidate", ["roll", "name", "centre"])


          def group_by_centre(cands):
              # in: a list of candidates
              # out: centre -> list of its candidates, centres in the order first seen
              groups = defaultdict(list)
              for c in cands:
                  groups[c.centre].append(c)
              return groups


          def seat_order(cands):
              # in: a list of candidates
              # out: the same candidates, taking one from each centre in turn
              queues = deque(deque(group) for group in group_by_centre(cands).values())
              order = []
              while queues:
                  q = queues.popleft()
                  order.append(q.popleft())
                  if q:
                      queues.append(q)
              return order


          def hall_plan(order, per_row):
              # in: candidates in seat order, and the number of seats in each row
              # out: a list of rows, each a list of candidates
              return [order[i:i + per_row] for i in range(0, len(order), per_row)]


          def clashes(plan):
              # in: a hall plan
              # out: how many side-by-side pairs in a row come from the same centre
              count = 0
              for row in plan:
                  for left, right in zip(row, row[1:]):
                      if left.centre == right.centre:
                          count += 1
              return count
        `,
        broken: [
          // 1: no turns: everyone stays in the order they came.
          py`
            from collections import namedtuple, defaultdict, deque

            Candidate = namedtuple("Candidate", ["roll", "name", "centre"])


            def group_by_centre(cands):
                # in: a list of candidates
                # out: centre -> list of its candidates, centres in the order first seen
                groups = defaultdict(list)
                for c in cands:
                    groups[c.centre].append(c)
                return groups


            def seat_order(cands):
                # in: a list of candidates
                # out: the same candidates, taking one from each centre in turn
                return list(cands)


            def hall_plan(order, per_row):
                # in: candidates in seat order, and the number of seats in each row
                # out: a list of rows, each a list of candidates
                return [order[i:i + per_row] for i in range(0, len(order), per_row)]


            def clashes(plan):
                # in: a hall plan
                # out: how many side-by-side pairs in a row come from the same centre
                count = 0
                for row in plan:
                    for left, right in zip(row, row[1:]):
                        if left.centre == right.centre:
                            count += 1
                return count
          `,
          // 2: loses the last row when it is not full.
          py`
            from collections import namedtuple, defaultdict, deque

            Candidate = namedtuple("Candidate", ["roll", "name", "centre"])


            def group_by_centre(cands):
                # in: a list of candidates
                # out: centre -> list of its candidates, centres in the order first seen
                groups = defaultdict(list)
                for c in cands:
                    groups[c.centre].append(c)
                return groups


            def seat_order(cands):
                # in: a list of candidates
                # out: the same candidates, taking one from each centre in turn
                queues = deque(deque(group) for group in group_by_centre(cands).values())
                order = []
                while queues:
                    q = queues.popleft()
                    order.append(q.popleft())
                    if q:
                        queues.append(q)
                return order


            def hall_plan(order, per_row):
                # in: candidates in seat order, and the number of seats in each row
                # out: a list of rows, each a list of candidates
                return [order[i:i + per_row] for i in range(0, len(order) - 1, per_row)]


            def clashes(plan):
                # in: a hall plan
                # out: how many side-by-side pairs in a row come from the same centre
                count = 0
                for row in plan:
                    for left, right in zip(row, row[1:]):
                        if left.centre == right.centre:
                            count += 1
                return count
          `,
          // 3: never checks the last row for clashes.
          py`
            from collections import namedtuple, defaultdict, deque

            Candidate = namedtuple("Candidate", ["roll", "name", "centre"])


            def group_by_centre(cands):
                # in: a list of candidates
                # out: centre -> list of its candidates, centres in the order first seen
                groups = defaultdict(list)
                for c in cands:
                    groups[c.centre].append(c)
                return groups


            def seat_order(cands):
                # in: a list of candidates
                # out: the same candidates, taking one from each centre in turn
                queues = deque(deque(group) for group in group_by_centre(cands).values())
                order = []
                while queues:
                    q = queues.popleft()
                    order.append(q.popleft())
                    if q:
                        queues.append(q)
                return order


            def hall_plan(order, per_row):
                # in: candidates in seat order, and the number of seats in each row
                # out: a list of rows, each a list of candidates
                return [order[i:i + per_row] for i in range(0, len(order), per_row)]


            def clashes(plan):
                # in: a hall plan
                # out: how many side-by-side pairs in a row come from the same centre
                count = 0
                for row in plan[:-1]:
                    for left, right in zip(row, row[1:]):
                        if left.centre == right.centre:
                            count += 1
                return count
          `,
          // 4: puts the centres in A to Z order.
          py`
            from collections import namedtuple, defaultdict, deque

            Candidate = namedtuple("Candidate", ["roll", "name", "centre"])


            def group_by_centre(cands):
                # in: a list of candidates
                # out: centre -> list of its candidates, centres in the order first seen
                groups = defaultdict(list)
                for c in cands:
                    groups[c.centre].append(c)
                return dict(sorted(groups.items()))


            def seat_order(cands):
                # in: a list of candidates
                # out: the same candidates, taking one from each centre in turn
                queues = deque(deque(group) for group in group_by_centre(cands).values())
                order = []
                while queues:
                    q = queues.popleft()
                    order.append(q.popleft())
                    if q:
                        queues.append(q)
                return order


            def hall_plan(order, per_row):
                # in: candidates in seat order, and the number of seats in each row
                # out: a list of rows, each a list of candidates
                return [order[i:i + per_row] for i in range(0, len(order), per_row)]


            def clashes(plan):
                # in: a hall plan
                # out: how many side-by-side pairs in a row come from the same centre
                count = 0
                for row in plan:
                    for left, right in zip(row, row[1:]):
                        if left.centre == right.centre:
                            count += 1
                return count
          `,
        ],
        starter: py`
          # One fact per assert. Work out each answer by hand first.
          a = Candidate(1, "A", "X")
          b = Candidate(2, "B", "X")
          assert len(hall_plan([a, b], 2)) == 1
        `,
        solution: py`
          a = Candidate(1, "A", "X")
          b = Candidate(2, "B", "X")
          c = Candidate(3, "C", "Y")
          assert seat_order([a, b, c]) == [a, c, b]
          assert len(hall_plan([a, b, c], 2)) == 2
          assert clashes([[a, b]]) == 1
          assert list(group_by_centre([c, a])) == ["Y", "X"]
        `,
        hints: [
          md`Give «seat_order» two from one centre and one from another. Who should sit second?`,
          md`Give «hall_plan» three candidates with 2 seats a row. How many rows should there be?`,
          md`Give «clashes» a plan with one row of two from the same centre. And check the order of centres when the first candidate is not from X.`,
        ],
      },
      {
        id: "d1", kind: "drill", title: "Laptop Mission: the planner on your laptop",
        task: md`
          This pretend Command Prompt is in your «python-days» folder. Type the command and press Enter.

          On a phone, you may skip this. Phone users are excused from the mission below.
        `,
        steps: [
          { say: md`Run your seating planner. Type «python seating.py» and press Enter.`,
            expect: ["python seating.py", "py seating.py"],
            output: "6 Candidate(roll=101, name='Asha', centre='Pune')\nPune [101, 102, 103]\nDelhi [201, 202]\nAgra [301]\n[101, 201, 301, 102, 202, 103]\nRow 1: 101 201 301 102\nRow 2: 202 103\nClashes: 0" },
        ],
        mission: md`
          Now do it for real.

          1. In IDLE, make a new file with your Stage 4 program. Save it as «seating.py» in «python-days».
          2. Run it with F5, and check the lines.
          3. Change the 4 in «hall_plan(seat_order(cands), 4)» to 2, and run it again. The number after «Clashes:» is your receipt: write it in your notebook.
        `,
        hints: [
          md`Type the words in the grey box exactly, then press Enter.`,
          md`There is one space between the word python and the file name.`,
          md`If python does not work on your laptop, py does the same job.`,
        ],
      },
      {
        id: "twist", kind: "modify", carry: "s4", optional: true, noStep: true, title: "Own Twist: find my seat",
        task: md`
          Candidates want to know where to sit. Add «find_seat(plan, roll)», which gives back text like «"Row 2, Seat 1"», counting rows and seats from 1, or «"Not seated"» for a roll that is not in the plan. Then add these lines at the end:

          : print(find_seat(plan, 202))
          : print(find_seat(plan, 999))

          The last two lines are:

          | Row 2, Seat 1
          | Not seated

          You may add your own idea too, such as a count of empty seats in the last row. The tests check the planner and «find_seat», so your own idea is safe.
        `,
        starter: py`
          from collections import namedtuple, defaultdict, deque

          Candidate = namedtuple("Candidate", ["roll", "name", "centre"])


          def read_candidates(lines):
              # in: lines like "101,Asha,Pune"; blank lines are skipped
              # out: a list of Candidate records, with the roll number as a whole number
              cands = []
              for line in lines:
                  if not line.strip():
                      continue
                  roll, name, centre = line.strip().split(",")
                  cands.append(Candidate(int(roll), name, centre))
              return cands


          def group_by_centre(cands):
              # in: a list of candidates
              # out: centre -> list of its candidates, centres in the order first seen
              groups = defaultdict(list)
              for c in cands:
                  groups[c.centre].append(c)
              return groups


          def seat_order(cands):
              # in: a list of candidates
              # out: the same candidates, taking one from each centre in turn
              queues = deque(deque(group) for group in group_by_centre(cands).values())
              order = []
              while queues:
                  q = queues.popleft()
                  order.append(q.popleft())
                  if q:
                      queues.append(q)
              return order


          def hall_plan(order, per_row):
              # in: candidates in seat order, and the number of seats in each row
              # out: a list of rows, each a list of candidates
              return [order[i:i + per_row] for i in range(0, len(order), per_row)]


          def clashes(plan):
              # in: a hall plan
              # out: how many side-by-side pairs in a row come from the same centre
              count = 0
              for row in plan:
                  for left, right in zip(row, row[1:]):
                      if left.centre == right.centre:
                          count += 1
              return count


          lines = ["101,Asha,Pune", "102,Ravi,Pune", "103,Meena,Pune", "201,Om,Delhi", "202,Zoya,Delhi", "301,Dev,Agra"]
          cands = read_candidates(lines)
          print(len(cands), cands[0])

          groups = group_by_centre(cands)
          for centre, people in groups.items():
              print(centre, [c.roll for c in people])

          print([c.roll for c in seat_order(cands)])

          plan = hall_plan(seat_order(cands), 4)
          for i, row in enumerate(plan, start=1):
              print(f"Row {i}:", " ".join(str(c.roll) for c in row))
          print("Clashes:", clashes(plan))
        `,
        solution: py`
          from collections import namedtuple, defaultdict, deque

          Candidate = namedtuple("Candidate", ["roll", "name", "centre"])


          def read_candidates(lines):
              # in: lines like "101,Asha,Pune"; blank lines are skipped
              # out: a list of Candidate records, with the roll number as a whole number
              cands = []
              for line in lines:
                  if not line.strip():
                      continue
                  roll, name, centre = line.strip().split(",")
                  cands.append(Candidate(int(roll), name, centre))
              return cands


          def group_by_centre(cands):
              # in: a list of candidates
              # out: centre -> list of its candidates, centres in the order first seen
              groups = defaultdict(list)
              for c in cands:
                  groups[c.centre].append(c)
              return groups


          def seat_order(cands):
              # in: a list of candidates
              # out: the same candidates, taking one from each centre in turn
              queues = deque(deque(group) for group in group_by_centre(cands).values())
              order = []
              while queues:
                  q = queues.popleft()
                  order.append(q.popleft())
                  if q:
                      queues.append(q)
              return order


          def hall_plan(order, per_row):
              # in: candidates in seat order, and the number of seats in each row
              # out: a list of rows, each a list of candidates
              return [order[i:i + per_row] for i in range(0, len(order), per_row)]


          def clashes(plan):
              # in: a hall plan
              # out: how many side-by-side pairs in a row come from the same centre
              count = 0
              for row in plan:
                  for left, right in zip(row, row[1:]):
                      if left.centre == right.centre:
                          count += 1
              return count


          def find_seat(plan, roll):
              # in: a hall plan and a roll number
              # out: "Row R, Seat S", counting from 1, or "Not seated"
              for r, row in enumerate(plan, start=1):
                  for s, c in enumerate(row, start=1):
                      if c.roll == roll:
                          return f"Row {r}, Seat {s}"
              return "Not seated"


          lines = ["101,Asha,Pune", "102,Ravi,Pune", "103,Meena,Pune", "201,Om,Delhi", "202,Zoya,Delhi", "301,Dev,Agra"]
          cands = read_candidates(lines)
          print(len(cands), cands[0])

          groups = group_by_centre(cands)
          for centre, people in groups.items():
              print(centre, [c.roll for c in people])

          print([c.roll for c in seat_order(cands)])

          plan = hall_plan(seat_order(cands), 4)
          for i, row in enumerate(plan, start=1):
              print(f"Row {i}:", " ".join(str(c.roll) for c in row))
          print("Clashes:", clashes(plan))

          print(find_seat(plan, 202))
          print(find_seat(plan, 999))
        `,
        tests: [
          { contains: ["Row 1: 101 201 301 102", "Row 2: 202 103", "Clashes: 0", "Row 2, Seat 1", "Not seated"] },
          { py: py`
              C = need("Candidate")
              plan = call("hall_plan", [C(5, "a", "X"), C(6, "b", "Y"), C(7, "c", "X")], 2)
              expect("find_seat", (plan, 5), "Row 1, Seat 1")
              expect("find_seat", (plan, 7), "Row 2, Seat 1")
              expect("find_seat", (plan, 8), "Not seated")
              assert call("clashes", plan) == 0, "The old clashes function should still work."
            ` },
        ],
        wrong: [py`
          from collections import namedtuple, defaultdict, deque

          Candidate = namedtuple("Candidate", ["roll", "name", "centre"])


          def read_candidates(lines):
              # in: lines like "101,Asha,Pune"; blank lines are skipped
              # out: a list of Candidate records, with the roll number as a whole number
              cands = []
              for line in lines:
                  if not line.strip():
                      continue
                  roll, name, centre = line.strip().split(",")
                  cands.append(Candidate(int(roll), name, centre))
              return cands


          def group_by_centre(cands):
              # in: a list of candidates
              # out: centre -> list of its candidates, centres in the order first seen
              groups = defaultdict(list)
              for c in cands:
                  groups[c.centre].append(c)
              return groups


          def seat_order(cands):
              # in: a list of candidates
              # out: the same candidates, taking one from each centre in turn
              queues = deque(deque(group) for group in group_by_centre(cands).values())
              order = []
              while queues:
                  q = queues.popleft()
                  order.append(q.popleft())
                  if q:
                      queues.append(q)
              return order


          def hall_plan(order, per_row):
              # in: candidates in seat order, and the number of seats in each row
              # out: a list of rows, each a list of candidates
              return [order[i:i + per_row] for i in range(0, len(order), per_row)]


          def clashes(plan):
              # in: a hall plan
              # out: how many side-by-side pairs in a row come from the same centre
              count = 0
              for row in plan:
                  for left, right in zip(row, row[1:]):
                      if left.centre == right.centre:
                          count += 1
              return count


          def find_seat(plan, roll):
              # in: a hall plan and a roll number
              # out: "Row R, Seat S", counting from 1, or "Not seated"
              for r, row in enumerate(plan):
                  for s, c in enumerate(row):
                      if c.roll == roll:
                          return f"Row {r}, Seat {s}"
              return "Not seated"


          lines = ["101,Asha,Pune", "102,Ravi,Pune", "103,Meena,Pune", "201,Om,Delhi", "202,Zoya,Delhi", "301,Dev,Agra"]
          cands = read_candidates(lines)
          print(len(cands), cands[0])

          groups = group_by_centre(cands)
          for centre, people in groups.items():
              print(centre, [c.roll for c in people])

          print([c.roll for c in seat_order(cands)])

          plan = hall_plan(seat_order(cands), 4)
          for i, row in enumerate(plan, start=1):
              print(f"Row {i}:", " ".join(str(c.roll) for c in row))
          print("Clashes:", clashes(plan))

          print(find_seat(plan, 202))
          print(find_seat(plan, 999))
        `],
        hints: [
          md`If every seat is one too small, like «Row 1, Seat 0», the counting starts from 0. People count from 1.`,
          md`If «Not seated» appears for a roll that is there, the give-back for a missing roll is inside the loop.`,
          md`If an old test fails, your change touched one of the Stage 1 to 4 functions. Keep them as they were.`,
        ],
      },
    ],
    keys: [
      md`Records as namedtuples, groups in a defaultdict, turns with a deque of queues.`,
      md`Take turns: «popleft» the next queue, seat its first person, and «append» it back while it has people.`,
      md`Rows are slices: «order[i:i + per_row]» for «i» in «range(0, len(order), per_row)».`,
      md`Test a planner with small cases where a broken one gives a different answer: a short last row, and a clash in the last row.`,
    ],
  });
})();
