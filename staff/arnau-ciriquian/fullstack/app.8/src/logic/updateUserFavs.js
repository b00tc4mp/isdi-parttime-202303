import { validators } from 'com'
const { validateToken } = validators

export default function updateUserFavs(token, callback) {
    validateToken(token)

    return fetch(`${import.meta.env.VITE_API_URL}/users/favs`, {
        method: 'PATCH',
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