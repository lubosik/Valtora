/**
 * Web3Forms Submission Utility
 * 
 * Centralized function for submitting form data to Web3Forms.
 * All forms across the site use this function to ensure consistency.
 * 
 * Forms using this utility:
 * - Hero form (homepage)
 * - Popup form (exit intent/scroll-triggered)
 * - Inline CTA embeds (blog posts)
 * 
 * All submissions are configured to deliver to: info@valtoraformations.com
 * (Configured in Web3Forms dashboard, not in code)
 */

export interface Web3FormsSubmissionData {
  access_key: string
  subject: string
  from_name: string
  [key: string]: string | number | undefined
}

export interface Web3FormsResponse {
  success: boolean
  message?: string
  error?: string
}

/**
 * Sanity check: Validate that Web3Forms access key exists
 * This should be called before attempting submission to provide better error messages
 */
export function validateWeb3FormsConfig(): { valid: boolean; error?: string } {
  if (typeof window === 'undefined') {
    // Server-side: env vars are available
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    if (!accessKey || accessKey.trim() === '') {
      return {
        valid: false,
        error: 'Web3Forms access key is not configured. Please set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in your environment variables.',
      }
    }
    return { valid: true }
  }

  // Client-side: NEXT_PUBLIC_ vars are injected at build time
  // They should be available, but we check anyway
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
  if (!accessKey || accessKey.trim() === '') {
    return {
      valid: false,
      error: 'Form submission is temporarily unavailable. Please contact us via WhatsApp instead.',
    }
  }

  return { valid: true }
}

/**
 * Submit form data to Web3Forms
 * 
 * @param data - Form submission data (must include access_key, subject, from_name)
 * @returns Promise resolving to Web3Forms response
 */
export async function submitToWeb3Forms(
  data: Web3FormsSubmissionData
): Promise<Web3FormsResponse> {
  // Validate config first
  const configCheck = validateWeb3FormsConfig()
  if (!configCheck.valid) {
    throw new Error(configCheck.error || 'Web3Forms configuration error')
  }

  // Ensure access_key is set (use from data or env)
  if (!data.access_key) {
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      throw new Error('Web3Forms access key is missing')
    }
    data.access_key = accessKey
  }

  // Dev-only logging (never log in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web3Forms] Submitting form data:', {
      subject: data.subject,
      from_name: data.from_name,
      hasAccessKey: !!data.access_key,
      accessKeyLength: data.access_key?.length || 0,
      fieldCount: Object.keys(data).length,
    })
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
      body: JSON.stringify(data),
      signal: controller.signal,
    })
  } catch (fetchError) {
    clearTimeout(timeoutId)
    
    // Dev-only logging
    if (process.env.NODE_ENV === 'development') {
      console.error('[Web3Forms] Fetch error:', fetchError)
    }
    
    if (fetchError instanceof Error && fetchError.name === 'AbortError') {
      throw new Error('Request timed out. Please check your connection and try again.')
    }
    throw new Error('Network error. Please check your connection and try again.')
  } finally {
    clearTimeout(timeoutId)
  }

  // Handle non-JSON responses
  let result: Web3FormsResponse
  const contentType = response.headers.get('content-type')
  
  if (contentType && contentType.includes('application/json')) {
    try {
      result = await response.json()
    } catch (parseError) {
      // Dev-only logging
      if (process.env.NODE_ENV === 'development') {
        console.error('[Web3Forms] JSON parse error:', parseError)
      }
      throw new Error('Invalid response from server. Please try again or contact us via WhatsApp.')
    }
  } else {
    const text = await response.text()
    
    // Dev-only logging
    if (process.env.NODE_ENV === 'development') {
      console.error('[Web3Forms] Non-JSON response:', {
        status: response.status,
        statusText: response.statusText,
        contentType,
        text: text.substring(0, 200), // First 200 chars only
      })
    }
    
    throw new Error(
      response.ok
        ? 'Unexpected response format. Please contact us via WhatsApp.'
        : `Server error (${response.status}). Please try again or contact us via WhatsApp.`
    )
  }

  // Dev-only logging
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web3Forms] Response:', {
      success: result.success,
      message: result.message,
      error: result.error,
      status: response.status,
    })
  }

  // Check for Web3Forms-specific errors
  if (!response.ok) {
    const errorMsg = result.message || result.error || `Server error (${response.status})`
    throw new Error(errorMsg)
  }

  if (!result.success) {
    throw new Error(
      result.message || 'Submission failed. Please try again or contact us via WhatsApp.'
    )
  }

  return result
}
