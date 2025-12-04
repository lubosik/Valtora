import Image from 'next/image'
import Link from 'next/link'

interface ValtoraLogoProps {
  className?: string
  width?: number
  height?: number
}

export default function ValtoraLogo({
  className = '',
  width = 180,
  height = 60,
}: ValtoraLogoProps) {
  return (
    <Link href="/" className={`inline-block ${className}`}>
      <Image
        src="/valtora-logo.png"
        alt="Valtora Company Formations"
        width={width}
        height={height}
        priority
        className="h-auto w-auto object-contain"
        style={{ minWidth: '120px', minHeight: '40px' }}
      />
    </Link>
  )
}

