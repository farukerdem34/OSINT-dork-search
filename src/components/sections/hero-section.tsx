'use client'

import { motion } from 'framer-motion'
import { Shield, Search, Zap, Lock, Globe, Target } from 'lucide-react'
import { Heading, TechLabel, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
  return (
    <div className="relative py-20 lg:py-32 overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-neon-green/5 to-accent/10 animate-pulse" style={{ animationDuration: '8s' }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-12">
          {/* Main Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full">
                <Zap size={16} className="text-accent" />
                <TechLabel className="text-xs">169+ GOOGLE DORKS</TechLabel>
              </div>
            </div>
            
            <div className="space-y-6">
              <Heading size="4xl" className="leading-tight max-w-5xl mx-auto">
                Advanced Google Dorking for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-neon-green">
                  OSINT Research
                </span>
              </Heading>
              
              <Text size="xl" variant="muted" className="max-w-3xl mx-auto leading-relaxed">
                Professional-grade intelligence gathering toolkit. Discover exposed files, 
                security vulnerabilities, and hidden information using advanced Google search operators.
              </Text>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="#dork-generator">
                <Button size="lg" className="min-w-[200px]">
                  <Shield size={18} className="mr-2" />
                  Start Dorking
                </Button>
              </Link>
              <Link href="/academy">
                <Button variant="secondary" size="lg" className="min-w-[200px]">
                  <Search size={18} className="mr-2" />
                  Learn OSINT
                </Button>
              </Link>
            </div>
          </motion.div>
          
          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              { icon: Lock, text: '100% Client-Side' },
              { icon: Globe, text: 'No Registration' },
              { icon: Target, text: 'Security Focused' },
            ].map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.text}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg"
                >
                  <Icon size={14} className="text-neon-green" />
                  <Text size="sm" className="text-text-main">
                    {feature.text}
                  </Text>
                </div>
              )
            })}
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-8 border-t border-white/10"
          >
            {[
              { value: '169+', label: 'Dorks' },
              { value: '21', label: 'Categories' },
              { value: '2', label: 'Modes' },
              { value: '∞', label: 'Free' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2 font-mono">
                  {stat.value}
                </div>
                <Text variant="muted" size="sm">
                  {stat.label}
                </Text>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
