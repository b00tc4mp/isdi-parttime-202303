import context from "./context"

/**
 * Update the app mode for the user's
 * 
 * @param {string} mode The user's mode
 */

export default async (listId) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/lists/${listId}/accept`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${context.token}`
        },
    })

    if (res.status === 204)
        return

    const { error: message } = await res.json()

    throw new Error(message)
}