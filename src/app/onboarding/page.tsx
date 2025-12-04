'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import OnboardingStep1PersonalInfo from '@/components/onboarding/OnboardingStep1PersonalInfo'
import OnboardingStep2Documents from '@/components/onboarding/OnboardingStep2Documents'
import OnboardingStep3CompanyInfo from '@/components/onboarding/OnboardingStep3CompanyInfo'
import OnboardingStep4PhoneVerification from '@/components/onboarding/OnboardingStep4PhoneVerification'
import OnboardingStep5DigitalSignature from '@/components/onboarding/OnboardingStep5DigitalSignature'
import OnboardingStep6Success from '@/components/onboarding/OnboardingStep6Success'
import type { Enquiry, Shareholder } from '@/domain/formation/decisionEngine/types'

interface OnboardingData {
  // Personal Information
  fullName: string
  phone: string
  email: string
  nationality: string
  currentCountry: string
  dateOfBirth: string

  // Documents
  passportFile: File | null
  uaeEntryStampFile: File | null
  passportPhotoFile: File | null
  proofOfAddressFile: File | null

  // Company Information
  tradeNames: string[] // Up to 3 in priority order
  businessActivityDescription: string
  officePreference: 'no_office' | 'flexi_desk' | 'dedicated_office' | 'warehouse'
  visasRequired: number
  visaRoles: string[]

  // Phone Verification
  phoneVerified: boolean
  otpCode: string

  // Digital Signatures
  customerServiceAgreementSigned: boolean
  kycFormSigned: boolean
  powerOfAttorneySigned: boolean
  signatureName: string
  signatureDate: string
}

const TOTAL_STEPS = 6

export default function OnboardingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [enquiryId, setEnquiryId] = useState<string | null>(null)
  const [enquiryData, setEnquiryData] = useState<Enquiry | null>(null)
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    fullName: '',
    phone: '',
    email: '',
    nationality: '',
    currentCountry: '',
    dateOfBirth: '',
    passportFile: null,
    uaeEntryStampFile: null,
    passportPhotoFile: null,
    proofOfAddressFile: null,
    tradeNames: ['', '', ''],
    businessActivityDescription: '',
    officePreference: 'no_office',
    visasRequired: 0,
    visaRoles: [],
    phoneVerified: false,
    otpCode: '',
    customerServiceAgreementSigned: false,
    kycFormSigned: false,
    powerOfAttorneySigned: false,
    signatureName: '',
    signatureDate: '',
  })

  useEffect(() => {
    const paymentIntentId = searchParams.get('payment_intent')
    const enquiryIdParam = searchParams.get('enquiry_id')

    if (!paymentIntentId) {
      // No payment intent, redirect to home
      router.push('/')
      return
    }

    if (enquiryIdParam) {
      setEnquiryId(enquiryIdParam)
      
      // Try to load enquiry data from sessionStorage
      const quoteData = sessionStorage.getItem('quoteData')
      if (quoteData) {
        try {
          // We need the original enquiry, not the DecisionResult
          // For now, we'll reconstruct from what we have
          // In production, you'd fetch this from your backend
          const enquiryFromStorage = sessionStorage.getItem('enquiryData')
          if (enquiryFromStorage) {
            const enquiry: Enquiry = JSON.parse(enquiryFromStorage)
            setEnquiryData(enquiry)
            
            // Pre-fill data from enquiry
            if (enquiry.shareholders.length > 0) {
              const primaryShareholder = enquiry.shareholders[0]
              setOnboardingData(prev => ({
                ...prev,
                fullName: primaryShareholder.name,
                nationality: primaryShareholder.nationality,
                visasRequired: enquiry.total_visas_requested,
                businessActivityDescription: enquiry.business_model_description,
              }))
            }
          }
        } catch (err) {
          console.error('Error loading enquiry data:', err)
        }
      }
    }
  }, [searchParams, router])

  const updateOnboardingData = (updates: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...updates }))
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return (
          onboardingData.fullName.trim() !== '' &&
          onboardingData.phone.trim() !== '' &&
          onboardingData.email.trim() !== '' &&
          onboardingData.nationality !== '' &&
          onboardingData.currentCountry !== '' &&
          onboardingData.dateOfBirth !== ''
        )
      case 2:
        return (
          onboardingData.passportFile !== null &&
          onboardingData.passportPhotoFile !== null &&
          onboardingData.proofOfAddressFile !== null
        )
      case 3:
        return (
          onboardingData.tradeNames[0].trim() !== '' &&
          onboardingData.businessActivityDescription.trim() !== ''
        )
      case 4:
        return onboardingData.phoneVerified
      case 5:
        return (
          onboardingData.customerServiceAgreementSigned &&
          onboardingData.kycFormSigned &&
          onboardingData.signatureName.trim() !== ''
        )
      case 6:
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (canProceedToNext() && currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    // Submit all onboarding data
    try {
      const response = await fetch('/api/onboarding/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          enquiry_id: enquiryId,
          onboarding_data: onboardingData,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit onboarding data')
      }

      // Track onboarding completion
      if (enquiryId) {
        const { trackOnboardingComplete } = await import('@/lib/analytics')
        trackOnboardingComplete(enquiryId)
      }

      // Move to success step
      setCurrentStep(6)
    } catch (error) {
      console.error('Error submitting onboarding:', error)
      alert('There was an error submitting your information. Please try again or contact support.')
    }
  }

  if (!enquiryId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pearl-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-emirati-gold border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading onboarding...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-pearl-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          {currentStep < TOTAL_STEPS && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Step {currentStep} of {TOTAL_STEPS - 1}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round((currentStep / (TOTAL_STEPS - 1)) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-emirati-gold h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / (TOTAL_STEPS - 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Step Content */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border border-gray-200">
            {currentStep === 1 && (
              <OnboardingStep1PersonalInfo
                data={onboardingData}
                updateData={updateOnboardingData}
                enquiryData={enquiryData}
              />
            )}

            {currentStep === 2 && (
              <OnboardingStep2Documents
                data={onboardingData}
                updateData={updateOnboardingData}
              />
            )}

            {currentStep === 3 && (
              <OnboardingStep3CompanyInfo
                data={onboardingData}
                updateData={updateOnboardingData}
                enquiryData={enquiryData}
              />
            )}

            {currentStep === 4 && (
              <OnboardingStep4PhoneVerification
                data={onboardingData}
                updateData={updateOnboardingData}
                phone={onboardingData.phone}
              />
            )}

            {currentStep === 5 && (
              <OnboardingStep5DigitalSignature
                data={onboardingData}
                updateData={updateOnboardingData}
                onSubmit={handleSubmit}
              />
            )}

            {currentStep === 6 && (
              <OnboardingStep6Success enquiryId={enquiryId} />
            )}
          </div>

          {/* Navigation Buttons */}
          {currentStep < TOTAL_STEPS && (
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Back
              </button>

              {currentStep < TOTAL_STEPS - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={!canProceedToNext()}
                  className="btn-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceedToNext()}
                  className="btn-primary px-8 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit & Complete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
