export interface GlossaryTerm {
  id: string
  term: string
  definition: string
  category: 'tools' | 'techniques' | 'legal' | 'technical' | 'acronyms'
  tags?: string[]
  relatedTerms?: string[]
  examples?: string[]
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // Tools
  {
    id: 'google-dork',
    term: 'Google Dork',
    definition: 'An advanced Google search query that uses special operators to find specific information that is not easily accessible through normal search.',
    category: 'tools',
    tags: ['search', 'reconnaissance', 'dorking'],
    relatedTerms: ['Search Operator', 'Reconnaissance'],
    examples: ['site:example.com filetype:pdf', 'intitle:"index of" password']
  },
  {
    id: 'shodan',
    term: 'Shodan',
    definition: 'A search engine that lets users find specific types of computers (webcams, routers, servers, etc.) connected to the internet using a variety of filters.',
    category: 'tools',
    tags: ['search engine', 'iot', 'reconnaissance'],
    relatedTerms: ['Censys', 'ZoomEye']
  },
  {
    id: 'maltego',
    term: 'Maltego',
    definition: 'An interactive data mining tool that renders directed graphs for link analysis. Used extensively in OSINT investigations.',
    category: 'tools',
    tags: ['data mining', 'visualization', 'link analysis'],
    relatedTerms: ['Link Analysis', 'Graph Database']
  },
  {
    id: 'theHarvester',
    term: 'theHarvester',
    definition: 'An OSINT tool used to gather emails, names, subdomains, IPs, and URLs using multiple public data sources.',
    category: 'tools',
    tags: ['reconnaissance', 'email enumeration', 'subdomain discovery'],
    relatedTerms: ['Reconnaissance', 'Email Harvesting']
  },
  
  // Techniques
  {
    id: 'osint',
    term: 'OSINT',
    definition: 'Open Source Intelligence - Intelligence collected from publicly available sources to be used in an intelligence context.',
    category: 'acronyms',
    tags: ['intelligence', 'methodology', 'fundamental'],
    relatedTerms: ['Intelligence Cycle', 'Reconnaissance']
  },
  {
    id: 'reconnaissance',
    term: 'Reconnaissance',
    definition: 'The act of gathering information about a target system, network, or organization before launching an attack or investigation.',
    category: 'techniques',
    tags: ['information gathering', 'pre-attack', 'enumeration'],
    relatedTerms: ['Enumeration', 'Footprinting']
  },
  {
    id: 'footprinting',
    term: 'Footprinting',
    definition: 'The technique of gathering information about computer systems and the entities they belong to.',
    category: 'techniques',
    tags: ['reconnaissance', 'passive', 'information gathering'],
    relatedTerms: ['Reconnaissance', 'Passive Reconnaissance']
  },
  {
    id: 'social-engineering',
    term: 'Social Engineering',
    definition: 'The psychological manipulation of people into performing actions or divulging confidential information.',
    category: 'techniques',
    tags: ['manipulation', 'human factor', 'phishing'],
    relatedTerms: ['Phishing', 'Pretexting']
  },
  {
    id: 'doxing',
    term: 'Doxing',
    definition: 'The practice of researching and broadcasting private or identifying information about an individual or organization.',
    category: 'techniques',
    tags: ['privacy', 'information disclosure', 'harassment'],
    relatedTerms: ['OSINT', 'Privacy']
  },
  
