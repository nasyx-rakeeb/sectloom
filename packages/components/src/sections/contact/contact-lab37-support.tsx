import * as React from 'react';
import Link from 'next/link';

export interface Lab37ContactOption {
  label: string;
  description: string;
  action: string;
  href: string;
  showMachine?: boolean;
}

export interface ContactLab37SupportProps {
  heading?: string;
  options?: Lab37ContactOption[];
}

const DEFAULT_OPTIONS: Lab37ContactOption[] = [
  {
    label: 'Get Bowl Builder',
    description:
      "Whether you're an established brand, new concept, food service provider or food production operator, we'd love to explore how Bowl Builder's automation technology can help you scale operations.",
    action: 'Reserve',
    href: '#',
  },
  {
    label: 'Careers',
    description:
      "We're always looking for passionate problem-solvers who want to help shape the future of food automation.",
    action: 'View Roles',
    href: '#',
  },
  {
    label: 'Other Inquiries',
    description:
      "Have questions about Lab37 or interested in exploring partnership opportunities? We'd love to hear from you.",
    action: 'Message',
    href: '#',
  },
  {
    label: 'Press',
    description:
      "Access Lab37's brand assets, including high-resolution imagery, logos, and media resources.",
    action: 'Download Kit',
    href: '#',
    showMachine: true,
  },
];

function MachineOutline() {
  return (
    <svg aria-hidden="true" viewBox="0 0 640 460" className="h-full w-full">
      <g fill="none" stroke="white" strokeOpacity=".55" strokeWidth="3">
        <path d="M230 86h190v250H230zM420 130h64v206h-64M196 336h278M245 116h150v44H245z" />
        <path d="M268 190h110c34 0 34 42 0 42h-78c-36 0-36 42 0 42h78c34 0 34 42 0 42H268" />
        <circle cx="252" cy="354" r="18" />
        <circle cx="448" cy="354" r="18" />
      </g>
    </svg>
  );
}

export function ContactLab37Support({
  heading = 'Get In Touch',
  options = DEFAULT_OPTIONS,
}: ContactLab37SupportProps) {
  return (
    <section className="w-full bg-white px-5 py-20 text-black sm:px-10 sm:py-28 lg:px-[4vw] lg:py-36">
      <div className="mx-auto max-w-[1800px]">
        <h2 className="text-[clamp(4rem,8vw,10rem)] font-normal leading-none tracking-[-0.065em]">
          {heading}
        </h2>
        <div className="mt-20 border-b border-black/20 lg:mt-28">
          {options.map((option) => (
            <div
              key={option.label}
              className="grid gap-7 border-t border-black/20 py-10 md:grid-cols-[1fr_1fr] md:py-12"
            >
              <h3 className="text-2xl tracking-[-0.035em] sm:text-3xl">
                {option.label}
              </h3>
              <div className="max-w-[620px]">
                <p className="text-lg leading-[1.25] tracking-[-0.025em] sm:text-2xl">
                  {option.description}
                </p>
                <Link
                  href={option.href}
                  className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#eeeeee] px-7 text-base transition-colors hover:bg-[#dedede] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  {option.action}
                </Link>
                {option.showMachine ? (
                  <div className="mt-7 aspect-square w-full max-w-[360px] bg-black">
                    <MachineOutline />
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
