const plugin = require('tailwindcss/plugin')

export default plugin(({ addBase, addComponents, addUtilities, theme }) => {
    addBase({
        'h1, h2, h3': {
            fontSize: theme('fontSize.2xl'),
            fontWeight: '600',
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
        'button': {
            // height: '3em',
            minWidth: 'max-content',
            padding: '0 1rem',
            marginLeft: '1rem',
            letterSpacing: '0.06em',
            color: 'black',
            fontSize: '0.75rem',
            backgroundColor: 'white',
            borderRadius: '9999px',
            textTransform: 'uppercase',
        },
        'button:hover, a:hover': {
            opacity: '0.75',
        },
        'button:active': {
            opacity: '1',
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
            // margin: '1rem 0',
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