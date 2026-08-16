'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Category, RegistryIndexItem } from '@/lib/registry/data';
import { cn } from '@/lib/utils';

interface CatalogMobileNavProps {
  categories: Category[];
  components?: RegistryIndexItem[];
  currentCategory?: string;
  currentComponent?: string;
}

export function CatalogMobileNav({
  categories,
  components = [],
  currentCategory,
  currentComponent,
}: CatalogMobileNavProps) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const activeCategory = currentCategory ?? pathname.split('/')[2];
  const activeComponent = currentComponent ?? pathname.split('/')[3];

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-3 size-10 border border-border bg-background px-0 hover:bg-muted md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[88vw] max-w-sm border-r border-border bg-background pr-0"
      >
        <SheetHeader className="border-b border-border pb-5 pr-6 text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Library
          </p>
          <SheetTitle className="font-display text-4xl font-normal">
            Browse sections
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-1 pt-2">
              <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                Categories
              </h4>
              {categories.map((category) => {
                const isActive = activeCategory === category.slug;
                return (
                  <Link
                    key={category.slug}
                    href={`/components/${category.slug}`}
                    className={cn(
                      'flex w-full items-center justify-between border-b border-border px-0 py-3 text-sm transition-colors',
                      isActive
                        ? 'font-semibold text-foreground underline decoration-accent decoration-[3px] underline-offset-4'
                        : 'text-muted-foreground'
                    )}
                  >
                    <span>{category.title}</span>
                  </Link>
                );
              })}
            </div>

            {components.length > 0 && activeCategory && (
              <div className="flex flex-col space-y-1 pt-6">
                <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold capitalize">
                  {activeCategory} Components
                </h4>
                {components.map((component) => {
                  const isActive = activeComponent === component.name;
                  return (
                    <Link
                      key={component.name}
                      href={`/components/${activeCategory}/${component.name}`}
                      className={cn(
                        'flex w-full items-center justify-between rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                        isActive
                          ? 'bg-accent text-accent-foreground font-medium'
                          : 'text-muted-foreground'
                      )}
                    >
                      <span>{component.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
