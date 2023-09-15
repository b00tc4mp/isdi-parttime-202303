import context from "./context"
import { errors, validators } from 'com'

const { validateId } = validators

/**
 * Retrieves a conversation between the current user and the chatbot
 * 
 * @param {string} conversationId The conversation id
 * 
 * @returns {Promise<object>} The conversation object
 * 
 * @throws {TypeError} On non-string conversation id
 * @throws {ContentError} On conversation id length not equal to 24 characters
 */

export default function retrieveConversations(conversationId) {
    validateId(conversationId, 'conversation id')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/conversations/${conversationId}/conversation`, {
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