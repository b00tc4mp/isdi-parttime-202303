import { validators } from 'com'
const { validateId, validateUrl, validateCallback } = validators

export default function updateUserAvatar(userId, avatar, callback) {
    validateId(userId)
    validateUrl(avatar, 'avatar url')
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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/${userId}/update/avatar`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    
    const user = { avatar }
    const json = JSON.stringify(user)

    xhr.send(json)
}