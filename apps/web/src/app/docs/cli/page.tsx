import { Metadata } from 'next';
import { DocContent } from '@/components/docs/doc-content';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/site';
import { TechArticleJsonLd, BreadcrumbJsonLd } from '@/lib/seo/json-ld';

export const metadata: Metadata = {
  title: 'CLI Reference',
  description:
    'Detailed documentation for the Sectloom Command Line Interface.',
  alternates: {
    canonical: `${siteConfig.url}/docs/cli`,
  },
};

export default function CliReferencePage() {
  return (
    <>
      <TechArticleJsonLd
        headline="Sectloom CLI Reference"
        description={metadata.description as string}
        url={`${siteConfig.url}/docs/cli`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Docs', url: `${siteConfig.url}/docs` },
          { name: 'CLI Reference', url: `${siteConfig.url}/docs/cli` },
        ]}
      />
      <DocContent
        title="CLI Reference"
        description="Use the sectloom CLI to manage components and sections in your Next.js project."
        href="/docs/cli"
      >
        <p>
          The Sectloom Command Line Interface (CLI) is the primary tool for
          adding, checking, and managing sections in your projects. It runs via{' '}
          <code>npx</code>, ensuring you always use the latest registry data.
        </p>

        <Separator className="my-8" />

        <h2>init</h2>
        <p>
          Initializes a project by validating its environment, resolving the
          component destination, and creating a <code>sectloom.json</code>{' '}
          configuration file. It does not modify your global stylesheet.
        </p>
        <pre>
          <code>npx sectloom init [options]</code>
        </pre>
        <h3>Options</h3>
        <ul>
          <li>
            <code>-c, --cwd &lt;cwd&gt;</code>: The working directory. Defaults
            to the current directory.
          </li>
          <li>
            <code>-y, --yes</code>: Skip confirmation prompts and use default
            values for everything.
          </li>
        </ul>
        <Separator className="my-8" />

        <h2>add</h2>
        <p>
          Downloads a component from the registry and adds it to your project.
          It will automatically resolve and install any required dependencies.
        </p>
        <pre>
          <code>npx sectloom add &lt;name&gt; [options]</code>
        </pre>
        <h3>Arguments</h3>
        <ul>
          <li>
            <code>&lt;name&gt;</code>: The section name to install, such as{' '}
            <code>hero-efficiency</code>.
          </li>
        </ul>
        <p>
          Adding a section overwrites its managed files by default. Run{' '}
          <code>sectloom diff &lt;name&gt;</code> and commit local changes
          before reinstalling a customized section.
        </p>
        <h3>Options</h3>
        <ul>
          <li>
            <code>-c, --cwd &lt;cwd&gt;</code>: The working directory to install
            components into.
          </li>
          <li>
            <code>-y, --yes</code>: Accept all prompts and install silently.
          </li>
          <li>
            <code>-d, --dry-run</code>: Preview the changes without modifying
            any files or installing dependencies.
          </li>
        </ul>

        <Separator className="my-8" />

        <h2>list</h2>
        <p>
          Fetches and lists all available components from the public Sectloom
          registry.
        </p>
        <pre>
          <code>npx sectloom list</code>
        </pre>

        <Separator className="my-8" />

        <h2>diff</h2>
        <p>
          Compares your locally installed components against their original
          versions in the registry. Useful if you've modified a component or if
          you want to see if an update is available.
        </p>
        <pre>
          <code>npx sectloom diff [component] [options]</code>
        </pre>
        <h3>Options</h3>
        <ul>
          <li>
            <code>-c, --cwd &lt;cwd&gt;</code>: The working directory.
          </li>
        </ul>
        <p>
          If no component is provided, the CLI will interactively let you select
          an installed component to check.
        </p>

        <Separator className="my-8" />

        <h2>doctor</h2>
        <p>
          Analyzes your project setup and verifies that Sectloom is correctly
          configured.
        </p>
        <pre>
          <code>npx sectloom doctor [options]</code>
        </pre>
        <p>This command checks for:</p>
        <ul>
          <li>A valid Next.js App Router environment.</li>
          <li>Correct TypeScript configurations.</li>
          <li>Tailwind CSS v4 presence.</li>
          <li>
            Properly formatted <code>sectloom.json</code> setup.
          </li>
        </ul>

        <Separator className="my-8" />

        <h2>Common Errors</h2>
        <h3>"sectloom.json not found"</h3>
        <p>
          You attempted to run <code>add</code> or <code>diff</code> in a
          directory that hasn't been initialized. Run{' '}
          <code>npx sectloom init</code> first.
        </p>

        <h3>"Component not found in registry"</h3>
        <p>
          The component name you provided doesn't exist. Check spelling or run{' '}
          <code>npx sectloom list</code> for valid names.
        </p>
      </DocContent>
    </>
  );
}
