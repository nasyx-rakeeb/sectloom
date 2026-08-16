import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import {
  getCategoryBySlug,
  getComponentsByCategory,
  generateCategoryParams,
} from '@/lib/registry/data';
import { ComponentCard } from '@/components/catalog/component-card';
import { CollectionPageJsonLd, BreadcrumbJsonLd } from '@/lib/seo/json-ld';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return generateCategoryParams();
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = getCategoryBySlug(params.category);
  if (!category) return {};

  return {
    title: `${category.title} Components`,
    description: category.description,
    alternates: {
      canonical: `/components/${category.slug}`,
    },
    openGraph: {
      title: `${category.title} Components`,
      description: category.description,
      type: 'website',
      url: `${siteConfig.url}/components/${category.slug}`,
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.category);
  const components = getComponentsByCategory(params.category);

  if (!category) {
    notFound();
  }

  const breadcrumbItems = [
    { name: 'Home', url: `${siteConfig.url}/` },
    { name: 'Components', url: `${siteConfig.url}/components` },
    {
      name: category.title,
      url: `${siteConfig.url}/components/${category.slug}`,
    },
  ];

  const collectionItems = components.map((c) => ({
    name: c.title,
    url: `${siteConfig.url}/components/${c.category}/${c.name}`,
  }));

  return (
    <div className="space-y-12 pb-16">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <CollectionPageJsonLd
        name={`${category.title} Components`}
        description={category.description}
        url={`${siteConfig.url}/components/${category.slug}`}
        items={collectionItems}
      />

      <header className="grid gap-6 border-b border-foreground pb-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Section collection
          </p>
          <h1 className="max-w-4xl font-display text-5xl font-normal leading-[0.92] tracking-[-0.035em] sm:text-7xl lg:text-8xl">
            {category.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            {category.description}
          </p>
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          {String(category.componentCount).padStart(2, '0')} sections
        </p>
      </header>

      <div className="grid grid-cols-1 gap-x-6 gap-y-12 xl:grid-cols-2 xl:gap-x-8 xl:gap-y-16">
        {components.map((component) => (
          <ComponentCard key={component.name} item={component} />
        ))}
      </div>
    </div>
  );
}
