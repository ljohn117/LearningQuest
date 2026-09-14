/* Generated practice for Connections and Teardowns.
 *
 * Both lanes had none, for the same reason English had none: the duel could
 * only ask questions with a numeric answer, and a lane about noticing the
 * same shape in four different places does not reduce to arithmetic. Some of
 * it does, though — more than I expected once I looked. A gear ratio is
 * division, a half-life is repeated halving, a water bill is a unit rate.
 * Those are numeric here. The rest are multiple choice.
 *
 * WHAT CONNECTIONS DRILLS ARE FOR. The lane's whole claim is that one idea
 * keeps turning up wearing different clothes, so a drill that always dresses
 * it the same way defeats the point. Every generator here picks its DOMAIN at
 * random as well as its numbers: the same halving question arrives as a
 * bacterial colony, a radioactive sample, a price cut or a folded sheet of
 * paper, and the only way to answer all four is to have the idea rather than
 * the phrasing.
 */
import { clampLevel, rnd, pickOne, mc, shuffled, sample } from './drill-kit.js';

/* ======================= CONNECTIONS ==================================== */

/* ---- cx1 · Powers of Two, Everywhere ----------------------------------- */

const DOUBLERS = [
  { thing: 'a bacterial colony', unit: 'hours', verb: 'doubles' },
  { thing: 'a rumour in a school', unit: 'days', verb: 'doubles' },
  { thing: 'a savings pot at a very good rate', unit: 'years', verb: 'doubles' },
  { thing: 'the number of folds in a sheet of paper', unit: 'folds', verb: 'doubles' },
];
const HALVERS = [
  { thing: 'a radioactive sample', unit: 'years', noun: 'grams' },
  { thing: 'a drug in the bloodstream', unit: 'hours', noun: 'milligrams' },
  { thing: 'the price of an old phone model', unit: 'years', noun: 'pounds' },
  { thing: 'the light through each sheet of dark glass', unit: 'sheets', noun: 'units' },
];

const cx1 = { id: 'cx1a', subj: 'connect', day: 'cx1', name: 'Powers of Two',
  gen(level = 1) {
    const L = clampLevel(level);
    if (L === 3) {
      /* Backwards: how many doublings. This is a logarithm, met before it is
         called one — and m24 calls it one later. */
      const n = rnd(4, 12);
      const d = pickOne(DOUBLERS);
      return { prompt: `Something ${d.verb} each step, starting from 1. It has reached ${2 ** n}. How many steps was that?`,
        answer: n, hint: 'Count how many times you can halve it before you get back to 1.' };
    }
    if (L === 2) {
      const h = pickOne(HALVERS);
      const steps = rnd(2, 5);
      const start = 2 ** steps * pickOne([1, 3, 5, 25]);
      return { prompt: `${h.thing.charAt(0).toUpperCase() + h.thing.slice(1)} halves every ${rnd(2, 6)} ${h.unit}, and it starts at ${start} ${h.noun}. After ${steps} halvings, how many ${h.noun} are left?`,
        answer: start / 2 ** steps, hint: 'Halve it once per halving. Do not divide by the number of halvings — halve, then halve that, and so on.' };
    }
    const d = pickOne(DOUBLERS);
    const every = rnd(2, 5), total = every * rnd(2, 6);
    return { prompt: `${d.thing.charAt(0).toUpperCase() + d.thing.slice(1)} ${d.verb} every ${every} ${d.unit}. Starting from 1, how many after ${total} ${d.unit}?`,
      answer: 2 ** (total / every), hint: `First work out how many doublings fit into ${total} ${d.unit}. Then double that many times.` };
  } };

/* ---- cx2 · If-Then in Four Places --------------------------------------- */

/* The same conditional in four costumes. Negations are written to be about
   as long as the positives, so the correct option cannot be spotted by
   length — a real risk here, since a contrapositive is naturally the wordiest
   thing on screen unless you write it carefully. */
