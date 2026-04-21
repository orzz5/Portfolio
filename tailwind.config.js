/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-dark': '#1a0b2e',
        'purple-medium': '#2d1b69',
        'purple-light': '#6b46c1',
        'purple-accent': '#a855f7',
        'purple-glow': '#c084fc',
        'dark-bg': '#0f0a1f',
        'dark-card': '#1a0b2e',
        'dark-text': '#e9d5ff',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.4)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1a0b2e 0%, #0f0a1f 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(26, 11, 46, 0.8) 0%, rgba(15, 10, 31, 0.8) 100%)',
      },
      boxShadow: {
        'purple-glow': '0 0 20px rgba(168, 85, 247, 0.3)',
        'purple-glow-hover': '0 0 30px rgba(168, 85, 247, 0.6)',
      },
    },
  },
  plugins: [],
}
