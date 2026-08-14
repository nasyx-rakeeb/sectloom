export interface DocsNavItem {
  title: string;
  href: string;
}

export interface DocsNavSection {
  title: string;
  items: DocsNavItem[];
}

export const docsNavigation: DocsNavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Getting Started', href: '/docs/getting-started' },
    ],
  },
  {
    title: 'Usage',
    items: [
      { title: 'CLI Reference', href: '/docs/cli' },
      { title: 'Using Components', href: '/docs/components' },
      { title: 'Customization', href: '/docs/customization' },
    ],
  },
  {
    title: 'Architecture',
    items: [{ title: 'Registry', href: '/docs/registry' }],
  },
];

/** Flat list of all docs pages in order, for prev/next navigation. */
export const docsPages: DocsNavItem[] = docsNavigation.flatMap(
  (section) => section.items
);

/** Returns the previous and next docs pages relative to the given href. */
export function getDocsPrevNext(href: string): {
  prev: DocsNavItem | null;
  next: DocsNavItem | null;
} {
  const index = docsPages.findIndex((p) => p.href === href);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? docsPages[index - 1] : null,
    next: index < docsPages.length - 1 ? docsPages[index + 1] : null,
  };
}
