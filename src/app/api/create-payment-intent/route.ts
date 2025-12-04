import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getUTMParamsFromRequest } from '@/lib/analytics'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency = 'aed', enquiry_id, quote_index, payment_type, metadata } = body

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    if (!enquiry_id) {
      return NextResponse.json(
        { error: 'enquiry_id is required' },
        { status: 400 }
      )
    }

    // Get UTM parameters from request cookies
    const cookieHeader = request.headers.get('cookie')
    const utmParams = getUTMParamsFromRequest(cookieHeader)

    // Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Amount in cents
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        enquiry_id: enquiry_id,
        quote_index: quote_index?.toString() || '0',
        payment_type: payment_type || 'full',
        ...metadata,
        // Add UTM parameters to metadata
        ...(utmParams.utm_source && { utm_source: utmParams.utm_source }),
        ...(utmParams.utm_medium && { utm_medium: utmParams.utm_medium }),
        ...(utmParams.utm_campaign && { utm_campaign: utmParams.utm_campaign }),
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

