import { validators } from 'com'
const { validateId, validateToken } = validators

export default (token, postId) => {
    validateToken(token) 
    validateId(postId, 'post id')

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/updateBuy`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
        .then(res => {
            if (res.status !== 204)
                return res.json().then(({ error: message }) => { throw new Error(message) })

            return
        })   
        .catch(error => new Error(error)) 
}