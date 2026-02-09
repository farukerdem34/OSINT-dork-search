import { Shield, Search, BookOpen, LucideIcon } from 'lucide-react'

export interface Course {
  id: string
  title: string
  description: string
  href: string
  icon: LucideIcon
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'
  duration: string
  lessons: number
  featured?: boolean
  topics: string[]
  learningObjectives: string[]
  prerequisites?: string[]
}

export interface Lesson {
  id: string
  title: string
  content: string
  type: 'text' | 'interactive' | 'quiz'
  estimatedTime: number
  objectives: string[]
}

export const COURSES: Course[] = [
  {
    id: 'osint-basics',
    title: 'What is OSINT?',
    description: 'Learn the fundamentals of Open Source Intelligence gathering, ethical guidelines, and core methodologies used by professionals.',
    href: '/academy/osint-basics',
    icon: Shield,
    level: 'Beginner',
    duration: '45 min',
    lessons: 6,
    featured: true,
    topics: [
      'OSINT Definition & Scope',
      'Legal & Ethical Considerations', 
      'Intelligence Cycle',
      'Source Types & Reliability',
      'Documentation & OPSEC',
      'Professional Standards'
    ],
    learningObjectives: [
      'Define OSINT and understand its applications',
      'Recognize ethical boundaries and legal constraints',
      'Apply the intelligence cycle to investigations',
      'Evaluate source credibility and reliability',
      'Implement proper OPSEC practices'
    ]
  },
  {
    id: 'top-dorks',
    title: 'Top 10 Google Dorks',
    description: 'Master the most powerful Google dorks used by security researchers and penetration testers for reconnaissance.',
    href: '/academy/top-dorks',
    icon: Search,
    level: 'Beginner',
    duration: '30 min',
    lessons: 4,
    featured: true,
    topics: [
      'Search Operators Fundamentals',
      'File Type Discovery',
      'Site-Specific Searching',
      'Advanced Combinations',
      'Real-World Examples'
    ],
    learningObjectives: [
      'Master essential Google search operators',
      'Discover exposed files and documents',
      'Perform targeted site reconnaissance',
      'Combine operators for complex queries'
    ]
  },
  {
    id: 'defense',
    title: 'Defensive Dorking',
    description: 'Learn how to protect your organization from information disclosure through Google dorking and implement defensive measures.',
    href: '/academy/defense',
    icon: Shield,
    level: 'Intermediate',
    duration: '60 min',
    lessons: 8,
    topics: [
      'Information Disclosure Risks',
      'Audit Methodologies', 
      'robots.txt Configuration',
      'Server Hardening',
      'Monitoring & Alerting',
      'Response Procedures'
    ],
    learningObjectives: [
      'Identify information disclosure vulnerabilities',
      'Implement proactive security measures',
      'Configure proper access controls',
      'Establish monitoring systems'
    ],
    prerequisites: ['Basic understanding of web technologies']
  },
  {
    id: 'glossary',
    title: 'OSINT Glossary',
    description: 'Comprehensive reference of OSINT terminology, technical definitions, and industry-standard acronyms.',
    href: '/academy/glossary',
    icon: BookOpen,
    level: 'All Levels',
    duration: '∞',
    lessons: 100,
    topics: [
      'Technical Terminology',
      'Industry Acronyms',
      'Tool Definitions',
      'Methodology Terms',
      'Legal Concepts'
    ],
    learningObjectives: [
      'Understand OSINT-specific terminology',
      'Navigate technical documentation',
      'Communicate effectively with peers',
      'Reference standard definitions'
    ]
  }
]

export function getCourseById(id: string): Course | undefined {
  return COURSES.find(course => course.id === id)
}

export function getCourseLessons(): Lesson[] {
  // This would typically fetch from a database or API
  // For now, return mock data structure
  return []
}
