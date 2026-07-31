# Architecture

## High-Level Flow

```text
packages/components  -----> packages/registry -----> public registry routes
       |                         |                         |
       |                         |                         +----> npm CLI
       |                         |                         |
       +-------------------------+-------------------------+----> website

Consumer project:
public registry -> published CLI -> local TSX + semantic tokens + dependencies
```

## Monorepo Structure

- `apps/web/`: Public Next.js website and public registry delivery.
- `packages/components/`: Canonical source for manually crafted sections.
- `packages/contracts/`: Runtime schemas and shared types.
- `packages/tokens/`: Tailwind v4 semantic token contract.
- `packages/registry/`: Deterministic registry builder and generated artifacts.
- `packages/cli/`: Published npm CLI.
- `fixtures/next-app/`: Disposable/manual Next.js compatibility project.
- `data/`: Source manifests and images.
