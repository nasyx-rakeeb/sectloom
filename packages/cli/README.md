# Sectloom CLI

The official command-line interface for the Sectloom component platform.

Sectloom provides production-ready, beautiful React sections for your applications. Our components are designed for Next.js App Router, using strict TypeScript and Tailwind CSS v4.

## Installation

You do not need to install the CLI globally. You can run it on demand using `npx`:

```bash
npx sectloom init
npx sectloom add hero-efficiency
```

## Commands

### `init`
Initializes your Next.js project with Sectloom. This command:
- Ensures you have a compatible Next.js and Tailwind CSS v4 setup.
- Injects the required Sectloom semantic CSS tokens into your global stylesheet.
- Creates a local `sectloom.json` configuration file.

```bash
npx sectloom init
```

### `list`
Lists all available production components currently in the public Sectloom registry.

```bash
npx sectloom list
```

### `add <component>`
Installs a component from the registry into your local project. This command:
- Downloads the exact `.tsx` source code for the component.
- Automatically installs any required third-party dependencies (like `lucide-react`).
- Writes the component to your configured components directory.

```bash
npx sectloom add contact-grid
```

### `diff <component>`
Shows a preview of the changes that will be made if you update or reinstall an existing component.

```bash
npx sectloom diff contact-grid
```

### `doctor`
Checks your Next.js project setup to ensure complete compatibility with Sectloom requirements.

```bash
npx sectloom doctor
```

## Requirements
- Next.js >= 14.0.0 (App Router)
- React >= 18
- Tailwind CSS v4
- TypeScript

## Links
- [Sectloom Website](https://sectloom.vercel.app)
- [GitHub Repository](https://github.com/nasyx-rakeeb/sectloom)
