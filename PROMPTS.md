# Production Platform Development Prompts

## How to use this file

This file replaces every previous development plan. The earlier AI-generation-first plan is abandoned and must not be followed.

Run exactly one phase at a time in an AI coding agent whose working directory is:

```text
/Users/nasyxrakeeb/Development/Platform
```

After each phase:

1. Read the agent's summary and inspect the diff.
2. Confirm all required validation commands passed.
3. Confirm the phase was committed.
4. Only then run the next phase.

Do not give the agent the entire file as one implementation request. Each phase is intentionally self-contained and repeats the project context and expected existing state so the agent does not invent missing requirements.

---

# Product context and fixed decisions

## What we are building

We are building a production-ready section UI distribution platform for React applications. It has three customer-facing systems:

1. **Component registry** — a publicly hosted, versioned source of truth containing raw TSX files, metadata, dependencies, semantic-token requirements, preview assets, and integrity hashes.
2. **Published npm CLI** — users run commands such as `npx <cli-name> init` and `npx <cli-name> add <component-name>` to install editable source code into their own projects.
3. **Public website** — users browse components, inspect responsive previews and documentation, and copy installation commands.

The initial catalog contains exactly four manually crafted, production-quality sections:

- One Hero
- One CTA
- One Contact section
- One Footer

These four components are the initial production catalog, not temporary mock components. The registry, CLI, and website must be architecturally complete and ready to accept more components without redesign.

## Supported consumer projects

The CLI initially supports only:

- Next.js App Router + TypeScript + Tailwind CSS v4
- npm, pnpm, Yarn, and Bun where reliable detection is possible

Initial components are designed specifically for Next.js App Router projects. Use supported Next.js APIs such as `next/image` and `next/link` when they materially improve the component. Keep components as Server Components by default and add `"use client"` only when genuine client-side React behavior is required.

## Styling and component rules

- Strict TypeScript and TSX only
- React components distributed as editable source code
- Tailwind CSS v4 only for the initial supported release
- Semantic CSS variables and utilities instead of fixed brand colors
- `.dark` variable overrides; no component-level `dark:` color utilities
- No hardcoded hexadecimal, RGB, HSL, or named brand colors in distributed components
- Typed content props rather than hardcoded customer-specific copy
- Responsive behavior at mobile, tablet, and desktop widths
- Accessible HTML, keyboard behavior, focus states, and image alt text
- Allowed runtime dependencies must be explicit and minimal
- Initial preferred optional dependencies: `lucide-react` for icons and the current official Motion React package only when animation materially improves a component
- Components must work after installation without requiring the platform website at runtime

## Dataset context

Only the `data` directory currently exists. It contains source manifests and local images for these categories:

```text
data/
  blog-header-section.json
  blog-section.json
  contact.json
  cta.json
  faq.json
  feature.json
  footer.json
  hero.json
  logo-section.json
  navbar.json
  portfolio.json
  pricing.json
  team.json
  testimonial.json
  images/
    blog-header-section/
    blog-section/
    contact/
    cta/
    faq/
    feature/
    footer/
    hero/
    logo-section/
    navbar/
    portfolio/
    pricing/
    team/
    testimonial/
```

The data and images are design references. For the first release, select one suitable reference each from Hero, CTA, Contact, and Footer, then manually craft the corresponding components. Do not build an AI generation pipeline during this plan.

## Deferred system

The internal image-to-code AI pipeline is explicitly deferred until after the registry, CLI, website, deployment, and npm release are complete. Do not add model SDKs, prompts, LangGraph, visual critics, generation jobs, or local-gateway code in any phase below.

---

# Global execution rules

Every phase must follow all of these rules:

