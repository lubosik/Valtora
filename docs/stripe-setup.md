# Stripe Payment Integration Setup

## Overview

The Valtora platform uses Stripe for secure payment processing, supporting both full payments and deposit payments (AED 500).

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Stripe Configuration (Required)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### Getting Your Stripe Keys

1. **Create a Stripe Account**: Sign up at https://stripe.com
2. **Get API Keys**: 
   - Go to Developers → API keys
   - Copy your Publishable key (starts with `pk_test_` or `pk_live_`)
   - Copy your Secret key (starts with `sk_test_` or `sk_live_`)
3. **Set up Webhook**:
   - Go to Developers → Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `payment_intent.canceled`
   - Copy the webhook signing secret (starts with `whsec_`)

## Payment Flow

1. **User completes calculator** → Generates quote
2. **User views quote** → Selects authority and payment type (full/deposit)
3. **User clicks payment CTA** → Redirected to `/checkout`
4. **Checkout page**:
   - Loads quote data from sessionStorage
   - Creates payment intent via `/api/create-payment-intent`
   - Displays Stripe PaymentElement
5. **User completes payment** → Stripe processes payment
6. **On success** → Redirected to `/onboarding` with payment confirmation
7. **Webhook receives event** → Updates order status (future: database integration)

## API Routes

### `/api/create-payment-intent` (POST)

Creates a Stripe Payment Intent for the checkout.

**Request Body:**
```json
{
  "amount": 50000,  // Amount in cents (AED)
  "currency": "aed",
  "enquiry_id": "ENQ-123456",
  "quote_index": 0,
  "payment_type": "deposit" | "full",
  "metadata": {
    "enquiry_id": "ENQ-123456",
    "authority_id": "spc",
    "authority_name": "Sharjah Publishing City Free Zone",
    "total_cost": "8500",
    "payment_type": "deposit"
  }
}
```

**Response:**
```json
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx"
}
```

### `/api/webhooks/stripe` (POST)

Handles Stripe webhook events for payment status updates.

**Events Handled:**
- `payment_intent.succeeded` - Payment completed successfully
- `payment_intent.payment_failed` - Payment failed
- `payment_intent.canceled` - Payment was canceled

## Testing

### Test Cards (Stripe Test Mode)

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires Authentication**: `4000 0025 0000 3155`

Use any future expiry date, any 3-digit CVC, and any postal code.

### Testing Webhooks Locally

Use Stripe CLI to forward webhooks to your local server:

```bash
stripe listen --forward-to localhost:3001/api/webhooks/stripe
```

This will provide a webhook signing secret for local testing.

## Production Checklist

- [ ] Replace test keys with live keys
- [ ] Set up production webhook endpoint
- [ ] Configure webhook signing secret
- [ ] Test payment flow end-to-end
- [ ] Set up order database integration
- [ ] Configure email notifications
- [ ] Set up CRM webhook integration (Go High Level, etc.)
- [ ] Test refund process
- [ ] Set up monitoring and alerts

## Future Enhancements

- Database integration for order storage
- Email notifications on payment success
- CRM webhook integration (Go High Level)
- Refund management interface
- Payment analytics dashboard
- Multi-currency support (GBP, USD)
- Recurring payment support for annual renewals

