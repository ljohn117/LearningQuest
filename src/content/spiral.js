/* Spiral callbacks for days that did not have one.
 *
 * The audit found 32 days with no cross-lane callback — Business had none in
 * twelve days, Mathematics none in fourteen of sixteen. The spiral is
 * supposed to be the confidence engine: he should keep running into things
 * he already knows wearing different clothes, because that recognition is
 * what makes a kid who underrates himself feel capable.
 *
 * These are kept here rather than edited into the original content files so
 * the additions are reviewable in one place, and so the prototype prose stays
 * exactly as it was. `index.js` appends each one as a callout on the day's
 * last page.
 *
 * Two rules held while writing these:
 *
 *   1. Point BACKWARD, never forward. A callback to something not yet learned
 *      is just a confusing sentence. Early days in a lane point at Physical
 *      Science, Logic and Earth & Space, which he finished before any of this.
 *   2. Name the actual thing. "This is like math!" is worse than no callback.
 *      Every one of these names a specific idea from a specific lane.
 */

export const SPIRAL = {
  /* ---- Mathematics ------------------------------------------------------ */
  m1: 'Physical Science measured everything in metres per second — distance per ONE second. That is a unit rate. You were already using these before you had the name.',
  m2: 'Physical Science said energy converts but the total never changes. A percentage is just how you say what share of that total went where.',
  m4: 'Logic combined statements with AND and OR to make longer ones tidier. Combining like terms is the same move, done to an expression instead of an argument.',
  m5: 'Physical Science said the total before equals the total after. That is what an equation is — a claim that two sides balance. Whatever you do to one side you must do to the other, or the claim stops being true.',
  m6: 'Earth & Space read climate off a graph rather than off any single day. A graph turns a rule into a shape you can see the whole of at once.',
  m7: 'Earth & Space said gravity weakens with the SQUARE of distance — double the distance, quarter the pull. That exponent was doing all the work, and it is the same exponent you are learning here.',
  mr1: 'Logic proved things by splitting them into cases that covered every possibility. This checkpoint does the same to four topics: show they are one idea, and you have covered all four at once.',
  m9: 'Earth & Space used distance squared for gravity. A square root undoes that — it is how you get back from the effect to the distance that caused it.',
  m10: 'Earth & Space worked out the size of things nobody can walk across. This theorem is one of the oldest tools for exactly that: measure two sides you can reach, calculate the one you cannot.',
  m11: 'Logic said AND means both must be true at once. A system of equations is an AND made of numbers — you are looking for the point where both are satisfied together.',
  m12: 'Logic began with statements that are either true or false. An inequality is exactly that kind of statement: x > 4 is a claim, and any particular x either satisfies it or does not.',
  m13: 'F = m × a takes a mass and an acceleration and gives back exactly one force, every time. That is what a function is. Physical Science handed you one on day three.',
  m14: 'Throw a ball and its path is a parabola — gravity pulling steadily downward while it moves steadily forward. Earth & Space explained why. This explains the shape.',
  mr2: 'Logic said one idea can wear several costumes, and that spotting it is worth more than memorising each costume separately. That is the whole point of a checkpoint.',

  /* ---- Computer Science ------------------------------------------------- */
  c1: 'Logic said a computer can only work with statements that are definitely true or false — no maybe, no roughly. That is not a limitation someone chose. It is what makes a machine able to follow instructions at all.',
  c2: 'Each binary place is worth twice the one before it: 1, 2, 4, 8, 16. Those are powers of two, the same ones Mathematics uses for exponents and Earth & Space uses for inverse squares.',
  c6: 'Logic showed that one counterexample destroys a claim. Debugging is that used on purpose — you hunt for the single input that breaks the program, because finding it is what tells you where the fault is.',
  c8: 'Logic insisted on precise statements because vague ones cannot be evaluated. A computer is the strictest audience you will ever write for: it does exactly what you said, including the part you did not mean.',
  c11: 'This is the if-then from Logic, now doing real work. Same structure, same single failure case — the condition happens and the promised thing does not.',
  c12: 'A loop that never ends is a rule with no stopping condition. Logic had the same problem in circular reasoning: something that keeps going round and never reaches the ground.',

  /* ---- Checkpoints ------------------------------------------------------ */
  phyr1: 'Logic called this proof by cases: cover every possibility and you have covered the whole thing. Six days of physics turn out to be three ideas, and three is a number you can actually hold.',
  lgr1: 'Computer Science built processors out of AND, OR and NOT gates. The toolkit you just assembled is not merely similar to what a computer does — it is literally what a computer is made of.',

  /* ---- Biology ---------------------------------------------------------- */
  bio2: 'Physical Science said an atom is the smallest piece of an element that is still that element. A cell is the same idea for life: cut it in half and you no longer have something living. Every field seems to have a smallest unit that still counts.',
  bio4: 'A 3:1 Punnett result is a ratio, exactly like the ones in Mathematics. Three parts to one part, four parts in total — and the same trap catches people here as there.',
  bio6: 'Physical Science said energy is never destroyed, only converted. A food web is that law drawn as a picture: about 90% is lost as heat at each level, which is why the pyramid narrows so fast.',

  /* ---- English & Writing ------------------------------------------------ */
  ela2: 'Logic said an argument needs premises that actually support its conclusion. Finding the main idea and the evidence for it is the same job, done to a paragraph instead of an argument.',
  ela3: 'A metaphor is not a false statement — it is a different kind of claim entirely. Logic would say it carries no truth value in the literal sense, which is exactly why "her voice was velvet" is not a lie.',
  ela4: 'Logic said knowing what someone wants tells you which parts of their claim to check first. Working out an author’s purpose is that same instinct, aimed at a piece of writing.',
  ela6: 'Logic separated valid from sound: reasoning can hold perfectly while a premise is false. A persuasive essay can be beautifully built and still wrong, which is why you check both halves.',

  /* ---- Business & Money ------------------------------------------------- */
  b1: 'Physical Science had a version of this: energy is finite, so spending it on one thing means not spending it on another. Scarcity is that idea applied to everything else people want.',
  b2: 'Earth & Space described systems that settle toward a balance point and wobble around it rather than sitting still. A price does exactly that, and for the same reason — every push produces a push back.',
  b3: 'Profit is revenue minus cost. That is an algebra expression, and once you can read it as one you can rearrange it the way Mathematics taught: solve for the price you need, or the units you must sell.',

  /* ---- Business & Money, continued -------------------------------------- */
  b4: 'Logic said to test a claim before believing it, and Computer Science said to break a big problem into pieces you can check one at a time. Starting a business is both at once: a guess about what people want, taken apart into small bets you can actually test.',
  b5: 'This is an exponent from Mathematics, quietly doing its work. Interest multiplies by the same factor every year, so it looks dull for a long time and then runs away from you.',
  b6: 'Biology described species competing for the same limited resources, and what happens to the ones that cannot adapt. A market is that, with shops instead of organisms.',
  b7: 'In Biology, an adaptation succeeds when it fits a gap nothing else was filling. A business idea works the same way — not by being best at everything, but by fitting a gap.',
  b8: 'English said register should match the audience: you do not text a friend the way you write to a principal. Knowing your customer is that same instinct, aimed at what you are selling.',
  b9: 'English called this voice — the sense that a specific person is speaking, built by making the same choices consistently until people recognise them. A brand is voice for a company.',
  b10: 'Every pricing decision here is a percentage, which Mathematics already gave you. Discounts, markups and margins are one calculation wearing three different hats.',
  b11: 'Logic separated persuading someone from manipulating them: a real reason survives being checked, a trick does not. Worth keeping straight, because marketing is where that line gets crossed most often.',
  b12: 'English built an argument out of a claim, reasons and evidence. A pitch is that structure, with money as the thing you are asking for at the end.',

  /* ---- Government & Civics ---------------------------------------------- */
  g1: 'Business began with scarcity: limited resources force choices. Government exists for the same reason. If there were enough of everything for everyone, most of what a government does would be unnecessary.',
  g2: 'Biology described organ systems, each doing one job, none able to work alone. Three branches of government are built the same way on purpose — separate functions, mutually dependent.',
  g3: 'Biology called it homeostasis: push a system and something pushes back, holding it steady. Checks and balances are that mechanism written into a constitution instead of a body.',
  g4: 'Logic insisted on precise statements because vague ones cannot be tested. A constitution is written the same way and for the same reason — a rule too vague to check is not really a rule.',
  g6: 'A majority is a fraction, which Mathematics already gave you. More than half of 500 is 251, not 250, and that single vote has decided real elections.',

  /* ---- Fossils & Deep Time ---------------------------------------------- */
  f1: 'Biology gave you a checklist for what counts as alive, and showed that a precise definition settles arguments intuition cannot. A fossil needs the same kind of definition — otherwise every oddly shaped rock qualifies.',
  f2: 'Physical Science said a change of state is always an energy transaction, and that particles get rearranged rather than destroyed. Permineralisation is exactly that, run over millions of years: minerals move in, tissue moves out, the shape survives.',
  f4: 'Half-life is repeated halving, which is an exponent from Mathematics — and the same powers of two that Computer Science uses for binary. Three lanes, one idea.',
};

