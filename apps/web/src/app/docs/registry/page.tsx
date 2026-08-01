import { Metadata } from 'next';
import { DocContent } from '@/components/docs/doc-content';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/site';
import { TechArticleJsonLd, BreadcrumbJsonLd } from '@/lib/seo/json-ld';

export const metadata: Metadata = {
  title: 'Registry',
  description:
    'Understand the architecture behind the Sectloom registry, how components are verified, and how the CLI retrieves metadata.',
  alternates: {
    canonical: `${siteConfig.url}/docs/registry`,
  },
};

export default function RegistryPage() {
  return (
    <>
      <TechArticleJsonLd
        headline="Sectloom Registry Architecture"
        description={metadata.description as string}
        url={`${siteConfig.url}/docs/registry`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Docs', url: `${siteConfig.url}/docs` },
          { name: 'Registry', url: `${siteConfig.url}/docs/registry` },
        ]}
      />
      <DocContent
        title="Registry Architecture"
        description="Deep dive into how the Sectloom component registry operates."
        href="/docs/registry"
      >
        <p>
          The Sectloom registry is not a traditional package manager. It is a
          static, publicly accessible API consisting of compiled JSON files that
          describe available UI components, their dependencies, and their source
          code.
        </p>

        <Separator className="my-8" />

        <h2>Structure and Endpoints</h2>
        <p>
          The registry data is built statically and served directly from the{' '}
          <code>/registry</code> path on the Sectloom domain.
        </p>
        <ul>
          <li>
            <strong>Index:</strong> <code>/registry/index.json</code> — Provides
            a lightweight array of all available components, containing just
            enough metadata (name, title, category) to power the CLI's list and
            search functions.
          </li>
          <li>
            <strong>Component Detail:</strong>{' '}
            <code>/registry/components/[name].json</code> — Contains the
            complete metadata for a single component, including the raw file
            contents.
          </li>
        </ul>

        <Separator className="my-8" />

        <h2>Component Metadata</h2>
        <p>
          Each component definition JSON includes fields that the CLI requires
          to accurately install and manage the component:
        </p>
        <pre>
          <code>{`{
  "name": "hero-efficiency",
  "type": "registry:section",
  "title": "Efficiency Hero",
  "description": "A high-conversion hero section.",
  "dependencies": ["lucide-react"],
  "registryDependencies": ["button"],
  "files": [
    {
      "path": "hero-efficiency.tsx",
      "content": "...raw string content...",
      "type": "registry:page"
    }
  ]
}`}</code>
        </pre>
        <p>Understanding dependencies:</p>
        <ul>
          <li>
            <strong>
              <code>dependencies</code>
            </strong>
            : External npm packages (like <code>lucide-react</code> or{' '}
            <code>date-fns</code>) that the CLI will install into the user's{' '}
            <code>package.json</code>.
          </li>
          <li>
            <strong>
              <code>registryDependencies</code>
            </strong>
            : Internal components (like a <code>button</code> or{' '}
            <code>input</code>) that the CLI needs to download alongside the
            requested section.
          </li>
        </ul>

        <Separator className="my-8" />

        <h2>Integrity Verification</h2>
        <p>
          To ensure security and proper diffing capabilities, the registry
          system utilizes checksums.
        </p>
        <p>
          When the CLI downloads a file, it can compute a SHA-256 hash of the
          downloaded content. If a user later runs the{' '}
          <code>npx sectloom diff</code> command, the CLI computes the hash of
          the local, installed file and compares it against the original hash
          stored in <code>sectloom.json</code> or fetched dynamically from the
          registry.
        </p>

        <Separator className="my-8" />

        <h2>Adding New Components</h2>
        <p>
          Internally, Sectloom manages components in a source repository. To add
          a new component:
        </p>
        <ol>
          <li>
            The raw <code>.tsx</code> file is created in a central registry
            folder.
          </li>
          <li>
            Its metadata is defined in a master <code>registry.ts</code>{' '}
            configuration map.
          </li>
          <li>
            A build script compiles the raw TSX files and the metadata into the
            static JSON files.
          </li>
          <li>
            The static JSON is published, making it immediately available to the
            CLI globally.
          </li>
        </ol>
      </DocContent>
    </>
  );
}
