/**
 * Business rules engine for filtering and ranking authorities based on enquiry data.
 * These rules apply constraints and adjustments to the authority selection process.
 */

import type {
  Enquiry,
  WorkLocation,
  JurisdictionPreference,
  BusinessCategory,
} from './types'
import type { AuthorityConfig } from './authorities'
import { AUTHORITIES } from './authorities'

export interface RuleContext {
  enquiry: Enquiry
  allowedAuthorities: AuthorityConfig[]
  lockJurisdiction: boolean
  activityReason?: string
  uidIssue: boolean
  nationalityNotes: string[]
  timelineAdjustmentDays: number
  specialApprovalRequired: boolean
}

/**
 * Creates initial rule context with all authorities allowed
 */
export function createInitialRuleContext(enquiry: Enquiry): RuleContext {
  return {
    enquiry,
    allowedAuthorities: [...AUTHORITIES],
    lockJurisdiction: false,
    uidIssue: false,
    nationalityNotes: [],
    timelineAdjustmentDays: 0,
    specialApprovalRequired: false,
  }
}

/**
 * Applies activity-based rules that may restrict authorities
 */
export function applyActivityRules(context: RuleContext): RuleContext {
  const { enquiry, allowedAuthorities } = context
  const { special_activity_flags, business_category } = enquiry
  let filtered = [...allowedAuthorities]
  let lockJurisdiction = context.lockJurisdiction
  let activityReason = context.activityReason
  let specialApprovalRequired = context.specialApprovalRequired

  // Commodities trading - must use DMCC or similar commodities-capable authority
  if (special_activity_flags.commodities) {
    filtered = filtered.filter(
      (auth) => auth.flags.commodities_only || auth.id === 'dmcc'
    )
    lockJurisdiction = true
    activityReason =
      'Commodities trading must be licensed under specific authorities such as DMCC.'
  }

  // Crypto/Web3 - only crypto-friendly authorities
  if (special_activity_flags.crypto) {
    filtered = filtered.filter((auth) => auth.flags.crypto_friendly === true)
    lockJurisdiction = true
    activityReason =
      'Cryptocurrency and digital assets activities require crypto-friendly free zones like DMCC Crypto Centre.'
  }

  // Financial services - only regulated financial centres
  if (special_activity_flags.financial_services) {
    filtered = filtered.filter((auth) => auth.flags.financial_centre === true)
    lockJurisdiction = true
    specialApprovalRequired = true
    activityReason =
      'Financial services require regulated financial centres like DIFC or ADGM, which involve additional regulatory approvals.'
  }

  // Industrial/Manufacturing - requires industrial zones with warehouse support
  if (special_activity_flags.industrial_or_manufacturing) {
    filtered = filtered.filter(
      (auth) =>
        auth.flags.industrial_zone === true ||
        auth.min_office_type === 'warehouse'
    )
    lockJurisdiction = true
    activityReason =
      'Industrial and manufacturing activities require specialized zones with warehouse facilities.'
  }

  // Real estate brokerage - must use mainland (physical brokerage)
  if (special_activity_flags.real_estate_brokerage) {
    filtered = filtered.filter((auth) => auth.type === 'mainland')
    lockJurisdiction = true
    activityReason =
      'Physical real estate brokerage in Dubai requires mainland licensing through RERA and cannot use generic free zones.'
  }

  // General category filtering
  filtered = filtered.filter((auth) =>
    auth.supports_categories.includes(business_category)
  )

  return {
    ...context,
    allowedAuthorities: filtered,
    lockJurisdiction,
    activityReason,
    specialApprovalRequired,
  }
}

/**
 * Evaluates UID (Unified Identification Number) issues
 */
export function evaluateUidIssues(context: RuleContext): RuleContext {
  const { enquiry } = context
  let uidIssue = false

  for (const shareholder of enquiry.shareholders) {
    if (!shareholder.has_visited_uae) {
      uidIssue = true
      break
    }
    if (shareholder.has_visited_uae && !shareholder.has_uid) {
      uidIssue = true
      break
    }
  }

  return {
    ...context,
    uidIssue,
  }
}

/**
 * Applies nationality-based rules and restrictions
 */
export function applyNationalityRules(context: RuleContext): RuleContext {
  const { enquiry, allowedAuthorities } = context
  let filtered = [...allowedAuthorities]
  const nationalityNotes: string[] = []
  let timelineAdjustmentDays = context.timelineAdjustmentDays

  // Check each shareholder's nationality against authority restrictions
  for (const shareholder of enquiry.shareholders) {
    for (const authority of allowedAuthorities) {
      if (
        authority.restricted_nationalities &&
        authority.restricted_nationalities.includes(shareholder.nationality)
      ) {
        // Remove this authority if nationality is restricted
        filtered = filtered.filter((auth) => auth.id !== authority.id)
        nationalityNotes.push(
          `${authority.name} has restrictions for ${shareholder.nationality} nationality.`
        )
      }
    }
  }

  // Stub for high-risk nationality adjustments (can be extended with config)
  // For now, we'll add a small timeline adjustment for certain nationalities
  // This can later read from a NationalityRules config table
  const highRiskNationalities: string[] = [] // Can be populated from config
  const hasHighRiskNationality = enquiry.shareholders.some((sh) =>
    highRiskNationalities.includes(sh.nationality)
  )

  if (hasHighRiskNationality) {
    timelineAdjustmentDays += 3
    nationalityNotes.push(
      'Additional processing time may be required for certain nationalities.'
    )
  }

  return {
    ...context,
    allowedAuthorities: filtered,
    nationalityNotes: [...context.nationalityNotes, ...nationalityNotes],
    timelineAdjustmentDays,
  }
}

/**
 * Applies work location rules
 */
export function applyWorkLocationRules(context: RuleContext): RuleContext {
  const { enquiry, allowedAuthorities } = context
  const { work_location } = enquiry
  let filtered = [...allowedAuthorities]

  switch (work_location) {
    case 'remote_only':
      // Prefer authorities with no office requirement or flexi desk
      filtered = filtered.filter(
        (auth) => auth.min_office_type === 'none' || auth.min_office_type === 'flexi'
      )
      break

    case 'warehouse_required':
      // Only authorities that support warehouse office type
      filtered = filtered.filter(
        (auth) =>
          auth.min_office_type === 'warehouse' || auth.flags.industrial_zone === true
      )
      break

    case 'uae_with_office':
      // Must have at least flexi desk, prefer dedicated office
      filtered = filtered.filter(
        (auth) => auth.min_office_type !== 'none'
      )
      break

    case 'uae_only':
    case 'outside_uae_with_visits':
      // No specific filtering, but office preferences may apply
      break
  }

  return {
    ...context,
    allowedAuthorities: filtered,
  }
}

/**
 * Applies jurisdiction preference (only if not locked by activity rules)
 */
export function applyJurisdictionPreference(
  context: RuleContext
): RuleContext {
  const { enquiry, allowedAuthorities, lockJurisdiction } = context
  const { jurisdiction_preference } = enquiry

  if (lockJurisdiction) {
    // Don't apply preference if jurisdiction is locked by activity rules
    return context
  }

  let filtered = [...allowedAuthorities]

  switch (jurisdiction_preference) {
    case 'freezone':
      filtered = filtered.filter((auth) => auth.type === 'freezone')
      break

    case 'mainland':
      filtered = filtered.filter((auth) => auth.type === 'mainland')
      break

    case 'either':
    case 'recommend_for_me':
      // Keep all authorities
      break
  }

  return {
    ...context,
    allowedAuthorities: filtered,
  }
}

