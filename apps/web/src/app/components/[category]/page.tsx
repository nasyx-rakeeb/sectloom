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
    <div className="space-y-8">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <CollectionPageJsonLd
        name={`${category.title} Components`}
        description={category.description}
        url={`${siteConfig.url}/components/${category.slug}`}
        items={collectionItems}
      />

      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          {category.title}
        </h1>
        <p className="text-lg text-muted-foreground">
          {category.description} ({category.componentCount} components)
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
        {components.map((component) => (
          <ComponentCard key={component.name} item={component} />
        ))}
      </div>
    </div>
  );
}
