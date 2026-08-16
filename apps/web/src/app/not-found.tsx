import Link from 'next/link';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main
        id="main-content"
        className="surface-solid flex flex-1 items-center border-b border-border"
      >
        <div className="mx-auto grid w-full max-w-[1600px] gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[0.55fr_1.45fr] lg:px-10 lg:py-36">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Error / 404
          </p>
          <div>
            <h1 className="max-w-[12ch] font-display text-[clamp(4.5rem,9vw,10rem)] leading-[0.82] tracking-[-0.06em]">
              This section went missing.
            </h1>
            <div className="mt-10 flex flex-col gap-6 border-t border-foreground pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-lg text-lg leading-8 text-muted-foreground">
                The page may have moved, but the section library is still
                exactly where you left it.
              </p>
              <Link
                href="/components/hero"
                className="inline-flex min-h-12 w-fit items-center gap-3 bg-accent px-5 text-sm font-bold text-accent-foreground"
              >
                Browse sections <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
