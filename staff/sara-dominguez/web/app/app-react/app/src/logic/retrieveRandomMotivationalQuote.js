export default function retrieveRandomMotivationalQuote(callback) {
    var xhr = new XMLHttpRequest

    xhr.onload = (event) => {
        const { content, author } = JSON.parse(xhr.response)

        callback(null, {content, author})
    }

    xhr.onerror = (event) => {
        callback(new Error('connecting error'))
    }

    xhr.open('GET', 'https://api.quotable.io/random')
    xhr.send()
}