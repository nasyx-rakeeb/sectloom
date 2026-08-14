# Exact-Fidelity Sections Implementation Plan

**Design:** `docs/superpowers/specs/2026-08-14-exact-fidelity-sections-design.md`  
**Target CLI release:** `sectloom@0.3.0`

## Outcome

Remove the consumer-facing Sectloom semantic-token system and make each distributed section render with reference-specific styling. Preserve the public website's private application theme. Do not publish or tag `0.3.0` until automated checks, clean-fixture installation, package inspection, and desktop/mobile visual review pass.

## Working Rules

- Preserve the user's existing deletions of `PROMPTS.md` and `docs/backlog.md`.
- Write or update a failing test before each behavioral change.
- Keep generated registry copies synchronized; never hand-edit generated JSON as the source of truth.
- Treat every visible part of a section's approved preview as the fidelity target unless the registry metadata explicitly defines a narrower crop.
- Do not introduce a replacement global theme, section theme provider, or public token API.
- Commit each independently validated task so regressions can be isolated.

## Task 1: Establish token-removal regression tests

**Modify:**

- `packages/cli/test/init.integration.test.ts`
- `packages/cli/test/add.integration.test.ts`
- `packages/registry/test/build.test.ts`
- `apps/web/test/registry-sync.test.mjs`
- `scripts/sync-registry.test.mjs`

**Delete after replacement coverage exists:**

- `packages/cli/test/tokens-version.test.ts`

### Steps

1. Change the init fixture so a compatible project can omit `globals.css` entirely.
2. Assert `sectloom init --yes` succeeds without creating or modifying a stylesheet.
3. Assert newly written `sectloom.json` has only the registry, alias, and installed-component fields required by the new contract.
4. Add a legacy-config test proving obsolete `style` and `tailwind` fields are accepted, ignored, and removed on the next CLI write.
5. Add registry tests asserting generated items do not contain `requiredTokens` or `tailwind.tokens`.
6. Extend add coverage with a multi-file registry item and verify all targets are validated before the first write.
7. Run the focused tests and record the expected failures before production changes:

```bash
pnpm --filter sectloom test
pnpm --filter @sectloom/registry test
pnpm test
```

## Task 2: Remove tokens from contracts and registry metadata

**Modify:**

- `packages/contracts/src/registry.ts`
- `packages/registry/src/metadata.ts`
- `packages/registry/src/build.ts`
- `apps/web/src/lib/registry/data.ts`
- `apps/web/src/app/components/[category]/[component]/page.tsx`
- `packages/contracts/test/fixtures/valid-component.json`
- `packages/contracts/test/fixtures/invalid-component.json` if it contains legacy fields

### Steps

1. Remove `requiredTokens` and the optional `tailwind.tokens` object from `RegistryItemSchema`.
2. Make newly generated registry objects reject or explicitly omit those legacy fields rather than silently publishing them.
3. Remove `requiredTokens` from registry metadata types and all four metadata records.
4. Remove token forwarding from the deterministic registry builder.
5. Remove the “Required tokens” block from component detail pages and their local data type.
6. Keep `designProfiles` as descriptive catalog metadata only.
7. Run contract, registry, and web type checks before proceeding.

## Task 3: Simplify CLI initialization and configuration

**Modify:**

- `packages/cli/src/commands/init.ts`
- `packages/cli/src/commands/doctor.ts`
- `packages/cli/src/utils/config.ts`
- `packages/cli/src/utils/project.ts` only where global CSS discovery exists solely for Sectloom tokens
- `packages/cli/test/project.test.ts`
- `packages/cli/test/init.integration.test.ts`
- `packages/cli/test/add.integration.test.ts`
- `fixtures/next-app/sectloom.json`

**Delete:**

- `packages/cli/src/utils/tokens.ts`
- `packages/cli/scripts/copy-tokens.mjs`

### Steps

1. Remove global stylesheet prompts, reads, writes, and token messages from `init`.
2. Reduce `ConfigSchema` to registry URL, component alias, optional utilities alias, and installed-component records. Parse legacy `style` and `tailwind` keys without depending on them; omit them whenever config is written.
3. Preserve the existing registry URL and installed-component state when reinitializing.
4. Keep project detection focused on Next.js App Router, React, TypeScript, Tailwind v4, package manager, and aliases.
5. Remove the global-CSS success/warning output from `doctor`.
6. Remove the CLI build's token-copy step while keeping the executable bundle and published file allowlist intact.
7. Confirm all CLI integration tests pass and `init` leaves a fixture stylesheet byte-for-byte unchanged when one happens to exist.

