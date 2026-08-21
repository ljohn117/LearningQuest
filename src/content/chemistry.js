import { FlaskConical } from 'lucide-react';

/* Chemistry
 *
 * Chosen over the other candidates (statistics, music theory) for one reason:
 * it has the largest existing spiral surface. Physical Science already gave
 * him atoms, states of matter, conservation of energy and heat as particle
 * motion. Biology gave him photosynthesis, enzymes and cells. Chemistry is
 * the hinge those two lanes were always turning on, and he has already done
 * both sides of it.
 *
 * Which means almost every day here can open a door he already walked
 * through. That is the point of the lane, not a bonus.
 *
 * Band check: this is roughly a middle-school physical science / early
 * high-school chemistry sequence, minus the parts that are genuinely
 * gatekept by algebra he has not finished — no moles, no stoichiometry, no
 * limiting reagents. What is left is the conceptual spine, which is the part
 * that is actually interesting and the part most curricula rush past.
 *
 * One thing deliberately included that most middle-school chemistry omits:
 * day 1 spends a whole page on why the usual "signs of a chemical change"
 * are evidence and not proof. Boiling water bubbles. That is a
 * counterexample, and he met counterexamples in Logic. A kid who can say
 * "that test is not decisive" is doing something better than memorising
 * four bullet points.
 *
 * Day ids ch1-ch10. Never renumber, never reuse. */

