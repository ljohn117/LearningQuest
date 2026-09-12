import React, { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { S } from './styles.jsx';
import { CURRICULUM, SUBJECT_ORDER } from '../content/index.js';
import { levelInfo } from './progress.js';
import { EXTRA_DRILLS, MATH_DRILLS } from './drills.js';

const ALL_DRILLS = [...MATH_DRILLS, ...EXTRA_DRILLS];

/* A read-only view of what he has actually done.
 *
 * Deliberately kept off his path — reached from the dashboard footer, not
 * from anything he taps on the way to a lesson. A screen that lists what
 * you keep getting wrong is useful to a parent and corrosive to a nine
 * year old who already assumes he is bad at this.
 *
 * Everything here is derived from data the app already stores. Nothing is
 * sent anywhere; there is no network call in this file or any other. */

/* Uses each day's `best` score, which is the highest across every attempt --
   days stay replayable, so this is not a first-attempt figure and must not be
   labelled as one. */
function accuracy(completed) {
  let best = 0, total = 0;
  for (const v of Object.values(completed || {})) { best += v.best || 0; total += v.total || 0; }
  return { best, total, pct: total ? Math.round((best / total) * 100) : null };
}

/* Every write prompt in the curriculum, indexed by the key its answer is
   filed under — under BOTH the current id-based key and the legacy
   positional one, so writing restored from an old backup resolves here too
   instead of rendering as "undefined · undefined". Built once at load. */
const WRITE_INDEX = (() => {
  const m = new Map();
  for (const [subj, lane] of Object.entries(CURRICULUM)) {
    for (const day of lane.days) {
      day.pages.forEach((pg, pi) => pg.blocks.forEach((b, i) => {
        if (b.type !== 'write') return;
        const entry = { lane: lane.name, day: day.title, task: b.task, kind: b.kind };
        m.set(`${subj}:${day.id}:${pi}:${i}`, entry);
        if (b.id) m.set(`w:${b.id}`, entry);
      }));
    }
  }
  return m;
})();

export function ParentView({ profile, onBack }) {
  const data = useMemo(() => {
    const completed = profile.completed || {};
    const review = profile.review || {};

    const lanes = SUBJECT_ORDER.map((subj) => {
      const s = CURRICULUM[subj];
      const days = s?.days || [];
      const doneDays = days.filter((d) => completed[`${subj}:${d.id}`]);
      const acc = accuracy(Object.fromEntries(
        doneDays.map((d) => [d.id, completed[`${subj}:${d.id}`]])));
      return { subj, name: s?.name || subj, accent: s?.accent, done: doneDays.length, total: days.length, acc };
    }).filter((l) => l.total > 0);

    /* Questions currently flagged missed on their last review pass. This is
       the closest thing to a real struggle signal the app has. */
    const sticking = [];
    for (const [key, rec] of Object.entries(review)) {
      if (!rec || typeof rec !== 'object' || !rec.missed) continue;
      /* Generated practice is recorded under `drill:<id>` rather than
         subject:day:question. Those entries were being silently skipped here
         — the split produced a subject that does not exist, so the lookup
         failed quietly and a concept he keeps missing never showed up. */
      if (key.startsWith('drill:')) {
        const d = ALL_DRILLS.find((x) => x.id === key.slice(6));
        if (d) sticking.push({ subj: d.subj, lane: CURRICULUM[d.subj]?.name,
          day: d.name, prompt: 'Generated practice — currently at level ' + (rec.level || 1), at: rec.at });
        continue;
      }
      const [subj, dayId, qi] = key.split(':');
      const day = CURRICULUM[subj]?.days.find((d) => d.id === dayId);
      const q = day?.quiz?.[Number(qi)];
      if (q) sticking.push({ subj, lane: CURRICULUM[subj]?.name, day: day.title, prompt: q.prompt, at: rec.at });
    }
    sticking.sort((a, b) => (a.at || '').localeCompare(b.at || ''));

    /* What he has actually written. Stored locally like everything else.
     *
     * Resolving the key is done by index rather than by splitting it. Keys
     * come in two shapes now — `w:<promptId>` for everything current, and the
     * old positional `subj:day:page:i` for anything restored from a backup
     * written before ids existed — and a split() that assumes one shape
     * silently produces a lane of `undefined` for the other. That exact bug
     * hid a whole category of his practice from this page once already. */
    const writing = Object.entries(profile.writing || {})
      .filter(([, v]) => v && v.text && v.text.trim())
      .map(([key, v]) => {
        const found = WRITE_INDEX.get(key);
        return {
          key, lane: found?.lane, day: found?.day,
          task: found?.task, kind: found?.kind,
          text: v.text.trim(), at: v.at,
          words: v.text.trim().split(/\s+/).length,
        };
      })
      .sort((a, b) => (b.at || '').localeCompare(a.at || ''));

    /* What he said about difficulty, tapped once at the end of a day.
       This is the closest thing to a direct answer to the question the whole
       curriculum has been guessing at: is the level right? */
    const cal = profile.calibration || {};
    const calCounts = { easy: 0, right: 0, hard: 0 };
    const byLane = {};
    const calRecent = [];
    for (const [key, rec] of Object.entries(cal)) {
      if (!rec?.level || !(rec.level in calCounts)) continue;
      const [subj, dayId] = key.split(':');
      calCounts[rec.level]++;
      byLane[subj] = byLane[subj] || { easy: 0, right: 0, hard: 0 };
      byLane[subj][rec.level]++;
      const day = CURRICULUM[subj]?.days.find((d) => d.id === dayId);
      calRecent.push({ key, level: rec.level, at: rec.at, lane: CURRICULUM[subj]?.name, day: day?.title });
    }
    calRecent.sort((a, b) => (b.at || '').localeCompare(a.at || ''));
    const calTotal = calCounts.easy + calCounts.right + calCounts.hard;
    const calLanes = Object.entries(byLane)
      .map(([subj, c]) => ({ subj, name: CURRICULUM[subj]?.name || subj, accent: CURRICULUM[subj]?.accent, ...c, n: c.easy + c.right + c.hard }))
      .filter((l) => l.n >= 2)
      .sort((a, b) => (b.hard - b.easy) - (a.hard - a.easy));

    const reviewed = Object.keys(review).length;
    const drills = Object.entries(profile.practice || {});
    const totalDone = Object.keys(completed).length;
    const totalDays = SUBJECT_ORDER.reduce((n, s) => n + (CURRICULUM[s]?.days.length || 0), 0);

    return { lanes, sticking, writing, reviewed, drills, totalDone, totalDays, overall: accuracy(completed),
      calCounts, calTotal, calRecent, calLanes };
  }, [profile]);

  const lvl = levelInfo(profile.xp || 0);

  return (
    <div>
      <button className="lq-tap" style={{ ...S.iconBtn, marginBottom: 14 }} onClick={onBack} aria-label="Back">
        <ArrowLeft size={18} color="#aeb4c4" />
      </button>

      <div className="lq-rise">
        <div style={S.eyebrow}>For parents</div>
        <h1 style={S.h1}>{profile.name}'s progress</h1>
        <div style={S.muted}>
          {data.totalDone} of {data.totalDays} days · {profile.xp || 0} XP · {lvl.rank}
          {data.overall.pct !== null && ` · ${data.overall.pct}% best score`}
        </div>
      </div>

      <div style={S.sectionLabel}>By lane</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {data.lanes.map((l) => (
          <div key={l.subj} style={S.pRow}>
            <span style={{ width: 9, height: 9, borderRadius: 5, background: l.accent, flexShrink: 0 }} />
            <span style={{ flex: 1, minWidth: 0 }}>{l.name}</span>
            <span style={{ ...S.mono, color: l.done === l.total && l.total ? '#3ddc97' : '#aeb4c4', fontSize: 13 }}>
              {l.done}/{l.total}
            </span>
            <span style={{ ...S.mono, fontSize: 12, color: '#5b6275', width: 42, textAlign: 'right' }}>
              {l.acc.pct === null ? '—' : l.acc.pct + '%'}
            </span>
          </div>
        ))}
      </div>

      <div style={S.sectionLabel}>Is the level right?</div>
      {data.calTotal === 0 ? (
        <div style={{ ...S.muted, fontSize: 14, lineHeight: 1.6 }}>
          Nothing rated yet. At the end of each day he is asked how it landed —
          breezed it, good stretch, or rough going. It is one tap, entirely
          optional, and it is the only direct read anyone gets on whether the
          material is pitched correctly. Answers appear here.
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', gap: 7, marginBottom: 11 }}>
            {[['easy', 'Breezed it', '#5aa9ff'], ['right', 'Good stretch', '#3ddc97'], ['hard', 'Rough going', '#f6b73c']].map(([k, label, col]) => (
              <div key={k} style={{ ...S.pCard, flex: 1, textAlign: 'center', padding: '11px 6px' }}>
                <div style={{ ...S.mono, fontSize: 21, color: col }}>{data.calCounts[k]}</div>
                <div style={{ ...S.mono, fontSize: 10.5, color: '#8b91a3', marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{ ...S.muted, fontSize: 13.5, lineHeight: 1.6, marginBottom: data.calLanes.length ? 11 : 0 }}>
            {(() => {
              const { easy, right, hard } = data.calCounts, n = data.calTotal;
              if (easy / n > 0.5) return 'He is finding most of this easy. The band is probably set too low — worth pushing the level up.';
              if (hard / n > 0.4) return 'A lot of this is landing hard. Worth easing off, and worth checking he is not rating himself rather than the material.';
              if (right / n >= 0.5) return 'Mostly "good stretch", which is exactly where this is meant to sit. No change needed.';
              return 'Mixed so far. A few more ratings will make the pattern readable.';
            })()}
          </div>
          {data.calLanes.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {data.calLanes.map((l) => (
                <div key={l.subj} style={S.pRow}>
                  <span style={{ width: 9, height: 9, borderRadius: 5, background: l.accent, flexShrink: 0 }} />
                  <span style={{ flex: 1, minWidth: 0 }}>{l.name}</span>
                  <span style={{ ...S.mono, fontSize: 12, color: '#8b91a3' }}>
                    {l.easy ? `${l.easy} easy ` : ''}{l.right ? `${l.right} right ` : ''}{l.hard ? `${l.hard} hard` : ''}
                  </span>
                </div>
              ))}
            </div>
          )}
          <div style={{ ...S.muted, fontSize: 12.5, marginTop: 10 }}>
            Most recent: {data.calRecent.slice(0, 3).map((r) => `${r.day} (${r.level === 'right' ? 'good stretch' : r.level === 'easy' ? 'breezed' : 'rough'})`).join(' · ')}
          </div>
        </>
      )}

      <div style={S.sectionLabel}>Still sticking</div>
      {data.sticking.length === 0 ? (
        <div style={{ ...S.muted, fontSize: 14 }}>
          {data.reviewed === 0
            ? 'Nothing yet — this fills in once he has done a few daily warm-ups.'
            : 'Nothing outstanding. Everything reviewed recently came back correct.'}
        </div>
      ) : (
        <>
          <div style={{ ...S.muted, fontSize: 13.5, marginBottom: 10 }}>
            Missed on their last warm-up. These resurface sooner on their own —
            no action needed, but they are worth a look.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {data.sticking.slice(0, 12).map((s, i) => (
              <div key={i} style={S.pCard}>
                <div style={{ ...S.mono, fontSize: 11, color: '#8b91a3', marginBottom: 3 }}>
                  {s.lane} · {s.day}
                </div>
                <div style={{ fontSize: 14, color: '#e7e9f0' }}>{s.prompt}</div>
              </div>
            ))}
          </div>
        </>
      )}

      <div style={S.sectionLabel}>Writing</div>
      {data.writing.length === 0 ? (
        <div style={{ ...S.muted, fontSize: 14 }}>
          Nothing written yet. Most days now end with a short prompt asking him to
          explain something in his own words — it is optional and never marked, so
          an empty section here means he skipped them, not that he failed anything.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {data.writing.map((w) => (
            <div key={w.key} style={S.pCard}>
              <div style={{ ...S.mono, fontSize: 11, color: '#8b91a3', marginBottom: 5 }}>
                {[w.lane, w.day].filter(Boolean).join(' · ') || 'Earlier prompt'} · {w.words} words{w.at ? ` · ${w.at}` : ''}
              </div>
              {/* The prompt, not just the answer. Reading what he wrote without
                  knowing what was asked makes it almost impossible to tell a
                  good answer from a vague one — and asking him about it over
                  dinner is the entire point of this section. */}
              {w.task && (
                <div style={{ fontSize: 13, color: '#aeb4c4', fontStyle: 'italic', marginBottom: 7, lineHeight: 1.5 }}>
                  {w.task}
                </div>
              )}
              <div style={{ fontSize: 14, color: '#e7e9f0', whiteSpace: 'pre-wrap', lineHeight: 1.55 }}>{w.text}</div>
            </div>
          ))}
        </div>
      )}

      <div style={S.sectionLabel}>Practice</div>
      <div style={{ ...S.muted, fontSize: 14 }}>
        {data.drills.length === 0
          ? 'No duels yet.'
          : `${data.drills.reduce((n, [, v]) => n + (v.runs || 0), 0)} duels across ${data.drills.length} skill${data.drills.length > 1 ? 's' : ''}. ` +
            `Best run: ${Math.max(...data.drills.map(([, v]) => v.bestStreak || 0))} in a row.`}
      </div>

      <div style={{ ...S.muted, fontSize: 12.5, marginTop: 26, lineHeight: 1.6 }}>
        All of this is stored on this device only. The app makes no network
        requests and collects nothing.
      </div>
    </div>
  );
}
