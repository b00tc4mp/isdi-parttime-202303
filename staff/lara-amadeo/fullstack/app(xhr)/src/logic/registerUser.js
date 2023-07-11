import { validators } from 'com'
const { validateEmail, validatePassword } = validators

/**
 * Registers a user in the database
 * @param {string} username user's username
 * @param {string} email user's email
 * @param {string} password user's password
 * @param {string} repPassword user's password repetition
 */

export const registerUser = (username, email, password, repPassword, callback) => {

    validateEmail(email)
    validatePassword(password)
    validatePassword(repPassword, 'new password')

    if (password !== repPassword) {
        throw new Error('Passwords not matching')
    }

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr

        if (status !== 201) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }

        callback(null)
    }

    xhr.onerror = () => {
        callback(new Error('Connection error'))
    }

    xhr.open('POST', 'http://localhost:4000/users')

    xhr.setRequestHeader('Content-Type', 'application/json')

    const user = { username, email, password }
    const json = JSON.stringify(user)

    xhr.send(json)
}
