# Layer 5: Integration Guide

> L5 is project-specific. This guide provides the structure, concerns, and templates for implementing L5 in any project. Fill in the project-specific content following this skeleton.

---

## Step 1: Integration Inventory

List every external tool or service your project needs to connect to.

### Template

```markdown
## Integration Inventory

| # | Tool/Service | Category | Purpose | Priority |
|---|-------------|----------|---------|----------|
| 1 | [name] | [MCP / API / Hook / CLI] | [what it does for the project] | [Essential / Optional] |
| 2 | ... | ... | ... | ... |
```

### Categories

| Category | Examples | Claude Code Component |
|----------|----------|----------------------|
| MCP Server | Slack, GitHub, Playwright, Database | `.mcp.json` configuration |
| API Integration | REST endpoints, GraphQL, webhooks | Skills that call APIs via shell |
| Event Hooks | Lint on edit, format on save, test on commit | Hooks in `.claude/settings.json` |
| CLI Tools | Docker, npm, terraform, aws-cli | Available via Bash tool |

### Priority Criteria

- **Essential:** Project cannot function without it (e.g., database for a data app)
- **Optional:** Adds value but not required for core functionality (e.g., browser testing)

---

## Step 2: Token Budget Analysis

Every integration has a context cost. Map each one before enabling.

### Template

```markdown
## Token Budget

| Integration | Type | Estimated Token Cost | When to Enable | When to Disable |
|-------------|------|---------------------|----------------|-----------------|
| [name] | MCP | ~XX,000 tokens | [specific workflow or task] | [when not needed] |
| [name] | Hook | ~minimal | Always | Never (low cost) |
```

### Reference Costs

| MCP Type | Typical Cost | Notes |
|----------|-------------|-------|
| GitHub | ~26,000 tokens | High -- enable only during PR/issue work |
| Playwright | ~8,000 tokens | Medium -- enable only during UI testing |
| Database MCPs | ~8-15,000 tokens | Medium -- enable only during DB work |
| Custom MCP (small, <10 tools) | ~2-5,000 tokens | Low-medium |
| Custom MCP (large, 20+ tools) | ~10-20,000 tokens | High -- consider splitting |

### Budget Rule

After completing your analysis, update `.claude/rules/context-budget.md`:
- Add each integration to the "Token Overhead Reference" table
- Set enable/disable guidelines matching your "When to Enable" column

---

## Step 3: MCP Configuration

For each MCP in your inventory, define the server configuration.

### Template: `.mcp.json`

```json
{
  "mcpServers": {
    "[server-name]": {
      "command": "[runtime]",
      "args": ["[path-to-server]"],
      "env": {
        "[ENV_VAR_NAME]": "${[ENV_VAR_NAME]}"
      }
    }
  }
}
```

### Per-MCP Checklist

For each MCP server, address all 5 L5 concerns:

```markdown
### [MCP Name]

**Tool Selection**
- [ ] What tools does this MCP expose?
- [ ] Which tools are essential vs. nice-to-have?
- [ ] Can the tool set be reduced to lower token cost?

**Token Cost**
- [ ] Estimated token cost: ~XX,000
- [ ] Added to context-budget rule
- [ ] Enable/disable triggers defined

**Authentication**
- [ ] Auth method: [API key / OAuth / Bot token / None]
- [ ] Credentials stored in: [env vars / .env file / secrets manager]
- [ ] Credentials are NOT committed to git
- [ ] Rotation policy: [frequency or N/A]

**Error Handling**
- [ ] What happens when the MCP server is unreachable?
- [ ] What happens when auth expires?
- [ ] Timeout configured: [seconds]
- [ ] Fallback strategy: [retry / skip / manual / abort]

**Capability Boundaries**
- [ ] What should the AI do directly via MCP tools?
- [ ] What should the AI delegate to the human?
- [ ] What actions require human approval (HITL)?
- [ ] Are there destructive actions that need safeguards?
```

---

## Step 4: Integration Hooks

For event-triggered automations that run on tool use or file changes.

### Template: Hook Definition

```json
{
  "event": "[PreToolUse | PostToolUse | SessionStart | Stop | PreCompact]",
  "matcher": "[condition to match]",
  "hooks": [
    {
      "type": "command",
      "command": "[script-path]",
      "timeout": 10
    }
  ]
}
```

### Common Integration Hooks

