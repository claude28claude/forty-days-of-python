// Week 13 — Patterns and Other People's Code (Days 85 to 91).
// Days 85 and 86 teach regular expressions: checking a whole text, then
// finding and replacing pieces. Day 87 is a reading day of short forms, and
// Day 88 maps a program you did not write. Day 89 splits a program into your
// own module, Day 90 installs one package with pip, and Day 91 is the Indian
// Form Checker project with the Level 7 certificate.
(function () {
  const { day, md, py, ex, code, tip, warn, ask, pause } = window.Course;

  // ---------------------------------------------------------------- Day 85
  day({
    slug: "patterns-whole-text",
    title: "Patterns: Check a Whole Text",
    goal: "Check Indian mobile numbers and PIN codes with one short pattern.",
    minutes: 40,
    kind: "lesson",
    needs: [12, 37, 78],
    win: "Today you can now check a PIN code or a mobile number with one short pattern.",
    learn: [
      md`
        ## A pattern for the whole text

        A **regular expression** is a short pattern that describes the shape of some text. Python keeps these tools in the module «re». «re.fullmatch(pattern, text)» checks if the **whole** text fits the pattern. In a pattern, «\d» means one digit, and «{6}» means "the item before me, exactly 6 times". Guess the output.
      `,
      ex(py`
        import re

        for pin in ["110001", "11001", "1100012", "11O001"]:
            if re.fullmatch(r"\d{6}", pin):
                print(pin, "fits")
            else:
                print(pin, "does not fit")
      `, { predict: [
             "110001 fits\n11001 does not fit\n1100012 does not fit\n11O001 does not fit",
             "110001 fits\n11001 does not fit\n1100012 fits\n11O001 does not fit",
             "110001 fits\n11001 does not fit\n1100012 does not fit\n11O001 fits",
           ], answer: 0 }),
      md`
        «1100012» has 7 digits. The whole text must fit, so it fails. «11O001» has a capital letter O, not a zero. We write each pattern as a **raw string**, with «r» before the quotes (Day 78), so Python keeps every backslash as it is.
      `,
      ex(py`
        import re

        print(re.fullmatch(r"\d{6}", "11001"))
      `, { predict: ["None", "False", "11001"], answer: 0 }),
      md`
        When the text does not fit, «fullmatch» gives back **None**. In an «if», None counts as False, like an empty string. When the text fits, it gives back a match, which counts as True.
      `,
      md`
        ## One character from a group, and "maybe"

        Square brackets pick **one** character from a group. «[6-9]» means one digit from 6 to 9. «[A-Z]» means one capital letter. An Indian mobile number has 10 digits, and the first digit is 6, 7, 8 or 9. The mark «?» means "the item before me may be there once, or not at all".
      `,
      tip(md`
        **Symbol table.** Keep this open while you practise.

        - «\d» one digit, 0 to 9
        - «{6}» the item before it, exactly 6 times
        - «[6-9]» one character from 6 to 9. «[A-Z]» one capital letter
        - «?» the item before it, once or not at all
        - «r"..."» a raw string: write every pattern like this

        On a phone, the backslash «\» and the curly brackets are on the symbols page of the keyboard.
      `),
      ex(py`
        import re

        for m in ["9876543210", "5876543210", "09876543210", "98765 43210"]:
            if re.fullmatch(r"0?[6-9]\d{9}", m):
                print(m, "yes")
            else:
                print(m, "no")
      `, { predict: [
             "9876543210 yes\n5876543210 no\n09876543210 yes\n98765 43210 no",
             "9876543210 yes\n5876543210 no\n09876543210 no\n98765 43210 no",
             "9876543210 yes\n5876543210 yes\n09876543210 yes\n98765 43210 no",
           ], answer: 0 }),
      md`
        «0?» lets one 0 come first, or none. Then «[6-9]» takes one digit, and «\d{9}» takes nine more. So a mobile number is «[6-9]» plus «\d{9}»: ten digits in all. A space is not a digit, so «98765 43210» fails.
      `,
      md`
        ## A common mistake: counting the first digit twice

        Here someone wants ten digits. They write «[6-9]» and then «\d{10}». Guess what happens to a good number.
      `,
      ex(py`
        import re

        number = "9876543210"
        if re.fullmatch(r"[6-9]\d{10}", number):
            print("Valid")
        else:
            print("Not valid")
      `, { label: "A mistake on purpose", predict: ["Not valid", "Valid", "None"], answer: 0 }),
      md`
        «[6-9]» already takes the first digit. «\d{10}» then wants ten **more**, so the pattern needs 11 digits. Count the pieces: 1 + 9 = 10. Always test a pattern with good text **and** bad text.
      `,
      ask({
        q: md`Which pattern fits exactly a 6-digit PIN code like «400001»?`,
        options: ["«\\d{6}»", "«\\d6»", "«[6]\\d»"],
        answer: 0,
        explain: md`«\d» is one digit and «{6}» repeats it exactly 6 times.`,
        why: [null, md`Without curly brackets, «6» is just the digit 6. «\d6» means one digit followed by a 6.`, md`«[6]» is one character, the digit 6. Then «\d» is one more digit, so only 2 digits in all.`],
      }),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          import re

          count = 0
          for p in ["560001", "56001", "5600O1", "000000"]:
              if re.fullmatch(r"\d{6}", p):
                  count += 1
          print(count)
        `, options: ["2", "3", "1"], answer: 0,
        explain: md`«560001» and «000000» are six digits. «56001» has only five, and «5600O1» has a letter O.`,
        why: [null, md`Look closely at «5600O1». The fifth character is the capital letter O, not a zero.`, md`«000000» is six digits too. The pattern does not care which digits they are.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          import re

          code = input("Code: ")
          if re.fullmatch(r"[A-Z]{3}\d{2}", code):
              print("OK")
          else:
              print("Try again")
        `, options: [
          "It prints OK only for 3 capital letters followed by 2 digits, like ABC12",
          "It prints OK if the code has any capital letters in it",
          "It prints OK for any code that is 5 characters long",
        ], answer: 0, verify: false, mono: false,
        explain: md`«[A-Z]{3}» is three capital letters, and «\d{2}» is two digits. «fullmatch» checks the whole code.`,
        why: [null, md`«fullmatch» checks the whole text against the pattern, not just a part of it.`, md`The length is 5, but the kind of each character matters too.`],
        skill: "read" },
      { q: md`What does «?» mean in the pattern «0?\d{10}»?`,
        options: ["The 0 may be there once, or not at all", "Any one character", "The 0 must be there"], answer: 0,
        explain: md`«?» makes the item just before it optional.`,
        why: [null, md`«?» does not stand for a character. It changes the item just before it.`, md`Without the «?», the 0 would be required.`],
        skill: "memory" },
      { q: md`This should accept every Indian mobile number, but it also accepts «0123456789». Which pattern fixes it?`,
        code: py`
          import re

          number = "0123456789"
          if re.fullmatch(r"\d{10}", number):
              print("Valid mobile")
        `,
        options: ["«[6-9]\\d{9}»", "«[6-9]\\d{10}»", "«\\d{9}»"], answer: 0, verify: false, mono: false,
        explain: md`The first digit must be 6 to 9, then nine more digits: 10 in all.`,
        why: [null, md`«[6-9]» is already one digit, so «\d{10}» makes 11 digits in all.`, md`«\d{9}» is only nine digits, and it still allows a 0 first.`],
        skill: "debug" },
      { q: md`What does this show?`, code: py`
          import re

          print(re.fullmatch(r"[A-Z]{2}", "Dl"))
        `, options: ["None", "Dl", "True"], answer: 0,
        explain: md`«l» is a small letter. «[A-Z]» takes capital letters only, so the whole text does not fit.`,
        why: [null, md`A small «l» is not in the group «[A-Z]». Capital letters matter.`, md`«fullmatch» never gives back True. It gives back a match or None.`],
        skill: "trace" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: counting PIN codes",
        task: md`Answer each question without running the program.`,
        code: py`
          import re

          count = 0
          for pin in ["110001", "4000", "560 001", "600028"]:
              if re.fullmatch(r"\d{6}", pin):
                  count += 1
          print(count)
        `,
        inputs: [],
        ask: [{ line: 6, name: "count" }, { line: 6, hit: 2, name: "pin" }, { output: true }],
        hints: [
          md`If your count is too high, check each PIN for exactly 6 characters, all digits.`,
          md`If you counted «560 001», look again: a space is not a digit.`,
          md`If your second answer is «560 001», remember that line 6 runs only when the PIN fits.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: a zero that may come first",
        task: md`Answer each question without running the program.`,
        code: py`
          import re

          good = []
          for m in ["09876543210", "9876543210", "00987654321", "0598765432"]:
              if re.fullmatch(r"0?[6-9]\d{9}", m):
                  good.append(m)
          print(len(good))
        `,
        inputs: [],
        ask: [{ line: 6, name: "good" }, { line: 6, hit: 2, name: "m" }, { output: true }],
        hints: [
          md`If you counted «00987654321», check it piece by piece: «0?» takes at most one 0.`,
          md`If you counted «0598765432», look at the digit after the 0. It must be 6, 7, 8 or 9.`,
          md`If your list has more than two numbers, test each one against «0?», then «[6-9]», then nine digits.`,
        ],
      },
      {
        id: "f1", kind: "fill", title: "Fill the gaps: a mobile number check",
        task: md`
          Fill the gaps so «valid_mobile» gives back True for a 10-digit Indian mobile number that starts with 6, 7, 8 or 9. The program prints:

          | 9876543210 True
          | 5876543210 False
          | 98765 False

          Use the symbol table above.
        `,
        template: py`
          import re

          def valid_mobile(number):
              if re.⟦fullmatch⟧(r"⟦[6-9]⟧⟦\d⟧{⟦9⟧}", number):
                  return True
              return False

          for n in ["9876543210", "5876543210", "98765"]:
              print(n, valid_mobile(n))
        `,
        tests: [
          { output: "9876543210 True\n5876543210 False\n98765 False" },
          { py: py`
              for good in ["6000000000", "7999999999", "8123456789", "9876543210"]:
                  assert call("valid_mobile", good) == True, f"valid_mobile('{good}') should be True. Check the first digit group and the count."
              for bad in ["98765432101", "987654321", "0987654321", "5123456789", "98765 4321", "+919876543210"]:
                  assert call("valid_mobile", bad) == False, f"valid_mobile('{bad}') should be False. The whole number must be exactly 10 digits, starting with 6 to 9."
            ` },
        ],
        wrong: [py`
          import re

          def valid_mobile(number):
              if re.fullmatch(r"[6-9]\d{10}", number):
                  return True
              return False

          for n in ["9876543210", "5876543210", "98765"]:
              print(n, valid_mobile(n))
        `],
        hints: [
          md`If every number shows False, count your digits: the first group is one digit already.`,
          md`If «5876543210» shows True, the first gap allows any digit. It should allow only 6 to 9.`,
          md`If you see an AttributeError, the first gap is not the name of the «re» tool that checks the whole text.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: a good number is refused",
        task: md`
          This program checks a mobile number. For «9876543210» it should print «Valid mobile». Instead it prints «Not valid». Find the wrong line and fix it.
        `,
        starter: py`
          import re

          number = input("Mobile: ").strip()
          if re.fullmatch(r"[6-9]\d{10}", number):
              print("Valid mobile")
          else:
              print("Not valid")
        `,
        bugLines: [4],
        solution: py`
          import re

          number = input("Mobile: ").strip()
          if re.fullmatch(r"[6-9]\d{9}", number):
              print("Valid mobile")
          else:
              print("Not valid")
        `,
        tests: [
          { inputs: ["9876543210"], output: "Valid mobile" },
          { inputs: ["6000000001"], output: "Valid mobile" },
          { inputs: ["98765432101"], output: "Not valid" },
          { inputs: ["5876543210"], output: "Not valid" },
          { inputs: ["987654321"], output: "Not valid" },
        ],
        wrong: [py`
          import re

          number = input("Mobile: ").strip()
          if re.fullmatch(r"\d{10}", number):
              print("Valid mobile")
          else:
              print("Not valid")
        `, py`
          import re

          number = input("Mobile: ").strip()
          if re.fullmatch(r"[6-9]\d{8}", number):
              print("Valid mobile")
          else:
              print("Not valid")
        `],
        hints: [
          md`If «9876543210» is refused, count how many digits the pattern asks for in all.`,
          md`If «5876543210» is accepted after your change, you removed the group that checks the first digit.`,
          md`If «987654321» (nine digits) is accepted, your count is now one too small.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: a PIN with a space", optional: true,
        task: md`
          People often type a PIN code as «110 001», with one space in the middle. Change the pattern so that both «110001» and «110 001» print «PIN OK». Two spaces, or a space in another place, must still print «Check the PIN».
        `,
        starter: py`
          import re

          pin = input("PIN: ")
          if re.fullmatch(r"\d{6}", pin):
              print("PIN OK")
          else:
              print("Check the PIN")
        `,
        solution: py`
          import re

          pin = input("PIN: ")
          if re.fullmatch(r"\d{3} ?\d{3}", pin):
              print("PIN OK")
          else:
              print("Check the PIN")
        `,
        tests: [
          { inputs: ["110 001"], output: "PIN OK" },
          { inputs: ["110001"], output: "PIN OK" },
          { inputs: ["110  001"], output: "Check the PIN" },
          { inputs: ["1100 01"], output: "Check the PIN" },
          { inputs: ["11001"], output: "Check the PIN" },
        ],
        wrong: [py`
          import re

          pin = input("PIN: ")
          if re.fullmatch(r"\d{3} \d{3}", pin):
              print("PIN OK")
          else:
              print("Check the PIN")
        `],
        hints: [
          md`If «110001» is now refused, the space in your pattern is required. It should be allowed, not required.`,
          md`If «1100 01» is accepted, your pattern lets the space come anywhere. It belongs after exactly three digits.`,
          md`If «110 001» is refused, your pattern has no space in it yet.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: an admit card roll number",
        task: md`
          An invented exam uses roll numbers with **2 capital letters, then 8 digits**, like «DL12345678». Ask for a roll number. Use «re.fullmatch». Print «Roll number OK» if it fits, or «Check the roll number» if it does not. When the user types «DL12345678», it shows:

          | Roll number OK
        `,
        starter: py`

        `,
        solution: py`
          import re

          roll = input("Roll number: ")
          if re.fullmatch(r"[A-Z]{2}\d{8}", roll):
              print("Roll number OK")
          else:
              print("Check the roll number")
        `,
        tests: [
          { inputs: ["DL12345678"], output: "Roll number OK" },
          { inputs: ["UP00000000"], output: "Roll number OK" },
          { inputs: ["dl12345678"], output: "Check the roll number" },
          { inputs: ["D123456789"], output: "Check the roll number" },
          { inputs: ["DL1234567"], output: "Check the roll number" },
          { inputs: ["DL123456789"], output: "Check the roll number" },
          { uses: ["method:fullmatch"], msg: md`Today's tool is «re.fullmatch». Check the roll number with one pattern.` },
        ],
        wrong: [py`
          import re

          roll = input("Roll number: ")
          if re.fullmatch(r"[A-Z]\d{8}", roll):
              print("Roll number OK")
          else:
              print("Check the roll number")
        `, py`
          import re

          roll = input("Roll number: ")
          if re.fullmatch(r"[A-Z]{2}\d{7}", roll):
              print("Roll number OK")
          else:
              print("Check the roll number")
        `],
        hints: [
          md`If «DL12345678» is refused, count the pieces: two letters, then eight digits, ten characters in all.`,
          md`If «dl12345678» is accepted, your letter group allows small letters. Use only capital letters.`,
          md`If «DL123456789» is accepted, the digit count is not fixed to exactly 8.`,
        ],
      },
    ],
    keys: [
      md`A **regular expression** is a pattern for the shape of text. Python's tools for it are in the module «re».`,
      md`«re.fullmatch(pattern, text)» checks the **whole** text. It gives back a match, or None when the text does not fit.`,
      md`Write every pattern as a raw string: «r"\d{6}"».`,
      md`«\d» is one digit. «{n}» repeats the item before it exactly n times. «[6-9]» and «[A-Z]» pick one character from a group. «?» makes the item before it optional.`,
      md`Test every pattern with good text and with bad text. Count the pieces: «[6-9]\d{9}» is 10 digits.`,
    ],
  });

  // ---------------------------------------------------------------- Day 86
  day({
    slug: "patterns-find-replace",
    title: "Patterns: Find and Replace",
    goal: "Pull out and replace pieces of text using patterns.",
    minutes: 40,
    kind: "lesson",
    needs: [85],
    win: "Today you can now find dates and amounts inside a long notice, and clean up a mobile number.",
    learn: [
      md`
        ## search: find a pattern anywhere

        Yesterday «fullmatch» checked the whole text. «re.search(pattern, text)» looks **anywhere** inside the text and stops at the first place that fits. It gives back a match, or None. The method «.group()» gives the text that was found. Guess the output.
      `,
      ex(py`
        import re

        notice = "SSC CGL Tier 1 begins on 14-09-2026 in Delhi."
        found = re.search(r"\d{2}-\d{2}-\d{4}", notice)
        print(found.group())
        print(re.search(r"\d{2}-\d{2}-\d{4}", "No date yet"))
      `, { predict: ["14-09-2026\nNone", "None\nNone", "14-09-2026\n14-09-2026"], answer: 0 }),
      md`
        Calling «.group()» on None crashes with an AttributeError (Day 54). So check with «if found:» first. Dates are not always two digits: «4-9-2026» is a date too. «{1,2}» means "the item before me, 1 or 2 times". «+» means "1 or more times, as many as there are".
      `,
      ex(py`
        import re

        for notice in ["Exam on 4-9-2026", "Exam on 14-09-2026", "Seats: 1250"]:
            found = re.search(r"\d{1,2}-\d{1,2}-\d{4}", notice)
            if found:
                print(found.group())
            else:
                print("No date. Number:", re.search(r"\d+", notice).group())
      `, { predict: [
             "4-9-2026\n14-09-2026\nNo date. Number: 1250",
             "No date. Number: 4\n14-09-2026\nNo date. Number: 1250",
             "4-9-2026\n14-09-2026\nNo date. Number: 1",
           ], answer: 0 }),
      md`
        ## findall, groups, and a real dot

        «re.findall(pattern, text)» gives back a **list** of every piece that fits. Round brackets make a **group**: they mark the part you want to keep. With a group, «findall» keeps only that part. With «search», «.group(1)» gives the part inside the first brackets.
      `,
      ex(py`
        import re

        bill = "Chai Rs 12, samosa Rs 15, 2 plates"
        print(re.findall(r"\d+", bill))
        print(re.findall(r"Rs (\d+)", bill))
      `, { predict: ["['12', '15', '2']\n['12', '15']", "['12', '15', '2']\n['Rs 12', 'Rs 15']", "['12', '15']\n['12', '15']"], answer: 0 }),
      md`
        In a pattern, a dot «.» means **any one character**, and «+» means "one or more". To match a real dot or a real plus sign, put a backslash before it: «\.» and «\+». Watch the mistake run.
      `,
      ex(py`
        import re

        text = "Fee 12.50 paid on 14-09"
        print(re.findall(r"\d+.\d+", text))
        print(re.findall(r"\d+\.\d+", text))
      `, { label: "A mistake on purpose", predict: ["['12.50', '14-09']\n['12.50']", "['12.50']\n['12.50']", "['12.50', '14-09']\n['12.50', '14-09']"], answer: 0 }),
      md`
        The first pattern also takes «14-09», because a dot allows the «-». The backslash makes the dot mean a real dot.
      `,
      md`
        ## sub: replace, and when plain methods are enough

        «re.sub(pattern, new, text)» replaces **every** piece that fits, and gives back a new string. Here it hides each mobile number in a message.
      `,
      ex(py`
        import re

        msg = "Call 9876543210 or 9123456780 today"
        print(re.sub(r"[6-9]\d{9}", "(hidden)", msg))
        number = "+91 98765-43210"
        print(re.sub(r"[ -]", "", number).replace("+91", ""))
      `, { predict: ["Call (hidden) or (hidden) today\n9876543210", "Call (hidden) or 9123456780 today\n9876543210", "Call (hidden) or (hidden) today\n+919876543210"], answer: 0 }),
      md`
        «[ -]» is a group of two characters: a space or a hyphen. The second line removes «+91» with plain «.replace()». When the piece never changes, like «+91» or «Rs», a string method is enough and easier to read. Use a pattern when the piece changes, like any 10 digits.
      `,
      tip(md`
        **Symbol table, new today.**

        - «+» the item before it, 1 or more times
        - «{1,2}» the item before it, 1 or 2 times
        - «.» any one character. «\.» a real dot. «\+» a real plus
        - «( )» a group: the part to keep
      `),
      ask({
        q: md`Which line can crash with AttributeError?`,
        code: py`
          found = re.search(r"\d{6}", text)
          print(found.group())
        `,
        options: ["«print(found.group())», when the text has no 6 digits", "«found = re.search(...)», when the text is empty", "Neither line can crash"],
        answer: 0, verify: false, mono: false,
        explain: md`When nothing fits, «found» is None. None has no «.group()», so check «if found:» first.`,
        why: [null, md`«re.search» on empty text just gives back None. It does not crash.`, md`«None.group()» crashes. Always check before you call «.group()».`],
      }),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          import re

          notice = "Paper 1: 9-10-2026. Paper 2: 23-11-2026."
          print(re.findall(r"\d{1,2}-(\d{1,2})-\d{4}", notice))
        `, options: ["['10', '11']", "['9-10-2026', '23-11-2026']", "['1', '10', '2', '11']"], answer: 0,
        explain: md`The round brackets are around the month, so «findall» keeps only the months.`,
        why: [null, md`With a group, «findall» gives back only the part inside the brackets.`, md`«Paper 1» has no date shape around it, so its 1 is not found.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          import re

          roll = input("Roll number: ")
          print(re.sub(r"\d", "*", roll))
        `, options: [
          "It prints the roll number with every digit changed to a star",
          "It prints only the digits of the roll number",
          "It prints a star if the roll number has a digit",
        ], answer: 0, verify: false, mono: false,
        explain: md`«re.sub» replaces every piece that fits. Each single digit fits «\d», so each one becomes «*».`,
        why: [null, md`The digits are replaced, not kept.`, md`«re.sub» changes the text and gives it back. It does not test the text.`],
        skill: "read" },
      { q: md`What happens?`, code: py`
          import re

          print(re.search(r"+91", "+919876543210"))
        `, options: ["PatternError", "None", "+91"], answer: 0, error: true,
        explain: md`A plus sign alone means "one or more" of the item before it. Here there is no item before it, so Python refuses the pattern. Write «\+91» for a real plus.`,
        why: [null, md`Python never searches. It stops first, because the pattern itself is broken.`, md`To find a real plus sign, put a backslash before it: «\+».`],
        skill: "debug" },
      { q: md`Which pattern finds amounts like «12», «150» and «2500» (any number of digits)?`,
        options: ["«\\d+»", "«\\d»", "«\\d{2}»"], answer: 0,
        explain: md`«+» means one or more of the digit before it, so any length fits.`,
        why: [null, md`«\d» alone is exactly one digit, so «150» would be found as «1», «5», «0».`, md`«\d{2}» is exactly two digits.`],
        skill: "memory" },
      { q: md`You need to remove the fixed text «Rs » from «Rs 120». Which is the simplest tool?`,
        options: ['«.replace("Rs ", "")»', "«re.findall»", "«re.fullmatch»"], answer: 0,
        explain: md`The piece never changes, so a plain string method is enough and easier to read.`,
        why: [null, md`«findall» gives a list of pieces. It does not remove anything.`, md`«fullmatch» only checks the text. It does not change it.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: dates in a notice",
        task: md`Answer each question without running the program.`,
        code: py`
          import re

          notice = "Paper 1 on 12-10-2026, Paper 2 on 3-11-2026."
          dates = re.findall(r"\d{1,2}-\d{1,2}-\d{4}", notice)
          first = dates[0]
          count = len(dates)
          print(first, count)
        `,
        inputs: [],
        ask: [{ line: 4, name: "dates" }, { line: 6, name: "count" }, { output: true }],
        hints: [
          md`If your list holds «1» or «2», look again: «Paper 1» has no dashes after it, so it is not a date.`,
          md`If your list misses «3-11-2026», remember that «{1,2}» allows a day with one digit.`,
          md`If your count is 4, count only the pieces in the list, not every number in the notice.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: adding the fees",
        task: md`Answer each question without running the program.`,
        code: py`
          import re

          total = 0
          for line in ["Fee: Rs 100", "No fee", "Fee: Rs 2500"]:
              m = re.search(r"Rs (\d+)", line)
              if m is None:
                  continue
              total += int(m.group(1))
          print(total)
        `,
        inputs: [],
        ask: [{ line: 8, name: "total" }, { line: 5, hit: 2, name: "m" }, { output: true }],
        hints: [
          md`If your first answer is «Rs 100», remember that «.group(1)» gives only the part inside the brackets, and «int» makes it a number.`,
          md`If you said «m» holds a match for «No fee», check: there is no «Rs» in that line.`,
          md`If your total is 2600 plus something, the line with no fee is skipped by «continue».`,
        ],
      },
      {
        id: "f1", kind: "fill", title: "Fill the gaps: the exam years",
        task: md`
          Fill the gaps so «exam_years» gives back a list of only the **years** from every date in a notice. The program prints:

          | ['2026', '2027']
        `,
        template: py`
          import re

          def exam_years(notice):
              return re.⟦findall⟧(r"\d{1,2}-\d{1,2}-⟦(⟧\d{4}⟦)⟧", notice)

          print(exam_years("Tier 1: 14-09-2026. Tier 2: 18-01-2027. Fee Rs 100."))
        `,
        tests: [
          { output: "['2026', '2027']" },
          { py: py`
              expect("exam_years", ("Result on 5-3-2027",), ["2027"])
              expect("exam_years", ("No dates here, only Rs 2026",), [])
              expect("exam_years", ("1-1-2026, 31-12-2026 and 9-9-2028",), ["2026", "2026", "2028"])
            ` },
        ],
        wrong: [py`
          import re

          def exam_years(notice):
              return re.findall(r"\d{1,2}-\d{1,2}-\d{4}", notice)

          print(exam_years("Tier 1: 14-09-2026. Tier 2: 18-01-2027. Fee Rs 100."))
        `],
        hints: [
          md`If you see whole dates in the list, the brackets are not around the year.`,
          md`If you see an AttributeError, the first gap is not the «re» tool that gives back a list.`,
          md`If a notice with no date crashes, use the tool that gives back an empty list, not None.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: a price check that accepts too much",
        task: md`
          A price must be written with a real dot and two digits after it, like «12.50». This program also accepts «1250» and «12-50». Find the wrong line and fix it.
        `,
        starter: py`
          import re

          price = input("Price in rupees: ")
          if re.fullmatch(r"\d+.\d{2}", price):
              print("Price OK")
          else:
              print("Write it like 12.50")
        `,
        bugLines: [4],
        solution: py`
          import re

          price = input("Price in rupees: ")
          if re.fullmatch(r"\d+\.\d{2}", price):
              print("Price OK")
          else:
              print("Write it like 12.50")
        `,
        tests: [
          { inputs: ["12.50"], output: "Price OK" },
          { inputs: ["1250"], output: "Write it like 12.50" },
          { inputs: ["12-50"], output: "Write it like 12.50" },
          { inputs: ["0.75"], output: "Price OK" },
          { inputs: ["120.00"], output: "Price OK" },
          { inputs: ["12.5"], output: "Write it like 12.50" },
        ],
        wrong: [py`
          import re

          price = input("Price in rupees: ")
          if re.fullmatch(r"\d+\.\d+", price):
              print("Price OK")
          else:
              print("Write it like 12.50")
        `, py`
          import re

          price = input("Price in rupees: ")
          if re.fullmatch(r"\d\.\d{2}", price):
              print("Price OK")
          else:
              print("Write it like 12.50")
        `],
        hints: [
          md`If «1250» is accepted, ask what the dot in the pattern can stand for. Here it took the digit 2.`,
          md`If «12.5» is accepted after your change, the part after the dot is not fixed to two digits.`,
          md`If «120.00» is refused, the part before the dot allows only one digit.`,
        ],
      },
      {
        id: "m1", kind: "modify", title: "Change it: put +91 in front", optional: true,
        task: md`
          This program removes spaces and hyphens from a mobile number. Change it so it always prints the number with «+91 » in front, exactly once. When the user types «+91 98765-43210», it shows:

          | +91 9876543210
        `,
        starter: py`
          import re

          raw = input("Mobile: ")
          digits = re.sub(r"[ -]", "", raw)
          print(digits)
        `,
        solution: py`
          import re

          raw = input("Mobile: ")
          digits = re.sub(r"[ -]", "", raw)
          digits = digits.replace("+91", "")
          print("+91 " + digits)
        `,
        tests: [
          { inputs: ["98765 43210"], output: "+91 9876543210" },
          { inputs: ["+91 98765-43210"], output: "+91 9876543210" },
          { inputs: ["9876543210"], output: "+91 9876543210" },
          { inputs: ["+919123456780"], output: "+91 9123456780" },
        ],
        wrong: [py`
          import re

          raw = input("Mobile: ")
          digits = re.sub(r"[ -]", "", raw)
          print("+91 " + digits)
        `],
        hints: [
          md`If you see «+91 +919876543210», the number already had «+91». Remove it before you add your own.`,
          md`If the spaces come back, keep the «re.sub» line as it is and work on its result.`,
          md`If there is no space after «+91», check the text you put in front.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: every date in a notice",
        task: md`
          Ask for one line of an exam notice. Use «re.findall» to print every date in it, each on its own line. A date is a day and a month of 1 or 2 digits, then a 4-digit year, with hyphens between, like «4-9-2026» or «18-01-2027». If there is no date, print «No date found». When the user types «Tier 1 on 4-9-2026 and Tier 2 on 18-01-2027», it shows:

          | 4-9-2026
          | 18-01-2027
        `,
        starter: py`

        `,
        solution: py`
          import re

          notice = input("Notice: ")
          dates = re.findall(r"\d{1,2}-\d{1,2}-\d{4}", notice)
          if dates:
              for d in dates:
                  print(d)
          else:
              print("No date found")
        `,
        tests: [
          { inputs: ["Tier 1 on 4-9-2026 and Tier 2 on 18-01-2027"], output: "4-9-2026\n18-01-2027" },
          { inputs: ["Result soon"], output: "No date found" },
          { inputs: ["Pay Rs 100 by 31-12-2026."], output: "31-12-2026" },
          { inputs: ["Hall 2-15-300 opens at 9"], output: "No date found" },
          { inputs: ["1-1-2027"], output: "1-1-2027" },
          { uses: ["method:findall"], msg: md`Today's tool is «re.findall». Use it to get every date at once.` },
        ],
        wrong: [py`
          import re

          notice = input("Notice: ")
          dates = re.findall(r"\d{2}-\d{2}-\d{4}", notice)
          if dates:
              for d in dates:
                  print(d)
          else:
              print("No date found")
        `, py`
          import re

          notice = input("Notice: ")
          dates = re.findall(r"\d+-\d+-\d+", notice)
          if dates:
              for d in dates:
                  print(d)
          else:
              print("No date found")
        `, py`
          import re

          notice = input("Notice: ")
          dates = re.findall(r"\d{1,2}-\d{1,2}-\d{4}", notice)
          for d in dates:
              print(d)
        `],
        hints: [
          md`If «4-9-2026» is missing, your pattern wants exactly two digits for the day and the month.`,
          md`If «2-15-300» is printed, your year part allows any number of digits. A year has exactly 4.`,
          md`If nothing is printed for «Result soon», check the empty list before the loop.`,
        ],
      },
    ],
    keys: [
      md`«re.search» finds the first piece that fits, anywhere in the text. It gives back None when nothing fits, so check before «.group()».`,
      md`«re.findall» gives back a list of every piece. With round brackets, it keeps only the group.`,
      md`«+» is 1 or more. «{1,2}» is 1 or 2. «.» is any character, so write «\.» and «\+» for a real dot and plus.`,
      md`«re.sub(pattern, new, text)» replaces every piece that fits.`,
      md`When the piece never changes, like «+91», plain «.replace()» is enough.`,
    ],
  });

  // ---------------------------------------------------------------- Day 87
  day({
    slug: "forms-you-will-meet",
    title: "Short Forms You Will Meet",
    goal: "Read one-line if, dictionary comprehensions and *args in other people's code.",
    minutes: 45,
    kind: "lesson",
    needs: [26, 27, 29, 33, 64],
    win: "Today you can now read one-line ifs, dictionary and set comprehensions and *args, and turn each one into the long form you already know.",
    learn: [
      md`
        ## The one-line if

        Other people's code uses short forms. Today you learn to **read** them. Most of them are a short way to write something you already know. The first is the **one-line if**: «a if condition else b». It gives back «a» when the condition is True, and «b» when it is False. Guess the output.
      `,
      ex(py`
        for marks in [72, 33, 20]:
            result = "Pass" if marks >= 33 else "Fail"
            print(marks, result)
      `, { predict: ["72 Pass\n33 Pass\n20 Fail", "72 Pass\n33 Fail\n20 Fail", "72 Pass\n33 Pass\n20 Pass"], answer: 0 }),
      md`
        Read it from the middle: first the condition, then the two choices. It is the same as this long form, which you know from Day 9:
      `,
      code(py`
        if marks >= 33:
            result = "Pass"
        else:
            result = "Fail"
      `),
      md`
        ## Comprehensions for dictionaries and sets

        On Day 27 you met the list comprehension, «[x * 2 for x in nums]». With curly brackets and a «key: value» pair, it makes a **dictionary comprehension**. With curly brackets and one value, it makes a **set comprehension**. Guess the output.
      `,
      ex(py`
        prices = {"chai": 12, "samosa": 15, "vada pav": 20}
        for_two = {item: p * 2 for item, p in prices.items()}
        print(for_two)
        orders = ["chai", "samosa", "chai", "chai"]
        kinds = {o.upper() for o in orders}
        print(len(kinds))
      `, { predict: ["{'chai': 24, 'samosa': 30, 'vada pav': 40}\n2", "{'chai': 24, 'samosa': 30, 'vada pav': 40}\n4", "[24, 30, 40]\n2"], answer: 0 }),
      md`
        The dictionary comprehension is the same as: start with «{}», then loop and set «for_two[item] = p * 2». The set keeps no repeats, so «kinds» has only 2 items. We print «len(kinds)» because a set has no fixed order.
      `,
      pause(md`A good place for a short break. Next comes *args and a table of forms to recognise.`),
      md`
        ## *args: any number of arguments

        A star before a parameter, as in «def bill(*prices):», lets the caller give **any number** of arguments. Python collects them into one tuple called «prices». People often name it «*args». Guess the output.
      `,
      ex(py`
        def bill(*prices):
            print(prices)
            return sum(prices)

        print(bill(12, 15))
        print(bill(20, 20, 10))
        print(bill())
      `, { predict: ["(12, 15)\n27\n(20, 20, 10)\n50\n()\n0", "[12, 15]\n27\n[20, 20, 10]\n50\n[]\n0", "(12, 15)\n27\n(20, 20, 10)\n50\nNone"], answer: 0 }),
      md`
        Here are more forms to **recognise**, not to write. When you meet one, you can say what it means.
      `,
      tip(md`
        **Forms to recognise**

        - «def order(**items):» collects keyword arguments into a dictionary.
        - «def add(a: int, b: int) -> int:» has **type hints**: notes about the kind of each value. Python does not check them.
        - «@lru_cache» on the line above a «def» is a **decorator**: it wraps the function with extra behaviour.
        - «for _ in range(3):» uses «_» as a name for a value nobody needs.
        - «"Total {}".format(27)» and «"Total %d" % 27» are older ways to do an f-string.
        - «map(int, parts)» calls «int» on each item. «filter(test, items)» keeps the items that pass. A comprehension does the same job.
      `),
      ex(py`
        def add(a: int, b: int) -> int:
            return a + b

        def order(**items):
            print(items)

        for _ in range(2):
            print("Chai")
        print("Total {}".format(add(12, 15)))
        print("Total %d" % add(12, 15))
        order(chai=2, samosa=3)
        print(sum(map(int, ["4", "5"])))
        print(sorted(filter(lambda m: m >= 33, [40, 20, 90])))
      `, { label: "See each form run" }),
    ],
    quiz: [
      { q: md`What does this program do?`, code: py`
          words = input("Words: ").split()
          sizes = {w: len(w) for w in words}
          print(sizes)
        `, options: [
          "It prints a dictionary from each word to its number of letters",
          "It prints the number of words",
          "It prints a list of word lengths",
        ], answer: 0, verify: false, mono: false,
        explain: md`Curly brackets with «w: len(w)» make a dictionary. Each word is a key, and its length is the value.`,
        why: [null, md`«len(w)» runs on each word, not on the whole list.`, md`Curly brackets with a colon make a dictionary, not a list.`],
        skill: "read" },
      { q: md`What does this program do?`, code: py`
          def top(*scores):
              return max(scores) if scores else 0
        `, options: [
          "It gives back the biggest of any number of scores, or 0 when there are none",
          "It gives back 0 when any score is 0",
          "It works only with exactly one score",
        ], answer: 0, verify: false, mono: false,
        explain: md`«*scores» collects any number of arguments. An empty tuple counts as False, so «top()» gives 0.`,
        why: [null, md`The condition is «scores», the whole tuple. It is False only when the tuple is empty.`, md`The star lets the caller give any number of scores.`],
        skill: "read" },
      { q: md`What does this program do?`, code: py`
          marks = list(map(int, input("Marks: ").split()))
          print(sum(marks))
        `, options: [
          "It reads several marks from one line and prints their total",
          "It prints the marks as text, joined together",
          "It prints how many marks were typed",
        ], answer: 0, verify: false, mono: false,
        explain: md`«map(int, ...)» calls «int» on each piece. It is the same as «[int(x) for x in input().split()]».`,
        why: [null, md`«int» turns each piece into a number before the sum.`, md`«sum» adds the marks. «len» would count them.`],
        skill: "read" },
      { q: md`What does this show?`, code: py`
          cups = 6
          rate = 8 if cups >= 5 else 10
          print(cups * rate)
        `, options: ["48", "60", "8"], answer: 0,
        explain: md`6 is 5 or more, so «rate» is 8, and 6 times 8 is 48.`,
        why: [null, md`60 would need the condition to be False. 6 >= 5 is True.`, md`The program prints «cups * rate», not «rate».`],
        skill: "trace" },
      { q: md`In «for _ in range(3):», what is «_»?`,
        options: ["A name for a value the loop does not use", "A special error", "The number 0"], answer: 0,
        explain: md`«_» is an ordinary name. People use it to say "I do not need this value".`,
        why: [null, md`«_» is not an error. The loop runs 3 times as normal.`, md`«_» still takes 0, 1 and 2, but the loop never reads it.`],
        skill: "memory" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: results in a dictionary",
        task: md`Answer each question without running the program.`,
        code: py`
          marks = {"Asha": 72, "Ravi": 28, "Meena": 33}
          result = {name: "Pass" if m >= 33 else "Fail" for name, m in marks.items()}
          passed = {name for name in result if result[name] == "Pass"}
          count = len(passed)
          print(result["Ravi"], result["Meena"], count)
        `,
        inputs: [],
        ask: [{ line: 2, name: "result" }, { line: 4, name: "count" }, { output: true }],
        hints: [
          md`If you gave Meena «Fail», check the condition: 33 is equal to 33, and «>=» allows equal.`,
          md`If your count is 3, look again at Ravi's mark. It is below 33.`,
          md`If your dictionary has only marks in it, remember that each value is the word chosen by the one-line if.`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: a bill with *prices",
        task: md`Answer each question without running the program.`,
        code: py`
          def bill(*prices):
              total = 0
              for p in prices:
                  total += p
              return total

          a = bill(12, 15)
          b = bill()
          c = bill(20, 20, 10)
          print(a, b, c)
        `,
        inputs: [],
        ask: [{ line: 2, name: "prices" }, { line: 8, name: "b" }, { output: true }],
        hints: [
          md`If your first answer uses square brackets, remember that the star collects the arguments into a tuple.`,
          md`If you said «bill()» crashes, remember that the star allows zero arguments too. The tuple is then empty.`,
          md`If «b» is not 0, check: the loop never runs for an empty tuple, so «total» stays 0.`,
        ],
      },
      {
        id: "p1", kind: "parsons", title: "Arrange: count the passes",
        task: md`
          Put the lines in order and set each indent. The function takes any number of marks and counts the marks of 33 or more. The program prints:

          | 3
        `,
        solution: py`
          def count_passes(*marks):
              passed = 0
              for m in marks:
                  passed += 1 if m >= 33 else 0
              return passed

          print(count_passes(40, 20, 33, 90))
        `,
        distractors: ["def count_passes(marks):", "passed += 1 if m > 33 else 0"],
        indent: "choose",
        tests: [
          { output: "3" },
          { py: py`
              expect("count_passes", (), 0)
              expect("count_passes", (32, 33), 1)
              expect("count_passes", (100, 0, 50), 2)
            ` },
        ],
        hints: [
          md`If you see a TypeError about arguments, the def line has no star, so it takes only one mark.`,
          md`If the answer is 2, the mark of exactly 33 is not counted. Choose the line that allows equal.`,
          md`If the answer is 1 or the function gives None, check that «return» is after the loop, not inside it.`,
        ],
      },
      {
        id: "r1", kind: "modify", title: "Long form 1: Pass or Fail",
        task: md`
          Rewrite «result» in the **long form**: an ordinary «if» and «else» on separate lines, with no one-line if. It must give back the same words. The program still prints:

          | Pass
          | Fail
        `,
        starter: py`
          def result(marks):
              return "Pass" if marks >= 33 else "Fail"

          print(result(45))
          print(result(20))
        `,
        solution: py`
          def result(marks):
              if marks >= 33:
                  return "Pass"
              else:
                  return "Fail"

          print(result(45))
          print(result(20))
        `,
        tests: [
          { output: "Pass\nFail" },
          { py: py`
              expect("result", (33,), "Pass")
              expect("result", (32,), "Fail")
              expect("result", (0,), "Fail")
              expect("result", (100,), "Pass")
            ` },
          { py: py`
              import ast
              tree = ast.parse(CODE)
              assert not any(isinstance(n, ast.IfExp) for n in ast.walk(tree)), "The one-line if is still there. Write «if marks >= 33:» on its own line, then «else:»."
            ` },
        ],
        wrong: [py`
          def result(marks):
              if marks > 33:
                  return "Pass"
              else:
                  return "Fail"

          print(result(45))
          print(result(20))
        `],
        hints: [
          md`If the test says the one-line if is still there, the word «else» is still on the same line as «return».`,
          md`If «result(33)» gives «Fail», your comparison does not allow a mark equal to 33.`,
          md`If you see None, one of the two paths has no «return».`,
        ],
      },
      {
        id: "r2", kind: "modify", title: "Long form 2: prices for two",
        task: md`
          Rewrite «double_prices» in the long form: start with an empty dictionary, fill it with a «for» loop, then return it. Do not use a dictionary comprehension. The program still prints:

          | {'chai': 24, 'samosa': 30}
        `,
        starter: py`
          def double_prices(prices):
              return {item: p * 2 for item, p in prices.items()}

          print(double_prices({"chai": 12, "samosa": 15}))
        `,
        solution: py`
          def double_prices(prices):
              new = {}
              for item, p in prices.items():
                  new[item] = p * 2
              return new

          print(double_prices({"chai": 12, "samosa": 15}))
        `,
        tests: [
          { output: "{'chai': 24, 'samosa': 30}" },
          { py: py`
              expect("double_prices", ({},), {})
              expect("double_prices", ({"vada pav": 20},), {"vada pav": 40})
              expect("double_prices", ({"tea": 10, "bun": 0, "lassi": 35},), {"tea": 20, "bun": 0, "lassi": 70})
            ` },
          { py: py`
              import ast
              tree = ast.parse(CODE)
              assert not any(isinstance(n, ast.DictComp) for n in ast.walk(tree)), "The dictionary comprehension is still there. Start with «{}» and fill it inside a «for» loop."
            ` },
        ],
        wrong: [py`
          def double_prices(prices):
              new = {}
              for item, p in prices.items():
                  new[item] = p * 2
                  return new

          print(double_prices({"chai": 12, "samosa": 15}))
        `, py`
          def double_prices(prices):
              new = {}
              for item, p in prices.items():
                  new[item] = p
              return new

          print(double_prices({"chai": 12, "samosa": 15}))
        `],
        hints: [
          md`If only «chai» comes back, your «return» is inside the loop, so the function stops after the first item.`,
          md`If the prices are not doubled, check the value you store for each item.`,
          md`If an empty dictionary gives None, the «return» line is missing or never reached.`,
        ],
      },
      {
        id: "r3", kind: "modify", title: "Long form 3: the cities",
        task: md`
          Rewrite «cities» in the long form: start with «set()», add each city with «.add()» in a «for» loop, then return the set. Do not use a set comprehension. Each row is «name,city». The program still prints:

          | ['Delhi', 'Pune']
        `,
        starter: py`
          def cities(rows):
              return {row.split(",")[1] for row in rows}

          print(sorted(cities(["Asha,Pune", "Ravi,Delhi", "Meena,Pune"])))
        `,
        solution: py`
          def cities(rows):
              found = set()
              for row in rows:
                  found.add(row.split(",")[1])
              return found

          print(sorted(cities(["Asha,Pune", "Ravi,Delhi", "Meena,Pune"])))
        `,
        tests: [
          { output: "['Delhi', 'Pune']" },
          { py: py`
              expect("cities", ([],), set())
              expect("cities", (["Zoya,Agra"],), {"Agra"})
              expect("cities", (["A,Goa", "B,Goa", "C,Kochi", "D,Goa"],), {"Goa", "Kochi"})
            ` },
          { py: py`
              import ast
              tree = ast.parse(CODE)
              assert not any(isinstance(n, ast.SetComp) for n in ast.walk(tree)), "The set comprehension is still there. Start with «set()» and use «.add()» inside a «for» loop."
            ` },
        ],
        wrong: [py`
          def cities(rows):
              found = set()
              for row in rows:
                  found.add(row.split(",")[0])
              return found

          print(sorted(cities(["Asha,Pune", "Ravi,Delhi", "Meena,Pune"])))
        `, py`
          def cities(rows):
              found = []
              for row in rows:
                  found.append(row.split(",")[1])
              return found

          print(sorted(cities(["Asha,Pune", "Ravi,Delhi", "Meena,Pune"])))
        `],
        hints: [
          md`If you see the names, not the cities, check the position after «split»: the city is the second piece.`,
          md`If «Pune» comes twice, you used a list. A set keeps no repeats.`,
          md`If an empty list of rows gives «{}», remember that «{}» is an empty dictionary. An empty set is «set()».`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: the bulk chai price",
        task: md`
          A chai stall charges 10 rupees a cup, but only 8 rupees a cup for 5 cups or more. Ask for the number of cups. Choose the rate with a **one-line if**, then print the bill. When the user types «6», it shows:

          | Bill: 48
        `,
        starter: py`

        `,
        solution: py`
          cups = int(input("Cups: "))
          rate = 8 if cups >= 5 else 10
          print("Bill:", cups * rate)
        `,
        tests: [
          { inputs: ["6"], output: "Bill: 48" },
          { inputs: ["5"], output: "Bill: 40" },
          { inputs: ["4"], output: "Bill: 40" },
          { inputs: ["1"], output: "Bill: 10" },
          { inputs: ["0"], output: "Bill: 0" },
          { py: py`
              import ast
              tree = ast.parse(CODE)
              assert any(isinstance(n, ast.IfExp) for n in ast.walk(tree)), "Choose the rate with a one-line if, like «rate = ... if ... else ...»."
            `, inputs: ["6"] },
        ],
        wrong: [py`
          cups = int(input("Cups: "))
          rate = 8 if cups > 5 else 10
          print("Bill:", cups * rate)
        `, py`
          cups = int(input("Cups: "))
          if cups >= 5:
              rate = 8
          else:
              rate = 10
          print("Bill:", cups * rate)
        `],
        hints: [
          md`If 5 cups give «Bill: 50», your condition does not count exactly 5 cups as bulk.`,
          md`If the test asks for a one-line if, your rate is chosen with an ordinary «if» block.`,
          md`If you see a TypeError, the number of cups is still text. Convert it before you multiply.`,
        ],
      },
    ],
    keys: [
      md`«a if condition else b» is a one-line if. Read the condition in the middle first.`,
      md`«{k: v for ...}» makes a dictionary, and «{v for ...}» makes a set. Each one is a loop that fills an empty dictionary or set.`,
      md`«def f(*args):» takes any number of arguments, collected into a tuple.`,
      md`Recognise, do not write yet: «**kwargs», type hints, «@decorators», «_», «.format()» and «%», «map» and «filter».`,
      md`When a short form confuses you, rewrite it in the long form on paper.`,
    ],
  });

  // ---------------------------------------------------------------- Day 88
  day({
    slug: "read-code-you-did-not-write",
    title: "Reading Code You Did Not Write",
    goal: "Understand an unfamiliar program by mapping it, and find help on and off this site.",
    minutes: 45,
    kind: "lesson",
    needs: [12, 37, 54, 87],
    win: "Today you can now map a program you did not write, find a new tool with help() and dir(), and check an answer from the internet by running it.",
    learn: [
      md`
        ## Start at the entry point, then make a map

        A long program looks frightening. Do not read it from line 1. First find the **entry point**: the first line that does real work when the file runs. It is usually a call near the bottom, like «main()». Then make a **function map**: for each «def», write its name, what goes in, what comes out, and who calls it. Guess the output.
      `,
      ex(py`
        def load():
            return ["asha", "ravi", "meena"]

        def tidy(names):
            return [n.title() for n in names]

        def show(names):
            for i, n in enumerate(names, start=1):
                print(i, n)

        def main():
            show(tidy(load()))

        main()
      `, { predict: ["1 Asha\n2 Ravi\n3 Meena", "1 asha\n2 ravi\n3 meena", "0 Asha\n1 Ravi\n2 Meena"], answer: 0 }),
      md`
        The entry point is «main()» on the last line. «main» calls «load», then «tidy», then «show». The map on paper looks like this:
      `,
      code(py`
        # load()       nothing in    -> list of names out    called by main
        # tidy(names)  list in       -> new list out         called by main
        # show(names)  list in       -> prints, gives None   called by main
      `),
      md`
        ## help(), dir() and reading a signature

        «dir(value)» lists the names of the tools a value has. «help(tool)» shows how to use one tool. The first line of help is the **signature**: the tool's name and its parameters, with any default values. Run this and read the signature of «center» (Day 40).
      `,
      ex(py`
        print([m for m in dir("chai") if m.startswith("is")])
        help(str.center)
      `, { label: "Ask Python for help" }),
      md`
        The signature says «center(self, width, fillchar=' ', /)». Skip «self» and «/». So «center» needs a width, and «fillchar» is a second, optional value that is a space by default. Guess the output.
      `,
      ex(py`
        print("SSC".center(9, "*"))
        print("SSC".center(9))
      `, { predict: ["***SSC***\n   SSC", "***SSC***\nSSC", "*SSC*\n   SSC"], answer: 0 }),
      pause(md`A good place for a short break. Next: finding help outside this site.`),
      md`
        ## Help outside this site

        When an error stops you, copy the **last line** of the traceback, like «ZeroDivisionError: division by zero», and search for it. The official pages at docs.python.org explain every tool, with its signature. An AI chat can also explain code. But an AI can be wrong, so **run** what it says before you trust it. Suppose an AI says «round(2.5)» gives 3. Guess.
      `,
      ex(py`
        print(round(2.5))
        print(round(3.5))
      `, { label: "Check the AI by running it", predict: ["2\n4", "3\n4", "3\n3"], answer: 0 }),
      md`
        Python rounds an exact half to the **even** number, so 2.5 becomes 2. Running two short lines found the mistake in a few seconds.
      `,
      ask({
        q: md`A traceback ends with these lines. Which line do you copy into a search?`,
        code: py`
          Traceback (most recent call last):
            File "C:\Users\Asha\fees.py", line 7, in <module>
          KeyError: 'samosa'
        `,
        options: ["«KeyError: 'samosa'»", "«Traceback (most recent call last):»", "The «File» line with your folder name"],
        answer: 0, verify: false, mono: false,
        explain: md`The last line names the error. Leave out your own folder names: they do not help, and they are private.`,
        why: [null, md`Every traceback starts with this line, so it tells a search nothing.`, md`Your folder name is only on your laptop. Nobody else has it.`],
      }),
    ],
    quiz: [
      { q: md`What does this program do?`, code: py`
          def initials(full_name):
              return "".join(w[0].upper() for w in full_name.split())

          print(initials(input("Name: ")))
        `, options: [
          "It prints the first letter of each word of a name, in capitals, like SR for Sita Ram",
          "It prints the whole name in capitals",
          "It prints the first word of the name",
        ], answer: 0, verify: false, mono: false,
        explain: md`«w[0]» is the first letter of each word. «.upper()» makes it a capital, and «join» puts the letters together.`,
        why: [null, md`Only «w[0]», one letter of each word, is kept.`, md`The loop goes over every word, not only the first.`],
        skill: "read" },
      { q: md`What does this program do?`, code: py`
          def main():
              fees = read_fees()
              print(sum(fees) / len(fees))

          def read_fees():
              return [int(x) for x in input("Fees: ").split()]

          main()
        `, options: [
          "It reads several fees from one line and prints their average",
          "It prints the total of the fees",
          "It crashes, because read_fees is written after main",
        ], answer: 0, verify: false, mono: false,
        explain: md`The entry point is «main()». By then both functions exist, so the order of the «def» lines does not matter.`,
        why: [null, md`The sum is divided by the count, so this is the average.`, md`A function must exist when the call **runs**. «main()» runs last, after both «def» lines.`],
        skill: "read" },
      { q: md`Which tool lists every method a value has?`,
        options: ["«dir()»", "«help()»", "«type()»"], answer: 0,
        explain: md`«dir("chai")» lists the names. Then «help(str.upper)» explains one of them.`,
        why: [null, md`«help()» explains one tool in detail. «dir()» gives the list of names.`, md`«type()» tells the kind of value, like «str», not its tools.`],
        skill: "memory" },
      { q: md`What does this show?`, code: py`
          print("42".zfill(5))
        `, options: ["00042", "42000", "   42"], answer: 0,
        explain: md`«zfill» puts zeros on the left until the text is 5 characters wide.`,
        why: [null, md`The zeros go on the left, in front of the number.`, md`«zfill» fills with zeros, not spaces.`],
        skill: "trace" },
      { q: md`An AI tells you that «"chai".title()» gives «CHAI». What is the best next step?`,
        options: ["Run it, and trust what Python shows", "Believe it, because the AI sounds sure", "Ask the AI again until it agrees with you"], answer: 0,
        explain: md`Python itself is the judge. One short run gives «Chai».`,
        why: [null, md`An AI can sound sure and still be wrong.`, md`A second answer from the AI is still not proof. Running the code is proof.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "r1", kind: "read", title: "Cold Read: the mock test report",
        task: md`
          A coaching centre's program prints a report for a mock test. You did not write it. First find the entry point. Then make a function map on paper. Then answer the questions. All data is invented.
        `,
        code: py`
          PASS_MARK = 40
          SECTIONS = ["GK", "Maths", "English", "Reasoning"]


          def parse_row(row):
              parts = row.split(",")
              name = parts[0]
              marks = [int(x) for x in parts[1:]]
              return name, marks


          def total(marks):
              return sum(marks)


          def grade(score):
              if score >= 160:
                  return "A"
              if score >= 120:
                  return "B"
              return "C"


          def weakest(marks):
              low = min(marks)
              return SECTIONS[marks.index(low)]


          def report(rows):
              lines = []
              passed = 0
              for row in rows:
                  name, marks = parse_row(row)
                  score = total(marks)
                  if score >= PASS_MARK * len(SECTIONS):
                      passed += 1
                  lines.append("{:<6} {:>3} {} {}".format(name, score, grade(score), weakest(marks)))
              return lines, passed


          def main():
              rows = [
                  "Asha,45,38,42,40",
                  "Ravi,30,25,41,35",
                  "Meena,48,47,44,49",
              ]
              lines, passed = report(rows)
              for line in lines:
                  print(line)
              print("Passed:", passed, "of", len(rows))
              for _ in range(2):
                  print("-" * 20)


          main()
        `,
        questions: [
          { q: md`Where does the program really start working?`,
            options: ["At «main()» on the last line", "At «def parse_row(row):», the first function", "At «PASS_MARK = 40» and nothing after it"],
            answer: 0,
            explain: md`The «def» lines only make functions. The first call, «main()», sets everything going.`,
            skill: "read" },
          { q: md`What does the program print for Ravi?`,
            options: ["Ravi   131 B Maths", "Ravi   131 C Maths", "Ravi   131 B GK"],
            answer: 0,
            explain: md`30 + 25 + 41 + 35 is 131, which is 120 or more, so B. His lowest mark, 25, is the second one: Maths.`,
            skill: "read" },
          { q: md`What does «weakest(marks)» give back?`,
            options: ["The name of the section with the lowest mark", "The lowest mark itself", "The name of the student with the lowest total"],
            answer: 0,
            explain: md`It finds the lowest mark, then its position, then the section name at that position.`,
            skill: "read" },
          { q: md`What do the last two lines of «main» do? They use «_» and «range(2)».`,
            options: ["They print a line of 20 dashes, two times", "They print the numbers 0 and 1", "They do nothing, because «_» is never used"],
            answer: 0,
            explain: md`«_» is a name nobody reads. The loop still runs twice, so the dashes print twice.`,
            skill: "read" },
          { q: md`Which new row would make the program crash?`,
            options: ["«Zoya,45,4O,40,40», with a letter O", "«Zoya,0,0,0,0»", "«Zoya,50,50,50,50»"],
            answer: 0,
            explain: md`«int("4O")» fails with a ValueError inside «parse_row». Zero marks are fine.`,
            skill: "read" },
        ],
      },
      {
        id: "l1", kind: "write", title: "Look It Up 1: roll numbers with zeros",
        task: md`
          Roll numbers must be 5 characters wide, with zeros in front: «42» becomes «00042». A string method does this, but you have not met it. Find it:

          1. Run the starter. It lists every string method. Look for one with «fill» in its name.
          2. Run «help(str.)» with that name after the dot, and read its signature.
          3. Then remove the first line, and print the padded roll number. When the user types «42», it shows:

          | 00042
        `,
        starter: py`
          print(dir(""))
          roll = input("Roll number: ")
        `,
        solution: py`
          roll = input("Roll number: ")
          print(roll.zfill(5))
        `,
        tests: [
          { inputs: ["42"], output: "00042" },
          { inputs: ["7"], output: "00007" },
          { inputs: ["12345"], output: "12345" },
          { inputs: ["123456"], output: "123456" },
          { uses: ["method:zfill"], msg: md`Use the string method you found with «dir»: the one with «fill» in its name.` },
        ],
        wrong: [py`
          roll = input("Roll number: ")
          print("000" + roll)
        `, py`
          roll = input("Roll number: ")
          print(roll.zfill(4))
        `],
        hints: [
          md`If you see a long list in your output, the «dir» line is still there. Remove it once you have found the method.`,
          md`If «7» gives «0007», check the width you give: the roll number must be 5 characters wide.`,
          md`If «12345» gets extra zeros, you are adding zeros yourself. The method adds only as many as it needs.`,
        ],
      },
      {
        id: "l2", kind: "write", title: "Look It Up 2: equal plates of snacks",
        task: md`
          A stall has some samosas and some kachoris. It wants the biggest number that divides both counts exactly. In maths this is the **greatest common divisor**. The module «math» has a tool for it. Find it with «print(dir(math))» and «help». Ask for the two counts, then print the answer. When the user types «12» and «18», it shows:

          | Biggest: 6
        `,
        starter: py`
          import math
          a = int(input("Samosas: "))
          b = int(input("Kachoris: "))
        `,
        solution: py`
          import math
          a = int(input("Samosas: "))
          b = int(input("Kachoris: "))
          print("Biggest:", math.gcd(a, b))
        `,
        tests: [
          { inputs: ["12", "18"], output: "Biggest: 6" },
          { inputs: ["7", "5"], output: "Biggest: 1" },
          { inputs: ["100", "75"], output: "Biggest: 25" },
          { inputs: ["0", "9"], output: "Biggest: 9" },
          { uses: ["call:gcd"], msg: md`Use the tool from «math» whose name is the short form of greatest common divisor.` },
        ],
        wrong: [py`
          import math
          a = int(input("Samosas: "))
          b = int(input("Kachoris: "))
          print("Biggest:", min(a, b))
        `],
        hints: [
          md`If you see a NameError or AttributeError, check the exact tool name in the list from «dir(math)». It has three letters.`,
          md`If «7» and «5» do not give 1, you are not using the math tool yet. 1 is the only number that divides both.`,
          md`If «0» and «9» crash, look again at the help page: the tool works with 0 too.`,
        ],
      },
      {
        id: "l3", kind: "write", title: "Look It Up 3: a notice for a phone screen",
        task: md`
          A notice must fit a narrow phone screen: no line longer than 20 characters, and words never cut in half. The module «textwrap» has a tool called «fill». Run «import textwrap» and «help(textwrap.fill)», and read its signature. Then ask for a notice and print it filled to width 20. When the user types «Bring your admit card», it shows:

          | Bring your admit
          | card
        `,
        starter: py`
          import textwrap
          notice = input("Notice: ")
        `,
        solution: py`
          import textwrap
          notice = input("Notice: ")
          print(textwrap.fill(notice, width=20))
        `,
        tests: [
          { inputs: ["Bring your admit card"], output: "Bring your admit\ncard" },
          { inputs: ["SSC CGL Tier 1 exam starts on 14 September in all cities"], output: "SSC CGL Tier 1 exam\nstarts on 14\nSeptember in all\ncities" },
          { inputs: ["Candidates must reach the hall by 9 am with one photo ID card"], output: "Candidates must\nreach the hall by 9\nam with one photo ID\ncard" },
          { inputs: ["Pens only"], output: "Pens only" },
          { uses: ["call:fill"], msg: md`Use «textwrap.fill» for this one.` },
        ],
        wrong: [py`
          import textwrap
          notice = input("Notice: ")
          print(textwrap.fill(notice))
        `, py`
          import textwrap
          notice = input("Notice: ")
          print(textwrap.fill(notice, width=10))
        `],
        hints: [
          md`If a long notice comes out on one line, you did not give a width. The signature shows the default is 70.`,
          md`If your lines are much shorter than 20 characters, check the number you gave for the width.`,
          md`If you see a NameError, the tool's full name starts with the module name and a dot.`,
        ],
      },
      {
        id: "c1", kind: "modify", title: "A small change: a cap on the late fee",
        task: md`
          This program works out an exam fee with a late fee. You did not write it, so map it first. Then make one change: the **late fee** is never more than 50 rupees. Everything else must still work as before. The program then prints:

          | 0 100
          | 3 130
          | 12 150
        `,
        starter: py`
          FEE = 100


          def late_fee(days_late):
              if days_late <= 0:
                  return 0
              return days_late * 10


          def total_fee(days_late):
              return FEE + late_fee(days_late)


          def main():
              for d in [0, 3, 12]:
                  print(d, total_fee(d))


          main()
        `,
        solution: py`
          FEE = 100


          def late_fee(days_late):
              if days_late <= 0:
                  return 0
              return min(days_late * 10, 50)


          def total_fee(days_late):
              return FEE + late_fee(days_late)


          def main():
              for d in [0, 3, 12]:
                  print(d, total_fee(d))


          main()
        `,
        tests: [
          { output: "0 100\n3 130\n12 150" },
          { py: py`
              assert call("late_fee", 0) == 0, "Old rule broken: no days late should still give a late fee of 0."
              assert call("late_fee", -2) == 0, "Old rule broken: late_fee(-2) should still be 0."
              assert call("late_fee", 3) == 30, "Old rule broken: 3 days late should still be 30 rupees."
              assert call("total_fee", 4) == 140, "Old rule broken: total_fee(4) should still be 140."
            `, label: "Old behaviour" },
          { py: py`
              assert call("late_fee", 5) == 50, "New rule: 5 days late is 50 rupees."
              assert call("late_fee", 6) == 50, "New rule: 6 days late is more than 50, so it should stop at 50."
              assert call("late_fee", 30) == 50, "New rule: the late fee should never be more than 50."
              assert call("total_fee", 30) == 150, "New rule: total_fee(30) should be 100 + 50."
            `, label: "New behaviour" },
        ],
        wrong: [py`
          FEE = 100


          def late_fee(days_late):
              return min(days_late * 10, 50)


          def total_fee(days_late):
              return FEE + late_fee(days_late)


          def main():
              for d in [0, 3, 12]:
                  print(d, total_fee(d))


          main()
        `, py`
          FEE = 100


          def late_fee(days_late):
              if days_late <= 0:
                  return 0
              return days_late * 10


          def total_fee(days_late):
              return min(FEE + late_fee(days_late), 150)


          def main():
              for d in [0, 3, 12]:
                  print(d, total_fee(d))


          main()
        `],
        hints: [
          md`If an old test fails for «late_fee(-2)», you removed the check for days that are not late. Keep it.`,
          md`If the new test says «late_fee(6)» is wrong, the cap is in «total_fee». The task asks for it in the late fee itself.`,
          md`If «12 150» is printed but «late_fee(30)» is not 50, look for the line that gives back the late fee and limit only that line.`,
        ],
      },
    ],
    keys: [
      md`Start at the **entry point**, usually a call like «main()» at the bottom. Then make a function map: name, what goes in, what comes out, who calls it.`,
      md`«dir(value)» lists a value's tools. «help(tool)» explains one. Its first line is the **signature**.`,
      md`In a signature, a parameter with «=» has a default value, so you may leave it out. Skip «self» and «/» for now.`,
      md`Stuck on an error? Search its last line. Read the tool's page at docs.python.org.`,
      md`An AI can be wrong. Run what it says before you trust it.`,
    ],
  });

  // ---------------------------------------------------------------- Day 89
  day({
    slug: "your-own-modules",
    title: "Splitting a Program into Files",
    goal: "Put helper functions in a file of their own and import them, like Python's own modules.",
    minutes: 40,
    needs: [37, 44, 55],
    win: "Today you can now split a program into files and import your own module.",
    learn: [
      md`
        ## A module is just a file

        A **module** is a Python file that other programs can use. On Day 37 you used Python's own modules, «math» and «random». A file you write works the same way. Here is a small helper file called «chai_tools.py»:
      `,
      code(py`
        # chai_tools.py
        PRICE = 12

        def bill(cups):
            return cups * PRICE
      `),
      md`
        In the next example, this file sits in the same folder as the program. Guess what the program prints.
      `,
      ex(py`
        import chai_tools

        print(chai_tools.bill(3))
        print(chai_tools.PRICE)
      `, { files: { "chai_tools.py": py`
        PRICE = 12

        def bill(cups):
            return cups * PRICE
      ` }, predict: ["36\n12", "bill(3)\nPRICE", "NameError"], answer: 0 }),
      md`
        «import chai_tools» finds «chai_tools.py» in the same folder and runs it once. Then you reach its names with a dot, as with «math.sqrt». Write the module name **without** «.py». «from chai_tools import bill» also works, as on Day 37.

        ## Lines that run only when you run the file yourself

        Every file has a hidden name called «__name__», with two underscores on each side. When you run a file yourself, it is «"__main__"». When another file imports it, it is the module's own name. This helper has a test line at the bottom:
      `,
      code(py`
        # marks.py
        def percent(got, total):
            return round(got * 100 / total, 1)

        print("Test:", percent(45, 60))
      `),
      md`Guess what a program that imports «marks» prints.`,
      ex(py`
        import marks

        print(marks.percent(30, 40))
      `, { files: { "marks.py": py`
        def percent(got, total):
            return round(got * 100 / total, 1)

        print("Test:", percent(45, 60))
      ` }, predict: ["Test: 75.0\n75.0", "75.0", "Test: 75.0"], answer: 0 }),
      md`
        The import runs **every** line of «marks.py», so its test line prints too. Put such lines under «if __name__ == "__main__":». Then they run when you run «marks.py» yourself, and stay quiet when another file imports it:
      `,
      code(py`
        # marks.py
        def percent(got, total):
            return round(got * 100 / total, 1)

        if __name__ == "__main__":
            print("Test:", percent(45, 60))
      `),
      ex(py`
        import marks

        print(marks.percent(30, 40))
      `, { files: { "marks.py": py`
        def percent(got, total):
            return round(got * 100 / total, 1)

        if __name__ == "__main__":
            print("Test:", percent(45, 60))
      ` }, predict: ["75.0", "Test: 75.0\n75.0", "__main__"], answer: 0 }),
      md`
        ## A file name that hides a Python module

        If your folder has a file called «random.py», then «import random» finds **your** file, not Python's. This program saves a small file of its own, then rolls a dice. Guess what happens.
      `,
      ex(py`
        with open("random.py", "w") as f:
            f.write("lucky = 7\n")

        import random
        print(random.randint(1, 6))
      `, { error: true, label: "A crash on purpose", predict: ["AttributeError", "A number from 1 to 6", "7"], answer: 0 }),
      md`
        Python found «random.py» in the folder first, and that file has no «randint». The fix is to **rename your file**, for example to «lucky.py». Never name your own file after a module you use, such as «random.py», «csv.py» or «statistics.py».
      `,
      tip(md`On your laptop, keep both files in the same folder, such as «python-days». Then «import chai_tools» works there too.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`print(__name__)`,
        options: ["__main__", "main", "__name__"], answer: 0,
        explain: md`You ran this program yourself, so its «__name__» is «"__main__"».`,
        why: [null, md`There are two underscores on each side: «__main__».`, md`«__name__» is the name of the variable. Its value is printed, not its name.`],
        skill: "trace" },
      { q: md`What does this program do?`, code: py`
          import chai_tools

          for cups in [1, 2, 3]:
              print(cups, chai_tools.bill(cups))
        `, options: ["It prints a bill for 1, 2 and 3 cups, using the bill function from chai_tools.py", "It writes a new file called chai_tools.py", "It prints the code inside chai_tools.py"],
        answer: 0, verify: false, mono: false,
        explain: md`«import» lets the program use the functions in «chai_tools.py». The loop calls «bill» three times.`,
        why: [null, md`«import» reads a file. It never writes one.`, md`«import» runs the file's code. It does not show it.`],
        skill: "read" },
      { q: md`A program stops with «ModuleNotFoundError: No module named 'chai_tools'». What is the most likely cause?`,
        options: ["chai_tools.py is not in the same folder as the program", "A function inside chai_tools.py has a spelling mistake", "The import line should say «import chai_tools.py»"],
        answer: 0, verify: false, mono: false,
        explain: md`Python looks for «chai_tools.py» next to the program. If the file is in another folder, Python cannot find it.`,
        why: [null, md`A mistake inside the file gives a different error, such as SyntaxError. Here Python did not find the file at all.`, md`The module name never has «.py». «import chai_tools.py» is a different mistake.`],
        skill: "debug" },
      { q: md`When do the lines under «if __name__ == "__main__":» run?`,
        options: ["Only when you run that file yourself", "Only when another file imports it", "Every time, like the other lines"],
        answer: 0, verify: false, mono: false,
        explain: md`When you run the file yourself, «__name__» is «"__main__"», so the check is True.`,
        why: [null, md`It is the other way round: an import makes «__name__» the module's name, so the check is False.`, md`The «if» decides. On import, the check is False and those lines are skipped.`],
        skill: "memory" },
      { q: md`You are making a file of helpers for dice games. Which file name is safe?`,
        options: ["«dice_tools.py»", "«random.py»", "«statistics.py»"], answer: 0, verify: false,
        explain: md`«dice_tools» is not the name of a Python module, so it hides nothing.`,
        why: [null, md`«random.py» would hide Python's «random» module from every program in that folder.`, md`«statistics.py» would hide Python's «statistics» module.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "t1", kind: "trace", title: "Be the Computer: a module with tax",
        task: md`
          The program's folder has this file, «shop.py»:

          : TAX = 5
          :
          : def total(price):
          :     return price + price * TAX / 100

          Answer each question without running the program.
        `,
        files: { "shop.py": py`
          TAX = 5

          def total(price):
              return price + price * TAX / 100
        ` },
        code: py`
          import shop
          bill = shop.total(200)
          print(bill, shop.TAX)
        `,
        ask: [{ line: 2, name: "bill" }, { output: true }],
        hints: [
          md`Line 1 runs «shop.py», so «TAX» and «total» now exist inside «shop».`,
          md`«shop.total(200)» works out 200 plus 5 percent of 200. Remember that «/» always gives a decimal number.`,
          md`5 percent of 200 is 10.0, so the bill is 210.0. The print line also shows «shop.TAX».`,
        ],
      },
      {
        id: "t2", kind: "trace", title: "Be the Computer: two names",
        task: md`
          The program's folder has this one-line file, «helper.py»:

          : WHO = __name__

          Answer the question without running the program.
        `,
        files: { "helper.py": "WHO = __name__\n" },
        code: py`
          print(__name__)
          import helper
          print(helper.WHO)
        `,
        ask: [{ output: true }],
        hints: [
          md`The first line prints the name of the program you are running yourself.`,
          md`When «helper.py» is imported, its «__name__» is its module name, not «"__main__"».`,
          md`The program prints «__main__», and then the module name of «helper.py», without «.py».`,
        ],
      },
      {
        id: "p1", kind: "parsons", indent: "choose", title: "Arrange: use a greeting module",
        task: md`
          The folder has «greet.py», with a function «hello(name)» that gives back a greeting. Put the lines in order so the program prints:

          | Namaste, Asha!

          Two lines are wrong and are not needed.
        `,
        files: { "greet.py": "def hello(name):\n    return 'Namaste, ' + name + '!'\n" },
        solution: py`
          import greet
          name = "Asha"
          message = greet.hello(name)
          print(message)
        `,
        distractors: ["import greet.py", "message = hello(name)"],
        tests: [{ output: "Namaste, Asha!" }],
        hints: [
          md`A program must import the module before it uses any of its names.`,
          md`One of the import lines has «.py» in it. A module name never has «.py».`,
          md`The function lives inside the module, so its call needs the module name and a dot in front.`,
        ],
      },
      {
        id: "b1", kind: "bug", noStep: true, title: "Fix: the dice that will not roll",
        task: md`
          This program saves the dice settings in a file of their own, then rolls the dice. It should print a line like:

          | You rolled 4

          It crashes on line 6 instead. Tap the line that really causes the crash, then fix it.
        `,
        starter: py`
          # Save the dice settings in a file of their own
          with open("random.py", "w") as f:
              f.write("sides = 6\n")

          import random
          roll = random.randint(1, 6)
          print("You rolled", roll)
        `,
        bugLines: [2],
        solution: py`
          # Save the dice settings in a file of their own
          with open("dice_settings.py", "w") as f:
              f.write("sides = 6\n")

          import random
          roll = random.randint(1, 6)
          print("You rolled", roll)
        `,
        tests: [
          { py: py`
              import re
              assert re.fullmatch(r"You rolled [1-6]", OUTPUT), f"The program should print a line like 'You rolled 4', but it printed {OUTPUT!r}."
            ` },
          { seed: 5, py: py`
              import re
              assert re.fullmatch(r"You rolled [1-6]", OUTPUT), "The program should roll a number from 1 to 6 every time."
            ` },
        ],
        wrong: [py`
          # Save the dice settings in a file of their own
          with open("random.py", "w") as f:
              f.write("sides = 6\n")

          from random import randint
          roll = randint(1, 6)
          print("You rolled", roll)
        `],
        hints: [
          md`The error says the module has no randint. Python's own random module does have randint, so this is not Python's module.`,
          md`Look at the name of the file the program saves. It is the same as a module the program imports.`,
          md`When the saved file has its own name, not the name of a Python module, the import finds Python's real module again.`,
        ],
      },
      {
        id: "m1", kind: "modify", optional: true, title: "Change it: a quiet module",
        task: md`
          This file is a module: other programs import it to work out bills. Right now its two test lines also print when another program imports it. Put them under «if __name__ == "__main__":», so they run only when you run this file yourself. Run by itself, it still shows:

          | Test 1: 30
          | Test 2: 36

          A hidden test saves your code as «food_tools.py» and imports it. Nothing may print then.
        `,
        starter: py`
          def samosa_bill(count):
              return count * 15

          def chai_bill(cups):
              return cups * 12

          print("Test 1:", samosa_bill(2))
          print("Test 2:", chai_bill(3))
        `,
        solution: py`
          def samosa_bill(count):
              return count * 15

          def chai_bill(cups):
              return cups * 12

          if __name__ == "__main__":
              print("Test 1:", samosa_bill(2))
              print("Test 2:", chai_bill(3))
        `,
        tests: [
          { output: "Test 1: 30\nTest 2: 36" },
          { py: py`
              import contextlib
              import io
              with open("food_tools.py", "w") as f:
                  f.write(CODE)
              shown = io.StringIO()
              with contextlib.redirect_stdout(shown):
                  import food_tools
              assert shown.getvalue() == "", f"When another program imports your file, nothing should print, but it printed {shown.getvalue()!r}. Put the two test lines under the if __name__ check."
              assert food_tools.samosa_bill(4) == 60 and food_tools.chai_bill(1) == 12, "The two functions should still work when the file is imported."
            ` },
        ],
        wrong: [py`
          def samosa_bill(count):
              return count * 15

          def chai_bill(cups):
              return cups * 12

          if __name__ == "__main__":
              print("Test 1:", samosa_bill(2))
          print("Test 2:", chai_bill(3))
        `],
        hints: [
          md`When the file is imported, both test lines still print. Every line at the left edge runs on import.`,
          md`The check for the main program must come before the test lines, and both lines must be inside it.`,
          md`If one test line still prints on import, it is not indented under the check.`,
        ],
      },
      {
        id: "k1", kind: "make", title: "Make: a report that uses a module",
        task: md`
          The folder has «marks_tools.py» with two functions:

          : def percent(got, total):
          :     return round(got * 100 / total, 1)
          :
          : def grade(p):
          :     if p >= 75:
          :         return "A"
          :     if p >= 50:
          :         return "B"
          :     return "C"

          From a blank page, write a program that imports «marks_tools» and prints a line for each student in this list, as name, percent and grade:

          : students = [("Asha", 68, 80), ("Ravi", 30, 80), ("Meera", 72, 80)]

          It should print:

          | Asha: 85.0% A
          | Ravi: 37.5% C
          | Meera: 90.0% A

          A hidden test swaps in a different «marks_tools.py» with other grade rules, so call its functions instead of working out the grades yourself.
        `,
        files: { "marks_tools.py": py`
          def percent(got, total):
              return round(got * 100 / total, 1)

          def grade(p):
              if p >= 75:
                  return "A"
              if p >= 50:
                  return "B"
              return "C"
        ` },
        starter: py``,
        solution: py`
          import marks_tools

          students = [("Asha", 68, 80), ("Ravi", 30, 80), ("Meera", 72, 80)]
          for name, got, total in students:
              p = marks_tools.percent(got, total)
              print(f"{name}: {p}% {marks_tools.grade(p)}")
        `,
        tests: [
          { output: "Asha: 85.0% A\nRavi: 37.5% C\nMeera: 90.0% A" },
          { files: { "marks_tools.py": py`
              def percent(got, total):
                  return round(got * 100 / total, 1)

              def grade(p):
                  if p >= 40:
                      return "Pass"
                  return "Fail"
            ` }, output: "Asha: 85.0% Pass\nRavi: 37.5% Fail\nMeera: 90.0% Pass",
            msg: md`With a different «marks_tools.py», your report did not change its grades. Call «marks_tools.grade» instead of working out the grade yourself.` },
          { uses: ["import"] },
        ],
        wrong: [py`
          students = [("Asha", 68, 80), ("Ravi", 30, 80), ("Meera", 72, 80)]
          for name, got, total in students:
              p = round(got * 100 / total, 1)
              if p >= 75:
                  g = "A"
              elif p >= 50:
                  g = "B"
              else:
                  g = "C"
              print(f"{name}: {p}% {g}")
        `],
        hints: [
          md`If the swapped test fails, your grades do not come from the module. The module's grade function must decide them.`,
          md`If you see a NameError for percent or grade, the call is missing the module name and a dot in front.`,
          md`If the numbers are right but the line looks different, check the punctuation. Look for the colon after the name, the percent sign, and single spaces.`,
        ],
      },
    ],
    keys: [
      md`A **module** is a Python file. «import chai_tools» runs «chai_tools.py» from the same folder; use its names with a dot.`,
      md`Write the module name without «.py»: «import chai_tools», never «import chai_tools.py».`,
      md`Lines under «if __name__ == "__main__":» run only when you run that file yourself, not when it is imported.`,
      md`Never name your own file after a module you use, like «random.py»: Python would import your file instead.`,
    ],
  });

  // ---------------------------------------------------------------- Day 90
  day({
    slug: "pip-one-package",
    title: "pip: Install One Package and Use It",
    goal: "Install a package that other people wrote, and use it in your own program on your laptop.",
    minutes: 30,
    needs: [37, 44, 89],
    win: "Today you can now install a package with pip and use it in your own program.",
    learn: [
      md`
        ## Code other people wrote

        A **package** is code that other people wrote and shared, ready for you to use. Python comes with many modules (Day 37). Thousands more live on a free website called **PyPI**, the Python Package Index. **pip** is the tool that downloads and installs them.

        pip needs your laptop and the internet. It does not work on this page, so today you practise in a pretend Command Prompt, then do it for real.

        ## Installing one package

        In the Command Prompt, you type:

        : python -m pip install tabulate

        «-m pip» means "run Python's pip tool". If «python» does not work on your laptop, type «py» instead, as on Day 43. «tabulate» is a small package that prints neat tables. After it is installed, a program can import it like any module:
      `,
      code(py`
        from tabulate import tabulate

        rows = [["Asha", 82], ["Ravi", 67]]
        print(tabulate(rows, headers=["Name", "Marks"]))
      `),
      md`
        On a laptop with tabulate installed, it prints the names and marks in neat columns, with a line under the headings:

        | Name      Marks
        | ------  -------
        | Asha         82
        | Ravi         67

        ## When it does not work

        - **"not recognized"**: type «py -m pip install tabulate» instead.
        - **"Could not find a version"**: check the spelling of the package name.
        - **«ModuleNotFoundError» when you run your program**: you installed with one Python and ran with another. Install again with the same word you use to run programs, «python» or «py».
        - «python -m pip list» shows every package that is installed.
      `,
      tip(md`On a laptop, words typed after the file name reach your program in a list called «sys.argv». «python marks.py Asha» puts «"Asha"» in «sys.argv[1]». You may meet this in other people's code.`),
      tip(md`Big projects keep their packages in a **virtual environment**: a separate box of packages for one project. You do not need one yet. Just know the name.`),
    ],
    quiz: [
      { q: md`What does pip do?`,
        options: ["It downloads and installs packages that other people wrote", "It makes your program run faster", "It checks your code for mistakes"],
        answer: 0, verify: false, mono: false,
        explain: md`pip fetches a package from PyPI and installs it, so your programs can import it.`,
        why: [null, md`pip only installs packages. It does not change how fast your code runs.`, md`pip does not read your code. Running it and testing it find mistakes.`],
        skill: "memory" },
      { q: md`What does this command do?`, code: py`python -m pip install tabulate`,
        options: ["It downloads the tabulate package and installs it for this Python", "It runs a file called tabulate.py", "It prints a table"],
        answer: 0, verify: false, mono: false,
        explain: md`«-m pip» runs pip, and «install tabulate» tells pip which package to fetch.`,
        why: [null, md`To run a file you would type «python tabulate.py». This line runs pip.`, md`Installing prints messages about the download. Tables come later, from your own program.`],
        skill: "read" },
      { q: md`You installed tabulate, but your program stops with «ModuleNotFoundError: No module named 'tabulate'». What do you check first?`,
        options: ["That you installed it with the same word you use to run programs: python or py", "That your program file is named tabulate.py", "That the package name has .py at the end"],
        answer: 0, verify: false, mono: false,
        explain: md`A laptop can have more than one Python. The package goes into the Python that ran pip.`,
        why: [null, md`A file named «tabulate.py» would hide the real package, as on Day 89. That makes things worse.`, md`Package names never end in «.py».`],
        skill: "debug" },
      { q: md`What does this show?`, code: py`
          import sys
          print(type(sys.argv))
        `,
        options: ["<class 'list'>", "<class 'str'>", "<class 'dict'>"], answer: 0,
        explain: md`«sys.argv» is a list: the file name first, then each word typed after it.`,
        why: [null, md`Each item is text, but «sys.argv» itself is a list of them.`, md`It is a list, in the order the words were typed.`],
        skill: "trace" },
      { q: md`When is it a good idea to install a package?`,
        options: ["When someone has already written and tested the code you need, like neat tables", "Always: every program needs at least one package", "When you want Python to work offline"],
        answer: 0, verify: false, mono: false,
        explain: md`A good package saves you writing and testing that code yourself.`,
        why: [null, md`Most of your programs so far needed no package at all.`, md`pip needs the internet. Packages do not make anything work offline.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "d1", kind: "drill", title: "Command Drill: install tabulate",
        task: md`
          This pretend Command Prompt is already in your «python-days» folder. Type each command and press Enter.

          On a phone, you may skip this. Phone users are excused from the mission below.
        `,
        steps: [
          { say: md`Check that pip is there. Type «python -m pip --version» and press Enter.`,
            expect: ["python -m pip --version", "py -m pip --version"],
            output: "pip 25.3 from C:\\Users\\Asha\\AppData\\Local\\Python\\pythoncore-3.14-64\\Lib\\site-packages\\pip (python 3.14)" },
          { say: md`Install the package. Type «python -m pip install tabulate» and press Enter.`,
            expect: ["python -m pip install tabulate", "py -m pip install tabulate"],
            output: "Collecting tabulate\n  Downloading tabulate-0.9.0-py3-none-any.whl (35 kB)\nInstalling collected packages: tabulate\nSuccessfully installed tabulate-0.9.0" },
          { say: md`See what is installed. Type «python -m pip list» and press Enter.`,
            expect: ["python -m pip list", "py -m pip list"],
            output: "Package  Version\n-------- -------\npip      25.3\ntabulate 0.9.0" },
          { say: md`Run a program that uses it. Type «python marks_table.py» and press Enter.`,
            expect: ["python marks_table.py", "py marks_table.py"],
            output: "Name      Marks\n------  -------\nAsha         82\nRavi         67" },
        ],
        mission: md`
          Now do it for real, with the internet on.

          1. Open the Command Prompt, go into «python-days» with «cd», and type «python -m pip install tabulate». Use «py» instead of «python» if needed.
          2. In IDLE, make a new file with the four lines from the lesson, then add «print("Receipt", 90 * 1001)» at the end. Save it as «marks_table.py» in «python-days».
          3. Press F5. You see the table, then «Receipt 90090». Write the receipt code in your notebook.

          If pip does not work today, read the list in the lesson. Every next day still opens.
        `,
        hints: [
          md`Type the words in the grey box exactly, then press Enter.`,
          md`There is one space on each side of «-m», and between «install» and «tabulate».`,
          md`If python does not work on your laptop, py does the same job.`,
        ],
      },
    ],
    keys: [
      md`A **package** is code other people wrote. **pip** installs packages from PyPI.`,
      md`Install with «python -m pip install tabulate» (or «py -m pip ...») in the Command Prompt, with the internet on.`,
      md`«python -m pip list» shows what is installed.`,
      md`If an import fails after installing, install again with the same word you use to run programs.`,
    ],
  });

  // ---------------------------------------------------------------- Day 91
  day({
    slug: "indian-form-checker",
    title: "Project: Indian Form Checker",
    goal: "Check mobile, PIN, PAN and vehicle numbers with patterns, test them, and keep them in a module.",
    minutes: 50,
    kind: "project",
    needs: [73, 85, 86, 89],
    win: "Today you can now check Indian form fields with patterns, keep the checks in your own module, and prove them with tests. This completes Level 7.",
    learn: [
      md`
        ## The form

        An exam form asks for a mobile number, a PIN code, a PAN and a vehicle number. Each one has a fixed shape:

        - **Mobile**: 10 digits, and the first is 6, 7, 8 or 9.
        - **PIN code**: 6 digits, and the first is not 0.
        - **PAN**: 5 capital letters, 4 digits, then 1 capital letter, like «ABCDE1234F».
        - **Vehicle**: 2 letters for the state, 2 digits, 1 or 2 letters, then 4 digits, like «MH 12 AB 1234». The spaces are optional.

        All numbers here are invented. These checks test the **shape** only, not whether a number is real.
      `,
      ex(py`
        import re

        for pan in ["ABCDE1234F", "ABCDE12345", "abcde1234f"]:
            if re.fullmatch(r"[A-Z]{5}\d{4}[A-Z]", pan):
                print(pan, "fits")
            else:
                print(pan, "does not fit")
      `, { predict: ["ABCDE1234F fits\nABCDE12345 does not fit\nabcde1234f does not fit", "ABCDE1234F fits\nABCDE12345 fits\nabcde1234f does not fit", "ABCDE1234F fits\nABCDE12345 does not fit\nabcde1234f fits"], answer: 0 }),
      md`
        The last character of «ABCDE12345» is a digit, not a letter. «[A-Z]» takes only capital letters, so «abcde1234f» does not fit either.

        ## Four stages

        Stage 1 checks the mobile number and the PIN code. Stage 2 adds the PAN and the vehicle number. In Stage 3 you write tests that must catch 4 broken checkers. Stage 4 starts from a blank page: it imports your checks from «validators.py» and checks a whole form.

        Today teaches nothing new. You use patterns (Days 85 and 86), tests (Days 73 to 75) and modules (Day 89).
      `,
      pause(md`This project usually takes two sittings. Each stage saves when you pass it, so stop after any stage.`),
    ],
    quiz: [
      { q: md`What does this show?`, code: py`
          import re

          for pin in ["560034", "056003"]:
              if re.fullmatch(r"[1-9]\d{5}", pin):
                  print(pin, "ok")
              else:
                  print(pin, "no")
        `, options: ["560034 ok\n056003 no", "560034 ok\n056003 ok", "560034 no\n056003 no"], answer: 0,
        explain: md`«[1-9]» needs a first digit from 1 to 9. «056003» starts with 0, so it does not fit.`,
        why: [null, md`«[1-9]» does not include 0, so «056003» fails.`, md`«560034» starts with 5, then has five more digits, so it fits.`],
        skill: "trace" },
      { q: md`«validators» is the module from Stage 4. What does this function do?`, code: py`
          def bad_fields(form):
              bad = []
              if not validators.valid_mobile(form["mobile"]):
                  bad.append("mobile")
              if not validators.valid_pin(form["pin"]):
                  bad.append("pin")
              return bad
        `, options: ["It gives back the names of the fields whose values do not fit", "It corrects the fields that do not fit", "It gives back True when every field fits"],
        answer: 0, verify: false, mono: false,
        explain: md`For each field that fails its check, the name goes into the list «bad», which is given back.`,
        why: [null, md`It only reads the form. It never changes a value.`, md`It gives back a list of names. An empty list means every field fits.`],
        skill: "read" },
      { q: md`This PAN check accepts «ABCDE1234FG», which has one letter too many. Which change fixes it?`, code: py`
          def valid_pan(text):
              if re.search(r"[A-Z]{5}\d{4}[A-Z]", text):
                  return True
              return False
        `, options: ["Use re.fullmatch instead of re.search", "Change {5} to {6}", "Remove the r before the quotes"],
        answer: 0, verify: false, mono: false,
        explain: md`«re.search» is happy to find the pattern inside a longer text. «re.fullmatch» needs the whole text to fit.`,
        why: [null, md`That would ask for 6 letters at the start, so a real PAN would fail.`, md`Without «r», the backslash in «\d» may not reach the pattern as written. It does not fix the extra letter.`],
        skill: "debug" },
      { q: md`Which pattern fits a 6-digit PIN code that does not start with 0?`,
        options: ["«[1-9]\\d{5}»", "«\\d{6}»", "«[1-9]\\d{6}»"], answer: 0, verify: false,
        explain: md`One digit from 1 to 9, then five more digits: 6 digits in all.`,
        why: [null, md`«\d{6}» also accepts a PIN code that starts with 0.`, md`1 + 6 is 7 digits. Count the pieces.`],
        skill: "memory" },
      { q: md`Your checks are in «validators.py». How does «form_app.py», in the same folder, use them?`,
        options: ["«import validators»", "«import validators.py»", "«open(\"validators.py\")»"], answer: 0, verify: false,
        explain: md`A module is imported by its name, without «.py», as on Day 89.`,
        why: [null, md`The module name never has «.py».`, md`«open» reads the file as text. It does not give you its functions.`],
        skill: "choose" },
    ],
    practice: [
      {
        id: "s1", stage: 1, title: "Stage 1: mobile and PIN",
        task: md`
          Finish two functions. Each one gives back «True» when the whole text fits, and «False» when it does not.

          - «valid_mobile(text)»: 10 digits, and the first is 6, 7, 8 or 9.
          - «valid_pin(text)»: 6 digits, and the first is not 0.

          The program should print:

          | True False

          The hidden tests try many good and bad values, such as «5876543210», «98765 43210» and «011001».
        `,
        starter: py`
          import re

          def valid_mobile(text):
              # 10 digits, and the first digit is 6, 7, 8 or 9
              return False

          def valid_pin(text):
              # 6 digits, and the first digit is not 0
              return False

          print(valid_mobile("9876543210"), valid_pin("011001"))
        `,
        solution: py`
          import re

          def valid_mobile(text):
              if re.fullmatch(r"[6-9]\d{9}", text):
                  return True
              return False

          def valid_pin(text):
              if re.fullmatch(r"[1-9]\d{5}", text):
                  return True
              return False

          print(valid_mobile("9876543210"), valid_pin("011001"))
        `,
        tests: [
          { output: "True False" },
          { py: py`
              for good in ["9876543210", "6000000000", "7123456789"]:
                  expect("valid_mobile", (good,), True)
              for bad in ["5876543210", "987654321", "98765432100", "98765 43210", "98765O3210", ""]:
                  expect("valid_mobile", (bad,), False)
            ` },
          { py: py`
              for good in ["110001", "560034", "999999"]:
                  expect("valid_pin", (good,), True)
              for bad in ["011001", "11000", "1100011", "11 0001", "11000A"]:
                  expect("valid_pin", (bad,), False)
            ` },
        ],
        wrong: [py`
          import re

          def valid_mobile(text):
              if re.fullmatch(r"\d{10}", text):
                  return True
              return False

          def valid_pin(text):
              if re.fullmatch(r"[1-9]\d{5}", text):
                  return True
              return False

          print(valid_mobile("9876543210"), valid_pin("011001"))
        `, py`
          import re

          def valid_mobile(text):
              return re.fullmatch(r"[6-9]\d{9}", text)

          def valid_pin(text):
              return re.fullmatch(r"[1-9]\d{5}", text)

          print(valid_mobile("9876543210"), valid_pin("011001"))
        `],
        hints: [
          md`If a mobile number that starts with 5 is accepted, the first digit is not limited to 6, 7, 8 or 9.`,
          md`A test may say your function gave back a match or None. Then check the pattern, and give back True or False yourself.`,
          md`If 011001 passes, the PIN pattern lets the first digit be 0. If an 11-digit number passes, the pattern is not checking the whole text.`,
        ],
      },
      {
        id: "s2", stage: 2, carry: "s1", title: "Stage 2: PAN and vehicle",
        task: md`
          Keep both functions and add two more, each giving back «True» or «False»:

          - «valid_pan(text)»: 5 capital letters, 4 digits, then 1 capital letter.
          - «valid_vehicle(text)»: 2 capital letters, 2 digits, 1 or 2 capital letters, then 4 digits. A single space is allowed between the parts, but not needed.

          Replace the print line with these three lines:

          : print(valid_mobile("9876543210"), valid_pin("011001"))
          : print(valid_pan("ABCDE1234F"), valid_pan("ABCD1234F"))
          : print(valid_vehicle("MH 12 AB 1234"), valid_vehicle("UP 32 A 4567"), valid_vehicle("MH 123 AB 1234"))

          It should print:

          | True False
          | True False
          | True True False
        `,
        starter: py`
          import re

          def valid_mobile(text):
              if re.fullmatch(r"[6-9]\d{9}", text):
                  return True
              return False

          def valid_pin(text):
              if re.fullmatch(r"[1-9]\d{5}", text):
                  return True
              return False

          print(valid_mobile("9876543210"), valid_pin("011001"))
        `,
        solution: py`
          import re

          def valid_mobile(text):
              if re.fullmatch(r"[6-9]\d{9}", text):
                  return True
              return False

          def valid_pin(text):
              if re.fullmatch(r"[1-9]\d{5}", text):
                  return True
              return False

          def valid_pan(text):
              if re.fullmatch(r"[A-Z]{5}\d{4}[A-Z]", text):
                  return True
              return False

          def valid_vehicle(text):
              if re.fullmatch(r"[A-Z]{2} ?\d{2} ?[A-Z]{1,2} ?\d{4}", text):
                  return True
              return False

          print(valid_mobile("9876543210"), valid_pin("011001"))
          print(valid_pan("ABCDE1234F"), valid_pan("ABCD1234F"))
          print(valid_vehicle("MH 12 AB 1234"), valid_vehicle("UP 32 A 4567"), valid_vehicle("MH 123 AB 1234"))
        `,
        tests: [
          { output: "True False\nTrue False\nTrue True False" },
          { py: py`
              for good in ["ABCDE1234F", "PQRST9876Z"]:
                  expect("valid_pan", (good,), True)
              for bad in ["ABCD1234F", "ABCDE12345", "abcde1234f", "ABCDE1234FG", "ABCDE 1234F"]:
                  expect("valid_pan", (bad,), False)
            ` },
          { py: py`
              for good in ["MH 12 AB 1234", "UP 32 A 4567", "MH12AB1234", "KA 05MN 2025"]:
                  expect("valid_vehicle", (good,), True)
              for bad in ["MH 123 AB 1234", "MH 12 ABC 1234", "mh 12 ab 1234", "MH 12 AB 123", "MH  12 AB 1234", "M 12 AB 1234"]:
                  expect("valid_vehicle", (bad,), False)
            ` },
          { py: py`
              expect("valid_mobile", ("5876543210",), False)
              expect("valid_pin", ("011001",), False)
            ` },
        ],
        wrong: [py`
          import re

          def valid_mobile(text):
              if re.fullmatch(r"[6-9]\d{9}", text):
                  return True
              return False

          def valid_pin(text):
              if re.fullmatch(r"[1-9]\d{5}", text):
                  return True
              return False

          def valid_pan(text):
              if re.fullmatch(r"[A-Z]{5}\d{4}[A-Z]", text):
                  return True
              return False

          def valid_vehicle(text):
              if re.fullmatch(r"[A-Z]{2} ?\d{2} ?[A-Z]{2} ?\d{4}", text):
                  return True
              return False

          print(valid_mobile("9876543210"), valid_pin("011001"))
          print(valid_pan("ABCDE1234F"), valid_pan("ABCD1234F"))
          print(valid_vehicle("MH 12 AB 1234"), valid_vehicle("UP 32 A 4567"), valid_vehicle("MH 123 AB 1234"))
        `],
        hints: [
          md`If «UP 32 A 4567» is refused, the series part does not allow just one letter. It should allow 1 or 2.`,
          md`If «MH12AB1234» is refused, the spaces are not optional yet. A space followed by the mark for "maybe" allows one space or none.`,
          md`If «ABCDE1234FG» is accepted, the PAN check does not look at the whole text.`,
        ],
      },
      {
        id: "c1", stage: 3, kind: "catch", title: "Stage 3: catch 4 broken checkers",
        task: md`
          These are the correct checks from Stages 1 and 2:

          : import re
          :
          : def valid_mobile(text):
          :     return bool(re.fullmatch(r"[6-9]\d{9}", text))
          :
          : def valid_pin(text):
          :     return bool(re.fullmatch(r"[1-9]\d{5}", text))
          :
          : def valid_pan(text):
          :     return bool(re.fullmatch(r"[A-Z]{5}\d{4}[A-Z]", text))
          :
          : def valid_vehicle(text):
          :     return bool(re.fullmatch(r"[A-Z]{2} ?\d{2} ?[A-Z]{1,2} ?\d{4}", text))

          «bool(...)» turns a match into True, and None into False. There are **4 secretly broken versions**. Write asserts that pass on these correct checks and fail on every broken one. Use «assert not ...» for a value that must be refused.
        `,
        target: py`
          import re

          def valid_mobile(text):
              return bool(re.fullmatch(r"[6-9]\d{9}", text))

          def valid_pin(text):
              return bool(re.fullmatch(r"[1-9]\d{5}", text))

          def valid_pan(text):
              return bool(re.fullmatch(r"[A-Z]{5}\d{4}[A-Z]", text))

          def valid_vehicle(text):
              return bool(re.fullmatch(r"[A-Z]{2} ?\d{2} ?[A-Z]{1,2} ?\d{4}", text))
        `,
        broken: [
          // 1: any first digit for a mobile. Differs at "5876543210": True, not False.
          py`
            import re

            def valid_mobile(text):
                return bool(re.fullmatch(r"\d{10}", text))

            def valid_pin(text):
                return bool(re.fullmatch(r"[1-9]\d{5}", text))

            def valid_pan(text):
                return bool(re.fullmatch(r"[A-Z]{5}\d{4}[A-Z]", text))

            def valid_vehicle(text):
                return bool(re.fullmatch(r"[A-Z]{2} ?\d{2} ?[A-Z]{1,2} ?\d{4}", text))
          `,
          // 2: lets a PIN start with 0. Differs at "011001": True, not False.
          py`
            import re

            def valid_mobile(text):
                return bool(re.fullmatch(r"[6-9]\d{9}", text))

            def valid_pin(text):
                return bool(re.fullmatch(r"\d{6}", text))

            def valid_pan(text):
                return bool(re.fullmatch(r"[A-Z]{5}\d{4}[A-Z]", text))

            def valid_vehicle(text):
                return bool(re.fullmatch(r"[A-Z]{2} ?\d{2} ?[A-Z]{1,2} ?\d{4}", text))
          `,
          // 3: PAN with search, so extra characters pass. Differs at "ABCDE1234FG": True, not False.
          py`
            import re

            def valid_mobile(text):
                return bool(re.fullmatch(r"[6-9]\d{9}", text))

            def valid_pin(text):
                return bool(re.fullmatch(r"[1-9]\d{5}", text))

            def valid_pan(text):
                return bool(re.search(r"[A-Z]{5}\d{4}[A-Z]", text))

            def valid_vehicle(text):
                return bool(re.fullmatch(r"[A-Z]{2} ?\d{2} ?[A-Z]{1,2} ?\d{4}", text))
          `,
          // 4: vehicle series must be 2 letters. Differs at "UP 32 A 4567": False, not True.
          py`
            import re

            def valid_mobile(text):
                return bool(re.fullmatch(r"[6-9]\d{9}", text))

            def valid_pin(text):
                return bool(re.fullmatch(r"[1-9]\d{5}", text))

            def valid_pan(text):
                return bool(re.fullmatch(r"[A-Z]{5}\d{4}[A-Z]", text))

            def valid_vehicle(text):
                return bool(re.fullmatch(r"[A-Z]{2} ?\d{2} ?[A-Z]{2} ?\d{4}", text))
          `,
        ],
        starter: py`
          # One assert for each fact. Use assert not for a value that must be refused.
          assert valid_mobile("9876543210")
        `,
        solution: py`
          assert valid_mobile("9876543210")
          assert not valid_mobile("5876543210")
          assert not valid_pin("011001")
          assert not valid_pan("ABCDE1234FG")
          assert valid_vehicle("UP 32 A 4567")
        `,
        hints: [
          md`Each broken checker accepts something it should refuse, or refuses something it should accept. Think about the edge of each rule.`,
          md`Try a mobile number that starts with 5, and a PIN code that starts with 0. Also try a PAN with one letter too many, and a vehicle with a one-letter series.`,
          md`If one version survives, look at which of those four values you have not tested yet.`,
        ],
      },
      {
        id: "s4", stage: 4, kind: "make", title: "Stage 4: check a whole form (blank page)",
        task: md`
          Your checks from Stage 2 are now saved in «validators.py», in the same folder as your program. From a blank page, write a program that imports «validators» and has a function «bad_fields(form)». It gives back a list of the names of the fields that do not fit, in this order: «"mobile"», «"pin"», «"pan"», «"vehicle"».

          Then check this form:

          : form = {"mobile": "9876543210", "pin": "011001", "pan": "ABCDE1234F", "vehicle": "MH 12 AB 1234"}

          If the list is empty, print «All fields are fine». Otherwise print «Please fix:» and the names, with a comma between them. For this form:

          | Please fix: pin

          A hidden test swaps in a different «validators.py», so call its functions instead of writing the patterns again.
        `,
        files: { "validators.py": py`
          import re

          def valid_mobile(text):
              if re.fullmatch(r"[6-9]\d{9}", text):
                  return True
              return False

          def valid_pin(text):
              if re.fullmatch(r"[1-9]\d{5}", text):
                  return True
              return False

          def valid_pan(text):
              if re.fullmatch(r"[A-Z]{5}\d{4}[A-Z]", text):
                  return True
              return False

          def valid_vehicle(text):
              if re.fullmatch(r"[A-Z]{2} ?\d{2} ?[A-Z]{1,2} ?\d{4}", text):
                  return True
              return False
        ` },
        starter: py``,
        solution: py`
          import validators

          def bad_fields(form):
              bad = []
              if not validators.valid_mobile(form["mobile"]):
                  bad.append("mobile")
              if not validators.valid_pin(form["pin"]):
                  bad.append("pin")
              if not validators.valid_pan(form["pan"]):
                  bad.append("pan")
              if not validators.valid_vehicle(form["vehicle"]):
                  bad.append("vehicle")
              return bad

          form = {"mobile": "9876543210", "pin": "011001", "pan": "ABCDE1234F", "vehicle": "MH 12 AB 1234"}
          bad = bad_fields(form)
          if bad:
              print("Please fix:", ", ".join(bad))
          else:
              print("All fields are fine")
        `,
        tests: [
          { output: "Please fix: pin" },
          { py: py`
              good = {"mobile": "6123456789", "pin": "560034", "pan": "PQRST9876Z", "vehicle": "KA 05 MN 2025"}
              expect("bad_fields", (good,), [])
              all_bad = {"mobile": "12345", "pin": "000000", "pan": "pan123", "vehicle": "car"}
              expect("bad_fields", (all_bad,), ["mobile", "pin", "pan", "vehicle"])
              expect("bad_fields", ({"mobile": "9876543210", "pin": "110001", "pan": "ABCDE1234", "vehicle": "UP 32 A 4567"},), ["pan"])
            ` },
          { files: { "validators.py": py`
              def valid_mobile(text):
                  return False

              def valid_pin(text):
                  return True

              def valid_pan(text):
                  return True

              def valid_vehicle(text):
                  return True
            ` }, output: "Please fix: mobile",
            msg: md`With a different «validators.py», your program gave the same answer. Call the functions in «validators» instead of checking the patterns yourself.` },
          { uses: ["import"] },
        ],
        wrong: [py`
          import validators

          def bad_fields(form):
              bad = []
              for name in form:
                  if not validators.valid_pin(form[name]):
                      bad.append(name)
              return bad

          form = {"mobile": "9876543210", "pin": "011001", "pan": "ABCDE1234F", "vehicle": "MH 12 AB 1234"}
          bad = bad_fields(form)
          if bad:
              print("Please fix:", ", ".join(bad))
          else:
              print("All fields are fine")
        `],
        hints: [
          md`If a good form still lists a field, that field is being checked with the wrong function. Each field has its own check.`,
          md`If the swapped test fails, your answers do not come from the module. The module's four functions must decide.`,
          md`If the names come out in the wrong order, check them in the order mobile, pin, pan, vehicle.`,
        ],
      },
      {
        id: "d1", kind: "drill", title: "Laptop Mission: two files, one program",
        task: md`
          This pretend Command Prompt is in your «python-days» folder, which now holds «validators.py» and «form_app.py». Type each command and press Enter.

          On a phone, you may skip this. Phone users are excused from the mission below.
        `,
        steps: [
          { say: md`List the files. Type «dir» and press Enter.`,
            expect: ["dir"],
            output: " Directory of C:\\Users\\Asha\\Documents\\python-days\n\n11-12-2026  06:40 PM               612 form_app.py\n11-12-2026  06:35 PM               448 validators.py" },
          { say: md`Run the form checker. Type «python form_app.py» and press Enter.`,
            expect: ["python form_app.py", "py form_app.py"],
            output: "Please fix: pin" },
        ],
        mission: md`
          Now do it for real.

          1. In IDLE, make a new file with your four checks from Stage 2, without the print lines. Save it as «validators.py» in «python-days».
          2. Make a second new file with your Stage 4 program. Save it as «form_app.py» in the same folder.
          3. Run «form_app.py» with F5. It shows «Please fix: pin».
          4. Change the PIN in the form to «110001» and run it again. The words it prints now are your receipt: write them in your notebook.
        `,
        hints: [
          md`Type the words in the grey box exactly, then press Enter.`,
          md`There is one space between the word python and the file name.`,
          md`If python does not work on your laptop, py does the same job.`,
        ],
      },
      {
        id: "twist", kind: "modify", carry: "s2", optional: true, noStep: true, title: "Own Twist: an Aadhaar-style number",
        task: md`
          Add «valid_aadhaar(text)». An Aadhaar-style number here has 12 digits, and the first is not 0 or 1. It may be written in three groups of 4 with one space between them, like «2345 6789 0123». Check the shape only: all numbers are invented.

          Add this line at the end of the program:

          : print(valid_aadhaar("2345 6789 0123"), valid_aadhaar("1234 5678 9012"))

          The last line it prints should be:

          | True False

          You may add your own check too, such as a 4-digit year. The tests check the four checks from Stage 2 and the new one, so your own idea is safe.
        `,
        starter: py`
          import re

          def valid_mobile(text):
              if re.fullmatch(r"[6-9]\d{9}", text):
                  return True
              return False

          def valid_pin(text):
              if re.fullmatch(r"[1-9]\d{5}", text):
                  return True
              return False

          def valid_pan(text):
              if re.fullmatch(r"[A-Z]{5}\d{4}[A-Z]", text):
                  return True
              return False

          def valid_vehicle(text):
              if re.fullmatch(r"[A-Z]{2} ?\d{2} ?[A-Z]{1,2} ?\d{4}", text):
                  return True
              return False

          print(valid_mobile("9876543210"), valid_pin("011001"))
          print(valid_pan("ABCDE1234F"), valid_pan("ABCD1234F"))
          print(valid_vehicle("MH 12 AB 1234"), valid_vehicle("UP 32 A 4567"), valid_vehicle("MH 123 AB 1234"))
        `,
        solution: py`
          import re

          def valid_mobile(text):
              if re.fullmatch(r"[6-9]\d{9}", text):
                  return True
              return False

          def valid_pin(text):
              if re.fullmatch(r"[1-9]\d{5}", text):
                  return True
              return False

          def valid_pan(text):
              if re.fullmatch(r"[A-Z]{5}\d{4}[A-Z]", text):
                  return True
              return False

          def valid_vehicle(text):
              if re.fullmatch(r"[A-Z]{2} ?\d{2} ?[A-Z]{1,2} ?\d{4}", text):
                  return True
              return False

          def valid_aadhaar(text):
              if re.fullmatch(r"[2-9]\d{3} ?\d{4} ?\d{4}", text):
                  return True
              return False

          print(valid_mobile("9876543210"), valid_pin("011001"))
          print(valid_pan("ABCDE1234F"), valid_pan("ABCD1234F"))
          print(valid_vehicle("MH 12 AB 1234"), valid_vehicle("UP 32 A 4567"), valid_vehicle("MH 123 AB 1234"))
          print(valid_aadhaar("2345 6789 0123"), valid_aadhaar("1234 5678 9012"))
        `,
        tests: [
          { py: py`
              assert LINES and LINES[-1] == "True False", f"The last line should be 'True False', but it is {LINES[-1] if LINES else 'missing'!r}."
            ` },
          { py: py`
              for good in ["234567890123", "2345 6789 0123", "9999 0000 1111"]:
                  expect("valid_aadhaar", (good,), True)
              for bad in ["1234 5678 9012", "0234 5678 9012", "2345 6789 012", "2345678901234", "2345-6789-0123"]:
                  expect("valid_aadhaar", (bad,), False)
            ` },
          { py: py`
              expect("valid_mobile", ("5876543210",), False)
              expect("valid_pin", ("011001",), False)
              expect("valid_pan", ("ABCDE1234FG",), False)
              expect("valid_vehicle", ("UP 32 A 4567",), True)
            ` },
        ],
        wrong: [py`
          import re

          def valid_mobile(text):
              if re.fullmatch(r"[6-9]\d{9}", text):
                  return True
              return False

          def valid_pin(text):
              if re.fullmatch(r"[1-9]\d{5}", text):
                  return True
              return False

          def valid_pan(text):
              if re.fullmatch(r"[A-Z]{5}\d{4}[A-Z]", text):
                  return True
              return False

          def valid_vehicle(text):
              if re.fullmatch(r"[A-Z]{2} ?\d{2} ?[A-Z]{1,2} ?\d{4}", text):
                  return True
              return False

          def valid_aadhaar(text):
              if re.fullmatch(r"\d{4} ?\d{4} ?\d{4}", text):
                  return True
              return False

          print(valid_mobile("9876543210"), valid_pin("011001"))
          print(valid_pan("ABCDE1234F"), valid_pan("ABCD1234F"))
          print(valid_vehicle("MH 12 AB 1234"), valid_vehicle("UP 32 A 4567"), valid_vehicle("MH 123 AB 1234"))
          print(valid_aadhaar("2345 6789 0123"), valid_aadhaar("1234 5678 9012"))
        `],
        hints: [
          md`If «1234 5678 9012» is accepted, the first digit is not limited to 2 to 9.`,
          md`If the version without spaces is refused, the spaces between the groups are not optional yet.`,
          md`Count the digits: one digit from 2 to 9, then 3 more, then two groups of 4, makes 12.`,
        ],
      },
    ],
    keys: [
      md`One small function per field, each giving back True or False, keeps a form checker easy to test.`,
      md`Use «re.fullmatch» to check a whole field. «re.search» would also accept extra characters.`,
      md`Test each pattern with good values and bad ones near the rules: a leading 0, one character too many.`,
      md`Keep the checks in «validators.py» and import them, so every program can use them.`,
    ],
  });
})();
