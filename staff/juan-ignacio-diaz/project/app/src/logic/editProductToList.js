import context from "./context"

import { validators } from 'com'

const { validateText, validateNumber, validateArray } = validators

/**
 * Add message for the list
 * 
 * @param {string} id the product
 * @param {string} name the name
 * @param {string} howMany the howMany
 * @param {Array: string} id the stores
 * @param {string} type the type product
 * @param {string} comment the comment
 */

export default async (productId, name, howMany, stores, type, comment) => {
    validateText(name, 'name')
    validateNumber(howMany, 'howMany')
    validateArray(stores, 'stores')
    validateText(type, 'type')
    validateText(comment, 'comment')

    const res = await fetch(`${import.meta.env.VITE_API_URL}/lists/${context.listId}/products/${productId}/edit`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify({ name, howMany, stores, type, comment })
    })

    if (res.status === 204)
        return

    const { error: message } = await res.json()

    throw new Error(message)
}