1. Work only inside `/Users/nasyxrakeeb/Development/Platform`.
2. Inspect the real filesystem, Git state, package manifests, and existing implementation before editing. The “what exists” section in a prompt is an expected state, not permission to ignore reality.
3. If reality differs from the expected state, stop and explain the difference before making destructive or architectural changes.
4. Research current official documentation before implementing each phase. Do not rely on model training memory, stale snippets, guessed package APIs, or unofficial tutorials when primary documentation exists.
5. Record concise research notes, URLs, versions, and decisions in `docs/research/phase-XX.md`.
6. Never invent the product name, npm package name, CLI executable, public domain, registry URL, deployment provider account, or credentials. If a required final value has not been documented, ask the user before using it.
7. Reuse and extend sound existing code. Do not recreate functionality that already exists.
8. Prefer maintained, free, open-source libraries when they genuinely improve correctness, security, or delivery speed. Verify official API, license, compatibility, and maintenance before adding one.
9. Keep the codebase clean, modular, maintainable, and scalable. Avoid god files, duplicate schemas, circular dependencies, hidden global state, unnecessary wrappers, premature abstractions, and speculative features.
10. Use strict TypeScript. Avoid `any`, `@ts-ignore`, disabled checks, unsafe casts, non-null assertions without proof, and swallowed errors.
11. Validate all untrusted JSON, registry responses, filesystem paths, package manifests, command arguments, and network responses at runtime.
12. Prevent path traversal, symlink escape, shell injection, partial writes, silent overwrites, and unintended edits outside the target project.
13. Keep secrets out of source control and logs. Maintain `.env.example` when environment variables are needed.
14. Make registry builds and CLI operations deterministic and idempotent wherever possible.
15. Do not create unit, integration, end-to-end, snapshot, or CI test suites. Use focused validation commands, clean fixture projects, typechecking, builds, and manual inspection instead.
16. Do not add GitHub Actions or any other CI configuration.
17. Before completing a phase, run formatting checks, linting, strict typechecking, relevant validation commands, and production builds. Fix root causes rather than weakening rules.
18. Inspect `git status` and `git diff`. Stage only phase-related files. Never commit dependencies, caches, secrets, temporary tarballs, deployment output, or unrelated changes.
19. Commit only after all phase acceptance criteria pass, using the requested Conventional Commit message. Do not push unless a later phase explicitly asks and the user confirms.
20. Report changed areas, validation commands and results, commit hash, decisions made, and unresolved risks.
21. Stay within phase scope. Record future work in `docs/backlog.md` instead of implementing later phases early.
22. Never claim success without executing the required commands. If blocked, leave the repository valid and reviewable, do not create a success commit, and state the exact blocker.

---

# Intended production architecture

```text
packages/components  -----> packages/registry -----> public registry routes
       |                         |                         |
       |                         |                         +----> npm CLI
       |                         |                         |
       +-------------------------+-------------------------+----> website

Consumer project:
public registry -> published CLI -> local TSX + semantic tokens + dependencies
```

Expected monorepo direction:

```text
apps/
  web/             Public Next.js website and public registry delivery
packages/
  components/      Canonical source for the four manually crafted sections
  contracts/       Runtime schemas and shared types
  tokens/          Tailwind v4 semantic token contract
  registry/        Deterministic registry builder and generated artifacts
  cli/             Published npm CLI
fixtures/
  next-app/        Disposable/manual Next.js compatibility project or creation script
data/               Existing source manifests and images
docs/
```

The agent may refine folder names when official documentation or existing code justifies it, but must document the decision and preserve these boundaries.

---

# Phase 01 — Product decisions, repository foundation, and data inventory

```text
Implement Phase 01 only.

PROJECT CONTEXT
We are building a production-ready React section library distributed through a public registry, a published npm CLI, and a public website. The initial production catalog will contain four manually crafted sections: Hero, CTA, Contact, and Footer. The CLI will initially support only Next.js App Router + TypeScript + Tailwind CSS v4. The future AI generation pipeline is out of scope.

WHAT EXISTS BEFORE THIS PHASE
The Platform directory was reset. Only `data/` should exist, containing JSON manifests and local image directories for Hero, CTA, Contact, Footer, and other future categories. Assume no valid application code, package workspace, or Git repository exists until filesystem inspection proves otherwise.

FIRST ACTIONS
- Inspect the complete directory and report what actually exists.
- Inspect representative records from `data/hero.json`, `data/cta.json`, `data/contact.json`, and `data/footer.json`, plus their image directories.
- Determine whether Git metadata exists.
- Read the Global execution rules in PROMPTS.md.
- Before scaffolding, ask the user for any missing irreversible public naming decisions: product/brand name, desired npm package name, CLI executable command, and intended public domain or temporary registry base URL. Do not invent them. If the user wants naming deferred, use clearly marked internal workspace package names that cannot accidentally be published and document the deferred decision.

RESEARCH
Research current official pnpm workspace, Turborepo, Node.js, TypeScript, ESLint, Prettier, Next.js monorepo, and package-management documentation. Record sources and decisions in `docs/research/phase-01.md`.

IMPLEMENTATION
- Initialize Git on an appropriate default branch if it does not exist.
- Create a pnpm workspace and Turborepo configuration using current official syntax.
- Pin/document a supported Node version compatible with current Next.js and selected tooling.
- Create only the monorepo skeleton and shared engineering configuration needed by later phases.
- Configure strict TypeScript, current ESLint, Prettier, EditorConfig, package scripts, and `.gitignore`.
- Add `README.md`, `docs/product.md`, `docs/architecture.md`, `docs/backlog.md`, and an architecture decision record for the monorepo.
- Create a read-only data inventory command that validates the four relevant manifests, reports record counts, verifies local image directories/files, and produces `docs/data-inventory.md`. Do not rewrite or rename source data or images.
- Document all category names found, but do not implement components or registry entries.
- Create package/app directories only as empty documented boundaries if helpful; do not scaffold the Next.js app or CLI yet.

VALIDATION
Run install, format check, lint, typecheck, data inventory validation, and any applicable root build command. There must be no testing or CI setup.

ACCEPTANCE CRITERIA
- Git and the monorepo foundation are valid.
- Raw data remains unchanged.
- The four target manifests and image directories are inventoried.
- Public naming decisions are documented rather than guessed.
- All validation commands pass.
- Commit with: `chore: initialize production platform workspace`.

Do not build tokens, components, registry, CLI, website, deployment, or AI functionality.
```

