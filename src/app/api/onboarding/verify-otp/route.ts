import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/onboarding/verify-otp
 * Verifies an OTP code for phone verification
 * 
 * This is a stub implementation. In production, verify against stored OTP
 * from your SMS provider or session storage (Redis, database, etc.)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phone, otp } = body

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    if (!otp || typeof otp !== 'string' || otp.length !== 6) {
      return NextResponse.json(
        { error: 'Invalid OTP format' },
        { status: 400 }
      )
    }

    // TODO: Verify OTP against stored value
    // In production, retrieve from Redis/database and verify
    // For now, accept any 6-digit code in development
    const isDevelopment = process.env.NODE_ENV === 'development'

    if (isDevelopment) {
      // In development, accept any 6-digit code
      return NextResponse.json({
        success: true,
        verified: true,
      })
    }

    // In production, verify against stored OTP
    // const storedOtp = await getStoredOtp(phone)
    // if (!storedOtp || storedOtp !== otp) {
    //   return NextResponse.json(
    //     { error: 'Invalid OTP code' },
    //     { status: 400 }
    //   )
    // }

    return NextResponse.json({
      success: true,
      verified: true,
    })
  } catch (error) {
    console.error('Error verifying OTP:', error)
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    )
  }
}

