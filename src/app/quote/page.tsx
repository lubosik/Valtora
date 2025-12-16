'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import type { DecisionResult, AuthorityQuote } from '@/domain/formation/decisionEngine/types'

// Force dynamic rendering - this page uses sessionStorage and searchParams
export const dynamic = 'force-dynamic'

function QuotePageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [decisionResult, setDecisionResult] = useState<DecisionResult | null>(null)
  const [selectedQuoteIndex, setSelectedQuoteIndex] = useState(0)
  const [quoteValidUntil, setQuoteValidUntil] = useState<Date | null>(null)

  useEffect(() => {
    // Try to get quote data from sessionStorage
    if (typeof window !== 'undefined') {
      const storedData = sessionStorage.getItem('quoteData')
      if (storedData) {
        try {
          const result: DecisionResult = JSON.parse(storedData)
          setDecisionResult(result)
          
          // Set quote validity (24 hours from now)
          const validUntil = new Date()
          validUntil.setHours(validUntil.getHours() + 24)
          setQuoteValidUntil(validUntil)
        } catch (err) {
          console.error('Error parsing quote data:', err)
          router.push('/')
        }
      } else {
        // No quote data, redirect to home
        router.push('/')
      }
    }
  }, [router])

  if (!decisionResult) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-emirati-gold border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your quote...</p>
        </div>
      </div>
    )
  }

  const selectedQuote = decisionResult.quotes[selectedQuoteIndex]
  const enquiryId = searchParams.get('enquiry_id') || decisionResult.enquiry_id

  const handlePayment = (type: 'full' | 'deposit') => {
    // Store selected quote and payment type
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selectedQuote', JSON.stringify({
        quoteIndex: selectedQuoteIndex,
        paymentType: type,
        enquiryId: enquiryId,
      }))
      router.push(`/checkout?type=${type}&enquiry_id=${encodeURIComponent(enquiryId)}`)
    }
  }

  return (
    <div className="min-h-screen bg-pearl-white">
      <div className="container-custom py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <Link
              href="/"
              className="text-oasis-blue hover:text-valtora-navy inline-flex items-center gap-2 mb-4 text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Calculator
            </Link>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-valtora-navy mb-4 text-balance">
              Your Dubai Company Formation Quote
            </h1>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Review your personalized quote and select your preferred authority option.
            </p>
          </div>

          {/* Quote Validity */}
          {quoteValidUntil && (
            <div className="mb-6 p-3 sm:p-4 bg-emirati-gold/10 border border-emirati-gold/30 rounded-lg">
              <div className="flex items-start sm:items-center gap-2">
                <svg className="w-5 h-5 text-emirati-gold flex-shrink-0 mt-0.5 sm:mt-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <p className="text-xs sm:text-sm font-medium text-valtora-navy">
                  This quote is locked until {quoteValidUntil.toLocaleString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          )}

          {/* Case Status Warning */}
          {decisionResult.case_status !== 'QUOTED' && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">
                {decisionResult.case_status === 'ON_HOLD_UID_REQUIRED'
                  ? 'UID Required Before Licence Issuance'
                  : 'Additional Approvals Required'}
              </h3>
              <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                {decisionResult.status_reasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
              <p className="text-sm text-yellow-700 mt-3">
                You can still secure your quote with a refundable deposit. Our team will guide you through the next steps.
              </p>
            </div>
          )}

          {/* Authority Options Tabs */}
          {decisionResult.quotes.length > 1 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 border-b border-gray-200">
                {decisionResult.quotes.map((quote, index) => (
                  <button
                    key={quote.authority_id}
                    onClick={() => setSelectedQuoteIndex(index)}
                    className={`px-4 py-2 font-medium text-sm transition-colors ${
                      selectedQuoteIndex === index
                        ? 'text-emirati-gold border-b-2 border-emirati-gold'
                        : 'text-gray-600 hover:text-valtora-navy'
                    }`}
                  >
                    {quote.authority_name}
                    {index === 0 && (
                      <span className="ml-2 text-xs bg-emirati-gold/20 text-emirati-gold px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selected Quote Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {/* Main Quote Card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-5 sm:p-6 md:p-8 border border-gray-200">
                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h2 className="font-serif text-2xl sm:text-3xl text-valtora-navy">
                      {selectedQuote.authority_name}
                    </h2>
                    {selectedQuoteIndex === 0 && (
                      <span className="bg-emirati-gold/20 text-emirati-gold px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-fit">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 capitalize">{selectedQuote.jurisdiction_type}</p>
                  {selectedQuote.forced_by_activity && (
                    <p className="text-xs sm:text-sm text-oasis-blue mt-2">
                      Required for your business activity
                    </p>
                  )}
                </div>

                {/* Total Cost */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-valtora-navy">
                      {selectedQuote.total_cost.toLocaleString()}
                    </span>
                    <span className="text-xl sm:text-2xl text-gray-700">AED</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Total estimated cost</p>
                </div>

                {/* Cost Breakdown */}
                <div className="mb-6">
                  <h3 className="font-semibold text-valtora-navy mb-4">Detailed Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-700">Licence & Registration</span>
                      <span className="font-medium">{selectedQuote.breakdown.licence_and_registration.toLocaleString()} AED</span>
                    </div>
                    {selectedQuote.breakdown.visa_costs > 0 && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-700">Visa Costs</span>
                        <span className="font-medium">{selectedQuote.breakdown.visa_costs.toLocaleString()} AED</span>
                      </div>
                    )}
                    {selectedQuote.breakdown.office_cost_estimate > 0 && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-700">Office Cost Estimate (Annual)</span>
                        <span className="font-medium">{selectedQuote.breakdown.office_cost_estimate.toLocaleString()} AED</span>
                      </div>
                    )}
                    {selectedQuote.breakdown.special_activity_fees > 0 && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-700">Special Activity Fees</span>
                        <span className="font-medium">{selectedQuote.breakdown.special_activity_fees.toLocaleString()} AED</span>
                      </div>
                    )}
                    {selectedQuote.breakdown.nationality_adjustments !== 0 && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-700">Nationality Adjustments</span>
                        <span className="font-medium">
                          {selectedQuote.breakdown.nationality_adjustments > 0 ? '+' : ''}
                          {selectedQuote.breakdown.nationality_adjustments.toLocaleString()} AED
                        </span>
                      </div>
                    )}
                    {selectedQuote.breakdown.express_fee > 0 && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-700">Express Processing Fee</span>
                        <span className="font-medium">{selectedQuote.breakdown.express_fee.toLocaleString()} AED</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline */}
                <div className="mb-6 p-4 bg-pearl-white rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-valtora-navy mb-3">Estimated Timeline</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Standard Processing:</span>
                      <span className="font-medium">{selectedQuote.timeline_days.standard} days</span>
                    </div>
                    {selectedQuote.timeline_days.express && (
                      <div className="flex justify-between">
                        <span className="text-gray-700">Express Processing:</span>
                        <span className="font-medium">{selectedQuote.timeline_days.express} days</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Explanations */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-valtora-navy mb-2">Why This Authority?</h3>
                    <p className="text-sm text-gray-700">{selectedQuote.explanations.why_recommended}</p>
                  </div>
                  {selectedQuote.explanations.activity_reason && (
                    <div className="p-3 bg-oasis-blue/10 border border-oasis-blue/30 rounded-lg">
                      <p className="text-sm text-oasis-blue">
                        <strong>Activity Requirement: </strong>
                        {selectedQuote.explanations.activity_reason}
                      </p>
                    </div>
                  )}
                  {selectedQuote.explanations.nationality_notes && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Nationality Note: </strong>
                        {selectedQuote.explanations.nationality_notes}
                      </p>
                    </div>
                  )}
                  {selectedQuote.explanations.uid_warning && (
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-sm text-orange-800">
                        <strong>⚠️ Important: </strong>
                        {selectedQuote.explanations.uid_warning}
                      </p>
                    </div>
                  )}
                  {selectedQuote.explanations.mainland_comparison && (
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-sm text-gray-700">
                        {selectedQuote.explanations.mainland_comparison}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar - Payment CTAs */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 sticky top-24">
                <h3 className="font-serif text-2xl text-valtora-navy mb-4">Ready to Proceed?</h3>
                
                <div className="space-y-4 mb-6">
                  <button
                    onClick={() => handlePayment('full')}
                    className="btn-primary w-full py-3 text-lg"
                  >
                    Pay Now & Start Setup
                  </button>
                  
                  <button
                    onClick={() => handlePayment('deposit')}
                    className="btn-secondary w-full py-3 text-lg"
                  >
                    Reserve Your Company – AED 500
                  </button>
                  
                  <a
                    href="https://wa.me/18125513945?text=Hi%20Valtora%2C%20I%27d%20like%20to%20discuss%20my%20quote%20for%20company%20formation."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    Talk to an Advisor on WhatsApp
                  </a>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-600 mb-2">What's included:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-emirati-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Trade licence application</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-emirati-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-emirati-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Ongoing support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function QuotePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-emirati-gold border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your quote...</p>
        </div>
      </div>
    }>
      <QuotePageContent />
    </Suspense>
  )
}

