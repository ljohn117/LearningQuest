/* Diagrams for the days he was actually failing.
 *
 * WHY THIS FILE EXISTS
 *
 * The first look at his real progress data found nine finished days scored
 * under 60%. Seven of them contained no picture of any kind — and every one
 * of those seven teaches an idea that is natively spatial. He was being asked
 * to hold a number line, a truth table and a function mapping in his head,
 * from paragraphs, and then answer questions about them.
 *
 * Across the whole curriculum, 92 of 131 days had no visual at all. That is
 * not a content-depth problem, which is what it looked like from the outside.
 * It is a format problem, and it correlates almost exactly with where he is
 * stuck.
 *
 * WHY IT IS A SEPARATE FILE
 *
 * Same reason as spiral.js: the original day prose stays untouched and
 * reviewable, and every addition sits in one place where it can be read as a
 * set. Each entry names the page it belongs on, because a diagram explaining
 * inequalities is worth little appended after the closing callout — it has to
 * land where the idea is introduced.
 *
 * SAFETY
 *
 * Adding a visual block shifts nothing that matters. Visuals carry no progress
 * key, quiz arrays are untouched, and write prompts are now filed by their own
 * id rather than by position, so a block appearing above one cannot orphan
 * what he wrote. scripts/test.mjs asserts all of that.
 */

export const VISUALS = {
  /* m12 Inequalities — scored 2/5, called it hard.
     The open circle IS the difference between < and ≤. No sentence carries
     that; one hole in a line does. */
  m12: [{
    page: 0,
    kind: 'numberline', min: -2, max: 8, at: 3, op: 'gt',
    label: 'x > 3',
  }, {
    page: 2,
    kind: 'numberline', min: -2, max: 8, at: 3, op: 'gte',
    label: 'x ≥ 3',
  }],

  /* lg1 Statements & Truth — scored 2/4, called it hard.
     The point of the day is that only some sentences even have a truth value.
     A grid separating the two is the whole lesson at a glance. */
  lg1: [{
    page: 1,
    kind: 'grid',
    cols: ['sentence', 'a statement?'],
    rows: [
      ['The sky is green.', 'yes — false'],
      ['7 is a prime number.', 'yes — true'],
      ['Close the door.', 'no'],
      ['What time is it?', 'no'],
      ['This sentence is nicer.', 'no'],
    ],
    caption: 'a statement can be true or false',
  }],

  /* lg2 And, Or, Not — scored 2/4.
     This is the canonical truth table. Teaching AND/OR/NOT without one is
     teaching arithmetic without writing any numbers down. */
  lg2: [{
    page: 1,
    kind: 'grid',
    cols: ['P', 'Q', 'P AND Q', 'P OR Q'],
    rows: [
      ['T', 'T', 'T', 'T'],
      ['T', 'F', 'F', 'T'],
      ['F', 'T', 'F', 'T'],
      ['F', 'F', 'F', 'F'],
    ],
    caption: 'AND needs both · OR needs at least one',
  }, {
    page: 2,
    kind: 'grid',
    cols: ['P', 'NOT P'],
    rows: [['T', 'F'], ['F', 'T']],
    caption: 'NOT simply flips it',
  }],

  /* m13 Functions & f(x) — scored 2/5, and he called it "right", which makes
     it the one place his own read of himself failed. Worth the clearest
     possible picture: the definition is a rule about arrows. */
  m13: [{
    page: 0,
    kind: 'mapping',
    inputs: ['1', '2', '3'], outputs: ['3', '5', '7'],
    links: [[0, 0], [1, 1], [2, 2]],
    inLabel: 'x', outLabel: 'y = 2x + 1',
    caption: 'exactly one arrow out of each input — a function',
  }, {
    page: 1,
    kind: 'mapping', bad: true,
    inputs: ['1', '2'], outputs: ['4', '5', '6'],
    links: [[0, 0], [0, 1], [1, 2]],
    inLabel: 'x', outLabel: 'y',
    caption: 'input 1 goes to two outputs — NOT a function',
  }],

  /* g3 Checks and Balances — scored 2/4.
     Six relationships between three branches is exactly the kind of thing
     prose makes into a memory test and a grid makes into one look. */
  g3: [{
    page: 1,
    kind: 'grid', rowH: 26,
    cols: ['this branch', 'can check', 'how'],
    rows: [
      ['Congress', 'President', 'overrides a veto'],
      ['Congress', 'Courts', 'confirms judges'],
      ['President', 'Congress', 'vetoes a bill'],
      ['President', 'Courts', 'appoints judges'],
      ['Courts', 'Congress', 'strikes down a law'],
      ['Courts', 'President', 'rules an act illegal'],
    ],
    caption: 'every branch is checked by both of the others',
  }],

  /* m15 Percent Change — scored 1/4, his worst in the app, and he called it
     hard. The trap is that the second percentage is taken from a different
     number than the first. Invisible in symbols; unmissable when the bar it
     is measured against is visibly shorter. */
  m15: [{
    page: 1,
    kind: 'percentbar',
    base: 100,
    steps: [{ pct: -20, label: '20% off' }, { pct: 20, label: 'then 20% back on' }],
    caption: 'the 20% rise is taken from $80, not $100',
  }],

  /* m2 Proportions & Percents — scored 2/5. It already had a diagram, but of
     equivalent ratios, which is the half of the day he can do. The percent
     half, where he actually loses marks, had nothing. */
  m2: [{
    page: 1,
    kind: 'percentbar',
    base: 40, prefix: '$',
    steps: [{ pct: -30, label: '30% off' }],
    caption: '30% of $40 is $12 — part of the whole',
  }],

  /* ch1 Two Kinds of Change — scored 2/4.
     "Rearranged" and "rebuilt" are near-identical sentences and completely
     different pictures. */
  ch1: [{
    page: 0,
    kind: 'rearrange',
    /* ice melting: identical molecules, genuinely different positions */
    before: [['A', 'B'], ['A', 'B'], ['A', 'B']],
    after: [{ a: ['A', 'B'], dx: -18, dy: 6 }, { a: ['A', 'B'], dx: 14, dy: -7 }, { a: ['A', 'B'], dx: 30, dy: 9 }],
    chemical: false,
    caption: 'PHYSICAL \u2014 same molecules, moved apart',
    note: 'ice to water: nothing new was made',
  }, {
    page: 3,
    kind: 'rearrange',
    before: [['A', 'A'], ['B', 'B']],
    after: [['A', 'B'], ['A', 'B']],
    chemical: true,
    caption: 'CHEMICAL \u2014 regrouped into something new',
    note: 'same four atoms, different substance',
  }],
};
