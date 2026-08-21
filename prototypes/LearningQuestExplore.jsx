import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Flame, Star, Lock, Check,
  ChevronRight, ChevronLeft, ArrowLeft, Trophy, Sparkles, RotateCcw, Zap,
  Target, Rocket, BookOpen, HelpCircle, Users, Eye, Landmark, TrendingUp, Bone, Leaf,
} from 'lucide-react';

/* ============================================================================
   LEARNING QUEST: EXPLORE — Biology · English · Business · Government · Fossils
   ----------------------------------------------------------------------------
   PORTABILITY: the `Store` wrapper below is the ONLY Claude-specific code.
   Swap its two methods for localStorage / a backend when porting to Vite.

   CONTENT MODEL (expandable — append days to grow the course):
     day = {
       id, tag, title, subtitle,
       pages: [ { title, blocks:[ {type:'text'|'concept'|'example'|'callout'
                                   |'formula'|'visual', ...} ] } ],
       recap: [ 'bullet', ... ],          // confidence checkpoint before quiz
       quiz:  [ { type:'mc'|'tf'|'numeric', prompt, hint?, ... } ],
     }
   Visual blocks reference named SVG diagrams in <Visual/>.
   ========================================================================== */

/* ---- 1. STORAGE WRAPPER (swap when porting) ------------------------------ */
const PROFILES_KEY = 'lq_explore_v1';
const APP_ID = 'explore';
const Store = {
  async load() {
    try {
      const r = await window.storage.get(PROFILES_KEY, false);
      if (r) return JSON.parse(r.value);
    } catch {}
    // migrate legacy single-user save, if present
    try {
      const old = await window.storage.get('lq_progress', false);
      if (old) {
        const s = JSON.parse(old.value);
        if (s && s.name) {
          const prof = { id: 'p' + Date.now().toString(36), xp: 0, completed: {}, streak: { count: 0, last: null }, ...s };
          return { profiles: [prof], lastActive: prof.id };
        }
      }
    } catch {}
    return null;
  },
  async save(data) {
    try { await window.storage.set(PROFILES_KEY, JSON.stringify(data), false); } catch {}
  },
};

