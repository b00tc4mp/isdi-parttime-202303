import context from "./context"

import { validators } from 'com'
const { validateDate, validateText } = validators

/**
 * Create a list by name and date end
 * 
 * @param {string} name The list's name
 * @param {date} date The list's date end
 * 
 */

export default (name, dateToEnd) => {
    validateText(name, 'name')
    validateDate(dateToEnd)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/lists/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${context.token}`
            },
            body: JSON.stringify({ name, dateToEnd })
        })

        if (res.status === 201)
            return
        
        const { error: message } = await res.json()
        
        throw new Error(message)
    })()
}
