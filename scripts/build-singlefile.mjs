/* Bundle the Vite build into one self-contained HTML file.
 *
 *   npm run build && node scripts/build-singlefile.mjs
 *
 * Output: dist/learning-quest.html — no external requests except Google
 * Fonts, so it works offline and inside a sandboxed page. */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const assets = readdirSync(join(DIST, 'assets'));
const jsFile = assets.find((f) => f.endsWith('.js'));
const cssFile = assets.find((f) => f.endsWith('.css'));
if (!jsFile) throw new Error('No JS bundle found — run `npm run build` first.');

const js = readFileSync(join(DIST, 'assets', jsFile), 'utf8');
const css = cssFile ? readFileSync(join(DIST, 'assets', cssFile), 'utf8') : '';

/* A literal </script> inside the bundle would close the tag early. */
const safeJs = js.replace(/<\/script>/gi, '<\\/script>');

const html = `<title>Learning Quest</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=DM+Sans:opsz,wght@9..40,400..600&family=JetBrains+Mono:wght@500..700&display=swap" />
<style>
  /* The app commits to one dark visual world. The viewer's page paints its
     own ground behind the artifact, so body must set this explicitly or a
     light host theme shows through before and around the app. */
  html, body { margin: 0; padding: 0; background: #0c0e16; color: #e7e9f0; }
  #root { min-height: 100vh; }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
  }
</style>
${css ? `<style>\n${css}\n</style>\n` : ''}<div id="root"></div>
<script type="module">
${safeJs}
</script>
`;

const out = join(DIST, 'learning-quest.html');
writeFileSync(out, html);
console.log(`wrote ${out} — ${(html.length / 1024).toFixed(0)} KB`);
