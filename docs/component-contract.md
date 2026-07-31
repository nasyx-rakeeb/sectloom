# Component Contract

## Overview

This document defines the strict standard for creating and distributing Sectloom production components. Adherence guarantees predictability, ease of integration, and forward compatibility with the automated registry builder.

## Contract Rules

### 1. Naming and Directories

- Components belong in `packages/components/src/sections/<category>/<name>`.
- Filenames should use kebab-case (e.g., `hero-split.tsx`).
- Components must be exported as default exports or named exports from an `index.ts`.

### 2. Props and Actions

- Components must use typed props (e.g., `interface HeroProps`).
- No hardcoded brand copy. All text, actions (buttons/links), and images must be overridable via props.
- Use standard HTML tags for semantic structure. Allow consumer-provided `Link` components (from Next.js) or standard `<a>` tags via prop polymorphic rendering if possible.

### 3. Server/Client Compatibility

- **Default:** All sections are React Server Components (RSC) by default. Do not use `"use client"` at the root of a section unless the entire section inherently relies on browser APIs (e.g., a complex interactive map).
- **Interactive Leaves:** If a section requires interactive elements (e.g., a carousel or a dropdown), extract that specific interactive element into a sub-component with `"use client"` and import it into the server-rendered parent section.

### 4. Forbidden Styling Patterns

- **No `dark:` color utilities:** Rely on the semantic token system. Use `bg-background text-foreground`.
- **No hardcoded hex/RGB colors:** Never use arbitrary values like `bg-[#ff0000]`.
- **No global CSS side-effects:** Components must be self-contained.

### 5. Dependency Policy

- Keep external dependencies to an absolute minimum.
- Allowed: `lucide-react` for icons, `motion` (Motion React) for non-trivial animations.
- The component must specify its dependencies in the registry metadata.

### 6. Responsive Behavior & Accessibility

- Components must be fully responsive across mobile (`sm`), tablet (`md`), and desktop (`lg`/`xl`) breakpoints.
- Components must implement proper WAI-ARIA roles, `aria-labels` for icon buttons, and visible focus states (`focus-visible:ring`).
- Images must accept `alt` props.
