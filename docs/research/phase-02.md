# Phase 02 Research

## Tailwind CSS v4 Theme Variables

- **Source:** Tailwind CSS v4 Alpha/Beta/Release documentation.
- **Decision:** Tailwind v4 uses CSS variables natively and removes `tailwind.config.js` in favor of `@theme` block in CSS. We will define our semantic tokens (primary, secondary, muted, etc.) using CSS variables in `:root` and override them in the `.dark` class. Then we map them into Tailwind using `@theme { --color-primary: var(--primary); }`. This eliminates the need for component-level `dark:` classes, ensuring the sections are completely responsive to the theme context.

## Zod for Runtime Validation

- **Source:** Zod documentation (zod.dev).
- **Decision:** Zod is ideal for parsing and validating registry manifests and design profiles at runtime. We will define all schemas in `packages/contracts` and use `z.infer` to export strict TypeScript types to the rest of the workspace.

## Shadcn Registry Schema

- **Source:** shadcn-ui/ui GitHub repository.
- **Decision:** Shadcn defines `name`, `type`, `files`, `dependencies`, `registryDependencies`, and `tailwind` properties. We will adapt this for Sectloom by defining `RegistryComponent` with arrays for `files` (with checksums), `dependencies`, `designProfiles`, and `previewAssets`.

## React Server/Client Components

- **Source:** React and Next.js App Router documentation.
- **Decision:** Components will default to Server Components. Interactive state (e.g., dropdowns, specific animations) should use `"use client"` either by wrapping specific interactive leaves or applying it to the entire section if the section fundamentally relies on client-side state.

## Accessibility

- **Source:** W3C WAI-ARIA authoring practices.
- **Decision:** All sections must use semantic HTML (`<section>`, `<nav>`, `<header>`), correct focus states (`focus-visible:ring`), and screen reader texts (`sr-only`) where appropriate.
