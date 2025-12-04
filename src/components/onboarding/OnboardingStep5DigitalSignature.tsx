'use client'

interface OnboardingStep5DigitalSignatureProps {
  data: {
    customerServiceAgreementSigned: boolean
    kycFormSigned: boolean
    powerOfAttorneySigned: boolean
    signatureName: string
    signatureDate: string
  }
  updateData: (updates: Partial<typeof data>) => void
  onSubmit: () => void
}

export default function OnboardingStep5DigitalSignature({
  data,
  updateData,
  onSubmit,
}: OnboardingStep5DigitalSignatureProps) {
  const today = new Date().toISOString().split('T')[0]

  return (
    <div>
      <h2 className="font-serif text-3xl text-valtora-navy mb-2">Digital Signatures & Agreements</h2>
      <p className="text-gray-600 mb-6">
        Please review and sign the following agreements. Your signature confirms that you have read and agree to the terms.
      </p>

      <div className="space-y-6">
        {/* Customer Service Agreement */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-start gap-4 mb-4">
            <input
              type="checkbox"
              id="customerServiceAgreement"
              checked={data.customerServiceAgreementSigned}
              onChange={(e) => updateData({ customerServiceAgreementSigned: e.target.checked })}
              className="mt-1 w-5 h-5 text-emirati-gold border-gray-300 rounded focus:ring-emirati-gold"
              required
            />
            <div className="flex-1">
              <label htmlFor="customerServiceAgreement" className="font-semibold text-valtora-navy cursor-pointer">
                Customer Service Agreement <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mt-1">
                I agree to the terms and conditions of Valtora's customer service agreement, including service fees, timelines, and responsibilities.
              </p>
              <a
                href="/legal/terms"
                target="_blank"
                className="text-xs text-oasis-blue hover:underline mt-2 inline-block"
              >
                View full agreement →
              </a>
            </div>
          </div>
        </div>

        {/* KYC Form */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-start gap-4 mb-4">
            <input
              type="checkbox"
              id="kycForm"
              checked={data.kycFormSigned}
              onChange={(e) => updateData({ kycFormSigned: e.target.checked })}
              className="mt-1 w-5 h-5 text-emirati-gold border-gray-300 rounded focus:ring-emirati-gold"
              required
            />
            <div className="flex-1">
              <label htmlFor="kycForm" className="font-semibold text-valtora-navy cursor-pointer">
                KYC (Know Your Customer) Form <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mt-1">
                I confirm that all information provided is accurate and complete. I understand that false information may result in application rejection.
              </p>
              <a
                href="/legal/privacy"
                target="_blank"
                className="text-xs text-oasis-blue hover:underline mt-2 inline-block"
              >
                View privacy policy →
              </a>
            </div>
          </div>
        </div>

        {/* Power of Attorney (Optional) */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-start gap-4 mb-4">
            <input
              type="checkbox"
              id="powerOfAttorney"
              checked={data.powerOfAttorneySigned}
              onChange={(e) => updateData({ powerOfAttorneySigned: e.target.checked })}
              className="mt-1 w-5 h-5 text-emirati-gold border-gray-300 rounded focus:ring-emirati-gold"
            />
            <div className="flex-1">
              <label htmlFor="powerOfAttorney" className="font-semibold text-valtora-navy cursor-pointer">
                Power of Attorney (Optional)
              </label>
              <p className="text-sm text-gray-600 mt-1">
                Grant Valtora power of attorney to act on your behalf for company formation matters. This is optional but can speed up the process.
              </p>
            </div>
          </div>
        </div>

        {/* Signature Section */}
        <div className="border border-gray-200 rounded-lg p-6 bg-pearl-white">
          <h3 className="font-semibold text-valtora-navy mb-4">Digital Signature</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="signatureName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name (as signature) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="signatureName"
                value={data.signatureName}
                onChange={(e) => updateData({ signatureName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emirati-gold focus:border-emirati-gold outline-none"
                placeholder="Type your full name to sign"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                By typing your name, you are creating a legally binding digital signature
              </p>
            </div>

            <div>
              <label htmlFor="signatureDate" className="block text-sm font-medium text-gray-700 mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="signatureDate"
                value={data.signatureDate || today}
                onChange={(e) => updateData({ signatureDate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emirati-gold focus:border-emirati-gold outline-none"
                max={today}
                required
              />
            </div>
          </div>
        </div>

        {/* Final Confirmation */}
        <div className="p-4 bg-emirati-gold/10 border border-emirati-gold/30 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Important:</strong> By submitting this form, you confirm that all information is accurate and that you agree to all terms and conditions. 
            Your application will be processed upon submission.
          </p>
        </div>
      </div>
    </div>
  )
}

