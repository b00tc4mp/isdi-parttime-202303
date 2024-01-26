
import { validators } from 'com'

const { validateToken, validatePassword, validateUserNewPassword, validateUserConfirmNewPassword, validateCallback } = validators

export function validatedNewPassword(token, password, userNewPassword, userConfirmNewPassword, callback) {
    validateToken(token)
    validatePassword(password)
    validateUserNewPassword(userNewPassword)
    validateUserConfirmNewPassword(userConfirmNewPassword)

    if (callback) {
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
        xhr.setRequestHeader('authorization', `Bearer ${token}`)

        const data = { password: userNewPassword }
        const json = JSON.stringify(data)

        xhr.send(json)

    } return fetch(`${import.meta.env.VITE_API_URL}/users/password`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ password: userNewPassword })
    })
        .then(res => {
            if (res.status !== 204)
                return res.json().then(({ error: message }) => { throw new Error(message) })

            return res.json()
        })
}
