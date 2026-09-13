/* Depth extensions for the thin lanes.
 *
 * English and Biology ran six days each while Math ran sixteen. These add
 * four apiece, picking up where the existing days stop rather than
 * restating them:
 *
 *   English  ela1-6 covered sentences, main idea, figurative language,
 *            tone, paragraphs, argument. These add word-building, sources,
 *            revision, and voice.
 *   Biology  bio1-6 covered life, cells, energy, DNA, classification,
 *            ecosystems. These add evolution, body systems, microbes, and
 *            how a claim gets tested.
 *
 * These merge into the existing lanes by id, so ordering continues from the
 * last day already there. Ids never repeat.
 *
 * Same rules as everywhere: one new idea per page, every question carries a
 * hint and an explanation, and each day ends by connecting to something he
 * has already finished. */

export const ELA_EXTRA = [
  {
    id: 'ela7', tag: 'Language', title: 'Building Words from Parts',
    subtitle: 'Day 7 · Reading a word you have never seen',
    pages: [
      { title: 'Most long words are assembled', blocks: [
        { type: 'text', text: 'English builds long words out of smaller pieces borrowed from Greek and Latin. Once you know the pieces, an unfamiliar word stops being a wall.' },
        { type: 'concept', term: 'Root', def: 'The core piece carrying the main meaning — like "port" meaning carry, in transport, portable and export.' },
      ]},
      { title: 'Prefixes change direction', blocks: [
        { type: 'text', text: 'A prefix goes on the front and shifts the meaning. Re- means again. Un- and in- mean not. Pre- means before. Trans- means across.' },
        { type: 'example', text: 'Take "port" (carry). Transport carries across. Export carries out. Import carries in. Portable can be carried. One root, four words, no memorising.' },
      ]},
      { title: 'Suffixes change the job', blocks: [
        { type: 'text', text: 'A suffix goes on the end and usually changes what kind of word it is. -tion turns an action into a thing. -able means it can be done. -ly turns it into a description of how.' },
        { type: 'callout', text: 'This is why "unbreakable" is readable on sight: un + break + able. Not breakable. You did not need to have seen it before.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Computer Science broke a big problem into smaller pieces you could handle one at a time. Same move. A long word is a decomposition problem, and you already know how to do those.' },
      ]},
    ],
    recap: [
      'Long English words are usually built from Greek and Latin parts.',
      'Prefixes shift meaning; suffixes change the word’s job.',
      'Knowing the pieces lets you read words you have never met.',
    ],
    quiz: [
      { type: 'mc', prompt: 'The root "port" means:', choices: ['see', 'write', 'break', 'carry'], answer: 3, hint: 'Think transport, portable, export.', explain: 'Carry — which is why all three of those words involve moving something.' },
      { type: 'mc', prompt: '"Unbreakable" breaks into:', choices: ['un + break + able', 'unbreak + able', 'un + breakable + e', 'unb + reak + able'], answer: 0, hint: 'Find the prefix, the root, then the suffix.', explain: 'un (not) + break + able (can be) — not able to be broken.' },
      { type: 'mc', prompt: 'Going from “act” to “action”, the suffix has changed:', choices: ['the meaning entirely', 'what kind of word it is', 'nothing but the spelling', 'the tense'], answer: 1, hint: 'One is something you do; the other is a thing.', explain: 'A verb became a noun. Suffixes usually change a word’s job in the sentence rather than its core meaning.' },
      { type: 'mc', prompt: 'If "bene" means good, "benefit" most likely involves:', choices: ['something fast', 'something old', 'something good', 'something harmful'], answer: 2, hint: 'Use the root even though you know the word already.', explain: 'Good. Roots let you predict meaning before you look anything up.' },
    ],
  },
  {
    id: 'ela8', tag: 'Research', title: 'Sources and Whether to Trust Them',
    subtitle: 'Day 8 · Not everything written down is true',
    pages: [
      { title: 'Where did this come from?', blocks: [
        { type: 'text', text: 'Every claim came from somewhere. A source close to the event and with no reason to shade the truth is worth more than one far away with something to gain.' },
        { type: 'concept', term: 'Primary source', def: 'A record made by someone who was actually there — a letter, a photograph, a measurement.' },
      ]},
      { title: 'Secondhand is not worthless', blocks: [
        { type: 'text', text: 'A secondary source describes something the author did not witness. That is not automatically bad — a historian who read a thousand letters may understand a war better than any single soldier did.' },
        { type: 'example', text: 'A soldier’s diary is primary: vivid, immediate, and limited to what one person saw. A history book is secondary: wider, more organised, and further from the event.' },
      ]},
      { title: 'Ask what the writer wants', blocks: [
        { type: 'text', text: 'A company describing its own product is not lying, necessarily — but it has a reason to emphasise some things and skip others. Knowing the motive tells you where to check.' },
        { type: 'callout', text: 'The useful question is not "is this true" but "how would I find out". Those are very different habits.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Logic gave you the tools: circular reasoning, false cause, false dilemma. Evaluating a source is those same tests aimed at a person rather than an argument.' },
      ]},
    ],
    recap: [
      'A primary source records something the author witnessed.',
      'Secondary sources trade immediacy for breadth.',
      'Knowing what a writer wants tells you what to check.',
    ],
    quiz: [
      { type: 'mc', prompt: 'A photograph taken during an event is a:', choices: ['secondary source', 'an opinion piece', 'summary', 'primary source'], answer: 3, hint: 'Was the camera there?', explain: 'Primary — it records the event directly.' },
      { type: 'mc', prompt: 'Compared with a primary source, a secondary source is:', choices: ['not automatically worse — it may be checked', 'always less reliable than a witness', 'always more reliable than a witness', 'only worth using as a last resort'], answer: 0, hint: 'Think about a historian with access to a hundred letters.', explain: 'A witness can be mistaken or lying; a careful historian comparing many accounts may be nearer the truth. Primary means closer, not correct.' },
      { type: 'mc', prompt: 'The most useful question about a source is:', choices: ['is it long', 'how would I check it', 'is it recent', 'is it popular'], answer: 1, hint: 'Which question leads somewhere?', explain: 'Checkability. It turns a judgement into an investigation.' },
      { type: 'mc', prompt: 'A company describing its own product is:', choices: ['never useful for research purposes', 'a primary source and so trustworthy', 'a source with a motive worth knowing', 'always lying about what it sells'], answer: 2, hint: 'Motive is not the same as dishonesty.', explain: 'It may be accurate, but it has reasons to emphasise some things. Know where to check.' },
    ],
  },
  {
    id: 'ela9', tag: 'Writing', title: 'Revision Is the Real Writing',
    subtitle: 'Day 9 · First drafts are supposed to be rough',
    pages: [
      { title: 'Nobody writes it right the first time', blocks: [
        { type: 'text', text: 'Professional writers produce bad first drafts on purpose. The draft exists to get the thinking out where you can see it, not to be good.' },
        { type: 'callout', text: 'If your first draft embarrasses you, you are doing it exactly the way everyone else does.' },
      ]},
      { title: 'Revising is not proofreading', blocks: [
        { type: 'text', text: 'Proofreading fixes spelling and commas. Revising changes what the piece says and how it is built — cutting a paragraph, reordering the argument, replacing a weak example.' },
        { type: 'concept', term: 'Revision', def: 'Re-seeing. Changing the substance and structure, not just the surface.' },
      ]},
      { title: 'Cut first, then polish', blocks: [
        { type: 'text', text: 'The fastest improvement in most writing is deletion. A sentence that repeats the one before it, a word that adds nothing, an example that does not earn its space.' },
        { type: 'example', text: '"In my personal opinion, I think that the book was actually really quite good" becomes "The book was good." Same claim, none of the padding.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Debugging, from Computer Science. You do not write perfect code and you do not write perfect paragraphs. You write something, find what is broken, and fix it. The skill is the finding.' },
      ]},
    ],
    recap: [
      'First drafts are meant to be rough.',
      'Revising changes substance; proofreading fixes surface.',
      'Cutting is usually the fastest improvement available.',
    ],
    quiz: [
      { type: 'mc', prompt: 'Revising differs from proofreading because revising:', choices: ['is always done as the very last step', 'fixes the spelling and punctuation', 'is only worth doing on long pieces', 'changes what the piece says and how'], answer: 3, hint: 'One is surface, one is substance.', explain: 'Revision re-sees the piece. Proofreading tidies it.' },
      { type: 'mc', prompt: 'A first draft that reads badly usually means:', choices: ['the draft is doing its job for now', 'you are not a very good writer', 'you should start the piece again', 'you should stop writing altogether'], answer: 0, hint: 'What is a draft actually for?', explain: 'A draft exists to be revised. Expecting the first one to be good is the belief that stops most people writing at all.' },
      { type: 'mc', prompt: 'The fastest improvement in most writing is:', choices: ['adding more detail and explanation', 'cutting what does not earn its space', 'using longer and richer vocabulary', 'adding a strong concluding section'], answer: 1, hint: 'Think about the padded sentence example.', explain: 'Deletion. Most drafts are carrying weight that does nothing.' },
      { type: 'mc', prompt: '"In my personal opinion I think it was actually quite good" is weak mainly because it:', choices: ['is written in the past tense', 'gives no evidence for the judgement', 'repeats the same idea several ways', 'is much too short to convince'], answer: 2, hint: 'Count how many times it hedges.', explain: 'Opinion, think, actually and quite all do the same job. Pick one.' },
    ],
  },
  {
    id: 'ela10', tag: 'Writing', title: 'Voice: Sounding Like Someone',
    subtitle: 'Day 10 · Why two people writing the same facts read differently',
    pages: [
      { title: 'The facts do not fix the writing', blocks: [
        { type: 'text', text: 'Give two writers identical information and you get two different pieces. What differs is voice — word choice, sentence rhythm, what gets emphasised.' },
        { type: 'concept', term: 'Voice', def: 'The sense that a specific person is speaking, created by choices in word and rhythm.' },
      ]},
      { title: 'Sentence length sets the pace', blocks: [
        { type: 'text', text: 'Short sentences are fast, blunt, certain. Long ones wander, gather qualifications, and build. Mixing them deliberately is most of what makes prose feel alive.' },
        { type: 'example', text: 'All short: choppy and breathless. All long: exhausting and easy to lose. Varied: the short one lands hard because the long one set it up.' },
      ]},
      { title: 'Audience changes the register', blocks: [
        { type: 'text', text: 'You already do this without thinking. You do not text a friend the way you write to a principal. Neither is wrong; each fits its situation.' },
        { type: 'callout', text: 'Matching register to audience is a skill, not a rule. The mistake is not knowing which one you are using.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Business had this as branding — keeping the same promise consistently until people recognise it. Voice is branding for a writer, and for exactly the same reason: consistency is what makes you recognisable.' },
      ]},
    ],
    recap: [
      'Voice is what differs when two writers have the same facts.',
      'Sentence length controls pace; variety creates emphasis.',
      'Register should match audience, deliberately.',
    ],
    quiz: [
      { type: 'mc', prompt: 'Voice in writing comes mainly from:', choices: ['the facts included', 'the topic', 'the length of the piece', 'choices in words and rhythm'], answer: 3, hint: 'Two writers, same facts, different result.', explain: 'The choices, not the content.' },
      { type: 'mc', prompt: 'The same message to a friend and to a head teacher should:', choices: ['change in tone while keeping the same facts', 'sound identical', 'change the facts to suit the reader', 'be shorter for the head teacher'], answer: 0, hint: 'What stays fixed and what moves?', explain: 'The facts do not move. How formally you put them does, because you are writing for a different reader.' },
      { type: 'mc', prompt: 'A short sentence after several long ones tends to feel:', choices: ['unfinished', 'emphatic', 'weaker', 'confusing'], answer: 1, hint: 'What does contrast do?', explain: 'It lands hard, because the long ones set it up.' },
      { type: 'mc', prompt: 'Voice is like branding because both depend on:', choices: ['being formal and correct', 'being as loud as possible', 'consistency people can recognise', 'how much money is spent'], answer: 2, hint: 'What makes something recognisable?', explain: 'Keeping the same promise until people know it on sight.' },
    ],
  },
];

