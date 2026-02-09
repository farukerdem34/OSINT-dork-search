'use client'

import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  memoryUsage?: number
  fps: number
}

export function usePerformanceMonitoring() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    fps: 0
  })

  useEffect(() => {
    // Measure page load time
    const navigationEntries = performance.getEntriesByType('navigation')
    if (navigationEntries.length > 0) {
      const navigationStart = navigationEntries[0] as PerformanceNavigationTiming
      const loadTime = navigationStart.loadEventEnd - navigationStart.loadEventStart
      
      setMetrics(prev => ({
        ...prev,
        loadTime
      }))
    }

    // Measure render time
    const renderStart = performance.now()
    requestAnimationFrame(() => {
      const renderTime = performance.now() - renderStart
      
      setMetrics(prev => ({
        ...prev,
        renderTime
      }))
    })

    // Measure memory usage (if available)
    if ('memory' in performance) {
      const memory = (performance as any).memory
      setMetrics(prev => ({
        ...prev,
        memoryUsage: memory.usedJSHeapSize / 1048576 // Convert to MB
      }))
    }

    // Measure FPS
    let frames = 0
    let lastTime = performance.now()
    let animationId: number
    
    function measureFPS() {
      frames++
      const currentTime = performance.now()
      
      if (currentTime >= lastTime + 1000) {
        setMetrics(prev => ({
          ...prev,
          fps: Math.round((frames * 1000) / (currentTime - lastTime))
        }))
        
        frames = 0
        lastTime = currentTime
      }
      
      animationId = requestAnimationFrame(measureFPS)
    }
    
    animationId = requestAnimationFrame(measureFPS)
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return metrics
}
