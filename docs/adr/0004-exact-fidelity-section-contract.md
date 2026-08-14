# ADR 0004: Exact-Fidelity Section Contract

**Date:** 2026-08-14

**Status:** Accepted

**Supersedes:** ADR 0002 token-system decisions

## Context

Sectloom's catalog is built from distinctive visual references. Translating those references into one shared semantic theme changed their colors, typography, spacing, radii, and overall character. The installed code no longer reliably matched the preview that led a user to choose it.

## Decision

Sectloom distributes exact-fidelity section source:

1. Each section owns the concrete styling required to reproduce its preview.
2. Tailwind CSS is the default styling mechanism, including arbitrary values where needed.
3. A section may include scoped supporting CSS or assets for effects Tailwind cannot express clearly.
4. Sectloom does not inject a global theme or require a runtime styling package.
5. Typed props customize content while the default render preserves the approved reference.
6. The public catalog's internal theme remains isolated from distributed section code.

## Consequences

- Installed sections preserve their individual visual identity.
- Unrelated sections may not look cohesive when combined without editing.
- Consumers own and can modify all installed source.
- Visual comparison at desktop and mobile widths becomes a release gate.
- Existing token-based sections require new versions and are not silently rewritten in consumer projects.
