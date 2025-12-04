'use client'

import type { BusinessCategory, Priority, JurisdictionPreference, WorkLocation } from '@/domain/formation/decisionEngine/types'

interface ReviewEnquiry {
  business_category: BusinessCategory
  business_model_description: string
  express_preference: 'standard' | 'express'
  num_shareholders: number
  shareholders: Array<{
    name: string
    nationality: string
    ownership_percent: number
    has_visited_uae: boolean
    has_uid?: boolean
    requires_visa: boolean
    visa_role?: string
  }>
  total_visas_requested: number
  visas: Array<{
    role: string
    assigned_to_shareholder_id?: string
  }>
  priorities: { primary: Priority }
  jurisdiction_preference: JurisdictionPreference
  work_location: WorkLocation
  special_activity_flags: {
    commodities: boolean
    crypto: boolean
    real_estate_brokerage: boolean
    financial_services: boolean
    industrial_or_manufacturing: boolean
  }
}

interface CalculatorStep6ReviewProps {
  enquiry: ReviewEnquiry
}

const priorityLabels: Record<Priority, string> = {
  fastest_setup: 'Fastest Setup Possible',
  cheapest: 'Cheapest Option',
  best_growth: 'Best Freezone for Long-term Growth',
  sector_networking: 'Sector-Specialist Freezone',
  bank_account_ease: 'Bank Account Opening Ease',
  not_sure: 'Not Sure - Recommend for Me',
}

const jurisdictionLabels: Record<JurisdictionPreference, string> = {
  freezone: 'Free Zone',
  mainland: 'Mainland',
  either: 'Either',
  recommend_for_me: 'Recommend for Me',
}

const workLocationLabels: Record<WorkLocation, string> = {
  remote_only: 'Fully Remote',
  uae_only: 'UAE Only',
  outside_uae_with_visits: 'Outside UAE with Occasional Visits',
  uae_with_office: 'UAE Office Needed',
  warehouse_required: 'Warehouse Required',
}

const businessCategoryLabels: Record<BusinessCategory, string> = {
  service: 'Service',
  consultancy: 'Consultancy',
  trading: 'Trading',
  ecommerce: 'E-commerce',
  commodities: 'Commodities Trading',
  tech: 'Technology',
  media: 'Media',
  logistics: 'Logistics',
  manufacturing: 'Manufacturing',
  crypto: 'Crypto/Web3',
  real_estate: 'Real Estate',
  financial_services: 'Financial Services',
  other: 'Other',
}

export default function CalculatorStep6Review({ enquiry }: CalculatorStep6ReviewProps) {
  const specialActivities = Object.entries(enquiry.special_activity_flags)
    .filter(([_, value]) => value)
    .map(([key]) => key)

  return (
    <div>
      <h3 className="font-serif text-2xl text-valtora-navy mb-2">Review Your Information</h3>
      <p className="text-gray-600 mb-6">
        Please review all the information below. Click "Get My Quote" to generate your personalized quote.
      </p>

      <div className="space-y-6">
        {/* Business Details */}
        <div className="border border-gray-200 rounded-lg p-6 bg-pearl-white">
          <h4 className="font-semibold text-valtora-navy mb-4">Business Details</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600">Category: </span>
              <span className="font-medium">{businessCategoryLabels[enquiry.business_category]}</span>
            </div>
            <div>
              <span className="text-gray-600">Description: </span>
              <span className="font-medium">{enquiry.business_model_description}</span>
            </div>
            <div>
              <span className="text-gray-600">Processing Speed: </span>
              <span className="font-medium capitalize">{enquiry.express_preference}</span>
            </div>
          </div>
        </div>

        {/* Shareholders */}
        <div className="border border-gray-200 rounded-lg p-6 bg-pearl-white">
          <h4 className="font-semibold text-valtora-navy mb-4">
            Shareholders ({enquiry.num_shareholders})
          </h4>
          <div className="space-y-3">
            {enquiry.shareholders.map((sh, index) => (
              <div key={index} className="text-sm">
                <div className="font-medium text-valtora-navy">
                  {sh.name || `Shareholder ${index + 1}`}
                </div>
                <div className="text-gray-600 mt-1">
                  {sh.nationality} • {sh.ownership_percent}% ownership
                  {sh.requires_visa && ` • Visa: ${sh.visa_role || 'Not specified'}`}
                  {sh.has_visited_uae && ` • Visited UAE${sh.has_uid ? ' (has UID)' : ' (no UID)'}`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visas */}
        {enquiry.total_visas_requested > 0 && (
          <div className="border border-gray-200 rounded-lg p-6 bg-pearl-white">
            <h4 className="font-semibold text-valtora-navy mb-4">
              Visas ({enquiry.total_visas_requested})
            </h4>
            <div className="space-y-2 text-sm">
              {enquiry.visas.map((visa, index) => (
                <div key={index} className="text-gray-700">
                  Visa {index + 1}: {visa.role}
                  {visa.assigned_to_shareholder_id && ' (Assigned to shareholder)'}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Priorities & Preferences */}
        <div className="border border-gray-200 rounded-lg p-6 bg-pearl-white">
          <h4 className="font-semibold text-valtora-navy mb-4">Priorities & Preferences</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600">Primary Priority: </span>
              <span className="font-medium">{priorityLabels[enquiry.priorities.primary]}</span>
            </div>
            <div>
              <span className="text-gray-600">Jurisdiction: </span>
              <span className="font-medium">{jurisdictionLabels[enquiry.jurisdiction_preference]}</span>
            </div>
            <div>
              <span className="text-gray-600">Work Location: </span>
              <span className="font-medium">{workLocationLabels[enquiry.work_location]}</span>
            </div>
          </div>
        </div>

        {/* Special Activities */}
        {specialActivities.length > 0 && (
          <div className="border border-gray-200 rounded-lg p-6 bg-pearl-white">
            <h4 className="font-semibold text-valtora-navy mb-4">Special Activities</h4>
            <div className="space-y-1 text-sm">
              {specialActivities.map((activity) => (
                <div key={activity} className="text-gray-700 capitalize">
                  • {activity.replace(/_/g, ' ')}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-emirati-gold/10 border border-emirati-gold/30 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Ready to get your quote?</strong> Click "Get My Quote" below to see your personalized 
          pricing breakdown and recommended authorities.
        </p>
      </div>
    </div>
  )
}

