import context from "./context"

/**
 * Add the contact for the user's
 * 
 * @param {string} id The contact 
 */

export default async (contactId) => {
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