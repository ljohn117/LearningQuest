import React, { useState, useMemo } from 'react';
import { ArrowDown, ArrowUp, Check, RotateCcw } from 'lucide-react';
import { S } from './styles.jsx';
import { evalExpr, showNum } from './expr.js';

/* Two ways to learn that are not reading.
 *
 * Before these, the app had exactly one interactive block type — `codelab` —
 * used six times, all in Computer Science. Everything else was text, callout
 * and diagram: 36% of blocks were plain prose and pages averaged 2.1 blocks,
 * which is closer to a slide than a lesson.
 *
 * Neither block stores anything. They have no progress key, they are never
 * scored, and nothing in the app depends on whether he touches them. They are
 * manipulatives — the digital equivalent of the blocks on a classroom table,
 * which nobody marks either. */

/* ---- slider -------------------------------------------------------------
 * Change one number, watch what depends on it change. The point is the
 * RELATIONSHIP, which a static diagram can only assert and a slider lets him
 * discover: doubling a side does not double the volume, and you find that out
 * by dragging rather than by being told.
 *
 * Formulas travel with the content as strings (see expr.js) so a new slider
 * is a data edit, not a new component. */
export function SliderBlock({ b, accent }) {
  const [v, setV] = useState(b.start ?? b.min ?? 1);
  const outs = b.outputs || [];
  return (
    <div className="lq-rise" style={{ ...S.vizBox, padding: 14 }}>
      <div style={{ ...S.mono, fontSize: 11, color: '#8b91a3', letterSpacing: '.06em', marginBottom: 9 }}>
        {(b.label || 'try it').toUpperCase()}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
        <span style={{ ...S.mono, fontSize: 26, fontWeight: 700, color: accent }}>{showNum(v)}</span>
        {b.unit && <span style={{ ...S.mono, fontSize: 13, color: '#8b91a3' }}>{b.unit}</span>}
      </div>

      <input
        type="range"
        min={b.min ?? 1} max={b.max ?? 10} step={b.step ?? 1} value={v}
        aria-label={b.label || 'value'}
        onChange={(e) => setV(parseFloat(e.target.value))}
        style={{ width: '100%', accentColor: accent, margin: '4px 0 12px' }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {outs.map((o, i) => {
          const val = evalExpr(o.expr, v);
          return (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
              <span style={{ ...S.muted, fontSize: 13.5 }}>{o.label}</span>
              <span style={{ ...S.mono, fontSize: 15, color: '#e7e9f0', fontWeight: 600 }}>
                {showNum(val)}{o.unit ? <span style={{ color: '#5b6275', fontSize: 12 }}> {o.unit}</span> : null}
              </span>
            </div>
          );
        })}
      </div>

      {b.caption && (
        <div style={{ ...S.muted, fontSize: 12.5, marginTop: 11, lineHeight: 1.5, borderTop: '1px solid #1f2433', paddingTop: 9 }}>
          {b.caption}
        </div>
      )}
    </div>
  );
}

/* ---- order --------------------------------------------------------------
 * Put things in sequence. Rock layers, the steps of an algorithm, a bill
 * becoming law — all of them are an ORDER, and answering a multiple choice
 * question about order is a much weaker demonstration than producing it.
 *
 * Moved with buttons rather than drag-and-drop: drag is unreliable on touch,
 * invisible to a keyboard, and this has to work on a phone. */
/* cardBtn stretches to fill its row. Inside a flex row that made the two
   arrows expand and squeeze the label down to one word per line — caught by
   looking at a screenshot, not by any test. These stay a fixed square. */
const moveBtn = {
  width: 30, height: 30, flex: '0 0 30px', padding: 0, borderRadius: 8,
  border: '1px solid #262c3d', display: 'flex', alignItems: 'center', justifyContent: 'center',
};

export function OrderBlock({ b, accent }) {
  const correct = b.items || [];
  /* Deterministic shuffle, so it does not reorder itself on every render and
     does not accidentally start already solved. */
  const initial = useMemo(() => {
    const a = correct.map((t, i) => ({ t, i }));
    for (let k = a.length - 1; k > 0; k--) {
      const j = (k * 7 + correct.length * 3) % (k + 1);
      [a[k], a[j]] = [a[j], a[k]];
    }
    if (a.every((x, idx) => x.i === idx) && a.length > 1) [a[0], a[1]] = [a[1], a[0]];
    return a;
  }, [correct]);

  const [rows, setRows] = useState(initial);
  const move = (from, to) => {
    if (to < 0 || to >= rows.length) return;
    const next = rows.slice();
    [next[from], next[to]] = [next[to], next[from]];
    setRows(next);
  };
  const solved = rows.every((r, i) => r.i === i);

  return (
    <div className="lq-rise" style={{ ...S.vizBox, padding: 14 }}>
      <div style={{ ...S.mono, fontSize: 11, color: '#8b91a3', letterSpacing: '.06em', marginBottom: 10 }}>
        PUT THESE IN ORDER
      </div>
      {b.task && <div style={{ ...S.body, fontSize: 14.5, marginBottom: 11 }}>{b.task}</div>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {rows.map((r, i) => (
          <div key={r.t} style={{ display: 'flex', alignItems: 'center', gap: 9,
                 border: '1px solid ' + (solved ? accent + '66' : '#262c3d'), borderRadius: 10,
                 padding: '9px 10px', background: solved ? accent + '10' : 'transparent' }}>
            <span style={{ ...S.mono, fontSize: 12, color: solved ? accent : '#5b6275', width: 14, flexShrink: 0 }}>{i + 1}</span>
            <span style={{ flex: '1 1 auto', minWidth: 0, fontSize: 14, color: '#e7e9f0', lineHeight: 1.4 }}>{r.t}</span>
            <button type="button" className="lq-tap" aria-label={`Move "${r.t}" up`} disabled={i === 0}
              onClick={() => move(i, i - 1)}
              style={{ ...S.cardBtn, ...moveBtn, opacity: i === 0 ? .3 : 1 }}>
              <ArrowUp size={14} color="#aeb4c4" />
            </button>
            <button type="button" className="lq-tap" aria-label={`Move "${r.t}" down`} disabled={i === rows.length - 1}
              onClick={() => move(i, i + 1)}
              style={{ ...S.cardBtn, ...moveBtn, opacity: i === rows.length - 1 ? .3 : 1 }}>
              <ArrowDown size={14} color="#aeb4c4" />
            </button>
          </div>
        ))}
      </div>

      {/* Solved says so. Unsolved says NOTHING — no counter, no "3 wrong", no
          red. Getting it out of order is the ordinary state of working on it,
          and an app that comments on that is an app that punishes trying. */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 11, minHeight: 20 }}>
        <span style={{ ...S.mono, fontSize: 12.5, color: solved ? '#3ddc97' : 'transparent' }}>
          {solved ? <><Check size={13} style={{ verticalAlign: '-2px' }} /> that is the order</> : 'x'}
        </span>
        <button type="button" className="lq-tap" onClick={() => setRows(initial)}
          style={{ ...S.ghostBtn, fontSize: 12, padding: '4px 9px' }}>
          <RotateCcw size={12} /> shuffle
        </button>
      </div>

      {b.caption && solved && (
        <div style={{ ...S.muted, fontSize: 12.5, marginTop: 9, lineHeight: 1.5 }}>{b.caption}</div>
      )}
    </div>
  );
}
