import * as React from 'react';
import Link from 'next/link';

export interface NavbarGrainMortarProps {
  brand?: string;
  links?: { label: string; href: string }[];
}

export function NavbarGrainMortar({
  brand = 'Grain & Mortar',
  links = ['Work', 'Brand', 'Web', 'About', 'Contact'].map((label) => ({
    label,
    href: '#',
  })),
}: NavbarGrainMortarProps) {
  return (
    <header className="w-full bg-[#f7f4ed] px-5 py-7 text-black sm:px-8 lg:px-[3vw] lg:py-10">
      <div className="mx-auto flex max-w-[1900px] items-center justify-between gap-8">
        <Link
          href="#"
          className="text-[clamp(1.8rem,2.6vw,3.5rem)] font-semibold tracking-[-0.06em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          {brand}
        </Link>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-[clamp(2rem,4vw,5rem)] md:flex"
        >
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xl font-semibold tracking-[-0.04em] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black lg:text-2xl"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none text-lg font-semibold">
            Menu
          </summary>
          <nav
            aria-label="Mobile"
            className="absolute right-0 z-20 mt-3 w-48 bg-black p-4 text-white shadow-xl"
          >
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
