import { validators } from 'com'
const { validateId, validateToken } = validators

export default function toggleHidePost(token, postId) {
    validateToken(token, 'user id')
    validateId(postId, 'post id')

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/visibility`, {
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