
import { validators } from 'com'

const { validateId, validatePassword, validateUserNewPassword, validateUserConfirmNewPassword, validateCallback } = validators

export function validatedNewPassword(userId, password, userNewPassword, userConfirmNewPassword, callback) {
    validateId(userId)
    validatePassword(password)
    validateUserNewPassword(userNewPassword)
    validateUserConfirmNewPassword(userConfirmNewPassword)
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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('authorization', `Bearer ${userId}`)

    const data = { password: userNewPassword }
    const json = JSON.stringify(data)

    xhr.send(json)
}
