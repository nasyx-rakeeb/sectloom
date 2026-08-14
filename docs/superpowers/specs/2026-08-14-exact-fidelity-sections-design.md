# Exact-Fidelity Sections Design

**Date:** 2026-08-14  
**Status:** Approved for implementation planning

## Summary

Sectloom will distribute React sections that reproduce their visual references as closely as practical. The installed source code, rather than a shared Sectloom theme, is the product. A section's default rendering must preserve the reference's colors, typography, spacing, radii, shadows, imagery, responsive composition, and visual effects.

The consumer-facing Sectloom semantic design-token system will be removed. Sectloom will no longer normalize visually distinct references into a shared palette or inject global styling variables into consumer projects.

The public Sectloom website may continue using its own private application theme. That theme is an implementation detail of `apps/web` and must not affect registry sections or installed consumer code.

## Product Contract

Sectloom's primary promise is:

> Install the section you see, with source code you fully own.

Each catalog preview represents the default appearance of the corresponding installed section. Combining unrelated sections may produce an intentionally heterogeneous page. Sectloom does not automatically restyle sections to make them visually consistent with one another or with the consumer's existing application.

Users may edit all installed code. Typed props make common content changes convenient, but customization must not require a Sectloom runtime, theme provider, or token package.

## Styling Contract

### Tailwind-first exact styling

Sections use Tailwind CSS utilities for styling wherever those utilities can express the reference accurately. Exact and arbitrary values are allowed, including values such as `bg-[#080808]`, custom grid definitions, precise shadows, unusual radii, and reference-specific spacing.

The following old restrictions are removed:

- Sections do not have to use shared semantic color utilities.
- Hardcoded color values are not forbidden.
- Reference-specific typography, spacing, radii, and shadows are not normalized.
- Sections do not automatically support light and dark themes unless both states are part of the source design.

### Colocated supporting files

A registry section may contain multiple files when exact reproduction requires them. Supporting files may include scoped CSS, interactive leaf components, local utilities, and static assets. Tailwind remains the default styling mechanism; colocated CSS is reserved for effects that are substantially clearer or more accurate in CSS, such as complex keyframes, pseudo-elements, masks, or advanced selectors.

Supporting styles must remain section-scoped and must not mutate consumer-wide element defaults. A section must not install generic global selectors such as unscoped `h1`, `button`, or `body` rules.

### No replacement token layer

Sectloom will not replace the removed global token system with per-section semantic themes. Ordinary local CSS custom properties are permitted only when they are an implementation detail needed to reproduce a specific section, such as driving an animation or avoiding repetition in a complex effect. They are not part of a public Sectloom theming API.

## Component Authoring Contract

Every production section must:

- Match its approved desktop and mobile visual references as closely as practical.
- Use strict TypeScript and expose typed props for meaningful content such as text, links, images, lists, and actions.
- Render the reference content and composition by default so the installed section matches its catalog preview without initial configuration.
- Remain a React Server Component by default, extracting browser-dependent interactions into focused client components.
- Be responsive and accessible without sacrificing defining visual characteristics.
- Declare all external package and registry dependencies.
- Avoid global CSS side effects and undocumented dependencies on the Sectloom website.

Visual fidelity takes precedence over cross-catalog stylistic consistency. Accessibility, valid responsive behavior, and functional correctness remain release gates; they are not optional fidelity trade-offs.

## Consumer Installation Flow

### `sectloom init`

`sectloom init` remains part of the product. It will:

1. Detect and validate the supported React, Next.js, TypeScript, and Tailwind environment.
2. Resolve the destination directory and import aliases.
3. Configure the registry endpoint.
4. Create `sectloom.json` for local installation tracking.

It will not read, modify, or require a global stylesheet. It will not inject variables, themes, base styles, or a Sectloom CSS import.

Configuration fields used only by token injection or theme selection will be removed. The CLI will accept existing configuration files containing those obsolete fields, ignore the obsolete values, and omit them the next time it writes the configuration.

### `sectloom add`

`sectloom add <name>` will continue to fetch a validated registry item, install declared dependencies, write all section files, and record the installed version and checksum. Installation must preserve the exact registry source. The current default overwrite behavior remains unchanged.

If a section requires assets, fonts, CSS, or multiple components, those artifacts must be explicit registry files or declared dependencies. Missing files, unsafe target paths, invalid dependency specifiers, and integrity failures remain fatal installation errors.

### `sectloom doctor`

`sectloom doctor` will continue checking framework compatibility, configuration validity, aliases, registry reachability, and installed-section state. It will no longer inspect global CSS for Sectloom variables or token markers.

## Registry Contract

The registry will remove consumer-theme fields that encode the old design system:

- `requiredTokens`
- `tailwind.tokens`

Registry items will continue to contain identity, category, metadata, dependencies, files, source references, preview assets, compatibility requirements, design profiles, versions, and checksums.

Design profiles remain discovery metadata. Terms such as light, dark, minimal, playful, or brutalist describe the source design; they do not trigger runtime transformation.

The registry builder must hash every distributed file deterministically. Multi-file sections must be represented and validated without relying on a shared token stylesheet.

