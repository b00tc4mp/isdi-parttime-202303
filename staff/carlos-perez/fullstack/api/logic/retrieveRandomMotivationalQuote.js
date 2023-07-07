const { readFile, writeFile } = require('fs');
var XMLHttpRequest = require('xhr2');

function retrieveQuote(callback) {
    var xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { content } = JSON.parse(xhr.response)

        callback(null, content)
    }

    xhr.onerror = () => {
        callback(new Error('connection error'))
    }

    xhr.open('GET', 'https://api.quotable.io/random')
    xhr.send()
}

module.exports = function retrieveRandomMotivantionalQuote(callback) {

    retrieveQuote((error, quote) => {
        if (error) {
            callback(error);
            return
        }

        const quoteToFile = {
            id: 'quote-' + Date.now(),
            content: quote
        }

        readFile('../data/quotes.json', 'utf8', (error, quotes) => {
            if (error) {
                callback(error)

                return
            }
            const filedQuotes = JSON.parse(quotes);

            filedQuotes.push(quoteToFile);

            json = JSON.stringify(filedQuotes);

            writeFile('../data/quotes.json', json, 'utf8', error => {
                if (error) {
                    callback(error)

                    return
                }

                console.log(quote);

                callback(null)
            })
        })
    })
}