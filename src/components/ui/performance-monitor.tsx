'use client'

import { usePerformanceMonitoring } from '@/hooks/use-performance'

// Performance monitoring component for development
export function PerformanceMonitor() {
  const metrics = usePerformanceMonitoring()
  
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white text-xs p-3 rounded-lg font-mono z-50 shadow-xl border border-white/10">
      <div className="font-bold text-accent mb-1">Performance</div>
      <div>Load: {metrics.loadTime.toFixed(2)}ms</div>
      <div>Render: {metrics.renderTime.toFixed(2)}ms</div>
      <div className={metrics.fps >= 55 ? 'text-neon-green' : 'text-yellow-500'}>
        FPS: {metrics.fps}
      </div>
      {metrics.memoryUsage && (
        <div>Memory: {metrics.memoryUsage.toFixed(2)}MB</div>
      )}
    </div>
  )
}
