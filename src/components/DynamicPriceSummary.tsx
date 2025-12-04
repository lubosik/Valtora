'use client'

import { useRouter } from 'next/navigation'
import type { DecisionResult } from '@/domain/formation/decisionEngine/types'

interface DynamicPriceSummaryProps {
  decisionResult?: DecisionResult | null
}

export default function DynamicPriceSummary({
  decisionResult,
}: DynamicPriceSummaryProps) {
  const router = useRouter()

  // If no data, show placeholder
  if (!decisionResult || !decisionResult.quotes || decisionResult.quotes.length === 0) {
    return (
      <div className="bg-desert-sand rounded-lg shadow-lg p-6 md:p-8 border border-emirati-gold/20">
        <h3 className="font-serif text-2xl text-valtora-navy mb-4">
          Your Instant Quote
        </h3>
        <p className="text-gray-600 mb-6">
          Complete the calculator above to see your personalized quote and pricing breakdown.
        </p>
        <div className="text-center py-8">
          <div className="inline-block text-4xl font-bold text-gray-400">—</div>
        </div>
      </div>
    )
  }

  const primaryQuote = decisionResult.quotes[0]
  const breakdown = primaryQuote.breakdown
  const totalCost = primaryQuote.total_cost

  const handleViewFullQuote = async () => {
    // Store the decision result in sessionStorage and navigate to quote page
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('quoteData', JSON.stringify(decisionResult))
      
      // Track quote view
      const { trackQuoteView } = await import('@/lib/analytics')
      if (decisionResult.quotes.length > 0) {
        trackQuoteView(decisionResult.enquiry_id, decisionResult.quotes[0].authority_id)
      }
      
      router.push(`/quote?enquiry_id=${encodeURIComponent(decisionResult.enquiry_id)}`)
    }
  }

  return (
    <div className="bg-desert-sand rounded-lg shadow-lg p-5 sm:p-6 md:p-8 border border-emirati-gold/20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-6">
        <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-valtora-navy">
          Your Instant Quote
        </h3>
        <span className="text-xs sm:text-sm text-gray-600 bg-white px-3 py-1.5 rounded-full w-fit">
          Transparent Estimate
        </span>
      </div>

      {/* Case Status Warning */}
      {decisionResult.case_status !== 'QUOTED' && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm font-medium text-yellow-800 mb-1">
            {decisionResult.case_status === 'ON_HOLD_UID_REQUIRED'
              ? 'UID Required'
              : 'Additional Approvals Needed'}
          </p>
          <p className="text-xs text-yellow-700">
            {decisionResult.status_reasons[0]}
          </p>
        </div>
      )}

      {/* Total Cost */}
      <div className="mb-6 pb-6 border-b border-emirati-gold/30">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-valtora-navy">
            {totalCost.toLocaleString()}
          </span>
          <span className="text-lg sm:text-xl md:text-2xl text-gray-700">AED</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">Total estimated cost</p>
      </div>

      {/* Breakdown */}
      <div className="mb-6 space-y-3">
        <h4 className="font-semibold text-valtora-navy mb-3">Cost Breakdown</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-700">Licence & Registration</span>
            <span className="font-medium">{breakdown.licence_and_registration.toLocaleString()} AED</span>
          </div>
          {breakdown.visa_costs > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-700">Visa Costs</span>
              <span className="font-medium">{breakdown.visa_costs.toLocaleString()} AED</span>
            </div>
          )}
          {breakdown.office_cost_estimate > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-700">Office Cost Estimate</span>
              <span className="font-medium">{breakdown.office_cost_estimate.toLocaleString()} AED</span>
            </div>
          )}
          {breakdown.special_activity_fees > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-700">Special Activity Fees</span>
              <span className="font-medium">{breakdown.special_activity_fees.toLocaleString()} AED</span>
            </div>
          )}
          {breakdown.nationality_adjustments !== 0 && (
            <div className="flex justify-between">
              <span className="text-gray-700">Nationality Adjustments</span>
              <span className="font-medium">
                {breakdown.nationality_adjustments > 0 ? '+' : ''}
                {breakdown.nationality_adjustments.toLocaleString()} AED
              </span>
            </div>
          )}
          {breakdown.express_fee > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-700">Express Fee</span>
              <span className="font-medium">{breakdown.express_fee.toLocaleString()} AED</span>
            </div>
          )}
        </div>
      </div>

      {/* Recommended Authority */}
      <div className="mb-6 p-4 bg-white rounded-lg border border-emirati-gold/30">
        <p className="text-sm text-gray-600 mb-1">Recommended Authority</p>
        <p className="font-semibold text-valtora-navy">{primaryQuote.authority_name}</p>
        <p className="text-xs text-gray-500 mt-1 capitalize">{primaryQuote.jurisdiction_type}</p>
      </div>

      {/* Timeline */}
      <div className="mb-6 text-sm">
        <p className="text-gray-600 mb-2">Estimated Timeline</p>
        <div className="flex gap-4">
          <div>
            <span className="text-gray-700">Standard: </span>
            <span className="font-medium">{primaryQuote.timeline_days.standard} days</span>
          </div>
          {primaryQuote.timeline_days.express && (
            <div>
              <span className="text-gray-700">Express: </span>
              <span className="font-medium">{primaryQuote.timeline_days.express} days</span>
            </div>
          )}
        </div>
      </div>

      {/* Alternative Options */}
      {decisionResult.quotes.length > 1 && (
        <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">
            {decisionResult.quotes.length - 1} alternative option{decisionResult.quotes.length > 2 ? 's' : ''} available
          </p>
          <p className="text-xs text-gray-500">
            View full quote to see all options and compare
          </p>
        </div>
      )}

      {/* CTA */}
      <button
        onClick={handleViewFullQuote}
        className="btn-primary w-full py-3"
      >
        View Full Quote
      </button>
    </div>
  )
}

