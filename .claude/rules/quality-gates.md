# Quality Gates Rule

Enforce phase transition requirements in all workflows. This rule is always active.

## Gate Definitions

| Transition | Gate Condition | Enforcement |
|------------|----------------|-------------|
| Specify → Plan | No `[NEEDS CLARIFICATION]` markers in spec | Scan spec for markers before proceeding |
| Plan → Work | Constitutional articles satisfied | Run `constitutional-check` skill, require pass |
| Work → Review | All tests passing | Verify test suite passes before starting review |
| Review → Complete | No P1 findings | All P1 findings resolved or explicitly waived |

## Severity Definitions

| Severity | Label | Impact | Action |
|----------|-------|--------|--------|
| P1 | Critical | Blocks progress | Must resolve before passing gate |
| P2 | High | Significant concern | Should resolve, document if deferred |
| P3 | Medium | Improvement opportunity | Address when practical |
| P4 | Low | Minor suggestion | Optional, at developer discretion |

## Gate Failure Behavior

When a gate fails:

1. **Report** the specific failures clearly -- which gate, which conditions unmet
2. **Do not proceed** to the next phase
3. **Guide resolution** -- suggest specific actions to satisfy the gate
4. **Re-check** after resolution -- run the gate validation again

## Always

- Check the relevant gate before transitioning between workflow phases
- Report gate status clearly (pass/fail with details)
- Never skip a gate, even if the user requests it -- explain why the gate exists
- Allow explicit waivers only for P2-P4 findings with documented justification
- P1 findings cannot be waived

## Never

- Proceed past a failed gate without resolution
- Downgrade a P1 finding to avoid blocking
- Skip gate checks in brownfield workflows (same gates apply)
