import React from 'react';
import { S } from './styles.jsx';
import { useStages, stageCount } from './motion.js';

/* Named SVG diagrams. Union of both prototypes' cases — the three that
   appeared in both (branches, supplydemand, strata) were byte-identical.
 *
 * MOTION. Some of these teach a sequence rather than a shape, and those play
 * once when they scroll into view. See motion.js for the rule that keeps it
 * safe: `stage` rests at the FINAL frame, so a diagram is complete without
 * JavaScript and nothing is ever visible only while it is moving.
 *
 * The hook is called once, unconditionally, before any of the kind branches —
 * every branch below returns early, so calling it inside one would break the
 * rules of hooks the first time a page rendered two different kinds. */
export function Visual({ v, accent }) {
  const { ref, stage, playing, replay, last } = useStages(stageCount(v));
  const shown = (i) => i <= stage;            // is part i revealed yet
  const wrap = (children, h = 150) => (
    <div ref={ref} style={{ ...S.vizBox, position: 'relative' }}>
      <svg viewBox={`0 0 320 ${h}`} width="100%" style={{ display: 'block' }}>{children}</svg>
      {last > 0 && (
        <button type="button" onClick={replay} aria-label="Play this diagram again"
                title="Play again" style={S.vizReplay} disabled={playing}>
          {'\u21bb'}
        </button>
      )}
    </div>
  );
  if (v.kind === 'bars') {
    /* SCALED MODE USED TO DRAW HALF THE RATIO.
     *
     * math:m2 says "2 : 3 is the same ratio as 8 : 12" and passes all four
     * numbers. The renderer drew `a` and `a2` only — two blocks, then eight —
     * and never drew b or b2 at all, so the picture for equivalent ratios
     * showed one side of each. It also capped every row at Math.min(n, 8),
     * which would have clipped the 12 even if it had been drawn.
     *
     * Both parts now appear, in two colours, and the unit shrinks to fit
     * whatever the largest row needs instead of silently dropping blocks. */
    const unit0 = 30;
    if (v.scaled) {
      const rows = [[v.a, v.b, v.labelA], [v.a2, v.b2, v.labelB]];
      const maxTotal = Math.max(...rows.map(([x, y]) => (x || 0) + (y || 0)), 1);
      const mid = 10, avail = 292 - mid;
      const unit = Math.max(4, Math.min(unit0, Math.floor(avail / maxTotal) - 2));
      const g = unit > 18 ? 4 : 2;
      const Group = (n, x, y, color) => Array.from({ length: n }).map((_, i) => (
        <rect key={color + i} x={x + i * (unit + g)} y={y} width={unit} height={24} rx={Math.min(5, unit / 2)}
              fill={color} opacity={.9} />
      ));
      return wrap(<>
        {rows.map(([x, y, label], r) => {
          const top = 32 + r * 58;
          const xB = 14 + (x || 0) * (unit + g) + mid;
          return (
            <g key={r}>
              <text x={14} y={top - 8} fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">
                {r === 1 ? `${label} — same ratio, scaled up` : label}
              </text>
              {Group(x || 0, 14, top, accent)}
              {Group(y || 0, xB, top, '#5aa9ff')}
            </g>
          );
        })}
      </>, 148);
    }
    const Row = ({ y, n, color, label }) => (
      <g>
        {Array.from({ length: n }).map((_, i) => (
          <rect key={i} x={14 + i * (unit0 + 4)} y={y} width={unit0} height={26} rx={6} fill={color} opacity={.9} />
        ))}
        <text x={14} y={y - 8} fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">{label}</text>
      </g>
    );
    return wrap(<>
      <Row y={44} n={v.a} color={accent} label={v.labelA} />
      <Row y={96} n={v.b} color="#5aa9ff" label={v.labelB} />
    </>, 140);
  }
  if (v.kind === 'scale') return wrap(<>
    <line x1="160" y1="34" x2="160" y2="96" stroke="#3a4154" strokeWidth="6" strokeLinecap="round" />
    <rect x="118" y="96" width="84" height="10" rx="5" fill="#3a4154" />
    <line x1="60" y1="40" x2="260" y2="40" stroke="#8b91a3" strokeWidth="5" strokeLinecap="round" />
    <line x1="78" y1="40" x2="78" y2="56" stroke="#8b91a3" strokeWidth="3" />
    <line x1="242" y1="40" x2="242" y2="56" stroke="#8b91a3" strokeWidth="3" />
    <rect x="36" y="56" width="84" height="30" rx="9" fill={accent + '33'} stroke={accent} strokeWidth="1.5" />
    <text x="78" y="76" textAnchor="middle" fill={accent} fontSize="14" fontWeight="700" fontFamily="JetBrains Mono, monospace">{v.left}</text>
    <rect x="200" y="56" width="84" height="30" rx="9" fill="#5aa9ff33" stroke="#5aa9ff" strokeWidth="1.5" />
    <text x="242" y="76" textAnchor="middle" fill="#5aa9ff" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono, monospace">{v.right}</text>
    <text x="160" y="128" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">balanced — both sides equal</text>
  </>, 140);
  if (v.kind === 'atom') {
    const shells = [[2, 30], [4, 56]];
    return wrap(<>
      <circle cx="160" cy="74" r="14" fill={accent} opacity=".9" />
      <text x="160" y="78" textAnchor="middle" fill="#0c0e16" fontSize="10" fontWeight="800" fontFamily="JetBrains Mono, monospace">{v.protons}p</text>
      {shells.map(([n, r], si) => (
        <g key={si}>
          <circle cx="160" cy="74" r={r} fill="none" stroke="#3a4154" strokeWidth="1.5" strokeDasharray="3 4" />
          {Array.from({ length: n }).map((_, i) => {
            const a = (i / n) * Math.PI * 2 + si;
            return <circle key={i} cx={160 + r * Math.cos(a)} cy={74 + r * Math.sin(a)} r="5" fill="#5aa9ff" style={{ animation: `drift ${3 + si}s ease-in-out infinite` }} />;
          })}
        </g>
      ))}
      <text x="160" y="146" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">carbon: 6 protons · electrons in shells</text>
    </>, 156);
  }
  if (v.kind === 'particles') {
    const Box = ({ x, label, dots }) => (
      <g>
        <rect x={x} y="22" width="88" height="78" rx="10" fill="#161a28" stroke="#2a2f3d" />
        {dots}
        <text x={x + 44} y="120" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">{label}</text>
      </g>
    );
    const grid = []; for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) grid.push(<circle key={`s${r}${c}`} cx={26 + c * 24} cy={40 + r * 24} r="6" fill={accent} />);
    const liq = [[36, 78], [58, 84], [80, 76], [44, 58], [70, 60], [58, 40]].map(([x, y], i) => <circle key={`l${i}`} cx={x + 102} cy={y} r="6" fill={accent} style={{ animation: `drift ${2.4 + i * .3}s ease-in-out infinite` }} />);
    const gas = [[228, 36], [262, 52], [240, 78], [286, 34], [292, 86], [256, 92]].map(([x, y], i) => <circle key={`g${i}`} cx={x} cy={y} r="5" fill={accent} opacity=".85" style={{ animation: `drift ${1.2 + i * .2}s ease-in-out infinite` }} />);
    return wrap(<>
      {/* The three states arrive in order, because the day is about the
          TRANSITION: same particles, progressively freer. Three boxes that
          appear at once read as three unrelated substances. */}
      <g style={{ opacity: shown(0) ? 1 : 0.12, transition: 'opacity .4s ease-out' }}><Box x={12} label="solid" dots={grid} /></g>
      <g style={{ opacity: shown(1) ? 1 : 0.12, transition: 'opacity .4s ease-out' }}><Box x={114} label="liquid" dots={liq} /></g>
      <g style={{ opacity: shown(2) ? 1 : 0.12, transition: 'opacity .4s ease-out' }}><Box x={216} label="gas" dots={gas} /></g>
    </>, 134);
  }
  if (v.kind === 'graph') {
    const pts = [[0, 1], [1, 3], [2, 5]];
    const px = (x) => 60 + x * 84, py = (y) => 124 - y * 17;
    return wrap(<>
      <line x1="48" y1="124" x2="300" y2="124" stroke="#3a4154" strokeWidth="2" />
      <line x1="60" y1="18" x2="60" y2="136" stroke="#3a4154" strokeWidth="2" />
      <line x1={px(-0.1)} y1={py(0.8)} x2={px(2.6)} y2={py(6.2)} stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
      {pts.map(([x, y], i) => (
        <g key={i}>
          <circle cx={px(x)} cy={py(y)} r="6" fill={accent} stroke="#0c0e16" strokeWidth="2" />
          <text x={px(x) + 11} y={py(y) - 7} fill="#8b91a3" fontSize="10.5" fontFamily="JetBrains Mono, monospace">({x},{y})</text>
        </g>
      ))}
      <text x="174" y="148" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">{v.label} — every input lands on the line</text>
    </>, 156);
  }
  if (v.kind === 'rtriangle') return wrap(<>
    <polygon points="62,118 62,42 256,118" fill={accent + '22'} stroke={accent} strokeWidth="2" strokeLinejoin="round" />
    <rect x="62" y="102" width="16" height="16" fill="none" stroke={accent} strokeWidth="1.5" />
    <text x="46" y="84" fill="#8b91a3" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono, monospace">a</text>
    <text x="150" y="134" fill="#8b91a3" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono, monospace">b</text>
    <text x="166" y="74" fill={accent} fontSize="14" fontWeight="700" fontFamily="JetBrains Mono, monospace">c</text>
    <text x="160" y="148" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">a² + b² = c²</text>
  </>, 156);
  /* Parabolas, from real coefficients.
   *
   * This drew a fixed y = x² and read no data at all, which is why it was
   * used exactly once. math:m21 teaches the discriminant and had to make do
   * with a TABLE whose third column was literally headed "the curve", with
   * cells reading "crosses twice", "touches once", "misses" — words standing
   * in for three shapes that fit side by side in one picture. */
  if (v.kind === 'parabola') {
    const panels = v.panels || [{ a: v.a ?? 1, b: v.b ?? 0, c: v.c ?? 0, label: v.label }];
    const n = panels.length;
    const pad = 8, gap = n > 1 ? 10 : 0;
    const pw = (320 - pad * 2 - gap * (n - 1)) / n;
    const hasLabels = panels.some((q) => q.label);
    const h = hasLabels ? 176 : 156;
    const plot = (q, ox) => {
      const a = q.a ?? 1, b = q.b ?? 0, c = q.c ?? 0;
      const xv = -b / (2 * a);                       // vertex, so the curve is centred on what matters
      const span = n > 1 ? 3.2 : 3.6;
      const xs = Array.from({ length: 48 }, (_, i) => xv - span + (i / 47) * span * 2);
      const ys = xs.map((x) => a * x * x + b * x + c);
      const yLo = Math.min(...ys, 0), yHi = Math.max(...ys, 0);
      const padY = (yHi - yLo) * 0.12 || 1;
      const top = 16, bot = hasLabels ? 128 : 134;
      const px = (x) => ox + ((x - (xv - span)) / (span * 2)) * pw;
      const py = (y) => bot - ((y - (yLo - padY)) / ((yHi + padY) - (yLo - padY))) * (bot - top);
      const d = xs.map((x, i) => `${i ? 'L' : 'M'}${px(x).toFixed(1)},${py(ys[i]).toFixed(1)}`).join(' ');
      /* Real roots, marked where they really are. */
      const disc = b * b - 4 * a * c;
      const roots = disc > 1e-9 ? [(-b - Math.sqrt(disc)) / (2 * a), (-b + Math.sqrt(disc)) / (2 * a)]
        : Math.abs(disc) <= 1e-9 ? [xv] : [];
      return (
        <g key={ox}>
          <line x1={ox} y1={py(0)} x2={ox + pw} y2={py(0)} stroke="#3a4154" strokeWidth="1.5" />
          <line x1={px(xv)} y1={top - 2} x2={px(xv)} y2={bot} stroke="#2a2f3d" strokeWidth="1" />
          <path d={d} fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {roots.filter((r) => r >= xv - span && r <= xv + span).map((r, i) => (
            <circle key={i} cx={px(r)} cy={py(0)} r="4.5" fill="#3ddc97" stroke="#0c0e16" strokeWidth="1.5" />
          ))}
          {q.label && (
            /* Monospace is ~0.6em wide, so a label may only be as long as its
               own panel. The first three-panel version ran the labels into
               each other and off both edges: "ositive - crosses twiceZero -
               just touchesnegative". Shrink to fit, then clip. */
            <text x={ox + pw / 2} y={148} textAnchor="middle" fill="#8b91a3"
                  fontSize={Math.max(7, Math.min(10, (pw - 6) / (String(q.label).length * 0.62)))}
                  fontFamily="JetBrains Mono, monospace">
              {String(q.label).slice(0, Math.floor((pw - 6) / 4.4))}
            </text>
          )}
        </g>
      );
    };
    return wrap(<>
      {panels.map((q, i) => (
        <g key={i} style={{ opacity: shown(i) ? 1 : 0.1, transition: 'opacity .45s ease-out' }}>
          {plot(q, pad + i * (pw + gap))}
        </g>
      ))}
      <text x="160" y={h - 6} textAnchor="middle" fill="#8b91a3" fontSize="10"
            fontFamily="JetBrains Mono, monospace">
        {v.caption || 'y = x\u00b2 \u2014 a parabola, not a line'}
      </text>
    </>, h);
  }
  /* A root with its branches. Was hardcoded to GOVERNMENT / LEGIS / EXEC /
     JUDIC, which is why it appeared on exactly one day. Any "one thing splits
     into these" idea has the same shape: a counting tree, a taxonomy, three
     branches of state. */
  if (v.kind === 'branches') {
    const root = v.root || 'GOVERNMENT';
    const kids = v.children || [
      { label: 'LEGIS.', note: 'makes laws' },
      { label: 'EXEC.', note: 'enforces' },
      { label: 'JUDIC.', note: 'interprets' },
    ];
    const n = kids.length;
    const pad = 8, gap = 8;
    const bw = Math.min(96, (320 - pad * 2 - gap * (n - 1)) / n);
    const span = n * bw + (n - 1) * gap;
    const left = (320 - span) / 2;
    const cx = (i) => left + i * (bw + gap) + bw / 2;
    const longest = Math.max(...kids.map((k) => String(k.label).length));
    const fs = longest > 11 ? 8 : longest > 8 ? 9 : 10.5;
    return wrap(<>
      <rect x="118" y="14" width="84" height="30" rx="8" fill={accent + '33'} stroke={accent} strokeWidth="1.5" />
      <text x="160" y="33" textAnchor="middle" fill={accent} fontSize={String(root).length > 10 ? 9 : 10.5}
            fontWeight="700" fontFamily="JetBrains Mono, monospace">{root}</text>
      <line x1="160" y1="44" x2="160" y2="56" stroke="#3a4154" strokeWidth="2" />
      <line x1={cx(0)} y1="56" x2={cx(n - 1)} y2="56" stroke="#3a4154" strokeWidth="2" />
      {kids.map((k, i) => (
        <g key={i} style={{ opacity: shown(i) ? 1 : 0.14, transition: 'opacity .4s ease-out' }}>
          <line x1={cx(i)} y1="56" x2={cx(i)} y2="72" stroke="#3a4154" strokeWidth="2" />
          <rect x={cx(i) - bw / 2} y="72" width={bw} height="36" rx="8" fill={accent + '22'} stroke={accent} strokeWidth="1.5" />
          <text x={cx(i)} y={k.note ? 89 : 94} textAnchor="middle" fill={accent} fontSize={fs}
                fontWeight="700" fontFamily="JetBrains Mono, monospace">{k.label}</text>
          {k.note && (
            <text x={cx(i)} y="102" textAnchor="middle" fill="#8b91a3" fontSize="8"
                  fontFamily="JetBrains Mono, monospace">{k.note}</text>
          )}
        </g>
      ))}
      {v.caption && (
        <text x="160" y="124" textAnchor="middle" fill="#8b91a3" fontSize="10"
              fontFamily="JetBrains Mono, monospace">{v.caption}</text>
      )}
    </>, v.caption ? 136 : 124);
  }

  if (v.kind === 'flow') {
    const steps = v.steps || [];
    if (steps.length) {
      const n = steps.length;
      const pad = 10, gap = 11, usable = 320 - pad * 2 - gap * (n - 1);
      const w = usable / n;
      const yTop = 26, boxH = 38;
      const longest = Math.max(...steps.map((t) => String(t.label || t).length));
      /* Shrink to fit rather than clip: "Precipitate" must not run past its
         own box, which is how the first caption guard got written too. */
      const fs = longest > 12 ? 7.5 : longest > 9 ? 8.5 : 9.5;
      const cx = (i) => pad + i * (w + gap) + w / 2;
      const h = v.cycle ? 122 : 96;
      return wrap(<>
        {/* Each step arrives in turn. A step that has not arrived yet is dimmed
            rather than absent, so the shape of the whole process is visible
            from the first frame and only the ORDER is what moves. */}
        {steps.map((t, i) => {
          const on = shown(i);
          return (
            <g key={i} style={{ opacity: on ? 1 : 0.22, transition: 'opacity .35s ease-out' }}>
              <rect x={pad + i * (w + gap)} y={yTop} width={w} height={boxH} rx={7}
                    fill={accent + (on ? '1f' : '0d')} stroke={accent} strokeWidth="1.5" />
              <text x={cx(i)} y={yTop + boxH / 2 + 3} textAnchor="middle" fill="#e7e9f0"
                    fontSize={fs} fontWeight="700" fontFamily="JetBrains Mono, monospace">
                {t.label || t}
              </text>
              {i < n - 1 && (
                <line x1={pad + i * (w + gap) + w + 1} y1={yTop + boxH / 2}
                      x2={pad + (i + 1) * (w + gap) - 2} y2={yTop + boxH / 2}
                      stroke="#8b91a3" strokeWidth="2" markerEnd="url(#fa)"
                      style={{ opacity: shown(i + 1) ? 1 : 0.22, transition: 'opacity .35s ease-out' }} />
              )}
            </g>
          );
        })}
        {/* A cycle returns. Drawn under the row so it cannot cross a label. */}
        {v.cycle && (
          <>
            {/* The return closes only once the last step has arrived — that is
                the moment the thing becomes a cycle rather than a chain. */}
            <path d={`M${cx(n - 1)} ${yTop + boxH} V ${yTop + boxH + 20} H ${cx(0)} V ${yTop + boxH + 3}`}
                  fill="none" stroke="#8b91a3" strokeWidth="2" markerEnd="url(#fa)"
                  style={{ opacity: shown(n - 1) ? 1 : 0.15, transition: 'opacity .5s ease-out .15s' }} />
            <text x="160" y={yTop + boxH + 34} textAnchor="middle" fill="#8b91a3"
                  fontSize="9.5" fontFamily="JetBrains Mono, monospace"
                  style={{ opacity: shown(n - 1) ? 1 : 0.15, transition: 'opacity .5s ease-out .15s' }}>
              {v.cycleLabel || 'and round again — nothing is used up'}
            </text>
          </>
        )}
        {v.caption && (
          <text x="160" y={h - 8} textAnchor="middle" fill="#8b91a3" fontSize="10"
                fontFamily="JetBrains Mono, monospace">{v.caption}</text>
        )}
        <defs><marker id="fa" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#8b91a3" /></marker></defs>
      </>, h);
    }
    return wrap(<>
      <ellipse cx="58" cy="38" rx="38" ry="17" fill={accent + '22'} stroke={accent} strokeWidth="1.5" />
      <text x="58" y="42" textAnchor="middle" fill={accent} fontSize="10" fontWeight="700" fontFamily="JetBrains Mono, monospace">START</text>
      <line x1="58" y1="55" x2="58" y2="72" stroke="#8b91a3" strokeWidth="2" markerEnd="url(#fa)" />
      <rect x="20" y="72" width="76" height="30" rx="6" fill="#161a28" stroke={accent} strokeWidth="1.5" />
      <text x="58" y="91" textAnchor="middle" fill="#e7e9f0" fontSize="10" fontFamily="JetBrains Mono, monospace">do a step</text>
      <line x1="96" y1="87" x2="148" y2="87" stroke="#8b91a3" strokeWidth="2" markerEnd="url(#fa)" />
      <polygon points="200,66 242,87 200,108 158,87" fill={accent + '18'} stroke={accent} strokeWidth="1.5" />
      <text x="200" y="90" textAnchor="middle" fill={accent} fontSize="9.5" fontFamily="JetBrains Mono, monospace">done?</text>
      <text x="250" y="90" fill="#3ddc97" fontSize="10" fontFamily="JetBrains Mono, monospace">yes</text>
      <text x="200" y="128" textAnchor="middle" fill="#8b91a3" fontSize="9.5" fontFamily="JetBrains Mono, monospace">no → loop back</text>
      <defs><marker id="fa" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#8b91a3" /></marker></defs>
    </>, 138);
  }
  if (v.kind === 'supplydemand') return wrap(<>
    <line x1="52" y1="120" x2="290" y2="120" stroke="#3a4154" strokeWidth="2" />
    <line x1="60" y1="20" x2="60" y2="130" stroke="#3a4154" strokeWidth="2" />
    <line x1="72" y1="116" x2="268" y2="34" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="72" y1="34" x2="268" y2="116" stroke="#5aa9ff" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="170" cy="75" r="6" fill="#fff" stroke="#0c0e16" strokeWidth="1.5" />
    <text x="240" y="30" fill={accent} fontSize="10" fontFamily="JetBrains Mono, monospace">supply</text>
    <text x="232" y="128" fill="#5aa9ff" fontSize="10" fontFamily="JetBrains Mono, monospace">demand</text>
    <text x="160" y="150" textAnchor="middle" fill="#8b91a3" fontSize="10.5" fontFamily="JetBrains Mono, monospace">they cross at the equilibrium price</text>
  </>, 158);
  /* Plate boundaries. es2 Plate Tectonics used to borrow `strata` — flat
     sedimentary layers captioned "deeper = older (law of superposition)",
     which is a stratigraphy idea from the Fossils lane and has nothing to do
     with plates moving. It rendered, it painted shapes, and it taught the
     wrong subject. Three boundaries, three panels, arrows showing which way
     the plates actually go. */
  if (v.kind === 'plates') {
    /* Geometry pinned to the 320 viewBox: 6 + 3*96 + 2*10 = 314. The first
       version used pad 8 and gap 16, which put the third panel's right plate
       at x=328 and sliced it off the edge. */
    const pw = 96, gap = 10, pad = 6, lw = 42, y = 46, bh = 24;
    const P = [
      { name: 'pull apart', kind: 'out', note: 'new crust' },
      { name: 'push together', kind: 'in', note: 'mountains' },
      { name: 'slide past', kind: 'shear', note: 'quakes' },
    ];
    return wrap(<>
      {P.map((q, i) => {
        const ox = pad + i * (pw + gap);
        const mid = ox + pw / 2;
        /* Apart: a gap with new crust in it. Together and sliding: touching,
           because that is the whole difference between the three. */
        const lx = q.kind === 'out' ? ox : mid - lw;
        const rx = q.kind === 'out' ? ox + pw - lw : mid;
        const lift = q.kind === 'in' ? 5 : 0;
        return (
          <g key={i}>
            <text x={mid} y={30} textAnchor="middle" fill={accent} fontSize="9.5" fontWeight="700"
                  fontFamily="JetBrains Mono, monospace">{q.name}</text>
            {q.kind === 'out' && (
              <rect x={lx + lw} y={y + 5} width={rx - lx - lw} height={bh - 10} fill={accent + '66'} />
            )}
            {/* The plates actually travel. Two blocks sitting still under an
                arrow asks him to imagine the motion; a few centimetres a
                year is exactly the thing that is hard to imagine. */}
            <rect x={lx} y={y - lift} width={lw} height={bh} rx={3} fill="#6b7689" stroke="#0c0e16" strokeWidth="1"
                  style={{ transform: shown(1) ? 'none' : `translate(${q.kind === 'out' ? 7 : q.kind === 'in' ? -9 : 0}px, ${q.kind === 'shear' ? 5 : lift}px)`,
                           transition: 'transform .9s cubic-bezier(.3,.6,.3,1)' }} />
            <rect x={rx} y={y} width={lw} height={bh} rx={3} fill="#8b96a9" stroke="#0c0e16" strokeWidth="1"
                  style={{ transform: shown(1) ? 'none' : `translate(${q.kind === 'out' ? -7 : q.kind === 'in' ? 9 : 0}px, ${q.kind === 'shear' ? -5 : 0}px)`,
                           transition: 'transform .9s cubic-bezier(.3,.6,.3,1)' }} />
            {/* Each arrow sits under its OWN plate, so it cannot wander into
                the neighbouring panel. The first version drew the converging
                left arrow from lx-16, which is outside this panel entirely:
                it appeared at the end of "pull apart" as a second arrowhead. */}
            {(() => {
              const aL = lx + lw / 2, aR = rx + lw / 2, ay = y + bh + 13, r = 9;
              if (q.kind === 'shear') return (
                <>
                  <line x1={aL} y1={ay + 4} x2={aL} y2={ay - 8} stroke={accent} strokeWidth="2" markerEnd="url(#pa)" />
                  <line x1={aR} y1={ay - 8} x2={aR} y2={ay + 4} stroke={accent} strokeWidth="2" markerEnd="url(#pa)" />
                </>
              );
              const outward = q.kind === 'out';
              return (
                <>
                  <line x1={aL + (outward ? r : -r)} y1={ay} x2={aL + (outward ? -r : r)} y2={ay}
                        stroke={accent} strokeWidth="2" markerEnd="url(#pa)" />
                  <line x1={aR + (outward ? -r : r)} y1={ay} x2={aR + (outward ? r : -r)} y2={ay}
                        stroke={accent} strokeWidth="2" markerEnd="url(#pa)" />
                </>
              );
            })()}
            <text x={mid} y={y + bh + 34} textAnchor="middle" fill="#8b91a3" fontSize="9"
                  fontFamily="JetBrains Mono, monospace">{q.note}</text>
          </g>
        );
      })}
      <text x="160" y="128" textAnchor="middle" fill="#8b91a3" fontSize="10"
            fontFamily="JetBrains Mono, monospace">
        {v.caption || 'a few centimetres a year \u2014 for millions of years'}
      </text>
      <defs><marker id="pa" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill={accent} /></marker></defs>
    </>, 138);
  }

  /* Rock layers, named and weighted.
   *
   * This drew four fixed brown bands and read nothing, so it could only ever
   * say "deeper = older". The geologic time scale needs the same shape with
   * real names AND real proportions: the Precambrian is roughly seven eighths
   * of Earth's history, and a table of four equal rows says the opposite of
   * that. `weight` is what makes the picture argue. */
  if (v.kind === 'strata') {
    const bands = v.bands || [
      { color: '#d3ab78' }, { color: '#bf9568' }, { color: '#a37f58' }, { color: '#876a4c' },
    ];
    const named = bands.some((x) => x.name);
    const SHADE = ['#d3ab78', '#bf9568', '#a37f58', '#876a4c', '#6f573e', '#5a4633'];
    const totalW = bands.reduce((n, x) => n + (x.weight || 1), 0);
    const boxH = named ? 158 : 96;
    const h = boxH + (v.caption === null ? 16 : 34);
    /* Every band needs a floor to stay readable, and the remainder is shared
       by weight. Scaling weight alone gave the Cenozoic 1.5 pixels; a flat
       minimum alone threw the proportion away entirely, which is the one
       thing the geologic time scale exists to show. */
    const MIN = 13, avail = boxH - 14;
    const extra = Math.max(0, avail - MIN * bands.length);
    const hOf = (bnd) => (named ? MIN + ((bnd.weight || 1) / totalW) * extra : avail / bands.length);
    let y = 14;
    const x0 = named ? 12 : 40, wid = named ? 176 : 240;
    return wrap(<>
      {bands.map((bnd, i) => {
        const bh = hOf(bnd);
        const top = y; y += bh;
        const dark = i / Math.max(1, bands.length - 1) > 0.55;
        return (
          <g key={i} style={{ opacity: shown(bands.length - 1 - i) ? 1 : 0.12, transition: 'opacity .4s ease-out' }}>
            <rect x={x0} y={top} width={wid} height={bh - 1.5} fill={bnd.color || SHADE[i % SHADE.length]}
                  stroke="#0c0e16" strokeWidth="1" />
            {bnd.name && bh >= 13 && (
              <text x={x0 + 6} y={top + bh / 2 + 3.5} fill={dark ? '#efe6da' : '#241a10'} fontSize={bh < 17 ? 8 : 9.5}
                    fontWeight="700" fontFamily="JetBrains Mono, monospace">{bnd.name}</text>
            )}
            {bnd.note && (
              <text x={x0 + wid + 8} y={top + bh / 2 + 3.5} fill="#8b91a3" fontSize="8.5"
                    fontFamily="JetBrains Mono, monospace">{bnd.note}</text>
            )}
          </g>
        );
      })}
      {!named && <>
        <circle cx="118" cy="106" r="6" fill="#1a1208" stroke="#fff" strokeWidth="1.5" />
        <text x="134" y="110" fill="#d3ab78" fontSize="9.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">older</text>
        <circle cx="210" cy="28" r="5" fill="#1a1208" stroke="#fff" strokeWidth="1.5" />
        <text x="224" y="32" fill="#d3ab78" fontSize="9.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">younger</text>
      </>}
      {v.caption !== null && (
        <text x="160" y={h - 10} textAnchor="middle" fill="#8b91a3" fontSize="10"
              fontFamily="JetBrains Mono, monospace">
          {v.caption || 'deeper = older (law of superposition)'}
        </text>
      )}
    </>, h);
  }

  if (v.kind === 'orbit') return wrap(<>
    <circle cx="160" cy="78" r="22" fill="#f6b73c" opacity=".95" />
    <circle cx="160" cy="78" r="30" fill="#f6b73c" opacity=".15" />
    <ellipse cx="160" cy="78" rx="120" ry="52" fill="none" stroke="#3a4154" strokeWidth="1.5" strokeDasharray="4 5" />
    <g style={{ transformOrigin: '160px 78px', animation: 'orbitSpin 14s linear infinite' }}>
      <g>
        <circle cx="280" cy="78" r="10" fill="#5aa9ff" />
        <circle cx="280" cy="78" r="10" fill="none" stroke="#5aa9ff55" strokeWidth="4" />
      </g>
    </g>
    <text x="160" y="144" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">one lap = one year · one spin = one day</text>
  </>, 152);
  if (v.kind === 'gravity') return wrap(<>
    <circle cx="92" cy="70" r="30" fill={accent} opacity=".9" />
    <circle cx="236" cy="70" r="15" fill="#5aa9ff" />
    <path d="M130 70 H 174" stroke="#8b91a3" strokeWidth="2.5" markerEnd="url(#ar2)" fill="none" />
    <path d="M214 70 H 196" stroke="#8b91a3" strokeWidth="2.5" markerEnd="url(#ar3)" fill="none" />
    <text x="92" y="116" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">more mass = bigger pull</text>
    <text x="236" y="116" textAnchor="middle" fill="#8b91a3" fontSize="11" fontFamily="JetBrains Mono, monospace">pulled too</text>
    <defs>
      <marker id="ar2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#8b91a3" /></marker>
      <marker id="ar3" markerWidth="8" markerHeight="8" refX="2" refY="4" orient="auto-start-reverse"><path d="M8,0 L0,4 L8,8 z" fill="#8b91a3" /></marker>
    </defs>
  </>, 130);

  if (v.kind === 'cell') return wrap(<>
    <ellipse cx="160" cy="78" rx="118" ry="62" fill={accent + '18'} stroke={accent} strokeWidth="2.5" />
    <circle cx="140" cy="72" r="26" fill={accent + '33'} stroke={accent} strokeWidth="1.5" />
    <circle cx="140" cy="72" r="8" fill={accent} opacity="0.5" />
    <text x="140" y="76" textAnchor="middle" fill="#e7e9f0" fontSize="9" fontWeight="700" fontFamily="JetBrains Mono, monospace">DNA</text>
    <ellipse cx="222" cy="60" rx="20" ry="11" fill="#0c0e16" stroke={accent} strokeWidth="1.5" transform="rotate(-18 222 60)" />
    <ellipse cx="96" cy="106" rx="18" ry="10" fill="#0c0e16" stroke={accent} strokeWidth="1.5" transform="rotate(14 96 106)" />
    <text x="140" y="44" textAnchor="middle" fill={accent} fontSize="9.5" fontFamily="JetBrains Mono, monospace">nucleus</text>
    <text x="222" y="40" textAnchor="middle" fill="#8b91a3" fontSize="9" fontFamily="JetBrains Mono, monospace">mitochondria</text>
    <text x="160" y="156" textAnchor="middle" fill="#8b91a3" fontSize="10.5" fontFamily="JetBrains Mono, monospace">the membrane controls what goes in and out</text>
  </>, 166);

  if (v.kind === 'punnett') {
    const cells = [['BB', 1], ['Bb', 1], ['Bb', 1], ['bb', 0]];
    return wrap(<>
      <text x="122" y="26" textAnchor="middle" fill="#8b91a3" fontSize="12" fontFamily="JetBrains Mono, monospace">B</text>
      <text x="196" y="26" textAnchor="middle" fill="#8b91a3" fontSize="12" fontFamily="JetBrains Mono, monospace">b</text>
      <text x="70" y="66" textAnchor="middle" fill="#8b91a3" fontSize="12" fontFamily="JetBrains Mono, monospace">B</text>
      <text x="70" y="122" textAnchor="middle" fill="#8b91a3" fontSize="12" fontFamily="JetBrains Mono, monospace">b</text>
      {cells.map((c, i) => {
        const x = 86 + (i % 2) * 74, y = 36 + Math.floor(i / 2) * 56;
        return (
          <g key={i}>
            <rect x={x} y={y} width="72" height="54" rx="6" fill={c[1] ? accent + '2a' : '#1b2030'} stroke={c[1] ? accent : '#3a4154'} strokeWidth="1.5" />
            <text x={x + 36} y={y + 33} textAnchor="middle" fill={c[1] ? accent : '#8b91a3'} fontSize="16" fontWeight="700" fontFamily="JetBrains Mono, monospace">{c[0]}</text>
          </g>
        );
      })}
      <text x="160" y="166" textAnchor="middle" fill="#8b91a3" fontSize="10.5" fontFamily="JetBrains Mono, monospace">3 dominant to 1 recessive — a 3:1 ratio</text>
    </>, 176);
  }

  if (v.kind === 'pyramid') {
    const rows = [['Top predators', '0.1%', 74], ['Secondary consumers', '1%', 122], ['Primary consumers', '10%', 170], ['Producers (plants)', '100%', 218]];
    return wrap(<>
      {/* Built from the producers upward. Energy moves up the pyramid losing
          ninety per cent at each step, so the order of arrival IS the lesson;
          rows[0] is the top predator, hence the reversed index. */}
      {rows.map((r, i) => {
        const y = 20 + i * 32, w = r[2];
        return (
          <g key={i} style={{ opacity: shown(rows.length - 1 - i) ? 1 : 0.12, transition: 'opacity .4s ease-out' }}>
            <rect x={160 - w / 2} y={y} width={w} height="27" rx="4" fill={accent + (0x18 + i * 0x10).toString(16)} stroke={accent} strokeWidth="1.4" />
            <text x="160" y={y + 18} textAnchor="middle" fill="#e7e9f0" fontSize="9.5" fontFamily="JetBrains Mono, monospace">{r[0]}</text>
            <text x={160 + w / 2 + 8} y={y + 18} fill={accent} fontSize="9.5" fontFamily="JetBrains Mono, monospace">{r[1]}</text>
          </g>
        );
      })}
      <text x="160" y="172" textAnchor="middle" fill="#8b91a3" fontSize="10.5" fontFamily="JetBrains Mono, monospace">only ~10% of energy reaches the next level</text>
    </>, 182);
  }

  /* Stages that narrow. Was a fixed customer funnel; any "many start here,
     fewer reach the end" idea is the same picture — including how a bill
     becomes a law, where most die on the way. */
  if (v.kind === 'funnel') {
    const rows = v.rows || [
      { label: 'AWARE', width: 250 }, { label: 'INTERESTED', width: 190 },
      { label: 'DECIDING', width: 130 }, { label: 'BUYS', width: 70 },
    ];
    const n = rows.length;
    const rowH = n > 5 ? 26 : 34;
    const h = 18 + n * rowH + 28;
    const widthOf = (r, i) => r.width ?? (250 - (i * 180) / Math.max(1, n - 1));
    return wrap(<>
      {rows.map((r, i) => {
        const y = 18 + i * rowH, w = widthOf(r, i);
        return (
          <g key={i} style={{ opacity: shown(i) ? 1 : 0.12, transition: 'opacity .4s ease-out' }}>
            <rect x={160 - w / 2} y={y} width={w} height={rowH - 6} rx={5}
                  fill={accent + '22'} stroke={accent} strokeWidth="1.5" />
            <text x="160" y={y + (rowH - 6) / 2 + 4} textAnchor="middle" fill={accent}
                  fontSize={String(r.label).length > 16 ? 8.5 : 10.5} fontWeight="700"
                  fontFamily="JetBrains Mono, monospace">{r.label}</text>
            {r.note && (
              <text x={160 + w / 2 + 8} y={y + (rowH - 6) / 2 + 4} fill="#8b91a3" fontSize="8.5"
                    fontFamily="JetBrains Mono, monospace">{r.note}</text>
            )}
          </g>
        );
      })}
      <text x="160" y={h - 10} textAnchor="middle" fill="#8b91a3" fontSize="10.5"
            fontFamily="JetBrains Mono, monospace">{v.caption || 'many hear of you · fewer buy'}</text>
    </>, h);
  }

  if (v.kind === 'paragraph') {
    const rows = [['TOPIC SENTENCE', 'states the one idea'], ['EVIDENCE', 'facts, examples, quotes'], ['ANALYSIS', 'why the evidence proves it'], ['CLOSING', 'wraps up or bridges on']];
    return wrap(<>
      {rows.map((r, i) => (
        <g key={i}>
          <rect x="30" y={16 + i * 38} width="260" height="30" rx="7" fill={accent + '1e'} stroke={accent} strokeWidth="1.4" />
          <text x="42" y={35 + i * 38} fill={accent} fontSize="10" fontWeight="700" fontFamily="JetBrains Mono, monospace">{r[0]}</text>
          <text x="278" y={35 + i * 38} textAnchor="end" fill="#8b91a3" fontSize="9" fontFamily="JetBrains Mono, monospace">{r[1]}</text>
        </g>
      ))}
    </>, 172);
  }

  if (v.kind === 'argument') return wrap(<>
    <rect x="96" y="14" width="128" height="34" rx="8" fill={accent + '33'} stroke={accent} strokeWidth="1.6" />
    <text x="160" y="36" textAnchor="middle" fill={accent} fontSize="11" fontWeight="700" fontFamily="JetBrains Mono, monospace">CLAIM</text>
    <line x1="160" y1="48" x2="160" y2="60" stroke="#3a4154" strokeWidth="2" />
    <line x1="72" y1="60" x2="248" y2="60" stroke="#3a4154" strokeWidth="2" />
    <line x1="72" y1="60" x2="72" y2="74" stroke="#3a4154" strokeWidth="2" />
    <line x1="248" y1="60" x2="248" y2="74" stroke="#3a4154" strokeWidth="2" />
    <rect x="20" y="74" width="104" height="32" rx="7" fill="#161a28" stroke={accent} strokeWidth="1.4" />
    <text x="72" y="94" textAnchor="middle" fill="#e7e9f0" fontSize="10" fontFamily="JetBrains Mono, monospace">REASON</text>
    <rect x="196" y="74" width="104" height="32" rx="7" fill="#161a28" stroke={accent} strokeWidth="1.4" />
    <text x="248" y="94" textAnchor="middle" fill="#e7e9f0" fontSize="10" fontFamily="JetBrains Mono, monospace">EVIDENCE</text>
    <rect x="86" y="118" width="148" height="30" rx="7" fill="#1b2030" stroke="#5b6275" strokeWidth="1.4" strokeDasharray="4 3" />
    <text x="160" y="137" textAnchor="middle" fill="#aeb4c4" fontSize="9.5" fontFamily="JetBrains Mono, monospace">COUNTERARGUMENT</text>
    <text x="160" y="166" textAnchor="middle" fill="#8b91a3" fontSize="10" fontFamily="JetBrains Mono, monospace">answer the objection to get stronger</text>
  </>, 176);

  /* ---- primitives added for the days he is actually failing -------------
   *
   * Every diagram below exists because his progress data showed a day scored
   * under 60% whose idea is natively spatial and was being taught as
   * paragraphs. They are built as general shapes rather than one-off pictures
   * so the next lane that needs a number line or a grid does not get another
   * bespoke SVG. */

  /* A number line with a marked point and a shaded direction.
     Inequalities are the textbook case of an idea that is nearly invisible in
     prose and obvious in one picture: the open circle IS the difference
     between < and <=, and no sentence makes that as clear as the hole. */
  if (v.kind === 'numberline') {
    const min = v.min ?? -5, max = v.max ?? 5, at = v.at ?? 0;
    const x0 = 26, x1 = 294, span = max - min;
    const px = (n) => x0 + ((n - min) / span) * (x1 - x0);
    const ticks = [];
    for (let n = min; n <= max; n++) ticks.push(n);
    const op = v.op || 'gt';
    const goesRight = op === 'gt' || op === 'gte';
    const closed = op === 'gte' || op === 'lte';
    const sym = { gt: '>', gte: '≥', lt: '<', lte: '≤' }[op];
    return wrap(<>
      {/* shaded solution region, drawn under the axis so the line stays crisp */}
      <rect x={goesRight ? px(at) : x0} y={46} width={Math.max(0, goesRight ? x1 - px(at) : px(at) - x0)}
            height={18} fill={accent} opacity={.18} />
      <line x1={x0} y1={55} x2={x1} y2={55} stroke="#3a4154" strokeWidth="2" />
      {ticks.map((n) => (
        <g key={n}>
          <line x1={px(n)} y1={49} x2={px(n)} y2={61} stroke="#3a4154" strokeWidth="1.5" />
          <text x={px(n)} y={76} textAnchor="middle" fill="#8b91a3" fontSize="10"
                fontFamily="JetBrains Mono, monospace">{n}</text>
        </g>
      ))}
      {/* the arrow showing the region continues forever that way */}
      <line x1={goesRight ? px(at) : px(at)} y1={55} x2={goesRight ? x1 - 4 : x0 + 4} y2={55}
            stroke={accent} strokeWidth="3" markerEnd="url(#nlArrow)" />
      <circle cx={px(at)} cy={55} r={6.5} fill={closed ? accent : '#10131d'} stroke={accent} strokeWidth="2.5" />
      <text x="160" y="24" textAnchor="middle" fill="#e7e9f0" fontSize="13" fontWeight="700"
            fontFamily="JetBrains Mono, monospace">{v.label || `x ${sym} ${at}`}</text>
      <text x="160" y="100" textAnchor="middle" fill="#8b91a3" fontSize="10"
            fontFamily="JetBrains Mono, monospace">
        {closed ? 'filled circle: ' + at + ' is included' : 'open circle: ' + at + ' is NOT included'}
      </text>
      <defs><marker id="nlArrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
        <path d="M0,0 L9,4.5 L0,9 z" fill={accent} /></marker></defs>
    </>, 112);
  }

  /* A labelled grid. Serves truth tables and any "who does what to whom"
     matrix — the same shape answers both, so logic and civics share one
     renderer instead of two bespoke ones. Cells reading T or F get coloured;
     everything else renders as plain text. */
  if (v.kind === 'grid') {
    const cols = v.cols || [], rows = v.rows || [];
    const x0 = 12, wTotal = 296;
    const cw = wTotal / cols.length;
    const headH = 24, rowH = v.rowH || 24;
    const h = headH + rows.length * rowH + (v.caption ? 30 : 12);
    const cell = (t, cx, cy, isHead) => {
      const str = String(t);
      const tf = str === 'T' || str === 'F';
      return (
        <text x={cx} y={cy} textAnchor="middle"
              fill={isHead ? accent : tf ? (str === 'T' ? '#3ddc97' : '#ff6b6b') : '#e7e9f0'}
              fontSize={isHead ? 10 : str.length > 9 ? 8 : 11}
              fontWeight={isHead || tf ? 700 : 400}
              fontFamily="JetBrains Mono, monospace">{str}</text>
      );
    };
    return wrap(<>
      <rect x={x0} y={8} width={wTotal} height={headH} fill={accent + '1a'} rx={5} />
      {cols.map((c, i) => cell(c, x0 + cw * (i + .5), 24, true))}
      {rows.map((r, ri) => (
        <g key={ri}>
          {ri % 2 === 1 && <rect x={x0} y={8 + headH + ri * rowH} width={wTotal} height={rowH} fill="#ffffff06" />}
          {r.map((t, ci) => cell(t, x0 + cw * (ci + .5), 8 + headH + ri * rowH + rowH / 2 + 4, false))}
        </g>
      ))}
      {cols.map((_, i) => i > 0 && (
        <line key={'v' + i} x1={x0 + cw * i} y1={8} x2={x0 + cw * i} y2={8 + headH + rows.length * rowH}
              stroke="#1f2433" strokeWidth="1" />
      ))}
      <line x1={x0} y1={8 + headH} x2={x0 + wTotal} y2={8 + headH} stroke="#3a4154" strokeWidth="1.5" />
      {v.caption && (
        <text x="160" y={h - 10} textAnchor="middle" fill="#8b91a3" fontSize="10"
              fontFamily="JetBrains Mono, monospace">{v.caption}</text>
      )}
    </>, h);
  }

  /* Inputs on the left, outputs on the right, arrows between. The whole
     definition of a function is a rule about these arrows — one out of each
     input, never two — and that is a picture, not a sentence. `bad` draws the
     case that breaks the rule so the two can be compared directly. */
  if (v.kind === 'mapping') {
    const ins = v.inputs || [], outs = v.outputs || [], links = v.links || [];
    const top = 34, gap = v.gap || 26;
    const iy = (i) => top + i * gap, oy = (i) => top + i * gap;
    const h = top + Math.max(ins.length, outs.length) * gap + 34;
    const bad = !!v.bad;
    return wrap(<>
      <text x="70" y="20" textAnchor="middle" fill="#8b91a3" fontSize="10" fontFamily="JetBrains Mono, monospace">{v.inLabel || 'input'}</text>
      <text x="250" y="20" textAnchor="middle" fill="#8b91a3" fontSize="10" fontFamily="JetBrains Mono, monospace">{v.outLabel || 'output'}</text>
      <ellipse cx="70" cy={top + (ins.length - 1) * gap / 2} rx="46" ry={ins.length * gap / 2 + 10}
               fill="none" stroke="#2a2f3d" strokeWidth="1.3" />
      <ellipse cx="250" cy={top + (outs.length - 1) * gap / 2} rx="46" ry={outs.length * gap / 2 + 10}
               fill="none" stroke="#2a2f3d" strokeWidth="1.3" />
      {/* Arrows arrive one at a time. The definition of a function is a rule
          about ARROWS — exactly one leaving each input — and on the `bad`
          example the second arrow leaving the same input is the whole point.
          Watching it appear is stronger than finding it in a finished
          tangle. */}
      {links.map(([a, b], i) => {
        const dup = links.filter((l) => l[0] === a).length > 1;
        const col = bad && dup ? '#ff6b6b' : accent;
        return <line key={i} x1={96} y1={iy(a)} x2={224} y2={oy(b)} stroke={col} strokeWidth="1.8"
                     markerEnd={bad && dup ? 'url(#mapBad)' : 'url(#mapOk)'}
                     opacity={shown(i) ? .95 : 0.08}
                     style={{ transition: 'opacity .4s ease-out' }} />;
      })}
      {ins.map((t, i) => (
        <g key={'i' + i}>
          <circle cx="70" cy={iy(i)} r="4" fill={accent} />
          <text x="58" y={iy(i) + 4} textAnchor="end" fill="#e7e9f0" fontSize="11" fontFamily="JetBrains Mono, monospace">{t}</text>
        </g>
      ))}
      {outs.map((t, i) => (
        <g key={'o' + i}>
          <circle cx="250" cy={oy(i)} r="4" fill="#5aa9ff" />
          <text x="262" y={oy(i) + 4} fill="#e7e9f0" fontSize="11" fontFamily="JetBrains Mono, monospace">{t}</text>
        </g>
      ))}
      <text x="160" y={h - 12} textAnchor="middle" fill={bad ? '#ff6b6b' : '#8b91a3'} fontSize="10"
            fontFamily="JetBrains Mono, monospace">{v.caption || (bad ? 'two arrows from one input — NOT a function' : 'exactly one arrow out of each input')}</text>
      <defs>
        <marker id="mapOk" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill={accent} /></marker>
        <marker id="mapBad" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#ff6b6b" /></marker>
      </defs>
    </>, h);
  }

  /* A quantity, then the same quantity after one or more percentage moves,
     drawn to scale. The trap in percent change is that the SECOND percentage
     is taken from a different number than the first, which is invisible in
     symbols and unmissable when the bars are different lengths. */
  if (v.kind === 'percentbar') {
    const steps = v.steps || [];
    let val = v.base ?? 100;
    const seq = [{ val, note: v.baseLabel || 'start' }];
    for (const st of steps) { val = val * (1 + st.pct / 100); seq.push({ val, note: st.label || `${st.pct > 0 ? '+' : ''}${st.pct}%`, from: seq[seq.length - 1].val, pct: st.pct }); }
    const maxV = Math.max(...seq.map((x) => x.val));
    const x0 = 14, wMax = 214, rowH = 34;
    const h = 16 + seq.length * rowH + 26;
    const money = (n) => (v.prefix || '$') + (Math.round(n * 100) / 100).toLocaleString();
    return wrap(<>
      {seq.map((st, i) => (
        /* Each row arrives after the one it is measured against. m15 is his
           worst-scoring day in the app and the trap is that the second
           percentage is taken from a SHORTER bar; seeing the bars appear in
           order puts the two lengths next to each other in time as well as
           in space. */
        <g key={i} style={{ opacity: shown(i) ? 1 : 0.1, transition: 'opacity .4s ease-out' }}>
          <rect x={x0} y={16 + i * rowH} width={Math.max(3, (st.val / maxV) * wMax)} height={20} rx={4}
                fill={i === 0 ? accent : accent} opacity={i === 0 ? .95 : .55 + .15 * i} />
          <text x={x0 + 6} y={16 + i * rowH + 14} fill="#0c0e16" fontSize="10" fontWeight="700"
                fontFamily="JetBrains Mono, monospace">{money(st.val)}</text>
          <text x={x0 + wMax + 12} y={16 + i * rowH + 14} fill="#8b91a3" fontSize="9.5"
                fontFamily="JetBrains Mono, monospace">{st.note}</text>
          {st.from !== undefined && (
            <text x={x0 + wMax + 12} y={16 + i * rowH + 25} fill="#5b6275" fontSize="8"
                  fontFamily="JetBrains Mono, monospace">of {money(st.from)}</text>
          )}
        </g>
      ))}
      <text x="160" y={h - 8} textAnchor="middle" fill="#8b91a3" fontSize="10"
            fontFamily="JetBrains Mono, monospace">{v.caption || 'each % is taken from the bar above it'}</text>
    </>, h);
  }

  /* Atoms before and after. A physical change moves the same groupings
     around; a chemical change breaks them and builds different ones. Said in
     words those two sentences sound almost identical, which is exactly why
     the day scored badly. Drawn, they are obviously different pictures. */
  if (v.kind === 'rearrange') {
    const COL = { A: accent, B: '#5aa9ff', C: '#f6b73c' };
    /* A group is either a plain list of atoms or {a, dx, dy} so the physical
       case can actually MOVE things. Drawing before and after identically
       under the caption "same groupings, just moved" teaches the opposite of
       the intended lesson — the picture has to show the motion the words
       claim. */
    const norm = (g) => (Array.isArray(g) ? { a: g, dx: 0, dy: 0 } : { dx: 0, dy: 0, ...g });
    const mol = (g, cx, cy, k) => {
      const { a, dx, dy } = norm(g);
      return (
        <g key={k}>
          {a.map((at, i) => (
            <circle key={i} cx={cx + dx + (i - (a.length - 1) / 2) * 13} cy={cy + dy} r="6.5"
                    fill={COL[at] || accent} opacity={.92} stroke="#0c0e16" strokeWidth="1" />
          ))}
        </g>
      );
    };
    const before = v.before || [], after = v.after || [];
    const lay = (groups, y) => groups.map((g, i) => mol(g, 52 + i * 62, y, y + '-' + i));
    return wrap(<>
      <text x="16" y="22" fill="#8b91a3" fontSize="10" fontFamily="JetBrains Mono, monospace">BEFORE</text>
      {lay(before, 46)}
      {/* The whole day is one comparison, so the second half arrives second.
          Showing BEFORE alone for a beat is what makes AFTER read as a
          CHANGE rather than as a second unrelated picture. */}
      <g style={{ opacity: shown(1) ? 1 : 0.12, transition: 'opacity .45s ease-out' }}>
        <line x1="150" y1="70" x2="170" y2="70" stroke="#5b6275" strokeWidth="2" markerEnd="url(#reArrow)" />
        <text x="16" y="100" fill="#8b91a3" fontSize="10" fontFamily="JetBrains Mono, monospace">AFTER</text>
        {lay(after, 122)}
      </g>
      <text x="160" y={152} textAnchor="middle" fill={v.chemical ? '#f6b73c' : '#3ddc97'} fontSize="10"
            fontWeight="700" fontFamily="JetBrains Mono, monospace"
            style={{ opacity: shown(1) ? 1 : 0.12, transition: 'opacity .45s ease-out .1s' }}>
        {v.caption || (v.chemical ? 'CHEMICAL — atoms regrouped' : 'PHYSICAL — same groups, moved')}
      </text>
      <text x="160" y={168} textAnchor="middle" fill="#8b91a3" fontSize="9.5"
            fontFamily="JetBrains Mono, monospace">{v.note || 'same atoms either way — count them'}</text>
      <defs><marker id="reArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#5b6275" /></marker></defs>
    </>, 180);
  }

  /* Two curves on one pair of axes, plotted from real functions rather than
     drawn by hand. Built because the advanced maths days needed to SHOW an
     exponential overtaking a line, and the existing `graph` kind is a
     hardcoded straight line for day 6 — using it here would have drawn a
     straight line and labelled it exponential. */
  if (v.kind === 'curves') {
    const x0 = 44, x1 = 300, yBase = 128, yTop = 22;
    const xs = Array.from({ length: 60 }, (_, i) => (i / 59) * (v.xMax || 6));
    const fns = {
      linear: (x) => (v.m || 2) * x + (v.b || 1),
      exponential: (x) => (v.a || 1) * Math.pow(v.base || 2, x),
      decay: (x) => (v.a || 16) * Math.pow(0.5, x),
    };
    const series = (v.series || ['linear', 'exponential']).map((k) => ({ k, ys: xs.map(fns[k]) }));
    const yMax = v.yMax || Math.max(...series.flatMap((s) => s.ys).filter((y) => Number.isFinite(y)));
    const px = (x) => x0 + (x / (v.xMax || 6)) * (x1 - x0);
    const py = (y) => yBase - Math.min(1, y / yMax) * (yBase - yTop);
    const COL = { linear: '#5aa9ff', exponential: accent, decay: accent };
    const path = (ys) => ys.map((y, i) => `${i ? 'L' : 'M'}${px(xs[i]).toFixed(1)},${py(y).toFixed(1)}`).join(' ');
    return wrap(<>
      <line x1={x0} y1={yBase} x2={x1} y2={yBase} stroke="#3a4154" strokeWidth="2" />
      <line x1={x0} y1={yTop - 4} x2={x0} y2={yBase} stroke="#3a4154" strokeWidth="2" />
      {/* Drawn left to right rather than simply appearing. On m23 the claim is
          that the line LEADS at first and then loses forever, which is an
          event in time; watching the two race across the axis is the lesson,
          and a finished pair of curves only shows the aftermath.
          pathLength normalises every curve to 1 so one dashoffset works for
          all of them regardless of their real length. */}
      {series.map((s, i) => (
        <path key={i} d={path(s.ys)} fill="none" stroke={COL[s.k]} strokeWidth="2.5" strokeLinecap="round"
              pathLength={1} strokeDasharray={1} strokeDashoffset={shown(1) ? 0 : 1}
              style={{ transition: 'stroke-dashoffset .85s cubic-bezier(.25,.6,.3,1)' }} />
      ))}
      {/* Labels sit left: a growth curve leaves the upper left empty, and
          right-anchored labels clipped the viewBox edge. */}
      {series.map((s, i) => (
        <text key={'l' + i} x={x0 + 10} y={yTop + 2 + i * 14} textAnchor="start" fill={COL[s.k]}
              fontSize="10" fontWeight="700" fontFamily="JetBrains Mono, monospace">
          {s.k === 'linear' ? (v.linearLabel || 'y = 2x + 1') : s.k === 'decay' ? (v.decayLabel || 'halving') : (v.expLabel || 'y = 2ˣ')}
        </text>
      ))}
      <text x="172" y={yBase + 22} textAnchor="middle" fill="#8b91a3" fontSize="10"
            fontFamily="JetBrains Mono, monospace">{v.caption || 'the curve starts lower and never gives the lead back'}</text>
    </>, 158);
  }

  /* ---- data on a line --------------------------------------------------
   *
   * `numberline` means "an inequality", and three statistics days needed the
   * other thing a line is for: where the values actually SIT. Mean against
   * median, two classes with the same average and different spread, a poll
   * with a margin of error. All three had a table of numbers, which is the
   * one format that cannot show spread at all.
   */
  if (v.kind === 'dots') {
    const sets = v.sets || [];
    const markers = v.markers || [];
    const all = sets.flatMap((st) => st.values || []);
    const lo = v.min ?? Math.min(...all, ...(v.band ? [v.band.from] : []));
    const hi = v.max ?? Math.max(...all, ...(v.band ? [v.band.to] : []));
    const x0 = 24, x1 = 296, span = (hi - lo) || 1;
    const px = (n) => x0 + ((n - lo) / span) * (x1 - x0);
    const rowH = 46;
    const top = 30;
    const h = top + sets.length * rowH + (markers.length ? 22 : 6) + 26;
    const COL = ['#5aa9ff', '#f6b73c'];
    return wrap(<>
      {/* An interval, where the claim is a RANGE rather than a point. */}
      {v.band && (
        <g style={{ opacity: shown(sets.length) ? 1 : 0.1, transition: 'opacity .45s ease-out' }}>
          <rect x={px(v.band.from)} y={top - 12} width={Math.max(2, px(v.band.to) - px(v.band.from))}
                height={sets.length * rowH + 6} rx={5} fill={accent} opacity={.16} />
          <text x={(px(v.band.from) + px(v.band.to)) / 2} y={top - 17} textAnchor="middle" fill={accent}
                fontSize="9.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">{v.band.label}</text>
        </g>
      )}
      {sets.map((st, si) => {
        const y = top + si * rowH + 14;
        /* Stack repeats upward so a cluster reads as a cluster. */
        const seen = {};
        return (
          <g key={si} style={{ opacity: shown(si) ? 1 : 0.1, transition: 'opacity .45s ease-out' }}>
            <line x1={x0} y1={y} x2={x1} y2={y} stroke="#3a4154" strokeWidth="1.5" />
            {st.label && (
              <text x={x0} y={y - 20} fill="#8b91a3" fontSize="9.5"
                    fontFamily="JetBrains Mono, monospace">{st.label}</text>
            )}
            {(st.values || []).map((n, i) => {
              const k = String(n);
              seen[k] = (seen[k] || 0) + 1;
              return <circle key={i} cx={px(n)} cy={y - 5 - (seen[k] - 1) * 9} r="4.2"
                             fill={st.color || COL[si % COL.length]} stroke="#0c0e16" strokeWidth="1" />;
            })}
            {st.note && (
              <text x={x1} y={y - 20} textAnchor="end" fill="#6e7688" fontSize="8.5"
                    fontFamily="JetBrains Mono, monospace">{st.note}</text>
            )}
          </g>
        );
      })}
      {markers.map((m, i) => (
        <g key={'m' + i} style={{ opacity: shown(sets.length) ? 1 : 0.1, transition: 'opacity .5s ease-out .1s' }}>
          <line x1={px(m.at)} y1={top - 2} x2={px(m.at)} y2={top + sets.length * rowH + 2}
                stroke={m.color || '#3ddc97'} strokeWidth="2" strokeDasharray="3 3" />
          <text x={px(m.at)} y={top + sets.length * rowH + 16} textAnchor="middle" fill={m.color || '#3ddc97'}
                fontSize="9.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">{m.label}</text>
        </g>
      ))}
      {v.caption && (
        <text x="160" y={h - 8} textAnchor="middle" fill="#8b91a3" fontSize="10"
              fontFamily="JetBrains Mono, monospace">{v.caption}</text>
      )}
    </>, h);
  }

  /* ---- the square-cube law ---------------------------------------------
   *
   * Double the side and the area goes up four times while the volume goes up
   * eight. m19 said that in a table of numbers — 1/1/1, 2/4/8 — which is the
   * arithmetic without the reason. Drawn, the reason is that you are adding a
   * dimension each time.
   */
  if (v.kind === 'cubes') {
    const steps = v.steps || [1, 2, 3];
    const unit = 15, baseY = 104;
    const pad = 10, slot = (320 - pad * 2) / steps.length;
    return wrap(<>
      {steps.map((k, i) => {
        const size = k * unit, d = size * 0.4;
        const ox = pad + i * slot + slot / 2 - (size + d) / 2;
        const oy = baseY - size;
        return (
          <g key={i} style={{ opacity: shown(i) ? 1 : 0.12, transition: 'opacity .45s ease-out' }}>
            {/* top and side faces, so it reads as a solid rather than a square */}
            <polygon points={`${ox},${oy} ${ox + d},${oy - d} ${ox + size + d},${oy - d} ${ox + size},${oy}`}
                     fill={accent} opacity=".85" stroke="#0c0e16" strokeWidth="1" />
            <polygon points={`${ox + size},${oy} ${ox + size + d},${oy - d} ${ox + size + d},${oy + size - d} ${ox + size},${oy + size}`}
                     fill={accent} opacity=".55" stroke="#0c0e16" strokeWidth="1" />
            <rect x={ox} y={oy} width={size} height={size} fill={accent} opacity=".7" stroke="#0c0e16" strokeWidth="1" />
            <text x={pad + i * slot + slot / 2} y={124} textAnchor="middle" fill="#e7e9f0" fontSize="10"
                  fontWeight="700" fontFamily="JetBrains Mono, monospace">side {k}</text>
            <text x={pad + i * slot + slot / 2} y={137} textAnchor="middle" fill="#8b91a3" fontSize="9"
                  fontFamily="JetBrains Mono, monospace">area {k * k} \u00b7 vol {k * k * k}</text>
          </g>
        );
      })}
      <text x="160" y={156} textAnchor="middle" fill="#8b91a3" fontSize="10"
            fontFamily="JetBrains Mono, monospace">
        {v.caption || 'double the side: area \u00d74, volume \u00d78'}
      </text>
    </>, 164);
  }

  /* ---- two straight lines ----------------------------------------------
   *
   * Two lines cross once, never, or everywhere, and that is the entire
   * meaning of one solution, none, or infinitely many. m11 carried this as a
   * three-row TABLE reading "cross once | one point | one solution" — the
   * most spatial idea in the lane, written out in words.
   */
  if (v.kind === 'lines') {
    const panels = v.panels || [];
    const n = panels.length || 1;
    const pad = 8, gap = 10;
    const pw = (320 - pad * 2 - gap * (n - 1)) / n;
    const top = 18, bot = 104;
    return wrap(<>
      {panels.map((q, i) => {
        const ox = pad + i * (pw + gap);
        const seg = (m, b) => {
          /* Clip to the panel box rather than trusting the slope. */
          const pts = [];
          for (const x of [-3, 3]) pts.push([x, m * x + b]);
          const sx = (x) => ox + ((x + 3) / 6) * pw;
          const sy = (y) => (bot + top) / 2 - (y / 7) * ((bot - top) / 2);
          return `M${sx(pts[0][0])},${sy(pts[0][1])} L${sx(pts[1][0])},${sy(pts[1][1])}`;
        };
        return (
          <g key={i} style={{ opacity: shown(i) ? 1 : 0.1, transition: 'opacity .45s ease-out' }}>
            <rect x={ox} y={top} width={pw} height={bot - top} rx={6} fill="#141824" stroke="#222736" />
            <path d={seg(q.m1, q.b1)} stroke="#5aa9ff" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <path d={seg(q.m2, q.b2)} stroke={accent} strokeWidth="2.2" fill="none" strokeLinecap="round"
                  strokeDasharray={q.same ? '5 4' : undefined} />
            {q.meet && (
              <circle cx={ox + ((q.meet + 3) / 6) * pw}
                      cy={(bot + top) / 2 - ((q.m1 * q.meet + q.b1) / 7) * ((bot - top) / 2)}
                      r="4.5" fill="#3ddc97" stroke="#0c0e16" strokeWidth="1.5" />
            )}
            <text x={ox + pw / 2} y={bot + 16} textAnchor="middle" fill="#e7e9f0" fontSize="9"
                  fontWeight="700" fontFamily="JetBrains Mono, monospace">{q.label}</text>
            <text x={ox + pw / 2} y={bot + 28} textAnchor="middle" fill="#8b91a3" fontSize="8.5"
                  fontFamily="JetBrains Mono, monospace">{q.note}</text>
          </g>
        );
      })}
      <text x="160" y={152} textAnchor="middle" fill="#8b91a3" fontSize="10"
            fontFamily="JetBrains Mono, monospace">
        {v.caption || 'where they meet IS the solution'}
      </text>
    </>, 162);
  }

  /* ---- primitives added to close the prose-only gap ---------------------
     73 days still had no picture. These three unlock the clusters the
     existing set could not reach: layered objects, code, and spectrums. */

  /* A layered object, either stacked or concentric. Earth's interior, a
     pencil, a battery, a touchscreen — all of them are "what is inside what",
     which is a cross-section and not a sentence. */
  if (v.kind === 'layers') {
    const items = v.items || [];
    const concentric = v.shape === 'concentric';
    const h = concentric ? 190 : 34 + items.length * 30 + (v.caption ? 24 : 8);
    if (concentric) {
      const cx = 84, cy = 92, rMax = 66;
      return wrap(<>
        {/* Outside in. A cross-section is a claim about what contains what,
            and watching the rings land in order is that claim. */}
        {items.map((it, i) => {
          const r = rMax * (1 - i / items.length);
          return <circle key={i} cx={cx} cy={cy} r={r} fill={it.color || '#2a2f3d'}
                         stroke="#0c0e16" strokeWidth="1.5"
                         style={{ opacity: shown(i) ? 1 : 0, transition: 'opacity .4s ease-out' }} />;
        })}
        {items.map((it, i) => {
          const y = 34 + i * 26;
          return (
            <g key={'l' + i} style={{ opacity: shown(i) ? 1 : 0.12, transition: 'opacity .4s ease-out' }}>
              <rect x={168} y={y - 9} width={11} height={11} rx={2} fill={it.color || '#2a2f3d'} />
              <text x={185} y={y} fill="#e7e9f0" fontSize="11" fontFamily="JetBrains Mono, monospace">{it.name}</text>
              {it.note && <text x={185} y={y + 11} fill="#8b91a3" fontSize="9" fontFamily="JetBrains Mono, monospace">{it.note}</text>}
            </g>
          );
        })}
        {v.caption && <text x="160" y={178} textAnchor="middle" fill="#8b91a3" fontSize="10"
              fontFamily="JetBrains Mono, monospace">{v.caption}</text>}
      </>, h);
    }
    return wrap(<>
      {items.map((it, i) => {
        const y = 14 + i * 30;
        return (
          <g key={i} style={{ opacity: shown(i) ? 1 : 0.12, transition: 'opacity .4s ease-out' }}>
            <rect x={14} y={y} width={92} height={24} rx={5} fill={it.color || '#2a2f3d'} stroke="#0c0e16" strokeWidth="1.5" />
            <text x={116} y={y + 12} fill="#e7e9f0" fontSize="11.5" fontFamily="JetBrains Mono, monospace">{it.name}</text>
            {it.note && <text x={116} y={y + 23} fill="#8b91a3" fontSize="9.5" fontFamily="JetBrains Mono, monospace">{it.note}</text>}
          </g>
        );
      })}
      {v.caption && <text x="160" y={h - 8} textAnchor="middle" fill="#8b91a3" fontSize="10"
            fontFamily="JetBrains Mono, monospace">{v.caption}</text>}
    </>, h);
  }

  /* Code with its parts named. A for loop has three jobs packed into one
     line, and pointing at them is worth more than describing them. */
  if (v.kind === 'codeshape') {
    const lines = v.lines || [];
    /* Tags sit on their own row UNDER the line they annotate. The first
       version right-anchored them on the same row, where a normal-length
       line of code ran straight into them — caught by looking at it, not by
       any assertion. */
    const rows = [];
    for (const l of lines) {
      const text = typeof l === 'string' ? l : l.t;
      const tag = typeof l === 'string' ? null : l.tag;
      rows.push({ text, tag: null });
      if (tag) rows.push({ text: null, tag });
    }
    const rowH = 19;
    const boxH = rows.length * rowH + 12;
    const h = 16 + boxH + (v.caption ? 22 : 6);
    return wrap(<>
      <rect x={10} y={8} width={300} height={boxH} rx={8} fill="#0c0e16" stroke="#1f2433" />
      {rows.map((r, i) => {
        const y = 26 + i * rowH;
        if (r.tag) {
          return (
            <text key={i} x={30} y={y} fill="#8b91a3" fontSize="9.5"
                  fontFamily="JetBrains Mono, monospace">{'↳ ' + r.tag}</text>
          );
        }
        return (
          <text key={i} x={20} y={y} fill="#c9cee0" fontSize="11.5"
                fontFamily="JetBrains Mono, monospace" xmlSpace="preserve">{r.text}</text>
        );
      })}
      {v.caption && <text x="160" y={h - 7} textAnchor="middle" fill="#8b91a3" fontSize="10"
            fontFamily="JetBrains Mono, monospace">{v.caption}</text>}
    </>, h);
  }

  /* A line with named zones. Tone, formality, confidence — things that are
     not true or false but somewhere along a range. */
  if (v.kind === 'spectrum') {
    const zones = v.zones || [];
    const x0 = 20, x1 = 300, w = x1 - x0;
    const seg = w / Math.max(1, zones.length);
    return wrap(<>
      {/* Left to right, because a spectrum is an ORDER: pH 4 to pH 9, radio
          to visible, casual to formal. Filling across says that; five bands
          appearing at once says "five categories". */}
      {zones.map((z, i) => (
        <rect key={i} x={x0 + i * seg} y={40} width={seg - 2} height={22} rx={4}
              fill={accent} opacity={shown(i) ? 0.5 + (i / Math.max(1, zones.length - 1)) * 0.5 : 0.08}
              style={{ transition: 'opacity .35s ease-out' }} />
      ))}
      {zones.map((z, i) => (
        <text key={'t' + i} x={x0 + i * seg + seg / 2} y={55} textAnchor="middle" fill="#0c0e16"
              fontSize="9.5" fontWeight="700" fontFamily="JetBrains Mono, monospace"
              style={{ opacity: shown(i) ? 1 : 0, transition: 'opacity .35s ease-out' }}>{z.label}</text>
      ))}
      {zones.map((z, i) => z.note ? (
        <text key={'n' + i} x={x0 + i * seg + seg / 2} y={78} textAnchor="middle" fill="#8b91a3"
              fontSize="9" fontFamily="JetBrains Mono, monospace">{z.note}</text>
      ) : null)}
      <text x={x0} y={30} fill="#8b91a3" fontSize="10" fontFamily="JetBrains Mono, monospace">{v.left || ''}</text>
      <text x={x1} y={30} textAnchor="end" fill="#8b91a3" fontSize="10" fontFamily="JetBrains Mono, monospace">{v.right || ''}</text>
      {v.caption && <text x="160" y={100} textAnchor="middle" fill="#8b91a3" fontSize="10"
            fontFamily="JetBrains Mono, monospace">{v.caption}</text>}
    </>, 112);
  }

  /* The same numbers drawn twice, on two different vertical axes. Day 29's
     entire claim is that a truncated axis changes the impression while the
     data stays identical, and that is not a claim prose can land — you have
     to see the two pictures side by side and check they are the same. */
  if (v.kind === 'twobars') {
    const vals = v.values || [48, 52];
    const labels = v.labels || vals.map((n) => n + '%');
    /* The honest axis first, then the truncated one. m29's claim is that the
       second picture is the SAME data, and that only lands if you saw the
       first one first. */
    const panel = (x0, lo, hi, title) => {
      const w = 128, base = 118, top = 34, bw = 34, gap = 22;
      const py = (n) => base - ((n - lo) / (hi - lo)) * (base - top);
      return (
        <g>
          <text x={x0 + w / 2} y={24} textAnchor="middle" fill="#8b91a3" fontSize="9.5"
                fontFamily="JetBrains Mono, monospace">{title}</text>
          <line x1={x0 + 14} y1={base} x2={x0 + w - 6} y2={base} stroke="#3a4154" strokeWidth="1.5" />
          <line x1={x0 + 14} y1={top - 4} x2={x0 + 14} y2={base} stroke="#3a4154" strokeWidth="1.5" />
          {vals.map((n, i) => (
            <g key={i}>
              <rect x={x0 + 26 + i * (bw + gap)} y={py(n)} width={bw} height={Math.max(2, base - py(n))}
                    rx={3} fill={i === 0 ? '#5aa9ff' : accent} />
              <text x={x0 + 26 + i * (bw + gap) + bw / 2} y={base + 12} textAnchor="middle"
                    fill="#8b91a3" fontSize="9" fontFamily="JetBrains Mono, monospace">{labels[i]}</text>
            </g>
          ))}
          <text x={x0 + 10} y={base + 2} textAnchor="end" fill="#5b6275" fontSize="8"
                fontFamily="JetBrains Mono, monospace">{lo}</text>
          <text x={x0 + 10} y={top + 4} textAnchor="end" fill="#5b6275" fontSize="8"
                fontFamily="JetBrains Mono, monospace">{hi}</text>
        </g>
      );
    };
    const lo2 = v.truncatedFrom ?? Math.min(...vals) - 1;
    const hi2 = v.truncatedTo ?? Math.max(...vals) + 1;
    return wrap(<>
      <g style={{ opacity: shown(0) ? 1 : 0.12, transition: 'opacity .4s ease-out' }}>
        {panel(6, 0, Math.max(...vals) + 10, 'axis from 0')}
      </g>
      <g style={{ opacity: shown(1) ? 1 : 0.12, transition: 'opacity .45s ease-out' }}>
        {panel(172, lo2, hi2, `axis from ${lo2}`)}
      </g>
      <text x="160" y={142} textAnchor="middle" fill="#8b91a3" fontSize="10"
            fontFamily="JetBrains Mono, monospace">{v.caption || 'identical numbers, both times'}</text>
    </>, 152);
  }

  return null;
}