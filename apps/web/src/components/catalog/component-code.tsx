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
      className={cn(
        'group relative overflow-hidden border border-zinc-800 bg-zinc-950',
        className
      )}
    >
      <div className="absolute right-4 top-4 z-10 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
        <CopyButton text={code} />
      </div>
      <div
        className="max-h-[720px] overflow-auto p-5 text-[13px] leading-6 sm:p-7 [&_code]:!bg-transparent [&_pre]:!m-0 [&_pre]:min-w-max [&_pre]:!bg-transparent [&_pre]:!p-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
