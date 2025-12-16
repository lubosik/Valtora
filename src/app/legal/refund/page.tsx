export default function RefundPage() {
  return (
    <div className="min-h-screen bg-pearl-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl text-valtora-navy mb-8">Refund Policy</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="font-serif text-2xl text-valtora-navy mb-4">1. Deposit Refunds</h2>
              <p>
                Deposits (minimum AED 500) are fully refundable if you decide not to proceed 
                with your company formation before work has commenced. To request a refund, 
                please contact us within 7 days of payment.
              </p>
              <p className="mt-4">
                Once work has commenced (e.g., name reservation, document preparation, 
                authority submission), deposits become non-refundable as they cover costs 
                already incurred.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-valtora-navy mb-4">2. Full Payment Refunds</h2>
              <p>
                Full payments are refundable only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>If your application is rejected by the authority due to our error</li>
                <li>If we are unable to proceed due to circumstances within our control</li>
                <li>If you cancel before work commences (subject to administrative fees)</li>
              </ul>
              <p className="mt-4">
                Refunds are not available if your application is rejected due to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Incomplete or inaccurate information provided by you</li>
                <li>Failure to provide required documents</li>
                <li>Regulatory changes or authority requirements beyond our control</li>
                <li>Nationality-based restrictions or special approval requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-valtora-navy mb-4">3. Processing Fees</h2>
              <p>
                Refunds may be subject to administrative fees to cover costs already incurred, 
                including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Payment processing fees (typically 2-3%)</li>
                <li>Document preparation costs</li>
                <li>Name reservation fees (if already processed)</li>
                <li>Administrative overhead</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-valtora-navy mb-4">4. Refund Processing Time</h2>
              <p>
                Approved refunds will be processed within 7-14 business days. Refunds will be 
                issued to the original payment method used. If the original payment method is 
                no longer available, alternative arrangements will be made.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-valtora-navy mb-4">5. Express Service Refunds</h2>
              <p>
                Express service fees are non-refundable once express processing has been 
                initiated, as these fees cover priority processing that cannot be reversed.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-valtora-navy mb-4">6. Add-On Services</h2>
              <p>
                Refunds for add-on services (accounting, corporate tax registration, etc.) 
                are subject to the terms of those specific services and may vary. Please 
                contact us for details on specific add-on refund policies.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-valtora-navy mb-4">7. How to Request a Refund</h2>
              <p>
                To request a refund, please contact us:
              </p>
              <p className="mt-4">
                <strong>Valtora Company Formations</strong><br />
                Dubai Office – Unit No: RET-R5-185<br />
                Jumeirah Lakes Towers<br />
                Dubai, United Arab Emirates<br />
                Phone: +1 812 551 3945<br />
                Email: [Contact email to be added]<br />
                WhatsApp: <a href="https://wa.me/18125513945" className="text-oasis-blue hover:underline">+1 812 551 3945</a>
              </p>
              <p className="mt-4">
                Please include your enquiry ID, payment reference, and reason for refund 
                request. We will review your request and respond within 5 business days.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-valtora-navy mb-4">8. Disputes</h2>
              <p>
                If you are not satisfied with our refund decision, you may contact us to 
                discuss your case. We are committed to fair resolution of all disputes.
              </p>
            </section>

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This is placeholder content. Please have this Refund Policy 
                reviewed and customized by a legal professional before going live.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

