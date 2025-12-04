'use client'

import { useEffect } from 'react'
import type { VisaRequest, VisaRole, Shareholder } from '@/domain/formation/decisionEngine/types'

interface CalculatorStep3VisasProps {
  totalVisasRequested: number
  setTotalVisasRequested: (num: number) => void
  visas: VisaRequest[]
  setVisas: (visas: VisaRequest[]) => void
  shareholders: Shareholder[]
}

const visaRoles: { value: VisaRole; label: string }[] = [
  { value: 'investor', label: 'Investor' },
  { value: 'director', label: 'Director' },
  { value: 'manager', label: 'Manager' },
  { value: 'sales', label: 'Sales' },
  { value: 'technician', label: 'Technician' },
  { value: 'driver', label: 'Driver' },
  { value: 'employee', label: 'Employee' },
  { value: 'dependent', label: 'Dependent' },
]

export default function CalculatorStep3Visas({
  totalVisasRequested,
  setTotalVisasRequested,
  visas,
  setVisas,
  shareholders,
}: CalculatorStep3VisasProps) {
  // Initialize visas array when totalVisasRequested changes
  useEffect(() => {
    if (visas.length < totalVisasRequested) {
      const newVisas = [...visas]
      for (let i = visas.length; i < totalVisasRequested; i++) {
        newVisas.push({
          role: 'employee',
        })
      }
      setVisas(newVisas)
    } else if (visas.length > totalVisasRequested) {
      setVisas(visas.slice(0, totalVisasRequested))
    }
  }, [totalVisasRequested, visas, setVisas])

  const handleVisaChange = (index: number, field: keyof VisaRequest, value: any) => {
    const updated = [...visas]
    updated[index] = { ...updated[index], [field]: value }
    setVisas(updated)
  }

  const shareholdersNeedingVisas = shareholders.filter((sh) => sh.requires_visa)

  return (
    <div>
      <h3 className="font-serif text-2xl text-valtora-navy mb-2">Visa Requirements</h3>
      <p className="text-gray-600 mb-6">
        Tell us how many visas you need and for whom. This includes visas for shareholders and any additional employees.
      </p>

      {/* Total Visas */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Total Number of Visas Required <span className="text-red-500">*</span>
        </label>
        <select
          value={totalVisasRequested}
          onChange={(e) => setTotalVisasRequested(parseInt(e.target.value))}
          className="w-full md:w-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emirati-gold focus:border-emirati-gold outline-none"
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? 'Visa' : 'Visas'}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-2">
          {shareholdersNeedingVisas.length > 0 && (
            <span>
              Note: {shareholdersNeedingVisas.length} shareholder(s) already marked as requiring visas.
            </span>
          )}
        </p>
      </div>

      {/* Visa Details */}
      {totalVisasRequested > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-valtora-navy mb-3">
            Visa Details
          </h4>
          {visas.map((visa, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-pearl-white">
              <h5 className="font-medium text-valtora-navy mb-3">
                Visa {index + 1}
              </h5>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Assigned To */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned To (Optional)
                  </label>
                  <select
                    value={visa.assigned_to_shareholder_id || ''}
                    onChange={(e) =>
                      handleVisaChange(index, 'assigned_to_shareholder_id', e.target.value || undefined)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emirati-gold focus:border-emirati-gold outline-none"
                  >
                    <option value="">New Employee / Not Assigned</option>
                    {shareholders.map((sh) => (
                      <option key={sh.id} value={sh.id}>
                        {sh.name || `Shareholder ${shareholders.indexOf(sh) + 1}`}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Leave blank if this visa is for a new employee not yet added as a shareholder.
                  </p>
                </div>

                {/* Visa Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visa Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={visa.role}
                    onChange={(e) => handleVisaChange(index, 'role', e.target.value as VisaRole)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emirati-gold focus:border-emirati-gold outline-none"
                  >
                    {visaRoles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalVisasRequested === 0 && (
        <div className="bg-pearl-white border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-600">
            No visas required. You can proceed to the next step.
          </p>
        </div>
      )}
    </div>
  )
}

