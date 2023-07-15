import { validators } from 'com'
const { validateNewPassword, validatePassword, validatePasswordConfirm, validateToken } = validators

export function updateUserPassword(token, password, newPassword, newPasswordConfirmation) {
    validateToken(token)
    validatePassword(password)
    validateNewPassword(newPassword, 'new password')
    validatePasswordConfirm(newPassword, newPasswordConfirmation, 'new password confirmation', 'new password')

    return fetch(`${import.meta.env.VITE_API_URL}/users/password`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ password, newPassword, newPasswordConfirmation })
    })
        .then(res => {
            if (res.status !== 204)
                return res.json().then(({ error: message }) => { throw new Error(message) })
        })
}