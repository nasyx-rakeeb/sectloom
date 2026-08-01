# Phase 09 Research Notes: npm Release & CLI Publishing

## npm Package Metadata & `npm pack`

- `npm pack` generates a `.tgz` archive of the package exactly as it will be published to the npm registry.
- Crucial metadata fields:
  - `name`: Must be unique on the registry. We have verified that `sectloom` is currently available.
  - `version`: Follows semantic versioning.
  - `bin`: Points to the executable file(s) for `npx` consumption. For `sectloom`, it should point to `dist/index.js`.
  - `files`: An array of file patterns that describes the entries to be included when the package is installed as a dependency. By keeping this minimal (e.g., just `dist/` and `package.json`), we exclude source files, tests, and private docs.
  - `engines`: Specifies the Node.js versions the package works with.

## Authentication and 2FA

- **Local Auth**: To publish, the user must be authenticated locally via `npm login`. (Checked: Currently unauthenticated, returning 401).
- **2FA (Two-Factor Authentication)**: npm enforces 2FA for package publishing for many accounts. When publishing via the CLI, `npm publish` will interactively prompt for an OTP if the account has 2FA enabled for authorization/publishing.
- **Provenance**: Provenance creates cryptographic signed attestations about the build environment linking the package to its source repository. However, provenance requires a cloud-hosted CI/CD environment (like GitHub Actions with OIDC). As instructed by the project phase guidelines, we will _not_ configure CI/CD merely for provenance.

## Scoped vs. Unscoped Packages

- If we publish unscoped as `sectloom`, it will be a public package available via `npx sectloom`.
- If we publish scoped as `@sectloom/cli`, we would need to ensure the `@sectloom` organization is created by the user on npm. By default, scoped packages are published privately, so the command must be `npm publish --access public`.

## 2026 Modern npm Publishing Best Practices

- **Security First**: 2026 focuses heavily on supply-chain security. Trusted Publishing via OIDC is preferred over long-lived tokens for CI/CD environments.
- **Entry Points (`exports`)**: Modern packages should use the `"exports"` field as the source of truth for their public API, replacing the older `"main"` and `"module"` fields. We have added `"exports"` to our `package.json` for completeness.
- **CLI Configuration**: We use the `"bin"` field combined with the `#!/usr/bin/env node` shebang, which remains the correct standard for exposing a CLI tool.
- **Zero-Config Bundlers**: The industry favors fast tools like `tsup` and `esbuild` for bundling dual ESM/CJS packages. We are using `esbuild` which aligns perfectly with this minimal-config approach.
- **Explicit Scoping (`files`)**: Using the `"files"` array to whitelist the `dist` folder prevents accidental publishing of source code or sensitive config files.
- **Type**: Setting `"type": "module"` makes the package default to standard ES Modules.

## Publishing Commands and dist-tags

- `npm publish` pushes the tarball to the registry.
- By default, it publishes to the `latest` dist-tag.
- Beta releases can use `npm publish --tag beta`.
- **Deprecation / Rollback**: If a published version is broken, npm does not allow overwriting or unpublishing (past 72 hours). The standard rollback procedure is to use `npm deprecate <pkg>@"<version>" "message"` and publish a patched version, or update the `latest` tag to point to a previous version using `npm dist-tag add <pkg>@<old-version> latest`.
