# Vercel Environment Variables Setup

This document lists all environment variables required for the Valtora site to function properly on Vercel.

## Required Environment Variables

### 1. Web3Forms Access Key (REQUIRED)
**Variable Name:** `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`  
**Value:** `7eadd3bd-6907-4c59-b1d7-b4712ef9098d`  
**Description:** This is the public access key for Web3Forms. It's safe to expose in client-side code (NEXT_PUBLIC_ prefix means it's bundled into the client).  
**Required For:** Form submissions to work (hero form, popup form, inline CTAs)

---

## Optional Environment Variables

### 2. Google Tag Manager ID (Optional)
**Variable Name:** `NEXT_PUBLIC_GTM_ID`  
**Value:** `GTM-T6S7PRJ6`  
**Description:** Currently hardcoded in the layout, but can be made configurable via env var if needed.  
**Status:** Currently hardcoded - no env var needed

### 3. Meta Pixel ID (Optional)
**Variable Name:** `NEXT_PUBLIC_META_PIXEL_ID`  
**Value:** `1788534198468948`  
**Description:** Currently hardcoded in the layout for production only.  
**Status:** Currently hardcoded - no env var needed

---

## Make.com Webhook URL

**Note:** The Make.com webhook URL is **hardcoded** in the codebase at:
- File: `src/lib/make-webhook.ts`
- URL: `https://hook.eu1.make.com/a4hxask3qr4ie7ymwnud9qp19pin69o0`

**No environment variable needed** - the webhook URL is directly in the code.

---

## How to Set Environment Variables in Vercel

1. **Go to Vercel Dashboard:**
   - Navigate to your project: `valtora-v3` (or your project name)
   - Go to **Settings** → **Environment Variables**

2. **Add the Required Variable:**
   - Click **Add New**
   - **Name:** `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
   - **Value:** `7eadd3bd-6907-4c59-b1d7-b4712ef9098d`
   - **Environment:** Select all (Production, Preview, Development)
   - Click **Save**

3. **Redeploy:**
   - After adding the env var, go to **Deployments**
   - Click the three dots on the latest deployment
   - Select **Redeploy** (or push a new commit to trigger auto-deploy)

---

## Verification

After setting the environment variable and redeploying:

1. **Test Form Submission:**
   - Go to your live site
   - Fill out the hero form
   - Submit the form
   - Check that:
     - Form shows success message
     - Email arrives at `info@valtoraformations.com` (via Web3Forms)
     - Contact is created in GHL (via Make.com webhook)

2. **Check Browser Console:**
   - Open browser DevTools (F12)
   - Go to Console tab
   - Look for any errors related to form submission
   - In development, you'll see logs like `[Web3Forms] Submitting form data` and `[Make Webhook] Submitting form data`

---

## Troubleshooting

### Form Submission Not Working

1. **Check Environment Variable:**
   - Verify `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` is set in Vercel
   - Ensure it's set for the correct environment (Production/Preview/Development)
   - Value should be exactly: `7eadd3bd-6907-4c59-b1d7-b4712ef9098d`

2. **Check Web3Forms Dashboard:**
   - Log into https://web3forms.com/
   - Verify the access key is active
   - Ensure email destination is set to: `info@valtoraformations.com`

3. **Check Make.com Webhook:**
   - The webhook URL is hardcoded, so no configuration needed
   - If webhook fails, it won't block form submission (graceful degradation)
   - Check Make.com scenario logs for any errors

4. **Redeploy After Changes:**
   - Environment variables require a redeploy to take effect
   - Push a new commit or manually redeploy from Vercel dashboard

---

## Summary

**Only ONE environment variable is required:**
- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` = `7eadd3bd-6907-4c59-b1d7-b4712ef9098d`

**Make.com webhook URL:** Already hardcoded in code, no env var needed.
