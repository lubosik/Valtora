'use client'

import { useRef } from 'react'
import WhatsAppLink from './WhatsAppLink'

interface HeroProps {
  onCalculateClick: () => void
}

export default function Hero({ onCalculateClick }: HeroProps) {
  return (
    <section className="relative bg-valtora-navy text-pearl-white overflow-hidden">
      {/* Background overlay - can be replaced with actual image */}
      <div className="absolute inset-0 bg-gradient-to-br from-valtora-navy via-valtora-navy to-carbon-black opacity-90"></div>
      
      {/* Optional: Add background image here */}
      {/* <div className="absolute inset-0 bg-[url('/dubai-skyline.jpg')] bg-cover bg-center opacity-20"></div> */}
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance">
            Open Your Dubai Company in 60 Seconds —{' '}
            <span className="text-emirati-gold block sm:inline">Transparent Free Zone & Mainland Pricing</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
            Get an instant cost breakdown including licences, visas, and government fees, with expert support from Dubai-based specialists.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 justify-center items-stretch sm:items-center mb-10 sm:mb-12 px-2">
            <button
              onClick={onCalculateClick}
              className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 w-full sm:w-auto"
            >
              Calculate My Cost
            </button>
            
            <WhatsAppLink
              href="https://wa.me/447393961000?text=Hi%20Valtora%2C%20I%27d%20like%20to%20discuss%20company%20formation%20in%20Dubai."
              className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 w-full sm:w-auto text-center"
              location="hero"
            >
              Talk to an Expert on WhatsApp
            </WhatsAppLink>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm md:text-base px-4">
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
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-700">
            <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">Registered partners with leading UAE authorities:</p>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 opacity-70 text-xs sm:text-sm">
              <span className="text-sm">SPC</span>
              <span className="text-sm">Meydan</span>
              <span className="text-sm">IFZA</span>
              <span className="text-sm">DMCC</span>
              <span className="text-sm">RAKEZ</span>
              <span className="text-sm">Dubai Mainland</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

