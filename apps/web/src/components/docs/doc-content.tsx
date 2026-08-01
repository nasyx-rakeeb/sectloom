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
    <div className="flex flex-col space-y-8">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="pb-12 pt-8 docs-content prose dark:prose-invert max-w-none">
        {children}
      </div>
      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
