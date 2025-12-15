# MVP Polish Plan - Valtora Company Formations

**Created:** 2025-01-XX  
**Status:** Phase 1 Complete - Planning & Audit

## Executive Summary

This document outlines the phased approach to transform the Valtora Company Formations site from a complex pricing calculator experience into a streamlined MVP with a high-converting hero form, enhanced trust elements, polished content sections, and a complete blog publishing system.

## Current State Analysis

### Homepage Hero (`src/components/Hero.tsx`)
- **Current:** Centered hero with headline, description, two CTAs ("Calculate My Cost" button + WhatsApp link), trust badges, and authority logos
- **Layout:** Single-column centered layout, no embedded form
- **CTA Flow:** "Calculate My Cost" button scrolls to calculator section below
- **Trust Elements:** Basic trust badges (No hidden fees, Express service, 4.9/5 Google Rating) and authority logos (SPC, Meydan, IFZA, DMCC, RAKEZ, Dubai Mainland)

### Calculator/Form System (`src/components/Calculator.tsx` + `src/components/CalculatorSection.tsx`)
- **Current:** Complex 6-step multi-step form with detailed business information collection
- **Steps:** 
  1. Business category and description
  2. Shareholders information
  3. Visas requested
  4. Priorities (primary priority, jurisdiction preference, work location)
  5. Special activities flags
  6. Review
- **Submission:** Posts to `/api/quote` endpoint, generates `DecisionResult` with pricing recommendations
- **Status:** Will be preserved but deprioritized - moved to secondary conversion path

### Lead Capture Popup (`src/components/LeadCapturePopup.tsx`)
- **Current:** Simple popup with first name, last name, email, phone (with country code selector)
- **Submission:** Posts to `/api/leads/capture` endpoint (currently just logs, no actual email sending)
- **Trigger Logic:** 30-second delay OR 70% scroll OR exit intent (desktop), with 7-day cooldown after dismissal
- **Status:** Needs update to use new MVP form fields and Web3Forms pipeline

### Blog System (`src/app/blog/page.tsx` + `src/app/blog/[slug]/page.tsx`)
- **Current:** Hardcoded blog posts array in TypeScript files
- **Structure:** Basic listing page and individual post pages with HTML content
- **Missing:** 
  - MDX/content file system
  - CTA embeds within articles
  - Table of contents
  - Breadcrumbs
  - RSS feed
  - Proper sitemap integration
  - Structured data (BlogPosting schema)

### About Section (`src/app/about/page.tsx`)
- **Current:** Basic content with placeholder founder section ("[X] years of experience", "[Additional founder background]")
- **Structure:** Story section, founder section (placeholder), licenses, case studies (2 examples), testimonials (2 examples), partners
- **Status:** Needs founder-led narrative with isolated content source for easy editing

### Trust Section (`src/components/TrustSection.tsx`)
- **Current:** 3 trust point cards (Registered Partners, Dedicated Account Manager, Transparent Pricing) + 2 testimonial cards
- **Missing:** 
  - Star rating widget with configurable rating/review count
  - "As seen in" badges section
  - "Why Valtora" benefit cards section
  - More testimonials (target: 6-10)

### Case Studies
- **Current:** 2 basic examples in About page
- **Missing:** 
  - Dedicated case studies section on homepage
  - Dedicated `/case-studies` page
  - 3 premium case study cards with CTAs
  - Anonymized but detailed case study format

