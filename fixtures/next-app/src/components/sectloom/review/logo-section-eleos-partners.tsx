import * as React from 'react';

export interface LogoSectionEleosPartnersProps {
  heading?: string;
  description?: string;
  partners?: string[];
}

const DEFAULT_PARTNERS = [
  'PATH',
  'HEALTH NET',
  'LACDA',
  'BRILLIANT CORNERS',
  'LA MAS',
  'SELF HELP',
  'CENTURY HOUSING',
  'HOPICS',
  'THE RIGHTWAY FOUNDATION',
  'HACLA',
];

export function LogoSectionEleosPartners({
  heading = 'The partners who make it possible',
  description = 'A network of private lenders and capital partners who understand that affordable housing, done right, is both a sound & meaningful investment.',
  partners = DEFAULT_PARTNERS,
}: LogoSectionEleosPartnersProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#f6f5ed] px-5 py-20 text-[#17141d] sm:px-10 sm:py-28 lg:min-h-[900px] lg:px-[4vw] lg:py-36">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(90deg, #deddd4 1px, transparent 1px)',
          backgroundSize: '150px 100%',
        }}
      />
      <div className="relative z-10 mx-auto grid max-w-[1800px] gap-16 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="max-w-[650px] font-mono text-[clamp(2.7rem,4.8vw,6rem)] uppercase leading-[1.04] tracking-[-0.055em]">
            {heading}
          </h2>
          <p className="mt-8 max-w-[720px] font-mono text-base leading-7 text-black/70 sm:text-xl">
            {description}
          </p>
        </div>
        <ol className="space-y-1 lg:pt-64">
          {partners.map((partner, index) => (
            <li
              key={partner}
              className="grid grid-cols-[3rem_1fr] items-baseline gap-4 font-mono"
            >
              <span className="text-sm text-black/35">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-[clamp(2rem,4.1vw,5rem)] uppercase leading-[1.12] tracking-[-0.045em]">
                {partner}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
