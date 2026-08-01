import { ReactNode } from 'react';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { DocsSidebarWrapper } from '@/components/navigation/docs-sidebar-wrapper';

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container mx-auto flex-1 px-4 md:grid md:grid-cols-[220px_1fr] md:gap-6 md:px-8 lg:grid-cols-[256px_1fr] lg:gap-10 items-start">
        <DocsSidebarWrapper />
        <main
          id="main-content"
          className="relative py-6 lg:py-8"
        >
          <div className="mx-auto w-full min-w-0 max-w-3xl">{children}</div>
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
