import context from "./context"
import { errors } from 'com'

/**
 * Retrieves the suggestions made to the posts of the current user
 * 
 * @returns {Promise<array>} The array of suggestions
 */

export default function retrieveOwnPostsSuggestions() {
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/ownPostsSuggestions`, {
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
