# Thin Hooks + Rich Skills for Event Processing

## Category
Pattern

## Summary
Use shell hooks for minimal metadata capture on events, and AI skills for rich analysis when the user invokes it.

## Context
Claude Code hooks are shell scripts triggered by events (session start, pre-compact, session end). Shell scripts cannot reason -- they have no AI model access. But events like session-end carry valuable signals that should be captured for later analysis. The question is: how much processing should the hook do?

## Solution

### Structure
1. **Hook (thin):** Captures metadata only -- timestamp, session ID, file paths, trigger type. Writes a small JSON staging file. No analysis, no reasoning, no transformation.
2. **Skill (rich):** When the user invokes a command (e.g., `/compound`), the skill reads the staging files and applies AI reasoning to extract patterns, learnings, and decisions.

### Code Example
```bash
# Hook: ~30-50 lines of shell, captures metadata
TIMESTAMP=$(date -u +"%Y%m%dT%H%M%SZ")
python3 -c "
import json
staging = {'timestamp': '...', 'session_id': '...', 'trigger': 'session-end'}
with open('$STAGING_FILE', 'w') as f: json.dump(staging, f, indent=2)
"
```

### Key Points
- Hooks fire automatically and must be fast and reliable -- shell script constraints
- AI reasoning is expensive and should be user-initiated, not automatic
- The staging area (`.claude/memory/learnings/`) bridges the gap: hooks write, skills read
- This pattern was used twice: `pre-compact-save` (L3) and `session-end-persist` (L6)

## Variations
- **Multiple hooks feeding one skill:** Several event hooks write staging files; one command-skill (like `/compound`) reads all of them
- **Hook with validation:** Hook checks a precondition (e.g., "does session-summary have real content?") before writing

## Trade-offs
| Pros | Cons |
|------|------|
| Hooks are fast and reliable | Two-step process (capture then analyze) |
| AI reasoning is user-controlled | Staging files accumulate if user never runs analysis |
| Clear separation of concerns | Hooks can't make intelligent decisions about what to capture |
| Works within shell script constraints | Requires a gitignored staging directory |

## Related Patterns
- [Skills Not Agents for Context-Dependent Logic](../architecture/skills-not-agents-for-context-logic.md)

## Tags
hooks, skills, event-processing, architecture, claude-code, staging, metadata

## Metadata
- Created: 2026-02-18
- Source: ai-assisted-development-framework (L3 pre-compact-save, L6 session-end-persist)
- Verified: Yes
