import context from "./context"

import { validators } from 'com'
const { validateUrl, validateText } = validators

export default (image, text) => {
    validateUrl(image, 'image url')
    validateText(text, 'text')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${context.token}`
            },
            body: JSON.stringify({ image, text })
        })

        if (res.status === 201)
            return
        
        const { error: message } = await res.json()
        
        throw new Error(message)
    })()
}
