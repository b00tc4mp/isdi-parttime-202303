import { validators } from 'com'
const { validateNewPassword, validatePassword, validatePasswordConfirm, validateId, validateCallback } = validators

export function updateUserPassword(userId, password, newPassword, newPasswordConfirmation, callback) {
    validateId(userId)
    validatePassword(password)
    validateNewPassword(newPassword, 'new password')
    validatePasswordConfirm(newPassword, newPasswordConfirmation, 'new password confirmation', 'new password')
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

    const data = { password, newPassword, newPasswordConfirmation }
    const json = JSON.stringify(data)

    xhr.send(json)
}