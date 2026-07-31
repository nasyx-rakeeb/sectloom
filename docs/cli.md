# Sectloom CLI

The Sectloom CLI (`sectloom`) is the primary way consumers install production-ready React components from the registry into their Next.js projects.

## Installation / Usage

You can run the CLI directly via `npx` (or `pnpm dlx`, `bunx`):

```bash
npx sectloom init
```

## Commands

### `init`

Initializes a new Sectloom configuration (`sectloom.json`) in your project.

- Detects your Next.js App Router, TypeScript, and Tailwind CSS v4 environment.
- Safely injects missing semantic CSS variables into your global CSS.
- Preserves existing variables idempotently.

```bash
npx sectloom init
npx sectloom init --yes # Skips prompts, accepts defaults
```

### `list`

Lists all available components from the configured registry, indicating which ones are already installed in your project.

```bash
npx sectloom list
```

### `add <name>`

Adds a specific component (e.g., `hero-efficiency`) to your project.

- Fetches metadata and raw files.
- Verifies SHA-256 integrity checksums to prevent tampering.
- Prompts to install missing dependencies (e.g., `lucide-react`).
- Writes the component strictly inside your configured components directory.
- Updates `sectloom.json` with the installed version and hash.

```bash
npx sectloom add hero-efficiency
npx sectloom add hero-efficiency --dry-run
```

### `diff <name>`

Checks if the local component source code has been modified since installation, or if the upstream registry has an update, showing a standard diff.

```bash
npx sectloom diff hero-efficiency
```

### `doctor`

Examines your project environment for compatibility with Sectloom. It checks for Next.js, App Router, TypeScript, Tailwind version, and valid configuration, reporting any missing prerequisites.

```bash
npx sectloom doctor
```

## Security & Safety

- **Path Traversal Protection:** The CLI strictly resolves paths relative to your working directory and components alias, refusing any absolute path escapes or traversal payloads.
- **Checksum Verification:** Every registry artifact downloaded is hashed and compared against the registry manifest's expected checksum.
- **No Silent Overwrites:** The `add` command will always prompt before overwriting an existing local file unless forced.
