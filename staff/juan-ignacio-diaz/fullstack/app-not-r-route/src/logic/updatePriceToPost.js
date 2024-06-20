import { validators } from 'com'
const { validateId, validateToken, validateNumber } = validators

export default (token, postId, price) => {
    validateToken(token) 
    validateId(postId)
    validateNumber(price)

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/updatePriceToPost`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ price })
    })
        .then(res => {
            if (res.status !== 204)
                return res.json().then(({ error: message }) => { throw new Error(message) })

            return
        })   
        .catch(error => new Error(error)) 
}