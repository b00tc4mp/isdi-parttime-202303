import { validators } from 'com'
const { validateCallback, validateToken } = validators

export function updateUserEmail(token, email, newEmail, newEmailConfirmation, password) {
    validateToken(token, 'user id')

    return fetch(`${import.meta.env.VITE_API_URL}/users/email`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email, newEmail, newEmailConfirmation, password })
    })
        .then(res => {
            if (res.status !== 204)
                return res.json().then(({ error: message }) => { throw new Error(message) })
        })
}