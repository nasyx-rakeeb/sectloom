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
        'flex items-center justify-between gap-4 rounded-lg border bg-muted/50 px-4 py-3 font-mono text-sm',
        className
      )}
    >
      <span className="text-muted-foreground">
        <span className="select-none text-primary/40 mr-2">$</span>
        {command}
      </span>
      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
        onClick={copyToClipboard}
      >
        <span className="sr-only">Copy</span>
        {hasCopied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
