import { redirect } from 'next/navigation'

/**
 * Redirect /rss.xml to /rss for compatibility with RSS feed readers
 * that expect the .xml extension
 */
export async function GET() {
  redirect('/rss')
}
