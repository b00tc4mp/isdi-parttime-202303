import { validators } from 'com'

const { validateCallback } = validators

export default function retrieveRandomMotivantionalQuote(callback) {
    validateCallback(callback)

    const xhr = new XMLHttpRequest

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
