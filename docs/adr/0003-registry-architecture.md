# ADR 0003: Registry Architecture

## Status

Accepted

## Context

Sectloom distributes production-ready React TSX sections to consumers via a CLI and website. To do this, we need a stable, versioned public registry that lists available components and provides their source code, dependencies, and metadata. We must decide whether to strictly adopt the official `shadcn/ui` registry schema or extend it to meet our strict contract requirements (e.g., checksums, Next.js range compatibility, specific category tracking).

## Decision

We will build a custom registry architecture that conceptually aligns with the `shadcn/ui` registry model (delivering JSON files over HTTP with inline component code and dependency arrays) but explicitly extends it with our own Zod contracts.

- The registry will be statically built into JSON artifacts (`index.json` and individual `[name].json` files) during CI/CD.
- These static files will be hosted on a global CDN, taking advantage of immutable caching.
- Every distributed component file will have a SHA-256 integrity hash computed at build time. The CLI will verify this hash upon download to prevent tampering or corruption.
- Output generation will be deterministic: object keys and arrays sorted alphabetically.

## Consequences

- **Positive:** Maximum security and determinism via strict checksums and static delivery. Fast distribution without backend API overhead. Easy to test locally with a simple HTTP server.
- **Negative:** If we ever wish to natively support the raw `shadcn/ui` CLI (without our custom CLI wrapper), our extended schema might be partially ignored or rejected by their strict validators, though usually extra fields are ignored by consumers.
