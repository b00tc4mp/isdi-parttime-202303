import { validators } from 'com'
const { validateId, validateText, validateUrl } = validators

export default function updatePost(userId, postId, image, text, callback) {
    validateId(userId)
    validateId(postId)
    validateUrl(image)
    validateText(text)

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

    xhr.open("PATCH", `${import.meta.env.VITE_API_URL}/posts/update/${postId}`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

    const data = { image, text }
    const json = JSON.stringify(data)

    xhr.send(json)
}