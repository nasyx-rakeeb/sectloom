import * as React from 'react';
import Link from 'next/link';

export interface HeroEfficiencyStat {
  label: string;
  value: string;
}

export interface HeroEfficiencyProps {
  overline?: string;
  heading: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  stats?: HeroEfficiencyStat[];
}

export function HeroEfficiency({
  overline = 'Enterprise-grade DeFi APIs',
  heading = 'Institutional scale. Agentic efficiency.',
  primaryCta = { label: 'Start building', href: '#' },
  secondaryCta = { label: 'View Docs', href: '#' },
  stats = [
    { label: 'Latency', value: '196 ms' },
    { label: 'Total calls', value: '208B+' },
    { label: 'Swap Volume', value: '$808B+' },
  ],
}: HeroEfficiencyProps) {
  return (
    <section className="bg-background text-foreground py-24 sm:py-32 flex flex-col items-center justify-center min-h-[80vh] px-6">
      <div className="max-w-[var(--container-md)] mx-auto text-center flex flex-col items-center">
        {overline && (
          <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase mb-4">
            {overline}
          </p>
        )}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8">
          {heading}
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-24">
          {primaryCta && (
            <Link
              href={primaryCta.href}
              className="px-6 py-3 rounded-[var(--radius-full)] bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {primaryCta.label}
            </Link>
          )}
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="px-6 py-3 rounded-[var(--radius-full)] bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-border/50"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>

        {stats && stats.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-24 text-left w-full max-w-[var(--container-lg)] mt-auto pt-12 border-t border-border/10">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-muted-foreground text-sm">
                  {stat.label}
                </span>
                <span className="text-3xl sm:text-5xl font-semibold">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
