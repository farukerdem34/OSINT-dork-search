'use client'

import { motion } from 'framer-motion'
import { Shield, Search } from 'lucide-react'
import { DorkMode, DORK_MODES } from '@/lib/constants'
import { GlowingCard } from '@/components/ui/glowing-card'
import { TechLabel, Heading, Text } from '@/components/ui/typography'

interface ModeSelectorProps {
  currentMode: DorkMode
  onModeChange: (mode: DorkMode) => void
}

export function ModeSelector({ currentMode, onModeChange }: ModeSelectorProps) {
  const modes = Object.values(DORK_MODES)
  
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <TechLabel>SELECT OPERATION MODE</TechLabel>
        <Heading size="2xl" className="max-w-3xl mx-auto">
          Choose Your Intelligence Gathering Approach
        </Heading>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {modes.map((mode) => {
          const Icon = mode.id === 'security' ? Shield : Search
          const isActive = currentMode === mode.id
          
          return (
            <motion.div
              key={mode.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <GlowingCard
                className={`p-8 cursor-pointer transition-all duration-300 ${
                  isActive 
                    ? 'border-accent bg-accent/5 shadow-glow' 
                    : 'hover:border-white/20'
                }`}
                onClick={() => onModeChange(mode.id)}
                glowColor={isActive ? 'rgba(94,106,210,0.25)' : 'rgba(94,106,210,0.1)'}
              >
                <div className="space-y-4 text-center">
                  <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                    isActive ? 'bg-accent text-white scale-110' : 'bg-white/10 text-text-dim'
                  }`}>
                    <Icon size={24} />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className={`text-xl font-bold font-mono ${
                      isActive ? 'text-accent' : 'text-white'
                    }`}>
                      {mode.label}
                    </h3>
                    <Text variant="muted" size="sm">
                      {mode.description}
                    </Text>
                  </div>
                  
                  {mode.requiresDomain && (
                    <div className="inline-flex items-center gap-2 text-xs text-neon-green">
                      <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                      Domain Required
                    </div>
                  )}
                </div>
              </GlowingCard>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
