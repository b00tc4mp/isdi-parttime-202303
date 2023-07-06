import { validators } from 'com'
const { validateToken, validateId, validateCallback } = validators


export default function deletePost(token, postId, callback) {
    validateToken(token)
    validateId(postId, 'post id')
    validateCallback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr
        
        if(status !== 204){
            const { response: json} = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))
            return
        }
        callback(null)
    }

    xhr.onerror = () => {
        callback(new Error('connection error'))
    }

    xhr.open('DELETE', `${import.meta.env.VITE_API_URL}/posts/${postId}`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()

}