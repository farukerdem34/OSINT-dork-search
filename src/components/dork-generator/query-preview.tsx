'use client'

import { motion } from 'framer-motion'
import { Copy, X } from 'lucide-react'
import { GlowingCard } from '@/components/ui/glowing-card'
import { Button } from '@/components/ui/button'
import { TechLabel, Text } from '@/components/ui/typography'
import { useClipboard } from '@/hooks/use-clipboard'
import { useToast } from '@/components/ui/toast'

interface QueryPreviewProps {
  query: string
  onClear: () => void
}

export function QueryPreview({ query, onClear }: QueryPreviewProps) {
  const { copy, copied } = useClipboard()
  const { addToast } = useToast()
  
  const handleCopy = () => {
    copy(query)
    addToast({
      title: 'Copied!',
      description: 'Query copied to clipboard',
      type: 'success'
    })
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <GlowingCard className="p-6 border-accent/30 bg-accent/5">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <TechLabel>GENERATED QUERY</TechLabel>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClear}
              className="text-text-dim hover:text-white"
            >
              <X size={16} />
            </Button>
          </div>
          
          <div className="relative">
            <div className="bg-bg-darker border border-white/10 rounded-lg p-4 pr-24 overflow-x-auto">
              <code className="text-sm text-neon-green font-mono break-all">
                {query}
              </code>
            </div>
            
            <div className="absolute right-2 top-2 flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCopy}
                className="shadow-lg"
              >
                {copied ? (
                  <>
                    <Check size={14} className="mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} className="mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <Text variant="muted" size="xs" className="text-center">
            Query has been executed in Google Search
          </Text>
        </div>
      </GlowingCard>
    </motion.div>
  )
}

// Add Check icon import
import { Check } from 'lucide-react'
