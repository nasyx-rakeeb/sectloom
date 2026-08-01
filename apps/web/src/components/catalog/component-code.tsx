import * as React from 'react';
import { codeToHtml } from 'shiki';
import { CopyButton } from './copy-button';
import { cn } from '@/lib/utils';

interface ComponentCodeProps {
  code: string;
  className?: string;
}

export async function ComponentCode({ code, className }: ComponentCodeProps) {
  const html = await codeToHtml(code, {
    lang: 'tsx',
    theme: 'github-dark',
  });

  return (
    <div
      className={cn('relative group rounded-lg border bg-zinc-950', className)}
    >
      <div className="absolute right-4 top-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton text={code} />
      </div>
      <div className="flex min-w-0 max-w-full">
        <div
          className="w-full overflow-x-auto text-sm"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
