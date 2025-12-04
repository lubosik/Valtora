import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata(
  'About Valtora - Dubai Company Formation Experts',
  'Learn about Valtora Company Formations, our story, expertise, and commitment to transparent Dubai company formation services.',
  '/about'
)

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

