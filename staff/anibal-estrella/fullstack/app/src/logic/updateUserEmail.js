import { validators } from 'com'
const { validateEmail, validateCallback } = validators

import { saveUser, findUserById } from "../data.js"

export default (userId, newEmail, confirmEmail, callback) => {
    validateId(userId, 'user id')
    validateEmail(newEmail, 'new email')
    validateEmail(confirmEmail, 'confirm email')
    validateCallback(callback, 'callback function')

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
        callback(new Error('Connection Error!'))
    }

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/email`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

    const user = { password, newPassword, newPasswordConfirm }
    const json = JSON.stringify(user)

    xhr.send(json)

}