import { validators } from 'com'
const { validateName, validateToken, validatePassword } = validators

export function updateUsername(token, username, newUsername, password) {
    validateToken(token)
    validateName(username, 'old username')
    validateName(newUsername, 'new username')
    validatePassword(password)

    return fetch(`${import.meta.env.VITE_API_URL}/users/name`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ username, newUsername, password })
    })
        .then(res => {
            if (res.status !== 204)
                return res.json().then(({ error: message }) => { throw new Error(message) })
        })
}