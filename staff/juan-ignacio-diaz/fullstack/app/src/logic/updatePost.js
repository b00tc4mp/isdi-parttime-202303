import { validators } from 'com'
const { validateId, validateUrl, validateText, validateCallback } = validators

export default function updatePost(userId, postId, image, text, callback) {
    validateId(userId)
    validateId(postId)
    validateCallback(callback)
    if(image !== '') validateUrl(image)
    if(text !== '') validateText(text)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr

        if (status !== 204) {
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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/${userId}/posts/${postId}/update/post`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    
    const post = { image, text }
    const json = JSON.stringify(post)

    xhr.send(json)
}