# Phase 03 Research Notes

## React Component Patterns

- **Server Components (RSC):** Components should default to being Server Components.
- **Client Components:** The `"use client"` directive should be pushed down to the lowest possible level (leaf nodes) to preserve performance and avoid shipping unnecessary JavaScript to the browser.
- **Props:** All content and meaningful configuration must be exposed as typed props to allow consumers to override the default text and behavior.

## Styling (Tailwind CSS v4)

- Tailwind v4 uses CSS variables for theming (`@theme inline`).
- Avoid `dark:` variant overrides in component source code. Instead, rely on semantic tokens (`text-foreground`, `bg-background`, `border-border`) which are managed by the environment's CSS variables.
- Container sizes and spacing should map to standard Tailwind utilities to guarantee consistent responsive behaviors.

## Icons & Assets

- **Lucide React:** The preferred icon library. Provides highly customizable, accessible SVG icons.
- **Next.js Images:** `<Image />` from `next/image` should be used for optimized remote and local images where applicable. However, since this is a distributed registry, placeholder SVGs or raw `<img>` tags might be safer if `next/image` requires the consumer to configure image domains, unless we explicitly enforce `next/image` usage in our documentation. For the sake of standard Next.js App Router support, `next/image` or standard HTML `<img>` with responsive classes is acceptable. Given the requirement is "Build components for Next.js App Router. Use `next/image` and `next/link` where appropriate," we will use them, perhaps with data URIs or standard remote placeholder domains.

## Accessibility (a11y)

- Buttons and Links must have discernible text (`aria-label` where necessary).
- Forms require associated `<label>` elements or `aria-label`/`aria-labelledby`.
- Focus states must be visible (e.g., `focus-visible:ring-2 focus-visible:ring-primary`).

## Animation

- **Motion React:** Omitted unless strictly necessary to meet the reference design's core appeal. If used, `prefers-reduced-motion` logic must be respected. For the initial four components, static styling is preferred to reduce dependencies.
