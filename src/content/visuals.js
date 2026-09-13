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

  /* ---- phase 6b: closing the remaining gap ------------------------------
     73 days still had no picture. Teardowns and Computer Science were the
     two worst lanes and the two with the clearest right answer: an object
     has a cross-section, and code has parts you can point at. */

  es1: [{ page: 0, kind: 'layers', shape: 'concentric', items: [
    { name: 'crust', note: 'thin, solid rock', color: '#8b6b4a' },
    { name: 'mantle', note: 'hot, slowly flowing', color: '#c2703d' },
    { name: 'outer core', note: 'liquid iron', color: '#e0913f' },
    { name: 'inner core', note: 'solid, under pressure', color: '#f6d06b' },
  ], caption: 'hottest at the centre, and still solid' }],

  td1: [{ page: 1, kind: 'layers', shape: 'concentric', items: [
    { name: 'paint', note: 'just the outside', color: '#f6b73c' },
    { name: 'wood casing', note: 'two glued halves', color: '#b08046' },
    { name: 'graphite core', note: 'carbon in sliding sheets', color: '#4a5060' },
  ], caption: 'no lead anywhere in a pencil' }],

  td2: [{ page: 1, kind: 'grid', cols: ['front teeth', 'back teeth', 'ratio', 'feels'],
    rows: [['48', '12', '4.0', 'hard, fast'], ['48', '24', '2.0', 'middling'], ['48', '48', '1.0', 'easy, slow']],
    caption: 'teeth ÷ teeth — a unit rate on a bike' }],

  td3: [{ page: 1, kind: 'grid', cols: ['ingredient', 'what it does'],
    rows: [['flour', 'gluten, the stretchy net'], ['water', 'wakes the yeast up'], ['yeast', 'living — gives off CO₂'], ['salt', 'slows the yeast down'], ['heat', 'kills yeast, sets the net']],
    caption: 'the holes are gas from something alive' }],

  td4: [{ page: 1, kind: 'layers', items: [
    { name: 'anode (−)', note: 'gives electrons away', color: '#5aa9ff' },
    { name: 'electrolyte', note: 'lets ions cross, not electrons', color: '#3a4154' },
    { name: 'cathode (+)', note: 'accepts the electrons', color: '#f6b73c' },
  ], caption: 'stores an arrangement, not electricity' }],

  td5: [{ page: 1, kind: 'layers', items: [
    { name: 'glass', note: 'what you actually touch', color: '#9fd4f0' },
    { name: 'electrode grid', note: 'senses charge moving', color: '#5aa9ff' },
    { name: 'display', note: 'makes the picture', color: '#6b5bd2' },
    { name: 'backlight', note: 'supplies the light', color: '#f6d06b' },
  ], caption: 'your finger is detected, not felt' }],

  td6: [{ page: 1, kind: 'layers', items: [
    { name: 'reservoir', note: 'rain that already fell', color: '#5aa9ff' },
    { name: 'screening', note: 'removes the big things', color: '#4a7f9e' },
    { name: 'treatment', note: 'settles and disinfects', color: '#3ddc97' },
    { name: 'the tap', note: 'same water, older than dinosaurs', color: '#9fd4f0' },
  ], caption: 'nothing here creates any water' }],

  c1: [{ page: 1, kind: 'grid', cols: ['part', 'its one job'],
    rows: [['input', 'gets data in'], ['processor', 'follows instructions'], ['memory', 'holds things for now'], ['storage', 'keeps things after power off'], ['output', 'shows the result']],
    caption: 'each part does exactly one thing' }],

  c4: [{ page: 1, kind: 'codeshape', lines: [
    { t: 'for (let i = 0; i < 5; i++) {', tag: 'start · test · step' },
    '  print(i)',
    '}',
  ], caption: 'three jobs packed into one line' }],

  c5: [{ page: 1, kind: 'codeshape', lines: [
    { t: 'let score = 0', tag: 'name gets a value' },
    { t: 'score = score + 10', tag: 'same name, new value' },
    'print(score)   // 10',
  ], caption: 'the name stays, the contents change' }],

  c7: [{ page: 1, kind: 'codeshape', lines: [
    'PLAN:  if it is raining, take a coat',
    { t: 'CODE:  if (raining) { takeCoat() }', tag: 'same idea, exact words' },
  ], caption: 'a language is a plan written precisely' }],

  c8: [{ page: 1, kind: 'codeshape', lines: [
    { t: 'console.log("Hello")', tag: 'prints it out' },
    { t: 'console.log(2 + 3)', tag: 'prints 5, not "2 + 3"' },
  ], caption: 'it works out the inside first' }],

  c9: [{ page: 1, kind: 'codeshape', lines: [
    { t: 'let a = 4', tag: 'declare' },
    { t: 'let b = a * 3', tag: 'use it' },
    'console.log(b)   // 12',
  ], caption: 'values flow from one line to the next' }],

  c10: [{ page: 1, kind: 'codeshape', lines: [
    'let name = "Sam"',
    'let age = 12',
    { t: 'console.log(name + " is " + age)', tag: 'joins text' },
  ], caption: 'three lines is already a real program' }],

  c11: [{ page: 1, kind: 'codeshape', lines: [
    { t: 'if (score > 90) {', tag: 'only when true' },
    '  print("great")',
    { t: '} else {', tag: 'every other time' },
    '  print("keep going")',
    '}',
  ], caption: 'exactly one branch ever runs' }],

  c12: [{ page: 1, kind: 'codeshape', lines: [
    { t: 'let i = 0', tag: 'start' },
    { t: 'while (i < 3) {', tag: 'test' },
    '  print(i)',
    { t: '  i = i + 1', tag: 'step — forget this and it never ends' },
    '}',
  ], caption: 'no step means no ending' }],

  /* ---- phase 6b batch 2: maths, physics, logic, biology, chemistry ------ */

  mr1: [{ page: 0, kind: 'grid', cols: ['written as', 'example', 'really is'],
    rows: [['ratio', '3 : 2', 'a comparison'], ['unit rate', '1.50 each', 'a ratio per one'], ['proportion', '3/2 = 9/6', 'two equal ratios'], ['slope', 'rise ÷ run', 'a rate on a graph']],
    caption: 'four names, one underlying idea' }],

  m11: [{ page: 1, kind: 'grid', cols: ['the two lines', 'meet at', 'means'],
    rows: [['cross once', 'one point', 'one solution'], ['parallel', 'never', 'no solution'], ['same line', 'everywhere', 'infinitely many']],
    caption: 'the solution is where both are true' }],

  mr2: [{ page: 0, kind: 'grid', cols: ['operation', 'undone by'],
    rows: [['squaring', 'square root'], ['×10 repeatedly', 'scientific notation'], ['adding to both sides', 'subtracting from both'], ['multiplying out', 'factoring']],
    caption: 'every tool here comes with a reverse' }],

  m17: [{ page: 1, kind: 'grid', cols: ['choices', 'ways', 'total'],
    rows: [['2 shirts', '×', '2'], ['3 trousers', '×', '6'], ['4 hats', '×', '24'], ['2 coats', '×', '48']],
    caption: 'independent choices multiply, never add' }],

  m19: [{ page: 2, kind: 'grid', cols: ['side', 'area', 'volume'],
    rows: [['1', '1', '1'], ['2', '4', '8'], ['3', '9', '27'], ['4', '16', '64']],
    caption: 'one doubles, one quadruples, one ×8' }],

  mr3: [{ page: 0, kind: 'grid', cols: ['the trap', 'what to ask'],
    rows: [['percent change', 'percent OF what?'], ['averages', 'which average?'], ['counting', 'do these multiply?'], ['probability', 'does it remember?'], ['scaling', 'area or volume?']],
    caption: 'compared to what, and did it stay still' }],

  m21: [{ page: 2, kind: 'grid', cols: ['b² − 4ac', 'real solutions', 'the curve'],
    rows: [['positive', '2', 'crosses twice'], ['zero', '1', 'just touches'], ['negative', '0', 'never reaches it']],
    caption: 'the sign tells you before you finish' }],

  m22: [{ page: 1, kind: 'grid', cols: ['expression', 'simplifies to', 'but x ≠'],
    rows: [['(x²−9)/(x+3)', 'x − 3', '−3'], ['(2x+6)/2', 'x + 3', '—'], ['5/(x−4)', '5/(x−4)', '4']],
    caption: 'simplifying does not permit a value' }],

  mr4: [{ page: 0, kind: 'grid', cols: ['operation', 'its undo'],
    rows: [['multiplying', 'factoring'], ['squaring', 'square root'], ['raising a base', 'logarithm'], ['a ratio in a triangle', 'inverse trig']],
    caption: 'the undo is where the power sits' }],

  phy3: [{ page: 1, kind: 'grid', cols: ['forces on it', 'what happens'],
    rows: [['balanced', 'speed and direction stay'], ['unbalanced, forwards', 'speeds up'], ['unbalanced, backwards', 'slows down'], ['unbalanced, sideways', 'changes direction']],
    caption: 'force changes motion, not causes it' }],

  phy4: [{ page: 1, kind: 'grid', cols: ['stored as', 'becomes'],
    rows: [['chemical (food)', 'movement and heat'], ['height (a raised ball)', 'movement as it falls'], ['movement', 'heat and sound on impact'], ['light from the Sun', 'sugar in a leaf']],
    caption: 'never lost, only moved or changed form' }],

  phy5: [{ page: 1, kind: 'grid', cols: ['', 'temperature', 'total heat'],
    rows: [['a spark', 'very high', 'tiny'], ['warm bath', 'modest', 'enormous']],
    caption: 'how fast, against how many' }],

  phy6: [{ page: 1, kind: 'spectrum', left: 'long wave', right: 'short wave',
    zones: [{ label: 'radio' }, { label: 'micro' }, { label: 'infra' }, { label: 'visible' }, { label: 'UV' }, { label: 'X-ray' }],
    caption: 'one family — only the wavelength differs' }],

  phy7: [{ page: 2, kind: 'numberline', min: -5, max: 5, at: 0, op: 'gte',
    label: 'velocity: sign means direction' }],

  phy8: [{ page: 2, kind: 'grid', cols: ['know', 'want', 'use'],
    rows: [['m and a', 'F', 'F = m × a'], ['F and m', 'a', 'a = F ÷ m'], ['F and a', 'm', 'm = F ÷ a']],
    caption: 'one equation, rearranged three ways' }],

  lg5: [{ page: 1, kind: 'grid', cols: ['fallacy', 'sounds like'],
    rows: [['circular', 'it is true because it is true'], ['false dilemma', 'either this or you hate X'], ['ad hominem', 'you would say that'], ['hasty generalisation', 'I met one, so they all are']],
    caption: 'each one skips the actual argument' }],

  lg6: [{ page: 1, kind: 'grid', cols: ['claim', 'one example', 'one counterexample'],
    rows: [['all swans are white', 'supports it', 'destroys it'], ['some swans are white', 'proves it', 'cannot touch it']],
    caption: 'all and some need opposite evidence' }],

  bio1: [{ page: 1, kind: 'grid', cols: ['', 'cells', 'grows', 'reproduces'],
    rows: [['a rabbit', 'yes', 'yes', 'yes'], ['a flame', 'no', 'yes', 'no'], ['a crystal', 'no', 'yes', 'no']],
    caption: 'growing alone is not being alive' }],

  bio3: [{ page: 1, kind: 'mapping',
    inputs: ['CO₂', 'water', 'light'], outputs: ['sugar', 'oxygen'],
    links: [[0, 0], [1, 0], [2, 0], [1, 1]],
    inLabel: 'goes in', outLabel: 'comes out',
    caption: 'respiration runs this exact arrow backwards' }],

  bio7: [{ page: 1, kind: 'grid', cols: ['step', 'what happens'],
    rows: [['variation', 'individuals already differ'], ['selection', 'some survive more often'], ['inheritance', 'their young inherit it'], ['time', 'the difference accumulates']],
    caption: 'the variation has to come first' }],

  bio9: [{ page: 1, kind: 'grid', cols: ['bacteria that', 'do this'],
    rows: [['live in your gut', 'digest what you cannot'], ['live in soil', 'fix nitrogen for plants'], ['make food', 'yoghurt, cheese, bread'], ['cause disease', 'a small minority']],
    caption: 'most are harmless or necessary' }],

  bio10: [{ page: 1, kind: 'grid', cols: ['claim', 'testable?'],
    rows: [['plants grow faster in light', 'yes — grow some in dark'], ['this plant is lucky', 'no — nothing could show it false'], ['heavier things fall faster', 'yes — and they do not']],
    caption: 'if nothing could disprove it, it is idle' }],

  ch7: [{ page: 1, kind: 'grid', cols: ['', 'bonds', 'feels'],
    rows: [['exothermic', 'forming wins', 'hot'], ['endothermic', 'breaking wins', 'cold']],
    caption: 'breaking costs energy, forming returns it' }],

  ch9: [{ page: 1, kind: 'rearrange',
    before: [['A', 'A'], ['B', 'B']],
    after: [{ a: ['A'], dx: -14 }, { a: ['B'], dx: 8 }, { a: ['A'], dx: 22 }, { a: ['B'], dx: 36 }],
    chemical: false,
    caption: 'MIXTURE — together, not bonded',
    note: 'a compound would be joined in a fixed ratio' }],

  ch10: [{ page: 1, kind: 'grid', cols: ['increase', 'because'],
    rows: [['temperature', 'faster, harder collisions'], ['concentration', 'more collisions happen'], ['surface area', 'more of it is exposed'], ['a catalyst', 'lowers the energy needed']],
    caption: 'all four are about collisions' }],

  ch11: [{ page: 1, kind: 'grid', cols: ['element', 'atomic mass', 'one mole weighs'],
    rows: [['carbon', '12', '12 g'], ['oxygen', '16', '16 g'], ['sulfur', '32', '32 g'], ['calcium', '40', '40 g']],
    caption: 'the table is also a weighing chart' }],

  ch12: [{ page: 1, kind: 'grid', cols: ['formula', 'adds up as', 'g/mol'],
    rows: [['H₂O', '2(1) + 16', '18'], ['CO₂', '12 + 2(16)', '44'], ['Ca(OH)₂', '40 + 2(17)', '74']],
    caption: 'a bracket multiplies everything inside' }],

  ch13: [{ page: 1, kind: 'grid', cols: ['2H₂', '+ O₂', '→ 2H₂O'],
    rows: [['2 mol', '1 mol', '2 mol'], ['4 mol', '2 mol', '4 mol'], ['10 mol', '5 mol', '10 mol']],
    caption: 'the ratio holds at every scale' }],

  /* ---- phase 6b batch 3: the last of them -------------------------------
     English, Business, Civics, Fossils. Several of these are ranges rather
     than tables — tone and formality sit somewhere along a line, not in a
     box — so `spectrum` does the work a grid would have flattened. */

  ela1: [{ page: 1, kind: 'grid', cols: ['fragment', 'missing', 'complete'],
    rows: [['The tall dog', 'a predicate', 'The tall dog barked'], ['Ran down the road', 'a subject', 'The fox ran down the road'], ['Because it rained', 'a main clause', 'We stayed in because it rained']],
    caption: 'a sentence needs both halves' }],

  ela2: [{ page: 1, kind: 'grid', cols: ['', 'example'],
    rows: [['topic', 'sharks'], ['main idea', 'sharks are vital to oceans'], ['detail', 'they keep fish numbers in check'], ['evidence', 'reefs decline when sharks go']],
    caption: 'the topic is not the point being made' }],

  ela3: [{ page: 1, kind: 'grid', cols: ['device', 'example', 'literally?'],
    rows: [['simile', 'brave as a lion', 'no'], ['metaphor', 'the city never sleeps', 'no'], ['hyperbole', 'a ton of homework', 'no'], ['literal', 'the city is busy', 'yes']],
    caption: 'the reader does a little work — that is the point' }],

  ela4: [{ page: 1, kind: 'spectrum', left: 'casual', right: 'formal',
    zones: [{ label: 'text', note: 'a mate' }, { label: 'email', note: 'a teacher' }, { label: 'essay', note: 'a marker' }, { label: 'letter', note: 'a stranger' }],
    caption: 'same facts, different reader, different tone' }],

  ela8: [{ page: 1, kind: 'grid', cols: ['source', 'how they know', 'watch for'],
    rows: [['a diary', 'was there', 'one point of view'], ['a historian', 'read many accounts', 'their argument'], ['a company', 'sells the thing', 'a motive'], ['a textbook', 'summarised others', 'age of the facts']],
    caption: 'primary means closer, not correct' }],

  ela9: [{ page: 1, kind: 'grid', cols: ['', 'changes'],
    rows: [['revising', 'what it says, and its shape'], ['editing', 'sentences and word choice'], ['proofreading', 'spelling and punctuation']],
    caption: 'proofreading first wastes the effort' }],

  ela10: [{ page: 1, kind: 'spectrum', left: 'plain', right: 'distinctive',
    zones: [{ label: 'facts' }, { label: 'words' }, { label: 'rhythm' }, { label: 'voice' }],
    caption: 'voice is what is left when facts match' }],

  b1: [{ page: 1, kind: 'grid', cols: ['', 'need', 'want'],
    rows: [['water', 'yes', ''], ['a phone', '', 'yes'], ['shelter', 'yes', ''], ['a newer phone', '', 'yes']],
    caption: 'scarcity is why the line matters at all' }],

  b4: [{ page: 1, kind: 'grid', cols: ['question', 'a weak answer', 'a strong one'],
    rows: [['what problem?', 'people like nice things', 'my street has no bike repair'], ['who for?', 'everyone', 'commuters on this road'], ['why you?', 'I want to', 'I already fix bikes']],
    caption: 'specific beats ambitious, every time' }],

  b5: [{ page: 1, kind: 'curves', series: ['linear', 'exponential'],
    xMax: 30, m: 50, b: 1000, base: 1.05, expLabel: 'compound 5%', linearLabel: 'simple 5%',
    caption: 'the gap only opens up with time' }],

  b6: [{ page: 1, kind: 'grid', cols: ['', 'what it does'],
    rows: [['marketing', 'tells people the value'], ['competition', 'forces the value up'], ['price', 'signals what it is worth'], ['brand', 'makes the promise repeatable']],
    caption: 'none of these work without a real product' }],

  b7: [{ page: 1, kind: 'grid', cols: ['noticed', 'could become'],
    rows: [['nothing opens before 8', 'an early café'], ['bins overflow on Fridays', 'a collection round'], ['nobody fixes zips', 'a repair service']],
    caption: 'annoyances are unpriced problems' }],

  b8: [{ page: 1, kind: 'funnel' }],

  b9: [{ page: 1, kind: 'grid', cols: ['', 'is the brand?'],
    rows: [['the logo', 'no — just how you spot it'], ['the name', 'no — just a label'], ['the promise kept', 'yes'], ['the advert spend', 'no']],
    caption: 'a brand is a promise people rely on' }],

  b12: [{ page: 1, kind: 'grid', cols: ['sentence', 'says'],
    rows: [['1', 'the problem, specifically'], ['2', 'who has it'], ['3', 'what you do about it'], ['4', 'why you, with a number']],
    caption: 'no warm-up — start at the problem' }],

  g1: [{ page: 1, kind: 'grid', cols: ['without it', 'with it'],
    rows: [['anyone can take anything', 'property means something'], ['no shared roads', 'roads everyone uses'], ['disputes end in force', 'disputes end in court']],
    caption: 'order, protection, shared things' }],

  g4: [{ page: 1, kind: 'grid', cols: ['right', 'protects you from'],
    rows: [['1st', 'being silenced by government'], ['4th', 'searches without cause'], ['5th', 'being made to accuse yourself'], ['8th', 'cruel punishment']],
    caption: 'each one restrains the government' }],

  g5: [{ page: 2, kind: 'grid', cols: ['stage', 'can it die here?'],
    rows: [['introduced', 'yes — most do'], ['committee', 'yes'], ['House vote', 'yes'], ['Senate vote', 'yes'], ['President', 'yes — unless overridden']],
    caption: 'stopping bills is the design, not a fault' }],

  g7: [{ page: 1, kind: 'spectrum', left: 'fully protected', right: 'not protected',
    zones: [{ label: 'opinion' }, { label: 'protest' }, { label: 'insult' }, { label: 'threat' }],
    caption: 'a right ends where it overrides another' }],

  g8: [{ page: 1, kind: 'grid', cols: ['', 'court does'],
    rows: [['a new question', 'decides, and sets precedent'], ['a similar case', 'follows the earlier ruling'], ['a wrong precedent', 'can overturn it']],
    caption: 'stability, but not permanence' }],

  g10: [{ page: 1, kind: 'grid', cols: ['ask', 'about a claim'],
    rows: [['who benefits?', 'everyone wants something'], ['what would disprove it?', 'if nothing, be wary'], ['compared to what?', 'numbers need a baseline'], ['who is left out?', 'of the group counted']],
    caption: 'the same toolkit as the Logic lane' }],

  f1: [{ page: 1, kind: 'grid', cols: ['is it a fossil?', ''],
    rows: [['a bone turned to stone', 'yes'], ['a footprint in rock', 'yes — a trace fossil'], ['a bone from last year', 'no'], ['an oddly shaped rock', 'no']],
    caption: 'evidence of ancient life, not just old' }],

  f2: [{ page: 1, kind: 'layers', items: [
    { name: 'the animal dies', note: 'and must be buried fast', color: '#8b6b4a' },
    { name: 'sediment covers it', note: 'soft parts decay away', color: '#b08046' },
    { name: 'minerals seep in', note: 'replacing the hard parts', color: '#c2703d' },
    { name: 'uplift and erosion', note: 'brings it back to the surface', color: '#e0913f' },
  ], caption: 'each step has to go right, and rarely does' }],

  f6: [{ page: 1, kind: 'grid', cols: ['extinction', 'roughly', 'what went'],
    rows: [['Permian', '252 mya', 'about 90% of species'], ['Triassic', '201 mya', 'many big reptiles'], ['Cretaceous', '66 mya', 'the non-bird dinosaurs']],
    caption: 'birds are the branch that survived' }],

  f7: [{ page: 1, kind: 'grid', cols: ['matching by', 'works?'],
    rows: [['rock type', 'no — sandstone forms everywhere'], ['colour', 'no'], ['an index fossil', 'yes — if it was brief and widespread'], ['radiometric age', 'yes']],
    caption: 'the rock cannot date itself' }],

  f8: [{ page: 1, kind: 'grid', cols: ['preserved', 'almost never'],
    rows: [['bones and shells', 'jellyfish'], ['teeth', 'worms'], ['buried fast', 'anything left in the open'], ['sea floors', 'mountain tops']],
    caption: 'absence of evidence is not absence' }],

  f9: [{ page: 1, kind: 'grid', cols: ['trace fossil', 'tells you'],
    rows: [['footprints', 'how it moved, and how fast'], ['burrows', 'where it lived'], ['coprolites', 'what it ate'], ['nests', 'whether it cared for young']],
    caption: 'behaviour, which bones cannot record' }],

  f10: [{ page: 1, kind: 'grid', cols: ['method', 'gives', 'alone?'],
    rows: [['superposition', 'the order', 'no years'], ['index fossils', 'matching layers', 'no years'], ['radiometric', 'years', 'needs the right rock']],
    caption: 'together they give order AND years' }],

  cx5: [{ page: 1, kind: 'grid', cols: ['seems to vanish', 'actually'],
    rows: [['energy', 'became heat and sound'], ['water', 'evaporated, will rain'], ['matter in a fire', 'left as gas'], ['money spent', 'someone else has it']],
    caption: 'ask where it went, never whether it did' }],

  /* ---- statistics (days 27-33) ------------------------------------------ */

  m27: [{ page: 1, kind: 'grid', cols: ['asked by', 'systematically misses'],
    rows: [['telephone', 'anyone without a phone'], ['a news website', 'readers of other sites'], ['at a football ground', 'people who dislike football'], ['a random national list', 'nobody in particular']],
    caption: 'only the last one has no built-in lean' }],

  m28: [{ page: 0, kind: 'grid', cols: ['class', 'scores', 'mean', 'range'],
    rows: [['A', '68, 70, 70, 72', '70', '4'], ['B', '20, 60, 80, 120', '70', '100']],
    caption: 'same centre, nothing else the same' }],

  m29: [{ page: 1, kind: 'twobars', values: [48, 52], labels: ['48%', '52%'],
    truncatedFrom: 47, truncatedTo: 53,
    caption: 'same two numbers — only the axis moved' }],

  m30: [{ page: 1, kind: 'grid', cols: ['A and B move together', 'could mean'],
    rows: [['A causes B', 'the assumed one'], ['B causes A', 'often survives testing'], ['C causes both', 'summer, age, wealth'], ['coincidence', 'rarer than it feels']],
    caption: 'three real candidates, not one' }],

  m31: [{ page: 1, kind: 'grid', cols: ['want', 'rule', 'careful of'],
    rows: [['A and B', 'multiply', 'only if independent'], ['A or B', 'add, minus overlap', 'double counting'], ['not A', '1 − P(A)', '—']],
    caption: 'the condition on AND is the bit forgotten' }],

  m32: [{ page: 1, kind: 'grid', cols: ['of 10,000 people', 'test positive'],
    rows: [['10 are ill', '10 — all of them'], ['9,990 are healthy', 'about 100 anyway'], ['total positives', '110'], ['actually ill', '10 of 110 ≈ 9%']],
    caption: '1% of nearly everyone beats 100% of few' }],

  m33: [{ page: 1, kind: 'grid', cols: ['poll says', '±3 points', 'so the truth is'],
    rows: [['52%', '49 – 55', 'somewhere in there'], ['48%', '45 – 51', 'somewhere in there'], ['gap of 4', 'ranges overlap', 'too close to call']],
    caption: 'the gap is smaller than the uncertainty' }],

  mr5: [{ page: 1, kind: 'grid', cols: ['ask', 'catches'],
    rows: [['where is it from?', 'bias — nothing later fixes it'], ['what is the spread?', 'an average hiding the range'], ['what are the axes?', 'a chart arguing at you'], ['cause or company?', 'the confounder'], ['how wrong may it be?', 'a gap inside the margin']],
    caption: 'sample first — always sample first' }],
};