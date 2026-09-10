# Development Workflow

## Approach

Build the portfolio incrementally using the context files as the source of truth for requirements, architecture, UI, and implementation decisions.
Do not invent major features or behavior that are not defined in the project context.

## Scoping Rules

- Work on one feature or section at a time.
- Prefer small, verifiable changes over large implementations.
- Do not combine unrelated features in a single implementation step.
- Reuse existing components and patterns when appropriate.

## When To Split Work

Split an implementation step if it combines:

- UI changes and background task changes
- database persistence
- Multiple unrelated API routes
- Behavior that is not clearly defined in the context files

If a change cannot be verified end to end quickly, the scope is too broad — split it.

## Handling Missing Requirements

- Do not invent product behavior that is not defined in the context files.
- If a requirement is ambiguous, resolve it in the relevant context file before implementing.
- If a requirement is missing, add it as an open question in `progress-tracker.md` before continuing.

## Protected Foundation Components

Do not modify generated third-party foundation components unless explicitly instructed.

This includes:

- `components/ui/*` (shadcn/ui components)
- third-party library internals

These should remain default and reusable.

Project-specific styling, layout changes, and feature logic must be implemented in app-level components instead of modifying foundation components.

Only modify these files when a task explicitly requires it.

## Keeping Docs In Sync

Update the relevant context file whenever implementation changes:

- System architecture or boundaries
- Storage model decisions
- Code conventions or standards
- Feature scope

Progress state must reflect the actual state of the implementation, not the intended state.

## Before Moving To The Next Unit

1. The current unit works end to end within its defined scope.
2. No invariant defined in `architecture-context.md` was violated.
3. `progress-tracker.md` reflects the completed work.
