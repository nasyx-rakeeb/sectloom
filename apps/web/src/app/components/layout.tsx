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
      <div className="mx-auto grid w-full max-w-[1600px] flex-1 items-start px-5 md:grid-cols-[232px_minmax(0,1fr)] md:gap-8 md:px-8 xl:grid-cols-[264px_minmax(0,1fr)] xl:gap-12">
        <CatalogSidebar categories={categories} />
        <main id="main-content" className="relative min-w-0 py-8 lg:py-12">
          <div className="mx-auto w-full min-w-0">
            <div className="mb-8 flex items-center border-b border-border pb-4 md:hidden">
              <CatalogMobileNav categories={categories} />
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Browse categories
              </span>
            </div>
            {children}
          </div>
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
