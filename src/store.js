/* Persistence.

   The prototypes used `window.storage` (a Claude Artifacts API) wrapped in
   empty `catch {}` blocks — outside an artifact the app booted, ran fine,
   and silently persisted nothing. This uses localStorage, carries a version
   inside the payload, validates shape on read, and reports failures loudly
   instead of swallowing them. */

export const KEY = 'lq_v3';
export const SCHEMA_VERSION = 3;

const LEGACY_KEYS = ['lq_profiles_v2', 'lq_explore_v1'];

let lastError = null;
export const getLastError = () => lastError;

function validProfile(p) {
  return p && typeof p === 'object' && typeof p.id === 'string';
}

/* Writing used to be filed by position: subject:day:page:blockIndex. It is
   now filed by the prompt's own id, so a prompt can move on the page without
   losing what he wrote. These four are the only prompts that existed under
   the old scheme, captured from the live curriculum before the change.
   
   The migration is additive and one-way: it copies an old key to the new one
   only when the new one is empty, and never deletes the original. A restored
   backup from before the change therefore still works, and running it twice
   cannot overwrite anything he has written since. */
const WRITE_KEY_MIGRATION = {
  'ela:ela5:3:2': 'w:w-ela5',
  'ela:ela6:3:3': 'w:w-ela6',
  'ela:ela9:3:1': 'w:w-ela9',
  'ela:ela10:3:1': 'w:w-ela10',
};

export function migrateWriting(writing) {
  if (!writing || typeof writing !== 'object') return {};
  const out = { ...writing };
  for (const [from, to] of Object.entries(WRITE_KEY_MIGRATION)) {
    if (out[from] && !out[to]) out[to] = out[from];
  }
  return out;
}

/* Fill in fields added after a profile was first written, so a save from an
   older schema can't crash a newer read path. */
function normalize(p) {
  return {
    xp: 0, completed: {}, practice: {}, review: {}, writing: {}, calibration: {}, streak: { count: 0, last: null }, skips: 0, name: '',
    ...p,
    completed: p.completed && typeof p.completed === 'object' ? p.completed : {},
    practice: p.practice && typeof p.practice === 'object' ? p.practice : {},
    review: p.review && typeof p.review === 'object' ? p.review : {},
    writing: migrateWriting(p.writing),
    calibration: p.calibration && typeof p.calibration === 'object' ? p.calibration : {},
    streak: p.streak && typeof p.streak === 'object' ? p.streak : { count: 0, last: null },
    skips: Number.isFinite(p.skips) ? Math.max(0, Math.min(2, p.skips)) : 0,
  };
}

/* Can this browser actually keep anything?
 *
 * Reading is not proof. An empty store reads fine and then fails on write —
 * which is what happens with site data blocked, in some private windows, and
 * (notably for a household on Macs) in Safari opening a file:// page, where
 * localStorage throws SecurityError outright.
 *
 * So this does a real round trip: write a sentinel, read it back, delete it.
 * Anything less would let him finish a whole session before finding out. */
export function probeStorage() {
  const k = '__lq_probe__';
  try {
    localStorage.setItem(k, '1');
    const ok = localStorage.getItem(k) === '1';
    localStorage.removeItem(k);
    if (!ok) lastError = new Error('storage accepted a write but did not keep it');
    return ok;
  } catch (e) {
    console.error('[LearningQuest] storage is not writable — progress cannot be saved:', e);
    lastError = e;
    return false;
  }
}

/* Exported for the regression suite only. normalize() decides whether a
   saved profile survives a load intact, which makes it worth asserting on
   directly rather than through the UI. */
export const __testNormalize = normalize;

function readKey(k) {
  try {
    const raw = localStorage.getItem(k);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error(`[LearningQuest] could not read "${k}":`, e);
    lastError = e;
    return null;
  }
}

/* One-time merge of the two prototype save files. Day ids are unique across
   both apps, so completed-maps can be combined without collision. */
function migrateLegacy() {
  const found = LEGACY_KEYS.map(readKey).filter(Boolean);
  if (!found.length) return null;

  const byId = new Map();
  for (const blob of found) {
    const profiles = Array.isArray(blob.profiles) ? blob.profiles.filter(validProfile) : [];
    for (const p of profiles) {
      const prev = byId.get(p.id);
      if (!prev) { byId.set(p.id, normalize(p)); continue; }
      byId.set(p.id, {
        ...prev,
        xp: (prev.xp || 0) + (p.xp || 0),
        completed: { ...prev.completed, ...(p.completed || {}) },
        practice: { ...prev.practice, ...(p.practice || {}) },
        streak: (prev.streak?.count || 0) >= (p.streak?.count || 0) ? prev.streak : p.streak,
      });
    }
  }
  if (!byId.size) return null;
  const profiles = [...byId.values()];
  console.info(`[LearningQuest] migrated ${profiles.length} profile(s) from the prototype save files.`);
  return { version: SCHEMA_VERSION, profiles, lastActive: profiles[0].id };
}

export const Store = {
  load() {
    const cur = readKey(KEY);
    if (cur && Array.isArray(cur.profiles)) {
      return { ...cur, profiles: cur.profiles.filter(validProfile).map(normalize) };
    }
    return migrateLegacy();
  },

  save(data) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ ...data, version: SCHEMA_VERSION }));
      lastError = null;
      return true;
    } catch (e) {
      console.error('[LearningQuest] SAVE FAILED — progress was not written:', e);
      lastError = e;
      return false;
    }
  },

  /* Restore from a payload produced by the prototypes' Back up button. */
  importBackup(text) {
    const parsed = JSON.parse(text);
    const blob = parsed && parsed.lqBackup ? parsed.data : parsed;
    if (!blob || !Array.isArray(blob.profiles)) throw new Error('Not a Learning Quest backup.');
    const profiles = blob.profiles.filter(validProfile).map(normalize);
    if (!profiles.length) throw new Error('That backup has no profiles in it.');
    const next = { version: SCHEMA_VERSION, profiles, lastActive: profiles[0].id };
    if (!Store.save(next)) throw new Error('Could not write to storage.');
    return next;
  },
};
