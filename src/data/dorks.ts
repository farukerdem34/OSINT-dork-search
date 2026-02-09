export interface DorkItem {
  label: string
  dork: string
  description?: string
  severity?: 'low' | 'medium' | 'high' | 'critical'
  category?: string
}

export interface DorkCategory {
  type: 'security' | 'media'
  category: string
  icon: string
  description: string
  items: DorkItem[]
  color?: string
}

// Security Dorks - Migrated from current script.js
export const SECURITY_DORKS: DorkCategory[] = [
  {
    type: 'security',
    category: 'Files & Documents',
    icon: 'FileText',
    description: 'Find exposed files and documents',
    items: [
      { label: 'Public PDFs', dork: 'filetype:pdf' },
      { label: 'Excel Data', dork: 'filetype:xls OR filetype:xlsx OR filetype:csv' },
      { label: 'Word Docs', dork: 'filetype:doc OR filetype:docx' },
      { label: 'Text / Notes', dork: 'filetype:txt OR filetype:rtf OR filetype:md' },
      { label: 'Presentations', dork: 'filetype:ppt OR filetype:pptx' },
      { label: 'Spreadsheets (ODS)', dork: 'filetype:ods' },
      { label: 'Archives', dork: 'filetype:zip OR filetype:rar OR filetype:tar OR filetype:gz' }
    ]
  },
  {
    type: 'security',
    category: 'Server & Config',
    icon: 'Server',
    description: 'Server configurations and system files',
    items: [
      { label: 'Directory Listing', dork: 'intitle:"index of"' },
      { label: 'Config Files', dork: 'filetype:xml OR filetype:conf OR filetype:cnf OR filetype:ini OR filetype:env' },
      { label: 'Log Files', dork: 'filetype:log OR filetype:err' },
      { label: 'Apache / Nginx Status', dork: 'inurl:server-status OR intitle:"nginx status"' },
      { label: 'PHP Info', dork: 'inurl:phpinfo.php OR intitle:phpinfo' },
      { label: 'Docker Configs', dork: 'filename:docker-compose OR filetype:yml intext:docker' },
      { label: 'Kubernetes Configs', dork: 'filetype:yaml intext:apiVersion' }
    ]
  },
  {
    type: 'security',
    category: 'Bug Bounty & Vulnerabilities',
    icon: 'Bug',
    description: 'Vulnerability research and bug bounty targets',
    items: [
      { label: 'Open Redirect', dork: 'inurl:redir OR inurl:redirect= OR inurl:return= OR inurl:next=' },
      { label: 'XSS Parameters', dork: 'inurl:q= OR inurl:search= OR inurl:s= OR inurl:lang=' },
      { label: 'SQL Injection Params', dork: 'inurl:id= OR inurl:cat= OR inurl:pid= OR inurl:sid=' },
      { label: 'File Upload Forms', dork: 'inurl:upload OR inurl:uploader' },
      { label: 'Admin Panels', dork: 'inurl:admin OR inurl:login OR inurl:dashboard' },
      { label: 'SQL Errors', dork: 'intext:"sql syntax" OR intext:"mysql_fetch" OR intext:"Fatal error"' },
      { label: 'LFI / RFI', dork: 'inurl:file= OR inurl:path= OR inurl:include=' },
      { label: 'XXE Targets', dork: 'filetype:xml intext:DOCTYPE' }
    ]
  },
  {
    type: 'security',
    category: 'Cloud & DevOps',
    icon: 'Cloud',
    description: 'Cloud infrastructure and DevOps tools',
    items: [
      { label: 'AWS S3 Buckets', dork: 'site:s3.amazonaws.com OR site:amazonaws.com inurl:s3' },
      { label: 'Jenkins Dashboard', dork: 'intitle:"Dashboard [Jenkins]"' },
      { label: 'Travis CI', dork: 'site:travis-ci.org' },
      { label: 'CircleCI', dork: 'site:circleci.com' },
      { label: 'GitLab Pages', dork: 'site:gitlab.io' },
      { label: 'Heroku Apps', dork: 'site:herokuapp.com' },
      { label: 'Docker Hub', dork: 'site:hub.docker.com' }
    ]
  },
  {
    type: 'security',
    category: 'Databases & Backups',
    icon: 'Database',
    description: 'Database files and backup systems',
    items: [
      { label: 'SQL Dumps', dork: 'filetype:sql intext:INSERT INTO' },
      { label: 'Database Backups', dork: 'filetype:bak OR filetype:backup OR filetype:old' },
      { label: 'MongoDB Dumps', dork: 'filetype:json intext:ObjectId' },
      { label: 'SQLite Databases', dork: 'filetype:sqlite OR filetype:db' },
      { label: 'CSV Data Exports', dork: 'filetype:csv intext:"password" OR intext:"email"' },
      { label: 'Access Databases', dork: 'filetype:mdb OR filetype:accdb' }
    ]
  },
  {
    type: 'security',
    category: 'Credentials & Secrets',
    icon: 'Key',
    description: 'Exposed credentials and secrets',
    items: [
      { label: 'API Keys', dork: 'intext:"api_key" OR intext:"apikey" OR intext:"secret_key"' },
      { label: 'JWT Tokens', dork: 'intext:"eyJ" filetype:json' },
      { label: 'SSH Keys', dork: 'filetype:pem OR intext:"BEGIN RSA PRIVATE KEY"' },
      { label: 'FTP Credentials', dork: 'inurl:ftp filetype:txt intext:password' },
      { label: 'Database Passwords', dork: 'intext:"password" filetype:sql' },
      { label: 'Email & Passwords', dork: 'filetype:xlsx intext:password' }
    ]
  },
  {
    type: 'security',
    category: 'Source Code & Leaks',
    icon: 'Code',
    description: 'Source code repositories and leaks',
    items: [
      { label: 'GitHub Repos', dork: 'site:github.com intext:password' },
      { label: 'GitLab Leaks', dork: 'site:gitlab.com intext:api' },
      { label: 'Bitbucket Code', dork: 'site:bitbucket.org intext:secret' },
      { label: 'Pastebin Leaks', dork: 'site:pastebin.com intext:password' }
    ]
  },
  {
    type: 'security',
    category: 'Debug & Dev Environments',
    icon: 'Laptop',
    description: 'Development and debug environments',
    items: [
      { label: 'Laravel Debug', dork: 'intitle:"Laravel" intext:"APP_DEBUG"' },
      { label: 'Django Debug', dork: 'intext:"DEBUG = True"' },
      { label: 'Stack Traces', dork: 'intext:"at com.company" OR intext:"Exception"' },
      { label: 'Dev Environments', dork: 'inurl:dev OR inurl:staging OR inurl:test' }
    ]
  },
  {
    type: 'security',
    category: 'Network & Infrastructure',
    icon: 'Network',
    description: 'Network devices and infrastructure',
    items: [
      { label: 'Router Pages', dork: 'intitle:"Router" inurl:192.168' },
      { label: 'Webcam Interfaces', dork: 'inurl:view/view.shtml OR inurl:axis-cgi' },
      { label: 'Printer Interfaces', dork: 'intitle:"HP LaserJet" OR intitle:"Canon"' },
      { label: 'VPN Interfaces', dork: 'intitle:"OpenVPN" OR intitle:"SonicWall"' }
    ]
  },
  {
    type: 'security',
    category: 'People & Identity OSINT',
    icon: 'UserCheck',
    description: 'People and identity research',
    items: [
      { label: 'Email Addresses', dork: 'intext:"@company.com" -site:company.com' },
      { label: 'Phone Numbers', dork: 'intext:"+1" OR intext:"phone:" filetype:pdf' },
      { label: 'Social Profiles', dork: 'site:linkedin.com OR site:twitter.com' },
      { label: 'Resume Files', dork: 'filetype:pdf intext:"curriculum" OR intext:"resume"' }
    ]
  },
  {
    type: 'security',
    category: 'OSINT & Recon',
    icon: 'Eye',
    description: 'Reconnaissance and intelligence gathering',
    items: [
      { label: 'Subdomains', dork: 'site:*.example.com -www' },
      { label: 'Similar Sites', dork: 'related:example.com' },
      { label: 'Cached Pages', dork: 'cache:example.com' },
      { label: 'Recent Changes', dork: 'site:example.com after:2023-01-01' },
      { label: 'Technology Stack', dork: 'site:example.com intext:"powered by" OR intext:"built with"' }
    ]
  },
  {
    type: 'security',
    category: 'Advanced Operators',
    icon: 'SearchPlus',
    description: 'Advanced Google search operators',
    items: [
      { label: 'Exact Match', dork: '"exact phrase search"' },
      { label: 'Exclude Terms', dork: 'search -excluded' },
      { label: 'Wildcard', dork: 'search * term' },
      { label: 'Number Ranges', dork: 'price $100..$500' },
      { label: 'Multiple Sites', dork: 'site:github.com OR site:gitlab.com' }
    ]
  },
  {
    type: 'security',
    category: 'Breach & Incident Intelligence',
    icon: 'AlertTriangle',
    description: 'Data breach and incident research',
    items: [
      { label: 'Data Breach Files', dork: 'filetype:txt intext:"breach" OR intext:"leaked"' },
      { label: 'Incident Reports', dork: 'filetype:pdf intext:"incident report"' },
      { label: 'Security Alerts', dork: 'intext:"security alert" OR intext:"data breach"' }
    ]
  }
]

