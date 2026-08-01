import { Metadata } from 'next';
import { DocContent } from '@/components/docs/doc-content';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/site';
import { TechArticleJsonLd, BreadcrumbJsonLd } from '@/lib/seo/json-ld';

export const metadata: Metadata = {
  title: 'Theming',
  description:
    'Learn how the semantic token architecture powers Sectloom sections and how to customize them for your brand using Tailwind CSS v4.',
  alternates: {
    canonical: `${siteConfig.url}/docs/theming`,
  },
};

export default function ThemingPage() {
  return (
    <>
      <TechArticleJsonLd
        headline="Theming in Sectloom"
        description={metadata.description as string}
        url={`${siteConfig.url}/docs/theming`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Docs', url: `${siteConfig.url}/docs` },
          { name: 'Theming', url: `${siteConfig.url}/docs/theming` },
        ]}
      />
      <DocContent
        title="Theming"
        description="Customize the look and feel of your components using our robust semantic token architecture with Tailwind CSS v4."
        href="/docs/theming"
      >
        <p>
          Sectloom sections avoid hardcoding specific utility colors (like{' '}
          <code>bg-blue-500</code>). Instead, they rely on a semantic CSS
          variable architecture. This ensures that when you drop a section into
          your project, it instantly adopts your brand colors and perfectly
          respects light and dark modes.
        </p>

        <Separator className="my-8" />

        <h2>Semantic Token Architecture</h2>
        <p>
          We leverage Tailwind CSS v4's <code>@theme</code> directive to bind
          CSS variables to Tailwind utility classes. During initialization,
          Sectloom configures your global CSS to define these variables.
        </p>
        <p>
          By using variables like <code>var(--primary)</code>, components remain
          portable and highly adaptable.
        </p>

        <h3>Color Roles</h3>
        <p>
          The following color roles are available and used extensively
          throughout the components:
        </p>
        <ul>
          <li>
            <code>--background</code> & <code>--foreground</code>: Default body
            colors.
          </li>
          <li>
            <code>--primary</code> & <code>--primary-foreground</code>: Primary
            brand colors used for main CTAs and highlights.
          </li>
          <li>
            <code>--secondary</code> & <code>--secondary-foreground</code>:
            Secondary elements, softer backgrounds.
          </li>
          <li>
            <code>--muted</code> & <code>--muted-foreground</code>: Muted text,
            subtle borders, and inactive states.
          </li>
          <li>
            <code>--accent</code> & <code>--accent-foreground</code>:
            Highlighted interactive states, hover effects.
          </li>
          <li>
            <code>--destructive</code> & <code>--destructive-foreground</code>:
            Error states, delete buttons.
          </li>
          <li>
            <code>--border</code>, <code>--input</code>, <code>--ring</code>:
            Form elements, structural borders, and focus rings.
          </li>
        </ul>

        <h3>Radii and Containers</h3>
        <p>
          We also tokenize border radii and container widths to maintain
          consistent spacing and curvature:
        </p>
        <ul>
          <li>
            <strong>Radii:</strong> <code>--radius-sm</code>,{' '}
            <code>--radius-md</code>, <code>--radius-lg</code>,{' '}
            <code>--radius-xl</code>
          </li>
          <li>
            <strong>Containers:</strong> <code>--container-sm</code>,{' '}
            <code>--container-md</code>, <code>--container-lg</code>,{' '}
            <code>--container-xl</code>, <code>--container-2xl</code>
          </li>
          <li>
            <strong>Section Spacing:</strong> <code>--section-sm</code>,{' '}
            <code>--section-md</code>, <code>--section-lg</code>,{' '}
            <code>--section-xl</code>
          </li>
        </ul>

        <Separator className="my-8" />

        <h2>Light and Dark Mode</h2>
        <p>
          Theming is controlled at the root of your application via a standard
          CSS file (often <code>globals.css</code>). The variables are redefined
          under the <code>.dark</code> class (or{' '}
          <code>@media (prefers-color-scheme: dark)</code>) to provide dark mode
          support.
        </p>
        <pre>
          <code>{`@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    /* ... other variables */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    /* ... dark mode variables */
  }
}`}</code>
        </pre>
        <p>
          Note: We use HSL values without the functional wrapper (e.g.,{' '}
          <code>210 40% 98%</code> instead of <code>hsl(210, 40%, 98%)</code>).
          This allows Tailwind to inject opacity modifiers cleanly when you use
          classes like <code>bg-primary/50</code>.
        </p>

        <Separator className="my-8" />

        <h2>Customizing Your Brand</h2>
        <p>
          To change the theme, you simply open your <code>globals.css</code>{' '}
          file and modify the values in the <code>:root</code> and{' '}
          <code>.dark</code> selectors. Every Sectloom component in your project
          will instantly reflect the updated styles.
        </p>
        <p>
          If you need to introduce new colors (e.g., a "brand" color), you can
          add it to your <code>@theme</code> definition inside your CSS.
        </p>
      </DocContent>
    </>
  );
}
