/* Generated practice for English & Writing.
 *
 * WHY THIS FILE EXISTS
 *
 * Ten days, and until now not one practice question between them. Not because
 * the lane has nothing to practise — sentence structure, evidence, tone and
 * revision are more drillable than most of chemistry — but because the duel
 * could only ask questions with a numeric answer. `asQuestion` lifted that,
 * and this is the lane that was waiting for it.
 *
 * HOW THESE ARE WRITTEN
 *
 * Everything is a bank of hand-written items, picked at random. That is a
 * different kind of generation from the maths drills, where the numbers are
 * fresh each call and nothing can be memorised. Here the items COULD be
 * memorised eventually — so each level holds several, each asks a different
 * question about them, and the multiple-choice options come back in a
 * different order every time. What memorising one gets you is one item out of
 * several dozen.
 *
 * Distractors are the whole job. A wrong option that is obviously wrong
 * teaches nothing; the useful ones are the near misses a real reader makes —
 * a true detail mistaken for a main idea, an opinion mistaken for evidence,
 * the nearest noun mistaken for the subject. They are chosen that way
 * throughout, and named in comments where the category matters.
 *
 * On length: the right answer being the longest option is a tell, and a
 * previous pass measured the lesson quizzes at 47% strictly-longest against a
 * 25% chance baseline. These are written to keep options close in length, and
 * a test measures it rather than trusting the intention.
 */
import { clampLevel, rnd, pickOne, mc, shuffled, sample } from './drill-kit.js';

/* ---- ela1 · How Sentences Are Built ------------------------------------ */

const CLAUSES = [
  { subj: 'The old bridge', verb: 'groaned', rest: 'under the truck', decoy: 'the truck' },
  { subj: 'My brother', verb: 'forgot', rest: 'his keys again', decoy: 'his keys' },
  { subj: 'The dog next door', verb: 'barks', rest: 'at the postman', decoy: 'the postman' },
  { subj: 'Our science teacher', verb: 'keeps', rest: 'a snake in the classroom', decoy: 'a snake' },
  { subj: 'The last train', verb: 'leaves', rest: 'before midnight', decoy: 'midnight' },
  { subj: 'That song', verb: 'sticks', rest: 'in my head for days', decoy: 'my head' },
  { subj: 'Three of the lights', verb: 'stopped', rest: 'working overnight', decoy: 'the lights' },
  { subj: 'A cracked screen', verb: 'works', rest: 'perfectly well', decoy: 'perfectly well' },
];

/* The nearest noun before the verb is not the subject. This is the single
   most common agreement mistake in real writing, and the reason level 3
   exists at all. */
const INTERRUPTED = [
  { head: 'bundle', mid: 'of old notes', tail: 'heavier than it looked', near: 'notes' },
  { head: 'list', mid: 'of ingredients', tail: 'missing one thing', near: 'ingredients' },
  { head: 'sound', mid: 'of the cars', tail: 'louder after dark', near: 'cars' },
  { head: 'crate', mid: 'of green apples', tail: 'left by the door', near: 'apples' },
  { head: 'captain', mid: 'of both teams', tail: 'first to shake hands', near: 'teams' },
  { head: 'handful', mid: 'of loose coins', tail: 'enough for the bus', near: 'coins' },
];

const ela1 = { id: 'ela1a', subj: 'ela', day: 'ela1', name: 'Sentence Building',
  gen(level = 1) {
    const L = clampLevel(level);
    if (L === 3) {
      const c = pickOne(INTERRUPTED);
      return {
        prompt: 'Which word decides whether the blank is WAS or WERE?',
        passage: `The ${c.head} ${c.mid} ___ ${c.tail}.`,
        ...mc(c.head, [c.near, c.tail.split(' ')[0], c.tail.split(' ').pop()]),
        hint: 'The verb answers to the thing the sentence is really about, not to the nearest noun in front of it.',
      };
    }
    if (L === 2) {
      const c = pickOne(CLAUSES);
      return {
        prompt: 'What is the SUBJECT — who or what the sentence is about?',
        passage: `${c.subj} ${c.verb} ${c.rest}.`,
        ...mc(c.subj, [c.decoy, c.verb, `${c.verb} ${c.rest}`]),
        hint: 'Find the verb first, then ask who or what is doing it.',
      };
    }
    const c = pickOne(CLAUSES);
    const mode = rnd(0, 2);
    const shown = mode === 0 ? `${c.subj} ${c.verb} ${c.rest}.`
      : mode === 1 ? `${c.verb.charAt(0).toUpperCase() + c.verb.slice(1)} ${c.rest}.`
        : `${c.subj}.`;
    const right = mode === 0 ? 'Nothing — it is a whole sentence'
      : mode === 1 ? 'The subject — who or what it is about'
        : 'The verb — what is happening';
    return {
      prompt: 'What is missing here?',
      passage: shown,
      ...mc(right, ['Nothing — it is a whole sentence', 'The subject — who or what it is about', 'The verb — what is happening']),
      hint: 'Ask both questions: who or what is this about, and what are they doing? A sentence needs an answer to each.',
    };
  } };

/* ---- ela2 · Main Idea & Evidence ---------------------------------------- */

