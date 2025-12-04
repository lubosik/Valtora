/**
 * Main decision engine that processes enquiries and generates quotes.
 * This is the core logic that combines all rules and generates recommendations.
 */

import type { Enquiry, DecisionResult, Priority, AuthorityQuote } from './types'
import type { AuthorityConfig } from './authorities'
import {
  createInitialRuleContext,
  applyActivityRules,
  evaluateUidIssues,
  applyNationalityRules,
  applyWorkLocationRules,
  applyJurisdictionPreference,
} from './rules'

/**
 * Computes visa costs for an authority based on number of visas
 * This should later read from VisaPricing config table
 */
function computeVisaCostForAuthority(
  authority: AuthorityConfig,
  numVisas: number
): number {
  // Base visa cost - can be made configurable per authority
  const basePerVisa = 4000 // AED
  return basePerVisa * numVisas
}

/**
 * Computes office cost estimate based on minimum office type required
 * This should later read from OfficePricing config table
 */
function computeOfficeCostForAuthority(
  authority: AuthorityConfig,
  workLocation: string
): number {
  switch (authority.min_office_type) {
    case 'none':
      return 0
    case 'flexi':
      return 5000 // Annual estimate
    case 'office':
      return 25000 // Annual estimate
    case 'warehouse':
      return 50000 // Annual estimate
    default:
      return 0
  }
}

/**
 * Computes special activity fees
 * This should later read from config
 */
function computeSpecialActivityCosts(
  authority: AuthorityConfig,
  enquiry: Enquiry
): number {
  let cost = 0

  if (enquiry.special_activity_flags.financial_services) {
    // Financial services may have additional regulatory fees
    cost += 5000
  }

  if (enquiry.special_activity_flags.crypto) {
    // Crypto may have additional setup fees
    cost += 3000
  }

  return cost
}

/**
 * Computes nationality-based surcharges
 * This should later read from NationalityRules config table
 */
function computeNationalitySurcharges(
  authority: AuthorityConfig,
  enquiry: Enquiry
): number {
  // Stub for now - can be extended with config-based logic
  return 0
}

/**
 * Looks up express fee for an authority
 * This should later read from ExpressFees config table
 */
function lookupExpressFee(authority: AuthorityConfig): number {
  // Base express fee - can be made configurable per authority
  // Typically ranges from 2000-5000 AED depending on authority
  if (authority.type === 'mainland') {
    return 5000
  }
  return 3000
}

/**
 * Ranks authorities based on the primary priority
 */
function rankAuthoritiesByPriority(
  authorities: AuthorityConfig[],
  priority: Priority
): AuthorityConfig[] {
  const sorted = [...authorities]

  switch (priority) {
    case 'fastest_setup':
      return sorted.sort((a, b) => a.avg_setup_days - b.avg_setup_days)

    case 'cheapest':
      return sorted.sort((a, b) => a.base_cost - b.base_cost)

    case 'best_growth':
      return sorted.sort((a, b) => b.growth_score - a.growth_score)

    case 'sector_networking':
      return sorted.sort((a, b) => b.networking_score - a.networking_score)

    case 'bank_account_ease':
      return sorted.sort((a, b) => b.bank_account_ease_score - a.bank_account_ease_score)

    case 'not_sure':
      // Combined score: growth + networking
      return sorted.sort(
        (a, b) =>
          b.growth_score +
          b.networking_score -
          (a.growth_score + a.networking_score)
      )

    default:
      return sorted
  }
}

/**
 * Generates a quote for a specific authority
 */
function generateAuthorityQuote(
  authority: AuthorityConfig,
  enquiry: Enquiry,
  context: ReturnType<typeof applyJurisdictionPreference>
): AuthorityQuote {
  const isExpress = enquiry.express_preference === 'express'

  // Compute cost breakdown
  const licence_and_registration = authority.base_cost
  const visa_costs = computeVisaCostForAuthority(
    authority,
    enquiry.total_visas_requested
  )
  const office_cost_estimate = computeOfficeCostForAuthority(
    authority,
    enquiry.work_location
  )
  const special_activity_fees = computeSpecialActivityCosts(authority, enquiry)
  const nationality_adjustments = computeNationalitySurcharges(authority, enquiry)
  const express_fee = isExpress ? lookupExpressFee(authority) : 0

  const total_cost =
    licence_and_registration +
    visa_costs +
    office_cost_estimate +
    special_activity_fees +
    nationality_adjustments +
    express_fee

  // Compute timeline
  const baseTimeline = authority.avg_setup_days + context.timelineAdjustmentDays
  const standardTimeline = baseTimeline
  const expressTimeline = isExpress ? Math.max(3, baseTimeline - 3) : undefined

  // Build explanation
  const why_recommended = buildWhyRecommended(authority, enquiry.priorities.primary)
  const explanations = {
    why_recommended,
    activity_reason: context.activityReason,
    nationality_notes:
      context.nationalityNotes.length > 0
        ? context.nationalityNotes.join(' ')
        : undefined,
    uid_warning: context.uidIssue
      ? 'One or more shareholders must obtain a UID (Unified Identification Number) before licence issuance. Valtora can assist with entry permits and UID creation.'
      : undefined,
    mainland_comparison:
      authority.type === 'mainland'
        ? 'Mainland costs include mandatory office rent, establishment card, immigration file, and possible sponsor fees. Free zones may offer more flexibility with office requirements.'
        : 'Free zones offer streamlined setup with flexible office options. Mainland may provide broader market access but requires mandatory office space and additional approvals.',
  }

  return {
    authority_id: authority.id,
    authority_name: authority.name,
    jurisdiction_type: authority.type,
    forced_by_activity: context.lockJurisdiction && !!context.activityReason,
    total_cost,
    currency: 'AED',
    breakdown: {
      licence_and_registration,
      visa_costs,
      office_cost_estimate,
      special_activity_fees,
      nationality_adjustments,
      express_fee,
    },
    timeline_days: {
      standard: standardTimeline,
      ...(expressTimeline && { express: expressTimeline }),
    },
    explanations,
  }
}

