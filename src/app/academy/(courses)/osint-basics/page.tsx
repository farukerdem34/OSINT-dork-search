import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCourseById } from '@/data/courses'
import { Section } from '@/components/ui/section'
import { Heading, Text, TechLabel } from '@/components/ui/typography'
import { GlowingCard } from '@/components/ui/glowing-card'
import { Button } from '@/components/ui/button'
import { Shield, Clock, BookOpen } from 'lucide-react'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const course = getCourseById('osint-basics')
  
  if (!course) {
    return {
      title: 'Course Not Found',
    }
  }
  
  return {
    title: `${course.title} - OSINT Academy`,
    description: course.description,
  }
}

export default function OSINTBasicsPage() {
  const course = getCourseById('osint-basics')
  
  if (!course) {
    notFound()
  }
  
  const Icon = course.icon
  
  return (
    <div className="min-h-screen py-16">
      <Section>
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Course Header */}
          <div className="space-y-6">
            <Link href="/academy">
              <Button variant="ghost" size="sm">
                ← Back to Academy
              </Button>
            </Link>
            
            <div className="flex items-center gap-3">
              <Icon className="text-accent" size={24} />
              <TechLabel>COURSE</TechLabel>
            </div>
            
            <Heading size="2xl">{course.title}</Heading>
            <Text variant="muted" size="lg">{course.description}</Text>
            
            <div className="flex items-center gap-6 text-sm text-text-dim">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                {course.duration}
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={16} />
                {course.lessons} lessons
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} />
                {course.level}
              </div>
            </div>
          </div>
          
          {/* Course Content */}
          <GlowingCard className="p-8">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-4">What is OSINT?</h2>
              <p className="text-text-dim">
                Open Source Intelligence (OSINT) refers to the collection and analysis of information 
                gathered from public, open sources to produce actionable intelligence. This includes 
                information from the internet, traditional media, academic publications, and other publicly 
                accessible sources.
              </p>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Key Concepts</h3>
              <ul className="space-y-2 text-text-dim">
                <li>OSINT uses only legally accessible public information</li>
                <li>Information must be properly verified and corroborated</li>
                <li>Ethical considerations are paramount in all investigations</li>
                <li>OPSEC (Operational Security) protects both investigator and subjects</li>
              </ul>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Learning Objectives</h3>
              <ul className="space-y-2">
                {course.learningObjectives.map((objective, i) => (
                  <li key={i} className="text-text-dim">{objective}</li>
                ))}
              </ul>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Topics Covered</h3>
              <div className="grid gap-3">
                {course.topics.map((topic, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-lg">
                    <Text>{topic}</Text>
                  </div>
                ))}
              </div>
            </div>
          </GlowingCard>
          
          <div className="text-center">
            <Text variant="muted" size="sm" className="italic">
              Full course content coming soon. In the meantime, try the Dork Generator 
              and explore the Glossary to learn OSINT fundamentals.
            </Text>
          </div>
        </div>
      </Section>
    </div>
  )
}