### Design System (`src/styles/globals.css`)
- **Colors:** Navy (#0A1A2F), Gold (#D4AF37), Desert Sand (#E8DCC8), Pearl White (#FAFAF7), Carbon Black (#111111), Oasis Blue (#1C8CAD)
- **Typography:** Serif for headings, sans-serif for body
- **Components:** `.btn-primary`, `.btn-secondary`, `.input-primary`, `.card`, etc.
- **Status:** Well-established, must be preserved

## Planned Changes by Phase

### Phase 2: Reference Documentation
**File:** `docs/reference-oxb-form-notes.md`  
**Action:** Attempt to crawl https://www.decisivezone.ae/calculate-cost/ and document form structure, layout, and flow. If blocked/404, document MVP form experience requirements based on described effect.

### Phase 3: MVP Lead Capture Form Component
**New File:** `src/components/LeadCaptureForm.tsx`  
**Features:**
- MVP form fields:
  - "What do you want to set up?" dropdown (Dubai Free Zone Company, Dubai Mainland Company, Not sure — recommend for me)
  - "Business activity / industry" dropdown (Consulting/Services, E-commerce, Trading, Tech/Software, Marketing/Media, Logistics, Real Estate related, Other)
  - Conditional "Briefly describe your activity" input (shown when "Other" selected)
  - "Visas needed" selector (0, 1, 2, 3, 4+)
  - "Priority" selector (Cheapest, Fastest, Best long-term setup, Not sure)
  - Contact fields: Full name, Email, Phone/WhatsApp number
- Validation: Require full name, email, phone, first dropdown
- Honeypot field (hidden, anti-spam)
- UTM parameter capture and attachment
- Success/failure states with premium messaging
- Variant prop support (hero, popup, inline)
- Premium styling matching existing design system

### Phase 4: Web3Forms Integration
**Modified Files:**
- `src/components/LeadCaptureForm.tsx` (add Web3Forms submission logic)
- `.env.example` (new file, document `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`)
- `.gitignore` (ensure `.env.local` is ignored - already present)

**Features:**
- Client-side fetch POST to `https://api.web3forms.com/submit`
- Hidden fields: `access_key`, `subject`, `from_name`
- Honeypot validation (silent discard if filled)
- Success: Premium toast/inline message, disable submit button, optional WhatsApp CTA
- Failure: Error message + WhatsApp fallback CTA
- Include all form answers + metadata (page URL, timestamp, UTM params)
- Email formatting: clear lead qualification info

### Phase 5: Hero Form Integration
**Modified Files:**
- `src/components/Hero.tsx` (embed LeadCaptureForm in two-column layout)
- `src/app/page.tsx` (adjust hero integration if needed)

**Layout:**
- Desktop: Two-column (hero copy left, form right)
- Mobile: Stacked (headline → trust badges → form)
- Above-the-fold placement
- Maintain existing hero copy and trust badges
- Adjust spacing/background overlays for premium feel

### Phase 6: Popup Update
**Modified Files:**
- `src/components/LeadCapturePopup.tsx` (use LeadCaptureForm component)
- `src/hooks/useLeadCapturePopup.ts` (adjust trigger timing: 6-10 seconds, scroll threshold, exit intent)

**Features:**
- Use same LeadCaptureForm component (variant="popup")
- Same Web3Forms pipeline
- 7-day cooldown (already implemented)
- Trigger: 6-10 seconds OR scroll threshold OR exit intent (desktop)
- Show on homepage and blog pages by default
- Premium styling with Valtora logo

### Phase 7: Trust Strip & Accolades
**New Files:**
- `src/content/trust.ts` (editable trust/rating configuration)
- `src/components/TrustStrip.tsx` (new component)
- `src/components/AccoladesSection.tsx` (new component)

**Modified Files:**
- `src/components/Hero.tsx` (add TrustStrip below hero or integrate)
- `src/app/page.tsx` (add AccoladesSection after hero)

**Features:**
- Trust Strip: Star rating widget (configurable rating value, review count), "Trusted by founders worldwide" text, 3-6 "as seen in" badge placeholders
- Accolades/Why Valtora: 3-6 benefit cards (Dubai-based specialists, Transparent pricing, Fast-track available, Bank account support, Visa handling end-to-end, Dedicated account manager)
- All content editable via `src/content/trust.ts`
- No hard-coded false claims; clearly marked as placeholders

### Phase 8: Testimonials Section
**New Files:**
- `src/content/testimonials.ts` (testimonial data with placeholder names)
- `src/components/TestimonialsSection.tsx` (new component)

**Modified Files:**
- `src/app/page.tsx` (add TestimonialsSection)

**Features:**
- 6-10 testimonial cards with premium styling
- Placeholder names: "Client — UK E-commerce Founder", "Client — SaaS Operator (US)", etc.
- Short default text with "Read more" modal expansion for longer testimonials
- Optional video testimonial placeholder card
- Mark all data as placeholder in code comments

### Phase 9: Case Studies Section
**New Files:**
- `src/content/case-studies.ts` (3 anonymized case studies)
- `src/components/CaseStudiesSection.tsx` (new component)
- `src/app/case-studies/page.tsx` (new page if doesn't exist)

**Modified Files:**
- `src/app/page.tsx` (add CaseStudiesSection)

**Features:**
- 3 premium case study cards on homepage
- Each includes: client type, objective, recommended route, timeline, what Valtora handled, outcome
- CTA on each: "Get a similar setup recommendation" (scrolls to hero form)
- Dedicated `/case-studies` page with full case study details
- Anonymized format (no fake legal claims)

### Phase 10: About/Founder Polish
**New Files:**
- `src/content/founder.ts` (founder story content)
- `src/content/about.ts` (about page content)

**Modified Files:**
- `src/app/about/page.tsx` (pull from content files, add founder portrait placeholder)
- `src/components/Hero.tsx` or homepage (add About teaser if needed)

**Features:**
- Founder's note block with portrait placeholder/silhouette
- Short narrative: background, why Valtora exists, commitment to transparency
- Content isolated in `src/content/founder.ts` for easy editing
- Homepage About teaser and About page share same content source
- Premium styling matching brand

### Phase 11: Blog Infrastructure
**New Files:**
- `src/content/blog/` directory structure
- Sample MDX post: `src/content/blog/sample-post.mdx` (or equivalent structure)
- Blog utilities: `src/lib/blog.ts` (if needed for MDX processing)

**Modified Files:**
- `src/app/blog/page.tsx` (read from content files instead of hardcoded array)
- `src/app/blog/[slug]/page.tsx` (read from content files, add breadcrumbs, table of contents)

**Features:**
- MDX-based blog system (or equivalent simple content system)
- Each post: slug, title, description, published date, updated date, author (placeholder), category, tags, canonical URL, OG image
- Blog index: search/filter functionality
- Article template: premium typography, breadcrumbs, table of contents (for long posts), related posts
- Ensure buildable, error-free state

### Phase 12: Inline CTA Embed Component
**New Files:**
- `src/components/InlineCTAEmbed.tsx` (reusable CTA component)

**Modified Files:**
- Sample blog post (add two CTA embeds: ~30% and ~90% through content)
- `src/app/blog/[slug]/page.tsx` (render CTA embeds in article content)

**Features:**
- Consistent premium layout matching site style
- CTA button: "Get My Setup Options" or "Request My Quote"
- Behavior: Scroll to hero form on homepage, or open form modal on blog pages
- Ensure CTA always works from any page
- Two insertions per article: mid-content (~25-35%) and near-end (above conclusion)

### Phase 13: Sitemap & RSS
**Modified Files:**
- `src/app/sitemap/route.ts` (ensure includes blog posts + core pages)
- `src/app/robots/route.ts` (verify)

**New Files:**
- `src/app/rss/route.ts` (RSS feed output)

**Features:**
- XML sitemap includes all blog posts and core pages
- RSS feed with proper formatting
- Structured data: BlogPosting schema for posts
- Optional NewsArticle schema (safe implementation, no conflicts)
- No broken links, verify all routes

### Phase 14: Keyword Research Workflow
**New Files:**
- `docs/seo-keyword-workflow.md` (detailed workflow documentation)
- `seo/keyword-research.csv` (template with headers and starter rows)

**Content:**
- Workflow: Intent types (informational/navigational/commercial/transactional), prioritization (commercial/transactional first), match types logic, volume thresholds (>30 monthly searches), prefer high-volume variants
- CSV columns: keyword, intent_type, volume, cpc_estimate (optional), difficulty (optional), chosen_match_type, target_page (blog slug), notes
- Starter rows: Dubai company formation relevant keywords

### Phase 15: DataForSEO Helper Script
**New Files:**
- `scripts/keyword-research-dataforseo.ts` (helper script skeleton)

**Features:**
- Read `DATAFORSEO_USERNAME` and `DATAFORSEO_PASSWORD` from `.env.local`
- API integration points documented
- Output CSV to `seo/keyword-research.csv`
- If non-trivial, provide clean stub + instructions
- Never hardcode credentials

### Phase 16+: Blog Article Production
**Process:** One article per phase, wait for "continue" between phases

**For Each Article:**
- Pick next highest priority commercial/transactional keyword from CSV
- Produce full SEO-optimized article:
  - Optimized H1
  - Meta title and description
  - Clean slug
  - Table of contents (if long)
  - Internal links (home, about, faq, case studies)
  - Two InlineCTAEmbed inserts (mid and near-end)
  - FAQ section at bottom (with FAQ schema if appropriate)
- Tone: Luxury Dubai corporate, no guarantees, original and conversion-focused
- Ensure buildable state after each article

## File Structure Changes

### New Components
- `src/components/LeadCaptureForm.tsx` - MVP form component
- `src/components/InlineCTAEmbed.tsx` - Reusable CTA embed
- `src/components/TrustStrip.tsx` - Trust rating/badges strip
- `src/components/AccoladesSection.tsx` - Why Valtora benefits
- `src/components/TestimonialsSection.tsx` - Testimonials grid
- `src/components/CaseStudiesSection.tsx` - Case studies cards

### New Content Files
- `src/content/founder.ts` - Founder story content
- `src/content/about.ts` - About page content
- `src/content/testimonials.ts` - Testimonial data
- `src/content/trust.ts` - Trust/rating configuration
- `src/content/case-studies.ts` - Case study data
- `src/content/blog/` - MDX blog posts directory

### New Scripts
- `scripts/keyword-research-dataforseo.ts` - Keyword research helper

### New Documentation
- `docs/mvp-polish-plan.md` - This file
- `docs/reference-oxb-form-notes.md` - Reference form analysis
- `docs/seo-keyword-workflow.md` - Keyword research workflow

### New SEO Files
- `seo/keyword-research.csv` - Keyword research data

### Modified Files
- `src/components/Hero.tsx` - Add embedded form
- `src/components/LeadCapturePopup.tsx` - Use new form component
- `src/app/page.tsx` - Add new sections (trust, testimonials, case studies)
- `src/app/about/page.tsx` - Pull from content files, polish
- `src/app/blog/page.tsx` - Read from content files
- `src/app/blog/[slug]/page.tsx` - Add CTA embeds, breadcrumbs, TOC
- `src/app/sitemap/route.ts` - Include blog posts
- `src/app/rss/route.ts` - New RSS feed
- `.env.example` - Document Web3Forms and DataForSEO env vars

## Acceptance Criteria Checklist

### Hero Form
- [ ] MVP form embedded in hero section (two-column desktop, stacked mobile)
- [ ] Form includes all required fields (setup type, business activity, visas, priority, contact details)
- [ ] Form validates required fields
- [ ] Form submits successfully to Web3Forms
- [ ] Success state shows premium message + WhatsApp CTA
- [ ] Failure state shows error + WhatsApp fallback
- [ ] Form is above-the-fold on mobile
- [ ] Form matches existing design system (navy/gold/pearl/sand)

### Web3Forms Integration
- [ ] Web3Forms access key read from `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` env var
- [ ] Submission includes all form answers
- [ ] Submission includes metadata (URL, timestamp, UTM params)
- [ ] Honeypot field implemented and working
- [ ] Email received by partner with clear lead formatting
- [ ] `.env.local` in `.gitignore` (already present)
- [ ] `.env.example` documents required env vars

### Popup
- [ ] Popup uses same LeadCaptureForm component
- [ ] Popup uses same Web3Forms pipeline
- [ ] Popup triggers after 6-10 seconds OR scroll threshold OR exit intent
- [ ] Popup has 7-day cooldown after dismissal
- [ ] Popup shows on homepage and blog pages
- [ ] Popup matches brand styling

### Trust & Accolades
- [ ] Trust Strip component with configurable rating/review count
- [ ] "As seen in" badges (3-6 placeholders)
- [ ] "Why Valtora" section with 3-6 benefit cards
- [ ] All content editable via `src/content/trust.ts`
- [ ] No hard-coded false claims

### Testimonials
- [ ] 6-10 testimonial cards with premium styling
- [ ] Placeholder names (clearly marked)
- [ ] "Read more" modal expansion for longer testimonials
- [ ] Optional video testimonial placeholder
- [ ] Data stored in `src/content/testimonials.ts`

### Case Studies
- [ ] 3 case study cards on homepage
- [ ] Each includes: client type, objective, route, timeline, outcome
- [ ] CTAs on each card scroll to hero form
- [ ] Dedicated `/case-studies` page exists
- [ ] Anonymized format (no fake claims)
- [ ] Data stored in `src/content/case-studies.ts`

### About/Founder
- [ ] Founder's note block with portrait placeholder
- [ ] Founder story content in `src/content/founder.ts`
- [ ] About page content in `src/content/about.ts`
- [ ] Homepage About teaser and About page share content source
- [ ] Premium styling matches brand

### Blog System
- [ ] Blog posts stored in content files (MDX or equivalent)
- [ ] Blog index page with search/filter
- [ ] Article template with premium typography
- [ ] Breadcrumbs on article pages
- [ ] Table of contents for long posts
- [ ] Related posts section
- [ ] At least one sample post exists

### CTA Embeds
- [ ] InlineCTAEmbed component created
- [ ] Component matches site style
- [ ] CTA scrolls to hero form (homepage) or opens modal (blog pages)
- [ ] Two CTA embeds in sample blog post (~30% and ~90%)
- [ ] CTA works from any page

### Sitemap & RSS
- [ ] XML sitemap includes blog posts and core pages
- [ ] RSS feed implemented and working
- [ ] BlogPosting structured data on article pages
- [ ] Optional NewsArticle schema (if implemented, no conflicts)
- [ ] No broken links

### Keyword Research
- [ ] `docs/seo-keyword-workflow.md` documents full workflow
- [ ] `seo/keyword-research.csv` template with headers
- [ ] CSV includes starter rows for Dubai company formation keywords
- [ ] Workflow covers intent types, match types, volume thresholds

### DataForSEO Script
- [ ] Script reads credentials from env vars (never hardcoded)
- [ ] Script outputs CSV to `seo/keyword-research.csv`
- [ ] Script is documented with usage instructions
- [ ] If stub, clear TODOs and sample output format provided

### Build & Quality
- [ ] Project builds without errors (`npm run build`)
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] All new components follow existing design system
- [ ] All new content is clearly marked as placeholder where appropriate

## Notes

- **Preserve existing calculator:** The complex 6-step calculator will remain intact but be moved to a secondary conversion path. A link like "Prefer an instant detailed quote?" can route to it.
- **No major refactors:** Changes should be incremental and leave the project in a buildable state after each phase.
- **Design system preservation:** All new UI must match existing navy/gold/pearl/sand color scheme and luxury Dubai vibe.
- **Placeholder content:** All testimonials, case studies, and founder content should be clearly marked as editable placeholders, not presented as verified facts.
- **Web3Forms MVP:** This is the MVP submission method. Backend automation beyond Web3Forms is out of scope for this phase.

## Next Steps

1. **Phase 2:** Document reference form structure (or proceed with best-effort MVP form design)
2. **Phase 3:** Implement LeadCaptureForm component
3. Continue through phases sequentially, waiting for "continue" between each phase.

---

**Last Updated:** Phase 1 Complete
