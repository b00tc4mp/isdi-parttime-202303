import context from './context'
import { validators } from 'com'

const { validateText } = validators

/**
 * Search a user by email
 * 
 * @param {string} email The user's email
 * 
 * @returns {object: user} The user name, email and id
 */

export default (email) => {
    validateText(email, 'email')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${context.token}`        
            },
            body: JSON.stringify({ email })
        })

        if (res.status === 200)
            return await res.json()
        
        const { error: message } = await res.json()
        
        throw new Error(message)
    })()
}