import * as React from 'react';

export interface WorkflowCard {
  company: string;
  mark: string;
  task: string;
  status: 'Running' | 'Completed';
  accent?: string;
}

export interface FeatureDeckWorkflowsProps {
  heading?: string;
  workflows?: WorkflowCard[];
}

const DEFAULT_WORKFLOWS: WorkflowCard[] = [
  {
    company: 'MyHSA',
    mark: 'H',
    task: 'Export contribution records',
    status: 'Running',
    accent: '#eb775a',
  },
  {
    company: 'Comcast',
    mark: 'X',
    task: 'Fetch billing statements',
    status: 'Running',
    accent: '#9b20ff',
  },
  {
    company: 'Duke Energy',
    mark: 'D',
    task: 'Download utility bills',
    status: 'Running',
    accent: '#31a59e',
  },
  {
    company: 'Meta',
    mark: '∞',
    task: 'Sync ad campaigns',
    status: 'Running',
    accent: '#1684de',
  },
  {
    company: 'SDG&E',
    mark: 'S',
    task: 'Pull billing statements',
    status: 'Running',
    accent: '#ef6da4',
  },
  {
    company: 'Aetna',
    mark: 'A',
    task: 'Pull claims history',
    status: 'Running',
    accent: '#8c3b9d',
  },
  {
    company: 'Cigna',
    mark: 'C',
    task: 'Export benefits summary',
    status: 'Running',
    accent: '#0062c7',
  },
  {
    company: 'BambooHR',
    mark: 'b',
    task: 'Sync employee directory',
    status: 'Running',
    accent: '#79c33a',
  },
  {
    company: 'Booking.com',
    mark: 'B.',
    task: 'Fetch reservation data',
    status: 'Completed',
    accent: '#064da7',
  },
  {
    company: 'SAP',
    mark: 'SAP',
    task: 'Extract procurement data',
    status: 'Running',
    accent: '#1599ce',
  },
];

export function FeatureDeckWorkflows({
  heading = 'Any workflow. Any application. Infinite agents.',
  workflows = DEFAULT_WORKFLOWS,
}: FeatureDeckWorkflowsProps) {
  return (
    <section className="w-full overflow-hidden bg-[#0d0f0e] px-5 py-20 text-[#f4f5f3] sm:px-10 sm:py-28 lg:px-[4vw] lg:py-36">
      <div className="mx-auto max-w-[1900px]">
        <h2 className="text-[clamp(3rem,6vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.065em]">
          {heading}
        </h2>
        <div className="relative mt-20 lg:mt-28">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#0d0f0e] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#0d0f0e] to-transparent" />
          <div className="grid min-w-[900px] grid-cols-4 gap-3 md:min-w-0 lg:grid-cols-5">
            {workflows.map((workflow) => (
              <article
                key={`${workflow.company}-${workflow.task}`}
                className="rounded-2xl border border-white/10 bg-[#151817] p-5"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-white font-bold text-black"
                    style={{ color: workflow.accent }}
                  >
                    {workflow.mark}
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold">
                      {workflow.company}
                    </h3>
                    <p className="truncate text-sm text-white/40">
                      {workflow.task}
                    </p>
                  </div>
                </div>
                <p className="mt-6 font-mono text-xs text-white/40">
                  <span
                    aria-hidden="true"
                    className={`mr-1 inline-block size-2 rounded-full ${
                      workflow.status === 'Completed'
                        ? 'bg-[#79afa3]'
                        : 'bg-[#d88c2d]'
                    }`}
                  />{' '}
                  {workflow.status}
                </p>
                <div className="mt-6 h-px bg-white/10" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
