import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface HeroPylonSupportProps {
  announcement?: React.ReactNode;
  brand?: string;
  navigation?: { label: string; href: string }[];
  heading?: React.ReactNode;
  description?: React.ReactNode;
  form?: { placeholder: string; actionLabel: string; action: string } | null;
  customerGroups?: { label: string; names: string[] }[];
}

const DEFAULT_GROUPS = [
  {
    label: 'Migrated off Zendesk',
    names: ['alchemy', 'AssemblyAI', 'HEX', 'ada'],
  },
  {
    label: 'Migrated off Intercom',
    names: ['baseten', 'Flatfile', 'hightouch', 'LOOP'],
  },
  { label: 'Others', names: ['Guru', 'deel.', 'Linear', 'WRITER'] },
];

export function HeroPylonSupport({
  announcement = (
    <>
      Register for our upcoming webinar
      <ArrowRight aria-hidden="true" className="mx-1 inline size-3.5" />
      <u>Support x Success: Building Collaborative Customer Workflows</u>
    </>
  ),
  brand = 'Pylon',
  navigation = ['Product', 'Customers', 'Resources', 'Pricing', 'Company'].map(
    (label) => ({ label, href: '#' })
  ),
  heading = (
    <>
      The support platform
      <br />
      built for <span className="text-[#888]">B2B</span>
    </>
  ),
  description = (
    <>
      Resolve customer issues faster with AI.
      <br />
      Support customers across modern channels.
    </>
  ),
  form = { placeholder: 'Enter Email', actionLabel: 'See Pylon', action: '#' },
  customerGroups = DEFAULT_GROUPS,
}: HeroPylonSupportProps) {
  return (
    <section className="w-full overflow-hidden bg-white text-[#101010]">
      <div className="bg-black px-4 py-3 text-center text-xs text-white sm:text-sm">
        {announcement}
      </div>
      <header className="flex min-h-24 items-center justify-between border-b border-black/25 px-5 sm:px-10 lg:px-[4vw]">
        <Link
          href="#"
          className="text-3xl font-semibold tracking-[-0.055em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          <span
            aria-hidden="true"
            className="mr-2 inline-flex size-6 items-center justify-center rounded-full border-2 border-[#5c1be8] align-[-0.1em]"
          >
            <span className="size-3 rounded-full bg-[#5c1be8]" />
          </span>
          {brand}
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-semibold hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden gap-3 sm:flex">
          <Link
            href="#"
            className="border border-black px-6 py-4 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            Sign in
          </Link>
          <Link
            href="#"
            className="bg-black px-6 py-4 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            Book a Demo
          </Link>
        </div>
        <details className="relative lg:hidden">
          <summary className="cursor-pointer list-none border border-black px-4 py-2 font-semibold">
            Menu
          </summary>
          <div className="absolute right-0 z-20 mt-2 w-52 border border-black bg-white p-4 shadow-xl">
            {navigation.map((item) => (
              <Link key={item.label} href={item.href} className="block py-2">
                {item.label}
              </Link>
            ))}
          </div>
        </details>
      </header>

      <div className="relative px-5 pb-20 pt-20 sm:px-10 lg:px-[4vw] lg:pt-28">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(#888 1px, transparent 1px), linear-gradient(90deg, #888 1px, transparent 1px)',
            backgroundSize: '130px 130px',
          }}
        />
        <div className="relative z-10 mx-auto flex max-w-[1050px] flex-col items-center text-center">
          <h1 className="text-[clamp(3.6rem,7.5vw,9rem)] font-normal leading-[0.94] tracking-[-0.075em]">
            {heading}
          </h1>
          <p className="mt-8 text-xl leading-[1.35] tracking-[-0.025em] sm:text-2xl">
            {description}
          </p>
          {form ? (
            <form
              action={form.action}
              className="mt-10 flex w-full max-w-[600px] border border-black bg-white text-left"
            >
              <label className="sr-only" htmlFor="pylon-email">
                Email
              </label>
              <input
                id="pylon-email"
                name="email"
                type="email"
                required
                placeholder={form.placeholder}
                className="min-w-0 flex-1 bg-transparent px-5 py-5 text-lg outline-none"
              />
              <button
                type="submit"
                className="bg-black px-7 py-5 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5c1be8] focus-visible:ring-inset"
              >
                {form.actionLabel}
              </button>
            </form>
          ) : null}
        </div>
        <div className="relative z-10 mx-auto mt-20 grid max-w-[1500px] border-l border-t border-black/20 md:grid-cols-3">
          {customerGroups.map((group) => (
            <div
              key={group.label}
              className="border-b border-r border-black/20 bg-white/95 p-7"
            >
              <h2 className="font-semibold">{group.label}</h2>
              <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-8">
                {group.names.map((name) => (
                  <span
                    key={name}
                    className="text-xl font-semibold tracking-[-0.04em] sm:text-2xl"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
