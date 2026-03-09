# Knowledge Templates

This document provides templates for capturing different types of knowledge in the compounding system.

---

## Knowledge Categories

| Category | Purpose | When to Create |
|----------|---------|----------------|
| Patterns | Reusable implementation approaches | Found good way to do something |
| Fixes | Solutions to specific problems | Solved a tricky bug |
| Decisions | Architectural choices with rationale | Made significant technology choice |
| Anti-Patterns | What NOT to do | Learned from a mistake |
| Domain Expertise | Technology-specific knowledge | Built up domain knowledge |

---

## Pattern Template

Use for reusable implementation approaches that can be applied across projects.

```markdown
# [Pattern Name]

## Category
Pattern

## Summary
[One sentence describing what this pattern does]

## Context
[When would you use this pattern? What problem does it solve?]

## Solution

### Structure
[Describe the pattern structure]

### Code Example
```[language]
// Example implementation
```

### Key Points
- [Important point 1]
- [Important point 2]
- [Important point 3]

## Variations
[Common variations of this pattern]

## Trade-offs
| Pros | Cons |
|------|------|
| [Pro 1] | [Con 1] |
| [Pro 2] | [Con 2] |

## Related Patterns
- [Related pattern 1]
- [Related pattern 2]

## Tags
[searchable, keywords, for, discovery]

## Metadata
- Created: [date]
- Source: [project/session where discovered]
- Verified: [Yes/No]
```

---

## Fix Template

Use for solutions to specific problems, especially those with error messages.

```markdown
# [Fix Title]

## Category
Fix

## Summary
[One sentence describing the problem and fix]

## Problem

### Symptom
[What you observed - the error or unexpected behavior]

### Error Message
```
[Exact error message for searchability]
```

### Context
[When does this happen? What conditions trigger it?]

## Root Cause
[What actually caused the problem]

## Solution

### Wrong Approach
[What didn't work and why]

```[language]
// Code that doesn't work
```

### Correct Approach
[What works and why]

```[language]
// Code that works
```

### Step-by-Step Fix
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Why It Works
[Explanation of why this solution addresses the root cause]

## Prevention
[How to avoid this problem in the future]

- [Prevention strategy 1]
- [Prevention strategy 2]

## Related Issues
- [Related fix 1]
- [Related fix 2]

## Tags
[error-type, technology, searchable, keywords]

## Metadata
- Created: [date]
- Source: [project/session where fixed]
- Verified: [Yes/No]
- Occurrences: [number of times this has helped]
```

---

## Decision Template (ADR - Architecture Decision Record)

Use for significant architectural or technology choices.

```markdown
# [Decision Title]

## Category
Decision

## Status
[Proposed | Accepted | Deprecated | Superseded by [ADR-XXX]]

## Summary
[One sentence describing the decision]

## Context
[What is the issue that we're seeing that motivates this decision?]

### Problem Statement
[Specific problem we're solving]

### Constraints
- [Constraint 1]
- [Constraint 2]

### Requirements
- [Requirement 1]
- [Requirement 2]

## Options Considered

### Option 1: [Name]
**Description:** [Brief description]

| Pros | Cons |
|------|------|
| [Pro] | [Con] |

### Option 2: [Name]
**Description:** [Brief description]

| Pros | Cons |
|------|------|
| [Pro] | [Con] |

### Option 3: [Name]
**Description:** [Brief description]

| Pros | Cons |
|------|------|
| [Pro] | [Con] |

## Decision
[Which option was chosen and the key reasons why]

## Rationale
[Detailed explanation of the reasoning]

## Consequences

### Positive
- [Positive consequence 1]
- [Positive consequence 2]

### Negative
- [Negative consequence 1]
- [Negative consequence 2]

### Risks
- [Risk 1]: [Mitigation]
- [Risk 2]: [Mitigation]

## Implementation Notes
[Any notes about how this decision should be implemented]

## Related Decisions
- [Related ADR 1]
- [Related ADR 2]

## Tags
[architecture, technology, decision-type]

## Metadata
- Created: [date]
- Decided: [date]
- Deciders: [who was involved]
- Source: [project]
```

---

## Anti-Pattern Template

Use for documenting what NOT to do and why.

