import { validators } from "com"
const { validateToken } = validators

export default (token, image) => {
    validateToken(token)

    return fetch(`${import.meta.env.VITE_API_URL}/users/image`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ image })
    })
        .then(res => {
            if (res.status !== 204)
                return res.json().then(({ error: message }) => { throw new Error(message) })
        })
}