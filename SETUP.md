# Setup

Getting Learning Quest running on a Mac.

## Quick start

```bash
git clone https://github.com/ljohn117/LearningQuest.git
cd LearningQuest
git checkout claude/learningquest-eval-curriculum-1bgzlm
bash scripts/setup-mac.sh
```

The script installs Homebrew and Node if they're missing, installs the
project's dependencies, runs a build to confirm it works, and offers to
install the Claude Code CLI. It checks before each step, so re-running it
is safe.

Then:

```bash
npm run dev
```

and open **http://localhost:5173**.

---

## Doing it by hand

If you'd rather not run a script, it's four steps.

**1. Homebrew** — skip if `brew --version` already works.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

On Apple Silicon, add it to your PATH afterward:

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

**2. Node** — needs version 18 or newer. Check with `node -v`.

```bash
brew install node
```

**3. Dependencies**

```bash
npm install
```

**4. Run it**

```bash
npm run dev
```

---

## Claude Code CLI

```bash
npm install -g @anthropic-ai/claude-code
claude
```

Docs: https://code.claude.com/docs

---

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload, port 5173 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build |
| `npm run smoke` | Browser smoke test — seeded progress, day unlocking, malformed-profile handling |

`npm run smoke` needs Playwright, which isn't installed by default:

```bash
npm install --save-dev playwright && npx playwright install chromium
```

---

## Where progress is stored

In the browser's `localStorage`, under the key `lq_v3`. Nothing leaves the
machine — no accounts, no network calls, no analytics.

Two consequences worth knowing:

- **Progress is per-browser and per-origin.** Chrome and Safari keep
  separate saves. So do `localhost:5173` and `localhost:4173` — the dev
  server and the preview server don't share progress.
- **Clearing site data erases it.** "Clear browsing data" for localhost
  wipes the save.

### Restoring progress from the Claude artifacts

The old artifacts stored progress in `window.storage`, which is scoped to
Claude's origin and does not carry over.

Both prototype files in `prototypes/` have a **Back up** button on the
dashboard. Open the artifact, click it, and copy the payload. Then restore
it from the browser console on the running app:

```js
// paste the backup text between the backticks
const backup = `PASTE_HERE`;
// then, in the app's console:
import('./src/store.js').then(m => m.Store.importBackup(backup));
```

Simpler alternative: paste the payload's `data` object straight in.

```js
localStorage.setItem('lq_v3', JSON.stringify({ version: 3, ...backupData }));
location.reload();
```

The store also migrates automatically: if `lq_profiles_v2` or
`lq_explore_v1` exist on the same origin, it merges them into `lq_v3` on
first load. That only helps if the old keys are on the same origin, which
they won't be coming from a Claude artifact.

---

## Troubleshooting

**Fonts look wrong / plain.** The app loads Bricolage Grotesque, DM Sans,
and JetBrains Mono from Google Fonts. If the network blocks that, the app
still works — it just falls back to system fonts.

**Port 5173 in use.** `npm run dev -- --port 3000`

**`command not found: brew` after installing.** The PATH line didn't get
added. Open a new terminal, or run the `eval` line from step 1 above.

**Build fails after pulling changes.** Dependencies may have changed:
`rm -rf node_modules package-lock.json && npm install`
