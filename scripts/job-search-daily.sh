#!/bin/bash
set -uo pipefail

export PATH="$HOME/.nvm/versions/node/v26.8.1/bin:/opt/homebrew/bin:/usr/bin:/bin"
SITE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
export CAREER_OPS_DIR="$HOME/Code/career-ops"
export SITE_URL="https://pavlokostiuk.cloud"
export BW_SESSION="$("$HOME/.local/bin/bw-session")"
INTERNAL_INGEST_TOKEN="$(bw get item 59cbf5d9-6901-41d2-ab9d-cb08c91a7fc2 | jq -r '.fields[] | select(.name=="INTERNAL_INGEST_TOKEN") | .value')"
export INTERNAL_INGEST_TOKEN

failed=()
run() {
  local name="$1"
  shift
  echo "== $(date -Iseconds) $name"
  "$@" || failed+=("$name")
}
agent() {
  claude -p --dangerously-skip-permissions "$1"
}

cd "$CAREER_OPS_DIR" || exit 1
run "scan job boards" npm run scan
run "scan HN who is hiring" npm run scan:hn
if [ "$(date +%u)" = "1" ]; then
  run "weekly web-search scan" agent "/career-ops:career-ops scan"
fi
run "sync statuses to career-ops" node "$SITE_DIR/scripts/sync-career-ops-statuses.mjs"
run "evaluate new jobs" agent "$(cat "$SITE_DIR/scripts/job-search-evaluate-prompt.md")"
run "check replies and prepare interviews" agent "$(cat "$SITE_DIR/scripts/job-search-replies-prompt.md")"
run "push jobs and CVs to the site" node "$SITE_DIR/scripts/push-career-ops.mjs"

echo "== $(date -Iseconds) finished; failed steps: ${failed[*]:-none}"
[ ${#failed[@]} -eq 0 ]
