'use client'

import type { SpecialActivityFlags } from '@/domain/formation/decisionEngine/types'

interface CalculatorStep5SpecialActivitiesProps {
  specialActivityFlags: SpecialActivityFlags
  updateSpecialActivityFlag: (flag: keyof SpecialActivityFlags, value: boolean) => void
}

const specialActivities: {
  key: keyof SpecialActivityFlags
  label: string
  description: string
  warning?: string
}[] = [
  {
    key: 'commodities',
    label: 'Commodities Trading',
    description: 'Trading in physical commodities (gold, oil, metals, etc.)',
    warning: 'Requires DMCC or similar commodities authority',
  },
  {
    key: 'crypto',
    label: 'Cryptocurrency / Web3 / Digital Assets',
    description: 'Cryptocurrency trading, blockchain, NFT, DeFi activities',
    warning: 'Requires crypto-friendly free zone like DMCC Crypto Centre',
  },
  {
    key: 'real_estate_brokerage',
    label: 'Real Estate Brokerage (Physical)',
    description: 'Physical real estate brokerage and property sales',
    warning: 'Requires mainland licensing through RERA',
  },
  {
    key: 'financial_services',
    label: 'Financial Services',
    description: 'Banking, insurance, investment advisory, financial consulting',
    warning: 'Requires regulated financial centre (DIFC/ADGM) with additional approvals',
  },
  {
    key: 'industrial_or_manufacturing',
    label: 'Industrial / Manufacturing',
    description: 'Manufacturing, production, industrial activities',
    warning: 'Requires industrial zone with warehouse facilities',
  },
]

export default function CalculatorStep5SpecialActivities({
  specialActivityFlags,
  updateSpecialActivityFlag,
}: CalculatorStep5SpecialActivitiesProps) {
  return (
    <div>
      <h3 className="font-serif text-2xl text-valtora-navy mb-2">Special Activities</h3>
      <p className="text-gray-600 mb-6">
        Select any special activities that apply to your business. These may require specific authorities or additional approvals.
      </p>

      <div className="space-y-4">
        {specialActivities.map((activity) => (
          <div
            key={activity.key}
            className={`border-2 rounded-lg p-4 transition-all ${
              specialActivityFlags[activity.key]
                ? 'border-emirati-gold bg-emirati-gold/10'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={specialActivityFlags[activity.key]}
                onChange={(e) => updateSpecialActivityFlag(activity.key, e.target.checked)}
                className="mt-1 w-5 h-5 text-emirati-gold border-gray-300 rounded focus:ring-emirati-gold"
              />
              <div className="flex-1">
                <div className="font-semibold text-valtora-navy mb-1">
                  {activity.label}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {activity.description}
                </div>
                {activity.warning && (
                  <div className="text-xs text-oasis-blue bg-oasis-blue/10 px-3 py-2 rounded mt-2">
                    ⓘ {activity.warning}
                  </div>
                )}
              </div>
            </label>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-pearl-white border border-gray-200 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> If none of these apply to your business, you can proceed to the next step. 
          Special activities may affect which authorities are available and may require additional approvals or fees.
        </p>
      </div>
    </div>
  )
}

