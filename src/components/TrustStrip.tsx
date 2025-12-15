import { trustRating, trustBadges } from '@/content/trust'

export default function TrustStrip() {
  // Calculate star display (full, half, empty)
  const fullStars = Math.floor(trustRating.value)
  const hasHalfStar = trustRating.value % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <section className="bg-white border-b border-gray-200 py-6 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            {/* Rating Section */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {/* Full Stars */}
                {Array.from({ length: fullStars }).map((_, i) => (
                  <svg
                    key={`full-${i}`}
                    className="w-5 h-5 text-emirati-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                {/* Half Star */}
                {hasHalfStar && (
                  <div className="relative w-5 h-5">
                    <svg
                      className="absolute w-5 h-5 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg
                      className="absolute w-5 h-5 text-emirati-gold overflow-hidden"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      style={{ clipPath: 'inset(0 50% 0 0)' }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                )}
                {/* Empty Stars */}
                {Array.from({ length: emptyStars }).map((_, i) => (
                  <svg
                    key={`empty-${i}`}
                    className="w-5 h-5 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="text-lg font-semibold text-valtora-navy">
                  {trustRating.value}/5
                </span>
                <span className="text-sm text-gray-600">
                  ({trustRating.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Trust Statement */}
            <div className="text-center md:text-left">
              <p className="text-sm md:text-base text-gray-700 font-medium">
                {trustRating.trustStatement}
              </p>
            </div>

            {/* Badges Section */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {trustBadges.slice(0, 4).map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200"
                >
                  {badge.logoUrl ? (
                    <img
                      src={badge.logoUrl}
                      alt={badge.label}
                      className="h-4 w-auto"
                    />
                  ) : (
                    <span className="text-xs font-medium text-gray-600">
                      {badge.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
