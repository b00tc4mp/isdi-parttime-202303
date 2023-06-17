import { validators } from "com"
import { findUserById, saveUser } from "../../data.js"

const { validateCallback, validateEmail, validateUserId } = validators
export default (userId, email, callback) => {
    validateEmail(email)
    validateUserId(userId)
    validateCallback(callback)

    const xhr = new XMLHttpRequest
    xhr.onload = () => {
        const { status } = xhr

        if (status !== 204) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }

        callback(null)
    }

    xhr.onerror = () => {
        callback(new Error('connection error'))
    }

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/email/${userId}`)

    xhr.setRequestHeader('Content-Type', 'application/json')

    const userData = { email }
    const json = JSON.stringify(userData)

    xhr.send(json)
}
