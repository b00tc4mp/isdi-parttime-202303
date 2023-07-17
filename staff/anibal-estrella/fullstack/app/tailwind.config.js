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
                200: 'hsl(162 10% 40%)',
                300: 'hsl(162 10% 20%)',
                400: 'hsl(162 10% 10%)',
                500: 'hsl(162 10% 5%) ',
            }
        }
    },
    plugins: [],
}