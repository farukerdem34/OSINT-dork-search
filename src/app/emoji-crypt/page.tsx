'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Lock, Unlock, Eye, EyeOff, Fingerprint, Shield, ArrowLeft, Wrench } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { GlowingCard } from '@/components/ui/glowing-card'
import { Heading, Text, TechLabel } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'

export default function EmojiCryptPage() {
  const plannedFeatures = [
    {
      icon: Lock,
      title: 'Text Encoding',
      description: 'Hide secret messages using zero-width Unicode characters'
    },
    {
      icon: Unlock,
      title: 'Text Decoding',
      description: 'Extract hidden messages from seemingly normal text'
    },
    {
      icon: Eye,
      title: 'ZWC Detection',
      description: 'Detect presence of zero-width characters in text'
    },
    {
      icon: Shield,
      title: 'Secure Sharing',
      description: 'Copy and share encoded messages securely'
    }
  ]

  const useCases = [
    'Digital watermarking of text content',
    'Covert communication channels',
    'Steganographic message hiding',
    'Forensic text analysis',
    'Security research and testing'
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
                  <div className="absolute inset-0 bg-neon-green/20 blur-3xl rounded-full" />
                  <div className="relative p-6 bg-neon-green/10 rounded-2xl border border-neon-green/30">
                    <Wrench size={48} className="text-neon-green" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-3">
                <TechLabel>COMING SOON</TechLabel>
                <Heading size="2xl" className="gradient-text">
                  Emoji Steganography Tool
                </Heading>
                <Text variant="muted" className="text-lg max-w-2xl mx-auto">
                  This feature is currently under development. Hide secret messages in plain sight using zero-width Unicode characters for covert communication.
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
                Here&apos;s what we&apos;re building for the Emoji Steganography Tool
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
                        <div className="p-3 bg-neon-green/10 rounded-lg w-fit">
                          <Icon size={24} className="text-neon-green" />
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

            {/* How It Works */}
            <GlowingCard className="p-8 border-neon-green/20 bg-neon-green/5">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Fingerprint size={20} className="text-neon-green" />
                  <Text className="font-semibold">How It Works</Text>
                </div>
                <Text size="sm" variant="muted">
                  This tool uses zero-width Unicode characters (ZWC) like{' '}
                  <span className="text-neon-green font-mono">U+200B</span> (Zero Width Space),{' '}
                  <span className="text-neon-green font-mono">U+200C</span> (Zero Width Non-Joiner), and{' '}
                  <span className="text-neon-green font-mono">U+200D</span> (Zero Width Joiner) to encode binary data into seemingly normal text. 
                  The hidden message is invisible to the human eye but can be extracted by the decoder.
                </Text>
              </div>
            </GlowingCard>

            {/* Use Cases */}
            <GlowingCard className="p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <EyeOff size={20} className="text-accent" />
                  <Text className="font-semibold">Use Cases</Text>
                </div>
                <ul className="space-y-2">
                  {useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-neon-green mt-1">▸</span>
                      <Text size="sm" variant="muted">{useCase}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            </GlowingCard>

            {/* Warning */}
            <GlowingCard className="p-6 border-yellow-500/20 bg-yellow-500/5">
              <div className="flex gap-4">
                <div className="shrink-0">
                  <Shield size={24} className="text-yellow-400" />
                </div>
                <div className="space-y-2">
                  <Text className="font-semibold text-yellow-400">Ethical Use Only</Text>
                  <Text size="sm" variant="muted">
                    This tool is designed for security research, digital forensics, and educational purposes. 
                    Always ensure you have proper authorization before analyzing or manipulating text data. 
                    Use responsibly and ethically.
                  </Text>
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
