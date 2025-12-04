'use client'

import type { BusinessCategory } from '@/domain/formation/decisionEngine/types'

interface CalculatorStep1BusinessProps {
  businessCategory: BusinessCategory | ''
  setBusinessCategory: (category: BusinessCategory) => void
  businessModelDescription: string
  setBusinessModelDescription: (description: string) => void
  expressPreference: 'standard' | 'express'
  setExpressPreference: (pref: 'standard' | 'express') => void
}

const businessCategories: { value: BusinessCategory; label: string; description: string }[] = [
  { value: 'service', label: 'Service', description: 'Professional services, consulting, advisory' },
  { value: 'consultancy', label: 'Consultancy', description: 'Business consulting and advisory services' },
  { value: 'trading', label: 'Trading', description: 'Import/export, general trading' },
  { value: 'ecommerce', label: 'E-commerce', description: 'Online retail and digital commerce' },
  { value: 'commodities', label: 'Commodities Trading', description: 'Trading in commodities (requires DMCC or similar)' },
  { value: 'tech', label: 'Technology', description: 'Software, IT services, tech solutions' },
  { value: 'media', label: 'Media', description: 'Content creation, publishing, digital media' },
  { value: 'logistics', label: 'Logistics', description: 'Shipping, freight, supply chain' },
  { value: 'manufacturing', label: 'Manufacturing', description: 'Production and manufacturing' },
  { value: 'crypto', label: 'Crypto/Web3', description: 'Cryptocurrency, blockchain, digital assets' },
  { value: 'real_estate', label: 'Real Estate', description: 'Real estate services and brokerage' },
  { value: 'financial_services', label: 'Financial Services', description: 'Financial services (requires DIFC/ADGM)' },
  { value: 'other', label: 'Other', description: 'Other business activities' },
]

export default function CalculatorStep1Business({
  businessCategory,
  setBusinessCategory,
  businessModelDescription,
  setBusinessModelDescription,
  expressPreference,
  setExpressPreference,
}: CalculatorStep1BusinessProps) {
  return (
    <div>
      <h3 className="font-serif text-2xl sm:text-3xl text-valtora-navy mb-2">Company Details</h3>
      <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
        Tell us about your business to get the most accurate quote.
      </p>

      {/* Business Category */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          What type of business are you setting up? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {businessCategories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setBusinessCategory(cat.value)}
              className={`p-4 sm:p-5 text-left border-2 rounded-lg transition-all ${
                businessCategory === cat.value
                  ? 'border-emirati-gold bg-emirati-gold/10 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className="font-semibold text-valtora-navy text-sm sm:text-base">{cat.label}</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">{cat.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Business Description */}
      <div className="mb-6">
        <label htmlFor="business-description" className="block text-sm font-medium text-gray-700 mb-2">
          Describe your business model in a few sentences <span className="text-red-500">*</span>
        </label>
        <textarea
          id="business-description"
          value={businessModelDescription}
          onChange={(e) => setBusinessModelDescription(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emirati-gold focus:border-emirati-gold outline-none"
          placeholder="e.g., We provide digital marketing services to SMEs in the UK and Europe, focusing on SEO and social media management..."
        />
        <p className="text-xs text-gray-500 mt-1">
          This helps us recommend the best authority and identify any special requirements.
        </p>
      </div>

      {/* Express Preference */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Processing Speed
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setExpressPreference('standard')}
            className={`p-4 sm:p-5 border-2 rounded-lg transition-all text-left ${
              expressPreference === 'standard'
                ? 'border-emirati-gold bg-emirati-gold/10 shadow-sm'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className="font-semibold text-valtora-navy mb-1 text-sm sm:text-base">Standard</div>
            <div className="text-xs sm:text-sm text-gray-600">7-14 days</div>
            <div className="text-xs text-gray-500 mt-1">No extra fee</div>
          </button>
          <button
            type="button"
            onClick={() => setExpressPreference('express')}
            className={`p-4 sm:p-5 border-2 rounded-lg transition-all text-left ${
              expressPreference === 'express'
                ? 'border-emirati-gold bg-emirati-gold/10 shadow-sm'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className="font-semibold text-valtora-navy mb-1 text-sm sm:text-base">Express</div>
            <div className="text-xs sm:text-sm text-gray-600">3-5 days</div>
            <div className="text-xs text-emirati-gold mt-1 font-medium">+ AED 3,000-5,000</div>
          </button>
        </div>
      </div>
    </div>
  )
}

