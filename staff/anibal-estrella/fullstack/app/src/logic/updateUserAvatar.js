import { validators } from 'com'
const { validateId, validateUrl, validateCallback } = validators


export default (userId, url, callback) => {
    validateId(userId, 'user id')
    validateUrl(url, 'avatar url')
    validateCallback(callback, 'callback function')


    const xhr = new XMLHttpRequest


    xhr.onload = () => {
        const { status } = xhr

        if (status !== 204 {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }
        callback(null)
    }


    xhr.onerror = () => {
        callback(new Error('Connection Error!'))
    }

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/${userId}`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    //send only the avatar of the user as a data
    const data = { avatar }

    const json = JSON.stringify(data)

    xhr.send(json)

}
