/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: '#050511', // Deep rich space black
        surface: 'rgba(255, 255, 255, 0.03)',
        'surface-hover': 'rgba(255, 255, 255, 0.08)',
        border: 'rgba(255, 255, 255, 0.1)',
        'border-focus': 'rgba(99, 102, 241, 0.5)', // Indigo glow
        'text-primary': '#FFFFFF',
        'text-secondary': '#A3A8B8',
        accent: '#6366F1', // Indigo
        'accent-hover': '#4F46E5',
        success: '#10B981',
        error: '#F43F5E',
        warning: '#F59E0B',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to right bottom, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2), rgba(0, 0, 0, 0))',
        'glow-gradient': 'linear-gradient(to right, #6366F1, #A855F7, #EC4899)',
      },
      boxShadow: {
        'glow': '0 0 20px -5px rgba(99, 102, 241, 0.4)',
        'glow-lg': '0 0 30px -5px rgba(99, 102, 241, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        'glass': '12px',
      },
      animation: {
        'blob': 'blob 7s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
