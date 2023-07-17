/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{html,js,jsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                montserrat: ['montserrat', 'sans-serif']
            }
        },
        colors: {
            'red': 'hsl(340, 100%, 60%)',
            'blue_dark': 'hsl(243, 100%, 22%)',
            'white': 'hsl(45, 6%, 86%)',
            'lime': {
                100: 'hsl(162 100% 45%)',
                200: 'hsl(162 100% 35%)'
            },
            'gray': {
                100: 'hsl(162 10% 70%)',
                200: 'hsl(162 10% 40%)'
            },
            'base': 'hsl(162 5% 20%)',
            'back': {
                100: 'hsl(162 5% 12%) ',
                200: 'hsl(162 5% 6%) ',
            }
        }
    },
    plugins: [],
}