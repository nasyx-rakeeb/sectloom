import { ReactNode } from 'react';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { DocsSidebarWrapper } from '@/components/navigation/docs-sidebar-wrapper';
import { DocsMobileNav } from '@/components/navigation/docs-mobile-nav';

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="mx-auto grid w-full max-w-[1440px] flex-1 items-start px-5 lg:grid-cols-[264px_minmax(0,1fr)] lg:gap-12 lg:px-8">
        <DocsSidebarWrapper />
        <main id="main-content" className="relative min-w-0 py-8 lg:py-12">
          <div className="mb-8 flex items-center border-b border-border pb-4 lg:hidden">
            <DocsMobileNav />
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Documentation
            </span>
          </div>
          <div className="w-full min-w-0 max-w-4xl">{children}</div>
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