/* Each item carries a claim, one sentence that is real evidence for it, and
   three near misses sorted by HOW they fail: description, opinion, and
   background. Those three are the categories a reader actually confuses with
   evidence, so they are the three that belong on the screen. */
const EVIDENCE = [
  { claim: 'The new bus lane made mornings faster.',
    good: 'The same trip now takes nine minutes less than in March.',
    description: 'The bus lane is painted a bright red along its whole length.',
    opinion: 'Most drivers say the bus lane feels like a fairly good idea.',
    background: 'The council spent two years planning and consulting on it.',
    main: 'A new bus lane opened on Mill Road in April.',
    also: ['Bus punctuality on the route rose from 61% to 88% over the same period.',
      'Two independent morning counts got the same nine-minute figure.'] },
  { claim: 'Rooftops turn out to be good places to keep bees.',
    good: 'Rooftop hives made more honey than ground-level ones.',
    description: 'The hives up on the library roof have pale blue wooden lids.',
    opinion: 'The beekeeper is sure rooftops are the future.',
    background: 'Keeping bees inside the city has been legal since 2010.',
    main: 'Some beekeepers have moved their hives up onto city roofs.',
    also: ['Fewer rooftop colonies were lost over winter than ground-level ones.',
      'Pollen samples from the roof hives showed a wider range of plants.'] },
  { claim: 'The school library is busier than it was.',
    good: 'Weekly borrowing climbed from 40 books last year to 110 this year.',
    description: 'There are beanbags near the window and a new rug by the door.',
    opinion: 'Everyone seems to like the library rather more than they used to.',
    background: 'The library was refurbished over the summer holidays.',
    main: 'The school library reopened in September after building work.',
    also: ['Seats were full at lunchtime on nineteen of the last twenty days.',
      'The library has had to add a second returns trolley this term.'] },
  { claim: 'Cold water washing gets clothes just as clean.',
    good: 'Cold and hot washes each left the same measured dirt behind.',
    description: 'The cold setting on this machine is the blue one on the left.',
    opinion: 'A lot of people would still far rather wash everything warm.',
    background: 'Machines have had a cold setting for decades.',
    main: 'Researchers compared cold washes against hot ones.',
    also: ['Stain tests scored cold and hot washes within one point of each other.',
      'A second laboratory repeated the trial and got the same result.'] },
  { claim: 'Sleeping later helps teenagers more than adults.',
    good: 'The teenagers fell asleep two hours after their parents.',
    description: 'The study used wrist monitors to record when sleep started.',
    opinion: 'Teenagers will tell you they are tired every single morning.',
    background: 'Sleep has been studied in laboratories since the 1950s.',
    main: 'A study tracked when teenagers and their parents fell asleep.',
    also: ['Wrist monitors showed the same two-hour gap on every night measured.',
      'The gap closed again once the same people reached their twenties.'] },
];

const ela2 = { id: 'ela2a', subj: 'ela', day: 'ela2', name: 'Main Idea & Evidence',
  gen(level = 1) {
    const L = clampLevel(level);
    const it = pickOne(EVIDENCE);
    if (L === 3) {
      /* Three of the four DO support it. Finding the one that does not needs
         you to check each against the claim rather than pick the one that
         sounds most like the topic. */
      return {
        prompt: `Which one does NOT support this claim: "${it.claim}"`,
        ...mc(it.opinion, [it.good, ...it.also]),
        hint: 'Evidence is something you could check. An opinion is something someone feels — even a lot of someones.',
      };
    }
    if (L === 2) {
      return {
        prompt: `Which one is EVIDENCE for this claim: "${it.claim}"`,
        ...mc(it.good, [it.description, it.opinion, it.background]),
        hint: 'Evidence is a fact you could go and check that makes the claim more likely. Not what it looks like, not what people feel, not how it came about.',
      };
    }
    return {
      prompt: 'Which sentence gives the MAIN IDEA rather than a detail?',
      ...mc(it.main, [it.description, it.background, it.good]),
      hint: 'The main idea is the one the others fit inside. A detail is true, but it is only part of the picture.',
    };
  } };

/* ---- ela3 · Figurative Language ----------------------------------------- */

const FIGURES = [
  { text: 'Her backpack weighed a thousand tonnes.', kind: 'Hyperbole' },
  { text: 'The wind argued with the tent all night.', kind: 'Personification' },
  { text: 'He ran like a dropped marble.', kind: 'Simile' },
  { text: 'That exam was a brick wall.', kind: 'Metaphor' },
  { text: 'I have told you a million times.', kind: 'Hyperbole' },
  { text: 'The old car coughed and gave up.', kind: 'Personification' },
  { text: 'The lake was as flat as a coin.', kind: 'Simile' },
  { text: 'His plan is a house of cards.', kind: 'Metaphor' },
  { text: 'The kettle screamed at us from the kitchen.', kind: 'Personification' },
  { text: 'She reads faster than the page can turn.', kind: 'Hyperbole' },
  { text: 'The classroom was a beehive.', kind: 'Metaphor' },
  { text: 'The rain came down like handfuls of gravel.', kind: 'Simile' },
];

const KINDS = ['Simile', 'Metaphor', 'Personification', 'Hyperbole'];

