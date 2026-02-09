import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines and merges Tailwind CSS classes
 * @param inputs - Class values to combine
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Formats a Google search query URL
 * @param query - The search query
 * @param domain - Optional domain to restrict search to
 * @returns Formatted Google search URL
 */
export function formatGoogleSearchUrl(query: string, domain?: string): string {
  const baseUrl = 'https://www.google.com/search?q='
  const searchQuery = domain ? `site:${domain} ${query}` : query
  return `${baseUrl}${encodeURIComponent(searchQuery)}`
}

/**
 * Copies text to clipboard with error handling
 * @param text - Text to copy
 * @returns Promise<boolean> - Success status
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
}

/**
 * Cleans and validates domain input
 * @param domain - Raw domain input
 * @returns Cleaned domain string
 */
export function cleanDomain(domain: string): string {
  return domain
    .replace(/https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '')
    .trim()
    .toLowerCase()
}

/**
 * Debounce function for search inputs
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(null, args), wait)
  }
}