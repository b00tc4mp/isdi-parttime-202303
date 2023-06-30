/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    fontFamily: {
      'inter': ['Inter']
    },
    extend: {
      animation: {
        slide: 'slide 0.2s linear forwards',
        slideBack: 'slide-back 0.2s linear forwards'
      },
      keyframes: {
        slide: {
          '0%': { left: '-200px' },
          '100%': { left: '0' }
        },
        slideBack: {
          '0%': { left: '0' },
          '100%': { left: '-200px' }
        }
      }
    },
  },
  plugins: [],
}

