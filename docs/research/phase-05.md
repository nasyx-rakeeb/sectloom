# Phase 05 Research Notes: CLI Installer

## Commander.js & Command Structure

- **Commander:** A standard Node.js CLI framework. It provides robust subcommands (`init`, `add`, `list`, `diff`, `doctor`), boolean flags (`--yes`, `--dry-run`), string options (`--cwd`, `--registry`), and auto-generated `help`.
- **Global Options:** `program.option('-c, --cwd <cwd>', ...)` can be accessed in subcommands.
- **Async Execution:** Subcommands should be registered with `.action(async (options) => { ... })` to handle asynchronous file IO and HTTP requests.

## Interactive Prompts: Clack

- **@clack/prompts:** Offers a modern, clean UI for terminal applications. Use `intro`, `outro`, `text`, `select`, `confirm`, `spinner`, `isCancel`, and `cancel` for safe, clear interactions.
- **Non-interactive fallback:** In `--yes` (or `--force`) mode, the CLI should bypass prompts, accepting safe defaults and erroring on ambiguous paths instead of hanging.

## Safe Filesystem Operations

- **Prevention of Path Traversal:** When reading paths from user inputs or writing registry files, validate using `path.resolve` and check if it `startsWith(baseDir)`. Never follow symlinks implicitly.
- **Idempotency:** The `init` command must parse existing global CSS, append missing tokens using string injection (or AST if necessary, but string replacement is simpler for Tailwind variables), and not duplicate if already present.
- **Checksum Verification:** Downloaded content must be hashed with `crypto.createHash('sha256')` before being written, ensuring the exact match with the registry JSON payload.

## npm Package Structure (ESM)

- `package.json` must include `"type": "module"`.
- `"bin": { "sectloom": "./dist/index.js" }`.
- `"files": ["dist"]` to whitelist only compiled files for the npm tarball.
- `"engines": { "node": ">=18.0.0" }`.
- Build process: Use `tsup` or `esbuild` to compile `src/index.ts` to `dist/index.js` with `chmod +x` equivalent (adding `#!/usr/bin/env node` shebang).

## Configuration File Schema

- Like shadcn/ui, Sectloom uses a local `sectloom.json` or `components.json` to store:
  - `$schema` url
  - `style`, `tailwind`, `aliases`
  - `registry` URL
  - Array of installed components with versions and checksums to support `diff`.

## Command specific considerations:

- **`init`**: Checks for Next.js App Router + TS + Tailwind. Creates config, adds missing tokens to `globals.css`.
- **`add`**: Fetches component metadata from registry. Fetches deps, prompts for confirmation, writes to disk, updates config.
- **`list`**: Fetches index from registry, displays available components.
- **`diff`**: Checks local component hash vs registry hash, or runs diff output.
- **`doctor`**: Checks environment for TS, Next.js, and valid project structure.
