import * as React from 'react';
import Link from 'next/link';

export interface CtaRockfiVisionProps {
  eyebrow?: string;
  heading?: string;
  principles?: string[];
  cta?: { label: string; href: string } | null;
}

export function CtaRockfiVision({
  eyebrow = 'Our vision',
  heading = 'A pricing set for objective advice.',
  principles = [
    'Objectivity of the Council',
    'Transparency on fees',
    'Alignment of interests',
  ],
  cta = { label: 'Discover our model', href: '#' },
}: CtaRockfiVisionProps) {
  return (
    <section className="w-full bg-white p-3 text-[#5a5038] sm:p-5">
      <div className="relative mx-auto flex min-h-[620px] max-w-[1900px] items-center justify-center overflow-hidden rounded-[16px] border border-[#ddd8c8] bg-[#f8f7ef] px-6 py-20 sm:min-h-[760px] lg:min-h-[900px]">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-[36%] border-l border-[#e3dfd1] opacity-70"
          style={{
            backgroundImage:
              'linear-gradient(90deg, transparent 49.8%, #ded9c9 50%, transparent 50.2%), linear-gradient(45deg, transparent 49.8%, #ded9c9 50%, transparent 50.2%)',
            backgroundSize: '260px 260px',
          }}
        />
        <div className="relative z-10 flex max-w-[880px] flex-col items-center text-center">
          <span className="rounded-xl border border-[#cfc7ae] px-5 py-3 text-sm sm:text-base">
            {eyebrow}
          </span>
          <h2 className="mt-10 max-w-[740px] font-serif text-[clamp(3rem,5.5vw,7rem)] leading-[0.94] tracking-[-0.055em]">
            {heading}
          </h2>
          <ul className="mt-12 flex flex-col items-center gap-3 text-sm sm:flex-row sm:gap-5 sm:text-base">
            {principles.map((principle, index) => (
              <React.Fragment key={principle}>
                {index > 0 ? (
                  <li
                    aria-hidden="true"
                    className="size-1 rounded-full bg-current"
                  />
                ) : null}
                <li>{principle}</li>
              </React.Fragment>
            ))}
          </ul>
          {cta ? (
            <Link
              href={cta.href}
              className="mt-14 inline-flex min-h-14 items-center justify-center rounded-full bg-[#51472f] px-8 text-base text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51472f] focus-visible:ring-offset-4"
            >
              {cta.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
