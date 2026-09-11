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

/* ---- difficulty ---------------------------------------------------------
 *
 * Every generator takes a level of 1, 2 or 3 and defaults to 1, so anything
 * that ignores the argument keeps behaving exactly as it did.
 *
 * The reason this exists: one generator at one difficulty does not teach a
 * concept, it teaches a shape. A kid who can solve 3x + 5 = 20 every time
 * has learned where the numbers go. Understanding shows up when the same
 * idea arrives wearing different clothes — bigger, inverted, or wrapped in a
 * sentence — so each level is a different SURFACE for the same idea rather
 * than simply larger numbers.
 *
 *   1  the plain form
 *   2  inverted, or one step longer
 *   3  the form that catches people out
 *
 * The duel raises the level as his run grows and drops it the moment he
 * misses. That fall is the important half: getting something wrong makes the
 * next question easier, never harder. It is support, not a penalty, and it
 * means practice keeps meeting him at the edge of what he can do instead of
 * either boring him or walling him off.
 */
export const MAX_LEVEL = 3;
export const clampLevel = (n) => Math.max(1, Math.min(MAX_LEVEL, Math.round(n) || 1));

export const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
export const pickOne = (a) => a[Math.floor(Math.random() * a.length)];

const money = (n) => Math.round(n * 100) / 100;

