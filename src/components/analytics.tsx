'use client'

import Script from 'next/script'
import { APP_CONFIG } from '@/lib/constants'

export function Analytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${APP_CONFIG.analytics.googleAnalyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${APP_CONFIG.analytics.googleAnalyticsId}');
        `}
      </Script>
    </>
  )
}