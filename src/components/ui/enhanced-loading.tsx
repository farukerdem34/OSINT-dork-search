'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Enhanced skeleton with shimmer effect
export function EnhancedSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('relative overflow-hidden rounded-md bg-white/5', className)}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut',
          repeat: Infinity
        }}
      />
    </div>
  )
}

// Pulse loading indicator
export function PulseLoader({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <div className="flex justify-center items-center">
      <motion.div
        className={cn(
          'rounded-full border-2 border-accent border-r-transparent',
          sizeClasses[size]
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          ease: 'linear',
          repeat: Infinity
        }}
      />
    </div>
  )
}

// Dots loading animation
export function DotsLoader() {
  return (
    <div className="flex space-x-2 justify-center items-center">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-2 h-2 bg-accent rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.2
          }}
        />
      ))}
    </div>
  )
}

// Content loading placeholder
export function ContentLoader({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      <EnhancedSkeleton className="h-6 w-3/4" />
      {Array.from({ length: lines }).map((_, index) => (
        <EnhancedSkeleton 
          key={index}
          className={cn(
            'h-4',
            index === lines - 1 ? 'w-1/2' : 'w-full'
          )}
        />
      ))}
    </div>
  )
}

// Page loading with progress
export function PageLoader({ progress }: { progress?: number }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-base/80 backdrop-blur-sm">
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <PulseLoader size="lg" />
          <div className="space-y-2">
            <p className="text-lg font-medium text-white">Loading...</p>
            {progress !== undefined && (
              <div className="w-64 mx-auto">
                <div className="flex justify-between text-sm text-text-dim mb-1">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <motion.div
                    className="bg-accent rounded-full h-2"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
