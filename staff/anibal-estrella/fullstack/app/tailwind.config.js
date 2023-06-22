/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.jsx",
    ],
    theme: {
        extend: {
            fontFamily: {
                montserrat: ['montserrat', 'sans-serif']
            }
        },

    },
    plugins: [],
}