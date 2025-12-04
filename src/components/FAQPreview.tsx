import Link from 'next/link'

const topQuestions = [
  {
    question: 'How much does it cost to set up a company in Dubai?',
    answer: 'Costs vary based on the free zone or mainland option, number of visas, and office requirements. Use our calculator to get an instant quote.',
  },
  {
    question: 'How long does company formation take?',
    answer: 'Standard processing takes 7-14 days depending on the authority. Express service can reduce this to 3-5 days.',
  },
  {
    question: 'Do I need to visit Dubai to set up a company?',
    answer: 'For most free zones, you can complete the process remotely. However, you may need to visit for visa processing and bank account opening.',
  },
  {
    question: 'What is the difference between free zone and mainland?',
    answer: 'Free zones offer streamlined setup with flexible office options. Mainland provides broader market access but requires mandatory office space and additional approvals.',
  },
]

export default function FAQPreview() {
  return (
    <section className="section-spacing bg-pearl-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-valtora-navy mb-4 text-balance">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-gray-700 px-4">
              Quick answers to common questions about Dubai company formation.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {topQuestions.map((faq, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
              >
                <h3 className="font-semibold text-valtora-navy mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/faq"
              className="link-primary text-lg font-medium"
            >
              View All FAQs →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

