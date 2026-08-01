import Link from 'next/link';
import { getCategories } from '@/lib/registry/data';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CatalogSidebarProps {
  currentCategory?: string;
  className?: string;
}

export function CatalogSidebar({
  currentCategory,
  className,
}: CatalogSidebarProps) {
  const categories = getCategories();

  return (
    <aside className={cn('w-56 shrink-0', className)}>
      <ScrollArea className="h-[calc(100vh-3.5rem)] py-6 pr-6 lg:py-8">
        <div className="w-full">
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            Categories
          </h4>
          <div className="grid grid-flow-row auto-rows-max text-sm">
            {categories.map((category) => {
              const isActive = currentCategory === category.slug;
              return (
                <Link
                  key={category.slug}
                  href={`/components/${category.slug}`}
                  className={cn(
                    'flex w-full items-center justify-between rounded-md px-3 py-1.5 transition-colors hover:bg-accent hover:text-accent-foreground',
                    isActive
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'text-muted-foreground'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{category.title}</span>
                  <span className="flex h-5 items-center justify-center rounded-full bg-muted px-2 text-xs font-medium text-muted-foreground">
                    {category.componentCount}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
