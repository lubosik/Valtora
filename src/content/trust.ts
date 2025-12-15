/**
 * Trust & Accolades Content Configuration
 * 
 * This file contains editable placeholder content for trust elements.
 * All values are clearly marked as placeholders and should be replaced
 * with actual data when available.
 * 
 * IMPORTANT: Do not make unverifiable claims. All content should be
 * clearly editable and phrased cautiously.
 */

export interface TrustRating {
  /** Rating value (e.g., 4.5) - PLACEHOLDER: Edit with actual rating */
  value: number
  /** Review count text - PLACEHOLDER: Edit with actual review count */
  reviewCount: string
  /** Trust statement - PLACEHOLDER: Edit as needed */
  trustStatement: string
}

export interface TrustBadge {
  /** Badge label - PLACEHOLDER: Replace with actual partner/media names when available */
  label: string
  /** Optional logo/image URL - PLACEHOLDER: Add actual logo URLs when available */
  logoUrl?: string
}

export interface Accolade {
  /** Accolade title */
  title: string
  /** Accolade description */
  description: string
  /** Icon name for the accolade */
  icon: 'specialists' | 'pricing' | 'fasttrack' | 'banking' | 'visas' | 'account-manager'
}

/**
 * Trust Rating Configuration
 * PLACEHOLDER: Replace with actual rating data when available
 */
export const trustRating: TrustRating = {
  value: 4.5, // PLACEHOLDER: Edit with actual Google/Trustpilot rating
  reviewCount: '100+', // PLACEHOLDER: Edit with actual review count (e.g., "150 reviews", "500+")
  trustStatement: 'Trusted by founders worldwide', // PLACEHOLDER: Edit as needed
}

/**
 * "As Seen In" / Partner Badges
 * PLACEHOLDER: Replace with actual partner/media logos when available
 * These are generic placeholders - update with real partner names/logos
 */
export const trustBadges: TrustBadge[] = [
  { label: 'Featured Partner', logoUrl: undefined }, // PLACEHOLDER
  { label: 'As Seen In', logoUrl: undefined }, // PLACEHOLDER
  { label: 'Trusted Provider', logoUrl: undefined }, // PLACEHOLDER
  { label: 'Verified Service', logoUrl: undefined }, // PLACEHOLDER
  { label: 'Industry Leader', logoUrl: undefined }, // PLACEHOLDER
  { label: 'Award Winner', logoUrl: undefined }, // PLACEHOLDER
]

/**
 * "Why Valtora" Accolades/Benefits
 * These are factual benefits that can be verified
 */
export const accolades: Accolade[] = [
  {
    title: 'Dubai-based Specialists',
    description: 'Our team is based in Dubai with deep local expertise in UAE company formation and regulations.',
    icon: 'specialists',
  },
  {
    title: 'Transparent Pricing',
    description: 'Clear, all-inclusive pricing with no hidden fees. What you see is what you pay.',
    icon: 'pricing',
  },
  {
    title: 'Fast-track Available',
    description: 'Express service options available for urgent company setup requirements.',
    icon: 'fasttrack',
  },
  {
    title: 'Bank Account Support',
    description: 'Assistance with business bank account opening and documentation requirements.',
    icon: 'banking',
  },
  {
    title: 'Visa Handling End-to-End',
    description: 'Complete visa processing support from application to approval and renewal.',
    icon: 'visas',
  },
  {
    title: 'Dedicated Account Manager',
    description: 'Personal account manager assigned from day one for personalized support throughout your journey.',
    icon: 'account-manager',
  },
]
