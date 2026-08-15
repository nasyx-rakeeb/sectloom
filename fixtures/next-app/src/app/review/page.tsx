import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Plus, X } from 'lucide-react';
import { BlogHeaderSectionReevoMission } from '@/components/sectloom/review/blog-header-section-reevo-mission';
import { BlogSectionBronnStories } from '@/components/sectloom/review/blog-section-bronn-stories';
import { ContactLab37Support } from '@/components/sectloom/review/contact-lab37-support';
import { CtaRockfiVision } from '@/components/sectloom/review/cta-rockfi-vision';
import { FaqABetterLouSupport } from '@/components/sectloom/review/faq-a-better-lou-support';
import { FeatureDeckWorkflows } from '@/components/sectloom/review/feature-deck-workflows';
import { FooterAiidMethodology } from '@/components/sectloom/review/footer-aiid-methodology';
import { HeroPylonSupport } from '@/components/sectloom/review/hero-pylon-support';
import { LogoSectionEleosPartners } from '@/components/sectloom/review/logo-section-eleos-partners';
import { NavbarGrainMortar } from '@/components/sectloom/review/navbar-grain-mortar';
import { PortfolioNglmCompanies } from '@/components/sectloom/review/portfolio-nglm-companies';
import { PricingPochPackages } from '@/components/sectloom/review/pricing-poch-packages';
import { TeamAiidProject } from '@/components/sectloom/review/team-aiid-project';
import { TestimonialStenoCarousel } from '@/components/sectloom/review/testimonial-steno-carousel';

interface ReviewItem {
  category: string;
  design: string;
  reference: string;
  section: ReactNode;
}

const REVIEW_ITEMS: ReviewItem[] = [
  {
    category: 'Blog header section',
    design: 'Reevo About Company Mission',
    reference:
      'https://media.sectloom.dpdns.org/images/blog-header-section/015_reevo_about_company_mission_blog_header_section_design.jpg',
    section: <BlogHeaderSectionReevoMission />,
  },
  {
    category: 'Blog section',
    design: 'Bronn Customer Stories',
    reference:
      'https://media.sectloom.dpdns.org/images/blog-section/003_bronn_customer_stories_blog_list_design.jpg',
    section: <BlogSectionBronnStories />,
  },
  {
    category: 'Contact',
    design: 'Lab37 Support Contact Options',
    reference:
      'https://media.sectloom.dpdns.org/images/contact/050_lab37_support_contact_options_design.jpg',
    section: <ContactLab37Support />,
  },
  {
    category: 'CTA',
    design: 'RockFi Vision Intro',
    reference:
      'https://media.sectloom.dpdns.org/images/cta/014_rockfi_vision_intro_design.jpg',
    section: <CtaRockfiVision />,
  },
  {
    category: 'FAQ',
    design: 'A Better Lou Support Accordion',
    reference:
      'https://media.sectloom.dpdns.org/images/faq/003_a_better_lou_support_accordion_faq_design.jpg',
    section: <FaqABetterLouSupport />,
  },
  {
    category: 'Feature',
    design: 'Deck Workflows Bento Grid',
    reference:
      'https://media.sectloom.dpdns.org/images/feature/011_deck_workflows_bento_grid_design.jpg',
    section: <FeatureDeckWorkflows />,
  },
  {
    category: 'Footer',
    design: 'AiiD Methodology Statistics',
    reference:
      'https://media.sectloom.dpdns.org/images/footer/010_aiid_methodology_statistics_footer_design.jpg',
    section: <FooterAiidMethodology />,
  },
  {
    category: 'Hero',
    design: 'Pylon Support Platform',
    reference:
      'https://media.sectloom.dpdns.org/images/hero/499_pylon_support_platform_hero_design.jpg',
    section: <HeroPylonSupport />,
  },
  {
    category: 'Logo section',
    design: 'Eleos Partner Logo Cloud',
    reference:
      'https://media.sectloom.dpdns.org/images/logo-section/007_eleos_partner_logo_cloud_design.jpg',
    section: <LogoSectionEleosPartners />,
  },
  {
    category: 'Navbar',
    design: 'Grain & Mortar Site Navbar',
    reference:
      'https://media.sectloom.dpdns.org/images/navbar/068_grain___mortar_site_navbar_design.jpg',
    section: <NavbarGrainMortar />,
  },
  {
    category: 'Portfolio',
    design: 'NGLM Our Companies',
    reference:
      'https://media.sectloom.dpdns.org/images/portfolio/043_nglm_our_companies_portfolio_list_design.jpg',
    section: <PortfolioNglmCompanies />,
  },
  {
    category: 'Pricing',
    design: 'Poch Package Pricing',
    reference:
      'https://media.sectloom.dpdns.org/images/pricing/088_poch_package_pricing_design.jpg',
    section: <PricingPochPackages />,
  },
  {
    category: 'Team',
    design: 'AiiD Project Team',
    reference:
      'https://media.sectloom.dpdns.org/images/team/004_aiid_project_team_design.jpg',
    section: <TeamAiidProject />,
  },
  {
    category: 'Testimonial',
    design: 'Steno Testimonials Carousel',
    reference:
      'https://media.sectloom.dpdns.org/images/testimonial/014_steno_testimonials_carousel_design.jpg',
    section: <TestimonialStenoCarousel />,
  },
];

