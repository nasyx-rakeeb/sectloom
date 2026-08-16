import Link from 'next/link';
import {
  ArrowRight,
  Braces,
  Download,
  PencilLine,
  Terminal,
} from 'lucide-react';
import { CardCopyButton } from '@/components/catalog/card-copy-button';
import { ComponentCard } from '@/components/catalog/component-card';
import { getAllComponents, getCategories } from '@/lib/registry/data';
import { siteConfig } from '@/config/site';
import { SoftwareApplicationJsonLd, WebSiteJsonLd } from '@/lib/seo/json-ld';

export const metadata = {
  title: {
    absolute: 'Sectloom — Production-ready sections for Next.js',
  },
  description: siteConfig.description,
};

const FEATURED_NAMES = [
  'hero-pylon-support',
  'blog-header-section-reevo-mission',
  'pricing-poch-packages',
  'feature-deck-workflows',
  'testimonial-steno-carousel',
];

const STEPS = [
  {
    number: '01',
    icon: Braces,
    title: 'Choose a complete section',
    description:
      'Browse by page role, compare the actual design, and pick the section that already has the right point of view.',
  },
  {
    number: '02',
    icon: Download,
    title: 'Install the editable source',
    description:
      'One CLI command adds the TSX and required packages directly to your application.',
  },
  {
    number: '03',
    icon: PencilLine,
    title: 'Make it yours',
    description:
      'Change the copy, data, artwork, and behavior in code you own. No wrapper API and no runtime lock-in.',
  },
];

