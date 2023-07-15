import { validators } from 'com'
const { validateToken } = validators

export default function deleteAccount(token) {
    validateToken(token)

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            if (res.status !== 204)
                return res.json().then(({ error: message }) => { throw new Error(message) })
        })
}