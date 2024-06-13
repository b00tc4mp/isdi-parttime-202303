import { errors } from 'com'
import context from './context'

/**
 * Deletes all conversations with the chatbot
 * 
 * @param {string} userId The user id
 * 
 * @returns {Promise} A Promise that resolves when all conversations are deleted successfully, or throws an error if deletion fails
 */

export default function deleteConversation() {
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/conversations/deleteAllConversations`, {
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