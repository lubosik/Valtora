import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/blog'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://valtora.com'
  const currentDate = new Date().toISOString()

  // Get all blog posts
  const blogPosts = getAllPosts()

  // Core pages
  const corePages = [
    { url: '', changefreq: 'weekly', priority: '1.0' },
    { url: '/quote', changefreq: 'monthly', priority: '0.8' },
    { url: '/faq', changefreq: 'monthly', priority: '0.8' },
    { url: '/about', changefreq: 'monthly', priority: '0.7' },
    { url: '/blog', changefreq: 'weekly', priority: '0.8' },
    { url: '/case-studies', changefreq: 'monthly', priority: '0.7' },
    { url: '/legal/terms', changefreq: 'yearly', priority: '0.3' },
    { url: '/legal/privacy', changefreq: 'yearly', priority: '0.3' },
    { url: '/legal/refund', changefreq: 'yearly', priority: '0.3' },
  ]

  // Build sitemap XML
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

  // Add core pages
  for (const page of corePages) {
    sitemap += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`
  }

  // Add blog posts
  for (const post of blogPosts) {
    const lastmod = post.updatedDate || post.publishedDate
    const lastmodDate = new Date(lastmod).toISOString()
    
    sitemap += `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmodDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`
  }

  sitemap += `</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}

