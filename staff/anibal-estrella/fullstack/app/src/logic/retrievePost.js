import { validators } from 'com'
const { validateId, validateToken } = validators

/**
 * 
 * @param {*} token 
 * @param {*} postId 
 * @returns 
 */

export default (token, postId) => {
    validateId(postId, 'post id')
    validateToken(token)

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            if (res.status !== 200)
                return res.json().then(({ error: message }) => {
                    throw new Error(message)
                })

            return res.json()
        })


}