import context from "./context"
import { errors } from 'com'

/**
 * Retrieves a suggestion by suggestion id
 * 
 * @param {string} suggestionId The suggestion id
 * 
 * @returns {Promise<object>} The suggestion object
 * 
 * @throws {TypeError} On non-string suggestion id
 * @throws {ContentError} On suggestion id length not equal to 24 characters
*/

export default function retrieveSuggestion(suggestionId) {
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/suggestions/${suggestionId}`, {
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
