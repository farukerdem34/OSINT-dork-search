'use client'

import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: [
          'bg-accent text-white shadow-lg',
          'hover:bg-accent/90 hover:scale-[1.02] hover:shadow-glow',
          'active:scale-[0.98]'
        ],
        secondary: [
          'bg-white/5 text-text-main border border-white/10',
          'hover:bg-white/10 hover:border-white/20',
          'hover:scale-[1.02]'
        ],
        neon: [
          'bg-transparent text-neon-green border border-neon-green/30',
          'hover:bg-neon-green/5 hover:border-neon-green/60',
          'hover:shadow-neon hover:scale-[1.02]'
        ],
        ghost: [
          'text-text-main hover:bg-white/5',
          'hover:scale-[1.02]'
        ],
        destructive: [
          'bg-red-600 text-white',
          'hover:bg-red-700 hover:scale-[1.02]',
          'active:scale-[0.98]'
        ]
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-6 py-3 text-base',
        xl: 'h-14 px-8 py-4 text-lg',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
            Loading...
          </div>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }