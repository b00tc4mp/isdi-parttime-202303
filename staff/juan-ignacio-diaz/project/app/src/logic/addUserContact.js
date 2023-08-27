import context from "./context"

import { validators } from 'com'

const { validateId } = validators

/**
 * Add the contact for the user's
 * 
 * @param {string} id The contact 
 */

export default async (contactId) => {
    validateId(contactId, 'contact id')

    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/contact/${contactId}/add`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${context.token}`
        },
    })

    if (res.status === 201)
        return

    const { error: message } = await res.json()

    throw new Error(message)
}