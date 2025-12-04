# Valtora Company Formations - Marketing Site & Quoting Engine

A production-ready Next.js marketing site and quoting engine for Dubai company formation services. Built with TypeScript, Tailwind CSS, and Stripe integration.

## 🚀 Features

- **60-Second Cost Calculator**: Multi-step wizard that generates instant, transparent quotes
- **Smart Decision Engine**: AI-powered recommendation system for free zones and mainland options
- **Stripe Payment Integration**: Secure payment processing with deposit/full payment options
- **Onboarding/KYC Intake**: Complete digital onboarding with document uploads
- **Client Dashboard**: Status tracking and document management
- **Lead Capture**: Exit-intent popup with CRM integration
- **Analytics**: GTM, GA4, Meta Pixel, TikTok Pixel integration
- **SEO Optimized**: Structured data, sitemap, meta tags
- **Mobile-First Design**: Responsive, luxury design optimized for all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (custom theme)
- **Payment**: Stripe
- **Fonts**: Google Fonts (Cormorant Garamond, Inter)
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Stripe account (for payments)
- Analytics accounts (optional): GTM, GA4, Meta Pixel, TikTok Pixel

## 🚦 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://valtora.com

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Analytics (Optional)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXX
NEXT_PUBLIC_TIKTOK_PIXEL_ID=XXXXXXXXXX

# SEO (Optional)
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-verification-code
NEXT_PUBLIC_YANDEX_VERIFICATION=your-verification-code
```

### 3. Add Logo and Favicon

Place your logo and favicon in the `public` directory:
- `public/valtora-logo.png` (recommended: 400x120px)
- `public/valtora-favicon.png` (recommended: 32x32px or 64x64px)

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/                # API routes
│   │   │   ├── quote/          # Quote generation
│   │   │   ├── create-payment-intent/  # Stripe payment intents
│   │   │   ├── webhooks/       # Stripe webhooks
│   │   │   ├── onboarding/     # Onboarding endpoints
│   │   │   └── leads/          # Lead capture
│   │   ├── checkout/            # Checkout page
│   │   ├── onboarding/         # Onboarding/KYC page
│   │   ├── quote/              # Quote details page
│   │   ├── faq/                # FAQ page
│   │   ├── about/               # About page
│   │   ├── legal/               # Legal pages
│   │   └── dashboard/          # Client dashboard
│   ├── components/              # React components
│   │   ├── calculator/          # Calculator step components
│   │   ├── onboarding/         # Onboarding step components
│   │   └── ...                 # Other components
│   ├── domain/                  # Business logic
│   │   └── formation/
│   │       └── decisionEngine/ # Decision engine
│   ├── lib/                     # Utilities
│   │   ├── analytics.ts         # Analytics helpers
│   │   ├── seo.ts              # SEO helpers
│   │   └── orders.ts           # Order management
│   ├── hooks/                   # Custom React hooks
│   └── styles/                  # Global styles
├── public/                      # Static assets
├── docs/                        # Documentation
└── package.json
```

## 🎨 Design System

### Colors

- **Valtora Royal Navy**: `#0A1A2F` (Primary)
- **Emirati Gold**: `#D4AF37` (Accent)
- **Desert Sand**: `#E8DCC8` (Background)
- **Pearl White**: `#FAFAF7` (Background)
- **Carbon Black**: `#111111` (Text)
- **Oasis Blue**: `#1C8CAD` (Links)
- **Date Palm Green**: `#0C3F2E` (Accent)

### Typography

- **Headings**: Cormorant Garamond (serif)
- **Body**: Inter (sans-serif)

## 🔧 Configuration

### Stripe Setup

1. Create a Stripe account
2. Get your API keys from the dashboard
3. Set up webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
4. Add webhook secret to `.env.local`

### Analytics Setup

See `docs/analytics-setup.md` for detailed instructions.

### SEO Setup

See `docs/seo-guide.md` for SEO configuration.

## 📚 Documentation

- [Analytics Setup](./docs/analytics-setup.md)
- [SEO Guide](./docs/seo-guide.md)
- [Stripe Setup](./docs/stripe-setup.md)
- [Formation Decision Logic](./src/domain/formation/decisionEngine/docs/formation-decision-logic.md)
- [API Documentation](./src/app/api/quote/README.md)

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🧪 Testing

### Stripe Test Mode

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

### Calculator Testing

Test various scenarios:
- Different business categories
- Multiple shareholders
- Various visa requirements
- Special activities (crypto, real estate, etc.)

## 🔐 Security

- Environment variables for sensitive keys
- Stripe webhook signature verification
- Input validation on all forms
- XSS protection via React
- CSRF protection via Next.js

## 📈 Performance

- Image optimization with Next.js Image
- Font optimization with `display: swap`
- Code splitting automatic
- Lazy loading for components
- Optimized CSS with Tailwind

## 🐛 Troubleshooting

### Common Issues

**Stripe errors**: Ensure webhook secret is correct and endpoint is accessible

**Analytics not tracking**: Check environment variables and browser console

**Build errors**: Clear `.next` folder and reinstall dependencies

## 📝 License

Proprietary - All rights reserved

## 👥 Support

For support, contact:
- Email: [To be added]
- WhatsApp: +44 739 396 1000
- Website: https://valtora.com

## 🎯 Roadmap

- [ ] Blog/Content section for SEO
- [ ] Multi-language support (Arabic)
- [ ] Advanced reporting dashboard
- [ ] Email automation integration
- [ ] WhatsApp Business API integration
- [ ] Advanced CRM integration

---

Built with ❤️ for Valtora Company Formations
