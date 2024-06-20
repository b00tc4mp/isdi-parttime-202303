import { validators } from 'com'
const { validateToken, validateId, validateUrl, validateText } = validators


export default function updatePost(token, postId, image, location, title, text) {
    validateToken(token)
    validateId(postId, 'post id')
    validateUrl(image, 'image url')
    validateText(text)


    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ image, location, title, text }),
    }).then((res) => {
        if (res.status !== 204)
            return res.json().then(({ error: message }) => {
                throw new Error(message)
            })
    })
}


