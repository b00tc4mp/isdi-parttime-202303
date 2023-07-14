import { savePost } from '../../data.js'
import { validators } from 'com'
import retrievePostByPostId from './retrievePostByPostId.js'

const { validateUserId, validatePostId, validateCallback } = validators

export function toggleLikePost(userId, postId, callback) {
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
    xhr.open("PATCH", `${import.meta.env.VITE_API_URL}/posts/${postId}/likes`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)


    const post = { postId }
    const json = JSON.stringify(post)

    xhr.send(json)

}
