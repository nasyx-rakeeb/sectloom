import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface BronnStory {
  brand: string;
  brandMark?: string;
  date: string;
  title: string;
  description: string;
  href: string;
  accent?: string;
}

export interface BlogSectionBronnStoriesProps {
  heading?: string;
  allPosts?: { label: string; href: string } | null;
  stories?: BronnStory[];
}

const DEFAULT_STORIES: BronnStory[] = [
  {
    brand: 'zaplar',
    brandMark: 'Z',
    date: 'Jun 22, 2026',
    title:
      'How Zaplar is building the AI operating system for hotels and event venues',
    description:
      'Axel, Jon, Douglas and Oscar founded Zaplar to build the AI operating system for hotels and event venues.',
    href: '#',
    accent: '#0d5f4c',
  },
  {
    brand: 'ParkingAid',
    brandMark: 'P',
    date: 'Jun 17, 2026',
    title:
      'How ParkingAid connects parking, traffic and city planning on one data platform',
    description:
      'A shared data layer that helps cities, mobility operators and drivers move at the same pace.',
    href: '#',
    accent: '#2e9f99',
  },
  {
    brand: 'ethira',
    brandMark: 'E',
    date: 'Jun 9, 2026',
    title: 'How Ethira is building governance for the AI era',
    description:
      'Giving companies full control over every AI tool, agent and vendor as they scale.',
    href: '#',
    accent: '#111111',
  },
];

export function BlogSectionBronnStories({
  heading = 'Latest',
  allPosts = { label: 'All posts', href: '#' },
  stories = DEFAULT_STORIES,
}: BlogSectionBronnStoriesProps) {
  return (
    <section className="w-full bg-[#fafaf9] px-5 py-20 text-[#171717] sm:px-8 sm:py-28 lg:px-14 lg:py-36">
      <div className="mx-auto max-w-[1800px]">
        <div className="flex items-end justify-between gap-8">
          <h2 className="font-serif text-[clamp(3rem,4.4vw,5.5rem)] leading-none tracking-[-0.045em]">
            {heading}
          </h2>
          {allPosts ? (
            <Link
              href={allPosts.href}
              className="text-base text-[#696969] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              {allPosts.label}
              <ArrowRight aria-hidden="true" className="ml-1 inline size-4" />
            </Link>
          ) : null}
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-7 lg:mt-24">
          {stories.map((story) => (
            <article key={`${story.brand}-${story.title}`} className="min-w-0">
              <Link
                href={story.href}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
              >
                <div className="flex aspect-[1.12/1] items-center justify-center rounded-[18px] bg-[#f2f1ed] px-8">
                  <div
                    className="flex items-center gap-3 text-[clamp(2rem,3vw,4rem)] font-semibold tracking-[-0.05em]"
                    style={{ color: story.accent }}
                  >
                    <span aria-hidden="true">{story.brandMark}</span>
                    <span>{story.brand}</span>
                  </div>
                </div>
                <p className="mt-5 font-mono text-xs uppercase tracking-[0.04em] text-[#707070] sm:text-sm">
                  Customer Stories · {story.date}
                </p>
                <h3 className="mt-3 font-serif text-[clamp(1.5rem,1.9vw,2.35rem)] leading-[1.2] tracking-[-0.025em] group-hover:underline">
                  {story.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#696969] sm:text-lg">
                  {story.description}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
