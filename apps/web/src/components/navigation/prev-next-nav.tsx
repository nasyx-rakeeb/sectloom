import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DocsNavItem } from '@/lib/navigation/docs-nav';

interface PrevNextNavProps {
  prev: DocsNavItem | null;
  next: DocsNavItem | null;
}

export function PrevNextNav({ prev, next }: PrevNextNavProps) {
  return (
    <div className="flex flex-row items-center justify-between gap-4 pt-6 mt-8 border-t">
      {prev ? (
        <Button
          variant="outline"
          asChild
          className="gap-2 shrink-0 max-w-[50%]"
        >
          <Link href={prev.href}>
            <ChevronLeft className="h-4 w-4" />
            <span className="truncate">{prev.title}</span>
          </Link>
        </Button>
      ) : (
        <div />
      )}

      {next ? (
        <Button
          variant="outline"
          asChild
          className="gap-2 shrink-0 max-w-[50%] ml-auto"
        >
          <Link href={next.href}>
            <span className="truncate">{next.title}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
}