const CONDITIONALS = [
  { dom: 'Weather', p: 'it rains', np: 'it stays dry', q: 'the match is cancelled', nq: 'the match goes ahead' },
  { dom: 'Code', p: 'the score passes 100', np: 'the score stays under 100', q: 'the badge appears', nq: 'no badge appears' },
  { dom: 'Law', p: 'the van is over 3.5 tonnes', np: 'the van is under 3.5 tonnes', q: 'a bigger licence is needed', nq: 'a normal licence is fine' },
  { dom: 'Science', p: 'the sample contains starch', np: 'the sample is starch-free', q: 'the iodine turns blue-black', nq: 'the iodine stays orange' },
  { dom: 'Biology', p: 'the plant gets no light', np: 'the plant gets some light', q: 'the leaves lose their green', nq: 'the leaves keep their green' },
];

const FORMS = [
  { premise: 'p', conclude: 'q', verdict: 'Sound — the rule was used forwards' },
  { premise: 'nq', conclude: 'np', verdict: 'Sound — the rule was used backwards from a NO' },
  { premise: 'q', conclude: 'p', verdict: 'Not sound — it ran backwards from a YES' },
  { premise: 'np', conclude: 'nq', verdict: 'Not sound — it flipped the rule over' },
];
const VERDICTS = FORMS.map((f) => f.verdict);

const cx2 = { id: 'cx2a', subj: 'connect', day: 'cx2', name: 'If-Then',
  gen(level = 1) {
    const L = clampLevel(level);
    const c = pickOne(CONDITIONALS);
    if (L === 3) {
      const f = pickOne(FORMS);
      return {
        prompt: 'Is this reasoning sound, and why?',
        passage: `Rule: if ${c.p}, then ${c.q}.\nWe know: ${c[f.premise]}.\nSo: ${c[f.conclude]}.`,
        ...mc(f.verdict, VERDICTS.filter((v) => v !== f.verdict)),
        hint: 'A rule only runs two ways: forwards from a YES on the left, and backwards from a NO on the right. The other two directions prove nothing.',
      };
    }
    if (L === 2) {
      const seen = pickOne(['p', 'nq', 'q', 'np']);
      /* Two of the four observations tell you nothing, which is the lesson —
         but it also means that option is right half the time, so it must not
         be the shortest thing on screen. Spelled out in full for that reason,
         not for emphasis. */
      /* Length tuned, not guessed. This option is correct half the time — two
         of the four observations really do tell you nothing — so if it is
         also the shortest thing on screen it stops testing the idea. At 38
         characters it was shortest 35% of the time against 25% by chance,
         which put it close enough to the test's bar to fail at random. At 41
         it measures 25% longest and 15% shortest. */
      const nothing = 'Nothing you can rely on follows from this';
      const right = seen === 'p' ? `It must be that ${c.q}`
        : seen === 'nq' ? `It must be that ${c.np}` : nothing;
      return {
        prompt: `Rule: if ${c.p}, then ${c.q}. You observe that ${c[seen]}. What follows?`,
        ...mc(right, [`It must be that ${c.q}`, `It must be that ${c.np}`,
          `It must be that ${c.p}`, nothing]),
        hint: 'Check which side of the rule you landed on. Seeing the left-hand side happen tells you the right. Seeing the right-hand side NOT happen tells you the left. The other two tell you nothing.',
      };
    }
    return {
      prompt: `Rule: if ${c.p}, then ${c.q}. Which one MUST also be true?`,
      ...mc(`If ${c.nq}, then ${c.np}`,
        [`If ${c.q}, then ${c.p}`, `If ${c.np}, then ${c.nq}`, `${c.q} whatever happens`]),
      hint: 'Turn it round AND flip both halves to negatives. Doing only one of those two things gives you something that sounds right and is not.',
    };
  } };

/* ---- cx3 · Ratios Wearing Disguises ------------------------------------- */

const RATIO_WORLDS = [
  { a: 'tall plants', b: 'short plants', where: 'a garden bed' },
  { a: 'predators', b: 'prey animals', where: 'a valley' },
  { a: 'pounds saved', b: 'pounds spent', where: 'a monthly budget' },
  { a: 'copper parts', b: 'zinc parts', where: 'a batch of brass' },
  { a: 'salt grams', b: 'water grams', where: 'a brine mix' },
];

