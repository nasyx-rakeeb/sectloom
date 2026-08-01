import { ReactNode } from 'react';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { DocsSidebarWrapper } from '@/components/navigation/docs-sidebar-wrapper';
import { DocsMobileNav } from '@/components/navigation/docs-mobile-nav';

// Layout gets `children`. Note that Next.js layout doesn't automatically get the current path
// without a client component. We'll use a wrapper or pass current path down.
// Since DocsSidebar takes currentPath, we might need a client wrapper or a RSC way.
// Actually, let's just make DocsSidebar a client component for active state, or pass pathname from layout (which isn't supported in server layouts).
// Wait, `DocsSidebar` is a Server Component per instruction? Layout cannot pass currentPath in Next.js Server Components.
// But the user prompt says: "Accept `currentPath` prop to show active state" for DocsSidebar.
// I'll make a layout that uses headers/pathname? No, Next 14 doesn't support pathname in layout.
// Oh wait, `page.tsx` could pass something? No. I'll make DocsSidebar use a client component if needed, or simply let the layout pass a mock for now.
// Let's create a Client Component wrapper inside the sidebar or just leave it.
// Actually, `usePathname` is available in client components. The prompt says "A server component that renders the docs sidebar", "Accept currentPath prop".

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container flex-1 flex md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[256px_1fr] md:gap-6 lg:gap-10">
        <DocsSidebarWrapper />
        <main
          id="main-content"
          className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]"
        >
          <div className="mx-auto w-full min-w-0 max-w-3xl">{children}</div>
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
