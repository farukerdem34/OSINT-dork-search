'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Shield, Target, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Heading, TechLabel, Text } from '@/components/ui/typography'
import { GlowingCard } from '@/components/ui/glowing-card'
import Link from 'next/link'

export function AcademyHero() {
  const features = [
    {
      icon: Shield,
      title: 'Ethical Focus',
      description: 'Learn responsible intelligence gathering'
    },
    {
      icon: Target,
      title: 'Practical Skills',
      description: 'Real-world scenarios and techniques'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive',
      description: 'From basics to advanced methodologies'
    }
  ]

  return (
    <div className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-neon-green/5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <GraduationCap className="text-accent" size={24} />
                <TechLabel>OSINT ACADEMY</TechLabel>
              </div>
              
              <Heading size="3xl" className="leading-tight">
                Master the Art of<br />
                <span className="text-neon">Intelligence Gathering</span>
              </Heading>
              
              <Text size="lg" variant="muted" className="max-w-lg">
                From Google dorking fundamentals to advanced OSINT methodologies, 
                learn ethical intelligence gathering techniques used by security 
                professionals worldwide.
              </Text>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/academy/osint-basics">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Learning
                </Button>
              </Link>
              <Link href="/academy/glossary">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Browse Glossary
                </Button>
              </Link>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div>
                <div className="text-2xl font-bold text-accent">4</div>
                <div className="text-sm text-text-dim">Courses</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neon-green">169+</div>
                <div className="text-sm text-text-dim">Dorks Covered</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">∞</div>
                <div className="text-sm text-text-dim">Free Access</div>
              </div>
            </div>
          </motion.div>
          
          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <GlowingCard className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                        <Icon className="text-accent" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                        <Text variant="muted">{feature.description}</Text>
                      </div>
                    </div>
                  </GlowingCard>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
