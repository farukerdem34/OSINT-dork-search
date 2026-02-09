'use client'

import { useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

export function useParallaxScroll(speed = 0.5) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  
  return { ref, y: smoothY }
}

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.4"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [60, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1])
  
  return { 
    ref, 
    style: { 
      opacity, 
      y: useSpring(y, { stiffness: 200, damping: 30 }),
      scale: useSpring(scale, { stiffness: 200, damping: 30 })
    } 
  }
}

export function useScrollProgress() {
  const { scrollYProgress } = useScroll()
  return {
    scrollYProgress: useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  }
}

// Magnetic effect for interactive elements
export function useMagneticEffect(strength = 0.3) {
  const ref = useRef<HTMLDivElement>(null)
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength
    
    ref.current.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(1.05)`
  }
  
  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate3d(0px, 0px, 0) scale(1)'
  }
  
  return {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave
  }
}
