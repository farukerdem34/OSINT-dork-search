'use client'

import { forwardRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import { Input, type InputProps } from './input'
import { Button } from './button'

export interface SearchInputProps extends Omit<InputProps, 'type'> {
  onClear?: () => void
  showClearButton?: boolean
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onClear, showClearButton = true, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    
    const hasValue = Boolean(value)

    return (
      <div className="relative">
        <Input
          type="text"
          icon={<Search size={16} />}
          className="pr-10"
          value={value}
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
        
        {showClearButton && hasValue && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={onClear}
            type="button"
          >
            <X size={14} />
          </Button>
        )}
      </div>
    )
  }
)
SearchInput.displayName = 'SearchInput'

export { SearchInput }