/**
 * Builds the "why recommended" explanation based on priority
 */
function buildWhyRecommended(authority: AuthorityConfig, priority: Priority): string {
  switch (priority) {
    case 'fastest_setup':
      return `${authority.name} offers one of the fastest setup times in the UAE, typically completing in ${authority.avg_setup_days} days.`

    case 'cheapest':
      return `${authority.name} provides the most cost-effective solution with a base cost of AED ${authority.base_cost.toLocaleString()}.`

    case 'best_growth':
      return `${authority.name} is ideal for long-term growth with excellent ecosystem support and scalability options.`

    case 'sector_networking':
      return `${authority.name} offers strong sector-specific networking opportunities and industry connections.`

    case 'bank_account_ease':
      return `${authority.name} has a strong track record for bank account opening with established relationships.`

    case 'not_sure':
      return `${authority.name} offers a balanced combination of growth potential, networking opportunities, and value.`

    default:
      return `${authority.name} is a suitable option for your requirements.`
  }
}

/**
 * Main decision engine function
 */
export function runDecisionEngine(enquiry: Enquiry): DecisionResult {
  // Create initial context
  let context = createInitialRuleContext(enquiry)

  // Apply rules in sequence
  context = applyActivityRules(context)
  context = evaluateUidIssues(context)
  context = applyNationalityRules(context)
  context = applyWorkLocationRules(context)
  context = applyJurisdictionPreference(context)

  // Check if any authorities remain
  if (context.allowedAuthorities.length === 0) {
    return {
      enquiry_id: enquiry.enquiry_id,
      case_status: 'ON_HOLD_APPROVALS',
      status_reasons: [
        'No suitable authorities were found based on your requirements. Manual review is needed to identify alternative options.',
      ],
      recommendations: null,
      quotes: [],
      cta: {
        allow_deposit_payment: false,
        allow_full_payment: false,
        deposit_amount: 500,
        next_steps_summary: [
          'Please contact our team to discuss alternative options for your business setup.',
        ],
      },
    }
  }

  // Rank authorities by priority
  const ranked = rankAuthoritiesByPriority(
    context.allowedAuthorities,
    enquiry.priorities.primary
  )

  // Take top 3 as shortlist
  const shortlist = ranked.slice(0, 3)

  // Generate quotes for shortlisted authorities
  const quotes: AuthorityQuote[] = shortlist.map((authority) =>
    generateAuthorityQuote(authority, enquiry, context)
  )

  // Determine case status
  let case_status: DecisionResult['case_status'] = 'QUOTED'
  const status_reasons: string[] = []

  if (context.uidIssue) {
    case_status = 'ON_HOLD_UID_REQUIRED'
    status_reasons.push(
      'One or more shareholders must obtain a UID (Unified Identification Number) before licence issuance. You can still proceed with a deposit payment, and our team will guide you through the UID process.'
    )
  }

  if (context.specialApprovalRequired) {
    case_status = 'ON_HOLD_APPROVALS'
    status_reasons.push(
      'This case requires additional regulatory approvals. Our team will handle the approval process, but additional time may be needed.'
    )
  }

  if (case_status === 'QUOTED') {
    status_reasons.push('All information appears sufficient to proceed.')
  }

  // Build recommendations
  const recommendations = {
    primary_authority_id: quotes[0].authority_id,
    alternatives: quotes.slice(1).map((q) => q.authority_id),
  }

  // Build CTA config
  const cta = {
    allow_deposit_payment: true,
    allow_full_payment: true,
    deposit_amount: 500,
    next_steps_summary: [
      'Review the recommended authority and detailed cost breakdown above.',
      'Pay a deposit or full fee to secure your pricing and start the setup process.',
      'Upload passports and complete KYC documentation through our onboarding portal.',
    ],
  }

  return {
    enquiry_id: enquiry.enquiry_id,
    case_status,
    status_reasons,
    recommendations,
    quotes,
    cta,
  }
}

