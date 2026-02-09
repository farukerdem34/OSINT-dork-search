'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DorkMode } from '@/lib/constants'
import { getDorksByMode } from '@/data/dorks'
import { useToast } from '@/components/ui/toast'
import { useLocalStorage } from '@/hooks/use-local-storage'

import { ModeSelector } from './mode-selector'
import { DomainInput } from './domain-input'
import { KeywordSearch } from './keyword-search'
import { CategoryGrid } from './category-grid'
import { QueryPreview } from './query-preview'
import { RecentQueries } from './recent-queries'
import { Section } from '@/components/ui/section'

interface RecentQuery {
  id: string
  query: string
  domain?: string
  mode: DorkMode
  timestamp: number
}

export function DorkGenerator() {
  // State management
  const [currentMode, setCurrentMode] = useState<DorkMode>('security')
  const [targetDomain, setTargetDomain] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentQuery, setCurrentQuery] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  
  // Local storage for recent queries
  const [recentQueries, setRecentQueries] = useLocalStorage<RecentQuery[]>('osint-recent-queries', [])
  
  const { addToast } = useToast()
  
  // Prevent hydration mismatch by only rendering localStorage-dependent content after mount
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Get current categories based on mode
  const categories = getDorksByMode(currentMode)
  
  // Handle mode switching
  const handleModeSwitch = useCallback((newMode: DorkMode) => {
    setCurrentMode(newMode)
    setSelectedCategory(null)
    setCurrentQuery('')
    if (newMode === 'media') {
      setTargetDomain('') // Media mode doesn't use domain restriction
    }
  }, [])
  
  // Handle dork execution
  const handleExecuteDork = useCallback((dorkQuery: string) => {
    const domain = currentMode === 'security' ? targetDomain : undefined
    const keyword = searchKeyword.trim()
    
    // Build final query
    let finalQuery = ''
    
    if (currentMode === 'security') {
      // Security mode: site:domain + dork + keyword
      if (domain) finalQuery += `site:${domain} `
      finalQuery += dorkQuery
      if (keyword) finalQuery += ` intitle:"${keyword}"`
    } else {
      // Media mode: keyword + dork
      if (keyword) finalQuery += `"${keyword}" `
      finalQuery += dorkQuery
    }
    
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(finalQuery)}`
    
    // Add to recent queries
    const newQuery: RecentQuery = {
      id: Date.now().toString(),
      query: finalQuery,
      domain,
      mode: currentMode,
      timestamp: Date.now()
    }
    
    setRecentQueries(prev => [newQuery, ...prev.slice(0, 9)]) // Keep last 10
    setCurrentQuery(finalQuery)
    
    // Open in new tab
    window.open(googleUrl, '_blank', 'noopener,noreferrer')
    
    addToast({
      title: 'Query Executed',
      description: 'Google search opened in new tab',
      type: 'success'
    })
  }, [currentMode, targetDomain, searchKeyword, addToast, setRecentQueries])
  
  return (
    <Section className="py-16 md:py-24" id="dork-generator">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Mode Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ModeSelector
            currentMode={currentMode}
            onModeChange={handleModeSwitch}
          />
        </motion.div>
        
        {/* Input Section */}
        <motion.div
          layout
          className="grid gap-6 md:gap-8 md:grid-cols-2"
        >
          {/* Domain Input (Security Mode Only) */}
          <AnimatePresence mode="wait">
            {currentMode === 'security' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DomainInput
                  value={targetDomain}
                  onChange={setTargetDomain}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Keyword Search */}
          <motion.div
            layout
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className={currentMode === 'security' ? '' : 'md:col-span-2'}
          >
            <KeywordSearch
              value={searchKeyword}
              onChange={setSearchKeyword}
              currentMode={currentMode}
            />
          </motion.div>
        </motion.div>
        
        {/* Category Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CategoryGrid
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            onDorkExecute={handleExecuteDork}
            searchKeyword={searchKeyword}
            currentMode={currentMode}
          />
        </motion.div>
        
        {/* Query Preview */}
        <AnimatePresence>
          {currentQuery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <QueryPreview
                query={currentQuery}
                onClear={() => setCurrentQuery('')}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Recent Queries */}
        {isMounted && recentQueries.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <RecentQueries
              queries={recentQueries}
              onQuerySelect={handleExecuteDork}
              onClear={() => setRecentQueries([])}
            />
          </motion.div>
        )}
      </div>
    </Section>
  )
}
