import { validators , errors } from 'com'
const { validateId, validateUrl, validateText } = validators
import context from './context'

export default (postId, image, location, title, text) => {
    validateId(postId, 'post id')
    validateUrl(image, 'image url')
    validateText(text)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${context.token}`,
            },
            body: JSON.stringify({ image, location, title, text }),
        })
        if (res.status === 204)
            return

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)  
    })()
}





