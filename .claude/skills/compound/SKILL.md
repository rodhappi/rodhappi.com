---
name: compound
description: >
  Capture learnings from solved problems into the knowledge base. Final step
  of the greenfield and brownfield workflows. Reads session state, proposes
  knowledge entries, gets user confirmation, creates structured entries.
---

# /compound -- Capture Learnings

Extract knowledge from completed work and store it for future reuse.

## Workflow Position

**Greenfield:**
```
/specify → /clarify → /plan → /approve → /work → /review → [/compound]
```

**Brownfield:**
```
/propose → /clarify → /plan → /approve → /work → /review → /archive → [/compound]
```

- **Gate in:** `/review` complete (no P1 findings), or standalone invocation
- **Gate out:** Knowledge indexed (confirmed entries written to `knowledge/`)

## When to Activate

- After `/review` passes (final workflow step)
- User says "compound", "capture learnings", "save what we learned"
- After any significant debugging session or architectural decision
- Can be run standalone at any time -- not limited to workflow end

## Procedure

### Step 1: Gather Context

Read available signals:
- Check `.claude/memory/learnings/` for staged files from `session-end-persist` hook
- Read `.claude/memory/session-summary.md` for session state
- Run `git log --oneline -10` to see recent commits
- Run `git diff HEAD~5 --name-only` to see which files changed

If no staged learnings exist, proceed anyway -- reflection works from session summary and git history.

### Step 2: Invoke `reflection-loop` Skill

Activate the `reflection-loop` skill with the gathered context. It will:
- Analyze available signals
- Apply extraction questions (problems solved, patterns found, decisions made)
- Filter by quality criteria
- Produce 0-N candidate entries

If zero candidates: inform the user "No significant learnings detected in this session. You can describe a specific learning to capture manually."

### Step 3: Present Candidates to User (HITL)

For each candidate entry from `reflection-loop`, present:
- Title, category, confidence level
- Rationale for capturing
- Raw content summary
- Suggested tags

Ask the user for each candidate:
- **Capture** -- proceed with full template
- **Quick Capture** -- save as minimal entry, mark for future expansion
- **Edit** -- let user modify the title, content, or category before capture
- **Skip** -- do not capture this candidate

### Step 4: Invoke `compound-docs` Skill

For each confirmed candidate (Capture or Quick Capture), activate the `compound-docs` skill. It will:
- Select the appropriate template
- Determine file path and name
- Check for duplicates
- Write the structured entry
- Update `knowledge/index.md`

### Step 5: Report

Present a summary:
- List all entries written with their file paths
- Show the updated "Recently Added" section of `knowledge/index.md`
- Note any entries marked for expansion (Quick Captures)
- Note any staged learning files that were processed

## Standalone Usage

The user can describe a learning directly without going through the full workflow:

> "We learned that X causes Y. Compound this."

In this case:
1. Skip Steps 1-2 (no automatic scanning needed)
2. Treat the user's description as a single candidate
3. Ask the user to confirm category and tags
4. Proceed with Steps 4-5

## Constitutional Compliance

- **Simplicity (Article III):** One entry per problem. Do not over-engineer entries. Quick Capture is better than no capture.
- **Knowledge quality:** The HITL confirmation at Step 3 is the quality gate. Do not write entries the user has not confirmed.

## L1 Integration

This command has low context impact:
- Reflection analysis is in-context (~2,000-4,000 tokens)
- No agent fan-out (unlike `/specify` or `/review`)
- File writes are minimal token cost
- Safe to run at high context utilization (75%+)

## Integration

- Completes the compounding loop: Work → Reflect → Extract → Store → Surface (via `knowledge-searcher`)
- Uses `reflection-loop` skill for extraction (Step 2)
- Uses `compound-docs` skill for entry creation (Step 4)
- Staged learnings from `session-end-persist` hook provide input signals (Step 1)
- The `knowledge-searcher` agent (L3) surfaces stored knowledge in future sessions

## Suggested Next Step

- **If ending the session:** Session is complete. Learnings are saved for future sessions.
- **If continuing work:** Run `/checkpoint` to save current state, then start a new workflow with `/specify` (greenfield) or `/propose` (brownfield).
- **If quick captures were created:** Note the entries marked "Needs Expansion" in `knowledge/index.md` for future enrichment.
