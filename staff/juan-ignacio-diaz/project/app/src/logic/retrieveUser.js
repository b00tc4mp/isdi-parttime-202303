import context from "./context"

/**
 * Retrieve the context user
 * 
* @returns {user} The context user
 */
export default async () => {      
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
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