import { Metadata } from 'next';
import { DocContent } from '@/components/docs/doc-content';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/site';
import { BreadcrumbJsonLd, TechArticleJsonLd } from '@/lib/seo/json-ld';

export const metadata: Metadata = {
  title: 'Customizing sections',
  description:
    'Learn how to customize the exact-fidelity React section source installed by Sectloom.',
  alternates: {
    canonical: `${siteConfig.url}/docs/customization`,
  },
};

export default function CustomizationPage() {
  return (
    <>
      <TechArticleJsonLd
        headline="Customizing Sectloom sections"
        description={metadata.description as string}
        url={`${siteConfig.url}/docs/customization`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Docs', url: `${siteConfig.url}/docs` },
          {
            name: 'Customization',
            url: `${siteConfig.url}/docs/customization`,
          },
        ]}
      />
      <DocContent
        title="Customizing sections"
        description="Sectloom installs the source behind the preview. Edit it like any other code in your project."
        href="/docs/customization"
      >
        <p>
          Every Sectloom section keeps its own visual identity. Its exact
          colors, spacing, typography, radii, imagery, and effects live in the
          installed source instead of a shared Sectloom theme.
        </p>

        <Separator className="my-8" />

        <h2>Start with props</h2>
        <p>
          Use the component&apos;s typed props to replace headings, links,
          images, lists, and actions while preserving the default composition.
          The props table on each catalog page documents the supported content
          inputs.
        </p>

        <h2>Edit the source directly</h2>
        <p>
          Installed files belong to your project. Change Tailwind classes,
          component structure, effects, or supporting styles directly when you
          want the section to depart from its preview.
        </p>
        <pre>
          <code>{`npx sectloom add hero-efficiency

# Then edit:
components/sectloom/hero-efficiency.tsx`}</code>
        </pre>

        <h2>Combining sections</h2>
        <p>
          Sectloom does not automatically recolor unrelated sections to make
          them cohesive. Choose references that work together, or edit their
          installed source to create a shared visual direction for your site.
        </p>

        <h2>Updating safely</h2>
        <p>
          Run <code>sectloom diff &lt;name&gt;</code> before reinstalling a
          section you have customized. Adding the section again overwrites its
          managed files by default, so commit your work before accepting an
          update.
        </p>
      </DocContent>
    </>
  );
}
