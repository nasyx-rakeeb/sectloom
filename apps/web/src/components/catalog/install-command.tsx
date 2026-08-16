'use client';

import * as React from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface InstallCommandProps {
  name: string;
  className?: string;
}

export function InstallCommand({ name, className }: InstallCommandProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  const command = `npx sectloom add ${name}`;

  React.useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [hasCopied]);

  const copyToClipboard = React.useCallback(() => {
    navigator.clipboard.writeText(command);
    setHasCopied(true);
  }, [command]);

  return (
    <div
      className={cn(
        'flex min-w-0 items-center justify-between gap-4 border border-foreground bg-foreground px-4 py-4 font-mono text-sm text-background sm:px-5',
        className
      )}
    >
      <span className="min-w-0 truncate">
        <span className="mr-2 select-none text-accent">$</span>
        {command}
      </span>
      <Button
        size="icon"
        variant="ghost"
        className="h-9 w-9 shrink-0 text-background/70 hover:bg-background/10 hover:text-background"
        aria-label={
          hasCopied ? 'Copied install command' : 'Copy install command'
        }
        onClick={copyToClipboard}
      >
        {hasCopied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
