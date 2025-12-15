import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/blog'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://valtora.com'
  const siteName = 'Valtora'
  const siteDescription = 'Expert insights, guides, and updates about Dubai company formation, UAE business setup, visas, and free zone regulations.'

  // Get all blog posts, sorted by published date (newest first)
  const blogPosts = getAllPosts().sort((a, b) => {
    const dateA = new Date(a.publishedDate).getTime()
    const dateB = new Date(b.publishedDate).getTime()
    return dateB - dateA
  })

  // Build RSS feed XML
  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteName)} - Blog</title>
    <link>${baseUrl}/blog</link>
    <description>${escapeXml(siteDescription)}</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml" />
`

  // Add blog posts as items
  for (const post of blogPosts) {
    const pubDate = new Date(post.publishedDate).toUTCString()
    const postUrl = `${baseUrl}/blog/${post.slug}`
    
    // Strip HTML tags from content for description
    const plainTextContent = post.content
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 300) // Limit to 300 characters
    
    // Escape XML special characters
    const escapedTitle = escapeXml(post.title)
    const escapedDescription = escapeXml(post.description || plainTextContent)
    const escapedContent = escapeXml(post.content)

    rss += `    <item>
      <title>${escapedTitle}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapedDescription}</description>
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(post.author)}</author>
      <category>${escapeXml(post.category)}</category>
`
    
    // Add tags as categories
    for (const tag of post.tags) {
      rss += `      <category>${escapeXml(tag)}</category>
`
    }

    rss += `    </item>
`
  }

  rss += `  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
