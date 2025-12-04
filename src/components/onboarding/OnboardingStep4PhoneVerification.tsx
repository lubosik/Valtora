'use client'

import { useState } from 'react'

interface OnboardingStep4PhoneVerificationProps {
  data: {
    phone: string
    phoneVerified: boolean
    otpCode: string
  }
  updateData: (updates: Partial<typeof data>) => void
  phone: string
}

export default function OnboardingStep4PhoneVerification({
  data,
  updateData,
  phone,
}: OnboardingStep4PhoneVerificationProps) {
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [otpSent, setOtpSent] = useState(false)

  const handleSendOTP = async () => {
    if (!phone || phone.trim() === '') {
      setError('Please enter a valid phone number')
      return
    }

    setIsSendingOtp(true)
    setError(null)

    try {
      const response = await fetch('/api/onboarding/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send OTP')
      }

      setOtpSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP')
    } finally {
      setIsSendingOtp(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (!data.otpCode || data.otpCode.length !== 6) {
      setError('Please enter the 6-digit OTP code')
      return
    }

    setIsVerifying(true)
    setError(null)

    try {
      const response = await fetch('/api/onboarding/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone,
          otp: data.otpCode,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Invalid OTP code')
      }

      updateData({ phoneVerified: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid OTP code')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div>
      <h2 className="font-serif text-3xl text-valtora-navy mb-2">Phone Verification</h2>
      <p className="text-gray-600 mb-6">
        We need to verify your phone number via SMS. Enter the code sent to your phone.
      </p>

      <div className="space-y-6">
        {/* Phone Number Display */}
        <div className="p-4 bg-pearl-white border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Phone Number</p>
          <p className="font-medium text-valtora-navy">{phone || 'Not provided'}</p>
          {!phone && (
            <p className="text-xs text-red-600 mt-2">
              Please go back and provide your phone number first.
            </p>
          )}
        </div>

        {/* Send OTP */}
        {!otpSent && (
          <div>
            <button
              type="button"
              onClick={handleSendOTP}
              disabled={!phone || isSendingOtp}
              className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSendingOtp ? 'Sending...' : 'Send Verification Code'}
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              You will receive a 6-digit code via SMS
            </p>
          </div>
        )}

        {/* Enter OTP */}
        {otpSent && !data.phoneVerified && (
          <div className="space-y-4">
            <div>
              <label htmlFor="otpCode" className="block text-sm font-medium text-gray-700 mb-2">
                Enter Verification Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="otpCode"
                value={data.otpCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                  updateData({ otpCode: value })
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emirati-gold focus:border-emirati-gold outline-none text-center text-2xl tracking-widest font-mono"
                placeholder="000000"
                maxLength={6}
                required
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                Enter the 6-digit code sent to {phone}
              </p>
            </div>

            <button
              type="button"
              onClick={handleVerifyOTP}
              disabled={!data.otpCode || data.otpCode.length !== 6 || isVerifying}
              className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? 'Verifying...' : 'Verify Code'}
            </button>

            <button
              type="button"
              onClick={() => {
                setOtpSent(false)
                updateData({ otpCode: '' })
                setError(null)
              }}
              className="w-full text-sm text-oasis-blue hover:underline"
            >
              Resend Code
            </button>
          </div>
        )}

        {/* Verified Status */}
        {data.phoneVerified && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-medium text-green-800">Phone Verified Successfully</p>
                <p className="text-sm text-green-700">Your phone number has been verified</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}

