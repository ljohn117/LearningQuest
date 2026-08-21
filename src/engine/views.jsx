import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowLeft, BookOpen, Check, ChevronLeft, ChevronRight, Eye, Flame, HelpCircle, Lock, Play, Rocket, RotateCcw, Shuffle, Sparkles, Star, Target, Terminal, Trophy, Users, Zap } from 'lucide-react';
import { S } from './styles.jsx';
import { Visual } from './Visual.jsx';
import { Question } from './Question.jsx';
import { CURRICULUM, SUBJECT_ORDER } from '../content/index.js';
import { RANKS, levelInfo, todayStr, yesterday, dayKey, XP_CORRECT, XP_BONUS, PRACTICE_XP } from './progress.js';

export function ProfileSelect({ profiles, onPick, onCreate, onDemo }) {
  const [creating, setCreating] = useState(profiles.length === 0);
  const [v, setV] = useState('');
  const go = () => { const n = v.trim(); if (n) onCreate(n); };
  const AV_COLORS = ['#f6b73c', '#3ddc97', '#ff6b6b', '#5aa9ff', '#c792ea', '#ffb86c'];
  return (
    <div style={{ paddingTop: 40 }}>
      <div style={{ textAlign: 'center' }}>
        <div className="lq-rise" style={{ ...S.medal, background: '#f6b73c22', border: '2px solid #f6b73c', margin: '0 auto', animation: 'pop .5s both' }}>
          <Rocket size={38} color="#f6b73c" />
        </div>
        <div className="lq-rise" style={{ ...S.eyebrow, marginTop: 20, animationDelay: '.06s' }}>Learning Quest</div>
        <h1 className="lq-rise" style={{ ...S.h1, fontSize: 30, animationDelay: '.1s' }}>
          {profiles.length ? 'Who’s exploring today?' : 'Ready to explore?'}
        </h1>
      </div>

      {!creating ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
          {profiles.map((p, i) => {
            const pl = levelInfo(p.xp), c = AV_COLORS[i % AV_COLORS.length];
            return (
              <button key={p.id} className="lq-rise lq-tap lq-card" style={{ ...S.profileCard, animationDelay: `${.14 + i * .05}s` }} onClick={() => onPick(p.id)}>
                <div style={{ ...S.avatar, background: c + '22', border: `1.5px solid ${c}`, color: c }}>{p.name.slice(0, 1).toUpperCase()}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={S.subjName}>{p.name}</div>
                  <div style={S.muted}>Level {pl.level} {pl.rank} · {p.xp} XP</div>
                </div>
                <ChevronRight size={18} color="#5b6275" />
              </button>
            );
          })}
          <button className="lq-rise lq-tap" style={{ ...S.profileCard, justifyContent: 'center', borderStyle: 'dashed', animationDelay: `${.14 + profiles.length * .05}s` }} onClick={() => setCreating(true)}>
            <span style={{ ...S.subjName, color: '#8b91a3' }}>+ New explorer</span>
          </button>
        </div>
      ) : (
        <div className="lq-rise" style={{ textAlign: 'center', marginTop: 24, animationDelay: '.14s' }}>
          <p style={{ ...S.muted, maxWidth: 340, margin: '0 auto 18px' }}>What should we call this explorer?</p>
          <input style={{ ...S.numInput, marginTop: 0, textAlign: 'center', borderColor: '#f6b73c88', fontFamily: "'Bricolage Grotesque', sans-serif" }}
            value={v} maxLength={24} placeholder="Type a name"
            onChange={(e) => setV(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && go()} autoFocus />
          <button className="lq-tap" style={{ ...S.primaryBtn, background: '#f6b73c', marginTop: 16, opacity: v.trim() ? 1 : .5 }} onClick={go} disabled={!v.trim()}>
            Begin <ChevronRight size={18} />
          </button>
          {profiles.length > 0 && (
            <button className="lq-tap" style={{ ...S.ghostBtn, marginTop: 12 }} onClick={() => { setCreating(false); setV(''); }}>Back to explorers</button>
          )}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: 26 }}>
        <button className="lq-tap" style={S.ghostBtn} onClick={onDemo}><Eye size={13} /> Try demo mode</button>
        <div style={{ ...S.muted, fontSize: 12, marginTop: 8 }}>Demo lets visitors play without touching anyone’s progress.</div>
      </div>
    </div>
  );
}

