import { validators } from 'com'
const { validateId, validateToken, validateUrl, validateText } = validators

export default (token, postId, image, text) => {
    validateToken(token) 
    validateId(postId)
    if(image !== '') validateUrl(image)
    if(text !== '') validateText(text)

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/updatePost`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ image, text })
    })
        .then(res => {
            if (res.status !== 204)
                return res.json().then(({ error: message }) => { throw new Error(message) })

            return
        })   
        .catch(error => new Error(error)) 
}