/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'logoSm': "url('/assets/logo-sm.png')",
        'logo': "url('/assets/logo.png')",
      },
      fontFamily: {
        acumin: ["AcuminVariableConcept"],
      },
      colors: {
        mainOrange: '#F18638',
        mainLime: '#B8F138',
        mainYellow: '#F1C838',
        mainGreen: '#8FE949',
        mainGray: '#ECECEC',
        darkGreen: '#20841E',
        mainRed: '#F13838',
        black60: 'rgba(0,0,0,.6)',
        mainGray50: 'rgba(174,174,174,.5)',
      }
    },
  },
  plugins: [],
}

