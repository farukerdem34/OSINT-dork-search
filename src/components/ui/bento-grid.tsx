import { cn } from '@/lib/utils'

export interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn(
      'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-auto',
      className
    )}>
      {children}
    </div>
  )
}

export interface BentoCardProps {
  children: React.ReactNode
  className?: string
  span?: 1 | 2 | 3
  tall?: boolean
  onClick?: () => void
}

export function BentoCard({ 
  children, 
  className, 
  span = 1, 
  tall = false,
  onClick 
}: BentoCardProps) {
  return (
    <div
      className={cn(
        'glass-card p-6',
        span === 2 && 'md:col-span-2',
        span === 3 && 'lg:col-span-3',
        tall && 'row-span-2',
        onClick && 'cursor-pointer hover:scale-[1.02] transition-transform duration-200',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}