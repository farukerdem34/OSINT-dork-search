'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Shield, Image, Lock, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Dork Generator', href: '/', icon: Shield },
  { name: 'EXIF Extractor', href: '/meta-extractor', icon: Image },
  { name: 'Emoji Crypt', href: '/emoji-crypt', icon: Lock },
  { name: 'Academy', href: '/academy', icon: GraduationCap },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  
  return (
    <nav className="sticky top-0 z-50 bg-bg-base/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-neon-green rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Shield size={16} className="text-white" />
            </div>
            <span className="font-mono font-bold text-lg text-white hidden sm:inline-block">
              OSINT Dork Tool
            </span>
            <span className="font-mono font-bold text-lg text-white sm:hidden">
              OSINT
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || 
                              (item.href !== '/' && pathname.startsWith(item.href))
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-accent bg-accent/10 border border-accent/20'
                      : 'text-text-main hover:text-accent hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-bg-base/95 backdrop-blur-lg border-t border-white/5"
          >
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href ||
                                (item.href !== '/' && pathname.startsWith(item.href))
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-accent bg-accent/10 border border-accent/20'
                        : 'text-text-main hover:text-accent hover:bg-white/5'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
