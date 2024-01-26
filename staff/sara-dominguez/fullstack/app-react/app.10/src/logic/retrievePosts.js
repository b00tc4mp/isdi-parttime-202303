console.debug('load retrievePost')

// import { validateId, validateCallback } from "./helpers/validators.js"
import { validators } from 'com'

const { validateToken, validateCallback } = validators

export default function retrievePosts(token, callback) {
    validateToken(token)

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
            const posts = JSON.parse(json)

            callback(null, posts)
        }

        xhr.onerror = () => {
            callback(new Error('connection error'))
        }

        xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts`)

        // xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('authorization', `Bearer ${token}`)

        xhr.send()

    } else
        return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
            // method: 'GET',
            headers: {
                // 'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status !== 200)
                    return res.json().then(({ error: message }) => { throw new Error(message) })

                return res.json()
            })
}

