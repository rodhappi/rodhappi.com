#!/usr/bin/env bash
# L6: Session-End Persist Hook
# Captures session metadata to the learnings staging area when a session ends.
# The actual learning extraction happens when the user runs /compound.
# Receives JSON on stdin with session_id, cwd, etc.

set -euo pipefail

# Read hook input from stdin
INPUT=$(cat)

# Extract fields from the hook input JSON
CWD=$(echo "$INPUT" | python3 -c "import sys, json; print(json.load(sys.stdin).get('cwd', '.'))" 2>/dev/null || echo ".")
SESSION_ID=$(echo "$INPUT" | python3 -c "import sys, json; print(json.load(sys.stdin).get('session_id', 'unknown'))" 2>/dev/null || echo "unknown")

MEMORY_DIR="$CWD/.claude/memory"
LEARNINGS_DIR="$MEMORY_DIR/learnings"
SUMMARY_FILE="$MEMORY_DIR/session-summary.md"

# Ensure directory exists
mkdir -p "$LEARNINGS_DIR"

# Only stage if session summary has real content (not just the template default)
if [ -f "$SUMMARY_FILE" ] && [ -s "$SUMMARY_FILE" ]; then
  # Check for real content (more than just the template header)
  CONTENT_LINES=$(grep -v '^#\|^$\|^\*\*\|^(preserved' "$SUMMARY_FILE" 2>/dev/null | wc -l | tr -d ' ')
  if [ "$CONTENT_LINES" -lt 2 ]; then
    exit 0
  fi
else
  exit 0
fi

# Generate UTC timestamp
TIMESTAMP=$(date -u +"%Y%m%dT%H%M%SZ")
STAGING_FILE="$LEARNINGS_DIR/${TIMESTAMP}-session.json"

# Write staging file with session metadata
python3 -c "
import json
from datetime import datetime, timezone

staging = {
    'version': '1.0',
    'timestamp': datetime.now(timezone.utc).isoformat(),
    'session_id': '$SESSION_ID',
    'trigger': 'session-end',
    'signals': {
        'session_summary_path': '.claude/memory/session-summary.md',
        'learnings_staged': True
    }
}

with open('$STAGING_FILE', 'w') as f:
    json.dump(staging, f, indent=2)
"

exit 0
