import context from "./context"

import { validators } from 'com'

const { validateId } = validators

/**
 * Update the likes for the product 
 * 
 * @param {string} productId The list's id product 
 */

export default (productId) => {
    validateId(productId, 'product id')
 
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/lists/${context.listId}/products/${productId}/like`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${context.token}`
            },
        })

        if (res.status === 204)
            return
        
        const { error: message } = await res.json()
        
        throw new Error(message)
    })()
}