/* Plain sentences for the level-3 odd-one-out. Each one COULD be read as
   figurative by someone hunting for figures of speech, which is the point. */
const LITERAL = [
  'The kettle boiled after four minutes.',
  'The bus was eleven minutes late.',
  'The lake froze over in January.',
  'He ran the last hundred metres.',
  'The car would not start on Tuesday.',
  'The classroom holds thirty desks.',
];

const ela3 = { id: 'ela3a', subj: 'ela', day: 'ela3', name: 'Figures of Speech',
  gen(level = 1) {
    const L = clampLevel(level);
    if (L === 3) {
      const plain = pickOne(LITERAL);
      const three = sample(FIGURES, 3).map((f) => f.text);
      return {
        prompt: 'Three of these mean something beyond the words. Which one is meant LITERALLY?',
        ...mc(plain, three),
        hint: 'Ask of each: could this be exactly, boringly true? The literal one could.',
      };
    }
    if (L === 2) {
      const want = pickOne(KINDS);
      const right = pickOne(FIGURES.filter((f) => f.kind === want));
      const wrong = sample(FIGURES.filter((f) => f.kind !== want), 3).map((f) => f.text);
      return {
        prompt: `Which one is ${want.toLowerCase()}?`,
        ...mc(right.text, wrong),
        hint: 'Simile says LIKE or AS. Metaphor says IS. Personification gives a thing a person’s behaviour. Hyperbole is on purpose too big to believe.',
      };
    }
    const f = pickOne(FIGURES);
    return {
      prompt: 'What kind of figure of speech is this?',
      passage: f.text,
      ...mc(f.kind, KINDS.filter((k) => k !== f.kind)),
      hint: 'Look for the signal: LIKE or AS means simile; calling one thing another means metaphor; a thing behaving like a person means personification; deliberately too big means hyperbole.',
    };
  } };

/* ---- ela4 · Purpose, Tone & Point of View ------------------------------- */

const TONES = [
  { text: 'Well. That went about as well as anyone could have hoped.', tone: 'Sarcastic' },
  { text: 'The bridge has stood for four hundred years and shows no sign of tiring.', tone: 'Admiring' },
  { text: 'Something about the empty corridor did not sit right.', tone: 'Uneasy' },
  { text: 'Fine. I will wait. Again.', tone: 'Impatient' },
  { text: 'The sample was heated to 60°C and held there for ten minutes.', tone: 'Matter-of-fact' },
  { text: 'And then the dog got into the flour, which you can probably picture.', tone: 'Amused' },
  { text: 'Nobody is coming. Nobody was ever coming.', tone: 'Bleak' },
  { text: 'Try it. Honestly, just try it once.', tone: 'Encouraging' },
];
const TONE_NAMES = ['Sarcastic', 'Admiring', 'Uneasy', 'Impatient', 'Matter-of-fact', 'Amused', 'Bleak', 'Encouraging'];

const PURPOSES = [
  { text: 'Loosen the two bolts at the base before lifting the lid.', why: 'To instruct' },
  { text: 'Three quarters of the island is above 400 metres.', why: 'To inform' },
  { text: 'You owe it to yourself to at least look at the numbers.', why: 'To persuade' },
  { text: 'The goat had, by then, eaten most of the tent.', why: 'To entertain' },
  { text: 'Whisk the eggs until they are pale, then fold in the flour.', why: 'To instruct' },
  { text: 'No other option comes close, and the sooner we admit that the better.', why: 'To persuade' },
  { text: 'Water boils at 100°C at sea level and lower up a mountain.', why: 'To inform' },
];
const WHYS = ['To inform', 'To persuade', 'To entertain', 'To instruct'];

const POVS = [
  { text: 'I did not hear the door, and by then it was too late.', pov: 'First person' },
  { text: 'You walk in, and the room is already quiet.', pov: 'Second person' },
  { text: 'She did not hear the door. She would think about that later.', pov: 'Third person, limited' },
  { text: 'She did not hear the door; upstairs, her brother had already decided to lie.', pov: 'Third person, all-knowing' },
  { text: 'We agreed not to mention it, and mostly we did not.', pov: 'First person' },
  { text: 'You will want to sit down for this part.', pov: 'Second person' },
  { text: 'He counted the change twice and put it in his pocket.', pov: 'Third person, limited' },
  { text: 'He counted the change twice; the shopkeeper, who had seen this before, said nothing.', pov: 'Third person, all-knowing' },
];
const POV_NAMES = ['First person', 'Second person', 'Third person, limited', 'Third person, all-knowing'];

const ela4 = { id: 'ela4a', subj: 'ela', day: 'ela4', name: 'Tone & Point of View',
  gen(level = 1) {
    const L = clampLevel(level);
    if (L === 3) {
      const p = pickOne(POVS);
      return {
        prompt: 'Whose head are we inside?',
        passage: p.text,
        ...mc(p.pov, POV_NAMES.filter((n) => n !== p.pov)),
        hint: 'I means first person. YOU means second. If it says HE or SHE, ask whether we are told anyone else’s private thoughts — if we are, the narrator knows everything.',
      };
    }
    if (L === 2) {
      const p = pickOne(PURPOSES);
      return {
        prompt: 'Why was this written?',
        passage: p.text,
        ...mc(p.why, WHYS.filter((w) => w !== p.why)),
        hint: 'What does the writer want from you — to know something, to do something, to agree with something, or to enjoy something?',
      };
    }
    const t = pickOne(TONES);
    return {
      prompt: 'What is the tone here?',
      passage: t.text,
      ...mc(t.tone, sample(TONE_NAMES.filter((n) => n !== t.tone), 3)),
      hint: 'Tone is how the writer sounds, not what the facts are. Read it aloud in your head and listen to the voice.',
    };
  } };

