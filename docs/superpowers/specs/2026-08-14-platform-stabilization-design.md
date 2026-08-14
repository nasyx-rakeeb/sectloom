# Sectloom Platform Stabilization Design

**Date:** 2026-08-14
**Status:** Approved for implementation

## Objective

Stabilize the existing Sectloom platform before its planned product pivot. This work fixes seven known integrity, validation, CLI, token, and rendering issues without expanding the catalog, changing the product model, or upgrading the framework stack.

Sectloom remains a source-distribution platform: canonical React sections are converted into a static registry, the website presents that registry, and the CLI installs editable source into consumer projects.

## Scope

The stabilization covers:

1. Atomic registry generation and synchronization with the web application.
2. Working validation, typecheck, lint, and test gates.
3. Correct CLI project compatibility detection and alias resolution.
4. Hardened CLI filesystem and process execution while preserving default overwrites.
5. A single authoritative CLI version.
6. A single authoritative semantic-token stylesheet.
7. Deterministic server rendering for the CTA section.

The work does not include a Next.js upgrade, visual redesign, new sections, AI generation, registry API redesign, authentication, billing, or changes related to the future pivot.

## Design Decisions

### 1. Registry preparation and web synchronization

`packages/components/src` and `packages/registry/src/metadata.ts` remain the human-authored sources of truth. `packages/registry/public` remains the canonical generated registry output.

A repository-owned preparation script will:

1. Generate the canonical registry.
2. Produce Prettier-compatible JSON with trailing newlines.
3. Remove stale generated component JSON that no longer exists in metadata.
4. Synchronize the complete JSON set into `apps/web/public/registry`.
5. Verify that both locations match byte-for-byte.

The web production build will invoke this preparation path before `next build`. The root build will therefore never compile the catalog against an older registry snapshot. The same script will be directly testable and usable in CI.

The generated index will retain deterministic key ordering and SHA-256 behavior. Formatting changes must not alter registry checksums because checksums are calculated from the normalized registry object and component source, not from the pretty-printed artifact bytes.

### 2. Validation and build gates

The outdated registry fixture will be migrated to the current schema, including `category` and file `path` fields. Contract fixture validation will become part of the normal test task.

Every code-bearing workspace will expose the relevant `build`, `lint`, `typecheck`, and `test` commands. The root will expose a test command through Turborepo. The web workspace will gain an explicit TypeScript check instead of being silently skipped.

The web app's obsolete `.eslintrc.json` will be removed so Next.js and repository linting do not resolve two incompatible ESLint systems. The flat repository configuration will remain authoritative and will include the applicable Next.js rules in a form compatible with the installed versions. A production build must not emit an ESLint configuration error.

Tests will use lightweight repository tooling and focus on behavior rather than implementation details.

### 3. CLI compatibility and destination resolution

Project detection will parse installed dependency ranges instead of searching for version substrings. It must correctly recognize common forms including `4`, `^4`, `~4.1.0`, exact versions, prereleases, workspace protocols, and npm aliases where a reliable major version can be extracted.

Sectloom initialization will require:

- Next.js 14 or newer.
- App Router.
- TypeScript.
- Tailwind CSS 4.

Unsupported or unrecognized required versions will fail with an actionable message rather than continuing with a warning. `doctor` will report failures consistently and set a non-zero exit status when required compatibility checks fail.

Component destinations will be resolved from `sectloom.json` and the matching `tsconfig.json` path mapping. For example, a configured `@/ui` alias mapped to `./src/ui/*` will install Sectloom components below `src/ui/sectloom`. The current `src/components` heuristic will remain only as a fallback for the default alias when no usable path mapping exists.

### 4. CLI filesystem and dependency safety

Overwriting is intentional product behavior. `sectloom add` will overwrite an existing target file by default in interactive and non-interactive operation. It will not prompt for overwrite confirmation. `--dry-run` will remain strictly non-writing and will not install dependencies or update configuration.

Filesystem containment will use resolved relative-path checks instead of string-prefix checks. A valid target must resolve to the project root itself or a descendant, never a sibling with a shared path prefix. The same rule will protect global CSS paths, registry source paths, and installed component destinations.

Registry component names will be constrained to the supported slug format before being interpolated into request URLs. Registry URLs will be parsed with the platform URL implementation.

Dependency installation will use `spawnSync` or an equivalent argument-array API with `shell: false`. Dependency specifiers will be validated before invocation. No registry-controlled string will be concatenated into a shell command.

Checksum and Zod validation remain mandatory before any dependency installation or filesystem write. Failed validation leaves the project unchanged.

### 5. CLI version authority

`packages/cli/package.json` is the only version authority. The CLI program will read or receive that version during its build instead of hardcoding a second value. `sectloom --version`, the package manifest, and the packed artifact must agree.

### 6. Token authority and packaging

`packages/tokens/tokens.css` becomes the only semantic-token definition. The duplicate `DEFAULT_CSS_VARS` string will be removed from the CLI.

The CLI build will copy the canonical stylesheet into its published `dist` directory. At runtime, `sectloom init` will read that packaged asset and append it only when the required Sectloom token marker is absent. The npm package will continue publishing only `dist`, which will now contain both the executable bundle and the token stylesheet.

Initialization must remain idempotent: running it repeatedly cannot duplicate the token block. Existing unrelated CSS must be preserved exactly apart from the deliberate appended block.

### 7. Deterministic CTA rendering

`CtaApis` will replace render-time `Math.random()` calls with a deterministic sequence derived from each element index. The visual retains varied dot opacity and scale while producing identical markup for identical props across server renders and builds.

The component remains a React Server Component with no client boundary added.

## Test Strategy

Targeted automated coverage will include:

- Current valid and invalid registry schema fixtures.
- Repeat registry builds producing identical artifacts.
- Removal of stale registry JSON and exact web synchronization.
- Metadata and per-file checksum corruption rejection.
- Tailwind and Next.js major-version detection across supported range formats.
- Failure for unsupported and unrecognized required versions.
- Custom TypeScript alias resolution.
- Rejection of absolute paths, traversal paths, and shared-prefix sibling paths.
- Registry component slug validation.
- Dependency execution as an argument array without a shell.
- Default overwrite behavior and strict dry-run behavior.
- CLI version agreement with `package.json`.
- Token asset identity and initialization idempotency.
- Identical CTA markup across repeated server renders.

Final verification will run formatting, lint, typecheck, all tests, registry preparation, the production monorepo build, and `git diff --check`. The build output must contain no ESLint configuration failure. The final working-tree review will distinguish the user's pre-existing deletions from stabilization changes.

## Error Handling and Atomicity

Validation happens before mutations wherever practical. Registry synchronization writes complete files and removes only JSON files inside the two exact generated registry directories. CLI installation validates all targets and registry content before dependency installation or source writes.

If a multi-file component cannot be fully validated, no component files are written. If dependency installation fails, component files and `sectloom.json` are not updated. Existing target files are overwritten only after all pre-write validation succeeds.

## Acceptance Criteria

The stabilization is complete when:

- All seven issue areas are implemented and covered by regression tests.
- Root format, lint, typecheck, test, and production build commands pass.
- Direct web builds prepare and consume the current registry.
- Registry outputs are deterministic, synchronized, and formatting-clean.
- The CLI reports the release version from its package authority.
- The Next.js 16/Tailwind 4 fixture is detected correctly.
- Custom aliases install to their configured physical directory.
- Malicious paths and dependency strings cannot escape containment or reach a shell.
- Existing components overwrite by default, while dry runs make no changes.
- Repeated initialization does not duplicate tokens.
- Repeated CTA server renders are identical.
