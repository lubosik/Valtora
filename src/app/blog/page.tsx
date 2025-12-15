'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LeadCapturePopup from '@/components/LeadCapturePopup'
import { useLeadCapturePopup } from '@/hooks/useLeadCapturePopup'
import { getAllPosts, getAllCategories, searchPosts, filterPostsByCategory, formatDate } from '@/lib/blog'
import type { BlogPost } from '@/lib/blog'

const allPosts = getAllPosts()
const allCategories = getAllCategories()

export default function BlogPage() {
  const { showPopup, handleClose } = useLeadCapturePopup()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    let posts = allPosts

    if (selectedCategory) {
      posts = filterPostsByCategory(selectedCategory, posts)
    }

    if (searchQuery) {
      posts = searchPosts(searchQuery, posts)
    }

    return posts
  }, [searchQuery, selectedCategory])

  return (
    <div className="min-h-screen bg-pearl-white">
      {/* Hero Section */}
      <section className="bg-valtora-navy text-pearl-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Dubai Company Formation Insights
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Expert guides, industry updates, and practical advice for entrepreneurs setting up businesses in Dubai and the UAE.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-primary w-full"
                />
              </div>

              {/* Category Filter */}
              <div className="md:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-primary w-full"
                >
                  <option value="">All Categories</option>
                  {allCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results count */}
            {filteredPosts.length !== allPosts.length && (
              <p className="text-sm text-gray-600 mt-4">
                Showing {filteredPosts.length} of {allPosts.length} articles
                {selectedCategory && ` in ${selectedCategory}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">No articles found.</p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('')
                  }}
                  className="text-emirati-gold hover:text-emirati-gold-hover underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-emirati-gold text-carbon-black px-3 py-1 rounded-full text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <time dateTime={post.publishedDate}>
                          {formatDate(post.publishedDate)}
                        </time>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h2 className="font-serif text-xl md:text-2xl text-valtora-navy mb-3 font-semibold line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-emirati-gold font-semibold text-sm group">
                        <span>Read More</span>
                        <svg
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-desert-sand">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-valtora-navy mb-4">
              Ready to Start Your Dubai Company?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Get an instant quote and see transparent pricing for your Dubai company formation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="btn-primary text-lg px-8 py-4 inline-block text-center"
              >
                Get Your Instant Quote
              </Link>
              <Link
                href="/"
                className="btn-secondary text-lg px-8 py-4 inline-block text-center"
              >
                Calculate Your Cost
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Popup */}
      {showPopup && <LeadCapturePopup onClose={handleClose} />}
    </div>
  )
}

