import { validators } from 'com'

const { validateToken, validateUrl, validateText, validateCallback } = validators

export default function createPost(token, image, text, callback) {
    validateToken(token)
    validateUrl(image, 'image url')
    validateText(text)
    validateCallback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr

        if (status !== 201) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }

        callback(null)
    }

    xhr.onerror = () => {
        callback(new Error('connection error'))
    }

    xhr.open('POST', `${import.meta.env.VITE_API_URL}/posts`)

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.setRequestHeader('Content-Type', 'application/json')

    const user = { image, text }
    const json = JSON.stringify(user)

    xhr.send(json)
}