import context from "./context"
import { validators } from 'com'

const { validateId, validateUrl, validateText } = validators

export default (postId, image, text) => {
    validateId(postId)
    if(image !== '') validateUrl(image)
    if(text !== '') validateText(text)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/updatePost`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${context.token}`
            },
            body: JSON.stringify({ image, text })
        })

        if (res.status === 204)
            return
        
        const { error: message } = await res.json()
        
        throw new Error(message)
    })()
}