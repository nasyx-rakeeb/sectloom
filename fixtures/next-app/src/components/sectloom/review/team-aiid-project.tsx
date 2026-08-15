import * as React from 'react';

export interface AiidCredit {
  role: string;
  names: string;
}

export interface TeamAiidProjectProps {
  eyebrow?: string;
  heading?: string;
  credits?: AiidCredit[];
}

const DEFAULT_CREDITS: AiidCredit[] = [
  { role: 'Project lead', names: 'Robyn Park' },
  { role: 'Executive producers', names: 'Ben Blumenrose, Steve Vassallo' },
  { role: 'Editorial', names: 'Nathalie Arbel' },
  { role: 'Research and data analysis', names: 'Nili Metuki' },
  { role: 'Identity and website design', names: '++hellohello' },
  { role: 'Creative direction', names: 'Heather Phillips, ++hellohello' },
  { role: 'Video production', names: 'Seed Stories' },
  { role: 'Program support', names: 'Jackie Berardo' },
];

export function TeamAiidProject({
  eyebrow = 'Made by',
  heading = 'This project was created through collaboration between researchers, writers, and designers across multiple teams.',
  credits = DEFAULT_CREDITS,
}: TeamAiidProjectProps) {
  return (
    <section className="w-full bg-black px-5 py-20 text-[#f1f1f1] sm:px-10 sm:py-28 lg:px-[4vw] lg:py-36">
      <div className="mx-auto grid max-w-[1800px] gap-16 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
        <p className="font-mono text-sm uppercase tracking-[0.05em]">
          {eyebrow}
        </p>
        <div>
          <h2 className="max-w-[1250px] text-[clamp(2.6rem,4.7vw,6rem)] font-normal leading-[1.04] tracking-[-0.055em]">
            {heading}
          </h2>
          <div className="mt-24 lg:mt-36">
            <div className="grid grid-cols-2 gap-6 border-b border-white/35 pb-5 font-mono text-xs uppercase">
              <span>Role</span>
              <span>Credits</span>
            </div>
            {credits.map((credit) => (
              <div
                key={`${credit.role}-${credit.names}`}
                className="grid grid-cols-1 gap-3 border-b border-white/35 py-7 sm:grid-cols-2 sm:gap-6"
              >
                <h3 className="text-2xl tracking-[-0.04em] sm:text-3xl">
                  {credit.role}
                </h3>
                <p className="text-lg text-white/55 sm:text-xl">
                  {credit.names}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
