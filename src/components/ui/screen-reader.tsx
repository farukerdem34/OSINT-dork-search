'use client'

import { useEffect, useState } from 'react'

// Screen reader only text
export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return (
    <span className="sr-only">
      {children}
    </span>
  )
}

// Live region for dynamic content announcements
export function LiveRegion({ 
  children, 
  priority = 'polite' 
}: { 
  children: React.ReactNode
  priority?: 'polite' | 'assertive' | 'off'
}) {
  return (
    <div 
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {children}
    </div>
  )
}

// Progress announcer
export function ProgressAnnouncer({ 
  value, 
  max = 100,
  label 
}: { 
  value: number
  max?: number
  label: string
}) {
  const percentage = Math.round((value / max) * 100)
  
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={`${percentage}% ${label}`}
      aria-label={label}
      className="sr-only"
    >
      {percentage}% complete
    </div>
  )
}

// Status announcer for operations
export function StatusAnnouncer({ 
  message, 
  type = 'status' 
}: { 
  message: string
  type?: 'status' | 'alert' | 'log'
}) {
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    // Slight delay to ensure screen readers catch the change
    const timer = setTimeout(() => {
      setAnnouncement(message)
    }, 100)

    return () => clearTimeout(timer)
  }, [message])

  return (
    <div
      role={type}
      aria-live={type === 'alert' ? 'assertive' : 'polite'}
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  )
}