---

# Phase 02 — Contracts, semantic tokens, and component standard

```text
Implement Phase 02 only.

PROJECT CONTEXT
This platform distributes production-ready React section source code through a registry and npm CLI, with a website for discovery. The first catalog contains one manually crafted Hero, CTA, Contact section, and Footer. Consumer support is initially limited to Next.js App Router projects using TypeScript and Tailwind CSS v4. AI generation is deferred.

WHAT EXISTS BEFORE THIS PHASE
Phase 01 should have created a Git-backed pnpm/Turborepo workspace, strict TypeScript/lint/format configuration, product and architecture documentation, and a read-only inventory of the existing data. No production components, registry, CLI, or website should exist yet. Public naming decisions should be recorded or explicitly deferred.

FIRST ACTIONS
- Verify Phase 01 files, commit, validation commands, and real repository state.
- Read `docs/product.md`, `docs/architecture.md`, `docs/data-inventory.md`, decision records, and Phase 01 research.
- If required Phase 01 artifacts are absent or inconsistent, stop rather than silently recreating them.

RESEARCH
Research current official React, TypeScript, Tailwind CSS v4 theme-variable and framework installation, accessibility, Zod, and shadcn registry-schema documentation. We are not required to clone shadcn's schema, but should learn from its code-distribution model. Record sources and decisions in `docs/research/phase-02.md`.

IMPLEMENTATION
- Create `packages/contracts` as the runtime-validated source of truth for component metadata, registry metadata, component files, dependencies, semantic tokens, design profiles, versions, preview assets, and checksums.
- Use a maintained runtime schema library such as Zod if current research confirms suitability. Infer TypeScript types from schemas rather than duplicating interfaces.
- Create `packages/tokens` with a complete Tailwind CSS v4 semantic token contract: background/foreground, card, popover, primary, secondary, muted, accent, destructive, border, input, ring, radii, container width, section spacing, shadows, and typography roles.
- Provide `:root` and `.dark` values plus current Tailwind v4 `@theme` or `@theme inline` mapping based on official docs.
- Define the production component contract: naming, directories, exports, props, actions/links, image props, accessibility, responsive behavior, dependency policy, server/client compatibility, and forbidden styling patterns.
- Define how interactive components use `"use client"` without making static sections client components unnecessarily.
- Define a broad design-profile schema so future components can be filtered and compatibility-scored without changing registry architecture.
- Add validation commands with valid and invalid fixture documents. Do not create a test suite.
- Document everything in `docs/component-contract.md`, `docs/token-contract.md`, and an architecture decision record.

VALIDATION
Run format check, lint, strict typecheck, package builds, schema fixture validation, and CSS/build validation. Manually inspect generated token CSS for valid light and dark mappings.

ACCEPTANCE CRITERIA
- Contracts have explicit public exports and runtime validation.
- The token package works with Tailwind CSS v4 syntax and does not require component-level `dark:` color utilities.
- The component standard is precise enough that future manual or AI-authored components use the same contract.
- No production component or registry entry is created yet.
- All validation commands pass.
- Commit with: `feat: define component and theme contracts`.

Do not build the four components, registry, CLI, website, or AI pipeline.
```

---

# Phase 03 — Manually craft the four production components

