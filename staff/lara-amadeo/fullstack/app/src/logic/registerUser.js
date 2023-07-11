import { validators } from 'com'
const { validateEmail, validatePassword } = validators

/**
 * Registers a user in the database
 * @param {string} username user's username
 * @param {string} email user's email
 * @param {string} password user's password
 * @param {string} repPassword user's password repetition
 */

export const registerUser = (username, email, password, repPassword) => {

    validateEmail(email)
    validatePassword(password)
    validatePassword(repPassword, 'new password')

    if (password !== repPassword) {
        throw new Error('Passwords not matching')
    }

    const user = { username, email, password }

    return fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => {
            if (res.status !== 201) return res.json().then(({ error }) => { throw new Error(error) })
        })
}
