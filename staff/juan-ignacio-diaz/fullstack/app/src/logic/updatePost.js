import context from "./context"
import { validators } from 'com'

const { validateId, validateToken, validateUrl, validateText } = validators

export default (postId, image, text) => {
    validateId(postId)
    if(image !== '') validateUrl(image)
    if(text !== '') validateText(text)

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/updatePost`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify({ image, text })
    })
        .then(res => {
            if (res.status === 204)
                return
            
            return res.json()
                .then(({ error: message }) => { throw new Error(message) })
        })   
        .catch(error => new Error(error)) 
}