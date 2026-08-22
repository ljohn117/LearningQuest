import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Store } from './store.js';
import { S, Shell, FontAndStyle } from './engine/styles.jsx';
import { CURRICULUM } from './content/index.js';
import {
  levelInfo, todayStr, dayKey, advanceStreak, skipsAfter,
  XP_CORRECT, XP_BONUS, PRACTICE_XP, DEFAULT_STATE,
} from './engine/progress.js';
import {
  ProfileSelect, Dashboard, SubjectView, LessonView, QuizView, ResultsView,
} from './engine/views.jsx';
import { DailyPlan, WarmupSession, WarmupDone } from './engine/DailyQuest.jsx';
import { DuelIntro, DuelSession, DuelWon } from './engine/Duel.jsx';
import { ParentView } from './engine/ParentView.jsx';
import { LadderView } from './engine/Ladder.jsx';
import { recordReview, REVIEW_XP, pickLesson } from './engine/daily.js';

export default function App() {
  const [db, setDb] = useState(null);          // { profiles: [], lastActive }
  const [activeId, setActiveId] = useState(null);
  const [demo, setDemo] = useState(null);      // ephemeral profile — never saved
  const [view, setView] = useState({ name: 'dash' });
  const [saveFailed, setSaveFailed] = useState(false);
  const firstSave = useRef(true);
  const sessionStart = useRef(null);   // set when a daily session begins

  useEffect(() => {
    const d = Store.load();
    const data = d && Array.isArray(d.profiles) ? d : { profiles: [], lastActive: null };
    setDb(data);
    if (data.lastActive && data.profiles.some((p) => p.id === data.lastActive)) setActiveId(data.lastActive);
  }, []);
  useEffect(() => {
    if (!db) return;
    if (firstSave.current) { firstSave.current = false; return; }
    if (!Store.save(db)) setSaveFailed(true);
  }, [db]);

  const profile = demo || (db ? db.profiles.find((p) => p.id === activeId) : null) || null;
  const lvl = useMemo(() => levelInfo(profile ? profile.xp : 0), [profile]);

  function updateProfile(fn) {
    if (demo) { setDemo((p) => fn(p)); return; }
    setDb((d) => ({ ...d, profiles: d.profiles.map((p) => (p.id === activeId ? fn(p) : p)) }));
  }
  function createProfile(name) {
    const prof = { id: 'p' + Date.now().toString(36), ...DEFAULT_STATE, name: name.slice(0, 24) };
    setDb((d) => ({ profiles: [...d.profiles, prof], lastActive: prof.id }));
    setActiveId(prof.id); setView({ name: 'dash' });
  }
  function pickProfile(id) {
    setDb((d) => ({ ...d, lastActive: id }));
    setActiveId(id); setView({ name: 'dash' });
  }
  function startDemo() {
    setDemo({ id: 'demo', ...DEFAULT_STATE, name: 'Demo Explorer' });
    setView({ name: 'dash' });
  }
  function exitToProfiles() {
    setDemo(null); setActiveId(null); setView({ name: 'dash' });
    setDb((d) => ({ ...d, lastActive: null }));
  }

  const isDayDone = (subj, id) => !!profile.completed[dayKey(subj, id)];
  /* A day may also declare cross-lane prerequisites, e.g.
     requires: ['cs:c2', 'math:m7']. Connector days use this so they only
     open once both halves of the connection have actually been learned. */
  const isDayUnlocked = (subj, idx) => {
    const day = CURRICULUM[subj].days[idx];
    if (day.requires && !day.requires.every((k) => !!profile.completed[k])) return false;
    return idx === 0 || isDayDone(subj, CURRICULUM[subj].days[idx - 1].id);
  };
  function subjStats(subj) {
    const days = CURRICULUM[subj].days;
    const done = days.filter((d) => isDayDone(subj, d.id)).length;
    return { done, total: days.length, pct: days.length ? done / days.length : 0 };
  }
  function finishDay(subj, day, correctCount) {
    const earned = correctCount * XP_CORRECT + XP_BONUS;
    updateProfile((p) => {
      const beforeLvl = levelInfo(p.xp).level;
      const xp = p.xp + earned;
      const key = dayKey(subj, day.id);
      const prevBest = p.completed[key]?.best ?? 0;
      const completed = { ...p.completed, [key]: { best: Math.max(prevBest, correctCount), total: day.quiz.length } };
      /* Spend banked skip days to bridge a gap before banking any new one,
         so finishing after a break cannot pay for the break retroactively. */
      const { streak, skips, spent } = advanceStreak(p.streak, p.skips || 0);
      return {
        ...p, xp, streak, completed,
        skips: skipsAfter(Object.keys(completed).length, skips),
        _skipSpent: spent,
        _leveledTo: levelInfo(xp).level > beforeLvl ? levelInfo(xp).level : null,
      };
    });
    return earned;
  }

  /* His own read on the difficulty of a day, tapped once on the results
     screen. Keyed like everything else by subject:dayId, overwritten if he
     changes his mind, and never required. */
  function recordCalibration(subj, dayId, level) {
    updateProfile((p) => {
      const next = { ...(p.calibration || {}) };
      if (level) next[dayKey(subj, dayId)] = { level, at: todayStr() };
      else delete next[dayKey(subj, dayId)];
      return { ...p, calibration: next };
    });
  }

  function finishWarmup(results) {
    const earned = results.filter((r) => r.correct).length * REVIEW_XP;
    updateProfile((p) => {
      const beforeLvl = levelInfo(p.xp).level;
      const xp = p.xp + earned;
      const { streak, skips, spent } = advanceStreak(p.streak, p.skips || 0);
      return {
        ...p, xp, streak, skips, review: recordReview(p, results),
        _skipSpent: spent,
        _leveledTo: levelInfo(xp).level > beforeLvl ? levelInfo(xp).level : null,
      };
    });
    return earned;
  }

  function finishPractice(drillId, correctCount, bestStreak) {
    const earned = correctCount * PRACTICE_XP;
    const key = drillId || 'mixed';
    updateProfile((p) => {
      const beforeLvl = levelInfo(p.xp).level;
      const t = todayStr();
      let count = p.streak.count;
      if (p.streak.last === t) {} else if (p.streak.last === yesterday()) count += 1; else count = 1;
      const xp = p.xp + earned;
      const pr = p.practice || {};
      const prev = pr[key] || { runs: 0, bestStreak: 0 };
      return {
        ...p, xp, streak: { count, last: t },
        practice: { ...pr, [key]: { runs: prev.runs + 1, bestStreak: Math.max(prev.bestStreak, bestStreak) } },
        _leveledTo: levelInfo(xp).level > beforeLvl ? levelInfo(xp).level : null,
      };
    });
    return earned;
  }

  if (!db) return <Shell><FontAndStyle /><div style={S.loading}>Loading your quest…</div></Shell>;
  if (!profile) return (
    <Shell><FontAndStyle />
      <ProfileSelect profiles={db.profiles} onPick={pickProfile} onCreate={createProfile} onDemo={startDemo} />
    </Shell>
  );

  return (
    <Shell>
      <FontAndStyle />
      {saveFailed && (
        <div style={S.demoBar}>
          <span>Progress could not be saved. Check that this browser allows site data.</span>
        </div>
      )}
      {demo && (
        <div style={S.demoBar}>
          <span>Demo mode — progress will not be saved</span>
          <button className="lq-tap" style={S.demoExit} onClick={exitToProfiles}>Exit</button>
        </div>
      )}
      {view.name === 'dash' && (
        <Dashboard lvl={lvl} state={profile} subjStats={subjStats}
          onOpen={(subj) => setView({ name: 'subject', subj })}
          onReset={() => updateProfile((p) => ({ ...p, xp: 0, completed: {}, practice: {}, review: {}, writing: {}, calibration: {}, streak: { count: 0, last: null }, skips: 0, _leveledTo: null }))}
          onSetName={(n) => updateProfile((p) => ({ ...p, name: n }))}
          onPractice={() => setView({ name: 'practice' })}
          onDaily={() => { sessionStart.current = Date.now(); setView({ name: 'daily' }); }}
          onParent={() => setView({ name: 'parent' })}
          onLadder={() => setView({ name: 'ladder' })}
          onSwitch={exitToProfiles} isDemo={!!demo} />
      )}
      {view.name === 'ladder' && (
        <LadderView profile={profile}
          onBack={() => setView({ name: 'dash' })}
          onOpenDay={(subj, dayId) => {
            const day = CURRICULUM[subj]?.days.find((d) => d.id === dayId);
            if (day) setView({ name: 'lesson', subj, day, from: 'ladder' });
          }} />
      )}
      {view.name === 'parent' && (
        <ParentView profile={profile} onBack={() => setView({ name: 'dash' })} />
      )}
      {view.name === 'daily' && (
        <DailyPlan profile={profile} onBack={() => setView({ name: 'dash' })}
          onWarmup={(items) => setView({ name: 'warmup', items })}
          onLesson={(l) => setView({ name: 'lesson', subj: l.subj, day: l.day, from: 'daily' })} />
      )}
      {view.name === 'warmup' && (
        <WarmupSession items={view.items} onExit={() => setView({ name: 'dash' })}
          onDone={(results) => { const earned = finishWarmup(results); setView({ name: 'warmdone', results, earned }); }} />
      )}
      {view.name === 'warmdone' && (
        <WarmupDone results={view.results} earned={view.earned} lesson={pickLesson(profile)}
          onLesson={(l) => setView({ name: 'lesson', subj: l.subj, day: l.day, from: 'daily' })}
          onBack={() => setView({ name: 'dash' })} />
      )}
      {view.name === 'practice' && (
        <DuelIntro profile={profile} onBack={() => setView({ name: 'dash' })}
          onStart={(drillId, allyKey) => setView({ name: 'duel', drillId, allyKey })} />
      )}
      {view.name === 'duel' && (
        <DuelSession drillId={view.drillId} allyKey={view.allyKey} profile={profile}
          onExit={() => setView({ name: 'practice' })}
          onDone={(result) => { const earned = finishPractice(view.drillId, result.right, result.bestStreak); setView({ name: 'duelwon', result, earned }); }} />
      )}
      {view.name === 'duelwon' && (
        <DuelWon result={view.result} earned={view.earned}
          onContinue={() => setView({ name: 'practice' })} />
      )}
      {view.name === 'subject' && (
        <SubjectView subj={view.subj} isDayDone={isDayDone} isDayUnlocked={isDayUnlocked} stats={subjStats(view.subj)}
          onBack={() => setView({ name: 'dash' })} onDay={(day) => setView({ name: 'lesson', subj: view.subj, day })} />
      )}
      {view.name === 'lesson' && (
        <LessonView subj={view.subj} day={view.day} userName={profile.name}
          writing={profile.writing}
          onWrite={(key, v) => updateProfile((p) => ({ ...p, writing: { ...(p.writing || {}), [key]: { ...v, at: todayStr() } } }))}
          onBack={() => setView(view.from === 'daily' ? { name: 'dash' } : view.from === 'ladder' ? { name: 'ladder' } : { name: 'subject', subj: view.subj })}
          onStart={() => setView({ name: 'quiz', subj: view.subj, day: view.day, from: view.from })} />
      )}
      {view.name === 'quiz' && (
        <QuizView subj={view.subj} day={view.day}
          onExit={() => setView(view.from === 'ladder' ? { name: 'ladder' } : { name: 'subject', subj: view.subj })}
          onDone={(correct) => { const earned = finishDay(view.subj, view.day, correct); setView({ name: 'results', subj: view.subj, day: view.day, correct, earned, from: view.from }); }} />
      )}
      {view.name === 'results' && (
        <ResultsView subj={view.subj} day={view.day} correct={view.correct} earned={view.earned} userName={profile.name}
          leveledTo={profile._leveledTo}
          sessionMinutes={view.from === 'daily' && sessionStart.current ? (Date.now() - sessionStart.current) / 60000 : 0}
          skipSpent={profile._skipSpent || 0}
          next={(() => {
            /* profile is already updated at this point, so pickLesson returns
               what actually comes next rather than the day he just did. */
            const l = pickLesson(profile);
            if (!l || (l.subj === view.subj && l.day.id === view.day.id)) return null;
            const hook = (l.day.subtitle || '').split('·').slice(1).join('·').trim();
            return { subj: l.subj, day: l.day, hook };
          })()}
          rating={profile.calibration?.[dayKey(view.subj, view.day.id)]?.level || null}
          onRate={(level) => recordCalibration(view.subj, view.day.id, level)}
          onContinue={() => { if (view.from === 'daily') sessionStart.current = null; setView(view.from === 'daily' ? { name: 'dash' } : view.from === 'ladder' ? { name: 'ladder' } : { name: 'subject', subj: view.subj }); }} />
      )}
    </Shell>
  );
}

