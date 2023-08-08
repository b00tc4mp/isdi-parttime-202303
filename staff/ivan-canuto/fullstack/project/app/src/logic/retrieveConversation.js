import context from "./context"
import { errors, validators } from 'com'

const { validateId } = validators

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