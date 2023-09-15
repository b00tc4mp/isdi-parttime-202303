import context from "./context"
import { errors, validators } from 'com'

const { validateText } = validators

/**
 * Retrieves all posts or the posts selected by subject from database
 * 
 * @param {string} subject The subject related to the posts
 * 
 * @returns {Promise<array>} The array of posts
 * 
 * @throws {TypeError} On non-string subject
 * @throws {ContentError} On subject field is empty
*/

export default function retrievePosts(subject) {
    validateText(subject, 'subject')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ subject })
        })

        if (res.status === 200)
            return res.json()

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)
    })()
}
