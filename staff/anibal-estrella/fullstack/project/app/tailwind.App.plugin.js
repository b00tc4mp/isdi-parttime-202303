const plugin = require('tailwindcss/plugin')

export default plugin(({ addBase, addComponents, addUtilities, theme }) => {
    addBase({
        'h1, h2, h3': {
            fontSize: theme('fontSize.2xl'),
            fontWeight: '600',
            textTransform: 'uppercase',

            // marginTop: '.5rem',
        },
        'strong': {
            fontWeight: '500',
        },
        'p, li': {
            fontSize: theme('fontSize.lg'),
            fontWeight: '300',
            letterSpacing: '0.025em'
        },
        'input': {
            width: '100%',
            height: '3rem',
            padding: '0 1rem',
            fontSize: '1rem',
            letterSpacing: '0.06em',
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '9999px',
            cursor: 'text',
        },
        'p': {

        },
        backgroundImage: {
            'logo-background': "url('./assets/LiveDive-Logo-W.svg')",
        },
    })

    addComponents({
    })

    addUtilities({
        '.content-hidden': {
            contentVisibility: 'hidden'
        },
        '.center-xy': {
            display: 'grid',
            placeItems: 'center',
            height: '100vh',
        },
        '.center-xy-2': {
            display: 'flex',
            justifyItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        },
    })
})