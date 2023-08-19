import { validators } from 'com'
const { validateUserId, validatePostId, validateCallback } = validators

export function toggleSavePost(userId, postId, callback) {
    validateUserId(userId)
    validatePostId(postId)
    validateCallback(callback)

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
    xhr.open("PATCH", `${import.meta.env.VITE_API_URL}/posts/${postId}/saves`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)


    const post = { postId }
    const json = JSON.stringify(post)

    xhr.send(json)


}