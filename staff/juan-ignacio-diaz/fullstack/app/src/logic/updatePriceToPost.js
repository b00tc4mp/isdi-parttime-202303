import context from "./context"
import { validators } from 'com'

const { validateId, validateNumber } = validators

export default (postId, price) => {
    validateId(postId)
    validateNumber(price)

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/updatePriceToPost`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify({ price })
    })
        .then(res => {
            if (res.status === 204)
                return
            
            return res.json()
                .then(({ error: message }) => { throw new Error(message) })
        })   
        .catch(error => new Error(error)) 
}