## Task 4: Rebuild the four canonical sections for fidelity

**Modify:**

- `packages/components/src/sections/hero/hero-efficiency.tsx`
- `packages/components/src/sections/cta/cta-apis.tsx`
- `packages/components/src/sections/contact/contact-grid.tsx`
- `packages/components/src/sections/footer/footer-products.tsx`
- `packages/components/test/cta-apis.test.tsx`
- Add focused tests for the hero, contact, and footer
- Add colocated section files only when required for accurate effects or assets

### Shared steps

1. Inspect each source image at original resolution and define the section boundary, desktop geometry, visual palette, type scale, spacing, imagery, and interactive states.
2. Replace shared semantic utilities and container/radius variables with exact reference-specific Tailwind values.
3. Preserve typed content props and reference-matching defaults.
4. Add accessible focus states whose appearance fits the section instead of depending on `ring-ring`.
5. Keep sections server-rendered unless a focused interactive leaf genuinely needs a client boundary.
6. Test stable structure, default content, optional-content behavior, and absence of old semantic utility dependencies.

### Hero fidelity target

Use `data/images/hero/001_1inch_efficiency_hero_design.jpg` as the source. Preserve the black canvas, oversized centered white headline, subdued overline, contrasting pill actions, generous vertical space, and bottom three-column statistics. Do not import the source site's navbar or following section into the hero unless the registry preview is deliberately changed to include them.

### CTA fidelity target

Use `data/images/cta/001_1inch_apis_cta_design.jpg` as the source. Preserve the vivid blue panel, black surrounding canvas where it is part of the section, left-aligned headline/button hierarchy, and the large white dotted illustration. Replace the current generic animated icon grid with an accurate, distributable implementation such as scoped CSS/SVG geometry; do not copy a protected brand asset unless its distribution rights are confirmed.

### Contact fidelity target

Use `data/images/contact/002_after_now_contact_grid_design.jpg` as the source. The canonical contact section boundary is the black contact area beginning with “The best work begins with the right introduction”; the preceding photographic banner is excluded because it belongs to the adjacent page section. Preserve the asymmetric two-column layout, muted olive-gray cards, compact pill actions, fine dividers, and dense vertical rhythm.

### Footer fidelity target

Use `data/images/footer/002_1inch_products_footer_design.jpg` as the source. Preserve the black canvas, oversized left wordmark treatment using configurable text rather than a copied logo asset, descriptive/certification copy, white enterprise pill, stepped social grid, dense product and chain columns, separators, and bottom legal row.

## Task 5: Regenerate and verify registry artifacts

**Modify through generation:**

- `packages/registry/public/index.json`
- `packages/registry/public/hero-efficiency.json`
- `packages/registry/public/cta-apis.json`
- `packages/registry/public/contact-grid.json`
- `packages/registry/public/footer-products.json`
- `apps/web/public/registry/index.json`
- `apps/web/public/registry/hero-efficiency.json`
- `apps/web/public/registry/cta-apis.json`
- `apps/web/public/registry/contact-grid.json`
- `apps/web/public/registry/footer-products.json`
- `fixtures/next-app/src/components/sectloom/*`

### Steps

1. Build the canonical registry and synchronize the web-served copy using `pnpm registry:prepare`.
2. Run synchronization tests and prove the two registry trees match byte-for-byte.
3. Install all four sections into the clean fixture using the built CLI rather than copying files manually.
4. Verify the installed fixture has no Sectloom token block and no dependency on `@sectloom/tokens`.
5. Run `sectloom diff` against each installed section and confirm no unexpected drift.

## Task 6: Remove the token workspace and dependency graph

**Delete:**

- `packages/tokens/package.json`
- `packages/tokens/tokens.css`

**Modify:**

- `packages/cli/package.json`
- `apps/web/package.json`
- `apps/web/next.config.mjs`
- `pnpm-lock.yaml`
- `README.md`
- Any workspace or build metadata discovered by a final dependency search

### Steps

1. Remove the token copy command from the CLI build.
2. Remove `@sectloom/tokens` from web dependencies and Next.js transpilation.
3. Remove the empty package directory after tracked files are deleted.
4. Run `pnpm install --lockfile-only` to update the lockfile mechanically.
5. Run `pnpm --filter sectloom exec npm pack --dry-run` and prove the package contains no `tokens.css`, token utility, or copy script.

## Task 7: Replace active product and user documentation

**Modify:**

