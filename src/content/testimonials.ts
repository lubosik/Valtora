/**
 * Testimonials Content Configuration
 * 
 * This file contains placeholder testimonial data.
 * All testimonials use clearly placeholder names and should be replaced
 * with actual client testimonials when available.
 * 
 * IMPORTANT: These are PLACEHOLDER testimonials. Do not present them
 * as verified real client testimonials until replaced with actual data.
 */

export interface Testimonial {
  /** Testimonial ID */
  id: string
  /** Client identifier (PLACEHOLDER - e.g., "Client — UK E-commerce Founder") */
  clientName: string
  /** Client location/type (PLACEHOLDER) */
  clientType: string
  /** Short testimonial text (shown by default) */
  shortText: string
  /** Full testimonial text (shown in modal expansion) */
  fullText?: string
  /** Optional video testimonial URL (YouTube/Vimeo) */
  videoUrl?: string
  /** Rating (1-5) */
  rating: number
  /** Testimonial date (optional) */
  date?: string
}

/**
 * Testimonials Data
 * PLACEHOLDER: Replace with actual client testimonials when available
 */
export const testimonials: Testimonial[] = [
  {
    id: '1',
    clientName: 'Client — UK E-commerce Founder',
    clientType: 'E-commerce Business',
    shortText: 'Valtora made the entire process seamless. Clear pricing, expert guidance, and my company was set up faster than expected.',
    fullText: 'Valtora made the entire process seamless. Clear pricing, expert guidance, and my company was set up faster than expected. The team was responsive throughout, answered all my questions, and helped me choose the right free zone for my e-commerce business. I highly recommend their services.',
    rating: 5,
    date: '2024',
  },
  {
    id: '2',
    clientName: 'Client — SaaS Operator (US)',
    clientType: 'Tech Startup',
    shortText: 'The calculator gave me instant clarity on costs. The team was professional, handled everything efficiently, and I felt supported every step of the way.',
    fullText: 'The calculator gave me instant clarity on costs. The team was professional, handled everything efficiently, and I felt supported every step of the way. As a US-based SaaS operator, I needed to understand the setup process clearly, and Valtora delivered exactly that.',
    rating: 5,
    date: '2024',
  },
  {
    id: '3',
    clientName: 'Client — Consulting Firm (Germany)',
    clientType: 'Business Consulting',
    shortText: 'Outstanding service from start to finish. They helped us navigate the complexities of Dubai company formation with transparency and expertise.',
    fullText: 'Outstanding service from start to finish. They helped us navigate the complexities of Dubai company formation with transparency and expertise. The visa processing was handled smoothly, and we were operational within the promised timeframe.',
    rating: 5,
    date: '2024',
  },
  {
    id: '4',
    clientName: 'Client — Trading Company (India)',
    clientType: 'Trading Business',
    shortText: 'Fast, transparent, and professional. The team understood our trading requirements and recommended the perfect free zone setup.',
    fullText: 'Fast, transparent, and professional. The team understood our trading requirements and recommended the perfect free zone setup. Bank account opening support was particularly helpful, and we were trading within weeks.',
    rating: 5,
    date: '2024',
  },
  {
    id: '5',
    clientName: 'Client — Digital Marketing Agency (UK)',
    clientType: 'Marketing Services',
    shortText: 'No hidden fees, clear communication, and excellent support. The express service option was perfect for our urgent timeline.',
    fullText: 'No hidden fees, clear communication, and excellent support. The express service option was perfect for our urgent timeline. Our dedicated account manager made the entire process stress-free.',
    rating: 5,
    date: '2024',
  },
  {
    id: '6',
    clientName: 'Client — Real Estate Investor (UAE)',
    clientType: 'Real Estate',
    shortText: 'Professional team with deep local knowledge. They helped us set up our mainland company quickly and handled all compliance requirements.',
    fullText: 'Professional team with deep local knowledge. They helped us set up our mainland company quickly and handled all compliance requirements. The ongoing support has been invaluable as we expand our operations.',
    rating: 5,
    date: '2024',
  },
  {
    id: '7',
    clientName: 'Client — Logistics Company (Pakistan)',
    clientType: 'Logistics & Shipping',
    shortText: 'The best decision we made. Valtora guided us through every step, from choosing the right license to visa processing.',
    fullText: 'The best decision we made. Valtora guided us through every step, from choosing the right license to visa processing. Their expertise in logistics business setup saved us time and money.',
    rating: 5,
    date: '2024',
  },
  {
    id: '8',
    clientName: 'Client — Tech Startup (Australia)',
    clientType: 'Technology Services',
    shortText: 'Transparent pricing and fast execution. We were impressed by how quickly they got our company registered and operational.',
    fullText: 'Transparent pricing and fast execution. We were impressed by how quickly they got our company registered and operational. The team\'s understanding of tech startup needs was evident throughout.',
    rating: 5,
    date: '2024',
  },
  {
    id: '9',
    clientName: 'Client — Investment Consultancy (South Africa)',
    clientType: 'Financial Services',
    shortText: 'Expert guidance on free zone vs mainland. They took the time to understand our business model and recommended the optimal setup.',
    fullText: 'Expert guidance on free zone vs mainland. They took the time to understand our business model and recommended the optimal setup. The compliance support has been excellent.',
    rating: 5,
    date: '2024',
  },
]
