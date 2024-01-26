import { validators, errors } from 'com'
import context from './context'
const { validateUrl } = validators

/**
* Update the avatar of an employee
* 
* @param {string} newAvatar  URL of the new avatar for the employee
* 
* @returns {Promise<void>} Ends when the avatar is updated.
* 
* @throws {TypeError} On non-string URL
* @throws {ContentError} On empty URL
*/

export default function updateEmployeeAvatar(newAvatar) {
    validateUrl(newAvatar)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/employees/updateAvatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${context.token}`
            },
            body: JSON.stringify({ avatar: newAvatar })
        })
        if (res.status === 204) {
            return
        } else {
            const { type, message } = await res.json()

            const clazz = errors[type]

            throw new clazz(message)
        }
    })()
}