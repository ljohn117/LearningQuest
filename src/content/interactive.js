/* Sliders and sequences, attached to the days whose ideas are relationships
 * or orders rather than facts.
 *
 * WHY
 *
 * The app had exactly one interactive block type — `codelab` — used six times,
 * all in Computer Science. 36% of all blocks were plain text and pages
 * averaged 2.1 blocks, which is nearer a slide than a lesson. Some ideas here
 * are not statements at all: "doubling the side multiplies the volume by
 * eight" is a relationship you should be able to feel by dragging, and
 * "oldest at the bottom" is an order you should be able to produce rather
 * than recognise.
 *
 * In `slider`, the dragged value is always `x` inside the expression strings.
 * See src/engine/expr.js — the formulas live here in the content, not in the
 * renderer, so a new slider is a data edit rather than a new component.
 *
 * Neither block stores anything, neither is scored, and nothing depends on
 * whether he touches them. Each entry names the page it belongs on.
 */

export const INTERACTIVE = {
  /* ---- sliders --------------------------------------------------------- */

  /* m19 is the canonical case for this block existing. The day's whole claim
     is that area and volume grow at different rates, which prose can only
     assert and a slider lets him watch. */
  m19: [{
    page: 1, type: 'slider',
    label: 'side length of a cube', min: 1, max: 8, step: 1, start: 2, unit: 'cm',
    outputs: [
      { label: 'area of one face', expr: 'x*x', unit: 'cm²' },
      { label: 'volume', expr: 'x*x*x', unit: 'cm³' },
    ],
    caption: 'Go from 2 to 4. The side doubled, the face went up four times, and the volume went up eight.',
  }],

  /* m6 — slope is a rate, and a rate is best met by changing it. */
  m6: [{
    page: 1, type: 'slider',
    label: 'slope (m) in y = mx', min: 0, max: 6, step: 0.5, start: 2,
    outputs: [
      { label: 'y when x = 1', expr: 'x*1' },
      { label: 'y when x = 3', expr: 'x*3' },
      { label: 'y when x = 10', expr: 'x*10' },
    ],
    caption: 'The slope is how much y gains for every single step x takes.',
  }],

  /* m23 — the overtaking, as a thing you drive rather than read. */
  m23: [{
    page: 0, type: 'slider',
    label: 'number of steps', min: 0, max: 12, step: 1, start: 3,
    outputs: [
      { label: 'linear: 10 per step', expr: '10*x' },
      { label: 'exponential: doubling', expr: '2^x' },
    ],
    caption: 'Linear leads until step 6 or so, then never leads again.',
  }],

  /* phy8 — F = ma is a relationship between three numbers; fix one and move
     another and the third has nowhere to hide. */
  phy8: [{
    page: 1, type: 'slider',
    label: 'mass being pushed with a steady 60 N', min: 1, max: 30, step: 1, start: 4, unit: 'kg',
    outputs: [{ label: 'acceleration', expr: '60/x', unit: 'm/s²' }],
    caption: 'The push never changes. Only the mass does — and mass sits on the bottom of a = F ÷ m.',
  }],

  /* b5 — compound against simple, on money, over a lifetime. */
  b5: [{
    page: 2, type: 'slider',
    label: 'years of saving £1,000 at 5%', min: 0, max: 40, step: 1, start: 10, unit: 'years',
    outputs: [
      { label: 'simple interest', expr: '1000+50*x', unit: '£' },
      { label: 'compound interest', expr: '1000*1.05^x', unit: '£' },
    ],
    caption: 'Nearly identical early on. Drag to 40 and look at the gap.',
  }],

  /* ---- sequences ------------------------------------------------------- */

  /* f3 — superposition IS an order. Producing it beats recognising it. */
  f3: [{
    page: 1, type: 'order',
    task: 'Put these in the order they happened, earliest first.',
    items: [
      'Sand settles on the sea floor',
      'More sediment buries it and presses it into rock',
      'A newer layer forms on top of that one',
      'The land is pushed up and a cliff exposes both',
    ],
    caption: 'The deepest layer got there first. That is the whole law of superposition.',
  }],

  /* c3 — an algorithm is a sequence, and order is the part that bites. */
  c3: [{
    page: 1, type: 'order',
    task: 'Arrange these steps into an algorithm that actually works.',
    items: [
      'Fill the kettle with water',
      'Switch the kettle on and wait for it to boil',
      'Put a teabag in the cup',
      'Pour the boiled water into the cup',
      'Wait two minutes, then take the teabag out',
    ],
    caption: 'Every step is right. Only the order made it work.',
  }],

  /* g5 — the path a bill takes is exactly the content of the day. */
  g5: [{
    page: 1, type: 'order',
    task: 'Put the journey of a bill in order.',
    items: [
      'A member of Congress introduces the bill',
      'A committee examines it and may change it',
      'The House votes on it',
      'The Senate votes on it',
      'The President signs it into law',
    ],
    caption: 'It can die at any of these steps, which is the point of having so many.',
  }],

  /* es3 — a cycle, which is an order that closes. */
  es3: [{
    page: 1, type: 'order',
    task: 'Put the water cycle in order, starting at the ocean.',
    items: [
      'The sun heats water at the ocean surface',
      'Water evaporates and rises as vapour',
      'Higher up it cools and condenses into cloud',
      'Droplets grow heavy and fall as rain',
      'Rivers carry the water back to the sea',
    ],
    caption: 'The last step leads back to the first. Nothing is used up anywhere along it.',
  }],

  /* bio6 — energy moves one way through a food web, and that direction is
     the thing worth being able to produce. */
  bio6: [{
    page: 1, type: 'order',
    task: 'Put this food chain in order, following the energy.',
    items: [
      'Sunlight falls on a plant',
      'The plant stores the energy as sugar',
      'A rabbit eats the plant',
      'A fox eats the rabbit',
      'Decomposers return the nutrients to the soil',
    ],
    caption: 'Energy travels one way and most of it is lost as heat at every step. Matter is what comes back.',
  }],
};
