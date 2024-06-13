import { validators } from 'com'
const { validateEmail, validateName, validateNewPassword, validatePasswordConfirm } = validators

import PunAvatar from "../../images/PunIntendedLike.png"
export const DEFAULT_AVATAR_URL = PunAvatar

export function registerUser(name, email, password, passwordConfirm) {
    validateName(name)
    validateEmail(email)
    validateNewPassword(password)
    validatePasswordConfirm(password, passwordConfirm)

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, DEFAULT_AVATAR_URL })
    })
        .then(res => {
            if (res.status !== 201)
                return res.json().then(({ error: message }) => { throw new Error(message) })
        })
}