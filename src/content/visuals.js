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

  /* ---- Algebra II and precalculus (days 20-26) -------------------------- */

  /* m23 Exponential growth. The whole day rests on one claim — that the curve
     overtakes the line and never gives the lead back — and that claim is a
     picture, not a sentence. */
  m23: [{
    page: 1,
    kind: 'curves', series: ['linear', 'exponential'],
    xMax: 6, m: 4, b: 1, base: 2,
    linearLabel: 'y = 4x + 1', expLabel: 'y = 2\u02e3',
    caption: 'the line leads at first, then loses forever',
  }],

  /* m24 Logarithms. The definition is a single sentence read in two
     directions; a two-column grid is that sentence made simultaneous. */
  m24: [{
    page: 0,
    kind: 'grid',
    cols: ['exponent form', 'logarithm form'],
    rows: [
      ['2\u00b3 = 8', 'log\u2082(8) = 3'],
      ['10\u00b2 = 100', 'log\u2081\u2080(100) = 2'],
      ['5\u00b3 = 125', 'log\u2085(125) = 3'],
      ['3\u2074 = 81', 'log\u2083(81) = 4'],
    ],
    caption: 'the same fact, read both ways',
  }],

  /* m25 Sequences. Arithmetic and geometric look alike listed separately and
     obviously different side by side. */
  m25: [{
    page: 0,
    kind: 'grid',
    cols: ['step', 'arithmetic +3', 'geometric \u00d73'],
    rows: [
      ['1', '4', '4'],
      ['2', '7', '12'],
      ['3', '10', '36'],
      ['4', '13', '108'],
      ['5', '16', '324'],
    ],
    caption: 'same start, same number, different operation',
  }],

  /* ---- phase 6: closing the prose-only gap ------------------------------
     94 of 145 days had no picture at all. These use primitives that already
     exist — the point is coverage, not new machinery. Chosen where the idea
     is genuinely a table, a scale or a shape rather than a sentence. */

  m7: [{ page: 1, kind: 'grid', cols: ['written out', 'as a power', 'value'],
    rows: [['2×2×2', '2\u00b3', '8'], ['2\u00b3 × 2\u00b2', '2\u2075', '32'], ['(2\u00b3)\u00b2', '2\u2076', '64'], ['2\u2075 ÷ 2\u00b2', '2\u00b3', '8']],
    caption: 'multiply: add · power of a power: multiply' }],

  m8: [{ page: 1, kind: 'grid', cols: ['ordinary', 'scientific'],
    rows: [['300', '3 × 10\u00b2'], ['45,000', '4.5 × 10\u2074'], ['0.007', '7 × 10\u207b\u00b3'], ['6,020,000', '6.02 × 10\u2076']],
    caption: 'one digit, a decimal, times a power of ten' }],

  m9: [{ page: 1, kind: 'grid', cols: ['n', 'n\u00b2', '\u221a of n\u00b2'],
    rows: [['3', '9', '3'], ['5', '25', '5'], ['8', '64', '8'], ['12', '144', '12']],
    caption: 'a square root simply undoes squaring' }],

  m16: [{ page: 1, kind: 'grid', cols: ['salaries', 'mean', 'median'],
    rows: [['20, 22, 24, 26, 28', '24', '24'], ['20, 22, 24, 26, 900', '198', '24']],
    caption: 'one huge value moves the mean, not the median' }],

  m18: [{ page: 0, kind: 'numberline', min: 0, max: 1, at: 0.5, op: 'gte',
    label: 'probability runs 0 to 1' }],

  m20: [{ page: 1, kind: 'grid', cols: ['quadratic', 'factors', 'solutions'],
    rows: [['x\u00b2 + 5x + 6', '(x+2)(x+3)', '\u22122, \u22123'], ['x\u00b2 \u2212 9', '(x+3)(x\u22123)', '\u22123, 3'], ['x\u00b2 + x \u2212 6', '(x\u22122)(x+3)', '2, \u22123']],
    caption: 'the sign inside a bracket flips in the answer' }],

  c2: [{ page: 1, kind: 'grid', cols: ['place', '8', '4', '2', '1'],
    rows: [['bits', '1', '0', '1', '1'], ['adds', '8', '0', '2', '1']],
    caption: '1011 in binary is 8 + 2 + 1 = 11' }],

  c6: [{ page: 1, kind: 'flow' }],

  ch4: [{ page: 1, kind: 'rearrange',
    before: [['A', 'A'], ['B', 'B']], after: [['A', 'B'], ['A', 'B']], chemical: true,
    caption: 'IONIC \u2014 one atom gives, one receives', note: 'covalent bonds share instead of transfer' }],

  ch5: [{ page: 1, kind: 'grid', cols: ['formula', 'atoms in it'],
    rows: [['H\u2082O', '2 H, 1 O'], ['CO\u2082', '1 C, 2 O'], ['Ca(OH)\u2082', '1 Ca, 2 O, 2 H'], ['H\u2082SO\u2084', '2 H, 1 S, 4 O']],
    caption: 'a bracket doubles everything inside it' }],

  ch8: [{ page: 1, kind: 'grid', cols: ['pH', 'compared with pH 7'],
    rows: [['4', '1,000× more acidic'], ['5', '100× more acidic'], ['6', '10× more acidic'], ['7', 'neutral'], ['9', '100× more basic']],
    caption: 'every step is ten times, not one' }],

  lg3: [{ page: 1, kind: 'grid', cols: ['P', 'Q', 'if P then Q'],
    rows: [['T', 'T', 'T'], ['T', 'F', 'F'], ['F', 'T', 'T'], ['F', 'F', 'T']],
    caption: 'only a true P with a false Q breaks it' }],

  ela7: [{ page: 1, kind: 'grid', cols: ['part', 'means', 'example'],
    rows: [['bio-', 'life', 'biology'], ['-logy', 'study of', 'geology'], ['tele-', 'far off', 'telescope'], ['-scope', 'to look at', 'microscope']],
    caption: 'long words are usually short words joined' }],

  g6: [{ page: 1, kind: 'grid', cols: ['level', 'decides'],
    rows: [['Federal', 'defence, currency, treaties'], ['State', 'schools, roads, licences'], ['Local', 'bins, parks, planning']],
    caption: 'power is shared, not stacked' }],

  g9: [{ page: 1, kind: 'grid', cols: ['tax on', 'pays for'],
    rows: [['income', 'defence, health, benefits'], ['sales', 'state services'], ['property', 'schools, fire, police']],
    caption: 'things nobody could buy alone' }],

  f5: [{ page: 1, kind: 'grid', cols: ['era', 'began', 'life then'],
    rows: [['Precambrian', '4,600 mya', 'single cells'], ['Paleozoic', '541 mya', 'fish, first plants'], ['Mesozoic', '252 mya', 'dinosaurs'], ['Cenozoic', '66 mya', 'mammals, us']],
    caption: 'we arrive in the last sliver of the last one' }],

  f4: [{ page: 1, kind: 'grid', cols: ['method', 'tells you'],
    rows: [['relative dating', 'which is older'], ['absolute dating', 'roughly how many years'], ['index fossils', 'matching layers far apart']],
    caption: 'order and years are different questions' }],

  b3: [{ page: 1, kind: 'grid', cols: ['', 'amount'],
    rows: [['revenue', '£4,000'], ['costs', '\u2212 £3,200'], ['profit', '£800']],
    caption: 'money in is not money kept' }],

  b10: [{ page: 1, kind: 'percentbar', base: 20, prefix: '£',
    steps: [{ pct: 50, label: '50% markup' }],
    caption: 'cost £20, markup 50%, price £30' }],

  bio5: [{ page: 1, kind: 'grid', cols: ['rank', 'example for us'],
    rows: [['Kingdom', 'Animalia'], ['Phylum', 'Chordata'], ['Class', 'Mammalia'], ['Genus', 'Homo'], ['Species', 'sapiens']],
    caption: 'broad at the top, one species at the bottom' }],

  cx1: [{ page: 1, kind: 'curves', series: ['linear', 'exponential'],
    xMax: 8, m: 5, b: 0, base: 2, linearLabel: 'adding 5', expLabel: 'doubling',
    caption: 'binary, half-life and interest are this shape' }],
};