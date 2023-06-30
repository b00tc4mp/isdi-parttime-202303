import { validators } from 'com'

const { validateToken } = validators

/**
 * Retrieves all posts
 * @param {string} userId user id
 * @param {function} callback 
 * @returns {array} an array of objects with all the posts found
 */

export default function retrievePosts(token, callback) {
    validateToken(token, 'token')

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
        const posts = JSON.parse(json)

        callback(null, posts.reverse())
    }

    xhr.onerror = () => {
        callback(new Error('connection error'))
    }

    xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts/retrieveall`)

    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)


    xhr.send()
}