import { validators } from 'com'
const { validateToken, validateId, validateCallback } = validators


export default function retrievePost(token, postId, callback) {
    validateToken (token)
    // validateId (postId, 'post id')
    validateCallback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr

        if (status !== 200) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))
            return
        }

        const { response: json } = xhr
        const post  = JSON.parse(json)

        callback(null, post)

    }

    xhr.onerror = () => {
        callback(new Error('connection error'))
    }

    xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts/${postId}`)
    
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)  
      
    xhr.send()
}