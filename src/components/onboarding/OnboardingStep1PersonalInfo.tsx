'use client'

import type { Enquiry } from '@/domain/formation/decisionEngine/types'

interface PersonalInfoData {
  fullName: string
  phone: string
  email: string
  nationality: string
  currentCountry: string
  dateOfBirth: string
}

interface OnboardingStep1PersonalInfoProps {
  data: PersonalInfoData
  updateData: (updates: Partial<PersonalInfoData>) => void
  enquiryData: Enquiry | null
}

const commonCountries = [
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

export default function OnboardingStep1PersonalInfo({
  data,
  updateData,
  enquiryData,
}: OnboardingStep1PersonalInfoProps) {
  return (
    <div>
      <h2 className="font-serif text-3xl text-valtora-navy mb-2">Personal Information</h2>
      <p className="text-gray-600 mb-6">
        Please provide your personal details. This information will be used for your company formation application.
      </p>

      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            value={data.fullName}
            onChange={(e) => updateData({ fullName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emirati-gold focus:border-emirati-gold outline-none"
            placeholder="John Doe"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emirati-gold focus:border-emirati-gold outline-none"
            placeholder="+1 812 551 3945"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Include country code. This number will be verified via SMS.
          </p>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emirati-gold focus:border-emirati-gold outline-none"
            placeholder="john.doe@example.com"
            required
          />
        </div>

        {/* Nationality */}
        <div>
          <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-2">
            Nationality <span className="text-red-500">*</span>
          </label>
          <select
            id="nationality"
            value={data.nationality}
            onChange={(e) => updateData({ nationality: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emirati-gold focus:border-emirati-gold outline-none"
            required
          >
            <option value="">Select nationality</option>
            {commonCountries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Current Country of Residence */}
        <div>
          <label htmlFor="currentCountry" className="block text-sm font-medium text-gray-700 mb-2">
            Current Country of Residence <span className="text-red-500">*</span>
          </label>
          <select
            id="currentCountry"
            value={data.currentCountry}
            onChange={(e) => updateData({ currentCountry: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emirati-gold focus:border-emirati-gold outline-none"
            required
          >
            <option value="">Select country</option>
            {commonCountries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="dateOfBirth"
            value={data.dateOfBirth}
            onChange={(e) => updateData({ dateOfBirth: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emirati-gold focus:border-emirati-gold outline-none"
            required
          />
        </div>
      </div>
    </div>
  )
}

