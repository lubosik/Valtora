'use client'

import type { Priority, JurisdictionPreference, WorkLocation } from '@/domain/formation/decisionEngine/types'

interface CalculatorStep4PrioritiesProps {
  primaryPriority: Priority | ''
  setPrimaryPriority: (priority: Priority) => void
  jurisdictionPreference: JurisdictionPreference | ''
  setJurisdictionPreference: (pref: JurisdictionPreference) => void
  workLocation: WorkLocation | ''
  setWorkLocation: (location: WorkLocation) => void
}

const priorities: { value: Priority; label: string; description: string }[] = [
  {
    value: 'fastest_setup',
    label: 'Fastest Setup Possible',
    description: 'Get your company set up as quickly as possible',
  },
  {
    value: 'cheapest',
    label: 'Cheapest Option',
    description: 'Find the most cost-effective solution',
  },
  {
    value: 'best_growth',
    label: 'Best Freezone for Long-term Growth',
    description: 'Focus on scalability and future expansion',
  },
  {
    value: 'sector_networking',
    label: 'Sector-Specialist Freezone',
    description: 'Access to industry-specific networking and ecosystem',
  },
  {
    value: 'bank_account_ease',
    label: 'Bank Account Opening Ease',
    description: 'Prioritize authorities with strong bank relationships',
  },
  {
    value: 'not_sure',
    label: 'Not Sure - Recommend for Me',
    description: 'Let us recommend the best option based on your needs',
  },
]

const jurisdictionOptions: { value: JurisdictionPreference; label: string; description: string }[] = [
  {
    value: 'freezone',
    label: 'Free Zone',
    description: 'Streamlined setup, flexible office options',
  },
  {
    value: 'mainland',
    label: 'Mainland',
    description: 'Broader market access, requires office space',
  },
  {
    value: 'either',
    label: 'Either',
    description: 'Open to both free zone and mainland options',
  },
  {
    value: 'recommend_for_me',
    label: 'Recommend for Me',
    description: 'Let us suggest the best option',
  },
]

const workLocationOptions: { value: WorkLocation; label: string; description: string }[] = [
  {
    value: 'remote_only',
    label: 'Fully Remote',
    description: 'Work entirely from outside the UAE',
  },
  {
    value: 'uae_only',
    label: 'UAE Only',
    description: 'Operate exclusively within the UAE',
  },
  {
    value: 'outside_uae_with_visits',
    label: 'Outside UAE with Occasional Visits',
    description: 'Base outside UAE but visit regularly',
  },
  {
    value: 'uae_with_office',
    label: 'UAE Office Needed',
    description: 'Require a physical office space in the UAE',
  },
  {
    value: 'warehouse_required',
    label: 'Warehouse Required',
    description: 'Need warehouse or industrial space',
  },
]

export default function CalculatorStep4Priorities({
  primaryPriority,
  setPrimaryPriority,
  jurisdictionPreference,
  setJurisdictionPreference,
  workLocation,
  setWorkLocation,
}: CalculatorStep4PrioritiesProps) {
  return (
    <div>
      <h3 className="font-serif text-2xl text-valtora-navy mb-2">Priorities & Preferences</h3>
      <p className="text-gray-600 mb-6">
        Help us understand what matters most to you so we can recommend the best authority.
      </p>

      {/* Primary Priority */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          What is your primary priority? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {priorities.map((priority) => (
            <button
              key={priority.value}
              type="button"
              onClick={() => setPrimaryPriority(priority.value)}
              className={`p-4 text-left border-2 rounded-lg transition-all ${
                primaryPriority === priority.value
                  ? 'border-emirati-gold bg-emirati-gold/10'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-valtora-navy">{priority.label}</div>
              <div className="text-sm text-gray-600 mt-1">{priority.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Jurisdiction Preference */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Do you prefer Free Zone or Mainland? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {jurisdictionOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setJurisdictionPreference(option.value)}
              className={`p-4 text-left border-2 rounded-lg transition-all ${
                jurisdictionPreference === option.value
                  ? 'border-emirati-gold bg-emirati-gold/10'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-valtora-navy">{option.label}</div>
              <div className="text-sm text-gray-600 mt-1">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Work Location */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Where will you primarily work from? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {workLocationOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setWorkLocation(option.value)}
              className={`p-4 text-left border-2 rounded-lg transition-all ${
                workLocation === option.value
                  ? 'border-emirati-gold bg-emirati-gold/10'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-valtora-navy">{option.label}</div>
              <div className="text-sm text-gray-600 mt-1">{option.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

