'use client'

import { useState, useEffect, useRef } from 'react'
import WhatsAppLink from './WhatsAppLink'
import { submitToWeb3Forms, validateWeb3FormsConfig } from '@/lib/web3forms'
import { submitToMakeWebhook } from '@/lib/make-webhook'

type FormVariant = 'hero' | 'popup' | 'inline'

interface LeadCaptureFormProps {
  variant?: FormVariant
  onSuccess?: () => void
  onError?: (error: string) => void
}

interface FormData {
  businessActivity: string
  visasRequired: string
  officeSpace: string
  shareholders: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

// Business activity options - comprehensive list matching competitor
const BUSINESS_ACTIVITIES = [
  'General Trading',
  'IT Trading',
  'E-commerce',
  'Food Trading',
  'Business Consultancy',
  'IT Consultancy',
  'Automobile Trading',
  'Technical Service',
  'Textile Trading',
  'Digital Marketing',
  'Salon',
  'Event Management',
  'Advertising',
  'Perfume & Cosmetics Trading',
  'Raw Materials Trading',
  'Jewellery Trading',
  'Educational Support Activities',
  'Engineering Consultancy',
  'Tourism & Recreation',
  'Creative Arts & Entertainment Activities',
  'Accounting & Auditing',
  'Real Estate',
  'Restaurant, Cafe, Cloud Kitchen',
  'Investment Consultancy',
  'Management Consultancy',
  'Retail Outlet/Shop',
  'Holding Company',
  'HR Consultancy',
  'Project Management',
  'Cleaning Service',
  'Maintenance',
  'Interior Design Consultancy',
  'Technical Consultancy',
  'Software Publishing',
  'Logistics Consultancy',
  'Sports Management',
  'Photography',
  'Aviation Consultancy',
  'Hospitality Management',
  'Legal Consultancy',
  'Videography',
  'PR',
  'Delivery Service',
  'Media',
  'Healthcare Services',
  'Financial Services',
  'Construction',
  'Manufacturing',
  'Import/Export',
  'Wholesale Trading',
]

export default function LeadCaptureForm({
  variant = 'hero',
  onSuccess,
  onError,
}: LeadCaptureFormProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1)
  const [formData, setFormData] = useState<FormData>({
    businessActivity: '',
    visasRequired: '0',
    officeSpace: '',
    shareholders: '1',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('')
  const [utmParams, setUtmParams] = useState<UTMParams>({})
  const [businessActivitySearch, setBusinessActivitySearch] = useState('')
  const [filteredActivities, setFilteredActivities] = useState<string[]>(BUSINESS_ACTIVITIES)
  const [showActivityDropdown, setShowActivityDropdown] = useState(false)
  const activityInputRef = useRef<HTMLInputElement>(null)
  const activityDropdownRef = useRef<HTMLDivElement>(null)

  // Capture UTM parameters on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    const urlParams = new URLSearchParams(window.location.search)
    const utm: UTMParams = {}
    
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    utmKeys.forEach((key) => {
      const value = urlParams.get(key)
      if (value) {
        utm[key as keyof UTMParams] = value
      }
    })

    if (Object.keys(utm).length > 0) {
      localStorage.setItem('valtora_utm_params', JSON.stringify(utm))
      setUtmParams(utm)
    } else {
      const stored = localStorage.getItem('valtora_utm_params')
      if (stored) {
        try {
          setUtmParams(JSON.parse(stored))
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
  }, [])

  // Filter business activities based on search
  useEffect(() => {
    if (!businessActivitySearch.trim()) {
      setFilteredActivities(BUSINESS_ACTIVITIES)
    } else {
      const filtered = BUSINESS_ACTIVITIES.filter((activity) =>
        activity.toLowerCase().includes(businessActivitySearch.toLowerCase())
      )
      setFilteredActivities(filtered)
    }
  }, [businessActivitySearch])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activityDropdownRef.current &&
        !activityDropdownRef.current.contains(event.target as Node) &&
        activityInputRef.current &&
        !activityInputRef.current.contains(event.target as Node)
      ) {
        setShowActivityDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError(null)
  }

  const handleBusinessActivitySelect = (activity: string) => {
    setFormData((prev) => ({ ...prev, businessActivity: activity }))
    setBusinessActivitySearch(activity)
    setShowActivityDropdown(false)
    if (error) setError(null)
  }

  const validateStep1 = (): boolean => {
    if (!formData.businessActivity.trim()) {
      setError('Please select a business activity')
      return false
    }
    return true
  }

  const validateStep2 = (): boolean => {
    if (!formData.firstName.trim()) {
      setError('Please enter your first name')
      return false
    }
    if (!formData.lastName.trim()) {
      setError('Please enter your last name')
      return false
    }
    if (!formData.email.trim()) {
      setError('Please enter your email address')
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }
    if (!formData.phone.trim()) {
      setError('Please enter your phone number')
      return false
    }
    return true
  }

  const handleNext = () => {
    setError(null)
    if (validateStep1()) {
      setCurrentStep(2)
      // Scroll form into view on mobile
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        setTimeout(() => {
          activityInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 100)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Honeypot check
    if (honeypot) {
      return
    }

    if (!validateStep2()) {
      return
    }

    // Sanity check: Validate Web3Forms config
    const configCheck = validateWeb3FormsConfig()
    if (!configCheck.valid) {
      setError(configCheck.error || 'Form submission is temporarily unavailable. Please contact us via WhatsApp instead.')
      return
    }

    setIsSubmitting(true)

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
      if (!accessKey) {
        throw new Error(
          'Form submission is temporarily unavailable. Please contact us via WhatsApp instead.'
        )
      }

      // Prepare submission data
      const submissionData = {
        access_key: accessKey,
        subject: `New Valtora Lead – Company Setup Quote Request`,
        from_name: `${formData.firstName} ${formData.lastName}`.trim() || 'Valtora Website Visitor',
        // Form fields
        'Business Activity': formData.businessActivity,
        'Visas Required': formData.visasRequired,
        'Office Space Required': formData.officeSpace || 'Not specified',
        'Shareholders': formData.shareholders,
        'First Name': formData.firstName,
        'Last Name': formData.lastName,
        'Full Name': `${formData.firstName} ${formData.lastName}`.trim(),
        'Email': formData.email,
        'Phone': formData.phone,
        // Metadata
        'Page URL': typeof window !== 'undefined' ? window.location.href : '',
        'Submitted At': new Date().toISOString(),
        'Form Variant': variant,
        // UTM parameters (if present)
        ...(Object.keys(utmParams).length > 0 && {
          'UTM Source': utmParams.utm_source || '',
          'UTM Medium': utmParams.utm_medium || '',
          'UTM Campaign': utmParams.utm_campaign || '',
          'UTM Term': utmParams.utm_term || '',
          'UTM Content': utmParams.utm_content || '',
        }),
      }

      // Submit to both Web3Forms and Make.com webhook in parallel
      // Both should succeed, but we don't fail the form if one fails
      const [web3FormsResult, makeWebhookResult] = await Promise.allSettled([
        submitToWeb3Forms(submissionData),
        submitToMakeWebhook({
          businessActivity: formData.businessActivity,
          visasRequired: formData.visasRequired,
          officeSpace: formData.officeSpace || 'Not specified',
          shareholders: formData.shareholders,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          fullName: `${formData.firstName} ${formData.lastName}`.trim(),
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
          submittedAt: new Date().toISOString(),
          formVariant: variant,
          ...(utmParams.utm_source && { utmSource: utmParams.utm_source }),
          ...(utmParams.utm_medium && { utmMedium: utmParams.utm_medium }),
          ...(utmParams.utm_campaign && { utmCampaign: utmParams.utm_campaign }),
          ...(utmParams.utm_term && { utmTerm: utmParams.utm_term }),
          ...(utmParams.utm_content && { utmContent: utmParams.utm_content }),
        }),
      ])

      // Check Web3Forms result (this is the primary submission)
      if (web3FormsResult.status === 'rejected' || (web3FormsResult.status === 'fulfilled' && !web3FormsResult.value.success)) {
        const error = web3FormsResult.status === 'rejected'
          ? web3FormsResult.reason?.message || 'Submission failed'
          : web3FormsResult.value.error || 'Submission failed'
        throw new Error(error)
      }

      // Log Make.com webhook result (but don't fail if it fails)
      if (process.env.NODE_ENV === 'development') {
        if (makeWebhookResult.status === 'rejected') {
          console.warn('[Make Webhook] Submission failed (non-blocking):', makeWebhookResult.reason)
        } else if (!makeWebhookResult.value.success) {
          console.warn('[Make Webhook] Submission failed (non-blocking):', makeWebhookResult.value.error)
        } else {
          console.log('[Make Webhook] Submission successful')
        }
      }

      // Success - both submissions attempted (Web3Forms succeeded, Make.com may have succeeded or failed gracefully)
      setIsSubmitted(true)
      setIsSubmitting(false)

      // Track success (if analytics available)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        ;(window as any).gtag('event', 'form_submission', {
          event_category: 'lead_capture',
          event_label: variant,
        })
      }

      onSuccess?.()
    } catch (err) {
      let errorMessage = 'An error occurred. Please try again or contact us via WhatsApp.'
      
      if (err instanceof Error) {
        if (err.message.includes('timeout') || err.message.includes('Network')) {
          errorMessage = 'Connection timeout. Please check your internet connection and try again, or contact us via WhatsApp.'
        } else if (err.message.includes('Web3Forms') || err.message.includes('configuration')) {
          errorMessage = 'Form configuration error. Please contact us via WhatsApp for immediate assistance.'
        } else {
          errorMessage = err.message
        }
      }
      
      setError(errorMessage)
      setIsSubmitting(false)
      onError?.(errorMessage)
    }
  }

