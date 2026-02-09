'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, ReactNode } from 'react'

// Parallax section
export function ParallaxSection({ 
  children, 
  speed = 0.5,
  className 
}: { 
  children: ReactNode
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -200 * speed])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  
  return (
    <motion.div 
      ref={ref} 
      style={{ y: smoothY }} 
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Fade in on scroll
export function FadeInOnScroll({ 
  children, 
  threshold = 0.1,
  className 
}: { 
  children: ReactNode
  threshold?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${1 - threshold}`, 'start 0.5']
  })
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [50, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1])
  
  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        y: useSpring(y, { stiffness: 200, damping: 30 }),
        scale: useSpring(scale, { stiffness: 200, damping: 30 })
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Scroll progress indicator
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
      style={{ scaleX }}
    />
  )
}

// Sticky scroll section
export function StickyScrollSection({ 
  children 
}: { 
  children: ReactNode 
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  })

  return (
    <div ref={ref} className="relative">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.div
          style={{
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]),
            opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
