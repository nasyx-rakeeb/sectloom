# Sectloom Website Rewrite — Research & Architectural Decisions

> **Date:** 2026-08-01
> **Status:** Research complete — awaiting approval to proceed with implementation
> **Scope:** Rewrite `apps/web` with shadcn/ui, production documentation, category navigation, SEO

---

## Table of Contents

1. [Current State Inventory](#1-current-state-inventory)
2. [Next.js App Router (14.x)](#2-nextjs-app-router-14x)
3. [shadcn/ui](#3-shadcnui)
4. [Tailwind CSS v4](#4-tailwind-css-v4)
5. [Technical SEO](#5-technical-seo)
6. [Architectural Decisions](#6-architectural-decisions)

---

## 1. Current State Inventory

### Project Versions

| Package      | Version    |
| :----------- | :--------- |
| Next.js      | `^14.2.3`  |
| React        | `^18.3.1`  |
| Tailwind CSS | `4.3.3`    |
| Node.js      | `>=20.0.0` |
| pnpm         | `9.7.0`    |

### Existing Routes

| Route                           | Purpose                                 |
| :------------------------------ | :-------------------------------------- |
| `/`                             | Homepage                                |
| `/components`                   | Component gallery (all categories flat) |
| `/components/[category]/[name]` | Component detail page                   |
| `/robots.txt`                   | Robots directives                       |
| `/sitemap.xml`                  | Dynamic sitemap                         |

### Public Registry Endpoints (Must Preserve)

- `https://sectloom.vercel.app/registry/index.json`
- `https://sectloom.vercel.app/registry/hero-efficiency.json`
- `https://sectloom.vercel.app/registry/cta-apis.json`
- `https://sectloom.vercel.app/registry/contact-grid.json`
- `https://sectloom.vercel.app/registry/footer-products.json`

### Cloudflare R2 Assets (Must Preserve)

- Base: `https://media.sectloom.dpdns.org/images/`
- Used in component `previewAsset` URLs for reference screenshots

### Current SEO Setup

- `metadataBase: new URL('https://sectloom.dev')` in root layout
- Static OpenGraph in layout
- Dynamic `generateMetadata` on component detail pages
- Dynamic `sitemap.ts` reading registry `index.json`
- `robots.ts` allowing all crawlers except `/api/`

### Current Architecture Issues

1. `/components` shows all categories flat — not scalable for hundreds of components
2. No `/docs` routes — "View documentation" links lead to 404
3. No category-level routes (`/components/hero`)
4. No category sidebar navigation
5. No previous/next component navigation
6. Code blocks lack horizontal scrolling
7. No breadcrumbs
8. No JSON-LD structured data
9. No shadcn/ui — all UI is custom ad-hoc Tailwind

### Monorepo Packages

| Package                | Purpose                                    |
| :--------------------- | :----------------------------------------- |
| `@sectloom/contracts`  | Zod schemas & TypeScript types             |
| `@sectloom/tokens`     | Tailwind v4 CSS variable token definitions |
| `@sectloom/components` | Canonical TSX section source code          |
| `@sectloom/registry`   | Registry metadata & build script           |
| `sectloom` (CLI)       | Published npm CLI tool (v0.2.0)            |

### Registry Schema (from `@sectloom/contracts`)

- `RegistryFileSchema`: `path`, `content` (optional), `url` (optional), `type`, `checksum`
- `RegistryItemSchema`: `name`, `category`, `title`, `description`, `dependencies`, `registryDependencies`, `requires` (peer deps), `files`, `requiredTokens`, `designProfiles`, `sourceReferenceMetadata`, `propsDocumentation`, `previewAssets`, `version`, `checksum`

### Token System (`@sectloom/tokens`)

- Uses `@theme inline` with CSS custom properties
- Colors: `--color-background`, `--color-foreground`, `--color-primary`, `--color-secondary`, `--color-muted`, `--color-accent`, `--color-destructive`, `--color-border`, `--color-input`, `--color-ring`
- Radii: `--radius-sm` through `--radius-xl`
- Containers: `--container-sm` (640px) through `--container-2xl` (1400px)
- Light/dark via `:root` / `.dark` class toggle

---

## 2. Next.js App Router (14.x)

**Sources:**

- [Pages and Layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)
- [Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- [generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [notFound](https://nextjs.org/docs/app/api-reference/functions/not-found)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [Link](https://nextjs.org/docs/app/api-reference/components/link)
- [Image](https://nextjs.org/docs/app/api-reference/components/image)
- [Sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Robots](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)
- [OpenGraph Image](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)
- [JSON-LD](https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld)
- [Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)

### Key Patterns for This Rewrite

#### Layouts

- Root layout defines `<html>`, `<body>`, global font, theme provider
- Nested layouts for `/docs` (sidebar + content) and `/components` (category sidebar + content)
- Layouts persist across sibling navigations — ideal for sidebars

#### Dynamic Routes

- In Next.js 14, `params` is synchronous: `{ params: { slug: string } }`
- `[category]` for category pages, `[component]` for component detail
- Use `generateStaticParams` to pre-render all category and component pages at build time
- Set `dynamicParams = false` to return 404 for unknown slugs

#### Metadata

- `title.template: '%s — Sectloom'` in root layout
- `generateMetadata` on dynamic routes for unique title/description/OG per page
- `metadataBase` resolves relative URLs for canonicals and OG images

#### notFound()

- Call from server components when registry lookup fails
- Automatically sets `<meta name="robots" content="noindex" />`
- Create `not-found.tsx` in relevant route segments

#### Server/Client Boundaries

- Default to Server Components for all data display
- Client Components only for: mobile sheet toggle, copy button, theme toggle, active sidebar state
- Pass Server Components as `children` to Client Component wrappers

#### Images

- Use `next/image` with `remotePatterns` for `media.sectloom.dpdns.org`
- Set `priority` on hero/above-fold images
- Always provide `alt` and `sizes`

---

## 3. shadcn/ui

**Sources:**

- [Next.js Installation](https://ui.shadcn.com/docs/installation/next)
- [Monorepo Guide](https://ui.shadcn.com/docs/monorepo)
- [CLI Reference](https://ui.shadcn.com/docs/cli)
- Individual component docs at `ui.shadcn.com/docs/components/*`

### Installation Plan

```bash
cd apps/web
pnpm dlx shadcn@latest init
```

The CLI will create `components.json` and `lib/utils.ts` (with `cn` helper using `clsx` + `tailwind-merge`).

**Critical:** During init, must configure aliases to match existing `@/*` tsconfig paths and preserve the existing token CSS variables in `globals.css`. Do not let shadcn overwrite the Sectloom semantic tokens.

### Components Needed

| Component       | Purpose                                   |
| :-------------- | :---------------------------------------- |
| **Button**      | CTAs, copy buttons, navigation actions    |
| **Card**        | Component cards in gallery                |
| **Badge**       | Category labels, version badges           |
| **Separator**   | Visual dividers in sidebar and content    |
| **Breadcrumb**  | Category > Component navigation hierarchy |
| **Sheet**       | Mobile navigation drawer                  |
| **Scroll Area** | Scrollable sidebar on desktop             |
| **Tabs**        | Code/preview tabs on component pages      |
| **Tooltip**     | Copy button feedback, icon labels         |

### Components NOT Needed

- **Sidebar** — The shadcn Sidebar component is designed for dashboard-style apps with collapsible icon modes. For a public catalog, a simpler composed navigation using Scroll Area + nav links is more appropriate.
- **Command** — No command palette needed
- **Dialog** — No modal dialogs needed
- **Dropdown Menu** — No dropdown menus needed on a docs/catalog site
- **Navigation Menu** — The floating dropdown style doesn't fit; a simple header nav is better
- **Toggle** — No toggle controls needed

### Decision: No shadcn Sidebar

The shadcn Sidebar component (`SidebarProvider`, `SidebarInset`, etc.) is complex multi-component architecture designed for app dashboards with collapse-to-icon behavior. For a public documentation/catalog site, we'll build a simpler composed navigation:

- Desktop: Static `<nav>` inside a `<ScrollArea>` with active-state links
- Mobile: `<Sheet>` containing the same nav links
- This avoids pulling in the full Sidebar dependency tree while keeping the code simpler

---

## 4. Tailwind CSS v4

**Sources:**

- [Next.js Guide](https://tailwindcss.com/docs/guides/nextjs)
- [Theme Configuration](https://tailwindcss.com/docs/theme)
- [Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Container Queries](https://tailwindcss.com/docs/container-queries)
- [Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [Overflow](https://tailwindcss.com/docs/overflow)
- [Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)

### Key Patterns

#### Integration

- Already correctly configured: `@tailwindcss/postcss` in `postcss.config.mjs`
- Single `@import "tailwindcss"` in `globals.css`
- No `tailwind.config.js` needed — CSS-first with `@theme`

#### Semantic Tokens

- Existing `@theme` block maps `--color-*` variables that shadcn expects
- shadcn/ui CSS variables (like `--background`, `--foreground`, `--primary`) map to Tailwind v4 `@theme` namespaces (`--color-background`, etc.)
- Must ensure shadcn init doesn't overwrite the existing token definitions

#### Dark Mode

- Currently using class strategy via `next-themes` with `.dark` on `<html>`
- Tailwind v4 requires explicit `@custom-variant dark (&:where(.dark, .dark *))` for class-based dark mode
- Verify this is present in `globals.css` or add it

#### Code Block Scrolling Fix

- Use `overflow-x-auto` on the `<pre>` wrapper
- Parent flex/grid child needs `min-w-0` to prevent expansion
- `max-w-full` on the code container
- Tailwind v4 scrollbar utilities: `scrollbar-thin`, `scrollbar-thumb-*`, `scrollbar-track-*`

#### Responsive Breakpoints

- Default: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px)
- Mobile target: ~390px (below `sm`)
- Sidebar visible at `lg` and above, Sheet for mobile

---

## 5. Technical SEO

**Sources:**

- [Next.js Metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js Sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Next.js Robots](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)
- [Schema.org BreadcrumbList](https://schema.org/BreadcrumbList)
- [Schema.org WebSite](https://schema.org/WebSite)
- [Schema.org CollectionPage](https://schema.org/CollectionPage)
- [Schema.org SoftwareApplication](https://schema.org/SoftwareApplication)
- [Schema.org TechArticle](https://schema.org/TechArticle)
- [Google Search Central](https://developers.google.com/search/docs)
- [Open Graph Protocol](https://ogp.me/)

### SEO Implementation Plan

#### Metadata Strategy

- `metadataBase: new URL('https://sectloom.dev')` in root layout
- `title.template: '%s — Sectloom'` for automatic title formatting
- Every page gets unique `title`, `description`, `alternates.canonical`
- OpenGraph: `type: 'website'` for homepage, `type: 'article'` for docs
- Twitter: `card: 'summary_large_image'` on all pages

#### Sitemap Coverage

| Route Pattern                        | Priority |
| :----------------------------------- | :------- |
| `/`                                  | 1.0      |
| `/docs`                              | 0.9      |
| `/docs/*`                            | 0.8      |
| `/components/[category]`             | 0.8      |
| `/components/[category]/[component]` | 0.7      |

#### Robots

- Allow all public routes
- Disallow `/api/`, `/registry/*.json` (no user value in indexing raw JSON)
- Point to sitemap at `https://sectloom.dev/sitemap.xml`

#### JSON-LD Structured Data

| Page Type              | Schema                              |
| :--------------------- | :---------------------------------- |
| Homepage               | `WebSite` + `SoftwareApplication`   |
| Documentation pages    | `TechArticle` + `BreadcrumbList`    |
| Category pages         | `CollectionPage` + `BreadcrumbList` |
| Component detail pages | `TechArticle` + `BreadcrumbList`    |

#### Sanitization

- All JSON-LD output: `JSON.stringify(jsonLd).replace(/</g, '\\u003c')` per Next.js guidance

---

## 6. Architectural Decisions

### Route Structure

```
app/
├── (marketing)/
│   ├── layout.tsx          # Marketing shell (header + footer)
│   └── page.tsx            # Homepage (/)
├── docs/
│   ├── layout.tsx          # Docs layout (sidebar + content)
│   ├── page.tsx            # /docs (overview)
│   ├── getting-started/
│   │   └── page.tsx        # /docs/getting-started
│   ├── cli/
│   │   └── page.tsx        # /docs/cli
│   ├── components/
│   │   └── page.tsx        # /docs/components
│   ├── theming/
│   │   └── page.tsx        # /docs/theming
│   └── registry/
│       └── page.tsx        # /docs/registry
├── components/
│   ├── layout.tsx          # Catalog layout (category sidebar)
│   ├── page.tsx            # /components → redirect to /components/hero
│   ├── [category]/
│   │   ├── page.tsx        # /components/[category]
│   │   └── [component]/
│   │       └── page.tsx    # /components/[category]/[component]
│   └── not-found.tsx       # 404 for unknown categories/components
├── layout.tsx              # Root layout
├── not-found.tsx           # Global 404
├── sitemap.ts
└── robots.ts
```

### Component Directory Structure

```
src/
├── components/
│   ├── ui/                 # shadcn primitives (untouched)
│   ├── layout/
│   │   ├── site-header.tsx
│   │   ├── site-footer.tsx
│   │   └── skip-link.tsx
│   ├── navigation/
│   │   ├── docs-sidebar.tsx
│   │   ├── catalog-sidebar.tsx
│   │   ├── mobile-nav.tsx
│   │   └── prev-next-nav.tsx
│   ├── docs/
│   │   └── doc-content.tsx
│   └── catalog/
│       ├── component-card.tsx
│       ├── component-code.tsx
│       ├── component-header.tsx
│       └── install-command.tsx
├── lib/
│   ├── registry/
│   │   └── data.ts         # Typed registry data layer
│   ├── navigation/
│   │   └── docs-nav.ts     # Docs navigation config
│   ├── metadata/
│   │   └── metadata.ts     # Metadata generators
│   └── seo/
│       └── json-ld.tsx     # JSON-LD components
└── config/
    └── site.ts             # Site-wide constants
```

### Registry Data Layer

- Single `lib/registry/data.ts` module
- Reads from local `public/registry/index.json` and individual component JSON at build time
- Validates with `@sectloom/contracts` Zod schemas
- Exports typed functions: `getCategories()`, `getCategoryBySlug()`, `getComponentsByCategory()`, `getComponentBySlug()`, `getPrevNextComponents()`, `generateCategoryParams()`, `generateComponentParams()`, `getSitemapEntries()`
- No runtime fetch to own public routes (avoids circular dependency)
- Data is static at build time — safe to import directly

### Server/Client Component Boundaries

| Component            | Type       | Reason                            |
| :------------------- | :--------- | :-------------------------------- |
| All page.tsx files   | Server     | Data fetching, metadata           |
| All layout.tsx files | Server     | Static structure                  |
| Site header          | Server     | Static nav links                  |
| Site footer          | Server     | Static content                    |
| Docs sidebar         | Server     | Static nav                        |
| Catalog sidebar      | Server     | Static nav from registry          |
| Mobile nav sheet     | **Client** | Sheet open/close state            |
| Copy button          | **Client** | Clipboard API                     |
| Theme toggle         | **Client** | next-themes hook                  |
| Code block           | Server     | Shiki highlighting is server-side |

### `/components` Redirect Strategy

- Use `redirect('/components/hero')` from `next/navigation` in the `/components/page.tsx` server component
- This is a server-side redirect (HTTP 307 in dev, statically resolved in production)
- Hero is the default category per product requirements

### Documentation Content Approach

- Plain TSX server components for each doc page
- Typed navigation config in `lib/navigation/docs-nav.ts` with section grouping, titles, and hrefs
- Sidebar and prev/next links derived from the same nav config
- No MDX needed for 6 documentation pages — keeps the build simple and avoids additional dependencies
- Content written inline with proper heading hierarchy and semantic HTML

### shadcn/ui Integration

- Initialize in `apps/web` with existing Tailwind v4 and token setup
- Backup `globals.css` before init, restore Sectloom tokens after
- Install only needed components: `button`, `card`, `badge`, `separator`, `breadcrumb`, `sheet`, `scroll-area`, `tabs`, `tooltip`
- Keep shadcn primitives in `src/components/ui/`
- Site-specific compositions in `src/components/layout/`, `navigation/`, `docs/`, `catalog/`
