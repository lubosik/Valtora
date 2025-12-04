# Pre-Launch Checklist

Use this checklist to ensure everything is ready before going live.

## 📋 Content & Assets

### Logo & Branding
- [ ] Logo file placed at `public/valtora-logo.png`
- [ ] Favicon placed at `public/valtora-favicon.png`
- [ ] OG image created (1200x630px) at `public/og-image.jpg`
- [ ] Logo displays correctly on all pages
- [ ] Favicon appears in browser tab

### Copy & Content
- [ ] All placeholder text replaced with final copy
- [ ] About page content customized
- [ ] Testimonials updated (if using real ones)
- [ ] Case studies updated (if using real ones)
- [ ] Legal pages reviewed by lawyer
- [ ] Contact information verified
- [ ] WhatsApp number verified

## 🔧 Configuration

### Environment Variables
- [ ] `NEXT_PUBLIC_SITE_URL` set to production domain
- [ ] Stripe keys switched to live mode
- [ ] `STRIPE_SECRET_KEY` (live)
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (live)
- [ ] `STRIPE_WEBHOOK_SECRET` configured
- [ ] Analytics IDs added (GTM, GA4, Meta, TikTok)
- [ ] SEO verification codes added (if using)

### Stripe Setup
- [ ] Stripe account activated
- [ ] Live API keys obtained
- [ ] Webhook endpoint configured: `https://yourdomain.com/api/webhooks/stripe`
- [ ] Webhook events selected:
  - [ ] `payment_intent.succeeded`
  - [ ] `payment_intent.payment_failed`
  - [ ] `payment_intent.canceled`
- [ ] Webhook secret copied to environment variables
- [ ] Test payment in live mode (small amount)

### Domain & SSL
- [ ] Domain configured
- [ ] DNS records set correctly
- [ ] SSL certificate active
- [ ] HTTPS redirect working
- [ ] www vs non-www redirect configured

## 🧪 Testing

### Functional Testing
- [ ] Calculator works end-to-end
- [ ] Quote generation accurate
- [ ] Payment flow works (test with real card)
- [ ] Deposit payment works
- [ ] Full payment works
- [ ] Onboarding form works
- [ ] Document uploads work (if implemented)
- [ ] Phone verification works (if implemented)
- [ ] Lead capture popup works
- [ ] WhatsApp links work
- [ ] All navigation links work
- [ ] Mobile menu works

### Cross-Browser Testing
- [ ] Chrome (desktop)
- [ ] Firefox (desktop)
- [ ] Safari (desktop)
- [ ] Edge (desktop)
- [ ] Chrome (mobile)
- [ ] Safari (mobile)

### Device Testing
- [ ] iPhone (various sizes)
- [ ] Android (various sizes)
- [ ] Tablet (iPad)
- [ ] Desktop (various resolutions)

### Payment Testing
- [ ] Successful payment flow
- [ ] Failed payment handling
- [ ] Deposit payment
- [ ] Full payment
- [ ] Payment confirmation email (if implemented)
- [ ] Webhook receives events

## 📊 Analytics & Tracking

### Analytics Setup
- [ ] Google Tag Manager container loads
- [ ] Google Analytics 4 tracking works
- [ ] Meta Pixel fires
- [ ] TikTok Pixel fires
- [ ] UTM parameters captured
- [ ] Events tracked:
  - [ ] Calculator completion
  - [ ] Quote views
  - [ ] Checkout start
  - [ ] Payment success
  - [ ] Onboarding completion
  - [ ] Lead capture
  - [ ] WhatsApp clicks

### Testing Analytics
- [ ] Test events in GA4 DebugView
- [ ] Test Meta Pixel with Pixel Helper
- [ ] Verify TikTok Pixel in console
- [ ] Check GTM preview mode

## 🔍 SEO

### Technical SEO
- [ ] Sitemap accessible: `https://yourdomain.com/sitemap.xml`
- [ ] Robots.txt accessible: `https://yourdomain.com/robots.txt`
- [ ] Structured data validated (Google Rich Results Test)
- [ ] Meta tags on all pages
- [ ] Canonical URLs set
- [ ] No broken links

### SEO Verification
- [ ] Google Search Console verified
- [ ] Sitemap submitted to Google
- [ ] Bing Webmaster Tools verified
- [ ] Sitemap submitted to Bing
- [ ] Test structured data with Google's tool

