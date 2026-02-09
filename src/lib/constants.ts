// Application Constants
export const APP_CONFIG = {
  name: 'OSINT Dork Tool',
  description: 'Advanced Google Dorking toolkit for OSINT research',
  version: '2.0.0',
  domain: 'dorksearch.ofesec.net',
  repository: 'https://github.com/ofesec/osint-dork-tool',
  analytics: {
    googleAnalyticsId: 'G-MHWF85ZZ24'
  }
} as const

// Dork Modes
export type DorkMode = 'security' | 'media'

export const DORK_MODES = {
  security: {
    id: 'security' as const,
    label: 'CYBER_INTEL',
    description: 'Domain-focused security research',
    icon: 'Shield',
    requiresDomain: true
  },
  media: {
    id: 'media' as const,
    label: 'FILE_HUNTER', 
    description: 'Global file and media search',
    icon: 'Search',
    requiresDomain: false
  }
} as const

// Animation Easing
export const ANIMATION_EASING = {
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  bounceOut: [0.68, -0.55, 0.265, 1.55]
} as const

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const