const cx3 = { id: 'cx3a', subj: 'connect', day: 'cx3', name: 'Ratios in Disguise',
  gen(level = 1) {
    const L = clampLevel(level);
    const w = pickOne(RATIO_WORLDS);
    if (L === 3) {
      /* Two ratios chained. Genetics into ecology into economics — the chain
         is the point, and it is the same chain every time underneath. */
      const r1 = rnd(2, 5), r2 = rnd(2, 6), n = rnd(2, 9);
      return { prompt: `For every 1 ${w.a.replace(/s$/, '')} there are ${r1} ${w.b}, and for every 1 of those there are ${r2} plants. With ${n} ${w.a}, how many plants?`,
        answer: n * r1 * r2, hint: 'Walk the chain one link at a time rather than trying to see the whole thing at once.' };
    }
    if (L === 2) {
      const a = rnd(2, 6), b = rnd(2, 7), part = a * rnd(2, 9);
      return { prompt: `In ${w.where} the ratio of ${w.a} to ${w.b} is ${a}:${b}. There are ${part} ${w.a}. How many ${w.b}?`,
        answer: (part / a) * b, hint: `Find what one "share" is worth by dividing ${part} by ${a}, then take ${b} of them.` };
    }
    const a = rnd(1, 5), b = rnd(1, 6), k = rnd(2, 9);
    return { prompt: `In ${w.where} the ratio of ${w.a} to ${w.b} is ${a}:${b}, and there are ${(a + b) * k} in total. How many ${w.b}?`,
      answer: b * k, hint: `The total splits into ${a + b} equal shares. Work out one share, then take ${b} of them.` };
  } };

/* ---- cx4 · Reading the Evidence ----------------------------------------- */

const INVESTIGATIONS = [
  { question: 'Did the flood come before or after the wall was built?',
    settles: 'Whether the silt runs under the wall or over it.',
    wrong: ['How thick the layer of silt is at its deepest point.',
      'How old the stones in the wall turn out to be.',
      'Whether anyone wrote the flood down at the time.'] },
  { question: 'Did this crash start in the login code or the database?',
    settles: 'Which of the two logged an error first.',
    wrong: ['Which of the two has more lines of code in it.',
      'Which one the team changed most recently.',
      'Which one users complain about more often.'] },
  { question: 'Which of these two fossils lived earlier?',
    settles: 'Which rock layer each one was found in.',
    wrong: ['Which of the two skeletons is more complete.',
      'Which one looks more like animals alive today.',
      'Which of the two was dug up first.'] },
  { question: 'Did the author actually read the report they cite?',
    settles: 'Whether their summary matches what the report says.',
    wrong: ['Whether the report is famous enough to know of.',
      'Whether the author has written on this before.',
      'Whether the citation is formatted correctly.'] },
];

const CONCLUSIONS = [
  { evidence: 'The silt layer runs over the top of the wall.',
    right: 'The flood came after the wall was built.',
    wrong: ['The flood is what knocked the wall down.',
      'The wall was built to hold back floods.',
      'The flood came before the wall was built.'] },
  { evidence: 'The error in the database log is timestamped first.',
    right: 'The database failed before the login code did.',
    wrong: ['The database is what caused the whole crash.',
      'The login code was written badly to begin with.',
      'The login code failed before the database did.'] },
  { evidence: 'Fossil A is in a layer beneath the layer holding fossil B.',
    right: 'Fossil A was buried earlier than fossil B.',
    wrong: ['Fossil A is an ancestor of fossil B.',
      'Fossil A belongs to a simpler kind of animal.',
      'Fossil B was buried earlier than fossil A.'] },
  { evidence: 'Litter halved in the one corner that got new bins.',
    right: 'Litter fell where the bins were added.',
    wrong: ['Bins are the only thing that reduces litter.',
      'People in that corner care more about the park.',
      'Signs have no effect on litter anywhere.'] },
];

