export interface AffiliateCardContent {
  title: string
  badge: string
  description: string
  highlights: string[]
  ctaLabel: string
  href: string
  disclosureTag: string
}

export interface ContentSection {
  eyebrow: string
  title: string
  paragraphs: string[]
}

export interface LegalPageContent {
  title: string
  description: string
  sections: Array<{
    heading: string
    paragraphs: string[]
  }>
}

export const siteMeta = {
  siteName: 'Home Renovation Cost Estimator',
  adsEnabled: false,
  disclosure:
    'This site may earn a commission from affiliate links on this page. That compensation does not affect estimate ranges or recommendations.',
}

export const affiliateCards: AffiliateCardContent[] = [
  {
    title: 'Angi',
    badge: 'Contractor quotes',
    description:
      'Compare local contractor quotes for your project scope and timeline. Quotes can help validate where your estimate lands in your market.',
    highlights: [
      'Request multiple quotes in one step',
      'Filter by project type and location',
      'Helpful for budgeting before permits and design',
    ],
    ctaLabel: 'Get local quotes',
    href: 'https://www.angi.com/',
    disclosureTag: 'Affiliate Link',
  },
  {
    title: 'HomeAdvisor',
    badge: 'Lead matching',
    description:
      'Connect with nearby pros and compare service options for kitchen, bath, flooring, and full-home projects.',
    highlights: [
      'Strong coverage for common remodel categories',
      'Useful for scheduling estimates quickly',
      'Can help benchmark labor pricing in your area',
    ],
    ctaLabel: 'Find professionals',
    href: 'https://www.homeadvisor.com/',
    disclosureTag: 'Affiliate Link',
  },
  {
    title: 'Amazon DIY Essentials',
    badge: 'Budget-friendly picks',
    description:
      'If you are handling parts of the project yourself, this can help you source common tools and materials.',
    highlights: [
      'Tool bundles for small upgrades',
      'Great for prep, painting, and minor finishes',
      'Useful for phased renovations',
    ],
    ctaLabel: 'Browse DIY tools',
    href: 'https://affiliate-program.amazon.com/',
    disclosureTag: 'Affiliate Link',
  },
]

export const explainerSections: ContentSection[] = [
  {
    eyebrow: 'How to use it',
    title: 'Estimate your project in four quick steps',
    paragraphs: [
      'Choose your room, project type, quality tier, and square footage. The estimator then returns a realistic cost range instead of a single number.',
      'Cost ranges are more useful than single-point estimates because labor rates, material choices, and permitting requirements vary by market.',
    ],
  },
  {
    eyebrow: 'How we calculate',
    title: 'Range-based model with size adjustment',
    paragraphs: [
      'Each room and project type includes baseline budget, mid-range, premium, and luxury ranges. Your square footage adjusts the expected per-square-foot cost so the result better matches project scale.',
      'The final estimate combines baseline ranges with size-adjusted bounds and then breaks costs into labor, materials, and common line items.',
    ],
  },
  {
    eyebrow: 'Planning tips',
    title: 'Build a safer renovation budget',
    paragraphs: [
      'Use the high end of the range when your timeline is fixed, your finish level is strict, or your home is older and likely to require hidden repairs.',
      'For practical planning, reserve an additional contingency budget of 10% to 20% for surprises such as code updates, electrical changes, or structural fixes.',
    ],
  },
]

export const faqs = [
  {
    question: 'Why does this show a range instead of one exact price?',
    answer:
      'Renovation costs change based on labor market, finish level, and existing conditions. A range helps you plan more realistically than a single number.',
  },
  {
    question: 'How accurate is the square footage adjustment?',
    answer:
      'Square footage is one major cost driver, but not the only one. Use this estimator for planning and then validate with contractor quotes for your location.',
  },
  {
    question: 'What quality tier should I choose?',
    answer:
      'Budget usually prioritizes function and lower-cost finishes. Mid-range is a common balance for resale. Premium and luxury are better for custom materials and design-forward upgrades.',
  },
  {
    question: 'Does this include permits and inspections?',
    answer:
      'The estimate includes a general allowance for permits and misc costs, but local fees vary. Confirm permit requirements with your municipality or contractor.',
  },
]

export const legalPageCopy: Record<string, LegalPageContent> = {
  about: {
    title: 'About this estimator',
    description:
      'How this renovation estimator is built and how to use the results for smarter planning.',
    sections: [
      {
        heading: 'Methodology',
        paragraphs: [
          'The estimator uses room-specific and project-specific benchmark ranges, then adjusts costs by square footage and quality tier.',
          'Results are presented as low/high ranges to reflect market variation in labor rates, materials, and project complexity.',
        ],
      },
      {
        heading: 'Intended use',
        paragraphs: [
          'This tool is for budgeting and early planning. It is not a contractor bid, engineering scope, or permit-ready quote.',
          'Before starting work, collect local quotes and confirm scope details, permits, and timeline assumptions.',
        ],
      },
    ],
  },
  privacy: {
    title: 'Privacy policy',
    description:
      'How data, analytics, and third-party services may be used on this site.',
    sections: [
      {
        heading: 'What we collect',
        paragraphs: [
          'The estimator runs in your browser and does not require account creation.',
          'Analytics and advertising tools may collect aggregate usage information based on their own policies.',
        ],
      },
      {
        heading: 'Third-party services',
        paragraphs: [
          'Affiliate and ad providers may collect information according to their own privacy policies.',
          'Please review those providers directly for full details on data handling.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of use',
    description:
      'Terms that apply when using this estimator and related content.',
    sections: [
      {
        heading: 'Informational use only',
        paragraphs: [
          'This estimator provides general cost planning information and not professional construction advice.',
          'You are responsible for decisions made from this information and should consult licensed professionals when needed.',
        ],
      },
      {
        heading: 'No warranty',
        paragraphs: [
          'The estimator is provided as-is without guarantees of outcome or exact project pricing.',
          'Costs shown are estimates and should be validated with local bids before making commitments.',
        ],
      },
    ],
  },
  disclosure: {
    title: 'Affiliate disclosure',
    description:
      'How affiliate relationships work on this site and how they affect recommendations.',
    sections: [
      {
        heading: 'How affiliate links work',
        paragraphs: [
          'Some outbound links may generate a commission from qualifying actions.',
          'Affiliate relationships do not influence the estimate math or how project ranges are calculated.',
        ],
      },
      {
        heading: 'Placement approach',
        paragraphs: [
          'Disclosure appears near recommendation cards and in the footer so context is visible where decisions happen.',
          'Recommendations are selected for relevance to renovation planning, not commission rate.',
        ],
      },
    ],
  },
}
