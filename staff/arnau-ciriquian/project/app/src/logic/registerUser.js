/*import { validators } from 'com'
const { validateEmail, validateName, validateNewPassword, validatePasswordConfirm } = validators*/

import { API_URL } from '@env'

export function registerUser(name, email, password, passwordConfirm) {
    /*validateName(name)
    validateEmail(email)
    validateNewPassword(password)
    validatePasswordConfirm(password, passwordConfirm)*/

    return fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
        .then(res => {
            if (res.status !== 201)
                return res.json().then(({ error: message }) => { throw new Error(message) })
        })
}