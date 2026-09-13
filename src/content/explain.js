/* Explaining, across the whole curriculum.
 *
 * WHY THIS FILE EXISTS
 *
 * Before it, four days out of 131 asked him to produce a sentence — all four
 * in the English lane. Everything else was read, recognise, answer. That is a
 * recognition app wearing a teaching app's clothes: picking C out of four
 * choices proves he can rule out three wrong things, not that he could
 * rebuild the idea from nothing in front of someone who does not have it.
 *
 * It also wasted the one thing actually known about this learner: he
 * explains. Out loud, unprompted. That is the most valuable study behaviour
 * there is and the app had no surface for it.
 *
 * SIX SHAPES, DELIBERATELY NOT ONE
 *
 *   mechanism  why does this happen — the causal chain, in order
 *   teach      explain it to someone who has never seen it
 *   predict    commit to an answer for a case not covered, and say why
 *   flaw       here is a confident wrong explanation; find the break
 *   compare    two things that get mixed up, and what the mix-up costs
 *   connect    the same mechanism in a lane he has already finished
 *
 * `flaw` earns its place for this kid specifically. Producing an explanation
 * from nothing is exposing; saying why someone ELSE is wrong is not, and it
 * runs on exactly the same machinery. It is the low-stakes door into the
 * same room. Used early and often on purpose.
 *
 * RULES THIS FILE KEEPS
 *
 * Nothing here is graded, scored, or worth XP. Progress never depends on
 * writing anything — every one of these is skippable and the day completes
 * without it. That is not softness: there is no honest way to machine-grade
 * a child's prose offline, and a wrong verdict aimed at a kid who already
 * assumes he is bad at this would cost more than the feature is worth.
 * He writes, then reads it back against three short questions and decides
 * for himself. Ticking a box is self-assessment, not a mark.
 *
 * Word targets are small on purpose — 30 to 45. Short and often beats long
 * and rare, and a 200-word box is how you teach a child to dread a feature.
 *
 * IDS ARE PROGRESS KEYS. `id` here is what his writing is filed under
 * (`w:<id>`). Renaming one orphans what he wrote exactly as surely as
 * renumbering a day id does. scripts/test.mjs freezes every one of them.
 * Add freely; never rename, never reuse. */

