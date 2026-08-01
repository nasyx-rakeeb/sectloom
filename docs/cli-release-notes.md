# Sectloom CLI - Release Notes & Rollback Procedures

## v0.1.0 (Initial Release)

- **Released:** August 2026
- **Package Name:** `sectloom`
- **Description:** Official command-line interface for the Sectloom component platform.
- **Key Features:**
  - `init`: Setup Next.js App Router projects with Tailwind CSS v4 tokens.
  - `list`: Browse available components in the registry.
  - `add <name>`: Download and install component source code into your project.
  - `diff <name>`: Preview component changes before writing.
  - `doctor`: Validate Next.js project setup compatibility.
- **Registry Endpoint:** `https://sectloom.vercel.app/registry/index.json`

## Rollback & Deprecation Steps

If a broken version of the CLI is accidentally published to npm, use the following procedures to safely roll back or deprecate the package.

**Note:** npm does not allow you to delete or overwrite a published version after 72 hours. You must use deprecation and dist-tags.

### 1. Revert the `latest` tag (Recommended Rollback)

If `v0.1.1` is broken, point the `latest` tag back to the stable `v0.1.0` release so that new users running `npx sectloom` automatically get the working version:

```bash
npm dist-tag add sectloom@0.1.0 latest
```

### 2. Deprecate the broken version

Warn users who explicitly install the broken version:

```bash
npm deprecate sectloom@"0.1.1" "Critical bug in parsing component schemas. Please use v0.1.0 or wait for v0.1.2."
```

### 3. Publish a patched version

Fix the bug locally, bump the version in `package.json` to `0.1.2`, and publish normally:

```bash
cd packages/cli
npm run build
npm publish
```

This automatically updates the `latest` dist-tag to point to `v0.1.2`.
