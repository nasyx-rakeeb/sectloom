# Architecture

## High-Level Flow

```text
packages/components  -----> packages/registry -----> public registry routes
       |                         |                         |
       |                         |                         +----> npm CLI
       |                         |                         |
       +-------------------------+-------------------------+----> website

Consumer project:
public registry -> published CLI -> exact section source + dependencies
```

## Monorepo Structure

- `apps/web/`: Public Next.js website and public registry delivery.
- `packages/components/`: Canonical source for manually crafted sections.
- `packages/contracts/`: Runtime schemas and shared types.
- `packages/registry/`: Deterministic registry builder and generated artifacts.
- `packages/cli/`: Published npm CLI.
- `fixtures/next-app/`: Disposable/manual Next.js compatibility project.
- `data/`: Source manifests and images.

Distributed sections do not depend on the public website's internal theme. Their concrete styling travels with their source files.
