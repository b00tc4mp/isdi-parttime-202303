import { validators } from '../../../com'
const { validatePassword, validateNewPassword, validateToken } = validators
export function updateUserPassword(token, currentPassword, newPassword, repeatPassword) {
    validateToken(token)
    validatePassword(currentPassword)
    validatePassword(newPassword)
    validatePassword(repeatPassword)

    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/password/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword, repeatPassword })
    })
        .then(res => {
            if (res.status !== 204)
                return res.json().then(({ error: message }) => { throw new Error(message) })
        })
}