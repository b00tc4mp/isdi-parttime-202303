import { validators, errors } from 'com'
import context from './context'

const { validateId } = validators

/**
 * Deletes a user's comment.
 * 
 * @param {string} postId The post's id.
 * @param {string} commentId The comment's id.
 * 
 * @returns {Promise} A Promise that resolves when a comment is deleted successfully, or throws an error if deletion fails
 * 
 * @throws {TypeError} On non-string post id or comment id
 * @throws {ContentError} On post id or comment id length not equal to 24 characters
 */

export default function deleteComment(postId, commentId) {
    validateId(postId, 'post id')
    validateId(commentId, 'comment id')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments/${commentId}/delete`, {
            method: 'PATCH',
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