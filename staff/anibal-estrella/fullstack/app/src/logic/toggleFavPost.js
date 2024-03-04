import { validators } from 'com'
const { validateId, validateToken, validateCallback } = validators
import context from './context'

/**
 * Toggle the fav/unfav state of a post and stors the userid in the favs porperty array in the post object
 * @param {*} userId the id of the user that toggles
 * @param {*} postId the id of the post to toggle the fav
 */
export default function togglefavPost(postId) {
    validateId(postId, 'post id')

    // api.patch('/users/favs/:postId', toggleFavPostHandler)

    return fetch(`${import.meta.env.VITE_API_URL}/users/favs/${postId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${context.token}`
        }
    }).then(res => {
        if (res.status === 204)
            return

        return res.json()
            .then(({ error: message }) => {
                throw new Error(message)
            })
    })
}