/* ---- ela5 · Building a Strong Paragraph --------------------------------- */

const PARAS = [
  { topic: 'Sharks were swimming long before the first tree grew.',
    body: ['The oldest shark fossils sit in rock about 450 million years old.',
      'The first true trees appear roughly 60 million years after that.',
      'Sharks have outlasted four mass extinctions since.'],
    stray: 'My cousin will not go past the shallow end of the pool.',
    narrow: 'The oldest shark fossils are about 450 million years old.' },
  { topic: 'A bicycle is one of the most efficient machines ever built.',
    body: ['Almost all the energy you put into the pedals reaches the wheel.',
      'A car spends most of its fuel moving the car, not you.',
      'Walking the same distance costs a person more energy than riding.'],
    stray: 'The bike shop on the corner opens at nine.',
    narrow: 'Almost all the pedalling energy reaches the wheel.' },
  { topic: 'Salt changes water in more ways than taste.',
    body: ['Salty water freezes below 0°C rather than at it.',
      'It also boils a little above 100°C.',
      'And it carries an electric current that pure water will not.'],
    stray: 'Sea salt is usually more expensive than table salt.',
    narrow: 'Salty water freezes below zero.' },
  { topic: 'The library got busier for reasons nobody planned.',
    body: ['Borrowing tripled after the roof leak closed the common room.',
      'Students came in for somewhere warm and stayed for the books.',
      'The numbers did not fall back when the common room reopened.'],
    stray: 'The library has been in the same building since 1974.',
    narrow: 'Borrowing tripled after the common room closed.' },
];

/* Sentences that are ABOUT the right subject and still make bad topic
   sentences, because they cover far more than the paragraph delivers. */
const TOO_BROAD = [
  'Nature is full of surprising things.',
  'Science has taught us a great deal.',
  'There are many interesting facts in the world.',
  'Everything is more complicated than it looks.',
];

const ela5 = { id: 'ela5a', subj: 'ela', day: 'ela5', name: 'Paragraph Shape',
  gen(level = 1) {
    const L = clampLevel(level);
    const p = pickOne(PARAS);
    if (L === 3) {
      return {
        prompt: 'This paragraph has lost its topic sentence. Which one belongs at the top?',
        passage: p.body.join(' '),
        ...mc(p.topic, [p.narrow, pickOne(TOO_BROAD), p.stray]),
        hint: 'A topic sentence has to cover everything below it and nothing more. Too small and the rest hangs off the end; too big and most of it goes unused.',
      };
    }
    if (L === 2) {
      const kept = sample(p.body, 2);
      return {
        prompt: 'Three of these belong in one paragraph. Which one does NOT?',
        ...mc(p.stray, [p.topic, ...kept]),
        hint: 'Three of these are about the same idea. One is about something that merely came up nearby.',
      };
    }
    return {
      prompt: 'Which one is the TOPIC SENTENCE — the idea the other three support?',
      ...mc(p.topic, p.body),
      hint: 'Try reading each one as if the other three were reasons to believe it. Only one of them works that way round.',
    };
  } };

/* ---- ela6 · Argument & Persuasion --------------------------------------- */

const ARGUMENTS = [
  { claim: 'School should start an hour later.',
    evidence: 'The teenagers fell asleep about two hours after adults did.',
    reasoning: 'If a body clock runs late, an early start takes sleep that cannot be made up.',
    weak: 'Nearly everyone in my year agrees it should be later.',
    near: ['Several other schools in the country have already tried it out.',
      'Teachers would find the later start much easier to live with too.'] },
  { claim: 'The town should keep the late bus running.',
    evidence: 'Counts on eleven weeknights found forty to sixty riders.',
    reasoning: 'A service that full is not carrying empty seats, whatever it costs to run.',
    weak: 'Cutting it would be a really unfair thing to do.',
    near: ['The late bus has run on that same route for nearly thirty years.',
      'Nobody on the council has ridden it after ten at night.'] },
  { claim: 'Handwriting is still worth teaching.',
    evidence: 'Note-takers who wrote by hand recalled more a week on.',
    reasoning: 'Writing by hand is slower, so it forces you to decide what matters as you go.',
    weak: 'People have written by hand for thousands of years.',
    near: ['Handwriting lessons have been part of school for a very long time.',
      'A lot of adults say they wish their own handwriting were much neater.'] },
  { claim: 'The park needs more bins, not more signs.',
    evidence: 'Litter halved in the corner that got two new bins.',
    reasoning: 'People mostly drop litter where putting it away is inconvenient.',
    weak: 'Anyone who litters clearly has no respect for anything.',
    near: ['The park already has eleven signs asking people not to drop litter.',
      'Bins are considerably more expensive to empty than signs are to print.'] },
];

