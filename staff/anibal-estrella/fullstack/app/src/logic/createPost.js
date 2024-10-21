import { validators } from 'com'
import context from './context'
const { validateUrl, validateText } = validators

export default (image, text) => {
    validateUrl(image, 'image url')
    validateText(text, 'text')

    return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${context.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, text })
    })
        .then(res => {
            if (res.status === 201)
                return

            return res.json()
                .then(body => {
                    throw new Error(body.error)
                })

        })
}