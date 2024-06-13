import { validators, errors } from 'com'
import context from './context'

const { validatePassword } = validators
const { ContentError } = errors

/**
 * Updates the user password
 * 
 * @param {string} password The user password
 * @param {string} newPassword The new user password
 * @param {string} newPasswordConfirm The user password confirmation
 * 
 * @returns {Promise} A Promise that resolves when the user password is updated successfully, or thorws an error if the operation fails
 * 
 * @throws {TypeError} On non-string password, new password or new password confirmation
 * @throws {ContentError} On new passwords do not match
 * @throws {RangeError} On password, new password or new password confirmation length lower than 6 characters
 */

export default function updateUserPassword(password, newPassword, newPasswordConfirm) {
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    validatePassword(newPasswordConfirm, 'new password confirmation')

    if (newPassword !== newPasswordConfirm)
        throw new ContentError('The new passwords do not match.')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/newPassword`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ password, newPassword, newPasswordConfirm })
        })

        if (res.status === 204)
            return

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)
    })()
}