### Content SEO
- [ ] All images have alt text
- [ ] Heading hierarchy correct (H1 → H2 → H3)
- [ ] Internal linking structure
- [ ] Page titles optimized
- [ ] Meta descriptions optimized

## 🚀 Performance

### Performance Testing
- [ ] Lighthouse score > 90 (all categories)
- [ ] Page load time < 3 seconds
- [ ] Core Web Vitals pass:
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1
- [ ] Mobile performance optimized
- [ ] Images optimized
- [ ] Fonts loading efficiently

### Optimization
- [ ] Images compressed
- [ ] Unused CSS removed
- [ ] JavaScript minified
- [ ] Caching configured
- [ ] CDN configured (if using)

## 🔐 Security

### Security Checklist
- [ ] HTTPS enabled everywhere
- [ ] Environment variables secured
- [ ] API routes protected
- [ ] No sensitive data in client code
- [ ] Stripe webhook signature verified
- [ ] Input validation on all forms
- [ ] XSS protection verified
- [ ] CSRF protection enabled

### Security Testing
- [ ] Test payment with invalid card
- [ ] Test form validation
- [ ] Check for exposed API keys
- [ ] Verify webhook security

## 📱 Mobile Experience

### Mobile Testing
- [ ] All pages responsive
- [ ] Touch targets adequate (44px minimum)
- [ ] Forms easy to fill on mobile
- [ ] Calculator works on mobile
- [ ] Payment flow works on mobile
- [ ] Images display correctly
- [ ] Text readable without zooming
- [ ] Navigation accessible

## 📧 Integrations

### CRM Integration (if applicable)
- [ ] Go High Level webhook configured
- [ ] Airtable integration configured
- [ ] Lead capture sends to CRM
- [ ] Payment sends to CRM
- [ ] Test webhook receives data

### Email (if applicable)
- [ ] Email service configured
- [ ] Payment confirmation emails
- [ ] Quote emails
- [ ] Onboarding confirmation emails
- [ ] Test emails received

### SMS (if applicable)
- [ ] SMS provider configured
- [ ] OTP sending works
- [ ] OTP verification works
- [ ] Test SMS received

## 📄 Legal & Compliance

### Legal Pages
- [ ] Terms & Conditions reviewed by lawyer
- [ ] Privacy Policy reviewed by lawyer
- [ ] Refund Policy reviewed by lawyer
- [ ] GDPR compliance (if applicable)
- [ ] Cookie consent banner (if needed)

### Compliance
- [ ] Data protection measures in place
- [ ] User data handling documented
- [ ] Payment processing compliant
- [ ] Business licenses displayed (if required)

## 🐛 Error Handling

### Error Scenarios
- [ ] Network errors handled gracefully
- [ ] Payment failures show clear messages
- [ ] Form validation errors clear
- [ ] 404 page exists
- [ ] 500 error page exists
- [ ] Error logging configured

## 📞 Support

### Support Channels
- [ ] Contact email configured
- [ ] WhatsApp number verified
- [ ] Phone number verified
- [ ] Support hours displayed
- [ ] Response time expectations set

## 📈 Monitoring

### Monitoring Setup
- [ ] Error tracking (Sentry/LogRocket)
- [ ] Uptime monitoring
- [ ] Performance monitoring
- [ ] Analytics dashboards set up
- [ ] Alerts configured

## 🎯 Final Checks

### Pre-Launch
- [ ] All tests passed
- [ ] All checkboxes above completed
- [ ] Team review completed
- [ ] Stakeholder approval received
- [ ] Backup plan ready
- [ ] Rollback plan ready

### Launch Day
- [ ] Deploy to production
- [ ] Verify site loads
- [ ] Test critical paths
- [ ] Monitor for errors
- [ ] Check analytics
- [ ] Announce launch

## 📝 Post-Launch

### First 24 Hours
- [ ] Monitor error logs
- [ ] Check analytics
- [ ] Verify payments processing
- [ ] Test all user flows
- [ ] Monitor performance
- [ ] Gather user feedback

### First Week
- [ ] Review conversion metrics
- [ ] Check search rankings
- [ ] Monitor error rates
- [ ] Optimize based on data
- [ ] Address any issues

---

**Status**: ⬜ Not Started | 🟡 In Progress | ✅ Complete

**Last Updated**: 2024

