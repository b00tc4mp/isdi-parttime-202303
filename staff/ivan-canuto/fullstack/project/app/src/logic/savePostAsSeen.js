import context from "./context"
import { errors, validators } from 'com'

const { validateId } = validators

/**
 * Saves a post as seen by the user
 * 
 * @param {string} userId The user id
 * @param {string} postId The post id
 * 
 * @returns {Promise} A Promise that resolves when a post is saved as seen successfully, or throws an error if the operation fails
 * 
 * @throws {TypeError} On non-string post id
 * @throws {ContentError} On post id length not equal to 24 characters
*/

export default function savePostAsSeen(postId) {
    validateId(postId, 'post id')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/saveSeenPost`, {
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