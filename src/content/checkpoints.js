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
        { type: 'mc', prompt: 'Temperature is best understood as:', choices: ['how fast the particles are moving on average', 'how much matter is present', 'how much heat has been added', 'total energy in an object'], answer: 0, hint: 'It is an average about motion.', explain: 'Average kinetic energy of the particles.' },
        { type: 'tf', prompt: 'Melting, accelerating and heating all involve energy transfer.', answer: true, hint: 'What do all three have in common?', explain: 'Every change costs energy. That is the thread.' },
        { type: 'mc', prompt: 'A ball rolls to a stop. Where did the energy go?', choices: ['it was destroyed', 'into heat in the floor and air', 'into the ball’s mass', 'nowhere, it had none'], answer: 1, hint: 'Follow the friction.', explain: 'Converted to heat. The books still balance.' },
        { type: 'numeric', prompt: 'A 5 kg object accelerates at 4 m/s². What force acts on it, in newtons?', answer: 20, hint: 'F = m × a.', explain: '5 × 4 = 20 N.' },
        { type: 'mc', prompt: 'Which of these is NOT made of particles of matter?', choices: ['air', 'steam', 'a wave of light', 'ice'], answer: 2, hint: 'One of these is pure energy.', explain: 'Light is energy travelling, not matter.' },
        { type: 'tf', prompt: 'Sound and light both need a medium to travel through.', answer: false, hint: 'One of them crosses space.', explain: 'Sound needs particles; light does not.' },
        { type: 'mc', prompt: 'The single idea holding all six days together is best stated as:', choices: ['energy is heat', 'forces cause motion', 'everything is made of atoms', 'matter is particles, change costs energy, and the total is conserved'], answer: 3, hint: 'Which one covers all six days rather than one?', explain: 'The other options are each true but only cover part of it.' },
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
        { type: 'mc', prompt: '"This is outrageous" cannot be evaluated logically because it:', choices: ['carries no truth value', 'is unpopular', 'has no evidence', 'is too short'], answer: 0, hint: 'Could it be true or false?', explain: 'It is not a statement, so logic has nothing to work with.' },
        { type: 'tf', prompt: 'An argument can be valid and still have a false conclusion.', answer: true, hint: 'Remember the flying penguin.', explain: 'Valid reasoning from a false premise gives a false conclusion.' },
        { type: 'mc', prompt: 'Ice cream sales and drownings both rise in summer. Concluding one causes the other is:', choices: ['valid', 'mistaking correlation for cause', 'a counterexample', 'circular reasoning'], answer: 1, hint: 'What third thing explains both?', explain: 'Hot weather drives both.' },
        { type: 'numeric', prompt: 'How many counterexamples does it take to disprove "all X are Y"?', answer: 1, hint: 'Think of the black swan.', explain: 'One, permanently.' },
        { type: 'mc', prompt: '"If it rains the game is cancelled. The game was cancelled, so it rained." This is:', choices: ['a false dilemma', 'valid', 'confusing a conditional with its converse', 'proof by cases'], answer: 2, hint: 'Could the game be cancelled for another reason?', explain: 'The converse is a different claim.' },
        { type: 'tf', prompt: 'In logic, "A or B" is true when both A and B are true.', answer: true, hint: 'Logical OR is inclusive.', explain: 'At least one — and both counts.' },
        { type: 'mc', prompt: 'An argument that is valid AND has true premises is called:', choices: ['certain', 'strong', 'formal', 'sound'], answer: 3, hint: 'One word covers both.', explain: 'Sound. Valid plus true premises.' },
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
        { type: 'mc', prompt: 'What drives most weather?', choices: ['uneven heating by the sun', 'plate movement', 'the water cycle', 'the moon’s gravity'], answer: 0, hint: 'Compare the equator with the poles.', explain: 'The heating difference sets air in motion.' },
        { type: 'tf', prompt: 'Earth gains significant new water each year.', answer: false, hint: 'Think about the cycle.', explain: 'It cycles. The total stays essentially fixed.' },
        { type: 'mc', prompt: 'How do we know what Earth’s interior is made of?', choices: ['satellite images', 'earthquake wave speeds', 'volcano samples only', 'deep drilling'], answer: 1, hint: 'No drill has reached the mantle.', explain: 'Seismic waves change speed in different materials.' },
        { type: 'mc', prompt: 'Earth’s seasons are caused by:', choices: ['ocean currents', 'distance from the sun', 'the tilt of the axis', 'the moon'], answer: 2, hint: 'Earth is closest to the sun in January.', explain: 'Axial tilt changes how directly sunlight lands.' },
        { type: 'numeric', prompt: 'Double the distance between two objects and gravity drops to one over what number?', answer: 4, hint: 'Square the 2.', explain: '2² = 4, so one quarter.' },
        { type: 'tf', prompt: 'An orbit is an object falling and continuously missing what it falls toward.', answer: true, hint: 'Why does the moon never land?', explain: 'Falling plus enough sideways speed is exactly what an orbit is.' },
        { type: 'mc', prompt: 'What do Earth’s interior, the deep past and a text’s meaning have in common?', choices: ['they are all unknowable', 'they all require a microscope', 'they can all be observed directly', 'they are all reconstructed from evidence left behind'], answer: 3, hint: 'Which one can you actually watch happen?', explain: 'None can be watched. All are read from traces.' },
      ],
    },
  ],
};
