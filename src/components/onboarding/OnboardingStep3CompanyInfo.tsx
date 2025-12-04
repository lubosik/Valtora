'use client'

import type { Enquiry } from '@/domain/formation/decisionEngine/types'

interface CompanyInfoData {
  tradeNames: string[]
  businessActivityDescription: string
  officePreference: 'no_office' | 'flexi_desk' | 'dedicated_office' | 'warehouse'
  visasRequired: number
  visaRoles: string[]
}

interface OnboardingStep3CompanyInfoProps {
  data: CompanyInfoData
  updateData: (updates: Partial<CompanyInfoData>) => void
  enquiryData: Enquiry | null
}

export default function OnboardingStep3CompanyInfo({
  data,
  updateData,
  enquiryData,
}: OnboardingStep3CompanyInfoProps) {
  const updateTradeName = (index: number, value: string) => {
    const updated = [...data.tradeNames]
    updated[index] = value
    updateData({ tradeNames: updated })
  }

  return (
    <div>
      <h2 className="font-serif text-3xl text-valtora-navy mb-2">Company Information</h2>
      <p className="text-gray-600 mb-6">
        Provide final details about your company. You can suggest up to 3 trade names in order of preference.
      </p>

      <div className="space-y-6">
        {/* Trade Names */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Proposed Trade Names (in priority order) <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-3">
            Provide up to 3 company name options. We&apos;ll check availability and reserve your preferred available name.
          </p>
          <div className="space-y-3">
            {[0, 1, 2].map((index) => (
              <div key={index}>
                <label className="block text-xs text-gray-600 mb-1">
                  Option {index + 1} {index === 0 && '(Preferred)'}
                </label>
                <input
                  type="text"
                  value={data.tradeNames[index] || ''}
                  onChange={(e) => updateTradeName(index, e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emirati-gold focus:border-emirati-gold outline-none"
                  placeholder={`Company name option ${index + 1}`}
                  required={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Business Activity Description */}
        <div>
          <label htmlFor="businessActivity" className="block text-sm font-medium text-gray-700 mb-2">
            Business Activity Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="businessActivity"
            value={data.businessActivityDescription}
            onChange={(e) => updateData({ businessActivityDescription: e.target.value })}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emirati-gold focus:border-emirati-gold outline-none"
            placeholder="Describe your business activities in detail..."
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            This will be used for your trade licence application. Be as specific as possible.
          </p>
        </div>

        {/* Office Preference */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Office Preference <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { value: 'no_office', label: 'No Office', description: 'Virtual office or no physical space needed' },
              { value: 'flexi_desk', label: 'Flexi Desk', description: 'Shared workspace with flexible access' },
              { value: 'dedicated_office', label: 'Dedicated Office', description: 'Private office space' },
              { value: 'warehouse', label: 'Warehouse', description: 'Storage or industrial space required' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateData({ officePreference: option.value as typeof data.officePreference })}
                className={`p-4 text-left border-2 rounded-lg transition-all ${
                  data.officePreference === option.value
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

        {/* Visa Confirmation */}
        <div className="p-4 bg-pearl-white border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-valtora-navy mb-3">Visa Requirements</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-700">Total Visas Required: </span>
              <span className="font-medium">{data.visasRequired}</span>
            </div>
            {enquiryData && enquiryData.visas.length > 0 && (
              <div className="mt-2">
                <p className="text-gray-700 mb-2">Visa Roles:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {enquiryData.visas.map((visa, index) => (
                    <li key={index} className="capitalize">{visa.role.replace('_', ' ')}</li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-3">
              This information is based on your calculator input. If you need to make changes, please contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