interface ReviewPageProps {
  searchParams: Promise<{ page?: string | string[] }>;
}

function getPageNumber(value: string | string[] | undefined) {
  const parsed = Number.parseInt(
    Array.isArray(value) ? value[0] : (value ?? '1'),
    10
  );

  if (!Number.isFinite(parsed)) {
    return 1;
  }

  return Math.min(Math.max(parsed, 1), REVIEW_ITEMS.length);
}

function PageLink({ page, children }: { page: number; children: ReactNode }) {
  return (
    <Link
      href={`/review?page=${page}`}
      className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-5 font-mono text-xs uppercase tracking-[0.16em] text-white transition hover:border-white hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5ff4a]"
    >
      {children}
    </Link>
  );
}

export default async function ReviewPage({ searchParams }: ReviewPageProps) {
  const resolvedSearchParams = await searchParams;
  const page = getPageNumber(resolvedSearchParams.page);
  const index = page - 1;
  const item = REVIEW_ITEMS[index];
  const previousPage = page > 1 ? page - 1 : null;
  const nextPage = page < REVIEW_ITEMS.length ? page + 1 : null;

  return (
    <main className="min-h-screen bg-[#111] text-white">
      <header className="border-b border-white/15 px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1920px]">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-white/50">
            Sectloom fixture review · Registry pending
          </p>
          <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#b5ff4a]">
                {String(page).padStart(2, '0')} /{' '}
                {String(REVIEW_ITEMS.length).padStart(2, '0')} · {item.category}
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
                {item.design}
              </h1>
            </div>
            <div className="flex gap-2">
              {previousPage ? (
                <PageLink page={previousPage}>
                  <ArrowLeft aria-hidden="true" className="mr-2 size-4" />
                  Previous
                </PageLink>
              ) : (
                <span className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 px-5 font-mono text-xs uppercase tracking-[0.16em] text-white/25">
                  <ArrowLeft aria-hidden="true" className="mr-2 size-4" />
                  Previous
                </span>
              )}
              {nextPage ? (
                <PageLink page={nextPage}>
                  Next
                  <ArrowRight aria-hidden="true" className="ml-2 size-4" />
                </PageLink>
              ) : (
                <span className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 px-5 font-mono text-xs uppercase tracking-[0.16em] text-white/25">
                  Next
                  <ArrowRight aria-hidden="true" className="ml-2 size-4" />
                </span>
              )}
            </div>
          </div>
        </div>

        <nav
          aria-label="Jump to review category"
          className="mx-auto mt-8 flex max-w-[1920px] gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {REVIEW_ITEMS.map((reviewItem, reviewIndex) => (
            <Link
              key={reviewItem.category}
              href={`/review?page=${reviewIndex + 1}`}
              aria-current={reviewIndex === index ? 'page' : undefined}
              className="shrink-0 rounded-full border border-white/20 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white/60 transition hover:border-white/60 hover:text-white aria-[current=page]:border-[#b5ff4a] aria-[current=page]:bg-[#b5ff4a] aria-[current=page]:text-black"
            >
              {reviewIndex + 1}. {reviewItem.category}
            </Link>
          ))}
        </nav>
      </header>

      <article className="py-8 sm:py-12">
        <div data-review-live={page}>
          <p className="mx-auto mb-3 max-w-[1920px] px-5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/45 sm:px-8 lg:px-12">
            Live implementation
          </p>
          <div className="overflow-hidden bg-white text-black">
            {item.section}
          </div>
        </div>

        <details
          data-original-disclosure
          className="group mx-auto mt-8 max-w-[1920px] px-5 sm:px-8 lg:px-12"
        >
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between rounded-md border border-white/20 px-5 font-mono text-xs uppercase tracking-[0.18em] text-white/75 transition hover:border-white/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5ff4a]">
            <span>
              <span className="group-open:hidden">Show original reference</span>
              <span className="hidden group-open:inline">
                Hide original reference
              </span>
            </span>
            <Plus aria-hidden="true" className="size-5 group-open:hidden" />
            <X aria-hidden="true" className="hidden size-5 group-open:block" />
          </summary>
          <div data-review-reference={page} className="pt-5">
            {/* The fixture intentionally uses the raw data-set reference for visual comparison. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.reference}
              alt={`${item.design} source reference`}
              loading="lazy"
              className="h-auto w-full rounded-md border border-white/15 bg-white object-contain"
            />
          </div>
        </details>

        <footer className="mx-auto mt-8 flex max-w-[1920px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
          <div>
            {previousPage ? (
              <PageLink page={previousPage}>
                <ArrowLeft aria-hidden="true" className="mr-2 size-4" />
                Previous
              </PageLink>
            ) : null}
          </div>
          <p className="hidden font-mono text-xs uppercase tracking-[0.2em] text-white/35 sm:block">
            {page} of {REVIEW_ITEMS.length}
          </p>
          <div>
            {nextPage ? (
              <PageLink page={nextPage}>
                Next
                <ArrowRight aria-hidden="true" className="ml-2 size-4" />
              </PageLink>
            ) : null}
          </div>
        </footer>
      </article>
    </main>
  );
}
