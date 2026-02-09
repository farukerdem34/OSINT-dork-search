'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ToggleProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ checked, onCheckedChange, label, description, disabled, size = 'md' }, ref) => {
    const sizeClasses = {
      sm: {
        track: 'h-5 w-9',
        thumb: 'h-3 w-3 data-[state=checked]:translate-x-4'
      },
      md: {
        track: 'h-6 w-11',
        thumb: 'h-4 w-4 data-[state=checked]:translate-x-5'
      },
      lg: {
        track: 'h-7 w-13',
        thumb: 'h-5 w-5 data-[state=checked]:translate-x-6'
      }
    }

    return (
      <div className="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          data-state={checked ? 'checked' : 'unchecked'}
          disabled={disabled}
          onClick={() => onCheckedChange(!checked)}
          className={cn(
            'peer inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
            'disabled:cursor-not-allowed disabled:opacity-50',
            checked ? 'bg-accent' : 'bg-white/20',
            sizeClasses[size].track
          )}
          ref={ref}
        >
          <span
            data-state={checked ? 'checked' : 'unchecked'}
            className={cn(
              'pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform',
              'data-[state=checked]:bg-white data-[state=unchecked]:translate-x-1',
              sizeClasses[size].thumb
            )}
          />
        </button>
        
        {(label || description) && (
          <div className="space-y-1">
            {label && (
              <label className="text-sm font-medium text-text-main cursor-pointer">
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-text-dim">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)
Toggle.displayName = 'Toggle'

export { Toggle }