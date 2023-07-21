import context from './context'
import { validators } from 'com'
const { validateId } = validators

/**
 * Retrieve single post from db
 * @param {*} token 
 * @param {*} postId 
 * @returns 
 */

export default (postId) => {
    validateId(postId, 'post id')

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
        headers: {
            Authorization: `Bearer ${context.token}`
        }
    })
        .then(res => {
            if (res.status == 200)
                return res.json()

            return res.json().then(body => {
                throw new Error(message)
            })

        })


}