const cx4 = { id: 'cx4a', subj: 'connect', day: 'cx4', name: 'Reading Evidence',
  gen(level = 1) {
    const L = clampLevel(level);
    if (L === 3) {
      const c = pickOne(CONCLUSIONS);
      return {
        prompt: 'Which conclusion does this evidence actually support?',
        passage: c.evidence,
        ...mc(c.right, c.wrong),
        hint: 'Three of these are stories you could tell around the evidence. Only one is a thing the evidence by itself makes certain.',
      };
    }
    if (L === 2) {
      const it = pickOne(INVESTIGATIONS);
      return {
        prompt: 'What would settle this question?',
        passage: it.question,
        ...mc(it.settles, it.wrong),
        hint: 'Look for the observation that would come out differently depending on the answer. The others are true facts that stay the same either way.',
      };
    }
    /* Layers, counted. Undisturbed rock, a stack of papers and a commit log
       all obey the same rule: lower means earlier. */
    const total = rnd(5, 12), at = rnd(2, total - 1);
    const dressed = pickOne([
      `Rock layers are numbered 1 at the bottom up to ${total} at the top. A fossil sits in layer ${at}.`,
      `A stack of ${total} letters has built up, oldest at the bottom. One you want is ${at} from the bottom.`,
      `A project has ${total} saved versions, the first at the bottom. A bug appears in version ${at}.`,
    ]);
    return { prompt: `${dressed} How many are YOUNGER than it?`,
      answer: total - at, hint: 'Nothing below it can be younger. Count only what sits above.' };
  } };

/* ---- cx5 · Nothing Disappears ------------------------------------------- */

const BUDGETS = [
  { in: 'joules of electricity', outs: ['joules of movement', 'joules of sound'], rest: 'joules of heat', who: 'A motor takes in' },
  { in: 'pounds of takings', outs: ['pounds of rent', 'pounds of wages'], rest: 'pounds of profit', who: 'A shop takes in' },
  { in: 'litres of rain', outs: ['litres soaking in', 'litres running off'], rest: 'litres evaporating', who: 'A field receives' },
  { in: 'grams of reactants', outs: ['grams of solid product', 'grams of liquid product'], rest: 'grams of gas', who: 'A reaction starts with' },
];

const cx5 = { id: 'cx5a', subj: 'connect', day: 'cx5', name: 'Nothing Disappears',
  gen(level = 1) {
    const L = clampLevel(level);
    const b = pickOne(BUDGETS);
    if (L === 3) {
      /* Two stages, each losing a share. The total still balances; it just
         balances twice. */
      const start = pickOne([200, 400, 800, 1000]);
      const keep1 = pickOne([25, 50, 75]), keep2 = pickOne([20, 40, 80]);
      const mid = (start * keep1) / 100;
      return { prompt: `${b.who} ${start} ${b.in}. The first stage passes on ${keep1}% of it, and the second passes on ${keep2}% of THAT. How much comes out the far end?`,
        answer: (mid * keep2) / 100, hint: 'Do one stage, get a number, then do the second stage to that number. Percentages do not add up along a chain.' };
    }
    if (L === 2) {
      const o1 = rnd(20, 90), o2 = rnd(20, 90), rest = rnd(20, 120);
      return { prompt: `Something ends up as ${o1} ${b.outs[0]}, ${o2} ${b.outs[1]} and ${rest} ${b.rest}. Nothing is lost. How much went in?`,
        answer: o1 + o2 + rest, hint: 'Everything that came out was there at the start. Add it all back up.' };
    }
    const total = rnd(200, 900), o1 = rnd(20, 80), o2 = rnd(20, 80);
    return { prompt: `${b.who} ${total} ${b.in}. ${o1} leave as ${b.outs[0]} and ${o2} as ${b.outs[1]}. The rest is ${b.rest} — how much?`,
      answer: total - o1 - o2, hint: 'Nothing vanishes. Whatever is not accounted for is still there, just in a form nobody mentioned.' };
  } };

/* ---- cx6 · Zooming Out --------------------------------------------------- */

/* NAMES ARE CHOSEN AGAINST SIZE ON PURPOSE. The first version of this bank
   read "an atom" up to "the solar system", and the largest thing on screen
   was almost always the longest words on screen too — 42% of the time the
   right answer was simply the longest option, which teaches counting letters
   rather than thinking in powers of ten. Big things here get short names and
   small things get long ones, roughly half the time each way, so the tell
   points nowhere. */
