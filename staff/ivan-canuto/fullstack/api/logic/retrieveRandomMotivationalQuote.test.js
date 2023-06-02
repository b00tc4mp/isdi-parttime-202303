const retrieveRandomMotivationalQuote = require('./retrieveRandomMotivationalQuote')

retrieveRandomMotivationalQuote((error, quote) => {
  if(error) {
    console.error(error)

    return
  }

  console.log(quote)
})