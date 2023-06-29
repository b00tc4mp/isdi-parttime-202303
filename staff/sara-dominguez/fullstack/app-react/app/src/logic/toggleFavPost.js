import { validators } from 'com'
const { validateId, validatePostId, validateCallback } = validators


export default function toggleFavPost(userId, postId, callback) {
    validateId(userId)
    validatePostId(postId)
    validateCallback(callback)

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

    xhr.open('PACTH', `${import.meta.VITE_API_URL}/users/favs/${postId}`)

    // xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('authorization', `Bearer ${userId}`)

    xhr.send()

}