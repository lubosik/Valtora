'use client'

import { useState } from 'react'
import Script from 'next/script'
import { generateFAQSchema } from '@/lib/seo'

interface FAQItem {
  question: string
  answer: string
}

const faqCategories = {
  costs: {
    title: 'Costs & Pricing',
    items: [
      {
        question: 'How much does it cost to set up a company in Dubai?',
        answer: 'Costs vary significantly based on several factors: the free zone or mainland option you choose, the number of visas required, office requirements, and any special activities. Our calculator provides instant, transparent quotes. Generally, free zone setups start from AED 7,500, while mainland setups typically start from AED 15,000. This includes licence fees, registration, and basic setup services.',
      },
      {
        question: 'Are there any hidden fees?',
        answer: 'No. Valtora provides completely transparent, all-inclusive pricing. What you see in your quote is what you pay. The only additional costs would be optional add-ons you choose (like express processing, accounting services, or corporate tax registration) or annual renewal fees, which are clearly disclosed upfront.',
      },
      {
        question: 'What is included in the base price?',
        answer: 'The base price includes: trade licence application and registration, company name reservation, initial consultation and guidance, document preparation assistance, and dedicated account manager support. Visa costs, office rent, and special activity fees are calculated separately and clearly shown in your quote.',
      },
      {
        question: 'Can I pay a deposit instead of the full amount?',
        answer: 'Yes! You can secure your quote with a refundable deposit of AED 500. This locks in your pricing and allows us to start the process. The remaining balance is due before licence issuance. If you decide not to proceed, the deposit is fully refundable.',
      },
    ],
  },
  visas: {
    title: 'Visa Requirements',
    items: [
      {
        question: 'How many visas can I get with my company?',
        answer: 'The number of visas depends on your chosen authority and office type. Most free zones offer 3-5 visas with basic packages, while mainland companies can typically get 10-20 visas. Some authorities offer more visas with dedicated office spaces. Our calculator will show you visa options based on your requirements.',
      },
      {
        question: 'Do I need to visit Dubai to get a visa?',
        answer: 'For most free zones, you can complete the initial company setup remotely. However, for visa processing, you will typically need to visit Dubai for medical examination, Emirates ID biometrics, and visa stamping. We can assist with entry permits and guide you through the entire process.',
      },
      {
        question: 'What is a UID and do I need one?',
        answer: 'UID (Unified Identification Number) is required for all individuals who will be shareholders or visa holders in a UAE company. If you haven\'t visited the UAE before, you\'ll need to obtain a UID. We can assist with entry permits and UID creation as part of our service.',
      },
      {
        question: 'How long does visa processing take?',
        answer: 'Standard visa processing takes 7-14 working days after all documents are submitted. Express processing can reduce this to 3-5 days for an additional fee. The timeline includes medical examination, Emirates ID application, and visa stamping.',
      },
    ],
  },
  timelines: {
    title: 'Timelines & Processing',
    items: [
      {
        question: 'How long does company formation take?',
        answer: 'Standard processing typically takes 7-14 business days depending on the authority. Express service can reduce this to 3-5 days. The timeline includes name reservation, document preparation, authority submission, and licence issuance. Delays can occur if additional approvals are needed or documents require clarification.',
      },
      {
        question: 'What is express processing?',
        answer: 'Express processing prioritizes your application and can reduce setup time by 3-5 days. It includes expedited name reservation, priority document review, and faster authority processing. Express service typically costs an additional AED 3,000-5,000 depending on the authority.',
      },
      {
        question: 'What can delay my application?',
        answer: 'Common delays include: missing or unclear documents, UID requirements for shareholders who haven\'t visited the UAE, special activity approvals (financial services, real estate brokerage), nationality-based restrictions, or incomplete information. Our team will guide you to avoid these delays.',
      },
    ],
  },
  bankAccounts: {
    title: 'Bank Accounts',
    items: [
      {
        question: 'Can I open a bank account with my Dubai company?',
        answer: 'Yes, but bank account opening is a separate process from company formation. While we can provide guidance and introductions, bank approval depends on the bank\'s due diligence. Some free zones have better relationships with banks, which we factor into our recommendations.',
      },
      {
        question: 'Which banks are easiest to work with?',
        answer: 'Banks in the UAE have varying requirements. Generally, banks prefer companies with physical offices, established business activities, and proper documentation. Some free zones like DMCC and DIFC have stronger banking relationships. We can provide guidance based on your specific situation.',
      },
      {
        question: 'Do I need a physical office to open a bank account?',
        answer: 'While not always required, having a physical office (even a flexi desk) significantly improves your chances of bank account approval. Banks prefer companies with a physical presence. We can discuss office options that meet both your needs and bank requirements.',
      },
    ],
  },
  taxes: {
    title: 'Taxes & Compliance',
    items: [
      {
        question: 'Do I need to register for corporate tax?',
        answer: 'UAE companies with annual revenue exceeding AED 375,000 must register for corporate tax. Even if below the threshold, registration may be beneficial. We offer corporate tax registration as an optional add-on service to ensure compliance.',
      },
      {
        question: 'What are the tax obligations for a Dubai company?',
        answer: 'Dubai companies benefit from zero corporate tax on most activities (with some exceptions). However, companies must maintain proper accounting records, file annual returns if required, and comply with VAT regulations if applicable. We offer accounting packages to help with compliance.',
      },
      {
        question: 'Do I need VAT registration?',
        answer: 'VAT registration is required if your annual revenue exceeds AED 375,000. It\'s optional if revenue is between AED 187,500 and AED 375,000. We can assist with VAT registration and ongoing compliance as part of our accounting services.',
      },
    ],
  },
  residency: {
    title: 'Residency & Rules',
    items: [
      {
        question: 'Will I get UAE residency with my company?',
        answer: 'Yes, if you obtain a visa through your company. As a shareholder or employee with a visa, you\'ll receive UAE residency, which allows you to live and work in the UAE, open bank accounts, and access various services. Residency is typically valid for 1-3 years and renewable.',
      },
      {
        question: 'What is the difference between free zone and mainland?',
        answer: 'Free zones offer streamlined setup, flexible office options (including virtual offices), and 100% foreign ownership. Mainland companies can trade directly with the UAE market and government entities but require a physical office and may have different visa quotas. Our calculator helps you choose the best option.',
      },
      {
        question: 'Can I work outside the UAE with a Dubai company?',
        answer: 'Yes, many free zone companies operate remotely or internationally. However, if you need to trade within the UAE market or with government entities, a mainland company may be required. Our calculator asks about your work location to recommend the best option.',
      },
    ],
  },
  cheapest: {
    title: 'Cheapest Options',
    items: [
      {
        question: 'What is the cheapest free zone in Dubai?',
        answer: 'The cheapest options typically include IFZA, SPC (Sharjah Publishing City), and some Ras Al Khaimah free zones, with base costs starting around AED 7,500-8,500. However, the "cheapest" depends on your specific needs - some zones may have lower base costs but higher visa or office fees. Our calculator shows the true total cost.',
      },
      {
        question: 'Is mainland cheaper than free zone?',
        answer: 'Not usually. While mainland base costs may seem similar, mandatory office rent (typically AED 25,000+ annually), establishment card fees, and additional approvals usually make mainland more expensive overall. Free zones often offer better value, especially for remote or international businesses.',
      },
    ],
  },
}

