'use client'

import WhatsAppLink from './WhatsAppLink'

/**
 * Floating WhatsApp Button Component
 * 
 * A persistent, fixed-position WhatsApp button that appears in the bottom-right corner
 * of the screen. Provides immediate access to WhatsApp communication on all pages.
 * 
 * Inspired by doyou.ae's conversion optimization approach.
 */
export default function FloatingWhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 opacity-0 animate-[fadeIn_0.6s_ease-in_0.3s_forwards]">
      <WhatsAppLink
        href="https://wa.me/447393961000?text=Hi%20Valtora%2C%20I%27d%20like%20to%20discuss%20company%20formation%20in%20Dubai."
        location="floating_button"
        className="
          group
          flex items-center justify-center
          w-16 h-16
          bg-[#25D366] hover:bg-[#20BA5A]
          rounded-full
          shadow-lg hover:shadow-xl
          transition-all duration-300
          transform hover:scale-110
          focus:outline-none focus:ring-4 focus:ring-[#25D366]/30
          active:scale-95
        "
        aria-label="Contact us on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        {/* WhatsApp Icon SVG */}
        <svg
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .96 4.534.96 10.09c0 1.79.407 3.47 1.133 4.994L0 24l9.23-2.352a11.9 11.9 0 002.82.34h.001c5.554 0 10.089-4.535 10.089-10.09 0-3.175-1.48-6.013-3.786-7.857" />
        </svg>
        
        {/* Pulse animation ring - only on desktop for subtle effect */}
        <span
          className="hidden md:block absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping"
          aria-hidden="true"
        />
      </WhatsAppLink>
    </div>
  )
}
