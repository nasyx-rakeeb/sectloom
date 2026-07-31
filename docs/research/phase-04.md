# Phase 04 Research Notes: Registry Architecture

## Shadcn/ui Registry Specification

The official `shadcn/ui` registry model allows consumers to fetch component metadata and file contents over HTTP.

- **Endpoint Structure:** Usually, there's an `index.json` containing an array of basic component info, and `/components/[name].json` with detailed files and content.
- **Files Field:** Instead of a simple path, files are often returned as `{ path: string, content: string, type: 'registry:block' | 'registry:ui' }`. By inlining `content`, the CLI doesn't need a separate fetch for raw code.
- **Dependencies:** `dependencies` (npm packages), `registryDependencies` (other shadcn components), `devDependencies`.
- **CSS and Tailwind:** `tailwind` (config merges), `cssVars` (variables for light/dark mode).

## Semantic Versioning & Integrity

- **Versioning:** Components can evolve. SemVer is generally applied at the package level, but a public component registry should also version individual blocks (e.g., `v1.0.0`) to avoid breaking consumers.
- **SHA-256 Integrity:** To ensure exact bytes, the registry should hash the raw file content (`crypto.createHash('sha256').update(content).digest('hex')`) and include this checksum in the registry JSON. This allows the CLI to verify artifacts against MITM or corruption.
- **Determinism:** When building the registry JSON, object keys should be sorted alphabetically, and arrays should be sorted to ensure the exact same JSON is produced if the source code hasn't changed.

## Static Hosting & Delivery

- **Next.js API vs Static JSON:** Since the registry data is read-only and static for any given release, generating static `.json` files is preferred over a dynamic API route. This allows deployment to global CDNs (e.g., Cloudflare Pages, Vercel Blob) with immutable caching headers.
- **Local Fixture:** For local development, serving the static `public/registry` directory using a simple HTTP server (like `serve` or Next.js `public/` directory) is sufficient for CLI testing.

## Decision: Custom Extended Schema

While maintaining conceptual compatibility with shadcn's file/dependency model makes sense, our contracts (from Phase 02) demand strict fields like `category`, `designProfile`, `supportedNextJsRange`, and strict `sha256` integrity checks. We will extend the standard registry model with these fields to support our strict component contracts.
