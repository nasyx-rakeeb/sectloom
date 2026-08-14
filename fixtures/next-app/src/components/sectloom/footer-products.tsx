import * as React from 'react';
import Link from 'next/link';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title?: string;
  links: FooterLink[];
}

export interface FooterProductsProps {
  brand?: {
    name: string;
    description: string;
    certification?: string;
  };
  navigation?: FooterLink[];
  enterpriseCta?: {
    label: string;
    href: string;
  } | null;
  socials?: {
    icon: React.ReactNode;
    href: string;
    label: string;
  }[];
  linkGroups?: FooterLinkGroup[];
  legal?: {
    privacyHref?: string;
    termsHref?: string;
    commercialTermsHref?: string;
    copyright: string;
  };
}

const DEFAULT_BRAND = {
  name: '1inch"',
  description: 'Built on infrastructure licensed by Degensoft Ltd,',
  certification: 'operated under ISO/IEC 27001:2022-certified ISM.',
};

const DEFAULT_NAVIGATION: FooterLink[] = [
  { label: 'Documentation', href: '/docs' },
  { label: 'Help Center', href: '/help' },
  { label: 'Talk to us', href: '/contact' },
  { label: 'Documentation for LLMs', href: '/llms.txt' },
];

const DEFAULT_SOCIALS = [
  {
    icon: <span className="text-xs font-bold">YT</span>,
    href: '#',
    label: 'YouTube',
  },
  {
    icon: <span className="text-xs font-bold">IG</span>,
    href: '#',
    label: 'Instagram',
  },
  {
    icon: <span className="text-xs font-bold">GH</span>,
    href: '#',
    label: 'GitHub',
  },
  {
    icon: <span className="text-xs font-bold">TG</span>,
    href: '#',
    label: 'Telegram',
  },
  {
    icon: <span className="text-xs font-bold">in</span>,
    href: '#',
    label: 'LinkedIn',
  },
  {
    icon: <span className="font-serif text-xl font-bold">M</span>,
    href: '#',
    label: 'Medium',
  },
  {
    icon: <span className="text-xs font-bold">R</span>,
    href: '#',
    label: 'Reddit',
  },
  {
    icon: <span className="text-lg font-medium">X</span>,
    href: '#',
    label: 'X',
  },
  {
    icon: <span className="text-xs font-bold">DC</span>,
    href: '#',
    label: 'Discord',
  },
];

const DEFAULT_LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: 'Products',
    links: [
      { label: 'Swap API', href: '#' },
      { label: 'Spot Price API', href: '#' },
      { label: 'Portfolio API', href: '#' },
      { label: 'Traces API', href: '#' },
      { label: 'Domain API', href: '#' },
    ],
  },
  {
    links: [
      { label: 'Orderbook API', href: '#' },
      { label: 'Token API', href: '#' },
      { label: 'Gas Price API', href: '#' },
      { label: 'History API', href: '#' },
      { label: 'Token Details API', href: '#' },
    ],
  },
  {
    links: [
      { label: 'Balance API', href: '#' },
      { label: 'Transaction API', href: '#' },
      { label: 'NFT API', href: '#' },
      { label: 'Web3 RPC API', href: '#' },
      { label: 'Charts API', href: '#' },
    ],
  },
  {
    title: 'Chains',
    links: [
      { label: 'Arbitrum', href: '#' },
      { label: 'BNB Chain', href: '#' },
      { label: 'Ethereum', href: '#' },
      { label: 'Optimism', href: '#' },
      { label: 'Solana', href: '#' },
      { label: 'Robinhood', href: '#' },
    ],
  },
  {
    links: [
      { label: 'Avalanche', href: '#' },
      { label: 'Cronos', href: '#' },
      { label: 'Gnosis', href: '#' },
      { label: 'Polygon', href: '#' },
      { label: 'Sonic', href: '#' },
    ],
  },
  {
    links: [
      { label: 'Base', href: '#' },
      { label: 'ZKsync', href: '#' },
      { label: 'Monad', href: '#' },
      { label: 'Linea', href: '#' },
      { label: 'Unichain', href: '#' },
    ],
  },
];