export const BIO_EXTRA = [
  {
    id: 'bio7', tag: 'Life Science', title: 'How Species Change',
    subtitle: 'Day 7 · Small differences, enormous time',
    pages: [
      { title: 'Individuals in a species differ', blocks: [
        { type: 'text', text: 'No two rabbits are identical. Some run slightly faster, some blend in slightly better. That ordinary variation is the raw material for everything that follows.' },
        { type: 'concept', term: 'Variation', def: 'The natural differences between individuals of the same species.' },
      ]},
      { title: 'Some differences help survival', blocks: [
        { type: 'text', text: 'If a difference makes an individual slightly more likely to survive and reproduce, it appears more often in the next generation. Not because anything chose it — simply because its owners had more offspring.' },
        { type: 'callout', text: 'Nothing is trying to improve. It is a counting outcome, not a plan.' },
      ]},
      { title: 'Repeat for a very long time', blocks: [
        { type: 'text', text: 'A tiny advantage compounds across thousands of generations until the population no longer resembles where it started.' },
        { type: 'example', text: 'One percent more offspring per generation sounds like nothing. Over ten thousand generations it is overwhelming — the same runaway compounding you met with interest.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Fossils showed you deep time; Business showed you compounding. Evolution is those two ideas multiplied together. Neither alone would be enough.' },
      ]},
    ],
    recap: [
      'Individuals within a species naturally vary.',
      'Differences that help survival become more common.',
      'Tiny advantages compound over enormous time.',
    ],
    quiz: [
      { type: 'mc', prompt: 'Natural selection acts on:', choices: ['individuals choosing to change', 'a species’ plan', 'only large animals', 'variation that already exists'], answer: 3, hint: 'Where does the raw material come from?', explain: 'It works on differences already present. Nothing is chosen.' },
      { type: 'mc', prompt: 'A species becomes faster over generations because:', choices: ['faster individuals already existed and survived more often', 'individuals decided to run faster', 'running stretched their legs, and their young inherited that', 'the environment forced each animal to change'], answer: 0, hint: 'Can a rabbit choose to be born faster?', explain: 'The variation has to already be there. Selection keeps what works; it cannot order up a new trait on demand.' },
      { type: 'mc', prompt: 'Evolution needs enormous time because:', choices: ['DNA is a complicated molecule to change', 'tiny advantages take many generations to add up', 'useful changes appear very suddenly', 'fossils are only rarely preserved'], answer: 1, hint: 'How big is a one percent advantage in one generation?', explain: 'Small effects need many repetitions — the same compounding as interest.' },
      { type: 'mc', prompt: 'A trait becomes more common when its owners:', choices: ['are stronger', 'are larger', 'leave more offspring', 'live longer only'], answer: 2, hint: 'What actually passes a trait on?', explain: 'Reproduction is the mechanism. Survival matters because it enables it.' },
    ],
  },
  {
    id: 'bio8', tag: 'Life Science', title: 'Systems That Keep You Running',
    subtitle: 'Day 8 · Organs are teams, not soloists',
    pages: [
      { title: 'Cells to tissues to organs to systems', blocks: [
        { type: 'text', text: 'Similar cells form tissue. Tissues form an organ. Organs working toward one job form a system. Each level does something the level below could not.' },
        { type: 'concept', term: 'Organ system', def: 'A group of organs cooperating on one function — like circulation or digestion.' },
      ]},
      { title: 'No system works alone', blocks: [
        { type: 'text', text: 'Your circulatory system moves blood, but the blood is carrying oxygen the respiratory system collected and nutrients the digestive system extracted. Remove any one and the others fail.' },
        { type: 'visual', kind: 'flow', steps: ['Digest', 'Absorb', 'Circulate', 'Use'] },
      ]},
      { title: 'Staying steady is the point', blocks: [
        { type: 'text', text: 'Together they hold conditions inside a narrow band — temperature, water, sugar, oxygen. Systems exist mostly to keep things from drifting.' },
        { type: 'callout', text: 'Homeostasis, from Day 1. You met the word before you met the machinery that does it.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Computer Science built big programs from small functions that each did one job. A body is that pattern in flesh — and it fails the same way, when one piece stops doing its part.' },
      ]},
    ],
    recap: [
      'Cells build tissues, tissues build organs, organs build systems.',
      'Systems depend on each other to work at all.',
      'Their shared job is holding conditions steady.',
    ],
    quiz: [
      { type: 'mc', prompt: 'The correct order from smallest is:', choices: ['organ, tissue, cell, system', 'system, organ, cell, tissue', 'tissue, cell, system, organ', 'cell, tissue, organ, system'], answer: 3, hint: 'Start with the smallest living unit.', explain: 'Cell, tissue, organ, system — each built from the one before.' },
      { type: 'mc', prompt: 'Without the respiratory system, the circulatory system would:', choices: ['have nothing useful to carry', 'work normally', 'pump faster to compensate', 'be unaffected for days'], answer: 0, hint: 'What is the blood actually carrying?', explain: 'Blood delivers oxygen. With nothing collecting oxygen, circulation is a delivery service with an empty van.' },
      { type: 'mc', prompt: 'The shared purpose of organ systems is best described as:', choices: ['fighting off disease and infection', 'keeping internal conditions steady', 'making the body grow larger', 'producing energy from food'], answer: 1, hint: 'One word from Day 1.', explain: 'Homeostasis — holding conditions within a narrow band.' },
      { type: 'mc', prompt: 'A body resembles a well-built program because both:', choices: ['run faster than anything else', 'are designed never to fail at all', 'combine small parts each doing one job', 'are written down before being built'], answer: 2, hint: 'Think about decomposition.', explain: 'Small specialised pieces combining into something larger.' },
    ],
  },
  {
    id: 'bio9', tag: 'Life Science', title: 'The Living Things You Cannot See',
    subtitle: 'Day 9 · Most life is microscopic',
    pages: [
      { title: 'Bacteria are everywhere, mostly harmless', blocks: [
        { type: 'text', text: 'Bacteria are single-celled organisms living in soil, water, air and inside you. A small minority cause disease. Most are neutral, and many are essential.' },
        { type: 'example', text: 'Bacteria in your gut help digest food you could not break down alone. You are carrying trillions of them right now.' },
      ]},
      { title: 'Viruses are a strange case', blocks: [
        { type: 'text', text: 'A virus is not a cell. It cannot use energy, grow, or reproduce by itself — it must hijack a living cell to make copies. By the checklist from Day 1, it does not clearly count as alive.' },
        { type: 'concept', term: 'Virus', def: 'Genetic material in a protein shell that can only reproduce inside a host cell.' },
      ]},
      { title: 'Decomposers close the loop', blocks: [
        { type: 'text', text: 'Fungi and bacteria break dead material back into nutrients plants can use. Without them, everything that ever died would still be lying there and the nutrients would be locked up forever.' },
        { type: 'callout', text: 'This is what makes a food web a cycle instead of a line.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Day 1 gave you a checklist for what counts as alive, and said a precise definition settles hard cases. Viruses are the hard case. The checklist still does the work.' },
      ]},
    ],
    recap: [
      'Most bacteria are harmless or necessary.',
      'Viruses cannot reproduce alone and fail the checklist for life.',
      'Decomposers return nutrients and close the cycle.',
    ],
    quiz: [
      { type: 'mc', prompt: 'A virus cannot be clearly called alive because it:', choices: ['cannot move around by itself', 'contains no genetic material at all', 'is far too small to see clearly', 'cannot reproduce without a host cell'], answer: 3, hint: 'Check it against the Day 1 list.', explain: 'It fails several checklist items, reproduction most obviously.' },
      { type: 'mc', prompt: 'Of all bacteria species, the proportion that cause disease in humans is:', choices: ['a small minority', 'about half', 'most of them', 'none'], answer: 0, hint: 'Think about what is in your gut right now.', explain: 'A small minority. Most are harmless, and a great many are doing work you could not live without.' },
      { type: 'mc', prompt: 'Decomposers matter because they:', choices: ['produce most of the planet’s oxygen', 'return nutrients so they can be reused', 'hunt and eat living animals', 'make soil harder and more solid'], answer: 1, hint: 'What would pile up without them?', explain: 'They close the loop and keep the cycle turning.' },
      { type: 'mc', prompt: 'Without decomposers a food web would be:', choices: ['completely unchanged in shape', 'a faster and more efficient cycle', 'a one-way line ending in waste', 'a cycle with fewer participants'], answer: 2, hint: 'Nothing would come back.', explain: 'Nutrients would lock up permanently in dead material.' },
    ],
  },
  {
    id: 'bio10', tag: 'Life Science', title: 'How a Claim Gets Tested',
    subtitle: 'Day 10 · What makes an experiment worth believing',
    pages: [
      { title: 'A hypothesis has to be able to fail', blocks: [
        { type: 'text', text: 'A useful hypothesis predicts something specific that could turn out wrong. If no possible result would count against it, testing it proves nothing.' },
        { type: 'concept', term: 'Hypothesis', def: 'A testable prediction — specific enough that a result could contradict it.' },
      ]},
      { title: 'Change one thing at a time', blocks: [
        { type: 'text', text: 'If you change the water AND the light AND the soil, and one plant grows better, you have learned nothing about why. Vary one factor; hold the rest fixed.' },
        { type: 'callout', text: 'The group where you change nothing is the control. Without it you have no baseline to compare against.' },
      ]},
      { title: 'One result is not a finding', blocks: [
        { type: 'text', text: 'Repeat it. A result that appears once might be chance, a mistake, or something about that particular day. A result that survives repetition by other people is worth believing.' },
        { type: 'example', text: 'One plant growing taller proves very little. Thirty plants, in two conditions, repeated next month, is evidence.' },
      ]},
      { title: 'Where you have seen this before', blocks: [
        { type: 'callout', text: 'Logic said one counterexample destroys a universal claim, and no pile of examples proves one. Science lives inside that asymmetry — which is why a hypothesis is never "proved", only "not yet contradicted".' },
      ]},
    ],
    recap: [
      'A hypothesis must be able to be shown wrong.',
      'Change one variable; keep a control group.',
      'A single result is not a finding until it repeats.',
    ],
    quiz: [
      { type: 'mc', prompt: 'A hypothesis is useful only if:', choices: ['it is complicated enough to be serious', 'it is already widely known to be true', 'it is popular among other scientists', 'some possible result could show it wrong'], answer: 3, hint: 'What would count as evidence against it?', explain: 'It must be able to fail. Otherwise the test tells you nothing.' },
      { type: 'mc', prompt: 'Changing several variables at once in an experiment means:', choices: ['you cannot tell which change caused it', 'you reach a useful result far faster', 'the experiment is more realistic', 'you need to run far fewer trials'], answer: 0, hint: 'Which one caused the effect?', explain: 'If three things changed and the result moved, you have learned nothing about which was responsible.' },
      { type: 'mc', prompt: 'The control group is there to:', choices: ['confirm the hypothesis', 'give a baseline for comparison', 'save time', 'make the experiment bigger'], answer: 1, hint: 'Compared against what?', explain: 'Without a baseline, a result has no meaning.' },
      { type: 'mc', prompt: 'Why is a hypothesis never called "proved"?', choices: ['proof belongs only to mathematics', 'scientists are simply cautious by habit', 'no confirmation rules out a future one', 'it is a mistranslation of the word'], answer: 2, hint: 'Remember the swans.', explain: 'Examples support but never prove a universal claim — straight from Logic.' },
    ],
  },
];