```text
Implement Phase 03 only.

PROJECT CONTEXT
We are building a production-complete registry, npm CLI, and website for editable React section code. The initial catalog consists of four real components: one Hero, one CTA, one Contact section, and one Footer. They are manually crafted from local design references because the AI image-to-code pipeline is deferred.

WHAT EXISTS BEFORE THIS PHASE
The repository should contain the production workspace, data inventory, runtime contracts, semantic Tailwind v4 tokens, and documented component standard. There should be no registry publication, CLI, or website. No production section should exist except any explicitly labeled validation fixture from Phase 02.

FIRST ACTIONS
- Verify Phase 01-02 state and read all product, architecture, token, and component-contract documents.
- Inspect the real Hero, CTA, Contact, and Footer manifests and local reference images.
- Select one strong reference from each category. Do not choose based only on filename; inspect the actual images.
- Record the four selected source IDs, titles, local paths, dimensions, and selection rationale in `docs/initial-components.md` before coding.
- Do not copy brand logos, proprietary copy, or source-company names into reusable default content. Preserve the design composition while using neutral replaceable content and assets.

RESEARCH
Research current official React component patterns, responsive image guidance, accessible form/link/button semantics, Tailwind CSS v4, Lucide React, and Motion React documentation only if Motion is genuinely needed. Record sources in `docs/research/phase-03.md`.

IMPLEMENTATION
- Create `packages/components` as the canonical source for production registry components.
- Manually craft exactly four components with stable names approved by the documented naming convention.
- Each component must export its prop types and component through explicit entry points.
- Every visible content value that a consumer reasonably changes must be represented by clean typed props with sensible defaults or examples.
- Use semantic tokens for brand-dependent styling while preserving the selected reference's structure, hierarchy, spacing, layout, and overall design quality.
- Build components for Next.js App Router. Use `next/image` and `next/link` where appropriate, follow Server/Client Component boundaries, and avoid unnecessary client-side runtime code.
- Use minimal dependencies. Avoid Motion unless the reference clearly needs animation and it can respect reduced motion.
- Contact form behavior must be explicit and safe. Do not pretend to submit to a backend. Support a standard form action or typed callback in a way compatible with the documented server/client boundary.
- Include usage examples and prop documentation for all four components.
- Add a small internal preview surface or build-time showcase only if necessary for visual inspection; it must not become a competing website architecture.
- Render and manually inspect each component at approximately 1440px, 768px, and 390px in light and dark themes. Check overflow, overlap, spacing, image failure behavior, focus states, long text, and mobile stacking.
- Save intentional preview screenshots in a documented location for later registry and website use. Do not retain temporary browser artifacts.

VALIDATION
Run format check, lint, strict typecheck, component builds, policy validation for forbidden colors/imports, and the local preview capture command. Manually inspect every final preview image.

ACCEPTANCE CRITERIA
- Exactly four polished production components exist: Hero, CTA, Contact, and Footer.
- All components comply with contracts and work without Next.js-specific APIs.
- Light, dark, desktop, tablet, and mobile presentations are visually sound.
- Props and usage examples are documented.
- Selected references and decisions are recorded.
- All validation commands pass.
- Commit with: `feat: add initial production sections`.

Do not build the registry, CLI, website, npm release, deployment, or AI pipeline.
```

---

# Phase 04 — Production registry and public delivery format

```text
Implement Phase 04 only.

PROJECT CONTEXT
The product distributes raw React TSX sections. Four manually crafted production components must become installable through a versioned public registry consumed by both the CLI and website. The registry architecture must support hundreds of future manual or AI-generated components without redesign.

WHAT EXISTS BEFORE THIS PHASE
The workspace should contain contracts, tokens, and exactly four production components with documentation and reviewed responsive preview assets. There should be no CLI or public website yet. The four components are the only initial registry candidates.

FIRST ACTIONS
- Verify Phase 01-03 state, commits, component policy, selected references, and preview assets.
- Inspect every production component and its dependencies before defining registry entries.
- Confirm final product name and registry naming decisions from project docs; do not invent missing public names or URLs.

RESEARCH
Research current official shadcn registry specifications and validation behavior, JSON Schema practices, semantic versioning, SHA-256 integrity handling, caching headers, static hosting, and Next.js static/public route delivery. Decide whether to adopt, extend, or use a custom schema. Document the compatibility decision and tradeoffs in `docs/research/phase-04.md` and an architecture decision record.

IMPLEMENTATION
- Create `packages/registry` with source metadata separate from generated public artifacts.
- Define deterministic registry and per-item outputs using Phase 02 contracts.
- Each item must include stable name, version, category, title, description, design profile, source reference metadata, dependencies, registry dependencies if any, required tokens, props documentation, files, preview assets, supported Next.js range, and integrity checksums.
- Include the actual raw TSX content or stable file URLs according to the documented registry design.
- Generate SHA-256 hashes from exact distributed bytes.
- Sort output deterministically and exclude unstable generated timestamps where they would break reproducibility.
- Reject duplicate names, unsafe paths, missing files, invalid dependencies, invalid tokens, checksum mismatch, and schema violations.
- Build a local static registry server or route fixture so later CLI work can consume the registry over HTTP.
- Create registry documentation and a versioning/release workflow.
- Include exactly the four approved components; do not create placeholder entries for other categories.

VALIDATION
Run format check, lint, strict typecheck, package builds, registry build twice and compare deterministic output, schema validation, checksum verification, local HTTP serving, and manual inspection of every public item.

ACCEPTANCE CRITERIA
- The registry is complete, versioned, deterministic, validated, and publicly hostable.
- All four items resolve to correct TSX and preview assets.
- Integrity hashes match exact bytes.
- Adding another valid component later requires new component content and metadata, not architectural changes.
- All validation commands pass.
- Commit with: `feat: build production component registry`.

Do not build the CLI, website UI, deploy publicly, publish npm, or add AI functionality.
```

---

# Phase 05 — Complete CLI foundation and safe installer

