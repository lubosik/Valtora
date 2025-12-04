'use client'

import { useState } from 'react'
import type {
  Enquiry,
  BusinessCategory,
  Priority,
  JurisdictionPreference,
  WorkLocation,
  Shareholder,
  VisaRequest,
  VisaRole,
  SpecialActivityFlags,
} from '@/domain/formation/decisionEngine/types'
import CalculatorStep1Business from './calculator/CalculatorStep1Business'
import CalculatorStep2Shareholders from './calculator/CalculatorStep2Shareholders'
import CalculatorStep3Visas from './calculator/CalculatorStep3Visas'
import CalculatorStep4Priorities from './calculator/CalculatorStep4Priorities'
import CalculatorStep5SpecialActivities from './calculator/CalculatorStep5SpecialActivities'
import CalculatorStep6Review from './calculator/CalculatorStep6Review'

interface CalculatorProps {
  onComplete: (enquiry: Enquiry) => void
}

const TOTAL_STEPS = 6

export default function Calculator({ onComplete }: CalculatorProps) {
  const [currentStep, setCurrentStep] = useState(1)

  // Enquiry state - building up the full object
  const [businessCategory, setBusinessCategory] = useState<BusinessCategory | ''>('')
  const [businessModelDescription, setBusinessModelDescription] = useState('')
  const [expressPreference, setExpressPreference] = useState<'standard' | 'express'>('standard')
  
  const [numShareholders, setNumShareholders] = useState(1)
  const [shareholders, setShareholders] = useState<Shareholder[]>([])
  
  const [totalVisasRequested, setTotalVisasRequested] = useState(0)
  const [visas, setVisas] = useState<VisaRequest[]>([])
  
  const [primaryPriority, setPrimaryPriority] = useState<Priority | ''>('')
  const [jurisdictionPreference, setJurisdictionPreference] = useState<JurisdictionPreference | ''>('')
  const [workLocation, setWorkLocation] = useState<WorkLocation | ''>('')
  
  const [specialActivityFlags, setSpecialActivityFlags] = useState<SpecialActivityFlags>({
    commodities: false,
    crypto: false,
    real_estate_brokerage: false,
    financial_services: false,
    industrial_or_manufacturing: false,
  })

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return businessCategory !== '' && businessModelDescription.trim() !== ''
      case 2:
        return shareholders.length === numShareholders && 
               shareholders.every(sh => sh.name && sh.nationality && sh.ownership_percent > 0)
      case 3:
        return totalVisasRequested >= 0 && visas.length === totalVisasRequested
      case 4:
        return primaryPriority !== '' && jurisdictionPreference !== '' && workLocation !== ''
      case 5:
        return true // Special activities are optional
      case 6:
        return true // Review step
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

  const handleSubmit = () => {
    if (!canProceedToNext()) return

    // Build the complete Enquiry object
    const enquiry: Enquiry = {
      enquiry_id: `ENQ-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`.toUpperCase(),
      created_at: new Date().toISOString(),
      priorities: {
        primary: primaryPriority as Priority,
      },
      jurisdiction_preference: jurisdictionPreference as JurisdictionPreference,
      work_location: workLocation as WorkLocation,
      business_category: businessCategory as BusinessCategory,
      business_model_description: businessModelDescription,
      num_shareholders: numShareholders,
      shareholders: shareholders,
      total_visas_requested: totalVisasRequested,
      visas: visas,
      express_preference: expressPreference,
      special_activity_flags: specialActivityFlags,
    }

    onComplete(enquiry)
  }

  const updateShareholder = (index: number, updates: Partial<Shareholder>) => {
    const updated = [...shareholders]
    updated[index] = { ...updated[index], ...updates }
    setShareholders(updated)
  }

  const updateSpecialActivityFlag = (flag: keyof SpecialActivityFlags, value: boolean) => {
    setSpecialActivityFlags(prev => ({ ...prev, [flag]: value }))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200">
      {/* Progress Indicator */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm font-medium text-gray-700">
            Step {currentStep} of {TOTAL_STEPS}
          </span>
          <span className="text-xs sm:text-sm text-gray-500">
            {Math.round((currentStep / TOTAL_STEPS) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-emirati-gold h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[300px] sm:min-h-[400px]">
        {currentStep === 1 && (
          <CalculatorStep1Business
            businessCategory={businessCategory}
            setBusinessCategory={setBusinessCategory}
            businessModelDescription={businessModelDescription}
            setBusinessModelDescription={setBusinessModelDescription}
            expressPreference={expressPreference}
            setExpressPreference={setExpressPreference}
          />
        )}

        {currentStep === 2 && (
          <CalculatorStep2Shareholders
            numShareholders={numShareholders}
            setNumShareholders={setNumShareholders}
            shareholders={shareholders}
            setShareholders={setShareholders}
            updateShareholder={updateShareholder}
          />
        )}

        {currentStep === 3 && (
          <CalculatorStep3Visas
            totalVisasRequested={totalVisasRequested}
            setTotalVisasRequested={setTotalVisasRequested}
            visas={visas}
            setVisas={setVisas}
            shareholders={shareholders}
          />
        )}

        {currentStep === 4 && (
          <CalculatorStep4Priorities
            primaryPriority={primaryPriority}
            setPrimaryPriority={setPrimaryPriority}
            jurisdictionPreference={jurisdictionPreference}
            setJurisdictionPreference={setJurisdictionPreference}
            workLocation={workLocation}
            setWorkLocation={setWorkLocation}
          />
        )}

        {currentStep === 5 && (
          <CalculatorStep5SpecialActivities
            specialActivityFlags={specialActivityFlags}
            updateSpecialActivityFlag={updateSpecialActivityFlag}
          />
        )}

        {currentStep === 6 && (
          <CalculatorStep6Review
            enquiry={{
              business_category: businessCategory as BusinessCategory,
              business_model_description: businessModelDescription,
              express_preference: expressPreference,
              num_shareholders: numShareholders,
              shareholders: shareholders,
              total_visas_requested: totalVisasRequested,
              visas: visas,
              priorities: { primary: primaryPriority as Priority },
              jurisdiction_preference: jurisdictionPreference as JurisdictionPreference,
              work_location: workLocation as WorkLocation,
              special_activity_flags: specialActivityFlags,
            }}
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 mt-6 sm:mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Back
        </button>

        {currentStep < TOTAL_STEPS ? (
          <button
            onClick={handleNext}
            disabled={!canProceedToNext()}
            className="btn-primary px-6 sm:px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canProceedToNext()}
            className="btn-primary px-6 sm:px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
          >
            Get My Quote
          </button>
        )}
      </div>
    </div>
  )
}

