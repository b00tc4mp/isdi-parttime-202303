const plugin = require('tailwindcss/plugin')

export default plugin(({ addComponents, theme }) => {
    addComponents({
      '.helloworld': {
        fontSize: theme('fontSize.6xl'),
        backgroundColor: 'yellow',
        color: 'black',
        fontStyle: 'italic',
        padding: '1rem'
      },
      '.helloworld--fluo' :{
        backgroundColor: 'dodgerblue',
        color: 'tomato'
      }
    })
  })