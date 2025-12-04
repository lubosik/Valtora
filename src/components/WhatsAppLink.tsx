'use client'

import { ReactNode } from 'react'
import { trackWhatsAppClick } from '@/lib/analytics'

interface WhatsAppLinkProps {
  href: string
  children: ReactNode
  className?: string
  location?: string
  [key: string]: any // Allow other anchor props
}

export default function WhatsAppLink({
  href,
  children,
  className,
  location = 'unknown',
  ...props
}: WhatsAppLinkProps) {
  const handleClick = () => {
    trackWhatsAppClick(location)
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  )
}