/* ---- 8. DASHBOARD ------------------------------------------------------------ */
export function Dashboard({ lvl, state, subjStats, onOpen, onPractice, onDaily, onReset, onSetName, onSwitch, isDemo }) {
  const [confirm, setConfirm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [backing, setBacking] = useState(false);
  const [nameVal, setNameVal] = useState(state.name);
  const totalDone = SUBJECT_ORDER.reduce((n, s) => n + subjStats(s).done, 0);
  const totalDays = SUBJECT_ORDER.reduce((n, s) => n + subjStats(s).total, 0);
  return (
    <div>
      <div className="lq-rise" style={{ animationDelay: '.02s' }}>
        <div style={S.eyebrow}>Mission Control</div>
        <h1 style={S.h1}>Welcome back, {state.name}.</h1>
        <div style={S.muted}>{totalDone} of {totalDays} missions complete</div>
      </div>

      <button className="lq-tap lq-rise" style={{ ...S.dailyBtn, animationDelay: '.04s' }} onClick={onDaily}>
        <div style={{ ...S.planDot, background: '#5aa9ff33', color: '#5aa9ff' }}><Zap size={16} /></div>
        <div style={{ flex: 1 }}>
          <div style={{ ...S.planTitle, marginBottom: 1 }}>Today's quest</div>
          <div style={{ ...S.muted, fontSize: 13 }}>Warm-up, then a new lesson</div>
        </div>
        <ChevronRight size={18} color="#5aa9ff" />
      </button>

      <div className="lq-rise" style={{ ...S.heroCard, animationDelay: '.06s' }}>
        <div style={S.heroTop}>
          <div>
            <div style={S.rankRow}><Trophy size={15} color="#f6b73c" /><span style={S.rankName}>{lvl.rank}</span></div>
            <div style={S.lvlBig}>Level {lvl.level}</div>
          </div>
          <Streak count={state.streak.count} />
        </div>
        <Bar pct={lvl.pct} accent="#f6b73c" />
        <div style={S.barLabel}>
          <span style={S.mono}>{state.xp} XP</span>
          <span style={S.muted}>{lvl.isMax ? 'Max rank reached' : `${lvl.nextAt - state.xp} XP to level ${lvl.level + 1}`}</span>
        </div>
      </div>

      <div style={S.sectionLabel}>Your Subjects</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {SUBJECT_ORDER.map((id, i) => {
          const s = CURRICULUM[id], st = subjStats(id), Icon = s.icon;
          return (
            <button key={id} type="button" className="lq-rise lq-tap lq-card"
              aria-label={`${s.name}, ${st.done} of ${st.total} days complete`}
              style={{ ...S.cardBtn, ...S.subjCard, animationDelay: `${.1 + i * .05}s` }} onClick={() => onOpen(id)}>
              <div style={{ ...S.subjIcon, background: s.accent + '22', border: `1px solid ${s.accent}55` }}><Icon size={22} color={s.accent} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={S.subjName}>{s.name}</div>
                <div style={S.subjBlurb}>{s.blurb}</div>
                <div style={{ marginTop: 8 }}><Bar pct={st.pct} accent={s.accent} thin /></div>
              </div>
              <div style={S.subjMeta}><span style={{ ...S.mono, color: s.accent }}>{st.done}/{st.total}</span><ChevronRight size={18} color="#5b6275" /></div>
            </button>
          );
        })}
      </div>

      <div style={S.sectionLabel}>Skill Duel</div>
      <button type="button" className="lq-rise lq-tap lq-card" aria-label="Skill Duel — battle a guardian"
        style={{ ...S.cardBtn, ...S.subjCard, borderColor: '#f6b73c55' }} onClick={onPractice}>
        <div style={{ ...S.subjIcon, background: '#f6b73c22', border: '1px solid #f6b73c55' }}><Target size={22} color="#f6b73c" /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={S.subjName}>Battle a guardian</div>
          <div style={S.subjBlurb}>Endless fresh practice questions from every math skill you have unlocked.</div>
        </div>
        <ChevronRight size={18} color="#5b6275" />
      </button>

      <div style={{ marginTop: 22, textAlign: 'center' }}>
        {editing ? (
          <div style={S.confirmRow}>
            <input style={S.miniInput} value={nameVal} maxLength={24} onChange={(e) => setNameVal(e.target.value)} />
            <button className="lq-tap" style={S.ghostBtn} onClick={() => { if (nameVal.trim()) onSetName(nameVal.trim().slice(0, 24)); setEditing(false); }}>Save</button>
            <button className="lq-tap" style={S.ghostBtn} onClick={() => { setNameVal(state.name); setEditing(false); }}>Cancel</button>
          </div>
        ) : !confirm ? (
          <div style={S.confirmRow}>
            <button className="lq-tap" style={S.ghostBtn} onClick={onSwitch}><Users size={13} /> Switch explorer</button>
            {!isDemo && <button className="lq-tap" style={S.ghostBtn} onClick={() => setEditing(true)}>Change name</button>}
            <button className="lq-tap" style={S.ghostBtn} onClick={() => setBacking(true)}>Back up</button>
            <button className="lq-tap" style={S.ghostBtn} onClick={() => setConfirm(true)}><RotateCcw size={13} /> Reset progress</button>
          </div>
        ) : (
          <div style={S.confirmRow}>
            <span style={S.muted}>Erase all progress?</span>
            <button className="lq-tap" style={S.dangerBtn} onClick={() => { onReset(); setConfirm(false); }}>Yes, reset</button>
            <button className="lq-tap" style={S.ghostBtn} onClick={() => setConfirm(false)}>Cancel</button>
          </div>
        )}
      </div>
      {backing && <BackupPanel onClose={() => setBacking(false)} />}
    </div>
  );
}

/* ---- BACKUP BRIDGE: window.storage is origin-scoped; a Vite build won't
   inherit it. Copy this payload out before porting. Downloads are blocked
   in artifacts, so this is copy-to-clipboard by design. -------------------- */
export function BackupPanel({ onClose }) {
  const [txt, setTxt] = useState('Reading...');
  const ta = useRef(null);
  useEffect(() => { (async () => {
    let raw = null;
    try {
      raw = (typeof window !== 'undefined' && window.storage && window.storage.get)
        ? ((await window.storage.get(PROFILES_KEY, false)) || {}).value
        : localStorage.getItem(PROFILES_KEY);
    } catch {}
    setTxt(raw
      ? JSON.stringify({ lqBackup: 1, app: APP_ID, key: PROFILES_KEY, at: new Date().toISOString(), data: JSON.parse(raw) })
      : 'No saved progress found.');
  })(); }, []);
  let days = null;
  try { days = JSON.parse(txt).data.profiles.reduce((n, p) => n + Object.keys(p.completed || {}).length, 0); } catch {}
  const copy = async () => {
    try { await navigator.clipboard.writeText(txt); }
    catch { try { ta.current.select(); document.execCommand('copy'); } catch {} }
  };
  return (
    <div style={S.backupBox}>
      <div style={S.muted}>Copy this and save it somewhere safe.{days !== null ? ' ' + days + ' finished days found.' : ''}</div>
      <textarea ref={ta} readOnly value={txt} style={S.backupTa} onFocus={(e) => e.target.select()} />
      <div style={S.confirmRow}>
        <button className="lq-tap" style={S.ghostBtn} onClick={copy}>Copy</button>
        <button className="lq-tap" style={S.ghostBtn} onClick={onClose}>Done</button>
      </div>
    </div>
  );
}


/* ---- 9. SUBJECT VIEW ----------------------------------------------------------- */
export function SubjectView({ subj, isDayDone, isDayUnlocked, stats, onBack, onDay }) {
  const s = CURRICULUM[subj], Icon = s.icon;
  return (
    <div>
      <BackBar onBack={onBack} />
      <div className="lq-rise" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
        <div style={{ ...S.subjIcon, background: s.accent + '22', border: `1px solid ${s.accent}55` }}><Icon size={22} color={s.accent} /></div>
        <div>
          <h1 style={{ ...S.h1, margin: 0, fontSize: 26 }}>{s.name}</h1>
          <div style={S.subjBlurb}>{stats.done} of {stats.total} days complete</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
        {s.days.map((d, i) => {
          const done = isDayDone(subj, d.id), open = isDayUnlocked(subj, i);
          return (
            <button key={d.id} type="button" disabled={!open}
              className={`lq-rise ${open ? 'lq-tap lq-card' : ''}`}
              aria-label={`Day ${i + 1}, ${d.title}${done ? ', complete' : open ? '' : ', locked'}`}
              style={{ ...S.cardBtn, ...S.dayCard, animationDelay: `${i * .06}s`, opacity: open ? 1 : .55, cursor: open ? 'pointer' : 'default' }}
              onClick={() => open && onDay(d)}>
              <div style={{ ...S.dayNode, borderColor: done ? s.accent : open ? '#3a4154' : '#2a2f3d', background: done ? s.accent : 'transparent' }}>
                {done ? <Check size={16} color="#0c0e16" /> : open ? <span style={{ ...S.mono, color: '#aeb4c4', fontSize: 13 }}>{i + 1}</span> : <Lock size={13} color="#5b6275" />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={S.daySub}>{d.subtitle}</span>
                  {d.tag && <span style={{ ...S.tag, color: s.accent, borderColor: s.accent + '55', background: s.accent + '14' }}>{d.tag}</span>}
                </div>
                <div style={S.dayTitle}>{d.title}</div>
              </div>
              {open && <ChevronRight size={18} color="#5b6275" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---- 10. LESSON VIEW (paged) ------------------------------------------------------ */
export function LessonView({ subj, day, userName, onBack, onStart }) {
  const accent = CURRICULUM[subj].accent;
  const [page, setPage] = useState(0);
  const totalPages = day.pages.length + 1; // + recap
  const isRecap = page === day.pages.length;
  const cur = isRecap ? null : day.pages[page];
  return (
    <div>
      <div style={S.quizTop}>
        <button className="lq-tap" style={S.iconBtn} onClick={onBack}><ArrowLeft size={18} color="#aeb4c4" /></button>
        <div style={{ flex: 1, display: 'flex', gap: 6, justifyContent: 'center' }}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <div key={i} style={{ width: i === page ? 22 : 8, height: 8, borderRadius: 99, background: i <= page ? accent : '#2a2f3d', transition: 'all .3s ease' }} />
          ))}
        </div>
        <span style={{ ...S.mono, color: '#aeb4c4', fontSize: 13 }}>{page + 1}/{totalPages}</span>
      </div>

      {!isRecap ? (
        <div key={page} className="lq-rise" style={{ marginTop: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <div style={{ ...S.eyebrow, color: accent, margin: 0 }}>{day.subtitle}</div>
            {day.tag && <span style={{ ...S.tag, color: accent, borderColor: accent + '55', background: accent + '14' }}>{day.tag}</span>}
          </div>
          <h1 style={{ ...S.h1, marginTop: 6, fontSize: 26 }}>{page === 0 ? day.title : cur.title}</h1>
          {page === 0 && <div style={{ ...S.muted, marginBottom: 4 }}>{cur.title}</div>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 14 }}>
            {cur.blocks.map((b, i) => <Block key={i} b={b} accent={accent} delay={i * .06} />)}
          </div>
        </div>
      ) : (
        <div key="recap" className="lq-rise" style={{ marginTop: 22 }}>
          <div style={{ ...S.eyebrow, color: accent }}>Checkpoint</div>
          <h1 style={{ ...S.h1, fontSize: 26 }}>You can now…</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
            {day.recap.map((r, i) => (
              <div key={i} className="lq-rise" style={{ ...S.recapItem, animationDelay: `${i * .08}s` }}>
                <div style={{ ...S.recapCheck, background: accent + '22', border: `1.5px solid ${accent}` }}><Check size={13} color={accent} /></div>
                <div style={S.body}>{r}</div>
              </div>
            ))}
          </div>
          <div className="lq-rise" style={{ ...S.callout, marginTop: 16, animationDelay: '.3s' }}>
            <Sparkles size={16} color="#f6b73c" style={{ flexShrink: 0, marginTop: 2 }} />
            <div style={S.body}>You’ve got everything you need, {userName}. Hints are there if you want them — using one is smart, not cheating.</div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
        {page > 0 && (
          <button className="lq-tap" style={{ ...S.secondaryBtn }} onClick={() => setPage(page - 1)}>
            <ChevronLeft size={17} /> Back
          </button>
        )}
        {!isRecap ? (
          <button className="lq-tap" style={{ ...S.primaryBtn, background: accent, flex: 1 }} onClick={() => setPage(page + 1)}>
            {page === 0 ? <><BookOpen size={17} /> Let’s go</> : <>Next <ChevronRight size={17} /></>}
          </button>
        ) : (
          <button className="lq-tap" style={{ ...S.primaryBtn, background: accent, flex: 1 }} onClick={onStart}>
            <Target size={17} /> Start Challenge · {day.quiz.length} questions
          </button>
        )}
      </div>
    </div>
  );
}
export function Block({ b, accent, delay }) {
  const base = { animationDelay: `${delay}s` };
  if (b.type === 'text') return <p className="lq-rise" style={{ ...S.body, ...base }}>{b.text}</p>;
  if (b.type === 'concept') return (
    <div className="lq-rise" style={{ ...S.concept, borderColor: accent + '66', ...base }}>
      <div style={{ ...S.conceptTerm, color: accent }}>{b.term}</div><div style={S.body}>{b.def}</div>
    </div>
  );
  if (b.type === 'example') return (
    <div className="lq-rise" style={{ ...S.example, ...base }}><span style={S.exTag}>EXAMPLE</span><div style={{ ...S.body, marginTop: 6 }}>{b.text}</div></div>
  );
  if (b.type === 'callout') return (
    <div className="lq-rise" style={{ ...S.callout, ...base }}><Sparkles size={16} color="#f6b73c" style={{ flexShrink: 0, marginTop: 2 }} /><div style={S.body}>{b.text}</div></div>
  );
  if (b.type === 'formula') return (
    <div className="lq-rise" style={{ ...S.formula, borderColor: accent + '55', ...base }}>
      <div style={{ ...S.formulaText, color: accent }}>{b.text}</div>
      {b.label && <div style={{ ...S.muted, marginTop: 6, textAlign: 'center' }}>{b.label}</div>}
    </div>
  );
  if (b.type === 'visual') return <div className="lq-rise" style={base}><Visual v={b} accent={accent} /></div>;
  if (b.type === 'codelab') return <CodeLab b={b} accent={accent} />;
  return null;
}

/* ---- 11. QUIZ VIEW (with penalty-free hints) -------------------------------------- */
export function QuizView({ subj, day, onExit, onDone }) {
  const accent = CURRICULUM[subj].accent;
  const [i, setI] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  function next(ok) {
    const c = correctCount + (ok ? 1 : 0);
    if (i + 1 >= day.quiz.length) { onDone(c); return; }
    setCorrectCount(c); setI(i + 1);
  }

  return (
    <div>
      <div style={S.quizTop}>
        <button className="lq-tap" style={S.iconBtn} onClick={onExit}><ArrowLeft size={18} color="#aeb4c4" /></button>
        <div style={{ flex: 1 }}><Bar pct={i / day.quiz.length} accent={accent} thin /></div>
        <span style={{ ...S.mono, color: '#aeb4c4', fontSize: 13 }}>{i + 1}/{day.quiz.length}</span>
      </div>
      <div key={i} className="lq-rise" style={{ marginTop: 26 }}>
        <Question q={day.quiz[i]} accent={accent} eyebrow={`Question ${i + 1}`}
          nextLabel={i + 1 >= day.quiz.length ? 'Finish' : 'Next question'} onNext={next} />
      </div>
    </div>
  );
}

/* ---- 12. RESULTS VIEW -------------------------------------------------------------- */
export function ResultsView({ subj, day, correct, earned, leveledTo, userName, onContinue }) {
  const accent = CURRICULUM[subj].accent;
  const total = day.quiz.length, perfect = correct === total;
  const msg = perfect ? 'Flawless!' : correct >= total - 1 ? 'So close to perfect!' : 'Day complete!';
  return (
    <div style={{ textAlign: 'center', paddingTop: 16 }}>
      <div className="lq-rise" style={{ display: 'inline-block' }}>
        <div style={{ ...S.medal, background: accent + '22', border: `2px solid ${accent}`, animation: 'pop .5s both', margin: '0 auto' }}>
          {perfect ? <Trophy size={40} color={accent} /> : <Star size={40} color={accent} />}
        </div>
      </div>
      <h1 className="lq-rise" style={{ ...S.h1, marginTop: 18, animationDelay: '.1s' }}>{msg}</h1>
      <p className="lq-rise" style={{ ...S.muted, animationDelay: '.14s' }}>
        {correct} of {total} correct{perfect ? ` — outstanding, ${userName}!` : ` — every one you missed is now one you know, ${userName}.`}
      </p>
      <div className="lq-rise" style={{ ...S.xpBadge, animationDelay: '.2s' }}><Zap size={18} color="#f6b73c" /> <span style={{ ...S.mono, fontSize: 20 }}>+{earned} XP</span></div>
      {leveledTo && <div className="lq-rise" style={{ ...S.levelUp, animationDelay: '.28s' }}><Sparkles size={16} color="#f6b73c" /> Level up! You reached Level {leveledTo}</div>}
      <div><button className="lq-tap" style={{ ...S.primaryBtn, background: accent, marginTop: 26, maxWidth: 260, marginLeft: 'auto', marginRight: 'auto' }} onClick={onContinue}>Continue <ChevronRight size={18} /></button></div>
    </div>
  );
}

/* ---- 13. SMALL PIECES ---------------------------------------------------------------- */
export function Bar({ pct, accent, thin, label }) {
  return (
    <div role="progressbar" aria-label={label || "Progress"} aria-valuenow={Math.round((pct || 0) * 100)} aria-valuemin={0} aria-valuemax={100} style={{ ...S.track, height: thin ? 6 : 9 }}>
      <div style={{ width: `${Math.round(pct * 100)}%`, height: '100%', borderRadius: 99, background: `linear-gradient(90deg, ${accent}cc, ${accent})`, transition: 'width .6s cubic-bezier(.2,.7,.2,1)' }} />
    </div>
  );
}
export function Streak({ count }) {
  return (
    <div style={S.streak}>
      <Flame size={20} color={count > 0 ? '#ff8a3d' : '#4a505f'} style={count > 0 ? { animation: 'flicker 1.4s ease-in-out infinite' } : {}} />
      <div><div style={{ ...S.mono, fontSize: 18, lineHeight: 1, color: count > 0 ? '#ffb37a' : '#6b7281' }}>{count}</div><div style={S.streakLbl}>day streak</div></div>
    </div>
  );
}
export function BackBar({ onBack }) { return <button className="lq-tap" style={{ ...S.iconBtn, marginBottom: 14 }} onClick={onBack}><ArrowLeft size={18} color="#aeb4c4" /></button>; }

/* ---- CODE LAB: live JavaScript runner -------------------------------------

   The prototype blocked `while` and `do{` with a regex and allowed `for`,
   which meant `for (let i = 1; i >= 1; i++) {}` froze the browser tab. Day
   c12 teaches that a loop with no step instruction runs forever and then
   hands him an editable `for` loop, so that was reachable from the lesson
   itself. The regex also fired on the string "take a while".

   Now every loop body gets an iteration counter injected, so any loop that
   runs away stops itself and reports what happened. `while` is allowed
   again — it is guarded like everything else.

   `new Function` is not a sandbox; it closes over the real globals. The
   risky ones are shadowed by extra parameters left undefined. That is a
   guard rail against a curious kid, not a security boundary. */

const MAX_STEPS = 200000;

/** Inject a step counter into the body of every braced loop. */
function instrument(src) {
  let out = '', i = 0, unbraced = false;
  while (i < src.length) {
    const rest = src.slice(i);
    const m = rest.match(/^\b(for|while)\s*\(/);
    if (m) {
      // walk to the matching close paren
      let depth = 0, j = i + m[0].length - 1;
      for (; j < src.length; j++) {
        if (src[j] === '(') depth++;
        else if (src[j] === ')') { depth--; if (!depth) break; }
      }
      const head = src.slice(i, j + 1);
      let k = j + 1;
      while (k < src.length && /\s/.test(src[k])) k++;
      if (src[k] === '{') { out += head + src.slice(j + 1, k + 1) + '__tick();'; i = k + 1; continue; }
      // the trailing `while (...)` of a do-while needs no body of its own —
      // the `do {` branch below already injected the counter
      const isDoTail = m[1] === 'while' && /\}\s*$/.test(out);
      if (!isDoTail) unbraced = true;        // `for (...) doThing();`
      out += head; i = j + 1; continue;
    }
    const d = rest.match(/^\bdo\s*\{/);
    if (d) { out += d[0] + '__tick();'; i += d[0].length; continue; }
    out += src[i]; i++;
  }
  return { code: out, unbraced };
}

export function CodeLab({ b, accent }) {
  const [src, setSrc] = useState(b.starter || '');
  const [out, setOut] = useState(null);
  const [showHint, setShowHint] = useState(false);

  function run() {
    const { code, unbraced } = instrument(src);
    if (unbraced) {
      setOut({ logs: [], error: 'Put { } around what your loop repeats — that way it is clear where the loop ends.', pass: false });
      return;
    }
    const logs = [];
    let error = null;
    const fake = { log: (...a) => {
      if (logs.length >= 200) throw new Error('That is a lot of output — is the loop ending?');
      logs.push(a.map((x) => (typeof x === 'object' && x !== null ? JSON.stringify(x) : String(x))).join(' '));
    } };
    let steps = 0;
    const tick = () => { if (++steps > MAX_STEPS) throw new Error('This loop never finishes. Check that the counter actually moves toward the stop condition.'); };
    try {
      // extra parameter names shadow the real globals inside the function body
      new Function('console', '__tick', 'window', 'document', 'fetch', 'localStorage', 'XMLHttpRequest',
        code)(fake, tick);
    } catch (e) { error = e.message; }
    const got = logs.join('\n').trim();
    setOut({ logs, error, pass: !error && got === String(b.expect).trim() });
  }

  return (
    <div className="lq-rise" style={S.labBox}>
      <div style={S.labTask}><Terminal size={14} color={accent} /><span>{b.task}</span></div>
      <textarea spellCheck={false} value={src} onChange={(e) => { setSrc(e.target.value); setOut(null); }}
        rows={Math.max(3, src.split('\n').length + 1)} style={{ ...S.labEditor, borderColor: accent + '55' }} />
      <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
        <button className="lq-tap" style={{ ...S.primaryBtn, background: accent, flex: 1, minWidth: 120, marginTop: 0, padding: '11px 14px', fontSize: 14 }} onClick={run}>
          <Play size={15} /> Run code
        </button>
        <button className="lq-tap" style={S.ghostBtn} onClick={() => { setSrc(b.starter || ''); setOut(null); }}>
          <RotateCcw size={13} /> Reset
        </button>
        {b.hint && <button className="lq-tap" style={S.ghostBtn} onClick={() => setShowHint(true)}>Hint</button>}
      </div>
      {showHint && b.hint && <div style={{ ...S.hintBox, marginTop: 10 }}>{b.hint}</div>}
      {out && (
        <div style={S.labOut}>
          <div style={S.labOutLbl}>OUTPUT</div>
          {out.error
            ? <div style={{ ...S.labLine, color: '#ff8b8b' }}>{out.error}</div>
            : out.logs.length === 0
              ? <div style={{ ...S.labLine, color: '#5b6275' }}>(nothing printed yet)</div>
              : out.logs.map((l, i) => <div key={i} style={S.labLine}>{l}</div>)}
          {out.pass && <div style={S.labPass}><Check size={15} /> Correct — that is exactly right.</div>}
          {!out.pass && !out.error && out.logs.length > 0 && <div style={S.labTry}>Close — compare your output with the goal and try again.</div>}
        </div>
      )}
    </div>
  );
}

/* ---- PRACTICE: generated drills ------------------------------------------- */
export const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
export const pickOne = (a) => a[Math.floor(Math.random() * a.length)];

export const DRILLS = [
  { id: 'dr1', day: 'm1', name: 'Unit Rates', gen: () => { const per = rnd(2, 9), n = pickOne([3, 4, 5, 6, 8]); return { prompt: `${n} notebooks cost $${n * per}. What does ONE notebook cost, in dollars?`, answer: per, hint: 'Divide the total cost by how many there are.' }; } },
  { id: 'dr2', day: 'm2', name: 'Percents', gen: () => { const p = pickOne([10, 20, 25, 50, 75]), n = pickOne([40, 60, 80, 100, 200]); return { prompt: `What is ${p}% of ${n}?`, answer: (p / 100) * n, hint: `Turn ${p}% into a decimal, then multiply.` }; } },
  { id: 'dr3', day: 'm3', name: 'Two-Step Equations', gen: () => { const a = rnd(2, 6), x = rnd(2, 9), b = rnd(1, 15); return { prompt: `Solve ${a}x + ${b} = ${a * x + b}. What is x?`, answer: x, hint: `Subtract ${b} from both sides first, then divide by ${a}.` }; } },
  { id: 'dr4', day: 'm4', name: 'Simplify & Evaluate', gen: () => { const a = rnd(2, 6), b = rnd(2, 6), x = rnd(2, 8); return { prompt: `Simplify ${a}x + ${b}x, then evaluate it when x = ${x}.`, answer: (a + b) * x, hint: `Combine like terms into ${a + b}x, then multiply by ${x}.` }; } },
  { id: 'dr5', day: 'm5', name: 'Variables Both Sides', gen: () => { const x = rnd(2, 9), c = rnd(1, 4), a = c + rnd(1, 4), d = rnd(1, 12); const cs = c === 1 ? 'x' : c + 'x'; return { prompt: `Solve ${a}x + ${d} = ${cs} + ${(a - c) * x + d}. What is x?`, answer: x, hint: `Subtract ${cs} from both sides to gather the x terms.` }; } },
  { id: 'dr6', day: 'm6', name: 'Lines & Slope', gen: () => { const m = rnd(2, 6), b = rnd(1, 9), x = rnd(2, 8); return { prompt: `For y = ${m}x + ${b}, what is y when x = ${x}?`, answer: m * x + b, hint: 'Multiply first, then add the starting value.' }; } },
  { id: 'dr7', day: 'm7', name: 'Exponents', gen: () => (Math.random() < 0.5 ? (() => { const a = rnd(2, 5), b = rnd(2, 4); return { prompt: `What is ${a}^${b}?`, answer: Math.pow(a, b), hint: `Multiply ${a} by itself ${b} times.` }; })() : (() => { const a = rnd(2, 5), b = rnd(2, 5); return { prompt: `x^${a} · x^${b} = x^? — what is the exponent?`, answer: a + b, hint: 'Same base means you add the exponents.' }; })()) },
  { id: 'dr8', day: 'm8', name: 'Scientific Notation', gen: () => { const k = rnd(3, 9), lead = rnd(1, 9); return { prompt: `${lead}${'0'.repeat(k)} written as ${lead} × 10^? — what is the exponent?`, answer: k, hint: 'Count how many places the decimal point moves.' }; } },
  { id: 'dr9', day: 'm9', name: 'Square Roots', gen: () => { const n = rnd(2, 15); return { prompt: `What is √${n * n}?`, answer: n, hint: 'What number times itself gives that value?' }; } },
  { id: 'dr10', day: 'm10', name: 'Pythagorean Theorem', gen: () => { const t = pickOne([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [7, 24, 25]]); return { prompt: `A right triangle has legs ${t[0]} and ${t[1]}. What is the hypotenuse?`, answer: t[2], hint: 'Square both legs, add them, then take the square root.' }; } },
  { id: 'dr11', day: 'm11', name: 'Systems of Equations', gen: () => { const x = rnd(3, 12), y = rnd(1, x - 1); return { prompt: `x + y = ${x + y} and x − y = ${x - y}. What is x?`, answer: x, hint: 'Add the two equations so the y terms cancel, then halve.' }; } },
  { id: 'dr12', day: 'm12', name: 'Inequalities', gen: () => { const b = rnd(2, 9), x = rnd(3, 15); return { prompt: `Solve x + ${b} > ${x + b}. The answer is x greater than what number?`, answer: x, hint: `Subtract ${b} from both sides.` }; } },
  { id: 'dr13', day: 'm13', name: 'Function Notation', gen: () => { const a = rnd(2, 6), b = rnd(1, 9), k = rnd(2, 8); return { prompt: `If f(x) = ${a}x + ${b}, what is f(${k})?`, answer: a * k + b, hint: `Replace every x with ${k}, then compute.` }; } },
  { id: 'dr14', day: 'm14', name: 'Quadratics', gen: () => { const c = rnd(0, 6), k = pickOne([-4, -3, -2, 2, 3, 4, 5]); return { prompt: `For y = x²${c ? ' + ' + c : ''}, what is y when x = ${k}?`, answer: k * k + c, hint: 'Square the input first — a negative squared turns positive.' }; } },
];

export const IMPORTABLE = [
  { subj: 'gov', label: 'Government & Civics', note: 'all 6 days' },
  { subj: 'biz', label: 'Business — Days 1 to 6', note: 'the original 6', only: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'] },
  { subj: 'fossils', label: 'Fossils & Deep Time', note: 'all 6 days' },
];

export function ImportPanel({ onApply, onCancel }) {
  const [sel, setSel] = useState({});
  const any = Object.values(sel).some(Boolean);
  return (
    <div style={S.importBox}>
      <div style={S.importTitle}>Already finished these?</div>
      <div style={{ ...S.muted, marginBottom: 12 }}>
        Tick any lane completed in the Core app and it will be credited here, with the XP those days were worth.
      </div>
      {IMPORTABLE.map((it) => {
        const on = !!sel[it.subj];
        return (
          <div key={it.subj} className="lq-tap" onClick={() => setSel((s) => ({ ...s, [it.subj]: !s[it.subj] }))}
            style={{ ...S.importRow, borderColor: on ? CURRICULUM[it.subj].accent + '99' : '#262c3d', background: on ? CURRICULUM[it.subj].accent + '14' : 'transparent' }}>
            <div style={{ ...S.importCheck, borderColor: on ? CURRICULUM[it.subj].accent : '#3a4154', background: on ? CURRICULUM[it.subj].accent : 'transparent' }}>
              {on && <Check size={13} color="#0c0e16" />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={S.importLabel}>{it.label}</div>
              <div style={S.importNote}>{it.note}</div>
            </div>
          </div>
        );
      })}
      <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
        <button className="lq-tap" style={{ ...S.primaryBtn, background: any ? '#3ddc97' : '#2a2f3d', color: any ? '#0c0e16' : '#8b91a3', marginTop: 0, flex: 1, padding: '11px 14px', fontSize: 14 }}
          onClick={() => any && onApply(IMPORTABLE.filter((it) => sel[it.subj]))}>
          Credit selected
        </button>
        <button className="lq-tap" style={S.ghostBtn} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
