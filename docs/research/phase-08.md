# Phase 08: Public Registry Hosting and Website Deployment Research

## Next.js Deployment Behavior on Vercel
- **Automatic Optimization:** Next.js automatically sets Cache-Control headers based on data-fetching methods (e.g., static, ISR, or dynamic).
- **Registry Static Files:** Our registry primarily outputs static `.json` files in the `public/` directory (or statically served endpoints), which Vercel will cache at the edge automatically with long TTLs. We can use immutable hashing (like we do with ETags or chunk names) to ensure robust caching.
- **Route Handlers & Headers:** If we dynamically serve any items or if we rely on Next.js config for static routes, we must be careful not to override standard caching unnecessarily.

## CORS Configuration
- **Registry API / Static Files:** The Sectloom CLI needs to make requests to the registry (e.g., `https://sectloom.dev/registry/items.json`).
- **Static Assets:** Static files served from `public/` in Next.js might need `next.config.mjs` header overrides to explicitly set `Access-Control-Allow-Origin: *` to ensure the CLI can fetch them from any terminal environment or browser.
- **Vercel API Routes:** If we were to use API routes, we would configure CORS directly in the `OPTIONS` handler or via `middleware.ts`. Since our registry is statically built into the `public/` folder, `next.config.mjs` headers configuration is the standard approach for static assets.

```javascript
// next.config.mjs
async headers() {
  return [
    {
      source: "/registry/:path*",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS" },
      ],
    },
  ];
}
```

## Immutable Asset Caching
- Vercel automatically caches Next.js static assets immutably.
- Since we generate static JSON in `apps/web/public/registry` during the build process, these files will be deployed as static files to Vercel's Edge Network.

## Domain Configuration
- The intended public domain is `https://sectloom.dev`.
- Vercel handles custom domains seamlessly through its dashboard or CLI by verifying DNS records.

## Outstanding Decisions & Next Steps
- We need the deployment credentials or a linked Vercel project to proceed. 
- We must verify that `next.config.mjs` applies the CORS headers properly so the CLI can function against the production endpoint.
