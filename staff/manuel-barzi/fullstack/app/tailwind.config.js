/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {}
  },
  plugins: [
    plugin(function ({ addBase, config }) {
      addBase({
        '.pepito': {
          fontSize: config('theme.fontSize.4xl'),
          backgroundColor: 'red',
          color: 'white',
          padding: '1rem'
        }
      })
    })
  ]
}