/* ---- 2. CURRICULUM ------------------------------------------------------- */
const CURRICULUM = {
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
          { type: 'mc', prompt: 'Keeping stable internal conditions is called:', choices: ['homeostasis', 'photosynthesis', 'reproduction', 'erosion'], answer: 0, hint: 'Think of body temperature.', explain: 'That is homeostasis.' },
          { type: 'mc', prompt: 'All living things are made of:', choices: ['cells', 'metal', 'plastic', 'sand'], answer: 0, hint: 'The basic unit of life.', explain: 'Cells are the building block of life.' },
          { type: 'tf', prompt: 'A flame is alive because it grows and uses energy.', answer: false, hint: 'Check the whole list, not one trait.', explain: 'It has no cells and cannot reproduce — not alive.' },
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
          { type: 'mc', prompt: 'Which part is the cell’s control center?', choices: ['nucleus', 'membrane', 'mitochondria', 'cell wall'], answer: 0, hint: 'It holds the DNA.', explain: 'The nucleus controls the cell.' },
          { type: 'mc', prompt: 'Which part releases usable energy from food?', choices: ['mitochondria', 'nucleus', 'cell wall', 'chloroplast'], answer: 0, hint: 'Known as the powerhouse.', explain: 'Mitochondria release energy.' },
          { type: 'mc', prompt: 'Which is found in plant cells but NOT animal cells?', choices: ['cell wall', 'nucleus', 'membrane', 'mitochondria'], answer: 0, hint: 'It gives plants stiffness.', explain: 'Only plant cells have a cell wall.' },
          { type: 'tf', prompt: 'Cell theory says every cell comes from another cell.', answer: true, hint: 'Cells do not appear from nothing.', explain: 'Yes — cells come from pre-existing cells.' },
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
          { type: 'mc', prompt: 'Photosynthesis takes in sunlight, water, and:', choices: ['carbon dioxide', 'oxygen', 'sand', 'salt'], answer: 0, hint: 'The gas you breathe out.', explain: 'Plants take in carbon dioxide.' },
          { type: 'mc', prompt: 'Photosynthesis releases:', choices: ['oxygen', 'carbon dioxide', 'nitrogen', 'helium'], answer: 0, hint: 'The gas you breathe in.', explain: 'It releases oxygen.' },
          { type: 'mc', prompt: 'Cellular respiration happens mainly in the:', choices: ['mitochondria', 'nucleus', 'cell wall', 'chloroplast'], answer: 0, hint: 'The powerhouse of the cell.', explain: 'Mitochondria carry out respiration.' },
          { type: 'tf', prompt: 'Photosynthesis and cellular respiration are roughly opposite processes.', answer: true, hint: 'Compare the two formulas.', explain: 'Yes — one builds sugar, the other breaks it down.' },
          { type: 'mc', prompt: 'The original source of nearly all energy for life is:', choices: ['the Sun', 'the Moon', 'soil', 'wind'], answer: 0, hint: 'Photosynthesis starts with it.', explain: 'Energy traces back to the Sun.' },
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
          { type: 'mc', prompt: 'A section of DNA coding for a trait is a:', choices: ['gene', 'cell wall', 'fossil', 'nucleus'], answer: 0, hint: 'It carries one instruction.', explain: 'That is a gene.' },
          { type: 'mc', prompt: 'A recessive trait appears only when:', choices: ['both copies are recessive', 'one copy is recessive', 'it is dominant', 'there is no DNA'], answer: 0, hint: 'Dominant wins whenever present.', explain: 'Both copies must be recessive.' },
          { type: 'numeric', prompt: 'In a 3 to 1 Punnett result, what percent show the recessive trait?', answer: 25, hint: 'One box out of four.', explain: '1 ÷ 4 = 25%.' },
          { type: 'numeric', prompt: 'How many copies of each gene do you inherit in total from your two parents?', answer: 2, hint: 'One from each parent.', explain: 'Two copies — one per parent.' },
          { type: 'tf', prompt: 'DNA is found in the nucleus of the cell.', answer: true, hint: 'The control center.', explain: 'Yes — DNA is stored in the nucleus.' },
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
          { type: 'mc', prompt: 'The science of naming and grouping organisms is:', choices: ['taxonomy', 'geology', 'economics', 'astronomy'], answer: 0, hint: 'It creates the classification system.', explain: 'That is taxonomy.' },
          { type: 'mc', prompt: 'Which is the MOST specific level?', choices: ['species', 'kingdom', 'phylum', 'class'], answer: 0, hint: 'It is the last one in the list.', explain: 'Species is most specific.' },
          { type: 'mc', prompt: 'Which is the BROADEST level listed?', choices: ['kingdom', 'species', 'genus', 'family'], answer: 0, hint: 'It is the first one in the list.', explain: 'Kingdom is broadest.' },
          { type: 'tf', prompt: 'A scientific name is made of the genus and species.', answer: true, hint: 'Like Homo sapiens.', explain: 'Yes — genus plus species.' },
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
          { type: 'mc', prompt: 'Plants that make their own food are called:', choices: ['producers', 'consumers', 'decomposers', 'predators'], answer: 0, hint: 'They produce food from sunlight.', explain: 'Plants are producers.' },
          { type: 'mc', prompt: 'Organisms that break down dead material are:', choices: ['decomposers', 'producers', 'consumers', 'fossils'], answer: 0, hint: 'They recycle nutrients.', explain: 'Those are decomposers.' },
          { type: 'numeric', prompt: 'About what percent of energy passes to the next level of a food chain?', answer: 10, hint: 'Roughly one tenth.', explain: 'About 10% moves up.' },
          { type: 'tf', prompt: 'Energy flows one way while matter is recycled.', answer: true, hint: 'Decomposers return the matter.', explain: 'Yes — energy flows, matter cycles.' },
          { type: 'mc', prompt: 'Food chains are usually short because:', choices: ['energy runs out at each level', 'animals get bored', 'plants are rare', 'water is heavy'], answer: 0, hint: 'Only 10% passes up.', explain: 'Energy loss limits chain length.' },
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
          { type: 'mc', prompt: 'The part of a sentence telling what the subject does is the:', choices: ['predicate', 'subject', 'adjective', 'title'], answer: 0, hint: 'It carries the action.', explain: 'That is the predicate.' },
          { type: 'mc', prompt: 'Which can stand alone as a sentence?', choices: ['an independent clause', 'a dependent clause', 'a fragment', 'a phrase'], answer: 0, hint: 'The name is a hint.', explain: 'Independent clauses stand alone.' },
          { type: 'mc', prompt: '"Because the rain stopped" is a:', choices: ['dependent clause', 'independent clause', 'complete sentence', 'paragraph'], answer: 0, hint: 'Does it feel finished?', explain: 'It cannot stand alone — dependent.' },
          { type: 'tf', prompt: 'Every complete sentence needs both a subject and a predicate.', answer: true, hint: 'Both parts are required.', explain: 'Yes — both are needed.' },
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
          { type: 'mc', prompt: 'The main idea is:', choices: ['the central point the text makes', 'the longest sentence', 'the title only', 'the last word'], answer: 0, hint: 'It is a claim, not just a subject.', explain: 'It is the central point.' },
          { type: 'mc', prompt: 'Facts and examples that back up the main idea are:', choices: ['supporting evidence', 'the topic', 'a fragment', 'a predicate'], answer: 0, hint: 'They make it believable.', explain: 'That is supporting evidence.' },
          { type: 'mc', prompt: '"Sharks" is a topic. Which is a main idea?', choices: ['Sharks are misunderstood and vital to oceans', 'Sharks', 'Ocean animals', 'Fish'], answer: 0, hint: 'A main idea makes a claim.', explain: 'It states a point, not just a subject.' },
          { type: 'tf', prompt: 'A strong summary retells every detail in order.', answer: false, hint: 'Think shorter and sharper.', explain: 'A strong summary gives the main idea and key evidence.' },
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
          { type: 'mc', prompt: '"Quiet as a held breath" is a:', choices: ['simile', 'metaphor', 'personification', 'fact'], answer: 0, hint: 'Look for like or as.', explain: 'It uses "as" — a simile.' },
          { type: 'mc', prompt: '"Her voice was gravel" is a:', choices: ['metaphor', 'simile', 'summary', 'clause'], answer: 0, hint: 'It says one thing IS another.', explain: 'That is a metaphor.' },
          { type: 'mc', prompt: '"The wind argued with the door" is:', choices: ['personification', 'a simile', 'imagery only', 'a fragment'], answer: 0, hint: 'Wind cannot argue.', explain: 'Human traits given to wind — personification.' },
          { type: 'mc', prompt: 'Language that appeals to the senses is:', choices: ['imagery', 'a predicate', 'a thesis', 'taxonomy'], answer: 0, hint: 'It creates pictures and sounds.', explain: 'That is imagery.' },
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
          { type: 'mc', prompt: 'An author’s attitude toward the subject is the:', choices: ['tone', 'topic', 'clause', 'genre'], answer: 0, hint: 'Word choice reveals it.', explain: 'That is tone.' },
          { type: 'mc', prompt: 'A story using "I" is written in:', choices: ['first person', 'third person', 'second person only', 'no point of view'], answer: 0, hint: 'The narrator is in the story.', explain: 'Using I is first person.' },
          { type: 'mc', prompt: '"The mob swarmed" instead of "the crowd gathered" changes the:', choices: ['tone', 'page number', 'font', 'length only'], answer: 0, hint: 'It changes how you feel.', explain: 'Word choice shifts tone.' },
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
          { type: 'mc', prompt: 'The sentence stating a paragraph’s main idea is the:', choices: ['topic sentence', 'conclusion', 'metaphor', 'predicate'], answer: 0, hint: 'It usually comes first.', explain: 'That is the topic sentence.' },
          { type: 'mc', prompt: 'Explaining WHY your evidence supports your point is:', choices: ['analysis', 'evidence', 'tone', 'imagery'], answer: 0, hint: 'The step most writers skip.', explain: 'That is analysis.' },
          { type: 'tf', prompt: 'A paragraph should generally cover one main idea.', answer: true, hint: 'New idea, new paragraph.', explain: 'Yes — one idea per paragraph.' },
          { type: 'mc', prompt: 'In an essay, the thesis plays the same role as a paragraph’s:', choices: ['topic sentence', 'evidence', 'simile', 'font'], answer: 0, hint: 'It states the big idea.', explain: 'The thesis is the essay-level topic sentence.' },
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
          { type: 'mc', prompt: 'The position you ask a reader to accept is the:', choices: ['claim', 'tone', 'simile', 'topic'], answer: 0, hint: 'It must be arguable.', explain: 'That is the claim.' },
          { type: 'mc', prompt: 'Stating and answering the strongest objection is using a:', choices: ['counterargument', 'metaphor', 'fragment', 'summary'], answer: 0, hint: 'It addresses the other side.', explain: 'That is the counterargument.' },
          { type: 'tf', prompt: 'Addressing the other side makes an argument weaker.', answer: false, hint: 'It shows confidence and thought.', explain: 'It makes the argument stronger.' },
          { type: 'mc', prompt: 'The three classic appeals are logic, emotion, and:', choices: ['credibility', 'volume', 'length', 'color'], answer: 0, hint: 'Why should you be trusted?', explain: 'Credibility completes the three.' },
          { type: 'mc', prompt: 'A strong claim should be:', choices: ['arguable and specific', 'vague', 'obvious to everyone', 'unrelated'], answer: 0, hint: 'It needs to be worth defending.', explain: 'Arguable and specific.' },
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
          { type: 'mc', prompt: 'Government mainly exists to:', choices: ['provide order and shared services', 'make everyone rich', 'win every argument', 'entertain people'], answer: 0, hint: 'Think roads, safety, courts.', explain: 'Order and shared services are its core purpose.' },
          { type: 'mc', prompt: 'The rule of law means:', choices: ['leaders can ignore laws', 'even leaders must obey the law', 'there are no laws', 'only kings make laws'], answer: 1, hint: 'Who is above the law?', explain: 'No one is above the law — not even leaders.' },
          { type: 'tf', prompt: 'In a social contract, people trade some freedom for protection.', answer: true, hint: 'Think of why you follow traffic laws.', explain: 'That trade is the social contract.' },
          { type: 'mc', prompt: 'Which is a shared service governments provide?', choices: ['your breakfast', 'roads and schools', 'your video games', 'your haircut'], answer: 1, hint: 'Something too big to build alone.', explain: 'Roads and schools are public, shared services.' },
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
          { type: 'mc', prompt: 'Which branch MAKES laws?', choices: ['legislative', 'executive', 'judicial', 'military'], answer: 0, hint: 'Congress lives here.', explain: 'The legislative branch (Congress) makes laws.' },
          { type: 'mc', prompt: 'Which branch CARRIES OUT (enforces) laws?', choices: ['legislative', 'executive', 'judicial', 'local'], answer: 1, hint: 'The President leads it.', explain: 'The executive branch enforces laws.' },
          { type: 'mc', prompt: 'Which branch decides what laws MEAN?', choices: ['legislative', 'executive', 'judicial', 'all of them'], answer: 2, hint: 'The Supreme Court is its top.', explain: 'The judicial branch interprets laws.' },
          { type: 'mc', prompt: 'The President leads which branch?', choices: ['legislative', 'executive', 'judicial', 'none'], answer: 1, hint: 'The one that enforces.', explain: 'The President heads the executive branch.' },
          { type: 'tf', prompt: 'Splitting power prevents one person from controlling everything.', answer: true, hint: 'That is the whole point.', explain: 'Separation of powers blocks a single ruler.' },
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
          { type: 'mc', prompt: 'A President refusing to sign a bill is called a:', choices: ['veto', 'override', 'election', 'law'], answer: 0, hint: 'It blocks a bill from Congress.', explain: 'That refusal is a veto.' },
          { type: 'mc', prompt: 'Checks and balances exist to:', choices: ['speed things up', 'stop any branch from getting too powerful', 'give the President all power', 'end elections'], answer: 1, hint: 'It is about limiting power.', explain: 'They keep any one branch in check.' },
          { type: 'tf', prompt: 'Congress can override a President’s veto with enough votes.', answer: true, hint: 'A check can meet a counter-check.', explain: 'Yes — that is the override power.' },
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
          { type: 'mc', prompt: 'The Constitution is:', choices: ['the supreme law of the land', 'a type of tax', 'a branch of government', 'a kind of election'], answer: 0, hint: 'It outranks all other laws.', explain: 'It is the highest law in the country.' },
          { type: 'numeric', prompt: 'How many amendments make up the Bill of Rights?', answer: 10, hint: 'The FIRST ten amendments.', explain: 'The Bill of Rights is the first 10 amendments.' },
          { type: 'mc', prompt: 'Freedom of speech is protected by the:', choices: ['Bill of Rights', 'President alone', 'tax code', 'state flag'], answer: 0, hint: 'It is one of the first ten amendments.', explain: 'The Bill of Rights protects it.' },
          { type: 'tf', prompt: 'The Constitution can be changed through amendments.', answer: true, hint: 'There are 27 of them.', explain: 'Amendments allow it to evolve.' },
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
          { type: 'mc', prompt: 'A proposed law is called a:', choices: ['bill', 'veto', 'branch', 'court'], answer: 0, hint: 'It is not a law yet.', explain: 'A proposed law is a bill.' },
          { type: 'tf', prompt: 'A bill must pass both the House and the Senate.', answer: true, hint: 'Both chambers of Congress.', explain: 'Yes — both must pass it.' },
          { type: 'mc', prompt: 'After Congress passes a bill, it goes to the:', choices: ['President', 'Supreme Court', 'voters directly', 'state governor'], answer: 0, hint: 'The executive branch signs laws.', explain: 'The President signs or vetoes it.' },
          { type: 'mc', prompt: 'If the President vetoes a bill, Congress can:', choices: ['override it with enough votes', 'do nothing ever', 'go to jail', 'restart the country'], answer: 0, hint: 'A check meeting a counter-check.', explain: 'Congress can override the veto.' },
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
          { type: 'mc', prompt: 'Sharing power between national and state governments is called:', choices: ['federalism', 'a veto', 'a monarchy', 'an amendment'], answer: 0, hint: 'Power split by level.', explain: 'That sharing is federalism.' },
          { type: 'mc', prompt: 'Local government usually handles:', choices: ['national defense', 'trash and schools', 'printing money', 'foreign treaties'], answer: 1, hint: 'Think of your neighborhood.', explain: 'Local governments run trash, schools, and similar services.' },
          { type: 'tf', prompt: 'Voting is how citizens choose their leaders in a democracy.', answer: true, hint: 'Your most direct civic power.', explain: 'Yes — voting selects leaders.' },
          { type: 'mc', prompt: 'A government where the people choose leaders is a:', choices: ['democracy', 'monarchy', 'dictatorship', 'committee'], answer: 0, hint: 'Power flows from the people.', explain: 'That is a democracy.' },
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
          { type: 'mc', prompt: 'Scarcity means:', choices: ['limited resources but unlimited wants', 'everything is free', 'too much of everything', 'no one wants anything'], answer: 0, hint: 'It is a mismatch.', explain: 'Limited resources, unlimited wants.' },
          { type: 'mc', prompt: 'You pick a game over a book. The book is your:', choices: ['opportunity cost', 'profit', 'need', 'scarcity'], answer: 0, hint: 'What you gave up.', explain: 'The unchosen option is the opportunity cost.' },
          { type: 'mc', prompt: 'Which of these is a NEED?', choices: ['food and water', 'a new video game', 'designer shoes', 'a vacation'], answer: 0, hint: 'Required to live.', explain: 'Food and water are needs.' },
          { type: 'tf', prompt: 'Because resources are limited, we must make choices.', answer: true, hint: 'That is what scarcity forces.', explain: 'Yes — scarcity forces choices.' },
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
            { type: 'concept', term: 'Demand', def: 'How much of something buyers want at a given price. Lower price usually means MORE demand — bargains attract crowds.' },
          ]},
          { title: 'The supply rule', blocks: [
            { type: 'concept', term: 'Supply', def: 'How much of something sellers are willing to offer. Higher price usually means MORE supply — profit attracts sellers.' },
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
          { type: 'mc', prompt: 'When the price drops, demand usually:', choices: ['rises', 'falls', 'disappears', 'stays frozen'], answer: 0, hint: 'Bargains attract buyers.', explain: 'Lower price, more demand.' },
          { type: 'mc', prompt: 'The price where supply meets demand is the:', choices: ['equilibrium price', 'opportunity cost', 'profit', 'surplus'], answer: 0, hint: 'The balance point.', explain: 'That is the equilibrium price.' },
          { type: 'tf', prompt: 'Higher prices usually encourage MORE supply.', answer: true, hint: 'Profit attracts sellers.', explain: 'Yes — higher price, more supply.' },
          { type: 'mc', prompt: 'Too few goods for too many buyers is a:', choices: ['shortage', 'surplus', 'profit', 'tax'], answer: 0, hint: 'Demand outruns supply.', explain: 'That is a shortage.' },
          { type: 'mc', prompt: 'Lots of unsold leftover goods is a:', choices: ['surplus', 'shortage', 'need', 'bit'], answer: 0, hint: 'Supply outruns demand.', explain: 'That is a surplus.' },
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
          { type: 'mc', prompt: 'Profit equals revenue minus:', choices: ['cost', 'demand', 'taxes only', 'supply'], answer: 0, hint: 'Money out.', explain: 'Profit = revenue − cost.' },
          { type: 'numeric', prompt: 'You earn $50 and spend $50. What is your profit, in dollars?', answer: 0, hint: 'Revenue equals cost here.', explain: 'That is break-even: profit 0.' },
          { type: 'mc', prompt: 'When revenue exactly equals cost, you are at:', choices: ['break-even', 'huge profit', 'a shortage', 'a surplus'], answer: 0, hint: 'Profit is zero.', explain: 'Revenue = cost is break-even.' },
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
          { type: 'mc', prompt: 'A value proposition is:', choices: ['the problem your business solves for customers', 'your total revenue', 'a kind of tax', 'a loop'], answer: 0, hint: 'Why customers need you.', explain: 'It is the problem you solve.' },
          { type: 'mc', prompt: 'Your price should at least cover your:', choices: ['costs', 'wishes', 'competitors’ dreams', 'homework'], answer: 0, hint: 'Remember profit = revenue − cost.', explain: 'Price must cover costs.' },
          { type: 'tf', prompt: 'Knowing your specific customer helps a business succeed.', answer: true, hint: 'You cannot sell to "everyone."', explain: 'Yes — know who you serve.' },
          { type: 'mc', prompt: 'Profit comes from charging more than your:', choices: ['costs', 'friends', 'age', 'address'], answer: 0, hint: 'The gap above cost.', explain: 'Profit lives above your costs.' },
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
          { type: 'mc', prompt: 'Interest is usually:', choices: ['a percent of the amount', 'always exactly $5', 'a random number', 'a kind of tax'], answer: 0, hint: 'Tied to percents.', explain: 'It is a percent of the amount.' },
          { type: 'mc', prompt: 'Interest earned ON past interest is called:', choices: ['compound interest', 'simple interest', 'opportunity cost', 'a surplus'], answer: 0, hint: 'It snowballs.', explain: 'That is compound interest.' },
          { type: 'tf', prompt: 'Compound interest grows faster than simple interest over time.', answer: true, hint: 'Interest on interest snowballs.', explain: 'Yes — it compounds.' },
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
          { type: 'mc', prompt: 'Marketing is mainly about:', choices: ['communicating value to customers', 'hiding your product', 'raising your costs', 'avoiding customers'], answer: 0, hint: 'Make people aware and interested.', explain: 'It communicates value.' },
          { type: 'mc', prompt: 'Standing out from competitors is called:', choices: ['differentiation', 'scarcity', 'break-even', 'storage'], answer: 0, hint: 'Give a reason to pick you.', explain: 'That is differentiation.' },
          { type: 'tf', prompt: 'Competition pushes businesses to improve.', answer: true, hint: 'Rivals raise the bar.', explain: 'Yes — competition drives improvement.' },
          { type: 'mc', prompt: 'A "limited edition" item can charge more due to:', choices: ['scarcity', 'higher costs only', 'lower demand', 'taxes'], answer: 0, hint: 'Fewer made, more wanted.', explain: 'Scarcity raises demand and price.' },
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
          { type: 'mc', prompt: 'A market gap is:', choices: ['an unmet need no one serves well', 'a type of loan', 'a store closing time', 'a tax'], answer: 0, hint: 'It is an opening in the market.', explain: 'It is a need nobody is serving well yet.' },
          { type: 'mc', prompt: 'Business ideas most often start from:', choices: ['noticing a real problem', 'guessing randomly', 'copying homework', 'picking a logo'], answer: 0, hint: 'Think about annoyances.', explain: 'Real problems spark real businesses.' },
          { type: 'mc', prompt: 'Which question separates a business from a hobby?', choices: ['Would people pay to fix it?', 'Is it fun?', 'Is it colorful?', 'Is it new?'], answer: 0, hint: 'Money must actually change hands.', explain: 'Willingness to pay makes it a business.' },
          { type: 'tf', prompt: 'It is smart to test an idea before building the whole thing.', answer: true, hint: 'Cheaper to learn early.', explain: 'Yes — testing first saves time and money.' },
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
          { type: 'mc', prompt: 'A target market is:', choices: ['the specific group you aim to serve', 'everyone alive', 'your total profit', 'a store shelf'], answer: 0, hint: 'Specific beats broad.', explain: 'It is your specific customer group.' },
          { type: 'numeric', prompt: '30 out of 40 people surveyed would buy. What percent is that?', answer: 75, hint: 'Divide 30 by 40, then multiply by 100.', explain: '30 ÷ 40 = 0.75 = 75%.' },
          { type: 'mc', prompt: 'Market research means:', choices: ['gathering real customer information', 'guessing what people want', 'raising prices', 'hiring friends'], answer: 0, hint: 'Evidence, not assumption.', explain: 'It gathers real information.' },
          { type: 'tf', prompt: 'Trying to sell to "everyone" usually works better than targeting a group.', answer: false, hint: 'Remember: everyone is nobody.', explain: 'Targeting a specific group works far better.' },
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
          { type: 'tf', prompt: 'Keeping the same promise consistently builds a brand.', answer: true, hint: 'Trust comes from repetition.', explain: 'Yes — consistency is what builds trust.' },
          { type: 'mc', prompt: 'A trusted brand can usually:', choices: ['charge more and win customers faster', 'ignore its customers', 'skip making profit', 'avoid all competition'], answer: 0, hint: 'Trust reduces buyer risk.', explain: 'Trust lets a brand charge more.' },
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
          { type: 'mc', prompt: 'Charging based on what the solution is worth to the buyer is:', choices: ['value-based pricing', 'cost-plus pricing', 'break-even', 'a surplus'], answer: 0, hint: 'It looks at the customer, not the cost.', explain: 'That is value-based pricing.' },
          { type: 'numeric', prompt: 'Cost is $10 and you use a 20% markup. What is the price in dollars?', answer: 12, hint: '20% of 10 is 2.', explain: '10 + 2 = 12.' },
          { type: 'mc', prompt: 'Pricing far below competitors can make customers think:', choices: ['something is wrong with it', 'it must be luxury', 'it is illegal', 'it is heavy'], answer: 0, hint: 'Very cheap can signal low quality.', explain: 'Suspiciously low prices raise doubts.' },
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
          { type: 'mc', prompt: 'The best marketing channel is usually:', choices: ['wherever your target market already is', 'the most expensive one', 'the loudest one', 'always television'], answer: 0, hint: 'Go where they already spend time.', explain: 'Meet customers where they already are.' },
          { type: 'tf', prompt: 'Word of mouth is powerful because people trust friends more than ads.', answer: true, hint: 'Trust is the reason.', explain: 'Yes — personal trust beats advertising.' },
          { type: 'mc', prompt: 'Smart marketers decide where to spend by:', choices: ['measuring which channel brings customers', 'flipping a coin', 'spending equally everywhere', 'never advertising'], answer: 0, hint: 'Track the results.', explain: 'Measure, then invest where it works.' },
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
          { type: 'mc', prompt: 'An elevator pitch is:', choices: ['a short clear explanation of your business', 'a long report', 'a type of loan', 'a price tag'], answer: 0, hint: 'It fits in an elevator ride.', explain: 'It is a fast, clear explanation.' },
          { type: 'mc', prompt: 'Which belongs in a business plan?', choices: ['costs, pricing, and expected profit', 'your favorite color', 'the weather', 'your bedtime'], answer: 0, hint: 'It covers how money works.', explain: 'Costs, pricing, and profit are core sections.' },
          { type: 'numeric', prompt: '30 customers pay $3 each. Cost is $1 each. What is the total profit, in dollars?', answer: 60, hint: 'Profit per item is $2.', explain: '30 × 2 = 60.' },
          { type: 'tf', prompt: 'Adding real numbers makes a pitch more convincing.', answer: true, hint: 'Evidence beats hope.', explain: 'Yes — evidence strengthens the case.' },
          { type: 'mc', prompt: 'A business plan is mostly built from:', choices: ['things you already studied: market, pricing, profit', 'secret codes', 'random guesses', 'song lyrics'], answer: 0, hint: 'It is your whole lane, written down.', explain: 'It assembles what you already learned.' },
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
          { type: 'mc', prompt: 'A fossil is:', choices: ['preserved evidence of ancient life', 'any old rock', 'a living animal', 'a modern bone'], answer: 0, hint: 'It is a message from the past.', explain: 'Preserved evidence of ancient life.' },
          { type: 'mc', prompt: 'A dinosaur footprint is a:', choices: ['trace fossil', 'body fossil', 'mineral', 'mixture'], answer: 0, hint: 'Evidence of activity, not a body part.', explain: 'A footprint is a trace fossil.' },
          { type: 'mc', prompt: 'A preserved bone is a:', choices: ['trace fossil', 'body fossil', 'footprint', 'burrow'], answer: 1, hint: 'It is a part of the organism.', explain: 'A bone is a body fossil.' },
          { type: 'tf', prompt: 'Most living things never become fossils.', answer: true, hint: 'Fossilization needs rare conditions.', explain: 'Yes — fossils are rare.' },
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
            { type: 'concept', term: 'Permineralization', def: 'Over thousands of years, mineral-rich water seeps into the buried bone and slowly replaces it with stone — copying its shape in rock.' },
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
          { type: 'mc', prompt: 'Which parts fossilize most easily?', choices: ['bones and shells', 'skin and muscle', 'blood', 'fur only'], answer: 0, hint: 'The hard parts last.', explain: 'Hard parts survive; soft parts decay.' },
          { type: 'mc', prompt: 'Minerals replacing bone to make stone is called:', choices: ['permineralization', 'melting', 'evaporation', 'erosion'], answer: 0, hint: 'Mineral-rich water seeps in.', explain: 'That process is permineralization.' },
          { type: 'tf', prompt: 'Fossil formation usually takes a very long time.', answer: true, hint: 'Think thousands to millions of years.', explain: 'Yes — deep time is required.' },
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
          { type: 'mc', prompt: 'In undisturbed rock, the OLDEST layer is:', choices: ['at the bottom', 'at the top', 'in the middle', 'impossible to tell'], answer: 0, hint: 'Which was laid down first?', explain: 'The bottom layer formed first, so it is oldest.' },
          { type: 'mc', prompt: 'Layers of rock are called:', choices: ['strata', 'fossils', 'minerals', 'bytes'], answer: 0, hint: 'One layer is a stratum.', explain: 'Rock layers are strata.' },
          { type: 'tf', prompt: 'A fossil in a lower layer is generally older than one above it.', answer: true, hint: 'Deeper means earlier.', explain: 'Yes — superposition.' },
          { type: 'mc', prompt: '"Deeper means older" is the law of:', choices: ['superposition', 'gravity', 'supply and demand', 'motion'], answer: 0, hint: 'About stacked layers.', explain: 'That is the law of superposition.' },
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
            { type: 'concept', term: 'Half-life', def: 'The time it takes for HALF of a radioactive material to decay. It is always the same for a given element.' },
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
          { type: 'mc', prompt: 'Ordering fossils by rock layer (no exact age) is:', choices: ['relative dating', 'absolute dating', 'guessing', 'permineralization'], answer: 0, hint: 'Just the sequence.', explain: 'That is relative dating.' },
          { type: 'mc', prompt: 'Getting an actual age in years uses:', choices: ['radioactive decay', 'pure guessing', 'rock color', 'fossil size'], answer: 0, hint: 'A steady atomic clock.', explain: 'Radioactive decay enables absolute dating.' },
          { type: 'mc', prompt: 'A half-life is the time for ____ of a material to decay:', choices: ['half', 'all', 'none', 'a quarter'], answer: 0, hint: 'It is in the name.', explain: 'Half decays in one half-life.' },
          { type: 'numeric', prompt: 'After 2 half-lives, what fraction remains? (Enter as a decimal.)', answer: 0.25, hint: 'Half of a half.', explain: '1/2 × 1/2 = 1/4 = 0.25.' },
          { type: 'tf', prompt: 'Radioactive decay is a reliable clock for dating very old rocks.', answer: true, hint: 'It decays at a steady rate.', explain: 'Yes — a dependable atomic clock.' },
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
          { type: 'mc', prompt: 'Earth is about how old?', choices: ['4.6 billion years', '6,000 years', '1 million years', '100 years'], answer: 0, hint: 'Billions — written 4.6 × 10⁹.', explain: 'About 4.6 billion years.' },
          { type: 'mc', prompt: 'The age of the dinosaurs was the:', choices: ['Mesozoic era', 'Cenozoic era', 'Paleozoic era', 'Modern era'], answer: 0, hint: 'The "middle life" era.', explain: 'Dinosaurs ruled the Mesozoic.' },
          { type: 'tf', prompt: 'Humans have existed for only a tiny fraction of Earth’s history.', answer: true, hint: 'The last 30 minutes of the "year."', explain: 'Yes — a blink at the very end.' },
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
          { type: 'mc', prompt: 'A mass extinction is when:', choices: ['many species die out in a short time', 'one animal moves away', 'a new fossil forms', 'a volcano sleeps'], answer: 0, hint: 'Large-scale loss of life.', explain: 'Many species die out quickly.' },
          { type: 'mc', prompt: 'Non-bird dinosaurs died out about:', choices: ['66 million years ago', 'last century', '6,000 years ago', 'yesterday'], answer: 0, hint: 'Tens of millions of years.', explain: 'About 66 million years ago.' },
          { type: 'mc', prompt: 'Many scientists link that extinction to a(n):', choices: ['asteroid impact', 'sudden snowball', 'lack of food only', 'human hunters'], answer: 0, hint: 'A crater and rare metal are clues.', explain: 'Evidence points to an asteroid impact.' },
          { type: 'tf', prompt: 'Birds are considered living dinosaurs.', answer: true, hint: 'Feathered fossils link them.', explain: 'Yes — birds descend from dinosaurs.' },
          { type: 'mc', prompt: 'The big lesson fossils teach is that life on Earth:', choices: ['changes over time', 'never changes', 'is only 100 years old', 'has no history'], answer: 0, hint: 'From the whole fossil story.', explain: 'Life is always changing.' },
        ],
      },
    ],
  },
};

