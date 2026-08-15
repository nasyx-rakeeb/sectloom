'use client';

import * as React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface StenoQuote {
  quote: string;
  author: string;
}

export interface StenoCarouselContentProps {
  heading: string;
  quotes: StenoQuote[];
}

export function StenoCarouselContent({
  heading,
  quotes,
}: StenoCarouselContentProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);

  const move = (direction: -1 | 1) => {
    trackRef.current?.scrollBy({
      left: direction * Math.min(window.innerWidth * 0.72, 620),
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-10 sm:flex-row sm:items-end">
        <h2 className="max-w-[1000px] font-serif text-[clamp(3.5rem,6.3vw,8rem)] leading-[1.02] tracking-[-0.055em]">
          {heading}
        </h2>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous testimonials"
            className="flex h-16 w-20 items-center justify-center rounded-2xl border border-[#c9c6b3] text-3xl text-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            <ArrowLeft aria-hidden="true" className="size-7" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next testimonials"
            className="flex h-16 w-20 items-center justify-center rounded-2xl border border-[#c9c6b3] text-3xl text-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            <ArrowRight aria-hidden="true" className="size-7" />
          </button>
        </div>
      </div>
      <div
        ref={trackRef}
        className="mt-16 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {quotes.map((quote, index) => (
          <article
            key={`${quote.author}-${index}`}
            className="min-h-[480px] w-[84vw] max-w-[560px] shrink-0 snap-center rounded-[18px] border border-[#d5d1bd] bg-[#efeddd] p-5 sm:min-h-[560px]"
          >
            <p className="flex items-center gap-2 text-sm text-black/50">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#b3ff43] font-bold text-black">
                S
              </span>
              {quote.author}
            </p>
            <blockquote className="mt-5 min-h-[380px] rounded-[16px] bg-[#faf8ed] p-8 font-serif text-[clamp(1.55rem,2vw,2.25rem)] leading-[1.2] tracking-[-0.025em] sm:min-h-[450px] sm:p-10">
              “{quote.quote}”
            </blockquote>
          </article>
        ))}
      </div>
    </div>
  );
}
