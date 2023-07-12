import { validators } from 'com'
const { validateId, validateToken, validateCallback } = validators

export default function deletePost(token, postId, callback) {
    validateToken(token)
    validateId(postId, 'post ID')

    if (callback) {

        validateCallback(callback, 'callback function')

        const xhr = new XMLHttpRequest()

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
            callback(new Error('Connection error'))
        }

        xhr.open('DELETE', `${import.meta.env.VITE_API_URL}/posts/${postId}`)

        xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

        xhr.send()
    }

    return fetch(`${import.meta.env.VITE_API_URL}/posts/post/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, postId }),
    }).then((res) => {
        if (res.status !== 200) {
            //return the json object
            return res.json().then(({ error: message }) => {
                throw new Error(message)
            })
        }
    })
}