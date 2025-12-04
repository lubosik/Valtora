import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/leads/capture
 * Captures lead information from popup forms and other sources
 * 
 * In production, this would integrate with:
 * - Go High Level (GHL) webhooks
 * - Airtable
 * - CRM systems
 * - Email marketing platforms
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { first_name, last_name, email, phone, source } = body

    // Validation
    if (!first_name || !last_name || !email || !phone) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // TODO: Integrate with CRM/lead capture system
    // Example with Go High Level:
    // await fetch('https://api.gohighlevel.com/v1/contacts/', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     firstName: first_name,
    //     lastName: last_name,
    //     email: email,
    //     phone: phone,
    //     source: source || 'website',
    //     tags: ['lead_capture', 'popup'],
    //   }),
    // })

    // Example with Airtable:
    // const Airtable = require('airtable')
    // const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
    // await base('Leads').create([{
    //   fields: {
    //     'First Name': first_name,
    //     'Last Name': last_name,
    //     'Email': email,
    //     'Phone': phone,
    //     'Source': source || 'website',
    //     'Date': new Date().toISOString(),
    //   },
    // }])

    // For now, just log the lead
    console.log('Lead captured:', {
      first_name,
      last_name,
      email,
      phone,
      source: source || 'unknown',
      timestamp: new Date().toISOString(),
    })

    // TODO: Send notification email to team
    // await sendEmail({
    //   to: 'team@valtora.com',
    //   subject: 'New Lead: Request for Call',
    //   body: `New lead from ${source}: ${first_name} ${last_name} - ${email} - ${phone}`,
    // })

    return NextResponse.json({
      success: true,
      message: 'Thank you! We will contact you shortly.',
    })
  } catch (error) {
    console.error('Error capturing lead:', error)
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    )
  }
}

