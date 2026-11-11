/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          lavender: '#DCD5F5',
          'lavender-light': '#ECE8FB',
          blue: '#D5E8F5',
          'blue-light': '#E9F3FA',
          mint: '#D7EBDD',
          'mint-light': '#EBF5EE',
          peach: '#F6DFD2',
          'peach-light': '#FCF1EB',
          butter: '#F5EDCE',
          'butter-light': '#FAF6E6',
          pink: '#F1DCE5',
          'pink-light': '#F8EDF2',
          white: '#FAF9F6',
          ink: '#252831',
          'ink-soft': '#383E4B',
          slate: '#777C87',
          'slate-light': '#A0A6B2',
        },
        accent: {
          java: '#F89820',
          spring: '#6DB33F',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        'glass-sm': '0 4px 16px 0 rgba(37, 40, 49, 0.04), inset 0 1px 1px 0 rgba(255, 255, 255, 0.8)',
        'glass-md': '0 8px 32px 0 rgba(37, 40, 49, 0.06), inset 0 1px 2px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 1px 0 rgba(37, 40, 49, 0.03)',
        'glass-lg': '0 16px 48px -8px rgba(37, 40, 49, 0.08), inset 0 1.5px 3px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 2px 0 rgba(37, 40, 49, 0.04)',
        'liquid-glow': '0 20px 60px -15px rgba(220, 213, 245, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '16px',
        'glass-heavy': '24px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 0.9, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.02)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 5s ease-in-out infinite',
        'shimmer': 'shimmer 8s linear infinite',
      }
    },
  },
  plugins: [],
}
