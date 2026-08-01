import { getCategories } from '@/lib/registry/data';
import { CatalogSidebar } from '@/components/navigation/catalog-sidebar';
import { CatalogMobileNav } from '@/components/navigation/catalog-mobile-nav';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

interface ComponentsLayoutProps {
  children: React.ReactNode;
}

export default function ComponentsLayout({ children }: ComponentsLayoutProps) {
  const categories = getCategories();

  return (
    <>
      <SiteHeader />
      <div className="container mx-auto flex-1 items-start px-4 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 md:px-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <CatalogSidebar className="hidden md:block sticky top-14 z-30 -ml-2 h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto py-6 pr-2 lg:py-8" />
        <main
          id="main-content"
          className="relative py-6 lg:py-8"
        >
          <div className="mx-auto w-full min-w-0">
            <div className="md:hidden flex items-center mb-4">
              <CatalogMobileNav categories={categories} />
              <span className="text-sm font-medium">Menu</span>
            </div>
            {children}
          </div>
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
