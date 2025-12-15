/**
 * Case Studies Content Configuration
 * 
 * This file contains anonymized case study examples.
 * All case studies are presented as anonymized examples and should not
 * be presented as verified real client cases unless replaced with actual data.
 * 
 * IMPORTANT: These are ANONYMIZED case studies. Do not make unverifiable
 * legal claims. Present as examples of typical scenarios.
 */

export interface CaseStudy {
  /** Case study ID */
  id: string
  /** Case study title (anonymized format) */
  title: string
  /** Client type (anonymized) */
  clientType: string
  /** Client objective */
  objective: string
  /** Recommended route (Free Zone or Mainland) */
  recommendedRoute: 'Free Zone' | 'Mainland' | 'Both'
  /** Specific free zone or mainland authority (if applicable) */
  specificZone?: string
  /** Timeline description */
  timeline: string
  /** What Valtora handled (array of services) */
  servicesHandled: string[]
  /** Outcome/result description */
  outcome: string
  /** Optional image URL */
  imageUrl?: string
}

/**
 * Case Studies Data
 * ANONYMIZED: These are example case studies, not verified real client cases
 */
export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'UK Consulting Firm → Dubai Free Zone Setup',
    clientType: 'UK-based Business Consulting Firm',
    objective: 'Establish a Dubai presence to serve Middle Eastern clients while maintaining cost-effectiveness and fast setup time.',
    recommendedRoute: 'Free Zone',
    specificZone: 'SPC Free Zone',
    timeline: '5 business days (express service)',
    servicesHandled: [
      'Free zone company registration',
      'Trade license application',
      'Express processing',
      'Bank account opening support',
      'Initial visa application for founder',
    ],
    outcome: 'Company operational within 2 weeks. First client onboarded within a month. Cost-effective setup with ongoing compliance support.',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=600&fit=crop',
  },
  {
    id: '2',
    title: 'E-commerce Business → Dubai Free Zone Expansion',
    clientType: 'Established E-commerce Business (International)',
    objective: 'Expand into the UAE market with a cost-effective setup that supports online trading activities and allows for multiple visas.',
    recommendedRoute: 'Free Zone',
    specificZone: 'IFZA Free Zone',
    timeline: '7 business days (standard service)',
    servicesHandled: [
      'E-commerce trade license',
      'Company registration',
      '3 visa applications (founder + 2 employees)',
      'VAT registration support',
      'Ongoing accounting support for VAT compliance',
    ],
    outcome: 'Cost-effective setup completed. Seamless expansion into UAE market. Full compliance maintained. All visas approved within timeline.',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
  },
  {
    id: '3',
    title: 'Tech Startup → Dubai Mainland Company',
    clientType: 'Tech Startup (US-based)',
    objective: 'Set up a mainland company to trade directly with local UAE market and bid on government contracts, with fast-track processing.',
    recommendedRoute: 'Mainland',
    timeline: '10 business days (fast-track)',
    servicesHandled: [
      'Mainland company registration',
      'Local service agent arrangement',
      'Trade license (Technology Services)',
      'Bank account opening assistance',
      '2 visa applications',
      'Office space consultation',
    ],
    outcome: 'Mainland company operational. Successfully bidding on local contracts. Bank account opened. Team visas approved. Ready for local market operations.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop',
  },
]
