import { Metadata } from 'next';
import { DocContent } from '@/components/docs/doc-content';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/site';
import { TechArticleJsonLd, BreadcrumbJsonLd } from '@/lib/seo/json-ld';

export const metadata: Metadata = {
  title: 'Using Components',
  description:
    'Understand how Sectloom components work, how to import them, and how to customize the source code in your Next.js project.',
  alternates: {
    canonical: `${siteConfig.url}/docs/components`,
  },
};

export default function ComponentsPage() {
  return (
    <>
      <TechArticleJsonLd
        headline="Using Sectloom Components"
        description={metadata.description as string}
        url={`${siteConfig.url}/docs/components`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Docs', url: `${siteConfig.url}/docs` },
          {
            name: 'Using Components',
            url: `${siteConfig.url}/docs/components`,
          },
        ]}
      />
      <DocContent
        title="Using Components"
        description="Learn how to import, consume, and modify installed sections and components."
        href="/docs/components"
      >
        <h2>File Placement</h2>
        <p>
          When you use the CLI to add a component, it writes the file(s) into
          your project's component directory as configured in{' '}
          <code>sectloom.json</code>. By default, this is usually{' '}
          <code>components/sectloom</code> or{' '}
          <code>src/components/sectloom</code> depending on whether you use a{' '}
          <code>src</code> directory.
        </p>
        <p>
          For example, running <code>npx sectloom add hero-split</code> will
          create:
        </p>
        <pre>
          <code>src/components/sectloom/hero-split.tsx</code>
        </pre>

        <Separator className="my-8" />

        <h2>Importing</h2>
        <p>
          Because the files are local to your project, you import them using
          your project's alias (typically <code>@/</code>) rather than from an
          npm package.
        </p>
        <pre>
          <code>{`import { HeroSplit } from '@/components/sectloom/hero-split';`}</code>
        </pre>

        <Separator className="my-8" />

        <h2>Typed Props</h2>
        <p>
          All Sectloom components export strict TypeScript interfaces for their
          props. You can view these directly at the top of the downloaded `.tsx`
          file.
        </p>
        <p>
          If you need to extract the prop type for use in another file, you can
          import it:
        </p>
        <pre>
          <code>{`import type { HeroSplitProps } from '@/components/sectloom/hero-split';`}</code>
        </pre>

        <Separator className="my-8" />

        <h2>Server vs. Client Components</h2>
        <p>
          By default, Sectloom components are engineered to be{' '}
          <strong>React Server Components (RSC)</strong>. This means they
          execute on the server, resulting in zero additional client-side
          JavaScript for the UI rendering itself.
        </p>
        <p>
          If a component requires interactive state (like an accordion, tabs, or
          a form), it will include the <code>"use client"</code> directive at
          the top of the file. The CLI handles this automatically, and because
          of source-code distribution, you can explicitly verify whether a
          section uses client features by opening the file.
        </p>

        <Separator className="my-8" />

        <h2>Dependencies</h2>
        <p>
          Some sections rely on external open-source libraries. For example:
        </p>
        <ul>
          <li>
            <strong>Icons:</strong> <code>lucide-react</code>
          </li>
          <li>
            <strong>Animations:</strong> <code>framer-motion</code>
          </li>
        </ul>
        <p>
          When you run <code>npx sectloom add</code>, the CLI intelligently
          reads the component's metadata from the registry and installs these
          dependencies into your project's <code>package.json</code>{' '}
          automatically.
        </p>

        <Separator className="my-8" />

        <h2>Editing the Code</h2>
        <p>
          The most important concept of Sectloom is that you own the code. You
          are encouraged to modify the downloaded files. Need a different
          breakpoint? Want to swap an image out for a video? Change the code
          directly in <code>hero-split.tsx</code>.
        </p>
        <p>
          To help track changes, <code>sectloom.json</code> stores version and
          checksum information for the components you've installed. You can use
          the <code>diff</code> command to compare your local file against the
          original version if you ever want to see what you modified.
        </p>
        <p>
          Each section intentionally keeps the concrete colors, typography,
          spacing, and effects shown in its preview. Sectloom does not apply a
          global theme or automatically make unrelated sections visually
          consistent.
        </p>
      </DocContent>
    </>
  );
}
