import fs from 'node:fs';
import path from 'node:path';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RegistryIndexItem {
  name: string;
  title: string;
  description: string;
  category: string;
  type: string;
  version: string;
  checksum: string;
  dependencies: string[];
  registryDependencies: string[];
  previewAssets: { type: string; url: string; alt?: string }[];
}

export interface RegistryFile {
  path: string;
  content?: string;
  url?: string;
  type: string;
  checksum?: string;
}

export interface RegistryComponent {
  name: string;
  type: string;
  category: string;
  title: string;
  description?: string;
  dependencies: string[];
  registryDependencies: string[];
  requires?: Record<string, string>;
  files: RegistryFile[];
  designProfiles: {
    style: string;
    theme: string;
    complexity: string;
    tags: string[];
  }[];
  sourceReferenceMetadata?: {
    sourceId: string;
    sourceTitle: string;
    sourceLocalPath: string;
  };
  propsDocumentation?: Record<string, string>;
  previewAssets: { type: string; url: string; alt?: string }[];
  version: string;
  checksum?: string;
}

export interface Category {
  slug: string;
  title: string;
  description: string;
  componentCount: number;
}

// ---------------------------------------------------------------------------
// Category metadata
// ---------------------------------------------------------------------------

const CATEGORY_META: Record<string, { title: string; description: string }> = {
  hero: {
    title: 'Hero',
    description:
      'Full-width hero sections with headlines, CTAs, and statistics.',
  },
  cta: {
    title: 'CTA',
    description: 'Call-to-action blocks designed to drive user engagement.',
  },
  contact: {
    title: 'Contact',
    description:
      'Contact sections with inquiry forms, addresses, and social links.',
  },
  footer: {
    title: 'Footer',
    description:
      'Multi-column footer layouts with navigation, branding, and legal links.',
  },
};

function getCategoryMeta(slug: string) {
  return (
    CATEGORY_META[slug] ?? {
      title: slug.charAt(0).toUpperCase() + slug.slice(1),
      description: `Browse ${slug} sections.`,
    }
  );
}

// ---------------------------------------------------------------------------
// Data loading (build-time, from local JSON files)
// ---------------------------------------------------------------------------

const REGISTRY_DIR = path.join(process.cwd(), 'public', 'registry');

function readRegistryIndex(): RegistryIndexItem[] {
  const filePath = path.join(REGISTRY_DIR, 'index.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as RegistryIndexItem[];
}

function readRegistryComponent(name: string): RegistryComponent | null {
  const filePath = path.join(REGISTRY_DIR, `${name}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as RegistryComponent;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Returns an ordered array of all categories with metadata. */
export function getCategories(): Category[] {
  const index = readRegistryIndex();
  const categoryMap = new Map<string, number>();

  for (const item of index) {
    categoryMap.set(item.category, (categoryMap.get(item.category) ?? 0) + 1);
  }

  // Stable order: hero first, then alphabetical
  const slugs = Array.from(categoryMap.keys()).sort((a, b) => {
    if (a === 'hero') return -1;
    if (b === 'hero') return 1;
    return a.localeCompare(b);
  });

  return slugs.map((slug) => {
    const meta = getCategoryMeta(slug);
    return {
      slug,
      title: meta.title,
      description: meta.description,
      componentCount: categoryMap.get(slug) ?? 0,
    };
  });
}

/** Returns a single category by slug, or null if not found. */
export function getCategoryBySlug(slug: string): Category | null {
  const categories = getCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}

/** Returns all component index entries for a category, ordered by name. */
export function getComponentsByCategory(
  categorySlug: string
): RegistryIndexItem[] {
  const index = readRegistryIndex();
  return index
    .filter((item) => item.category === categorySlug)
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Returns a full component record by category and component slug. */
export function getComponentBySlug(
  categorySlug: string,
  componentSlug: string
): RegistryComponent | null {
  const component = readRegistryComponent(componentSlug);
  if (!component) return null;
  if (component.category !== categorySlug) return null;
  return component;
}

/** Returns previous and next components within the same category. */
export function getPrevNextComponents(
  categorySlug: string,
  componentSlug: string
): { prev: RegistryIndexItem | null; next: RegistryIndexItem | null } {
  const components = getComponentsByCategory(categorySlug);
  const currentIndex = components.findIndex((c) => c.name === componentSlug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? components[currentIndex - 1] : null,
    next:
      currentIndex < components.length - 1
        ? components[currentIndex + 1]
        : null,
  };
}

/** Generates static params for category routes. */
export function generateCategoryParams(): { category: string }[] {
  return getCategories().map((c) => ({ category: c.slug }));
}

/** Generates static params for component detail routes. */
export function generateComponentParams(): {
  category: string;
  component: string;
}[] {
  const index = readRegistryIndex();
  return index.map((item) => ({
    category: item.category,
    component: item.name,
  }));
}

/** Generates sitemap entries for all registry-backed routes. */
export function getSitemapEntries(baseUrl: string): {
  url: string;
  lastModified: Date;
  changeFrequency: string;
  priority: number;
}[] {
  const categories = getCategories();
  const index = readRegistryIndex();
  const now = new Date();

  const entries: {
    url: string;
    lastModified: Date;
    changeFrequency: string;
    priority: number;
  }[] = [];

  for (const category of categories) {
    entries.push({
      url: `${baseUrl}/components/${category.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  for (const item of index) {
    entries.push({
      url: `${baseUrl}/components/${item.category}/${item.name}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  return entries;
}
