import { validators } from 'com'
const { validateEmail, validateName, validateNewPassword, validatePasswordConfirm, validateCallback } = validators

import PunAvatar from "../../images/PunIntendedLike.png"
export const DEFAULT_AVATAR_URL = PunAvatar

export function registerUser(name, email, password, passwordConfirm, callback) {
    validateName(name)
    validateEmail(email)
    validateNewPassword(password)
    validatePasswordConfirm(password, passwordConfirm)
    validateCallback(callback)

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

    xhr.open('POST', `${import.meta.env.VITE_API_URL}/users`)

    xhr.setRequestHeader('Content-Type', 'application/json')

    const user = { name, email, password, passwordConfirm }
    const json = JSON.stringify(user)

    xhr.send(json)
}