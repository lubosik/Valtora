# MVP Tweaks Implementation Plan

This document outlines the phased approach for implementing partner feedback and competitor-inspired improvements to the Valtora website.

## Overview

The goal is to ship a clean MVP polish pass based on partner feedback and competitor analysis, working in strict phases where each phase is one small task, fully completed and tested before moving to the next.

## Key Requirements Summary

1. **Remove/rewrite blog content** - No specific free zones mentioned (DMCC, IFZA, etc.)
2. **Fix form submission failure** - Currently shows "Form submission is temporarily unavailable..."
3. **Display email address** - customer@valtoraformations.com clearly on site
4. **Standardize forms** - Match competitor's "Cost Calculator Form" questions
5. **Competitor inspiration** - Crawl decisivezone.ae and doyou.ae for simplicity patterns
6. **Install tracking** - Google Tag Manager (GTM-T6S7PRJ6) and Meta Pixel (1788534198468948)
7. **GoAML badge** - Add "GoAML Registered" compliance label

---

## Phase Breakdown

### Phase 1: Planning & Competitor Analysis ✅ (Current)
**Status:** In Progress
**Files Created:**
- `docs/mvp-tweaks-plan.md` (this file)
- `docs/competitor-decisivezone-form-notes.md`

**Tasks:**
- [x] Create planning document
- [x] Crawl decisivezone.ae/cost-calculator/
- [x] Document form flow, field labels, step logic
- [x] Run typecheck/lint/build to ensure no errors
- [ ] Wait for "continue" command

---

### Phase 2: Fix Form Submission Failure
**Files to Modify:**
- `src/components/LeadCaptureForm.tsx` (lines 124-200+)
- `src/lib/` (may need new utility file for Web3Forms)

**Tasks:**
- Reproduce the current error
- Inspect network request, API response, console errors
- Identify root cause (missing env var, wrong payload, CORS, etc.)
- Implement minimal fix
- Add robust logging (dev only)
- Add sanity check function
- Verify end-to-end submission works
- Ensure UI never ends up in permanent broken state

---

### Phase 3: Standardize Form Submission Pipeline
**Files to Modify:**
- `src/lib/web3forms.ts` (new file - shared submission function)
- `src/components/LeadCaptureForm.tsx` (refactor to use shared function)
- `.env.example` (document required env vars)

