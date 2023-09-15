import context from "./context"
import { errors, validators } from "com"

const { validateText } = validators

/**
 * Creates a conversation.
 * 
 * @param {string} userInput The user first input to start a conversation with the chatbot.
 * 
 * @returns {Promise<string>} The conversation id
 * 
 * @throws {TypeError} On non-string user id or user input
 * @throws {ContentError} On user id length not equal to 24 characters, or empty user input
 */

export default function createConversation(userInput) {
    validateText(userInput, 'user input')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/createConversation`, {
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