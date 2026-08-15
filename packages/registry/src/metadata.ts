export interface ComponentSourceMeta {
  id: string;
  name: string;
  title: string;
  description: string;
  category: string;
  type?: string;
  designProfile: string;
  version: string;
  sourceReferenceMetadata: {
    sourceId: string;
    sourceTitle: string;
    sourceLocalPath: string;
  };
  dependencies: string[];
  registryDependencies: string[];
  propsDocumentation: Record<string, string>;
  requires?: Record<string, string>;
  files: {
    path: string; // The relative path in the package (e.g. sections/hero/hero-efficiency.tsx)
    target: string; // The target path where CLI will place it (e.g. components/sectloom/hero-efficiency.tsx)
  }[];
  previewAsset: string;
}

export const registryComponents: ComponentSourceMeta[] = [
  {
    id: 'hero-efficiency',
    name: 'hero-efficiency',
    title: 'Efficiency Hero',
    description:
      'An exact-fidelity black hero with oversized typography, pill actions, and a three-column statistics row.',
    category: 'hero',
    designProfile: 'minimal-dark',
    version: '0.2.0',
    sourceReferenceMetadata: {
      sourceId: '1',
      sourceTitle: '1inch Efficiency Hero Design',
      sourceLocalPath: 'data/images/hero/001_1inch_efficiency_hero_design.jpg',
    },
    dependencies: [],
    registryDependencies: [],
    requires: {
      next: '>=14.0.0',
      react: '>=18.0.0',
      'react-dom': '>=18.0.0',
    },
    propsDocumentation: {
      overline: 'Optional small text above heading',
      heading: 'Main large text',
      primaryCta: 'Primary button label and href',
      secondaryCta: 'Secondary button label and href',
      stats: 'Array of { label, value } for bottom grid',
    },

    files: [
      {
        path: 'sections/hero/hero-efficiency.tsx',
        target: 'components/sectloom/hero-efficiency.tsx',
      },
    ],
    previewAsset:
      'https://media.sectloom.dpdns.org/images/hero/001_1inch_efficiency_hero_design.jpg',
  },
  {
    id: 'cta-apis',
    name: 'cta-apis',
    title: 'APIs CTA',
    description:
      'A vivid blue API callout with a white pill action and dotted geometric illustration.',
    category: 'cta',
    designProfile: 'bold-solid',
    version: '0.2.0',
    sourceReferenceMetadata: {
      sourceId: '1',
      sourceTitle: '1inch Apis CTA Design',
      sourceLocalPath: 'data/images/cta/001_1inch_apis_cta_design.jpg',
    },
    dependencies: [],
    registryDependencies: [],
    requires: {
      next: '>=14.0.0',
      react: '>=18.0.0',
      'react-dom': '>=18.0.0',
    },
    propsDocumentation: {
      heading: 'CTA Headline',
      cta: 'Button label and href',
    },

    files: [
      {
        path: 'sections/cta/cta-apis.tsx',
        target: 'components/sectloom/cta-apis.tsx',
      },
    ],
    previewAsset:
      'https://media.sectloom.dpdns.org/images/cta/001_1inch_apis_cta_design.jpg',
  },
  {
    id: 'contact-grid',
    name: 'contact-grid',
    title: 'Contact Grid',
    description:
      'An asymmetric black contact section with muted olive cards, compact actions, address details, and social links.',
    category: 'contact',
    designProfile: 'card-grid',
    version: '0.2.0',
    sourceReferenceMetadata: {
      sourceId: '2',
      sourceTitle: 'After Now Contact Grid Design',
      sourceLocalPath:
        'data/images/contact/002_after_now_contact_grid_design.jpg',
    },
    dependencies: [],
    registryDependencies: [],
    requires: {
      next: '>=14.0.0',
      react: '>=18.0.0',
      'react-dom': '>=18.0.0',
    },
    propsDocumentation: {
      heading: 'Left side large heading',
      inquiries: 'List of actionable contact methods',
      address: 'Physical address block details',
      careers: 'Careers link',
      socials: 'Social media links list',
    },

    files: [
      {
        path: 'sections/contact/contact-grid.tsx',
        target: 'components/sectloom/contact-grid.tsx',
      },
    ],
    previewAsset:
      'https://media.sectloom.dpdns.org/images/contact/002_after_now_contact_grid_design.jpg',
  },
  {
    id: 'footer-products',
    name: 'footer-products',
    title: 'Products Footer',
    description:
      'A high-density black footer with oversized branding, a stepped social grid, and product and chain navigation.',
    category: 'footer',
    designProfile: 'multi-column',
    version: '0.2.0',
    sourceReferenceMetadata: {
      sourceId: '2',
      sourceTitle: '1inch Products Footer Design',
      sourceLocalPath:
        'data/images/footer/002_1inch_products_footer_design.jpg',
    },
    dependencies: [],
    registryDependencies: [],
    requires: {
      next: '>=14.0.0',
      react: '>=18.0.0',
      'react-dom': '>=18.0.0',
    },
    propsDocumentation: {
      brand: 'Brand name, description, and certification',
      navigation: 'Quick nav links under brand',
      enterpriseCta: 'Primary footer CTA',
      socials: 'Social media icon links',
      linkGroups: 'Columns of navigational links',
      legal: 'Privacy, terms, and copyright text',
    },

    files: [
      {
        path: 'sections/footer/footer-products.tsx',
        target: 'components/sectloom/footer-products.tsx',
      },
    ],
    previewAsset:
      'https://media.sectloom.dpdns.org/images/footer/002_1inch_products_footer_design.jpg',
  },
  {
    id: 'blog-header-section-reevo-mission',
    name: 'blog-header-section-reevo-mission',
    title: 'Reevo Mission Blog Header',
    description:
      'A cyan editorial blog header with compressed display typography, checkerboard graphics, and oversized mission statements.',
    category: 'blog-header-section',
    designProfile: 'editorial-brutalist',
    version: '0.1.0',
    sourceReferenceMetadata: {
      sourceId: '15',
      sourceTitle: 'Reevo About Company Mission Blog Header Section Design',
      sourceLocalPath:
        'data/images/blog-header-section/015_reevo_about_company_mission_blog_header_section_design.jpg',
    },
    dependencies: [],
    registryDependencies: [],
    requires: {
      next: '>=14.0.0',
      react: '>=18.0.0',
      'react-dom': '>=18.0.0',
    },
    propsDocumentation: {
      eyebrow: 'Small label above the main headline',
      heading: 'Primary compressed display headline',
      statements:
        'Editorial mission statements rendered below the checkerboard graphic',
    },
    files: [
      {
        path: 'sections/blog-header-section/blog-header-section-reevo-mission.tsx',
        target: 'components/sectloom/blog-header-section-reevo-mission.tsx',
      },
    ],
    previewAsset:
      'https://media.sectloom.dpdns.org/images/blog-header-section/015_reevo_about_company_mission_blog_header_section_design.jpg',
  },
  {
    id: 'blog-section-bronn-stories',
    name: 'blog-section-bronn-stories',
    title: 'Bronn Customer Stories',
    description:
      'An airy editorial customer-story grid with oversized brand cards, serif headlines, and restrained metadata.',
    category: 'blog-section',
    designProfile: 'editorial-light',
    version: '0.1.0',
    sourceReferenceMetadata: {
      sourceId: '3',
      sourceTitle: 'Bronn Customer Stories Blog List Design',
      sourceLocalPath:
        'data/images/blog-section/003_bronn_customer_stories_blog_list_design.jpg',
    },
    dependencies: ['lucide-react'],
    registryDependencies: [],
    requires: {
      next: '>=14.0.0',
      react: '>=18.0.0',
      'react-dom': '>=18.0.0',
    },
    propsDocumentation: {
      heading: 'Section heading',
      allPosts:
        'Optional link with label and href for the complete story archive',
      stories:
        'Customer stories with brand, mark, date, title, description, href, and accent color',
    },
    files: [
      {
        path: 'sections/blog-section/blog-section-bronn-stories.tsx',
        target: 'components/sectloom/blog-section-bronn-stories.tsx',
      },
    ],
    previewAsset:
      'https://media.sectloom.dpdns.org/images/blog-section/003_bronn_customer_stories_blog_list_design.jpg',
  },
  {
    id: 'contact-lab37-support',
    name: 'contact-lab37-support',
    title: 'Lab37 Support Contact Options',
    description:
      'A spacious contact directory with ruled service rows and an integrated press-kit machine illustration.',
    category: 'contact',
    designProfile: 'minimal-editorial',
    version: '0.1.0',
    sourceReferenceMetadata: {
      sourceId: '50',
      sourceTitle: 'Lab37 Support Contact Options Design',
      sourceLocalPath:
        'data/images/contact/050_lab37_support_contact_options_design.jpg',
    },
    dependencies: [],
    registryDependencies: [],
    requires: {
      next: '>=14.0.0',
      react: '>=18.0.0',
      'react-dom': '>=18.0.0',
    },
    propsDocumentation: {
      heading: 'Main contact heading',
      options:
        'Contact rows with label, description, action, href, and optional press artwork',
    },
    files: [
      {
        path: 'sections/contact/contact-lab37-support.tsx',
        target: 'components/sectloom/contact-lab37-support.tsx',
      },
    ],
    previewAsset:
      'https://media.sectloom.dpdns.org/images/contact/050_lab37_support_contact_options_design.jpg',
  },
  {
    id: 'cta-rockfi-vision',
    name: 'cta-rockfi-vision',
    title: 'RockFi Vision Intro',
    description:
      'A centered ivory callout with refined serif typography, understated principles, and architectural linework.',
    category: 'cta',
    designProfile: 'quiet-luxury',
    version: '0.1.0',
    sourceReferenceMetadata: {
      sourceId: '14',
      sourceTitle: 'RockFi Vision Intro Design',
      sourceLocalPath: 'data/images/cta/014_rockfi_vision_intro_design.jpg',
    },
    dependencies: [],
    registryDependencies: [],
    requires: {
      next: '>=14.0.0',
      react: '>=18.0.0',
      'react-dom': '>=18.0.0',
    },
    propsDocumentation: {
      eyebrow: 'Small outlined label above the headline',
      heading: 'Primary serif statement',
      principles: 'Short principles separated by visual dots',
      cta: 'Optional call-to-action label and href',
    },
    files: [
      {
        path: 'sections/cta/cta-rockfi-vision.tsx',
        target: 'components/sectloom/cta-rockfi-vision.tsx',
      },
    ],
    previewAsset:
      'https://media.sectloom.dpdns.org/images/cta/014_rockfi_vision_intro_design.jpg',
  },
  {
    id: 'faq-a-better-lou-support',
    name: 'faq-a-better-lou-support',
    title: 'A Better Lou Support FAQ',
    description:
      'A warm peach FAQ section with a large split headline, grouped native accordions, and a rounded action.',
    category: 'faq',
    designProfile: 'warm-editorial',
    version: '0.1.0',
    sourceReferenceMetadata: {
      sourceId: '3',
      sourceTitle: 'A Better Lou Support Accordion FAQ Design',
      sourceLocalPath:
        'data/images/faq/003_a_better_lou_support_accordion_faq_design.jpg',
    },
    dependencies: ['lucide-react'],
    registryDependencies: [],
    requires: {
      next: '>=14.0.0',
      react: '>=18.0.0',
      'react-dom': '>=18.0.0',
    },
    propsDocumentation: {
      heading: 'Large FAQ heading',
      groups: 'Question groups with titles and question-answer items',
      cta: 'Optional supporting action with label and href',
    },
    files: [
      {
        path: 'sections/faq/faq-a-better-lou-support.tsx',
        target: 'components/sectloom/faq-a-better-lou-support.tsx',
      },
    ],
    previewAsset:
      'https://media.sectloom.dpdns.org/images/faq/003_a_better_lou_support_accordion_faq_design.jpg',
  },
  {
    id: 'feature-deck-workflows',
    name: 'feature-deck-workflows',
    title: 'Deck Workflows Bento Grid',
    description:
      'A dark workflow showcase with an oversized statement and a dense grid of branded automation cards.',
    category: 'feature',
    designProfile: 'dark-product-grid',
    version: '0.1.0',
    sourceReferenceMetadata: {
      sourceId: '11',
      sourceTitle: 'Deck Workflows Bento Grid Design',
      sourceLocalPath:
        'data/images/feature/011_deck_workflows_bento_grid_design.jpg',
    },
    dependencies: [],
    registryDependencies: [],
    requires: {
      next: '>=14.0.0',
      react: '>=18.0.0',
      'react-dom': '>=18.0.0',
    },
    propsDocumentation: {
      heading: 'Oversized workflow statement',
      workflows:
        'Workflow cards with company, mark, task, status, and optional accent color',
    },
    files: [
      {
        path: 'sections/feature/feature-deck-workflows.tsx',
        target: 'components/sectloom/feature-deck-workflows.tsx',
      },
    ],
    previewAsset:
      'https://media.sectloom.dpdns.org/images/feature/011_deck_workflows_bento_grid_design.jpg',
  },
  {
    id: 'footer-aiid-methodology',
    name: 'footer-aiid-methodology',
    title: 'AiiD Methodology Statistics Footer',
    description:
      'A black report footer combining survey statistics, monumental branding, metadata, and compact navigation.',
    category: 'footer',
    designProfile: 'editorial-report',
    version: '0.1.0',
    sourceReferenceMetadata: {
      sourceId: '10',
      sourceTitle: 'AiiD Methodology Statistics Footer Design',
      sourceLocalPath:
        'data/images/footer/010_aiid_methodology_statistics_footer_design.jpg',
    },
    dependencies: [],
    registryDependencies: [],
    requires: {
      next: '>=14.0.0',
      react: '>=18.0.0',
      'react-dom': '>=18.0.0',
    },
    propsDocumentation: {
      label: 'Small methodology label',
      intro: 'Introductory statement beside the statistics',
      stats: 'Statistics with value and label',
      brand: 'Oversized report title',
      year: 'Large report year',
      partnerLinks: 'Partner navigation links',
      reportLinks: 'Report navigation links',
      legal: 'Footer legal line',
    },
    files: [
      {
        path: 'sections/footer/footer-aiid-methodology.tsx',
        target: 'components/sectloom/footer-aiid-methodology.tsx',
      },
    ],
    previewAsset:
      'https://media.sectloom.dpdns.org/images/footer/010_aiid_methodology_statistics_footer_design.jpg',
  },
  {
    id: 'hero-pylon-support',
    name: 'hero-pylon-support',
    title: 'Pylon Support Platform Hero',
    description:
      'A geometric support-platform hero with announcement bar, responsive navigation, email capture, and customer grid.',
    category: 'hero',
    designProfile: 'swiss-product',
    version: '0.1.0',
    sourceReferenceMetadata: {
      sourceId: '499',
      sourceTitle: 'Pylon Support Platform Hero Design',
      sourceLocalPath:
        'data/images/hero/499_pylon_support_platform_hero_design.jpg',
    },
    dependencies: ['lucide-react'],
    registryDependencies: [],
    requires: {
      next: '>=14.0.0',
      react: '>=18.0.0',
      'react-dom': '>=18.0.0',
    },
    propsDocumentation: {
      announcement: 'Announcement-bar content',
      brand: 'Brand name in the primary navigation',
      navigation: 'Primary navigation links',
      heading: 'Main hero heading content',
      description: 'Supporting hero description',
      form: 'Optional email form placeholder, action label, and action URL',
      customerGroups: 'Grouped customer names shown below the hero content',
    },
    files: [
      {
        path: 'sections/hero/hero-pylon-support.tsx',
        target: 'components/sectloom/hero-pylon-support.tsx',
      },
    ],
    previewAsset:
      'https://media.sectloom.dpdns.org/images/hero/499_pylon_support_platform_hero_design.jpg',
  },
  {
    id: 'logo-section-eleos-partners',
    name: 'logo-section-eleos-partners',
    title: 'Eleos Partner Logo Cloud',
    description:
      'An ivory indexed partner directory with monospaced typography, a rational grid, and oversized organization names.',
    category: 'logo-section',
    designProfile: 'swiss-directory',
    version: '0.1.0',
    sourceReferenceMetadata: {
      sourceId: '7',
      sourceTitle: 'Eleos Partner Logo Cloud Design',
      sourceLocalPath:
        'data/images/logo-section/007_eleos_partner_logo_cloud_design.jpg',
    },
    dependencies: [],
    registryDependencies: [],
    requires: {
      next: '>=14.0.0',
      react: '>=18.0.0',
      'react-dom': '>=18.0.0',
    },
    propsDocumentation: {
      heading: 'Primary partner-section statement',
      description: 'Supporting partnership description',
      partners: 'Ordered list of partner names',
    },
    files: [
      {
        path: 'sections/logo-section/logo-section-eleos-partners.tsx',
        target: 'components/sectloom/logo-section-eleos-partners.tsx',
      },
    ],
    previewAsset:
      'https://media.sectloom.dpdns.org/images/logo-section/007_eleos_partner_logo_cloud_design.jpg',
  },
  {
    id: 'navbar-grain-mortar',
    name: 'navbar-grain-mortar',
    title: 'Grain & Mortar Site Navbar',
    description:
      'A cream typographic navigation bar with generous desktop spacing and a compact native mobile menu.',
    category: 'navbar',
    designProfile: 'minimal-navigation',
    version: '0.1.0',
    sourceReferenceMetadata: {
      sourceId: '68',
      sourceTitle: 'Grain & Mortar Site Navbar Design',
      sourceLocalPath:
        'data/images/navbar/068_grain___mortar_site_navbar_design.jpg',
    },
    dependencies: [],
    registryDependencies: [],
    requires: {
      next: '>=14.0.0',
      react: '>=18.0.0',
      'react-dom': '>=18.0.0',
    },
    propsDocumentation: {
      brand: 'Brand name linked from the left side',
      links: 'Primary navigation links with labels and hrefs',
    },
    files: [
      {
        path: 'sections/navbar/navbar-grain-mortar.tsx',
        target: 'components/sectloom/navbar-grain-mortar.tsx',
      },
    ],
    previewAsset:
      'https://media.sectloom.dpdns.org/images/navbar/068_grain___mortar_site_navbar_design.jpg',
  },
  {
    id: 'portfolio-nglm-companies',
    name: 'portfolio-nglm-companies',
    title: 'NGLM Our Companies Portfolio',
    description:
      'A restrained split portfolio section pairing a compact introduction with a monumental serif company list.',
    category: 'portfolio',
    designProfile: 'editorial-portfolio',
    version: '0.1.0',
    sourceReferenceMetadata: {
      sourceId: '43',
      sourceTitle: 'NGLM Our Companies Portfolio List Design',
      sourceLocalPath:
        'data/images/portfolio/043_nglm_our_companies_portfolio_list_design.jpg',
    },
    dependencies: [],
    registryDependencies: [],
    requires: {
      next: '>=14.0.0',
      react: '>=18.0.0',
      'react-dom': '>=18.0.0',
    },
    propsDocumentation: {
      eyebrow: 'Small portfolio label',
      description: 'Editorial portfolio introduction',
      companies: 'Company names shown as an oversized list',
    },
    files: [
      {
        path: 'sections/portfolio/portfolio-nglm-companies.tsx',
        target: 'components/sectloom/portfolio-nglm-companies.tsx',
      },
    ],
    previewAsset:
      'https://media.sectloom.dpdns.org/images/portfolio/043_nglm_our_companies_portfolio_list_design.jpg',
  },
  {
    id: 'pricing-poch-packages',
    name: 'pricing-poch-packages',
    title: 'Poch Package Pricing',
    description:
      'A bold black pricing section with four tall package cards, expressive icon details, and a pink featured tier.',
    category: 'pricing',
    designProfile: 'bold-card-pricing',
    version: '0.1.0',
    sourceReferenceMetadata: {
      sourceId: '88',
      sourceTitle: 'Poch Package Pricing Design',
      sourceLocalPath:
        'data/images/pricing/088_poch_package_pricing_design.jpg',
    },
    dependencies: ['lucide-react'],
    registryDependencies: [],
    requires: {
      next: '>=14.0.0',
      react: '>=18.0.0',
      'react-dom': '>=18.0.0',
    },
    propsDocumentation: {
      heading: 'Pricing section label',
      plans:
        'Pricing plans with name, tagline, Lucide icon key, features, additions, price, href, and featured state',
    },
    files: [
      {
        path: 'sections/pricing/pricing-poch-packages.tsx',
        target: 'components/sectloom/pricing-poch-packages.tsx',
      },
    ],
    previewAsset:
      'https://media.sectloom.dpdns.org/images/pricing/088_poch_package_pricing_design.jpg',
  },
  {
    id: 'team-aiid-project',
    name: 'team-aiid-project',
    title: 'AiiD Project Team',
    description:
      'A black editorial team section with a compact maker label, large collaboration statement, and ruled credits table.',
    category: 'team',
    designProfile: 'dark-editorial',
    version: '0.1.0',
    sourceReferenceMetadata: {
      sourceId: '4',
      sourceTitle: 'AiiD Project Team Design',
      sourceLocalPath: 'data/images/team/004_aiid_project_team_design.jpg',
    },
    dependencies: [],
    registryDependencies: [],
    requires: {
      next: '>=14.0.0',
      react: '>=18.0.0',
      'react-dom': '>=18.0.0',
    },
    propsDocumentation: {
      eyebrow: 'Small maker label',
      heading: 'Large collaboration statement',
      credits: 'Project roles and credited names',
    },
    files: [
      {
        path: 'sections/team/team-aiid-project.tsx',
        target: 'components/sectloom/team-aiid-project.tsx',
      },
    ],
    previewAsset:
      'https://media.sectloom.dpdns.org/images/team/004_aiid_project_team_design.jpg',
  },
  {
    id: 'testimonial-steno-carousel',
    name: 'testimonial-steno-carousel',
    title: 'Steno Testimonials Carousel',
    description:
      'A warm editorial testimonial carousel with oversized serif typography, accessible controls, and horizontal snap cards.',
    category: 'testimonial',
    designProfile: 'editorial-carousel',
    version: '0.1.0',
    sourceReferenceMetadata: {
      sourceId: '14',
      sourceTitle: 'Steno Testimonials Carousel Design',
      sourceLocalPath:
        'data/images/testimonial/014_steno_testimonials_carousel_design.jpg',
    },
    dependencies: ['lucide-react'],
    registryDependencies: [],
    requires: {
      next: '>=14.0.0',
      react: '>=18.0.0',
      'react-dom': '>=18.0.0',
    },
    propsDocumentation: {
      heading: 'Large testimonial heading',
      quotes: 'Testimonial quote and author entries',
    },
    files: [
      {
        path: 'sections/testimonial/testimonial-steno-carousel.tsx',
        target: 'components/sectloom/testimonial-steno-carousel.tsx',
      },
      {
        path: 'sections/testimonial/testimonial-steno-carousel.client.tsx',
        target: 'components/sectloom/testimonial-steno-carousel.client.tsx',
      },
    ],
    previewAsset:
      'https://media.sectloom.dpdns.org/images/testimonial/014_steno_testimonials_carousel_design.jpg',
  },
];
