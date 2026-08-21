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

export const COMPANIONS = {
  math:    { glyph: '🔷', name: 'Tessel',  title: 'the Pattern-Keeper', blurb: 'Sees the shape a number is hiding.' },
  cs:      { glyph: '🤖', name: 'Bitwing', title: 'the Loop-Runner',    blurb: 'Does the boring part a thousand times without complaining.' },
  bio:     { glyph: '🌿', name: 'Sprig',   title: 'the Cell-Singer',    blurb: 'Knows what every living thing is quietly doing.' },
  chem:    { glyph: '⚗️', name: 'Reagent', title: 'the Bond-Breaker',  blurb: 'Knows what happens when two things finally meet.' },
  ela:     { glyph: '🦉', name: 'Quill',   title: 'the Word-Binder',    blurb: 'Finds the sentence that proves it.' },
  biz:     { glyph: '🦊', name: 'Ledger',  title: 'the Trade-Weaver',   blurb: 'Can tell profit from noise.' },
  gov:     { glyph: '🦅', name: 'Gavel',   title: 'the Rule-Reader',    blurb: 'Follows how a rule actually becomes a rule.' },
  fossils: { glyph: '🦴', name: 'Strata',  title: 'the Deep-Timer',     blurb: 'Reads a million years off a cliff face.' },
  physics: { glyph: '⚛️', name: 'Quark',   title: 'the Force-Feeler',   blurb: 'Knows why things fall the way they do.' },
  logic:   { glyph: '🧩', name: 'Syllo',   title: 'the Thread-Puller',  blurb: 'Pulls one loose thread until the whole thing unravels.' },
  earth:   { glyph: '🪐', name: 'Orbit',   title: 'the Sky-Mapper',     blurb: 'Never loses track of which way is up.' },
  connect: { glyph: '🧵', name: 'Loom',    title: 'the Link-Finder',    blurb: 'Spots the same idea wearing different clothes.' },
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
