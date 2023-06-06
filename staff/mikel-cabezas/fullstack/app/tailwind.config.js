/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-background': '#859895',
        'container-bg': '#e0dcda',
        'main-button': '#705D55',
        'main-headings': '#262c30',
        'main-text': '#262c30',
        'main-link': '#705D55',
        'overlay-black': '#00000021',
        'overlay-black-plus': '#111214',
        'overlay-black-less': '#1f2024',
        'overlay-black-solid': '#18191c',
        'light': '#e0dcda',
        'dark': '#262c30',
        'red': '#c1574c',
      },
    },
  },
  plugins: [],
}

