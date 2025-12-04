import Link from 'next/link'
import Image from 'next/image'
import { generatePageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = generatePageMetadata(
  'Blog - Dubai Company Formation Insights | Valtora',
  'Expert insights, guides, and updates about Dubai company formation, UAE business setup, visas, and free zone regulations.',
  '/blog'
)

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  image: string
  date: string
  category: string
  readTime: string
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'dubai-free-zone-company-formation-guide-2025',
    title: 'Complete Guide to Dubai Free Zone Company Formation in 2025',
    excerpt: 'Everything you need to know about setting up a company in Dubai\'s free zones, including costs, requirements, and the best zones for your business type.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    date: 'December 4, 2025',
    category: 'Company Formation',
    readTime: '8 min read',
  },
  {
    id: '2',
    slug: 'dubai-mainland-vs-free-zone-comparison-which-right-business',
    title: 'Dubai Mainland vs Free Zone: Which is Right for Your Business?',
    excerpt: 'A comprehensive comparison of Dubai mainland and free zone company setup, including pros, cons, and key differences to help you make the right choice.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    date: 'December 4, 2025',
    category: 'Business Setup',
    readTime: '10 min read',
  },
  {
    id: '3',
    slug: 'uae-golden-visa-company-formation-qualify-residency',
    title: 'UAE Golden Visa: How Company Formation Can Help You Qualify',
    excerpt: 'Learn how setting up a company in Dubai can help you qualify for the UAE Golden Visa, offering long-term residency and business opportunities.',
    image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&h=600&fit=crop',
    date: 'December 4, 2025',
    category: 'Visas & Residency',
    readTime: '6 min read',
  },
  {
    id: '4',
    slug: 'top-5-dubai-free-zones-ecommerce-businesses-2025',
    title: 'Top 5 Dubai Free Zones for E-commerce Businesses in 2025',
    excerpt: 'Discover the best free zones in Dubai for e-commerce businesses, including setup costs, benefits, and which zone offers the best value for online retailers.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    date: 'December 4, 2025',
    category: 'Free Zones',
    readTime: '7 min read',
  },
  {
    id: '5',
    slug: 'dubai-company-formation-costs-breakdown-2025-pricing',
    title: 'Dubai Company Formation Costs: Complete Breakdown for 2025',
    excerpt: 'Get a detailed breakdown of all costs involved in setting up a company in Dubai, including hidden fees, government charges, and ongoing expenses.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
    date: 'December 4, 2025',
    category: 'Costs & Pricing',
    readTime: '9 min read',
  },
  {
    id: '6',
    slug: 'how-open-business-bank-account-dubai-step-by-step-guide',
    title: 'How to Open a Business Bank Account in Dubai: Step-by-Step Guide',
    excerpt: 'A practical guide to opening a business bank account in Dubai, including required documents, best banks, and common challenges to avoid.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop',
    date: 'December 4, 2025',
    category: 'Banking',
    readTime: '8 min read',
  },
  {
    id: '7',
    slug: 'dubai-tax-benefits-entrepreneurs-choose-uae-company-setup',
    title: 'Dubai Tax Benefits: Why Entrepreneurs Choose the UAE',
    excerpt: 'Explore the tax advantages of setting up a company in Dubai, including zero corporate tax, personal income tax benefits, and double taxation treaties.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    date: 'December 4, 2025',
    category: 'Tax & Compliance',
    readTime: '7 min read',
  },
  {
    id: '8',
    slug: 'spc-free-zone-dubai-everything-need-know-setup-costs',
    title: 'SPC Free Zone: Everything You Need to Know',
    excerpt: 'An in-depth look at SPC Free Zone, one of Dubai\'s most cost-effective free zones, including setup process, costs, and business activities allowed.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    date: 'December 4, 2025',
    category: 'Free Zones',
    readTime: '6 min read',
  },
  {
    id: '9',
    slug: 'dubai-company-formation-tech-startups-complete-guide',
    title: 'Dubai Company Formation for Tech Startups: Complete Guide',
    excerpt: 'Special considerations for tech startups setting up in Dubai, including free zone recommendations, visa options, and funding opportunities.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
    date: 'December 4, 2025',
    category: 'Startups',
    readTime: '9 min read',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-pearl-white">
      {/* Hero Section */}
      <section className="bg-valtora-navy text-pearl-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Dubai Company Formation Insights
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Expert guides, industry updates, and practical advice for entrepreneurs setting up businesses in Dubai and the UAE.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-emirati-gold text-carbon-black px-3 py-1 rounded-full text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <time dateTime={post.date}>{post.date}</time>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h2 className="font-serif text-xl md:text-2xl text-valtora-navy mb-3 font-semibold line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-emirati-gold font-semibold text-sm group">
                        <span>Read More</span>
                        <svg
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-desert-sand">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-valtora-navy mb-4">
              Ready to Start Your Dubai Company?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Get an instant quote and see transparent pricing for your Dubai company formation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="btn-primary text-lg px-8 py-4 inline-block text-center"
              >
                Get Your Instant Quote
              </Link>
              <Link
                href="/"
                className="btn-secondary text-lg px-8 py-4 inline-block text-center"
              >
                Calculate Your Cost
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

