'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface ApplicationStatus {
  id: string
  enquiry_id: string
  status: 'pending' | 'in_progress' | 'completed'
  current_step: number
  steps: StatusStep[]
  documents: Document[]
  tasks: Task[]
  created_at: string
  authority_name: string
}

interface StatusStep {
  id: string
  name: string
  status: 'pending' | 'in_progress' | 'completed'
  completed_at?: string
  description: string
}

interface Document {
  id: string
  name: string
  type: string
  url?: string
  uploaded_at?: string
  status: 'pending' | 'available'
}

interface Task {
  id: string
  title: string
  description: string
  due_date?: string
  status: 'pending' | 'completed'
  priority: 'high' | 'medium' | 'low'
}

const defaultSteps: StatusStep[] = [
  {
    id: 'passport_received',
    name: 'Passport Received',
    status: 'completed',
    completed_at: new Date().toISOString(),
    description: 'Your passport and documents have been received and verified',
  },
  {
    id: 'name_reserved',
    name: 'Name Reserved',
    status: 'completed',
    completed_at: new Date().toISOString(),
    description: 'Company name has been reserved with the authority',
  },
  {
    id: 'application_submitted',
    name: 'Application Submitted',
    status: 'in_progress',
    description: 'Application submitted to authority, awaiting approval',
  },
  {
    id: 'payment_receipt',
    name: 'Payment Receipt Issued',
    status: 'pending',
    description: 'Payment receipt will be issued upon approval',
  },
  {
    id: 'licence_issued',
    name: 'Licence Issued',
    status: 'pending',
    description: 'Trade licence will be issued by the authority',
  },
  {
    id: 'establishment_card',
    name: 'Establishment Card Issued',
    status: 'pending',
    description: 'Establishment card will be issued',
  },
  {
    id: 'visa_application',
    name: 'Visa Application Submitted',
    status: 'pending',
    description: 'Visa applications will be submitted',
  },
  {
    id: 'medical_booked',
    name: 'Medical Booked',
    status: 'pending',
    description: 'Medical examination will be scheduled',
  },
  {
    id: 'emirates_id',
    name: 'Emirates ID Completed',
    status: 'pending',
    description: 'Emirates ID application will be processed',
  },
]

const defaultDocuments: Document[] = [
  {
    id: 'trade_licence',
    name: 'Trade Licence',
    type: 'PDF',
    status: 'pending',
  },
  {
    id: 'establishment_card',
    name: 'Establishment Card',
    type: 'PDF',
    status: 'pending',
  },
  {
    id: 'memorandum',
    name: 'Memorandum of Association',
    type: 'PDF',
    status: 'pending',
  },
  {
    id: 'payment_receipt',
    name: 'Payment Receipt',
    type: 'PDF',
    status: 'pending',
  },
  {
    id: 'vat_certificate',
    name: 'VAT Certificate (if applicable)',
    type: 'PDF',
    status: 'pending',
  },
]

