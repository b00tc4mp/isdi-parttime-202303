import { validators } from 'com';
const { validateToken, validatePostId } = validators

export function deletePost(token, postId) {
    validateToken(token)
    validatePostId(postId)

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            if (res.status !== 204)
                return res.json().then(({ error: message }) => { throw new Error(message) })
        })
}