export const EXPLAIN = {
  /* ==== Mathematics ===================================================== */
  m2: {
    id: 'x-m2', kind: 'flaw', words: 35,
    task: 'Someone works out a tip like this. Find the broken step and say what it should be.',
    claim: '"The bill is $60 and I want to leave 15%. 15% of 100 is 15, so I take off 15. That is $45."',
    starter: 'Name the step that goes wrong before you fix it.',
    checklist: [
      'I said exactly which step is wrong.',
      'I said why it is wrong, not only that it is.',
      'I gave the number it should have been.',
    ],
  },
  m5: {
    id: 'x-m5', kind: 'teach', words: 40,
    task: 'Explain to someone who has never seen algebra why you are allowed to do the same thing to both sides of an equation.',
    starter: 'A picture helps here. What is an equation actually saying about the two sides?',
    checklist: [
      'I did not use a word I would have to look up.',
      'I said what would go wrong if you changed only one side.',
      'Someone who has not done this day could follow it.',
    ],
  },
  m7: {
    id: 'x-m7', kind: 'mechanism', words: 35,
    task: 'Why does multiplying two powers of the same base mean ADDING the exponents? Not the rule — the reason.',
    starter: 'Write out 2³ × 2² the long way, without any exponents at all, and count.',
    checklist: [
      'I showed what the exponents actually stand for.',
      'I did not just restate the rule in different words.',
      'My reason would still work for 5⁴ × 5³.',
    ],
  },
  m10: {
    id: 'x-m10', kind: 'predict', words: 35,
    task: 'A triangle has sides 5, 12 and 13. Before checking: do you expect a right angle? Say why, then test it.',
    starter: 'Commit to yes or no in the first sentence. Guessing and then checking is the whole method.',
    checklist: [
      'I committed to an answer instead of hedging.',
      'I said why I expected it before I tested.',
      'I said whether the test agreed with me.',
    ],
  },
  m13: {
    id: 'x-m13', kind: 'compare', words: 40,
    task: 'A rule and a function look the same on paper. What makes something a function, and why does the difference matter?',
    starter: 'The catch is about inputs and outputs — specifically, how many outputs one input is allowed.',
    checklist: [
      'I named the real difference, not two definitions side by side.',
      'I gave an example of something that is NOT a function.',
      'I said why anyone would care.',
    ],
  },
  mr2: {
    id: 'x-mr2', kind: 'connect', words: 40,
    task: 'Scientific notation and square roots are the same idea pointing in opposite directions. Explain how.',
    starter: 'Both are about exponents. One builds them up, one takes them back down.',
    checklist: [
      'I named both things clearly.',
      'I said what they actually share, not just that both use exponents.',
      'I gave one example of each.',
    ],
  },
  m15: {
    id: 'x-m15', kind: 'teach', words: 40,
    task: 'A shop cuts a price 20%, then raises it 20% the next week. Explain to a friend why the price did not come back.',
    starter: 'Use real numbers. $100 is the easiest place to start.',
    checklist: [
      'I used actual numbers, not only percentages.',
      'I said what changed underneath the second 20%.',
      'A friend who had not done this day would get it.',
    ],
  },
  m16: {
    id: 'x-m16', kind: 'flaw', words: 40,
    task: 'This is true and still misleading. Say how both of those can hold at once.',
    claim: '"The average income on this street is $200,000, so it is a wealthy street."',
    starter: 'Nothing in that sentence is a lie. That is what makes it worth taking apart.',
    checklist: [
      'I said which word is doing the damage.',
      'I described a street where this is true and nobody is wealthy.',
      'I said which average would have been honest.',
    ],
  },
  m18: {
    id: 'x-m18', kind: 'flaw', words: 35,
    task: 'Find what is wrong with this, and be precise about it.',
    claim: '"This coin has landed heads six times running, so tails is due — it is more likely next."',
    starter: 'The trap is in one word: "due". What would the coin have to be able to do?',
    checklist: [
      'I said exactly what the coin would need in order for this to work.',
      'I gave the actual probability of the next flip.',
      'I did not just say "that is the gambler’s fallacy" and stop.',
    ],
  },
  m19: {
    id: 'x-m19', kind: 'mechanism', words: 40,
    task: 'Why can an ant carry many times its own weight while an elephant cannot? Explain the mechanism.',
    starter: 'Strength depends on the cross-section of a muscle — an area. Weight depends on volume. Those two do not grow at the same rate.',
    checklist: [
      'I said what grows by squaring and what grows by cubing.',
      'I connected that to why the ratio changes with size.',
      'My reason would also explain why there are no ant-shaped animals the size of a horse.',
    ],
  },
  mr3: {
    id: 'x-mr3', kind: 'teach', words: 45,
    task: 'Five days, five places intuition was wrong. Teach the single question that catches all of them.',
    starter: 'Percent change, averages, counting, probability, scaling. What do you have to ask every time?',
    checklist: [
      'I gave one question, not a list of five rules.',
      'I showed it working on at least two of the five.',
      'Someone could use my question on a case I never mentioned.',
    ],
  },

  /* ==== Computer Science ================================================ */
  c2: {
    id: 'x-c2', kind: 'teach', words: 35,
    task: 'Explain to someone who has never seen binary why a computer uses only 1s and 0s instead of 0 through 9.',
    starter: 'Think about what a wire can physically do, reliably, billions of times a second.',
    checklist: [
      'I said something about the physical machine, not just "computers use binary".',
      'I said why ten states would be harder than two.',
      'No word in it needs looking up.',
    ],
  },
  c4: {
    id: 'x-c4', kind: 'compare', words: 35,
    task: 'A loop and a conditional both contain a test. What is the actual difference, and when would picking wrong break your program?',
    starter: 'Both ask a question. The difference is what happens after the answer.',
    checklist: [
      'I named the difference in what happens after the test.',
      'I gave a case where swapping them breaks something.',
      'I did not just define both terms.',
    ],
  },
  c6: {
    id: 'x-c6', kind: 'mechanism', words: 40,
    task: 'Why is breaking a problem into small pieces the thing that makes bugs findable? Explain the reason, not the advice.',
    starter: 'Think about where a bug can hide in one 200-line block versus ten 20-line pieces.',
    checklist: [
      'I said something about where a bug can hide.',
      'I did not just say "it is easier" — I said why it is easier.',
      'My reason would convince someone who thinks decomposition is a waste of time.',
    ],
  },
  c10: {
    id: 'x-c10', kind: 'predict', words: 35,
    task: 'Before running anything: what would happen if you swapped the order of two lines in your program? Pick two, commit, then try it.',
    starter: 'Name the two lines first. Say what you expect. Then run it.',
    checklist: [
      'I said what I expected before I ran it.',
      'I said what actually happened.',
      'If I was wrong, I said what I had misunderstood.',
    ],
  },
  c12: {
    id: 'x-c12', kind: 'flaw', words: 35,
    task: 'This loop never stops. Say exactly why.',
    claim: '"let i = 0; while (i < 10) { console.log(i); } — it prints 0 to 9 and finishes."',
    starter: 'A while loop has three jobs. Count how many this one is doing.',
    checklist: [
      'I said which part is missing.',
      'I said what the loop actually does instead.',
      'I said what one line would fix it.',
    ],
  },

  /* ==== Physical Science ================================================ */
  phy3: {
    id: 'x-phy3', kind: 'flaw', words: 35,
    task: 'Find the wrong assumption hiding in this.',
    claim: '"If nothing is pushing a rolling ball, it slows down and stops. So motion needs a constant force to keep going."',
    starter: 'Something IS pushing that ball. Name it.',
    checklist: [
      'I named the force that the claim pretends is not there.',
      'I said what would happen with that force removed.',
      'I stated the actual rule correctly.',
    ],
  },
  phy4: {
    id: 'x-phy4', kind: 'mechanism', words: 40,
    task: 'A ball bounces lower every time. Energy is conserved. Explain how both of those are true at once.',
    starter: 'Conserved does not mean "stays useful". Where did it go?',
    checklist: [
      'I tracked the energy somewhere specific rather than saying it was lost.',
      'I did not contradict conservation.',
      'I named at least two places it ended up.',
    ],
  },
  phy5: {
    id: 'x-phy5', kind: 'compare', words: 35,
    task: 'Heat and temperature get used as the same word. What is the difference, and where does confusing them go wrong?',
    starter: 'A spark and a bathtub. Which is hotter, and which holds more heat?',
    checklist: [
      'I named the real difference, not two definitions.',
      'I used an example where the hotter thing holds less heat.',
      'I said why the difference matters.',
    ],
  },
  phyr1: {
    id: 'x-phyr1', kind: 'connect', words: 40,
    task: 'States of matter, atoms, and temperature are three descriptions of one thing. Explain what that one thing is.',
    starter: 'Every one of those three days was secretly about the same particles.',
    checklist: [
      'I named what all three are describing.',
      'I showed it working for at least two of the three.',
      'I said one thing this view explains that the separate topics did not.',
    ],
  },

  /* ==== Logic =========================================================== */
  lg3: {
    id: 'x-lg3', kind: 'flaw', words: 35,
    task: 'This looks airtight and is not. Say where it breaks.',
    claim: '"If it rains, the ground is wet. The ground is wet. So it rained."',
    starter: 'Think of one other way ground gets wet. That is your whole answer.',
    checklist: [
      'I gave a case where the premises hold and the conclusion fails.',
      'I said what the argument assumed without saying so.',
      'I did not need the fallacy’s name to explain it.',
    ],
  },
  lg4: {
    id: 'x-lg4', kind: 'compare', words: 40,
    task: 'An argument can be valid and false, or true and invalid. Explain the difference with an example of each.',
    starter: 'Validity is about the shape. Truth is about the world. They come apart.',
    checklist: [
      'I gave a valid argument with a false conclusion.',
      'I gave a true conclusion reached badly.',
      'I said which one you should actually worry about.',
    ],
  },
  lg5: {
    id: 'x-lg5', kind: 'teach', words: 40,
    task: 'Teach someone to spot circular reasoning without using the words "circular" or "assumes what it proves".',
    starter: 'Describe what you would hear, in an ordinary conversation, that should make you suspicious.',
    checklist: [
      'I avoided both banned phrases.',
      'I gave an example someone might actually say out loud.',
      'A person could use my description to catch one in the wild.',
    ],
  },
  lg6: {
    id: 'x-lg6', kind: 'mechanism', words: 35,
    task: 'Why does ONE counterexample destroy a claim about all cases, while a thousand examples never prove one?',
    starter: 'The asymmetry is the point. What is each claim actually promising?',
    checklist: [
      'I said what a universal claim is promising.',
      'I explained the asymmetry rather than just stating it.',
      'I gave an example of each direction.',
    ],
  },
  lgr1: {
    id: 'x-lgr1', kind: 'teach', words: 45,
    task: 'Someone is about to read something designed to convince them. Teach them the order to run the checks in, and why that order.',
    starter: 'Six days of tools. What do you check first, and what is the point of checking it first?',
    checklist: [
      'I gave an order, not a pile.',
      'I said why the first check comes first.',
      'Someone could follow it on a real article tomorrow.',
    ],
  },

  /* ==== Earth & Space =================================================== */
  es2: {
    id: 'x-es2', kind: 'mechanism', words: 40,
    task: 'Why are there mountains and ocean trenches in long lines rather than scattered randomly?',
    starter: 'The lines are telling you where something meets something else.',
    checklist: [
      'I said what the lines actually mark.',
      'I explained why that produces a line rather than a patch.',
      'My reason covers both mountains and trenches.',
    ],
  },
  es4: {
    id: 'x-es4', kind: 'flaw', words: 35,
    task: 'Say precisely why this does not work as an argument.',
    claim: '"It was the coldest February here in years, so the climate is not warming."',
    starter: 'Two words are being swapped for each other. Which two?',
    checklist: [
      'I named the two things being confused.',
      'I said what evidence WOULD actually bear on the claim.',
      'I did not argue about the climate — only about the reasoning.',
    ],
  },
  es6: {
    id: 'x-es6', kind: 'teach', words: 40,
    task: 'Explain to someone why the Moon does not fall down, without saying "there is no gravity in space".',
    starter: 'There is plenty of gravity out there. That is not the answer. The answer is about sideways.',
    checklist: [
      'I did not use the banned phrase.',
      'I said something about sideways motion.',
      'My explanation would also cover a satellite.',
    ],
  },
  esr1: {
    id: 'x-esr1', kind: 'connect', words: 40,
    task: 'Two heat sources run nearly everything on Earth. Name them and trace one system back to each.',
    starter: 'One is under your feet, one is 93 million miles away.',
    checklist: [
      'I named both sources.',
      'I traced a specific system back to each one.',
      'I said which one drives weather and which drives plates.',
    ],
  },

  /* ==== Biology ========================================================= */
  bio3: {
    id: 'x-bio3', kind: 'mechanism', words: 40,
    task: 'A tree gains tonnes of mass over its life. Where does that material physically come from?',
    starter: 'Most people say the soil. Weigh the soil before and after and it has barely changed.',
    checklist: [
      'I said where the mass actually comes from.',
      'I said what it is built out of once it arrives.',
      'I did not say soil without explaining what soil actually supplies.',
    ],
  },
  bio4: {
    id: 'x-bio4', kind: 'compare', words: 35,
    task: 'A gene and a trait are not the same thing. Explain the difference and give a case where it shows.',
    starter: 'One is an instruction. One is a result. Results depend on more than instructions.',
    checklist: [
      'I named the difference clearly.',
      'I gave a case where the same gene does not give the same trait.',
      'I did not use the words interchangeably anywhere in my answer.',
    ],
  },
  bio7: {
    id: 'x-bio7', kind: 'flaw', words: 40,
    task: 'This is the most common wrong version of evolution. Say what it gets backwards.',
    claim: '"Giraffes kept stretching for high leaves, so their necks grew longer, and they passed the longer necks to their babies."',
    starter: 'The variation has to come first. Ask when it appears in this story.',
    checklist: [
      'I said what has to come first for selection to work.',
      'I retold it correctly in one sentence.',
      'I did not just say "that is Lamarck" and stop.',
    ],
  },
  bio9: {
    id: 'x-bio9', kind: 'teach', words: 35,
    task: 'Explain to someone who thinks all bacteria are germs why that view would kill them if it were acted on.',
    starter: 'Start with what is happening in their gut right now.',
    checklist: [
      'I gave a specific job that bacteria do for us.',
      'I said what would happen without them.',
      'I was not preachy about it — just clear.',
    ],
  },
  bio10: {
    id: 'x-bio10', kind: 'mechanism', words: 40,
    task: 'Why must a hypothesis be able to be shown WRONG to be worth anything? A claim nothing could disprove sounds stronger, not weaker.',
    starter: 'Ask what you would learn from testing a claim that passes every possible test.',
    checklist: [
      'I said what you gain from a claim that could fail.',
      'I gave an example of a claim nothing could disprove.',
      'I said why that example is useless rather than powerful.',
    ],
  },

  /* ==== Chemistry ======================================================= */
  ch1: {
    id: 'x-ch1', kind: 'compare', words: 35,
    task: 'Melting and burning both destroy the thing you started with. Why is only one of them a chemical change?',
    starter: 'Ask what happened to the atoms themselves, not to the shape.',
    checklist: [
      'I said what happens to the atoms in each case.',
      'I said which one you could reverse and why.',
      'I gave the test you would use to tell them apart.',
    ],
  },
  ch3: {
    id: 'x-ch3', kind: 'mechanism', words: 40,
    task: 'Why does the periodic table have columns at all? Why do elements in one column behave alike?',
    starter: 'The answer is about one number, and it is not the number of protons.',
    checklist: [
      'I named what elements in a column share.',
      'I connected that to why they react similarly.',
      'I did not just say "they are in the same group".',
    ],
  },
  ch6: {
    id: 'x-ch6', kind: 'flaw', words: 35,
    task: 'Something is wrong here. Find it.',
    claim: '"When a log burns away to a handful of ash, most of its matter is destroyed — that is why so little is left."',
    starter: 'Weigh everything that leaves, not only what stays.',
    checklist: [
      'I said where the missing mass actually went.',
      'I named at least one thing that left the log invisibly.',
      'I stated conservation of mass correctly.',
    ],
  },
  ch7: {
    id: 'x-ch7', kind: 'teach', words: 40,
    task: 'A cold pack gets cold on its own with nothing cooling it. Explain to someone how that is possible.',
    starter: 'Breaking bonds costs energy. Where does a reaction get energy it needs?',
    checklist: [
      'I said where the energy comes from.',
      'I explained why that makes the pack feel cold.',
      'I did not say "cold moves in" — cold is not a thing that moves.',
    ],
  },
  ch10: {
    id: 'x-ch10', kind: 'predict', words: 35,
    task: 'Flour burns slowly in a pile. A cloud of the same flour in the air can explode. Predict why, then say what you would change to test it.',
    starter: 'Same substance, same amount. One thing is different.',
    checklist: [
      'I committed to a reason rather than hedging.',
      'I said what changed between the two cases.',
      'I named something I could vary to test my reason.',
    ],
  },
  chr1: {
    id: 'x-chr1', kind: 'teach', words: 45,
    task: 'Ten days of chemistry in one sentence, then defend that sentence with two examples.',
    starter: 'Everything in this lane was one idea wearing different clothes. What was it?',
    checklist: [
      'My sentence is one sentence.',
      'Both examples genuinely fit it.',
      'Someone who had not done the lane would understand the sentence.',
    ],
  },

  /* ==== English & Writing =============================================== */
  ela2: {
    id: 'x-ela2', kind: 'compare', words: 35,
    task: 'The topic and the main idea are not the same. Explain the difference using something you read recently.',
    starter: 'One can be said in two words. The other is a whole claim someone could disagree with.',
    checklist: [
      'I named a real thing I read.',
      'I gave its topic and its main idea separately.',
      'My main idea is something someone could argue with.',
    ],
  },
  ela3: {
    id: 'x-ela3', kind: 'mechanism', words: 35,
    task: 'Why does "the city never sleeps" land harder than "the city is busy at night"? Both say the same thing.',
    starter: 'One makes you do a small amount of work. Ask what that work buys.',
    checklist: [
      'I said what the reader has to do with the figurative version.',
      'I said what that extra work adds.',
      'I did not just say "it is more interesting".',
    ],
  },
  ela4: {
    id: 'x-ela4', kind: 'flaw', words: 35,
    task: 'Both sentences report the same event. Say what each one is doing to you.',
    claim: '"Protesters flooded the street." / "Demonstrators gathered on the street."',
    starter: 'No fact differs between them. Only the words do.',
    checklist: [
      'I said which words carry the difference.',
      'I said what impression each version leaves.',
      'I did not claim either one is lying.',
    ],
  },
  ela7: {
    id: 'x-ela7', kind: 'predict', words: 35,
    task: 'You have never seen the word "chronobiology". Work out what it means from its parts, then say how confident you are and why.',
    starter: 'Break it up first. Say what each piece contributes.',
    checklist: [
      'I split the word into parts and gave each one a meaning.',
      'I committed to a definition.',
      'I said which part I was least sure about.',
    ],
  },
  ela8: {
    id: 'x-ela8', kind: 'teach', words: 40,
    task: 'Teach someone the questions to ask about a source before believing it — without ever saying "primary" or "secondary".',
    starter: 'What would you want to know about whoever wrote it, and how they came to know?',
    checklist: [
      'I avoided both banned words.',
      'I gave questions, not categories.',
      'Someone could use my questions on a video, not just a book.',
    ],
  },

  /* ==== Business & Money ================================================ */
  b2: {
    id: 'x-b2', kind: 'mechanism', words: 40,
    task: 'Nobody sets the price of a lemon. So why does it settle somewhere instead of drifting anywhere?',
    starter: 'Two pressures push in opposite directions. Describe what each one does when the price is wrong.',
    checklist: [
      'I described what happens when the price is too high.',
      'I described what happens when it is too low.',
      'I said why that produces a settling point rather than chaos.',
    ],
  },
  b3: {
    id: 'x-b3', kind: 'flaw', words: 35,
    task: 'This business is about to fail. Say why, using one word it never mentions.',
    claim: '"I sold 400 bracelets at $10 each. That is $4,000. It was a great year."',
    starter: 'Money in is not money kept.',
    checklist: [
      'I named the thing the claim leaves out.',
      'I showed with numbers how this could be a loss.',
      'I gave the right way to state the result.',
    ],
  },
  b5: {
    id: 'x-b5', kind: 'connect', words: 40,
    task: 'Compound interest and half-life are the same mathematics running opposite ways. Explain how.',
    starter: 'Both multiply by the same factor over and over. One factor is above 1, one below.',
    checklist: [
      'I named what both are doing repeatedly.',
      'I said what makes one grow and one shrink.',
      'I gave a number example for at least one of them.',
    ],
  },
  b8: {
    id: 'x-b8', kind: 'flaw', words: 35,
    task: 'Explain why this is the most common way a first business dies.',
    claim: '"My product is for everyone, so my market is the biggest possible."',
    starter: 'Imagine writing one advert that has to work on everyone alive.',
    checklist: [
      'I said what actually gets harder when the market is everyone.',
      'I gave a real product and named its actual customer.',
      'I said what "for everyone" costs you in practice.',
    ],
  },
  b10: {
    id: 'x-b10', kind: 'predict', words: 35,
    task: 'You double your price and lose half your customers. Predict what happened to profit, and say what you would need to know to be sure.',
    starter: 'Revenue is not profit. Costs moved too — say which way.',
    checklist: [
      'I committed to an answer about profit.',
      'I said what happened to costs when customers halved.',
      'I named the number I would need to be certain.',
    ],
  },
  b12: {
    id: 'x-b12', kind: 'teach', words: 45,
    task: 'Pitch something you would actually make, to someone with no reason to care, in under a minute of reading.',
    starter: 'Problem, who has it, why you. In that order, no warm-up.',
    checklist: [
      'I named a specific problem, not a vague area.',
      'I said who has it.',
      'I did not spend my first sentence introducing myself.',
    ],
  },

  /* ==== Government & Civics ============================================= */
  g3: {
    id: 'x-g3', kind: 'mechanism', words: 40,
    task: 'Checks and balances make government slower and more frustrating. Explain why that was the point.',
    starter: 'Ask what the fast version would let someone do.',
    checklist: [
      'I said what speed would cost.',
      'I gave one specific check and what it prevents.',
      'I did not argue it is simply good — I said what it buys.',
    ],
  },
  g5: {
    id: 'x-g5', kind: 'mechanism', words: 40,
    task: 'Most bills never become law. Explain where they die and why the system is built to let that happen.',
    starter: 'Trace the path and mark every point where it can stop.',
    checklist: [
      'I named at least two places a bill can die.',
      'I said who has the power at each.',
      'I said why stopping bills is a feature rather than a failure.',
    ],
  },
  g7: {
    id: 'x-g7', kind: 'flaw', words: 35,
    task: 'Say what this gets wrong about how rights work.',
    claim: '"I have freedom of speech, so a website is violating my rights by deleting my post."',
    starter: 'Ask who the First Amendment is actually a rule about.',
    checklist: [
      'I said who the rule actually restrains.',
      'I said what the claim confuses it with.',
      'I did not argue about whether the deletion was fair.',
    ],
  },
  g9: {
    id: 'x-g9', kind: 'teach', words: 40,
    task: 'Explain to someone who thinks taxes are just money taken away what they are buying — without telling them what to think.',
    starter: 'Pick things they used today without paying at the point of use.',
    checklist: [
      'I named specific things, not "services".',
      'I picked things they would actually have used.',
      'I did not tell them what opinion to hold.',
    ],
  },
  g10: {
    id: 'x-g10', kind: 'connect', words: 40,
    task: 'Judging a political claim uses the exact tools from the Logic lane. Name three and show one working.',
    starter: 'Validity, evidence, fallacies, testability. Which transfer directly?',
    checklist: [
      'I named three tools from Logic.',
      'I showed one of them working on a real political claim.',
      'I said one place the analogy is not perfect.',
    ],
  },

  /* ==== Fossils & Deep Time ============================================= */
  f3: {
    id: 'x-f3', kind: 'mechanism', words: 40,
    task: 'How can you know one layer is older than another without knowing either age in years?',
    starter: 'Think about the order things had to be laid down in for the stack to exist.',
    checklist: [
      'I said what had to happen first for the stack to form.',
      'I said what would break this rule.',
      'I did not mention years anywhere in my answer.',
    ],
  },
  f4: {
    id: 'x-f4', kind: 'compare', words: 40,
    task: 'Relative and absolute dating answer different questions. Explain what each gives you and why you need both.',
    starter: 'One gives order. One gives numbers. Neither is enough alone.',
    checklist: [
      'I said what each method gives you.',
      'I gave a case where order alone is not enough.',
      'I said how they get used together.',
    ],
  },
  f7: {
    id: 'x-f7', kind: 'mechanism', words: 40,
    task: 'Two rock layers on different continents. How does anyone establish they are the same age?',
    starter: 'The rock itself will not tell you. Something inside it will.',
    checklist: [
      'I said what does the matching.',
      'I said what makes a good marker for this.',
      'I said why the rock type alone cannot do it.',
    ],
  },
  f8: {
    id: 'x-f8', kind: 'flaw', words: 40,
    task: 'This reasoning has a hole that appears everywhere once you see it. Name it.',
    claim: '"We have found no fossils of it, so the animal did not exist."',
    starter: 'Ask what has to go right for any animal to end up as a fossil at all.',
    checklist: [
      'I said what fossilisation strongly favours.',
      'I named a kind of animal that would almost never fossilise.',
      'I said what the absence of evidence does and does not show.',
    ],
  },
  f10: {
    id: 'x-f10', kind: 'teach', words: 45,
    task: 'Someone asks how anyone could possibly know a rock is 200 million years old. Answer them properly.',
    starter: 'They are not being stupid. It is a fair question and it deserves the actual mechanism.',
    checklist: [
      'I gave a real mechanism, not "scientists measured it".',
      'I said what is being counted.',
      'I took the question seriously rather than dismissing it.',
    ],
  },

  /* ==== Connections ===================================================== */
  cx1: {
    id: 'x-cx1', kind: 'connect', words: 40,
    task: 'Binary, half-life and compound interest are one mechanism. Name it, then say where the analogy breaks.',
    starter: 'All three multiply by a fixed factor, over and over. The factors differ.',
    checklist: [
      'I named the shared mechanism.',
      'I showed it in all three.',
      'I said one place the analogy genuinely breaks down.',
    ],
  },
  cx2: {
    id: 'x-cx2', kind: 'connect', words: 40,
    task: 'If-then shows up in logic, code, law and science. Pick two and show they are the same structure doing different jobs.',
    starter: 'Same shape, different consequences when the condition is met.',
    checklist: [
      'I picked two and named them.',
      'I showed the shared structure explicitly.',
      'I said what is different about the consequences.',
    ],
  },
  cx5: {
    id: 'x-cx5', kind: 'teach', words: 40,
    task: 'Energy, water, matter and money all "disappear" and none of them do. Teach the habit that makes this visible.',
    starter: 'In every case the question is the same three words.',
    checklist: [
      'I gave a question or habit, not four separate facts.',
      'I showed it working on two of the four.',
      'Someone could apply it to a case I did not mention.',
    ],
  },
  cx7: {
    id: 'x-cx7', kind: 'mechanism', words: 45,
    task: 'Your body temperature, a market price and the three branches all push back when something moves too far. Explain the shared mechanism.',
    starter: 'Something detects a change and triggers a response that opposes it. Name the parts in each case.',
    checklist: [
      'I described the mechanism in general terms first.',
      'I identified the detector and the response in at least two cases.',
      'I said what happens when the mechanism fails.',
    ],
  },

  /* ==== Teardowns ======================================================= */
  td1: {
    id: 'x-td1', kind: 'teach', words: 40,
    task: 'Explain to someone how a pencil leaves a mark, using only things you can see happening.',
    starter: 'Nothing melts, nothing burns, nothing is glued on. Something slides off.',
    checklist: [
      'I said what physically leaves the pencil.',
      'I said why it comes off so easily.',
      'I did not use the word "lead" as though it were lead.',
    ],
  },
  td2: {
    id: 'x-td2', kind: 'connect', words: 35,
    task: 'A bicycle gear ratio is a maths topic you have already done. Name it and show the connection.',
    starter: 'Teeth divided by teeth. What is that, in the Mathematics lane?',
    checklist: [
      'I named the maths idea.',
      'I showed the calculation on a real pair of gears.',
      'I said what the answer tells the rider.',
    ],
  },
  td4: {
    id: 'x-td4', kind: 'flaw', words: 35,
    task: 'Almost everyone believes this. Say why it is wrong.',
    claim: '"A battery is a container that holds electricity, and using it empties the electricity out."',
    starter: 'A dead battery weighs the same as a full one. Start there.',
    checklist: [
      'I said what a battery actually stores.',
      'I said what changes inside it as it is used.',
      'I explained why it does not get lighter.',
    ],
  },
  td6: {
    id: 'x-td6', kind: 'mechanism', words: 40,
    task: 'The water you drank today is older than the dinosaurs. Explain how that can be literally true.',
    starter: 'Water is not manufactured. Trace where a single glass has been.',
    checklist: [
      'I said why water is not created or destroyed in the cycle.',
      'I traced a plausible path for one drop.',
      'I did not treat this as a figure of speech.',
    ],
  },

  /* ==== Mathematics, Algebra II and precalculus ========================== */
  m20: {
    id: 'x-m20', kind: 'mechanism', words: 40,
    task: 'Why does rewriting an equation as two brackets multiplied together find EVERY solution, not just one?',
    starter: 'Start from what has to be true for a product to come out as zero.',
    checklist: [
      'I said what must be true for a product to be zero.',
      'I explained why each bracket gives its own solution.',
      'I did not just describe the steps of factoring.',
    ],
  },
  m21: {
    id: 'x-m21', kind: 'flaw', words: 35,
    task: 'Find the mistake, and say exactly what it costs.',
    claim: '"For 2x\u00b2 \u2212 5x + 3 = 0 I get a = 2, b = 5, c = 3, so the discriminant is 25 \u2212 24 = 1."',
    starter: 'The arithmetic is fine. Check what was read off the equation.',
    checklist: [
      'I said which value was read wrongly.',
      'I gave the correct discriminant.',
      'I said why that sign matters even though b gets squared.',
    ],
  },
  m23: {
    id: 'x-m23', kind: 'predict', words: 40,
    task: 'y = 100x and y = 2\u02e3 both start small. Predict which is bigger at x = 5, at x = 10, and at x = 20 \u2014 then check.',
    starter: 'Commit to all three before you work any of them out.',
    checklist: [
      'I committed to all three before checking.',
      'I said where I was wrong, if I was.',
      'I said what that tells me about trusting my first instinct here.',
    ],
  },
  m24: {
    id: 'x-m24', kind: 'teach', words: 40,
    task: 'Explain what a logarithm is to someone who has never heard the word \u2014 without using the word.',
    starter: 'It is the answer to one question. What is the question?',
    checklist: [
      'I avoided the banned word.',
      'I gave a concrete example with real numbers.',
      'Someone could work out log\u2082(32) from my explanation alone.',
    ],
  },
  m26: {
    id: 'x-m26', kind: 'connect', words: 40,
    task: 'Pythagoras and trigonometry both find a missing side. Explain what each one needs, and why you would pick one over the other.',
    starter: 'Count what you have to already know before each method will work.',
    checklist: [
      'I said what Pythagoras needs to know.',
      'I said what trigonometry needs instead.',
      'I gave a case where only one of them would work.',
    ],
  },
  mr4: {
    id: 'x-mr4', kind: 'teach', words: 45,
    task: 'Seven days, one idea. Teach the idea, then show it working on two operations from different days.',
    starter: 'Factoring, roots, logarithms and inverse trig are all doing the same job.',
    checklist: [
      'I stated the idea in one sentence.',
      'I showed it on two genuinely different operations.',
      'I said why the undo is usually the useful half.',
    ],
  },
};