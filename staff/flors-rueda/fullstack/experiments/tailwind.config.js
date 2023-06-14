/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2rem',
      },
    }
  },
}

