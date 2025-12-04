import Link from 'next/link'
import WhatsAppLink from './WhatsAppLink'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-carbon-black text-pearl-white">
      <div className="container-custom py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-serif text-xl mb-4 text-emirati-gold">Valtora</h3>
            <p className="text-sm text-gray-300 mb-4">
              Expert Dubai company formation services with transparent pricing and
              concierge-level support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-emirati-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-emirati-gold transition-colors">
                  Get Quote
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emirati-gold transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-emirati-gold transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emirati-gold transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-serif text-lg mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/legal/terms"
                  className="hover:text-emirati-gold transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacy"
                  className="hover:text-emirati-gold transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/refund"
                  className="hover:text-emirati-gold transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-emirati-gold font-medium mb-1">Dubai Office</p>
                <p className="text-gray-300">
                  Unit No: RET-R5-185
                  <br />
                  Jumeirah Lakes Towers
                  <br />
                  Dubai, United Arab Emirates
                </p>
              </div>
              <div>
                <a
                  href="tel:+447393961000"
                  className="hover:text-emirati-gold transition-colors"
                >
                  +44 739 396 1000
                </a>
              </div>
              <div>
                <WhatsAppLink
                  href="https://wa.me/447393961000?text=Hi%20Valtora%2C%20I%27d%20like%20to%20discuss%20company%20formation%20in%20Dubai."
                  className="hover:text-emirati-gold transition-colors inline-flex items-center gap-2"
                  location="footer"
                >
                  WhatsApp Us
                </WhatsAppLink>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400">
          <p>© {currentYear} Valtora Company Formations. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

