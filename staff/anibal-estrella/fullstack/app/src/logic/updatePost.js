import { validators } from 'com'
const { validateId, validateUrl, validateText, validateCallback } = validators

/**
 * Updates 
 * @param {*} userId 
 * @param {*} postId 
 * @param {*} image 
 * @param {*} text 
 * */

export function updatePost(userId, postId, image, text, callback) {
    validateUrl(image, 'image url')
    validateText(text, 'text')
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateCallback(callback, 'callback function')
)
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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/post/${postId}`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

    const data = { image, text }
    const json = JSON.stringify(data)

    xhr.send(json)
}