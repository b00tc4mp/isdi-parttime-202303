import { validators } from 'com'
const { validateEmail, validatePassword } = validators
/**
 * Authenticates a user by email and password
 * @param {string} email user's email 
 * @param {string} password user's password 
 * @returns {string} user's id
 */

export const authenticateUser = (email, password) => {
    validateEmail(email)
    validatePassword(password)

    const credentials = { email, password }


    return fetch('http://localhost:4000/users/auth', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(res => {
            if (res.status !== 200) return res.json().then(({ error }) => { throw new Error(error) })

            return res.json()
        })
}
