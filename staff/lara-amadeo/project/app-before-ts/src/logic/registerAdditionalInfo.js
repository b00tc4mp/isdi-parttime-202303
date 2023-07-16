// import { validateEmail, validatePassword } from '../../../com/validators'
/**
 * Registers a user in the database
 * @param {string} username user's username
 * @param {string} email user's email
 * @param {string} password user's password
 * @param {string} repPassword user's password repetition
 */

export const registerAdditionalInfo = (token, description, tags, location, availability) => {

    // validateEmail(email)
    // validatePassword(password)

    const info = { description, tags, location, availability }

    return fetch('http://localhost:1234/users/info', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(info)
    })
        .then(res => {
            if (res.status !== 204) return res.json().then(({ error }) => { throw new Error(error) })
        })
}