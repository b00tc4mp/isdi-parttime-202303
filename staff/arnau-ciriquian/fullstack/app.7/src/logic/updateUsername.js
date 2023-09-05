import { validators } from 'com'
const { validateName, validateId, validateCallback, validatePassword } = validators

export function updateUsername(userId, username, newUsername, password, callback) {
    validateId(userId)
    validateName(username, 'old username')
    validateName(newUsername, 'new username')
    validatePassword(password)
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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/name`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

    const data = { username, newUsername, password }
    const json = JSON.stringify(data)

    xhr.send(json)
}