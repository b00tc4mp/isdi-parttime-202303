import context from "./context"

import { validators } from 'com'

const { validateId } = validators

/**
 * Retrieve the list
 * 
* @returns {list} The context user
 */
export default async (listId) => {   
    validateId(listId, 'list id')
    
    const res = await fetch(`${import.meta.env.VITE_API_URL}/lists/${listId}`, {
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