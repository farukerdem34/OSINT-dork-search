'use client'

import { forwardRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  icon?: React.ReactNode
  showPasswordToggle?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type, 
    label, 
    error, 
    hint, 
    icon, 
    showPasswordToggle = false,
    disabled,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    
    const inputType = showPasswordToggle && showPassword ? 'text' : type

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="tech-label block">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim">
              {icon}
            </div>
          )}
          
          <input
            type={inputType}
            className={cn(
              // Base styles
              'flex h-12 w-full rounded-lg border bg-transparent px-3 py-2 text-sm transition-all duration-200',
              'placeholder:text-text-dim focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              
              // Glass morphism effect
              'bg-white/[0.02] backdrop-blur-sm',
              
              // Border states
              'border-white/10',
              isFocused && 'border-accent/50 ring-2 ring-accent/20 ring-offset-2 ring-offset-bg-base',
              error && 'border-red-500/50 ring-2 ring-red-500/20',
              
              // Icon padding
              icon && 'pl-10',
              showPasswordToggle && 'pr-10',
              
              className
            )}
            disabled={disabled}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              props.onBlur?.(e)
            }}
            ref={ref}
            {...props}
          />
          
          {showPasswordToggle && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim hover:text-text-main transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
        
        {error && (
          <p className="text-sm text-red-400 flex items-center gap-1">
            <span className="text-xs">⚠</span>
            {error}
          </p>
        )}
        
        {hint && !error && (
          <p className="text-xs text-text-dim">
            {hint}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }