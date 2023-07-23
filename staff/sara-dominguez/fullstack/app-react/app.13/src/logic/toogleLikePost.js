import { validators } from 'com'
import context from './context'
const { validatePostId } = validators

export default function toggleLikePost(postId) {
    validatePostId(postId)

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/likes`, {
        method: 'PATCH',
        headers: {
            authorization: `Bearer ${context.token}`
        }
    })
        .then(res => {
            if (res.status === 204)
                return

            return res.json()
                // .then(({ error: message }) => { throw new Error(message) })
                .then(body => {
                    throw new Error(body.message)
                })
        })
}