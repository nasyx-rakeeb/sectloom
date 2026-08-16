'use client';

import * as React from 'react';
import { Check, Copy } from 'lucide-react';

interface CardCopyButtonProps {
  text: string;
}

export function CardCopyButton({ text }: CardCopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [hasCopied]);

  return (
    <button
      type="button"
      className="shrink-0 rounded-sm p-2 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(text);
        setHasCopied(true);
      }}
    >
      <span className="sr-only">Copy command</span>
      {hasCopied ? (
        <Check className="size-3.5" />
      ) : (
        <Copy className="size-3.5" />
      )}
    </button>
  );
}
