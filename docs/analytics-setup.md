# Analytics Integration Setup

## Overview

The Valtora platform integrates with multiple analytics platforms to track user behavior, conversions, and marketing attribution. All analytics are configured via environment variables and can be toggled on/off without code changes.

## Environment Variables

Add the following to your `.env.local` file:

```env
# Google Tag Manager (Recommended - handles multiple tags)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Google Analytics 4 (Alternative to GTM)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Meta Pixel (Facebook/Instagram Ads)
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXX

# TikTok Pixel
NEXT_PUBLIC_TIKTOK_PIXEL_ID=XXXXXXXXXX
```

## Integrated Platforms

### 1. Google Tag Manager (GTM)

GTM is the recommended primary analytics solution as it allows you to manage multiple tags (GA4, Meta Pixel, etc.) from one interface without code changes.

**Setup:**
1. Create a GTM container at https://tagmanager.google.com
2. Copy your Container ID (format: GTM-XXXXXXX)
3. Add to `NEXT_PUBLIC_GTM_ID`

**Benefits:**
- Manage all tags from GTM interface
- No code deployments for tag changes
- Built-in testing and preview mode

### 2. Google Analytics 4 (GA4)

Direct GA4 integration for detailed analytics.

**Setup:**
1. Create GA4 property at https://analytics.google.com
2. Copy your Measurement ID (format: G-XXXXXXXXXX)
3. Add to `NEXT_PUBLIC_GA_ID`

**Note:** If using GTM, you can add GA4 through GTM instead of direct integration.

### 3. Meta Pixel (Facebook/Instagram)

Tracks conversions for Meta advertising campaigns.

**Setup:**
1. Create Pixel in Meta Events Manager
2. Copy your Pixel ID
3. Add to `NEXT_PUBLIC_META_PIXEL_ID`

### 4. TikTok Pixel

Tracks conversions for TikTok advertising campaigns.

**Setup:**
1. Create Pixel in TikTok Ads Manager
2. Copy your Pixel ID
3. Add to `NEXT_PUBLIC_TIKTOK_PIXEL_ID`

## UTM Parameter Tracking

The platform automatically captures and persists UTM parameters from incoming URLs:

- `utm_source` - Traffic source (e.g., google, facebook)
- `utm_medium` - Marketing medium (e.g., cpc, email)
- `utm_campaign` - Campaign name
- `utm_term` - Keyword (for paid search)
- `utm_content` - Content identifier

**Storage:**
- Captured on page load
- Stored in localStorage (client-side)
- Stored in cookie (30-day expiry, server-side access)
- Attached to all form submissions and API calls

**Usage:**
UTM parameters are automatically included in:
- Quote API calls
- Payment intent creation
- Onboarding submissions
- Lead capture forms

## Tracked Events

### Conversion Events

1. **calculator_complete** - User completes calculator
   - Data: `enquiry_id`

2. **quote_view** - User views quote page
   - Data: `enquiry_id`, `authority_id`

3. **begin_checkout** - User starts checkout
   - Data: `enquiry_id`, `value` (amount), `currency`, `payment_type`

4. **purchase** - Payment successful
   - Data: `enquiry_id`, `transaction_id`, `value`, `currency`, `payment_type`

5. **onboarding_complete** - User completes onboarding
   - Data: `enquiry_id`

6. **lead_capture** - User submits lead form
   - Data: `source` (popup, form, etc.)

### Engagement Events

7. **whatsapp_click** - User clicks WhatsApp link
   - Data: `location` (hero, header, footer, etc.)

## Implementation Details

### Client-Side Tracking

All events are tracked client-side using the analytics utility functions in `src/lib/analytics.ts`. Events are sent to all configured platforms simultaneously.

### Server-Side Tracking

UTM parameters are captured server-side from cookies and attached to:
- Quote generation
- Payment intents
- Onboarding submissions

This ensures attribution even if client-side tracking is blocked.

## Testing

### Development Mode

In development, analytics scripts load but won't send real data if IDs are not configured. This allows development without polluting analytics data.

### Testing Checklist

- [ ] Verify GTM container loads (check Network tab)
- [ ] Verify GA4 events fire (use GA4 DebugView)
- [ ] Verify Meta Pixel fires (use Meta Pixel Helper browser extension)
- [ ] Verify TikTok Pixel fires (check browser console)
- [ ] Test UTM parameter capture (add `?utm_source=test` to URL)
- [ ] Verify UTM params persist across pages
- [ ] Test conversion events (complete calculator, checkout, etc.)

## Privacy & Compliance

- Analytics respect user privacy preferences
- No personally identifiable information (PII) is sent to analytics platforms
- UTM parameters are used for attribution only
- Consider implementing cookie consent banner for GDPR compliance

## Future Enhancements

- Server-side event tracking via Measurement Protocol
- Enhanced e-commerce tracking
- Custom dimension tracking
- Conversion value optimization
- Multi-touch attribution

