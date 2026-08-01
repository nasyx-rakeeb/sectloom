# Deployment Runbook

This document outlines the deployment architecture, release procedures, and rollback instructions for the Sectloom platform.

## Architecture

The Sectloom platform consists of three publicly accessible parts:

1. **Public Website** (`https://sectloom.vercel.app`): A Next.js App Router application hosted on Vercel.
2. **Public Registry** (`https://sectloom.vercel.app/registry`): Static JSON metadata and component source files served directly from the Vercel Edge Network.
3. **Asset Storage** (`https://media.sectloom.dpdns.org`): A Cloudflare R2 bucket holding all static images and preview assets.

## Deployment Process

### 1. Website & Registry Deployment

Vercel is configured to automatically build and deploy every push to the `main` branch.

**Build Steps Executed by Vercel:**

- Vercel detects the Turborepo workspace.
- `apps/web` is set as the Root Directory.
- Vercel automatically runs `turbo run build`.
- The `apps/web` build script runs: `mkdir -p public/registry && cp ../../packages/registry/public/*.json public/registry/ && next build`.
- The registry JSON files are copied into the `public/` directory so Vercel can serve them statically.

**Manual Redeploy:**
If a build fails or you need to manually force a deployment:

1. Go to the Vercel Dashboard -> Sectloom project.
2. Navigate to the **Deployments** tab.
3. Click the `...` next to the latest commit and select **Redeploy**.

### 2. Asset Upload (Cloudflare R2)

Image assets (like component previews) are hosted on Cloudflare R2. When new components are added to the registry, their images must be uploaded to the `sectloom-registry` bucket before the website is deployed.

**To upload new images:**
You can use the R2 management console or the AWS SDK (`s3.send(new PutObjectCommand(...))`) as done in the `upload-r2.mjs` script. Be sure to configure the correct `ContentType` and `CacheControl` headers (`public, max-age=31536000, immutable`).

## Rollback Instructions

### 1. Website/Registry Rollback (Vercel)

If a bad component registry update or broken UI is pushed to `main`, you can instantly rollback the Vercel deployment without waiting for a git revert.

1. Go to the Vercel Dashboard -> Sectloom project -> **Deployments**.
2. Find the previous stable deployment in the list.
3. Click the `...` menu on the right.
4. Select **Promote to Production** (or **Assign Custom Domains** depending on Vercel's current UI terminology).
5. The rollback is instant. Once stable, apply a `git revert` to the repository so the codebase matches production.

### 2. Asset Rollback (Cloudflare R2)

If a bad image was uploaded, you can simply overwrite it by uploading a corrected image with the exact same filename and path to the bucket. Because the registry JSON uses absolute URLs, updating the image in the bucket instantly updates the image shown on the website and downloaded by the CLI.
