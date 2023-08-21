import { validators } from '../../../com'
const { validatePassword, validateNewPassword, validateToken } = validators
export function updateUserEmail(token, newEmail) {
    validateToken(token)
    validatePassword(newEmail)

    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/confirmUpdateEmail/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ newEmail })
    })
        .then(res => {
            if (res.status !== 204)
                return res.json().then(({ error: message }) => { throw new Error(message) })
        })
}