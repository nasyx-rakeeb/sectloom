import * as React from 'react';

export interface PortfolioNglmCompaniesProps {
  eyebrow?: string;
  description?: string;
  companies?: string[];
}

const DEFAULT_COMPANIES = [
  'NORDISKA GALLERIET',
  'LÄNNA MÖBLER',
  'YLVA',
  'DUSTY DECO',
  'KAYO',
  'THE NEW ERA',
  'A. HUSEBY',
];

export function PortfolioNglmCompanies({
  eyebrow = 'Explore Our Companies',
  description = 'A portfolio of design-led companies with the ambition to define their category.',
  companies = DEFAULT_COMPANIES,
}: PortfolioNglmCompaniesProps) {
  return (
    <section className="w-full bg-[#fafafa] px-5 py-20 text-[#323232] sm:px-10 sm:py-28 lg:min-h-[960px] lg:px-[4vw] lg:py-36">
      <div className="mx-auto grid max-w-[1800px] gap-16 lg:grid-cols-2 lg:gap-24">
        <p className="text-xl font-semibold tracking-[-0.035em] sm:text-2xl">
          {eyebrow}
        </p>
        <div>
          <p className="max-w-[720px] font-serif text-[clamp(2.3rem,3.4vw,4.6rem)] leading-[1.05] tracking-[-0.035em]">
            {description}
          </p>
          <ul className="mt-20 lg:mt-28">
            {companies.map((company) => (
              <li
                key={company}
                className="font-serif text-[clamp(3rem,5vw,7rem)] uppercase leading-[0.98] tracking-[-0.055em] text-[#3d3d3d] transition-colors hover:text-black"
              >
                {company}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