const defaultTasks: Task[] = [
  {
    id: 'upload_passport',
    title: 'Upload Passport Copy',
    description: 'Please upload a clear copy of your passport',
    status: 'completed',
    priority: 'high',
  },
  {
    id: 'sign_agreement',
    title: 'Sign Service Agreement',
    description: 'Review and sign the customer service agreement',
    status: 'completed',
    priority: 'high',
  },
  {
    id: 'provide_trade_name',
    title: 'Provide Trade Name Options',
    description: 'Submit your preferred company name options',
    status: 'completed',
    priority: 'medium',
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [application, setApplication] = useState<ApplicationStatus | null>(null)

  useEffect(() => {
    // Mock authentication check
    // In production, this would verify JWT token, session, etc.
    const checkAuth = async () => {
      // For now, check if we have an enquiry_id in query params or sessionStorage
      const enquiryId = searchParams.get('enquiry_id') || 
                       (typeof window !== 'undefined' ? sessionStorage.getItem('enquiry_id') : null)

      if (enquiryId) {
        // Mock: Load application data
        // In production, fetch from API
        setApplication({
          id: 'app-1',
          enquiry_id: enquiryId,
          status: 'in_progress',
          current_step: 2,
          steps: defaultSteps,
          documents: defaultDocuments,
          tasks: defaultTasks,
          created_at: new Date().toISOString(),
          authority_name: 'Sharjah Publishing City Free Zone (SPC)',
        })
        setIsAuthenticated(true)
      } else {
        // No enquiry ID, show login/access form
        setIsAuthenticated(false)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [searchParams])

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const enquiryId = formData.get('enquiry_id') as string

    // Mock login - in production, verify credentials with backend
    if (email && enquiryId) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('enquiry_id', enquiryId)
        sessionStorage.setItem('user_email', email)
      }
      setIsAuthenticated(true)
      // Reload application data
      setApplication({
        id: 'app-1',
        enquiry_id: enquiryId,
        status: 'in_progress',
        current_step: 2,
        steps: defaultSteps,
        documents: defaultDocuments,
        tasks: defaultTasks,
        created_at: new Date().toISOString(),
        authority_name: 'Sharjah Publishing City Free Zone (SPC)',
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pearl-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-emirati-gold border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !application) {
    return (
      <div className="min-h-screen bg-pearl-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <h1 className="font-serif text-3xl text-valtora-navy mb-2">Client Dashboard</h1>
              <p className="text-gray-600 mb-6">
                Enter your email and enquiry ID to access your application status
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emirati-gold focus:border-emirati-gold outline-none"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="enquiry_id" className="block text-sm font-medium text-gray-700 mb-2">
                    Enquiry ID
                  </label>
                  <input
                    type="text"
                    id="enquiry_id"
                    name="enquiry_id"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emirati-gold focus:border-emirati-gold outline-none font-mono"
                    placeholder="ENQ-123456-ABC"
                  />
                </div>

                <button type="submit" className="btn-primary w-full py-3">
                  Access Dashboard
                </button>
              </form>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Don't have your enquiry ID?{' '}
                <a
                  href="https://wa.me/447393961000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-oasis-blue hover:underline"
                >
                  Contact support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-pearl-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="font-serif text-4xl text-valtora-navy mb-2">Application Dashboard</h1>
                <p className="text-gray-600">
                  Track your company formation progress in real-time
                </p>
              </div>
              <a
                href="https://wa.me/447393961000?text=Hi%20Valtora%2C%20I%20have%20a%20question%20about%20my%20application."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Chat with Support
              </a>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Enquiry ID: <span className="font-mono font-semibold text-valtora-navy">{application.enquiry_id}</span></span>
              <span>•</span>
              <span>Authority: <span className="font-semibold text-valtora-navy">{application.authority_name}</span></span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Status Timeline */}
            <div className="lg:col-span-2 space-y-6">
              {/* Application Status Timeline */}
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border border-gray-200">
                <h2 className="font-serif text-2xl text-valtora-navy mb-6">Application Status</h2>
                <div className="space-y-6">
                  {application.steps.map((step, index) => {
                    const isCompleted = step.status === 'completed'
                    const isInProgress = step.status === 'in_progress'
                    const isPending = step.status === 'pending'

                    return (
                      <div key={step.id} className="flex gap-4">
                        {/* Timeline Line */}
                        <div className="flex flex-col items-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isCompleted
                              ? 'bg-emirati-gold text-white'
                              : isInProgress
                              ? 'bg-oasis-blue text-white border-4 border-emirati-gold'
                              : 'bg-gray-200 text-gray-500'
                          }`}>
                            {isCompleted ? (
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <span className="font-medium">{index + 1}</span>
                            )}
                          </div>
                          {index < application.steps.length - 1 && (
                            <div className={`w-0.5 flex-1 mt-2 ${
                              isCompleted ? 'bg-emirati-gold' : 'bg-gray-200'
                            }`}></div>
                          )}
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 pb-6">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className={`font-semibold ${
                              isCompleted ? 'text-valtora-navy' : isInProgress ? 'text-oasis-blue' : 'text-gray-700'
                            }`}>
                              {step.name}
                            </h3>
                            {step.completed_at && (
                              <span className="text-xs text-gray-500">
                                {new Date(step.completed_at).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{step.description}</p>
                          {isInProgress && (
                            <div className="mt-2 flex items-center gap-2 text-xs text-oasis-blue">
                              <div className="animate-pulse w-2 h-2 bg-oasis-blue rounded-full"></div>
                              <span>In Progress</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Tasks Section */}
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <h2 className="font-serif text-2xl text-valtora-navy mb-4">Outstanding Tasks</h2>
                {application.tasks.filter(t => t.status === 'pending').length > 0 ? (
                  <div className="space-y-3">
                    {application.tasks
                      .filter(t => t.status === 'pending')
                      .map((task) => (
                        <div
                          key={task.id}
                          className="p-4 border border-gray-200 rounded-lg hover:border-emirati-gold transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-valtora-navy">{task.title}</h3>
                                {task.priority === 'high' && (
                                  <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                                    High Priority
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{task.description}</p>
                              {task.due_date && (
                                <p className="text-xs text-gray-500 mt-2">
                                  Due: {new Date(task.due_date).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => {
                                // TODO: Mark task as completed
                                alert('Task completion will be implemented with backend integration')
                              }}
                              className="ml-4 px-4 py-2 bg-emirati-gold text-carbon-black rounded-lg hover:bg-emirati-gold-hover transition-colors text-sm"
                            >
                              Complete
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>All tasks completed! Great work.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Document Library */}
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <h2 className="font-serif text-2xl text-valtora-navy mb-4">Document Library</h2>
                <div className="space-y-3">
                  {application.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-700">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.type}</p>
                        </div>
                      </div>
                      {doc.status === 'available' && doc.url ? (
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-oasis-blue hover:underline text-sm"
                        >
                          Download
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">Pending</span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Documents will be available for download as they are issued
                </p>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <h2 className="font-serif text-2xl text-valtora-navy mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <a
                    href="https://wa.me/447393961000?text=Hi%20Valtora%2C%20I%20have%20a%20question%20about%20my%20application."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    Chat with Support
                  </a>
                  <button
                    onClick={() => {
                      // TODO: Implement document upload
                      alert('Document upload will open a modal or redirect to upload page')
                    }}
                    className="block w-full text-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    Upload Documents
                  </button>
                  <Link
                    href="/quote"
                    className="block w-full text-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    View Quote
                  </Link>
                </div>
              </div>

              {/* Support Info */}
              <div className="bg-pearl-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-valtora-navy mb-3">Need Help?</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Phone:</strong>{' '}
                    <a href="tel:+447393961000" className="text-oasis-blue hover:underline">
                      +44 739 396 1000
                    </a>
                  </p>
                  <p>
                    <strong>WhatsApp:</strong>{' '}
                    <a
                      href="https://wa.me/447393961000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-oasis-blue hover:underline"
                    >
                      Chat Now
                    </a>
                  </p>
                  <p className="text-xs text-gray-500 mt-3">
                    Our support team is available to assist you with any questions about your application.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

