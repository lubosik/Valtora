'use client'

import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { extractHeadings, formatDate } from '@/lib/blog'
import { insertCTAEmbeds } from '@/lib/blog-content'
import { generateBlogPostingSchema, generateBreadcrumbSchema } from '@/lib/seo'
import type { BlogPost } from '@/lib/blog'
import Breadcrumbs from './Breadcrumbs'
import TableOfContents from './TableOfContents'
import InlineCTAEmbed from './InlineCTAEmbed'
import LeadCapturePopup from './LeadCapturePopup'
import { useLeadCapturePopup } from '@/hooks/useLeadCapturePopup'

interface BlogPostContentProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export default function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
  const pathname = usePathname()
  const { showPopup, handleClose } = useLeadCapturePopup()
  const headings = extractHeadings(post.content)
  const hasTOC = headings.length > 0

  // Add IDs to headings in content for TOC navigation
  const contentWithIds = post.content.replace(
    /<h([2-4])[^>]*>(.*?)<\/h[2-4]>/gi,
    (match, level, text) => {
      const id = text
        .replace(/<[^>]*>/g, '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      return `<h${level} id="${id}">${text}</h${level}>`
    }
  )

  // Split content and insert CTAs
  const contentChunks = insertCTAEmbeds(contentWithIds, 'CTA_EMBED')

  // Generate structured data
  const blogPostingSchema = generateBlogPostingSchema({
    title: post.title,
    description: post.description,
    slug: post.slug,
    publishedDate: post.publishedDate,
    updatedDate: post.updatedDate,
    author: post.author,
    image: post.image,
    category: post.category,
    tags: post.tags,
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ])

  return (
    <>
      {/* Structured Data - BlogPosting */}
      <Script
        id="blog-posting-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingSchema),
        }}
      />
      {/* Structured Data - Breadcrumbs */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <div className="min-h-screen bg-pearl-white">
        {/* Hero Image */}
        <div className="relative h-64 md:h-96 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-valtora-navy/90 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-8">
            <div className="max-w-4xl mx-auto">
              <span className="inline-block bg-emirati-gold text-carbon-black px-3 py-1 rounded-full text-xs font-semibold mb-4">
                {post.category}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-pearl-white mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-200">
                <time dateTime={post.publishedDate}>
                  {formatDate(post.publishedDate, 'Published')}
                </time>
                {post.updatedDate && (
                  <time dateTime={post.updatedDate}>
                    {formatDate(post.updatedDate, 'Updated')}
                  </time>
                )}
                <span>•</span>
                <span>{post.readTime}</span>
                <span>•</span>
                <span>By {post.author}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-3">
                  {/* Breadcrumbs */}
                  <Breadcrumbs
                    items={[
                      { label: 'Home', href: '/' },
                      { label: 'Blog', href: '/blog' },
                      { label: post.title },
                    ]}
                  />

                  {/* Article Content with Embedded CTAs */}
                  <div>
                    {contentChunks.map((chunk, index) => {
                      if (chunk.type === 'cta') {
                        return <InlineCTAEmbed key={`cta-${index}`} />
                      }
                      return (
                        <div
                          key={`content-${index}`}
                          className="prose prose-lg max-w-none
                            prose-headings:font-serif prose-headings:text-valtora-navy prose-headings:scroll-mt-24
                            prose-headings:mb-6 prose-headings:mt-8 prose-headings:first:mt-0
                            prose-h2:text-3xl prose-h2:font-bold prose-h2:leading-tight
                            prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4
                            prose-h4:text-xl prose-h4:font-semibold prose-h4:mt-6 prose-h4:mb-3
                            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-base
                            prose-strong:text-valtora-navy prose-strong:font-semibold
                            prose-ul:text-gray-700 prose-ul:mb-6 prose-ul:mt-4 prose-ul:space-y-2
                            prose-li:text-gray-700 prose-li:leading-relaxed prose-li:ml-4
                            prose-ol:text-gray-700 prose-ol:mb-6 prose-ol:mt-4 prose-ol:space-y-2
                            prose-a:text-oasis-blue prose-a:no-underline hover:prose-a:underline
                            prose-blockquote:border-l-emirati-gold prose-blockquote:text-gray-600 prose-blockquote:my-6 prose-blockquote:pl-6
                            prose-code:text-valtora-navy prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:my-6
                            prose-table:my-6 prose-table:w-full
                            prose-img:my-8 prose-img:rounded-lg"
                          dangerouslySetInnerHTML={{ __html: chunk.content }}
                        />
                      )
                    })}
                  </div>

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Tags:</p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Back to Blog */}
                  <div className="mt-8">
                    <Link
                      href="/blog"
                      className="inline-flex items-center text-oasis-blue hover:text-valtora-navy transition-colors font-medium"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                      Back to Blog
                    </Link>
                  </div>
                </div>

                {/* Sidebar: Table of Contents */}
                <div className="lg:col-span-1">
                  {hasTOC && <TableOfContents headings={headings} />}
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <section className="mt-16 pt-12 border-t border-gray-200">
                  <h2 className="font-serif text-3xl text-valtora-navy mb-8">Related Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.slug}`}
                        className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="relative h-40 overflow-hidden">
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        <div className="p-4">
                          <span className="text-xs text-emirati-gold font-semibold">
                            {relatedPost.category}
                          </span>
                          <h3 className="font-serif text-lg text-valtora-navy mt-2 mb-2 line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </article>
      </div>

      {/* Lead Capture Popup */}
      {showPopup && <LeadCapturePopup onClose={handleClose} />}
    </>
  )
}
