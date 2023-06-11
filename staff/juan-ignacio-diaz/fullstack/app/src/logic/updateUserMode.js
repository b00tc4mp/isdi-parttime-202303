import { validators } from 'com'
const { validateId, validateCallback } = validators

export default function updateUserMode(userId, mode, callback) {
    validateId(userId)
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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/update/mode/${userId}`)

    const user = { mode }
    const json = JSON.stringify(user)

    xhr.send(json)
}