import { validators } from 'com'

const { validateToken, validateUrl, validateText } = validators

/**
 * Creates a post from an image url and a text, and assign it to a user id
 * @param {string} userId user's id or token
 * @param {string} image url of the image
 * @param {string} text image caption
 * @param {function} callback 
 */

export function createPost(token, image, text, callback) {
    validateToken(token)
    validateUrl(image)
    validateText(text)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr

        if (status !== 200) {
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

    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    const post = { image, text }
    const json = JSON.stringify(post)

    xhr.send(json)
}