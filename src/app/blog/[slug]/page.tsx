import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { generatePageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

interface BlogPost {
  id: string
  slug: string
  title: string
  content: string
  excerpt: string
  image: string
  date: string
  category: string
  readTime: string
  author: string
}

const blogPosts: Record<string, BlogPost> = {
  'dubai-free-zone-company-formation-guide-2025': {
    id: '1',
    slug: 'dubai-free-zone-company-formation-guide-2025',
    title: 'Complete Guide to Dubai Free Zone Company Formation in 2025',
    excerpt: 'Everything you need to know about setting up a company in Dubai\'s free zones, including costs, requirements, and the best zones for your business type.',
    content: `
      <h2>Introduction to Dubai Free Zones</h2>
      <p>Dubai's free zones have become a magnet for international entrepreneurs seeking to establish their businesses in one of the world's most dynamic economic hubs. With over 30 free zones offering various benefits, choosing the right one can be overwhelming.</p>
      
      <h2>What Are Free Zones?</h2>
      <p>Free zones in Dubai are designated areas that offer businesses 100% foreign ownership, tax exemptions, and streamlined setup processes. Each free zone caters to specific industries and business activities, making it crucial to select the one that aligns with your business needs.</p>
      
      <h2>Key Benefits of Free Zone Setup</h2>
      <ul>
        <li><strong>100% Foreign Ownership:</strong> Unlike mainland companies, free zone entities allow complete foreign ownership without the need for a local sponsor.</li>
        <li><strong>Tax Exemptions:</strong> Most free zones offer corporate and personal income tax exemptions, making them attractive for international businesses.</li>
        <li><strong>Streamlined Processes:</strong> Free zones typically offer faster setup times, often completing company formation in 7-14 days.</li>
        <li><strong>Flexible Office Options:</strong> From virtual offices to flexi-desks and full office spaces, free zones offer various workspace solutions.</li>
      </ul>
      
      <h2>Top Free Zones for Different Business Types</h2>
      <p>Each free zone has its strengths. SPC Free Zone is ideal for cost-conscious startups, while DMCC excels in commodities trading. IFZA offers flexibility for various business activities, and Meydan is perfect for service-based companies.</p>
      
      <h2>Setup Process Overview</h2>
      <p>The typical free zone setup process involves: choosing your business activity, selecting an office package, submitting required documents, obtaining approvals, and receiving your trade license. Most free zones offer online application systems to streamline this process.</p>
      
      <h2>Conclusion</h2>
      <p>Setting up a company in a Dubai free zone offers numerous advantages for international entrepreneurs. With proper guidance and understanding of the requirements, you can establish your business efficiently and start operating in one of the world's most business-friendly environments.</p>
    `,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&h=600&fit=crop',
    date: 'December 3, 2024',
    category: 'Company Formation',
    readTime: '8 min read',
    author: 'Valtora Team',
  },
  'dubai-mainland-vs-free-zone-comparison-which-right-business': {
    id: '2',
    slug: 'dubai-mainland-vs-free-zone-comparison-which-right-business',
    title: 'Dubai Mainland vs Free Zone: Which is Right for Your Business?',
    excerpt: 'A comprehensive comparison of Dubai mainland and free zone company setup, including pros, cons, and key differences to help you make the right choice.',
    content: `
      <h2>Understanding the Key Differences</h2>
      <p>Choosing between Dubai mainland and free zone setup is one of the most critical decisions you'll make when establishing your business in the UAE. Each option offers distinct advantages and limitations.</p>
      
      <h2>Mainland Company Setup</h2>
      <p>Mainland companies allow you to trade directly with the local UAE market, bid on government contracts, and operate anywhere in the UAE. However, they typically require a local sponsor (51% ownership) or a local service agent, depending on your business activity.</p>
      
      <h2>Free Zone Company Setup</h2>
      <p>Free zone companies offer 100% foreign ownership, tax benefits, and streamlined processes. However, they're generally limited to operating within the free zone or conducting business internationally, with restrictions on direct local market access.</p>
      
      <h2>Making the Right Choice</h2>
      <p>Consider your target market, business activities, budget, and long-term goals when making this decision. Our team can help you evaluate which option best suits your specific needs.</p>
    `,
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73a6e?w=1200&h=600&fit=crop',
    date: 'November 28, 2024',
    category: 'Business Setup',
    readTime: '10 min read',
    author: 'Valtora Team',
  },
  'uae-golden-visa-company-formation-qualify-residency': {
    id: '3',
    slug: 'uae-golden-visa-company-formation-qualify-residency',
    title: 'UAE Golden Visa: How Company Formation Can Help You Qualify',
    excerpt: 'Learn how setting up a company in Dubai can help you qualify for the UAE Golden Visa, offering long-term residency and business opportunities.',
    content: `<h2>Introduction to UAE Golden Visa</h2><p>The UAE Golden Visa is a long-term residency program that offers entrepreneurs and investors extended stay in the country. Setting up a company in Dubai can be a pathway to qualifying for this prestigious visa.</p><h2>Benefits of Golden Visa</h2><p>The Golden Visa offers 5-10 year residency permits, allowing you to live, work, and study in the UAE without a sponsor. It also provides access to world-class healthcare and education facilities.</p><h2>How Company Formation Helps</h2><p>Establishing a business in Dubai with a minimum investment can qualify you for the Golden Visa. The requirements vary based on your business type and investment amount.</p>`,
    image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=1200&h=600&fit=crop',
    date: 'November 22, 2024',
    category: 'Visas & Residency',
    readTime: '6 min read',
    author: 'Valtora Team',
  },
  'top-5-dubai-free-zones-ecommerce-businesses-2025': {
    id: '4',
    slug: 'top-5-dubai-free-zones-ecommerce-businesses-2025',
    title: 'Top 5 Dubai Free Zones for E-commerce Businesses in 2025',
    excerpt: 'Discover the best free zones in Dubai for e-commerce businesses, including setup costs, benefits, and which zone offers the best value for online retailers.',
    content: `<h2>E-commerce in Dubai</h2><p>Dubai's strategic location and excellent logistics infrastructure make it an ideal base for e-commerce businesses serving the Middle East, Africa, and Asia.</p><h2>Top Free Zones for E-commerce</h2><p>SPC, IFZA, and DMCC are among the most popular choices for e-commerce businesses, offering competitive pricing and flexible office solutions.</p>`,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
    date: 'November 15, 2024',
    category: 'Free Zones',
    readTime: '7 min read',
    author: 'Valtora Team',
  },
  'dubai-company-formation-costs-breakdown-2025-pricing': {
    id: '5',
    slug: 'dubai-company-formation-costs-breakdown-2025-pricing',
    title: 'Dubai Company Formation Costs: Complete Breakdown for 2025',
    excerpt: 'Get a detailed breakdown of all costs involved in setting up a company in Dubai, including hidden fees, government charges, and ongoing expenses.',
    content: `<h2>Understanding Total Costs</h2><p>When budgeting for your Dubai company formation, it's essential to understand all costs involved, not just the initial setup fee.</p><h2>Initial Setup Costs</h2><p>These include trade license fees, registration charges, and professional service fees. Costs vary significantly between free zones and mainland.</p><h2>Ongoing Costs</h2><p>Annual license renewals, office rent, visa processing, and other recurring expenses should be factored into your budget.</p>`,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop',
    date: 'November 8, 2024',
    category: 'Costs & Pricing',
    readTime: '9 min read',
    author: 'Valtora Team',
  },
  'how-open-business-bank-account-dubai-step-by-step-guide': {
    id: '6',
    slug: 'how-open-business-bank-account-dubai-step-by-step-guide',
    title: 'How to Open a Business Bank Account in Dubai: Step-by-Step Guide',
    excerpt: 'A practical guide to opening a business bank account in Dubai, including required documents, best banks, and common challenges to avoid.',
    content: `<h2>Banking in Dubai</h2><p>Opening a business bank account in Dubai can be challenging, but with the right preparation and documentation, the process can be streamlined.</p><h2>Required Documents</h2><p>Banks typically require trade license, company registration documents, shareholder passports, proof of address, and business plan.</p>`,
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=600&fit=crop',
    date: 'November 1, 2024',
    category: 'Banking',
    readTime: '8 min read',
    author: 'Valtora Team',
  },
  'dubai-tax-benefits-entrepreneurs-choose-uae-company-setup': {
    id: '7',
    slug: 'dubai-tax-benefits-entrepreneurs-choose-uae-company-setup',
    title: 'Dubai Tax Benefits: Why Entrepreneurs Choose the UAE',
    excerpt: 'Explore the tax advantages of setting up a company in Dubai, including zero corporate tax, personal income tax benefits, and double taxation treaties.',
    content: `<h2>Tax Advantages</h2><p>Dubai offers one of the most attractive tax environments globally, with zero corporate and personal income tax in most free zones.</p><h2>Double Taxation Treaties</h2><p>The UAE has signed numerous double taxation treaties, helping businesses avoid paying tax twice on the same income.</p>`,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
    date: 'October 25, 2024',
    category: 'Tax & Compliance',
    readTime: '7 min read',
    author: 'Valtora Team',
  },
  'spc-free-zone-dubai-everything-need-know-setup-costs': {
    id: '8',
    slug: 'spc-free-zone-dubai-everything-need-know-setup-costs',
    title: 'SPC Free Zone: Everything You Need to Know',
    excerpt: 'An in-depth look at SPC Free Zone, one of Dubai\'s most cost-effective free zones, including setup process, costs, and business activities allowed.',
    content: `<h2>About SPC Free Zone</h2><p>SPC Free Zone is one of Dubai's most affordable free zones, making it ideal for startups and small businesses.</p><h2>Key Features</h2><p>SPC offers competitive pricing, flexible office solutions, and supports a wide range of business activities.</p>`,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&h=600&fit=crop',
    date: 'October 18, 2024',
    category: 'Free Zones',
    readTime: '6 min read',
    author: 'Valtora Team',
  },
  'dubai-company-formation-tech-startups-complete-guide': {
    id: '9',
    slug: 'dubai-company-formation-tech-startups-complete-guide',
    title: 'Dubai Company Formation for Tech Startups: Complete Guide',
    excerpt: 'Special considerations for tech startups setting up in Dubai, including free zone recommendations, visa options, and funding opportunities.',
    content: `<h2>Tech Startups in Dubai</h2><p>Dubai has become a hub for tech startups, offering excellent infrastructure, access to talent, and government support programs.</p><h2>Best Free Zones for Tech</h2><p>Free zones like DIFC, DMCC, and IFZA are popular among tech startups due to their modern infrastructure and business-friendly policies.</p>`,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop',
    date: 'October 11, 2024',
    category: 'Startups',
    readTime: '9 min read',
    author: 'Valtora Team',
  },
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts[params.slug]
  if (!post) {
    return {
      title: 'Blog Post Not Found | Valtora',
      description: 'The requested blog post could not be found.',
    }
  }

  return generatePageMetadata({
    title: `${post.title} | Valtora Blog`,
    description: post.excerpt,
    path: `/blog/${params.slug}`,
  })
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-pearl-white">
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-valtora-navy/90 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-8">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block bg-emirati-gold text-carbon-black px-3 py-1 rounded-full text-xs font-semibold mb-4">
              {post.category}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-pearl-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-200">
              <time dateTime={post.date}>{post.date}</time>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>By {post.author}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-serif prose-headings:text-valtora-navy
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-strong:text-valtora-navy
                prose-ul:text-gray-700 prose-li:text-gray-700
                prose-a:text-oasis-blue prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA Section */}
            <div className="mt-12 p-8 bg-desert-sand rounded-lg border border-emirati-gold/20">
              <h3 className="font-serif text-2xl text-valtora-navy mb-4">
                Ready to Start Your Dubai Company?
              </h3>
              <p className="text-gray-700 mb-6">
                Get an instant, transparent quote for your Dubai company formation. No hidden fees, expert support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/quote"
                  className="btn-primary text-center px-8 py-3"
                >
                  Get Your Instant Quote
                </Link>
                <Link
                  href="/"
                  className="btn-secondary text-center px-8 py-3"
                >
                  Calculate Your Cost
                </Link>
              </div>
            </div>

            {/* Back to Blog */}
            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center text-oasis-blue hover:text-valtora-navy transition-colors font-medium"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
