import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import {
  getComponentBySlug,
  getComponentsByCategory,
  getPrevNextComponents,
  generateComponentParams,
} from '@/lib/registry/data';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { InstallCommand } from '@/components/catalog/install-command';
import { ComponentCode } from '@/components/catalog/component-code';
import { ComponentPrevNext } from '@/components/navigation/component-prev-next';
import { BreadcrumbJsonLd, TechArticleJsonLd } from '@/lib/seo/json-ld';

interface ComponentPageProps {
  params: {
    category: string;
    component: string;
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return generateComponentParams();
}

export function generateMetadata({ params }: ComponentPageProps): Metadata {
  const component = getComponentBySlug(params.category, params.component);
  if (!component) return {};

  return {
    title: component.title,
    description: component.description,
    alternates: {
      canonical: `/components/${params.category}/${params.component}`,
    },
    openGraph: {
      title: `${component.title} - ${siteConfig.name}`,
      description: component.description,
      type: 'article',
      url: `${siteConfig.url}/components/${params.category}/${params.component}`,
      images: [
        {
          url: component.previewAssets[0]?.url || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: component.title,
        },
      ],
    },
  };
}

export default function ComponentPage({ params }: ComponentPageProps) {
  const component = getComponentBySlug(params.category, params.component);

  if (!component) {
    notFound();
  }

  const { prev, next } = getPrevNextComponents(
    params.category,
    params.component
  );
  const breadcrumbItems = [
    { name: 'Home', url: `${siteConfig.url}/` },
    { name: 'Components', url: `${siteConfig.url}/components` },
    {
      name: component.category,
      url: `${siteConfig.url}/components/${component.category}`,
    },
    {
      name: component.title,
      url: `${siteConfig.url}/components/${component.category}/${component.name}`,
    },
  ];

  const sourceCode = component.files[0]?.content || '';

  return (
    <div className="space-y-12 pb-16">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <TechArticleJsonLd
        headline={component.title}
        description={component.description || ''}
        url={`${siteConfig.url}/components/${component.category}/${component.name}`}
      />

      <Breadcrumb className="border-b border-border pb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              className="capitalize"
              href={`/components/${component.category}`}
            >
              {component.category}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{component.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <Badge className="capitalize">{component.category}</Badge>
            <Badge variant="outline">v{component.version}</Badge>
          </div>
          <h1 className="max-w-5xl font-display text-5xl font-normal leading-[0.94] tracking-[-0.035em] sm:text-7xl lg:text-8xl">
            {component.title}
          </h1>
          {component.description && (
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              {component.description}
            </p>
          )}
        </div>
        <div className="border-t border-foreground pt-4 lg:border-t-0 lg:border-l lg:pl-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Built for ownership
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Install the source directly into your app, then adapt every detail.
          </p>
        </div>
      </header>

      {component.previewAssets.length > 0 && (
        <section className="space-y-4" aria-labelledby="preview-heading">
          <div className="flex items-end justify-between border-b border-foreground pb-3">
            <h2
              id="preview-heading"
              className="text-xs font-semibold uppercase tracking-[0.18em]"
            >
              Preview
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              Reference fidelity
            </span>
          </div>
          <div className="relative aspect-[16/10] w-full overflow-hidden border border-border bg-white shadow-card dark:bg-zinc-950">
            <Image
              src={component.previewAssets[0].url}
              alt={component.previewAssets[0].alt || component.title}
              fill
              className="object-contain"
              sizes="(min-width: 1024px) calc(100vw - 360px), 100vw"
              priority
            />
          </div>
        </section>
      )}

      <section
        className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-8 border-y border-foreground py-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12"
        aria-labelledby="installation-heading"
      >
        <div className="min-w-0">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            01 / Add to your project
          </p>
          <h2
            id="installation-heading"
            className="font-display text-4xl font-normal tracking-tight sm:text-5xl"
          >
            One command. Your code.
          </h2>
          <InstallCommand name={component.name} className="mt-6" />
        </div>
        <div className="flex flex-col justify-end gap-4 text-sm leading-6 text-muted-foreground">
          <p>
            The CLI writes the section into your codebase. There is no runtime
            package or locked abstraction.
          </p>
          <Link
            href="/docs/getting-started"
            className="inline-flex w-fit items-center gap-2 font-semibold text-foreground underline decoration-accent decoration-[3px] underline-offset-4"
          >
            Read installation guide <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>

      {component.requires && Object.keys(component.requires).length > 0 && (
        <section className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em]">
            Requirements
          </h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(component.requires).map(([pkg, version]) => (
              <Badge key={pkg} variant="secondary">
                {pkg} {version}
              </Badge>
            ))}
          </div>
        </section>
      )}

      {component.propsDocumentation &&
        Object.keys(component.propsDocumentation).length > 0 && (
          <section className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em]">
              Props
            </h2>
            <div className="overflow-hidden border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-2 text-left font-medium">Prop</th>
                    <th className="px-4 py-2 text-left font-medium">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(component.propsDocumentation).map(
                    ([prop, desc]) => (
                      <tr key={prop} className="border-b last:border-0">
                        <td className="px-4 py-2 font-mono text-primary">
                          {prop}
                        </td>
                        <td className="px-4 py-2 text-muted-foreground">
                          {desc}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

      {component.dependencies.length > 0 && (
        <section className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em]">
            Dependencies
          </h2>
          <div className="flex flex-wrap gap-2">
            {component.dependencies.map((dep) => (
              <Badge key={dep} variant="outline" className="font-mono">
                {dep}
              </Badge>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <div className="flex items-end justify-between border-b border-foreground pb-3">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              02 / Inspect
            </p>
            <h2 className="font-display text-4xl font-normal">Source code</h2>
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:block">
            TSX / Tailwind CSS
          </span>
        </div>
        <ComponentCode code={sourceCode} />
      </section>

      <ComponentPrevNext prev={prev} next={next} />
    </div>
  );
}