```text
Implement Phase 05 only.

PROJECT CONTEXT
Users will install editable React section code from the public registry through a published npm CLI. The CLI must support Next.js App Router projects using TypeScript and Tailwind CSS v4, and must clearly reject unsupported Next.js versions. It must be safe, idempotent, understandable, and suitable for real npm distribution.

WHAT EXISTS BEFORE THIS PHASE
The workspace should contain four production components and a complete deterministic registry with local HTTP delivery. There should be no user-facing CLI yet. The website and public deployment should not exist yet. Product name, npm package name, executable command, and registry URL status should be documented.

FIRST ACTIONS
- Verify the registry can be built, served locally, parsed, and checksum-verified.
- Read the component, token, and registry contracts.
- Confirm the final CLI package name and executable command. If still undecided, stop and ask the user; do not create a publishable package under an invented name.

RESEARCH
Research current official Commander.js, Clack prompts, Node.js ESM/package `bin` and `exports`, npm package metadata, npm/pnpm/yarn/Bun command behavior, filesystem safety, and package-manager detection documentation. Record sources in `docs/research/phase-05.md`.

IMPLEMENTATION
- Create `packages/cli` as a production ESM TypeScript package with a correct shebang, executable `bin`, explicit exports, files whitelist, engines, license, repository metadata, and publish-safe package metadata.
- Implement a validated registry client with configurable base URL, timeouts, clear offline errors, schema validation, and SHA-256 verification.
- Implement commands: `init`, `list`, `add <name>`, `diff <name>`, `doctor`, and `help`.
- Provide `--cwd`, `--yes`, `--dry-run`, `--registry`, and machine-readable output only where useful.
- Detect project Next.js App Router structure, TypeScript, Tailwind version, package manager, source root, path alias, global CSS candidates, and component directory without guessing silently.
- If detection is ambiguous, present concise choices in interactive mode and fail with actionable instructions in noninteractive mode.
- `init` must propose a diff and add only missing semantic tokens. It must preserve user CSS and be idempotent.
- `add` must verify registry and file checksums, show planned changes, install declared missing dependencies after confirmation, and write component files atomically.
- Never silently overwrite an existing component. Provide clear cancel, diff, rename, or explicit overwrite handling.
- Prevent traversal, absolute-path writes, symlink escape, command injection, and partial installation.
- Record installed component name/version/checksum in a small local configuration file with a documented schema.
- `diff` must be read-only. `doctor` must report actionable compatibility problems.
- Ensure cancellation and failures leave the consumer project unchanged or cleanly rolled back.
- Add local CLI usage documentation.

VALIDATION
Run format check, lint, strict typecheck, CLI build, package metadata validation, `pnpm pack` or `npm pack`, inspect tarball contents, execute the packed CLI help/list commands against the local registry, and manually exercise dry runs. Do not publish yet.

ACCEPTANCE CRITERIA
- The packed CLI executes through its final command name.
- All commands exist with clear help and exit codes.
- Registry responses and file integrity are validated.
- File and CSS changes are safe, previewable, and idempotent.
- The package tarball contains only intended runtime files.
- All validation commands pass.
- Commit with: `feat: add production component cli`.

Do not complete full Next.js compatibility validation, website, public deployment, npm publishing, or AI functionality yet.
```

---

# Phase 06 — Next.js App Router installation compatibility

```text
Implement Phase 06 only.

PROJECT CONTEXT
The production CLI initially targets only Next.js App Router + TypeScript + Tailwind CSS v4 projects. Compatibility must be proven using clean Next.js consumer projects before the CLI is published. Other frameworks must be rejected with a clear unsupported-framework message rather than handled partially.

WHAT EXISTS BEFORE THIS PHASE
The workspace should contain a packed, unpublished CLI with init/list/add/diff/doctor commands and a complete local registry containing four production sections. Generic detection and safe file operations exist, but the real Next.js App Router installation flow has not yet been completed and validated.

FIRST ACTIONS
- Verify the packed CLI and local registry from Phase 05.
- Read current component and token contracts and inspect all four components for framework assumptions.
- Inspect the real package-manager and framework detection code before extending it.

RESEARCH
Research current official Next.js App Router installation, Tailwind CSS v4 PostCSS setup, TypeScript path aliases, package manager commands, `next/image`, `next/link`, and Server/Client Component rules. Record exact current versions and sources in `docs/research/phase-06.md`.

IMPLEMENTATION
- Create a repeatable disposable fixture-project script or clearly isolated fixture directory for a clean Next.js App Router project. Do not commit dependency directories or build output.
- Complete strict Next.js App Router project detection and global CSS discovery. Reject every non-Next.js project and unsupported Next.js version with an actionable message.
- Support conventional `src` and non-`src` layouts, common aliases, and explicit user overrides.
- Ensure `init` correctly adds the semantic token contract to current Tailwind v4 CSS without duplicating `@import "tailwindcss"`, replacing existing design tokens, or assuming obsolete Tailwind v3 configuration.
- Ensure `add` places files in an appropriate components directory and uses the detected or selected import alias.
- Ensure dependencies are installed through the detected package manager using argument-safe process execution.
- Handle static and client components correctly in Next.js. Do not add `"use client"` to every component.
- Manually install all four components into a clean Next.js App Router project using the packed CLI and local registry.
- Add a minimal page in each disposable fixture that imports and renders all four installed components.
- Run each consumer project's typecheck and production build. Start each locally and visually inspect desktop and mobile rendering.
- Exercise repeated `init`, repeated `add`, existing-token, existing-file, cancellation, invalid registry, checksum failure, and offline scenarios through a documented validation script or manual checklist. Do not create a maintained automated test suite.

VALIDATION
Run repository format/lint/typecheck/build, rebuild and inspect the CLI tarball, then complete a clean Next.js install, typecheck, production build, and manual visual inspection. Record commands and results in `docs/compatibility-validation.md`.

ACCEPTANCE CRITERIA
- A new Next.js Tailwind v4 App Router project can install and render all four components.
- A non-Next.js project is rejected before any files or dependencies are changed.
- Repeated operations are idempotent and do not corrupt CSS or overwrite files silently.
- The clean Next.js consumer production build passes.
- Next.js-specific imports, when used, follow supported App Router APIs and documented version constraints.
- All validation commands pass.
- Commit with: `feat: support nextjs app router installs`.

Do not build the public website, deploy the registry, publish npm, or add AI functionality.
```