| Hook | Event | Matcher | Purpose |
|------|-------|---------|---------|
| Lint on edit | PostToolUse | `Edit` or `Write` on code files | Auto-lint after file changes |
| Format on save | PostToolUse | `Write` on code files | Auto-format new files |
| Test on commit | PostToolUse | Git commit commands | Run tests after commits |
| Security scan | PreToolUse | `Bash` with deploy/push commands | Check before destructive actions |
| Validate message | PreToolUse | MCP tool calls to messaging services | Ensure no secrets in messages |

### Per-Hook Checklist

```markdown
### [Hook Name]

- [ ] Event type: [which event triggers it]
- [ ] Matcher: [what condition must be true]
- [ ] Script location: [path to script]
- [ ] Timeout: [seconds -- keep hooks fast]
- [ ] Failure behavior: [block action / warn / ignore]
- [ ] Added to `.claude/settings.json`
```

---

## Step 5: Security Review

Before enabling any integration, verify security posture.

### Template

```markdown
## Security Review

### Credentials

| Integration | Auth Type | Storage | In .gitignore? | Rotation |
|-------------|-----------|---------|---------------|----------|
| [name] | [type] | [location] | [Yes/No] | [policy] |

### Data Flow

| Integration | Data Sent | Sensitive? | Safeguard |
|-------------|-----------|-----------|-----------|
| [name] | [what data goes out] | [Yes/No] | [validation hook / manual review / none] |

### Destructive Actions

| Integration | Destructive Tool | Safeguard |
|-------------|-----------------|-----------|
| [name] | [tool that modifies external state] | [HITL approval / confirmation hook / none] |
```

### Security Checklist

- [ ] No credentials in committed files
- [ ] `.env` or equivalent in `.gitignore`
- [ ] Destructive MCP actions require human approval
- [ ] No sensitive data sent to external services without validation
- [ ] Timeout configured for all MCP servers
- [ ] Error recovery defined for auth failures

---

## Step 6: Integration Skill (Optional)

For complex integrations, create a dedicated skill that encapsulates domain knowledge about the external tool.

### Template: `.claude/skills/[tool]-integration/SKILL.md`

```markdown
---
name: [tool]-integration
description: >
  Domain knowledge for working with [tool]. Knows the API conventions,
  common patterns, error modes, and best practices specific to this
  project's use of [tool].
---

# [Tool] Integration

## When to Activate
- When working with [tool]-related tasks
- When [tool] MCP tools are being used
- When troubleshooting [tool] connectivity

## Project-Specific Configuration
- [How this project uses the tool]
- [Which endpoints/channels/resources are relevant]
- [Naming conventions, formatting rules]

## Common Patterns
- [Pattern 1: typical usage]
- [Pattern 2: typical usage]

## Error Modes
- [Error 1: what it means, how to fix]
- [Error 2: what it means, how to fix]

## Capability Boundaries
- AI can: [list of autonomous actions]
- AI should ask first: [list of actions needing approval]
- AI must not: [list of forbidden actions]
```

---

## Step 7: Update CLAUDE.md

After implementing L5, update the project's CLAUDE.md:

1. Mark L5 as active in the architecture table
2. Add integrations to a new "Active Integrations" section:
   ```markdown
   ## Active Integrations

   | Integration | Type | Token Cost | Status |
   |-------------|------|-----------|--------|
   | [name] | MCP | ~XX,000 | Active |
   ```
3. Update the context awareness section with MCP-specific budget notes

---

## Example: Slack MCP for ChiefOfStaff

Applying this guide to a concrete case:

### Integration Inventory

| # | Tool/Service | Category | Purpose | Priority |
|---|-------------|----------|---------|----------|
| 1 | Slack | MCP Server | Send/read messages, manage channels | Essential |

### Token Budget

| Integration | Type | Estimated Token Cost | When to Enable | When to Disable |
|-------------|------|---------------------|----------------|-----------------|
| Slack MCP | MCP | ~5-10,000 tokens (estimate) | During message/channel tasks | During code-only work |

### MCP Configuration

```json
{
  "mcpServers": {
    "slack": {
      "command": "node",
      "args": ["./mcp-servers/slack/index.js"],
      "env": {
        "SLACK_BOT_TOKEN": "${SLACK_BOT_TOKEN}",
        "SLACK_APP_TOKEN": "${SLACK_APP_TOKEN}"
      }
    }
  }
}
```

### Security Review

| Integration | Auth Type | Storage | In .gitignore? | Rotation |
|-------------|-----------|---------|---------------|----------|
| Slack | Bot Token + App Token | `.env` | Yes | Per Slack workspace policy |

### Capability Boundaries

- **AI can:** Read messages, search channels, format and draft messages
- **AI should ask first:** Send messages to channels, create channels
- **AI must not:** Delete messages, remove users, modify workspace settings
