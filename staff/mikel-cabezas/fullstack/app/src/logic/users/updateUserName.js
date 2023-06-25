import { findUserById, saveUser } from "../../data.js"
import { validators } from "com"

const { validateCallback, validateName, validateUserId } = validators

export default (userId, name, callback) => {
    validateUserId(userId)
    validateName(name)
    validateCallback(callback)
    debugger
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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/username`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

    const userData = { name }
    const json = JSON.stringify(userData)

    xhr.send(json)
}