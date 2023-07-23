import { validators } from 'com'
import context from './context'

const { validatePostId } = validators

export default function deletePost(postId) {
    validatePostId(postId)

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/delete`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${context.token}`
        }
    })
        .then(res => {
            if (res.status === 204)
                return
            // else
            return res.json()
                // .then(({ error: message }) => { throw new Error(message) })
                .then(body => {
                    throw new Error(body.error)
                })
        })
}
