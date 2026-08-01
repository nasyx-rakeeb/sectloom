# AI Pipeline Handoff Contract

This document defines the strict integration contract for the deferred internal AI generation pipeline. The AI pipeline is explicitly **not implemented** in the initial platform release, but its future implementation must adhere to these boundaries.

## Architecture Boundary
The AI pipeline's sole responsibility is to translate raw visual references (images/Figma) into raw React TSX components that match the Sectloom design standard. 

The AI pipeline **does not** interact with the public Vercel registry, the npm CLI, or the website. It is an internal authoring tool.

## Input Contract
The AI generation pipeline will consume:
1. `image`: A screenshot of the target component design.
2. `category`: The component category (e.g., `hero`, `cta`, `footer`).

## Output Contract
The AI generation pipeline must produce exactly the following artifacts into the local workspace for human review:

1. **The Component Source (`packages/components/src/sections/<category>/<name>.tsx`)**
   - Must use strict TypeScript.
   - Must be designed for Next.js App Router (Server Component by default, `'use client'` only where strictly necessary).
   - Must use Tailwind CSS v4 utility classes.
   - Must use Sectloom semantic tokens (e.g., `text-muted-foreground`, `bg-background`). No hardcoded hex values!

2. **The Registry Metadata Entry**
   - The AI must output a JSON or TypeScript object matching the `RegistryComponent` Zod schema defined in `packages/contracts/src/registry.ts`.
   - The human author will manually merge this snippet into `packages/registry/src/metadata.ts`.

## Validation Gates & Human Approval
The AI output cannot be deployed automatically. It must pass through the following strict human-in-the-loop gates:
1. **Compilation**: Must pass `npm run typecheck`.
2. **Linting**: Must pass the existing ESLint rules.
3. **Visual Inspection**: A human developer must manually verify the layout at 1440px and 390px, and upload the final verified preview screenshot to Cloudflare R2.
4. **Git Commit**: The human developer commits the AI-generated code to the `main` branch to trigger the standard registry deployment.

## Future Considerations
Do not add LangGraph, custom critics, or LLM SDK dependencies to the core monorepo until the AI pipeline development officially commences in a subsequent product phase. When it does, keep AI dependencies strictly isolated to an `apps/ai-worker` or `packages/ai-generation` workspace package.
