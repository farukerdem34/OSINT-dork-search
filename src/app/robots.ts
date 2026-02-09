import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dorksearch.ofesec.net'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/test-components'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
