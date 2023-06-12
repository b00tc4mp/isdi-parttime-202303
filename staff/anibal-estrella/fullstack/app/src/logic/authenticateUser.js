import { validators } from 'com'

const { validateEmail, validatePassword, validateCallback } = validators

/* 
*
* authenticates a user by email and password
* @param {String} email The user's email
* @param {String} password The user's passaword
*
*/
export function authenticateUser(email, password, callback) {
    validateEmail(email, 'email')
    validatePassword(password)
    validateCallback(callback, 'callback function')

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr

        //checkl what  the API responds 
        if (status !== 200) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }

        const { response: json } = xhr
        const { userId } = JSON.parse(json)

        callback(null, userId)
    }

    xhr.onerror = () => {
        callback(new Error('Connection Error!'))
    }

    xhr.open('POST', `${import.meta.env.VITE_API_URL}/users/auth`)

    xhr.setRequestHeader('Content-Type', 'application/json')

    const user = { email, password }
    const json = JSON.stringify(user)
    xhr.send(json)
}