```markdown
# [Anti-Pattern Name]

## Category
Anti-Pattern

## Summary
[One sentence describing what to avoid]

## The Anti-Pattern

### What It Looks Like
[Description of the problematic approach]

```[language]
// Example of the anti-pattern
```

### Why It Seems Attractive
[Why developers might be tempted to do this]

- [Reason 1]
- [Reason 2]

## Problems

### Immediate Issues
- [Problem 1]
- [Problem 2]

### Long-term Consequences
- [Consequence 1]
- [Consequence 2]

### Real-World Example
[A specific example of when this caused issues]

## Better Approach

### Solution
[What to do instead]

```[language]
// Example of the correct approach
```

### Why It's Better
- [Benefit 1]
- [Benefit 2]

## Detection

### Code Smells
[How to recognize this anti-pattern]

- [Smell 1]
- [Smell 2]

### Review Checklist
- [ ] [Check 1]
- [ ] [Check 2]

## Related
- [Related anti-pattern]
- [Related pattern (the solution)]

## Tags
[anti-pattern, technology, problem-type]

## Metadata
- Created: [date]
- Source: [where this lesson was learned]
- Severity: [Low | Medium | High | Critical]
```

---

## Domain Expertise Template

Use for building up knowledge about specific technologies, frameworks, or domains.

```markdown
# [Technology/Domain] Expertise

## Category
Domain Expertise

## Overview
[Brief introduction to this technology/domain]

## Core Concepts

### [Concept 1]
[Explanation]

### [Concept 2]
[Explanation]

## Best Practices

### Do
- [Best practice 1]
- [Best practice 2]
- [Best practice 3]

### Don't
- [Anti-practice 1]
- [Anti-practice 2]

## Common Patterns

### [Pattern Name]
[Description and example]

```[language]
// Example
```

## Common Pitfalls

### [Pitfall 1]
**Problem:** [What goes wrong]
**Solution:** [How to avoid/fix]

### [Pitfall 2]
**Problem:** [What goes wrong]
**Solution:** [How to avoid/fix]

## Performance Considerations
- [Consideration 1]
- [Consideration 2]

## Security Considerations
- [Consideration 1]
- [Consideration 2]

## Testing Approach
[How to test code using this technology]

## Debugging Tips
- [Tip 1]
- [Tip 2]

## Resources
- [Official docs]
- [Useful articles]
- [Community resources]

## Version Notes
| Version | Key Changes |
|---------|-------------|
| [version] | [changes] |

## Tags
[technology, framework, domain, expertise]

## Metadata
- Created: [date]
- Last Updated: [date]
- Confidence: [Low | Medium | High]
```

---

## Quick Capture Template

Use for rapid capture when you don't have time for full documentation.

```markdown
# Quick: [Title]

## TL;DR
[One sentence summary]

## Problem
[What was the issue]

## Solution
[What fixed it]

## TODO
- [ ] Expand into full template
- [ ] Add code examples
- [ ] Verify solution

## Tags
[quick, needs-expansion, topic]

## Metadata
- Captured: [date]
- Expand by: [date]
```

---

## Knowledge Entry Quality Checklist

Before saving a knowledge entry, verify:

### Essential (Required)
- [ ] Has clear, searchable title
- [ ] Includes relevant tags
- [ ] Marked with correct category
- [ ] Has summary/TL;DR

### For Fixes
- [ ] Includes exact error message
- [ ] Shows both wrong and right approach
- [ ] Explains why solution works
- [ ] Has prevention strategy

### For Patterns
- [ ] Includes working code example
- [ ] Explains when to use
- [ ] Lists trade-offs

### For Decisions
- [ ] Lists options considered
- [ ] Explains rationale
- [ ] Documents consequences

### For Anti-Patterns
- [ ] Explains why it seems attractive
- [ ] Shows the problems it causes
- [ ] Provides better alternative

---

## Knowledge Organization

### Directory Structure
```
knowledge/
├── patterns/
│   ├── authentication/
│   ├── data-fetching/
│   └── error-handling/
├── fixes/
│   ├── by-technology/
│   └── by-error-type/
├── decisions/
│   └── adr-{number}-{title}.md
├── anti-patterns/
├── expertise/
│   ├── languages/
│   ├── frameworks/
│   └── tools/
└── index.md
```

### Naming Convention
```
{category}/{subcategory}/{descriptive-name}.md

Examples:
patterns/authentication/jwt-refresh-token.md
fixes/react/useeffect-infinite-loop.md
decisions/adr-001-database-selection.md
anti-patterns/god-object.md
expertise/typescript/strict-mode.md
```

### Index File
Maintain an index.md with:
- List of all entries by category
- Most frequently accessed
- Recently added
- Entries needing expansion (from quick captures)
