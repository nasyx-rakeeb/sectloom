# Phase 07 Research Notes: Public Website

## Tech Stack
- **Framework:** Next.js (App Router, static generation support)
- **Styling:** Tailwind CSS v4 (using the `@sectloom/tokens` package for semantic CSS variables)
- **Language:** TypeScript
- **Deployment:** Vercel (target deployment, optimized for Next.js)

## Registry Consumption
- The `apps/web` project will consume the registry statically at build time. Since `packages/registry/public` contains the generated `.json` files, `apps/web` can directly read the file system using Node's `fs` or `import` the JSON. This ensures there are no runtime dependencies on a running registry server, maximizing performance and reliability (SSG).

## Design & Aesthetics
- **Theme:** The design should support both light and dark modes natively via the semantic tokens defined in `@sectloom/tokens`. The initial design defaults to a dark aesthetic (as generated in Phase 03) but supports toggling via `next-themes`.
- **Layout:** 
  - **Homepage:** Hero section explaining the value proposition of Sectloom (beautiful, copy-pasteable React sections). Features highlights.
  - **Catalog (`/components`):** A grid displaying available components with category filters.
  - **Component Details (`/components/[category]/[name]`):** A detailed view showing the preview image, installation command (`npx sectloom add <name>`), dependencies, required tokens, and raw code/props usage.
- **Component Previews:** Instead of executing arbitrary React code in an iframe, the gallery will utilize the trusted high-resolution JPG previews generated during component creation to ensure safety and performance.

## SEO & Accessibility
- **Metadata:** Use the Next.js Metadata API for title, description, and Open Graph generation.
- **Sitemap & Robots:** Use Next.js `sitemap.ts` and `robots.ts` in the `app/` directory to dynamically generate these files.
- **Accessibility:** Ensure all links have accessible names. Use Radix UI or native accessible HTML tags for interactive elements like tabs (for switching between Preview/Code).
- **Domain:** Configured as `https://sectloom.dev`.

## AI Pipeline Integration
- The AI pipeline (image-to-code) is deferred. The website UI will only show the manual catalog. Internal documentation (this file) acknowledges the future pipeline will reside at `/generate` (authenticated), but it is omitted from the public UI.
