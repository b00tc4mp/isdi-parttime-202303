const plugin = require('tailwindcss/plugin')

export default plugin(({ addBase, addComponents, addUtilities, theme, config }) => {
    addBase({
        'h1, h2': {
            fontSize: theme('fontSize.5xl'),
            letterSpacing: '-0.025em',
            fontWeight: '600',
            textTransform: 'uppercase',
            lineHeight: '100%',
            paddingBottom: '0.5rem',
        },
        'h3': {
            fontSize: theme('fontSize.2xl'),
            fontWeight: '600',
            lineHeight: '100%',
            letterSpacing: '-0.025em',
            textTransform: 'uppercase',
            paddingBottom: '0.5rem',
        },
        'a:focus, input:focus, button:focus': {
            outline: 'none',
            boxShadow: 'none',
            borderWidth: '0',
        },

        'a:focus-visible, input:focus-visible, button:focus-visible': {
            borderColor: config('theme.borderColor.lime'),
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
        ".scrollbar-hide": {
            "&::-webkit-scrollbar": {
                display: "none",
            },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
        },
        //     '.hover\:a:hover': {
        //         borderColor: config('theme.borderColor.red'),
        //         borderWidth: config('theme.borderWidth.2'),
        //         borderRadius: config('theme.borderRadius.full')
        //     },
    }, ['responsive', 'hover']);
})