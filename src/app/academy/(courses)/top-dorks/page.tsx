import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCourseById } from '@/data/courses'
import { Section } from '@/components/ui/section'
import { Heading, Text, TechLabel } from '@/components/ui/typography'
import { GlowingCard } from '@/components/ui/glowing-card'
import { Button } from '@/components/ui/button'
import { Search, Clock, BookOpen } from 'lucide-react'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const course = getCourseById('top-dorks')
  
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

export default function TopDorksPage() {
  const course = getCourseById('top-dorks')
  
  if (!course) {
    notFound()
  }
  
  const Icon = course.icon
  
  const topDorks = [
    { query: 'site:example.com filetype:pdf', description: 'Find all PDF files on a specific domain' },
    { query: 'intitle:"index of" password', description: 'Discover exposed directories containing password files' },
    { query: 'inurl:admin intitle:login', description: 'Locate admin login pages' },
    { query: 'ext:sql intext:password', description: 'Find SQL files with password references' },
    { query: 'cache:example.com', description: 'View Google\'s cached version of a page' },
  ]
  
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
                <Search size={16} />
                {course.level}
              </div>
            </div>
          </div>
          
          {/* Course Content */}
          <GlowingCard className="p-8">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-4">Master Google Dorking</h2>
              <p className="text-text-dim">
                Google dorking (also known as Google hacking) is a technique that uses advanced search 
                operators to find specific information in Google&apos;s search results. Security professionals 
                use these techniques for reconnaissance and vulnerability assessment.
              </p>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Top Google Dorks</h3>
              <div className="space-y-4">
                {topDorks.map((dork, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-lg space-y-2">
                    <code className="text-neon-green font-mono text-sm">{dork.query}</code>
                    <Text size="sm" variant="muted">{dork.description}</Text>
                  </div>
                ))}
              </div>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Learning Objectives</h3>
              <ul className="space-y-2">
                {course.learningObjectives.map((objective, i) => (
                  <li key={i} className="text-text-dim">{objective}</li>
                ))}
              </ul>
              
              <div className="mt-8 p-6 bg-accent/10 border border-accent/20 rounded-lg">
                <Text className="font-semibold mb-2">Practice with the Dork Generator</Text>
                <Text size="sm" variant="muted" className="mb-4">
                  Apply what you&apos;ve learned using our interactive Dork Generator with 169+ pre-built queries.
                </Text>
                <Link href="/">
                  <Button>Try Dork Generator</Button>
                </Link>
              </div>
            </div>
          </GlowingCard>
        </div>
      </Section>
    </div>
  )
}
