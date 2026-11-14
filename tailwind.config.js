/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          cream: '#FFEB97',
          light: '#FFF9E5',
          DEFAULT: '#FFEB97',
          amber: '#E5BF5A',
          muted: '#CCA54A',
        },
        warmbrown: {
          deep: '#583714',
          dark: '#36210A',
          DEFAULT: '#583714',
          mid: '#7B4F1F',
          soft: '#9F6F39',
          subtle: '#C8A67B',
        },
        // Mapped to harmonious warm golden-brown palette for unified readability
        pastel: {
          white: '#FAF7F0',
          ink: '#36210A',       // Deepest dark brown for headings
          'ink-soft': '#583714',  // Primary deep warm brown
          slate: '#7B5631',     // Warm brown slate for body/secondary
          'slate-light': '#A27B52',
          butter: '#FFEB97',
          peach: '#F6E6CE',
          mint: '#ECE6D6',
          blue: '#EFE7D8',
          lavender: '#EFE6D6',
        },
        accent: {
          java: '#583714',
          spring: '#8C6228',
          gold: '#FFEB97',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        'glass-sm': '0 4px 16px -2px rgba(88, 55, 20, 0.06), 0 0 16px rgba(255, 235, 151, 0.14), inset 0 2px 2.5px 0 rgba(255, 255, 255, 1), inset 0 3px 6px -1px rgba(255, 255, 255, 0.45), inset 0 -1.5px 2px 0 rgba(88, 55, 20, 0.04)',
        'glass-md': '0 20px 48px -10px rgba(88, 55, 20, 0.10), 0 4px 12px -2px rgba(88, 55, 20, 0.04), 0 0 28px 2px rgba(255, 235, 151, 0.18), inset 0 2.5px 3px 0 rgba(255, 255, 255, 1), inset 0 6px 14px -2px rgba(255, 255, 255, 0.50), inset 2px 0 3px 0 rgba(255, 255, 255, 0.75), inset -2px 0 3px 0 rgba(255, 255, 255, 0.75), inset 0 -3px 5px 0 rgba(88, 55, 20, 0.05), inset 0 -1px 2px 0 rgba(255, 255, 255, 0.9)',
        'glass-lg': '0 28px 60px -12px rgba(88, 55, 20, 0.13), 0 6px 16px -2px rgba(88, 55, 20, 0.05), 0 0 38px 3px rgba(255, 235, 151, 0.22), inset 0 3px 3.5px 0 rgba(255, 255, 255, 1), inset 0 8px 18px -2px rgba(255, 255, 255, 0.60), inset 2.5px 0 3.5px 0 rgba(255, 255, 255, 0.8), inset -2.5px 0 3.5px 0 rgba(255, 255, 255, 0.8), inset 0 -3.5px 6px 0 rgba(88, 55, 20, 0.06), inset 0 -1px 2px 0 rgba(255, 255, 255, 0.95)',
        'liquid-gold': '0 16px 40px -8px rgba(88, 55, 20, 0.20), 0 0 25px rgba(255, 235, 151, 0.35), inset 0 2px 3px rgba(255, 235, 151, 0.95), inset 0 5px 12px rgba(255, 235, 151, 0.4), inset 0 -2px 3px rgba(88, 55, 20, 0.20)',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '16px',
        'glass-heavy': '24px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 0.95, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.02)' },
        },
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
