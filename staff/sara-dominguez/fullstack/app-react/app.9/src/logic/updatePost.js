import { validators } from 'com'

const { validateToken, validatePostId, validatePostUrl, validateText, validateCallback } = validators

export function updatePost(token, postId, imageUrl, text, callback) {
    validateToken(token)
    validatePostId(postId)
    validatePostUrl(imageUrl)
    validateText(text)
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
        callback(new Error('conection error'))
    }

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}/update`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('authorization', `Bearer ${token}`)

    const data = { imageUrl, text }
    const json = JSON.stringify(data)

    xhr.send(json)
}
