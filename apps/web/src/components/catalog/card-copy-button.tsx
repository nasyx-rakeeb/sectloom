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
      className="shrink-0 rounded p-1 hover:bg-accent/50 transition-colors"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(text);
        setHasCopied(true);
      }}
    >
      <span className="sr-only">Copy command</span>
      {hasCopied ? (
        <Check className="h-3 w-3 text-green-500" />
      ) : (
        <Copy className="h-3 w-3" />
      )}
    </button>
  );
}
