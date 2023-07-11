import { validators } from 'com'
const { validateToken, validatePostId, validateCallback } = validators

export default function deletePost(token, postId, callback) {
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

                callback(error)

                return
            }
        }

        xhr.onerror = () => {
            callback(new Error('conection error'))
        }

        xhr.open('DELETE', `${import.meta.env.VITE_API_URL}/posts/${postId}/delete`,)

        xhr.setRequestHeader('Authorization', `Bearer ${token}`)

        xhr.send()

    } else
        return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/delete`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status !== 204)
                    return res.json().then(({ error: message }) => { throw new Error(message) })


            })
}
