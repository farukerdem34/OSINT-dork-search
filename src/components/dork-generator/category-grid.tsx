'use client'

import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Icons from 'lucide-react'
import { DorkCategory } from '@/data/dorks'
import { DorkMode } from '@/lib/constants'
import { GlowingCard } from '@/components/ui/glowing-card'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

interface CategoryGridProps {
  categories: DorkCategory[]
  selectedCategory: string | null
  onCategorySelect: (category: string | null) => void
  onDorkExecute: (dork: string) => void
  searchKeyword: string
  currentMode: DorkMode
}

export function CategoryGrid({
  categories,
  selectedCategory,
  onCategorySelect,
  onDorkExecute,
  searchKeyword,
  currentMode
}: CategoryGridProps) {
  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchKeyword) return categories
    
    return categories.filter(category => 
      category.category.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      category.items.some(item => 
        item.label.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.dork.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    )
  }, [categories, searchKeyword])
  
  // Get icon component
  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName]
    return Icon || Icons.Terminal
  }
  
  return (
    <div className="space-y-6">
      {/* Category Count */}
      <div className="text-center">
        <Text variant="muted">
          {filteredCategories.length} {filteredCategories.length === 1 ? 'category' : 'categories'} available
        </Text>
      </div>
      
      {/* Categories Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentMode}-${searchKeyword}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredCategories.map((category, index) => {
            const Icon = getIcon(category.icon)
            const isSelected = selectedCategory === category.category
            const color = category.color || '#6366F1'
            
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <GlowingCard
                  className={cn(
                    'p-6 h-full transition-all duration-300',
                    isSelected && 'border-accent bg-accent/5'
                  )}
                >
                  {/* Category Header */}
                  <div 
                    className="flex items-center gap-3 mb-4 cursor-pointer group"
                    onClick={() => onCategorySelect(isSelected ? null : category.category)}
                  >
                    <div 
                      className="p-2 rounded-lg transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <Icon size={20} style={{ color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-white group-hover:text-accent transition-colors">
                        {category.category}
                      </h3>
                      <Text variant="muted" size="xs">
                        {category.items.length} dorks
                      </Text>
                    </div>
                  </div>
                  
                  {/* Category Description */}
                  <Text variant="muted" size="sm" className="mb-4">
                    {category.description}
                  </Text>
                  
                  {/* Dork Buttons */}
                  <div className="space-y-2">
                    {category.items.slice(0, isSelected ? category.items.length : 3).map((item) => (
                      <Button
                        key={item.label}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-left hover:bg-white/10 hover:text-accent"
                        onClick={() => onDorkExecute(item.dork)}
                      >
                        <span className="truncate text-xs">{item.label}</span>
                        {item.severity && (
                          <span 
                            className={cn(
                              'ml-auto text-xs px-2 py-0.5 rounded',
                              item.severity === 'critical' && 'bg-red-500/20 text-red-400',
                              item.severity === 'high' && 'bg-orange-500/20 text-orange-400',
                              item.severity === 'medium' && 'bg-yellow-500/20 text-yellow-400',
                              item.severity === 'low' && 'bg-blue-500/20 text-blue-400'
                            )}
                          >
                            {item.severity}
                          </span>
                        )}
                      </Button>
                    ))}
                    
                    {/* Show More Button */}
                    {!isSelected && category.items.length > 3 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-xs text-accent hover:bg-accent/10"
                        onClick={() => onCategorySelect(category.category)}
                      >
                        +{category.items.length - 3} more dorks
                      </Button>
                    )}
                    
                    {/* Collapse Button */}
                    {isSelected && category.items.length > 3 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-xs text-text-dim hover:bg-white/5"
                        onClick={() => onCategorySelect(null)}
                      >
                        Show less
                      </Button>
                    )}
                  </div>
                </GlowingCard>
              </motion.div>
            )
          })}
        </motion.div>
      </AnimatePresence>
      
      {/* No Results */}
      {filteredCategories.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Text variant="muted">
            No categories found matching &quot;{searchKeyword}&quot;
          </Text>
        </motion.div>
      )}
    </div>
  )
}