  // Legal
  {
    id: 'cfaa',
    term: 'CFAA',
    definition: 'Computer Fraud and Abuse Act - A United States cybersecurity bill that was enacted in 1986 as an amendment to existing computer fraud law.',
    category: 'legal',
    tags: ['law', 'united states', 'cybercrime'],
    relatedTerms: ['Legal Framework', 'Unauthorized Access']
  },
  {
    id: 'gdpr',
    term: 'GDPR',
    definition: 'General Data Protection Regulation - A regulation in EU law on data protection and privacy in the European Union and the European Economic Area.',
    category: 'legal',
    tags: ['privacy', 'european union', 'compliance'],
    relatedTerms: ['Data Protection', 'Privacy']
  },
  {
    id: 'tos',
    term: 'Terms of Service',
    definition: 'The legal agreements between a service provider and a person who wants to use that service, outlining rules and restrictions.',
    category: 'legal',
    tags: ['agreement', 'compliance', 'usage policy'],
    relatedTerms: ['EULA', 'Privacy Policy']
  },
  {
    id: 'fair-use',
    term: 'Fair Use',
    definition: 'A legal doctrine that permits limited use of copyrighted material without acquiring permission from the rights holders.',
    category: 'legal',
    tags: ['copyright', 'legal doctrine', 'research'],
    relatedTerms: ['Copyright', 'Legal Framework']
  },
  
  // Technical
  {
    id: 'metadata',
    term: 'Metadata',
    definition: 'Data that provides information about other data. In OSINT, often refers to hidden information in files like EXIF data in images.',
    category: 'technical',
    tags: ['data', 'exif', 'hidden information'],
    relatedTerms: ['EXIF', 'Data Leakage']
  },
  {
    id: 'exif',
    term: 'EXIF',
    definition: 'Exchangeable Image File Format - A standard that specifies formats for images, sound, and tags used by digital cameras and other systems.',
    category: 'technical',
    tags: ['metadata', 'images', 'geolocation'],
    relatedTerms: ['Metadata', 'Geolocation']
  },
  {
    id: 'whois',
    term: 'WHOIS',
    definition: 'A query and response protocol used for querying databases that store registered users or assignees of an Internet resource.',
    category: 'technical',
    tags: ['domain', 'registration', 'lookup'],
    relatedTerms: ['Domain Registration', 'DNS']
  },
  {
    id: 'dns',
    term: 'DNS',
    definition: 'Domain Name System - A hierarchical decentralized naming system for computers, services, or other resources connected to the Internet.',
    category: 'technical',
    tags: ['networking', 'domain', 'infrastructure'],
    relatedTerms: ['WHOIS', 'Subdomain Enumeration']
  },
  {
    id: 'robots-txt',
    term: 'robots.txt',
    definition: 'A text file webmasters create to instruct web robots how to crawl pages on their website. Often reveals hidden directories.',
    category: 'technical',
    tags: ['web', 'crawling', 'seo'],
    relatedTerms: ['Web Crawling', 'Directory Enumeration']
  },
  {
    id: 'wayback-machine',
    term: 'Wayback Machine',
    definition: 'A digital archive of the World Wide Web maintained by the Internet Archive, allowing users to see archived versions of web pages.',
    category: 'tools',
    tags: ['archive', 'historical', 'web'],
    relatedTerms: ['Archive.org', 'Historical Data']
  },
  {
    id: 'api',
    term: 'API',
    definition: 'Application Programming Interface - A set of protocols and tools for building software applications. Often exposes data that can be used in OSINT.',
    category: 'technical',
    tags: ['programming', 'data access', 'integration'],
    relatedTerms: ['REST API', 'Data Source']
  },
  {
    id: 'scraping',
    term: 'Web Scraping',
    definition: 'The process of automatically collecting information from websites using software or scripts.',
    category: 'techniques',
    tags: ['automation', 'data collection', 'extraction'],
    relatedTerms: ['Web Crawling', 'Data Mining']
  },
  
