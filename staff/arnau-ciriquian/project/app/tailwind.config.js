/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {fontFamily: {
      aclonica: ['Aclonica', 'sans-serif'],
    },
    textShadow: {
      orange: '2px 2px 19px 0px #FA5007',
    }},
  },
  plugins: [],
}

