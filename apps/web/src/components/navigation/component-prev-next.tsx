import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { RegistryIndexItem } from '@/lib/registry/data';
import { Button } from '@/components/ui/button';

interface ComponentPrevNextProps {
  prev: RegistryIndexItem | null;
  next: RegistryIndexItem | null;
}

export function ComponentPrevNext({ prev, next }: ComponentPrevNextProps) {
  if (!prev && !next) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
      {prev ? (
        <Button variant="outline" asChild className="w-full sm:w-auto">
          <Link href={`/components/${prev.category}/${prev.name}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {prev.title}
          </Link>
        </Button>
      ) : (
        <div className="w-full sm:w-auto hidden sm:block" />
      )}

      {next && (
        <Button variant="outline" asChild className="w-full sm:w-auto ml-auto">
          <Link href={`/components/${next.category}/${next.name}`}>
            {next.title}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  );
}
