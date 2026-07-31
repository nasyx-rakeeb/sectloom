export interface ComponentSourceMeta {
  id: string;
  name: string;
  title: string;
  description: string;
  category: string;
  type?: string;
  designProfile: string;
  sourceReferenceMetadata: {
    sourceId: string;
    sourceTitle: string;
    sourceLocalPath: string;
  };
  dependencies: string[];
  registryDependencies: string[];
  requiredTokens: string[];
  propsDocumentation: Record<string, string>;
  supportedNextJsRange: string;
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
      'A dark-themed minimal hero with a responsive statistics grid.',
    category: 'hero',
    designProfile: 'minimal-dark',
    sourceReferenceMetadata: {
      sourceId: '1',
      sourceTitle: '1inch Efficiency Hero Design',
      sourceLocalPath: 'data/images/hero/001_1inch_efficiency_hero_design.jpg',
    },
    dependencies: ['next', 'react', 'react-dom'],
    registryDependencies: [],
    requiredTokens: [
      'background',
      'foreground',
      'muted',
      'muted-foreground',
      'primary',
      'primary-foreground',
      'secondary',
      'secondary-foreground',
      'border',
      'ring',
      'radius-full',
      'radius-lg',
      'container-md',
      'container-lg',
      'container-xl',
    ],
    propsDocumentation: {
      overline: 'Optional small text above heading',
      heading: 'Main large text',
      primaryCta: 'Primary button label and href',
      secondaryCta: 'Secondary button label and href',
      stats: 'Array of { label, value } for bottom grid',
    },
    supportedNextJsRange: '>=14.0.0',
    files: [
      {
        path: 'sections/hero/hero-efficiency.tsx',
        target: 'components/sectloom/hero-efficiency.tsx',
      },
    ],
    previewAsset: '/images/hero/001_1inch_efficiency_hero_design.jpg',
  },
  {
    id: 'cta-apis',
    name: 'cta-apis',
    title: 'APIs CTA',
    description:
      'Solid color call to action block with abstract geometric graphic.',
    category: 'cta',
    designProfile: 'bold-solid',
    sourceReferenceMetadata: {
      sourceId: '1',
      sourceTitle: '1inch Apis CTA Design',
      sourceLocalPath: 'data/images/cta/001_1inch_apis_cta_design.jpg',
    },
    dependencies: ['next', 'react', 'react-dom', 'lucide-react'],
    registryDependencies: [],
    requiredTokens: [
      'background',
      'foreground',
      'primary',
      'primary-foreground',
      'radius-lg',
      'radius-full',
      'ring',
      'container-xl',
    ],
    propsDocumentation: {
      heading: 'CTA Headline',
      cta: 'Button label and href',
    },
    supportedNextJsRange: '>=14.0.0',
    files: [
      {
        path: 'sections/cta/cta-apis.tsx',
        target: 'components/sectloom/cta-apis.tsx',
      },
    ],
    previewAsset: '/images/cta/001_1inch_apis_cta_design.jpg',
  },
  {
    id: 'contact-grid',
    name: 'contact-grid',
    title: 'Contact Grid',
    description:
      'An interactive, multi-card contact section using safe standard link behaviors.',
    category: 'contact',
    designProfile: 'card-grid',
    sourceReferenceMetadata: {
      sourceId: '2',
      sourceTitle: 'After Now Contact Grid Design',
      sourceLocalPath:
        'data/images/contact/002_after_now_contact_grid_design.jpg',
    },
    dependencies: ['next', 'react', 'react-dom', 'lucide-react'],
    registryDependencies: [],
    requiredTokens: [
      'background',
      'foreground',
      'muted',
      'muted-foreground',
      'border',
      'radius-lg',
      'ring',
      'container-xl',
    ],
    propsDocumentation: {
      heading: 'Left side large heading',
      inquiries: 'List of actionable contact methods',
      address: 'Physical address block details',
      careers: 'Careers link',
      socials: 'Social media links list',
    },
    supportedNextJsRange: '>=14.0.0',
    files: [
      {
        path: 'sections/contact/contact-grid.tsx',
        target: 'components/sectloom/contact-grid.tsx',
      },
    ],
    previewAsset: '/images/contact/002_after_now_contact_grid_design.jpg',
  },
  {
    id: 'footer-products',
    name: 'footer-products',
    title: 'Products Footer',
    description:
      'A dense, responsive multi-column layout for brand and navigation.',
    category: 'footer',
    designProfile: 'multi-column',
    sourceReferenceMetadata: {
      sourceId: '2',
      sourceTitle: '1inch Products Footer Design',
      sourceLocalPath:
        'data/images/footer/002_1inch_products_footer_design.jpg',
    },
    dependencies: ['next', 'react', 'react-dom', 'lucide-react'],
    registryDependencies: [],
    requiredTokens: [
      'background',
      'foreground',
      'muted',
      'muted-foreground',
      'primary',
      'border',
      'radius-full',
      'ring',
      'container-xl',
    ],
    propsDocumentation: {
      brand: 'Brand name, description, and certification',
      navigation: 'Quick nav links under brand',
      enterpriseCta: 'Primary footer CTA',
      socials: 'Social media icon links',
      linkGroups: 'Columns of navigational links',
      legal: 'Privacy, terms, and copyright text',
    },
    supportedNextJsRange: '>=14.0.0',
    files: [
      {
        path: 'sections/footer/footer-products.tsx',
        target: 'components/sectloom/footer-products.tsx',
      },
    ],
    previewAsset: '/images/footer/002_1inch_products_footer_design.jpg',
  },
];
