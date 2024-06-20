import { validators, errors } from 'com'
const { validateUrl, validateText } = validators
import context from './context'

export default function createPost(image, location, title, text) {
    validateUrl(image, 'image url')
    validateText(text)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ image, location, title, text })
        })

        if (res.status === 201)
            return

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)    
    })()
}