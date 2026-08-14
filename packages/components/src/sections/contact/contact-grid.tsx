import * as React from 'react';
import Link from 'next/link';

export interface ContactGridInquiry {
  label: string;
  action: string;
  href: string;
  featured?: boolean;
}

export interface ContactGridProps {
  heading?: string;
  inquiries?: ContactGridInquiry[];
  address?: {
    label: string;
    description: string;
    location: string;
  } | null;
  socials?: {
    label: string;
    links: { label: string; href: string }[];
  } | null;
  careers?: {
    label: string;
    meta?: string;
    action?: string;
    href: string;
  } | null;
}

const DEFAULT_INQUIRIES: ContactGridInquiry[] = [
  {
    label: 'Start a project',
    action: 'Submit brief',
    href: '#',
    featured: true,
  },
  {
    label: 'Business Enquiries',
    action: 'business@afternow.co',
    href: 'mailto:business@afternow.co',
  },
  {
    label: 'Marketing Enquiries',
    action: 'marketing@afternow.co',
    href: 'mailto:marketing@afternow.co',
  },
];

const DEFAULT_ADDRESS = {
  label: 'Address',
  description:
    "We're a remote native company spread across the globe, orchestrated from our Croatian Headquarters.",
  location: 'Smokvik 20,\n51500 Krk,\nCroatia',
};

const DEFAULT_CAREERS = {
  label: 'Join us',
  meta: '5 open positions',
  action: 'Careers',
  href: '/careers',
};

const DEFAULT_SOCIALS = {
  label: 'Socials',
  links: [
    { label: 'Instagram', href: '#' },
    { label: 'Dribbble', href: '#' },
    { label: 'X', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ],
};

const pillClass =
  'inline-flex min-h-7 max-w-[55%] shrink items-center overflow-hidden text-ellipsis whitespace-nowrap rounded-full bg-[#65675f] px-3 text-[9px] font-medium uppercase tracking-[0.05em] text-[#deded8] transition-colors group-hover:bg-[#74766d] sm:max-w-none sm:shrink-0 sm:text-[10px] sm:tracking-[0.08em]';

export function ContactGrid({
  heading = 'The best work begins with the right introduction',
  inquiries = DEFAULT_INQUIRIES,
  address = DEFAULT_ADDRESS,
  careers = DEFAULT_CAREERS,
  socials = DEFAULT_SOCIALS,
}: ContactGridProps) {
  return (
    <section className="w-full overflow-hidden bg-black px-5 py-24 text-[#ededeb] sm:px-10 sm:py-32 lg:px-[4.5vw] lg:py-[8vw]">
      <div className="mx-auto grid w-full min-w-0 max-w-[1450px] gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
        <h2 className="max-w-[570px] text-[clamp(2.6rem,4.2vw,5.25rem)] font-normal leading-[1.08] tracking-[-0.045em] text-[#777872]">
          {heading}
        </h2>

        <div className="min-w-0 flex flex-col gap-8">
          {inquiries.length > 0 ? (
            <div className="min-w-0 max-w-full overflow-hidden rounded-[14px] border border-black/40">
              {inquiries.map((inquiry) => (
                <Link
                  key={`${inquiry.label}-${inquiry.action}`}
                  href={inquiry.href}
                  className={`group flex min-h-[76px] items-center justify-between gap-5 border-b border-black/45 px-6 transition-colors last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#efefe9] focus-visible:ring-inset sm:px-8 ${inquiry.featured ? 'bg-[#a9ab9d] text-[#30312e] hover:bg-[#b6b8aa]' : 'bg-[#3d3e39] hover:bg-[#474842]'}`}
                >
                  <span className="min-w-0 text-sm sm:text-base">
                    {inquiry.label}
                  </span>
                  <span className={pillClass}>
                    {inquiry.action}
                    {inquiry.featured ? (
                      <span aria-hidden="true" className="ml-1.5">
                        ›
                      </span>
                    ) : null}
                  </span>
                </Link>
              ))}
            </div>
          ) : null}

          {address ? (
            <div className="grid overflow-hidden rounded-[14px] border border-black/40 bg-[#3d3e39] sm:grid-cols-[1.4fr_0.6fr]">
              <div className="flex min-h-[166px] flex-col justify-between gap-10 border-b border-black/45 p-6 sm:border-b-0 sm:border-r sm:p-8">
                <span className="text-base">{address.label}</span>
                <p className="max-w-[450px] text-sm leading-relaxed text-[#81827c]">
                  {address.description}
                </p>
              </div>
              <address className="flex items-end whitespace-pre-line p-6 text-sm not-italic leading-relaxed text-[#deded8] sm:p-8">
                {address.location}
              </address>
            </div>
          ) : null}

          {careers || socials ? (
            <div className="overflow-hidden rounded-[14px] border border-black/40 bg-[#3d3e39]">
              {careers ? (
                <Link
                  href={careers.href}
                  className="group flex min-h-[76px] items-center justify-between gap-5 border-b border-black/45 px-6 transition-colors hover:bg-[#474842] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#efefe9] focus-visible:ring-inset sm:px-8"
                >
                  <span className="flex flex-wrap items-baseline gap-2 text-sm sm:text-base">
                    {careers.label}
                    {careers.meta ? (
                      <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#85867f]">
                        {careers.meta}
                      </span>
                    ) : null}
                  </span>
                  <span className={pillClass}>
                    {careers.action ?? 'Careers'}
                    <span aria-hidden="true" className="ml-1.5">
                      ›
                    </span>
                  </span>
                </Link>
              ) : null}

              {socials ? (
                <div className="flex min-h-[76px] flex-col justify-between gap-5 px-6 py-5 sm:flex-row sm:items-center sm:px-8">
                  <span className="text-sm sm:text-base">{socials.label}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {socials.links.map((social) => (
                      <Link
                        key={social.label}
                        href={social.href}
                        className={`${pillClass} hover:bg-[#74766d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#efefe9]`}
                      >
                        {social.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