function FAQAccordion({ question, answer }: FAQItem) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-pearl-white transition-colors"
      >
        <span className="font-semibold text-valtora-navy pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-emirati-gold flex-shrink-0 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-pearl-white border-t border-gray-200">
          <p className="text-gray-700 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  // Flatten all FAQs for schema
  const allFAQs = Object.values(faqCategories).flatMap(category => category.items)
  const faqSchema = generateFAQSchema(allFAQs)

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <div className="min-h-screen bg-pearl-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl text-valtora-navy mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-gray-700">
                Find answers to common questions about Dubai company formation
              </p>
            </div>

            <div className="space-y-8">
              {Object.entries(faqCategories).map(([key, category]) => (
                <section key={key}>
                  <h2 className="font-serif text-2xl text-valtora-navy mb-4">
                    {category.title}
                  </h2>
                  <div className="space-y-3">
                    {category.items.map((faq, index) => (
                      <FAQAccordion key={index} question={faq.question} answer={faq.answer} />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Still Have Questions CTA */}
            <div className="mt-12 p-8 bg-valtora-navy text-pearl-white rounded-lg text-center">
              <h2 className="font-serif text-2xl mb-4">Still Have Questions?</h2>
              <p className="text-gray-300 mb-6">
                Our team is here to help. Get in touch for personalized advice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/18125513945?text=Hi%20Valtora%2C%20I%20have%20a%20question%20about%20company%20formation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Chat on WhatsApp
                </a>
                <a
                  href="tel:+18125513945"
                  className="btn-secondary"
                >
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