const FALLACIES = [
  { move: 'Attacking the person, not the argument',
    eg: 'You cannot trust her idea about the bus lane — she has never even owned a car.' },
  { move: 'Pretending there are only two options',
    eg: 'Either we ban phones completely, or we admit nobody learns anything.' },
  { move: 'Jumping from one case to everyone',
    eg: 'My uncle smoked and lived to ninety, so smoking is fine.' },
  { move: 'Counting how many people agree',
    eg: 'Most of the class thought the test was unfair, so it was unfair.' },
  { move: 'Changing what the other person said',
    eg: 'So what you are saying is we should have no rules at all.' },
  { move: 'Treating the order of events as the cause',
    eg: 'Sales went up the month after we changed the logo, so the logo did it.' },
];
const MOVES = FALLACIES.map((f) => f.move);

const PARTS_OF_ARG = ['It is the claim — what is being argued',
  'It is the evidence — a fact offered as support',
  'It is the reasoning — why that fact supports the claim'];

const ela6 = { id: 'ela6a', subj: 'ela', day: 'ela6', name: 'Argument Anatomy',
  gen(level = 1) {
    const L = clampLevel(level);
    if (L === 3) {
      const f = pickOne(FALLACIES);
      return {
        prompt: 'This argument goes wrong. What is the move?',
        passage: f.eg,
        ...mc(f.move, sample(MOVES.filter((m) => m !== f.move), 3)),
        hint: 'Ask what the sentence is really doing instead of giving a reason. Often it is talking about the person, the crowd, or something that merely happened first.',
      };
    }
    if (L === 2) {
      const a = pickOne(ARGUMENTS);
      return {
        prompt: `Which is the STRONGEST support for: "${a.claim}"`,
        ...mc(a.evidence, [a.weak, ...a.near]),
        hint: 'The strongest support is the one you could go and check, and that would change your mind if it came out the other way.',
      };
    }
    const a = pickOne(ARGUMENTS);
    const which = rnd(0, 2);
    const shown = [a.claim, a.evidence, a.reasoning][which];
    return {
      prompt: 'In this argument, what is this sentence doing?',
      passage: shown,
      ...mc(PARTS_OF_ARG[which], PARTS_OF_ARG.filter((_, i) => i !== which)),
      hint: 'The claim is what you are being asked to believe. The evidence is a checkable fact. The reasoning is the bridge between them.',
    };
  } };

/* ---- ela7 · Building Words from Parts ----------------------------------- */

const PARTS = [
  { part: 'pre-', means: 'before', eg: 'preview' },
  { part: 're-', means: 'again', eg: 'rebuild' },
  { part: 'sub-', means: 'under', eg: 'submarine' },
  { part: 'trans-', means: 'across', eg: 'transport' },
  { part: 'bio-', means: 'life', eg: 'biology' },
  { part: 'geo-', means: 'earth', eg: 'geology' },
  { part: 'therm-', means: 'heat', eg: 'thermometer' },
  { part: 'micro-', means: 'very small', eg: 'microscope' },
  { part: 'tele-', means: 'far away', eg: 'telescope' },
  { part: 'aqua-', means: 'water', eg: 'aquarium' },
  { part: 'photo-', means: 'light', eg: 'photograph' },
  { part: 'auto-', means: 'self', eg: 'automatic' },
  { part: 'inter-', means: 'between', eg: 'international' },
  { part: '-ology', means: 'the study of', eg: 'zoology' },
  { part: '-able', means: 'able to be', eg: 'breakable' },
  { part: '-less', means: 'without', eg: 'harmless' },
];

/* The actual skill: a word he has never seen, made of parts he has. */
const BUILT = [
  { word: 'thermophile', right: 'a living thing that thrives in heat',
    wrong: ['something that measures heat precisely', 'something that blocks heat coming in', 'something destroyed by any heat'] },
  { word: 'geothermal', right: 'heat from inside the earth',
    wrong: ['heat used for mapping the earth', 'earth warmed from above', 'heat measured at ground level'] },
  { word: 'microbiology', right: 'the study of very small living things',
    wrong: ['the study of very small machines and their parts', 'a very small piece of writing about a life', 'the study of life far underground'] },
  { word: 'transatlantic', right: 'going all the way across the Atlantic',
    wrong: ['running underneath the Atlantic', 'on the far side of the Atlantic', 'the study of the whole Atlantic'] },
  { word: 'autobiography', right: 'a life story written by the person who lived it',
    wrong: ['a life story written by a stranger who researched it', 'the study of several famous lives at once', 'a story told by a machine about itself'] },
  { word: 'telephoto', right: 'for photographing things far away',
    wrong: ['for photographing very small things', 'a photograph sent down a phone line', 'a photograph taken without light'] },
  { word: 'subterranean', right: 'lying beneath the surface of the ground',
    wrong: ['stretching right across the ground', 'made out of ground-up earth', 'standing on bare ground'] },
  { word: 'aquaphobia', right: 'a fear of being in or near water',
    wrong: ['a deep love of open water', 'the study of standing water', 'a place entirely full of water'] },
  { word: 'prehistoric', right: 'from before written history',
    wrong: ['from the middle of recorded history', 'the study of very old history', 'history being repeated again'] },
];