export const EXTRA_DRILLS = [
  /* ---- Computer Science ------------------------------------------------ */
  { id: 'cs2a', subj: 'cs', day: 'c2', name: 'Binary → Decimal',
    gen: (level = 1) => { const L = clampLevel(level);
      if (L === 3) { const n = rnd(5, 200);
        return { prompt: `What is the FEWEST binary digits needed to write ${n}?`,
          answer: n.toString(2).length, hint: 'Find the biggest power of two that fits, and count places from there.' }; }
      if (L === 2) { const places = [];
        while (places.length < rnd(2, 3)) { const v = pickOne([1, 2, 4, 8, 16, 32]); if (!places.includes(v)) places.push(v); }
        return { prompt: `A binary number has only the places worth ${places.sort((a, b) => a - b).join(', ')} switched on. What is it in decimal?`,
          answer: places.reduce((a, b) => a + b), hint: 'Each switched-on place contributes its own value. Add them.' }; }
      const bits = Array.from({ length: rnd(3, 5) }, () => rnd(0, 1));
      if (!bits.includes(1)) bits[0] = 1;
      const str = bits.join('');
      return { prompt: `What is binary ${str} in normal (decimal) numbers?`, answer: parseInt(str, 2),
        hint: 'Each place is a power of two — rightmost is 1, then 2, 4, 8, 16.' }; } },
  { id: 'cs2b', subj: 'cs', day: 'c2', name: 'Decimal → Binary',
    gen: (level = 1) => { const L = clampLevel(level);
      if (L === 3) { const n = rnd(5, 120);
        return { prompt: `How many 1s appear in the binary form of ${n}?`,
          answer: n.toString(2).split('').filter((c) => c === '1').length,
          hint: 'Write it in binary first, then count the ones.' }; }
      if (L === 2) { const d = rnd(3, 8);
        return { prompt: `What is the LARGEST number you can write using ${d} binary digits?`,
          answer: Math.pow(2, d) - 1, hint: 'All the places switched on — that is one short of the next power of two.' }; }
      const n = rnd(3, 31);
      return { prompt: `Write ${n} in binary. (Type the digits, like 1011.)`, answer: Number(n.toString(2)),
        hint: 'Find the biggest power of two that fits, subtract it, repeat.' }; } },
  { id: 'cs2c', subj: 'cs', day: 'c2', name: 'Bits & Bytes',
    gen: (level = 1) => { const L = clampLevel(level);
      if (L === 2) { const bits = pickOne([3, 4, 5, 6, 8]);
        return { prompt: `You need to store ${Math.pow(2, bits)} different values. How many bits is that?`,
          answer: bits, hint: 'Work backwards: two, doubled how many times, reaches that?' }; }
      if (L === 3) { const bytes = rnd(2, 9);
        return { prompt: `How many bits are in ${bytes} bytes?`, answer: bytes * 8, hint: 'One byte is 8 bits.' }; }
      const bits = pickOne([2, 3, 4, 5, 6, 8]);
      return { prompt: `How many different values can ${bits} bits store?`, answer: Math.pow(2, bits),
        hint: `Two choices in each place, ${bits} places over.` }; } },
  { id: 'cs4a', subj: 'cs', day: 'c4', name: 'Loop Counting',
    gen: (level = 1) => { const L = clampLevel(level);
      const start = rnd(1, 9), step = rnd(2, 7), n = rnd(3, 8);
      if (L === 2) return { prompt: `A loop starts at ${start} and adds ${step} each time. After how many steps does it reach ${start + step * n}?`,
        answer: n, hint: 'Subtract the start, then divide by the step size.' };
      if (L === 3) { const inner = rnd(2, 5);
        return { prompt: `A loop runs ${n} times, and inside it another loop runs ${inner} times. How many times does the inner body run in total?`,
          answer: n * inner, hint: 'The inner loop restarts on every pass of the outer one, so multiply.' }; }
      return { prompt: `A loop starts at ${start} and adds ${step} each time. After ${n} steps, what is the value?`,
        answer: start + step * n, hint: `Add ${step} to ${start}, ${n} times over.` }; } },
  { id: 'cs5a', subj: 'cs', day: 'c5', name: 'Tracing Variables',
    gen: (level = 1) => { const L = clampLevel(level);
      const a = rnd(2, 9), b = rnd(2, 9), c = rnd(1, 9);
      if (L === 2) return { prompt: `x = ${a}. Then x = x * ${b}. Then x = x - ${c}. Then x = x + ${c}. What is x?`,
        answer: a * b, hint: 'Work down one line at a time — the last two cancel each other.' };
      if (L === 3) return { prompt: `x = ${a}. y = x * ${b}. x = y - ${c}. What is x?`,
        answer: a * b - c, hint: 'y is worked out first, then x is replaced using it.' };
      return { prompt: `x = ${a}. Then x = x * ${b}. Then x = x - ${c}. What is x?`, answer: a * b - c,
        hint: 'Take it one line at a time, replacing x as you go.' }; } },

  /* ---- Business & Money ------------------------------------------------ */
  { id: 'biz3a', subj: 'biz', day: 'b3', name: 'Profit',
    gen: (level = 1) => { const L = clampLevel(level);
      const n = rnd(5, 30), price = rnd(4, 15), cost = rnd(1, price - 1);
      if (L === 2) return { prompt: `You sell ${n} items at $${price} each and make $${n * (price - cost)} profit. What does ONE item cost you to make, in dollars?`,
        answer: cost, hint: 'Profit per item is profit divided by items. Then take that off the price.' };
      if (L === 3) { const fixed = rnd(2, 8) * 10;
        return { prompt: `You sell ${n} items at $${price} each, each costing $${cost} to make, plus $${fixed} in fixed costs. What is your profit, in dollars?`,
          answer: n * (price - cost) - fixed, hint: 'Work out profit per item first, then take the fixed cost off the total.' }; }
      return { prompt: `You sell ${n} items at $${price} each. Each one costs you $${cost} to make. What is your profit, in dollars?`,
        answer: n * (price - cost), hint: 'Profit per item first, then multiply by how many.' }; } },
  { id: 'biz3b', subj: 'biz', day: 'b3', name: 'Break-Even',
    gen: (level = 1) => { const L = clampLevel(level);
      const per = rnd(5, 15), units = rnd(8, 25), fixed = per * units;
      if (L === 2) return { prompt: `Your booth costs $${fixed} no matter what, and you make $${per} profit per sale. What is your profit after ${units + 10} sales, in dollars?`,
        answer: per * (units + 10) - fixed, hint: 'Total the profit from sales, then take off the fixed cost.' };
      if (L === 3) return { prompt: `You make $${per} profit per sale and break even after exactly ${units} sales. What did the booth cost, in dollars?`,
        answer: fixed, hint: 'Breaking even means the sales profit exactly matched the fixed cost.' };
      return { prompt: `Your booth costs $${fixed} no matter what. You make $${per} profit per sale. How many sales to break even?`,
        answer: units, hint: 'Divide the fixed cost by the profit each sale brings in.' }; } },
  { id: 'biz5a', subj: 'biz', day: 'b5', name: 'Simple Interest',
    gen: (level = 1) => { const L = clampLevel(level);
      const p = pickOne([100, 150, 200, 400, 500]), r = pickOne([5, 10, 20]);
      if (L === 2) { const yrs = rnd(2, 5);
        return { prompt: `You save $${p} at ${r}% simple interest per year. After ${yrs} years, how much interest have you earned, in dollars?`,
          answer: (p * r / 100) * yrs, hint: 'Simple interest earns the same amount every year — work out one year, then multiply.' }; }
      if (L === 3) return { prompt: `$${p} earned $${p * r / 100} of simple interest in one year. What was the interest rate, as a percent?`,
        answer: r, hint: 'Divide the interest by the amount saved, then times 100.' };
      return { prompt: `You save $${p} at ${r}% simple interest per year. After 1 year, how much do you have in total, in dollars?`,
        answer: p + p * r / 100, hint: 'Work out the interest, then add it to what you started with.' }; } },
  { id: 'biz5b', subj: 'biz', day: 'b5', name: 'Compound Growth',
    gen: (level = 1) => { const L = clampLevel(level);
      const p = pickOne([100, 200, 400, 500]), r = pickOne([10, 20, 50]);
      if (L === 2) return { prompt: `$${p} grows ${r}% each year, compounding. What is it worth after 2 years, in dollars?`,
        answer: Math.round(p * Math.pow(1 + r / 100, 2) * 100) / 100,
        hint: 'Grow it once, then grow the NEW amount again — that is what compounding means.' };
      if (L === 3) { const rate = pickOne([2, 4, 6, 8, 9, 12]);
        return { prompt: `Using the rule of 72, roughly how many years does money take to double at ${rate}% per year?`,
          answer: 72 / rate, hint: 'Divide 72 by the rate.' }; }
      return { prompt: `$${p} grows ${r}% each year, and the growth compounds. What is it worth after 1 year, in dollars?`,
        answer: p * (1 + r / 100), hint: 'Find the growth, then add it on.' }; } },
  { id: 'biz10a', subj: 'biz', day: 'b10', name: 'Discounts & Markup',
    gen: (level = 1) => { const L = clampLevel(level);
      const price = pickOne([40, 50, 75, 80, 120, 200]), pct = pickOne([10, 20, 25, 50]);
      if (L === 2) return { prompt: `A $${price} item is discounted ${pct}%. What is the new price, in dollars?`,
        answer: price * (1 - pct / 100), hint: `Find ${pct}% of ${price}, then take it off.` };
      if (L === 3) return { prompt: `An item is marked up ${pct}% and now sells for $${price * (1 + pct / 100)}. What did it cost before the markup, in dollars?`,
        answer: price, hint: 'Work backwards — the new price is the old one plus that percentage OF the old one.' };
      return { prompt: `A $${price} item is marked up ${pct}%. What is the new price, in dollars?`,
        answer: price * (1 + pct / 100), hint: `Find ${pct}% of ${price}, then add it on.` }; } },
  { id: 'biz10b', subj: 'biz', day: 'b10', name: 'Margin Percent',
    gen: (level = 1) => { const L = clampLevel(level);
      const cost = rnd(5, 25), mult = pickOne([2, 4, 5]), sell = cost * mult;
      if (L === 2) return { prompt: `An item costs $${cost} to make and you want a margin of ${Math.round((1 - 1 / mult) * 100)}% of the selling price. What must it sell for, in dollars?`,
        answer: sell, hint: 'If the cost is what is left over after the margin, divide the cost by that leftover share.' };
      if (L === 3) return { prompt: `An item costs $${cost} and sells for $${sell}. By what PERCENT was the cost marked up?`,
        answer: Math.round((sell - cost) / cost * 100), hint: 'Markup compares the profit against the COST — margin compares it against the selling price.' };
      return { prompt: `An item costs $${cost} to make and sells for $${sell}. What percent of the selling price is profit?`,
        answer: Math.round((sell - cost) / sell * 100), hint: 'Profit divided by the SELLING price, times 100.' }; } },

  /* ---- Fossils & Deep Time ---------------------------------------------- */
  { id: 'fos4a', subj: 'fossils', day: 'f4', name: 'Half-Life Dating',
    gen: (level = 1) => { const L = clampLevel(level);
      const hl = pickOne([2, 5, 10, 50]), n = rnd(2, 5);
      if (L === 2) return { prompt: `A material has a half-life of ${hl} million years. How old is a sample that has been through ${n} half-lives, in millions of years?`,
        answer: hl * n, hint: 'Each half-life is the same length — multiply.' };
      if (L === 3) return { prompt: `A material has a half-life of ${hl} million years. A sample is ${hl * n} million years old. How many half-lives is that?`,
        answer: n, hint: 'Divide the age by the length of one half-life.' };
      return { prompt: `A material has a half-life of ${hl} million years. After 1 half-life, how many millions of years have passed?`,
        answer: hl, hint: 'One half-life is exactly that long.' }; } },
  { id: 'fos4b', subj: 'fossils', day: 'f4', name: 'How Much Is Left',
    gen: (level = 1) => { const L = clampLevel(level);
      const n = rnd(2, 6);
      if (L === 2) return { prompt: `Only 1/${Math.pow(2, n)} of a sample remains. How many half-lives have passed?`,
        answer: n, hint: 'How many times must you halve 1 to reach that fraction?' };
      if (L === 3) { const k = rnd(1, 3);
        return { prompt: `After ${k} half-life${k === 1 ? '' : 's'}, what PERCENT of the original sample remains?`,
          answer: 100 / Math.pow(2, k), hint: 'Halve 100 that many times.' }; }
      return { prompt: `After ${n} half-lives, a sample is 1 over what fraction of the original?`,
        answer: Math.pow(2, n), hint: 'Halve it once per half-life — that is repeated doubling on the bottom.' }; } },
  { id: 'fos3a', subj: 'fossils', day: 'f3', name: 'Reading Layers',
    gen: (level = 1) => { const L = clampLevel(level);
      const n = rnd(4, 8);
      if (L === 2) return { prompt: `A cliff has ${n} rock layers. Counting the deepest as layer 1, which layer is the YOUNGEST?`,
        answer: n, hint: 'Newer material settles on top, so the highest layer is the youngest.' };
      if (L === 3) { const a = rnd(1, n - 2), b = rnd(a + 2, n);
        return { prompt: `A cliff has ${n} layers, deepest counted as 1. How many layers sit strictly between layer ${a} and layer ${b}?`,
          answer: b - a - 1, hint: 'Count the gap, not the two ends.' }; }
      const k = rnd(2, n);
      return { prompt: `A cliff has ${n} rock layers, the deepest counted as layer 1. How many layers are OLDER than layer ${k}?`,
        answer: k - 1, hint: 'Superposition: deeper means older, so count everything below it.' }; } },

  /* ---- Government & Civics ---------------------------------------------- */
  { id: 'gov3a', subj: 'gov', day: 'g3', name: 'Veto Override',
    gen: (level = 1) => { const L = clampLevel(level);
      const size = pickOne([30, 60, 90, 99, 120, 300]);
      const twoThirds = Math.ceil(size * 2 / 3);
      if (L === 2) { const have = rnd(Math.floor(size / 3), twoThirds - 1);
        return { prompt: `A chamber has ${size} members and needs two-thirds to override a veto. With ${have} votes secured, how many MORE are needed?`,
          answer: twoThirds - have, hint: 'Work out two-thirds first, then subtract what is already there.' }; }
      if (L === 3) { const half = Math.floor(size / 2) + 1;
        return { prompt: `A chamber of ${size} needs a simple majority to pass a bill and two-thirds to override a veto. How many more votes does the override need than the majority?`,
          answer: twoThirds - half, hint: 'Work out both thresholds, then take the difference.' }; }
      return { prompt: `A chamber has ${size} members. A two-thirds majority is needed to override a veto. How many votes is that?`,
        answer: twoThirds, hint: 'Two-thirds of the total, rounded UP — you cannot have a fraction of a vote.' }; } },
  { id: 'gov6a', subj: 'gov', day: 'g6', name: 'Winning a Vote',
    gen: (level = 1) => { const L = clampLevel(level);
      const n = pickOne([100, 200, 500, 51, 75, 101, 333, 777]);
      const need = Math.floor(n / 2) + 1;
      if (L === 2) return { prompt: `${n} people vote. What is the MOST votes the losing side can have and still lose?`,
        answer: n - need, hint: 'Everything left over once the winning side has its majority.' };
      if (L === 3) { const have = rnd(Math.floor(n / 3), need - 1);
        return { prompt: `${n} people vote and ${have} have said yes. How many MORE yes votes are needed for a simple majority?`,
          answer: need - have, hint: 'More than half — work that out, then subtract what you have.' }; }
      return { prompt: `${n} people vote. What is the smallest number needed for a simple majority?`,
        answer: need, hint: 'More than half, not half — one more than exactly half.' }; } },
  { id: 'gov5a', subj: 'gov', day: 'g5', name: 'Counting the Path',
    gen: (level = 1) => { const L = clampLevel(level);
      const a = rnd(3, 9), b = rnd(3, 9), c = rnd(2, 6);
      if (L === 2) return { prompt: `A bill needs ${a} committee votes in the House and ${b} in the Senate, then ${c} more at conference. How many votes in total?`,
        answer: a + b + c, hint: 'Add every stage along the path.' };
      if (L === 3) return { prompt: `A bill needs ${a + b} votes in total across both committees, and ${a} have been secured in the House. How many are still needed in the Senate?`,
        answer: b, hint: 'Take what is already secured off the total.' };
      return { prompt: `A bill needs ${a} committee votes in the House and ${b} in the Senate. How many votes in total?`,
        answer: a + b, hint: 'Both chambers have to act, so add them.' }; } },

  /* ---- Biology ----------------------------------------------------------- */
  { id: 'bio4a', subj: 'bio', day: 'bio4', name: 'Punnett Ratios',
    gen: (level = 1) => { const L = clampLevel(level);
      const total = pickOne([4, 8, 12, 16, 20, 40]);
      if (L === 2) return { prompt: `A 3:1 cross produces ${total} offspring. How many show the DOMINANT trait?`,
        answer: total / 4 * 3, hint: '3 parts out of 4 — find one part first, then take three.' };
      if (L === 3) return { prompt: `In a 3:1 cross, ${total / 4} offspring show the recessive trait. How many offspring are there in TOTAL?`,
        answer: total, hint: 'The recessive group is one part out of four. Multiply back up.' };
      return { prompt: `A 3:1 cross produces ${total} offspring. How many show the RECESSIVE trait?`,
        answer: total / 4, hint: '1 part out of 4 total. Divide by 4.' }; } },
  { id: 'bio6a', subj: 'bio', day: 'bio6', name: 'Energy Pyramid',
    gen: (level = 1) => { const L = clampLevel(level);
      const start = pickOne([1000, 2000, 5000, 10000]), levels = rnd(1, 3);
      if (L === 2) return { prompt: `${start} units of energy enter a food web, with about 10% passing up each level. How much reaches ${levels + 1} levels higher?`,
        answer: start / Math.pow(10, levels + 1), hint: `Divide by 10 once per level — ${levels + 1} times.` };
      if (L === 3) return { prompt: `Only ${start / Math.pow(10, levels)} units of energy reach a level ${levels} steps up the food web. How much entered at the bottom?`,
        answer: start, hint: 'Work backwards — multiply by 10 once per level.' };
      return { prompt: `${start} units of energy enter a food web. About 10% passes up at each level. How much reaches ${levels} level${levels > 1 ? 's' : ''} higher?`,
        answer: start / Math.pow(10, levels), hint: `Take 10% ${levels} time${levels > 1 ? 's' : ''} — divide by 10 each step.` }; } },

  /* ---- Chemistry --------------------------------------------------------- */
  { id: 'chem5a', subj: 'chem', day: 'ch5', name: 'Counting Atoms',
    gen: (level = 1) => { const L = clampLevel(level);
      const f = pickOne([
        { s: 'H2O', el: 'hydrogen', n: 2, all: 3 }, { s: 'CO2', el: 'oxygen', n: 2, all: 3 },
        { s: 'CH4', el: 'hydrogen', n: 4, all: 5 }, { s: 'NH3', el: 'hydrogen', n: 3, all: 4 },
        { s: 'C6H12O6', el: 'carbon', n: 6, all: 24 }, { s: 'H2SO4', el: 'oxygen', n: 4, all: 7 },
      ]);
      if (L === 3) return { prompt: `How many atoms are in ONE molecule of ${f.s} in total?`, answer: f.all,
        hint: 'Add up every atom of every element in the formula.' };
      const c = L === 1 ? 1 : rnd(2, 5);
      return { prompt: `How many ${f.el} atoms are in ${c === 1 ? '' : c}${f.s}?`, answer: f.n * c,
        hint: c === 1 ? 'The small number counts only the symbol right before it.' : `The ${c} out front multiplies every atom in the formula.` }; } },
  { id: 'chem5b', subj: 'chem', day: 'ch5', name: 'Brackets in Formulas',
    gen: (level = 1) => { const L = clampLevel(level);
      const f = pickOne([
        { s: 'Ca(OH)2', el: 'oxygen', inner: 1, mult: 2, all: 5 },
        { s: 'Mg(NO3)2', el: 'oxygen', inner: 3, mult: 2, all: 9 },
        { s: 'Al(OH)3', el: 'hydrogen', inner: 1, mult: 3, all: 7 },
        { s: 'Fe(NO3)3', el: 'oxygen', inner: 3, mult: 3, all: 13 },
      ]);
      if (L === 3) return { prompt: `How many atoms are in ONE unit of ${f.s} in total?`, answer: f.all,
        hint: 'Everything inside the bracket is multiplied first, then add what is outside.' };
      const c = L === 1 ? 1 : rnd(2, 4);
      return { prompt: `How many ${f.el} atoms are in ${c === 1 ? '' : c}${f.s}?`, answer: f.inner * f.mult * c,
        hint: 'The number outside the bracket multiplies everything inside it — same as 3(x + 4) in algebra.' }; } },
  { id: 'chem8a', subj: 'chem', day: 'ch8', name: 'pH Steps',
    gen: (level = 1) => { const L = clampLevel(level);
      const steps = rnd(1, 4);
      const low = rnd(0, 7 - steps);
      if (L === 2) return { prompt: `A solution is ${Math.pow(10, steps)} times MORE acidic than pH ${low + steps}. What is its pH?`,
        answer: low, hint: 'More acidic means a LOWER pH — count the steps downward.' };
      if (L === 3) return { prompt: `One solution is ${Math.pow(10, steps)} times more acidic than another. How many pH steps apart are they?`,
        answer: steps, hint: 'Each step is a factor of ten — count the zeros.' };
      return { prompt: `How many times more acidic is pH ${low} than pH ${low + steps}?`, answer: Math.pow(10, steps),
        hint: `${steps} step${steps > 1 ? 's' : ''} apart, each a factor of ten. Multiply, do not add.` }; } },
  { id: 'chem9a', subj: 'chem', day: 'ch9', name: 'Concentration',
    gen: (level = 1) => { const L = clampLevel(level);
      const litres = pickOne([2, 3, 4, 5, 8, 10]), perL = rnd(2, 25);
      if (L === 2) return { prompt: `A solution holds ${perL} grams of solute per litre. How many grams are in ${litres} litres?`,
        answer: perL * litres, hint: 'Per litre, times the number of litres.' };
      if (L === 3) return { prompt: `You need ${perL * litres} grams of solute at a concentration of ${perL} grams per litre. How many litres do you need?`,
        answer: litres, hint: 'Divide the amount you need by the concentration.' };
      return { prompt: `${perL * litres} grams of solute are dissolved in ${litres} litres. What is the concentration in grams per litre?`,
        answer: perL, hint: '"Per litre" means divide by the number of litres.' }; } },

  /* ---- Mathematics, days 15-19 ------------------------------------------
     The five newest days shipped with no generated practice at all, which
     made them the least practisable ideas in the app despite being the ones
     most likely to be got wrong. Each ramps from the plain form, through the
     inverted form, to the version that actually catches people. */
  {
    id: 'm15a', subj: 'math', day: 'm15', name: 'Percent Change',
    gen: (level = 1) => {
      const L = clampLevel(level);
      if (L === 1) {
        const price = pickOne([40, 60, 80, 120, 200]), off = pickOne([10, 25, 50]);
        return { prompt: `A $${price} item is discounted ${off}%. What does it cost now, in dollars?`,
          answer: price * (1 - off / 100), hint: `Find ${off}% of ${price}, then take it off.` };
      }
      if (L === 2) {
        const from = pickOne([20, 40, 50, 80]), pct = pickOne([10, 25, 50]);
        return { prompt: `A price rises from $${from} to $${from * (1 + pct / 100)}. What percent increase is that?`,
          answer: pct, hint: 'Divide the rise by the STARTING price, then times 100.' };
      }
      const start = pickOne([100, 200, 400]), pct = pickOne([10, 20, 50]);
      const after = start * (1 - pct / 100) * (1 + pct / 100);
      return { prompt: `A $${start} item is cut ${pct}%, then raised ${pct}%. What does it cost now, in dollars?`,
        answer: Math.round(after * 100) / 100,
        hint: 'The rise is taken from the reduced price, not the original. They do not cancel.' };
    },
  },
  {
    id: 'm16a', subj: 'math', day: 'm16', name: 'Mean & Median',
    gen: (level = 1) => {
      const L = clampLevel(level);
      const set = (n, lo, hi) => Array.from({ length: n }, () => rnd(lo, hi));
      if (L === 1) {
        const base = rnd(2, 12), vals = [base, base + 2, base + 4, base + 6, base + 8];
        return { prompt: `Find the mean of ${vals.join(', ')}.`,
          answer: vals.reduce((a, b) => a + b) / vals.length, hint: 'Add them all, divide by how many.' };
      }
      if (L === 2) {
        const vals = set(5, 1, 30);
        const sorted = [...vals].sort((a, b) => a - b);
        return { prompt: `Find the median of ${vals.join(', ')}.`, answer: sorted[2],
          hint: 'Put them in order first, then take the middle one.' };
      }
      const vals = set(4, 4, 16), want = rnd(5, 15);
      const need = want * 5 - vals.reduce((a, b) => a + b);
      return { prompt: `Four numbers are ${vals.join(', ')}. What fifth number makes the mean of all five exactly ${want}?`,
        answer: need, hint: `Five numbers averaging ${want} must total ${want * 5}. How much is missing?` };
    },
  },
  {
    id: 'm17a', subj: 'math', day: 'm17', name: 'Counting Possibilities',
    gen: (level = 1) => {
      const L = clampLevel(level);
      if (L === 1) {
        const a = rnd(3, 6), b = rnd(3, 6);
        return { prompt: `A menu has ${a} mains and ${b} desserts. How many different two-course meals?`,
          answer: a * b, hint: 'Every main pairs with every dessert, so multiply.' };
      }
      if (L === 2) {
        const n = rnd(3, 5);
        return { prompt: `In how many different orders can ${n} runners finish a race?`,
          answer: Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a * b),
          hint: `${n} choices for first, then one fewer each time.` };
      }
      const n = pickOne([5, 6, 7]);
      return { prompt: `How many ways can 2 people be chosen from ${n} to share a prize equally?`,
        answer: (n * (n - 1)) / 2,
        hint: 'Count ordered picks first, then halve — the same pair in the other order is not new.' };
    },
  },
  {
    id: 'm18a', subj: 'math', day: 'm18', name: 'Probability',
    gen: (level = 1) => {
      const L = clampLevel(level);
      if (L === 1) {
        const sides = pickOne([6, 8, 10]);
        return { prompt: `Rolling a fair ${sides}-sided die, the probability of any one number is 1 over what?`,
          answer: sides, hint: 'One outcome you want, out of how many possible?' };
      }
      if (L === 2) {
        const n = rnd(3, 6);
        return { prompt: `Flipping ${n} coins, how many equally likely results are there altogether?`,
          answer: Math.pow(2, n), hint: `Two choices, ${n} times over.` };
      }
      const n = rnd(2, 4);
      return { prompt: `The probability of getting ${n} heads in a row is 1 over what?`,
        answer: Math.pow(2, n), hint: 'Independent chances multiply — a half, multiplied that many times.' };
    },
  },
  {
    id: 'm19a', subj: 'math', day: 'm19', name: 'Area & Volume Scaling',
    gen: (level = 1) => {
      const L = clampLevel(level);
      const k = pickOne([2, 3, 4]);
      if (L === 1) return { prompt: `A cube's sides are multiplied by ${k}. Its VOLUME is multiplied by what?`,
        answer: Math.pow(k, 3), hint: 'Volume depends on the side cubed.' };
      if (L === 2) return { prompt: `A cube's sides are multiplied by ${k}. Its SURFACE AREA is multiplied by what?`,
        answer: Math.pow(k, 2), hint: 'Area depends on the side squared.' };
      return { prompt: `A cube's volume grew ${Math.pow(k, 3)} times. Its sides were multiplied by what?`,
        answer: k, hint: 'Work backwards: what number cubed gives that?' };
    },
  },

  /* ---- Physical Science -------------------------------------------------
     He finished this lane before any of the rest existed and has had no way
     to practise it since. */
  {
    id: 'phy2a', subj: 'physics', day: 'phy2', name: 'Atoms & Particles',
    gen: (level = 1) => {
      const L = clampLevel(level);
      const z = rnd(3, 20);
      if (L === 1) return { prompt: `A neutral atom has ${z} protons. How many electrons does it have?`,
        answer: z, hint: 'Neutral means the charges balance exactly.' };
      if (L === 2) return { prompt: `An atom has ${z} protons. What is its atomic number?`,
        answer: z, hint: 'Atomic number is defined as the proton count.' };
      const mass = z + rnd(z - 2, z + 4);
      return { prompt: `An atom has ${z} protons and a mass number of ${mass}. How many neutrons?`,
        answer: mass - z, hint: 'Mass number counts protons AND neutrons together.' };
    },
  },
  {
    id: 'phy3a', subj: 'physics', day: 'phy3', name: 'Force, Mass, Acceleration',
    gen: (level = 1) => {
      const L = clampLevel(level);
      const m = rnd(2, 12), a = rnd(2, 9);
      if (L === 1) return { prompt: `A ${m} kg object accelerates at ${a} m/s². What force acts on it, in newtons?`,
        answer: m * a, hint: 'F = m × a.' };
      if (L === 2) return { prompt: `A force of ${m * a} N acts on a ${m} kg object. What is its acceleration, in m/s²?`,
        answer: a, hint: 'Rearrange to a = F ÷ m.' };
      return { prompt: `A force of ${m * a} N gives an object an acceleration of ${a} m/s². What is its mass, in kg?`,
        answer: m, hint: 'The same formula, solved for the third thing: m = F ÷ a.' };
    },
  },
  {
    id: 'phy3b', subj: 'physics', day: 'phy3', name: 'Speed & Distance',
    gen: (level = 1) => {
      const L = clampLevel(level);
      const v = rnd(3, 20), t = rnd(2, 12);
      if (L === 1) return { prompt: `Something travels ${v * t} m in ${t} s. What is its speed, in m/s?`,
        answer: v, hint: 'Speed is distance per one second — so divide.' };
      if (L === 2) return { prompt: `Travelling at ${v} m/s for ${t} s, how far does it go, in metres?`,
        answer: v * t, hint: 'Distance = speed × time.' };
      return { prompt: `Covering ${v * t} m at ${v} m/s, how many seconds does it take?`,
        answer: t, hint: 'Time = distance ÷ speed.' };
    },
  },
  {
    id: 'phy6a', subj: 'physics', day: 'phy6', name: 'Wave Speed',
    gen: (level = 1) => {
      const L = clampLevel(level);
      const f = rnd(2, 12), lam = rnd(2, 9);
      if (L === 1) return { prompt: `A wave has frequency ${f} Hz and wavelength ${lam} m. What is its speed, in m/s?`,
        answer: f * lam, hint: 'speed = frequency × wavelength.' };
      if (L === 2) return { prompt: `A wave travels at ${f * lam} m/s with a wavelength of ${lam} m. What is its frequency, in Hz?`,
        answer: f, hint: 'Rearrange: frequency = speed ÷ wavelength.' };
      return { prompt: `A wave travels at ${f * lam} m/s at ${f} Hz. What is its wavelength, in metres?`,
        answer: lam, hint: 'wavelength = speed ÷ frequency.' };
    },
  },

  /* ---- Logic ------------------------------------------------------------
     Reasoning does not obviously reduce to a number, which is why this lane
     had nothing. Counting the rows of a truth table does reduce to one, and
     it happens to be the most honest test of whether he has understood a
     connective at all — you cannot pattern-match your way to it. */
  {
    id: 'lg2a', subj: 'logic', day: 'lg2', name: 'Truth Tables',
    gen: (level = 1) => {
      const L = clampLevel(level);
      if (L === 1) {
        const op = pickOne([
          { t: 'P AND Q', n: 1, h: 'Both have to be true at once.' },
          { t: 'P OR Q', n: 3, h: 'Only the row where both are false fails.' },
        ]);
        return { prompt: `P and Q can each be true or false — 4 combinations. In how many is "${op.t}" true?`,
          answer: op.n, hint: op.h };
      }
      if (L === 2) {
        const op = pickOne([
          { t: 'NOT (P AND Q)', n: 3, h: 'Start from how many make P AND Q true, then take the rest.' },
          { t: 'P AND (NOT Q)', n: 1, h: 'P true and Q false — how many rows look like that?' },
          { t: '(NOT P) OR Q', n: 3, h: 'It only fails when P is true and Q is false.' },
        ]);
        return { prompt: `Of the 4 true/false combinations of P and Q, in how many is "${op.t}" true?`,
          answer: op.n, hint: op.h };
      }
      const n = rnd(3, 4);
      return { prompt: `With ${n} statements that can each be true or false, how many combinations are there in total?`,
        answer: Math.pow(2, n), hint: `Two choices, ${n} times over — the same doubling as binary.` };
    },
  },
  {
    id: 'lg3a', subj: 'logic', day: 'lg3', name: 'If-Then Reasoning',
    gen: (level = 1) => {
      const L = clampLevel(level);
      /* 1 for a conclusion that genuinely follows, 0 for one that does not.
         Each level mixes a valid form with an invalid one deliberately: if a
         level always answered the same way he would learn the level, not the
         reasoning. The level sets how subtle the trap is, never the answer. */
      const cases = {
        1: [
          { s: 'If it rains, the ground gets wet. It is raining. Does it follow that the ground is wet?', a: 1, h: 'The condition happened, so the promise applies.' },
          { s: 'If a shape is a square, it has four sides. This shape is a square. Does it follow that it has four sides?', a: 1, h: 'The rule applies directly.' },
          { s: 'If a shape is a square, it has four sides. This shape is NOT a square. Does it follow that it does not have four sides?', a: 0, h: 'The rule says nothing about shapes that are not squares.' },
        ],
        2: [
          { s: 'If it rains, the ground gets wet. The ground is wet. Does it follow that it rained?', a: 0, h: 'What else could have wet it? A sprinkler.' },
          { s: 'If a shape is a square, it has four sides. This shape has four sides. Does it follow that it is a square?', a: 0, h: 'A rectangle has four sides too.' },
          { s: 'If it rains, the ground gets wet. The ground is dry. Does it follow that it did not rain?', a: 1, h: 'Had it rained, the ground would be wet. It is not — so it cannot have.' },
        ],
        3: [
          { s: 'If it rains, the ground gets wet. It did not rain. Does it follow that the ground is dry?', a: 0, h: 'The rule only promises what happens WHEN it rains.' },
          { s: 'If you study, you pass. You did not pass. Does it follow that you did not study?', a: 1, h: 'Studying guarantees passing, so failing rules out having studied.' },
          { s: 'If you study, you pass. You passed. Does it follow that you studied?', a: 0, h: 'Passing might have happened another way. The rule does not forbid it.' },
        ],
      };
      const c = pickOne(cases[L]);
      return { prompt: `${c.s} Type 1 for yes, 0 for no.`, answer: c.a, hint: c.h };
    },
  },
  {
    id: 'lg6a', subj: 'logic', day: 'lg6', name: 'Counterexamples',
    gen: (level = 1) => {
      const L = clampLevel(level);
      /* Every level asks him to COUNT the cases that break a claim. An
         earlier version asked "how many are needed to disprove this", whose
         answer is always one — true, important, and completely gameable
         after the second time. Counting cannot be guessed. */
      if (L === 1) {
        const total = rnd(5, 9), bad = rnd(1, 3);
        return { prompt: `Claim: "every number in this list is even." The list has ${total} numbers, and ${bad} of them ${bad === 1 ? 'is' : 'are'} odd. How many counterexamples does the list contain?`,
          answer: bad, hint: 'Count only the ones that break the claim, not the ones that fit.' };
      }
      if (L === 2) {
        const good = rnd(20, 90), bad = rnd(1, 4);
        return { prompt: `A claim about ALL birds has ${good} supporting examples and ${bad} clear exception${bad === 1 ? '' : 's'}. How many counterexamples are there?`,
          answer: bad, hint: 'Supporting cases never cancel an exception. Count the exceptions.' };
      }
      const total = rnd(6, 10), bad = rnd(1, 3);
      return { prompt: `Claim: "every number here is greater than 10." ${total} numbers were checked; ${total - bad} passed. How many counterexamples?`,
        answer: bad, hint: 'The ones that did not pass are the counterexamples — subtract.' };
    },
  },

  /* ---- Earth & Space ----------------------------------------------------- */
  {
    id: 'es2a', subj: 'earth', day: 'es2', name: 'Plate Movement',
    gen: (level = 1) => {
      const L = clampLevel(level);
      const rate = pickOne([2, 3, 4, 5]);
      if (L === 1) { const yrs = pickOne([10, 100, 1000]);
        return { prompt: `A plate moves ${rate} cm per year. How far does it move in ${yrs} years, in cm?`,
          answer: rate * yrs, hint: 'A rate per year, times the number of years.' }; }
      if (L === 2) { const yrs = pickOne([200, 500, 1500, 2000]);
        return { prompt: `A plate moving ${rate} cm per year has travelled ${rate * yrs} cm. How many years did that take?`,
          answer: yrs, hint: 'Divide the distance by the rate.' }; }
      /* Rate is picked from divisors of 100,000 so the answer stays a whole
         number of years — a repeating decimal here would test typing, not
         understanding. */
      const r = pickOne([2, 4, 5]), km = pickOne([100, 200, 500]);
      return { prompt: `At ${r} cm per year, how many years to move ${km} km? (1 km = 100,000 cm.)`,
        answer: (km * 100000) / r, hint: 'Convert to centimetres first, then divide by the yearly rate.' };
    },
  },
  {
    id: 'es6a', subj: 'earth', day: 'es6', name: 'Gravity & Distance',
    gen: (level = 1) => {
      const L = clampLevel(level);
      const k = pickOne([2, 3, 4]);
      if (L === 1) return { prompt: `Gravity weakens with the SQUARE of distance. Move ${k} times further away — gravity becomes 1 over what?`,
        answer: k * k, hint: `Square the ${k}.` };
      if (L === 2) return { prompt: `Gravity has fallen to 1/${k * k} of its old strength. How many times further away did you move?`,
        answer: k, hint: 'Work backwards — what number squared gives that?' };
      const j = pickOne([2, 3]);
      return { prompt: `Move ${k} times further away, then ${j} times further again. Gravity is now 1 over what?`,
        answer: Math.pow(k * j, 2), hint: `The distances multiply first (${k} × ${j}), and only then do you square.` };
    },
  },
];

