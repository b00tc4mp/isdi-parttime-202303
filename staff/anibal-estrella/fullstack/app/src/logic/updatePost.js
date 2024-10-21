import { validators } from 'com'
import context from './context'
const { validateId, validateUrl, validateText } = validators

/**
 * Updates 
 * @param {*} postId 
 * @param {*} image 
 * @param {*} text 
 * */

export default (postId, image, text) => {
    validateId(postId, 'post id')
    validateUrl(image, 'image url')
    validateText(text, 'text')

    return fetch(`${import.meta.env.VITE_API_URL}/posts/post/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${context.token}`,
        },
        body: JSON.stringify({ image, text }),
    }).then(res => {
        if (res.status === 201)
            return

        return res.json()
            .then(({ error: message }) => {
                throw new Error(message)
            })

    })

}

