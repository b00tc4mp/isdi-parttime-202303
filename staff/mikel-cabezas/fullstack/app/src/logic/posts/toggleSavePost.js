import { validators } from 'com'
const { validateToken, validatePostId } = validators

export function toggleSavePost(token, postId) {
    validateToken(token)
    validatePostId(postId)
    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/saves`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.status !== 204)
                return res.json().then(({ error: message }) => { throw new Error(message) })
        })

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
    xhr.open("PATCH", `${import.meta.env.VITE_API_URL}/posts/${postId}/saves`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)


    const post = { postId }
    const json = JSON.stringify(post)

    xhr.send(json)


}