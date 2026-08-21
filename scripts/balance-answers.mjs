/* Rotate multiple-choice options so correct answers land evenly across all
 * four positions.
 *
 * The original content put 92% of correct answers at index 0, which meant a
 * student could tap the top option every time and score well without reading
 * anything. That makes every downstream signal — XP, progress, mastery —
 * meaningless. This keeps new content honest.
 *
 * Uses a quote-aware bracket scanner rather than a regex, because option text
 * legitimately contains both quote styles and apostrophes.
 *
 *   node scripts/balance-answers.mjs <file> [--write]
 */
import { readFileSync, writeFileSync } from 'node:fs';

const file = process.argv[2];
const write = process.argv.includes('--write');
if (!file) { console.error('usage: balance-answers.mjs <file> [--write]'); process.exit(1); }
let src = readFileSync(file, 'utf8');

/** Split a bracketed JS array literal into its top-level element strings. */
function splitArray(body) {
  const out = []; let depth = 0, q = null, cur = '';
  for (let i = 0; i < body.length; i++) {
    const c = body[i], prev = body[i - 1];
    if (q) { cur += c; if (c === q && prev !== '\\') q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; cur += c; continue; }
    if (c === '[' || c === '{' || c === '(') depth++;
    if (c === ']' || c === '}' || c === ')') depth--;
    if (c === ',' && depth === 0) { out.push(cur.trim()); cur = ''; continue; }
    cur += c;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

/** Find the matching close bracket for the open bracket at `start`. */
function matchBracket(s, start) {
  let depth = 0, q = null;
  for (let i = start; i < s.length; i++) {
    const c = s[i], prev = s[i - 1];
    if (q) { if (c === q && prev !== '\\') q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '[') depth++;
    if (c === ']') { depth--; if (!depth) return i; }
  }
  return -1;
}

const counts = [0, 0, 0, 0];
let changed = 0, seen = 0;
let out = '', cursor = 0;
const NEEDLE = 'choices: [';

for (;;) {
  const at = src.indexOf(NEEDLE, cursor);
  if (at === -1) break;
  const open = at + NEEDLE.length - 1;
  const close = matchBracket(src, open);
  if (close === -1) break;

  const items = splitArray(src.slice(open + 1, close));
  const after = src.slice(close + 1);
  const m = after.match(/^\s*,\s*answer:\s*(\d+)/);
  if (!m || items.length !== 4) { out += src.slice(cursor, close + 1); cursor = close + 1; continue; }

  seen++;
  const oldIdx = Number(m[1]);
  /* Send this answer to a least-used slot, chosen at random among ties.
     Taking the first minimum every time produces a strict 0,1,2,3 cycle —
     which is just as learnable as putting everything at index 0, and was
     exactly the failure this script exists to prevent. */
  const min = Math.min(...counts);
  const candidates = counts.map((c, i) => (c === min ? i : -1)).filter((i) => i >= 0);
  const target = candidates[Math.floor(Math.random() * candidates.length)];
  const shift = (target - oldIdx + 4) % 4;
  const rotated = items.map((_, i) => items[(i - shift + 4) % 4]);
  counts[target]++;
  if (shift) changed++;

  out += src.slice(cursor, open + 1) + rotated.join(', ') + ']';
  const answerEnd = close + 1 + m[0].length;
  out += after.slice(0, m[0].length).replace(/answer:\s*\d+/, `answer: ${target}`);
  cursor = answerEnd;
}
out += src.slice(cursor);

console.log(`${seen} multiple-choice questions · ${changed} rotated`);
console.log(`distribution now: idx0=${counts[0]} idx1=${counts[1]} idx2=${counts[2]} idx3=${counts[3]}`);
{
  const seq = [...out.matchAll(/choices: \[[^\]]*\], answer: (\d)/g)].map((x) => Number(x[1]));
  let plus1 = 0;
  for (let i = 1; i < seq.length; i++) if (seq[i] === (seq[i - 1] + 1) % 4) plus1++;
  const pct = seq.length > 1 ? Math.round((100 * plus1) / (seq.length - 1)) : 0;
  console.log(`consecutive +1 mod 4: ${pct}% (random baseline ~25%)`);
}
if (write) { writeFileSync(file, out); console.log('written'); }
else console.log('(dry run — pass --write to apply)');
