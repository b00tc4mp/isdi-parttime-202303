import { validators } from 'com'
const { validateId, validateToken, validateCallback } = validators

import { findUserById, findPostById, saveUser } from '../data.js'


export default function toggleFavPost(token, postId, callback) {
    validateToken(token)
    validateId(postId, 'post id')

    if (callback) {
        validateCallback(callback, 'callback function')

        findUserById(userId, user => {
            if (!user) {
                callback(new Error(`User ${userId} not found`))
                return
            }

            findPostById(postId, post => {
                if (!post) {
                    callback(new Error(`Post ${postId} not found`))
                    return
                }
                const index = user.favs.indexOf(postId)

                if (index < 0)
                    user.favs.push(postId)
                else
                    user.favs.splice(index, 1)

                saveUser(user, () => callback(null))
            })
        })
    }

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
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

