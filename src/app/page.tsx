'use client'

import { useRef, useState } from 'react'
import Hero from '@/components/Hero'
import CalculatorSection from '@/components/CalculatorSection'
import DynamicPriceSummary from '@/components/DynamicPriceSummary'
import TrustSection from '@/components/TrustSection'
import SecondaryCTASection from '@/components/SecondaryCTASection'
import FAQPreview from '@/components/FAQPreview'
import LeadCapturePopup from '@/components/LeadCapturePopup'
import { useLeadCapturePopup } from '@/hooks/useLeadCapturePopup'
import type { DecisionResult } from '@/domain/formation/decisionEngine/types'

export default function Home() {
  const calculatorRef = useRef<HTMLDivElement>(null)
  const [quoteResult, setQuoteResult] = useState<DecisionResult | null>(null)
  const { showPopup, handleClose } = useLeadCapturePopup()

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleQuoteGenerated = (result: DecisionResult) => {
    setQuoteResult(result)
    // Scroll to price summary after quote is generated
    setTimeout(() => {
      const summaryElement = document.getElementById('price-summary')
      summaryElement?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <div className="min-h-screen">
      <Hero onCalculateClick={scrollToCalculator} />
      
      <div ref={calculatorRef}>
        <CalculatorSection onQuoteGenerated={handleQuoteGenerated} />
      </div>

      {/* Dynamic Price Summary */}
      <section id="price-summary" className="py-8 bg-desert-sand">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <DynamicPriceSummary decisionResult={quoteResult} />
          </div>
        </div>
      </section>

      <TrustSection />
      <SecondaryCTASection />
      <FAQPreview />

      {/* Lead Capture Popup */}
      {showPopup && <LeadCapturePopup onClose={handleClose} />}
    </div>
  )
}

