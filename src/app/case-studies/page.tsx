'use client'

import Link from 'next/link'
import Image from 'next/image'
import { caseStudies } from '@/content/case-studies'
import type { CaseStudy } from '@/content/case-studies'

function CaseStudyDetail({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <article className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden mb-8">
      {/* Case Study Image */}
      {caseStudy.imageUrl ? (
        <div className="relative h-64 overflow-hidden">
          <Image
            src={caseStudy.imageUrl}
            alt={caseStudy.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
      ) : (
        <div className="h-64 bg-gradient-to-br from-valtora-navy to-carbon-black flex items-center justify-center">
          <div className="text-center text-pearl-white">
            <svg className="w-20 h-20 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-base opacity-75">Case Study</p>
          </div>
        </div>
      )}

      <div className="p-6 md:p-8">
        {/* Route Badge */}
        <div className="mb-4">
          <span className="inline-block bg-emirati-gold/10 text-emirati-gold px-4 py-2 rounded-full text-sm font-semibold">
            {caseStudy.recommendedRoute}
            {caseStudy.specificZone && ` • ${caseStudy.specificZone}`}
          </span>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl text-valtora-navy mb-6">
          {caseStudy.title}
        </h1>

        <div className="prose prose-lg max-w-none space-y-6">
          <div>
            <h2 className="font-serif text-xl text-valtora-navy mb-2">Client Type</h2>
            <p className="text-gray-700">{caseStudy.clientType}</p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-valtora-navy mb-2">Objective</h2>
            <p className="text-gray-700">{caseStudy.objective}</p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-valtora-navy mb-2">Recommended Route</h2>
            <p className="text-gray-700">
              <strong>{caseStudy.recommendedRoute}</strong>
              {caseStudy.specificZone && ` - ${caseStudy.specificZone}`}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-valtora-navy mb-2">Timeline</h2>
            <p className="text-gray-700 font-medium">{caseStudy.timeline}</p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-valtora-navy mb-2">What Valtora Handled</h2>
            <ul className="text-gray-700 space-y-2">
              {caseStudy.servicesHandled.map((service, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-emirati-gold mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-xl text-valtora-navy mb-2">Outcome</h2>
            <p className="text-gray-700">{caseStudy.outcome}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 p-6 bg-desert-sand rounded-lg border border-emirati-gold/20">
          <h3 className="font-serif text-xl text-valtora-navy mb-3">
            Need a Similar Setup?
          </h3>
          <p className="text-gray-700 mb-4 text-sm">
            Get a personalized recommendation for your business setup in Dubai.
          </p>
          <Link
            href="/"
            className="btn-primary inline-block px-6 py-3 text-sm font-semibold"
          >
            Get My Setup Recommendation
          </Link>
        </div>
      </div>
    </article>
  )
}

export default function CaseStudiesPage() {
  const scrollToHeroForm = () => {
    // If on homepage, scroll to form; otherwise navigate to homepage
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      const heroSection = document.querySelector('section[class*="bg-valtora-navy"]')
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <div className="min-h-screen bg-pearl-white">
      {/* Hero Section */}
      <section className="bg-valtora-navy text-pearl-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Case Studies
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Real examples of how we've helped businesses establish their presence in Dubai
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies List */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {caseStudies.map((caseStudy) => (
              <CaseStudyDetail key={caseStudy.id} caseStudy={caseStudy} />
            ))}
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
              Get a personalized setup recommendation based on your business needs.
            </p>
            <Link
              href="/"
              className="btn-primary text-lg px-8 py-4 inline-block text-center"
            >
              Get My Setup Recommendation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
