import * as React from 'react';
import Link from 'next/link';

export interface MethodologyStat {
  value: string;
  label: string;
}

export interface FooterAiidMethodologyProps {
  label?: string;
  intro?: string;
  stats?: MethodologyStat[];
  brand?: string;
  year?: string;
  partnerLinks?: { label: string; href: string }[];
  reportLinks?: { label: string; href: string }[];
  legal?: string;
}

export function FooterAiidMethodology({
  label = 'Methodology',
  intro = 'This report draws from',
  stats = [
    { value: '906', label: 'Survey responses' },
    { value: '25+', label: 'Interviews' },
    { value: '50+', label: 'Public sources' },
  ],
  brand = 'AiinDesign',
  year = '2026',
  partnerLinks = ['Anthropic', 'Stripe', 'Notion', 'Linear'].map((label) => ({
    label,
    href: '#',
  })),
  reportLinks = ['Read the Report', 'About', 'Case Studies'].map((label) => ({
    label,
    href: '#',
  })),
  legal = '©2026 Designer Fund, Foundation Capital. All rights reserved.',
}: FooterAiidMethodologyProps) {
  return (
    <footer className="w-full bg-black text-[#f4f3f1]">
      <div className="grid border-y border-white/60 md:grid-cols-4">
        <div className="flex min-h-64 flex-col justify-between border-b border-white/60 p-6 md:border-b-0 md:border-r lg:min-h-80">
          <span className="font-mono text-xs uppercase text-white/75">
            {label}
          </span>
          <p className="max-w-xs text-3xl leading-[1.1] tracking-[-0.04em] lg:text-5xl">
            {intro}
          </p>
        </div>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex min-h-52 flex-col justify-between border-b border-white/60 p-6 last:border-b-0 md:min-h-80 md:border-b-0 md:border-r md:last:border-r-0"
          >
            <strong className="text-[clamp(5rem,10vw,12rem)] font-medium leading-none tracking-[-0.07em]">
              {stat.value}
            </strong>
            <span className="text-lg">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="overflow-hidden px-5 pb-16 pt-14 sm:px-8 lg:px-10">
        <div className="whitespace-nowrap text-[clamp(6rem,17vw,22rem)] font-black leading-[0.75] tracking-[-0.085em]">
          {brand}
        </div>
        <div className="mt-16 grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-end">
          <div className="grid max-w-xl grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="mb-5 font-mono text-xs uppercase text-white/50">
                Report partners
              </p>
              <div className="space-y-3">
                {partnerLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block hover:underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-5 font-mono text-xs uppercase text-white/50">
                Report
              </p>
              <div className="space-y-3">
                {reportLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block hover:underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="text-right text-[clamp(7rem,18vw,22rem)] font-black leading-[0.7] tracking-[-0.085em]">
            {year}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-3 border-t border-white/60 px-5 py-5 text-sm sm:flex-row sm:px-8">
        <span>{legal}</span>
        <span>Made with care for the open web</span>
      </div>
    </footer>
  );
}
