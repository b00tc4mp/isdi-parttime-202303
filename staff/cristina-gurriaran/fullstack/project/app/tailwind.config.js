/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        'indigo-dark': '#4f46e5',
        'indigo-mid': '#6366f1',
        'indigo-light': '#a5b4fc',
        'gray-light': '#e5e7eb',
        'gray': '#6b7280',
        'gray-dark':'#1f2937'
      },
    },
  },
  plugins: [],
}

