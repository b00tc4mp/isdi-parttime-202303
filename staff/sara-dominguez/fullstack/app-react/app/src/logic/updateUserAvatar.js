import { validators } from 'com'

const { validateId, validateUserAvatar, validateCallback } = validators


export function updateUserAvatar(userId, newAvatar, callback) {
    validateId(userId)
    validateUserAvatar(newAvatar)
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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('authorization', `Bearer ${userId}`)


    const data = { avatar: newAvatar }
    const json = JSON.stringify(data)

    xhr.send(json)
}