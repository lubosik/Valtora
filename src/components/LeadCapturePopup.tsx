'use client'

import ValtoraLogo from './ValtoraLogo'
import LeadCaptureForm from './LeadCaptureForm'

interface LeadCapturePopupProps {
  onClose: () => void
}

export default function LeadCapturePopup({ onClose }: LeadCapturePopupProps) {
  const handleSuccess = () => {
    // Close popup after a delay to show success message
    // Success message is shown in the form component itself
    setTimeout(() => {
      onClose()
    }, 4000) // Increased to 4 seconds to allow user to see success message and WhatsApp CTA
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-carbon-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto mx-2 sm:mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 p-2"
          aria-label="Close"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side - Content & Form */}
          <div className="p-6 sm:p-8 md:p-12">
            <div className="mb-6">
              <ValtoraLogo width={140} height={45} />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-valtora-navy mb-3 text-balance">
              Get Your Dubai Company Setup Quote
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              Answer a few quick questions and get personalized setup options from our Dubai company formation specialists. 
              We&apos;ll help you choose the best route for your business and provide transparent pricing.
            </p>

            {/* MVP Form */}
            <LeadCaptureForm variant="popup" onSuccess={handleSuccess} />
          </div>

          {/* Right Side - Visual */}
          <div className="hidden md:block relative bg-gradient-to-br from-valtora-navy to-carbon-black rounded-r-lg overflow-hidden">
            {/* Placeholder for advisor image - can be replaced with actual image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-32 h-32 bg-emirati-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-16 h-16 text-emirati-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-pearl-white text-lg font-medium mb-2">Expert Advisor</p>
                <p className="text-gray-300 text-sm">
                  Our Dubai-based specialists are ready to help you navigate company formation
                </p>
              </div>
            </div>
            
            {/* Optional: Add actual advisor image here */}
            {/* <Image
              src="/advisor-image.jpg"
              alt="Valtora Advisor"
              fill
              className="object-cover"
            /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