- `README.md`
- `packages/cli/README.md`
- `docs/product.md`
- `docs/architecture.md`
- `docs/component-contract.md`
- `docs/ai-pipeline-handoff.md`
- `docs/cli.md`
- `docs/registry.md`
- `docs/initial-components.md`
- `docs/operations.md`
- `docs/cli-release-notes.md`
- `apps/web/src/lib/navigation/docs-nav.ts`
- All active web documentation pages that promise automatic theming

**Add:**

- `docs/adr/0004-exact-fidelity-section-contract.md`
- `apps/web/src/app/docs/customization/page.tsx`

**Delete:**

- `docs/token-contract.md`

**Replace:**

- `apps/web/src/app/docs/theming/page.tsx` with a redirect to `/docs/customization`

### Steps

1. Replace active claims about theme adoption with the exact-fidelity and source-ownership promise.
2. Document arbitrary Tailwind values, typed content props, multi-file sections, direct source editing, and the lack of automatic cross-section cohesion.
3. Mark ADR 0002 as superseded by ADR 0004 without falsifying its historical decision record.
4. Mark research and prior stabilization documents containing old token decisions as historical/superseded where they could be mistaken for current instructions; do not use them as active implementation guidance.
5. Replace the web docs navigation label and URL, update metadata and structured data, and verify no active link points to removed token documentation.

## Task 8: Full validation and false-pass checks

### Automated suite

Run from the repository root:

```bash
pnpm install --lockfile-only
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm registry:prepare
git diff --check
```

Run targeted absence checks, excluding historical design/ADR records that intentionally describe the removed decision:

```bash
rg -n "@sectloom/tokens|sectloom:tokens|requiredTokens|tailwind\.tokens|hasSectloomTokens|loadTokenStylesheet|appendTokenStylesheet" packages apps fixtures README.md docs --glob '!docs/superpowers/**' --glob '!docs/adr/0002-component-and-token-contracts.md' --glob '!docs/research/**'
rg -n "bg-background|text-foreground|text-muted-foreground|bg-primary|text-primary-foreground|var\(--container|var\(--radius" packages/components packages/registry/public apps/web/public/registry fixtures/next-app/src/components/sectloom
```

Both searches must return no consumer-facing legacy dependency. A passing build alone is a false pass if generated JSON, the npm tarball, the fixture, active documentation, or installed source still contains the old contract.

### Clean-install sabotage checks

1. Delete Sectloom token definitions from a disposable fixture before installation; all four sections must still render.
2. Give the fixture conflicting `--primary`, `--background`, `--radius`, and `--container-xl` values; installed sections must remain visually unchanged.
3. Attempt a registry file path escape and an invalid dependency specifier; installation must fail before writing section files.
4. Alter one registry file after hashing; integrity validation must reject it.
5. Re-run `init` against a project with user-authored global CSS and prove its hash is unchanged.

### Visual validation

1. Render each installed section at 1440px and 390px in the clean fixture.
2. Capture full-resolution screenshots and compare them side-by-side with the approved source references.
3. Record discrepancies in layout, type scale, color, spacing, imagery, radii, shadows, overflow, and responsive composition; fix material differences before release.
4. Exercise keyboard navigation and reduced-motion behavior and check for horizontal overflow at intermediate widths.
5. Treat “looks reasonable” as a false pass: the default render must be recognizably the catalog preview, not a generic reinterpretation.

## Task 9: Prepare, but do not automatically publish, `0.3.0`

**Modify:**

- `packages/cli/package.json`
- `pnpm-lock.yaml`
- Release notes and any version assertions

### Steps

1. Bump the CLI from `0.2.1` to `0.3.0` after all implementation and validation tasks pass.
2. Build and inspect the publish artifact:

```bash
pnpm --filter sectloom build
cd packages/cli
npm pack --dry-run
```

3. Confirm the tarball contains only the license, README, package metadata, and required CLI bundle files.
4. Commit the completed migration and push only when explicitly requested or already authorized for the implementation handoff.
5. Publish `sectloom@0.3.0`, verify the public registry metadata, and create/push `v0.3.0` only with explicit release authorization and working npm authentication.

## Completion Evidence

The implementation handoff must report:

- Commits created and files changed/deleted.
- Raw results of the full validation suite and targeted absence searches.
- Clean-fixture installation and sabotage-test outcomes.
- Visual-validation screenshots or an explicit statement that native/browser visual review remains outstanding.
- npm tarball contents and version.
- Whether `0.3.0` was committed, pushed, published, and tagged.
- Confirmation that `PROMPTS.md` and `docs/backlog.md` were not included in any commit unless separately authorized.
