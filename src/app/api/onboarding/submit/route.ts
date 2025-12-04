import { NextRequest, NextResponse } from 'next/server'
import { getUTMParamsFromRequest } from '@/lib/analytics'

/**
 * POST /api/onboarding/submit
 * Submits the complete onboarding/KYC data
 * 
 * In production, this would:
 * - Save documents to cloud storage (S3, Cloudinary, etc.)
 * - Store onboarding data in database
 * - Trigger CRM webhook (Go High Level, etc.)
 * - Send confirmation emails
 * - Create order/case record
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { enquiry_id, onboarding_data } = body

    if (!enquiry_id) {
      return NextResponse.json(
        { error: 'enquiry_id is required' },
        { status: 400 }
      )
    }

    if (!onboarding_data) {
      return NextResponse.json(
        { error: 'onboarding_data is required' },
        { status: 400 }
      )
    }

    // TODO: Implement document upload to cloud storage
    // Example with AWS S3:
    // const s3 = new AWS.S3()
    // for (const [key, file] of Object.entries(onboarding_data)) {
    //   if (file instanceof File) {
    //     await s3.upload({
    //       Bucket: 'valtora-documents',
    //       Key: `${enquiry_id}/${key}`,
    //       Body: file,
    //     })
    //   }
    // }

    // TODO: Save onboarding data to database
    // await db.onboarding.create({
    //   enquiry_id,
    //   personal_info: { ... },
    //   documents: { ... },
    //   company_info: { ... },
    //   signatures: { ... },
    // })

    // TODO: Trigger CRM webhook
    // await fetch('https://api.gohighlevel.com/v1/webhooks/...', {
    //   method: 'POST',
    //   body: JSON.stringify({ enquiry_id, status: 'onboarding_complete' }),
    // })

    // TODO: Send confirmation email
    // await sendEmail({
    //   to: onboarding_data.email,
    //   subject: 'Onboarding Complete - Valtora',
    //   template: 'onboarding-complete',
    // })

    // Get UTM parameters from request cookies
    const cookieHeader = request.headers.get('cookie')
    const utmParams = getUTMParamsFromRequest(cookieHeader)

    console.log('Onboarding submitted:', { 
      enquiry_id, 
      onboarding_data,
      utm_params: utmParams,
    })

    return NextResponse.json({
      success: true,
      message: 'Onboarding data submitted successfully',
      enquiry_id,
    })
  } catch (error) {
    console.error('Error submitting onboarding:', error)
    return NextResponse.json(
      { error: 'Failed to submit onboarding data' },
      { status: 500 }
    )
  }
}

