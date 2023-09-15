import { validators, errors } from 'com'
import context from './context'

const { validateId, validateSuggestionTitle, validateSuggestionContent } = validators

/**
 * Creates a suggestion
 * 
 * @param {string} postId The post id.
 * @param {string} _title The title of the post
 * @param {string} _content A text consisting in the content of the post.
 * 
 * @returns {Promise} A Promise that resolves when a suggestion is created successfully, or throws an error if suggestion creation fails
 * 
 * @throws {TypeError} On non-string post id, suggestion title or suggestion content
 * @throws {ContentError} On post id length not equal to 24 characters, or empty suggestion title or length longer tha 30 characters, or empty suggestion content or length not being between 50 and 500 characters
 */

export default function createSuggestion(postId, _title, _content) {
    validateId(postId, 'post id')
    validateSuggestionTitle(_title)
    validateSuggestionContent(_content)

    const title = _title.trim()
    const content = _content.trim()

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/suggestions/newSuggestion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ title, content })
        })

        if (res.status === 201)
            return

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)
    })()
} 