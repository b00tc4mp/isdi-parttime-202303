import { validators, errors } from 'com'
import context from './context'

const { validateId } = validators

/**
 * Deletes a user's suggestion.
 * 
 * @param {string} postId The post id.
 * @param {string} commentId The suggestion id.
 * 
 * @returns {Promise} A Promise that resolves when a suggestion is deleted successfully, or throws an error if deletion fails
 *
 * @throws {TypeError} On non-string post id or suggestion id
 * @throws {ContentError} On post id or suggestion id length not equal to 24 characters
 */

export default function deleteComment(postId, suggestionId) {
    validateId(postId, 'post id')
    validateId(suggestionId, 'suggestion id')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/suggestions/${suggestionId}/delete`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${context.token}`
            }
        })

        if (res.status === 204)
            return

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)
    })()
}