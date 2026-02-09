'use client'

import { motion } from 'framer-motion'
import { Clock, Trash2, ExternalLink } from 'lucide-react'
import { GlowingCard } from '@/components/ui/glowing-card'
import { Button } from '@/components/ui/button'
import { TechLabel, Text } from '@/components/ui/typography'
import { DorkMode } from '@/lib/constants'
import { formatDistanceToNow } from 'date-fns'

interface RecentQuery {
  id: string
  query: string
  domain?: string
  mode: DorkMode
  timestamp: number
}

interface RecentQueriesProps {
  queries: RecentQuery[]
  onQuerySelect: (query: string) => void
  onClear: () => void
}

export function RecentQueries({ queries, onQuerySelect, onClear }: RecentQueriesProps) {
  if (queries.length === 0) return null
  
  return (
    <GlowingCard className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-accent" />
            <TechLabel>RECENT QUERIES</TechLabel>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-text-dim hover:text-white"
          >
            <Trash2 size={14} className="mr-1" />
            Clear
          </Button>
        </div>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {queries.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <button
                onClick={() => onQuerySelect(item.query)}
                className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent/30 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-mono ${
                        item.mode === 'security' 
                          ? 'bg-accent/20 text-accent' 
                          : 'bg-neon-green/20 text-neon-green'
                      }`}>
                        {item.mode}
                      </span>
                      {item.domain && (
                        <span className="text-xs text-text-dim">
                          {item.domain}
                        </span>
                      )}
                    </div>
                    <code className="text-xs text-text-main font-mono block truncate">
                      {item.query}
                    </code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Text variant="muted" size="xs" className="whitespace-nowrap">
                      {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                    </Text>
                    <ExternalLink 
                      size={14} 
                      className="text-text-dim group-hover:text-accent transition-colors"
                    />
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </GlowingCard>
  )
}
