import { validators } from 'com'
const { validateToken, validateUrl, validateText } = validators

export default (token, image, text) => {
    validateToken(token) 
    validateUrl(image, 'image url')
    validateText(text, 'text')

    return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ image, text })
    })
        .then(res => {
            if (res.status !== 200)
                return res.json().then(({ error: message }) => { throw new Error(message) })

            return
        })   
        .catch(error => new Error(error)) 
}