const ela7 = { id: 'ela7a', subj: 'ela', day: 'ela7', name: 'Word Parts',
  gen(level = 1) {
    const L = clampLevel(level);
    if (L === 3) {
      const b = pickOne(BUILT);
      return {
        prompt: `You have never met the word "${b.word}". From its parts, what does it most likely mean?`,
        ...mc(b.right, b.wrong),
        hint: 'Break it where the parts join, translate each piece, then put the pieces back together in plain words.',
      };
    }
    if (L === 2) {
      const p = pickOne(PARTS);
      const wrong = sample(PARTS.filter((x) => x.means !== p.means), 3).map((x) => x.eg);
      return {
        prompt: `Which word is built from a part meaning "${p.means}"?`,
        ...mc(p.eg, wrong),
        hint: 'Say each word slowly and listen for the piece you know. It is usually at the front or the very end.',
      };
    }
    const p = pickOne(PARTS);
    const wrong = sample(PARTS.filter((x) => x.means !== p.means), 3).map((x) => x.means);
    return {
      prompt: `What does "${p.part}" mean?`,
      ...mc(p.means, wrong),
      hint: `Think of a word you already know that starts or ends with it — ${p.eg}, for instance — and ask what that word has in common with the meaning.`,
    };
  } };

/* ---- ela8 · Sources and Whether to Trust Them --------------------------- */

const SOURCES = [
  { q: 'how many people live in Kenya right now',
    best: 'The government statistics site, updated this year',
    wrong: ['A travel blog post someone wrote back in 2009',
      'A forum answer with no name attached to it at all',
      'A friend of a friend who visited there once'] },
  { q: 'whether a medicine actually works',
    best: 'A trial comparing it against a dummy pill',
    wrong: ['The leaflet written by the company that sells it',
      'A review page with five very glowing comments on it',
      'A relative who swears it sorted them right out'] },
  { q: 'what a new law actually says',
    best: 'The published text of the law itself, in full',
    wrong: ['A newspaper headline written about the law',
      'A post explaining what it supposedly means for you',
      'A comment thread arguing about what it might mean'] },
  { q: 'how hot it got in this town last July',
    best: 'The weather service’s own readings recorded that month',
    wrong: ['Somebody’s memory of how hot it felt that month',
      'A photo of a thermometer left out in direct sun',
      'A post claiming it was the hottest July ever known'] },
];

const FLAWS = [
  { src: 'A page about a phone, written by the company that sells it', flaw: 'It has something to gain from your answer' },
  { src: 'A report on one person who got better after taking a vitamin', flaw: 'One case is not enough to go on' },
  { src: 'A chart with no note saying where its numbers came from', flaw: 'There is no way to check it' },
  { src: 'An article about the internet, written in 1998', flaw: 'It is too old for the question' },
  { src: 'A post whose only support is "everyone knows this"', flaw: 'Popularity is not evidence' },
  { src: 'A survey that only asked people already at the meeting', flaw: 'It asked the wrong group of people' },
];
const FLAW_NAMES = FLAWS.map((f) => f.flaw);

/* Level 3 is the one that matters: not "which source is better" but "what
   would you actually DO". Every wrong option here is a shortcut people
   genuinely take — believe the confident one, believe the newest one, split
   the difference, believe the one with the bigger audience. */
const CONFLICTS = [
  { situation: 'Two sites you trust give different populations for the same city.',
    settles: 'See which one names where its figure came from.',
    wrong: ['Go with whichever site has more readers each day.',
      'Take the average of the two numbers and use that.',
      'Go with whichever page was updated most recently.'] },
  { situation: 'A friend and an article disagree about when the shop closes.',
    settles: 'Look at the opening hours on the shop’s own door.',
    wrong: ['Trust the friend — they live much closer to it.',
      'Trust the article, because it was actually written down.',
      'Assume the truth is somewhere between the two.'] },
  { situation: 'Two studies disagree about whether a vitamin helps.',
    settles: 'Check how many people each study actually tested.',
    wrong: ['Believe the one whose result sounds more sensible.',
      'Believe the newer one; science moves on quickly.',
      'Believe whichever one more newspapers wrote about.'] },
  { situation: 'Two maps of the same walk show different distances.',
    settles: 'Find out where each map measured from and measured to.',
    wrong: ['Use the shorter one — maps tend to overestimate.',
      'Use whichever map more walkers seem to download.',
      'Add the two together and then halve the result.'] },
  { situation: 'Two witnesses remember the car as different colours.',
    settles: 'Look for a photo, or a camera that saw it happen.',
    wrong: ['Believe the witness who sounds the most certain.',
      'Believe the one who was standing nearest the road.',
      'Record the colour as somewhere between the two.'] },
];

