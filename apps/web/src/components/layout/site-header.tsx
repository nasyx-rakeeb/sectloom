import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { ThemeToggle } from './theme-toggle';
import { MobileNav } from './mobile-nav';
import { ArrowUpRight, Github } from 'lucide-react';
import { PrimaryNav } from './primary-nav';

export function SiteHeader() {
  return (
    <header className="surface-solid sticky top-0 z-50 w-full border-b editorial-rule">
      <div className="mx-auto flex h-[4.5rem] max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-7">
          <MobileNav />
          <Link
            href="/"
            className="group flex items-center gap-3 focus-visible:outline-none"
          >
            <span
              aria-hidden="true"
              className="grid size-8 grid-cols-2 overflow-hidden border border-foreground transition-transform duration-300 group-hover:rotate-90"
            >
              <span className="bg-foreground" />
              <span />
              <span />
              <span className="bg-accent" />
            </span>
            <span className="text-lg font-extrabold tracking-[-0.045em]">
              {siteConfig.name}
            </span>
          </Link>
          <PrimaryNav />
        </div>

        <nav
          aria-label="External links and preferences"
          className="flex items-center gap-1"
        >
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="hidden min-h-10 items-center gap-2 px-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            <Github className="size-4" />
            <span>GitHub</span>
            <ArrowUpRight className="size-3.5" />
          </Link>
          <span className="mx-1 hidden h-5 w-px bg-border sm:block" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
