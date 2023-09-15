import context from "./context"
import { errors, validators } from 'com'

const { validateText } = validators

/**
 * Retrieves the posts matching the user search
 * 
 * @param {string} textToSearch The text used for searching posts
 * @param {string} subject The subject of the posts
 * 
 * @returns {Promise<array>} The array of posts
 * 
 * @throws {TypeError} On non-string text to search
 * @throws {ContentError} On empty text to search
*/

export default function retrieveSearchedPosts(subject, textToSearch) {
    validateText(subject, 'subject')
    validateText(textToSearch, 'text to search')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/searchedPosts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ textToSearch, subject })
        })

        if (res.status === 200)
            return res.json()

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)
    })()
}