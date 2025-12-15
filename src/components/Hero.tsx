'use client'

import { useRef } from 'react'
import WhatsAppLink from './WhatsAppLink'
import LeadCaptureForm from './LeadCaptureForm'

interface HeroProps {
  onCalculateClick?: () => void
}

export default function Hero({ onCalculateClick }: HeroProps) {
  return (
    <section className="relative bg-valtora-navy text-pearl-white overflow-hidden">
      {/* Background overlay - can be replaced with actual image */}
      <div className="absolute inset-0 bg-gradient-to-br from-valtora-navy via-valtora-navy to-carbon-black opacity-90"></div>
      
      {/* Optional: Add background image here */}
      {/* <div className="absolute inset-0 bg-[url('/dubai-skyline.jpg')] bg-cover bg-center opacity-20"></div> */}
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Mobile: Stacked Layout */}
          <div className="lg:hidden">
            {/* Headline */}
            <div className="text-center mb-8">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight text-balance">
                Open Your Dubai Company in 60 Seconds —{' '}
                <span className="text-emirati-gold block sm:inline">Transparent Free Zone & Mainland Pricing</span>
              </h1>
              
              <p className="text-base sm:text-lg text-gray-200 mb-6 max-w-2xl mx-auto leading-relaxed">
                Get an instant cost breakdown including licences, visas, and government fees, with expert support from Dubai-based specialists.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs sm:text-sm mb-6">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emirati-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No hidden fees</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emirati-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Express service available</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emirati-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>4.9/5 Google Rating</span>
                </div>
              </div>
            </div>

            {/* Form - Above the fold on mobile */}
            <div className="mb-8">
              <LeadCaptureForm variant="hero" />
            </div>

          </div>

          {/* Desktop: Two-Column Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-12 items-start">
            {/* Left Column: Hero Copy */}
            <div className="flex flex-col justify-center">
              <h1 className="font-serif text-5xl xl:text-6xl font-bold mb-6 leading-tight text-balance">
                Open Your Dubai Company in 60 Seconds —{' '}
                <span className="text-emirati-gold">Transparent Free Zone & Mainland Pricing</span>
              </h1>
              
              <p className="text-lg xl:text-xl text-gray-200 mb-8 leading-relaxed">
                Get an instant cost breakdown including licences, visas, and government fees, with expert support from Dubai-based specialists.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emirati-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No hidden fees</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emirati-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Express service available</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emirati-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>4.9/5 Google Rating</span>
                </div>
              </div>

              {/* Authority Logos - Placeholder */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <p className="text-xs text-gray-400 mb-3">Registered partners with leading UAE authorities:</p>
                <div className="flex flex-wrap items-center gap-4 opacity-70 text-xs">
                  <span>SPC</span>
                  <span>Meydan</span>
                  <span>IFZA</span>
                  <span>DMCC</span>
                  <span>RAKEZ</span>
                  <span>Dubai Mainland</span>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="sticky top-8">
              <LeadCaptureForm variant="hero" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

