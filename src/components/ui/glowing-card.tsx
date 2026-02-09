'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface GlowingCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  intensity?: number
  disabled?: boolean
  onClick?: () => void
}

export function GlowingCard({ 
  children, 
  className,
  glowColor = 'rgba(94,106,210,0.15)',
  intensity = 600,
  disabled = false,
  onClick
}: GlowingCardProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || disabled) return
    
    const rect = divRef.current.getBoundingClientRect()
    setPosition({ 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    })
  }

  const handleMouseEnter = () => {
    if (!disabled) setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn(
        'glass-card relative cursor-pointer group',
        disabled && 'cursor-not-allowed opacity-60',
        onClick && 'cursor-pointer',
        className
      )}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Spotlight Effect */}
      <div
        className="glass-card-spotlight"
        style={{
          opacity,
          background: `radial-gradient(${intensity}px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Optional click indicator */}
      {onClick && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-30 transition-opacity duration-200">
          <div className="w-2 h-2 bg-accent rounded-full" />
        </div>
      )}
    </motion.div>
  )
}