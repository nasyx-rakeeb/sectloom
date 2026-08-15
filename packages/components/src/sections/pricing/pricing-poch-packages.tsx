import * as React from 'react';
import Link from 'next/link';
import { Dices, Flame, Plus, Rocket, Smile } from 'lucide-react';

export type PochPlanIcon = 'flame' | 'rocket' | 'smile' | 'dice';

export interface PochPricingPlan {
  name: string;
  tagline: string;
  features: string[];
  price: string;
  href: string;
  icon?: PochPlanIcon;
  featured?: boolean;
  additions?: string[];
}

export interface PricingPochPackagesProps {
  heading?: string;
  plans?: PochPricingPlan[];
}

const DEFAULT_PLANS: PochPricingPlan[] = [
  {
    name: 'Sprint',
    tagline: 'When your ass is on fire!',
    icon: 'flame',
    features: ['Base Identity', 'Zero Revisions'],
    price: '$999',
    href: '#',
  },
  {
    name: 'Start-Up',
    tagline: 'Start smart — go far.',
    icon: 'rocket',
    features: ['Base Identity', 'Landing Page', 'No-Code Development'],
    additions: ['Social Media Content', '3D Visuals'],
    price: '$2000',
    href: '#',
  },
  {
    name: 'The Identity',
    tagline: 'All you (actually) need.',
    icon: 'smile',
    features: ['Full Brand Identity'],
    additions: ['Landing Page', 'No-Code Development', 'Motion Design'],
    price: '$3000',
    href: '#',
  },
  {
    name: 'Bombastic',
    tagline: 'Get it all!',
    icon: 'dice',
    features: [
      'Full Brand Identity',
      'Full Brandbook',
      'Multipage Website',
      'Custom Development',
      'Social Media Content',
      'Motion Design',
      '3D Visuals',
    ],
    price: '$6000+',
    href: '#',
    featured: true,
  },
];

const PLAN_ICONS = {
  flame: Flame,
  rocket: Rocket,
  smile: Smile,
  dice: Dices,
};

export function PricingPochPackages({
  heading = 'Pricing',
  plans = DEFAULT_PLANS,
}: PricingPochPackagesProps) {
  return (
    <section className="w-full bg-black px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-[4vw] lg:py-36">
      <div className="mx-auto max-w-[1800px]">
        <h2 className="text-center font-mono text-lg uppercase tracking-[0.08em]">
          {heading}
        </h2>
        <div className="mt-16 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => {
            const PlanIcon = plan.icon ? PLAN_ICONS[plan.icon] : null;

            return (
              <article
                key={plan.name}
                className={`flex min-h-[620px] flex-col rounded-[28px] p-7 text-black ${plan.featured ? 'bg-[#f399c1]' : 'bg-[#fafafa]'}`}
              >
                <h3 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                  {plan.name}
                </h3>
                <p className="mt-3 flex items-center gap-2 border-b border-black/25 pb-5 font-serif text-lg">
                  {PlanIcon ? (
                    <PlanIcon aria-hidden="true" className="size-4 shrink-0" />
                  ) : null}
                  {plan.tagline}
                </p>
                <ul className="mt-5 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-lg font-semibold">
                      <span
                        className={`mr-3 inline-block h-4 w-4 rounded-full ${plan.featured ? 'bg-white' : 'bg-[#f399c1]'}`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                {plan.additions?.length ? (
                  <div className="mt-8 text-black/45">
                    <p className="font-semibold text-black/70">
                      Individually priced:
                    </p>
                    {plan.additions.map((addition) => (
                      <p
                        key={addition}
                        className="mt-2 flex items-center gap-1.5"
                      >
                        <Plus
                          aria-hidden="true"
                          className="size-3.5 shrink-0"
                        />
                        {addition}
                      </p>
                    ))}
                  </div>
                ) : null}
                <p className="mt-auto pt-10 text-[clamp(4rem,5vw,7rem)] font-medium leading-none tracking-[-0.065em]">
                  {plan.price}
                </p>
                <Link
                  href={plan.href}
                  className="mt-6 inline-flex min-h-14 items-center justify-center rounded-full bg-white px-6 text-lg font-semibold shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  Get This Package
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
