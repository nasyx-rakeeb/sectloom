import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
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
    <div className="space-y-10 pb-12">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <TechArticleJsonLd
        headline={component.title}
        description={component.description || ''}
        url={`${siteConfig.url}/components/${component.category}/${component.name}`}
      />

      <Breadcrumb>
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

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
            {component.title}
          </h1>
          <Badge variant="outline">{component.version}</Badge>
          <Badge className="capitalize">{component.category}</Badge>
        </div>
        {component.description && (
          <p className="text-lg text-muted-foreground">
            {component.description}
          </p>
        )}
      </div>

      {component.requires && Object.keys(component.requires).length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight">Requires</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(component.requires).map(([pkg, version]) => (
              <Badge key={pkg} variant="secondary">
                {pkg} {version}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">Installation</h3>
        <InstallCommand name={component.name} />
      </div>

      {component.previewAssets.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight">Preview</h3>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
            <Image
              src={component.previewAssets[0].url}
              alt={component.previewAssets[0].alt || component.title}
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 50vw, (min-width: 768px) 75vw, 100vw"
            />
          </div>
        </div>
      )}

      {component.propsDocumentation &&
        Object.keys(component.propsDocumentation).length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold tracking-tight">Props</h3>
            <div className="rounded-md border">
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
          </div>
        )}

      {component.dependencies.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight">Dependencies</h3>
          <div className="flex flex-wrap gap-2">
            {component.dependencies.map((dep) => (
              <Badge key={dep} variant="outline" className="font-mono">
                {dep}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">Source Code</h3>
        <ComponentCode code={sourceCode} />
      </div>

      {component.requiredTokens.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight">
            Required Tokens
          </h3>
          <div className="flex flex-wrap gap-2">
            {component.requiredTokens.map((token) => (
              <Badge
                key={token}
                variant="outline"
                className="font-mono text-xs"
              >
                {token}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <hr className="my-8" />
      <ComponentPrevNext prev={prev} next={next} />
    </div>
  );
}
