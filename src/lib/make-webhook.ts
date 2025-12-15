/**
 * Make.com Webhook Submission Utility
 * 
 * Submits form data to Make.com webhook for GHL (GoHighLevel) contact creation.
 * This runs in parallel with Web3Forms submission to ensure data reaches both systems.
 */

export interface MakeWebhookSubmissionData {
  businessActivity: string
  visasRequired: string
  officeSpace: string
  shareholders: string
  firstName: string
  lastName: string
  email: string
  phone: string
  fullName?: string
  pageUrl?: string
  submittedAt?: string
  formVariant?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
}

export interface MakeWebhookResponse {
  success: boolean
  message?: string
  error?: string
}

/**
 * Make.com Webhook URL
 * This webhook creates contacts in GHL (GoHighLevel) via Make.com automation
 */
const MAKE_WEBHOOK_URL = 'https://hook.eu1.make.com/a4hxask3qr4ie7ymwnud9qp19pin69o0'

/**
 * Submit form data to Make.com webhook
 * 
 * This function sends data to Make.com for GHL contact creation.
 * It's designed to fail gracefully - errors are logged but don't block the form submission.
 * 
 * @param data - Form submission data
 * @returns Promise resolving to MakeWebhookResponse
 */
export async function submitToMakeWebhook(
  data: MakeWebhookSubmissionData
): Promise<MakeWebhookResponse> {
  // Dev-only logging
  if (process.env.NODE_ENV === 'development') {
    console.log('[Make Webhook] Submitting form data:', {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      businessActivity: data.businessActivity,
    })
  }

  // Create AbortController for timeout
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout (shorter than Web3Forms)

  let response: Response
  try {
    response = await fetch(MAKE_WEBHOOK_URL, {
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
      console.error('[Make Webhook] Fetch error:', fetchError)
    }
    
    // Return error but don't throw - we want graceful degradation
    return {
      success: false,
      error: fetchError instanceof Error && fetchError.name === 'AbortError'
        ? 'Request timed out'
        : 'Network error',
    }
  } finally {
    clearTimeout(timeoutId)
  }

  // Check if response is OK
  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error')
    
    // Dev-only logging
    if (process.env.NODE_ENV === 'development') {
      console.error('[Make Webhook] Response error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText.substring(0, 200),
      })
    }
    
    return {
      success: false,
      error: `Server error (${response.status})`,
    }
  }

  // Make.com webhook typically returns "Accepted" or similar
  // We consider any 2xx response as success
  const result: MakeWebhookResponse = {
    success: true,
    message: 'Data sent to Make.com webhook successfully',
  }

  // Dev-only logging
  if (process.env.NODE_ENV === 'development') {
    console.log('[Make Webhook] Response:', {
      success: result.success,
      status: response.status,
    })
  }

  return result
}
