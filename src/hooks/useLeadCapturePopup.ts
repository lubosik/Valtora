'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const STORAGE_KEY = 'valtora_popup_dismissed'
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
const DELAY_BEFORE_SHOW_MIN = 6000 // 6 seconds (minimum)
const DELAY_BEFORE_SHOW_MAX = 10000 // 10 seconds (maximum)
const SCROLL_THRESHOLD = 0.6 // Show after 60% scroll

// Pages where popup should show by default
const ALLOWED_PAGES = ['/', '/blog', '/blog/']

export function useLeadCapturePopup() {
  const [showPopup, setShowPopup] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Check if current page allows popup
    const isAllowedPage = ALLOWED_PAGES.some(page => {
      if (page === '/') {
        return pathname === '/'
      }
      return pathname?.startsWith(page)
    })

    if (!isAllowedPage) {
      return // Don't show popup on pages not in allowed list
    }

    // Check if popup was recently dismissed
    const dismissedTimestamp = localStorage.getItem(STORAGE_KEY)
    if (dismissedTimestamp) {
      const dismissedTime = parseInt(dismissedTimestamp, 10)
      const now = Date.now()
      if (now - dismissedTime < DISMISS_DURATION) {
        return // Don't show if dismissed within last 7 days
      } else {
        // Clear expired dismissal
        localStorage.removeItem(STORAGE_KEY)
      }
    }

    // Random delay between 6-10 seconds
    const randomDelay = Math.floor(
      Math.random() * (DELAY_BEFORE_SHOW_MAX - DELAY_BEFORE_SHOW_MIN + 1) + DELAY_BEFORE_SHOW_MIN
    )

    // Show after delay
    const delayTimer = setTimeout(() => {
      if (!hasShown) {
        setShowPopup(true)
        setHasShown(true)
      }
    }, randomDelay)

    // Show on scroll
    const handleScroll = () => {
      if (hasShown) return

      const scrollPercentage =
        (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight

      if (scrollPercentage >= SCROLL_THRESHOLD) {
        setShowPopup(true)
        setHasShown(true)
      }
    }

    // Show on exit intent (desktop only)
    const handleMouseLeave = (e: MouseEvent) => {
      if (hasShown) return
      if (e.clientY <= 0 && window.innerWidth >= 768) {
        // Mouse leaving top of screen on desktop
        setShowPopup(true)
        setHasShown(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearTimeout(delayTimer)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hasShown, pathname])

  const handleClose = () => {
    setShowPopup(false)
    // Store dismissal timestamp
    localStorage.setItem(STORAGE_KEY, Date.now().toString())
  }

  return {
    showPopup,
    handleClose,
  }
}

