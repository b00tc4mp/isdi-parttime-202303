console.debug('load retrievePost')
import { validators } from 'com'
import context from './context'
const { validateId } = validators


export function retrievePost(postId) {
    validateId(postId)

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
        // method: 'GET',
        headers: {
            authorization: `Bearer ${context.token}`
        }
    })
        .then(res => {
            if (res.status === 200)
                return res.json()


            return res.json()
                // .then(({ error: message }) => { throw new Error(message) })
                .then(body => {
                    throw new Error(body.message)
                })
        })
}
