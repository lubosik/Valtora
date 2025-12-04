import Link from 'next/link'

export default function SecondaryCTASection() {
  return (
    <section className="section-spacing bg-valtora-navy text-pearl-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 text-balance px-4">
            Start Your Dubai Company Today
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Get started with a low-commitment deposit or request a detailed pricing PDF delivered to your email.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center px-4">
            <Link
              href="/checkout?type=deposit"
              className="btn-primary text-lg px-8 py-4 w-full sm:w-auto"
            >
              Open Your Company Today for AED 500 Deposit
            </Link>
            
            <button
              className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto"
              onClick={() => {
                // Placeholder for email PDF request - will be implemented later
                alert('PDF request feature will be implemented in a future phase')
              }}
            >
              Get Full Pricing PDF by Email
            </button>
          </div>

          <p className="text-sm text-gray-400 mt-6">
            Deposit is fully refundable if you decide not to proceed. No obligations.
          </p>
        </div>
      </div>
    </section>
  )
}

