---
name: bootstrap
description: >
  Copy or sync the AI-Assisted Development Framework into a target directory.
  Two modes: full copy for new projects, sync for updating existing projects.
  Sync mode updates framework components without touching project-specific files.
---

# /bootstrap -- Copy or Sync Framework

Copy the full framework to a new project, or sync framework updates to an existing one.

## Usage

```
/bootstrap /path/to/target                  # Full copy (new project)
/bootstrap --sync /path/to/target           # Sync updates (existing project)
```

## Modes

### Full Copy (default)

For **new projects** that don't have the framework yet. Copies everything and creates memory directories.

### Sync (`--sync`)

For **existing projects** that already have the framework. Updates only framework components, preserving project-specific files.

**What sync updates:**

| Component | Updated? | Reason |
|-----------|----------|--------|
| `.claude/skills/` | Yes | Framework skills may have new commands or fixes |
| `.claude/rules/` | Yes | Rules may have updated thresholds or policies |
| `.claude/hooks/` | Yes | Hook scripts may have improvements |
| `.claude/settings.json` | Yes | Hook registrations may have changed |
| `agents/` | Yes | Agents may have updated prompts or models |
| `templates/` | Yes | Templates may have structural updates |
| `appendix/` | Yes | Reference materials may have new guides |
| `.claude-plugin/` | Yes | Plugin manifest may have version bumps |

**What sync preserves (never touches):**

| Component | Why preserved |
|-----------|---------------|
| `CLAUDE.md` | Customized for the specific project |
| `knowledge/` | Contains project-specific learnings |
| `.claude/memory/` | Contains project session state |
| `specs/` | Contains project specifications |
| `src/`, `lib/`, `app/` | Contains project code |
| `.env`, `.gitignore` | Contains project configuration |

---

## Full Copy -- What Gets Copied

| Component | Source | Destination | Notes |
|-----------|--------|-------------|-------|
| Plugin manifest | `.claude-plugin/` | `.claude-plugin/` | As-is |
| Rules | `.claude/rules/` | `.claude/rules/` | 4 rules |
| Hooks | `.claude/hooks/` | `.claude/hooks/` | 3 hook scripts |
| Hook settings | `.claude/settings.json` | `.claude/settings.json` | Hook registrations |
| CLAUDE.md | `CLAUDE.md` | `CLAUDE.md` | **Needs customization after copy** |
| Skills | `.claude/skills/` | `.claude/skills/` | All skills |
| Agents | `agents/` | `agents/` | All agents by category |
| Knowledge | `knowledge/` | `knowledge/` | Index + existing entries |
| Templates | `templates/` | `templates/` | Output structure templates |
| Appendix | `appendix/` | `appendix/` | Reference materials |

## Full Copy -- What Gets Created (Empty)

| Directory | Purpose |
|-----------|---------|
| `.claude/memory/checkpoints/` | Session checkpoint storage |
| `.claude/memory/learnings/` | Staged learnings before compounding |

---

## Procedure: Full Copy

1. **Validate target directory**
   - Confirm the target path was provided as an argument
   - Check if the target directory exists; if not, ask user if it should be created
   - Check if the target already has framework files; if so, warn about overwrite and ask for confirmation

2. **Locate the framework source**
   - The source is this project's root directory
   - Resolve the framework root from this skill's location: `../../../` from `.claude/skills/bootstrap/`

3. **Copy all components**
   ```bash
   cp -R .claude-plugin/ <target>/.claude-plugin/
   cp -R .claude/ <target>/.claude/
   cp CLAUDE.md <target>/CLAUDE.md
   cp -R agents/ <target>/agents/
   cp -R knowledge/ <target>/knowledge/
   cp -R templates/ <target>/templates/
   cp -R appendix/ <target>/appendix/
   ```

4. **Create memory directories**
   ```bash
   mkdir -p <target>/.claude/memory/checkpoints
   mkdir -p <target>/.claude/memory/learnings
   ```

5. **Report results**
   List what was copied with a count of each component type.

6. **Remind about CLAUDE.md**
   > The CLAUDE.md has been copied but contains the generic framework description.
   > Key sections to update: Project Overview, Architecture (L5 status), Conventions (stack-specific).

---

## Procedure: Sync

1. **Validate target directory**
   - Confirm the target path was provided
   - Verify the target already has the framework (check for `.claude/skills/` or `.claude/rules/`)
   - If no framework found, suggest using full copy instead

2. **Locate the framework source**
   - Same as full copy: resolve from this skill's location

