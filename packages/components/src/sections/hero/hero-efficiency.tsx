import * as React from 'react';
import Link from 'next/link';

export interface HeroEfficiencyStat {
  label: string;
  value: string;
}

export interface HeroEfficiencyProps {
  overline?: string;
  heading?: string;
  primaryCta?: {
    label: string;
    href: string;
  } | null;
  secondaryCta?: {
    label: string;
    href: string;
  } | null;
  stats?: HeroEfficiencyStat[];
}

const DEFAULT_PRIMARY_CTA = { label: 'Start building', href: '#' };
const DEFAULT_SECONDARY_CTA = { label: 'View Docs', href: '#' };
const DEFAULT_STATS: HeroEfficiencyStat[] = [
  { label: 'Latency', value: '196 ms' },
  { label: 'Total calls', value: '208B+' },
  { label: 'Swap Volume', value: '$808B+' },
];

export function HeroEfficiency({
  overline = 'Enterprise-grade DeFi APIs',
  heading = 'Institutional scale. Agentic efficiency.',
  primaryCta = DEFAULT_PRIMARY_CTA,
  secondaryCta = DEFAULT_SECONDARY_CTA,
  stats = DEFAULT_STATS,
}: HeroEfficiencyProps) {
  return (
    <section className="flex min-h-[760px] w-full overflow-hidden bg-black px-5 py-20 text-white sm:min-h-[900px] sm:px-10 sm:py-24 lg:min-h-[980px] lg:px-[4.5vw]">
      <div className="mx-auto flex w-full max-w-[1640px] flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center pb-20 pt-8 text-center sm:pb-28 lg:pt-16">
          {overline ? (
            <p className="mb-5 text-sm font-normal tracking-[-0.01em] text-[#8b8b91] sm:text-lg">
              {overline}
            </p>
          ) : null}

          <h1 className="max-w-[1500px] text-balance text-[clamp(2.45rem,6.1vw,6.9rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white">
            {heading}
          </h1>

          {primaryCta || secondaryCta ? (
            <div className="mt-10 flex flex-col items-stretch gap-3 min-[420px]:flex-row min-[420px]:items-center">
              {primaryCta ? (
                <Link
                  href={primaryCta.href}
                  className="inline-flex min-h-14 items-center justify-center rounded-full bg-white px-8 text-base font-semibold text-black transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                >
                  {primaryCta.label}
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#202023] px-8 text-base font-semibold text-white transition-colors hover:bg-[#2c2c30] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>

        {stats.length > 0 ? (
          <dl className="grid w-full grid-cols-1 gap-8 border-t border-white/10 pt-8 sm:grid-cols-3 sm:border-0 sm:pt-0">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="text-sm text-[#929298] sm:text-base">
                  {stat.label}
                </dt>
                <dd className="text-[clamp(2.7rem,4.4vw,5rem)] font-medium leading-none tracking-[-0.045em] text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}
