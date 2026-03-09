#!/usr/bin/env bash
# L3: Session Start Memory Hook
# Loads previous session summary into context on session start.
# Receives JSON on stdin with session_id, cwd, etc.

set -euo pipefail

# Read hook input from stdin
INPUT=$(cat)

# Extract cwd from the hook input JSON
CWD=$(echo "$INPUT" | python3 -c "import sys, json; print(json.load(sys.stdin).get('cwd', '.'))" 2>/dev/null || echo ".")

SUMMARY_FILE="$CWD/.claude/memory/session-summary.md"

# If no previous session summary exists, exit cleanly
if [ ! -f "$SUMMARY_FILE" ]; then
  exit 0
fi

# Read the session summary
SUMMARY=$(cat "$SUMMARY_FILE")

# If the summary is empty or only whitespace, exit cleanly
if [ -z "$(echo "$SUMMARY" | tr -d '[:space:]')" ]; then
  exit 0
fi

# Check if this is a fresh template (no real content yet)
if echo "$SUMMARY" | grep -q "No previous session recorded"; then
  exit 0
fi

# Output JSON with the summary as additional context for Claude
# The additionalContext field injects text into Claude's context
python3 -c "
import json, sys

summary_path = '$SUMMARY_FILE'
with open(summary_path, 'r') as f:
    content = f.read()

output = {
    'additionalContext': 'Previous session summary (from ' + summary_path + '):\n\n' + content
}
json.dump(output, sys.stdout)
"
