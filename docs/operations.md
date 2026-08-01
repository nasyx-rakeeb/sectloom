# Sectloom Operations Manual

This document outlines the standard operating procedures for the Sectloom component platform, including how to add components, release updates, and respond to incidents.

## System Architecture Overview

- **Component Source of Truth**: `/packages/components/src/sections/`
- **Registry Generator**: `/packages/registry/src/build.ts`
- **Component Index Metadata**: `/packages/registry/src/metadata.ts`
- **Web App**: `/apps/web/`
- **CLI Installer**: `/packages/cli/`
- **Image CDN**: Cloudflare R2 bucket (`sectloom-registry`)

## 1. Adding a New Component

1. **Author the Component**: Create the `.tsx` file inside `packages/components/src/sections/<category>/`. Ensure it uses Tailwind CSS v4 semantic variables (no hardcoded colors except where absolutely necessary for branding) and strict TypeScript.
2. **Take Preview Assets**: Render the component in a clean Next.js app, capture screenshots (1440px desktop, 390px mobile, light and dark themes).
3. **Upload Assets**: Upload the images to the Cloudflare R2 bucket `sectloom-registry` at the path `/images/<category>/<image-name>.jpg`. Ensure headers are set to `Cache-Control: public, max-age=31536000, immutable`.
4. **Register Metadata**: Edit `packages/registry/src/metadata.ts` and add a new entry to the `registryComponents` array. Ensure the `name` is URL-safe and unique. Add the explicit dependencies and required tokens.
5. **Verify**: Run `npm run build` in the workspace root to ensure `packages/registry` builds without validation errors and schemas are correct.

## 2. Registry & Website Release

Releasing a component automatically deploys it to the public website and the registry endpoints consumed by the CLI.

1. Commit your changes to the `main` branch.
2. Push to GitHub.
3. Vercel automatically triggers a build. During the `apps/web` build process, the registry script generates the static JSON files, which are then copied to the Vercel Edge network via `public/registry`.
4. Verify the deployment at `https://sectloom.vercel.app`.
5. Run `npx sectloom list` to ensure the new component appears.

## 3. CLI Release

The CLI should only be updated if there is a bug in the installer script or a new CLI feature (like Next.js v16 compatibility). Component additions do NOT require a CLI release!

1. Update the `version` field in `packages/cli/package.json`.
2. Commit the change (`git commit -m "chore: bump cli version to vX.Y.Z"`).
3. Build the CLI: `cd packages/cli && npm run build`.
4. Publish the package: `npm publish`.
5. Tag the release: `git tag vX.Y.Z && git push --tags`.

## 4. Rollback & Incident Response

### Vercel Deployment Breakage

If a broken component causes the Next.js website to crash:

1. Open the Vercel Dashboard.
2. Navigate to Deployments.
3. Select the previous stable deployment and click **Redeploy** to instantly rollback.
4. Push a `git revert` to the GitHub repository to match production state.

### CLI Breakage

If a published `sectloom` version on npm is fundamentally broken:

1. **Change the Latest Tag**: `npm dist-tag add sectloom@<previous-stable-version> latest`
2. **Deprecate the Broken Version**: `npm deprecate sectloom@"<broken-version>" "Critical issue detected, please use the previous version."`
3. Push a fix and release a patch version.

### CDN Failure

If the `media.sectloom.dpdns.org` Cloudflare endpoint goes offline:

- Verify the DNS resolution at `dpdns.org`.
- Verify the Cloudflare R2 bucket permissions.
- In worst-case scenarios, fallback preview images can be committed directly to `apps/web/public` and the absolute URLs in `metadata.ts` temporarily modified.
