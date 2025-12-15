/**
 * Founder Content Configuration
 * 
 * This file contains placeholder founder story content.
 * All content should be replaced with actual founder information when available.
 * 
 * IMPORTANT: This is PLACEHOLDER content. Replace with actual founder details.
 */

export interface FounderContent {
  /** Founder's name - PLACEHOLDER: Replace with actual name */
  name: string
  /** Founder's title/role - PLACEHOLDER: Replace with actual title */
  title: string
  /** Founder's background story - PLACEHOLDER: Replace with actual background */
  background: string
  /** Why Valtora exists - PLACEHOLDER: Replace with actual story */
  whyValtora: string
  /** Commitment statement - PLACEHOLDER: Replace with actual commitment */
  commitment: string
  /** Optional founder image URL - PLACEHOLDER: Add actual portrait URL */
  imageUrl?: string
  /** Years of experience - PLACEHOLDER: Replace with actual number */
  yearsExperience?: number
  /** Optional credentials/qualifications - PLACEHOLDER: Add actual credentials */
  credentials?: string[]
}

/**
 * Founder Content
 * PLACEHOLDER: Replace with actual founder information
 */
export const founderContent: FounderContent = {
  name: 'Ben Acolatse',
  title: 'Founder & CEO',
  background: `Ben Acolatse brings extensive experience in UAE corporate services and business formation. 
    Having worked with hundreds of companies across various industries, he has developed deep expertise 
    in free zone regulations, mainland requirements, and visa processes.`,
  whyValtora: `Valtora was founded with a simple mission: to make Dubai company formation accessible, 
    transparent, and stress-free for entrepreneurs worldwide. After witnessing firsthand the confusion and 
    hidden costs that many businesses face, Ben set out to create a service that prioritizes 
    clarity, honesty, and exceptional execution.`,
  commitment: `We are committed to transparency in everything we do. No hidden fees, no surprises—just 
    clear pricing, expert guidance, and dedicated support throughout your journey. Our goal is to empower 
    entrepreneurs to establish their Dubai presence with confidence and clarity.`,
  yearsExperience: 10,
  credentials: [
    'Certified Business Setup Consultant',
    'Registered Partner with Leading UAE Free Zones',
  ],
  imageUrl: '/ben-acolatse.jpg',
}
