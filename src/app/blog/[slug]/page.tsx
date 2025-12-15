import { notFound } from 'next/navigation'
import { generatePageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import { getPostBySlug, getRelatedPosts } from '@/lib/blog'
import BlogPostContent from '@/components/BlogPostContent'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) {
    return {
      title: 'Blog Post Not Found | Valtora',
      description: 'The requested blog post could not be found.',
    }
  }

  const metadata = generatePageMetadata(
    `${post.title} | Valtora Blog`,
    post.description,
    `/blog/${post.slug}`
  )

  // Add OG image if available
  if (post.ogImage) {
    metadata.openGraph = {
      ...metadata.openGraph,
      images: [
        {
          url: post.ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    }
  }

  // Add canonical URL if available
  if (post.canonicalUrl) {
    metadata.alternates = {
      canonical: post.canonicalUrl,
    }
  }

  return metadata
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post, 3)

  return <BlogPostContent post={post} relatedPosts={relatedPosts} />
}
