import { validators } from 'com'
const { validateId, validateCallback } = validators

import { findUserById, findPostById, savePost } from '../data.js'
/**
 * Toggle the like/unlike state of a post and stors the userid in the likes porperty array in the post object
 * @param {*} userId the id of the user that toggles
 * @param {*} postId the id of the post to toggle the like
 * @param {*} callback 
 */
export default function toggleLikePost(userId, postId, callback) {
    validateId(postId, 'post id')
    validateId(userId, 'user id')

    if (callback) {

        validateCallback(callback, 'callback function')
        const xhr = new XMLHttpRequest()
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

        xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}/likes`)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

        xhr.send()
    }

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/likes/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            if (res.status !== 200)
                return res.json().then(({ error: message }) => {
                    throw new Error(message)
                })

            return res.json()
        })

}