import context from "./context"

import { validators } from 'com'

const { validateId, } = validators

/**
 * Retrieve the list
 * 
* @returns {messages} The messages to list
 */
export default async (productId) => {   
    validateId(productId, 'product')

    const res = await fetch(`${import.meta.env.VITE_API_URL}/lists/${context.listId}/products/${productId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${context.token}`
        },
    })

    if (res.status === 200)
            return await res.json()
        
    const { error: message } = await res.json()

    throw new Error(message) 
}