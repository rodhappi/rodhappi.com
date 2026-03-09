# Constitutional Compliance Rule

Enforce constitutional articles throughout all work. This rule is always active.

## Articles Reference

Full articles with rationale, enforcement, and exceptions: `appendix/constitutional-articles.md`

## Enforcement Points

| Phase | Articles Checked | Blocking? |
|-------|------------------|-----------|
| `/specify` | -- | Entry point (no checks) |
| `/clarify` | Completeness | No markers remain |
| `/plan` | I (Spec-First), III (Simplicity) | Yes |
| `/work` | II (Test-First), IV (Integration-First) | Yes |
| `/review` | All (I-X) | P1 blocks |
| `/compound` | -- | Exit point |

## P1 Blocking Articles

These articles produce P1 findings that block progress:

- **Article I (Spec-First):** No implementation without approved spec
- **Article V (Security):** OWASP Top 10 compliance required
- **Article VI (Accessibility):** WCAG 2.1 AA for UI changes
- **Article IX (Code Review):** All changes require review

## Always

- Check relevant articles at each enforcement point
- Use the `constitutional-check` skill for formal validation at gates
- Flag violations early -- do not wait until review to surface known issues
- Reference specific article numbers when reporting violations

## Exceptions

- Hotfixes may bypass Article I with documented justification (must retrofit spec within 1 sprint)
- Exploratory spikes are exempt from Article II (must be discarded or retrofitted)
- External paid APIs may use mocks in integration tests (Article IV exception)
- Internal tools may have reduced accessibility requirements (Article VI exception, must be documented)

## Amendment

Constitutional articles can be amended through the process defined in `appendix/constitutional-articles.md`. Amendments require explicit team consensus and version tracking.
