# Audit Literal Values When Introducing CSS Variables

## Context
When adding a new CSS custom property (e.g., `--font-sans`), existing declarations may already use the same literal value (e.g., `'Google Sans Flex', sans-serif`). These won't automatically use the new variable.

## Pattern
After defining a new CSS variable, grep the stylesheet for the literal value to find all instances that should be refactored to use the variable.

```bash
# Example: after adding --font-sans
grep -n "Google Sans Flex" css/style.css
```

## Why It Matters
- Keeps the design system centralized — one change point instead of N
- Prevents drift when the variable value is later updated
- Review agents catch this as a consistency issue (P3)

## Origin
Discovered during the Google Sans Flex font migration (`specs/google-sans-flex-font/`). `.identity-line` had a hardcoded `'Google Sans Flex', sans-serif` that should have been `var(--font-sans)`.

## Tags
css, variables, custom-properties, refactoring, design-tokens
