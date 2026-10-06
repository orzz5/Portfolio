/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ink': '#050505',
        'coal': '#131313',
        'silver': '#a1a1aa',
        'accent': '#fafafa',
        'glow': '#d4d4d4',
        'dark-bg': '#050505',
        'dark-card': '#131313',
        'dark-text': '#e4e4e7',
        'brand': {
          DEFAULT: '#4a9eff',
          dark: '#2b7fe8',
        },
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
          '0%': { boxShadow: '0 0 20px rgba(255, 255, 255, 0.06)' },
          '100%': { boxShadow: '0 0 30px rgba(255, 255, 255, 0.12), 0 0 40px rgba(255, 255, 255, 0.05)' },
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
        'gradient-monochrome': 'linear-gradient(135deg, #fafafa 0%, #a1a1aa 100%)',
        'gradient-dark': 'linear-gradient(135deg, #131313 0%, #050505 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(19, 19, 19, 0.8) 0%, rgba(5, 5, 5, 0.8) 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 255, 255, 0.06)',
        'glow-hover': '0 0 30px rgba(255, 255, 255, 0.12), 0 8px 30px rgba(0, 0, 0, 0.45)',
      },
    },
  },
  plugins: [],
}
