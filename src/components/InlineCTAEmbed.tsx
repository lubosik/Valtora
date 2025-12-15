'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'
import LeadCapturePopup from './LeadCapturePopup'

interface InlineCTAEmbedProps {
  /** Optional custom headline */
  headline?: string
  /** Optional custom description */
  description?: string
  /** Optional custom CTA button text */
  ctaText?: string
}

export default function InlineCTAEmbed({
  headline = 'Ready to Start Your Dubai Company?',
  description = 'Get an instant, transparent quote for your Dubai company formation. No hidden fees, expert support.',
  ctaText = 'Get My Setup Options',
}: InlineCTAEmbedProps) {
  const pathname = usePathname()
  const [showPopup, setShowPopup] = useState(false)
  const isHomepage = pathname === '/'

  const handleCTAClick = () => {
    if (isHomepage) {
      // Scroll to hero form on homepage
      const heroSection = document.querySelector('section[class*="bg-valtora-navy"]')
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        // Fallback: scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      // On other pages (like blog), open the form popup
      setShowPopup(true)
    }
  }

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  return (
    <>
      <div className="my-12 p-8 bg-gradient-to-br from-valtora-navy to-carbon-black rounded-lg border border-emirati-gold/20 shadow-xl">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-4">
            <svg
              className="w-12 h-12 text-emirati-gold mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="font-serif text-2xl md:text-3xl text-pearl-white mb-4">
            {headline}
          </h3>
          <p className="text-gray-200 mb-6 text-lg leading-relaxed">
            {description}
          </p>
          <button
            onClick={handleCTAClick}
            className="btn-primary text-lg px-8 py-4 font-semibold"
          >
            {ctaText}
          </button>
          <p className="text-sm text-gray-300 mt-4">
            We'll reply within 1 business hour. No spam. No hidden fees.
          </p>
        </div>
      </div>
      {showPopup && <LeadCapturePopup onClose={handleClosePopup} />}
    </>
  )
}
