export function validateTheme() {
  if (typeof window === 'undefined') return
  
  const root = document.documentElement
  const style = getComputedStyle(root)
  
  const requiredVariables = [
    '--bg-deep',
    '--bg-base',
    '--bg-surface',
    '--accent',
    '--accent-glow',
    '--neon-green',
    '--text-main',
    '--text-dim'
  ]
  
  const missing = requiredVariables.filter(varName => {
    const value = style.getPropertyValue(varName)
    return !value || value.trim() === ''
  })
  
  if (missing.length > 0) {
    console.warn('Missing CSS variables:', missing)
  }
  
  return missing.length === 0
}
