/**
 * Blog Utilities
 * 
 * Helper functions for blog functionality
 */

import { blogPosts, getAllPosts, getPostBySlug, getRelatedPosts, getAllCategories, getAllTags } from '@/content/blog/posts'
import type { BlogPost } from '@/content/blog/posts'

export { blogPosts, getAllPosts, getPostBySlug, getRelatedPosts, getAllCategories, getAllTags }
export type { BlogPost }

/**
 * Calculate reading time from content
 * Assumes average reading speed of 200 words per minute
 */
export function calculateReadTime(content: string): string {
  // Remove HTML tags and calculate word count
  const text = content.replace(/<[^>]*>/g, ' ')
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}

/**
 * Format date for display
 * Returns format: "Published (Monday, 15th December 2025)" or "Updated (Monday, 15th December 2025)"
 */
export function formatDate(dateString: string, prefix: 'Published' | 'Updated' = 'Published'): string {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleDateString('en-US', { month: 'long' })
  const year = date.getFullYear()
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
  
  // Add ordinal suffix (st, nd, rd, th)
  const getOrdinal = (n: number): string => {
    const s = ['th', 'st', 'nd', 'rd']
    const v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
  }
  
  return `${prefix} (${dayName}, ${getOrdinal(day)} ${month} ${year})`
}

/**
 * Extract headings from HTML content for table of contents
 */
export function extractHeadings(content: string): Array<{ id: string; text: string; level: number }> {
  const headingRegex = /<h([2-4])[^>]*>(.*?)<\/h[2-4]>/gi
  const headings: Array<{ id: string; text: string; level: number }> = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1], 10)
    const text = match[2].replace(/<[^>]*>/g, '').trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    
    headings.push({ id, text, level })
  }

  return headings
}

/**
 * Search posts by query
 */
export function searchPosts(query: string, posts: BlogPost[] = getAllPosts()): BlogPost[] {
  if (!query.trim()) return posts

  const lowerQuery = query.toLowerCase()
  return posts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.description.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    post.category.toLowerCase().includes(lowerQuery)
  )
}

/**
 * Filter posts by category
 */
export function filterPostsByCategory(category: string, posts: BlogPost[] = getAllPosts()): BlogPost[] {
  if (!category) return posts
  return posts.filter(post => post.category === category)
}

/**
 * Filter posts by tag
 */
export function filterPostsByTag(tag: string, posts: BlogPost[] = getAllPosts()): BlogPost[] {
  if (!tag) return posts
  return posts.filter(post => post.tags.includes(tag))
}
