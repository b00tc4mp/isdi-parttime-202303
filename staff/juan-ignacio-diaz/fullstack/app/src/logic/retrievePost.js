import { validators } from 'com'
const { validateId, validateToken } = validators

export default (token, postId) => {
    validateToken(token) 
    validateId(postId, 'post id')
    
    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/retrievePost`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            if (res.status !== 201)
                return res.json().then(({ error: message }) => { throw new Error(message) })

            return res.json()
        })   
        .catch(error => new Error(error)) 
}