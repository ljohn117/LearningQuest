/* Companions — one per lane, earned by finishing that lane.
 *
 * Deliberately tied to completing real work rather than bought with points.
 * A reward you can purchase is a transaction; one that only appears when you
 * finish something is evidence you finished it. That distinction matters more
 * for a kid who underrates himself than the reward itself does.
 *
 * Three lanes here (physics, logic, earth) have no content in the app yet —
 * he finished them before they were swapped out, so their companions unlock
 * from the restored progress and the lanes themselves are still to come. */

/* Each companion carries voice lines, used during a duel.
 *
 * Three rules held while writing these, and the second one is the important
 * one:
 *
 *   1. Speak in the lane's own idiom. Bitwing says "returned true"; Strata
 *      says "that layer checks out". A companion that could belong to any
 *      lane is wallpaper.
 *   2. A `miss` line is NEVER disappointed. This is the whole
 *      consequence-free principle arriving at the one moment it is easiest
 *      to break — a companion that sighs at a wrong answer would undo more
 *      than the rest of the app builds. Every miss line either normalises
 *      being wrong inside that field, or points at what to try next.
 *   3. Never babyish. He is read at a seventh-grade level and treated as
 *      capable everywhere else; the companions do the same.
 */
export const COMPANIONS = {
  math:    { glyph: '🔷', name: 'Tessel',  title: 'the Pattern-Keeper', blurb: 'Sees the shape a number is hiding.',
             lines: { open: 'Numbers first. Everything else is decoration.',
               hit: ['That is the shape of it.', 'Clean.', 'The pattern held.'],
               miss: ['Try it the other way round.', 'Numbers do not mind being asked twice.', 'Check the order you did that in.'],
               charge: 'You have found the rule. Now use it.',
               win: 'You were reading patterns, not guessing. I noticed.' } },
  cs:      { glyph: '🤖', name: 'Bitwing', title: 'the Loop-Runner',    blurb: 'Does the boring part a thousand times without complaining.',
             lines: { open: 'Give me the instructions. I will run them.',
               hit: ['Executed.', 'No errors.', 'Returned true.'],
               miss: ['That is a bug, not a crash. Keep going.', 'Debug it and run again.', 'Every program does this.'],
               charge: 'Loop is warm. Keep it going.',
               win: 'Ran to completion. No exceptions thrown.' } },
  bio:     { glyph: '🌿', name: 'Sprig',   title: 'the Cell-Singer',    blurb: 'Knows what every living thing is quietly doing.',
             lines: { open: 'Everything alive is doing something right now. Let us keep up.',
               hit: ['That is how it works.', 'Alive and correct.', 'Yes — exactly that.'],
               miss: ['Living things get it wrong constantly. That is how they adapt.', 'Try another way in.', 'Nothing lost.'],
               charge: 'You are growing. I mean that literally.',
               win: 'You explained something living. Not many people can.' } },
  chem:    { glyph: '⚗️', name: 'Reagent', title: 'the Bond-Breaker',  blurb: 'Knows what happens when two things finally meet.',
             lines: { open: 'Two things are about to meet. Let us see what happens.',
               hit: ['Bonded.', 'That is the reaction.', 'Balanced.'],
               miss: ['Reactions fail all the time. Chemists just run them again.', 'Check the count on both sides.', 'No harm done.'],
               charge: 'The rate is climbing. Something is catalysing this.',
               win: 'You took things apart and put them back. That is the whole job.' } },
  ela:     { glyph: '🦉', name: 'Quill',   title: 'the Word-Binder',    blurb: 'Finds the sentence that proves it.',
             lines: { open: 'Say what you mean. I will hold you to it.',
               hit: ['Precisely put.', 'That is the word.', 'Well said.'],
               miss: ['A first draft is allowed to be wrong. Revise.', 'Read it again, slower.', 'Nothing is final.'],
               charge: 'You have found your voice. Use it.',
               win: 'You were clear. That is rarer than being clever.' } },
  biz:     { glyph: '🦊', name: 'Ledger',  title: 'the Trade-Weaver',   blurb: 'Can tell profit from noise.',
             lines: { open: 'Every choice has a cost. Let us find what this one buys.',
               hit: ['Profitable.', 'That is the margin.', 'Good trade.'],
               miss: ['A loss you learn from is tuition, not waste.', 'Recalculate.', 'Nothing spent.'],
               charge: 'Compounding. This is what it looks like.',
               win: 'You can tell profit from noise. Most adults cannot.' } },
  gov:     { glyph: '🦅', name: 'Gavel',   title: 'the Rule-Reader',    blurb: 'Follows how a rule actually becomes a rule.',
             lines: { open: 'Rules are only rules if somebody checks them. That is me.',
               hit: ['Upheld.', 'That holds.', 'Precedent set.'],
               miss: ['Overturned. Courts do it too, and it is not a scandal.', 'Argue it again.', 'Appeal allowed. Always.'],
               charge: 'You have the majority. Keep it.',
               win: 'You read the rule and applied it. That is the whole of civics.' } },
  fossils: { glyph: '🦴', name: 'Strata',  title: 'the Deep-Timer',     blurb: 'Reads a million years off a cliff face.',
             lines: { open: 'Everything leaves a trace. Let us read this one.',
               hit: ['Dated correctly.', 'That layer checks out.', 'Confirmed.'],
               miss: ['The record has gaps. So does everyone. Dig again.', 'Look one layer deeper.', 'Nothing lost — rock is patient.'],
               charge: 'You are reading it fluently now.',
               win: 'You read a million years off a cliff face, casually.' } },
  physics: { glyph: '⚛️', name: 'Quark',   title: 'the Force-Feeler',   blurb: 'Knows why things fall the way they do.',
             lines: { open: 'Push something. See what pushes back.',
               hit: ['Force applied.', 'That is the equation.', 'Conserved.'],
               miss: ['Nothing was destroyed. Try a different direction.', 'Check the units.', 'Energy is patient. Go again.'],
               charge: 'Accelerating. Same mass, more force.',
               win: 'You know why things fall the way they do. That is not nothing.' } },
  logic:   { glyph: '🧩', name: 'Syllo',   title: 'the Thread-Puller',  blurb: 'Pulls one loose thread until the whole thing unravels.',
             lines: { open: 'Give me a premise. I will follow it wherever it goes.',
               hit: ['Valid and sound.', 'Follows.', 'That is the conclusion.'],
               miss: ['One counterexample is information, not failure.', 'Check the premise, not the reasoning.', 'Try the other case.'],
               charge: 'The thread is holding. Pull harder.',
               win: 'You did not guess once. You reasoned.' } },
  earth:   { glyph: '🪐', name: 'Orbit',   title: 'the Sky-Mapper',     blurb: 'Never loses track of which way is up.',
             lines: { open: 'Whichever way is up, I will keep track of it.',
               hit: ['On course.', 'That is the orbit.', 'Mapped.'],
               miss: ['Everything in orbit is falling. It is fine.', 'Re-check the distance.', 'Adjust and continue.'],
               charge: 'Escape velocity. Keep going.',
               win: 'You never lost track of which way was up.' } },
  teardown:{ glyph: '\u{1F527}', name: 'Sprocket', title: 'the Lid-Lifter',    blurb: 'Cannot walk past anything without wondering what is inside it.',
             lines: { open: 'Something in here comes apart. Let us find out what.',
               hit: ['That is the mechanism.', 'Found it.', 'Comes apart cleanly.'],
               miss: ['You opened it. That is the hard part. Look again.', 'Wrong screw. Try another.', 'Nothing broken.'],
               charge: 'You can see the whole assembly now.',
               win: 'You looked inside something instead of past it.' } },
  connect: { glyph: '🧵', name: 'Loom',    title: 'the Link-Finder',    blurb: 'Spots the same idea wearing different clothes.',
             lines: { open: 'Two things you know are about to turn out to be one thing.',
               hit: ['Same idea, different clothes.', 'Connected.', 'You saw it.'],
               miss: ['The link is there. Come at it sideways.', 'Which lane did you meet this in?', 'Nothing dropped.'],
               charge: 'Everything is joining up.',
               win: 'You keep spotting what other people memorise separately.' } },
};

/* Guardians face you in a duel. They aren't enemies exactly — they're the
   problem itself, standing up and looking back at you. */
export const GUARDIANS = [
  { glyph: '🗿', name: 'The Stubborn Sum',    line: 'It refuses to simplify.' },
  { glyph: '👾', name: 'The Glitch',          line: 'It scrambles what it touches.' },
  { glyph: '🌀', name: 'The Spiral',          line: 'It sends every answer back around.' },
  { glyph: '🔒', name: 'The Locked Step',     line: 'It will not move until the work is shown.' },
  { glyph: '👻', name: 'The Careless Slip',   line: 'It lives in the mistakes people rush past.' },
  { glyph: '🐉', name: 'The Long Division',   line: 'Enormous, patient, one step at a time.' },
  { glyph: '🦂', name: 'The Sign Error',      line: 'One small negative, endless trouble.' },
  { glyph: '🌵', name: 'The Word Problem',    line: 'It hides the numbers inside a story.' },
];

export const earnedCompanions = (profile, curriculum, order) =>
  order.filter((subj) => {
    const days = curriculum[subj]?.days || [];
    return days.length && days.every((d) => profile.completed?.[`${subj}:${d.id}`]);
  });
