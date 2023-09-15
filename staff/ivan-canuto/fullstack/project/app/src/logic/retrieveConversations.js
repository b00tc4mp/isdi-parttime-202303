import context from "./context"
import { errors } from "com"

/**
 * Retrieves all the conversations between the user and the chatbot
 * 
 * @returns {Promise<array>} The array of conversations
 */

export default function retrieveConversations() {
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/conversations`, {
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