import context from "./context"

/**
 * Retrieve the lists that the user has accepted
 * 
* @returns {Array: lists} The lists
 */

export default async () => {   
    const res = await fetch(`${import.meta.env.VITE_API_URL}/lists/guest`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${context.token}`
        }
    })

    if (res.status === 200)
        return await res.json()

    const { error: message } = await res.json()

    throw new Error(message) 
}