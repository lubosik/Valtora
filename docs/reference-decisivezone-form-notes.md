# Reference Form Analysis: Decisive Zone Cost Calculator

**Source URL:** https://www.decisivezone.ae/calculate-cost/  
**Date Analyzed:** 2025-12-14  
**Status:** Successfully accessed and analyzed

## Page Overview

The Decisive Zone cost calculator page presents a multi-step form embedded in the main content area. The form is designed to collect business setup requirements and contact information to generate a cost estimate.

## Form Structure

### Multi-Step Flow

The form uses a two-step wizard pattern:

**Step 1: Business Requirements**
- Business Activity (dropdown with extensive options)
- Visas Required (number input/spinbutton)
- Office Space Required (Yes/No dropdown)
- Shareholders Count (number input/spinbutton)
- Navigation: "Next" button

**Step 2: Contact Information**
- First Name (text input)
- Last Name (text input)
- Phone Number (text input with country code selector dropdown)
- Email (text input)
- Nationality (dropdown selector)
- Website (optional text input)
- Navigation: "Previous" button and "Submit" button

## Key Design Principles Observed

### 1. Minimal Initial Friction
- **First step focuses on business needs only** - no contact details required upfront
- Only 4 fields in the first step (business activity, visas, office space, shareholders)
- Clear progression with "Next" button

### 2. Progressive Disclosure
- Contact details collected in second step
- Optional fields (Website) clearly marked
- Previous button allows users to go back and adjust

### 3. Smart Field Types
- **Dropdowns for categorical data** (business activity, nationality, office space)
- **Number inputs** for quantitative data (visas, shareholders)
- **Country code selector** integrated with phone number field
- All fields have clear labels

### 4. Premium Presentation
- Clean, modern form styling
- Clear visual hierarchy
- Professional color scheme (appears to use blue/navy tones)
- Form is prominently placed in main content area

### 5. Fast Submission Path
- Only essential information collected
- No unnecessary fields
- Clear call-to-action buttons
- Form appears to submit directly (no complex multi-page flow)

## Form Fields Detail

### Business Activity Dropdown
Extensive list of options including:
- General Trading
- IT Trading
- E-commerce
- Business Consultancy
- IT Consultancy
- Digital Marketing
- Real Estate
- And many more specialized activities

**Observation:** While comprehensive, this could be overwhelming. A simplified MVP might use high-level categories with an "Other" option.

### Visas Required
- Number input (spinbutton)
- Allows users to specify exact visa count
- Simple, direct input

### Office Space Required
- Yes/No dropdown
- Binary choice reduces complexity

### Shareholders
- Number input (spinbutton)
- Direct count input

### Contact Fields
- Standard contact information collection
- Phone includes country code selector (defaults to +44, shows UAE +971 prominently)
- Email field standard text input
- Nationality dropdown (extensive country list)

## Layout & Placement

- Form is embedded in main content area (not a popup)
- Appears to be single-column layout
- Form is the primary focus of the page
- No distracting elements around the form
- Clean spacing and typography

## MVP Form Requirements (Based on Analysis)

Based on the reference form analysis and project requirements, the Valtora MVP form should:

### Core Principles
1. **Minimal fields** - Only ask what's needed to route and qualify the lead
2. **Fast submission** - Single screen or minimal steps
3. **Premium feel** - Match luxury Dubai brand aesthetic
4. **Clear progression** - If multi-step, show progress and allow navigation

### Recommended MVP Fields (Simplified from Reference)

**Single-Screen MVP Form:**
1. **What do you want to set up?** (dropdown)
   - Dubai Free Zone Company
   - Dubai Mainland Company
   - Not sure — recommend for me

2. **Business activity / industry** (dropdown)
   - Consulting / Services
   - E-commerce
   - Trading
   - Tech / Software
   - Marketing / Media
   - Logistics
   - Real Estate related
   - Other (describe) → shows conditional input

3. **Visas needed** (selector)
   - 0, 1, 2, 3, 4+

4. **Priority** (selector)
   - Cheapest
   - Fastest
   - Best long-term setup
   - Not sure

5. **Contact Details:**
   - Full name (single field for speed)
   - Email
   - Phone / WhatsApp number

### Key Differences from Reference

1. **Simplified business activities** - High-level categories instead of exhaustive list
2. **Priority selector** - Added to understand user motivation (not in reference)
3. **Single screen** - Faster than multi-step (reference uses 2 steps)
4. **Combined name field** - Faster than first/last split
5. **No nationality field** - Not needed for MVP lead qualification
6. **No website field** - Optional field removed for speed

## Submission Flow

Based on reference and requirements:
- Form submits via Web3Forms API (client-side fetch)
- User stays on page
- Success state shows immediately
- Premium success message with WhatsApp CTA
- No page redirect

## Design Notes

- Form should feel premium and luxurious
- Match existing Valtora brand colors (navy/gold/pearl/sand)
- Use existing design system components (`.input-primary`, `.btn-primary`)
- Ensure mobile responsiveness
- Above-the-fold placement on homepage hero

## Implementation Notes

- Reference form uses multi-step wizard
- MVP will use single-screen form for faster conversion
- Reference has extensive dropdowns; MVP will use simplified categories
- Reference collects nationality; MVP will skip this for speed
- Both prioritize minimal friction and fast submission

---

**Next Steps:** Proceed with Phase 3 implementation of `LeadCaptureForm` component based on these observations and the MVP requirements specified in the project brief.
