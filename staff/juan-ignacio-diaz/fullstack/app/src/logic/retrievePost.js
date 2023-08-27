import context from "./context"
import { validators } from 'com'

const { validateId } = validators

export default (postId) => {
    validateId(postId, 'post id')
    
    return (async () => {
        const res = fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/retrievePost`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${context.token}`
            }
        })

        if (res.status === 200)
                return await res.json()
            
        const { error: message } = await res.json()

        throw new Error(message)
    })()
}