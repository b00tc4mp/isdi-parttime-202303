import context from "./context"

/**
 * Retrieve the list
 * 
* @returns {list} The context listid
 */
export default async () => {   
    
    const res = await fetch(`${import.meta.env.VITE_API_URL}/lists/${context.listId}`, {
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