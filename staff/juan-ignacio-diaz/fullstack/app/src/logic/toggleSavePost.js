import context from "./context"
import { validators } from 'com'

const { validateId } = validators

export default (postId) => {
    validateId(postId, 'post id')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/posts/${postId}/toggleSavePost`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${context.token}`
            },
        })

        if (res.status === 204)
            return
        
        const { error: message } = await res.json()
        
        throw new Error(message)
    })()
}