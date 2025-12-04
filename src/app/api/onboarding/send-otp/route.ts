import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/onboarding/send-otp
 * Sends an OTP code to the provided phone number
 * 
 * This is a stub implementation. In production, integrate with:
 * - Twilio
 * - AWS SNS
 * - MessageBird
 * - Or another SMS provider
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phone } = body

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // TODO: Integrate with SMS provider
    // Example with Twilio:
    // const client = require('twilio')(accountSid, authToken)
    // await client.messages.create({
    //   body: `Your Valtora verification code is: ${otp}`,
    //   to: phone,
    //   from: '+1234567890'
    // })

    // For now, store OTP in memory (in production, use Redis or database with expiration)
    // This is just a stub - in production, use proper session storage
    console.log(`OTP for ${phone}: ${otp}`)

    // In development, return the OTP so it can be tested
    // In production, remove this and only log server-side
    const isDevelopment = process.env.NODE_ENV === 'development'

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      ...(isDevelopment && { otp }), // Only return OTP in development
    })
  } catch (error) {
    console.error('Error sending OTP:', error)
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    )
  }
}

