import { findPostById, findUserById } from '../data/data-managers';
import { validators } from 'com';

const { validateCallback, validateId } = validators;


/**
 * Retrieve's all the post data
 * 
 * @param {string} userAuth The user logged id
 * @param {string} postId The id of the post to edit
 * @param {function} callback Function that controls the errors
 * 
 * @returns a post object
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

        const { response: json } = xhr
        const post = JSON.parse(json)

        callback(null, post)
    }

    xhr.onerror = () => {
        callback(new Error('Connection error'))
    }

    xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts/${postId}`)

    xhr.setRequestHeader('Authorization', `Bearer ${userAuth}`)

    xhr.send()
}