/**
 * Authority configurations for UAE free zones and mainland.
 * This data structure is designed to be easily migrated to a spreadsheet format.
 */

import type { BusinessCategory, VisaRole } from './types'

export type AuthorityType = 'freezone' | 'mainland'

export interface AuthorityConfig {
  id: string
  name: string
  type: AuthorityType
  base_cost: number // AED
  avg_setup_days: number
  ecosystem_score: number // 1-10
  networking_score: number // 1-10
  growth_score: number // 1-10
  bank_account_ease_score: number // 1-10
  min_office_type: 'none' | 'flexi' | 'office' | 'warehouse'
  max_visas_default: number
  allowed_roles: VisaRole[] // Visa roles this authority supports
  restricted_nationalities?: string[] // ISO country codes
  supports_categories: BusinessCategory[]
  flags: {
    commodities_only?: boolean
    crypto_friendly?: boolean
    industrial_zone?: boolean
    financial_centre?: boolean
  }
}

/**
 * Main authorities configuration array.
 * This can later be migrated to read from a spreadsheet/CSV/JSON file.
 */
export const AUTHORITIES: AuthorityConfig[] = [
  {
    id: 'spc',
    name: 'Sharjah Publishing City Free Zone (SPC)',
    type: 'freezone',
    base_cost: 8500,
    avg_setup_days: 7,
    ecosystem_score: 6,
    networking_score: 5,
    growth_score: 7,
    bank_account_ease_score: 7,
    min_office_type: 'none',
    max_visas_default: 5,
    allowed_roles: [
      'investor',
      'director',
      'manager',
      'sales',
      'technician',
      'employee',
      'dependent',
    ],
    supports_categories: [
      'service',
      'consultancy',
      'trading',
      'ecommerce',
      'tech',
      'media',
    ],
    flags: {},
  },
  {
    id: 'dmcc',
    name: 'Dubai Multi Commodities Centre (DMCC)',
    type: 'freezone',
    base_cost: 12000,
    avg_setup_days: 10,
    ecosystem_score: 9,
    networking_score: 9,
    growth_score: 9,
    bank_account_ease_score: 8,
    min_office_type: 'flexi',
    max_visas_default: 10,
    allowed_roles: [
      'investor',
      'director',
      'manager',
      'sales',
      'technician',
      'employee',
      'dependent',
    ],
    supports_categories: [
      'service',
      'consultancy',
      'trading',
      'ecommerce',
      'commodities',
      'tech',
      'crypto',
    ],
    flags: {
      crypto_friendly: true,
    },
  },
  {
    id: 'dubai_mainland',
    name: 'Dubai Mainland (DED)',
    type: 'mainland',
    base_cost: 15000,
    avg_setup_days: 14,
    ecosystem_score: 8,
    networking_score: 8,
    growth_score: 8,
    bank_account_ease_score: 7,
    min_office_type: 'office',
    max_visas_default: 20,
    allowed_roles: [
      'investor',
      'director',
      'manager',
      'sales',
      'technician',
      'driver',
      'employee',
      'dependent',
    ],
    supports_categories: [
      'service',
      'consultancy',
      'trading',
      'ecommerce',
      'real_estate',
      'manufacturing',
      'logistics',
      'financial_services',
    ],
    flags: {},
  },
  {
    id: 'meydan',
    name: 'Meydan Free Zone',
    type: 'freezone',
    base_cost: 9000,
    avg_setup_days: 5,
    ecosystem_score: 7,
    networking_score: 6,
    growth_score: 7,
    bank_account_ease_score: 7,
    min_office_type: 'none',
    max_visas_default: 5,
    allowed_roles: [
      'investor',
      'director',
      'manager',
      'sales',
      'employee',
      'dependent',
    ],
    supports_categories: ['service', 'consultancy', 'trading', 'ecommerce', 'tech'],
    flags: {},
  },
  {
    id: 'rakez',
    name: 'RAKEZ (Ras Al Khaimah Economic Zone)',
    type: 'freezone',
    base_cost: 8000,
    avg_setup_days: 8,
    ecosystem_score: 6,
    networking_score: 5,
    growth_score: 6,
    bank_account_ease_score: 6,
    min_office_type: 'none',
    max_visas_default: 5,
    allowed_roles: [
      'investor',
      'director',
      'manager',
      'sales',
      'technician',
      'employee',
      'dependent',
    ],
    supports_categories: [
      'service',
      'consultancy',
      'trading',
      'ecommerce',
      'manufacturing',
      'logistics',
    ],
    flags: {
      industrial_zone: true,
    },
  },
  {
    id: 'ifza',
    name: 'IFZA (International Free Zone Authority)',
    type: 'freezone',
    base_cost: 7500,
    avg_setup_days: 6,
    ecosystem_score: 5,
    networking_score: 4,
    growth_score: 5,
    bank_account_ease_score: 6,
    min_office_type: 'none',
    max_visas_default: 3,
    allowed_roles: ['investor', 'director', 'manager', 'employee', 'dependent'],
    supports_categories: ['service', 'consultancy', 'trading', 'ecommerce', 'tech'],
    flags: {},
  },
  {
    id: 'adgm',
    name: 'ADGM (Abu Dhabi Global Market)',
    type: 'freezone',
    base_cost: 20000,
    avg_setup_days: 21,
    ecosystem_score: 10,
    networking_score: 10,
    growth_score: 10,
    bank_account_ease_score: 9,
    min_office_type: 'flexi',
    max_visas_default: 10,
    allowed_roles: [
      'investor',
      'director',
      'manager',
      'sales',
      'technician',
      'employee',
      'dependent',
    ],
    supports_categories: [
      'service',
      'consultancy',
      'trading',
      'tech',
      'financial_services',
    ],
    flags: {
      financial_centre: true,
    },
  },
  {
    id: 'difc',
    name: 'DIFC (Dubai International Financial Centre)',
    type: 'freezone',
    base_cost: 25000,
    avg_setup_days: 25,
    ecosystem_score: 10,
    networking_score: 10,
    growth_score: 10,
    bank_account_ease_score: 10,
    min_office_type: 'flexi',
    max_visas_default: 10,
    allowed_roles: [
      'investor',
      'director',
      'manager',
      'sales',
      'technician',
      'employee',
      'dependent',
    ],
    supports_categories: [
      'service',
      'consultancy',
      'trading',
      'tech',
      'financial_services',
    ],
    flags: {
      financial_centre: true,
    },
  },
]

/**
 * Helper function to find an authority by ID
 */
export function findAuthorityById(id: string): AuthorityConfig | undefined {
  return AUTHORITIES.find((auth) => auth.id === id)
}

