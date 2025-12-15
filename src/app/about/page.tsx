import { founderContent } from '@/content/founder'
import { aboutContent } from '@/content/about'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-pearl-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-valtora-navy mb-4">
              About Valtora
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {aboutContent.tagline}
            </p>
          </div>

          {/* Story Section */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl text-valtora-navy mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>{aboutContent.story}</p>
              <p>{aboutContent.currentStatus}</p>
              <p>
                We're registered partners with leading UAE free zones including{' '}
                {aboutContent.partners.slice(0, 5).join(', ')} and more, giving you access 
                to the best options for your business needs.
              </p>
            </div>
          </section>

          {/* Founder's Note Section */}
          <section className="mb-12 p-8 bg-white rounded-lg shadow-lg border border-gray-200">
            <h2 className="font-serif text-3xl text-valtora-navy mb-6">Founder's Note</h2>
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              {/* Founder Portrait Placeholder */}
              <div className="flex-shrink-0">
                {founderContent.imageUrl ? (
                  <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-lg overflow-hidden">
                    <Image
                      src={founderContent.imageUrl}
                      alt={founderContent.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-lg bg-gradient-to-br from-valtora-navy to-carbon-black flex items-center justify-center">
                    <div className="text-center text-pearl-white">
                      <svg
                        className="w-20 h-20 mx-auto mb-2 opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <p className="text-sm opacity-75">Founder Portrait</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Founder Content */}
              <div className="flex-1">
                <div className="mb-4">
                  <h3 className="font-serif text-2xl text-valtora-navy mb-1">
                    {founderContent.name}
                  </h3>
                  <p className="text-sm text-gray-600">{founderContent.title}</p>
                  {founderContent.yearsExperience && (
                    <p className="text-sm text-gray-500 mt-1">
                      {founderContent.yearsExperience}+ years of experience
                    </p>
                  )}
                </div>

                <div className="text-gray-700 space-y-4">
                  <p className="leading-relaxed">{founderContent.background}</p>
                  <p className="leading-relaxed">{founderContent.whyValtora}</p>
                  <p className="leading-relaxed font-medium text-valtora-navy">
                    {founderContent.commitment}
              </p>
                </div>

                {/* Credentials */}
                {founderContent.credentials && founderContent.credentials.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Credentials:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {founderContent.credentials.map((credential, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <svg
                            className="w-4 h-4 text-emirati-gold mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{credential}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Licences & Certifications */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl text-valtora-navy mb-6">Licences & Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-lg border border-gray-200">
                <h3 className="font-semibold text-valtora-navy mb-2">Registered Service Provider</h3>
                <p className="text-sm text-gray-600">
                  Licensed and registered with multiple UAE free zones and mainland authorities
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg border border-gray-200">
                <h3 className="font-semibold text-valtora-navy mb-2">Compliance Certified</h3>
                <p className="text-sm text-gray-600">
                  Adheres to all UAE regulations and compliance requirements
                </p>
              </div>
            </div>
          </section>

          {/* Sample Licences */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl text-valtora-navy mb-6">Companies We've Helped</h2>
            <p className="text-gray-700 mb-6">
              We've successfully registered companies across various industries and free zones. 
              Here are some examples of the types of licences we've secured (anonymized for privacy):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { type: 'Tech Startup', zone: 'SPC', category: 'Technology Services' },
                { type: 'E-commerce', zone: 'IFZA', category: 'Online Trading' },
                { type: 'Consultancy', zone: 'Meydan', category: 'Business Consulting' },
                { type: 'Trading', zone: 'DMCC', category: 'General Trading' },
                { type: 'Media', zone: 'SPC', category: 'Digital Media' },
                { type: 'Crypto', zone: 'DMCC', category: 'Blockchain Services' },
              ].map((example, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                  <p className="font-semibold text-valtora-navy text-sm mb-1">{example.type}</p>
                  <p className="text-xs text-gray-600">{example.zone}</p>
                  <p className="text-xs text-gray-500 mt-1">{example.category}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Case Studies */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl text-valtora-navy mb-6">Case Studies</h2>
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-lg border border-gray-200">
                <h3 className="font-semibold text-valtora-navy mb-2">Fast-Track Tech Startup</h3>
                <p className="text-sm text-gray-700 mb-3">
                  A UK-based tech startup needed to establish a presence in Dubai quickly to 
                  serve Middle Eastern clients. We recommended SPC free zone for its speed and 
                  flexibility, completed setup in 5 days with express service, and assisted 
                  with bank account opening.
                </p>
                <p className="text-xs text-gray-600">
                  Result: Company operational within 2 weeks, first client onboarded within a month.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg border border-gray-200">
                <h3 className="font-semibold text-valtora-navy mb-2">E-commerce Expansion</h3>
                <p className="text-sm text-gray-700 mb-3">
                  An established e-commerce business wanted to expand into the UAE market. 
                  We helped them choose IFZA for cost-effectiveness, set up the company with 
                  3 visas, and provided ongoing accounting support for VAT compliance.
                </p>
                <p className="text-xs text-gray-600">
                  Result: Cost-effective setup, seamless expansion, full compliance maintained.
                </p>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl text-valtora-navy mb-6">Client Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-emirati-gold/20 rounded-full flex items-center justify-center">
                    <span className="text-emirati-gold font-semibold">JD</span>
                  </div>
                  <div>
                    <p className="font-semibold text-valtora-navy">John D.</p>
                    <p className="text-sm text-gray-600">Tech Startup Founder</p>
                  </div>
                </div>
                <p className="text-gray-700 italic text-sm">
                  "Valtora made the entire process seamless. Clear pricing, expert guidance, 
                  and my company was set up faster than expected. The team was responsive 
                  throughout."
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-emirati-gold/20 rounded-full flex items-center justify-center">
                    <span className="text-emirati-gold font-semibold">SM</span>
                  </div>
                  <div>
                    <p className="font-semibold text-valtora-navy">Sarah M.</p>
                    <p className="text-sm text-gray-600">E-commerce Business Owner</p>
                  </div>
                </div>
                <p className="text-gray-700 italic text-sm">
                  "The calculator gave me instant clarity on costs. The team was professional, 
                  handled everything efficiently, and I felt supported every step of the way."
                </p>
              </div>
            </div>
          </section>

          {/* Partnership Logos */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl text-valtora-navy mb-6">Our Partners</h2>
            <p className="text-gray-700 mb-6">
              We're registered partners with leading UAE authorities and free zones:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {aboutContent.partners.map((partner) => (
                <div key={partner} className="p-4 bg-white rounded-lg border border-gray-200 text-center">
                  <p className="font-semibold text-valtora-navy">{partner}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="p-8 bg-valtora-navy text-pearl-white rounded-lg text-center">
            <h2 className="font-serif text-2xl mb-4">Ready to Start Your Dubai Company?</h2>
            <p className="text-gray-300 mb-6">
              Get an instant quote and see how we can help you establish your business in Dubai.
            </p>
            <Link
              href="/"
              className="btn-primary inline-block"
            >
              Get Your Instant Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

