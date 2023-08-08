const plugin = require('tailwindcss/plugin')

export default plugin(({ addBase, addComponents, addUtilities, theme }) => {
    addBase({
        // h1: {
        //     fontSize: theme('fontSize.4xl')
        // }
        'button': {
            height: '32px',
            minWidth: 'max-content',
            padding: '0px 12px',
            letterSpacing: '0.06em',
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '9999px',
            padding: '0 2rem',
            margin: '1rem',
            textTransform: 'uppercase',
            fontSize: '0.75rem',
        },
        'button:hover, a:hover': {
            opacity: '0.75',
        },
        'button:active': {
            opacity: '1',
        },
        'input': {
            width: '100%',
            height: '32px',
            padding: '0px 12px',
            letterSpacing: '0.06em',
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '9999px',
            padding: '0 1rem',
            margin: '1rem 0',
            cursor: 'text',
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