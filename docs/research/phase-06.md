# Phase 06 Research Notes: Next.js App Router & Tailwind CSS v4

## Next.js App Router Setup

- **Directory Structure:** Supports `app/` at the project root or inside `src/app/`. The CLI must accommodate both.
- **Components:** Server Components are the default. Client Components are declared with `"use client"` at the top of the file. Interactive components (e.g., using `useState` or `lucide-react` icons that might require client context if interactive) must use `"use client"`. The components created in Phase 03 already adhere to this.
- **Routing API:** Uses `next/link` and `next/image` which have stable APIs in recent Next.js versions (v13+). `next/image` requires proper `width` and `height` (or `fill` with `sizes`) and might need domains configured in `next.config.mjs` if external images are used.

## Tailwind CSS v4 Integration

- **PostCSS:** Tailwind v4 moves away from `tailwind.config.js` and instead relies on standard CSS with `@theme inline` and direct CSS variables.
- **Global CSS:** Usually resides at `app/globals.css` or `src/app/globals.css`. It typically contains `@import "tailwindcss";` (or similar base styles).
- **Sectloom Token Injection:** The CLI's `init` command must intelligently append the `@theme inline` and `@layer base` block to the global CSS without duplicating `@import "tailwindcss"`. It should be idempotent, detecting if `--color-primary:` is already defined.

## TypeScript Path Aliases

- Configured in `tsconfig.json` under `compilerOptions.paths`.
- Next.js default alias is `@/*` pointing to `./*` or `./src/*`.
- Sectloom components will use the `components` alias defined in `sectloom.json` to place files and resolve internal imports if needed, though they currently don't depend on internal registry files (each is self-contained).

## Package Manager Detection & Execution

- Use `fs.stat` to locate `pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`, or `bun.lockb`.
- Use `child_process.execSync` safely to run `<pm> add <dep>` (or `install` for npm) to add dependencies like `lucide-react`.

## Component Placement Logic

- By default, if `src/` exists, components go in `src/components/sectloom`.
- If `src/` does not exist, components go in `components/sectloom`.
- The CLI must respect this heuristic for the Next.js standard layout.
