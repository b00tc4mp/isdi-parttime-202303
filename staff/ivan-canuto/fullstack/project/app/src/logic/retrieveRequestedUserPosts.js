import context from "./context"
import { errors, validators } from 'com'

const { validateId } = validators

/**
 * Retrieves the user by user id
 * 
 * @param {string} requestedUserId The requested user id.
 * 
 * @returns {Promise<object>} The user object
 */

export default function retrieveRequestedUserPosts(requestedUserId) {
    validateId(requestedUserId, 'profile user id')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${requestedUserId}/posts/requestedUserPosts`, {
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