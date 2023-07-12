import context from "./context"
import { validators } from 'com'

const { validateId } = validators

export default (postId) => {
    validateId(postId, 'post id')

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/toggleLike`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${context.token}`
        },
    })
        .then(res => {
            if (res.status === 204)
                return
            
            return res.json()
                .then(({ error: message }) => { throw new Error(message) })
        })   
        .catch(error => new Error(error)) 
}