# Self-Guiding Workflow Skills via Standardized Next-Step Sections

> **Category:** Pattern (Architecture)
> **Confidence:** High
> **Added:** 2026-02-23
> **Tags:** `skills`, `workflow`, `ux`, `convention`, `self-guiding`

## Context

The AI-Assisted Development Framework has 8+ workflow commands that form two chains (greenfield and brownfield). Users must know the correct sequence and which command to run next based on outcomes. This knowledge lived in CLAUDE.md and `/help-ai-assisted-dev` -- passive references that users had to seek out.

## Problem

Workflow commands were isolated: each completed its task and stopped, leaving the user to figure out the next step. This created friction, especially for:
- New users who haven't memorized the workflow
- Returning users after days away
- Mid-session after context compaction when the chain is no longer in context

## Solution

Add a standardized `## Suggested Next Step` section to every workflow skill's SKILL.md. The section:

1. **Uses a consistent format** across all skills:
   ```markdown
   ## Suggested Next Step

   - **If {success condition}:** Run `/{next-command}` to {description}.
   - **If {failure condition}:** {remediation}, then re-run `/{current}`.
   ```

2. **Is conditional** -- different outcomes lead to different next steps (e.g., P1 findings → fix and re-review; no P1 → proceed to compound)

3. **Covers both workflows** -- greenfield and brownfield paths are distinguished where they diverge (e.g., after review: greenfield → compound, brownfield → archive → compound)

4. **Handles edge cases** -- context pressure, blocked markers, test failures

## Result

The workflow becomes a self-guiding chain. Every command's output includes what to do next, so the user never needs to consult external references to continue. Running `/specify` tells you to run `/clarify` or `/plan`; running `/review` tells you to run `/approve` then `/compound` or `/archive`.

## Applicability

Apply this pattern to any multi-step workflow system where:
- Commands run sequentially with branching logic
- Users may not know the full sequence
- Outcomes determine which branch to take
- The cost of adding a few lines per command is negligible
