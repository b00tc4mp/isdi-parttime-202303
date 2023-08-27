import context from "./context"

import { validators } from 'com'

const { validateId } = validators

/**
 * decline invited the contact for the user's
 * 
 * @param {string} id The list
 * @param {string} id The contact 
 */


export default (listId, contactId) => {
    validateId(listId, 'list id')
    validateId(contactId, 'contact id')

    return (async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/lists/${listId}/contact/${contactId}/decline`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${context.token}`
            },
        })

        if (res.status === 204)
                return
            
        const { error: message } = await res.json()

        throw new Error(message)
    })()
}