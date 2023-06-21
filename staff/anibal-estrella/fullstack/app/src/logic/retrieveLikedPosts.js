import { findUserById, loadPosts, loadUsers } from "../data.js"

import { validators } from 'com'
const { validateCallback, validateId } = validators

export default function retrieveLikedPosts(userId, callback) {
    validateId(userId, 'user id')
    validateCallback(callback, 'callback function')

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr

        if (status !== 200) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }
        const { response: json } = xhr
        const user = JSON.parse(json)
        callback(null, user)
    }

    xhr.onerror = () => {
        callback(new Error('Connection Error!'))
    }

    xhr.open('GET', `${import.meta.env.VITE_API_URL}/users/posts/likes/`)
    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

    xhr.send()
}