---

# Phase 07 — Complete public website

```text
Implement Phase 07 only.

PROJECT CONTEXT
The public website is the discovery experience for the production section library. It must present the same four registry components users can install through the CLI. The website is not an AI generation interface and must not become a separate source of component truth.

WHAT EXISTS BEFORE THIS PHASE
The repository should contain four production components, semantic tokens, a complete local registry, a production CLI, and proven Next.js App Router installation compatibility. No public website should exist yet except any minimal internal component preview used during authoring.

FIRST ACTIONS
- Verify all earlier phases and read product, architecture, component, token, registry, and compatibility documents.
- Inspect the actual registry output and preview assets.
- Confirm the final brand name, domain status, and visual direction from documented user decisions. Ask the user if a required public branding decision is missing.

RESEARCH
Research current official Next.js App Router, React, Tailwind CSS v4, metadata, sitemap/robots, image optimization, static generation/caching, accessibility, and deployment documentation. Record sources and decisions in `docs/research/phase-07.md`.

IMPLEMENTATION
- Create `apps/web` using the current stable Next.js App Router with strict TypeScript and Tailwind CSS v4.
- Consume the registry through validated build-time data or a documented cached server approach. Do not duplicate component metadata manually.
- Create a polished production design with homepage, component catalog, category/filter/search experience, component detail pages, responsive preview switching, installation instructions, props, dependencies, required tokens, and usage examples.
- Show only the four real registry items. Empty categories may be omitted; do not fabricate “coming soon” inventory unless product docs request it.
- Include copyable commands using the final CLI package/executable name.
- Use trusted reviewed preview assets. If live component previews are rendered, define a safe isolation and loading strategy rather than executing arbitrary future registry code in the main site context.
- Add light/dark themes, semantic tokens, keyboard navigation, visible focus, reduced-motion handling, accessible dialogs/menus, and useful empty/error states.
- Add SEO metadata, canonical URLs once domain is known, Open Graph assets, sitemap, robots, favicon/app icons, and structured data where appropriate.
- Optimize images, fonts, static output, and client JavaScript. Avoid unnecessary client components and dependencies.
- Include registry/API documentation and CLI getting-started documentation.
- Add a clear but nonfunctional placeholder in internal docs—not public UI—for the future AI pipeline. Do not expose unfinished AI controls.
- Render and manually inspect every route and relevant state at approximately 1440px and 390px. Fix overlap, overflow, spacing, contrast, broken imagery, and navigation issues.

VALIDATION
Run format check, lint, strict typecheck, registry validation, Next.js production build, route/link validation, and manual responsive/keyboard inspection. Do not add a test suite or CI.

ACCEPTANCE CRITERIA
- The website is production-quality and entirely driven by the registry.
- Every one of the four components has a complete detail page and correct install command.
- Core routes are responsive, accessible, metadata-complete, and production-buildable.
- The website does not require the future AI pipeline.
- All validation commands pass.
- Commit with: `feat: build production component gallery`.

Do not deploy publicly, publish npm, or add AI functionality yet.
```

---

# Phase 08 — Public registry hosting and website deployment

