import { Metadata } from 'next'
import { InteractiveGlossary } from '@/components/academy/interactive-glossary'

export const metadata: Metadata = {
  title: 'OSINT Glossary - Technical Terms & Definitions',
  description: 'Comprehensive glossary of OSINT terminology, technical definitions, and industry-standard acronyms.',
  keywords: ['OSINT Glossary', 'Intelligence Terms', 'Technical Definitions', 'Cybersecurity Terms'],
}

export default function GlossaryPage() {
  return <InteractiveGlossary />
}
