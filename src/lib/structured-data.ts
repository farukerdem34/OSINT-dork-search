export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'OSINT Dork Tool',
    description: 'Professional OSINT toolkit with 169+ Google dorks for security research and OSINT investigations',
    url: 'https://dorksearch.ofesec.net',
    author: {
      '@type': 'Organization',
      name: 'OFESEC',
    },
    publisher: {
      '@type': 'Organization',
      name: 'OFESEC',
    },
  }
}

export function generateSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'OSINT Dork Tool',
    description: 'Advanced Google dorking tool for OSINT and security research',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
    },
  }
}

export function generateCourseSchema(course: {
  name: string
  description: string
  url: string
  difficulty: string
  duration: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: 'OFESEC',
    },
    url: course.url,
    courseLevel: course.difficulty,
    timeRequired: course.duration,
    inLanguage: 'en',
    isAccessibleForFree: true,
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
