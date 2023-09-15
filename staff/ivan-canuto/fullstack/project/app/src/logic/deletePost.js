import { validators, errors } from 'com'
import context from './context'

const { validateId } = validators

/**
 * Deletes a user's post.
 * 
 * @param {string} postId The post's id.
 * 
 * @returns {Promise} A Promise that resolves when a post is deleted successfully, or throws an error if deletion fails
 * 
 * @throws {TypeError} On non-string post id
 * @throws {ContentError} On post id length not equal to 24 characters
 */

export default function deletePost(postId) {
    validateId(postId, 'post id')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/delete`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${context.token}`
            },
        })

        if (res.status === 204)
            return

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)
    })()
}