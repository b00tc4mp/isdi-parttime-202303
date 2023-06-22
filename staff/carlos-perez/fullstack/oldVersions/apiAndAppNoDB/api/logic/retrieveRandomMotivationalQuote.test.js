const retrieveRandomMotivantionalQuote = require('./retrieveRandomMotivationalQuote')

retrieveRandomMotivantionalQuote(error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('Quote añadida')})