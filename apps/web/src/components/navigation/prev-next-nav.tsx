import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DocsNavItem } from '@/lib/navigation/docs-nav';

interface PrevNextNavProps {
  prev: DocsNavItem | null;
  next: DocsNavItem | null;
}

export function PrevNextNav({ prev, next }: PrevNextNavProps) {
  return (
    <nav
      className="mt-8 grid border-y border-foreground sm:grid-cols-2"
      aria-label="Documentation pagination"
    >
      {prev ? (
        <Link
          className="group flex min-h-24 items-center gap-3 p-5 transition-colors hover:bg-muted sm:border-r"
          href={prev.href}
        >
          <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          <span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Previous
            </span>
            <span className="mt-1 block font-display text-xl">
              {prev.title}
            </span>
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          className="group flex min-h-24 items-center justify-end gap-3 border-t p-5 text-right transition-colors hover:bg-muted sm:border-t-0"
          href={next.href}
        >
          <span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Next
            </span>
            <span className="mt-1 block font-display text-xl">
              {next.title}
            </span>
          </span>
          <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
