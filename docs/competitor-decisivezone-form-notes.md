# Competitor Analysis: Decisive Zone Cost Calculator Form

**Source:** https://www.decisivezone.ae/cost-calculator/  
**Date:** December 15, 2025  
**Purpose:** Document form structure, field labels, step logic, and layout patterns for Valtora implementation

---

## Overall Layout & Design

### Hero Section
- **Background:** Deep navy/dark blue background
- **Form Container:** Clean white rounded card centered on page
- **Mobile:** Form appears as prominent white card on navy background
- **Floating Elements:** 
  - WhatsApp button (green circular icon) in bottom-left
  - Chat widget (dark blue circular icon) in bottom-right

### Form Structure
- **Multi-step pattern:** Step 1 (business questions) → Step 2 (contact details)
- **Step indicator:** Not explicitly visible in snapshot, but form clearly has two distinct sections
- **CTA buttons:** Strong, prominent buttons ("Next" for step 1, final submit for step 2)

---

## Step 1: Business Questions

The form asks exactly 4 questions in this order:

### Question 1: "Which Business activity are you looking for?"
- **Type:** Combobox (searchable dropdown)
- **Label:** "Which Business activity are you looking for?"
- **Placeholder/Default:** "Select Business Activity"
- **Options:** Extensive list (40+ options including):
  - General Trading
  - IT Trading
  - E-commerce
  - Food Trading
  - Business Consultancy
  - IT Consultancy
  - Automobile Trading
  - Technical Service
  - Textile Trading
  - Digital Marketing
  - Salon
  - Event Management
  - Advertising
  - Perfume & Cosmetics Trading
  - Raw Materials Trading
  - Jewellery Trading
  - Educational Support Activities
  - Engineering Consultancy
  - Tourism & Recreation
  - Creative Arts & Entertainment Activities
  - Accounting & Auditing
  - Real Estate
  - Restaurant, Cafe, Cloud Kitchen
  - Investment Consultancy
  - Management Consultancy
  - Retail Outlet/Shop
  - Holding Company
  - HR Consultancy
  - Project Management
  - Cleaning Service
  - Maintenance
  - Interior Design Consultancy
  - Technical Consultancy
  - Software Publishing
  - Logistics Consultancy
  - Sports Management
  - Photography
  - Aviation Consultancy
  - Hospitality Management
  - Legal Consultancy
  - Videography
  - PR
  - Delivery Service
  - Media
  - (And more...)
- **UI Pattern:** Searchable combobox with long list (not a tiny 6-option dropdown)
- **Styling:** Clean white input field with label above

### Question 2: "How many visas required?"
- **Type:** Spinbutton (numeric input field)
- **Label:** "How many visas required?"
- **UI Pattern:** Numeric input (likely with increment/decrement buttons or direct number entry)
- **Styling:** Clean white input field with label above

### Question 3: "Do you require office space?"
- **Type:** Combobox (dropdown)
- **Label:** "Do you require office space?"
- **Options:** 
  - "Yes"
  - "No"
- **UI Pattern:** Simple Yes/No dropdown
- **Styling:** Clean white input field with label above

### Question 4: "How many shareholders will be involved?"
- **Type:** Spinbutton (numeric input field)
- **Label:** "How many shareholders will be involved?"
- **UI Pattern:** Numeric input (likely with increment/decrement buttons or direct number entry)
- **Styling:** Clean white input field with label above

### Step 1 CTA Button
- **Text:** "Next"
- **Styling:** Prominent button (likely gold/primary color matching brand)
- **Position:** Below the 4 questions
- **Action:** Advances to Step 2 (contact details)

---

## Step 2: Contact Details

After clicking "Next", the form shows contact fields:

### Field 1: "First Name"
- **Type:** Textbox (text input)
- **Label:** "First Name"
- **Required:** Yes (indicated by asterisk in some forms)
- **Styling:** Clean white input field with label above

### Field 2: "Last Name"
- **Type:** Textbox (text input)
- **Label:** "Last Name"
- **Required:** Yes (indicated by asterisk in some forms)
- **Styling:** Clean white input field with label above

### Field 3: "Phone Number"
- **Type:** Textbox with country code selector
- **Label:** "Phone Number"
- **UI Pattern:** 
  - Country code dropdown/combobox (e.g., "+44", "+971", etc.)
  - Phone number input field
- **Country Options:** Extensive list including:
  - United Arab Emirates (الإمارات العربية المتحدة) +971
  - Qatar (قطر) +974
  - Saudi Arabia (المملكة العربية السعودية) +966
  - India (भारत) +91
  - United Kingdom +44
  - Canada +1
  - Australia +61
  - (And many more countries)
- **Styling:** Clean white input field with label above, country code selector integrated

### Step 2 CTA Button
- **Text:** "Get A Quote Today" or similar final submit button
- **Styling:** Prominent button (likely gold/primary color matching brand)
- **Position:** Below contact fields
- **Action:** Submits form

---

## Additional Observations

### Form Validation
- Required fields likely marked with asterisk (*)
- Validation appears to happen on submit or field blur

### Success State
- Not visible in snapshot, but likely shows success message
- May include WhatsApp CTA for immediate contact

### Error State
- Not visible in snapshot, but likely shows inline error messages

### Mobile Experience
- Form remains prominent white card on navy background
- Fields stack vertically
- Buttons remain prominent and easy to tap
- WhatsApp floating button remains accessible

### Brand Consistency
- Form maintains luxury/premium feel
- Clean, minimalist design
- Strong contrast (white form on dark background)
- Clear typography and spacing

---

## Key Takeaways for Valtora Implementation

1. **Exact Question Wording:**
   - "Which Business activity are you looking for?" (not "What business activity...")
   - "How many visas required?" (not "How many visas do you need?")
   - "Do you require office space?" (exact wording)
   - "How many shareholders will be involved?" (exact wording)

2. **Field Types:**
   - Business activity: Searchable combobox (not simple dropdown)
   - Visas: Numeric input (spinbutton)
   - Office space: Yes/No dropdown
   - Shareholders: Numeric input (spinbutton)
   - Contact: Text inputs + phone with country code

3. **Step Pattern:**
   - Step 1: 4 business questions + "Next" button
   - Step 2: Contact details (First Name, Last Name, Phone) + final submit button

4. **Layout:**
   - White rounded card on navy background
   - Clean spacing
   - Clear labels above fields
   - Strong, prominent CTA buttons

5. **Mobile:**
   - Form remains prominent and easy to use
   - Fields stack vertically
   - Buttons are large and easy to tap

---

## Screenshot Reference

- Screenshot saved: `decisivezone-form.png`
- Shows modal popup with form structure
- Captures Step 2 (contact details) visible in modal
- Background shows hero section with "Cost Calculator in 20 Seconds" messaging

---

## Notes for Implementation

- Maintain Valtora's luxury Dubai vibe and branding
- Use Valtora's color scheme (navy, gold, pearl white)
- Keep Valtora typography (Cormorant Garamond for headings, Inter for body)
- Implement searchable combobox for business activity (not simple dropdown)
- Use numeric inputs for visas and shareholders
- Implement step pattern with "Next" button
- Ensure mobile experience is excellent
- Add WhatsApp CTA in success state
- Keep form submission to Web3Forms (not competitor's system)
