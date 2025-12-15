import { generatePageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = generatePageMetadata(
  'Blog - Dubai Company Formation Insights | Valtora',
  'Expert insights, guides, and updates about Dubai company formation, UAE business setup, visas, and free zone regulations.',
  '/blog'
)

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
