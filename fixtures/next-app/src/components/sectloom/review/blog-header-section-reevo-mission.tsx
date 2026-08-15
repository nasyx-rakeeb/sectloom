import * as React from 'react';

export interface BlogHeaderSectionReevoMissionProps {
  eyebrow?: string;
  heading?: string;
  statements?: React.ReactNode[];
}

const DEFAULT_STATEMENTS: React.ReactNode[] = [
  <>
    <strong>We didn&apos;t start Reevo because we love CRMs.</strong> We started
    it because the way revenue teams are forced to work is{' '}
    <strong>fundamentally broken.</strong>
  </>,
  <>
    You&apos;ve been sold a &quot;modern tech stack.&quot; What you got is a{' '}
    <strong>Frankenstack of point solutions,</strong> brittle APIs, and
    overpriced databases.
  </>,
  <>
    It&apos;s expensive. It&apos;s fragmented. And it forces your reps to work
    for the software, <strong>instead of the software working for them.</strong>
  </>,
];

function CheckerField() {
  return (
    <div
      aria-hidden="true"
      className="h-24 w-full opacity-90 sm:h-32"
      style={{
        backgroundColor: '#72d3e4',
        backgroundImage:
          'linear-gradient(45deg, white 25%, transparent 25%), linear-gradient(-45deg, white 25%, transparent 25%), linear-gradient(45deg, transparent 75%, white 75%), linear-gradient(-45deg, transparent 75%, white 75%)',
        backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0px',
        backgroundSize: '12px 12px',
        clipPath:
          'polygon(0 0, 18% 0, 18% 34%, 31% 34%, 31% 0, 48% 0, 48% 56%, 62% 56%, 62% 0, 76% 0, 76% 28%, 88% 28%, 88% 0, 100% 0, 100% 100%, 0 100%)',
      }}
    />
  );
}

export function BlogHeaderSectionReevoMission({
  eyebrow = 'About us',
  heading = 'The modern sales stack is a crime scene.',
  statements = DEFAULT_STATEMENTS,
}: BlogHeaderSectionReevoMissionProps) {
  return (
    <section className="w-full overflow-hidden bg-[#f7f7f5] text-[#090909]">
      <div className="mx-auto max-w-[1800px] px-5 py-6 sm:px-8 lg:px-12">
        <div className="bg-[#72d3e4] px-5 pb-0 pt-8 sm:px-10 sm:pt-12 lg:px-16 lg:pt-16">
          <p className="font-mono text-sm uppercase tracking-[-0.04em] sm:text-base">
            {eyebrow}
          </p>
          <h1 className="mt-7 max-w-[1450px] font-sans text-[clamp(3rem,8.4vw,9.5rem)] font-black uppercase leading-[0.82] tracking-[-0.075em]">
            {heading}
          </h1>
          <div className="mt-10 -mx-5 sm:-mx-10 lg:-mx-16">
            <CheckerField />
          </div>
        </div>

        <div className="mx-auto max-w-[1500px] py-20 sm:py-28 lg:py-40">
          {statements.map((statement, index) => (
            <p
              key={index}
              className="mb-16 text-[clamp(2rem,4.5vw,5.6rem)] font-normal leading-[1.08] tracking-[-0.055em] last:mb-0"
            >
              {statement}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
