import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const headingVariants = cva('font-semibold tracking-tight', {
  variants: {
    variant: {
      gradient: 'text-gradient',
      neon: 'text-neon',
      glow: 'text-glow',
      default: 'text-white'
    },
    size: {
      xs: 'text-lg',
      sm: 'text-xl',
      md: 'text-2xl',
      lg: 'text-3xl',
      xl: 'text-4xl',
      '2xl': 'text-5xl',
      '3xl': 'text-6xl',
      '4xl': 'text-7xl'
    }
  },
  defaultVariants: {
    variant: 'gradient',
    size: 'lg'
  }
})

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function Heading({ 
  className, 
  variant, 
  size, 
  as: Component = 'h2',
  ...props 
}: HeadingProps) {
  return (
    <Component
      className={cn(headingVariants({ variant, size }), className)}
      {...props}
    />
  )
}

// Tech Label Component
export interface TechLabelProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export function TechLabel({ children, className, ...props }: TechLabelProps) {
  return (
    <p className={cn('tech-label', className)} {...props}>
      {children}
    </p>
  )
}

// Body Text Component
export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'default' | 'muted' | 'accent'
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
}

const textVariants = cva('', {
  variants: {
    variant: {
      default: 'text-text-main',
      muted: 'text-text-dim',
      accent: 'text-accent'
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm', 
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'base'
  }
})

export function Text({ className, variant, size, ...props }: TextProps) {
  return (
    <p className={cn(textVariants({ variant, size }), className)} {...props} />
  )
}