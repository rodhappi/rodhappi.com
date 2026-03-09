---
name: start-development
description: >
  Guided first experience for developers new to the AI-Assisted Development
  Framework. Explains the framework, detects project state, and walks the
  user through their first workflow cycle.
---

# /start-development -- First-Time User Guide

Walk a new user through the framework and their first workflow cycle.

## When to Activate

- User types `/start-development` or asks "how do I use this?"
- User is clearly new to the framework
- After `/bootstrap` sets up a new project

## Procedure

### Step 1: Framework in 30 Seconds

Present this overview directly to the user:

```
## Welcome to the AI-Assisted Development Framework

This framework has 7 layers that work simultaneously behind the scenes:

| Layer | What it does for you |
|-------|---------------------|
| **Context (L1)** | Manages what's loaded so you don't run out of context |
| **Orchestration (L2)** | Coordinates multiple AI agents working in parallel |
| **Memory (L3)** | Saves your progress across sessions |
| **Execution (L4)** | Enforces quality gates so nothing ships broken |
| **Integration (L5)** | Connects to external tools like Slack, GitHub, etc. |
| **Compounding (L6)** | Captures what you learn so future sessions are smarter |
| **Measurement (L7)** | Tracks how effective the framework is |

**You interact through commands.** Type /help-ai-assisted-dev to see them all.
**Rules, agents, and skills work behind the scenes.** You don't need to manage them.
**The framework learns.** Run /compound at the end of each session to capture learnings.
```

### Step 2: Detect Project State

Check the project to determine what to suggest:

1. **Check for existing specs:** Look for files in `specs/` directory
2. **Check for existing code:** Look for `src/`, `lib/`, or `app/` directories
3. **Check for checkpoints:** Look in `.claude/memory/checkpoints/`
4. **Check for knowledge entries:** Count entries in `knowledge/index.md` beyond defaults

Based on findings:

- **Empty project (no specs, no code):**
  > This looks like a fresh project. Let's start with `/specify` to create your first feature specification.

- **Has code but no specs (brownfield):**
  > This project has existing code but no specs. Use `/propose` to create a change proposal for existing code.

- **Has checkpoints (returning user):**
  > You have saved checkpoints from previous sessions. Run `/rewind` to see them and pick up where you left off.

- **Has specs in progress:**
  > You have specs already started. Run `/clarify` to continue refining them, or `/plan` if they're ready.

### Step 3: Guided Walkthrough

Based on the detected state, guide the user through one cycle. **Suggest, don't force** — explain what each step does and let the user decide when to proceed.

#### For greenfield (new feature):

```
## Your First Cycle

Here's the workflow you'll follow:

1. **Create a spec** → /specify
   You'll describe what you want to build. The framework spawns research
   agents to understand the codebase, then drafts a specification.

2. **Clarify ambiguities** → /clarify
   The framework checks your spec for gaps and asks you to resolve them.

3. **Create a plan** → /plan
   Turns the spec into an implementation plan with tasks.

4. **Get approval** → /approve
   A quality gate — you review the plan before any code is written.

5. **Implement** → /work
   The framework writes code following the plan, test-first.

6. **Review** → /review
   9 specialized review agents check your code for security, performance,
   accessibility, and more.

7. **Capture learnings** → /compound
   Extracts patterns and decisions from this session for future sessions.

Ready? Start with: /specify
```

#### For brownfield (changing existing code):

```
## Your First Cycle

Here's the workflow for changing existing code:

1. **Create a proposal** → /propose
   Describe what you want to change and why. The framework analyzes
   the existing code and drafts a change proposal.

2. **Clarify** → /clarify
   Resolve any ambiguities in the proposal.

3. **Plan** → /plan
   Turn the proposal into implementation tasks.

4. **Approve** → /approve
   Review the plan before any changes are made.

5. **Implement** → /work
   The framework makes the changes, test-first.

6. **Review** → /review
   Multi-agent code review of your changes.

7. **Archive** → /archive
   Merge the change record back to the source spec.

8. **Capture learnings** → /compound
   Save what you learned for future sessions.

Ready? Start with: /propose
```

### Step 4: Post-Walkthrough Tips

After the user completes their first cycle (or asks to skip ahead), present:

```
## Key Things to Remember

1. **Run /compound at the end of every session**
   This is how the framework gets smarter over time.

2. **Run /checkpoint before risky changes**
   Creates a save point you can /rewind to if things go wrong.

3. **Run /help-ai-assisted-dev anytime**
   Quick reference for all commands.

4. **Quality gates exist for a reason**
   /approve gates prevent shipping broken code. Don't skip them.

5. **The framework works behind the scenes**
   Rules enforce standards automatically. Agents review in parallel.
   You focus on the work — the framework handles the process.
```

## L1 Integration

This command has moderate context impact:
- ~2-3K tokens to load the skill
- File checks in Step 2 add ~500 tokens
- No agent spawns — purely informational
- Safe to run at any context utilization level

## Notes

- This skill is informational only — it never modifies files or runs workflows
- It adapts its suggestions based on project state (Step 2)
- It complements `/help-ai-assisted-dev` — that is the reference card, `/start-development` is the tutorial
