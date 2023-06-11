import { validators } from 'com'
const { validateId, validatePassword, validateCallback } = validators

export default function updateUserPassword(userId, password, newPassword, newPasswordConfirm, callback) {
    validateId(userId)
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    validatePassword(newPasswordConfirm, 'new password confirm')
    validateCallback(callback)

    if (newPassword === password) throw new Error("the new password is equal to the old password", {cause: "newPassword"})

    if (newPassword !== newPasswordConfirm) throw new Error("the confirm password is different than then new password", {cause: "newPasswordConfirm"})

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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/update/password/${userId}`)

    const user = { password, newPassword, newPasswordConfirm }
    const json = JSON.stringify(user)

    xhr.send(json)
}