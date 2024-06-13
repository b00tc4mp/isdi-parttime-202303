import { validators, errors } from 'com'
import context from './context'

const { validateId, validateArray } = validators

/**
 * Asks to the API for a response to a user's question.
 * 
 * @param {string} conversationId The conversation id.
 * @param {string} commentText The comment text entered by user.
 * 
 * @returns {Promise<string>} The response created by the API.
 * 
 * @throws {TypeError} On non-string user id or conversation id, or non-array current conversation
 * @throws {ContentError} On user id or conversation id length not equal to 24 characters
 * @throws {ExistenceError} On non-existing user or conversation
 */

export default function askForResponse(conversationId, currentConversation) {
    validateId(conversationId, 'conversation id')
    validateArray(currentConversation, 'current conversation')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/conversations/${conversationId}/askForResponse`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ currentConversation })
        })

        if (res.status === 201)
            return res.json()

        const { type, message } = await res.json()

        if (message === 'Request failed with status code 429') {
            throw new Error('Overload server, too many requests in a row.')
        }
        else {
            const clazz = errors[type]

            throw new clazz(message)
        }
    })()
} 