/** @type {import('tailwindcss').Config} */
//const plugin = require('tailwindcss/plugin')

export default {
    content: ["./index.html", "./src/**/*.jsx"],
    theme: {
        extend: {
            colors: {
                primary100: 'var(--color-primary-100)',
                primary200: 'var(--color-primary-200)',
                primary300: 'var(--color-primary-300)',
                primary400: 'var(--color-primary-400)',
                primary500: 'var(--color-primary-500)',
                primary600: 'var(--color-primary-600)',
                secondary100: 'var(--color-secondary-100)',
                secondary200: 'var(--color-secondary-200)',
                secondary300: 'var(--color-secondary-300)',
                secondary400: 'var(--color-secondary-400)',
                secondary500: 'var(--color-secondary-500)',
                secondary600: 'var(--color-secondary-600)',
                light100: 'var(--color-light-100)',
                light200: 'var(--color-light-200)',
                light300: 'var(--color-light-300)',
                light400: 'var(--color-light-400)',
                light500: 'var(--color-light-500)',
                dark100: 'var(--color-dark-100)',
                dark200: 'var(--color-dark-200)',
                dark300: 'var(--color-dark-300)',
                dark400: 'var(--color-dark-400)',
                dark500: 'var(--color-dark-500)',
                warning100: 'var(--color-warning-100)',
                warning200: 'var(--color-warning-200)',
                warning300: 'var(--color-warning-300)',
                danger100: 'var(--color-danger-100)',
                danger200: 'var(--color-danger-200)',
                danger300: 'var(--color-danger-300)',
                success100: 'var(--color-success-100)',
                success200: 'var(--color-success-200)',
                success300: 'var(--color-success-300)',
            },
        }
    },
}