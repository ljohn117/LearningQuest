#!/usr/bin/env bash
# Learning Quest — one-time macOS setup.
#
#   bash scripts/setup-mac.sh
#
# Installs Homebrew and Node if missing, installs project dependencies, and
# optionally installs the Claude Code CLI. Safe to re-run: every step checks
# before it acts, and nothing is overwritten.

set -euo pipefail

bold() { printf '\033[1m%s\033[0m\n' "$1"; }
ok()   { printf '  \033[32m✓\033[0m %s\n' "$1"; }
info() { printf '  \033[34m→\033[0m %s\n' "$1"; }
warn() { printf '  \033[33m!\033[0m %s\n' "$1"; }

cd "$(dirname "$0")/.."

bold "Learning Quest setup"
echo

# ---------------------------------------------------------------- Homebrew
if command -v brew >/dev/null 2>&1; then
  ok "Homebrew already installed ($(brew --version | head -1))"
else
  info "Installing Homebrew (this will ask for your password)..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

  # Apple Silicon puts brew in /opt/homebrew; Intel uses /usr/local.
  if [ -x /opt/homebrew/bin/brew ]; then
    BREW_PREFIX=/opt/homebrew
  else
    BREW_PREFIX=/usr/local
  fi
  eval "$("$BREW_PREFIX/bin/brew" shellenv)"

  # Persist for future shells.
  SHELL_RC="$HOME/.zprofile"
  [ "${SHELL##*/}" = "bash" ] && SHELL_RC="$HOME/.bash_profile"
  if ! grep -q 'brew shellenv' "$SHELL_RC" 2>/dev/null; then
    echo "eval \"\$($BREW_PREFIX/bin/brew shellenv)\"" >> "$SHELL_RC"
    info "Added Homebrew to $SHELL_RC"
  fi
  ok "Homebrew installed"
fi

# -------------------------------------------------------------------- Node
NODE_OK=0
if command -v node >/dev/null 2>&1; then
  NODE_MAJOR=$(node -p 'process.versions.node.split(".")[0]')
  if [ "$NODE_MAJOR" -ge 18 ]; then
    ok "Node $(node -v) already installed"
    NODE_OK=1
  else
    warn "Node $(node -v) is too old — Vite needs 18 or newer. Upgrading."
  fi
fi

if [ "$NODE_OK" -eq 0 ]; then
  info "Installing Node..."
  brew install node
  ok "Node $(node -v) installed"
fi

# --------------------------------------------------------------- Project
info "Installing project dependencies..."
npm install --no-audit --no-fund
ok "Dependencies installed"

info "Running a build to confirm everything works..."
if npm run build >/tmp/lq-build.log 2>&1; then
  ok "Build succeeded"
else
  warn "Build failed — see /tmp/lq-build.log"
  tail -20 /tmp/lq-build.log
  exit 1
fi

# ----------------------------------------------------------- Claude Code
echo
if command -v claude >/dev/null 2>&1; then
  ok "Claude Code already installed"
else
  read -r -p "Install the Claude Code CLI? [y/N] " reply
  case "$reply" in
    [yY]*)
      info "Installing Claude Code..."
      npm install -g @anthropic-ai/claude-code
      ok "Claude Code installed — run 'claude' to start it"
      ;;
    *) info "Skipped. Install later with: npm install -g @anthropic-ai/claude-code" ;;
  esac
fi

# -------------------------------------------------------------------- Done
echo
bold "Done."
echo
echo "  Start the app:   npm run dev"
echo "  Then open:       http://localhost:5173"
echo
echo "  Other commands:  npm run build    production build"
echo "                   npm run preview  serve the build"
echo "                   npm run smoke    browser smoke test"
echo
