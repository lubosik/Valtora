'use client'

import { useState, useEffect } from 'react'
import WhatsAppLink from './WhatsAppLink'

type FormVariant = 'hero' | 'popup' | 'inline'

interface LeadCaptureFormProps {
  variant?: FormVariant
  onSuccess?: () => void
  onError?: (error: string) => void
}

interface FormData {
  setupType: string
  businessActivity: string
  businessActivityOther: string
  visasNeeded: string
  priority: string
  fullName: string
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

export default function LeadCaptureForm({
  variant = 'hero',
  onSuccess,
  onError,
}: LeadCaptureFormProps) {
  const [formData, setFormData] = useState<FormData>({
    setupType: '',
    businessActivity: '',
    businessActivityOther: '',
    visasNeeded: '0',
    priority: '',
    fullName: '',
    email: '',
    phone: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('')
  const [utmParams, setUtmParams] = useState<UTMParams>({})

  // Capture UTM parameters on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Get UTM params from URL
    const urlParams = new URLSearchParams(window.location.search)
    const utm: UTMParams = {}
    
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    utmKeys.forEach((key) => {
      const value = urlParams.get(key)
      if (value) {
        utm[key as keyof UTMParams] = value
      }
    })

    // If UTM params exist, store them
    if (Object.keys(utm).length > 0) {
      localStorage.setItem('valtora_utm_params', JSON.stringify(utm))
      setUtmParams(utm)
    } else {
      // Otherwise, try to get from localStorage
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

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (error) setError(null)
  }

  const validateForm = (): boolean => {
    if (!formData.setupType) {
      setError('Please select what you want to set up')
      return false
    }
    if (!formData.fullName.trim()) {
      setError('Please enter your full name')
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
    // If "Other" business activity is selected, require description
    if (formData.businessActivity === 'Other' && !formData.businessActivityOther.trim()) {
      setError('Please describe your business activity')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Honeypot check - if filled, silently discard
    if (honeypot) {
      return
    }

    if (!validateForm()) {
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

      // Prepare submission data with proper formatting
      const submissionData = {
        access_key: accessKey,
        subject: `New Lead: ${formData.setupType} Setup Request - Valtora`,
        from_name: 'Valtora Website Form',
        // Form fields - clearly labeled for email readability
        'Setup Type': formData.setupType,
        'Business Activity': formData.businessActivity === 'Other' 
          ? `Other: ${formData.businessActivityOther}` 
          : formData.businessActivity,
        'Visas Needed': formData.visasNeeded,
        'Priority': formData.priority || 'Not specified',
        'Full Name': formData.fullName,
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

      // Create AbortController for timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

      let response: Response
      try {
        response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData),
          signal: controller.signal,
        })
      } catch (fetchError) {
        clearTimeout(timeoutId)
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          throw new Error('Request timed out. Please check your connection and try again.')
        }
        throw new Error('Network error. Please check your connection and try again.')
      } finally {
        clearTimeout(timeoutId)
      }

      // Handle non-JSON responses
      let result: any
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        result = await response.json()
      } else {
        const text = await response.text()
        throw new Error(
          response.ok 
            ? 'Unexpected response format. Please contact us via WhatsApp.'
            : `Server error (${response.status}). Please try again or contact us via WhatsApp.`
        )
      }

      // Check for Web3Forms-specific errors
      if (!response.ok) {
        const errorMsg = result.message || result.error || `Server error (${response.status})`
        throw new Error(errorMsg)
      }

      if (!result.success) {
        throw new Error(
          result.message || 
          'Submission failed. Please try again or contact us via WhatsApp.'
        )
      }

      // Success
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
        // Provide user-friendly error messages
        if (err.message.includes('timeout') || err.message.includes('Network')) {
          errorMessage = 'Connection timeout. Please check your internet connection and try again, or contact us via WhatsApp.'
        } else if (err.message.includes('Web3Forms')) {
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
            href="https://wa.me/447393961000?text=Hi%20Valtora%2C%20I%27d%20like%20to%20discuss%20company%20formation%20in%20Dubai."
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
  const isCompact = variant === 'popup' || variant === 'inline'
  const containerClass = variant === 'popup' 
    ? 'bg-white' 
    : variant === 'inline'
    ? 'bg-white rounded-lg shadow-lg p-6 md:p-8'
    : 'bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-6 md:p-8 border border-gray-200'

  return (
    <form onSubmit={handleSubmit} className={containerClass}>
      {/* Honeypot field - hidden from users */}
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

      <div className="space-y-4">
        {/* Setup Type */}
        <div>
          <label htmlFor="setupType" className="block text-sm font-medium text-gray-700 mb-2">
            What do you want to set up? <span className="text-red-500">*</span>
          </label>
          <select
            id="setupType"
            value={formData.setupType}
            onChange={(e) => handleChange('setupType', e.target.value)}
            className="input-primary"
            required
          >
            <option value="">Select an option</option>
            <option value="Dubai Free Zone Company">Dubai Free Zone Company</option>
            <option value="Dubai Mainland Company">Dubai Mainland Company</option>
            <option value="Not sure — recommend for me">Not sure — recommend for me</option>
          </select>
        </div>

        {/* Business Activity */}
        <div>
          <label htmlFor="businessActivity" className="block text-sm font-medium text-gray-700 mb-2">
            Business activity / industry <span className="text-red-500">*</span>
          </label>
          <select
            id="businessActivity"
            value={formData.businessActivity}
            onChange={(e) => handleChange('businessActivity', e.target.value)}
            className="input-primary"
            required
          >
            <option value="">Select an option</option>
            <option value="Consulting / Services">Consulting / Services</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Trading">Trading</option>
            <option value="Tech / Software">Tech / Software</option>
            <option value="Marketing / Media">Marketing / Media</option>
            <option value="Logistics">Logistics</option>
            <option value="Real Estate related">Real Estate related</option>
            <option value="Other">Other (describe)</option>
          </select>
        </div>

        {/* Conditional: Other Business Activity Description */}
        {formData.businessActivity === 'Other' && (
          <div>
            <label
              htmlFor="businessActivityOther"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Briefly describe your activity <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="businessActivityOther"
              value={formData.businessActivityOther}
              onChange={(e) => handleChange('businessActivityOther', e.target.value)}
              className="input-primary"
              placeholder="e.g., Healthcare services, Manufacturing"
              required
            />
          </div>
        )}

        {/* Visas Needed */}
        <div>
          <label htmlFor="visasNeeded" className="block text-sm font-medium text-gray-700 mb-2">
            Visas needed
          </label>
          <select
            id="visasNeeded"
            value={formData.visasNeeded}
            onChange={(e) => handleChange('visasNeeded', e.target.value)}
            className="input-primary"
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4+">4+</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <select
            id="priority"
            value={formData.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
            className="input-primary"
          >
            <option value="">Select an option</option>
            <option value="Cheapest">Cheapest</option>
            <option value="Fastest">Fastest</option>
            <option value="Best long-term setup">Best long-term setup</option>
            <option value="Not sure">Not sure</option>
          </select>
        </div>

        {/* Contact Details Section */}
        <div className="pt-2 border-t border-gray-200">
          <h3 className="font-serif text-lg text-valtora-navy mb-4">Contact Details</h3>

          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Full name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="input-primary"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
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
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone / WhatsApp number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="input-primary"
              placeholder="+44 739 396 1000"
              required
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
            <div className="mt-2">
              <WhatsAppLink
                href="https://wa.me/447393961000?text=Hi%20Valtora%2C%20I%27d%20like%20to%20discuss%20company%20formation%20in%20Dubai."
                className="text-sm underline hover:no-underline"
                location={`form_error_${variant}`}
              >
                Contact us on WhatsApp instead
              </WhatsAppLink>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Get My Setup Options'}
        </button>

        {/* Privacy Microcopy */}
        <p className="text-xs text-gray-500 text-center">
          We'll reply within 1 business hour. No spam. No hidden fees.
        </p>
      </div>
    </form>
  )
}
