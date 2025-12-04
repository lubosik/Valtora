import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core palette
        'valtora-navy': {
          DEFAULT: '#0A1A2F',
          rgb: '10, 26, 47',
        },
        'emirati-gold': {
          DEFAULT: '#D4AF37',
          hover: '#C19A33',
          rgb: '212, 175, 55',
        },
        // Secondary palette
        'desert-sand': {
          DEFAULT: '#E8DCC8',
          rgb: '232, 220, 200',
        },
        'pearl-white': {
          DEFAULT: '#FAFAF7',
          rgb: '250, 250, 247',
        },
        'carbon-black': {
          DEFAULT: '#111111',
          rgb: '17, 17, 17',
        },
        // Accent palette
        'oasis-blue': {
          DEFAULT: '#1C8CAD',
          rgb: '28, 140, 173',
        },
        'date-palm-green': {
          DEFAULT: '#0C3F2E',
          rgb: '12, 63, 46',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        'button': '6px',
      },
      boxShadow: {
        'button': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'button-hover': '0 4px 8px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
export default config

