import React, { useState, useMemo } from 'react';
import { ArrowLeft, Lock } from 'lucide-react';
import { S } from './styles.jsx';
import { CURRICULUM } from '../content/index.js';
import { LADDERS, rungEarned } from '../content/ladder.js';

/* The ladder view.
 *
 * A record, not a menu. Rungs light up only for days he has actually
 * finished, so what he sees is how far he has climbed away from his own
 * scale in both directions — and a couple of rungs at each end that never
 * light, because a ladder ending exactly where he stands would imply there
 * is nothing further, which is the opposite of the point.
 *
 * An earned rung is tappable and opens the day it came from. That is always
 * legal: earned means completed, and a completed day is always replayable.
 *
 * The exponent is shown rather than hidden. Reading 10⁻¹⁰ off a scale is a
 * skill Mathematics day 8 taught, and this is a place it pays off. */

const SUP = { '-': '⁻', '.': '·', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = (n) => String(n).split('').map((c) => SUP[c] ?? c).join('');

export function LadderView({ profile, onBack, onOpenDay }) {
  const [tab, setTab] = useState(0);
  const ladder = LADDERS[tab];

  const rows = useMemo(() => ladder.rungs.map((r) => {
    const earned = rungEarned(r, profile);
    const lane = r.subj ? CURRICULUM[r.subj] : null;
    return { r, earned, lane, accent: lane?.accent || '#3a4154' };
  }), [ladder, profile]);

  const got = rows.filter((x) => x.earned).length;
  const reachable = rows.filter((x) => x.r.subj).length;
  /* The span he has actually covered, in orders of magnitude. This is the
     number worth showing: not how many boxes are ticked, but how much of
     reality he can now describe. */
  const earnedExps = rows.filter((x) => x.earned).map((x) => x.r.exp);
  const span = earnedExps.length > 1
    ? Math.round(Math.max(...earnedExps) - Math.min(...earnedExps)) : 0;

  return (
    <div>
      <button className="lq-tap" style={{ ...S.iconBtn, marginBottom: 14 }} onClick={onBack} aria-label="Back">
        <ArrowLeft size={18} color="#aeb4c4" />
      </button>

      <div className="lq-rise">
        <div style={S.eyebrow}>The ladder</div>
        <h1 style={S.h1}>{ladder.name}</h1>
        <div style={{ ...S.muted, lineHeight: 1.6 }}>
          {got === 0
            ? 'Every rung is somewhere this app goes. They light up as you get there.'
            : span >= 2
              ? `You can describe ${span} orders of magnitude — a range of about 1 followed by ${span} zeros. Every lit rung is a day you finished.`
              : 'Rungs light up as you finish the day they came from.'}
        </div>
      </div>

      <div style={S.ladTabs} role="tablist">
        {LADDERS.map((l, i) => (
          <button key={l.id} type="button" role="tab" aria-selected={i === tab}
            className="lq-tap"
            onClick={() => setTab(i)}
            style={{ ...S.ladTab, ...(i === tab ? S.ladTabOn : null) }}>
            {l.name}
          </button>
        ))}
      </div>

      <div style={S.ladWrap}>
        {rows.map(({ r, earned, lane, accent }, i) => {
          const last = i === rows.length - 1;
          const body = (
            <>
              <div style={S.ladRail}>
                <span style={{ ...S.ladDot, background: earned ? accent : 'transparent', borderColor: earned ? accent : '#2a2f3d' }}>
                  {!earned && !r.subj && <Lock size={9} color="#3a4154" />}
                </span>
                {!last && <span style={{ ...S.ladLine, background: earned ? accent + '44' : '#1e2330' }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0, paddingBottom: last ? 0 : 17 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ ...S.mono, fontSize: 11.5, color: earned ? accent : '#4a5163', flexShrink: 0, width: 52 }}>
                    10{sup(r.exp)} {ladder.axis}
                  </span>
                  <span style={{ fontSize: 15, color: earned ? '#e7e9f0' : '#5b6275', fontWeight: earned ? 600 : 400 }}>
                    {r.label}
                  </span>
                </div>
                {earned && r.note && (
                  <div style={{ ...S.muted, fontSize: 13.5, marginTop: 4, lineHeight: 1.55 }}>{r.note}</div>
                )}
                {earned && lane && (
                  <div style={{ ...S.mono, fontSize: 10.5, color: '#5b6275', marginTop: 5, letterSpacing: '.6px' }}>
                    {lane.name.toUpperCase()}
                  </div>
                )}
                {!earned && (
                  <div style={{ ...S.muted, fontSize: 12.5, marginTop: 3, color: '#3f4658' }}>
                    {r.subj ? 'not yet' : 'further than this app goes — for now'}
                  </div>
                )}
              </div>
            </>
          );

          return earned ? (
            <button key={ladder.id + i} type="button" className="lq-tap"
              onClick={() => onOpenDay(r.subj, r.day)}
              aria-label={`${r.label} — open ${CURRICULUM[r.subj].days.find((d) => d.id === r.day)?.title}`}
              style={{ ...S.cardBtn, ...S.ladRow, cursor: 'pointer' }}>
              {body}
            </button>
          ) : (
            <div key={ladder.id + i} style={S.ladRow}>{body}</div>
          );
        })}
      </div>

      <div style={{ ...S.muted, fontSize: 12.5, marginTop: 4, lineHeight: 1.6 }}>
        {got} of {reachable} rungs reached. Tap a lit one to go back to the day it came from.
      </div>
    </div>
  );
}
