'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className={cn(
        'fixed left-4 top-4 z-50 -translate-y-24 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-transform focus:translate-y-0'
      )}
    >
      Skip to main content
    </a>
  );
}