3. **Pre-sync validation -- Compare source vs destination**
   Before overwriting, run a diff to understand what will change:
   ```bash
   # Compare each framework component directory
   diff -rq <source>/.claude/skills/  <target>/.claude/skills/
   diff -rq <source>/.claude/rules/   <target>/.claude/rules/
   diff -rq <source>/.claude/hooks/   <target>/.claude/hooks/
   diff -q  <source>/.claude/settings.json <target>/.claude/settings.json
   diff -rq <source>/agents/          <target>/agents/
   diff -rq <source>/templates/       <target>/templates/
   diff -rq <source>/appendix/        <target>/appendix/
   diff -rq <source>/.claude-plugin/  <target>/.claude-plugin/
   ```

   Present a validation report to the user:

   ```
   ## Sync Validation Report

   | Component         | Status       | Details                          |
   |-------------------|--------------|----------------------------------|
   | .claude/skills/   | X changed    | list of changed/new/removed files|
   | .claude/rules/    | Up to date   |                                  |
   | agents/           | X changed    | list of changed/new/removed files|
   | ...               | ...          | ...                              |

   Summary: X components have changes, Y are already up to date.
   ```

   Classify each file difference as:
   - **Modified**: file exists in both but content differs
   - **New**: file exists in source but not in destination (will be added)
   - **Removed**: file exists in destination but not in source (will be deleted)

   If **all components are already up to date** (no differences found):
   > Everything is already in sync. No changes needed.
   - Stop here -- do not proceed with the copy step

   If there **are differences**, ask the user for confirmation before proceeding:
   > Proceed with syncing X changed components? (Y are already up to date and will not be touched.)

4. **Sync framework components only**
   Replace framework-owned directories while preserving project files:
   ```bash
   rm -rf <target>/.claude/skills/ && cp -R .claude/skills/ <target>/.claude/skills/
   rm -rf <target>/.claude/rules/ && cp -R .claude/rules/ <target>/.claude/rules/
   rm -rf <target>/.claude/hooks/ && cp -R .claude/hooks/ <target>/.claude/hooks/
   cp .claude/settings.json <target>/.claude/settings.json
   rm -rf <target>/agents/ && cp -R agents/ <target>/agents/
   rm -rf <target>/templates/ && cp -R templates/ <target>/templates/
   rm -rf <target>/appendix/ && cp -R appendix/ <target>/appendix/
   rm -rf <target>/.claude-plugin/ && cp -R .claude-plugin/ <target>/.claude-plugin/
   ```

5. **Post-sync validation -- Verify the sync**
   After copying, re-run the same diff to confirm source and destination now match:
   ```bash
   diff -rq <source>/.claude/skills/  <target>/.claude/skills/
   diff -rq <source>/.claude/rules/   <target>/.claude/rules/
   diff -rq <source>/.claude/hooks/   <target>/.claude/hooks/
   diff -q  <source>/.claude/settings.json <target>/.claude/settings.json
   diff -rq <source>/agents/          <target>/agents/
   diff -rq <source>/templates/       <target>/templates/
   diff -rq <source>/appendix/        <target>/appendix/
   diff -rq <source>/.claude-plugin/  <target>/.claude-plugin/
   ```

   If any differences remain, report them as warnings. Otherwise confirm:
   > Post-sync validation passed. All framework components match the source.

6. **Report what was synced**
   List updated components with counts:
   - Number of skills synced
   - Number of agents synced
   - Number of rules synced
   - Number of hook scripts synced
   - Number of templates synced

7. **Confirm preserved files**
   > The following were preserved (not touched):
   > - CLAUDE.md (project-specific)
   > - knowledge/ (project learnings)
   > - .claude/memory/ (session state)

---

## Safeguards

- **Full copy:** Never overwrite without asking if target has existing `.claude/` or `CLAUDE.md`
- **Sync:** Never touch CLAUDE.md, knowledge/, .claude/memory/, specs/, or project code
- **Both modes:** Never delete files outside framework-owned directories
- **Preserve .gitignore:** Do not overwrite; suggest adding `.claude/memory/` if not present

## After Bootstrap (Full Copy)

1. **Customize CLAUDE.md** — Update project overview, stack, and conventions
2. **Implement L5** — Follow `appendix/integration-guide.md` for MCP integrations
3. **Start working** — Use `/specify` (greenfield) or `/propose` (brownfield)

## After Sync

1. **Check /help-ai-assisted-dev** — See if new commands were added
2. **Continue working** — Framework updates are active immediately
