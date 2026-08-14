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
];
