import { validators } from 'com'
import context from './context'

const { validateId } = validators

/**
 * Toggles post privacy
 * @param {string} postId post's id
 * @param {function} callback 
 */

export default function togglePrivacy(postId) {
    validateId(postId)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/privacy`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            }
        })

        if (res.status !== 201) {
            const { message } = await res.json()

            throw new Error(message)
        }
    })()
}