  // Acronyms
  {
    id: 'opsec',
    term: 'OPSEC',
    definition: 'Operations Security - A process that identifies critical information to determine if friendly actions can be observed by enemy intelligence.',
    category: 'acronyms',
    tags: ['security', 'operational', 'privacy'],
    relatedTerms: ['Anonymity', 'Privacy']
  },
  {
    id: 'pii',
    term: 'PII',
    definition: 'Personally Identifiable Information - Information that can be used to identify, contact, or locate a single person.',
    category: 'acronyms',
    tags: ['privacy', 'personal data', 'sensitive'],
    relatedTerms: ['Data Protection', 'Privacy']
  },
  {
    id: 'ioc',
    term: 'IOC',
    definition: 'Indicator of Compromise - Pieces of forensic data that identify potentially malicious activity on a system or network.',
    category: 'acronyms',
    tags: ['security', 'forensics', 'threat intelligence'],
    relatedTerms: ['Threat Intelligence', 'Forensics']
  },
  {
    id: 'cve',
    term: 'CVE',
    definition: 'Common Vulnerabilities and Exposures - A list of publicly disclosed cybersecurity vulnerabilities.',
    category: 'acronyms',
    tags: ['vulnerability', 'security', 'database'],
    relatedTerms: ['Vulnerability', 'Security Research']
  },
  {
    id: 'vpn',
    term: 'VPN',
    definition: 'Virtual Private Network - Extends a private network across a public network, enabling users to send and receive data securely.',
    category: 'acronyms',
    tags: ['privacy', 'security', 'networking'],
    relatedTerms: ['OPSEC', 'Anonymity']
  },
  {
    id: 'tor',
    term: 'Tor',
    definition: 'The Onion Router - Free and open-source software for enabling anonymous communication using onion routing.',
    category: 'tools',
    tags: ['anonymity', 'privacy', 'dark web'],
    relatedTerms: ['Anonymity', 'Dark Web']
  },
  {
    id: 'dark-web',
    term: 'Dark Web',
    definition: 'The part of the World Wide Web that is only accessible through special software, configurations, or authorization.',
    category: 'technical',
    tags: ['anonymity', 'hidden', 'tor'],
    relatedTerms: ['Tor', 'Deep Web']
  },
  {
    id: 'deep-web',
    term: 'Deep Web',
    definition: 'The part of the web not indexed by standard search engines. Includes databases, private networks, and password-protected sites.',
    category: 'technical',
    tags: ['hidden', 'unindexed', 'private'],
    relatedTerms: ['Dark Web', 'Search Engines']
  },
  {
    id: 'geoint',
    term: 'GEOINT',
    definition: 'Geospatial Intelligence - Intelligence about human activity on Earth derived from imagery and geospatial information.',
    category: 'acronyms',
    tags: ['intelligence', 'location', 'imagery'],
    relatedTerms: ['OSINT', 'Geolocation']
  },
  {
    id: 'humint',
    term: 'HUMINT',
    definition: 'Human Intelligence - Intelligence gathered by means of interpersonal contact, as opposed to technical means.',
    category: 'acronyms',
    tags: ['intelligence', 'human sources', 'social'],
    relatedTerms: ['OSINT', 'Social Engineering']
  },
  {
    id: 'sigint',
    term: 'SIGINT',
    definition: 'Signals Intelligence - Intelligence-gathering by interception of signals, whether communications or electronic signals.',
    category: 'acronyms',
    tags: ['intelligence', 'signals', 'interception'],
    relatedTerms: ['OSINT', 'Technical Intelligence']
  }
]

export function getTermsByCategory(category: GlossaryTerm['category']) {
  return GLOSSARY_TERMS.filter(term => term.category === category)
}

export function searchTerms(query: string) {
  const lowerQuery = query.toLowerCase()
  return GLOSSARY_TERMS.filter(term => 
    term.term.toLowerCase().includes(lowerQuery) ||
    term.definition.toLowerCase().includes(lowerQuery) ||
    term.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

export function getTermById(id: string) {
  return GLOSSARY_TERMS.find(term => term.id === id)
}

export function getRelatedTerms(termId: string): GlossaryTerm[] {
  const term = getTermById(termId)
  if (!term || !term.relatedTerms) return []
  
  return term.relatedTerms
    .map(relatedName => GLOSSARY_TERMS.find(t => t.term === relatedName))
    .filter(Boolean) as GlossaryTerm[]
}
