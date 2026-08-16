'use client';

import * as React from 'react';
import { SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-10 gap-2 px-3 text-muted-foreground hover:text-foreground"
      onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
      title="Toggle theme"
    >
      <SunMoon className="size-4" />
      <span className="hidden text-xs font-semibold uppercase tracking-[0.12em] lg:inline">
        Theme
      </span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
