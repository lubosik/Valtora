'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'valtora_popup_dismissed'
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
const DELAY_BEFORE_SHOW = 30000 // 30 seconds
const SCROLL_THRESHOLD = 0.7 // Show after 70% scroll

export function useLeadCapturePopup() {
  const [showPopup, setShowPopup] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
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

    // Show after delay
    const delayTimer = setTimeout(() => {
      if (!hasShown) {
        setShowPopup(true)
        setHasShown(true)
      }
    }, DELAY_BEFORE_SHOW)

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
  }, [hasShown])

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

