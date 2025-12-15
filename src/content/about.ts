/**
 * About Page Content Configuration
 * 
 * This file contains content for the About page.
 * Content is shared between homepage About teaser and About page.
 * 
 * IMPORTANT: Some content is PLACEHOLDER and should be replaced with actual information.
 */

export interface AboutContent {
  /** Company tagline/description */
  tagline: string
  /** Main story/mission */
  story: string
  /** Current status/achievements */
  currentStatus: string
  /** Partner information */
  partners: string[]
}

/**
 * About Page Content
 * Shared between homepage teaser and About page
 */
export const aboutContent: AboutContent = {
  tagline: 'Your trusted partner for Dubai company formation. We simplify the complex, provide transparent pricing, and deliver concierge-level service.',
  story: `Valtora Company Formations was founded with a simple mission: to make Dubai 
    company formation accessible, transparent, and stress-free for entrepreneurs worldwide. 
    We recognized that the process was often confusing, with hidden costs and unclear timelines.`,
  currentStatus: `Today, we're proud to be one of Dubai's most trusted company formation 
    specialists, having helped hundreds of businesses establish their presence in the UAE. 
    Our team combines deep local expertise with modern technology to deliver a seamless experience.`,
  partners: [
    'SPC',
    'Meydan',
    'IFZA',
    'DMCC',
    'RAKEZ',
    'Dubai Mainland',
    'ADGM',
    'DIFC',
  ],
}
