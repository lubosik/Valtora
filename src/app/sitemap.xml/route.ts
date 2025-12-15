import { redirect } from 'next/navigation'

/**
 * Redirect /sitemap.xml to /sitemap for compatibility with search engines
 * that expect the .xml extension
 */
export async function GET() {
  redirect('/sitemap')
}