/* ---- Mathematics, days 1-14 --------------------------------------------
 *
 * These fourteen are the oldest drills in the app and by far the most used —
 * they cover the ratios-to-quadratics spine he meets first. They lived in
 * views.jsx, which is why the difficulty pass missed them entirely: they were
 * in a view file rather than with the other generators, so neither the
 * rewrite nor the test that checks for levels ever saw them. They sat on
 * gen() with no arguments, one shape at one difficulty, while every less-used
 * lane got three.
 *
 * Moved here and levelled. The ids dr1-dr14 are unchanged and must stay that
 * way: duel statistics are stored under them, so renaming one silently
 * orphans his practice history. Level 1 reproduces the old behaviour exactly.
 */
export const MATH_DRILLS = [
  { id: 'dr1', subj: 'math', day: 'm1', name: 'Unit Rates',
    gen: (level = 1) => { const L = clampLevel(level); const per = rnd(2, 9), n = pickOne([3, 4, 5, 6, 8]);
      if (L === 2) return { prompt: `One notebook costs $${per}. What do ${n} cost, in dollars?`,
        answer: per * n, hint: 'A unit rate times how many you want.' };
      if (L === 3) { const m = pickOne([2, 3, 4]);
        return { prompt: `${n} notebooks cost $${n * per}. At that rate, what do ${n * m} cost, in dollars?`,
          answer: n * m * per, hint: 'Find the cost of ONE first, then scale up.' }; }
      return { prompt: `${n} notebooks cost $${n * per}. What does ONE notebook cost, in dollars?`,
        answer: per, hint: 'Divide the total cost by how many there are.' }; } },
  { id: 'dr2', subj: 'math', day: 'm2', name: 'Percents',
    gen: (level = 1) => { const L = clampLevel(level); const p = pickOne([10, 20, 25, 50, 75]), n = pickOne([40, 60, 80, 100, 200]);
      if (L === 2) return { prompt: `${(p / 100) * n} is what percent of ${n}?`, answer: p,
        hint: 'Divide the part by the whole, then times 100.' };
      if (L === 3) return { prompt: `${p}% of a number is ${(p / 100) * n}. What is the number?`,
        answer: n, hint: 'Work backwards — divide the part by the percent written as a decimal.' };
      return { prompt: `What is ${p}% of ${n}?`, answer: (p / 100) * n, hint: `Turn ${p}% into a decimal, then multiply.` }; } },
  { id: 'dr3', subj: 'math', day: 'm3', name: 'Two-Step Equations',
    gen: (level = 1) => { const L = clampLevel(level); const a = rnd(2, 6), x = rnd(2, 9), b = rnd(1, 15);
      if (L === 2) return { prompt: `Solve ${a}x − ${b} = ${a * x - b}. What is x?`, answer: x,
        hint: `Add ${b} to both sides first, then divide by ${a}.` };
      /* Built from the answer outwards so the division is always exact —
         an equation that only works out to 3.67 tests a calculator. */
      if (L === 3) { const q = rnd(2, 8), sol = a * q - b;
        return { prompt: `Solve (x + ${b}) ÷ ${a} = ${q}. What is x?`, answer: sol,
          hint: `Multiply both sides by ${a} first, then subtract ${b}.` }; }
      return { prompt: `Solve ${a}x + ${b} = ${a * x + b}. What is x?`, answer: x,
        hint: `Subtract ${b} from both sides first, then divide by ${a}.` }; } },
  { id: 'dr4', subj: 'math', day: 'm4', name: 'Simplify & Evaluate',
    gen: (level = 1) => { const L = clampLevel(level); const a = rnd(2, 6), b = rnd(2, 6), x = rnd(2, 8);
      if (L === 2) return { prompt: `Simplify ${a}x + ${b}x − ${b}x, then evaluate it when x = ${x}.`,
        answer: a * x, hint: 'Two of the terms cancel before you substitute anything.' };
      if (L === 3) { const c = rnd(2, 5);
        return { prompt: `Simplify ${a}x + ${b}x + ${c}, then evaluate it when x = ${x}.`,
          answer: (a + b) * x + c, hint: `Only the x terms combine — the ${c} stays on its own.` }; }
      return { prompt: `Simplify ${a}x + ${b}x, then evaluate it when x = ${x}.`, answer: (a + b) * x,
        hint: `Combine like terms into ${a + b}x, then multiply by ${x}.` }; } },
  { id: 'dr5', subj: 'math', day: 'm5', name: 'Variables Both Sides',
    gen: (level = 1) => { const L = clampLevel(level);
      const x = rnd(2, 9), c = rnd(1, 4), a = c + rnd(1, 4), d = rnd(1, 12);
      const cs = c === 1 ? 'x' : c + 'x';
      if (L === 2) return { prompt: `Solve ${a}x = ${cs} + ${(a - c) * x}. What is x?`, answer: x,
        hint: `Gather the x terms: ${a}x minus ${cs} leaves ${a - c}x.` };
      if (L === 3) { const e = rnd(1, 9);
        return { prompt: `Solve ${a}x + ${d} = ${cs} + ${(a - c) * x + d + e} − ${e}. What is x?`, answer: x,
          hint: 'Tidy the right-hand side first, then gather the x terms.' }; }
      return { prompt: `Solve ${a}x + ${d} = ${cs} + ${(a - c) * x + d}. What is x?`, answer: x,
        hint: `Subtract ${cs} from both sides to gather the x terms.` }; } },
  { id: 'dr6', subj: 'math', day: 'm6', name: 'Lines & Slope',
    gen: (level = 1) => { const L = clampLevel(level); const m = rnd(2, 6), b = rnd(1, 9), x = rnd(2, 8);
      if (L === 2) return { prompt: `A line is y = ${m}x + ${b}. What is y when x = 0?`, answer: b,
        hint: 'At x = 0 the slope contributes nothing — only the starting value is left.' };
      if (L === 3) return { prompt: `A line passes through (0, ${b}) and (${x}, ${m * x + b}). What is its slope?`,
        answer: m, hint: 'Slope is the rise divided by the run between the two points.' };
      return { prompt: `For y = ${m}x + ${b}, what is y when x = ${x}?`, answer: m * x + b,
        hint: 'Multiply first, then add the starting value.' }; } },
  { id: 'dr7', subj: 'math', day: 'm7', name: 'Exponents',
    gen: (level = 1) => { const L = clampLevel(level);
      if (L === 2) { const a = rnd(2, 5), b = rnd(2, 5);
        return { prompt: `x^${a} · x^${b} = x^? — what is the exponent?`, answer: a + b,
          hint: 'Same base means you add the exponents.' }; }
      if (L === 3) { const a = rnd(5, 9), b = rnd(2, 4);
        return { prompt: `x^${a} ÷ x^${b} = x^? — what is the exponent?`, answer: a - b,
          hint: 'Dividing the same base subtracts the exponents.' }; }
      const a = rnd(2, 5), b = rnd(2, 4);
      return { prompt: `What is ${a}^${b}?`, answer: Math.pow(a, b), hint: `Multiply ${a} by itself ${b} times.` }; } },
  { id: 'dr8', subj: 'math', day: 'm8', name: 'Scientific Notation',
    gen: (level = 1) => { const L = clampLevel(level); const k = rnd(3, 9), lead = rnd(1, 9);
      if (L === 2) return { prompt: `${lead} × 10^${k} written out in full has how many digits altogether?`,
        answer: k + 1, hint: 'The leading digit, then one zero for each power of ten.' };
      if (L === 3) { const j = rnd(2, 5);
        return { prompt: `(${lead} × 10^${k}) ÷ (1 × 10^${j}) = ${lead} × 10^? — what is the exponent?`,
          answer: k - j, hint: 'Dividing powers of ten subtracts the exponents.' }; }
      return { prompt: `${lead}${'0'.repeat(k)} written as ${lead} × 10^? — what is the exponent?`,
        answer: k, hint: 'Count how many places the decimal point moves.' }; } },
  { id: 'dr9', subj: 'math', day: 'm9', name: 'Square Roots',
    gen: (level = 1) => { const L = clampLevel(level); const n = rnd(2, 15);
      if (L === 2) return { prompt: `√${n * n} + ${n} = ?`, answer: n * 2,
        hint: 'Take the root first, then add.' };
      if (L === 3) { const lo = rnd(2, 12), val = lo * lo + rnd(1, 2 * lo);
        return { prompt: `√${val} falls between which two whole numbers? Type the SMALLER one.`,
          answer: lo, hint: 'Find the perfect square just below it.' }; }
      return { prompt: `What is √${n * n}?`, answer: n, hint: 'What number times itself gives that value?' }; } },
  { id: 'dr10', subj: 'math', day: 'm10', name: 'Pythagorean Theorem',
    gen: (level = 1) => { const L = clampLevel(level);
      const t = pickOne([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [7, 24, 25]]);
      if (L === 2) return { prompt: `A right triangle has hypotenuse ${t[2]} and one leg ${t[0]}. What is the other leg?`,
        answer: t[1], hint: 'Square the hypotenuse, subtract the known leg squared, then take the root.' };
      if (L === 3) return { prompt: `A right triangle has legs ${t[0]} and ${t[1]}. What is its PERIMETER?`,
        answer: t[0] + t[1] + t[2], hint: 'Find the hypotenuse first, then add all three sides.' };
      return { prompt: `A right triangle has legs ${t[0]} and ${t[1]}. What is the hypotenuse?`,
        answer: t[2], hint: 'Square both legs, add them, then take the square root.' }; } },
  { id: 'dr11', subj: 'math', day: 'm11', name: 'Systems of Equations',
    gen: (level = 1) => { const L = clampLevel(level); const x = rnd(3, 12), y = rnd(1, x - 1);
      if (L === 2) return { prompt: `x + y = ${x + y} and x − y = ${x - y}. What is y?`, answer: y,
        hint: 'Subtract the second equation from the first so the x terms cancel, then halve.' };
      if (L === 3) return { prompt: `2x + y = ${2 * x + y} and x + y = ${x + y}. What is x?`, answer: x,
        hint: 'Subtract the second from the first — the y terms cancel and x is left alone.' };
      return { prompt: `x + y = ${x + y} and x − y = ${x - y}. What is x?`, answer: x,
        hint: 'Add the two equations so the y terms cancel, then halve.' }; } },
  { id: 'dr12', subj: 'math', day: 'm12', name: 'Inequalities',
    gen: (level = 1) => { const L = clampLevel(level); const b = rnd(2, 9), x = rnd(3, 15);
      if (L === 2) return { prompt: `Solve x − ${b} > ${x - b}. The answer is x greater than what number?`,
        answer: x, hint: `Add ${b} to both sides.` };
      if (L === 3) { const a = rnd(2, 5);
        return { prompt: `Solve ${a}x < ${a * x}. The answer is x less than what number?`, answer: x,
          hint: `Divide both sides by ${a}. Dividing by a POSITIVE number leaves the sign alone.` }; }
      return { prompt: `Solve x + ${b} > ${x + b}. The answer is x greater than what number?`,
        answer: x, hint: `Subtract ${b} from both sides.` }; } },
  { id: 'dr13', subj: 'math', day: 'm13', name: 'Function Notation',
    gen: (level = 1) => { const L = clampLevel(level); const a = rnd(2, 6), b = rnd(1, 9), k = rnd(2, 8);
      if (L === 2) return { prompt: `If f(x) = ${a}x + ${b} and f(x) = ${a * k + b}, what is x?`, answer: k,
        hint: 'Work backwards — undo the adding, then the multiplying.' };
      if (L === 3) return { prompt: `If f(x) = ${a}x + ${b}, what is f(${k}) − f(0)?`, answer: a * k,
        hint: 'f(0) is just the starting value, so the difference is whatever the slope contributed.' };
      return { prompt: `If f(x) = ${a}x + ${b}, what is f(${k})?`, answer: a * k + b,
        hint: `Replace every x with ${k}, then compute.` }; } },
  { id: 'dr14', subj: 'math', day: 'm14', name: 'Quadratics',
    gen: (level = 1) => { const L = clampLevel(level);
      const c = rnd(0, 6), k = pickOne([-4, -3, -2, 2, 3, 4, 5]);
      /* Was level 1 with the sign of x flipped, which the squaring erases —
         the same question wearing a minus sign. This asks for the lowest
         point instead, which is where the constant actually shows itself. */
      if (L === 2) return { prompt: `For y = x²${c ? ' + ' + c : ''}, what is the SMALLEST value y can ever be?`,
        answer: c, hint: 'x² is never negative, so the smallest it contributes is zero.' };
      if (L === 3) { const n = Math.abs(k);
        return { prompt: `For y = x², two different x values give y = ${n * n}. What is the POSITIVE one?`,
          answer: n, hint: 'Both a number and its negative square to the same thing.' }; }
      return { prompt: `For y = x²${c ? ' + ' + c : ''}, what is y when x = ${k}?`, answer: k * k + c,
        hint: 'Square the input first — a negative squared turns positive.' }; } },
];
