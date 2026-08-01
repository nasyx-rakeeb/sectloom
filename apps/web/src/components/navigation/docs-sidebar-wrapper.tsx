'use client';

import { usePathname } from 'next/navigation';
import { DocsSidebar } from '@/components/navigation/docs-sidebar';

export function DocsSidebarWrapper() {
  const pathname = usePathname();

  return <DocsSidebar currentPath={pathname || ''} />;
}