## Repository Changes

Implementation will remove or revise all consumer-facing token-system surfaces:

- Delete the `packages/tokens` workspace package.
- Remove token bundling from the published CLI package.
- Remove CLI token utilities, injection logic, checks, messages, and token-specific tests.
- Remove obsolete token and theme fields from the CLI configuration schema and generated `sectloom.json` files.
- Remove token fields from shared registry contracts and generated artifacts.
- Rewrite the four existing sections to preserve their source-specific styling without Sectloom tokens.
- Regenerate both canonical and web-served registry artifacts.
- Update fixtures to represent a consumer project with no Sectloom global token block.
- Replace the consumer theming documentation with a `/docs/customization` guide about editing owned section source, remove the old navigation entry, and redirect `/docs/theming` to the new route without retaining token-system content.
- Remove `docs/token-contract.md` and retire the token decision in ADR 0002 with a superseding ADR rather than rewriting accepted history.
- Update product, architecture, component contract, AI pipeline, CLI, registry, README, release, and operational documentation.
- Remove token-package references from workspace configuration, dependency metadata, build orchestration, and lockfiles.

Internal semantic styling used solely by the public catalog application's own components is out of scope and remains intact.

## Preview-to-Code Pipeline

The future image-to-code authoring pipeline will receive a source image and category and produce a candidate section plus registry metadata. Its prompt and validation contract will require fidelity to the source rather than translation into Sectloom semantic tokens.

Human review remains mandatory before publication. Reviewers compare the rendered section with its source at required desktop and mobile viewports and verify responsive behavior between those viewports. The reviewed render becomes the authoritative catalog preview for the code being distributed; stale source images must not imply fidelity that the released code does not achieve.

## Compatibility and Release Strategy

Removing global stylesheet mutation makes new installations simpler but changes the appearance and configuration assumptions of existing token-based sections. Because Sectloom is currently pre-1.0, this contract change will be released as `sectloom@0.3.0`.

The migration will not attempt to rewrite consumers' existing global CSS automatically. Previously injected Sectloom token blocks may be shared with user code, and deleting them automatically could break unrelated styling. Documentation will explain how users can identify and manually remove an unused legacy block after upgrading.

Existing installed sections remain user-owned and will not be silently replaced. Re-adding or updating a section may overwrite its local files according to the CLI's existing overwrite contract.

## Error Handling

- Initialization fails without modifying files when project compatibility or destination configuration is invalid.
- Section installation validates the complete registry item before writing any files.
- Registry paths remain constrained to the consumer project and configured component directory.
- Missing content, unsupported file types, invalid dependencies, or checksum mismatches stop installation with an actionable error.
- All registry content, dependency specifiers, and target paths must validate before the first file write. An unexpected operating-system write failure must identify affected paths instead of reporting a false success.
- Exact-fidelity assets that cannot be legally or technically distributed block publication of that section until replaced or explicitly externalized.

## Verification Strategy

### Automated verification

- Contract tests reject removed token fields in newly generated registry artifacts.
- CLI initialization tests prove no global stylesheet is required or modified.
- CLI doctor tests contain no token-system checks.
- CLI add and diff tests cover exact multi-file installation, overwrite behavior, path containment, dependencies, and checksums.
- Registry tests prove deterministic output and checksum stability without token metadata.
- Repository-wide searches detect forbidden legacy package names, token markers, documentation claims, and CLI messages.
- Full build, lint, typecheck, unit tests, integration tests, registry synchronization checks, and package validation pass.
- The packed npm artifact is inspected to confirm no token stylesheet or token utility is shipped.

### Visual and manual verification

- Each initial section is rendered at 1440px desktop and 390px mobile widths.
- The render is compared against its approved reference for layout, color, typography, imagery, spacing, radii, shadows, and responsive composition.
- Each section is installed into a clean fixture project and rendered without a Sectloom token stylesheet.
- The fixture proves that multiple visually different sections can coexist without global selector collisions.
- Keyboard navigation, focus visibility, landmark structure, image alternatives, reduced-motion behavior where relevant, and responsive overflow are reviewed.

## Acceptance Criteria

The migration is complete when:

1. No consumer installation path requires or injects Sectloom semantic tokens.
2. No published registry item declares shared Sectloom token requirements.
3. No distributed section depends on `@sectloom/tokens` or a Sectloom global token block.
4. Consumer-facing documentation consistently promises exact default fidelity and source ownership rather than automatic theming.
5. The four initial sections render without the removed token system and pass automated and manual validation.
6. The public catalog website continues operating with its private application theme isolated from distributed code.
7. `sectloom@0.3.0` packs only the files required for the token-free CLI and passes a clean-project installation smoke test before publication.

## Explicit Non-Goals

- Automatically making arbitrary installed sections look cohesive.
- Applying the consumer's brand or theme to installed sections.
- Providing a runtime Sectloom theme provider.
- Shipping a replacement global design-token package.
- Automatically deleting previously injected CSS from consumer projects.
- Implementing the deferred image-to-code generation worker as part of this migration.
- Redesigning the public catalog website's private UI theme.