const SOCIAL_POSITIONS = [
  'col-start-1 row-start-1',
  'col-start-2 row-start-1',
  'col-start-1 row-start-2',
  'col-start-2 row-start-2',
  'col-start-3 row-start-2',
  'col-start-1 row-start-3',
  'col-start-2 row-start-3',
  'col-start-3 row-start-3',
  'col-start-4 row-start-3',
];

export function FooterProducts({
  brand = DEFAULT_BRAND,
  navigation = DEFAULT_NAVIGATION,
  enterpriseCta = { label: 'Get Enterprise', href: '/enterprise' },
  socials = DEFAULT_SOCIALS,
  linkGroups = DEFAULT_LINK_GROUPS,
  legal = {
    privacyHref: '/privacy',
    termsHref: '/terms',
    commercialTermsHref: '/commercial-terms',
    copyright: '© 2026 1inch',
  },
}: FooterProductsProps) {
  return (
    <footer className="w-full overflow-hidden bg-black px-5 pb-10 pt-20 text-white sm:px-10 sm:pt-28 lg:px-[4vw] lg:pt-[7vw]">
      <div className="mx-auto max-w-[1880px]">
        <div className="grid gap-20 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24">
          <div className="flex flex-col items-start">
            <p className="text-[clamp(5rem,10vw,10.5rem)] font-normal leading-[0.78] tracking-[-0.075em]">
              {brand.name}
            </p>

            <p className="mt-16 max-w-[330px] text-lg leading-[1.45] text-white sm:text-xl">
              {brand.description}
              {brand.certification ? (
                <span className="block text-[#3f6cff]">
                  {brand.certification}
                </span>
              ) : null}
            </p>

            {navigation.length > 0 ? (
              <ul className="mt-12 flex flex-col gap-5 text-lg text-[#929298] sm:text-xl">
                {navigation.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}

            {enterpriseCta ? (
              <Link
                href={enterpriseCta.href}
                className="mt-24 inline-flex min-h-16 min-w-[290px] items-center justify-center rounded-full bg-white px-10 text-lg font-semibold text-black transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black"
              >
                {enterpriseCta.label}
              </Link>
            ) : null}

            {socials.length > 0 ? (
              <div className="mt-20 grid grid-cols-4 grid-rows-3">
                {socials
                  .slice(0, SOCIAL_POSITIONS.length)
                  .map((social, index) => (
                    <Link
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className={`${SOCIAL_POSITIONS[index]} flex h-16 w-16 items-center justify-center border border-[#202024] bg-[#101014] text-white transition-colors hover:bg-[#1c1c21] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white`}
                    >
                      {social.icon}
                    </Link>
                  ))}
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-3">
            {linkGroups.map((group, index) => {
              const startsNewRow = index === 3;
              return (
                <div
                  key={`${group.title ?? 'links'}-${index}`}
                  className={`${startsNewRow ? 'col-span-2 col-start-1 border-t border-[#242428] pt-10 sm:col-span-1 sm:col-start-1' : index > 3 ? 'border-t border-[#242428] pt-10' : ''}`}
                >
                  <h3 className="min-h-8 text-lg font-semibold">
                    {group.title ?? <span className="sr-only">Links</span>}
                  </h3>
                  <ul className="mt-5 flex flex-col gap-5 text-lg text-[#929298] sm:text-xl">
                    {group.links.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {legal ? (
          <div className="mt-28 flex flex-col gap-5 border-t border-[#242428] pt-8 text-sm text-[#929298] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 lg:border-0 lg:pt-0 lg:text-base">
            {legal.privacyHref ? (
              <Link className="hover:text-white" href={legal.privacyHref}>
                Privacy Policy
              </Link>
            ) : null}
            {legal.termsHref ? (
              <Link className="hover:text-white" href={legal.termsHref}>
                Terms of Use
              </Link>
            ) : null}
            {legal.commercialTermsHref ? (
              <Link
                className="hover:text-white"
                href={legal.commercialTermsHref}
              >
                Commercial API Terms of Use
              </Link>
            ) : null}
            <span className="sm:ml-auto">{legal.copyright}</span>
          </div>
        ) : null}
      </div>
    </footer>
  );
}
