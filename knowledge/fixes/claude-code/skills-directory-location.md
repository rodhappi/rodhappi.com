# Skills Must Live in .claude/skills/ for Slash Command Discovery

## Category
Fix

## Summary
Skills placed in `skills/` at project root are not discovered as `/` slash commands. They must be in `.claude/skills/` to register as native Claude Code commands.

## Problem

### Symptom
Custom skills defined at `skills/{name}/SKILL.md` do not appear as `/` slash commands in Claude Code. Users must invoke them by asking naturally ("run compound") instead of typing `/compound`.

### Error Message
```
No error — commands simply don't appear in autocomplete or respond to /name invocation.
```

### Context
The framework had all 29 skills in `skills/` at the project root since Layer 1 implementation. They worked when invoked through natural language but never registered as native slash commands.

## Root Cause
Claude Code auto-discovers skills only from specific locations:
- `.claude/skills/{name}/SKILL.md` — project-level (current project only)
- `~/.claude/skills/{name}/SKILL.md` — personal (all projects)

A `skills/` directory at the project root is not in the discovery path.

## Solution

### Wrong Approach
```
project-root/
  skills/
    specify/SKILL.md      <- NOT discovered as /specify
    compound/SKILL.md     <- NOT discovered as /compound
```

### Correct Approach
```
project-root/
  .claude/
    skills/
      specify/SKILL.md    <- Discovered as /specify
      compound/SKILL.md   <- Discovered as /compound
```

### Step-by-Step Fix
1. Move `skills/` into `.claude/skills/`
2. Update all internal references from `skills/` to `.claude/skills/`
3. Update CLAUDE.md conventions section
4. Re-copy to any projects that received the old structure

## Why It Works
Claude Code scans `.claude/` as its project configuration directory. Rules, hooks, settings, memory, and skills all live under `.claude/`. Placing skills at root puts them outside the discovery path.

## Prevention
- Always place skills in `.claude/skills/` from the start
- Other `.claude/` components (rules, hooks, memory) were already correctly placed — skills should follow the same convention
- When bootstrapping a project, verify `/` commands work by checking autocomplete

## Related Issues
- Rules auto-load from `.claude/rules/` — same `.claude/` convention
- Hooks auto-trigger from `.claude/settings.json` — same convention
- The `/bootstrap` skill needs to copy `.claude/` as a whole, not `skills/` separately

## Tags
claude-code, skills, slash-commands, discovery, directory-structure, fix, configuration

## Metadata
- Created: 2026-02-19
- Source: ai-assisted-development-framework (skills migration session)
- Verified: Yes
- Occurrences: 1 (affected all 29 skills across 3 projects)
