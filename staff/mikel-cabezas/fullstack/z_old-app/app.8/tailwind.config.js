
/** @type {import('tailwindcss').Config} */
import tailwindBaseStylesPlugin from './tailwind.baseStyles.plugin'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-background': 'var(--main-background)',
        'container-bg': 'var(--container-bg)',
        'main-button': 'var(--main-button)',
        'main-headings': 'var(--main-headings)',
        'main-text': 'var(--main-text)',
        'main-link': 'var(--main-link)',
        'overlay-black': 'var(--overlay-black)',
        'overlay-black-plus': 'var(--overlay-black-plus)',
        'overlay-black-less': 'var(--overlay-black-less)',
        'overlay-black-solid': 'var(--overlay-black-solid)',
        'light': 'var(--light)',
        'dark': 'var(--dark)',
        'red': 'var(--red)',
      },
    },
  },
  plugins: [tailwindBaseStylesPlugin],
}

