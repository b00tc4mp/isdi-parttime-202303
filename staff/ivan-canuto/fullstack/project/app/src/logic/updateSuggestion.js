import { validators, errors } from 'com'
import context from './context'

const { validateId, validateSuggestionTitle, validateSuggestionContent } = validators
const { ContentError } = errors

/**
 * Updates the suggestion with new data
 * 
 * @param {string} suggestionId The suggestion id
 * @param {string} title The suggestion title
 * @param {string} content The suggestion content
 * 
 * @returns {Promise} A Promise that resolves when a suggestion is created successfully, or throws an error if suggestion creation fails
 * 
 * @throws {TypeError} On non-string suggestion id, suggestion title or suggestion content
 * @throws {ContentError} On suggestion id length not equal to 24 characters, or empty suggestion title or length longer tha 30 characters, or empty suggestion content or length not being between 50 and 500 characters
 */

export default function updateSuggestion(suggestionId, _title, _content) {
    validateId(suggestionId, 'suggestion id')
    validateSuggestionTitle(_title)
    validateSuggestionContent(_content)

    const title = _title.trim()
    const content = _content.trim()

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/suggestions/${suggestionId}/editSuggestion`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ title, content })
        })

        if (res.status === 204)
            return

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)
    })()
} 