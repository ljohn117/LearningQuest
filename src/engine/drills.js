/* Procedurally generated drills for the non-math lanes.
 *
 * The math lane already had fourteen of these. Everything else had none,
 * which meant duels only ever tested math. These extend the same contract —
 * { id, subj, day, name, gen } where gen() returns { prompt, answer, hint } —
 * to the lanes with something countable in them.
 *
 * Numbers are generated per call, so nothing here can be memorized.
 *
 * Several drills deliberately reach back into math: binary place value is
 * powers of two, profit is an algebra expression, interest is repeated
 * multiplication. That recognition is the point — he should keep running
 * into things he already knows wearing different clothes. */

export const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
export const pickOne = (a) => a[Math.floor(Math.random() * a.length)];

const money = (n) => Math.round(n * 100) / 100;

export const EXTRA_DRILLS = [
  /* ---- Computer Science ------------------------------------------------ */
  {
    id: 'cs2a', subj: 'cs', day: 'c2', name: 'Binary → Decimal',
    gen: () => {
      const bits = Array.from({ length: rnd(3, 5) }, () => rnd(0, 1));
      if (!bits.includes(1)) bits[0] = 1;
      const str = bits.join('');
      return {
        prompt: `What is binary ${str} in normal (decimal) numbers?`,
        answer: parseInt(str, 2),
        hint: 'Each place is a power of two — same powers you met in math. Rightmost is 1, then 2, 4, 8, 16.',
      };
    },
  },
  {
    id: 'cs2b', subj: 'cs', day: 'c2', name: 'Decimal → Binary',
    gen: () => {
      const n = rnd(3, 31);
      return {
        prompt: `Write ${n} in binary. (Type the digits, like 1011.)`,
        answer: Number(n.toString(2)),
        hint: 'Find the biggest power of two that fits, subtract it, repeat.',
      };
    },
  },
  {
    id: 'cs2c', subj: 'cs', day: 'c2', name: 'Bits & Bytes',
    gen: () => {
      const bits = pickOne([2, 3, 4, 5, 6, 8]);
      return {
        prompt: `How many different values can ${bits} bits store?`,
        answer: Math.pow(2, bits),
        hint: `Each bit doubles the possibilities: 2^${bits}.`,
      };
    },
  },
  {
    id: 'cs4a', subj: 'cs', day: 'c4', name: 'Loop Counting',
    gen: () => {
      const start = rnd(1, 5), step = rnd(2, 5), times = rnd(3, 7);
      return {
        prompt: `A loop starts at ${start} and adds ${step} each time. After ${times} steps, what is the value?`,
        answer: start + step * times,
        hint: `Start plus ${step} added ${times} times — that is ${start} + ${step}×${times}.`,
      };
    },
  },
  {
    id: 'cs5a', subj: 'cs', day: 'c5', name: 'Tracing Variables',
    gen: () => {
      const a = rnd(2, 12), b = rnd(2, 9);
      return {
        prompt: `x = ${a}. Then x = x * ${b}. Then x = x - ${a}. What is x?`,
        answer: a * b - a,
        hint: 'Work one line at a time, top to bottom. Never guess the end from the start.',
      };
    },
  },

  /* ---- Business & Money ------------------------------------------------ */
  {
    id: 'biz3a', subj: 'biz', day: 'b3', name: 'Profit',
    gen: () => {
      const price = rnd(4, 20), cost = rnd(1, price - 1), units = rnd(5, 40);
      return {
        prompt: `You sell ${units} items at $${price} each. Each one costs you $${cost} to make. What is your profit, in dollars?`,
        answer: (price - cost) * units,
        hint: `Profit per item is ${price} − ${cost}. Then multiply by ${units} — the same shape as an algebra expression.`,
      };
    },
  },
  {
    id: 'biz3b', subj: 'biz', day: 'b3', name: 'Break-Even',
    gen: () => {
      const fixed = rnd(2, 12) * 50, price = rnd(5, 20), cost = rnd(1, price - 1);
      const margin = price - cost;
      const units = Math.ceil(fixed / margin);
      return {
        prompt: `Your booth costs $${fixed} no matter what. You make $${margin} profit per item. How many items to break even? (Round up.)`,
        answer: units,
        hint: `Divide ${fixed} by ${margin}, then round up — you cannot sell part of an item.`,
      };
    },
  },
  {
    id: 'biz5a', subj: 'biz', day: 'b5', name: 'Simple Interest',
    gen: () => {
      const p = rnd(2, 20) * 50, r = pickOne([2, 4, 5, 10]), y = rnd(1, 4);
      return {
        prompt: `You save $${p} at ${r}% simple interest per year. After ${y} year${y > 1 ? 's' : ''}, how much interest have you earned, in dollars?`,
        answer: money(p * (r / 100) * y),
        hint: `Interest each year is ${r}% of $${p}. Multiply that by ${y}.`,
      };
    },
  },
  {
    id: 'biz5b', subj: 'biz', day: 'b5', name: 'Compound Growth',
    gen: () => {
      const p = pickOne([100, 200, 500]), r = pickOne([10, 20, 50]), y = rnd(2, 3);
      const end = money(p * Math.pow(1 + r / 100, y));
      return {
        prompt: `$${p} grows ${r}% each year, and the growth compounds. What is it worth after ${y} years, in dollars?`,
        answer: end,
        hint: `Multiply by ${1 + r / 100} once per year — that is an exponent, ${1 + r / 100}^${y}.`,
      };
    },
  },
  {
    id: 'biz10a', subj: 'biz', day: 'b10', name: 'Discounts & Markup',
    gen: () => {
      const base = rnd(2, 20) * 5, pct = pickOne([10, 20, 25, 50]);
      const down = Math.random() < 0.5;
      return down
        ? { prompt: `A $${base} item is ${pct}% off. What is the new price, in dollars?`,
            answer: money(base * (1 - pct / 100)),
            hint: `${pct}% off means you pay ${100 - pct}% of $${base}.` }
        : { prompt: `A $${base} item is marked up ${pct}%. What is the new price, in dollars?`,
            answer: money(base * (1 + pct / 100)),
            hint: `Add ${pct}% of $${base} to $${base}.` };
    },
  },
  {
    id: 'biz10b', subj: 'biz', day: 'b10', name: 'Margin Percent',
    gen: () => {
      const cost = rnd(2, 15), mult = pickOne([2, 4, 5]);
      const price = cost * mult;
      return {
        prompt: `An item costs $${cost} to make and sells for $${price}. What percent of the price is profit?`,
        answer: money(((price - cost) / price) * 100),
        hint: `Profit is ${price} − ${cost}. Divide that by the price, then multiply by 100.`,
      };
    },
  },
];
