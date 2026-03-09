# Convention-Based Consistency Over Per-Skill Logic

> **Category:** Pattern (Architecture)
> **Confidence:** Medium
> **Added:** 2026-02-23
> **Tags:** `convention`, `consistency`, `cross-cutting`, `maintainability`

## Context

When adding next-step suggestions to workflow skills, there were two approaches: (1) create a new "advisor" skill that analyzes state and suggests next steps, or (2) define a convention and add a standard section to each existing skill. The framework has 9 workflow skills that all needed the same type of addition.

## Problem

Cross-cutting concerns (features that apply to many skills) can be implemented as:
- **Infrastructure:** A new skill/agent that other skills call or that wraps their output
- **Convention:** A standard section name, format, and placement that each skill includes

Infrastructure adds complexity (new files, dependencies, token cost). Convention adds a small amount of repetition but keeps skills self-contained.

## Solution

Choose convention when:
1. The addition is **small** (5-7 lines per skill)
2. The content is **skill-specific** (each skill's next steps are different)
3. There's **no runtime logic** needed (it's instructional text, not computed)
4. **Auditability** matters (you can grep for the section across all skills)

The convention defined:
- **Section name:** `## Suggested Next Step` (consistent across all skills)
- **Placement:** After the last procedural/output section, before `## L1 Integration`
- **Format:** Bold if-clauses with inline code commands
- **Verification:** `grep -r "## Suggested Next Step" .claude/skills/` confirms all skills have it

## Result

- 9 skills updated in a single pass with no new infrastructure
- Each skill is self-contained (no external dependency for next-step logic)
- New skills automatically know to include the section (it's a visible convention)
- The pattern is greppable for verification and auditing

## When to Choose Infrastructure Instead

Choose infrastructure over convention when:
- The logic is complex or requires computation
- The content is dynamic (depends on runtime state)
- The concern needs to be enforced (convention can be forgotten; rules can't)
- Many skills would have identical content (DRY principle applies)
