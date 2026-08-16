import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { RegistryIndexItem } from '@/lib/registry/data';

interface ComponentPrevNextProps {
  prev: RegistryIndexItem | null;
  next: RegistryIndexItem | null;
}

export function ComponentPrevNext({ prev, next }: ComponentPrevNextProps) {
  if (!prev && !next) return null;

  return (
    <nav
      className="grid border-y border-foreground sm:grid-cols-2"
      aria-label="Adjacent sections"
    >
      {prev ? (
        <Link
          className="group flex min-h-28 items-center gap-4 p-5 transition-colors hover:bg-muted sm:border-r sm:p-7"
          href={`/components/${prev.category}/${prev.name}`}
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          <span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Previous
            </span>
            <span className="mt-1 block font-display text-2xl">
              {prev.title}
            </span>
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {next && (
        <Link
          className="group flex min-h-28 items-center justify-end gap-4 border-t p-5 text-right transition-colors hover:bg-muted sm:border-t-0 sm:p-7"
          href={`/components/${next.category}/${next.name}`}
        >
          <span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Next
            </span>
            <span className="mt-1 block font-display text-2xl">
              {next.title}
            </span>
          </span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </nav>
  );
}
