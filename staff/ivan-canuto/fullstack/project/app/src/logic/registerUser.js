import { validators, errors } from 'com'

const { validateUsername, validateEmail, validatePassword, validateText } = validators

/**
 * Registers a new user with a username, an email, and a password
 * 
 * @param {string} name The name of the user
 * @param {string} username The username attached to the user account
 * @param {string} email The user's email
 * @param {string} password The user's password
 * 
 * @returns {promise} A Promise that resolves when the registration is successful, or rejects with an error message if registration fails
 * 
 * @throws {TypeError} On non-string username, email or password
 * @throws {ContentError} On empty username or email
 * @throws {RangeError} On password length lower than 6 characters
 */

export default function registerUser(name, _username, email, password) {
    validateText(name, 'name of the user')
    validateUsername(_username)
    validateEmail(email, 'user email')
    validatePassword(password, 'user password')

    const username = _username.toLowerCase()

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, username, email, password })
        })

        if (res.status === 201)
            return

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)
    })()
}