const SUBJECT_ORDER = ['bio', 'ela', 'biz', 'gov', 'fossils'];

/* ---- 3. PROGRESSION HELPERS ---------------------------------------------- */
const RANKS = [
  { min: 0, name: 'Cadet' }, { min: 120, name: 'Explorer' },
  { min: 300, name: 'Investigator' }, { min: 560, name: 'Scholar' },
  { min: 900, name: 'Adept' }, { min: 1320, name: 'Specialist' },
  { min: 1850, name: 'Master' }, { min: 2500, name: 'Luminary' },
];
function levelInfo(xp) {
  let i = 0;
  for (let k = 0; k < RANKS.length; k++) if (xp >= RANKS[k].min) i = k;
  const cur = RANKS[i];
  const nextAt = RANKS[i + 1] ? RANKS[i + 1].min : cur.min + 700;
  return { level: i + 1, rank: cur.name, pct: Math.min(1, (xp - cur.min) / (nextAt - cur.min)), nextAt, isMax: !RANKS[i + 1] };
}
const todayStr = () => new Date().toISOString().slice(0, 10);
function yesterday() { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().slice(0, 10); }
const dayKey = (subj, d) => `${subj}:${d}`;
const XP_CORRECT = 10, XP_BONUS = 20;
const DEFAULT_STATE = { name: '', xp: 0, completed: {}, streak: { count: 0, last: null } };

