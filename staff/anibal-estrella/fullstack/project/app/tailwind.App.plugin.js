const plugin = require('tailwindcss/plugin')

export default plugin(({ addBase, addComponents, addUtilities, theme, config }) => {
    addBase({
        'h1, h2, h3': {
            fontSize: theme('fontSize.3xl'),
            letterSpacing: '-0.025em',
            fontWeight: '600',
            textTransform: 'uppercase',
        },
        'a:focus, input:focus, button:focus': {
            outline: 'none',
            boxShadow: 'none',
            borderWidth: '0',
        },
        'a:focus-visible, input:focus-visible, button:focus-visible': {
            borderColor: config('theme.borderColor.red'),
            borderWidth: config('theme.borderWidth.2'),
            borderRadius: config('theme.borderRadius.full'),
        },
        'strong': {
            fontWeight: '500',
        },
        'p, li, label': {
            fontSize: theme('fontSize.sm'),
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