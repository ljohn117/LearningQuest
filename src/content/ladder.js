/* The ladders.
 *
 * Branch Education's actual signature is not the animation — it is the zoom.
 * A video starts at a graphics card you could hold and ends inside a
 * transistor, and the journey between those two points is the thing you
 * remember. Every scale on the way down is a place where a different field
 * takes over the explanation.
 *
 * `cx6 Zooming Out` already says that in prose. This is the picture.
 *
 * Two ladders, because this curriculum genuinely spans two: how big, and
 * how long. A rung lights up only when he has actually finished the day it
 * points at, so the ladder is a record rather than a menu — it shows him how
 * far he has climbed in both directions from the human scale he started at.
 *
 * Rules held while writing these:
 *
 *   1. Every rung names a real day. No rung is decorative, and no rung
 *      points at something the app never taught.
 *   2. The `at` figure is the honest order of magnitude, not a rounded
 *      flourish. He can check any of them.
 *   3. A few rungs at each end have no day and never light up. That is
 *      deliberate: a ladder that ends exactly where he has got to would
 *      suggest there is nothing above him, which is the opposite of what
 *      this app is for.
 */

/* exp is the power of ten in metres (size) or seconds (time). It positions
   the rung and is shown to him, because reading an exponent off a scale is
   itself a skill Mathematics day 7 and day 8 taught. */
export const SIZE_LADDER = {
  id: 'size', name: 'How big', unit: 'metres', axis: 'm',
  rungs: [
    { exp: -15, label: 'A nucleus', note: 'Protons and neutrons, holding nearly all of an atom’s mass in almost none of its volume.', subj: 'physics', day: 'phy2' },
    { exp: -10, label: 'An atom', note: 'Mostly empty space. The proton count is the whole of its identity.', subj: 'physics', day: 'phy2' },
    { exp: -10, label: 'A chemical bond', note: 'Give, take or share. The distance across one is about the width of an atom.', subj: 'chem', day: 'ch4' },
    { exp: -9, label: 'A molecule', note: 'Atoms bonded in a fixed ratio. Change the ratio and it is a different substance.', subj: 'chem', day: 'ch5' },
    { exp: -8, label: 'A layer of graphite', note: 'The line a pencil leaves is carbon sheets a few atoms thick.', subj: 'teardown', day: 'td1' },
    { exp: -7, label: 'A virus', note: 'Small enough that thousands would fit across one cell.', subj: 'bio', day: 'bio9' },
    { exp: -6, label: 'A bacterium', note: 'A single cell doing everything a living thing has to do, alone.', subj: 'bio', day: 'bio9' },
    { exp: -5, label: 'A human cell', note: 'The smallest unit that still counts as alive.', subj: 'bio', day: 'bio2' },
    { exp: 0, label: 'You', note: 'Organ systems, each doing one job, none able to work alone.', subj: 'bio', day: 'bio8' },
    { exp: 3, label: 'An ecosystem', note: 'Producers and consumers, with about 90% of the energy lost at every level up.', subj: 'bio', day: 'bio6' },
    { exp: 5, label: 'A tectonic plate', note: 'Sections of crust moving about as fast as your fingernails grow.', subj: 'earth', day: 'es2' },
    { exp: 7, label: 'Earth', note: 'Crust, mantle, outer and inner core — read from earthquakes, never seen.', subj: 'earth', day: 'es1' },
    { exp: 8, label: 'Earth and Moon', note: 'Far enough apart that the Moon is falling and continuously missing.', subj: 'earth', day: 'es5' },
    { exp: 11, label: 'The solar system', note: 'Gravity weakening with the square of distance, all the way out.', subj: 'earth', day: 'es6' },
    { exp: 21, label: 'The galaxy' },
    { exp: 26, label: 'The observable universe' },
  ],
};

export const TIME_LADDER = {
  id: 'time', name: 'How long', unit: 'seconds', axis: 's',
  rungs: [
    { exp: -9, label: 'One instruction', note: 'A processor following one step. Billions fit inside a second.', subj: 'cs', day: 'c1' },
    { exp: -2, label: 'A screen refresh', note: 'The touch grid is re-read roughly every eight milliseconds.', subj: 'teardown', day: 'td5' },
    { exp: 0, label: 'One second', note: 'The unit underneath every speed you have calculated — metres per one second.', subj: 'physics', day: 'phy3' },
    { exp: 3, label: 'Dough rising', note: 'An hour of yeast eating sugar and giving off carbon dioxide.', subj: 'teardown', day: 'td3' },
    { exp: 5, label: 'One rotation', note: 'A day. Earth turning once on its axis.', subj: 'earth', day: 'es5' },
    { exp: 7, label: 'One orbit', note: 'A year. Earth falling around the Sun and continuously missing.', subj: 'earth', day: 'es6' },
    { exp: 9, label: 'A human life', note: 'About two and a half billion seconds, if you are lucky.', subj: 'bio', day: 'bio8' },
    { exp: 11, label: 'Carbon-14 half-life', note: '5,730 years for half of it to decay. Then 5,730 more for half of what is left.', subj: 'fossils', day: 'f4' },
    { exp: 15, label: 'Since the dinosaurs', note: 'About 66 million years since the extinction that ended them.', subj: 'fossils', day: 'f6' },
    { exp: 17, label: 'The age of Earth', note: 'Roughly 4.5 billion years, dated from rock and meteorites.', subj: 'fossils', day: 'f5' },
    { exp: 17.6, label: 'The age of the universe' },
  ],
};

export const LADDERS = [SIZE_LADDER, TIME_LADDER];

/* A rung is earned when the day it points at is finished. Rungs with no day
   are the ones deliberately left above and below him and never light up. */
export const rungEarned = (rung, profile) =>
  !!(rung.subj && rung.day && profile?.completed?.[`${rung.subj}:${rung.day}`]);
