import * as React from 'react';
import Link from 'next/link';

export interface CtaApisProps {
  heading?: string;
  cta?: {
    label: string;
    href: string;
  } | null;
}

const DEFAULT_CTA = { label: 'Contact sales', href: '/contact' };

function DottedApiGraphic() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 760 420"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <pattern
          id="sectloom-cta-square-dots"
          width="13"
          height="13"
          patternUnits="userSpaceOnUse"
        >
          <rect width="5" height="5" rx="0.5" fill="white" />
        </pattern>
        <mask id="sectloom-cta-swoosh-mask">
          <rect width="760" height="420" fill="black" />
          <path
            d="M70 125C178 30 345 60 432 163C493 236 477 345 391 382"
            fill="none"
            stroke="white"
            strokeWidth="112"
            strokeLinecap="round"
          />
          <path
            d="M365 110C455 60 564 72 592 155C620 239 548 318 481 269"
            fill="none"
            stroke="white"
            strokeWidth="78"
            strokeLinecap="round"
          />
          <path
            d="M626 130C690 166 699 271 635 331"
            fill="none"
            stroke="white"
            strokeWidth="46"
            strokeLinecap="round"
          />
        </mask>
      </defs>
      <rect
        width="760"
        height="420"
        fill="url(#sectloom-cta-square-dots)"
        mask="url(#sectloom-cta-swoosh-mask)"
      />
    </svg>
  );
}

export function CtaApis({
  heading = 'Power your app with enterprise-grade APIs',
  cta = DEFAULT_CTA,
}: CtaApisProps) {
  return (
    <section className="w-full overflow-hidden bg-black px-4 py-14 sm:px-[4.4vw] sm:py-[7.5vw]">
      <div className="relative mx-auto grid min-h-[420px] max-w-[1868px] overflow-hidden bg-[#1000ff] px-7 py-12 text-white sm:px-14 lg:min-h-[530px] lg:grid-cols-[0.8fr_1.2fr] lg:px-[4.2vw] lg:py-[4.2vw]">
        <div className="relative z-10 flex max-w-[620px] flex-col items-start justify-between gap-20 lg:gap-12">
          <h2 className="max-w-[600px] text-[clamp(2.25rem,3vw,4rem)] font-semibold leading-[1.16] tracking-[-0.035em]">
            {heading}
          </h2>
          {cta ? (
            <Link
              href={cta.href}
              className="inline-flex min-h-16 items-center justify-center rounded-full bg-white px-9 text-lg font-semibold text-[#181818] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#1000ff]"
            >
              {cta.label}
            </Link>
          ) : null}
        </div>

        <div className="pointer-events-none absolute -bottom-8 -right-8 h-[64%] w-[120%] opacity-80 sm:-right-10 sm:w-[90%] lg:static lg:h-full lg:w-full lg:self-center lg:opacity-95">
          <DottedApiGraphic />
        </div>
      </div>
    </section>
  );
}
