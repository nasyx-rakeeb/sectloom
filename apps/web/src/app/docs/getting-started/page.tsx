import { Metadata } from 'next';
import { DocContent } from '@/components/docs/doc-content';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/site';
import { TechArticleJsonLd, BreadcrumbJsonLd } from '@/lib/seo/json-ld';

export const metadata: Metadata = {
  title: 'Getting Started',
  description:
    'Learn how to set up your Next.js project with Sectloom and start building beautiful interfaces.',
  alternates: {
    canonical: `${siteConfig.url}/docs/getting-started`,
  },
};

export default function GettingStartedPage() {
  return (
    <>
      <TechArticleJsonLd
        headline="Getting Started with Sectloom"
        description={metadata.description as string}
        url={`${siteConfig.url}/docs/getting-started`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Docs', url: `${siteConfig.url}/docs` },
          {
            name: 'Getting Started',
            url: `${siteConfig.url}/docs/getting-started`,
          },
        ]}
      />
      <DocContent
        title="Getting Started"
        description="Set up Sectloom in your Next.js project and build your first page."
        href="/docs/getting-started"
      >
        <h2>Prerequisites</h2>
        <p>
          Before installing Sectloom components, ensure your project meets the
          following requirements:
        </p>
        <ul>
          <li>
            A <strong>Next.js App Router</strong> project (v14 or higher).
          </li>
          <li>
            <strong>TypeScript</strong> configured.
          </li>
          <li>
            <strong>Tailwind CSS v4</strong> set up in your project.
          </li>
        </ul>

        <Separator className="my-8" />

        <h2>Installation</h2>

        <h3>Step 1: Initialize Sectloom</h3>
        <p>
          Run the init command in the root of your Next.js project to set up the
          CLI configuration.
        </p>
        <pre>
          <code>npx sectloom init</code>
        </pre>
        <p>This command will:</p>
        <ul>
          <li>Detect your project structure and CSS files.</li>
          <li>Prompt you to configure your base styling options.</li>
          <li>
            Create a <code>sectloom.json</code> configuration file at your
            project root.
          </li>
        </ul>

        <h3>Step 2: Browse Available Sections</h3>
        <p>
          Visit <a href="/components">sectloom.vercel.app/components</a> to
          browse our collection of sections and find what you need for your
          page. You can also use the CLI to list components:
        </p>
        <pre>
          <code>npx sectloom list</code>
        </pre>

        <h3>Step 3: Add a Component</h3>
        <p>
          Once you've found a section you want to use, run the add command with
          the component name.
        </p>
        <pre>
          <code>npx sectloom add hero-efficiency</code>
        </pre>
        <p>This command performs several actions automatically:</p>
        <ul>
          <li>
            Downloads the <code>hero-efficiency.tsx</code> source code to your
            configured components directory (e.g.,{' '}
            <code>src/components/sectloom/</code>).
          </li>
          <li>
            Installs any necessary external dependencies like{' '}
            <code>lucide-react</code> or <code>framer-motion</code>.
          </li>
          <li>
            Adds any internal component dependencies required by the section.
          </li>
        </ul>

        <h3>Step 4: Use the Component</h3>
        <p>
          You can now import and use the downloaded component in your Next.js
          pages. Because it's distributed as source code, it's just another file
          in your project.
        </p>
        <pre>
          <code>{`import { HeroEfficiency } from '@/components/sectloom/hero-efficiency';

export default function HomePage() {
  return (
    <main>
      <HeroEfficiency 
        title="Build faster" 
        subtitle="With beautifully crafted sections." 
      />
    </main>
  );
}`}</code>
        </pre>

        <h3>Step 5: Customize and Adapt</h3>
        <p>
          The true power of source-code distribution is the ability to adapt the
          components completely. Open the file located at{' '}
          <code>src/components/sectloom/hero-efficiency.tsx</code> and modify
          the Tailwind classes, change the semantic HTML elements, or extend the
          prop interfaces as you see fit.
        </p>
        <p>
          It is <strong>your</strong> code now.
        </p>
      </DocContent>
    </>
  );
}