const ela8 = { id: 'ela8a', subj: 'ela', day: 'ela8', name: 'Trusting Sources',
  gen(level = 1) {
    const L = clampLevel(level);
    if (L === 3) {
      const c = pickOne(CONFLICTS);
      return {
        prompt: 'What would settle this best?',
        passage: c.situation,
        ...mc(c.settles, c.wrong),
        hint: 'Popularity, confidence and recency are all guesses about quality. Go for whatever lets you check the thing yourself.',
      };
    }
    if (L === 2) {
      const f = pickOne(FLAWS);
      return {
        prompt: 'What is the problem with this source?',
        passage: f.src,
        ...mc(f.flaw, sample(FLAW_NAMES.filter((n) => n !== f.flaw), 3)),
        hint: 'Ask three things: who made it, when, and what do they get out of you believing it?',
      };
    }
    const s = pickOne(SOURCES);
    return {
      prompt: `Best source for finding out ${s.q}?`,
      ...mc(s.best, s.wrong),
      hint: 'Prefer whoever is closest to the thing itself and has least to gain from your answer.',
    };
  } };

/* ---- ela9 · Revision ---------------------------------------------------- */

/* NOTE ON THE CORRECT ANSWER'S LENGTH. Everywhere else in the app the right
   option being longest is a bug, and here it is doubly awkward: the day is
   about saying things in fewer words, so "pick the shortest" would be a tell
   AND would be roughly the lesson, which is worse.
   Four options settle it. Only one is both shorter and complete; the others
   are a rewrite that is still bloated, one that dropped half the meaning, and
   one that is nice and short but no longer says the same thing. Sorted by
   length the right answer usually lands in the middle, which takes comparing
   all four to spot and cannot be read off at a glance. */
const TIGHTEN = [
  { long: 'Due to the fact that it was raining, we made the decision to stay inside.',
    tight: 'Because it was raining, we stayed inside.',
    lossy: 'We came to a decision and stayed where we were.',
    still: 'On account of the rain, we took the decision to remain indoors.',
    changed: 'It rained, so we went outside.' },
  { long: 'At this point in time, there are a number of students who are waiting.',
    tight: 'Several students are waiting.',
    lossy: 'A good number of people are currently waiting.',
    still: 'Currently, there exist a number of students in a waiting state.',
    changed: 'Several teachers are waiting patiently.' },
  { long: 'In my personal opinion, I think that the plan is one that could work.',
    tight: 'I think the plan could work.',
    lossy: 'It is a plan that somebody might have a view about.',
    still: 'It is my own personal view that this could possibly work.',
    changed: 'I know the plan will work.' },
  { long: 'She proceeded to make her way in the direction of the exit door.',
    tight: 'She headed for the exit.',
    lossy: 'She left.',
    still: 'She then began to move towards the door marked exit.',
    changed: 'She went in.' },
  { long: 'The reason why the engine failed was because of the fact that it overheated.',
    tight: 'The engine failed because it overheated.',
    lossy: 'The engine overheated.',
    still: 'The failure of the engine was due to it becoming overheated.',
    changed: 'The engine overheated because it failed.' },
];

const DEAD_WORDS = [
  { text: 'He ran very quickly down the corridor.', dead: 'very', others: ['ran', 'quickly', 'down'] },
  { text: 'The reason why she left is still unclear.', dead: 'why', others: ['reason', 'left', 'still'] },
  { text: 'They both met together in the hall.', dead: 'together', others: ['both', 'met', 'hall'] },
  { text: 'She returned back to the same shop again.', dead: 'back', others: ['returned', 'shop', 'same'] },
  { text: 'The end result was basically a draw.', dead: 'end', others: ['result', 'basically', 'draw'] },
  { text: 'It was a totally unique design.', dead: 'totally', others: ['unique', 'design', 'was'] },
  { text: 'We continued on until the light went.', dead: 'on', others: ['continued', 'light', 'went'] },
  { text: 'Each and every seat had been taken.', dead: 'every', others: ['Each', 'seat', 'taken'] },
];

const PROBLEMS = [
  { text: 'The thing about the situation was that it was quite bad in various ways.',
    problem: 'Vague — hardly a real noun in it' },
  { text: 'The window was broken by someone at some point.',
    problem: 'Passive — it hides who did it' },
  { text: 'It was raining and we went in and we sat down and we waited.',
    problem: 'Everything glued on with "and"' },
  { text: 'Due to the fact that, in point of fact, it was late.',
    problem: 'Six words doing one word’s job' },
  { text: 'He said the thing he said he would say.',
    problem: 'The same word keeps coming back' },
  { text: 'The dog, which was brown, which we had found, barked.',
    problem: 'Clauses stacked until the sentence sags' },
];
const PROBLEM_NAMES = PROBLEMS.map((p) => p.problem);

const ela9 = { id: 'ela9a', subj: 'ela', day: 'ela9', name: 'Revision',
  gen(level = 1) {
    const L = clampLevel(level);
    if (L === 3) {
      const p = pickOne(PROBLEMS);
      return {
        prompt: 'What is wrong with this sentence?',
        passage: p.text,
        ...mc(p.problem, sample(PROBLEM_NAMES.filter((n) => n !== p.problem), 3)),
        hint: 'Read it aloud. The problem is usually whatever made you run out of breath, lose the thread, or wonder who did it.',
      };
    }
    if (L === 2) {
      const d = pickOne(DEAD_WORDS);
      return {
        prompt: 'Which word could you delete without losing anything?',
        passage: d.text,
        ...mc(d.dead, d.others),
        hint: 'Cover one word at a time and reread. If the meaning is unchanged, that word was not working.',
      };
    }
    const t = pickOne(TIGHTEN);
    return {
      prompt: 'Which version says the SAME thing in fewer words?',
      passage: t.long,
      ...mc(t.tight, [t.still, t.lossy, t.changed]),
      hint: 'Shorter is only better if nothing went missing. Check each option still says everything the original did — one of them quietly drops half of it.',
    };
  } };

