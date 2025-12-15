import { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://valtora.com'
const siteName = 'Valtora Company Formations'
const defaultDescription = 'Expert Dubai company formation services with transparent pricing. Get an instant quote for free zone and mainland company setup in Dubai, UAE.'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - Dubai Company Formation Experts`,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    'Dubai company formation',
    'UAE company setup',
    'Dubai free zone',
    'Dubai mainland company',
    'company registration Dubai',
    'Dubai business license',
    'UAE company formation',
    'Dubai trade license',
    'Dubai company cost',
    'Dubai company formation cost',
    'Dubai business setup',
    'UAE business license',
    'Dubai company registration',
    'Dubai free zone license',
    'Dubai mainland license',
    'SPC free zone',
    'DMCC free zone',
    'IFZA free zone',
    'Meydan free zone',
    'RAKEZ free zone',
    'Dubai visa',
    'UAE residency',
    'Dubai company formation services',
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: siteUrl,
    siteName: siteName,
    title: `${siteName} - Dubai Company Formation Experts`,
    description: defaultDescription,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} - Dubai Company Formation Experts`,
    description: defaultDescription,
    images: [`${siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
  alternates: {
    canonical: siteUrl,
  },
}

export function generatePageMetadata(
  title: string,
  description: string,
  path: string = '',
  image?: string
): Metadata {
  const url = `${siteUrl}${path}`
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: image ? [{ url: image }] : defaultMetadata.openGraph?.images,
    },
    twitter: {
      title,
      description,
      images: image ? [image] : defaultMetadata.twitter?.images,
    },
    alternates: {
      canonical: url,
    },
  }
}

/**
 * Generate JSON-LD structured data for Organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/valtora-logo.png`,
    description: defaultDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Unit No: RET-R5-185, Jumeirah Lakes Towers',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+44-739-396-1000',
      contactType: 'Customer Service',
      areaServed: 'AE',
      availableLanguage: ['en', 'ar'],
    },
    sameAs: [
      // Add social media links when available
      // 'https://www.facebook.com/valtora',
      // 'https://www.linkedin.com/company/valtora',
    ],
  }
}

/**
 * Generate JSON-LD structured data for LocalBusiness
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}#business`,
    name: siteName,
    image: `${siteUrl}/valtora-logo.png`,
    description: defaultDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Unit No: RET-R5-185, Jumeirah Lakes Towers',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      postalCode: '',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '25.0657',
      longitude: '55.1413',
    },
    telephone: '+44-739-396-1000',
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  }
}

/**
 * Generate JSON-LD structured data for Service
 */
export function generateServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Company Formation Services',
    provider: {
      '@type': 'Organization',
      name: siteName,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Arab Emirates',
    },
    description: defaultDescription,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'AED',
      availability: 'https://schema.org/InStock',
    },
  }
}

/**
 * Generate JSON-LD structured data for FAQPage
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate JSON-LD structured data for BreadcrumbList
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  }
}

/**
 * Generate JSON-LD structured data for BlogPosting
 */
export function generateBlogPostingSchema(post: {
  title: string
  description: string
  slug: string
  publishedDate: string
  updatedDate?: string
  author: string
  image?: string
  category: string
  tags: string[]
}) {
  const postUrl = `${siteUrl}/blog/${post.slug}`
  const imageUrl = post.image ? (post.image.startsWith('http') ? post.image : `${siteUrl}${post.image}`) : `${siteUrl}/og-image.jpg`

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: imageUrl,
    datePublished: post.publishedDate,
    dateModified: post.updatedDate || post.publishedDate,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/valtora-logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    articleSection: post.category,
    keywords: post.tags.join(', '),
    url: postUrl,
  }
}

/**
 * Generate JSON-LD structured data for NewsArticle (optional, for news-style posts)
 * Use this only for time-sensitive news content, not regular blog posts
 */
export function generateNewsArticleSchema(post: {
  title: string
  description: string
  slug: string
  publishedDate: string
  updatedDate?: string
  author: string
  image?: string
  category: string
}) {
  const postUrl = `${siteUrl}/blog/${post.slug}`
  const imageUrl = post.image ? (post.image.startsWith('http') ? post.image : `${siteUrl}${post.image}`) : `${siteUrl}/og-image.jpg`

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.description,
    image: imageUrl,
    datePublished: post.publishedDate,
    dateModified: post.updatedDate || post.publishedDate,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/valtora-logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    articleSection: post.category,
    url: postUrl,
  }
}

