import { validators } from 'com'
const { validateToken, validatePostId, validateCallback } = validators


export default function toggleFavPost(token, postId, callback) {
    validateToken(token)
    validatePostId(postId)

    if (callback) {
        validateCallback(callback)

        const xhr = new XMLHttpRequest

        xhr.onload = () => {
            const { status } = xhr

            if (status !== 204) {
                const { response: json } = xhr
                const { error } = JSON.parse(json)

                callback(new Error(error))

                return
            }

            callback(null)

        }
        xhr.onerror = () => {
            callback(new Error('connection error'))
        }

        xhr.open('PATCH', `${import.meta.VITE_API_URL}/posts/${postId}/favs`)

        // xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('authorization', `Bearer ${token}`)

        xhr.send()

    } else
        return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/favs`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status !== 204)
                    return res.json().then(({ error: message }) => { throw new Error(message) })
            })
}