export default function HomePage() {
  const categories = getCategories();
  const components = getAllComponents();
  const componentMap = new Map(
    components.map((component) => [component.name, component])
  );
  const featured = FEATURED_NAMES.flatMap((name) => {
    const component = componentMap.get(name);
    return component ? [component] : [];
  });
  const quickStartCommand =
    'npx sectloom init && npx sectloom add hero-pylon-support';

  return (
    <>
      <WebSiteJsonLd />
      <SoftwareApplicationJsonLd />

      <div className="surface-solid border-b editorial-rule">
        <section className="mx-auto max-w-[1600px] px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-16 lg:px-10 lg:pb-36 lg:pt-20">
          <div className="flex min-w-0 items-center justify-between gap-3 border-y editorial-rule py-3 font-mono text-[9px] uppercase tracking-[0.13em] text-muted-foreground sm:text-[10px] sm:tracking-[0.18em]">
            <span>Open-source section library</span>
            <span className="shrink-0 text-right">
              {String(components.length).padStart(3, '0')} sections available
            </span>
          </div>

          <div className="mt-10 grid gap-14 lg:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.55fr)] lg:items-end lg:gap-16">
            <div>
              <h1 className="text-balance max-w-[15ch] font-display text-[clamp(4.5rem,9.2vw,10.5rem)] leading-[0.82] tracking-[-0.065em]">
                A better start than a blank page.
              </h1>
              <div className="mt-10 flex flex-col gap-7 border-t editorial-rule pt-6 sm:flex-row sm:items-end sm:justify-between">
                <p className="text-pretty max-w-[46ch] text-lg leading-8 text-muted-foreground sm:text-xl">
                  Install complete, production-ready Next.js sections as
                  editable TSX. Keep the design. Own every line.
                </p>
                <div className="flex shrink-0 items-center gap-5">
                  <Link
                    href="/components/hero"
                    className="inline-flex min-h-12 items-center gap-3 rounded-sm bg-accent px-5 text-sm font-bold text-accent-foreground transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Browse sections
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href="/docs"
                    className="text-sm font-semibold underline decoration-1 underline-offset-4 hover:decoration-2"
                  >
                    Read docs
                  </Link>
                </div>
              </div>
            </div>

            <aside className="bg-[#161712] p-5 text-[#f4f2e9] shadow-[0_24px_70px_-38px_rgba(38,39,31,.8)] sm:p-6">
              <div className="flex items-center justify-between border-b border-white/20 pb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                <span>Start here</span>
                <Terminal className="size-4" />
              </div>
              <p className="mt-9 font-display text-4xl leading-[0.98] tracking-[-0.035em]">
                One command. The real source.
              </p>
              <div className="mt-10 flex items-center justify-between gap-3 border-y border-white/20 py-4 font-mono text-xs text-white/70">
                <code className="truncate">{quickStartCommand}</code>
                <CardCopyButton text={quickStartCommand} />
              </div>
              <dl className="mt-8 grid grid-cols-2 gap-5">
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/40">
                    Output
                  </dt>
                  <dd className="mt-2 text-sm font-semibold">Editable TSX</dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/40">
                    Stack
                  </dt>
                  <dd className="mt-2 text-sm font-semibold">
                    Next.js + Tailwind
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>
      </div>

      <section className="surface-solid border-b editorial-rule py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 border-b editorial-rule pb-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Selected work / 2026
            </p>
            <div className="lg:text-right">
              <h2 className="text-balance font-display text-[clamp(3.5rem,6.6vw,7.8rem)] leading-[0.86] tracking-[-0.055em]">
                Sections with a point of view.
              </h2>
              <p className="mt-5 text-muted-foreground">
                Every preview is the section you install—not a theme-swapped
                approximation.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-16 lg:grid-cols-12">
            {featured.map((component, index) => (
              <ComponentCard
                key={component.name}
                item={component}
                priority={index < 2}
                className={index < 2 ? 'lg:col-span-6' : 'lg:col-span-4'}
              />
            ))}
          </div>

          <div className="mt-14 flex justify-end border-t editorial-rule pt-5">
            <Link
              href="/components/hero"
              className="group inline-flex items-center gap-3 text-sm font-bold"
            >
              View the full collection
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="surface-solid border-b editorial-rule py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.55fr_1.45fr] lg:px-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Browse by role
            </p>
            <h2 className="mt-4 font-display text-5xl leading-[0.9] tracking-[-0.045em] sm:text-6xl">
              Find the next part of your page.
            </h2>
          </div>
          <nav
            aria-label="Section categories"
            className="border-t editorial-rule"
          >
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/components/${category.slug}`}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b editorial-rule py-4 transition-colors hover:bg-accent/40 sm:grid-cols-[3.5rem_1fr_auto] sm:py-5"
              >
                <span className="font-mono text-[10px] text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-xl font-semibold tracking-[-0.035em] sm:text-2xl">
                  {category.title}
                </span>
                <span className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  {category.componentCount}{' '}
                  {category.componentCount === 1 ? 'section' : 'sections'}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="surface-solid py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                How it works
              </p>
              <h2 className="text-balance mt-4 max-w-[10ch] font-display text-[clamp(3.5rem,6vw,7rem)] leading-[0.88] tracking-[-0.05em]">
                From reference to working page.
              </h2>
            </div>
            <ol className="border-t editorial-rule">
              {STEPS.map((step) => (
                <li
                  key={step.number}
                  className="grid gap-4 border-b editorial-rule py-7 sm:grid-cols-[4rem_3rem_1fr] sm:items-start"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {step.number}
                  </span>
                  <step.icon className="size-6" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.03em]">
                      {step.title}
                    </h3>
                    <p className="text-pretty mt-2 max-w-[58ch] leading-7 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-24 grid gap-8 bg-accent p-7 text-accent-foreground sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:p-14">
            <h2 className="text-balance max-w-[12ch] font-display text-[clamp(3.5rem,6.5vw,7.5rem)] leading-[0.85] tracking-[-0.055em]">
              Your next page already has a first draft.
            </h2>
            <div className="lg:justify-self-end">
              <p className="max-w-[38ch] text-lg leading-7">
                Start with a complete section, then change exactly what your
                project needs.
              </p>
              <Link
                href="/components/hero"
                className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-sm bg-[#171814] px-5 text-sm font-bold text-[#f7f6ed] transition-transform hover:-translate-y-0.5"
              >
                Browse all sections
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
