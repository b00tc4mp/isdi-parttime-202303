import context from "./context"

import { validators } from 'com'

const { validateObject, validateText } = validators

/**
 * Retrieve the list
 * 
* @returns {messages} The messages to list
 */
export default async (filter, order) => {   
    validateObject(filter, 'filter')
    if(order !== '') validateText(order, 'order')   

    filter._id = context.listId

    const res = await fetch(`${import.meta.env.VITE_API_URL}/lists/${context.listId}/products/filter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify({ filter, order })
    })

    if (res.status === 200)
            return await res.json()
        
    const { error: message } = await res.json()

    throw new Error(message) 
}