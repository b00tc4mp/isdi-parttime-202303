import { validators, errors } from 'com'
import context from './context'

const { validateUrl, validatePassword } = validators

/**
 * Updates the user avatar
 * 
 * @param {string} newAvatarUrl The new avatar url
 * @param {string} password The user password
 * 
 * @returns {Promise} A Promise that resolves when the user avatar is updated successfully, or throws an error if the operation fails
 * 
 * @throws {TypeError} On non-string new avatar url or password
 * @throws {ContentError} On empty new avatar url or the new avatar url is the same as the old one.
 * @throws {RangeError} On password length lower than 6 characters
 */

export default function updateUserAvatar(newAvatarUrl, password) {
    validateUrl(newAvatarUrl)
    validatePassword(password)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/newAvatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ newAvatarUrl, password })
        })

        if (res.status === 204)
            return

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)
    })()
}
