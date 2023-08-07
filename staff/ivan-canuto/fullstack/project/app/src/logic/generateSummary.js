import context from "./context"
import { errors, validators } from "com"

const { validateId } = validators

export default function generateSummary(conversationId) {
    validateId(conversationId, 'conversation id')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/conversations/${conversationId}/generateSummary`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${context.token}`
            }
        })

        if (res.status === 200)
            return res.text()

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)
    })()
}