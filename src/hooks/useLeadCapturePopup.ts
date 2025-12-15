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
  const [isFormActive, setIsFormActive] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is interacting with any form
    const checkFormActivity = () => {
      const activeElement = document.activeElement
      const isFormInput = activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.tagName === 'SELECT' ||
        activeElement.closest('form') !== null
      )
      setIsFormActive(!!isFormInput)
    }

    // Check on focus/blur events
    const handleFocus = () => {
      const activeElement = document.activeElement
      if (activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.tagName === 'SELECT'
      )) {
        setIsFormActive(true)
      }
    }

    const handleBlur = () => {
      // Small delay to check if focus moved to another form element
      setTimeout(() => {
        const activeElement = document.activeElement
        if (!activeElement || (
          activeElement.tagName !== 'INPUT' &&
          activeElement.tagName !== 'TEXTAREA' &&
          activeElement.tagName !== 'SELECT'
        )) {
          setIsFormActive(false)
        }
      }, 100)
    }

    // Check on any click (user might be clicking form elements)
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target && (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('form') !== null ||
        target.closest('button[type="submit"]') !== null
      )) {
        setIsFormActive(true)
      }
    }

    document.addEventListener('focusin', handleFocus)
    document.addEventListener('focusout', handleBlur)
    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('focusin', handleFocus)
      document.removeEventListener('focusout', handleBlur)
      document.removeEventListener('click', handleClick, true)
    }
  }, [])

  useEffect(() => {
    // Don't show popup if user is actively filling in a form
    if (isFormActive) {
      return
    }

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
      if (!hasShown && !isFormActive) {
        setShowPopup(true)
        setHasShown(true)
      }
    }, randomDelay)

    // Show on scroll
    const handleScroll = () => {
      if (hasShown || isFormActive) return

      const scrollPercentage =
        (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight

      if (scrollPercentage >= SCROLL_THRESHOLD) {
        setShowPopup(true)
        setHasShown(true)
      }
    }

    // Show on exit intent (desktop only)
    const handleMouseLeave = (e: MouseEvent) => {
      if (hasShown || isFormActive) return
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
  }, [hasShown, pathname, isFormActive])

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

