'use client'

import Link from 'next/link'
import Image from 'next/image'
import { caseStudies } from '@/content/case-studies'
import type { CaseStudy } from '@/content/case-studies'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
  onCTAClick: () => void
}

function CaseStudyCard({ caseStudy, onCTAClick }: CaseStudyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Case Study Image */}
      {caseStudy.imageUrl ? (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={caseStudy.imageUrl}
            alt={caseStudy.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-valtora-navy to-carbon-black flex items-center justify-center">
          <div className="text-center text-pearl-white">
            <svg className="w-16 h-16 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm opacity-75">Case Study</p>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Route Badge */}
        <div className="mb-3">
          <span className="inline-block bg-emirati-gold/10 text-emirati-gold px-3 py-1 rounded-full text-xs font-semibold">
            {caseStudy.recommendedRoute}
            {caseStudy.specificZone && ` • ${caseStudy.specificZone}`}
          </span>
        </div>

        <h3 className="font-serif text-xl md:text-2xl text-valtora-navy mb-3">
          {caseStudy.title}
        </h3>

        <div className="space-y-3 mb-4">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Client Type
            </p>
            <p className="text-sm text-gray-700">{caseStudy.clientType}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Objective
            </p>
            <p className="text-sm text-gray-700">{caseStudy.objective}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Timeline
            </p>
            <p className="text-sm text-gray-700 font-medium">{caseStudy.timeline}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              What We Handled
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              {caseStudy.servicesHandled.map((service, index) => (
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
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Outcome
            </p>
            <p className="text-sm text-gray-700">{caseStudy.outcome}</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onCTAClick}
          className="btn-primary w-full py-3 text-sm font-semibold"
        >
          Get a Similar Setup Recommendation
        </button>
      </div>
    </div>
  )
}

export default function CaseStudiesSection() {
  const scrollToHeroForm = () => {
    // Scroll to hero form on homepage
    const heroSection = document.querySelector('section[class*="bg-valtora-navy"]')
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      // Fallback: scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <section className="section-spacing bg-desert-sand">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-valtora-navy mb-4 text-balance">
              Case Studies
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed px-4">
              Real examples of how we've helped businesses establish their presence in Dubai
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard
                key={caseStudy.id}
                caseStudy={caseStudy}
                onCTAClick={scrollToHeroForm}
              />
            ))}
          </div>

          {/* Link to full case studies page */}
          <div className="text-center">
            <Link
              href="/case-studies"
              className="text-emirati-gold hover:text-emirati-gold-hover font-semibold text-sm underline underline-offset-4 transition-colors"
            >
              View All Case Studies →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