/* ---- ela10 · Voice ------------------------------------------------------ */

/* Deliberately mixed lengths, checked in both directions. Formal writing is
   often SHORTER than the casual version — "attendance has declined" against
   "fewer people have been turning up lately" — so the first draft of this
   bank made every formal option the longest on screen and the second made it
   the shortest. Either one teaches counting words instead of listening. These
   run both ways about equally. */
const REGISTER = [
  { formal: 'The results were inconclusive.', casual: 'We could not really tell either way, to be honest.' },
  { formal: 'Attendance has declined steadily since September.', casual: 'Fewer people turn up now.' },
  { formal: 'The applicant was unsuccessful on this occasion.', casual: 'They did not get it.' },
  { formal: 'Please use the main entrance.', casual: 'Just go in the front, it is a lot easier anyway.' },
  { formal: 'The delay was attributable to a signalling fault.', casual: 'A signal broke, so it was late.' },
  { formal: 'Numbers recovered during the second quarter.', casual: 'Things picked up again.' },
  { formal: 'The proposal requires consideration.', casual: 'We should have a proper think about it first.' },
  { formal: 'Two sections remain outstanding.', casual: 'There are still a couple of bits left to do.' },
  { formal: 'Access is restricted after 6pm.', casual: 'You cannot really get in once it gets late.' },
  { formal: 'The committee has deferred its decision until March.', casual: 'They put it off again.' },
];

const WRITERS = [
  { text: 'Add the flour slowly, or it will clump.', who: 'Someone writing a recipe' },
  { text: 'The vehicle entered the car park at 09:04.', who: 'Someone writing a police report' },
  { text: 'ugh that queue was unreal, never again', who: 'Someone texting a friend' },
  { text: 'The lift will be out of service on Monday.', who: 'Someone writing a building notice' },
  { text: 'And that, reader, is how I ended up on the roof.', who: 'Someone telling a story' },
  { text: 'Sample B showed no colour change after ten minutes.', who: 'Someone writing up an experiment' },
];
const WHO_NAMES = WRITERS.map((w) => w.who);

/* One fact, four voices. Nothing about the fact changes between them, which
   is the point: voice is a choice on top of the content, not the content. */
const SAME_FACT = [
  { fact: 'a tree came down across Mill Road',
    news: 'A fallen tree closed Mill Road for three hours on Tuesday.',
    text: 'omg a tree came down on mill road, took ages to get home',
    story: 'The oak went over with a sound like a door slamming underground.',
    notice: 'Mill Road is closed until further notice due to a fallen tree.' },
  { fact: 'the water was switched off for repairs',
    news: 'Repairs left 300 homes without water for most of Thursday.',
    text: 'no water all day again, this is the second time this month',
    story: 'The tap coughed twice, gave up, and that was Thursday decided.',
    notice: 'The water supply will be interrupted on Thursday for repairs.' },
  { fact: 'the match was called off for fog',
    news: 'Saturday’s match was abandoned after fog cut visibility to 20 metres.',
    text: 'match got called off lol you couldnt see the other end',
    story: 'By the second half the far goal had simply stopped existing.',
    notice: 'Saturday’s fixture is postponed. Tickets remain valid.' },
];
const VOICE_KEYS = [['news', 'a news report'], ['text', 'a message to a friend'],
  ['story', 'a story being told'], ['notice', 'an official notice']];

const ela10 = { id: 'ela10a', subj: 'ela', day: 'ela10', name: 'Voice',
  gen(level = 1) {
    const L = clampLevel(level);
    if (L === 3) {
      const f = pickOne(SAME_FACT);
      const [key, label] = pickOne(VOICE_KEYS);
      return {
        prompt: `All four report the same thing: ${f.fact}. Which one reads like ${label}?`,
        ...mc(f[key], VOICE_KEYS.filter(([k]) => k !== key).map(([k]) => f[k])),
        hint: 'The facts are identical in all four. Listen for who is talking and who they expect to be listening.',
      };
    }
    if (L === 2) {
      const w = pickOne(WRITERS);
      return {
        prompt: 'Who wrote this?',
        passage: w.text,
        ...mc(w.who, sample(WHO_NAMES.filter((n) => n !== w.who), 3)),
        hint: 'Look at what the writer assumes you already know, and what they are polite about.',
      };
    }
    const r = pickOne(REGISTER);
    const others = sample(REGISTER.filter((x) => x !== r), 3).map((x) => x.casual);
    return {
      prompt: 'Which one would you expect in a written report rather than a message to a friend?',
      ...mc(r.formal, others),
      hint: 'Formal writing keeps its distance: fewer contractions, no slang, and it rarely says "we could not really".',
    };
  } };

export const LANGUAGE_DRILLS = [ela1, ela2, ela3, ela4, ela5, ela6, ela7, ela8, ela9, ela10];
