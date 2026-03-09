# Constitutional Articles Reference

This document provides example constitutional articles for AI-assisted development environments. Adapt these to your project's needs.

---

## Constitution Structure

```markdown
# Project Constitution

## Preamble
[Project purpose and core values]

## Core Articles
[Immutable principles]

## Amendment Process
[How to change the constitution]
```

---

## Example Articles

### Article I: Spec-First Development

**Principle:** No implementation code shall be written without an approved specification.

**Rationale:** Specifications ensure shared understanding, enable traceability, and prevent scope creep.

**Enforcement:**
- `/plan` command requires spec reference
- Constitutional checker validates spec exists
- Work artifacts must link to spec requirements

**Validation:**
- Every code file can trace to a spec requirement
- Every test can trace to a spec requirement

**Exceptions:**
- Hotfixes may bypass with documented justification
- Must be retrofitted with spec within 1 sprint

---

### Article II: Test-First Development

**Principle:** Tests shall be written and failing before implementation code.

**Rationale:** TDD ensures testable design, documents expected behavior, and catches regressions.

**Enforcement:**
- `/work` command checks for test files
- Test coverage requirements enforced at review

**Validation:**
- Test files exist for all new code
- Tests were committed before or with implementation

**Exceptions:**
- Exploratory spikes exempt (must be discarded or retrofitted)

---

### Article III: Simplicity

**Principle:** Choose the simplest solution that could work. No premature abstraction.

**Rationale:** Complexity is the enemy of maintainability. YAGNI (You Aren't Gonna Need It).

**Enforcement:**
- `/plan` allows maximum 3 initial projects/modules
- Review agents flag over-engineering
- Abstractions require 3+ use cases

**Validation:**
- Code review checks for unnecessary complexity
- Architecture review for new abstractions

**Exceptions:**
- Documented justification for >3 projects
- Performance-critical code may add complexity

---

### Article IV: Integration-First Testing

**Principle:** Tests shall use real dependencies, not mocks, for integration tests.

**Rationale:** Mocks can hide integration bugs. Real dependencies provide confidence.

**Enforcement:**
- Test file analysis flags mock imports in integration tests
- CI runs with real test databases

**Validation:**
- Integration tests connect to real services
- Test environment mirrors production

**Exceptions:**
- External paid APIs may be mocked
- Flaky external services may use contract tests

---

### Article V: Security by Default

**Principle:** Security is not optional. OWASP Top 10 compliance required.

**Rationale:** Security vulnerabilities can cause catastrophic harm.

**Enforcement:**
- Security review agent runs on all changes
- P1 security findings block merge
- Dependency vulnerabilities checked in CI

**Validation:**
- No high/critical vulnerabilities in dependencies
- Auth/authz explicitly designed
- Input validation at all boundaries

**Exceptions:**
- None for P1 security issues

---

### Article VI: Accessibility

**Principle:** All user interfaces shall meet WCAG 2.1 AA compliance.

**Rationale:** Accessibility is a legal requirement and enables all users.

**Enforcement:**
- Accessibility review agent runs on UI changes
- Automated accessibility testing in CI
- Manual accessibility audit before major releases

**Validation:**
- axe-core or similar passes
- Keyboard navigation works
- Screen reader compatible

**Exceptions:**
- Internal tools may have reduced requirements (documented)

---

### Article VII: Performance Budget

**Principle:** Core Web Vitals must meet defined thresholds.

**Rationale:** Performance directly impacts user experience and SEO.

**Enforcement:**
- Performance review agent checks changes
- Lighthouse CI in pipeline
- Bundle size limits enforced

**Validation:**
- LCP < 2.5s
- INP < 200ms
- CLS < 0.1
- Bundle size < defined limit

**Exceptions:**
- Admin interfaces may have relaxed thresholds

---

### Article VIII: Documentation

**Principle:** Public APIs must be documented. Architecture decisions must be recorded.

**Rationale:** Documentation enables maintenance and onboarding.

**Enforcement:**
- Review checks for API documentation
- ADRs required for significant decisions

**Validation:**
- All public functions have docstrings/JSDoc
- ADR exists for each major technology choice

**Exceptions:**
- Internal utilities may skip detailed docs

---

### Article IX: Code Review Required

**Principle:** All code changes require review before merge.

**Rationale:** Review catches issues, spreads knowledge, maintains standards.

**Enforcement:**
- Branch protection requires approval
- Multi-agent review for comprehensive coverage

**Validation:**
- All PRs have at least one approval
- Review comments addressed

**Exceptions:**
- Automated dependency updates (if tests pass)

---

### Article X: Observability

**Principle:** Production systems must be observable (logs, metrics, traces).

**Rationale:** Can't fix what you can't see. Observability enables debugging.

**Enforcement:**
- Review checks for logging in new code
- Metrics required for new services
- Tracing required for distributed systems

**Validation:**
- Errors are logged with context
- Key metrics are tracked
- Traces connect across services

**Exceptions:**
- Non-production environments may reduce observability

---

## Creating Your Own Articles

### Article Template

```markdown
### Article N: [Name]

**Principle:** [One sentence statement of the immutable principle]

**Rationale:** [Why this matters - the underlying reason]

**Enforcement:**
- [How it's checked automatically]
- [Quality gates that enforce it]

**Validation:**
- [Specific criteria for compliance]
- [Measurable checks]

**Exceptions:**
- [When it can be waived]
- [Process for exceptions]
```

### Questions to Ask

1. **Is it truly immutable?** Should this be a principle or a guideline?
2. **Can it be enforced?** If you can't check it, it won't be followed.
3. **Are exceptions clear?** Every rule needs escape hatches.
4. **Does the team agree?** Constitution requires buy-in.

---

## Amendment Process

### When to Amend

- Technology changes make article obsolete
- Team agrees article causes more harm than good
- New understanding requires updated approach

### Amendment Procedure

1. **Propose:** Document rationale for change
2. **Review:** Team discusses impact
3. **Approve:** Requires explicit consensus
4. **Version:** Increment constitution version
5. **Communicate:** Announce change to all stakeholders

### Amendment Record

```markdown
## Amendment History

| Version | Date | Article | Change | Rationale |
|---------|------|---------|--------|-----------|
| 1.1 | 2024-03-15 | III | Increased project limit 3→5 | Microservices architecture |
| 1.2 | 2024-06-01 | IV | Added contract test exception | External API reliability |
```

---

## Enforcement Points Summary

| Phase | Articles Checked | Blocking? |
|-------|------------------|-----------|
| /specify | - | Entry point |
| /clarify | Completeness | No markers |
| /plan | I, III | Yes |
| /work | II, IV | Yes |
| /review | All | P1 blocks |
| /compound | - | Exit point |
