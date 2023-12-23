import context from "./context"

import { validators } from 'com'

const { validateText } = validators

/**
 * Add message for the list
 * 
 * @param {string} text the message
 */

export default async (text) => {
    validateText(text, 'message')

    const res = await fetch(`${import.meta.env.VITE_API_URL}/lists/${context.listId}/message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify({ text })
    })

    if (res.status === 201)
        return

    const { error: message } = await res.json()

    throw new Error(message)
}