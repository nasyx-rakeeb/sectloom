import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="grid min-h-[60vh] gap-8 border-y border-foreground py-12 lg:grid-cols-[0.4fr_1.6fr] lg:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        404 / Library
      </p>
      <div>
        <h1 className="max-w-[10ch] font-display text-6xl leading-[0.9] tracking-[-0.05em] sm:text-8xl">
          Section not found.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          That design is not in the registry, or its address has changed.
        </p>
        <Link
          href="/components/hero"
          className="mt-8 inline-flex items-center gap-3 font-bold underline decoration-accent decoration-[3px] underline-offset-4"
        >
          Return to the library <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
