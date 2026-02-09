import type { Metadata } from 'next'
import { ProgressProvider } from '@/components/academy/progress-provider'

export const metadata: Metadata = {
  title: {
    default: 'OSINT Academy - Learn Intelligence Gathering',
    template: '%s | OSINT Academy'
  },
  description: 'Comprehensive OSINT education covering Google dorking, security research, and ethical intelligence gathering techniques.',
  keywords: ['OSINT Education', 'Intelligence Training', 'Security Research', 'Google Dorking Course'],
  openGraph: {
    title: 'OSINT Academy - Professional Intelligence Training',
    description: 'Learn professional OSINT techniques and ethical intelligence gathering',
  },
}

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProgressProvider>
      <div className="min-h-screen">
        <main className="pb-16">
          {children}
        </main>
      </div>
    </ProgressProvider>
  )
}
