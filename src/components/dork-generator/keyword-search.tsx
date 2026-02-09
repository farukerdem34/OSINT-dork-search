'use client'

import { Search } from 'lucide-react'
import { SearchInput } from '@/components/ui/search-input'
import { TechLabel } from '@/components/ui/typography'
import { GlowingCard } from '@/components/ui/glowing-card'
import { DorkMode } from '@/lib/constants'

interface KeywordSearchProps {
  value: string
  onChange: (value: string) => void
  currentMode: DorkMode
}

export function KeywordSearch({ value, onChange, currentMode }: KeywordSearchProps) {
  const placeholder = currentMode === 'security' 
    ? 'Keyword (e.g., admin, confidential, password)'
    : 'Search term (e.g., course name, movie title, artist)'
  
  return (
    <GlowingCard className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Search size={20} className="text-accent" />
          <TechLabel>KEYWORD FILTER</TechLabel>
        </div>
        
        <SearchInput
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onClear={() => onChange('')}
        />
        
        {value && (
          <div className="text-xs text-text-dim">
            Will be combined with selected dorks
          </div>
        )}
      </div>
    </GlowingCard>
  )
}
