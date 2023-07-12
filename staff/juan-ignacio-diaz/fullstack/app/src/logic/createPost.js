import context from "./context"

import { validators } from 'com'
const { validateUrl, validateText } = validators

export default (image, text) => {
    validateUrl(image, 'image url')
    validateText(text, 'text')

    return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify({ image, text })
    })
        .then(res => {
            if (res.status === 201)
                return res.json()
            
            return res.json()
                .then(({ error: message }) => { throw new Error(message) })
        })   
        .catch(error => new Error(error)) 
}