const SCALES = [
  { name: 'a hydrogen atom', log: -10 },
  { name: 'a virus', log: -7 },
  { name: 'a red blood cell', log: -5 },
  { name: 'a speck of house dust', log: -4 },
  { name: 'a pinhead', log: -3 },
  { name: 'a grain of rice', log: -2 },
  { name: 'your hand', log: -1 },
  { name: 'a person', log: 0 },
  { name: 'a football pitch', log: 2 },
  { name: 'a city', log: 4 },
  { name: 'a fair-sized country', log: 6 },
  { name: 'the Moon', log: 6.5 },
  { name: 'the Earth', log: 7 },
  { name: 'Jupiter', log: 8 },
  { name: 'the Sun', log: 9 },
  { name: 'the distance to Neptune', log: 12 },
  { name: 'the Milky Way', log: 21 },
];

const cx6 = { id: 'cx6a', subj: 'connect', day: 'cx6', name: 'Zooming Out',
  gen(level = 1) {
    const L = clampLevel(level);
    if (L === 3) {
      const small = pickOne(SCALES.filter((s) => s.log <= -5));
      const big = pickOne(SCALES.filter((s) => s.log >= 0 && s.log <= 4));
      return { prompt: `${small.name.charAt(0).toUpperCase() + small.name.slice(1)} is about 10^${small.log} metres across and ${big.name} about 10^${big.log} metres. How many of the first would fit across the second, as a power of ten?`,
        answer: big.log - small.log, hint: 'Dividing powers of ten means subtracting the exponents. Answer with the exponent alone.' };
    }
    if (L === 2) {
      const four = sample(SCALES, 4);
      const biggest = four.reduce((a, b) => (b.log > a.log ? b : a));
      return {
        prompt: 'Which of these is the LARGEST?',
        ...mc(biggest.name, four.filter((s) => s !== biggest).map((s) => s.name)),
        hint: 'Do not go by how familiar a thing is. Put each one on a ruler of powers of ten and read off the biggest.',
      };
    }
    const a = rnd(1, 6), gap = rnd(1, 5);
    return { prompt: `How many times bigger is 10^${a + gap} than 10^${a}?`,
      answer: 10 ** gap, hint: 'Subtract the small exponent from the big one. That difference is how many tens you multiply together.' };
  } };

/* ---- cx7 · Things That Push Back ---------------------------------------- */

/* Negative feedback in four costumes. The whole lane exists for moments like
   this one: the body, a market and a constitution are running the same loop,
   and once you can see it in one you can see it in all three. */
/* Each loop carries FOUR responses in its own domain, not one.
 *
 * The first version drew the wrong answers from other systems, so the body
 * heat question offered "insulin is released and sugar is stored" as a
 * distractor — recognisably about blood sugar, and therefore rejectable
 * without knowing the first thing about feedback. Every option below is a
 * thing that could plausibly happen to THIS system, and only one of them is
 * what a system that holds steady actually does. */
const LOOPS = [
  { dom: 'Body heat', push: 'you get too hot',
    back: 'you sweat, and blood moves out towards the skin',
    run: 'you shiver, which makes still more heat',
    idle: 'nothing changes until you decide to move',
    over: 'you cool past comfortable and start shivering' },
  { dom: 'Blood sugar', push: 'blood sugar climbs after a meal',
    back: 'insulin is released and the sugar is stored',
    run: 'more sugar is released into the blood',
    idle: 'the level stays high until the next meal',
    over: 'so much is stored that the level crashes low' },
  { dom: 'A market', push: 'a shortage pushes the price up',
    back: 'the high price draws in more sellers',
    run: 'sellers hold stock back, pushing it higher',
    idle: 'the price stays exactly where it is',
    over: 'so many sellers arrive that the price collapses' },
  { dom: 'Government', push: 'one branch grabs extra power',
    back: 'the other branches can block it',
    run: 'the other branches grab more in turn',
    idle: 'the other branches carry on as before',
    over: 'the other branches strip it of the power it had' },
  { dom: 'A thermostat', push: 'the room drops below the setting',
    back: 'the heating switches on and warms it back',
    run: 'the heating switches off, cooling it further',
    idle: 'the heating carries on exactly as it was',
    over: 'the heating runs until the room is far too hot' },
];

/* The third option in the level-2 question used to be unreachable: every item
   was either a steadying loop or a runaway one, so "neither" was never the
   answer and a guesser was really choosing between two. These are systems
   where the response genuinely has nothing to do with the change. */
