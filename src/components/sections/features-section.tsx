'use client'

import { motion } from 'framer-motion'
import { Shield, Zap, Lock, Globe, Eye, FileSearch, Hash, Smartphone } from 'lucide-react'
import { GlowingCard } from '@/components/ui/glowing-card'
import { Heading, TechLabel, Text } from '@/components/ui/typography'
import { BentoGrid } from '@/components/ui/bento-grid'

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: 'Dual-Mode Operation',
      description: 'Switch between Security mode for targeted reconnaissance and Media mode for content discovery.',
      color: 'from-accent/20 to-accent/5'
    },
    {
      icon: FileSearch,
      title: '169+ Pre-Built Dorks',
      description: 'Comprehensive collection of Google dorks across 21 categories for security research and OSINT.',
      color: 'from-neon-green/20 to-neon-green/5'
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'All processing happens client-side. No data collection, no tracking, no backend servers.',
      color: 'from-purple-500/20 to-purple-500/5'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Lightning-fast query generation with real-time preview and one-click Google search.',
      color: 'from-blue-500/20 to-blue-500/5'
    },
    {
      icon: Eye,
      title: 'EXIF Extractor',
      description: 'Extract metadata from images including GPS coordinates, camera info, and timestamps.',
      color: 'from-orange-500/20 to-orange-500/5'
    },
    {
      icon: Hash,
      title: 'Emoji Steganography',
      description: 'Hide and reveal secret messages using Zero Width Characters in emoji sequences.',
      color: 'from-pink-500/20 to-pink-500/5'
    },
    {
      icon: Globe,
      title: 'Domain Targeting',
      description: 'Focus your security research on specific domains with intelligent query construction.',
      color: 'from-green-500/20 to-green-500/5'
    },
    {
      icon: Smartphone,
      title: 'Fully Responsive',
      description: 'Works flawlessly on desktop, tablet, and mobile devices with optimized UX.',
      color: 'from-cyan-500/20 to-cyan-500/5'
    }
  ]

  return (
    <div className="py-24 bg-gradient-to-b from-transparent via-white/5 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <TechLabel>FEATURES</TechLabel>
          <Heading size="2xl" className="max-w-3xl mx-auto">
            Professional OSINT Toolkit
          </Heading>
          <Text variant="muted" size="lg" className="max-w-2xl mx-auto">
            Everything you need for advanced intelligence gathering and security research
          </Text>
        </motion.div>

        {/* Features Grid */}
        <BentoGrid>
          {features.map((feature, index) => {
            const Icon = feature.icon
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlowingCard className="p-6 h-full group hover:scale-105 transition-transform duration-300">
                  <div className="space-y-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">
                        {feature.title}
                      </h3>
                      <Text variant="muted" size="sm">
                        {feature.description}
                      </Text>
                    </div>
                  </div>
                </GlowingCard>
              </motion.div>
            )
          })}
        </BentoGrid>
      </div>
    </div>
  )
}
