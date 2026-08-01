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
      <div className="container-wrapper">
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <CatalogSidebar className="hidden md:block fixed top-14 z-30 -ml-2 w-full shrink-0 md:sticky md:block" />
          <main
            id="main-content"
            className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]"
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
      </div>
      <SiteFooter />
    </>
  );
}