const UNRELATED = [
  { dom: 'A vending machine', push: 'the queue behind it gets longer', back: 'it keeps dispensing at exactly the same speed' },
  { dom: 'A streetlight', push: 'more cars start using the road', back: 'it goes on and off on its timer as before' },
  { dom: 'A river', push: 'someone paints the bridge over it', back: 'the water keeps flowing at the rate it did' },
  { dom: 'A clock', push: 'the room it is in gets much busier', back: 'the hands move round at the same rate' },
];

const RUNAWAYS = [
  { dom: 'Ice and sunlight', push: 'ice melts off dark ground', back: 'the dark ground soaks up more heat, melting more ice' },
  { dom: 'A microphone', push: 'a speaker feeds sound back', back: 'the mic amplifies it, and round it goes' },
  { dom: 'A bank run', push: 'people hear a bank may fail', back: 'they all withdraw at once, making failure likelier' },
  { dom: 'A rumour', push: 'a story gets repeated once', back: 'each retelling makes the next one likelier still' },
  { dom: 'A cracked screen', push: 'a small crack opens', back: 'the crack weakens the glass around it' },
  { dom: 'A crowd', push: 'a few people start running', back: 'the running makes more people run' },
];

const cx7 = { id: 'cx7a', subj: 'connect', day: 'cx7', name: 'Push-Back Loops',
  gen(level = 1) {
    const L = clampLevel(level);
    if (L === 3) {
      const a = pickOne(LOOPS);
      const b = pickOne(LOOPS.filter((x) => x.dom !== a.dom));
      return {
        prompt: `${a.dom}: when ${a.push}, ${a.back}. Which one is the SAME shape?`,
        ...mc(`${b.dom}: when ${b.push}, ${b.back}`,
          sample(RUNAWAYS, 3).map((r) => `${r.dom}: when ${r.push}, ${r.back}`)),
        hint: 'Ask of each: does the response push back against the change, or add to it? Only one of these pushes back.',
      };
    }
    if (L === 2) {
      const kind = rnd(0, 2);
      const it = pickOne([LOOPS, RUNAWAYS, UNRELATED][kind]);
      const verdicts = ['Steadies it — the response undoes the change',
        'Runs away — the response adds to the change',
        'Neither — the response ignores the change'].map((t) => t.replace('—', '—'));
      return {
        prompt: 'What does this system do about the change?',
        passage: `${it.dom}: when ${it.push}, ${it.back}.`,
        ...mc(verdicts[kind], verdicts.filter((_, i) => i !== kind)),
        hint: 'Follow it round once more. If you end up further from where you started it runs away; back where you started, it steadies; exactly where you would have been anyway, there is no loop at all.',
      };
    }
    const l = pickOne(LOOPS);
    return {
      prompt: `${l.dom}: ${l.push}. What does a system that HOLDS STEADY do?`,
      ...mc(l.back, [l.run, l.idle, l.over]),
      hint: 'Steadying means pushing back just enough to undo the change — not adding to it, not ignoring it, and not overshooting the other way.',
    };
  } };

/* ======================= TEARDOWNS ====================================== */

/* These came out more numeric than expected. A pencil's price, a bicycle's
   gears, a battery's hours and a water bill are all arithmetic once you open
   them up — which is the lane's point, so the drills lean into it. */

const cx = [cx1, cx2, cx3, cx4, cx5, cx6, cx7];

/* ---- td1 · A Pencil ------------------------------------------------------ */

const td1 = { id: 'td1a', subj: 'teardown', day: 'td1', name: 'What a Thing Costs',
  gen(level = 1) {
    const L = clampLevel(level);
    if (L === 3) {
      const cost = pickOne([20, 25, 30, 40, 50]), markup = pickOne([10, 20, 25, 50, 100]);
      return { prompt: `A pencil costs ${cost}p to make and sells for ${markup}% more than that. What is the selling price, in pence?`,
        answer: cost + (cost * markup) / 100, hint: `Work out ${markup}% of ${cost} first, then add it on — the markup is on top of the cost, not instead of it.` };
    }
    if (L === 2) {
      const n = pickOne([10, 12, 20, 25, 50]), each = pickOne([15, 20, 24, 35, 40]);
      return { prompt: `A box of ${n} pencils costs ${(n * each) / 100} pounds. What does one pencil cost, in pence?`,
        answer: each, hint: 'Turn the pounds into pence first, then divide by how many are in the box.' };
    }
    const price = pickOne([60, 80, 100, 120]);
    const mat = rnd(8, 20), make = rnd(6, 18), ship = rnd(4, 14);
    return { prompt: `A pencil sells for ${price}p. Materials are ${mat}p, making it ${make}p and shipping ${ship}p. How many pence are left over?`,
      answer: price - mat - make - ship, hint: 'Add up everything it costs, then take that away from what it sells for.' };
  } };

