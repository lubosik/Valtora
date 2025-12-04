import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata(
  'FAQ - Dubai Company Formation Questions',
  'Get answers to frequently asked questions about Dubai company formation, costs, visas, timelines, and more. Expert guidance from Valtora.',
  '/faq'
)

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

