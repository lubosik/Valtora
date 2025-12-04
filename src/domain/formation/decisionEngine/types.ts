/**
 * Core domain types for the Valtora company formation decision engine.
 * These types define the data structures used throughout the quoting and recommendation system.
 */

export type Priority =
  | 'fastest_setup'
  | 'cheapest'
  | 'best_growth'
  | 'sector_networking'
  | 'bank_account_ease'
  | 'not_sure'

export type JurisdictionPreference = 'freezone' | 'mainland' | 'either' | 'recommend_for_me'

export type WorkLocation =
  | 'remote_only'
  | 'uae_only'
  | 'outside_uae_with_visits'
  | 'uae_with_office'
  | 'warehouse_required'

export type BusinessCategory =
  | 'service'
  | 'consultancy'
  | 'trading'
  | 'ecommerce'
  | 'commodities'
  | 'tech'
  | 'media'
  | 'logistics'
  | 'manufacturing'
  | 'crypto'
  | 'real_estate'
  | 'financial_services'
  | 'other'

export type VisaRole =
  | 'investor'
  | 'director'
  | 'manager'
  | 'sales'
  | 'technician'
  | 'driver'
  | 'employee'
  | 'dependent'

export interface Priorities {
  primary: Priority
  secondary?: Priority[]
}

export interface Shareholder {
  id: string
  name: string
  nationality: string // ISO country code
  ownership_percent: number
  has_visited_uae: boolean
  has_uid?: boolean // Only relevant if has_visited_uae is true
  requires_visa: boolean
  visa_role?: VisaRole // Only if requires_visa is true
}

export interface VisaRequest {
  assigned_to_shareholder_id?: string // Optional: can be for employee not yet added as shareholder
  role: VisaRole
}

export interface SpecialActivityFlags {
  commodities: boolean
  crypto: boolean
  real_estate_brokerage: boolean
  financial_services: boolean
  industrial_or_manufacturing: boolean
}

export interface Enquiry {
  enquiry_id: string
  created_at: string // ISO 8601 date string
  priorities: Priorities
  jurisdiction_preference: JurisdictionPreference
  work_location: WorkLocation
  business_category: BusinessCategory
  business_model_description: string
  num_shareholders: number
  shareholders: Shareholder[]
  total_visas_requested: number
  visas: VisaRequest[]
  express_preference: 'standard' | 'express'
  special_activity_flags: SpecialActivityFlags
}

export type CaseStatus = 'QUOTED' | 'ON_HOLD_UID_REQUIRED' | 'ON_HOLD_APPROVALS'

export interface CostBreakdown {
  licence_and_registration: number
  visa_costs: number
  office_cost_estimate: number
  special_activity_fees: number
  nationality_adjustments: number
  express_fee: number
}

export interface TimelineEstimate {
  standard: number // Days
  express?: number // Days (optional)
}

export interface QuoteExplanation {
  why_recommended: string
  activity_reason?: string
  nationality_notes?: string
  uid_warning?: string
  mainland_comparison?: string
}

export interface AuthorityQuote {
  authority_id: string
  authority_name: string
  jurisdiction_type: 'freezone' | 'mainland'
  forced_by_activity: boolean
  total_cost: number
  currency: 'AED'
  breakdown: CostBreakdown
  timeline_days: TimelineEstimate
  explanations: QuoteExplanation
}

export interface RecommendationSummary {
  primary_authority_id: string
  alternatives: string[] // Array of authority_id values
}

export interface CTAConfig {
  allow_deposit_payment: boolean
  allow_full_payment: boolean
  deposit_amount: number
  next_steps_summary: string[]
}

export interface DecisionResult {
  enquiry_id: string
  case_status: CaseStatus
  status_reasons: string[]
  recommendations: RecommendationSummary | null
  quotes: AuthorityQuote[]
  cta: CTAConfig
}

