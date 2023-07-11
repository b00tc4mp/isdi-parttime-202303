import { validators } from 'com'
import context from './context'

const { validateEmail, validatePassword } = validators


/**
 * Authenticates a user by email and password and keeps the session token in context
 * 
 * @param {string} email The user's email
 * @param {string} password The user's password
 * 
 * @returns {string} The user's id
 */
export default (email, password) => {
    validateEmail(email)
    validatePassword(password)

    return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => {
            if (res.status === 200)
                return res.json()

            return res.json()
                .then(body => {
                    throw new Error(body.error)
                })
        })
        .then(token => {
            context.token = token
        })
}