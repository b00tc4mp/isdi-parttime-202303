import { validators } from 'com'
const { validateId, validateUrl, validateText, validateCallback } = validators

export function createNewPost(userId, image, text, callback) {
    validateId(userId)
    validateUrl(image)
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

    xhr.open('POST', `${import.meta.env.VITE_API_URL}/posts/${userId}`)

    xhr.setRequestHeader('Content-Type', 'application/json')

    const data = { image, text }
    const json = JSON.stringify(data)

    xhr.send(json)
}