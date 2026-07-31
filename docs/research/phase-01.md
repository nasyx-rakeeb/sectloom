# Phase 01 Research

## Monorepo & Tooling

- **pnpm workspaces**: Official pnpm documentation recommends defining `pnpm-workspace.yaml`. We will use this to manage our apps and packages boundaries.
- **Turborepo**: Version 2.x is standard for Next.js ecosystems. We will configure a `turbo.json` with base cacheable tasks: `build`, `lint`, `typecheck`, and `dev`.
- **Node.js**: Node.js 22.x is the current Active LTS. Next.js App router requires at least Node 18.17, but Node 22 provides optimal performance and modern native fetch.
- **TypeScript**: TS 5.x with `strict: true` and `bundler` module resolution is appropriate for modern React ecosystem apps.
- **ESLint**: ESLint 9 using Flat Config is the new official standard. We will implement basic JS rules for now, to be extended in Next.js and React apps as they are created.
- **Prettier**: Standard configuration across the repository.

## Dependencies

These are set up only at the root for shared tooling logic (`turbo`, `eslint`, `prettier`, `typescript`). Package-specific dependencies will be deferred to later phases.
