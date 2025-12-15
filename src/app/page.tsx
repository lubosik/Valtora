'use client'

import { useRef, useState } from 'react'
import Hero from '@/components/Hero'
import TrustStrip from '@/components/TrustStrip'
import AccoladesSection from '@/components/AccoladesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import CaseStudiesSection from '@/components/CaseStudiesSection'
import TrustSection from '@/components/TrustSection'
import FAQPreview from '@/components/FAQPreview'
import LeadCapturePopup from '@/components/LeadCapturePopup'
import { useLeadCapturePopup } from '@/hooks/useLeadCapturePopup'
import type { DecisionResult } from '@/domain/formation/decisionEngine/types'

export default function Home() {
  const { showPopup, handleClose } = useLeadCapturePopup()

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Trust Strip - directly under hero */}
      <TrustStrip />

      {/* Why Valtora Accolades */}
      <AccoladesSection />
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* Case Studies */}
      <CaseStudiesSection />

      <TrustSection />
      <FAQPreview />

      {/* Lead Capture Popup */}
      {showPopup && <LeadCapturePopup onClose={handleClose} />}
    </div>
  )
}

