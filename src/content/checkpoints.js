/* Checkpoint days for the restored lanes.
 *
 * These re-teach nothing. Each one takes the six days of its lane and shows
 * they were building one thing, not six separate things. The math lane
 * already had two of these (mr1, mr2) and they are the strongest days in
 * the whole curriculum — the moment ratio, unit rate, proportion and slope
 * turn out to be one idea in four costumes is worth more than any new
 * material would be.
 *
 * Structure follows the math checkpoints: five pages, seven questions, all
 * drawn from ground already covered. Nothing here should be answerable only
 * by someone who read this specific day. */

export const CHECKPOINTS = {
  physics: [
    {
      id: 'phyr1', tag: 'Checkpoint', title: 'What Things Are, and What They Do',
      subtitle: 'Checkpoint · Six days, one story',
      pages: [
        { title: 'Look at what you built', blocks: [
          { type: 'text', text: 'Matter. Atoms. Forces. Energy. Heat. Waves. Six days that probably felt like six subjects. They are one.' },
          { type: 'callout', text: 'Read the next four pages and watch them collapse into a single sentence.' },
        ]},
        { title: 'Everything is particles', blocks: [
          { type: 'text', text: 'States of matter were about particle spacing. Atoms were what those particles are. Temperature turned out to be how fast they are moving. Three separate days, all describing the same particles from different distances.' },
          { type: 'visual', kind: 'particles' },
        ]},
        { title: 'Everything that changes needs energy', blocks: [
          { type: 'text', text: 'Melting ice needs energy. Accelerating a mass needs force acting over distance, which is energy. Heating something is energy moving in. A wave is energy travelling without carrying matter along.' },
          { type: 'formula', text: 'change ⇒ energy', label: 'the thread running through all six days' },
        ]},
        { title: 'And nothing is ever lost', blocks: [
          { type: 'text', text: 'A ball stops and the floor warms. Ice melts and the room cools slightly. A wave fades and the medium warms. Every apparent loss is a transfer you can follow.' },
          { type: 'callout', text: 'One sentence for six days: matter is particles, change costs energy, and the total never changes.' },
        ]},
        { title: 'Why this matters more than the facts', blocks: [
          { type: 'text', text: 'Facts you can look up. What you cannot look up is the sense that a new physics problem is probably one of these three things wearing a hat you have not seen. That instinct is what you actually built.' },
        ]},
      ],
      recap: [
        'Matter, atoms and temperature all describe the same particles.',
        'Every change costs energy in some form.',
        'Energy converts but the total is conserved.',
      ],
      quiz: [
        { type: 'mc', prompt: 'Temperature is best understood as:', choices: ['the total energy contained in an object', 'how fast the particles move on average', 'how much heat has been added to it', 'how much matter the object contains'], answer: 1, hint: 'It is an average about motion.', explain: 'Average kinetic energy of the particles.' },
        { type: 'mc', prompt: 'Melting ice, speeding up a car and warming a room have what in common?', choices: ['all involve a chemical change of some kind', 'all need electricity to make them happen', 'all involve energy moving or changing form', 'all happen at a steady, constant rate'], answer: 2, hint: 'What has to move for any of them to happen?', explain: 'Every one is energy being transferred. Different subjects, one mechanism underneath.' },
        { type: 'mc', prompt: 'A ball rolls to a stop. Where did the energy go?', choices: ['it had no energy to begin with', 'into the mass of the ball itself', 'it was destroyed by the friction', 'into heat in the floor and the air'], answer: 3, hint: 'Follow the friction.', explain: 'Converted to heat. The books still balance.' },
        { type: 'numeric', prompt: 'A 5 kg object accelerates at 4 m/s². What force acts on it, in newtons?', answer: 20, hint: 'F = m × a.', explain: '5 × 4 = 20 N.' },
        { type: 'mc', prompt: 'Which of these is NOT made of particles of matter?', choices: ['a beam of light from a torch', 'steam rising from a kettle', 'ice in a glass of water', 'the air inside a balloon'], answer: 0, hint: 'One of these is pure energy.', explain: 'Light is energy travelling, not matter.' },
        { type: 'mc', prompt: 'Which can cross the vacuum of space?', choices: ['both sound and light', 'light only', 'sound only', 'neither'], answer: 1, hint: 'One of them reaches us from the Sun.', explain: 'Light needs nothing to travel through. Sound needs particles to bump into, so space is silent.' },
        { type: 'mc', prompt: 'The single idea holding all six days together is best stated as:', choices: ['forces are what cause all motion', 'everything is ultimately made of atoms', 'matter is particles, and change costs energy', 'energy is another word for heat'], answer: 2, hint: 'Which one covers all six days rather than one?', explain: 'The other options are each true but only cover part of it.' },
      ],
    },
  ],

  logic: [
    {
      id: 'lgr1', tag: 'Checkpoint', title: 'One Toolkit, Six Days',
      subtitle: 'Checkpoint · What you can now do to any argument',
      pages: [
        { title: 'You built a machine', blocks: [
          { type: 'text', text: 'Statements. And, or, not. If-then. Valid versus true. Fallacies. Proof and counterexample. Six days that assemble into a single procedure you can run on anything anyone claims.' },
        ]},
        { title: 'Step one: is there a claim at all', blocks: [
          { type: 'text', text: 'Questions, commands and pure feelings carry no truth value. Before you can evaluate anything, there has to be a statement — something that could be true or false.' },
          { type: 'example', text: '"This is outrageous" is not a claim you can test. "This policy raised costs by 30%" is. Notice how often the first kind is used where the second is needed.' },
        ]},
        { title: 'Step two: does the reasoning hold', blocks: [
          { type: 'text', text: 'Given the premises, does the conclusion actually follow? That is validity, and it is completely separate from whether the premises are true. Both have to be checked, and people usually check neither.' },
          { type: 'visual', kind: 'argument' },
        ]},
        { title: 'Step three: look for the usual failures', blocks: [
          { type: 'text', text: 'Circular reasoning. Correlation mistaken for cause. A false dilemma hiding the options. Converse confusion. Four patterns cover an enormous share of bad arguments you will ever meet.' },
        ]},
        { title: 'And the asymmetry underneath all of it', blocks: [
          { type: 'callout', text: 'One counterexample destroys a universal claim; no pile of examples proves one. That single asymmetry is why proof exists, why science never says "proved", and why one good objection outweighs ten agreements.' },
        ]},
      ],
      recap: [
        'First check there is a testable claim at all.',
        'Validity and true premises are separate checks; do both.',
        'One counterexample beats any number of supporting examples.',
      ],
      quiz: [
        { type: 'mc', prompt: '"This is outrageous" cannot be evaluated logically because it:', choices: ['has no evidence', 'is too short', 'is unpopular', 'carries no truth value'], answer: 3, hint: 'Could it be true or false?', explain: 'It is not a statement, so logic has nothing to work with.' },
        { type: 'mc', prompt: 'A valid argument with a false conclusion tells you:', choices: ['at least one premise was false', 'the reasoning was faulty', 'validity does not exist', 'the conclusion must actually be true'], answer: 0, hint: 'Remember the flying penguins.', explain: 'Valid means the conclusion follows IF the premises hold. Feed good reasoning a false premise and it delivers a false conclusion faithfully.' },
        { type: 'mc', prompt: 'Ice cream sales and drownings both rise in summer. Concluding one causes the other is:', choices: ['a valid argument from the data', 'mistaking correlation for cause', 'a counterexample to the claim', 'circular reasoning about heat'], answer: 1, hint: 'What third thing explains both?', explain: 'Hot weather drives both.' },
        { type: 'numeric', prompt: 'How many counterexamples does it take to disprove "all X are Y"?', answer: 1, hint: 'Think of the black swan.', explain: 'One, permanently.' },
        { type: 'mc', prompt: '"If it rains the game is cancelled. The game was cancelled, so it rained." This is:', choices: ['proof by considering separate cases', 'a valid argument from true premises', 'confusing a conditional with its converse', 'a false dilemma with two options'], answer: 2, hint: 'Could the game be cancelled for another reason?', explain: 'The converse is a different claim.' },
        { type: 'mc', prompt: 'In logic, “A or B” is true when:', choices: ['exactly one of the two is true', 'neither one of them is true', 'both of them are true together', 'at least one is true, including both'], answer: 3, hint: 'Logical OR is inclusive.', explain: 'At least one. Both counts as yes — which is where logical OR parts company with the everyday “one or the other”.' },
        { type: 'mc', prompt: 'The reasoning holds, but one premise turns out to be false. The argument is:', choices: ['valid but not sound', 'invalid, because the conclusion fails', 'circular, since it assumes itself', 'sound, since the logic is correct'], answer: 0, hint: 'Soundness needs both halves — good reasoning AND true premises.', explain: 'Valid reasoning with a false premise. Valid, but not sound.' },
      ],
    },
  ],

  earth: [
    {
      id: 'esr1', tag: 'Checkpoint', title: 'Systems at Every Scale',
      subtitle: 'Checkpoint · From the core to the moon, one pattern',
      pages: [
        { title: 'Six days, one shape', blocks: [
          { type: 'text', text: 'Earth’s layers. Moving plates. The water cycle. Weather and climate. The sun and moon. Gravity and orbits. Wildly different sizes, and all of them the same kind of thing: a system where energy moves and matter cycles.' },
        ]},
        { title: 'Energy in, motion out', blocks: [
          { type: 'text', text: 'Heat from the core drives plates. Heat from the sun drives evaporation, wind and weather. Both are energy entering a system and coming out as movement.' },
          { type: 'visual', kind: 'flow', steps: ['Energy in', 'Motion', 'Transfer', 'Cycle'] },
        ]},
        { title: 'Matter goes around, not away', blocks: [
          { type: 'text', text: 'Water cycles. Rock cycles — layers form, get buried, melt, and return. Nothing leaves the planet. Every system you studied is a loop rather than a line.' },
        ]},
        { title: 'Reading what you cannot see', blocks: [
          { type: 'text', text: 'Nobody visited the mantle or watched the continents split. Every one of those conclusions came from evidence left behind: wave speeds, matching fossils, rock layers, ice cores.' },
          { type: 'callout', text: 'Same discipline as the Fossils lane, and the same as citing a sentence in English. Point at the evidence.' },
        ]},
        { title: 'The scale is the only thing that changes', blocks: [
          { type: 'text', text: 'A raindrop and an orbit obey the same rules. What differs is size and timescale — which is exactly why the tools you learned on one scale keep working on another.' },
        ]},
      ],
      recap: [
        'Core heat and solar heat drive Earth’s systems.',
        'Matter cycles rather than leaving.',
        'The interior and the past are both read from evidence, not observed.',
      ],
      quiz: [
        { type: 'mc', prompt: 'What drives most weather?', choices: ['the moon’s gravity', 'uneven heating by the sun', 'plate movement', 'the water cycle'], answer: 1, hint: 'Compare the equator with the poles.', explain: 'The heating difference sets air in motion.' },
        { type: 'mc', prompt: 'The water in your glass has most likely:', choices: ['been made by rain in the last month', 'arrived recently on a comet or meteor', 'been through the cycle countless times', 'been created by plants during growth'], answer: 2, hint: 'Where does water go when it seems to disappear?', explain: 'The same water has cycled since long before the dinosaurs.' },
        { type: 'mc', prompt: 'How do we know what Earth’s interior is made of?', choices: ['volcano samples only', 'deep drilling', 'satellite images', 'earthquake wave speeds'], answer: 3, hint: 'No drill has reached the mantle.', explain: 'Seismic waves change speed in different materials.' },
        { type: 'mc', prompt: 'Earth’s seasons are caused by:', choices: ['the tilt of the axis', 'the moon', 'ocean currents', 'distance from the sun'], answer: 0, hint: 'Earth is closest to the sun in January.', explain: 'Axial tilt changes how directly sunlight lands.' },
        { type: 'numeric', prompt: 'Double the distance between two objects and gravity drops to one over what number?', answer: 4, hint: 'Square the 2.', explain: '2² = 4, so one quarter.' },
        { type: 'mc', prompt: 'An orbit is best described as:', choices: ['a region where gravity cannot reach', 'falling while moving sideways fast', 'being held up by sheer speed alone', 'floating in a balance of two forces'], answer: 1, hint: 'Why does the Moon never land?', explain: 'It falls constantly and travels sideways fast enough that the ground keeps curving away. An orbit is a fall that never arrives.' },
        { type: 'mc', prompt: 'What do Earth’s interior, the deep past and a text’s meaning have in common?', choices: ['they all require a microscope to see', 'they are all completely unknowable', 'they are all reconstructed from evidence', 'they can all be observed directly'], answer: 2, hint: 'Which one can you actually watch happen?', explain: 'None can be watched. All are read from traces.' },
      ],
    },
  ],
  chem: [
    {
      id: 'chr1', tag: 'Checkpoint', title: 'It Was Always Rearrangement',
      subtitle: 'Checkpoint · Ten days, one move',
      pages: [
        { title: 'Look at what you built', blocks: [
          { type: 'text', text: 'Two kinds of change. The periodic table. Valence electrons. Ionic and covalent bonds. Formulas. Balancing. Energy. pH. Solutions. Reaction rate. Ten days that probably felt like ten topics.' },
          { type: 'callout', text: 'There is one move underneath all of them, and you have been doing it since day one without anyone naming it.' },
        ]},
        { title: 'Nothing is ever made or destroyed', blocks: [
          { type: 'text', text: 'Day 1 said a chemical change rearranges atoms. Day 6 said the count on both sides has to match. Day 9 said dissolving hides salt without removing it. Day 7 said the energy is converted, never spent. Four days, four ways of saying the same sentence: the books balance.' },
          { type: 'visual', kind: 'scale', left: 'before', right: 'after' },
        ]},
        { title: 'Everything interesting happens on the outside', blocks: [
          { type: 'text', text: 'Valence electrons decide bonding. Bonding decides whether you get salt or water. Surface area decides how fast wood burns. Even the periodic table is arranged by what the outer layer is doing. The nucleus holds the mass and almost none of the story.' },
          { type: 'callout', text: 'Physical Science handed you that fact — nearly all the mass in the nucleus, nearly all the volume outside it — and it read as trivia. It was the whole of chemistry waiting.' },
        ]},
        { title: 'Small numbers, multiplied', blocks: [
          { type: 'text', text: 'One step of pH is ten times. One extra oxygen in H2O2 is a different substance. One electron given away turns a metal that burns in water into something you eat. Chemistry runs on small differences that are not small at all.' },
          { type: 'formula', text: '10ⁿ', label: 'the pH scale, exponents, binary — the same machinery each time' },
        ]},
        { title: 'What this actually bought you', blocks: [
          { type: 'callout', text: 'Physical Science stopped at the atom. Biology started at the cell. You have just filled in everything between them — which means photosynthesis, digestion, why the sea is salty and why a log burns are now the same subject, and you can explain all four.' },
        ]},
      ],
      recap: [
        'Every chemical change is a rearrangement — nothing is created or destroyed.',
        'Outer electrons decide almost everything an atom does.',
        'Small differences in chemistry are rarely small in effect.',
        'Chemistry is the bridge between physics and biology.',
      ],
      quiz: [
        { type: 'mc', prompt: 'Conservation of mass and conservation of energy are alike because both say:', choices: ['reactions are therefore impossible', 'matter and energy are the same thing', 'nothing in the universe ever changes', 'the total is unchanged, the form is not'], answer: 3, hint: 'What changes in a reaction, and what does not?', explain: 'Both are promises that the books balance while the contents are rearranged.' },
        { type: 'mc', prompt: 'An element’s chemical behaviour is decided mainly by:', choices: ['the electrons in its outermost shell', 'the number of protons', 'its total mass', 'the neutrons in its nucleus'], answer: 0, hint: 'Which part of an atom actually meets another atom?', explain: 'The valence electrons. It is why elements in the same column, with the same outer count, behave so alike.' },
        { type: 'numeric', prompt: 'How many times more acidic is pH 2 than pH 5?', answer: 1000, hint: 'Three steps, ten times each.', explain: '10 × 10 × 10 = 1000. The same exponent machinery as binary and compound interest.' },
        { type: 'mc', prompt: 'Salt is edible while sodium and chlorine are not, because a compound:', choices: ['contains less of each element', 'has entirely new properties', 'averages its ingredients', 'is always safe'], answer: 1, hint: 'Does bonding blend the ingredients, or replace them?', explain: 'Bonding replaces the ingredients rather than blending them.' },
        { type: 'mc', prompt: 'Photosynthesis and a burning log are opposites because one:', choices: ['is alive and the other one is not', 'uses water and the other does not', 'stores energy in bonds, the other frees it', 'happens in daylight, the other at night'], answer: 2, hint: 'Which direction is the energy flowing in each?', explain: 'Endothermic storage versus exothermic release — the same bonds, run in opposite directions.' },
        { type: 'mc', prompt: 'Why can changing a subscript never be used to balance an equation?', choices: ['subscripts cannot be changed', 'it is against the rules', 'it makes the numbers too large', 'it would change the substance itself'], answer: 3, hint: 'What does a subscript define?', explain: 'H2O and H2O2 are different chemicals. Editing a subscript answers a different question than the one asked.' },
        { type: 'mc', prompt: 'A catalyst speeds up a reaction by:', choices: ['lowering the energy needed to start it', 'being used up to supply the energy', 'raising the temperature of the mix', 'adding more reactant to the vessel'], answer: 0, hint: 'What happens to an enzyme after it has done its job?', explain: 'It lowers the activation energy and comes out unchanged, ready for the next one — which is why a tiny amount handles an enormous quantity.' },
      ],
    },
  ],
};
