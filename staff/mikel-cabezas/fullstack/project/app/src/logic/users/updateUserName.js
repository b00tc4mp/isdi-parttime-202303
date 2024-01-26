import { validators } from '../../../com'
const { validateName, validateToken } = validators
export function updateUserName(token, name) {
    validateToken(token)
    validateName(name)

    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/username/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name })
    })
        .then(res => {
            if (res.status !== 204)
                return res.json().then(({ error: message }) => { throw new Error(message) })
        })
}