```text
Implement Phase 08 only.

PROJECT CONTEXT
The production website and registry must be publicly reachable before the npm CLI is published. The CLI needs a stable HTTPS registry base URL, and website install commands need a final public identity. Deployment must not introduce a database or paid infrastructure requirement unless the user explicitly chooses one.

WHAT EXISTS BEFORE THIS PHASE
The repository should contain a production website, deterministic registry, production CLI, and validated Next.js App Router compatibility. The registry is still configured primarily for local development and the website is not yet publicly deployed. The CLI is not published to npm.

FIRST ACTIONS
- Verify the website production build and deterministic registry output.
- Read documented domain, deployment-provider, product name, CLI name, and registry URL decisions.
- If provider, account, domain, or URL decisions are missing, ask the user before configuring final deployment. Do not invent accounts, credentials, domains, or URLs.
- Never paste or commit deployment tokens.

RESEARCH
Research current official deployment documentation for the user-selected provider, Next.js deployment behavior, static/public file handling, route handlers if used, cache headers, CORS, immutable asset caching, and custom domains. Record sources in `docs/research/phase-08.md`.

IMPLEMENTATION
- Configure the website and registry for the chosen free or existing deployment target.
- Expose stable HTTPS endpoints for the registry index, each item, component files if separately served, and preview assets.
- Use correct content types, caching, ETags or immutable hashed assets where appropriate, and reasonable CORS behavior for CLI access.
- Separate local development registry configuration from the production default cleanly.
- Update public website commands, canonical metadata, sitemap, robots, registry metadata, and documentation with the confirmed production URLs.
- Update the CLI's default registry URL only after the public endpoint is verified. Preserve an explicit override for development/custom registries.
- Add a deployment runbook and rollback instructions.
- Perform deployment only after showing the planned target and receiving user confirmation if the agent has authenticated deployment access.
- After deployment, manually verify every public registry endpoint, checksum, website route, preview asset, and CLI list operation against production.

VALIDATION
Run repository validation and production builds before deployment. After deployment, validate HTTPS registry responses against schemas and hashes, run the packed CLI `list` and dry-run `add` against production, and inspect the live website on desktop and mobile.

ACCEPTANCE CRITERIA
- Website and registry are publicly reachable at confirmed stable URLs.
- Registry files validate and integrity hashes match over HTTPS.
- The packed CLI can read the production registry.
- Website metadata and install commands use final URLs and names.
- Deployment and rollback are documented.
- All validation commands pass.
- Commit with: `feat: deploy website and public registry`.

Do not publish the npm CLI or add AI functionality yet.
```

---

# Phase 09 — npm release and real npx installation

```text
Implement Phase 09 only.

PROJECT CONTEXT
The CLI is the production installer for the publicly hosted registry. It must now be released to npm so users can run it with npx in Next.js App Router projects. npm publication is a real external side effect and must use the user-approved package name and account.

WHAT EXISTS BEFORE THIS PHASE
The website and registry should be publicly deployed and verified. The CLI should be production-built, packed locally, and proven against Next.js App Router. Its default registry URL should point to the live registry. The package must not yet be published under the planned version unless filesystem and npm inspection prove otherwise.

FIRST ACTIONS
- Verify all earlier phase artifacts and the live production registry.
- Confirm the exact npm package name, scope, executable command, initial version, access level, license, repository URL, and npm account ownership with the user.
- Check npm package-name availability or existing ownership using official npm commands.
- Check local npm authentication without printing credentials.
- Do not publish under a guessed name or account.

RESEARCH
Research current official npm documentation for package metadata, `npm pack`, scoped public packages, two-factor authentication or trusted publishing requirements, dist-tags, deprecation, access, and provenance availability. This plan has no CI, so do not introduce GitHub Actions merely for provenance. Record sources in `docs/research/phase-09.md`.

IMPLEMENTATION
- Audit final package metadata, README, changelog, license, executable permissions, engines, files whitelist, exports, dependencies, repository/homepage/bugs fields, and registry defaults.
- Ensure the package contains built runtime files and excludes source data, website assets, private docs, fixtures, caches, and secrets.
- Produce a clean tarball and inspect every included file.
- Install the tarball into a fresh Next.js App Router project one final time and run the real executable through `npx` or the package manager's local binary mechanism.
- Confirm `init`, `list`, `add`, `diff`, and `doctor` against the live registry.
- Prepare the exact publish command and show it to the user.
- Publish only after explicit user confirmation in this phase. Use public access for a scoped public package when required by npm.
- Verify the npm package page, version, dist-tag, downloadable tarball, executable, and public metadata after publishing.
- Create the Git tag and release notes locally only after npm publication succeeds. Do not push unless the user explicitly requests it.

VALIDATION
Run format check, lint, strict typecheck, all builds, registry validation, website production build, CLI pack inspection, a fresh Next.js install, and post-publish `npx <package>@<version>` verification.

ACCEPTANCE CRITERIA
- The approved CLI version is publicly available on npm.
- A clean Next.js App Router project can run the published CLI and install all four components from the live registry.
- Unsupported Next.js versions are rejected without filesystem changes.
- npm metadata and tarball contents are correct.
- Website commands point to the published package.
- Release notes and rollback/deprecation steps are documented.
- All validation commands pass.
- Commit with: `release: publish initial cli version`.

Do not add AI generation functionality.
```

---

# Phase 10 — Final production audit and handoff

