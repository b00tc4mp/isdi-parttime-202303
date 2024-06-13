import { validators, errors } from 'com'
import context from './context'

const { validateId } = validators

/**
 * Retrieves the requested post by post id
 * 
 * @param {string} postId The post id.
 * 
 * @returns {Promise<object>} The post object
 * 
 * @throws {TypeError} On non-string post id
 * @throws {ContentError} On post id length not equal to 24 characters
*/

export default function retrievePost(postId) {
    validateId(postId, 'post id')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/posts/${postId}/post`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${context.token}`
            }
        })

        if (res.status === 200)
            return res.json()

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)
    })()
}