export const CHEMISTRY = {
  chem: {
    name: 'Chemistry', icon: FlaskConical, accent: '#a3e635',
    blurb: 'What atoms do when they meet. The hinge between physics and biology.',
    days: [
      /* ---- ch1 ---------------------------------------------------------- */
      {
        id: 'ch1', tag: 'Matter', title: 'Two Kinds of Change',
        subtitle: 'Day 1 · When is it still the same stuff?',
        pages: [
          { title: 'Rearranged, or rebuilt', blocks: [
            { type: 'text', text: 'Tear a sheet of paper and you still have paper. Burn it and you do not — you have ash, smoke and gas, and no amount of care will get the sheet back. Both are changes. Only one of them made something new.' },
            { type: 'concept', term: 'Chemical change', def: 'A change that rearranges atoms into different substances. A physical change moves the same substance around without rebuilding it.' },
          ]},
          { title: 'The usual signs', blocks: [
            { type: 'text', text: 'Chemists watch for four things: a colour appears that was not there, bubbles of gas form, heat or light is given off, or a solid appears in a clear liquid. Any of these is a reason to suspect a chemical change.' },
            { type: 'example', text: 'Vinegar poured on baking soda fizzes hard. The gas is carbon dioxide, and it did not exist a second earlier — nothing in the bottle was carbon dioxide before you poured.' },
          ]},
          { title: 'Why those signs are only evidence', blocks: [
            { type: 'text', text: 'Boiling water bubbles furiously and no chemical change is happening at all. The bubbles are steam — still H2O, just in a hurry. So "bubbles" cannot mean "chemical change", because here is a case where the sign appears and the claim is false.' },
            { type: 'callout', text: 'You have done this move before. In Logic, one counterexample is enough to kill a rule. This is that, aimed at a rule chemists actually use.' },
          ]},
          { title: 'The test that settles it', blocks: [
            { type: 'text', text: 'Ask whether you can get the original back without a new reaction. Melted ice refreezes. Dissolved salt comes back when the water evaporates. Burnt paper does not un-burn.' },
            { type: 'concept', term: 'Reversible', def: 'A physical change can usually be undone by adding or removing energy. Undoing a chemical change takes another chemical reaction.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'Physical Science day 1 said ice, water and steam are all H2O — same particles, different spacing. That was your first physical change, and you already knew the particles survived it. Chemistry is what happens when they do not.' },
          ]},
        ],
        recap: [
          'A chemical change rearranges atoms into different substances.',
          'Colour, gas, heat and a new solid are evidence, not proof.',
          'Boiling bubbles without any chemical change — that counterexample matters.',
          'Physical changes usually reverse with energy alone.',
        ],
        quiz: [
          { type: 'mc', prompt: 'What makes a change chemical rather than physical?', choices: ['it happens quickly', 'it cannot be seen', 'atoms rearrange into different substances', 'it gives off heat'], answer: 2, hint: 'Ask what you have at the end — the same stuff, or new stuff?', explain: 'A chemical change produces substances that were not there before. Speed and heat are side effects, not the definition.' },
          { type: 'tf', prompt: 'Bubbles forming always means a chemical change is happening.', answer: false, hint: 'Think about a pot of water on the stove.', explain: 'Boiling water bubbles and stays H2O the whole time. One counterexample is enough to retire the rule.' },
          { type: 'mc', prompt: 'Which of these is a physical change?', choices: ['wood burning', 'milk going sour', 'iron rusting', 'salt dissolving in water'], answer: 3, hint: 'Which one can you undo by just removing the water?', explain: 'Evaporate the water and the salt is back, unchanged. The other three build new substances.' },
          { type: 'mc', prompt: 'You cannot get burnt paper back because:', choices: ['the atoms were destroyed', 'the atoms were rebuilt into different substances', 'the ash is too light', 'it happened too fast'], answer: 1, hint: 'Nothing was destroyed — but was anything left the same?', explain: 'The atoms all still exist, rearranged into ash, smoke and gas. Undoing that needs another reaction, not just cooling it down.' },
        ],
      },

      /* ---- ch2 ---------------------------------------------------------- */
      {
        id: 'ch2', tag: 'Elements', title: 'The Table Is a Map',
        subtitle: 'Day 2 · Why the shape of it means something',
        pages: [
          { title: 'Sorted by one number', blocks: [
            { type: 'text', text: 'The periodic table is not a list of elements someone found. It is every element lined up by proton count, 1 to 118, with the line folded so that similar elements stack up underneath each other.' },
            { type: 'visual', kind: 'atom', protons: 11 },
          ]},
          { title: 'Columns are families', blocks: [
            { type: 'text', text: 'Elements in the same column behave alike. Every element in column 1 reacts hard with water — lithium fizzes, sodium skitters and flames, potassium can set itself alight. They are not similar by coincidence. They are stacked that way because they are similar.' },
            { type: 'concept', term: 'Group', def: 'A column of the periodic table. Elements in a group react in similar ways.' },
          ]},
          { title: 'The column that does nothing', blocks: [
            { type: 'text', text: 'The far right column — helium, neon, argon and the rest — barely reacts with anything at all. That is why neon signs can glow for decades and helium balloons are safe near a candle in a way hydrogen balloons famously were not.' },
            { type: 'callout', text: 'Hold onto that. An entire column of elements that refuse to react is a clue, and tomorrow it turns into the explanation for everything else.' },
          ]},
          { title: 'A map good enough to predict with', blocks: [
            { type: 'text', text: 'When Mendeleev built the table in 1869 he left blank squares, and said what the missing elements would be like — their weight, their colour, what they would react with. Seventeen years later germanium was discovered and matched his description closely.' },
            { type: 'example', text: 'That is what separates a real pattern from a tidy arrangement. A tidy arrangement organises what you already have. A real pattern tells you about things nobody has found yet.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'Biology day 5 sorted living things by shared traits so you could look anything up and know roughly what it does. Physical Science day 2 gave you the atomic number. The periodic table is those two ideas welded together — a classification system whose sorting key is a single count.' },
          ]},
        ],
        recap: [
          'The table is ordered by proton count and folded so similar elements line up.',
          'A column is a group, and a group reacts in similar ways.',
          'The far-right column is famously unreactive.',
          'Mendeleev predicted elements that had not been found — that is what a real pattern does.',
        ],
        quiz: [
          { type: 'mc', prompt: 'The periodic table is ordered by:', choices: ['proton count', 'date of discovery', 'alphabetical name', 'how common the element is'], answer: 0, hint: 'Which number is an element’s identity?', explain: 'Atomic number — the proton count — sets the order, exactly as Physical Science defined it.' },
          { type: 'mc', prompt: 'Two elements in the same column probably:', choices: ['are both metals', 'weigh the same', 'were discovered together', 'react in similar ways'], answer: 3, hint: 'Why bother stacking them?', explain: 'Shared behaviour is why they are stacked. That is what the columns are for.' },
          { type: 'tf', prompt: 'Mendeleev left gaps in his table for elements nobody had found yet.', answer: true, hint: 'What happened fifteen years later?', explain: 'He left the gaps and described what belonged in them. Germanium turned up in 1886 and matched.' },
          { type: 'mc', prompt: 'Helium is used in balloons instead of hydrogen because helium:', choices: ['is more common', 'barely reacts with anything', 'is lighter', 'is cheaper'], answer: 1, hint: 'Which column is helium in?', explain: 'Hydrogen burns. Helium sits in the unreactive column and will not catch fire.' },
        ],
      },

      /* ---- ch3 ---------------------------------------------------------- */
      {
        id: 'ch3', tag: 'Bonding', title: 'Only the Outside Matters',
        subtitle: 'Day 3 · Why any atom reacts with anything',
        pages: [
          { title: 'Electrons sit in layers', blocks: [
            { type: 'text', text: 'Electrons do not swarm an atom evenly. They fill up in layers — the innermost holds 2, the next holds 8. Only the electrons in the outermost occupied layer ever meet another atom.' },
            { type: 'concept', term: 'Valence electrons', def: 'The electrons in an atom’s outermost layer. They are the only ones that take part in bonding.' },
          ]},
          { title: 'Full is stable', blocks: [
            { type: 'text', text: 'An atom whose outer layer is full is content. It has no reason to grab, give away or share anything. An atom whose outer layer is part-full is not content, and will do something about it the first chance it gets.' },
            { type: 'visual', kind: 'atom', protons: 10 },
          ]},
          { title: 'That is what yesterday’s clue meant', blocks: [
            { type: 'text', text: 'Helium, neon and argon do not react because their outer layers are already full. Nothing to gain. Every other element on the table is, in effect, trying to end up like them.' },
            { type: 'callout', text: 'One fact explains an entire column of the periodic table and every reaction in the rest of it. That is a lot of work for one idea.' },
          ]},
          { title: 'Three ways to get there', blocks: [
            { type: 'text', text: 'An atom with one spare electron can give it away. An atom one short can take one. Two atoms both short can share. Give, take or share — every chemical bond you will ever meet is one of those three.' },
            { type: 'example', text: 'Sodium has one electron in its outer layer and gives it up easily. Chlorine is one short and takes one eagerly. You can probably guess what happens when they meet.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'Physical Science day 2 said the nucleus holds nearly all the mass while the electrons range over nearly all the volume. That turns out to decide chemistry: atoms meet each other electron-first, so the light, outer, almost weightless part is the part that does everything.' },
          ]},
        ],
        recap: [
          'Only the outermost electrons — the valence electrons — take part in bonding.',
          'A full outer layer means a stable, unreactive atom.',
          'The noble gases are unreactive because their outer layer is already full.',
          'Every bond is give, take, or share.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Which electrons take part in bonding?', choices: ['the outermost ones', 'the innermost ones', 'all of them equally', 'the ones in the nucleus'], answer: 0, hint: 'Which ones actually meet the other atom?', explain: 'The valence electrons — the outer layer. The inner ones never get close enough to matter.' },
          { type: 'tf', prompt: 'Neon is unreactive because its outer electron layer is already full.', answer: true, hint: 'What would neon have to gain from a reaction?', explain: 'A full outer layer means nothing to gain by giving, taking or sharing.' },
          { type: 'mc', prompt: 'An atom with one electron more than a full layer will most likely:', choices: ['take another one', 'split in half', 'give it away', 'share it'], answer: 2, hint: 'Which is less work — losing one, or collecting seven?', explain: 'Dropping one spare electron leaves a full layer underneath. Collecting seven more would be absurd by comparison.' },
          { type: 'numeric', prompt: 'How many electrons fill an atom’s innermost layer?', answer: 2, hint: 'It is the smallest layer, and helium has exactly enough to fill it.', explain: 'Two. Helium has two electrons and that layer is full — which is why helium reacts with nothing.' },
        ],
      },

      /* ---- ch4 ---------------------------------------------------------- */
      {
        id: 'ch4', tag: 'Bonding', title: 'Give, or Share',
        subtitle: 'Day 4 · The two bonds that build almost everything',
        pages: [
          { title: 'When one atom hands an electron over', blocks: [
            { type: 'text', text: 'Sodium gives its spare electron to chlorine. Now sodium is one electron short of balanced and carries a positive charge; chlorine has one extra and carries a negative one. Opposite charges pull, and that pull holds them together.' },
            { type: 'concept', term: 'Ionic bond', def: 'A bond formed when one atom transfers an electron to another and the resulting opposite charges attract.' },
          ]},
          { title: 'When neither will let go', blocks: [
            { type: 'text', text: 'Two atoms that both need electrons cannot both take. So they share a pair, and the shared pair counts as belonging to both of them at once. Both outer layers read as full, and neither atom has to lose.' },
            { type: 'concept', term: 'Covalent bond', def: 'A bond formed when two atoms share a pair of electrons, so both count the pair toward a full outer layer.' },
          ]},
          { title: 'You can hear the difference', blocks: [
            { type: 'text', text: 'Ionic bonds lock into a rigid grid where every charge pulls on its neighbours, which takes enormous energy to break apart — table salt melts at 801°C. Covalent water melts at 0°C, because water molecules only cling loosely to each other.' },
            { type: 'example', text: 'Metal plus non-metal usually gives you an ionic bond. Two non-metals usually share. That rule of thumb gets you a long way before it ever fails you.' },
          ]},
          { title: 'Same atoms, different answer', blocks: [
            { type: 'text', text: 'Diamond and graphite are both nothing but carbon. Not similar to carbon — carbon, entirely. The difference is only how the atoms are bonded to each other: a rigid three-dimensional frame, or flat sheets that slide.' },
            { type: 'callout', text: 'The hardest natural substance on Earth and the stuff inside a pencil are the same element. Arrangement is not a detail.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'Physical Science day 3 defined a force as a push or a pull that changes motion. An ionic bond is literally that — the pull between a positive charge and a negative one, doing its work at a scale you cannot see.' },
          ]},
        ],
        recap: [
          'An ionic bond transfers an electron, and opposite charges hold the result together.',
          'A covalent bond shares a pair so both atoms count it.',
          'Ionic solids melt at far higher temperatures than most covalent ones.',
          'Diamond and graphite are both pure carbon — the bonding pattern is the whole difference.',
        ],
        quiz: [
          { type: 'mc', prompt: 'In an ionic bond, electrons are:', choices: ['shared equally', 'destroyed', 'split in half', 'transferred from one atom to the other'], answer: 3, hint: 'One atom ends up positive, the other negative. How?', explain: 'One atom hands an electron over, creating the opposite charges that then attract.' },
          { type: 'mc', prompt: 'Two non-metals that both need electrons will most likely:', choices: ['share a pair', 'both give electrons away', 'refuse to bond', 'form an ionic bond'], answer: 0, hint: 'Neither one can take if neither one will give.', explain: 'Sharing lets both count the same pair toward a full outer layer.' },
          { type: 'tf', prompt: 'Diamond and graphite are made of different elements.', answer: false, hint: 'Check what each is actually made of.', explain: 'Both are pure carbon. Only the bonding arrangement differs — and that alone produces the hardest natural substance and pencil lead.' },
          { type: 'mc', prompt: 'Salt melts at 801°C and water at 0°C mainly because:', choices: ['salt crystals are larger', 'water is a liquid already', 'ionic bonds in a grid take far more energy to break', 'salt is heavier'], answer: 2, hint: 'What is holding each one together?', explain: 'Every ion in the salt grid is pulled on by its neighbours. Water molecules only cling loosely to each other.' },
        ],
      },

      /* ---- ch5 ---------------------------------------------------------- */
      {
        id: 'ch5', tag: 'Formulas', title: 'Reading a Formula',
        subtitle: 'Day 5 · Three rules, and you can read any of them',
        pages: [
          { title: 'The small number counts backwards', blocks: [
            { type: 'text', text: 'In H2O, the small 2 belongs to the H in front of it, not to the O. Two hydrogen atoms, one oxygen. A symbol with no number after it means exactly one.' },
            { type: 'concept', term: 'Subscript', def: 'The small number after an element symbol. It counts the atoms of that element only.' },
          ]},
          { title: 'Brackets multiply everything inside', blocks: [
            { type: 'text', text: 'Ca(OH)2 does not mean one calcium, one oxygen and two hydrogens. The 2 applies to the whole bracket: one calcium, two oxygens, two hydrogens.' },
            { type: 'example', text: 'Same rule as 3(x + 4) in algebra — the multiplier outside reaches everything inside the bracket, not just the last thing in it.' },
          ]},
          { title: 'The big number in front multiplies all of it', blocks: [
            { type: 'text', text: 'A number written in front of a whole formula is a coefficient, and it multiplies every atom in that formula. 3H2O is six hydrogen atoms and three oxygen atoms — three separate water molecules.' },
            { type: 'callout', text: 'Subscript multiplies one symbol. Coefficient multiplies the whole thing. Getting those two backwards is the single most common mistake here, and now you know to check.' },
          ]},
          { title: 'The ratio is what a compound is', blocks: [
            { type: 'text', text: 'Water is always two hydrogens to one oxygen. Not usually, not on average — always, in every drop that has ever existed. Change the ratio and it is not water any more.' },
            { type: 'example', text: 'H2O2 is two hydrogens to two oxygens. One extra oxygen atom per molecule, and the result is hydrogen peroxide, which bleaches hair and disinfects cuts.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'Mathematics day 1 said a ratio holds no matter how much you scale it — 2 to 1 is the same relationship whether you have two cups or two thousand. A chemical formula is a ratio that nature refuses to let you round.' },
          ]},
        ],
        recap: [
          'A subscript counts only the symbol immediately before it.',
          'A bracket subscript multiplies everything inside the bracket.',
          'A coefficient in front multiplies every atom in the formula.',
          'A compound is defined by a fixed ratio — H2O2 is not water.',
        ],
        quiz: [
          { type: 'numeric', prompt: 'How many hydrogen atoms are in 3H2O?', answer: 6, hint: 'The 3 out front multiplies everything, including the 2.', explain: '3 × 2 = 6 hydrogen atoms, alongside 3 oxygen atoms.' },
          { type: 'numeric', prompt: 'How many oxygen atoms are in Ca(OH)2?', answer: 2, hint: 'The 2 applies to the whole bracket, not just the H.', explain: 'One O inside the bracket, doubled by the 2 outside it. Two oxygen atoms.' },
          { type: 'mc', prompt: 'H2O2 is not water because:', choices: ['it is a gas', 'the ratio of atoms is different', 'it has more hydrogen', 'the atoms are heavier'], answer: 1, hint: 'Count the atoms of each element in both.', explain: 'Water is 2:1 hydrogen to oxygen. H2O2 is 2:2 — one extra oxygen per molecule, and a completely different substance.' },
          { type: 'numeric', prompt: 'How many atoms in total are in one molecule of CO2?', answer: 3, hint: 'One carbon, and then read the subscript.', explain: 'One carbon plus two oxygens is three atoms.' },
        ],
      },

      /* ---- ch6 ---------------------------------------------------------- */
      {
        id: 'ch6', tag: 'Reactions', title: 'Nothing Is Lost',
        subtitle: 'Day 6 · Why equations have to balance',
        pages: [
          { title: 'Atoms are not created or destroyed', blocks: [
            { type: 'text', text: 'Lavoisier weighed reactions in sealed containers and found the mass afterward always matched the mass before, exactly. He published the result in 1789 and it has held up ever since. Burning something in the open only looks like it loses mass because the gases escape.' },
            { type: 'concept', term: 'Conservation of mass', def: 'In a chemical reaction, atoms are rearranged. None are created and none are destroyed, so the total mass does not change.' },
          ]},
          { title: 'So both sides must match', blocks: [
            { type: 'text', text: 'If eight hydrogen atoms go in, eight hydrogen atoms come out — as part of something else, but all eight are still there. An equation with four oxygens on the left and three on the right is not describing anything real.' },
            { type: 'visual', kind: 'scale', left: '2 H₂ + O₂', right: '2 H₂O' },
          ]},
          { title: 'You may change the front numbers only', blocks: [
            { type: 'text', text: 'To balance an equation you adjust coefficients — the big numbers in front. You may never touch a subscript, because changing a subscript changes what the substance is.' },
            { type: 'callout', text: 'Turning H2O into H2O2 to make the oxygens line up is not balancing. It is quietly swapping water for bleach and hoping nobody notices.' },
          ]},
          { title: 'What the finished equation says', blocks: [
            { type: 'text', text: 'Read 2H2 + O2 → 2H2O out loud: two hydrogen molecules and one oxygen molecule make two water molecules. Four hydrogen atoms on each side, two oxygen atoms on each side. Nothing has appeared and nothing has gone.' },
            { type: 'formula', text: '2H₂ + O₂ → 2H₂O', label: 'balanced — count each element on both sides' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'Physical Science day 4 said energy is never destroyed, only converted. This is the same promise made about matter, and the two together are close to the whole foundation of science: whatever changes, the books still have to balance.' },
          ]},
        ],
        recap: [
          'Atoms are rearranged in a reaction, never created or destroyed.',
          'Every element must appear in equal numbers on both sides.',
          'You balance by changing coefficients, never subscripts.',
          'Changing a subscript changes the substance itself.',
        ],
        quiz: [
          { type: 'mc', prompt: 'A burning log seems to lose mass because:', choices: ['gases escape into the air', 'heat has negative mass', 'mass turns into light', 'atoms are destroyed by fire'], answer: 0, hint: 'What would happen if you did it in a sealed jar?', explain: 'Weigh the jar and nothing changes. The mass left as carbon dioxide and water vapour.' },
          { type: 'tf', prompt: 'You can balance an equation by changing a subscript.', answer: false, hint: 'What does a subscript actually control?', explain: 'A subscript defines the substance. Change it and you are describing a different chemical, not balancing the same one.' },
          { type: 'numeric', prompt: 'In 2H₂ + O₂ → 2H₂O, how many hydrogen atoms are on the left side?', answer: 4, hint: 'Coefficient 2, subscript 2.', explain: '2 × 2 = 4 hydrogen atoms — and the right side has 2 × 2 = 4 as well.' },
          { type: 'mc', prompt: 'Conservation of mass says that in a reaction:', choices: ['the substances stay the same', 'mass always increases', 'the total number of atoms stays the same', 'mass turns into energy'], answer: 2, hint: 'What is being conserved — the substances, or the atoms?', explain: 'The substances change completely. The atoms are all still there, rearranged.' },
        ],
      },

      /* ---- ch7 ---------------------------------------------------------- */
      {
        id: 'ch7', tag: 'Energy', title: 'Reactions That Heat and Cool',
        subtitle: 'Day 7 · Where the warmth actually comes from',
        pages: [
          { title: 'Breaking costs, building pays', blocks: [
            { type: 'text', text: 'Pulling a bond apart takes energy in. Forming a new bond gives energy out. Every reaction does both — old bonds break, new ones form — so what you feel is only the difference between the two.' },
            { type: 'concept', term: 'Net energy', def: 'Energy released by forming new bonds, minus energy spent breaking old ones. Its sign decides whether a reaction warms or cools.' },
          ]},
          { title: 'When building pays more', blocks: [
            { type: 'text', text: 'If the new bonds release more than the old ones cost, the leftover leaves as heat and the surroundings get warmer. Burning anything works this way, and so does the chemical hand warmer in a ski jacket.' },
            { type: 'concept', term: 'Exothermic', def: 'A reaction that releases more energy than it absorbs. The surroundings warm up.' },
          ]},
          { title: 'When breaking costs more', blocks: [
            { type: 'text', text: 'If breaking the old bonds costs more than the new ones give back, the difference has to come from somewhere — so it is pulled in from the surroundings, which get colder. Snap an instant cold pack and that is what you are feeling: the salt inside dissolving, pulling energy in as it goes.' },
            { type: 'concept', term: 'Endothermic', def: 'A reaction that absorbs more energy than it releases. The surroundings cool down.' },
          ]},
          { title: 'The most important endothermic reaction there is', blocks: [
            { type: 'text', text: 'Photosynthesis absorbs energy — that is the entire point of it. Sunlight goes in, and the energy comes out stored inside a sugar molecule where it can sit for as long as the plant lives.' },
            { type: 'formula', text: '6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂', label: 'sunlight in, energy stored in sugar' },
            { type: 'callout', text: 'Nearly all the food on Earth is energy that took this route. So is coal, and so is petrol — sunlight that a plant caught, stored in bonds, and never got round to spending.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'Biology day 3 taught photosynthesis as how plants get energy. Physical Science day 4 said energy is never destroyed, only converted. Put them together and you have just read the receipt: sunlight converted into chemical bonds, still exactly as much energy as arrived.' },
          ]},
        ],
        recap: [
          'Breaking bonds absorbs energy; forming bonds releases it.',
          'Exothermic means the net release warms the surroundings.',
          'Endothermic means the net absorption cools them.',
          'Photosynthesis is endothermic — it stores sunlight in chemical bonds.',
        ],
        quiz: [
          { type: 'mc', prompt: 'An exothermic reaction:', choices: ['absorbs energy and cools its surroundings', 'releases energy and warms its surroundings', 'neither absorbs nor releases energy', 'destroys energy'], answer: 1, hint: '"Exo" means out.', explain: 'The new bonds release more than the old ones cost, and the leftover leaves as heat.' },
          { type: 'tf', prompt: 'Breaking a chemical bond releases energy.', answer: false, hint: 'Which direction takes effort — pulling apart, or joining up?', explain: 'Breaking a bond costs energy. Forming one releases it. Mixing those up reverses every prediction you would make.' },
          { type: 'mc', prompt: 'An instant cold pack gets cold because what happens inside it:', choices: ['releases heat downward', 'contains ice', 'has no energy', 'absorbs more energy than it releases'], answer: 3, hint: 'Where is the cold coming from?', explain: 'It is endothermic. The energy it needs is pulled in from its surroundings, including your hand.' },
          { type: 'mc', prompt: 'Photosynthesis is endothermic, which means it:', choices: ['stores absorbed energy in sugar', 'destroys sunlight', 'gives off heat', 'happens only at night'], answer: 0, hint: 'What does the plant end up with that it did not have before?', explain: 'Light energy goes in and is stored in the bonds of a sugar molecule. Nothing is created — it is converted, exactly as Physical Science promised.' },
        ],
      },

      /* ---- ch8 ---------------------------------------------------------- */
      {
        id: 'ch8', tag: 'Solutions', title: 'Acids, Bases and pH',
        subtitle: 'Day 8 · A scale where every step is ten times',
        pages: [
          { title: 'Two opposites and a middle', blocks: [
            { type: 'text', text: 'Acids taste sour and react with metals — lemon juice, vinegar, the acid in your stomach. Bases feel slippery and dissolve grease — baking soda, soap, oven cleaner. pH measures which one you have, from 0 to 14, with 7 as neutral.' },
            { type: 'concept', term: 'pH', def: 'A 0 to 14 scale of how acidic or basic a solution is. Below 7 is acidic, 7 is neutral, above 7 is basic.' },
          ]},
          { title: 'The steps are not equal', blocks: [
            { type: 'text', text: 'This is where nearly everyone reads the scale wrong. pH 3 is not "a bit more acidic" than pH 4. It is ten times more acidic. And pH 2 is a hundred times more acidic than pH 4, because each step multiplies by ten again.' },
            { type: 'formula', text: 'difference of n steps = 10ⁿ times', label: '3 steps apart is 10 × 10 × 10 = 1000 times' },
          ]},
          { title: 'Why that changes what you conclude', blocks: [
            { type: 'text', text: 'Normal rain is about pH 5.6 — slightly acidic on its own, from dissolved carbon dioxide. Acid rain around pH 4.2 sounds like a small shift. It is about twenty-five times more acidic, which is why it strips leaves and eats stone.' },
            { type: 'callout', text: 'A scale that hides multiplication inside a small-looking number will fool anyone who does not know it is doing that. Now you know.' },
          ]},
          { title: 'They cancel each other', blocks: [
            { type: 'text', text: 'Mix an acid and a base and they neutralise, producing a salt and water. That is exactly what an antacid tablet does to the excess acid in a sore stomach, and what baking soda does to a vinegar spill.' },
            { type: 'example', text: 'acid + base → salt + water. "Salt" here means any ionic compound of that kind, not only the one on the dinner table.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'Mathematics day 7 gave you exponents — repeated multiplication by a fixed factor. Computer Science day 2 gave you binary, where each place doubles. pH is the same machinery with a factor of ten, which is why one step on the scale is such a large step in the world.' },
          ]},
        ],
        recap: [
          'pH runs 0 to 14; below 7 is acidic, above 7 is basic, 7 is neutral.',
          'Each step on the scale is a factor of ten.',
          'Small-looking pH differences are large chemical differences.',
          'Acid plus base neutralises to a salt and water.',
        ],
        quiz: [
          { type: 'numeric', prompt: 'How many times more acidic is pH 3 than pH 5?', answer: 100, hint: 'Two steps, and each step is a factor of ten.', explain: '10 × 10 = 100 times. The scale multiplies rather than adds.' },
          { type: 'mc', prompt: 'A solution with pH 9 is:', choices: ['neutral', 'basic', 'acidic', 'not measurable'], answer: 1, hint: 'Which side of 7 is it on?', explain: 'Above 7 is basic. Baking soda solution sits around there.' },
          { type: 'tf', prompt: 'pH 4 is only slightly more acidic than pH 6.', answer: false, hint: 'Count the steps, then remember what each step does.', explain: 'Two steps means a hundred times more acidic. Nothing about that is slight.' },
          { type: 'mc', prompt: 'Mixing an acid with a base produces:', choices: ['nothing at all', 'a stronger acid', 'a salt and water', 'a gas only'], answer: 2, hint: 'What is an antacid tablet doing?', explain: 'They neutralise each other, leaving a salt and water behind.' },
        ],
      },

      /* ---- ch9 ---------------------------------------------------------- */
      {
        id: 'ch9', tag: 'Solutions', title: 'Mixed, or Combined',
        subtitle: 'Day 9 · The difference a bond makes',
        pages: [
          { title: 'A mixture keeps its parts', blocks: [
            { type: 'text', text: 'Stir sand into salt and you have a mixture. No bonds formed, no ratio required, and each part still behaves like itself. A compound is the opposite on all three counts: bonded, fixed ratio, and new properties entirely.' },
            { type: 'concept', term: 'Mixture', def: 'Substances physically together but not bonded. Any ratio works, and each keeps its own properties.' },
          ]},
          { title: 'Sodium, chlorine, and dinner', blocks: [
            { type: 'text', text: 'Sodium is a metal so reactive it catches fire in water. Chlorine is a poisonous green gas. Bond them and you get table salt, which you sprinkle on chips. A compound does not average its ingredients — it replaces them.' },
            { type: 'callout', text: 'This is the strongest argument in chemistry for why bonding matters. Nothing about sodium or chlorine predicts salt.' },
          ]},
          { title: 'Dissolving is not disappearing', blocks: [
            { type: 'text', text: 'Salt stirred into water vanishes from sight, but the salt is still there, spread through the water as a solution. The thing dissolving is the solute, the thing doing the dissolving is the solvent.' },
            { type: 'concept', term: 'Solution', def: 'A mixture where a solute is spread evenly through a solvent. It is a mixture, not a compound — nothing has bonded.' },
          ]},
          { title: 'Concentration is a rate', blocks: [
            { type: 'text', text: 'How much solute per unit of solvent — grams per litre. Seawater carries about 35 grams of salt in every litre, which is why it tastes the way it does and why you cannot drink it.' },
            { type: 'example', text: 'Leave seawater in a shallow pan in the sun and the water evaporates while the salt stays. That is a physical separation, and it is how sea salt has been made for thousands of years.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'Earth & Space day 3 traced the water cycle: water evaporates, leaves everything dissolved in it behind, and falls as fresh rain. That is why rivers are fresh and the sea is salty — the water leaves, the salt cannot, and it has been collecting for a very long time.' },
          ]},
        ],
        recap: [
          'A mixture is unbonded, any ratio, parts keep their properties.',
          'A compound is bonded, fixed ratio, with entirely new properties.',
          'A solution is a solute spread evenly through a solvent — still a mixture.',
          'Concentration is a rate: amount of solute per unit of solvent.',
        ],
        quiz: [
          { type: 'mc', prompt: 'The main difference between a mixture and a compound is that in a compound the substances are:', choices: ['always solid', 'evenly spread out', 'heavier', 'chemically bonded in a fixed ratio'], answer: 3, hint: 'Can you pick the parts back out?', explain: 'Bonding and a fixed ratio. That is also why a compound has new properties instead of shared ones.' },
          { type: 'numeric', prompt: 'A solution has 12 grams of salt dissolved in 3 litres of water. What is the concentration in grams per litre?', answer: 4, hint: 'Per litre means divide by the number of litres.', explain: '12 ÷ 3 = 4 g/L. Same unit-rate move as Mathematics day 1.' },
          { type: 'tf', prompt: 'Salt dissolving in water is a chemical change.', answer: false, hint: 'Can you get the salt back unchanged?', explain: 'Evaporate the water and the salt returns exactly as it was. Nothing bonded; it is a physical change.' },
          { type: 'mc', prompt: 'Table salt is safe to eat even though sodium is violently reactive and chlorine is poisonous, because:', choices: ['a compound has entirely new properties', 'they cancel each other out', 'cooking removes the danger', 'the amounts are tiny'], answer: 0, hint: 'What does bonding actually do to the ingredients?', explain: 'A compound does not average its ingredients — it replaces them with something new.' },
        ],
      },

      /* ---- ch10 --------------------------------------------------------- */
      {
        id: 'ch10', tag: 'Reactions', title: 'What Makes It Go Faster',
        subtitle: 'Day 10 · Reactions are a collision problem',
        pages: [
          { title: 'Particles have to actually meet', blocks: [
            { type: 'text', text: 'Nothing reacts at a distance. Two particles must collide, and collide hard enough to break the bonds already there. A collision that is too gentle just bounces.' },
            { type: 'concept', term: 'Activation energy', def: 'The minimum energy a collision needs before a reaction can happen at all.' },
          ]},
          { title: 'So speed it up by arranging more collisions', blocks: [
            { type: 'text', text: 'Heat it and the particles move faster, so they collide more often and hit harder. Concentrate it and there are more particles in the same space to run into. Break it into smaller pieces and far more of it is exposed surface where collisions can happen.' },
            { type: 'example', text: 'A log takes a while to catch. The same wood as sawdust can explode, because almost every particle is on the surface at once.' },
          ]},
          { title: 'Or lower the bar instead', blocks: [
            { type: 'text', text: 'A catalyst offers the reaction an easier route — one needing less activation energy — so more of the ordinary collisions are now hard enough to work. The catalyst is not used up. It does the same job again immediately.' },
            { type: 'concept', term: 'Catalyst', def: 'A substance that speeds a reaction by lowering the energy a collision needs, without being consumed by it.' },
          ]},
          { title: 'Your body runs on catalysts', blocks: [
            { type: 'text', text: 'Enzymes are biological catalysts. Digesting a meal without them would take far longer than a lifetime at body temperature — you cannot solve that by heating yourself up, so evolution solved it by lowering the bar instead.' },
            { type: 'callout', text: 'Each enzyme fits one specific reaction, the way a key fits one lock. That is why there are thousands of different ones rather than one general-purpose enzyme.' },
          ]},
          { title: 'Where you have seen this before', blocks: [
            { type: 'callout', text: 'Physical Science day 5 said temperature is really how fast particles are moving. That is the whole explanation for why heating speeds a reaction — you are not adding urgency, you are adding collisions.' },
          ]},
        ],
        recap: [
          'A reaction needs collisions with enough energy — the activation energy.',
          'Heat, concentration and surface area all increase useful collisions.',
          'A catalyst lowers the energy needed and is not used up.',
          'Enzymes are the catalysts your body runs on.',
        ],
        quiz: [
          { type: 'mc', prompt: 'Heating a reaction speeds it up because the particles:', choices: ['become more reactive elements', 'weigh less', 'get bigger', 'move faster and collide more often'], answer: 3, hint: 'What does temperature actually measure?', explain: 'Temperature is particle motion. Faster particles collide more often and hit harder.' },
          { type: 'tf', prompt: 'A catalyst is used up by the reaction it speeds up.', answer: false, hint: 'Could it work on a second batch?', explain: 'It comes out unchanged and immediately does the job again. That is what makes enzymes practical.' },
          { type: 'mc', prompt: 'Sawdust burns far faster than a solid log because:', choices: ['it is a different substance', 'far more of it is exposed surface', 'it weighs less', 'it is drier'], answer: 1, hint: 'Where can collisions actually happen?', explain: 'Almost every particle is on a surface, so almost all of it can react at once.' },
          { type: 'mc', prompt: 'Enzymes are important in living things because they:', choices: ['store energy', 'raise body temperature', 'make reactions fast enough at body temperature', 'destroy waste'], answer: 2, hint: 'You cannot cook yourself to speed up digestion.', explain: 'They lower the activation energy, which is the only lever available when you cannot raise the heat.' },
        ],
      },
    ],
  },
};