```text
Implement Phase 10 only.

PROJECT CONTEXT
The customer-facing platform should now be complete: four manually crafted production sections, a live validated registry, a deployed public website, and a published npm CLI that installs into Next.js App Router Tailwind v4 projects. The only major future system should be the deferred internal AI generation pipeline.

WHAT EXISTS BEFORE THIS PHASE
Phases 01-09 should have produced and released the complete platform. The live website, public registry, and npm CLI should all be operational. No AI pipeline should exist. This phase is an audit and handoff, not a feature-development phase.

FIRST ACTIONS
- Inspect the actual repository, Git history, live website, registry endpoints, npm package, and documentation.
- Verify every expected previous-phase artifact. Report discrepancies before changing architecture.
- Read all decision records and research notes.

RESEARCH
Use current official documentation only when an audit finding needs confirmation. Record final references and findings in `docs/research/phase-10.md`.

AUDIT AND FIXES
- Trace the complete component lifecycle: canonical component -> registry build -> public HTTPS artifact -> CLI download/checksum -> installed consumer TSX -> website documentation.
- Verify exactly four production entries exist and no placeholder/demo component is publicly installable.
- Verify the same metadata drives registry, CLI, and website.
- Recompute and verify all checksums.
- Verify published CLI tarball contents and live npm version.
- Create a fresh Next.js App Router Tailwind v4 project and install/render all four components using the public npm CLI and live registry.
- Run typecheck and production build in the consumer project and manually inspect desktop/mobile light/dark rendering.
- Verify repeat `init` and `add`, cancellation, overwrite protection, offline error, invalid registry override, checksum failure handling, path safety, and CSS preservation.
- Verify website navigation, search/filter behavior, component detail pages, previews, commands, metadata, sitemap, robots, accessibility basics, responsive layout, and broken links.
- Verify no secret, local absolute path, temporary tarball, cache, deployment output, or source-company copy/logo leaked into tracked or public artifacts.
- Verify no AI SDK, local gateway, LangGraph, generation prompt, or unfinished AI control was added.
- Remove confirmed dead code, duplication, stale instructions, accidental public APIs, and obsolete references to the abandoned generation-first plan.
- Do not introduce new product features during the audit.

DOCUMENTATION
- Create `docs/production-audit.md` with evidence, commands, public URLs, npm version, known limitations, and pass/fail results.
- Create `docs/operations.md` covering component addition, registry release, website deployment, CLI release, rollback, and incident response.
- Create `docs/ai-pipeline-handoff.md` documenting the stable interfaces a future internal AI pipeline must produce: component contract, metadata schema, preview requirements, validation gates, and human approval boundary. Do not implement the pipeline.
- Update README and product docs to accurately describe the released system.

VALIDATION
Run every repository format, lint, typecheck, validation, and production build command; verify live registry hashes; run fresh consumer builds; and manually inspect live desktop/mobile output. Do not add tests or CI.

ACCEPTANCE CRITERIA
- Website, registry, and npm CLI are production operational.
- Published CLI installs all four components successfully into a clean Next.js App Router project.
- Documentation is complete enough to operate the platform and add future components.
- The future AI pipeline has a clear contract but no implementation.
- All validation commands pass.
- Commit with: `chore: complete production platform audit`.

If a critical live-system requirement remains blocked, do not make a success commit. Document the blocker precisely.
```

---

# Official documentation baseline

Every phase must re-check current documentation because versions and APIs can change.

- pnpm workspaces: https://pnpm.io/workspaces
- pnpm workspace configuration: https://pnpm.io/pnpm-workspace_yaml
- pnpm pack: https://pnpm.io/cli/pack
- pnpm publish: https://pnpm.io/cli/publish
- Turborepo: https://turborepo.dev/docs
- TypeScript: https://www.typescriptlang.org/docs/
- React: https://react.dev/learn/build-a-react-app-from-scratch
- Next.js: https://nextjs.org/docs
- Next.js App Router installation: https://nextjs.org/docs/app/getting-started/installation
- Next.js CSS and Tailwind: https://nextjs.org/docs/app/getting-started/css
- Tailwind CSS with Next.js: https://tailwindcss.com/docs/guides/nextjs
- Tailwind CSS theme variables: https://tailwindcss.com/docs/theme
- shadcn registry introduction: https://ui.shadcn.com/docs/registry/getting-started
- shadcn registry item specification: https://ui.shadcn.com/docs/registry/registry-item-json
- Node.js packages: https://nodejs.org/api/packages.html
- npm package.json: https://docs.npmjs.com/cli/v11/configuring-npm/package-json/
- npm scoped public packages: https://docs.npmjs.com/creating-and-publishing-scoped-public-packages/
- npm scopes: https://docs.npmjs.com/about-scopes/
- Commander.js: https://www.npmjs.com/package/commander
- Clack prompts: https://www.npmjs.com/package/@clack/prompts
- Zod: https://zod.dev/

# Final definition of done

The project is complete when:

1. The four manually crafted components are production-quality and registry-valid.
2. The registry is publicly reachable, versioned, deterministic, and checksum-protected.
3. The public website is complete and driven by registry data.
4. The npm CLI is publicly published and can safely install the components into clean Next.js App Router Tailwind v4 projects.
5. The website and CLI require no AI service at runtime.
6. Future components can be added without architectural changes.
7. The internal AI pipeline remains the only major deferred system and has a documented integration contract.
