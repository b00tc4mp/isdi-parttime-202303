import context from './context'

import { validators } from 'com'

const { validateId } = validators

/**
 * Retrieve the stores list
 * 
 * @param {string} listId The stores's list
 * 
* @returns {Array: stores} The stores listid
 */
export default async (listId) => {  
    validateId(listId, 'list') 
    
    const res = await fetch(`${import.meta.env.VITE_API_URL}/lists/${listId}/stores`, {
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