'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <Link
          href="/"
          className="flex items-center space-x-2 pl-6 pt-4"
          onClick={() => setOpen(false)}
        >
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            <Link
              href="/components/hero"
              onClick={() => setOpen(false)}
              className="text-foreground/70 transition-colors hover:text-foreground"
            >
              Components
            </Link>
            <Link
              href="/docs"
              onClick={() => setOpen(false)}
              className="text-foreground/70 transition-colors hover:text-foreground"
            >
              Docs
            </Link>
            <Link
              href={siteConfig.links.github}
              onClick={() => setOpen(false)}
              className="text-foreground/70 transition-colors hover:text-foreground"
            >
              GitHub
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
