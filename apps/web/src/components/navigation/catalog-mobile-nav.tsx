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

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetHeader>
          <SheetTitle className="text-left">Navigation</SheetTitle>
        </SheetHeader>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-1 pt-2">
              <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                Categories
              </h4>
              {categories.map((category) => {
                const isActive = currentCategory === category.slug;
                return (
                  <Link
                    key={category.slug}
                    href={`/components/${category.slug}`}
                    className={cn(
                      'flex w-full items-center justify-between rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                      isActive
                        ? 'bg-accent text-accent-foreground font-medium'
                        : 'text-muted-foreground'
                    )}
                  >
                    <span>{category.title}</span>
                  </Link>
                );
              })}
            </div>

            {components.length > 0 && currentCategory && (
              <div className="flex flex-col space-y-1 pt-6">
                <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold capitalize">
                  {currentCategory} Components
                </h4>
                {components.map((component) => {
                  const isActive = currentComponent === component.name;
                  return (
                    <Link
                      key={component.name}
                      href={`/components/${currentCategory}/${component.name}`}
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
