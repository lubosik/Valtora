'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import type { DecisionResult, AuthorityQuote } from '@/domain/formation/decisionEngine/types'

// Initialize Stripe
const getStripePublishableKey = () => {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
  }
  return ''
}

const stripePromise = getStripePublishableKey()
  ? loadStripe(getStripePublishableKey())
  : null

interface CheckoutFormProps {
  clientSecret: string
  amount: number
  paymentType: 'full' | 'deposit'
  enquiryId: string
  quoteIndex: number
}

function CheckoutForm({
  clientSecret,
  amount,
  paymentType,
  enquiryId,
  quoteIndex,
}: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const { error: submitError } = await elements.submit()
      if (submitError) {
        setError(submitError.message || 'An error occurred')
        setIsProcessing(false)
        return
      }

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/onboarding?payment_intent=${paymentIntent?.id}&enquiry_id=${encodeURIComponent(enquiryId)}`,
        },
        redirect: 'if_required',
      })

      if (confirmError) {
        setError(confirmError.message || 'Payment failed')
        setIsProcessing(false)
      } else if (paymentIntent?.status === 'succeeded') {
        // Track payment success
        const { trackPaymentSuccess } = await import('@/lib/analytics')
        trackPaymentSuccess(
          enquiryId,
          paymentIntent.id,
          amount / 100, // Convert from cents to AED
          paymentType
        )

        // Payment succeeded, redirect to onboarding
        router.push(
          `/onboarding?payment_intent=${paymentIntent.id}&enquiry_id=${encodeURIComponent(enquiryId)}&quote_index=${quoteIndex}`
        )
      } else {
        setIsProcessing(false)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="btn-primary w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'Processing...' : `Pay ${amount.toLocaleString()} AED`}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Secure payment powered by Stripe. Your payment information is encrypted and secure.
      </p>
    </form>
  )
}

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [orderSummary, setOrderSummary] = useState<{
    quote: AuthorityQuote
    paymentType: 'full' | 'deposit'
    amount: number
    enquiryId: string
    quoteIndex: number
  } | null>(null)

  useEffect(() => {
    const initializeCheckout = async () => {
      try {
        // Get quote data from sessionStorage
        const quoteData = sessionStorage.getItem('quoteData')
        const selectedQuoteData = sessionStorage.getItem('selectedQuote')

        if (!quoteData || !selectedQuoteData) {
          setError('Quote data not found. Please start over.')
          return
        }

        const decisionResult: DecisionResult = JSON.parse(quoteData)
        const selected: {
          quoteIndex: number
          paymentType: 'full' | 'deposit'
          enquiryId: string
        } = JSON.parse(selectedQuoteData)

        const quote = decisionResult.quotes[selected.quoteIndex]
        if (!quote) {
          setError('Selected quote not found.')
          return
        }

        const paymentType = searchParams.get('type') === 'deposit' ? 'deposit' : 'full'
        const depositAmount = 500 // Configurable
        const amount =
          paymentType === 'deposit' ? depositAmount : quote.total_cost

        setOrderSummary({
          quote,
          paymentType,
          amount,
          enquiryId: selected.enquiryId,
          quoteIndex: selected.quoteIndex,
        })

        // Track checkout start
        const { trackCheckoutStart } = await import('@/lib/analytics')
        trackCheckoutStart(selected.enquiryId, amount, paymentType)

        // Create payment intent
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: Math.round(amount * 100), // Convert to cents
            currency: 'aed',
            enquiry_id: selected.enquiryId,
            quote_index: selected.quoteIndex,
            payment_type: paymentType,
            metadata: {
              enquiry_id: selected.enquiryId,
              authority_id: quote.authority_id,
              authority_name: quote.authority_name,
              total_cost: quote.total_cost.toString(),
              payment_type: paymentType,
            },
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to create payment intent')
        }

        const { clientSecret: secret } = await response.json()
        setClientSecret(secret)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    initializeCheckout()
  }, [searchParams])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pearl-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-emirati-gold border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Setting up secure checkout...</p>
        </div>
      </div>
    )
  }

  if (error || !clientSecret || !orderSummary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pearl-white">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-red-200">
            <h2 className="font-serif text-2xl text-valtora-navy mb-4">Checkout Error</h2>
            <p className="text-gray-700 mb-6">{error || 'Unable to load checkout'}</p>
            <button
              onClick={() => router.push('/')}
              className="btn-primary w-full"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-pearl-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-4xl text-valtora-navy mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border border-gray-200">
                <h2 className="font-serif text-2xl text-valtora-navy mb-6">Payment Details</h2>
                
                {stripePromise ? (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: 'stripe',
                        variables: {
                          colorPrimary: '#D4AF37',
                          colorBackground: '#ffffff',
                          colorText: '#111111',
                          colorDanger: '#df1b41',
                          fontFamily: 'Inter, system-ui, sans-serif',
                          spacingUnit: '4px',
                          borderRadius: '6px',
                        },
                      },
                    }}
                  >
                    <CheckoutForm
                      clientSecret={clientSecret}
                      amount={orderSummary.amount}
                      paymentType={orderSummary.paymentType}
                      enquiryId={orderSummary.enquiryId}
                      quoteIndex={orderSummary.quoteIndex}
                    />
                  </Elements>
                ) : (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                      Stripe is not configured. Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in your environment variables.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 sticky top-24">
                <h2 className="font-serif text-2xl text-valtora-navy mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Authority</p>
                    <p className="font-semibold text-valtora-navy">
                      {orderSummary.quote.authority_name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {orderSummary.quote.jurisdiction_type}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Payment Type</p>
                    <p className="font-semibold text-valtora-navy capitalize">
                      {orderSummary.paymentType === 'deposit' ? 'Deposit (AED 500)' : 'Full Payment'}
                    </p>
                    {orderSummary.paymentType === 'deposit' && (
                      <p className="text-xs text-gray-500 mt-1">
                        Remaining balance: {(orderSummary.quote.total_cost - 500).toLocaleString()} AED
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-gray-700">Total Amount</span>
                      <span className="text-2xl font-bold text-valtora-navy">
                        {orderSummary.amount.toLocaleString()} AED
                      </span>
                    </div>
                    {orderSummary.paymentType === 'deposit' && (
                      <p className="text-xs text-gray-500">
                        Full amount: {orderSummary.quote.total_cost.toLocaleString()} AED
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-600 mb-2">What's included:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-emirati-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Trade licence application</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-emirati-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-emirati-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Ongoing support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

