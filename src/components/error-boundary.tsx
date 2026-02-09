'use client'

import { Component, ReactNode, ErrorInfo } from 'react'
import { Button } from '@/components/ui/button'
import { GlowingCard } from '@/components/ui/glowing-card'
import { Heading, Text } from '@/components/ui/typography'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo)
    
    // Log to error reporting service in production
    if (process.env.NODE_ENV === 'production') {
      // Analytics or error reporting service
      console.error('Production error:', { error, errorInfo })
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <GlowingCard className="p-8 max-w-md text-center">
            <div className="space-y-6">
              <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle size={32} className="text-red-500" />
              </div>
              
              <div className="space-y-2">
                <Heading size="lg">Something went wrong</Heading>
                <Text variant="muted">
                  An unexpected error occurred. Our team has been notified.
                </Text>
              </div>
              
              {process.env.NODE_ENV === 'development' && (
                <div className="text-left p-3 bg-red-500/10 rounded-lg text-xs font-mono text-red-400">
                  {this.state.error?.message}
                </div>
              )}
              
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => window.history.back()}
                  className="flex-1"
                >
                  Go Back
                </Button>
                <Button
                  variant="primary"
                  onClick={() => window.location.reload()}
                  className="flex-1"
                >
                  Reload Page
                </Button>
              </div>
            </div>
          </GlowingCard>
        </div>
      )
    }

    return this.props.children
  }
}
