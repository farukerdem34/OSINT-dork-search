import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { BackgroundLayout } from '@/components/layout/background-layout'
import { Navigation } from '@/components/layout/navigation'
import { ToastProvider } from '@/components/ui/toast'
import { Analytics } from '@/components/analytics'
import { ScrollProgressBar } from '@/components/animations/scroll-effects'
import { ErrorBoundary } from '@/components/error-boundary'
import { SkipLink } from '@/components/ui/skip-link'
import { generateWebsiteSchema, generateSoftwareApplicationSchema } from '@/lib/structured-data'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://dorksearch.ofesec.net'),
  title: 'OSINT Dork Tool - Advanced Google Dorking',
  description: 'Professional OSINT toolkit with 169+ Google dorks for security research and OSINT investigations',
  keywords: ['OSINT', 'Google Dorking', 'Security Research', 'Penetration Testing', 'Intelligence Gathering'],
  authors: [{ name: 'OFESEC' }],
  creator: 'OFESEC',
  publisher: 'OFESEC',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dorksearch.ofesec.net',
    title: 'OSINT Dork Tool - Advanced Google Dorking',
    description: 'Professional OSINT toolkit with 169+ Google dorks for security research',
    siteName: 'OSINT Dork Tool',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OSINT Dork Tool - Advanced Google Dorking',
    description: 'Professional OSINT toolkit with 169+ Google dorks for security research',
    creator: '@ofesec',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32', type: 'image/x-icon' },
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/favicon.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebsiteSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSoftwareApplicationSchema()) }}
        />
      </head>
      <body className={inter.className}>
        <SkipLink />
        <ScrollProgressBar />
        <ErrorBoundary>
          <ToastProvider>
            <BackgroundLayout>
              <Navigation />
              <main id="main-content" className="min-h-screen">
                {children}
              </main>
            </BackgroundLayout>
          </ToastProvider>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}
