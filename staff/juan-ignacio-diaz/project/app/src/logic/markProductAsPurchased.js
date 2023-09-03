import context from "./context"

import { validators } from 'com'

const { validateId } = validators

/**
 * Update the state for the product as purchased
 * 
 * @param {string} productId The list's id product 
 * @param {string} price the price
 * @param {Array: string} id the store
 * 
 */

export default (productId, price, stores) => {
    validateId(productId, 'product id')
 
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/lists/${context.listId}/products/${productId}/mark`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${context.token}`
            },
            body: JSON.stringify({ price, stores })
        })

        if (res.status === 204)
            return
        
        const { error: message } = await res.json()
        
        throw new Error(message)
    })()
}