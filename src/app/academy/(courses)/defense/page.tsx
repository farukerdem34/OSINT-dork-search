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
  const course = getCourseById('defense')
  
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

export default function DefensePage() {
  const course = getCourseById('defense')
  
  if (!course) {
    notFound()
  }
  
  const Icon = course.icon
  
  const defensiveMeasures = [
    { title: 'Audit Your Exposure', description: 'Use dorks against your own domains to find what attackers can discover' },
    { title: 'Configure robots.txt', description: 'Properly configure robots.txt to prevent indexing of sensitive directories' },
    { title: 'Implement Access Controls', description: 'Use authentication and authorization for admin panels and sensitive data' },
    { title: 'Monitor for Leaks', description: 'Set up alerts for your organization\'s information appearing in search results' },
    { title: 'Educate Your Team', description: 'Train employees on the risks of information disclosure' },
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
                <Shield size={16} />
                {course.level}
              </div>
            </div>
          </div>
          
          {/* Course Content */}
          <GlowingCard className="p-8">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-4">Protect Your Organization</h2>
              <p className="text-text-dim">
                Defensive dorking is the practice of using Google dorks to audit your own organization&apos;s 
                information exposure. By understanding what attackers can find, you can take proactive 
                steps to secure sensitive information and reduce your attack surface.
              </p>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Defensive Measures</h3>
              <div className="space-y-4">
                {defensiveMeasures.map((measure, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-lg space-y-2">
                    <Text className="font-semibold">{i + 1}. {measure.title}</Text>
                    <Text size="sm" variant="muted">{measure.description}</Text>
                  </div>
                ))}
              </div>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Learning Objectives</h3>
              <ul className="space-y-2">
                {course.learningObjectives.map((objective, i) => (
                  <li key={i} className="text-text-dim">{objective}</li>
                ))}
              </ul>
              
              {course.prerequisites && (
                <>
                  <h3 className="text-xl font-bold mt-8 mb-4">Prerequisites</h3>
                  <ul className="space-y-2">
                    {course.prerequisites.map((prereq, i) => (
                      <li key={i} className="text-text-dim">{prereq}</li>
                    ))}
                  </ul>
                </>
              )}
              
              <div className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
                <Text className="font-semibold mb-2">⚠️ Important Note</Text>
                <Text size="sm" variant="muted">
                  Always get proper authorization before auditing any organization&apos;s web presence. 
                  Unauthorized testing may violate terms of service or local laws.
                </Text>
              </div>
            </div>
          </GlowingCard>
        </div>
      </Section>
    </div>
  )
}
