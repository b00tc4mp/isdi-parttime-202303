import context from "./context"

import { validators } from 'com'

const { validateId, validateName } = validators

/**
 * Add store for the list
 * 
 * @param {string} name the name 
 */

export default async (listId, name) => {
    validateId(listId, 'list') 
    validateName(name)

    const res = await fetch(`${import.meta.env.VITE_API_URL}/lists/${listId}/store`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify({ name })
    })

    if (res.status === 200)
        return await res.json()

    const { error: message } = await res.json()

    throw new Error(message)
}