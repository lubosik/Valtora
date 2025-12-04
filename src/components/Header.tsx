'use client'

import { useState } from 'react'
import Link from 'next/link'
import ValtoraLogo from './ValtoraLogo'
import WhatsAppLink from './WhatsAppLink'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-pearl-white text-valtora-navy sticky top-0 z-50 shadow-lg border-b border-gray-200">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between min-h-[80px]">
        <div className="flex items-center">
          <ValtoraLogo width={160} height={50} />
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 h-full">
          <Link 
            href="/" 
            className="hover:text-emirati-gold transition-colors font-medium text-sm lg:text-base text-valtora-navy"
          >
            Home
          </Link>
          <Link 
            href="/quote" 
            className="hover:text-emirati-gold transition-colors font-medium text-sm lg:text-base text-valtora-navy"
          >
            Get Quote
          </Link>
          <Link 
            href="/blog" 
            className="hover:text-emirati-gold transition-colors font-medium text-sm lg:text-base text-valtora-navy"
          >
            Blog
          </Link>
          <Link 
            href="/faq" 
            className="hover:text-emirati-gold transition-colors font-medium text-sm lg:text-base text-valtora-navy"
          >
            FAQ
          </Link>
          <Link 
            href="/about" 
            className="hover:text-emirati-gold transition-colors font-medium text-sm lg:text-base text-valtora-navy"
          >
            About
          </Link>
          <WhatsAppLink
            href="https://wa.me/447393961000?text=Hi%20Valtora%2C%20I%27d%20like%20to%20discuss%20company%20formation%20in%20Dubai."
            className="btn-primary text-sm px-4 py-2"
            location="header"
          >
            WhatsApp Us
          </WhatsAppLink>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-valtora-navy hover:text-emirati-gold transition-colors p-2"
          aria-label="Menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-pearl-white">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-emirati-gold transition-colors font-medium text-valtora-navy"
            >
              Home
            </Link>
            <Link
              href="/quote"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-emirati-gold transition-colors font-medium text-valtora-navy"
            >
              Get Quote
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-emirati-gold transition-colors font-medium text-valtora-navy"
            >
              Blog
            </Link>
            <Link
              href="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-emirati-gold transition-colors font-medium text-valtora-navy"
            >
              FAQ
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-emirati-gold transition-colors font-medium text-valtora-navy"
            >
              About
            </Link>
            <div className="pt-2">
              <WhatsAppLink
                href="https://wa.me/447393961000?text=Hi%20Valtora%2C%20I%27d%20like%20to%20discuss%20company%20formation%20in%20Dubai."
                className="btn-primary w-full text-center"
                location="header_mobile"
                onClick={() => setMobileMenuOpen(false)}
              >
                WhatsApp Us
              </WhatsAppLink>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

