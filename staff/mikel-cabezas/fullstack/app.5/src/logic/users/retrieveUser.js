import { validators } from "com"

const { validateCallback, validateUserId } = validators

export default (userId, callback) => {
    validateUserId(userId)
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
        const user = JSON.parse(json)
        // const { name, email, image, favPosts } = JSON.parse(json)
        callback(null, user)
    }

    xhr.onerror = () => {
        callback(new Error('connection error'))
    }
    xhr.open('GET', `${import.meta.env.VITE_API_URL}/users`)
    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

    xhr.send()

}