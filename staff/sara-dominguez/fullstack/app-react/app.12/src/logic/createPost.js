import { validators } from 'com'
import context from './context'
const { validatePostUrl, validateText } = validators

export default function createPost(image, text) {
    validatePostUrl(image, 'image url')
    validateText(text)


    return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify({ image, text })
    })
        .then(res => {
            if (res.status === 201) {
                return
            } else
                return res.json()
                    // .then(({ error: message }) => { throw new Error(message) })
                    .then(body => {
                        throw new Error(body.error)
                    })
        })
}

