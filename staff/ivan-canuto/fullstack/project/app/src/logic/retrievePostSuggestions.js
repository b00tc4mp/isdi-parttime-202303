import context from "./context"
import { errors, validators } from 'com'

const { validateId } = validators

/**
 * Retrieves the suggestions that belong to the post
 * 
 * @param {string} postId The post id
 * 
 * @returns {Promise<array>} The array of suggestions
 * 
 * @throws {TypeError} On non-string post id
 * @throws {ContentError} On post id length not equal to 24 characters
*/

export default function retrievePostSuggestions(postId) {
    validateId(postId, 'post id')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/postSuggestions`, {
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