  // Success state
  if (isSubmitted) {
    return (
      <div className={`${variant === 'popup' ? 'p-6' : 'p-6 md:p-8'} bg-white rounded-lg`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-emirati-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-emirati-gold"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="font-serif text-2xl text-valtora-navy mb-2">
            Received. A Valtora advisor will reach out shortly.
          </h3>
          <p className="text-gray-700 mb-6">
            We'll reply within 1 business hour with personalized setup options.
          </p>
          <WhatsAppLink
            href="https://wa.me/18125513945?text=Hi%20Valtora%2C%20I%27d%20like%20to%20discuss%20company%20formation%20in%20Dubai."
            className="btn-primary inline-block px-6 py-3"
            location={`form_success_${variant}`}
          >
            Chat on WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    )
  }

  // Form layout based on variant
  const containerClass = variant === 'popup' 
    ? 'bg-transparent' // Popup already has white background
    : variant === 'inline'
    ? 'bg-white rounded-lg shadow-lg p-6 md:p-8'
    : 'bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-6 md:p-8 border border-gray-200'

  return (
    <form onSubmit={handleSubmit} className={containerClass}>
      {/* Honeypot field */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute opacity-0 pointer-events-none h-0 w-0"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Step Indicator */}
      <div className="mb-6 flex items-center justify-center gap-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
          currentStep >= 1 ? 'bg-emirati-gold text-carbon-black' : 'bg-gray-200 text-gray-500'
        }`}>
          1
        </div>
        <div className={`h-1 w-12 ${
          currentStep >= 2 ? 'bg-emirati-gold' : 'bg-gray-200'
        }`} />
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
          currentStep >= 2 ? 'bg-emirati-gold text-carbon-black' : 'bg-gray-200 text-gray-500'
        }`}>
          2
        </div>
      </div>

      <div className="space-y-4">
        {currentStep === 1 ? (
          <>
            {/* Step 1: Business Questions */}
            <h3 className="font-serif text-xl text-valtora-navy mb-4">Tell us about your business</h3>

            {/* Business Activity - Searchable */}
            <div className="relative">
              <label htmlFor="businessActivity" className="block text-sm font-medium text-gray-700 mb-2">
                Which Business activity are you looking for? <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  ref={activityInputRef}
                  type="text"
                  id="businessActivity"
                  value={businessActivitySearch}
                  onChange={(e) => {
                    setBusinessActivitySearch(e.target.value)
                    setShowActivityDropdown(true)
                    if (e.target.value !== formData.businessActivity) {
                      setFormData((prev) => ({ ...prev, businessActivity: '' }))
                    }
                  }}
                  onFocus={() => setShowActivityDropdown(true)}
                  placeholder="Select Business Activity"
                  className="input-primary"
                  required
                  autoComplete="off"
                />
                {showActivityDropdown && filteredActivities.length > 0 && (
                  <div
                    ref={activityDropdownRef}
                    className="absolute z-50 w-full mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                  >
                    {filteredActivities.map((activity) => (
                      <button
                        key={activity}
                        type="button"
                        onClick={() => handleBusinessActivitySelect(activity)}
                        className={`w-full text-left px-4 py-3 hover:bg-emirati-gold/10 transition-colors text-valtora-navy font-medium ${
                          formData.businessActivity === activity ? 'bg-emirati-gold/20 font-semibold text-valtora-navy' : ''
                        }`}
                      >
                        {activity}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Visas Required */}
            <div>
              <label htmlFor="visasRequired" className="block text-sm font-medium text-gray-700 mb-2">
                How many visas required?
              </label>
              <input
                type="number"
                id="visasRequired"
                min="0"
                max="20"
                value={formData.visasRequired}
                onChange={(e) => handleChange('visasRequired', e.target.value)}
                className="input-primary"
              />
            </div>

            {/* Office Space */}
            <div>
              <label htmlFor="officeSpace" className="block text-sm font-medium text-gray-700 mb-2">
                Do you require office space?
              </label>
              <select
                id="officeSpace"
                value={formData.officeSpace}
                onChange={(e) => handleChange('officeSpace', e.target.value)}
                className="input-primary"
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Shareholders */}
            <div>
              <label htmlFor="shareholders" className="block text-sm font-medium text-gray-700 mb-2">
                How many shareholders will be involved?
              </label>
              <input
                type="number"
                id="shareholders"
                min="1"
                max="50"
                value={formData.shareholders}
                onChange={(e) => handleChange('shareholders', e.target.value)}
                className="input-primary"
              />
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              className="btn-primary w-full py-3 text-lg font-semibold mt-6"
            >
              Next
            </button>
          </>
        ) : (
          <>
            {/* Step 2: Contact Details */}
            <h3 className="font-serif text-xl text-valtora-navy mb-4">Contact Details</h3>

            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className="input-primary"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className="input-primary"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="input-primary"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone / WhatsApp number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="input-primary"
                placeholder="+971 50 123 4567"
                required
              />
            </div>

            {/* Back Button */}
            <button
              type="button"
              onClick={() => {
                setCurrentStep(1)
                setError(null)
              }}
              className="w-full py-2 text-gray-600 hover:text-valtora-navy transition-colors text-sm font-medium"
            >
              ← Back
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Get A Quote Today'}
            </button>
          </>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
            <div className="mt-2">
              <WhatsAppLink
                href="https://wa.me/18125513945?text=Hi%20Valtora%2C%20I%27d%20like%20to%20discuss%20company%20formation%20in%20Dubai."
                className="text-sm underline hover:no-underline"
                location={`form_error_${variant}`}
              >
                Contact us on WhatsApp instead
              </WhatsAppLink>
            </div>
          </div>
        )}

        {/* Privacy Microcopy */}
        <p className="text-xs text-gray-500 text-center">
          We'll reply within 1 business hour. No spam. No hidden fees.
        </p>
      </div>
    </form>
  )
}
