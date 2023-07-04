import { validators } from 'com'
const { validateId, validateCallback } = validators

/**
 * 
 * @param {*} userId 
 * @param {*} postId 
 * @param {*} callback 
 */

export default function retrievePost(userId, postId, callback) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateCallback(callback, 'callback function')



    xhr.onload = () => {
        const { status } = xhr

        if (status !== 200) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }

        const { response: json } = xhr
        const post = JSON.parse(json)
        callback(null, post)
    }

    xhr.onerror = () => {
        callback(new Error('Connection Error!'))
    }

    xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts/${postId}`)
    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

    xhr.send()

}