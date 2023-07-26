import { validators } from 'com'
const { validateToken, validateId } = validators



export default function toggleLikePost(token, postId) {
    validateToken(token)
    validateId(postId, 'post id')

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/like`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => {
        if (res.status !== 201)
            return res.json().then(({ error: message }) => {
                throw new Error(message)
            })
    })
}