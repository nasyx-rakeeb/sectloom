# ADR 0002: Component and Token Contracts

**Date:** 2026-07-31  
**Status:** Accepted

## Context

As the catalog of sections grows, and eventually automated AI-authoring is introduced, we need absolute consistency in how components are structured, styled, and documented in the registry.

## Decision

1. **Contracts Package (`@sectloom/contracts`)**: We use `zod` to define rigorous runtime schemas for registry items, metadata, and design profiles. This ensures our CLI and website consume reliable data.
2. **Tokens Package (`@sectloom/tokens`)**: We define a Tailwind CSS v4 theme inline configuration mapping semantic CSS variables. This enforces themeability without component-level `dark:` classes.
3. **Component Standard**: We require components to be React Server Components by default, use strictly semantic styling, and accept structured typed props.

## Consequences

- The CLI will securely validate components against Zod schemas.
- Tailwind v4 integration will be straightforward for consumers since they only need to import the CSS variables.
- AI-authored components will have a rigid specification to follow.
