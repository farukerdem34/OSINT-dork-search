'use client'

import { createContext, useContext, useCallback, ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'

interface ProgressState {
  [courseId: string]: {
    completed: boolean
    progress: number
    lastAccessed: number
    lessonsCompleted: string[]
  }
}

interface ProgressContextType {
  getProgress: (courseId: string) => number
  isCompleted: (courseId: string) => boolean  
  markAsCompleted: (courseId: string) => void
  updateProgress: (courseId: string, progress: number) => void
  completeLesson: (courseId: string, lessonId: string) => void
  getTotalProgress: () => number
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progressState, setProgressState] = useLocalStorage<ProgressState>('osint-academy-progress', {})
  
  const getProgress = useCallback((courseId: string): number => {
    return progressState[courseId]?.progress || 0
  }, [progressState])
  
  const isCompleted = useCallback((courseId: string): boolean => {
    return progressState[courseId]?.completed || false
  }, [progressState])
  
  const markAsCompleted = useCallback((courseId: string) => {
    setProgressState(prev => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        completed: true,
        progress: 100,
        lastAccessed: Date.now(),
        lessonsCompleted: prev[courseId]?.lessonsCompleted || []
      }
    }))
  }, [setProgressState])
  
  const updateProgress = useCallback((courseId: string, progress: number) => {
    setProgressState(prev => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        progress: Math.min(100, Math.max(0, progress)),
        lastAccessed: Date.now(),
        lessonsCompleted: prev[courseId]?.lessonsCompleted || [],
        completed: prev[courseId]?.completed || false
      }
    }))
  }, [setProgressState])
  
  const completeLesson = useCallback((courseId: string, lessonId: string) => {
    setProgressState(prev => {
      const current = prev[courseId] || { completed: false, progress: 0, lastAccessed: 0, lessonsCompleted: [] }
      const lessonsCompleted = [...current.lessonsCompleted]
      
      if (!lessonsCompleted.includes(lessonId)) {
        lessonsCompleted.push(lessonId)
      }
      
      return {
        ...prev,
        [courseId]: {
          ...current,
          lessonsCompleted,
          lastAccessed: Date.now()
        }
      }
    })
  }, [setProgressState])
  
  const getTotalProgress = useCallback((): number => {
    const courses = Object.values(progressState)
    if (courses.length === 0) return 0
    
    const totalProgress = courses.reduce((sum, course) => sum + course.progress, 0)
    return Math.round(totalProgress / courses.length)
  }, [progressState])
  
  const value = {
    getProgress,
    isCompleted,
    markAsCompleted,
    updateProgress,
    completeLesson,
    getTotalProgress
  }
  
  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}
