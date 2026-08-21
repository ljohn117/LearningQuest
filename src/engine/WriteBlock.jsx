import React, { useState, useEffect, useRef } from 'react';
import { Check, Feather } from 'lucide-react';
import { S } from './styles.jsx';

/* A place to actually write something.
 *
 * The English lane taught paragraphs, argument, revision and voice without
 * ever asking him to produce a sentence. This closes that.
 *
 * Nothing here is graded, scored, or checked for correctness. That is not
 * squeamishness — there is no reliable way to grade a nine-year-old's prose
 * offline, and a wrong judgement from a machine would do real damage to a
 * kid who already assumes he is bad at this. Instead he writes, then reads
 * his own work against a short checklist and decides for himself. Ticking a
 * box is self-assessment, not a mark.
 *
 * What he writes is saved locally, exactly like everything else in this app,
 * and never leaves the device. It is his, and the parent view can read it.
 *
 * Progress never depends on writing anything. He can page straight past. */

export function WriteBlock({ b, accent, value, onChange }) {
  const [text, setText] = useState(value?.text || '');
  const [checked, setChecked] = useState(value?.checked || []);
  const [saved, setSaved] = useState(false);
  const timer = useRef(null);

  /* Debounced so a save is not written on every keystroke. */
  useEffect(() => {
    if (text === (value?.text || '') && checked === (value?.checked || [])) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      onChange({ text, checked });
      setSaved(true);
      setTimeout(() => setSaved(false), 1400);
    }, 600);
    return () => clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, checked]);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const target = b.words || 40;
  const toggle = (i) =>
    setChecked((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]));

  return (
    <div className="lq-rise" style={{ ...S.writeBox, borderColor: accent + '55' }}>
      <div style={S.writeTask}>
        <Feather size={15} color={accent} style={{ flexShrink: 0, marginTop: 1 }} />
        <span>{b.task}</span>
      </div>

      {b.starter && <div style={S.writeStarter}>{b.starter}</div>}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write here. Nobody marks this — it is yours."
        aria-label={b.task}
        rows={6}
        style={{ ...S.writeArea, borderColor: text ? accent + '66' : '#2a2f3d' }}
      />

      <div style={S.writeMeta}>
        <span style={{ ...S.mono, color: words >= target ? '#3ddc97' : '#5b6275' }}>
          {words} {words === 1 ? 'word' : 'words'}
          {target ? ` · aiming for about ${target}` : ''}
        </span>
        <span style={{ ...S.mono, color: '#3ddc97', opacity: saved ? 1 : 0, transition: 'opacity .3s' }}>
          saved
        </span>
      </div>

      {b.checklist && b.checklist.length > 0 && (
        <div style={S.writeCheck}>
          <div style={{ ...S.muted, fontSize: 13, marginBottom: 8 }}>
            Read it back. Tick what you find — this is you checking your own work, not a score.
          </div>
          {b.checklist.map((item, i) => {
            const on = checked.includes(i);
            return (
              <button
                key={i}
                type="button"
                className="lq-tap"
                role="checkbox"
                aria-checked={on}
                onClick={() => toggle(i)}
                style={{ ...S.cardBtn, ...S.writeCheckRow, borderColor: on ? accent + '99' : '#262c3d', background: on ? accent + '14' : 'transparent' }}
              >
                <span style={{ ...S.writeCheckBox, borderColor: on ? accent : '#3a4154', background: on ? accent : 'transparent' }}>
                  {on && <Check size={12} color="#0c0e16" />}
                </span>
                <span style={{ flex: 1, fontSize: 14 }}>{item}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
