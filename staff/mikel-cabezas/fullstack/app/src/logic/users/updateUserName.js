import { validators } from "com"
const { validateName, validateToken } = validators

export default (token, name) => {
    validateToken(token)
    validateName(name)

    return fetch(`${import.meta.env.VITE_API_URL}/users/username`, {
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