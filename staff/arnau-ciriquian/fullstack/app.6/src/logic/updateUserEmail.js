import { validators } from 'com'
const { validateCallback, validateId } = validators

export function updateUserEmail(userId, email, newEmail, newEmailConfirmation, password, callback) {
    validateId(userId, 'user id')
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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/${userId}`)

    xhr.setRequestHeader('Content-Type', 'application/json')

    const data = { email, newEmail, newEmailConfirmation, password }
    const json = JSON.stringify(data)

    xhr.send(json)
}