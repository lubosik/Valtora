/**
 * Analytics utility functions
 * Provides helper functions for tracking events across all analytics platforms
 */

interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

/**
 * Get UTM parameters from localStorage or cookie (client-side only)
 */
export function getUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {}

  // Try localStorage first
  const stored = localStorage.getItem('utm_params')
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (e) {
      console.error('Error parsing UTM params from localStorage:', e)
    }
  }

  // Fallback to cookie
  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === 'utm_params' && value) {
      try {
        return JSON.parse(decodeURIComponent(value))
      } catch (e) {
        console.error('Error parsing UTM params from cookie:', e)
      }
    }
  }

  return {}
}

/**
 * Get UTM parameters from request cookies (server-side)
 */
export function getUTMParamsFromRequest(cookieHeader: string | null): UTMParams {
  if (!cookieHeader) return {}

  const cookies = cookieHeader.split(';')
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === 'utm_params' && value) {
      try {
        return JSON.parse(decodeURIComponent(value))
      } catch (e) {
        console.error('Error parsing UTM params from request cookie:', e)
      }
    }
  }

  return {}
}

/**
 * Track a custom event across all analytics platforms
 */
export function trackEvent(
  eventName: string,
  eventData?: Record<string, any>
) {
  if (typeof window === 'undefined') return

  const utmParams = getUTMParams()
  const eventPayload = {
    ...eventData,
    ...utmParams,
  }

  // Google Analytics
  if (window.gtag) {
    window.gtag('event', eventName, eventPayload)
  }

  // Google Tag Manager
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventPayload,
    })
  }

  // Meta Pixel
  if (window.fbq) {
    window.fbq('track', eventName, eventPayload)
  }

  // TikTok Pixel
  if (window.ttq) {
    window.ttq.track(eventName, eventPayload)
  }
}

/**
 * Meta Pixel Event Helper
 * Convenience functions for common Meta Pixel events
 */
export function trackMetaPixelEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.fbq) return
  window.fbq('track', eventName, eventData)
}

/**
 * Track Lead event for Meta Pixel
 */
export function trackMetaPixelLead(source?: string) {
  trackMetaPixelEvent('Lead', {
    content_name: 'Company Formation Inquiry',
    content_category: 'Lead Capture',
    source: source || 'website',
  })
}

/**
 * Track CompleteRegistration event for Meta Pixel
 */
export function trackMetaPixelRegistration(enquiryId?: string) {
  trackMetaPixelEvent('CompleteRegistration', {
    content_name: 'Company Formation Registration',
    status: true,
    enquiry_id: enquiryId,
  })
}

/**
 * Track calculator completion
 */
export function trackCalculatorComplete(enquiryId: string) {
  trackEvent('calculator_complete', {
    enquiry_id: enquiryId,
  })
}

/**
 * Track quote view
 */
export function trackQuoteView(enquiryId: string, authorityId: string) {
  trackEvent('quote_view', {
    enquiry_id: enquiryId,
    authority_id: authorityId,
  })
}

/**
 * Track checkout start
 */
export function trackCheckoutStart(enquiryId: string, amount: number, paymentType: string) {
  trackEvent('begin_checkout', {
    enquiry_id: enquiryId,
    value: amount,
    currency: 'AED',
    payment_type: paymentType,
  })
}

/**
 * Track payment success
 */
export function trackPaymentSuccess(
  enquiryId: string,
  paymentIntentId: string,
  amount: number,
  paymentType: string
) {
  trackEvent('purchase', {
    enquiry_id: enquiryId,
    transaction_id: paymentIntentId,
    value: amount,
    currency: 'AED',
    payment_type: paymentType,
  })
}

/**
 * Track onboarding completion
 */
export function trackOnboardingComplete(enquiryId: string) {
  trackEvent('onboarding_complete', {
    enquiry_id: enquiryId,
  })
}

/**
 * Track lead capture
 */
export function trackLeadCapture(source: string) {
  trackEvent('lead_capture', {
    source,
  })
}

/**
 * Track WhatsApp click
 */
export function trackWhatsAppClick(location: string) {
  trackEvent('whatsapp_click', {
    location,
  })
}

// TypeScript declarations for global analytics objects
declare global {
  interface Window {
    dataLayer?: any[]
    gtag?: (...args: any[]) => void
    fbq?: (...args: any[]) => void
    ttq?: {
      page: () => void
      track: (event: string, data?: any) => void
      [key: string]: any
    }
  }
}

