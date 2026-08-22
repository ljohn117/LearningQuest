/* Sound.
 *
 * Three constraints shaped all of this.
 *
 * 1. SYNTHESISED, NOT SAMPLED. The app ships as one self-contained HTML file,
 *    and audio files would have to be base64'd into it — hundreds of
 *    kilobytes for a handful of blips. Every sound here is built from
 *    oscillators at runtime, so the whole feature costs a few hundred bytes.
 *
 * 2. OFF BY DEFAULT. A kid doing homework is often in a room with other
 *    people in it. Sound that starts without being asked for is the kind of
 *    thing that gets an app closed and not reopened. It is a device
 *    preference rather than progress, so it lives in its own storage key and
 *    survives a profile reset.
 *
 * 3. THE WRONG-ANSWER SOUND IS NOT A BUZZER. This is the load-bearing one.
 *    Everything else in this app is built so that a wrong answer costs
 *    nothing — no lost health, no lost points, a hint on every question, and
 *    companions that never sound disappointed. A descending failure tone
 *    would undo all of that in 200 milliseconds, because sound reaches you
 *    before you have finished reading. So the miss sound is a single soft
 *    low note at low volume: it marks that something happened and refuses to
 *    editorialise about it. Play it next to the correct sound and it should
 *    read as "next", never as "no".
 */

const KEY = 'lq_sound';

let ctx = null;
let enabled = (() => {
  try { return localStorage.getItem(KEY) === 'on'; } catch { return false; }
})();

export const soundOn = () => enabled;

export function setSound(on) {
  enabled = !!on;
  try { localStorage.setItem(KEY, enabled ? 'on' : 'off'); } catch { /* private mode — fine, session-only */ }
  if (enabled) play('correct');   // confirm it works the moment it is switched on
  return enabled;
}

/* Created lazily, which also satisfies the browsers that refuse to start an
   AudioContext outside a user gesture — the first sound can only follow a
   tap, because turning sound on is itself a tap. */
function ac() {
  try {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return null;
    if (!ctx) ctx = new C();
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    return ctx;
  } catch { return null; }
}

function tone(a, { freq, at = 0, dur = 0.12, type = 'sine', gain = 0.11, glide }) {
  const o = a.createOscillator(), g = a.createGain();
  const t0 = a.currentTime + at;
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  if (glide) o.frequency.exponentialRampToValueAtTime(glide, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g); g.connect(a.destination);
  o.start(t0); o.stop(t0 + dur + 0.03);
}

/* Note that `miss` is deliberately the quietest, lowest and least eventful
   entry in this table. That is the whole point of it. */
const VOICES = {
  correct: (a) => { tone(a, { freq: 659.25, dur: 0.09 }); tone(a, { freq: 987.77, at: 0.075, dur: 0.15 }); },
  miss:    (a) => { tone(a, { freq: 196.00, dur: 0.17, type: 'triangle', gain: 0.06 }); },
  hit:     (a) => { tone(a, { freq: 440, glide: 320, dur: 0.1, type: 'triangle', gain: 0.1 }); },
  charged: (a) => { [523.25, 659.25, 783.99].forEach((f, i) => tone(a, { freq: f, at: i * 0.055, dur: 0.13 })); },
  win:     (a) => { [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(a, { freq: f, at: i * 0.085, dur: 0.2, gain: 0.1 })); },
  level:   (a) => { [392, 523.25, 659.25, 783.99].forEach((f, i) => tone(a, { freq: f, at: i * 0.1, dur: 0.26, type: 'triangle', gain: 0.09 })); },
};

export function play(name) {
  if (!enabled) return;
  const voice = VOICES[name];
  if (!voice) return;
  const a = ac();
  if (!a) return;
  try { voice(a); } catch { /* audio is a nicety; never let it break a lesson */ }
}
