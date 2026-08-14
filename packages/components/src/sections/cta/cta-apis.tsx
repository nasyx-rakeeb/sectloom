import * as React from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';

export interface CtaApisProps {
  heading: string;
  cta?: {
    label: string;
    href: string;
  };
}

function getDotStyle(index: number): React.CSSProperties {
  return {
    opacity: 0.2 + ((index * 37) % 51) / 100,
    transform: `scale(${0.5 + ((index * 29) % 51) / 100})`,
  };
}

export function CtaApis({
  heading = 'Power your app with enterprise-grade APIs',
  cta = { label: 'Contact sales', href: '/contact' },
}: CtaApisProps) {
  return (
    <section className="w-full bg-background px-4 py-8 sm:py-16">
      <div className="mx-auto max-w-[var(--container-xl)]">
        <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-primary text-primary-foreground px-8 py-16 sm:px-16 sm:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10 flex flex-col items-start gap-8">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight max-w-lg">
              {heading}
            </h2>
            {cta && (
              <Link
                href={cta.href}
                className="inline-flex h-12 items-center justify-center rounded-[var(--radius-full)] bg-background px-8 text-sm font-medium text-foreground transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                {cta.label}
              </Link>
            )}
          </div>

          <div className="relative z-0 flex justify-center md:justify-end opacity-20 md:opacity-100">
            {/* Abstract geometric graphic replacing the specific branded dots */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-4 animate-pulse duration-3000">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 sm:w-6 sm:h-6 rounded-sm bg-primary-foreground/30 flex items-center justify-center"
                  style={getDotStyle(i)}
                >
                  {i % 5 === 0 && (
                    <Zap className="w-full h-full text-primary-foreground/50" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
