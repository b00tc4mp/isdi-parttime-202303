import { validators } from 'com'
const { validateCallback, validatePassword, validateNewPassword, validateUserId } = validators
export function updateUserPassword(userId, password, newPassword, repeatPassword, callback) {
    debugger
    validateUserId(userId)
    validatePassword(password)
    validatePassword(newPassword)
    validatePassword(repeatPassword)
    validateNewPassword(password, newPassword, repeatPassword)
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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/password`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

    const userData = { password, newPassword, repeatPassword }

    const json = JSON.stringify(userData)

    xhr.send(json)
}