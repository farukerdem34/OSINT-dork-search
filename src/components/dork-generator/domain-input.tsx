'use client'

import { useState } from 'react'
import { Globe } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { TechLabel } from '@/components/ui/typography'
import { cleanDomain } from '@/lib/utils'
import { GlowingCard } from '@/components/ui/glowing-card'

interface DomainInputProps {
  value: string
  onChange: (value: string) => void
}

export function DomainInput({ value, onChange }: DomainInputProps) {
  const [error, setError] = useState('')
  
  const handleDomainChange = (newValue: string) => {
    setError('')
    onChange(newValue)
  }
  
  const handleBlur = () => {
    if (value.trim()) {
      try {
        const cleaned = cleanDomain(value)
        onChange(cleaned)
      } catch (err) {
        setError('Please enter a valid domain')
      }
    }
  }
  
  return (
    <GlowingCard className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Globe size={20} className="text-accent" />
          <TechLabel>TARGET DOMAIN</TechLabel>
        </div>
        
        <Input
          placeholder="example.com"
          value={value}
          onChange={(e) => handleDomainChange(e.target.value)}
          onBlur={handleBlur}
          error={error}
          hint="Domain to restrict your security research to"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleBlur()
            }
          }}
        />
        
        {value && !error && (
          <div className="text-xs text-neon-green flex items-center gap-2">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
            Targeting: <code className="bg-white/10 px-2 py-1 rounded font-mono">{value}</code>
          </div>
        )}
      </div>
    </GlowingCard>
  )
}
