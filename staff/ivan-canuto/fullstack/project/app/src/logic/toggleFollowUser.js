import { validators, errors } from 'com'
import context from './context'

const { validateId } = validators

/**
 * Sets and unsets an app user as 'following' by the current user
 * 
 * @param {string} profileUserId The profile user id
 * 
 * @returns {Promise} A Promise that resolves when a user is followed/unfollowed successfully, or throws an error if the operation fails
 * 
 * @throws {TypeError} On non-string post id
 * @throws {ContentError} On post id length not equal to 24 characters
 */

export default function toggleLikePost(profileUserId) {
    validateId(profileUserId, 'profie user id')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${profileUserId}/toggleFollow`, {
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