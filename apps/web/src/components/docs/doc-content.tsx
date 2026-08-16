import { ReactNode } from 'react';
import { getDocsPrevNext } from '@/lib/navigation/docs-nav';
import { PrevNextNav } from '@/components/navigation/prev-next-nav';

interface DocContentProps {
  title: string;
  description?: string;
  href: string;
  children: ReactNode;
}

export function DocContent({
  title,
  description,
  href,
  children,
}: DocContentProps) {
  const { prev, next } = getDocsPrevNext(href);

  return (
    <article className="flex flex-col">
      <header className="border-b border-foreground pb-8">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Sectloom manual
        </p>
        <h1 className="max-w-4xl font-display text-5xl font-normal leading-[0.94] tracking-[-0.035em] sm:text-7xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            {description}
          </p>
        )}
      </header>
      <div className="docs-content prose max-w-none py-10 dark:prose-invert">
        {children}
      </div>
      <PrevNextNav prev={prev} next={next} />
    </article>
  );
}
