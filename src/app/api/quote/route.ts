import { NextRequest, NextResponse } from 'next/server'
import { runDecisionEngine } from '@/domain/formation/decisionEngine'
import type { Enquiry } from '@/domain/formation/decisionEngine'
import { getUTMParamsFromRequest } from '@/lib/analytics'

/**
 * GET /api/quote
 * Returns API information
 */
export async function GET() {
  return NextResponse.json({
    message: 'Valtora Quote API',
    version: '1.0.0',
    endpoint: '/api/quote',
    method: 'POST',
    description: 'Accepts an Enquiry object and returns a DecisionResult with quotes and recommendations',
    requiredFields: [
      'priorities',
      'jurisdiction_preference',
      'work_location',
      'business_category',
      'business_model_description',
      'num_shareholders',
      'shareholders',
      'total_visas_requested',
      'visas',
      'express_preference',
      'special_activity_flags',
    ],
  })
}

/**
 * POST /api/quote
 * Accepts an Enquiry object and returns a DecisionResult with quotes and recommendations
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the enquiry data
    const validationError = validateEnquiry(body)
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      )
    }

    const enquiry = body as Enquiry

    // Generate enquiry_id if not provided
    if (!enquiry.enquiry_id) {
      enquiry.enquiry_id = generateEnquiryId()
    }

    // Set created_at if not provided
    if (!enquiry.created_at) {
      enquiry.created_at = new Date().toISOString()
    }

    // Get UTM parameters from request cookies
    const cookieHeader = request.headers.get('cookie')
    const utmParams = getUTMParamsFromRequest(cookieHeader)
    
    // Attach UTM params to enquiry metadata (for tracking)
    // In production, you might store this in your database
    const enquiryWithUTM = {
      ...enquiry,
      metadata: {
        ...(enquiry as any).metadata,
        utm_params: utmParams,
      },
    }

    // Run the decision engine
    const result = runDecisionEngine(enquiry)

    // Attach UTM params to result for client-side tracking
    const resultWithUTM = {
      ...result,
      utm_params: utmParams,
    }

    return NextResponse.json(resultWithUTM, { status: 200 })
  } catch (error) {
    console.error('Error processing quote request:', error)
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }

    // Handle other errors
    return NextResponse.json(
      { error: 'Internal server error while processing quote' },
      { status: 500 }
    )
  }
}

/**
 * Validates an enquiry object
 */
