import { cn } from '@/lib/utils'

export interface SectionProps {
  children: React.ReactNode
  className?: string
  withBorder?: boolean
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  id?: string
}

export function Section({ 
  children, 
  className, 
  withBorder = false,
  spacing = 'lg',
  id
}: SectionProps) {
  const spacingClasses = {
    sm: 'py-12',
    md: 'py-16', 
    lg: 'py-24',
    xl: 'py-32'
  }

  return (
    <section 
      id={id}
      className={cn(
        'w-full',
        spacingClasses[spacing],
        withBorder && 'border-t border-white/5',
        className
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        {children}
      </div>
    </section>
  )
}