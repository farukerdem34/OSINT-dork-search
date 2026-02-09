import { Metadata } from 'next'
import { AcademyHero } from '@/components/academy/academy-hero'
import { CourseGrid } from '@/components/academy/course-grid'
import { Section } from '@/components/ui/section'

export const metadata: Metadata = {
  title: 'OSINT Academy - Master Intelligence Gathering',
  description: 'Start your journey in Open Source Intelligence. Learn Google dorking, security research, and ethical OSINT techniques.',
}

export default function AcademyPage() {
  return (
    <>
      <AcademyHero />
      <Section>
        <CourseGrid />
      </Section>
    </>
  )
}
