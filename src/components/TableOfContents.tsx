'use client'

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  headings: Heading[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0,
      }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [headings])

  if (headings.length === 0) return null

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100 // Account for fixed header if any
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="sticky top-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h3 className="font-serif text-lg text-valtora-navy mb-4">
          Table of Contents
        </h3>
        <nav>
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className={`text-left text-sm transition-colors w-full ${
                    heading.level === 2
                      ? 'pl-0 font-medium'
                      : heading.level === 3
                      ? 'pl-4'
                      : 'pl-8'
                  } ${
                    activeId === heading.id
                      ? 'text-emirati-gold'
                      : 'text-gray-600 hover:text-valtora-navy'
                  }`}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
