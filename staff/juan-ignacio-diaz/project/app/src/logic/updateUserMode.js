import context from "./context"

/**
 * Update the app mode for the user's
 * 
 * @param {string} mode The user's mode
 */

export default async (mode) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/updateMode`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify({ mode })
    })

    if (res.status === 204)
        return

    const { error: message } = await res.json()

    throw new Error(message)
}