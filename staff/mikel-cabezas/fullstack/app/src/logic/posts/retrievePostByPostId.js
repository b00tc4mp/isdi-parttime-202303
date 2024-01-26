import { findPostbyId, findUserById } from "../../data"
import { validators } from "com"

const { validateToken } = validators
export default function retrievePostByPostId(token, postId) {
    validateToken(token)

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            if (res.status !== 200)
                return res.json().then(({ error: message }) => { throw new Error(message) })
            return res.json()
        })
}