/* Writing prompts.
 *
 * The English lane taught paragraphs, argument, revision and voice and never
 * once asked for a sentence. These attach a write block to the last page of
 * the days that teach writing.
 *
 * Nothing is graded. Each carries a short checklist he ticks himself after
 * reading his work back — self-assessment, not a mark. Progress never
 * depends on writing anything.
 *
 * Prompts deliberately reach into lanes he has finished, so he is writing
 * about something he already knows rather than inventing a subject and a
 * sentence at the same time. */

export const WRITING = {
  ela5: {
    id: 'w-ela5',
    task: 'Write one paragraph explaining something you learned in another lane to someone who has never seen it.',
    starter: 'Pick anything — half-life, checks and balances, why the moon does not fall. Start with a topic sentence that states the one idea, then support it.',
    words: 50,
    checklist: [
      'My first sentence says what the paragraph is about.',
      'Everything after it supports that one idea.',
      'I gave at least one specific example.',
      'Someone who has not done that lane could follow it.',
    ],
  },
  ela6: {
    id: 'w-ela6',
    task: 'Pick something you actually believe and argue for it in a short paragraph. Then answer the strongest objection.',
    starter: 'State your claim plainly. Give two reasons. Then write "Someone might say..." and answer it fairly.',
    words: 60,
    checklist: [
      'My claim is specific enough to disagree with.',
      'I gave reasons, not just repeated the claim louder.',
      'I stated the objection fairly instead of a weak version of it.',
      'I answered the objection rather than ignoring it.',
    ],
  },
  ela9: {
    id: 'w-ela9',
    task: 'Take the paragraph you wrote on Day 5 and cut it by a quarter without losing anything that matters.',
    starter: 'Look for sentences that repeat, words that add nothing, and examples that do not earn their space. Cutting is the fastest improvement in most writing.',
    words: 40,
    checklist: [
      'It is noticeably shorter than what I started with.',
      'I cut at least one whole sentence, not just words.',
      'The idea is still completely clear.',
      'I did not add anything new to fill the gap.',
    ],
  },
  ela10: {
    id: 'w-ela10',
    task: 'Write the same short message twice — once to a friend, once to a teacher.',
    starter: 'Same information both times. Only the register changes. Two or three sentences each is plenty.',
    words: 50,
    checklist: [
      'Both versions carry the same actual information.',
      'The friend version sounds like how I really talk.',
      'The teacher version is more formal without being stiff.',
      'I can point at the exact words that differ.',
    ],
  },
};

