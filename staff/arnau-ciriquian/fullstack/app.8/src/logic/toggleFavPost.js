import { validators } from 'com'
const { validateId, validateToken } = validators

export default function toggleFavPost(token, postId) {
    validateId(postId, 'post id')
    validateToken(token, 'user id')

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/favs`, {
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