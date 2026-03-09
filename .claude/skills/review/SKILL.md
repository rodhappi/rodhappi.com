---
name: review
description: >
  Run a multi-agent code review by fanning out 9 specialized review agents in
  parallel. Synthesizes findings with severity classification (P1-P4) and
  enforces the quality gate: no P1 findings may remain unresolved.
---

# /review -- Multi-Agent Code Review

Run a comprehensive review using 9 specialized agents in parallel.

## Workflow Position

```
/specify → /clarify → /plan → /approve → /work → [/review] → /compound
```

**Gate in:** All tests passing (from `/work`)
**Gate out:** No P1 findings, all findings triaged

## When to Activate

- After implementation is complete and tests pass
- User says "review", "code review", "run review"

## Procedure

### Step 1: Verify Gate In

- Confirm all tests are passing
- Identify the files changed since the last review (or since plan approval)
- Gather context: spec path, plan path, changed files

### Step 2: Fan-Out Review Agents

Spawn all 9 review agents in parallel using the fan-out pattern:

| Agent | Model | Focus | Blocks? |
|-------|-------|-------|---------|
| `security-sentinel` | sonnet | OWASP, auth, injection | P1 blocks |
| `performance-oracle` | haiku | Core Web Vitals, bundle size | No |
| `accessibility-guardian` | haiku | WCAG 2.1 AA | P1 blocks (UI) |
| `constitutional-checker` | sonnet | All articles | P1 blocks |
| `spec-compliance-reviewer` | haiku | Spec requirements | P1 blocks |
| `code-simplicity-reviewer` | haiku | Over-engineering | No |
| `architecture-strategist` | haiku | Design patterns | No |
| `data-integrity-guardian` | sonnet | Validation, types | P1 blocks |
| `pattern-recognition-specialist` | haiku | Anti-patterns | No |

**Note:** Skip `accessibility-guardian` if changes are backend-only with no UI impact.

### Step 3: Synthesize Results

Collect all agent outputs and produce a unified review:

1. **Aggregate findings** by severity (P1, P2, P3, P4)
2. **Deduplicate** findings flagged by multiple agents
3. **Resolve conflicts** per orchestrator priority:
   - Security findings take precedence over performance
   - Spec compliance takes precedence over style
   - Constitutional violations are non-negotiable

### Step 4: Triage

For each finding:
- **P1 (Critical):** Must be resolved. List specific remediation steps.
- **P2 (High):** Should be resolved. Document if deferred with justification.
- **P3 (Medium):** Recommended. Address when practical.
- **P4 (Low):** Optional. At developer discretion.

### Step 5: Gate Check

- **No P1 findings:** Review passes. Present findings to user via `human-checkpoint` skill for final approval.
- **P1 findings exist:** Review fails. List all P1 findings with remediation. User must fix and re-run `/review`.

## Output

Review summary document presented to user with:
- Findings by severity
- Remediation guidance for P1/P2
- Overall assessment from each agent

## Suggested Next Step

- **If P1 findings exist:** Fix the identified issues, then re-run `/review`.
- **If no P1 findings (greenfield):** Run `/approve` for final sign-off, then `/compound` to capture learnings.
- **If no P1 findings (brownfield):** Run `/approve` for final sign-off, then `/archive` to merge changes, then `/compound`.

## L1 Integration

Fan-out of 9 agents produces ~9,000-18,000 tokens of results re-entering the parent context. This is a high-cost operation. Only run when implementation is complete and tests pass. If context is above 50%, consider compacting before running review.
