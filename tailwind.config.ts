import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // PRD Design System Colors
        'bg-deep': '#020203',
        'bg-base': '#050506',
        'bg-surface': 'rgba(255,255,255,0.05)',
        'accent': '#5E6AD2',
        'accent-glow': 'rgba(94,106,210,0.3)',
        
        // Preserve Cyberpunk Colors from Current System
        'neon-green': '#00ff41',
        'panel-bg': '#0a0a0a',
        'border-color': '#333333',
        'text-main': '#e0e0e0',
        'text-dim': '#888888',
      },
      fontFamily: {
        sans: ['Inter', 'Geist Sans', 'system-ui', 'sans-serif'],
        mono: ['Share Tech Mono', 'Monaco', 'Consolas', 'monospace'],
        tech: ['Share Tech Mono', 'monospace'],
      },
      fontSize: {
        'xs': '0.75rem',      // 12px
        'sm': '0.875rem',     // 14px  
        'base': '1rem',       // 16px
        'lg': '1.125rem',     // 18px
        'xl': '1.25rem',      // 20px
        '2xl': '1.5rem',      // 24px
        '3xl': '1.875rem',    // 30px
        '4xl': '2.25rem',     // 36px
        '5xl': '3rem',        // 48px
        '6xl': '3.75rem',     // 60px
      },
      boxShadow: {
        // Multi-layer shadow system from design
        'glass': '0 0 0 1px rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.3)',
        'glow': '0 0 20px rgba(94,106,210,0.3)',
        'neon': '0 0 20px #00ff41, 0 0 40px #00ff41, 0 0 80px #00ff41',
        'multi-layer': `
          0 1px 2px rgba(0,0,0,0.4),
          0 2px 4px rgba(0,0,0,0.3),
          0 4px 8px rgba(0,0,0,0.2),
          0 8px 16px rgba(0,0,0,0.1)
        `,
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      animation: {
        'blob-float': 'blob-float 20s infinite ease-in-out',
        'pulse-glow': 'pulse-glow 2s infinite ease-in-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'grid-fade': 'grid-fade 0.5s ease-out',
      },
      keyframes: {
        'blob-float': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -30px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'grid-fade': {
          '0%': { opacity: '0' },
          '100%': { opacity: '0.1' },
        },
      },
      spacing: {
        '18': '4.5rem',   // 72px
        '72': '18rem',    // 288px
        '80': '20rem',    // 320px  
        '96': '24rem',    // 384px
      },
    },
  },
  plugins: [],
}

export default config