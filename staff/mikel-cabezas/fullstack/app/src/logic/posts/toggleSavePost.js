import { validators } from 'com'
const { validateToken, validatePostId } = validators

export function toggleSavePost(token, postId) {
    validateToken(token)
    validatePostId(postId)

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/saves`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.status !== 204)
                return res.json().then(({ error: message }) => { throw new Error(message) })
        })
}