'use client'

import Link from 'next/link'

interface OnboardingStep6SuccessProps {
  enquiryId: string | null
}

export default function OnboardingStep6Success({ enquiryId }: OnboardingStep6SuccessProps) {
  return (
    <div className="text-center">
      <div className="w-20 h-20 bg-emirati-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-12 h-12 text-emirati-gold"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h2 className="font-serif text-4xl text-valtora-navy mb-4">
        Application Submitted Successfully!
      </h2>
      <p className="text-lg text-gray-700 mb-8">
        Thank you for completing the onboarding process. Your application is now being processed.
      </p>

      {enquiryId && (
        <div className="mb-8 p-4 bg-pearl-white border border-gray-200 rounded-lg inline-block">
          <p className="text-sm text-gray-600 mb-1">Your Application ID</p>
          <p className="font-mono font-semibold text-valtora-navy">{enquiryId}</p>
        </div>
      )}

      {/* Status Tracker */}
      <div className="max-w-2xl mx-auto mb-8">
        <h3 className="font-semibold text-valtora-navy mb-6">Application Status Timeline</h3>
        <div className="space-y-4">
          {[
            { step: 1, title: 'Details Received', status: 'completed', description: 'Your information has been received' },
            { step: 2, title: 'Name Reservation', status: 'pending', description: 'Company name will be reserved' },
            { step: 3, title: 'Application Submission', status: 'pending', description: 'Submitted to authority' },
            { step: 4, title: 'Licence Issued', status: 'pending', description: 'Trade licence will be issued' },
            { step: 5, title: 'Visa Processing', status: 'pending', description: 'Visa applications will be processed' },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                item.status === 'completed' 
                  ? 'bg-emirati-gold text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {item.status === 'completed' ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="font-medium">{item.step}</span>
                )}
              </div>
              <div className="flex-1 text-left">
                <p className={`font-medium ${
                  item.status === 'completed' ? 'text-valtora-navy' : 'text-gray-700'
                }`}>
                  {item.title}
                </p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="p-6 bg-pearl-white border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-valtora-navy mb-3">What Happens Next?</h3>
          <ul className="text-sm text-gray-700 space-y-2 text-left">
            <li className="flex items-start gap-2">
              <span className="text-emirati-gold mt-0.5">•</span>
              <span>Our team will review your documents and application within 24 hours</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emirati-gold mt-0.5">•</span>
              <span>We&apos;ll contact you if any additional information is needed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emirati-gold mt-0.5">•</span>
              <span>Your company name will be reserved with the chosen authority</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emirati-gold mt-0.5">•</span>
              <span>You&apos;ll receive regular updates on your application status</span>
            </li>
          </ul>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://wa.me/447393961000?text=Hi%20Valtora%2C%20I%20just%20completed%20my%20onboarding%20and%20would%20like%20to%20discuss%20next%20steps."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-1 text-center"
          >
            Chat with Support on WhatsApp
          </a>
          
          <Link
            href="/dashboard"
            className="btn-secondary flex-1 text-center"
          >
            View Dashboard
          </Link>
        </div>

        {/* Optional Upsell */}
        <div className="mt-6 p-4 bg-emirati-gold/10 border border-emirati-gold/30 rounded-lg">
          <p className="text-sm text-gray-700 mb-3">
            <strong>Optional:</strong> Add accounting services to your package for seamless financial management.
          </p>
          <button
            onClick={() => {
              // TODO: Implement accounting upsell
              alert('Accounting services upsell will be implemented later')
            }}
            className="text-sm text-oasis-blue hover:underline"
          >
            Learn more about accounting services →
          </button>
        </div>
      </div>
    </div>
  )
}

