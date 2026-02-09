'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import { SearchInput } from '@/components/ui/search-input'
import { GlowingCard } from '@/components/ui/glowing-card'
import { Heading, TechLabel, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { GLOSSARY_TERMS } from '@/data/glossary'

type Category = 'all' | 'tools' | 'techniques' | 'legal' | 'technical' | 'acronyms'

export function InteractiveGlossary() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  
  const categories = [
    { id: 'all' as const, label: 'All Terms', count: GLOSSARY_TERMS.length },
    { id: 'tools' as const, label: 'Tools', count: GLOSSARY_TERMS.filter(t => t.category === 'tools').length },
    { id: 'techniques' as const, label: 'Techniques', count: GLOSSARY_TERMS.filter(t => t.category === 'techniques').length },
    { id: 'legal' as const, label: 'Legal', count: GLOSSARY_TERMS.filter(t => t.category === 'legal').length },
    { id: 'technical' as const, label: 'Technical', count: GLOSSARY_TERMS.filter(t => t.category === 'technical').length },
    { id: 'acronyms' as const, label: 'Acronyms', count: GLOSSARY_TERMS.filter(t => t.category === 'acronyms').length },
  ]
  
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  
  const filteredTerms = useMemo(() => {
    let terms = GLOSSARY_TERMS
    
    // Filter by category
    if (selectedCategory !== 'all') {
      terms = terms.filter(term => term.category === selectedCategory)
    }
    
    // Filter by search term
    if (searchTerm) {
      terms = terms.filter(term => 
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }
    
    // Filter by selected letter
    if (selectedLetter) {
      terms = terms.filter(term => 
        term.term.toUpperCase().startsWith(selectedLetter)
      )
    }
    
    return terms.sort((a, b) => a.term.localeCompare(b.term))
  }, [selectedCategory, searchTerm, selectedLetter])
  
  return (
    <div className="min-h-screen py-16">
      <Section>
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <div className="flex items-center justify-center gap-3">
            <BookOpen className="text-accent" size={24} />
            <TechLabel>OSINT GLOSSARY</TechLabel>
          </div>
          <Heading size="2xl" className="max-w-4xl mx-auto">
            Technical Terms & Definitions
          </Heading>
          <Text variant="muted" className="max-w-2xl mx-auto text-lg">
            Comprehensive reference of OSINT terminology, tools, and methodologies 
            used by intelligence professionals worldwide.
          </Text>
        </div>
        
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Search & Filters */}
          <GlowingCard className="p-6">
            <div className="space-y-6">
              {/* Search */}
              <div className="max-w-md mx-auto">
                <SearchInput
                  placeholder="Search terms and definitions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClear={() => setSearchTerm('')}
                />
              </div>
              
              {/* Categories */}
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="text-xs"
                  >
                    {category.label}
                    <span className="ml-2 opacity-60">({category.count})</span>
                  </Button>
                ))}
              </div>
              
              {/* Alphabet Filter */}
              <div className="flex flex-wrap justify-center gap-1">
                <Button
                  variant={selectedLetter === null ? 'neon' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedLetter(null)}
                  className="w-8 h-8 p-0 text-xs"
                >
                  All
                </Button>
                {alphabet.map((letter) => (
                  <Button
                    key={letter}
                    variant={selectedLetter === letter ? 'neon' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedLetter(letter)}
                    className="w-8 h-8 p-0 text-xs"
                  >
                    {letter}
                  </Button>
                ))}
              </div>
            </div>
          </GlowingCard>
          
          {/* Results */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Text variant="muted">
                {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''} found
              </Text>
              {(searchTerm || selectedCategory !== 'all' || selectedLetter) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                    setSelectedLetter(null)
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${searchTerm}-${selectedLetter}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid gap-4"
              >
                {filteredTerms.map((term, index) => (
                  <motion.div
                    key={term.term}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <GlowingCard className="p-6">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {term.term}
                            </h3>
                          </div>
                          <div className="px-2 py-1 bg-accent/20 rounded text-xs text-accent uppercase">
                            {term.category}
                          </div>
                        </div>
                        
                        <Text variant="muted">
                          {term.definition}
                        </Text>
                        
                        {term.examples && term.examples.length > 0 && (
                          <div className="p-3 bg-white/5 rounded-lg space-y-2">
                            <Text size="sm" className="font-semibold">Examples:</Text>
                            {term.examples.map((example, i) => (
                              <Text key={i} size="sm" variant="muted" className="font-mono">
                                {example}
                              </Text>
                            ))}
                          </div>
                        )}
                        
                        {term.tags && term.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {term.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-white/10 rounded text-xs text-text-dim"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {term.relatedTerms && term.relatedTerms.length > 0 && (
                          <div className="pt-3 border-t border-white/5">
                            <Text size="sm" variant="muted">
                              <strong>Related:</strong> {term.relatedTerms.join(', ')}
                            </Text>
                          </div>
                        )}
                      </div>
                    </GlowingCard>
                  </motion.div>
                ))}
                
                {filteredTerms.length === 0 && (
                  <div className="text-center py-12">
                    <Text variant="muted">
                      No terms found matching your criteria. Try adjusting your filters.
                    </Text>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Section>
    </div>
  )
}
