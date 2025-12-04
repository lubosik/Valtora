export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-pearl-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl text-valtora-navy mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="font-serif text-2xl text-valtora-navy mb-4">1. Introduction</h2>
              <p>
                Valtora Company Formations ("we," "our," or "us") is committed to protecting your 
                privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard 
                your information when you use our services and website.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-valtora-navy mb-4">2. Information We Collect</h2>
              <p>We collect information that you provide directly to us, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Personal information (name, email, phone, nationality, date of birth)</li>
                <li>Business information (company details, business activities, trade names)</li>
                <li>Documentation (passports, visas, proof of address, photos)</li>
                <li>Payment information (processed securely through Stripe)</li>
                <li>Communication records (emails, WhatsApp messages, phone calls)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-valtora-navy mb-4">3. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Process your company formation application</li>
                <li>Communicate with you about your application</li>
                <li>Submit documents to UAE authorities on your behalf</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send you updates about your application status</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Improve our services and website</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-valtora-navy mb-4">4. Information Sharing</h2>
              <p>
                We share your information only as necessary to provide our services:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>With UAE free zones and mainland authorities for company registration</li>
                <li>With government agencies for visa processing</li>
                <li>With payment processors (Stripe) for payment processing</li>
                <li>With service providers who assist us (CRM systems, email services)</li>
                <li>When required by law or to protect our rights</li>
              </ul>
              <p className="mt-4">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-valtora-navy mb-4">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your 
                information against unauthorized access, alteration, disclosure, or destruction. 
                However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-valtora-navy mb-4">6. Data Retention</h2>
              <p>
                We retain your information for as long as necessary to provide our services, 
                comply with legal obligations, resolve disputes, and enforce our agreements. 
                Some information may be retained longer as required by UAE law.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-valtora-navy mb-4">7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
                <li>Object to processing of your information</li>
                <li>Request data portability</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us using the information below.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-valtora-navy mb-4">8. Cookies & Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to improve your experience, 
                analyze usage, and assist with marketing efforts. You can control cookies 
                through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-valtora-navy mb-4">9. Contact Us</h2>
              <p>
                For questions about this Privacy Policy or to exercise your rights, contact us at:
              </p>
              <p className="mt-2">
                <strong>Valtora Company Formations</strong><br />
                Dubai Office – Unit No: RET-R5-185<br />
                Jumeirah Lakes Towers<br />
                Dubai, United Arab Emirates<br />
                Phone: +44 739 396 1000<br />
                Email: [Contact email to be added]
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-valtora-navy mb-4">10. Updates to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on 
                this page with an updated revision date. Your continued use of our services 
                constitutes acceptance of the updated policy.
              </p>
            </section>

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This is placeholder content. Please have this Privacy Policy 
                reviewed and customized by a legal professional, ensuring compliance with GDPR, 
                UAE data protection laws, and other applicable regulations before going live.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

