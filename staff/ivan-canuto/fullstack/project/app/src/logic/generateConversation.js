import context from "./context"
import { errors, validators } from "com"

const { validateText } = validators

export default function generateConversation(userInput) {
    validateText(userInput, 'user input')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/generateConversation`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ userInput })
        })

        if (res.status === 201)
            return res.text()

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)
    })()
}