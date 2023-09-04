import { validators, errors } from 'com'
import context from './context'

const { validateId, validateComment } = validators

/**
 * Creates a comment in post.
 * 
 * @param {object} postId The post's id.
 * @param {string} commentText The comment text entered by user.
 * 
 * @returns {promise} A Promise that resolves when the comment is created, or throws an error if the comment creation fails
 * 
 * @throws {TypeError} On non-string post id or comment text
 * @throws {ContentError} On post id length not equal to 24 characters, empty comment text, or comment text longer than 200 characters.
 */

export default function createComment(postId, _commentText) {
    validateId(postId, 'post id')
    validateComment(_commentText, 'comment text')

    const commentText = _commentText.trim()

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/posts/${postId}/comment`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ commentText })
        })

        if (res.status === 201)
            return

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)
    })()
} 