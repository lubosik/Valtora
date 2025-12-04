# Deployment Guide

## Pre-Deployment Checklist

### 1. Environment Variables

Ensure all required environment variables are set:

```env
# Required
NEXT_PUBLIC_SITE_URL=https://valtora.com
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Optional but Recommended
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXX
NEXT_PUBLIC_TIKTOK_PIXEL_ID=XXXXXXXXXX
```

### 2. Assets

- [ ] Logo placed at `public/valtora-logo.png`
- [ ] Favicon placed at `public/valtora-favicon.png`
- [ ] OG image created (1200x630px) at `public/og-image.jpg` (optional)

### 3. Stripe Configuration

- [ ] Switch to live mode in Stripe dashboard
- [ ] Update API keys to live keys
- [ ] Configure webhook endpoint
- [ ] Test webhook with Stripe CLI or dashboard

### 4. Domain & DNS

- [ ] Domain configured
- [ ] SSL certificate enabled
- [ ] DNS records set correctly

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the recommended platform for Next.js applications.

#### Steps:

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings (auto-detected for Next.js)
   - Add environment variables
   - Deploy

3. **Deploy via CLI**:
   ```bash
   vercel
   ```

4. **Configure Custom Domain**:
   - Go to Project Settings → Domains
   - Add your domain
   - Follow DNS configuration instructions

5. **Set Up Webhooks**:
   - In Stripe Dashboard → Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `payment_intent.canceled`
   - Copy webhook secret to environment variables

#### Vercel Environment Variables:

Add all variables from `.env.local` in Vercel dashboard:
- Project Settings → Environment Variables
- Add for Production, Preview, and Development

### Option 2: Netlify

1. **Connect Repository**:
   - Go to [netlify.com](https://netlify.com)
   - Import from GitHub/GitLab

2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Environment Variables**:
   - Site settings → Environment variables
   - Add all required variables

4. **Deploy**:
   - Netlify will auto-deploy on push

### Option 3: Self-Hosted (VPS/Docker)

#### Using Docker:

1. **Create Dockerfile**:
   ```dockerfile
   FROM node:18-alpine AS base
   
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   COPY package.json package-lock.json ./
   RUN npm ci
   
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build
   
   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
   USER nextjs
   EXPOSE 3000
   ENV PORT 3000
   CMD ["node", "server.js"]
   ```

2. **Update next.config.js**:
   ```js
   module.exports = {
     output: 'standalone',
   }
   ```

3. **Build and Run**:
   ```bash
   docker build -t valtora-app .
   docker run -p 3000:3000 --env-file .env.local valtora-app
   ```

## Post-Deployment

### 1. Verify Deployment

- [ ] Homepage loads correctly
- [ ] Calculator works
- [ ] Stripe checkout works (test mode first)
- [ ] Webhooks receive events
- [ ] Analytics tracking works
- [ ] Mobile responsiveness verified

### 2. SEO Setup

- [ ] Submit sitemap to Google Search Console: `https://yourdomain.com/sitemap.xml`
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify Google Search Console ownership
- [ ] Test structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)

### 3. Analytics Verification

- [ ] GTM container loads
- [ ] GA4 events fire
- [ ] Meta Pixel fires
- [ ] TikTok Pixel fires
- [ ] Test conversion events

### 4. Stripe Webhook Testing

1. Use Stripe CLI to test:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   stripe trigger payment_intent.succeeded
   ```

2. Or use Stripe Dashboard:
   - Go to Webhooks → Send test webhook
   - Verify events are received

### 5. Performance Testing

- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Test page load speed
- [ ] Verify mobile performance

### 6. Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] API routes protected
- [ ] CORS configured (if needed)
- [ ] Rate limiting considered

## Monitoring

### Recommended Tools

1. **Vercel Analytics**: Built-in analytics for Vercel deployments
2. **Sentry**: Error tracking
3. **LogRocket**: Session replay and error tracking
4. **Uptime Robot**: Uptime monitoring

### Key Metrics to Monitor

- Page load times
- Error rates
- Conversion rates
- Payment success rates
- API response times

## Rollback Plan

### Vercel

- Go to Deployments
- Find previous working deployment
- Click "..." → Promote to Production

### Manual Rollback

1. Revert to previous commit
2. Rebuild and redeploy
3. Verify functionality

## Troubleshooting

### Build Failures

- Check Node.js version (18+)
- Clear `.next` folder
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Runtime Errors

- Check environment variables
- Review server logs
- Check browser console
- Verify API endpoints

### Stripe Issues

- Verify API keys are correct
- Check webhook endpoint is accessible
- Verify webhook secret matches
- Check Stripe dashboard for errors

## Support

For deployment issues:
- Check Next.js documentation
- Review platform-specific docs
- Contact platform support
- Review application logs

---

**Last Updated**: 2024

