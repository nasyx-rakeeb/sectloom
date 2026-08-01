import { siteConfig } from '@/config/site';

// ---------------------------------------------------------------------------
// Sanitize JSON-LD to prevent XSS (per Next.js guidance)
// ---------------------------------------------------------------------------

function sanitize(jsonLd: Record<string, unknown>): string {
  return JSON.stringify(jsonLd).replace(/</g, '\\u003c');
}

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

export function WebSiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitize(jsonLd) }}
    />
  );
}

export function SoftwareApplicationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    operatingSystem: 'Cross-platform',
    applicationCategory: 'DeveloperApplication',
    url: siteConfig.url,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitize(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitize(jsonLd) }}
    />
  );
}

export function CollectionPageJsonLd({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string }[];
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitize(jsonLd) }}
    />
  );
}

export function TechArticleJsonLd({
  headline,
  description,
  url,
}: {
  headline: string;
  description: string;
  url: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline,
    description,
    url,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitize(jsonLd) }}
    />
  );
}