/* ---- td2 · A Bicycle ----------------------------------------------------- */

const td2 = { id: 'td2a', subj: 'teardown', day: 'td2', name: 'Gears',
  gen(level = 1) {
    const L = clampLevel(level);
    if (L === 3) {
      /* Circumference kept to whole metres on purpose: the question is about
         chaining a ratio to a distance, not about pi. */
      const back = pickOne([12, 14, 16, 18]);
      const front = back * pickOne([2, 3, 4]);
      const circ = 2, turns = rnd(3, 12);
      return { prompt: `A bike has ${front} teeth at the front and ${back} at the back, and the wheel covers ${circ} metres per turn. How far do ${turns} turns of the pedals take you, in metres?`,
        answer: (front / back) * circ * turns,
        hint: 'Find how many wheel turns one pedal turn gives, then multiply by the metres per wheel turn, then by the number of pedal turns.' };
    }
    if (L === 2) {
      const ratio = pickOne([2, 3, 4]), wheel = ratio * rnd(3, 15);
      return { prompt: `Each turn of the pedals spins the wheel ${ratio} times. The wheel went round ${wheel} times. How many times did the pedals go round?`,
        answer: wheel / ratio, hint: 'This is the gear question backwards. Divide rather than multiply.' };
    }
    const back = pickOne([12, 14, 16, 18]);
    const front = back * pickOne([2, 3, 4]);
    return { prompt: `A bike has ${front} teeth on the front ring and ${back} on the back. How many times does the wheel turn for one turn of the pedals?`,
      answer: front / back, hint: 'Divide the front teeth by the back teeth. More teeth at the front means the wheel goes round more.' };
  } };

/* ---- td3 · A Loaf of Bread ---------------------------------------------- */

const td3 = { id: 'td3a', subj: 'teardown', day: 'td3', name: 'Dough Maths',
  gen(level = 1) {
    const L = clampLevel(level);
    if (L === 3) {
      /* Yeast roughly doubles its rate per 10 degrees. Same powers of two as
         cx1, arriving in a kitchen. */
      const base = pickOne([120, 160, 240, 320]), steps = rnd(1, 3);
      return { prompt: `Dough rises twice as fast for every 10°C warmer. At 20°C it needs ${base} minutes. How many minutes at ${20 + steps * 10}°C?`,
        answer: base / 2 ** steps, hint: 'Twice as fast means half the time. Halve it once for each 10 degrees.' };
    }
    if (L === 2) {
      const flour = pickOne([300, 400, 500, 600]), mult = pickOne([2, 3, 4]);
      return { prompt: `A recipe uses ${flour} g of flour and makes 1 loaf. You want ${mult} loaves. How many grams of flour?`,
        answer: flour * mult, hint: 'Every ingredient scales by the same factor — that is what keeps the loaf the same loaf.' };
    }
    const flour = pickOne([400, 500, 600, 800]), hyd = pickOne([50, 60, 65, 70, 75]);
    return { prompt: `Bakers measure water as a percent of the flour. With ${flour} g of flour at ${hyd}% water, how many grams of water?`,
      answer: (flour * hyd) / 100, hint: `${hyd}% of ${flour} — turn the percent into a decimal and multiply.` };
  } };

/* ---- td4 · The Battery in Your Hand ------------------------------------- */

