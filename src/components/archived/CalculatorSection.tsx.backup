'use client'

import { useState } from 'react'
import Calculator from './Calculator'
import type { Enquiry, DecisionResult } from '@/domain/formation/decisionEngine/types'

interface CalculatorSectionProps {
  onQuoteGenerated: (result: DecisionResult) => void
}

export default function CalculatorSection({ onQuoteGenerated }: CalculatorSectionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCalculatorComplete = async (completedEnquiry: Enquiry) => {
    setIsLoading(true)
    setError(null)

    try {
      // Track calculator completion
      const { trackCalculatorComplete } = await import('@/lib/analytics')
      trackCalculatorComplete(completedEnquiry.enquiry_id)

      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completedEnquiry),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate quote')
      }

      const result: DecisionResult = await response.json()
      onQuoteGenerated(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating your quote')
      console.error('Error generating quote:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="calculator" className="section-spacing bg-pearl-white">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-valtora-navy mb-4 text-balance">
              60-Second Cost Calculator
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed px-4">
              Answer a few quick questions to get an instant, transparent quote for your Dubai company formation.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <p className="font-medium">Error generating quote</p>
              <p className="text-sm mt-1">{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-2 text-sm underline hover:no-underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {isLoading && (
            <div className="mb-6 p-4 bg-emirati-gold/10 border border-emirati-gold/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-emirati-gold border-t-transparent"></div>
                <p className="text-gray-700">Generating your personalized quote...</p>
              </div>
            </div>
          )}

          <Calculator onComplete={handleCalculatorComplete} />
        </div>
      </div>
    </section>
  )
}

