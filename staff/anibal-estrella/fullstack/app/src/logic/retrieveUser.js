import { validators } from 'com'
const { validateToken, validateCallback } = validators

export default (token, callback) => {
    validateToken(token)
    validateCallback(callback, 'callback function')


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
        const user = JSON.parse(json)
        callback(null, user)
    }

    xhr.onerror = () => {
        callback(new Error('Connection Error!'))
    }
    xhr.open('GET', `${import.meta.env.VITE_API_URL}/users/user/`)
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()
}
