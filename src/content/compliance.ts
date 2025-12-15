/**
 * Compliance Badges Configuration
 * 
 * This file manages compliance and regulatory badges displayed on the site.
 * All badges should be verifiable and accurate.
 */

export interface ComplianceBadge {
  label: string
  description?: string
  enabled: boolean
  imageUrl?: string // If official badge asset is available
  tooltip?: string
}

/**
 * GoAML Registered Badge Configuration
 * 
 * GoAML (Go Anti-Money Laundering) is a UAE government system for reporting
 * suspicious transactions. This badge indicates compliance registration.
 * 
 * Note: This is a configurable badge. Ensure the registration status is
 * accurate and verifiable before enabling.
 */
export const goamlBadge: ComplianceBadge = {
  label: 'GoAML Registered',
  description: 'Registered with UAE GoAML compliance system',
  enabled: true, // Toggle this to show/hide the badge
  tooltip: 'Registered with UAE GoAML (Go Anti-Money Laundering) compliance system',
  // imageUrl: '/assets/compliance/goaml-badge.svg', // Uncomment if official badge is available
}

/**
 * All Compliance Badges
 * Add additional compliance badges here as needed
 */
export const complianceBadges: ComplianceBadge[] = [
  goamlBadge,
  // Add more compliance badges here
]

/**
 * Get enabled compliance badges
 */
export function getEnabledComplianceBadges(): ComplianceBadge[] {
  return complianceBadges.filter(badge => badge.enabled)
}
