'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const ITEMS = [
  { label: 'Browse', href: '/components/hero', match: '/components' },
  { label: 'Docs', href: '/docs', match: '/docs' },
];

export function PrimaryNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary navigation"
      className="hidden items-center gap-1 md:flex"
    >
      {ITEMS.map((item) => {
        const isActive = pathname.startsWith(item.match);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'relative px-4 py-2 text-sm font-semibold transition-colors duration-200 after:absolute after:inset-x-4 after:-bottom-[1.05rem] after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:text-foreground focus-visible:outline-none aria-[current=page]:text-foreground aria-[current=page]:after:scale-x-100',
              isActive ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
