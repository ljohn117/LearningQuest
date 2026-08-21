import React, { useState } from 'react';
import { Check, HelpCircle } from 'lucide-react';
import { S } from './styles.jsx';
import { XP_CORRECT } from './progress.js';

/* One question, self-contained: pick/type → check → explanation → next.
   Both the lesson quiz and the daily warm-up render through this, so a fix
   to answer handling can only land in one place.

   Remount on question change with a `key` — the internal state resets. */
export function Question({ q, accent, eyebrow, nextLabel = 'Next question', xp = XP_CORRECT, onNext }) {
  const [picked, setPicked] = useState(null);
  const [num, setNum] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const isCorrect = () =>
    q.type === 'numeric' ? Math.abs(parseFloat(num) - q.answer) < 1e-9 : picked === q.answer;

  function submit() {
    if (revealed) return;
    if (q.type === 'numeric' && num.trim() === '') return;
    if (q.type !== 'numeric' && picked === null) return;
    setRevealed(true);
  }
  const ok = revealed && isCorrect();

  /* Enter submits, then advances. This lives on the wrapper rather than the
     numeric input: the input carries disabled={revealed}, and a disabled
     input neither holds focus nor fires key events, so binding it there
     made the advance half unreachable — and left multiple-choice and
     true/false questions with no Enter handling at all. */
  const onKey = (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    if (revealed) onNext(ok); else submit();
  };

  const swatch = (isPick, isAns) => {
    if (revealed && isAns) return { borderColor: '#3ddc97', background: '#3ddc9722' };
    if (revealed && isPick && !isAns) return { borderColor: '#ff6b6b', background: '#ff6b6b22' };
    if (isPick) return { borderColor: accent, background: accent + '1f' };
    return { borderColor: '#2a2f3d', background: '#161a28' };
  };

  return (
    <div onKeyDown={onKey}>
      {eyebrow && <div style={{ ...S.eyebrow, color: accent }}>{eyebrow}</div>}
      <h2 style={S.qPrompt}>{q.prompt}</h2>

      {q.type === 'mc' && (
        <div role="radiogroup" aria-label="Answer choices" style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
          {q.choices.map((c, idx) => (
            <button key={idx} type="button" className="lq-tap" disabled={revealed}
              role="radio" aria-checked={picked === idx}
              style={{ ...S.choice, ...swatch(picked === idx, idx === q.answer) }}
              onClick={() => setPicked(idx)}>{c}</button>
          ))}
        </div>
      )}

      {q.type === 'tf' && (
        <div role="radiogroup" aria-label="True or false" style={{ display: 'flex', gap: 10, marginTop: 18 }}>
          {[{ v: true, t: 'True' }, { v: false, t: 'False' }].map((o) => (
            <button key={o.t} type="button" className="lq-tap" disabled={revealed}
              role="radio" aria-checked={picked === o.v}
              style={{ ...S.choice, flex: 1, textAlign: 'center', ...swatch(picked === o.v, o.v === q.answer) }}
              onClick={() => setPicked(o.v)}>{o.t}</button>
          ))}
        </div>
      )}

      {/* inputMode="text" rather than "decimal": the iOS decimal keypad has no
          minus key, and math m8 answers -3. type="number" keeps desktop
          steppers and numeric validation. */}
      {q.type === 'numeric' && (
        <input type="number" inputMode="text" value={num} disabled={revealed} autoFocus
          onChange={(e) => setNum(e.target.value)}
          placeholder="Type your answer" aria-label="Your answer"
          style={{ ...S.numInput, borderColor: revealed ? (ok ? '#3ddc97' : '#ff6b6b') : accent + '88' }} />
      )}

      {q.hint && !revealed && (
        !showHint ? (
          <button className="lq-tap" style={{ ...S.hintBtn }} onClick={() => setShowHint(true)}>
            <HelpCircle size={14} /> Show a hint
          </button>
        ) : (
          <div className="lq-rise" style={S.hintBox}>
            <HelpCircle size={15} color="#5aa9ff" style={{ flexShrink: 0, marginTop: 2 }} />
            <div style={{ ...S.body, fontSize: 14.5 }}>{q.hint}</div>
          </div>
        )
      )}

      {revealed && (
        <div className="lq-rise" role="status" aria-live="polite"
          style={{ ...S.feedback, borderColor: ok ? '#3ddc9766' : '#ff6b6b66', background: ok ? '#3ddc9714' : '#ff6b6b14' }}>
          <div style={{ ...S.fbTitle, color: ok ? '#3ddc97' : '#ff6b6b' }}>
            {ok ? <><Check size={16} /> Correct! +{xp} XP</> : <>Not quite — good try</>}
          </div>
          <div style={{ ...S.body, marginTop: 4 }}>{q.explain || q.hint}</div>
        </div>
      )}

      <button className="lq-tap"
        style={{ ...S.primaryBtn, background: revealed ? accent : '#2a2f3d', color: revealed ? '#0c0e16' : '#e7e9f0', marginTop: 22 }}
        onClick={() => (revealed ? onNext(ok) : submit())}>
        {revealed ? nextLabel : 'Check answer'}
      </button>
    </div>
  );
}