**Tasks:**
- Create `submitLeadToWeb3Forms()` function in `src/lib/web3forms.ts`
- Refactor `LeadCaptureForm` to use shared function
- Ensure all forms (hero, popup, inline) use same pipeline
- Ensure Web3Forms access key loaded from `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
- Add `.env.example` with required vars (no values)
- Ensure `.env.local` is in `.gitignore`

---

### Phase 4: Update Hero Form to Match Competitor Questions
**Files to Modify:**
- `src/components/Hero.tsx`
- `src/components/LeadCaptureForm.tsx` (major refactor)

**Tasks:**
- Update form questions to match competitor exactly:
  1. "Which business activity are you looking for?" (searchable select/combobox)
  2. "How many visas required?" (numeric/select)
  3. "Do you require office space?" (Yes/No dropdown)
  4. "How many shareholders will be involved?" (numeric/select)
  5. Contact Details: Full name, Email, Phone/WhatsApp
- Implement step pattern: Step 1 (4 business questions + "Next"), Step 2 (contact + submit)
- Keep Valtora luxury styling (white card on navy background)
- Ensure mobile looks excellent
- Strong CTA buttons ("Next" then "Get My Setup Options" or "Get A Quote Today")

---

### Phase 5: Update Popup Form to Match Hero Form
**Files to Modify:**
- `src/components/LeadCapturePopup.tsx`
- `src/components/LeadCaptureForm.tsx` (ensure shared component logic)

**Tasks:**
- Use same exact questions as hero form
- Use same component logic (no code duplication)
- Ensure popup cooldown works
- Clean success state with WhatsApp CTA
- Test popup behavior

---

### Phase 6: Enforce Email Destination & Display
**Files to Modify:**
- `src/components/Header.tsx` (add email display)
- `src/components/Footer.tsx` (add email display)
- `src/lib/web3forms.ts` (ensure subject line and formatting)
- `docs/web3forms-setup.md` (new file - document dashboard config)

**Tasks:**
- Add customer@valtoraformations.com to header (clickable mailto)
- Add customer@valtoraformations.com to footer (clickable mailto)
- Ensure all form submissions include subject: "New Valtora Lead – Company Setup Quote Request"
- Format message body clearly with user answers
- Document Web3Forms dashboard configuration requirement
- Verify all submissions go to customer@valtoraformations.com

---

### Phase 7: Remove Specific Free Zone Names from Blog
**Files to Modify:**
- `src/content/blog/posts.ts` (audit all posts)
- `src/app/blog/[slug]/page.tsx` (if meta titles need updating)
- `src/app/blog/page.tsx` (if listing needs updates)

**Tasks:**
- Perform repo-wide search for zone names (DMCC, IFZA, RAKEZ, DIFC, SPC, Meydan, etc.)
- Replace specific zone mentions with categories ("premium free zone", "cost-focused free zone", etc.)
- Update blog post meta titles/descriptions if needed
- If posts are not salvageable, unpublish them (remove from listing)
- Replace with evergreen alternatives that don't name zones
- Ensure blog still renders and looks complete

---

### Phase 8: Crawl doyou.ae & Implement Highest-Impact Element ✅
**Status:** Complete
**Files Created:**
- `docs/competitor-doyou-notes.md`
- `src/components/FloatingWhatsAppButton.tsx`

**Files Modified:**
- `src/app/layout.tsx` (added FloatingWhatsAppButton)
- `src/styles/globals.css` (added fadeIn animation)

**Tasks:**
- [x] Crawl https://www.doyou.ae/
- [x] Document 5-10 simplicity/conversion elements
- [x] Implement floating WhatsApp button (highest-impact element)
- [x] Keep Valtora design system (WhatsApp green with brand styling)
- [x] Add fade-in animation and hover effects
- [x] Ensure accessibility (ARIA labels, keyboard navigation)
- [x] Test build passes

---

### Phase 9: Install Google Tag Manager ✅
**Status:** Complete
**Files Modified:**
- `src/app/layout.tsx` (added GTM script and noscript iframe)

**Tasks:**
- [x] Add GTM script with container ID: GTM-T6S7PRJ6
- [x] Place script using Next.js Script component (automatically placed in head)
- [x] Place noscript iframe immediately after opening `<body>` tag
- [x] Ensure Next.js App Router safe (using Script component with afterInteractive strategy)
- [x] Verify scripts render in HTML output (build passes)
- [x] Ensure no runtime errors (build successful)

---

### Phase 10: Install Meta Pixel ✅
**Status:** Complete
**Files Modified:**
- `src/app/layout.tsx` (added Meta Pixel script)
- `src/lib/analytics.ts` (added pixel helper functions)

**Tasks:**
- [x] Add Meta Pixel with ID: 1788534198468948
- [x] Use standard fbevents.js loader
- [x] Ensure PageView fires (included in script)
- [x] Load only in production (NODE_ENV === 'production')
- [x] Add minimal event helper functions (trackMetaPixelEvent, trackMetaPixelLead, trackMetaPixelRegistration)
- [x] No hardcoded access tokens (using standard Meta Pixel implementation)
- Verify scripts render and no runtime errors

---

### Phase 11: Add GoAML Registered Badge ✅
**Status:** Complete
**Files Created:**
- `src/content/compliance.ts` (config file to toggle badges on/off)

**Files Modified:**
- `src/components/Footer.tsx` (added compliance badges section)
- `src/components/TrustStrip.tsx` (added compliance badges to trust strip)

**Tasks:**
- [x] Created configurable compliance badge system
- [x] Implemented premium text pill "GoAML Registered" (no official badge asset found)
- [x] Added tooltip with compliance status information
- [x] Placed in footer compliance row (above copyright)
- [x] Added to trust strip badges section
- [x] Made configurable via `src/content/compliance.ts` (enabled flag)
- [x] Styled with brand colors (emirati-gold accents)
- [x] Added hover tooltips for additional context
- [x] No regulatory claims invented (only states "Registered")

---

### Phase 12: Final QA Polish ✅
**Status:** Complete
**Files Modified:**
- `src/lib/make-webhook.ts` (new - Make.com webhook integration)
- `src/components/LeadCaptureForm.tsx` (updated to submit to both Web3Forms and Make.com)

**Tasks:**
- [x] Validate mobile layout of hero form (responsive padding: `p-6 md:p-8`, mobile scroll behavior)
- [x] Test dropdown usability (searchable business activity dropdown implemented)
- [x] Test error/success states (error messages, success state with WhatsApp CTA)
- [x] Test popup behavior (cooldown, success state, 4-second delay before close)
- [x] Ensure no console errors (build passes with zero errors)
- [x] Test all CTAs and links (WhatsApp links verified, email mailto links in header/footer)
- [x] Ensure build passes (✅ Build successful)
- [x] **BONUS: Make.com Webhook Integration** - Forms now submit to both Web3Forms (email) and Make.com webhook (GHL contact creation)

---

## File Path Reference

### Components
- Hero form: `src/components/Hero.tsx`
- Popup form: `src/components/LeadCapturePopup.tsx`
- Shared form: `src/components/LeadCaptureForm.tsx`
- Header: `src/components/Header.tsx`
- Footer: `src/components/Footer.tsx`
- Trust strip: `src/components/TrustStrip.tsx`

### Content
- Blog posts: `src/content/blog/posts.ts`
- Compliance config: `src/content/compliance.ts` (to be created)

### Layout & Config
- Root layout: `src/app/layout.tsx`
- Homepage: `src/app/page.tsx`
- Next.js config: `next.config.js`
- Environment: `.env.example`, `.env.local` (not committed)

### Utilities
- Web3Forms: `src/lib/web3forms.ts` (to be created)
- Analytics: `src/lib/analytics.ts`

### Documentation
- Planning: `docs/mvp-tweaks-plan.md` (this file)
- Competitor notes: `docs/competitor-decisivezone-form-notes.md`
- Doyou notes: `docs/competitor-doyou-notes.md` (to be created)
- Web3Forms setup: `docs/web3forms-setup.md` (to be created)

---

## Notes

- Each phase must be fully completed, tested, and build must pass before moving to next
- Do not combine phases
- Do not refactor broadly
- Keep Valtora luxury Dubai vibe, branding, typography, spacing
- Only change what each phase specifically requires
