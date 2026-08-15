import * as React from 'react';
import {
  StenoCarouselContent,
  type StenoQuote,
} from './testimonial-steno-carousel.client';

export interface TestimonialStenoCarouselProps {
  heading?: string;
  quotes?: StenoQuote[];
}

const DEFAULT_QUOTES: StenoQuote[] = [
  {
    author: 'Steno.ai User',
    quote:
      'This is the greatest application of AI I have experienced to date. It is incredibly interactive and conversational.',
  },
  {
    author: 'Steno.ai User',
    quote:
      'Amazing technology. I have the most amazing coach at my fingertips whenever I need him, with practical coaching that addresses real issues.',
  },
  { author: 'Steno.ai User', quote: 'Probably the best AI tool I have used.' },
  {
    author: 'Steno.ai User',
    quote:
      'The responses were clear and organized. It was a sincere virtual experience that felt like a real live conversation.',
  },
];

export function TestimonialStenoCarousel({
  heading = 'Powering millions of connections, daily',
  quotes = DEFAULT_QUOTES,
}: TestimonialStenoCarouselProps) {
  return (
    <section className="w-full overflow-hidden bg-[#eeecdc] px-5 py-20 text-[#302f2b] sm:px-10 sm:py-28 lg:px-[4vw] lg:py-36">
      <div className="mx-auto max-w-[1900px]">
        <StenoCarouselContent heading={heading} quotes={quotes} />
      </div>
    </section>
  );
}
