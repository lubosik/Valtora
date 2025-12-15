# Web3Forms Setup Guide

This document explains how to configure Web3Forms for the Valtora website to ensure all form submissions are delivered to the correct email address.

## Overview

All forms across the Valtora website (hero form, popup form, inline CTA embeds) use a centralized Web3Forms submission pipeline located in `src/lib/web3forms.ts`. This ensures consistency and makes it easy to update submission logic in one place.

## Configuration Steps

### 1. Get Your Web3Forms Access Key

1. Go to https://web3forms.com/
2. Sign up or log in to your account
3. Navigate to the dashboard
4. Create a new access key or use an existing one
5. Copy the access key

### 2. Configure Email Destination

**IMPORTANT:** The Web3Forms access key must be configured in the Web3Forms dashboard to deliver emails to:

```
customer@valtoraformations.com
```

**Steps:**
1. In your Web3Forms dashboard, find your access key
2. Click on the access key to edit its settings
3. Set the "Send To" email address to: `customer@valtoraformations.com`
4. Save the configuration

**Note:** Web3Forms sends emails to the address configured in the dashboard for the given access key. The code does not specify the destination email - it's configured in the Web3Forms dashboard.

### 3. Set Environment Variable

Add the access key to your environment variables:

**Local Development (.env.local):**
```env
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here
```

**Vercel/Production:**
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add: `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` with your access key value
4. Ensure it's set for all environments (Production, Preview, Development)

### 4. Verify Configuration

After setting up:

1. **Test Form Submission:**
   - Fill out the hero form on the homepage
   - Submit the form
   - Check that you receive an email at `customer@valtoraformations.com`

2. **Check Email Format:**
   - Subject line should be: "New Valtora Lead – Company Setup Quote Request"
   - Email should include all form fields clearly labeled
   - Email should include metadata (page URL, timestamp, UTM params if present)

3. **Verify All Forms:**
   - Hero form (homepage)
   - Popup form (triggered by exit intent or scroll)
   - Inline CTA embeds (in blog posts)

## Email Format

All form submissions include:

- **Subject:** "New Valtora Lead – Company Setup Quote Request"
- **From Name:** User's full name (or "Valtora Website Visitor" if not provided)
- **Form Fields:**
  - Business Activity
  - Visas Required
  - Office Space Required
  - Shareholders
  - First Name
  - Last Name
  - Full Name (combined)
  - Email
  - Phone
- **Metadata:**
  - Page URL
  - Submitted At (ISO timestamp)
  - Form Variant (hero, popup, or inline)
  - UTM Parameters (if present in URL)

## Troubleshooting

### Form Shows "Form submission is temporarily unavailable"

**Cause:** `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` is not set or is empty.

**Solution:**
1. Check that `.env.local` exists and contains the access key
2. Restart your development server after adding the env var
3. For production, verify the env var is set in Vercel

### Emails Not Received

**Possible Causes:**
1. Web3Forms dashboard not configured to send to `customer@valtoraformations.com`
2. Access key incorrect or expired
3. Email going to spam folder
4. Web3Forms rate limiting

**Solutions:**
1. Verify dashboard configuration (see step 2 above)
2. Check Web3Forms dashboard for submission logs
3. Check spam folder
4. Verify access key is active in Web3Forms dashboard

### Development Logging

In development mode, the submission function logs helpful debug information to the console:
- Submission data (without sensitive info)
- Response status and messages
- Error details

Check the browser console (F12) when testing form submissions in development.

## Code Structure

All forms use the centralized submission function:

```typescript
import { submitToWeb3Forms, validateWeb3FormsConfig } from '@/lib/web3forms'
```

**Files using Web3Forms:**
- `src/components/LeadCaptureForm.tsx` - Main form component (used by hero, popup, inline)
- `src/lib/web3forms.ts` - Centralized submission utility

**Form Variants:**
- `hero` - Homepage hero form
- `popup` - Exit intent/scroll-triggered popup
- `inline` - Embedded in blog posts (uses popup)

All variants use the same submission pipeline and send to the same email address.

## Security Notes

- The Web3Forms access key is a **public** key (prefixed with `NEXT_PUBLIC_`)
- It's safe to expose in client-side code
- The key itself doesn't grant access to your email - it's just an identifier
- Email delivery is controlled by the Web3Forms dashboard configuration
- Never commit `.env.local` to version control (already in `.gitignore`)
