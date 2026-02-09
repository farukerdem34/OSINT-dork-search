'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock, BookOpen, Star, ArrowRight } from 'lucide-react'
import { GlowingCard } from '@/components/ui/glowing-card'
import { Heading, TechLabel, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { BentoGrid } from '@/components/ui/bento-grid'
import { COURSES } from '@/data/courses'
import { useProgress } from './progress-provider'

export function CourseGrid() {
  const { getProgress } = useProgress()
  const [isMounted, setIsMounted] = useState(false)
  
  // Prevent hydration mismatch by only rendering progress after mount
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <TechLabel>CURRICULUM</TechLabel>
        <Heading size="xl">
          Complete OSINT Training Program
        </Heading>
        <Text variant="muted" className="max-w-2xl mx-auto">
          Progressive learning path from fundamentals to advanced techniques
        </Text>
      </div>
      
      <BentoGrid className="max-w-6xl mx-auto">
        {COURSES.map((course, index) => {
          const progress = getProgress(course.id)
          const Icon = course.icon
          
          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={course.featured ? 'md:col-span-2' : ''}
            >
              <GlowingCard 
                className={`p-6 h-full group hover:scale-[1.02] transition-all duration-300 ${
                  course.featured ? 'border-accent/30 bg-accent/5' : ''
                }`}
                glowColor={course.featured ? 'rgba(94,106,210,0.2)' : undefined}
              >
                <div className="space-y-4 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${
                      course.featured ? 'bg-accent/20' : 'bg-white/10'
                    }`}>
                      <Icon size={24} className={
                        course.featured ? 'text-accent' : 'text-text-main'
                      } />
                    </div>
                    
                    {course.featured && (
                      <div className="px-2 py-1 bg-accent/20 rounded text-xs text-accent font-mono">
                        FEATURED
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3 flex-1">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {course.title}
                      </h3>
                      <Text variant="muted" size="sm">
                        {course.description}
                      </Text>
                    </div>
                    
                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-xs text-text-dim">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen size={14} />
                        {course.level}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={14} />
                        {course.lessons} lessons
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    {isMounted && progress > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-text-dim">Progress</span>
                          <span className="text-accent">{progress}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-accent rounded-full h-2 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Footer */}
                  <div className="pt-4 border-t border-white/5">
                    <Link href={course.href}>
                      <Button 
                        variant={course.featured ? "primary" : "secondary"}
                        className="w-full group-hover:scale-105 transition-transform"
                      >
                        {isMounted && progress > 0 ? 'Continue' : 'Start Course'}
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </GlowingCard>
            </motion.div>
          )
        })}
      </BentoGrid>
    </div>
  )
}
