import { validators, errors } from 'com'
import context from './context'

const { validateId } = validators

/**
 * Sets and unsets a post as saved/favorite by the user
 * 
 * @param {string} postId The post id
 * 
 * @returns {Promise} A Promise that resolves when a post is saved/unsaved as favorite successfully, or throws an error if the operation fails
 * 
 * @throws {TypeError} On non-string post id
 * @throws {ContentError} On post id length not equal to 24 characters
 */

export default function toggleSavePost(postId) {
    validateId(postId, 'post id')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/posts/${postId}/toggleSave`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${context.token}`
            }
        })

        if (res.status === 200)
            return

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)
    })()
}