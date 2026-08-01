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
          className="lg:hidden px-2 mr-2"
          aria-label="Open documentation navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetTitle className="sr-only">Documentation Navigation</SheetTitle>
        <ScrollArea className="h-full my-4 pb-10 pl-6 pr-6">
          <div className="flex flex-col gap-6">
            {docsNavigation.map((section, index) => (
              <div key={index} className="flex flex-col gap-2">
                <h4 className="font-medium text-sm">{section.title}</h4>
                <div className="flex flex-col gap-1">
                  {section.items.map((item, itemIndex) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={itemIndex}
                        href={item.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'text-sm px-3 py-1.5 rounded-md transition-colors -ml-3',
                          isActive
                            ? 'bg-accent text-accent-foreground font-medium'
                            : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground'
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