/* ---- 4. APP --------------------------------------------------------------- */
export default function App() {
  const [db, setDb] = useState(null);          // { profiles: [], lastActive }
  const [activeId, setActiveId] = useState(null);
  const [demo, setDemo] = useState(null);      // ephemeral profile — never saved
  const [view, setView] = useState({ name: 'dash' });
  const firstSave = useRef(true);

  useEffect(() => {
    Store.load().then((d) => {
      const data = d && Array.isArray(d.profiles) ? d : { profiles: [], lastActive: null };
      setDb(data);
      if (data.lastActive && data.profiles.some((p) => p.id === data.lastActive)) setActiveId(data.lastActive);
    });
  }, []);
  useEffect(() => {
    if (!db) return;
    if (firstSave.current) { firstSave.current = false; return; }
    Store.save(db);
  }, [db]);

  const profile = demo || (db ? db.profiles.find((p) => p.id === activeId) : null) || null;
  const lvl = useMemo(() => levelInfo(profile ? profile.xp : 0), [profile]);

  function updateProfile(fn) {
    if (demo) { setDemo((p) => fn(p)); return; }
    setDb((d) => ({ ...d, profiles: d.profiles.map((p) => (p.id === activeId ? fn(p) : p)) }));
  }
  function createProfile(name) {
    const prof = { id: 'p' + Date.now().toString(36), ...DEFAULT_STATE, name: name.slice(0, 24) };
    setDb((d) => ({ profiles: [...d.profiles, prof], lastActive: prof.id }));
    setActiveId(prof.id); setView({ name: 'dash' });
  }
  function pickProfile(id) {
    setDb((d) => ({ ...d, lastActive: id }));
    setActiveId(id); setView({ name: 'dash' });
  }
  function startDemo() {
    setDemo({ id: 'demo', ...DEFAULT_STATE, name: 'Demo Explorer' });
    setView({ name: 'dash' });
  }
  function exitToProfiles() {
    setDemo(null); setActiveId(null); setView({ name: 'dash' });
    setDb((d) => ({ ...d, lastActive: null }));
  }

  const isDayDone = (subj, id) => !!profile.completed[dayKey(subj, id)];
  const isDayUnlocked = (subj, idx) => idx === 0 || isDayDone(subj, CURRICULUM[subj].days[idx - 1].id);
  function subjStats(subj) {
    const days = CURRICULUM[subj].days;
    const done = days.filter((d) => isDayDone(subj, d.id)).length;
    return { done, total: days.length, pct: days.length ? done / days.length : 0 };
  }
  function finishDay(subj, day, correctCount) {
    const earned = correctCount * XP_CORRECT + XP_BONUS;
    updateProfile((p) => {
      const beforeLvl = levelInfo(p.xp).level;
      const t = todayStr();
      let count = p.streak.count;
      if (p.streak.last === t) {} else if (p.streak.last === yesterday()) count += 1; else count = 1;
      const xp = p.xp + earned;
      const key = dayKey(subj, day.id);
      const prevBest = p.completed[key]?.best ?? 0;
      return {
        ...p, xp, streak: { count, last: t },
        completed: { ...p.completed, [key]: { best: Math.max(prevBest, correctCount), total: day.quiz.length } },
        _leveledTo: levelInfo(xp).level > beforeLvl ? levelInfo(xp).level : null,
      };
    });
    return earned;
  }

  function applyImport(items) {
    updateProfile((p) => {
      const add = {};
      let gained = 0;
      items.forEach((it) => {
        CURRICULUM[it.subj].days.forEach((d) => {
          if (it.only && !it.only.includes(d.id)) return;
          const key = dayKey(it.subj, d.id);
          if (p.completed[key]) return;
          add[key] = { best: d.quiz.length, total: d.quiz.length };
          gained += d.quiz.length * XP_CORRECT + XP_BONUS;
        });
      });
      const xp = p.xp + gained;
      return { ...p, xp, completed: { ...p.completed, ...add }, _leveledTo: null };
    });
  }

  if (!db) return <Shell><FontAndStyle /><div style={S.loading}>Loading your quest…</div></Shell>;
  if (!profile) return (
    <Shell><FontAndStyle />
      <ProfileSelect profiles={db.profiles} onPick={pickProfile} onCreate={createProfile} onDemo={startDemo} />
    </Shell>
  );

  return (
    <Shell>
      <FontAndStyle />
      {demo && (
        <div style={S.demoBar}>
          <span>Demo mode — progress will not be saved</span>
          <button className="lq-tap" style={S.demoExit} onClick={exitToProfiles}>Exit</button>
        </div>
      )}
      {view.name === 'dash' && (
        <Dashboard lvl={lvl} state={profile} subjStats={subjStats}
          onOpen={(subj) => setView({ name: 'subject', subj })}
          onReset={() => updateProfile((p) => ({ ...p, xp: 0, completed: {}, streak: { count: 0, last: null }, _leveledTo: null }))}
          onSetName={(n) => updateProfile((p) => ({ ...p, name: n }))}
          onImport={applyImport}
          onSwitch={exitToProfiles} isDemo={!!demo} />
      )}
      {view.name === 'subject' && (
        <SubjectView subj={view.subj} isDayDone={isDayDone} isDayUnlocked={isDayUnlocked} stats={subjStats(view.subj)}
          onBack={() => setView({ name: 'dash' })} onDay={(day) => setView({ name: 'lesson', subj: view.subj, day })} />
      )}
      {view.name === 'lesson' && (
        <LessonView subj={view.subj} day={view.day} userName={profile.name}
          onBack={() => setView({ name: 'subject', subj: view.subj })}
          onStart={() => setView({ name: 'quiz', subj: view.subj, day: view.day })} />
      )}
      {view.name === 'quiz' && (
        <QuizView subj={view.subj} day={view.day}
          onExit={() => setView({ name: 'subject', subj: view.subj })}
          onDone={(correct) => { const earned = finishDay(view.subj, view.day, correct); setView({ name: 'results', subj: view.subj, day: view.day, correct, earned }); }} />
      )}
      {view.name === 'results' && (
        <ResultsView subj={view.subj} day={view.day} correct={view.correct} earned={view.earned} userName={profile.name}
          leveledTo={profile._leveledTo} onContinue={() => setView({ name: 'subject', subj: view.subj })} />
      )}
    </Shell>
  );
}