// Media Dorks - Migrated from current script.js  
export const MEDIA_DORKS: DorkCategory[] = [
  {
    type: 'media',
    category: 'Courses & Education',
    icon: 'GraduationCap',
    description: 'Educational content and online courses',
    items: [
      { label: 'Video Courses', dork: '"video course" filetype:mp4' },
      { label: 'Tutorial PDFs', dork: 'tutorial filetype:pdf' },
      { label: 'Udemy Courses', dork: 'site:udemy.com intext:"free"' },
      { label: 'Coursera Content', dork: 'site:coursera.org' },
      { label: 'Khan Academy', dork: 'site:khanacademy.org' },
      { label: 'Programming Tutorials', dork: 'intitle:"learn programming" filetype:pdf' },
      { label: 'Language Learning', dork: 'intext:"learn english" filetype:mp3' },
      { label: 'Academic Papers', dork: 'filetype:pdf site:edu' }
    ]
  },
  {
    type: 'media',
    category: 'Movies & TV Series',
    icon: 'Film',
    description: 'Movies and television content',
    items: [
      { label: 'HD Movies', dork: 'intitle:"index of" mp4 "1080p"' },
      { label: 'TV Series', dork: 'intitle:"index of" mkv "S01E01"' },
      { label: 'Documentary Films', dork: 'filetype:mp4 "documentary"' },
      { label: 'Classic Movies', dork: 'intitle:"index of" "classic movies"' },
      { label: 'Foreign Films', dork: 'filetype:avi intext:"subtitles"' },
      { label: 'Streaming Links', dork: 'inurl:stream filetype:m3u8' },
      { label: 'Movie Scripts', dork: 'filetype:pdf "screenplay"' },
      { label: 'Behind the Scenes', dork: 'filetype:mp4 "behind the scenes"' }
    ]
  },
  {
    type: 'media',
    category: 'Music & Audio',
    icon: 'Music',
    description: 'Music files and audio content',
    items: [
      { label: 'MP3 Music', dork: 'intitle:"index of" mp3' },
      { label: 'FLAC Audio', dork: 'filetype:flac' },
      { label: 'Podcasts', dork: 'filetype:mp3 "podcast"' },
      { label: 'Audiobooks', dork: 'filetype:mp3 "audiobook"' },
      { label: 'Live Recordings', dork: 'filetype:mp3 "live recording"' },
      { label: 'Instrumentals', dork: 'filetype:wav "instrumental"' },
      { label: 'Sound Effects', dork: 'filetype:wav "sound effect"' },
      { label: 'Music Sheets', dork: 'filetype:pdf "sheet music"' }
    ]
  },
  {
    type: 'media',
    category: 'Books & Papers',
    icon: 'Book',
    description: 'Books, research papers, and publications',
    items: [
      { label: 'Free eBooks', dork: 'filetype:pdf "free ebook"' },
      { label: 'Research Papers', dork: 'filetype:pdf site:arxiv.org' },
      { label: 'Technical Books', dork: 'filetype:pdf "programming book"' },
      { label: 'Scientific Papers', dork: 'filetype:pdf site:pubmed.gov' },
      { label: 'Magazines', dork: 'filetype:pdf "magazine"' },
      { label: 'Academic Thesis', dork: 'filetype:pdf "thesis"' },
      { label: 'Manuals', dork: 'filetype:pdf "manual" OR "handbook"' },
      { label: 'Whitepapers', dork: 'filetype:pdf "whitepaper"' }
    ]
  },
  {
    type: 'media',
    category: 'Software & Games',
    icon: 'Gamepad',
    description: 'Software applications and games',
    items: [
      { label: 'PC Games', dork: 'intitle:"index of" exe "game"' },
      { label: 'Mobile Apps', dork: 'filetype:apk' },
      { label: 'Source Code', dork: 'filetype:zip "source code"' },
      { label: 'Game ROMs', dork: 'filetype:rom OR filetype:iso "game"' },
      { label: 'Software Tools', dork: 'filetype:exe "portable"' },
      { label: 'Plugins', dork: 'filetype:dll "plugin"' },
      { label: 'Drivers', dork: 'filetype:inf "driver"' },
      { label: 'Cracked Software', dork: 'intext:"crack" filetype:exe' }
    ]
  }
]

// Combined export for easy access
export const ALL_DORKS = [...SECURITY_DORKS, ...MEDIA_DORKS]

// Helper functions
export function getDorksByMode(mode: 'security' | 'media'): DorkCategory[] {
  return ALL_DORKS.filter(category => category.type === mode)
}

export function getDorksByCategory(categoryName: string): DorkCategory | undefined {
  return ALL_DORKS.find(category => category.category === categoryName)
}

export function searchDorks(query: string): DorkCategory[] {
  return ALL_DORKS.filter(category => 
    category.category.toLowerCase().includes(query.toLowerCase()) ||
    category.items.some(item => 
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.dork.toLowerCase().includes(query.toLowerCase())
    )
  )
}