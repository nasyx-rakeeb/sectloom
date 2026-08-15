import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';

export interface FaqGroup {
  title: string;
  items: { question: string; answer: string }[];
}

export interface FaqABetterLouSupportProps {
  heading?: string;
  groups?: FaqGroup[];
  cta?: { label: string; href: string } | null;
}

const DEFAULT_GROUPS: FaqGroup[] = [
  {
    title: 'How it works',
    items: [
      {
        question: 'How do I get started?',
        answer:
          'Choose a plan and complete the short intake form. Our team will guide you from there.',
      },
      {
        question: 'Do I need to visit a clinic?',
        answer:
          'Most appointments can be completed remotely, depending on your care needs and location.',
      },
      {
        question: 'Is the plan the same for everyone?',
        answer:
          'No. Every plan is shaped around your goals, history, and ongoing progress.',
      },
      {
        question: 'Where are your services available?',
        answer:
          'Availability varies by region. Contact the team to confirm coverage in your area.',
      },
    ],
  },
  {
    title: 'Membership & Support',
    items: [
      {
        question: 'What is included in my membership?',
        answer:
          'Membership includes consultations, ongoing support, and a personalized care plan.',
      },
      {
        question: 'Can I cancel?',
        answer:
          'Yes. You can cancel according to the terms shown when you join.',
      },
      {
        question: 'How does support work?',
        answer:
          'Members can contact the care team through the secure support channel.',
      },
    ],
  },
  {
    title: 'Service & Details',
    items: [
      {
        question: 'Will I know if I am a good fit before committing?',
        answer:
          'Yes. The initial assessment helps determine whether the service is appropriate for you.',
      },
      {
        question: 'How soon can I expect to see progress?',
        answer:
          'Timelines vary, and your care team will set realistic milestones with you.',
      },
    ],
  },
];

export function FaqABetterLouSupport({
  heading = 'Frequently Asked Questions',
  groups = DEFAULT_GROUPS,
  cta = { label: 'Explore All', href: '#' },
}: FaqABetterLouSupportProps) {
  return (
    <section className="w-full bg-[#fff0dd] px-5 py-20 text-[#120900] sm:px-10 sm:py-28 lg:px-[4vw] lg:py-36">
      <div className="mx-auto grid max-w-[1800px] gap-16 lg:grid-cols-[0.9fr_1.35fr] lg:gap-24">
        <div>
          <h2 className="max-w-[620px] text-[clamp(3.6rem,6vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.065em]">
            {heading}
          </h2>
          {cta ? (
            <Link
              href={cta.href}
              className="mt-10 inline-flex min-h-14 items-center gap-6 rounded-full bg-[#ffb33f] px-8 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              {cta.label}
              <ArrowUpRight aria-hidden="true" className="size-5" />
            </Link>
          ) : null}
        </div>
        <div className="space-y-16">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-5 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                {group.title}
              </h3>
              <div className="border-t border-black/20">
                {group.items.map((item) => (
                  <details
                    key={item.question}
                    className="group border-b border-black/20"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-6 text-xl font-medium tracking-[-0.025em] marker:hidden sm:text-2xl">
                      {item.question}
                      <Plus
                        aria-hidden="true"
                        className="size-7 shrink-0 transition-transform group-open:rotate-45"
                      />
                    </summary>
                    <p className="max-w-2xl pb-6 pr-12 text-base leading-7 text-black/65 sm:text-lg">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
