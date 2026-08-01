'use client';

import * as React from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [hasCopied]);

  const copyToClipboard = React.useCallback(() => {
    navigator.clipboard.writeText(text);
    setHasCopied(true);
  }, [text]);

  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn(
        'h-8 w-8 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800',
        className
      )}
      onClick={copyToClipboard}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  );
}
