# Sectloom Product

## Overview

Sectloom is a section UI distribution platform for React applications.

### Public Naming Decisions

- **Product / Brand Name:** Sectloom
- **Desired npm Package Name:** sectloom
- **CLI Executable Command:** sectloom
- **Intended Public Domain:** https://sectloom.vercel.app
- **Temporary Local Registry:** http://localhost:3000/registry

### Core Components

1. **Component Registry:** Publicly hosted versioned source of truth for TSX files, metadata, dependencies, semantic tokens, and integrity hashes.
2. **Published npm CLI:** Allow users to install components directly into their Next.js projects via `npx sectloom init` and `npx sectloom add <name>`.
3. **Public Website:** Browse, inspect, and copy installation commands for components.

### Initial Catalog

The initial production catalog will consist of 4 manually crafted, high-quality sections:

- Hero
- CTA
- Contact
- Footer
