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

    const xhr = new XMLHttpRequest()

    xhr.onload = () => {
        const { status } = xhr
        if (status !== 204) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }
        callback(null)json

        xhr.send(json)
    }
