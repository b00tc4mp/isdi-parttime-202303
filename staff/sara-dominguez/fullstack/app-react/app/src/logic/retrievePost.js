console.debug('load retrievePost')

// const { validateId } = require('com')
import { validators } from 'com'

const { validateToken, validateId, validateCallback } = validators


export function retrievePost(token, postId, callback) {
    validateToken(token)
    validateId(postId)

    if (callback) {
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
            const post = JSON.parse(json)

            callback(null, post)
        }

        xhr.onerror = () => {
            callback(new Error('conection error'))
        }

        xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts/${postId}`)

        // xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)


        xhr.send()


    } else
        return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
            // method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status !== 200)
                    return res.json().then(({ error: message }) => { throw new Error(message) })

                return res.json()
            })
}
