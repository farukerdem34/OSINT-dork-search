'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Image, MapPin, Calendar, Camera, AlertCircle, ArrowLeft, Wrench } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { GlowingCard } from '@/components/ui/glowing-card'
import { Heading, Text, TechLabel } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'

export default function MetaExtractorPage() {
  const plannedFeatures = [
    {
      icon: Image,
      title: 'Image Upload',
      description: 'Drag & drop or select images to analyze metadata'
    },
    {
      icon: MapPin,
      title: 'GPS Location',
      description: 'Extract and display coordinates on an interactive map'
    },
    {
      icon: Camera,
      title: 'Camera Details',
      description: 'View camera make, model, lens, and settings'
    },
    {
      icon: Calendar,
      title: 'Date & Time',
      description: 'Original capture date, modification history'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6"
            >
              {/* Icon */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
                  <div className="relative p-6 bg-accent/10 rounded-2xl border border-accent/30">
                    <Wrench size={48} className="text-accent" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-3">
                <TechLabel>COMING SOON</TechLabel>
                <Heading size="2xl" className="gradient-text">
                  EXIF Metadata Extractor
                </Heading>
                <Text variant="muted" className="text-lg max-w-2xl mx-auto">
                  This feature is currently under development. Extract detailed metadata from images including GPS coordinates, camera settings, and timestamps.
                </Text>
              </div>

              {/* Status Badge */}
              <div className="flex justify-center gap-4 flex-wrap">
                <div className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
                  <Text size="sm" className="text-yellow-400 font-mono">
                    🚧 In Development
                  </Text>
                </div>
                <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
                  <Text size="sm" className="text-blue-400 font-mono">
                    📅 Planned for Phase 7
                  </Text>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Planned Features */}
      <Section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <TechLabel>WHAT&apos;S COMING</TechLabel>
              <Heading size="xl">Planned Features</Heading>
              <Text variant="muted">
                Here&apos;s what we&apos;re building for the EXIF Metadata Extractor
              </Text>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {plannedFeatures.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <GlowingCard className="p-6 h-full">
                      <div className="space-y-4">
                        <div className="p-3 bg-accent/10 rounded-lg w-fit">
                          <Icon size={24} className="text-accent" />
                        </div>
                        <div>
                          <Text className="font-semibold mb-2">{feature.title}</Text>
                          <Text size="sm" variant="muted">
                            {feature.description}
                          </Text>
                        </div>
                      </div>
                    </GlowingCard>
                  </motion.div>
                )
              })}
            </div>

            {/* Technical Stack Preview */}
            <GlowingCard className="p-8 border-accent/20 bg-accent/5">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <AlertCircle size={20} className="text-accent" />
                  <Text className="font-semibold">Technical Implementation</Text>
                </div>
                <Text size="sm" variant="muted">
                  This tool will use <span className="text-accent font-mono">exif-js</span> for metadata extraction, 
                  <span className="text-accent font-mono"> Leaflet</span> for interactive mapping, 
                  and <span className="text-accent font-mono">React</span> for a seamless user experience.
                </Text>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-text-dim font-mono">
                    exif-js
                  </span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-text-dim font-mono">
                    leaflet
                  </span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-text-dim font-mono">
                    react-leaflet
                  </span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-text-dim font-mono">
                    TypeScript
                  </span>
                </div>
              </div>
            </GlowingCard>

            {/* CTA */}
            <div className="text-center space-y-6">
              <div className="space-y-3">
                <Text variant="muted">
                  In the meantime, explore our other powerful OSINT tools
                </Text>
              </div>
              <div className="flex justify-center gap-4 flex-wrap">
                <Link href="/">
                  <Button variant="primary" size="lg">
                    <ArrowLeft size={18} className="mr-2" />
                    Dork Generator
                  </Button>
                </Link>
                <Link href="/academy">
                  <Button variant="secondary" size="lg">
                    OSINT Academy
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
