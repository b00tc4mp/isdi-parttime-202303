import { validators } from 'com';

const { validateId, validateCallback } = validators;

/**
 * Deletes a post by its id.
 * 
 * @param {string} userAuth The logged user's id
 * @param {string} postId The post id
 * @param {function} callback Function that controls the errors
 * 
 */
export default (userAuth, postId, callback) => {
    validateId(userAuth);
    validateId(postId);
    validateCallback(callback);

    const xhr = new XMLHttpRequest()

    xhr.onload = () => {
        const { status } = xhr

        if (status !== 200) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }

        callback(null)
    }

    xhr.onerror = () => {
        callback(new Error('Connection error'))
    }

    xhr.open('DELETE', `${import.meta.env.VITE_API_URL}/posts/${postId}`)

    xhr.setRequestHeader('Authorization', `Bearer ${userAuth}`)

    xhr.send()

}