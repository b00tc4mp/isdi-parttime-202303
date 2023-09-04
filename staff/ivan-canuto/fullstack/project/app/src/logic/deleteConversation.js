import { validators, errors } from 'com'
import context from './context'

const { validateId } = validators

/**
 * Deletes a user's conversation with the chatbot.
 * 
 * @param {string} conversationId The conversation id.
 * 
 * @returns {Promise} A Promise that resolves when a conversation is deleted successfully, or throws an error if deletion fails
 * 
 * @throws {TypeError} On non-string conversation id
 * @throws {ContentError} On conversation id length not equal to 24 characters
 */

export default function deleteConversation(conversationId) {
    validateId(conversationId, 'conversation id')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/conversations/${conversationId}/deleteConversation`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${context.token}`
            }
        })

        if (res.status === 204)
            return

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)
    })()
}