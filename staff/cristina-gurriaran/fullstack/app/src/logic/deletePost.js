import { validators } from 'com'
const { validateToken, validateId } = validators


export default function deletePost(token, postId) {
    validateToken(token)
    validateId(postId, 'post id')

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
        .then(res => {
            if (res.status !== 204)
                return res.json().then(({ error: message }) => { throw new Error(message) })
        })
}