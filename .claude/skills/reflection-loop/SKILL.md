---
name: reflection-loop
description: >
  Extract patterns, fixes, and decisions from completed work sessions. Activate
  when /compound is called or after significant work is done. Analyzes session
  summary, staged learnings, and git diff to produce candidate knowledge entries.
---

# Reflection Loop

Analyze what happened in a session and identify knowledge worth capturing.

## When to Activate

- Invoked by the `/compound` command (primary trigger)
- After completing a significant piece of work
- When the user asks to reflect on what was learned
- When `session-end-persist` hook has staged learning signals

## Input Sources

Read these signals to understand what happened:

1. **Session summary:** `.claude/memory/session-summary.md` -- key decisions, files modified, pending work
2. **Staged learnings:** `.claude/memory/learnings/` -- JSON files from `session-end-persist` hook
3. **Git history:** `git log --oneline -10` -- recent commits showing what was accomplished
4. **File changes:** `git diff HEAD~5 --name-only` -- which files changed recently
5. **Checkpoints:** `.claude/memory/checkpoints/` -- optional, for richer context on decisions

Read what is available. Not all sources will have content in every session.

## Extraction Protocol

For each input source, ask these questions:

### Problem Detection (candidate Fix)
- Was a non-trivial bug debugged and solved?
- Was there an error message that required investigation?
- Was there a workaround discovered for a known issue?

### Pattern Recognition (candidate Pattern)
- Was a reusable implementation approach discovered or applied?
- Was a code structure repeated that could be generalized?
- Was an effective workflow or process identified?

### Decision Identification (candidate Decision)
- Was a significant architectural or technology choice made?
- Were multiple options evaluated with a clear winner?
- Was a design trade-off explicitly resolved?

### Anti-Pattern Detection (candidate Anti-Pattern)
- Was an approach tried and abandoned? Why did it fail?
- Was a common mistake identified and corrected?
- Was a tempting but incorrect solution avoided?

### Expertise Building (candidate Domain Expertise)
- Was technology-specific knowledge built up through use?
- Were framework quirks or undocumented behaviors discovered?
- Were performance characteristics or limitations learned?

## Quality Filter

Only propose candidates that pass all of these:

1. **Not already captured:** Check `knowledge/index.md` for existing entries with the same topic
2. **Non-trivial:** Skip routine tasks ("updated config file", "ran tests")
3. **Clear title:** Can be summarized in a searchable one-line title
4. **Future value:** Would help someone encountering the same situation later
5. **Specific enough:** Contains concrete details, not just vague observations

## Output Format

For each candidate, produce:

```markdown
## Candidate: {Title}

- **Category:** Pattern | Fix | Decision | Anti-Pattern | Domain Expertise
- **Confidence:** High | Medium | Low
- **Rationale:** {Why this is worth capturing -- one sentence}
- **Raw content:** {What was learned, in plain language. Include error messages, code snippets, or specific details that make this actionable.}
- **Tags:** {comma-separated searchable keywords}
```

## Handling Empty Sessions

If no candidates meet the quality filter:

- Report clearly: "No significant learnings detected in this session."
- Do NOT fabricate or inflate trivial observations into candidates
- Suggest the user describe a specific learning if they believe one exists

## Integration

- The `/compound` command invokes this skill at Step 2
- Output is passed to the user for confirmation (HITL), then to `compound-docs` for writing
- The `knowledge-searcher` agent (L3) is the retrieval counterpart -- this skill is the capture counterpart
