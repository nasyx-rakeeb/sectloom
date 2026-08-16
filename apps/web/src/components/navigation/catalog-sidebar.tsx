'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Category } from '@/lib/registry/data';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CatalogSidebarProps {
  categories: Category[];
}

export function CatalogSidebar({ categories }: CatalogSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] shrink-0 border-r border-border md:block">
      <ScrollArea className="h-full py-10 pr-7">
        <div className="w-full space-y-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Library
            </p>
            <h2 className="mt-2 font-display text-3xl leading-none">
              Find your next section.
            </h2>
          </div>
          <nav
            className="grid grid-flow-row auto-rows-max border-t border-border"
            aria-label="Component categories"
          >
            {categories.map((category) => {
              const isActive = pathname.startsWith(
                `/components/${category.slug}`
              );
              return (
                <Link
                  key={category.slug}
                  href={`/components/${category.slug}`}
                  className={cn(
                    'group flex w-full items-center justify-between border-b border-border py-3 text-sm transition-colors hover:text-foreground',
                    isActive
                      ? 'font-semibold text-foreground'
                      : 'text-muted-foreground'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span
                    className={cn(
                      isActive &&
                        'underline decoration-accent decoration-[3px] underline-offset-4'
                    )}
                  >
                    {category.title}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground transition-colors group-hover:text-foreground">
                    {category.componentCount}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </ScrollArea>
    </aside>
  );
}
