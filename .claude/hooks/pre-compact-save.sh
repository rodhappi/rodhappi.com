#!/usr/bin/env bash
# L3: Pre-Compact Save Hook
# Saves session state to a checkpoint before context compaction.
# Receives JSON on stdin with session_id, transcript_path, cwd, etc.

set -euo pipefail

# Read hook input from stdin
INPUT=$(cat)

# Extract fields from the hook input JSON
CWD=$(echo "$INPUT" | python3 -c "import sys, json; print(json.load(sys.stdin).get('cwd', '.'))" 2>/dev/null || echo ".")
SESSION_ID=$(echo "$INPUT" | python3 -c "import sys, json; print(json.load(sys.stdin).get('session_id', 'unknown'))" 2>/dev/null || echo "unknown")

MEMORY_DIR="$CWD/.claude/memory"
CHECKPOINT_DIR="$MEMORY_DIR/checkpoints"
SUMMARY_FILE="$MEMORY_DIR/session-summary.md"

# Ensure directories exist (safety net for first run or fresh clone)
mkdir -p "$CHECKPOINT_DIR"
mkdir -p "$MEMORY_DIR/learnings"

# Generate UTC timestamp
TIMESTAMP=$(date -u +"%Y%m%dT%H%M%SZ")
CHECKPOINT_FILE="$CHECKPOINT_DIR/${TIMESTAMP}-auto-compact.json"

# Write checkpoint JSON
python3 -c "
import json
from datetime import datetime, timezone

checkpoint = {
    'version': '1.0',
    'timestamp': datetime.now(timezone.utc).isoformat(),
    'name': 'auto-compact',
    'trigger': 'pre-compact',
    'session_id': '$SESSION_ID',
    'state': {
        'current_task': 'State captured automatically before context compaction',
        'decisions': [],
        'files_modified': [],
        'pending_work': 'Review this checkpoint after compaction to restore context'
    }
}

with open('$CHECKPOINT_FILE', 'w') as f:
    json.dump(checkpoint, f, indent=2)
"

# Update session summary with compaction note
cat > "$SUMMARY_FILE" << SUMMARY
# Session Summary

**Last updated:** $TIMESTAMP
**Session:** $SESSION_ID

## Current Task
Context compaction occurred. A checkpoint was saved automatically.

## Key Decisions
(preserved in checkpoint)

## Files Modified
(preserved in checkpoint)

## Pending Work
Review the checkpoint to restore context from before compaction.

## Notes
Checkpoint saved at: $CHECKPOINT_FILE
Use the session-memory skill to describe this checkpoint and resume work.
SUMMARY

# Exit 0 = success, proceed with compaction
exit 0
