import { Metadata } from 'next'
import { HeroSection } from '@/components/sections/hero-section'
import { DorkGenerator } from '@/components/dork-generator/dork-generator'
import { FeaturesSection } from '@/components/sections/features-section'

export const metadata: Metadata = {
  title: 'OSINT Dork Tool - Advanced Google Dorking for Security Research',
  description: 'Professional OSINT toolkit with 169+ Google dorks across 21 categories. Perfect for security research, penetration testing, and intelligence gathering.',
  keywords: ['OSINT', 'Google Dorking', 'Security Research', 'Penetration Testing', 'Intelligence Gathering'],
  openGraph: {
    title: 'OSINT Dork Tool - Advanced Google Dorking',
    description: 'Professional OSINT toolkit with 169+ Google dorks for security research',
    images: ['/og-home.png'],
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DorkGenerator />
      <FeaturesSection />
    </>
  )
}