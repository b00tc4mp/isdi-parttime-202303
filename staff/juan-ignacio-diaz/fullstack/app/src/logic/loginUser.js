import context from './context'
import { validators } from 'com'

const { validateEmail, validatePassword } = validators

/**
 * Authenticates a user by email and password
 * 
 * @param {string} email The user's email
 * @param {string} password The user's password
 * 
 * @returns {string} The user's id
 */

export default (email, password) => {
    validateEmail(email)
    validatePassword(password)
 
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        if (res.status === 200) {
            const token = await res.json() 

            context.token = token

            return
        }
        
        const { error: message } = await res.json()
        
        throw new Error(message)
    })()
}