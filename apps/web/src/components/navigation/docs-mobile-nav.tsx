'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { docsNavigation } from '@/lib/navigation/docs-nav';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function DocsMobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-3 size-10 border border-border bg-background px-0 lg:hidden"
          aria-label="Open documentation navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[88vw] max-w-sm border-r border-border bg-background pr-0"
      >
        <div className="border-b border-border pb-5 pr-6 text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Documentation
          </p>
          <SheetTitle className="mt-2 font-display text-4xl font-normal">
            Learn Sectloom
          </SheetTitle>
        </div>
        <ScrollArea className="h-full my-4 pb-10 pl-6 pr-6">
          <div className="flex flex-col gap-6">
            {docsNavigation.map((section, index) => (
              <div key={index} className="flex flex-col gap-2">
                <h4 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {section.title}
                </h4>
                <div className="flex flex-col border-t border-border">
                  {section.items.map((item, itemIndex) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={itemIndex}
                        href={item.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'border-b border-border py-3 text-sm transition-colors',
                          isActive
                            ? 'font-semibold text-foreground underline decoration-accent decoration-[3px] underline-offset-4'
                            : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
