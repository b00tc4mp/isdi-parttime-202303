import context from "./context"
import { validators } from 'com'

const { validateId } = validators

/**
 * Delete the contact for the user's
 * 
 * @param {string} id The productId 
 */

export default (productId) => {
    validateId(productId, 'contact id')

    return (async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/lists/${context.listId}/products/${productId}/delete`, {
            method: 'DELETE',
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