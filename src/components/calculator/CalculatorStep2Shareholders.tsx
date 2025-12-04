'use client'

import { useEffect } from 'react'
import type { Shareholder, VisaRole } from '@/domain/formation/decisionEngine/types'

interface CalculatorStep2ShareholdersProps {
  numShareholders: number
  setNumShareholders: (num: number) => void
  shareholders: Shareholder[]
  setShareholders: (shareholders: Shareholder[]) => void
  updateShareholder: (index: number, updates: Partial<Shareholder>) => void
}

const visaRoles: { value: VisaRole; label: string }[] = [
  { value: 'investor', label: 'Investor' },
  { value: 'director', label: 'Director' },
  { value: 'manager', label: 'Manager' },
  { value: 'sales', label: 'Sales' },
  { value: 'technician', label: 'Technician' },
  { value: 'employee', label: 'Employee' },
  { value: 'dependent', label: 'Dependent' },
]

// Common nationalities - can be expanded
const commonNationalities = [
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
  { code: 'IN', name: 'India' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'PH', name: 'Philippines' },
  { code: 'EG', name: 'Egypt' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'AU', name: 'Australia' },
  { code: 'CA', name: 'Canada' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'AE', name: 'United Arab Emirates' },
]

export default function CalculatorStep2Shareholders({
  numShareholders,
  setNumShareholders,
  shareholders,
  setShareholders,
  updateShareholder,
}: CalculatorStep2ShareholdersProps) {
  // Initialize shareholders array when numShareholders changes
  useEffect(() => {
    if (shareholders.length < numShareholders) {
      const newShareholders = [...shareholders]
      for (let i = shareholders.length; i < numShareholders; i++) {
        newShareholders.push({
          id: `sh-${Date.now()}-${i}`,
          name: '',
          nationality: '',
          ownership_percent: 0,
          has_visited_uae: false,
          requires_visa: false,
        })
      }
      setShareholders(newShareholders)
    } else if (shareholders.length > numShareholders) {
      setShareholders(shareholders.slice(0, numShareholders))
    }
  }, [numShareholders, shareholders, setShareholders])

  const handleShareholderChange = (index: number, field: keyof Shareholder, value: any) => {
    updateShareholder(index, { [field]: value })
  }

  const calculateRemainingOwnership = () => {
    const total = shareholders.reduce((sum, sh) => sum + (sh.ownership_percent || 0), 0)
    return Math.max(0, 100 - total)
  }

  return (
    <div>
      <h3 className="font-serif text-2xl sm:text-3xl text-valtora-navy mb-2">Shareholders</h3>
      <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
        Tell us about the shareholders who will own the company.
      </p>

      {/* Number of Shareholders */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Number of Shareholders <span className="text-red-500">*</span>
        </label>
        <select
          value={numShareholders}
          onChange={(e) => setNumShareholders(parseInt(e.target.value))}
          className="w-full md:w-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emirati-gold focus:border-emirati-gold outline-none"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? 'Shareholder' : 'Shareholders'}
            </option>
          ))}
        </select>
      </div>

      {/* Shareholder Details */}
      <div className="space-y-6">
        {shareholders.map((shareholder, index) => (
            <div key={shareholder.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 bg-pearl-white">
              <h4 className="font-semibold text-valtora-navy mb-4 text-base sm:text-lg">
                Shareholder {index + 1}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={shareholder.name}
                  onChange={(e) => handleShareholderChange(index, 'name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emirati-gold focus:border-emirati-gold outline-none"
                  placeholder="John Doe"
                />
              </div>

              {/* Nationality */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nationality <span className="text-red-500">*</span>
                </label>
                <select
                  value={shareholder.nationality}
                  onChange={(e) => handleShareholderChange(index, 'nationality', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emirati-gold focus:border-emirati-gold outline-none"
                >
                  <option value="">Select nationality</option>
                  {commonNationalities.map((nat) => (
                    <option key={nat.code} value={nat.code}>
                      {nat.name}
                    </option>
                  ))}
                  <option value="OTHER">Other (specify in description)</option>
                </select>
              </div>

              {/* Ownership Percentage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ownership Percentage <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={shareholder.ownership_percent || ''}
                    onChange={(e) =>
                      handleShareholderChange(index, 'ownership_percent', parseFloat(e.target.value) || 0)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emirati-gold focus:border-emirati-gold outline-none"
                    placeholder="50"
                  />
                  <span className="text-gray-600">%</span>
                </div>
                {calculateRemainingOwnership() > 0 && index === shareholders.length - 1 && (
                  <p className="text-xs text-gray-500 mt-1">
                    {calculateRemainingOwnership()}% remaining
                  </p>
                )}
              </div>

              {/* UAE Visit Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Has this person visited the UAE? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={shareholder.has_visited_uae === true}
                      onChange={() => handleShareholderChange(index, 'has_visited_uae', true)}
                      className="mr-2"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={shareholder.has_visited_uae === false}
                      onChange={() => handleShareholderChange(index, 'has_visited_uae', false)}
                      className="mr-2"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {/* UID Status (if visited UAE) */}
              {shareholder.has_visited_uae && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Do they have a UID (Unified ID)? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={shareholder.has_uid === true}
                        onChange={() => handleShareholderChange(index, 'has_uid', true)}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={shareholder.has_uid === false}
                        onChange={() => handleShareholderChange(index, 'has_uid', false)}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Visa Requirement */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Does this person need a visa? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={shareholder.requires_visa === true}
                      onChange={() => {
                        handleShareholderChange(index, 'requires_visa', true)
                        if (!shareholder.visa_role) {
                          handleShareholderChange(index, 'visa_role', 'director')
                        }
                      }}
                      className="mr-2"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={shareholder.requires_visa === false}
                      onChange={() => {
                        handleShareholderChange(index, 'requires_visa', false)
                        handleShareholderChange(index, 'visa_role', undefined)
                      }}
                      className="mr-2"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {/* Visa Role (if requires visa) */}
              {shareholder.requires_visa && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visa Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={shareholder.visa_role || ''}
                    onChange={(e) =>
                      handleShareholderChange(index, 'visa_role', e.target.value as VisaRole)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emirati-gold focus:border-emirati-gold outline-none"
                  >
                    <option value="">Select role</option>
                    {visaRoles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

