'use client'

import { useState } from 'react'
import { testimonials } from '@/content/testimonials'
import type { Testimonial } from '@/content/testimonials'

interface TestimonialCardProps {
  testimonial: Testimonial
  onExpand: (testimonial: Testimonial) => void
}

function TestimonialCard({ testimonial, onExpand }: TestimonialCardProps) {
  const hasFullText = testimonial.fullText && testimonial.fullText.length > testimonial.shortText.length
  const isVideo = !!testimonial.videoUrl

  // Render stars
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < testimonial.rating ? 'text-emirati-gold' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  if (isVideo) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center min-h-[200px] text-center">
        <div className="w-20 h-20 bg-emirati-gold/20 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-emirati-gold" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </div>
        <h3 className="font-serif text-lg text-valtora-navy mb-2">
          {testimonial.clientName}
        </h3>
        <p className="text-sm text-gray-600 mb-4">{testimonial.clientType}</p>
        <p className="text-gray-700 mb-4 text-sm">{testimonial.shortText}</p>
        <a
          href={testimonial.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary px-6 py-2 text-sm"
        >
          Watch Video
        </a>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-emirati-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-emirati-gold font-semibold text-sm">
            {testimonial.clientName
              .split('—')
              .map((part) => part.trim()[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-valtora-navy text-sm">
            {testimonial.clientName}
          </p>
          <p className="text-xs text-gray-600">{testimonial.clientType}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-3">
        {renderStars()}
      </div>

      <p className="text-gray-700 text-sm leading-relaxed mb-3">
        &quot;{testimonial.shortText}&quot;
      </p>

      {hasFullText && (
        <button
          onClick={() => onExpand(testimonial)}
          className="text-sm text-emirati-gold hover:text-emirati-gold-hover font-medium transition-colors"
        >
          Read more →
        </button>
      )}
    </div>
  )
}

interface TestimonialModalProps {
  testimonial: Testimonial | null
  onClose: () => void
}

function TestimonialModal({ testimonial, onClose }: TestimonialModalProps) {
  if (!testimonial) return null

  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < testimonial.rating ? 'text-emirati-gold' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-carbon-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-2 sm:mx-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 p-2"
          aria-label="Close"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-emirati-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-emirati-gold font-semibold text-lg">
                {testimonial.clientName
                  .split('—')
                  .map((part) => part.trim()[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-valtora-navy text-lg">
                {testimonial.clientName}
              </p>
              <p className="text-sm text-gray-600">{testimonial.clientType}</p>
            </div>
          </div>

          <div className="flex items-center gap-1 mb-6">
            {renderStars()}
            {testimonial.date && (
              <span className="text-sm text-gray-500 ml-2">{testimonial.date}</span>
            )}
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed text-base">
              &quot;{testimonial.fullText || testimonial.shortText}&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const [expandedTestimonial, setExpandedTestimonial] = useState<Testimonial | null>(null)

  return (
    <>
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-valtora-navy mb-4 text-balance">
                Client Testimonials
              </h2>
              <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed px-4">
                See what entrepreneurs worldwide say about their experience with Valtora
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  onExpand={setExpandedTestimonial}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal for expanded testimonials */}
      <TestimonialModal
        testimonial={expandedTestimonial}
        onClose={() => setExpandedTestimonial(null)}
      />
    </>
  )
}
