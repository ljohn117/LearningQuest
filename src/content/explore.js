/* Curriculum content — extracted verbatim from the prototypes.
   Day ids are load-bearing: progress is keyed `subjectId:dayId`.
   NEVER renumber or reuse a day id. */
import {
  Bone, BookOpen, Landmark, Leaf, TrendingUp,
} from 'lucide-react';

export const EXPLORE = {
  bio: {
    name: 'Biology', icon: Leaf, accent: '#2dd4bf',
    blurb: 'The rules that everything alive has in common.',
    days: [
      {
        id: 'bio1', tag: 'Life Science', title: 'What Makes Something Alive?',
        subtitle: 'Day 1 · The definition of life',
        pages: [
          { title: 'A harder question than it looks', blocks: [
            { type: 'text', text: 'A dog is alive. A rock is not. Easy. But what about a seed, a virus, or a flame that grows and consumes? Biologists needed a precise checklist, not a gut feeling.' },
            { type: 'concept', term: 'Organism', def: 'Any individual living thing — a bacterium, a tree, a whale, or you.' },
          ]},
          { title: 'The checklist', blocks: [
            { type: 'text', text: 'Living things share a set of traits: they are made of cells, they use energy, they grow and develop, they respond to their surroundings, they reproduce, and they keep their insides stable.' },
            { type: 'concept', term: 'Homeostasis', def: 'Keeping stable internal conditions despite what is happening outside — like your body holding near 98.6°F whether it is snowing or sweltering.' },
          ]},
          { title: 'Testing the tricky cases', blocks: [
            { type: 'example', text: 'A flame uses energy and grows — but it has no cells and cannot reproduce itself properly, so it fails the checklist. A seed looks inert but is alive, simply dormant. The checklist settles arguments that intuition cannot.' },
          ]},
          { title: 'Why definitions matter', blocks: [
            { type: 'callout', text: 'This is the same move you made in Computer Science and Math: a precise definition lets you decide hard cases without guessing. Science runs on exact language.' },
          ]},
        ],
        recap: [
          'Living things are made of cells and use energy.',
          'They grow, respond, reproduce, and maintain homeostasis.',
          'A precise checklist settles tricky cases like flames and seeds.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Keeping stable internal conditions is called:', choices: ['photosynthesis', 'reproduction', 'erosion', 'homeostasis'], answer: 3, hint: 'Think of body temperature.', explain: 'That is homeostasis.' },
          { type: 'mc', prompt: 'All living things are made of:', choices: ['plastic', 'sand', 'cells', 'metal'], answer: 2, hint: 'The basic unit of life.', explain: 'Cells are the building block of life.' },
          { type: 'mc', prompt: 'A flame grows, moves and uses energy. Why is it still not alive?', choices: ['it is not made of cells', 'it does not use energy', 'it does not grow', 'it is too hot'], answer: 0, hint: 'Check the whole list of traits, not just one.', explain: 'Living things are made of cells, respond, and reproduce. A flame manages two items on the list and none of the rest.' },
          { type: 'mc', prompt: 'Which is NOT on the list of traits of living things?', choices: ['being made of metal', 'using energy', 'reproducing', 'responding to surroundings'], answer: 0, hint: 'Three of these are real traits.', explain: 'Being metal is not a trait of life.' },
        ],
      },
      {
        id: 'bio2', tag: 'Life Science', title: 'Cells: The Building Blocks',
        subtitle: 'Day 2 · Inside the unit of life',
        pages: [
          { title: 'Everything is built from them', blocks: [
            { type: 'text', text: 'Yesterday you learned all living things are made of cells. Cell theory goes further: cells are the basic unit of life, and every cell comes from another cell that existed before it.' },
            { type: 'visual', kind: 'cell' },
          ]},
          { title: 'The main parts', blocks: [
            { type: 'concept', term: 'Nucleus', def: 'The control center, holding the cell’s instructions (its DNA).' },
            { type: 'concept', term: 'Mitochondria', def: 'The powerhouses — they release usable energy from food.' },
            { type: 'text', text: 'Around it all sits the cell membrane, a gatekeeper deciding what enters and leaves. That gatekeeping is homeostasis happening at the smallest scale.' },
          ]},
          { title: 'Plant versus animal', blocks: [
            { type: 'example', text: 'Plant cells add two things animal cells lack: a stiff cell wall for structure, and chloroplasts that capture sunlight. That is why a tree stands upright and a jellyfish does not.' },
          ]},
          { title: 'Scale check', blocks: [
            { type: 'text', text: 'A typical human cell is roughly 0.00002 meters across — about 2 × 10⁻⁵ m. Your body holds tens of trillions of them.' },
            { type: 'callout', text: 'Numbers that extreme are exactly why scientific notation exists. Biology borrows your math constantly.' },
          ]},
        ],
        recap: [
          'Cell theory: cells are the basic unit of life and come from other cells.',
          'The nucleus stores instructions; mitochondria release energy.',
          'Plant cells add a cell wall and chloroplasts.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Which part is the cell’s control center?', choices: ['cell wall', 'nucleus', 'membrane', 'mitochondria'], answer: 1, hint: 'It holds the DNA.', explain: 'The nucleus controls the cell.' },
          { type: 'mc', prompt: 'Which part releases usable energy from food?', choices: ['mitochondria', 'nucleus', 'cell wall', 'chloroplast'], answer: 0, hint: 'Known as the powerhouse.', explain: 'Mitochondria release energy.' },
          { type: 'mc', prompt: 'Which is found in plant cells but NOT animal cells?', choices: ['nucleus', 'membrane', 'mitochondria', 'cell wall'], answer: 3, hint: 'It gives plants stiffness.', explain: 'Plant cells have one and animal cells do not. Bacteria and fungi have walls too — animals are the odd ones out here.' },
          { type: 'mc', prompt: 'Cell theory says new cells come from:', choices: ['non-living matter', 'existing cells that divide', 'the nucleus alone', 'sunlight'], answer: 1, hint: 'Cells do not appear from nothing.', explain: 'Every cell came from a cell that divided — an unbroken chain back through the whole history of life.' },
        ],
      },
      {
        id: 'bio3', tag: 'Life Science', title: 'How Living Things Get Energy',
        subtitle: 'Day 3 · Photosynthesis and respiration',
        pages: [
          { title: 'Everything alive needs fuel', blocks: [
            { type: 'text', text: 'Growing, moving, thinking, healing — all of it costs energy. Every drop of that energy on Earth traces back to one original source: the Sun.' },
          ]},
          { title: 'Plants capture it', blocks: [
            { type: 'concept', term: 'Photosynthesis', def: 'Plants use sunlight, water, and carbon dioxide to make sugar and release oxygen. It happens in the chloroplasts.' },
            { type: 'formula', text: 'sunlight + water + CO₂ → sugar + oxygen', label: 'Photosynthesis: capturing energy' },
          ]},
          { title: 'Everyone releases it', blocks: [
            { type: 'concept', term: 'Cellular respiration', def: 'Cells break sugar down using oxygen to release usable energy, giving off carbon dioxide and water. It happens in the mitochondria.' },
            { type: 'text', text: 'Read those two formulas side by side and something clicks: they are almost exact opposites. What plants build, respiration takes apart.' },
          ]},
          { title: 'A closed loop', blocks: [
            { type: 'example', text: 'Plants release the oxygen you breathe in. You breathe out the carbon dioxide plants need. Every breath you take is one half of a cycle you are permanently part of.' },
            { type: 'callout', text: 'This is the deepest pattern in biology: energy flows in one direction from the Sun, while matter cycles around and around forever.' },
          ]},
        ],
        recap: [
          'Photosynthesis uses sunlight to make sugar and release oxygen.',
          'Cellular respiration breaks sugar down to release usable energy.',
          'The two processes are near opposites, forming a cycle.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Photosynthesis takes in sunlight, water, and:', choices: ['sand', 'salt', 'carbon dioxide', 'oxygen'], answer: 2, hint: 'The gas you breathe out.', explain: 'Plants take in carbon dioxide.' },
          { type: 'mc', prompt: 'Photosynthesis releases:', choices: ['helium', 'oxygen', 'carbon dioxide', 'nitrogen'], answer: 1, hint: 'The gas you breathe in.', explain: 'It releases oxygen.' },
          { type: 'mc', prompt: 'Cellular respiration happens mainly in the:', choices: ['mitochondria', 'nucleus', 'cell wall', 'chloroplast'], answer: 0, hint: 'The powerhouse of the cell.', explain: 'Mitochondria carry out respiration.' },
          { type: 'mc', prompt: 'Photosynthesis and cellular respiration are related how?', choices: ['they are roughly opposite — one stores energy, one releases it', 'they are the same process', 'both release energy', 'both happen only in plants'], answer: 0, hint: 'Compare what goes in with what comes out.', explain: 'One takes carbon dioxide, water and light and makes sugar and oxygen. The other runs that backwards to get the energy out.' },
          { type: 'mc', prompt: 'The original source of nearly all energy for life is:', choices: ['the Moon', 'soil', 'wind', 'the Sun'], answer: 3, hint: 'Photosynthesis starts with it.', explain: 'Energy traces back to the Sun.' },
        ],
      },
      {
        id: 'bio4', tag: 'Genetics', title: 'DNA & Inherited Traits',
        subtitle: 'Day 4 · Why you resemble your family',
        pages: [
          { title: 'The instruction manual', blocks: [
            { type: 'text', text: 'Inside the nucleus of nearly every cell sits DNA — a molecule storing the complete instructions for building and running an organism. A section of DNA that codes for a trait is called a gene.' },
            { type: 'concept', term: 'Gene', def: 'A segment of DNA carrying instructions for a specific trait, like eye color or seed shape.' },
          ]},
          { title: 'Two copies of everything', blocks: [
            { type: 'text', text: 'You inherit one copy of each gene from each parent. When the two copies disagree, one version often wins out.' },
            { type: 'concept', term: 'Dominant and recessive', def: 'A dominant version shows up whenever it is present. A recessive version only shows when both copies are recessive.' },
          ]},
          { title: 'Predicting with a grid', blocks: [
            { type: 'text', text: 'A Punnett square lays out the possible combinations. Cross two parents who each carry one dominant and one recessive copy, and you get four equally likely boxes.' },
            { type: 'visual', kind: 'punnett' },
            { type: 'example', text: 'Three of the four boxes show the dominant trait, one shows the recessive — a 3 to 1 ratio, or a 25% chance of the recessive trait. Ratios and percents, exactly as you learned them.' },
          ]},
          { title: 'Where variation comes from', blocks: [
            { type: 'callout', text: 'Small differences in genes make every individual slightly unique. Over enormous stretches of time, that variation is what the fossil record records as change.' },
          ]},
        ],
        recap: [
          'DNA stores instructions; a gene codes for a specific trait.',
          'You inherit one copy of each gene from each parent.',
          'A Punnett square predicts outcomes as ratios — often 3 to 1.',
        ],
        quiz: [
          { type: 'mc', prompt: 'A section of DNA coding for a trait is a:', choices: ['fossil', 'nucleus', 'gene', 'cell wall'], answer: 2, hint: 'It carries one instruction.', explain: 'That is a gene.' },
          { type: 'mc', prompt: 'A recessive trait appears only when:', choices: ['there is no DNA', 'both copies are recessive', 'one copy is recessive', 'it is dominant'], answer: 1, hint: 'Dominant wins whenever present.', explain: 'Both copies must be recessive.' },
          { type: 'numeric', prompt: 'In a 3 to 1 Punnett result, what percent show the recessive trait?', answer: 25, hint: 'One box out of four.', explain: '1 ÷ 4 = 25%.' },
          { type: 'numeric', prompt: 'How many copies of each gene do you inherit in total from your two parents?', answer: 2, hint: 'One from each parent.', explain: 'Two copies — one per parent.' },
          { type: 'mc', prompt: 'In a plant cell, DNA is stored mainly in the:', choices: ['cell wall', 'nucleus', 'chloroplast', 'cell membrane'], answer: 1, hint: 'The control centre of the cell.', explain: 'The nucleus holds the DNA. The cell wall is structure — it is the outside, not the instructions.' },
        ],
      },
      {
        id: 'bio5', tag: 'Life Science', title: 'Classifying Living Things',
        subtitle: 'Day 5 · Sorting millions of species',
        pages: [
          { title: 'Order out of chaos', blocks: [
            { type: 'text', text: 'Scientists have named nearly two million species, with millions more undiscovered. Without a system, that knowledge would be unusable. Taxonomy is the system.' },
            { type: 'concept', term: 'Taxonomy', def: 'The science of naming and grouping organisms based on shared characteristics and shared ancestry.' },
          ]},
          { title: 'Nested boxes', blocks: [
            { type: 'text', text: 'Groups sit inside larger groups, from broad to specific: kingdom, phylum, class, order, family, genus, species. Each step down means more traits in common.' },
            { type: 'concept', term: 'Species', def: 'The most specific level — organisms similar enough to reproduce and produce offspring that can also reproduce.' },
          ]},
          { title: 'The two-name system', blocks: [
            { type: 'example', text: 'Every species gets a two-part scientific name from its genus and species, like Homo sapiens for humans. Because it is universal, a scientist anywhere on Earth knows exactly which organism you mean.' },
          ]},
          { title: 'It is decomposition', blocks: [
            { type: 'callout', text: 'Breaking an overwhelming problem into nested, manageable groups — that is precisely the decomposition strategy from Computer Science, applied to all of life.' },
          ]},
        ],
        recap: [
          'Taxonomy names and groups organisms by shared traits.',
          'Groups nest from kingdom down to species, getting more specific.',
          'Each species has a universal two-part scientific name.',
        ],
        quiz: [
          { type: 'mc', prompt: 'The science of naming and grouping organisms is:', choices: ['geology', 'economics', 'astronomy', 'taxonomy'], answer: 3, hint: 'It creates the classification system.', explain: 'That is taxonomy.' },
          { type: 'mc', prompt: 'Which is the MOST specific level?', choices: ['phylum', 'class', 'species', 'kingdom'], answer: 2, hint: 'Run down the taxonomy order — kingdom, phylum, class, order, family, genus, species. The narrowest is at the end.', explain: 'Species is the most specific level.' },
          { type: 'mc', prompt: 'Which is the BROADEST level listed?', choices: ['kingdom', 'species', 'genus', 'family'], answer: 0, hint: 'Run down the taxonomy order — kingdom, phylum, class, order, family, genus, species. The widest is at the start.', explain: 'Kingdom is the broadest level.' },
          { type: 'mc', prompt: 'A scientific name such as Homo sapiens is made of:', choices: ['kingdom and phylum', 'genus and species', 'family and order', 'class and genus'], answer: 1, hint: 'It is the last two ranks — the most specific ones.', explain: 'Genus then species. Homo is the genus, sapiens the species. Kingdom and phylum are far broader.' },
        ],
      },
      {
        id: 'bio6', tag: 'Ecology', title: 'Ecosystems & Food Webs',
        subtitle: 'Day 6 · How life connects',
        pages: [
          { title: 'Living things plus their world', blocks: [
            { type: 'text', text: 'An ecosystem is every living thing in an area plus the non-living parts they depend on — soil, water, air, and sunlight. Nothing in it survives alone.' },
            { type: 'concept', term: 'Ecosystem', def: 'A community of organisms interacting with each other and with their non-living environment.' },
          ]},
          { title: 'Three jobs', blocks: [
            { type: 'concept', term: 'Producers, consumers, decomposers', def: 'Producers (plants) make their own food from sunlight. Consumers eat other organisms. Decomposers break dead material down, returning nutrients to the soil.' },
            { type: 'text', text: 'Link who eats whom and you get a food web — a map of energy moving through a community.' },
          ]},
          { title: 'Energy shrinks as it climbs', blocks: [
            { type: 'visual', kind: 'pyramid' },
            { type: 'example', text: 'Only about 10% of the energy at one level reaches the next; the rest is spent living. That is why food chains rarely exceed four or five links — there is simply not enough energy left to support another one.' },
          ]},
          { title: 'The pattern beneath everything', blocks: [
            { type: 'text', text: 'Energy flows one way, from the Sun through producers to consumers, dissipating as it goes. Matter, meanwhile, is recycled endlessly by decomposers.' },
            { type: 'callout', text: 'Cells, energy, genes, classification, ecosystems — six days took you from one microscopic unit to the whole living planet, and every level ran on the same few rules.' },
          ]},
        ],
        recap: [
          'An ecosystem is organisms plus their non-living environment.',
          'Producers make food, consumers eat, decomposers recycle nutrients.',
          'Only about 10% of energy passes to the next level, limiting food chains.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Plants that make their own food are called:', choices: ['predators', 'producers', 'consumers', 'decomposers'], answer: 1, hint: 'They produce food from sunlight.', explain: 'Plants are producers.' },
          { type: 'mc', prompt: 'Organisms that break down dead material are:', choices: ['consumers', 'fossils', 'decomposers', 'producers'], answer: 2, hint: 'They recycle nutrients.', explain: 'Those are decomposers.' },
          { type: 'numeric', prompt: 'About what percent of energy passes to the next level of a food chain?', answer: 10, hint: 'Roughly one tenth.', explain: 'About 10% moves up.' },
          { type: 'mc', prompt: 'In an ecosystem:', choices: ['both energy and matter are recycled', 'energy flows one way, matter is recycled', 'matter flows one way, energy is recycled', 'neither is recycled'], answer: 1, hint: 'What do decomposers actually return to the soil?', explain: 'Energy arrives as sunlight and leaves as heat — one way. Matter gets returned and used again and again.' },
          { type: 'mc', prompt: 'Food chains are usually short because:', choices: ['animals get bored', 'plants are rare', 'water is heavy', 'energy runs out at each level'], answer: 3, hint: 'Only 10% passes up.', explain: 'Energy loss limits chain length.' },
        ],
      },
    ],
  },
  ela: {
    name: 'English & Writing', icon: BookOpen, accent: '#fb7185',
    blurb: 'Reading closely and writing so people believe you.',
    days: [
      {
        id: 'ela1', tag: 'Grammar', title: 'How Sentences Are Built',
        subtitle: 'Day 1 · The architecture of a sentence',
        pages: [
          { title: 'Two required parts', blocks: [
            { type: 'text', text: 'Every complete sentence needs two things: a subject (who or what the sentence is about) and a predicate (what the subject does or is). Miss either one and it collapses into a fragment.' },
            { type: 'concept', term: 'Subject and predicate', def: 'The subject names who or what. The predicate tells what the subject does or is. "The fossil hunter" + "found a tooth."' },
          ]},
          { title: 'Clauses', blocks: [
            { type: 'concept', term: 'Independent clause', def: 'A group of words with a subject and predicate that can stand alone as a sentence.' },
            { type: 'concept', term: 'Dependent clause', def: 'Has a subject and predicate but cannot stand alone — it leans on the rest. "Because the rain stopped" leaves you waiting.' },
          ]},
          { title: 'Building longer sentences', blocks: [
            { type: 'example', text: 'Join two independent clauses with a comma and a joining word: "The rain stopped, so we went outside." Attach a dependent clause instead and you get: "Because the rain stopped, we went outside." Same idea, different rhythm.' },
          ]},
          { title: 'Why structure is power', blocks: [
            { type: 'callout', text: 'Sentence structure is syntax — the same word Computer Science uses. In both, precise structure is what makes meaning survive the trip from your head into someone else’s.' },
          ]},
        ],
        recap: [
          'A complete sentence needs a subject and a predicate.',
          'An independent clause stands alone; a dependent clause cannot.',
          'Joining clauses lets you build longer, clearer sentences.',
        ],
        quiz: [
          { type: 'mc', prompt: 'The part of a sentence telling what the subject does is the:', choices: ['title', 'predicate', 'subject', 'adjective'], answer: 1, hint: 'It carries the action.', explain: 'That is the predicate.' },
          { type: 'mc', prompt: 'Which can stand alone as a sentence?', choices: ['an independent clause', 'a dependent clause', 'a fragment', 'a phrase'], answer: 0, hint: 'The name is a hint.', explain: 'Independent clauses stand alone.' },
          { type: 'mc', prompt: '"Because the rain stopped" is a:', choices: ['complete sentence', 'paragraph', 'dependent clause', 'independent clause'], answer: 2, hint: 'Does it feel finished?', explain: 'It cannot stand alone — dependent.' },
          { type: 'mc', prompt: 'A complete sentence needs:', choices: ['a subject only', 'a verb only', 'a subject and a predicate', 'at least eight words'], answer: 2, hint: 'Who or what, and what they do.', explain: 'Both halves. “The dog” is not a sentence; “The dog barked” is.' },
        ],
      },
      {
        id: 'ela2', tag: 'Reading', title: 'Main Idea & Evidence',
        subtitle: 'Day 2 · Reading like a detective',
        pages: [
          { title: 'What is this really about?', blocks: [
            { type: 'text', text: 'The main idea is the central point a text is making — not simply its topic. The topic might be "sharks." The main idea might be "sharks are misunderstood and vital to oceans." One is a subject; the other is a claim.' },
            { type: 'concept', term: 'Main idea', def: 'The central point a text argues or explains, usually supported throughout by details.' },
          ]},
          { title: 'Details do the work', blocks: [
            { type: 'concept', term: 'Supporting evidence', def: 'The facts, examples, and quotations an author uses to make the main idea believable.' },
            { type: 'text', text: 'To find the main idea, ask what all the details have in common. The answer they point at together is usually it.' },
          ]},
          { title: 'Summarizing well', blocks: [
            { type: 'example', text: 'A weak summary retells everything in order. A strong one names the main idea and the two or three strongest pieces of evidence, in your own words. Shorter, and far more useful.' },
          ]},
          { title: 'The transferable skill', blocks: [
            { type: 'callout', text: 'Separating a central claim from its supporting evidence is exactly what you will do to judge an advertisement, a news article, or a politician’s speech. This is reading as self-defense.' },
          ]},
        ],
        recap: [
          'The topic is what a text is about; the main idea is the point it makes.',
          'Supporting evidence is the facts and examples that back it up.',
          'A good summary gives the main idea plus the strongest evidence.',
        ],
        quiz: [
          { type: 'mc', prompt: 'The main idea is:', choices: ['the last word', 'the central point the text makes', 'the longest sentence', 'the title only'], answer: 1, hint: 'It is a claim, not just a subject.', explain: 'It is the central point.' },
          { type: 'mc', prompt: 'Facts and examples that back up the main idea are:', choices: ['supporting evidence', 'the topic', 'a fragment', 'a predicate'], answer: 0, hint: 'They make it believable.', explain: 'That is supporting evidence.' },
          { type: 'mc', prompt: '"Sharks" is a topic. Which is a main idea?', choices: ['Sharks', 'Ocean animals', 'Fish', 'Sharks are misunderstood and vital to oceans'], answer: 3, hint: 'A main idea makes a claim.', explain: 'It states a point, not just a subject.' },
          { type: 'mc', prompt: 'A strong summary:', choices: ['retells every detail in order', 'keeps the main idea and drops the rest', 'is always exactly one sentence', 'copies the best lines word for word'], answer: 1, hint: 'Shorter and sharper.', explain: 'If it keeps every detail it is not a summary — it is a retelling at the same length.' },
        ],
      },
      {
        id: 'ela3', tag: 'Literature', title: 'Figurative Language',
        subtitle: 'Day 3 · When words mean more than they say',
        pages: [
          { title: 'Beyond the literal', blocks: [
            { type: 'text', text: 'Sometimes writers say something that is not literally true in order to communicate something truer. "The classroom was a zoo" contains no animals — and yet you understand it instantly and precisely.' },
            { type: 'concept', term: 'Figurative language', def: 'Words used beyond their literal meaning to create an image, feeling, or comparison.' },
          ]},
          { title: 'The two great comparisons', blocks: [
            { type: 'concept', term: 'Simile', def: 'A comparison using like or as. "Quiet as a held breath."' },
            { type: 'concept', term: 'Metaphor', def: 'A comparison stating one thing IS another. "Her voice was gravel." Stronger, because it skips the comparison and simply claims it.' },
          ]},
          { title: 'Two more to know', blocks: [
            { type: 'concept', term: 'Personification', def: 'Giving human qualities to something non-human. "The wind argued with the door."' },
            { type: 'concept', term: 'Imagery', def: 'Language appealing to the senses, letting a reader see, hear, or feel the scene.' },
          ]},
          { title: 'Why writers reach for it', blocks: [
            { type: 'example', text: '"He was tired" tells you a fact. "He moved like a man wading through wet sand" makes you feel the weight of it. Figurative language transmits experience, not just information.' },
            { type: 'callout', text: 'Spotting these tools makes you a sharper reader — and using them makes your own writing land harder.' },
          ]},
        ],
        recap: [
          'Figurative language means more than the literal words.',
          'Similes compare using like or as; metaphors say one thing IS another.',
          'Personification gives human traits to non-human things; imagery appeals to the senses.',
        ],
        quiz: [
          { type: 'mc', prompt: '"Quiet as a held breath" is a:', choices: ['fact', 'simile', 'metaphor', 'personification'], answer: 1, hint: 'Look for like or as.', explain: 'It uses "as" — a simile.' },
          { type: 'mc', prompt: '"Her voice was gravel" is a:', choices: ['metaphor', 'simile', 'summary', 'clause'], answer: 0, hint: 'It says one thing IS another.', explain: 'That is a metaphor.' },
          { type: 'mc', prompt: '"The wind argued with the door" is:', choices: ['a simile', 'imagery only', 'a fragment', 'personification'], answer: 3, hint: 'Wind cannot argue.', explain: 'Human traits given to wind — personification.' },
          { type: 'mc', prompt: 'Language that appeals to the senses is:', choices: ['a thesis', 'taxonomy', 'imagery', 'a predicate'], answer: 2, hint: 'It creates pictures and sounds.', explain: 'That is imagery.' },
        ],
      },
      {
        id: 'ela4', tag: 'Reading', title: 'Purpose, Tone & Point of View',
        subtitle: 'Day 4 · Who is talking, and why?',
        pages: [
          { title: 'Every text wants something', blocks: [
            { type: 'text', text: 'No one writes without a reason. Author’s purpose usually falls into three families: to inform, to persuade, or to entertain. Naming the purpose changes how carefully you should read.' },
            { type: 'concept', term: 'Author’s purpose', def: 'The reason a text was written — most often to inform, persuade, or entertain.' },
          ]},
          { title: 'The attitude behind the words', blocks: [
            { type: 'concept', term: 'Tone', def: 'The author’s attitude toward the subject — playful, angry, respectful, worried — revealed through word choice.' },
            { type: 'example', text: 'Compare "the crowd gathered" with "the mob swarmed." Same event, opposite tone. The chosen words quietly tell you how to feel.' },
          ]},
          { title: 'Who holds the camera', blocks: [
            { type: 'concept', term: 'Point of view', def: 'Who is telling it. First person uses I and knows only their own mind. Third person uses he, she, they, and may know much more.' },
          ]},
          { title: 'Reading with your guard up', blocks: [
            { type: 'text', text: 'When a text aims to persuade, tone and word choice are doing work on you. Noticing that is not cynicism — it is literacy.' },
            { type: 'callout', text: 'This is the same lens you would turn on a marketing campaign or a political speech. Purpose, tone, and point of view are how you read the intent behind the message.' },
          ]},
        ],
        recap: [
          'Author’s purpose is usually to inform, persuade, or entertain.',
          'Tone is the author’s attitude, revealed by word choice.',
          'Point of view is who tells it — first person or third person.',
        ],
        quiz: [
          { type: 'mc', prompt: 'The three common author’s purposes are inform, entertain, and:', choices: ['persuade', 'confuse', 'ignore', 'repeat'], answer: 0, hint: 'Ads do this one.', explain: 'To persuade.' },
          { type: 'mc', prompt: 'An author’s attitude toward the subject is the:', choices: ['genre', 'tone', 'topic', 'clause'], answer: 1, hint: 'Word choice reveals it.', explain: 'That is tone.' },
          { type: 'mc', prompt: 'A story using "I" is written in:', choices: ['third person', 'second person only', 'no point of view', 'first person'], answer: 3, hint: 'The narrator is in the story.', explain: 'Using I is first person.' },
          { type: 'mc', prompt: '"The mob swarmed" instead of "the crowd gathered" changes the:', choices: ['font', 'length only', 'tone', 'page number'], answer: 2, hint: 'It changes how you feel.', explain: 'Word choice shifts tone.' },
        ],
      },
      {
        id: 'ela5', tag: 'Writing', title: 'Building a Strong Paragraph',
        subtitle: 'Day 5 · Structure that carries an idea',
        pages: [
          { title: 'One idea per paragraph', blocks: [
            { type: 'text', text: 'A paragraph is not just a chunk of text — it is one idea, fully supported. When the idea changes, the paragraph should too.' },
            { type: 'visual', kind: 'paragraph' },
          ]},
          { title: 'The four moves', blocks: [
            { type: 'concept', term: 'Topic sentence', def: 'The opening line stating the paragraph’s one idea, so the reader knows where they are going.' },
            { type: 'concept', term: 'Evidence and analysis', def: 'Evidence proves the point — facts, examples, quotations. Analysis explains WHY that evidence supports your idea. Skipping analysis is the most common mistake in student writing.' },
          ]},
          { title: 'Putting it together', blocks: [
            { type: 'example', text: 'Topic: "Fossils reveal how animals behaved." Evidence: "Trackways show dinosaurs travelling in groups." Analysis: "Because the prints run parallel and evenly spaced, they suggest deliberate herding rather than chance." Conclusion: a sentence closing the idea or bridging to the next.' },
          ]},
          { title: 'Scaling up', blocks: [
            { type: 'text', text: 'An essay is this same shape, one size larger: a thesis instead of a topic sentence, paragraphs instead of sentences, a conclusion instead of a closing line.' },
            { type: 'callout', text: 'Break a big writing task into paragraphs, and each paragraph into four moves, and nothing is overwhelming. Decomposition again — this time on the page.' },
          ]},
        ],
        recap: [
          'A paragraph carries one idea, fully supported.',
          'Topic sentence, evidence, analysis, closing — four moves.',
          'Analysis explains WHY the evidence supports the point.',
        ],
        quiz: [
          { type: 'mc', prompt: 'The sentence stating a paragraph’s main idea is the:', choices: ['metaphor', 'predicate', 'topic sentence', 'conclusion'], answer: 2, hint: 'It usually comes first.', explain: 'That is the topic sentence.' },
          { type: 'mc', prompt: 'Explaining WHY your evidence supports your point is:', choices: ['analysis', 'evidence', 'tone', 'imagery'], answer: 0, hint: 'The step most writers skip.', explain: 'That is analysis.' },
          { type: 'mc', prompt: 'When your writing moves to a new idea, you should:', choices: ['start a new paragraph', 'add a heading', 'keep going in the same paragraph', 'start a new page'], answer: 0, hint: 'One idea, one paragraph.', explain: 'New idea, new paragraph. It is what lets a reader follow where you are going.' },
          { type: 'mc', prompt: 'In an essay, the thesis plays the same role as a paragraph’s:', choices: ['evidence', 'simile', 'font', 'topic sentence'], answer: 3, hint: 'It states the big idea.', explain: 'The thesis is the essay-level topic sentence.' },
        ],
      },
      {
        id: 'ela6', tag: 'Writing', title: 'Argument & Persuasion',
        subtitle: 'Day 6 · Making a case people accept',
        pages: [
          { title: 'The shape of an argument', blocks: [
            { type: 'text', text: 'A real argument is not a fight. It is a claim supported by reasons and evidence, offered so someone else can judge it fairly.' },
            { type: 'concept', term: 'Claim', def: 'The position you are asking your reader to accept — arguable, specific, and stated plainly.' },
            { type: 'visual', kind: 'argument' },
          ]},
          { title: 'Answering the other side', blocks: [
            { type: 'concept', term: 'Counterargument', def: 'The strongest objection to your claim, stated fairly — then answered. Addressing it makes you MORE convincing, not less.' },
            { type: 'text', text: 'Ignoring the obvious objection signals you either did not think of it or cannot answer it. Naming it first shows confidence.' },
          ]},
          { title: 'Three ways to persuade', blocks: [
            { type: 'example', text: 'Writers appeal to logic (evidence and reasoning), to credibility (why you should be trusted), and to emotion (why it matters to a person). The strongest arguments use all three — but logic carries the weight.' },
          ]},
          { title: 'The full circle', blocks: [
            { type: 'text', text: 'You can now build a sentence, find a main idea, read tone, structure a paragraph, and make an argument that survives scrutiny.' },
            { type: 'callout', text: 'This is the same machinery under a marketing pitch, a courtroom case, and a bill debated in Congress. Learning to argue well is learning to participate.' },
          ]},
        ],
        recap: [
          'An argument is a claim supported by reasons and evidence.',
          'Addressing the counterargument makes you more convincing.',
          'Persuasion appeals to logic, credibility, and emotion.',
        ],
        quiz: [
          { type: 'mc', prompt: 'The position you ask a reader to accept is the:', choices: ['topic', 'claim', 'tone', 'simile'], answer: 1, hint: 'It must be arguable.', explain: 'That is the claim.' },
          { type: 'mc', prompt: 'Stating and answering the strongest objection is using a:', choices: ['metaphor', 'fragment', 'summary', 'counterargument'], answer: 3, hint: 'It addresses the other side.', explain: 'That is the counterargument.' },
          { type: 'mc', prompt: 'Answering the strongest objection to your own claim:', choices: ['weakens your argument', 'strengthens it', 'makes no difference', 'is only worth doing in long essays'], answer: 1, hint: 'What does doing it show the reader?', explain: 'It shows you considered the objection and the claim survived. Ignoring it just leaves the objection standing unanswered.' },
          { type: 'mc', prompt: 'The three classic appeals are logic, emotion, and:', choices: ['credibility', 'volume', 'length', 'color'], answer: 0, hint: 'Why should you be trusted?', explain: 'Credibility completes the three.' },
          { type: 'mc', prompt: 'A strong claim should be:', choices: ['obvious to everyone', 'unrelated', 'arguable and specific', 'vague'], answer: 2, hint: 'It needs to be worth defending.', explain: 'Arguable and specific.' },
        ],
      },
    ],
  },
  gov: {
    name: 'Government & Civics', icon: Landmark, accent: '#c792ea',
    blurb: 'How power is organized, shared, and kept in check.',
    days: [
      {
        id: 'g1', tag: 'Civics', title: 'Why Government Exists',
        subtitle: 'Day 1 · The deal behind every society',
        pages: [
          { title: 'Imagine no rules', blocks: [
            { type: 'text', text: 'Picture a town where anyone can take anything and no one settles disputes. It collapses fast. Government exists to prevent exactly that — to create order, protect people, and provide things too big to do alone.' },
            { type: 'concept', term: 'Government', def: 'The system of people and rules a society uses to make decisions, keep order, and provide shared services.' },
          ]},
          { title: 'The social contract', blocks: [
            { type: 'concept', term: 'Social contract', def: 'The idea that people agree to give up a little total freedom in exchange for protection, order, and shared benefits from their government.' },
            { type: 'text', text: 'You follow traffic laws and give up the "freedom" to drive any way you like — in exchange, the roads are safe enough to use. That trade is the social contract in action.' },
          ]},
          { title: 'No one above the law', blocks: [
            { type: 'concept', term: 'Rule of law', def: 'Everyone — including leaders — must follow the law. No person is above it.' },
            { type: 'example', text: 'A king who can ignore any rule has power WITHOUT rule of law. A president who can be taken to court like anyone else has power UNDER it. That difference shapes whole nations.' },
          ]},
          { title: 'What comes next', blocks: [
            { type: 'callout', text: 'So government keeps order — but who actually does the governing, and how do we stop them from becoming that all-powerful king? That is tomorrow: the three branches.' },
          ]},
        ],
        recap: [
          'Government creates order, protection, and shared services.',
          'The social contract trades a little freedom for safety and benefits.',
          'Rule of law means even leaders must obey the law.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Government mainly exists to:', choices: ['entertain people', 'provide order and shared services', 'make everyone rich', 'win every argument'], answer: 1, hint: 'Think roads, safety, courts.', explain: 'Order and shared services are its core purpose.' },
          { type: 'mc', prompt: 'The rule of law means:', choices: ['there are no laws', 'only kings make laws', 'leaders can ignore laws', 'even leaders must obey the law'], answer: 3, hint: 'Who is above the law?', explain: 'No one is above the law — not even leaders.' },
          { type: 'mc', prompt: 'The social contract idea says people:', choices: ['give up some freedom in exchange for protection', 'give up all their freedom', 'gain freedom with nothing given up', 'sign an actual written contract'], answer: 0, hint: 'Think about why you stop at a red light.', explain: 'You give up the freedom to drive straight through, and get roads where everyone else stops too.' },
          { type: 'mc', prompt: 'Which is a shared service governments provide?', choices: ['your haircut', 'your breakfast', 'roads and schools', 'your video games'], answer: 2, hint: 'Something too big to build alone.', explain: 'Roads and schools are public, shared services.' },
        ],
      },
      {
        id: 'g2', tag: 'Civics', title: 'The Three Branches',
        subtitle: 'Day 2 · Splitting up the power',
        pages: [
          { title: 'Why split power at all', blocks: [
            { type: 'text', text: 'To stop any one person from becoming an all-powerful ruler, the U.S. divides government into three separate branches, each with its own job. No single branch can do everything.' },
            { type: 'visual', kind: 'branches' },
          ]},
          { title: 'Legislative: makes the laws', blocks: [
            { type: 'concept', term: 'Legislative branch', def: 'Congress — made of the House of Representatives and the Senate. Its job: write and pass laws.' },
          ]},
          { title: 'Executive: carries out the laws', blocks: [
            { type: 'concept', term: 'Executive branch', def: 'The President, plus all the agencies and departments. Its job: enforce and carry out the laws Congress passes.' },
          ]},
          { title: 'Judicial: interprets the laws', blocks: [
            { type: 'concept', term: 'Judicial branch', def: 'The courts, topped by the Supreme Court. Its job: decide what laws mean and whether they follow the Constitution.' },
            { type: 'callout', text: 'Make laws, carry out laws, judge laws — three jobs, three branches, on purpose. Tomorrow: how they keep an eye on each other.' },
          ]},
        ],
        recap: [
          'Power is split into three branches so no one controls everything.',
          'Legislative makes laws; Executive carries them out.',
          'Judicial interprets laws and checks them against the Constitution.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Which branch MAKES laws?', choices: ['military', 'legislative', 'executive', 'judicial'], answer: 1, hint: 'Congress lives here.', explain: 'The legislative branch (Congress) makes laws.' },
          { type: 'mc', prompt: 'Which branch CARRIES OUT (enforces) laws?', choices: ['executive', 'judicial', 'local', 'legislative'], answer: 0, hint: 'The President leads it.', explain: 'The executive branch enforces laws.' },
          { type: 'mc', prompt: 'Which branch decides what laws MEAN?', choices: ['all of them', 'legislative', 'executive', 'judicial'], answer: 3, hint: 'The Supreme Court is its top.', explain: 'The judicial branch interprets laws.' },
          { type: 'mc', prompt: 'The President leads which branch?', choices: ['none', 'legislative', 'executive', 'judicial'], answer: 2, hint: 'The one that enforces.', explain: 'The President heads the executive branch.' },
          { type: 'mc', prompt: 'Power is split between three branches mainly in order to:', choices: ['make government faster', 'stop any one part controlling everything', 'save money', 'give each state its own branch'], answer: 1, hint: 'What would the alternative make possible?', explain: 'It is deliberately slower. Slow is the price; no single point of control is what that price buys.' },
        ],
      },
      {
        id: 'g3', tag: 'Civics', title: 'Checks and Balances',
        subtitle: 'Day 3 · Branches watching branches',
        pages: [
          { title: 'Power that limits power', blocks: [
            { type: 'text', text: 'Three branches is step one. Step two: give each branch ways to LIMIT the others, so no branch can run wild. This web of limits is called checks and balances.' },
            { type: 'concept', term: 'Checks and balances', def: 'The powers each branch has to limit the other two, keeping any one of them from becoming too strong.' },
          ]},
          { title: 'The classic example', blocks: [
            { type: 'text', text: 'Congress passes a bill. The President can refuse to sign it — a veto. But Congress can fight back: with enough votes, it can override the veto and pass the law anyway. Push, counter-push.' },
            { type: 'formula', text: 'Congress passes → President vetoes → Congress overrides', label: 'A check meeting a counter-check' },
          ]},
          { title: 'The courts check too', blocks: [
            { type: 'example', text: 'The Supreme Court can rule a law unconstitutional — striking it down even after both other branches approved it. Meanwhile the President nominates judges, and the Senate must approve them. Every branch holds a leash on the others.' },
          ]},
          { title: 'The big idea', blocks: [
            { type: 'callout', text: 'It can feel slow and frustrating — that is by design. The system trades speed for safety, making it very hard for any one person to seize total control.' },
          ]},
        ],
        recap: [
          'Each branch can limit the other two.',
          'A veto checks Congress; an override checks the veto.',
          'Courts can strike down laws; the design favors safety over speed.',
        ],
        quiz: [
          { type: 'mc', prompt: 'A President refusing to sign a bill is called a:', choices: ['law', 'veto', 'override', 'election'], answer: 1, hint: 'It blocks a bill from Congress.', explain: 'That refusal is a veto.' },
          { type: 'mc', prompt: 'Checks and balances exist to:', choices: ['stop any branch from getting too powerful', 'give the President all power', 'end elections', 'speed things up'], answer: 0, hint: 'It is about limiting power.', explain: 'They keep any one branch in check.' },
          { type: 'mc', prompt: 'A presidential veto can be overturned by:', choices: ['nobody — a veto is final', 'a two-thirds vote in both chambers of Congress', 'the Supreme Court on its own', 'a national referendum'], answer: 1, hint: 'A check can meet a counter-check.', explain: 'Congress can override with two-thirds in both chambers — checks and balances running in both directions.' },
          { type: 'mc', prompt: 'The courts can declare a law:', choices: ['unconstitutional', 'permanent forever', 'secret', 'free'], answer: 0, hint: 'They check it against the Constitution.', explain: 'Courts can strike laws down as unconstitutional.' },
        ],
      },
      {
        id: 'g4', tag: 'Civics', title: 'The Constitution & Bill of Rights',
        subtitle: 'Day 4 · The rulebook for the rulebook',
        pages: [
          { title: 'The supreme rulebook', blocks: [
            { type: 'text', text: 'Everything you have learned — the branches, the checks — is written down in one document: the Constitution. It is the supreme law of the land, outranking every other law.' },
            { type: 'concept', term: 'Constitution', def: 'The founding document that sets up the government and stands as the highest law. Any law that conflicts with it loses.' },
          ]},
          { title: 'Protecting the people', blocks: [
            { type: 'concept', term: 'Bill of Rights', def: 'The first ten amendments to the Constitution, listing freedoms the government cannot take away.' },
            { type: 'text', text: 'These include freedom of speech, freedom of religion, freedom of the press, and the right to a fair trial. They are limits ON the government, protecting YOU.' },
          ]},
          { title: 'A document that can grow', blocks: [
            { type: 'concept', term: 'Amendment', def: 'A formal change or addition to the Constitution. There are 27 so far — including ones that ended slavery and gave women the vote.' },
            { type: 'example', text: 'The fact that it can be amended is its genius: the rulebook can improve over time without being thrown out and rewritten from scratch.' },
          ]},
          { title: 'Why it endures', blocks: [
            { type: 'callout', text: 'A firm foundation that can still be improved — that balance is why a 200-year-old document still runs a modern nation.' },
          ]},
        ],
        recap: [
          'The Constitution is the supreme law of the land.',
          'The Bill of Rights is the first 10 amendments, protecting freedoms.',
          'Amendments let the Constitution change over time (27 so far).',
        ],
        quiz: [
          { type: 'mc', prompt: 'The Constitution is:', choices: ['a branch of government', 'a kind of election', 'the supreme law of the land', 'a type of tax'], answer: 2, hint: 'It outranks all other laws.', explain: 'It is the highest law in the country.' },
          { type: 'numeric', prompt: 'How many amendments make up the Bill of Rights?', answer: 10, hint: 'The FIRST ten amendments.', explain: 'The Bill of Rights is the first 10 amendments.' },
          { type: 'mc', prompt: 'Freedom of speech is protected by the:', choices: ['state flag', 'Bill of Rights', 'President alone', 'tax code'], answer: 1, hint: 'It is one of the first ten amendments.', explain: 'The Bill of Rights protects it.' },
          { type: 'mc', prompt: 'The Constitution is changed by:', choices: ['amendment', 'presidential order', 'a Supreme Court ruling', 'a simple majority in the House'], answer: 0, hint: 'There have been 27 of them in total.', explain: 'Amendments — and deliberately hard ones to pass, which is why there are only 27 in over two centuries.' },
        ],
      },
      {
        id: 'g5', tag: 'Civics', title: 'How a Bill Becomes a Law',
        subtitle: 'Day 5 · A step-by-step process',
        pages: [
          { title: 'It starts as an idea', blocks: [
            { type: 'text', text: 'Every law begins as a proposal called a bill. Anyone can suggest the idea, but a member of Congress must formally introduce it to start the journey.' },
            { type: 'concept', term: 'Bill', def: 'A proposed law, not yet passed. It must survive several steps to become real law.' },
          ]},
          { title: 'Debate and votes', blocks: [
            { type: 'text', text: 'The bill goes to a committee that studies and revises it. Then it must be debated and PASSED by both the House and the Senate. If either chamber rejects it, the bill stops.' },
            { type: 'formula', text: 'Introduced → Committee → House vote → Senate vote → President', label: 'The path a bill must travel' },
          ]},
          { title: 'The final step', blocks: [
            { type: 'text', text: 'If both chambers pass it, the bill reaches the President, who can sign it into law — or veto it. And if vetoed? You already know: Congress can override with enough votes (Day 3 in action).' },
          ]},
          { title: 'It is an algorithm', blocks: [
            { type: 'callout', text: 'Notice this is a precise, ordered list of steps with a decision point — exactly what the Computer Science lane calls an algorithm. Government runs on them too.' },
          ]},
        ],
        recap: [
          'A bill is a proposed law; a member of Congress introduces it.',
          'It must pass committee, then both the House and Senate.',
          'The President signs or vetoes; Congress can override a veto.',
        ],
        quiz: [
          { type: 'mc', prompt: 'A proposed law is called a:', choices: ['veto', 'branch', 'court', 'bill'], answer: 3, hint: 'It is not a law yet.', explain: 'A proposed law is a bill.' },
          { type: 'mc', prompt: 'Before a bill can become law it must pass:', choices: ['the House only', 'the Senate only', 'both the House and the Senate', 'the Supreme Court'], answer: 2, hint: 'Congress has two chambers.', explain: 'Both chambers, and then the President signs — or Congress overrides a veto.' },
          { type: 'mc', prompt: 'After Congress passes a bill, it goes to the:', choices: ['voters directly', 'state governor', 'President', 'Supreme Court'], answer: 2, hint: 'The executive branch signs laws.', explain: 'The President signs or vetoes it.' },
          { type: 'mc', prompt: 'If the President vetoes a bill, Congress can:', choices: ['do nothing ever', 'go to jail', 'restart the country', 'override it with enough votes'], answer: 3, hint: 'A check meeting a counter-check.', explain: 'Congress can override the veto.' },
        ],
      },
      {
        id: 'g6', tag: 'Civics', title: 'Levels of Government & Voting',
        subtitle: 'Day 6 · Your voice in the system',
        pages: [
          { title: 'Power shared by level', blocks: [
            { type: 'text', text: 'Government is not just one building in a capital. Power is split between national, state, and local levels — a system called federalism.' },
            { type: 'concept', term: 'Federalism', def: 'Sharing power between a national (federal) government and smaller state and local governments.' },
          ]},
          { title: 'Who does what', blocks: [
            { type: 'example', text: 'The federal government handles national defense and printing money. Your state issues driver’s licenses and runs highways. Your local government picks up trash and runs your school. Different jobs, different levels.' },
          ]},
          { title: 'How the people choose', blocks: [
            { type: 'concept', term: 'Democracy', def: 'A system where the people choose their leaders and influence decisions, mainly by voting.' },
            { type: 'text', text: 'Voting is the social contract come full circle: the people who agree to be governed get to choose WHO governs and HOW. It is the single most direct power a citizen holds.' },
          ]},
          { title: 'Bringing it together', blocks: [
            { type: 'callout', text: 'Order, branches, checks, a Constitution, and a vote in your hand — you now understand the machine, and your place inside it. That is real civic literacy.' },
          ]},
        ],
        recap: [
          'Federalism shares power across federal, state, and local levels.',
          'Each level handles different jobs (defense vs. licenses vs. trash).',
          'In a democracy, voting is how citizens choose their leaders.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Sharing power between national and state governments is called:', choices: ['an amendment', 'federalism', 'a veto', 'a monarchy'], answer: 1, hint: 'Power split by level.', explain: 'That sharing is federalism.' },
          { type: 'mc', prompt: 'Local government usually handles:', choices: ['trash and schools', 'printing money', 'foreign treaties', 'national defense'], answer: 0, hint: 'Think of your neighborhood.', explain: 'Local governments run trash, schools, and similar services.' },
          { type: 'mc', prompt: 'The most direct way a citizen decides who holds power is:', choices: ['voting', 'paying taxes', 'jury service', 'writing to a newspaper'], answer: 0, hint: 'Your most direct civic power.', explain: 'Voting. The others matter, but only one of them actually chooses who takes the office.' },
          { type: 'mc', prompt: 'A government where the people choose leaders is a:', choices: ['dictatorship', 'committee', 'democracy', 'monarchy'], answer: 2, hint: 'Power flows from the people.', explain: 'That is a democracy.' },
        ],
      },
    ],
  },
  biz: {
    name: 'Business & Money', icon: TrendingUp, accent: '#34d399',
    blurb: 'How value, prices, and profit really work.',
    days: [
      {
        id: 'b1', tag: 'Economics', title: 'Needs, Wants & Scarcity',
        subtitle: 'Day 1 · The problem at the heart of money',
        pages: [
          { title: 'You cannot have it all', blocks: [
            { type: 'text', text: 'There is exactly one reason money and business exist: the world has limited resources but people have unlimited wants. That mismatch has a name.' },
            { type: 'concept', term: 'Scarcity', def: 'Limited resources cannot satisfy unlimited wants. This is the core problem of all economics.' },
          ]},
          { title: 'Needs versus wants', blocks: [
            { type: 'text', text: 'A need is something you must have to live — food, water, shelter. A want is something you would LIKE — a new game, designer shoes. Scarcity forces you to prioritize needs and choose carefully among wants.' },
          ]},
          { title: 'Every choice has a cost', blocks: [
            { type: 'concept', term: 'Opportunity cost', def: 'What you give up when you choose one thing over another. The "hidden price" of any decision.' },
            { type: 'example', text: 'You have $10 and want both a $10 book and a $10 game. Buy the book, and its true cost is the game you DIDN’T get. Every choice quietly closes a door.' },
          ]},
          { title: 'Why this matters', blocks: [
            { type: 'callout', text: 'Businesses, governments, and you make the same move all day: limited resources, competing wants, pick wisely. Understand scarcity and the rest of economics clicks into place.' },
          ]},
        ],
        recap: [
          'Scarcity: limited resources, unlimited wants — the core economic problem.',
          'Needs are required to live; wants are extras.',
          'Opportunity cost is what you give up by choosing something else.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Scarcity means:', choices: ['everything is free', 'too much of everything', 'no one wants anything', 'limited resources but unlimited wants'], answer: 3, hint: 'It is a mismatch.', explain: 'Limited resources, unlimited wants.' },
          { type: 'mc', prompt: 'You pick a game over a book. The book is your:', choices: ['opportunity cost', 'profit', 'need', 'scarcity'], answer: 0, hint: 'What you gave up.', explain: 'The unchosen option is the opportunity cost.' },
          { type: 'mc', prompt: 'Which of these is a NEED?', choices: ['a vacation', 'food and water', 'a new video game', 'designer shoes'], answer: 1, hint: 'Required to live.', explain: 'Food and water are needs.' },
          { type: 'mc', prompt: 'Scarcity means:', choices: ['some things are expensive', 'wants exceed what is available, so choices must be made', 'there is not enough money in circulation', 'only poorer countries face shortages'], answer: 1, hint: 'It is about wants against resources, not about money.', explain: 'Unlimited wants, limited resources. Every choice therefore gives up something else — that is the core economic problem.' },
        ],
      },
      {
        id: 'b2', tag: 'Economics', title: 'Supply and Demand',
        subtitle: 'Day 2 · What sets a price',
        pages: [
          { title: 'Two forces, one price', blocks: [
            { type: 'text', text: 'Why does anything cost what it costs? Two opposing forces decide: how much buyers want it (demand) and how much sellers offer (supply). Price is where they meet.' },
            { type: 'visual', kind: 'supplydemand' },
          ]},
          { title: 'The demand rule', blocks: [
            { type: 'concept', term: 'Demand', def: 'How much buyers want at each possible price. Drop the price and the quantity people will buy goes up — bargains attract crowds.' },
          ]},
          { title: 'The supply rule', blocks: [
            { type: 'concept', term: 'Supply', def: 'How much sellers will offer at each possible price. Raise the price and the quantity they will produce goes up — profit attracts sellers.' },
            { type: 'text', text: 'The price where supply exactly matches demand is the equilibrium — the natural resting point where the market is balanced.' },
          ]},
          { title: 'When it is off balance', blocks: [
            { type: 'example', text: 'Price a concert too low and everyone wants in — tickets vanish (a shortage). Price it too high and seats sit empty (a surplus). The market constantly nudges price toward the balance point.' },
            { type: 'callout', text: 'Two crossing lines on a graph — exactly like the systems of equations in your Math lane. The crossing point IS the price.' },
          ]},
        ],
        recap: [
          'Demand: buyers want more when price is lower.',
          'Supply: sellers offer more when price is higher.',
          'Equilibrium is where supply meets demand — the natural price.',
        ],
        quiz: [
          { type: 'mc', prompt: 'When the price drops, demand usually:', choices: ['falls', 'disappears', 'stays frozen', 'rises'], answer: 3, hint: 'Bargains attract buyers.', explain: 'Lower price, more of it bought.' },
          { type: 'mc', prompt: 'The price where supply meets demand is the:', choices: ['surplus', 'equilibrium price', 'opportunity cost', 'profit'], answer: 1, hint: 'The balance point.', explain: 'That is the equilibrium price.' },
          { type: 'mc', prompt: 'When the price of something rises, sellers usually:', choices: ['supply less of it', 'supply more of it', 'supply exactly the same amount', 'stop selling it'], answer: 1, hint: 'Profit attracts sellers.', explain: 'Higher prices make producing more worth doing, so supply rises. Demand is the one that falls — mixing the two up is the usual error.' },
          { type: 'mc', prompt: 'Too few goods for too many buyers is a:', choices: ['shortage', 'surplus', 'profit', 'tax'], answer: 0, hint: 'Demand outruns supply.', explain: 'That is a shortage.' },
          { type: 'mc', prompt: 'Lots of unsold leftover goods is a:', choices: ['need', 'bit', 'surplus', 'shortage'], answer: 2, hint: 'Supply outruns demand.', explain: 'That is a surplus.' },
        ],
      },
      {
        id: 'b3', tag: 'Business', title: 'Profit: Revenue minus Cost',
        subtitle: 'Day 3 · The number every business watches',
        pages: [
          { title: 'Money in, money out', blocks: [
            { type: 'text', text: 'A business takes in money and spends money. The money coming in from sales is revenue; the money spent to operate is cost. The gap between them is everything.' },
            { type: 'formula', text: 'profit = revenue − cost', label: 'The most important formula in business' },
          ]},
          { title: 'A lemonade stand', blocks: [
            { type: 'example', text: 'You sell 10 cups at $2 each: revenue = 10 × $2 = $20. Lemons, sugar, and cups cost you $8. Profit = $20 − $8 = $12. That $12 is what the business actually earned.' },
          ]},
          { title: 'The break-even line', blocks: [
            { type: 'concept', term: 'Break-even', def: 'The point where revenue exactly equals cost, so profit is zero. Below it you lose money; above it you earn.' },
            { type: 'text', text: 'Smart owners always know their break-even number — it is the finish line they must cross before a single dollar of profit appears.' },
          ]},
          { title: 'It is just algebra', blocks: [
            { type: 'callout', text: 'profit = revenue − cost is an algebraic expression, exactly like the ones you simplified in Math. Business is your equations doing a job in the real world.' },
          ]},
        ],
        recap: [
          'Revenue is money in; cost is money out.',
          'profit = revenue − cost.',
          'Break-even is where revenue equals cost and profit is zero.',
        ],
        quiz: [
          { type: 'numeric', prompt: 'Revenue is $20 and cost is $8. What is the profit, in dollars?', answer: 12, hint: 'Subtract cost from revenue.', explain: '20 − 8 = 12.' },
          { type: 'mc', prompt: 'Profit equals revenue minus:', choices: ['taxes only', 'supply', 'cost', 'demand'], answer: 2, hint: 'Money out.', explain: 'Profit = revenue − cost.' },
          { type: 'numeric', prompt: 'You earn $50 and spend $50. What is your profit, in dollars?', answer: 0, hint: 'Revenue equals cost here.', explain: 'That is break-even: profit 0.' },
          { type: 'mc', prompt: 'When revenue exactly equals cost, you are at:', choices: ['huge profit', 'a shortage', 'a surplus', 'break-even'], answer: 3, hint: 'Profit is zero.', explain: 'Revenue = cost is break-even.' },
          { type: 'numeric', prompt: 'You sell 5 items at $4 each. What is your revenue, in dollars?', answer: 20, hint: 'Multiply price by quantity.', explain: '5 × 4 = 20.' },
        ],
      },
      {
        id: 'b4', tag: 'Business', title: 'Starting a Business',
        subtitle: 'Day 4 · Turning an idea into value',
        pages: [
          { title: 'Solve a real problem', blocks: [
            { type: 'text', text: 'Every successful business starts by solving a problem for someone. The clearer the problem you fix, the more people will pay you to fix it.' },
            { type: 'concept', term: 'Value proposition', def: 'The specific problem your business solves, and why customers should choose YOU to solve it.' },
          ]},
          { title: 'Know your customer', blocks: [
            { type: 'text', text: 'You cannot sell to "everyone." Picture the real person with the problem: their age, their budget, what they care about. The better you know your customer, the better you can serve them.' },
          ]},
          { title: 'Price it to last', blocks: [
            { type: 'example', text: 'A dog-walking business: the value is busy owners get their dogs exercised. Customers are nearby pet owners. Price per walk must cover your costs (time, supplies) AND leave profit — straight from Day 3.' },
          ]},
          { title: 'The whole loop', blocks: [
            { type: 'callout', text: 'Problem → customer → price that earns profit. Nail those three and you have the skeleton of any real business, from a lemonade stand to a tech company.' },
          ]},
        ],
        recap: [
          'A business solves a real problem — its value proposition.',
          'Knowing your specific customer makes you far more effective.',
          'Pricing must cover costs and leave profit.',
        ],
        quiz: [
          { type: 'mc', prompt: 'A value proposition is:', choices: ['a loop', 'the problem your business solves for customers', 'your total revenue', 'a kind of tax'], answer: 1, hint: 'Why customers need you.', explain: 'It is the problem you solve.' },
          { type: 'mc', prompt: 'Your price should at least cover your:', choices: ['costs', 'wishes', 'competitors’ dreams', 'homework'], answer: 0, hint: 'Remember profit = revenue − cost.', explain: 'Price must cover costs.' },
          { type: 'mc', prompt: 'Naming one specific customer helps mainly because:', choices: ['it makes your market bigger', 'you can make and say something that fits them exactly', 'it lowers your costs', 'investors insist on it'], answer: 1, hint: 'Imagine writing one advert that must work on everyone alive.', explain: 'A specific person lets you make specific choices. “Everyone” gives you nothing at all to aim at.' },
          { type: 'mc', prompt: 'Profit comes from charging more than your:', choices: ['address', 'costs', 'friends', 'age'], answer: 1, hint: 'The gap above cost.', explain: 'Profit lives above your costs.' },
        ],
      },
      {
        id: 'b5', tag: 'Money', title: 'Saving, Interest & Investing',
        subtitle: 'Day 5 · Making money grow',
        pages: [
          { title: 'Why save at all', blocks: [
            { type: 'text', text: 'Saving means setting money aside instead of spending it. The reward: banks pay you a little extra, called interest, just for keeping your money there.' },
            { type: 'concept', term: 'Interest', def: 'Money paid for the use of money — usually a percent of the amount saved or borrowed.' },
          ]},
          { title: 'Simple interest', blocks: [
            { type: 'text', text: 'The straightforward kind: a percent of your original amount, each year. Save $100 at 10% per year and you earn $10 annually. (That percent skill is straight from Math Day 2.)' },
            { type: 'formula', text: '10% of $100 = $10 per year', label: 'Simple interest: percent of the original' },
          ]},
          { title: 'Compound interest: the magic', blocks: [
            { type: 'concept', term: 'Compound interest', def: 'Interest paid on your interest, not just the original. It snowballs — growing faster and faster over time.' },
            { type: 'example', text: '$100 at 10%: year 1 → $110. Year 2 earns 10% of $110 = $121, not $120. The extra dollar is interest ON interest. Over many years this becomes explosive, exponential growth — your Math Day 7 exponents at work.' },
          ]},
          { title: 'Investing and risk', blocks: [
            { type: 'callout', text: 'Investing puts money into things that might grow more than a bank — but can also shrink. Higher possible reward usually means higher risk. Start saving early, and compound interest does the heavy lifting.' },
          ]},
        ],
        recap: [
          'Interest is money paid for using money — a percent of the amount.',
          'Simple interest is a percent of the original each year.',
          'Compound interest earns interest on interest — exponential growth.',
        ],
        quiz: [
          { type: 'numeric', prompt: 'What is the interest on $100 at 10% for one year, in dollars?', answer: 10, hint: '10% of 100.', explain: '0.10 × 100 = 10.' },
          { type: 'mc', prompt: 'Interest is usually:', choices: ['a random number', 'a kind of tax', 'a percent of the amount', 'always exactly $5'], answer: 2, hint: 'Tied to percents.', explain: 'It is a percent of the amount.' },
          { type: 'mc', prompt: 'Interest earned ON past interest is called:', choices: ['compound interest', 'simple interest', 'opportunity cost', 'a surplus'], answer: 0, hint: 'It snowballs.', explain: 'That is compound interest.' },
          { type: 'mc', prompt: 'Over many years, compound interest compared with simple interest:', choices: ['grows more slowly', 'grows at the same rate', 'grows faster', 'only differs for very large amounts'], answer: 2, hint: 'Interest earning interest snowballs.', explain: 'Compound pays interest on the interest already earned, so the gap between them widens every single year.' },
          { type: 'numeric', prompt: '$100 grows at 10% for one year. What is the total, in dollars?', answer: 110, hint: 'Original plus the interest.', explain: '100 + 10 = 110.' },
        ],
      },
      {
        id: 'b6', tag: 'Business', title: 'Marketing & Competition',
        subtitle: 'Day 6 · Standing out and winning customers',
        pages: [
          { title: 'Telling your story', blocks: [
            { type: 'text', text: 'A great product no one knows about sells nothing. Marketing is how a business communicates its value to customers — turning "we exist" into "you need this."' },
            { type: 'concept', term: 'Marketing', def: 'Everything a business does to make customers aware of its value and want to buy.' },
          ]},
          { title: 'You are not alone', blocks: [
            { type: 'concept', term: 'Competition', def: 'Other businesses trying to win the same customers. It pushes everyone to get better, cheaper, or more creative.' },
            { type: 'text', text: 'To win, you differentiate — give customers a clear reason to pick you: better quality, lower price, friendlier service, or something no one else offers.' },
          ]},
          { title: 'Scarcity sells', blocks: [
            { type: 'example', text: 'Remember supply and demand? "Limited edition — only 100 made" deliberately creates scarcity, pushing demand and price up. Marketing and economics working together.' },
          ]},
          { title: 'The full picture', blocks: [
            { type: 'callout', text: 'Scarcity, supply and demand, profit, customers, and marketing — you now hold the core toolkit of business. The same logic runs a bake sale and a global company.' },
          ]},
        ],
        recap: [
          'Marketing communicates a business’s value to customers.',
          'Competition pushes businesses to improve; differentiation wins.',
          'Scarcity (limited editions) can raise demand and price.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Marketing is mainly about:', choices: ['hiding your product', 'raising your costs', 'avoiding customers', 'communicating value to customers'], answer: 3, hint: 'Make people aware and interested.', explain: 'It communicates value.' },
          { type: 'mc', prompt: 'Standing out from competitors is called:', choices: ['break-even', 'storage', 'differentiation', 'scarcity'], answer: 2, hint: 'Give a reason to pick you.', explain: 'That is differentiation.' },
          { type: 'mc', prompt: 'Competition tends to push businesses to:', choices: ['improve, or lose customers', 'raise prices freely', 'stop innovating', 'merge immediately'], answer: 0, hint: 'What happens if a rival is both better and cheaper?', explain: 'If someone else is better, customers move. That pressure is what drives the improving.' },
          { type: 'mc', prompt: 'A "limited edition" item can charge more due to:', choices: ['higher costs only', 'lower demand', 'taxes', 'scarcity'], answer: 3, hint: 'Fewer made, more wanted.', explain: 'Scarcity raises demand and price.' },
        ],
      },
      {
        id: 'b7', tag: 'Entrepreneurship', title: 'Finding a Business Idea',
        subtitle: 'Day 7 · Spotting problems worth solving',
        pages: [
          { title: 'Ideas hide inside annoyances', blocks: [
            { type: 'text', text: 'Day 4 taught you that a business solves a problem. But where do the ideas come from? Almost always from noticing something that is broken, slow, missing, or irritating — and refusing to just live with it.' },
            { type: 'concept', term: 'Market gap', def: 'A need that customers have which no one is serving well yet. Gaps are where new businesses are born.' },
          ]},
          { title: 'Train your noticing', blocks: [
            { type: 'text', text: 'Entrepreneurs keep a running list of complaints — their own and other people’s. "This line is always too long." "I can never find one of these when I need it." Every complaint is a candidate.' },
            { type: 'example', text: 'Someone noticed people hated waiting for a table without knowing how long it would be. That annoyance became the buzzer restaurants hand you — and then the app that texts you. A small irritation, a real business.' },
          ]},
          { title: 'Test it before you build it', blocks: [
            { type: 'text', text: 'A good idea survives three questions: Is the problem real? Do enough people have it? Would they actually pay to fix it? An idea that fails the third question is a hobby, not a business.' },
            { type: 'formula', text: 'real problem + enough people + willing to pay', label: 'All three, or it is not a business yet' },
          ]},
          { title: 'Why start here', blocks: [
            { type: 'callout', text: 'Most failed businesses build something nobody asked for. Starting from a real, felt problem is the single biggest advantage an entrepreneur can give themselves.' },
          ]},
        ],
        recap: [
          'Business ideas come from noticing real problems and annoyances.',
          'A market gap is an unmet need no one serves well.',
          'A real idea needs a real problem, enough people, and willingness to pay.',
        ],
        quiz: [
          { type: 'mc', prompt: 'A market gap is:', choices: ['a tax', 'an unmet need no one serves well', 'a type of loan', 'a store closing time'], answer: 1, hint: 'It is an opening in the market.', explain: 'It is a need nobody is serving well yet.' },
          { type: 'mc', prompt: 'Business ideas most often start from:', choices: ['noticing a real problem', 'guessing randomly', 'copying homework', 'picking a logo'], answer: 0, hint: 'Think about annoyances.', explain: 'Real problems spark real businesses.' },
          { type: 'mc', prompt: 'Which question separates a business from a hobby?', choices: ['Is it new?', 'Would people pay to fix it?', 'Is it fun?', 'Is it colorful?'], answer: 1, hint: 'Money must actually change hands.', explain: 'Willingness to pay makes it a business.' },
          { type: 'mc', prompt: 'Testing a small version of an idea first mainly saves you:', choices: ['nothing — it just delays the launch', 'the cost of building the wrong thing', 'the need to find customers', 'the need for any plan'], answer: 1, hint: 'Cheaper to learn early.', explain: 'Finding out it is wrong after a week costs a week. Finding out after a year costs a year.' },
        ],
      },
      {
        id: 'b8', tag: 'Entrepreneurship', title: 'Knowing Your Customer',
        subtitle: 'Day 8 · Research beats guessing',
        pages: [
          { title: 'Everyone is nobody', blocks: [
            { type: 'text', text: 'Day 4 warned you that you cannot sell to "everyone." The fix is to define a target market — a specific group whose problem you understand better than anyone.' },
            { type: 'concept', term: 'Target market', def: 'The specific group of people a business aims to serve, defined by things like age, location, budget, and needs.' },
          ]},
          { title: 'Go and ask', blocks: [
            { type: 'concept', term: 'Market research', def: 'Gathering real information about customers — through surveys, interviews, and observation — instead of assuming you already know.' },
            { type: 'text', text: 'The most valuable question an entrepreneur can ask is simply: "Tell me about the last time you had this problem." Real stories beat opinions.' },
          ]},
          { title: 'Reading the numbers', blocks: [
            { type: 'example', text: 'You survey 40 classmates and 30 say they would buy a $3 snack pack. That is 30 out of 40 — a ratio of 3 to 4, or 75%. Your Math lane just became market research.' },
          ]},
          { title: 'Why it pays off', blocks: [
            { type: 'callout', text: 'Research turns a guess into evidence. Every hour spent understanding customers saves ten hours building the wrong thing.' },
          ]},
        ],
        recap: [
          'A target market is the specific group you serve.',
          'Market research gathers real data through surveys and interviews.',
          'Survey results are ratios and percents — math you already know.',
        ],
        quiz: [
          { type: 'mc', prompt: 'A target market is:', choices: ['your total profit', 'a store shelf', 'the specific group you aim to serve', 'everyone alive'], answer: 2, hint: 'Specific beats broad.', explain: 'It is your specific customer group.' },
          { type: 'numeric', prompt: '30 out of 40 people surveyed would buy. What percent is that?', answer: 75, hint: 'Divide 30 by 40, then multiply by 100.', explain: '30 ÷ 40 = 0.75 = 75%.' },
          { type: 'mc', prompt: 'Market research means:', choices: ['guessing what people want', 'raising prices', 'hiring friends', 'gathering real customer information'], answer: 3, hint: 'Evidence, not assumption.', explain: 'It gathers real information.' },
          { type: 'mc', prompt: 'Aiming a product at “everyone” usually:', choices: ['works better than targeting a group', 'makes it hard to say anything specific enough to land', 'lowers your costs', 'guarantees a bigger market'], answer: 1, hint: 'Everyone is not a customer.', explain: 'You end up describing it so vaguely that no particular person feels it was made for them.' },
        ],
      },
      {
        id: 'b9', tag: 'Marketing', title: 'Building a Brand',
        subtitle: 'Day 9 · What people feel when they hear your name',
        pages: [
          { title: 'More than a logo', blocks: [
            { type: 'text', text: 'A brand is not just a logo or a color. It is the promise people expect you to keep — the feeling that shows up when they hear your name.' },
            { type: 'concept', term: 'Brand', def: 'The identity and reputation of a business — its name, look, voice, and above all the promise it consistently keeps.' },
          ]},
          { title: 'Saying what you are', blocks: [
            { type: 'concept', term: 'Positioning', def: 'The short, clear statement of who you serve and why you are different. It answers: why pick us instead of them?' },
            { type: 'text', text: 'Day 6 called this differentiation. Positioning is how you put it into words customers instantly understand.' },
          ]},
          { title: 'Consistency is the whole trick', blocks: [
            { type: 'example', text: 'If your dog-walking business promises "always on time," then being late once damages the brand more than a bad logo ever could. A brand is built by keeping the same promise over and over.' },
          ]},
          { title: 'Why brands are valuable', blocks: [
            { type: 'callout', text: 'A trusted brand lets a business charge more and win customers faster, because trust removes risk for the buyer. That trust is earned slowly and lost quickly.' },
          ]},
        ],
        recap: [
          'A brand is the promise and reputation behind a business.',
          'Positioning states who you serve and why you are different.',
          'Consistency builds trust; broken promises destroy it.',
        ],
        quiz: [
          { type: 'mc', prompt: 'A brand is mostly:', choices: ['the promise and reputation you keep', 'only a logo', 'your bank balance', 'a kind of tax'], answer: 0, hint: 'It lives in customers’ minds.', explain: 'It is the promise and reputation.' },
          { type: 'mc', prompt: 'Positioning answers:', choices: ['why pick us instead of them', 'how much cash we have', 'who our landlord is', 'what day it is'], answer: 0, hint: 'It is differentiation in words.', explain: 'It states who you serve and why you are different.' },
          { type: 'mc', prompt: 'A brand is built mainly by:', choices: ['a good logo', 'keeping the same promise every time', 'how much is spent on advertising', 'a clever name'], answer: 1, hint: 'Trust comes from repetition.', explain: 'A brand is a promise people have learned they can rely on. The logo is only how they recognise it.' },
          { type: 'mc', prompt: 'A trusted brand can usually:', choices: ['ignore its customers', 'skip making profit', 'avoid all competition', 'charge more and win customers faster'], answer: 3, hint: 'Trust reduces buyer risk.', explain: 'Trust lets a brand charge more.' },
        ],
      },
      {
        id: 'b10', tag: 'Marketing', title: 'Pricing Strategy',
        subtitle: 'Day 10 · The most powerful lever you have',
        pages: [
          { title: 'Price is a decision, not a fact', blocks: [
            { type: 'text', text: 'Day 3 said profit = revenue − cost. Price sits right at the center of that equation, which makes it the fastest lever a business can pull — and the easiest to get wrong.' },
          ]},
          { title: 'Three ways to price', blocks: [
            { type: 'concept', term: 'Cost-plus pricing', def: 'Add a markup on top of what it costs you. Simple and safe, but ignores what customers would happily pay.' },
            { type: 'concept', term: 'Value-based pricing', def: 'Charge based on how much the solution is worth to the customer. Often much higher — and fairer to both sides.' },
          ]},
          { title: 'Doing the markup math', blocks: [
            { type: 'example', text: 'A bracelet costs you $4 in materials. A 50% markup means adding half of $4, so you charge $6. Your profit is $2 per bracelet. Percent skills from Math Day 2 doing real work.' },
            { type: 'formula', text: 'price = cost + (markup % × cost)', label: 'Cost-plus pricing in one line' },
          ]},
          { title: 'The competitor check', blocks: [
            { type: 'text', text: 'Whatever method you use, glance sideways. Price far above rivals and you must justify it with clear extra value. Price far below and customers may assume something is wrong.' },
            { type: 'callout', text: 'Remember supply and demand: price too low and you sell out with no profit; too high and you sit on unsold stock. Pricing is that graph in action.' },
          ]},
        ],
        recap: [
          'Cost-plus pricing adds a markup to your costs.',
          'Value-based pricing charges what the solution is worth to customers.',
          'Compare to competitors — far above or below needs a reason.',
        ],
        quiz: [
          { type: 'numeric', prompt: 'A bracelet costs $4 to make. With a 50% markup, what is the price in dollars?', answer: 6, hint: 'Add half of $4 to $4.', explain: '4 + 2 = 6.' },
          { type: 'mc', prompt: 'Charging based on what the solution is worth to the buyer is:', choices: ['break-even', 'a surplus', 'value-based pricing', 'cost-plus pricing'], answer: 2, hint: 'It looks at the customer, not the cost.', explain: 'That is value-based pricing.' },
          { type: 'numeric', prompt: 'Cost is $10 and you use a 20% markup. What is the price in dollars?', answer: 12, hint: '20% of 10 is 2.', explain: '10 + 2 = 12.' },
          { type: 'mc', prompt: 'Pricing far below competitors can make customers think:', choices: ['it is heavy', 'something is wrong with it', 'it must be luxury', 'it is illegal'], answer: 1, hint: 'Very cheap can signal low quality.', explain: 'Suspiciously low prices raise doubts.' },
        ],
      },
      {
        id: 'b11', tag: 'Marketing', title: 'Reaching People',
        subtitle: 'Day 11 · Getting the word out',
        pages: [
          { title: 'From awareness to purchase', blocks: [
            { type: 'text', text: 'People rarely buy the first second they hear of you. They move through stages: first they become aware, then interested, then they decide, then they buy. Marketers picture this as a funnel — wide at the top, narrow at the bottom.' },
            { type: 'visual', kind: 'funnel' },
          ]},
          { title: 'Choosing your channels', blocks: [
            { type: 'concept', term: 'Marketing channel', def: 'A path you use to reach customers — social media, flyers, email, events, or plain word of mouth.' },
            { type: 'text', text: 'The right channel is wherever your target market already spends time. Advertising to the wrong crowd is money set on fire, no matter how clever the ad is.' },
          ]},
          { title: 'The strongest channel is free', blocks: [
            { type: 'example', text: 'Word of mouth beats almost every paid ad, because people trust friends more than advertisements. The way to earn it is unglamorous: be genuinely good, consistently. Your brand promise from Day 9 is the engine.' },
          ]},
          { title: 'Measure, then adjust', blocks: [
            { type: 'callout', text: 'Smart marketers track which channel actually brought each customer, then spend more where it works. Guessing is expensive; measuring is cheap.' },
          ]},
        ],
        recap: [
          'Customers move through a funnel: aware → interested → decide → buy.',
          'Channels are the paths you use to reach your target market.',
          'Word of mouth is powerful and free, earned by being consistently good.',
        ],
        quiz: [
          { type: 'mc', prompt: 'The marketing funnel describes:', choices: ['stages from awareness to purchase', 'how to bake a cake', 'the profit formula', 'a rock layer'], answer: 0, hint: 'Wide at the top, narrow at the bottom.', explain: 'It maps awareness through to buying.' },
          { type: 'mc', prompt: 'The best marketing channel is usually:', choices: ['the loudest one', 'always television', 'wherever your target market already is', 'the most expensive one'], answer: 2, hint: 'Go where they already spend time.', explain: 'Meet customers where they already are.' },
          { type: 'mc', prompt: 'Word of mouth works mainly because:', choices: ['it costs nothing', 'people trust a friend more than an advert', 'it reaches more people', 'it travels faster'], answer: 1, hint: 'Trust is the reason, not the price.', explain: 'A friend has nothing to sell you. That is exactly what makes their recommendation worth more than an advert.' },
          { type: 'mc', prompt: 'Smart marketers decide where to spend by:', choices: ['flipping a coin', 'spending equally everywhere', 'never advertising', 'measuring which channel brings customers'], answer: 3, hint: 'Track the results.', explain: 'Measure, then invest where it works.' },
        ],
      },
      {
        id: 'b12', tag: 'Entrepreneurship', title: 'The Pitch & The Plan',
        subtitle: 'Day 12 · Making people believe',
        pages: [
          { title: 'Sixty seconds to be understood', blocks: [
            { type: 'text', text: 'Sooner or later you must explain your business fast — to a customer, a teacher, a parent, an investor. That short explanation is the elevator pitch, named for the length of an elevator ride.' },
            { type: 'concept', term: 'Elevator pitch', def: 'A clear, under-a-minute explanation of what problem you solve, who you solve it for, and why you are the one to do it.' },
          ]},
          { title: 'The written version', blocks: [
            { type: 'concept', term: 'Business plan', def: 'A document laying out the idea, the target market, the competition, the costs and prices, and how the business expects to make a profit.' },
            { type: 'text', text: 'Notice that every section is something you already learned: problem, customer, competition, pricing, profit. The plan is just your whole lane written down in order.' },
          ]},
          { title: 'Numbers make it real', blocks: [
            { type: 'example', text: 'A weak pitch says "people will love it." A strong one says "I surveyed 40 classmates and 30 said they would pay $3 — at a $1 cost, that is $60 of profit." Evidence and arithmetic turn a hope into a case.' },
          ]},
          { title: 'You have the full toolkit', blocks: [
            { type: 'text', text: 'Scarcity, supply and demand, profit, customers, branding, pricing, channels, and the pitch. That is genuinely the arc of building a business from nothing.' },
            { type: 'callout', text: 'Twelve days ago you learned why we have to choose at all. Now you could stand up and make the case for a business of your own — with evidence behind it.' },
          ]},
        ],
        recap: [
          'An elevator pitch explains the problem, the customer, and why you, in under a minute.',
          'A business plan writes out idea, market, competition, pricing, and profit.',
          'Real numbers turn a hopeful idea into a convincing case.',
        ],
        quiz: [
          { type: 'mc', prompt: 'An elevator pitch is:', choices: ['a price tag', 'a short clear explanation of your business', 'a long report', 'a type of loan'], answer: 1, hint: 'It fits in an elevator ride.', explain: 'It is a fast, clear explanation.' },
          { type: 'mc', prompt: 'Which belongs in a business plan?', choices: ['your favorite color', 'the weather', 'your bedtime', 'costs, pricing, and expected profit'], answer: 3, hint: 'It covers how money works.', explain: 'Costs, pricing, and profit are core sections.' },
          { type: 'numeric', prompt: '30 customers pay $3 each. Cost is $1 each. What is the total profit, in dollars?', answer: 60, hint: 'Profit per item is $2.', explain: '30 × 2 = 60.' },
          { type: 'mc', prompt: 'A pitch is stronger when it:', choices: ['avoids numbers so it sounds bigger', 'uses specific numbers you can back up', 'uses mostly adjectives', 'runs as long as possible'], answer: 1, hint: 'Evidence beats hope.', explain: 'Specific, checkable numbers are what separate a plan from a wish.' },
          { type: 'mc', prompt: 'A business plan is mostly built from:', choices: ['random guesses', 'song lyrics', 'things you already studied: market, pricing, profit', 'secret codes'], answer: 2, hint: 'It is your whole lane, written down.', explain: 'It assembles what you already learned.' },
        ],
      },
    ],
  },
  fossils: {
    name: 'Fossils & Deep Time', icon: Bone, accent: '#e0915f',
    blurb: 'Reading the story of ancient life in stone.',
    days: [
      {
        id: 'f1', tag: 'Paleontology', title: 'What Is a Fossil?',
        subtitle: 'Day 1 · Messages from ancient life',
        pages: [
          { title: 'Evidence frozen in stone', blocks: [
            { type: 'text', text: 'A fossil is not a bone that just got old. It is preserved evidence of ancient life — a message from an organism that lived thousands or millions of years ago.' },
            { type: 'concept', term: 'Fossil', def: 'Preserved remains or traces of a once-living thing, usually turned to stone over a very long time.' },
          ]},
          { title: 'Two kinds of clues', blocks: [
            { type: 'concept', term: 'Body fossil', def: 'A preserved PART of the organism itself — a bone, tooth, or shell.' },
            { type: 'concept', term: 'Trace fossil', def: 'Preserved evidence of ACTIVITY — a footprint, a burrow, even fossilized droppings. The animal is gone, but proof of its behavior remains.' },
          ]},
          { title: 'Why fossils are rare', blocks: [
            { type: 'text', text: 'Almost every living thing decays completely and leaves nothing. Becoming a fossil requires a rare chain of lucky conditions. That is why every fossil found is genuinely precious.' },
          ]},
          { title: 'The detective angle', blocks: [
            { type: 'callout', text: 'A footprint can reveal how fast a dinosaur ran; a tooth can reveal what it ate. Paleontologists are detectives, and fossils are the clues. Tomorrow: how the clues get made.' },
          ]},
        ],
        recap: [
          'A fossil is preserved evidence of ancient life.',
          'Body fossils are parts (bones, shells); trace fossils are activity (footprints).',
          'Fossilization is rare, which makes every fossil valuable.',
        ],
        quiz: [
          { type: 'mc', prompt: 'A fossil is:', choices: ['a modern bone', 'preserved evidence of ancient life', 'any old rock', 'a living animal'], answer: 1, hint: 'It is a message from the past.', explain: 'Preserved evidence of ancient life.' },
          { type: 'mc', prompt: 'A dinosaur footprint is a:', choices: ['trace fossil', 'body fossil', 'mineral', 'mixture'], answer: 0, hint: 'Evidence of activity, not a body part.', explain: 'A footprint is a trace fossil.' },
          { type: 'mc', prompt: 'A preserved bone is a:', choices: ['burrow', 'trace fossil', 'body fossil', 'footprint'], answer: 2, hint: 'It is a part of the organism.', explain: 'A bone is a body fossil.' },
          { type: 'mc', prompt: 'Of all the living things that have ever existed, the proportion that fossilised is:', choices: ['most of them', 'about half', 'a tiny fraction', 'all the ones with bones'], answer: 2, hint: 'Fossilising needs rare conditions.', explain: 'It needs rapid burial and usually hard parts. Almost everything decays instead — which is why the record has the gaps it does.' },
        ],
      },
      {
        id: 'f2', tag: 'Paleontology', title: 'How Fossils Form',
        subtitle: 'Day 2 · A rare recipe',
        pages: [
          { title: 'Step one: get buried, fast', blocks: [
            { type: 'text', text: 'The fossil recipe almost always starts the same way: an organism dies and is buried QUICKLY by sediment — mud, sand, or ash — before scavengers or rot can destroy it.' },
            { type: 'concept', term: 'Sediment', def: 'Tiny particles of mud, sand, or ash that settle in layers and can bury remains.' },
          ]},
          { title: 'Soft parts vanish', blocks: [
            { type: 'text', text: 'Skin, muscle, and organs decay away. The hard parts — bones, teeth, shells — last far longer. That is why almost all fossils are of hard structures.' },
          ]},
          { title: 'Turning bone to stone', blocks: [
            { type: 'concept', term: 'Permineralization', def: 'Over thousands of years, mineral-rich water seeps into the buried bone and fills every tiny space inside it with stone, hardening the original into rock.' },
            { type: 'example', text: 'Meanwhile the sediment above presses down, hardening into solid rock around the fossil. Bury, replace, compress — repeated over deep time, this preserves a creature for millions of years.' },
          ]},
          { title: 'Why it stays rare', blocks: [
            { type: 'callout', text: 'Quick burial, the right minerals, and undisturbed time must ALL line up. Miss any step and there is no fossil. The odds explain why we have so much yet to discover.' },
          ]},
        ],
        recap: [
          'Fossilizing usually starts with rapid burial in sediment.',
          'Soft parts decay; hard parts (bone, shell) survive.',
          'Permineralization replaces bone with stone over long time.',
        ],
        quiz: [
          { type: 'mc', prompt: 'The first key step in fossilizing is usually:', choices: ['rapid burial in sediment', 'being eaten', 'floating in the ocean forever', 'melting'], answer: 0, hint: 'Protect the remains fast.', explain: 'Quick burial protects the remains.' },
          { type: 'mc', prompt: 'Which parts fossilize most easily?', choices: ['fur only', 'bones and shells', 'skin and muscle', 'blood'], answer: 1, hint: 'The hard parts last.', explain: 'Hard parts survive; soft parts decay.' },
          { type: 'mc', prompt: 'Minerals replacing bone to make stone is called:', choices: ['melting', 'evaporation', 'erosion', 'permineralization'], answer: 3, hint: 'Mineral-rich water seeps in.', explain: 'That process is permineralization.' },
          { type: 'mc', prompt: 'Fossil formation usually takes:', choices: ['a few years', 'thousands to millions of years', 'a few months', 'a single season'], answer: 1, hint: 'Think in geological time.', explain: 'Thousands to millions of years, as minerals gradually replace the original material.' },
        ],
      },
      {
        id: 'f3', tag: 'Geology', title: 'Reading Rock Layers',
        subtitle: 'Day 3 · Nature’s timeline',
        pages: [
          { title: 'Layers stack over time', blocks: [
            { type: 'text', text: 'Sediment settles in flat layers, one atop another, year after year. Each layer of rock, called a stratum, is a page in Earth’s history book.' },
            { type: 'visual', kind: 'strata' },
          ]},
          { title: 'The deepest rule', blocks: [
            { type: 'concept', term: 'Law of superposition', def: 'In undisturbed rock, lower layers are OLDER and upper layers are YOUNGER — because the bottom ones were laid down first.' },
          ]},
          { title: 'Fossils get dated by depth', blocks: [
            { type: 'example', text: 'Find a fossil in a deep layer and another higher up: the deep one is older, no measurement needed. The rock layers themselves order the history of life from bottom to top.' },
          ]},
          { title: 'A readable Earth', blocks: [
            { type: 'callout', text: 'This simple "deeper = older" rule lets scientists arrange millions of years of life in order — just by reading the stack. Geology is a library you climb through.' },
          ]},
        ],
        recap: [
          'Rock forms in layers called strata.',
          'Law of superposition: lower layers are older, upper are younger.',
          'A fossil’s depth helps order it in time.',
        ],
        quiz: [
          { type: 'mc', prompt: 'In undisturbed rock, the OLDEST layer is:', choices: ['impossible to tell', 'at the bottom', 'at the top', 'in the middle'], answer: 1, hint: 'Which was laid down first?', explain: 'The bottom layer formed first, so it is oldest.' },
          { type: 'mc', prompt: 'Layers of rock are called:', choices: ['strata', 'fossils', 'minerals', 'bytes'], answer: 0, hint: 'One layer is a stratum.', explain: 'Rock layers are strata.' },
          { type: 'mc', prompt: 'A fossil found in a deeper rock layer is generally:', choices: ['younger than one above it', 'exactly the same age', 'older than one above it', 'impossible to date'], answer: 2, hint: 'Which layer had to be laid down first?', explain: 'Deeper means laid down earlier, so older. That is the law of superposition.' },
          { type: 'mc', prompt: '"Deeper means older" is the law of:', choices: ['supply and demand', 'motion', 'superposition', 'gravity'], answer: 2, hint: 'About stacked layers.', explain: 'That is the law of superposition.' },
        ],
      },
      {
        id: 'f4', tag: 'Geology', title: 'Dating Fossils',
        subtitle: 'Day 4 · Putting numbers on the past',
        pages: [
          { title: 'Two ways to ask "how old?"', blocks: [
            { type: 'text', text: 'Yesterday’s layers tell you which fossil is OLDER, but not its age in years. For that, scientists use two different approaches.' },
            { type: 'concept', term: 'Relative dating', def: 'Ordering fossils as older or younger using rock layers — no exact age, just the sequence.' },
          ]},
          { title: 'The atomic clock', blocks: [
            { type: 'concept', term: 'Absolute dating', def: 'Finding an actual age in years by measuring radioactive decay — atoms breaking down at a steady, known rate.' },
            { type: 'concept', term: 'Half-life', def: 'The time it takes for HALF of a radioactive material to decay. It never changes for a given isotope — and different isotopes of the same element can have wildly different half-lives.' },
          ]},
          { title: 'Halving, again and again', blocks: [
            { type: 'example', text: 'After one half-life, half the material remains. After two, half of that — a quarter. After three, an eighth. That repeated halving (1/2, 1/4, 1/8) is exponential decay — the flip side of your Math exponents.' },
            { type: 'formula', text: '1 → 1/2 → 1/4 → 1/8 …', label: 'Each half-life cuts the amount in half' },
          ]},
          { title: 'Different clocks for different ages', blocks: [
            { type: 'callout', text: 'Carbon-14 dates things up to ~50,000 years; other elements with longer half-lives date rocks billions of years old. Radioactive decay is the most reliable clock for deep time.' },
          ]},
        ],
        recap: [
          'Relative dating orders fossils; absolute dating gives an age in years.',
          'A half-life is the time for half a radioactive material to decay.',
          'Repeated halving is exponential decay — a steady atomic clock.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Ordering fossils by rock layer (no exact age) is:', choices: ['absolute dating', 'guessing', 'permineralization', 'relative dating'], answer: 3, hint: 'Just the sequence.', explain: 'That is relative dating.' },
          { type: 'mc', prompt: 'Getting an actual age in years uses:', choices: ['fossil size', 'radioactive decay', 'pure guessing', 'rock color'], answer: 1, hint: 'A steady atomic clock.', explain: 'Radioactive decay enables absolute dating.' },
          { type: 'mc', prompt: 'A half-life is the time for ____ of a material to decay:', choices: ['all', 'none', 'a quarter', 'half'], answer: 3, hint: 'It is in the name.', explain: 'Half decays in one half-life.' },
          { type: 'numeric', prompt: 'After 2 half-lives, what fraction remains? (Enter as a decimal.)', answer: 0.25, hint: 'Half of a half.', explain: '1/2 × 1/2 = 1/4 = 0.25.' },
          { type: 'mc', prompt: 'Radioactive decay works as a clock because:', choices: ['it decays at a steady, known rate', 'it speeds up when the rock is heated', 'it stops after a million years', 'it happens only inside fossils'], answer: 0, hint: 'What makes any clock useful at all?', explain: 'A steady rate that ordinary conditions do not change. That is what makes counting what is left meaningful.' },
        ],
      },
      {
        id: 'f5', tag: 'Geology', title: 'The Geologic Time Scale',
        subtitle: 'Day 5 · The vastness of deep time',
        pages: [
          { title: 'A number hard to imagine', blocks: [
            { type: 'text', text: 'Earth is about 4.6 BILLION years old. That is 4.6 × 10⁹ years — a figure so huge it only makes sense in the scientific notation you built in Math.' },
            { type: 'concept', term: 'Deep time', def: 'The immense span of geologic history — millions and billions of years — far beyond everyday human scale.' },
          ]},
          { title: 'Chapters of Earth’s history', blocks: [
            { type: 'text', text: 'Scientists divide deep time into eras. The Paleozoic brought early sea life and the first land plants; the Mesozoic was the age of dinosaurs; the Cenozoic — right now — is the age of mammals.' },
          ]},
          { title: 'Squeezing it into a year', blocks: [
            { type: 'example', text: 'Imagine all of Earth’s history as a single year. Dinosaurs don’t appear until mid-December. Humans? The last 30 minutes of December 31st. Our whole story is a blink at the very end.' },
          ]},
          { title: 'Perspective', blocks: [
            { type: 'callout', text: 'Fossils are our only windows into those earlier "months." Holding a 100-million-year-old fossil, you are touching a chapter written long before humans existed.' },
          ]},
        ],
        recap: [
          'Earth is about 4.6 billion (4.6 × 10⁹) years old.',
          'Deep time is divided into eras (Paleozoic, Mesozoic, Cenozoic).',
          'Humans occupy only the tiniest sliver at the very end.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Earth is about how old?', choices: ['1 million years', '100 years', '4.6 billion years', '6,000 years'], answer: 2, hint: 'Billions — written 4.6 × 10⁹.', explain: 'About 4.6 billion years.' },
          { type: 'mc', prompt: 'The age of the dinosaurs was the:', choices: ['Mesozoic era', 'Cenozoic era', 'Paleozoic era', 'Modern era'], answer: 0, hint: 'The "middle life" era.', explain: 'Dinosaurs ruled the Mesozoic.' },
          { type: 'mc', prompt: 'If Earth’s whole history were squeezed into one 24-hour day, humans would appear:', choices: ['at breakfast', 'around midday', 'in the last minute or so', 'right at the start'], answer: 2, hint: '4.6 billion years against a couple of hundred thousand.', explain: 'In the last fraction of a minute. Nearly all of Earth’s history happened with nobody there to see it.' },
          { type: 'mc', prompt: 'The huge spans of Earth’s past are called:', choices: ['deep time', 'last week', 'recess', 'a half-life'], answer: 0, hint: 'Millions to billions of years.', explain: 'That is deep time.' },
        ],
      },
      {
        id: 'f6', tag: 'Paleontology', title: 'Dinosaurs & Mass Extinctions',
        subtitle: 'Day 6 · Life’s great turning points',
        pages: [
          { title: 'Rulers of the Mesozoic', blocks: [
            { type: 'text', text: 'Fossils reveal that for over 150 million years, dinosaurs dominated the land. Layer by layer, their bones tell a story of astonishing variety — from tiny hunters to the largest land animals ever.' },
          ]},
          { title: 'When many species vanish', blocks: [
            { type: 'concept', term: 'Mass extinction', def: 'An event where a large fraction of Earth’s species die out in a relatively short time.' },
            { type: 'text', text: 'The fossil record shows several. The most famous struck about 66 million years ago and ended the non-bird dinosaurs.' },
          ]},
          { title: 'The asteroid clue', blocks: [
            { type: 'example', text: 'In rock layers from exactly that age, scientists find a worldwide dusting of rare metal and a giant buried crater — strong evidence that an asteroid impact triggered the extinction. The layers, again, tell the tale.' },
          ]},
          { title: 'Dinosaurs never fully left', blocks: [
            { type: 'text', text: 'Here is the twist: fossils of feathered dinosaurs link them directly to birds. The sparrow at your window is, by descent, a living dinosaur. Life didn’t end — it transformed.' },
            { type: 'callout', text: 'From a single footprint to the rise and fall of dinosaurs, fossils teach one grand lesson: life on Earth is always changing. You can now read that story in stone.' },
          ]},
        ],
        recap: [
          'Dinosaurs dominated the Mesozoic for over 150 million years.',
          'A mass extinction ~66 million years ago ended non-bird dinosaurs.',
          'Evidence points to an asteroid; birds are living dinosaurs.',
        ],
        quiz: [
          { type: 'mc', prompt: 'A mass extinction is when:', choices: ['a volcano sleeps', 'many species die out in a short time', 'one animal moves away', 'a new fossil forms'], answer: 1, hint: 'Large-scale loss of life.', explain: 'Many species die out quickly.' },
          { type: 'mc', prompt: 'Non-bird dinosaurs died out about:', choices: ['last century', '6,000 years ago', 'yesterday', '66 million years ago'], answer: 3, hint: 'Tens of millions of years.', explain: 'About 66 million years ago.' },
          { type: 'mc', prompt: 'Many scientists link that extinction to a(n):', choices: ['lack of food only', 'human hunters', 'asteroid impact', 'sudden snowball'], answer: 2, hint: 'A crater and rare metal are clues.', explain: 'Evidence points to an asteroid impact.' },
          { type: 'mc', prompt: 'Birds are best described as:', choices: ['unrelated to dinosaurs', 'descended from dinosaurs', 'descended from mammals', 'descended from reptiles other than dinosaurs'], answer: 1, hint: 'Feathered fossils link them directly.', explain: 'Birds descend from theropod dinosaurs — so in the strict sense, dinosaurs are still here and some of them are at your bird feeder.' },
          { type: 'mc', prompt: 'The big lesson fossils teach is that life on Earth:', choices: ['changes over time', 'never changes', 'is only 100 years old', 'has no history'], answer: 0, hint: 'From the whole fossil story.', explain: 'Life is always changing.' },
        ],
      },
    ],
  },
};
