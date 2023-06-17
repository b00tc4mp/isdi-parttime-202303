import { validators } from "com"
import { saveUser } from "../../data.js"
import { findUserByEmail } from "../../data.js"
import { loadUsers } from "../../data.js"

const { validateEmail, validatePassword, validateCallback } = validators
export default (name, email, password, callback) => {
    validateCallback(callback)
    validateEmail(email)
    validatePassword(password)

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
        callback(new Error('connection error'))
    }

    xhr.open('POST', 'http://localhost:4000/users')

    xhr.setRequestHeader('Content-Type', 'application/json')

    const user = { name, email, password }
    const json = JSON.stringify(user)

    xhr.send(json)
}
