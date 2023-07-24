import context from "./context"
import { validators } from 'com'

const { validateId, validateNumber } = validators

export default (postId, price) => {
    validateId(postId)
    validateNumber(price)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/updatePriceToPost`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${context.token}`
            },
            body: JSON.stringify({ price })
        })

        if (res.status === 204)
            return
        
        const { error: message } = await res.json()
        
        throw new Error(message)
    })()
}