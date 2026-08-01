import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface ContactGridInquiry {
  label: string;
  emailOrAction: string;
  href: string;
}

export interface ContactGridProps {
  heading: string;
  inquiries?: ContactGridInquiry[];
  address?: {
    label: string;
    description: string;
    location: string;
  };
  socials?: {
    label: string;
    links: { label: string; href: string }[];
  };
  careers?: {
    label: string;
    href: string;
  };
}

export function ContactGrid({
  heading = 'The best work begins with the right introduction',
  inquiries = [
    { label: 'Start a project', emailOrAction: 'SUBMIT BRIEF', href: '#' },
    {
      label: 'Business Enquiries',
      emailOrAction: 'business@example.com',
      href: 'mailto:business@example.com',
    },
    {
      label: 'Marketing Enquiries',
      emailOrAction: 'marketing@example.com',
      href: 'mailto:marketing@example.com',
    },
  ],
  address = {
    label: 'Address',
    description:
      "We're a remote native company spread across the globe, orchestrated from our headquarters.",
    location: 'Smokvik 20,\n51500 Krk,\nCroatia',
  },
  careers = {
    label: 'Join us (5 open positions)',
    href: '/careers',
  },
  socials = {
    label: 'Socials',
    links: [
      { label: 'Instagram', href: '#' },
      { label: 'Dribbble', href: '#' },
      { label: 'X', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
  },
}: ContactGridProps) {
  return (
    <section className="bg-background text-foreground py-24 sm:py-32 px-6 border-t border-border">
      <div className="mx-auto max-w-[var(--container-xl)] grid lg:grid-cols-2 gap-16 lg:gap-24">
        <div className="max-w-lg">
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-muted-foreground leading-tight">
            {heading}
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {/* Inquiries */}
          {inquiries && inquiries.length > 0 && (
            <div className="flex flex-col bg-muted/50 rounded-[var(--radius-lg)] overflow-hidden border border-border/50">
              {inquiries.map((inquiry, i) => (
                <Link
                  key={i}
                  href={inquiry.href}
                  className="flex items-center justify-between p-6 sm:px-8 border-b border-border/50 last:border-b-0 hover:bg-muted transition-colors group focus-visible:outline-none focus-visible:bg-muted"
                >
                  <span className="font-medium">{inquiry.label}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground bg-background px-3 py-1.5 rounded-full border border-border/50 group-hover:border-foreground/20 transition-colors">
                      {inquiry.emailOrAction}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Address */}
          {address && (
            <div className="grid sm:grid-cols-3 bg-muted/50 rounded-[var(--radius-lg)] border border-border/50 overflow-hidden">
              <div className="sm:col-span-2 p-6 sm:px-8 flex flex-col justify-between gap-6 border-b sm:border-b-0 sm:border-r border-border/50">
                <span className="font-medium">{address.label}</span>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                  {address.description}
                </p>
              </div>
              <div className="p-6 sm:px-8 flex items-end">
                <address className="not-italic text-sm text-foreground whitespace-pre-line leading-relaxed">
                  {address.location}
                </address>
              </div>
            </div>
          )}

          {/* Bottom links */}
          <div className="flex flex-col bg-muted/50 rounded-[var(--radius-lg)] border border-border/50 overflow-hidden">
            {careers && (
              <Link
                href={careers.href}
                className="flex items-center justify-between p-6 sm:px-8 border-b border-border/50 hover:bg-muted transition-colors group focus-visible:outline-none focus-visible:bg-muted"
              >
                <span className="font-medium">{careers.label}</span>
                <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground bg-background px-3 py-1.5 rounded-full border border-border/50 flex items-center gap-2 group-hover:border-foreground/20 transition-colors">
                  Careers <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            )}

            {socials && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 sm:px-8 gap-6">
                <span className="font-medium">{socials.label}</span>
                <div className="flex flex-wrap gap-2">
                  {socials.links.map((link, i) => (
                    <Link
                      key={i}
                      href={link.href}
                      className="text-xs font-semibold tracking-wider uppercase text-muted-foreground hover:text-foreground bg-background px-3 py-1.5 rounded-full border border-border/50 hover:border-foreground/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
