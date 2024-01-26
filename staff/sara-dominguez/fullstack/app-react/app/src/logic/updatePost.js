import { validators } from 'com'
import context from './context'
const { validatePostId, validatePostUrl, validateText } = validators

export function updatePost(postId, imageUrl, text) {
    validatePostId(postId)
    validatePostUrl(imageUrl)
    validateText(text)

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/update`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify({ imageUrl, text })
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