/* ---- 5. SHELL & STYLE ------------------------------------------------------ */
function Shell({ children }) { return <div style={S.bg}><div style={S.col}>{children}</div></div>; }
function FontAndStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=DM+Sans:opsz,wght@9..40,400..600&family=JetBrains+Mono:wght@500..700&display=swap');
      * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      @keyframes fadeUp { from { opacity:0; transform: translateY(14px);} to {opacity:1; transform:none;} }
      @keyframes pop { 0%{transform:scale(.8);opacity:0;} 60%{transform:scale(1.08);} 100%{transform:scale(1);opacity:1;} }
      @keyframes flicker { 0%,100%{ transform: scale(1) rotate(-2deg);} 50%{ transform: scale(1.12) rotate(2deg);} }
      @keyframes glow { 0%,100%{ box-shadow:0 0 0 0 rgba(246,183,60,0);} 50%{ box-shadow:0 0 28px 2px rgba(246,183,60,.35);} }
      @keyframes drift { 0%{transform:translate(0,0);} 25%{transform:translate(3px,-2px);} 50%{transform:translate(-2px,3px);} 75%{transform:translate(2px,2px);} 100%{transform:translate(0,0);} }
      @keyframes orbitSpin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
      .lq-rise { animation: fadeUp .5s cubic-bezier(.2,.7,.2,1) both; }
      .lq-tap { transition: transform .12s ease, filter .15s ease, background .15s ease; cursor:pointer; }
      .lq-tap:active { transform: scale(.97); }
      .lq-card:hover { transform: translateY(-2px); }
      input::placeholder { color:#5b6275; }
    `}</style>
  );
}

/* ---- 6. SVG VISUALS --------------------------------------------------------- */
function Visual({ v, accent }) {
  const wrap = (children, h = 150) => (
    <div style={S.vizBox}><svg viewBox={`0 0 320 ${h}`} width="100%" style={{ display: 'block' }}>{children}</svg></div>
  );
  if (v.kind === 'branches') {
    const Box = (x, label, sub) => (
      <g>
        <rect x={x} y="72" width="80" height="36" rx="8" fill={accent + '22'} stroke={accent} strokeWidth="1.5" />
        <text x={x + 40} y="89" textAnchor="middle" fill={accent} fontSize="10.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">{label}</text>
        <text x={x + 40} y="102" textAnchor="middle" fill="#8b91a3" fontSize="8.5" fontFamily="JetBrains Mono, monospace">{sub}</text>
      </g>
    );
    return wrap(<>
      <rect x="118" y="14" width="84" height="30" rx="8" fill={accent + '33'} stroke={accent} strokeWidth="1.5" />
      <text x="160" y="33" textAnchor="middle" fill={accent} fontSize="10.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">GOVERNMENT</text>
      <line x1="160" y1="44" x2="160" y2="56" stroke="#3a4154" strokeWidth="2" />
      <line x1="50" y1="56" x2="270" y2="56" stroke="#3a4154" strokeWidth="2" />
      <line x1="50" y1="56" x2="50" y2="72" stroke="#3a4154" strokeWidth="2" />
      <line x1="160" y1="56" x2="160" y2="72" stroke="#3a4154" strokeWidth="2" />
      <line x1="270" y1="56" x2="270" y2="72" stroke="#3a4154" strokeWidth="2" />
      {Box(10, 'LEGIS.', 'makes laws')}
      {Box(120, 'EXEC.', 'enforces')}
      {Box(230, 'JUDIC.', 'interprets')}
    </>, 124);
  }
  if (v.kind === 'supplydemand') return wrap(<>
    <line x1="52" y1="120" x2="290" y2="120" stroke="#3a4154" strokeWidth="2" />
    <line x1="60" y1="20" x2="60" y2="130" stroke="#3a4154" strokeWidth="2" />
    <line x1="72" y1="116" x2="268" y2="34" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="72" y1="34" x2="268" y2="116" stroke="#5aa9ff" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="170" cy="75" r="6" fill="#fff" stroke="#0c0e16" strokeWidth="1.5" />
    <text x="240" y="30" fill={accent} fontSize="10" fontFamily="JetBrains Mono, monospace">supply</text>
    <text x="232" y="128" fill="#5aa9ff" fontSize="10" fontFamily="JetBrains Mono, monospace">demand</text>
    <text x="160" y="150" textAnchor="middle" fill="#8b91a3" fontSize="10.5" fontFamily="JetBrains Mono, monospace">they cross at the equilibrium price</text>
  </>, 158);
  if (v.kind === 'strata') {
    const layers = [['#d3ab78', 30], ['#bf9568', 56], ['#a37f58', 82], ['#876a4c', 108]];
    return wrap(<>
      {layers.map(([c, y], i) => <rect key={i} x="40" y={y} width="240" height="24" fill={c} stroke="#0c0e16" strokeWidth="1" />)}
      <circle cx="118" cy="120" r="6" fill="#1a1208" stroke="#fff" strokeWidth="1.5" />
      <text x="134" y="124" fill="#1a1208" fontSize="9.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">older</text>
      <circle cx="210" cy="42" r="5" fill="#1a1208" stroke="#fff" strokeWidth="1.5" />
      <text x="224" y="46" fill="#1a1208" fontSize="9.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">younger</text>
      <text x="160" y="148" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">deeper = older (law of superposition)</text>
    </>, 156);
  }
  if (v.kind === 'cell') return wrap(<>
    <ellipse cx="160" cy="78" rx="118" ry="62" fill={accent + '18'} stroke={accent} strokeWidth="2.5" />
    <circle cx="140" cy="72" r="26" fill={accent + '33'} stroke={accent} strokeWidth="1.5" />
    <circle cx="140" cy="72" r="8" fill={accent} opacity="0.5" />
    <text x="140" y="76" textAnchor="middle" fill="#e7e9f0" fontSize="9" fontWeight="700" fontFamily="JetBrains Mono, monospace">DNA</text>
    <ellipse cx="222" cy="60" rx="20" ry="11" fill="#0c0e16" stroke={accent} strokeWidth="1.5" transform="rotate(-18 222 60)" />
    <ellipse cx="96" cy="106" rx="18" ry="10" fill="#0c0e16" stroke={accent} strokeWidth="1.5" transform="rotate(14 96 106)" />
    <text x="140" y="44" textAnchor="middle" fill={accent} fontSize="9.5" fontFamily="JetBrains Mono, monospace">nucleus</text>
    <text x="222" y="40" textAnchor="middle" fill="#8b91a3" fontSize="9" fontFamily="JetBrains Mono, monospace">mitochondria</text>
    <text x="160" y="156" textAnchor="middle" fill="#8b91a3" fontSize="10.5" fontFamily="JetBrains Mono, monospace">the membrane controls what goes in and out</text>
  </>, 166);
  if (v.kind === 'punnett') {
    const cells = [['BB', 1], ['Bb', 1], ['Bb', 1], ['bb', 0]];
    return wrap(<>
      <text x="122" y="26" textAnchor="middle" fill="#8b91a3" fontSize="12" fontFamily="JetBrains Mono, monospace">B</text>
      <text x="196" y="26" textAnchor="middle" fill="#8b91a3" fontSize="12" fontFamily="JetBrains Mono, monospace">b</text>
      <text x="70" y="66" textAnchor="middle" fill="#8b91a3" fontSize="12" fontFamily="JetBrains Mono, monospace">B</text>
      <text x="70" y="122" textAnchor="middle" fill="#8b91a3" fontSize="12" fontFamily="JetBrains Mono, monospace">b</text>
      {cells.map((c, i) => {
        const x = 86 + (i % 2) * 74, y = 36 + Math.floor(i / 2) * 56;
        return (
          <g key={i}>
            <rect x={x} y={y} width="72" height="54" rx="6" fill={c[1] ? accent + '2a' : '#1b2030'} stroke={c[1] ? accent : '#3a4154'} strokeWidth="1.5" />
            <text x={x + 36} y={y + 33} textAnchor="middle" fill={c[1] ? accent : '#8b91a3'} fontSize="16" fontWeight="700" fontFamily="JetBrains Mono, monospace">{c[0]}</text>
          </g>
        );
      })}
      <text x="160" y="166" textAnchor="middle" fill="#8b91a3" fontSize="10.5" fontFamily="JetBrains Mono, monospace">3 dominant to 1 recessive — a 3:1 ratio</text>
    </>, 176);
  }
  if (v.kind === 'pyramid') {
    const rows = [['Top predators', '0.1%', 74], ['Secondary consumers', '1%', 122], ['Primary consumers', '10%', 170], ['Producers (plants)', '100%', 218]];
    return wrap(<>
      {rows.map((r, i) => {
        const y = 20 + i * 32, w = r[2];
        return (
          <g key={i}>
            <rect x={160 - w / 2} y={y} width={w} height="27" rx="4" fill={accent + (0x18 + i * 0x10).toString(16)} stroke={accent} strokeWidth="1.4" />
            <text x="160" y={y + 18} textAnchor="middle" fill="#e7e9f0" fontSize="9.5" fontFamily="JetBrains Mono, monospace">{r[0]}</text>
            <text x={160 + w / 2 + 8} y={y + 18} fill={accent} fontSize="9.5" fontFamily="JetBrains Mono, monospace">{r[1]}</text>
          </g>
        );
      })}
      <text x="160" y="172" textAnchor="middle" fill="#8b91a3" fontSize="10.5" fontFamily="JetBrains Mono, monospace">only ~10% of energy reaches the next level</text>
    </>, 182);
  }
  if (v.kind === 'funnel') {
    const rows = [['AWARE', 250], ['INTERESTED', 190], ['DECIDING', 130], ['BUYS', 70]];
    return wrap(<>
      {rows.map((r, i) => {
        const y = 18 + i * 34, w = r[1];
        return (
          <g key={i}>
            <rect x={160 - w / 2} y={y} width={w} height="28" rx="5" fill={accent + '22'} stroke={accent} strokeWidth="1.5" />
            <text x="160" y={y + 19} textAnchor="middle" fill={accent} fontSize="10.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">{r[0]}</text>
          </g>
        );
      })}
      <text x="160" y="172" textAnchor="middle" fill="#8b91a3" fontSize="10.5" fontFamily="JetBrains Mono, monospace">many hear of you · fewer buy</text>
    </>, 182);
  }
  if (v.kind === 'paragraph') {
    const rows = [['TOPIC SENTENCE', 'states the one idea'], ['EVIDENCE', 'facts, examples, quotes'], ['ANALYSIS', 'why the evidence proves it'], ['CLOSING', 'wraps up or bridges on']];
    return wrap(<>
      {rows.map((r, i) => (
        <g key={i}>
          <rect x="30" y={16 + i * 38} width="260" height="30" rx="7" fill={accent + '1e'} stroke={accent} strokeWidth="1.4" />
          <text x="42" y={35 + i * 38} fill={accent} fontSize="10" fontWeight="700" fontFamily="JetBrains Mono, monospace">{r[0]}</text>
          <text x="278" y={35 + i * 38} textAnchor="end" fill="#8b91a3" fontSize="9" fontFamily="JetBrains Mono, monospace">{r[1]}</text>
        </g>
      ))}
    </>, 172);
  }
  if (v.kind === 'argument') return wrap(<>
    <rect x="96" y="14" width="128" height="34" rx="8" fill={accent + '33'} stroke={accent} strokeWidth="1.6" />
    <text x="160" y="36" textAnchor="middle" fill={accent} fontSize="11" fontWeight="700" fontFamily="JetBrains Mono, monospace">CLAIM</text>
    <line x1="160" y1="48" x2="160" y2="60" stroke="#3a4154" strokeWidth="2" />
    <line x1="72" y1="60" x2="248" y2="60" stroke="#3a4154" strokeWidth="2" />
    <line x1="72" y1="60" x2="72" y2="74" stroke="#3a4154" strokeWidth="2" />
    <line x1="248" y1="60" x2="248" y2="74" stroke="#3a4154" strokeWidth="2" />
    <rect x="20" y="74" width="104" height="32" rx="7" fill="#161a28" stroke={accent} strokeWidth="1.4" />
    <text x="72" y="94" textAnchor="middle" fill="#e7e9f0" fontSize="10" fontFamily="JetBrains Mono, monospace">REASON</text>
    <rect x="196" y="74" width="104" height="32" rx="7" fill="#161a28" stroke={accent} strokeWidth="1.4" />
    <text x="248" y="94" textAnchor="middle" fill="#e7e9f0" fontSize="10" fontFamily="JetBrains Mono, monospace">EVIDENCE</text>
    <rect x="86" y="118" width="148" height="30" rx="7" fill="#1b2030" stroke="#5b6275" strokeWidth="1.4" strokeDasharray="4 3" />
    <text x="160" y="137" textAnchor="middle" fill="#aeb4c4" fontSize="9.5" fontFamily="JetBrains Mono, monospace">COUNTERARGUMENT</text>
    <text x="160" y="166" textAnchor="middle" fill="#8b91a3" fontSize="10" fontFamily="JetBrains Mono, monospace">answer the objection to get stronger</text>
  </>, 176);
  return null;
}

/* ---- 7. PROFILE SELECT ------------------------------------------------------ */
function ProfileSelect({ profiles, onPick, onCreate, onDemo }) {
  const [creating, setCreating] = useState(profiles.length === 0);
  const [v, setV] = useState('');
  const go = () => { const n = v.trim(); if (n) onCreate(n); };
  const AV_COLORS = ['#f6b73c', '#3ddc97', '#ff6b6b', '#5aa9ff', '#c792ea', '#ffb86c'];
  return (
    <div style={{ paddingTop: 40 }}>
      <div style={{ textAlign: 'center' }}>
        <div className="lq-rise" style={{ ...S.medal, background: '#f6b73c22', border: '2px solid #f6b73c', margin: '0 auto', animation: 'pop .5s both' }}>
          <Rocket size={38} color="#f6b73c" />
        </div>
        <div className="lq-rise" style={{ ...S.eyebrow, marginTop: 20, animationDelay: '.06s' }}>Learning Quest</div>
        <h1 className="lq-rise" style={{ ...S.h1, fontSize: 30, animationDelay: '.1s' }}>
          {profiles.length ? 'Who’s exploring today?' : 'Ready to explore?'}
        </h1>
      </div>

      {!creating ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
          {profiles.map((p, i) => {
            const pl = levelInfo(p.xp), c = AV_COLORS[i % AV_COLORS.length];
            return (
              <button key={p.id} className="lq-rise lq-tap lq-card" style={{ ...S.profileCard, animationDelay: `${.14 + i * .05}s` }} onClick={() => onPick(p.id)}>
                <div style={{ ...S.avatar, background: c + '22', border: `1.5px solid ${c}`, color: c }}>{p.name.slice(0, 1).toUpperCase()}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={S.subjName}>{p.name}</div>
                  <div style={S.muted}>Level {pl.level} {pl.rank} · {p.xp} XP</div>
                </div>
                <ChevronRight size={18} color="#5b6275" />
              </button>
            );
          })}
          <button className="lq-rise lq-tap" style={{ ...S.profileCard, justifyContent: 'center', borderStyle: 'dashed', animationDelay: `${.14 + profiles.length * .05}s` }} onClick={() => setCreating(true)}>
            <span style={{ ...S.subjName, color: '#8b91a3' }}>+ New explorer</span>
          </button>
        </div>
      ) : (
        <div className="lq-rise" style={{ textAlign: 'center', marginTop: 24, animationDelay: '.14s' }}>
          <p style={{ ...S.muted, maxWidth: 340, margin: '0 auto 18px' }}>What should we call this explorer?</p>
          <input style={{ ...S.numInput, marginTop: 0, textAlign: 'center', borderColor: '#f6b73c88', fontFamily: "'Bricolage Grotesque', sans-serif" }}
            value={v} maxLength={24} placeholder="Type a name"
            onChange={(e) => setV(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && go()} autoFocus />
          <button className="lq-tap" style={{ ...S.primaryBtn, background: '#f6b73c', marginTop: 16, opacity: v.trim() ? 1 : .5 }} onClick={go} disabled={!v.trim()}>
            Begin <ChevronRight size={18} />
          </button>
          {profiles.length > 0 && (
            <button className="lq-tap" style={{ ...S.ghostBtn, marginTop: 12 }} onClick={() => { setCreating(false); setV(''); }}>Back to explorers</button>
          )}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: 26 }}>
        <button className="lq-tap" style={S.ghostBtn} onClick={onDemo}><Eye size={13} /> Try demo mode</button>
        <div style={{ ...S.muted, fontSize: 12, marginTop: 8 }}>Demo lets visitors play without touching anyone’s progress.</div>
      </div>
    </div>
  );
}

/* ---- 8. DASHBOARD ------------------------------------------------------------ */
function Dashboard({ lvl, state, subjStats, onOpen, onImport, onReset, onSetName, onSwitch, isDemo }) {
  const [confirm, setConfirm] = useState(false);
  const [importing, setImporting] = useState(false);
  const [backing, setBacking] = useState(false);
  const [editing, setEditing] = useState(false);
  const [nameVal, setNameVal] = useState(state.name);
  const totalDone = SUBJECT_ORDER.reduce((n, s) => n + subjStats(s).done, 0);
  const totalDays = SUBJECT_ORDER.reduce((n, s) => n + subjStats(s).total, 0);
  return (
    <div>
      <div className="lq-rise" style={{ animationDelay: '.02s' }}>
        <div style={S.eyebrow}>Mission Control</div>
        <h1 style={S.h1}>Welcome back, {state.name}.</h1>
        <div style={S.muted}>{totalDone} of {totalDays} missions complete</div>
      </div>

      <div className="lq-rise" style={{ ...S.heroCard, animationDelay: '.06s' }}>
        <div style={S.heroTop}>
          <div>
            <div style={S.rankRow}><Trophy size={15} color="#f6b73c" /><span style={S.rankName}>{lvl.rank}</span></div>
            <div style={S.lvlBig}>Level {lvl.level}</div>
          </div>
          <Streak count={state.streak.count} />
        </div>
        <Bar pct={lvl.pct} accent="#f6b73c" />
        <div style={S.barLabel}>
          <span style={S.mono}>{state.xp} XP</span>
          <span style={S.muted}>{lvl.isMax ? 'Max rank reached' : `${lvl.nextAt - state.xp} XP to level ${lvl.level + 1}`}</span>
        </div>
      </div>

      <div style={S.sectionLabel}>Your Subjects</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {SUBJECT_ORDER.map((id, i) => {
          const s = CURRICULUM[id], st = subjStats(id), Icon = s.icon;
          return (
            <div key={id} className="lq-rise lq-tap lq-card" style={{ ...S.subjCard, animationDelay: `${.1 + i * .05}s` }} onClick={() => onOpen(id)}>
              <div style={{ ...S.subjIcon, background: s.accent + '22', border: `1px solid ${s.accent}55` }}><Icon size={22} color={s.accent} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={S.subjName}>{s.name}</div>
                <div style={S.subjBlurb}>{s.blurb}</div>
                <div style={{ marginTop: 8 }}><Bar pct={st.pct} accent={s.accent} thin /></div>
              </div>
              <div style={S.subjMeta}><span style={{ ...S.mono, color: s.accent }}>{st.done}/{st.total}</span><ChevronRight size={18} color="#5b6275" /></div>
            </div>
          );
        })}
      </div>

      {importing && <ImportPanel onCancel={() => setImporting(false)} onApply={(items) => { onImport(items); setImporting(false); }} />}

      <div style={{ marginTop: 22, textAlign: 'center' }}>
        {editing ? (
          <div style={S.confirmRow}>
            <input style={S.miniInput} value={nameVal} maxLength={24} onChange={(e) => setNameVal(e.target.value)} />
            <button className="lq-tap" style={S.ghostBtn} onClick={() => { if (nameVal.trim()) onSetName(nameVal.trim().slice(0, 24)); setEditing(false); }}>Save</button>
            <button className="lq-tap" style={S.ghostBtn} onClick={() => { setNameVal(state.name); setEditing(false); }}>Cancel</button>
          </div>
        ) : !confirm ? (
          <div style={S.confirmRow}>
            <button className="lq-tap" style={S.ghostBtn} onClick={onSwitch}><Users size={13} /> Switch explorer</button>
            {!importing && <button className="lq-tap" style={S.ghostBtn} onClick={() => setImporting(true)}><Check size={13} /> Already done a lane?</button>}
            {!isDemo && <button className="lq-tap" style={S.ghostBtn} onClick={() => setEditing(true)}>Change name</button>}
            <button className="lq-tap" style={S.ghostBtn} onClick={() => setBacking(true)}>Back up</button>
            <button className="lq-tap" style={S.ghostBtn} onClick={() => setConfirm(true)}><RotateCcw size={13} /> Reset progress</button>
          </div>
        ) : (
          <div style={S.confirmRow}>
            <span style={S.muted}>Erase all progress?</span>
            <button className="lq-tap" style={S.dangerBtn} onClick={() => { onReset(); setConfirm(false); }}>Yes, reset</button>
            <button className="lq-tap" style={S.ghostBtn} onClick={() => setConfirm(false)}>Cancel</button>
          </div>
        )}
      </div>
      {backing && <BackupPanel onClose={() => setBacking(false)} />}
    </div>
  );
}

/* ---- BACKUP BRIDGE: window.storage is origin-scoped; a Vite build won't
   inherit it. Copy this payload out before porting. Downloads are blocked
   in artifacts, so this is copy-to-clipboard by design. -------------------- */
function BackupPanel({ onClose }) {
  const [txt, setTxt] = useState('Reading...');
  const ta = useRef(null);
  useEffect(() => { (async () => {
    let raw = null;
    try {
      raw = (typeof window !== 'undefined' && window.storage && window.storage.get)
        ? ((await window.storage.get(PROFILES_KEY, false)) || {}).value
        : localStorage.getItem(PROFILES_KEY);
    } catch {}
    setTxt(raw
      ? JSON.stringify({ lqBackup: 1, app: APP_ID, key: PROFILES_KEY, at: new Date().toISOString(), data: JSON.parse(raw) })
      : 'No saved progress found.');
  })(); }, []);
  let days = null;
  try { days = JSON.parse(txt).data.profiles.reduce((n, p) => n + Object.keys(p.completed || {}).length, 0); } catch {}
  const copy = async () => {
    try { await navigator.clipboard.writeText(txt); }
    catch { try { ta.current.select(); document.execCommand('copy'); } catch {} }
  };
  return (
    <div style={S.backupBox}>
      <div style={S.muted}>Copy this and save it somewhere safe.{days !== null ? ' ' + days + ' finished days found.' : ''}</div>
      <textarea ref={ta} readOnly value={txt} style={S.backupTa} onFocus={(e) => e.target.select()} />
      <div style={S.confirmRow}>
        <button className="lq-tap" style={S.ghostBtn} onClick={copy}>Copy</button>
        <button className="lq-tap" style={S.ghostBtn} onClick={onClose}>Done</button>
      </div>
    </div>
  );
}


/* ---- 9. SUBJECT VIEW ----------------------------------------------------------- */
function SubjectView({ subj, isDayDone, isDayUnlocked, stats, onBack, onDay }) {
  const s = CURRICULUM[subj], Icon = s.icon;
  return (
    <div>
      <BackBar onBack={onBack} />
      <div className="lq-rise" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
        <div style={{ ...S.subjIcon, background: s.accent + '22', border: `1px solid ${s.accent}55` }}><Icon size={22} color={s.accent} /></div>
        <div>
          <h1 style={{ ...S.h1, margin: 0, fontSize: 26 }}>{s.name}</h1>
          <div style={S.subjBlurb}>{stats.done} of {stats.total} days complete</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
        {s.days.map((d, i) => {
          const done = isDayDone(subj, d.id), open = isDayUnlocked(subj, i);
          return (
            <div key={d.id} className={`lq-rise ${open ? 'lq-tap lq-card' : ''}`}
              style={{ ...S.dayCard, animationDelay: `${i * .06}s`, opacity: open ? 1 : .55, cursor: open ? 'pointer' : 'default' }}
              onClick={() => open && onDay(d)}>
              <div style={{ ...S.dayNode, borderColor: done ? s.accent : open ? '#3a4154' : '#2a2f3d', background: done ? s.accent : 'transparent' }}>
                {done ? <Check size={16} color="#0c0e16" /> : open ? <span style={{ ...S.mono, color: '#aeb4c4', fontSize: 13 }}>{i + 1}</span> : <Lock size={13} color="#5b6275" />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={S.daySub}>{d.subtitle}</span>
                  {d.tag && <span style={{ ...S.tag, color: s.accent, borderColor: s.accent + '55', background: s.accent + '14' }}>{d.tag}</span>}
                </div>
                <div style={S.dayTitle}>{d.title}</div>
              </div>
              {open && <ChevronRight size={18} color="#5b6275" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---- 10. LESSON VIEW (paged) ------------------------------------------------------ */
function LessonView({ subj, day, userName, onBack, onStart }) {
  const accent = CURRICULUM[subj].accent;
  const [page, setPage] = useState(0);
  const totalPages = day.pages.length + 1; // + recap
  const isRecap = page === day.pages.length;
  const cur = isRecap ? null : day.pages[page];
  return (
    <div>
      <div style={S.quizTop}>
        <button className="lq-tap" style={S.iconBtn} onClick={onBack}><ArrowLeft size={18} color="#aeb4c4" /></button>
        <div style={{ flex: 1, display: 'flex', gap: 6, justifyContent: 'center' }}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <div key={i} style={{ width: i === page ? 22 : 8, height: 8, borderRadius: 99, background: i <= page ? accent : '#2a2f3d', transition: 'all .3s ease' }} />
          ))}
        </div>
        <span style={{ ...S.mono, color: '#aeb4c4', fontSize: 13 }}>{page + 1}/{totalPages}</span>
      </div>

      {!isRecap ? (
        <div key={page} className="lq-rise" style={{ marginTop: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <div style={{ ...S.eyebrow, color: accent, margin: 0 }}>{day.subtitle}</div>
            {day.tag && <span style={{ ...S.tag, color: accent, borderColor: accent + '55', background: accent + '14' }}>{day.tag}</span>}
          </div>
          <h1 style={{ ...S.h1, marginTop: 6, fontSize: 26 }}>{page === 0 ? day.title : cur.title}</h1>
          {page === 0 && <div style={{ ...S.muted, marginBottom: 4 }}>{cur.title}</div>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 14 }}>
            {cur.blocks.map((b, i) => <Block key={i} b={b} accent={accent} delay={i * .06} />)}
          </div>
        </div>
      ) : (
        <div key="recap" className="lq-rise" style={{ marginTop: 22 }}>
          <div style={{ ...S.eyebrow, color: accent }}>Checkpoint</div>
          <h1 style={{ ...S.h1, fontSize: 26 }}>You can now…</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
            {day.recap.map((r, i) => (
              <div key={i} className="lq-rise" style={{ ...S.recapItem, animationDelay: `${i * .08}s` }}>
                <div style={{ ...S.recapCheck, background: accent + '22', border: `1.5px solid ${accent}` }}><Check size={13} color={accent} /></div>
                <div style={S.body}>{r}</div>
              </div>
            ))}
          </div>
          <div className="lq-rise" style={{ ...S.callout, marginTop: 16, animationDelay: '.3s' }}>
            <Sparkles size={16} color="#f6b73c" style={{ flexShrink: 0, marginTop: 2 }} />
            <div style={S.body}>You’ve got everything you need, {userName}. Hints are there if you want them — using one is smart, not cheating.</div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
        {page > 0 && (
          <button className="lq-tap" style={{ ...S.secondaryBtn }} onClick={() => setPage(page - 1)}>
            <ChevronLeft size={17} /> Back
          </button>
        )}
        {!isRecap ? (
          <button className="lq-tap" style={{ ...S.primaryBtn, background: accent, flex: 1 }} onClick={() => setPage(page + 1)}>
            {page === 0 ? <><BookOpen size={17} /> Let’s go</> : <>Next <ChevronRight size={17} /></>}
          </button>
        ) : (
          <button className="lq-tap" style={{ ...S.primaryBtn, background: accent, flex: 1 }} onClick={onStart}>
            <Target size={17} /> Start Challenge · {day.quiz.length} questions
          </button>
        )}
      </div>
    </div>
  );
}
function Block({ b, accent, delay }) {
  const base = { animationDelay: `${delay}s` };
  if (b.type === 'text') return <p className="lq-rise" style={{ ...S.body, ...base }}>{b.text}</p>;
  if (b.type === 'concept') return (
    <div className="lq-rise" style={{ ...S.concept, borderColor: accent + '66', ...base }}>
      <div style={{ ...S.conceptTerm, color: accent }}>{b.term}</div><div style={S.body}>{b.def}</div>
    </div>
  );
  if (b.type === 'example') return (
    <div className="lq-rise" style={{ ...S.example, ...base }}><span style={S.exTag}>EXAMPLE</span><div style={{ ...S.body, marginTop: 6 }}>{b.text}</div></div>
  );
  if (b.type === 'callout') return (
    <div className="lq-rise" style={{ ...S.callout, ...base }}><Sparkles size={16} color="#f6b73c" style={{ flexShrink: 0, marginTop: 2 }} /><div style={S.body}>{b.text}</div></div>
  );
  if (b.type === 'formula') return (
    <div className="lq-rise" style={{ ...S.formula, borderColor: accent + '55', ...base }}>
      <div style={{ ...S.formulaText, color: accent }}>{b.text}</div>
      {b.label && <div style={{ ...S.muted, marginTop: 6, textAlign: 'center' }}>{b.label}</div>}
    </div>
  );
  if (b.type === 'visual') return <div className="lq-rise" style={base}><Visual v={b} accent={accent} /></div>;
  return null;
}

/* ---- 11. QUIZ VIEW (with penalty-free hints) -------------------------------------- */
function QuizView({ subj, day, onExit, onDone }) {
  const accent = CURRICULUM[subj].accent;
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [num, setNum] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const q = day.quiz[i];
  const checkCorrect = () => q.type === 'numeric' ? Math.abs(parseFloat(num) - q.answer) < 1e-9 : picked === q.answer;
  function submit() {
    if (revealed) return;
    if (q.type === 'numeric' && num.trim() === '') return;
    if (q.type !== 'numeric' && picked === null) return;
    if (checkCorrect()) setCorrectCount((c) => c + 1);
    setRevealed(true);
  }
  function next() {
    if (i + 1 >= day.quiz.length) { onDone(correctCount); return; }
    setI(i + 1); setPicked(null); setNum(''); setRevealed(false); setShowHint(false);
  }
  const ok = revealed && checkCorrect();
  return (
    <div>
      <div style={S.quizTop}>
        <button className="lq-tap" style={S.iconBtn} onClick={onExit}><ArrowLeft size={18} color="#aeb4c4" /></button>
        <div style={{ flex: 1 }}><Bar pct={(i + (revealed ? 1 : 0)) / day.quiz.length} accent={accent} thin /></div>
        <span style={{ ...S.mono, color: '#aeb4c4', fontSize: 13 }}>{i + 1}/{day.quiz.length}</span>
      </div>
      <div key={i} className="lq-rise" style={{ marginTop: 26 }}>
        <div style={{ ...S.eyebrow, color: accent }}>Question {i + 1}</div>
        <h2 style={S.qPrompt}>{q.prompt}</h2>

        {q.type === 'mc' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
            {q.choices.map((c, idx) => {
              const isPick = picked === idx, isAns = idx === q.answer;
              let bd = '#2a2f3d', bg = '#161a28';
              if (revealed && isAns) { bd = '#3ddc97'; bg = '#3ddc9722'; }
              else if (revealed && isPick && !isAns) { bd = '#ff6b6b'; bg = '#ff6b6b22'; }
              else if (isPick) { bd = accent; bg = accent + '1f'; }
              return <button key={idx} className="lq-tap" disabled={revealed} style={{ ...S.choice, borderColor: bd, background: bg }} onClick={() => setPicked(idx)}>{c}</button>;
            })}
          </div>
        )}

        {q.type === 'tf' && (
          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            {[{ v: true, t: 'True' }, { v: false, t: 'False' }].map((o) => {
              const isPick = picked === o.v, isAns = o.v === q.answer;
              let bd = '#2a2f3d', bg = '#161a28';
              if (revealed && isAns) { bd = '#3ddc97'; bg = '#3ddc9722'; }
              else if (revealed && isPick && !isAns) { bd = '#ff6b6b'; bg = '#ff6b6b22'; }
              else if (isPick) { bd = accent; bg = accent + '1f'; }
              return <button key={o.t} className="lq-tap" disabled={revealed} style={{ ...S.choice, flex: 1, textAlign: 'center', borderColor: bd, background: bg }} onClick={() => setPicked(o.v)}>{o.t}</button>;
            })}
          </div>
        )}

        {q.type === 'numeric' && (
          <input type="number" inputMode="decimal" value={num} disabled={revealed}
            onChange={(e) => setNum(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder="Type your answer"
            style={{ ...S.numInput, borderColor: revealed ? (ok ? '#3ddc97' : '#ff6b6b') : accent + '88' }} />
        )}

        {q.hint && !revealed && (
          !showHint ? (
            <button className="lq-tap" style={{ ...S.hintBtn }} onClick={() => setShowHint(true)}>
              <HelpCircle size={14} /> Show a hint
            </button>
          ) : (
            <div className="lq-rise" style={S.hintBox}>
              <HelpCircle size={15} color="#5aa9ff" style={{ flexShrink: 0, marginTop: 2 }} />
              <div style={{ ...S.body, fontSize: 14.5 }}>{q.hint}</div>
            </div>
          )
        )}

        {revealed && (
          <div className="lq-rise" style={{ ...S.feedback, borderColor: ok ? '#3ddc9766' : '#ff6b6b66', background: ok ? '#3ddc9714' : '#ff6b6b14' }}>
            <div style={{ ...S.fbTitle, color: ok ? '#3ddc97' : '#ff6b6b' }}>{ok ? <><Check size={16} /> Correct! +{XP_CORRECT} XP</> : <>Not quite — good try</>}</div>
            <div style={{ ...S.body, marginTop: 4 }}>{q.explain}</div>
          </div>
        )}
      </div>
      <button className="lq-tap" style={{ ...S.primaryBtn, background: revealed ? accent : '#2a2f3d', color: revealed ? '#0c0e16' : '#e7e9f0', marginTop: 22 }}
        onClick={revealed ? next : submit}>
        {revealed ? (i + 1 >= day.quiz.length ? 'Finish' : 'Next question') : 'Check answer'}
      </button>
    </div>
  );
}

/* ---- 12. RESULTS VIEW -------------------------------------------------------------- */
function ResultsView({ subj, day, correct, earned, leveledTo, userName, onContinue }) {
  const accent = CURRICULUM[subj].accent;
  const total = day.quiz.length, perfect = correct === total;
  const msg = perfect ? 'Flawless!' : correct >= total - 1 ? 'So close to perfect!' : 'Day complete!';
  return (
    <div style={{ textAlign: 'center', paddingTop: 16 }}>
      <div className="lq-rise" style={{ display: 'inline-block' }}>
        <div style={{ ...S.medal, background: accent + '22', border: `2px solid ${accent}`, animation: 'pop .5s both', margin: '0 auto' }}>
          {perfect ? <Trophy size={40} color={accent} /> : <Star size={40} color={accent} />}
        </div>
      </div>
      <h1 className="lq-rise" style={{ ...S.h1, marginTop: 18, animationDelay: '.1s' }}>{msg}</h1>
      <p className="lq-rise" style={{ ...S.muted, animationDelay: '.14s' }}>
        {correct} of {total} correct{perfect ? ` — outstanding, ${userName}!` : ` — every one you missed is now one you know, ${userName}.`}
      </p>
      <div className="lq-rise" style={{ ...S.xpBadge, animationDelay: '.2s' }}><Zap size={18} color="#f6b73c" /> <span style={{ ...S.mono, fontSize: 20 }}>+{earned} XP</span></div>
      {leveledTo && <div className="lq-rise" style={{ ...S.levelUp, animationDelay: '.28s' }}><Sparkles size={16} color="#f6b73c" /> Level up! You reached Level {leveledTo}</div>}
      <div><button className="lq-tap" style={{ ...S.primaryBtn, background: accent, marginTop: 26, maxWidth: 260, marginLeft: 'auto', marginRight: 'auto' }} onClick={onContinue}>Continue <ChevronRight size={18} /></button></div>
    </div>
  );
}

/* ---- 13. SMALL PIECES ---------------------------------------------------------------- */
function Bar({ pct, accent, thin }) {
  return (
    <div style={{ ...S.track, height: thin ? 6 : 9 }}>
      <div style={{ width: `${Math.round(pct * 100)}%`, height: '100%', borderRadius: 99, background: `linear-gradient(90deg, ${accent}cc, ${accent})`, transition: 'width .6s cubic-bezier(.2,.7,.2,1)' }} />
    </div>
  );
}
function Streak({ count }) {
  return (
    <div style={S.streak}>
      <Flame size={20} color={count > 0 ? '#ff8a3d' : '#4a505f'} style={count > 0 ? { animation: 'flicker 1.4s ease-in-out infinite' } : {}} />
      <div><div style={{ ...S.mono, fontSize: 18, lineHeight: 1, color: count > 0 ? '#ffb37a' : '#6b7281' }}>{count}</div><div style={S.streakLbl}>day streak</div></div>
    </div>
  );
}
function BackBar({ onBack }) { return <button className="lq-tap" style={{ ...S.iconBtn, marginBottom: 14 }} onClick={onBack}><ArrowLeft size={18} color="#aeb4c4" /></button>; }

/* ---- 14. STYLES ------------------------------------------------------------------------ */
/* ---- PRIOR PROGRESS IMPORT ------------------------------------------------- */
/* Lets a returning explorer credit lanes they already finished in the Core app. */
const IMPORTABLE = [
  { subj: 'gov', label: 'Government & Civics', note: 'all 6 days' },
  { subj: 'biz', label: 'Business — Days 1 to 6', note: 'the original 6', only: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'] },
  { subj: 'fossils', label: 'Fossils & Deep Time', note: 'all 6 days' },
];

function ImportPanel({ onApply, onCancel }) {
  const [sel, setSel] = useState({});
  const any = Object.values(sel).some(Boolean);
  return (
    <div style={S.importBox}>
      <div style={S.importTitle}>Already finished these?</div>
      <div style={{ ...S.muted, marginBottom: 12 }}>
        Tick any lane completed in the Core app and it will be credited here, with the XP those days were worth.
      </div>
      {IMPORTABLE.map((it) => {
        const on = !!sel[it.subj];
        return (
          <div key={it.subj} className="lq-tap" onClick={() => setSel((s) => ({ ...s, [it.subj]: !s[it.subj] }))}
            style={{ ...S.importRow, borderColor: on ? CURRICULUM[it.subj].accent + '99' : '#262c3d', background: on ? CURRICULUM[it.subj].accent + '14' : 'transparent' }}>
            <div style={{ ...S.importCheck, borderColor: on ? CURRICULUM[it.subj].accent : '#3a4154', background: on ? CURRICULUM[it.subj].accent : 'transparent' }}>
              {on && <Check size={13} color="#0c0e16" />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={S.importLabel}>{it.label}</div>
              <div style={S.importNote}>{it.note}</div>
            </div>
          </div>
        );
      })}
      <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
        <button className="lq-tap" style={{ ...S.primaryBtn, background: any ? '#3ddc97' : '#2a2f3d', color: any ? '#0c0e16' : '#8b91a3', marginTop: 0, flex: 1, padding: '11px 14px', fontSize: 14 }}
          onClick={() => any && onApply(IMPORTABLE.filter((it) => sel[it.subj]))}>
          Credit selected
        </button>
        <button className="lq-tap" style={S.ghostBtn} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

const S = {
  importBox: { marginTop: 20, background: '#12151f', border: '1px solid #262c3d', borderRadius: 16, padding: 16 },
  importTitle: { fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 17, fontWeight: 700, color: '#e7e9f0', marginBottom: 4 },
  importRow: { display: 'flex', alignItems: 'center', gap: 11, border: '1px solid #262c3d', borderRadius: 11, padding: '11px 12px', marginBottom: 8, cursor: 'pointer' },
  importCheck: { width: 20, height: 20, borderRadius: 6, border: '1.5px solid #3a4154', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  importLabel: { fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, fontWeight: 600, color: '#e7e9f0' },
  importNote: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#8b91a3', marginTop: 2 },
  bg: { minHeight: '100vh', width: '100%', backgroundColor: '#0c0e16', backgroundImage: 'radial-gradient(1200px 600px at 50% -10%, #1a2030 0%, rgba(12,14,22,0) 55%), radial-gradient(rgba(255,255,255,.025) 1px, transparent 1px)', backgroundSize: 'auto, 22px 22px', fontFamily: "'DM Sans', system-ui, sans-serif", color: '#e7e9f0' },
  col: { maxWidth: 560, margin: '0 auto', padding: '24px 18px 56px' },
  loading: { textAlign: 'center', padding: '80px 0', color: '#8b91a3', fontFamily: "'JetBrains Mono', monospace" },
  eyebrow: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: '#8b91a3', marginBottom: 6 },
  h1: { fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 30, fontWeight: 700, lineHeight: 1.1, margin: '0 0 4px', letterSpacing: -.5 },
  heroCard: { marginTop: 16, padding: 18, borderRadius: 18, background: 'linear-gradient(180deg, #181d2c, #12151f)', border: '1px solid #262b3a', boxShadow: '0 18px 40px -22px rgba(0,0,0,.8)' },
  heroTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  rankRow: { display: 'flex', alignItems: 'center', gap: 6 },
  rankName: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', color: '#f6b73c' },
  lvlBig: { fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 800, marginTop: 2 },
  barLabel: { display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 13 },
  track: { width: '100%', background: '#252a38', borderRadius: 99, overflow: 'hidden' },
  mono: { fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 },
  muted: { color: '#8b91a3', fontSize: 13 },
  streak: { display: 'flex', alignItems: 'center', gap: 8 },
  streakLbl: { fontSize: 10, color: '#6b7281', textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 },
  sectionLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#6b7281', margin: '26px 0 12px' },
  subjCard: { display: 'flex', alignItems: 'center', gap: 14, padding: 14, borderRadius: 16, background: '#141826', border: '1px solid #232838', transition: 'transform .15s ease' },
  subjIcon: { width: 46, height: 46, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  subjName: { fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 17 },
  subjBlurb: { color: '#8b91a3', fontSize: 13, marginTop: 1 },
  subjMeta: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 },
  dayCard: { display: 'flex', alignItems: 'center', gap: 14, padding: 14, borderRadius: 14, background: '#141826', border: '1px solid #232838' },
  dayNode: { width: 30, height: 30, borderRadius: 99, border: '2px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  daySub: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#6b7281', letterSpacing: .5 },
  dayTitle: { fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 16, marginTop: 3 },
  tag: { fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: 1, textTransform: 'uppercase', padding: '2px 7px', borderRadius: 6, border: '1px solid' },
  body: { fontSize: 15.5, lineHeight: 1.6, color: '#cfd3df', margin: 0 },
  concept: { padding: 14, borderRadius: 13, background: '#12151f', border: '1px solid' },
  conceptTerm: { fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 15, marginBottom: 4 },
  example: { padding: 14, borderRadius: 13, background: '#13182a', border: '1px solid #232c44' },
  exTag: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 2, color: '#5aa9ff', background: '#5aa9ff1c', padding: '3px 7px', borderRadius: 6 },
  callout: { display: 'flex', gap: 10, padding: 14, borderRadius: 13, background: 'linear-gradient(180deg,#1d1a13,#161310)', border: '1px solid #3a3320' },
  formula: { padding: '16px 14px', borderRadius: 13, background: '#10131d', border: '1.5px dashed' },
  formulaText: { fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 19, textAlign: 'center', letterSpacing: .5 },
  vizBox: { padding: '10px 6px', borderRadius: 13, background: '#10131d', border: '1px solid #1f2433' },
  recapItem: { display: 'flex', alignItems: 'flex-start', gap: 10, padding: 12, borderRadius: 12, background: '#141826', border: '1px solid #232838' },
  recapCheck: { width: 24, height: 24, borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 },
  primaryBtn: { width: '100%', border: 'none', borderRadius: 14, padding: '15px 18px', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 16, color: '#0c0e16', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
  secondaryBtn: { border: '1px solid #2a2f3d', background: '#161a28', borderRadius: 14, padding: '15px 18px', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: '#aeb4c4', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 },
  iconBtn: { width: 40, height: 40, borderRadius: 11, background: '#161a28', border: '1px solid #262b3a', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 },
  quizTop: { display: 'flex', alignItems: 'center', gap: 12 },
  qPrompt: { fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 700, lineHeight: 1.25, margin: '8px 0 0' },
  choice: { textAlign: 'left', padding: '15px 16px', borderRadius: 13, border: '1.5px solid', fontSize: 16, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, color: '#e7e9f0' },
  numInput: { width: '100%', marginTop: 18, padding: '15px 16px', borderRadius: 13, border: '1.5px solid', background: '#161a28', color: '#fff', fontSize: 18, fontFamily: "'JetBrains Mono', monospace", outline: 'none' },
  miniInput: { padding: '8px 12px', borderRadius: 10, border: '1px solid #3a4154', background: '#161a28', color: '#fff', fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: 'none', width: 150 },
  hintBtn: { display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, background: 'transparent', border: '1px dashed #2f3a4d', color: '#5aa9ff', padding: '8px 14px', borderRadius: 10, fontSize: 13.5, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" },
  hintBox: { display: 'flex', gap: 9, marginTop: 16, padding: 12, borderRadius: 12, background: '#5aa9ff10', border: '1px dashed #5aa9ff44' },
  feedback: { marginTop: 18, padding: 14, borderRadius: 13, border: '1px solid' },
  fbTitle: { display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15 },
  medal: { width: 88, height: 88, borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  xpBadge: { display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 18, padding: '10px 18px', borderRadius: 99, background: '#1d1a13', border: '1px solid #3a3320' },
  levelUp: { marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 12, background: '#1d1a13', border: '1px solid #4a3f1f', color: '#f6b73c', fontWeight: 600, fontSize: 14, animation: 'glow 2s ease-in-out infinite' },
  ghostBtn: { display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', border: '1px solid #2a2f3d', color: '#8b91a3', padding: '8px 14px', borderRadius: 10, fontSize: 13, cursor: 'pointer' },
  dangerBtn: { background: '#ff6b6b22', border: '1px solid #ff6b6b66', color: '#ff8f8f', padding: '8px 14px', borderRadius: 10, fontSize: 13, cursor: 'pointer' },
  confirmRow: { display: 'inline-flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
  backupBox: { marginTop: 18, background: '#12151f', border: '1px solid #262c3d', borderRadius: 14, padding: 14, textAlign: 'left' },
  backupTa: { width: '100%', height: 90, margin: '9px 0', background: '#0c0e16', color: '#8b91a3', border: '1px solid #2a2f3d', borderRadius: 9, padding: 9, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", outline: 'none', boxSizing: 'border-box' },
  demoBar: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '8px 12px', borderRadius: 10, background: '#5aa9ff14', border: '1px dashed #5aa9ff55', color: '#9cc6ff', fontSize: 13, marginBottom: 16 },
  demoExit: { background: 'transparent', border: '1px solid #5aa9ff66', color: '#9cc6ff', borderRadius: 8, padding: '3px 12px', fontSize: 12, cursor: 'pointer' },
  profileCard: { display: 'flex', alignItems: 'center', gap: 14, padding: 16, borderRadius: 16, background: '#141826', border: '1px solid #232838', width: '100%', textAlign: 'left', cursor: 'pointer' },
  avatar: { width: 44, height: 44, borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 18, flexShrink: 0 },
};
