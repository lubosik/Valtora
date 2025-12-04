import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

export async function POST(request: NextRequest) {
  if (!webhookSecret) {
    console.warn('STRIPE_WEBHOOK_SECRET not configured - webhook verification disabled')
  }

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } else {
      // In development, parse without verification if secret not set
      event = JSON.parse(body) as Stripe.Event
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('Payment succeeded:', paymentIntent.id)
      
      // Here you would:
      // 1. Update order status in database
      // 2. Send confirmation email
      // 3. Trigger CRM webhook (Go High Level, etc.)
      // 4. Create order record
      // 5. Track conversion in analytics (server-side tracking)
      
      // For now, just log it
      console.log('Payment metadata:', paymentIntent.metadata)
      
      // TODO: Server-side analytics tracking
      // In production, you might want to send server-side events to:
      // - Google Analytics Measurement Protocol
      // - Meta Conversions API
      // - TikTok Events API
      // This ensures tracking even if client-side tracking fails
      
      // TODO: Integrate with order management system
      // await createOrderRecord({
      //   paymentIntentId: paymentIntent.id,
      //   enquiryId: paymentIntent.metadata.enquiry_id,
      //   amount: paymentIntent.amount,
      //   currency: paymentIntent.currency,
      //   paymentType: paymentIntent.metadata.payment_type,
      //   status: 'paid',
      // })
      break

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent
      console.log('Payment failed:', failedPayment.id)
      // Handle failed payment (notify user, log for review, etc.)
      break

    case 'payment_intent.canceled':
      const canceledPayment = event.data.object as Stripe.PaymentIntent
      console.log('Payment canceled:', canceledPayment.id)
      break

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

// Configure route to handle raw body
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

