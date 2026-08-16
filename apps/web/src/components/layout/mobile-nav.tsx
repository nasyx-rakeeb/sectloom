'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Menu } from 'lucide-react';
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
          className="-ml-2 size-10 px-0 text-base hover:bg-muted md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[88vw] max-w-sm border-r p-0">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <Link
          href="/"
          className="flex items-center gap-3 border-b editorial-rule px-6 py-6"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden="true"
            className="grid size-8 grid-cols-2 overflow-hidden border border-foreground"
          >
            <span className="bg-foreground" />
            <span />
            <span />
            <span className="bg-accent" />
          </span>
          <span className="text-lg font-extrabold tracking-[-0.04em]">
            {siteConfig.name}
          </span>
        </Link>
        <div className="flex h-[calc(100dvh-5rem)] flex-col justify-between p-6">
          <div className="flex flex-col">
            <Link
              href="/components/hero"
              onClick={() => setOpen(false)}
              className="border-b editorial-rule py-5 font-display text-4xl tracking-[-0.035em] transition-colors hover:text-muted-foreground"
            >
              Browse sections
            </Link>
            <Link
              href="/docs"
              onClick={() => setOpen(false)}
              className="border-b editorial-rule py-5 font-display text-4xl tracking-[-0.035em] transition-colors hover:text-muted-foreground"
            >
              Docs
            </Link>
          </div>
          <div className="space-y-3 border-t editorial-rule pt-5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <Link
              href={siteConfig.links.github}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-2 transition-colors hover:text-foreground"
            >
              GitHub
              <ArrowUpRight className="size-4" />
            </Link>
            <Link
              href={siteConfig.links.npm}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-2 transition-colors hover:text-foreground"
            >
              npm
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
