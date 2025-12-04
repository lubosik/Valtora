'use client'

import { useRef, useState } from 'react'

interface DocumentsData {
  passportFile: File | null
  uaeEntryStampFile: File | null
  passportPhotoFile: File | null
  proofOfAddressFile: File | null
}

interface OnboardingStep2DocumentsProps {
  data: DocumentsData
  updateData: (updates: Partial<DocumentsData>) => void
}

interface FileUploadProps {
  label: string
  required: boolean
  file: File | null
  onChange: (file: File | null) => void
  accept?: string
  description?: string
}

function FileUpload({ label, required, file, onChange, accept, description }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      onChange(selectedFile)
      
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(selectedFile)
      } else {
        setPreview(null)
      }
    }
  }

  const handleRemove = () => {
    onChange(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment')
      fileInputRef.current.click()
    }
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && (
        <p className="text-xs text-gray-500 mb-3">{description}</p>
      )}

      {file ? (
        <div className="space-y-3">
          {preview ? (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Preview"
                className="w-full max-w-xs h-auto rounded-lg border border-gray-200"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2 p-3 bg-pearl-white rounded-lg">
              <svg className="w-8 h-8 text-emirati-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept || 'image/*,.pdf'}
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-emirati-gold hover:bg-emirati-gold/5 transition-colors text-sm text-gray-700"
            >
              Choose File
            </button>
            {accept?.includes('image') && (
              <button
                type="button"
                onClick={handleCapture}
                className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700"
              >
                📷 Camera
              </button>
            )}
          </div>
          <p className="text-xs text-gray-500">
            Accepted: JPG, PNG, PDF (Max 10MB)
          </p>
        </div>
      )}
    </div>
  )
}

export default function OnboardingStep2Documents({
  data,
  updateData,
}: OnboardingStep2DocumentsProps) {
  return (
    <div>
      <h2 className="font-serif text-3xl text-valtora-navy mb-2">Document Uploads</h2>
      <p className="text-gray-600 mb-6">
        Please upload the required documents. You can use your mobile camera to capture documents directly.
      </p>

      <div className="space-y-6">
        <FileUpload
          label="Passport Copy"
          required
          file={data.passportFile}
          onChange={(file) => updateData({ passportFile: file })}
          accept="image/*,.pdf"
          description="Upload a clear copy of your passport (all pages)"
        />

        <FileUpload
          label="UAE Entry Stamp or Current Visa (if applicable)"
          required={false}
          file={data.uaeEntryStampFile}
          onChange={(file) => updateData({ uaeEntryStampFile: file })}
          accept="image/*,.pdf"
          description="If you have visited the UAE or have a current visa, please upload a copy"
        />

        <FileUpload
          label="Passport-Style Photo"
          required
          file={data.passportPhotoFile}
          onChange={(file) => updateData({ passportPhotoFile: file })}
          accept="image/*"
          description="Recent passport-style photo (white background, professional attire)"
        />

        <FileUpload
          label="Proof of Address"
          required
          file={data.proofOfAddressFile}
          onChange={(file) => updateData({ proofOfAddressFile: file })}
          accept="image/*,.pdf"
          description="Utility bill, bank statement, or government-issued document showing your current address (not older than 3 months)"
        />
      </div>

      <div className="mt-6 p-4 bg-pearl-white border border-gray-200 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> All documents must be clear and legible. Blurry or incomplete documents may delay your application.
        </p>
      </div>
    </div>
  )
}

