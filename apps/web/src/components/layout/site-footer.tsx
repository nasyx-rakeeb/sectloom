import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function SiteFooter() {
  return (
    <footer className="surface-solid border-t editorial-rule">
      <div className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Build from sections, not from scratch.
            </p>
            <p className="mt-4 font-display text-[clamp(4.5rem,11vw,10rem)] leading-[0.72] tracking-[-0.065em]">
              Sectloom
            </p>
          </div>
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-8 gap-y-3 border-t editorial-rule pt-5 text-sm font-semibold lg:mb-1"
          >
            <Link
              href="/components/hero"
              className="transition-colors hover:text-muted-foreground"
            >
              Browse
            </Link>
            <Link
              href="/docs"
              className="transition-colors hover:text-muted-foreground"
            >
              Docs
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-muted-foreground"
            >
              GitHub
            </Link>
            <Link
              href={siteConfig.links.npm}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-muted-foreground"
            >
              npm
            </Link>
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t editorial-rule pt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Open-source section library for Next.js</p>
          <p>Editable TSX · Tailwind CSS v4 · React</p>
        </div>
      </div>
    </footer>
  );
}