/* Awe numbers for days that already existed.
 *
 * The Teardowns lane introduced the `scale` block — one staggering figure,
 * presented for wonder rather than assessment, labelled "not on the quiz"
 * and enforced as such by the audit. Confining that to one new lane was the
 * wrong call: the move belongs everywhere, and the existing lanes are where
 * he actually spends his time.
 *
 * This is Branch Education's other habit, the one that is not animation. He
 * stops mid-explanation to tell you how absurd the quantity is — 76 billion
 * transistors, a hundred layers, a nanometre of tolerance — and the number
 * is never a test. It is there to make the thing feel enormous.
 *
 * Two rules held while writing these:
 *
 *   1. The figure has to be checkable. Every one of these is a real,
 *      verifiable order of magnitude, not a rounded flourish. He is the kind
 *      of kid who will go and look, and finding a made-up number would cost
 *      more trust than the number ever bought.
 *   2. It has to be about the thing the day just taught. An unrelated fun
 *      fact is an interruption. These land on the last page, right after the
 *      idea they are enormous about.
 *
 * Kept here rather than edited into the content files for the same reason as
 * everything else in this file: the prototype prose stays untouched and the
 * additions stay reviewable in one place. */

export const SCALE = {
  /* ---- Mathematics ------------------------------------------------------ */
  m7: { value: '2⁶³', unit: 'grains on the last square', note: 'The old story about doubling grains of rice on a chessboard ends at about 9 quintillion grains on the final square alone, and roughly 18 quintillion across the whole board — more rice than the world grows in several centuries. That is only 63 doublings. Exponents do not grow fast; they grow unreasonably.' },
  m8: { value: '10⁻¹⁰ to 10²⁶', unit: 'metres, the range science works in', note: 'From the width of an atom to the edge of the observable universe is about 36 orders of magnitude. Scientific notation exists because writing those numbers out would take a page each, and because nobody can feel the difference between 21 zeros and 22 without it.' },

  /* ---- Computer Science ------------------------------------------------- */
  c1: { value: '~100 billion', unit: 'transistors in a modern chip', note: 'The largest chips being made now hold over a hundred billion switches, each a few dozen atoms across, all of which must work. Not most of them. All of them.' },
  c2: { value: '2¹⁰ = 1,024', unit: 'not 1,000', note: 'A kilobyte is 1,024 bytes rather than 1,000, because computers count in twos and 2¹⁰ is the closest power of two to a thousand. Every "missing" gigabyte on a hard drive is that gap, compounding.' },
  c12: { value: '~3 billion', unit: 'instructions per second, per core', note: 'A 3 GHz processor steps through roughly three billion instructions every second. Your loop of ten iterations is over before any physical thing in the room has moved measurably.' },

  /* ---- Physical Science ------------------------------------------------- */
  phy2: { value: '1 part in 10¹⁵', unit: 'of an atom is actually matter', note: 'If a nucleus were a marble you could hold, the atom around it would be about a kilometre across, and everything between would be empty. Everything you have ever touched is almost entirely nothing, held apart by forces.' },
  phy5: { value: '−273.15°C', unit: 'absolute zero', note: 'Temperature is particle motion, so there is a coldest possible temperature — the point where motion stops. There is no matching ceiling. You can always add more energy, but you cannot take away motion that is not there.' },
  phy6: { value: '299,792,458', unit: 'metres per second', note: 'Light covers that distance every second, and the figure is exact — not measured to that precision but defined, because in 1983 the metre was redefined as the distance light travels in 1/299,792,458 of a second.' },

  /* ---- Logic ------------------------------------------------------------ */
  lg6: { value: '1', unit: 'counterexample is enough', note: 'A claim about all swans survives a million confirming sightings and dies to one black swan. That asymmetry is not a quirk of logic — it is the reason science can ever settle anything, and it is why one careful objection outweighs a crowd agreeing.' },

  /* ---- Earth & Space ---------------------------------------------------- */
  es2: { value: '2–5 cm', unit: 'per year — fingernail speed', note: 'Tectonic plates move about as fast as your fingernails grow. Over 200 million years, that unhurried pace is enough to take a single supercontinent apart and scatter it across the planet.' },
  es6: { value: '1,000 m/s', unit: 'sideways, and still falling', note: 'The Moon is falling toward Earth constantly. It never lands because it is also moving sideways at about a kilometre every second, so the ground curves away underneath it exactly as fast as it falls. An orbit is a permanent near-miss.' },

  /* ---- Biology ---------------------------------------------------------- */
  bio2: { value: '~30 trillion', unit: 'cells in your body', note: 'Roughly 30 trillion of them, and about 330 billion are replaced every day. Most of the you that existed a year ago has been quietly swapped out, and you did not notice because the pattern held.' },
  bio4: { value: '2 metres', unit: 'of DNA per cell', note: 'Uncoiled, the DNA in a single cell would stretch about two metres. Multiply by 30 trillion cells and the total inside you would reach the Sun and back, hundreds of times over.' },
  bio9: { value: '~38 trillion', unit: 'bacteria living on and in you', note: 'You are carrying slightly more bacterial cells than human ones. They are not passengers — you cannot digest properly without them, which makes the question of where you stop and they start harder than it first sounds.' },

  /* ---- Chemistry -------------------------------------------------------- */
  ch2: { value: '118', unit: 'elements, and that is all there is', note: 'Every substance you will ever encounter — every rock, gas, living thing, and manufactured object — is built from these and nothing else. Ninety-four occur naturally. The rest had to be made.' },
  ch5: { value: '10²¹', unit: 'water molecules in a single drop', note: 'Roughly a thousand billion billion molecules in one drop of water, each one exactly two hydrogens to one oxygen. Not on average. Every single one.' },
  ch8: { value: '10,000,000×', unit: 'from stomach acid to soap', note: 'Stomach acid sits near pH 2 and soapy water near pH 9. Seven steps on the scale, and each step is ten times — so one is roughly ten million times more acidic than the other, which is why your stomach needs a lining and your hands do not.' },

  /* ---- English & Writing ------------------------------------------------ */
  ela7: { value: '~170,000', unit: 'words currently in use in English', note: 'Plus around 47,000 obsolete ones. Most adults actively use somewhere between 20,000 and 30,000 of them — which means that knowing how prefixes and roots assemble is worth more than memorising lists could ever be.' },

  /* ---- Business & Money ------------------------------------------------- */
  b5: { value: '72 ÷ rate', unit: 'years to double your money', note: 'At 8% interest, money doubles in about nine years. At 2%, thirty-six. That single division is the whole reason a small difference in rate turns into an enormous difference in outcome, given time.' },

  /* ---- Government & Civics ---------------------------------------------- */
  g4: { value: '27', unit: 'amendments since 1789', note: 'Over eleven thousand amendments have been proposed to the US Constitution. Twenty-seven have passed. A document that is deliberately hard to change is making a trade: stability now, in exchange for being slow when it is wrong.' },

  /* ---- Fossils & Deep Time ---------------------------------------------- */
  f5: { value: '4,540,000,000', unit: 'years, and you at the very end', note: 'Lay Earth’s history along a 100-metre pitch and every metre is 45 million years. The dinosaurs occupy roughly the last three and a half metres. All of recorded human history is the final tenth of a millimetre — thinner than a fingernail clipping. Most of the pitch is single-celled life, quietly getting on with it.' },
  f6: { value: '~75%', unit: 'of species gone in the last one', note: 'The extinction that ended the dinosaurs took roughly three quarters of all species with it. Everything alive today — every bird, every mammal, you — descends from the quarter that happened to make it through.' },
};
