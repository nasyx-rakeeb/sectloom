import { Metadata } from 'next';
import Link from 'next/link';
import { DocContent } from '@/components/docs/doc-content';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/site';
import { TechArticleJsonLd, BreadcrumbJsonLd } from '@/lib/seo/json-ld';

export const metadata: Metadata = {
  title: 'Introduction',
  description:
    'Welcome to the Sectloom documentation. Discover how to build beautiful, modern Next.js interfaces with our component library.',
  alternates: {
    canonical: `${siteConfig.url}/docs`,
  },
};

export default function DocsPage() {
  return (
    <>
      <TechArticleJsonLd
        headline="Introduction to Sectloom"
        description={metadata.description as string}
        url={`${siteConfig.url}/docs`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Docs', url: `${siteConfig.url}/docs` },
        ]}
      />
      <DocContent
        title="Introduction"
        description="Beautifully designed sections and components that you can copy and paste into your apps. Accessible. Customizable. Open Source."
        href="/docs"
      >
        <p>
          Sectloom is a collection of reusable, production-ready React sections
          and components. We focus on providing high-quality, accessible
          building blocks for Next.js applications that you own completely.
        </p>

        <p>
          This is <strong>NOT</strong> a component library that you install via
          npm. It's a collection of reusable code that you can copy and paste or
          install via our CLI directly into your codebase.
        </p>

        <h2>Source-code Distribution</h2>
        <p>
          Unlike traditional UI libraries where you import opaque components
          from node_modules, Sectloom uses source-code distribution. When you
          add a component via the CLI, the actual TypeScript React (`.tsx`) code
          is downloaded into your project's components directory.
        </p>
        <p>This approach means:</p>
        <ul>
          <li>
            <strong>You own the code:</strong> You can modify the markup, change
            the styles, and adapt the behavior to fit your exact needs.
          </li>
          <li>
            <strong>No bloat:</strong> You only add the code for the components
            you actually use.
          </li>
          <li>
            <strong>Less lock-in:</strong> The components are built with
            standard tools (Tailwind CSS, React) and aren't tied to a
            proprietary runtime.
          </li>
        </ul>

        <Separator className="my-8" />

        <h2>Supported Environments</h2>
        <p>
          Sectloom components are designed for modern React stacks. Our official
          support targets:
        </p>
        <ul>
          <li>
            <strong>Framework:</strong> Next.js 14+ (App Router specifically)
          </li>
          <li>
            <strong>UI Library:</strong> React 18+
          </li>
          <li>
            <strong>Language:</strong> TypeScript
          </li>
          <li>
            <strong>Styling:</strong> Tailwind CSS v4 (using the{' '}
            <code>@theme</code> syntax)
          </li>
        </ul>
        <p>
          While the code can be adapted for other environments (like Vite,
          Remix, or older Tailwind versions), our CLI and components are
          optimized for this specific stack.
        </p>

        <Separator className="my-8" />

        <h2>Quick Overview</h2>
        <p>
          Getting started is as simple as running a few commands in your Next.js
          project:
        </p>

        <pre>
          <code>npx sectloom init</code>
        </pre>
        <p>
          This validates your project, configures the section destination, and
          creates a <code>sectloom.json</code> file without modifying global
          styles.
        </p>

        <pre>
          <code>npx sectloom add hero-efficiency</code>
        </pre>
        <p>
          This command downloads the requested section, installs any necessary
          npm dependencies when required, and places the exact preview-matching
          source in your components directory.
        </p>

        <Separator className="my-8" />

        <h2>Next Steps</h2>
        <ul>
          <li>
            <Link href="/docs/getting-started">Getting Started</Link> - Full
            installation guide and walkthrough.
          </li>
          <li>
            <Link href="/docs/cli">CLI Reference</Link> - Learn about all
            available CLI commands.
          </li>
          <li>
            <Link href="/docs/components">Using Components</Link> - Understand
            how to use and customize downloaded sections.
          </li>
        </ul>
      </DocContent>
    </>
  );
}
