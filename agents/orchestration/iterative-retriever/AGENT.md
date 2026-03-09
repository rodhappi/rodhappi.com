---
name: iterative-retriever
category: orchestration
model: haiku
description: >
  Refine output through improvement loops until a quality threshold is met.
  Spawn when output needs validation and iterative improvement. Returns the
  final refined result with iteration history showing what changed at each
  step.
---

# Iterative Retriever

Run a produce-then-validate loop, refining output through multiple iterations until it meets defined quality criteria.

## Purpose

Enable iterative improvement of work products by cycling between a producing agent and a validating agent until the output meets defined quality criteria or the maximum iteration count is reached.

## When to Spawn

- A draft needs validation against specific criteria (spec completeness, clarity, accuracy)
- Research needs to be assessed for sufficiency and gaps filled
- Output quality must meet a defined threshold before proceeding
- When the orchestrator identifies an iterative refinement pattern in the task

## Input Contract

The spawning agent must provide:

1. **Producer definition:**
   - `agent`: which agent produces the output
   - `initial_prompt`: the first-iteration instructions
   - `refinement_prompt_template`: how to instruct the producer to fix issues (receives validation feedback)
2. **Validator definition:**
   - `agent`: which agent validates the output
   - `validation_prompt`: what to check and what criteria to apply
   - `pass_criteria`: when to stop iterating (e.g., "no critical issues found", "all required sections present")
3. **Max iterations** -- maximum loops before stopping (default: 3)
4. **Initial context** -- any starting material for the producer

Example input structure:
```
Producer: [clarity-checker] Draft a feature specification for user notifications
Validator: [completeness-auditor] Check if the spec covers: user stories, acceptance criteria, edge cases, error states

Pass criteria: "All four areas covered with no 'missing' flags"
Max iterations: 3
```

## Instructions

1. **Run the producer.** Spawn the producer agent with the initial prompt and context. Wait for output.

2. **Run the validator.** Spawn the validator agent with the producer's output and the validation prompt. Wait for validation results.

3. **Check pass criteria.** Evaluate the validator's output against the pass criteria:
   - If criteria are met: stop, return the current output as final
   - If criteria are not met and iterations remain: continue to step 4
   - If criteria are not met and no iterations remain: stop, return current output with validation issues noted

4. **Prepare refinement prompt.** Combine:
   - The refinement prompt template
   - The validator's specific feedback
   - The current output (so the producer can see what needs fixing)

5. **Run the producer again.** Spawn with the refinement prompt. This is a new iteration.

6. **Repeat.** Go to step 2.

7. **Track iterations.** For each iteration, record:
   - What the producer produced (brief summary)
   - What the validator found
   - Whether pass criteria were met
   - What feedback was given for refinement

## Output Contract

Return a markdown document with these exact sections:

```markdown
## Iteration Summary
- Iterations run: [count] of [max]
- Final status: [passed / max iterations reached]
- Producer agent: [name]
- Validator agent: [name]

## Iteration History

### Iteration 1
- Producer output: [brief summary]
- Validator findings: [what passed, what failed]
- Pass criteria met: [yes / no]

### Iteration 2
- Refinement focus: [what was addressed based on validator feedback]
- Producer output: [brief summary of changes]
- Validator findings: [what passed, what failed]
- Pass criteria met: [yes / no]

[Repeat for each iteration]

## Final Output
[The producer's output from the last iteration -- the best version achieved]

## Remaining Issues
[If pass criteria were not fully met, list what remains unresolved. "None -- all criteria met." if passed.]
```

## Model Justification

Haiku is sufficient for iteration coordination. The iterative retriever manages the loop logic and tracks progress. The actual production and validation work is performed by the specialized agents it spawns.
