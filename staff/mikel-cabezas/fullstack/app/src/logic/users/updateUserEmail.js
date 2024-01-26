import { validators } from "com"
const { validateEmail, validateToken } = validators

export default (token, email) => {
    validateEmail(email)
    validateToken(token)

    return fetch(`${import.meta.env.VITE_API_URL}/users/email`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email })
    })
        .then(res => {
            if (res.status !== 204)
                return res.json().then(({ error: message }) => { throw new Error(message) })
        })
}