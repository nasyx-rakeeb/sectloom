import * as React from 'react';
import Link from 'next/link';
import {
  Globe,
  MessageSquare,
  Briefcase,
  Video,
  Rss,
  Hexagon,
  Activity,
} from 'lucide-react'; // Using generic lucide icons for socials

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
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
  };
  socials?: {
    icon: React.ReactNode;
    href: string;
    label: string;
  }[];
  linkGroups?: FooterLinkGroup[];
  legal?: {
    privacyHref: string;
    termsHref: string;
    copyright: string;
  };
}

export function FooterProducts({
  brand = {
    name: 'Sectloom',
    description: 'Built on infrastructure licensed by Sectloom Ltd.',
    certification: 'operated under ISO/IEC 27001:2022-certified ISM.',
  },
  navigation = [
    { label: 'Documentation', href: '/docs' },
    { label: 'Help Center', href: '/help' },
    { label: 'Talk to us', href: '/contact' },
    { label: 'Documentation for LLMs', href: '/llms.txt' },
  ],
  enterpriseCta = {
    label: 'Get Enterprise',
    href: '/enterprise',
  },
  socials = [
    { icon: <Video className="w-5 h-5" />, href: '#', label: 'YouTube' },
    { icon: <Activity className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <Globe className="w-5 h-5" />, href: '#', label: 'GitHub' },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      href: '#',
      label: 'Twitter',
    },
    { icon: <Briefcase className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
    { icon: <Rss className="w-5 h-5" />, href: '#', label: 'Blog' },
    { icon: <Hexagon className="w-5 h-5" />, href: '#', label: 'Discord' },
  ],
  linkGroups = [
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
      title: ' ', // empty title to align next column
      links: [
        { label: 'Orderbook API', href: '#' },
        { label: 'Token API', href: '#' },
        { label: 'Gas Price API', href: '#' },
        { label: 'History API', href: '#' },
        { label: 'Token Details API', href: '#' },
      ],
    },
    {
      title: ' ',
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
      ],
    },
    {
      title: ' ',
      links: [
        { label: 'Avalanche', href: '#' },
        { label: 'Cronos', href: '#' },
        { label: 'Gnosis', href: '#' },
        { label: 'Polygon', href: '#' },
        { label: 'Sonic', href: '#' },
      ],
    },
  ],
  legal = {
    privacyHref: '/privacy',
    termsHref: '/terms',
    copyright: '© 2026 Sectloom',
  },
}: FooterProductsProps) {
  return (
    <footer className="bg-background text-foreground border-t border-border/20 pt-16 pb-8 px-6">
      <div className="mx-auto max-w-[var(--container-xl)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start gap-8">
            <div>
              <span className="text-5xl font-bold tracking-tight">
                {brand?.name}
              </span>
            </div>

            {(brand?.description || brand?.certification) && (
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                {brand.description}
                {brand.certification && (
                  <span className="block text-primary mt-1">
                    {brand.certification}
                  </span>
                )}
              </p>
            )}

            {navigation && navigation.length > 0 && (
              <ul className="flex flex-col gap-3 mt-4">
                {navigation.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {enterpriseCta && (
              <Link
                href={enterpriseCta.href}
                className="mt-4 px-6 py-3 rounded-[var(--radius-full)] bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {enterpriseCta.label}
              </Link>
            )}
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
              {linkGroups?.map((group, i) => (
                <div key={i} className="flex flex-col gap-6">
                  <span className="text-sm font-semibold h-5">
                    {group.title.trim() ? group.title : null}
                  </span>
                  <ul className="flex flex-col gap-4">
                    {group.links.map((link, j) => (
                      <li key={j}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-8 border-t border-border/10">
          <div className="flex flex-wrap gap-2">
            {socials?.map((social, i) => (
              <Link
                key={i}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 flex items-center justify-center rounded-md bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {social.icon}
              </Link>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 text-sm text-muted-foreground">
            {legal && (
              <>
                <Link
                  href={legal.privacyHref}
                  className="hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href={legal.termsHref}
                  className="hover:text-foreground transition-colors"
                >
                  Terms of Use
                </Link>
                <span>{legal.copyright}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