function validateEnquiry(data: any): string | null {
  if (!data || typeof data !== 'object') {
    return 'Request body must be a valid JSON object'
  }

  // Validate priorities
  if (!data.priorities || typeof data.priorities !== 'object') {
    return 'priorities is required and must be an object'
  }
  const validPriorities = [
    'fastest_setup',
    'cheapest',
    'best_growth',
    'sector_networking',
    'bank_account_ease',
    'not_sure',
  ]
  if (!validPriorities.includes(data.priorities.primary)) {
    return `priorities.primary must be one of: ${validPriorities.join(', ')}`
  }

  // Validate jurisdiction_preference
  const validJurisdictions = ['freezone', 'mainland', 'either', 'recommend_for_me']
  if (!validJurisdictions.includes(data.jurisdiction_preference)) {
    return `jurisdiction_preference must be one of: ${validJurisdictions.join(', ')}`
  }

  // Validate work_location
  const validWorkLocations = [
    'remote_only',
    'uae_only',
    'outside_uae_with_visits',
    'uae_with_office',
    'warehouse_required',
  ]
  if (!validWorkLocations.includes(data.work_location)) {
    return `work_location must be one of: ${validWorkLocations.join(', ')}`
  }

  // Validate business_category
  const validCategories = [
    'service',
    'consultancy',
    'trading',
    'ecommerce',
    'commodities',
    'tech',
    'media',
    'logistics',
    'manufacturing',
    'crypto',
    'real_estate',
    'financial_services',
    'other',
  ]
  if (!validCategories.includes(data.business_category)) {
    return `business_category must be one of: ${validCategories.join(', ')}`
  }

  // Validate business_model_description
  if (!data.business_model_description || typeof data.business_model_description !== 'string') {
    return 'business_model_description is required and must be a string'
  }

  // Validate express_preference
  if (!['standard', 'express'].includes(data.express_preference)) {
    return 'express_preference must be either "standard" or "express"'
  }

  // Validate num_shareholders
  if (typeof data.num_shareholders !== 'number' || data.num_shareholders < 1) {
    return 'num_shareholders must be a number greater than 0'
  }

  // Validate shareholders array
  if (!Array.isArray(data.shareholders)) {
    return 'shareholders must be an array'
  }
  if (data.shareholders.length !== data.num_shareholders) {
    return 'shareholders array length must match num_shareholders'
  }

  // Validate each shareholder
  for (let i = 0; i < data.shareholders.length; i++) {
    const sh = data.shareholders[i]
    const errors: string[] = []

    if (!sh.id || typeof sh.id !== 'string') {
      errors.push(`shareholders[${i}].id is required and must be a string`)
    }
    if (!sh.name || typeof sh.name !== 'string') {
      errors.push(`shareholders[${i}].name is required and must be a string`)
    }
    if (!sh.nationality || typeof sh.nationality !== 'string') {
      errors.push(`shareholders[${i}].nationality is required and must be a string (ISO country code)`)
    }
    if (typeof sh.ownership_percent !== 'number' || sh.ownership_percent < 0 || sh.ownership_percent > 100) {
      errors.push(`shareholders[${i}].ownership_percent must be a number between 0 and 100`)
    }
    if (typeof sh.has_visited_uae !== 'boolean') {
      errors.push(`shareholders[${i}].has_visited_uae must be a boolean`)
    }
    if (typeof sh.requires_visa !== 'boolean') {
      errors.push(`shareholders[${i}].requires_visa must be a boolean`)
    }
    if (sh.has_visited_uae && typeof sh.has_uid !== 'boolean' && sh.has_uid !== undefined) {
      errors.push(`shareholders[${i}].has_uid must be a boolean if has_visited_uae is true`)
    }
    if (sh.requires_visa && !sh.visa_role) {
      errors.push(`shareholders[${i}].visa_role is required when requires_visa is true`)
    }

    if (errors.length > 0) {
      return errors.join('; ')
    }
  }

  // Validate total ownership adds up to 100%
  const totalOwnership = data.shareholders.reduce(
    (sum: number, sh: any) => sum + (sh.ownership_percent || 0),
    0
  )
  if (Math.abs(totalOwnership - 100) > 0.01) {
    return `Total ownership percentage must equal 100% (currently ${totalOwnership}%)`
  }

  // Validate total_visas_requested
  if (typeof data.total_visas_requested !== 'number' || data.total_visas_requested < 0) {
    return 'total_visas_requested must be a non-negative number'
  }

  // Validate visas array
  if (!Array.isArray(data.visas)) {
    return 'visas must be an array'
  }
  if (data.visas.length !== data.total_visas_requested) {
    return 'visas array length must match total_visas_requested'
  }

  // Validate each visa request
  const validVisaRoles = [
    'investor',
    'director',
    'manager',
    'sales',
    'technician',
    'driver',
    'employee',
    'dependent',
  ]
  for (let i = 0; i < data.visas.length; i++) {
    const visa = data.visas[i]
    if (!visa.role || !validVisaRoles.includes(visa.role)) {
      return `visas[${i}].role must be one of: ${validVisaRoles.join(', ')}`
    }
  }

  // Validate special_activity_flags
  if (!data.special_activity_flags || typeof data.special_activity_flags !== 'object') {
    return 'special_activity_flags is required and must be an object'
  }
  const flagFields = [
    'commodities',
    'crypto',
    'real_estate_brokerage',
    'financial_services',
    'industrial_or_manufacturing',
  ]
  for (const field of flagFields) {
    if (typeof data.special_activity_flags[field] !== 'boolean') {
      return `special_activity_flags.${field} must be a boolean`
    }
  }

  return null // Validation passed
}

/**
 * Generates a unique enquiry ID
 */
function generateEnquiryId(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 9)
  return `ENQ-${timestamp}-${random}`.toUpperCase()
}

