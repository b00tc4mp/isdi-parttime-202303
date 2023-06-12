import { validators } from 'com'
const { validateId, validateCallback } = validators

export default function updatePricePost(userId, postId, price, callback) {
    validateId(userId)
    validateId(postId)
    validateNumber(price)
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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/${userId}/posts/${postId}/update/price`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    
    const post = { price }
    const json = JSON.stringify(post)

    xhr.send(json)
}