const td4 = { id: 'td4a', subj: 'teardown', day: 'td4', name: 'Battery Maths',
  gen(level = 1) {
    const L = clampLevel(level);
    if (L === 3) {
      /* Built so the division comes out clean. Left to chance this produced
         3.125 hours, which tests typing rather than the idea. */
      const cap = pickOne([1000, 2000, 3000, 4000]), pct = pickOne([25, 50, 75]);
      const left = (cap * pct) / 100;
      const fits = [100, 125, 200, 250, 500].filter((d) => left % d === 0);
      const draw = fits.length ? pickOne(fits) : 125;
      return { prompt: `A ${cap} mAh battery is at ${pct}% charge, and the device draws ${draw} mA. How many hours before it is empty?`,
        answer: left / draw, hint: 'Work out how many mAh are actually left first, then divide by the draw.' };
    }
    if (L === 2) {
      const v = pickOne([1.5, 3.7, 5, 12]), ah = pickOne([1, 2, 4, 5]);
      return { prompt: `Stored energy is volts times amp-hours. A ${v} V battery holding ${ah} Ah stores how many watt-hours?`,
        answer: Math.round(v * ah * 100) / 100, hint: 'Just multiply the two. Volts tell you the push, amp-hours how much charge there is to push.' };
    }
    const draw = pickOne([100, 125, 200, 250, 500]);
    const cap = draw * pickOne([4, 6, 8, 10, 12]);
    return { prompt: `A ${cap} mAh battery powers a device that draws ${draw} mA. How many hours does it last?`,
      answer: cap / draw, hint: 'Divide what is stored by how fast it is being used.' };
  } };

/* ---- td5 · The Screen You Are Touching ---------------------------------- */

const td5 = { id: 'td5a', subj: 'teardown', day: 'td5', name: 'Screen Maths',
  gen(level = 1) {
    const L = clampLevel(level);
    if (L === 3) {
      const w = pickOne([200, 320, 400, 800]);
      const pct = pickOne([25, 50, 75, 10, 20]);
      return { prompt: `A screen is ${w} pixels wide. A touch lands at x = ${(w * pct) / 100}. How far across is that, as a percentage?`,
        answer: pct, hint: 'Divide where it landed by the full width, then multiply by 100.' };
    }
    if (L === 2) {
      const w = pickOne([10, 20, 50, 100]), h = pickOne([10, 20, 40, 100]), bytes = pickOne([1, 3, 4]);
      return { prompt: `An image is ${w} by ${h} pixels and each pixel takes ${bytes} bytes. How many bytes in total?`,
        answer: w * h * bytes, hint: 'Count the pixels first — width times height — then multiply by the bytes each one needs.' };
    }
    const w = pickOne([320, 640, 800, 1024]), h = pickOne([200, 400, 480, 600]);
    return { prompt: `A screen is ${w} pixels across and ${h} down. How many pixels does it have?`,
      answer: w * h, hint: 'It is a rectangle of pixels. Width times height.' };
  } };

/* ---- td6 · Water From the Tap -------------------------------------------- */

const td6 = { id: 'td6a', subj: 'teardown', day: 'td6', name: 'Water Maths',
  gen(level = 1) {
    const L = clampLevel(level);
    if (L === 3) {
      const mlPer10s = pickOne([1, 2, 3, 5]);
      return { prompt: `A tap drips ${mlPer10s} ml every 10 seconds. How many litres is that in an hour?`,
        answer: Math.round(mlPer10s * 6 * 60 / 10) / 100, hint: 'Get it to millilitres per hour first, then remember a litre is 1000 ml.' };
    }
    if (L === 2) {
      const perThousand = pickOne([1.2, 1.5, 2, 2.5]), litres = pickOne([100, 150, 180, 200]);
      return { prompt: `Water costs ${perThousand} pounds per 1000 litres. What does a ${litres} litre bath cost, in pence?`,
        answer: Math.round(perThousand * 100 * litres / 1000 * 100) / 100, hint: 'Find the cost of one litre in pence, then multiply by how many litres.' };
    }
    const litres = pickOne([2, 4, 5, 10]), perL = rnd(2, 40);
    return { prompt: `${litres * perL} mg of minerals are dissolved in ${litres} litres of water. How many mg per litre?`,
      answer: perL, hint: 'A concentration is a unit rate. Divide the total by the number of litres.' };
  } };

export const SYSTEMS_DRILLS = [...cx, td1, td2, td3, td4, td5, td6];
