/* A very small arithmetic evaluator, so content can carry a formula as data.
 *
 * The `slider` block needs to compute an output from the value the child is
 * dragging, and that formula belongs in the content file next to the lesson
 * it explains — not hardcoded in the renderer as one bespoke case per topic.
 *
 * This is a recursive-descent parser over a deliberately tiny grammar:
 * numbers, the variable x, + - * / ^, and parentheses. NO eval, no Function
 * constructor, no identifiers other than x. Content in this app is authored
 * here rather than fetched, so this is not a security boundary — it is a
 * correctness one. An expression that cannot be parsed returns NaN and the
 * block renders a dash rather than crashing the page.
 */

export function evalExpr(src, x) {
  let i = 0;
  const s = String(src);
  const ws = () => { while (i < s.length && s[i] === ' ') i++; };
  const peek = () => { ws(); return s[i]; };
  const eat = (ch) => { ws(); if (s[i] === ch) { i++; return true; } return false; };

  /* number | x | ( expr ) | -primary */
  function primary() {
    ws();
    if (eat('-')) return -primary();
    if (eat('(')) { const v = expr(); eat(')'); return v; }
    if (s[i] === 'x') { i++; return x; }
    const start = i;
    while (i < s.length && /[0-9.]/.test(s[i])) i++;
    if (i === start) { i = s.length; return NaN; }
    return parseFloat(s.slice(start, i));
  }
  /* right-associative, so 2^3^2 is 2^(3^2) as in mathematics */
  function power() {
    const base = primary();
    if (peek() === '^') { i++; return Math.pow(base, power()); }
    return base;
  }
  function term() {
    let v = power();
    for (;;) {
      const c = peek();
      if (c === '*') { i++; v *= power(); }
      else if (c === '/') { i++; v /= power(); }
      else return v;
    }
  }
  function expr() {
    let v = term();
    for (;;) {
      const c = peek();
      if (c === '+') { i++; v += term(); }
      else if (c === '-') { i++; v -= term(); }
      else return v;
    }
  }
  const out = expr();
  return Number.isFinite(out) ? out : NaN;
}

/* Rounded for display. Integers stay bare; everything else keeps at most two
   decimals, because "12.000000000000002" teaches nothing about anything. */
export function showNum(n) {
  if (!Number.isFinite(n)) return '—';
  const r = Math.round(n * 100) / 100;
  return Number.isInteger(r) ? String(r) : r.toFixed(2).replace(/\.?0+$/, '');
}
