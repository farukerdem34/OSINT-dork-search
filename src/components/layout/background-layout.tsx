'use client'

interface BackgroundLayoutProps {
  children: React.ReactNode
}

export function BackgroundLayout({ children }: BackgroundLayoutProps) {
  return (
    <div className="bg-system min-h-screen relative">
      {/* Animated Background Blobs */}
      <div className="floating-blob blob-1" />
      <div className="floating-blob blob-2" />
      <div className="floating-blob blob-3" />
      
      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  )
}