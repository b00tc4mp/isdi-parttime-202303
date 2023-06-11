import { validators } from 'com'
const { validateId, validateCallback } = validators

import { savePost, findUserById, findPostById } from '../data'

export default function updateBuyPost(userId, postId, callback) {
    validateId(userId)
    validateId(postId)
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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/update/buy/${userId}`)

    const post = { postId }
    const json = JSON.stringify(post)

    xhr.send(json)
}