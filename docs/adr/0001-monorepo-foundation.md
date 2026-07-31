# ADR 0001: Monorepo Foundation

**Date:** 2026-07-31  
**Status:** Accepted

## Context

We need a structure to build and maintain a complex platform with multiple packages (components, CLI, registry) and an application (web).

## Decision

We will use **pnpm workspaces** combined with **Turborepo** for our monorepo architecture.
Node version is pinned to **LTS v22**.
Code quality will be enforced via **TypeScript strict mode**, **ESLint flat config**, and **Prettier**.

## Consequences

- Fast, cached builds via Turborepo.
- Strict workspace boundaries enforced by pnpm.
- Predictable execution environment.
