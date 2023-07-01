import { validators } from 'com'
const { validateId, validatePostId, validateCallback } = validators

export default function toggleLikePost(userId, postId, callback) {
    validateId(userId)
    validatePostId(postId)
    validateCallback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr

        if (status !== 204) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))
        }

        // const { response: json } = xhr
        // const post = JSON.parse(json)

        callback(null)
    }

    xhr.onerror = () => {
        callback(new Error('connection error'))
    }

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}/likes`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('authorization', `Bearer ${userId}`)

    xhr.send()

}