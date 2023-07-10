import { validators } from 'com'

const { validateUserId, validateText } = validators

export function createPost(token, image, title, text, location, callback) {
    validateUserId(token)
    validateText(title)
    validateText(text)

    const xhr = new XMLHttpRequest
    xhr.onload = () => {
        const { status } = xhr

        if (status !== 201) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }
        const { response: json } = xhr
        callback(null)
    }
    xhr.onerror = () => {
        callback(new Error('connection error'))
    }
    xhr.open('POST', `${import.meta.env.VITE_API_URL}/posts`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    const post = { title, text, image, location }
    const json = JSON.stringify(post)

    xhr.send(json)
}
