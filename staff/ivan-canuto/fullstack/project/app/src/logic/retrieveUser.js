import context from "./context"
import { errors } from 'com'

/**
 * Retrieves the user by user id
 * 
 * @returns {Promise<object>} The user object
 */

export default function retrieveUser() {
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/user`, {
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